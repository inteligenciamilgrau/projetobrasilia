# regiao:sc-100mil — triagem dos 14 municípios catarinenses acima de 100 mil habitantes

**Status:** concluído
**Última atualização:** 2026-08-01
**Agente:** `regiao:sc-100mil`
**Escopo:** triagem rápida (no padrão de `docs/CIDADES_PEQUENAS.md`, seção 5) dos 14 municípios de SC com mais de 100 mil habitantes na Estimativa 2025 revisada, para alimentar a tabela nacional `municipios_100mil.json`. Não é auditoria IDU-Br: prioriza acesso, cobertura, território, atualidade e governança em uma passada por município, mais a camada estadual.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| SC (estadual) | multidomínio (camada E) | Dados Abertos SC — API CKAN | `https://dados.sc.gov.br/api/3/action/package_search?rows=0` | API CKAN | varia | consulta 2026-08-01 | `[fetch-ok]` `success=true`, **112 conjuntos** |
| Blumenau/SC | urbanismo/geo | GEO Blumenau — diretório ArcGIS REST | `https://geo.blumenau.sc.gov.br/server/rest/services` | Geosserviço (ArcGIS 10.71) | lote, cadastro, viário | não declarada | `[fetch-ok]` **23 pastas temáticas**: Cadastro_Imobiliario, CICLOVIAS, Defesa_Civil, Drenagem, Geologia, Meio_Ambiente, Obras_Infraestrutura, Planejamento_Urbano, Sistema_Viario, dadosestatisticos etc. — reconfirma o levantamento `regiao-sul` |
| Joinville/SC | multidomínio/geo | SIMGeo — diretório ArcGIS REST | `https://geo.joinville.sc.gov.br/server/rest/services/simgeo?f=pjson` | Geosserviço (ArcGIS 11.1) | camada por tema; lote e equipamento | serviço vivo | `[fetch-ok]` **34 serviços**, incluindo MapServers de **saúde, educação, assistência social, censo, defesa civil, zoneamento (LC 470/2017), regularização fundiária** e FeatureServers de saúde e plano viário 2024 |
| Florianópolis/SC | multidomínio | Portal de dados abertos legado | `https://dadosabertos.pmf.sc.gov.br/` | — | — | — | `[fetch-falhou]` **DNS não resolve (ENOTFOUND)** — reconfirma nesta sessão o registro histórico do projeto |
| Florianópolis/SC | urbanismo/geo | GeoPortal — IDE municipal (REPLAN) | `https://redeplanejamento.pmf.sc.gov.br/pt-BR/gestao-territorial/geoportal` | mapa interativo, geosserviços e **área de downloads declarada** | camada temática e distrito | base legal atual: Decreto municipal 26.184/2024 | `[fetch-ok]` sistema em `geoportal.pmf.sc.gov.br`; emissão automatizada de certidões e consultas |
| Florianópolis/SC | urbanismo/geo | Downloads de camadas SIG do GeoPortal | `https://geoportal.pmf.sc.gov.br/downloads/camadas-em-sig-do-mapa` | página dinâmica | — | — | `[fetch-ok]` a página abre, mas o HTML servido traz apenas o título; formatos e camadas exigem navegador |
| Jaraguá do Sul/SC | urbanismo/geo | GeoPortal municipal (página oficial) | `https://www.jaraguadosul.sc.gov.br/urbanismo/infraestrutura-de-telecomunicacoes/mapas-e-dados-urbanisticos/geoportal` | visualizador próprio, desenvolvido internamente com software livre | lote, logradouro, zoneamento, inundações, redes de gás/energia | — | `[fetch-ok]` sistema em `sistemas.jaraguadosul.sc.gov.br/index.php?class=GeoWelcomeView`; notícias citam cadastro gratuito para acesso e link de ortofoto para uso em SIG |
| Criciúma/SC | finanças/multiconsulta | Portal Transparência | `https://transparencia.criciuma.sc.gov.br/` | consultas amplas + seção **"Bases de dados abertos"** e "Relação de Bases de Dados do Município" | receita, despesa, pessoal, licitações, obras | não exibida | `[fetch-ok]` o melhor sinal fiscal-aberto do lote; fornecedor não identificado na página |
| Camboriú/SC | urbanismo/geo | Produtos georreferenciados do Depto. de Geoinformação | `https://camboriu.sc.gov.br/planejamento-urbano/` | **downloads públicos** (Google Drive e PDF) | zoneamento, MDT, bacias, bairros, unidades de saúde e ensino, IBGE 2022 | **17 itens datados de jan–fev/2025** | `[fetch-ok]` surpresa do lote: a menor cidade da lista publica geo com data |
| Itajaí/SC | meio ambiente/geo | INIS — análise espacial e geoprocessamento | `https://inis.itajai.sc.gov.br/c/analise-espacial-geoprocessamento` | página descritiva; SIG interno | bacias, solos, declividade, bairros (mapas-imagem) | aerofoto de 2007 citada | `[fetch-ok]` **sem portal público de download** nesta página; seis mapas temáticos apenas como imagem |
| Chapecó/SC | multidomínio | Site da prefeitura | `https://www.chapeco.sc.gov.br/` | — | — | — | `[fetch-falhou]` **HTTP 403** ao cliente automatizado; menus não puderam ser lidos |
| Palhoça/SC | finanças | Portal da Transparência (IPM atende.net) | `https://palhoca.atende.net/transparencia/` | plataforma de fornecedor em JavaScript | — | — | `[fetch-ok]` a página abre, mas o corpo estático traz apenas o cabeçalho; consultas não auditáveis por fetch |
| SC (estadual) | segurança (camada E) | SSP-SC — Segurança em Números | `https://ssp.sc.gov.br/segurancaemnumeros/` | boletins mensais PDF + XLSX de violência doméstica | estadual; recorte municipal a confirmar nos PDFs | boletins até junho/2026 | `[fetch-ok]` verificado nesta mesma sessão (evidência detalhada no parcial `auditoria-joinville`, PR #1) |
| São José/SC | finanças/saúde | Portais de transparência da prefeitura | `https://saojose.sc.gov.br/portal-da-transparencia/` | páginas WordPress + portais setoriais (saúde, assistência) | — | — | `[nao-testado]` localizado em busca; nenhum catálogo de dados aberto apareceu |
| Lages/SC | finanças/obras | Portal da Transparência (Betha) com mapa de obras | `https://www.lages.sc.gov.br/transparencia` | plataforma de fornecedor; mapa interativo de obras | obra georreferenciada | — | `[nao-testado]` localizado em busca; equipe interna treinando QGIS segundo notícia oficial |
| Brusque/SC | urbanismo/geo | GeoBrusque + transparência atende.net | `https://brusque.atende.net/transparencia/` | portal geo próprio + fornecedor fiscal | cadastro imobiliário, ambiental, urbanístico | — | `[nao-testado]` busca indica que o GeoBrusque **doou shapefiles (bairros, edificações, numeração) ao OpenStreetMap** — sinal forte de reuso |
| Balneário Camboriú/SC | urbanismo/geo | Plataforma geoespacial com acesso público | `https://geo.bc.sc.gov.br/` | botão "Acesso Público" declarado | — | — | `[nao-testado]` localizado em busca |
| Tubarão/SC | finanças/geo | Portal da Transparência novo (Betha) + geoprocessamento público | `https://tubarao.sc.gov.br/portal-da-transparencia/` | portal de fornecedor + sistema geo aberto ao público | obra georreferenciada; imóvel | notícia declara 94% de conformidade e mapa de obras | `[nao-testado]` localizado em busca |

## Achados

1. **O padrão catarinense é geo forte, multidomínio ausente.** Dez das catorze cidades têm iniciativa de geoprocessamento própria (Joinville, Florianópolis, Blumenau, Itajaí, Jaraguá do Sul, Brusque, Balneário Camboriú, Camboriú, Tubarão, Lages), mas **nenhuma tem catálogo de dados abertos municipal (CKAN/DCAT)** — a camada tabular vive em portais fiscais de fornecedor.
2. **Joinville tem o geo mais estruturado do estado**: o diretório ArcGIS do SIMGeo expõe **34 serviços**, incluindo MapServers de saúde, educação, assistência social, censo e defesa civil e FeatureServers de saúde e plano viário 2024. Isso **complementa e corrige** a auditoria do PR #1: o 403 registrado lá era só da página legada de downloads; a API geográfica está aberta.
3. **Camboriú é o outlier positivo de pequeno porte**: 17 produtos georreferenciados publicados com data (jan–fev/2025), incluindo localização de unidades de saúde e ensino — mais dado aberto datado que várias cidades maiores do lote.
4. **Criciúma é o melhor sinal fiscal-aberto**: seção explícita de "Bases de dados abertos" e relação de bases dos sistemas municipais.
5. **A capital reconfirma o paradoxo do projeto**: `dadosabertos.pmf.sc.gov.br` segue morto em DNS, mas a IDE municipal criada pelo Decreto 26.184/2024 (GeoPortal) declara downloads e geosserviços — Florianópolis está reconstruindo pela via geográfica, não pela via CKAN.
6. **Fornecedores dominam a transparência**: IPM atende.net (Palhoça, Brusque) e Betha (Lages, Tubarão) entregam consultas em JavaScript, hostis a fetch — o mesmo alerta da métrica v2.1 sobre função genérica de fornecedor vale para o estado inteiro.
7. **Camada estadual utilizável**: CKAN `dados.sc.gov.br` vivo com 112 conjuntos e SSP-SC com boletins mensais (PDF) + XLSX de violência doméstica.

## Correções (o que eu mesmo derrubei)

- ~~Joinville não expõe serviço geográfico consultável (auditoria desta manhã registrou 403 no download).~~ **CORRIGIDO 2026-08-01:** o 403 é só da página legada `geoprocessamento.joinville.sc.gov.br/download`; o diretório ArcGIS REST `geo.joinville.sc.gov.br/server/rest/services/simgeo` responde com 34 serviços, incluindo saúde e educação.

## Fraquezas e riscos

- Esta é uma **triagem de uma passada** (padrão `CIDADES_PEQUENAS.md` §5), não auditoria IDU-Br: nenhum recurso foi baixado com esquema lido, exceto os testes de API/REST citados.
- Cinco cidades ficaram só com evidência de busca (`[nao-testado]`): São José, Lages, Brusque, Balneário Camboriú e Tubarão — falso negativo é possível, como o próprio protocolo das cidades pequenas alerta.
- Plataformas de fornecedor em JavaScript podem esconder exportações reais (Palhoça, Lages, Tubarão) — o fetch estático subestima.
- O recorte municipal dos boletins da SSP-SC continua não confirmado (PDFs não abertos).
- O 403 de Chapecó impede qualquer conclusão sobre a cidade — bloqueio não é ausência.

## O que não consegui verificar, e por quê

- **Conteúdo das plataformas de fornecedor** (atende.net/Betha): corpo carregado por JavaScript, ilegível ao fetch estático.
- **Downloads reais do GeoPortal de Florianópolis e do GeoPortal de Jaraguá**: páginas dinâmicas; a lista de camadas exige navegador.
- **Chapecó**: site oficial bloqueia cliente automatizado (403); restou a pista dos dados abertos da Câmara (fornecedores e-publica/cittatec).
- **GeoBrusque e geo.bc.sc.gov.br**: localizados por busca; URLs de sistema não abertas nesta sessão.
- **Espelho comunitário de dados de Itajaí** (`ricardopera.github.io/dados_abertos_itajai`): não aberto; fica como pista de reuso local.

## Síntese

Os 14 municípios catarinenses acima de 100 mil habitantes formam um ecossistema **geograficamente maduro e tabularmente pobre**: muita infraestrutura SIG própria (com dois destaques — SIMGeo de Joinville com 34 serviços REST e os 17 produtos datados de Camboriú), nenhum catálogo municipal de dados abertos, e transparência fiscal terceirizada em plataformas JavaScript. Para o app, todos os 14 entram na tabela nacional com status e fontes desta triagem; para o compilador, os próximos testes de maior retorno são: (1) abrir uma camada do SIMGeo de Joinville e ler o esquema; (2) confirmar as exportações das "bases de dados abertos" de Criciúma; (3) baixar um produto de Camboriú; (4) testar o GeoPortal da capital com navegador; (5) repetir a passada nas cinco cidades que ficaram em `[nao-testado]`.
