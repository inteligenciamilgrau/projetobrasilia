# indices:transparencia — Rankings e indices oficiais/institucionais de transparencia e dados abertos de municipios brasileiros (camada de meta-evidencia)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** indices:transparencia

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
| 1 | `execucao-1` | 21 | 9 | 53 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 21)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | CGU - Escala Brasil Transparente 360 (pagina institucional) | `https://www.gov.br/cgu/pt-br/assuntos/transparencia-publica/escala-brasil-transparente-360` | portal-dados-abertos | municipio | ciclos; autoavaliacao 2025 aberta 11/02/2025 a 31/12/2025 | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | CGU - Mapa Brasil Transparente (painel de resultados da EBT) | `https://mbt.cgu.gov.br/publico/transparencia-por-localidade` | painel/dashboard | municipio | indisponivel | `[fetch-falhou]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Radar Nacional da Transparencia Publica / PNTP - Atricon e TCEs | `https://radardatransparencia.atricon.org.br/` | painel/dashboard | equipamento/unidade | anual (ciclo 2025 divulgado em 04/12/2025; criterios 2026 publicados) | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Radar da Transparencia - Downloads (bases PNTP por edicao) | `https://radardatransparencia.atricon.org.br/downloads.html` | csv/xlsx | equipamento/unidade | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Atricon - divulgacao dos resultados PNTP 2025 (IV CITC) | `https://atricon.org.br/iv-citc-resultados-do-programa-nacional-de-transparencia-publica-2025-sao-divulgados/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Radar da Transparencia - pagina Avaliacoes | `https://radardatransparencia.atricon.org.br/avaliacoes.html` | painel/dashboard | desconhecido | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Radar da Transparencia (dominio alternativo .com) | `https://radardatransparencia.com/` | painel/dashboard | desconhecido | desconhecido | `[fetch-falhou]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Indice de Transparencia e Governanca Publica (ITGP) - Transparencia Internacional Brasil | `https://transparenciainternacional.org.br/itgp/` | csv/xlsx | municipio | edicoes 2022, 2024, 2025 | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ITGP - Avaliacao dos municipios (2025) | `https://transparenciainternacional.org.br/itgp/municipal/` | csv/xlsx | municipio | anual (2024 e 2025) | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ITGP 2025 - resultado da cidade do Rio de Janeiro (98/100) | `https://prefeitura.rio/integridade/rio-de-janeiro-e-a-cidade-mais-transparente-do-estado-segundo-a-transparencia-internacional-brasil/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ITGP 2025 - municipios da Grande Sao Paulo (Observatorio Social do Brasil-SP) | `https://www.osb-saopaulo.org.br/rankingitgp2025/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Open Knowledge Brasil - Indice de Dados Abertos para Cidades (pagina do projeto) | `https://ok.org.br/projetos/indice-dados-abertos/` | painel/dashboard | municipio | ultima edicao com coleta em 2023, publicacao 2024 | `[fetch-falhou]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ODI Cidades - resultado (nota de imprensa da CGM de Sao Paulo) | `https://prefeitura.sp.gov.br/web/controladoria_geral/w/noticias/367300` | pdf/relatorio | municipio | unica edicao consolidada (coleta jul-out/2023, sistematizacao ate abr/2024) | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ODI Cidades - faixas e top 5 (Brasil 61) | `https://brasil61.com/n/5-capitais-do-pais-recebem-nota-media-em-indice-de-dados-abertos-para-cidades-bras2411807` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | ODI Cidades - distribuicao das 26 capitais (Poder360) | `https://www.poder360.com.br/governo/21-de-26-capitais-sao-opacas-com-dados-publicos-diz-ong/` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Ranking Connected Smart Cities 2025 - Urban Systems (site oficial da edicao) | `https://ranking.connectedsmartcities.com.br/` | pdf/relatorio | municipio | anual (12a edicao, 2025) | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Urban Systems - pagina institucional do Ranking Connected Smart Cities | `https://www.urbansystems.com.br/rankingconnectedsmartcities` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | Ranking de Competitividade dos Municipios 2025 - CLP (pagina oficial) | `https://rankingdecompetitividade.org.br/municipios/` | painel/dashboard | municipio | anual (6a edicao, 2025) | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | CLP 2025 - top 10 municipios (CNN Brasil) | `https://www.cnnbrasil.com.br/economia/macroeconomia/florianopolis-e-a-cidade-mais-competitiva-do-brasil-sp-a-terceira/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | outro | IGM-CFA - Indice CFA de Governanca Municipal | `https://igm.cfa.org.br/` | painel/dashboard | municipio | anual (versao 2025 anunciada) | `[fetch-falhou]` |
| Fortaleza/CE | outro | Portal de Dados Abertos de Fortaleza (CKAN) | `https://dados.fortaleza.ce.gov.br/` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Fortaleza/CE | outro | API CKAN Fortaleza - group_list com contagem por dominio | `https://dados.fortaleza.ce.gov.br/api/3/action/group_list?all_fields=true` | api | municipio | tempo real (API) | `[fetch-ok]` |
| Fortaleza/CE | saude | Conjuntos de saude da SMS Fortaleza (via API CKAN) | `https://dados.fortaleza.ce.gov.br/api/3/action/package_search?q=groups:saude&rows=5&sort=metadata_modified%20desc` | api | municipio | irregular; mais recente 03/10/2025, varios em jul/2024 | `[fetch-ok]` |
| Fortaleza/CE | outro | ODI Cidades - posicao de Fortaleza | `https://brasil61.com/n/5-capitais-do-pais-recebem-nota-media-em-indice-de-dados-abertos-para-cidades-bras2411807` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Recife/PE | outro | API CKAN Recife - package_list (inventario completo) | `http://dados.recife.pe.gov.br/api/3/action/package_list` | api | municipio | variavel por conjunto | `[fetch-ok]` |
| Recife/PE | outro | API CKAN Recife - group_list (dominios cobertos) | `http://dados.recife.pe.gov.br/api/3/action/group_list` | api | municipio | tempo real (API) | `[fetch-ok]` |
| Recife/PE | saude | Casos de Dengue, Zika e Chikungunya - Secretaria de Saude do Recife | `http://dados.recife.pe.gov.br/api/3/action/package_show?id=casos-de-dengue-zika-e-chikungunya` | api | registro individual | trimestral; metadado alterado em 20/05/2026 | `[fetch-ok]` |
| Recife/PE | outro | Portal web de dados abertos do Recife (interface) | `http://dados.recife.pe.gov.br/dataset` | portal-dados-abertos | municipio | indisponivel | `[fetch-falhou]` |
| Recife/PE | outro | ODI Cidades - posicao do Recife | `https://brasil61.com/n/5-capitais-do-pais-recebem-nota-media-em-indice-de-dados-abertos-para-cidades-bras2411807` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Sao Paulo/SP | outro | Portal de Dados Abertos da Prefeitura de Sao Paulo (CKAN/Prodam) | `http://dados.prefeitura.sp.gov.br/` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Sao Paulo/SP | outro | API CKAN Sao Paulo - contagem de conjuntos por dominio (facet groups) | `http://dados.prefeitura.sp.gov.br/api/3/action/package_search?rows=0&facet.field=[%22groups%22]&facet.limit=30` | api | municipio | tempo real (API) | `[fetch-ok]` |
| Sao Paulo/SP | seguranca | Grupo Seguranca Urbana - conjuntos e formatos (API CKAN) | `http://dados.prefeitura.sp.gov.br/api/3/action/package_search?q=groups:seguranca&rows=5` | api | equipamento/unidade | ativo; ultima atualizacao 23/07/2026 | `[fetch-ok]` |
| Sao Paulo/SP | urbanismo/geo | GeoSampa - portal geoespacial da Prefeitura de Sao Paulo | `http://geosampa.prefeitura.sp.gov.br/PaginasPublicas/_SBC.aspx` | geoservico | distrito/bairro | desconhecido | `[fetch-falhou]` |
| Sao Paulo/SP | mobilidade/transito | Infosiga SP / Respeito a Vida - mortes e sinistros de transito | `http://www.respeitoavida.sp.gov.br/` | csv/xlsx | municipio | desconhecido | `[fetch-falhou]` |
| Sao Paulo/SP | outro | ODI Cidades - Sao Paulo em 1o lugar | `https://prefeitura.sp.gov.br/web/controladoria_geral/w/noticias/367300` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Belo Horizonte/MG | outro | Portal de Dados Abertos da PBH (CKAN) | `https://dados.pbh.gov.br/` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Belo Horizonte/MG | outro | API CKAN Belo Horizonte - group_list (dominios cobertos) | `https://dados.pbh.gov.br/api/3/action/group_list` | api | municipio | tempo real (API) | `[fetch-ok]` |
| Belo Horizonte/MG | outro | API CKAN Belo Horizonte - contagem por grupo (facet) | `https://dados.pbh.gov.br/api/3/action/package_search?rows=0&facet.field=[%22groups%22]&facet.limit=30` | api | municipio | tempo real (API) | `[fetch-ok]` |
| Belo Horizonte/MG | outro | ODI Cidades - Belo Horizonte em 2o lugar | `https://www.poder360.com.br/governo/21-de-26-capitais-sao-opacas-com-dados-publicos-diz-ong/` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Rio de Janeiro/RJ | outro | ITGP 2025 - Rio de Janeiro, 98/100, nivel Otimo | `https://prefeitura.rio/integridade/rio-de-janeiro-e-a-cidade-mais-transparente-do-estado-segundo-a-transparencia-internacional-brasil/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | DATA.RIO - catalogo DCAT-US do ArcGIS Hub (IPP) | `https://datariov2-pcrj.hub.arcgis.com/api/feed/dcat-us/1.1.json` | api | distrito/bairro | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | DATA.RIO - interface publica | `https://www.data.rio/` | geoservico | distrito/bairro | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | financas/orcamento | Portal da Transparencia Rio - secao Dados Abertos | `https://transparencia.prefeitura.rio/dados-abertos/` | portal-dados-abertos | municipio | desconhecido | `[fetch-ok]` |
| Rio de Janeiro/RJ | seguranca | ISP Dados Abertos - Instituto de Seguranca Publica do RJ | `http://www.ispdados.rj.gov.br/` | portal-dados-abertos | distrito/bairro | desconhecido (nao declarado na pagina) | `[fetch-ok]` |
| Rio de Janeiro/RJ | mobilidade/transito | Portal de dados de mobilidade do Rio (endereco divulgado) | `https://dados.mobilidade.rio/` | desconhecido | desconhecido | desconhecido | `[fetch-falhou]` |
| Rio de Janeiro/RJ | financas/orcamento | Contas Rio - Dados Abertos (CGM) | `https://www.rio.rj.gov.br/web/contasrio/dados-abertos` | portal-dados-abertos | municipio | desconhecido | `[fetch-ok]` |
| Brasilia/DF (Distrito Federal)/DF | outro | Portal de Dados Abertos do Distrito Federal (CGDF) | `https://www.dados.df.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Brasilia/DF (Distrito Federal)/DF | outro | Dados Abertos DF - catalogo de dados | `https://www.dados.df.gov.br/catalogo-dados` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Curitiba/PR | outro | Portal de Dados Abertos de Curitiba | `https://dadosabertos.curitiba.pr.gov.br/` | portal-dados-abertos | municipio | variavel por conjunto | `[fetch-ok]` |
| Curitiba/PR | outro | ODI Cidades - posicao de Curitiba | `https://brasil61.com/n/5-capitais-do-pais-recebem-nota-media-em-indice-de-dados-abertos-para-cidades-bras2411807` | pdf/relatorio | municipio | edicao 2023/2024 | `[fetch-ok]` |
| Florianopolis/SC | financas/orcamento | Portal da Transparencia de Florianopolis (com link de Dados Abertos) | `https://www.pmf.sc.gov.br/transparencia/` | painel/dashboard | municipio | desconhecido | `[fetch-ok]` |
| Florianopolis/SC | outro | Endereco esperado do portal de dados abertos de Florianopolis | `https://dadosabertos.pmf.sc.gov.br/` | portal-dados-abertos | desconhecido | inexistente | `[fetch-falhou]` |
| Florianopolis/SC | outro | CLP 2025 - Florianopolis em 1o lugar (contraste com o achado acima) | `https://www.cnnbrasil.com.br/economia/macroeconomia/florianopolis-e-a-cidade-mais-competitiva-do-brasil-sp-a-terceira/` | pdf/relatorio | municipio | anual | `[fetch-ok]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR — região: Nacional

**`why` (por que o agente apontou esta candidata):**

Antes de escolher cidade, mapeei os 7 indices pedidos. Resultado honesto: (1) CGU/Escala Brasil Transparente 360 -- o painel de resultados (Mapa Brasil Transparente) esta FORA DO AR, com retorno previsto para novembro/2026; logo NAO existe ranking EBT consultavel hoje. (2) PNTP/Radar Atricon 2025 -- existe e tem base de dados em ZIP por edicao (2022-2025), mas o site nao expoe ranking navegavel por municipio via fetch; consegui os agregados (2.912 portais certificados: 998 diamante, 1.082 ouro, 832 prata; indice medio 66,6%). (3) O 'Indice de Transparencia e Governanca Publica (ITGP)' NAO e do TCU -- e da Transparencia Internacional Brasil. O indice do TCU (iGG) rodou em 2014/2017/2021, mira orgaos federais e foi substituido pelo iESGo em 2024; nao serve para municipios. (4) ITGP 2025 municipal: Rio de Janeiro 98/100 (unico 'Otimo' verificado), Sao Paulo 76,3, Osasco 75,6, Itapevi 63,1. (5) Open Knowledge Brasil / Indice de Dados Abertos para Cidades e o indice MAIS ALINHADO ao projeto (mede dado por dado, formato, licenca, atualidade): SP 48, BH 47, Recife 38, Curitiba 27, Fortaleza 26; 21 das 26 capitais 'opacas'. (6) Connected Smart Cities 2025: Vitoria 61,3, Florianopolis, Niteroi, Sao Paulo, Curitiba. (7) IGM-CFA: site fora do ar (HTTP 500), nao consegui o ranking. (8) CLP 2025: Florianopolis, Vitoria, Sao Paulo, Porto Alegre, Curitiba, Campinas, Maringa, Sao Caetano do Sul, Barueri, Votuporanga. CONCLUSAO METODOLOGICA: CSC e CLP medem competitividade/'smart city', NAO disponibilidade de dado aberto -- e o teste de portal mostrou que seus lideres (Florianopolis, Vitoria, Porto Alegre, Curitiba) tem dado aberto estreito ou offline. Para o piloto, valem ODI/OKBR + ITGP + verificacao direta de portal.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Esta entrada e meta-evidencia (indices), nao cobertura de dominio. Dos 7 indices pedidos, 4 tiveram fonte primaria aberta com sucesso (Atricon/PNTP, ITGP, CSC, CLP via CNN), 1 esta em manutencao (CGU/EBT), 1 bloqueia fetch (OKBR, 403 - confirmado por 3 fontes secundarias abertas) e 1 esta fora do ar (IGM-CFA).

#### 2. Fortaleza/CE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Melhor COBERTURA EQUILIBRADA verificada no Brasil, que e o criterio 3 e o mais dificil de satisfazer. O portal CKAN tem 635 conjuntos em 12 grupos e, ao contrario de todos os outros que testei, a distribuicao entre dominios e realmente plana: Saude 35, Economia 34, Gestao Publica 32, Transporte 25, Meio Ambiente e Urbanismo 17, Educacao 12. Nao ha 'uma area otima e o resto vazio'. Acesso 100% aberto por API CKAN padrao (package_list, group_list, package_search todos funcionando) e recursos em CSV. Ficou apenas 5o no ODI/OKBR (26 pontos, faixa 'Baixo'), o que mostra que o indice pune atualidade e documentacao, nao amplitude -- e para um piloto de produto a amplitude e o que destrava mais casos de uso.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EQUILIBRADA e o ponto forte: saude, economia, transporte, meio ambiente/urbanismo e educacao todos com volume relevante (12 a 35 conjuntos). Vazio real e SEGURANCA (1 unico conjunto) -- teria de vir da SSP-CE (estadual), nao testada nesta sessao. Financas/orcamento nao aparece como grupo proprio; provavelmente esta sob 'Gestao Publica' (32) ou no portal da transparencia municipal, nao verificado.

#### 3. Recife/PE — região: Nordeste

**`why` (por que o agente apontou esta candidata):**

Tem a melhor combinacao de AMPLITUDE + PROFUNDIDADE + GRANULARIDADE que consegui comprovar. Os 12 grupos do CKAN sao quase exatamente os dominios pedidos: saude, seguranca-publica, educacao, mobilidade, financas, meio-ambiente, urbanismo, mais covid, cultura, esportes, governo-e-politica e turismo. Sao 491 conjuntos. E, diferente de todo mundo, ha serie historica longa e granularidade fina: o conjunto de arboviroses traz 49 recursos, CSV por ano de 2013 a 2025, atualizacao trimestral, metadado alterado em 20/05/2026, com data de notificacao, classificacao do caso, criterio de confirmacao e localizacao por distrito e bairro. Isso e registro individual, nao agregado -- exatamente o insumo para transformar dado em informacao util. E 3o no ODI/OKBR (38, faixa 'Baixo', a melhor nota do Nordeste).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

EQUILIBRADA na estrutura: os 7 dominios prioritarios do projeto existem como grupo formal (saude, seguranca-publica, educacao, mobilidade, financas, meio-ambiente, urbanismo). Nao consegui a contagem por grupo porque os endpoints package_search e group_show do CKAN de Recife retornam HTTP 500 -- entao afirmo equilibrio de ESCOPO, nao de volume por dominio. Amostra do package_list confirma conjuntos concretos em transito (acidentes-de-transito-com-vitimas), educacao (censo-escolar-2020), urgencia (samu-2024), mobilidade/estacionamento (zona-azul-eletronico), assistencia (abrigos-temporarios-disponiveis).

#### 4. Sao Paulo/SP — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

E a cidade com melhor DESEMPENHO EM INDICE (1o lugar no Indice de Dados Abertos para Cidades da OKBR com 48 pontos, unica junto com BH na faixa 'Medio'; 76,3 e 'bom' no ITGP 2025; 4o no Connected Smart Cities 2025; 3o no CLP 2025) e o maior ecossistema institucional: 474 conjuntos, 81 organizacoes publicadoras, 16 grupos, API CKAN funcional, e conjuntos ativos com atualizacao recentissima (23/07/2026). Entrou na lista por volume, maturidade de governanca e por ser a unica onde vi geoservico publicado no proprio catalogo (WFS/WMS/GeoJSON). MAS falha justamente no criterio 3.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

CONCENTRADA, nao equilibrada -- e este e o achado que mais deveria pesar contra Sao Paulo neste projeto. Contagem real por grupo obtida via facet da API: Orcamento e Financas 55, Educacao 45, Meio Ambiente 42, Infraestrutura e Urbanismo 26, Direitos Humanos 13, Demografia 12, Negocios 10, Moradia 9, Transportes e Mobilidade 8, Cultura 6, Saude 5, Participacao Social 5, Seguranca Urbana 5, Esporte 3, Administracao 2, Trabalho 1. Ou seja: forte em financas, educacao, meio ambiente e urbanismo; e quase vazia em SAUDE (5), MOBILIDADE (8) e SEGURANCA (5) -- tres dos dominios centrais do iA Brasil. Esses dados existem em SP, mas fora do portal (SPTrans, TabNet municipal, SSP-SP estadual), o que quebra a promessa de fonte unica.

#### 5. Belo Horizonte/MG — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Maior catalogo municipal que verifiquei (602 conjuntos) e a lista de grupos mais completa do pais em termos de dominios: 21 grupos incluindo saude, seguranca-publica, educacao, mobilidade-urbana, meio-ambiente, orcamentario, arrecadacao-tributaria, regulacao-urbana, planejamento, habitacao, limpeza-urbana, politicas-sociais, desenvolvimento-humano e inclusao-digital. E 2o lugar no ODI/OKBR com 47 pontos, praticamente empatada com Sao Paulo e tambem na faixa 'Medio'. API CKAN funcional (group_list e package_search com facet respondendo).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

AMBIGUA e preciso ser explicito: a ESTRUTURA de dominios e a melhor do Brasil (21 grupos cobrindo todos os 8 dominios do projeto), mas a CLASSIFICACAO esta muito incompleta. O facet da API soma apenas cerca de 80 conjuntos atribuidos a grupos, de 602 no total -- Mobilidade Urbana 27, Politicas Sociais 12, Habitacao 10, Educacao 7, Administracao 4, Desenvolvimento Humano 4, Planejamento 4, Meio Ambiente 3, Tecnologia e Informacao 3, Estrategico 2, Estruturante 2, Saude 2. Ou seja, mais de 85% do acervo esta fora dos grupos e so e alcancavel por busca livre.

#### 6. Rio de Janeiro/RJ — região: Sudeste

**`why` (por que o agente apontou esta candidata):**

Tem a MELHOR NOTA DE TRANSPARENCIA VERIFICADA DO PAIS: 98 de 100 no ITGP 2025 da Transparencia Internacional Brasil, nivel 'Otimo', salto de 21,8 pontos sobre 2024, com nota maxima nas dimensoes Legal, Plataformas, Administrativa/Governanca e Obras Publicas (69 de 71 indicadores atendidos). Tem tambem a arquitetura de dados mais completa em papel: Data.Rio/IPP para geo e estatistica urbana, Contas Rio para orcamento e contratos, GTFS mensal de onibus e BRT pela SMTR, e para seguranca o ISP-RJ, que e provavelmente a melhor base de criminalidade aberta do Brasil (baseada em Registros de Ocorrencia, com divisao territorial por delegacia/CISP). Decreto Rio 54.844/2024 atualizou a governanca.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

AMPLA em dominios (saude, educacao, assistencia social, geo/urbanismo, financas, mobilidade e seguranca todos com fonte identificada), porem a seguranca vem de fonte ESTADUAL (ISP-RJ), nao municipal. O problema nao e amplitude, e ACESSO MAQUINA-A-MAQUINA: o catalogo DCAT do Data.Rio que consegui abrir traz 50 conjuntos cujas distribuicoes sao todas 'Web Page (text/html)', sem CSV, JSON, GeoJSON nem endpoint de API na propria distribuicao -- o catalogo prioriza descoberta e nao entrega de dado legivel por maquina.

#### 7. Brasilia/DF (Distrito Federal)/DF — região: Centro-Oeste

**`why` (por que o agente apontou esta candidata):**

Entra na lista por uma VANTAGEM ESTRUTURAL unica, nao por evidencia de acervo: o DF acumula competencias municipais e estaduais na mesma jurisdicao, entao seguranca publica (SSP-DF), saude (SES-DF), educacao (SEEDF) e mobilidade (Semob/DFTrans) estao todas sob um mesmo governo e um mesmo portal de dados abertos, operado pela Controladoria-Geral do DF. Em todas as outras candidatas a seguranca e a saude de media/alta complexidade dependem de fonte estadual separada -- essa fragmentacao e o principal obstaculo a cobertura equilibrada, e no DF ela nao existe por construcao. Tambem e a unica opcao viavel do Centro-Oeste que localizei.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

NAO VERIFICADA -- e preciso ser franco. O portal existe e abre, mas e uma aplicacao com conteudo carregado por JavaScript: nem a raiz, nem /dataset, nem /catalogo-dados renderizaram numero de conjuntos, lista de temas ou formatos de arquivo. A hipotese de cobertura equilibrada e derivada do desenho institucional do DF, nao de contagem observada. Antes de escolher o DF como piloto seria obrigatorio inspecionar /temas e /catalogo-dados com um cliente que execute JavaScript, ou achar a API subjacente.

#### 8. Curitiba/PR — região: Sul

**`why` (por que o agente apontou esta candidata):**

INCLUIDA COMO CANDIDATA DESCARTADA, com evidencia negativa util ao projeto. Curitiba aparece bem em indices de reputacao urbana (4o lugar no ODI/OKBR entre capitais com 27 pontos, 5o no Connected Smart Cities 2025, 5o no CLP 2025 e lider nacional no eixo de residuos, esgoto e agua) e e referencia historica em planejamento urbano. Testei o portal e a realidade do dado aberto nao acompanha a reputacao: apenas 32 conjuntos de dados publicados.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MUITO CONCENTRADA -- reprovada no criterio 3. Os conjuntos visiveis se restringem a economia (programa Clique Economia), financas (base de receitas e despesas), urbanismo (alvaras comerciais e licencas de construcao) e administracao publica (solicitacoes do SIAC 156, equipamentos publicos, servidores). Nao localizei grupo ou conjunto de SAUDE, EDUCACAO, SEGURANCA nem MEIO AMBIENTE no portal. Sao 4 dominios cobertos, e 4 dos 8 prioritarios ausentes.

#### 9. Florianopolis/SC — região: Sul

**`why` (por que o agente apontou esta candidata):**

INCLUIDA COMO CANDIDATA DESCARTADA, porque e o contraexemplo mais importante desta pesquisa. Florianopolis e 1o lugar no Ranking de Competitividade dos Municipios do CLP 2025 e 2o lugar no Connected Smart Cities 2025 -- se o projeto escolhesse piloto por ranking, escolheria Florianopolis. Testei e ela NAO tem portal de dados abertos multissetorial: o endereco dadosabertos.pmf.sc.gov.br nao resolve em DNS, e o link 'Dados Abertos' do proprio Portal da Transparencia municipal aponta para uma plataforma fiscal terceirizada (transparencia.e-publica.net).

**`coverage_notes` (cobertura por domínio, palavras do agente):**

MONOTEMATICA -- reprovada de forma inequivoca no criterio 3. A cobertura se limita a financas e contratos: despesas, receitas, licitacoes e contratos, folha de pagamento, convenios e obras. Nenhum dado de saude, seguranca, educacao, mobilidade, comercio, urbanismo ou meio ambiente foi localizado como dado aberto municipal. E 1 dominio de 8.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR — `red_flags`:**

Premissa da tarefa continha dois erros que confirmei: o ITGP nao e do TCU, e 'Programa Nacional de Transparencia Publica' e da Atricon/TCEs (nao da CGU - a CGU tem a Escala Brasil Transparente). O indice OKBR mais recente que consegui documentar coletou dados em 2023 e publicou em 2024; nao achei edicao 2025/2026 confirmada. Nao consegui extrair a lista nominal dos 998 municipios/orgaos com selo Diamante 2025 sem baixar e abrir os ZIPs do Radar.

**Fortaleza/CE — `red_flags`:**

Atualidade e o ponto fraco. Nos conjuntos de saude, o mais recente e 'Lista de Medicamentos' de 03/10/2025 e os demais param em 15-17/07/2024 (Dados Epidemiologicos, indicadores Previne Brasil) -- ou seja, ha defasagem de 1 a 2 anos em serie de saude. Grupos 'Demografia' e 'Habitacao' tem 1 conjunto cada (quase decorativos). Seguranca praticamente inexistente no nivel municipal.

**Recife/PE — `red_flags`:**

RISCO TECNICO SERIO: a interface web do portal esta quebrada -- http://dados.recife.pe.gov.br/ e /dataset retornam HTTP 500. So a API responde, e parcialmente: package_list, group_list e package_show funcionam, mas package_search, group_show e group_list?all_fields=true todos dao 500. Um piloto ali depende de uma API meio degradada e nao pode mandar o cidadao para o portal. Alem disso o grupo 'covid' sugere legado nao curado, e ha conjuntos datados no titulo (2015, 2020, 2024) em vez de series continuas.

**Sao Paulo/SP — `red_flags`:**

1) Desequilibrio grave: saude com 5 conjuntos num portal de 474. 2) O grupo 'Seguranca Urbana' na pratica e Guarda Civil Metropolitana (equipamentos, mediacao de conflitos, campanha de desarmamento) e pedidos de e-SIC -- nao ha dado de criminalidade, que e estadual. 3) GeoSampa, a principal fonte de urbanismo/geo da cidade, esta atras de CAPTCHA da Prodam-SP e nao pode ser consumido de forma automatizada -- testei e caí no desafio de verificacao. 4) Infosiga SP (transito) nao respondeu no endereco testado (conexao recusada), entao nao pude confirmar a fonte de mobilidade/transito.

**Belo Horizonte/MG — `red_flags`:**

O gap de metadado e o risco principal: grupos existem mas nao estao populados (Saude com 2 conjuntos classificados num portal de 602 e implausivel como retrato real do acervo, e indica curadoria de metadado falha). Para um piloto isso significa que a navegacao por dominio -- exatamente o que o iA Brasil precisa -- nao funciona bem sem trabalho de reclassificacao. Nao testei nesta sessao fontes complementares de BH (mobilidade da BHTrans fora do portal, geo/urbanismo, criminalidade estadual da SESP-MG).

**Rio de Janeiro/RJ — `red_flags`:**

1) Todo o Data.Rio e SPA em ArcGIS Hub: https://www.data.rio/, /search e https://datariov2-pcrj.hub.arcgis.com/ retornam so o titulo 'DATA.RIO' no fetch -- nao consegui contar conjuntos nem listar categorias pela interface. 2) O feed DCAT expoe apenas HTML como distribuicao (mau sinal para automatizacao). 3) https://dados.mobilidade.rio/ retorna 404, ou seja o endereco que aparece como portal de mobilidade nao existe. 4) A pagina de dados abertos do Contas Rio abre mas nao renderiza a lista de conjuntos nem formatos. 5) O ISP-RJ abre e confirma os temas, mas nao declara formato de arquivo nem periodo mais recente na pagina inicial -- nao pude confirmar CSV/XLSX nem se a serie vai a 2026. 6) Existem tres dominios concorrentes para a mesma coisa (data.rio, datario-pcrj.hub.arcgis.com, datariov2-pcrj.hub.arcgis.com), o que e risco de estabilidade de URL para um piloto.

**Brasilia/DF (Distrito Federal)/DF — `red_flags`:**

Zero evidencia quantitativa: nao sei quantos conjuntos existem, quais dominios estao cobertos, nem se ha CSV ou API. As tres URLs que testei sao SPA. Alem disso o DF nao aparece entre os melhores em nenhum dos indices que consegui verificar (nao esta no top 5 do ODI/OKBR, nem no top 10 do CLP 2025, nem no top 5 do Connected Smart Cities 2025), o que enfraquece a candidatura por evidencia externa.

**Curitiba/PR — `red_flags`:**

32 conjuntos e um acervo uma ordem de magnitude menor que Fortaleza (635), BH (602), Recife (491) e Sao Paulo (474). O portal nao e CKAN e nao declarou API na home (so CSV confirmado), o que limita automatizacao. Nao ha secao tematica navegavel completa. Curitiba e o exemplo mais claro de por que rankings de 'cidade inteligente' nao devem ser usados como proxy de disponibilidade de dado aberto.

**Florianopolis/SC — `red_flags`:**

1) dadosabertos.pmf.sc.gov.br nao existe (falha de resolucao DNS). 2) O 'dados abertos' oficial e um portal de transparencia fiscal de fornecedor externo (e-Publica), nao um catalogo de dados; a propria pagina nao detalha CSV, XLSX nem API. 3) Nao aparece em nenhuma posicao relevante no Indice de Dados Abertos para Cidades da OKBR. Conclusao acionavel para o iA Brasil: liderar CLP e Connected Smart Cities nao implica ter dado publico aberto -- esses indices medem resultado urbano e competitividade, e usam em boa parte dados nacionais de terceiros, nao dados publicados pela propria prefeitura.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO BUSQUEI. Duas camadas: (A) os 7 indices/rankings pedidos, buscando sempre a fonte primaria e abrindo com WebFetch; (B) verificacao direta dos portais reais de dado aberto das cidades que os indices apontaram, porque nenhum dos indices pedidos mede exatamente o que o iA Brasil precisa. Sempre que possivel usei a API CKAN (package_list, group_list?all_fields=true, package_search com facet.field=[groups]) em vez da interface HTML -- isso deu numeros auditaveis de conjuntos POR DOMINIO, que e a unica forma honesta de avaliar o criterio 3 (cobertura equilibrada). Orcamento de WebSearch da sessao esgotou (200/200) antes do fim; a partir dai trabalhei so com WebFetch em URLs derivadas de resultados anteriores e em padroes de endereco testados explicitamente.

CONTAGEM DE VERIFICACAO. 31 URLs abertas com sucesso (fetch-ok) e 18 falhas registradas (fetch-falhou). Nao marquei nenhuma URL como fetch-ok sem ter aberto nesta sessao. Nao ha nenhuma linha "nao-testado" nas fontes -- toda URL citada foi tentada.

DOIS ERROS NA PREMISSA DA TAREFA, CONFIRMADOS. (1) "Indice de Transparencia e Governanca Publica (TCU)" nao existe: o ITGP e da Transparencia Internacional Brasil. O indice de governanca do TCU e o iGG, aplicado em 2014, 2017 e 2021 a orgaos FEDERAIS, e substituido pelo iESGo em 2024 -- nao produz ranking de municipios. (2) O "Programa Nacional de Transparencia Publica" e da Atricon com os TCEs (Radar da Transparencia); da CGU e a Escala Brasil Transparente. A tarefa juntava os dois como se fossem um.

O QUE NAO CONSEGUI CONFIRMAR, E POR QUE. (a) Ranking da Escala Brasil Transparente: impossivel hoje -- mbt.cgu.gov.br redireciona para aviso de manutencao com retorno previsto para novembro/2026. (b) Lista nominal dos municipios com selo Diamante no PNTP 2025: o Radar da Atricon nao expoe ranking navegavel por fetch; os resultados por ente estao dentro dos ZIPs de "Dados PNTP 2022-2025", que nao baixei nem descompactei. Tenho os agregados oficiais (998 Diamante, 1.082 Ouro, 832 Prata, 2.912 certificados de mais de 10.000 avaliados, indice medio 66,6%). (c) IGM-CFA: igm.cfa.org.br responde HTTP 500 e /metodologia da 404 -- zero evidencia primaria; nao reporto ranking dele. (d) Top 10 completo do Connected Smart Cities 2025: o site oficial da edicao abre e confirma ano, 13 eixos e normas ISO 37120/37122/37123, mas nao lista as cidades em texto; as posicoes 1 a 5 (Vitoria 61,3, Florianopolis, Niteroi, Sao Paulo, Curitiba) vieram de busca, nao de pagina aberta, por isso nao as lancei como fonte fetch-ok. (e) Indice de Dados Abertos da OKBR: ok.org.br devolve 403 ao WebFetch em duas URLs; o conteudo do indice esta triangulado por tres paginas que abri (CGM de Sao Paulo, Brasil 61 e Poder360), coincidentes nos numeros. Nao encontrei edicao 2025/2026 confirmada -- a ultima documentada coletou em 2023 e publicou em 2024, com nova metodologia em consulta publica.

ACHADO CENTRAL, CONTRAINTUITIVO. Ha divergencia sistematica entre indices de reputacao urbana e disponibilidade real de dado aberto. Testei os lideres do CLP e do Connected Smart Cities e encontrei: Florianopolis (1a no CLP, 2a no CSC) sem portal de dados abertos -- dominio dadosabertos.pmf.sc.gov.br nao resolve em DNS e o "dados abertos" oficial e um portal fiscal terceirizado so com financas; Vitoria (1a no CSC, 2a no CLP) com dados.vitoria.es.gov.br retornando 404 e cobertura verificada apenas fiscal, embora tenha politica formal boa (Decreto 22.378/2023, Portaria CGM 011/2023, licenca CC0 e API em wstransparencia.vitoria.es.gov.br); Porto Alegre (4a no CLP) com o DataPOA OFICIALMENTE FORA DO AR por manutencao da Procempa (datapoa.com.br nao completa conexao); Curitiba (5a no CLP e no CSC) com apenas 32 conjuntos e sem saude, educacao, seguranca ou meio ambiente. Recomendacao metodologica: para escolher o piloto, use o Indice de Dados Abertos para Cidades da OKBR e o ITGP como filtro, e confirme sempre por API; ignore CLP e CSC como proxy de dado aberto.

SEGUNDO ACHADO. Nenhuma cidade grande do Brasil tem cobertura equilibrada de verdade. Sao Paulo lidera o ODI e tem 474 conjuntos, mas o facet da propria API mostra Saude com 5, Mobilidade com 8 e Seguranca com 5, contra Financas 55, Educacao 45 e Meio Ambiente 42 -- desequilibrio de 10 para 1, porque saude, transporte e criminalidade vivem fora do portal (TabNet, SPTrans, SSP-SP). Belo Horizonte tem a melhor estrutura de dominios do pais (21 grupos, todos os 8 dominios do projeto) mas so cerca de 80 dos 602 conjuntos estao classificados em grupo. Fortaleza e a excecao: Saude 35, Economia 34, Gestao Publica 32, Transporte 25, Meio Ambiente e Urbanismo 17, Educacao 12 -- distribuicao genuinamente plana, com Seguranca (1) como unico vazio. Por isso ranqueei Fortaleza a frente de Sao Paulo apesar de Sao Paulo liderar o indice da OKBR.

TERCEIRO ACHADO, RISCO OPERACIONAL. Fragilidade de infraestrutura e o maior risco do piloto, e nao aparece em nenhum indice. Casos concretos medidos: portal da CGU em manutencao ate nov/2026; DataPOA de Porto Alegre offline; interface web do portal do Recife retornando HTTP 500 enquanto a API funciona (e mesmo a API tem package_search, group_show e group_list?all_fields=true quebrados com 500); GeoSampa de Sao Paulo atras de CAPTCHA da Prodam, inviabilizando coleta automatizada; todo o Data.Rio servido como single-page application em ArcGIS Hub, cujo unico feed legivel por maquina (DCAT-US) expoe 50 conjuntos com distribuicao exclusivamente text/html; dados.mobilidade.rio com 404; e tres dominios concorrentes para o Data.Rio. Qualquer arquitetura do iA Brasil precisa assumir portais instaveis e cachear localmente.

REGIOES SEM CANDIDATA. Norte: testei dados.belem.pa.gov.br e dadosabertos.manaus.am.gov.br -- ambos falham na resolucao de DNS. Nao encontrei nenhuma candidata do Norte, o que e coerente com o ODI da OKBR (Boa Vista com 0 ponto; 21 das 26 capitais 'opacas'). Centro-Oeste: a unica opcao e Brasilia/DF, cujo portal abre mas e SPA e nao permitiu contar nada -- incluida por vantagem estrutural (DF concentra competencia municipal e estadual, logo seguranca, saude, educacao e mobilidade sob a mesma jurisdicao), com a ressalva explicita de cobertura NAO verificada. Sul: descartei Florianopolis, Curitiba e Porto Alegre por evidencia negativa direta. Nao testei Niteroi (3a no CSC 2025): dados.niteroi.rj.gov.br recusou conexao (ECONNREFUSED), e nao pude buscar o endereco alternativo por esgotamento do orcamento de busca.

RECOMENDACAO DE PILOTO. Fortaleza como piloto principal (unica cobertura equilibrada comprovada, API integralmente funcional), com Recife como segundo (melhor profundidade e granularidade -- serie de arboviroses 2013-2025 em CSV por registro com distrito e bairro, atualizacao trimestral, metadado de 20/05/2026 -- porem exige contornar a interface quebrada usando so a API). Sao Paulo e Belo Horizonte servem como fontes de referencia e benchmark de metodologia, nao como piloto, pelo desequilibrio entre dominios. Rio de Janeiro e a aposta de maior potencial (98/100 no ITGP 2025, melhor base de criminalidade aberta do pais no ISP-RJ) e a de maior custo de engenharia, pelo acesso maquina-a-maquina ruim.

#### Fontes que a execução 1 NÃO confirmou (10 de 53)

- `[fetch-falhou]` **Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR** — CGU - Mapa Brasil Transparente (painel de resultados da EBT) — `https://mbt.cgu.gov.br/publico/transparencia-por-localidade`
  - motivo/evidência registrada pelo agente: HTTP 301 para https://landpage.cgu.gov.br/mbt/index.html, que exibe apenas aviso: sistema 'temporariamente fora do ar para atualizacoes', com retorno previsto em novembro de 2026. Sem dados, sem ranking, sem download.
- `[fetch-falhou]` **Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR** — Radar da Transparencia (dominio alternativo .com) — `https://radardatransparencia.com/`
  - motivo/evidência registrada pelo agente: HTTP 503 Service Unavailable com Retry-After: 86400. Aparece em buscas como se fosse o portal, mas nao responde.
- `[fetch-falhou]` **Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR** — Open Knowledge Brasil - Indice de Dados Abertos para Cidades (pagina do projeto) — `https://ok.org.br/projetos/indice-dados-abertos/`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden para o WebFetch (tambem em https://ok.org.br/). O conteudo do indice teve de ser confirmado por tres fontes secundarias que abri com sucesso.
- `[fetch-falhou]` **Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR** — IGM-CFA - Indice CFA de Governanca Municipal — `https://igm.cfa.org.br/`
  - motivo/evidência registrada pelo agente: HTTP 500 Internal Server Error na raiz e HTTP 404 em https://igm.cfa.org.br/metodologia/. Nao foi possivel confirmar dimensoes, indicadores nem obter qualquer ranking na fonte primaria. Este indice fica sem evidencia verificada.
- `[fetch-falhou]` **Recife/PE** — Portal web de dados abertos do Recife (interface) — `http://dados.recife.pe.gov.br/dataset`
  - motivo/evidência registrada pelo agente: HTTP 500 Internal Server Error, tanto em /dataset quanto na raiz do dominio. A camada de apresentacao para o cidadao esta fora do ar mesmo com a API respondendo.
- `[fetch-falhou]` **Sao Paulo/SP** — GeoSampa - portal geoespacial da Prefeitura de Sao Paulo — `http://geosampa.prefeitura.sp.gov.br/PaginasPublicas/_SBC.aspx`
  - motivo/evidência registrada pelo agente: Retorna desafio CAPTCHA da Prefeitura/Prodam-SP ('Este desafio e para testar se voce e um visitante legitimo dos servicos da Prefeitura / Prodam-SP'), com opcoes visual e de audio. Nenhuma camada, tema ou formato de download acessivel de forma programatica.
- `[fetch-falhou]` **Sao Paulo/SP** — Infosiga SP / Respeito a Vida - mortes e sinistros de transito — `http://www.respeitoavida.sp.gov.br/`
  - motivo/evidência registrada pelo agente: Conexao recusada (ECONNREFUSED em 201.55.10.30:443). Nao foi possivel confirmar existencia, granularidade municipal nem formato de download desta que seria a principal fonte de transito para SP.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — DATA.RIO - interface publica — `https://www.data.rio/`
  - motivo/evidência registrada pelo agente: O fetch retorna apenas o texto 'DATA.RIO' -- aplicacao single-page em ArcGIS Hub, sem conteudo servido em HTML. Mesmo comportamento em https://www.data.rio/search e https://datariov2-pcrj.hub.arcgis.com/. Impossivel contar conjuntos ou listar categorias por esta via.
- `[fetch-falhou]` **Rio de Janeiro/RJ** — Portal de dados de mobilidade do Rio (endereco divulgado) — `https://dados.mobilidade.rio/`
  - motivo/evidência registrada pelo agente: HTTP 404 Not Found. O endereco aparece em resultados de busca como portal de mobilidade do Rio, mas nao existe. O GTFS mensal da SMTR e citado como hospedado no Data.Rio, que nao consegui abrir.
- `[fetch-falhou]` **Florianopolis/SC** — Endereco esperado do portal de dados abertos de Florianopolis — `https://dadosabertos.pmf.sc.gov.br/`
  - motivo/evidência registrada pelo agente: Falha de resolucao de DNS (getaddrinfo ENOTFOUND dadosabertos.pmf.sc.gov.br). O dominio nao existe: nao ha portal de dados abertos municipal neste endereco.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 53 no total — 43 `[fetch-ok]`, 10 `[fetch-falhou]`, 0 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 0 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 20 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 27 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Brasil - indices e rankings nacionais (camada de meta-evidencia)/BR · Fortaleza/CE · Recife/PE · Sao Paulo/SP · Belo Horizonte/MG · Rio de Janeiro/RJ · Brasilia/DF (Distrito Federal)/DF · Curitiba/PR · Florianopolis/SC

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
