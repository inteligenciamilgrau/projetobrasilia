# Auditoria pente-fino — PRs #1 e #2 e faixa de aproximadamente 100 mil

**Status:** concluída para decisão de triagem; IDU-Br completo ainda não calculado  
**Data de corte:** 2026-08-01  
**Escopo:** cidades citadas nos dois PRs recentes e candidatas já priorizadas na faixa operacional de 70 mil a 150 mil habitantes

## Decisão curta

- **Nova Lima/MG permanece em primeiro lugar na fila.** O GeoPNL expõe serviços consultáveis e reutilizáveis, com cobertura territorial detalhada em saúde, educação, assistência, mobilidade, ambiente e urbanismo.
- **Rio do Sul/SC permanece em segundo, com ressalva.** O portal atual implementa a opção de dados abertos, mas a exportação ainda depende da aplicação e nenhum arquivo teve o esquema lido nesta auditoria.
- **Guaratinguetá/SP deixa a fila imediata.** O Observatório comprova uma metodologia territorial interessante, mas o conteúdo localizado é legado, o painel do Participa Guará está zerado e não foi encontrada API ou exportação atual.
- **Camboriú/SC e Tubarão/SC não entram no Top 10 por qualidade de dados.** Estão dentro da faixa populacional, porém não passaram o teste de acesso reutilizável e cobertura equilibrada.
- **Balneário Camboriú/SC é uma reserva de sensibilidade, não Camboriú.** É outro município, está 1.674 habitantes acima do teto formal e tem WFS público real, mas o acervo testado é majoritariamente cadastral/geográfico.
- **Toledo/PR fica fora da faixa e fora da promoção.** A especificação OpenAPI existe, mas as rotas reais continuaram devolvendo HTTP 400 sem mensagem útil.

Essas decisões não transformam a triagem em nota IDU-Br. Elas apenas determinam onde vale executar a auditoria cara, domínio por domínio.

## Identidade municipal: a checagem que evita o pior erro

Camboriú e Balneário Camboriú são municípios distintos e vizinhos:

| Município | Código IBGE | População estimada 2025 | Situação na faixa 70–150 mil |
|---|---:|---:|---|
| Camboriú/SC | 4203204 | 117.324 | dentro |
| Balneário Camboriú/SC | 4202008 | 151.674 | fora por 1.674 habitantes; teste de sensibilidade |

Uma fonte só foi atribuída a uma das cidades quando o domínio, o órgão publicador ou o código municipal permitiram identificar inequivocamente o responsável. Riqueza, verticalização ou reputação tecnológica serviram apenas como pistas; não geraram pontos.

## Resultado comparado

| Cidade | Porte | Acesso realmente testado | Cobertura observada | Território | Decisão | Confiança |
|---|---:|---|---|---|---|---|
| **Nova Lima/MG** | 120.959 | ArcGIS FeatureServer público; consulta e exportação configuradas | saúde, educação, assistência, mobilidade, ambiente, equipamentos e urbanismo, sobretudo cadastrais | bairro, UBS, CRAS, ensino, ponto, linha e polígono | **auditar agora · 1ª** | alta no geo; média no equilíbrio |
| **Rio do Sul/SC** | 77.451 | portal atual com função de “Dados Abertos”; arquivo final ainda não lido | fiscal e administrativo; SIGEP como complemento | varia por consulta/projeto | **auditar agora · 2ª, condicional** | média-baixa |
| **Vinhedo/SP** | 79.089 | JSON administrativo e Mappa Web já localizados no pré-filtro | administração e território; profundidade social pendente | bairro e lote | **próxima auditoria · 3ª** | baixa-média |
| **Valinhos/SP** | 132.258 | JSON administrativo e mapas temáticos já localizados | administração e território; profundidade social pendente | mapa/arquivo | reserva forte | baixa-média |
| **Guaratinguetá/SP** | 121.916 | observatório e relatórios; sem API/CSV atual encontrados | participação/planejamento, com conteúdo antigo | APEMs formadas por bairros | **rebaixada a legado** | média para a conclusão negativa |
| **Camboriú/SC** | 117.324 | 17 links municipais, majoritariamente mapas PDF no Google Drive | planejamento; mapas de saúde e ensino são localização de equipamentos | mapa estático | **não entra** | alta |
| **Tubarão/SC** | 116.725 | geoportal público anunciado, mas a rota atual não permitiu enumerar API/download; transparência Betha em JavaScript | cadastro, obras e fiscal | lote/obra declarados | **reserva de descoberta** | média-baixa |
| **Balneário Camboriú/SC** | 151.674 | WFS 2.0 público, 73 tipos de feição | cadastro, zoneamento, risco, infraestrutura e censo; várias camadas vazias | lote, bairro, setor censitário e ponto | **sensibilidade fora da faixa** | alta no WFS; baixa no equilíbrio |
| **Toledo/PR** | 160.701 | OpenAPI 3.0 com 9 rotas; chamadas reais retornaram HTTP 400 | finanças, RH e saúde no contrato, não comprovados na resposta | não comprovado | **não entra** | alta para a falha observada |

## Evidências que mudaram a decisão

### Nova Lima

O aplicativo público oficial, de proprietário `geoprocessamentoPNL`, foi modificado em 26/06/2026; o mapa subjacente, em 01/07/2026. A configuração contém **28 camadas de primeiro nível e 91 recursos-folha**; parte deles são ortofotos, portanto a contagem bruta não vale como quantidade de bases independentes. Entre os recursos consultáveis estão 22 camadas territoriais de saúde, unidades de ensino, desenvolvimento e assistência social, pontos de ônibus, sistema viário, hidrografia, REURB, quadras, bairros e equipamentos urbanos. Os dados vetoriais usam FeatureServer público.

Isso confirma capacidade excepcional para análise intraurbana, mas ainda não prova microdados operacionais de atendimento, aprendizagem, crime ou execução fiscal. Nova Lima lidera o **microlaboratório territorial**, não um ranking multidomínio definitivo.

Fontes: [GeoPNL](https://www.novalima.mg.gov.br/inicio/portal-servicos/servico/geopnl) e [mapa público territorial](https://www.arcgis.com/apps/webappviewer/index.html?id=ff761e397b904ad4b164eb8a71cb7d86).

### Rio do Sul

O portal municipal entrega a aplicação atual da plataforma Atende. O código público mostra que itens marcados com `dados_abertos` recebem um botão de download e que o clique envia a mensagem `downloadDadosAbertos` ao conteúdo embarcado. Isso comprova a função de exportação no produto, mas **não o formato, o esquema ou a completude do arquivo de cada consulta**. Até que um download seja aberto e validado, Rio do Sul mantém intervalo amplo de confiança.

Fonte: [Portal da Transparência de Rio do Sul](https://www.riodosul.sc.gov.br/transparencia/).

### Guaratinguetá

O Participa Guará conserva uma metodologia útil: as APEMs agrupam bairros e usam escolas como referência territorial. Porém a página atual exibe **0 eventos, 0 pessoas e 0 demandas**, o relatório localizado é de 2019/2020 e não foi encontrada interface atual de API/CSV/XLSX. A estrutura é uma boa referência de participação social, mas não justifica prioridade de ingestão.

Fonte: [Observatório de Políticas Públicas de Guaratinguetá](https://observatorio.guaratingueta.sp.gov.br/elementor-11721/).

### Camboriú

A página de Planejamento Urbano lista 17 produtos datados de janeiro e fevereiro de 2025. O teste dos links derrubou a interpretação otimista do PR: os produtos de unidades de saúde e ensino são **mapas PDF no Google Drive**, não camadas ou tabelas editáveis, e ao menos um link de bairros/logradouros estava quebrado. O painel municipal de dengue está atual, mas não expõe download/API e publicou uma advertência de PHP na própria tela durante o teste.

Fonte: [Planejamento Urbano de Camboriú](https://camboriu.sc.gov.br/planejamento-urbano/).

### Balneário Camboriú

O portal `geo.bc.sc.gov.br` é separado do portal de Camboriú e expõe um **GeoServer WFS 2.0 com 73 FeatureTypes**. Testes de contagem confirmaram 18 bairros, 10.059 pontos de iluminação, 22.254 lotes, 225 setores censitários, 175 feições de zoneamento, 11 eventos adversos e 3 abrigos. Em contrapartida, as camadas testadas de unidade de ensino e área de risco estavam vazias, e o catálogo é fortemente cadastral. A cidade merece auditoria de sensibilidade, não promoção automática por riqueza ou pela contagem bruta de camadas.

Fontes: [Cidades e Estados — Balneário Camboriú](https://www.ibge.gov.br/cidades-e-estados/sc/balneario-camboriu.html) e [WFS público](https://geo.bc.sc.gov.br/geoserver/ows?service=WFS&version=2.0.0&request=GetCapabilities).

### Tubarão

O município anunciou acesso público ao geoprocessamento em 2024 e lançou novo portal de transparência Betha em 2026. Na auditoria atual, porém, não foi possível enumerar catálogo, WFS/REST ou arquivo estruturado; a evidência prova digitalização e intenção de abertura, não reutilização. Com IDHM 0,796, Tubarão é um bom quase-corte do pré-filtro, mas não substitui candidatas com recurso aberto e esquema lido.

Fontes: [acesso público ao geoprocessamento](https://tubarao.sc.gov.br/acesso-publico-ao-sistema-de-geoprocessamento-de-tubarao-esta-disponivel-desde-a-ultima-sexta-feira-4/) e [Portal da Transparência](https://tubarao.sc.gov.br/portal-da-transparencia/).

### Toledo

A documentação descreve nove rotas em licitações, contratos, receita, RH e saúde. Ela não traz esquemas de resposta, exemplos nem formato claro de datas. Chamadas de leitura com e sem intervalo de datas retornaram HTTP 400 e corpo vazio. O portal de Indicadores Públicos lançado em 2025 ainda tinha apenas um indicador administrativo municipal no teste. Toledo continua uma pista técnica, mas hoje tem custo de integração imprevisível.

Fontes: [OpenAPI oficial](https://www.toledo.pr.gov.br/api-publica/docs/api-docs.json) e [Indicadores Públicos](https://www.toledo.pr.gov.br/secretarias/ti/indicadores-publicos).

## Correções aplicadas aos PRs

1. `auditado` não é sinônimo de “uma busca encontrou uma página”. Os 14 municípios de Santa Catarina passam a ser **triados**; só uma auditoria com recurso, esquema, data e granularidade lidos pode sustentar o rótulo forte.
2. Joinville expõe atualmente **35 entradas de serviço e 32 nomes únicos** no diretório SIMGeo, não 34 bases. Saúde e educação responderam em JSON/GeoJSON, mas são sobretudo cadastros de equipamentos.
3. Camboriú publica 17 **produtos cartográficos**, majoritariamente PDFs; isso não equivale a 17 bases georreferenciadas reutilizáveis.
4. Balneário Camboriú e Camboriú não compartilham evidência nem código IBGE.
5. Contagem de serviço, camada, dataset, distribuição e indicador são unidades diferentes e nunca devem ser somadas como se fossem “quantidade de dados”.

## Próximo teste que realmente decide

1. Nova Lima: abrir uma feição e registrar esquema, quantidade, data e licença em saúde, educação, assistência e mobilidade; depois buscar microdados operacionais fora do geoportal.
2. Rio do Sul: executar três exportações de dados abertos, registrar formato, campos e período e verificar se a URL é reproduzível sem sessão.
3. Vinhedo: testar a API/JSON administrativo e o serviço territorial como possível terceira candidata formal.
4. Balneário Camboriú: procurar fontes operacionais de saúde, educação, mobilidade, economia e finanças; o WFS sozinho não passa no equilíbrio.
