# regiao:sp — Regiao SUDESTE - estado de SAO PAULO

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:sp

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
| 1 | `execucao-1` | 22 | 10 | 42 |
| 2 | `execucao-2` | 36 | 8 | 26 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 22)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| São Paulo (capital)/SP | outro | Portal de Dados Abertos da Cidade de Sao Paulo (CKAN) - pagina inicial | `http://dados.prefeitura.sp.gov.br/` | portal-dados-abertos | varia (municipio, distrito, equipamento/unidade) | continua | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | CKAN API - group_list (contagem de datasets por dominio) | `http://dados.prefeitura.sp.gov.br/api/3/action/group_list?all_fields=true` | api | catalogo | continua | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | CKAN API - package_search com facetas de formato (prova de acesso realmente aberto) | `http://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=&rows=0&facet.field=[%22res_format%22]&facet.limit=30` | api | catalogo | continua | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | GeoSampa - geoservico WFS (GetCapabilities) | `http://wfs.geosampa.prefeitura.sp.gov.br/geoserver/wfs?request=GetCapabilities` | geoservico | distrito/bairro e equipamento/unidade | continua (servico ativo) | `[fetch-ok]` |
| São Paulo (capital)/SP | mobilidade/transito | GeoSampa - geoservico WMS (inclui camada de acidentes da CET) | `http://wms.geosampa.prefeitura.sp.gov.br/geoserver/geoportal/wms?service=WMS&version=1.3.0&request=GetCapabilities` | geoservico | ponto georreferenciado | continua (servico ativo) | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | GeoSampa - portal web (Mapa Digital da Cidade) | `https://geosampa.prefeitura.sp.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-falhou]` |
| São Paulo (capital)/SP | mobilidade/transito | SPTrans - API Olho Vivo, guia de referencia / documentacao | `https://sptrans.com.br/desenvolvedores/api-do-olho-vivo-guia-de-referencia/documentacao-api/` | api | veiculo, linha e parada (lat/long) | tempo real | `[fetch-ok]` |
| São Paulo (capital)/SP | mobilidade/transito | SPTrans - pagina de desenvolvedores (API Olho Vivo + GTFS) | `https://www.sptrans.com.br/desenvolvedores/` | csv/xlsx | linha/parada/itinerario | GTFS periodico; API tempo real | `[fetch-ok]` |
| São Paulo (capital)/SP | mobilidade/transito | CET - bases de transito no portal de dados abertos (Ciclovias, Fiscalizacao Eletronica, Lentidao 2001-2023) | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=transito+OR+CET+OR+ciclovia&rows=8` | csv/xlsx | trecho de via / equipamento | anual/periodica | `[fetch-ok]` |
| São Paulo (capital)/SP | educacao | SME - Perfil das turmas e unidades educacionais em funcionamento (e demais bases da SME) | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=turmas&rows=5` | csv/xlsx | unidade educacional / turma | atualizacao ativa (jul/2026) | `[fetch-ok]` |
| São Paulo (capital)/SP | saude | TABNET - Secretaria Municipal da Saude de Sao Paulo (tabulador DATASUS municipal) **[NACIONAL — não pontua]** | `https://prefeitura.sp.gov.br/web/saude/w/tabnet/296871` | painel/dashboard | nao confirmado na pagina (busca sugere Distrito Administrativo/Subprefeitura/STS/CRS, mas a pagina aberta nao confirmou) | desconhecido | `[fetch-ok]` |
| São Paulo (capital)/SP | saude | Saude - SMS no portal de dados abertos (organizacao completa: 7 conjuntos) | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=organization:sms&rows=10` | api | administrativo (nao epidemiologico) | modificados em 03/07/2026 | `[fetch-ok]` |
| São Paulo (capital)/SP | social | SP156 - solicitacoes de servico e avaliacoes dos canais digitais (SMIT) | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=SP156&rows=5` | csv/xlsx | registro individual de solicitacao | trimestral (ate 2026-T2) | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | Observa Sampa - Observatorio de Indicadores da Cidade de Sao Paulo | `https://observasampa.prefeitura.sp.gov.br/` | painel/dashboard | distrito e subprefeitura | desconhecido | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | Observa Sampa - pagina de Dados Abertos (download de indicadores) | `https://observasampa.prefeitura.sp.gov.br/index.php?page=dadosabertos` | csv/xlsx | distrito e/ou subprefeitura, com serie historica | desconhecido | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | Indicadores da Cidade de Sao Paulo (copia do Observa Sampa no CKAN) - DESCONTINUADA | `https://dados.prefeitura.sp.gov.br/dataset/indicadores-da-cidade-de-sao-paulo` | csv/xlsx | subprefeitura e distrito | PARADA desde 2016 | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | URBIS Dados Abertos (novo portal CKAN da SMUL) - quase vazio | `https://dadosabertos.urbis.prefeitura.sp.gov.br/` | portal-dados-abertos | desconhecido | em implantacao | `[fetch-ok]` |
| São Paulo (capital)/SP | financas/orcamento | Portal da Transparencia do Municipio de Sao Paulo - secao Dados Abertos | `https://transparencia.prefeitura.sp.gov.br/dados-abertos/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| São Paulo (capital)/SP | outro | Observa Sampa - endpoint de API v1 front_end | `https://api.observasampa.prefeitura.sp.gov.br/v1/front_end/indicadores` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP | mobilidade/transito | Sinistros (Infosiga) - Eventos, Vitimas e Veiculos em sinistros de transito, DETRAN-SP | `https://dadosabertos.sp.gov.br/dataset/sinistros-infosiga` | csv/xlsx | registro individual georreferenciado (latitude/longitude) agregavel por municipio | mensal | `[fetch-ok]` |
| Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP | outro | Portal de Dados Abertos do Estado de Sao Paulo - CKAN API organization_list | `https://dadosabertos.sp.gov.br/api/3/action/organization_list?all_fields=true&limit=60` | api | catalogo | continua | `[fetch-ok]` |
| Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP | outro | Portal de Dados Abertos do Estado de SP - facetas de formato via package_search | `https://dadosabertos.sp.gov.br/api/3/action/package_search?q=&rows=0&facet.field=[%22res_format%22]&facet.limit=20` | api | catalogo | continua | `[fetch-ok]` |
| Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP | outro | Seade Repositorio - Fundacao Sistema Estadual de Analise de Dados | `https://repositorio.seade.gov.br/` | portal-dados-abertos | nao confirmado na pagina inicial (produtos Seade sao tipicamente municipais) | desconhecido | `[fetch-ok]` |
| Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP | seguranca | SSP-SP - Estatisticas / Consultas (bases criminais em XLSX por municipio e delegacia) | `https://www.ssp.sp.gov.br/estatistica/consultas` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Campinas/SP | meio-ambiente | GeoAmbiental Campinas - WebGIS da Secretaria do Verde, Meio Ambiente e Desenvolvimento Sustentavel | `https://geoambiental.campinas.sp.gov.br/` | painel/dashboard | ponto/area georreferenciada | desconhecido | `[fetch-ok]` |
| Campinas/SP | outro | Campinas - pagina oficial 'Dados Abertos' (Secretaria de Gestao e Controle) | `https://campinas.sp.gov.br/secretaria/gestao-e-controle/pagina/dados-abertos` | portal-dados-abertos | nenhuma (sem catalogo) | desconhecido | `[fetch-ok]` |
| Campinas/SP | urbanismo/geo | Campinas SEPLURB - Dados do Municipio | `https://www.campinas.sp.gov.br/governo/seplurb/dados-do-municipio/` | desconhecido | referencia a equipamentos por bairro (lista de 47+ centros de saude por bairro) | desconhecido | `[fetch-ok]` |
| Campinas/SP | financas/orcamento | Portal da Transparencia de Campinas - secao Dados Abertos | `https://transparencia.campinas.sp.gov.br/index.php?action=dadosabertos` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Campinas/SP | financas/orcamento | Campinas - webservice de transparencia (base citada em buscas) | `http://transparencia.campinas.sp.gov.br/ws/` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Santos/SP | outro | Santos - Sistema de Dados Abertos (egov) | `https://egov.santos.sp.gov.br/dadosabertos/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Santos/SP | outro | Santos - pagina de servico 'Dados Abertos' (gateway institucional) | `https://www.santos.sp.gov.br/?q=servico/dados-abertos` | portal-dados-abertos | nenhuma | desconhecido | `[fetch-ok]` |
| Jundiai/SP | urbanismo/geo | GeoJundiai - Portal de Geotecnologias da Prefeitura de Jundiai | `https://geo.jundiai.sp.gov.br/` | painel/dashboard | lote/imovel e area | desconhecido | `[fetch-ok]` |
| Jundiai/SP | financas/orcamento | Portal da Transparencia de Jundiai | `https://transparencia.jundiai.sp.gov.br/` | portal-dados-abertos | municipio / registro orcamentario | desconhecido | `[fetch-ok]` |
| Sao Jose dos Campos/SP | urbanismo/geo | SJC - Portal de Dados Geograficos (pagina descritiva) | `https://www.sjc.sp.gov.br/carta-de-servicos/transparencia/municipio/dados/portal-de-dados-geograficos/` | geoservico | ponto/equipamento (arvores, feiras, eletropostos) e zona | desconhecido | `[fetch-ok]` |
| Sao Jose dos Campos/SP | urbanismo/geo | SJView - portal geografico de Sao Jose dos Campos | `https://sjview.sjc.sp.gov.br/` | geoservico | desconhecido | desconhecido | `[fetch-ok]` |
| Sao Jose dos Campos/SP | outro | Sao Jose em Dados (publicacao estatistica municipal) | `https://www.sjc.sp.gov.br/servicos/governanca/sao-jose-em-dados/` | pdf/relatorio | municipio | publicacao de 2023 (sem atualizacao posterior visivel) | `[fetch-ok]` |
| Sao Bernardo do Campo/SP | financas/orcamento | Sao Bernardo do Campo - Transparencia Fiscal e Acesso a Informacao, secao Dados Abertos | `https://www.saobernardo.sp.gov.br/web/transparencia/dados-abertos` | portal-dados-abertos | municipio / registro orcamentario e contratual | desconhecido | `[fetch-ok]` |
| Guarulhos/SP | outro | Guarulhos - Dados Abertos (Portal da Transparencia) | `https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Guarulhos/SP | urbanismo/geo | GuaruGeo - geoportal de Guarulhos | `https://guarugeo.guarulhos.sp.gov.br/` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Santo Andre/SP | outro | Santo Andre - Dados Estatisticos / Anuarios do municipio | `https://www2.santoandre.sp.gov.br/index.php/dados-estatisticos` | pdf/relatorio | municipio | descontinuada (ano-base ate 2015) | `[fetch-ok]` |
| Sorocaba/SP | financas/orcamento | Sorocaba - Transparencia Publica (destino do redirect de fazenda.sorocaba.sp.gov.br/transparencia) | `https://informacoeslai.sorocaba.sp.gov.br/` | pdf/relatorio | municipio | periodica (relatorios fiscais) | `[fetch-ok]` |
| Sorocaba/SP | financas/orcamento | Sorocaba - Transparencia da Secretaria da Fazenda (URL original, com redirect) | `https://fazenda.sorocaba.sp.gov.br/transparencia/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |

### Execução 2 — agente `execucao-2` (journal linha 36)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| São Paulo (capital)/SP | outro | Portal de Dados Abertos da Cidade de São Paulo (CKAN) | `http://dados.prefeitura.sp.gov.br/` | portal-dados-abertos | municipio | variável por dataset; não confirmei individualmente | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | CKAN API São Paulo - action/package_list | `http://dados.prefeitura.sp.gov.br/api/3/action/package_list` | api | municipio | API sempre viva | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | CKAN API São Paulo - group_list (contagem por domínio) | `http://dados.prefeitura.sp.gov.br/api/3/action/group_list?all_fields=true` | api | municipio | API sempre viva | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | GeoSampa WFS (GeoServer) - geoserviço aberto, sem CAPTCHA | `http://wfs.geosampa.prefeitura.sp.gov.br/geoserver/ows?service=wfs&version=1.0.0&request=GetCapabilities` | geoservico | distrito/bairro | não declarada no GetCapabilities | `[fetch-ok]` |
| São Paulo (capital)/SP | outro | ObservaSampa - Observatório de Indicadores da Cidade de São Paulo | `https://observasampa.prefeitura.sp.gov.br/` | painel/dashboard | distrito/bairro | não confirmada | `[fetch-ok]` |
| São Paulo (capital)/SP | mobilidade/transito | SPTrans - API Olho Vivo (posição de ônibus em tempo real) e GTFS | `https://www.sptrans.com.br/desenvolvedores/` | api | equipamento/unidade | tempo real | `[fetch-ok]` |
| São Paulo (capital)/SP | social | CKAN São Paulo - datasets com granularidade por distrito | `http://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=distrito&rows=15` | api | distrito/bairro | semestral (CADÚnico) | `[fetch-ok]` |
| São Paulo (capital)/SP | mobilidade/transito | CKAN São Paulo - grupo transporte (INSPEÇÃO NEGATIVA) | `http://dados.prefeitura.sp.gov.br/api/3/action/package_search?fq=groups:transporte&rows=10` | api | municipio | não confirmada | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | URBIS Dados Abertos (CKAN 2.10.11) - portal novo mas vazio | `https://dadosabertos.urbis.prefeitura.sp.gov.br/` | portal-dados-abertos | desconhecido | não aplicável (vazio) | `[fetch-ok]` |
| São Paulo (capital)/SP | urbanismo/geo | GeoSampa - interface web pública (BLOQUEADA POR CAPTCHA) | `https://geosampa.prefeitura.sp.gov.br/PaginasPublicas/downloadArquivo.aspx` | painel/dashboard | desconhecido | desconhecida | `[fetch-falhou]` |
| São Paulo (capital)/SP | financas/orcamento | Portal da Transparência SP - Dados Abertos (BLOQUEADO POR CAPTCHA) | `https://transparencia.prefeitura.sp.gov.br/dados-abertos/` | portal-dados-abertos | desconhecido | desconhecida | `[fetch-falhou]` |
| Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP | mobilidade/transito | Infosiga SP - Sinistros de trânsito (a MELHOR fonte estadual verificada) | `https://dadosabertos.sp.gov.br/dataset/sinistros-infosiga` | csv/xlsx | registro individual | mensal | `[fetch-ok]` |
| Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP | seguranca | NÚMEROS SEM MISTÉRIO - estatística criminal SSP-SP no catálogo estadual | `https://dadosabertos.sp.gov.br/dataset/numeros-sem-misterio` | painel/dashboard | municipio | mensal/trimestral (declarado, não verificado arquivo a arquivo) | `[fetch-ok]` |
| Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP | outro | Portal de Dados Abertos do Estado de São Paulo (CKAN) - contagem via API | `https://dadosabertos.sp.gov.br/api/3/action/package_search?rows=0` | api | municipio | variável | `[fetch-ok]` |
| Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP | social | Repositório de Dados da Fundação SEADE (CKAN) | `https://repositorio.seade.gov.br/` | portal-dados-abertos | desconhecido | não confirmada | `[fetch-ok]` |
| Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP | seguranca | SSP-SP - páginas próprias de estatística (SPA JavaScript, não verificáveis) | `https://www.ssp.sp.gov.br/estatistica/consultas` | desconhecido | desconhecido | desconhecida | `[fetch-falhou]` |
| São José dos Campos/SP | urbanismo/geo | SJC - Portal de Dados Geográficos (página institucional) | `https://www.sjc.sp.gov.br/carta-de-servicos/transparencia/municipio/dados/portal-de-dados-geograficos/` | geoservico | municipio | não declarada | `[fetch-ok]` |
| São José dos Campos/SP | urbanismo/geo | SJView - geoportal de São José dos Campos (SPA, conteúdo não verificável) | `https://sjview.sjc.sp.gov.br/` | geoservico | desconhecido | desconhecida | `[fetch-ok]` |
| Piracicaba/SP | outro | Piracicaba em Dados - IPPLAP | `https://piracicaba.sp.gov.br/servicos/piracicaba-em-dados-historico-ipplap/` | pdf/relatorio | municipio | série histórica; atualização atual não confirmada | `[fetch-ok]` |
| São Bernardo do Campo/SP | financas/orcamento | São Bernardo do Campo - Transparência Fiscal / Dados Abertos | `https://www.saobernardo.sp.gov.br/web/transparencia/dados-abertos` | portal-dados-abertos | municipio | não declarada | `[fetch-ok]` |
| Campinas/SP | outro | Campinas - Secretaria de Gestão e Controle / Dados Abertos | `https://campinas.sp.gov.br/secretaria/gestao-e-controle/pagina/dados-abertos` | desconhecido | municipio | não aplicável | `[fetch-ok]` |
| Campinas/SP | financas/orcamento | Portal da Transparência de Campinas - seção dados abertos | `https://transparencia.campinas.sp.gov.br/index.php?action=dadosabertos` | desconhecido | desconhecido | desconhecida | `[fetch-falhou]` |
| Santos/SP | outro | Sistema de Dados Abertos da Prefeitura de Santos | `https://egov.santos.sp.gov.br/dadosabertos/` | desconhecido | desconhecido | desconhecida | `[fetch-ok]` |
| Santos/SP | outro | Santos - página de serviço Dados Abertos | `https://www.santos.sp.gov.br/?q=servico/dados-abertos` | desconhecido | desconhecido | desconhecida | `[fetch-ok]` |
| Guarulhos/SP | outro | Guarulhos - Transparência / Dados Abertos (falha de certificado TLS) | `https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0` | desconhecido | desconhecido | desconhecida | `[fetch-falhou]` |
| Guarulhos/SP | outro | Guarulhos - Portal Transparência /content/dados-abertos (mesma falha) | `http://portaltransparencia.guarulhos.sp.gov.br/content/dados-abertos` | desconhecido | desconhecido | desconhecida | `[fetch-falhou]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. São Paulo (capital)/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Unico municipio de SP com cobertura simultaneamente ampla E tecnicamente aberta em quase todos os dominios exigidos, verificada por API nesta sessao: catalogo CKAN com 474 conjuntos / 16 grupos tematicos (Educacao 45, Orcamento e Financas 55, Meio Ambiente 42, Infraestrutura e Urbanismo 26, Transportes 8, Saude 5, Seguranca Urbana 5) e 316 recursos CSV + 262 XLSX; geoservico GeoSampa WFS/WMS com 300+ FeatureTypes incluindo geoportal:distrito_municipal (confirma granularidade por DISTRITO) e camada acidente_cet; API de tempo real Olho Vivo da SPTrans com endpoints documentados + GTFS; SP156 com 127 recursos trimestrais atualizados em 30/07/2026; TABNET da SMS com exportacao CSV; Observa Sampa com desagregacao por distrito/subprefeitura em csv/xlsx/json/xml. Atualidade e excelente: varios datasets com metadata_modified em julho/2026.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada, com dois pontos fracos reais e verificados. Fortes: urbanismo/geo (GeoSampa, 300+ camadas), educacao (SME, 44 pacotes, granularidade por unidade educacional), meio ambiente (SVMA, 38 pacotes), financas/orcamento (55 pacotes no grupo), mobilidade (SPTrans API tempo real + GTFS + CET), social (SP156, SMADS 26 pacotes). Fracos: SAUDE - a organizacao 'Saude - SMS' tem apenas 7 conjuntos e a maioria e metadado administrativo (CMBD, PSTDA, SISVOL, SGPS, SAPS), com 'Cadastro dos Estabelecimentos de Saude' descontinuado; o dado epidemiologico real esta fora do CKAN, no TABNET (tabulador, nao bulk download). SEGURANCA - 'Seguranca Urbana - SMSU' tem apenas 3 conjuntos; criminalidade depende da SSP estadual, nao do municipio. Comercio/economia e o dominio mais raso (Negocios 10, Trabalho e Renda 1).

#### 2. Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Nao e uma cidade, mas e decisivo para a decisao de piloto: as duas maiores lacunas municipais em SP (SEGURANCA e SINISTROS DE TRANSITO) sao preenchidas por bases estaduais com granularidade por MUNICIPIO. O Infosiga/DETRAN-SP entrega CSV mensal com lat/long para todo o estado, e o Seade Repositorio entrega indicadores municipais. Isso significa que, para qualquer cidade paulista escolhida, seguranca viaria e criminalidade nao precisam vir da prefeitura. Verifiquei o CKAN estadual por API: 436 conjuntos.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentrada em infraestrutura rodoviaria, agua/ambiente, estatistica e educacao tecnica. Achado importante e negativo: no organization_list do portal estadual NAO aparecem as Secretarias da Seguranca Publica, da Saude nem da Educacao - as maiores secretarias do estado nao publicam no CKAN estadual. Formatos: CSV 115 mas PDF 70 e 'LINK' 31, ou seja parte do catalogo e so ponteiro.

#### 3. Campinas/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Segunda cidade mais provavel do estado por porte e maturidade administrativa, MAS nao consegui confirmar nenhum catalogo de dados abertos real. O que verifiquei foi: uma pagina institucional de 'Dados Abertos' sem catalogo, uma pagina da SEPLURB que apenas cita 'Metadados espaciais' e 'Campinas em numeros', e um WebGIS ambiental funcional. Mantenho como candidata de segunda linha, nao como piloto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentrada e desequilibrada. Unico dominio com plataforma propria verificada e MEIO AMBIENTE (GeoAmbiental). Financas existe via Portal da Transparencia mas nao consegui abrir a secao de dados abertos. Saude, educacao, seguranca, mobilidade e comercio: nenhuma fonte municipal aberta confirmada nesta sessao.

#### 4. Santos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Aparece em noticias com um portal de dados abertos de 615 conjuntos vinculados aos 17 ODS (programas Cidade Sustentavel e Cidade Aberta), o que seria muito relevante. Mas NAO consegui verificar nada: o portal e uma aplicacao JavaScript que nao entrega conteudo ao crawler. Fica como candidata a investigar manualmente, nao como piloto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Impossivel avaliar. Se os 615 conjuntos vinculados a ODS existirem, a cobertura tenderia a ser ampla por construcao (ODS cobrem saude, educacao, ambiente, economia). Mas nao verifiquei um unico dataset, dominio ou formato.

#### 5. Jundiai/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Tem duas plataformas proprias que abriram e renderizaram (GeoJundiai e Portal da Transparencia), o que ja e melhor que Campinas/Santos em verificabilidade. Mas o geoportal e apenas de VISUALIZACAO e a transparencia e so financeira. Nao serve como piloto multi-dominio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Muito desequilibrada: urbanismo/geo (visualizacao) + financas/orcamento (CSV/TXT/XLS). Saude, educacao, seguranca, mobilidade, comercio e meio ambiente: sem fonte aberta municipal confirmada.

#### 6. Sao Jose dos Campos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Tem historico de plano de dados abertos (PDA, com repositorio comunitario no GitHub) e um portal geografico dedicado (SJView), o que indica intencao real. Na pratica, o que verifiquei foi frustrante: o SJView nao entrega conteudo ao crawler e 'Sao Jose em Dados' e apenas um PDF de 2023.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Desequilibrada e rasa no que e verificavel. Urbanismo/geo tem plataforma (nao verificavel). Estatisticas gerais existem em PDF. Saude, educacao, seguranca, mobilidade e financas: nenhuma fonte aberta municipal confirmada nesta sessao.

#### 7. Sao Bernardo do Campo/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Secao de dados abertos existe, abriu e lista dominios nomeados - melhor que Campinas nesse aspecto. Mas e exclusivamente financeiro/administrativo e nao declara formatos. Nao serve de piloto multi-dominio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Totalmente concentrada em financas/orcamento e contratos. Zero cobertura verificada em saude, educacao, seguranca, mobilidade, urbanismo/geo, meio ambiente e comercio.

#### 8. Guarulhos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Segunda maior cidade do estado, com pagina de dados abertos e geoportal proprio (GuaruGeo) identificados. Mas AMBOS falharam na abertura por erro de certificado TLS, o que impede qualquer verificacao e ja e por si um problema operacional para ingestao automatizada.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Nao avaliavel - nenhuma fonte abriu.

#### 9. Santo Andre/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluida para registrar um NAO claro. A unica fonte de dados que abriu entrega apenas anuarios em PDF com ano-base de 2008 a 2015. E o pior caso do grupo em atualidade e em formato.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Praticamente nula em termos de dado aberto. O Sumario/Anuario cobre varios temas (geografia, demografia, social, politico, economia, financas, setor publico) mas em PDF, o que nao atende o criterio 2.

#### 10. Sorocaba/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluida para registrar outro NAO verificado. O portal financeiro/fiscal abriu, mas nao existe secao de dados abertos: e uma hierarquia de documentos PDF/DOC.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Apenas financas/orcamento, e em formato documental. Nenhum outro dominio com fonte aberta confirmada.

### Execução 2 — agente `execucao-2`

#### 1. São Paulo (capital)/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Único município do estado que atende os três critérios simultaneamente e com folga. Amplitude REAL confirmada por API: 474 datasets em 16 grupos temáticos. Acesso genuinamente aberto em três camadas independentes que se complementam: (a) CKAN com API REST funcional, (b) geoserviço WFS/WMS aberto com saída CSV/JSON/SHAPE-ZIP/GeoPackage, (c) API de tempo real de ônibus (Olho Vivo). Granularidade por DISTRITO e SUBPREFEITURA confirmada em duas fontes distintas (camada WFS distrito_municipal e filtros do ObservaSampa com 32 localidades). É o único candidato viável para piloto no estado de SP.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

ATENÇÃO - a cobertura NÃO é tão equilibrada quanto o total de 474 sugere, e isso é a descoberta mais importante desta auditoria. Contagem real por grupo obtida via group_list: finanças 55, educação 45, meio-ambiente 42, infraestrutura/urbanismo 26, direitos 13, demografia 12, negócios 10, moradia 9, transporte 8, cultura 6, saúde 5, segurança 5, participação social 5, esporte 3, administração 2, trabalho/renda 1. Ou seja: no CKAN, saúde (5) e segurança (5) são MUITO fracas, e trabalho tem 1 dataset. Pior: inspecionei o grupo transporte e os 8 datasets são folha de pagamento e fluxo de caixa da CET e da SPTrans - dados ADMINISTRATIVOS, não operacionais de mobilidade. Portanto o equilíbrio de São Paulo só se sustenta somando as camadas extra-CKAN: mobilidade vem da API Olho Vivo e do GTFS da SPTrans; trânsito/sinistros vem da camada WFS acidente_cet e do Infosiga estadual; saúde vem da camada WFS equipamento_saude_hospital e do DATASUS; segurança vem da SSP-SP estadual. Conclusão prática para o piloto: NÃO planeje em cima do CKAN sozinho - o projeto precisa integrar CKAN + WFS + APIs setoriais + camada estadual.

#### 2. Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Recomendação estratégica, não uma cidade. A auditoria mostrou que quase todo município paulista fora da capital é fraco em dados abertos próprios. Mas o estado publica dados com granularidade MUNICIPAL e até por logradouro/lat-long que cobrem os domínios exatamente onde as prefeituras falham: segurança (SSP-SP) e sinistros de trânsito (Infosiga). Isso permite que o piloto entregue saúde/segurança/trânsito para QUALQUER cidade paulista sem depender da prefeitura local. Para o iA Brasil isso é mais valioso que escolher uma segunda cidade.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentrada em segurança pública, sinistros de trânsito e indicadores socioeconômicos/demográficos - justamente os buracos do CKAN da capital (saúde 5 e segurança 5 datasets). Complementa, não substitui, os dados municipais de educação, urbanismo e finanças. Combinada com o CKAN + WFS de São Paulo capital, produz a cobertura equilibrada que nenhuma fonte isolada oferece.

#### 3. São José dos Campos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Segundo colocado real entre os municípios não-capital, mas com folga muito pequena e por um único motivo: é o único que verifiquei com portal geográfico que explicitamente oferece DOWNLOAD de dados, não só visualização de mapa. Serve como piloto secundário apenas se o projeto quiser testar generalização fora da capital.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Fortemente concentrada em urbanismo/geo e meio ambiente. Nada verificado em saúde, educação, segurança ou finanças como dado aberto estruturado. Falha claramente o critério 3 de cobertura equilibrada - dependeria inteiramente da camada estadual (Infosiga e SSP) para trânsito e segurança.

#### 4. Piracicaba/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluída como caso instrutivo de ARMADILHA, não como recomendação. Tem a maior amplitude de domínios de qualquer município paulista fora da capital - 20+ categorias - e por isso apareceria muito bem em qualquer triagem automática por palavras-chave. Mas falha no critério 2 de forma fatal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Amplitude nominal excelente e bem distribuída (agricultura, assistência social, economia, educação, finanças públicas, habitação, indicadores sociais, justiça, meio ambiente, obras, população, saneamento, saúde, segurança, território, emprego, trânsito/transporte). É a cobertura mais equilibrada do interior no papel. Só que o formato anula tudo.

#### 5. São Bernardo do Campo/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Verificado e REPROVADO para piloto. Documentado aqui para poupar retrabalho da equipe: apesar do porte e do PIB, não há portal de dados abertos multissetorial.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Radicalmente desequilibrada - praticamente só fiscal/orçamentário. Falha o critério 3 de forma explícita.

#### 6. Campinas/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Verificado e REPROVADO - e este é o achado mais contraintuitivo da auditoria. Campinas é polo tecnológico e seria a aposta natural de qualquer pessoa escolhendo a segunda cidade do piloto. Não sustenta. Documento aqui explicitamente para evitar que o iA Brasil perca tempo com ela.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Aparência de amplitude, substância nenhuma. O site cobre saúde, educação, segurança, mobilidade (EMDEC), finanças, urbanismo (SEMURB) e meio ambiente - mas como SERVIÇOS TRANSACIONAIS (pedir certidão, pagar IPTU, consultar processo), não como dados para download. Zero cobertura real em dados abertos.

#### 7. Santos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Listada como INCONCLUSIVA com potencial. Tem um sistema de dados abertos declarado e nomeia sistemas setoriais concretos (Minha Saúde, Escola Transparente, Remédio Fácil) que sugerem saúde e educação de verdade, mas nenhuma das duas URLs entregou conteúdo verificável. Precisa de checagem manual em navegador antes de qualquer decisão.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável com honestidade. Os nomes dos sistemas apontam para saúde e educação além do fiscal, o que seria melhor equilíbrio que São Bernardo, mas isso é inferência a partir de títulos, não evidência.

#### 8. Guarulhos/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Listada apenas para registrar uma FALHA TÉCNICA relevante, já que Guarulhos é o segundo município mais populoso do estado e a equipe certamente vai tentar. Não consegui acessar por problema de certificado, não por ausência de portal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável. Nenhum dado obtido.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**São Paulo (capital)/SP — `red_flags`:**

1) O portal web do GeoSampa e o Portal da Transparencia municipal estao atras de CAPTCHA do Prodam-SP - inviabiliza raspagem automatizada; a via utilizavel e o geoservico WFS/WMS (que funciona sem CAPTCHA). 2) A copia do Observa Sampa no CKAN esta DESCONTINUADA: 'Este conjunto de dados foi descontinuado e nao recebera novas atualizacoes. A ultima atualizacao aconteceu em 2016' - so a pagina propria do Observa Sampa esta viva. 3) O endpoint api.observasampa.prefeitura.sp.gov.br/v1/front_end/indicadores retornou HTTP 404 - nao existe API publica documentada do Observa Sampa que eu tenha conseguido confirmar. 4) O novo portal URBIS/SMUL esta praticamente vazio: '2 Quantidade de Datasets', '0 Quantidade de recursos'. 5) A API Olho Vivo exige token de acesso (cadastro), nao e anonima. 6) O GTFS da SPTrans exige login. 7) Muitos datasets do CKAN sao rotulados '(Descontinuada)'. 8) O CKAN tem apenas 12 recursos SHP e 4 GeoJSON - o geo real nao esta no CKAN, esta no GeoSampa. 9) Na propria pagina do TABNET eu NAO consegui confirmar a desagregacao por Distrito Administrativo/Subprefeitura (isso apareceu apenas em resultado de busca, nao na pagina aberta).

**Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP — `red_flags`:**

1) A pagina de downloads de dados criminais da SSP-SP (https://www.ssp.sp.gov.br/estatistica/consultas) NAO renderizou nada alem do titulo 'Portal SSP' - conteudo dependente de JavaScript, o que impede confirmar formatos e series; NAO posso afirmar que os XLSX criminais estao acessiveis programaticamente. 2) O portal estadual tem 19 recursos rotulados 'MySQL' e 31 'LINK' - inflam a contagem sem serem dados baixaveis. 3) A ficha do Infosiga nao confirma explicitamente cobertura dos 645 municipios (isso apareceu so em busca); a ficha diz 'todo territorio estadual paulista'. 4) O Infosiga entrega ZIP, nao CSV direto - exige descompactar antes de ingerir.

**Campinas/SP — `red_flags`:**

1) https://transparencia.campinas.sp.gov.br/index.php?action=dadosabertos retornou pagina VAZIA ao crawler duas vezes - nao consegui listar nenhum dataset. 2) A base de webservice 'transparencia.campinas.sp.gov.br/ws/[metodo]/[parametros]' aparece em resultados de busca, mas http://transparencia.campinas.sp.gov.br/ws/ retornou resposta vazia - NAO confirmei que essa API existe ou funciona. 3) A pagina oficial 'Dados Abertos' da Secretaria de Gestao e Controle nao lista um unico dataset, formato ou endpoint - e navegacao institucional. 4) O GeoAmbiental afirma permitir download mas nao declara formato algum (nada de shapefile/CSV/GeoJSON escrito). 5) 'Campinas em Numeros' depende de acordo com o Observatorio PUC-Campinas - dado terceirizado, nao dado aberto municipal.

**Santos/SP — `red_flags`:**

1) https://egov.santos.sp.gov.br/dadosabertos/ abriu mas renderizou APENAS o cabecalho 'Dados Abertos' - nenhum catalogo, nenhum dataset, nenhum formato. Testei tambem /index.php: mesmo resultado. Portal 100 % dependente de JavaScript = inutilizavel para ingestao automatizada sem navegador headless. 2) A propria pagina institucional expoe um link /dadosabertos/admin 'para a digitacao dos valores' - sugere alimentacao MANUAL dos dados, nao pipeline automatizado. Isso e um sinal ruim de atualidade e confiabilidade. 3) O numero '615 conjuntos' vem de noticia, nao de contagem verificada por mim.

**Jundiai/SP — `red_flags`:**

1) GeoJundiai nao menciona NENHUM download (sem shapefile, sem CSV, sem GeoJSON) nem WMS/WFS - e visualizador de mapa com relatorio por clique. 2) Parte do GeoJundiai tem 'Acesso restrito a funcionarios'. 3) O Portal da Transparencia afirma formatos legiveis por maquina mas nao publica catalogo de datasets nem API, e nao cobre nenhum dominio fora de financas. 4) O Cadastro Fiscal Imobiliario expoe dados de imoveis individuais (numero de cadastro, CEP, area) - atencao a privacidade/LGPD se for usado.

**Sao Jose dos Campos/SP — `red_flags`:**

1) https://sjview.sjc.sp.gov.br/ abriu mas renderizou apenas a palavra 'GEO' - aplicacao JS, sem catalogo, sem formatos, sem WMS/WFS verificavel. 2) 'Sao Jose em Dados' entrega SOMENTE PDF ('sjc-em-dados-2023.pdf'), publicacao de 2023 - viola o criterio de acesso aberto e ja esta com 3 anos. 3) A pagina do Portal de Dados Geograficos descreve 'consulta e download' mas NAO declara nenhum formato de arquivo. 4) O proprio material do plano de dados abertos da cidade admite que 'apenas parte dos dados do municipio segue o formato minimo de publicacao (CSV)'.

**Sao Bernardo do Campo/SP — `red_flags`:**

1) A pagina afirma disponibilizar 'dados estruturados e legiveis por maquinas' mas NAO explicita um unico formato (CSV/XLSX/JSON/API). 2) 'Emendas Parlamentares' redireciona para dashboard Microsoft Power BI - painel proprietario, nao dado aberto baixavel. 3) A pagina afirma que 'Todos os conjuntos de dados estao organizados e catalogados de forma intuitiva' mas NAO fornece nome nem URL do catalogo - so links por secao. 4) Cuidado: existe um homonimo 'Sao Bernardo/MA' (saobernardo.ma.gov.br) que apareceu nas buscas - nao confundir.

**Guarulhos/SP — `red_flags`:**

1) https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0 falhou com 'unable to verify the first certificate' (cadeia de certificado TLS incompleta/invalida). 2) https://guarugeo.guarulhos.sp.gov.br/ falhou com o mesmo erro TLS. 3) Cadeia TLS quebrada em dois hosts distintos sugere problema de infraestrutura no dominio guarulhos.sp.gov.br - qualquer pipeline de ingestao teria que desabilitar verificacao de certificado, o que e inaceitavel em producao. Nao afirmo que nao existam dados; afirmo que nao sao acessiveis de forma segura hoje.

**Santo Andre/SP — `red_flags`:**

1) Formato exclusivamente PDF - explicitamente desvalorizado no criterio 2. 2) Serie encerrada em ano-base 2015: mais de 10 anos de defasagem em relacao a hoje (31/07/2026). 3) A pagina orienta contato TELEFONICO com a Gerencia de Indicadores Sociais e Economicos (GISE) - (11) 4433-0492 - para obter detalhes, o que e o oposto de dado aberto. 4) Ha noticia de 2024/2025 sobre 'nova edicao do Sumario de Dados de Santo Andre', mas NAO abri essa fonte e nao posso confirmar formato nem se ha CSV.

**Sorocaba/SP — `red_flags`:**

1) https://fazenda.sorocaba.sp.gov.br/transparencia/ faz redirect 301 para outro host (informacoeslai.sorocaba.sp.gov.br) - URLs de transparencia instaveis. 2) No destino NAO existe secao 'dados abertos': relatorios de saude, gestao fiscal e execucao orcamentaria sao arquivos PDF/DOC em arvore de documentos, nao datasets. 3) Ha um link 'e-Transparencia' que NAO abri - pode conter dados estruturados, mas nao afirmo nada sobre ele.

### Execução 2 — agente `execucao-2`

**São Paulo (capital)/SP — `red_flags`:**

1) CAPTCHA da Prodam-SP bloqueia sistematicamente as interfaces WEB em *.prefeitura.sp.gov.br: falhei em geosampa.prefeitura.sp.gov.br/PaginasPublicas (_SBC.aspx e downloadArquivo.aspx) e em transparencia.prefeitura.sp.gov.br/dados-abertos - ambos retornaram tela de CAPTCHA, não conteúdo. Isso inviabiliza scraping das UIs e torna o download manual do GeoSampa não automatizável. A boa notícia é que os subdomínios wfs./wms. e o dados. (CKAN) NÃO têm CAPTCHA - é por ali que o piloto deve entrar. 2) A API Olho Vivo exige cadastro e token de ativação, ou seja, não é anônima - há dependência operacional e risco de revogação. 3) Vários datasets sociais por distrito estão em ODS e KMZ (formatos ruins para pipeline) em vez de CSV. 4) URBIS é CKAN de verdade mas está praticamente vazio (2 datasets, 0 recursos armazenados) - é promessa, não ativo. 5) Não consegui confirmar frequência de atualização dataset a dataset; não afirmo que o portal todo esteja atualizado.

**Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP — `red_flags`:**

1) As páginas próprias da SSP-SP (ssp.sp.gov.br/estatistica/consultas e /estatistica/dados-mensais) são SPA em JavaScript e retornaram só o texto 'Portal SSP' - não pude verificar formatos nem granularidade por ali; a verificação de segurança veio pelo catálogo dadosabertos.sp.gov.br. 2) No dataset Números sem Mistério, os 13 recursos são majoritariamente interfaces web e painéis, não downloads diretos de arquivo - o acesso programático a crime bruto é mais difícil do que parece. 3) O portal estadual avisa que 'conjuntos de dados estão sendo cadastrados de forma gradativa', ou seja, cobertura incompleta e em construção. 4) Números sem Mistério com última atualização em 17/04/2025, mais antigo que o Infosiga.

**São José dos Campos/SP — `red_flags`:**

O portal sjview.sjc.sp.gov.br carrega mas é aplicação JavaScript: retornou apenas o texto 'GEO', sem listar camadas, formatos ou serviços. Portanto NÃO pude confirmar quais formatos de download existem, nem se há WMS/WFS. A afirmação de que há download vem da página institucional descritiva, não de verificação direta do sistema. Trate como promissor mas não comprovado. A busca também citou um portal anterior 'Geosanja' (notícia de 2019) que não abri e cuja relação com o SJView não confirmei.

**Piracicaba/SP — `red_flags`:**

ELIMINATÓRIO pelo critério 2: os dados são exclusivamente PDF, um documento por conjunto, com séries históricas em tabelas. Não há CSV, XLSX, API nem catálogo legível por máquina. O enunciado define que 'PDF vale pouco' - aqui é PDF puro. Além disso boa parte é compilação de fontes federais (IBGE, SEADE, RAIS, CAGED), ou seja, não é dado municipal primário; o iA Brasil obteria os mesmos números melhor e já estruturados direto no SEADE e no IBGE. Nome 'histórico Ipplap' sugere acervo legado, não série viva - não confirmei atualização recente.

**São Bernardo do Campo/SP — `red_flags`:**

O inventário de dados abertos é estreito e quase inteiramente fiscal: receitas e despesas, patrimônio público, contratos e emendas, obras em andamento, emendas parlamentares. A própria leitura registrou 'lacunas significativas: nenhuma menção a dados de saúde, estatísticas de educação, informações de segurança ou dados de mobilidade dentro da seção de dados abertos'. Saúde e educação existem apenas como seções de navegação do site, não como datasets. E o portal fala em 'dados estruturados e legíveis por máquina' MAS não especifica nenhum formato - não há confirmação de CSV, XLSX, JSON ou API.

**Campinas/SP — `red_flags`:**

Grave. A leitura da página oficial de dados abertos concluiu textualmente que faltam 'datasets estruturados em CSV, JSON ou formatos de API', 'um catálogo unificado de dados abertos' e 'repositórios legíveis por máquina', e que o portal 'enfatiza serviços transacionais e recuperação de documentos em vez de acesso a dados em massa'. Além disso, a URL de dados abertos do Portal da Transparência (transparencia.campinas.sp.gov.br/index.php?action=dadosabertos) retornou conteúdo VAZIO. Há indício em buscas de um web service em transparencia.campinas.sp.gov.br/ws/[metodo]/[parametros] para receitas e despesas, mas NÃO abri nem confirmei esse endpoint - fica como pista, não como fonte.

**Santos/SP — `red_flags`:**

Ambas as URLs testadas responderam mas são aplicações JavaScript sem conteúdo servido: egov.santos.sp.gov.br/dadosabertos devolveu apenas o cabeçalho 'Dados Abertos', e a página de serviço devolveu só a definição conceitual da Open Knowledge Foundation. Nenhum dataset, formato ou frequência confirmado. Não afirmo que Santos tenha ou não tenha dados abertos úteis.

**Guarulhos/SP — `red_flags`:**

Falha de TLS em DUAS URLs distintas: https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0 e http://portaltransparencia.guarulhos.sp.gov.br/content/dados-abertos, ambas com erro 'unable to verify the first certificate' (cadeia de certificado incompleta/inválida). Isso é um problema de infraestrutura do município que quebraria qualquer pipeline automatizado de coleta, e é informação operacional útil por si só. A existência da seção de dados abertos aparece em buscas, mas não pude verificar nada dela.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO BUSQUEI. Usei WebSearch para descobrir candidatos e WebFetch para abrir cada URL citada. Fiz 33 chamadas de WebFetch. Ao inves de confiar em paginas HTML (que em portais brasileiros costumam ser aplicacoes JavaScript vazias para crawlers), atacei preferencialmente as APIs: CKAN action/group_list, action/organization_list e action/package_search com facetas, alem de WFS/WMS GetCapabilities. Isso e o que produziu as evidencias mais duras (contagens exatas, formatos exatos, datas metadata_modified exatas, nomes exatos de FeatureType).

BUSCAS REALIZADAS (WebSearch): dados abertos Campinas CKAN; SSP-SP dados criminais XLSX; dados.campinas.sp.gov.br; Sao Jose dos Campos dados abertos CSV; Santos dados abertos CKAN; Jundiai dados abertos/geoportal; Santo Andre / Sao Bernardo / Sorocaba portal de dados abertos; Guarulhos / Ribeirao Preto / Piracicaba dados abertos; GeoSampa WFS/WMS endpoints; CET Sao Paulo acidentes; Infosiga SP CSV; Observa Sampa API; TABNET SMS Sao Paulo; Campinas geoportal.

O QUE CONFIRMEI COM CERTEZA (fetch-ok com conteudo real):
- Sao Paulo capital: CKAN com 474 datasets / 16 grupos, facetas CSV 316 e XLSX 262, contagem por grupo e por organizacao (Educacao SME 44, SVMA 38, SMADS 26, CGM 16, SMUL 12, SEHAB 11, Fazenda SF 10, Saude SMS 7, SMT 5, SMSU 3). Datasets com metadata_modified em julho/2026 (SP156 em 2026-07-30, SME turmas em 2026-07-08, CET lentidao em 2026-07-02).
- GRANULARIDADE POR DISTRITO EM SP CAPITAL - CONFIRMADA por tres vias independentes: (a) o WFS do GeoSampa expoe FeatureType 'geoportal:distrito_municipal' com Title 'Distrito'; (b) o Observa Sampa oferece filtro por 'Distrito' e 'Subprefeitura' e download em csv/xlsx/json/xml com 'niveis de desagregacao (subprefeitura e/ou distritos)'; (c) o CKAN retorna 24 datasets para a busca 'distrito', incluindo 'Distritos do Municipio de Sao Paulo', 'Familias Beneficiarias do Programa Bolsa Familia (por distrito)' e 'Numero de Familias Beneficiarias do Programa Renda Cidada por Distrito'.
- Geoservicos GeoSampa WFS 2.0.0 e WMS 1.3.0 respondem sem CAPTCHA e sem autenticacao, com 300+ FeatureTypes.
- API Olho Vivo da SPTrans: endpoints documentados, exige token.
- Infosiga/DETRAN-SP: ZIP com CSVs, atualizacao mensal, serie 2015-2025, lat/long, ultima atualizacao 03/02/2026.

O QUE NAO CONSEGUI CONFIRMAR (registrado como fetch-falhou ou com ressalva explicita):
- Portal web do GeoSampa e Portal da Transparencia de SP capital: bloqueados por CAPTCHA do Prodam-SP.
- api.observasampa.prefeitura.sp.gov.br/v1/front_end/indicadores: HTTP 404. Nao existe API publica confirmada do Observa Sampa.
- SSP-SP /estatistica/consultas: pagina renderizou so o titulo. NAO confirmei os XLSX criminais. Esta e a lacuna mais incomoda do levantamento, porque seguranca e um dos oito dominios pedidos.
- Portal de dados abertos de Santos (615 conjuntos citados em noticia): portal e JS puro, nao verifiquei UM dataset.
- Campinas: nem a secao de dados abertos da transparencia nem o webservice /ws/ retornaram conteudo.
- Guarulhos: dois hosts falharam com erro de cadeia de certificado TLS.
- SJView (Sao Jose dos Campos): renderizou so a palavra 'GEO'.
- dados-abertos-observasampa.prefeitura.sp.gov.br: existe e responde, mas excedeu o limite de tamanho do WebFetch (10 MB) - nao consegui ler o conteudo. NAO o listei como fonte porque nao vi nada dele.

CIDADES DA LISTA QUE NAO TESTEI (esgotei o orcamento de 200 WebSearch da sessao antes de chegar nelas; nao inventei nada sobre elas): Ribeirao Preto, Osasco, Piracicaba, Barueri, Bauru, Americana, Indaiatuba. Nao tenho NENHUMA evidencia sobre essas sete - nao as ranqueei nem para cima nem para baixo. Recomendo uma segunda rodada focada nelas, tentando primeiro os padroes que funcionaram aqui: /api/3/action/package_search (caso tenham CKAN) e /geoserver/wfs?request=GetCapabilities (caso tenham GeoServer).

RECOMENDACAO DE PILOTO. Sao Paulo capital nao tem concorrente no estado, e a distancia e enorme, nao marginal: e a unica cidade paulista onde verifiquei acesso programatico real (CKAN API + WFS + WMS + API de tempo real) em pelo menos seis dominios, com granularidade por distrito comprovada e dados atualizados neste mes. Todas as outras cidades da lista, entre as que consegui testar, ficam presas em um destes tres padroes: (a) so financas em portal de transparencia, (b) geoportal apenas de visualizacao sem download, ou (c) portal existente mas 100 % JavaScript/CAPTCHA/TLS quebrado, inutilizavel para ingestao. Para o piloto do 'iA Brasil' eu comecaria por SP capital combinando CKAN + GeoSampa WFS + Observa Sampa (distrito) e cobriria as duas lacunas municipais reais - saude assistencial e seguranca - com fontes estaduais (TABNET, Infosiga) em vez de esperar dado municipal que nao existe.

RESSALVA FINAL DE HONESTIDADE: as contagens de datasets, formatos e datas que cito vieram de respostas de API que eu abri nesta sessao, mas foram lidas e resumidas por um modelo intermediario ao converter a pagina. Sao numeros que eu vi, nao numeros que eu lembrei - porem um auditor que quiser rigor absoluto deve reexecutar as URLs de API que listei, que sao todas publicas e reproduziveis sem autenticacao.

#### Fontes que a execução 1 NÃO confirmou (9 de 42)

- `[fetch-falhou]` **São Paulo (capital)/SP** — GeoSampa - portal web (Mapa Digital da Cidade) — `https://geosampa.prefeitura.sp.gov.br/`
  - motivo/evidência registrada pelo agente: Retornou tela de CAPTCHA: 'Este desafio e para testar se voce e um visitante legitimo dos servicos da Prefeitura / Prodam-SP'. Nenhum conteudo de dados acessivel. Testei tambem /PaginasPublicas/_SBC.aspx - mesmo CAPTCHA.
- `[fetch-falhou]` **São Paulo (capital)/SP** — Portal da Transparencia do Municipio de Sao Paulo - secao Dados Abertos — `https://transparencia.prefeitura.sp.gov.br/dados-abertos/`
  - motivo/evidência registrada pelo agente: Bloqueado por CAPTCHA do Prodam-SP: 'Este desafio e para testar se voce e um visitante legitimo dos servicos da Prefeitura / Prodam-SP'. Nao consegui ver nenhum dataset. (O dominio financas aparece coberto indiretamente: grupo 'Orcamento e Financas' com 55 pacotes no CKAN e organizacao 'Fazenda - SF' com 10 pacotes.)
- `[fetch-falhou]` **São Paulo (capital)/SP** — Observa Sampa - endpoint de API v1 front_end — `https://api.observasampa.prefeitura.sp.gov.br/v1/front_end/indicadores`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. O host api.observasampa existe (e usado pelo front do painel), mas nao encontrei rota publica documentada de indicadores. Nao ha API confirmada do Observa Sampa.
- `[fetch-falhou]` **Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP** — SSP-SP - Estatisticas / Consultas (bases criminais em XLSX por municipio e delegacia) — `https://www.ssp.sp.gov.br/estatistica/consultas`
  - motivo/evidência registrada pelo agente: A pagina abriu mas retornou apenas o titulo 'Portal SSP', sem nenhum conteudo substantivo - conteudo renderizado por JavaScript. NAO consegui confirmar formatos, series temporais nem desagregacao por municipio/delegacia. Trato isso como lacuna: a principal fonte de criminalidade de SP nao e verificavel por crawler simples.
- `[fetch-falhou]` **Campinas/SP** — Portal da Transparencia de Campinas - secao Dados Abertos — `https://transparencia.campinas.sp.gov.br/index.php?action=dadosabertos`
  - motivo/evidência registrada pelo agente: Pagina retornou conteudo vazio ao crawler (nenhum texto extraivel). Nao consegui listar datasets nem formatos. Testado uma vez, falhou.
- `[fetch-falhou]` **Campinas/SP** — Campinas - webservice de transparencia (base citada em buscas) — `http://transparencia.campinas.sp.gov.br/ws/`
  - motivo/evidência registrada pelo agente: Resposta vazia, sem documentacao de metodos nem formato. A base 'transparencia.campinas.sp.gov.br/ws/[metodo]/[parametros]' so aparece citada em resultados de busca - NAO a confirmei funcionando.
- `[fetch-falhou]` **Guarulhos/SP** — Guarulhos - Dados Abertos (Portal da Transparencia) — `https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0`
  - motivo/evidência registrada pelo agente: Erro de TLS: 'unable to verify the first certificate'. Nenhum conteudo obtido.
- `[fetch-falhou]` **Guarulhos/SP** — GuaruGeo - geoportal de Guarulhos — `https://guarugeo.guarulhos.sp.gov.br/`
  - motivo/evidência registrada pelo agente: Erro de TLS: 'unable to verify the first certificate'. Nenhum conteudo obtido.
- `[fetch-falhou]` **Sorocaba/SP** — Sorocaba - Transparencia da Secretaria da Fazenda (URL original, com redirect) — `https://fazenda.sorocaba.sp.gov.br/transparencia/`
  - motivo/evidência registrada pelo agente: HTTP 301 Moved Permanently, redirect cross-host para https://informacoeslai.sorocaba.sp.gov.br/. Nao serviu conteudo proprio.

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

ESCOPO: apenas estado de São Paulo, região Sudeste. 21 chamadas de WebFetch e 7 de WebSearch. Toda URL marcada fetch-ok foi realmente aberta nesta sessão e tem trecho de evidência; toda falha está registrada como fetch-falhou com a mensagem de erro real.

COMO BUSQUEI: comecei pela capital indo direto às URLs canônicas em vez de confiar em busca, porque queria testar acesso, não existência. Depois usei a API CKAN para obter números duros (package_list, group_list com all_fields, package_search com fq) - decisão deliberada, já que a página HTML só declara totais enquanto a API revela a DISTRIBUIÇÃO por domínio, que é exatamente o critério 3. Para as outras cidades usei WebSearch para descobrir candidatas e WebFetch para tentar confirmar cada uma.

TRÊS DESCOBERTAS QUE MUDAM A DECISÃO:
1) O grupo 'transporte' do CKAN da capital é uma armadilha. Inspecionei seus datasets e são folha de pagamento e fluxo de caixa da CET e da SPTrans - dados administrativos. Quem contar 'transporte: 8 datasets' e concluir que São Paulo tem mobilidade aberta no CKAN estará errado. A mobilidade real está na API Olho Vivo, no GTFS e na camada WFS acidente_cet.
2) Padrão de CAPTCHA da Prodam-SP: as interfaces WEB em *.prefeitura.sp.gov.br (GeoSampa PaginasPublicas, Portal da Transparência) bloqueiam acesso automatizado, mas os subdomínios dados. (CKAN) e wfs./wms. (GeoServer) NÃO bloqueiam. Recomendação arquitetural direta para o iA Brasil: entrar por API e WFS, nunca por scraping de UI.
3) Saúde e segurança são fracas até em São Paulo capital no CKAN (5 datasets cada) e trabalho/renda tem 1. O equilíbrio só existe somando CKAN + WFS + APIs setoriais + camada estadual. Por isso incluí a camada estadual (Infosiga e SSP-SP) como candidato próprio - resolve saúde/segurança/trânsito para qualquer município paulista, inclusive os que não têm portal.

O QUE NÃO CONSEGUI CONFIRMAR (limitações honestas):
- Páginas em JavaScript (SPA) derrotaram o WebFetch em vários casos: ssp.sp.gov.br (retornou só 'Portal SSP'), sjview.sjc.sp.gov.br (só 'GEO'), egov.santos.sp.gov.br (só 'Dados Abertos'). Nesses casos a URL responde mas o conteúdo não é verificável - registrei como tal em vez de inferir.
- Guarulhos falhou por certificado TLS inválido em dois hosts diferentes.
- NÃO testei, e portanto não afirmo nada sobre: Sorocaba, Ribeirão Preto, Osasco, Jundiaí, Barueri, Bauru, Americana, Indaiatuba, Santo André. Para Santo André e Jundiaí há indícios em busca (Jundiaí citando CSV/TXT/XLS no portal da transparência; Santo André com seção de dados abertos aparentemente só fiscal) mas como não abri as URLs, deixei ambas fora dos candidatos em vez de marcar nao-testado com fonte não verificada. Osasco tem Plano Municipal de Dados Abertos por Decreto 13.655/2023 segundo busca - pista não verificada que vale checar depois.
- Não validei frequência de atualização dataset a dataset em nenhum portal; onde declaro frequência (Infosiga mensal, CADÚnico semestral) é o que a página afirma.
- Não abri o guia de referência da API Olho Vivo, então não listo endpoints específicos dela.

CONCLUSÃO: São Paulo capital é o único piloto defensável no estado, e deve ser implementado como CKAN + WFS GeoSampa + Olho Vivo + camada estadual, com granularidade por distrito/subprefeitura confirmada em duas fontes independentes. Campinas, esperada como segunda opção óbvia, foi reprovada por não ter catálogo legível por máquina.

#### Fontes que a execução 2 NÃO confirmou (6 de 26)

- `[fetch-falhou]` **São Paulo (capital)/SP** — GeoSampa - interface web pública (BLOQUEADA POR CAPTCHA) — `https://geosampa.prefeitura.sp.gov.br/PaginasPublicas/downloadArquivo.aspx`
  - motivo/evidência registrada pelo agente: Retornou tela de CAPTCHA da Prefeitura/Prodam-SP ('Digite o código que aparece na imagem'), não a página de download. Também testei /PaginasPublicas/_SBC.aspx com o mesmo resultado. Nenhuma camada ou formato pôde ser verificado por esta via. Use o WFS/WMS em vez disso.
- `[fetch-falhou]` **São Paulo (capital)/SP** — Portal da Transparência SP - Dados Abertos (BLOQUEADO POR CAPTCHA) — `https://transparencia.prefeitura.sp.gov.br/dados-abertos/`
  - motivo/evidência registrada pelo agente: Retornou exclusivamente tela de verificação CAPTCHA da Prefeitura/Prodam-SP com ID de suporte. Nenhum dataset, formato ou informação de API pôde ser verificado.
- `[fetch-falhou]` **Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP** — SSP-SP - páginas próprias de estatística (SPA JavaScript, não verificáveis) — `https://www.ssp.sp.gov.br/estatistica/consultas`
  - motivo/evidência registrada pelo agente: Retornou apenas o texto 'Portal SSP', sem conteúdo navegável - aplicação JavaScript. Também testei https://www.ssp.sp.gov.br/estatistica/dados-mensais/ com resultado idêntico. Não pude verificar formatos, granularidade por delegacia nem anos disponíveis por esta via.
- `[fetch-falhou]` **Campinas/SP** — Portal da Transparência de Campinas - seção dados abertos — `https://transparencia.campinas.sp.gov.br/index.php?action=dadosabertos`
  - motivo/evidência registrada pelo agente: A página retornou conteúdo vazio - nada renderizou para análise. Não pude verificar dataset, formato ou domínio algum.
- `[fetch-falhou]` **Guarulhos/SP** — Guarulhos - Transparência / Dados Abertos (falha de certificado TLS) — `https://www.guarulhos.sp.gov.br/transparencia/dados-abertos-0`
  - motivo/evidência registrada pelo agente: Erro de conexão: 'unable to verify the first certificate'. Cadeia TLS inválida ou incompleta. Nenhum conteúdo obtido.
- `[fetch-falhou]` **Guarulhos/SP** — Guarulhos - Portal Transparência /content/dados-abertos (mesma falha) — `http://portaltransparencia.guarulhos.sp.gov.br/content/dados-abertos`
  - motivo/evidência registrada pelo agente: Segunda tentativa em host alternativo, mesmo erro 'unable to verify the first certificate'. Confirma que a falha é do município, não pontual.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 68 no total — 53 `[fetch-ok]`, 15 `[fetch-falhou]`, 0 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 1 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 0 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 52 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **São Paulo (capital)/SP**
- Execução 2 (`execucao-2`): **São Paulo (capital)/SP**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): São Paulo (capital)/SP · Estado de Sao Paulo (camada estadual - vale para QUALQUER municipio paulista, inclusive os 15 alvos)/SP · Campinas/SP · Santos/SP · Jundiai/SP · Sao Jose dos Campos/SP · Sao Bernardo do Campo/SP · Guarulhos/SP · Santo Andre/SP · Sorocaba/SP

- Execução 2 (`execucao-2`): São Paulo (capital)/SP · Camada ESTADUAL de São Paulo (aplicável a TODOS os municípios do estado, inclusive os fracos)/SP · São José dos Campos/SP · Piracicaba/SP · São Bernardo do Campo/SP · Campinas/SP · Santos/SP · Guarulhos/SP

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
