# setor:saude — tarefa setorial de SAÚDE (dado municipal próprio além do mínimo nacional)

**Status:** concluído (duas execuções transcritas)
**Última atualização:** 2026-08-01
**Agente:** `setor:saude`
**Transcrição:** este arquivo NÃO é pesquisa nova. É transcrição literal de um registro local de execução, não versionado. Nenhuma busca ou abertura de página foi executada por quem transcreveu. Nenhum status de verificação foi promovido.

**Origem no journal:**

| Execução | referência interna | Linha do journal | Data declarada pelo agente |
|---|---|---|---|
| Execução 1 | `execucao-1` | 11 | 31/07/2026 |
| Execução 2 | `execucao-2` | 38 | 01/08/2026 |

Duas execuções rodaram a MESMA tarefa (mesma chave de workflow `chave-interna-omitida`). As duas estão transcritas na íntegra e separadamente. Onde divergem, a divergência está registrada na seção **Divergências entre as execuções** — nenhuma foi resolvida por quem transcreveu.

## Legenda da camada (a)/(b) — o coração do projeto

| Marcador | Significado |
|---|---|
| `(b) MUNICIPAL PRÓPRIO` | Dado que só existe porque o município produz. Isto pontua. |
| `[NACIONAL — não pontua]` | Recorte local de base federal (DATASUS/TABNET/SIH/SIA/SINASC/SIM/SINAN/CNES) disponível para os 5.570 municípios. Não diferencia candidata. |
| `(a)+(b) MISTO` | O conjunto/portal mistura os dois. A coluna diz qual parte é qual. |

Os dois agentes aplicaram essa separação explicitamente. Execução 1: *"Descartei como (a) — disponível para qualquer município via Ministério da Saúde e portanto SEM valor diferencial — tudo que é recorte local de DATASUS: SINAN, SINASC, SIM, SIA, SIH/AIH, CNES."* Execução 2: *"Só o (b) contou para o ranking. Toda vez que um portal municipal republicava SINAN/SIM/SINASC/CNES/SIA/AIH eu marquei como réplica nacional e desvalorizei."*

---

# EXECUÇÃO 1 — referência interna `execucao-1` (31/07/2026)

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada (a)/(b) | Status |
|---|---|---|---|---|---|---|---|---|
| Curitiba/PR | saúde | Sistema E-Saúde: Perfil de atendimento Médico nas UMS | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e | csv/xlsx | registro individual | declarada Mensal; log mostra quase diária; arquivo de 06/07/2026 | `(b) MUNICIPAL PRÓPRIO` — sistema próprio E-Saúde; agente: *"Isso não existe no DATASUS: o SIA/SIH agrega por competência e não expõe atendimento de APS por unidade"* | `[fetch-ok]` |
| Curitiba/PR | saúde | Sistema E-Saúde: Perfil de atendimento de Enfermagem | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=c7a68728-b197-45ed-82ad-e370072edaf8 | csv/xlsx | registro individual | declarada Mensal; arquivo de 06/07/2026 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Curitiba/PR | saúde | Sistema Saúde Já (acessos/agendamentos/agendas) | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=476294a4-e9e3-4eb0-a8b0-c774280c9932 | csv/xlsx | registro individual | declarada Mensal; log com várias atualizações ao dia; arquivos de 06/07/2026 | `(b) MUNICIPAL PRÓPRIO` — app municipal de agendamento; absenteísmo | `[fetch-ok]` |
| Curitiba/PR | saúde | Página de grupo/busca (tentativa de inventário) | www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1 | portal-dados-abertos | desconhecido | desconhecido | n/a (tentativa de inventário) | `[fetch-falhou]` — HTTP 403 Forbidden |
| Porto Alegre/RS | saúde | Dados Abertos — grupo Saúde (inventário) | dadosabertos.poa.br/dataset?groups=saude | portal-dados-abertos | município | varia por conjunto | `(a)+(b) MISTO` — 5 conjuntos: SINAN, SINASC, SIM são `[NACIONAL — não pontua]`; GERCON e GERINT são `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Porto Alegre/RS | saúde | GERCON — Gerenciamento de Consultas (2017-2026) | dadosabertos.poa.br/dataset/gercon-gerenciamento-de-consultas | csv/xlsx | registro individual | última atualização 01/04/2026 02:12 BRT | `(b) MUNICIPAL PRÓPRIO` — sistema próprio de regulação | `[fetch-ok]` |
| Porto Alegre/RS | saúde | GERINT — Gerenciamento de Internações | dadosabertos.poa.br/dataset/gerint-gerenciamento-de-internacoes | csv/xlsx | registro individual | atualização 01/04/2026; criado 30/09/2019 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Porto Alegre/RS | saúde | API CKAN `group_show` | dadosabertos.poa.br/api/3/action/group_show?id=saude&include_datasets=true | api | município | n/a | n/a (teste de acesso programático) — confirma `package_count = 5` | `[fetch-ok]` |
| Porto Alegre/RS | saúde | Transparência da SMS (filas de consultas e exames) | prefeitura.poa.br/sms/transparencia | pdf/relatório | desconhecido | mensal; histórico visível até março/2025; automação a partir de maio/2025 | `(b) MUNICIPAL PRÓPRIO` mas **inutilizável como dado** — só PDF e JPG, nenhum CSV/XLSX | `[fetch-ok]` |
| Porto Alegre/RS | saúde | Notícia oficial SMS: dashboard de ocupação hospitalar (base GERINT) | prefeitura.poa.br/sms/noticias/capital-lanca-novo-dashboard-para-acompanhar-ocupacao-hospitalar-e-emergencias-do-sus | painel/dashboard | equipamento/unidade | oito vezes ao dia | `(b) MUNICIPAL PRÓPRIO` (evidência é a notícia, não o painel) | `[fetch-ok]` |
| Porto Alegre/RS | saúde | Embed Power BI do painel de ocupação hospitalar | app.powerbi.com/view?r=eyJrIjoiMzQ2Y2VhN2Yt… | painel/dashboard | equipamento/unidade | oito vezes ao dia (conforme notícia) | `(b) MUNICIPAL PRÓPRIO` alegado | `[nao-testado]` — *"NÃO abri este painel nesta sessão"* |
| Recife/PE | saúde | Portal de Dados Abertos — grupo Saúde (65 conjuntos) | dados.recife.pe.gov.br/group/saude | portal-dados-abertos | equipamento/unidade | não informado na página de grupo | `(a)+(b) MISTO` — `(b)`: estoque de medicamentos, SAMU, arboviroses, licenciamento sanitário, cadastros georreferenciados; vacinação Covid | `[fetch-ok]` |
| Recife/PE | saúde | API CKAN `group_show` | dados.recife.pe.gov.br/api/3/action/group_show?id=saude&include_datasets=true | api | desconhecido | n/a | n/a | `[fetch-falhou]` — HTTP 500 |
| Recife/PE | saúde | API CKAN `package_search` | dados.recife.pe.gov.br/api/3/action/package_search?q=estoque+medicamentos&rows=3 | api | desconhecido | n/a | n/a | `[fetch-falhou]` — HTTP 500 |
| Fortaleza/CE | saúde | API CKAN `group_show` do grupo Saúde | dados.fortaleza.ce.gov.br/api/3/action/group_show?id=saude&include_datasets=true | api | equipamento/unidade | n/a | n/a — confirma `package_count = 35` | `[fetch-ok]` |
| Fortaleza/CE | saúde | Portal de Dados Abertos — grupo Saúde (inventário HTML) | dados.fortaleza.ce.gov.br/group/saude | portal-dados-abertos | equipamento/unidade | varia; ver red flags | `(a)+(b) MISTO` — `(b)`: UAPS, vacinas por UAPS, ESF, saúde bucal, equipamentos; `[NACIONAL — não pontua]`: recortes de CNES, SIA e AIH | `[fetch-ok]` |
| Fortaleza/CE | saúde | Indicadores de Produção das UAPS 2023 | dados.fortaleza.ce.gov.br/dataset/indicadores_producao_uaps_2023 | csv/xlsx | equipamento/unidade | última atualização 15/07/2024; criado 30/01/2024 | `(b) MUNICIPAL PRÓPRIO` — produção por unidade de APS | `[fetch-ok]` |
| Fortaleza/CE | saúde | "Dados Epidemiológicos" (na prática nascidos vivos e óbitos) | dados.fortaleza.ce.gov.br/dataset/epidemiologia | csv/xlsx | município | Última Atualização: julho 17, 2024, 18:16 UTC | `[NACIONAL — não pontua]` — fonte declarada SINASC e SIM; agente: *"Não confunda o rótulo com vigilância epidemiológica local"* | `[fetch-ok]` |
| Brasília/DF | saúde | SES-DF — Portal Infosaúde (home, inventário de painéis) | info.saude.df.gov.br/ | painel/dashboard | equipamento/unidade | não declarado na home | `(b) MUNICIPAL PRÓPRIO` (DF acumula função estadual e municipal) | `[fetch-ok]` |
| Brasília/DF | saúde | SES-DF — Conjunto de Dados Abertos da Saúde no DF | info.saude.df.gov.br/transparencia-e-prestacao-de-contas/dados-abertos/ | desconhecido | desconhecido | não especificado na página | `(a)+(b) MISTO` — `(b)`: e-SUS APS (procedimentos, vacinas, visitas domiciliares, atividade coletiva), estoque de medicamentos; vigilância e produção derivam de sistemas nacionais | `[fetch-ok]` |
| Brasília/DF | saúde | Painel Infosaúde: Leitos Hospitalares / Lista de Espera / Leitos UTI | info.saude.df.gov.br/sala-de-situacao/painel-infosaude-leitos-hospitalares-lista-espera-leitos-uti/ | painel/dashboard | desconhecido | desconhecido | `(b) MUNICIPAL PRÓPRIO` alegado | `[fetch-falhou]` — página abriu mas painel não renderizou conteúdo |
| Brasília/DF | saúde | GDF — Portal de Dados Abertos, grupo Saúde | www.dados.df.gov.br/group/084faa49-712a-448d-84a5-2f96cce6be4c | portal-dados-abertos | desconhecido | desconhecido | n/a | `[fetch-falhou]` — HTTP 404; variantes também falharam |
| Rio de Janeiro/RJ | saúde | SMS Rio — Transparência do SUS carioca (página índice) | saude.prefeitura.rio/transparencia-do-sus-carioca/ | painel/dashboard | equipamento/unidade | não declarado | `(b) MUNICIPAL PRÓPRIO` — fila cirúrgica e SISREG; agente registra ausência de CSV/XLSX/API | `[fetch-ok]` |
| Rio de Janeiro/RJ | saúde | Portal da Transparência das Filas de Cirurgias Eletivas | web2.smsrio.org/subgeral/#/prestador/transparencia/portalTransparenciaFilas | painel/dashboard | desconhecido | desconhecido | `(b) MUNICIPAL PRÓPRIO` alegado | `[fetch-falhou]` — retornou apenas a palavra "Subgeral" |
| Rio de Janeiro/RJ | urbanismo/geo | DATA.RIO — geoserviço Unidades de Saúde Municipais (ArcGIS) | datariov2-pcrj.hub.arcgis.com/datasets/d213d40853f2459f97efc46d8ffa2afa_0/explore | geoserviço | equipamento/unidade | desconhecido | `(b) MUNICIPAL PRÓPRIO` alegado | `[fetch-falhou]` — só o título, sem informação substantiva |
| São Paulo/SP | saúde | Portal de Dados Abertos, grupo Saúde | dados.prefeitura.sp.gov.br/dataset?groups=saude | portal-dados-abertos | município | varia; um conjunto descontinuado em 2014 | `(b)` administrativo apenas (folha de pagamento HSPM/AHMSP, e-SIC, RAG); cadastro de estabelecimentos DESCONTINUADO desde 30/12/2014 | `[fetch-ok]` |
| São Paulo/SP | saúde | SMS São Paulo — TabNet municipal | prefeitura.sp.gov.br/web/saude/tabnet | painel/dashboard | município | "atualizadas periodicamente", sem detalhe | `(a)+(b) MISTO` — `(b)`: "Profissionais da SMSSP" e ISA-Capital; resto são tabulações de bases nacionais `[NACIONAL — não pontua]` | `[fetch-ok]` |
| São Paulo/SP | saúde | SMS São Paulo — Dados epidemiológicos e boletins (.xls/.ods) | prefeitura.sp.gov.br/web/saude/w/vigilancia_em_saude/271007 | csv/xlsx | município | série histórica anual; anos não especificados | `(b) MUNICIPAL PRÓPRIO` (série de agravos de notificação em formato aberto) | `[fetch-ok]` |
| Belo Horizonte/MG | saúde | PBH — Portal de Dados Abertos, grupo Saúde | dados.pbh.gov.br/dataset/?groups=saude | portal-dados-abertos | município | um conjunto limitado a jan-out/2017 | `(b) MUNICIPAL PRÓPRIO` mas quase vazio — 2 conjuntos (Covid-19 e ovitrampa 2017) | `[fetch-ok]` |
| Belo Horizonte/MG | saúde | PBH — Regulação em Saúde (painel de fila) | prefeitura.pbh.gov.br/saude/regulacao-em-saude | painel/dashboard | registro individual | não declarado | `(b)` mas **consulta individual**, não dado aberto | `[fetch-ok]` |
| Goiânia/GO | saúde | Lista de Espera Cirurgia Eletiva | www.goiania.go.gov.br/lista-de-espera-de-regulacao/lista-de-espera-cirurgia-eletiva/ | painel/dashboard | registro individual | não informado | `(b)` mas **consulta individual por CPF/CNS** | `[fetch-ok]` |
| Goiânia/GO | saúde | Acesso aos Dados Abertos (portal municipal) | www.goiania.go.gov.br/sing_transparencia/acesso-aos-dados-abertos/ | portal-dados-abertos | desconhecido | desconhecido | desconhecido | `[nao-testado]` — *"NÃO abri esta página nesta sessão. Não afirme nada sobre seu conteúdo."* |

**Contagem da Execução 1: 32 linhas — 23 `[fetch-ok]`, 7 `[fetch-falhou]`, 2 `[nao-testado]`.**
Declaração do próprio agente (transcrita): *"Fiz 9 buscas WebSearch e 27 chamadas WebFetch."* (o número declarado de fetches é menor que o de linhas da tabela; registro a diferença sem resolvê-la).

## Achados (Execução 1)

- **Ranking que o agente diz sustentar com evidência:** 1º Curitiba (microdado individual de atendimento, atualizado 06/07/2026, mais agendamento e absenteísmo), 2º Porto Alegre (microdado de regulação 2017-2026 atualizado 01/04/2026, mais leitos 8x/dia), 3º Recife (amplitude de 65 conjuntos mas atualidade não confirmada e API caída), 4º Fortaleza (por unidade de APS e API funcionando, mas defasado em ~2 anos), 5º DF (maior potencial, verificação mais fraca).
- *"Se o piloto exigir UM lugar, Curitiba é a escolha defensável; se exigir fila e leito, só Porto Alegre e DF entregam, e apenas Porto Alegre tem microdado baixável."*
- **O que sobrou como (b) genuíno e verificado** (lista literal do agente): microdado de atendimento do sistema próprio E-Saúde de Curitiba; base de agendamento do app Saúde Já de Curitiba; GERCON e GERINT de Porto Alegre; painel de ocupação/emergências de Porto Alegre; estoque de medicamentos por farmácia, SAMU e arboviroses de Recife; produção e vacinas por UAPS de Fortaleza; indicadores Previne Brasil de Fortaleza; "Profissionais da SMSSP" e ISA-Capital em SP; conjunto de painéis do Infosaúde DF.
- **ALERTA TRANSVERSAL PARA O PROJETO (literal):** *"O padrão dominante no Brasil é fila de saúde publicada como CONSULTA INDIVIDUAL por CPF/CNS/número de protocolo, não como dado aberto. Confirmei isso em Belo Horizonte, em Goiânia e no MinhaSaude.Rio. […] O segundo padrão é fila publicada em PDF mensal, como em Porto Alegre — também imprestável como dado. Recomendo que qualquer fonte de fila seja classificada em três níveis: microdado baixável, painel agregado sem download, consulta individual; e que apenas o primeiro conte pontos no critério 2."*

## Correções (o que o próprio agente derrubou) — Execução 1

Transcrição literal: *"ERROS MEUS QUE VALE REGISTRAR, porque mostram o risco de citar URL sem abrir: deduzi 4 URLs por padrão de slug e TODAS as 4 falharam"*

- ~~`dados.fortaleza.ce.gov.br/dataset/indicadores-de-producao-das-uaps-2023`~~ → **404.** O correto usa underscore: `indicadores_producao_uaps_2023`.
- ~~`info.saude.df.gov.br/saude-aberta-df/`~~ → **404.** O correto é `/transparencia-e-prestacao-de-contas/dados-abertos/`.
- ~~slug de estoque de medicamentos de Recife (deduzido)~~ → **404.**
- ~~grupo de saúde do `dados.df.gov.br`~~ → **404.**

*"Nenhuma dessas URLs deduzidas foi mantida como fonte válida."*

## Fraquezas e riscos (Execução 1)

- **Curitiba:** janela móvel de 3 meses nos CSVs principais; arquivos de 480-490 MB sem API de consulta; metadata declara "Mensal" mas o log mostra atualização quase diária; dicionário de dados datado 26/11/2024, mais antigo que a base; página de grupo em HTTP 403 — *"NÃO consegui inventariar o total de datasets de saúde de Curitiba. Não afirme um número total."*
- **Porto Alegre:** só 5 conjuntos no grupo Saúde e 3 deles (SINAN, SINASC, SIM) são `[NACIONAL — não pontua]`; fila de exames e consultas 2021-2025 SOMENTE em PDF e JPG; GERCON é registro de SOLICITAÇÃO, não tempo de espera — *"não prometa 'tempo de fila' a partir dele sem inspecionar o CSV"*; dashboard de leitos é embed Power BI não aberto.
- **Recife:** API CKAN caída (HTTP 500 em dois endpoints); datas de atualização dos 65 conjuntos DESCONHECIDAS; vários conjuntos aparentam histórico congelado (SAMU 2011-2016/2017; vacinação Covid) — *"amplitude alta pode estar mascarando estagnação"*; nenhum dataset individual foi aberto.
- **Fortaleza:** *"ATUALIDADE É O PROBLEMA CENTRAL"* — três datasets abertos com última modificação em julho/2024 (~2 anos de defasagem); produção cobre só jan-out/2023; slug inconsistente; nenhum dado de fila, leito ou regulação.
- **Brasília/DF:** *"VERIFICAÇÃO INCOMPLETA — não promova DF sem novo teste."* Nenhum download CSV do DF confirmado; 4 caminhos no portal central falharam; painel de lista de espera de UTI não renderizou; risco conceitual de comparar ente único com municípios.
- **Rio de Janeiro:** *"PENALIZE FORTEMENTE NO CRITÉRIO 2"* — portais SISREG são SPA; nenhum CSV/XLSX/API para fila; MinhaSaude.Rio é consulta individual autenticada; grupo de saúde do data.rio não inventariado.
- **São Paulo:** grupo saúde do portal municipal com 5 conjuntos, majoritariamente folha de pagamento; um descontinuado desde 2014; TabNet sem exportação nem granularidade sub-municipal confirmada; GeoSampa e Observa Sampa NÃO verificados — *"São Paulo está incompleta e provavelmente subestimada"*.
- **Belo Horizonte:** *"Recomendo NÃO usar BH como piloto de saúde"* — painel de regulação é só consulta individual; grupo saúde com 2 conjuntos, um de 2017.
- **Goiânia:** verificação limitada a uma única URL; *"Goiânia pode merecer reavaliação antes de descarte definitivo"*.

## O que não consegui verificar, e por quê (Execução 1) — literal

1. *"Nenhum candidato da região NORTE foi verificado."* Apareceu portal de Covid-19 de Manaus (`covid19.manaus.am.gov.br/dados-abertos/`) com bases individualizadas e anonimizadas de vacinação, que NÃO foi testado. *"O Norte é um vazio de evidência na minha sessão, não um vazio comprovado de dados."*
2. Não inventariou o total de conjuntos de saúde de Curitiba (HTTP 403).
3. Não inventariou nenhum dataset do portal central do DF (quatro tentativas: 404 ou página sem listagem).
4. API CKAN de Recife retornou HTTP 500 em dois endpoints distintos.
5. Nenhum dataset individual de Recife foi aberto — granularidade e periodicidade dos 65 conjuntos seguem não confirmadas.
6. Nenhum embed Power BI inspecionado (Porto Alegre, DF, BH) nem as SPAs do SISREG do Rio. *"Todo painel deste tipo está marcado fetch-falhou ou não-testado, nunca fetch-ok."*
7. Não verificou GeoSampa nem Observa Sampa.
8. Não abriu o portal de dados abertos de Goiânia.

## Síntese (Execução 1)

Curitiba é a única cidade onde o agente comprovou microdado individual de atendimento de sistema municipal próprio, com agendamento e absenteísmo — os itens do briefing que quase nenhuma cidade publica. Porto Alegre é a única com microdado de regulação baixável em série longa. Recife tem a maior amplitude e a pior prova de atualidade. Fortaleza tem granularidade por UAPS e API viva, mas ~2 anos de defasagem. DF concentra exatamente o que falta nas outras (leito, fila de UTI, cirurgia eletiva) e é o candidato de menor prova.

---

# EXECUÇÃO 2 — referência interna `execucao-2` (01/08/2026)

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Camada (a)/(b) | Status |
|---|---|---|---|---|---|---|---|---|
| Curitiba/PR | saúde | Sistema e-Saúde — atendimento Médico nas UMS | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e | csv/xlsx | registro individual | mensal (espectro: últimos 3 meses); arquivo 06/07/2026 08:00:00 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Curitiba/PR | saúde | Sistema e-Saúde — atendimento de Enfermagem | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=c7a68728-b197-45ed-82ad-e370072edaf8 | csv/xlsx | registro individual | mensal (últimos 3 meses); 06/07/2026 08:00:00 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Curitiba/PR | saúde | **Filas Públicas de Saúde — Transparência Curitiba** | www.transparencia.curitiba.pr.gov.br/conteudo/FilasPublicas.aspx | painel/dashboard | equipamento/unidade + procedimento | **semanal por obrigação legal**; última atualização exibida 01/08/2026 02:49 | `(b) MUNICIPAL PRÓPRIO` — Lei Estadual 21.242/2022 + Lei Municipal 16.292/2024; export Excel/Word/CSV/TXT visível | `[fetch-ok]` |
| Curitiba/PR | saúde | Saúde Já — agendamento na atenção primária | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=476294a4-e9e3-4eb0-a8b0-c774280c9932 | csv/xlsx | registro individual | mensal (últimos 3 meses); 06/07/2026 08:01 | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Curitiba/PR | urbanismo/geo | Unidades de Atendimento de Curitiba — Ativas (inclui rede de saúde, com coordenadas) | dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=680ed5ed-c8b7-4e81-a2af-637d2757027a | csv/xlsx | equipamento/unidade | mensal; 31/07/2026 10:19:00 | `(b) MUNICIPAL PRÓPRIO` — SEUC/IPPUC, lat/long SIRGAS | `[fetch-ok]` |
| Curitiba/PR | saúde | Portal de Dados Abertos — busca por grupo Saúde | www.curitiba.pr.gov.br/dadosabertos/busca/?grupo=1 | portal-dados-abertos | desconhecido | desconhecido | n/a | `[fetch-falhou]` — HTTP 403 Forbidden |
| Recife/PE | saúde | **Estoque dos medicamentos nas farmácias da Rede Municipal** | dados.recife.pe.gov.br/dataset/estoque-dos-medicamentos-nas-farmacias-da-rede-municipal-de-saude | csv/xlsx | equipamento/unidade (farmácia por distrito sanitário) | **diária**; última modificação 28/04/2026 07:00 BRT; criado 27/02/2026 | `(b) MUNICIPAL PRÓPRIO` — agente: *"dado operacional próprio que o DATASUS não entrega para nenhuma cidade"* | `[fetch-ok]` |
| Recife/PE | saúde | Organização Secretaria de Saúde (62 conjuntos) | dados.recife.pe.gov.br/organization/secretaria-de-saude | portal-dados-abertos | varia por dataset | varia | `(a)+(b) MISTO` — CSV em 62, JSON em 55, PDF em 8, GeoJSON em 1; licença ODbL | `[fetch-ok]` |
| Recife/PE | saúde | Grupo Saúde (65 datasets) | dados.recife.pe.gov.br/group/saude | portal-dados-abertos | varia por dataset | varia | `(a)+(b) MISTO` | `[fetch-ok]` |
| Recife/PE | saúde | Serviço de Pronto Atendimento (SPA) | dados.recife.pe.gov.br/dataset/servico-de-pronto-atendimento-spa | csv/xlsx | desconhecido (dicionário em JSON separado, CSV não aberto) | **semestral**; última modificação 06/03/2026 11:24 BRT | `(b) MUNICIPAL PRÓPRIO` | `[fetch-ok]` |
| Recife/PE | saúde | Casos de Dengue, Zika e Chikungunya | dados.recife.pe.gov.br/dataset/casos-de-dengue-zika-e-chikungunya | csv/xlsx | desconhecido | desconhecido | `(b) MUNICIPAL PRÓPRIO` alegado (aparece nas listagens) | `[fetch-falhou]` — HTTP 500; *"Slug possivelmente diferente do que testei"* |
| Brasília/DF | saúde | Conjunto de Dados Abertos da Saúde no DF — Portal InfoSaúde | info.saude.df.gov.br/transparencia-e-prestacao-de-contas/dados-abertos/ | painel/dashboard | desconhecido | não informado (placeholder literal "Atualizado em mês de ano") | `(a)+(b) MISTO` — `(b)`: estoque de medicamentos, procedimentos/vacinas/visitas domiciliares/atividade coletiva na APS | `[fetch-ok]` |
| Brasília/DF | saúde | Painel InfoSaúde — Leitos Hospitalares / Lista de Espera / Leitos UTI | info.saude.df.gov.br/sala-de-situacao/painel-infosaude-leitos-hospitalares-lista-espera-leitos-uti/ | painel/dashboard | desconhecido | desconhecido | `(b) MUNICIPAL PRÓPRIO` alegado | `[fetch-falhou]` — só menu de navegação e rodapé |
| Brasília/DF | saúde | Portal de Dados Abertos do DF — filtro por tag Saúde | www.dados.df.gov.br/dataset?tags=Sa%C3%BAde | portal-dados-abertos | desconhecido | desconhecido | n/a | `[fetch-falhou]` — catálogo não enumerou nenhum dataset |
| Rio de Janeiro/RJ | saúde | TABNET Municipal — Saúde-Rio (SMS Rio) | tabnet.rio.rj.gov.br/ | painel/dashboard | município e equipamento/unidade (via tabulação) | não informado na página | `(a)+(b) MISTO` — `[NACIONAL — não pontua]`: SIHD, SIA, SINASC, SIM, SINAN; `(b)`: SIGTAP, SIPNI local, E-SUS-VE, SIVEP e **DISPENSAMED** | `[fetch-ok]` |
| Rio de Janeiro/RJ | saúde | Transparência do SUS carioca | saude.prefeitura.rio/transparencia-do-sus-carioca/ | painel/dashboard | registro individual (posição na fila) e equipamento/unidade | não informado | `(b) MUNICIPAL PRÓPRIO` — feito para consulta individual, não reuso | `[fetch-ok]` |
| Rio de Janeiro/RJ | saúde | Portal de Transparência das Filas de cirurgia eletiva | web2.smsrio.org/subgeral/#/prestador/transparencia/portalTransparenciaFilas | painel/dashboard | desconhecido | desconhecido | `(b)` alegado | `[fetch-falhou]` — só a palavra "Subgeral" |
| Rio de Janeiro/RJ | saúde | DATA.RIO — busca por saúde | www.data.rio/search?q=saude | portal-dados-abertos | desconhecido | desconhecido | n/a | `[fetch-falhou]` — retornou apenas a string "DATA.RIO" |
| Porto Alegre/RS | saúde | GERCON — Gerenciamento de Consultas | dadosabertos.poa.br/dataset/gercon-gerenciamento-de-consultas | csv/xlsx | registro individual (solicitação de consulta) | arquivos anuais; última atualização 01/04/2026 | `(b) MUNICIPAL PRÓPRIO` — série `gercon_solicitacoes_2017.csv` a `_2026.csv` | `[fetch-ok]` |
| Porto Alegre/RS | saúde | Grupo Saúde — Dados Abertos Porto Alegre | dadosabertos.poa.br/group/saude | portal-dados-abertos | varia | varia | `(a)+(b) MISTO` — *"SINAN, SINASC e SIM (sistemas NACIONAIS, portanto não contam como dado municipal extra)"* `[NACIONAL — não pontua]`; GERCON e GERINT `(b)` | `[fetch-ok]` |
| Fortaleza/CE | saúde | Grupo Saúde — Fortaleza Dados Abertos (35 datasets) | dados.fortaleza.ce.gov.br/group/saude | portal-dados-abertos | equipamento/unidade e município | majoritariamente 15/07/2024 (defasado) | `(a)+(b) MISTO` — `(b)`: Lista de Medicamentos (03/10/2025), Vacinas CORES I-VI, UAPS, ESF, Saúde Bucal, Equipamentos Rede SMS, Hospitais; `[NACIONAL — não pontua]`: SINASC/SIM (17/07/2024), CNES, SIA, AIH, Previne Brasil, Cobertura de ESF | `[fetch-ok]` |
| Fortaleza/CE | saúde | Plano de Dados Abertos da SMS Fortaleza (PDF) | dados.fortaleza.ce.gov.br/dataset/e0b75390-…/download/plano-de-dados-abertos_sms-fortaleza.pdf | pdf/relatório | não aplicável (documento de governança) | desconhecido | n/a | `[nao-testado]` — campo evidence vazio |
| Niterói/RJ | saúde | Dados Abertos — SMS Niterói (TabNit e painéis) | saude.niteroi.rj.gov.br/dados-abertos/ | painel/dashboard | distrito/bairro (região de saúde) | não informado na página | `(b) MUNICIPAL PRÓPRIO` — TabNit com export CSV/Excel/TabWin **alegado**, visualização espacial por bairro | `[fetch-ok]` |
| Niterói/RJ | saúde | Painéis — Sala de Situação de Saúde de Niterói | www.saladesituacao.niteroi.rj.gov.br/pages/paineis | painel/dashboard | desconhecido | desconhecido | `(b)` alegado | `[fetch-falhou]` — app JS, retornou só "Paineis" |
| São Paulo/SP | saúde | Dados Abertos — Organização SMS (7 conjuntos) | dados.prefeitura.sp.gov.br/organization/sms | portal-dados-abertos | município / gestão interna | anual e mensal conforme o conjunto | `(b)` mas **administrativo**; único assistencial (Cadastro dos Estabelecimentos de Saúde) DESCONTINUADO em 30/12/2014 | `[fetch-ok]` |
| São Paulo/SP | saúde | TABNET — SMS São Paulo | prefeitura.sp.gov.br/web/saude/w/tabnet/296871 | painel/dashboard | equipamento/unidade (via tabulação) e município | "atualizadas periodicamente" | `(a)+(b) MISTO` — `[NACIONAL — não pontua]`: SIM, SINASC, SIA, SIH, estabelecimentos, imunização etc.; `(b)`: Doenças e Agravos de Notificação Compulsória municipais, profissionais ativos na SMS, **ISA-Capital**. *"A própria página diz que o sistema é 'desenvolvido pelo DATASUS'"* | `[fetch-ok]` |
| São Paulo/SP | saúde | Cirurgias Ofertadas — Atenção Especializada, SMS SP | prefeitura.sp.gov.br/web/saude/w/atencao_especializada/352516 | pdf/relatório | nenhuma (texto institucional) | não informado | n/a — achado negativo confirmado | `[fetch-ok]` |
| Belo Horizonte/MG | saúde | SMSA — Organizações, Portal de Dados Abertos da PBH (6 conjuntos) | dados.pbh.gov.br/organization/smsa | portal-dados-abertos | distrito/bairro e equipamento/unidade | não informado por conjunto | `(b) MUNICIPAL PRÓPRIO` — **Índice de Vulnerabilidade da Saúde** (indicador próprio), Distrito Sanitário, Área de Abrangência, Rede de Assistência; ovitrampa só jan-out/2017 | `[fetch-ok]` |
| Belo Horizonte/MG | saúde | Regulação em Saúde — PBH | prefeitura.pbh.gov.br/saude/regulacao-em-saude | desconhecido | desconhecido | desconhecido | desconhecido | `[nao-testado]` — campo evidence vazio; *"não afirmo que não publica, afirmo que não verifiquei"* |
| Goiânia/GO | saúde | Lista de Espera Cirurgia Eletiva | www.goiania.go.gov.br/lista-de-espera-de-regulacao/lista-de-espera-cirurgia-eletiva/ | painel/dashboard | registro individual (somente autoconsulta) | não informado | `(b)` mas autoconsulta por CPF/CNS | `[fetch-ok]` |
| Santa Catarina (estado) | saúde | Lista de Espera no SUS — Consulta, Dados Abertos SC | dados.sc.gov.br/dataset/listas-de-espera-no-sus/resource/cbcbb577-ba64-4b19-b80f-d61f53a5a19d | painel/dashboard | registro individual (somente autoconsulta) | metadado de última atualização: **13/01/2020** | `[ESTADUAL — não é municipal próprio]`; sem arquivo nem API; *"A documentação não indica quebra por município"* | `[fetch-ok]` |
| Joinville/SC | saúde | Filas — Prefeitura de Joinville | www.joinville.sc.gov.br/assunto/saude/filas/ | painel/dashboard | registro individual (somente autoconsulta) | não informado | `(b)` mas autoconsulta; sem formato, sem data, sem link de download | `[fetch-ok]` |

**Contagem da Execução 2: 32 linhas — 23 `[fetch-ok]`, 7 `[fetch-falhou]`, 2 `[nao-testado]`.**
Declaração do próprio agente (transcrita literalmente): *"fiz 32 chamadas de WebFetch. 25 retornaram conteúdo utilizável (marcadas fetch-ok, cada uma com o trecho concreto no campo evidence). 7 falharam e estão registradas como fetch-falhou […] Deixei 2 fontes como não-testado."* O número que o agente declara (25 ok) não coincide com o número de linhas marcadas `fetch-ok` na tabela dele (23). Registro a divergência sem promover nada.

## Achados (Execução 2)

- **Curitiba, primeiro lugar por larga margem.** Motivo declarado: *"é o único município onde eu comprovei a cadeia inteira (agendamento Saúde Já -> fila com export CSV atualizada semanalmente por lei -> microdado individual de atendimento com CID/CBO/medicamento -> rede georreferenciada), com datas de julho e 01/08/2026, ou seja, dado vivo."*
- **Recife, segundo.** 62 conjuntos CSV/JSON em CKAN e estoque de medicamentos **diário** por distrito sanitário — *"um caso de uso de alto valor imediato para o cidadão"* (responde "tem meu remédio?").
- **Porto Alegre, só como fonte complementar temática** de regulação (GERCON/GERINT em CSV 2017-2026), *"não como piloto de cidade, porque só tem 5 datasets de saúde"*.
- **DF como aposta de maior upside**, condicionada a alguém abrir os painéis em navegador real e confirmar o download CSV de leitos e da lista de espera de UTI.
- **Descartes explícitos:** *"Descartaria FORTALEZA por defasagem de dois anos e SÃO PAULO por ausência de dado assistencial aberto, apesar do tamanho."*
- **Achado negativo transversal (Goiânia / Joinville / Santa Catarina):** as três publicam fila, mas *"no formato CONSULTA INDIVIDUAL POR CPF/CNS, não em dado reutilizável"*. O agente registra isso *"para evitar que o projeto conte essas cidades como cobertura de fila que elas não entregam"*, e conclui: *"por contraste, isso reforça Curitiba (export CSV na fila) e Porto Alegre (GERCON em CSV anual) como os dois únicos casos de fila realmente aberta que encontrei."*
- **Armadilha de rótulo em SP:** a página "Cirurgias Ofertadas" *"apenas lista 13 especialidades cirúrgicas […] NÃO há nenhum arquivo CSV, XLSX ou PDF referenciado ou linkado, nem lista de espera"*.
- **Niterói:** caso de cidade média com TabNet municipal e granularidade por BAIRRO — *"granularidade infra-municipal, que é justamente o que o TABNET nacional não entrega"* — mas com export apenas alegado, não verificado.

## Correções (o que o próprio agente derrubou) — Execução 2

O agente não registrou seção de erros próprios de slug nesta execução. Registrou como limitações: paginação do portal de Recife devolvendo página 1 quando pediu página 2; e divergência interna do portal de Recife (grupo declara 65 datasets, organização declara 62) — *"não consegui reconciliar essa diferença"*.

## Fraquezas e riscos (Execução 2)

- **Curitiba:** CSVs de 480-490 MB exigem pipeline; portal retém só os últimos 3 meses (histórico antigo em repositório da UFPR **NÃO testado**); HTTP 403 na busca por grupo impediu enumerar o catálogo; na página de Filas Públicas o conteúdo visível eram procedimentos de diagnóstico/imagem — *"NÃO confirmei visualmente fila de consultas nem de cirurgias, apesar de a lei cobrir consultas"*; home declarou apenas "32" conjuntos no total, número não reconciliado.
- **Recife:** cadência muito desigual (medicamentos diário, SPA semestral, SAMU em arquivos anuais); dataset de arboviroses em HTTP 500; inventário parcial (~20 dos 62 nomes vistos); 8 datasets só em PDF.
- **Brasília/DF:** *"este é o candidato com pior relação promessa/prova no meu teste"*; painéis são BI embarcado com zero conteúdo recuperado; metadado de atualização com placeholder não preenchido; *"a alegação 'download CSV nos painéis' vem de matéria institucional e de descrição de página, NÃO de mim tendo baixado ou visto o botão"*.
- **Rio de Janeiro:** todos os portais de fila são aplicações JavaScript; TABNET exporta CSV só por tabulação interativa, sem bulk nem API; nenhuma data de atualização vista.
- **Porto Alegre:** *"MUITO desequilibrado — este é o caso clássico que o critério 3 manda penalizar"*; 5 datasets, 3 deles `[NACIONAL — não pontua]`; arquivos anuais com defasagem de meses; dicionário em PDF de 12/2024; CSV não aberto.
- **Fortaleza:** *"PROBLEMA GRAVE DE ATUALIDADE, que por si só desqualifica Fortaleza como piloto"* — maioria em 15/07/2024, ~2 anos de defasagem.
- **São Paulo:** só 7 datasets na SMS, o único assistencial parado há 11 anos; TABNET é o mínimo federal reembalado em boa parte; sem e-SUS APS aberto nem transparência de agendamento.
- **Belo Horizonte:** 6 datasets da SMSA, metade camada geográfica; ovitrampa de 2017 (~9 anos desatualizado); epidemiológico é Covid-19; 5 dos 6 com PDF ao lado do CSV.
- **Niterói:** página de painéis é app JS (só "Paineis" recuperado); nenhuma data de atualização; TabNit não testado; Power BI embarcado tipicamente sem bulk download.

## O que não consegui verificar, e por quê (Execução 2) — literal

- **7 falhas registradas com motivo:** `curitiba.pr.gov.br/dadosabertos/busca/?grupo=1` → HTTP 403; `dados.recife.pe.gov.br/dataset/casos-de-dengue-zika-e-chikungunya` → HTTP 500; `web2.smsrio.org/subgeral/#/…portalTransparenciaFilas` → app JS, só "Subgeral"; `saladesituacao.niteroi.rj.gov.br/pages/paineis` → app JS, só "Paineis"; `www.data.rio/search?q=saude` → ArcGIS Hub (JS), só "DATA.RIO"; `info.saude.df.gov.br/sala-de-situacao/painel-infosaude-leitos…` → BI embarcado, só menu e rodapé; `dados.df.gov.br/dataset?tags=Saude` → catálogo não renderizou nenhum dataset.
- **VIÉS METODOLÓGICO QUE O AUDITOR DEVE CONHECER (literal):** *"WebFetch converte HTML para markdown e não executa JavaScript. Isso penaliza sistematicamente painéis Power BI, Qlik e ArcGIS Hub. Consequência direta: DF, Rio e Niterói provavelmente valem MAIS do que a minha evidência mostra […] e Curitiba, Recife e Porto Alegre se destacam em parte porque publicam em CKAN/HTML com arquivo, que é justamente o formato que eu consigo provar."*
- **O que seria decisivo e não foi confirmado:** (1) se os painéis do InfoSaúde DF têm botão de download CSV — *"isso vem de matéria institucional, não de mim; se tiverem, DF sobe para 2º lugar por ser o único com leito e fila de UTI"*; (2) se a fila pública de Curitiba cobre consultas e cirurgias ou só exames de imagem; (3) catálogo completo de saúde de Curitiba (403) e páginas 2-4 do Recife; (4) se algum portal de fila do Rio tem export.
- **NÃO PESQUISADO por limite de escopo:** Campinas, Florianópolis, Vitória, Salvador, Natal, Manaus, Belém, Uberlândia, São Bernardo, Guarulhos, Osasco, Maringá, Londrina, Caxias do Sul, Blumenau. *"A região NORTE ficou sem nenhum candidato verificado — esse é um vazio real do meu levantamento, não uma conclusão de que o Norte não tem dado."*

## Síntese (Execução 2)

Ordem recomendada: 1) Curitiba (cadeia completa comprovada, dado vivo em 01/08/2026), 2) Recife (volume + estoque diário de medicamentos por distrito), 3) Porto Alegre apenas como fonte temática de regulação, 4) DF como aposta de upside com verificação pendente. Fortaleza descartada por defasagem; São Paulo descartada por ausência de dado assistencial aberto.

---

# Divergências entre as execuções (não resolvidas por quem transcreveu)

| Ponto | Execução 1 (31/07/2026, `af21eb…`) | Execução 2 (01/08/2026, `ac9c30…`) |
|---|---|---|
| **Fila pública de Curitiba** | Não encontrada. *"não encontrei painel de ocupação de leitos nem fila de cirurgia eletiva municipal aberta em Curitiba nesta sessão"* | **Encontrada e `[fetch-ok]`:** `transparencia.curitiba.pr.gov.br/conteudo/FilasPublicas.aspx`, atualização semanal por lei, export CSV visível, última atualização 01/08/2026 02:49 |
| **API CKAN de Recife** | `[fetch-falhou]` HTTP 500 em `group_show` e `package_search` — *"o acesso programático está quebrado hoje"* | Não testou a API; abriu 3 páginas de listagem e 1 dataset com `[fetch-ok]`. Registrou HTTP 500 apenas no dataset de arboviroses |
| **Nº de conjuntos de saúde do Recife** | 65 no grupo Saúde | 65 no grupo **e** 62 na organização — *"não consegui reconciliar essa diferença"* |
| **Painel de leitos de Porto Alegre** | Existe: notícia oficial `[fetch-ok]` + embed Power BI `[nao-testado]`, 8x/dia | Não aparece. Coverage_notes afirma *"não há ocupação de leitos"* em POA |
| **Lista de Medicamentos de Fortaleza** | Aparece no inventário, sem data destacada | Datada: **03/10/2025**, *"o mais recente que vi"* |
| **TABNET municipal do Rio** | Não verificado | `[fetch-ok]` em `tabnet.rio.rj.gov.br/`, com DISPENSAMED, E-SUS-VE, SIPNI e SIVEP locais |
| **Niterói** | Não avaliada | Candidata com TabNit e granularidade por bairro |
| **Goiânia** | Só a página de fila; portal de dados abertos `[nao-testado]` | Agrupada com Joinville e SC como achado negativo transversal |

---

# Nota de transcrição

- Escopo do agente: apenas o setor saúde. Ambas as execuções advertem que não avaliaram os outros domínios do projeto.
- Nenhum marcador foi alterado. Onde o agente escreveu `nao-testado` ou `fetch-falhou`, está assim aqui.
- As contagens desta transcrição são por LINHA DA TABELA de fontes do agente. Onde o próprio agente declarou um número diferente no `method_notes`, os dois números estão registrados.
