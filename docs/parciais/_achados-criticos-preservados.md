# Achados críticos preservados — gravação de emergência

**Status:** preservação contra perda por limite de sessão
**Escrito por:** agente principal, a partir das notificações internas de conclusão dos levantamentos regionais e internacionais
**Data:** 2026-08-01
**Aviso de procedência:** este arquivo transcreve o que os agentes **afirmaram** ter verificado. Eu não reabri estas URLs. Nenhuma linha aqui é evidência de primeira mão minha — é evidência de primeira mão *do agente*, ainda sujeita à auditoria adversarial da fase 3. Onde o agente disse ter aberto a URL, preservo `[fetch-ok — segundo o agente]`.

---

## 1. Achado central: rankings de "cidade inteligente" não predizem dado aberto

Fonte: agente `indices:transparencia` (31 URLs abertas com sucesso, 18 falhas registradas, zero linhas `nao-testado` nas fontes).

Divergência sistemática entre índices de reputação urbana e disponibilidade real de dado aberto. Verificações diretas:

| Cidade | Posição no índice | O que a verificação direta encontrou |
|---|---|---|
| Florianópolis/SC | 1ª no CLP, 2ª no Connected Smart Cities | `dadosabertos.pmf.sc.gov.br` **não resolve em DNS**. O "dados abertos" oficial é portal fiscal terceirizado, só finanças `[fetch-falhou — segundo o agente]` |
| Vitória/ES | 1ª no CSC (61,3), 2ª no CLP | `dados.vitoria.es.gov.br` **404**. Política formal boa (Decreto 22.378/2023, Portaria CGM 011/2023, licença CC0, API em `wstransparencia.vitoria.es.gov.br`), cobertura real verificada só fiscal |
| Porto Alegre/RS | 4ª no CLP | **DataPOA oficialmente fora do ar** por manutenção da Procempa. `datapoa.com.br` não completa conexão |
| Curitiba/PR | 5ª no CLP e no CSC | Apenas **32 conjuntos**, sem saúde, educação, segurança ou meio ambiente |

**Recomendação metodológica do agente:** usar o Índice de Dados Abertos para Cidades da Open Knowledge Brasil e o ITGP como filtro, confirmando sempre por API. **Ignorar CLP e Connected Smart Cities como proxy de dado aberto.**

---

## 2. Nenhuma cidade grande do Brasil tem cobertura equilibrada

Medições feitas via API CKAN (`package_search` com `facet.field=[groups]`), não por interface HTML — números auditáveis por domínio.

| Cidade | Conjuntos | Distribuição por domínio | Veredito |
|---|---|---|---|
| **Fortaleza/CE** | — | Saúde 35, Economia 34, Gestão Pública 32, Transporte 25, Meio Ambiente e Urbanismo 17, Educação 12, **Segurança 1** | **Única distribuição genuinamente plana do país.** API integralmente funcional |
| **São Paulo/SP** | 474 | Finanças 55, Educação 45, Meio Ambiente 42 **contra** Mobilidade 8, Saúde 5, Segurança 5 | Desequilíbrio de **10:1**. Lidera o ODI da OKBR, mas saúde, transporte e criminalidade vivem *fora* do portal (TabNet, SPTrans, SSP-SP) |
| **Belo Horizonte/MG** | 602 | 21 grupos, cobrindo **todos os 8 domínios** do projeto | Melhor estrutura de domínios do país, mas só ~80 dos 602 conjuntos estão classificados em grupo |
| **Recife/PE** | — | Melhor profundidade e granularidade | Série de arboviroses 2013-2025 em **CSV por registro, com distrito e bairro**, atualização trimestral, metadado de 20/05/2026. Exige contornar interface quebrada usando só a API |
| **Rio de Janeiro/RJ** | — | ITGP 2025 = **98/100**; melhor base de criminalidade aberta do país (ISP-RJ) | Maior potencial **e** maior custo de engenharia — acesso máquina-a-máquina ruim |

Por isso o agente ranqueou **Fortaleza à frente de São Paulo**, apesar de São Paulo liderar o índice da OKBR.

---

## 3. Risco operacional — não aparece em nenhum índice, e é o maior risco do piloto

Casos concretos medidos:

- Portal da CGU (`mbt.cgu.gov.br`, Escala Brasil Transparente): **em manutenção, retorno previsto para novembro/2026**
- **DataPOA** (Porto Alegre): offline
- **Recife**: interface web em **HTTP 500** enquanto a API funciona — e mesmo na API, `package_search`, `group_show` e `group_list?all_fields=true` retornam 500
- **GeoSampa** (São Paulo): atrás de **CAPTCHA da Prodam**, inviabiliza coleta automatizada
- **Data.Rio**: single-page application em ArcGIS Hub; único feed legível por máquina (DCAT-US) expõe 50 conjuntos com distribuição **exclusivamente `text/html`**. Três domínios concorrentes para o mesmo portal. `dados.mobilidade.rio` = 404
- **Brasília/DF**: portal abre mas é SPA, não permitiu contar nada

**Consequência arquitetural:** o Brasil iA precisa assumir portais instáveis e **cachear localmente desde o dia um**.

---

## 4. Regiões sem candidata

- **Norte:** `dados.belem.pa.gov.br` e `dadosabertos.manaus.am.gov.br` **falham na resolução de DNS**. Nenhuma candidata encontrada. Coerente com o ODI da OKBR (Boa Vista com 0 ponto; 21 das 26 capitais classificadas como "opacas").
- **Centro-Oeste:** única opção é **Brasília/DF**, incluída por vantagem estrutural — o DF concentra competência municipal *e* estadual, logo segurança, saúde, educação e mobilidade ficam sob a mesma jurisdição. Ressalva explícita: **cobertura não verificada** (portal é SPA).
- **Sul:** Florianópolis, Curitiba e Porto Alegre descartadas por evidência negativa direta.
- **Não testada:** Niterói/RJ (3ª no CSC 2025) — `dados.niteroi.rj.gov.br` recusou conexão (ECONNREFUSED) e o endereço alternativo não pôde ser buscado por esgotamento do orçamento de busca. **Pendência real para a fase 3.**

---

## 5. Recomendação provisória do agente de índices

> Fortaleza como piloto principal (única cobertura equilibrada comprovada, API integralmente funcional), com Recife como segundo (melhor profundidade e granularidade, porém exige contornar a interface quebrada usando só a API). São Paulo e Belo Horizonte servem como fontes de referência e benchmark de metodologia, não como piloto, pelo desequilíbrio entre domínios. Rio de Janeiro é a aposta de maior potencial e a de maior custo de engenharia.

**Não tratar como conclusão.** É a leitura de um agente, antes da auditoria adversarial e da arena cega.

---

## 6. O que não foi confirmado, e por quê

| Item | Motivo |
|---|---|
| Ranking da Escala Brasil Transparente | `mbt.cgu.gov.br` redireciona para aviso de manutenção até nov/2026 |
| Lista nominal dos municípios com selo Diamante no PNTP 2025 | O Radar da Atricon não expõe ranking navegável por fetch; resultados por ente estão dentro de ZIPs não baixados. Agregados oficiais obtidos: 998 Diamante, 1.082 Ouro, 832 Prata, 2.912 certificados de mais de 10.000 avaliados, índice médio 66,6% |
| IGM-CFA | `igm.cfa.org.br` responde **HTTP 500**, `/metodologia` dá 404. Zero evidência primária — nenhum ranking dele foi reportado |
| Top 10 completo do Connected Smart Cities 2025 | Site oficial confirma ano, 13 eixos e normas ISO 37120/37122/37123, mas **não lista as cidades em texto**. Posições 1-5 (Vitória 61,3, Florianópolis, Niterói, São Paulo, Curitiba) vieram de busca, **não** de página aberta — por isso não entraram como `fetch-ok` |
| Índice de Dados Abertos da OKBR | `ok.org.br` devolve **403** ao WebFetch em duas URLs. Conteúdo triangulado por três páginas abertas (CGM de São Paulo, Brasil 61, Poder360), coincidentes nos números. Última edição documentada coletou em 2023 e publicou em 2024; nova metodologia em consulta pública. **Sem edição 2025/2026 confirmada** |

---

## 7. Régua mundial — Londres (único dossiê já auditado)

Fonte: `dossie:Londres` + `auditor:Londres`. Veredito de credibilidade: o pilar de mobilidade **resistiu à auditoria sem uma correção**.

- **Mobilidade — o padrão a ser batido:** TfL Unified API, 14 grupos de recursos confirmados no swagger por recheck independente (AccidentStats, AirQuality, BikePoint, Cabwise, Journey, Line, Mode, Occupancy, Place, Road, Search, StopPoint, TravelTime, Vehicle). **Prova de vida reproduzida:** `api.tfl.gov.uk/BikePoint/BikePoints_1` retornou `NbBikes=1, NbEmptyDocks=17, NbDocks=19`, `modified=2026-07-31T18:55:29Z`. Falha real confirmada nos dois passes: `/Occupancy/CarPark` retorna HTTP 500 — endpoint documentado e efetivamente quebrado.
- **Segurança:** `data.police.uk` cobre 43 forças incluindo a Metropolitan Police, granularidade **LSOA 2021**, mês mais recente publicado = **junho/2026**. Ressalvas que o auditor achou e o analista não reportou: (a) **Sexual Offences não são fornecidos em nível LSOA** por proteção de dados, logo a granularidade não é uniforme entre categorias; (b) a classificação de Burglary mudou em abril/2017, segunda quebra de comparabilidade além do CONNECT.
- **Educação — fraqueza:** teto de granularidade em *borough*, só XLSX, sem CSV, **sem API**. Dois dos 6 arquivos começam só em ago/2022, então a série longa não cobre todos os recortes.
- **Correção mais importante do auditor:** o dossiê **omitiu meio ambiente por inteiro**. O London Atmospheric Emissions Inventory 2022 tem grid de **20 metros** para concentrações — granularidade mais fina de todo o portal, mais fina que LSOA — em Excel, shapefile, GeoPackage, CSV e ASCII, atualizado ~maio/2026, com versionamento explícito (o LAEI 2019 está marcado como *superseded*). Isso **contraria parcialmente a tese central do dossiê** de que a camada viva de Londres é federada e não própria da cidade: em meio ambiente, a camada viva é do GLA.
- **Correção estrutural:** a Greater London tem **32 boroughs mais a City of London Corporation**, que não é um borough — não 33 boroughs.
- **Fraqueza transversal confirmada:** licenciamento incoerente — OGL v2 no crime, OGL v3 na educação, licença não declarada no `data.police.uk` e no LAEI.

---

## 8. Nota de método sobre confiabilidade destes achados

Em 4 agentes (`setor:educacao`, `regiao:nordeste`, `dossie:Amsterda`, `dossie:Cidade do Mexico`, `dossie:Barcelona`, `auditor:Londres`) o classificador de segurança estava indisponível no momento da revisão. As afirmações desses agentes estão marcadas no sistema como **não revisadas** e devem passar obrigatoriamente pela auditoria adversarial da fase 3 antes de entrar no Top 10.
