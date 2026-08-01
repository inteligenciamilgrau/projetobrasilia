# setor:educacao — tarefa setorial de EDUCAÇÃO (além do nacional INEP/Censo Escolar/SAEB/ENEM/QEdu)

**Status:** concluído (duas execuções transcritas)
**Última atualização:** 2026-08-01
**Agente:** `setor:educacao`
**Transcrição:** este arquivo NÃO é pesquisa nova. É transcrição de um registro local de execução, não versionado. Nenhuma busca ou abertura de página foi executada por quem transcreveu. Nenhum status de verificação foi promovido.

**Origem no journal:**

| Execução | referência interna | Linha do journal | Data declarada pelo agente |
|---|---|---|---|
| Execução 1 | `execucao-1` | 23 | 31/07/2026 |
| Execução 2 | `execucao-2` | 47 | 01/08/2026 |

As duas execuções rodaram a MESMA tarefa (chave `chave-interna-omitida`). A Execução 1 rodou **sem WebSearch** (orçamento esgotado antes dela) e contornou usando as APIs CKAN como mecanismo de descoberta. A Execução 2 teve WebSearch. As duas estão transcritas separadamente; divergências ao final.

## Legenda da camada (a)/(b) — o coração do projeto

| Marcador | Significado |
|---|---|
| `(b) MUNICIPAL PRÓPRIO` | Dado que só existe porque a Secretaria Municipal de Educação produz. Isto pontua. |
| `[NACIONAL — não pontua]` | INEP (microdados Censo Escolar, SAEB, Catálogo de Escolas), QEdu, dados.gov.br. Disponível para os 5.570 municípios; não diferencia candidata. |
| `(a)+(b) MISTO` | O conjunto/portal republica base nacional ao lado de dado próprio. A coluna diz qual é qual. |

Enquadramento literal da Execução 1 sobre a camada nacional: *"Como baseline nacional a cobertura é forte e comparável entre todos os municípios […] Mas é dado NACIONAL padronizado: não tem fila de creche, não tem merenda servida, não tem avaliação municipal própria. Ou seja, complementa e não substitui o dado municipal."*
Enquadramento literal da Execução 2: *"Cobertura nacional uniforme mas rasa por município […] NÃO cobre o que só o município tem — fila de creche, merenda servida, avaliação própria, transporte escolar, rendimento por turma. É por isso que o piloto precisa de uma cidade com dado próprio."*

---

# EXECUÇÃO 1 — referência interna `execucao-1` (31/07/2026)

> **LIMITAÇÃO DECLARADA NO INÍCIO (literal):** *"o orçamento de WebSearch já estava ZERADO quando comecei (200/200 chamadas consumidas antes de mim). As minhas 2 primeiras tentativas de busca retornaram 'web search budget exhausted'. Portanto NÃO fiz nenhuma descoberta por busca. Todo o resultado abaixo vem de WebFetch direto."*
> Contorno declarado: *"em vez de adivinhar slugs de dataset, usei as APIs CKAN dos portais como mecanismo de descoberta […] Os counts que reporto ('count': 53 em SP, 28 em Fortaleza, 20 em BH, 1 em POA, 0 em BH para 'matricula') são valores que o servidor devolveu."*

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada (a)/(b) | Status |
|---|---|---|---|---|---|---|---|---|
| São Paulo/SP | educação | Portal de Dados Abertos da Prefeitura — lista de conjuntos | dados.prefeitura.sp.gov.br/dataset | portal-dados-abertos | desconhecido | varia por conjunto | `(b) MUNICIPAL PRÓPRIO` — organização "Educação - SME" com 44 datasets | `[fetch-ok]` |
| São Paulo/SP | educação | CKAN API `package_search` (q=educacao) | dados.prefeitura.sp.gov.br/api/3/action/package_search?q=educacao&rows=40 | api | desconhecido | n/a (endpoint de busca) | n/a — servidor devolveu `"count": 53` | `[fetch-ok]` |
| São Paulo/SP | educação | Microdados da Rede Municipal — Matrículas (SME/COTIC-DIE) | dados.prefeitura.sp.gov.br/dataset/microdados-matriculas | csv/xlsx | registro individual | anual (última atualização 10/06/2026) | `(b) MUNICIPAL PRÓPRIO` — 2000-2025, *"mais de um milhão de linhas"* | `[fetch-ok]` |
| São Paulo/SP | educação | **Microdados da Prova São Paulo** (avaliação municipal própria) | dados.prefeitura.sp.gov.br/dataset/microdados-psp | csv/xlsx | registro individual | anual, publicação até outubro do ano seguinte | `(b) MUNICIPAL PRÓPRIO` — *"criada em 2007 com o objetivo de ampliar a avaliação realizada pelo SAEB"*; ZIPs 2017-2024 | `[fetch-ok]` |
| São Paulo/SP | educação | **IDEP** — Índice de Desenvolvimento da Educação Paulistana (por escola) | dados.prefeitura.sp.gov.br/dataset/idep | csv/xlsx | equipamento/unidade | anual (2018-2025) | `(b) MUNICIPAL PRÓPRIO` — 24 resources, XLSX/CSV/XLS + nota técnica | `[fetch-ok]` |
| São Paulo/SP | educação | **Tempo médio de Atendimento — Fila da Creche** | dados.prefeitura.sp.gov.br/dataset/tempofilacreche | csv/xlsx | distrito/bairro | anual (última atualização 10/06/2026) | `(b) MUNICIPAL PRÓPRIO` — séries 2016-2025 em XLSX, ODS e CSV | `[fetch-ok]` |
| São Paulo/SP | educação | Demanda Registrada e Matrículas — Ed. Infantil, Fundamental e EJA | dados.prefeitura.sp.gov.br/dataset/demanda-e-matriculas | csv/xlsx | distrito/bairro | bimestral desde 2023 (resource mais recente Jun/2026) | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| São Paulo/SP | educação | Alimentação escolar — Relatório de refeições servidas | dados.prefeitura.sp.gov.br/dataset/alimentacao-escolar-relatorio-de-refeicoes-servidas | csv/xlsx | equipamento/unidade | anual (última atualização 01/07/2026) | `(b) MUNICIPAL PRÓPRIO` — detalhe mensal 2009-2015, anual 2016-2025 | `[fetch-ok]` |
| São Paulo/SP | educação | Diretorias Regionais de Educação — Informações Geoespaciais | dados.prefeitura.sp.gov.br/dataset/diretorias-regionais-de-educacao-informacoes-geoespaciais | portal-dados-abertos | distrito/bairro | "quando houver necessidade"; dado atualizado 11/06/2026 | `(b) MUNICIPAL PRÓPRIO` — Shapefile em ZIP das 13 DREs | `[fetch-ok]` |
| São Paulo/SP | educação | Rendimento e movimento escolar — Fundamental e Médio (SME) | dados.prefeitura.sp.gov.br/dataset/rendimento-e-movimento-escolar-ensino-fundamental | csv/xlsx | distrito/bairro | desconhecida; série 2000-2015 com atualizações até 2021 | `(b) MUNICIPAL PRÓPRIO` alegado | `[nao-testado]` — *"NÃO abri esta página […] A URL acima foi montada a partir do slug e precisa ser conferida"* |
| São Paulo/SP | educação | Ideb e Prova Brasil na Rede Municipal (2005-2023) | dados.prefeitura.sp.gov.br/dataset/ideb-e-prova-brasil-na-rede-municipal-de-ensino | csv/xlsx | equipamento/unidade | desconhecida (série 2005-2023) | `[NACIONAL — não pontua]` no conteúdo (Ideb/Prova Brasil são INEP), republicado pela SME | `[nao-testado]` — *"NÃO abri esta página […] URL montada a partir do slug"* |
| São Paulo/SP | educação | Microdados — Perfil dos Servidores da Educação Municipal | dados.prefeitura.sp.gov.br/dataset/microdados-servidores-perfil | csv/xlsx | registro individual | desconhecida (série 2010-2025) | `(b) MUNICIPAL PRÓPRIO` alegado | `[nao-testado]` — *"NÃO abri esta página […] URL montada a partir do slug"* |
| Fortaleza/CE | educação | Portal de Dados Abertos de Fortaleza | dados.fortaleza.ce.gov.br/ | portal-dados-abertos | desconhecido | varia por conjunto | `(a)+(b) MISTO` — CKAN, declara "635 Conjuntos de dados" | `[fetch-ok]` |
| Fortaleza/CE | educação | CKAN API `package_search` (q=educacao) | dados.fortaleza.ce.gov.br/api/3/action/package_search?q=educacao&rows=40 | api | desconhecido | n/a | n/a — `count 28` | `[fetch-ok]` |
| Fortaleza/CE | educação | **Base de Dados de Unidades Escolares e Alunos da Rede Municipal** | dados.fortaleza.ce.gov.br/dataset/matricula-na-rede-municipal | csv/xlsx | registro individual | última atualização 30/01/2024; referência 31/12/2023 | `(b) MUNICIPAL PRÓPRIO` — *"dados anonimizados do estudante"* (mês/ano de nascimento, raça/cor, sexo, nacionalidade, deficiência) | `[fetch-ok]` |
| Fortaleza/CE | educação | Unidades Educacionais da SME (coordenadas e vagas) | dados.fortaleza.ce.gov.br/dataset/unidades-educacionais-sme | csv/xlsx | equipamento/unidade | última atualização 30/01/2024; referência 31/12/2023 | `(b) MUNICIPAL PRÓPRIO` — inclui **capacidade (vagas)** | `[fetch-ok]` |
| Fortaleza/CE | educação | CKAN API `package_search` (q=matricula) | dados.fortaleza.ce.gov.br/api/3/action/package_search?q=matricula&rows=20 | api | desconhecido | n/a | `(a)+(b) MISTO` — `count 9`; confirma "Censo Escolar 2017-2021 - SME" `(b)` e conjunto do IPPLAN apontando para Dropbox | `[fetch-ok]` |
| Fortaleza/CE | educação | Recursos e Serviços Escolares no contexto da Alimentação Escolar (cardápio) | dados.fortaleza.ce.gov.br/dataset/cardapio-alimentacao-escolar | csv/xlsx | equipamento/unidade | desconhecida | `(b) MUNICIPAL PRÓPRIO` alegado | `[nao-testado]` — *"NÃO abri esta página […] URL montada a partir do slug"* |
| Belo Horizonte/MG | educação | Portal de Dados Abertos da PBH | dados.pbh.gov.br/ | portal-dados-abertos | desconhecido | varia por conjunto | `(b) MUNICIPAL PRÓPRIO` — declara 602 conjuntos, 26 organizações, 21 grupos | `[fetch-ok]` |
| Belo Horizonte/MG | educação | Rede Municipal de Educação (localização das escolas, série mensal) | dados.pbh.gov.br/dataset/rede-municipal-de-educacao | csv/xlsx | equipamento/unidade | mensal declarada; resources de jun/2022 até **jul/2026** | `(b) MUNICIPAL PRÓPRIO` — 50 resources CSV, coordenadas EPSG:31983, PRODABEL | `[fetch-ok]` |
| Belo Horizonte/MG | educação | Relação de Escolas Municipais da Rede Própria | dados.pbh.gov.br/dataset/relacao-de-escolas-municipais-da-rede-propria | csv/xlsx | equipamento/unidade | "eventual"; resources dez/2024, jan/2025, mar/2025, jan/2026; portal atualizado 18/06/2026 | `(b) MUNICIPAL PRÓPRIO` — campo "oferta refeição" é *"o único gancho de merenda que achei em BH"* | `[fetch-ok]` |
| Belo Horizonte/MG | educação | CKAN API `package_search` (q=escola) | dados.pbh.gov.br/api/3/action/package_search?q=escola&rows=40 | api | desconhecido | n/a | n/a — `count 20` | `[fetch-ok]` |
| Belo Horizonte/MG | educação | CKAN API `package_search` (q=matricula) — **evidência de AUSÊNCIA** | dados.pbh.gov.br/api/3/action/package_search?q=matricula&rows=30 | api | n/a | n/a | n/a | `[fetch-ok]` — *"A API respondeu \"count\": 0, \"results\": []. […] Registro isso como evidência negativa verificada, não como falha de busca."* |
| Porto Alegre/RS | educação | Portal de Dados Abertos de Porto Alegre | dadosabertos.poa.br/ | portal-dados-abertos | desconhecido | varia por conjunto | `(b) MUNICIPAL PRÓPRIO` — declara 56 conjuntos no portal inteiro | `[fetch-ok]` |
| Porto Alegre/RS | educação | SIE — Sistema de Informações Educacionais (via API) | dadosabertos.poa.br/api/3/action/package_search?q=educacao&rows=30 | api | equipamento/unidade | desconhecida | `(b) MUNICIPAL PRÓPRIO` — `count 1`: único conjunto de educação; 4 resources (Cadastro Escolas CSV, Matrículas Escolas CSV, 2 dicionários PDF) | `[fetch-ok]` |
| Brasil (nacional) | educação | INEP — Microdados do Censo Escolar da Educação Básica | www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar | csv/xlsx | equipamento/unidade | anual; arquivo 2025 atualizado em julho/2026 | `[NACIONAL — não pontua]` — 1995 a 2025 em ZIP | `[fetch-ok]` |
| Brasil (nacional) | educação | INEP — Microdados do SAEB | www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/saeb | csv/xlsx | registro individual | bienal; mais recente 2023 | `[NACIONAL — não pontua]` — 1995 a 2023 em ZIP | `[fetch-ok]` |
| Brasil (nacional) | educação | QEdu | qedu.org.br/ | desconhecido | desconhecido | desconhecida | `[NACIONAL — não pontua]` | `[fetch-falhou]` — **HTTP 403 Forbidden.** *"Não posso afirmar nada sobre o que o QEdu oferece hoje […] trate como não verificado nesta sessão"* |
| Brasil (nacional) | educação | dados.gov.br — API pública de busca de conjuntos | dados.gov.br/api/publico/conjuntos-dados/buscar?nomeConjuntoDados=censo%20escolar | api | n/a | n/a | `[NACIONAL — não pontua]` | `[fetch-falhou]` — **HTTP 401 Unauthorized.** *"exige credencial/chave"* |
| Rio de Janeiro/RJ | educação | data.rio — feed DCAT-US do catálogo | www.data.rio/api/feed/dcat-us/1.1.json | api | município | varia; itens de educação antigos | `(b)` alegado, mas *"TODOS com distribuição apenas 'Web Page (HTML)' — sem CSV, GeoJSON ou API"* | `[fetch-ok]` |
| Rio de Janeiro/RJ | educação | data.rio — busca por "educacao" | www.data.rio/search?q=educacao | painel/dashboard | desconhecido | n/a | n/a | `[fetch-ok]` — *"renderizou apenas o cabeçalho 'DATA.RIO' sem nenhum dataset […] é uma SPA renderizada por JavaScript"* |
| Rio de Janeiro/RJ | educação | Escolas municipais do Rio como feature service / geoserviço | www.data.rio/ | desconhecido | desconhecido | desconhecida | `(b)` hipotético | `[nao-testado]` — *"NÃO testei. […] Não afirmo que não existe — afirmo que não achei no feed DCAT e não consegui verificar."* |
| Curitiba/PR | educação | Portal de dados abertos de Curitiba | dadosabertos.curitiba.pr.gov.br/ | portal-dados-abertos | desconhecido | varia | `(b)` — *"Declara apenas '32' conjuntos no total […] NENHUM de educação"* | `[fetch-ok]` |
| Curitiba/PR | educação | Tentativa de listagem de conjuntos (`/dados`) | dadosabertos.curitiba.pr.gov.br/dados | desconhecido | n/a | n/a | n/a | `[fetch-falhou]` — HTTP 404 Not Found |
| Curitiba/PR | educação | Tentativa de busca por "educacao" | dadosabertos.curitiba.pr.gov.br/busca?q=educacao | desconhecido | n/a | n/a | n/a | `[fetch-falhou]` — HTTP 404. *"Não é portal CKAN, então não há /api/3/action/package_search para enumerar"* |
| Recife/PE | educação | Portal de Dados Abertos do Recife (https) | dados.recife.pe.gov.br/ | portal-dados-abertos | n/a | n/a | n/a | `[fetch-falhou]` — HTTP 500 Internal Server Error |
| Recife/PE | educação | Recife — API CKAN `package_search` (q=educacao) | dados.recife.pe.gov.br/api/3/action/package_search?q=educacao&rows=40 | api | n/a | n/a | n/a | `[fetch-falhou]` — HTTP 500 |
| Recife/PE | educação | Recife — listagem de conjuntos com busca por educação | dados.recife.pe.gov.br/dataset?q=educacao | portal-dados-abertos | n/a | n/a | n/a | `[fetch-falhou]` — HTTP 500 |

**Contagem da Execução 1: 38 linhas — 26 `[fetch-ok]`, 7 `[fetch-falhou]`, 5 `[nao-testado]`.**
Declaração do próprio agente (transcrita): *"6 fontes […] estão marcadas 'nao-testado' […] Não inflei nada: 27 das 33 fontes que listo foram efetivamente abertas nesta sessão."* O agente diz 33 fontes e 6 não-testado; a tabela dele tem 38 linhas e 5 marcadas `nao-testado` (a sexta que ele nomeia — o dataset `sie` de Porto Alegre — está na tabela como `[fetch-ok]` via API). Registro a divergência sem promover nem rebaixar nenhum marcador.

## Achados (Execução 1)

- **São Paulo é o único município com ecossistema educacional próprio completo e atual** (resources de jun/jul 2026). O agente enumera: matrícula em registro individual; **avaliação municipal PRÓPRIA** com microdados de aluno (Prova São Paulo 2007-2024) e índice por escola (IDEP 2018-2025) — *"isso não existe em nenhuma outra cidade que consegui verificar"*; fila de creche com tempo médio por distrito (2016-2025); demanda por vagas bimestral até jun/2026; merenda; shapefile das 13 DREs; servidores e financeiro das parcerias.
- *"Para um piloto de 'transformar dado público em informação simples', SP é a escolha óbvia: dá para construir 'quanto tempo minha filha espera por creche no meu distrito' e 'como vai a escola municipal da minha rua' com dado oficial, aberto, granular e recente."*
- **Fortaleza é a melhor do Nordeste verificada e a única além de SP com microdado de aluno municipal aberto** — mas *"o problema é temporal, não de amplitude"*.
- **Belo Horizonte tem "o dado educacional MAIS ATUAL que encontrei em qualquer município"** (50 resources CSV mensais de jun/2022 a jul/2026, com coordenadas), mas *"entra na lista como candidato de nicho geo/cadastral, não como piloto educacional completo"*.
- **Evidência negativa verificada em BH:** `package_search?q=matricula` devolveu `count 0` — sem dado de aluno, sem rendimento, sem avaliação própria.
- **Porto Alegre:** 1 único conjunto de educação. *"É honestamente fraco em volume e não recomendo como piloto, mas é um dado real e bem documentado."*
- **Rio de Janeiro NÃO recomendado, com conclusão verificada:** no feed DCAT oficial, *"TODOS os itens de educação que encontrei tinham distribuição apenas como 'Web Page' (HTML) — nenhum CSV, GeoJSON ou API"*. Séries param em 2005/2010/2020.
- **Curitiba REPROVADA com evidência:** *"Reputação de cidade smart-city não se traduziu em dado educacional aberto no que consegui verificar. […] Registro como candidato REPROVADO com evidência, para evitar que o projeto escolha Curitiba por reputação."*
- **Recife NÃO AVALIADO:** portal fora do ar em 3 tentativas. *"NÃO conte Recife como fraco nem como forte; conte como não verificado."*
- **Detalhe técnico para quem for construir o ingestor:** *"em São Paulo, package_search?q=organization:educacao-sme retornou count 0 — esse filtro não funciona nesse CKAN. A enumeração correta é por termo livre (q=educacao devolveu 53) ou pelo facet de organização."*

## Correções (o que o próprio agente derrubou) — Execução 1

- ~~SP `package_search?q=organization:educacao-sme`~~ → **`count 0`.** O filtro não funciona nesse CKAN; a enumeração correta é por termo livre ou facet.
- Conjunto "Organizações credenciadas para atendimento da educação infantil" (SP) está **explicitamente marcado "(Descontinuada)"**, última atualização 24/04/2018 — *"não usar"*.
- "Relação das Escolas da Rede Municipal ativas" (BH) está **congelada em 2017-2018** — *"conjunto zumbi, sobrepõe o conjunto novo e pode confundir"*.

## Fraquezas e riscos (Execução 1)

- **SP:** rendimento/movimento escolar é o mais defasado do lote (série 2000-2015, atualizações até 2021) — *"para fluxo recente por escola provavelmente será preciso cair no Censo Escolar do INEP"* `[NACIONAL — não pontua]`; microdados vêm em ZIP/RAR (*"RAR é um atrito real de pipeline em Linux/CI"*).
- **Fortaleza:** *"DEFASAGEM é o risco principal"* — os dois melhores conjuntos com última atualização 30/01/2024 e referência 31/12/2023, *"~2,5 anos parados"*; série "Censo Escolar - SME" para em 2021; conjunto do IPPLAN entrega dados via **links de Dropbox** (*"frágil e não é endpoint estável"*); sem avaliação municipal própria (depende do SPAECE, estadual) e sem fila de creche.
- **BH:** *"COBERTURA DESEQUILIBRADA dentro de educação — exatamente o caso que o critério 3 manda penalizar"*; Plano de Dados Abertos da SMED só em PDF; Meio Passe Estudantil para em 2022.
- **Porto Alegre:** apenas 1 conjunto de educação; página do dataset `sie` não aberta individualmente; matrícula é agregada por etapa/modalidade, não por aluno.
- **Nacional:** tudo em ZIP grande com dicionários em PDF; SAEB mais recente é 2023 (bienal); QEdu (403) e API do dados.gov.br (401) não verificáveis — *"se o projeto contava com eles, precisa validar antes"*.
- **Rio:** *"RESSALVA HONESTA: por limite de sessão não explorei os feature services do ArcGIS Hub; há risco de eu estar subestimando o Rio. Vale um recheck focado antes de descartar de vez."*
- **Curitiba:** *"como não achei a rota de busca, não posso garantir que não exista dado de educação escondido no portal; posso apenas garantir que não aparece na home e que o total declarado é 32 conjuntos."*
- **Recife:** *"HTTP 500 consistente em 3 URLs distintas […] sugere problema no servidor/aplicação, não no meu acesso. […] Recheck obrigatório antes de qualquer decisão."*

## O que não consegui verificar, e por quê (Execução 1) — literal

**Falhas com o erro exato:** Recife HTTP 500 (3 tentativas); QEdu HTTP 403; API do dados.gov.br HTTP 401; Curitiba `/dados` e `/busca?q=educacao` HTTP 404 ambos; **Vitória** (`dados.vitoria.es.gov.br/`) HTTP 404; **Niterói** (`dados.niteroi.rj.gov.br/`) `connect ECONNREFUSED 4.228.85.70:443`; **Salvador** (`dados.salvador.ba.gov.br/`) — *"a requisição voltou, mas com conteúdo praticamente vazio (só o título 'Salvador Dados', provavelmente SPA em JS): NÃO consegui verificar nada e por isso deixei Salvador FORA da lista de candidatos em vez de opinar sobre ela."*

**LACUNAS ASSUMIDAS (literal):** *"não testei ENEM/INEP, Painel de Monitoramento do INEP, Campinas, Guarulhos, Manaus, Belém, Goiânia, Brasília/DF, nem os feature services do ArcGIS Hub do Rio. Nenhuma cidade do Norte e nenhuma do Centro-Oeste foi verificada nesta sessão — a ausência dessas regiões na minha lista reflete meu limite de sessão, NÃO uma conclusão sobre elas."*
Recheck recomendado pelo agente: (1) Recife quando o portal voltar, (2) feature services do data.rio, (3) rota de busca do portal de Curitiba, (4) pelo menos um município do Norte e um do Centro-Oeste.

## Síntese (Execução 1)

São Paulo é o único caso de cobertura equilibrada dentro de educação, e o único com avaliação municipal própria em microdado. Fortaleza é o segundo em amplitude e o pior em atualidade (~2,5 anos). BH é o mais atual e o mais estreito (só cadastro/geo, `count 0` para matrícula). Porto Alegre é mínimo. Rio reprovado por só publicar HTML. Curitiba reprovada por não publicar educação. Recife não avaliado (portal em 500).

---

# EXECUÇÃO 2 — referência interna `execucao-2` (01/08/2026)

> Declaração de método (literal): *"usei WebSearch para descobrir e WebFetch para abrir cada URL citada. Carreguei WebSearch/WebFetch via ToolSearch antes de começar. Data da coleta: 01/08/2026. Total: 14 buscas e 33 fetches."*

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada (a)/(b) | Status |
|---|---|---|---|---|---|---|---|---|
| São Paulo/SP | educação | Portal de Dados Abertos — grupo Educação (45 datasets) | dados.prefeitura.sp.gov.br/group/educacao | portal-dados-abertos | equipamento/unidade | varia (mensal a anual); vários atualizados em jul/2026 | `(b) MUNICIPAL PRÓPRIO` — CSV em 44, XLSX em 38; IDEP 15/07/2026; Demanda 08/07/2026; Cardápios 06/07/2026; licença CC-Zero | `[fetch-ok]` |
| São Paulo/SP | educação | API CKAN SME-SP — Demanda/Matrículas e Tempo Médio de Atendimento em Creche | dados.prefeitura.sp.gov.br/api/3/action/package_search?q=demanda%20matriculas&rows=5 | api | distrito/bairro | bimestral | `(b) MUNICIPAL PRÓPRIO` — 94 resources; `metadata_modified 2026-07-08` | `[fetch-ok]` |
| São Paulo/SP | educação | **IDEP** — avaliação municipal própria por escola (via API) | dados.prefeitura.sp.gov.br/api/3/action/package_search?q=IDEP&rows=5 | api | equipamento/unidade | anual (último: 15/07/2026) | `(b) MUNICIPAL PRÓPRIO` — *"o IDEP de cada unidade escolar"*; anos 2018, 2019, 2022, 2023, 2024 e 2025 | `[fetch-ok]` |
| São Paulo/SP | educação | Alimentação Escolar SME/CODAE — 4 datasets | dados.prefeitura.sp.gov.br/api/3/action/package_search?q=alimenta%C3%A7%C3%A3o%20escolar&rows=8 | api | equipamento/unidade | mensal a anual; modificados entre 10/06/2026 e 06/07/2026 | `(b) MUNICIPAL PRÓPRIO` — gestão, refeições servidas, valor unitário, cardápios 2018-2026 | `[fetch-ok]` |
| São Paulo/SP | educação | **GeoSampa — WFS GetCapabilities** (camadas de educação) | wfs.geosampa.prefeitura.sp.gov.br/geoserver/ows?service=wfs&version=1.0.0&request=GetCapabilities | geoserviço | equipamento/unidade | não declarado no GetCapabilities | `(b) MUNICIPAL PRÓPRIO` — XML WFS 1.0.0 válido, EPSG:31983, 6 camadas de educação | `[fetch-ok]` |
| São Paulo/SP | educação | Escola Aberta SME-SP (painel por escola) | escolaaberta.sme.prefeitura.sp.gov.br/ | painel/dashboard | equipamento/unidade | desconhecido | `(b)` alegado | `[fetch-ok]` — **mas conteúdo NÃO verificado:** *"a página renderizou APENAS o texto 'Escola Aberta' — é SPA JavaScript. […] Conteúdo deve ser tratado como não confirmado."* |
| São Paulo/SP | educação | Pátio Digital — Transparência da Educação Infantil (SME-SP) | patiodigital.sme.prefeitura.sp.gov.br/educacaoinfantil/ | painel/dashboard | distrito/bairro | **parado; dados até dez/2017** | `(b) MUNICIPAL PRÓPRIO` — matrículas 2007-2017, demanda x vagas de creche por distrito, liminares judiciais por distrito | `[fetch-ok]` |
| São Paulo/SP | educação | Código-fonte SME-EscolaAberta-API (GitHub, prefeiturasp) | github.com/prefeiturasp/SME-EscolaAberta-API | desconhecido | equipamento/unidade | repositório com 154 commits; data do último commit não visível | n/a — *"A página NÃO documenta endpoint público de API"* | `[fetch-ok]` |
| Recife/PE | educação | Portal de Dados Abertos — datasets da Secretaria de Educação (26) | dados.recife.pe.gov.br/dataset?organization=secretaria-de-educacao | portal-dados-abertos | equipamento/unidade | varia | `(b) MUNICIPAL PRÓPRIO` — CSV em 26, JSON em 10, PDF em 9, XLSX em 5, GeoJSON em 1; licença ODbL | `[fetch-ok]` |
| Recife/PE | educação | **Situação final dos alunos por período letivo** (rendimento escolar) | dados.recife.pe.gov.br/dataset/situacao-final-dos-alunos-por-periodo-letivo | csv/xlsx | registro individual | anual; última atualização **06/03/2026** | `(b) MUNICIPAL PRÓPRIO` — CSV por ano de 2012 a 2024 + dicionário JSON; EMPREL/Secretaria de Educação | `[fetch-ok]` |
| Recife/PE | educação | Rede de Educação Municipal — Escolas Municipais (GeoJSON + CSV) | dados.recife.pe.gov.br/dataset/rede-de-educacao-municipal | geoserviço | equipamento/unidade | dataset atualizado 04/03/2026, mas CSVs cobrem 2021, 2022 e 2023 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Recife/PE | educação | Grupo Educação do portal do Recife (11 datasets) | dados.recife.pe.gov.br/group/educacao | portal-dados-abertos | município | maioria histórica | `(a)+(b) MISTO` — *"Sete dos 11 são Censo Escolar 2009-2015"* `[NACIONAL — não pontua]`; os úteis `(b)` são "Situação final dos alunos" e "Rede de Educação Municipal" | `[fetch-ok]` |
| Fortaleza/CE | educação | Fortaleza Dados Abertos — organização SME (18 datasets) | dados.fortaleza.ce.gov.br/dataset/?organization=sme | portal-dados-abertos | equipamento/unidade | varia; principais parados em jan/2024 | `(a)+(b) MISTO` — `(b)`: Parque Escolar, Unidades Educacionais, Alimentação, Transporte Escolar, PMDE, Perfil dos Profissionais, Base de Unidades e Alunos, Distritos de Educação (GeoJSON); `[NACIONAL — não pontua]`: Censo Escolar 2017-2021 republicado | `[fetch-ok]` |
| Fortaleza/CE | educação | Unidades Educacionais da SME (coordenadas e capacidade de vagas) | dados.fortaleza.ce.gov.br/dataset/unidades-educacionais-sme | csv/xlsx | equipamento/unidade | última atualização **30/01/2024** | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Fortaleza/CE | educação | Parque Escolar da Rede Municipal de Ensino | dados.fortaleza.ce.gov.br/dataset/parque_escolar-sme | csv/xlsx | equipamento/unidade | última atualização **23/01/2024** | `(b) MUNICIPAL PRÓPRIO` — apenas dois CSVs (2022 e 2023) | `[fetch-ok]` |
| Fortaleza/CE | educação | Observatório de Fortaleza — painel Indicadores de Escolas da Educação Básica | observatorio.fortaleza.ce.gov.br/dados/painel/escolas_educacao_basica/ | painel/dashboard | equipamento/unidade | série 2005-2021 | `[NACIONAL — não pontua]` reempacotado — *"é INEP/IBGE reempacotado (2005-2021), não dado municipal próprio"*; Shiny sem download CSV/XLSX e sem API | `[fetch-ok]` |
| Belo Horizonte/MG | educação | Portal de Dados Abertos da PBH — organização SMED (20 datasets) | dados.pbh.gov.br/organization/smed | portal-dados-abertos | equipamento/unidade | vários declaram mensal; datas não expostas na listagem | `(b) MUNICIPAL PRÓPRIO` — CSV em 19, **PDF em 13**; inclui "Jurisdição Escolar Ensino Fundamental" (áreas de abrangência) | `[fetch-ok]` |
| Belo Horizonte/MG | educação | Relação de Escolas Municipais da Rede Própria (SMED/GINED) | dados.pbh.gov.br/dataset/relacao-de-escolas-municipais-da-rede-propria | csv/xlsx | equipamento/unidade | declarada "eventual"; última atualização **18/06/2026 09:41** | `(b) MUNICIPAL PRÓPRIO` — cinco CSVs (dez/2024 a jan/2026) + dicionário PDF | `[fetch-ok]` |
| Belo Horizonte/MG | educação | Grupo Educação do portal da PBH (7 datasets) | dados.pbh.gov.br/group/educacao | portal-dados-abertos | equipamento/unidade | não exposto na listagem | `(b) MUNICIPAL PRÓPRIO` mas **todos cadastrais** — *"Nenhum sobre vagas, creche, merenda, avaliação ou IDEB"*; um marcado "DESATIVADO" | `[fetch-ok]` |
| Porto Alegre/RS | educação | Dados Abertos POA — grupo Educação | dadosabertos.poa.br/dataset?groups=educacao | portal-dados-abertos | equipamento/unidade | ver API | `(b) MUNICIPAL PRÓPRIO` — *"1 único dataset encontrado no grupo"* | `[fetch-ok]` |
| Porto Alegre/RS | educação | API CKAN POA — dataset SIE (cadastro de escolas e matrículas) | dadosabertos.poa.br/api/3/action/package_search?q=educacao&rows=10 | api | equipamento/unidade | matrículas modificadas em **01/09/2025**; cadastro em 01/01/2025 | `(b) MUNICIPAL PRÓPRIO` — Cadastro Escolas CSV + Matrículas Escolas CSV + 2 dicionários PDF de 2019. *"Nenhum recurso TURMAS"* | `[fetch-ok]` |
| Curitiba/PR | educação | Dados Abertos Curitiba — lista de conjuntos | dadosabertos.curitiba.pr.gov.br/ConjuntoDado | portal-dados-abertos | município | varia | n/a — *"32 resultados no total […] Nenhum dataset de educação, escolas, CMEI, matrícula ou merenda visível nem nas tags/filtros"* | `[fetch-ok]` |
| Curitiba/PR | educação | Unidades de Atendimento de Curitiba — Ativas (inclui CMEIs e escolas, lat/long) | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=680ed5ed-c8b7-4e81-a2af-637d2757027a | csv/xlsx | equipamento/unidade | mensal; arquivo mais recente **31/07/2026** | `(b) MUNICIPAL PRÓPRIO` — cadastro genérico de equipamentos urbanos que inclui CMEI e Unidade de Educação Integral | `[fetch-ok]` |
| Rio de Janeiro/RJ | educação | DATA.RIO — catálogo DCAT-US 1.1 | www.data.rio/api/feed/dcat-us/1.1.json | api | desconhecido | varia | n/a | `[fetch-ok]` — *"Nos datasets visíveis […] NÃO apareceu nenhum com escola/educacao/creche/EDI. Catálogo aparentemente truncado."* |
| Rio de Janeiro/RJ | educação | DATA.RIO — dataset Escolas Municipais (página do item) | www.data.rio/datasets/escolas-municipais/about | geoserviço | equipamento/unidade | desconhecido | `(b)` alegado | `[fetch-ok]` — **conteúdo NÃO verificável:** *"a página renderizou apenas o título 'Escolas Municipais' (SPA ArcGIS Hub)"* |
| Salvador/BA | educação | Nossa Escola em Dados — SME Salvador (Qlik Sense) | escolaemdados-educacao.salvador.ba.gov.br/ | painel/dashboard | desconhecido | desconhecido | `(b)` mas **FECHADO** — *"Muro de autenticação"*: página de login com usuário e senha. *"Nenhum indicador, exportação ou API acessível sem credencial."* | `[fetch-ok]` |
| Brasília/DF | educação | Dados Abertos SEEDF — listagem de datasets | data.se.df.gov.br/dataset/ | portal-dados-abertos | desconhecido | n/a | n/a | `[fetch-ok]` — *"exibe 'Não foram encontrados conjuntos de dados'. Total: 0 datasets."* |
| Brasília/DF | educação | Caderno de Matrículas — SEEDF/DINFE (inforepositorio CKAN) | inforepositorio.se.df.gov.br/dataset/dados_matriculas_ | pdf/relatório | município | anual; última atualização **22/06/2026 14:51 UTC** | `(b) MUNICIPAL PRÓPRIO` mas **TODOS os recursos em PDF** — *"nenhum CSV ou XLSX"*; matrículas 2010-2025 por etapa, modalidade e CRE | `[fetch-ok]` |
| Brasília/DF | educação | inforepositorio SEEDF — listagem de datasets | inforepositorio.se.df.gov.br/dataset | portal-dados-abertos | desconhecido | n/a | n/a | `[fetch-ok]` — *"'Não foram encontrados conjuntos de dados'. Total 0. Todos os filtros […] embora URLs diretas de dataset funcionem."* |
| Base nacional | educação | INEP — Microdados do Censo Escolar da Educação Básica | www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/censo-escolar | csv/xlsx | equipamento/unidade | anual; 2025 publicado/atualizado em julho de 2026 | `[NACIONAL — não pontua]` — 1995 a 2025 em ZIP; anos 2007-2021 marcados com atualização em 08/03/2023 | `[fetch-ok]` |
| Base nacional | educação | INEP — Catálogo de Escolas | www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/inep-data/catalogo-de-escolas | painel/dashboard | equipamento/unidade | anual conforme Censo Escolar; página atualizada 15/07/2026 | `[NACIONAL — não pontua]` — mais de 226 mil escolas; roda sobre InepData (BI) | `[fetch-ok]` |
| Base nacional | educação | QEdu — página municipal (Recife como teste) | qedu.org.br/municipio/2611606-recife | painel/dashboard | município | desconhecido | `[NACIONAL — não pontua]` | `[fetch-falhou]` — **HTTP 403 Forbidden.** *"Nada da página pôde ser lido. Qualquer afirmação sobre indicadores ou exportação do QEdu seria invenção minha."* |

**Contagem da Execução 2: 32 linhas — 31 `[fetch-ok]`, 1 `[fetch-falhou]`, 0 `[nao-testado]`.**
**Atenção do transcritor:** o agente declara *"O QUE ABRI E DEU CERTO (fetch-ok, 26 URLs)"* e lista separadamente falhas reais que **não aparecem como linha de fonte** na tabela dele (Recife 500 x4, QEdu 403, quatro 404s). Essas falhas estão transcritas abaixo, na seção "O que não consegui verificar". Nenhuma foi promovida a `fetch-ok` nem rebaixada.
**Atenção adicional:** três linhas estão marcadas `[fetch-ok]` pelo agente com a ressalva explícita, no próprio campo de evidência, de que **o conteúdo não foi verificado** (Escola Aberta SME-SP, DATA.RIO Escolas Municipais, e — por SPA — a busca do data.rio). O agente justifica: *"Nesses casos o HTTP foi 200 mas só o título renderizou; marquei fetch-ok e escrevi na evidência que o conteúdo NÃO foi verificado."* O marcador está preservado como o agente o deixou.

## Achados (Execução 2)

- **São Paulo, primeiro lugar:** *"Único município do país onde encontrei, com URLs efetivamente abertas nesta sessão, dado educacional MUNICIPAL PRÓPRIO em quase todas as subáreas pedidas"* — avaliação própria por escola (IDEP 2018-2025), demanda/fila de creche, merenda (4 datasets), infraestrutura, e geoserviço WFS com 6 camadas de educação. *"Atualizações de junho/julho de 2026 (dado vivo, não arquivo morto)."*
- **Recife, segundo, e o mais interessante do Nordeste:** três coisas raras no Brasil — *"microdados de DEMANDA por vaga em Educação Infantil (0 a 3 anos) e EJA (proxy direto de fila de creche), TRANSPORTE ESCOLAR gratuito por unidade/localidade, e SITUAÇÃO FINAL DOS ALUNOS por período letivo (rendimento: aprovação/reprovação/abandono) com série 2012-2024 atualizada em 06/03/2026."*
- **Fortaleza, terceiro:** *"Estrutura boa; o problema é recência."*
- **Belo Horizonte:** portal sólido e recente, com jurisdição escolar (área de abrangência) — *"algo que quase nenhuma outra cidade publica"* — mas *"é essencialmente CADASTRAL"*. Dos 7 datasets do grupo educação, *"todos os 7 são cadastro/organização de ensino"*.
- **Porto Alegre:** *"Tem exatamente UM dataset de educação, mas ele é bom e recente"*. *"Serve como caso de teste barato, não como piloto principal."*
- **Curitiba, contraexemplo importante:** *"Curitiba tem reputação de cidade de dados e um portal com atualização exemplar (arquivo de 31/07/2026 […]), MAS praticamente NÃO publica dados de educação. […] Não confunda maturidade de portal com cobertura setorial."*
- **Salvador, DESCARTAR:** *"a plataforma de dados escolares do município é FECHADA. O 'Nossa Escola em Dados' (Qlik Sense da SME Salvador) exige login e senha — não é dado aberto."*
- **Brasília/DF, "caso instrutivo de portal quebrado":** os dois portais CKAN da SEEDF retornam ZERO datasets na busca, e o único dataset abrível por URL direta é PDF puro. *"Coleta automatizada por busca/API vai retornar vazio silenciosamente."*
- **Rio de Janeiro, NÃO recomendado mas inconclusivo:** *"Inconclusivo por limitação de ferramenta, não por ausência comprovada. […] Precisa de nova investigação com ferramenta que execute JavaScript antes de entrar ou sair do piloto."*
- **Conclusão setorial (literal):** *"Ordem recomendada para o piloto de educação: 1 São Paulo, 2 Recife, 3 Fortaleza, 4 Belo Horizonte. Nenhuma cidade além de São Paulo publica avaliação municipal própria por escola em formato aberto que eu tenha conseguido verificar nesta sessão."*

## Correções (o que o próprio agente derrubou) — Execução 2

- ~~`dados.prefeitura.sp.gov.br/dataset/demanda-registrada-e-matriculas`~~ → **HTTP 404**, slug errado. *"cheguei pela API"*.
- ~~`dadosabertos.poa.br/dataset/sie-sistema-de-informacoes-educacionais`~~ → **HTTP 404**, slug errado. *"o dataset existe, mas com outro slug — chegue nele pela API ou pela listagem"*.
- ~~`dadosabertos.curitiba.pr.gov.br/busca/?q=educacao`~~ → **HTTP 404**.
- ~~`dados-geoniteroi.opendata.arcgis.com/datasets/escolas-municipais-de-ensino-fundamental`~~ → **HTTP 404.** *"por isso NITERÓI FOI EXCLUÍDO desta resposta: a busca sugeriu que existe camada ArcGIS de escolas municipais de Niterói, mas a URL não abriu e eu não tenho nenhuma evidência verificada; preferi não criar um candidato sem prova."*
- **Derrubada de alegação de busca (POA):** *"A busca sugeriu um dataset 'TURMAS' com movimento e rendimento dos alunos — a API CKAN NÃO retornou nenhum recurso TURMAS; considere essa informação da busca como NÃO CONFIRMADA."*
- **Derrubada de alegação sobre a "API do Escola Aberta" (SP):** *"O repositório SME-EscolaAberta-API no GitHub é código-fonte Django, NÃO documenta endpoint público — não existe 'API do Escola Aberta' documentada que eu tenha confirmado."*

## Fraquezas e riscos (Execução 2)

- **SP:** Escola Aberta é SPA — *"trate como não-verificado no conteúdo"*; Pátio Digital Educação Infantil congelado em dez/2017; muitos datasets vêm em PDF/ODT junto ao CSV.
- **Recife:** *"INSTABILIDADE SÉRIA DO PORTAL. Quatro URLs do dados.recife.pe.gov.br devolveram HTTP 500 nesta sessão"* — inclusive a API CKAN, *"INUTILIZÁVEL"*, e as páginas dos dois datasets mais valiosos (demanda na Educação Infantil 0-3/EJA e transporte escolar), cuja existência foi confirmada **apenas pela listagem**. *"Para um piloto que dependa de coleta automatizada, isso é risco operacional real."* CSVs de "Unidades de Ensino" param em 2023; grupo "educacao" *"entulhado de Censo Escolar 2009-2015"*; falta avaliação municipal própria.
- **Fortaleza:** *"DEFASAGEM"* — Unidades Educacionais 30/01/2024, Parque Escolar 23/01/2024 com arquivos só de 2022 e 2023 (*"em ago/2026 isso é dado com 2,5 anos"*); painel do Observatório é Shiny sem download nem API e é INEP/IBGE reempacotado; *"Vários datasets são de terceiros (INEP) republicados pela SME, não produção própria."*
- **BH:** *"Nenhum indicador de resultado ou de demanda — só 'onde ficam as escolas'"*; frequência "eventual"; 13 dos 20 datasets da SMED envolvem PDF; nenhum geoserviço próprio de educação confirmado.
- **POA:** 1 dataset; dicionários de 2019; slug quebrado.
- **Curitiba:** *"NÃO posso afirmar com certeza absoluta que não exista algo de educação entre os 27 datasets que não vi listados. Trate como 'muito provavelmente vazio', não 'comprovadamente vazio'."* Segundo domínio `dadosabertos.curitiba.br/dados/` não aberto.
- **Salvador:** muro de autenticação; `transparencia.salvador.ba.gov.br` e `sai.io.org.br/ba/imap/site/dadosabertos` não abertos.
- **DF:** índice CKAN corrompido/não reconstruído; Caderno de Matrículas só em PDF; "Portal de Governança Educacional" e `dadoseducacionais.se.df.gov.br/relatorios.php` não abertos.
- **Rio:** feed DCAT truncado (*"Não é prova de ausência"*); páginas SPA; camada "Escolas Municipais" com 1.590 registros e atualização em jun/2023 apareceu **só em snippet de busca**, não confirmada — *"e se for verdade, é dado com 3 anos de defasagem"*.
- **Nacional:** QEdu 403 — *"uma pipeline que dependa dele vai bater em bloqueio"*; Catálogo de Escolas roda sobre BI e *"NÃO especifica o formato do arquivo — não é um CSV direto"*; microdados em ZIP grandes com revisões retroativas.

## O que não consegui verificar, e por quê (Execução 2) — literal

**FALHAS REAIS ENCONTRADAS (do `method_notes`, não presentes como linha de fonte):**
- **HTTP 500 (4x) no portal do Recife:** `/organization/secretaria-de-educacao`, `/api/3/action/package_search` (*"API CKAN inutilizável no momento do teste"*), `/dataset/demanda-na-educacao-infantil-0-a-3-anos-e-de-jovens-e-adultos-eja`, `/dataset/transporte-escolar-gratuito`. *"Portal instável de forma intermitente: as listagens funcionam, várias páginas de dataset e a API não."*
- **HTTP 403** no QEdu.
- **HTTP 404:** `dadosabertos.curitiba.pr.gov.br/busca/?q=educacao`; `dados.prefeitura.sp.gov.br/dataset/demanda-registrada-e-matriculas`; `dadosabertos.poa.br/dataset/sie-sistema-de-informacoes-educacionais`; `dados-geoniteroi.opendata.arcgis.com/datasets/escolas-municipais-de-ensino-fundamental`.
- **Portais que respondem com índice vazio:** `data.se.df.gov.br` e `inforepositorio.se.df.gov.br` (0 datasets na busca, embora URL direta de dataset funcione).

**LIMITAÇÃO DE FERRAMENTA (literal):** *"WebFetch não executa JavaScript. Isso invalidou a verificação de conteúdo de três coisas: Escola Aberta SME-SP, data.rio (ArcGIS Hub) e a busca do data.rio. […] Não afirmei nada sobre o que existe dentro dessas páginas. O caso do Rio precisa ser reinvestigado com navegador real antes de ser descartado de vez."*

**O QUE NÃO FOI CONFIRMADO E NÃO FOI AFIRMADO (lista literal):** (a) camada de escolas do data.rio com 1.590 registros e atualização em jun/2023 — só apareceu em snippet de busca; (b) qualquer dataset "TURMAS" de Porto Alegre com rendimento; (c) `www.recife.pe.gov.br/geoescolas` — não abriu; (d) segundo domínio `dadosabertos.curitiba.br/dados/` — não abriu; (e) `transparencia.salvador.ba.gov.br` e `sai.io.org.br/ba/imap/site/dadosabertos` — não abriu; (f) Portal de Governança Educacional do DF e `dadoseducacionais.se.df.gov.br/relatorios.php` — não abriu; (g) mapa PDF de escolas municipais da PBH — não abriu; (h) os 27 datasets não listados do catálogo de Curitiba — *"logo 'Curitiba não tem educação' é inferência forte, não prova"*; (i) Campinas — *"eu não abri nenhuma URL de Campinas, logo não há candidato Campinas"*.

## Síntese (Execução 2)

1 São Paulo, 2 Recife, 3 Fortaleza, 4 Belo Horizonte. São Paulo é o único com avaliação municipal própria por escola em formato aberto verificado. Recife é o mais rico em conteúdo (único com demanda de vaga 0-3 + transporte escolar + rendimento por período letivo em CSV) e o pior em estabilidade técnica. Fortaleza travada em jan/2024. BH recente e quase só cadastral. Salvador descartada (login). DF descartado (índice vazio + PDF). Rio inconclusivo. Curitiba reprovada em educação. Niterói e Campinas deliberadamente fora por falta de prova.

---

# Divergências entre as execuções (não resolvidas por quem transcreveu)

| Ponto | Execução 1 (31/07/2026, `a7075af…`) | Execução 2 (01/08/2026, `af76906…`) |
|---|---|---|
| **Recife** | **NÃO AVALIADO** — portal em HTTP 500 nas 3 tentativas. *"NÃO conte Recife como fraco nem como forte; conte como não verificado."* | **2º lugar.** 26 datasets da Secretaria de Educação `[fetch-ok]`, incluindo rendimento 2012-2024 atualizado 06/03/2026 — mas com 4 URLs em HTTP 500 na mesma sessão |
| **Nº de datasets de educação de SP** | Organização "Educação - SME" com **44 datasets**; API `q=educacao` → `count 53` | Grupo `educacao` com **45 datasets** |
| **Nº de datasets da SME de Fortaleza** | API `q=educacao` → `count 28` (busca por termo) | Organização `sme` → **18 datasets** |
| **GeoSampa / WFS de SP** | Não verificado. Geo de SP veio só do Shapefile das 13 DREs | `[fetch-ok]` no **WFS GetCapabilities** com 6 camadas de educação (CEU, infantil, fundamental/médio, técnico, outros, DRE) |
| **Merenda em SP** | 1 dataset (refeições servidas) | **4 datasets** (gestão, refeições servidas, valor unitário, cardápios 2018-2026) |
| **BH — nº de datasets da SMED** | API `q=escola` → `count 20`; grupo não enumerado; `q=matricula` → `count 0` | Organização SMED com **20 datasets**; grupo `educacao` com **7**, todos cadastrais; destaca "Jurisdição Escolar" |
| **Porto Alegre — data das matrículas** | Não confirmada (*"não abri a página do dataset 'sie' individualmente"*) | Matrículas `metadata_modified 2025-09-01`; cadastro 01/01/2025 |
| **Curitiba** | Reprovada; `/dados` e `/busca?q=educacao` → 404; nenhum caminho alternativo | Reprovada em educação, **mas** achou `(b)`: "Unidades de Atendimento Ativas" com CMEIs e lat/long, arquivo de 31/07/2026 |
| **Salvador** | Deixada **FORA da lista** — portal devolveu só o título "Salvador Dados" | Incluída como **DESCARTAR com evidência**: plataforma de dados escolares atrás de login |
| **Brasília/DF** | Não verificada (*"Nenhuma cidade do Norte e nenhuma do Centro-Oeste foi verificada nesta sessão"*) | Verificada e descartada: 2 portais CKAN com 0 datasets indexados; Caderno de Matrículas só em PDF |
| **Niterói** | `dados.niteroi.rj.gov.br/` → `ECONNREFUSED` | `dados-geoniteroi.opendata.arcgis.com/…` → 404; **excluído deliberadamente** por falta de prova |
| **Vitória** | `dados.vitoria.es.gov.br/` → **HTTP 404** | Não testada |
| **INEP SAEB** | `[fetch-ok]` (microdados 1995-2023) | Não testado; no lugar, `[fetch-ok]` no **Catálogo de Escolas** do INEP |
| **QEdu** | `[fetch-falhou]` HTTP 403 (`qedu.org.br/`) | `[fetch-falhou]` HTTP 403 (`qedu.org.br/municipio/2611606-recife`) — **as duas execuções concordam** |

---

# Nota de transcrição

- As duas execuções concordam em dois pontos centrais: **São Paulo é o único município com avaliação municipal própria por escola em formato aberto verificado**, e **QEdu está inacessível (HTTP 403)**.
- Nenhum marcador foi alterado. Em particular, as três linhas da Execução 2 onde o agente marcou `[fetch-ok]` mas escreveu na evidência que o conteúdo NÃO foi verificado (Escola Aberta, DATA.RIO Escolas Municipais, busca do data.rio) estão preservadas como `[fetch-ok]` com a ressalva do próprio agente ao lado.
- As contagens são por LINHA DA TABELA de fontes. Onde o agente declarou números diferentes no `method_notes`, os dois estão registrados.
