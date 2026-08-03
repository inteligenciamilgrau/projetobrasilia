// Projeto Brasil iA — piloto/charts.js
// Gráficos em SVG puro (sem biblioteca externa), com crosshair/tooltip, legenda e tabela alternativa.
// Segue o skill de dataviz do projeto: 1 eixo, cor por papel (série/diverging), marcas finas, hover sempre presente.

const NS = "http://www.w3.org/2000/svg";
const fmtInt = new Intl.NumberFormat("pt-BR");
const fmtMoneyCompact = (v) => {
  const abs = Math.abs(v);
  if (abs >= 1e6) return (v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "M";
  if (abs >= 1e3) return (v / 1e3).toLocaleString("pt-BR", { maximumFractionDigits: 0 }) + "k";
  return fmtInt.format(v);
};
const fmtMoneyFull = (v) => "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

function el(tag, attrs = {}, parent = null) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

function niceMax(v) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  let step;
  if (norm <= 1) step = 1;
  else if (norm <= 2) step = 2;
  else if (norm <= 5) step = 5;
  else step = 10;
  return step * mag;
}

function makeTooltip(wrap) {
  const tip = document.createElement("div");
  tip.className = "viz-tooltip";
  wrap.appendChild(tip);
  return tip;
}

function showTooltip(tip, wrap, xPx, yPx, titleText, rows) {
  tip.textContent = "";
  const title = document.createElement("div");
  title.className = "t-title";
  title.textContent = titleText;
  tip.appendChild(title);
  rows.forEach(r => {
    const row = document.createElement("div");
    row.className = "viz-tooltip-row";
    const key = document.createElement("span");
    key.className = "viz-tooltip-key" + (r.dot ? " dot" : "");
    key.style.background = r.color;
    row.appendChild(key);
    const val = document.createElement("span");
    val.textContent = r.value ? (r.label + ": " + r.value) : r.label;
    row.appendChild(val);
    tip.appendChild(row);
  });
  tip.style.left = xPx + "px";
  tip.style.top = yPx + "px";
  tip.classList.add("show");
}
function hideTooltip(tip) { tip.classList.remove("show"); }

// ---------------------------------------------------------------------------
// Gráfico de linha (1 ou 2 séries), com crosshair + tooltip + rótulo final.
// ---------------------------------------------------------------------------
function renderLineChart(root, { series, xValues, xLabel, yLabel, yFormat, yFormatFull, markCensus, missingLabel }) {
  const W = 760, H = 300, M = { top: 16, right: 18, bottom: 30, left: 54 };
  const innerW = W - M.left - M.right, innerH = H - M.top - M.bottom;

  const allYs = series.flatMap(s => s.points.map(p => p.y).filter(y => y != null));
  const yMax = niceMax(Math.max(...allYs) * 1.08);
  const yMin = Math.min(0, Math.min(...allYs) * (Math.min(...allYs) < 0 ? 1.08 : 0));
  const xN = xValues.length;
  const xScale = (i) => M.left + (innerW * i) / (xN - 1);
  const yScale = (v) => M.top + innerH - (innerH * (v - yMin)) / (yMax - yMin);

  // Índices onde NENHUMA série tem valor — o "buraco" vira marca visível, não
  // um espaço em branco silencioso. O gráfico nunca inventa um valor ali.
  const missingIdx = xValues.map((_, i) => i).filter(i => series.every(s => s.points[i] == null || s.points[i].y == null));
  const missingColorVar = "var(--v-neg)";

  // Legenda: sempre que houver 2+ séries, ou quando há pontos sem dado (o
  // ponto vermelho é uma segunda categoria visual e precisa de identidade
  // própria — nunca só a cor, ver marks-and-anatomy.md).
  if (series.length > 1 || missingIdx.length > 0) {
    const items = series.map(s => ({ label: s.label, color: s.color }));
    if (missingIdx.length > 0) items.push({ label: missingLabel || "Sem dado", color: missingColorVar, dot: true });
    legend(root, items);
  }

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": yLabel }, wrap);

  // gridlines + y ticks (4 steps)
  const ySteps = 4;
  for (let i = 0; i <= ySteps; i++) {
    const v = yMin + ((yMax - yMin) * i) / ySteps;
    const y = yScale(v);
    el("line", { x1: M.left, x2: W - M.right, y1: y, y2: y, class: "viz-gridline" }, svg);
    const t = el("text", { x: M.left - 8, y: y + 3, "text-anchor": "end", class: "viz-axis-text" }, svg);
    t.textContent = yFormat(v);
  }
  // baseline emphasis at 0 if negative values exist
  if (yMin < 0) {
    const y0 = yScale(0);
    el("line", { x1: M.left, x2: W - M.right, y1: y0, y2: y0, class: "viz-gridline", "stroke-width": 1.4 }, svg);
  }

  // x labels (sparse: first, last, and every ~4th)
  xValues.forEach((xv, i) => {
    const showEvery = xN > 16 ? 5 : 2;
    if (i === 0 || i === xN - 1 || i % showEvery === 0) {
      const t = el("text", { x: xScale(i), y: H - M.bottom + 18, "text-anchor": "middle", class: "viz-axis-text" }, svg);
      t.textContent = xv;
    }
  });

  // lines
  series.forEach(s => {
    let d = "";
    let segmentOpen = false;
    s.points.forEach((p, i) => {
      if (p.y == null) { segmentOpen = false; return; }
      const cmd = segmentOpen ? "L" : "M";
      d += `${cmd}${xScale(i).toFixed(1)},${yScale(p.y).toFixed(1)} `;
      segmentOpen = true;
    });
    el("path", { d, fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }, svg);

    // markers: census points (if requested) + first/last real point
    s.points.forEach((p, i) => {
      if (p.y == null) return;
      const isEdge = i === 0 || i === s.points.length - 1 || (i === xN - 1);
      const isCensus = markCensus && p.kind === "censo";
      if (isEdge || isCensus) {
        el("circle", { cx: xScale(i), cy: yScale(p.y), r: isCensus ? 5 : 4, fill: s.color, stroke: "var(--v-surface)", "stroke-width": 2 }, svg);
      }
    });

    // End label — only when there is a single series. With 2+ series the end
    // values often sit close together (see marks-and-anatomy.md: "when
    // end-labels collide, don't stack them") and the legend + tooltip already
    // carry identity and exact value, so multi-series charts skip the text
    // and keep just the end dot.
    if (series.length === 1) {
      const lastIdx = [...s.points].map((p, i) => ({ p, i })).filter(o => o.p.y != null).pop();
      if (lastIdx) {
        const t = el("text", { x: xScale(lastIdx.i) + 8, y: yScale(lastIdx.p.y) + 4, class: "viz-endlabel" }, svg);
        t.textContent = yFormat(lastIdx.p.y);
      }
    }
  });

  // crosshair overlay
  const crosshair = el("line", { x1: 0, x2: 0, y1: M.top, y2: H - M.bottom, stroke: "var(--v-text-secondary)", "stroke-width": 1, opacity: 0 }, svg);
  const overlay = el("rect", { x: M.left, y: M.top, width: innerW, height: innerH, fill: "transparent" }, svg);
  const tip = makeTooltip(wrap);

  function missingRowFor(idx) {
    return [{ label: `${missingLabel || "Sem dado"} publicado para ${xValues[idx]}`, value: "", color: missingColorVar, dot: true }];
  }

  function handleMove(clientX, svgRect) {
    const relX = clientX - svgRect.left;
    const scaleX = svgRect.width / W;
    const dataX = relX / scaleX;
    let idx = Math.round(((dataX - M.left) / innerW) * (xN - 1));
    idx = Math.max(0, Math.min(xN - 1, idx));
    const px = xScale(idx);
    crosshair.setAttribute("x1", px);
    crosshair.setAttribute("x2", px);
    crosshair.setAttribute("opacity", 1);
    const rows = series
      .filter(s => s.points[idx] && s.points[idx].y != null)
      .map(s => ({ label: s.label, value: yFormatFull ? yFormatFull(s.points[idx].y) : yFormat(s.points[idx].y), color: s.color }));
    if (!rows.length) {
      if (missingIdx.includes(idx)) showTooltip(tip, wrap, px * scaleX, yScale(yMin) * scaleX, xValues[idx], missingRowFor(idx));
      else hideTooltip(tip);
      return;
    }
    const anyY = series.find(s => s.points[idx] && s.points[idx].y != null).points[idx].y;
    showTooltip(tip, wrap, px * scaleX, yScale(anyY) * scaleX, xValues[idx], rows);
  }

  overlay.addEventListener("pointermove", (ev) => handleMove(ev.clientX, svg.getBoundingClientRect()));
  overlay.addEventListener("pointerleave", () => { hideTooltip(tip); crosshair.setAttribute("opacity", 0); });

  // Marca persistente do "sem dado": um ponto vermelho na base do eixo — nunca
  // na altura de um valor interpolado, pra não sugerir uma quantidade que não
  // existe — mais um rótulo curto, porque cor sozinha nunca carrega o significado.
  missingIdx.forEach(idx => {
    const x = xScale(idx), y = yScale(yMin);
    const g = el("g", { class: "viz-missing", tabindex: 0, role: "img", "aria-label": `${xValues[idx]}: ${missingLabel || "sem dado publicado"}` }, svg);
    el("line", { x1: x, x2: x, y1: M.top, y2: y - 7, stroke: missingColorVar, "stroke-width": 1, "stroke-dasharray": "2,3", opacity: .45 }, g);
    el("circle", { cx: x, cy: y, r: 5, fill: missingColorVar, stroke: "var(--v-surface)", "stroke-width": 2 }, g);
    const label = el("text", { x, y: y + 17, "text-anchor": "middle", class: "viz-axis-text", fill: missingColorVar, "font-weight": 800 }, g);
    label.textContent = missingLabel || "sem dado";
    const onEnter = () => showTooltip(tip, wrap, x * (svg.getBoundingClientRect().width / W), y * (svg.getBoundingClientRect().width / W), xValues[idx], missingRowFor(idx));
    const onLeave = () => hideTooltip(tip);
    g.addEventListener("pointerenter", onEnter);
    g.addEventListener("focus", onEnter);
    g.addEventListener("pointerleave", onLeave);
    g.addEventListener("blur", onLeave);
  });
}

// ---------------------------------------------------------------------------
// Barras divergentes (saldo positivo/negativo) com tooltip por barra.
// ---------------------------------------------------------------------------
function renderDivergingBars(root, { data, xKey, yKey, yFormat, yFormatFull, posColor, negColor }) {
  const W = 760, H = 260, M = { top: 16, right: 18, bottom: 30, left: 58 };
  const innerW = W - M.left - M.right, innerH = H - M.top - M.bottom;

  const maxAbs = niceMax(Math.max(...data.map(d => Math.abs(d[yKey]))) * 1.15);
  const yScale = (v) => M.top + innerH / 2 - (innerH / 2) * (v / maxAbs);
  const zeroY = yScale(0);
  const n = data.length;
  const bandW = innerW / n;
  const barW = Math.min(28, bandW * 0.55);

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Saldo orçamentário por ano" }, wrap);

  const ySteps = [-maxAbs, -maxAbs / 2, 0, maxAbs / 2, maxAbs];
  ySteps.forEach(v => {
    const y = yScale(v);
    el("line", { x1: M.left, x2: W - M.right, y1: y, y2: y, class: "viz-gridline", "stroke-width": v === 0 ? 1.4 : 1 }, svg);
    const t = el("text", { x: M.left - 8, y: y + 3, "text-anchor": "end", class: "viz-axis-text" }, svg);
    t.textContent = yFormat(v);
  });

  const tip = makeTooltip(wrap);

  data.forEach((d, i) => {
    const cx = M.left + bandW * i + bandW / 2;
    const v = d[yKey];
    const y = yScale(v);
    const top = Math.min(y, zeroY), h = Math.abs(zeroY - y);
    const color = v >= 0 ? posColor : negColor;
    const statusLabel = v >= 0 ? "Superávit" : "Déficit";
    const rect = el("rect", {
      class: "viz-bar", x: cx - barW / 2, y: top, width: barW, height: Math.max(h, 1),
      rx: 4, fill: color, tabindex: 0, role: "img", "aria-label": `${d[xKey]}: ${statusLabel} de ${yFormatFull(Math.abs(v))}`,
    }, svg);

    const t = el("text", { x: cx, y: H - M.bottom + 18, "text-anchor": "middle", class: "viz-axis-text" }, svg);
    t.textContent = d[xKey];

    function onEnter() {
      const svgRect = svg.getBoundingClientRect();
      const scaleX = svgRect.width / W;
      showTooltip(tip, wrap, cx * scaleX, top * scaleX, String(d[xKey]), [
        { label: statusLabel, value: yFormatFull(Math.abs(v)), color },
      ]);
    }
    rect.addEventListener("pointerenter", onEnter);
    rect.addEventListener("focus", onEnter);
    rect.addEventListener("pointerleave", () => hideTooltip(tip));
    rect.addEventListener("blur", () => hideTooltip(tip));
  });
}

// ---------------------------------------------------------------------------
// Estatísticas avulsas (quando o dado é 1-2 pontos, não uma série — "às vezes
// a resposta certa não é um gráfico", ver choosing-a-form.md).
// ---------------------------------------------------------------------------
function renderStats(root, items) {
  const box = document.createElement("div");
  box.className = "viz-stats";
  items.forEach(it => {
    const tile = document.createElement("div");
    tile.className = "viz-stat";
    const strong = document.createElement("strong");
    strong.textContent = it.value;
    tile.appendChild(strong);
    const span = document.createElement("span");
    span.textContent = it.label;
    tile.appendChild(span);
    if (it.note) {
      const small = document.createElement("small");
      small.textContent = it.note;
      tile.appendChild(small);
    }
    box.appendChild(tile);
  });
  root.appendChild(box);
}

// ---------------------------------------------------------------------------
// Tabela alternativa (acessibilidade — sempre reflete os mesmos dados do gráfico)
// ---------------------------------------------------------------------------
function renderTable(root, { caption, columns, rows }) {
  const details = document.createElement("details");
  details.className = "viz-table-toggle";
  const summary = document.createElement("summary");
  summary.textContent = "Ver como tabela";
  details.appendChild(summary);
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const trh = document.createElement("tr");
  columns.forEach(c => { const th = document.createElement("th"); th.textContent = c; trh.appendChild(th); });
  thead.appendChild(trh);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  rows.forEach(r => {
    const tr = document.createElement("tr");
    r.forEach(cell => { const td = document.createElement("td"); td.textContent = cell; tr.appendChild(td); });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  details.appendChild(table);
  root.appendChild(details);
}

function legend(root, items) {
  const box = document.createElement("div");
  box.className = "viz-legend";
  items.forEach(it => {
    const span = document.createElement("span");
    span.className = "viz-legend-item";
    const sw = document.createElement("span");
    sw.className = "viz-legend-swatch" + (it.dot ? " dot" : "");
    sw.style.background = it.color;
    span.appendChild(sw);
    span.appendChild(document.createTextNode(it.label));
    box.appendChild(span);
  });
  root.appendChild(box);
}

// ---------------------------------------------------------------------------
// Monta o gráfico de população dentro de #chart-populacao.
// ---------------------------------------------------------------------------
function buildPopulacaoChart(popRoot, pop) {
      const xValues = pop.serie.map(p => String(p.ano));
      const points = pop.serie.map(p => ({ y: p.populacao, kind: p.fonte }));
      const style = getComputedStyle(popRoot);
      renderLineChart(popRoot, {
        series: [{ key: "pop", label: "População", color: style.getPropertyValue("--v-series-receita").trim() || "#08724e", points }],
        xValues, yLabel: "População residente",
        yFormat: (v) => fmtMoneyCompact(v), yFormatFull: (v) => fmtInt.format(Math.round(v)) + " hab.",
        markCensus: true,
      });
      renderTable(popRoot, {
        caption: "População de Itajubá/MG, 2000–2025",
        columns: ["Ano", "População", "Fonte"],
        rows: pop.serie.map(p => [String(p.ano), p.populacao != null ? fmtInt.format(p.populacao) : "sem dado", p.fonte === "censo" ? "Censo" : p.fonte === "estimativa" ? "Estimativa" : "—"]),
      });
}

// ---------------------------------------------------------------------------
// Monta o gráfico de IDHM histórico + comparação com IPS Brasil dentro de #chart-idhm.
// ---------------------------------------------------------------------------
function buildIdhmChart(root, idhm, ips) {
  const xValues = idhm.serie.map(p => String(p.ano));
  const style = getComputedStyle(root);
  const cEduc = style.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const cLong = style.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cRenda = style.getPropertyValue("--v-series-3").trim() || "#eb6834";

  renderLineChart(root, {
    series: [
      { key: "educ", label: "Educação", color: cEduc, points: idhm.serie.map(p => ({ y: p.educacao })) },
      { key: "long", label: "Longevidade", color: cLong, points: idhm.serie.map(p => ({ y: p.longevidade })) },
      { key: "renda", label: "Renda", color: cRenda, points: idhm.serie.map(p => ({ y: p.renda })) },
    ],
    xValues, yLabel: "IDHM por dimensão",
    yFormat: (v) => v.toFixed(2).replace(".", ","), yFormatFull: (v) => v.toFixed(3).replace(".", ","),
  });
  renderTable(root, {
    caption: "IDHM de Itajubá/MG por dimensão, 1991–2010",
    columns: ["Ano", "IDHM Geral", "Educação", "Longevidade", "Renda"],
    rows: idhm.serie.map(p => [String(p.ano), p.geral.toFixed(3).replace(".", ","), p.educacao.toFixed(3).replace(".", ","), p.longevidade.toFixed(3).replace(".", ","), p.renda.toFixed(3).replace(".", ",")]),
  });

  const ultimoIdhm = idhm.serie[idhm.serie.length - 1];
  renderStats(root, [
    { value: ultimoIdhm.geral.toFixed(3).replace(".", ","), label: `IDHM Geral · Censo ${ultimoIdhm.ano}` },
    { value: ips.indicadores.ips_geral.toFixed(2).replace(".", ","), label: "IPS Brasil · edição 2026", note: "Escala 0–100, não 0–1 — índice diferente, não é continuação do IDHM" },
  ]);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "IDHM e IPS Brasil medem coisas parecidas com metodologias diferentes — não formam uma linha do tempo única. Educação foi a dimensão que mais avançou em Itajubá (0,389 → 0,718); Renda foi a que menos avançou (0,656 → 0,767).";
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta o gráfico de nascimentos/óbitos dentro de #chart-saude.
// ---------------------------------------------------------------------------
function buildSaudeChart(root, registroCivil, snapshot) {
  const xValues = registroCivil.serie.map(p => String(p.ano));
  const style = getComputedStyle(root);
  const cNasc = style.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const cObit = style.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";

  renderLineChart(root, {
    series: [
      { key: "nasc", label: "Nascidos vivos", color: cNasc, points: registroCivil.serie.map(p => ({ y: p.nascidos_vivos })) },
      { key: "obit", label: "Óbitos", color: cObit, points: registroCivil.serie.map(p => ({ y: p.obitos })) },
    ],
    xValues, yLabel: "Registros por ano",
    yFormat: (v) => fmtInt.format(Math.round(v)), yFormatFull: (v) => fmtInt.format(Math.round(v)) + " registros",
  });
  renderTable(root, {
    caption: "Nascidos vivos e óbitos registrados em Itajubá/MG, 2003–2024",
    columns: ["Ano", "Nascidos vivos", "Óbitos"],
    rows: registroCivil.serie.map(p => [String(p.ano), p.nascidos_vivos != null ? fmtInt.format(p.nascidos_vivos) : "sem dado", p.obitos != null ? fmtInt.format(p.obitos) : "sem dado"]),
  });

  const s = snapshot.indicadores.saude;
  renderStats(root, [
    { value: s.mortalidade_infantil.valor.toFixed(2).replace(".", ",").replace(/,00$/, ""), label: `Mortalidade infantil (por mil nasc. vivos) · ${s.mortalidade_infantil.ano}` },
    { value: s.internacoes_por_diarreia_sus.valor.toFixed(1).replace(".", ","), label: `Internações por diarreia (SUS, por 100 mil hab.) · ${s.internacoes_por_diarreia_sus.ano}` },
  ]);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "O pico de óbitos em 2021 (1.101, ante ~800–900 nos anos vizinhos) coincide com a pandemia de Covid-19. Nascimentos caem de forma consistente desde 2015, acompanhando a tendência nacional.";
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta as estatísticas de educação dentro de #stats-educacao (sem gráfico:
// são pontos isolados de um ano cada, não uma série — ver choosing-a-form.md).
// ---------------------------------------------------------------------------
function buildEducacaoStats(root, snapshot) {
  const e = snapshot.indicadores.educacao;
  renderStats(root, [
    { value: e.ideb_anos_iniciais_fundamental_rede_publica.valor.toFixed(1).replace(".", ","), label: `Ideb — anos iniciais (rede pública) · ${e.ideb_anos_iniciais_fundamental_rede_publica.ano}`, note: "Escala 0–10" },
    { value: e.ideb_anos_finais_fundamental_rede_publica.valor.toFixed(1).replace(".", ","), label: `Ideb — anos finais (rede pública) · ${e.ideb_anos_finais_fundamental_rede_publica.ano}`, note: "Escala 0–10" },
    { value: e.taxa_escolarizacao_6_a_14_anos.valor.toFixed(2).replace(".", ",") + "%", label: `Taxa de escolarização, 6–14 anos · ${e.taxa_escolarizacao_6_a_14_anos.ano}` },
  ]);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "Só o retrato mais recente por enquanto — cada indicador tem o próprio ano-base. Série histórica do Ideb (bienal, INEP) e matrículas do Censo Escolar ficam para uma fase futura: exigem baixar e ler as planilhas oficiais do INEP, não têm API simples.";
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta os gráficos de finanças dentro de #chart-financas e #chart-saldo.
// ---------------------------------------------------------------------------
function buildFinancasCharts(finRoot, saldoRoot, fin) {
    if (finRoot) {
      const xValues = fin.serie.map(p => String(p.ano));
      const colorReceita = getComputedStyle(finRoot).getPropertyValue("--v-series-receita").trim() || "#08724e";
      const colorDespesa = getComputedStyle(finRoot).getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
      renderLineChart(finRoot, {
        series: [
          { key: "receita", label: "Receita realizada", color: colorReceita, points: fin.serie.map(p => ({ y: p.receita_realizada })) },
          { key: "despesa", label: "Despesa empenhada", color: colorDespesa, points: fin.serie.map(p => ({ y: p.despesa_empenhada })) },
        ],
        xValues, yLabel: "Receita e despesa (R$)",
        yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
      });
      renderTable(finRoot, {
        caption: "Receita e despesa de Itajubá/MG, 2015–2025",
        columns: ["Ano", "Receita realizada", "Despesa empenhada", "Saldo"],
        rows: fin.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_realizada), fmtMoneyFull(p.despesa_empenhada), fmtMoneyFull(p.saldo)]),
      });
    }

    if (saldoRoot) {
      const posColor = getComputedStyle(saldoRoot).getPropertyValue("--v-pos").trim() || "#2a78d6";
      const negColor = getComputedStyle(saldoRoot).getPropertyValue("--v-neg").trim() || "#e34948";
      legend(saldoRoot, [
        { label: "Superávit", color: posColor },
        { label: "Déficit", color: negColor },
      ]);
      renderDivergingBars(saldoRoot, {
        data: fin.serie.map(p => ({ ano: String(p.ano), saldo: p.saldo })),
        xKey: "ano", yKey: "saldo",
        yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
        posColor, negColor,
      });
      renderTable(saldoRoot, {
        caption: "Saldo orçamentário de Itajubá/MG, 2015–2025",
        columns: ["Ano", "Saldo (receita − despesa)"],
        rows: fin.serie.map(p => [String(p.ano), fmtMoneyFull(p.saldo)]),
      });
    }
}

function showError(...roots) {
  roots.forEach(r => {
    if (r) r.innerHTML = '<p class="viz-note">Não foi possível carregar os dados do gráfico. Abra a página por um servidor HTTP e tente de novo.</p>';
  });
}

// ---------------------------------------------------------------------------
// Cada gráfico só é montado na primeira vez que a <details> da sua Fase abre —
// os dados de fases ainda fechadas não chegam a ser processados no DOM.
// ---------------------------------------------------------------------------
function onFirstOpen(detailsEl, cb) {
  if (!detailsEl) return;
  let done = false;
  detailsEl.addEventListener("toggle", () => {
    if (detailsEl.open && !done) { done = true; cb(); }
  });
}

function initItajubaCharts() {
  const popRoot = document.querySelector("#chart-populacao");
  const finRoot = document.querySelector("#chart-financas");
  const saldoRoot = document.querySelector("#chart-saldo");

  onFirstOpen(popRoot && popRoot.closest("details.phase"), () => {
    fetch("../dados/itajuba/populacao_2000_2025.json").then(r => r.json())
      .then(pop => buildPopulacaoChart(popRoot, pop))
      .catch(() => showError(popRoot));
  });

  const financasDetails = (finRoot || saldoRoot) && (finRoot || saldoRoot).closest("details.phase");
  onFirstOpen(financasDetails, () => {
    fetch("../dados/itajuba/siconfi_receita_despesa_2015_2025.json").then(r => r.json())
      .then(fin => buildFinancasCharts(finRoot, saldoRoot, fin))
      .catch(() => showError(finRoot, saldoRoot));
  });

  const idhmRoot = document.querySelector("#chart-idhm");
  onFirstOpen(idhmRoot && idhmRoot.closest("details.phase"), () => {
    Promise.all([
      fetch("../dados/itajuba/idhm_historico_1991_2010.json").then(r => r.json()),
      fetch("../dados/itajuba/ips_brasil_2026.json").then(r => r.json()),
    ]).then(([idhm, ips]) => buildIdhmChart(idhmRoot, idhm, ips))
      .catch(() => showError(idhmRoot));
  });

  const saudeRoot = document.querySelector("#chart-saude");
  onFirstOpen(saudeRoot && saudeRoot.closest("details.phase"), () => {
    Promise.all([
      fetch("../dados/itajuba/registro_civil_2003_2024.json").then(r => r.json()),
      fetch("../dados/itajuba/ibge_cidades_snapshot_2026.json").then(r => r.json()),
    ]).then(([registroCivil, snapshot]) => buildSaudeChart(saudeRoot, registroCivil, snapshot))
      .catch(() => showError(saudeRoot));
  });

  const educRoot = document.querySelector("#stats-educacao");
  onFirstOpen(educRoot && educRoot.closest("details.phase"), () => {
    fetch("../dados/itajuba/ibge_cidades_snapshot_2026.json").then(r => r.json())
      .then(snapshot => buildEducacaoStats(educRoot, snapshot))
      .catch(() => showError(educRoot));
  });
}

initItajubaCharts();
