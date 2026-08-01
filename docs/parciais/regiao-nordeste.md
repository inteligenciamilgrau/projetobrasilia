# regiao:nordeste — Regiao NORDESTE (AL, BA, CE, MA, PB, PE, PI, RN, SE)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:nordeste

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
| 1 | `execucao-1` | 24 | 9 | 35 |
| 2 | `execucao-2` | 45 | 7 | 34 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 24)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Recife/PE | outro (catalogo/meta) | Portal de Dados Abertos da Prefeitura do Recife - CKAN API package_list | `https://dados.recife.pe.gov.br/api/3/action/package_list` | api | municipio | continua (varia por dataset) | `[fetch-ok]` |
| Recife/PE | saude | SAMU Recife 2026 - solicitacoes de atendimento (Secretaria de Saude) | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=servico-de-atendimento-movel-de-urgencia-samu-2026` | api | registro individual | anual com carga corrente (metadata_modified 2026-06-15) | `[fetch-ok]` |
| Recife/PE | mobilidade/transito | Registro das Infracoes de Transito - CTTU Recife | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=registro-das-infracoes-de-transito` | api | registro individual | mensal (metadata_modified 2026-07-01) | `[fetch-ok]` |
| Recife/PE | mobilidade/transito | Acidentes de transito com e sem vitimas / Fluxo de veiculo por hora / Velocidade das vias - CTTU | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=acidentes-de-transito-com-e-sem-vitimas` | api | registro individual | metadata_modified 2026-03-02 | `[fetch-ok]` |
| Recife/PE | financas/orcamento | IPTU Recife (serie 2024-2026) e Despesas Orcamentarias | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=imposto-predial-e-territorial-urbano-iptu` | api | registro individual (imovel) | anual/corrente (metadata_modified 2026-07-03) | `[fetch-ok]` |
| Recife/PE | comercio/economia | Empresas da Cidade do Recife | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=empresas-da-cidade-do-recife` | api | registro individual (empresa) | metadata_modified 2026-07-03 | `[fetch-ok]` |
| Recife/PE | urbanismo/geo + meio-ambiente | Licenciamento Urbanistico, Licenciamento Ambiental e Autos de Infracao Ambiental | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=licenciamento-ambiental` | api | registro individual | metadata_modified 2026-06-17 | `[fetch-ok]` |
| Recife/PE | seguranca | Indicadores Criminais - Secretaria de Defesa Social de Pernambuco (SDS-PE) | `https://www.sds.pe.gov.br/estatisticas` | painel/dashboard | municipio | mensal (preliminar dia 5, consolidado dia 15 do mes seguinte) | `[fetch-ok]` |
| Recife/PE | financas/orcamento | Portal de Dados Abertos do Estado de Pernambuco (CKAN estadual) | `https://dados.pe.gov.br/api/3/action/package_list` | api | municipio | desconhecido | `[fetch-ok]` |
| Fortaleza/CE | outro (catalogo/meta) | Fortaleza Dados Abertos (CITINOVA) - catalogo CKAN | `https://dados.fortaleza.ce.gov.br/dataset/` | portal-dados-abertos | municipio | continua (varia por dataset) | `[fetch-ok]` |
| Fortaleza/CE | outro (catalogo/meta) | Fortaleza Dados Abertos - CKAN API package_list | `https://dados.fortaleza.ce.gov.br/api/3/action/package_list` | api | municipio | continua | `[fetch-ok]` |
| Fortaleza/CE | mobilidade/transito | GTFS ETUFOR - feed de transporte publico de Fortaleza (marco/2026) | `https://dados.fortaleza.ce.gov.br/dataset/especificacao-geral-feed-transito-gtfs-010-2025` | csv/xlsx | equipamento/unidade (linha, parada, viagem, horario) | mensal (metadata 01/04/2026, dado de marco/2026) | `[fetch-ok]` |
| Fortaleza/CE | financas/orcamento + urbanismo/geo | IPTU - Cadastro Fiscal de Fortaleza (dado por lote, georreferenciado) | `https://dados.fortaleza.ce.gov.br/api/3/action/package_show?id=dados_abertos_iptu_cadastro_fiscal` | csv/xlsx | registro individual (lote/imovel com coordenada) | metadata_modified 2026-06-17 | `[fetch-ok]` |
| Fortaleza/CE | seguranca | SUPESP/SSPDS-CE - Estatisticas de indicadores criminais (XLSX + Power BI) | `https://www.ce.gov.br/supesp/estatistica-sspds/` | csv/xlsx | distrito/bairro (via AIS - Area Integrada de Seguranca) | mensal, com registro diario de CVLI | `[fetch-ok]` |
| Fortaleza/CE | seguranca | Ocorrencias da Coordenadoria de Protecao e Defesa Civil de Fortaleza | `https://dados.fortaleza.ce.gov.br/api/3/action/package_show?id=ocorrencias-copdc` | csv/xlsx | registro individual | metadata_modified 2026-06-10 | `[fetch-ok]` |
| Fortaleza/CE | financas/orcamento | Resultado das Licitacoes da Prefeitura de Fortaleza jan-mai/2026 | `https://dados.fortaleza.ce.gov.br/api/3/action/package_show?id=resultados_01_a_05_2026` | csv/xlsx | registro individual | metadata_modified 2026-06-25 | `[fetch-ok]` |
| Fortaleza/CE | educacao | Matricula na Rede Municipal / Censo Escolar SME Fortaleza (EVIDENCIA DE DEFASAGEM) **[NACIONAL — não pontua]** | `https://dados.fortaleza.ce.gov.br/api/3/action/package_show?id=matricula-na-rede-municipal` | csv/xlsx | municipio | PARADO - metadata_modified 2024-01-30 | `[fetch-ok]` |
| Fortaleza/CE | mobilidade/transito | Sinistros de Transito e Mapa de Paradas de Onibus (EVIDENCIA DE FORMATO POBRE) | `https://dados.fortaleza.ce.gov.br/api/3/action/package_show?id=sinistros-transito` | geoservico | registro individual | metadata_modified 2025-07-22 | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | GeoSalvador - diretorio ArcGIS REST Services da Prefeitura de Salvador | `https://geo.salvador.ba.gov.br/arcgis/rest/services?f=pjson` | geoservico | registro individual (feicao geografica) | ativo (servicos MASTERPLAN_2025 presentes) | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | Portal for ArcGIS de Salvador - API de busca de itens publicos | `https://geo.salvador.ba.gov.br/portal/sharing/rest/search?q=access:public&num=100&sortField=modified&sortOrder=desc&f=json` | api | equipamento/unidade | ativo em 2026 | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | Salvador - servico de Bairros (MapServer) como amostra de geoservico funcional | `https://geo.salvador.ba.gov.br/arcgis/rest/services/Bairros/MapServer?f=pjson` | geoservico | distrito/bairro | desconhecido | `[fetch-ok]` |
| Salvador/BA | outro (catalogo/meta) | Salvador Dados - portal-vitrine (NAO MAQUINA-LEGIVEL) | `https://dados.salvador.ba.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | GeoSalvador - portal de geotecnologia (pagina institucional) | `https://geo.salvador.ba.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Salvador/BA | seguranca | Portal de Dados Abertos do Estado da Bahia (CKAN estadual) | `https://dados.ba.gov.br/api/3/action/package_list` | api | desconhecido (agregado estadual) | desconhecido | `[fetch-ok]` |
| Maceio/AL | social | Observatorio da Cidade - Prefeitura de Maceio (IPLAM) | `https://observatoriodacidade.maceio.al.gov.br/` | csv/xlsx | municipio (nao confirmei recorte por bairro) | desconhecido - nenhuma data por dataset exposta | `[fetch-ok]` |
| Maceio/AL | urbanismo/geo | Geoportal Data Maceio (FORA DO AR) | `https://www.datamaceio.com.br/` | geoservico | desconhecido | indisponivel | `[fetch-falhou]` |
| Sobral/CE | financas/orcamento | Dados Abertos - Portal da Transparencia de Sobral | `https://transparencia.sobral.ce.gov.br/dadosAbertos` | csv/xlsx | registro individual | automatizada; cobertura declarada jan/2017 a jul/2026 | `[fetch-ok]` |
| Sobral/CE | seguranca | SUPESP/SSPDS-CE - indicadores criminais por AIS (aplicavel a Sobral) | `https://www.ce.gov.br/supesp/estatistica-sspds/` | csv/xlsx | distrito/bairro (via AIS) | mensal, CVLI diario | `[fetch-ok]` |
| Natal/RN | mobilidade/transito | dados.natal.br - CKAN da STTU (API funciona, so mobilidade, dado parado em 2022) | `http://dados.natal.br/api/3/action/package_list` | api | equipamento/unidade (linha, parada, rota) | PARADO - dado mais recente de 2022 | `[fetch-ok]` |
| Natal/RN | mobilidade/transito | dados.natal.br - interface web CKAN (HTTP 500) | `http://dados.natal.br/` | portal-dados-abertos | desconhecido | indisponivel | `[fetch-falhou]` |
| Natal/RN | mobilidade/transito | Portal da Transparencia da Mobilidade Urbana de Natal - STTU (certificado expirado) | `https://dadosabertos.natal.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Natal/RN | mobilidade/transito | Area do Desenvolvedor de Natal (host nao resolve) | `http://desenvolvedor.dados.natal.br/` | api | desconhecido | indisponivel | `[fetch-falhou]` |
| Sao Luis/MA | financas/orcamento | Dados Abertos - Prefeitura Municipal de Sao Luis | `https://www.saoluis.ma.gov.br/dados-abertos` | csv/xlsx | registro individual | mensal (Despesas) | `[fetch-ok]` |
| Aracaju/SE | financas/orcamento | Dados Abertos - API - Portal da Transparencia de Aracaju | `https://transparencia.aracaju.se.gov.br/prefeitura/dados-abertos/` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Campina Grande/PB | financas/orcamento | Dados Abertos - Prefeitura de Campina Grande | `https://campinagrande.pb.gov.br/dados-abertos/` | api | registro individual (processo licitatorio) | ultima atualizacao 29/08/2025 | `[fetch-ok]` |

### Execução 2 — agente `execucao-2` (journal linha 45)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Recife/PE | outro | Portal de Dados Abertos do Recife - CKAN API package_list | `https://dados.recife.pe.gov.br/api/3/action/package_list` | api | municipio | varia por dataset | `[fetch-ok]` |
| Recife/PE | outro | Recife CKAN - group_list (prova da cobertura equilibrada) | `https://dados.recife.pe.gov.br/api/3/action/group_list?all_fields=true` | api | municipio | n/a (metadado) | `[fetch-ok]` |
| Recife/PE | mobilidade/transito | Registro das Infracoes de Transito (CTTU) | `https://dados.recife.pe.gov.br/dataset/registro-das-infracoes-de-transito` | csv/xlsx | registro individual | anual (serie 2006-2025) | `[fetch-ok]` |
| Recife/PE | mobilidade/transito | Ciclovias, ciclofaixas e estacoes de aluguel de bikes (Bike PE) | `https://dados.recife.pe.gov.br/dataset/ciclovias-ciclofaixas-estacoes-de-aluguel-de-bikes-e-rotas` | csv/xlsx | equipamento/unidade | Semestral (declarada no portal) | `[fetch-ok]` |
| Recife/PE | outro | Hub de Dados Abertos da Prefeitura do Recife | `https://hubdedados.recife.pe.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Recife/PE | outro | Recife CKAN - listagem HTML de datasets (FORA DO AR) | `https://dados.recife.pe.gov.br/dataset` | portal-dados-abertos | desconhecido | n/a | `[fetch-falhou]` |
| Recife/PE | outro | ODI Cidades 2023 (Open Knowledge Brasil) - notas das capitais, via Brasil61 | `https://brasil61.com/n/5-capitais-do-pais-recebem-nota-media-em-indice-de-dados-abertos-para-cidades-bras2411807` | pdf/relatorio | municipio | edicao 2023 | `[fetch-ok]` |
| Fortaleza/CE | outro | Fortaleza Dados Abertos - portal CKAN (catalogo geral) | `https://dados.fortaleza.ce.gov.br/dataset/` | portal-dados-abertos | municipio | varia por dataset | `[fetch-ok]` |
| Fortaleza/CE | financas/orcamento | Fortaleza CKAN API - datasets mais recentes (prova de vitalidade em 2026) | `https://dados.fortaleza.ce.gov.br/api/3/action/package_search?q=&rows=5&sort=metadata_modified+desc` | api | municipio | continua para licitacoes/servidores | `[fetch-ok]` |
| Fortaleza/CE | mobilidade/transito | Fortaleza - grupo Transporte (EVIDENCIA DE DEFASAGEM) | `https://dados.fortaleza.ce.gov.br/dataset?groups=transporte` | csv/xlsx | equipamento/unidade | parado desde 2022 na maior parte | `[fetch-ok]` |
| Fortaleza/CE | seguranca | Fortaleza - grupo Seguranca (VAZIO PRATICO) | `https://dados.fortaleza.ce.gov.br/dataset?groups=seguranca` | csv/xlsx | desconhecido | parado desde 2022 | `[fetch-ok]` |
| Fortaleza/CE | saude | Fortaleza - grupo Saude | `https://dados.fortaleza.ce.gov.br/dataset?groups=saude` | csv/xlsx | equipamento/unidade | maioria 2024 ou anterior | `[fetch-ok]` |
| Fortaleza/CE | comercio/economia | Fortaleza - grupo Economia | `https://dados.fortaleza.ce.gov.br/dataset?groups=economia` | csv/xlsx | distrito/bairro | parado desde 2023 | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | Servidor ArcGIS REST da Prefeitura de Salvador (raiz de servicos) | `https://geo.salvador.ba.gov.br/arcgis/rest/services` | geoservico | distrito/bairro | desconhecido (ha MASTERPLAN_2024/2025) | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | Salvador ArcGIS - Bairros MapServer (prova de acesso programatico) | `https://geo.salvador.ba.gov.br/arcgis/rest/services/Bairros/MapServer?f=pjson` | geoservico | distrito/bairro | desconhecido | `[fetch-ok]` |
| Salvador/BA | saude | Salvador ArcGIS - pasta SMS (Secretaria Municipal de Saude) | `https://geo.salvador.ba.gov.br/arcgis/rest/services/SMS` | geoservico | distrito/bairro | desconhecido | `[fetch-ok]` |
| Salvador/BA | urbanismo/geo | GeoSalvador - portal oficial de geotecnologia | `https://geo.salvador.ba.gov.br/` | geoservico | distrito/bairro | desconhecido | `[fetch-ok]` |
| Salvador/BA | outro | Salvador Dados - plataforma da SEMIT (NAO AUDITAVEL) | `https://dados.salvador.ba.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-falhou]` |
| Salvador/BA | mobilidade/transito | Salvador ArcGIS - pasta SEMOB (mobilidade) - restrita | `https://geo.salvador.ba.gov.br/arcgis/rest/services/SEMOB` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Maceio/AL | outro | Observatorio da Cidade de Maceio (Iplam) | `https://observatoriodacidade.maceio.al.gov.br/` | csv/xlsx | equipamento/unidade | nao informada na pagina | `[fetch-ok]` |
| Maceio/AL | outro | Anuncio da plataforma DataMaceio (Segov) - escopo prometido | `https://maceio.al.gov.br/noticias/segov/prefeitura-de-maceio-prepara-lancamento-de-plataforma-inedita-de-dados-abertos` | desconhecido | desconhecido | desconhecido | `[fetch-ok]` |
| Maceio/AL | outro | DataMaceio - URL provavel testada (INEXISTENTE) | `https://dados.maceio.al.gov.br/` | desconhecido | desconhecido | n/a | `[fetch-falhou]` |
| Natal/RN | mobilidade/transito | Portal da Transparencia e Mobilidade Urbana de Natal (CKAN) - FORA DO AR | `http://dados.natal.br/` | portal-dados-abertos | desconhecido | n/a | `[fetch-falhou]` |
| Sobral e Campina Grande (municipios nao-capitais)/CE/PB | financas/orcamento | Sobral - API de Dados Abertos (via TCE-CE) | `https://transparencia.sobral.ce.gov.br/dadosAbertos/apiDados` | api | municipio | desconhecido | `[fetch-ok]` |
| Sobral e Campina Grande (municipios nao-capitais)/CE/PB | financas/orcamento | Campina Grande - Dados Abertos (prefeitura) | `https://campinagrande.pb.gov.br/dados-abertos/` | api | municipio | desconhecido | `[fetch-ok]` |
| Sobral e Campina Grande (municipios nao-capitais)/CE/PB | educacao | Observatorio de Campina Grande - Dados Abertos | `https://observa.campinagrande.br/index.php/dados-abertos/` | painel/dashboard | municipio | desconhecido | `[fetch-ok]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | outro | Catalogo nacional curado de portais de dados abertos (dadosgovbr/catalogos-dados-brasil) | `https://raw.githubusercontent.com/dadosgovbr/catalogos-dados-brasil/master/dados/catalogos.csv` | csv/xlsx | municipio | comunitaria (GitHub) | `[fetch-ok]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | financas/orcamento | Dados Abertos do Estado da Paraiba (apoio a Joao Pessoa / Campina Grande) | `https://dados.pb.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | financas/orcamento | Portal Dados Abertos do Estado da Bahia (apoio a Salvador / Feira de Santana) | `https://dados.ba.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | outro | Dados Abertos - Ceara Transparente (apoio a Fortaleza / Sobral) | `https://cearatransparente.ce.gov.br/portal-da-transparencia/dados-abertos/conjuntos-de-dados?locale=pt-BR` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | financas/orcamento | Aracaju - Dados Abertos / API da Prefeitura (FALHA DE TLS) | `https://transparencia.aracaju.se.gov.br/prefeitura/dados-abertos/` | api | municipio | desconhecido | `[fetch-falhou]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | outro | Sao Luis - pagina de Dados Abertos do Portal da Transparencia | `https://www.saoluis.ma.gov.br/portal/transparencia/pagina/4489/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | outro | Teresina - Portal da Transparencia (sem dados abertos confirmados) | `http://transparencia.teresina.pi.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE | outro | Dados Abertos do Governo de Pernambuco (estadual) - FORA DO AR | `http://www.dadosabertos.pe.gov.br/` | portal-dados-abertos | desconhecido | n/a | `[fetch-falhou]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Recife/PE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Catalogo municipal mais EQUILIBRADO do Nordeste e o mais fresco. CKAN em dados.recife.pe.gov.br com 221 datasets (contagem exata que fiz via package_list + curl, bate com o numero exibido no portal) distribuidos em Saude 65, Urbanismo 25, Mobilidade 23, Governo 15, Covid 11, Educacao 11, Financas 11, Turismo 10, Cultura 7, Seguranca 6. Cobre TODOS os 8 dominios do critterio 1 e - decisivo - com atualizacao em 2026 em cada um deles, verificada dataset por dataset via package_show: SAMU 2026 (mod 2026-06-15), infracoes de transito (2026-07-01, 22 recursos), empresas da cidade (2026-07-03), IPTU (2026-07-03, 23 recursos incl. iptu_2026.csv), licenciamento ambiental (2026-06-17), licenciamento urbanistico (2026-06-17), dengue/zika/chikungunya (2026-05-20, 49 recursos), estoque de medicamentos nas farmacias (2026-04-28), despesas orcamentarias (2026-05-29), velocidade das vias 2025 (2026-03-05), unidades de seguranca publica (2026-03-06), defesa civil (2026-03-06), autos de infracao ambiental (2026-03-02), fluxo de veiculo por hora (2026-03-02), chamados CTTU (2026-03-06). Praticamente tudo em CSV+JSON, licenca ODbL uniforme, granularidade de registro individual em varios (SAMU, acidentes, infracoes) e GeoJSON mensal em acidentes. Series historicas longas e continuas: SAMU 2011-2026 (16 anos ininterruptos), censo escolar 2009-2020, velocidade das vias 2016-2025. E o unico candidato do Nordeste com dado transacional/de evento (nao apenas cadastro de equipamento) em saude, mobilidade E economia ao mesmo tempo.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EQUILIBRADA - o melhor do Nordeste neste criterio. Saude e a maior area (65) mas mobilidade (23), urbanismo (25), educacao (11) e financas (11) tem substancia real e atualizacao 2026, nao sao fachada. Seguranca e a area mais fraca (6 datasets, e sao cadastro de unidades + defesa civil, nao ocorrencias criminais) - o dado criminal vem do estado (SDS-PE), nao do municipio. Economia coberta por empresas-da-cidade-do-recife + CNAE + bares/restaurantes + IPTU/ITBI. Meio ambiente coberto por censo arboreo, residuos, licenciamento e autos de infracao. Unico dominio sem nada proprio: transporte publico em GTFS (a operacao e do Grande Recife Consorcio, metropolitano; nao consegui verificar - budget de WebSearch esgotado).

#### 2. Fortaleza/CE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

O maior catalogo municipal do Nordeste e - criticamente - o unico dos grandes em que eu CONFIRMEI que os arquivos realmente baixam. 635 datasets (contagem exata via package_list, bate com o portal) em CKAN, distribuidos nos grupos Saude 35, Economia 34, Gestao Publica 32, Transporte 25, Meio Ambiente e Urbanismo 17, Educacao 12, Esportes 9, Turismo 5, Cultura 3, Demografia 1. Formatos: CSV 321, GeoJSON 146, PDF 58, KMZ 25, XML 21, KML 19, XLSX 9, JSON 7. Duas provas de download real: (a) o GTFS oficial da ETUFOR baixou 8.263.085 bytes de application/zip, referente a marco/2026, com metadata de 01/04/2026 - transporte publico VIVO em 2026; (b) o cadastro fiscal do IPTU baixou 209.540.088 bytes de text/csv com cabecalho contendo NOME_LOGRADOURO, NUMERO, NOME_BAIRRO, CEP, XSIRGAS2000, YSIRGAS2000, AREA_TERRENO, AREA_EDIF, VALOR_VENAL_TERRENO, VALOR_VENAL_EDIFICACAO - ou seja dado por LOTE, georreferenciado, atualizado em 17/06/2026. Isso e materia-prima excepcional para 'informacao simples e util' em nivel de bairro. Somado a isso, Fortaleza e a unica cidade da lista com dado de SEGURANCA aberto de verdade e corrente, via SUPESP/SSPDS-CE: 14 tipos de indicador em XLSX, serie 2009-2025 mais 2026 fechado ate junho, com recorte por AIS (Area Integrada de Seguranca) e registro diario de CVLI.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

AMPLA mas DESIGUAL NO TEMPO - e este e o ponto que separa Fortaleza do Recife. Amplitude nominal e otima (8 dominios presentes). Mas a auditoria de datas por package_show mostra tres velocidades: (1) CORRENTE 2026 - IPTU cadastro fiscal (17/06/2026), licitacoes jan-mai/2026 (25/06/2026), ocorrencias da Coordenadoria de Protecao e Defesa Civil (10/06/2026), GTFS ETUFOR (01/04/2026); (2) RECENTE 2025 - sinistros de transito (22/07/2025, so GeoJSON), mapa de paradas de onibus (03/10/2025, so KMZ); (3) MORTO - mobilidade de onibus concentrada em 2012-2015 (linhas_onibus_2012/2013/2014, frota_onibus_fortaleza_06_2014, paradas_onibus_03_2015, dados_mobilidade_onibus_2015_gps_paradas_validacao), educacao para em censo-escolar-2021-sme e matricula-na-rede-municipal (30/01/2024), saude para em atendimentosaude1semestre2024 e vacinas_aplicadas_cores_*_2023, empresas-iss-fortaleza congelado em 03/04/2022. Resumo: transito/mobilidade e forte em INFRAESTRUTURA corrente (GTFS, ciclovias, semaforo, Bicicletar) e fraco em OPERACAO recente; saude e educacao sao os elos fracos em frescor.

#### 3. Salvador/BA — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Melhor infraestrutura GEOESPACIAL institucional do Nordeste, e de longe. Nao e um CKAN: e um ArcGIS Enterprise de verdade em geo.salvador.ba.gov.br, versao 11.5, com diretorio REST aberto expondo 23 pastas nominalmente secretariais - SEDUR (urbanismo), SEMOB (mobilidade), SMS (saude), SEFAZ (fazenda), SEINFRA (infraestrutura), SEMPRE/SEMPS (social), APA e LOUOS (ambiental/uso do solo), SECULT, FGM, FMLF, MAPA_BASE, SICAD. O Portal for ArcGIS subjacente responde a API sharing/rest/search e retorna 567 itens publicos consultaveis (3017 itens no total), com tipos maquina-consumiveis: Feature Service, WFS, WMS, Image Service, Dashboard, Shapefile. Ha sinal claro de manutencao ativa em 2026 (item 'Ortofoto 2026 Masterplan', servicos MASTERPLAN_2025, MasterPlan2025_Circuito, item lei_9778_2024_bairros_a). Servicos concretos que confirmei existir: Bairros, Logradouros, Hidrantes, Cianotoxinas, VISAMB_Analise_Agua (qualidade de agua), PDDU_2016, LICENCIAMENTO_SEDUR_ACTO, WebMapa do Centro Historico. Camada social real: rede_socioassistencial, bairros_de_abrangencia_cras, Mapa da Assistencia Social, IDHM/IDESH/UDHM, censo_2010_2022. Para um piloto que queira mapa de bairro com qualidade cartografica, Salvador e a melhor base do Nordeste.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA - reprova no criterio 3. Testei a cobertura por dominio na API do Portal e o resultado e desequilibrado de forma dramatica: 'transporte' 256 itens (mas o conteudo real que retorna e ciclovia/ciclofaixa - ssa_ciclovias_ciclofaixas_l e Rede Cicloviaria), 'escola' 105 itens (educacao_pe_na_escola, unidades_educacionais - LOCALIZACAO de escola, nao matricula/desempenho), 'saude' apenas 15 itens (unidades_de_saude_p e mapas A0 - LOCALIZACAO de unidade, nao atendimento), 'IPTU' 1 item (e e um logotipo: iptu_amarelo_logo), 'onibus' ZERO, 'seguranca' ZERO, 'criminalidade' ZERO. Diagnostico: Salvador publica ONDE ESTAO AS COISAS, nao O QUE ACONTECEU. Nao ha dado transacional/de evento em nenhum dominio - sem ocorrencias, sem atendimentos, sem matriculas, sem arrecadacao, sem operacao de transporte. Urbanismo/geo e meio ambiente = excelentes. Social = bom. Saude/educacao = so cadastro de equipamento. Seguranca e mobilidade operacional = ausentes. Financas municipais nao entram pelo canal de dados abertos.

#### 4. Maceio/AL — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Surpresa positiva e a melhor relacao amplitude/esforco fora do trio Recife-Fortaleza-Salvador. O Observatorio da Cidade (observatoriodacidade.maceio.al.gov.br, IPLAM) abriu e entrega 10 categorias tematicas com download em XLSX, CSV e PDF, mais paineis Power BI: dados territoriais (populacao, infraestrutura urbana, limites administrativos), assistencia social (cobertura e servicos de CRAS), educacao (escolas, matriculas, infraestrutura, indicadores de desempenho), infraestrutura, licenciamento de construcao, pracas publicas, saude (unidades, servicos, campanhas), transporte (linhas de transporte publico, infraestrutura de mobilidade), turismo e equipamentos esportivos. E notavel que educacao apareca com MATRICULA e INDICADOR DE DESEMPENHO, coisa que Salvador nao tem, e que haja licenciamento de construcao, que e proxy direto de dinamica urbana. Para uma capital que ate 2024 nao tinha nada, e um salto real.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

AMPLA NA VITRINE, PROFUNDIDADE NAO VERIFICADA. As 10 categorias cobrem social, educacao, saude, transporte, urbanismo, infraestrutura e turismo - amplitude nominal comparavel a Recife. Mas ha dois vazios estruturais: SEGURANCA ausente e FINANCAS/ORCAMENTO ausente do Observatorio (ficam no portal de transparencia e no licitacao.maceio.al.gov.br, que nao testei). MEIO AMBIENTE tambem nao aparece como categoria propria. E, diferente de Recife/Fortaleza, nao consegui confirmar granularidade nem serie historica de nenhum dataset - a pagina inicial nao expoe datas de atualizacao por item.

#### 5. Sobral/CE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Melhor cidade MEDIA do Nordeste em dados abertos, e o unico municipio nao-capital da lista que passou do nivel 'so licitacao'. O portal transparencia.sobral.ce.gov.br/dadosAbertos abriu e oferece CSV, planilha eletronica e uma 'Api Dados Abertos', com cobertura declarada de janeiro/2017 a JULHO/2026 e atualizacao automatizada - frescor melhor que o de varias capitais. Alem do bloco financeiro obrigatorio (licitacoes, contratos, receitas, empenhos, liquidacoes, pagamentos, diarias, obras publicas), publica itens que a maioria das cidades medias nao publica: Medicamentos, Unidades de Saude, Veiculos, Terceirizados, Inventarios, Concursos e Selecoes e Pesquisas de Satisfacao. Some-se a isso que Sobral e Ceara, logo herda o SUPESP/SSPDS-CE em seguranca (XLSX, 2009-2026, recorte por AIS), o que fecha um dominio que Sobral sozinha nao teria. Vale como piloto de contraste: testar se o metodo funciona fora de capital.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA em financas/administracao - reprova no criterio 3 se avaliada isoladamente. Dos ~17 conjuntos, a grande maioria e financeira ou de gestao de pessoal/patrimonio. Saude entra apenas como cadastro (unidades, medicamentos), nao como atendimento. NAO ha educacao (ironico, porque Sobral e nacionalmente conhecida pelo IDEB - o dado de desempenho existe no INEP, nao no municipio), NAO ha mobilidade/transito, NAO ha meio ambiente, NAO ha urbanismo/geo, NAO ha comercio/economia. Seguranca so via estado.

#### 6. Natal/RN — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

INCLUIDA COMO CASO NEGATIVO DOCUMENTADO, nao como recomendacao - e uma armadilha para quem escolher piloto pela reputacao. Natal aparece em listas de 'cidades com dados abertos' por causa do Portal da Transparencia da Mobilidade Urbana da STTU, mas eu abri a infraestrutura e ela esta degradada e monotematica. O que de fato existe e um CKAN em dados.natal.br cuja API responde e devolve exatamente 19 datasets, TODOS de onibus: bilhetagem-eletronica 2018 a 2022, custos-operacionais de 2018/2019/2020, horarios, itinerarios, linhas, paradas, e rotas por empresa (Cidade do Natal, Conceicao, Guanabara, Reunidas, Santa Maria, Via Sul). Zero saude, zero educacao, zero seguranca, zero financas, zero urbanismo, zero meio ambiente, zero economia. Dado mais recente: 2022. Serve como aviso: reputacao de dados abertos nao sobrevive sozinha.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MONOTEMATICA E PARADA - a pior nota possivel no criterio 3. Um unico dominio (mobilidade/transporte publico) de oito. E dentro do proprio dominio a serie morreu: bilhetagem para em 2022, custos operacionais param em 2020. Nao ha um segundo dominio para 'equilibrar'.

#### 7. Sao Luis/MA — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

NAO RECOMENDADA - verificada e descartada. A pagina oficial de dados abertos abriu e o inventario e minusculo: 4 conjuntos, todos financeiros. Registro aqui para que ninguem gaste tempo: Sao Luis e a maior cidade do Nordeste sem catalogo multidominio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MONOTEMATICA - 1 dominio de 8 (financas/administracao). Nada de saude, educacao, seguranca, mobilidade, urbanismo, meio ambiente ou economia. E um portal de transparencia fiscal com rotulo de dados abertos, nao um catalogo.

#### 8. Aracaju/SE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

PARCIALMENTE VERIFICADA - potencial tecnico real mas escopo nao confirmado. A pagina 'DADOS ABERTOS - API' do Portal da Transparencia existe e documenta uma API REST de verdade, com paginacao por ?page= e politica de uso publicada (limite de 100 requisicoes HTTP/HTTPS por segundo e exigencia de IP de origem em territorio brasileiro). Essa politica escrita e um sinal de maturidade tecnica que falta em Sao Luis, Campina Grande e Teresina. Mas nao consegui enumerar os endpoints, logo nao posso afirmar quais dominios cobre. Pelo contexto (esta dentro do Portal da Transparencia) a expectativa e financas/administracao, nao os 8 dominios.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

NAO VERIFICAVEL COM O QUE COLETEI. A lista de endpoints nao esta no HTML servido - deve ser carregada dinamicamente ou estar em subpagina. Procurei no corpo da pagina por 'despesa', 'receita', 'licitacao', 'servidor', 'contrato', 'empenho', 'diaria', 'folha' e 'endpoint' e NAO encontrei nenhuma ocorrencia. Assumir cobertura ampla aqui seria invencao. Trate Aracaju como 'requer investigacao manual antes de decidir'.

#### 9. Campina Grande/PB — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

NAO RECOMENDADA - verificada e descartada. A pagina de dados abertos abriu e tem uma API REST bem parametrizada, mas para UM unico assunto: licitacoes. Registro para poupar tempo de quem for auditar a Paraiba.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MONOTEMATICA - 1 dominio de 8 (financas/compras publicas). A profundidade dentro desse unico tema e boa (filtros por ano 2023-2025+, 12+ modalidades, fase, 30+ orgaos contratantes, tipo de objeto), o que so reforca o diagnostico: e um sistema de licitacao exposto como API, nao um programa de dados abertos.

### Execução 2 — agente `execucao-2`

#### 1. Recife/PE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

MELHOR PILOTO DO NORDESTE. Unica cidade do NE com cobertura genuinamente equilibrada nos 8 dominios pedidos, confirmada por endpoint de API que eu abri: group_list retorna Saude 65, Urbanismo 25, Mobilidade 23, Governo e Politica 15, Educacao 11, Financas 11, Covid 11, Turismo 10, Cultura 7, Seguranca Publica 6, Meio Ambiente 5, Esportes 2. Nenhum dominio-alvo esta zerado - e isso e raro. Frescura real em 2026: multas de transito da CTTU com CSV ano a ano de 2006 a 2025 e metadata_modified 2026-07-01; estacoes de bike atualizadas em 02/03/2026 com periodicidade declarada semestral. Tem granularidade fina (registro individual de infracao, fluxo de veiculos a cada 15 minutos, unidades de saude georreferenciadas). E a 3a capital do Brasil no ODI Cidades 2023 (38%), a melhor do NE. RESSALVA HONESTA: o frontend/indice do CKAN esta com HTTP 500 - o acervo se acessa por API e por paginas de dataset individuais, nao pela listagem. Para um piloto isso e contornavel (package_list + package_show), mas exige tratar retry/erro.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EQUILIBRADA - a melhor do NE. Todos os 8 dominios do briefing presentes: saude (65), seguranca (6), educacao (11), mobilidade (23), comercio/economia (via urbanismo/empresas cadastradas), financas (11), urbanismo (25), meio ambiente (5). Concentracao em Saude, mas sem vazio nos demais. Pontos fracos relativos: Meio Ambiente (5) e Seguranca (6) sao rasos em contagem, e 11 datasets ainda sao de Covid (legado).

#### 2. Fortaleza/CE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

SEGUNDO MELHOR, E O MAIS CONFIAVEL TECNICAMENTE. CKAN com 635 datasets e API que respondeu em 100% das chamadas que fiz (contraste direto com o Recife). Volume e formatos abertos excelentes: CSV 321, GeoJSON 146, KMZ 25, XML 21, KML 19, XLSX 9, JSON 7 - e apenas 58 PDF. Camada geoespacial e o ponto mais forte (146 GeoJSON, redes de agua, canais, semaforos, fiscalizacao eletronica). Dado mais novo: 31/07/2026. RESPOSTA DIRETA AO BRIEFING ('verifique se ainda esta vivo em 2026'): o portal esta vivo, mas o historico forte de MOBILIDADE nao esta. Abri o grupo transporte: os dados de onibus sao de 2022 com referencia 03/2015, nao ha GTFS, e obitos por acidente de transito pararam em 2022. Seguranca tem 1 unico dataset, de 2022. Economia toda em 2022/2023. Saude com apenas 1 atualizacao em 2025. Serve como piloto se o foco for geo/urbanismo/financas-licitacoes; NAO serve se o foco for mobilidade em tempo real ou seguranca.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

DESEQUILIBRADA NO TEMPO, nao no papel. Na contagem parece ampla - Saude 35, Economia 34, Gestao Publica 32, Transporte 25, Meio ambiente/Urbanismo 17, Educacao 12, Esportes 9, Turismo 5, Cultura 3, Demografia 1. Mas ao abrir grupo por grupo, so administrativo/fiscal e geo estao correntes em 2026. Seguranca e efetivamente um vazio (1 dataset de 2022). Educacao (12) e rasa. Ou seja: amplitude nominal boa, cobertura VIVA concentrada em 2 areas.

#### 3. Salvador/BA — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

TERCEIRO LUGAR, MAS APENAS COMO PILOTO GEOESPACIAL. Nao encontrei catalogo tabular auditavel, porem o servidor ArcGIS municipal esta plenamente vivo (versao 11.5) e e o achado mais forte de Salvador: expoe pastas de servico de praticamente todas as secretarias - SMS (saude), SEMOB (mobilidade), SEDUR e LOUOS/PDDU (urbanismo/zoneamento), SEFAZ (financas), SEINFRA (infraestrutura), APA (meio ambiente), SECULT, SECIS, SEMPS/SEMPRE (social), MASTERPLAN_2024/2025. Confirmei acesso real a dado: o MapServer de Bairros tem capabilities 'Map,Query,Data' e supportedQueryFormats 'JSON, geoJSON, PBF' - da para consultar programaticamente, nao e so figura. Amplitude institucional entre dominios e alta. RESSALVA: quase tudo e geo; nao pude comprovar series temporais nem dados tabulares de saude/seguranca/educacao. Recomendo como piloto so se o produto for mapa/territorio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

AMPLA EM ORGAOS, ESTREITA EM TIPO DE DADO. As pastas ArcGIS cobrem saude, mobilidade, urbanismo, financas, meio ambiente, social e cultura - amplitude institucional comparavel a Recife. Mas o acervo verificado e essencialmente geoespacial (camadas/limites/licenciamento), nao series estatisticas. Seguranca nao aparece como pasta. Sem evidencia de dados de educacao. Portanto NAO e cobertura equilibrada no sentido do briefing.

#### 4. Maceio/AL — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

DARK HORSE - melhor do que a reputacao sugere, e a unica surpresa positiva fora do trio Recife/Fortaleza/Salvador. O 'Observatorio da Cidade' (Iplam) esta vivo e entrega download real de microdados em XLSX e CSV, com 10-11 categorias que cobrem saude, educacao, transporte, infraestrutura, licenciamento de obras, assistencia social (CRAS), pracas, turismo, areninhas, economia e trabalho e dados territoriais. Isso e amplitude tematica maior do que qualquer municipio nao-capital do NE que verifiquei. Vale como piloto secundario ou como caso de 'cidade media com dados escondidos'. MAS nao recomendo como piloto principal: nao ha API, os downloads saem por links de Google Sheets, nao ha data de atualizacao publicada em nenhum lugar da pagina, e faltam justamente seguranca, financas/orcamento e meio ambiente. O DataMaceio, anunciado em 2024 com escopo bem mais amplo, eu nao consegui localizar no ar.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MEDIANA E DESIGUAL. Presentes: saude, educacao, mobilidade/transporte, urbanismo (licenciamento + territorial), social, comercio/economia, turismo. AUSENTES tres dominios do briefing: seguranca, financas/orcamento e meio ambiente. Como as 10 categorias parecem ter poucos arquivos cada, a profundidade e baixa mesmo onde ha cobertura.

#### 5. Natal/RN — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

DESCARTADO - portal morto. Registro aqui porque e um resultado importante e contraintuitivo: Natal e uma das APENAS TRES cidades do Nordeste com portal municipal de dados abertos no catalogo nacional curado (ao lado de Fortaleza e Recife), listada como CKAN sob o nome 'Portal da Transparencia e Mobilidade Urbana de Natal'. Ou seja, no papel Natal seria o 3o candidato natural do NE. Na pratica o servidor recusa conexao. Se alguem citar dados.natal.br como fonte viva em 2026, esta errado.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Impossivel avaliar - nenhum dataset acessivel. Cobertura efetiva = zero.

#### 6. Sobral e Campina Grande (municipios nao-capitais)/CE/PB — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

DESCARTADOS COMO PILOTO - dados reais, porem so fiscais. Sao os dois unicos municipios nao-capitais do NE onde encontrei acesso aberto de fato funcionando, e por isso vale registrar. Sobral expoe API JSON (na verdade a API do TCE-CE) com municipios, unidades gestoras, orgaos, agentes publicos, itens remuneratorios, contas extra-orcamentarias. Campina Grande documenta API GET de Licitacoes e mantem um Observatorio com paineis economicos e de educacao. Mas ambos falham no criterio 1 (amplitude) e no criterio 3 (equilibrio): e orcamento/licitacao/pessoal e quase nada mais. Zero saude, zero seguranca, zero mobilidade, zero meio ambiente. Nota util: a API do TCE-CE cobre TODOS os municipios cearenses, o que permitiria um piloto fiscal multi-cidade no Ceara sem depender de cada prefeitura.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO CONCENTRADA - exatamente o caso que o briefing manda penalizar. Praticamente 100% em financas/orcamento e gestao de pessoal. Campina Grande adiciona educacao (IDEB) e socioeconomia, mas via paineis, com formato de download nao confirmado.

#### 7. Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

DESCARTADAS. Agrupo aqui as capitais que o briefing pediu e que verifiquei nao terem base utilizavel, para o auditor poder conferir cada tentativa. Nenhuma das quatro possui portal municipal de dados abertos - o catalogo nacional curado confirma que apenas Fortaleza, Recife e Natal tem portal municipal no NE inteiro. Teresina tem so Portal da Transparencia (SPA, sem secao de dados abertos confirmada). Joao Pessoa anunciou politica de dados abertos mas o portal seguia 'em desenvolvimento' (noticia de 2022) e depende do dados.pb.gov.br estadual, que tem apenas 7 datasets. Sao Luis tem pagina de dados abertos que redireciona e retorna vazio. Aracaju tem API JSON documentada mas o certificado TLS do dominio nao valida, o que impede consumo confiavel. Tambem registro os portais estaduais que testei como possivel fonte de apoio - e todos sao rasos ou mortos.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

INSUFICIENTE em todas. Onde ha algo, e financas/orcamento e pessoal. Nenhuma dessas capitais apresentou cobertura em saude + seguranca + educacao + mobilidade simultaneamente. Todas as quatro foram classificadas 'opaco' (0-20%) no ODI Cidades 2023.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Recife/PE — `red_flags`:**

RISCO OPERACIONAL GRAVE E CONFIRMADO HOJE (31/07/2026): o portal esta parcialmente FORA. Reproduzi multiplas vezes com curl - a UI web e os DOWNLOADS estao retornando HTTP 500, apenas a API de metadados responde. Concretamente: https://dados.recife.pe.gov.br/ -> 500; /dataset -> 500; /dataset/<slug> -> 500; package_search -> 500; group_list -> 500. Testei o download real de dois recursos e ambos deram 'Internal Server Error' (HTTP 500, 21 bytes): iptu_2026.csv e solicitacoes-de-atendimento-2026.csv. Ou seja: os metadados prometem os arquivos, mas os arquivos NAO baixam neste momento. Funcionam: package_list (200) e package_show (200). Nota de honestidade: a leitura de /dataset que aparece como fetch-ok abaixo foi obtida no inicio desta sessao (WebFetch tem cache de 15 min) e depois passou a 500 - registrei os dois estados. Isso pode ser instabilidade transitoria, mas para um piloto e obrigatorio revalidar o download antes de decidir. Segundo alerta: 11 datasets ainda sao de Covid (legado inflando a contagem). Terceiro: acidentes-de-transito com vitimas tem paginas por ano so ate 2016 (o slug ...-2025 retorna 404 confirmado); o dado recente esta no dataset agregado 'acidentes-de-transito-com-e-sem-vitimas' (mod 2026-03-02).

**Fortaleza/CE — `red_flags`:**

1) Inflacao aparente do catalogo: os grupos tematicos somam apenas ~168 datasets dos 635 - a maioria esta sem grupo, o que degrada a descoberta e sugere curadoria irregular. 2) Legado nao aposentado: ha pares duplicados com e sem hifen (meio-ambiente-canais / meio_ambiente_canais, meio-ambiente-mangues / meio_ambiente_mangues, meio-ambiente-valas-e-drenos / meio_ambiente_valas_e_drenos) e dezenas de datasets de 2012-2015 misturados aos correntes sem marcacao de descontinuidade. 3) Pobreza de formato maquina-nativo: so 7 JSON em 635 datasets, e vias importantes entregues apenas em KMZ (paradas de onibus) ou GeoJSON (sinistros de transito) - nao ha CSV tabular desses. 4) Educacao e saude sem dado 2025/2026 que eu tenha conseguido localizar - so 6 dos 635 slugs mencionam 2025 ou 2026. 5) A seguranca aberta e ESTADUAL (SUPESP/SSPDS-CE) e o recorte e por AIS, nao por bairro; o municipio so publica efetivo-guarda-municipal e ocorrencias da Defesa Civil. 6) O portal do SUPESP faz redirect 301 de www.supesp.ce.gov.br para www.ce.gov.br/supesp - links antigos quebram. 7) dados.ce.gov.br (portal estadual de dados abertos que eu esperava existir) NAO RESOLVE - conexao falhou (http=000); nao ha camada estadual CKAN no Ceara equivalente a de PE e BA.

**Salvador/BA — `red_flags`:**

1) O portal-vitrine dados.salvador.ba.gov.br NAO E MAQUINA-LEGIVEL: WebFetch retornou apenas o titulo (SPA JavaScript), e curl confirmou 1.618 bytes de shell HTML. Pior, os quatro endpoints de catalogo padrao que testei retornaram 404 servidos por IIS: /api/feed/dcat-us/1.1.json, /api/feed/dcat-ap/2.1.1.json, /data.json e /api/v3/datasets. Nao existe feed DCAT nem catalogo enumeravel - so descobri o acervo entrando por tras, via sharing/rest/search do Portal for ArcGIS. Um consumidor de dados abertos comum nao encontra nada. 2) Nao consegui confirmar CSV tabular em nenhum dominio - o acervo e vetorial/raster. Comunicacao publica menciona CSV/KML/GeoJSON/GeoTIFF/PNG mas nao verifiquei um download CSV real. 3) Presenca de itens de teste e ruido no acervo publico ('Teste' como pasta REST, ico_outros, iptu_amarelo_logo, capa_*, Carrossel - Salvador Dados) - inventario nao curado. 4) PDDU publicado e o de 2016. 5) Seguranca zerada: o dado criminal da Bahia so aparece no CKAN estadual como um unico dataset, morte_violenta_estado, sem recorte de bairro. 6) Dependencia de stack proprietario ArcGIS - custo e lock-in para um piloto.

**Maceio/AL — `red_flags`:**

1) O geoportal Data Maceio esta FORA DO AR: https://www.datamaceio.com.br/ retornou ECONNREFUSED em 191.252.191.140:443 - conexao recusada, nao e 404. Isso derruba a camada geoespacial de Maceio e mostra fragmentacao (Observatorio da Cidade, DataMaceio, Massayo 360 e licitacao.maceio.al.gov.br sao iniciativas separadas, uma delas morta). 2) SEM API - o proprio Observatorio so oferece download de arquivo; pior, os downloads sao servidos via links de Google Sheets, o que significa dependencia de terceiro, sem versionamento, sem contrato de esquema e sujeito a quebra silenciosa se alguem editar a planilha. Isso e frágil para pipeline de producao. 3) Nenhuma data de atualizacao por dataset visivel na pagina inicial - so achei a referencia '957K habitantes (2022)'. Nao pude auditar frescor, e frescor foi justamente o que separou Recife de Fortaleza. 4) Uso intensivo de Power BI, que e visualizacao, nao dado. 5) Plataforma nova (lancada 2024), sem historico de continuidade comprovado.

**Sobral/CE — `red_flags`:**

1) Cobertura desequilibrada: sem educacao, mobilidade, meio ambiente, urbanismo nem economia. Para um projeto cujo criterio 3 penaliza justamente isso, Sobral e piloto de nicho, nao piloto principal. 2) A 'Api Dados Abertos' e mencionada na pagina mas eu NAO testei nenhum endpoint dela - nao sei se responde, qual o contrato nem se e documentada. Tratem como nao verificada. 3) Nao verifiquei o download de nenhum CSV especifico - so confirmei que a pagina lista os formatos. 4) O intervalo '2017 a julho/2026' e declaracao do proprio portal, nao medicao minha. 5) Municipio pequeno (~210 mil hab.): volume de dado por dominio sera baixo, o que limita analise por bairro.

**Natal/RN — `red_flags`:**

Quatro falhas tecnicas que eu reproduzi, em ordem de gravidade. 1) dados.natal.br entrega HTTP 500 na interface web: baixei 15.731 bytes de pagina de erro e o HTML revela build CKAN antiga, com assets versionados em ':version:2018-02-06T05:36:31.36' - infraestrutura de 2018 nao atualizada. 2) dadosabertos.natal.br tem CERTIFICADO TLS EXPIRADO - WebFetch abortou com 'certificate has expired'; so consegui o conteudo forcando curl -k (200, 14.949 bytes). Cliente HTTPS padrao nao acessa. 3) O 'Area do Desenvolvedor' anunciada, desenvolvedor.dados.natal.br, NAO RESOLVE: curl retornou http=000 com 0 bytes baixados - o host nao conecta. 4) Sinal de abandono no proprio HTML: a pagina de contato traz o placeholder de template 'mailto:info@example.com', ou seja o site foi publicado sem nunca ser finalizado. Somando: dos tres hosts do ecossistema de dados abertos de Natal, um da 500, um tem cert expirado e um nao existe. So a API sobreviveu.

**Sao Luis/MA — `red_flags`:**

Inventario de 4 datasets sem metadados, sem dicionario de dados, sem catalogo pesquisavel e sem descoberta. Apenas 1 dos 4 tem API (Folha); os outros 3 sao CSV avulso. Nao ha licenca declarada por dataset nem frequencia de atualizacao. Nao verifiquei se os CSVs baixam de fato.

**Aracaju/SE — `red_flags`:**

1) PROBLEMA DE TLS: WebFetch falhou com 'unable to verify the first certificate' - cadeia de certificacao incompleta no servidor. So obtive a pagina com curl -k (200, 170.247 bytes). Qualquer cliente HTTPS estrito (incluindo muitas bibliotecas Python/Node com verificacao padrao) vai quebrar ao consumir essa API. 2) O portal e WordPress com Elementor Pro - os unicos endpoints de API que consegui enumerar no HTML sao os do proprio WordPress (/wp-json/, /wp-json/wp/v2/pages/26921), NAO a API de dados. Nao localizei a URL base da API de dados abertos. 3) Restricao de IP brasileiro na politica de uso limita hospedagem do piloto no exterior. 4) Nao testei nenhuma chamada real de dado.

**Campina Grande/PB — `red_flags`:**

1) Ultima atualizacao registrada em 29/08/2025 - quase um ano sem movimento em 31/07/2026. 2) Formato de saida nao declarado explicitamente na documentacao (nao afirma CSV, XLSX nem JSON). 3) Nao chamei o endpoint /dados-abertos/api/v1/response/, so li a documentacao - a API em si nao foi testada. 4) Nada de saude, educacao, seguranca, mobilidade, urbanismo, meio ambiente ou economia.

### Execução 2 — agente `execucao-2`

**Recife/PE — `red_flags`:**

Instabilidade do portal e o maior risco: a home e a listagem /dataset dao HTTP 500, e package_show/package_search/group_show falharam de forma intermitente (500) durante a sessao - o mesmo endpoint funcionou para um id e falhou para outro na mesma janela. Nao e portal morto (paginas de dataset individuais e package_list/group_list funcionam, e ha dados de 2026), mas a camada de indice esta quebrada e um piloto precisa de retry. Legado de Covid inflaciona a contagem. Nao consegui auditar a frescura dos 65 datasets de saude um a um - group_show deu 500.

**Fortaleza/CE — `red_flags`:**

Defasagem tematica e o problema central, e ela e mascarada pelo volume. Transporte: 'Linhas de Onibus - Ref. 03/2015', 'Paradas de Onibus - Ref. 03/2015' e 'Bilhetagem (Jan-Jun 2014)' atualizados em 2022; sem GTFS. Seguranca: 1 dataset ('Chamadas da Policia', CSV, 18/10/2022). Economia: mais recente 09/10/2023. Saude: so 'Lista de Medicamentos' (03/10/2025), resto 15/07/2024 ou anterior. Ha tambem formatos hostis no acervo (RAR 10, KMZ 25) e alguns datasets so em XML/RAR. Atencao: o slug de grupo 'meio-ambiente-e-urbanismo' que tentei retorna vazio - os slugs reais sao 'meioambiente', 'seguranca', 'transporte', 'planejamentoegestao', etc.

**Salvador/BA — `red_flags`:**

Nao consegui enumerar o Salvador Dados: a home carregou mas e SPA em JavaScript (HTML devolve so o titulo) e os tres caminhos de catalogo que testei falharam - /search?collection=Dataset deu 404, o feed DCAT /api/feed/dcat-us/1.1.json deu 404 e /api/search/v1/collections/dataset/items deu 404. Entao a alegacao de terceiros de que oferece CSV/KML/GeoJSON/GeoTIFF/PNG + WMS/WFS ficou NAO VERIFICADA por mim. Alem disso o acesso ArcGIS e desigual: a pasta SEMOB (mobilidade) exigiu Sign In e nao abriu, e Bairros/FeatureServer deu erro 500 ('Server object extension featureserver not found') - so o MapServer funciona. Ha tambem uma pasta 'Teste' em producao. Salvador foi classificada 'opaco' (0-20%) no ODI Cidades 2023.

**Maceio/AL — `red_flags`:**

Sem API - acesso so por download manual, e os arquivos sao servidos via links do Google Sheets, o que e fragil para pipeline automatizado e pode quebrar sem aviso. NENHUMA data de publicacao ou atualizacao aparece na pagina, entao nao consigo afirmar que os dados sao de 2024-2026 (risco real de acervo estatico). PDF aparece como formato de saida ao lado de CSV/XLSX. O DataMaceio prometido em 2024 nao foi localizado: dados.maceio.al.gov.br nao resolve em DNS (ENOTFOUND) e a materia oficial nao publica URL. Maceio foi 'opaco' (0-20%) no ODI Cidades 2023.

**Natal/RN — `red_flags`:**

Portal completamente inacessivel: ECONNREFUSED 52.2.32.139:443 em duas tentativas independentes (raiz e /dataset). Nao e 404 nem 500 - o servidor nao aceita conexao, o que sugere infraestrutura desligada e nao pagina movida. O catalogo nacional continua listando o portal, entao a fonte secundaria esta desatualizada. Natal foi 'opaco' (0-20%) no ODI Cidades 2023.

**Sobral e Campina Grande (municipios nao-capitais)/CE/PB — `red_flags`:**

Amplitude insuficiente para o projeto. Em Sobral, os dados abertos nao sao da prefeitura e sim intermediados pela API do TCE-CE (api-dados-abertos.tce.ce.gov.br) - dependencia de terceiro e escopo limitado ao SIM (Sistema de Informacoes Municipais). Em Campina Grande, apesar da pagina prometer 'Receitas, Despesas, Licitacoes e Contratos', so Licitacoes tem documentacao de API completa; e no Observatorio nao consegui confirmar se existe CSV/API ou se sao apenas paineis com 'Ver Mais'. Sobre Feira de Santana: o WebSearch indicou que o projeto civico 'Dados Abertos de Feira' encerrou atividades em setembro/2023 - nao abri o site, portanto nao confirmei.

**Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE — `red_flags`:**

Aracaju: 'unable to verify the first certificate' - falha de cadeia TLS na URL oficial de dados abertos, inviabiliza pipeline sem desabilitar verificacao (nao recomendado). Sao Luis: redirect 301 para outro host e a pagina final voltou em branco. Teresina: o Portal da Transparencia devolveu somente o titulo (SPA) e nao localizei dominio dados.teresina.pi.gov.br - o portal citado em noticias oficiais e um projeto, nao um acervo. Pernambuco estadual: www.dadosabertos.pe.gov.br nao resolve em DNS (ENOTFOUND) apesar de constar no catalogo nacional. Bahia estadual: CKAN vivo mas com apenas 21 datasets e rodape '©2024'. Paraiba estadual: 7 datasets. Ceara Transparente: lista de datasets carregada por JavaScript ('Carregando...'), nao pude contar nem confirmar dados de SSP/saude apesar de haver 70+ categorias e API prometida.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

METODO. Dois canais: WebSearch para descobrir e depois verificacao ativa de CADA URL citada. Para verificar usei WebFetch e, quando o WebFetch falhava ou quando eu precisava de precisao que um resumo de LLM nao da (contagem exata de datasets, data de atualizacao por dataset, codigo HTTP, tamanho de arquivo, cabecalho de CSV), usei curl direto pela ferramenta Bash. Essa combinacao foi decisiva: em varios pontos o resumo do WebFetch divergiu do dado bruto e o bruto ganhou.

CORRECAO DE ERRO QUE O CANAL AUTOMATICO INTRODUZIU. O resumo de WebFetch do package_list do Recife afirmou "378 entries" e o do Fortaleza afirmou "aproximadamente 1.000+ dataset identifiers". Baixei os dois JSONs com curl e contei: Recife tem 221 datasets e Fortaleza tem 635. Os dois numeros que eu contei batem exatamente com os numeros exibidos nas respectivas paginas dos portais; os dois numeros do resumo automatico estavam errados. Todos os totais que reportei acima vem da minha contagem, nao do resumo.

BUSCAS REALIZADAS (8, ate esgotar o orcamento da sessao): portal de dados abertos de Fortaleza; portal de dados abertos de Recife; Salvador/CKAN; Natal + Teresina + Joao Pessoa; Maceio + Aracaju + Sao Luis; Sobral + Campina Grande + Feira de Santana + Petrolina + Jaboatao; SSPDS/SUPESP Ceara; SDS Pernambuco criminalidade. O orcamento de WebSearch da sessao (200) estourou nas duas ultimas tentativas (GTFS do Grande Recife Consorcio e portal estadual do Ceara), que por isso ficaram sem confirmacao - ver lacunas abaixo. Apos o estouro continuei verificando por WebFetch e curl, que nao tem esse limite.

O QUE VERIFIQUEI ALEM DE "A PAGINA ABRIU". Fiz teste de download real, nao apenas de metadado, porque metadado que promete arquivo inexistente e o erro classico. Resultados: Fortaleza - baixei o GTFS da ETUFOR (application/zip, 8.263.085 bytes) e o CSV do cadastro fiscal do IPTU (text/csv, 209.540.088 bytes, com cabecalho real contendo NOME_BAIRRO, XSIRGAS2000, YSIRGAS2000, VALOR_VENAL_TERRENO). Recife - tentei baixar iptu_2026.csv e solicitacoes-de-atendimento-2026.csv e AMBOS retornaram HTTP 500 "Internal Server Error" (21 bytes). Salvador - consultei o geoservico Bairros/MapServer e a API sharing/rest/search, ambos 200. Auditei data por dataset via package_show em 19 datasets (11 do Recife, 7 de Fortaleza, mais checagens pontuais) em vez de confiar em declaracao generica de "atualizado regularmente".

ACHADO MAIS IMPORTANTE, E O QUE MUDA A RECOMENDACAO. O Recife ganha nos criterios 1 e 3 com folga, mas HOJE (31/07/2026) o portal esta parcialmente fora e isso e reproduzivel: interface web (/, /dataset, /dataset/<slug>), package_search e group_list todos em HTTP 500; apenas package_list e package_show em 200; e os downloads de recurso em 500. Detalhe de honestidade importante: a leitura de https://dados.recife.pe.gov.br/dataset que marquei como fetch-ok foi obtida no inicio da sessao, quando funcionava, e o WebFetch mantem cache de 15 minutos - quando revalidei com curl o mesmo caminho dava 500. Registrei os dois estados em vez de escolher o que favorecia a conclusao. Consequencia pratica: nao decidam o piloto sem repetir o teste de download do Recife por alguns dias. Se a instabilidade for transitoria, Recife e a escolha. Se persistir, Fortaleza e a escolha, porque foi a unica grande cidade em que eu confirmei arquivo grande baixando de fato.

RANKING RESULTANTE. 1. Recife (mais amplo, mais equilibrado, mais fresco, mas com risco de disponibilidade confirmado hoje). 2. Fortaleza (maior acervo, download comprovado, seguranca estadual excelente via SUPESP, mas frescor desigual - mobilidade operacional em 2012-2015, educacao ate 2021, saude ate 2024). 3. Salvador (geo/urbanismo de nivel superior, porem publica localizacao e nao evento, com seguranca e transito zerados). 4. Maceio (amplitude surpreendente no Observatorio da Cidade, mas sem API, dependente de Google Sheets, sem datas auditaveis e com o geoportal DataMaceio fora do ar). 5. Sobral (melhor cidade media, CSV/XLSX ate jul/2026, mas concentrada em financas). 6. Natal (caso negativo documentado - monotematica, parada em 2022, com tres hosts degradados).

VERIFICADAS E DESCARTADAS, COM RESULTADO DE FETCH REGISTRADO. Jaboatao dos Guararapes: https://portaldatransparencia.jaboatao.pe.gov.br/dados-abertos-2 retornou HTTP 403 e a raiz do dominio tambem 403 - bloqueio de acesso automatizado (provavel WAF), nao consegui avaliar o conteudo. Caruaru: https://transparencia.caruaru.pe.gov.br/ retornou HTTP 503 (190 bytes) - servico indisponivel. Olinda (https://www.olinda.pe.gov.br/, 200) e Petrolina (https://www.petrolina.pe.gov.br/, 200): sites institucionais no ar mas SEM nenhuma mencao a "dados abertos" na home. Feira de Santana: https://transparencia.feiradesantana.ba.gov.br/ respondeu 200 mas sem mencao a dados abertos, e a iniciativa comunitaria Dados Abertos de Feira teve suas atividades ENCERRADAS em setembro de 2023 (nao e fonte viva). Joao Pessoa: https://transparencia.joaopessoa.pb.gov.br/ carrega apenas o shell de uma SPA (WebFetch nao extraiu conteudo); os dados abertos vivem dentro do proprio portal de transparencia e a propria prefeitura noticiou que o Portal de Dados Abertos municipal segue "em fase de desenvolvimento" - nao ha catalogo multidominio. Teresina: nao localizei portal de dados abertos; a comunicacao oficial fala em plataforma de dados abertos como projeto futuro e o que existe e o Portal da Transparencia. NAO abri o portal de Teresina, logo esta e a informacao mais fraca do meu levantamento.

CAMADA ESTADUAL (contexto, nao substituto do municipal). Verificados por API: dados.pe.gov.br responde 200 com 42 datasets, quase todos financeiros mais legado Covid; dados.ba.gov.br responde 200 com 20 datasets, financeiros mais Covid mais UM unico dataset de seguranca (morte_violenta_estado, agregado estadual). dados.ce.gov.br NAO RESOLVE (curl http=000, falha de conexao) - o Ceara nao tem CKAN estadual equivalente, o que torna o SUPESP/SSPDS-CE ainda mais valioso por ser a excecao. Em seguranca a hierarquia real do Nordeste e clara: Ceara (SUPESP, XLSX, 14 indicadores, 2009-2026, recorte por AIS) > Pernambuco (SDS, planilhas e PDF mais Power BI, mensal, recorte por municipio, sem bairro) > Bahia (um dataset agregado estadual).

LACUNAS QUE NAO CONSEGUI FECHAR - ASSUMIDAS, NAO MASCARADAS. (a) GTFS/tempo real do Grande Recife Consorcio: nao verificado, orcamento de WebSearch esgotado, e https://cidadao.granderecife.pe.gov.br/ nao conectou (http=000). Isso importa porque e a unica lacuna de dominio do Recife e porque, se nao existir, Fortaleza fica sozinha com transporte publico padronizado no Nordeste. (b) Endpoints e dominios da API de Aracaju: nao enumerados. (c) API de dados abertos de Sobral: mencionada no portal, nunca chamada. (d) API de licitacoes de Campina Grande: documentacao lida, endpoint nao chamado. (e) Existencia de CSV tabular em Salvador: comunicacao publica menciona CSV/KML/GeoJSON/GeoTIFF/PNG, eu confirmei geoservicos mas NENHUM download CSV. (f) Frescor e granularidade dos datasets de Maceio: a pagina nao expoe data por item e eu nao abri as planilhas. (g) Teresina: nenhum fetch realizado. (h) Granularidade de bairro: confirmei dado no nivel de lote/endereco so em Fortaleza (IPTU com coordenada) e no nivel de registro individual em Recife (SAMU, infracoes, acidentes); em Maceio e Sobral nao confirmei recorte submunicipal. Nenhuma URL neste relatorio foi escrita de memoria - todas passaram por WebFetch ou curl nesta sessao, e as que falharam estao marcadas como fetch-falhou com o erro exato.

#### Fontes que a execução 1 NÃO confirmou (5 de 35)

- `[fetch-falhou]` **Maceio/AL** — Geoportal Data Maceio (FORA DO AR) — `https://www.datamaceio.com.br/`
  - motivo/evidência registrada pelo agente: FALHA DE CONEXAO: 'connect ECONNREFUSED 191.252.191.140:443'. Conexao recusada no servidor, nao e 404 nem timeout - o servico nao esta escutando. Anunciado publicamente como o geoportal de mapas interativos e dados georreferenciados da Prefeitura de Maceio, mas inacessivel em 31/07/2026.
- `[fetch-falhou]` **Natal/RN** — dados.natal.br - interface web CKAN (HTTP 500) — `http://dados.natal.br/`
  - motivo/evidência registrada pelo agente: HTTP 500 com 15.731 bytes de pagina de erro. O HTML expoe assets '/fanstatic/vendor/:version:2018-02-06T05:36:31.36/' - build CKAN de fevereiro de 2018. A interface de navegacao humana do portal esta quebrada; apenas a API responde.
- `[fetch-falhou]` **Natal/RN** — Portal da Transparencia da Mobilidade Urbana de Natal - STTU (certificado expirado) — `https://dadosabertos.natal.br/`
  - motivo/evidência registrada pelo agente: WebFetch abortou duas vezes com 'certificate has expired' (tanto em / quanto em /quem.html). Com curl -k ignorando o certificado: HTTP 200, 14.949 bytes. Os links internos apontam para http://dados.natal.br e http://desenvolvedor.dados.natal.br (ambos HTTP puro). Achei tambem o placeholder de template nao editado 'mailto:info@example.com' na pagina.
- `[fetch-falhou]` **Natal/RN** — Area do Desenvolvedor de Natal (host nao resolve) — `http://desenvolvedor.dados.natal.br/`
  - motivo/evidência registrada pelo agente: curl retornou http=000 com size=0 - falha de conexao, o host nao responde. Anunciado no proprio dadosabertos.natal.br como 'Dados Dinamicos - Area do Desenvolvedor' com tela de Login.aspx. A camada de dados dinamicos/tempo real de Natal esta inacessivel.
- `[fetch-falhou]` **Aracaju/SE** — Dados Abertos - API - Portal da Transparencia de Aracaju — `https://transparencia.aracaju.se.gov.br/prefeitura/dados-abertos/`
  - motivo/evidência registrada pelo agente: WebFetch falhou com 'unable to verify the first certificate' (cadeia TLS incompleta). Com curl -k: HTTP 200, 170.247 bytes. Texto real extraido: 'DADOS ABERTOS - API ... programas de computador podem consultar os dados diretamente por meio de uma Interface de Programacao de Aplicativos (API) ... Os dados possuem um mecanismo de paginacao ... utilize o parametro ?page=[numero-da-pagina] ... Limite de ate 100 requisicoes HTTP ou HTTPS por segundo. O endereco IP de origem das requisicoes deve estar localizado no territorio brasileiro.' NAO consegui enumerar os endpoints nem os dominios cobertos.

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

METODO: WebSearch para descobrir + WebFetch para abrir cada URL. Sessao de 01/08/2026. Marquei "fetch-ok" SOMENTE onde a pagina realmente retornou conteudo nesta sessao; "fetch-falhou" onde houve 500/404/DNS/TLS/ECONNREFUSED.

BUSCAS FEITAS: (1) portais de dados abertos de Fortaleza e Recife; (2) Salvador CKAN/ArcGIS; (3) Teresina, Natal, Joao Pessoa, Sao Luis, Maceio, Aracaju; (4) municipios nao-capitais (Sobral, Campina Grande, Feira de Santana, Petrolina, Caruaru, Olinda, Jaboatao); (5) Indice de Dados Abertos para Cidades (ODI) da Open Knowledge Brasil; (6) catalogo nacional de portais dadosgovbr/catalogos-dados-brasil.

DOIS ACHADOS TRANSVERSAIS QUE ANCORAM O RANKING:
1. O catalogo nacional curado (dadosgovbr/catalogos-dados-brasil, CSV no GitHub, fetch-ok) lista APENAS TRES portais municipais de dados abertos em todo o Nordeste: Fortaleza, Recife e Natal. Natal esta morto (ECONNREFUSED em duas tentativas).
2. O ODI Cidades 2023 (Open Knowledge Brasil) avaliou as 26 capitais. Confirmei os numeros via Brasil61 (fetch-ok): SP 48%, BH 47%, Recife 38%, Curitiba 27%, Fortaleza 26%; as outras 21 capitais ficaram na faixa "opaco" (0-20%). Ou seja, Recife e Fortaleza sao as UNICAS capitais do NE acima de "opaco", e Recife e a 3a do Brasil. Nao consegui abrir indicedadosabertos.ok.org.br nem ok.org.br (403 Forbidden nas duas), nem a Agencia Brasil (pagina desativada por legislacao eleitoral), nem o release da Prefeitura do Recife (erro de certificado TLS) - entao o detalhamento por tema do ODI ("Recife 1o em Saude e Meio Ambiente, 2o em Educacao, Financas, Mobilidade e Seguranca") vem do resumo do WebSearch e NAO foi confirmado por fetch direto. Trate essa linha especifica como nao-verificada.

VEREDITO: Recife > Fortaleza > Salvador (so geo) > Maceio (dark horse). O resto do NE nao tem base para piloto.

NUANCE CRITICA SOBRE RECIFE (verifiquei a mao): o frontend CKAN e INSTAVEL - https://dados.recife.pe.gov.br/ e /dataset devolvem HTTP 500, e varios endpoints de API (package_show, package_search com facets, group_show) tambem deram 500 de forma intermitente. MAS: package_list e group_list funcionaram, e as paginas HTML de datasets INDIVIDUAIS funcionaram perfeitamente. Ou seja o portal esta vivo e mantido, com problema na listagem/indice. Repeti chamadas para distinguir "morto" de "intermitente" - package_show funcionou para registro-das-infracoes-de-transito e falhou para outros dois ids na mesma janela.

NUANCE CRITICA SOBRE FORTALEZA (o pedido pedia para checar se "ainda esta vivo em 2026"): o portal esta tecnicamente vivissimo - 635 datasets, API CKAN 100% estavel em todas as chamadas, dataset modificado em 31/07/2026 (ontem). MAS a frescura esta concentrada em dados administrativos/fiscais. Abri grupo por grupo e os dominios TEMATICOS estao envelhecendo: transporte = onibus de 2022 com referencia 2015, sem GTFS; seguranca = 1 (um) dataset, "Chamadas da Policia", 2022; economia = tudo 2022/2023; saude = so "Lista de Medicamentos" em 2025, resto 2024 ou anterior. Portanto a fama de dados abertos/mobilidade de Fortaleza NAO se sustenta em 2026 no eixo mobilidade - o que continua vivo e licitacoes, servidores, videomonitoramento (CGIVFOR) e camadas GeoJSON.

O QUE NAO CONSEGUI CONFIRMAR: (a) enumerar o acervo do Salvador Dados - e SPA em JavaScript, o HTML volta so o titulo, e tentei 3 endpoints de catalogo (search?collection=Dataset, DCAT feed, api/search/v1) todos 404; (b) contagem de datasets do Ceara Transparente - lista carregada por JS ("Carregando..."); (c) URL do DataMaceio - anunciado em 2024, nao localizei endereco vivo, dados.maceio.al.gov.br nao existe em DNS; (d) portais municipais de Jaboatao, Olinda, Caruaru e Petrolina - fiz uma busca combinada e nao apareceu nada, mas nao testei URL por URL, por isso nao os listei como candidatos; (e) Feira de Santana - o WebSearch indicou que o projeto civico "Dados Abertos de Feira" encerrou atividades em setembro/2023, nao abri o site para confirmar.

#### Fontes que a execução 2 NÃO confirmou (9 de 34)

- `[fetch-falhou]` **Recife/PE** — Recife CKAN - listagem HTML de datasets (FORA DO AR) — `https://dados.recife.pe.gov.br/dataset`
  - motivo/evidência registrada pelo agente: HTTP 500 Internal Server Error. A home https://dados.recife.pe.gov.br/ tambem retornou HTTP 500. Registro isso como risco operacional, nao como ausencia de dados.
- `[fetch-falhou]` **Salvador/BA** — Salvador Dados - plataforma da SEMIT (NAO AUDITAVEL) — `https://dados.salvador.ba.gov.br/`
  - motivo/evidência registrada pelo agente: A home responde HTTP 200 mas e SPA JavaScript: o HTML retornou apenas o titulo 'Salvador Dados', sem datasets, temas, formatos ou datas. Tres endpoints de catalogo testados retornaram 404: /search?collection=Dataset, /api/feed/dcat-us/1.1.json e /api/search/v1/collections/dataset/items. Nao pude confirmar nenhum dataset.
- `[fetch-falhou]` **Salvador/BA** — Salvador ArcGIS - pasta SEMOB (mobilidade) - restrita — `https://geo.salvador.ba.gov.br/arcgis/rest/services/SEMOB`
  - motivo/evidência registrada pelo agente: O diretorio nao listou servicos: retornou apenas 'Sign In', indicando que a pasta de mobilidade exige autenticacao. Nao foi possivel enumerar camadas de mobilidade.
- `[fetch-falhou]` **Maceio/AL** — DataMaceio - URL provavel testada (INEXISTENTE) — `https://dados.maceio.al.gov.br/`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND dados.maceio.al.gov.br - o dominio nao existe em DNS. Nao localizei endereco vivo do DataMaceio por busca nem por tentativa direta.
- `[fetch-falhou]` **Natal/RN** — Portal da Transparencia e Mobilidade Urbana de Natal (CKAN) - FORA DO AR — `http://dados.natal.br/`
  - motivo/evidência registrada pelo agente: connect ECONNREFUSED 52.2.32.139:443. Testei tambem http://dados.natal.br/dataset com o mesmo erro. Listado como 'CKAN' no catalogo nacional dadosgovbr/catalogos-dados-brasil, mas nao responde.
- `[fetch-falhou]` **Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE** — Aracaju - Dados Abertos / API da Prefeitura (FALHA DE TLS) — `https://transparencia.aracaju.se.gov.br/prefeitura/dados-abertos/`
  - motivo/evidência registrada pelo agente: Erro: 'unable to verify the first certificate' - cadeia de certificado TLS invalida. Nao foi possivel abrir nem confirmar os datasets. Buscas indicam JSON via API e arquivos .xlsx/.csv/.pdf, mas nada disso foi verificado por mim.
- `[fetch-falhou]` **Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE** — Sao Luis - pagina de Dados Abertos do Portal da Transparencia — `https://www.saoluis.ma.gov.br/portal/transparencia/pagina/4489/`
  - motivo/evidência registrada pelo agente: A URL original https://transparencia.saoluis.ma.gov.br/pagina/4489/ devolveu 301 Moved Permanently para este host. Ao buscar o destino, o conteudo retornou vazio/em branco - nenhum dataset, formato ou dominio pudera ser extraido.
- `[fetch-falhou]` **Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE** — Teresina - Portal da Transparencia (sem dados abertos confirmados) — `http://transparencia.teresina.pi.gov.br/`
  - motivo/evidência registrada pelo agente: Retornou apenas o titulo 'Portal da Transparencia - Teresina/PI' (aplicacao SPA). Nao foi possivel identificar secao de dados abertos, datasets, formatos ou dominios. Nao localizei dominio dados.teresina.pi.gov.br em buscas; o catalogo nacional nao lista portal municipal para Teresina.
- `[fetch-falhou]` **Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE** — Dados Abertos do Governo de Pernambuco (estadual) - FORA DO AR — `http://www.dadosabertos.pe.gov.br/`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND www.dadosabertos.pe.gov.br - dominio nao resolve em DNS, apesar de constar no catalogo nacional curado como portal estadual de PE.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 69 no total — 55 `[fetch-ok]`, 14 `[fetch-falhou]`, 0 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 1 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 0 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 54 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Recife/PE**
- Execução 2 (`execucao-2`): **Recife/PE**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Recife/PE · Fortaleza/CE · Salvador/BA · Maceio/AL · Sobral/CE · Natal/RN · Sao Luis/MA · Aracaju/SE · Campina Grande/PB

- Execução 2 (`execucao-2`): Recife/PE · Fortaleza/CE · Salvador/BA · Maceio/AL · Natal/RN · Sobral e Campina Grande (municipios nao-capitais)/CE/PB · Capitais sem base para piloto (Teresina, Joao Pessoa, Sao Luis, Aracaju) + portais estaduais de apoio/PI/PB/MA/SE

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
