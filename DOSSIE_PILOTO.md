# Projeto iA Brasil — seleção do piloto: 10 cidades/regiões com melhor ecossistema de dados públicos locais

**Status:** shortlist nacional revisada; IDU-Br v2.1 passa a separar qualidade, porte do piloto e confiança, mas a matriz por domínio ainda aguarda codificação
**Última compilação:** 2026-08-01
**Escopo:** levantamento e seleção; não inclui coleta em massa dos dados
**Base:** levantamentos em `docs/parciais/`, rechecagem pontual de fontes oficiais e revisão metodológica em [METRICA_IDU_V2.md](docs/METRICA_IDU_V2.md)

> Resultado principal: há nove candidatas defensáveis e uma vaga de diversidade regional ainda condicional. Porém, a ordem anterior privilegiava qualidade dos dados e não descontava a complexidade de executar um primeiro piloto em metrópoles. Com o novo fator de porte, **Jundiaí/SP é o melhor equilíbrio encontrado entre qualidade e escala**. As grandes capitais continuam referências de qualidade, mas não devem ser automaticamente a primeira implementação integral.

## Instrumentos de validação publicados

- [Top 10 interativo](index.html#top10): a própria tabela reordena as cidades por qualidade ordinal, porte, população ou simulação combinada; permite impor ou retirar faixa populacional e salva as escolhas no navegador.
- [Inventário por cidade](inventario.html): 60 links iniciais — seis por candidata — com área, produtor, camada institucional, acesso, território, frescor e estado do teste.
- [Perfis das cidades](cidades/jundiai.html): uma página física por candidata, com forças, riscos, fontes e fila de aprofundamento.
- [Fontes nacionais](fontes.html): 41 portais e projetos de referência, separados do esforço municipal que pontua o ranking.
- [Cidades pequenas](cidades-pequenas.html): dois Top 10 independentes, nas faixas de 7–15 mil e 70–150 mil habitantes, pré-filtrados por IDHM e submetidos a uma triagem rápida de dados.

O inventário separa **volume declarado** de **evidência confirmada**. As contagens de catálogos são pistas; a validação final exige baixar um recurso ou consultar um endpoint, ler seu esquema e repetir o acesso.

---

## 1. Decisão recomendada

### Top 10 provisório por qualidade/evidência

Esta ordem registra a força do ecossistema encontrado. Ela **não é mais a ordem automática de implantação**: a prioridade operacional será calculada pelo IPS-Br, após a codificação do IDU-E e do P-Piloto.

| # | Cidade/região | Região | Faixa | Por que entra | Principal ressalva | Confiança da seleção |
|---:|---|---|---|---|---|---|
| 1 | **Recife/PE** | Nordeste | A — iniciar | Catálogo CKAN mais equilibrado: saúde 65, urbanismo 25, mobilidade 23, governo 15, educação 11, finanças 11, segurança 6 e meio ambiente 5; vários microdados e atualizações de 2026 | Histórico recente de respostas HTTP 500 em parte da API/interface | **alta** |
| 2 | **São Paulo/SP** | Sudeste | A — iniciar | 474 conjuntos, 81 órgãos e 16 temas, somados a GeoSampa, SPTrans/Olho Vivo, ObservaSampa e fontes estaduais | Saúde e segurança municipais são rasas; exige integração de várias plataformas | **alta** |
| 3 | **Fortaleza/CE** | Nordeste | A — iniciar | CKAN documentado, 634–635 conjuntos, 12 grupos, muito CSV/GeoJSON e forte cobertura de transporte, saúde, economia e finanças | Parte de saúde, educação, economia e segurança está defasada ou é pouco profunda | **alta** |
| 4 | **Rio de Janeiro/RJ** | Sudeste | A — iniciar | Maior profundidade territorial: bairros, RAs, CISP, geosserviços, mobilidade em tempo real, clima, finanças e segurança | Ecossistema fragmentado; Data.Rio é SPA e alguns serviços já apresentaram 503/token | **média-alta** |
| 5 | **Porto Alegre/RS** | Sul | B — segunda onda | Novo CKAN vivo com 56 conjuntos em oito grupos, saúde operacional, mobilidade, finanças, urbanismo e complemento estadual de segurança | Educação e economia têm apenas um conjunto cada; segurança depende do estado | **alta** |
| 6 | **Curitiba/PR** | Sul | B — segunda onda | Microdados atuais e raros: atendimentos de saúde, Guarda Municipal, SIAC 156, alvarás, mobilidade e geodados | Educação é quase só cadastro/geo; meio ambiente é sobretudo cartográfico | **alta** |
| 7 | **Belo Horizonte/MG** | Sudeste | B — segunda onda | Melhor combinação de CKAN + WFS/GTFS para engenharia; catálogo amplo e atual | Taxonomia incompleta; grupos oficiais mostram saúde rasa e segurança zerada | **alta** |
| 8 | **Brasília/DF** | Centro-Oeste | B — segunda onda | Competências estaduais e municipais na mesma jurisdição; segurança 2014–2026 por RA, PDAD-A nas 35 RAs e bons geosserviços | Portal central não enumera bem o acervo; ingestão precisa ser fonte a fonte | **média** |
| 9 | **Jundiaí/SP** | Sudeste | B/C — auditar e iniciar | CIJUN municipal, política própria de dados abertos, 407 indicadores em JSON, 5.038 linhas de série e WFS público com 103 FeatureTypes | Indicadores agregados e geo não substituem dados operacionais; saúde, educação, segurança e mobilidade ainda precisam de recurso próprio por domínio | **alta no acesso; média-alta no equilíbrio** |
| 10 | **Belém/PA** | Norte | C — condicional | Único caso nortista multidomínio, segurança corrente por bairro e painel municipal em 15 temas | Sem API; arquivos em Drive/RAR, séries municipais antigas e downloads do Anuário quebrados | **média** |

### O efeito do porte na decisão

Populações da estimativa oficial do IBGE para 1º de julho de 2025. P-Piloto usa a curva provisória documentada na métrica v2.1.

| Cidade | População 2025 | P-Piloto | Papel recomendado agora |
|---|---:|---:|---|
| **Jundiaí/SP** | 463.039 | **100,0** | candidata principal ao primeiro piloto integral |
| **Porto Alegre/RS** | 1.388.794 | 70,3 | segunda onda ou escopo inicialmente reduzido |
| **Belém/PA** | 1.397.315 | 70,1 | condicional; porte não resolve as fragilidades dos dados |
| **Recife/PE** | 1.588.376 | 65,3 | benchmark CKAN e piloto setorial antes do integral |
| **Curitiba/PR** | 1.830.795 | 59,2 | benchmark de microdados; volume exige planejamento |
| **Belo Horizonte/MG** | 2.415.872 | 51,5 | benchmark CKAN/WFS, não primeira implantação completa |
| **Fortaleza/CE** | 2.578.483 | 50,2 | benchmark CKAN; iniciar por poucos domínios |
| **Brasília/DF** | 2.996.899 | 46,7 | caso institucional especial e complexo |
| **Rio de Janeiro/RJ** | 6.730.729 | 26,3 | benchmark territorial; megacidade para onda posterior |
| **São Paulo/SP** | 11.904.961 | 15,2 | padrão de referência, não piloto integral inicial |

Fonte: [IBGE — Estimativas da População 2025](https://www.ibge.gov.br/estatisticas/sociais/populacao/9103-estimativas-depopulacao.html). A nota de porte não mede qualidade urbana ou administrativa.

Outliers fora do top 10 reforçam a prioridade de cidade média. **Niterói/RJ (516.787) já provou acesso real**: API JSON/CSV com 340 indicadores, ArcGIS REST multidomínio e dados territoriais atuais. Caxias do Sul/RS (479.599) provou acesso técnico, mas continua geo-centrada; Jaraguá do Sul/SC (199.519) permanece um teste geográfico. Toledo/PR (160.701) não passou no teste de execução da API. Facilidade de escala não compensa desequilíbrio temático.

### Como usar a lista

- **Piloto integral inicial:** auditar Jundiaí por dois dias e, confirmados recursos reais nos oito domínios, iniciar por ela.
- **Candidatas-sombra de porte ótimo:** recalcular formalmente Niterói contra Belém — o gate técnico foi superado; manter Caxias do Sul e Jaraguá do Sul como testes geográficos. Toledo fica suspensa até a API responder com dados.
- **Benchmarks controlados:** usar Recife para CKAN, Curitiba para microdados, Belo Horizonte para WFS/GTFS e Rio para granularidade — inicialmente em um ou dois domínios, não na cidade inteira.
- **Escala posterior:** São Paulo, Fortaleza, Brasília e demais metrópoles entram quando o pipeline já tiver custo, volume e tempo medidos na cidade média.
- **Condicional:** Belém só entra depois de teste focado em download real, esquema, atualização e cobertura dos quatro domínios mais fracos.

Essa composição cobre as cinco grandes regiões sem impor cota regional: Sudeste 4, Nordeste 2, Sul 2, Centro-Oeste 1 e Norte 1. Belém entra por ser a melhor evidência encontrada no Norte, não por equivaler tecnicamente às líderes.

---

## 2. Reservas imediatas

| Ordem | Cidade | Quando promover | Motivo de ainda não entrar |
|---:|---|---|---|
| 11 | **Niterói/RJ** | Após recalcular IDU-E/C-IDU com a nova evidência e confrontar diretamente Belém | O gate de acesso foi superado: CSV integral, API JSON, 340 indicadores e ArcGIS REST atual; falta fechar o inventário por domínio e a nota formal |
| 12 | **Toledo/PR** | Se os endpoints responderem com dados atuais e surgirem mais domínios/recorte territorial | OpenAPI oficial rara em cidade média, mas as rotas reais devolveram HTTP 400 sem corpo e o painel público ainda é incipiente |
| 13 | **Maceió/AL** | Se downloads do Observatório tiverem data, esquema e séries consistentes | Boa amplitude em saúde, educação, transporte, urbanismo e economia, mas sem API, sem datas públicas e com lacunas em segurança, finanças e ambiente |
| 14 | **Salvador/BA** | Se o piloto aceitar um eixo prioritariamente geoespacial | ArcGIS municipal excelente e multi-secretaria, porém publica muito mais “onde estão as coisas” do que eventos e séries operacionais |
| 15 | **Caxias do Sul/RS** | Para piloto de cidade média/geo | Acesso técnico bom, mas concentração em urbanismo, ambiente e localização de equipamentos |
| 16 | **Goiânia/GO** | Se a camada estadual puder contar como núcleo do piloto | Portal estadual amplo; material municipal próprio está antigo e pouco equilibrado |

---

## 3. O que foi verificado novamente nesta retomada

- **Recife:** a página oficial de grupos voltou a abrir e mostra 12 grupos, incluindo Saúde 65, Urbanismo 25, Mobilidade 23, Educação 11, Finanças 11, Segurança 6 e Meio Ambiente 5. `[fetch-ok]` — <https://dados.recife.pe.gov.br/group/>
- **Fortaleza:** a documentação oficial confirma API CKAN pública sem autenticação para leitura; a página de grupos mostra 12 temas e suas contagens. `[fetch-ok]` — <https://dados.fortaleza.ce.gov.br/docs-api> e <https://dados.fortaleza.ce.gov.br/group/>
- **São Paulo:** o portal oficial está vivo e declara 474 conjuntos, 81 organizações e 16 grupos. `[fetch-ok]` — <https://dados.prefeitura.sp.gov.br/>
- **Belo Horizonte:** a página de grupos confirma 21 grupos, mas também confirma os buracos: Saúde 2 e Segurança Pública 0; o portal declara atualmente 589 conjuntos. `[fetch-ok]` — <https://dados.pbh.gov.br/group/>
- **Porto Alegre:** `dadosabertos.poa.br` está vivo, declara 56 conjuntos e exibia atualização do transporte público havia poucas horas. Isso derruba a conclusão antiga baseada no DataPOA legado. `[fetch-ok]` — <https://dadosabertos.poa.br/>
- **Curitiba:** E-Saúde disponibiliza CSV de 480 MB por atendimento, mensal, atualizado em 06/07/2026, com bairro; a Base de Alvarás disponibiliza CSV de 546 MB por estabelecimento e endereço. `[fetch-ok]` — <https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe?chave=05954644-5595-4dcb-b961-1e31e22a1c6e> e <https://dadosabertos.curitiba.pr.gov.br/conjuntodado/detalhe/?chave=be211e1f-cff5-44cb-9aaa-1be6b9ec3811>
- **Brasília/DF:** a SSP-DF publica XLS por Região Administrativa e RISP de 2014 a 2026; a PDAD-A 2024 cobre as 35 RAs e 12 municípios da periferia metropolitana. `[fetch-ok]` — <https://ssp.df.gov.br/dados-por-regiao-administrativa> e <https://pdad.ipe.df.gov.br/>
- **Rio:** o FeatureServer municipal está consultável, contém bairro, RA, RP e AP e responde em JSON; o MapServer também declara GeoJSON. `[fetch-ok]` — <https://pgeo3.rio.rj.gov.br/arcgis/rest/services/Cartografia/Limites_administrativos/FeatureServer>
- **Belém:** a página municipal de mobilidade oferece os arquivos-fonte e séries operacionais até 2023; a SEGUP-PA mantém segurança atualizada até 30/06/2026 com filtros territoriais. `[fetch-ok]` — <https://numeros.belem.pa.gov.br/mobilidade-urbana/> e <https://codec.segup.pa.gov.br/>
- **Niterói:** o ecossistema vivo não está no Hub legado. A API do ObservaNit respondeu em JSON e CSV: 340 indicadores, 247 ativos e 314 com série histórica. O ArcGIS REST municipal respondeu com 181 FeatureServers hospedados; amostras reais cobriram escolas, saúde, ônibus, balneabilidade, startups, lotes e dengue. `[fetch-ok]` — <https://observa.niteroi.rj.gov.br/indicadores/>, <https://dataview.niteroi.rj.gov.br/api/v2/indicadores/csv> e <https://sig.niteroi.rj.gov.br/server/rest/services?f=pjson>
- **Jundiaí:** o GeoServer WFS expõe atualmente 103 FeatureTypes e o Observatório carrega endpoints JSON públicos: 407 indicadores e 5.038 linhas de série, de 1991 a 2026. A pendência agora é conteúdo operacional por domínio, não descobrir API/exportação. `[fetch-ok]` — <https://geo.jundiai.sp.gov.br/geoserver/ows?service=WFS&version=2.0.0&request=GetCapabilities> e <https://observatorio.jundiai.sp.gov.br/functions/api.php?sheet=indicadores>
- **Caxias do Sul:** o feed DCAT retornou 126 IDs, mas inclui item externo e metadado de publicador defeituoso; 70 distribuições têm CSV/GeoJSON e o conteúdo continua concentrado em urbanismo/ambiente/localização de equipamentos. `[fetch-ok]` — <https://dadosabertos.caxias.rs.gov.br/api/feed/dcat-us/1.1.json>
- **Toledo:** a OpenAPI 3.0 expõe nove rotas, mas chamadas reais com e sem datas retornaram HTTP 400 e corpo vazio; a documentação não traz esquema de resposta ou exemplos. `[fetch-ok]` documentação; `[fetch-falhou]` recursos — <https://www.toledo.pr.gov.br/api-publica/docs/api-docs.json>
- **Pente-fino das contribuições:** Niterói e Jundiaí subiram; Joinville e Caxias ficaram como referências geo; Toledo, Camboriú, Tubarão e Guaratinguetá não passaram os gates atuais. Auditoria consolidada em [AUDITORIA_PENTE_FINO_100MIL.md](docs/AUDITORIA_PENTE_FINO_100MIL.md).

---

## 4. Revisão dos critérios

Os pesos 40/35/25 da v1 **não vieram do briefing**; foram uma interpretação dos agentes. Além disso, “cobertura da região” foi tratada apenas como equilíbrio entre temas, embora também possa significar cobertura territorial dentro do município. A v2 separa explicitamente:

1. amplitude e profundidade temática;
2. acesso e interoperabilidade;
3. atualidade e continuidade histórica;
4. cobertura territorial e granularidade;
5. equilíbrio entre os oito domínios;
6. governança e resiliência operacional.

A qualidade da cidade, a adequação do porte e a confiança da nossa avaliação são números separados. A prioridade do primeiro piloto usa `IPS-Br = 0,75 × IDU-E + 0,25 × P-Piloto`; C-IDU continua fora dessa fórmula. Ver curva, sensibilidade e protocolo de validação em [METRICA_IDU_V2.md](docs/METRICA_IDU_V2.md).

---

## 5. Correções materiais sobre a v1

| Afirmação anterior | Correção de 2026-08-01 |
|---|---|
| Porto Alegre “não calculável” porque DataPOA estava fora | O domínio legado morreu, mas o catálogo migrou para `dadosabertos.poa.br` e está ativo |
| Curitiba sem saúde e segurança | Há microdados atuais de E-Saúde e SiGesGuarda; a configuração hardcoded da v1 está errada |
| Recife não calculável por não ser possível enumerar grupos | A página de grupos abriu nesta retomada e expôs as contagens; ainda há histórico de instabilidade em endpoints |
| Brasília sem granularidade medida | SSP-DF e PDAD-A comprovam granularidade por RA; o problema é centralização/acesso, não falta de recorte territorial |
| Belo Horizonte com `E=1,00` | Era resultado da uniformidade assumida, não uma medição; os grupos oficiais mostram distribuição muito desigual |

O arquivo [idu.py](idu.py) passa a ser **legado reproduzível da v1**, não fonte do ranking atual.

---

## 6. Descartes com evidência suficiente

- **Vitória e Florianópolis:** reputação alta, mas catálogo municipal tabular inexistente/quebrado e cobertura real predominantemente fiscal ou geográfica.
- **Natal:** catálogo antigo concentrado em ônibus e atualmente inacessível.
- **Campinas, São Bernardo, Londrina, Palmas, São Luís e Campina Grande:** essencialmente transparência fiscal/administrativa, não ecossistema multidomínio.
- **Joinville, Blumenau, Contagem e Vila Velha:** bons nichos de geoinformação, mas cobertura temática muito desequilibrada.
- **Manaus e Macapá:** amplitude municipal aberta insuficiente; Macapá rotula PDFs repetidos como domínios distintos.

---

## 7. Próximo passo de maior retorno

Antes de qualquer coleta ampla, preencher a matriz IDU-Br v2.1 das 12 primeiras candidatas com população oficial e duas avaliações independentes por célula. O teste deve abrir e ler **um recurso real por domínio** — não apenas a página do portal. O resultado será `IDU-E [intervalo]`, `P-Piloto`, `IPS-Br`, `C-IDU` e `probabilidade de permanecer no top 10` sob variação dos pesos de domínio e de porte (15%, 25% e 35%).
