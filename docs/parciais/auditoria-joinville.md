# auditoria:joinville — reavaliação do descarte com evidência nova

> **Nota de auditoria posterior (2026-08-01): o bloqueio da página de download não bloqueia os dados.** O diretório ArcGIS REST do SIMGeo tem 35 entradas/32 nomes únicos. Foram testados 92 equipamentos de saúde, 52 coberturas de UBSF, 230 escolas e 61 equipamentos de assistência em respostas JSON/GeoJSON. Isso corrige o diagnóstico de “geo hostil a máquina”; permanece válida a conclusão de que o acervo é sobretudo cadastral e não sustenta piloto multidomínio sozinho.

**Status:** em andamento
**Última atualização:** 2026-08-01
**Agente:** `auditoria:joinville`
**Escopo:** o dossiê descartou Joinville/SC como "bom nicho de geoinformação, mas cobertura temática muito desequilibrada". Esta auditoria testa os oito domínios (camadas M e E) para confirmar ou contestar o descarte com evidência datada. Não edita o dossiê: entrega insumo para o compilador.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Joinville/SC | urbanismo/geo | SIMGeo — página do serviço | `https://www.joinville.sc.gov.br/servicos/acessar-sistema-de-informacoes-municipais-georreferenciadas-simgeo/` | consulta web **sem cadastro**; downloads em DWG, Shapefile e PDF | inscrição imobiliária, logradouro, bairro, coordenada | ortofotos de 2007, 2010 e 2012 | `[fetch-ok]` inclui versão ambiental (`simgeosama.joinville.sc.gov.br`) |
| Joinville/SC | urbanismo/geo | Página de downloads do geoprocessamento | `https://geoprocessamento.joinville.sc.gov.br/download` | — | — | — | `[fetch-falhou]` **HTTP 403** para o cliente desta sessão; bloqueio anti-robô impede confirmar o acervo |
| Joinville/SC | multidomínio | Joinville Cidade em Dados 2024 | `https://www.joinville.sc.gov.br/publicacoes/joinville-cidade-em-dados-2024/` | **PDF** (5 cadernos de 3–20 MB) | município | edição 2024; série desde 2011 (ex-IPPUJ, hoje SEPUD) | `[fetch-ok]` cadernos: Ambiente Construído, Ambiente Natural, Desenvolvimento Econômico, Desenvolvimento Social e Gestão Institucional |
| Joinville/SC | finanças/saúde | Portal da Transparência — página do serviço | `https://www.joinville.sc.gov.br/servicos/acessar-portal-da-transparencia/` | consultas: despesas, receita, gestão de pessoas, **medicamentos da rede municipal**, ILPIs, LRF, planejamento | varia por consulta | página do serviço datada de 14/11/2018 | `[fetch-ok]` aponta o portal real em `transparencia.joinville.sc.gov.br` |
| Joinville/SC | finanças | Portal da Transparência (portal real) | `https://transparencia.joinville.sc.gov.br/` | aplicação JavaScript | — | — | `[fetch-ok]` a página abre, mas o HTML estático só expõe o widget VLibras; menus e exportações não são auditáveis por fetch |
| Joinville/SC | segurança (camada E) | SSP-SC — Segurança em Números | `https://ssp.sc.gov.br/segurancaemnumeros/` | boletins mensais em **PDF** + violência doméstica em **XLSX** | estadual; recorte municipal não confirmado no fetch | mensal; boletins de janeiro a junho/2026 publicados | `[fetch-ok]` ex.: `ssp.sc.gov.br/wp-content/uploads/2026/06/05-maio.pdf` e `VIOLENCIA-DOMESTICA-SC-1o-SEMESTRE.xlsx` |
| Joinville/SC | mobilidade | Onibus.info (Gidion/Transtusa) | `https://onibus.info` | site/app das concessionárias privadas | linha, ponto, horário | — | `[nao-testado]` visto em busca; nenhum GTFS localizado para a cidade |
| Joinville/SC | governança/reuso | Importação de endereços do SIMGeo pelo OpenStreetMap | `https://wiki.openstreetmap.org/wiki/Pt:Joinville` | wiki comunitária | endereço/numeração predial | import concluído segundo a wiki | `[nao-testado]` pista de reuso comunitário real dos dados municipais |

## Achados

1. **Joinville tem cultura de dados institucional consolidada, mas publicada em PDF.** O compêndio "Joinville Cidade em Dados" existe desde 2011 (como "Joinville em Números") e a edição 2024 traz cinco cadernos temáticos que cobrem, no papel, quase todos os domínios do projeto — em PDF municipal agregado, sem tabela aberta.
2. **O geo é genuinamente aberto (sem cadastro, SHP/DWG), porém envelhecido e hostil a máquina:** as ortofotos declaradas são de 2007–2012 e a página de download devolve 403 ao acesso automatizado.
3. **A transparência municipal inclui consulta de medicamentos da rede** — o mesmo caso de uso que valorizou Recife —, mas o portal é aplicação JavaScript e nenhuma exportação pôde ser confirmada por fetch.
4. **Segurança vem do estado em PDF mensal** (+ um XLSX semestral de violência doméstica); recorte por município não confirmado nesta sessão.
5. **Mobilidade é das concessionárias privadas** (Gidion/Transtusa via Onibus.info); nenhum GTFS ou dado aberto municipal localizado.
6. **Nenhum catálogo de dados abertos (CKAN/DCAT) municipal foi encontrado** — a diferença estrutural para as cidades do Top 10 permanece.

## Correções (o que eu mesmo derrubei)

—

## Fraquezas e riscos

- O acervo multidomínio existe **apenas em PDF**: ingestão exigiria extração de tabelas de PDF, com custo e fragilidade altos.
- O bloqueio 403 no download do geoprocessamento indica WAF anti-automação — risco direto para qualquer pipeline.
- Educação municipal aberta não foi localizada nesta sessão (a busca não foi aprofundada — ver seção seguinte).
- A força aparente ("cobre tudo no Cidade em Dados") pode mascarar séries interrompidas entre edições anuais.

## O que não consegui verificar, e por quê

- **Download real de Shapefile/DWG do SIMGeo:** a página de download respondeu 403 ao cliente desta sessão.
- **Menus e exportações do portal de transparência:** aplicação JavaScript sem corpo estático.
- **Recorte municipal dos boletins da SSP-SC:** os PDFs não foram abertos nesta sessão.
- **Educação municipal (matrículas/vagas):** o orçamento de busca da sessão foi priorizado para os domínios com pista concreta.

## Síntese

O descarte registrado no dossiê **se sustenta para o critério que importa ao piloto** — não há catálogo aberto, não há API, e o multidomínio vive em PDF anual —, mas o rótulo "bom nicho de geoinformação" subestima a cidade: Joinville mantém um compêndio temático anual desde 2011, consulta de medicamentos na transparência e geo aberto sem cadastro (com reuso comunitário real pelo OpenStreetMap). Recomendação ao compilador: manter Joinville fora do Top 10, reclassificando a justificativa de "só geo" para **"compêndio PDF + geo aberto, sem acesso a máquina"**, e reavaliar somente se o Cidade em Dados passar a sair em tabela ou se o SIMGeo liberar o download automatizado.
