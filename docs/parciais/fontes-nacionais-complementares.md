# fontes:nacionais-complementares — candidatas novas ao catálogo `fontes.html`

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `fontes:nacionais-complementares`
**Escopo:** verificar portais nacionais e comunitários ausentes do catálogo atual (41 cartões), priorizando fontes com uso real comprovado pela comunidade (PNCP à frente). Todas as fontes aqui são `[NACIONAL — não pontua]` para o ranking de cidades; o destino delas é o catálogo, não a nota de candidata.

## Fontes verificadas

| Fonte | Área | URL | Acesso | Recorte | Atualização | Status |
|---|---|---|---|---|---|---|
| PNCP — especificação OpenAPI da consulta | Contratações públicas | `https://pncp.gov.br/api/consulta/v3/api-docs` | OpenAPI/JSON | órgão, contratação, ata, contrato, PCA | spec v1.0 viva | `[fetch-ok]` paths de PCA, contratações, contratos, atas e instrumentos de cobrança |
| PNCP — consulta real de contratos | Contratações públicas | `https://pncp.gov.br/api/consulta/v1/contratos?dataInicial=20260725&dataFinal=20260725&pagina=1` | **API JSON pública, sem autenticação** | contrato por órgão/fornecedor (valorGlobal, vigência, tipo) | dados de 2026 retornados na consulta | `[fetch-ok]` **recurso aberto e esquema lido nesta sessão**; 50+ registros na página 1 |
| Querido Diário — site institucional | Diários oficiais municipais | `https://queridodiario.ok.org.br/` | — | — | — | `[fetch-falhou]` HTTP 403 ao cliente automatizado (mesmo comportamento que o projeto já registrou para `ok.org.br`) |
| Querido Diário — documentação da API | Diários oficiais municipais | `https://queridodiario.ok.org.br/api/docs` | — | — | — | `[fetch-falhou]` HTTP 403 |
| Querido Diário — repositório | Diários oficiais municipais | `https://github.com/okfn-brasil/querido-diario` | raspadores em Python, licença **MIT** | diário oficial por município | 1.921 commits; projeto ativo (1,4k estrelas) | `[fetch-ok]` mantido pela Open Knowledge Brasil; docs em `docs.queridodiario.ok.org.br` |
| Base dos Dados | Datalake comunitário | `https://basedosdados.org/` | BigQuery (SQL), pacotes Python/R, download | tabelas tratadas com ID de município IBGE | atualizações mensais em muitas tabelas | `[fetch-ok]` ONG; agrega IBGE, Receita, TSE, CGU, INEP com variáveis padronizadas |
| SINISA — saneamento | Saneamento | `https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/saneamento/sinisa` | painéis, séries e diagnósticos | município, nos 4 componentes (água, esgoto, resíduos, drenagem) | resultados 2024 e 2025 publicados; sucede o SNIS desde 2024 | `[fetch-ok]` |
| INDE — catálogo nacional de geosserviços | Território/geoespacial | `https://inde.gov.br/` | catálogo de metadados + CSW/WMS/WFS | varia por órgão (IBGE, DSG, Embrapa, SGB, IDEs estaduais) | contínua por publicador | `[fetch-ok]` a variante `www.inde.gov.br` sofreu queda de conexão (socket hang up) no primeiro teste |
| MapBiomas | Meio ambiente/uso da terra | `https://brasil.mapbiomas.org/` | plataforma, downloads, Google Earth Engine, estatísticas por município | pixel 30 m (10 m em 2016–2023) agregável por município | série 1985–2023/24; Coleção 11 anunciada para 12/08/2026 | `[fetch-ok]` gratuito e aberto |
| Atlas do Desenvolvimento Humano (PNUD/Ipea/FJP) | Índices socioeconômicos | `https://www.atlasbrasil.org.br/` | — | — | — | `[fetch-falhou]` **HTTP 500** nesta sessão; não entra no catálogo até novo teste |
| Senatran — frota de veículos | Mobilidade | `https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/estatisticas-frota-de-veiculos-senatran` | índice anual com arquivos (ZIP nos anos antigos) | frota por recorte a confirmar no arquivo | anos 2000–2026 listados; página atualizada em 13/02/2026 | `[fetch-ok]` granularidade municipal não confirmada no índice — confirmar no arquivo mensal |
| OpenDataSUS | Saúde | `https://opendatasus.saude.gov.br/` | — | — | — | `[fetch-ok]` **redireciona (302) para `dadosabertos.saude.gov.br`** — o portal foi absorvido pelo catálogo já presente no `fontes.html`; não é fonte nova |

## Achados

1. **PNCP é a adição mais importante**: API de consulta pública **sem autenticação**, com OpenAPI publicada e JSON rico (órgão, fornecedor, valor global, vigência, tipo), cobrindo contratações, atas, contratos e PCA de todos os entes federativos — e é fonte com uso intenso e recorrente pela comunidade proponente. O catálogo atual só lista Compras.gov.br, cujo próprio cartão avisa que "não substitui o PNCP".
2. **Querido Diário** dá acesso programático a diários oficiais municipais — exatamente a camada documental que falta entre "portal de dados" e "ato oficial". O site institucional bloqueia clientes automatizados (403), o que deve constar como cuidado; o projeto está vivo (MIT, OKBR).
3. **Base dos Dados** resolve o problema de cruzamento: tabelas tratadas com identificador municipal padronizado consultáveis por SQL — com a ressalva de sempre citar e validar na fonte original.
4. **SINISA substitui o SNIS desde 2024** — qualquer análise de saneamento municipal precisa saber que a série nova vive ali (e a histórica no SNIS).
5. **INDE e MapBiomas** cobrem o eixo território/ambiente: a primeira como catálogo oficial de geosserviços (CSW/WMS/WFS), o segundo como série aberta de uso da terra 1985+ com estatísticas municipais.
6. **OpenDataSUS não é fonte nova** — redireciona para o `dadosabertos.saude.gov.br`, que já está no catálogo. Registro aqui para poupar a próxima pessoa da mesma verificação.
7. **Atlas Brasil caiu (HTTP 500)** no teste desta sessão e ficou fora do catálogo, apesar do mérito — retestar antes de propor.

## Correções (o que eu mesmo derrubei)

- ~~OpenDataSUS seria candidato a cartão próprio no catálogo.~~ **CORRIGIDO 2026-08-01:** o domínio redireciona (302) para `dadosabertos.saude.gov.br`, já catalogado. Virou nota, não cartão.

## Fraquezas e riscos

- A API do PNCP pagina obrigatoriamente e exige filtros de data — coletas ingênuas estouram limites; os documentos dos processos ficam em endpoints próprios.
- Querido Diário e Base dos Dados são **sociedade civil**: continuidade depende de financiamento de terceiros; sempre validar contra a fonte oficial.
- A frota da Senatran foi confirmada apenas no índice — a granularidade municipal do arquivo precisa ser aberta antes de qualquer uso em nota de cidade.
- Nenhuma dessas fontes pontua cidade: todas são `[NACIONAL — não pontua]` por definição da Regra 5.

## O que não consegui verificar, e por quê

- **Conteúdo do site e da API do Querido Diário**: 403 ao cliente automatizado; a verificação positiva veio do repositório GitHub.
- **Atlas Brasil**: HTTP 500 no servidor durante a sessão.
- **Granularidade municipal dos arquivos da Senatran**: exigiria baixar um ZIP/planilha do mês, fora do alcance desta sessão.
- **DadosJusBr** (remuneração do sistema de justiça): ficou fora do orçamento de verificação — segue como pista para a próxima rodada, sem cartão.

## Síntese

Sete fontes verificadas entram como candidatas ao catálogo: **PNCP** (a lacuna mais séria do `fontes.html` atual, com API pública comprovada em consulta real), **Querido Diário**, **Base dos Dados**, **SINISA**, **INDE**, **MapBiomas** e **Senatran-frota** — as três primeiras cobrindo camadas (contratações, diários, cruzamento) que nenhum cartão atual atende. Atlas Brasil (500) e DadosJusBr (não testado) ficam para a próxima rodada; OpenDataSUS vira nota de redirecionamento. Todas as adições são nacionais e não pontuam candidatas.
