# indices:portais-ckan — Municipios com PORTAL DE DADOS ABERTOS de verdade (CKAN, Socrata, dados.<cidade>.gov.br ou catalogo proprio com download/API)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** indices:portais-ckan

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
| 1 | `execucao-1` | 43 | 9 | 48 |
| — | `execucao-sem-resultado` | sem linha `result` no journal | nao reportado | nao reportado |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 43)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Recife/PE | outro | Portal de Dados Abertos da Prefeitura do Recife - CKAN API package_list | `https://dados.recife.pe.gov.br/api/3/action/package_list` | api | varia: municipio, equipamento/unidade e registro individual | continua por dataset | `[fetch-ok]` |
| Recife/PE | outro | Recife CKAN - lista de grupos tematicos (group_list) | `https://dados.recife.pe.gov.br/api/3/action/group_list` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Recife/PE | outro | Recife - pagina de grupos com contagem por dominio | `https://dados.recife.pe.gov.br/group` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Recife/PE | saude | Recife - grupo Saude (65 datasets) | `https://dados.recife.pe.gov.br/group/saude` | portal-dados-abertos | equipamento/unidade e registro individual | varia por dataset | `[fetch-ok]` |
| Recife/PE | mobilidade/transito | Recife - Acidentes de Transito com e sem Vitimas (CTTU), package_show | `https://dados.recife.pe.gov.br/api/3/action/package_show?id=acidentes-de-transito-com-e-sem-vitimas` | api | registro individual (por acidente) | anual; ultima alteracao 2026-03-02 | `[fetch-ok]` |
| Recife/PE | outro | Recife CKAN - package_search ordenado por metadata_modified | `https://dados.recife.pe.gov.br/api/3/action/package_search?rows=3&sort=metadata_modified+desc` | api | desconhecido | ultima atualizacao do portal: 2026-07-07 | `[fetch-ok]` |
| Recife/PE | outro | Recife CKAN - group_list com all_fields (QUEBRADO) | `https://dados.recife.pe.gov.br/api/3/action/group_list?all_fields=true` | api | desconhecido | n/a | `[fetch-falhou]` |
| Sao Paulo/SP | outro | Portal de Dados Abertos da Cidade de Sao Paulo - CKAN API package_list | `https://dados.prefeitura.sp.gov.br/api/3/action/package_list` | api | varia: municipio, distrito/subprefeitura, equipamento/unidade | continua | `[fetch-ok]` |
| Sao Paulo/SP | outro | Sao Paulo CKAN - grupos tematicos com package_count | `https://dados.prefeitura.sp.gov.br/api/3/action/group_list?all_fields=true` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Sao Paulo/SP | outro | Sao Paulo CKAN - package_search por data de modificacao | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?rows=5&sort=metadata_modified+desc` | api | desconhecido | diaria/quase diaria - ultima 2026-07-31 | `[fetch-ok]` |
| Sao Paulo/SP | seguranca | Sao Paulo CKAN - busca livre 'seguranca' | `https://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=seguranca&rows=0` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Sao Paulo/SP | outro | Prefeitura de SP / CGM - pagina institucional Dados Abertos | `https://prefeitura.sp.gov.br/web/controladoria_geral/w/coordenadoria_de_promocao_da_integridade/225082` | portal-dados-abertos | desconhecido | desconhecido | `[nao-testado]` |
| Fortaleza/CE | outro | Fortaleza Dados Abertos - CKAN API package_list | `https://dados.fortaleza.ce.gov.br/api/3/action/package_list` | api | varia: municipio, bairro e equipamento/unidade | continua | `[fetch-ok]` |
| Fortaleza/CE | outro | Fortaleza CKAN - grupos tematicos com package_count | `https://dados.fortaleza.ce.gov.br/api/3/action/group_list?all_fields=true` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Fortaleza/CE | outro | Fortaleza CKAN - package_search por data de modificacao | `https://dados.fortaleza.ce.gov.br/api/3/action/package_search?rows=5&sort=metadata_modified+desc` | api | desconhecido | ultima atualizacao 2026-07-31 | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | data.rio - OGC API / ArcGIS Hub search (contagem total) | `https://www.data.rio/api/search/v1/collections/dataset/items?limit=1` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | data.rio - feed DCAT-US 1.1 do catalogo | `https://www.data.rio/api/feed/dcat-us/1.1.json` | geoservico | logradouro, bairro e divisao administrativa AP/RP/RA | varia; ano vigente para IPTU/ITBI | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | Escritorio de Dados da Prefeitura do Rio - Datalake | `https://www.dados.rio/datalake` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | gw.dados.rio - gateway de APIs do Escritorio de Dados | `https://gw.dados.rio/docs` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | data.rio - pagina de busca (ilegivel) | `https://www.data.rio/search` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Belo Horizonte/MG | outro | Portal de Dados Abertos da PBH - CKAN API package_list | `https://dados.pbh.gov.br/api/3/action/package_list` | api | varia: municipio, bairro/regional e camada geoespacial | continua/diaria | `[fetch-ok]` |
| Belo Horizonte/MG | outro | BH CKAN - organizacoes com package_count (visao real de cobertura) | `https://dados.pbh.gov.br/api/3/action/organization_list?all_fields=true` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Belo Horizonte/MG | outro | BH CKAN - grupos tematicos (maioria zerada) | `https://dados.pbh.gov.br/api/3/action/group_list?all_fields=true` | api | desconhecido | desconhecido | `[fetch-ok]` |
| Belo Horizonte/MG | outro | BH CKAN - package_search por data de modificacao | `https://dados.pbh.gov.br/api/3/action/package_search?rows=3&sort=metadata_modified+desc` | api | desconhecido | diaria - ultima 2026-07-31 | `[fetch-ok]` |
| Belo Horizonte/MG | outro | ckan.pbh.gov.br - instancia CKAN alternativa/espelho | `https://ckan.pbh.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[nao-testado]` |
| Porto Alegre/RS | outro | Dados Abertos POA - CKAN API package_list | `https://dadosabertos.poa.br/api/3/action/package_list` | api | varia: municipio, bairro e equipamento; GTFS por parada/linha | continua | `[fetch-ok]` |
| Porto Alegre/RS | outro | POA CKAN - package_search por data de modificacao | `https://dadosabertos.poa.br/api/3/action/package_search?rows=3&sort=metadata_modified+desc` | api | desconhecido | ultima atualizacao 2026-08-01 (a mais fresca do levantamento) | `[fetch-ok]` |
| Porto Alegre/RS | outro | dados.portoalegre.rs.gov.br - URL antiga (redireciona) | `https://dados.portoalegre.rs.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-ok]` |
| Porto Alegre/RS | outro | datapoa.com.br - dominio legado (falhou) | `http://datapoa.com.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Curitiba/PR | outro | Dados Abertos Curitiba - pagina inicial | `https://dadosabertos.curitiba.pr.gov.br/` | portal-dados-abertos | desconhecido | estagnado (+0% pelo proprio contador) | `[fetch-ok]` |
| Curitiba/PR | outro | Dados Abertos Curitiba - listagem do catalogo /ConjuntoDado | `https://dadosabertos.curitiba.pr.gov.br/ConjuntoDado` | csv/xlsx | equipamento/unidade e agregado municipal | desconhecido | `[fetch-ok]` |
| Curitiba/PR | outro | Curitiba - tentativa de API CKAN (INEXISTENTE) | `https://dadosabertos.curitiba.pr.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Curitiba/PR | outro | Curitiba - FAQ do portal (declara ausencia de API) | `https://dadosabertos.curitiba.pr.gov.br/informacoes/perguntasfrequentes` | portal-dados-abertos | desconhecido | desconhecido | `[nao-testado]` |
| Brasilia/DF/DF | outro | Portal de Dados Abertos do Governo de Brasilia - catalogo /dataset | `https://www.dados.df.gov.br/dataset` | desconhecido | desconhecido | desconhecido | `[fetch-ok]` |
| Brasilia/DF/DF | outro | DF - tentativa de API CKAN com www (FALHOU) | `https://www.dados.df.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Brasilia/DF/DF | outro | DF - tentativa de API CKAN sem www (FALHOU) | `https://dados.df.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | dadosgovbr/catalogos-dados-brasil - CSV de catalogos (branch master) | `https://raw.githubusercontent.com/dadosgovbr/catalogos-dados-brasil/master/dados/catalogos.csv` | csv/xlsx | n/a (metadados de catalogos) | desatualizado - contem URLs mortas e classificacoes erradas | `[fetch-ok]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | dadosgovbr/catalogos-dados-brasil - repositorio | `https://github.com/dadosgovbr/catalogos-dados-brasil` | portal-dados-abertos | n/a | desconhecido | `[fetch-ok]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | dadosgovbr CSV na branch main (FALHOU - a branch e master) | `https://raw.githubusercontent.com/dadosgovbr/catalogos-dados-brasil/main/dados/catalogos.csv` | csv/xlsx | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | dados.gov.br - pagina de catalogos municipais (vazia na leitura) | `https://dados.gov.br/dados/conteudo/catalogos-municipais` | portal-dados-abertos | n/a | desconhecido | `[fetch-ok]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | dataportals.org - diretorio, filtro Brasil | `https://dataportals.org/search?q=Brazil` | portal-dados-abertos | n/a | desconhecido | `[fetch-ok]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Natal - dados.natal.br (MORTO) | `http://dados.natal.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Niteroi - dados.niteroi.rj.gov.br (MORTO) | `https://dados.niteroi.rj.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Salvador - dados.salvador.ba.gov.br (404) | `https://dados.salvador.ba.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Campinas - dados.campinas.sp.gov.br (NAO EXISTE) | `https://dados.campinas.sp.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Manaus - dadosabertos.manaus.am.gov.br (NAO EXISTE) | `https://dadosabertos.manaus.am.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Goiania - dados.goiania.go.gov.br (NAO EXISTE) | `https://dados.goiania.go.gov.br/api/3/action/package_list` | api | n/a | n/a | `[fetch-falhou]` |
| Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Manaus/CGM - pagina de dados abertos que NAO e catalogo | `https://www.manaus.am.gov.br/cgm/dados-abertos/` | pdf/relatorio | n/a | ultimos arquivos de 2023 | `[fetch-ok]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Recife/PE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Melhor COBERTURA EQUILIBRADA do Brasil entre os portais que abri. E o unico onde a taxonomia oficial de grupos cobre TODOS os 8 dominios pedidos com contagem diferente de zero: Saude 65, Urbanismo 25, Mobilidade 23, Governo e Politica 15, Covid 11, Educacao 11, Financas 11, Turismo 10, Cultura 7, Seguranca Publica 6, Meio Ambiente 5, Esportes 2. CKAN real com /api/3/action funcionando, licenca ODbL explicita, e granularidade de registro individual (nao so agregado): acidentes de transito com vitimas em 10 CSVs anuais 2015-2024, pessoas vacinadas Covid-19, estoque de medicamentos por farmacia. Volume menor que SP/Fortaleza (221 indexados) mas e o volume mais bem distribuido, e o criterio 3 penaliza justamente concentracao.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada, e a mais equilibrada do conjunto. Saude e o pico (65) mas Urbanismo (25) e Mobilidade (23) sustentam o segundo nivel, e Educacao/Financas/Covid empatam em 11. Nenhum dominio-alvo esta vazio. Seguranca Publica (6) e Meio Ambiente (5) sao os elos fracos, porem existem de fato - diferente de BH (seguranca 0) e Fortaleza (seguranca 1). Formatos no grupo Saude: CSV 64, JSON 58, PDF 10, GeoJSON 4 - ou seja PDF e minoria, o que atende o criterio 2.

#### 2. Sao Paulo/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Maior amplitude absoluta e o portal mais fresco. CKAN real em dados.prefeitura.sp.gov.br com API funcionando, regulado por Decreto Municipal 63.463/2024. 16 grupos tematicos cobrindo todos os dominios pedidos: Orcamento e Financas 55, Educacao 45, Meio Ambiente 42, Infraestrutura e Urbanismo 26, Direitos Humanos 13, Demografia 12, Negocios 10, Habitacao 9, Transportes e Mobilidade 8, Cultura 6, Saude e Bem-Estar 5, Seguranca urbana 5, Participacao Social 5, Esporte e Lazer 3, Administracao 2, Trabalho e Renda 1. Atualizado 2026-07-31 (ontem). Melhor escolha se o piloto priorizar volume e escala de cidade grande.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Ampla mas DESEQUILIBRADA na etiquetagem: Financas (55) + Educacao (45) + Meio Ambiente (42) concentram 142 dos 247 datasets agrupados, enquanto Saude e Seguranca ficam com 5 cada. Atenuante que verifiquei: a busca livre por 'seguranca' devolve count=22, ou seja existe mais dado de seguranca do que o grupo sugere - o problema e de classificacao, nao necessariamente de ausencia. Ainda assim, saude municipal e visivelmente sub-representada para uma cidade de 11 milhoes.

#### 3. Fortaleza/CE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Segundo maior catalogo indexado que confirmei (count=635) e boa amplitude com 12 grupos: Saude 35, Economia 34, Gestao Publica 32, Transporte 25, Meio ambiente e Urbanismo 17, Educacao 12, Esportes 9, Turismo 5, Cultura 3, Demografia 1, Habitacao 1, Seguranca 1. CKAN real, API funcionando, atualizado 2026-07-31. Diferente de SP e BH, Saude (35) esta no TOPO da distribuicao e nao no rodape - importante para um piloto de informacao util ao cidadao. Tem dados de videomonitoramento (CGIVFOR) e serie de atendimentos de saude semestrais.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Razoavelmente equilibrada no topo (Saude 35 / Economia 34 / Gestao 32 / Transporte 25 formam um bloco parelho), mas cai forte na cauda: Seguranca 1, Habitacao 1, Demografia 1. Meio ambiente e Urbanismo estao FUNDIDOS em um unico grupo (17), o que esconde qual dos dois dominios realmente tem dado. Educacao (12) e modesta para o porte da cidade.

#### 4. Rio de Janeiro/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Unico caso com DUAS camadas confirmadas: o catalogo data.rio (ArcGIS Hub, 198 datasets confirmados via numberMatched na OGC API) mantido pelo Instituto Pereira Passos, MAIS o datalake do Escritorio de Dados (dados.rio) que se apresenta como primeiro datalake municipal do mundo, acessivel por BigQuery, Python, R, PowerBI e API em gw.dados.rio. Dominios confirmados no feed DCAT: saude (COVID por CEP, Painel Rio COVID-19), mobilidade (GTFS do Rio, terminais rodoviarios 1990-2025), financas/economia (cadastro imobiliario IPTU e ITBI por logradouro), social (Censo 2022 domicilios e deslocamento), meio ambiente (Areas Protegidas), urbanismo (urbanizacao de favelas, Patrimonio Cultural Carioca). Forte para piloto que queira consulta SQL em vez de download de CSV.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentrada em urbanismo/geo/imobiliario. O feed DCAT que abri e dominado por IPTU/ITBI (6 dos 20 primeiros registros) e por tabulacoes do Censo 2022. Saude aparece so via COVID (dado de 2020-2022, envelhecido). Educacao nao apareceu em nenhum dos 20 primeiros titulos. Seguranca publica praticamente inexiste no nivel municipal porque no RJ o dado criminal e estadual (ISP-RJ), o que quebra o criterio 3 para um piloto municipal.

#### 5. Belo Horizonte/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Catalogo CKAN grande e o mais frequentemente atualizado que encontrei: 602 datasets indexados com publicacao DIARIA (autorizacoes de supressao de arvores atualizadas em 2026-07-31 e 2026-07-30). Duas URLs funcionam (dados.pbh.gov.br e ckan.pbh.gov.br). Excelente para urbanismo, geo e financas: SMPU/planejamento urbano 134, Prodabel 140, SMFA/fazenda 65. Rico em camadas geoespaciais (APP, area de protecao cultural, area de risco geologico, area de restricao de voo de drone, area publica com wifi, ADE por lei) e em alvaras. Tem Plano de Dados Abertos 2023-2025 documentado.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA - e o caso que o criterio 3 manda penalizar. Distribuicao por orgao: Prodabel 140, SMPU 134 e SMFA 65 somam 339 dos ~577 datasets atribuidos, ou seja urbanismo/geo + financas dominam. Saude (SMSA) tem apenas 6 datasets e o grupo Saude tem 2. Educacao (SMED) 20. Mobilidade tem sinal razoavel (BHTrans/ETTBH 24 + grupo Mobilidade Urbana 27). Meio ambiente SMMA 25 + SLU 13. E uma cidade otima em 2 areas e quase vazia em saude e seguranca.

#### 6. Porto Alegre/RS — região: Sul

**`why` (por que o agente apontou esta candidata):**

Melhor relacao equilibrio/tamanho do Sul e o portal com atualizacao mais recente de todos (2026-08-01, hoje). Catalogo pequeno (56 indexados) mas notavelmente bem distribuido para o tamanho, cobrindo quase todos os dominios pedidos com dados de sistema-fonte e nao so relatorio: transito (acidentes-de-transito-acidentes e ...-vitimas, duas tabelas separadas), mobilidade (gtfs, STPoa, atendimentos CARRIS), saude (gercon = gerenciamento de consultas, gerint = gerenciamento de internacoes), urbanismo (APP, AEIS, bairros LC 12.112/16, eixos-de-logradouros, cadastro-de-alvaras), meio ambiente (coleta-domiciliar, coleta-seletiva), financas (despesas, folha de pagamento ativos e inativos, ITBI, gor = gerencia orcamentaria), fiscalizacao (autos-de-infracao) e transparencia (e-sic). CKAN real com API funcionando.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Equilibrada em AMPLITUDE, fraca em PROFUNDIDADE. Praticamente todos os 8 dominios tem pelo menos um dataset de sistema-fonte, o que e raro; mas com apenas 56 datasets cada dominio tem 2 a 8 itens. Saude via gercon/gerint (consultas e internacoes) e um ativo forte e incomum. Educacao foi o dominio que NAO identifiquei na amostra dos 25 primeiros nomes que li - preciso confirmar antes de afirmar cobertura completa. Ha ruido institucional (balancete e folha da Procempa) inflando a contagem.

#### 7. Curitiba/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

Incluida como caso de ALERTA, nao como recomendacao. Tem portal proprio real e navegavel em dadosabertos.curitiba.pr.gov.br com catalogo em /ConjuntoDado, downloads em CSV e XLSX, e datasets organizados por secretaria - e cobre dominios uteis com apenas 32 datasets: saude (Sistema e-Saude com perfil de atendimento Medico, de Enfermagem e Odontologico), financas (Saldos Orcamentarios), seguranca (SiGesGuarda), comercio (Base de Alvaras, Clique Economia com precos de alimentos), participacao (Fala Curitiba, Conecta Curitiba), RH (Relacoes de servidores, cargos e encargos). Reputacao de cidade-modelo em dados NAO se confirma no volume.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Ampla em variedade de temas para o tamanho, mas rasa em tudo: 32 datasets divididos entre saude, financas, seguranca, comercio e participacao significa 2 a 5 itens por dominio. A pagina inicial mostrou o contador '32' com '+0%' de crescimento, ou seja o catalogo esta ESTAGNADO - nao houve variacao no periodo medido pelo proprio portal.

#### 8. Brasilia/DF/DF — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Unico candidato do Centro-Oeste com portal que respondeu, e por isso vale rastrear - mas NAO consegui qualificar. O portal www.dados.df.gov.br existe e responde, se apresenta como Portal de Dados Abertos do Governo de Brasilia com 'Catalogo de dados', e ha indicios (nao confirmados por mim) de que usa CKAN, integra com o dados.gov.br da Uniao e faz parte da INDA. Por ser DF, acumula funcoes municipais e estaduais, o que em teoria daria cobertura de seguranca publica e saude que faltam nos municipios puros.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

NAO AVALIADA. Nao obtive contagem de datasets, lista de grupos, organizacoes nem formatos. Qualquer afirmacao sobre equilibrio de dominios em Brasilia seria invencao neste momento. Precisa de nova rodada de verificacao antes de entrar ou sair da lista de piloto.

#### 9. Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR — região: Nacional

**`why` (por que o agente apontou esta candidata):**

Registro dos agregadores que realmente abri e, mais importante, da lista de URLs que FALHARAM. Isso importa porque varios portais municipais citados em listas publicas e em conhecimento pre-existente estao fora do ar hoje: se o piloto for planejado em cima dessas listas sem testar, ele nasce quebrado. Achado central: dos agregadores, o unico com dados estruturados uteis foi o CSV do repositorio dadosgovbr/catalogos-dados-brasil, e ele esta DESATUALIZADO - lista URLs mortas e classifica plataformas erradas.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

n/a - entrada metodologica. Vale registrar o vazio regional: NAO encontrei nenhum portal municipal de dados abertos verificavel no Norte nem no Centro-Oeste (exceto Brasilia/DF, que nao pude qualificar). Todos os finalistas confirmados estao no Sudeste (SP, Rio, BH), Nordeste (Recife, Fortaleza) e Sul (Porto Alegre, Curitiba). Qualquer narrativa de cobertura nacional do piloto precisa admitir esse vies.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Recife/PE — `red_flags`:**

Discrepancia de contagem: package_list devolve 403 nomes mas package_search devolve count=221 - cerca de 180 datasets nao estao indexados/publicos na busca, entao o numero real utilizavel e ~221, nao 403. O endpoint group_list?all_fields=true devolve HTTP 500 (bug do servidor); tive que ler as contagens pela pagina /group. Atualizacao mais recente vista foi 2026-07-07, ~3 semanas atras - menos fresco que SP/Fortaleza/BH que atualizaram em 2026-07-31. O dataset de acidentes para em 2024 (metadata_modified 2026-03-02), sem 2025. Existe tambem hubdedados.recife.pe.gov.br citado em resultado de busca, que NAO abri - nao usar sem testar.

**Sao Paulo/SP — `red_flags`:**

Discrepancia grande: package_list=1087 nomes vs package_search count=474. Reportar 1087 seria enganoso; o numero publico indexado e 474. Alem disso, apenas 247 dos 474 estao atribuidos a algum grupo tematico, ou seja ~48% do catalogo nao tem dominio declarado - isso encarece a classificacao no piloto. Ha datasets claramente de teste/efemeros no catalogo (ex: 'ad', 'agendamentos_teia_sampacast_abril'), sinal de curadoria fraca.

**Fortaleza/CE — `red_flags`:**

Mesma discrepancia dos outros: package_list=1089 vs package_search count=635. Pior ainda, os grupos somam apenas 175 datasets - so ~28% do catalogo indexado tem dominio classificado, a menor taxa de classificacao entre os finalistas. Seguranca com 1 unico dataset e um furo serio dado que o proprio portal publica CGIVFOR. Ha muito dataset de RH/licitacao (afastamentosaude, aberturas-cred-adicionais-2015, Resultado das Licitacoes) inflando a contagem sem servir ao cidadao. Nomenclatura inconsistente (areas-edificadas-... com hifen e areas_edificadas_uso_... com underscore) sugere ingestao manual.

**Rio de Janeiro/RJ — `red_flags`:**

www.data.rio e uma SPA JavaScript: /search devolveu literalmente apenas a string 'DATA.RIO', sem conteudo legivel. Nao tem API CKAN - a contagem so saiu pela OGC API. O feed DCAT truncou em 40 registros na leitura, entao nao pude auditar o catalogo inteiro. gw.dados.rio/docs responde mas renderiza apenas o cabecalho 'APIs Escritorio de Dados' - NAO consegui ver um unico endpoint, portanto nao afirmo que a API funciona. Pior: a pagina do datalake indica que acesso institucional exige conta @prefeitura.rio ou Gmail, ou seja parte do datalake pode NAO ser anonimamente aberta - isso precisa ser testado antes de qualquer compromisso. O agregador dadosgovbr classifica data.rio como CKAN, o que esta ERRADO/desatualizado: e ArcGIS Hub.

**Belo Horizonte/MG — `red_flags`:**

Grupo Seguranca Publica com 0 datasets. Grupo Saude com 2. Onze dos 21 grupos estao ZERADOS (Arrecadacao Tributaria, Comunicacao, Inclusao Digital, Legislacao, Limpeza Urbana, Orcamentario, Recursos Humanos, Regulacao Urbana entre outros) - a taxonomia de grupos e praticamente decorativa; a informacao util esta em organization_list, nao em group_list. Discrepancia package_list=1022 vs package_search=602. Ha dataset de teste explicito no catalogo publico ('alfa-genso-teste-de-producao') e duplicatas versionadas ('alvaras-de-localizacao-e-funcionamento-emitidos' e '...emitidos2', 'area-publica-com-wifi2'), sinal de higiene fraca. Os datasets mais recentes sao autorizacoes diarias de supressao de arvore - alta frequencia, baixo valor informacional, o que infla a aparencia de frescor.

**Porto Alegre/RS — `red_flags`:**

Volume baixo: 56 datasets indexados (60 no package_list) - pode ser insuficiente como piloto sozinho. Nao li a lista completa de nomes (vi 25 de 60), entao NAO afirmo que educacao esteja coberta. O dominio antigo datapoa.com.br falhou na minha tentativa ('Socket is closed') e nao deve ser citado como ativo. Atencao ao rebrand: dados.portoalegre.rs.gov.br responde HTTP 301 para dadosabertos.poa.br - documentacao e agregadores de terceiros ainda apontam para a URL antiga.

**Curitiba/PR — `red_flags`:**

NAO TEM API. Confirmei duas coisas independentes: (1) https://dadosabertos.curitiba.pr.gov.br/api/3/action/package_list devolve HTTP 404, logo nao e CKAN apesar de o agregador dadosgovbr listar Curitiba como plataforma 'Interna'; (2) o proprio portal declara na FAQ que o JSON sera oferecido apenas como arquivo para download igual ao CSV, 'nao e uma API'. Isso reprova no criterio 2 (acesso realmente aberto por API). O caminho /dados tambem devolve 404 - a URL correta do catalogo e /ConjuntoDado, e a navegacao usa chaves GUID em querystring (?chave=...), o que dificulta raspagem estavel. Contador estagnado em +0%. Para um piloto que quer ingestao automatizada, Curitiba e o pior custo-beneficio dos finalistas.

**Brasilia/DF/DF — `red_flags`:**

A API CKAN nao respondeu em nenhuma das duas variantes de dominio que testei: https://www.dados.df.gov.br/api/3/action/package_list = 404 e https://dados.df.gov.br/api/3/action/package_list = 404. Atencao: o dominio SEM www falha - so a variante com www serve conteudo. A pagina /dataset carregou mas o conteudo extraivel nao trouxe contador de datasets, facetas de organizacao/formato nem identificacao de plataforma, ou seja provavelmente e renderizada por JavaScript. Conclusao honesta: existencia confirmada, capacidade NAO confirmada.

**Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR — `red_flags`:**

O CSV do dadosgovbr lista como municipais varias URLs que eu testei e estao mortas ou erradas: dados.natal.br (marcado CKAN) recusou conexao; data.rio esta classificado como CKAN quando na verdade e ArcGIS Hub; dados.portoalegre.rs.gov.br mudou para dadosabertos.poa.br; Campinas aparece como 'Portal da Transparencia' e nao como catalogo de dados. A pagina dados.gov.br/dados/conteudo/catalogos-municipais respondeu mas veio SEM a lista (so o cabecalho), entao o catalogo de catalogos oficial nao foi utilizavel nesta sessao. dataportals.org e majoritariamente estadual/tribunais, com pouco municipio. Manaus tem pagina institucional de dados abertos que NAO e catalogo: so links de transparencia e folhas de pagamento em .txt.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO BUSQUEI. Estrategia em 4 camadas: (1) WebSearch para descobrir nomes de portais; (2) teste direto de padroes de URL por hipotese (dados.<cidade>.<uf>.gov.br, dadosabertos.<cidade>.*); (3) agregadores/catalogo de catalogos; (4) para cada portal sobrevivente, bateria de endpoints CKAN abertos com WebFetch: /api/3/action/package_list (existencia + volume bruto), /api/3/action/group_list?all_fields=true e /organization_list?all_fields=true (COBERTURA POR DOMINIO - criterio 3), /api/3/action/package_search?rows=N&sort=metadata_modified+desc (volume indexado real + ultima atualizacao) e /package_show (formatos e granularidade de um dataset concreto).

ACHADO METODOLOGICO MAIS IMPORTANTE - package_list MENTE. Em todos os quatro CKANs grandes, package_list devolve muito mais nomes do que package_search indexa como publico: Sao Paulo 1087 vs 474; Fortaleza 1089 vs 635; Belo Horizonte 1022 vs 602; Recife 403 vs 221. Se alguem citar "Sao Paulo tem 1087 datasets" estara errado por um fator de 2,3x. Usei sempre o count do package_search como numero defensavel e reportei os dois. Segundo achado do mesmo tipo: os grupos tematicos cobrem so uma fracao do catalogo (SP 247 de 474; Fortaleza apenas 175 de 635, ~28%), entao as contagens por dominio sao PISO e nao total - a ausencia de um dominio no grupo pode ser falha de classificacao. Testei isso em SP: grupo "Seguranca urbana" tem 5, mas package_search?q=seguranca devolve 22.

RANKING E POR QUE. Aplicando a ordem dos criterios, e considerando que o criterio 3 manda penalizar concentracao: 1o RECIFE - unico portal cuja taxonomia oficial cobre todos os 8 dominios pedidos com contagem nao-zero, com CSV/JSON/GeoJSON, licenca ODbL e granularidade de registro individual; 2o SAO PAULO - amplitude e frescor maximos (2026-07-31), mas saude/seguranca sub-etiquetadas; 3o FORTALEZA - 635 indexados e saude no topo da distribuicao, porem seguranca com 1 dataset e so 28% classificado; 4o RIO - unico com datalake SQL (BigQuery) alem do catalogo, mas concentrado em imobiliario/geo e sem seguranca municipal; 5o BELO HORIZONTE - o caso classico que o criterio 3 reprova: otimo em urbanismo/geo (Prodabel 140 + SMPU 134) e financas (SMFA 65), quase vazio em saude (6) e ZERADO em seguranca; 6o PORTO ALEGRE - equilibrio de amplitude surpreendente e o portal mais fresco (2026-08-01), mas so 56 datasets; 7o CURITIBA - reprovada no criterio 2, sem API, catalogo estagnado em 32 datasets.

O QUE NAO CONSEGUI CONFIRMAR (declarado explicitamente). (a) Brasilia/DF: portal responde em www.dados.df.gov.br mas as duas variantes da API CKAN devolveram 404 e a pagina e renderizada por JS - existencia confirmada, capacidade NAO. (b) data.rio: e SPA; /search devolveu literalmente so a string "DATA.RIO"; a contagem de 198 saiu da OGC API e o feed DCAT truncou em 40 registros, entao nao auditei o catalogo inteiro. (c) gw.dados.rio/docs responde mas nao renderizou UM endpoint - nao afirmo que a API do Rio funciona. (d) O datalake do Rio menciona exigencia de conta @prefeitura.rio ou Gmail para acesso institucional: parte dele pode NAO ser anonimamente aberta e isso precisa ser testado antes de qualquer compromisso. (e) Porto Alegre: li 25 dos 60 nomes, entao NAO afirmo cobertura de educacao. (f) Recife: group_list?all_fields=true e package_search com facet.field devolvem HTTP 500 - tive que extrair contagens do HTML de /group. (g) Marquei como nao-testado e nao usei como prova: ckan.pbh.gov.br, a FAQ de Curitiba, a pagina institucional da CGM de SP e hubdedados.recife.pe.gov.br (este ultimo apareceu em busca e nao abri).

URLS QUE FALHARAM (informacao valiosa, nao erro). Mortas/inexistentes: dados.natal.br (ECONNREFUSED, apesar de listada como CKAN municipal pelo agregador oficial), dados.niteroi.rj.gov.br (ECONNREFUSED), dados.campinas.sp.gov.br (DNS ENOTFOUND), dados.salvador.ba.gov.br (404), datapoa.com.br (socket closed), dadosabertos.curitiba.pr.gov.br/api/3/action/package_list (404), dados.df.gov.br e www.dados.df.gov.br /api/3/action/package_list (404). Testei por hipotese de padrao e NAO existem: dadosabertos.manaus.am.gov.br, dados.goiania.go.gov.br - nao as reporto como portais. Manaus tem pagina de dados abertos real (manaus.am.gov.br/cgm/dados-abertos/) mas verifiquei que NAO e catalogo: so folhas de pagamento .txt e links de transparencia, exatamente o tipo de "portal da transparencia" que a tarefa pediu para nao contar. Redirecionamento relevante: dados.portoalegre.rs.gov.br faz 301 para dadosabertos.poa.br.

CONFIABILIDADE DOS AGREGADORES. O CSV dadosgovbr/catalogos-dados-brasil (branch master, nao main - main da 404) foi o unico agregador com dado estruturado util, mas esta desatualizado: lista dados.natal.br como CKAN ativo (esta morto), classifica data.rio como CKAN (e ArcGIS Hub), e aponta a URL antiga de Porto Alegre. A pagina oficial dados.gov.br/dados/conteudo/catalogos-municipais respondeu SEM a lista (so cabecalho), entao o catalogo de catalogos federal nao serviu nesta sessao. dataportals.org e majoritariamente estadual/tribunais.

VIES REGIONAL A DECLARAR. Nao encontrei nenhum portal municipal de dados abertos verificavel no Norte nem no Centro-Oeste, com a excecao de Brasilia/DF que nao pude qualificar. Os sete finalistas estao todos em Sudeste, Nordeste e Sul. Um piloto "iA Brasil" com pretensao nacional precisa assumir esse vazio explicitamente em vez de presumir cobertura.

PROXIMOS PASSOS SUGERIDOS PARA FECHAR LACUNAS. Testar www.dados.df.gov.br via feed/sitemap ou renderizacao JS para qualificar o Centro-Oeste; auditar o catalogo completo do data.rio paginando a OGC API (limit/offset) em vez do DCAT truncado; testar acesso ANONIMO ao datalake do Rio; ler os 60 nomes completos de Porto Alegre para confirmar educacao; verificar hubdedados.recife.pe.gov.br e ckan.pbh.gov.br.

#### Fontes que a execução 1 NÃO confirmou (15 de 48)

- `[fetch-falhou]` **Recife/PE** — Recife CKAN - group_list com all_fields (QUEBRADO) — `https://dados.recife.pe.gov.br/api/3/action/group_list?all_fields=true`
  - motivo/evidência registrada pelo agente: HTTP 500 Internal Server Error. Tambem falhou package_search com facet.field=[groups] (HTTP 500). Contagens por grupo so obtidas via HTML em /group.
- `[nao-testado]` **Sao Paulo/SP** — Prefeitura de SP / CGM - pagina institucional Dados Abertos — `https://prefeitura.sp.gov.br/web/controladoria_geral/w/coordenadoria_de_promocao_da_integridade/225082`
  - motivo/evidência registrada pelo agente: URL veio de resultado de WebSearch e NAO foi aberta. Contexto de busca indica que o Catalogo Municipal de Bases de Dados e regulado pelo Decreto Municipal 63.463/2024 e mantido pela Coordenadoria de Promocao da Integridade da CGM, com CKAN como plataforma - mas isso nao foi confirmado por fetch.
- `[nao-testado]` **Belo Horizonte/MG** — ckan.pbh.gov.br - instancia CKAN alternativa/espelho — `https://ckan.pbh.gov.br/`
  - motivo/evidência registrada pelo agente: URL apareceu repetidamente em resultados de WebSearch como 'Bem-vindo - Portal de Dados Abertos' e serve downloads (ex: relatorio do portal em PDF). NAO abri esta URL; nao confirmei se e espelho de dados.pbh.gov.br ou instancia distinta.
- `[fetch-falhou]` **Porto Alegre/RS** — datapoa.com.br - dominio legado (falhou) — `http://datapoa.com.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: Erro de conexao: 'Socket is closed'. Nao respondeu. Nao usar esta URL.
- `[fetch-falhou]` **Curitiba/PR** — Curitiba - tentativa de API CKAN (INEXISTENTE) — `https://dadosabertos.curitiba.pr.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. Nao e CKAN. Tambem testei https://dadosabertos.curitiba.pr.gov.br/dados = HTTP 404.
- `[nao-testado]` **Curitiba/PR** — Curitiba - FAQ do portal (declara ausencia de API) — `https://dadosabertos.curitiba.pr.gov.br/informacoes/perguntasfrequentes`
  - motivo/evidência registrada pelo agente: URL veio de WebSearch e NAO foi aberta por mim. O resumo de busca cita a FAQ afirmando que os dados estao hoje so em CSV e que o JSON futuro sera 'apenas como arquivo para download, como o CSV, ou seja, nao e uma API'. Consistente com o 404 que eu mesmo obtive, mas o texto da FAQ nao foi verificado por fetch.
- `[fetch-falhou]` **Brasilia/DF/DF** — DF - tentativa de API CKAN com www (FALHOU) — `https://www.dados.df.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found.
- `[fetch-falhou]` **Brasilia/DF/DF** — DF - tentativa de API CKAN sem www (FALHOU) — `https://dados.df.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. O dominio sem www nao serve o portal; e preciso usar www.dados.df.gov.br.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — dadosgovbr CSV na branch main (FALHOU - a branch e master) — `https://raw.githubusercontent.com/dadosgovbr/catalogos-dados-brasil/main/dados/catalogos.csv`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. A branch correta e master, nao main.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Natal - dados.natal.br (MORTO) — `http://dados.natal.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: connect ECONNREFUSED 52.2.32.139:443. Listado como CKAN municipal no CSV do dadosgovbr, mas o servidor recusa conexao. Portal aparentemente descontinuado.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Niteroi - dados.niteroi.rj.gov.br (MORTO) — `https://dados.niteroi.rj.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: connect ECONNREFUSED 4.228.85.70:443. O dominio resolve em DNS mas a porta 443 recusa conexao.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Salvador - dados.salvador.ba.gov.br (404) — `https://dados.salvador.ba.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. Nao confirmei portal de dados abertos municipal em Salvador.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Campinas - dados.campinas.sp.gov.br (NAO EXISTE) — `https://dados.campinas.sp.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND - o dominio nao existe em DNS. O CSV do dadosgovbr aponta Campinas para transparencia.campinas.sp.gov.br, plataforma 'Interna', ou seja portal da transparencia e nao catalogo de dados.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Manaus - dadosabertos.manaus.am.gov.br (NAO EXISTE) — `https://dadosabertos.manaus.am.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND. URL testada por hipotese de padrao de nomenclatura; nao existe.
- `[fetch-falhou]` **Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR** — Goiania - dados.goiania.go.gov.br (NAO EXISTE) — `https://dados.goiania.go.gov.br/api/3/action/package_list`
  - motivo/evidência registrada pelo agente: getaddrinfo ENOTFOUND. URL testada por hipotese de padrao; nao existe.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.
- Uma segunda execução deste mesmo label tem registro de início, mas **nenhum registro de resultado**. Não sei se falhou, foi cancelada ou permaneceu em execução: o registro local não informa isso.
ao reportado e **não** foi suprido com conhecimento próprio.

## Síntese

**Contagem de fontes deste label:** 48 no total — 33 `[fetch-ok]`, 12 `[fetch-falhou]`, 3 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 0 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 12 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 28 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Recife/PE**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Recife/PE · Sao Paulo/SP · Fortaleza/CE · Rio de Janeiro/RJ · Belo Horizonte/MG · Porto Alegre/RS · Curitiba/PR · Brasilia/DF/DF · Agregadores nacionais e portais MORTOS (nao e candidato - e o mapa de armadilhas)/BR

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
