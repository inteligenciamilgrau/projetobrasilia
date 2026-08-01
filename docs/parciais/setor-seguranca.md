# setor:seguranca — tarefa setorial de SEGURANÇA PÚBLICA (segurança é quase sempre estadual no Brasil)

**Status:** concluído (duas execuções transcritas)
**Última atualização:** 2026-08-01
**Agente:** `setor:seguranca`
**Transcrição:** este arquivo NÃO é pesquisa nova. É transcrição de um registro local de execução, não versionado. Nenhuma busca ou abertura de página foi executada por quem transcreveu. Nenhum status de verificação foi promovido.

**Origem no journal:**

| Execução | referência interna | Linha do journal | Data declarada pelo agente |
|---|---|---|---|
| Execução 1 | `execucao-1` | 13 | 31/07/2026 |
| Execução 2 | `execucao-2` | 44 | 01/08/2026 |

As duas execuções rodaram a MESMA tarefa (chave `chave-interna-omitida`). As duas estão transcritas separadamente. Elas **divergem em pontos materiais** (Ceará, Paraná, e o último mês da base do ISP-RJ). As divergências estão na seção final e NÃO foram resolvidas por quem transcreveu.

## Legenda da camada — a distinção (a)/(b) neste setor

Este setor tem uma particularidade que os dois agentes registraram explicitamente: **crime é competência estadual no Brasil**, então a maior parte do dado útil não é nem nacional nem municipal-próprio, é estadual com corte municipal. Marcadores usados:

| Marcador | Significado |
|---|---|
| `[NACIONAL — não pontua]` | Base federal disponível para qualquer município (SINESP VDE / bancovde do MJSP, dados.gov.br, Anuário FBSP, Sou da Paz, Rede de Observatórios). Não diferencia candidata. |
| `[ESTADUAL — não é municipal próprio]` | Dado produzido pela SSP/ISP/Sejusp estadual, com corte por município ou por unidade policial. É o que faz um município "ser bem servido pelo estado dele" — mas não é esforço municipal. |
| `(b) MUNICIPAL PRÓPRIO` | Dado que a prefeitura produz. Neste setor é raríssimo. |
| `CIVIL / ONG` | Fogo Cruzado, FBSP, Sou da Paz, Rede de Observatórios — terceiro setor, não órgão público. |

Enquadramento literal da Execução 2 na resposta final: a pergunta que o agente respondeu foi *"quais MUNICÍPIOS ficam bem servidos por causa do estado deles"* — ou seja, ambas as execuções tratam o eixo como estadual, não municipal.

---

# EXECUÇÃO 1 — referência interna `execucao-1` (31/07/2026)

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada | Status |
|---|---|---|---|---|---|---|---|---|
| Rio de Janeiro/RJ | segurança | ISPdados — Instituto de Segurança Pública RJ (portal) | www.ispdados.rj.gov.br/ | portal-dados-abertos | município; AISP; CISP/DP | mensal | `[ESTADUAL — não é municipal próprio]` | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | ISPdados — catálogo de bases CSV (17 bases) | www.ispdados.rj.gov.br/estatistica.html | csv/xlsx | município; AISP; CISP/DP; estado | mensal | `[ESTADUAL — não é municipal próprio]` | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | ISPdados — `BaseMunicipioMensal.csv` | www.ispdados.rj.gov.br/Arquivos/BaseMunicipioMensal.csv | csv/xlsx | município | mensal | `[ESTADUAL]` — arquivo real baixado (2,3 MB, 62 colunas) | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | ISPdados — `BaseDPEvolucaoMensalCisp.csv` | www.ispdados.rj.gov.br/Arquivos/BaseDPEvolucaoMensalCisp.csv | csv/xlsx | CISP/DP (delegacia) com chaves para AISP, RISP e município | mensal | `[ESTADUAL]` — arquivo real baixado (6,6 MB) | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | ISPdados — Divisão Territorial (bases cartográficas) | www.ispdados.rj.gov.br/Conteudo.html | geoserviço | RISP; AISP; CISP; UPP | esporádica (limites 2017-2024) | `[ESTADUAL]` — SHAPE FILE em `.rar`, KML e JPG | `[fetch-ok]` |
| Rio de Janeiro/RJ (e RM) | segurança | API Fogo Cruzado v2 — `/occurrences` | api.fogocruzado.org.br/docs/endpoint/occurrences | api | registro individual georreferenciado (bairro, sub-bairro, lat/long) | contínua (headers X-Last-Update) | `CIVIL / ONG` — não substitui dado oficial | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | API Fogo Cruzado — introdução e cobertura | api.fogocruzado.org.br/docs | api | estado e cidade | contínua | `CIVIL / ONG` — RJ desde 07/2016, Recife 04/2018, Bahia 07/2022, Pará 11/2023; requer autenticação | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | API Fogo Cruzado — `/cities` | api.fogocruzado.org.br/docs/endpoint/cities | api | município | contínua | `CIVIL / ONG` — *"NÃO retorna lat/long nem bairro"* | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | DATA.RIO — busca por "segurança" (portal municipal) | www.data.rio/search?q=seguran%C3%A7a | portal-dados-abertos | desconhecido | desconhecido | tentativa de achar `(b) MUNICIPAL PRÓPRIO` | `[fetch-falhou]` — SPA ArcGIS Hub, só a string "DATA.RIO". *"Não consegui confirmar nenhum conjunto de segurança municipal nesta sessão — tratar como não confirmado"* |
| Brasília/DF | segurança | SSP-DF — Dados por Região Administrativa e RISPs | www.ssp.df.gov.br/dados-por-regiao-administrativa/ | csv/xlsx | região administrativa (equivalente a distrito/bairro) e RISP | mensal para o ano corrente | `[ESTADUAL]` = também municipal, pois no DF o ente é único; 33 RAs nomeadas; PDF + XLS + XLSX, 2014 a 2026 | `[fetch-ok]` |
| Belo Horizonte/MG (e 853 cidades de MG) | segurança | Portal de Dados Abertos MG — "Crimes Violentos" (Sejusp) | dados.mg.gov.br/dataset/crimes-violentos | portal-dados-abertos | município e RISP | atualizado em **29/07/2026 09:10 BRT** | `[ESTADUAL — não é municipal próprio]` — CKAN, CSV 2019-2026 + datapackage.json | `[fetch-ok]` |
| Belo Horizonte/MG | segurança | Sejusp-MG — página de Dados Abertos institucional | www.seguranca.mg.gov.br/index.php/transparencia/dados-abertos | desconhecido | município (alegado) | mensal (alegado) | `[ESTADUAL]` alegado | `[nao-testado]` — *"NÃO ABRI esta URL — não afirmo nada sobre ela"* |
| São Paulo/SP | segurança | Dados Abertos SP — API CKAN de "NÚMEROS SEM MISTÉRIO" | dadosabertos.sp.gov.br/api/3/action/package_show?id=numeros-sem-misterio | api | nenhuma — só links para páginas | metadado geral de 17/04/2025 | `[ESTADUAL]` — **ACHADO CRÍTICO:** 12 recursos, todos com campo `format` VAZIO | `[fetch-ok]` |
| São Paulo/SP | mobilidade/trânsito | Dados Abertos SP — Sinistros (Infosiga) / DETRAN-SP | dadosabertos.sp.gov.br/dataset/sinistros-infosiga | csv/xlsx | registro individual georreferenciado (código IBGE + lat/long) | mensal (consolidação ~dia 15 do mês seguinte) | `[ESTADUAL]` — cobre todos os municípios de SP; *"genuinamente exemplar"* | `[fetch-ok]` |
| São Paulo/SP | segurança | Dados Abertos SP — página de "NÚMEROS SEM MISTÉRIO" | dadosabertos.sp.gov.br/dataset/numeros-sem-misterio | portal-dados-abertos | município e unidade policial (alegado pelo órgão) | última atualização do registro: 17/04/2025 | `[ESTADUAL]` | `[fetch-ok]` |
| São Paulo/SP | segurança | Dados Abertos SP — organização SSP | dadosabertos.sp.gov.br/organization/secretaria-da-seguranca-publica | portal-dados-abertos | desconhecido | desconhecido | `[ESTADUAL]` — só 2 conjuntos; o segundo declarado PDF | `[fetch-ok]` |
| São Paulo/SP | segurança | SSP-SP — página Consultas (ferramenta de download) | www.ssp.sp.gov.br/estatistica/consultas | painel/dashboard | município e delegacia (alegado) | mensal (alegado) | `[ESTADUAL]` | `[fetch-falhou]` — HTTP 200 mas só o título "Portal SSP" (SPA). *"Também falharam do mesmo modo /estatistica/dados-mensais e /conseg/portal/indice-criminalidade"* |
| São Paulo/SP | segurança | Base dos Dados — Segurança no Estado de SP (mirror) | basedosdados.org/dataset/dbd717cb-7da8-4efd-9162-951a71694541 | api | desconhecido (lista de tabelas não renderizou) | descontinuado | `CIVIL / ONG` — período 2002-2021. *"Serve como histórico, NÃO como fonte atual"* | `[fetch-ok]` |
| Fortaleza/CE (e RM) | segurança | SSPDS-CE — Dados Detalhados (13 séries em XLSX) | www.ce.gov.br/sspds/estatisticas/dados-detalhados/ | csv/xlsx | não declarado na página; município e AIS **alegados** pelo órgão | anual (séries fechadas em 2025) | `[ESTADUAL]` — inclui temas raros: homofobia/transfobia 2021-2025, indígenas 2009-2025, raça/cor 2011-2025, maus-tratos a animais 2019-2025, Maria da Penha 2012-2025 | `[fetch-ok]` |
| Fortaleza/CE | segurança | Supesp-CE — Estatística SSPDS (indicadores e painéis) | www.ce.gov.br/supesp/estatistica-sspds/ | painel/dashboard | AIS e estado; CVLI diário | mensal | `[ESTADUAL]` — acessada após redirect 301 de `supesp.ce.gov.br`; PDF para mensal, XLSX para detalhados | `[fetch-ok]` |
| Recife/PE (e RM) | segurança | SDS-PE — Indicadores Criminais | www.sds.pe.gov.br/estatisticas | painel/dashboard | município e regiões do estado | mensal — preliminar até dia 5, consolidado até dia 15 do mês seguinte | `[ESTADUAL]` — *"previsibilidade que quase nenhum estado documenta"* | `[fetch-ok]` |
| Recife/PE | segurança | API Fogo Cruzado — cobertura de Recife desde abril/2018 | api.fogocruzado.org.br/docs | api | registro individual com bairro, sub-bairro e lat/long | contínua | `CIVIL / ONG` | `[fetch-ok]` |
| Salvador/BA (e RM) | segurança | SSP-BA — Publicações: Estatística | www.ba.gov.br/ssp/publicacoes/Estat%C3%ADstica | desconhecido | município; AISP/RISP; Capital/Interior/RM | mensal e acumulado | `[ESTADUAL]` — *"O formato dos arquivos NÃO é declarado nesta página de índice"* | `[fetch-ok]` |
| Salvador/BA | segurança | Transparência Bahia — Painel Estatístico da Segurança Pública | www.transparencia.ba.gov.br/PainelEstatisticoSegurancaPublica | painel/dashboard | desconhecido | desconhecido | `[ESTADUAL]` — *"NÃO menciona download em CSV/XLSX, não especifica município/AISP/RISP nem os anos"* | `[fetch-ok]` |
| Salvador/BA | segurança | API Fogo Cruzado — cobertura da Bahia desde julho/2022 | api.fogocruzado.org.br/docs | api | registro individual com bairro, sub-bairro e lat/long | contínua | `CIVIL / ONG` | `[fetch-ok]` |
| Porto Alegre/RS (e 497 cidades) | segurança | Dados RS — Indicadores Criminais de 2025 (SSP-RS) | dados.rs.gov.br/dataset/indicadores-criminais-de-2025 | portal-dados-abertos | município | mensal, mas com defasagem grande | `[ESTADUAL]` — **10 recursos XLSX, só janeiro a outubro de 2025**, apesar de última atualização 23/04/2026 | `[fetch-ok]` |
| Porto Alegre/RS | segurança | SSP-RS — página de Estatísticas | www.ssp.rs.gov.br/estatisticas | desconhecido | desconhecido | desconhecido | `[ESTADUAL]` | `[fetch-falhou]` — HTTP 200 sem nenhuma estatística; só endereço e horário de atendimento |
| Curitiba/PR | segurança | SESP-PR / CAPE — Estatísticas criminais | www.seguranca.pr.gov.br/CAPE/Estatisticas | painel/dashboard | desconhecido | desconhecido | `[ESTADUAL]` | `[fetch-falhou]` — **HTTP 403 Forbidden.** *"Não é URL inventada — é a URL citada tanto pelo próprio site da SESP quanto pelo CECONSEG"* |
| Curitiba/PR | segurança | SESP-PR — página de Estatísticas (Transparência) | www.seguranca.pr.gov.br/Pagina/Estatisticas | desconhecido | desconhecido | **indisponível** | `[ESTADUAL]` | `[fetch-ok]` — exibe o aviso: *"Em razão da legislação eleitoral, este conteúdo ficará indisponível"* |
| Curitiba/PR | segurança | CECONSEG-PR — Estatística Pública | www.conseg.pr.gov.br/Pagina/Estatistica-Publica | painel/dashboard | desconhecido | desconhecido | `[ESTADUAL]` | `[fetch-ok]` — só redireciona para a URL que dá 403 |
| Nacional | segurança | MJSP — Base de dados e notas metodológicas dos Gestores Estaduais (SINESP VDE) | www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/estatistica/dados-nacionais-1/base-de-dados-e-notas-metodologicas-dos-gestores-estaduais-sinesp-vde-2022-e-2023 | csv/xlsx | UF (nível municipal NÃO confirmado) | anual, com arquivo de 2026 já publicado | `[NACIONAL — não pontua]` — 12 arquivos `bancovde-2015.xlsx` a `bancovde-2026.xlsx` | `[fetch-ok]` |
| Nacional | segurança | MJSP — `bancovde-2026.xlsx` (arquivo do ano corrente) | www.gov.br/mj/…/download/dnsp-base-de-dados/bancovde-2026.xlsx/@@download/file | csv/xlsx | desconhecido — não inspecionado | anual | `[NACIONAL — não pontua]` | `[fetch-falhou]` — *"maxContentLength size of 10485760 exceeded"*. *"Não inspecionei colunas; não afirmo se há campo de município"* |
| Nacional | segurança | MJSP — Dados Nacionais de Segurança Pública (página índice) | www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/estatistica | painel/dashboard | UF | anual/contínua | `[NACIONAL — não pontua]` — 28 indicadores via SINESP VDE | `[fetch-ok]` |
| Nacional | segurança | Portal de Dados Abertos do MJSP | dados.mj.gov.br/dataset/sistema-nacional-de-estatisticas-de-seguranca-publica | portal-dados-abertos | desconhecido | desconhecido | `[NACIONAL — não pontua]` | `[fetch-falhou]` — *"getaddrinfo ENOTFOUND dados.mj.gov.br"* — o domínio não resolve |
| Nacional | segurança | dados.gov.br — conjunto SINESP | dados.gov.br/dados/conjuntos-dados/sistema-nacional-de-estatisticas-de-seguranca-publica | portal-dados-abertos | desconhecido | desconhecido | `[NACIONAL — não pontua]` | `[fetch-falhou]` — só o cabeçalho "Portal de Dados Abertos" (SPA) |
| Nacional | segurança | Base dos Dados — Anuário Brasileiro de Segurança Pública (FBSP) | basedosdados.org/dataset/9a2368e4-2fa6-4b42-88b7-026aa048f5ab?table=82e257d0-… | api | não confirmada | descontinuado no mirror (2007-2021) | `[NACIONAL — não pontua]` / `CIVIL` | `[fetch-ok]` — seção de tabelas ficou em "Loading…" |
| Nacional | segurança | FBSP — Anuário 2025 (19ª edição) | forumseguranca.org.br/publicacoes/anuario-brasileiro-de-seguranca-publica-2025/ | pdf/relatório | UF; município (alegado) | anual | `[NACIONAL — não pontua]` / `CIVIL` | `[nao-testado]` — *"NÃO ABRI esta URL"* |
| Nacional | segurança | Rede de Observatórios da Segurança | observatorioseguranca.com.br/ | pdf/relatório | desconhecido | desconhecido | `CIVIL / ONG` | `[nao-testado]` — *"NÃO ABRI esta URL"* |
| Nacional | segurança | Instituto Sou da Paz — Onde Mora a Impunidade | soudapaz.org/documentos/infografico-onde-mora-a-impunidade-8aedicao/ | pdf/relatório | UF (27 unidades da federação) | anual desde 2017 (8 edições) | `CIVIL / ONG` | `[nao-testado]` — *"NÃO ABRI esta URL"* |

**Contagem da Execução 1: 39 linhas — 28 `[fetch-ok]`, 7 `[fetch-falhou]`, 4 `[nao-testado]`.**
Declaração do próprio agente (transcrita): *"Fiz 12 buscas […] e depois abri com WebFetch 34 URLs. Contagem honesta: 26 abriram com conteúdo aproveitável (fetch-ok), 5 falharam (fetch-falhou) e 3 fontes eu deixei explicitamente como não-testado."* Os números declarados não coincidem com as linhas da tabela dele. Registro os dois sem promover nada.

## Achados (Execução 1)

- **Rio de Janeiro é o melhor do Brasil em segurança, "sem concorrente próximo".** Motivo: ISP-RJ é *"o único órgão estadual que publica CSV com URL direta, estável, versionada e ATUAL"*, em três níveis encaixados (município, AISP, CISP). **O agente afirma ter inspecionado o fim do arquivo e visto a última linha em `2026m06` (Volta Redonda, junho de 2026)** — *"essa é a evidência mais forte de todo o levantamento e a razão pela qual coloco o RJ em primeiro lugar."*
- **Brasília/DF, caso especial:** publicação por Região Administrativa dá *"granularidade intra-urbana (equivalente a bairro) que quase nenhum outro lugar do Brasil oferece em planilha"*, 2014-2026, mensal, sem geoprocessamento.
- **Minas Gerais tem "a melhor higiene de dados abertos do Brasil em segurança":** CKAN real, CSV por ano 2019-2026, atualizado 29/07/2026 — *"dois dias antes desta consulta"*.
- **ACHADO CRÍTICO em São Paulo (literal):** *"consultei a API CKAN do catálogo estadual e os 12 'recursos' do conjunto NÚMEROS SEM MISTÉRIO têm o campo format VAZIO e a url apontando de volta para páginas do portal SSP — não há um único arquivo de dados no catálogo. Ou seja, SP figura como 'dados abertos' sem publicar dado aberto de criminalidade. […] Não inferi isso: li a resposta da API."*
- **RISCO SISTÊMICO ELEITORAL (Paraná):** `seguranca.pr.gov.br/Pagina/Estatisticas` exibe *"Em razão da legislação eleitoral, este conteúdo ficará indisponível"* e a URL de dados dá 403. *"Se a legislação eleitoral está sendo usada para tirar estatística criminal do ar no PR, outros estados podem fazer o mesmo ao longo de 2026 — vale checar novamente depois de outubro/2026 e preferir fontes que já provaram continuidade (RJ publicou junho/2026 normalmente)."*
- **Camada de fallback nacional:** o SINESP VDE do MJSP é registrado separadamente *"porque é o piso que vale para toda cidade, inclusive as que o estado abandona (Curitiba, por exemplo)"* — mas marcado `[NACIONAL — não pontua]` e com nível municipal **não confirmado**.
- **Recomendação prática:** *"começar por Rio de Janeiro (profundidade) e Belo Horizonte (limpeza de pipeline), usar Brasília como vitrine de granularidade de bairro, e manter o SINESP VDE do MJSP como camada de fallback comparável para qualquer município cujo estado falhe — foi exatamente o que aconteceu com o Paraná."*

## Correções (o que o próprio agente derrubou) — Execução 1

O agente não registrou seção de erros próprios. Registrou como falhas de infraestrutura de terceiros (5 falhas, literais):

1. `dados.mj.gov.br` não resolve DNS — portal de dados do Ministério da Justiça fora do ar, *"embora seja linkado pela própria página institucional do gov.br"*.
2. `seguranca.pr.gov.br/CAPE/Estatisticas` devolve HTTP 403 e a página irmã exibe o aviso eleitoral.
3. `bancovde-2026.xlsx` existe e responde, mas passa de 10 MB e estourou o limite da ferramenta.
4. `ssp.rs.gov.br/estatisticas` e `data.rio` devolveram 200 sem conteúdo útil.
5. `dados.gov.br` idem.

## Fraquezas e riscos (Execução 1)

- **Rio:** CSVs servidos como `application/octet-stream` em latin-1 (*"aparece 'Teresópolis' quebrado"*); coluna `fase` indica preliminar vs consolidado (meses recentes podem mudar); base municipal começa em 2014 (CISP em 2003); shapefiles em `.rar` com limites 2019-2024; série UPP encerrada em 06/2021.
- **DF:** *"Não é portal de dados abertos de verdade: é biblioteca de documentos"* (Liferay), sem metadados de formato, sem URL previsível por ano, sem API; XLS legado misturado com PDF; `dados.df.gov.br` não aberto nesta sessão.
- **MG:** granularidade para em município/RISP — *"NÃO há nível bairro/delegacia como no RJ ou DF, o que é limitante para Belo Horizonte especificamente"*; página institucional da Sejusp `[nao-testado]`; série no portal começa em 2019 embora o REDS exista desde 2011; Anuário em PDF.
- **SP:** SPA ilegível em 4 caminhos; catálogo com metadados de 17/04/2025; mirror da Base dos Dados congelado em 2021; *"não existe API oficial — o que se acha no GitHub são scrapers de terceiros"*.
- **CE:** reorganização de domínio em curso (301 de `supesp.ce.gov.br` para `ce.gov.br/supesp`) — *"links antigos vão quebrar"*; granularidade geográfica dos XLSX **não declarada na página** (vem de comunicação oficial e de busca); ano corrente só em PDF; Salvamento e Incêndios param em 2024.
- **PE:** formato não confirmado por inspeção; sem CKAN; cobertura de anos não declarada; AIS e macrorregião *"aparecem em matéria de imprensa mas não foram confirmados"*; API do Fogo Cruzado exige autorização prévia.
- **BA:** *"FORMATO NÃO CONFIRMADO — esta é a lacuna principal. […] Trate como possivelmente PDF até provar o contrário."*
- **RS:** **DEFASAGEM** — dataset de 2025 atualizado em 23/04/2026 mas com apenas jan-out/2025 e nenhum recurso de 2026; *"na prática o dado aberto do RS está ~9 meses atrasado em relação ao RJ"*; um dataset por ANO exige concatenar dezenas de URLs.
- **Nacional:** XLSX de ~10 MB por ano *"é formato ruim para ingestão automatizada (deveria ser CSV ou API)"*; mirror do Anuário FBSP cobre 2007-2021 e não renderizou tabelas.

## O que não consegui verificar, e por quê (Execução 1) — literal

(a) Formato dos arquivos da SSP-BA e da SDS-PE — *"as páginas listam séries mas não declaram extensão, e não abri arquivo individual; podem ser PDF."*
(b) Granularidade geográfica dos 13 XLSX do Ceará — *"a página de dados detalhados não declara município/AIS; isso vem de comunicação oficial e de busca, não do arquivo."*
(c) Se o `bancovde` do MJSP tem coluna de município.
(d) Tabelas e granularidade do mirror do Anuário FBSP na Base dos Dados.
(e) *"Não abri seguranca.mg.gov.br/transparencia/dados-abertos, forumseguranca.org.br, observatorioseguranca.com.br nem soudapaz.org — estão marcados não-testado e não fiz nenhuma afirmação sobre eles."*
**LIMITAÇÃO SPA:** *"Nada de ssp.sp.gov.br é legível por WebFetch: tentei 4 caminhos […] e todos retornaram apenas o título 'Portal SSP'."*

## Síntese (Execução 1)

1ª escolha: Rio de Janeiro e RM (único com série mensal em CSV de URL direta, atual em junho/2026, em nível de delegacia, mais shapefiles e Fogo Cruzado desde 2016). 2ª: Brasília/DF pela granularidade por Região Administrativa pronta. 3ª: Belo Horizonte pela higiene de pipeline, com a ressalva séria de não haver nível sub-municipal. Depois Fortaleza, Recife e Salvador. Porto Alegre fica atrás da reputação (~9 meses de defasagem). Curitiba está inviável hoje (403 + bloqueio eleitoral).

---

# EXECUÇÃO 2 — referência interna `execucao-2` (01/08/2026)

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada | Status |
|---|---|---|---|---|---|---|---|---|
| Rio de Janeiro/RJ (e RM) | segurança | ISP-RJ — `BaseMunicipioMensal.csv` | www.ispdados.rj.gov.br/Arquivos/BaseMunicipioMensal.csv | csv/xlsx | município | mensal | `[ESTADUAL — não é municipal próprio]` | `[fetch-ok]` — *"ATENÇÃO: o leitor só processou o início do arquivo, então NÃO confirmei qual é o último mês disponível"* |
| Rio de Janeiro/RJ | segurança | ISP-RJ — `BaseDPEvolucaoMensalCisp.csv` | www.ispdados.rj.gov.br/Arquivos/BaseDPEvolucaoMensalCisp.csv | csv/xlsx | equipamento/unidade (CISP/delegacia, com AISP, RISP e município na mesma linha) | mensal | `[ESTADUAL]` — série começa jan/2003, traz código IBGE (`mcirc`) pronto para join | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | ISPdados — portal de estatísticas (índice de bases) | www.ispdados.rj.gov.br/estatistica.html | portal-dados-abertos | município \| distrito/bairro (via CISP) \| estado | mensal | `[ESTADUAL]` — *"Tudo em CSV (não vi alternativa XLSX)"* | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | Divisão Territorial da Segurança Pública RJ — `dadosabertos.rj.gov.br` | dadosabertos.rj.gov.br/dataset/isp-divisao-territorial | geoserviço | distrito/bairro (polígonos de CISP/AISP) | esporádica — versão rotulada JAN/2024 | `[ESTADUAL]` — 13 recursos; CKAN com API documentada | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | Instituto Fogo Cruzado — API v2 `/occurrences` | api.fogocruzado.org.br/docs/endpoint/occurrences | api | registro individual georreferenciado (lat/long + bairro + sub-bairro) | contínua/quase tempo real | `CIVIL / ONG` — *"A página tem botão LOGIN mas não explicita se o token é obrigatório nesse endpoint"* | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | Fogo Cruzado — documentação/introdução (cobertura) | api.fogocruzado.org.br/docs | api | registro individual | contínua | `CIVIL / ONG` — RJ 07/2016, Recife 04/2018, Bahia 07/2022, Pará 11/2023; *"Declara 'uso do conteúdo é livre'"* | `[fetch-ok]` |
| Rio de Janeiro/RJ | segurança | ISP Conecta — painéis interativos RJ | www.ispconecta.rj.gov.br/ | painel/dashboard | desconhecido | desconhecido | `[ESTADUAL]` — *"vale como camada de visualização, não como fonte de dado bruto"* | `[fetch-ok]` |
| Belo Horizonte/MG (e 853 municípios) | segurança | Portal de Dados Abertos MG — dataset Crimes Violentos (SEJUSP) | dados.mg.gov.br/dataset/crimes-violentos | portal-dados-abertos | município + RISP | mensal (extração no 5º dia do mês ou 1º dia útil seguinte); última atualização **29/07/2026 09:10 BRT** | `[ESTADUAL — não é municipal próprio]` | `[fetch-ok]` |
| Recife/PE (e RMR) | segurança | SDS-PE — Indicadores Criminais | www.sds.pe.gov.br/estatisticas | csv/xlsx | município + região de desenvolvimento | mensal com prazo explícito: preliminar até dia 5, consolidado até dia 15 | `[ESTADUAL]` — *"A página NÃO especifica se a planilha é XLS, XLSX ou CSV"* | `[fetch-ok]` |
| Recife/PE | segurança | Fogo Cruzado — cobertura RMR | api.fogocruzado.org.br/docs | api | registro individual georreferenciado | contínua | `CIVIL / ONG` | `[fetch-ok]` |
| Recife/PE | mobilidade/trânsito | Portal de Dados Abertos da Prefeitura do Recife (CKAN) | dados.recife.pe.gov.br/ | portal-dados-abertos | registro individual (multas) / equipamento | desconhecido | `(b) MUNICIPAL PRÓPRIO` — "Registro das Infrações de Trânsito" da CTTU. *"NÃO há dataset de crime no portal municipal — crime é estadual, como esperado"* | `[fetch-ok]` |
| Recife/PE | segurança | Rede de Observatórios da Segurança — relatórios | observatorioseguranca.com.br/produtos/relatorios/ | pdf/relatório | estado | por publicação | `CIVIL / ONG` — *"TUDO em PDF"* | `[fetch-ok]` |
| Brasília/DF | segurança | SSP-DF — Dados por Região Administrativa e RISP | www.ssp.df.gov.br/dados-por-regiao-administrativa/ | csv/xlsx | distrito/bairro (Região Administrativa) + RISP | mensal para o ano corrente | `[ESTADUAL]` = municipal (ente único) — **~754 documentos**, 2014 a 2026, PDF + XLS, separando data do fato e data da comunicação | `[fetch-ok]` |
| São Paulo/SP (645 municípios) | mobilidade/trânsito | Infosiga SP — Sinistros, Vítimas e Veículos | dadosabertos.sp.gov.br/dataset/sinistros-infosiga | csv/xlsx | registro individual (vítima, sinistro, veículo) com localização; cobre os 645 municípios | mensal; última atualização 03/02/2026 | `[ESTADUAL]` — licença CC BY 4.0 | `[fetch-ok]` |
| São Paulo/SP | mobilidade/trânsito | Infosiga — URL de download direto do pacote | dadosabertos.sp.gov.br/dataset/sinistros-infosiga/resource/8926a9b9-2e77-41ba-b990-953cf54c05e4 | csv/xlsx | registro individual | mensal | `[ESTADUAL]` — expõe `infosiga.detran.sp.gov.br/rest/painel/download/file/dados_infosiga.zip`. **Metadados divergem entre si:** ficha diz 30/09/2025, dataset diz 03/02/2026 | `[fetch-ok]` |
| São Paulo/SP | segurança | Catálogo "Números sem Mistério" (SSP-SP) | dadosabertos.sp.gov.br/dataset/numeros-sem-misterio | portal-dados-abertos | desconhecido pela ficha | última atualização do registro: 17/04/2025 | `[ESTADUAL]` — *"12 recursos, e a maioria com formato 'Link' e não arquivo"* | `[fetch-ok]` |
| São Paulo/SP | segurança | Ficha do recurso SP VIDA | dadosabertos.sp.gov.br/dataset/numeros-sem-misterio/resource/370d2cb4-eee0-43c4-9a97-34e247851702 | painel/dashboard | desconhecido | registro atualizado em 17/04/2025 | `[ESTADUAL]` — formato declarado no metadado: "Desconhecido"; descrição alega download de Excel mas aponta para URL que o agente NÃO conseguiu ler | `[fetch-ok]` |
| São Paulo/SP | finanças/orçamento | `dadosabertos.sp.gov.br` — "Base de Dados da SSP" (**NÃO é crime**) | dadosabertos.sp.gov.br/dataset/dados-seguranca-publica | portal-dados-abertos | não aplicável (institucional) | registro atualizado em 17/04/2025 | `[ESTADUAL]` administrativo — *"Alerta contra armadilha de nome"*: plano de ação, contratos, convênios, receitas/despesas, remuneração | `[fetch-ok]` |
| São Paulo/SP | segurança | SSP-SP — Dados Mensais | www.ssp.sp.gov.br/estatistica/dados-mensais/ | desconhecido | não verificável | desconhecido | `[ESTADUAL]` | `[fetch-falhou]` — só o título "Portal SSP". *"Mesmo resultado em /estatistica/consultas e /estatistica/spvida (3 de 3 falhas)"* |
| São Paulo/SP | segurança | Base dos Dados — Segurança no Estado de SP (espelho) | basedosdados.org/dataset/dbd717cb-7da8-4efd-9162-951a71694541 | desconhecido | não declarada na página | série encerrada | `CIVIL / ONG` — cobertura 2002-2021, *"espelho DESATUALIZADO, quatro anos atrasado"* | `[fetch-ok]` |
| São Paulo/SP | mobilidade/trânsito | Portal Infosiga (front-end) | infosiga.sp.gov.br/ | painel/dashboard | não verificável | desconhecido | `[ESTADUAL]` | `[fetch-falhou]` — falha de TLS: *"Hostname/IP does not match certificate altnames"*; o `www` redireciona 301 para `infosiga.detran.sp.gov.br`, também SPA |
| São Paulo/SP | segurança | SSP-SP — Plano de Dados Abertos (PDA) | www.ssp.sp.gov.br/assets/download/Dados_Abertos.pdf | pdf/relatório | desconhecido | desconhecido | `[ESTADUAL]` | `[fetch-falhou]` — *"read ECONNRESET"*. *"NÃO posso afirmar o que a secretaria formalmente se compromete a publicar"* |
| Salvador/BA (e RMS) | segurança | SSP-BA — Publicações: Estatística | www.ba.gov.br/ssp/publicacoes/Estat%C3%ADstica | desconhecido | município + AISP + RISP (capital, RMS, interior) | mensal e consolidada | `[ESTADUAL]` — *"A página NÃO especifica formato (PDF, XLS ou CSV)"* | `[fetch-ok]` |
| Salvador/BA | segurança | SSP-BA — Anuário de Segurança Pública (apresentação/metodologia) | www.ba.gov.br/ssp/informacoes-criminais/anuario/apresentacao | pdf/relatório | município + RISP + AISP + **Territórios de Identidade** | anual | `[ESTADUAL]` — *"A página NÃO informa formato nem os anos cobertos"* | `[fetch-ok]` |
| Salvador/BA | segurança | Transparência Bahia — Painel Estatístico (SEI DataLab) | www.transparencia.ba.gov.br/PainelEstatisticoSegurancaPublica | painel/dashboard | desconhecido | desconhecido | `[ESTADUAL]` — *"página praticamente vazia de metadado"* | `[fetch-ok]` |
| Salvador/BA | segurança | Fogo Cruzado — cobertura Bahia | api.fogocruzado.org.br/docs | api | registro individual georreferenciado | contínua | `CIVIL / ONG` — desde julho de 2022 | `[fetch-ok]` |
| Porto Alegre/RS (e 497 municípios) | segurança | Dados RS (CKAN) — Indicadores Criminais de 2025 | dados.rs.gov.br/dataset/indicadores-criminais-de-2025 | csv/xlsx | município | mensal (um arquivo por mês); última atualização 23/04/2026 | `[ESTADUAL]` — 10 XLSX (jan-out/2025); **licença CC0-1.0**; *"Novembro e dezembro/2025 ainda não publicados"* | `[fetch-ok]` |
| Porto Alegre/RS | segurança | Dados RS — busca por indicadores criminais (todas as safras) | dados.rs.gov.br/dataset?q=indicadores+criminais | portal-dados-abertos | município | anual/mensal | `[ESTADUAL]` — 15 datasets 2011-2025. *"NÃO há dataset de 2026 no portal"* | `[fetch-ok]` |
| Porto Alegre/RS | segurança | SSP-RS — Indicadores Criminais (site institucional) | www.ssp.rs.gov.br/indicadores-criminais | csv/xlsx | município + estado | mensal; **"atualizado em julho de 2026"** | `[ESTADUAL]` — XLSX/XLS de 2002 a 2026 | `[fetch-ok]` |
| Nacional (BR) | segurança | Anuário Brasileiro de Segurança Pública 2025 (FBSP) | forumseguranca.org.br/publicacoes/anuario-brasileiro-de-seguranca-publica-2025/ | csv/xlsx | estado + município acima de 100 mil habitantes (para MVI) | anual (lançamento em julho) | `[NACIONAL — não pontua]` / `CIVIL` — *"a página oferece explicitamente DOIS botões: 'Baixar edição 2025' e 'Baixar Excel'"* | `[fetch-ok]` |
| Nacional (BR) | segurança | SINESP / MJSP — Dados Nacionais de Segurança Pública | www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/estatistica | painel/dashboard | estado (agregação por UF via SINESP VDE) | desconhecido | `[NACIONAL — não pontua]` — *"A página NÃO declara formato de arquivo, NÃO declara granularidade e NÃO declara período"*; ressalva do próprio texto: *"dados disponíveis refletem o nível de alimentação e consolidação de cada Unidade da Federação"* | `[fetch-ok]` |
| Nacional (BR) | segurança | Instituto Sou da Paz — Onde Mora a Impunidade | lp.soudapaz.org/onde-mora-a-impunidade | pdf/relatório | estado | irregular; **7ª edição ainda com dados de 2022** | `CIVIL / ONG` — *"a página afirma que não há planilha"*; 18 estados com dado completo, 9 excluídos, 4 (CE, MG, PE, RN) com inconsistências | `[fetch-ok]` |
| Nacional (BR) | segurança | Rede de Observatórios da Segurança | observatorioseguranca.com.br/produtos/relatorios/ | pdf/relatório | estado | por publicação (mais recente: 2026) | `CIVIL / ONG` — *"NÃO oferece dataset bruto para download — só PDF"* | `[fetch-ok]` |

**Contagem da Execução 2: 33 linhas — 30 `[fetch-ok]`, 3 `[fetch-falhou]`, 0 `[nao-testado]`.**
Declaração do próprio agente: *"8 buscas WebSearch para descobrir candidatos e 31 chamadas WebFetch […] Política: nada entra como fetch-ok sem eu ter visto conteúdo real na resposta."* **Importante:** o agente documenta no `method_notes` MAIS falhas do que aparecem como linha de fonte na tabela dele — essas falhas estão transcritas na seção "O que não consegui verificar" abaixo e NÃO foram convertidas em linhas de fonte por quem transcreveu.

## Achados (Execução 2)

- **Rio de Janeiro é a melhor combinação do Brasil** e *"a única onde eu consegui BAIXAR o dado bruto e ler as colunas na mesma sessão"*. Três camadas: ISP-RJ (CSV direto, sem cadastro), KML/shapefile de CISP/AISP/RISP no CKAN estadual, e Fogo Cruzado com lat/long e bairro desde julho/2016.
- **Belo Horizonte é "o dado mais LIMPO e mais ATUAL"** do levantamento: CKAN real, CSV 2019-2026, atualizado 29/07/2026 — *"dois dias antes desta pesquisa"*. *"Perde do Rio em granularidade […] mas ganha em confiabilidade de pipeline e frescor."*
- **Recife é a segunda cidade do país com a pilha completa** estado + hiperlocal + prefeitura: SDS-PE com SLA explícito, Fogo Cruzado desde 04/2018, Rede de Observatórios em PE, e CKAN municipal com API. *"Para um piloto que quer testar 'dado de bairro em cidade nordestina', Recife é a aposta mais defensável."*
- **Brasília/DF, "caso especial e subestimado":** ~754 documentos por Região Administrativa, 2014-2026, *"com o detalhe metodológico de separar data do fato e data do registro (isso importa muito e quase ninguém faz)"*.
- **São Paulo, "caso partido" — o achado mais útil sobre SP:** conteúdo riquíssimo e acesso ruim. *"Se o piloto for segurança, SP exige scraper com navegador; se for mobilidade, SP é primeiro lugar."*
- **Porto Alegre / RS:** melhor higiene do Sul, licença **CC0-1.0** (*"juridicamente o mais permissivo de todos que verifiquei"*), mas *"é município e nada abaixo — sem AISP, sem bairro, sem geoserviço. Bom piloto para 'ranking entre cidades', ruim para 'onde no meu bairro'."*
- **Régua nacional:** só o FBSP oferece dado tabulado (botão "Baixar Excel") e corte municipal (MVI em municípios acima de 100 mil habitantes). *"SINESP, Sou da Paz e Rede de Observatórios são, na prática, leitura — não insumo de pipeline."*
- **Camadas de recomendação (literal):** Camada A pronto para piloto hoje = municípios do RJ. Camada B excelente pipeline sem bairro = 853 municípios de MG e 497 do RS. Camada C granularidade intraurbana de graça = DF. Camada D forte no conteúdo com incerteza de formato = RMR de PE e RMS da BA. Camada E caso partido = os 645 municípios de SP.
- **Recomendação final:** *"Rio de Janeiro para provar profundidade (único com bairro), Belo Horizonte para provar automação (único com CSV+API+metadado fresco), Brasília como terceiro barato […] Se o piloto tiver que ser uma cidade só: Rio de Janeiro, e a justificativa é que eu literalmente baixei e li o dado dela."*

## Correções e descartes fundamentados (Execução 2) — literais

**DESCARTES FUNDAMENTADOS (por que não recomendei):**
- **CEARÁ/FORTALEZA:** *"abri ce.gov.br/supesp/dados-cvli/ e NÃO havia CSV nem XLSX — só um guia em PowerPoint. As buscas mostram CVLI mensal em PDF. Há alegação de terceiros de que a SUPESP publica 'planilha eletrônica', mas eu não localizei nem abri esse arquivo. Pelo critério 2 (PDF vale pouco), CE fica fora do piloto até alguém achar a planilha."*
- **GOIÁS:** *"goias.gov.br/seguranca/estatisticas/ abriu e é PDF apenas, com seções 'Em manutenção', sem nenhuma evidência de corte municipal, e o arquivo mais recente junta 2019-2024 num único PDF. Descartado com evidência."*
- **Espelho Base dos Dados de SP:** *"cobre só 2002-2021, 4 anos defasado. Não usar como atalho."*
- **PARANÁ / CURITIBA:** *"NÃO VERIFICADO — deliberadamente não entrou na lista de candidatos, porque eu não tenho base para recomendar nem para descartar."*

**ARMADILHAS QUE VALE REGISTRAR (literais):**
1. *"O dataset dadosabertos.sp.gov.br/dataset/dados-seguranca-publica se chama 'Base de Dados da Secretaria da Segurança Pública' mas NÃO tem microdado criminal — é transparência administrativa (plano de ação, contratos, receitas, folha). Nome engana."*
2. *"Metadados do próprio catálogo de SP se contradizem sobre o Infosiga: 30/09/2025 na ficha do recurso vs 03/02/2026 na página do dataset."*
3. *"No RS, o portal CKAN oficial (para em 2025, só jan-out) está ATRÁS do site institucional da SSP (atualizado em julho/2026). O canal mais 'aberto' serve o dado mais velho."*

## Fraquezas e riscos (Execução 2)

- **Rio:** *"Não consegui confirmar o ÚLTIMO mês das bases CSV — o leitor truncou os arquivos grandes; alguém precisa baixar e checar o max(mes_ano) antes de prometer 'dado atualizado'."* Limites KML de 2017-2019 com dataset rotulado JAN/2024; células vazias no meio das linhas da base CISP; Fogo Cruzado é ONG com metodologia diferente da policial; série municipal começa em 2014 vs delegacia em 2003.
- **MG:** só 1 dataset aberto; domínio legado `legado.seguranca.mg.gov.br` ainda aparece em buscas (*"risco de link podre e de duas versões do mesmo dado"*); API do CKAN não testada; *"RISP é uma unidade policial, não administrativa — não casa com bairro nem com regional da prefeitura de BH"*.
- **PE:** formato exato da planilha da SDS-PE **não confirmado** — *"Isso é a maior incerteza deste candidato"*; `dados.gov.br` boletins de PE → HTTP 401; notícia da nova plataforma → HTTP 404; filtro por tag no portal do Recife → HTTP 500; *"a camada municipal do Recife é magra em segurança […] o que cria dependência de fornecedor único"*.
- **DF:** `dados.df.gov.br/group/seguranca` → HTTP 404 (*"o caminho canônico de dados abertos do DF para segurança está quebrado"*); biblioteca Liferay com nomes de arquivo *"horrorosos"* e sem padrão estável de URL; 754 arquivos avulsos; nenhum XLS individual aberto.
- **SP:** 3 falhas de leitura no `ssp.sp.gov.br`; PDA com ECONNRESET; erro de certificado TLS; metadados contraditórios; armadilha de nomenclatura; registros do catálogo congelados em 17/04/2025; espelho 4 anos defasado.
- **BA:** *"NÃO confirmei formato em nenhuma fonte oficial da BA […] Provavelmente PDF e XLS, mas isso é inferência minha, não evidência."* Painel quase vazio; sem CKAN estadual; anuário sem anos declarados; Fogo Cruzado na BA é recente (07/2022).
- **RS:** descompasso entre canais (CKAN atrás do site institucional); ~180 planilhas para empilhar; nenhum XLSX individual baixado; sem granularidade sub-municipal.
- **Nacional:** Sou da Paz com dados de 2022 em 2026; SINESP sem formato nem granularidade declarados e dependente de alimentação voluntária das UFs; ficha do SINESP no `dados.gov.br` só devolveu shell de SPA; *"NÃO cliquei no 'Baixar Excel' do FBSP: confirmei que o botão existe, não que o arquivo abre nem quais colunas tem"*; FBSP *"herda os erros de cada SSP"*.

## O que não consegui verificar, e por quê (Execução 2) — literal

**Falhas com o erro exato (do `method_notes`, além das 3 que estão como linha de fonte):**
- `ssp.sp.gov.br`: 3 falhas (`/estatistica/dados-mensais`, `/estatistica/consultas`, `/estatistica/spvida`) — SPA client-side. *"Crime em SP não sai por HTTP simples."*
- `ssp.sp.gov.br/assets/download/Dados_Abertos.pdf`: `read ECONNRESET`.
- `infosiga.sp.gov.br`: erro de certificado TLS.
- `seguranca.pr.gov.br/CAPE/Estatisticas`: **HTTP 403**.
- `dados.df.gov.br/group/seguranca`: **HTTP 404**.
- `dados.gov.br/dataset/boletins-da-conjuntura-criminal-do-estado-de-pernambuco`: **HTTP 401**.
- `sds.pe.gov.br/noticias/11225-…`: **HTTP 404**.
- `dados.recife.pe.gov.br/dataset/?tags=seguranca`: **HTTP 500** (a home do portal abriu normalmente).
- `dados.gov.br` do SINESP: só o shell da SPA.
- `supesp.ce.gov.br/dados-cvli/` e `sspds.ce.gov.br/estatisticas-2/`: ambos 301 para `ce.gov.br`. *"Segui o primeiro; o segundo NÃO segui, portanto o conteúdo da página de estatísticas da SSPDS-CE ficou não verificado."*

**Limites honestos declarados:** último mês das bases do ISP-RJ; formato exato das planilhas de PE e BA; se o token do Fogo Cruzado é obrigatório; não clicou no "Baixar Excel" do FBSP; *"Não abri nenhum XLS/XLSX individual de RS, DF, PE ou BA — só os índices. Esquema de colunas desconhecido nos quatro."*
Registro adicional do agente: *"Ferramentas Gmail/Calendar/Drive exigem OAuth e não foram usadas (irrelevantes para a tarefa)."*

## Síntese (Execução 2)

Rio de Janeiro em primeiro por ser o único caso onde o dado bruto foi baixado e lido. Belo Horizonte em segundo por pipeline (CSV + API + metadado fresco de 29/07/2026). Recife em terceiro pela pilha completa estado+ONG+prefeitura. DF como atalho para granularidade intraurbana. SP dividido: primeiro lugar em mobilidade (Infosiga), último em acesso a dado criminal. CE e GO descartados com evidência; PR não avaliado.

---

# Divergências entre as execuções (não resolvidas por quem transcreveu)

| Ponto | Execução 1 (31/07/2026, `a34dfb…`) | Execução 2 (01/08/2026, `a54148…`) |
|---|---|---|
| **Último mês da base do ISP-RJ** | *"Inspecionei o final do primeiro arquivo no disco e confirmei que a última linha é de 2026m06 (Volta Redonda, junho de 2026) — essa é a evidência mais forte de todo o levantamento"* | *"o leitor só processou o início do arquivo, então NÃO confirmei qual é o último mês disponível — confirmei apenas que a série começa em 2014"* |
| **Ceará / Fortaleza** | **Recomendado** como "melhor do Nordeste em profundidade histórica": 13 XLSX 2009-2025 `[fetch-ok]` em `ce.gov.br/sspds/estatisticas/dados-detalhados/` | **Descartado com evidência:** abriu `ce.gov.br/supesp/dados-cvli/` e *"NÃO havia CSV nem XLSX — só um guia em PowerPoint"*. URL diferente da que a Execução 1 abriu |
| **Paraná / Curitiba** | Incluído como **candidato-ALERTA** com 3 fontes (403 + aviso eleitoral + CECONSEG) | **Excluído deliberadamente** da lista: *"não tenho base para recomendar nem para descartar"* |
| **Goiás** | Não avaliado | **Descartado com evidência** (PDF apenas, seções em manutenção) |
| **`dados.mj.gov.br`** | `[fetch-falhou]` — DNS não resolve (ENOTFOUND) | Não testado nesta execução |
| **SSP-RS site institucional** | `www.ssp.rs.gov.br/estatisticas` → `[fetch-falhou]`, sem conteúdo. *"A página útil (/indicadores-criminais) apareceu em busca mas não foi aberta"* | `www.ssp.rs.gov.br/indicadores-criminais` → `[fetch-ok]`, XLSX/XLS 2002-2026, *"atualizado em julho de 2026"* |
| **FBSP Anuário 2025** | `[nao-testado]` — *"NÃO ABRI esta URL"* | `[fetch-ok]` — confirma botão "Baixar Excel" e MVI municipal >100 mil hab |
| **Sou da Paz "Onde Mora a Impunidade"** | `[nao-testado]`, citada como **8ª edição** (URL `…8aedicao`) | `[fetch-ok]`, afirma que **a 7ª edição é a atual**, com dados de 2022 |
| **Rede de Observatórios** | `[nao-testado]` | `[fetch-ok]` (duas vezes, em PE e no bloco nacional) |
| **Nº de documentos da SSP-DF** | Não quantificado; 33 RAs nomeadas | *"cerca de 754 documentos"*, com nomes de arquivo exemplificados |
| **`dadosabertos.rj.gov.br` (divisão territorial em CKAN)** | Não usado; geo veio de `ispdados.rj.gov.br/Conteudo.html` (`.rar`) | `[fetch-ok]` em `dadosabertos.rj.gov.br/dataset/isp-divisao-territorial` — 13 recursos, KML, CKAN com API |

---

# Nota de transcrição

- Ambas as execuções tratam segurança como **eixo estadual**. Nenhuma encontrou dado criminal municipal próprio; a Execução 2 registra explicitamente: *"NÃO há dataset de crime no portal municipal — crime é estadual, como esperado."* O único `(b) MUNICIPAL PRÓPRIO` que aparece é trânsito/multas da CTTU no portal do Recife.
- Nenhum marcador foi alterado. Onde o agente escreveu `nao-testado` ou `fetch-falhou`, está assim aqui.
- As contagens são por LINHA DA TABELA de fontes. Onde o agente declarou números diferentes no `method_notes`, os dois estão registrados.
