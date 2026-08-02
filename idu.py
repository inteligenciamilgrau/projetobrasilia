"""
IDU-Br v1 (LEGADO) — Indice de Disponibilidade e Usabilidade de dados publicos.

NAO USE este arquivo para a selecao atual. Ele preserva o primeiro experimento
de forma reproduzivel, mas contem entradas superadas pelas verificacoes de
2026-08-01. A formula revisada esta em idu_v2.py e docs/METRICA_IDU_V2.md.

Projeto Brasil iA. Calcula a nota 0-100 de cada cidade candidata ao piloto,
a partir dos dados VERIFICADOS em docs/parciais/.

Rode:  python idu.py
       python idu.py --csv     (saida em CSV)

Regra de ouro: nenhum numero aqui e estimativa de conhecimento previo. Cada
contagem vem de uma fonte com marcador [fetch-ok] nos arquivos parciais. Onde o
dado nao foi medido, o valor e None e a cidade recebe faixa min-max em vez de
nota pontual.
"""

import math
import sys

# ---------------------------------------------------------------------------
# 1. DOMINIOS E PESOS
# ---------------------------------------------------------------------------
# Os 5 dominios citados explicitamente no briefing do projeto pesam 1.2;
# os 3 complementares pesam 1.0. Soma dos pesos = 9.0
DOMINIOS = {
    "saude":         1.2,
    "seguranca":     1.2,
    "educacao":      1.2,
    "mobilidade":    1.2,
    "economia":      1.2,
    "financas":      1.0,
    "urbanismo":     1.0,
    "meio_ambiente": 1.0,
}
W_TOTAL = sum(DOMINIOS.values())

# ---------------------------------------------------------------------------
# 2. RUBRICAS
# ---------------------------------------------------------------------------
# c_d — cobertura propria do dominio, a partir do numero de conjuntos de dados
# MUNICIPAIS/ESTADUAIS PROPRIOS (espelho de base nacional nao conta).
def cobertura(n):
    if n is None:
        return None          # nao medido
    if n >= 10:
        return 1.00
    if n >= 3:
        return 0.75
    if n >= 1:
        return 0.25          # 1-2 conjuntos = dominio nominal, nao real
    return 0.00

# u_d — usabilidade do acesso. Escada de acesso.
ACESSO = {
    "api":            1.00,  # API documentada e respondendo
    "bulk":           0.85,  # download em massa CSV/JSON, ou geoservico aberto
    "csv":            0.70,  # CSV/XLSX por conjunto, via portal
    "painel_export":  0.45,  # painel com exportacao
    "painel":         0.20,  # painel sem exportacao
    "pdf":            0.05,  # apenas relatorio
    "ausente":        0.00,
}
# Bloqueio a automacao (CAPTCHA, login, exige contorno) corta a usabilidade pela
# metade: o dado existe mas nao e coletavel em escala, que e o requisito do Brasil iA.
PENAL_BLOQUEIO = 0.5

# ---------------------------------------------------------------------------
# 3. DADOS VERIFICADOS
# ---------------------------------------------------------------------------
# counts: nº de conjuntos por dominio, medido via API CKAN
#         (package_search?facet.field=["groups"]) — auditavel, nao e leitura de HTML.
# acesso: melhor via de acesso verificada por dominio.
# bloqueio: dominios cuja coleta automatizada esta barrada.
# G: bonus de granularidade intramunicipal (0 a +10).
# F: penalidade de fragilidade operacional (0 a -15).

CIDADES = {
    "Fortaleza/CE": dict(
        counts=dict(saude=35, seguranca=1, educacao=12, mobilidade=25, economia=34,
                    financas=32, urbanismo=8.5, meio_ambiente=8.5),
        acesso=dict.fromkeys(DOMINIOS, "bulk"),
        bloqueio=[],
        G=0, F=0,
        e_fonte="raw",
        nota="Facets da propria API CKAN. 'Meio Ambiente e Urbanismo' e UM grupo com 17 "
             "conjuntos, dividido 8.5/8.5 entre os dois dominios — assuncao explicita. "
             "Seguranca=1 cai no piso: dominio nominal, nao real. G nao medido.",
    ),
    "Sao Paulo/SP": dict(
        counts=dict(saude=5, seguranca=5, educacao=45, mobilidade=8, economia=None,
                    financas=55, urbanismo=None, meio_ambiente=42),
        acesso=dict(saude="csv", seguranca="bulk", educacao="bulk", mobilidade="api",
                    economia="bulk", financas="bulk", urbanismo="bulk", meio_ambiente="bulk"),
        bloqueio=["urbanismo"],          # GeoSampa atras de CAPTCHA da Prodam
        G=6, F=0,
        e_fonte="raw",
        nota="474 conjuntos no total, mas so 160 caem nos 6 grupos medidos: economia e "
             "urbanismo nao foram contados. Mobilidade usa API Olho Vivo/SPTrans (fora do "
             "portal). Saude municipal propria e rasa — TabNet e nacional e nao pontua. "
             "CAPTCHA do GeoSampa entra como bloqueio em urbanismo, nao em F, para nao "
             "penalizar duas vezes.",
    ),
    "Belo Horizonte/MG": dict(
        counts=dict.fromkeys(DOMINIOS, None),
        acesso=dict.fromkeys(DOMINIOS, "bulk"),
        bloqueio=[],
        G=0, F=0,
        e_fonte="q",
        c_default=0.75,
        nota="21 grupos cobrindo os 8 dominios — a melhor ESTRUTURA do pais. Mas so ~80 dos "
             "602 conjuntos estao classificados em grupo, logo nenhuma contagem por dominio "
             "e confiavel. c=0.75 uniforme e assuncao, e o E resultante e artefato da "
             "uniformidade: leia a FAIXA, nao a nota pontual.",
    ),
    "Recife/PE": dict(
        counts=dict.fromkeys(DOMINIOS, None),
        acesso=dict.fromkeys(DOMINIOS, "bulk"),
        bloqueio=[],
        G=10, F=-6,
        e_fonte="q",
        c_default=None,
        computavel=False,
        nota="NAO CALCULAVEL por falha da propria fonte: package_search, group_show e "
             "group_list?all_fields=true retornam HTTP 500, e sao exatamente os endpoints "
             "que medem cobertura por dominio. Granularidade confirmada e a melhor do pais "
             "(arboviroses 2013-2025, CSV por registro, com distrito e bairro, trimestral, "
             "metadado 2026-05-20) -> G=+10. F=-6: interface web 500 com API viva (-3) e "
             "endpoints da API em 5xx (-3).",
    ),
    "Rio de Janeiro/RJ": dict(
        counts=dict(saude=None, seguranca=20, educacao=None, mobilidade=1, economia=None,
                    financas=None, urbanismo=None, meio_ambiente=None),
        acesso=dict(saude="painel", seguranca="bulk", educacao="painel", mobilidade="painel",
                    economia="painel", financas="painel_export", urbanismo="painel_export",
                    meio_ambiente="painel"),
        bloqueio=[],
        G=8, F=-9,
        e_fonte="q",
        c_default=0.75,
        nota="ITGP 2025 = 98/100 e a melhor base criminal aberta do pais (ISP-RJ, serie "
             "longa por municipio e AISP/CISP) -> seguranca medida. Mas o Data.Rio e SPA em "
             "ArcGIS Hub e o unico feed de maquina (DCAT-US) expoe 50 conjuntos com "
             "distribuicao EXCLUSIVAMENTE text/html: o dado existe e nao e coletavel. "
             "dados.mobilidade.rio = 404 -> mobilidade no piso. "
             "F=-9: SPA sem feed (-4), 404 em mobilidade (-3), 3 dominios concorrentes (-2).",
    ),
    "Curitiba/PR": dict(
        counts=dict(saude=0, seguranca=0, educacao=0, mobilidade=8, economia=8,
                    financas=8, urbanismo=8, meio_ambiente=0),
        acesso=dict.fromkeys(DOMINIOS, "bulk"),
        bloqueio=[],
        G=0, F=0,
        e_fonte="q",
        nota="32 conjuntos no total, sem saude, educacao, seguranca nem meio ambiente. "
             "Os 32 distribuidos nos 4 dominios restantes = 8 cada (assuncao). 5a no CLP e "
             "no Connected Smart Cities — caso central da divergencia entre reputacao e dado.",
    ),
    "Vitoria/ES": dict(
        counts=dict(saude=0, seguranca=0, educacao=0, mobilidade=0, economia=0,
                    financas=15, urbanismo=0, meio_ambiente=0),
        acesso=dict.fromkeys(DOMINIOS, "api"),
        bloqueio=[],
        G=0, F=-5,
        e_fonte="q",
        nota="1a no Connected Smart Cities 2025 (61,3). dados.vitoria.es.gov.br = 404. "
             "Politica formal exemplar (Decreto 22.378/2023, Portaria CGM 011/2023, licenca "
             "CC0) e API fiscal viva em wstransparencia.vitoria.es.gov.br — mas cobertura "
             "verificada e SO fiscal. F=-5 pelo portal de dados abertos inexistente.",
    ),
    "Florianopolis/SC": dict(
        counts=dict(saude=0, seguranca=0, educacao=0, mobilidade=0, economia=0,
                    financas=15, urbanismo=0, meio_ambiente=0),
        acesso=dict.fromkeys(DOMINIOS, "csv"),
        bloqueio=[],
        G=0, F=-5,
        e_fonte="q",
        nota="1a no CLP, 2a no Connected Smart Cities. dadosabertos.pmf.sc.gov.br NAO "
             "RESOLVE EM DNS. O 'dados abertos' oficial e portal fiscal terceirizado.",
    ),
    "Porto Alegre/RS": dict(
        counts=dict.fromkeys(DOMINIOS, None),
        acesso=dict.fromkeys(DOMINIOS, "ausente"),
        bloqueio=[],
        G=0, F=-5,
        e_fonte="q", c_default=None, computavel=False,
        nota="NAO CALCULAVEL: DataPOA oficialmente fora do ar por manutencao da Procempa; "
             "datapoa.com.br nao completa conexao. 4a no CLP. Historicamente um dos "
             "pioneiros do pais — reavaliar quando o portal voltar.",
    ),
    "Brasilia/DF": dict(
        counts=dict.fromkeys(DOMINIOS, None),
        acesso=dict.fromkeys(DOMINIOS, "painel"),
        bloqueio=[],
        G=0, F=-4,
        e_fonte="q", c_default=None, computavel=False,
        nota="NAO CALCULAVEL: portal abre mas e SPA e nao permitiu contar nada. "
             "Vantagem ESTRUTURAL unica no pais: o DF acumula competencia municipal e "
             "estadual, logo saude, seguranca, educacao e mobilidade ficam sob a MESMA "
             "jurisdicao — nao ha o problema de segunca estadual desacoplada. "
             "Unica candidata do Centro-Oeste. Prioridade maxima de re-verificacao.",
    ),
}

# ---------------------------------------------------------------------------
# 4. CALCULO
# ---------------------------------------------------------------------------
def pielou(valores, s_alvo=len(DOMINIOS)):
    """Equitabilidade de Pielou: J = H / ln(S_alvo), com H = -sum(p ln p).

    O denominador e ln(8), nao ln(nº de dominios presentes): dominio ausente
    contribui 0 para H mas continua no denominador. E assim que a metrica
    penaliza a cidade otima em duas areas e vazia nas outras seis.
    """
    v = [x for x in valores if x and x > 0]
    total = sum(v)
    if total <= 0 or len(v) < 2:
        return 0.0
    h = -sum((x / total) * math.log(x / total) for x in v)
    return h / math.log(s_alvo)


def avaliar(cfg, modo="central"):
    """modo: 'central' | 'min' | 'max' — trata os dominios nao medidos."""
    c_default = cfg.get("c_default", 0.5)
    if modo == "min":
        c_nc = 0.0
    elif modo == "max":
        c_nc = 1.0
    else:
        c_nc = c_default if c_default is not None else 0.5

    soma_wc = soma_wq = 0.0
    q_vec, raw_vec = [], []

    for d, w in DOMINIOS.items():
        n = cfg["counts"].get(d)
        c = cobertura(n)
        if c is None:
            c = c_nc
            raw_vec.append(None)
        else:
            raw_vec.append(n)

        u = ACESSO[cfg["acesso"].get(d, "ausente")]
        if d in cfg.get("bloqueio", []):
            u *= PENAL_BLOQUEIO

        q = c * u
        soma_wc += w * c
        soma_wq += w * q
        q_vec.append(q)

    A = soma_wc / W_TOTAL
    U = soma_wq / W_TOTAL
    if cfg.get("e_fonte") == "raw":
        E = pielou([x for x in raw_vec if x is not None])
    else:
        E = pielou(q_vec)

    base = 40 * A + 35 * U + 25 * E
    idu = max(0.0, min(100.0, base + cfg.get("G", 0) + cfg.get("F", 0)))
    return dict(A=A, U=U, E=E, base=base, idu=idu)


def main():
    linhas = []
    for cidade, cfg in CIDADES.items():
        r = avaliar(cfg, "central")
        lo = avaliar(cfg, "min")["idu"]
        hi = avaliar(cfg, "max")["idu"]
        nao_medidos = sum(1 for d in DOMINIOS if cfg["counts"].get(d) is None)
        linhas.append(dict(
            cidade=cidade, **r, lo=lo, hi=hi, nc=nao_medidos,
            computavel=cfg.get("computavel", True),
            G=cfg.get("G", 0), F=cfg.get("F", 0),
        ))

    calc = sorted([x for x in linhas if x["computavel"]], key=lambda x: -x["idu"])
    naocalc = [x for x in linhas if not x["computavel"]]

    if "--csv" in sys.argv:
        print("posicao,cidade,idu,faixa_min,faixa_max,A_amplitude,U_usabilidade,"
              "E_equilibrio,base,G,F,dominios_nao_medidos")
        for i, x in enumerate(calc, 1):
            print(f'{i},"{x["cidade"]}",{x["idu"]:.1f},{x["lo"]:.1f},{x["hi"]:.1f},'
                  f'{x["A"]:.4f},{x["U"]:.4f},{x["E"]:.4f},{x["base"]:.1f},'
                  f'{x["G"]},{x["F"]},{x["nc"]}')
        for x in naocalc:
            print(f'NC,"{x["cidade"]}",,,,,,,,{x["G"]},{x["F"]},{x["nc"]}')
        return

    print("=" * 96)
    print("IDU-Br v1 LEGADO — nao usar para a selecao atual; veja idu_v2.py")
    print("Projeto Brasil iA  |  IDU = 40*A + 35*U + 25*E + G - F   (0-100)")
    print("=" * 96)
    print(f'{"#":<3}{"Cidade":<22}{"IDU":>6}{"faixa":>13}{"A":>7}{"U":>7}{"E":>7}'
          f'{"G":>4}{"F":>4}{"NC":>4}')
    print("-" * 96)
    for i, x in enumerate(calc, 1):
        faixa = f'{x["lo"]:.0f}-{x["hi"]:.0f}' if x["nc"] else "medido"
        print(f'{i:<3}{x["cidade"]:<22}{x["idu"]:>6.1f}{faixa:>13}'
              f'{x["A"]:>7.2f}{x["U"]:>7.2f}{x["E"]:>7.2f}'
              f'{x["G"]:>+4}{x["F"]:>+4}{x["nc"]:>4}')
    print("-" * 96)
    for x in naocalc:
        print(f'{"NC":<3}{x["cidade"]:<22}{"—":>6}{"nao calculavel":>13}'
              f'{"":>21}{x["G"]:>+4}{x["F"]:>+4}{x["nc"]:>4}')
    print("=" * 96)
    print("A = amplitude ponderada de dominios com dado proprio  (peso 40)")
    print("U = amplitude UTIL: A ponderada pela escada de acesso  (peso 35)")
    print("E = equitabilidade de Pielou sobre os 8 dominios      (peso 25)")
    print("G = bonus de granularidade intramunicipal (0..+10)   F = fragilidade (0..-15)")
    print("NC = dominios ainda nao medidos. Com NC>0, leia a FAIXA, nao a nota pontual.")
    print()
    print("LEITURA CRUZADA OBRIGATORIA: E alto com U baixo significa 'uniformemente ruim',")
    print("nao 'equilibrado'. E mede so a forma da distribuicao, nunca o nivel.")


if __name__ == "__main__":
    main()
