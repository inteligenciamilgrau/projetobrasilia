# Projeto Brasil iA — piloto de dados municipais

Levantamento para selecionar municípios brasileiros com melhor combinação de dados públicos locais, cobertura temática, acesso por máquina, atualização e granularidade territorial.

O projeto está na fase de **seleção e auditoria das candidatas**. Ele não contém coleta em massa de dados municipais.

## Resultado atual 

A shortlist provisória está em [DOSSIE_PILOTO.md](DOSSIE_PILOTO.md). A seleção atual inclui Recife, São Paulo, Fortaleza, Rio de Janeiro, Porto Alegre, Curitiba, Belo Horizonte, Brasília, Jundiaí e Belém, com diferentes níveis de confiança e ressalvas documentadas.

O ranking mede adequação para um piloto de ingestão e análise. Ele não mede qualidade geral da administração municipal nem qualidade de vida.

Um [experimento separado com cidades pequenas](cidades-pequenas.html) cruza população 2025 e IDHM 2010 para formar dois Top 10: municípios de 7 mil a 15 mil habitantes e de 70 mil a 150 mil. Casca/RS, Águas da Prata/SP, Auriflama/SP, Nova Lima/MG, Rio do Sul/SC e Guaratinguetá/SP compõem o primeiro lote de auditoria. O IDHM é somente um pré-filtro eficiente; não entra na nota de qualidade dos dados.

Uma [tabela nacional dos 338 municípios com mais de 100 mil habitantes](municipios-100mil.html) organiza a expansão da coleta por estado, com status e fontes por município. Santa Catarina é o primeiro estado com triagem concluída; os demais aguardam contribuições da comunidade.

## Objetivos

1. Criar um sistema simples que ajude as pessoas a acessar dados e entender a própria cidade e as regiões onde moram.
2. Criar fóruns e chats para coleta e discussão de temas regionais e sociais, ampliando a participação para além dos representantes políticos. **Esta frente ainda não foi iniciada.**

Regra editorial: comece pela conclusão; escreva de forma clara, direta e objetiva; destaque somente o que muda a decisão. O protocolo completo está em [docs/PROTOCOLO_DOC_VIVO.md](docs/PROTOCOLO_DOC_VIVO.md).

## Estrutura

- `index.html` — página inicial do site, pronta para GitHub Pages;
- `fontes.html` — catálogo filtrável dos principais portais nacionais e fontes comunitárias;
- `cidades-pequenas.html` — dois Top 10 por porte/IDHM, triagem interativa e fila de auditoria;
- `municipios-100mil.html` — tabela nacional por estado dos municípios acima de 100 mil habitantes, com status da coleta;
- `municipios_100mil.json` — fonte estruturada da tabela: população IBGE 2025 e fontes por município;
- `inventario.html` — inventário filtrável das evidências concretas das dez cidades;
- `inventario_top10.json` — fonte estruturada dos 60 links do inventário municipal;
- `perfis_cidades.json` — sínteses, forças, riscos e próximos testes por candidata;
- `cidades/` — uma página detalhada para cada cidade do Top 10;
- `DOSSIE_PILOTO.md` — decisão consolidada e shortlist nacional;
- `relatorio_parcial.html` — versão visual e autônoma do relatório parcial;
- `docs/METRICA_IDU_V2.md` — definição do IDU-Br v2 e do índice de confiança C-IDU;
- `docs/CIDADES_PEQUENAS.md` — método, listas completas, evidências e limites do experimento de pequeno porte;
- `docs/MUNICIPIOS_100MIL.md` — método, contagens por UF e modelo de coleta da tabela nacional de 100 mil+;
- `idu_v2.py` — implementação do cálculo, sem notas de cidades embutidas;
- `docs/parciais/` — evidências, limitações e levantamentos regionais/setoriais;
- `docs/PROTOCOLO_DOC_VIVO.md` — regras de procedência e verificação das fontes;
- `idu.py` e `docs/METRICA_IDU.md` — versão 1 preservada apenas como legado reproduzível.

## Executar o cálculo

Requisito: Python 3.9 ou superior. O código utiliza somente a biblioteca padrão.

```bash
python idu_v2.py --self-test
python idu_v2.py caminho/para/matriz-auditada.json
python idu_v2.py caminho/para/matriz-auditada.json --equal-weights --json
python idu_v2.py caminho/para/matriz-auditada.json --pilot-size-weight 0.25
```

O formato resumido da matriz de entrada está documentado no início de `idu_v2.py`. Cada cidade deve informar população, data de referência e fonte oficial. A separação entre a matriz auditada e o motor de cálculo evita notas hardcoded e permite revisão independente.

## Como interpretar a evidência

Cada fonte nos relatórios parciais deve usar um marcador:

- `[fetch-ok]` — a página ou recurso foi aberto na sessão declarada;
- `[fetch-falhou]` — a tentativa falhou e o motivo foi registrado;
- `[nao-testado]` — a URL é apenas uma pista e não conta como evidência confirmada;
- `[NACIONAL — não pontua]` — fonte disponível igualmente para todos os municípios.

O IDU-Br avalia a qualidade do ecossistema de dados. O P-Piloto mede a adequação do porte populacional e o IPS-Br combina 75% de IDU-E com 25% de porte para ordenar a implantação. O C-IDU avalia a confiabilidade da medição e permanece sempre separado.

O inventário municipal separa **volume declarado** de **recurso confirmado**. Um total exibido pelo catálogo serve como pista; só entra na amostra auditada quando a URL, o produtor, o acesso, a granularidade, o frescor e o resultado do teste estão registrados.

## Segurança e privacidade

O projeto não necessita de tokens, chaves ou credenciais. Não versione `.env`, registros de agentes, matrizes privadas ou arquivos de acesso. Consulte [SECURITY.md](SECURITY.md) para relatar problemas.

## Limitações

- Portais JavaScript podem ser subestimados quando não expõem catálogo ou API legível.
- Segurança pública frequentemente depende de fontes estaduais; por isso a métrica separa capacidade municipal e ecossistema local.
- Portais padronizados de fornecedores não provam governança municipal: somente recursos testados pontuam acesso.
- A shortlist continua provisória até a leitura de pelo menos um recurso real por domínio nas cidades finalistas.

## Licença

A licença do código e dos textos ainda não foi definida. Até que os mantenedores escolham uma licença, a publicação no GitHub não concede automaticamente permissão de reutilização.
