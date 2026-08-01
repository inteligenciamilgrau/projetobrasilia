# outliers-cidades-medias — pente-fino em cidades ricas, tecnológicas e industriais

**Status:** concluído
**Última atualização:** 2026-08-01
**Agente:** compilador/outliers-cidades-medias

## Hipótese e regra de avaliação

Riqueza, industrialização, universidade, imigração europeia e reputação de “cidade inteligente” foram usados apenas para montar o universo de busca. Não pontuam por si. A candidata só avança quando há evidência municipal própria de dados reutilizáveis, variedade temática, atualização, recorte territorial e governança.

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Jundiaí/SP | governo aberto | Portal da Transparência — regras de utilização | <https://transparencia.jundiai.sp.gov.br/> | CSV/TXT/XLS declarados; consulta sem cadastro | varia por consulta | portal ativo em 2026 | `[fetch-ok]` |
| Jundiaí/SP | multidomínio | Observatório Jundiaí — notícia de lançamento | <https://jundiai.sp.gov.br/noticias/2021/03/10/observatorio-mostra-jundiai-atraves-de-300-indicadores/> | painel com metadados e série histórica | municipal e, conforme indicador, territorial | periódico por indicador | `[fetch-ok]` |
| Jundiaí/SP | multidomínio/infância | Cidade das Crianças — descrição atual do Observatório | <https://cidadedascriancas.jundiai.sp.gov.br/> | painel; mais de 385 indicadores, 122 ligados às infâncias | municipal/intersetorial | página ativa em 2026 | `[fetch-ok]` |
| Jundiaí/SP | governança | Política Municipal de Dados Abertos e Transparência Ativa | <https://imprensaoficial.jundiai.sp.gov.br/wp-content/uploads/2021/10/145134f6-eb45-4b47-b33a-6373e58ddf9c_Edicao-4978-08-10-2021.pdf> | norma exige formatos abertos, catálogo, série, download e avalia API para bases volumosas | toda a administração municipal | PSE revisto a cada dois anos, segundo a norma | `[fetch-ok]` |
| Jundiaí/SP | urbanismo/território | GEOJundiaí | <https://geo.jundiai.sp.gov.br/geojundiai/> | mapas e consultas geográficas | lote, bairro, equipamentos e zonas | não confirmada por camada | `[fetch-ok]` |
| Toledo/PR | finanças, RH e saúde | API Pública — especificação OpenAPI 3.0 | <https://www.toledo.pr.gov.br/api-publica/docs/api-docs.json> | API REST documentada | registro e, na saúde, mês/ano/unidade | não informada no esquema | `[fetch-ok]` |
| Toledo/PR | indicadores | Indicadores Públicos | <https://www.toledo.pr.gov.br/secretarias/ti/indicadores-publicos> | painel/consulta | municipal | página modificada em 18/12/2025 | `[fetch-ok]` |
| Toledo/PR | governança futura | Implantação de Observatório Econômico e Social | <https://www.toledo.pr.gov.br/noticias/gabinete/toledo-avanca-para-implantacao-de-observatorio-de-indicadores-economicos-e> | projeto de BI, painéis, relatórios e anuário | municipal | projeto em implantação 2025–2026 | `[fetch-ok]` |
| Toledo/PR | saúde | Endpoint `/api/v1/saude` | <https://www.toledo.pr.gov.br/api-publica/api/v1/saude> | resposta real não foi lida pela ferramenta | unidade/mês/ano, segundo a documentação | desconhecida | `[fetch-falhou]` — bloqueio de abertura da ferramenta |
| Jaraguá do Sul/SC | urbanismo/geo | GeoPortal municipal | <https://www.jaraguadosul.sc.gov.br/urbanismo/infraestrutura-de-telecomunicacoes/mapas-e-dados-urbanisticos/geoportal> | mapa e consultas | lote, bairro, rede e zoneamento | não confirmada | `[fetch-ok]` |
| Jaraguá do Sul/SC | atividade econômica/administração | Diretório CIGA | <https://cim.ciga.sc.gov.br/cim/painel/dados/JARAGU%C3%81%20DO%20SUL-83102459000123/> | TSV reutilizável | estabelecimento, evento, setor e protocolo | arquivos de julho/2026 | `[fetch-ok]` |
| São Bento do Sul/SC | urbanismo/geo | Novo GeoBensul — Dados Abertos e Consultas | <https://geo.saobentodosul.sc.gov.br/?page=Dados-Abertos-e-Consultas> | mapas, consultas e alguns downloads | lote, pavimentação, zoneamento e cartografia | aplicações 2023–2026 | `[fetch-ok]` |
| Lajeado/RS | urbanismo/geo | GeoLajeado | <https://www.lajeado.rs.gov.br/conteudo/4878/969?titulo=GeoLajeado+-+Sistema+de+Informa%C3%A7%C3%B5es+Geogr%C3%A1ficas+do+Munic%C3%ADpio+de+Lajeado> | mapa, análises e consulta | urbano/rural, imóvel e infraestrutura | não confirmada | `[fetch-ok]` |
| Orindiúva/SP | administrativo | Portal da Transparência e alegação de API | <https://orindiuva.sp.gov.br/transparencia> | página declara JSON/CSV | principalmente administrativo | portal 2026 | `[fetch-ok]` |
| Santa Rita do Sapucaí/MG | administrativo | Auditoria interna do Portal da Transparência | <https://arquivos.pmsrs.mg.gov.br/wp-content/uploads/2026/07/Relatorio-de-Auditoria-Interna-n%C2%B0-003-2026-Portal-da-Transparencia1.0.pdf> | auditoria confirma acesso automatizado em JSON | fiscal/administrativo | auditoria de 2026 | `[fetch-ok]` |
| Pomerode/SC | administrativo, saúde e educação | Portal Atende.net e inventário de dados abertos | <https://www.pomerode.sc.gov.br/transparencia/item/inventario-de-dados-abertos> | busca indica inventário e API de pessoal; conteúdo não foi lido | desconhecida | indicação de julho/2026 | `[fetch-falhou]` — erro de decodificação Unicode |

## Achados

### 1. Jundiaí/SP é o outlier institucional mais forte

É a cidade que melhor corresponde à ideia de “gosta de analisar dados”, não apenas “comprou um portal”. As evidências se reforçam:

- companhia municipal de informática, a CIJUN, desenvolvendo e mantendo as plataformas;
- Observatório criado em 2017 e hoje descrito com mais de 385 indicadores intersetoriais;
- metadados por indicador — conceito, método, fonte, periodicidade e série histórica;
- Portal da Transparência que declara CSV, TXT e XLS sem cadastro;
- política municipal que define catálogo, primariedade, atualidade, licenças livres, download, séries históricas e eventual API;
- GEOJundiaí com estrutura territorial e equipamentos.

Isso é uma cadeia institucional completa: produção → tratamento → análise → publicação → norma → equipe própria. A ressalva é que ainda não foi auditado um arquivo real em cada um dos oito domínios nem confirmada API pública geral. Portanto, Jundiaí entra no top 10, mas não recebe ainda a confiança das líderes CKAN.

### 2. Toledo/PR é a surpresa técnica e a candidata de crescimento mais rápido

A API municipal oficial usa OpenAPI 3.0 e documenta rotas de licitação, contratos, receita, recursos humanos e saúde. A rota de saúde promete produção por mês, ano e unidade: exames, vacinas, medicamentos, visitas domiciliares, procedimentos e consultas agendadas/executadas. Isso é muito mais útil para o piloto que um painel agregado.

Ao mesmo tempo, a página de indicadores ainda está pouco povoada e o Observatório Econômico e Social está em implantação. Toledo já tem a infraestrutura técnica, mas ainda não comprovou equilíbrio nos oito domínios, recorte por bairro e operação real dos endpoints nesta auditoria. Deve entrar como reserva prioritária e ser reavaliada em 60–90 dias.

### 3. Jaraguá do Sul e São Bento do Sul confirmam a hipótese apenas no eixo geográfico

Jaraguá tem um GeoPortal rico em cadastro, infraestrutura, zoneamento, cheias e redes, mais TSVs atuais do consórcio CIGA. São Bento do Sul mantém um portal geográfico surpreendentemente caprichado, com pavimentação, Plano Diretor, estudos urbanísticos, mapeamento móvel 360° e downloads pontuais.

As duas parecem ter boa capacidade técnica municipal, mas o acervo aberto encontrado é concentrado em urbanismo, cadastro e administração. Não passam o critério de equilíbrio temático.

### 4. “API em cidade minúscula” também produz falsos positivos

Orindiúva declara que todos os conjuntos do portal estão em JSON e CSV, mas os endpoints mostrados na própria página são `publications`, `vereadores`, `sessoes`, `esic-stats` e `ouvidoria-stats`: não correspondem ao inventário de receitas, despesas, contratos, obras e planejamento anunciado logo acima. Isso reduz muito a confiabilidade da evidência e sugere conteúdo de plataforma copiado ou incompleto.

Conselheiro Mairinck/PR e Jundiaí do Sul/PR também oferecem APIs organizadas, mas quase só para conteúdo institucional, legislativo ou administrativo. São ótimos exemplos de implementação técnica em municípios pequenos, não candidatas multidomínio.

### 5. Riqueza e fama tecnológica são preditores fracos

- **Campos do Jordão/SP:** a busca encontrou planos e linguagem de cidade inteligente, mas não um catálogo municipal multidomínio, API pública geral ou observatório maduro. Riqueza/turismo não se converteu em evidência de abertura.
- **Santa Rita do Sapucaí/MG:** a auditoria de 2026 confirma dados fiscais automatizáveis, mas não um ecossistema temático à altura da reputação tecnológica da cidade.
- **São Caetano do Sul/SP, Nova Lima/MG, Vinhedo/SP e Paulínia/SP:** apareceram serviços digitais e dados de componentes do site, mas não uma infraestrutura municipal equilibrada de saúde, educação, mobilidade, segurança, economia e ambiente.
- **Lajeado/RS:** há cultura de análise em segurança e um bom GeoLajeado, porém a publicação aberta ainda é setorial.

## Comparação qualitativa — ainda não substitui a matriz IDU-Br v2

| Cidade | Cultura institucional de dados | Acesso por máquina | Variedade temática | Cobertura territorial | Confiança desta triagem | Decisão |
|---|---|---|---|---|---|---|
| **Jundiaí/SP** | muito alta | média-alta | alta | alta | média-alta | **promover ao top 10** |
| **Toledo/PR** | alta e crescente | alta na documentação | média | não confirmada | média | **reserva prioritária** |
| **Jaraguá do Sul/SC** | média-alta | média | baixa-média | alta | média-alta | piloto geo, não geral |
| **São Bento do Sul/SC** | média-alta | média | baixa | alta | alta para geo | piloto geo, não geral |
| **Lajeado/RS** | média | baixa-média | baixa-média | alta em geo | média | monitorar |
| **Pomerode/SC** | não separável do fornecedor | indício médio | indício médio | desconhecida | baixa | auditar antes de pontuar |
| **Santa Rita do Sapucaí/MG** | média | média no fiscal | baixa | baixa/desconhecida | média | não promover |
| **Orindiúva/SP** | baixa/não demonstrada | alegada, com inconsistência | baixa | baixa | baixa | falso positivo técnico |
| **Campos do Jordão/SP** | não demonstrada | baixa/não localizada | baixa/não localizada | não localizada | média-baixa | não promover |

## Correções (o que eu mesmo derrubei)

- ~~“Jaraguá do Sul provavelmente será o grande outlier por perfil industrial e baixa violência.”~~ — **CORRIGIDO 2026-08-01:** é um outlier geográfico/urbanístico, mas não foi encontrada abertura municipal equilibrada nos oito domínios.
- ~~“Cidade rica tende a ter melhor ecossistema público de dados.”~~ — **CORRIGIDO 2026-08-01:** Campos do Jordão, São Caetano, Nova Lima e Paulínia não sustentaram essa relação. Capacidade fiscal pode financiar digitalização de serviços sem gerar dados abertos.
- ~~“Uma API documentada prova maturidade municipal.”~~ — **CORRIGIDO 2026-08-01:** APIs de conteúdo institucional e páginas padronizadas de fornecedores podem ser tecnicamente boas e tematicamente inúteis para o piloto.

## Fraquezas e riscos

1. O conteúdo dinâmico do Observatório Jundiaí não pôde ser inspecionado nesta sessão; quantidade e metadados são corroborados por páginas oficiais, mas exportação por indicador não foi testada.
2. A documentação OpenAPI de Toledo abriu, mas uma resposta real dos endpoints não foi lida; frescor e estabilidade seguem desconhecidos.
3. A busca foi orientada por hipótese e não é censo de todos os municípios de alta renda/IDH. Há risco de falso negativo em portais não indexados.
4. Portais de fornecedores como Instar, Atende.net, Equiplano e variantes produzem aparência semelhante em dezenas de cidades. A avaliação precisa separar capacidade da plataforma de governança e conteúdo realmente mantidos pela prefeitura.
5. Segurança pública costuma ser estadual; uma cidade média pode parecer fraca mesmo quando o ecossistema estadual é bom. A nota municipal e a nota de ecossistema devem continuar separadas.

## O que não consegui verificar, e por quê

- arquivo ou endpoint real de cada domínio em Jundiaí;
- resposta JSON e data mais recente das rotas de Toledo;
- inventário completo e formatos de Pomerode por erro de decodificação;
- catálogo multidomínio de Campos do Jordão, porque não foi localizado após buscas oficiais focadas;
- atualidade por camada em Jaraguá, São Bento do Sul e Lajeado.

## Síntese

O “município escondido que pensa por dados” encontrado é **Jundiaí/SP**. A cidade deve substituir Niterói na vaga 9 do shortlist nacional porque combina equipe/instituição própria, norma, indicadores intersetoriais, formatos abertos e geoinformação; Niterói permanecia condicional e sem catálogo funcional revalidado.

O outlier que merece incubação é **Toledo/PR**. Ainda não tem amplitude comprovada para o top 10, mas a API oficial de saúde e a construção interinstitucional de um observatório indicam uma trajetória rara em cidade média. Recomenda-se uma auditoria curta agora e nova medição em 60–90 dias.
