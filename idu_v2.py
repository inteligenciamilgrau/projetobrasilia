"""IDU-Br v2 — motor de cálculo da qualidade e da confiança da avaliação.

O programa não contém notas hardcoded de cidades. Ele lê uma matriz JSON auditada,
pois a separação entre evidência e cálculo é uma regra da v2.

Uso:
    python idu_v2.py matriz.json
    python idu_v2.py matriz.json --equal-weights --json
    python idu_v2.py --self-test

Formato resumido da entrada:
{
  "Cidade/UF": {
    "municipal": {"saude": {"D": [3,4,4], "U": 4, ...}, ...},
    "ecosystem": {"saude": {"D": [3,4,4], "U": 4, ...}, ...},
    "confidence": {"completude": 4, "evidencia": 3, ...},
    "caps": ["sem_schema"]
  }
}

Cada nota pode ser um número 0..4 (sem incerteza), uma lista [min, central,
max] ou um objeto {"lo": ..., "value": ..., "hi": ...}.
"""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path
from typing import Any


DOMINIOS = (
    "saude",
    "seguranca",
    "educacao",
    "mobilidade",
    "economia",
    "financas",
    "urbanismo",
    "meio_ambiente",
)

PESOS_BRIEFING = {
    "saude": 1.2,
    "seguranca": 1.2,
    "educacao": 1.2,
    "mobilidade": 1.2,
    "economia": 1.2,
    "financas": 1.0,
    "urbanismo": 1.0,
    "meio_ambiente": 1.0,
}

EIXOS = ("D", "U", "F", "T", "R")
COMPONENTES_CONFIANCA = {
    "completude": 0.25,
    "evidencia": 0.25,
    "reprodutibilidade": 0.20,
    "concordancia": 0.15,
    "consistencia": 0.10,
    "recencia": 0.05,
}
TETOS_CONFIANCA = {
    "sem_schema": 79.0,
    "tres_dominios_desconhecidos": 69.0,
    "contradicao_material": 59.0,
    "so_busca_ou_noticia": 39.0,
}


class ErroMatriz(ValueError):
    """Entrada inválida, com mensagem adequada para o auditor."""


def _tripla(valor: Any, contexto: str) -> tuple[float, float, float]:
    if isinstance(valor, (int, float)):
        tripla = (float(valor),) * 3
    elif isinstance(valor, list) and len(valor) == 3:
        tripla = tuple(float(x) for x in valor)
    elif isinstance(valor, dict) and {"lo", "value", "hi"} <= valor.keys():
        tripla = (float(valor["lo"]), float(valor["value"]), float(valor["hi"]))
    else:
        raise ErroMatriz(
            f"{contexto}: use número, [min, central, max] ou {{lo, value, hi}}"
        )

    lo, central, hi = tripla
    if not (0 <= lo <= central <= hi <= 4):
        raise ErroMatriz(f"{contexto}: esperado 0 <= min <= central <= max <= 4")
    return tripla


def _validar_camada(camada: dict[str, Any], contexto: str) -> None:
    faltantes = set(DOMINIOS) - set(camada)
    extras = set(camada) - set(DOMINIOS)
    if faltantes or extras:
        raise ErroMatriz(
            f"{contexto}: domínios faltantes={sorted(faltantes)}, extras={sorted(extras)}"
        )
    for dominio in DOMINIOS:
        celula = camada[dominio]
        if not isinstance(celula, dict):
            raise ErroMatriz(f"{contexto}.{dominio}: esperado objeto com D/U/F/T/R")
        faltam_eixos = set(EIXOS) - set(celula)
        if faltam_eixos:
            raise ErroMatriz(f"{contexto}.{dominio}: faltam {sorted(faltam_eixos)}")
        for eixo in EIXOS:
            _tripla(celula[eixo], f"{contexto}.{dominio}.{eixo}")


def _media_ponderada(valores: dict[str, float], pesos: dict[str, float]) -> float:
    return sum(valores[d] * pesos[d] for d in DOMINIOS) / sum(pesos.values())


def avaliar_camada(
    camada: dict[str, Any],
    modo: int,
    pesos: dict[str, float],
) -> dict[str, float]:
    """Calcula uma camada. modo=0 mínimo, 1 central, 2 máximo."""
    normalizado: dict[str, dict[str, float]] = {}
    for dominio in DOMINIOS:
        normalizado[dominio] = {
            eixo: _tripla(camada[dominio][eixo], f"{dominio}.{eixo}")[modo] / 4.0
            for eixo in EIXOS
        }

    profundidade = {d: normalizado[d]["D"] for d in DOMINIOS}
    acesso = {d: profundidade[d] * normalizado[d]["U"] for d in DOMINIOS}
    frescor = {d: profundidade[d] * normalizado[d]["F"] for d in DOMINIOS}
    territorio = {d: profundidade[d] * normalizado[d]["T"] for d in DOMINIOS}
    resiliencia = {d: profundidade[d] * normalizado[d]["R"] for d in DOMINIOS}

    qualidade = {}
    for d in DOMINIOS:
        x = normalizado[d]
        qualidade[d] = x["D"] * (
            0.45 * x["U"] + 0.30 * x["F"] + 0.15 * x["T"] + 0.10 * x["R"]
        )

    A = _media_ponderada(profundidade, pesos)
    U = _media_ponderada(acesso, pesos)
    F = _media_ponderada(frescor, pesos)
    T = _media_ponderada(territorio, pesos)
    R = _media_ponderada(resiliencia, pesos)
    B = sum(sorted(qualidade.values())[:4]) / 4.0
    total = 30 * A + 25 * U + 15 * F + 10 * T + 10 * B + 10 * R
    return {"IDU": total, "A": A, "U": U, "F": F, "T": T, "B": B, "R": R}


def avaliar_confianca(config: dict[str, Any], contexto: str) -> float:
    bruto = 0.0
    for nome, peso in COMPONENTES_CONFIANCA.items():
        if nome not in config:
            raise ErroMatriz(f"{contexto}: falta componente de confiança '{nome}'")
        _, central, _ = _tripla(config[nome], f"{contexto}.{nome}")
        bruto += peso * (central / 4.0)
    resultado = 100 * bruto
    return resultado


def avaliar_cidade(
    nome: str,
    config: dict[str, Any],
    pesos: dict[str, float],
) -> dict[str, Any]:
    for camada_nome in ("municipal", "ecosystem"):
        if camada_nome not in config:
            raise ErroMatriz(f"{nome}: falta camada '{camada_nome}'")
        _validar_camada(config[camada_nome], f"{nome}.{camada_nome}")

    # O ecossistema contém a camada municipal. No ponto central, portanto, ele
    # nunca pode ser pior em um eixo/domínio; isso detecta erro de codificação.
    for dominio in DOMINIOS:
        for eixo in EIXOS:
            municipal_c = _tripla(
                config["municipal"][dominio][eixo], f"{nome}.municipal.{dominio}.{eixo}"
            )[1]
            ecossistema_c = _tripla(
                config["ecosystem"][dominio][eixo], f"{nome}.ecosystem.{dominio}.{eixo}"
            )[1]
            if ecossistema_c < municipal_c:
                raise ErroMatriz(
                    f"{nome}.{dominio}.{eixo}: ecossistema ({ecossistema_c}) "
                    f"não pode ser menor que municipal ({municipal_c})"
                )

    municipal = [avaliar_camada(config["municipal"], i, pesos) for i in range(3)]
    ecossistema = [avaliar_camada(config["ecosystem"], i, pesos) for i in range(3)]
    confianca = avaliar_confianca(config.get("confidence", {}), f"{nome}.confidence")

    caps = config.get("caps", [])
    desconhecidos = set(caps) - set(TETOS_CONFIANCA)
    if desconhecidos:
        raise ErroMatriz(f"{nome}.caps: valores desconhecidos {sorted(desconhecidos)}")
    for cap in caps:
        confianca = min(confianca, TETOS_CONFIANCA[cap])

    central_m = municipal[1]["IDU"]
    central_e = ecossistema[1]["IDU"]
    return {
        "cidade": nome,
        "IDU_M": central_m,
        "IDU_M_lo": municipal[0]["IDU"],
        "IDU_M_hi": municipal[2]["IDU"],
        "IDU_E": central_e,
        "IDU_E_lo": ecossistema[0]["IDU"],
        "IDU_E_hi": ecossistema[2]["IDU"],
        "dependencia_externa": central_e - central_m,
        "C_IDU": confianca,
        "componentes": ecossistema[1],
    }


def carregar(caminho: Path) -> dict[str, Any]:
    try:
        dados = json.loads(caminho.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ErroMatriz(f"arquivo não encontrado: {caminho}") from exc
    except json.JSONDecodeError as exc:
        raise ErroMatriz(f"JSON inválido em {caminho}: {exc}") from exc
    if not isinstance(dados, dict) or not dados:
        raise ErroMatriz("a raiz deve ser um objeto não vazio, indexado por cidade")
    return dados


def _celula(nota: Any) -> dict[str, Any]:
    return {eixo: nota for eixo in EIXOS}


def self_test() -> None:
    pesos = {d: 1.0 for d in DOMINIOS}
    perfeita = {d: _celula(4) for d in DOMINIOS}
    vazia = {d: _celula(0) for d in DOMINIOS}
    fraca = {d: _celula(1) for d in DOMINIOS}
    incerta = {d: _celula([0, 2, 4]) for d in DOMINIOS}

    assert math.isclose(avaliar_camada(perfeita, 1, pesos)["IDU"], 100.0)
    assert math.isclose(avaliar_camada(vazia, 1, pesos)["IDU"], 0.0)
    nota_fraca = avaliar_camada(fraca, 1, pesos)["IDU"]
    assert 0 < nota_fraca < 20, nota_fraca
    lo = avaliar_camada(incerta, 0, pesos)["IDU"]
    hi = avaliar_camada(incerta, 2, pesos)["IDU"]
    assert math.isclose(lo, 0.0) and math.isclose(hi, 100.0)
    print(f"self-test OK: perfeita=100, vazia=0, uniformemente_fraca={nota_fraca:.1f}")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("matriz", nargs="?", type=Path)
    parser.add_argument("--equal-weights", action="store_true")
    parser.add_argument("--json", action="store_true", dest="saida_json")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)

    if args.self_test:
        self_test()
        return 0
    if args.matriz is None:
        parser.error("informe a matriz JSON ou use --self-test")

    pesos = {d: 1.0 for d in DOMINIOS} if args.equal_weights else PESOS_BRIEFING
    dados = carregar(args.matriz)
    resultados = [avaliar_cidade(nome, cfg, pesos) for nome, cfg in dados.items()]
    resultados.sort(key=lambda x: (-x["IDU_E"], -x["C_IDU"], x["cidade"]))

    if args.saida_json:
        print(json.dumps(resultados, ensure_ascii=False, indent=2))
        return 0

    print("#  Cidade                    IDU-M (faixa)       IDU-E (faixa)       C-IDU  Dep.ext")
    print("-" * 92)
    for pos, r in enumerate(resultados, 1):
        faixa_m = f'{r["IDU_M_lo"]:.0f}-{r["IDU_M_hi"]:.0f}'
        faixa_e = f'{r["IDU_E_lo"]:.0f}-{r["IDU_E_hi"]:.0f}'
        print(
            f'{pos:<3}{r["cidade"]:<26}{r["IDU_M"]:>5.1f} ({faixa_m:>7})'
            f'{r["IDU_E"]:>11.1f} ({faixa_e:>7})'
            f'{r["C_IDU"]:>9.1f}{r["dependencia_externa"]:>9.1f}'
        )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ErroMatriz as exc:
        print(f"erro na matriz: {exc}", file=sys.stderr)
        raise SystemExit(2)
