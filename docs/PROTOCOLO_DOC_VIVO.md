# Protocolo do documento vivo — Projeto iA Brasil

Todo agente que pesquisa neste projeto **escreve enquanto pesquisa**. Não existe "entrego no fim".

## Regra 0 — Ninguém tem tempo

- Comece pela conclusão e pelos números que sustentam a decisão.
- Escreva de forma clara, direta e objetiva.
- Destaque os pontos-chave que realmente mudam a escolha ou a ação.
- Deixe contexto, processo e detalhes metodológicos para depois do resultado.
- Evite introduções cerimoniais, repetição e linguagem burocrática.
- Se uma frente ainda não começou, diga isso explicitamente.

## Regra 1 — Cada agente escreve só no seu próprio arquivo

- Seu arquivo é `docs/parciais/<seu-label>.md`. Exemplo: o agente `regiao:nordeste` escreve em `docs/parciais/regiao-nordeste.md`.
- **Nunca** edite `DOSSIE_PILOTO.md` nem o arquivo parcial de outro agente. Só o agente `compilador` faz isso.
- Motivo: agentes rodam em paralelo. Dois agentes editando o mesmo arquivo se sobrescrevem e a evidência é perdida em silêncio.

## Regra 2 — Escreva incrementalmente, do primeiro achado em diante

1. Crie seu arquivo com o cabeçalho (modelo abaixo) **antes** da primeira busca.
2. A cada fonte que você abrir, acrescente a linha correspondente. Não acumule para escrever tudo de uma vez — se você for interrompido por limite de sessão, o que não estava no disco está perdido.
3. Ao terminar, preencha a seção `Síntese`.

## Regra 3 — Correção é aditiva, nunca destrutiva

Quando você descobrir que algo que escreveu está errado, **não apague**. Marque:

```markdown
- ~~`dados.vitoria.es.gov.br` — portal de dados abertos municipal~~
  **CORRIGIDO 2026-08-01:** retorna HTTP 404. A política existe (Decreto 22.378/2023) mas o portal não. Cobertura real verificada: apenas fiscal.
```

O histórico do erro é informação: mostra o que parece verdade e não é. Se o próximo agente não vê o erro derrubado, ele repete.

## Regra 4 — Status de verificação obrigatório em cada fonte

Toda URL citada carrega um marcador, sem exceção:

| Marcador | Significado |
|---|---|
| `[fetch-ok]` | Você abriu esta URL com WebFetch **nesta sessão** e ela devolveu o que você afirma |
| `[fetch-falhou]` | Você tentou abrir e falhou — anote o erro real (404, 500, DNS, CAPTCHA, timeout) |
| `[nao-testado]` | Você só viu citada em busca. Vale como pista, **não** como evidência |

Uma afirmação sem marcador é tratada como falsa pelo auditor. Volume não pontua: 6 fontes reais valem mais que 30 inventadas.

## Regra 5 — Dado nacional não pontua para cidade nenhuma

DATASUS/TabNet, INEP/Censo Escolar, PNCP, SICONFI, CNPJ da Receita, RAIS/CAGED estão disponíveis para os 5.570 municípios. Eles **não diferenciam** candidata. Se você citar uma dessas bases, marque `[NACIONAL — não pontua]` e explique qual esforço *municipal próprio* existe além dela.

## Regra 6 — Registre a fraqueza

Toda cidade tem furo. Seção `Fraquezas e riscos` é obrigatória. Um relatório sem fraquezas é rejeitado pelo auditor, porque significa que você não olhou fundo o bastante.

## Modelo do arquivo parcial

```markdown
# <label do agente> — <escopo>

**Status:** em andamento | concluído
**Última atualização:** <data>
**Agente:** <label>

## Fontes verificadas

| Cidade/UF | Domínio | Fonte | URL | Acesso | Granularidade | Atualização | Status |
|---|---|---|---|---|---|---|---|
| Fortaleza/CE | saúde | Portal de Dados Abertos | dados.fortaleza.ce.gov.br | API CKAN | ... | ... | `[fetch-ok]` |

## Achados

## Correções (o que eu mesmo derrubei)

## Fraquezas e riscos

## O que não consegui verificar, e por quê

## Síntese
```

## Regra 7 — Diga o que você não conseguiu

"Não verifiquei X porque o orçamento de busca esgotou" é uma contribuição válida e necessária. Silenciar um gap faz o próximo agente assumir que a área foi coberta.
