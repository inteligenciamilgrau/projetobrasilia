# compilador:retomada — consolidação da shortlist e revisão da métrica

**Status:** concluído
**Última atualização:** 2026-08-01
**Agente:** `compilador:retomada`

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização observada | Status |
|---|---|---|---|---|---|---|---|
| Recife/PE | multidomínio | Grupos do Portal de Dados Abertos | `https://dados.recife.pe.gov.br/group/` | portal CKAN | varia | página aberta na retomada; 12 grupos | `[fetch-ok]` |
| Recife/PE | educação | Matrículas na rede municipal | `https://dados.recife.pe.gov.br/dataset/matriculas-na-rede-municipal` | CSV | registro individual anonimizado/unidade | 02/03/2026 | `[fetch-ok]` |
| Fortaleza/CE | multidomínio | Documentação da API CKAN | `https://dados.fortaleza.ce.gov.br/docs-api` | API pública | varia | página aberta na retomada | `[fetch-ok]` |
| Fortaleza/CE | multidomínio | Grupos do portal | `https://dados.fortaleza.ce.gov.br/group/` | portal CKAN | varia | 12 grupos; página aberta na retomada | `[fetch-ok]` |
| São Paulo/SP | multidomínio | Portal de Dados Abertos | `https://dados.prefeitura.sp.gov.br/` | CKAN/API | varia | 474 conjuntos, 81 organizações, 16 grupos | `[fetch-ok]` |
| São Paulo/SP | urbanismo/geo | Catálogo GeoSampa | `https://metadados.geosampa.prefeitura.sp.gov.br/geonetwork/srv/resources/persons/geosampa%40prefeitura.sp.gov.br` | GeoNetwork/geosserviço | distrito/subprefeitura/camada | 751 registros exibidos | `[fetch-ok]` |
| Belo Horizonte/MG | multidomínio | Grupos do Portal de Dados Abertos | `https://dados.pbh.gov.br/group/` | portal CKAN | varia | 21 grupos; Saúde 2, Segurança 0 | `[fetch-ok]` |
| Porto Alegre/RS | multidomínio | Dados Abertos POA | `https://dadosabertos.poa.br/` | CKAN/API | varia | 56 conjuntos; atividade de transporte no mesmo dia | `[fetch-ok]` |
| Curitiba/PR | saúde | E-Saúde — atendimentos médicos | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e` | CSV | registro individual + bairro | 06/07/2026; mensal | `[fetch-ok]` |
| Curitiba/PR | economia | Base de Alvarás | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=be211e1f-cff5-44cb-9aaa-1be6b9ec3811` | CSV | estabelecimento/endereço/bairro | 01/07/2026; mensal | `[fetch-ok]` |
| Curitiba/PR | segurança | SiGesGuarda | `https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=b16ead9d-835e-41e8-a4d7-dcc4f2b4b627` | CSV | registro de ocorrência | 01/07/2026 | `[fetch-ok]` |
| Brasília/DF | segurança | Dados por RA e RISP — SSP-DF | `https://ssp.df.gov.br/dados-por-regiao-administrativa` | XLS/PDF | Região Administrativa e RISP | 2014–2026; página atualizada em 24/04/2026 | `[fetch-ok]` |
| Brasília/DF | socioeconômico | PDAD-A 2024 | `https://pdad.ipe.df.gov.br/` | painel/relatórios | 35 RAs + 12 municípios da PMB | edição 2024 | `[fetch-ok]` |
| Rio de Janeiro/RJ | urbanismo/geo | Limites administrativos | `https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer` | ArcGIS REST/JSON | bairro, RA, RP e AP | serviço vivo na retomada | `[fetch-ok]` |
| Belém/PA | mobilidade | Belém em Números — Mobilidade | `https://numeros.belem.pa.gov.br/mobilidade-urbana/` | painel + arquivos-fonte | município | séries até 2023 | `[fetch-ok]` |
| Belém/PA | segurança | CODEC/SIAC — SEGUP-PA | `https://codec.segup.pa.gov.br/` | painel/filtros | município/bairro/RISP | até 30/06/2026 | `[fetch-ok]` |
| Niterói/RJ | multidomínio | ArcGIS Hub legado | `https://dados-geoniteroi.opendata.arcgis.com/` | ArcGIS Hub | desconhecida | catálogo não apareceu | `[fetch-falhou]` — página sem conteúdo avaliável |

## Achados

- O núcleo mais defensável do piloto tem oito cidades: Recife, São Paulo, Fortaleza, Rio, Porto Alegre, Curitiba, Belo Horizonte e Brasília.
- Niterói e Belém completam a shortlist por enquanto, mas com verificação condicionada. Maceió e Salvador são reservas imediatas.
- O DataPOA legado não deve ser usado para declarar Porto Alegre offline: o catálogo migrou para `dadosabertos.poa.br`.
- A configuração de Curitiba em `idu.py` v1 contradiz as fontes atuais: saúde e segurança não são zero.
- “Cobertura” precisa ser separada em equilíbrio temático e alcance territorial. A v1 mede apenas o primeiro e ainda o faz com uma entropia problemática.
- É necessário publicar IDU municipal e IDU do ecossistema. Caso contrário, cidades atendidas por bases estaduais de segurança parecem autônomas sem serem.

## Correções (o que eu mesmo derrubei)

- ~~A v1 executável poderia ser apenas atualizada com novas contagens.~~ **CORRIGIDO:** a fórmula também precisa mudar; atualizar só os dados preservaria falso equilíbrio, bônus/penalidades subjetivos e ausência de confiança.
- ~~O top 10 poderia receber notas decimais imediatamente.~~ **CORRIGIDO:** sem recodificar as 80 células (10 cidades × 8 domínios) na mesma rubrica, casas decimais seriam falsa precisão.

## Fraquezas e riscos

- A shortlist usa consenso de levantamentos heterogêneos; ainda não é uma matriz duplamente codificada.
- Niterói tem contradição não resolvida sobre exportação real do TabNit e profundidade dos 14 painéis.
- Rio e Brasília dependem de muitas fontes setoriais; a cobertura existe, mas o custo operacional precisa ser medido no piloto.
- As contagens vivas oscilam (Fortaleza aparece com 634/635; BH com 589/602 em momentos distintos). A métrica v2 não deve usar total bruto como variável principal.

## O que não consegui verificar, e por quê

- O feed DCAT/portal de Niterói não entregou catálogo legível nesta retomada.
- Data.Rio abriu como SPA sem corpo textual; a evidência renovada do Rio ficou restrita ao ArcGIS REST oficial.
- Não foi feita coleta dos recursos, conforme o escopo; foram lidas páginas, endpoints e amostras já descritas nos levantamentos anteriores.

## Síntese

Shortlist nacional consolidada em três ondas e métrica v2 proposta com nota de qualidade, intervalo, confiança da avaliação, dependência estadual e estabilidade do ranking. A próxima ação correta não é coletar tudo, mas recodificar as 12 primeiras candidatas com dois avaliadores e um recurso real testado por domínio.
