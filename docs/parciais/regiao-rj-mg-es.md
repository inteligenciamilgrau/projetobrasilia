# regiao:rj-mg-es — Regiao SUDESTE - RJ, MG, ES

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:rj-mg-es

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
| 1 | `execucao-1` | 17 | 7 | 43 |
| 2 | `execucao-2` | 46 | 9 | 42 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 17)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Rio de Janeiro/RJ | urbanismo/geo | Prefeitura do Rio - ArcGIS REST Services (pgeo3) - diretorio raiz | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services?f=pjson` | geoservico | municipio \| distrito/bairro \| equipamento/unidade | variavel por servico (nao declarado no diretorio) | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | Cartografia / Limites_administrativos (FeatureServer) - limites de bairro e RA | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer/layers?f=pjson` | geoservico | distrito/bairro | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | Query publica na camada de bairros (prova de granularidade por bairro) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer/4/query?where=1%3D1&outFields=nome&returnGeometry=false&f=pjson` | api | distrito/bairro | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | Pasta Urbanismo (zoneamento, LBB, geoRuas, IPTU progressivo) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Urbanismo?f=pjson` | geoservico | distrito/bairro \| registro individual (lote/quadra) | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | meio-ambiente | Pasta Meio_Ambiente (IQAr diario, hidrografia, praias/pracas, floresta, areas protegidas) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Meio_Ambiente?f=pjson` | geoservico | equipamento/unidade \| distrito/bairro | IQAr descrito como 'dados diarios'; series de floresta 2010/2014/2016/2018 | `[fetch-ok]` |
| Rio de Janeiro/RJ | educacao | Pasta Educacao - Educacao/SME (FeatureServer + MapServer) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Educacao?f=pjson` | geoservico | equipamento/unidade (escola) | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | financas/orcamento | Fazenda/ITBI (MapServer) - transacoes imobiliarias por divisao administrativa e logradouro | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Fazenda/ITBI/MapServer?f=pjson` | geoservico | distrito/bairro (divisao administrativa) e logradouro | series anuais e mensais (nao declarada periodicidade de publicacao) | `[fetch-ok]` |
| Rio de Janeiro/RJ | saude | Pasta Saude do ArcGIS municipal (evidencia de LACUNA) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Saude?f=pjson` | geoservico | equipamento/unidade | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | seguranca | Pasta Seguranca do ArcGIS municipal (FECHADA) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Seguranca?f=pjson` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | urbanismo/geo | Pasta Bairros_Cariocas do ArcGIS municipal (FECHADA) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Bairros_Cariocas?f=pjson` | geoservico | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | outro | DATA.RIO - catalogo DCAT-US (feed JSON do ArcGIS Hub, IPP/Pereira Passos) | `https://www.data.rio/api/feed/dcat-us/1.1.json` | portal-dados-abertos | municipio \| distrito/bairro (varia por item) | heterogenea; muitos itens sao estudos pontuais | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | DATA.RIO - interface web (SPA que nao renderiza sem JS) | `https://www.data.rio/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | outro | queries-datario (dbt) - dominios publicados no BigQuery publico 'datario' | `https://github.com/prefeitura-rio/queries-datario/tree/master/models` | api | registro individual (chamado 1746, ocorrencia COR, posicao GPS) \| equipamento/unidade | diaria/horaria para 1746, COR, clima e GPS (conforme docs) | `[fetch-ok]` |
| Rio de Janeiro/RJ | mobilidade/transito | API de GPS dos onibus SPPO (SMTR/Escritorio de Dados) | `https://dados.mobilidade.rio/gps/sppo` | api | registro individual (veiculo/minuto) | captura por minuto, processamento horario, disponibilizacao diaria (conforme doc do data.rio) | `[fetch-falhou]` |
| Rio de Janeiro/RJ | outro | docs.dados.rio - documentacao das APIs municipais (IplanRio) | `https://docs.dados.rio/llms.txt` | api | registro individual | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | api.dados.rio (API v2 do Escritorio de Dados) - FORA DO AR | `https://api.dados.rio/` | api | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | outro | meta.dados.rio (catalogo de metadados do data lake) - FORA DO AR | `https://meta.dados.rio/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | financas/orcamento | Portal da Transparencia Rio - secao Dados Abertos | `https://transparencia.prefeitura.rio/dados-abertos/` | csv/xlsx | registro individual (empenho, liquidacao, contrato, favorecido) | pagina marcada 'Atualizado em 08/06/2026'; periodicidade dos arquivos nao declarada | `[fetch-ok]` |
| Rio de Janeiro/RJ | financas/orcamento | Contas Rio - Dados Abertos (CGM) | `https://www.rio.rj.gov.br/web/contasrio/dados-abertos` | csv/xlsx | registro individual | nao declarado na pagina indice | `[fetch-ok]` |
| Rio de Janeiro/RJ | seguranca | ISP Dados Abertos (Instituto de Seguranca Publica RJ) - estatisticas criminais | `https://www.ispdados.rj.gov.br/estatistica.html` | csv/xlsx | municipio e CISP/delegacia (proxy sub-municipal) \| AISP \| UPP | series mensais; por municipio desde 01/2014, por CISP desde 2003 | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | Portal de Dados Abertos do Estado do Rio de Janeiro (CKAN estadual) | `https://dadosabertos.rj.gov.br/dataset/` | portal-dados-abertos | municipio (predominante) | variavel por conjunto | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | transparencia.rio.rj.gov.br (hostname morto) | `https://transparencia.rio.rj.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Belo Horizonte/MG | outro | Portal de Dados Abertos da PBH (CKAN municipal) | `https://dados.pbh.gov.br/` | portal-dados-abertos | municipio \| distrito/bairro \| equipamento/unidade (varia) | variavel; muitos conjuntos com resources mensais | `[fetch-ok]` |
| Belo Horizonte/MG | outro | PBH CKAN - facetas de formato e organizacao | `https://dados.pbh.gov.br/dataset/` | portal-dados-abertos | varia | varia | `[fetch-ok]` |
| Belo Horizonte/MG | outro | PBH CKAN API - group_list com package_count (prova do desbalanceamento) | `https://dados.pbh.gov.br/api/3/action/group_list?all_fields=true` | api | n/a (metadado) | n/a | `[fetch-ok]` |
| Belo Horizonte/MG | saude | PBH CKAN - busca 'saude' (SMSA: Area de Abrangencia e Rede de Assistencia) | `https://dados.pbh.gov.br/api/3/action/package_search?q=saude&rows=5` | csv/xlsx | equipamento/unidade + area de abrangencia (sub-municipal) | mensal | `[fetch-ok]` |
| Belo Horizonte/MG | mobilidade/transito | PBH CKAN - GTFS e GTFS-RT do sistema de onibus (BHTrans/Superintendencia de Mobilidade) | `https://dados.pbh.gov.br/api/3/action/package_search?q=GTFS&rows=5` | api | registro individual (viagem/veiculo) e parada | GTFS estatico 'atualizado semanalmente' conforme descricao; GTFS-RT em tempo real | `[fetch-ok]` |
| Belo Horizonte/MG | seguranca | PBH CKAN - busca 'seguranca' (evidencia de LACUNA) | `https://dados.pbh.gov.br/api/3/action/package_search?q=seguranca&rows=5` | csv/xlsx | equipamento/unidade | mensal | `[fetch-ok]` |
| Belo Horizonte/MG | urbanismo/geo | BHGEO / BHMap - pagina de acesso aos dados geograficos (endpoints WMS/WFS) | `https://prefeitura.pbh.gov.br/bhgeo/acesso-aos-dados` | geoservico | distrito/bairro \| lote \| equipamento/unidade | nao declarado | `[fetch-ok]` |
| Belo Horizonte/MG | urbanismo/geo | BHGEO WFS 2.0.0 - GetCapabilities (geoservico vivo, camada Bairro) | `https://bhmap.pbh.gov.br/v2/api/idebhgeo/wfs?service=WFS&request=GetCapabilities` | geoservico | distrito/bairro \| lote (cadastro imobiliario) \| equipamento/unidade | nao declarado no capabilities | `[fetch-ok]` |
| Belo Horizonte/MG | outro | Portal de Dados Abertos do Estado de Minas Gerais (CKAN estadual) - complemento fraco | `https://dados.mg.gov.br/dataset` | portal-dados-abertos | municipio (predominante) | variavel | `[fetch-ok]` |
| Contagem/MG | urbanismo/geo | Prefeitura de Contagem - ArcGIS REST Services (diretorio raiz) | `https://geoprocessamento.contagem.mg.gov.br/arcgis/rest/services?f=pjson` | geoservico | distrito/bairro \| lote \| equipamento/unidade | nao declarado | `[fetch-ok]` |
| Contagem/MG | urbanismo/geo | Contagem - pasta SIGM_BD_Publico (servicos explicitamente publicos) | `https://geoprocessamento.contagem.mg.gov.br/arcgis/rest/services/SIGM_BD_Publico?f=pjson` | geoservico | distrito/bairro \| lote \| setor censitario | nao declarado | `[fetch-ok]` |
| Contagem/MG | outro | dados.contagem.mg.gov.br (URL hipotetica testada por mim - nao existe) | `https://dados.contagem.mg.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | outro | Portal Dados Abertos do Estado do Espirito Santo (CKAN estadual) | `https://dados.es.gov.br/dataset` | portal-dados-abertos | municipio (predominante) | variavel por conjunto | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | outro | dados.vitoria.es.gov.br - portal municipal citado mas fora do ar | `https://dados.vitoria.es.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | outro | Prefeitura de Vitoria - pagina institucional de Dados Abertos | `https://www.vitoria.es.gov.br/prefeitura/dados-abertos` | pdf/relatorio | desconhecido | nao declarado | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | financas/orcamento | Transparencia Vitoria - Dados Abertos (lista) | `https://transparencia.vitoria.es.gov.br/DadosAbertos.Lista.aspx` | painel/dashboard | desconhecido | 'atualizacoes em contratos, execucao orcamentaria e pessoal' (sem periodicidade explicita) | `[fetch-ok]` |
| Niteroi/RJ | urbanismo/geo | HUB SIGeo Niteroi - catalogo DCAT-US | `https://www.sigeo.niteroi.rj.gov.br/api/feed/dcat-us/1.1.json` | portal-dados-abertos | distrito/bairro \| lote \| equipamento/unidade \| setor censitario | nao declarado por item | `[fetch-ok]` |
| Niteroi/RJ | urbanismo/geo | HUB SIGeo Niteroi - interface web (SPA, nao renderiza) | `https://www.sigeo.niteroi.rj.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Niteroi/RJ | outro | dados-geoniteroi.opendata.arcgis.com - feed DCAT do dominio antigo | `https://dados-geoniteroi.opendata.arcgis.com/api/feed/dcat-us/1.1.json` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-falhou]` |
| Juiz de Fora/MG | outro | Portal PJF - Transparencia - Dados Abertos (arquivos) | `https://www.pjf.mg.gov.br/transparencia/dados_abertos/arquivos.php` | desconhecido | registro individual (empenho) \| equipamento/atrativo | despesas: semanal para o exercicio corrente, dados desde 2022 | `[fetch-ok]` |
| Uberlandia/MG | financas/orcamento | Prefeitura de Uberlandia - Catalogo de Dados Abertos | `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/catalogo-de-dados-abertos/` | painel/dashboard | desconhecido | desconhecido (busca sugeriu diaria, nao confirmado) | `[fetch-falhou]` |

### Execução 2 — agente `execucao-2` (journal linha 46)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Rio de Janeiro/RJ | multi-dominio (catalogo) | Data.Rio - feed DCAT-US 1.1 do catalogo de dados abertos (IPP/Prefeitura do Rio) | `https://www.data.rio/api/feed/dcat-us/1.1.json` | api | bairro/logradouro/divisao administrativa, dependendo do dataset | variavel por dataset; catalogo contem item de Junho/2026 | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo (raiz multidominio) | SIURB/pgeo3 - diretorio ArcGIS REST da Prefeitura do Rio | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services` | geoservico | varia por servico; muitos em nivel de bairro/equipamento | nao declarado no diretorio | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo (chave de bairro) | Cartografia/Limites_administrativos - camada 'Limite de Bairros' (ID 4) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/MapServer/4?f=pjson` | geoservico | bairro (com codigo de RA e Regiao de Planejamento) | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | social/demografia | Censo 2022: Populacao e domicilios por bairros (dados preliminares) - IPP | `https://www.arcgis.com/sharing/rest/content/items/fd354740f1934bf5bf8e9b0e2b509aa9?f=json` | geoservico | bairro | modificado em 02/04/2024 (base IBGE de 21/03/2024) | `[fetch-ok]` |
| Rio de Janeiro/RJ | mobilidade/transito | API de GPS do BRT - dados.mobilidade.rio | `https://dados.mobilidade.rio/gps/brt` | api | veiculo individual, coordenada lat/long | tempo real | `[fetch-ok]` |
| Rio de Janeiro/RJ | mobilidade/transito | API de GPS dos onibus SPPO - dados.mobilidade.rio | `https://dados.mobilidade.rio/gps/sppo` | api | veiculo individual | tempo real | `[fetch-falhou]` |
| Rio de Janeiro/RJ | educacao | Educacao/SME (FeatureServer) - Secretaria Municipal de Educacao do Rio | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Educacao/SME/FeatureServer?f=pjson` | geoservico | equipamento/unidade e 'microarea' (abaixo de bairro) | nao declarado | `[fetch-ok]` |
| Rio de Janeiro/RJ | financas/orcamento | Portal da Transparencia Rio / Contas Rio (CGM) - Dados Abertos | `https://transparencia.prefeitura.rio/dados-abertos/` | csv/xlsx | ato de execucao orcamentaria / favorecido / contrato | por exercicio, com arquivo 'Completo' consolidado | `[fetch-ok]` |
| Rio de Janeiro/RJ | seguranca | ISP Dados Abertos - Instituto de Seguranca Publica do RJ (estadual, cobre o municipio do Rio) | `http://www.ispdados.rj.gov.br/estatistica.html` | csv/xlsx | area de delegacia (CISP/DP) e municipio - NAO bairro | mensal, series desde 1991/2003 | `[fetch-ok]` |
| Rio de Janeiro/RJ | meio-ambiente | Sistema Alerta Rio - dados pluviometricos e meteorologicos | `http://alertario.rio.rj.gov.br/` | painel/dashboard | estacao pluviometrica (distribuidas por bairro) | 15 minutos | `[fetch-ok]` |
| Rio de Janeiro/RJ | saude | EpiRio - Observatorio Epidemiologico da Cidade do Rio de Janeiro (SVS/SMS) | `https://epirio.svs.rio.br/` | painel/dashboard | desconhecido na home; acesso granular via TabNet Municipal | nao declarado na home | `[fetch-ok]` |
| Rio de Janeiro/RJ | multi-dominio (mobilidade/clima/transito) | COR - Centro de Operacoes e Resiliencia do Rio | `https://cor.rio/` | painel/dashboard | cidade / via | tempo real (visual) | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo (acervo restrito) | pgeo3 - pasta 'Bairros_Cariocas' (indicadores por bairro) | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Bairros_Cariocas` | geoservico | bairro (presumido pelo nome) | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | multi-dominio (catalogo estadual) | Portal de Dados Abertos do Estado do Rio de Janeiro (CKAN) | `https://dadosabertos.rj.gov.br/api/3/action/group_list?all_fields=true` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | multi-dominio (portal humano) | DATA.RIO - portal web | `https://www.data.rio/` | portal-dados-abertos | varia | varia | `[fetch-ok]` |
| Belo Horizonte/MG | multi-dominio (catalogo) | Portal de Dados Abertos da PBH (CKAN) - listagem de datasets | `https://dados.pbh.gov.br/dataset/` | portal-dados-abertos | municipio / equipamento, conforme dataset | variavel; ha datasets 'em Tempo Real' | `[fetch-ok]` |
| Belo Horizonte/MG | multi-dominio (catalogo) | CKAN PBH - API organization_list (orgaos publicadores e contagens) | `https://dados.pbh.gov.br/api/3/action/organization_list?all_fields=true` | api | n/a (metadados) | continuo | `[fetch-ok]` |
| Belo Horizonte/MG | mobilidade/transito | CKAN PBH - datasets da BHTrans (package_search) | `https://dados.pbh.gov.br/api/3/action/package_search?fq=organization:bhtrans&rows=25` | api | trecho de via / equipamento (semaforo, no de trecho) | publicacao mensal declarada | `[fetch-ok]` |
| Belo Horizonte/MG | urbanismo/geo (multidominio) | BHMAP / IDE-BHGEO - WFS GetCapabilities | `https://bhmap.pbh.gov.br/v2/api/idebhgeo/wfs?service=WFS&version=1.1.0&request=GetCapabilities` | geoservico | feicao individual (lote, equipamento, poligono ambiental) | nao declarado no capabilities | `[fetch-ok]` |
| Belo Horizonte/MG | urbanismo/geo | BHGEO - Acesso aos Dados Geograficos (documentacao dos servicos) | `https://prefeitura.pbh.gov.br/bhgeo/acesso-aos-dados` | portal-dados-abertos | n/a (documentacao) | n/a | `[fetch-ok]` |
| Belo Horizonte/MG | multi-dominio (catalogo estadual) | Portal de Dados Abertos do Estado de Minas Gerais | `https://dados.mg.gov.br/` | portal-dados-abertos | varia | varia | `[fetch-ok]` |
| Belo Horizonte/MG | seguranca (deficit estadual) | dados.mg.gov.br - API organization_list | `https://dados.mg.gov.br/api/3/action/organization_list?all_fields=true` | api | n/a (metadados) | continuo | `[fetch-ok]` |
| Niteroi/RJ | saude | TabNit / Dados Abertos - Secretaria Municipal de Saude de Niteroi | `https://saude.niteroi.rj.gov.br/dados-abertos/` | csv/xlsx | bairro e regiao de saude (alem de municipio) | nao declarado na pagina | `[fetch-ok]` |
| Niteroi/RJ | multi-dominio (indicadores) | ObservaNit - Observatorio de Niteroi (SEPLAG) | `https://observa.niteroi.rj.gov.br/` | painel/dashboard | cita filtro por bairro/regiao, mas nao confirmado na home | nao declarado | `[fetch-ok]` |
| Niteroi/RJ | urbanismo/geo (multidominio) | SIGeo Niteroi - diretorio ArcGIS REST | `https://sig.niteroi.rj.gov.br/server/rest/services` | geoservico | feicao individual | nao declarado | `[fetch-ok]` |
| Niteroi/RJ | mobilidade/transito | SIGeo Niteroi - pasta PTG_NITTRANS (amostra de profundidade) | `https://sig.niteroi.rj.gov.br/server/rest/services/PTG_NITTRANS` | geoservico | vaga de estacionamento | nao declarado | `[fetch-ok]` |
| Niteroi/RJ | multi-dominio (portal humano) | HUB SIGeo - pagina Dados Abertos | `https://www.sigeo.niteroi.rj.gov.br/pages/dados-abertos` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Niteroi/RJ | multi-dominio (catalogo) | ArcGIS Hub de dados geo de Niteroi - feed DCAT | `https://dados-geoniteroi.opendata.arcgis.com/api/feed/dcat-us/1.1.json` | api | n/a | n/a | `[fetch-falhou]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | multi-dominio (catalogo estadual) | DADOS ABERTOS ES - CKAN do Estado do Espirito Santo, grupos e contagens | `https://dados.es.gov.br/api/3/action/group_list?all_fields=true` | api | municipio na maioria dos casos | variavel | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | seguranca | Observatorio da Seguranca Publica SESP-ES - Serie Historica de Dados | `https://observatorio.sesp.es.gov.br/serie-historica-de-dados` | csv/xlsx | estado e municipio (sem bairro) | series atualizadas ate 2025 | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | urbanismo/geo (multidominio municipal) | Geoweb Vitoria - feed DCAT-US do hub geoespacial da PMV | `https://geoweb.vitoria.es.gov.br/api/feed/dcat-us/1.1.json` | api | feicao individual / equipamento | nao declarado | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | multi-dominio (portal municipal) | Prefeitura de Vitoria - pagina institucional de Dados Abertos | `https://www.vitoria.es.gov.br/prefeitura/dados-abertos` | portal-dados-abertos | n/a | n/a | `[fetch-ok]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | multi-dominio (catalogo municipal) | Dados Vitoria - suposta API de dados abertos do municipio | `https://dados.vitoria.es.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES | financas/orcamento | Transparencia Vitoria - listagem de Dados Abertos | `https://transparencia.vitoria.es.gov.br/DadosAbertos.Lista.aspx` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Contagem/MG | financas/orcamento | Portal de Dados Abertos de Contagem (Contas Publicas) | `https://contaspublicas.contagem.mg.gov.br/dadosAbertos` | csv/xlsx | registro individual de despesa | mensal | `[fetch-ok]` |
| Contagem/MG | urbanismo/geo (multidominio) | Geoprocessamento Contagem - diretorio ArcGIS REST | `https://geoprocessamento.contagem.mg.gov.br/arcgis/rest/services` | geoservico | feicao individual / equipamento | nao declarado | `[fetch-ok]` |
| Vila Velha/ES | urbanismo/geo | Prefeitura de Vila Velha / SEMDU - Arquivos de Georreferenciamento | `https://www.vilavelha.es.gov.br/paginas/desenvolvimento-urbano-e-mobilidade-arquivos-de-georreferenciamento` | csv/xlsx | bairro e regiao administrativa (poligonos) | nao declarado; pagina diz que os arquivos estao em atualizacao | `[fetch-ok]` |
| Juiz de Fora/MG | outro (turismo/lazer) | Portal PJF - Transparencia / Dados Abertos - arquivos | `https://www.pjf.mg.gov.br/transparencia/dados_abertos/arquivos.php` | desconhecido | registro individual (estabelecimento, evento) | nao declarado | `[fetch-ok]` |
| Juiz de Fora/MG | urbanismo/geo | PJF - SIGMAPAS (sistema de informacoes geograficas municipal) | `https://www.pjf.mg.gov.br/desenvolvimentodoterritorio/geoprocessamento/sigmapas.php` | desconhecido | desconhecido | desconhecido | `[nao-testado]` |
| Uberlandia/MG | multi-dominio (catalogo) | Prefeitura de Uberlandia - Catalogo de Dados Abertos | `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/catalogo-de-dados-abertos/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Uberlandia/MG | multi-dominio (catalogo) | Prefeitura de Uberlandia - Dados Abertos (pagina raiz) | `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Volta Redonda/RJ | financas/orcamento | Dados Abertos - Prefeitura Municipal de Volta Redonda (hospedado em Portal CR2) | `https://www.portalcr2.com.br/dados-abertos/dados-abertos-volta-redonda` | desconhecido | desconhecido | desconhecido | `[fetch-ok]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Rio de Janeiro/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Unico caso no Sudeste (e provavelmente no Brasil) onde consegui PROVAR granularidade por bairro em endpoint aberto: a query publica no FeatureServer de Limites Administrativos devolveu 160 nomes de bairro sem token, com exportacao declarada para csv/geojson/shapefile. O servidor ArcGIS da Prefeitura (pgeo3) expoe 34 pastas tematicas cobrindo praticamente todos os dominios exigidos (Saude, Seguranca, Educacao, Transporte_Trafego, Meio_Ambiente, Urbanismo, Fazenda, Habitacao, Assistencia_Social, Defesa_Civil, Censo, SABREN/favelas, Territorios_Sociais, IVISA-Rio). Somando: data lake publico no BigQuery com 12 dominios (1746, COR, clima, educacao basica, transporte rodoviario, turismo), financas em CSV/TXT no Contas Rio, e seguranca em CSV por CISP/delegacia via ISP-RJ desde 2003. Nenhuma outra cidade do Sudeste que testei chega perto dessa amplitude. RESSALVA IMPORTANTE: a camada de apresentacao esta instavel - api.dados.rio e meta.dados.rio retornaram 503 hoje, transparencia.rio.rj.gov.br nao resolve DNS, e o proprio www.data.rio e SPA JavaScript que nao renderiza nada para crawler/WebFetch.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada em NUMERO de dominios (7-8 dominios com fonte real e aberta), mas desigual em PROFUNDIDADE e FRESCOR. Fortes: urbanismo/geo (57 servicos), meio ambiente (15 servicos, inclui IQAr diario), mobilidade (GPS de onibus + BigQuery), financas (CSV/TXT), seguranca (via ISP-RJ estadual, por delegacia). Fracos: saude municipal - a pasta Saude do ArcGIS tem UM unico servico (unidades estaduais/federais) e os indicadores de saude do data.rio param em 2017; educacao tem geo (SME FeatureServer) e BigQuery mas pouco indicador. Duas pastas relevantes (Seguranca e Bairros_Cariocas) estao FECHADAS com erro 499 Token Required - ou seja, o produto 'indicadores por bairro' do IPP nao esta aberto nesse canal.

#### 2. Belo Horizonte/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Melhor relacao entre facilidade de ingestao e frescor de dados que encontrei no Sudeste. CKAN municipal real (602 conjuntos, 26 orgaos, 21 grupos) com API CKAN v3 funcional - dei package_search e group_list e ambos responderam JSON limpo. Diferencial forte: dados de saude da SMSA em CSV com resources MENSAIS ate julho/2026 (mais atual que qualquer coisa que vi no Rio), GTFS estatico + GTFS-RT ativos (posicao de veiculo, trip updates, alertas) e um WFS 2.0.0 vivo (BHGEO/BHMap) com centenas de camadas incluindo 'Bairro', centros de saude, hospitais, escolas municipais e areas de risco de escorregamento/alagamento, exportavel em GeoJSON/GML/KML/Shapefile. Como piloto de engenharia, BH e o caminho de menor atrito; como piloto de amplitude, perde do Rio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA, nao equilibrada - e esse e o principal ponto contra BH. A contagem de conjuntos por grupo revela vazios claros: Mobilidade Urbana 27, Politicas Sociais 12, Habitacao 10, Educacao 7, Administracao 4, Desenvolvimento Humano 4, Planejamento 4, Meio Ambiente 3, Tecnologia 3, Estrategico 2, Estruturante 2, SAUDE 2, e ZERO em Seguranca Publica, Orcamentario, Arrecadacao Tributaria, Regulacao Urbana, Limpeza Urbana, Recursos Humanos, Comunicacao, Inclusao Digital, Legislacao. Parte do desbalanceamento e artefato de catalogacao (Prodabel tem 140 conjuntos e SMPU 134 sem grupo atribuido), mas o efeito pratico e o mesmo: sem taxonomia utilizavel em metade dos dominios. O geoservico compensa em urbanismo, educacao e equipamentos de saude, mas NAO cobre seguranca publica nem financas.

#### 3. Contagem/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Surpresa positiva de infraestrutura: mantem um servidor ArcGIS proprio, aberto e razoavelmente organizado (geoprocessamento.contagem.mg.gov.br), com 14 pastas e 68 servicos, sendo uma pasta explicitamente publica (SIGM_BD_Publico) com 24 servicos. Para uma cidade de porte medio isso e incomum e viabiliza produtos geograficos sem negociacao de acesso. Vale como caso secundario/comparativo dentro da RM de Belo Horizonte, nao como piloto principal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO concentrada. Praticamente tudo e urbanismo/geo e meio ambiente: base urbanistica, divisao territorial, zoneamento, legislacao urbana, parcelamento, malha viaria, planialtimetria, hidrografia, unidades de conservacao, patrimonio cultural, limpeza urbana, censo demografico. Existem camadas de equipamentos (escolas, UBS) e de radares fixos de transito e risco geologico, mas sao camadas de LOCALIZACAO, nao series de indicadores. Nao encontrei nenhuma fonte de saude, seguranca, educacao (indicadores), financas ou economia em formato aberto para Contagem. Reprovaria no criterio 3.

#### 4. Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluo Vitoria principalmente para registrar um resultado NEGATIVO bem apurado, porque ela costuma ser citada como boa em transparencia. O que realmente sustenta o ES e o portal ESTADUAL (dados.es.gov.br), um CKAN com 506 conjuntos e o melhor grupo de seguranca publica que encontrei no Sudeste em portal de dados abertos proprio (52 conjuntos). No nivel MUNICIPAL, porem, nao consegui confirmar catalogo algum: o dominio dados.vitoria.es.gov.br responde 404, e a pagina institucional de dados abertos apenas remete ao portal de transparencia e ao openDataSUS federal. Nao recomendo como piloto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Desequilibrada e, no nivel municipal, praticamente inexistente em formato auditavel. No nivel estadual a cobertura e razoavel (seguranca publica 52, educacao, assistencia social, meio ambiente) com CSV 256 e XLSX 181 - mas a granularidade e municipio, nao bairro, o que derruba o valor para um piloto de informacao local. Nao encontrei geoservico municipal de Vitoria (nao testei nenhuma URL de geoportal - assumo desconhecido, nao inexistente).

#### 5. Niteroi/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Tem geoservico municipal moderno e bem documentado (SIGeo, ArcGIS Hub) com catalogo pequeno mas de boa qualidade tecnica: CSV, GeoJSON, Shapefile, KML e ArcGIS REST em todos os itens, padrao SIRGAS 2000 / UTM 23S declarado, e ate um Escritorio de Dados com organizacao propria no GitHub. E um bom 'segundo piloto' de baixo custo se a escolha for a Regiao Metropolitana do Rio, mas o acervo e pequeno demais e desbalanceado para ser o piloto principal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Estreita. Dos 25 itens do catalogo, 23 sao geoespaciais e concentrados em urbanismo (Planos Urbanisticos Regionais, zoneamento, lotes, uso do solo, operacao urbana consorciada), mobilidade (linhas Transnit, abrigos de onibus, infraestrutura cicloviaria, paraciclos), educacao (escolas de fundamental, UMEIs) e meio ambiente (pontos de reciclagem). Ha um item social (rede de atendimento a mulher) e dois de estabelecimentos economicos, mas de 2003 e 2013 - defasados. ZERO saude, ZERO seguranca, ZERO financas/orcamento. Falha claramente no criterio 3.

#### 6. Juiz de Fora/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Testei porque estava na lista e porque a PJF tem uma Subsecretaria de Governanca Digital com secao propria de dados abertos. O resultado nao sustenta um piloto: o que esta efetivamente publicado como 'dados abertos' e um conjunto de tabelas de TURISMO (atrativos, onde comer, onde ficar, o que fazer, eventos) mais despesas orcamentarias. E util para registrar que 'ter secao de dados abertos' nao significa ter dados abertos uteis.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Fortemente desequilibrada: turismo + financas, e nada mais confirmado. Saude, educacao, mobilidade e seguranca aparecem no portal de transparencia como paginas de consulta, nao como conjuntos baixaveis nessa secao. Reprovaria no criterio 1 e no criterio 3.

#### 7. Uberlandia/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Nao consegui avaliar. A URL do Catalogo de Dados Abertos existe e aparece no site oficial, mas o servidor bloqueia acesso automatizado com HTTP 403. Reporto como inconclusivo em vez de estimar - se o projeto quiser considerar Uberlandia, sera preciso acesso via navegador real. O que a busca indicou (BI interativo com exportacao CSV, foco em receitas, atualizacao diaria, ultima nota de 12/06/2025) NAO foi confirmado por mim e nao deve ser tratado como verificado.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Nao avaliavel nesta rodada. Indicio (nao verificado) de concentracao em receitas/arrecadacao via painel BI, o que seria cobertura estreita e formato ruim (painel, nao arquivo).

### Execução 2 — agente `execucao-2`

#### 1. Rio de Janeiro/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Melhor candidato do Sudeste e provavelmente do Brasil para piloto. Unico caso onde confirmei, abrindo as URLs, (a) catalogo multidominio legivel por maquina (feed DCAT-US do Data.Rio, com distribuicoes CSV/GeoJSON/Shapefile/KML/ArcGIS REST), (b) infraestrutura geoespacial propria com 40 pastas tematicas cobrindo praticamente todos os dominios pedidos (Saude, Seguranca, Educacao, Transporte_Trafego, Meio_Ambiente, Urbanismo, Habitacao, Fazenda, Assistencia_Social, Defesa_Civil, Censo, SABREN, IVISA-Rio), (c) granularidade sub-municipal REAL e nao so limite de poligono: a camada 'Limite de Bairros' tem campos codbairro/regiao_adm/codra/rp, o censo 2022 vem com atributos de populacao e domicilios POR BAIRRO, IPTU e ITBI vem por LOGRADOURO e por divisao administrativa, e a SME publica 'Microareas SME' (abaixo de bairro), (d) API em tempo real de fato funcionando (GPS do BRT, retornou registros ao vivo com timestamp de 31/07/2026), (e) chuva a cada 15 minutos por estacao no AlertaRio, (f) execucao orcamentaria em CSV/TXT no Contas Rio, (g) serie criminal mensal por area de delegacia (CISP) desde 2003 em CSV no ISP-RJ. Recencia confirmada: o catalogo lista 'Caderno Economico - Serie Industrias - Volume 3 (Junho/2026)'.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura a mais equilibrada que encontrei: mobilidade (API GPS + GTFS), financas/fiscal (Contas Rio + IPTU/ITBI por logradouro), urbanismo/geo (40 pastas ArcGIS), meio ambiente (Areas Protegidas, AlertaRio), social/habitacao (SABREN, favelas), economia (Caderno Economico, Geografia Economica Carioca), educacao (Escolas municipais, Limite CRE, Microareas SME), seguranca (via ISP-RJ estadual, por CISP). O ponto mais fraco e SAUDE em formato aberto bruto: a pasta Saude do pgeo3 tem uma unica camada (unidades estaduais/federais) e o EpiRio e painel, sem CSV explicito - os dados granulares dependem do TabNet. Segurança nao e municipal, vem do ISP estadual e a granularidade e CISP (area de delegacia), nao bairro.

#### 2. Belo Horizonte/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Segundo colocado e o melhor catalogo TABULAR estruturado do Sudeste. Diferente do Rio (que brilha no geo), BH tem um CKAN maduro e realmente consultavel por API: 602 datasets, 25 orgaos publicadores, 544 recursos CSV e 29 JSON, com API CKAN padrao (/api/3/action/...). Confirmei atualizacao recente de verdade: datasets da BHTrans com metadata_modified de 20/07/2026 e 15/07/2026. Em cima disso, BH tem IDE propria (BHGEO/BHMAP) com WMS e WFS abertos e o GetCapabilities do WFS lista mais de 300 camadas tematicas, incluindo 'Cadastro Imobiliario IPTU', 'Alimentacao Escolar', 'Estacionamento Rotativo Segunda a Sexta', 'Area de Preservacao Permanente'. Para um piloto que precisa de pipeline reprodutivel (CKAN + WFS, ambos padronizados), BH e tecnicamente o alvo mais facil de automatizar.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Boa amplitude mas com um buraco claro. Forte: planejamento urbano (SMPU 134 datasets), TI/cadastros (Prodabel 140), financas (SMFA 65 + receita e despesa consolidadas em tempo real), orcamento/gestao (SMPOG 31), assistencia social e direitos humanos (SMASDH 26), meio ambiente (SMMA 25), mobilidade (BHTrans 24 + grupo 'Mobilidade Urbana' com 27), educacao (SMED 20), habitacao (Urbel 13), limpeza urbana (SLU 13), turismo (Belotur 13), obras (SMOBI 10). Fraco: SAUDE tem apenas 6 datasets (SMSA) e SEGURANCA nao existe como orgao publicador - so 'Defesa Civil' com 3. A camada estadual nao salva: no dados.mg.gov.br a SEJUSP tem 1 dataset e a Policia Civil (PCMG) tem 1. Ou seja, BH e o inverso do problema do Rio: excelente em financas/urbanismo/mobilidade, pobre em saude e praticamente vazio em seguranca.

#### 3. Niteroi/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Terceiro colocado e a surpresa positiva do recorte: e a UNICA cidade alem do Rio onde confirmei tabulacao de dados de SAUDE explicitamente POR BAIRRO, com exportacao em CSV/Excel/TabWin (ferramenta TabNit da Secretaria Municipal de Saude). Alem disso tem um observatorio municipal (ObservaNit, da SEPLAG) com 14 blocos tematicos que cobrem exatamente a lista de dominios pedida - inclusive Seguranca Publica, que e o dominio que BH nao tem - e uma infraestrutura ArcGIS propria com 24 pastas nomeadas por secretaria (PTG_SMS saude, PTG_SME educacao, PTG_SMF fazenda, PTG_SMU urbanismo, PTG_NITTRANS transito, PTG_NITBIKE, PTG_SEOP ordem publica, PTG_SMDCG, PTG_SMARHS). Como cidade menor e de gestao concentrada, e um bom candidato a piloto 'controlado': cobertura tematica ampla num territorio pequeno.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Amplitude tematica NOMINAL excelente (14 paineis + 24 pastas geo por secretaria), mas profundidade por dominio e o risco. Amostrei a pasta de transito (PTG_NITTRANS) e ela contem apenas UM servico, de vagas especiais de estacionamento. Ou seja: existe estrutura para todos os dominios, mas o volume dentro de cada um pode ser raso. Saude e o dominio comprovadamente forte e granular (bairro/regiao de saude, CSV). Nao encontrei catalogo CKAN nem feed DCAT em Niteroi, o que significa que nao existe um indice unico maquinavel - a ingestao teria que ser fonte por fonte.

#### 4. Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Melhor opcao do Espirito Santo, mas por um motivo diferente: a forca nao esta no municipio, esta no ESTADO. O CKAN estadual dados.es.gov.br e, de longe, o mais forte em SEGURANCA PUBLICA de todo o recorte que testei (52 pacotes, mais que qualquer outro tema em qualquer portal estadual do Sudeste que abri), seguido de Educacao 34, Administracao Publica 31, Meio Ambiente 18, Economia 14, Assistencia Social 12. E o Observatorio da SESP publica series historicas longas em XLSX, varias comecando em 1996 e indo ate 2025, com recorte por municipio - o que cobre Vitoria, Vila Velha, Serra e Cariacica de uma vez. No municipio, o Geoweb Vitoria expoe um feed DCAT valido com camadas e paineis de obras, chuva, defesa civil, guarda municipal, habitacao e ambulantes.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Desequilibrada e invertida em relacao as outras candidatas. Muito forte em seguranca (52 pacotes estaduais + series 1996-2025) e razoavel em educacao e meio ambiente. Fraca em saude (apenas 8 pacotes no CKAN estadual) e ZERADA em varios grupos do proprio portal estadual: Ciencia e Tecnologia 0, Comunicacoes 0, Comercio e Servicos 0, Cultura 0, Demografia 0, Esporte e Lazer 0, Infraestrutura 0, Transportes nao aparece com volume. Ou seja: se o piloto precisa de mobilidade/transito e comercio/economia local, o ES nao entrega. A granularidade tambem para no municipio - nao encontrei nenhum recorte por bairro no ES.

#### 5. Contagem/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Caso didatico de DESEQUILIBRIO extremo - incluo justamente para o time nao ser enganado por manchete de 'prefeitura lanca portal de dados abertos'. O portal de dados abertos tabular tem literalmente 3 conjuntos, todos de despesa administrativa. Em contrapartida, a infraestrutura geoespacial e surpreendentemente robusta para o porte: ArcGIS 11.5 com 14 pastas e mais de 60 servicos na raiz, incluindo escolas, unidades de saude, risco geologico, suscetibilidade a inundacao, temperatura e cobertura vegetal. Serve como fonte geo complementar num piloto de RM de Belo Horizonte, nunca como piloto principal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Reprovado no criterio 3. Dados tabulares abertos: 100% financas/administracao (diarias, adiantamentos, convenios). Zero em saude, seguranca, educacao, mobilidade e economia em formato tabular. O geo cobre varios temas, mas geoservico sem tabela de indicadores nao sustenta um produto de 'informacao simples e util' - da mapa, nao da serie temporal.

#### 6. Vila Velha/ES — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluo como candidata REPROVADA, com evidencia. E citada como tendo dados abertos, mas o que existe de fato e um pacote de arquivos de georreferenciamento de urbanismo - e a propria pagina avisa que os arquivos estao em atualizacao. Vale como fonte de contorno de bairro e regiao administrativa para um piloto na Grande Vitoria, nada mais.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Reprovada no criterio 1 e no criterio 3. Um unico dominio (urbanismo/geo). Zero em saude, seguranca, educacao, financas, economia, meio ambiente tabular. Nao ha catalogo, API nem serie temporal.

#### 7. Juiz de Fora/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Incluo como candidata REPROVADA com evidencia direta, porque estava na lista de investigacao. Abri a pagina oficial de dados abertos da PJF e o que esta publicado como 'dados abertos' sao tabelas de TURISMO (atrativos, onde comer, onde ficar, eventos). O sistema geografico municipal (SIGMAPAS) e, segundo a propria prefeitura, de acesso restrito a servidores. Nao ha base para um piloto multidominio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Reprovada. Praticamente monodominio: turismo/lazer. Financas existe no portal de transparencia mas nao esta estruturado como dados abertos catalogados. Saude, seguranca, educacao, mobilidade e meio ambiente: nada encontrado em formato aberto.

#### 8. Uberlandia/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

NAO CONSEGUI VERIFICAR. Registro como candidata pendente, nao como recomendada nem como reprovada. As duas paginas oficiais de dados abertos da prefeitura bloquearam meu acesso com HTTP 403, provavelmente por protecao anti-bot. Ha indicios em busca de que exista um catalogo de dados abertos com metadados e dicionario de campos, atualizacao diaria e exportacao via BI/CSV, alem de um Banco de Dados Integrados (BDI) do planejamento urbano e uma base de mobilidade 'Porta a Porta' - mas eu nao abri nada disso e nao afirmo que existe.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Impossivel avaliar equilibrio: nenhuma fonte aberta com sucesso. NAO inclua Uberlandia em ranking algum sem uma nova rodada de verificacao (de preferencia com navegador real, dado o bloqueio 403).

#### 9. Volta Redonda/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Verificacao inconclusiva, tendendo a reprovacao. A pagina de dados abertos nao e hospedada em dominio da prefeitura (esta em portalcr2.com.br, aparentemente um fornecedor terceirizado de transparencia) e o conteudo nao foi extraivel. Sem evidencia de amplitude de dominios. Nao recomendo para piloto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Nao avaliavel. Nenhum dataset enumerado. Pelo padrao desses portais de fornecedor de transparencia, a expectativa e cobertura restrita a financas/orcamento/pessoal - mas isso e inferencia minha, nao verificacao.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Rio de Janeiro/RJ — `red_flags`:**

1) api.dados.rio (raiz e /v2/clima_pluviometro/precipitacao_15min/) = HTTP 503. 2) meta.dados.rio = HTTP 503. 3) https://docs.dados.rio/tutoriais/como-acessar-dados/ = HTTP 404 (link vivo no Google, pagina morta). 4) transparencia.rio.rj.gov.br = getaddrinfo ENOTFOUND (hostname morto; o correto e transparencia.prefeitura.rio). 5) www.data.rio e /datasets/ e paginas /datasets/<slug>/about retornam pagina vazia para WebFetch - ArcGIS Hub SPA, exige JS; um scraper ingenuo colhe zero. 6) pgeo3 .../services/Seguranca e .../services/Bairros_Cariocas = erro 499 Token Required. 7) O feed DCAT do data.rio declara distribuicao 'Web Page (text/html)' para a maioria dos itens e boa parte do acervo sao NOTAS TECNICAS e ESTUDOS antigos (1996-2017), nao series correntes. 8) A API municipal documentada em docs.dados.rio exige JWT via Identidade Carioca - nao e dado aberto.

**Belo Horizonte/MG — `red_flags`:**

1) Seguranca publica e um vazio real: grupo 'Segurança Pública' = 0 conjuntos, e package_search q=seguranca devolve 9 resultados que sao todos SEGURANCA ALIMENTAR (equipamentos nutricionais), nao criminalidade. 2) Metade do acervo e PDF: facetas CSV 544 vs PDF 537, JSON so 29 - varios conjuntos empacotam CSV de dados + PDF de dicionario, mas ha muito PDF puro. 3) Grupos vazios em orcamento/arrecadacao apesar de existirem as categorias - da falsa impressao de cobertura fiscal. 4) GTFS/GTFS-RT com last_modified 2024-11-25 e 2024-01-08 - a URL do feed e viva mas o METADADO nao e atualizado desde 2024, o que dificulta auditar frescor. 5) O feed GTFS esta hospedado em bucket de terceiro (s3.amazonaws.com/mobilibus-uploads) - dependencia de fornecedor. 6) O estado de MG nao ajuda: dados.mg.gov.br tem apenas 96 conjuntos e praticamente nada de seguranca publica.

**Contagem/MG — `red_flags`:**

1) Nao existe portal de dados abertos tabular que eu tenha conseguido confirmar - meu palpite dados.contagem.mg.gov.br nem resolve DNS (e importante registrar que essa URL foi um CHUTE meu, nao um link encontrado). 2) Tudo o que confirmei e geoservico; zero CSV/API tabular verificado. 3) Ha pastas 'teste', 'DESENVOLVIMENTO' e 'ViabilidadeHo' expostas no diretorio publico, sinal de governanca fraca do ambiente. 4) Nomes de servico com duplicidade e sufixos de versao (Bairros_reais_Centroid, Pontos_30_12) indicam publicacao ad hoc.

**Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES — `red_flags`:**

1) https://dados.vitoria.es.gov.br/ retorna HTTP 404 apesar de aparecer como 'Dados Vitoria | PMV' em resultado de busca - link institucional quebrado. 2) A pagina oficial de dados abertos (vitoria.es.gov.br/prefeitura/dados-abertos) cita o Decreto 22.378/2023 e a Portaria CGM 011/2023 mas NAO enumera um unico conjunto, formato, endpoint ou periodicidade - politica sem catalogo. 3) O portal de transparencia (DadosAbertos.Lista.aspx) abriu mas nao expoe lista de conjuntos com formato no HTML; o proprio menu redireciona saude para o openDataSUS federal, ou seja, a prefeitura terceiriza o dado de saude. 4) Sinal de qualidade no portal estadual: 66 conjuntos em PDF. 5) Nao testei Vila Velha, Serra e Cariacica (orcamento de busca esgotado) - portanto a RM da Grande Vitoria esta subavaliada nesta rodada.

**Niteroi/RJ — `red_flags`:**

1) Catalogo minusculo: 25 itens, e um deles e o proprio 'HUB SIGeo' (metadado do site, nao dado). 2) O portal CKAN antigo de Niteroi foi descontinuado e o novo e apenas geografico - houve PERDA de dominios tabulares. 3) https://dados-geoniteroi.opendata.arcgis.com/api/feed/dcat-us/1.1.json = HTTP 404 (o dominio ArcGIS Online antigo nao serve mais o feed). 4) https://www.sigeo.niteroi.rj.gov.br/ retorna pagina vazia via WebFetch (SPA JavaScript) - so consegui o catalogo pelo feed DCAT. 5) 'Estabelecimentos 2003' e 'Estabelecimentos 2013' como unica base economica indica acervo congelado.

**Juiz de Fora/MG — `red_flags`:**

1) As tabelas expostas tem nomes de tabela de banco cru (tb_atrativo, tb_ondecomer, tb_ondeficar, tb_oquefazer, tb_categoria_evento, tb_secretaria, tipo_evento) - e um dump de CMS de turismo apresentado como dado aberto. 2) A pagina nao declara formato de arquivo (nao consegui confirmar CSV vs XLS vs TXT). 3) Despesas a partir de 2022 apenas, atualizacao semanal so do exercicio corrente. 4) Nao ha geoservico nem API confirmados.

**Uberlandia/MG — `red_flags`:**

1) HTTP 403 Forbidden no catalogo - WAF bloqueando crawler; dado 'aberto' que exige navegador nao e maquina-legivel na pratica. 2) Indicio de que a entrega principal e painel BI com exportacao, nao arquivo estavel nem API - isso quebra pipeline. 3) Nao testei o Banco de Dados Integrados (BDI) da Secretaria de Planejamento Urbano, que apareceu na busca e pode ser a fonte mais rica da cidade.

### Execução 2 — agente `execucao-2`

**Rio de Janeiro/RJ — `red_flags`:**

1) api.dados.rio/docs retornou HTTP 503 - a API do Escritorio de Dados estava fora no momento do teste. 2) O endpoint GPS dos onibus (SPPO) respondeu mas com payload acima de 10MB, que estourou o limite do meu fetch - nao consegui inspecionar o schema (o BRT, menor, funcionou). 3) A pasta 'Bairros_Cariocas' do pgeo3 exige login: redirecionou 302 para OAuth em siurb.rio. Ou seja, parte do acervo 'aberto' e restrita. 4) www.data.rio e SPA: o HTML cru so devolve o titulo 'DATA.RIO', logo scraping direto do portal nao funciona - so o feed DCAT e os endpoints ArcGIS. 5) O portal de dados abertos do ESTADO do RJ (dadosabertos.rj.gov.br) esta praticamente vazio: 25 grupos tematicos e apenas 6 datasets no total (Governo Digital 3, Seguranca e Ordem Publica 3). Nao conte com a camada estadual. 6) Varios datasets do catalogo sao da era COVID (2020-2022) e nao foram atualizados. 7) O COR (cor.rio) e vitrine: nenhuma mencao a download aberto ou API na pagina.

**Belo Horizonte/MG — `red_flags`:**

1) Ha DOIS enderecos para o mesmo CKAN (dados.pbh.gov.br e ckan.pbh.gov.br) - risco de duplicidade/confusao na ingestao. 2) PDF aparece em 537 dos 602 datasets, quase empatado com CSV (544): muitos datasets sao 'CSV + PDF' do mesmo conteudo, entao o numero de datasets realmente maquinaveis e menor do que o headline sugere. 3) Nao verifiquei granularidade por bairro nos datasets tabulares - o CKAN parece majoritariamente municipal/equipamento; a granularidade fina esta no WFS, nao no CSV. 4) O catalogo de metadados Geonetwork (geonetwork.pbh.gov.br) e citado como HTTP, nao HTTPS, e eu NAO o abri. 5) Saude com 6 datasets e um risco real para um produto que quer falar de saude.

**Niteroi/RJ — `red_flags`:**

1) O ArcGIS Hub que aparece em buscas (dados-geoniteroi.opendata.arcgis.com) retornou 404 no feed DCAT - possivelmente descontinuado. 2) A pagina 'Dados Abertos' do HUB SIGeo (sigeo.niteroi.rj.gov.br/pages/dados-abertos) e SPA: o HTML cru so devolve o titulo 'Dados Abertos', sem nenhuma lista de camadas ou formato. Nao pude confirmar o que ela realmente oferece. 3) Amostragem revelou pasta geo quase vazia (PTG_NITTRANS com 1 servico) - suspeito que outras pastas tambem sejam rasas; eu NAO abri as 24. 4) ObservaNit oferece 'ficha tecnica dos indicadores' para download, o que soa a PDF/documento, nao a serie temporal em CSV; a pagina nao documenta API. 5) Sem CKAN e sem DCAT, nao ha contagem verificavel de datasets - qualquer numero total de 'datasets de Niteroi' que aparecer por ai deve ser tratado com desconfianca.

**Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES — `red_flags`:**

1) A URL que aparece como 'API de dados abertos de Vitoria' (dados.vitoria.es.gov.br) retornou HTTP 404 na raiz. Nao existe ou mudou. 2) A pagina de listagem de dados abertos do portal de transparencia municipal (transparencia.vitoria.es.gov.br/DadosAbertos.Lista.aspx) tambem retornou HTTP 404 - e ela e justamente o endereco que a propria prefeitura indica. Isso e uma falha grave de manutencao. 3) O feed DCAT do Geoweb tem apenas 23 itens e boa parte deles NAO e dataset: sao mapas, aplicativos e basemaps ('World Basemap v2', 'National Geographic Style Base', 'Geoweb Mapa Interativo', 'Hub Geoweb'), inclusive um explicitamente marcado 'Dominio Fundiario - old' e um 'Geoweb Interno (Mapa)'. Ha itens duplicados ('Monitoramento de Chuva' aparece duas vezes). O numero real de dados uteis e bem menor que 23. 4) As series da SESP sao XLSX (planilha), nao CSV nem API - da para automatizar, mas com atrito. 5) A pagina institucional de dados abertos de Vitoria basicamente terceiriza saude para o openDataSUS federal, o que indica que a prefeitura nao publica saude propria.

**Contagem/MG — `red_flags`:**

1) Apenas 3 datasets no portal de dados abertos, todos de despesa - a distancia entre o anuncio institucional e a realidade e enorme. 2) Na leitura do diretorio ArcGIS, a listagem dos ~60 servicos da raiz veio resumida pela minha ferramenta, nao enumerada nome por nome; tratei como 'aproximadamente 60+' e NAO como numero exato verificado. 3) Ha pastas chamadas 'teste' e 'Hub_externo' no servidor de producao - sinal de governanca fraca do acervo.

**Vila Velha/ES — `red_flags`:**

1) A propria pagina exibe o aviso "OS ARQUIVOS ENCONTRAM-SE EM ATUALIZACAO" - risco de dado desatualizado ou inconsistente. 2) Boa parte da entrega e KMZ (formato de visualizacao) e PDF, incluindo um mapa de zoneamento explicitamente marcado como obsoleto ('Lei n 4575'). Apenas parte esta em Shapefile. 3) Nenhuma data de atualizacao ou versao verificavel na pagina.

**Juiz de Fora/MG — `red_flags`:**

1) O 'catalogo de dados abertos' e um dump de tabelas de banco com nomes tecnicos (tb_atrativo, tb_ondecomer, tb_secretaria) sem dicionario aparente e sem formato declarado na pagina - dado bruto sem documentacao nao e dado aberto util. 2) SIGMAPAS: o acesso exige solicitacao via 'Prefeitura Agil' e e restrito a servidores municipais. Eu NAO abri a pagina do SIGMAPAS, so vi essa informacao em resultado de busca - por isso marquei nao-testado. 3) Nao encontrei nenhuma data de atualizacao verificavel.

**Uberlandia/MG — `red_flags`:**

1) HTTP 403 Forbidden em ambas as URLs oficiais de dados abertos - o site bloqueia acesso automatizado. Isso e por si um problema para um piloto que depende de ingestao programatica: mesmo que os dados existam, coleta-los pode violar o bloqueio ou exigir contorno. 2) Toda mencao a 'atualizacao diaria', 'ultima atualizacao 12/06/2025', 'BI/CSV' e 'Porta a Porta' veio de snippet de busca, NAO de pagina aberta por mim. Nao trate como fato.

**Volta Redonda/RJ — `red_flags`:**

1) Dados abertos municipais hospedados em dominio comercial de terceiro (portalcr2.com.br), nao em dominio .gov.br - risco de continuidade e de governanca. 2) A pagina respondeu mas devolveu apenas titulo e uma imagem; nao consegui enumerar dataset, formato nem dominio. 3) O titulo da pagina traz o ciclo de mandato ('2025-2028'), padrao de portal que e refeito a cada gestao - risco de perda de serie historica.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO TRABALHEI. Comecei carregando WebSearch/WebFetch via ToolSearch. Usei WebSearch apenas para DESCOBRIR endereco, e WebFetch para ABRIR e citar. Toda linha marcada fetch-ok foi aberta por mim em 31/07/2026 e a evidencia e trecho do que a pagina realmente devolveu. Fiz 40 chamadas de ferramenta, das quais 26 WebFetch.

TATICA QUE FUNCIONOU. Os portais municipais brasileiros mais ricos sao SPAs (ArcGIS Hub) que devolvem pagina vazia para crawler. Contornei atacando as camadas de maquina: (a) feeds DCAT-US em /api/feed/dcat-us/1.1.json - funcionou para data.rio e para o SIGeo de Niteroi, e falhou com 404 para Vitoria e para o dominio antigo de Niteroi; (b) diretorios ArcGIS REST com ?f=pjson - funcionou muito bem para Rio (pgeo3) e Contagem, e permitiu enumerar pastas tematicas e detectar as protegidas por token; (c) API CKAN v3 (package_search, group_list?all_fields=true) - funcionou para BH e permitiu medir desbalanceamento com numero, nao com impressao; (d) WFS GetCapabilities - confirmou o geoservico de BH vivo.

A PROVA DE BAIRRO NO RIO (o ponto que me pediram para checar a fundo). Nao me contentei com a pagina do dataset 'Limite de Bairros' no data.rio, que nao renderiza. Fui ao FeatureServer de Cartografia/Limites_administrativos, listei as 5 camadas (Municipio, AP, RP, RA, Bairros) e depois executei uma query real sem token: where=1=1&outFields=nome. Voltaram 160 feicoes com nome de bairro (Grumari, Jardim Sulacap, Saude, Vaz Lobo, Ribeira, Magalhaes Bastos, Realengo, Sepetiba, Padre Miguel, Senador Camara...). O servico declara Query,Extract e exportacao para csv/geojson/shapefile. CONCLUSAO: granularidade por bairro no Rio esta PROVADA para a MALHA territorial. O que NAO provei, e quero deixar explicito, e a existencia de INDICADORES por bairro abertos - a pasta Bairros_Cariocas, que seria exatamente isso, respondeu erro 499 Token Required, igual a pasta Seguranca. Nota tecnica: o Rio tem 164 bairros oficiais e a query devolveu 160 em uma pagina; pode ser limite de maxRecordCount, nao verifiquei paginacao.

O QUE NAO CONSEGUI CONFIRMAR. (1) A camada de servicos do Escritorio de Dados do Rio esta degradada hoje: api.dados.rio raiz e /v2/clima_pluviometro/precipitacao_15min/ = 503; meta.dados.rio = 503; docs.dados.rio/tutoriais/como-acessar-dados/ = 404; transparencia.rio.rj.gov.br nao resolve DNS. Inferi os 12 dominios do data lake pelo repositorio dbt no GitHub, nao por um catalogo vivo - isso e evidencia indireta e assim esta marcado. (2) O endpoint de GPS de onibus dados.mobilidade.rio/gps/sppo respondeu e enviou payload, mas meu WebFetch abortou por exceder 10 MB; marquei fetch-falhou por rigor, embora o comportamento indique endpoint vivo. Nao descrevi os campos porque nao os vi. (3) Uberlandia = 403 Forbidden, inconclusivo. (4) Nao testei o Banco de Dados Integrados (BDI) de Uberlandia. (5) Nao verifiquei o frescor 2025/2026 dos CSVs do ISP-RJ: a pagina lista series 'desde 2003/2014' mas o indicativo mais recente que li foi 2022; assumir atualizacao corrente seria chute. (6) Nao abri arquivo individual do Contas Rio - confirmei as secoes e a declaracao de CSV/TXT, nao baixei planilha.

CIDADES DA LISTA QUE NAO AVALIEI. Betim, Vila Velha, Serra, Cariacica, Campos dos Goytacazes, Petropolis e Volta Redonda ficaram sem avaliacao porque o orcamento de WebSearch da sessao (200 chamadas) esgotou antes. Nao inventei nada para elas e nao as incluo como candidatas. Para uma proxima rodada, o caminho barato e testar direto os padroes que se mostraram produtivos: <cidade>.xx.gov.br/arcgis/rest/services?f=pjson, dados.<cidade>.xx.gov.br/api/3/action/package_search e /api/feed/dcat-us/1.1.json. Registro tambem que testei UMA url por palpite proprio (dados.contagem.mg.gov.br) e ela falhou por DNS - esta marcada como tal para o auditor nao confundir com link oficial quebrado.

RECOMENDACAO EM UMA LINHA. Piloto principal Rio de Janeiro pela amplitude de dominios e pela granularidade de bairro comprovada, aceitando que a saude municipal e o elo fraco e que a camada de API esta instavel; piloto de engenharia paralelo em Belo Horizonte, porque CKAN + WFS + GTFS-RT funcionando dao o menor atrito de ingestao e os dados mais frescos (CSV de saude mensal ate 07/2026), com a ressalva de que BH nao tem seguranca publica aberta.

#### Fontes que a execução 1 NÃO confirmou (12 de 43)

- `[fetch-falhou]` **Rio de Janeiro/RJ** — Pasta Seguranca do ArcGIS municipal (FECHADA) — `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Seguranca?f=pjson`
  - motivo/evidência registrada pelo agente: Resposta de erro ArcGIS code 499 'Token Required'. Pasta existe no diretorio raiz mas nao e publica.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — Pasta Bairros_Cariocas do ArcGIS municipal (FECHADA) — `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Bairros_Cariocas?f=pjson`
  - motivo/evidência registrada pelo agente: Erro ArcGIS code 499 'Token Required'. Este era o candidato mais promissor a 'indicadores por bairro' do IPP e NAO esta aberto.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — DATA.RIO - interface web (SPA que nao renderiza sem JS) — `https://www.data.rio/`
  - motivo/evidência registrada pelo agente: WebFetch retornou HTTP 200 mas conteudo vazio - apenas o texto 'DATA.RIO'. Idem para https://www.data.rio/datasets/ e https://www.data.rio/datasets/PCRJ::limite-de-bairros/. E ArcGIS Hub client-side; sem headless browser nao se extrai catalogo nem link de download.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — API de GPS dos onibus SPPO (SMTR/Escritorio de Dados) — `https://dados.mobilidade.rio/gps/sppo`
  - motivo/evidência registrada pelo agente: PRECISAO: o servidor respondeu e comecou a enviar payload, mas o WebFetch abortou com 'maxContentLength size of 10485760 exceeded' (>10 MB). Isso indica endpoint VIVO devolvendo JSON grande, porem NAO consegui inspecionar os campos. Nao afirmo estrutura.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — api.dados.rio (API v2 do Escritorio de Dados) - FORA DO AR — `https://api.dados.rio/`
  - motivo/evidência registrada pelo agente: HTTP 503 Service Unavailable na raiz E no endpoint https://api.dados.rio/v2/clima_pluviometro/precipitacao_15min/ . Testado em 31/07/2026.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — meta.dados.rio (catalogo de metadados do data lake) - FORA DO AR — `https://meta.dados.rio/`
  - motivo/evidência registrada pelo agente: HTTP 503 Service Unavailable em 31/07/2026, apesar de ser o link oficial citado no README do repo queries-datario.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — transparencia.rio.rj.gov.br (hostname morto) — `https://transparencia.rio.rj.gov.br/`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND - o dominio nao resolve. Registro aqui porque e um endereco que aparece em citacoes; o portal correto e transparencia.prefeitura.rio.
- `[fetch-falhou]` **Contagem/MG** — dados.contagem.mg.gov.br (URL hipotetica testada por mim - nao existe) — `https://dados.contagem.mg.gov.br/`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND. TRANSPARENCIA: esta URL nao veio de nenhuma busca - foi um palpite meu de padrao de nomenclatura, e falhou. Registro para o auditor saber que nao ha portal CKAN confirmado em Contagem.
- `[fetch-falhou]` **Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES** — dados.vitoria.es.gov.br - portal municipal citado mas fora do ar — `https://dados.vitoria.es.gov.br/`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. Tambem testei https://dados.vitoria.es.gov.br/api/feed/dcat-us/1.1.json = 404. A URL apareceu em busca como 'Dados Vitoria \| PMV', mas nao serve conteudo.
- `[fetch-falhou]` **Niteroi/RJ** — HUB SIGeo Niteroi - interface web (SPA, nao renderiza) — `https://www.sigeo.niteroi.rj.gov.br/`
  - motivo/evidência registrada pelo agente: Respondeu 200 mas o conteudo extraido foi apenas o titulo 'HUB SIGeo'. Sem JS nao se lista nada; o catalogo so foi obtido pelo feed DCAT.
- `[fetch-falhou]` **Niteroi/RJ** — dados-geoniteroi.opendata.arcgis.com - feed DCAT do dominio antigo — `https://dados-geoniteroi.opendata.arcgis.com/api/feed/dcat-us/1.1.json`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. O dominio ArcGIS Online aparece em resultados de busca (inclusive com filtro por tag 'Saude') mas o feed nao existe mais.
- `[fetch-falhou]` **Uberlandia/MG** — Prefeitura de Uberlandia - Catalogo de Dados Abertos — `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/catalogo-de-dados-abertos/`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Nao inspecionei nenhum conjunto, formato ou contagem.

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

COMO BUSQUEI. Usei WebSearch para descobrir candidatos e WebFetch para abrir cada URL que cito. Fiz 12 buscas e 34 fetches. Buscas: Data.Rio/IPP/Pereira Passos; PBH/BHTrans dados abertos; Escritorio de Dados Rio/api.dados.rio; data.rio limites de bairro e Regioes Administrativas; Niteroi dados abertos/CKAN; Vitoria ES dados abertos/geoportal; Uberlandia dados abertos; Juiz de Fora e Contagem dados abertos; Juiz de Fora geoprocessamento/SIGMAPAS; ES seguranca publica SESP; BH BHMAP/geoservicos/WMS; Vila Velha e Serra geoportal; Campos/Petropolis/Volta Redonda; saude/educacao Rio por bairro; saude municipal Rio (levou ao EpiRio).

TRUQUE QUE DESTRAVOU A VERIFICACAO. Tanto o Data.Rio quanto o Geoweb Vitoria e o HUB SIGeo Niteroi sao Single Page Applications: buscar o HTML da pagina inicial devolve apenas o titulo, sem catalogo. Isso faz portais fortes parecerem vazios. A saida foi atacar os endpoints de maquina: (a) feed DCAT-US em /api/feed/dcat-us/1.1.json dos hubs ArcGIS, que funcionou para www.data.rio e geoweb.vitoria.es.gov.br; (b) diretorios ArcGIS REST (/arcgis/rest/services, /server/rest/services) com ?f=pjson para ler campos de camada; (c) API CKAN (/api/3/action/organization_list, group_list, package_search) para dados.pbh.gov.br, dados.es.gov.br, dados.mg.gov.br e dadosabertos.rj.gov.br; (d) API de item do ArcGIS Online (/sharing/rest/content/items/<id>?f=json) para confirmar titulo e data de um dataset por bairro do Rio sem depender da pagina SPA. Recomendo esse mesmo caminho para a ingestao do piloto.

RESPOSTA DIRETA A PERGUNTA DO BAIRRO NO RIO. Sim, confirmado, e e o diferencial da cidade - mas com nuance. Confirmei abrindo: a camada 'Limite de Bairros' com os campos nome, regiao_adm, codbairro, codra, rp, cod_rp (a chave de join canonica); o dataset de Censo 2022 com populacao e domicilios POR BAIRRO (Feature Service do IPP, modificado em 04/2024, base IBGE de 03/2024); IPTU e ITBI publicados por LOGRADOURO e por divisao administrativa (mais fino que bairro); e 'Microareas SME' na educacao (subdivisao abaixo de bairro). A nuance: seguranca no Rio NAO e por bairro - o ISP-RJ publica por CISP, area de delegacia, que nao coincide com bairro e exige compatibilizacao territorial; e saude sub-municipal no Rio nao aparece em CSV direto, so via TabNet/paineis. Ironicamente, a cidade onde confirmei saude por bairro com exportacao em CSV foi NITEROI, nao o Rio.

O QUE NAO CONSEGUI CONFIRMAR (nao inventei substituto). (1) api.dados.rio/docs deu HTTP 503 - a API do Escritorio de Dados estava fora; nao sei se e queda momentanea ou descontinuacao. (2) A API de GPS dos onibus SPPO do Rio respondeu mas com payload acima de 10MB, que estourou o limite da minha ferramenta; nao li o schema. Testei o BRT no lugar, que funcionou e confirma o padrao. (3) A pasta 'Bairros_Cariocas' do pgeo3 exige login OAuth (302 para siurb.rio) - parte do acervo por bairro do Rio nao e publica. (4) Uberlandia: as duas paginas oficiais de dados abertos deram HTTP 403; nao avaliei a cidade e ela nao deve entrar em ranking sem nova rodada. (5) Duas URLs oficiais de Vitoria estao quebradas com 404: dados.vitoria.es.gov.br e transparencia.vitoria.es.gov.br/DadosAbertos.Lista.aspx - a segunda e indicada pela propria prefeitura. (6) O ArcGIS Hub dados-geoniteroi.opendata.arcgis.com deu 404 no feed. (7) Serra/ES: a URL que aparece em busca (mapas.serra.es.gov.br/links/portal-serra-em-mapas) e um encurtador de links; abri e nao havia conteudo avaliavel, por isso NAO listei Serra como candidata. (8) Campos dos Goytacazes e Petropolis: nao abri nenhuma fonte propria de dados abertos executivos. O que apareceu em busca para Petropolis era a CAMARA municipal, nao a prefeitura. Nao incluo como candidatas por falta de verificacao - ausencia de evidencia aqui e minha, nao necessariamente da cidade. (9) Betim e Cariacica: nao investiguei por limite de tempo. (10) Nao abri o catalogo Geonetwork da PBH nem as subpaginas de download do AlertaRio, portanto nao afirmo o formato exato dos arquivos pluviometricos.

ACHADOS QUE MUDAM A DECISAO E NAO ESTAVAM NO ENUNCIADO. (a) O portal de dados abertos do ESTADO do Rio de Janeiro esta praticamente vazio: 25 grupos tematicos e cerca de 6 datasets no total. Se o piloto contava com camada estadual no RJ, replaneje - a forca esta no municipio do Rio e no ISP, que e orgao separado. (b) Minas Gerais estadual tambem e magro: 96 datasets, e a secretaria de seguranca (SEJUSP) tem 1 dataset e a Policia Civil 1. (c) Em contrapartida, o CKAN do ESPIRITO SANTO tem 52 pacotes de Seguranca Publica, mais que qualquer outro tema estadual que medi no Sudeste. Ou seja, para o dominio seguranca, o ES estadual e superior ao MG estadual, e no RJ o caminho e o ISP e nao o portal estadual. (d) O COR do Rio, apesar da fama, nao publica dado aberto nem API na sua pagina - e vitrine; a fonte utilizavel de clima e o AlertaRio.

RECOMENDACAO DE PILOTO. Rio de Janeiro como piloto principal, pela unica combinacao verificada de amplitude (40 pastas tematicas + catalogo DCAT), acesso realmente aberto (CSV, GeoJSON, Shapefile, ArcGIS REST, API em tempo real) e granularidade por bairro/logradouro. Belo Horizonte como segundo piloto e como par tecnico, porque CKAN mais WFS sao padroes estaveis e faceis de automatizar, e porque a atualizacao esta comprovadamente viva (julho/2026) - use BH para validar o pipeline tabular e o Rio para validar o recorte territorial. Niteroi como piloto pequeno de controle, especialmente para saude por bairro. Se o produto precisar de seguranca com serie longa, puxe ISP-RJ para o RJ e SESP-ES para o ES, e assuma que MG e o elo fraco nesse dominio. Nao use Contagem, Vila Velha, Juiz de Fora ou Volta Redonda como piloto: os tres primeiros sao monodominio comprovado e o ultimo nao foi verificavel.

#### Fontes que a execução 2 NÃO confirmou (8 de 42)

- `[fetch-falhou]` **Rio de Janeiro/RJ** — API de GPS dos onibus SPPO - dados.mobilidade.rio — `https://dados.mobilidade.rio/gps/sppo`
  - motivo/evidência registrada pelo agente: O servidor respondeu, mas o corpo excedeu o limite de 10MB da minha ferramenta ('maxContentLength size of 10485760 exceeded'). Nao consegui ler o schema. O tamanho sugere payload real e grande da frota, mas isso NAO e confirmacao - trate como nao verificado no detalhe.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — pgeo3 - pasta 'Bairros_Cariocas' (indicadores por bairro) — `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Bairros_Cariocas`
  - motivo/evidência registrada pelo agente: HTTP 302 para https://siurb.rio/portal/sharing/rest/oauth2/authorize... - a pasta exige autenticacao ArcGIS. Nao consegui ver o conteudo. Sinal de que parte do acervo por bairro NAO e publica.
- `[fetch-falhou]` **Niteroi/RJ** — ArcGIS Hub de dados geo de Niteroi - feed DCAT — `https://dados-geoniteroi.opendata.arcgis.com/api/feed/dcat-us/1.1.json`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. Esse hub aparece em resultados de busca como portal de dados de Niteroi, mas o feed de catalogo nao existe/nao responde. Possivelmente descontinuado.
- `[fetch-falhou]` **Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES** — Dados Vitoria - suposta API de dados abertos do municipio — `https://dados.vitoria.es.gov.br/`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found na raiz. Esta URL circula em buscas como 'API de dados abertos da Prefeitura de Vitoria' mas nao respondeu. Nao use sem reconfirmar.
- `[fetch-falhou]` **Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES** — Transparencia Vitoria - listagem de Dados Abertos — `https://transparencia.vitoria.es.gov.br/DadosAbertos.Lista.aspx`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. E o endereco indicado pela propria pagina institucional da prefeitura como ponto de acesso aos dados abertos. Link oficial quebrado.
- `[nao-testado]` **Juiz de Fora/MG** — PJF - SIGMAPAS (sistema de informacoes geograficas municipal) — `https://www.pjf.mg.gov.br/desenvolvimentodoterritorio/geoprocessamento/sigmapas.php`
  - motivo/evidência registrada pelo agente: NAO ABRI esta URL. Registro apenas porque resultado de busca indicava que o acesso ao SIGMAPAS deve ser solicitado a SEPUR via 'Prefeitura Agil' e e restrito a servidores municipais. Precisa ser confirmado antes de qualquer decisao.
- `[fetch-falhou]` **Uberlandia/MG** — Prefeitura de Uberlandia - Catalogo de Dados Abertos — `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/catalogo-de-dados-abertos/`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Acesso bloqueado.
- `[fetch-falhou]` **Uberlandia/MG** — Prefeitura de Uberlandia - Dados Abertos (pagina raiz) — `https://www.uberlandia.mg.gov.br/portal-da-transparencia/dados-abertos/`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Acesso bloqueado.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 85 no total — 65 `[fetch-ok]`, 19 `[fetch-falhou]`, 1 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 0 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 0 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 65 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Rio de Janeiro/RJ**
- Execução 2 (`execucao-2`): **Rio de Janeiro/RJ**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Rio de Janeiro/RJ · Belo Horizonte/MG · Contagem/MG · Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES · Niteroi/RJ · Juiz de Fora/MG · Uberlandia/MG

- Execução 2 (`execucao-2`): Rio de Janeiro/RJ · Belo Horizonte/MG · Niteroi/RJ · Vitoria (e Regiao Metropolitana da Grande Vitoria)/ES · Contagem/MG · Vila Velha/ES · Juiz de Fora/MG · Uberlandia/MG · Volta Redonda/RJ

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
