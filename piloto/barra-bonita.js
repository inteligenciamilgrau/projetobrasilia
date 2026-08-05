// ===========================================================================
// Barra Bonita/SC — montagem dos gráficos do piloto.
//
// Carrega DEPOIS de charts.js e reaproveita os renderizadores genéricos de lá.
// As funções build* de Itajubá e as ss* de Serra da Saudade NÃO são
// reaproveitadas: cada uma traz a narrativa da sua cidade escrita no meio do
// código. O desenho é comum; o texto é de cada uma.
//
// Nenhum número mora neste arquivo. Tudo vem de ../dados/barra-bonita/.
// ===========================================================================

const BB = { dir: "../dados/barra-bonita/", cache: {} };

BB.get = function (nome) {
  if (!this.cache[nome]) {
    this.cache[nome] = fetch(this.dir + nome).then(r => {
      if (!r.ok) throw new Error(nome + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[nome];
};

// ---------------------------------------------------------------------------
// Fase 1 — população. Aqui a queda é real e contínua, diferente das outras duas
// cidades do piloto: não é artefato de estimativa, os três Censos confirmam.
// ---------------------------------------------------------------------------
function bbPopulacao(root, pop) {
  const st = getComputedStyle(root);
  renderLineChart(root, {
    series: [{
      key: "pop", label: "População residente",
      color: st.getPropertyValue("--v-series-receita").trim() || "#08724e",
      points: pop.serie.map(p => ({ y: p.populacao, kind: p.fonte })),
    }],
    xValues: pop.serie.map(p => String(p.ano)),
    yLabel: "População residente",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " hab.",
    markCensus: true,
  });

  const censos = pop.serie.filter(p => p.fonte === "censo");
  const [c00, c10, c22] = censos;
  const ult = pop.serie[pop.serie.length - 1];

  renderStats(root, [
    { value: fmtInt.format(c22.populacao), label: "Censo 2022", note: `Eram ${fmtInt.format(c00.populacao)} no Censo 2000` },
    { value: pct(100 * (c22.populacao / c00.populacao - 1), 1), label: "Variação entre os Censos 2000 e 2022", note: `${fmtInt.format(c00.populacao - c22.populacao)} pessoas a menos` },
    { value: pct(100 * (c22.populacao / c10.populacao - 1), 1), label: "Variação entre 2010 e 2022" },
    { value: fmtInt.format(ult.populacao), label: `Estimativa ${ult.ano}`, note: "A série segue caindo" },
  ]);

  note(root, `<strong>Esta cidade está encolhendo, e os três Censos concordam.</strong> De
    ${fmtInt.format(c00.populacao)} habitantes em 2000 para ${fmtInt.format(c10.populacao)} em 2010 e
    ${fmtInt.format(c22.populacao)} em 2022 — <strong>${pct(100 * (c22.populacao / c00.populacao - 1), 1)} em
    22 anos</strong>. Não é ruído de estimativa: são três contagens completas, na mesma direção. Isso separa Barra
    Bonita das outras duas cidades do piloto — em <a href="serra-da-saudade.html">Serra da Saudade</a> a estimativa
    errava para baixo e o Censo 2022 corrigiu a população para <em>cima</em>; em
    <a href="itajuba.html">Itajubá</a> errava para cima e o Censo corrigiu para baixo. Aqui não há correção a fazer:
    a queda é o dado.`);

  note(root, `<strong>E é uma queda que convive com economia em alta.</strong> Guarde este número para a Fase 3:
    no mesmo período o PIB do município <em>cresceu</em> 25% em termos reais. Gente saindo e economia crescendo ao
    mesmo tempo é o padrão de uma cidade que se mecanizou no campo — e a Fase 8, com a agropecuária respondendo por
    mais da metade do valor adicionado, dá o contorno disso.`);

  note(root, `2007 e 2023 não têm valor publicado para este município nesta tabela do IBGE — a linha salta o ano em
    vez de inventar o ponto.`);

  renderTable(root, {
    caption: "População de Barra Bonita/SC, 2000–2025",
    columns: ["Ano", "População", "Fonte"],
    rows: pop.serie.map(p => [String(p.ano), fmtInt.format(p.populacao),
      p.fonte === "censo" ? "Censo (contagem)" : "Estimativa"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 2 — IDHM + IPS.
// ---------------------------------------------------------------------------
function bbIdhm(root, idhm, ips) {
  const st = getComputedStyle(root);
  renderLineChart(root, {
    series: [
      { key: "educ", label: "Educação", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e", points: idhm.serie.map(p => ({ y: p.educacao })) },
      { key: "long", label: "Longevidade", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: idhm.serie.map(p => ({ y: p.longevidade })) },
      { key: "renda", label: "Renda", color: st.getPropertyValue("--v-series-3").trim() || "#eb6834", points: idhm.serie.map(p => ({ y: p.renda })) },
    ],
    xValues: idhm.serie.map(p => String(p.ano)),
    yLabel: "IDHM por dimensão",
    yFormat: (v) => v.toFixed(2).replace(".", ","),
    yFormatFull: (v) => v.toFixed(3).replace(".", ","),
  });

  const a = idhm.serie[0], z = idhm.serie[idhm.serie.length - 1];
  renderStats(root, [
    { value: z.geral.toFixed(3).replace(".", ","), label: `IDHM Geral · Censo ${z.ano}`, note: `Era ${a.geral.toFixed(3).replace(".", ",")} em ${a.ano}` },
    { value: ips.indicadores.ips_geral.toFixed(2).replace(".", ","), label: "IPS Brasil · edição 2026", note: "Escala 0–100 — outro índice, não é continuação do IDHM" },
    { value: z.educacao.toFixed(3).replace(".", ","), label: `IDHM Educação · ${z.ano}`, note: `Saiu de ${a.educacao.toFixed(3).replace(".", ",")} — mais que quadruplicou` },
    { value: ips.indicadores.comp_agua_saneamento.toFixed(1).replace(".", ","), label: "IPS · componente Água e saneamento", note: "O ponto mais fraco do retrato atual" },
  ]);

  note(root, `<strong>A Educação foi de ${a.educacao.toFixed(3).replace(".", ",")} para
    ${z.educacao.toFixed(3).replace(".", ",")}</strong> entre ${a.ano} e ${z.ano} — mais que quadruplicou, e é de
    longe a dimensão que mais andou. Longevidade e Renda também subiram, com o IDHM geral saindo de
    ${a.geral.toFixed(3).replace(".", ",")} para ${z.geral.toFixed(3).replace(".", ",")}.`);

  note(root, `<strong>O retrato atual pesa em saneamento.</strong> O IPS Brasil 2026 dá
    ${ips.indicadores.comp_agua_saneamento.toFixed(1).replace(".", ",")} no componente Água e saneamento — o mais
    baixo entre os componentes de necessidades básicas desta cidade —, e o Panorama do IBGE registra apenas 12,5%
    de domicílios com esgotamento sanitário adequado (dado de 2010). Num município onde três em cada quatro
    moradores vivem na zona rural (Fase 7), isso é esperado: rede de esgoto é infraestrutura urbana.`);

  note(root, `<strong>Duas ressalvas de método.</strong> O IDHM para em 2010 e não vai continuar — o Atlas do
    Desenvolvimento Humano não foi recalculado depois daquele Censo, então não existe versão mais recente para
    nenhum município do país. E IDHM e IPS não formam uma linha do tempo única: medem coisas parecidas com
    metodologias e escalas diferentes.`);

  renderTable(root, {
    caption: "IDHM de Barra Bonita/SC por dimensão, 1991–2010",
    columns: ["Ano", "IDHM Geral", "Educação", "Longevidade", "Renda"],
    rows: idhm.serie.map(p => [String(p.ano), p.geral.toFixed(3).replace(".", ","),
      p.educacao.toFixed(3).replace(".", ","), p.longevidade.toFixed(3).replace(".", ","),
      p.renda.toFixed(3).replace(".", ",")]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — finanças.
// ---------------------------------------------------------------------------
const BB_SALDO_NOTAS = {
  2014: "Primeiro ano com dado estruturado no SICONFI. Orçamento de R$ 10,8 mi.",
  2018: "Primeiro déficit da série: a receita cai 20% em relação a 2017 e a despesa continua subindo.",
  2020: "Pequeno déficit no ano da pandemia, mesmo com o auxílio federal entrando.",
  2022: "Salto de receita: 34% acima de 2021, puxado por FPM e cota-parte do ICMS.",
  2023: "O maior déficit da série (R$ 1,7 mi): a receita recua e a despesa segue subindo. É também o ano de pico do investimento.",
  2024: "Único ano da série com operação de crédito: entram R$ 2,45 mi de empréstimo.",
  2025: "O maior superávit da série (R$ 4,6 mi), com a despesa recuando 10% em relação a 2024.",
};

function bbFinancas(root, fin) {
  const st = getComputedStyle(root);
  const cReceita = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const cDespesa = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const posColor = st.getPropertyValue("--v-pos").trim() || "#2a78d6";
  const negColor = st.getPropertyValue("--v-neg").trim() || "#e34948";

  legend(root, [
    { label: "Receita realizada", color: cReceita },
    { label: "Despesa empenhada", color: cDespesa },
    { label: "Sobrou", color: posColor },
    { label: "Faltou", color: negColor },
  ]);
  renderReceitaDespesaSaldo(root, { serie: fin.serie, cReceita, cDespesa, posColor, negColor, notas: BB_SALDO_NOTAS });

  const def = fin.serie.filter(p => p.saldo < 0);
  const pior = def.slice().sort((a, b) => a.saldo - b.saldo)[0];
  const ult = fin.serie[fin.serie.length - 1];
  renderStats(root, [
    { value: `${def.length} de ${fin.serie.length}`, label: "Anos que fecharam no vermelho", note: def.map(p => p.ano).join(", ") },
    { value: milhoes(pior.saldo), label: `Maior déficit da série · ${pior.ano}` },
    { value: milhoes(ult.saldo), label: `Saldo em ${ult.ano}`, note: "O maior superávit da série" },
  ]);

  note(root, `<strong>Passe o mouse por um ano</strong> para ver receita, despesa, quanto sobrou ou faltou e o que
    aconteceu. A faixa colorida entre as linhas <em>é</em> o saldo.`);

  note(root, `Três dos doze anos fecharam no vermelho — <strong>2018, 2020 e 2023</strong>. O padrão dos três é o
    mesmo: a receita recua ou fica parada e a despesa continua subindo. Nenhum deles é grande o bastante para
    caracterizar crise fiscal, e o ano seguinte sempre volta ao azul.`);

  note(root, `<strong>Nota de fonte.</strong> Diferente do piloto de <a href="serra-da-saudade.html">Serra da
    Saudade</a>, aqui o RREO (o relatório bimestral) <em>existe</em> na API do SICONFI — testamos 2019, 2022 e
    2024 e os três respondem. Mesmo assim a série acima vem do DCA, a declaração anual definitiva: ela alcança 2014
    e é a mesma base usada nos outros pilotos, o que mantém as três cidades comparáveis entre si. Receita e despesa
    excluem as operações intraorçamentárias dos dois lados.`);

  renderTable(root, {
    caption: "Receita, despesa e saldo de Barra Bonita/SC, 2014–2025",
    columns: ["Ano", "Receita realizada", "Despesa empenhada", "Saldo"],
    rows: fin.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_realizada),
      fmtMoneyFull(p.despesa_empenhada), fmtMoneyFull(p.saldo)]),
  });
}

function bbDespesaReal(root, desp) {
  const st = getComputedStyle(root);
  const s = desp.serie;
  renderLineChart(root, {
    series: [
      { key: "real", label: "Corrigido pela inflação (em R$ de 2025)", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: s.map(p => ({ y: p.total_empenhado_r2025 })) },
      { key: "nom", label: "Em reais de cada ano (como no balanço)", color: st.getPropertyValue("--v-series-3").trim() || "#eb6834", points: s.map(p => ({ y: p.total_empenhado })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Despesa empenhada (R$)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v),
  });

  const a = s[0], b = s[s.length - 1];
  const nomPct = (b.total_empenhado / a.total_empenhado - 1) * 100;
  const realPct = (b.total_empenhado_r2025 / a.total_empenhado_r2025 - 1) * 100;
  const inflPct = (a.ipca_fator_para_2025 - 1) * 100;

  renderStats(root, [
    { value: pct(nomPct), label: `Aumento nominal do gasto, ${a.ano}→${b.ano}`, note: `De ${milhoes(a.total_empenhado)} para ${milhoes(b.total_empenhado)}` },
    { value: pct(inflPct), label: "Inflação acumulada no período (IPCA)" },
    { value: pct(realPct), label: "Aumento REAL, já descontada a inflação" },
    { value: "R$ " + fmtInt.format(Math.round(b.per_capita_r2025)), label: `Gasto por habitante em ${b.ano}`, note: "Foto do ano, não tendência" },
  ]);

  note(root, `Dos ${pct(nomPct)} nominais, ${pct(inflPct)} é só o real valendo menos: sobra
    <strong>${pct(realPct)} de crescimento verdadeiro</strong> em onze anos. É um aumento moderado — menor que o de
    <a href="serra-da-saudade.html">Serra da Saudade</a> no mesmo período.`);

  note(root, `<strong>Mas a população caiu, e isso muda a leitura.</strong> O gasto por habitante saiu de
    R$ ${fmtInt.format(Math.round(a.per_capita_r2025))} para R$ ${fmtInt.format(Math.round(b.per_capita_r2025))},
    corrigido — <strong>${pct(100 * (b.per_capita_r2025 / a.per_capita_r2025 - 1))}</strong>, bem mais que os
    ${pct(realPct)} do total. Parte do aumento por habitante não é a prefeitura gastando mais: é a mesma despesa
    dividida por menos gente. Como a Fase 1 mostrou, são umas 200 pessoas a menos desde 2014.`);

  renderTable(root, {
    caption: "Despesa empenhada, nominal e corrigida pela inflação, 2014–2025",
    columns: ["Ano", "Nominal", "Em R$ de 2025", "População", "Por habitante (R$ de 2025)"],
    rows: s.map(p => [String(p.ano), fmtMoneyFull(p.total_empenhado), fmtMoneyFull(p.total_empenhado_r2025),
      p.populacao ? fmtInt.format(p.populacao) : "sem estimativa",
      p.per_capita_r2025 ? fmtMoneyFull(p.per_capita_r2025) : "—"]),
  });
}

function bbPibVsDespesa(root, desp, pib) {
  const cmp = desp.comparacao_com_pib;
  if (!cmp) return;
  const st = getComputedStyle(root);
  const cs = pib && pib.composicao_setorial_2021;
  renderLineChart(root, {
    series: [
      { key: "desp", label: "Despesa da Prefeitura", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: cmp.serie.map(p => ({ y: p.indice_despesa })) },
      { key: "pib", label: "PIB do município", color: st.getPropertyValue("--v-series-3").trim() || "#eb6834", points: cmp.serie.map(p => ({ y: p.indice_pib })) },
    ],
    xValues: cmp.serie.map(p => String(p.ano)),
    yLabel: `Índice ${cmp.base_indice} = 100 (ambos corrigidos pela inflação)`,
    yFormat: (v) => String(Math.round(v)),
    yFormatFull: (v) => v.toFixed(1).replace(".", ",") + " (base 100 em " + cmp.base_indice + ")",
  });

  const ult = cmp.serie[cmp.serie.length - 1];
  renderStats(root, [
    { value: Math.round(ult.indice_pib) + " / 100", label: `PIB do município em ${ult.ano}`, note: `Cresceu ${pct(ult.indice_pib - 100)} em termos reais desde ${cmp.base_indice}` },
    { value: Math.round(ult.indice_despesa) + " / 100", label: `Despesa da Prefeitura em ${ult.ano}`, note: `Cresceu ${pct(ult.indice_despesa - 100)} no mesmo período` },
    { value: ult.despesa_sobre_pib_pct.toFixed(0) + "%", label: "Despesa da Prefeitura sobre o PIB" },
  ]);

  note(root, `<strong>Este é o achado que distingue Barra Bonita das outras duas cidades do piloto: aqui a economia
    cresceu de verdade.</strong> Corrigido pela inflação, o PIB de ${ult.ano} está no índice
    ${ult.indice_pib.toString().replace(".", ",")} — <strong>${pct(ult.indice_pib - 100)} acima de
    ${cmp.base_indice}</strong>. Em <a href="serra-da-saudade.html">Serra da Saudade</a> o mesmo índice está em 99 e
    em <a href="itajuba.html">Itajubá</a> em 99,9: as duas terminam o período onde começaram. Aqui não.`);

  note(root, `E o crescimento do orçamento (${pct(ult.indice_despesa - 100)}) acompanha o da economia de perto, o
    que também é diferente das outras duas — nelas a despesa disparou enquanto o PIB ficava parado. A despesa da
    Prefeitura equivale a <strong>${ult.despesa_sobre_pib_pct.toFixed(0)}% do PIB municipal</strong>: mais que os
    9,5% de Itajubá, muito menos que os 103% de Serra da Saudade.
    ${cs ? `A explicação está no setor que puxa a economia: a agropecuária responde por
    ${(100 * cs.agropecuaria / cs.valor_adicionado_total).toFixed(0)}% do valor adicionado (Fase 8), e ela cresce
    sem depender de repasse público.` : ""}`);

  note(root, `<strong>Ressalvas.</strong> O IBGE não publica PIB municipal a preços constantes, então a correção usa
    o mesmo IPCA do resto da página — o que é o procedimento usual, mas o IPCA mede preços ao consumidor e não a
    estrutura de preços da produção agrícola, que é o que domina aqui. A série do PIB termina em ${ult.ano}, último
    ano publicado.`);

  renderTable(root, {
    caption: `PIB municipal e despesa da Prefeitura, índice ${cmp.base_indice}=100, em R$ de 2025`,
    columns: ["Ano", "PIB (R$ de 2025)", "Despesa (R$ de 2025)", "Índice PIB", "Índice despesa", "Despesa / PIB"],
    rows: cmp.serie.map(p => [String(p.ano), fmtMoneyFull(p.pib_r2025), fmtMoneyFull(p.despesa_r2025),
      p.indice_pib.toString().replace(".", ","), p.indice_despesa.toString().replace(".", ","),
      p.despesa_sobre_pib_pct.toFixed(2).replace(".", ",") + "%"]),
  });
}

const BB_FUNCAO_NOTAS = {
  "Saúde|2025": "R$ 5,7 milhões — 22% do orçamento, e a maior função. Sem hospital no município: é atenção básica, farmácia e transporte de paciente.",
  "Educação|2025": "R$ 5,5 milhões, quase empatada com a Saúde. Numa cidade que perde população, a rede escolar é o custo que menos encolhe.",
  "Agricultura|2025": "R$ 2,0 milhões — proporcionalmente uma das maiores funções de Agricultura entre os pilotos, e coerente com uma economia em que a agropecuária é mais da metade do valor adicionado.",
  "Transporte|2023": "Pico da função. Com 77% da população na zona rural, estrada vicinal e transporte escolar são despesa estrutural, não eventual.",
  "outras|2025": "Todo o resto somado: Legislativa, Encargos Especiais, Urbanismo, Desporto, Previdência e as demais.",
};

function bbFuncoes(root, desp) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const serie = desp.serie;
  const ult = serie[serie.length - 1];
  const ranking = Object.entries(ult.funcoes).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  const TOPO = ranking.slice(0, 5), resto = ranking.slice(5);

  const paineis = TOPO.map(nome => ({
    nome, chave: nome,
    valores: serie.map(p => (p.funcoes[nome] || 0) * p.ipca_fator_para_2025),
  }));
  if (resto.length) {
    paineis.push({
      nome: `Outras ${resto.length} funções`, chave: "outras",
      valores: serie.map(p => resto.reduce((s, f) => s + (p.funcoes[f] || 0), 0) * p.ipca_fator_para_2025),
    });
  }

  renderSmallMultiples(root, {
    paineis, xValues: serie.map(p => String(p.ano)), cor,
    valueFormat: (v) => milhoes(v), valueFormatFull: (v) => fmtMoneyFull(v),
    detalhe: (painel, i) => {
      const ano = serie[i];
      const bruto = painel.chave === "outras"
        ? resto.reduce((s, f) => s + (ano.funcoes[f] || 0), 0)
        : (ano.funcoes[painel.chave] || 0);
      const linhas = [{
        label: "Do orçamento do ano",
        value: (100 * bruto / ano.total_empenhado).toFixed(1).replace(".", ",") + "%",
        color: cor, dot: true,
      }];
      if (ano.populacao) {
        linhas.push({
          label: "Por habitante",
          value: "R$ " + fmtInt.format(Math.round(painel.valores[i] / ano.populacao)),
          color: cor, dot: true,
        });
      }
      if (i > 0 && painel.valores[i - 1] > 0) {
        linhas.push({
          label: `Ante ${serie[i - 1].ano}, já sem inflação`,
          value: pct(100 * (painel.valores[i] / painel.valores[i - 1] - 1), 1), color: cor, dot: true,
        });
      }
      return { linhas, nota: BB_FUNCAO_NOTAS[`${painel.chave}|${ano.ano}`] };
    },
  });

  const saude = ult.funcoes["Saúde"] || 0, educ = ult.funcoes["Educação"] || 0;
  note(root, `<strong>Passe o mouse por qualquer ano de qualquer painel</strong> para ver quanto a função levou,
    quanto representou do orçamento, quanto deu por habitante e a variação real sobre o ano anterior.`);

  note(root, `<strong>Saúde e Educação levam ${(100 * (saude + educ) / ult.total_empenhado).toFixed(0)}% do
    orçamento</strong> e estão praticamente empatadas — ${milhoes(saude)} contra ${milhoes(educ)}. Isso não é
    escolha do prefeito: a Constituição obriga o município a aplicar no mínimo 15% da receita de impostos em saúde e
    25% em educação, e boa parte do dinheiro chega carimbada via SUS e FUNDEB.`);

  note(root, `O que <em>é</em> escolha aparece depois. <strong>A Agricultura leva
    ${(100 * (ult.funcoes["Agricultura"] || 0) / ult.total_empenhado).toFixed(1).replace(".", ",")}% do
    orçamento</strong> — proporção que não aparece nos outros dois pilotos e que combina com a Fase 8, onde a
    agropecuária responde por mais da metade do valor adicionado do município. E o <strong>Transporte</strong>
    aparece alto para uma cidade deste tamanho porque três em cada quatro moradores vivem na zona rural (Fase 7):
    estrada vicinal e transporte escolar aqui são despesa estrutural.`);

  const todas = Object.entries(ult.funcoes).map(([f, v]) => ({ f, v })).sort((a, b) => b.v - a.v);
  noteToggle(root, `Ver as ${todas.length} funções de ${ult.ano}, da maior para a menor`,
    `<p class="viz-note-lead">Valores de ${ult.ano} em reais correntes.</p>` +
    todas.map(x => `<p><strong>${x.f}</strong> · ${fmtMoneyFull(x.v)} ·
      ${(100 * x.v / ult.total_empenhado).toFixed(1).replace(".", ",")}% do orçamento</p>`).join(""));

  renderTable(root, {
    caption: "Despesa por função ao longo do tempo, em R$ de 2025",
    columns: ["Ano"].concat(paineis.map(p => p.nome)),
    rows: serie.map((p, i) => [String(p.ano)].concat(paineis.map(pa => fmtMoneyFull(pa.valores[i])))),
  });
}

function bbVariacao(root, desp) {
  const st = getComputedStyle(root);
  const posColor = st.getPropertyValue("--v-pos").trim() || "#2a78d6";
  const negColor = st.getPropertyValue("--v-neg").trim() || "#e34948";
  const todas = desp.comparacao_2014_2025_r2025;
  const CORTE = 1e5;
  const comp = todas.filter(c => Math.abs(c.variacao_real_reais) >= CORTE);
  const fora = todas.length - comp.length;

  legend(root, [
    { label: "Cresceu acima da inflação", color: posColor },
    { label: "Encolheu em termos reais", color: negColor },
  ]);
  renderBarsHorizontalDiverging(root, {
    data: comp.map(c => ({
      funcao: c.funcao, delta: c.variacao_real_reais,
      detalhe: c.variacao_real_pct == null ? "rubrica nova" : pct(c.variacao_real_pct, 1),
    })),
    labelKey: "funcao", valueKey: "delta",
    valueFormat: (v) => milhoes(v).replace("R$ ", ""),
    valueFormatFull: (v) => fmtMoneyFull(v),
    posColor, negColor, posWord: "Cresceu", negWord: "Encolheu",
    ariaLabelPrefix: "Variação real da despesa por função entre 2014 e 2025",
  });

  const total = desp.serie[desp.serie.length - 1].total_empenhado_r2025 - desp.serie[0].total_empenhado_r2025;
  const saude = todas.find(c => c.funcao === "Saúde");
  note(root, `Tudo em R$ de 2025, então o que aparece aqui já é aumento <em>além</em> da inflação. O orçamento
    cresceu ${milhoes(total)} em termos reais em onze anos, e o aumento está
    <strong>repartido entre várias funções</strong> — Saúde (${milhoes(saude.variacao_real_reais)}), Educação,
    Administração, Transporte e Assistência Social, todas na mesma ordem de grandeza. É um perfil diferente do de
    <a href="serra-da-saudade.html">Serra da Saudade</a>, onde a Saúde sozinha ficou com quase metade do aumento, e
    do de <a href="itajuba.html">Itajubá</a>, onde ficou com dois terços.`);

  note(root, `${fora > 0 ? `${fora} funções de valor pequeno ficaram fora do gráfico (variação menor que R$ 100 mil);
    estão todas na tabela abaixo.` : ""} Vale a ressalva de sempre: <strong>função diz a área, não a
    qualidade</strong>. Saber que a Saúde recebeu mais não diz se o atendimento melhorou.`);

  renderTable(root, {
    caption: "Variação real da despesa por função, 2014→2025, em R$ de 2025",
    columns: ["Função", "2014 (R$ de 2025)", "2025", "Variação", "Variação %"],
    rows: todas.map(c => [c.funcao, fmtMoneyFull(c.r2025_em_2014), fmtMoneyFull(c.r2025_em_2025),
      fmtMoneyFull(c.variacao_real_reais),
      c.variacao_real_pct == null ? "rubrica nova" : pct(c.variacao_real_pct, 1)]),
  });
}

function bbReceitaOrigem(root, rec) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const ult = rec.serie[rec.serie.length - 1];
  const dados = Object.entries(ult.origens).map(([origem, valor]) => ({ origem, valor }))
    .filter(d => d.valor > 0).sort((a, b) => b.valor - a.valor);
  const total = dados.reduce((s, d) => s + d.valor, 0);

  renderBarsHorizontal(root, {
    data: dados, labelKey: "origem", valueKey: "valor",
    valueFormat: (v) => milhoes(v),
    valueFormatFull: (v) => `${fmtMoneyFull(v)} (${(100 * v / total).toFixed(1).replace(".", ",")}% da receita)`,
    color: cor, ariaLabelPrefix: `Receita por origem em ${ult.ano}`,
  });

  const fpm = ult.transferencias_detalhe["FPM — Fundo de Participação dos Municípios"] || 0;
  const icms = ult.transferencias_detalhe["Cota-parte do ICMS"] || 0;
  renderStats(root, [
    { value: ult.dependencia_transferencias_pct.toFixed(0) + "%", label: "Da receita vem de transferências" },
    { value: (100 * ult.arrecadacao_propria / ult.receita_bruta).toFixed(1).replace(".", ",") + "%", label: "É arrecadação própria do município" },
    { value: "R$ " + fmtInt.format(Math.round(ult.fpm_per_capita)), label: `FPM por habitante · ${ult.ano}` },
    { value: milhoes(icms), label: "Cota-parte do ICMS", note: `${(100 * icms / ult.receita_bruta).toFixed(0)}% da receita — o dobro do peso que tem em Serra da Saudade` },
  ]);

  note(root, `<strong>${ult.dependencia_transferencias_pct.toFixed(0)}% da receita vem de fora</strong>, e a
    arrecadação própria é ${(100 * ult.arrecadacao_propria / ult.receita_bruta).toFixed(1).replace(".", ",")}%.
    Alta, como em qualquer município pequeno — mas repare na composição: o FPM traz ${milhoes(fpm)} e a
    <strong>cota-parte do ICMS traz ${milhoes(icms)}</strong>, quase metade do FPM. Em
    <a href="serra-da-saudade.html">Serra da Saudade</a> o ICMS é um quinto do FPM. A diferença é que a cota-parte
    do ICMS premia municípios que <em>produzem</em>, e aqui há produção agrícola de verdade — é o mesmo fato que
    aparece no PIB da Fase 3 e na composição setorial da Fase 8.`);

  note(root, `<strong>FPM por habitante: R$ ${fmtInt.format(Math.round(ult.fpm_per_capita))}.</strong> É menos da
    metade dos R$ 24 mil de Serra da Saudade, e a razão é aritmética: as duas cidades recebem cotas do mesmo
    fundo, mas Barra Bonita divide a dela por o dobro de gente. Como toda cidade de até 10.188 habitantes entra na
    mesma faixa de coeficiente, quanto menor a população, maior o valor por habitante.`);

  note(root, `Valores brutos, como o SICONFI publica: incluem a parcela retida na fonte para o FUNDEB, que depois
    volta redistribuída (${milhoes(ult.deducoes_fundeb)} em ${ult.ano}). <strong>Conferência:</strong>
    ${rec.teste_de_fechamento}`);

  renderTable(root, {
    caption: "Receita bruta por origem, 2014–2025",
    columns: ["Ano", "Receita bruta", "Arrecadação própria", "Transferências", "Empréstimos", "% de transferências"],
    rows: rec.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_bruta), fmtMoneyFull(p.arrecadacao_propria),
      fmtMoneyFull(p.transferencias), fmtMoneyFull(p.operacoes_credito),
      p.dependencia_transferencias_pct.toFixed(1).replace(".", ",") + "%"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 4 — compras.
// ---------------------------------------------------------------------------
function bbCompras(root, pncp) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Por modalidade de contratação");
  renderBarsHorizontal(root, {
    data: pncp.modalidades_incluidas, labelKey: "modalidade", valueKey: "quantidade",
    valueFormat: (v) => fmtInt.format(v), valueFormatFull: (v) => fmtInt.format(v) + " processos",
    color: cor, ariaLabelPrefix: "Processos de compra por modalidade",
  });

  const q = (m) => (pncp.modalidades_incluidas.find(x => x.modalidade === m) || {}).quantidade || 0;
  const direta = q("Dispensa de Licitação") + q("Inexigibilidade");
  renderStats(root, [
    { value: fmtInt.format(pncp.total_processos), label: `Processos publicados · ${pncp.periodo_label}` },
    { value: "R$ " + fmtMoneyCompact(pncp.valor_total_estimado), label: "Valor total estimado somado", note: fmtMoneyFull(pncp.valor_total_estimado) },
    { value: (100 * direta / pncp.total_processos).toFixed(0) + "%", label: "São contratação direta", note: `${direta} processos: ${q("Dispensa de Licitação")} dispensas e ${q("Inexigibilidade")} inexigibilidades` },
    { value: String(pncp.cnpjs_encontrados.length), label: "Entidades públicas comprando", note: "Prefeitura, Câmara e os fundos municipais" },
  ]);

  note(root, `<strong>Quase metade das compras é contratação direta</strong> —
    ${(100 * direta / pncp.total_processos).toFixed(0)}% dos ${pncp.total_processos} processos saem por dispensa de
    licitação ou inexigibilidade, sem disputa. Isso é muito diferente de
    <a href="serra-da-saudade.html">Serra da Saudade</a>, onde a proporção é de 4%, e merece a ressalva correta:
    <strong>contratação direta é legal e prevista em lei</strong> (Lei 14.133/2021), e é comum em compras de valor
    baixo. O que o dado mostra é o padrão, não uma irregularidade — para saber se cada caso se justifica seria
    preciso ler os processos um a um, o que esta fase não faz.`);

  note(root, `Outro contraste: aqui <strong>quatro entidades diferentes compram</strong> — o Município, a Câmara de
    Vereadores, o Fundo Municipal de Saúde e o Fundo Municipal de Assistência Social, cada um com CNPJ próprio. Nas
    outras duas cidades do piloto a consulta devolve praticamente só a Prefeitura. Por isso a consulta ao PNCP aqui
    foi feita por <em>código de município</em>, e não por CNPJ: por CNPJ, três das quatro entidades ficariam de
    fora.`);

  subhead(root, "Por categoria de objeto");
  renderBarsHorizontal(root, {
    data: pncp.por_categoria, labelKey: "categoria", valueKey: "quantidade",
    valueFormat: (v) => fmtInt.format(v), valueFormatFull: (v) => fmtInt.format(v) + " processos",
    color: cor, ariaLabelPrefix: "Processos de compra por categoria de objeto",
  });

  subhead(root, "Ao longo do tempo");
  renderLineChart(root, {
    series: [{ key: "processos", label: "Processos publicados", color: cor, points: pncp.por_mes.map(p => ({ y: p.quantidade })) }],
    xValues: pncp.por_mes.map(p => p.mes_label), yLabel: "Processos por mês",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " processos",
  });

  note(root, `As 13 modalidades do PNCP foram varridas, com paginação até o fim de cada uma e zero erro de coleta.
    A categoria é inferida do texto do objeto por palavras-chave — classificação nossa, não do PNCP — e o valor é o
    <em>estimado</em> na publicação, não o homologado nem o pago.`);

  renderTable(root, {
    caption: `Processos de compra por categoria, ${pncp.periodo_label}`,
    columns: ["Categoria", "Processos", "Valor estimado somado"],
    rows: pncp.por_categoria.map(c => [c.categoria, fmtInt.format(c.quantidade), fmtMoneyFull(c.valor_estimado)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 5 — saúde.
// ---------------------------------------------------------------------------
function bbSaude(root, rc, snapshot, cnes) {
  const st = getComputedStyle(root);
  const s = rc.serie;
  renderLineChart(root, {
    series: [
      { key: "nasc", label: "Nascidos vivos registrados", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e", points: s.map(p => ({ y: p.nascidos_vivos })) },
      { key: "obit", label: "Óbitos registrados (qualquer idade)", color: st.getPropertyValue("--v-series-3").trim() || "#eb6834", points: s.map(p => ({ y: p.obitos })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Eventos por ano",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " registros",
    missingLabel: "Sem registro publicado",
  });

  const comN = s.filter(p => p.nascidos_vivos != null);
  const comO = s.filter(p => p.obitos != null);
  const medN = comN.reduce((a, p) => a + p.nascidos_vivos, 0) / comN.length;
  const medO = comO.length ? comO.reduce((a, p) => a + p.obitos, 0) / comO.length : null;

  const stats = [
    { value: medN.toFixed(1).replace(".", ","), label: "Média de nascimentos por ano" },
    { value: medO ? medO.toFixed(1).replace(".", ",") : "—", label: "Média de óbitos por ano" },
  ];
  if (cnes) stats.push({ value: String(cnes.n_estabelecimentos), label: "Estabelecimentos de saúde no CNES", note: cnes.tem_hospital ? "Inclui unidade com internação" : "Nenhum com atendimento hospitalar" });
  renderStats(root, stats);

  note(root, `<strong>Nascimentos e óbitos andam próximos</strong> — média de ${medN.toFixed(1).replace(".", ",")}
    nascimentos e ${medO ? medO.toFixed(1).replace(".", ",") : "—"} óbitos por ano. Numa cidade que perde população
    de forma contínua (Fase 1), isso indica que <strong>a queda não vem de mais gente morrendo que nascendo</strong>:
    vem de saída de moradores. É o padrão clássico de êxodo rural para os centros regionais do oeste catarinense.`);

  note(root, `<strong>Ressalva de escala.</strong> Com pouco mais de mil e seiscentos habitantes, os números são de
    uma ou duas dezenas por ano — <strong>uma diferença de três eventos não é tendência, é acaso</strong>. Por isso
    aqui não há taxa por mil habitantes, só a contagem bruta. E são registros de <em>ocorrência</em> em cartório, não
    de residência: como o município não tem hospital, é provável que parte dos nascimentos de mães da cidade seja
    registrada onde fica a maternidade.`);

  if (cnes) {
    note(root, `<strong>O CNES confirma que não há hospital.</strong> Os ${cnes.n_estabelecimentos}
      estabelecimentos cadastrados são
      ${cnes.estabelecimentos.map(e => e.tipo.toLowerCase()).filter((v, i, a) => a.indexOf(v) === i).join(", ")} —
      nenhum com atendimento hospitalar. Internação e urgência acontecem fora do município e são pagas por outro
      ente ou por consórcio, o que significa que <strong>não passam pelo orçamento da Fase 3</strong>.`);
    renderTable(root, {
      caption: "Estabelecimentos de saúde cadastrados no CNES",
      columns: ["CNES", "Nome", "Tipo"],
      rows: cnes.estabelecimentos.map(e => [String(e.cnes), e.nome, e.tipo]),
    });
  }

  renderTable(root, {
    caption: "Nascidos vivos e óbitos registrados em Barra Bonita/SC, 2003–2024",
    columns: ["Ano", "Nascidos vivos", "Óbitos"],
    rows: s.map(p => [String(p.ano),
      p.nascidos_vivos == null ? "—" : fmtInt.format(p.nascidos_vivos),
      p.obitos == null ? "sem registro publicado" : fmtInt.format(p.obitos)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 6 — educação.
// ---------------------------------------------------------------------------
function bbEducacao(root, educ, snapshot, ips) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Alfabetização, 2000–2022");
  const alf = educ.alfabetizacao.serie;
  renderLineChart(root, {
    series: [{ key: "alf", label: "Taxa de alfabetização", color: cor, points: alf.map(p => ({ y: p.taxa })) }],
    xValues: alf.map(p => String(p.ano)),
    yLabel: "% de pessoas alfabetizadas",
    yFormat: (v) => v.toFixed(0) + "%", yFormatFull: (v) => v.toFixed(2).replace(".", ",") + "%",
  });
  note(root, `Cada Censo mediu numa base etária diferente — ${alf.map(p => `${p.ano}: ${p.base_etaria}`).join("; ")} —,
    então a linha não é perfeitamente comparável ponto a ponto.`);

  subhead(root, "Nível de instrução, 2010 × 2022");
  const n = educ.nivel_de_instrucao;
  if (n["2010"] && n["2022"]) {
    renderBarsHorizontal(root, {
      data: n.categorias_ordem.map(k => ({
        cat: n.rotulos[k],
        pp: +(n["2022"].percentual[k] - n["2010"].percentual[k]).toFixed(2),
      })),
      labelKey: "cat", valueKey: "pp",
      valueFormat: (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1).replace(".", ",") + " p.p.",
      valueFormatFull: (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(2).replace(".", ",") + " pontos percentuais",
      color: cor, ariaLabelPrefix: "Variação do nível de instrução entre 2010 e 2022",
    });
    renderTable(root, {
      caption: "Nível de instrução — participação de cada faixa, 2010 e 2022",
      columns: ["Faixa", `2010 (${n["2010"].base_etaria})`, `2022 (${n["2022"].base_etaria})`, "Variação"],
      rows: n.categorias_ordem.map(k => [n.rotulos[k],
        n["2010"].percentual[k].toFixed(1).replace(".", ",") + "%",
        n["2022"].percentual[k].toFixed(1).replace(".", ",") + "%",
        ((n["2022"].percentual[k] - n["2010"].percentual[k]) >= 0 ? "+" : "−") +
        Math.abs(n["2022"].percentual[k] - n["2010"].percentual[k]).toFixed(1).replace(".", ",") + " p.p."]),
    });
    note(root, `<strong>Mais da metade da população adulta ainda está na faixa "sem instrução ou fundamental
      incompleto"</strong>: ${n["2022"].percentual.sem_instrucao_fundamental_incompleto.toFixed(1).replace(".", ",")}%
      em 2022, contra ${n["2010"].percentual.sem_instrucao_fundamental_incompleto.toFixed(1).replace(".", ",")}% em
      2010. É uma queda real, mas o patamar continua alto — bem acima do que se vê em
      <a href="itajuba.html">Itajubá</a>. Num município de população idosa e historicamente rural, boa parte dessa
      faixa são pessoas que já passaram da idade escolar.`);
    note(root, `<strong>Atenção à comparação</strong>: 2010 mediu pessoas de 10 anos ou mais e 2022 mediu de 18
      anos ou mais — bases diferentes, então parte da melhora aparente vem de terem saído da conta as crianças.`);
  }

  const items = [];
  const ideb = ips && ips.indicadores && ips.indicadores.ind_ideb_ensino_fundamental;
  if (ideb) items.push({ value: ideb.toFixed(2).replace(".", ","), label: "Ideb do ensino fundamental", note: "Via IPS Brasil 2026 — o Panorama do IBGE não publica Ideb para este município" });
  const enem = ips && ips.indicadores && ips.indicadores.ind_nota_mediana_enem;
  if (enem) items.push({ value: enem.toFixed(0), label: "Nota mediana no ENEM", note: "IPS Brasil 2026" });
  const esc = snapshot && snapshot.indicadores.educacao && snapshot.indicadores.educacao.taxa_escolarizacao_6_a_14_anos;
  if (esc) items.push({ value: esc.valor.toFixed(0) + "%", label: `Escolarização de 6 a 14 anos · ${esc.ano}`, note: "IBGE Cidades" });
  if (items.length) renderStats(root, items);

  note(root, `<strong>O Ideb não sai no Panorama do IBGE para este município</strong> — consultamos ano a ano, de
    2010 a 2026. É a mesma situação de Serra da Saudade: com poucos alunos por série, o INEP não divulga o resultado
    para preservar o sigilo dos estudantes. O valor acima vem do IPS Brasil, que trabalha o dado do INEP por outro
    caminho.`);
}

// ---------------------------------------------------------------------------
// Fase 7 — território. Aqui o mapa tem uma história de verdade: a cidade é rural.
// ---------------------------------------------------------------------------
function bbTerritorio(root, contorno, setores) {
  const urb = setores.setores.filter(s => (s.situacao || "").toLowerCase().startsWith("urb"));
  const popTotal = setores.setores.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaTotal = setores.setores.reduce((a, s) => a + s.area_km2, 0);
  const popUrb = urb.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaUrb = urb.reduce((a, s) => a + s.area_km2, 0);
  const popRur = popTotal - popUrb;

  renderChoroplethMap(root, {
    boundary: contorno.contorno_lon_lat,
    features: setores.setores,
    valueKey: "densidade_hab_km2",
    valueFormat: (v) => fmtInt.format(Math.round(v)) + " hab./km²",
    legendTitle: "Densidade populacional",
  });

  renderStats(root, [
    { value: (100 * popRur / popTotal).toFixed(0) + "%", label: "Da população vive na zona rural", note: `${popRur} das ${popTotal} pessoas do Censo 2022` },
    { value: String(setores.n_setores), label: "Setores censitários no município", note: `${urb.length} urbano, ${setores.n_setores - urb.length} rurais` },
    { value: areaUrb.toFixed(2).replace(".", ",") + " km²", label: "Área do setor urbano", note: `${(100 * areaUrb / areaTotal).toFixed(1).replace(".", ",")}% do território` },
    { value: fmtInt.format(Math.round(popTotal / areaTotal)) + " hab./km²", label: "Densidade média do município" },
  ]);

  note(root, `<strong>Três em cada quatro moradores vivem fora da cidade.</strong> Dos ${setores.n_setores} setores
    censitários, apenas um é urbano: ocupa ${areaUrb.toFixed(2).replace(".", ",")} km²
    (${(100 * areaUrb / areaTotal).toFixed(1).replace(".", ",")}% do território) e concentra ${popUrb} pessoas. Os
    outros três são rurais e abrigam <strong>${popRur} moradores, ${(100 * popRur / popTotal).toFixed(0)}% da
    população</strong>, espalhados por ${(areaTotal - areaUrb).toFixed(0)} km².`);

  note(root, `<strong>Isso explica boa parte da Fase 3.</strong> Uma prefeitura cuja população está espalhada por
    92 km² de área rural gasta com coisas que uma cidade compacta não gasta: estrada vicinal, transporte escolar
    rural, transporte sanitário. É por isso que a função Transporte aparece alta no orçamento, e por isso a
    Agricultura tem rubrica própria relevante. O contraste com <a href="serra-da-saudade.html">Serra da Saudade</a>
    é direto: lá 65% da população mora no único setor urbano; aqui é o inverso.`);

  note(root, `Com quatro unidades, este mapa mostra a sede e a distribuição rural — não um padrão intraurbano, que
    exigiria dezenas de setores. A geometria é a oficial do IBGE e fecha exatamente com os ${popTotal} habitantes do
    Censo 2022 e com ${areaTotal.toFixed(2).replace(".", ",")} km².`);

  renderTable(root, {
    caption: "Setores censitários de Barra Bonita/SC, Censo 2022",
    columns: ["Setor", "Situação", "População", "Domicílios", "Área (km²)", "Densidade (hab./km²)"],
    rows: setores.setores.map(s => [s.setor, s.situacao, fmtInt.format(s.populacao),
      fmtInt.format(s.domicilios), s.area_km2.toFixed(2).replace(".", ","),
      fmtInt.format(Math.round(s.densidade_hab_km2))]),
  });
}

// ---------------------------------------------------------------------------
// Fase 8 — emprego e economia. O setor que manda aqui é a agropecuária.
// ---------------------------------------------------------------------------
function bbEmprego(root, cempre, pop, desp) {
  const st = getComputedStyle(root);
  const s = cempre.serie;
  renderLineChart(root, {
    series: [
      { key: "ocup", label: "Pessoal ocupado total", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e", points: s.map(p => ({ y: p.pessoal_ocupado_total })) },
      { key: "assal", label: "Pessoal ocupado assalariado", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: s.map(p => ({ y: p.pessoal_ocupado_assalariado })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Pessoas",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " pessoas",
  });

  const ult = s[s.length - 1];
  const popAno = (pop.serie.find(p => p.ano === ult.ano) || {}).populacao;
  renderStats(root, [
    { value: fmtInt.format(ult.empresas_atuantes), label: `Empresas atuantes · ${ult.ano}` },
    { value: fmtInt.format(ult.pessoal_ocupado_total), label: `Pessoal ocupado · ${ult.ano}`, note: popAno ? `${(100 * ult.pessoal_ocupado_total / popAno).toFixed(0)}% da população` : "" },
    { value: "R$ " + ult.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), label: `Salário médio mensal (nominal) · ${ult.ano}` },
  ]);

  note(root, `<strong>O emprego FORMAL desta cidade é pequeno, e isso não é a economia toda.</strong> O CEMPRE
    registra ${ult.empresas_atuantes} empresas e ${ult.pessoal_ocupado_total} pessoas ocupadas com carteira — cerca
    de ${popAno ? (100 * ult.pessoal_ocupado_total / popAno).toFixed(0) : "12"}% da população. Numa cidade em que a
    agropecuária responde por mais da metade do valor adicionado, <strong>a maior parte do trabalho é familiar e
    não aparece aqui</strong>: agricultura familiar não emite carteira de trabalho. Ler esta série como "só 198
    pessoas trabalham" seria errado.`);

  const dUlt = desp && desp.serie[desp.serie.length - 1];
  const pessoal = dUlt && (dUlt.natureza["Pessoal e encargos"] || 0);
  if (pessoal) {
    note(root, `Para dimensionar o peso da prefeitura: em ${dUlt.ano} ela empenhou ${milhoes(pessoal)} em "pessoal
      e encargos", ${(100 * pessoal / dUlt.total_geral_empenhado).toFixed(0)}% de tudo o que gastou. O setor público
      é o maior empregador formal — mas, diferente de Serra da Saudade, ele divide a economia com um setor privado
      que produz de verdade.`);
  }

  renderTable(root, {
    caption: "Empresas e emprego formal em Barra Bonita/SC, 2006–2021",
    columns: ["Ano", "Empresas atuantes", "Pessoal ocupado", "Assalariados", "Salário médio mensal"],
    rows: s.map(p => [String(p.ano), fmtInt.format(p.empresas_atuantes),
      fmtInt.format(p.pessoal_ocupado_total), fmtInt.format(p.pessoal_ocupado_assalariado),
      "R$ " + p.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })]),
  });
}

function bbPib(root, pib) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";
  renderLineChart(root, {
    series: [{ key: "pib", label: "PIB total", color: cor, points: pib.pib_total.map(p => ({ y: p.valor_mil_reais * 1000 })) }],
    xValues: pib.pib_total.map(p => String(p.ano)),
    yLabel: "PIB a preços correntes (R$)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
  });

  const c = pib.composicao_setorial_2021;
  const va = c.valor_adicionado_total;
  const p = (v) => (100 * v / va).toFixed(1).replace(".", ",") + "%";
  renderStats(root, [
    { value: p(c.agropecuaria), label: "Agropecuária — % do valor adicionado · 2021" },
    { value: p(c.administracao_publica), label: "Administração pública · 2021" },
    { value: p(c.servicos_exceto_adm_publica), label: "Serviços (exceto adm. pública) · 2021" },
    { value: p(c.industria), label: "Indústria · 2021" },
  ]);

  note(root, `<strong>Aqui quem manda é a agropecuária: ${p(c.agropecuaria)} do valor adicionado</strong> — mais
    que o dobro da administração pública (${p(c.administracao_publica)}). É o perfil oposto ao de
    <a href="serra-da-saudade.html">Serra da Saudade</a>, onde o setor público lidera, e completamente diferente do
    de <a href="itajuba.html">Itajubá</a>, industrial e de serviços. Barra Bonita é uma cidade de produção agrícola
    no oeste catarinense, e é essa produção que explica o PIB em alta da Fase 3 e o peso da cota-parte do ICMS na
    receita.`);

  note(root, `Valores correntes de cada ano, sem ajuste pela inflação — não leia a variação ano a ano como
    crescimento real (o gráfico 3 da Fase 3 faz essa correção). A composição por setor só existe até 2021 nesta
    tabela do IBGE; 2022 e 2023 têm apenas o PIB total publicado.`);

  renderTable(root, {
    caption: "PIB total de Barra Bonita/SC a preços correntes, 2002–2023",
    columns: ["Ano", "PIB total"],
    rows: pib.pib_total.map(x => [String(x.ano), fmtMoneyFull(x.valor_mil_reais * 1000)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 9 — segurança. A fonte catarinense é bem mais pobre que a mineira.
// ---------------------------------------------------------------------------
function bbSeguranca(root, seg) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cheios = seg.serie.filter(p => !p.ano_parcial);
  const parcial = seg.serie.find(p => p.ano_parcial);

  renderBarsHorizontal(root, {
    data: cheios.map(p => ({ ano: String(p.ano), n: p.vitimas_homicidio })),
    labelKey: "ano", valueKey: "n",
    valueFormat: (v) => fmtInt.format(v),
    valueFormatFull: (v) => v === 0 ? "nenhuma vítima no ano"
      : fmtInt.format(v) + (v === 1 ? " vítima no ano" : " vítimas no ano"),
    color: cor, ariaLabelPrefix: "Vítimas de homicídio por ano",
  });

  const totalSC = seg.regua_santa_catarina;
  const ultSC = totalSC[totalSC.length - 1];
  renderStats(root, [
    { value: String(cheios.reduce((a, p) => a + p.vitimas_homicidio, 0)), label: "Vítimas de homicídio em 2023, 2024 e 2025" },
    { value: String(parcial ? parcial.vitimas_homicidio : 0), label: `Vítimas em ${parcial ? parcial.ano : ""} (parcial)`, note: seg.ate_o_periodo },
    { value: fmtInt.format(ultSC.vitimas_homicidio), label: `Santa Catarina inteira · ${ultSC.ano}`, note: `Taxa estadual de ${ultSC.taxa_por_100mil.toString().replace(".", ",")} por 100 mil` },
    { value: "R$ 0", label: "Gasto municipal com Segurança Pública", note: "A função não existe no orçamento" },
  ]);

  note(root, `<strong>Nenhuma vítima de homicídio em nenhum dos anos disponíveis.</strong> A série da SSP-SC começa
    em 2023 e Barra Bonita aparece zerada em 2023, 2024, 2025 e no primeiro semestre de 2026. Vale a mesma cautela
    de sempre: numa cidade de mil e seiscentos habitantes, <strong>zero é o valor mais provável mesmo que o risco
    individual fosse igual ao do resto do estado</strong> — não é evidência de que a cidade seja excepcionalmente
    segura, e nenhuma taxa por 100 mil deve ser calculada sobre esta base.`);

  note(root, `<strong>E aqui está o achado de método desta fase: Santa Catarina publica muito pior que Minas
    Gerais.</strong> Os outros dois pilotos usam a SEJUSP-MG, que publica <strong>CSV mensal, por município e por
    12 naturezas de crime, desde 2012</strong>. O equivalente catarinense é um <strong>boletim em PDF</strong>, cujo
    único recorte municipal é vítimas de homicídio e só a partir de 2023. Mesmo domínio, mesma federação, dois
    estados — e ecossistemas de dados muito diferentes. É por isso que o IDU-Br desta cidade pontua bem menos em
    Segurança que o das cidades mineiras, e a diferença não é da prefeitura: é do estado.`);

  note(root, `<strong>Como este número foi obtido, e o quanto isso é frágil.</strong> O valor foi extraído de dentro
    do PDF do ${seg.fonte.includes("junho") ? "boletim de junho de 2026" : "boletim"}, lendo a tabela dos
    ${seg.n_municipios_no_boletim} municípios. ${seg.teste_de_fechamento} Ainda assim, é extração de PDF: se a
    SSP-SC mudar o desenho do boletim, ela quebra — coisa que não acontece com um CSV de esquema estável.`);

  renderTable(root, {
    caption: "Vítimas de homicídio em Barra Bonita/SC e no estado",
    columns: ["Ano", "Barra Bonita", "Santa Catarina", "Taxa estadual (por 100 mil)"],
    rows: seg.serie.map(p => {
      const sc = totalSC.find(x => x.ano === p.ano);
      return [p.ano_parcial ? `${p.ano} (${seg.ate_o_periodo})` : String(p.ano),
        fmtInt.format(p.vitimas_homicidio),
        sc ? fmtInt.format(sc.vitimas_homicidio) : "—",
        sc ? sc.taxa_por_100mil.toString().replace(".", ",") : "—"];
    }),
  });
}

// ---------------------------------------------------------------------------
// Fase 10 — síntese.
// ---------------------------------------------------------------------------
function bbSintese(root, d) {
  const items = [];
  if (d.pop) {
    const u = d.pop.serie[d.pop.serie.length - 1];
    items.push({ value: fmtInt.format(u.populacao), label: `População · ${u.ano}`, note: "Censo 2022 contou 1.668" });
  }
  if (d.ips) items.push({ value: d.ips.indicadores.ips_geral.toFixed(2).replace(".", ","), label: "IPS Brasil · edição 2026" });
  if (d.fin) {
    const u = d.fin.serie[d.fin.serie.length - 1];
    items.push({ value: "R$ " + fmtMoneyCompact(u.saldo), label: `Saldo orçamentário · ${u.ano}`, note: u.saldo >= 0 ? "Superávit" : "Déficit" });
  }
  if (d.rec) {
    const u = d.rec.serie[d.rec.serie.length - 1];
    items.push({ value: u.dependencia_transferencias_pct.toFixed(0) + "%", label: `Da receita vem de transferência · ${u.ano}` });
    if (u.fpm_per_capita) items.push({ value: "R$ " + fmtInt.format(Math.round(u.fpm_per_capita)), label: `FPM por habitante · ${u.ano}` });
  }
  if (d.desp) {
    const u = d.desp.serie[d.desp.serie.length - 1];
    items.push({ value: "R$ " + fmtInt.format(Math.round(u.per_capita_r2025)), label: `Despesa por habitante · ${u.ano}`, note: "Em R$ de 2025" });
    if (d.desp.comparacao_com_pib) {
      const c = d.desp.comparacao_com_pib.serie;
      items.push({ value: Math.round(c[c.length - 1].indice_pib) + " / 100", label: `Índice do PIB · ${c[c.length - 1].ano}`, note: "Base 2014 = 100, corrigido pela inflação" });
    }
  }
  if (d.setores) items.push({ value: String(d.setores.n_setores), label: "Setores censitários", note: "Um urbano, três rurais" });
  if (d.cempre) {
    const u = d.cempre.serie[d.cempre.serie.length - 1];
    items.push({ value: fmtInt.format(u.empresas_atuantes), label: `Empresas atuantes · ${u.ano}` });
  }
  if (d.pncp) items.push({ value: fmtInt.format(d.pncp.total_processos), label: `Processos de compra · ${d.pncp.periodo_label}` });
  if (d.seg) {
    const c = d.seg.serie.filter(p => !p.ano_parcial);
    items.push({ value: String(c.reduce((a, p) => a + p.vitimas_homicidio, 0)), label: "Vítimas de homicídio, 2023–2025" });
  }
  renderStats(root, items);
  note(root, `Cada número vem da fase correspondente acima, com a mesma fonte e as mesmas ressalvas — este painel
    resume, não recalcula nada.`);
}

// ---------------------------------------------------------------------------
// Orquestração.
// ---------------------------------------------------------------------------
function initBarraBonitaCharts() {
  const q = (sel) => document.querySelector(sel);
  const fase = (el) => el && el.closest("details.phase");
  const j = (n) => BB.get(n);

  const popRoot = q("#chart-populacao");
  onFirstOpen(fase(popRoot), () => {
    j("populacao_2000_2025.json").then(p => bbPopulacao(popRoot, p)).catch(() => showError(popRoot));
  });

  const idhmRoot = q("#chart-idhm");
  onFirstOpen(fase(idhmRoot), () => {
    Promise.all([j("idhm_historico_1991_2010.json"), j("ips_brasil_2026.json")])
      .then(([a, b]) => bbIdhm(idhmRoot, a, b)).catch(() => showError(idhmRoot));
  });

  const finRoot = q("#chart-financas");
  const realRoot = q("#chart-despesa-real");
  const pibDespRoot = q("#chart-pib-despesa");
  const funcoesRoot = q("#chart-funcoes-tempo");
  const varRoot = q("#chart-despesa-variacao");
  const origemRoot = q("#chart-receita-origem");
  onFirstOpen(fase(finRoot), () => {
    j("siconfi_receita_despesa_2014_2025.json").then(f => bbFinancas(finRoot, f))
      .catch(() => showError(finRoot));
    Promise.all([j("despesa_funcao_natureza_2014_2025.json"), j("receita_origem_2014_2025.json"),
                 j("pib_municipal_2002_2023.json")])
      .then(([desp, rec, pib]) => {
        if (realRoot) bbDespesaReal(realRoot, desp);
        if (pibDespRoot) bbPibVsDespesa(pibDespRoot, desp, pib);
        if (funcoesRoot) bbFuncoes(funcoesRoot, desp);
        if (varRoot) bbVariacao(varRoot, desp);
        if (origemRoot) bbReceitaOrigem(origemRoot, rec);
      }).catch(() => showError(realRoot, pibDespRoot, funcoesRoot, varRoot, origemRoot));
  });

  const comprasRoot = q("#chart-compras");
  onFirstOpen(fase(comprasRoot), () => {
    j("pncp_serie_2025_2026.json").then(p => bbCompras(comprasRoot, p)).catch(() => showError(comprasRoot));
  });

  const saudeRoot = q("#chart-saude");
  onFirstOpen(fase(saudeRoot), () => {
    Promise.all([j("registro_civil_2003_2024.json"), j("ibge_cidades_snapshot_2026.json"),
                 j("cnes_estabelecimentos_2026.json").catch(() => null)])
      .then(([rc, sn, cnes]) => bbSaude(saudeRoot, rc, sn, cnes)).catch(() => showError(saudeRoot));
  });

  const educRoot = q("#stats-educacao");
  onFirstOpen(fase(educRoot), () => {
    Promise.all([j("educacao_alfabetizacao_nivel_instrucao.json"),
                 j("ibge_cidades_snapshot_2026.json"), j("ips_brasil_2026.json")])
      .then(([e, sn, ips]) => bbEducacao(educRoot, e, sn, ips)).catch(() => showError(educRoot));
  });

  const mapRoot = q("#map-territorio");
  onFirstOpen(fase(mapRoot), () => {
    Promise.all([j("municipio_contorno.json"), j("setores_poligonos_2022.json")])
      .then(([c, s]) => bbTerritorio(mapRoot, c, s)).catch(() => showError(mapRoot));
  });

  const empregoRoot = q("#chart-emprego");
  const pibRoot = q("#chart-pib");
  onFirstOpen(fase(empregoRoot || pibRoot), () => {
    Promise.all([j("cempre_empresas_emprego_2006_2021.json"), j("populacao_2000_2025.json"),
                 j("despesa_funcao_natureza_2014_2025.json")])
      .then(([c, p, d]) => { if (empregoRoot) bbEmprego(empregoRoot, c, p, d); })
      .catch(() => showError(empregoRoot));
    j("pib_municipal_2002_2023.json").then(p => { if (pibRoot) bbPib(pibRoot, p); })
      .catch(() => showError(pibRoot));
  });

  const segRoot = q("#chart-seguranca");
  onFirstOpen(fase(segRoot), () => {
    j("seguranca_ssp_sc_2023_2026.json").then(s => bbSeguranca(segRoot, s)).catch(() => showError(segRoot));
  });

  const sinteseRoot = q("#painel-sintese");
  const iduRoot = q("#idu-br");
  onFirstOpen(fase(sinteseRoot || iduRoot), () => {
    const opt = (n) => j(n).catch(() => null);
    if (sinteseRoot) {
      Promise.all([opt("populacao_2000_2025.json"), opt("ips_brasil_2026.json"),
                   opt("siconfi_receita_despesa_2014_2025.json"), opt("receita_origem_2014_2025.json"),
                   opt("despesa_funcao_natureza_2014_2025.json"), opt("setores_censitarios_2022.json"),
                   opt("cempre_empresas_emprego_2006_2021.json"), opt("pncp_serie_2025_2026.json"),
                   opt("seguranca_ssp_sc_2023_2026.json")])
        .then(([pop, ips, fin, rec, desp, setores, cempre, pncp, seg]) =>
          bbSintese(sinteseRoot, { pop, ips, fin, rec, desp, setores, cempre, pncp, seg }))
        .catch(() => showError(sinteseRoot));
    }
    if (iduRoot) {
      opt("idu_br_2026.json").then(idu => { if (idu) buildIduBrSection(iduRoot, idu); else showError(iduRoot); });
    }
  });
}

if (document.body.dataset.piloto === "barra-bonita") initBarraBonitaCharts();
