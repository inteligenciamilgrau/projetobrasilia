# auditoria:cidades-sombra — Niterói, Caxias do Sul e Toledo

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `auditoria:cidades-sombra`
**Escopo:** auditoria imediata pedida pelo dossiê para as candidatas-sombra de porte ótimo: Niterói/RJ e Caxias do Sul/RS, com Toledo/PR como teste técnico de API.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Niterói/RJ | urbanismo/geo | HUB SIGeo | `https://www.sigeo.niteroi.rj.gov.br/` | SPA | — | — | `[fetch-ok]` a página abre, mas devolve apenas o título "HUB SIGeo"; catálogo carrega via JavaScript e não é auditável por fetch |
| Niterói/RJ | multidomínio | ArcGIS Hub legado (dados-geoniteroi) | `https://dados-geoniteroi.opendata.arcgis.com/` | — | — | — | `[fetch-falhou]` **HTTP 404**; o hub legado que o dossiê registrou como "sem conteúdo avaliável" agora está formalmente morto |
| Caxias do Sul/RS | multidomínio | Feed DCAT-US do hub Dados Abertos Caxias | `https://dadosabertos.caxias.rs.gov.br/api/feed/dcat-us/1.1.json` | catálogo DCAT legível por máquina | varia por conjunto | itens modificados até 26/06/2026 | `[fetch-ok]` **44 datasets**; formatos CSV, GeoJSON, Shapefile/ZIP, KML e GeoServices REST |
| Caxias do Sul/RS | demografia/território | Painel de População por Bairros (IBGE 2022) | `https://dadosabertos.caxias.rs.gov.br/` | painel + distribuições no hub | bairro | base censitária 2022 | `[fetch-ok]` listado no feed DCAT aberto nesta sessão |
| Toledo/PR | multidomínio | Especificação OpenAPI da API pública | `https://www.toledo.pr.gov.br/api-publica/docs/api-docs.json` | OpenAPI 3.0 (JSON) | por registro/consulta | spec v0.1 | `[fetch-ok]` 9 endpoints: licitação, liquidação, contratos, receita, diárias, salários por cargo, servidores por sexo, funções gratificadas e **saúde** (exames, vacinas, procedimentos, consultas) |
| Toledo/PR | finanças (teste real) | `GET /api/v1/licitacao?page=1` | `https://www.toledo.pr.gov.br/api-publica/api/v1/licitacao?page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 sem corpo; endpoint exige parâmetros de data |
| Toledo/PR | saúde (teste real) | `GET /api/v1/saude?page=1` | `https://www.toledo.pr.gov.br/api-publica/api/v1/saude?page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 sem corpo; endpoint exige parâmetros de data |
| Toledo/PR | finanças (reteste com datas) | `GET /api/v1/licitacao` com `datainicio`/`datafim` ISO e dd/MM/yyyy | `https://www.toledo.pr.gov.br/api-publica/api/v1/licitacao?datainicio=2026-01-01&datafim=2026-06-30&page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 nos dois formatos de data, sem corpo de erro explicando a validação |
| Toledo/PR | saúde (reteste com datas) | `GET /api/v1/saude` com `datainicio`/`datafim` | `https://www.toledo.pr.gov.br/api-publica/api/v1/saude?datainicio=2026-01-01&datafim=2026-01-31&page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400; o recurso real segue não comprovado, como já ocorrera no levantamento anterior |
| Niterói/RJ | multidomínio | Portal dados.niteroi (legado) | `https://dados.niteroi.rj.gov.br/` | — | — | — | `[fetch-falhou]` **ECONNREFUSED** — mesma falha registrada no levantamento anterior, agora reconfirmada |
| Niterói/RJ | multidomínio (indicadores) | ObservaNit — Indicadores | `https://observa.niteroi.rj.gov.br/indicadores/` | painel com botões **"Exportar dados CSV"** e "Download Fichas PDF" | município; filtros por bloco temático, eixo, ODS e instrumento de planejamento | não visível no HTML estático | `[fetch-ok]` a interface declara exportação CSV; os valores carregam dinamicamente ("Carregando…"); gestão da SEPLAG |
| Niterói/RJ | saúde | Dados Abertos da SMS + TabNit + painéis | `https://saude.niteroi.rj.gov.br/dados-abertos/` | TabNit exporta **CSV, Excel e TabWin**; painéis Power BI | **bairro e região de saúde** | dados vitais, COVID, imunização, arboviroses, obesidade | `[fetch-ok]` página enumera TabNit (`saladesituacao.niteroi.rj.gov.br/pages/tabnit`) e painéis temáticos |

| Niterói/RJ | saúde (ferramenta) | TabNit — Sala de Situação | `https://www.saladesituacao.niteroi.rj.gov.br/pages/tabnit` | aplicação dinâmica | bairro/região (declarado pela SMS) | — | `[fetch-ok]` a página abre, mas o HTML traz apenas o título "TABNIT"; a tabulação roda via JavaScript |

## Achados

1. **Niterói melhorou desde o último levantamento — e a evidência agora tem endereço.** O hub legado `dados-geoniteroi` morreu de vez (HTTP 404) e `dados.niteroi` segue recusando conexão, mas o ecossistema vivo está em `observa.niteroi.rj.gov.br` (indicadores com botão **"Exportar dados CSV"** e fichas em PDF, filtros por tema/eixo/ODS) e na Sala de Situação da SMS, cujo **TabNit declara exportação em CSV, Excel e TabWin com recorte por bairro e região de saúde** (dados vitais, COVID, arboviroses, imunização). A contradição registrada no dossiê sobre "exportação real" se resolve parcialmente a favor da cidade — resta comprovar o download com navegador.
2. **Caxias do Sul confirma o perfil previsto: excelente acesso técnico, forte concentração geoespacial.** O feed DCAT-US é legível por máquina e lista 44 datasets (CSV, GeoJSON, Shapefile, KML, GeoServices REST), com atualizações até 26/06/2026 — mas os temas são cartografia, lotes, bairros, uso do solo e painéis derivados (população por bairro, calor de dengue); educação aparece como equipamentos da **rede estadual**.
3. **Toledo continua promessa documentada, não capacidade comprovada.** A especificação OpenAPI 3.0 está viva e descreve 9 endpoints (licitação, liquidação, contratos, receita, RH e saúde por exames/vacinas/procedimentos/consultas), mas as chamadas reais devolveram **HTTP 400 sem corpo** em três variações de parâmetros (sem datas, ISO e dd/MM/yyyy). A documentação não traz exemplos de chamada.

## Correções (o que eu mesmo derrubei)

—

## Fraquezas e riscos

- **Niterói:** ObservaNit e TabNit são aplicações dinâmicas — nenhum valor de indicador foi lido por fetch; os painéis Power BI não provam download além do TabNit; a cobertura fora de saúde/planejamento (finanças, mobilidade, segurança) não foi auditada nesta sessão.
- **Caxias do Sul:** nenhum conjunto tabular de finanças, segurança ou mobilidade apareceu no feed; o risco é aprovar a cidade pelo acesso e descobrir vazio temático na ingestão.
- **Toledo:** API sem mensagem de validação nem exemplos; pode estar abandonada ou exigir formato não documentado — custo de descoberta imprevisível.

## O que não consegui verificar, e por quê

- **Download real de um CSV do ObservaNit/TabNit:** exige interação JavaScript, fora do alcance do fetch estático desta sessão.
- **Formato correto dos parâmetros da API de Toledo:** o HTTP 400 vem sem corpo e a spec não traz exemplos.
- **Catálogo completo do HUB SIGeo de Niterói:** SPA sem conteúdo estático.

## Síntese

Das três candidatas-sombra, **Niterói é a que mais subiu**: ganhou evidência nova de exportação declarada (CSV nos indicadores; CSV/Excel/TabWin na saúde, por bairro) e merece a auditoria interativa prioritária que o dossiê já pedia — se o download se confirmar, disputa com Belém a vaga de diversidade. **Caxias do Sul** entrega o melhor acesso técnico do trio (DCAT aberto), mas segue candidata a piloto *geo*, não multidomínio. **Toledo** não passou no teste que importava: o endpoint real continua sem responder, e sem exemplos oficiais o custo de integração é loteria.
