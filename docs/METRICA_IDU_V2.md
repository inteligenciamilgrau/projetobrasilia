# IDU-Br v2.1 — qualidade, porte do piloto e confiança da avaliação

**Status:** proposta para auditoria e calibração
**Data:** 2026-08-01
**Substitui para novas avaliações:** [METRICA_IDU.md](METRICA_IDU.md), que permanece como registro da v1
**Implementação da fórmula e validações:** [idu_v2.py](../idu_v2.py)

## 1. Três perguntas, três resultados

A v2.1 nunca mistura:

- **IDU-Br (0–100):** qual é a qualidade do ecossistema local de dados;
- **P-Piloto (0–100):** quão adequado é o porte populacional para uma primeira implementação controlada;
- **C-IDU (0–100):** quão confiável é a nossa avaliação daquela cidade.

Para ordenar candidatas ao primeiro piloto, publica também:

- **IPS-Br (0–100):** índice de prioridade do piloto, combinando qualidade e adequação de porte.

Exemplo de apresentação correta: `IDU-E 76 [70–82] · P-Piloto 100 · IPS-Br 82 · C-IDU 84`.

Não se multiplica nenhuma nota por C-IDU. Fazer isso confundiria qualidade do município com falta de pesquisa: uma cidade mediana muito estudada poderia superar artificialmente uma excelente cidade ainda pouco auditada.

## 2. Problemas encontrados na v1

1. Os pesos 40/35/25 foram inferidos da ordem do briefing; não foram definidos pelo usuário.
2. Número de datasets não é comparável entre portais: um conjunto pode conter 12 anos de microdados e outro uma única tabela; alguns portais fragmentam por mês e outros consolidam tudo.
3. A equitabilidade de Pielou pode dar equilíbrio alto a uma cidade uniformemente ruim e, quando usa valores imputados, mede a própria suposição.
4. O bônus `G` e a penalidade `F` foram calibrados por julgamento e podem contar duas vezes acesso/granularidade.
5. Valores ausentes receberam ponto central presumido, criando notas aparentemente precisas e faixas como 0–95.
6. A v1 mistura dado municipal e dado estadual sem mostrar a dependência. Segurança pública, por desenho federativo, quase sempre é estadual.
7. O código ficou defasado em relação às próprias evidências: Recife, Curitiba, Porto Alegre e Brasília são os casos mais claros.

## 3. Unidade de avaliação

Avaliar oito domínios canônicos:

`saúde · segurança · educação · mobilidade/trânsito · comércio/economia · finanças · urbanismo/habitação · meio ambiente`

Para cada domínio, registrar separadamente a melhor fonte de cada camada:

- `M`: municipal própria;
- `E`: estadual/distrital/metropolitana com recorte municipal ou menor;
- `N`: nacional com recorte municipal — serve como baseline, mas não diferencia a candidata e não pontua;
- `C`: civil/universitária — complemento, nunca substituto silencioso da fonte oficial.

Publicar duas notas:

- **IDU-M:** autonomia municipal;
- **IDU-E:** ecossistema utilizável no território (`M + E`, sem duplicar conteúdo).

O ranking do piloto usa IDU-E. A diferença `IDU-E − IDU-M` revela dependência externa.

## 4. Rubrica por domínio

Cada item recebe 0–4. Sempre guardar valor central, mínimo e máximo plausíveis.

| Eixo | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| **D — profundidade** | ausente | cadastro/lista isolada | indicadores ou poucas séries | várias séries operacionais | microdados/eventos diversos e documentados |
| **U — acesso** | inacessível | PDF/painel sem exportação | exportação manual CSV/XLS | bulk CSV/JSON/GeoJSON ou WFS | API documentada + bulk/schema testados |
| **F — frescor/continuidade** | sem data ou >5 anos | 3–5 anos | 1–3 anos | até 12 meses, irregular | no prazo declarado e série contínua |
| **T — território** | só total municipal | macro-região | bairro/distrito ou unidade | endereço/evento georreferenciado | registro fino + malha/crosswalk público e cobertura municipal |
| **R — governança/resiliência** | quebrado/sem origem | fonte única frágil | estável, mas sem licença/esquema | licença, metadado e responsável | monitoramento/SLA/versionamento e canal alternativo |

Regras:

- portal, dashboard ou notícia sem um recurso aberto não prova profundidade;
- contar conteúdo único, não recursos mensais duplicados;
- um recurso só recebe nota 4 de acesso depois que ao menos uma amostra foi baixada e seu esquema lido;
- dado atrasado é medido contra a periodicidade declarada, não apenas contra a data atual;
- cobertura territorial exige dados substantivos associados à malha, não apenas um shapefile de bairros vazio de indicadores.
- função genérica de fornecedor (botão “Dados Abertos”, exportação padrão ou API incluída no CMS) pontua `U` apenas para os recursos efetivamente testados; não prova, sozinha, governança municipal nem aumenta `R`;
- notas 3–4 em `R` exigem evidência específica do município: responsável, política/licença, esquema ou dicionário, rotina de atualização e mecanismo de continuidade — não apenas a marca ou a capacidade anunciada da plataforma;
- quando inventário, rótulos e endpoints não correspondem entre si, registrar contradição material, ampliar o intervalo de `U/R` e aplicar o teto pertinente ao C-IDU até a inconsistência ser resolvida.

## 5. Fórmula da qualidade

Para cada domínio `d`, normalizar os cinco itens para 0–1: `D_d`, `U_d`, `F_d`, `T_d`, `R_d`.

```text
A = média ponderada(D_d)
U = média ponderada(D_d × U_d)
F = média ponderada(D_d × F_d)
T = média ponderada(D_d × T_d)
R = média ponderada(D_d × R_d)

Q_d = D_d × (0,45U_d + 0,30F_d + 0,15T_d + 0,10R_d)
B = média dos quatro menores Q_d

IDU-Br v2 = 30A + 25U + 15F + 10T + 10B + 10R
```

Os cinco domínios citados no briefing podem continuar com peso relativo 1,2 e os três complementares com 1,0, desde que isso seja declarado. Deve existir também uma saída com pesos iguais para testar sensibilidade.

`B` usa a metade mais fraca dos domínios, não entropia. Assim, uma cidade excelente em duas áreas e vazia em seis recebe equilíbrio baixo; uma cidade uniformemente ruim também recebe equilíbrio baixo.

Não existem bônus ou penalidades fora da escala. Granularidade e fragilidade entram uma vez, em `T` e `R`.

## 6. Porte adequado ao primeiro piloto (P-Piloto e IPS-Br)

População não altera a qualidade dos dados. Ela altera o custo e o risco de executar o primeiro piloto: volume de registros, quantidade de equipamentos públicos, subdivisões territoriais, número de sistemas e variedade de atores tendem a crescer com o porte.

O inverso também importa. Municípios muito pequenos são fáceis de processar, mas podem não testar a diversidade administrativa e temática necessária para criar um padrão nacional. Por isso, P-Piloto usa uma curva de adequação, e não uma regra em que “menor é sempre melhor”.

### Faixa ótima provisória

O ponto de partida recomendado é **200 mil a 600 mil habitantes**. A faixa ampliada de **100 mil a 1 milhão** ainda é adequada, com redução gradual nas bordas. Acima de 1 milhão a complexidade passa a pesar de forma relevante; abaixo de 100 mil cai a representatividade do teste.

Essa curva é uma **hipótese operacional**, não um resultado científico já validado. Ela foi escolhida porque:

- inclui cidades com administração e serviços suficientemente diversos;
- contém os melhores outliers de porte médio já encontrados, como Jundiaí, Niterói e Caxias do Sul;
- evita começar com a fragmentação e o volume de metrópoles multimilionárias;
- usa transições suaves, sem eliminar uma cidade por estar pouco acima ou abaixo de um corte.

Usar a estimativa municipal oficial mais recente do IBGE, guardando valor, data de referência e fonte. Para esta versão, a referência é a [Estimativa da População 2025 do IBGE](https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-depopulacao.html), com data-base em 1º de julho de 2025.

| População | P-Piloto | Leitura operacional |
|---:|---:|---|
| até 50 mil | 20–40 | simples, porém pouco representativa |
| 50–100 mil | 40–70 | ainda pequena para testar todos os domínios |
| 100–200 mil | 70–100 | transição para a faixa ótima |
| **200–600 mil** | **100** | melhor equilíbrio inicial |
| 600 mil–1 milhão | 100–80 | boa, com complexidade crescente |
| 1–2 milhões | 80–55 | metrópole; exige redução de escopo |
| 2–5 milhões | 55–30 | alta complexidade operacional |
| 5–12 milhões | 30–15 | megacidade; usar como benchmark, não como primeiro piloto |
| 12 milhões ou mais | 15 | piso da curva |

Entre as âncoras, a nota é interpolada linearmente. A população não gera intervalo de IDU e não aumenta a confiança da avaliação.

### Pontuação de seleção

```text
IPS-Br = 0,75 × IDU-E + 0,25 × P-Piloto
```

Qualidade mantém 75% do peso. Porte recebe 25%: suficiente para distinguir um piloto controlável de uma megacidade, sem permitir que uma cidade pequena com dados fracos vença apenas por ser fácil.

Regras:

- o ranking operacional usa IPS-Br; o ranking de qualidade continua usando IDU-E;
- C-IDU permanece separado e acompanha os dois rankings;
- publicar sensibilidade com peso de porte de 15%, 25% e 35%;
- uma boa nota de porte não compensa domínios ausentes ou evidência fraca;
- cidades acima de 1 milhão podem continuar como benchmarks e entrar em ondas posteriores ou em pilotos setoriais.

Depois da primeira execução, recalibrar as âncoras contra horas de engenharia, volume baixado, número de fontes, falhas de ingestão e tempo até o primeiro produto público.

## 7. Confiança da avaliação (C-IDU)

Pontuar 0–4 em seis dimensões:

| Componente | Peso | Pergunta |
|---|---:|---|
| completude | 25 | Os oito domínios foram examinados e ausências foram testadas? |
| força da evidência | 25 | Houve download/API e leitura de esquema, ou apenas página/notícia? |
| reprodutibilidade | 20 | Há URL estável, consulta, data, log e resultado repetível? |
| concordância independente | 15 | Dois avaliadores chegaram a resultado semelhante? |
| consistência | 10 | Contradições foram resolvidas e duplicatas removidas? |
| recência da verificação | 5 | O teste é recente para a periodicidade da fonte? |

```text
C-IDU = 100 × (0,25C + 0,25E + 0,20P + 0,15I + 0,10K + 0,05V)
```

Tetos obrigatórios:

- nenhum arquivo/API teve esquema lido: `C-IDU ≤ 79`;
- três ou mais domínios desconhecidos: `C-IDU ≤ 69`;
- contradição material não resolvida: `C-IDU ≤ 59`;
- avaliação baseada só em busca/notícia: `C-IDU ≤ 39`.

Faixas: `alta ≥80`, `média 60–79`, `baixa <60`.

## 8. Intervalo e estabilidade do ranking

Cada nota 0–4 deve guardar `[mínimo, central, máximo]` conforme a evidência:

- arquivo baixado + esquema lido: incerteza típica `±0,25`;
- endpoint/listagem oficial aberto, recurso não lido: `±0,5`;
- painel oficial apenas: `±1`;
- desconhecido: `[0,4]`, sem ponto central usado para decisão.

Calcular:

1. IDU mínimo e máximo;
2. simulação de Monte Carlo sorteando valores dentro dos intervalos;
3. pesos perturbados em ±25%;
4. mediana da posição, intervalo de posição e probabilidade de top 10;
5. análise `leave-one-domain-out` para detectar cidade dependente de um único tema.

Uma posição só é “estável” quando permanece no top 10 em pelo menos 80% das simulações.

## 9. Como validar a própria métrica

- Dupla codificação cega de pelo menos 20% das cidades; medir kappa ponderado por eixo.
- Auditoria de falsos positivos: portais com muitos rótulos e poucos dados reais.
- Auditoria de falsos negativos: fontes setoriais fora do catálogo central.
- Validade preditiva no piloto: comparar IDU e P-Piloto com horas até a primeira ingestão, volume processado, quantidade de fontes, taxa de downloads bem-sucedidos, percentual de campos documentados e disponibilidade após 30/90 dias.
- Revisar pesos somente depois desses resultados; publicar todas as versões.

Meta mínima antes de chamar a métrica de calibrada: kappa ≥0,70 nos cinco eixos e correlação coerente entre IDU e custo real de ingestão.

## 10. Saída obrigatória por cidade

```text
Cidade/UF
População/data/fonte: valor · data de referência · IBGE
IDU-M: valor [mín–máx]
IDU-E: valor [mín–máx]
P-Piloto: valor
IPS-Br: valor
C-IDU: valor/faixa
Probabilidade top 10: n%
Dependência externa: IDU-E − IDU-M
Domínios fracos: ...
Fontes que determinam a nota: ...
Data da última verificação: ...
```

Até a matriz ser recodificada nessa rubrica, a shortlist do dossiê deve ser lida por faixas e confiança, não por casas decimais.
