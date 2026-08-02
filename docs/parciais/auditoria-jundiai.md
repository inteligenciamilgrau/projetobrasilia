# auditoria:jundiai — recursos reais por domínio da candidata principal

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `auditoria:jundiai`
**Escopo:** executar a maior pendência declarada no dossiê — abrir ao menos um recurso real por domínio em Jundiaí/SP, separando camada municipal (M) e estadual (E), antes de qualquer piloto integral.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Jundiaí/SP | finanças | Portal da Transparência (CIJUN) | `https://transparencia.jundiai.sp.gov.br/` | portal; declara CSV/TXT/XLS legíveis por máquina | varia por consulta | não exibida na página inicial | `[fetch-ok]` a home confirma a declaração de formatos abertos, mas não enumera as consultas |
| Jundiaí/SP | urbanismo | GEOJundiaí | `https://geo.jundiai.sp.gov.br/geojundiai/` | visualizador web (Plano Diretor, cadastro fiscal, PGV, equipamentos) | lote, ponto e temático | cobertura vegetal datada de 2012; demais camadas sem data | `[fetch-ok]` a página descreve módulos e cita acesso "restrito a funcionários" em parte do conteúdo; nenhum endpoint WFS/REST público documentado |
| Jundiaí/SP | multidomínio | Observatório Jundiaí | `https://observatorio.jundiai.sp.gov.br/` | painel dinâmico (SPA); exportação não visível no HTML servido | município | não visível | `[fetch-ok]` indicadores carregam via JavaScript ("Carregando Indicadores…"); inclui Painel do Censo 2022 |
| Jundiaí/SP | saúde (indicadores) | Observatório — filtro ODS 3 | `https://observatorio.jundiai.sp.gov.br/indicadores.php?tag=3` | painel dinâmico | município | não visível | `[fetch-ok]` página é moldura; dados chegam por XHR, sem conteúdo estático auditável |
| Jundiaí/SP | segurança (camada E) | SSP-SP — dados mensais | `https://www.ssp.sp.gov.br/estatistica/dados-mensais` | SPA | — | — | `[fetch-falhou]` resposta devolveu apenas o título "Portal SSP"; corpo carrega por JavaScript |
| Jundiaí/SP | multidomínio (camada E) | Portal de Dados Abertos do Estado de SP | `https://dadosabertos.sp.gov.br/` | portal com 19 grupos temáticos; CGE-SP | estadual; recorte municipal a confirmar | "cadastro gradativo" declarado | `[fetch-ok]` |
| Jundiaí/SP | urbanismo | Sonda ArcGIS REST | `https://geo.jundiai.sp.gov.br/arcgis/rest/services` | — | — | — | `[fetch-falhou]` HTTP 404; não há diretório ArcGIS nesse caminho |
| Jundiaí/SP | urbanismo/mobilidade/ambiente | **GeoServer WFS público do GEOJundiaí** | `https://geo.jundiai.sp.gov.br/geoserver/ows?service=WFS&request=GetCapabilities` | WFS 2.0.0 (GetFeature, DescribeFeatureType) | lote, edificação, bairro, zona, equipamento | camadas com marco legal datado (ex.: zoneamento L 10.177-2024) | `[fetch-ok]` **112 FeatureTypes**: zoneamento 2024 e 2016, lotes, edificações, endereçamento/CEP, bairros (LC 188/1996 e LC 461/2008), ZEIS, bens tombados, bacias, represas, parques, APA Jundiaí, ciclovias, terminais de ônibus, classificação viária, aerofotos 1959–1993 |
| Jundiaí/SP | mobilidade (recurso real) | WFS GetFeature `v_ciclovias` | `https://geo.jundiai.sp.gov.br/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=v_ciclovias&count=2&outputFormat=application/json` | GeoJSON | trecho de ciclovia (MultiLineString, EPSG:31983) | campo `ano_implantacao` presente | `[fetch-ok]` **recurso aberto e esquema lido**: 270 features totais; campos gid, fid, apelido, codlogr, logradouro, situacao, origem, tipo_via, caracteristica, uso_principal, ano_implantacao, fonte_recurso, distancia, largura |
| Jundiaí/SP | educação (camada E) | Dados Abertos da Educação — Seduc-SP | `https://dados.educacao.sp.gov.br/` | portal de microdados/CSV | escola e matrícula da rede estadual | consulta pública do PDA 2025–2027 em andamento | `[fetch-ok]` seis categorias: matrículas, resultados educacionais, orçamento, infraestrutura, profissionais, planos |
| Jundiaí/SP | economia (camada E) | SEADE Municípios | `https://municipios.seade.gov.br/` | painéis + repositório de dados | município | não exibida na home | `[fetch-ok]` cinco temas: demografia, economia, emprego, educação, saúde |
| Jundiaí/SP | multidomínio (camada E) | Busca "Jundiai" no CKAN estadual | `https://dadosabertos.sp.gov.br/api/3/action/package_search?q=Jundiai&rows=5` | API CKAN | — | consulta em 2026-08-01 | `[fetch-ok]` API viva (436 conjuntos no total), mas **zero** conjuntos respondem por "Jundiai"; recorte municipal precisa vir de dentro dos recursos |
| Jundiaí/SP | multidomínio | Catálogo de indicadores em PDF do Observatório | `https://observatorio.jundiai.sp.gov.br/indicadores/catalogo_indicadores_PMJ.pdf` | — | — | — | `[fetch-falhou]` HTTP 404; o link indexado pelo buscador está morto |
| Jundiaí/SP | saúde (detalhe de indicador) | Observatório — detalhes_indicador.php | `https://observatorio.jundiai.sp.gov.br/detalhes_indicador.php?setor=saude&indic=pop_res` | — | — | — | `[fetch-falhou]` HTTP 404 em URL indexada pelo buscador; contradição entre índice e site |
| Jundiaí/SP | finanças (recurso real) | Consulta de Receita por Classificação Orçamentária | `https://transparencia.jundiai.sp.gov.br/financeiro/receita/` | consulta SIIM "em tempo real"; CSV/TXT/XLS declarados nas regras do portal | classificação orçamentária | tempo real declarado | `[fetch-ok]` página da consulta existe; botões de exportação não são visíveis no HTML estático |
| Jundiaí/SP | saúde | Boletins e informes técnicos epidemiológicos | `https://jundiai.sp.gov.br/saude/vigilancia-epidemiologica/boletim-e-informe-tecnico-epidemiologico/` | PDF | município | quadrimestral; edições 2025 e 2026 | `[fetch-ok]` somente PDF estático (MPOX, sarampo, meningite etc.); sem painel nem dado por bairro nesta página |
| Jundiaí/SP | mobilidade | SITU — horários de ônibus | `https://situ.jundiai.sp.gov.br/` | HTML por terminal | linha e terminal (7 terminais) | não exibida | `[fetch-ok]` consulta oficial de horários; sem GTFS, API ou download |
| Jundiaí/SP | mobilidade | Ônibus por GPS | `https://jundiai.sp.gov.br/mobilidade/informacao-do-seu-onibus-pelo-gps/` | somente aplicativo (iOS/Android) | veículo em tempo real | tempo real | `[fetch-ok]` GPS existe, mas sem API pública ou dado aberto documentado |
| Jundiaí/SP | segurança | Site da Guarda Municipal | `https://gm.jundiai.sp.gov.br/` | notícias | ocorrência narrada, sem agregação | últimas notícias de abril/2026 | `[fetch-ok]` a seção "Ocorrências" é editorial; nenhuma estatística agregada, tabela ou download |
| Jundiaí/SP | segurança (camada E) | SSP-SP — consultas/estatística | `https://www.ssp.sp.gov.br/estatistica/consultas` | SPA | — | — | `[fetch-falhou]` corpo vazio ("Portal SSP"); os XLSX citados em buscadores não são alcançáveis sem JavaScript |
| Jundiaí/SP | educação | Lista de espera de creches (consulta via app/site) | `https://jundiai.sp.gov.br/educacao/creches/duvidas-frequentes/` | app da Prefeitura + página | unidade escolar | atualização bimestral declarada | `[nao-testado]` visto apenas em busca; a página de dúvidas não foi aberta nesta sessão |

## Achados

1. **A pendência "localizar endpoints do GEOJundiaí" está resolvida: existe GeoServer WFS público com 112 camadas** em `geo.jundiai.sp.gov.br/geoserver`, incluindo zoneamento da lei vigente (L 10.177/2024), lotes, edificações, endereçamento/CEP, ZEIS, bens tombados, bacias, parques, APA, ciclovias e terminais de ônibus. GetFeature devolve GeoJSON com esquema legível — recurso real aberto e lido nesta sessão. Isso muda o acesso (`U`) e o território (`T`) de urbanismo/ambiente/mobilidade para cima.
2. **O Observatório continua sendo painel, não base aberta.** O HTML servido não expõe exportação; os indicadores carregam por XHR; e duas URLs indexadas pelo buscador (catálogo PDF e página de detalhe de indicador) devolvem 404. Pela regra da métrica v2.1, essa contradição entre índice e site pede intervalo amplo em `U`/`R` e teto no C-IDU até auditoria interativa.
3. **Finanças é o domínio tabular mais forte da camada municipal:** consultas SIIM "em tempo real" com CSV/TXT/XLS declarados e sem cadastro, mas os botões de exportação precisam ser confirmados com navegador.
4. **Saúde municipal aberta se resume a boletins PDF quadrimestrais** (2025–2026). Nenhum microdado municipal localizado; o painel de arboviroses anunciado em 2023 não foi encontrado nesta sessão.
5. **Segurança municipal não publica estatística**: o site da GM é editorial (notícias de ocorrências). A camada estadual (SSP-SP) existe, porém virou SPA — nem a página de consultas expõe os XLSX sem JavaScript.
6. **Mobilidade tem serviço, não dado**: horários em HTML (SITU) e GPS apenas via aplicativo; nenhum GTFS ou API pública localizada. As geometrias (ciclovias, terminais, viário) estão no WFS.
7. **Educação municipal**: lista de espera de creches com atualização bimestral declarada (via app/site); microdados abertos são estaduais (Seduc-SP) ou nacionais.

## Correções (o que eu mesmo derrubei)

—

## Fraquezas e riscos

- Quatro dos oito domínios (saúde, educação, segurança, economia) seguem **sem recurso municipal tabular aberto** localizado por fetch — a força de Jundiaí é institucional e territorial, não operacional.
- A tese dos "mais de 385 indicadores" permanece **não comprovada como dado aberto exportável**; risco real de o piloto contar com indicador agregado sem série bruta.
- A camada estadual de segurança (SSP-SP) é hostil a máquina (SPA); ingestão exigirá descobrir as URLs diretas dos XLSX ou usar espelhos comunitários, com as ressalvas de procedência.
- GEOJundiaí menciona partes "restritas a funcionários"; o perímetro público/privado das camadas precisa ser mapeado camada a camada.

## O que não consegui verificar, e por quê

- **Exportação real das consultas SIIM** (botões CSV/TXT/XLS): a interface é dinâmica e o fetch estático não aciona a consulta.
- **Conteúdo e eventual endpoint XHR do Observatório**: não abri as chamadas internas do painel nesta sessão.
- **Painel de arboviroses** citado em notícia de 2023: link não localizado.
- **Lista de espera de creches**: página vista apenas em resultado de busca — segue `[nao-testado]`.
- **XLSX da SSP-SP (SPDadosCriminais)**: a página de consultas não expõe os links sem JavaScript; não obtive URL direta do arquivo.

## Síntese

Jundiaí sai desta auditoria **mais forte em território e governança e igualmente fraca em dados operacionais**. O achado principal é o WFS público com 112 camadas — recurso aberto, atual (zoneamento 2024) e com esquema lido, que o dossiê ainda tratava como pendência. Finanças tem consulta declaradamente aberta (SIIM + CSV/TXT/XLS). Mas saúde, educação, segurança e economia continuam sem base municipal aberta comprovada, e o Observatório segue painel sem exportação verificável, com dois links institucionais quebrados. Recomendação ao compilador: manter Jundiaí como candidata principal **condicionada à auditoria interativa** (navegador) das exportações SIIM e do Observatório; elevar a nota territorial com a evidência WFS; e não converter indicadores agregados em pontos de profundidade (`D`) sem série bruta aberta.
