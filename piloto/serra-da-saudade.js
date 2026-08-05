// ===========================================================================
// Serra da Saudade/MG — montagem dos gráficos do piloto.
//
// Este arquivo carrega DEPOIS de charts.js e reaproveita os renderizadores
// genéricos de lá (renderLineChart, renderBarsHorizontal, renderChoroplethMap,
// renderStats, renderTable, legend, note…). O que NÃO se reaproveita são as
// funções build* de Itajubá: elas têm a narrativa daquela cidade escrita no
// meio do código ("as obras seguem os empréstimos", "o hospital", "a UNIFEI"),
// e nada disso vale aqui. Cada cidade traz o seu texto; o desenho é comum.
//
// Nenhum número mora neste arquivo. Tudo vem de ../dados/serra-da-saudade/.
// ===========================================================================

const SS = {
  dir: "../dados/serra-da-saudade/",
  cache: {},
};

SS.get = function (nome) {
  if (!this.cache[nome]) {
    this.cache[nome] = fetch(this.dir + nome).then(r => {
      if (!r.ok) throw new Error(nome + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[nome];
};

// ---------------------------------------------------------------------------
// Fase 1 — população. O interesse aqui é o inverso do de Itajubá: lá a
// Estimativa vinha inflada e o Censo 2022 corrigiu para baixo; aqui vinha
// deflacionada e o Censo corrigiu para CIMA.
// ---------------------------------------------------------------------------
function ssPopulacao(root, pop) {
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
  const c2010 = censos.find(p => p.ano === 2010), c2022 = censos.find(p => p.ano === 2022);
  const est2021 = pop.serie.find(p => p.ano === 2021);
  const ult = pop.serie[pop.serie.length - 1];

  renderStats(root, [
    { value: fmtInt.format(c2022.populacao), label: "Censo 2022 — a contagem oficial", note: "O menor município do Brasil" },
    { value: fmtInt.format(c2010.populacao), label: "Censo 2010", note: `De 2010 para 2022 a população subiu ${pct(100 * (c2022.populacao / c2010.populacao - 1), 1)}` },
    { value: fmtInt.format(est2021.populacao), label: "Estimativa para 2021", note: `O Censo do ano seguinte contou ${fmtInt.format(c2022.populacao - est2021.populacao)} pessoas a mais` },
    { value: fmtInt.format(ult.populacao), label: `Estimativa ${ult.ano}` },
  ]);

  note(root, `<strong>A estimativa estava errando para baixo, e isso importa.</strong> A série do IBGE vinha
    caindo desde 2010 e chegou a ${fmtInt.format(est2021.populacao)} habitantes na estimativa de 2021 — e então o
    Censo 2022 contou ${fmtInt.format(c2022.populacao)}, ${fmtInt.format(c2022.populacao - est2021.populacao)} a mais.
    <strong>É o oposto do que aconteceu em Itajubá</strong>, onde a estimativa vinha inflada e o Censo corrigiu para
    baixo. Aqui a leitura muda de sentido: a cidade não está encolhendo desde 2010 — está praticamente estável, entre
    ${c2010.populacao} e ${c2022.populacao} pessoas, com o Censo 2000 (${censos[0].populacao}) ainda como o pico da série.`);

  note(root, `<strong>Por que a estimativa erra tanto aqui.</strong> A estimativa anual é um cálculo de tendência
    apoiado no Censo anterior, não uma contagem. Num município de oitocentas pessoas, o método tem pouca massa para
    trabalhar: <strong>vinte moradores a mais ou a menos já movem o total em 2,4%</strong>. Por isso os anos de
    Censo (marcados com o ponto maior) valem muito mais que os intermediários — e por isso todo valor "por
    habitante" desta página deve ser lido como retrato do ano, não como tendência.`);

  note(root, `2007 e 2023 não têm valor publicado para este município nesta tabela do IBGE — a linha salta o ano
    em vez de inventar o ponto. É a mesma lacuna que aparece no piloto de Itajubá, e é do IBGE, não da coleta.`);

  renderTable(root, {
    caption: "População de Serra da Saudade/MG, 2000–2025",
    columns: ["Ano", "População", "Fonte"],
    rows: pop.serie.map(p => [String(p.ano), fmtInt.format(p.populacao),
      p.fonte === "censo" ? "Censo (contagem)" : "Estimativa"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 2 — IDHM 1991/2000/2010 e o IPS Brasil 2026 ao lado.
// ---------------------------------------------------------------------------
function ssIdhm(root, idhm, ips) {
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
    { value: ips.indicadores.ips_geral.toFixed(2).replace(".", ","), label: "IPS Brasil · edição 2026", note: "Escala 0–100, não 0–1 — outro índice, não é continuação do IDHM" },
    { value: z.educacao.toFixed(3).replace(".", ","), label: `IDHM Educação · ${z.ano}`, note: `Saiu de ${a.educacao.toFixed(3).replace(".", ",")} — quase triplicou, a dimensão que mais andou` },
    { value: ips.indicadores.dim_oportunidades.toFixed(1).replace(".", ","), label: "IPS · dimensão Oportunidades", note: "A mais baixa das três dimensões do IPS aqui" },
  ]);

  note(root, `<strong>A dimensão que mudou foi a Educação</strong>: ${a.educacao.toFixed(3).replace(".", ",")} em
    ${a.ano} para ${z.educacao.toFixed(3).replace(".", ",")} em ${z.ano}. Longevidade também subiu bastante
    (${a.longevidade.toFixed(3).replace(".", ",")} → ${z.longevidade.toFixed(3).replace(".", ",")}). Renda é a que
    menos andou (${a.renda.toFixed(3).replace(".", ",")} → ${z.renda.toFixed(3).replace(".", ",")}) — e note que
    entre 1991 e 2000 ela chegou a subir para ${idhm.serie[1].renda.toFixed(3).replace(".", ",")} antes de recuar.`);

  note(root, `<strong>Duas ressalvas de método.</strong> A série para em 2010 e não vai continuar: o Atlas do
    Desenvolvimento Humano não foi recalculado depois do Censo 2010, então <strong>não existe IDHM municipal mais
    recente</strong> para nenhuma cidade do país. E IDHM e IPS Brasil não formam uma linha do tempo única — medem
    coisas parecidas com metodologias e escalas diferentes, por isso aparecem como números separados acima e não
    como continuação da mesma curva.`);

  renderTable(root, {
    caption: "IDHM de Serra da Saudade/MG por dimensão, 1991–2010",
    columns: ["Ano", "IDHM Geral", "Educação", "Longevidade", "Renda"],
    rows: idhm.serie.map(p => [String(p.ano), p.geral.toFixed(3).replace(".", ","),
      p.educacao.toFixed(3).replace(".", ","), p.longevidade.toFixed(3).replace(".", ","),
      p.renda.toFixed(3).replace(".", ",")]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — finanças. Notas por ano do gráfico de saldo.
// ---------------------------------------------------------------------------
const SS_SALDO_NOTAS = {
  2014: "Primeiro ano com dado estruturado no SICONFI. Orçamento de R$ 9,8 mi e 90,9% dele vindo de transferência.",
  2017: "Primeiro déficit da série: a despesa sobe 23% em um ano e a receita fica parada.",
  2018: "Praticamente empatado — déficit de R$ 76 mil, o menor desvio de doze anos.",
  2020: "Pandemia: entra auxílio federal e a receita sobe 16% sem que a despesa acompanhe.",
  2022: "O maior superávit da série (R$ 6,6 mi). Entraram R$ 5,2 mi de transferência de capital, quase dez vezes a média dos outros anos.",
  2023: "O ano que a versão anterior desta página mostrava errado. Foi o MAIOR DÉFICIT da série: a receita de capital some (R$ 5,2 mi em 2022 para R$ 0,3 mi) e a despesa continua subindo. É também o ano de maior investimento (R$ 3,2 mi).",
  2024: "Volta ao azul, com o FPM chegando a R$ 18,6 mi.",
  2025: "Receita de R$ 33,0 mi bruta e superávit de R$ 1,4 mi. O FPM sozinho passa de R$ 20 mi.",
};

function ssFinancas(root, fin) {
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
  renderReceitaDespesaSaldo(root, {
    serie: fin.serie, cReceita, cDespesa, posColor, negColor, notas: SS_SALDO_NOTAS,
  });

  const def = fin.serie.filter(p => p.saldo < 0);
  const pior = def.slice().sort((a, b) => a.saldo - b.saldo)[0];
  renderStats(root, [
    { value: String(def.length) + " de " + fin.serie.length, label: "Anos que fecharam no vermelho", note: def.map(p => p.ano).join(", ") },
    { value: milhoes(pior.saldo), label: `Maior déficit da série · ${pior.ano}`, note: "Receita caiu e despesa continuou subindo" },
    { value: milhoes(fin.serie[fin.serie.length - 1].saldo), label: `Saldo em ${fin.serie[fin.serie.length - 1].ano}` },
  ]);

  note(root, `<strong>Passe o mouse por um ano</strong> para ver receita, despesa, quanto sobrou ou faltou e o que
    aconteceu. A faixa colorida entre as linhas <em>é</em> o saldo.`);

  note(root, `<strong>Três dos doze anos fecharam no vermelho — 2017, 2018 e 2023</strong> — e o pior deles, 2023,
    é justamente o que a versão anterior desta página apresentava como o segundo melhor superávit. O motivo do
    buraco de 2023 está na receita de capital: em 2022 entraram R$ 5,2 milhões de transferências de capital e no ano
    seguinte apenas R$ 0,3 milhão, enquanto a despesa seguiu subindo (R$ 19,5 mi para R$ 26,3 mi). Foi também o ano
    de maior investimento da série, R$ 3,2 milhões.`);

  note(root, `<strong>Nota de fonte, e ela é uma diferença real em relação a Itajubá.</strong> Lá este gráfico vem
    do RREO, o relatório bimestral. Aqui o RREO <strong>não existe</strong>: consultado na API do SICONFI, ele
    devolve vazio em todos os seis períodos de todos os anos entre 2013 e 2026, e o RGF também. A série acima vem do
    DCA — a declaração anual definitiva —, que é mais confiável que o bimestral e ainda alcança 2014. Receita e
    despesa excluem as operações intraorçamentárias dos dois lados, para que o saldo compare grandezas equivalentes.`);

  renderTable(root, {
    caption: "Receita, despesa e saldo de Serra da Saudade/MG, 2014–2025",
    columns: ["Ano", "Receita realizada", "Despesa empenhada", "Saldo"],
    rows: fin.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_realizada),
      fmtMoneyFull(p.despesa_empenhada), fmtMoneyFull(p.saldo)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — nominal × real.
// ---------------------------------------------------------------------------
function ssDespesaReal(root, desp) {
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
    { value: pct(inflPct), label: "Inflação acumulada no período (IPCA)", note: `R$ 1 de ${a.ano} = R$ ${a.ipca_fator_para_2025.toFixed(2).replace(".", ",")} hoje` },
    { value: pct(realPct), label: "Aumento REAL, já descontada a inflação", note: `De ${milhoes(a.total_empenhado_r2025)} para ${milhoes(b.total_empenhado_r2025)}, em R$ de 2025` },
    { value: "R$ " + fmtInt.format(Math.round(b.per_capita_r2025)), label: `Gasto por habitante em ${b.ano}`, note: "Foto do ano, não tendência — ver ressalva" },
  ]);

  note(root, `A distância entre as linhas é a inflação. Dos ${pct(nomPct)} nominais, ${pct(inflPct)} é só o real
    valendo menos; sobra <strong>${pct(realPct)} de crescimento verdadeiro</strong> em onze anos.
    <span style="opacity:.85">A versão anterior desta página afirmava 176% nominais — número que por acaso batia — e
    78% reais, que não bate: vinha de uma tabela de deflatores digitada à mão, com o fator de 2014 em 1,867 quando o
    IPCA/IBGE dá ${a.ipca_fator_para_2025.toFixed(4).replace(".", ",")} para reais de 2025.</span>`);

  note(root, `<strong>R$ ${fmtInt.format(Math.round(b.per_capita_r2025))} por habitante por ano</strong> é o número
    que define esta cidade. Em Itajubá, com 96 mil habitantes, o mesmo cálculo dá cerca de R$ 5,2 mil. Aqui é
    <strong>seis vezes mais</strong> — e não porque se gaste mal, mas porque o denominador é 833 pessoas. Uma
    prefeitura tem um custo mínimo de existir (prefeito, secretários, contador, Câmara, uma escola, um posto de
    saúde) que quase não diminui com o tamanho da cidade; dividido por pouca gente, esse custo fixo vira um valor
    per capita altíssimo. <strong>É o mesmo mecanismo do FPM</strong>, do outro lado da conta: receita mínima
    garantida dividida por pouca gente (gráfico 7).`);

  renderTable(root, {
    caption: "Despesa empenhada, nominal e corrigida pela inflação, 2014–2025",
    columns: ["Ano", "Nominal", "Em R$ de 2025", "População", "Por habitante (R$ de 2025)"],
    rows: s.map(p => [String(p.ano), fmtMoneyFull(p.total_empenhado), fmtMoneyFull(p.total_empenhado_r2025),
      p.populacao ? fmtInt.format(p.populacao) : "sem estimativa",
      p.per_capita_r2025 ? fmtMoneyFull(p.per_capita_r2025) : "—"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — PIB × despesa. Aqui está o achado mais forte da cidade.
// ---------------------------------------------------------------------------
function ssPibVsDespesa(root, desp, pib) {
  const cmp = desp.comparacao_com_pib;
  if (!cmp) return;
  const cs = pib && pib.composicao_setorial_2021;
  const admPct = cs ? (100 * cs.administracao_publica / cs.valor_adicionado_total).toFixed(0) : null;
  const st = getComputedStyle(root);
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

  const pri = cmp.serie[0], ult = cmp.serie[cmp.serie.length - 1];
  renderStats(root, [
    { value: ult.despesa_sobre_pib_pct.toFixed(0).replace(".", ",") + "%", label: `Despesa da Prefeitura sobre o PIB · ${ult.ano}`, note: `Era ${pri.despesa_sobre_pib_pct.toFixed(0)}% em ${cmp.base_indice}` },
    { value: Math.round(ult.indice_despesa) + " / 100", label: `Despesa em ${ult.ano}`, note: `Cresceu ${pct(ult.indice_despesa - 100)} em termos reais desde ${cmp.base_indice}` },
    { value: Math.round(ult.indice_pib) + " / 100", label: `PIB do município em ${ult.ano}`, note: `Praticamente o mesmo de ${cmp.base_indice}, descontada a inflação` },
  ]);

  note(root, `<strong>Este é o número que separa Serra da Saudade de quase todo o resto do país: em ${ult.ano} a
    despesa da Prefeitura equivale a ${ult.despesa_sobre_pib_pct.toFixed(0)}% do PIB do município</strong> — ou
    seja, a prefeitura movimenta, sozinha, tanto quanto toda a economia local produz em um ano. No
    <a href="itajuba.html">piloto de Itajubá</a>, calculado do mesmo jeito e no mesmo ano, esse indicador é de
    9,5%. Não é erro de conta: são duas medidas de coisas diferentes (o PIB mede
    valor adicionado; o orçamento mede dinheiro que passa pelo caixa, boa parte dele vindo de fora do município),
    e é exatamente por isso que a razão pode passar de 100%. O que ela mostra é a dimensão relativa: <strong>aqui o
    setor público não é um agente da economia local, é a economia local.</strong>`);

  note(root, `E as duas linhas andam separadas. Corrigido pela inflação, <strong>o PIB de ${ult.ano} está no índice
    ${ult.indice_pib.toString().replace(".", ",")} — praticamente onde estava em ${cmp.base_indice}</strong>,
    enquanto a despesa da Prefeitura subiu ${pct(ult.indice_despesa - 100)}. O orçamento cresceu por repasse
    (gráfico 7), não porque a cidade tenha ficado mais rica.`);

  note(root, `<strong>Ressalvas.</strong> O IBGE não publica PIB municipal a preços constantes, então a correção usa
    o mesmo IPCA do resto da página — procedimento usual, mas o IPCA mede preços ao consumidor, não a estrutura de
    preços da produção. A série do PIB municipal termina em ${ult.ano}, último ano publicado, e por isso este
    gráfico para antes dos outros. E há uma circularidade a declarar: <strong>a rubrica "administração pública" é
    ela própria ${admPct ? admPct + "% do valor adicionado do município" : "a maior fatia do valor adicionado do município"}</strong>
    (Fase 8) — quer dizer, parte do PIB que aparece aqui é o próprio gasto público sendo contabilizado. As duas
    séries não são independentes, e nenhuma conclusão de causa deve ser tirada daqui.`);

  renderTable(root, {
    caption: `PIB municipal e despesa da Prefeitura, índice ${cmp.base_indice}=100, em R$ de 2025`,
    columns: ["Ano", "PIB (R$ de 2025)", "Despesa (R$ de 2025)", "Índice PIB", "Índice despesa", "Despesa / PIB"],
    rows: cmp.serie.map(p => [String(p.ano), fmtMoneyFull(p.pib_r2025), fmtMoneyFull(p.despesa_r2025),
      p.indice_pib.toString().replace(".", ","), p.indice_despesa.toString().replace(".", ","),
      p.despesa_sobre_pib_pct.toFixed(2).replace(".", ",") + "%"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — pequenos múltiplos por função.
// ---------------------------------------------------------------------------
const SS_FUNCAO_NOTAS = {
  "Saúde|2022": "Salto de 49% real em um ano. É o ano em que entram R$ 5,2 mi de transferência de capital e a receita bruta sobe 48%.",
  "Saúde|2025": "R$ 7,9 milhões — 29% de todo o orçamento, e mais que o dobro de 2014 em termos reais. Sem hospital no município: o dinheiro é atenção básica, farmácia e, sobretudo, transporte de paciente para fora.",
  "Educação|2023": "O pico da série (R$ 5,0 mi). No ano seguinte cai para R$ 3,9 mi.",
  "Cultura|2024": "R$ 2,2 milhões — mais que Urbanismo, Assistência Social e Saneamento somados. Em termos reais a função mais que triplicou desde 2014.",
  "Administração|2025": "R$ 3,8 mi, 14% do orçamento. Numa prefeitura deste porte, a máquina administrativa tem um custo mínimo que não escala para baixo.",
  "Transporte|2023": "R$ 4,1 mi, o pico. Estradas rurais e transporte escolar/sanitário — o município tem 336 km² e só 0,54 km² de área urbana.",
  "outras|2025": "Todo o resto somado: Agricultura, Legislativa, Previdência, Assistência Social, Desporto, Urbanismo, Encargos, Saneamento e as demais.",
};

function ssFuncoes(root, desp) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const serie = desp.serie;
  const ult = serie[serie.length - 1];

  const ranking = Object.entries(ult.funcoes).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  const TOPO = ranking.slice(0, 5);
  const resto = ranking.slice(5);

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
      return { linhas, nota: SS_FUNCAO_NOTAS[`${painel.chave}|${ano.ano}`] };
    },
  });

  const saude = ult.funcoes["Saúde"] || 0, educ = ult.funcoes["Educação"] || 0;
  note(root, `<strong>Passe o mouse por qualquer ano de qualquer painel</strong> para ver quanto a função levou,
    quanto representou do orçamento, quanto deu por habitante e a variação real sobre o ano anterior.`);

  note(root, `<strong>Saúde e Educação levam ${(100 * (saude + educ) / ult.total_empenhado).toFixed(0)}% do
    orçamento</strong>, e isso não é escolha do prefeito: a Constituição obriga o município a aplicar no mínimo 15%
    da receita de impostos em saúde e 25% em educação, e boa parte do dinheiro chega carimbada, via SUS e FUNDEB.
    O que <em>é</em> escolha aparece nas funções seguintes — e a mais chamativa é a <strong>Cultura</strong>, que
    chega a ${milhoes((ult.funcoes["Cultura"] || 0) * ult.ipca_fator_para_2025)} e supera Urbanismo, Assistência
    Social e Saneamento somados.`);

  note(root, `Repare no que <em>não</em> existe nesta lista: <strong>Saneamento aparece com valor perto de zero e
    Habitação zerou de vez</strong>. E não há função de Segurança Pública nenhuma — polícia é do estado, e um
    município deste porte não mantém Guarda Municipal. Os painéis dividem a mesma régua vertical, então a altura de
    um vale contra a do outro.`);

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

// ---------------------------------------------------------------------------
// Fase 3 — variação real por função.
// ---------------------------------------------------------------------------
function ssVariacao(root, desp) {
  const st = getComputedStyle(root);
  const posColor = st.getPropertyValue("--v-pos").trim() || "#2a78d6";
  const negColor = st.getPropertyValue("--v-neg").trim() || "#e34948";
  const todas = desp.comparacao_2014_2025_r2025;
  const CORTE = 1e5;                                  // R$ 100 mil: a escala daqui
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

  const saude = todas.find(c => c.funcao === "Saúde");
  const cultura = todas.find(c => c.funcao === "Cultura");
  const total = desp.serie[desp.serie.length - 1].total_empenhado_r2025 - desp.serie[0].total_empenhado_r2025;

  note(root, `Tudo em R$ de 2025, então o que aparece aqui já é aumento <em>além</em> da inflação. O orçamento
    cresceu ${milhoes(total)} em termos reais em onze anos, e <strong>a Saúde ficou com
    ${milhoes(saude.variacao_real_reais)}, ou ${(100 * saude.variacao_real_reais / total).toFixed(0)}% de todo o
    aumento</strong> — quase o mesmo padrão de Itajubá, por motivo diferente: aqui não há hospital, e o gasto é
    atenção básica e transporte de paciente para Abaeté, Dores do Indaiá e Belo Horizonte.`);

  note(root, `<strong>A anomalia é a Cultura: ${pct(cultura.variacao_real_pct, 1)} em termos reais</strong>, de
    ${milhoes(cultura.r2025_em_2014)} para ${milhoes(cultura.r2025_em_2025)}. É a maior variação percentual da
    tabela inteira, e coloca a função acima de Urbanismo. O <em>porquê</em> desta página não sabe: o SICONFI diz
    quanto foi para "Patrimônio Histórico" e "Difusão Cultural", não o que foi contratado com o dinheiro. A Fase 4
    (compras) é o caminho para responder isso, e a amostra atual do PNCP não traz contrato de cultura relevante —
    fica registrado como <strong>pergunta em aberto, não como conclusão</strong>.`);

  note(root, `No outro extremo, <strong>Saneamento e Habitação foram a zero</strong> (−100% as duas) e Gestão
    Ambiental encolheu ${pct(-91.2, 1)}. São valores pequenos em reais — por isso várias delas ficam fora do gráfico
    pelo corte de R$ 100 mil${fora > 0 ? ` (${fora} funções)` : ""} — mas o sentido é claro: essas três funções
    deixaram de existir no orçamento. Todas aparecem na tabela abaixo.`);

  renderTable(root, {
    caption: "Variação real da despesa por função, 2014→2025, em R$ de 2025",
    columns: ["Função", "2014 (R$ de 2025)", "2025", "Variação", "Variação %"],
    rows: todas.map(c => [c.funcao, fmtMoneyFull(c.r2025_em_2014), fmtMoneyFull(c.r2025_em_2025),
      fmtMoneyFull(c.variacao_real_reais),
      c.variacao_real_pct == null ? "rubrica nova" : pct(c.variacao_real_pct, 1)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — receita por origem.
// ---------------------------------------------------------------------------
function ssReceitaOrigem(root, rec) {
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

  renderStats(root, [
    { value: ult.dependencia_transferencias_pct.toFixed(0) + "%", label: "Da receita vem de transferências", note: "União e estado — FPM, cota-parte do ICMS, SUS, FUNDEB" },
    { value: (100 * ult.arrecadacao_propria / ult.receita_bruta).toFixed(1).replace(".", ",") + "%", label: "É arrecadação própria do município", note: "IPTU, ISS, ITBI, taxas, contribuições e receita patrimonial" },
    { value: milhoes(ult.origens["Impostos e taxas próprios"] || 0), label: "Impostos e taxas cobrados na cidade", note: `Em ${ult.ano}, valores correntes` },
    { value: "R$ 0", label: "Empréstimos tomados em 12 anos", note: "Nenhuma operação de crédito na série inteira" },
  ]);

  note(root, `<strong>${ult.dependencia_transferencias_pct.toFixed(0)}% da receita vem de fora.</strong> A cidade
    arrecada ${milhoes(ult.origens["Impostos e taxas próprios"] || 0)} em impostos e taxas próprios — menos do que
    gasta só com a Câmara Municipal. Em Itajubá a dependência de transferências fica em torno de 73%; aqui passou de
    90% em todos os doze anos da série e chegou a ${Math.max(...rec.serie.map(p => p.dependencia_transferencias_pct)).toFixed(1).replace(".", ",")}%.
    Na prática, <strong>a margem de escolha do governo municipal é ainda menor que o tamanho do orçamento
    sugere</strong>, e a receita sobe e desce conforme a arrecadação federal, sobre a qual a prefeitura não tem
    controle nenhum.`);

  note(root, `<strong>Um detalhe que costuma passar batido: em doze anos a prefeitura não tomou um único
    empréstimo.</strong> A rubrica "operações de crédito" é zero em toda a série, e o gasto com juros da dívida em
    ${ult.ano} foi de R$ 3.894 — literalmente menos que um salário mínimo por mês. É o contrário de Itajubá, onde os
    dois picos de obra coincidem com os dois anos de empréstimo. Aqui não existe ciclo de endividamento a analisar:
    quando entra dinheiro extra, ele vem de transferência de capital, não de banco.`);

  note(root, `Valores brutos, como o SICONFI publica: incluem a parcela retida na fonte para o FUNDEB, que depois
    volta redistribuída pelo estado (${milhoes(ult.deducoes_fundeb)} em ${ult.ano}). Por isso o total aqui é maior
    que a "receita realizada" do primeiro gráfico desta fase, que já vem líquida dessa dedução.
    <strong>Conferência:</strong> ${rec.teste_de_fechamento}`);

  renderTable(root, {
    caption: "Receita bruta por origem, 2014–2025",
    columns: ["Ano", "Receita bruta", "Arrecadação própria", "Transferências", "Empréstimos", "% de transferências"],
    rows: rec.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_bruta), fmtMoneyFull(p.arrecadacao_propria),
      fmtMoneyFull(p.transferencias), fmtMoneyFull(p.operacoes_credito),
      p.dependencia_transferencias_pct.toFixed(1).replace(".", ",") + "%"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — o FPM por habitante. Este gráfico não existe no piloto de Itajubá:
// é a variável que explica a cidade, e ela só é legível per capita.
// ---------------------------------------------------------------------------
function ssFpm(root, rec) {
  const st = getComputedStyle(root);
  const cFpm = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const cPropria = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const s = rec.serie.filter(p => p.populacao);

  const fpmDe = (p) => p.transferencias_detalhe["FPM — Fundo de Participação dos Municípios"] || 0;

  // Sem legend() explícito: renderLineChart já monta a legenda a partir dos
  // rótulos das séries — chamar os dois desenha a mesma legenda duas vezes.
  renderLineChart(root, {
    series: [
      { key: "fpm", label: "FPM por habitante", color: cFpm, points: s.map(p => ({ y: fpmDe(p) / p.populacao })) },
      { key: "propria", label: "Arrecadação própria por habitante", color: cPropria, points: s.map(p => ({ y: p.arrecadacao_propria / p.populacao })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "R$ por habitante (valores correntes)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v) + " por habitante",
  });

  const ult = s[s.length - 1], pri = s[0];
  renderStats(root, [
    { value: "R$ " + fmtInt.format(Math.round(fpmDe(ult) / ult.populacao)), label: `FPM por habitante · ${ult.ano}`, note: `Era R$ ${fmtInt.format(Math.round(fpmDe(pri) / pri.populacao))} em ${pri.ano}` },
    { value: milhoes(fpmDe(ult)), label: `FPM total recebido · ${ult.ano}`, note: `${(100 * fpmDe(ult) / ult.receita_bruta).toFixed(0)}% de toda a receita` },
    { value: "R$ " + fmtInt.format(Math.round(ult.arrecadacao_propria / ult.populacao)), label: `Arrecadação própria por habitante · ${ult.ano}` },
    { value: Math.round(fpmDe(ult) / ult.arrecadacao_propria) + "×", label: "O FPM é quantas vezes a arrecadação local" },
  ]);

  note(root, `<strong>O FPM é a explicação da cidade inteira</strong>, e o gráfico mostra por quê. O Fundo de
    Participação dos Municípios distribui a cota do interior por coeficientes definidos em faixas de população, e
    <strong>a faixa mais baixa vale para todo município de até 10.188 habitantes</strong> (a tabela de coeficientes
    vem do Decreto-Lei nº 1.881/1981, que alterou o Código Tributário Nacional; a Lei Complementar nº 91/1997 depois
    tratou da preservação desses coeficientes). Ou seja: uma cidade de 10 mil habitantes e uma de 833 recebem o
    <em>mesmo</em> coeficiente mínimo. Dividido por 833 pessoas em vez de 10 mil, o mesmo bolo vira
    <strong>R$ ${fmtInt.format(Math.round(fpmDe(ult) / ult.populacao))} por habitante por ano</strong>.`);

  note(root, `A distância entre as duas linhas é o retrato da autonomia fiscal: <strong>o FPM é
    ${Math.round(fpmDe(ult) / ult.arrecadacao_propria)} vezes tudo o que a cidade arrecada sozinha</strong> —
    impostos, taxas, contribuições e receita patrimonial somados. Com pouca transação imobiliária formal e quase
    nenhuma atividade empresarial privada (a Fase 8 mostra 18 empresas ativas no município), a base tributária
    própria é residual por construção, não por falta de esforço de cobrança.`);

  note(root, `<strong>O risco que isso cria.</strong> Um município cuja receita é
    ${ult.dependencia_transferencias_pct.toFixed(0)}% transferência e cuja arrecadação própria não paga sequer a
    Câmara depende inteiramente de uma regra federal que pode mudar. Propostas de fusão de municípios pequenos
    circulam no Congresso há anos — a mais citada é a PEC 188/2019, do Pacto Federativo, cuja versão original previa
    critérios de população e de arrecadação própria mínima. <strong>Esta página não afirma que essa PEC esteja em
    vigor nem que vá ser aprovada</strong>: ela é apenas o exemplo mais conhecido de um debate recorrente. O que o
    dado mostra, e isso é verificável, é a dimensão da exposição.`);

  renderTable(root, {
    caption: "FPM e arrecadação própria por habitante, 2014–2025 (valores correntes)",
    columns: ["Ano", "População", "FPM total", "FPM por habitante", "Arrecadação própria", "Própria por habitante"],
    rows: s.map(p => [String(p.ano), fmtInt.format(p.populacao), fmtMoneyFull(fpmDe(p)),
      fmtMoneyFull(fpmDe(p) / p.populacao), fmtMoneyFull(p.arrecadacao_propria),
      fmtMoneyFull(p.arrecadacao_propria / p.populacao)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 4 — compras públicas (PNCP).
// ---------------------------------------------------------------------------
function ssCompras(root, pncp) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Por modalidade de contratação");
  renderBarsHorizontal(root, {
    data: pncp.modalidades_incluidas, labelKey: "modalidade", valueKey: "quantidade",
    valueFormat: (v) => fmtInt.format(v), valueFormatFull: (v) => fmtInt.format(v) + " processos",
    color: cor, ariaLabelPrefix: "Processos de compra por modalidade",
  });

  const disp = pncp.modalidades_incluidas.find(m => m.modalidade === "Dispensa de Licitação");
  const inex = pncp.modalidades_incluidas.find(m => m.modalidade === "Inexigibilidade");
  const pregao = pncp.modalidades_incluidas.find(m => m.modalidade === "Pregão - Eletrônico");
  const direta = (disp ? disp.quantidade : 0) + (inex ? inex.quantidade : 0);

  note(root, `<strong>Aqui uma hipótese da versão anterior desta página caiu.</strong> Ela previa que
    "dispensa e inexigibilidade devem ter peso enorme aqui, dado o tamanho do mercado local". Varridas as
    <strong>13 modalidades</strong> do PNCP entre jan/2025 e ago/2026, sem erro de coleta, o resultado é o oposto:
    <strong>${pregao ? pregao.quantidade : 0} dos ${pncp.total_processos} processos são Pregão Eletrônico</strong> e
    só ${direta} ${direta === 1 ? "é contratação direta" : "são contratações diretas"}
    (${disp ? disp.quantidade : 0} dispensa e ${inex ? inex.quantidade : 0} inexigibilidade). A prefeitura licita
    por pregão eletrônico praticamente tudo o que compra.`);

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

  renderStats(root, [
    { value: fmtInt.format(pncp.total_processos), label: `Processos publicados · ${pncp.periodo_label}` },
    { value: "R$ " + fmtMoneyCompact(pncp.valor_total_estimado), label: "Valor total estimado somado", note: fmtMoneyFull(pncp.valor_total_estimado) },
    { value: String(pncp.modalidades_incluidas.length) + " de 13", label: "Modalidades com algum processo", note: "As 13 foram consultadas; 5 têm registro" },
  ]);

  note(root, `<strong>Diferença de método em relação a Itajubá, e a favor daqui.</strong> Lá a Dispensa de Licitação
    teve de ficar de fora porque a API do PNCP travava no volume. Neste município o volume é pequeno o bastante para
    varrer tudo: as 13 modalidades foram consultadas, com paginação até o fim de cada uma e zero erro de coleta.
    A categoria de cada processo é inferida do texto do objeto por palavras-chave — é classificação nossa, não do
    PNCP — e o valor é o <em>estimado</em> na publicação, não o homologado nem o pago.`);

  renderTable(root, {
    caption: `Processos de compra por categoria, ${pncp.periodo_label}`,
    columns: ["Categoria", "Processos", "Valor estimado somado"],
    rows: pncp.por_categoria.map(c => [c.categoria, fmtInt.format(c.quantidade), fmtMoneyFull(c.valor_estimado)]),
  });
  renderTable(root, {
    caption: `Processos de compra por mês, ${pncp.periodo_label}`,
    columns: ["Mês", "Processos", "Valor estimado somado"],
    rows: pncp.por_mes.map(p => [p.mes_label, fmtInt.format(p.quantidade), fmtMoneyFull(p.valor_estimado)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 5 — saúde: nascidos vivos e óbitos.
// ---------------------------------------------------------------------------
function ssSaude(root, rc, snapshot, cnes) {
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
    missingLabel: "sem registro publicado",
  });

  const comNasc = s.filter(p => p.nascidos_vivos != null);
  const media = comNasc.reduce((a, p) => a + p.nascidos_vivos, 0) / comNasc.length;
  const maxN = Math.max(...comNasc.map(p => p.nascidos_vivos));
  const minN = Math.min(...comNasc.map(p => p.nascidos_vivos));

  const stats = [
    { value: media.toFixed(1).replace(".", ","), label: "Média de nascimentos por ano", note: `Entre ${minN} e ${maxN} ao longo da série` },
    { value: fmtInt.format(comNasc[comNasc.length - 1].nascidos_vivos), label: `Nascidos vivos · ${comNasc[comNasc.length - 1].ano}` },
  ];
  if (cnes) {
    stats.push({ value: String(cnes.n_estabelecimentos), label: "Estabelecimentos de saúde no CNES", note: cnes.tem_hospital ? "Inclui unidade com internação" : "Nenhum deles com internação" });
  }
  renderStats(root, stats);

  if (cnes) {
    note(root, `<strong>O CNES confirma: não há hospital.</strong> Os
      ${cnes.n_estabelecimentos} estabelecimentos cadastrados no município são
      ${cnes.estabelecimentos.map(e => e.tipo.toLowerCase()).filter((v, i, a) => a.indexOf(v) === i).join(", ")} —
      <strong>nenhum com leito de internação</strong>. Toda internação, parto hospitalar e atendimento de urgência
      acontece fora do município, e é paga por outro ente ou por consórcio intermunicipal: não passa pelo orçamento
      da Prefeitura e por isso não aparece na Fase 3. <span style="opacity:.85">Esta fonte ficou registrada como
      "Tentado — 503" no piloto de Itajubá; a API de dados abertos do Ministério da Saúde respondeu normalmente
      aqui.</span>`);
    renderTable(root, {
      caption: "Estabelecimentos de saúde cadastrados no CNES",
      columns: ["CNES", "Nome", "Tipo"],
      rows: cnes.estabelecimentos.map(e => [String(e.cnes), e.nome, e.tipo]),
    });
  }

  note(root, `<strong>Este é o gráfico mais frágil da página, e é importante dizer isso antes de qualquer
    leitura.</strong> A cidade registra em média ${media.toFixed(1).replace(".", ",")} nascimentos por ano. Com
    números assim, <strong>uma diferença de dois ou três eventos não é tendência: é o acaso</strong>. Qualquer taxa
    por mil habitantes calculada sobre esta base oscila dezenas de pontos de um ano para o outro sem que nada tenha
    mudado na cidade. Por isso aqui não há taxa de mortalidade nem de natalidade — só a contagem bruta.`);

  note(root, `<strong>Dois termos, para não confundir.</strong> "Óbitos" aqui são mortes de <em>qualquer idade</em>,
    não mortalidade infantil. E os dois indicadores são de <em>registro</em> em cartório no município, não de
    residência: um morador que nasce ou morre num hospital de outra cidade pode ser registrado lá. Como o município
    <strong>não tem hospital</strong> (confirmado no CNES, abaixo), é bastante provável que boa parte dos
    nascimentos de mães da cidade não apareça nesta série — o que reforça a ressalva acima em vez de enfraquecê-la.`);

  const mi = snapshot && snapshot.indicadores && snapshot.indicadores.saude
    && snapshot.indicadores.saude.mortalidade_infantil;
  if (mi) {
    note(root, `O IBGE Cidades publica mortalidade infantil de ${mi.valor.toFixed(1).replace(".", ",")} por mil para
      o período ${mi.ano}. <strong>Não usamos esse número como indicador de saúde da cidade</strong>: ele sai de uma
      base de menos de dez nascimentos por ano e o valor zero significa "nenhum óbito infantil registrado no
      período", não "saúde infantil ótima". É informação, não é medida.`);
  }

  renderTable(root, {
    caption: "Nascidos vivos e óbitos registrados em Serra da Saudade/MG, 2003–2024",
    columns: ["Ano", "Nascidos vivos", "Óbitos"],
    rows: s.map(p => [String(p.ano),
      p.nascidos_vivos == null ? "—" : fmtInt.format(p.nascidos_vivos),
      p.obitos == null ? "sem registro publicado" : fmtInt.format(p.obitos)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 6 — educação.
// ---------------------------------------------------------------------------
function ssEducacao(root, educ, snapshot, ips) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Alfabetização, 2000–2022");
  const alf = educ.alfabetizacao.serie;
  renderLineChart(root, {
    series: [{ key: "alf", label: "Taxa de alfabetização", color: cor, points: alf.map(p => ({ y: p.taxa })) }],
    xValues: alf.map(p => String(p.ano)),
    yLabel: "% de pessoas alfabetizadas",
    yFormat: (v) => v.toFixed(0) + "%",
    yFormatFull: (v) => v.toFixed(2).replace(".", ",") + "%",
  });
  note(root, `Cada Censo mediu numa base etária diferente — ${alf.map(p => `${p.ano}: ${p.base_etaria}`).join("; ")} —
    então a linha não é perfeitamente comparável ponto a ponto. E a escala manda de novo: com cerca de 700 pessoas
    na base, <strong>um ponto percentual equivale a umas sete pessoas</strong>.`);

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
    note(root, `A faixa "sem instrução ou fundamental incompleto" caiu de
      ${n["2010"].percentual.sem_instrucao_fundamental_incompleto.toFixed(1).replace(".", ",")}% para
      ${n["2022"].percentual.sem_instrucao_fundamental_incompleto.toFixed(1).replace(".", ",")}%, e "superior
      completo" subiu de ${n["2010"].percentual.superior_completo.toFixed(1).replace(".", ",")}% para
      ${n["2022"].percentual.superior_completo.toFixed(1).replace(".", ",")}%. <strong>Atenção à comparação</strong>:
      2010 mediu pessoas de 10 anos ou mais e 2022 mediu de 18 anos ou mais — bases diferentes, então parte da
      melhora aparente vem de terem saído da conta as crianças, que por idade ainda não concluíram nada.`);
  }

  const ideb = ips && ips.indicadores && ips.indicadores.ind_ideb_ensino_fundamental;
  const items = [];
  if (ideb) items.push({ value: ideb.toFixed(2).replace(".", ","), label: "Ideb do ensino fundamental", note: "Via IPS Brasil 2026 — o Panorama do IBGE não publica Ideb para este município" });
  const enem = ips && ips.indicadores && ips.indicadores.ind_nota_mediana_enem;
  if (enem) items.push({ value: enem.toFixed(0), label: "Nota mediana no ENEM", note: "IPS Brasil 2026" });
  const esc = snapshot && snapshot.indicadores.educacao && snapshot.indicadores.educacao.taxa_escolarizacao_6_a_14_anos;
  if (esc) items.push({ value: esc.valor.toFixed(0) + "%", label: `Escolarização de 6 a 14 anos · ${esc.ano}`, note: "IBGE Cidades" });
  if (items.length) renderStats(root, items);

  note(root, `<strong>O Ideb não sai no lugar de sempre.</strong> Consultamos a API do Panorama do IBGE ano a ano,
    de 2010 a 2026, e não há valor de Ideb publicado para Serra da Saudade — o município tem uma escola só e poucos
    alunos por série, e o INEP não divulga resultado quando a turma é pequena demais para preservar o sigilo dos
    estudantes. O valor acima veio do IPS Brasil 2026, que trabalha o dado do INEP por outro caminho. É a mesma
    lógica de toda esta fase: <strong>o problema aqui não é acesso ao dado, é tamanho da amostra</strong>.`);
}

// ---------------------------------------------------------------------------
// Fase 7 — território.
// ---------------------------------------------------------------------------
function ssTerritorio(root, contorno, setores) {
  const urb = setores.setores.filter(s => s.situacao && s.situacao.toLowerCase().startsWith("urb"));
  const rur = setores.setores.filter(s => !(s.situacao && s.situacao.toLowerCase().startsWith("urb")));
  const popTotal = setores.setores.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaTotal = setores.setores.reduce((a, s) => a + s.area_km2, 0);
  const popUrb = urb.reduce((a, s) => a + (s.populacao || 0), 0);
  const areaUrb = urb.reduce((a, s) => a + s.area_km2, 0);

  renderChoroplethMap(root, {
    boundary: contorno.contorno_lon_lat,
    features: setores.setores,
    valueKey: "densidade_hab_km2",
    valueFormat: (v) => fmtInt.format(Math.round(v)) + " hab./km²",
    legendTitle: "Densidade populacional",
  });

  renderStats(root, [
    { value: String(setores.n_setores), label: "Setores censitários no município inteiro", note: "Itajubá tem 192" },
    { value: areaUrb.toFixed(2).replace(".", ",") + " km²", label: "Área do único setor urbano", note: `${(100 * areaUrb / areaTotal).toFixed(2).replace(".", ",")}% do território` },
    { value: (100 * popUrb / popTotal).toFixed(0) + "%", label: "Da população mora nesse setor", note: `${popUrb} das ${popTotal} pessoas do Censo 2022` },
    { value: fmtInt.format(Math.round(popTotal / areaTotal)) + " hab./km²", label: "Densidade média do município", note: `${areaTotal.toFixed(0)} km² no total` },
  ]);

  note(root, `<strong>A cidade inteira cabe em meio quilômetro quadrado.</strong> Dos ${setores.n_setores} setores
    censitários que cobrem o município, um só é urbano: tem ${areaUrb.toFixed(2).replace(".", ",")} km² —
    ${(100 * areaUrb / areaTotal).toFixed(2).replace(".", ",")}% do território — e concentra
    <strong>${popUrb} das ${popTotal} pessoas</strong>, ou ${(100 * popUrb / popTotal).toFixed(0)}% da população. Os
    outros dois setores são rurais, somam ${(areaTotal - areaUrb).toFixed(0)} km² e abrigam
    ${popTotal - popUrb} moradores, a menos de ${((popTotal - popUrb) / (areaTotal - areaUrb)).toFixed(1).replace(".", ",")} habitante por km².`);

  note(root, `<strong>E aqui é preciso admitir o limite do método.</strong> No piloto de Itajubá este mapa é um mapa
    de calor com 192 setores, e ele revela onde a cidade é densa e onde é vazia. Com <strong>três</strong> unidades
    não há padrão intraurbano a revelar: o mapa mostra a sede e o resto, e é só isso que ele pode mostrar. Não é
    falha de coleta — a geometria é a oficial do IBGE, fecha exatamente com os ${popTotal} habitantes do Censo 2022 e
    com ${areaTotal.toFixed(2).replace(".", ",")} km² — é o município que não tem recorte interno. Registrar isso é
    mais honesto do que espremer conclusão de três polígonos.`);

  note(root, `Também não há camada de bairros: a base do OpenStreetMap, que em Itajubá rendeu 68 localidades
    nomeadas, não tem bairros mapeados aqui. E a área calculada a partir da geometria
    (${areaTotal.toFixed(2).replace(".", ",")} km²) difere um pouco da área oficial publicada pelo IBGE (335,7 km²) —
    diferença de arredondamento entre a malha simplificada e o cálculo oficial, menos de 0,3%.`);

  renderTable(root, {
    caption: "Setores censitários de Serra da Saudade/MG, Censo 2022",
    columns: ["Setor", "Situação", "População", "Domicílios", "Área (km²)", "Densidade (hab./km²)"],
    rows: setores.setores.map(s => [s.setor, s.situacao, fmtInt.format(s.populacao),
      fmtInt.format(s.domicilios), s.area_km2.toFixed(2).replace(".", ","),
      fmtInt.format(Math.round(s.densidade_hab_km2))]),
  });
}

// ---------------------------------------------------------------------------
// Fase 8 — emprego e economia.
// ---------------------------------------------------------------------------
function ssEmprego(root, cempre, pop, desp) {
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
    { value: fmtInt.format(ult.empresas_atuantes), label: `Empresas atuantes · ${ult.ano}`, note: "No município inteiro" },
    { value: fmtInt.format(ult.pessoal_ocupado_assalariado), label: `Pessoal ocupado assalariado · ${ult.ano}` },
    { value: popAno ? (100 * ult.pessoal_ocupado_total / popAno).toFixed(0) + "%" : "—", label: "Do total de habitantes", note: popAno ? `${ult.pessoal_ocupado_total} pessoas de ${fmtInt.format(popAno)}` : "" },
    { value: "R$ " + ult.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), label: `Salário médio mensal (nominal) · ${ult.ano}` },
  ]);

  const dUlt = desp && desp.serie[desp.serie.length - 1];
  const pessoal = dUlt && (dUlt.natureza["Pessoal e encargos"] || 0);
  note(root, `<strong>${ult.empresas_atuantes} empresas. É esse o mercado da cidade.</strong> O emprego formal
    inteiro do município cabe em ${ult.pessoal_ocupado_total} pessoas — e a maior empregadora, dentro dessa conta,
    é a própria prefeitura, que o CEMPRE registra como qualquer outro CNPJ.${pessoal ? ` Compare com a folha do
    orçamento: em ${dUlt.ano} a Prefeitura empenhou ${milhoes(pessoal)} em "pessoal e encargos",
    ${(100 * pessoal / dUlt.total_geral_empenhado).toFixed(0)}% de tudo que gastou.` : ""}`);

  note(root, `A queda de 2019 para 2020 (de ${s.find(p => p.ano === 2019).pessoal_ocupado_total} para
    ${s.find(p => p.ano === 2020).pessoal_ocupado_total} ocupados) coincide com a pandemia, mas não force a
    leitura: numa base de duas centenas de pessoas, <strong>a saída de um único empregador com 30 vagas produz
    exatamente esse degrau</strong>. A série é do CEMPRE, encerrada pelo IBGE em 2021 — não há ano mais recente
    disponível para emprego formal por município nesta base.`);

  renderTable(root, {
    caption: "Empresas e emprego formal em Serra da Saudade/MG, 2006–2021",
    columns: ["Ano", "Empresas atuantes", "Unidades locais", "Pessoal ocupado", "Assalariados", "Salário médio mensal"],
    rows: s.map(p => [String(p.ano), fmtInt.format(p.empresas_atuantes), fmtInt.format(p.unidades_locais),
      fmtInt.format(p.pessoal_ocupado_total), fmtInt.format(p.pessoal_ocupado_assalariado),
      "R$ " + p.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })]),
  });
}

function ssPib(root, pib) {
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
    { value: p(c.administracao_publica), label: "Administração pública — % do valor adicionado · 2021" },
    { value: p(c.agropecuaria), label: "Agropecuária — % do valor adicionado · 2021" },
    { value: p(c.servicos_exceto_adm_publica), label: "Serviços (exceto adm. pública) · 2021" },
    { value: p(c.industria), label: "Indústria · 2021" },
  ]);

  note(root, `<strong>A administração pública é o maior setor da economia — mas por pouco.</strong> Em 2021 ela
    responde por ${p(c.administracao_publica)} do valor adicionado do município, com a
    <strong>agropecuária logo atrás, em ${p(c.agropecuaria)}</strong>. Vale corrigir aqui uma afirmação da versão
    anterior desta página, que dizia que "a administração pública é o principal motor econômico local" como se fosse
    esmagadora: o dado sustenta a liderança, não o domínio. Serra da Saudade é uma cidade de gado e lavoura com uma
    prefeitura grande, não uma cidade só de prefeitura.`);

  note(root, `Valores correntes de cada ano, sem ajuste pela inflação — não leia a variação ano a ano como
    crescimento real (o gráfico 3 da Fase 3 faz essa correção). A composição por setor só existe até 2021 nesta
    tabela do IBGE; 2022 e 2023 têm apenas o PIB total publicado. Os quatro setores acima somam o valor adicionado;
    o PIB total inclui ainda ${fmtMoneyFull(c.impostos_liquidos * 1000)} de impostos líquidos de subsídios.`);

  renderTable(root, {
    caption: "PIB total de Serra da Saudade/MG a preços correntes, 2002–2023",
    columns: ["Ano", "PIB total"],
    rows: pib.pib_total.map(p2 => [String(p2.ano), fmtMoneyFull(p2.valor_mil_reais * 1000)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 9 — síntese.
// ---------------------------------------------------------------------------
function ssSintese(root, d) {
  const items = [];
  if (d.pop) {
    const u = d.pop.serie[d.pop.serie.length - 1];
    items.push({ value: fmtInt.format(u.populacao), label: `População · ${u.ano}`, note: "Estimativa; Censo 2022 contou 833" });
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
  }
  if (d.educ && d.educ.alfabetizacao.serie.length) {
    const u = d.educ.alfabetizacao.serie[d.educ.alfabetizacao.serie.length - 1];
    items.push({ value: u.taxa.toFixed(1).replace(".", ",") + "%", label: `Alfabetização · ${u.ano}` });
  }
  if (d.setores) {
    items.push({ value: String(d.setores.n_setores), label: "Setores censitários no município", note: "Um só é urbano" });
  }
  if (d.cempre) {
    const u = d.cempre.serie[d.cempre.serie.length - 1];
    items.push({ value: fmtInt.format(u.empresas_atuantes), label: `Empresas atuantes · ${u.ano}` });
  }
  if (d.pncp) items.push({ value: fmtInt.format(d.pncp.total_processos), label: `Processos de compra · ${d.pncp.periodo_label}` });
  if (d.pib) {
    const u = d.pib.pib_total[d.pib.pib_total.length - 1];
    items.push({ value: "R$ " + fmtMoneyCompact(u.valor_mil_reais * 1000), label: `PIB total · ${u.ano}` });
  }
  renderStats(root, items);
  note(root, `Cada número vem da fase correspondente acima, com a mesma fonte e as mesmas ressalvas — este painel
    resume, não recalcula nada.`);
}

// ---------------------------------------------------------------------------
// Orquestração: cada fase carrega o seu dado na primeira vez que abre.
// ---------------------------------------------------------------------------
function initSerraCharts() {
  const q = (sel) => document.querySelector(sel);
  const fase = (el) => el && el.closest("details.phase");
  const j = (nome) => SS.get(nome);

  const popRoot = q("#chart-populacao");
  onFirstOpen(fase(popRoot), () => {
    j("populacao_2000_2025.json").then(pop => ssPopulacao(popRoot, pop))
      .catch(() => showError(popRoot));
  });

  const idhmRoot = q("#chart-idhm");
  onFirstOpen(fase(idhmRoot), () => {
    Promise.all([j("idhm_historico_1991_2010.json"), j("ips_brasil_2026.json")])
      .then(([idhm, ips]) => ssIdhm(idhmRoot, idhm, ips))
      .catch(() => showError(idhmRoot));
  });

  const finRoot = q("#chart-financas");
  const realRoot = q("#chart-despesa-real");
  const pibDespRoot = q("#chart-pib-despesa");
  const funcoesRoot = q("#chart-funcoes-tempo");
  const varRoot = q("#chart-despesa-variacao");
  const origemRoot = q("#chart-receita-origem");
  const fpmRoot = q("#chart-fpm");
  onFirstOpen(fase(finRoot), () => {
    j("siconfi_receita_despesa_2014_2025.json")
      .then(fin => ssFinancas(finRoot, fin))
      .catch(() => showError(finRoot));
    Promise.all([j("despesa_funcao_natureza_2014_2025.json"), j("receita_origem_2014_2025.json"),
                 j("pib_municipal_2002_2023.json")])
      .then(([desp, rec, pib]) => {
        if (realRoot) ssDespesaReal(realRoot, desp);
        if (pibDespRoot) ssPibVsDespesa(pibDespRoot, desp, pib);
        if (funcoesRoot) ssFuncoes(funcoesRoot, desp);
        if (varRoot) ssVariacao(varRoot, desp);
        if (origemRoot) ssReceitaOrigem(origemRoot, rec);
        if (fpmRoot) ssFpm(fpmRoot, rec);
      })
      .catch(() => showError(realRoot, pibDespRoot, funcoesRoot, varRoot, origemRoot, fpmRoot));
  });

  const comprasRoot = q("#chart-compras");
  onFirstOpen(fase(comprasRoot), () => {
    j("pncp_serie_2025_2026.json").then(p => ssCompras(comprasRoot, p))
      .catch(() => showError(comprasRoot));
  });

  const saudeRoot = q("#chart-saude");
  onFirstOpen(fase(saudeRoot), () => {
    Promise.all([j("registro_civil_2003_2024.json"), j("ibge_cidades_snapshot_2026.json"),
                 j("cnes_estabelecimentos_2026.json").catch(() => null)])
      .then(([rc, sn, cnes]) => ssSaude(saudeRoot, rc, sn, cnes))
      .catch(() => showError(saudeRoot));
  });

  const educRoot = q("#stats-educacao");
  onFirstOpen(fase(educRoot), () => {
    Promise.all([j("educacao_alfabetizacao_nivel_instrucao.json"),
                 j("ibge_cidades_snapshot_2026.json"), j("ips_brasil_2026.json")])
      .then(([e, sn, ips]) => ssEducacao(educRoot, e, sn, ips))
      .catch(() => showError(educRoot));
  });

  const mapRoot = q("#map-territorio");
  onFirstOpen(fase(mapRoot), () => {
    Promise.all([j("municipio_contorno.json"), j("setores_poligonos_2022.json")])
      .then(([c, s]) => ssTerritorio(mapRoot, c, s))
      .catch(() => showError(mapRoot));
  });

  const empregoRoot = q("#chart-emprego");
  const pibRoot = q("#chart-pib");
  onFirstOpen(fase(empregoRoot || pibRoot), () => {
    Promise.all([j("cempre_empresas_emprego_2006_2021.json"), j("populacao_2000_2025.json"),
                 j("despesa_funcao_natureza_2014_2025.json")])
      .then(([c, p, d]) => { if (empregoRoot) ssEmprego(empregoRoot, c, p, d); })
      .catch(() => showError(empregoRoot));
    j("pib_municipal_2002_2023.json").then(p => { if (pibRoot) ssPib(pibRoot, p); })
      .catch(() => showError(pibRoot));
  });

  const sinteseRoot = q("#painel-sintese");
  const iduRoot = q("#idu-br");
  onFirstOpen(fase(sinteseRoot || iduRoot), () => {
    const opt = (n) => j(n).catch(() => null);
    if (sinteseRoot) {
      Promise.all([opt("populacao_2000_2025.json"), opt("ips_brasil_2026.json"),
                   opt("siconfi_receita_despesa_2014_2025.json"), opt("receita_origem_2014_2025.json"),
                   opt("despesa_funcao_natureza_2014_2025.json"),
                   opt("educacao_alfabetizacao_nivel_instrucao.json"),
                   opt("setores_censitarios_2022.json"), opt("cempre_empresas_emprego_2006_2021.json"),
                   opt("pncp_serie_2025_2026.json"), opt("pib_municipal_2002_2023.json")])
        .then(([pop, ips, fin, rec, desp, educ, setores, cempre, pncp, pib]) =>
          ssSintese(sinteseRoot, { pop, ips, fin, rec, desp, educ, setores, cempre, pncp, pib }))
        .catch(() => showError(sinteseRoot));
    }
    if (iduRoot) {
      opt("idu_br_2026.json").then(idu => { if (idu) buildIduBrSection(iduRoot, idu); else showError(iduRoot); });
    }
  });
}

if (document.body.dataset.piloto === "serra-da-saudade") initSerraCharts();
