# IDU-Br — Índice de Disponibilidade e Usabilidade de dados públicos municipais

> **LEGADO v1.** Este documento e `idu.py` preservam o primeiro experimento, mas não devem orientar a seleção atual. A revisão encontrou entradas defasadas e problemas de comparabilidade/confiança. Para novas avaliações, use [METRICA_IDU_V2.md](METRICA_IDU_V2.md).

**Status:** v1, calculado sobre os dados verificados até 2026-08-01
**Implementação:** [idu.py](../idu.py) — a fórmula executável é a fonte da verdade; este documento explica
**Insumos:** apenas fontes com marcador `[fetch-ok]` em [docs/parciais/](parciais/)

---

## 1. O que a métrica mede — e o que ela deliberadamente não mede

Mede **a capacidade de um município alimentar uma análise regional automatizada, hoje**. Só isso.

Não mede qualidade de gestão, não mede transparência legal, não mede maturidade de cidade inteligente. Essa distinção não é acadêmica: **o Rio de Janeiro tira 98/100 no ITGP e 58,5 no IDU-Br.** As duas notas estão certas — o Rio publica muito e cumpre a lei, mas publica de um jeito que uma máquina não consegue consumir. Índice de transparência mede intenção e conformidade; o IDU-Br mede coletabilidade.

---

## 2. Fórmula

```
IDU = 40·A + 35·U + 25·E + G − F        (limitado a 0..100)
```

Os pesos 40/35/25 são os três critérios do briefing do projeto, na ordem em que foram dados.

### Domínios e pesos
Os 5 domínios citados explicitamente no briefing pesam **1,2**; os 3 complementares pesam **1,0**. Soma = 9,0.

| Peso 1,2 | Peso 1,0 |
|---|---|
| saúde, segurança, educação, mobilidade/trânsito, comércio/economia | finanças, urbanismo, meio ambiente |

### A — Amplitude (peso 40)

`A = Σ wᵈ·cᵈ / 9`

`cᵈ` vem do **número de conjuntos de dados municipais/estaduais próprios** no domínio:

| Conjuntos | cᵈ | Racional |
|---|---|---|
| ≥ 10 | 1,00 | domínio realmente coberto |
| 3 – 9 | 0,75 | coberto de forma rasa |
| 1 – 2 | 0,25 | domínio **nominal**, não real |
| 0 | 0,00 | ausente |

O piso de 0,25 existe por causa de um caso concreto: Fortaleza tem exatamente **1** conjunto em Segurança. Contar isso como "tem segurança" produziria uma cobertura falsa de 8 domínios.

### U — Amplitude útil (peso 35)

`U = Σ wᵈ·(cᵈ · uᵈ) / 9`

`uᵈ` é a escada de acesso da melhor via verificada no domínio:

| Via de acesso | uᵈ |
|---|---|
| API documentada e respondendo | 1,00 |
| Download em massa CSV/JSON, ou geoserviço aberto | 0,85 |
| CSV/XLSX por conjunto, via portal | 0,70 |
| Painel com exportação | 0,45 |
| Painel sem exportação | 0,20 |
| Apenas relatório PDF | 0,05 |

**Bloqueio à automação corta `uᵈ` pela metade** (CAPTCHA, login obrigatório, necessidade de contorno). O GeoSampa é o caso: o dado urbanístico de São Paulo existe, é excelente e está atrás do CAPTCHA da Prodam — para um pipeline que precisa rodar sozinho toda semana, isso é meio dado.

`U` é multiplicativo dentro de cada domínio, e isso é a decisão de projeto mais importante da métrica. Antes de fechar assim, testei a versão que calculava usabilidade só sobre os domínios cobertos: **Curitiba ganhava 29 dos 35 pontos de U** por ter uma API boa servindo quatro domínios, apesar de não ter saúde, educação, segurança nem meio ambiente. Usabilidade de dado que não existe vale zero — com `q = c·u`, Curitiba cai para 10,9.

### E — Equilíbrio entre domínios (peso 25)

Equitabilidade de Pielou sobre os 8 domínios:

```
E = H / ln(8)        H = −Σ pᵈ·ln(pᵈ)        pᵈ = valorᵈ / Σvalor
```

O denominador é **`ln(8)`, não `ln(nº de domínios presentes)`**. É o detalhe que faz a métrica atender ao critério 3 do briefing: domínio ausente contribui 0 para `H` mas continua no denominador, então a cidade ótima em duas áreas e vazia nas outras seis é penalizada em vez de premiada por ser "perfeitamente equilibrada nas duas que tem".

Onde há contagem real por domínio, `E` usa as contagens (`e_fonte="raw"`). Onde não há, cai para o vetor `q` e o resultado é **artefato da uniformidade assumida** — ver limitação 1.

### G — Bônus de granularidade intramunicipal (0 a +10)

| Situação | G |
|---|---|
| Registro individual georreferenciado por bairro/distrito | +10 |
| Agregado por bairro/distrito | +6 |
| Agregado por região administrativa grande | +3 |
| Só nível município | 0 |

### F — Penalidade de fragilidade operacional (0 a −15)

| Falha | F |
|---|---|
| Portal principal offline ou em manutenção | −5 |
| Portal de dados abertos anunciado que não existe (404/DNS) | −5 |
| SPA sem feed legível por máquina | −4 |
| Interface web quebrada com API viva | −3 |
| Endpoints da API retornando 5xx | −3 |
| Domínios concorrentes para o mesmo portal | −2 |
| Licença não declarada | −2 |

`F` existe porque **fragilidade de infraestrutura não aparece em nenhum índice brasileiro de transparência e é o maior risco do piloto.** Um portal que cai em agosto derruba a análise regional de agosto, independente de quão bom era o dado em julho.

---

## 3. Regra eliminatória: dado nacional não pontua

DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ da Receita, RAIS/CAGED estão disponíveis para os 5.570 municípios. Se contassem, todo município do país ganharia os mesmos pontos e a métrica não separaria ninguém. Só conta esforço municipal ou estadual próprio.

Consequência concreta: a saúde de São Paulo pontua **5 conjuntos**, não os milhares de tabulações do TabNet.

---

## 4. Cálculo detalhado — Fortaleza/CE

Contagens medidas via `package_search?facet.field=["groups"]` na própria API CKAN (número auditável, não leitura de HTML):

| Domínio | Conjuntos | cᵈ | uᵈ | qᵈ = c·u | wᵈ |
|---|---|---|---|---|---|
| saúde | 35 | 1,00 | 0,85 | 0,850 | 1,2 |
| segurança | 1 | **0,25** | 0,85 | 0,213 | 1,2 |
| educação | 12 | 1,00 | 0,85 | 0,850 | 1,2 |
| mobilidade | 25 | 1,00 | 0,85 | 0,850 | 1,2 |
| economia | 34 | 1,00 | 0,85 | 0,850 | 1,2 |
| finanças | 32 | 1,00 | 0,85 | 0,850 | 1,0 |
| urbanismo | 8,5 | 0,75 | 0,85 | 0,638 | 1,0 |
| meio ambiente | 8,5 | 0,75 | 0,85 | 0,638 | 1,0 |

```
A = [1,2·(1,00+0,25+1,00+1,00+1,00) + 1,0·(1,00+0,75+0,75)] / 9
  = [5,10 + 2,50] / 9 = 0,8444

U = [1,2·(0,850+0,213+0,850+0,850+0,850) + 1,0·(0,850+0,638+0,638)] / 9
  = [4,335 + 2,125] / 9 = 0,7178

E = Pielou(35, 1, 12, 25, 34, 32, 8,5, 8,5) / ln(8) = 0,8797

IDU = 40(0,8444) + 35(0,7178) + 25(0,8797) + 0 − 0
    = 33,8 + 25,1 + 22,0 = 80,9
```

**Assunção declarada:** em Fortaleza, "Meio Ambiente e Urbanismo" é **um** grupo com 17 conjuntos, dividido 8,5/8,5 entre os dois domínios. Isso muda `E` — com o grupo tratado como único domínio, `E` cai para ~0,85. A divisão é a leitura mais favorável e está registrada como tal.

---

## 5. Resultado v1

```
#  Cidade                   IDU        faixa      A      U      E   G   F  NC
1  Fortaleza/CE            80.9       medido   0.84   0.72   0.88  +0  +0   0
2  Belo Horizonte/MG       77.3         0-95   0.75   0.64   1.00  +0  +0   8
3  Sao Paulo/SP            76.8        69-84   0.78   0.64   0.69  +6  +0   2
4  Rio de Janeiro/RJ       58.5        12-68   0.72   0.27   0.85  +8  -9   6
5  Curitiba/PR             42.2       medido   0.37   0.31   0.67  +0  +0   0
6  Vitoria/ES               3.3       medido   0.11   0.11   0.00  +0  -5   0
7  Florianopolis/SC         2.2       medido   0.11   0.08   0.00  +0  -5   0
NC Recife/PE            — nao calculavel                       +10  -6   8
NC Porto Alegre/RS      — nao calculavel                        +0  -5   8
NC Brasilia/DF          — nao calculavel                        +0  -4   8
```

`NC` = domínios ainda não medidos. **Com NC > 0, leia a faixa, não a nota pontual.**

### O que o cálculo revela

**Fortaleza é a única com nota inteiramente medida e sem faixa de incerteza.** Não é a que tem mais dado — é a que tem dado em mais lugares, acessível do mesmo jeito, e que permitiu medir a si mesma. Para um *piloto*, cuja função é validar metodologia, isso vale mais que volume.

**Belo Horizonte tem a faixa mais larga do ranking: 0 a 95.** A nota pontual de 77,3 é ficção estatística — com 522 dos 602 conjuntos sem classificação em grupo, BH pode ser a melhor ou a pior da lista. O `E = 1,00` é o artefato: ele mede a uniformidade que *eu assumi*, não a que existe. Medir BH de verdade é a tarefa de maior retorno da fase 3: são 4 horas de trabalho que podem mover a primeira posição.

**Rio de Janeiro é o caso mais instrutivo do país.** `A = 0,72` (publica em quase todos os domínios) contra `U = 0,27` (quase nada é coletável). A distância entre esses dois números é exatamente o custo de engenharia de usar o Rio. Some `F = −9` e a conta fecha em 58,5, apesar do ITGP 98/100 e da melhor base criminal aberta do Brasil (ISP-RJ, série longa por AISP/CISP).

**Recife é o achado que quebra a métrica, e isso é informação.** A cidade com a melhor granularidade verificada do país — arboviroses 2013-2025, CSV por registro, com distrito e bairro — não pode ser pontuada, porque `package_search`, `group_show` e `group_list?all_fields=true` retornam HTTP 500. São precisamente os endpoints que medem cobertura por domínio. Recife provavelmente pertence ao top 3 e não há como provar sem enumerar os conjuntos por outra via.

**Vitória e Florianópolis, 1ª e 2ª colocadas em rankings nacionais de cidade inteligente, tiram 3,3 e 2,2.** Vitória tem decreto, portaria, licença CC0 e API fiscal viva — e `dados.vitoria.es.gov.br` responde 404. Florianópolis é 1ª no CLP e seu domínio de dados abertos não resolve em DNS. Política pública de dados abertos e dado aberto são coisas diferentes.

---

## 6. Regra de leitura obrigatória

**`E` alto com `U` baixo significa "uniformemente ruim", não "equilibrado".** `E` mede só a forma da distribuição, nunca o nível. O Rio tem `E = 0,85` e é o 4º colocado. Nunca cite `E` sozinho.

---

## 7. Limitações conhecidas da v1

1. **`E` sobre o vetor `q` é circular.** Quando a contagem por domínio não existe, assumo `c` uniforme e o Pielou devolve ~1,00 medindo minha própria assunção. Vale para BH, Curitiba e Rio. A faixa min–max é o remendo honesto; a correção real é medir.
2. **Taxonomias de CKAN não são comparáveis entre cidades.** "Gestão Pública" em Fortaleza foi mapeada para finanças; "Meio Ambiente e Urbanismo" é um grupo só. Um mapeamento canônico dos grupos das 5 cidades para os 8 domínios é pré-requisito para comparação rigorosa.
3. **Conjunto de dados é unidade ruim.** Um CSV com 12 anos de registros individuais e um XLSX com uma tabela contam 1 cada. A v2 deveria pesar por profundidade temporal e por granularidade da linha.
4. **`G` e `F` são calibrados a olho.** Os valores −5/−4/−3 refletem julgamento de custo de engenharia, não medição. São o componente mais frágil da fórmula.
5. **Nenhum valor passou pela auditoria adversarial.** Todas as contagens vêm de um único agente por cidade. A fase 3 pode derrubar qualquer linha — a v1 é hipótese quantificada, não resultado.
6. **A escada de acesso premia a existência da API, não sua qualidade.** Uma API que responde mas pagina de 10 em 10 registros com limite de taxa recebe os mesmos 1,00 de uma que entrega em massa.

---

## 8. Como recalcular

Nesta máquina o Python não está no PATH como `python` — o interpretador usado foi `C:\Python312_10`:

```bash
/c/Python312_10/python.exe idu.py          # tabela
/c/Python312_10/python.exe idu.py --csv    # CSV para planilha
```

Para atualizar uma cidade, edite o dicionário `CIDADES` em [idu.py](../idu.py): as contagens ficam em `counts`, a via de acesso em `acesso`, e cada entrada tem um campo `nota` com a procedência do número. Toda alteração deve citar o arquivo em `docs/parciais/` que a sustenta.
