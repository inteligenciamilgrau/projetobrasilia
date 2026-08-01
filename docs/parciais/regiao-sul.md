# regiao:sul — Regiao SUL (PR, SC, RS)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:sul

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
| 1 | `execucao-1` | 19 | 7 | 38 |
| 2 | `execucao-2` | 41 | 7 | 36 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 19)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Curitiba/PR | saude | Portal de Dados Abertos de Curitiba - Sistema E-Saude (perfil de atendimento medico nas unidades municipais) | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e` | csv/xlsx | registro individual | mensal (janela dos ultimos 3 meses por publicacao) | `[fetch-ok]` |
| Curitiba/PR | seguranca | Portal de Dados Abertos de Curitiba - SiGesGuarda (ocorrencias da Guarda Municipal) | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=b16ead9d-835e-41e8-a4d7-dcc4f2b4b627` | csv/xlsx | registro individual com bairro e logradouro | mensal | `[fetch-ok]` |
| Curitiba/PR | outro | Portal de Dados Abertos de Curitiba - SIAC 156 (Sistema Integrado de Atendimento ao Cidadao) | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=0d5a7b06-3940-4be9-876e-bc8f23e96530` | csv/xlsx | registro individual com logradouro, bairro e regional | diaria | `[fetch-ok]` |
| Curitiba/PR | comercio/economia | Portal de Dados Abertos de Curitiba - Base de Alvaras (licencas comerciais e de obras) | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=be211e1f-cff5-44cb-9aaa-1be6b9ec3811` | csv/xlsx | registro individual (empresa/alvara) com endereco e CNAE | mensal | `[fetch-ok]` |
| Curitiba/PR | mobilidade/transito | Portal de Dados Abertos de Curitiba - Transporte Coletivo (URBS) | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=ca40f13b-ef61-472b-810f-dd705f85fd2e` | api | equipamento/unidade (linhas, pontos, veiculos) e posicao GPS | tempo real via WebService; arquivos historicos desde 2012 | `[fetch-ok]` |
| Curitiba/PR | urbanismo/geo | IPPUC - Dados Geograficos (geodownloads) | `https://ippuc.org.br/geodownloads/geo.htm` | geoservico | lote/quadra/bairro (vetorial) | irregular; muitas camadas com atualizacao em fevereiro/2025 | `[fetch-ok]` |
| Curitiba/PR | urbanismo/geo | GeoCuritiba / IPPUC - diretorio ArcGIS REST Services | `https://geocuritiba.ippuc.org.br/server/rest/services` | geoservico | lote/quadra (feature services consultaveis) | continua (servico vivo) | `[fetch-ok]` |
| Curitiba/PR | financas/orcamento | Prefeitura de Curitiba - Dados Abertos do Orcamento (LOA) | `https://orcamentos.curitiba.pr.gov.br/conteudo/dados-abertos/1276` | csv/xlsx | municipio (agregado por orgao/funcao) | anual (por LOA) | `[fetch-ok]` |
| Curitiba/PR | outro | Portal de Dados Abertos de Curitiba - catalogo (raiz) | `https://dadosabertos.curitiba.pr.gov.br/` | portal-dados-abertos | varia por conjunto | por conjunto (diaria a anual) | `[fetch-ok]` |
| Curitiba/PR | seguranca | SESP-PR / CAPE - Estatisticas criminais do Parana | `https://www.seguranca.pr.gov.br/CAPE/Estatisticas` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Curitiba/PR | outro | Portal de Dados Abertos do Parana (IPARDES / BDEweb) | `https://www.dados.pr.gov.br/` | portal-dados-abertos | municipio e regioes intermediarias/imediatas do IBGE | incerta - pagina referencia 'Anuario 2022' | `[fetch-ok]` |
| Porto Alegre/RS | outro | Dados Abertos POA - catalogo de conjuntos (sucessor do DataPOA) | `https://dadosabertos.poa.br/dataset` | portal-dados-abertos | varia por conjunto | por conjunto | `[fetch-ok]` |
| Porto Alegre/RS | outro | Dados Abertos POA - API CKAN (package_list) | `https://dadosabertos.poa.br/api/3/action/package_list` | api | metadados do catalogo | tempo real | `[fetch-ok]` |
| Porto Alegre/RS | saude | Dados Abertos POA - SINAN (Sistema de Informacao de Agravos de Notificacao) | `https://dadosabertos.poa.br/dataset/sinan-sistema-de-informacao-de-agravos-de-notificacao` | csv/xlsx | notificacao (agravo) - granularidade nao declarada na pagina | nao declarada; ultima modificacao 01/07/2026 | `[fetch-ok]` |
| Porto Alegre/RS | saude | Dados Abertos POA - grupo Saude (SINAN, SINASC, SIM, GERCON, GERINT) | `https://dadosabertos.poa.br/group/saude` | csv/xlsx | registro de sistema de informacao em saude | nao declarada na listagem | `[fetch-ok]` |
| Porto Alegre/RS | financas/orcamento | Dados Abertos POA - IPTU (Sistema Integrado de Arrecadacao Tributaria) | `https://dadosabertos.poa.br/dataset/iptu` | csv/xlsx | registro individual por imovel | anual por exercicio; recurso atualizado em 05/07/2026 | `[fetch-ok]` |
| Porto Alegre/RS | financas/orcamento | Dados Abertos POA - Despesas (SDO - Sistema de Despesa Orcamentaria), via API package_show | `https://dadosabertos.poa.br/api/3/action/package_show?id=despesas` | api | empenho/despesa orcamentaria | recursos com last_modified em 15/07/2026 | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | Dados Abertos POA / EPTC - STPoa (Sistema de Transporte Publico), via API package_show | `https://dadosabertos.poa.br/api/3/action/package_show?id=stpoa-sistema-de-transporte-publico-de-porto-alegre` | api | linha/itinerario, ponto de taxi, veiculo da frota | recursos com last_modified em 31/07/2026 (mesmo dia da consulta) | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | Dados Abertos POA - organizacao EPTC (listagem completa) | `https://dadosabertos.poa.br/dataset?organization=eptc` | csv/xlsx | varia (linha, sinalizacao, acidente, vitima) | varia por conjunto | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | Dados Abertos POA / EPTC - GTFS | `https://dadosabertos.poa.br/dataset/gtfs` | csv/xlsx | linha/parada/horario (feed GTFS estatico) | nao declarada; ultima atualizacao 25/09/2025 | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | Dados Abertos POA / EPTC - Acidentes de Transito: Vitimas | `https://dadosabertos.poa.br/dataset/acidentes-de-transito-vitimas` | csv/xlsx | registro individual por vitima | nao declarada; ultima atualizacao 01/09/2025 | `[fetch-ok]` |
| Porto Alegre/RS | urbanismo/geo | Prefeitura de Porto Alegre / SMAMUS - Mapas digitais (PDDUA e camadas urbano-ambientais) | `https://prefeitura.poa.br/smamus/planejamento-urbano/mapas-digitais` | geoservico | subunidade/quarteirao, bairro, regiao de planejamento | por revisao normativa; datas de versao escassas na pagina | `[fetch-ok]` |
| Porto Alegre/RS | educacao | Dados Abertos POA - grupo Educacao | `https://dadosabertos.poa.br/group/educacao` | csv/xlsx | nao declarada | nao declarada | `[fetch-ok]` |
| Porto Alegre/RS | social | Observatorio da Cidade de Porto Alegre (ObservaPOA) - dominio institucional atual | `https://prefeitura.poa.br/smpg/observapoa/observatorio` | painel/dashboard | distrito/bairro e regioes do Orcamento Participativo | por indicador | `[fetch-ok]` |
| Porto Alegre/RS | social | Porto Alegre em Analise (Procempa) - painel de indicadores por bairro | `https://portoalegreemanalise.procempa.com.br/` | painel/dashboard | distrito/bairro (cidade, 16 regioes e 80+ bairros) | por indicador; varios param em 2021-2022 | `[fetch-ok]` |
| Porto Alegre/RS | seguranca | Dados Abertos RS / SSP-RS - Indicadores Criminais de 2025 | `https://dados.rs.gov.br/dataset/indicadores-criminais-de-2025` | csv/xlsx | municipio | mensal (1 arquivo por mes) | `[fetch-ok]` |
| Porto Alegre/RS | seguranca | Dados Abertos RS / SSP-RS - Indicadores Criminais de 2026 (tentativa) | `https://dados.rs.gov.br/dataset/indicadores-criminais-de-2026` | desconhecido | n/a | n/a | `[fetch-falhou]` |
| Porto Alegre/RS | outro | Portal de Dados Abertos do Rio Grande do Sul (dados.rs.gov.br) - catalogo | `https://dados.rs.gov.br/dataset` | portal-dados-abertos | municipio na maioria dos conjuntos | varia por conjunto | `[fetch-ok]` |
| Porto Alegre/RS | outro | DataPOA - dominio legado (teste de disponibilidade) | `http://datapoa.com.br/about` | desconhecido | n/a | n/a | `[fetch-falhou]` |
| Porto Alegre/RS | outro | ObservaPOA - dominio legado observapoa.com.br (teste de disponibilidade) | `http://observapoa.com.br/default.php?p_secao=46&reg=259` | desconhecido | n/a | n/a | `[fetch-falhou]` |
| Caxias do Sul/RS | urbanismo/geo | Dados Abertos Caxias - feed DCAT-US do catalogo (inventario verificavel por maquina) | `https://dadosabertos.caxias.rs.gov.br/api/feed/dcat-us/1.1.json` | api | distrito/bairro e equipamento/unidade (vetorial) | nao exposta no feed lido | `[fetch-ok]` |
| Caxias do Sul/RS | urbanismo/geo | Dados Abertos Caxias - portal ArcGIS Hub (interface de busca) | `https://dadosabertos.caxias.rs.gov.br/search?collection=dataset` | portal-dados-abertos | varia por conjunto | nao verificada | `[fetch-ok]` |
| Blumenau/SC | urbanismo/geo | GEO Blumenau - diretorio ArcGIS REST Services | `https://geo.blumenau.sc.gov.br/server/rest/services` | geoservico | lote/quadra e equipamento (vetorial consultavel) | nao verificada | `[fetch-ok]` |
| Blumenau/SC | financas/orcamento | Portal Transparencia Prefeitura Municipal de Blumenau | `https://transparencia.blumenau.sc.gov.br/` | desconhecido | n/a | n/a | `[fetch-falhou]` |
| Florianopolis/SC | urbanismo/geo | GeoPortal Florianopolis - pagina institucional (REPLAN / Rede de Planejamento PMF) | `https://redeplanejamento.pmf.sc.gov.br/pt-BR/gestao-territorial/geoportal` | geoservico | lote e distrito administrativo | pagina editada por ultimo em 12/03/2025 | `[fetch-ok]` |
| Florianopolis/SC | urbanismo/geo | GeoPortal Florianopolis - aplicacao (tentativa de inventariar camadas e geoservicos) | `https://geoportal.pmf.sc.gov.br/` | desconhecido | nao verificada | nao verificada | `[fetch-falhou]` |
| Londrina/PR | financas/orcamento | Portal da Prefeitura de Londrina - Dados Abertos | `https://portal.londrina.pr.gov.br/dados-abertos` | portal-dados-abertos | municipio (empenho, contrato, licitacao, servidor) | declarada como 'em tempo real', com selecao por exercicio | `[fetch-ok]` |
| Joinville/SC | outro | Prefeitura de Joinville - Joinville Cidade em Dados 2025 | `https://www.joinville.sc.gov.br/publicacoes/joinville-cidade-em-dados-2025/` | pdf/relatorio | municipio (tabelas agregadas dentro de PDF) | anual | `[fetch-ok]` |

### Execução 2 — agente `execucao-2` (journal linha 41)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Porto Alegre/RS | outro | Dados Abertos POA - catalogo (CKAN) | `https://dadosabertos.poa.br/dataset` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Porto Alegre/RS | outro | Dados Abertos POA - CKAN API package_list | `https://dadosabertos.poa.br/api/3/action/package_list` | api | municipio | n/a (endpoint de catalogo) | `[fetch-ok]` |
| Porto Alegre/RS | outro | Dados Abertos POA - API de atividade recente (prova de vida 2026) | `https://dadosabertos.poa.br/api/3/action/recently_changed_packages_activity_list?limit=15` | api | municipio | diaria (apenas para STPoa) | `[fetch-ok]` |
| Porto Alegre/RS | saude | Grupo Saude - SINAN, SINASC, SIM, GERCON, GERINT (SMS Porto Alegre) | `https://dadosabertos.poa.br/group/saude` | csv/xlsx | registro individual (notificacao/nascimento/obito/consulta/internacao) | nao declarada na pagina do grupo | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | Acidentes de Transito - Acidentes (EPTC) | `https://dadosabertos.poa.br/dataset/acidentes-de-transito-acidentes` | csv/xlsx | registro individual (acidente) | nao declarada; ultimo carimbo 01/09/2025 | `[fetch-ok]` |
| Porto Alegre/RS | mobilidade/transito | GTFS - transporte coletivo de Porto Alegre (EPTC) | `https://dadosabertos.poa.br/dataset/gtfs` | csv/xlsx | equipamento/unidade (linhas, paradas, viagens) | nao declarada; ultimo carimbo 25/09/2025 | `[fetch-ok]` |
| Porto Alegre/RS | educacao | Grupo Educacao - SIE (Sistema de Informacoes Educacionais) | `https://dadosabertos.poa.br/group/educacao` | csv/xlsx | desconhecido | desconhecido | `[fetch-ok]` |
| Porto Alegre/RS | social | Porto Alegre em Analise / ObservaPOA (series historicas por bairro) | `https://portoalegreemanalise.procempa.com.br/` | painel/dashboard | distrito/bairro | variavel (anual a decenal, conforme fonte) | `[fetch-ok]` |
| Porto Alegre/RS | urbanismo/geo | Mapas digitais da SMAMUS - Porto Alegre | `https://prefeitura.poa.br/carta-de-servicos/mapas-digitais-da-smamus` | csv/xlsx | distrito/bairro | consulta sob demanda | `[fetch-ok]` |
| Porto Alegre/RS | seguranca | Indicadores Criminais por municipio - SSP/RS (Lei 15.610/2021) | `https://www.ssp.rs.gov.br/indicadores-criminais` | csv/xlsx | municipio | mensal e semestral (dois conjuntos) | `[fetch-ok]` |
| Porto Alegre/RS | outro | Dados RS - portal estadual CKAN (complemento regional) | `https://dados.rs.gov.br/dataset` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Porto Alegre/RS | outro | DataPOA (dominio historico) - MORTO | `http://datapoa.com.br/about` | portal-dados-abertos | desconhecido | n/a | `[fetch-falhou]` |
| Curitiba/PR | outro | Portal de Dados Abertos de Curitiba - home | `https://dadosabertos.curitiba.pr.gov.br/` | portal-dados-abertos | municipio | diaria a mensal conforme conjunto | `[fetch-ok]` |
| Curitiba/PR | outro | Curitiba - listagem de conjuntos, tags e secretarias | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado` | portal-dados-abertos | municipio | variavel | `[fetch-ok]` |
| Curitiba/PR | saude | Sistema E-Saude - Perfil de atendimento Medico nas Unidades Municipais de Saude | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e` | csv/xlsx | registro individual | mensal | `[fetch-ok]` |
| Curitiba/PR | comercio/economia | Base de Alvaras (SMF) - licencas de atividade comercial e edificacoes | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=be211e1f-cff5-44cb-9aaa-1be6b9ec3811` | csv/xlsx | registro individual (estabelecimento) | mensal | `[fetch-ok]` |
| Curitiba/PR | mobilidade/transito | Transporte Coletivo de Curitiba (URBS) - GTFS e web-service | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=ca40f13b-ef61-472b-810f-dd705f85fd2e` | api | equipamento/unidade (linhas, pontos, veiculos) | tempo real (declarado); metadado do conjunto de 26/11/2024 | `[fetch-ok]` |
| Curitiba/PR | urbanismo/geo | IPPUC Geodownloads - Dados Geograficos de Curitiba | `https://ippuc.org.br/geodownloads/geo.htm` | geoservico | equipamento/unidade | nao declarada (contem camada de Eleicoes 2024) | `[fetch-ok]` |
| Curitiba/PR | urbanismo/geo | GeoCuritiba - ArcGIS REST Services Directory (IPPUC) | `https://geocuritiba.ippuc.org.br/server/rest/services` | geoservico | equipamento/unidade | servico continuo | `[fetch-ok]` |
| Curitiba/PR | outro | Hub ArcGIS de Dados Abertos da Prefeitura de Curitiba (SPA - conteudo nao renderizou) | `https://portal-de-dados-abertos-prefeitura-de-curitiba-1-imagem-govmun.hub.arcgis.com/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Curitiba/PR | seguranca | SESP-PR / CAPE - Estatisticas de seguranca publica (BLOQUEADO) | `https://www.seguranca.pr.gov.br/CAPE/Estatisticas` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Curitiba/PR | outro | Curitiba - busca legada do portal antigo (QUEBRADA) | `https://www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1` | portal-dados-abertos | desconhecido | n/a | `[fetch-falhou]` |
| Curitiba/PR | outro | Portal de Dados Abertos do Parana (BDEweb / Ipardes) - complemento estadual | `https://www.dados.pr.gov.br/` | portal-dados-abertos | municipio | variavel | `[fetch-ok]` |
| Caxias do Sul/RS | urbanismo/geo | GIS Caxias do Sul - ArcGIS REST Services Directory | `https://gis.caxias.rs.gov.br/server/rest/services` | geoservico | equipamento/unidade | servico continuo | `[fetch-ok]` |
| Caxias do Sul/RS | outro | Dados Abertos Caxias (Hub ArcGIS) - conteudo nao renderizou | `https://dadosabertos.caxias.rs.gov.br/search?collection=dataset` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Caxias do Sul/RS | social | Observa Caxias - plataforma de indicadores (redirect nao seguido) | `https://observa.caxias.rs.gov.br/` | painel/dashboard | desconhecido | desconhecido | `[fetch-falhou]` |
| Caxias do Sul/RS | seguranca | Indicadores Criminais por municipio - SSP/RS (cobre Caxias do Sul) | `https://www.ssp.rs.gov.br/indicadores-criminais` | csv/xlsx | municipio | mensal e semestral | `[fetch-ok]` |
| Caxias do Sul/RS | outro | Dados RS - portal estadual CKAN (complemento para Caxias) | `https://dados.rs.gov.br/dataset` | portal-dados-abertos | municipio | variavel | `[fetch-ok]` |
| Joinville/SC | urbanismo/geo | SIMGeo Joinville - ArcGIS REST Services Directory | `https://geo.joinville.sc.gov.br/server/rest/services/simgeo/` | geoservico | equipamento/unidade | servico continuo | `[fetch-ok]` |
| Joinville/SC | meio-ambiente | Downloads SIMGeo - Prefeitura de Joinville | `https://www.joinville.sc.gov.br/publicacoes/downloads-sistema-de-informacoes-municipais-georreferenciadas-simgeo/` | geoservico | equipamento/unidade | irregular; ultima 01/04/2026 | `[fetch-ok]` |
| Joinville/SC | outro | Dados Abertos SC - portal estadual CKAN (complemento para Joinville) | `https://dados.sc.gov.br/` | portal-dados-abertos | municipio | nao declarada na home | `[fetch-ok]` |
| Florianopolis/SC | urbanismo/geo | GeoPortal / GeoFloripa - REPLAN, Prefeitura de Florianopolis | `https://redeplanejamento.pmf.sc.gov.br/pt-BR/gestao-territorial/geoportal` | geoservico | distrito/bairro | nao declarada | `[fetch-ok]` |
| Florianopolis/SC | outro | Dados Abertos SC - portal estadual CKAN (base do piloto em Floripa) | `https://dados.sc.gov.br/` | portal-dados-abertos | municipio | nao declarada | `[fetch-ok]` |
| Blumenau/SC | urbanismo/geo | GEO Blumenau - ArcGIS REST Services Directory | `https://geo.blumenau.sc.gov.br/server/rest/services` | geoservico | equipamento/unidade | nao declarada | `[fetch-ok]` |
| Londrina/PR | financas/orcamento | Dados Abertos - Prefeitura de Londrina | `https://portal.londrina.pr.gov.br/dados-abertos` | csv/xlsx | municipio | tempo real (declarado); pagina com carimbo 22/04/2026 | `[fetch-ok]` |
| Londrina/PR | financas/orcamento | Portal Transparencia Maringa (Elotech) - mesmo padrao, nao aberto | `https://maringa.oxy.elotech.com.br/portaltransparencia/` | desconhecido | desconhecido | desconhecido | `[nao-testado]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Curitiba/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

Melhor equilibrio do Sul e provavelmente do Brasil em dados MICRODADOS municipais atualizados. Confirmado ATIVO em 2026: o portal dadosabertos.curitiba.pr.gov.br entrega CSV com granularidade de registro individual e bairro em quatro dominios distintos, com atualizacao mensal ou DIARIA verificada em julho/2026. Diferencial decisivo para o iA Brasil: E-Saude (cada atendimento medico com CID, procedimento, medicamento), SiGesGuarda (cada ocorrencia da Guarda Municipal com bairro e hora), SIAC 156 (cada demanda do cidadao, atualizacao diaria, 86 MB) e Alvaras (cada licenca comercial com CNAE e endereco). Nenhuma outra cidade do Sul entrega esse nivel de detalhe. Soma-se geoservico ArcGIS REST 11.5 vivo (GeoCuritiba) e shapefiles do IPPUC, cobrindo urbanismo e meio ambiente por via geografica.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada em 6 dominios com dados reais: saude (microdados), seguranca (ocorrencias da Guarda), mobilidade (GTFS + posicao de veiculos URBS), comercio/economia (alvaras), financas (LOA 2022-2026) e urbanismo/geo (IPPUC + GeoCuritiba). DUAS LACUNAS REAIS: educacao e meio ambiente. Confirmei nos filtros do portal que as secretarias publicadoras sao COHAB, FCC, IMAP, IPMC, IPPUC, SGM, SMATI, SMCS, SMDT, SMF, SMGP, SMS, SMSAN e URBS - a SME (Educacao) e a SMMA (Meio Ambiente) NAO aparecem. Educacao precisaria vir do Censo Escolar/INEP; meio ambiente so via camadas geo (hidrografia, parques, unidades de conservacao) do IPPUC.

#### 2. Porto Alegre/RS — região: Sul

**`why` (por que o agente apontou esta candidata):**

Empate tecnico com Curitiba, e VENCE em maturidade de acesso programatico. Confirmei que o DataPOA historico MIGROU e esta vivo em dadosabertos.poa.br, rodando CKAN com API REST funcional (package_list retornou 67 slugs; package_show retorna metadata_modified e last_modified por recurso). Isso e o unico portal municipal do Sul onde eu consegui ler metadados por API - vale ouro para um pipeline automatizado do iA Brasil. Cobertura de dominios e a mais larga do Sul: 8 grupos tematicos, com saude em microdados de sistemas nacionais (SINAN, SINASC, SIM, GERCON, GERINT em CSV), tributos por imovel (IPTU 2013-2026), despesa orcamentaria 2018-2026, mobilidade da EPTC (incluindo acidentes com vitima em CSV) e shapefiles do PDDUA/APP/AEIS/bairros. O estado complementa com dados.rs.gov.br (404 conjuntos, 360 em CSV, 35 da SSP com granularidade municipal), preenchendo seguranca e educacao.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

A mais equilibrada do Sul em NUMERO de dominios: administracao e financas (23 conjuntos), meio ambiente e urbanismo (11), servicos urbanos (6), mobilidade (5), saude (5), cultura e turismo (4), educacao (1), industria/comercio/servicos (1). Mas o equilibrio e desigual em PROFUNDIDADE: financas e saude sao fortes e frescas (IPTU 05/07/2026, despesas 15/07/2026, SINAN 01/07/2026); educacao tem UM unico conjunto (SIE) e industria/comercio tambem UM. Seguranca municipal e inexistente - so via SSP-RS no portal estadual. ObservaPOA e o painel 'Porto Alegre em Analise' dao indicadores por 16 regioes e 80+ bairros em 15 temas, mas sem download.

#### 3. Caxias do Sul/RS — região: Sul

**`why` (por que o agente apontou esta candidata):**

Melhor cidade media do Sul e a maior surpresa da pesquisa. Roda um ArcGIS Hub em dadosabertos.caxias.rs.gov.br que eu VALIDEI pelo feed DCAT-US, achando 40+ conjuntos publicados nativamente em CSV, Shapefile, GeoJSON, KML e File Geodatabase, alem de ArcGIS GeoServices consultaveis. E o unico dos municipios medios onde encontrei formato aberto E geoservico E variedade tematica real: equipamentos da rede de ensino (4 conjuntos), equipamentos e servicos de saude, painel de populacao por bairros, mapa de calor de dengue, cobertura de uso do solo, curvas de nivel, recursos hidricos, loteamentos e Censo IBGE 2000/2010/2022 georreferenciado. Para um piloto que precisa de recorte por bairro com baixo custo de engenharia, GeoJSON servido por API bate CSV solto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA em urbanismo/geo e meio ambiente. Saude e educacao aparecem apenas como localizacao de equipamentos (onde estao as escolas e os servicos de saude) e um painel de dengue - nao ha microdado de atendimento, matricula ou notificacao. Seguranca: ZERO. Financas/orcamento: ZERO no portal de dados abertos. Mobilidade/transito: ZERO. Comercio/economia: ZERO. Ou seja, e exatamente o perfil que o criterio 3 manda penalizar - excelente em 2 areas, vazia em 4. Fica como terceiro lugar pela qualidade tecnica do acesso, nao pela amplitude.

#### 4. Blumenau/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Melhor infraestrutura geoespacial municipal de Santa Catarina que consegui verificar de fato. O diretorio ArcGIS REST em geo.blumenau.sc.gov.br esta ATIVO e expoe 23 pastas tematicas consultaveis por API, incluindo Defesa Civil, Meio Ambiente, Planejamento Urbano, Sistema Viario, Drenagem, Geologia, Cadastro Imobiliario, Ciclovias e uma pasta 'dadosestatisticos'. Para uma cidade com historico de desastres hidrologicos, ter Defesa Civil, Drenagem e Geologia como geoservicos vivos e um caso de uso forte e diferenciado para o iA Brasil.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO concentrada em urbanismo/geo, meio ambiente e risco/defesa civil. Nao encontrei nenhum catalogo tabular de dados abertos com microdados de saude, seguranca, educacao ou mobilidade. Financas nao pude nem verificar porque o portal da transparencia falhou no fetch. Cobertura desequilibrada - reprovada pelo criterio 3, entra na lista pela qualidade do geoservico.

#### 5. Florianopolis/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Incluida porque o briefing pediu, mas o resultado da verificacao e um ALERTA: a reputacao de Florianopolis como cidade de tecnologia NAO se traduz em dados abertos municipais verificaveis. Nao encontrei nenhum catalogo de dados abertos da prefeitura. O ativo real e o GeoPortal, institucionalizado pelo Decreto Municipal 26.184/2024 como Sistema Municipal de Informacoes Urbanisticas e Cartografia Oficial, com mapoteca digital, camadas SIG, area de downloads e mencao a 'Geoservicos' com cartilha e tutorial proprios. Mas nao consegui abrir nenhum endpoint de geoservico nem confirmar formato de download.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Praticamente monotematica: urbanismo/geo. Transparencia municipal cobre licitacoes, contratos, convenios, folha de pagamento e diarias - ou seja, o minimo legal de financas, sem microdado. NAO encontrei fonte aberta municipal para saude, seguranca, educacao, mobilidade, comercio ou meio ambiente. Pelos criterios 1 e 3, Florianopolis fica ATRAS de Caxias do Sul e Blumenau, apesar de ser capital.

#### 6. Londrina/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

Verifiquei que existe uma pagina de Dados Abertos operante, mas o escopo e estritamente administrativo-financeiro (plataforma Equiplano): informacoes financeiras e orcamentarias, licitacoes, contratos, convenios, parcerias e pessoal. Serve como baseline de financas/orcamento, nao como piloto. Incluida para documentar que a segunda maior cidade do PR NAO tem cobertura multidominio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentracao TOTAL em financas/orcamento e compras. Confirmei na propria pagina que nao ha conjuntos de saude, seguranca, educacao, transito, economia nem meio ambiente. Reprovada pelo criterio 1 (amplitude) e pelo criterio 3 (equilibrio).

#### 7. Joinville/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Incluida como CASO NEGATIVO documentado, porque o briefing a listou. Joinville tem uma publicacao estatistica robusta e tematicamente ampla, 'Joinville Cidade em Dados 2025', dividida em Ambiente Construido, Ambiente Natural, Desenvolvimento Economico, Desenvolvimento Social e Gestao Institucional. Mas TUDO e PDF. Pelo criterio 2 do briefing ('PDF vale pouco'), Joinville nao e candidata a piloto: seria preciso extrair tabela de PDF, o oposto do que o iA Brasil quer fazer.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

A amplitude TEMATICA e boa (5 eixos cobrindo ambiente construido, natural, economia, social e gestao), o que a torna frustrante: o conteudo existe, o formato inviabiliza. Zero acesso maquinal verificado em qualquer dominio. Nao encontrei portal de dados abertos municipal com CSV/API.

### Execução 2 — agente `execucao-2`

#### 1. Porto Alegre/RS — região: Sul

**`why` (por que o agente apontou esta candidata):**

Melhor COBERTURA EQUILIBRADA do Sul, e o unico caso da regiao onde confirmei API programatica funcionando (CKAN) sobre um catalogo tematicamente distribuido. O portal dadosabertos.poa.br abriu com 56 conjuntos divididos em 8 grupos (Administracao e Financas 23, Meio Ambiente e Urbanismo 11, Servicos Urbanos 6, Mobilidade 5, Saude 5, Cultura e Turismo 4, Educacao 1, Industria/Comercio 1) - ou seja, nenhum dominio essencial esta em zero. A saude nao e simbolica: abri o grupo e sao os cinco sistemas de base (SINAN, SINASC, SIM, GERCON, GERINT) em CSV. Mobilidade tem GTFS real (ZIP) e acidentes de transito da EPTC em CSV. Confirmei via API de atividade que o portal esta VIVO em 2026 (ultima alteracao 01/08/2026). O ponto historico DataPOA (datapoa.com.br) esta MORTO - a conexao caiu - mas migrou para dadosabertos.poa.br, que esta ativo. Somam-se dois complementos que fecham as lacunas: Porto Alegre em Analise (15 temas, 16 regioes, 94+ bairros, incluindo Violencia e Criminalidade) e os Indicadores Criminais da SSP/RS em XLSX por municipio, atualizados em julho de 2026.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada, e a mais equilibrada do Sul. Todos os 8 dominios do briefing tem pelo menos uma fonte aberta verificada: saude (5 sistemas CSV), mobilidade (GTFS + acidentes EPTC), financas (23 conjuntos), urbanismo/meio ambiente (11 conjuntos + shapefile/DWG da SMAMUS), servicos urbanos (6), comercio (1), educacao (1), seguranca (via SSP/RS por municipio + bairro no Porto Alegre em Analise). As duas pontas fracas reais sao educacao (1 unico conjunto) e comercio (1 unico conjunto).

#### 2. Curitiba/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

Perde para Porto Alegre no equilibrio, mas GANHA de longe em PROFUNDIDADE e FRESCOR - e por isso e o co-favorito. O portal dadosabertos.curitiba.pr.gov.br esta inequivocamente ativo em 2026: abri conjuntos com carimbo de 01/08/2026 (hoje) e '9 horas atras'. Dois datasets sao de qualidade rara no Brasil municipal: (a) Sistema E-Saude, CSV de 480,06 MB com registro individual de atendimento medico (demografia do paciente, procedimentos, diagnosticos, prescricoes, encaminhamentos), atualizacao mensal, ultimo arquivo 06/07/2026; (b) Base de Alvaras, CSV de 545,39 MB com 99+ colunas por estabelecimento (razao social, CNAE primario e ate 99 secundarios, endereco, emissao/validade), atualizado 01/08/2026. Isso e materia-prima direta para 'informacao simples e util'. Soma-se o melhor acervo geoespacial do Sul: IPPUC geodownloads (SHAPEFILE + DWG em SAD69/CWB e SIRGAS, 12 categorias) e o ArcGIS REST do GeoCuritiba rodando versao 11.5 (a mais moderna que encontrei na regiao).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA, nao equilibrada - e aqui esta o problema. As tags do proprio portal sao: COVID-19, Cultura, Financeiro, Legislacao, Recursos Humanos, Saude, Seguranca Alimentar, Transporte, Turismo. Note que 'Seguranca Alimentar' NAO e seguranca publica, e nao existe tag Educacao nem Meio Ambiente. Fortes: saude (excelente), comercio/economia (excelente via alvaras), financas, urbanismo/geo (excelente), mobilidade, servicos ao cidadao (SIAC 156). VAZIOS: seguranca publica (zero dataset municipal) e educacao (so localizacao de CMEI/escolas via shapefile do IPPUC - nenhum dado de matricula, rendimento ou vaga). Meio ambiente existe apenas como camada geo, nao como serie de dados.

#### 3. Caxias do Sul/RS — região: Sul

**`why` (por que o agente apontou esta candidata):**

Terceiro colocado e a surpresa positiva da pesquisa: e a unica cidade media do Sul onde encontrei sinal de dados abertos multi-secretaria, nao apenas cartografia. O ArcGIS Server em gis.caxias.rs.gov.br respondeu na versao 11.3 (moderna) com mais de 50 servicos, e os nomes revelam varias secretarias diferentes publicando - SMS (saude), SMED (educacao), SEMMA (meio ambiente) - alem de servicos tematicos como 'Focos_da_Dengue', 'BancodeAlimentosPainel', 'ProjetosAprovados', 'Planialtimetrico' e 'fotos2024'. Isso e mais amplitude institucional do que Joinville ou Blumenau mostram. Combinado com o portal estadual dados.rs.gov.br (404 conjuntos, 360 em CSV, com grupos de Educacao, Saude, Financas e Transporte por municipio) e os indicadores criminais da SSP/RS por municipio, um piloto em Caxias teria cobertura razoavel nos 8 dominios.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Parcialmente equilibrada, mas com viés geoespacial forte. Os dominios aparecem principalmente como CAMADAS DE MAPA (saude, educacao, meio ambiente, urbanismo, dengue) e nao como series tabulares. Financas e seguranca vem de fora (estado). Nao confirmei nenhum CSV municipal de saude, educacao ou orcamento. Amplitude institucional boa, profundidade de dado aberto tabular nao comprovada.

#### 4. Joinville/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Tem a MELHOR infraestrutura geoespacial municipal do Sul depois de Curitiba - e provavelmente a mais bem documentada em SC - mas e um caso claro do que o criterio 3 manda penalizar. O ArcGIS REST do SIMGeo respondeu na versao 11.1 com 39 servicos cobrindo dominios variados ('simgeo/ambiente', 'simgeo/assistencia_social', 'simgeo/base_cartografica', 'simgeo/saude', 'simgeo/instrumentos_urbanisticos', 'simgeo/lotes', 'simgeo/zoneamento_470_2017', 'simgeo/plano_viario_2024'), incluindo 9 ImageServers. A pagina publica de downloads confirma shapefile aberto para 30+ temas e - importante - esta VIVA: atualizacao de 01/04/2026 (Unidades de Conservacao e Marcos Geodesicos). Incluo Joinville como candidato de mergulho vertical em urbanismo/meio ambiente/saneamento, nao como piloto de amplitude.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

DESEQUILIBRADA - concentrada em urbanismo/geo e meio ambiente. Fortes: urbanismo (lotes, zoneamento, plano viario, patrimonio), meio ambiente (geologia, hidrografia, solos, unidades de conservacao, drenagem, saneamento basico), equipamentos de saude (camada de hospitais) e assistencia social (camada). VAZIOS como dado tabular: saude (serie), seguranca, educacao, financas, comercio, mobilidade. Exatamente o perfil que o briefing pede para penalizar.

#### 5. Florianopolis/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Incluo com ressalva forte: e capital, tem GeoPortal institucionalizado por decreto (n. 26.184/2024) sob o IPUF/REPLAN, com Mapoteca Digital, camadas SIG para download e mencao a Geoservicos - infraestrutura de dados espaciais de verdade, com temas declarados de meio ambiente, saude, mobilidade e Plano Diretor. Mas NAO encontrei catalogo municipal de dados abertos tabulares. O que existe fora do geo e Portal da Transparencia (licitacoes, contratos, folha, diarias), instituido pela Lei Municipal 9447/14 - ou seja, o dominio financas com pouco alcance nos outros sete. Como piloto, dependeria fortemente do estado (dados.sc.gov.br, 112 conjuntos).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

DESEQUILIBRADA. Urbanismo/geo bem servido; financas via transparencia; os demais dominios (saude, seguranca, educacao, mobilidade tabular, comercio, meio ambiente como serie) sem fonte municipal aberta confirmada. E a capital mais fraca do Sul em dados abertos nao-geoespaciais.

#### 6. Blumenau/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

Entra apenas como candidato de nicho, honestamente fraco para o piloto. O ArcGIS REST respondeu com 24 pastas tematicas, e a lista e interessante para uma cidade com historico de enchentes: 'Defesa_Civil', 'Drenagem', 'Geologia', 'Meio_Ambiente', 'Obras_Infraestrutura', 'Planejamento_Urbano', 'Sistema_Viario', 'CICLOVIAS', 'Cadastro_Imobiliario', 'Lotes', 'Limites'. Se o piloto fosse tematico (risco climatico e drenagem urbana), Blumenau teria valor. Como piloto de amplitude, nao tem.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO DESEQUILIBRADA - praticamente so urbanismo/geo, meio ambiente e defesa civil. Sem nenhuma fonte municipal aberta confirmada em saude, seguranca, educacao, financas, comercio ou mobilidade tabular.

#### 7. Londrina/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

Incluo deliberadamente como CANDIDATO NEGATIVO documentado, porque e o padrao que o projeto vai encontrar na maioria das cidades medias do Sul e conviria reconhecer cedo. Londrina parece bem servida - a pagina de dados abertos abriu, declara atualizacao em tempo real, ultimo carimbo 22/04/2026, e lista uma lista longa de formatos (CSV, XLS, XLSX, XML, PDF, DOC, DOCX, HTML, ODT, ODS, TXT, RTF). Mas o CONTEUDO e quase inteiro de execucao orcamentaria: financeiro, orcamento, licitacoes, contratos, convenios, legislacao, obras. E um portal de transparencia de fornecedor (Equiplano) vestido de dados abertos. Verifiquei tambem que Maringa segue o mesmo padrao com outro fornecedor (Elotech).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EXTREMAMENTE CONCENTRADA - 1 dominio (financas/orcamento) e um resto de legislacao/obras. Zero em saude, seguranca, educacao, mobilidade, comercio, urbanismo e meio ambiente. Reprovada de forma inequivoca pelo criterio 3.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Curitiba/PR — `red_flags`:**

1) Portal tem apenas 32 conjuntos de dados no total - amplitude por dominio e boa, mas o catalogo e enxuto. 2) Retencao de 1 ano: arquivos mais antigos saem do portal e ficam em servidor rsync da UFPR, o que complica serie historica automatizada. 3) Orcamento (orcamentos.curitiba.pr.gov.br) e XLS/XLSX apenas, sem CSV nem API. 4) Nao ha API REST catalogada tipo CKAN no portal principal (download por arquivo). 5) A pagina de estatisticas criminais do estado (SESP-PR/CAPE) retornou HTTP 403 no meu fetch - o dado de crime policial do PR nao foi confirmado como aberto. 6) dados.pr.gov.br (IPARDES) referencia 'Anuario 2022', sugerindo defasagem. 7) A URL de busca do portal (curitiba.pr.gov.br/dadosabertos/busca/) retornou 403.

**Porto Alegre/RS — `red_flags`:**

1) DOMINIO LEGADO MORTO: datapoa.com.br/about falhou no fetch ('Socket is closed'). Quem citar DataPOA pelo dominio antigo cita coisa fora do ar - o portal vivo e dadosabertos.poa.br. 2) observapoa.com.br falhou com erro de certificado (host nao consta nos altnames, que cobrem apenas *.portoalegre.rs.gov.br) - o ObservaPOA sobrevive em prefeitura.poa.br. 3) FRESCOR DESIGUAL: STPoa foi atualizado em 31/07/2026, mas o GTFS zipado esta em 25/09/2025 e 'Acidentes de Transito - Vitimas' em 01/09/2025 - quase 11 meses de defasagem em dados de sinistro. 4) SEGURANCA ESTADUAL DEFASADA: dados.rs.gov.br/dataset/indicadores-criminais-de-2026 retornou HTTP 404; o conjunto de 2025 tem apenas 10 arquivos (jan-out/2025) e foi mexido em 23/04/2026 - ou seja, nao ha dado criminal de 2026 publicado. 5) O portal tem MAIS PDF que CSV (51 conjuntos com PDF contra 46 com CSV): muitos vem em par CSV+PDF, mas o PDF infla a contagem. 6) 'Porto Alegre em Analise' nao expoe download CSV/XLSX e vários indicadores param em 2021-2022. 7) O grupo educacao com 1 conjunto e a maior fragilidade estrutural.

**Caxias do Sul/RS — `red_flags`:**

1) O site principal e um SPA JavaScript: o fetch de dadosabertos.caxias.rs.gov.br/search?collection=dataset retornou HTTP 200 mas renderizou APENAS o titulo 'Dados Abertos Caxias', sem nenhum conjunto. So consegui inventariar o catalogo pelo feed DCAT - um pipeline ingenuo de scraping falharia. 2) Parte do acervo e PDF puro (Cartas Geotecnicas e relatorios). 3) Varios conjuntos sao apenas 'Web Page + ArcGIS GeoService', sem download tabular (Cobertura de Uso do Solo, Painel de Populacao por Bairros, Mapa de Calor Dengue, Download de Imagens Aereas, Plantas de Loteamentos). 4) NAO consegui verificar datas de ultima atualizacao dos conjuntos - o DCAT lido nao me deu evidencia de frescor 2025-2026. Isso e uma lacuna real na minha verificacao. 5) Dependencia de plataforma proprietaria Esri.

**Blumenau/SC — `red_flags`:**

1) transparencia.blumenau.sc.gov.br FALHOU no fetch com erro de cadeia de certificados TLS ('unable to verify the first certificate') - nao pude confirmar nada sobre a secao de Dados Abertos financeira que os resultados de busca mencionavam. Erro de HTTPS em portal de transparencia e sinal ruim de manutencao. 2) ArcGIS Server na versao 10.71, bem mais antiga que a 11.5 do GeoCuritiba - indica infraestrutura nao atualizada. 3) A raiz do diretorio nao lista servicos, apenas pastas: e preciso navegar pasta por pasta, e ha pastas de trabalho expostas ('teste', 'Camadas_Temporarias' nao, mas 'teste', 'FORMULARIO_CAMPO', 'Hosted'), sinal de ambiente sem separacao clara entre producao e rascunho. 4) NAO verifiquei datas de atualizacao das camadas. 5) O acervo aereo mais antigo ('voo_2003') convive com o recente, sem indicacao de qual e canonico.

**Florianopolis/SC — `red_flags`:**

1) geoportal.pmf.sc.gov.br responde HTTP 200 mas serve apenas o titulo 'Geoportal' (SPA JavaScript) - sem conteudo indexavel. 2) Tentei /server/rest/services (nenhum diretorio ArcGIS) e /arcgis/rest/services (idem, so o shell do SPA): NAO consegui localizar endpoint de geoservico WMS/WFS/REST publico. 3) A pagina descritiva oficial menciona 'Geoservicos' mas NAO especifica formatos de download nem URLs de servico. 4) A propria pagina foi editada por ultimo em 12/03/2025 e o Mapa Fisico e Politico disponivel e da versao 2022. 5) NAO EXISTE portal de dados abertos municipal identificado - so o Portal da Transparencia (Decreto 9988/12, Lei Municipal 9447/14), de escopo administrativo-financeiro. 6) Risco alto para o piloto: sem catalogo tabular, o custo de extracao e alto e imprevisivel.

**Londrina/PR — `red_flags`:**

1) Dominios cobertos: 1 de 8. 2) A pagina exibe 'Ultima Atualizacao: 22 Abril 2026', porem o texto sugere que se trata de metadado do CMS e nao de frescor dos dados. 3) Portal de terceiro (Equiplano), padrao replicado em centenas de municipios - baixa singularidade, sem microdado local. 4) A lista de formatos e inflada (CSV, XLS, XML, PDF, DOC, XLSX, DOCX, HTML, ODT, ODS, TXT, RTF): formatos de escritorio contam como 'aberto' no discurso, mas nao entregam dado estruturado. 5) Nao ha API mencionada.

**Joinville/SC — `red_flags`:**

1) FORMATO ELIMINATORIO: confirmei que os 5 capitulos sao PDF (12 MB, 3 MB, 4 MB, 24 MB e 6 MB) e que NAO ha CSV, XLSX ou qualquer formato legivel por maquina. 2) Publicacao anual, nao serie continua: capitulos liberados em 19/12/2025, com Desenvolvimento Social revisado em 25/05/2026 - cadencia anual e incompativel com um piloto que precise de atualizacao frequente. 3) A unica fonte com API que apareceu para Joinville foi o IPREVILLE (instituto de previdencia dos servidores, JSON/XML) - escopo previdenciario, irrelevante para os 8 dominios do briefing, e NAO a testei. 4) Nao localizei geoportal nem catalogo de dados abertos da prefeitura.

### Execução 2 — agente `execucao-2`

**Porto Alegre/RS — `red_flags`:**

1) FRESCOR DESIGUAL: a atividade recente da API e quase toda de UM dataset (STPoa - transporte). Acidentes de transito da EPTC marcam ultima atualizacao 01/09/2025 e o GTFS 25/09/2025 - cerca de 10-11 meses de defasagem em agosto/2026. Ha risco de catalogo 'vivo na vitrine, parado no miolo'. 2) PDF-HEAVY: o proprio portal contabiliza PDF (51) acima de CSV (46); muitos conjuntos entregam dicionario em PDF, entao a contagem de CSV real por conjunto precisa ser auditada um a um. 3) datapoa.com.br (dominio historico) falhou ao abrir - qualquer material do projeto que aponte para la esta quebrado. 4) Porto Alegre em Analise nao expos botao de export CSV/XLSX na pagina que abri: pode ser painel de leitura, nao fonte de dados brutos - precisa checagem. 5) Nao existe dataset municipal proprio de seguranca publica; depende do estado. 6) Nao consegui confirmar endpoint WFS/WMS proprio da Procempa (mapas.procempa.com.br nao foi aberto).

**Curitiba/PR — `red_flags`:**

1) SEGURANCA PUBLICA = ZERO no municipio, e o complemento estadual falhou: seguranca.pr.gov.br/CAPE/Estatisticas retornou HTTP 403. Nao pude confirmar formato nem granularidade dos dados da SESP-PR. O banco historico da Guarda Municipal (SiGesGuarda) aparece so em noticia de 2015 e nao foi testado - presumir morto ate prova. 2) EDUCACAO = ZERO como dado tabular. 3) API DE TRANSPORTE E GATEADA: a pagina do dataset diz que qualquer pessoa pode acessar, mas a documentacao do web-service da URBS indica entrega de login e senha - nao e download anonimo, e o carimbo do conjunto e de 26/11/2024 (nao 2026). 4) So 32 conjuntos no total - catalogo pequeno; a impressao de robustez vem do tamanho dos arquivos, nao da variedade. 5) URLs LEGADAS QUEBRADAS: www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1 deu HTTP 403 e dadosabertos.curitiba.pr.gov.br/busca/ deu HTTP 404 - qualquer link antigo do projeto vai falhar. 6) O hub ArcGIS de dados abertos abriu (HTTP 200) mas e SPA JavaScript: nenhum dataset renderizou, entao NAO confirmei contagem nem formatos por ali. 7) Formatos do portal limitados a csv/xlsx; nao vi API REST/JSON do catalogo.

**Caxias do Sul/RS — `red_flags`:**

1) NAO CONSEGUI VALIDAR O CATALOGO: dadosabertos.caxias.rs.gov.br respondeu, mas so o titulo 'Dados Abertos Caxias' renderizou - e um Hub ArcGIS em JavaScript. Contagem de conjuntos, categorias e formatos (CSV/GeoJSON/shapefile) NAO foram confirmados. Tudo o que sei com certeza vem do endpoint REST bruto. 2) observa.caxias.rs.gov.br fez redirect 302 para uma aplicacao ExperienceBuilder em gis.caxias.rs.gov.br - nao abri o destino, entao os 'indicadores do Observa Caxias' estao NAO verificados. 3) Presenca de camadas com nome de secretaria (SMS, SMED) nao prova que exista dado aberto de saude ou educacao para download - podem ser apenas mapas internos publicados. 4) Nenhum dataset de mobilidade/transporte identificado. 5) Cidade bem menor que as duas primeiras: menos massa critica de dado e de equipe.

**Joinville/SC — `red_flags`:**

1) NAO EXISTE catalogo de dados abertos nao-geoespacial: minha busca por um portal de conjuntos de dados de Joinville nao retornou NENHUM resultado municipal - so portais de SP, Recife, Rio, Curitiba e federal. Se existe, nao esta indexado. 2) Os 'dominios' de saude e assistencia social sao NOMES DE SERVICO DE MAPA, nao series de dados - nao confirmei download tabular de nenhum deles. 3) Formatos limitados: a pagina de downloads oferece Shapefile, PDF, ZIP e HTML - sem KML, DWG ou geodatabase, e sem CSV. 4) Muito material historico (aerofotogrametria 1938-2010) infla a contagem de 'temas' sem agregar dado atual. 5) Zoneamento referenciado a lei de 2017 e ortofotos antigas em varios servicos. 6) Transparencia municipal existe, mas o que encontrei foi relatorio de prestacao de contas em PDF - vale pouco pelo criterio 2.

**Florianopolis/SC — `red_flags`:**

1) Minha busca por portal CKAN ou catalogo de dados abertos de Florianopolis NAO retornou nada municipal - so o portal estadual dados.sc.gov.br e portais de outros estados. Isso e evidencia negativa relevante. 2) O GeoPortal menciona 'Geoservicos' e download de 'camadas em SIG', mas NAO consegui confirmar nenhum endpoint WMS/WFS/REST nem link direto de shapefile/GeoJSON - a pagina institucional nao os expoe. 3) A unica data na pagina do GeoPortal e 12/03/2025 (edicao); nao ha prova de atualizacao em 2026. 4) Boa parte do valor da plataforma esta em SERVICOS (viabilidade de construcao, certidoes de endereco), nao em dado bruto reutilizavel. 5) Mapa fisico-politico referenciado e versao 2022. 6) Portal da Transparencia e principalmente consulta em tela/PDF - vale pouco pelo criterio 2 e nao foi aberto por mim.

**Blumenau/SC — `red_flags`:**

1) ArcGIS Server na versao 10.71 - tecnologia antiga (geracao 2019), a mais defasada entre os servidores que testei no Sul; risco de descontinuidade. 2) A raiz do diretorio mostra 'None' em Services: nada publicado no nivel raiz, tudo dentro de pastas - preciso auditar pasta por pasta para saber o que e realmente publico. 3) Nao encontrei portal de dados abertos tabulares de Blumenau. 4) A oferta de download que aparece em busca e de levantamento aereo 2022/2023 em DWG, TIFF e Raster - formatos de engenharia/CAD, nao dados prontos para analise; e nao abri essa pagina de download, entao esta NAO verificada. 5) Base cartografica noticiada como 'atualizada apos 20 anos', o que sugere historico longo de estagnacao.

**Londrina/PR — `red_flags`:**

1) 'Dados abertos' aqui e sinonimo de transparencia orcamentaria - a amplitude prometida nao existe. 2) Sem catalogo legivel por maquina: nao ha DCAT, nem API JSON, nem CKAN; a propria pagina nao expoe um indice de conjuntos. 3) O acesso real acontece em dominio de fornecedor (portal-prefeitura-londrina.equiplano.cloud), com risco de mudanca de URL e de tela fora do controle da prefeitura - e eu NAO abri esse dominio. 4) Lista de 12 formatos inflada: incluir DOC, RTF e PDF na vitrine sugere que muito conteudo nao e tabular. 5) 'Londrina em Dados' aparece com ultima atualizacao de 14/05/2025 e nao foi aberto por mim. 6) Maringa: nenhum portal de dados abertos com CSV/API foi localizado; so transparencia de fornecedor - nao testado.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

METODO. Trabalhei em duas camadas: WebSearch para descobrir candidatos e WebFetch para ABRIR cada URL que reporto. Cada item com verified="fetch-ok" foi efetivamente aberto nesta sessao e o campo evidence traz trecho concreto do que a pagina devolveu. Cada "fetch-falhou" traz o erro literal. Nao reporto nenhuma URL que eu nao tenha chamado. Total: ~30 chamadas de WebFetch e 13 de WebSearch.

BUSCAS REALIZADAS. Curitiba dados abertos 2025/2026; DataPOA ativo em 2026; IPPUC geodados/GeoCuritiba ArcGIS REST; SSP-RS indicadores criminais CSV por municipio; Florianopolis dados abertos e geoprocessamento IPUF; Joinville dados abertos; dados abertos Parana estado; ObservaPOA; Porto Alegre GTFS/EPTC; Porto Alegre geoportal/SIG/shapefile; Londrina dados abertos; Maringa dados abertos; Caxias do Sul dados abertos; Blumenau/Chapeco/Itajai dados abertos e geoportal; Chapeco/Pelotas/Canoas/Novo Hamburgo/Ponta Grossa CKAN; Curitiba educacao/SME e Curitiba saude/e-saude; SESP-PR estatisticas criminais.

RESPOSTA DIRETA AO PONTO DO BRIEFING SOBRE OS CANDIDATOS HISTORICOS. (a) Dados abertos de Curitiba: ATIVO e um dos melhores do pais em microdados. Confirmei arquivos datados de 30/07/2026 (SIAC 156, diario), 06/07/2026 (E-Saude) e 01/07/2026 (SiGesGuarda e Alvaras). (b) DataPOA: MIGROU. O dominio historico datapoa.com.br NAO responde (falha 'Socket is closed'); o portal vivo e dadosabertos.poa.br, rodando CKAN, e esta atualizado - a API package_show mostrou recursos do STPoa com last_modified em 31/07/2026, mesmo dia da consulta, e despesas em 15/07/2026. Recomendo que o projeto NAO use mais o nome/dominio DataPOA em documentacao. O ObservaPOA tambem trocou de casa: observapoa.com.br esta com certificado TLS invalido (host fora dos altnames, que so cobrem *.portoalegre.rs.gov.br); o correto e prefeitura.poa.br/smpg/observapoa.

RECOMENDACAO DE PILOTO. Curitiba como piloto principal, Porto Alegre como segundo obrigatorio. Curitiba ganha em granularidade e frescor (4 bases de microdados com bairro e/ou registro individual, atualizacao diaria ou mensal, todas com arquivo de julho/2026). Porto Alegre ganha em acesso programatico (unico portal municipal do Sul com API CKAN funcional que consegui ler, permitindo checar metadata_modified por conjunto) e em amplitude nominal (8 grupos tematicos). As duas se complementam: rodar o piloto nas duas cobre os 8 dominios com mais folga do que qualquer uma isolada. Se o piloto precisar de uma cidade media, Caxias do Sul e a melhor opcao tecnica (GeoJSON/CSV/Shapefile servidos por API), com a ressalva de ser geo-centrica.

O QUE NAO CONSEGUI CONFIRMAR (lacunas honestas). 1) Dados criminais policiais do PARANA: a pagina da SESP-PR/CAPE retornou HTTP 403 no fetch, entao nao sei formato, granularidade nem periodicidade - o dominio seguranca em Curitiba esta verificado apenas pela Guarda Municipal (SiGesGuarda), que nao equivale a boletim de ocorrencia policial. 2) Dados criminais do RS de 2026: dataset 404; o de 2025 para em outubro/2025. Ha defasagem real de 9+ meses no dado criminal aberto do RS. 3) Datas de atualizacao dos conjuntos de Caxias do Sul e das camadas de Blumenau: nao obtive evidencia de frescor 2025-2026 para nenhuma das duas. 4) Endpoints de geoservico de Florianopolis: tentei tres URLs e nao localizei diretorio REST algum. 5) Formatos de download do GeoItajai: a pagina de servico descreve os aplicativos (UBS, dengue, escolas, cadastro de arvores INIS, Descarta.i, Itajai 2040) mas nao documenta formato; geo.itajai.sc.gov.br/server/rest/services deu HTTP 404.

CIDADES DO BRIEFING QUE NAO ENTRARAM COMO CANDIDATAS, E POR QUE. Nao encontrei portal de dados abertos municipal com acesso maquinal para Maringa, Chapeco, Pelotas, Canoas, Novo Hamburgo, Ponta Grossa, Cascavel e Sao Jose dos Pinhais. Para essas eu deliberadamente NAO reporto fonte alguma, porque nao abri URL nenhuma que sustentasse a afirmacao - o sinal e ausencia de resultado em busca, nao verificacao positiva ou negativa. Itajai (SC) foi verificada parcialmente: existe o GeoItajai como conjunto de visualizadores tematicos, mas sem download documentado e com o diretorio REST em 404, ficou abaixo da barra para virar candidata. Trate essas oito cidades como 'nao investigadas a fundo', nao como 'sem dados'.

VIES DE FERRAMENTA A CONSIDERAR. Portais construidos como SPA JavaScript (ArcGIS Hub de Caxias do Sul, GeoPortal de Florianopolis) sao sistematicamente subestimados por fetch de HTML, porque devolvem apenas o shell da pagina. Em Caxias contornei via feed DCAT e o acervo se mostrou bem maior do que o HTML sugeria; em Florianopolis nao achei rota alternativa. Ou seja: parte da minha avaliacao negativa de Florianopolis pode ser limitacao do meu instrumento e nao pobreza do portal. Recomendo uma checagem manual em navegador antes de descartar Florianopolis em definitivo. Tambem esgotei o orcamento de WebSearch da sessao (200/200), o que encerrou a fase de descoberta antes de eu cobrir as cidades medias restantes.

#### Fontes que a execução 1 NÃO confirmou (6 de 38)

- `[fetch-falhou]` **Curitiba/PR** — SESP-PR / CAPE - Estatisticas criminais do Parana — `https://www.seguranca.pr.gov.br/CAPE/Estatisticas`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden no fetch. NAO consegui confirmar formato, granularidade nem periodicidade dos dados criminais do Parana. Assumir que crime policial em Curitiba e um dominio NAO verificado.
- `[fetch-falhou]` **Porto Alegre/RS** — Dados Abertos RS / SSP-RS - Indicadores Criminais de 2026 (tentativa) — `https://dados.rs.gov.br/dataset/indicadores-criminais-de-2026`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. NAO existe conjunto de indicadores criminais de 2026 publicado no portal em 31/07/2026. Combinado com o conjunto de 2025 parando em outubro/2025, isso indica defasagem de 9+ meses no dado criminal aberto do RS.
- `[fetch-falhou]` **Porto Alegre/RS** — DataPOA - dominio legado (teste de disponibilidade) — `http://datapoa.com.br/about`
  - motivo/evidência registrada pelo agente: Falha de rede: 'Socket is closed'. O dominio historico do DataPOA NAO respondeu. O portal vivo e dadosabertos.poa.br - qualquer referencia a datapoa.com.br deve ser considerada morta.
- `[fetch-falhou]` **Porto Alegre/RS** — ObservaPOA - dominio legado observapoa.com.br (teste de disponibilidade) — `http://observapoa.com.br/default.php?p_secao=46&reg=259`
  - motivo/evidência registrada pelo agente: Erro de TLS: 'Hostname/IP does not match certificate's altnames: Host: observapoa.com.br is not in the cert's altnames: DNS:*.portoalegre.rs.gov.br, DNS:portoalegre.rs.gov.br'. O dominio legado esta com certificado invalido; usar prefeitura.poa.br/smpg/observapoa.
- `[fetch-falhou]` **Blumenau/SC** — Portal Transparencia Prefeitura Municipal de Blumenau — `https://transparencia.blumenau.sc.gov.br/`
  - motivo/evidência registrada pelo agente: Falha de TLS: 'unable to verify the first certificate' - cadeia de certificados incompleta no servidor. NAO consegui confirmar a existencia nem o formato da secao 'Dados Abertos' desse portal.
- `[fetch-falhou]` **Florianopolis/SC** — GeoPortal Florianopolis - aplicacao (tentativa de inventariar camadas e geoservicos) — `https://geoportal.pmf.sc.gov.br/`
  - motivo/evidência registrada pelo agente: HTTP 200 porem a pagina renderiza SOMENTE o cabecalho 'Geoportal' - e um SPA JavaScript sem conteudo servido. Tentei ainda https://geoportal.pmf.sc.gov.br/server/rest/services e https://geoportal.pmf.sc.gov.br/arcgis/rest/services e NENHUM dos dois retornou diretorio ArcGIS REST. Conclusao honesta: nao consegui verificar camada, formato nem endpoint algum de Florianopolis.

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

METODO. Trabalhei em pares de chamadas: WebSearch para descobrir candidatos e WebFetch para ABRIR cada URL antes de cita-la. Nenhuma URL marcada "fetch-ok" foi escrita de memoria - todas passaram por WebFetch nesta sessao, e as evidencias sao trechos do que a pagina efetivamente devolveu (contagens, carimbos de data, nomes de servico, tamanhos de arquivo). Fiz 26 chamadas WebFetch e 12 WebSearch.

BUSCAS REALIZADAS: dados abertos Curitiba 2026 API CSV; DataPOA Porto Alegre ativo 2025-2026; Florianopolis dados abertos CKAN; "dados abertos" Florianopolis pmf.sc.gov.br CSV; Joinville dados abertos SIMGeo; IPPUC geodownloads shapefile; URBS Curitiba GTFS API; ObservaPOA / EPTC dados abertos; Londrina dados abertos CKAN; Maringa dados abertos CSV API; SSP RS indicadores criminais por municipio; dados abertos Parana estado; Porto Alegre geoportal Procempa WFS; Florianopolis geoportal IPUF; Curitiba e-Saude / Guarda Municipal; Caxias do Sul dados abertos CKAN; Joinville dados abertos conjuntos 2025-2026; SESP-PR estatisticas; Joinville paineis de indicadores; Blumenau/Chapeco/Pelotas/Canoas dados abertos; Ponta Grossa/Cascavel/Sao Jose dos Pinhais/Novo Hamburgo/Itajai dados abertos.

RESPOSTA DIRETA AS DUAS PERGUNTAS DO BRIEFING. (a) Dados abertos de Curitiba: ATIVOS e entre os mais frescos do Brasil municipal - abri conjuntos com carimbo de 01/08/2026, algumas horas antes da consulta. Porem o dominio LEGADO esta quebrado: www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1 retornou HTTP 403 e dadosabertos.curitiba.pr.gov.br/busca/ retornou HTTP 404. O portal vivo e dadosabertos.curitiba.pr.gov.br. (b) DataPOA: a MARCA sobreviveu, o DOMINIO nao. http://datapoa.com.br/about falhou com "Socket is closed". O portal ativo e dadosabertos.poa.br, e confirmei vida real em 2026 pela API de atividade do CKAN (ultima alteracao 01/08/2026 04:59 UTC). Atencao: essa atividade recente e quase toda de UM dataset (STPoa - transporte); outros conjuntos importantes tem carimbo de setembro/2025, entao "portal ativo" nao significa "catalogo atualizado".

O QUE NAO CONSEGUI CONFIRMAR (lacunas honestas). 1) SESP-PR (seguranca.pr.gov.br/CAPE/Estatisticas) retornou HTTP 403 - a lacuna de seguranca publica de Curitiba fica NAO resolvida; nao sei formato, anos nem granularidade. 2) Tres Hubs ArcGIS responderam HTTP 200 mas sao SPAs JavaScript e nao renderizaram conteudo: o hub de dados abertos de Curitiba, o dadosabertos.caxias.rs.gov.br e (por redirect 302 nao seguido) o observa.caxias.rs.gov.br. Para Caxias e Curitiba contornei indo ao ArcGIS REST bruto, que e server-side e devolveu listas reais de servicos - por isso a evidencia de Caxias vem do REST, nao do catalogo. 3) Nao abri: mapas.procempa.com.br, geo.pontagrossa.pr.gov.br, webgeo de Sao Jose dos Pinhais, geopelotas-pmpel.hub.arcgis.com, o portal Elotech de Maringa, nem o dominio Equiplano de Londrina - todos marcados "nao-testado" ou omitidos. 4) Porto Alegre em Analise: nao localizei botao de export CSV/XLSX; pode ser painel de leitura e nao fonte de dado bruto. 5) Chapeco, Canoas, Novo Hamburgo, Itajai e Cascavel: NENHUM portal de dados abertos ou geoportal municipal apareceu nas buscas. Nao afirmo que nao exista - afirmo que nao esta indexado de forma encontravel, o que por si so desqualifica essas cidades para um piloto.

PADRAO ENCONTRADO NA REGIAO SUL, util para o projeto. Existem tres camadas distintas e vale nao confundi-las. (i) Duas cidades com dados abertos de verdade e multi-dominio: Porto Alegre (amplitude + API CKAN) e Curitiba (profundidade + frescor + melhor geo). (ii) Um cinturao de cidades medias com boa infraestrutura GEOESPACIAL e nada mais: Joinville, Caxias do Sul, Blumenau, Pelotas, Ponta Grossa, Sao Jose dos Pinhais. Nessas, "dados abertos" quase sempre quer dizer shapefile e servico de mapa. (iii) Cidades onde "dados abertos" e apenas transparencia orcamentaria de fornecedor: Londrina (Equiplano) e Maringa (Elotech). Consequencia pratica: se o piloto exigir cobertura equilibrada nos 8 dominios, so Porto Alegre e Curitiba passam, e ambas precisam de complemento estadual para seguranca publica - RS resolve bem (SSP/RS em XLSX por municipio, atualizado julho/2026, mais dados.rs.gov.br com 404 conjuntos e 360 em CSV), PR nao pude verificar (403). Isso e, por si, um argumento tecnico a favor de Porto Alegre como piloto.

RECOMENDACAO. Porto Alegre em primeiro pelos criterios na ordem dada (amplitude e equilibrio de dominios + API programatica confirmada + ecossistema estadual verificavel). Curitiba em segundo, praticamente empatada e superior se o projeto priorizar valor por dataset: e-Saude com 480 MB de registro individual de atendimento e Base de Alvaras com 545 MB e 99+ colunas por estabelecimento, ambas atualizadas em julho/agosto de 2026, sao materia-prima melhor que qualquer coisa que vi em POA. Sugestao concreta: piloto em Porto Alegre pela cobertura, com um recorte tematico paralelo em Curitiba (saude + comercio) para demonstrar profundidade. Antes de fechar, recomendo duas auditorias que nao pude concluir: reabrir a SESP-PR por outro caminho para medir a lacuna de seguranca de Curitiba, e varrer conjunto por conjunto o CKAN de POA para separar os realmente atualizados dos parados desde setembro/2025.

#### Fontes que a execução 2 NÃO confirmou (5 de 36)

- `[fetch-falhou]` **Porto Alegre/RS** — DataPOA (dominio historico) - MORTO — `http://datapoa.com.br/about`
  - motivo/evidência registrada pelo agente: Erro 'Socket is closed'. Nao respondeu. O DataPOA como marca sobrevive, mas o dominio historico nao serve mais - o portal vivo e dadosabertos.poa.br.
- `[fetch-falhou]` **Curitiba/PR** — SESP-PR / CAPE - Estatisticas de seguranca publica (BLOQUEADO) — `https://www.seguranca.pr.gov.br/CAPE/Estatisticas`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Nao consegui confirmar formatos (CSV/XLS/PDF), anos disponiveis nem se ha desagregacao por municipio. Esta e a lacuna critica de Curitiba e ficou NAO verificada.
- `[fetch-falhou]` **Curitiba/PR** — Curitiba - busca legada do portal antigo (QUEBRADA) — `https://www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. Tambem testei https://dadosabertos.curitiba.pr.gov.br/busca/ que retornou HTTP 404. Links legados de dados abertos de Curitiba nao devem ser reutilizados.
- `[fetch-falhou]` **Caxias do Sul/RS** — Observa Caxias - plataforma de indicadores (redirect nao seguido) — `https://observa.caxias.rs.gov.br/`
  - motivo/evidência registrada pelo agente: Retornou HTTP 302 Found redirecionando para outro host: https://gis.caxias.rs.gov.br/portal/apps/experiencebuilder/experience/?id=a72f96cbe27c48d280dafb92b879ab8b . Nao abri o destino; temas, indicadores e existencia de export CSV permanecem NAO verificados.
- `[nao-testado]` **Londrina/PR** — Portal Transparencia Maringa (Elotech) - mesmo padrao, nao aberto — `https://maringa.oxy.elotech.com.br/portaltransparencia/`
  - motivo/evidência registrada pelo agente: nao reportado

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 74 no total — 63 `[fetch-ok]`, 10 `[fetch-falhou]`, 1 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 0 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 0 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 63 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Curitiba/PR**
- Execução 2 (`execucao-2`): **Porto Alegre/RS**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Curitiba/PR · Porto Alegre/RS · Caxias do Sul/RS · Blumenau/SC · Florianopolis/SC · Londrina/PR · Joinville/SC

- Execução 2 (`execucao-2`): Porto Alegre/RS · Curitiba/PR · Caxias do Sul/RS · Joinville/SC · Florianopolis/SC · Blumenau/SC · Londrina/PR

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
