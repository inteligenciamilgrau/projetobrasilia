# auditoria:cidades-sombra — Niterói, Caxias do Sul e Toledo

> **Nota de auditoria posterior (2026-08-01): este parcial foi superado em pontos materiais.** A nova validação abriu as APIs dinâmicas que o fetch estático não via: Niterói expõe API JSON, CSV integral e ArcGIS REST multidomínio; Caxias lista atualmente 126 IDs no DCAT, com inclusão de itens externos; Toledo continuou falhando com HTTP 400. Use as correções no [pente-fino consolidado](../AUDITORIA_PENTE_FINO_100MIL.md) e no dossiê principal; preserve este arquivo apenas como trilha do que a primeira passada conseguiu observar.

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `auditoria:cidades-sombra`
**Escopo:** auditoria imediata pedida pelo dossiê para as candidatas-sombra de porte ótimo: Niterói/RJ e Caxias do Sul/RS, com Toledo/PR como teste técnico de API.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Niterói/RJ | urbanismo/geo | HUB SIGeo | `https://www.sigeo.niteroi.rj.gov.br/` | SPA | — | — | `[fetch-ok]` a página abre, mas devolve apenas o título "HUB SIGeo"; catálogo carrega via JavaScript e não é auditável por fetch |
| Niterói/RJ | multidomínio | ArcGIS Hub legado (dados-geoniteroi) | `https://dados-geoniteroi.opendata.arcgis.com/` | — | — | — | `[fetch-falhou]` **HTTP 404**; o hub legado que o dossiê registrou como "sem conteúdo avaliável" agora está formalmente morto |
| Caxias do Sul/RS | multidomínio | Feed DCAT-US do hub Dados Abertos Caxias | `https://dadosabertos.caxias.rs.gov.br/api/feed/dcat-us/1.1.json` | catálogo DCAT legível por máquina | varia por conjunto | snapshot 2026-08-01 | `[fetch-ok]` **126 IDs/125 títulos únicos**; inclui item externo e publicador `{{source}}`, portanto a contagem bruta não equivale a bases municipais |
| Caxias do Sul/RS | demografia/território | Painel de População por Bairros (IBGE 2022) | `https://dadosabertos.caxias.rs.gov.br/` | painel + distribuições no hub | bairro | base censitária 2022 | `[fetch-ok]` listado no feed DCAT aberto nesta sessão |
| Toledo/PR | multidomínio | Especificação OpenAPI da API pública | `https://www.toledo.pr.gov.br/api-publica/docs/api-docs.json` | OpenAPI 3.0 (JSON) | por registro/consulta | spec v0.1 | `[fetch-ok]` 9 endpoints: licitação, liquidação, contratos, receita, diárias, salários por cargo, servidores por sexo, funções gratificadas e **saúde** (exames, vacinas, procedimentos, consultas) |
| Toledo/PR | finanças (teste real) | `GET /api/v1/licitacao?page=1` | `https://www.toledo.pr.gov.br/api-publica/api/v1/licitacao?page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 sem corpo; endpoint exige parâmetros de data |
| Toledo/PR | saúde (teste real) | `GET /api/v1/saude?page=1` | `https://www.toledo.pr.gov.br/api-publica/api/v1/saude?page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 sem corpo; endpoint exige parâmetros de data |
| Toledo/PR | finanças (reteste com datas) | `GET /api/v1/licitacao` com `datainicio`/`datafim` ISO e dd/MM/yyyy | `https://www.toledo.pr.gov.br/api-publica/api/v1/licitacao?datainicio=2026-01-01&datafim=2026-06-30&page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400 nos dois formatos de data, sem corpo de erro explicando a validação |
| Toledo/PR | saúde (reteste com datas) | `GET /api/v1/saude` com `datainicio`/`datafim` | `https://www.toledo.pr.gov.br/api-publica/api/v1/saude?datainicio=2026-01-01&datafim=2026-01-31&page=1` | API REST | — | — | `[fetch-falhou]` HTTP 400; o recurso real segue não comprovado, como já ocorrera no levantamento anterior |
| Niterói/RJ | multidomínio | Portal dados.niteroi (legado) | `https://dados.niteroi.rj.gov.br/` | — | — | — | `[fetch-falhou]` **ECONNREFUSED** — mesma falha registrada no levantamento anterior, agora reconfirmada |
| Niterói/RJ | multidomínio (indicadores) | ObservaNit — Indicadores | `https://observa.niteroi.rj.gov.br/indicadores/` | painel com botões **"Exportar dados CSV"** e "Download Fichas PDF" | município; filtros por bloco temático, eixo, ODS e instrumento de planejamento | não visível no HTML estático | `[fetch-ok]` a interface declara exportação CSV; os valores carregam dinamicamente ("Carregando…"); gestão da SEPLAG |
| Niterói/RJ | multidomínio (indicadores) | DataView/ObservaNit — API e CSV | `https://dataview.niteroi.rj.gov.br/api/v2/indicadores/csv` | CSV integral + API JSON | 19 blocos; território varia por indicador | metadados atualizados em 2026 | `[fetch-ok]` download real lido: **340 indicadores**, 247 ativos e 314 com série; endpoint JSON também respondeu |
| Niterói/RJ | multidomínio/geo | SIG Niterói — ArcGIS REST | `https://sig.niteroi.rj.gov.br/server/rest/services?f=pjson` | ArcGIS REST; JSON/GeoJSON/PBF | escola, unidade de saúde, linha de ônibus, ponto ambiental, endereço, bairro e região | camadas editadas em 2025–2026 | `[fetch-ok]` 181 FeatureServers hospedados; esquemas e contagens lidos em sete áreas |
| Niterói/RJ | saúde | Dados Abertos da SMS + TabNit + painéis | `https://saude.niteroi.rj.gov.br/dados-abertos/` | TabNit exporta **CSV, Excel e TabWin**; painéis Power BI | **bairro e região de saúde** | dados vitais, COVID, imunização, arboviroses, obesidade | `[fetch-ok]` página enumera TabNit (`saladesituacao.niteroi.rj.gov.br/pages/tabnit`) e painéis temáticos |

| Niterói/RJ | saúde (ferramenta) | TabNit — Sala de Situação | `https://www.saladesituacao.niteroi.rj.gov.br/pages/tabnit` | aplicação dinâmica | bairro/região (declarado pela SMS) | — | `[fetch-ok]` a página abre, mas o HTML traz apenas o título "TABNIT"; a tabulação roda via JavaScript |

## Achados

1. **Niterói passou o gate técnico.** O ecossistema vivo está no DataView/ObservaNit e no SIG municipal: o CSV integral e o JSON foram lidos, com 340 indicadores em 19 blocos, e o ArcGIS REST respondeu com camadas atuais de educação, saúde, mobilidade, ambiente, economia e território. O Hub legado quebrado não representa mais a cidade.
2. **Caxias do Sul confirma o perfil previsto: excelente acesso técnico, forte concentração geoespacial.** O feed tem 126 IDs, mas inclui conteúdo externo e metadado defeituoso. Há 70 distribuições CSV e 70 GeoJSON, porém saúde, educação e mobilidade são principalmente localização de equipamentos; finanças e segurança não apareceram.
3. **Toledo continua promessa documentada, não capacidade comprovada.** A especificação OpenAPI 3.0 está viva e descreve 9 endpoints (licitação, liquidação, contratos, receita, RH e saúde por exames/vacinas/procedimentos/consultas), mas as chamadas reais devolveram **HTTP 400 sem corpo** em três variações de parâmetros (sem datas, ISO e dd/MM/yyyy). A documentação não traz exemplos de chamada.

## Correções (o que eu mesmo derrubei)

—

## Fraquezas e riscos

- **Niterói:** API, CSV e ArcGIS foram lidos, mas indicador agregado e cadastro de equipamentos não substituem microdados operacionais; segurança e finanças ainda exigem inventário específico.
- **Caxias do Sul:** nenhum conjunto tabular de finanças, segurança ou mobilidade apareceu no feed; o risco é aprovar a cidade pelo acesso e descobrir vazio temático na ingestão.
- **Toledo:** API sem mensagem de validação nem exemplos; pode estar abandonada ou exigir formato não documentado — custo de descoberta imprevisível.

## O que não consegui verificar, e por quê

- **TabNit em si:** a página oficial declara CSV/Excel/TabWin e recorte por bairro, mas o arquivo específico do TabNit não foi baixado; o CSV confirmado nesta auditoria é o do ObservaNit/DataView.
- **Formato correto dos parâmetros da API de Toledo:** o HTTP 400 vem sem corpo e a spec não traz exemplos.
- **Catálogo completo do HUB SIGeo de Niterói:** SPA sem conteúdo estático.

## Síntese

Das três candidatas-sombra, **Niterói passou a ser candidata real à troca com Belém**: API, CSV e ArcGIS estão comprovados. **Caxias do Sul** mantém bom acesso técnico, mas segue candidata a piloto *geo*, não multidomínio. **Toledo** não passou no teste que importava: o endpoint real continua sem responder, e sem exemplos oficiais o custo de integração é loteria.
