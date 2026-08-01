# regiao:centro-oeste — Regiao CENTRO-OESTE (DF, GO, MT, MS)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:centro-oeste

> **Procedência deste arquivo.** Transcrito por um agente TRANSCRITOR a partir de um registro local de execução, não versionado.
> Os marcadores de verificação (`[fetch-ok]`, `[fetch-falhou]`, `[nao-testado]`) são **exatamente** os que o agente de pesquisa devolveu no campo `verified`.
> Nenhum status foi promovido, nenhuma URL foi reaberta, nenhuma lacuna foi preenchida com conhecimento próprio.
> O journal não registra o campo `label`; o vínculo agente→label foi feito pelo prompt `TAREFA:` gravado em `registro local da execução` do mesmo workflow.

**Dois marcadores foram acrescentados pelo transcritor** (Regra 5 do protocolo), e só estes:

- **[NACIONAL — não pontua]** na coluna Fonte, quando o `source_name` ou a `url` casam com DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS ou CAGED.
- **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** na coluna Cidade/UF, quando o próprio agente declarou o candidato como nacional (`uf = BR` ou `region = Nacional`).

O casamento é feito só em `source_name` e `url`. Uma fonte de fachada municipal que apenas *republique* base nacional (isso aparece com frequência no campo `evidence`) **não** é pega automaticamente — o `compilador` precisa ler a evidência linha por linha.

## Execuções deste label encontradas no journal

| Execução | referência interna | Linha do journal | Candidatos | Fontes |
|---|---|---|---|---|
| 1 | `execucao-1` | 15 | 5 | 43 |
| 2 | `execucao-2` | 40 | 6 | 27 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 15)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | seguranca | SSP-DF — Dados DF, Regiões Administrativas e RISPs | `https://www.ssp.df.gov.br/dados-por-regiao-administrativa/` | csv/xlsx | distrito/bairro (Região Administrativa) + RISP + DF agregado | mensal para o ano corrente; série 2014-2026 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | urbanismo/geo | GeoPortal/DF — Catálogo de Metadados SEDUH (GeoNetwork CSW 2.0.2) | `https://metadados.seduh.df.gov.br/geonetwork/srv/por/csw?request=GetCapabilities&service=CSW` | geoservico | camada geoespacial (lote/quadra/equipamento) | não declarado na resposta de capabilities | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | meio-ambiente | SISDIA — Catálogo de Metadados (GeoNetwork CSW 2.0.2) | `https://metadados.sisdia.df.gov.br/geonetwork/srv/por/csw?request=GetCapabilities&service=CSW` | geoservico | camada geoespacial ambiental | não declarado | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | meio-ambiente | SISDIA — Dados e Informações (SEMA-DF) | `https://sisdia.df.gov.br/home/dados-e-informacoes/` | portal-dados-abertos | desconhecido (temático/geoespacial) | não informado na página | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | meio-ambiente | Brasília Ambiental (IBRAM) — Geoinformações | `https://www.ibram.df.gov.br/informacoes-geoespaciais-ambientais/` | geoservico | camada geoespacial (UC, área queimada, drenagem) | não informado | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | meio-ambiente | IBRAM GeoServer — WMS GetCapabilities | `http://geoservico.ibram.df.gov.br/geoserver/ows?service=WMS&version=1.3.0&request=GetCapabilities` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | social | IPEDF/Codeplan — PDAD (Pesquisa Distrital por Amostra de Domicílios) | `https://www.ipe.df.gov.br/pdad` | portal-dados-abertos | distrito/bairro (Região Administrativa) + amostra domiciliar | bienal (7a edição, mais recente 2024) | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | social | Portal PDAD-A 2024 (IPEDF) | `https://pdad.ipe.df.gov.br/` | painel/dashboard | desconhecido (relatórios por RA existem em PDF sob /files/reports/) | edição 2024 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | saude | Portal InfoSaúde SES-DF | `https://info.saude.df.gov.br/` | painel/dashboard | equipamento/unidade (UBS, hospital, leito) | painéis operacionais, aparentemente contínuos | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | saude | Saúde Aberta-DF — Conjunto de Dados Abertos da Saúde no DF | `https://info.saude.df.gov.br/transparencia-e-prestacao-de-contas/dados-abertos/` | portal-dados-abertos | desconhecido a partir desta página | não declarado | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | educacao | Dados Abertos SEEDF (CKAN próprio) — busca de conjuntos | `https://data.se.df.gov.br/dataset` | portal-dados-abertos | n/a (sem dados publicados) | n/a | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | educacao | Dados Abertos SEEDF — CKAN API package_search | `https://data.se.df.gov.br/api/3/action/package_search?rows=0` | api | n/a | n/a | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | educacao | SEEDF — Grupo [Censo DF] Censo Escolar do Distrito Federal **[NACIONAL — não pontua]** | `https://data.se.df.gov.br/group/censo-escolar-do-distrito-federal` | portal-dados-abertos | n/a | n/a | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | educacao | SEEDF — Dados educacionais DF | `https://www.educacao.df.gov.br/dados-educacionais-df/` | pdf/relatorio | desconhecido (menciona matrículas, infraestrutura e rendimento; sem RA/CRE explícito) | defasado — último ano listado 2020 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | educacao | SEEDF — Portal dadoseducacionais (CensoDF) | `https://dadoseducacionais.se.df.gov.br/index.php` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | mobilidade/transito | SEMOB-DF — Dados do STPC/DF | `https://www.semob.df.gov.br/dados-do-sistema-de-transporte-publico-do-df` | pdf/relatorio | empresa operadora / linha | mensal (notas informativas até 2026) | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | mobilidade/transito | SEMOB-DF — Plano de Dados Abertos (PDA) | `https://www.semob.df.gov.br/plano-de-dados-abertos-pda/` | pdf/relatorio | n/a | n/a | `[fetch-falhou]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | mobilidade/transito | Detran-DF — Dados Anuais / Estatísticas do Trânsito | `https://www.detran.df.gov.br/dados-anuais/` | pdf/relatorio | municipio (DF) e 'vias urbanas'; sem RA | anual (até 2024) | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | outro | Portal de Dados Abertos do Governo de Brasília (catálogo central) | `https://www.dados.df.gov.br/` | portal-dados-abertos | desconhecido (não enumerável por fetch) | desconhecido | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | outro | dados.df.gov.br — CKAN API (organization_list / package_search / status_show) | `https://www.dados.df.gov.br/api/3/action/organization_list?all_fields=true` | api | n/a | n/a | `[fetch-falhou]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | outro | dados.df.gov.br — sitemap.xml e robots.txt (diagnóstico de plataforma) | `https://www.dados.df.gov.br/sitemap.xml` | desconhecido | n/a | n/a | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | financas/orcamento | Portal da Transparência do DF | `https://www.transparencia.df.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | financas/orcamento | CGDF — Dados Abertos (governança e PDA) | `https://www.cg.df.gov.br/dados-abertos/` | pdf/relatorio | n/a (documento de governança) | PDA vigente 2026-2027 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | financas/orcamento | TCDF — Dados Abertos | `https://www2.tc.df.gov.br/dados-abertos/` | api | processo | não declarado | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | urbanismo/geo | Geoserviço IPEDF/Codeplan (ortofotos WMS) | `https://geoservico.ipe.df.gov.br/` | geoservico | imagem/ortofoto | defasado — última camada 2015 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF | urbanismo/geo | GeoPortal SEDUH-DF (visualizador) | `https://www.geoportal.seduh.df.gov.br/geoportal/` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | outro | Dados Abertos Prefeitura de Goiânia — CKAN API package_list | `https://dadosabertos.goiania.go.gov.br/api/3/action/package_list` | api | distrito/bairro e lote/quadra (camadas cadastrais) | não declarado na resposta da API | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | urbanismo/geo | Dados Abertos Prefeitura de Goiânia — catálogo de conjuntos | `https://dadosabertos.goiania.go.gov.br/dataset` | portal-dados-abertos | distrito/bairro, lote/quadra, equipamento | não informado por conjunto | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | outro | Dados Abertos Prefeitura de Goiânia — home | `https://dadosabertos.goiania.go.gov.br/` | portal-dados-abertos | municipio e sub-municipal | não informado | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | financas/orcamento | Prefeitura de Goiânia — Acesso Automatizado aos Dados Abertos (API) | `https://goiania.nucleogov.com.br/cidadao/outras_informacoes/acesso_automatizado` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | outro | Dados Abertos Goiás (portal estadual) — catálogo | `https://dadosabertos.go.gov.br/dataset/` | portal-dados-abertos | municipio (estado desagregado por município em vários conjuntos) | varia por conjunto; não agregado na página | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | saude | Dados Abertos Goiás — saúde em CSV | `https://dadosabertos.go.gov.br/dataset/?groups=saude&res_format=CSV` | csv/xlsx | municipio; alguns por unidade de saúde | não declarado na listagem | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | seguranca | Dados Abertos Goiás — grupo Segurança Pública | `https://dadosabertos.go.gov.br/dataset/?groups=seguranca-publica` | csv/xlsx | unidade prisional; convênios | não declarado | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | seguranca | SSP Goiás — Estatísticas / Observatório de Segurança Pública | `https://goias.gov.br/seguranca/estatisticas/` | pdf/relatorio | desconhecido (não confirma quebra municipal na página) | mensal com atraso mínimo de 60 dias | `[fetch-ok]` |
| Goiânia/GO (com apoio do portal estadual de Goiás)/GO | financas/orcamento | Transparência Goiás — API de Dados Abertos (CKAN DataStore) | `https://transparencia.go.gov.br/api-de-dados-abertos/` | api | registro individual (via DataStore SQL) | n/a (camada de acesso) | `[fetch-ok]` |
| Campo Grande/MS/MS | outro | Portal de Dados Abertos - MS (estadual) — catálogo | `https://www.dados.ms.gov.br/dataset/` | portal-dados-abertos | estado; municipio não confirmado | não declarado na página | `[fetch-ok]` |
| Campo Grande/MS/MS | outro | Prefeitura de Campo Grande — Dados Abertos (Portal Transparência) | `https://transparencia.campogrande.ms.gov.br/canais/dados-abertos/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Campo Grande/MS/MS | social | SISGRAN — Sistema Municipal de Indicadores de Campo Grande | `https://www.campogrande.ms.gov.br/sisgran/` | painel/dashboard | alegadamente bairro/região urbana — não verificado | desconhecido | `[fetch-falhou]` |
| Campo Grande/MS/MS | outro | Prefeitura de Campo Grande — Acesso automatizado API | `https://www.campogrande.ms.gov.br/acesso-automatizado-api/` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Cuiabá/MT (e Várzea Grande na mesma RM)/MT | outro | Portal de Dados Abertos - Mato Grosso (estadual) — catálogo | `https://dadosabertos.mt.gov.br/dataset/` | portal-dados-abertos | estado; sub-municipal não confirmado | não declarado (busca indicou atualização do portal em 09/10/2025) | `[fetch-ok]` |
| Cuiabá/MT (e Várzea Grande na mesma RM)/MT | financas/orcamento | Portal Transparência da Prefeitura de Cuiabá | `https://transparencia.cuiaba.mt.gov.br/portaltransparencia/transparencia/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO | financas/orcamento | Prefeitura de Anápolis — Portal da Transparência | `https://www.anapolis.go.gov.br/portal-da-transparencia/` | desconhecido | desconhecido | desconhecido | `[nao-testado]` |
| Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO | outro | Prefeitura de Aparecida de Goiânia — site oficial | `https://aparecida.go.gov.br/` | desconhecido | desconhecido | desconhecido | `[nao-testado]` |

### Execução 2 — agente `execucao-2` (journal linha 40)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | seguranca | SSP-DF — Dados DF, Regiões Administrativas e RISPs | `https://www.ssp.df.gov.br/dados-por-regiao-administrativa/` | csv/xlsx | distrito/bairro | mensal (agregados mensais do DF) e anual por RA | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | urbanismo/geo | GeoPortal DF / SEDUH — catálogo de metadados GeoNetwork | `https://metadados.seduh.df.gov.br/geonetwork/srv/search` | geoservico | distrito/bairro | nao confirmada | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | social | IPEDF Codeplan — PDAD (Pesquisa Distrital por Amostra de Domicílios) | `https://www.ipe.df.gov.br/pdad` | pdf/relatorio | distrito/bairro | bianual | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | social | PDAD-A 2024 — relatório da Região Administrativa de Brazlândia | `https://pdad.ipe.df.gov.br/files/reports/4_-_BRAZL%C3%82NDIA.pdf` | pdf/relatorio | distrito/bairro | edição 2024 | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | saude | Portal InfoSaúde SES-DF — Conjunto de Dados Abertos da Saúde no DF | `https://info.saude.df.gov.br/transparencia-e-prestacao-de-contas/dados-abertos/` | painel/dashboard | equipamento/unidade | nao confirmada | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | mobilidade/transito | SEMOB-DF — Dados do Sistema de Transporte Público Coletivo (STPC/DF) | `https://www.semob.df.gov.br/dados-do-sistema-de-transporte-publico-do-df` | csv/xlsx | equipamento/unidade | mensal | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | urbanismo/geo | Geoserviço IPEDF/Codeplan — WMS de ortofotos do DF | `https://geoservico.ipe.df.gov.br/` | geoservico | distrito/bairro | desatualizado (última camada 2015) | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | outro | Portal de Dados Abertos do Governo de Brasília (portal central) | `https://www.dados.df.gov.br/dataset` | portal-dados-abertos | desconhecido | desconhecida | `[fetch-ok]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | outro | dados.df.gov.br — API CKAN (4 endpoints testados) | `https://www.dados.df.gov.br/api/3/action/package_list` | api | desconhecido | n/a | `[fetch-falhou]` |
| Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF | financas/orcamento | Portal da Transparência do Distrito Federal | `https://www.transparencia.df.gov.br/` | desconhecido | desconhecido | desconhecida | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | outro | Dados Abertos Goiás (estado) — API CKAN package_list | `https://dadosabertos.go.gov.br/api/3/action/package_list` | api | municipio | contínua (datasets com referência até 04/2026) | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | seguranca | Dados Abertos Goiás — dataset 'crimes-registrados-pela-delegacia-virtual' (package_show) | `https://dadosabertos.go.gov.br/api/3/action/package_show?id=crimes-registrados-pela-delegacia-virtual` | csv/xlsx | desconhecido | atualizado em 09/10/2025 | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | urbanismo/geo | Portal de Dados Abertos da Prefeitura de Goiânia — API CKAN package_list | `https://dadosabertos.goiania.go.gov.br/api/3/action/package_list` | api | distrito/bairro | estagnado (ver red flags) | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | urbanismo/geo | Prefeitura de Goiânia — dataset 'bairros' (package_show, formatos e data) | `https://dadosabertos.goiania.go.gov.br/api/3/action/package_show?id=bairros` | geoservico | distrito/bairro | última modificação 18/09/2018 | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | urbanismo/geo | Goiânia — download real do arquivo bai.csv (teste de liveness) | `http://www4.goiania.go.gov.br/daber/dadosabertos/sedetec/geoespaciais/bai.csv` | csv/xlsx | distrito/bairro | conteúdo com timestamps de 2017 | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | saude | Prefeitura de Goiânia — dataset 'dengue' (package_show, teste de atualidade) | `https://dadosabertos.goiania.go.gov.br/api/3/action/package_show?id=dengue` | csv/xlsx | distrito/bairro | última modificação 06/04/2020 | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | outro | Prefeitura de Goiânia — Portal de Dados Abertos (landing CKAN) | `https://dadosabertos.goiania.go.gov.br/` | portal-dados-abertos | distrito/bairro | n/a | `[fetch-ok]` |
| Goiânia/GO (e região metropolitana, via camada estadual)/GO | financas/orcamento | Prefeitura de Goiânia — Acesso Automatizado aos Dados Abertos (API) | `https://goiania.nucleogov.com.br/cidadao/outras_informacoes/acesso_automatizado` | api | desconhecido | desconhecida | `[fetch-falhou]` |
| Campo Grande/MS/MS | outro | Portal de Dados Abertos de Mato Grosso do Sul — API CKAN package_list | `https://www.dados.ms.gov.br/api/3/action/package_list` | api | municipio | nao medida | `[fetch-ok]` |
| Campo Grande/MS/MS | urbanismo/geo | SIMGEO — Sistema Municipal de Geoprocessamento de Campo Grande | `https://www.campogrande.ms.gov.br/simgeoctm` | geoservico | distrito/bairro | desconhecida | `[fetch-ok]` |
| Campo Grande/MS/MS | financas/orcamento | Prefeitura de Campo Grande — Dados Abertos (Portal da Transparência) | `https://transparencia.campogrande.ms.gov.br/canais/dados-abertos/` | portal-dados-abertos | municipio | desconhecida | `[fetch-ok]` |
| Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT | outro | Portal de Dados Abertos de Mato Grosso — API CKAN package_list | `https://dadosabertos.mt.gov.br/api/3/action/package_list` | api | municipio | nao medida (datasets rotulados 2024/2025) | `[fetch-ok]` |
| Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT | outro | Portal de Dados Abertos de Mato Grosso — API organization_list | `https://dadosabertos.mt.gov.br/api/3/action/organization_list` | api | desconhecido | n/a | `[fetch-ok]` |
| Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT | financas/orcamento | Portal da Transparência da Prefeitura de Cuiabá | `https://transparencia.cuiaba.mt.gov.br/portaltransparencia/transparencia/` | desconhecido | municipio | desconhecida | `[fetch-ok]` |
| Anápolis/GO/GO | financas/orcamento | Transparência Anápolis | `https://transparencia.anapolis.go.gov.br/transparencia/index.jsf` | desconhecido | desconhecido | desconhecida | `[nao-testado]` |
| Anápolis/GO/GO | outro | Prefeitura de Anápolis — Portal da Transparência | `https://www.anapolis.go.gov.br/portal-da-transparencia/` | desconhecido | desconhecido | desconhecida | `[nao-testado]` |
| Aparecida de Goiânia/GO/GO | outro | Prefeitura de Aparecida de Goiânia (site institucional) | `https://aparecida.go.gov.br/` | desconhecido | desconhecido | desconhecida | `[nao-testado]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Melhor candidata do Centro-Oeste, mas por causa das FONTES SETORIAIS, não do portal central. Vence em (a) amplitude real de domínios com produtor identificável (segurança, saúde, educação, urbanismo/geo, meio ambiente, trânsito, mobilidade, finanças) e (b) granularidade sub-municipal genuína: a SSP-DF publica planilhas XLSX por cada uma das 33 Regiões Administrativas e por RISP, série 2014-2026 com atualização mensal — isso é raro no Brasil e é exatamente o insumo que um produto 'dado público em informação simples' precisa. O IPEDF/Codeplan (PDAD-A) dá o retrato socioeconômico por RA. Urbanismo e meio ambiente têm DOIS catálogos CSW/GeoNetwork que responderam GetCapabilities válido (GeoPortal/SEDUH e SISDIA), ou seja, acesso realmente programático. Governança viva: a CGDF publica Plano de Dados Abertos 2026-2027. RESSALVA IMPORTANTE: o portal central dados.df.gov.br carrega, mas não consegui enumerar nada dele — é um wrapper Liferay sobre CKAN e a API CKAN pública responde 404. Recomendo Brasília como piloto assumindo ingestão fonte-por-fonte, não via API única.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura a mais equilibrada da região, com forças e vazios claros. FORTE (dado estruturado e granular): segurança (XLSX por RA, mensal, 2014-2026); urbanismo/geo (2 catálogos CSW ISO19115/DCAT ativos); social/demografia (PDAD-A por 33 RAs, 7 edições até 2024); meio ambiente (CSW SISDIA + WebGIS + geoserviços). MÉDIO: saúde — o InfoSaúde tem muitos painéis operacionais de valor alto (leitos de UTI, estoque de medicamentos, farmácias das UBS, dengue, SRAG, sífilis congênita, nascimentos, óbitos) mas a página de dados abertos não expõe download; o caminho de download aponta de volta para o portal central que não pude enumerar. FRACO: trânsito/mobilidade — Detran-DF publica só PDF (série 2005-2024) e SEMOB publica só PDF + tabelas embutidas, sem GTFS nem CSV localizados; finanças — Portal da Transparência DF carregou praticamente vazio para fetch e TCDF só expõe uma API de sorteio de processos. CRÍTICO: educação — o portal CKAN próprio da SEEDF (data.se.df.gov.br) está de pé e a API responde success:true, mas com count:0 datasets. Ou seja: educação no DF, hoje, é o vazio mais grave, apesar de existir a estrutura.

#### 2. Goiânia/GO (com apoio do portal estadual de Goiás)/GO — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Segunda melhor opção, e a única do Centro-Oeste com API CKAN municipal comprovadamente funcional: dadosabertos.goiania.go.gov.br responde /api/3/action/package_list com success:true e 29 datasets, cada um em CSV, JSON, KMZ, PDF e SHP. O estado de Goiás complementa com o portal mais volumoso da região (446 conjuntos, 405 em CSV) e API DataStore/SQL documentada. Mas a cobertura municipal é fortemente enviesada para cadastro urbano/geo — bairros, lotes, quadras, logradouros, setores cadastrais, meios-fios, pontes — e falha justamente nos domínios de maior valor cotidiano.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

DESEQUILIBRADA e concentrada em urbanismo/geo. Dos 29 conjuntos municipais: Demografia 9, Meio Ambiente 5, Infraestrutura 4, Saúde 3, Transporte 2, Negócios 2, Imobiliário 2, Cultura 1, Educação 1. Saúde municipal se resume a Dengue, Programa Saúde da Família e Vigilância Sanitária. Educação é 1 conjunto ('estabelecimentos-de-educacao' — cadastro, não indicador). Transporte são 2 conjuntos de infraestrutura estática (estações de integração, corredores principais), não operação nem frota nem tempo real. Segurança: ZERO no município. Finanças: ZERO no portal municipal — o canal automatizado da prefeitura (nucleogov) retornou 403. O estado cobre parte do vazio de saúde (36 datasets CSV com granularidade municipal: SINASC, Mortalidade, COVID consolidado por município, Tuberculose, Sífilis) e de finanças via API, mas NÃO cobre criminalidade: o grupo 'Segurança Pública' do portal estadual tem só 6 conjuntos, todos de convênios e população carcerária. Granularidade sub-municipal por bairro existe como geometria (dataset 'bairros', 'regionais-administrativas'), mas não há indicadores sociais/segurança/saúde publicados por bairro.

#### 3. Campo Grande/MS/MS — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

NÃO recomendo como piloto, e a razão é técnica e verificável: todos os três hosts da prefeitura que tentei abrir falharam com erro de cadeia TLS ('unable to verify the first certificate') — o portal de dados abertos da transparência, o SISGRAN e a própria página de 'Acesso automatizado API'. Um piloto que depende de ingestão automatizada não pode partir de um domínio cuja cadeia de certificado não valida em cliente padrão. Existe base institucional (Decreto 15.645/2023 instituiu política de dados abertos, e o SISGRAN é descrito com módulos de mapas, censo, mapa de vulnerabilidade e perfil socioeconômico por bairro), mas nada disso pude confirmar abrindo.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável no nível municipal por falha de acesso. No nível estadual, a cobertura é estreita e enviesada para administração interna: 63 conjuntos, com Educação 6, Trânsito 4, Compras Emergenciais Covid-19 3, Despesas 3, AGEHAB 2, Patrimônio 2, Receitas 2, Recursos Humanos 2, Compras 1, Diárias 1. Ou seja: finanças/RH/compras dominam; saúde, segurança, meio ambiente e urbanismo praticamente ausentes do portal estadual. Ponto positivo isolado: é o portal da região com maior proporção de formatos consumíveis (37 CSV e 8 API em 63 conjuntos).

#### 4. Cuiabá/MT (e Várzea Grande na mesma RM)/MT — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

A opção mais fraca entre as capitais do Centro-Oeste. O portal estadual de Mato Grosso tem apenas 26 conjuntos no total — menos que o portal MUNICIPAL de Goiânia em número de temas úteis — e mais arquivos em PDF (9) e XLSX (9) do que em CSV (6). No nível municipal, não localizei portal de dados abertos de Cuiabá; o portal de transparência abriu mas devolveu praticamente nenhum conteúdo legível. Há sinal institucional recente (Decreto 1.691/2025 institui a Política de Dados Abertos de MT, exigindo PDA por órgão), o que sugere que MT pode melhorar em 2026-2027 — mas hoje não sustenta um piloto multi-domínio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Muito desequilibrada e rasa em volume absoluto. Nos 26 conjuntos estaduais: Infraestrutura 8, Ambiental 7, Segurança Pública 4, Econômico 3, Educação 2, Pessoas 1, Saúde 1. Saúde com UM único conjunto (SES-MT: 1) é inviável para um produto de informação ao cidadão. Trânsito praticamente inexistente (DETRAN-MT: 1). Finanças/orçamento não aparecem como grupo. Ponto relativamente positivo: segurança pública tem 4 conjuntos da SESP-MT, proporcionalmente melhor que Goiás. Formatos geoespaciais existem (KMZ 3, SHP 3), mas em volume mínimo. Nenhuma granularidade sub-municipal confirmada.

#### 5. Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Descartados como piloto por ausência de evidência de dados abertos próprios. As buscas retornaram apenas portais de transparência institucional (LAI) e, no caso de Aparecida de Goiânia, apenas a menção genérica ao Decreto federal 8.777/2016 e a agregadores de terceiros (prefeituras.org) que republicam conteúdo do dados.gov.br — não fonte primária municipal. Não abri nenhuma dessas URLs, então trato tudo como não testado. Qualquer cobertura desses municípios, hoje, viria por desagregação municipal do portal estadual de Goiás (446 conjuntos, 405 CSV), não por dado local próprio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Sem cobertura própria verificável em nenhum domínio. Zero evidência de portal de dados abertos, API ou catálogo CSV municipal. Isso é o oposto de cobertura equilibrada: é ausência. Para um piloto, o caminho viável seria usar Anápolis e Aparecida como recortes municipais dentro do dado estadual de GO (saúde via SINASC/Mortalidade/COVID por município), aceitando que segurança, trânsito, urbanismo e finanças locais não existiriam.

### Execução 2 — agente `execucao-2`

#### 1. Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Melhor piloto do Centro-Oeste, e provavelmente o melhor do Brasil em GRANULARIDADE INTRAURBANA. Por ser município+estado, o DF concentra num só ente dados de saúde, segurança, educação, mobilidade, urbanismo e finanças — sem a fragmentação prefeitura-vs-estado que trava Goiânia, Campo Grande e Cuiabá. Dois ativos são raros no país: (1) SSP-DF publica série criminal em XLS/XLSX desagregada pelas 33 Regiões Administrativas e 4 RISPs, cobrindo 2014-2026 — verifiquei a página e os nomes de arquivo; (2) IPEDF/Codeplan roda a PDAD, pesquisa domiciliar bianual com resultados por RA, e a PDAD-A 2024 ampliou para as 35 RAs + 12 municípios da Periferia Metropolitana de Brasília (25 mil domicílios). Urbanismo tem catálogo GeoNetwork maduro (205 registros, 54 WMS, 57 shapefiles). Saúde tem portal setorial próprio (InfoSaúde) com painéis de APS, vigilância e produção. ATENÇÃO ao principal risco: o portal central dados.df.gov.br está no ar mas seu catálogo é renderizado só por JavaScript e TODOS os caminhos CKAN que testei (/api/3/action/package_list, package_search, group_list, /organization/..., /group/..., /catalogo) retornaram 404. Ou seja: a força do DF está nos portais SETORIAIS, não no portal central. Planeje ingestão porta a porta, não via API única.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura mais EQUILIBRADA da região: 6 de 8 domínios com fonte setorial própria aberta e verificada (segurança, saúde, urbanismo/geo, mobilidade, social/socioeconômico, meio ambiente parcial). Segurança e urbanismo/geo são os pontos fortes absolutos. Lacunas reais: (a) educação — não encontrei nesta sessão um portal de dados abertos da SEEDF equivalente ao InfoSaúde, dependeria de Censo Escolar/INEP; (b) finanças/orçamento — o Portal da Transparência DF está no ar mas é SPA e não consegui confirmar seção de download em CSV/XLSX; (c) comércio/economia — sem fonte municipal aberta verificada.

#### 2. Goiânia/GO (e região metropolitana, via camada estadual)/GO — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Segundo colocado, mas por um motivo torto que precisa ficar explícito: a força NÃO é municipal, é estadual. O portal estadual dadosabertos.go.gov.br é o maior catálogo CKAN do Centro-Oeste que consegui medir — 1.047 datasets via API package_list, com dados setoriais reais e recentes (spot-check: 'crimes-registrados-pela-delegacia-virtual' tem CSV com last_modified 2025-10-09). A saúde estadual de GO é a mais rica da região: SINASC nascidos vivos, mortalidade, ICSAP, tuberculose, hanseníase, IST/HIV/sífilis/hepatite, SRAG, dengue, arbovirose, mapa de leitos, unidades de saúde, georreferenciamento de UBS, oncologia. Educação tem IDEGO, endereço das escolas, docentes por escola, matrículas por etapa, merenda e transporte escolar. Trânsito tem multas, CNH emitidas, frota, fiscalização de veículos. Já o portal MUNICIPAL de Goiânia é o oposto: CKAN funcional com API aberta e formatos exemplares (CSV+JSON+KMZ+SHP+dicionário PDF por dataset), mas apenas 29-30 datasets e essencialmente CONGELADO — 'bairros' com last_modified 18/09/2018 e 'dengue' com 06/04/2020. Os links ainda funcionam (baixei bai.csv, 3,7 MB, 19 colunas, geometria WKT), o problema é a data, não o encanamento.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA e desalinhada de nível. No nível municipal, Goiânia é fortemente enviesada para urbanismo/geo — de 29 datasets, ~18 são cartográficos (altimetria, bairros, logradouros, lotes, quadras, meios-fios, pontes, praças, setores cadastrais, macro-zonas, regionais administrativas, hidrografia, erosões). Saúde municipal tem só 3 (dengue, PSF, vigilância sanitária), educação 1 (estabelecimentos), economia 2 (CAE, desenvolvimento econômico), segurança ZERO, finanças ZERO no CKAN (ficam no portal de transparência separado). No nível estadual a cobertura é ampla nos 8 domínios, mas há muito ruído administrativo repetido (dezenas de datasets de terceirizados, bens móveis, diárias por órgão) e a granularidade por município varia dataset a dataset — não confirmei recorte Goiânia para as séries de saúde e segurança.

#### 3. Campo Grande/MS/MS — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Terceiro, e o mais subestimado. Não tem volume, mas tem a distribuição temática mais honesta da região fora do DF. O portal estadual dados.ms.gov.br é CKAN com 62-63 datasets e — diferente de GO — pouco ruído administrativo e vários datasets explicitamente recortados 'por município', o que dá granularidade Campo Grande de graça: infracoes-por-municipio, exames-cnh-por-municipio, detalhamento-de-frotas-por-municipio, repasses-dos-municipios. Segurança é o destaque: a SEJUSP publica CVLI, ocorrências, drogas, armas, desaparecimento e localização de pessoas e veículos como datasets próprios. Educação tem matrículas por unidade escolar, notas gerais das escolas e notas por dimensão/área/tópico. No nível municipal, o SIMGEO (Sistema Municipal de Geoprocessamento, decreto 9.520/2006, replataformado recentemente) é o ativo mais interessante: expõe geoportais de NOVE secretarias — Fazenda, Habitação/Terras, Tecnologia, AGETRAN (transporte), PLANURB (urbanismo), SISEP (serviços públicos), SEMED (educação), SEMADES (meio ambiente) e SESAU (saúde). Se esses subportais realmente servirem download, Campo Grande vira concorrente direto do DF em amplitude municipal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EQUILIBRADA no estadual, com um buraco grave: saúde humana. No dados.ms.gov.br a única coisa próxima de saúde são campanhas de vacinação contra febre aftosa (saúde ANIMAL) e datasets de COVID-19 — não há mortalidade, natalidade, internações nem arboviroses. Bem coberto: segurança (7 datasets SEJUSP), trânsito/mobilidade (4), educação (5), finanças (receitas, despesas, folha, empenhos, diárias, patrimônio), social (~10 programas), meio ambiente/geo (hidrografia-ms, altimetria-ms, estacoes-meteorologicas-ms, sistema-viario-de-ms, pontos-de-outorga), economia (jucems, nota-fiscal-eletronica, observatorio-do-trabalho-funtrab). No municipal, o portal de dados abertos é só finanças; a amplitude está no SIMGEO, mas não verificada.

#### 4. Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

NÃO recomendo como piloto. É o pior caso verificado da região, e a fragilidade está nas duas camadas. Estadual: o dadosabertos.mt.gov.br é CKAN funcional, com API respondendo e 11 organizações (seduc, seplag, intermat, mti, sefaz, sema, ses, sesp, setasc, sinfra), mas o catálogo tem apenas 25-26 datasets — 40x menor que GO e menos da metade de MS. Pior, o conteúdo é enviesado: segurança pública existe SÓ como violência contra a mulher (feminicidios-mt, homicidios-mulheres-mt, registros-de-ocorrencias-mulheres-mt, tentativas-de-crimes-contra-a-mulher-mt) — importante, mas não é base para produto geral de segurança. Saúde é praticamente inexistente: a SES-MT aparece com um único dataset e ele é 'ses-doacoes-recebidas-covid-19'. Educação é um dataset ('localizacao-das-escolas-de-tempo-integral'). Municipal: procurei catálogo de dados abertos de Cuiabá e não achei nenhum — só Portal da Transparência (LRF/LC 131/LAI), relançado com abas de previdência, controle interno e patrimônio, ou seja, escopo fiscal. Nenhuma evidência de dados abertos de Várzea Grande.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO CONCENTRADA e rasa. Dos 25 datasets estaduais, o eixo real é meio ambiente/território (dados-de-desmatamento, exploracao-florestal, compensacao-ambiental, gestao-de-areas-contaminadas, base-de-dados-geograficos-de-referencia-utilizados-na-sema-mt, limite-politico-administrativo, sistema-viario, assentamentos) e patrimônio/obras (bens-imoveis-2025, relacao-de-bens, listagem-de-obras, frota-da-sinfra-2025, fiscais-sinfra). Saúde ~0, educação ~1, segurança apenas recorte de gênero, mobilidade urbana 0, comércio/economia 1 (produto-interno-bruto-pib-dos-municipios). Desequilíbrio exatamente do tipo que o critério 3 manda penalizar.

#### 5. Anápolis/GO/GO — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Não recomendo. Só localizei via busca um Portal da Transparência (transparencia.anapolis.go.gov.br) e a página institucional da Prefeitura. Nenhum indício de catálogo de dados abertos multidomínio. Sendo rigoroso: NÃO abri nenhuma dessas URLs nesta sessão, então trate como não verificado, não como inexistente. Se houver interesse, o caminho realista é usar o recorte municipal do portal estadual de GO em vez de fonte própria.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável com o que verifiquei. A expectativa, pelo padrão de municípios goianos desse porte, é cobertura restrita a finanças/transparência — mas isso é inferência minha, não evidência.

#### 6. Aparecida de Goiânia/GO/GO — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Não recomendo. Nas buscas, os dados de Aparecida de Goiânia aparecem sobretudo como recorte de bases FEDERAIS (dados.gov.br, IBGE Cidades e Estados) e não como catálogo próprio. Não localizei portal de dados abertos municipal. Como no caso de Anápolis, NÃO abri nenhuma URL do município nesta sessão — é não verificado, não confirmadamente ausente. Sendo o 2º município de GO em população e parte da RM de Goiânia, seria coberto por um piloto que use a camada estadual de GO com recorte por município.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável com o que verifiquei. Nenhum domínio confirmado com fonte municipal aberta.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF — `red_flags`:**

1) dados.df.gov.br não é enumerável: /api/3/action/organization_list, /api/3/action/package_search e /api/3/action/status_show retornaram 404; /dataset, /catalogo-dados, /fontes-de-dados e a própria página de dataset de acidentes retornaram só shell de navegação. O sitemap.xml é índice Liferay (13 sub-sitemaps com p_l_id/layoutUuid/groupId, zero caminhos /dataset), confirmando front-end Liferay sobre CKAN — logo NÃO assuma API CKAN pública. 2) robots.txt expõe 'Sitemap: https://dados.df.gov.br:8443/sitemap.xml' (porta interna vazando por trás do proxy). 3) /perguntas está indexada no Google mas hoje dá 404 — roteamento inconsistente. 4) data.se.df.gov.br: CKAN vivo, grupo '[Censo DF] Censo Escolar do Distrito Federal' existe, mas 0 conjuntos publicados. 5) dadoseducacionais.se.df.gov.br: certificado TLS errado (altnames = cemicruzeiro.se.df.gov.br). 6) geoportal.seduh.df.gov.br: cadeia de certificado não verificável. 7) geoservico.ibram.df.gov.br: certificado expirado. 8) semob.df.gov.br sem 'www' não resolve DNS; /plano-de-dados-abertos-pda/ dá 404. 9) geoserviço do IPEDF só tem ortofotos 2009-2015 (defasado) e só WMS, sem WFS/download. 10) educacao.df.gov.br/dados-educacionais-df para em 2020 — abaixo da janela 2024-2026 pedida.

**Goiânia/GO (com apoio do portal estadual de Goiás)/GO — `red_flags`:**

1) goiania.nucleogov.com.br/cidadao/outras_informacoes/acesso_automatizado (a página de 'Acesso Automatizado aos Dados Abertos (API)' da prefeitura) retornou HTTP 403 — o canal de finanças municipal está bloqueado para consumo automatizado externo. 2) Nenhum dado de criminalidade aberto: SSP-GO publica somente PDF, com atraso declarado de pelo menos 60 dias, e as seções 'Ocorrências de Trânsito', ambiental, pessoas e veículos aparecem marcadas '(Em manutenção)'. 3) O portal estadual tem mais PDF (438) do que CSV (405) e apenas 8 conjuntos em JSON — o CSV domina, mas o PDF ainda é volume comparável. 4) Só 1 organização no portal municipal ('Prefeitura Municipal de Goiânia'), sinal de que não há publicação descentralizada por secretaria. 5) Não confirmei periodicidade de atualização de nenhum conjunto municipal — a metadata de frequência não apareceu nas páginas que abri.

**Campo Grande/MS/MS — `red_flags`:**

1) Três hosts distintos da Prefeitura de Campo Grande falharam com 'unable to verify the first certificate' — transparencia.campogrande.ms.gov.br e www.campogrande.ms.gov.br (duas rotas). Isso indica problema de cadeia intermediária no domínio, não um endpoint isolado. 2) Não consegui confirmar NADA sobre o SISGRAN por leitura direta: módulos, formatos e granularidade por bairro vêm apenas de descrição em resultados de busca — trate como não verificado. 3) O portal estadual tem uma única organização ('Governo do Estado de Mato Grosso do Sul': 63) — não há publicação por secretaria, o que limita rastreabilidade e sustentabilidade. 4) Grupo 'Compras Emergenciais Covid-19' entre os maiores temas sugere catálogo herdado da pandemia e pouco renovado.

**Cuiabá/MT (e Várzea Grande na mesma RM)/MT — `red_flags`:**

1) Volume total de 26 conjuntos estaduais é baixíssimo para um estado do porte de MT. 2) PDF (9) empata com XLSX (9) e supera CSV (6) — o critério de 'PDF vale pouco' pesa forte aqui. 3) transparencia.cuiaba.mt.gov.br abriu mas o único texto recuperado foi a palavra 'Transparencia' — não pude confirmar existência de seção de dados abertos, formatos ou API; trate a capital como não avaliada. 4) Nenhum portal de dados abertos municipal de Cuiabá foi localizado nas buscas — só portais de transparência (transparencia.cuiaba.mt.gov.br, sorp.cuiaba.mt.gov.br/transparencia, conselhotransparente.cuiaba.mt.gov.br). 5) Várzea Grande: nenhuma iniciativa de dados abertos apareceu em busca; não há URL que eu possa citar honestamente.

**Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO — `red_flags`:**

1) Nenhuma URL destes municípios foi aberta nesta sessão — todas as entradas abaixo são 'nao-testado' e não devem ser contadas como fonte confirmada. 2) O resultado mais citado para Aparecida de Goiânia em busca foi prefeituras.org, um agregador privado, não domínio .gov.br — sinal de vácuo de publicação oficial. 3) Várzea Grande/MT não gerou nenhum resultado de dados abertos e por isso não tem nem URL citável aqui.

### Execução 2 — agente `execucao-2`

**Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF — `red_flags`:**

CRÍTICO: portal central dados.df.gov.br com API CKAN e rotas de catálogo em 404 (4 endpoints testados, todos falharam) — catálogo só via navegador, inviabiliza harvesting automatizado hoje. Ortofotos do geoserviço IPEDF param em 2015 (Mosaico 2009/2013/2014/2015), imagem desatualizada. Segurança e PDAD são distribuídas majoritariamente em XLS/XLSX e PDF, não em API — o criterio 2 penaliza isso parcialmente. O relatório PDAD por RA que baixei é PDF de 2,3 MB e não consegui extrair o texto (comprimido); microdados da PDAD 2024 não foram confirmados como baixáveis nesta sessão (a página lista microdados só até 2021). Portal da Transparência DF e pdad.ipe.df.gov.br são SPAs que não renderizaram conteúdo para o fetcher.

**Goiânia/GO (e região metropolitana, via camada estadual)/GO — `red_flags`:**

Portal municipal desatualizado 6-8 anos (2018-2020) — é o maior risco do piloto: parece aberto, mas não sustenta produto vivo. Nenhum dado municipal de segurança nem de finanças no CKAN. A API de acesso automatizado da Prefeitura (goiania.nucleogov.com.br) retornou HTTP 403 para mim — não pude verificar. No portal estadual, o dataset de crimes que abri é 'relação de fatos passíveis de registro na delegacia virtual' — pelo nome e pelo metadado NÃO confirmei que traz contagem de ocorrências por município; pode ser tabela de referência, não série criminal. Também não confirmei granularidade municipal em nenhum dataset estadual (só o package_show, que não expôs colunas). Anápolis e Aparecida de Goiânia, na RM, só têm portal de transparência — não herdam catálogo municipal.

**Campo Grande/MS/MS — `red_flags`:**

O 'Dados Abertos' municipal é fachada de transparência fiscal: a página só oferece RECEITA, DESPESA, DIÁRIAS E PASSAGENS e CONTRATOS — quatro temas, todos financeiros, e a própria página não declara formato (CSV/XLSX/JSON/API não mencionados). Não há catálogo municipal de saúde, segurança, educação ou mobilidade. O SIMGEO: abri a landing e confirmei os 9 portais setoriais, mas a página NÃO menciona shapefile, CSV, GeoJSON nem WMS — a capacidade de download segue NÃO verificada e é a maior incógnita do piloto. Não abri nenhum subportal setorial do SIMGEO nem testei um único arquivo do dados.ms.gov.br, então a atualidade dos datasets estaduais também não foi medida.

**Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT — `red_flags`:**

Catálogo estadual pequeno demais para sustentar produto multidomínio. Ausência de dados de saúde e de segurança geral abertos. Não localizei portal de dados abertos MUNICIPAL de Cuiabá — apenas transparência fiscal. O transparencia.cuiaba.mt.gov.br respondeu 200 mas devolveu só o título 'Transparencia', sem menu nem conteúdo: não pude confirmar nem sequer as seções financeiras, muito menos download em CSV/XLSX/API. Várzea Grande: NÃO testei nenhuma URL — trate como desconhecido, não como ausente.

**Anápolis/GO/GO — `red_flags`:**

Zero URLs abertas — toda a informação vem de resultados de busca. Nenhuma fonte marcada fetch-ok. Não use esta linha para decisão sem verificação adicional.

**Aparecida de Goiânia/GO/GO — `red_flags`:**

Zero URLs abertas. Só há a página institucional da Prefeitura nos resultados de busca; um dos resultados (aparecida-goiania.prefeituras.org) é agregador de terceiros, não fonte oficial — não confundir.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO BUSQUEI. Fiz 14 WebSearch e 42 WebFetch. As buscas cobriram: portal de dados abertos DF; portal de dados abertos Goiânia; SSP-DF por região administrativa; IPEDF/Codeplan PDAD microdados; Geoportal SEDUH/geoserviço WFS-WMS; Detran-DF estatísticas; Campo Grande dados abertos/SISGRAN; dados abertos Mato Grosso; Cuiabá transparência; SEMOB-DF GTFS; Saúde Aberta DF/SES-DF; SEEDF censo escolar; SSP-GO observatório; Brasília Ambiental/IBRAM/SISDIA; Anápolis/Aparecida de Goiânia/Várzea Grande; e "ide.df.gov.br" geoserver. Depois abri com WebFetch cada URL citada.

O QUE CONSEGUI CONFIRMAR ABRINDO (destaques). (a) SSP-DF publica XLSX/XLS por cada uma das 33 Regiões Administrativas e por RISP, 2014-2026, com atualização mensal do ano corrente — é a melhor evidência de granularidade sub-municipal de toda a região. (b) Dois catálogos CSW 2.0.2 do DF responderam GetCapabilities XML válido: "Metadados - GeoPortal / DF" (SEDUH) e "Catálogo de Metadados do SISDIA" (SEMA), ambos com ISO 19115/19115-3 e DCAT — acesso programático real. (c) A API CKAN de Goiânia funciona: package_list devolveu success:true e os 29 nomes de dataset. (d) Contagens de catálogo lidas diretamente: Goiás 446 conjuntos (CSV 405, PDF 438, JSON 8), MS 63 (CSV 37, API 8), MT 26 (PDF 9, XLSX 9, CSV 6), Goiânia 29.

O QUE NÃO CONSEGUI CONFIRMAR — E ISSO MUDA A LEITURA. O portal central dados.df.gov.br é o ponto fraco mais importante do meu levantamento e eu NÃO tenho número de conjuntos para ele. Ele responde HTTP 200 em /, /catalogo-dados, /temas, /fontes-de-dados, /dataset e até na página de dataset de acidentes, mas devolve só shell de navegação: nenhum dataset, órgão, tema ou formato foi renderizado. As três tentativas de API CKAN (/api/3/action/organization_list, /api/3/action/package_search, /api/3/action/status_show, com e sem "www") deram 404. O sitemap.xml revelou que é um front-end Liferay (parâmetros p_l_id/layoutUuid/groupId, 13 sub-sitemaps, zero caminhos /dataset) e o robots.txt aponta para "https://dados.df.gov.br:8443/sitemap.xml". Conclusão honesta: as descrições de riqueza do portal do DF que aparecem em snippets de busca (por exemplo um recurso CSV de acidentes fatais da Detran-DF, ou datasets SIA/SIH da SES-DF em CSV/JSON) eu NÃO validei abrindo — não as contei como fonte verificada. Se o auditor quiser fechar essa lacuna, precisa de um cliente que execute JavaScript ou do endpoint CKAN interno.

FALHAS TÉCNICAS REAIS ENCONTRADAS (informação útil, não erro meu). TLS: geoportal.seduh.df.gov.br e três hosts da Prefeitura de Campo Grande falharam com "unable to verify the first certificate"; geoservico.ibram.df.gov.br com "certificate has expired"; dadoseducacionais.se.df.gov.br com altnames apontando para cemicruzeiro.se.df.gov.br. DNS: semob.df.gov.br sem "www" não resolve. HTTP: 404 em www.semob.df.gov.br/plano-de-dados-abertos-pda/ e em www.dados.df.gov.br/perguntas (esta última indexada em busca); 403 no canal de API da Prefeitura de Goiânia (nucleogov). Catálogo vazio: data.se.df.gov.br é um CKAN vivo cuja API devolve success:true com count:0 — a SEEDF tem a estrutura montada e nenhum dado publicado.

VIESES E LIMITES DA MINHA AVALIAÇÃO. 1) Meu ranking do DF depende de fontes setoriais, não do catálogo central; se o critério for "um portal único e enumerável via API", Goiânia+Goiás ganham do DF, porque ali a API responde. 2) Não consegui verificar frequência de atualização de quase nenhum conjunto — só SSP-DF (mensal), SEMOB-DF (notas mensais até 2026) e SSP-GO (mensal com 60 dias de atraso). 3) Não testei nenhum download de arquivo até o byte; validei páginas de listagem, respostas de API e GetCapabilities. 4) Não avaliei qualidade interna, esquema nem completude dos dados. 5) Várzea Grande, Anápolis e Aparecida de Goiânia ficaram sem verificação de fetch — estão marcadas nao-testado de propósito. 6) O orçamento de WebSearch da sessão esgotou (200/200) antes de eu confirmar se existe feed GTFS oficial do DF; a evidência que tenho (página de dados do STPC/DF da SEMOB) mostra apenas PDF e tabelas embutidas, sem GTFS/CSV, então classifiquei mobilidade do DF como fraca — mas essa é uma conclusão de ausência de evidência, não prova de inexistência.

RECOMENDAÇÃO DE PILOTO. Brasília/DF, com escopo inicial em três domínios onde a evidência é sólida e a granularidade por Região Administrativa é real: segurança (SSP-DF, XLSX mensal por 33 RAs), socioeconômico (IPEDF PDAD-A por 33 RAs) e urbanismo/ambiental (os dois CSW). Trate saúde como fase 2 (painéis do InfoSaúde têm alto valor mas download não confirmado) e NÃO prometa educação, trânsito nem finanças no MVP do DF. Goiânia/GO é o melhor plano B técnico, porque a API responde hoje sem depender de JavaScript, aceitando que o recorte será urbanismo/geo + saúde estadual por município.

#### Fontes que a execução 1 NÃO confirmou (11 de 43)

- `[fetch-falhou]` **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF** — IBRAM GeoServer — WMS GetCapabilities — `http://geoservico.ibram.df.gov.br/geoserver/ows?service=WMS&version=1.3.0&request=GetCapabilities`
  - motivo/evidência registrada pelo agente: Falha TLS: 'certificate has expired'. O endpoint é anunciado pela própria página do IBRAM, mas não conseguiu ser aberto sob HTTPS nesta sessão.
- `[fetch-falhou]` **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF** — SEEDF — Portal dadoseducacionais (CensoDF) — `https://dadoseducacionais.se.df.gov.br/index.php`
  - motivo/evidência registrada pelo agente: Falha TLS: 'Hostname/IP does not match certificate altnames: Host: dadoseducacionais.se.df.gov.br is not in the cert altnames: DNS:cemicruzeiro.se.df.gov.br'.
- `[fetch-falhou]` **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF** — SEMOB-DF — Plano de Dados Abertos (PDA) — `https://www.semob.df.gov.br/plano-de-dados-abertos-pda/`
  - motivo/evidência registrada pelo agente: HTTP 404. A URL aparece indexada nos resultados de busca, mas não abre. O host sem 'www' (semob.df.gov.br) também falha com getaddrinfo ENOTFOUND.
- `[fetch-falhou]` **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF** — dados.df.gov.br — CKAN API (organization_list / package_search / status_show) — `https://www.dados.df.gov.br/api/3/action/organization_list?all_fields=true`
  - motivo/evidência registrada pelo agente: HTTP 404. Também 404 em /api/3/action/package_search?rows=0 e /api/3/action/status_show, e no host sem 'www'. Conclusão: não há API CKAN pública utilizável no hostname do portal.
- `[fetch-falhou]` **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF** — GeoPortal SEDUH-DF (visualizador) — `https://www.geoportal.seduh.df.gov.br/geoportal/`
  - motivo/evidência registrada pelo agente: Falha TLS: 'unable to verify the first certificate'. O catálogo de metadados associado (CSW) abriu normalmente, então o problema é do host do visualizador.
- `[fetch-falhou]` **Goiânia/GO (com apoio do portal estadual de Goiás)/GO** — Prefeitura de Goiânia — Acesso Automatizado aos Dados Abertos (API) — `https://goiania.nucleogov.com.br/cidadao/outras_informacoes/acesso_automatizado`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Página é anunciada nos resultados de busca como o canal de acesso automatizado da prefeitura, mas está inacessível para consumo externo nesta sessão.
- `[fetch-falhou]` **Campo Grande/MS/MS** — Prefeitura de Campo Grande — Dados Abertos (Portal Transparência) — `https://transparencia.campogrande.ms.gov.br/canais/dados-abertos/`
  - motivo/evidência registrada pelo agente: Falha TLS: 'unable to verify the first certificate'. Não foi possível ler nenhum conjunto, categoria ou formato.
- `[fetch-falhou]` **Campo Grande/MS/MS** — SISGRAN — Sistema Municipal de Indicadores de Campo Grande — `https://www.campogrande.ms.gov.br/sisgran/`
  - motivo/evidência registrada pelo agente: Falha TLS: 'unable to verify the first certificate'. Descrições de módulos (SISGRAN Mapas, censo demográfico, mapoteca, Mapa de Vulnerabilidade, Perfil Socioeconômico, dados por bairro) vêm apenas de resultados de busca e NÃO foram verificadas.
- `[fetch-falhou]` **Campo Grande/MS/MS** — Prefeitura de Campo Grande — Acesso automatizado API — `https://www.campogrande.ms.gov.br/acesso-automatizado-api/`
  - motivo/evidência registrada pelo agente: Falha TLS: 'unable to verify the first certificate'. Nenhum endpoint pôde ser confirmado.
- `[nao-testado]` **Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO** — Prefeitura de Anápolis — Portal da Transparência — `https://www.anapolis.go.gov.br/portal-da-transparencia/`
  - motivo/evidência registrada pelo agente: nao reportado
- `[nao-testado]` **Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO** — Prefeitura de Aparecida de Goiânia — site oficial — `https://aparecida.go.gov.br/`
  - motivo/evidência registrada pelo agente: nao reportado

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

COMO BUSQUEI. 9 WebSearch + 26 WebFetch. Estratégia: para cada UF, (a) descobrir o portal por busca, (b) tentar a API CKAN direto (/api/3/action/package_list, organization_list, group_list, package_show) porque é a única forma de obter contagem e nomes VERIFICÁVEIS em vez de acreditar no texto da home, (c) quando havia link de arquivo, baixar o arquivo para testar liveness de verdade.

BUSCAS FEITAS: portal dados abertos DF; portal dados abertos Goiânia; IPEDF/Codeplan PDAD 2024 microdados por RA; Geoportal DF SEDUH geoserviço WMS/shapefile; SSP-DF criminalidade por região administrativa; InfoSaúde DF painéis; Semob DF GTFS/DFTrans; Campo Grande dados abertos + geoportal; Cuiabá dados abertos/transparência/geoportal; Mato Grosso dados.mt.gov.br CKAN; Anápolis + Aparecida de Goiânia dados abertos; e uma busca específica tentando achar o caminho atual do catálogo do DF.

O QUE FUNCIONOU BEM. As APIs CKAN de GO (1.047 datasets), MS (62-63), MT (25-26) e Goiânia (29) responderam e me deram listas literais de nomes — essas contagens são medidas, não estimadas. Baixei dois arquivos binários reais como prova de liveness: bai.csv de Goiânia (3,7 MB, 19 colunas, geometria WKT, timestamps de 2017) e o relatório PDAD por RA de Brazlândia (PDF 2,3 MB). Fiz package_show em 3 datasets (goiania/bairros, goiania/dengue, go/crimes-delegacia-virtual) para medir formatos e datas de atualização em vez de supor.

O QUE FALHOU (informação relevante, não erro de execução). (1) A API CKAN do DF está inacessível nos caminhos padrão: testei 6 rotas e todas deram 404 — /api/3/action/package_list, /api/3/action/package_search?q=saude, /api/3/action/group_list, https://dados.df.gov.br/api/3/action/package_search?rows=0, /catalogo, /group/plano-de-dados-abertos, além de /organization/ssp-... Isso contradiz a documentação oficial que anuncia API CKAN no DF. (2) goiania.nucleogov.com.br (API de acesso automatizado da Prefeitura de Goiânia): HTTP 403. (3) dados.gov.br/harvest/distrito-federal: HTTP 401. (4) www.geoportal.seduh.df.gov.br/mapa/: erro de TLS ('unable to verify the first certificate') — não consegui abrir o visualizador; contornei pelo catálogo GeoNetwork metadados.seduh.df.gov.br, que funcionou. (5) semob.df.gov.br sem www: ENOTFOUND; com www funcionou.

LIMITAÇÃO SISTEMÁTICA IMPORTANTE. Vários portais brasileiros hoje são SPAs JavaScript e devolvem 200 com casca vazia para um fetcher HTTP. Aconteceu com dados.df.gov.br/dataset, transparencia.df.gov.br, pdad.ipe.df.gov.br e transparencia.cuiaba.mt.gov.br. Marquei todos como fetch-ok (o servidor respondeu) mas registrei explicitamente na evidência que NENHUM conteúdo de catálogo foi renderizado. Não converti isso em afirmação sobre riqueza de dados em nenhum dos dois sentidos.

O QUE NÃO CONSEGUI CONFIRMAR e que um auditor deve cobrar. (a) Granularidade municipal dos datasets estaduais de GO e MS — o package_show não expõe colunas; para GO nem confirmei se 'crimes-registrados-pela-delegacia-virtual' é série de ocorrências ou tabela de referência. (b) Botão de download CSV nos painéis do InfoSaúde DF: a existência apareceu em notícia da SES, NÃO na página de dados abertos que abri. (c) Formatos dos arquivos da SEMOB-DF e do SSP-DF: sei que há XLS/XLSX pelos nomes de arquivo listados, mas não baixei nenhum. (d) Microdados da PDAD-A 2024: a página do IPEDF lista microdados até 2021; não achei confirmação de microdado 2024 baixável. (e) Capacidade de download do SIMGEO Campo Grande — a incógnita de maior impacto no ranking, porque se os 9 subportais servirem shapefile/CSV, Campo Grande sobe. (f) GTFS do DF: buscado, não encontrado em fonte oficial aberta. (g) Educação e finanças do DF em formato aberto: não localizei portal setorial equivalente ao InfoSaúde. (h) Várzea Grande, Anápolis e Aparecida de Goiânia: nenhuma URL aberta — marquei nao-testado e NÃO afirmo ausência.

RANKING E O TRADE-OFF QUE ELE ESCONDE. Brasília/DF ganha com folga pelos critérios 1 e 3 (amplitude + equilíbrio) e vence sozinha no diferencial de granularidade intraurbana: 33-35 Regiões Administrativas em segurança (SSP-DF, 2014-2026) E em socioeconômico (PDAD-A 2024, 25 mil domicílios, + 12 municípios da PMB). Mas atenção ao paradoxo: o DF é o melhor piloto APESAR do seu portal central de dados abertos estar com catálogo e API quebrados — a força vem de portais setoriais dispersos, o que significa mais trabalho de engenharia de ingestão e nenhum ponto único de coleta. Coloquei Goiânia em 2º por causa do portal ESTADUAL (1.047 datasets, saúde a mais rica da região, atualizações em 2025-2026), reconhecendo que o portal municipal está congelado em 2018-2020 — se o piloto exigir dado municipal próprio, Goiânia cai para trás de Campo Grande. Campo Grande é 3º e o mais promissor em potencial não verificado (SIMGEO com 9 secretarias), com lacuna grave de saúde humana no portal estadual de MS. Cuiabá em 4º e desaconselhado. Recomendação prática: piloto no DF por RA, com Goiânia/Aparecida/Anápolis via camada estadual de GO como segundo lote.

#### Fontes que a execução 2 NÃO confirmou (5 de 27)

- `[fetch-falhou]` **Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF** — dados.df.gov.br — API CKAN (4 endpoints testados) — `https://www.dados.df.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: HTTP 404. Também retornaram 404: /api/3/action/package_search?q=saude, /api/3/action/group_list, https://dados.df.gov.br/api/3/action/package_search?rows=0, /catalogo, /group/plano-de-dados-abertos e /organization/ssp-secretaria-de-estado-de-seguranca-publica-e-paz-social. Conclusão honesta: a API CKAN documentada do DF não está acessível nos caminhos padrão hoje.
- `[fetch-falhou]` **Goiânia/GO (e região metropolitana, via camada estadual)/GO** — Prefeitura de Goiânia — Acesso Automatizado aos Dados Abertos (API) — `https://goiania.nucleogov.com.br/cidadao/outras_informacoes/acesso_automatizado`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. A existência da API é citada em páginas oficiais da Prefeitura, mas eu NÃO consegui abrir a documentação nem confirmar endpoints ou formatos.
- `[nao-testado]` **Anápolis/GO/GO** — Transparência Anápolis — `https://transparencia.anapolis.go.gov.br/transparencia/index.jsf`
  - motivo/evidência registrada pelo agente: nao reportado
- `[nao-testado]` **Anápolis/GO/GO** — Prefeitura de Anápolis — Portal da Transparência — `https://www.anapolis.go.gov.br/portal-da-transparencia/`
  - motivo/evidência registrada pelo agente: nao reportado
- `[nao-testado]` **Aparecida de Goiânia/GO/GO** — Prefeitura de Aparecida de Goiânia (site institucional) — `https://aparecida.go.gov.br/`
  - motivo/evidência registrada pelo agente: nao reportado

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 70 no total — 54 `[fetch-ok]`, 11 `[fetch-falhou]`, 5 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 1 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 0 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 53 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF**
- Execução 2 (`execucao-2`): **Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Brasília/DF (Distrito Federal — 33 Regiões Administrativas)/DF · Goiânia/GO (com apoio do portal estadual de Goiás)/GO · Campo Grande/MS/MS · Cuiabá/MT (e Várzea Grande na mesma RM)/MT · Anápolis e Aparecida de Goiânia (municípios médios de GO) — descartados/GO

- Execução 2 (`execucao-2`): Brasília/DF (Distrito Federal, 33-35 Regiões Administrativas)/DF · Goiânia/GO (e região metropolitana, via camada estadual)/GO · Campo Grande/MS/MS · Cuiabá/MT (e Várzea Grande, RM de Cuiabá)/MT · Anápolis/GO/GO · Aparecida de Goiânia/GO/GO

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
