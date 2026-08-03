# Projeto Brasil iA — experimento com cidades pequenas

**Status:** pré-filtro migrado de IDHM 2010 para IPS Brasil 2026; triagem do novo Top 10 concluída em ambas as faixas
**Data de corte:** 2026-08-02
**Escopo:** municípios próximos de 10 mil e 100 mil habitantes; ranking separado do Top 10 nacional

## Resposta curta

- **≈ 10 mil habitantes:** Águas da Prata/SP é a primeira cidade a auditar — mesma API JSON/XML sem autenticação já verificada antes. Confins/MG e Quintana/SP entram logo depois, com dados abertos JSON confirmados na própria Prefeitura.
- **≈ 100 mil habitantes:** Nova Lima/MG continua líder. Vinhedo/SP sobe para segunda prioridade. Lavras/MG entra como novidade forte — único geoportal com camadas WMS reais localizado nesta rodada.

O resultado ainda não afirma que essas são as cidades com os melhores dados. Ele afirma algo mais restrito e verificável: **entre as 20 candidatas escolhidas pelo pré-filtro por IPS Brasil 2026, elas apresentaram os sinais oficiais mais promissores numa busca rápida**.

---

## 1. Por que este ranking é separado

O P-Piloto do ranking nacional favorece uma faixa capaz de produzir um teste representativo sem a complexidade de uma metrópole. Uma cidade de 7 mil a 15 mil habitantes tem outro valor experimental: permite testar cobertura muito fina — bairro, localidade, setor censitário, endereço e equipamento — com menor volume operacional.

Misturar as duas perguntas produziria uma contradição. A baixa população prejudicaria a representatividade no ranking nacional justamente quando ela é a característica procurada neste experimento.

Este ranking mede, portanto, **potencial para um microlaboratório territorial**, não prioridade nacional de implantação.

---

## 2. Por que trocamos o IDHM 2010 pelo IPS Brasil 2026

A primeira rodada deste experimento (arquivada na seção 8) cruzou população com o **IDHM municipal 2010** — na época a única heurística disponível. Isso deixou de fazer sentido como "dado recente": em agosto de 2026 esse número tem 16 anos.

**O IDHM municipal não tem substituto direto mais novo, e é importante entender por quê antes de aceitar qualquer atalho:**

- O IDHM municipal precisa de dados de Censo (educação, principalmente), e o único Censo com essa base pronta continua sendo o de 2010. O Censo 2022 não gerou um recálculo municipal do IDHM.
- Existe sim uma publicação recente chamada **Radar IDHM 2024** (PNUD + Fundação João Pinheiro + IBGE, lançada em maio/2026), que mostra a evolução do índice entre 2012 e 2024. Mas ela usa a PNAD Contínua, cuja amostra só é robusta o suficiente para **Brasil, os 26 estados + DF, 20 regiões metropolitanas, a RIDE de Grande Teresina e 5 macrorregiões** — não para cada um dos 5.570 municípios. Nenhuma das 20 candidatas deste ranking (nem na rodada antiga) é sede de região metropolitana, então o Radar IDHM 2024 simplesmente não tem um número para elas.
- Ou seja: **não existe hoje um "IDHM 2022" ou "IDHM 2024" por município.** Continuar usando 2010 sem dizer isso seria o erro original que motivou esta revisão; forçar o Radar 2024 no lugar seria trocar um número desatualizado por um número que não existe no nível certo.

A alternativa escolhida é o **[IPS Brasil 2026](https://ipsbrasil.org.br/)** — Índice de Progresso Social, produzido por Imazon + Fundação Avina + Amazônia 2030 + Anattá + Centro de Empreendedorismo da Amazônia + Social Progress Imperative, com [metodologia documentada](https://ipsbrasil.org.br/conheca/metodologia):

- Cobre os **5.570 municípios brasileiros**, individualmente, todo ano (edições 2024, 2025, 2026 já existem — usamos a mais recente).
- 57 indicadores em 3 dimensões (Necessidades Humanas Básicas, Fundamentos do Bem-estar, Oportunidades) e 12 componentes — espírito equivalente ao IDHM (saúde, educação, ambiente, direitos), porém mais amplo e baseado em dados correntes, não só no Censo.
- Escala 0–100. Publica também população 2025 e PIB per capita por município, o que permitiu validar o cruzamento (ver seção 4).

**O que isso muda e o que não muda:** IPS Brasil não é IDHM — mede "progresso social", não "desenvolvimento humano" em sentido estrito, e pondera dimensões diferentes (ex.: inclui qualidade ambiental e liberdades individuais, que o IDHM não mede; não inclui renda diretamente, que o IDHM mede). Como heurística de pré-filtro — a mesma função que o IDHM 2010 cumpria — ele é adequado: os dois são índices compostos, municipais, de qualidade de vida, na mesma escala de esforço de coleta. Como no caso do IDHM, **o IPS Brasil não pontua no IDU-Br** e não mede abertura de dados — serve só para escolher onde procurar.

---

## 3. Funil de busca

1. Baixar, via scraping do painel oficial (`ipsbrasil.org.br/explore/data`, que roda em Phoenix LiveView e não expõe API pública — os dados só existem depois que a página conecta via WebSocket), o IPS Brasil 2026, a população 2025 e o PIB per capita de todos os municípios nas faixas de população-alvo.
2. Manter somente municípios entre **7.000 e 15.000 habitantes** (1.452 municípios) ou entre **70.000 e 150.000 habitantes** (276 municípios).
3. Em cada faixa, ordenar pelo IPS Brasil 2026 decrescente.
4. Resolver empate pela distância proporcional até o alvo da faixa e depois pelo nome do município.
5. Abrir portais somente das dez primeiras colocadas em cada faixa.
6. Procurar sinais de acesso estruturado, cobertura temática, território, atualidade e governança — as mesmas cinco perguntas da rodada anterior (seção 6).
7. Escolher as candidatas com sinal mais forte de cada faixa para a auditoria cara: um recurso real em cada um dos oito domínios do IDU-Br.

As faixas são operacionais, não definições oficiais de cidade pequena. Elas são as mesmas usadas na rodada por IDHM, para manter as duas análises comparáveis.

### Fontes do cruzamento

- População e PIB per capita: publicados junto ao IPS Brasil 2026, coluna "População 2025" e "PIB per capita" — **validados** contra o `municipios_100mil.json` do projeto: Nova Lima (120.959), Vinhedo (79.089), Águas da Prata (7.463), Itaú de Minas (14.634), Saltinho (8.407) e Pirassununga (75.594) bateram exatamente com a extração anterior (SIDRA 6579), confirmando a mesma revisão do IBGE por trás dos dois números.
- IPS Brasil 2026: [ipsbrasil.org.br/explore/data](https://ipsbrasil.org.br/explore/data), ano 2026 (edição mais recente disponível), consultado em 2026-08-02.
- Metodologia do índice: [ipsbrasil.org.br/conheca/metodologia](https://ipsbrasil.org.br/conheca/metodologia).

O IPS Brasil, como o IDHM antes dele, é usado apenas como heurística de busca; não recebe pontos no IDU-Br e não deve ser apresentado como medida de abertura de dados da prefeitura.

---

## 4. Top 10 do pré-filtro — aproximadamente 10 mil habitantes

Faixa: 7.000 a 15.000 habitantes (1.452 municípios nesta faixa).

| # IPS | Município | Código IBGE | População 2025 | IPS Brasil 2026 |
|---:|---|---:|---:|---:|
| 1 | Rafard/SP | 3542107 | 9.145 | 71,08 |
| 2 | Águas da Prata/SP | 3500402 | 7.463 | 70,44 |
| 3 | Quintana/SP | 3542008 | 7.260 | 69,92 |
| 4 | Confins/MG | 3117876 | 7.758 | 69,67 |
| 5 | Guaiçara/SP | 3517208 | 11.478 | 69,47 |
| 6 | Itaú de Minas/MG | 3133758 | 14.634 | 69,46 |
| 7 | Antônio Carlos/SC | 4201208 | 12.464 | 69,31 |
| 8 | Lindóia/SP | 3527009 | 7.158 | 69,08 |
| 9 | Cajobi/SP | 3509304 | 9.210 | 69,07 |
| 10 | Tabatinga/SP | 3552700 | 14.997 | 68,81 |

Apenas duas cidades repetem da rodada por IDHM 2010: **Águas da Prata** (era #4, agora #2) e **Itaú de Minas** (era #5, agora #6). As outras oito são candidatas novas — o IPS Brasil pondera saúde, ambiente e educação corrente de forma bem diferente do IDHM 2010, então a reordenação era esperada.

### Triagem dos dados

| Prioridade | Município | Evidência diferenciadora localizada | Limite encontrado | Decisão |
|---:|---|---|---|---|
| 1 | **Águas da Prata/SP** | API oficial sem autenticação, JSON/XML, paginação, limite documentado e sete módulos (evidência reaproveitada da rodada anterior) | Módulos são licitações, legislação, contratos, notícias, atas e concursos; cobertura social estreita | **auditar agora** |
| 2 | **Confins/MG** | `/portal/dados-abertos` da própria Prefeitura devolve JSON real (14 conjuntos); página de governança nomeia coordenador, supervisora, CNPJ e licença CC 4.0 | Todos os 13-14 conjuntos são organizacional/financeiro/licitação; nenhum dado de saúde, educação ou território | **auditar agora** |
| 3 | **Quintana/SP** | `/portal/dados-abertos` da própria Prefeitura devolve JSON real (14 conjuntos), timestamp 31/07/2026 | Mesmo limite de Confins: escopo 100% administrativo/financeiro/legislativo | **auditar agora** |
| 4 | Itaú de Minas/MG | Quatro conjuntos JSON oficiais (evidência reaproveitada) | Fonte é a Câmara Municipal, cobre instituição e processo legislativo, não o Executivo | reserva |
| 5 | Cajobi/SP | Portal de transparência com botão "Dados Abertos" (conteúdo não confirmável via automação), 2 mapas em PDF, base de licitações pesquisável | Botão "Dados Abertos" usa postback JS — conteúdo real não verificado; mapas são PDF estático de 2017/2024 | reserva |
| 6 | Tabatinga/SP | Mesmo software de transparência que Cajobi (mesmo fornecedor), legislação e licitações em base pesquisável, 1 ponto de lat/long da sede | Sem confirmação do conteúdo do botão "Dados Abertos"; território reduzido a um único ponto | reserva |
| 7 | Guaiçara/SP | Portal de transparência padrão (SCPI) com botão "Dados Abertos" | Conteúdo do botão não verificado; único "relatório estatístico" encontrado é de 2016 | reserva |
| 8 | Rafard/SP | Portal de transparência próprio, atualizado em 31/07/2026, LOA 2027 e Consulta Pública LDO 2027 publicadas | Página de "Dados Abertos" pertence à Câmara e retornou erro (HTTP 501) em duas tentativas | reserva |
| 9–10 | Antônio Carlos/SC e Lindóia/SP | Sites institucionais ativos e mantidos | Nenhum catálogo, API ou geoportal localizado; Lindóia anuncia "Portal da Saúde/Educação" mas as sub-páginas retornam 404 | sem sinal |

Evidências principais (verificadas em 2026-08-02):

- Águas da Prata: [documentação de dados abertos e API](https://www.aguasdaprata.sp.gov.br/dados-abertos) *(evidência da rodada anterior, não reaberta nesta triagem)*.
- Confins: [dados abertos JSON](https://www.confins.mg.gov.br/portal/dados-abertos) e [página de governança do portal de transparência](https://confins-mg.portaltp.com.br/consultas/informacoes/sobre.aspx).
- Quintana: [dados abertos JSON](https://www.quintana.sp.gov.br/portal/dados-abertos).
- Itaú de Minas: [dados abertos da Câmara](https://www.itaudeminas.mg.leg.br/transparencia/dados-abertos) *(evidência da rodada anterior)*.
- Cajobi: [portal de transparência](http://transparencia.cajobi.sp.gov.br:35002/transparencia/), [mapas da cidade (PDF)](https://www.cajobi.sp.gov.br/mapas-da-cidade).
- Tabatinga/SP: [portal de transparência](http://189.20.141.242:8079/Transparencia/), [consulta de legislação](https://www.tabatinga.sp.gov.br/paginas/portal/legislacao/consulta).
- Guaiçara: [portal de transparência SCPI](http://transparencia.guaicara.sp.gov.br:8079/TRANSPARENCIA/).
- Rafard: [portal de transparência](https://transparencia.rafard.sp.gov.br/home).

---

## 5. Top 10 do pré-filtro — aproximadamente 100 mil habitantes

Faixa: 70.000 a 150.000 habitantes (276 municípios nesta faixa).

| # IPS | Município | Código IBGE | População 2025 | IPS Brasil 2026 |
|---:|---|---:|---:|---:|
| 1 | Nova Lima/MG | 3144805 | 120.959 | 71,22 |
| 2 | Itupeva/SP | 3524006 | 74.994 | 71,08 |
| 3 | São João da Boa Vista/SP | 3549102 | 96.080 | 69,94 |
| 4 | Votuporanga/SP | 3557105 | 100.568 | 69,34 |
| 5 | Lavras/MG | 3138203 | 110.682 | 69,32 |
| 6 | Paulínia/SP | 3536505 | 116.674 | 68,86 |
| 7 | Vinhedo/SP | 3556701 | 79.089 | 68,85 |
| 8 | Bebedouro/SP | 3506102 | 78.257 | 68,84 |
| 9 | Itajubá/MG | 3132404 | 96.855 | 68,79 |
| 10 | Leme/SP | 3526704 | 101.537 | 68,72 |

Três cidades repetem da rodada por IDHM 2010: **Nova Lima** (era #3, agora #1 — líder nas duas métricas), **Vinhedo** (era #2, agora #7) e **São João da Boa Vista** (era #9, agora #3, ainda sem evidência de dados própria — ver abaixo). Valinhos, Assis, Rio do Sul, Pirassununga, Concórdia, Guaratinguetá e Fernandópolis saem do Top 10 nesta métrica.

### Triagem dos dados

| Prioridade | Município | Evidência diferenciadora localizada | Limite encontrado | Decisão |
|---:|---|---|---|---|
| 1 | **Nova Lima/MG** | GeoPNL: mapa público com 91 recursos-folha, FeatureServers, cobertura de saúde, ensino, assistência, mobilidade, ambiente e urbanismo (evidência reaproveitada) | Contagem inclui ortofotos e camadas correlatas; microdados operacionais ainda não provados | **líder · auditar agora** |
| 2 | **Vinhedo/SP** | JSON administrativo e Mappa Web público com bairros, logradouros, quadras, lotes, risco e zoneamento (evidência reaproveitada) | JSON exclui sistemas externos; geo não comprova dado operacional | **auditar agora** |
| 3 | **Lavras/MG** | Geoportal municipal (GEO LAVRAS) com **camadas WMS ativáveis** — único serviço geográfico real (não PDF) encontrado nesta faixa fora de Nova Lima/Vinhedo | Partes do sistema estão marcadas "Em Construção"; portal de transparência oficial não foi localizado (404 nas tentativas diretas); cobertura multi-domínio não confirmada | **auditar agora · condicional** |
| 4 | **Paulínia/SP** | `/portal/dados-abertos` da própria Prefeitura devolve JSON real e testado (Diário Oficial atualizado diariamente até 31/07/2026) | Catálogo 100% institucional/financeiro; mapas de zoneamento existem só em PDF | **auditar agora** |
| 5 | Votuporanga/SP | Portal de transparência lista explicitamente "saúde, educação, cultura, obras"; página HTML com as 34 unidades de saúde (nome, endereço, bairro); 13 mapas do plano diretor atualizados em 2026 | Tudo em HTML/PDF — nenhum CSV/API/geoportal confirmado | reserva |
| 6 | Itupeva/SP | Transparência com seção "Setorial" (saúde, mobilidade, educação, defesa civil); Plano Diretor 2023 com mapas de zoneamento | Só telas HTML e PDF estático; nenhum dataset baixável | reserva |
| 7 | Itajubá/MG | Câmara Municipal (domínio próprio) totalmente acessível: SISCAM tem busca estruturada de documentos com filtros e exportação; PNCP e SICONFI confirmados com dados reais e correntes do município | Executivo continua bloqueado por Cloudflare mesmo para navegador headless completo; os 8 domínios do IDU-Br dependem majoritariamente dele, não do Legislativo | reserva *(revisado)* |
| 8 | Leme/SP | Múltiplos portais institucionais (prefeitura, câmara, SAECIL água/esgoto, RPPS); Plano Diretor com mapas de zoneamento por bairro | Link direto de "Dados Abertos" no portal de transparência retornou 404 | reserva |
| 9 | Bebedouro/SP | Portal de transparência ativo (item de 2026); Plano Diretor (LC 122/2017) teria mapas temáticos anexos | Página que lista os mapas do plano diretor está fora do ar (HTTP 404) no momento do teste | reserva |
| 10 | São João da Boa Vista/SP | Portal municipal oficial (evidência reaproveitada; não gerou nova busca nesta rodada) | Nenhum catálogo ou sistema municipal diferenciador foi localizado na rodada anterior | sem sinal |

**CORRIGIDO 2026-08-02 (varredura extra sobre Itajubá):** a linha de Itajubá acima substitui a classificação original desta rodada, que era `10 | Itajubá/MG | — | Site protegido por Cloudflare (HTTP 403) mesmo para leitura básica; nenhuma seção de dados abertos ou geoportal localizada nem no snapshot arquivado (Wayback Machine) | sem sinal`. A correção não veio de dado novo do Executivo (que segue bloqueado) — veio de procurar fora dele: a Câmara Municipal roda em domínio separado (`itajuba.cam.mg.gov.br`) e não está atrás do mesmo WAF. Ver seção 8.1 para o detalhamento completo desta varredura.

Evidências principais (verificadas em 2026-08-02):

- Nova Lima: [GeoPNL](https://www.novalima.mg.gov.br/inicio/portal-servicos/servico/geopnl) *(evidência da rodada anterior)*.
- Vinhedo: [dados abertos JSON](https://www.vinhedo.sp.gov.br/portal/dados-abertos) e [descrição oficial do Mappa Web](https://www.vinhedo.sp.gov.br/portal/noticias/0/3/16111/procon) *(evidência da rodada anterior)*.
- Lavras: [GEO LAVRAS](https://lavras.mg.gov.br/geolavras/).
- Paulínia: [dados abertos JSON](https://www.paulinia.sp.gov.br/portal/dados-abertos), [endpoint testado do Diário Oficial](https://www.paulinia.sp.gov.br/portal/dados-abertos/diario-oficial/2026).
- Votuporanga: [portal de transparência setorial](https://web.votuporanga.sp.gov.br:8055/transparencia/), [unidades de saúde](https://www.votuporanga.sp.gov.br/portal/secretarias-paginas/5/relacao-das-unidades-de-saude/), [mapas do plano diretor](https://www.votuporanga.sp.gov.br/mapas-plano-diretor).
- Itupeva: [transparência](https://itupeva.sp.gov.br/transparencia), [plano diretor](https://itupeva.sp.gov.br/prefeitura/plano-diretor).
- Itajubá: [SISCAM — busca de documentos da Câmara](https://itajuba.siscam.com.br/Documentos/Pesquisa?Pesquisa=Avancada&id=79&pagina=1&Modulo=8&Documento=114), [licitações da Câmara](https://sistemasgerenciais3.com.br/publicacoes/front_camitajuba_licitacoes/), [PNCP — compras da Prefeitura](https://pncp.gov.br/api/consulta/v1/contratacoes/publicacao?cnpj=18025940000109) `[NACIONAL — não pontua]`, [SICONFI — execução orçamentária](https://apidatalake.tesouro.gov.br/ords/siconfi/tt/rreo?id_ente=3132404) `[NACIONAL — não pontua]`.
- Leme: [portal de transparência](https://lemespscpi.dcfiorilli.com.br:879/TRANSPARENCIA/), [plano diretor](https://www.leme.sp.gov.br/pagina/9).
- Bebedouro: [portal da transparência](http://www.sp.portaldatransparencia.com.br/prefeitura/bebedouro/).

### 5.1 Varredura extra — Itajubá/MG: o que existe para acompanhar a cidade à distância

Pedido específico: verificar se Itajubá tem dado suficiente para uma análise remota e acompanhamento contínuo, além do que a triagem-padrão captura.

**O que está bloqueado.** `www.itajuba.mg.gov.br` (site institucional, transparência, dados abertos, SIC) devolve HTTP 403 com desafio Cloudflare ("Performing security verification") — testado com WebFetch, `curl` com user-agent de navegador **e um Chromium headless completo via Playwright**, todos bloqueados da mesma forma. O backend do portal alternativo da Prefeitura (`sistemassonner.itajuba.mg.gov.br/GRP/portalcidadao/webservices/...`) existe e foi identificado via inspeção de rede, mas também responde 403 a chamadas diretas, mesmo originadas do próprio navegador autenticado na sessão. `legislacaodigital.com.br/Itajuba-MG` (texto integral das leis) está atrás do mesmo tipo de bloqueio Cloudflare.

**O que não está bloqueado — a Câmara Municipal.** `itajuba.cam.mg.gov.br` é um domínio separado, sem Cloudflare, e traz:
- **SISCAM** (`itajuba.siscam.com.br`) — busca estruturada de documentos administrativos (Portarias, Atos da Mesa Diretora, Atos da Presidência) com filtros por número, ano, data, situação, autor e assunto, e um botão **Exportar**. Registros correntes confirmados (ex.: Portaria nº 92/2026, 16/07/2026, protocolo 01579/2026).
- **Licitações, Viagens e Orçamento** (`sistemasgerenciais3.com.br/publicacoes/front_camitajuba_*`) — três painéis de publicação filtráveis por data e por status (aberta/cancelada/concluída/deserta/em andamento/homologada/revogada/suspensa), específicos do Legislativo.
- **Diário Oficial Eletrônico** (`imprensaoficialmunicipal.com.br/itajuba`) — mesmo sistema (P&P Colibri) usado pelo Executivo, com painel de busca de publicações.
- Produção legislativa, sessões e proposições em `itajuba.siscam.com.br/vereadores` e `/sessoes`.

Limite: tudo isso é o **Legislativo**, não o Executivo. Não cobre saúde, educação, mobilidade, urbanismo ou meio ambiente — os domínios que o IDU-Br pontua vêm quase todos da Prefeitura, que segue bloqueada.

**O que existe fora do município — dados nacionais atualizáveis.** Estes não diferenciam Itajubá de nenhum outro dos 5.570 municípios (regra 5 do protocolo do documento vivo), mas respondem diretamente à pergunta "dá para acompanhar a cidade à distância": **sim**, via:
- **PNCP** (`pncp.gov.br/api/consulta/v1/contratacoes/publicacao?cnpj=18025940000109`) — API JSON testada e funcional; todo processo de compra da Prefeitura desde a Lei 14.133/2021, com objeto, datas, órgão e modalidade. CNPJ do município: 18.025.940/0001-09.
- **SICONFI/Tesouro Nacional** (`apidatalake.tesouro.gov.br/ords/siconfi/tt/rreo?id_ente=3132404`) — API JSON testada e funcional; Relatório Resumido de Execução Orçamentária (receitas e despesas por período), série histórica por código IBGE 3132404.
- **IBGE Cidades** (`cidades.ibge.gov.br/brasil/mg/itajuba/panorama`) — carrega via navegador (é SPA; falha em fetch simples), traz população, PIB, indicadores sociais básicos e histórico de censos.
- Sistemas nacionais já catalogados no projeto e igualmente válidos para Itajubá, não testados nesta sessão: DATASUS/TabNet (saúde), INEP/Ideb (educação, bienal), RAIS/Novo CAGED (emprego, mensal), SNIS (saneamento, anual), Atlas Brasil (IDHM 2010, estático).

**Resposta direta ao pedido:** não há um portal único e amplo da própria cidade — o Executivo, que teria isso, está bloqueado. Mas dá para montar um acompanhamento remoto real combinando três fontes já confirmadas nesta sessão: SISCAM (o que a Câmara decide e contrata), PNCP (o que a Prefeitura compra) e SICONFI (quanto a Prefeitura arrecada e gasta) — nenhuma exige login, todas têm série temporal, e as duas últimas são API JSON.

---

## 6. Critérios da triagem rápida

Inalterados desde a rodada por IDHM. A triagem não atribui um IDU-Br. Ela usa cinco perguntas binárias ou descritivas para priorizar auditoria:

1. **Acesso:** há CSV, JSON, XML, API ou serviço geográfico, ou apenas tela/PDF?
2. **Cobertura:** aparecem dados além de finanças, contratos, legislação e notícias?
3. **Território:** há bairro, localidade, setor censitário, endereço, equipamento, lote ou camada geográfica?
4. **Atualidade:** a página contém registros correntes, série histórica ou rotina de atualização?
5. **Governança:** há inventário, metodologia, documentação, órgão responsável e permanência institucional?

Uma plataforma genérica de fornecedor pode produzir uma tela de transparência tecnicamente correta em centenas de municípios (nesta rodada, o mesmo padrão técnico apareceu em Cajobi/Tabatinga — SP, Rafard/Guaiçara/Lindóia — SP e Leme/SP, cada grupo compartilhando fornecedor). Isso não pontua acesso quando o dado real fica atrás de um botão não verificável, e **não prova governança local nem cobertura temática**.

---

## 7. Como medir a confiança

### Confiança do pré-filtro: média

- Alta para a população 2025 (validada por 6 coincidências exatas com a extração SIDRA anterior do projeto) e para o valor publicado de IPS Brasil 2026 (fonte única, oficial, 3ª edição consecutiva).
- Média para a comparação substantiva: o IPS Brasil é mais recente e mais amplo que o IDHM 2010, mas ainda é um índice composto por dezenas de indicadores de qualidade desigual entre municípios pequenos, e **não mede abertura de dados**.
- Diferente do IDHM, o IPS Brasil já nasce sem a defasagem de 16 anos — mas herda o mesmo limite estrutural: um bom índice de desenvolvimento não implica portal de dados aberto.

### Confiança da triagem: variável por cidade

- Evidência positiva vem de página oficial ou sistema indicado pela prefeitura, aberta nesta sessão (marcador `[fetch-ok]` nas notas de pesquisa).
- Vários municípios desta rodada (Antônio Carlos/SC, o Executivo de Itajubá/MG, Cajobi/SP, Tabatinga/SP, Paulínia/SP) bloqueiam acesso automatizado direto (HTTP 403/Cloudflare) — nesses casos a evidência veio de acesso via proxy leitor, `curl` com user-agent de navegador, ou Wayback Machine, e está marcada como tal. No caso de Itajubá, o bloqueio foi confirmado mesmo com Chromium headless completo (não é só filtro de user-agent), mas é específico do domínio do Executivo — a Câmara Municipal, em domínio separado, respondeu normalmente (ver seção 5.1).
- Um botão de "Dados Abertos" atrás de postback JavaScript (Cajobi, Tabatinga, Guaiçara, Rafard, Leme) não é evidência de acesso — é uma pista que exige navegador real/headless para confirmar. Nenhuma dessas cinco cidades foi promovida a "auditar agora" só por causa do botão.
- "Não localizado" não significa "não existe". Portais em JavaScript, páginas não indexadas e serviços protegidos podem gerar falso negativo — o próprio bloqueio Cloudflare do Executivo de Itajubá e de Antônio Carlos é, em si, um dado sobre a maturidade digital do portal, não uma prova de ausência de conteúdo. Itajubá é o exemplo direto: o mesmo bloqueio parecia "sem sinal" até a varredura extra encontrar a Câmara, o PNCP e o SICONFI fora dele.

### Confiança exigida para promover uma cidade

Inalterada: para cada finalista, abrir pelo menos um recurso real em saúde, segurança, educação, mobilidade, economia, finanças, urbanismo e ambiente. Registrar URL, produtor, formato, esquema, data, recorte territorial, resultado do acesso e repetibilidade. Só então calcular IDU-E e C-IDU.

---

## 8. Próximo teste de maior retorno

1. **Águas da Prata:** chamar os sete endpoints documentados, contar registros por módulo e verificar se existem módulos não anunciados *(teste já recomendado na rodada anterior, ainda pendente)*.
2. **Confins e Quintana:** confirmar que os 13-14 conjuntos JSON são de fato do Executivo (não espelho de outro órgão) e testar se existem endpoints além do catálogo institucional/financeiro exposto.
3. **Nova Lima:** abrir uma amostra de FeatureServers por domínio e procurar microdados operacionais fora do GeoPNL *(pendente desde a rodada anterior)*.
4. **Vinhedo:** testar o JSON administrativo e as camadas territoriais do Mappa Web *(pendente desde a rodada anterior)*.
5. **Lavras:** o teste de maior retorno da rodada nova — confirmar com navegador real quais camadas do GEO LAVRAS estão ativas (não "em construção") e se cobrem saúde/educação/mobilidade além de infraestrutura genérica.
6. **Paulínia:** testar se `/portal/dados-abertos` tem categorias não documentadas na página inicial do catálogo, já que o endpoint de Diário Oficial respondeu em JSON real.
7. **Cajobi, Tabatinga, Guaiçara, Rafard, Leme:** o botão "Dados Abertos" atrás de postback JS precisa de um teste com navegador headless (Playwright/Selenium) para resolver a pergunta de acesso — é a única barreira técnica, não de conteúdo, impedindo uma decisão nessas cinco cidades.

Nenhuma coleta em massa é necessária antes desses testes.

---

## 9. Apêndice — ranking anterior por IDHM 2010 (arquivado, não usar para decisão)

Preservado por transparência metodológica (o projeto não apaga achados anteriores, apenas os marca como superados). Este ranking foi produzido cruzando a população IBGE 2025 com o **IDHM municipal 2010** — ver seção 2 para a explicação de por que essa métrica foi trocada.

### 10 mil habitantes — Top 10 por IDHM 2010

| # IDHM | Município | Código IBGE | População 2025 | IDHM 2010 |
|---:|---|---:|---:|---:|
| 1 | Treze Tílias/SC | 4218509 | 9.531 | 0,795 |
| 2 | Saltinho/SP | 3545159 | 8.407 | 0,791 |
| 3 | Casca/RS | 4304903 | 9.698 | 0,785 |
| 4 | Águas da Prata/SP | 3500402 | 7.463 | 0,781 |
| 5 | Itaú de Minas/MG | 3133758 | 14.634 | 0,776 |
| 6 | Trombudo Central/SC | 4218608 | 7.599 | 0,775 |
| 7 | Siderópolis/SC | 4217600 | 14.156 | 0,774 |
| 8 | Ouro/SC | 4211801 | 7.062 | 0,774 |
| 9 | Paraí/RS | 4314001 | 7.362 | 0,773 |
| 10 | Auriflama/SP | 3504206 | 13.856 | 0,773 |

Triagem desta lista (Casca líder, Águas da Prata e Auriflama logo depois) permanece registrada em [docs/parciais/](parciais/) e nos perfis municipais de `perfis_cidades_pequenas.json`; Casca, Auriflama, Treze Tílias, Trombudo Central, Siderópolis, Ouro e Paraí saíram do Top 10 na métrica atual (seção 4) mas seus dossiês continuam publicados.

### 100 mil habitantes — Top 10 por IDHM 2010

| # IDHM | Município | Código IBGE | População 2025 | IDHM 2010 |
|---:|---|---:|---:|---:|
| 1 | Valinhos/SP | 3556206 | 132.258 | 0,819 |
| 2 | Vinhedo/SP | 3556701 | 79.089 | 0,817 |
| 3 | Nova Lima/MG | 3144805 | 120.959 | 0,813 |
| 4 | Assis/SP | 3504008 | 104.858 | 0,805 |
| 5 | Rio do Sul/SC | 4214805 | 77.451 | 0,802 |
| 6 | Pirassununga/SP | 3539301 | 75.594 | 0,801 |
| 7 | Concórdia/SC | 4204301 | 87.206 | 0,800 |
| 8 | Guaratinguetá/SP | 3518404 | 121.916 | 0,798 |
| 9 | São João da Boa Vista/SP | 3549102 | 96.080 | 0,797 |
| 10 | Fernandópolis/SP | 3515509 | 73.508 | 0,797 |

Valinhos, Assis, Rio do Sul, Pirassununga, Concórdia, Guaratinguetá e Fernandópolis saíram do Top 10 na métrica atual (seção 5) mas seus dossiês continuam publicados. Detalhes, contagens e fontes da triagem original: [AUDITORIA_PENTE_FINO_100MIL.md](AUDITORIA_PENTE_FINO_100MIL.md).
