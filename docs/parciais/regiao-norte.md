# regiao:norte — Regiao NORTE (AC, AP, AM, PA, RO, RR, TO)

**Status:** concluído (transcrição do journal — nenhuma busca nova foi feita neste arquivo)
**Última atualização:** 2026-08-01
**Agente:** regiao:norte

> **Procedência deste arquivo.** Transcrito por um agente TRANSCRITOR a partir de um registro local de execução, não versionado.
> Os marcadores de verificação (`[fetch-ok]`, `[fetch-falhou]`, `[nao-testado]`) são **exatamente** os que o agente de pesquisa devolveu no campo `verified`.
> Nenhum status foi promovido, nenhuma URL foi reaberta, nenhuma lacuna foi preenchida com conhecimento próprio.
> O journal não registra o campo `label`; o vínculo agente→label foi feito pelo prompt `TAREFA:` gravado em `registro local da execução` do mesmo workflow.

**Dois marcadores foram acrescentados pelo transcritor** (Regra 5 do protocolo), e só estes:

- **[NACIONAL — não pontua]** na coluna Fonte, quando o `source_name` ou a `url` casam com DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS ou CAGED.
- **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** na coluna Cidade/UF, quando o próprio agente declarou o candidato como nacional (`uf = BR` ou `region = Nacional`).

O casamento é feito só em `source_name` e `url`. Uma fonte de fachada municipal que apenas *republique* base nacional (isso aparece com frequência no campo `evidence`) **não** é pega automaticamente — o `compilador` precisa ler a evidência linha por linha.

## Execuções deste label encontradas no journal

| Execução | referência interna | Linha do journal | Candidatos | Fontes |
|---|---|---|---|---|
| 1 | `execucao-1` | 20 | 6 | 25 |
| 2 | `execucao-2` | 48 | 6 | 35 |

## Fontes verificadas

Uma linha por fonte do campo `sources`, na ordem em que o agente as devolveu. A coluna Status reproduz o `verified` literal.

### Execução 1 — agente `execucao-1` (journal linha 20)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Belém (e Região Metropolitana de Belém)/PA | seguranca | CODEC / ESTATÍSTICA SIAC - SEGUP-PA (sistema de consulta e exportação de estatística criminal) | `http://codec.segup.pa.gov.br/` | painel/dashboard | distrito/bairro | Mensal (dados 'atualizados até Junho 30, 2026') | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | seguranca | SEGUP-PA - Nota Metodológica do Dashboard de Transparência da Segurança Pública | `https://sistemas.segup.pa.gov.br/transparencia/metodologia-dashboard/` | painel/dashboard | distrito/bairro | Atualização mensal entre o 1o e o 10o dia útil | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | seguranca | Portal da Transparência da Segurança Pública - SEGUP-PA | `https://sistemas.segup.pa.gov.br/transparencia/` | painel/dashboard | municipio | Não declarada na home | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | outro | SEGUP-PA - página 'Exportar Dados' | `https://sistemas.segup.pa.gov.br/transparencia/exportar-dados/` | desconhecido | distrito/bairro | Não declarada | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | social | FAPESPA - Anuário Estatístico do Pará 2024 (9a edição) | `https://fapespa.pa.gov.br/sistemas/anuario2024/` | csv/xlsx | municipio | Anual (edição 2024) | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | comercio/economia | FAPESPA - Radar de Indicadores das Regiões de Integração 2024 | `https://fapespa.pa.gov.br/sistemas/radar2024/` | csv/xlsx | municipio | Anual (edição 2024) | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | social | Anuário Estatístico do Município de Belém (SEGEP) - site do anuário | `https://anuario.belem.pa.gov.br/` | csv/xlsx | municipio | Descontinuado - edição mais recente exibida é 2020 | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | social | Prefeitura de Belém - página de serviço do Anuário Estatístico | `https://prefeitura.belem.pa.gov.br/servicos/anuario-estatistico-do-municipio-de-belem/` | csv/xlsx | municipio | Página atualizada em 20/10/2022 | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | financas/orcamento | Portal da Transparência de Belém - Origem dos Dados | `https://portaltransparencia.belem.pa.gov.br/dados-da-gestao/origem-dos-dados/` | painel/dashboard | municipio | Não declarada | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | urbanismo/geo | Site oficial COP30 Belém (testado como possível fonte de dados de obras/clima) | `https://cop30.belem.pa.gov.br/` | pdf/relatorio | desconhecido | N/A | `[fetch-ok]` |
| Belém (e Região Metropolitana de Belém)/PA | financas/orcamento | Transparência Pará - Web Services de receitas/despesas/servidores | `https://transparencia.pa.gov.br/?q=node%2F49` | api | desconhecido | Alegada diária (não verificável) | `[fetch-falhou]` |
| Belém (e Região Metropolitana de Belém)/PA | meio-ambiente | SEMAS-PA / Portal CAR Pará - consulta de mapa e camadas ambientais | `http://car.semas.pa.gov.br/#/consulta/mapa` | geoservico | desconhecido | Alegada periódica (não verificável) | `[fetch-falhou]` |
| Manaus/AM | financas/orcamento | Portal da Transparência do Amazonas - API de Dados Abertos | `https://www.transparencia.am.gov.br/dados-abertos-2/` | api | registro individual | Não declarada na página | `[fetch-ok]` |
| Manaus/AM | financas/orcamento | Prefeitura de Manaus - Dados Abertos (Controladoria Geral do Município) | `https://www.manaus.am.gov.br/cgm/dados-abertos/` | portal-dados-abertos | registro individual | Irregular - exemplos citados param em 2023 | `[fetch-ok]` |
| Manaus/AM | seguranca | SSP-AM - Estatísticas (SSP Dados / Ciesp) | `https://www.ssp.am.gov.br/ssp-dados/` | painel/dashboard | distrito/bairro | Não declarada (nota técnica mais recente de 2025) | `[fetch-ok]` |
| Manaus/AM | urbanismo/geo | Mapa de Manaus (Prefeitura de Manaus) | `https://mapademanaus.manaus.am.gov.br/` | desconhecido | desconhecido | Não declarada | `[fetch-ok]` |
| Manaus/AM | urbanismo/geo | Portal do Planejamento AM - Mapas SEDECTI | `https://portaldoplanejamento.am.gov.br/mapas-sedecti/` | desconhecido | desconhecido | Indisponível | `[fetch-ok]` |
| Manaus/AM | financas/orcamento | Portal da Transparência de Manaus | `http://transparencia.manaus.am.gov.br/transparencia/` | desconhecido | desconhecido | Não verificável | `[fetch-ok]` |
| Palmas/TO | financas/orcamento | Prefeitura de Palmas - Portal de Dados Abertos | `https://dadosabertos.palmas.to.gov.br/` | portal-dados-abertos | registro individual | Não declarada; rodapé 'Copyright 2021' | `[fetch-falhou]` |
| Palmas/TO | seguranca | SSP-TO - Estatísticas Criminais | `https://www.to.gov.br/ssp/estatisticas-criminais/` | desconhecido | desconhecido | Indisponível | `[fetch-ok]` |
| Porto Velho/RO | outro | PMPV-API - API Docs, Prefeitura de Porto Velho | `https://api.portovelho.ro.gov.br/` | api | desconhecido | Não declarada | `[fetch-ok]` |
| Boa Vista/RR | financas/orcamento | Portal da Transparência - Prefeitura Municipal de Boa Vista (hospedado em portalcr2.com.br) | `https://www.portalcr2.com.br/entidade/boa-vista` | desconhecido | desconhecido | Não verificável | `[fetch-ok]` |
| Nacional (camada federal que sustenta qualquer piloto no Norte)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | meio-ambiente | INPE TerraBrasilis - área de downloads (PRODES / DETER) | `https://terrabrasilis.dpi.inpe.br/downloads/` | geoservico | municipio | PRODES anual, DETER contínuo; página cita atualização de 03/03/2026 | `[fetch-ok]` |
| Nacional (camada federal que sustenta qualquer piloto no Norte)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | seguranca | Dados Abertos do Ministério da Justiça - conjunto SINESP (Sistema Nacional de Estatísticas de Segurança Pública) | `https://dados.mj.gov.br/dataset/sistema-nacional-de-estatisticas-de-seguranca-publica` | portal-dados-abertos | municipio | Não verificável | `[fetch-falhou]` |
| Nacional (camada federal que sustenta qualquer piloto no Norte)/BR **[ESCOPO NACIONAL — não pontua para cidade nenhuma]** | seguranca | Portal de Dados Abertos federal (dados.gov.br) - página do conjunto SINESP | `https://dados.gov.br/dados/conjuntos-dados/sistema-nacional-de-estatisticas-de-seguranca-publica` | portal-dados-abertos | desconhecido | Não verificável | `[fetch-ok]` |

### Execução 2 — agente `execucao-2` (journal linha 48)

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Belém/PA | outro | Belém em Números (painel multidomínio da Prefeitura de Belém / SEGEP) | `https://numeros.belem.pa.gov.br/` | painel/dashboard | municipio | variável por indicador; séries até 2024 em alguns temas | `[fetch-ok]` |
| Belém/PA | seguranca | ESTATÍSTICA SIAC — Secretaria Adjunta de Inteligência e Análise Criminal (SEGUP-PA) | `https://codec.segup.pa.gov.br/` | painel/dashboard | distrito/bairro | mensal (base disponível até 30/06/2026) | `[fetch-ok]` |
| Belém/PA | seguranca | Nota metodológica do Dashboard de Transparência da Segurança Pública (SEGUP-PA) | `https://sistemas.segup.pa.gov.br/transparencia/metodologia-dashboard/` | painel/dashboard | distrito/bairro | mensal, 'entre o primeiro e o quinto dia útil', atraso máximo até dia 10 | `[fetch-ok]` |
| Belém/PA | mobilidade/transito | Belém em Números — Mobilidade Urbana (com pacote de arquivos-fonte) | `https://numeros.belem.pa.gov.br/mobilidade-urbana/` | painel/dashboard | municipio | séries por indicador, várias até 2023 | `[fetch-ok]` |
| Belém/PA | mobilidade/transito | Arquivo-fonte de Mobilidade Urbana de Belém (Google Drive) | `https://drive.google.com/file/d/12wxf4A0ZSFV-cC8cTefQ62IsH042TTxq/view` | csv/xlsx | municipio | desconhecido | `[fetch-ok]` |
| Belém/PA | seguranca | Belém em Números — Segurança Pública (Guarda Municipal) | `https://numeros.belem.pa.gov.br/seguranca-publica-2/` | painel/dashboard | distrito/bairro | séries 2012-2024 conforme indicador | `[fetch-ok]` |
| Belém/PA | saude | Belém em Números — Saúde | `https://numeros.belem.pa.gov.br/saude/` | painel/dashboard | equipamento/unidade | desconhecido | `[fetch-ok]` |
| Belém/PA | outro | Anuário Estatístico do Município de Belém (SEGEP) — site do anuário | `https://anuario.belem.pa.gov.br/` | csv/xlsx | municipio | edição 2020 (única encontrada) | `[fetch-ok]` |
| Belém/PA | educacao | Anuário Estatístico de Belém — pacote do capítulo Educação (2020) | `http://ww4.belem.pa.gov.br/wp-content/uploads/arquivos-anuario/2-EDUCACAO-2020.zip` | csv/xlsx | municipio | 2020 | `[fetch-falhou]` |
| Belém/PA | outro | SEGEP Belém — página oficial do Anuário Estatístico | `https://segep.belem.pa.gov.br/gestao/anuario-estatistico-de-belem/` | csv/xlsx | municipio | desconhecido | `[fetch-ok]` |
| Belém/PA | financas/orcamento | Portal da Transparência de Belém — Origem dos Dados (GIIGnet) | `https://portaltransparencia.belem.pa.gov.br/dados-da-gestao/origem-dos-dados/` | portal-dados-abertos | municipio | desconhecido | `[fetch-ok]` |
| Belém/PA | meio-ambiente | SEMMA Belém — Áreas Verdes por bairro | `https://semma.belem.pa.gov.br/areas-verdes/` | pdf/relatorio | distrito/bairro | 2022 | `[fetch-ok]` |
| Porto Velho/RO | outro | PMPV-API — API pública da Prefeitura Municipal de Porto Velho (documentação) | `https://api.portovelho.ro.gov.br/` | api | registro individual | contínua (dados vivos) | `[fetch-ok]` |
| Porto Velho/RO | outro | Especificação OpenAPI 3.1 da PMPV-API | `https://api.portovelho.ro.gov.br/docs/api.json` | api | registro individual | contínua | `[fetch-ok]` |
| Porto Velho/RO | saude | PMPV-API — Média de Tempo de Atendimento das UPAs | `https://api.portovelho.ro.gov.br/api/v1/saude/tempo-atendimento` | api | equipamento/unidade | contínua | `[fetch-ok]` |
| Porto Velho/RO | urbanismo/geo | PMPV-API — Geolocalizações de Obras Públicas | `https://api.portovelho.ro.gov.br/api/v1/obras/geolocalizacoes` | api | equipamento/unidade | contínua | `[fetch-ok]` |
| Porto Velho/RO | financas/orcamento | PMPV-API — Lista de Portais/entidades (Prefeitura, Câmara, IPAM) | `https://api.portovelho.ro.gov.br/api/v1/portais` | api | municipio | contínua | `[fetch-ok]` |
| Porto Velho/RO | outro | Portal de Dados Abertos da Prefeitura de Porto Velho | `https://dadosabertos.portovelho.ro.gov.br/` | portal-dados-abertos | desconhecido | desconhecido | `[fetch-ok]` |
| Porto Velho/RO | financas/orcamento | Portal de Dados Abertos do Estado de Rondônia (CKAN) | `https://dados.ro.gov.br/` | portal-dados-abertos | municipio | desconhecido | `[fetch-ok]` |
| Porto Velho/RO | financas/orcamento | API CKAN de Rondônia — lista completa de datasets e grupos | `https://dados.ro.gov.br/api/3/action/package_list` | api | municipio | desconhecido | `[fetch-ok]` |
| Rio Branco (via catálogo estadual do Acre)/AC | outro | Portal de Dados Abertos do Estado do Acre (CKAN) | `https://dados.ac.gov.br/` | portal-dados-abertos | municipio | desconhecido | `[fetch-ok]` |
| Rio Branco (via catálogo estadual do Acre)/AC | outro | API CKAN do Acre — lista completa dos 20 datasets | `https://dados.ac.gov.br/api/3/action/package_list` | api | municipio | desconhecido | `[fetch-ok]` |
| Rio Branco (via catálogo estadual do Acre)/AC | comercio/economia | API CKAN do Acre — recursos com formato confirmado (CSV) | `https://dados.ac.gov.br/api/3/action/current_package_list_with_resources?limit=50` | csv/xlsx | municipio | desconhecido | `[fetch-ok]` |
| Rio Branco (via catálogo estadual do Acre)/AC | financas/orcamento | Portal da Transparência da Prefeitura de Rio Branco | `https://transparencia.riobranco.ac.gov.br/` | painel/dashboard | municipio | desconhecido | `[fetch-ok]` |
| Palmas/TO | financas/orcamento | Prefeitura de Palmas — Portal de Dados Abertos | `https://dadosabertos.palmas.to.gov.br/` | portal-dados-abertos | registro individual | desconhecido | `[fetch-ok]` |
| Palmas/TO | financas/orcamento | Portal da Transparência de Palmas | `http://portaldatransparencia.palmas.to.gov.br/` | desconhecido | desconhecido | desconhecido | `[nao-testado]` |
| Manaus/AM | outro | Prefeitura de Manaus / CGM — Dados Abertos | `https://www.manaus.am.gov.br/cgm/dados-abertos/` | portal-dados-abertos | registro individual | irregular (item mais recente visto: folha de estagiários julho/2023) | `[fetch-ok]` |
| Manaus/AM | financas/orcamento | Portal da Transparência do Estado do Amazonas — API de Dados Abertos | `https://www.transparencia.am.gov.br/dados-abertos-2/` | api | registro individual | desconhecido | `[fetch-ok]` |
| Manaus/AM | seguranca | SSP-AM — Estatísticas de criminalidade | `https://www.ssp.am.gov.br/ssp-dados/` | painel/dashboard | desconhecido | desconhecido | `[fetch-ok]` |
| Manaus/AM | seguranca | SSP-AM — Anuário de Estatística 2025 (PDF) | `https://www.ssp.am.gov.br/wp-content/uploads/2025/05/Anuario-2025-SSP-AM.pdf` | pdf/relatorio | desconhecido | anual | `[nao-testado]` |
| Manaus/AM | financas/orcamento | Portal da Transparência de Manaus | `https://transparencia.manaus.am.gov.br/` | desconhecido | desconhecido | desconhecido | `[fetch-ok]` |
| Manaus/AM | urbanismo/geo | Mapa de Manaus (programa municipal) | `https://mapademanaus.manaus.am.gov.br/` | desconhecido | desconhecido | sem atualização aparente desde 2019 | `[fetch-ok]` |
| Macapá/AP | outro | Prefeitura de Macapá — Dados Abertos | `https://macapa.ap.gov.br/dados-abertos/` | pdf/relatorio | municipio | parado em 13/07/2022 | `[fetch-ok]` |
| Macapá/AP | financas/orcamento | Portal da Transparência da Prefeitura de Macapá | `https://macapa.ap.gov.br/portaldatransparencia/` | painel/dashboard | municipio | desconhecido | `[fetch-ok]` |
| Macapá/AP | outro | Página intermediária 'Dados Abertos' do Portal da Transparência de Macapá | `https://macapa.ap.gov.br/portaldatransparencia/dados-abertos/` | pdf/relatorio | desconhecido | desconhecido | `[fetch-ok]` |

## Achados

Transcrição literal de `why` e `coverage_notes` de cada candidato.

### Execução 1 — agente `execucao-1`

#### 1. Belém (e Região Metropolitana de Belém)/PA — região: Norte

**`why` (por que o agente apontou esta candidata):**

É o melhor caso do Norte, mas por mérito ESTADUAL, não municipal. O Pará é o único estado da região onde consegui abrir, nesta sessão, fontes com (a) granularidade fina de verdade (crime por BAIRRO), (b) atualização recente comprovada (dados criminais até 30/06/2026) e (c) um produto estatístico multi-domínio com planilhas baixáveis (FAPESPA, 142 indicadores, 144 municípios, 12 Regiões de Integração). Belém ainda tem um Anuário Estatístico municipal próprio em XLSX cobrindo 14 capítulos - o único produto municipal genuinamente multi-domínio que encontrei em todo o Norte. Ressalva grande: esse anuário está parado em 2020.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

A mais equilibrada do Norte, mas desigual entre níveis de governo. FORTE e recente: segurança (CODEC/SIAC, bairro, jun/2026) - este é o ativo real. MÉDIO: economia, meio ambiente, infraestrutura, social/educação/saúde via FAPESPA (planilhas, nível município/RI, não bairro). FRACO/PARADO: o único produto municipal multi-domínio (Anuário de Belém, XLSX, 795 itens, saúde+educação+segurança+habitação+meio ambiente+turismo+mapas) é edição 2020. VAZIO: mobilidade/trânsito (SEMOB não publica dado aberto que eu tenha conseguido abrir) e finanças estaduais (web service com certificado expirado). Se o piloto exigir dado MUNICIPAL fresco, Belém entrega quase só segurança via estado.

#### 2. Manaus/AM — região: Norte

**`why` (por que o agente apontou esta candidata):**

Segunda colocada por eliminação, não por qualidade. É o único caso do Norte com API REST oficial declarada (Transparência AM) e um painel criminal estadual navegável até nível de zona da cidade. Mas o conjunto é fortemente enviesado para finanças/pessoal, e o dado municipal próprio é quase inexistente.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Concentração severa em 1 domínio. Finanças/orçamento/pessoal/licitações/obras: bem coberto (API REST estadual + portal municipal). Segurança: painel Power BI da SSP-AM com recorte por zonas de Manaus e delegacias, mas SEM CSV/XLSX - só visualização e notas técnicas em PDF. Saúde, educação, mobilidade/trânsito, comércio: não encontrei nenhuma fonte municipal aberta que eu tenha conseguido abrir. Urbanismo/geo: 'Mapa de Manaus' é projeto de aerofotogrametria/cadastro, sem camadas para download. Meio ambiente: nada municipal - depende do INPE. Reprovaria no critério 3 (cobertura equilibrada).

#### 3. Palmas/TO — região: Norte

**`why` (por que o agente apontou esta candidata):**

Tem o portal de dados abertos MUNICIPAL mais bem documentado que encontrei no Norte - 13 seções, cada uma com descrição dos campos e exportação em 9 formatos incluindo CSV. O problema é que é 100% finanças e administração. Não é um portal de dados da cidade; é um portal de contabilidade.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura totalmente concentrada em 1 domínio (finanças/orçamento/administração). As 13 seções são: Folha de Pagamento, Contratos, Receitas, Despesas, Obras, Licitação, Doações, Veículos, Patrimônio, Diárias, Liquidações, Pagamentos e Participação/Controle Social (Ouvidoria e e-SIC). ZERO saúde, ZERO educação, ZERO segurança, ZERO trânsito/mobilidade, ZERO meio ambiente, ZERO urbanismo. É exatamente o caso que o critério 3 manda penalizar - e o pico dele é em finanças, não em algo de interesse cidadão direto.

#### 4. Porto Velho/RO — região: Norte

**`why` (por que o agente apontou esta candidata):**

Incluída porque foi o único município do Norte, além dos acima, com indício de API própria (api.portovelho.ro.gov.br). Mas ao abrir, é só página de termos de uso - nenhum endpoint, nenhum Swagger/OpenAPI, nenhum domínio de dados declarado. Não dá para construir piloto sobre isso.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Não avaliável de forma equilibrada: não consegui confirmar NENHUM domínio de dados. O que aparece verificável em busca é transparência de licitações/compras/fornecedores, ou seja, finanças. A API existe como URL viva mas sem documentação técnica exposta.

#### 5. Boa Vista/RR — região: Norte

**`why` (por que o agente apontou esta candidata):**

Avaliada e reprovada por falta de evidência. O portal de transparência municipal não é da prefeitura: redireciona (301) para portal de fornecedor terceirizado (portalcr2.com.br). Esse padrão indica transparência contábil terceirizada sem catálogo de dados próprio.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Sem cobertura demonstrável. Não consegui confirmar nenhum domínio - a página renderizou apenas o título. Rio Branco/AC, Macapá/AP, Santarém/PA, Marabá/PA e Ananindeua/PA eu NÃO testei individualmente; não afirmo nada sobre elas e não inventei linha para nenhuma.

#### 6. Nacional (camada federal que sustenta qualquer piloto no Norte)/BR — região: Nacional

**`why` (por que o agente apontou esta candidata):**

Recomendação honesta de arquitetura: no Norte, a amplitude de domínios NÃO existe no nível municipal. Se o piloto precisa de 6-8 domínios, ele terá que ser federal-com-recorte-municipal, complementado pela joia local (CODEC/SEGUP-PA para segurança por bairro). O TerraBrasilis do INPE é o caso mais forte: dado ambiental com granularidade municipal para toda a Amazônia Legal, em shapefile, atualizado em março de 2026 - e meio ambiente é justamente o domínio em que o Norte é mais rico que o resto do Brasil.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Complementa exatamente os vazios locais: meio ambiente (INPE PRODES/DETER, municipal, shapefile, mar/2026) cobre o buraco ambiental de Belém, Manaus, Santarém etc. Segurança nacional comparável (SINESP) eu NÃO consegui confirmar - ver red flags. Saúde (DATASUS), educação (INEP) e economia (IBGE/RAIS) não foram testadas nesta sessão e por isso NÃO estão listadas como fontes.

### Execução 2 — agente `execucao-2`

#### 1. Belém/PA — região: Norte

**`why` (por que o agente apontou esta candidata):**

É o único município do Norte com um produto de dados realmente MULTIDOMÍNIO e navegável: o painel 'Belém em Números' organiza 15 temas (saúde, educação, segurança, mobilidade, meio ambiente, gestão fiscal, habitação, economia, agricultura, trabalho, turismo, cultura, assistência social, saneamento, demografia) e cada página temática oferece o arquivo-fonte para download. Além disso, Belém é a única capital do Norte cujo dado criminal é publicado com granularidade de BAIRRO e atualização mensal (SEGUP-PA / SIAC, base até 30/06/2026) — isso resolve o domínio segurança, que é justamente onde quase toda a região falha. Ressalva importante: o acesso é 'file-drop' (arquivos .rar no Google Drive), não API; e o Anuário Estatístico, que seria a peça mais rica, está com os downloads quebrados.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura EQUILIBRADA e a melhor da região: existem dados com evidência verificada em segurança (bairro, mensal, 2026), mobilidade (séries 2013-2023), saúde (5 subáreas), meio ambiente (áreas verdes por bairro 2022), finanças (GIIGnet), educação, habitação, economia e social. O ponto fraco é uniforme, não localizado: nenhum domínio tem API; a maioria é painel + arquivo compactado. Segurança é o domínio mais forte (via estado). Meio ambiente é o mais fraco (só imagens).

#### 2. Porto Velho/RO — região: Norte

**`why` (por que o agente apontou esta candidata):**

É de longe o MELHOR ACESSO TÉCNICO do Norte e provavelmente o único caso da região com API REST pública, documentada em OpenAPI 3.1, sem autenticação e retornando JSON ao vivo. Confirmei 79 endpoints, incluindo dado operacional real de saúde (tempo médio de espera nas UPAs/policlínicas, por unidade) e obras georreferenciadas com lat/lng. Se o critério fosse só 'acesso realmente aberto', Porto Velho seria o nº 1 da região. Perde para Belém no critério 3 (cobertura equilibrada): a API é fortemente concentrada em finanças/transparência.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

COBERTURA CONCENTRADA — este é o ponto fraco. Dos 79 endpoints, a esmagadora maioria é financas/orcamento (receitas, despesas, empenhos, liquidações, pagamentos, licitações, atas, contratos, fornecedores, dívida ativa, emendas, RH/folha). Fora disso há exatamente 2 ilhas: 1 endpoint de saúde (/saude/tempo-atendimento) e 1 de urbanismo/geo (/obras/geolocalizacoes). NÃO há educação, NÃO há segurança, NÃO há mobilidade, NÃO há meio ambiente. O portal estadual (dados.ro.gov.br) não cobre essas lacunas: tem grupos 'saude' e 'seguranca-publica' criados mas VAZIOS.

#### 3. Rio Branco (via catálogo estadual do Acre)/AC — região: Norte

**`why` (por que o agente apontou esta candidata):**

Terceiro colocado por um motivo específico e verificável: o Acre é o único estado do Norte cujo portal de dados abertos publica CSV limpo COM RECORTE MUNICIPAL em vários domínios distintos (economia, demografia, educação/infraestrutura escolar, saúde per capita, energia, comércio externo, frota de veículos), via API CKAN funcional. Isso dá a Rio Branco um conjunto pequeno mas temáticamente espalhado e imediatamente consumível por pipeline. O município em si, porém, não tem portal de dados abertos.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

Cobertura ESPALHADA MAS RASA — o oposto de Porto Velho. Há 1 dataset em saúde, 1 em educação, 6 em demografia, 4 em agropecuária, 4 em comércio/serviços, 1 em energia, 2 em administração pública. Nenhum dataset de segurança, mobilidade/trânsito, urbanismo ou meio ambiente. E quase tudo é indicador anual derivado de IBGE, não dado administrativo primário da cidade. Serve para contexto/benchmark, não para serviço ao cidadão.

#### 4. Palmas/TO — região: Norte

**`why` (por que o agente apontou esta candidata):**

Tem um portal de dados abertos municipal DEDICADO e funcional (dadosabertos.palmas.to.gov.br) com exportação em múltiplos formatos abertos, incluindo CSV e ODS. Em qualidade de acesso é decente. Mas é o exemplo perfeito do que o critério 3 manda penalizar: é monotemático.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

COBERTURA MUITO CONCENTRADA — reprovado no critério 3. Todos os 14 conjuntos são de finanças/administração. Confirmei ausência de saúde, educação, segurança, mobilidade, urbanismo e meio ambiente.

#### 5. Manaus/AM — região: Norte

**`why` (por que o agente apontou esta candidata):**

Incluída por ser a maior cidade da região (e a maior do Brasil fora do Sudeste/Sul/Nordeste litorâneo) e porque a equipe pediu avaliação explícita dela — mas o veredicto é NEGATIVO e isso é o achado relevante: Manaus é desproporcionalmente pobre em dado público aberto para o seu tamanho. Não recomendo como piloto. Se o projeto quiser Manaus por relevância política/populacional, precisará contar com raspagem e Lei de Acesso à Informação, não com dado aberto pronto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

COBERTURA QUASE NULA. O portal de dados abertos da CGM entrega essencialmente folha de pagamento, pedidos de e-SIC e informações classificadas, em arquivo de texto. Não encontrei dado municipal aberto de saúde, educação, mobilidade, urbanismo ou meio ambiente. Segurança existe só como painel Power BI estadual, sem CSV. O melhor acesso estruturado disponível é a API REST do estado do Amazonas — e ela é 100% fiscal.

#### 6. Macapá/AP — região: Norte

**`why` (por que o agente apontou esta candidata):**

Incluída como piso da régua e como alerta: o portal ANUNCIA 'dados abertos' em 11 domínios (inclusive Saúde Municipal e Educação Municipal), o que numa triagem superficial pareceria excelente cobertura equilibrada — mas na verificação todos os itens são o MESMO relatório em PDF, datado de 13/07/2022. É o caso mais claro da região de rótulo de dado aberto sem dado aberto. NÃO recomendo como piloto.

**`coverage_notes` (cobertura por domínio, palavras do agente):**

COBERTURA APARENTE ampla, COBERTURA REAL nula. Os 11 domínios (Assistência Social, COVID-19, Patrimônio, Educação Municipal, Informação ao Cidadão, Licitações, Limpeza Urbana, Obras Municipais, Orçamento Público, Saúde Municipal) existem como rótulos, mas o recurso por trás é sempre 'Relatório Analítico PMM' em PDF, sem dado tabular.

## Correções (o que eu mesmo derrubei)

Nada a registrar **nesta transcrição**: o transcritor não fez busca e portanto não derrubou nenhuma afirmação própria.
As autocorreções que os agentes de pesquisa fizeram estão dentro dos textos de `why`, `coverage_notes`, `red_flags` e `method_notes` acima e abaixo, preservadas na íntegra.

**Atenção — duas execuções independentes deste mesmo label existem no journal (2).** Elas não foram fundidas nem reconciliadas. Onde discordarem (inclusive sobre a cidade vencedora ou sobre o status de uma mesma URL), a divergência é informação e fica visível de propósito.

## Fraquezas e riscos

Transcrição literal de `red_flags` de cada candidato.

### Execução 1 — agente `execucao-1`

**Belém (e Região Metropolitana de Belém)/PA — `red_flags`:**

1) Anuário municipal 6 anos defasado (edição 2020, página atualizada 20/10/2022). 2) transparencia.pa.gov.br com CERTIFICADO EXPIRADO - confirmei por WebFetch ('certificate has expired') e por curl (SEC_E_CERT_EXPIRED). 3) SEMAS-PA (meio ambiente/geo) devolveu 403 em duas URLs distintas - não pude confirmar o download de shapefiles que a notícia institucional alega. 4) CODEC limita consulta a período de 1 ano e não declara o formato exato do arquivo exportado. 5) O site oficial da COP30 em Belém NÃO tem dados abertos - só PDFs de logística; não conte com legado de dados do megaevento. 6) Portal de transparência municipal (GIIGnet) não documenta CSV nem API.

**Manaus/AM — `red_flags`:**

1) O 'Dados Abertos' da CGM de Manaus é praticamente vazio de domínios: só folha de pagamento, estagiários, informações classificadas e pedidos de acesso - e em TXT, não CSV. 2) SSP-AM não oferece download; painel Power BI é dead-end para pipeline. 3) Portal do Planejamento do AM (Mapas SEDECTI) com SERVIÇOS SUSPENSOS por legislação eleitoral - li o aviso na própria página. 4) transparencia.manaus.am.gov.br abriu mas é aplicação JS: só o título renderizou, não pude confirmar dataset algum. 5) O Anuário Estatístico do Amazonas mais recente que apareceu em busca é de 2019, em PDF (não o listei como fonte por não tê-lo aberto).

**Palmas/TO — `red_flags`:**

1) O portal FALHOU no WebFetch por cadeia de certificado incompleta ('unable to verify the first certificate') - abre 200 no curl, mas quebra em cliente rigoroso e em muitas bibliotecas HTTP. Risco real de engenharia. 2) Rodapé 'Copyright 2021' - sinal de portal sem manutenção. 3) O download é via botão 'IMPRIMIR' com seleção de formato, não endpoint de dados - padrão hostil a automação. 4) CRÍTICO: os sites do GOVERNO DO TOCANTINS (to.gov.br) estão FORA por lei eleitoral até o fim das eleições de 2026, então o complemento estadual de Palmas (inclusive estatística criminal) fica indisponível durante todo o piloto.

**Porto Velho/RO — `red_flags`:**

A 'API Docs' não documenta nada - só regras de uso. Ou a documentação está atrás de outra rota que não descobri, ou a API é fachada. NÃO testei transparencia.portovelho.ro.gov.br nesta sessão, portanto não afirmo nada sobre ele.

**Boa Vista/RR — `red_flags`:**

Redirecionamento cross-host para portal privado. Conteúdo não legível por WebFetch (só título). Tratar como 'sem evidência', NÃO como 'confirmadamente ruim' - a diferença importa para o auditor.

**Nacional (camada federal que sustenta qualquer piloto no Norte)/BR — `red_flags`:**

1) dados.mj.gov.br NÃO RESOLVE DNS - WebFetch retornou ENOTFOUND e nslookup não trouxe registro A público. O domínio de dados abertos do Ministério da Justiça, que aparece em buscas como fonte do SINESP, está inacessível hoje. 2) dados.gov.br abre (200) mas é SPA: a página do conjunto SINESP renderizou apenas o título, então NÃO pude confirmar recursos, formatos, granularidade municipal nem data de atualização. Não assuma que o SINESP municipal está disponível sem testar em navegador real. 3) Não verifiquei DATASUS/INEP/IBGE nesta sessão - qualquer afirmação sobre eles seria invenção minha.

### Execução 2 — agente `execucao-2`

**Belém/PA — `red_flags`:**

(1) Os ZIPs do Anuário Estatístico (ww4.belem.pa.gov.br/wp-content/uploads/arquivos-anuario/*.zip) retornam HTTP 403 em todos os temas testados — link publicado, arquivo inacessível. (2) O Anuário é edição 2020 apenas (6 anos defasado). (3) A 'Lista de indicadores disponíveis para download' é ela mesma um PDF de 2023 — anti-padrão de dado aberto. (4) Downloads temáticos dependem do Google Drive de terceiros e vêm em .rar (formato proprietário, ruim para pipeline). (5) O Portal da Transparência municipal não declara CSV/XLSX/API — só consulta em tela. (6) O dado de segurança é ESTADUAL (SEGUP-PA), não municipal: se o piloto depender dele, a dependência é do governo do PA. (7) SEMMA publica % de área verde por bairro apenas como imagens, sem tabela. (8) Não encontrei GTFS nem geoserviço municipal (WMS/WFS/ArcGIS) para Belém.

**Porto Velho/RO — `red_flags`:**

(1) Desequilíbrio temático severo: ~95% dos endpoints são fiscais. (2) /receitas/total-por-ano retorna HTTP 422 exigindo 'portal id' — a API tem parâmetros obrigatórios não óbvios, ou seja, exige leitura de spec para uso básico. (3) O campo /obras/geolocalizacoes tem qualidade ruim: vi registros com lat/lng NULL e coordenadas em texto malformado (ex. 'geolocalizacao_inicio':'8º46\'00' sem hemisfério, e '8º74\'70' que é minuto inválido >60). (4) O dado de saúde é média agregada em STRING formatada ('0 horas 09 minutos e 48 segundos'), não número — precisa parsing. (5) A spec declara 'security: http', sugerindo auth prevista, embora as chamadas anônimas tenham funcionado. (6) O portal dadosabertos.portovelho.ro.gov.br abriu mas não expôs catálogo legível de datasets; testei o padrão CKAN /api/3/action/package_list e deu HTTP 404 (não é CKAN). (7) O portal estadual de RO tem apenas 14 datasets, todos administrativos.

**Rio Branco (via catálogo estadual do Acre)/AC — `red_flags`:**

(1) O catálogo é ESTADUAL, não de Rio Branco; o município aparece como linha nas tabelas. (2) Só 20 datasets no total. (3) Os grupos 'Ciência, Tecnologia e Inovação', 'Cultura' e 'Emprego e Renda' têm ZERO datasets — vitrine vazia. (4) Não há série temporal recente declarada nas páginas que abri; a periodicidade de atualização não está clara. (5) O Portal da Transparência de Rio Branco NÃO tem seção de dados abertos nem download em massa — é consulta em tela. (6) O domínio dadosabertos.ac.gov.br que testei não resolve (só dados.ac.gov.br funciona).

**Palmas/TO — `red_flags`:**

(1) Zero dados de política pública setorial — só execução orçamentária e pessoal. (2) Nenhuma API mencionada; exportação é por tela. (3) Oferece PDF, WORD e RTF na mesma lista de 'formatos', o que indica exportador genérico de relatório e não publicação de dado estruturado por desenho. (4) Não testei o Portal da Transparência de Palmas (portaldatransparencia.palmas.to.gov.br) — marcado como não verificado. (5) Os domínios dados.to.gov.br e dadosabertos.to.gov.br que testei por hipótese não resolvem: não localizei portal estadual de dados abertos do Tocantins.

**Manaus/AM — `red_flags`:**

(1) Não existe portal de dados abertos municipal em domínio dedicado: testei dadosabertos.manaus.am.gov.br e dados.manaus.am.gov.br e nenhum resolve. (2) A página de dados abertos da CGM é sobretudo doutrina ('dados devem ser completos, primários, atuais...') com pouquíssimo dado real, em formato TXT, e o item de estagiários é de julho/2023. (3) transparencia.manaus.am.gov.br força redirect de HTTPS para HTTP e não renderizou catálogo legível. (4) SSP-AM publica só dashboard Power BI, sem CSV/XLSX/API; o granular declarado é zona e DIP, não bairro — inferior ao SIAC do Pará. (5) covid19.manaus.am.gov.br, citado em buscas como fonte de CSV, NÃO responde (conexão falha) — provável portal desativado. (6) mapademanaus.manaus.am.gov.br está no ar mas é página institucional de programa de 2019 (WordPress, ativos de /wp-content/uploads/2019/07), sem ArcGIS/GeoServer/WMS/WFS: não é geoportal. (7) Não encontrei GTFS para o transporte coletivo de Manaus; o que existe é o app proprietário 'Cadê Meu Ônibus' do Sinetram.

**Macapá/AP — `red_flags`:**

(1) Todos os itens têm o MESMO título ('Relatório Analítico PMM') e a MESMA data (13/07/2022) — 4 anos parado. (2) Formato PDF, que pelo critério 2 vale pouco. (3) O portal terceiriza parte da 'transparência' para governotransparente.com.br, fornecedor privado, o que fragiliza a estabilidade das URLs. (4) transparencia.macapa.ap.gov.br redireciona 301 para outro host. (5) Não há qualquer API, CSV ou XLSX declarado.

## O que não consegui verificar, e por quê

### Execução 1 — agente `execucao-1` — `method_notes` (literal)

COMO BUSQUEI. ~14 WebSearch e ~22 WebFetch. Toda URL marcada fetch-ok foi realmente aberta por mim com WebFetch nesta sessao; o campo evidence traz trecho ou fato concreto que a pagina devolveu. Buscas feitas: portal dados abertos Manaus; portal dados abertos Belem/PA; dados abertos Palmas TO + CKAN; Belem COP30 geoportal; dados.pa.gov.br / dadosabertos.pa.gov.br; SEGUP-PA estatisticas criminais download; FAPESPA anuario/base de dados; Manaus geoportal IMPLURB; SEMAS-PA geoportal/shapefile; Regulariza Para SIG; SSP-AM indicadores + ssp.am.gov.br estatisticas; dados.to.gov.br; SSP-TO estatisticas + SEPLAN TO; transparencia.pa.gov.br dados abertos; SESPA/SEDUC-PA paineis; dados abertos Porto Velho/Rio Branco/Boa Vista/Macapa; "Perfil da Cidade de Manaus"/"Manaus em Dados"; prefeitura.belem.pa.gov.br dados abertos.

VEREDITO DIRETO: o Norte e FRACO em dados publicos municipais abertos, e nao vou maquiar isso. Nao encontrei UM UNICO catalogo municipal multi-dominio (nada parecido com dados.prefeitura.sp.gov.br, data.rio ou dados.pbh.gov.br) em nenhuma capital do Norte. Os tres portais municipais de "dados abertos" que examinei - Manaus (CGM), Palmas e o de Belem - sao, na pratica, portais de transparencia contabil. Manaus chega a oferecer apenas folha de pagamento e pedidos de acesso, em TXT. O melhor ativo real da regiao NAO e municipal: e o CODEC/ESTATISTICA SIAC da SEGUP-PA, que da crime por BAIRRO para 144+ municipios, 16 naturezas, atualizado ate 30/06/2026, com download de tabela. Essa e a peca em que eu apostaria o piloto.

DUAS DESCOBERTAS DE CONTEXTO QUE MUDAM A DECISAO E NAO ESTAVAM NO ENUNCIADO:
(1) LEI ELEITORAL 2026. Estamos em 31/07/2026, ano de eleicoes gerais, e sites de governos estaduais do Norte estao com servicos suspensos. Comprovei em DUAS paginas distintas que eu mesmo abri: www.to.gov.br/ssp/estatisticas-criminais/ devolveu SOMENTE aviso de que sites e redes do governo do TO ficam inativos de 4 de julho ate o fim das eleicoes de 2026; e portaldoplanejamento.am.gov.br/mapas-sedecti/ devolveu aviso de servicos suspensos por legislacao eleitoral. Consequencia pratica: um piloto iniciado agora encontrara fontes estaduais intermitentes ate ~novembro/2026. Isso favorece o Para (SEGUP/CODEC e FAPESPA continuavam servindo conteudo quando testei) e desfavorece o Tocantins.
(2) INFRAESTRUTURA TLS/DNS PODRE. Tres falhas reais de rede, nao erro meu: transparencia.pa.gov.br com certificado EXPIRADO (WebFetch: "certificate has expired"; curl: SEC_E_CERT_EXPIRED); dadosabertos.palmas.to.gov.br com cadeia incompleta ("unable to verify the first certificate") - abre 200 no curl mas quebra em cliente rigoroso; e dados.mj.gov.br sem resolucao DNS (ENOTFOUND + nslookup sem registro A). Orce tempo de engenharia para contornar TLS/DNS no Norte.

O QUE NAO CONSEGUI CONFIRMAR (e portanto nao afirmo):
- SEMAS-PA / CAR-PA (meio ambiente e geo do Para): 403 Forbidden em duas URLs (car.semas.pa.gov.br e a noticia institucional de 02/10/2025). A noticia alega download publico de shapefiles; eu NAO validei.
- SINESP municipal: dados.mj.gov.br morto; via dados.gov.br a pagina e SPA e so o titulo renderizou.
- transparencia.manaus.am.gov.br, dados.gov.br e transparencia.boavista.rr.gov.br: abriram, mas sao aplicacoes JS e o WebFetch so extraiu o titulo. Marquei fetch-ok com evidence dizendo exatamente isso, para o auditor nao confundir "abriu" com "tem dado".
- Tabviva (tabulador de saude da SESPA-PA, https://www.saude.pa.gov.br/a-secretaria/diretorias/dvs/coordenacao-estadual-de-doencas-e-agravos-nao-transmissiveis-vigidant/tabviva-tabuladores-de-dados/): abri, mas e so indice de navegacao - nao especifica bases (SIM/SINAN/SIH), exportacao nem granularidade. NAO listei como fonte de saude porque nao comprova nada util.
- NAO testei: Rio Branco/AC, Macapa/AP, Santarem/PA, Maraba/PA, Ananindeua/PA, DATASUS, INEP, IBGE Cidades, DETRAN-AM/PA, SEMOB Belem. Nao ha linha inventada para nenhum deles.

DISCLOSURE DE METODO (importante para o auditor): em tres momentos usei Bash/curl/nslookup para DIAGNOSTICAR falha de rede - status HTTP de dadosabertos.palmas.to.gov.br, validade do certificado de transparencia.pa.gov.br e resolucao DNS de dados.mj.gov.br. Uma vez usei curl -k para LER o conteudo do portal de Palmas que o WebFetch recusava por certificado; o inventario das 13 secoes de Palmas vem dessa leitura via curl, NAO de WebFetch, e por isso mantive aquela fonte como fetch-falhou (nao fetch-ok) e disse isso no proprio campo evidence. Nenhuma outra fonte usa evidencia de curl.

RECOMENDACAO DE PILOTO: Belem/PA, com arquitetura hibrida e expectativa calibrada. Ancore em CODEC/SEGUP-PA (seguranca por bairro, mensal, recente) + FAPESPA Anuario 2024 e Radar 2024 (multi-dominio, planilhas, municipio/Regiao de Integracao) + INPE TerraBrasilis (meio ambiente municipal, shapefile). Trate o Anuario Estatistico de Belem 2020 (XLSX, 14 capitulos, 795 itens) como linha de base historica valiosa, nao como dado corrente. NAO prometa mobilidade/transito em nenhuma cidade do Norte: nao achei fonte aberta para isso em lugar algum da regiao.

#### Fontes que a execução 1 NÃO confirmou (4 de 25)

- `[fetch-falhou]` **Belém (e Região Metropolitana de Belém)/PA** — Transparência Pará - Web Services de receitas/despesas/servidores — `https://transparencia.pa.gov.br/?q=node%2F49`
  - motivo/evidência registrada pelo agente: FALHA REAL DE INFRAESTRUTURA: WebFetch retornou 'certificate has expired'. Confirmei independentemente por curl: 'schannel: SEC_E_CERT_EXPIRED (0x80090328) - The received certificate has expired'. O host responde 301 quando se ignora a validação TLS, mas não há HTTPS válido. Não pude confirmar endpoints, formatos nem documentação.
- `[fetch-falhou]` **Belém (e Região Metropolitana de Belém)/PA** — SEMAS-PA / Portal CAR Pará - consulta de mapa e camadas ambientais — `http://car.semas.pa.gov.br/#/consulta/mapa`
  - motivo/evidência registrada pelo agente: HTTP 403 Forbidden. A página institucional da SEMAS de 02/10/2025 que alega disponibilização pública de dados geoespaciais (https://www.semas.pa.gov.br/2025/10/02/semas-disponibiliza-dados-geoespaciais-do-para-para-planejamento-federal-e-integracao-territorial/) também retornou 403. Portanto NÃO confirmei o download de shapefiles de zoneamento, unidades de conservação, supressão vegetal e territórios quilombolas que as buscas atribuem a esse portal.
- `[fetch-falhou]` **Palmas/TO** — Prefeitura de Palmas - Portal de Dados Abertos — `https://dadosabertos.palmas.to.gov.br/`
  - motivo/evidência registrada pelo agente: WebFetch falhou DUAS vezes com 'unable to verify the first certificate' (cadeia TLS incompleta). Para não chutar o conteúdo, li via curl -k, que retornou HTTP 200 - e por isso mantenho verified=fetch-falhou, não fetch-ok. O que o curl mostrou: 13 seções, todas financeiras/administrativas (Folha de Pagamento, Contratos, Receitas, Despesas, Obras, Licitação, Doações, Veículos, Patrimônio, Diárias, Liquidações, Pagamentos, Participação/Controle Social). Cada seção repete: 'Para download/impressão dessas informações, deve-se selecionar o formato desejado (PDF, WORD, RTF, EXCEL, HTML, TXT, ODT, ODS e CSV) e clicar na opção IMPRIMIR'.
- `[fetch-falhou]` **Nacional (camada federal que sustenta qualquer piloto no Norte)/BR** — Dados Abertos do Ministério da Justiça - conjunto SINESP (Sistema Nacional de Estatísticas de Segurança Pública) — `https://dados.mj.gov.br/dataset/sistema-nacional-de-estatisticas-de-seguranca-publica`
  - motivo/evidência registrada pelo agente: FALHA DE DNS: WebFetch retornou 'getaddrinfo ENOTFOUND dados.mj.gov.br'. Confirmei com nslookup, que não devolveu registro A público para o host (apenas o endereço do resolvedor local). O domínio simplesmente não resolve nesta sessão, embora apareça em resultados de busca como fonte oficial do SINESP.

### Execução 2 — agente `execucao-2` — `method_notes` (literal)

VEREDICTO REGIONAL, DIRETO: a Região Norte é FRACA em dado público aberto. Não encontrei, em nenhum dos 7 estados, um catálogo municipal multidomínio de verdade (padrão CKAN com saúde + educação + segurança + mobilidade + ambiente publicados como CSV/API). O padrão dominante é 'transparência fiscal com rótulo de dados abertos'. Recomendação prática de piloto: BELÉM/PA como piloto principal (maior amplitude de domínios com arquivo realmente baixável, e o único caso com crime por BAIRRO e atualização mensal, via SIAC/SEGUP-PA, base até 30/06/2026) + PORTO VELHO/RO como piloto técnico (única API REST pública documentada em OpenAPI que encontrei na região, com dado vivo). Belém ganha no critério 3 (equilíbrio); Porto Velho ganha no critério 2 (acesso). Nenhuma das duas ganha nos dois ao mesmo tempo.

COMO BUSQUEI: (a) WebSearch por portais municipais e estaduais ('portal dados abertos <cidade>', 'dadosabertos <cidade>', CKAN, GTFS, geoportal, estatísticas criminais, anuário estatístico); (b) WebFetch para abrir e ler cada página citada; (c) curl (Bash) para o que WebFetch não consegue ver — códigos HTTP, redirects, hrefs de download, APIs JSON e inspeção de HTML por assinatura de geoserviço.

DIVULGAÇÃO DE FERRAMENTA (leia isto antes de auditar o campo 'verified'): o schema define fetch-ok como 'abri com WebFetch'. Eu marquei fetch-ok também para URLs que abri com curl em vez de WebFetch, porque nesses casos a evidência é mais forte (JSON bruto, código HTTP, nome de arquivo real) e não menos. Em TODO campo 'evidence' eu digo explicitamente qual ferramenta usei ('Aberto com WebFetch' vs 'Verificado via curl'). As URLs verificadas SÓ por curl são: api.portovelho.ro.gov.br/docs/api.json, os 3 endpoints /api/v1/* de Porto Velho, dados.ro.gov.br/api/3/action/package_list, os 2 endpoints da API CKAN do Acre, drive.google.com/file/d/12wxf4A0ZSFV..., mapademanaus.manaus.am.gov.br e o ZIP 403 de Belém. Todo o resto foi WebFetch.

O QUE FALHOU DE VERDADE (informação valiosa, não erro): 1) Downloads do Anuário Estatístico de Belém retornam HTTP 403 em todos os capítulos testados (2-EDUCACAO-2020.zip, 3-SAUDE-2020.zip, 5-SEGURANCA-PUBLICA-2020.zip), inclusive com User-Agent de navegador e Referer correto; a variante HTTPS do host ww4.belem.pa.gov.br nem conecta. 2) dadosabertos.portovelho.ro.gov.br NÃO é CKAN: /api/3/action/package_list dá 404. 3) /receitas/total-por-ano da API de Porto Velho retorna 422 exigindo 'portal id'. 4) covid19.manaus.am.gov.br/dados-abertos/ (aparecia em busca como fonte de CSV de vacinação) não responde — conexão falha. 5) numeros.belem.pa.gov.br bloqueia curl (retorna 000) mas responde a WebFetch — por isso extraí os hrefs dele via WebFetch.

DOMÍNIOS QUE TESTEI POR HIPÓTESE E NÃO EXISTEM (não são fontes; são tentativas minhas, todas com falha de conexão): dadosabertos.manaus.am.gov.br, dados.manaus.am.gov.br, dadosabertos.belem.pa.gov.br, dados.belem.pa.gov.br, dados.pa.gov.br, dados.am.gov.br, dados.to.gov.br, dadosabertos.to.gov.br, dados.rr.gov.br, dados.ap.gov.br, dadosabertos.ac.gov.br, dadosabertos.riobranco.ac.gov.br, dadosabertos.boavista.rr.gov.br, dadosabertos.macapa.ap.gov.br, dadosabertos.santarem.pa.gov.br, dadosabertos.ananindeua.pa.gov.br, dadosabertos.maraba.pa.gov.br. Ou seja: dos 10 municípios que vocês listaram, apenas Palmas e Porto Velho têm portal de dados abertos em subdomínio dedicado.

CIDADES QUE NÃO CONSEGUI AVALIAR e por quê (não incluídas como candidatas para não inflar a lista): BOA VISTA/RR — transparencia.boavista.rr.gov.br faz redirect 301 para portalcr2.com.br/entidade/boa-vista (fornecedor privado) e essa página só renderizou o título 'Portal da Transparência | Prefeitura Municipal de Boa Vista - RR (2025 - 2028)', sem menu nem dataset legível; não afirmo nada sobre o conteúdo. SANTARÉM/PA — transparencia.santarem.pa.gov.br responde HTTP 200 (curl) mas eu NÃO abri nem li o conteúdo; status: não avaliado. ANANINDEUA/PA — transparencia.ananindeua.pa.gov.br não resolve; não localizei portal. MARABÁ/PA — não localizei portal de dados abertos.

OUTRAS PISTAS QUE INVESTIGUEI E DESCARTEI: SIPAMCidade/CENSIPAM (panorama.sipam.gov.br) tem registro geoespacial para Belém, mas o material é escala 1:250.000, entregue como 'Banco.mdb' (exige TerraView) e 'Banco.rar' de shapefiles, com restrição declarada de acesso e uso ('Other restrictions') — descartei como base de piloto. FAPESPA-PA e sistemas.pa.gov.br/portaltransparencia/dados-abertos: abri ambos com WebFetch e NÃO renderizaram catálogo (páginas dependentes de JS), então não pude confirmar nada e não os listei como fonte. Não encontrei GTFS para Belém nem para Manaus. Não encontrei geoportal municipal com WMS/WFS/ArcGIS em nenhuma capital do Norte.

RISCO PARA O PROJETO 'iA Brasil': se o piloto for Belém, a maior parte do dado chega como .rar em Google Drive de terceiros e como painel — vocês vão precisar de camada de ingestão manual/semiautomática e de um plano B para o Anuário quebrado. Se for Porto Velho, a ingestão é trivial (API JSON documentada) mas o produto ao cidadão fica quase só fiscal, com apenas uma métrica de saúde real (fila de UPA — que, aliás, é ótima para 'informação simples e útil'). Considerem piloto duplo: Porto Velho para provar a esteira técnica, Belém para provar a amplitude temática.

#### Fontes que a execução 2 NÃO confirmou (3 de 35)

- `[fetch-falhou]` **Belém/PA** — Anuário Estatístico de Belém — pacote do capítulo Educação (2020) — `http://ww4.belem.pa.gov.br/wp-content/uploads/arquivos-anuario/2-EDUCACAO-2020.zip`
  - motivo/evidência registrada pelo agente: FALHA CONFIRMADA: curl retorna HTTP 403 (Forbidden, 199 bytes) inclusive com User-Agent de navegador e Referer da página de origem; a variante HTTPS retorna erro de conexão. Testei também 3-SAUDE-2020.zip e 5-SEGURANCA-PUBLICA-2020.zip — os três dão 403. Os links estão publicados nas páginas temáticas (também localizei 9-MEIO-AMBIENTE-2020.zip e 8-HABITACAO-2020.zip), mas os arquivos NÃO baixam.
- `[nao-testado]` **Palmas/TO** — Portal da Transparência de Palmas — `http://portaldatransparencia.palmas.to.gov.br/`
  - motivo/evidência registrada pelo agente: Apareceu em resultado de busca; NÃO abri esta URL nesta sessão. Não posso afirmar nada sobre conteúdo, formatos ou disponibilidade.
- `[nao-testado]` **Manaus/AM** — SSP-AM — Anuário de Estatística 2025 (PDF) — `https://www.ssp.am.gov.br/wp-content/uploads/2025/05/Anuario-2025-SSP-AM.pdf`
  - motivo/evidência registrada pelo agente: URL apareceu em resultado de busca com título 'A Segurança Pública do Amazonas em números — ANUÁRIO DE ESTATÍSTICA'. NÃO abri o arquivo nesta sessão; não confirmo conteúdo, ano-base nem granularidade. De todo modo é PDF, que vale pouco pelo critério 2.

### Lacunas desta transcrição (do transcritor)

- O journal **não** grava o campo `label`. O vínculo agente→label foi reconstruído pelo prompt `TAREFA:` de `registro local da execução`. Se o orquestrador usou outro label para a mesma tarefa, o nome deste arquivo está errado, mas o conteúdo transcrito não.
- O journal **não** grava tempo de execução, orçamento de busca consumido nem contagem de tentativas por agente. Onde o agente não escreveu isso em `method_notes`, é `nao reportado`.
- O transcritor não abriu nenhuma URL. Portanto **não há confirmação independente** de que uma linha `[fetch-ok]` continue válida hoje.
- **Estado do journal na hora da transcrição:** 50 linhas. Todas parsearam como JSON válido — nenhuma linha truncada foi descartada. O journal estava sendo **apendado ao vivo** por execuções em curso, então pode existir execução mais nova deste label que não está aqui.

## Síntese

**Contagem de fontes deste label:** 60 no total — 53 `[fetch-ok]`, 5 `[fetch-falhou]`, 2 `[nao-testado]`.

**Fontes marcadas [NACIONAL — não pontua]:** 0 (casadas por DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ, RAIS/CAGED no nome da fonte ou na URL).

**Fontes sob candidato de ESCOPO NACIONAL declarado pelo próprio agente:** 3 (não pontuam para cidade nenhuma).

**Fontes que sobram como potencialmente municipais e confirmadas:** no máximo 51 (é [fetch-ok] menos os dois descontos acima, e ainda é um teto — não um número auditado, porque o desconto por republicação de base nacional só sai lendo evidence).

**Candidata que cada execução colocou em primeiro lugar** (ordem devolvida pelo agente, sem reordenação do transcritor):

- Execução 1 (`execucao-1`): **Belém (e Região Metropolitana de Belém)/PA**
- Execução 2 (`execucao-2`): **Belém/PA**

**Ordem completa dos candidatos por execução:**

- Execução 1 (`execucao-1`): Belém (e Região Metropolitana de Belém)/PA · Manaus/AM · Palmas/TO · Porto Velho/RO · Boa Vista/RR · Nacional (camada federal que sustenta qualquer piloto no Norte)/BR

- Execução 2 (`execucao-2`): Belém/PA · Porto Velho/RO · Rio Branco (via catálogo estadual do Acre)/AC · Palmas/TO · Manaus/AM · Macapá/AP

**O que este arquivo NÃO afirma:** nenhum juízo do transcritor sobre qual cidade é melhor. A escolha do piloto é do agente `compilador`, que deve tratar `[fetch-falhou]` e `[nao-testado]` como não-evidência e descontar as fontes `[NACIONAL — não pontua]`.
