// ===========================================================================
// Florianópolis/SC — montagem dos gráficos do piloto.
//
// Carrega DEPOIS de charts.js e reaproveita os renderizadores genéricos de lá.
// As funções build* (Itajubá), ss* (Serra da Saudade) e bb* (Barra Bonita) não
// são reaproveitadas: cada uma traz a narrativa da sua cidade escrita no meio
// do código. O desenho é comum; o texto é de cada uma.
//
// Esta é a primeira CAPITAL do piloto, e isso muda três coisas de fato:
// o mapa da Fase 7 finalmente tem setores suficientes para revelar padrão
// intraurbano, a Fase 3 mostra uma prefeitura que se financia sozinha, e a
// Fase 10 mostra que nada disso se traduz em dado aberto próprio.
//
// Nenhum número mora neste arquivo. Tudo vem de ../dados/florianopolis/.
// ===========================================================================

const FL = { dir: "../dados/florianopolis/", cache: {} };

FL.get = function (nome) {
  if (!this.cache[nome]) {
    this.cache[nome] = fetch(this.dir + nome).then(r => {
      if (!r.ok) throw new Error(nome + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[nome];
};

const flNum = (v, d = 1) => v.toFixed(d).replace(".", ",");
const flPct = (v, d = 1) => flNum(v, d) + "%";

// ---------------------------------------------------------------------------
// Fase 1 — população. A primeira cidade do piloto que CRESCE, e muito.
// ---------------------------------------------------------------------------
function flPopulacao(root, pop) {
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
  // A estimativa do ano anterior ao Censo é a melhor aproximação do que o IBGE
  // "achava" que a cidade tinha às vésperas da contagem.
  const est21 = pop.serie.find(p => p.ano === 2021);
  const erro = est21 ? 100 * (c22.populacao / est21.populacao - 1) : null;

  renderStats(root, [
    { value: fmtInt.format(c22.populacao), label: "Censo 2022", note: `Eram ${fmtInt.format(c00.populacao)} no Censo 2000` },
    { value: "+" + flPct(100 * (c22.populacao / c00.populacao - 1)), label: "Variação entre os Censos 2000 e 2022", note: `${fmtInt.format(c22.populacao - c00.populacao)} pessoas a mais` },
    { value: "+" + flPct(100 * (c22.populacao / c10.populacao - 1)), label: "Variação entre 2010 e 2022" },
    { value: fmtInt.format(ult.populacao), label: `Estimativa ${ult.ano}`, note: "A série segue subindo" },
  ]);

  note(root, `<strong>É a primeira cidade do piloto que cresce — e cresce muito.</strong> De
    ${fmtInt.format(c00.populacao)} habitantes em 2000 para ${fmtInt.format(c10.populacao)} em 2010 e
    ${fmtInt.format(c22.populacao)} em 2022: <strong>${flPct(100 * (c22.populacao / c00.populacao - 1))} em 22
    anos</strong>, ${fmtInt.format(c22.populacao - c00.populacao)} pessoas a mais. As outras três cidades do
    piloto ou encolhem (<a href="barra-bonita.html">Barra Bonita</a>, <a href="serra-da-saudade.html">Serra da
    Saudade</a>) ou crescem devagar (<a href="itajuba.html">Itajubá</a>). Florianópolis acrescentou, sozinha, mais
    gente do que a população inteira de Itajubá — duas vezes.`);

  if (erro !== null) {
    note(root, `<strong>E a estimativa do IBGE errou para baixo.</strong> Em ${est21.ano}, véspera do Censo, a
      estimativa oficial dava ${fmtInt.format(est21.populacao)} habitantes. A contagem de 2022 encontrou
      ${fmtInt.format(c22.populacao)} — <strong>${flPct(erro)} a mais</strong>, ${fmtInt.format(c22.populacao - est21.populacao)}
      pessoas que o modelo não tinha previsto. É o mesmo sentido do erro de <a href="serra-da-saudade.html">Serra da
      Saudade</a> e o oposto do de <a href="itajuba.html">Itajubá</a>, onde a estimativa errava para cima. O
      <a href="comparar.html">comparador</a> põe os três erros lado a lado.`);
  }

  note(root, `Por que isso importa para o resto da página: <strong>todo indicador "por habitante" depende de qual
    número entra no denominador</strong>. Numa cidade que ganhou ${fmtInt.format(ult.populacao - c10.populacao)}
    moradores desde 2010, usar a população errada muda a conclusão. Aqui os cálculos usam a população do ano de
    cada dado — Censo onde há Censo, Estimativa nos demais.`);

  renderTable(root, {
    caption: "População de Florianópolis/SC, 2000–2025",
    columns: ["Ano", "População", "Fonte"],
    rows: pop.serie.map(p => [String(p.ano), fmtInt.format(p.populacao),
      p.fonte === "censo" ? "Censo (contagem)" : "Estimativa"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 2 — IDHM + IPS. Nota altíssima no histórico, e um buraco no retrato atual.
// ---------------------------------------------------------------------------
function flIdhm(root, idhm, ips) {
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
  const i = ips.indicadores;
  renderStats(root, [
    { value: z.geral.toFixed(3).replace(".", ","), label: `IDHM Geral · Censo ${z.ano}`, note: `Era ${a.geral.toFixed(3).replace(".", ",")} em ${a.ano} — faixa "muito alto"` },
    { value: flNum(i.ips_geral, 2), label: "IPS Brasil · edição 2026", note: "Escala 0–100 — outro índice, não é continuação do IDHM" },
    { value: flNum(i.dim_necessidades_humanas_basicas, 1), label: "IPS · Necessidades humanas básicas", note: "A dimensão mais forte" },
    { value: flNum(i.dim_oportunidades, 1), label: "IPS · Oportunidades", note: "A mais fraca — 30 pontos abaixo da primeira" },
  ]);

  note(root, `<strong>No histórico, Florianópolis é das melhores do país.</strong> O IDHM saiu de
    ${a.geral.toFixed(3).replace(".", ",")} em ${a.ano} para <strong>${z.geral.toFixed(3).replace(".", ",")}</strong>
    em ${z.ano} — faixa "muito alto", acima de 0,800. A Educação foi a dimensão que mais andou:
    ${a.educacao.toFixed(3).replace(".", ",")} → ${z.educacao.toFixed(3).replace(".", ",")}.`);

  note(root, `<strong>Mas o retrato de 2026 é bem menos uniforme.</strong> O IPS Brasil dá
    ${flNum(i.dim_necessidades_humanas_basicas, 1)} em Necessidades humanas básicas e
    ${flNum(i.dim_fundamentos_bem_estar, 1)} em Fundamentos do bem-estar — e apenas
    <strong>${flNum(i.dim_oportunidades, 1)} em Oportunidades</strong>. É uma diferença de
    ${flNum(i.dim_necessidades_humanas_basicas - i.dim_oportunidades, 1)} pontos dentro da mesma cidade. A dimensão
    de Oportunidades reúne direitos individuais, liberdades, inclusão social e acesso ao ensino superior; aqui ela
    puxa o índice geral para ${flNum(i.ips_geral, 2)}.`);

  note(root, `<strong>Duas ressalvas de método.</strong> O IDHM para em 2010 e não vai continuar — o Atlas do
    Desenvolvimento Humano não foi recalculado depois daquele Censo, então não existe versão mais recente para
    nenhum município do país. E IDHM e IPS não formam uma linha do tempo única: medem coisas parecidas com
    metodologias e escalas diferentes.`);

  renderTable(root, {
    caption: "IDHM de Florianópolis/SC por dimensão, 1991–2010",
    columns: ["Ano", "IDHM Geral", "Educação", "Longevidade", "Renda"],
    rows: idhm.serie.map(p => [String(p.ano), p.geral.toFixed(3).replace(".", ","),
      p.educacao.toFixed(3).replace(".", ","), p.longevidade.toFixed(3).replace(".", ","),
      p.renda.toFixed(3).replace(".", ",")]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — finanças. Aqui está o achado central da cidade.
// ---------------------------------------------------------------------------
const FL_SALDO_NOTAS = {
  2015: "Maior déficit da primeira metade da série: a despesa cresce 12% e a receita, 9%.",
  2020: "Superávit no ano da pandemia — despesa praticamente estável e auxílio federal entrando.",
  2023: "O maior déficit da série inteira: R$ 347 milhões, com a despesa subindo 11% acima da receita.",
  2025: "Maior superávit da série. A receita passa de R$ 4 bilhões pela primeira vez.",
};

function flFinancas(root, fin) {
  const st = getComputedStyle(root);
  renderReceitaDespesaSaldo(root, {
    serie: fin.serie,
    cReceita: st.getPropertyValue("--v-series-receita").trim() || "#08724e",
    cDespesa: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6",
    posColor: st.getPropertyValue("--v-pos").trim() || "#08724e",
    negColor: st.getPropertyValue("--v-neg").trim() || "#c0392b",
    notas: FL_SALDO_NOTAS,
  });

  const s = fin.serie;
  const ult = s[s.length - 1];
  const deficits = s.filter(a => a.saldo < 0);
  const pior = s.reduce((m, a) => (a.saldo < m.saldo ? a : m), s[0]);

  renderStats(root, [
    { value: "R$ " + fmtMoneyCompact(ult.receita_realizada), label: `Receita realizada · ${ult.ano}` },
    { value: "R$ " + fmtMoneyCompact(ult.despesa_empenhada), label: `Despesa empenhada · ${ult.ano}` },
    { value: "R$ " + fmtMoneyCompact(ult.saldo), label: `Saldo · ${ult.ano}`, note: ult.saldo >= 0 ? "Superávit" : "Déficit" },
    { value: `${deficits.length} de ${s.length}`, label: "Anos que fecharam no vermelho", note: `O pior foi ${pior.ano}: R$ ${fmtMoneyCompact(Math.abs(pior.saldo))}` },
  ]);

  note(root, `<strong>Um orçamento de outra ordem de grandeza.</strong> Em ${ult.ano} a Prefeitura arrecadou
    ${fmtMoneyFull(ult.receita_realizada)} — cerca de <strong>150 vezes</strong> o orçamento de
    <a href="serra-da-saudade.html">Serra da Saudade</a> e mais de 5 vezes o de
    <a href="itajuba.html">Itajubá</a>. É por isso que o <a href="comparar.html">comparador</a> proíbe valor
    absoluto: comparar R$ 4 bilhões com R$ 27 milhões só diz qual cidade é maior, coisa que a população já dizia.`);

  note(root, `<strong>${deficits.length} dos ${s.length} anos fecharam no vermelho</strong>, e o pior foi
    ${pior.ano}, com <strong>${fmtMoneyFull(Math.abs(pior.saldo))}</strong> de déficit — seguido, dois anos
    depois, do maior superávit da série. Oscilação dessa amplitude num orçamento bilionário costuma ter mais a ver
    com o calendário de empenho e de repasses do que com mudança estrutural; a Fase 3 seguinte, que corrige pela
    inflação, mostra a tendência por baixo do ruído.`);

  note(root, `${fin.observacao || ""}`);
}

function flDespesaReal(root, desp) {
  const st = getComputedStyle(root);
  const s = desp.serie;
  renderLineChart(root, {
    series: [
      { key: "nom", label: "Como está no balanço de cada ano", color: st.getPropertyValue("--v-series-3").trim() || "#eb6834", points: s.map(p => ({ y: p.total_empenhado })) },
      { key: "real", label: "Corrigido pelo IPCA para R$ de 2025", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: s.map(p => ({ y: p.total_empenhado_r2025 })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Despesa empenhada",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
  });

  const a = s[0], z = s[s.length - 1];
  const nom = 100 * (z.total_empenhado / a.total_empenhado - 1);
  const real = 100 * (z.total_empenhado_r2025 / a.total_empenhado_r2025 - 1);
  renderStats(root, [
    { value: "+" + flPct(nom, 0), label: `Crescimento NOMINAL da despesa, ${a.ano}→${z.ano}`, note: "Como aparece no balanço" },
    { value: "+" + flPct(real, 0), label: "Crescimento REAL, já descontada a inflação", note: "Em R$ de 2025" },
    { value: "R$ " + fmtInt.format(Math.round(z.per_capita_r2025)), label: `Despesa por habitante · ${z.ano}`, note: "Em R$ de 2025" },
    { value: "R$ " + fmtInt.format(Math.round(a.per_capita_r2025)), label: `Despesa por habitante · ${a.ano}`, note: "Também em R$ de 2025 — mesma régua" },
  ]);

  note(root, `<strong>A diferença entre as duas linhas é a inflação, e ela é grande.</strong> Em valores de balanço
    a despesa cresceu ${flPct(nom, 0)} entre ${a.ano} e ${z.ano}. Descontado o IPCA, o crescimento real foi de
    <strong>${flPct(real, 0)}</strong>. Quase metade do "aumento" nominal era só a moeda perdendo valor — e é por
    isso que toda comparação de anos distantes nesta página passa pelo deflator.`);

  note(root, `Por habitante, e já em reais de 2025, a Prefeitura saiu de
    R$ ${fmtInt.format(Math.round(a.per_capita_r2025))} para
    <strong>R$ ${fmtInt.format(Math.round(z.per_capita_r2025))}</strong> por morador ao ano. O crescimento por
    habitante é menor que o crescimento total justamente porque a cidade ganhou gente no meio do caminho: o
    denominador subiu junto.`);

  note(root, `Deflator: IPCA/IBGE (SIDRA 1737, variável 2266), pela média anual do número-índice, base 2025 — o
    mesmo método usado nas quatro cidades do piloto, para que elas sejam comparáveis entre si.`);
}

function flPibVsDespesa(root, desp, pib) {
  const c = desp.comparacao_com_pib;
  if (!c) { showError(root); return; }
  const st = getComputedStyle(root);
  renderLineChart(root, {
    series: [
      { key: "pib", label: "PIB do município", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e", points: c.serie.map(p => ({ y: p.indice_pib })) },
      { key: "desp", label: "Despesa da Prefeitura", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: c.serie.map(p => ({ y: p.indice_despesa })) },
    ],
    xValues: c.serie.map(p => String(p.ano)),
    yLabel: `Índice (${c.base_indice} = 100), corrigido pela inflação`,
    yFormat: (v) => flNum(v, 0), yFormatFull: (v) => flNum(v, 1) + ` (base ${c.base_indice} = 100)`,
  });

  const a = c.serie[0], z = c.serie[c.serie.length - 1];
  renderStats(root, [
    { value: flNum(z.indice_pib, 0) + " / 100", label: `Índice do PIB · ${z.ano}`, note: `Base ${c.base_indice} = 100, em termos reais` },
    { value: flNum(z.indice_despesa, 0) + " / 100", label: `Índice da despesa · ${z.ano}` },
    { value: flPct(z.despesa_sobre_pib_pct, 1), label: `Despesa da Prefeitura sobre o PIB · ${z.ano}` },
    { value: flPct(a.despesa_sobre_pib_pct, 1), label: `O mesmo em ${a.ano}` },
  ]);

  note(root, `<strong>A Prefeitura cresceu muito mais rápido que a economia da cidade.</strong> Entre ${a.ano} e
    ${z.ano}, já descontada a inflação, o PIB municipal subiu para <strong>${flNum(z.indice_pib, 0)}</strong> na base
    100 — ou seja, ${flPct(z.indice_pib - 100, 0)} de crescimento real em nove anos. A despesa da Prefeitura foi a
    <strong>${flNum(z.indice_despesa, 0)}</strong>, <strong>${flPct(z.indice_despesa - 100, 0)}</strong>. O gasto
    público cresceu cerca de <strong>cinco vezes mais rápido</strong> que a economia que o sustenta.`);

  note(root, `Em proporção do PIB, a Prefeitura saiu de ${flPct(a.despesa_sobre_pib_pct, 1)} para
    ${flPct(z.despesa_sobre_pib_pct, 1)}. Para dar escala: em <a href="itajuba.html">Itajubá</a> esse número é
    ${flPct(9.52, 1)} e em <a href="barra-bonita.html">Barra Bonita</a>, ${flPct(37.3, 1)} — quanto menor a
    economia privada, maior o peso relativo da prefeitura. Florianópolis tem a economia mais robusta do piloto, e
    ainda assim a curva do gasto sobe mais rápido que a dela.`);

  note(root, `<strong>Um índice, não dois eixos.</strong> PIB e despesa têm ordens de grandeza diferentes; pô-los
    em dois eixos verticais deixaria o cruzamento das linhas ser escolhido pela escala, não pelo dado. Aqui os dois
    partem de ${c.base_indice} = 100 e a distância entre as curvas é a diferença real de ritmo. ${c.observacao}`);
}

const FL_FUNCAO_NOTAS = {
  "Previdência Social": "A função que mais cresceu EM DINHEIRO na série: +R$ 327 milhões por ano em termos reais (+161%). É o RPPS próprio da capital amadurecendo — servidores que entraram nas décadas anteriores começando a se aposentar.",
  "Educação": "A maior função do orçamento, e cresce acima da inflação em quase toda a série.",
  "Saúde": "Segunda maior. O município é sede de hospitais estaduais e federais, mas a rede básica é dele.",
  "Administração": "Terceira maior — proporção alta que merece leitura junto com 'Pessoal e encargos' na aba de natureza.",
  "Encargos Especiais": "Amortização e juros da dívida entram aqui, o que faz a função oscilar com o perfil de endividamento e não com política pública.",
};

function flFuncoes(root, desp) {
  const s = desp.serie;
  const cor = getComputedStyle(root).getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const u = s[s.length - 1];
  // O arquivo grava 'funcoes' em valores CORRENTES do ano; o fator do IPCA vem
  // na mesma linha. Sem multiplicar, os painéis mostrariam crescimento que é
  // metade inflação — e a régua comum entre painéis viraria mentira.
  const ranking = Object.entries(u.funcoes).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  const TOPO = ranking.slice(0, 6), resto = ranking.slice(6);

  const paineis = TOPO.map(nome => ({
    nome, chave: nome,
    valores: s.map(p => (p.funcoes[nome] || 0) * p.ipca_fator_para_2025),
  }));
  if (resto.length) {
    paineis.push({
      nome: `Outras ${resto.length} funções`, chave: "outras",
      valores: s.map(p => resto.reduce((a, f) => a + (p.funcoes[f] || 0), 0) * p.ipca_fator_para_2025),
    });
  }

  renderSmallMultiples(root, {
    paineis, xValues: s.map(p => String(p.ano)), cor,
    valueFormat: (v) => milhoes(v), valueFormatFull: (v) => fmtMoneyFull(v),
    detalhe: (painel, i) => {
      const ano = s[i];
      const bruto = painel.chave === "outras"
        ? resto.reduce((a, f) => a + (ano.funcoes[f] || 0), 0)
        : (ano.funcoes[painel.chave] || 0);
      const linhas = [{
        label: "Do orçamento do ano", color: cor, dot: true,
        value: flPct(100 * bruto / ano.total_empenhado, 1),
      }];
      if (ano.populacao) {
        linhas.push({
          label: "Por habitante", color: cor, dot: true,
          value: "R$ " + fmtInt.format(Math.round(painel.valores[i] / ano.populacao)),
        });
      }
      if (i > 0 && painel.valores[i - 1] > 0) {
        linhas.push({
          label: `Ante ${s[i - 1].ano}, já sem inflação`, color: cor, dot: true,
          value: pct(100 * (painel.valores[i] / painel.valores[i - 1] - 1), 1),
        });
      }
      return { linhas, nota: FL_FUNCAO_NOTAS[painel.chave] };
    },
  });

  const tot = Object.values(u.funcoes).reduce((a, b) => a + b, 0);
  const top = Object.entries(u.funcoes).sort((a, b) => b[1] - a[1]).slice(0, 4);
  renderStats(root, top.map(([f, v]) => ({
    value: flPct(100 * v / tot, 1), label: `${f} · ${u.ano}`, note: "R$ " + fmtMoneyCompact(v),
  })));

  note(root, `<strong>Educação e Saúde somam ${flPct(100 * (top[0][1] + top[1][1]) / tot, 0)} do orçamento.</strong>
    São as duas maiores funções, como manda a vinculação constitucional — mas a terceira e a quarta contam a
    história desta capital: <strong>Administração</strong> e <strong>Previdência Social</strong>, juntas,
    ${flPct(100 * (top[2][1] + top[3][1]) / tot, 0)} do gasto. Previdência Social é a função que mais cresceu em
    dinheiro na série inteira, e o gráfico seguinte separa isso do crescimento em percentual — que tem outra
    campeã.`);

  note(root, `Todos os painéis usam a <strong>mesma régua vertical</strong>, então a altura de um é comparável à do
    outro — funções pequenas aparecem pequenas de propósito. Valores em reais de 2025.`);
}

function flVariacao(root, desp) {
  const todas = desp.comparacao_2014_2025_r2025;
  if (!todas || !todas.length) { showError(root); return; }
  const st = getComputedStyle(root);
  // Função que NÃO EXISTIA em 2014 tem variação percentual indefinida — o
  // arquivo grava null, e é o certo: dividir por zero não vira "+∞%". Elas
  // saem deste gráfico, que é percentual, e são citadas por extenso na nota.
  const novas = todas.filter(x => x.variacao_real_pct == null);
  const c = todas.filter(x => x.variacao_real_pct != null);
  renderBarsHorizontalDiverging(root, {
    data: c.slice().sort((a, b) => b.variacao_real_pct - a.variacao_real_pct),
    labelKey: "funcao", valueKey: "variacao_real_pct",
    // Sem sinal aqui: renderBarsHorizontalDiverging já escreve + ou − e passa o
    // valor ABSOLUTO para o formatador. Pôr o sinal de novo saía "++1178%".
    valueFormat: (v) => flPct(v, 0),
    valueFormatFull: (v) => flPct(v, 1) + " em termos reais",
    posColor: st.getPropertyValue("--v-pos").trim() || "#08724e",
    negColor: st.getPropertyValue("--v-neg").trim() || "#c0392b",
    posWord: "cresceu", negWord: "encolheu",
    ariaLabelPrefix: "Variação real da despesa por função entre 2014 e 2025",
  });

  const cresce = c.filter(x => x.variacao_real_pct > 0);
  const cai = c.filter(x => x.variacao_real_pct < 0);
  const maior = c.reduce((m, x) => (x.variacao_real_pct > m.variacao_real_pct ? x : m), c[0]);
  renderStats(root, [
    { value: `${cresce.length} de ${c.length}`, label: "Funções que cresceram acima da inflação" },
    { value: "+" + flPct(maior.variacao_real_pct, 0), label: `Maior alta: ${maior.funcao}`, note: "Em R$ de 2025" },
    { value: String(cai.length), label: "Funções que encolheram em termos reais" },
  ]);

  // Duas perguntas diferentes, e é fácil confundi-las: quem cresceu mais em
  // PERCENTUAL não é quem cresceu mais em REAIS. As duas saem do dado.
  const maiorReais = c.reduce((m, x) => (x.variacao_real_reais > m.variacao_real_reais ? x : m), c[0]);
  note(root, `<strong>Quem mais cresceu em percentual foi ${maior.funcao}: +${flNum(maior.variacao_real_pct, 0)}% em
    termos reais.</strong> Percentual alto costuma sair de base pequena — vale conferir na tabela quanto era o valor
    de 2014 antes de ler o número como prioridade orçamentária.`);

  note(root, `<strong>Em dinheiro, porém, quem mais cresceu foi ${maiorReais.funcao}: mais
    ${fmtMoneyFull(maiorReais.variacao_real_reais)}</strong> por ano, já descontada a inflação
    (+${flNum(maiorReais.variacao_real_pct, 0)}%). ${maiorReais.funcao === "Previdência Social"
      ? `Isso não é escolha de política pública de um ano: é o regime próprio de previdência da capital chegando à
         idade em que a folha de inativos pesa. Uma cidade que cresceu 57% em vinte anos contratou servidores nesse
         ritmo e agora paga a conta diferida disso — é a rubrica a acompanhar nas próximas edições.`
      : `É a rubrica que de fato move o orçamento, mesmo sem liderar o gráfico de percentuais.`}`);

  note(root, `Toda variação aqui já está <strong>descontada a inflação</strong>: são reais de 2025 contra reais de
    2025. Uma função "estável" neste gráfico é uma função que manteve poder de compra, não valor de balanço.`);

  if (novas.length) {
    note(root, `<strong>${novas.length === 1 ? "Uma função ficou de fora do gráfico" : `${novas.length} funções ficaram de fora do gráfico`}, e o motivo importa.</strong>
      ${novas.map(x => `<strong>${x.funcao}</strong> (${fmtMoneyFull(x.r2025_em_2025)} em 2025)`).join(", ")} —
      ${novas.length === 1 ? "não existia" : "não existiam"} no orçamento de 2014, com R$ 0 empenhado. Variação
      percentual sobre uma base zero é indefinida, não "infinito por cento": o arquivo de dados grava
      <code>null</code> e a barra não é desenhada. O que importa nesses casos é o valor absoluto, que está aqui e
      na tabela abaixo.`);
  }

  renderTable(root, {
    caption: "Variação real da despesa por função em Florianópolis/SC, 2014→2025 (R$ de 2025)",
    columns: ["Função", "2014", "2025", "Variação real"],
    rows: c.slice().sort((a, b) => b.variacao_real_pct - a.variacao_real_pct)
      .concat(novas)
      .map(x => [
        x.funcao, "R$ " + fmtMoneyCompact(x.r2025_em_2014), "R$ " + fmtMoneyCompact(x.r2025_em_2025),
        x.variacao_real_pct == null
          ? "não existia em 2014"
          : (x.variacao_real_pct >= 0 ? "+" : "") + flPct(x.variacao_real_pct, 1)]),
  });
}

function flReceitaOrigem(root, rec) {
  const u = rec.serie[rec.serie.length - 1];
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";
  const origens = Object.entries(u.origens).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);

  renderBarsHorizontal(root, {
    data: origens.map(([k, v]) => ({ origem: k, valor: v })),
    labelKey: "origem", valueKey: "valor",
    valueFormat: (v) => "R$ " + fmtMoneyCompact(v),
    valueFormatFull: (v) => fmtMoneyFull(v) + ` — ${flPct(100 * v / u.receita_bruta, 1)} da receita bruta`,
    color: cor, ariaLabelPrefix: `Receita bruta de ${u.ano} por origem`,
  });

  renderStats(root, [
    { value: flPct(u.dependencia_transferencias_pct, 1), label: `Da receita vem de transferência · ${u.ano}`, note: "A MENOR do piloto, de longe" },
    { value: flPct(100 * u.arrecadacao_propria / u.receita_bruta, 1), label: "Arrecadação própria", note: "R$ " + fmtMoneyCompact(u.arrecadacao_propria) },
    { value: "R$ " + fmtInt.format(Math.round(u.fpm_per_capita)), label: `FPM por habitante · ${u.ano}` },
    { value: "R$ " + fmtMoneyCompact(u.receita_bruta), label: `Receita bruta · ${u.ano}`, note: "Antes das deduções do FUNDEB" },
  ]);

  note(root, `<strong>Este é o número que separa Florianópolis das outras três cidades do piloto.</strong> Só
    ${flPct(u.dependencia_transferencias_pct, 1)} da receita vem de transferência de outro ente — contra cerca de
    70% em <a href="itajuba.html">Itajubá</a>, 89% em <a href="barra-bonita.html">Barra Bonita</a> e 93% em
    <a href="serra-da-saudade.html">Serra da Saudade</a>. <strong>A capital se financia com o que arrecada
    dela mesma</strong>: ${fmtMoneyFull(u.arrecadacao_propria)} de arrecadação própria, IPTU, ISS e taxas à
    frente.`);

  note(root, `<strong>O FPM mostra o mesmo do outro lado.</strong> Aqui ele vale
    R$ ${fmtInt.format(Math.round(u.fpm_per_capita))} por habitante ao ano. Em Serra da Saudade passa de
    <strong>R$ 24 mil</strong> por habitante — mais de quarenta vezes mais. O Fundo de Participação dos Municípios
    é redistributivo por desenho: paga proporcionalmente muito mais a cidades pequenas. Florianópolis é o extremo
    oposto do caso-limite que Serra da Saudade representa no piloto.`);

  const d = u.transferencias_detalhe || {};
  const linhas = Object.entries(d).sort((a, b) => b[1] - a[1]);
  if (linhas.length) {
    note(root, `Dentro de "Transferências correntes", as rubricas que mais pesam são
      ${linhas.slice(0, 3).map(([k, v]) => `<strong>${k.split(" — ")[0]}</strong> (${fmtMoneyFull(v)})`).join(", ")}.
      Elas ficariam escondidas na barra agregada, e é por isso que o coletor as abre uma a uma.`);
  }

  note(root, `${rec.observacao || ""} ${rec.teste_de_fechamento || ""}`);

  renderTable(root, {
    caption: `Receita bruta de Florianópolis/SC por origem, ${u.ano}`,
    columns: ["Origem", "Valor", "% da receita bruta"],
    rows: origens.map(([k, v]) => [k, fmtMoneyFull(v), flPct(100 * v / u.receita_bruta, 1)]),
  });
}

function flNatureza(root, desp) {
  const u = desp.serie[desp.serie.length - 1];
  const nat = u.natureza || {};
  const tot = u.total_geral_empenhado || Object.values(nat).reduce((a, b) => a + b, 0);
  const cor = getComputedStyle(root).getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const linhas = Object.entries(nat).sort((a, b) => b[1] - a[1]);

  renderBarsHorizontal(root, {
    data: linhas.map(([k, v]) => ({ nat: k, valor: v })),
    labelKey: "nat", valueKey: "valor",
    valueFormat: (v) => "R$ " + fmtMoneyCompact(v),
    valueFormatFull: (v) => fmtMoneyFull(v) + ` — ${flPct(100 * v / tot, 1)} do total geral`,
    color: cor, ariaLabelPrefix: `Despesa de ${u.ano} por natureza`,
  });

  const pessoal = nat["Pessoal e encargos"] || 0;
  const invest = nat["Investimentos"] || 0;
  renderStats(root, [
    { value: flPct(100 * pessoal / tot, 1), label: `Pessoal e encargos · ${u.ano}`, note: "R$ " + fmtMoneyCompact(pessoal) },
    { value: flPct(100 * invest / tot, 1), label: "Investimentos", note: "R$ " + fmtMoneyCompact(invest) },
    { value: "R$ " + fmtMoneyCompact(u.despesa_intraorcamentaria || 0), label: "Despesa intraorçamentária", note: "Contribuição patronal ao RPPS" },
    { value: "R$ " + fmtMoneyCompact(tot), label: "Total geral empenhado", note: "Inclui a intraorçamentária" },
  ]);

  note(root, `<strong>Mais da metade do orçamento é folha.</strong> "Pessoal e encargos" leva
    ${flPct(100 * pessoal / tot, 1)} do total geral empenhado em ${u.ano}, contra
    ${flPct(100 * invest / tot, 1)} de Investimentos. A proporção não é anômala para uma prefeitura de capital, que
    opera escola, posto de saúde e limpeza urbana com quadro próprio — mas é o que explica por que a Previdência
    Social é a função que mais cresce no gráfico anterior.`);

  note(root, `<strong>Uma nota sobre a base deste gráfico, que é diferente da base das funções.</strong> O Anexo
    I-D do SICONFI, de onde vem a natureza, fecha no <em>Total Geral da Despesa</em> — que INCLUI as
    intraorçamentárias, isto é, a contribuição que a Prefeitura paga ao próprio RPPS como empregadora
    (${fmtMoneyFull(u.despesa_intraorcamentaria || 0)} em ${u.ano}). O Anexo I-E, das funções, fecha em "exceto
    intraorçamentárias". Não dá para forçar os dois na mesma base, então cada gráfico declara a sua e o total geral
    fica gravado no arquivo de dados para conferência.`);

  renderTable(root, {
    caption: `Despesa de Florianópolis/SC por natureza, ${u.ano}`,
    columns: ["Natureza", "Valor", "% do total geral"],
    rows: linhas.map(([k, v]) => [k, fmtMoneyFull(v), flPct(100 * v / tot, 1)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 5 — saúde. Aqui o CNES finalmente tem o que mostrar.
// ---------------------------------------------------------------------------
function flSaude(root, rc, snapshot, cnes) {
  const st = getComputedStyle(root);
  const s = rc.serie;
  renderLineChart(root, {
    series: [
      { key: "nasc", label: "Nascidos vivos", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e", points: s.map(p => ({ y: p.nascidos_vivos })) },
      { key: "obit", label: "Óbitos (todas as idades)", color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6", points: s.map(p => ({ y: p.obitos })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Registros no ano",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " registros",
  });

  const a = s[0], z = s[s.length - 1];
  const items = [
    { value: fmtInt.format(z.nascidos_vivos), label: `Nascidos vivos · ${z.ano}`, note: `Eram ${fmtInt.format(a.nascidos_vivos)} em ${a.ano}` },
    { value: fmtInt.format(z.obitos), label: `Óbitos · ${z.ano}`, note: `Eram ${fmtInt.format(a.obitos)} em ${a.ano}` },
  ];
  if (cnes) {
    items.push({ value: fmtInt.format(cnes.n_estabelecimentos), label: "Estabelecimentos de saúde no CNES" });
    items.push({ value: fmtInt.format(cnes.n_com_atendimento_hospitalar), label: "Com atendimento hospitalar" });
  }
  renderStats(root, items);

  note(root, `<strong>Nascimentos estáveis, óbitos subindo.</strong> Em ${a.ano} a cidade registrou
    ${fmtInt.format(a.nascidos_vivos)} nascidos vivos e ${fmtInt.format(a.obitos)} óbitos; em ${z.ano},
    ${fmtInt.format(z.nascidos_vivos)} e ${fmtInt.format(z.obitos)}. Os nascimentos praticamente não se moveram em
    duas décadas enquanto os óbitos cresceram
    ${flPct(100 * (z.obitos / a.obitos - 1), 0)} — <strong>numa cidade cuja população cresceu no mesmo período</strong>.
    É o desenho clássico de envelhecimento da estrutura etária, e conversa direto com a Previdência Social da Fase 3.`);

  if (cnes) {
    note(root, `<strong>${fmtInt.format(cnes.n_estabelecimentos)} estabelecimentos de saúde cadastrados</strong>, dos
      quais ${cnes.n_com_atendimento_hospitalar} com atendimento hospitalar — incluindo o Hospital Universitário da
      UFSC, o Governador Celso Ramos, o Infantil Joana de Gusmão e o Nereu Ramos. É a diferença mais visível de porte
      em relação às outras cidades do piloto: <a href="barra-bonita.html">Barra Bonita</a> e
      <a href="serra-da-saudade.html">Serra da Saudade</a> não têm nenhum hospital. Vale a ressalva: boa parte destes
      hospitais é <strong>estadual ou federal</strong> — estão na cidade, não são da Prefeitura.`);

    note(root, `<strong>Como este número quase saiu errado.</strong> A API do CNES devolve no máximo 20
      estabelecimentos por resposta, ignorando o <code>limit</code> que se peça. Uma consulta única bastava para as
      cidades pequenas do piloto e, aqui, retornava as 20 primeiras linhas — todas consultórios isolados — fazendo o
      coletor concluir que <em>a capital não tem hospital</em>. Foi preciso paginar por <code>offset</code> até o
      fim: 165 requisições para as ${fmtInt.format(cnes.n_estabelecimentos)} unidades.`);
  }

  // O snapshot do Panorama vem agrupado por domínio: indicadores.saude.X
  const sn = ((snapshot && snapshot.indicadores) || {}).saude || {};
  if (sn.mortalidade_infantil) {
    note(root, `O Panorama do IBGE registra mortalidade infantil de
      <strong>${flNum(sn.mortalidade_infantil.valor, 1)}</strong> por mil nascidos vivos
      (${sn.mortalidade_infantil.ano})${sn.internacoes_por_diarreia_sus
        ? ` e ${flNum(sn.internacoes_por_diarreia_sus.valor, 1)} internações por diarreia por 10 mil habitantes (${sn.internacoes_por_diarreia_sus.ano})`
        : ""}. Os anos entre parênteses são os do <em>dado</em>, não os da consulta: o Panorama publica cada
      indicador na periodicidade da fonte primária, e alguns estão vários anos atrasados.`);
  }

  renderTable(root, {
    caption: "Nascidos vivos e óbitos registrados em Florianópolis/SC, 2003–2024",
    columns: ["Ano", "Nascidos vivos", "Óbitos"],
    rows: s.map(p => [String(p.ano), fmtInt.format(p.nascidos_vivos), fmtInt.format(p.obitos)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 6 — educação.
// ---------------------------------------------------------------------------
function flEducacao(root, educ, snapshot, ips) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Alfabetização, 2000–2022");
  const alf = educ.alfabetizacao.serie;
  renderLineChart(root, {
    series: [{ key: "alf", label: "Taxa de alfabetização", color: cor, points: alf.map(p => ({ y: p.taxa })) }],
    xValues: alf.map(p => String(p.ano)),
    yLabel: "% de pessoas alfabetizadas",
    yFormat: (v) => v.toFixed(0) + "%", yFormatFull: (v) => flNum(v, 2) + "%",
    // Sem o teto, o arredondamento "bonito" levava o eixo a 200% para uma taxa
    // que não passa de 100 — metade do gráfico ficava vazia por construção.
    yMaxCap: 100,
  });
  note(root, `Cada Censo mediu numa base etária diferente — ${alf.map(p => `${p.ano}: ${p.base_etaria}`).join("; ")} —,
    então a linha não é perfeitamente comparável ponto a ponto.`);

  subhead(root, "Nível de instrução, 2010 × 2022");
  const n = educ.nivel_de_instrucao;
  // Os rótulos do arquivo ("Sem instrução / fundamental incompleto") não cabem
  // na margem esquerda da barra e saíam CORTADOS. No gráfico vai a forma curta
  // convencional do IBGE; a definição completa de cada faixa fica na tabela
  // logo abaixo, que usa os rótulos do arquivo sem alteração.
  const CURTO = {
    sem_instrucao_fundamental_incompleto: "Fundamental incompleto",
    fundamental_completo_medio_incompleto: "Fundamental completo",
    medio_completo_superior_incompleto: "Médio completo",
    superior_completo: "Superior completo",
  };
  if (n["2010"] && n["2022"]) {
    renderBarsHorizontalDiverging(root, {
      data: n.categorias_ordem.map(k => ({
        cat: CURTO[k] || n.rotulos[k],
        pp: +(n["2022"].percentual[k] - n["2010"].percentual[k]).toFixed(2),
      })),
      labelKey: "cat", valueKey: "pp",
      // idem: o sinal é do renderizador, aqui vai só a magnitude
      valueFormat: (v) => flNum(v, 1) + " p.p.",
      valueFormatFull: (v) => flNum(v, 2) + " pontos percentuais",
      posColor: st.getPropertyValue("--v-pos").trim() || "#08724e",
      negColor: st.getPropertyValue("--v-neg").trim() || "#c0392b",
      posWord: "cresceu", negWord: "encolheu",
      ariaLabelPrefix: "Variação do nível de instrução entre 2010 e 2022",
    });

    const sup2010 = n["2010"].contagem.superior_completo;
    const sup2022 = n["2022"].contagem.superior_completo;
    const i = ips.indicadores;
    const items = [
      { value: fmtInt.format(sup2022), label: "Pessoas com superior completo · Censo 2022", note: `Eram ${fmtInt.format(sup2010)} em 2010` },
      { value: "+" + flPct(100 * (sup2022 / sup2010 - 1), 0), label: "Crescimento do superior completo" },
      { value: flPct(n["2022"].percentual.superior_completo, 1), label: "Do total, com superior completo · 2022", note: `Era ${flPct(n["2010"].percentual.superior_completo, 1)} em 2010` },
    ];
    if (i.ind_nota_mediana_enem) items.push({ value: flNum(i.ind_nota_mediana_enem, 1), label: "Nota mediana no ENEM · IPS 2026" });
    renderStats(root, items);

    note(root, `<strong>A cidade quase dobrou o número de moradores com ensino superior completo.</strong> Eram
      ${fmtInt.format(sup2010)} pessoas em 2010 e <strong>${fmtInt.format(sup2022)}</strong> em 2022 — mais
      ${fmtInt.format(sup2022 - sup2010)} diplomados em doze anos. Hoje
      ${flPct(n["2022"].percentual.superior_completo, 1)} da população medida tem diploma superior, o maior
      percentual do piloto de longe. É o que se espera de um município que abriga UFSC, UDESC e IFSC, e ajuda a
      explicar o salário médio da Fase 8.`);

    note(root, `Cada faixa do gráfico é um <em>intervalo</em>: "Fundamental completo" significa completou o
      fundamental <em>e não</em> completou o médio, e assim por diante. Os nomes por extenso estão na tabela.`);

    note(root, `<strong>Atenção à comparação, e a ressalva é séria.</strong> ${n.observacao} Parte da melhora
      aparente vem de terem saído da conta as crianças em idade escolar. A direção da mudança é robusta; a
      magnitude exata, não.`);

    renderTable(root, {
      caption: "Nível de instrução — participação de cada faixa, 2010 e 2022",
      columns: ["Faixa", `2010 (${n["2010"].base_etaria})`, `2022 (${n["2022"].base_etaria})`, "Variação"],
      rows: n.categorias_ordem.map(k => [n.rotulos[k],
        flPct(n["2010"].percentual[k], 1), flPct(n["2022"].percentual[k], 1),
        ((n["2022"].percentual[k] - n["2010"].percentual[k]) >= 0 ? "+" : "−") +
        flNum(Math.abs(n["2022"].percentual[k] - n["2010"].percentual[k]), 1) + " p.p."]),
    });
  }

  // O snapshot vem agrupado por domínio: indicadores.educacao.X
  const sn = ((snapshot && snapshot.indicadores) || {}).educacao || {};
  if (sn.ideb_anos_iniciais_fundamental_rede_publica) {
    note(root, `O Panorama do IBGE traz IDEB de
      ${flNum(sn.ideb_anos_iniciais_fundamental_rede_publica.valor, 1)} nos anos iniciais e
      ${sn.ideb_anos_finais_fundamental_rede_publica ? flNum(sn.ideb_anos_finais_fundamental_rede_publica.valor, 1) : "—"}
      nos anos finais do fundamental na rede pública, e taxa de escolarização de 6 a 14 anos de
      ${sn.taxa_escolarizacao_6_a_14_anos ? flPct(sn.taxa_escolarizacao_6_a_14_anos.valor, 2) : "—"}. O IDEB ali é de
      <strong>${sn.ideb_anos_iniciais_fundamental_rede_publica.ano}</strong> — é o ano mais recente que <em>aquela
      fonte</em> publica, não o mais recente do IDEB.`);
  }

  renderTable(root, {
    caption: "Alfabetização em Florianópolis/SC pelos Censos",
    columns: ["Censo", "Taxa de alfabetização", "Base etária"],
    rows: alf.map(p => [String(p.ano), flPct(p.taxa, 2), p.base_etaria || "—"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 7 — território. A PRIMEIRA cidade do piloto em que o coroplético
// realmente funciona: 1.004 setores contra 3, 4 e 192 das outras.
// ---------------------------------------------------------------------------
function flTerritorio(root, contorno, setores) {
  const fs = setores.setores;
  const urb = fs.filter(s => (s.situacao || "").toLowerCase().startsWith("urb"));
  const popTotal = fs.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaTotal = fs.reduce((a, s) => a + s.area_km2, 0);
  const popUrb = urb.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaUrb = urb.reduce((a, s) => a + s.area_km2, 0);

  renderChoroplethMap(root, {
    boundary: contorno.contorno_lon_lat,
    features: fs,
    valueKey: "densidade_hab_km2",
    valueFormat: (v) => fmtInt.format(Math.round(v)) + " hab./km²",
    legendTitle: "Densidade populacional",
  });

  const dens = fs.map(s => s.densidade_hab_km2 || 0).sort((a, b) => a - b);
  const mediana = dens[Math.floor(dens.length / 2)];
  const maxS = fs.reduce((m, s) => ((s.densidade_hab_km2 || 0) > (m.densidade_hab_km2 || 0) ? s : m), fs[0]);

  renderStats(root, [
    { value: fmtInt.format(setores.n_setores), label: "Setores censitários no município", note: `${urb.length} urbanos, ${setores.n_setores - urb.length} rurais` },
    { value: flPct(100 * popUrb / popTotal, 1), label: "Da população vive em setor urbano", note: `${fmtInt.format(popUrb)} de ${fmtInt.format(popTotal)} pessoas` },
    { value: fmtInt.format(Math.round(maxS.densidade_hab_km2)), label: "Densidade do setor mais denso (hab./km²)", note: maxS.distrito || "" },
    { value: fmtInt.format(Math.round(mediana)), label: "Densidade mediana entre os setores", note: `Média do município: ${fmtInt.format(Math.round(popTotal / areaTotal))} hab./km²` },
  ]);

  note(root, `<strong>Este é o primeiro mapa do piloto que realmente vale como mapa.</strong> Florianópolis tem
    <strong>${fmtInt.format(setores.n_setores)} setores censitários</strong> — contra 192 em
    <a href="itajuba.html">Itajubá</a>, 4 em <a href="barra-bonita.html">Barra Bonita</a> e 3 em
    <a href="serra-da-saudade.html">Serra da Saudade</a>. Com três ou quatro unidades um coroplético só mostra onde
    fica a sede; com mil, ele mostra o <em>padrão intraurbano</em>: onde a cidade é vertical, onde é
    horizontal e onde não é cidade.`);

  note(root, `<strong>Uma escolha de escala que muda o que o mapa mostra.</strong> A cor aqui segue a
    <strong>posição de cada setor na distribuição</strong>, não o valor absoluto — o meio da barra da legenda é a
    mediana, com metade dos setores de cada lado. Numa rampa linear este mapa sairia quase todo do mesmo azul
    claro: com mediana em ${fmtInt.format(Math.round(mediana))} e máximo em
    ${fmtInt.format(Math.round(maxS.densidade_hab_km2))} hab./km², metade dos setores caberia nos primeiros 14% da
    cor. O preço é que <em>diferenças de cor não são proporcionais a diferenças de densidade</em>; o ganho é que o
    padrão intraurbano aparece. Os valores exatos estão no tooltip e na tabela.`);

  note(root, `<strong>A dispersão entre setores é enorme.</strong> A mediana é
    ${fmtInt.format(Math.round(mediana))} hab./km², mas o setor mais denso chega a
    <strong>${fmtInt.format(Math.round(maxS.densidade_hab_km2))} hab./km²</strong> — mais de vinte vezes a mediana.
    A média municipal, ${fmtInt.format(Math.round(popTotal / areaTotal))} hab./km², não descreve lugar nenhum: é a
    razão entre uma população concentrada em ${flPct(100 * areaUrb / areaTotal, 0)} do território e um território
    que inclui morro, mangue, dunas e unidade de conservação.`);

  note(root, `<strong>Uma armadilha que este município revelou.</strong> Florianópolis é insular, e no GeoPackage do
    IBGE um setor que abrange ilhas separadas vem em <em>uma linha por parte</em>, repetindo o registro inteiro em
    cada uma — o setor do arquipélago aparece 10 vezes, sempre com os mesmos 48 habitantes. Somar as linhas dava
    539.919 moradores contra os ${fmtInt.format(popTotal)} do Censo. Agrupando por código de setor e concatenando só
    as geometrias, a soma fecha <strong>exatamente</strong> com a contagem oficial. As três cidades anteriores são
    continentais, e por isso o problema nunca tinha aparecido.`);

  renderTable(root, {
    caption: "Os 12 setores censitários mais densos de Florianópolis/SC, Censo 2022",
    columns: ["Setor", "Distrito", "Situação", "População", "Área (km²)", "Densidade (hab./km²)"],
    rows: fs.slice().sort((a, b) => (b.densidade_hab_km2 || 0) - (a.densidade_hab_km2 || 0)).slice(0, 12)
      .map(s => [s.setor, s.distrito || "—", s.situacao || "—", fmtInt.format(s.populacao),
        flNum(s.area_km2, 3), fmtInt.format(Math.round(s.densidade_hab_km2))]),
  });
}

// ---------------------------------------------------------------------------
// Fase 8 — emprego e economia. Uma economia de serviços, e a maior do piloto.
// ---------------------------------------------------------------------------
function flEmprego(root, cempre, pop, desp) {
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
    { value: fmtInt.format(ult.pessoal_ocupado_total), label: `Pessoal ocupado · ${ult.ano}`, note: popAno ? `${flPct(100 * ult.pessoal_ocupado_total / popAno, 0)} da população` : "" },
    { value: "R$ " + ult.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), label: `Salário médio mensal (nominal) · ${ult.ano}`, note: "O mais alto do piloto" },
  ]);

  note(root, `<strong>Emprego formal de verdade, e é o que separa esta cidade das outras três.</strong> O CEMPRE
    registra ${fmtInt.format(ult.empresas_atuantes)} empresas atuantes e
    ${fmtInt.format(ult.pessoal_ocupado_total)} pessoas ocupadas com carteira em ${ult.ano} —
    ${popAno ? flPct(100 * ult.pessoal_ocupado_total / popAno, 0) : ""} da população. Em
    <a href="barra-bonita.html">Barra Bonita</a> esse mesmo indicador fica perto de 12%, porque lá a maior parte do
    trabalho é agricultura familiar e não emite carteira. Aqui a economia formal <em>é</em> a economia.`);

  const dUlt = desp && desp.serie[desp.serie.length - 1];
  const pessoal = dUlt && (dUlt.natureza["Pessoal e encargos"] || 0);
  if (pessoal) {
    note(root, `Para dimensionar o peso da Prefeitura dentro disso: em ${dUlt.ano} ela empenhou
      ${fmtMoneyFull(pessoal)} em "pessoal e encargos". É muito dinheiro, mas num mercado de trabalho com
      ${fmtInt.format(ult.pessoal_ocupado_total)} ocupados formais o setor público <strong>não</strong> é o
      empregador dominante — ao contrário de <a href="serra-da-saudade.html">Serra da Saudade</a>, onde
      praticamente só a prefeitura emprega.`);
  }

  renderTable(root, {
    caption: "Empresas e emprego formal em Florianópolis/SC, 2006–2021",
    columns: ["Ano", "Empresas atuantes", "Pessoal ocupado", "Assalariados", "Salário médio mensal"],
    rows: s.map(p => [String(p.ano), fmtInt.format(p.empresas_atuantes),
      fmtInt.format(p.pessoal_ocupado_total), fmtInt.format(p.pessoal_ocupado_assalariado),
      "R$ " + p.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })]),
  });
}

function flPib(root, pib) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";
  renderLineChart(root, {
    series: [{ key: "pib", label: "PIB total", color: cor, points: pib.pib_total.map(p => ({ y: p.valor_mil_reais * 1000 })) }],
    xValues: pib.pib_total.map(p => String(p.ano)),
    yLabel: "PIB a preços correntes (R$)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
  });

  const c = pib.composicao_setorial_2021;
  if (!c) return;
  const va = c.valor_adicionado_total;
  const p = (v) => flPct(100 * v / va, 1);
  renderStats(root, [
    { value: p(c.servicos_exceto_adm_publica), label: "Serviços (exceto adm. pública) — % do valor adicionado · 2021" },
    { value: p(c.administracao_publica), label: "Administração pública · 2021" },
    { value: p(c.industria), label: "Indústria · 2021" },
    { value: p(c.agropecuaria), label: "Agropecuária · 2021" },
  ]);

  note(root, `<strong>É uma economia de serviços, quase pura.</strong> Serviços privados respondem por
    ${p(c.servicos_exceto_adm_publica)} do valor adicionado, com a administração pública em
    ${p(c.administracao_publica)} e a indústria em ${p(c.industria)}. A agropecuária é
    ${p(c.agropecuaria)} — <strong>estatisticamente nula</strong>. O contraste com
    <a href="barra-bonita.html">Barra Bonita</a>, onde a agropecuária é 53% do valor adicionado, é o contraste
    entre dois Brasis dentro do mesmo estado.`);

  note(root, `A administração pública em ${p(c.administracao_publica)} do valor adicionado é o que se espera de uma
    <strong>capital</strong>: além da Prefeitura, o município sedia o governo estadual, a Assembleia, o Tribunal de
    Justiça e órgãos federais. Boa parte desse valor não é da Prefeitura — está na cidade, é de outro ente.`);

  renderTable(root, {
    caption: "PIB de Florianópolis/SC a preços correntes, 2002–2023",
    columns: ["Ano", "PIB total (R$ mil)"],
    rows: pib.pib_total.map(p2 => [String(p2.ano), fmtInt.format(p2.valor_mil_reais)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 9 — segurança. Mesma fonte pobre de Barra Bonita, mas aqui com números
// grandes o bastante para a taxa por 100 mil fazer sentido.
// ---------------------------------------------------------------------------
function flSeguranca(root, seg) {
  const st = getComputedStyle(root);
  const cheios = seg.serie.filter(p => !p.ano_parcial);
  const parcial = seg.serie.find(p => p.ano_parcial);

  renderLineChart(root, {
    series: [{
      key: "taxa", label: "Vítimas de homicídio por 100 mil habitantes",
      color: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6",
      points: cheios.map(p => ({ y: p.taxa_por_100mil })),
    }],
    xValues: cheios.map(p => String(p.ano)),
    yLabel: "Por 100 mil habitantes",
    yFormat: (v) => flNum(v, 1), yFormatFull: (v) => flNum(v, 2) + " por 100 mil hab.",
  });

  const totalSC = seg.regua_santa_catarina || [];
  const ultSC = totalSC[totalSC.length - 1];
  const ult = cheios[cheios.length - 1];
  renderStats(root, [
    { value: fmtInt.format(cheios.reduce((a, p) => a + p.vitimas_homicidio, 0)), label: "Vítimas de homicídio em 2023, 2024 e 2025" },
    { value: flNum(ult.taxa_por_100mil, 1), label: `Taxa por 100 mil · ${ult.ano}` },
    { value: parcial ? fmtInt.format(parcial.vitimas_homicidio) : "—", label: `Vítimas em ${parcial ? parcial.ano : ""} (parcial)`, note: seg.ate_o_periodo },
    ultSC ? { value: flNum(ultSC.taxa_por_100mil, 1), label: `Taxa de Santa Catarina · ${ultSC.ano}`, note: `${fmtInt.format(ultSC.vitimas_homicidio)} vítimas no estado` } : null,
  ].filter(Boolean));

  note(root, `<strong>Uma taxa baixa, e aqui ela pode ser lida.</strong> Florianópolis registrou
    ${cheios.map(p => p.vitimas_homicidio).join(", ")} vítimas em ${cheios.map(p => p.ano).join(", ")} —
    taxa de ${flNum(ult.taxa_por_100mil, 1)} por 100 mil em ${ult.ano}${ultSC ? `, contra ${flNum(ultSC.taxa_por_100mil, 1)} de Santa Catarina inteira` : ""}.
    Diferente de <a href="barra-bonita.html">Barra Bonita</a>, onde a taxa não devia sequer ser calculada, aqui a
    população é grande o bastante para o indicador significar alguma coisa: a variação de um único caso move a taxa
    em menos de dois décimos.`);

  if (parcial) {
    note(root, `<strong>E há um sinal de alerta no dado mais recente.</strong> O boletim traz
      <strong>${parcial.vitimas_homicidio} vítimas só no ${seg.ate_o_periodo}</strong> — praticamente o total do ano
      inteiro de ${ult.ano} (${ult.vitimas_homicidio}) em metade do tempo. Meio ano não faz tendência e a série tem
      apenas três anos fechados, então isto é <em>uma observação a acompanhar</em>, não uma conclusão. Mas é o tipo
      de movimento que só aparece porque a fonte publica o parcial.`);
  }

  note(root, `<strong>A limitação da fonte é a mesma dos outros pilotos catarinenses.</strong> A SSP-SC publica um
    <strong>boletim em PDF</strong> cujo único recorte municipal é vítimas de homicídio, e só desde 2023. Os pilotos
    mineiros usam a SEJUSP-MG, que publica <strong>CSV mensal, por município e por 12 naturezas de crime, desde
    2012</strong>. Mesmo domínio, mesma federação, dois estados — e é o estado, não a prefeitura, que determina o
    que dá para saber.`);

  note(root, `<strong>Como este número foi obtido.</strong> O valor foi extraído de dentro do PDF do boletim, lendo
    a tabela dos ${seg.n_municipios_no_boletim} municípios. ${seg.teste_de_fechamento || ""} Ainda assim é extração
    de PDF: se a SSP-SC mudar o desenho do boletim, ela quebra — coisa que não acontece com um CSV de esquema
    estável.`);

  renderTable(root, {
    caption: "Vítimas de homicídio em Florianópolis/SC e no estado",
    columns: ["Ano", "Florianópolis", "Taxa (por 100 mil)", "Santa Catarina", "Taxa estadual"],
    rows: seg.serie.map(p => {
      const sc = totalSC.find(x => x.ano === p.ano);
      return [p.ano_parcial ? `${p.ano} (${seg.ate_o_periodo})` : String(p.ano),
        fmtInt.format(p.vitimas_homicidio),
        p.taxa_por_100mil == null ? "—" : flNum(p.taxa_por_100mil, 1),
        sc ? fmtInt.format(sc.vitimas_homicidio) : "—",
        sc && sc.taxa_por_100mil != null ? flNum(sc.taxa_por_100mil, 1) : "—"];
    }),
  });
}

// ---------------------------------------------------------------------------
// Fase 10 — síntese.
// ---------------------------------------------------------------------------
function flSintese(root, d) {
  const items = [];
  if (d.pop) {
    const u = d.pop.serie[d.pop.serie.length - 1];
    items.push({ value: fmtInt.format(u.populacao), label: `População · ${u.ano}`, note: "Censo 2022 contou 537.211" });
  }
  if (d.ips) items.push({ value: flNum(d.ips.indicadores.ips_geral, 2), label: "IPS Brasil · edição 2026", note: "Oportunidades é a dimensão fraca" });
  if (d.fin) {
    const u = d.fin.serie[d.fin.serie.length - 1];
    items.push({ value: "R$ " + fmtMoneyCompact(u.receita_realizada), label: `Receita realizada · ${u.ano}` });
    items.push({ value: "R$ " + fmtMoneyCompact(u.saldo), label: `Saldo orçamentário · ${u.ano}`, note: u.saldo >= 0 ? "Superávit" : "Déficit" });
  }
  if (d.rec) {
    const u = d.rec.serie[d.rec.serie.length - 1];
    items.push({ value: flPct(u.dependencia_transferencias_pct, 1), label: `Da receita vem de transferência · ${u.ano}`, note: "A menor do piloto" });
    if (u.fpm_per_capita) items.push({ value: "R$ " + fmtInt.format(Math.round(u.fpm_per_capita)), label: `FPM por habitante · ${u.ano}` });
  }
  if (d.desp) {
    const u = d.desp.serie[d.desp.serie.length - 1];
    items.push({ value: "R$ " + fmtInt.format(Math.round(u.per_capita_r2025)), label: `Despesa por habitante · ${u.ano}`, note: "Em R$ de 2025" });
    if (d.desp.comparacao_com_pib) {
      const c = d.desp.comparacao_com_pib.serie;
      const z = c[c.length - 1];
      items.push({ value: flPct(z.despesa_sobre_pib_pct, 1), label: `Despesa sobre o PIB · ${z.ano}` });
    }
  }
  if (d.setores) items.push({ value: fmtInt.format(d.setores.n_setores), label: "Setores censitários", note: "O mapa da Fase 7 finalmente funciona" });
  if (d.cnes) items.push({ value: fmtInt.format(d.cnes.n_com_atendimento_hospitalar), label: "Estabelecimentos com atendimento hospitalar" });
  if (d.cempre) {
    const u = d.cempre.serie[d.cempre.serie.length - 1];
    items.push({ value: fmtInt.format(u.empresas_atuantes), label: `Empresas atuantes · ${u.ano}` });
  }
  if (d.seg) {
    const c = d.seg.serie.filter(p => !p.ano_parcial);
    const u = c[c.length - 1];
    items.push({ value: flNum(u.taxa_por_100mil, 1), label: `Homicídios por 100 mil · ${u.ano}` });
  }
  renderStats(root, items);
  note(root, `Cada número vem da fase correspondente acima, com a mesma fonte e as mesmas ressalvas — este painel
    resume, não recalcula nada.`);
}

// ---------------------------------------------------------------------------
// Orquestração.
// ---------------------------------------------------------------------------
function initFlorianopolisCharts() {
  const q = (sel) => document.querySelector(sel);
  const fase = (el) => el && el.closest("details.phase");
  const j = (n) => FL.get(n);

  const popRoot = q("#chart-populacao");
  onFirstOpen(fase(popRoot), () => {
    j("populacao_2000_2025.json").then(p => flPopulacao(popRoot, p)).catch(() => showError(popRoot));
  });

  const idhmRoot = q("#chart-idhm");
  onFirstOpen(fase(idhmRoot), () => {
    Promise.all([j("idhm_historico_1991_2010.json"), j("ips_brasil_2026.json")])
      .then(([a, b]) => flIdhm(idhmRoot, a, b)).catch(() => showError(idhmRoot));
  });

  const finRoot = q("#chart-financas");
  const realRoot = q("#chart-despesa-real");
  const pibDespRoot = q("#chart-pib-despesa");
  const funcoesRoot = q("#chart-funcoes-tempo");
  const varRoot = q("#chart-despesa-variacao");
  const origemRoot = q("#chart-receita-origem");
  const natRoot = q("#chart-despesa-natureza");
  // CADA GRÁFICO CAI SOZINHO. Com um único try/catch em volta dos seis, uma
  // exceção num deles deixava os outros cinco em branco — foi o que aconteceu
  // aqui: flVariacao quebrou numa função criada depois de 2014 (variação
  // percentual sobre base zero) e levou junto cinco gráficos que estavam certos.
  const desenha = (fn, alvo, ...args) => {
    if (!alvo) return;
    try { fn(alvo, ...args); } catch (e) { console.error(alvo.id + ":", e); showError(alvo); }
  };
  onFirstOpen(fase(finRoot), () => {
    j("siconfi_receita_despesa_2014_2025.json")
      .then(f => desenha(flFinancas, finRoot, f))
      .catch(() => showError(finRoot));
    Promise.all([j("despesa_funcao_natureza_2014_2025.json"), j("receita_origem_2014_2025.json"),
                 j("pib_municipal_2002_2023.json")])
      .then(([desp, rec, pib]) => {
        desenha(flDespesaReal, realRoot, desp);
        desenha(flPibVsDespesa, pibDespRoot, desp, pib);
        desenha(flFuncoes, funcoesRoot, desp);
        desenha(flVariacao, varRoot, desp);
        desenha(flReceitaOrigem, origemRoot, rec);
        desenha(flNatureza, natRoot, desp);
      }).catch(() => showError(realRoot, pibDespRoot, funcoesRoot, varRoot, origemRoot, natRoot));
  });

  const saudeRoot = q("#chart-saude");
  onFirstOpen(fase(saudeRoot), () => {
    Promise.all([j("registro_civil_2003_2024.json"), j("ibge_cidades_snapshot_2026.json"),
                 j("cnes_estabelecimentos_2026.json").catch(() => null)])
      .then(([rc, sn, cnes]) => flSaude(saudeRoot, rc, sn, cnes)).catch(() => showError(saudeRoot));
  });

  const educRoot = q("#stats-educacao");
  onFirstOpen(fase(educRoot), () => {
    Promise.all([j("educacao_alfabetizacao_nivel_instrucao.json"),
                 j("ibge_cidades_snapshot_2026.json"), j("ips_brasil_2026.json")])
      .then(([e, sn, ips]) => flEducacao(educRoot, e, sn, ips)).catch(() => showError(educRoot));
  });

  const mapRoot = q("#map-territorio");
  onFirstOpen(fase(mapRoot), () => {
    Promise.all([j("municipio_contorno.json"), j("setores_poligonos_2022.json")])
      .then(([c, s]) => flTerritorio(mapRoot, c, s)).catch(() => showError(mapRoot));
  });

  const empregoRoot = q("#chart-emprego");
  const pibRoot = q("#chart-pib");
  onFirstOpen(fase(empregoRoot || pibRoot), () => {
    Promise.all([j("cempre_empresas_emprego_2006_2021.json"), j("populacao_2000_2025.json"),
                 j("despesa_funcao_natureza_2014_2025.json")])
      .then(([c, p, d]) => { if (empregoRoot) flEmprego(empregoRoot, c, p, d); })
      .catch(() => showError(empregoRoot));
    j("pib_municipal_2002_2023.json").then(p => { if (pibRoot) flPib(pibRoot, p); })
      .catch(() => showError(pibRoot));
  });

  const segRoot = q("#chart-seguranca");
  onFirstOpen(fase(segRoot), () => {
    j("seguranca_ssp_sc_2023_2026.json").then(s => flSeguranca(segRoot, s)).catch(() => showError(segRoot));
  });

  const sinteseRoot = q("#painel-sintese");
  const iduRoot = q("#idu-br");
  onFirstOpen(fase(sinteseRoot || iduRoot), () => {
    const opt = (n) => j(n).catch(() => null);
    if (sinteseRoot) {
      Promise.all([opt("populacao_2000_2025.json"), opt("ips_brasil_2026.json"),
                   opt("siconfi_receita_despesa_2014_2025.json"), opt("receita_origem_2014_2025.json"),
                   opt("despesa_funcao_natureza_2014_2025.json"), opt("setores_censitarios_2022.json"),
                   opt("cempre_empresas_emprego_2006_2021.json"), opt("cnes_estabelecimentos_2026.json"),
                   opt("seguranca_ssp_sc_2023_2026.json")])
        .then(([pop, ips, fin, rec, desp, setores, cempre, cnes, seg]) =>
          flSintese(sinteseRoot, { pop, ips, fin, rec, desp, setores, cempre, cnes, seg }))
        .catch(() => showError(sinteseRoot));
    }
    if (iduRoot) {
      opt("idu_br_2026.json").then(idu => { if (idu) buildIduBrSection(iduRoot, idu); else showError(iduRoot); });
    }
  });
}

// Só monta os gráficos desta cidade na página dela. Os ids de contêiner são os
// mesmos em todos os pilotos; sem esta guarda, abrir qualquer outra página
// dispararia fetch em ../dados/florianopolis/ e desenharia os números daqui lá.
if (document.body.dataset.piloto === "florianopolis") initFlorianopolisCharts();
