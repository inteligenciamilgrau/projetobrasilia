# Projeto iA Brasil — experimento com cidades pequenas

**Status:** pré-filtro reproduzível concluído; triagem rápida de portais concluída; auditoria IDU-Br ainda pendente  
**Data de corte:** 2026-08-01  
**Escopo:** municípios próximos de 10 mil e 100 mil habitantes; ranking separado do Top 10 nacional

## Resposta curta

- **≈ 10 mil habitantes:** Casca/RS é a primeira cidade a auditar. Águas da Prata/SP e Auriflama/SP vêm logo depois.
- **≈ 100 mil habitantes:** Nova Lima/MG, Rio do Sul/SC e Guaratinguetá/SP formam o primeiro lote de auditoria.

O resultado ainda não afirma que essas são as cidades com os melhores dados. Ele afirma algo mais restrito e verificável: **entre as 20 candidatas escolhidas pelo pré-filtro, elas apresentaram os sinais oficiais mais promissores numa busca rápida**.

---

## 1. Por que este ranking é separado

O P-Piloto do ranking nacional favorece uma faixa capaz de produzir um teste representativo sem a complexidade de uma metrópole. Uma cidade de 7 mil a 15 mil habitantes tem outro valor experimental: permite testar cobertura muito fina — bairro, localidade, setor censitário, endereço e equipamento — com menor volume operacional.

Misturar as duas perguntas produziria uma contradição. A baixa população prejudicaria a representatividade no ranking nacional justamente quando ela é a característica procurada neste experimento.

Este ranking mede, portanto, **potencial para um microlaboratório territorial**, não prioridade nacional de implantação.

---

## 2. Funil de busca

1. Cruzar, em lote, a estimativa populacional municipal do IBGE para 2025 com o IDHM 2010 do Atlas Brasil.
2. Manter somente municípios entre **7.000 e 15.000 habitantes** ou entre **70.000 e 150.000 habitantes**.
3. Em cada faixa, ordenar pelo IDHM decrescente.
4. Resolver empate pela distância proporcional até o alvo da faixa e depois pelo nome do município.
5. Abrir portais somente das dez primeiras colocadas em cada faixa.
6. Procurar sinais de acesso estruturado, cobertura temática, território, atualidade e governança.
7. Escolher três de cada faixa para a auditoria cara: um recurso real em cada um dos oito domínios do IDU-Br.

As faixas são operacionais, não definições oficiais de cidade pequena. Elas são quase simétricas em escala multiplicativa em torno dos alvos e podem ser alteradas numa análise de sensibilidade.

### Fontes do cruzamento

- População: [IBGE — Estimativas da População 2025, revisão de 13/01/2026](https://ftp.ibge.gov.br/Estimativas_de_Populacao/Estimativas_2025/POP2025_20260113.ods).
- IDHM: [PNUD — ranking completo do IDHM dos municípios em 2010](https://www.undp.org/pt/brazil/idhm-municipios-2010).
- Série usada para o cruzamento: [IPEAData — API `ADH_IDHM`](http://www.ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='ADH_IDHM')).

O IDHM municipal comparável continua ancorado no Censo 2010. Ele é usado apenas como heurística de busca; não recebe pontos no IDU-Br e não deve ser apresentado como retrato atual da prefeitura.

---

## 3. Top 10 do pré-filtro — aproximadamente 10 mil habitantes

Faixa: 7.000 a 15.000 habitantes.

| # IDHM | Município | Código IBGE | População 2025 | IDHM 2010 |
|---:|---|---:|---:|---:|
| 1 | Treze Tílias/SC | 4218509 | 9.531 | 0,795 |
| 2 | Saltinho/SP | 3545159 | 8.407 | 0,791 |
| 3 | Casca/RS | 4304903 | 9.698 | 0,785 |
| 4 | Águas da Prata/SP | 3500402 | 7.463 | 0,781 |
| 5 | Itaú de Minas/MG | 3133758 | 14.634 | 0,776 |
| 6 | Trombudo Central/SC | 4218608 | 7.599 | 0,775 |
| 7 | Siderópolis/SC | 4217600 | 14.156 | 0,774 |
| 8 | Ouro/SC | 4211801 | 7.062 | 0,774 |
| 9 | Paraí/RS | 4314001 | 7.362 | 0,773 |
| 10 | Auriflama/SP | 3504206 | 13.856 | 0,773 |

### Triagem dos dados

| Prioridade | Município | Evidência diferenciadora localizada | Limite encontrado | Decisão |
|---:|---|---|---|---|
| 1 | **Casca/RS** | Páginas administrativas exportam CSV/PDF e estão atualizadas em 2026; edital municipal descreve SIGWeb integrado ao cadastro territorial, viabilidade, iluminação, numeração predial e cemitério | O acesso público ao SIGWeb e bases sociais ainda não foi confirmado | **auditar agora** |
| 2 | **Águas da Prata/SP** | API oficial sem autenticação, JSON/XML, paginação, limite documentado e sete módulos | Módulos localizados são licitações, legislação, contratos, notícias, atas e concursos; cobertura social estreita | **auditar agora** |
| 3 | **Auriflama/SP** | API oficial com a mesma arquitetura documentada | Mesmo risco de uma boa API servir apenas ao conteúdo administrativo do portal | **auditar agora** |
| 4 | Saltinho/SP | Protocolo digital corrente e portal temático de serviços | Digitalização de serviço não equivale a dados abertos | reserva |
| 5 | Itaú de Minas/MG | Quatro conjuntos JSON oficiais | Fonte é a Câmara Municipal e cobre sobretudo instituição e processo legislativo, não o Executivo | reserva |
| 6–10 | Treze Tílias, Siderópolis, Trombudo Central, Ouro e Paraí | Transparência, ERP ou sistemas internos foram localizados | Nenhum diferencial multidomínio ou territorial aberto foi confirmado na varredura rápida | nova busca somente após o primeiro lote |

Evidências principais:

- Casca: [editais com CSV](https://www.casca.rs.gov.br/portal/editais/1) e [contratação do SIGWeb](https://www.casca.rs.gov.br/portal/editais/0/1/993/).
- Águas da Prata: [documentação de dados abertos e API](https://www.aguasdaprata.sp.gov.br/dados-abertos).
- Auriflama: [documentação de dados abertos e API](https://www.auriflama.sp.gov.br/dados-abertos).
- Itaú de Minas: [dados abertos da Câmara](https://www.itaudeminas.mg.leg.br/transparencia/dados-abertos).

---

## 4. Top 10 do pré-filtro — aproximadamente 100 mil habitantes

Faixa: 70.000 a 150.000 habitantes.

| # IDHM | Município | Código IBGE | População 2025 | IDHM 2010 |
|---:|---|---:|---:|---:|
| 1 | Valinhos/SP | 3556206 | 132.258 | 0,819 |
| 2 | Vinhedo/SP | 3556701 | 79.089 | 0,817 |
| 3 | Nova Lima/MG | 3144805 | 120.959 | 0,813 |
| 4 | Assis/SP | 3504008 | 104.858 | 0,805 |
| 5 | Rio do Sul/SC | 4214805 | 77.451 | 0,802 |
| 6 | Pirassununga/SP | 3539301 | 75.594 | 0,801 |
| 7 | Concórdia/SC | 4204301 | 87.206 | 0,800 |
| 8 | Guaratinguetá/SP | 3518404 | 121.916 | 0,798 |
| 9 | São João da Boa Vista/SP | 3549102 | 96.080 | 0,797 |
| 10 | Fernandópolis/SP | 3515509 | 73.508 | 0,797 |

### Triagem dos dados

| Prioridade | Município | Evidência diferenciadora localizada | Limite encontrado | Decisão |
|---:|---|---|---|---|
| 1 | **Nova Lima/MG** | GeoPNL público com camadas, ferramentas territoriais e indicação de downloads pela INDE | É preciso enumerar camadas, formatos, atualização e cobertura além do urbanismo | **auditar agora** |
| 2 | **Rio do Sul/SC** | Portal Atende declara dados abertos segundo recomendações da INDA; prefeitura mantém inventário e SIGEP de projetos | Ainda falta enumerar recursos sociais e testar as exportações | **auditar agora** |
| 3 | **Guaratinguetá/SP** | Observatório municipal, fichas metodológicas, relatórios e APEMs compostas por grupos de bairros | Parte importante do conteúdo localizado é de 2017–2020 e pode estar descontinuada | **auditar agora** |
| 4 | Vinhedo/SP | JSON administrativo e Mappa Web público com bairros, logradouros, quadras, lotes, risco e zoneamento | O JSON exclui sistemas externos e não comprova dados operacionais | reserva forte |
| 5 | Valinhos/SP | JSON administrativo e coleção municipal de mapas temáticos | O catálogo é de conteúdo do site, não um catálogo multidomínio integrado | reserva forte |
| 6 | Assis/SP | JSON administrativo e mapas temáticos de escolas, unidades de saúde, CRAS, ambiente e viário | Boa documentação territorial, mas acesso majoritariamente por documento/mapa | reserva |
| 7–9 | Pirassununga, Concórdia e Fernandópolis | Sistemas de transparência ou geoprocessamento foram localizados | A publicação efetiva, exportação e governança precisam ser confirmadas | reserva |
| 10 | São João da Boa Vista/SP | Indicadores nacionais sobre o município aparecem no portal | Nenhum catálogo ou sistema municipal diferenciador foi localizado | nova busca posterior |

Evidências principais:

- Nova Lima: [GeoPNL](https://www.novalima.mg.gov.br/inicio/portal-servicos/servico/geopnl).
- Rio do Sul: [dados abertos no Portal da Transparência](https://riodosul.atende.net/transparencia/) e [SIGEP municipal](https://sigep.riodosul.sc.gov.br/index).
- Guaratinguetá: [Observatório de Políticas Públicas](https://observatorio.guaratingueta.sp.gov.br/observatorio-de-politicas-publicas/) e [Participa Guará/APEMs](https://observatorio.guaratingueta.sp.gov.br/elementor-11721/).
- Vinhedo: [dados abertos JSON](https://www.vinhedo.sp.gov.br/portal/dados-abertos) e [descrição oficial do Mappa Web](https://www.vinhedo.sp.gov.br/portal/noticias/0/3/16111/procon).
- Valinhos: [dados abertos JSON](https://www.valinhos.sp.gov.br/portal/dados-abertos) e [mapas municipais](https://www.valinhos.sp.gov.br/mapas/).
- Assis: [dados abertos JSON](https://www.assis.sp.gov.br/portal/dados-abertos) e [mapas temáticos do Plano Diretor](https://www.assis.sp.gov.br/portal/servicos/1041/plano-diretor-do-municipio/).

---

## 5. Critérios da triagem rápida

A triagem não atribui um IDU-Br. Ela usa cinco perguntas binárias ou descritivas para priorizar auditoria:

1. **Acesso:** há CSV, JSON, XML, API ou serviço geográfico, ou apenas tela/PDF?
2. **Cobertura:** aparecem dados além de finanças, contratos, legislação e notícias?
3. **Território:** há bairro, localidade, setor censitário, endereço, equipamento, lote ou camada geográfica?
4. **Atualidade:** a página contém registros correntes, série histórica ou rotina de atualização?
5. **Governança:** há inventário, metodologia, documentação, órgão responsável e permanência institucional?

Uma plataforma genérica de fornecedor pode produzir uma API tecnicamente correta em centenas de municípios. Isso pontua acesso quando o recurso funciona, mas **não prova governança local nem cobertura temática**.

---

## 6. Como medir a confiança

### Confiança do pré-filtro: média

- Alta para a população 2025 e para o valor publicado de IDHM 2010.
- Média para a comparação substantiva, porque o IDHM está defasado e não mede abertura de dados.
- O cruzamento deixou uma incompatibilidade entre município histórico/topologia atual, sem efeito sobre os 20 selecionados.

### Confiança da triagem: baixa a média

- Evidência positiva vem de página oficial ou sistema indicado pela prefeitura.
- “Não localizado” não significa “não existe”. Portais em JavaScript, páginas não indexadas e serviços protegidos podem gerar falso negativo.
- Contratação de sistema prova intenção/capacidade interna, não publicação externa.
- Página de catálogo prova existência do catálogo, não a qualidade de cada recurso.

### Confiança exigida para promover uma cidade

Para cada uma das seis finalistas, abrir pelo menos um recurso real em saúde, segurança, educação, mobilidade, economia, finanças, urbanismo e ambiente. Registrar URL, produtor, formato, esquema, data, recorte territorial, resultado do acesso e repetibilidade. Só então calcular IDU-E e C-IDU.

---

## 7. Próximo teste de maior retorno

1. **Casca:** localizar e abrir o SIGWeb; testar um CSV; procurar bases municipais de saúde e educação.
2. **Águas da Prata e Auriflama:** chamar os endpoints documentados, contar registros por módulo e verificar se existem módulos não anunciados.
3. **Nova Lima:** inventariar todas as camadas do GeoPNL/INDE, formatos, produtores, atualização e granularidade.
4. **Rio do Sul:** enumerar o inventário de dados abertos e baixar recursos de áreas diferentes.
5. **Guaratinguetá:** separar conteúdo vivo de legado; localizar arquivos estruturados por APEM/bairro.
6. Comparar o resultado com as reservas Vinhedo e Valinhos para reduzir o risco de escolher um excelente geoportal com cobertura temática estreita.

Nenhuma coleta em massa é necessária antes desses testes.
