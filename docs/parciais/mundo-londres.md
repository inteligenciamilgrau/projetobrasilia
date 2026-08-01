# mundo-londres — cidade-modelo do mundo: Londres (Reino Unido)

**Status:** transcrito do journal
**Última atualização:** 2026-08-01
**Agente:** transcritor (não-pesquisador). Nenhuma busca nova foi feita nesta tarefa.
**Fonte única:** registro local de execução, não versionado, contendo um dossiê e duas auditorias.

> **AVISO DE TRANSCRIÇÃO:** os marcadores `[fetch-ok]` / `[fetch-falhou]` / `[nao-testado]` abaixo são exatamente os que os agentes retornaram. Nada foi promovido. Onde o agente não reportou um dado, está escrito "não reportado".

**AUDITADO — DUAS VEZES, COM VEREDITOS DIFERENTES.** Ver seção "Correções do auditor".

- População declarada pelo dossiê: "~8,9-9,0 milhões na Greater London (33 boroughs, área do GLA); área metropolitana/urbana ampliada ~14-15 milhões." O próprio dossiê marca: **não verificado por fetch** (orçamento de WebSearch esgotado em 200/200 chamadas). Os dois auditores corrigiram "33 boroughs" para "32 boroughs + City of London" e **mantiveram** o número populacional como NÃO VERIFICADO.

---

## 1. Tabela de domínios (como o dossiê original os reportou)

| Domínio | Datasets | Tipo de acesso | Granularidade | Atualização | URL | Status verified | Evidência curta |
|---|---|---|---|---|---|---|---|
| mobilidade/trânsito | TfL Unified API, 14 grupos de recursos confirmados no swagger (AccidentStats, AirQuality, BikePoint, Cabwise, Journey, Line, Mode, Occupancy, Place, Road, Search, StopPoint, TravelTime, Vehicle). No Datastore: Number of Bicycle Hires (XLSX, 29/07/2026), Camera Captures and Confirmed Vehicles in the Congestion Charge Zone by Month (XLSX+CSV, 29/07/2026). TfL GIS Open Data Hub referencia Bus Stops, Strategic Road Network, CollStats, Highway Authority boundary | api | Ponto/ativo individual em tempo real (docking station, stop point, linha, corredor viário); colisões georreferenciadas; séries agregadas mensais | Tempo real (segundos-minutos) para status de linha, chegadas e bicicletas; mensal para séries do Datastore | https://api.tfl.gov.uk/swagger/docs/v1 | `[fetch-ok]` | Swagger enumerou os 14 controllers. Prova de vida: `BikePoint/BikePoints_1` retornou NbBikes=1, NbEmptyDocks=17, NbEBikes=0, NbDocks=19, modified=2026-07-31T18:55:29.44Z. `Line/Mode/tube/Status` retornou 12 linhas com status reais. **Falha real: `api.tfl.gov.uk/Occupancy/CarPark` = HTTP 500.** Não verificado: `gis-tfl.opendata.arcgis.com` (SPA ArcGIS Hub); licença TfL inacessível (403 / 404) |
| segurança | data.police.uk: crime em nível de rua, outcomes, outcome history, stop-and-search para 43 forças incluindo Metropolitan Police Service. No Datastore: MPS Recorded Crime Geographic Breakdown, MPS Monthly Crime Dashboard Data (CSV+XLSX, 27/07/2026), MPS Stop and Search Dashboard Data, Police Force Strength (CSV, 29/07/2026), MPS Dedicated Ward Officer Abstractions and Strengths (XLSX, 28/07/2026) | api | LSOA 2021 no data.police.uk; borough + ward + LSOA no MPS Recorded Crime Geographic Breakdown; borough + Safer Neighbourhood Team no MPS Monthly Crime Dashboard | Mensal — datasets do MPS atualizados até dia 6 de cada mês, cobrindo o mês anterior | https://data.london.gov.uk/dataset/mps-recorded-crime-geographic-breakdown-exy3m | `[fetch-ok]` | Página confirma os três níveis "borough, ward, LSOA", CSV, mensal, OGL v2, série de abril/2010, histórico LSOA desde mar/2019, última atualização "18 dias atrás". `data.police.uk/data/`: mês mais recente = **junho/2026**, 43 forças, LSOA 2021. `data.police.uk/docs/`: API REST JSON documentada. Ressalvas: licença NÃO declarada em /data/ e /docs/; aviso de que dados pós-fev/2024 vêm do sistema CONNECT e não são comparáveis |
| educação | GCSE Results by Borough (6 XLSX com recortes por gênero, etnia, primeira língua, free school meals, SEN, disadvantaged); Schools and Pupils by Type of School, Borough; London Schools Atlas | csv/xlsx | Local Authority / borough apenas. Sem nível de escola e sem LSOA no portal da cidade | Anual, com defasagem — última atualização "4 meses atrás", dados de ago/2015 a jul/2025 | https://data.london.gov.uk/dataset/gcse-results-by-borough-20pd9/ | `[fetch-ok]` | Nível Local Authority, 6 arquivos XLSX, **OGL v3** (inconsistente com o v2 do crime), Attainment 8 e Progress 8. Fraqueza: só XLSX, sem CSV, sem API, teto em borough. **Não conseguiu abrir** `/topic/education/` (HTTP 403) — não pôde contar datasets de educação |
| comércio/economia | ABERTO: GLA High Street Boundaries (GeoPackage), GLA Town Centre Boundaries (GeoPackage), London BID Boundaries + Central Activities Zone (SHP+KML, 70 BIDs), Google Activity by Borough (CSV, arquivado), COVID-19 Restrictions Time Series (CSV), London's Economy Today (PDF+XLSX, mensal), UK House Price Index (XLSX, 27/07/2026). FECHADO: High Streets Data Service — gasto Mastercard, footfall O2, registro de premises do Local Data Company, CCTV com Alan Turing Institute *(ATENÇÃO: estas atribuições foram derrubadas pelos dois auditores — ver seção 4)* | csv/xlsx | Rua/high street individual e premises no HSDS (mas FECHADO); borough e polígono de high street/town centre no que é aberto; Londres inteira nos boletins | Mensal para London's Economy Today (modificado 30/07/2026); boundaries abertos com 7-12 meses de idade; camadas COVID arquivadas há 2-3 anos | https://data.london.gov.uk/high-street-data-service/hsds-partnership-data/ | `[fetch-ok]` | Fraqueza central: as ferramentas interativas são restritas a "London borough and Business Improvement District (BID) officers". O que resta aberto: boundaries em GeoPackage/SHP/KML com 7-12 meses + CSVs de COVID arquivados. **`/dataset/londons-economy-today/` retorna HTTP 404 — link rot** |
| saúde | Camada viva é **NACIONAL**: OHID Fingertips API com perfis Public Health Outcomes Framework (19), Local Authority Health Profiles (26), National General Practice Profiles (20), Smoking (18), Respiratory disease (29), Health Protection (30), Adult mental health and wellbeing (50), Dementia (84), Diabetes (139). No Datastore: myhealthlondon Indicators (28 indicadores, 42 CSVs), Coronavirus Weekly Update, Ward Well-Being Scores, Health Inequalities Strategy, London Healthcare Benchmarking Tool | api | Local Authority/borough e GP practice via Fingertips; borough no COVID; GP practice + borough no myhealthlondon; ward no Well-Being Scores | Fingertips ativo (mantido nacionalmente); datasets de saúde do próprio Datastore em grande parte PARADOS ou descontinuados | https://fingertips.phe.org.uk/api/profiles | `[fetch-ok]` | Fingertips retornou JSON vivo — mas é ativo do OHID/governo nacional, **não do GLA**. `myhealthlondon-indicators-exp1m`: última atualização "quase 12 anos atrás", dados param em dez/2013, indicadores descontinuados, OGL v2. `coronavirus--covid-19--cases/`: texto diz "this dataset is no longer updated", última liberação 23/03/2023. **Não conseguiu abrir** `/topic/health/` (HTTP 403) |
| finanças/orçamento | GLA Expenditure over £250 (CSV + PDF, mensal; pagamentos do GLA, GLA Land & Property Ltd e London Power Company Ltd ≥ £250 incl. VAT). Também existem GLA Grants data (v8ozm) e o tópico Transparency, **não abertos** | csv/xlsx *(rebaixado a pdf/relatório pela 2ª auditoria)* | Transação individual (pagamento a pagamento, acima de £250), por período contábil e exercício financeiro | Nominalmente mensal, mas a entrada do catálogo está abandonada | https://data.london.gov.uk/dataset/gla-expenditure/ | `[fetch-ok]` | **Pior achado do dossiê.** Confirma limiar £250, CSV e PDF, mensal, OGL v2 — mas última atualização de "quase 13 anos atrás". Arquivos correntes migraram para www.london.gov.uk, host que retornou **HTTP 403 a TODAS** as tentativas automatizadas. `www.data.gov.uk/dataset/gla-expenditure-over-250` = HTTP 404. Não existe API financeira nem de orçamento |
| urbanismo/geo | Statistical GIS Boundary Files for London (Output Area 2011; LSOA 2004/2011/2021; MSOA 2004/2011/2021; London Wards 2014 e 2018; London Boroughs; contorno da Greater London). GLA ArcGIS Server 11.4 em gis.london.gov.uk (pastas apps, basemaps, IMA, IMA_explorer, open, restricted, share, test, Utilities). Planning London Datahub e Night Time Observatory citados no portal. Hubs ArcGIS de boroughs individuais | geoserviço | Output Area, LSOA, MSOA, ward e borough | Boundaries com mais de um ano sem atualização; wards congelados em 2018 | https://gis.london.gov.uk/server/rest/services/open | `[fetch-ok]` | **O dossiê corrigiu uma pista:** o Datastore **NÃO** oferece WFS, WMS nem GeoService — só shapefiles em ZIP, OGL v2, "mais de um ano atrás". ArcGIS Server 11.4 vivo, mas a pasta `/open` contém **exatamente UM serviço** (open/Population_Projections_2020, MapServer), ao lado de uma pasta `restricted`. Redirect 308 de gis2 → gis.london.gov.uk |

### Domínios ADICIONADOS pelas auditorias (ausentes do dossiê original)

| Domínio | Datasets | Tipo de acesso | Granularidade | Atualização | URL | Status verified | Evidência curta |
|---|---|---|---|---|---|---|---|
| meio-ambiente *(adicionado pelas 2 auditorias)* | London Atmospheric Emissions Inventory (LAEI) 2022 — NOx, PM10, PM2.5, CO2 (+SO2, CH4, VOC na 2ª auditoria) por tipo de fonte, anos 2016/2019/2022 e projeções 2025/2030; Grid Emissions Summary; Detailed Road Transport; concentrações modeladas; LAEI 2022 Borough Air Quality Data for LLAQM; LAEI 2019 (superseded, ago/2025); LEGGI | csv/xlsx (download em massa; **sem API, sem WFS/WMS**) | **A melhor do portal:** grid de 1 km para emissões, grid de **20 METROS** para concentrações, nível de LINK VIÁRIO para vias principais, recorte por borough. Cobertura: 32 boroughs + City of London até a M25 | Vivo: base 2022, revisão publicada em **maio/2026** corrigindo discrepâncias da atualização de dez/2025; página modificada há ~2 meses | 1ª auditoria: https://data.london.gov.uk/dataset/london-atmospheric-emissions-inventory--laei--2022 / 2ª auditoria: https://data.london.gov.uk/dataset/london-atmospheric-emissions-inventory-laei-2022-2lg5g | `[fetch-ok]` (nas duas auditorias) | Ativo **próprio do GLA**, recente, legível por máquina. Formatos Excel, GIS ESRI shapefile, GeoPackage, CSV, ASCII, PDF/JPG em ZIP. **Nenhuma licença declarada na página** — agrava o mosaico de licenciamento |
| social/habitação *(adicionado pelas 2 auditorias)* | Rough sleeping in London (CHAIN reports) — boletins e relatórios, ferramentas interativas trimestrais/anuais, ZIPs por borough. 2ª auditoria acrescenta: GLA Affordable Housing Programme Outturn (abr/2009 a **março/2026**), DCLG/MHCLG Affordable Housing Supply by Borough desde 1991/92, Residential Completions Dashboard, Housing in London, UK House Price Index (reclassificado de comércio para habitação) | 1ª auditoria: pdf/relatório · 2ª auditoria: csv/xlsx | Greater London agregado e borough individual. **Não desce a ward nem LSOA** | CHAIN trimestral e vivo — 1ª auditoria: atualizado ~11 HORAS antes do fetch, cobrindo Q1 2026-27 (abr-jun/2026); 2ª auditoria: "há 1 dia". Affordable Housing Outturn anual, ~3 meses | https://data.london.gov.uk/dataset/chain-reports (1ª) · https://data.london.gov.uk/dataset/gla-affordable-housing-programme-outturn-2o8xd (2ª) | `[fetch-ok]` (nas duas auditorias) | Vivo mas de baixa maquinabilidade: PDF + ODS (+XLSX) + ZIP + ferramentas interativas, **sem CSV e sem API**. Achado de licença novo: **CC BY-SA 4.0** — terceira/quarta família de licença no portal |

---

## 2. Bloco técnico

| Item | Valor reportado pelo dossiê original | Valor após auditorias |
|---|---|---|
| **Plataforma do portal** | **DataPress** ("DataPress Local Government CMS" no rodapé de data.london.gov.uk). O dossiê **corrige a pista recebida**: NÃO é CKAN nativo nem OpenDataSoft. Expõe camada de compatibilidade CKAN **parcial** em `/api/3/action/`. Camada de descoberta separada e mais nova: Data for London Library (dfl.london.gov.uk, beta desde 2025, SPA client-side). Mobilidade em Azure API Management (api-portal.tfl.gov.uk) + ArcGIS Hub. Criminalidade em data.police.uk. Geo em ArcGIS Server 11.4 (gis.london.gov.uk) | Correção **confirmada** pelas duas auditorias (não é CKAN, não é OpenDataSoft, não é Socrata) |
| **Nº de datasets observado** | **1301**, visto em `result.count` de `https://data.london.gov.uk/api/3/action/package_search?rows=0` (31/07/2026). Home diz "over a thousand datasets". **Discrepância não resolvida:** material do GLA/re3data fala em "more than 6.000 datasets" e a Data for London Library alega "5.000+" — **nenhum dos dois verificado** (dfl renderiza no cliente). `package_list` retorna ~1000 slugs opacos, inconsistente com 1301 | 1301 reproduzido **duas vezes** pela 1ª auditoria e **independentemente** pela 2ª. As discrepâncias 6.000 / 5.000+ seguem INVERIFICÁVEIS. "Trate 1301 como o único número defensável" (2ª auditoria) |
| **Tem API documentada** | **sim** | sim |
| **Download em massa** | **sim** | sim |
| **Geoserviços** | **sim** | sim (com ressalva dura: o GLA publica UM único geoserviço aberto; os reais vêm da TfL e dos boroughs) |
| **Tempo real** | **sim** | sim (BikePoint devolveu 2026-08-01T16:39:46Z na 2ª auditoria, valores diferentes do snapshot do analista — prova de movimentação real, não cache) |
| **Licença** | Mosaico inconsistente, **sem declaração única** para o portal: OGL v2 em MPS Recorded Crime, GLA Expenditure, Statistical GIS Boundary Files e myhealthlondon; OGL v3 em GCSE Results by Borough; TfL usa termos próprios de transport data, NÃO OGL (e **não conseguiu abrir** esses termos: 403 e 404); data.police.uk não declara licença em /data/ e /docs/ | **Pior que o relatado.** 1ª auditoria: + CC BY-SA 4.0 no CHAIN (terceira família) e LAEI sem licença declarada; + atribuição Crown copyright/Ordnance Survey exigida nos boundaries. 2ª auditoria: **cinco regimes distintos**, com o share-alike do CHAIN "juridicamente incompatível com OGL" e dois casos de licença ausente (data.police.uk e LAEI 2022) |
| **Share legível por máquina** | ~80% na amostra observada, com cultura **Excel-first**, não CSV/API-first. Nos 10 datasets mais recentes: PDF/ODS/XLSX/ZIP, PDF/XLSX, XLSX, XLSX+CSV, PDF/ODS, CSV, XLSX, XLSX, **PNG** e CSV+XLSX — 8 de 10 com ao menos um formato legível; 1 caso (HSDS Map) só como PNG, que não é dado aberto. Educação é XLSX puro | Sustentado, mas empurrado para baixo (CHAIN, o dataset mais fresco, é PDF/ODS/ZIP sem CSV nem API) e para cima (LAEI oferece CSV/ASCII/GeoPackage). 2ª auditoria adiciona ressalva metodológica: **os "80%" vêm de amostra de 10 datasets, não de censo, e não são extrapoláveis para os 1301** |

---

## 3. Fraquezas da cidade (obrigatório)

Transcritas do dossiê original (linha 11 do journal):

1. **Finanças é o domínio mais fraco:** "GLA Expenditure over £250" reporta última atualização de quase 13 anos atrás. Está abandonada. Não existe API financeira nem de orçamento.
2. Os arquivos financeiros correntes migraram para www.london.gov.uk, host que retornou **HTTP 403 a TODAS** as tentativas automatizadas. Os dados de gasto de Londres não são harvestáveis nem auditáveis por máquina.
3. **Saúde no portal da cidade é arquivologia:** myhealthlondon com quase 12 anos sem atualização (dados param em dez/2013); COVID formalmente encerrado em 23/03/2023, com o próprio texto mandando o usuário para a UKHSA. A saúde viva depende da API **nacional** do OHID Fingertips.
4. A API compatível com CKAN **ignora silenciosamente parâmetros**: `package_search` com `q=school` e `q=health` devolveu a mesma lista default de 10 datasets e manteve `count=1301`; `rows=` e `sort=` também ignorados. Ignorar em silêncio é pior que dar erro.
5. Métodos CKAN centrais mortos: `/api/3/action/group_list` = **HTTP 410 Gone**; `package_show?id=` = **HTTP 404**. A compatibilidade CKAN é só aparente.
6. Superfícies HTML de descoberta bloqueiam robôs: `/dataset/`, `/topic/health/` e `/topic/education/` todas retornaram **HTTP 403**. Só páginas de dataset individuais abrem.
7. A Data for London Library (dfl.london.gov.uk) é **100% renderizada no cliente**: `/`, `/library` e `/c/how-to-contribute` devolveram APENAS o título. Sua manchete de "5.000+ datasets" é inverificável. Beta desde 2025.
8. Contagem de datasets inconsistente entre canais oficiais: 1301 na API, "over a thousand" na home, "more than 6.000" no GLA/re3data, "5.000+" na Library. **Não existe cifra autoritativa única.**
9. **O dado econômico urbano mais rico de Londres é fechado:** o High Streets Data Service é restrito por contrato de fornecedor a boroughs e BIDs. Sobram boundaries com 7-12 meses e CSVs de COVID arquivados.
10. A publicação de geoserviços abertos pelo próprio GLA é mínima: `/open` do ArcGIS Server 11.4 expõe **UM único serviço**, ao lado de uma pasta `restricted`. Boundaries sem WFS nem WMS.
11. Cultura **Excel-first** em vez de CSV/API-first; educação é XLSX puro; HSDS Map publicado apenas como PNG — imagem não é dado aberto.
12. Licenciamento incoerente: OGL v2 nos antigos, OGL v3 nos novos, termos próprios não-OGL na TfL (inacessíveis) e nenhuma licença no data.police.uk.
13. Teto de granularidade em educação: apenas borough, sem escola e sem LSOA, defasagem de ~4 meses, dados só até jul/2025.
14. Quebra de comparabilidade na série criminal: MPS migrou para o sistema CONNECT em fev/2024; histórico LSOA só começa em mar/2019; MPS Monthly Crime Dashboard mistura borough e Safer Neighbourhood Team com risco declarado de dupla contagem.
15. Links e endpoints quebrados achados em poucos minutos: `/dataset/londons-economy-today/` = 404; `api.tfl.gov.uk/Occupancy/CarPark` = **500** (endpoint documentado no swagger); `api-portal.tfl.gov.uk/terms` = 404; `www.data.gov.uk/dataset/gla-expenditure-over-250` = 404.
16. **Sinal de retrocesso em dados abertos:** o GLA declara que a partir de out/2025 a GiGL deixou de fornecer certos datasets como Open Data e que o Datastore está "currently reviewing its approach to publishing open data".
17. Higiene fraca na camada WordPress: URLs de busca do próprio domínio com query strings de spam em língua estrangeira — poluição SEO não contida.

### Fraquezas adicionais levantadas pelas auditorias

18. **(2ª auditoria — achado novo, mais grave que qualquer link rot)** O **Planning London Datahub**, listado pelo dossiê como ativo de urbanismo, **não está publicado**: `https://planningdata.london.gov.uk/` serve a **página padrão não configurada do NGINX** ("Further configuration is required"). Zero dado, zero API. A ficha em data.london.gov.uk retorna 403.
19. **(1ª e 2ª auditorias)** Série criminal tem **duas** quebras de comparabilidade, não uma: CONNECT (fev/2024) **e** reclassificação de Burglary em abr/2017 (de domestic/non-domestic para residential/business-and-community).
20. **(1ª auditoria)** **Sexual Offences NÃO são fornecidos em nível LSOA** por proteção de dados — a granularidade LSOA não é uniforme entre categorias de crime.
21. **(2ª auditoria)** MPS Recorded Crime tem **205 arquivos CSV** e os correntes cobrem uma **janela rolante de 24 meses** — o histórico desde 2010 não está integralmente nos arquivos correntes.
22. **(2ª auditoria)** **Slugs opacos e não adivinháveis** no DataPress (exigem sufixo hash: `laei-2022-2lg5g`, `exy3m`, `20pd9`); o slug limpo retorna 404, quebrando citação estável.
23. **(2ª auditoria)** A busca facetada **não dá 403, dá 410 GONE** — desativação deliberada, não bloqueio antibot.
24. **(1ª e 2ª auditorias) Fraqueza do próprio dossiê, não da cidade:** meio-ambiente e social/habitação foram **omitidos** da tabela original. Qualquer régua construída sobre o dossiê original subestimaria Londres em dois domínios.

---

## 4. Correções do auditor

**Duas auditorias independentes de Londres constam do journal, com veredito de credibilidade DIFERENTE.** Ambas estão registradas abaixo, sem promoção nem harmonização.

### 4.1 Auditoria A — agente `auditoria-a` (journal linha 24)

- **Veredito de credibilidade: `solido`**
- **URLs rechecadas: 23**
- URLs quebradas encontradas:
  - `https://api.tfl.gov.uk/Occupancy/CarPark` — HTTP 500 Internal Server Error (endpoint documentado no swagger; falha CONFIRMADA e persistente, não transitória)
  - `https://data.london.gov.uk/api/3/action/group_list` — HTTP 410 Gone (método central do CKAN morto)
  - `https://data.london.gov.uk/dataset/londons-economy-today/` — HTTP 404 (link rot confirmado)
  - `https://data.london.gov.uk/topic/health/` — HTTP 403 Forbidden
  - `https://data.london.gov.uk/dataset/planning-london-datahub` — HTTP 403 Forbidden (**achado NOVO** desta auditoria)
  - `https://data.london.gov.uk/dataset/london-atmospheric-emissions-inventory-laei-2022` — HTTP 404 (variante de slug com hífen simples; o real usa hífen duplo `--laei--2022`)

**Correções, uma a uma:**

1. **OMISSÃO DE DOMÍNIO (correção mais importante):** o dossiê NÃO tinha meio-ambiente. Verificado o LAEI 2022 — existe, atualizado há ~2 meses (aprox. maio/2026), mantido pelo GLA Air Quality Team, Excel/ESRI shapefile/GeoPackage/CSV/ASCII, grid de 1 km para emissões e grid de **20 metros** para concentrações, cobrindo 32 boroughs + City of London até a M25. Existe também o LAEI 2019 (ago/2025, superseded). **Domínio ADICIONADO.**
2. **CONSEQUÊNCIA TEÓRICA:** ~~a tese central do dossiê de que "a camada viva de Londres é federada e não propriedade da cidade"~~ fica **PARCIALMENTE REFUTADA**. Em meio-ambiente o ativo vivo, recente, legível por máquina e com a melhor granularidade espacial do portal é **do próprio GLA**. ~~"DOIS PILARES realmente de classe mundial"~~ → **TRÊS pilares** (mobilidade, segurança, meio-ambiente).
3. **OMISSÃO E INCONSISTÊNCIA INTERNA:** social/habitação não estava na tabela, embora o analista citasse o CHAIN no `overall_assessment` como prova de vida. Verificado: rough sleeping, atualizado ~11 h antes do fetch, Q1 2026-27, Greater London + borough, trimestral/anual. **Domínio ADICIONADO, mas REBAIXADO no formato:** PDF + ODS + ZIP, **sem CSV e sem API**.
4. **ACHADO DE LICENÇA NOVO:** o CHAIN é **CC BY-SA 4.0** — terceira família, nem OGL v2 nem v3. E o LAEI 2019 e 2022 **não declaram licença** nas páginas abertas.
5. **REBAIXAMENTO DE EVIDÊNCIA (HSDS):** a página confirma o gating a "London borough and Business Improvement District (BID) officers who are subscribed", mas ~~não menciona Mastercard, O2 nem Local Data Company~~ — na verdade **não menciona** esses fornecedores; nomeia apenas as categorias Spend, Mobility e Business Premises. Os números ~~"24 boroughs"~~, ~~"600+ high streets"~~, ~~"200 town centres"~~, ~~"6 anos deflacionado"~~ e ~~"2,5 anos"~~ **também não constam**. Apresentados com força de fetch que não possuem → **marcados como não verificados**.
6. **REBAIXAMENTO DE CITAÇÃO:** ~~a frase entre aspas "the terms of our current tenders with our data providers only allow us to share the below interactive tools with London borough and Business Improvement District (BID) officers"~~ **não corresponde ao texto obtido no recheck**. A substância (gating) é verdadeira; a citação deve ser tratada como **paráfrase, não transcrição literal**. *(NOTA DO TRANSCRITOR: a Auditoria B, um dia depois, confirmou essa mesma citação como LITERAL e exata. As duas auditorias divergem neste ponto — registrado sem resolução.)*
7. **CORREÇÃO FACTUAL:** ~~a Greater London tem 33 boroughs~~ → são **32 London boroughs MAIS a City of London Corporation**, que não é borough. Confirmado textualmente na página do LAEI 2022 ("the 32 London boroughs plus City of London").
8. **CORREÇÃO/ATENUAÇÃO EM GEO:** ~~"wards apenas 2014/2018"~~ e ~~"sem refresh de ward/OA 2021"~~ → wards existem em **2011, 2014 E 2018**, e **LSOA e MSOA já têm vintage 2021**. O buraco censitário de 2021 restringe-se a Output Area (2011) e wards (2018) — mais estreito do que o dossiê afirmava.
9. **CORREÇÃO DE PRECISÃO EM EDUCAÇÃO:** ~~a cobertura "ago/2015 a jul/2025" vale para todos os 6 arquivos de GCSE~~ → **dois deles começam apenas em ago/2022**; a série longa não cobre todos os recortes socioeconômicos.
10. **AGRAVANTE NÃO VISTO (segurança):** existem **DUAS** quebras de comparabilidade, não uma — além do CONNECT (fev/2024), a classificação de Burglary mudou em abr/2017.
11. **AGRAVANTE NÃO VISTO (segurança):** Sexual Offences **não** são fornecidos em nível LSOA por proteção de dados. A "granularidade LSOA" confirmada **não é uniforme** entre categorias de crime.
12. **AGRAVANTE EM GEO:** os Statistical GIS Boundary Files exigem atribuição **Crown copyright / Ordnance Survey** adicionalmente ao OGL v2 — condição de reuso não registrada pelo dossiê.
13. **NÃO VERIFICÁVEL, marcado como tal:** `https://data.london.gov.uk/dataset/planning-london-datahub` retornou HTTP 403. O Planning London Datahub **não pode ser confirmado por fetch**.
14. **MANTIDO SEM ALTERAÇÃO** (resistiu integralmente): os 14 controllers do swagger da TfL; `count=1301`; borough/ward/LSOA + OGL v2 no MPS Recorded Crime; 6 XLSX + OGL v3 + sem API no GCSE; £250 + CSV/PDF + OGL v2 + "almost 13 years ago" no GLA Expenditure; serviço ÚNICO (Population_Projections_2020) na pasta `/open`; os NOVE ids de perfil do Fingertips; junho/2026 + 43 forças + LSOA 2021 + sem licença no data.police.uk; myhealthlondon com ~12 anos e indicadores descontinuados; COVID encerrado em 23/03/2023; ausência de WFS/WMS nos boundaries. **Nenhum exagero detectado nesses pontos.**
15. **VALIDAÇÃO DO PIOR BUG POR REPRODUÇÃO INDEPENDENTE:** `package_search?q=housing` devolveu `count=1301` (idêntico a `rows=0`) e a MESMA lista default de 10 datasets por recência, nada específico de habitação. `group_list` segue HTTP 410 Gone.
16. **LIÇÃO DE MÉTODO ADICIONADA:** frescor **não** implica maquinabilidade neste portal. Acrescentado um sexto eixo à régua: **(f) de quem é o ativo** — cidade, governo nacional ou fornecedor privado.

### 4.2 Auditoria B — agente `auditoria-b` (journal linha 40)

- **Veredito de credibilidade: `exagerado-corrigido`**
- **URLs rechecadas: 25**
- URLs quebradas encontradas:
  - `https://planningdata.london.gov.uk/` — responde HTTP 200 mas serve a **PÁGINA PADRÃO NÃO CONFIGURADA DO NGINX** ("If you see this page, the nginx web server is successfully installed and working. Further configuration is required"). Funcionalmente morto: zero dado, zero API. **Achado novo, não registrado no dossiê.**
  - `https://data.london.gov.uk/dataset/planning-london-datahub` — HTTP 403
  - `https://api.tfl.gov.uk/Occupancy/CarPark` — HTTP 500, reconfirmado em leitura independente um dia depois: quebra **persistente**, não intermitente
  - `https://data.london.gov.uk/api/3/action/group_list` — HTTP 410 Gone
  - `https://data.london.gov.uk/dataset?q=laei` — **HTTP 410 Gone** (o dossiê havia reportado 403; o código real é 410)
  - `https://data.london.gov.uk/dataset/london-atmospheric-emissions-inventory-laei-2022` — HTTP 404 (slug sem sufixo hash não resolve; o válido é `...-2lg5g`)
  - `https://data.london.gov.uk/dataset/london-plan-aiming-for-housing-monitor` — HTTP 404
  - `https://data.london.gov.uk/dataset/londons-economy-today/` — HTTP 404 (mantido do dossiê)
  - `https://api-portal.tfl.gov.uk/terms` — HTTP 404 (mantido)
  - `https://www.data.gov.uk/dataset/gla-expenditure-over-250` — HTTP 404 (mantido)
  - `www.london.gov.uk` e `london.gov.uk` (`/who-we-are/governance-and-spending/...`, `/sharing-our-information/spending-over-250`, `media/111268/download`) — **HTTP 403 a clientes automatizados** (mantido do dossiê, **não retestado nesta rodada**)

**Correções, uma a uma:**

1. **EXAGERO POR ATRIBUIÇÃO NÃO SUSTENTADA (o mais grave do dossiê):** no HSDS o dossiê atribui fornecedores e escopos nominais — ~~gasto Mastercard "6 anos, deflacionado, por setor"~~, ~~footfall/mobilidade O2 "2,5 anos, nível de rua, residentes/trabalhadores/visitantes"~~, ~~registro de premises do Local Data Company com vacancy verificada em campo~~, ~~CCTV com Alan Turing Institute~~, ~~"600+ high streets e 200 town centres"~~. **NENHUM** desses nomes, prazos ou contagens aparece na página citada como evidência; ela nomeia apenas as categorias Spend, Mobility e Business Premises. **Rebaixado a NÃO VERIFICADO.** A conclusão de que o dado é fechado por contrato sobrevive intacta e literal.
2. **CONTAGEM ERRADA NO HSDS:** ~~"os três dashboards (HSDS Hub, Map Explorer, Data Explorer)"~~ → são **QUATRO** ferramentas gated; inclui também a **HSDS London Vacancy Register** (ligada a High Street Rental Auctions), omitida.
3. **NÚMERO SEM FONTE:** ~~"a adesão é restrita a 24 boroughs + BIDs"~~ → a página não declara número algum de boroughs. **O "24" é NÃO VERIFICADO e foi removido.**
4. **SUBESTIMAÇÃO GRAVE — domínio meio-ambiente inteiramente omitido:** ~~o dossiê tratou qualidade do ar apenas como um controller da API da TfL~~ e ~~concluiu que Londres tem "DOIS PILARES de classe mundial"~~. Verificado o LAEI 2022 — versão CORRENTE, revisada em **maio/2026** (corrigindo discrepâncias de dez/2025), grid de 1 km, concentrações em grid de **20 metros**, nível de LINK VIÁRIO, recorte por borough (LLAQM), em Excel/GIS ESRI/CSV/ASCII; mais LEGGI e página temática dedicada. **Londres tem TRÊS pilares de classe mundial, não dois.**
5. **SUBESTIMAÇÃO — domínio habitação omitido:** o dossiê citou o CHAIN só como prova de vida, sem inventariá-lo. Verificado: CHAIN atualizado **há 1 dia**, trimestral, borough + London-wide; GLA Affordable Housing Programme Outturn abr/2009 a **março/2026**, nível Local Authority, atualizado há 3 meses; mais DCLG Affordable Housing Supply desde 1991/92 e Residential Completions Dashboard. **Domínio adicionado**, com suas fraquezas reais (sem CSV, sem API, PDF-first no CHAIN).
6. **ACHADO NOVO PIOR QUE OS DO DOSSIÊ — serviço carro-chefe abandonado:** ~~"Planning London Datahub" como ativo existente de urbanismo~~ → o host público serve a **página padrão não configurada do NGINX**; servidor de pé, zero dado, zero API; a ficha retorna 403. "Não é link rot: é um serviço de dados de planejamento em estado de instalação de fábrica."
7. **REBAIXAMENTO DE `access_type` EM FINANÇAS:** ~~finanças/orçamento classificado como "csv/xlsx"~~ → **reclassificado como "pdf/relatório"**. Nenhum CSV corrente foi aberto por ninguém nesta cadeia (todos os hosts respondem 403) e a ficha do catálogo não lista arquivo algum.
8. **CORREÇÃO FACTUAL NO LIMIAR DE GASTO:** ~~"limiar reduzido de £1.000 para £250 em junho de 2012"~~ → a página descreve **TRÊS degraus**: "From summer 2010 the reporting threshold was reduced to 500 (including VAT) and from June 2012 the threshold has been reduced to 250". **O degrau de £500 foi suprimido pelo dossiê.**
9. **CÓDIGO HTTP ERRADO NA BUSCA FACETADA:** ~~"/dataset/ retorna HTTP 403 (bloqueio a cliente automatizado)"~~ → `https://data.london.gov.uk/dataset?q=laei` retornou **HTTP 410 GONE**. Mesmo efeito prático, mas 410 é remoção permanente deliberada, não bloqueio antibot — "leitura diferente e mais grave da intenção do publicador".
10. **MOSAICO DE LICENÇAS PIOR (dois achados novos):** ~~o dossiê lista quatro regimes~~ → são **CINCO**. Novo: CHAIN em **CC BY-SA 4.0**, share-alike "juridicamente incompatível com OGL". Novo: a página do **LAEI 2022 não declara licença alguma** — segundo caso de licença ausente, ao lado do data.police.uk.
11. **CORREÇÃO NA POPULAÇÃO:** ~~"33 boroughs"~~ → "32 London boroughs and the City of London" (fórmula oficial confirmada na documentação do LAEI). **Mantido o aviso de que a demografia segue NÃO VERIFICADA** — a auditoria também não a checou no ONS.
12. **AJUSTE NOS BOUNDARIES:** ~~"London Wards 2014 e 2018"~~ → a página inclui **também wards 2011**. Confirmada a ausência de WFS/WMS/GeoService/GeoJSON e a atribuição de copyright ainda datada de **2015**.
13. **DEFASAGEM DE EDUCAÇÃO SUBESTIMADA:** ~~"última atualização 4 meses atrás"~~ → a página reporta **5 MESES**. Detalhe novo: alguns dos 6 XLSX começam apenas em ago/2022, portanto a cobertura de 10 anos **não vale para todos os recortes**.
14. **DETALHE OMITIDO QUE AGRAVA A SÉRIE CRIMINAL:** MPS Recorded Crime tem **205 arquivos CSV** e os correntes cobrem **janela rolante de 24 meses**. Também: o histórico de **ward** começa em abr/2010 (o dossiê atribuiu essa data só a borough).
15. **SUBESTIMAÇÃO MENOR EM SAÚDE:** ~~o dossiê lista 9 perfis do Fingertips~~ → a API retorna **31 perfis** no total; ele listou 9 de 31. A ressalva estrutural (é ativo do OHID, não do GLA) permanece correta.
16. **ACHADO NOVO DE HARVESTING:** os slugs do DataPress exigem **sufixo hash opaco**; `.../london-atmospheric-emissions-inventory-laei-2022` retorna 404 e só resolve com `-2lg5g`. Quebra citação estável.
17. **PROVA NOVA A FAVOR DE UMA WEAKNESS DO DOSSIÊ:** no mesmo request de `package_search?rows=0` a API devolveu **10 datasets apesar de rows=0**; e `q=school` devolveu `count=1301` com a mesma lista default, nenhum sobre escolas.
18. **CONFIRMAÇÕES QUE NÃO EXIGIRAM CORREÇÃO (crédito ao analista):** 14 controllers da TfL exatos; nove ids do Fingertips exatos nome por nome; "borough, ward, LSOA" textual no MPS; `count=1301` reproduzido; `/open` com UM serviço e ArcGIS 11.4; GLA Expenditure "almost 13 years ago"; myhealthlondon "almost 12 years ago" com 42 CSVs e 28 indicadores; data.police.uk junho/2026 + 43 forças + sem licença; **citação literal do gating do HSDS confirmada como exata**; `group_list` = 410; dfl.london.gov.uk/library devolvendo só o título; `Occupancy/CarPark` = 500 em segunda leitura; boundaries sem WFS/WMS; DataPress e não CKAN/OpenDataSoft. Prova de vida **reforçada**: BikePoint devolveu 2026-08-01T16:39:46Z com NbBikes=16 (12 mecânicas + 4 elétricas), NbEmptyDocks=1, NbDocks=19 — valores diferentes do snapshot do analista.

### 4.3 Divergência entre as duas auditorias (registrada, não resolvida)

| Ponto | Auditoria A (`solido`) | Auditoria B (`exagerado-corrigido`) |
|---|---|---|
| Citação literal do gating do HSDS | **Não corresponde** ao texto obtido; tratar como paráfrase | **Confirmada ao pé da letra** como exata |
| Nº de ferramentas gated no HSDS | não reportado (aceita "três dashboards" ao descrever) | **Quatro** (inclui HSDS London Vacancy Register) |
| Defasagem de educação | "4 meses" mantido | **5 meses** |
| Nº de regimes de licença | terceira família (CC BY-SA) → mosaico agravado | **cinco regimes** |
| Planning London Datahub | não verificável (403) | **host servindo página padrão do NGINX** |
| Código da busca facetada | 403 (mantido do dossiê) | **410 Gone** |
| Veredito final | **solido** | **exagerado-corrigido** |

---

## 5. O que não foi verificado, e por quê (transcrito)

- **Demografia:** não verificada por fetch nem pelo analista nem por nenhuma das duas auditorias (orçamento de WebSearch esgotado em 200/200 nas duas rodadas). Permanece NÃO VERIFICADA.
- `gis-tfl.opendata.arcgis.com` — SPA ArcGIS Hub, devolveu somente o cabeçalho. **Não verificado.**
- Termos de licença da TfL — `tfl.gov.uk/info-for/open-data-users/our-open-data` = 403; `api-portal.tfl.gov.uk/terms` = 404. **Inacessíveis.**
- Contagem de datasets por domínio — impossível: `/topic/health/` e `/topic/education/` = 403.
- "more than 6.000 datasets" (GLA/re3data) e "5.000+" (Data for London Library) — **inverificáveis**, dfl.london.gov.uk não renderiza sem JS.
- `package_list` com ~1000 slugs opacos vs. 1301 do `package_search` — pendência aberta, **não reauditada**.
- Sinal de retrocesso da GiGL (out/2025) e poluição SEO no WordPress — a Auditoria A marca explicitamente como **NÃO REVERIFICADO nesta auditoria; tratar como pendente**.
- GLA Grants data e o tópico Transparency — **não abertos** nem pelo analista nem pelas auditorias.
