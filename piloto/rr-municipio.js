// ===========================================================================
// Páginas municipais de Roraima — Fases 1 (demografia) e 3 (finanças públicas).
//
// UM arquivo para as quinze páginas. Nas cidades do piloto cada uma tem o seu
// (itajuba.js, florianopolis.js…) porque cada uma traz a narrativa daquela
// cidade escrita no meio do código. Aqui é o contrário de propósito: os quinze
// municípios foram coletados pela MESMA passada, das MESMAS fontes, com as
// MESMAS fases — quinze cópias do mesmo desenho divergiriam no primeiro
// conserto. O que muda entre as páginas é o dado, e o dado vem do arquivo.
//
// Qual município montar sai de <body data-municipio="...">, e o guard de
// data-piloto impede que qualquer outra página do projeto dispare estes fetch.
// ===========================================================================

// Os dados de cada município moram em dados/<slug>/, exatamente como os de
// qualquer outra cidade do piloto, e com os mesmos quatro nomes de arquivo. Foi
// o que permitiu pôr estes quinze no comparador sem nenhum caso especial. Antes
// havia um arquivo único por município numa pasta à parte — cômodo aqui e
// inútil no resto do projeto, e os mesmos números em dois lugares divergem.
const RRM = { cache: {} };

RRM.get = function (caminho) {
  if (!this.cache[caminho]) {
    this.cache[caminho] = fetch("../dados/" + caminho).then(r => {
      if (!r.ok) throw new Error(caminho + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[caminho];
};

// A página trabalha com um objeto só, montado dos cinco arquivos. Os
// construtores abaixo continuam recebendo `doc` como antes.
RRM.municipio = function (slug) {
  if (!this.cache["__" + slug]) {
    this.cache["__" + slug] = Promise.all([
      this.get(`${slug}/roraima_contexto.json`),
      this.get(`${slug}/populacao_2000_2025.json`),
      this.get(`${slug}/siconfi_receita_despesa_2014_2025.json`),
      this.get(`${slug}/despesa_funcao_natureza_2014_2025.json`),
      this.get(`${slug}/receita_origem_2014_2025.json`),
    ]).then(([ctx, pop, rd, df, ro]) => ({
      municipio: ctx.municipio.replace("/RR", ""),
      slug, ibge: ctx.ibge_codigo,
      anos_de_referencia: ctx.anos_de_referencia,
      estado: ctx.estado,
      perfil: ctx.perfil,
      posicao_no_estado: ctx.posicao_no_estado,
      pib: ctx.pib,
      populacao: pop,
      // A Fase 3 remonta a série que os quatro arquivos publicam separados —
      // eles são a forma canônica do projeto, não a forma cômoda para esta
      // página, e é essa a troca que valeu a pena.
      financas: {
        anos_nao_declarados: rd.anos_nao_declarados || [],
        serie: rd.serie.map((s, i) => {
          const d = df.serie[i] || {}, o = ro.serie[i] || {};
          return {
            ano: s.ano, declarado: true,
            receita_liquida: s.receita_realizada,
            despesa_empenhada: s.despesa_empenhada,
            saldo: s.saldo,
            saldo_sobre_receita_pct: s.receita_realizada ? 100 * s.saldo / s.receita_realizada : null,
            populacao: d.populacao, ipca_fator_para_2025: d.ipca_fator_para_2025,
            despesa_intraorcamentaria: d.despesa_intraorcamentaria,
            despesa_per_capita_r2025: d.per_capita_r2025,
            funcoes: d.funcoes || {}, natureza: d.natureza || {},
            pessoal_sobre_despesa_pct: d.total_geral_empenhado
              ? Math.round(1000 * (d.natureza["Pessoal e encargos"] || 0) / d.total_geral_empenhado) / 10 : null,
            investimento_sobre_despesa_pct: d.total_geral_empenhado
              ? Math.round(1000 * (d.natureza["Investimentos"] || 0) / d.total_geral_empenhado) / 10 : null,
            receita_bruta: o.receita_bruta, arrecadacao_propria: o.arrecadacao_propria,
            dependencia_transferencias_pct: o.dependencia_transferencias_pct,
            receita_per_capita_r2025: (o.populacao && o.receita_liquida
              ? Math.round(100 * o.receita_liquida * o.ipca_fator_para_2025 / o.populacao) / 100 : null),
            fpm_per_capita_r2025: (o.populacao && o.fpm
              ? Math.round(100 * o.fpm * o.ipca_fator_para_2025 / o.populacao) / 100 : null),
          };
        }),
      },
    }));
  }
  return this.cache["__" + slug];
};

const mNum = (v, d = 1) => (v == null ? "—" : v.toFixed(d).replace(".", ","));
const mPct = (v, d = 1) => mNum(v, d) + "%";
const mInt = (v) => (v == null ? "—" : Math.round(v).toLocaleString("pt-BR"));
const mReais = (v) => (v == null ? "—" : "R$ " + Math.round(v).toLocaleString("pt-BR"));
const mOrdinal = (n) => (n == null ? "—" : n + "º");

// ---------------------------------------------------------------------------
// Cartões do topo
// ---------------------------------------------------------------------------
function mSnapshot(root, doc) {
  const p = doc.perfil, pos = doc.posicao_no_estado;
  const itens = [
    [mInt(p.populacao_2022), "habitantes · Censo IBGE 2022", `${mOrdinal(pos.populacao.posicao)} de ${pos.populacao.de} em Roraima`],
    [mInt(p.area_km2) + " km²", "área territorial", `${mOrdinal(pos.area.posicao)} de ${pos.area.de} · ${mPct(p.pct_da_area_do_estado, 1)} do estado`],
    [mNum(p.densidade_hab_km2, 2), "habitantes por km²", `${mOrdinal(pos.densidade.posicao)} de ${pos.densidade.de}`],
    [mPct(pos.dependencia.valor, 1), `da receita vem de transferência (${doc.anos_de_referencia.financas})`,
     `${mOrdinal(pos.dependencia.posicao)} de ${pos.dependencia.de} em Roraima — 1º é o mais dependente`],
    [doc.ibge, "código IBGE do município", p.mesorregiao],
  ];
  root.innerHTML = "";
  itens.forEach(([v, l, s]) => {
    const d = document.createElement("div");
    d.className = "stat";
    const st = document.createElement("strong"); st.textContent = v;
    const sp = document.createElement("span"); sp.textContent = l;
    d.appendChild(st); d.appendChild(sp);
    if (s) { const sm = document.createElement("small"); sm.textContent = s; d.appendChild(sm); }
    root.appendChild(d);
  });
}

// ---------------------------------------------------------------------------
// A posição na fila dos quinze. É o gráfico que só existe porque o estado
// inteiro foi coletado — e por isso a escala é sempre 1 a 15, nunca o valor.
// ---------------------------------------------------------------------------
const M_INDICADORES = [
  { chave: "populacao", rotulo: "População", fmt: (v) => mInt(v) + " hab." },
  { chave: "area", rotulo: "Área", fmt: (v) => mInt(v) + " km²" },
  { chave: "densidade", rotulo: "Densidade", fmt: (v) => mNum(v, 2) + " hab./km²" },
  { chave: "crescimento", rotulo: "Crescimento 2010–2022", fmt: (v) => mPct(v, 2) + " ao ano" },
  { chave: "indigena", rotulo: "População indígena", fmt: (v) => mPct(v, 1) + " do município" },
  { chave: "pib_pc", rotulo: "PIB por habitante", fmt: (v) => mReais(v) },
  { chave: "adm", rotulo: "Administração pública no PIB", fmt: (v) => mPct(v, 1) + " do valor adicionado" },
  { chave: "receita_pc", rotulo: "Receita por habitante", fmt: (v) => mReais(v) },
  { chave: "despesa_pc", rotulo: "Despesa por habitante", fmt: (v) => mReais(v) },
  { chave: "dependencia", rotulo: "Dependência de transferências", fmt: (v) => mPct(v, 1) + " da receita" },
  { chave: "fpm_pc", rotulo: "FPM por habitante", fmt: (v) => mReais(v) },
  { chave: "pessoal", rotulo: "Pessoal na despesa", fmt: (v) => mPct(v, 1) + " do empenhado" },
  { chave: "investimento", rotulo: "Investimento na despesa", fmt: (v) => mPct(v, 1) + " do empenhado" },
];

function mPosicao(root, doc) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const pos = doc.posicao_no_estado;
  const n = doc.estado.municipios;

  // A barra mede a posição INVERTIDA (15 = 1º lugar), para que barra comprida
  // signifique "está no topo desta fila". Medir a posição crua faria o 1º lugar
  // virar a barra mais curta, e ninguém lê ranking assim.
  const data = M_INDICADORES
    .filter(i => pos[i.chave] && pos[i.chave].posicao != null)
    .map(i => ({
      rotulo: i.rotulo,
      escala: n + 1 - pos[i.chave].posicao,
      posicao: pos[i.chave].posicao,
      valor: i.fmt(pos[i.chave].valor),
    }))
    .sort((a, b) => a.posicao - b.posicao);

  renderBarrasRanking(root, {
    data, labelKey: "rotulo",
    series: [{ chave: "escala", rotulo: "Posição entre os 15", cor }],
    valueFormat: (v) => mOrdinal(n + 1 - v),
    valueFormatFull: (v) => `${mOrdinal(n + 1 - v)} de ${n} municípios de Roraima`,
    ariaLabel: `Posição de ${doc.municipio} entre os 15 municípios de Roraima em cada indicador`,
    notaKey: "valor",
  });

  const topo = data.filter(d => d.posicao <= 3);
  const fundo = data.filter(d => d.posicao >= n - 2);
  // Descritivo, nunca avaliativo. "Está no fim da fila" soa a demérito, e em
  // metade destes indicadores o fim da fila é o bom lugar: ser o 15º em
  // dependência de transferências é ser o município que menos depende delas.
  // A página informa a posição; quem julga se ela é boa é quem lê.
  note(root, `<strong>Cada barra é um lugar numa fila de ${n}, não um valor.</strong> Barra cheia é 1º lugar.
    O valor de verdade aparece no balão, porque misturar treze unidades diferentes (habitantes, km², reais,
    percentuais) no mesmo eixo seria comparar coisas que não se comparam. E <strong>posição alta não quer
    dizer posição boa</strong>: em dependência de transferências, por exemplo, o 1º lugar é o município que
    mais depende.
    ${topo.length ? `<br><br><strong>Maiores valores do estado, em ${escapeHtml(doc.municipio)}:</strong> ${topo.map(d => `${d.rotulo.toLowerCase()} (${mOrdinal(d.posicao)}, ${d.valor})`).join("; ")}.` : ""}
    ${fundo.length ? ` <strong>Menores valores:</strong> ${fundo.map(d => `${d.rotulo.toLowerCase()} (${mOrdinal(d.posicao)}, ${d.valor})`).join("; ")}.` : ""}`);
}

// ---------------------------------------------------------------------------
// Fase 1 — demografia
// ---------------------------------------------------------------------------
function mPopulacao(root, doc) {
  const st = getComputedStyle(root);
  const s = doc.populacao.serie;
  renderLineChart(root, {
    series: [{
      key: "pop", label: "População residente", color: st.getPropertyValue("--v-series-receita").trim() || "#08724e",
      points: s.map(p => ({ y: p.populacao, kind: p.fonte })),
    }],
    xValues: s.map(p => String(p.ano)),
    yLabel: "População residente",
    yFormat: (v) => mInt(v),
    yFormatFull: (v) => mInt(v) + " habitantes",
    markCensus: true,
    missingLabel: "Sem estimativa publicada pelo IBGE",
  });

  const c = s.filter(p => p.fonte === "censo");
  const ult = s[s.length - 1];
  const c22 = c.find(p => p.ano === 2022);
  const antes = s.find(p => p.ano === 2021);
  const erro = c22 && antes ? c22.populacao - antes.populacao : null;

  note(root, `Os marcadores maiores são anos de <strong>Censo</strong> — contagem, não projeção.
    ${c.length >= 2 ? `Entre ${c[0].ano} e ${c[c.length - 1].ano} o município passou de ${mInt(c[0].populacao)}
    para ${mInt(c[c.length - 1].populacao)} habitantes, ${mPct(100 * (c[c.length - 1].populacao / c[0].populacao - 1), 1)}.` : ""}
    ${erro != null ? `<br><br><strong>O degrau em 2022 não é gente chegando ou saindo:</strong> a contagem do Censo veio
    ${mInt(Math.abs(erro))} habitantes ${erro < 0 ? "abaixo" : "acima"} da estimativa de 2021 — é o erro que a
    estimativa acumulou desde 2010 aparecendo de uma vez.` : ""}
    A série não tem 2007 nem 2023: o IBGE não publicou estimativa municipal nesses dois anos.
    O último ponto, ${ult.ano}, é ${ult.fonte === "censo" ? "contagem de Censo" : "estimativa"}: ${mInt(ult.populacao)} habitantes.`);
}

function mDemografia(root, doc) {
  const p = doc.perfil, pos = doc.posicao_no_estado;
  const pib = (doc.pib.serie || []).find(x => x.ano === doc.anos_de_referencia.pib_per_capita) || {};
  renderStats(root, [
    { value: mInt(p.area_km2) + " km²", label: "Área territorial",
      note: `${mPct(p.pct_da_area_do_estado, 1)} de Roraima · ${mOrdinal(pos.area.posicao)} de ${pos.area.de}` },
    { value: mNum(p.densidade_hab_km2, 2), label: "Habitantes por km²",
      note: `O estado inteiro tem ${mNum(doc.estado.populacao_2022 / doc.estado.area_km2, 2)} · ${mOrdinal(pos.densidade.posicao)} de ${pos.densidade.de}` },
    { value: mPct(p.taxa_crescimento_2010_2022_aa_pct, 2), label: "Crescimento ao ano, 2010–2022",
      note: `Taxa geométrica entre os dois Censos · ${mOrdinal(pos.crescimento.posicao)} de ${pos.crescimento.de}` },
    { value: (p.variacao_absoluta_desde_2010 >= 0 ? "+" : "−") + mInt(Math.abs(p.variacao_absoluta_desde_2010)),
      label: "Habitantes a mais que em 2010", note: "Variação absoluta entre os Censos de 2010 e 2022" },
    { value: mPct(p.pct_da_populacao_do_estado, 1), label: "Da população de Roraima",
      note: `${mOrdinal(pos.populacao.posicao)} município mais populoso de ${pos.populacao.de}` },
    { value: mReais(pib.pib_per_capita), label: `PIB por habitante (${doc.anos_de_referencia.pib_per_capita})`,
      note: `Reais correntes · ${mOrdinal(pos.pib_pc.posicao)} de ${pos.pib_pc.de}` },
  ]);
}

function mRaca(root, doc) {
  const st = getComputedStyle(root);
  const c22 = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const c10 = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const cr = doc.perfil.cor_ou_raca;
  const data = Object.keys(cr)
    .map(k => ({ categoria: k, p22: cr[k].pct_2022, p10: cr[k].pct_2010, n22: cr[k]["2022"] }))
    .filter(d => d.p22 != null)
    .sort((a, b) => b.p22 - a.p22);

  renderBarrasRanking(root, {
    data, labelKey: "categoria",
    series: [{ chave: "p22", rotulo: "Censo 2022", cor: c22 }, { chave: "p10", rotulo: "Censo 2010", cor: c10 }],
    valueFormat: (v) => mPct(v, 1), valueFormatFull: (v) => mPct(v, 1) + " da população",
    ariaLabel: `Composição por cor ou raça de ${doc.municipio} nos Censos de 2010 e 2022`,
  });

  const ind = data.find(d => d.categoria === "Indígena");
  const maior = data[0];
  note(root, `Autodeclaração: a pergunta do Censo é sobre como a pessoa se identifica, não sobre registro
    ou território. A categoria mais declarada em ${escapeHtml(doc.municipio)} é <strong>${escapeHtml(maior.categoria.toLowerCase())}</strong>,
    com ${mPct(maior.p22, 1)}.
    ${ind && ind.p22 != null ? `A população indígena é ${mPct(ind.p22, 1)} do município — ${mInt(ind.n22)} pessoas —,
    ${mOrdinal(doc.posicao_no_estado.indigena.posicao)} entre os ${doc.posicao_no_estado.indigena.de} municípios de Roraima.
    ${ind.p10 != null ? `Em 2010 eram ${mPct(ind.p10, 1)}.` : ""}` : ""}
    Parte do movimento entre os dois Censos é demografia e parte é mudança de declaração — o IBGE ampliou
    em 2022 a coleta em terras indígenas.`);
}

// ---------------------------------------------------------------------------
// Fase 3 — finanças públicas
// ---------------------------------------------------------------------------
const mDeclarados = (doc) => (doc.financas.serie || []).filter(s => s.declarado);

// O ANO DA FILA não é o ano do valor, e confundir os dois é fácil.
// As posições entre os 15 são calculadas em 2024, único exercício recente em
// que TODOS os quinze declararam; já o valor mostrado no cartão é o do último
// ano declarado, que para catorze deles é 2025. Um cartão que dissesse
// "48,5% em 2025 · 2º de 15" estaria juntando um número de 2025 com uma posição
// de 2024 sem avisar. Por isso a nota da fila carrega o próprio ano.
const mRef = (doc) => (doc.anos_de_referencia || {}).financas;
const mFila = (doc, p, ano) => (!p || p.posicao == null ? "" :
  `${mOrdinal(p.posicao)} de ${p.de} em Roraima em ${ano}`);

function mFinancas(root, doc) {
  const st = getComputedStyle(root);
  const s = mDeclarados(doc);
  renderReceitaDespesaSaldo(root, {
    serie: s.map(p => ({
      ano: p.ano, receita_realizada: p.receita_liquida,
      despesa_empenhada: p.despesa_empenhada, saldo: p.saldo,
    })),
    cReceita: st.getPropertyValue("--v-series-receita").trim() || "#08724e",
    cDespesa: st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6",
    posColor: st.getPropertyValue("--v-pos").trim() || "#2a78d6",
    negColor: st.getPropertyValue("--v-neg").trim() || "#e34948",
    nomeParaAria: doc.municipio,
  });

  const u = s[s.length - 1];
  const negativos = s.filter(p => p.saldo < 0);
  const faltando = doc.financas.anos_nao_declarados || [];
  note(root, `Receita líquida realizada contra despesa empenhada, em reais correntes de cada ano.
    <strong>Empenhado não é pago</strong> — parte vira restos a pagar do exercício seguinte —, então o saldo aqui
    é orçamentário, não de caixa. Em ${u.ano}, o último exercício declarado, a receita foi ${mReais(u.receita_liquida)}
    e a despesa ${mReais(u.despesa_empenhada)}, ${u.saldo >= 0 ? "sobrando" : "faltando"} ${mReais(Math.abs(u.saldo))}
    — ${mPct(Math.abs(u.saldo_sobre_receita_pct), 1)} da receita.
    ${negativos.length ? `Em ${negativos.length} dos ${s.length} anos da série o município empenhou mais do que arrecadou
    (${negativos.map(p => p.ano).join(", ")}).` : "Em nenhum ano da série o município empenhou mais do que arrecadou."}
    ${faltando.length ? `<br><br><strong>Buracos na série:</strong> ${faltando.map(escapeHtml).join(", ")} não têm declaração no
    SICONFI. Esses anos somem do gráfico como ausência, não como zero — um município que não declarou não é um
    município que gastou R$ 0.` : ""}`);
}

function mDependencia(root, doc) {
  const st = getComputedStyle(root);
  const s = mDeclarados(doc);
  const cT = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cP = st.getPropertyValue("--v-series-receita").trim() || "#08724e";

  renderLineChart(root, {
    series: [
      { key: "dep", label: "Transferências (% da receita bruta)", color: cT,
        points: s.map(p => ({ y: p.dependencia_transferencias_pct })) },
      { key: "prop", label: "Arrecadação própria (% da receita bruta)", color: cP,
        points: s.map(p => ({ y: p.receita_bruta ? Math.round(1000 * p.arrecadacao_propria / p.receita_bruta) / 10 : null })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "% da receita bruta",
    yFormat: (v) => mPct(v, 0), yFormatFull: (v) => mPct(v, 1) + " da receita bruta",
    yMaxCap: 100,
  });

  const u = s[s.length - 1];
  const pos = doc.posicao_no_estado;
  const ref = mRef(doc);
  renderStats(root, [
    { value: mPct(u.dependencia_transferencias_pct, 1), label: `Veio de transferência em ${u.ano}`,
      note: mFila(doc, pos.dependencia, ref) + " — 1º é o mais dependente" },
    { value: mReais(u.fpm_per_capita_r2025), label: `FPM por habitante em ${u.ano}, em R$ de 2025`,
      note: "Fundo de Participação dos Municípios · " + mFila(doc, pos.fpm_pc, ref) },
    { value: mReais(u.receita_per_capita_r2025), label: `Receita por habitante (${u.ano}, R$ de 2025)`,
      note: mFila(doc, pos.receita_pc, ref) },
    { value: mPct(u.receita_bruta ? 100 * u.arrecadacao_propria / u.receita_bruta : null, 1),
      label: `Arrecadado pelo próprio município em ${u.ano}`,
      note: "Impostos, taxas, contribuições, patrimônio e serviços" },
  ]);

  // O extremo do estado vem do arquivo, com o ano dele. Escrito no texto, o
  // número contradiria o cartão acima assim que o município declarasse um ano
  // novo — foi exatamente o que aconteceu aqui: a nota dizia "nenhum abaixo de
  // 75%" (verdade em 2024) enquanto o cartão ao lado mostrava 74,3% em 2025.
  const ex = ((doc.estado.extremos || {}).dependencia) || null;
  const anoEx = (doc.estado.extremos || {}).ano_das_financas;
  note(root, `As duas linhas quase somam 100%: o que falta são operações de crédito e outras receitas de
    capital. <strong>Dependência alta não é má gestão</strong> — é o desenho do federalismo brasileiro, em que a
    União arrecada e repassa. O que a série mostra é se essa proporção muda: em ${escapeHtml(doc.municipio)} ela saiu de
    ${mPct(s[0].dependencia_transferencias_pct, 1)} em ${s[0].ano} para ${mPct(u.dependencia_transferencias_pct, 1)}
    em ${u.ano}.
    ${ex ? `Para efeito de escala, em ${anoEx} — único exercício recente em que os quinze municípios de Roraima
    declararam — a menor dependência do estado era a de ${escapeHtml(ex.minimo_municipio)}, ${mPct(ex.minimo, 1)}, e a maior
    a de ${escapeHtml(ex.maximo_municipio)}, ${mPct(ex.maximo, 1)}.` : ""}
    A comparação completa está na <a href="roraima.html">página do estado</a>.`);
}

function mFuncoes(root, doc) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const s = mDeclarados(doc);
  const u = s[s.length - 1], p0 = s[0];
  const total = Object.values(u.funcoes).reduce((a, b) => a + b, 0);

  const data = Object.entries(u.funcoes)
    .map(([nome, v]) => {
      const antes = (p0.funcoes[nome] || 0) * p0.ipca_fator_para_2025;
      const agora = v * u.ipca_fator_para_2025;
      return {
        funcao: nome, valor: v,
        pct: total ? Math.round(1000 * v / total) / 10 : null,
        // Variação real: os dois anos trazidos para reais de 2025 antes de
        // comparar. Sem isso a inflação de onze anos entraria como "aumento".
        nota: antes > 0
          ? `Em ${p0.ano} eram ${mReais(antes)} em reais de 2025 — variação real de ${(agora >= antes ? "+" : "−")}${mPct(Math.abs(100 * (agora / antes - 1)), 0)}.`
          : `Não havia despesa nesta função em ${p0.ano}.`,
      };
    })
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 12);

  renderBarrasRanking(root, {
    data, labelKey: "funcao",
    series: [{ chave: "valor", rotulo: "Despesa empenhada", cor }],
    valueFormat: (v) => "R$ " + fmtMoneyCompact(v), valueFormatFull: (v) => fmtMoneyFull(v),
    ariaLabel: `Despesa empenhada por função em ${doc.municipio}, ${u.ano}`,
    notaKey: "nota",
  });

  const top3 = data.slice(0, 3);
  note(root, `Despesa empenhada por função em <strong>${u.ano}</strong>, o último exercício declarado
    (${data.length} maiores de ${Object.keys(u.funcoes).length} funções). As três maiores —
    ${top3.map(d => `${escapeHtml(d.funcao)} (${mPct(d.pct, 0)})`).join(", ")} — respondem por
    ${mPct(top3.reduce((a, b) => a + b.pct, 0), 0)} do orçamento.
    O balão de cada barra traz a comparação com ${p0.ano} <em>já corrigida pela inflação</em>: sem isso,
    onze anos de IPCA apareceriam como crescimento do gasto.`);

  renderTable(root, {
    caption: `Despesa empenhada por função em ${doc.municipio}, ${u.ano}`,
    columns: ["Função", "Empenhado", "% do orçamento"],
    rows: Object.entries(u.funcoes).sort((a, b) => b[1] - a[1])
      .map(([n, v]) => [n, fmtMoneyFull(v), mPct(total ? 100 * v / total : null, 1)]),
  });
}

function mNatureza(root, doc) {
  const st = getComputedStyle(root);
  const s = mDeclarados(doc);

  // QUATRO categorias, não seis, e a razão é a paleta. As três naturezas ligadas
  // a dívida e inversões (juros, amortização, inversões financeiras) juntas quase
  // nunca passam de 3% da despesa nestes municípios, e cada uma delas exigiria
  // uma cor categórica distinta — a paleta validada do projeto tem quatro tons.
  // Na primeira versão elas ficaram com cinza de grade e cinza de superfície:
  // "Juros da dívida" saiu praticamente invisível, uma série que o leitor não
  // consegue ver. Somadas num "dívida e inversões" elas cabem no 4º tom validado
  // e continuam declaradas na legenda e no balão.
  const DIVIDA = ["Juros da dívida", "Inversões financeiras", "Amortização da dívida"];
  const CATS = ["Pessoal e encargos", "Outras despesas correntes", "Investimentos", "Dívida e inversões"];
  const cores = {
    "Pessoal e encargos": st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6",
    "Outras despesas correntes": st.getPropertyValue("--v-series-receita").trim() || "#08724e",
    "Investimentos": st.getPropertyValue("--v-series-3").trim() || "#eb6834",
    "Dívida e inversões": st.getPropertyValue("--v-series-4").trim() || "#9c3b96",
  };
  const parcela = (nat, c) => (c === "Dívida e inversões"
    ? DIVIDA.reduce((a, k) => a + (nat[k] || 0), 0) : (nat[c] || 0));
  const usadas = CATS.filter(c => s.some(p => parcela(p.natureza || {}, c) > 0));

  // O empilhado do projeto trabalha em PERCENTUAL da linha, não em reais: a
  // largura do segmento é o próprio número. Empilhar valores absolutos faria
  // cada ano ter um comprimento diferente e a comparação entre anos morreria —
  // que é justamente o que este gráfico existe para permitir.
  renderStackedBars(root, {
    rows: s.map(p => {
      const nat = p.natureza || {};
      const total = usadas.reduce((a, c) => a + parcela(nat, c), 0);
      const values = {};
      usadas.forEach(c => { values[c] = total ? Math.round(1000 * parcela(nat, c) / total) / 10 : 0; });
      return { label: String(p.ano), values };
    }),
    categories: usadas,
    labels: Object.fromEntries(usadas.map(c => [c, c])),
    colors: usadas.map(c => cores[c]),
    valueFormat: (v) => mPct(v, 0),
  });

  const u = s[s.length - 1];
  const pos = doc.posicao_no_estado;
  const ref = mRef(doc);
  renderStats(root, [
    { value: mPct(u.pessoal_sobre_despesa_pct, 1), label: `Pessoal e encargos em ${u.ano}`,
      note: mFila(doc, pos.pessoal, ref) },
    { value: mPct(u.investimento_sobre_despesa_pct, 1), label: `Investimentos em ${u.ano}`,
      note: mFila(doc, pos.investimento, ref) },
    { value: mReais(u.despesa_per_capita_r2025), label: `Despesa por habitante (${u.ano}, R$ de 2025)`,
      note: mFila(doc, pos.despesa_pc, ref) },
    { value: mReais(u.despesa_intraorcamentaria), label: "Despesa intraorçamentária",
      note: "Pagamentos entre órgãos do próprio município, sobretudo a contribuição patronal ao regime próprio" },
  ]);

  note(root, `Base do Anexo I-D do DCA, o <strong>Total Geral da Despesa</strong> — que inclui as
    intraorçamentárias. É por isso que os percentuais desta seção não batem exatamente com os das funções,
    que fecham em "exceto intraorçamentárias": são duas bases diferentes, e forçá-las a uma só exigiria
    inventar a repartição de uma delas. Investimento alto num orçamento pequeno costuma ser <em>uma obra</em>,
    não uma política — vale olhar o ano seguinte antes de concluir tendência.`);
}

// ---------------------------------------------------------------------------
// Navegação para os outros catorze
// ---------------------------------------------------------------------------
function mVizinhos(root, indice, slugAtual) {
  root.innerHTML = "";
  indice.municipios.forEach(m => {
    const atual = m.slug === slugAtual;
    const a = document.createElement("a");
    a.className = "pilot-card";
    a.href = atual ? "#conteudo" : m.pagina;
    if (atual) a.setAttribute("aria-current", "page");
    const st = document.createElement("span");
    st.className = "pilot-status";
    st.textContent = atual ? "Você está aqui" : "Fases 1 e 3";
    const h = document.createElement("h3");
    h.textContent = m.nome + "/RR";
    const p = document.createElement("p");
    p.textContent = `${mInt(m.populacao_2022)} habitantes · ${m.mesorregiao}`;
    a.appendChild(st); a.appendChild(h); a.appendChild(p);
    root.appendChild(a);
  });
}

// ---------------------------------------------------------------------------
// Montagem
// ---------------------------------------------------------------------------
function initRRMunicipio() {
  const sl = document.body.dataset.municipio;
  if (!sl) return;
  const q = (s) => document.querySelector(s);
  const fase = (el) => el && el.closest("details.phase");
  const doc = () => RRM.municipio(sl);

  // Cada gráfico cai sozinho: um erro num deles não pode apagar os outros.
  const desenha = (fn, alvo, ...args) => {
    if (!alvo) return;
    try { fn(alvo, ...args); } catch (e) { console.error((alvo.id || "?") + ":", e); showError(alvo); }
  };

  const snapRoot = q("#snapshot-municipio");
  const posRoot = q("#posicao-estado");
  doc().then(d => {
    if (snapRoot) { try { mSnapshot(snapRoot, d); } catch (e) { console.error("snapshot:", e); } }
    desenha(mPosicao, posRoot, d);
    document.title = `${d.municipio}/RR — demografia e finanças — Projeto Brasil iA`;
  }).catch(() => showError(posRoot));

  const popRoot = q("#chart-populacao");
  const demoRoot = q("#stats-demografia");
  const racaRoot = q("#chart-raca");
  onFirstOpen(fase(popRoot), () => {
    doc().then(d => {
      desenha(mPopulacao, popRoot, d);
      desenha(mDemografia, demoRoot, d);
      desenha(mRaca, racaRoot, d);
    }).catch(() => showError(popRoot, demoRoot, racaRoot));
  });

  const finRoot = q("#chart-financas");
  const depRoot = q("#chart-dependencia");
  const funRoot = q("#chart-funcoes");
  const natRoot = q("#chart-natureza");
  onFirstOpen(fase(finRoot), () => {
    doc().then(d => {
      desenha(mFinancas, finRoot, d);
      desenha(mDependencia, depRoot, d);
      desenha(mFuncoes, funRoot, d);
      desenha(mNatureza, natRoot, d);
    }).catch(() => showError(finRoot, depRoot, funRoot, natRoot));
  });

  const vizRoot = q("#vizinhos");
  if (vizRoot) {
    RRM.get("roraima/municipios_indice.json")
      .then(i => mVizinhos(vizRoot, i, sl)).catch(() => showError(vizRoot));
  }
}

if (document.body.dataset.piloto === "rr-municipio") initRRMunicipio();
