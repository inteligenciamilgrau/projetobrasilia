# auditoria:lacunas-top10 — reteste dos itens `parcial` e `lacuna` do inventário

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `auditoria:lacunas-top10`
**Escopo:** retestar os pontos fracos registrados no inventário do Top 10: segurança de Belo Horizonte (incluindo camada estadual SEJUSP-MG), educação e InfoSaúde do DF, saúde e finanças de Belém, transporte URBS de Curitiba, GPS SPPO do Rio e estabilidade da API do Recife.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Belo Horizonte/MG | segurança | Reteste da busca "seguranca" no CKAN da PBH | `https://dados.pbh.gov.br/api/3/action/package_search?q=seguranca&rows=5` | API CKAN | — | consulta 2026-08-01 | `[fetch-ok]` count=9, todos de **segurança alimentar**; a lacuna de dado criminal municipal está reconfirmada |
| Belo Horizonte/MG | segurança (camada E) | **Crimes Violentos — SEJUSP no portal estadual** | `https://dados.mg.gov.br/dataset/crimes-violentos` | **CSV por ano (2019–2026) + datapackage.json** | **município** e RISP, por natureza e mês | mensal; atualizado em 29/07/2026; série desde 2012 (REDS) | `[fetch-ok]` preenche a camada estadual da lacuna de BH; **sem licença declarada** |
| Brasília/DF | educação | Reteste do CKAN da SEEDF | `https://data.se.df.gov.br/api/3/action/package_search?rows=0` | API CKAN | — | consulta 2026-08-01 | `[fetch-ok]` `success=true` e **count=0**; o vazio silencioso persiste |
| Brasília/DF | saúde | InfoSaúde-DF — dados abertos | `https://info.saude.df.gov.br/transparencia-e-prestacao-de-contas/dados-abertos/` | painéis (APS, vigilância, produção, atendimentos) | UBS, hospital, região | rodapé com **texto-modelo "Atualizado em mês de ano"** | `[fetch-ok]` taxonomia rica (estoque de medicamentos, SAMU, SRAG, dengue), mas **nenhum link de download visível** |
| Belém/PA | saúde | Belém em Números — Saúde | `https://numeros.belem.pa.gov.br/saude/` | página navegacional | não detalhada | única data visível: nota metodológica de 25/01/2023 | `[fetch-ok]` cinco categorias, mas **sem arquivo-fonte** na página central — diferente da página de mobilidade |
| Belém/PA | finanças | Portal da Transparência — origem dos dados | `https://portaltransparencia.belem.pa.gov.br/dados-da-gestao/origem-dos-dados/` | sistema GIIGnet (5 módulos) | — | não especificada | `[fetch-ok]` **nenhuma menção a exportação CSV/XLS ou API**; acesso automatizável segue não comprovado |
| Rio de Janeiro/RJ | mobilidade | GPS SPPO — reteste | `https://dados.mobilidade.rio/gps/sppo` | API JSON | veículo | tempo real | `[fetch-ok]` **o endpoint está vivo**: a resposta excedeu 10 MB e estourou o limite do cliente desta sessão — a falha histórica não se reproduziu; ingestão exigirá paginação/janelas |
| Recife/PE | saúde (estabilidade) | Reteste `package_search?q=saude` | `https://dados.recife.pe.gov.br/api/3/action/package_search?q=saude&rows=1` | API CKAN | — | consulta 2026-08-01 | `[fetch-ok]` HTTP 200, `success=true`, **count=73**; o histórico de HTTP 500 não se reproduziu nesta sessão |
| Curitiba/PR | mobilidade | Transporte Coletivo URBS — reteste | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=ca40f13b-ef61-472b-810f-dd705f85fd2e` | WebService (GTFS, linhas, pontos, posição dos veículos) + botão de download + RSYNC histórico | veículo, linha, ponto | metadado 26/11/2024; frequência declarada "tempo real" | `[fetch-ok]` a página **não documenta exigência de credencial** ("qualquer pessoa física ou jurídica pode ter acesso"), mas tampouco a descarta; sem dicionário de dados |

## Achados

1. **Recife: a API voltou a responder com estabilidade** (HTTP 200, 73 conjuntos de saúde). O histórico de 500 registrado no dossiê não se reproduziu — a recomendação de medir a taxa de sucesso por 7 dias continua válida, mas o sinal de hoje é positivo.
2. **Rio: o GPS SPPO está operante e volumoso** — a resposta ultrapassou 10 MB e excedeu o limite do cliente. A anotação de falha do inventário deve ser atualizada: o problema atual não é disponibilidade, é volume (ingestão precisará de janelas/streaming).
3. **A lacuna criminal de BH tem solução estadual pronta:** o conjunto "Crimes Violentos" da SEJUSP no `dados.mg.gov.br` traz CSV anuais de 2019–2026 (série desde 2012), por município, natureza e mês, atualização mensal (29/07/2026). Ressalva material: **"Nenhuma Licença Fornecida"**.
4. **DF educação: o zero é reprodutível** — `count=0` com `success=true` em 2026-08-01. Não é instabilidade; é catálogo vazio.
5. **InfoSaúde-DF continua painel sem download** — taxonomia excelente (estoque de medicamentos, SAMU, SRAG), zero link de arquivo e rodapé com data-modelo não preenchida, um indício objetivo de imaturidade do processo de publicação.
6. **Belém: saúde e finanças seguem sem exportação comprovada.** A página de saúde não replica o padrão de arquivos-fonte da página de mobilidade; a transparência documenta o GIIGnet, mas sem CSV/API.
7. **Curitiba/URBS: a credencial permanece indeterminada por documentação** — há botão de download e RSYNC públicos, mas o web-service não declara requisitos nem dicionário.

## Correções (o que eu mesmo derrubei)

—

## Fraquezas e riscos

- Testes de estabilidade de hoje (Recife, SPPO) são **pontuais**: um fetch bem-sucedido não substitui a janela de observação de 7 dias pedida no dossiê.
- A ausência de licença no conjunto da SEJUSP-MG cria risco jurídico de reuso — precisa constar em qualquer matriz que use essa fonte para BH.
- Painéis ricos sem download (InfoSaúde-DF) podem inflar percepção de abertura; para a métrica, `U` continua baixo.

## O que não consegui verificar, e por quê

- **Amostra real do SPPO**: o corpo excede o limite de 10 MB do cliente desta sessão; o esquema (ordem, linha, lat/long, datahora) ficou por confirmar.
- **Requisito de credencial do web-service URBS**: a página não documenta; só um teste de chamada autenticada/anônima decide.
- **Arquivos-fonte nas subpáginas de saúde de Belém**: as subcategorias não foram navegadas nesta sessão.

## Síntese

Das lacunas retestadas: **duas viraram forças** (API do Recife estável hoje; SPPO vivo e volumoso), **uma ganhou solução externa documentada** (segurança de BH pela SEJUSP-MG estadual, mensal, por município — sem licença declarada) e **quatro persistem** (educação DF em zero reprodutível; InfoSaúde-DF sem download; Belém sem exportação em saúde/finanças; URBS com credencial indeterminada). Sugestão ao compilador: atualizar as anotações do inventário nesses termos, mantendo os status `lacuna` de DF-educação e Belém e trocando a nota do SPPO de "falha" para "volume".
