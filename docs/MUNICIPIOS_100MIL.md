# Projeto Brasil iA — tabela nacional dos municípios acima de 100 mil habitantes

**Status:** tabela completa publicada; Santa Catarina é o primeiro estado com triagem de fontes concluída
**Data de corte:** 2026-08-01
**Escopo:** organizar a expansão da coleta de fontes municipais por estado, começando pela faixa de porte que a métrica do projeto considera viável (a faixa ampliada do P-Piloto começa em 100 mil habitantes)

## Resposta curta

O Brasil tem **338 municípios com mais de 100 mil habitantes** (estimativa IBGE 2025, revisão de 13/01/2026), distribuídos pelas 27 unidades da federação. Varrer os 5.571 municípios de uma vez é inviável; varrer 338, dividido por estado entre contribuidores, é um trabalho de comunidade. A tabela interativa está em [municipios-100mil.html](../municipios-100mil.html) e a fonte estruturada em [municipios_100mil.json](../municipios_100mil.json). **Santa Catarina (14 municípios) já foi triada** — evidência em [docs/parciais/regiao-sc-100mil.md](parciais/regiao-sc-100mil.md).

---

## 1. Por que cortar em 100 mil

- A curva do P-Piloto ([METRICA_IDU_V2.md](METRICA_IDU_V2.md), seção 6) define 200–600 mil como faixa ótima do primeiro piloto e **100 mil a 1 milhão como faixa ampliada adequada**. O corte de 100 mil captura todo esse universo, mais as metrópoles que servem de benchmark.
- Municípios menores não ficam de fora do projeto: eles têm um experimento próprio, com outra pergunta, em [CIDADES_PEQUENAS.md](CIDADES_PEQUENAS.md).
- 338 municípios divididos por estado dão lotes de trabalho realistas (a mediana por UF é 4–10 municípios; só SP tem 81).

## 2. Fonte e validação

- **População:** [IBGE — Estimativas da População 2025, revisão de 13/01/2026](https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/POP2025_20260113.ods) — a mesma referência do dossiê e do experimento de cidades pequenas.
- **Extração:** tabela SIDRA 6579, variável 9324, período 2025 ([API](https://apisidra.ibge.gov.br/values/t/6579/n6/all/v/9324/p/2025)), consultada em 2026-08-01.
- **Validação:** 12 valores publicados no repositório (`DOSSIE_PILOTO.md` e `CIDADES_PEQUENAS.md` — de São Paulo a Treze Tílias) foram comparados com a extração: **12/12 idênticos**, confirmando que a API reflete a mesma revisão.

## 3. Contagem por estado

| UF | Municípios >100 mil | UF | Municípios >100 mil |
|---|---:|---|---:|
| SP | 81 | MT | 6 |
| MG | 36 | SE | 5 |
| RJ | 29 | AM | 4 |
| PR | 24 | PB | 4 |
| RS | 19 | RN | 4 |
| BA | 18 | RO | 4 |
| GO | 17 | MS | 3 |
| PE | 15 | AL | 2 |
| PA | 15 | AP | 2 |
| **SC** | **14** | PI | 2 |
| MA | 10 | TO | 2 |
| ES | 10 | DF | 1 |
| CE | 9 | RR | 1 |
| — | — | AC | 1 |

Total: **338**.

## 4. Modelo de coleta por estado

Cada município da tabela carrega um `status_coleta`:

| Status | Significado |
|---|---|
| `triado` | O estado passou por busca datada, com fontes e limitações registradas; não significa auditoria IDU-Br completa |
| `inventariado` | Cidade já coberta pelo inventário principal do projeto ([inventario.html](../inventario.html)) |
| `pendente` | Aguardando triagem — é aqui que novas contribuições entram |

O papel no ranking é outra dimensão: as dez cidades atuais carregam `papel: "top10"`. Assim, entrar no Top 10 não é confundido com estágio ou profundidade da coleta.

Cada fonte registrada carrega um status herdado dos marcadores do parcial: `confirmado` (aberto na sessão da triagem), `parcial` (existe, mas não plenamente verificável por fetch), `pista` (localizado apenas em busca) e `lacuna` (verificado morto ou ausente). O JSON também aceita `fontes_estaduais` por UF, para a camada E da métrica.

**Para contribuir com um estado:**

1. Crie `docs/parciais/regiao-<uf>-100mil.md` seguindo o [protocolo do documento vivo](PROTOCOLO_DOC_VIVO.md) — cabeçalho antes da primeira busca, um marcador por URL, fraquezas obrigatórias.
2. Faça a triagem de uma passada por município, com as cinco perguntas de [CIDADES_PEQUENAS.md](CIDADES_PEQUENAS.md) (acesso, cobertura, território, atualidade, governança).
3. Atualize o `municipios_100mil.json` do seu estado (status, fontes, nota) e envie o PR com os dois arquivos.

## 5. Resultado da primeira triagem — Santa Catarina

Síntese após o [pente-fino](AUDITORIA_PENTE_FINO_100MIL.md): o padrão catarinense é **geo forte e operacionalmente estreito**. Joinville expõe 35 entradas de serviço/32 nomes únicos no SIMGeo e respondeu com cadastros de saúde e educação. **Camboriú** (4203204) publica 17 produtos majoritariamente em PDF, portanto não é outlier de dados estruturados. **Balneário Camboriú** (4202008) é outro município e expõe WFS com 73 tipos de feição, mas o acervo é cadastral e várias camadas testadas estão vazias. Tubarão mantém bons sinais de digitalização, ainda sem arquivo/API enumerado. Os 14 municípios têm status `triado`, não `auditado`. Camada estadual utilizável: CKAN `dados.sc.gov.br` e SSP-SC.

## 6. Limites

- A tabela **não é ranking**: ordena por população dentro de cada UF e não atribui nota. A qualidade dos dados continua sendo medida pelo IDU-Br quando houver auditoria.
- A triagem estadual é de uma passada por município — falso negativo é possível, especialmente em portais JavaScript (o mesmo alerta de `CIDADES_PEQUENAS.md`).
- Populações são estimativas: mudanças de revisão do IBGE podem mover municípios que orbitam a linha dos 100 mil.
