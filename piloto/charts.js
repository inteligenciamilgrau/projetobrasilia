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

// Rampa sequencial (1 hue) do skill de dataviz. Os degraus vivem no CSS
// (--v-seq-1..7) porque claro e escuro usam rampas DIFERENTES, não uma o
// inverso da outra: no claro vai de azul médio a azul escuro; no escuro, de
// azul escuro a azul claro. Ambas validadas em validate_palette.py --ordinal.
const SEQ_FALLBACK = ["#87afe3", "#6499de", "#3f83da", "#246ecd", "#1b5bae", "#14488d", "#0d366b"];
function readSeqRamp(node) {
  const cs = getComputedStyle(node);
  const ramp = [];
  for (let i = 1; i <= 7; i++) {
    const v = cs.getPropertyValue(`--v-seq-${i}`).trim();
    if (v) ramp.push(v);
  }
  return ramp.length >= 2 ? ramp : SEQ_FALLBACK;
}
function seqColor(t, ramp) {
  const steps = ramp || SEQ_FALLBACK;
  const clamped = Math.max(0, Math.min(1, t));
  const pos = clamped * (steps.length - 1);
  const i0 = Math.floor(pos), i1 = Math.min(steps.length - 1, i0 + 1);
  const frac = pos - i0;
  const c0 = hexToRgb(steps[i0]), c1 = hexToRgb(steps[i1]);
  const r = Math.round(c0[0] + (c1[0] - c0[0]) * frac);
  const g = Math.round(c0[1] + (c1[1] - c0[1]) * frac);
  const b = Math.round(c0[2] + (c1[2] - c0[2]) * frac);
  return `rgb(${r},${g},${b})`;
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function niceMax(v) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  // Escada fina de propósito. Com só 1/2/5/10, qualquer valor acima de 5×10^n
  // pulava direto para 10×10^n: a despesa de R$ 522M levava o eixo a R$ 1.000M
  // e metade do cartão ficava em branco, achatando a série que é o dado. Todos
  // os degraus abaixo dividem bem por 4, que é o número de gridlines.
  const escada = [1, 2, 3, 4, 5, 6, 8, 10];
  const step = escada.find(s => norm <= s) || 10;
  return step * mag;
}

function makeTooltip(wrap) {
  const tip = document.createElement("div");
  tip.className = "viz-tooltip";
  wrap.appendChild(tip);
  return tip;
}

// noteHtml (opcional): parágrafo explicativo dentro do próprio tooltip. Quando
// existe, o balão troca de modo — ganha largura fixa e quebra de linha, porque
// o padrão é nowrap (bom para "Receita: R$ 12M", péssimo para uma frase).
function showTooltip(tip, wrap, xPx, yPx, titleText, rows, noteHtml, lado) {
  tip.textContent = "";
  tip.classList.toggle("viz-tooltip--wide", !!noteHtml);
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
  if (noteHtml) {
    const p = document.createElement("p");
    p.className = "viz-tooltip-note";
    p.innerHTML = noteHtml;
    tip.appendChild(p);
  }
  tip.classList.remove("flip-below", "side-left", "side-right");
  tip.style.left = xPx + "px";
  tip.style.top = yPx + "px";
  tip.classList.add("show");

  const tw = tip.offsetWidth, th = tip.offsetHeight;
  const ww = wrap.clientWidth, wh = wrap.clientHeight;

  // Modo LADO: o balão fica ao lado da coluna, nunca por cima dela. É o que
  // permite ler a explicação e continuar vendo o tamanho da barra — se o texto
  // cobrisse a marca, o leitor perderia justamente o que o gráfico mostra.
  if (lado) {
    const dirEsquerda = lado.direita + 14 + tw > ww;
    tip.classList.add(dirEsquerda ? "side-left" : "side-right");
    tip.style.left = (dirEsquerda ? lado.esquerda - 14 : lado.direita + 14) + "px";
    // centraliza na vertical e prende dentro do cartão
    let y = lado.centroY;
    if (y - th / 2 < 4) y = th / 2 + 4;
    if (y + th / 2 > wh - 4) y = wh - 4 - th / 2;
    tip.style.top = y + "px";
    return;
  }

  // Modo padrão (acima do ponto): se não couber em cima, vira para baixo; se
  // encostar nas laterais, desgruda da borda.
  if (yPx - th - 10 < 0) tip.classList.add("flip-below");
  const meio = tw / 2;
  let x = xPx;
  if (x - meio < 4) x = meio + 4;
  if (x + meio > ww - 4) x = ww - 4 - meio;
  tip.style.left = x + "px";
}
function hideTooltip(tip) { tip.classList.remove("show"); }

// ---------------------------------------------------------------------------
// Gráfico de linha (1 ou 2 séries), com crosshair + tooltip + rótulo final.
// ---------------------------------------------------------------------------
function renderLineChart(root, { series, xValues, xLabel, yLabel, yFormat, yFormatFull, markCensus, missingLabel, yMaxCap }) {
  const W = 760, H = 300;
  // margem direita cresce com a largura do rótulo final (só existe p/ série
  // única) — "R$ 4.498M" precisa de bem mais espaço que "97k" ou "23%", senão
  // o texto vaza pra fora do cartão (viewBox tem overflow:visible, mas o
  // container em volta não).
  let endLabelChars = 0;
  if (series.length === 1) {
    const pts = series[0].points.filter(p => p.y != null);
    if (pts.length) endLabelChars = String(yFormat(pts[pts.length - 1].y)).length;
  }
  const M = { top: 16, right: Math.max(18, endLabelChars * 7.2 + 12), bottom: 30, left: 54 };
  const innerW = W - M.left - M.right, innerH = H - M.top - M.bottom;

  const allYs = series.flatMap(s => s.points.map(p => p.y).filter(y => y != null));
  // yMaxCap: teto rígido do domínio (ex.: 100 para série em %) — niceMax() sozinho
  // arredonda 97 para 200 (próximo múltiplo "redondo"), o que sobra metade do
  // gráfico em branco quando o valor real não pode passar de 100.
  const yMax = yMaxCap != null ? Math.min(yMaxCap, niceMax(Math.max(...allYs) * 1.08)) : niceMax(Math.max(...allYs) * 1.08);
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
function renderDivergingBars(root, { data, xKey, yKey, yFormat, yFormatFull, posColor, negColor, notaKey, posWord, negWord }) {
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
    const statusLabel = v >= 0 ? (posWord || "Superávit") : (negWord || "Déficit");
    const nota = notaKey ? d[notaKey] : null;

    el("rect", {
      class: "viz-bar", x: cx - barW / 2, y: top, width: barW, height: Math.max(h, 1),
      rx: 4, fill: color, "pointer-events": "none",
    }, svg);

    const t = el("text", { x: cx, y: H - M.bottom + 18, "text-anchor": "middle", class: "viz-axis-text" }, svg);
    t.textContent = d[xKey];

    // O alvo de hover é a COLUNA inteira, não a barra. Em 2016 e 2024 o saldo é
    // quase zero e a barra tem 3 px de altura — impossível de acertar com o
    // mouse, e é justamente onde a explicação importa ("por que deu zero?").
    const alvo = el("rect", {
      class: "viz-hit", x: M.left + bandW * i, y: M.top, width: bandW, height: innerH,
      fill: "transparent", tabindex: 0, role: "img",
      "aria-label": `${d[xKey]}: ${statusLabel} de ${yFormatFull(Math.abs(v))}${nota ? ". " + nota.replace(/<[^>]+>/g, "") : ""}`,
    }, svg);

    function onEnter() {
      const svgRect = svg.getBoundingClientRect();
      const s = svgRect.width / W;
      // Com explicação, o balão vai para o LADO da coluna; sem ela, continua
      // acima do ponto, que é o comportamento certo para uma etiqueta curta.
      const lado = nota ? {
        esquerda: (M.left + bandW * i) * s,
        direita: (M.left + bandW * (i + 1)) * s,
        centroY: (M.top + innerH / 2) * s,
      } : null;
      showTooltip(tip, wrap, cx * s, top * s, String(d[xKey]),
        [{ label: statusLabel, value: yFormatFull(Math.abs(v)), color }], nota, lado);
    }
    alvo.addEventListener("pointerenter", onEnter);
    alvo.addEventListener("focus", onEnter);
    alvo.addEventListener("pointerleave", () => hideTooltip(tip));
    alvo.addEventListener("blur", () => hideTooltip(tip));
  });
}

// ---------------------------------------------------------------------------
// Barras horizontais (ranking de categorias por magnitude) — 1 hue só: a
// identidade de cada barra já está no rótulo direto, cor não codifica nada
// extra aqui, então não entra legenda (ver color-formula.md).
// ---------------------------------------------------------------------------
function renderBarsHorizontal(root, { data, labelKey, valueKey, valueFormat, valueFormatFull, color, ariaLabelPrefix }) {
  const rowH = 34;
  const M = { top: 8, right: 64, bottom: 8, left: 172 };
  const W = 760;
  const innerW = W - M.left - M.right;
  const H = M.top + M.bottom + data.length * rowH;
  const maxV = niceMax(Math.max(...data.map(d => d[valueKey])) * 1.15);
  const xScale = (v) => (innerW * v) / maxV;

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ariaLabelPrefix || "" }, wrap);

  const tip = makeTooltip(wrap);

  data.forEach((d, i) => {
    const y = M.top + i * rowH;
    const barH = Math.min(20, rowH - 12);
    const barY = y + (rowH - barH) / 2;
    const w = Math.max(2, xScale(d[valueKey]));

    const label = el("text", { x: M.left - 10, y: y + rowH / 2 + 4, "text-anchor": "end", class: "viz-axis-text" }, svg);
    label.textContent = d[labelKey];

    const bar = el("rect", {
      class: "viz-bar", x: M.left, y: barY, width: w, height: barH, rx: 4,
      fill: color, tabindex: 0, role: "img",
      "aria-label": `${d[labelKey]}: ${valueFormatFull(d[valueKey])}`,
    }, svg);

    const valLabel = el("text", { x: M.left + w + 8, y: y + rowH / 2 + 4, class: "viz-axis-text" }, svg);
    valLabel.textContent = valueFormat(d[valueKey]);

    function onEnter() {
      const svgRect = svg.getBoundingClientRect();
      const s = svgRect.width / W;
      showTooltip(tip, wrap, (M.left + w / 2) * s, barY * s, String(d[labelKey]), [
        { label: "Total", value: valueFormatFull(d[valueKey]), color },
      ]);
    }
    bar.addEventListener("pointerenter", onEnter);
    bar.addEventListener("focus", onEnter);
    bar.addEventListener("pointerleave", () => hideTooltip(tip));
    bar.addEventListener("blur", () => hideTooltip(tip));
  });
}

// ---------------------------------------------------------------------------
// COMBINADO receita × despesa × saldo, em dois painéis que dividem o eixo do
// tempo. Substitui dois gráficos separados: eles contavam a mesma história e
// obrigavam o leitor a guardar um na memória para entender o outro.
//
// Por que NÃO é eixo duplo (bar+line sobreposto com duas escalas). O saldo de
// Itajubá vale entre 0,4% e 6,8% da receita. Numa escala própria sobreposta, a
// barra de 2025 (+R$ 36 mi) apareceria com quase a mesma altura da linha de
// receita (R$ 536 mi) — o leitor veria "sobrou quase tudo" onde sobraram 6,7%.
// Dois eixos deixam o autor escolher a conclusão só mexendo nos limites.
//
// A saída: painéis empilhados. O de cima traz receita e despesa na mesma escala
// e PINTA a área entre elas — essa faixa é literalmente o saldo, no tamanho
// real, mostrando de onde ele vem. O de baixo repete o saldo ampliado, para
// conseguir ler anos como 2016 e 2024, que somem na escala do orçamento. Ler
// verticalmente é comparação legítima; sobrepor com duas réguas não é.
// ---------------------------------------------------------------------------
// nomeParaAria: o texto alternativo trazia "de Itajubá" fixo, porque a função
// nasceu naquela página. Ficou parametrizado ao ser reusado nos municípios de
// Roraima — leitor de tela ouvindo o nome da cidade errada é defeito, não detalhe.
function renderReceitaDespesaSaldo(root, { serie, cReceita, cDespesa, posColor, negColor, notas, nomeParaAria }) {
  const W = 760;
  const M = { top: 20, right: 18, bottom: 28, left: 60 };
  const topH = 226, gap = 34, botH = 104;
  const H = M.top + topH + gap + botH + M.bottom;
  const innerW = W - M.left - M.right;
  const n = serie.length;

  const maxFluxo = niceMax(Math.max(...serie.map(p => Math.max(p.receita_realizada, p.despesa_empenhada))) * 1.06);
  const maxSaldo = niceMax(Math.max(...serie.map(p => Math.abs(p.saldo))) * 1.25);

  const x = (i) => M.left + (innerW * i) / (n - 1);
  const yT = (v) => M.top + topH - (topH * v) / maxFluxo;
  const yBzero = M.top + topH + gap + botH / 2;
  const yB = (v) => yBzero - (botH / 2) * (v / maxSaldo);

  // Legenda de reserva. Este gráfico não desenhava legenda nenhuma: as duas
  // linhas eram distinguidas só pela cor e o nome de cada uma só aparecia no
  // balão do hover — quem não usa mouse, quem imprime e quem não distingue as
  // duas cores ficava sem saber qual linha é a receita.
  //
  // Só que TRÊS das quatro páginas de cidade já montavam a sua própria legenda
  // antes de chamar aqui, com quatro itens (as duas linhas mais "sobrou" e
  // "faltou"). Uma legenda incondicional virou a segunda legenda delas. Daí a
  // guarda: se o contêiner já tem uma, ela manda — é mais completa que esta.
  // Florianópolis e as páginas municipais de Roraima, que não montavam nenhuma,
  // passam a ter.
  if (!root.querySelector(":scope > .viz-legend")) {
    legend(root, [
      { label: "Receita líquida realizada", color: cReceita },
      { label: "Despesa empenhada", color: cDespesa },
    ]);
  }

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", {
    class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img",
    "aria-label": `Receita, despesa e saldo orçamentário de ${nomeParaAria || "Itajubá"} ano a ano`,
  }, wrap);

  // --- grade do painel de cima ---
  for (let i = 0; i <= 4; i++) {
    const v = (maxFluxo * i) / 4, y = yT(v);
    el("line", { x1: M.left, x2: W - M.right, y1: y, y2: y, class: "viz-gridline" }, svg);
    const t = el("text", { x: M.left - 8, y: y + 3, "text-anchor": "end", class: "viz-axis-text" }, svg);
    t.textContent = "R$ " + fmtMoneyCompact(v);
  }
  // --- grade do painel de baixo ---
  [maxSaldo, 0, -maxSaldo].forEach(v => {
    const y = yB(v);
    el("line", { x1: M.left, x2: W - M.right, y1: y, y2: y, class: "viz-gridline", "stroke-width": v === 0 ? 1.4 : 1 }, svg);
    const t = el("text", { x: M.left - 8, y: y + 3, "text-anchor": "end", class: "viz-axis-text" }, svg);
    t.textContent = (v > 0 ? "+" : v < 0 ? "−" : "") + "R$ " + fmtMoneyCompact(Math.abs(v));
  });

  // rótulos dos painéis
  const rot1 = el("text", { x: M.left, y: M.top - 7, class: "viz-panel-label" }, svg);
  rot1.textContent = "Receita e despesa no ano";
  const rot2 = el("text", { x: M.left, y: M.top + topH + gap - 9, class: "viz-panel-label" }, svg);
  rot2.textContent = "Sobrou ou faltou · régua ampliada";

  // --- faixa entre as linhas = o saldo, no tamanho real ---
  // Quando as linhas se cruzam dentro de um intervalo, o polígono é cortado no
  // ponto exato do cruzamento; senão a cor invadiria o ano vizinho.
  for (let i = 0; i < n - 1; i++) {
    const r0 = serie[i].receita_realizada, d0 = serie[i].despesa_empenhada;
    const r1 = serie[i + 1].receita_realizada, d1 = serie[i + 1].despesa_empenhada;
    const s0 = r0 - d0, s1 = r1 - d1;
    const x0 = x(i), x1 = x(i + 1);
    const poli = (pts, positivo) => el("polygon", {
      points: pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "),
      fill: positivo ? posColor : negColor, "fill-opacity": .17, stroke: "none", "pointer-events": "none",
    }, svg);
    if (s0 === 0 || s1 === 0 || (s0 > 0) === (s1 > 0)) {
      poli([[x0, yT(r0)], [x1, yT(r1)], [x1, yT(d1)], [x0, yT(d0)]], s0 + s1 >= 0);
    } else {
      const t = s0 / (s0 - s1);
      const xc = x0 + t * (x1 - x0);
      const yc = yT(r0 + t * (r1 - r0));
      poli([[x0, yT(r0)], [xc, yc], [x0, yT(d0)]], s0 > 0);
      poli([[xc, yc], [x1, yT(r1)], [x1, yT(d1)]], s1 > 0);
    }
  }

  // --- linhas ---
  const linha = (chave, cor) => {
    const d = serie.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${yT(p[chave]).toFixed(1)}`).join("");
    el("path", { d, fill: "none", stroke: cor, "stroke-width": 2, "stroke-linejoin": "round", "pointer-events": "none" }, svg);
  };
  linha("receita_realizada", cReceita);
  linha("despesa_empenhada", cDespesa);

  // --- barras do saldo ---
  const bandW = innerW / n;
  const barW = Math.min(26, bandW * 0.5);
  serie.forEach((p, i) => {
    const y = yB(p.saldo), top = Math.min(y, yBzero);
    el("rect", {
      class: "viz-bar", x: x(i) - barW / 2, y: top, width: barW,
      height: Math.max(Math.abs(yBzero - y), 1.5), rx: 3,
      fill: p.saldo >= 0 ? posColor : negColor, "pointer-events": "none",
    }, svg);
    const t = el("text", { x: x(i), y: H - M.bottom + 16, "text-anchor": "middle", class: "viz-axis-text" }, svg);
    t.textContent = String(p.ano);
  });

  // --- camada de leitura: uma faixa por ano, cobrindo OS DOIS painéis ---
  const tip = makeTooltip(wrap);
  const guia = el("line", {
    x1: 0, x2: 0, y1: M.top, y2: M.top + topH + gap + botH,
    class: "viz-guia", "pointer-events": "none", opacity: 0,
  }, svg);

  serie.forEach((p, i) => {
    const cx = x(i);
    const esq = M.left + Math.max(0, (innerW * (i - 0.5)) / (n - 1));
    const dir = M.left + Math.min(innerW, (innerW * (i + 0.5)) / (n - 1));
    const nota = notas ? notas[p.ano] : null;
    const alvo = el("rect", {
      class: "viz-hit", x: esq, y: M.top, width: dir - esq, height: topH + gap + botH,
      fill: "transparent", tabindex: 0, role: "img",
      "aria-label": `${p.ano}: receita ${fmtMoneyFull(p.receita_realizada)}, despesa ${fmtMoneyFull(p.despesa_empenhada)}, ` +
        `${p.saldo >= 0 ? "superávit" : "déficit"} de ${fmtMoneyFull(Math.abs(p.saldo))}` +
        (nota ? ". " + nota.replace(/<[^>]+>/g, "") : ""),
    }, svg);

    function onEnter() {
      guia.setAttribute("x1", cx); guia.setAttribute("x2", cx); guia.setAttribute("opacity", 1);
      const s = svg.getBoundingClientRect().width / W;
      showTooltip(tip, wrap, cx * s, yT(p.receita_realizada) * s, String(p.ano), [
        { label: "Receita realizada", value: fmtMoneyFull(p.receita_realizada), color: cReceita },
        { label: "Despesa empenhada", value: fmtMoneyFull(p.despesa_empenhada), color: cDespesa },
        { label: p.saldo >= 0 ? "Sobrou" : "Faltou", value: fmtMoneyFull(Math.abs(p.saldo)), color: p.saldo >= 0 ? posColor : negColor },
      ], nota, { esquerda: esq * s, direita: dir * s, centroY: (M.top + (topH + gap + botH) / 2) * s });
    }
    function onLeave() { guia.setAttribute("opacity", 0); hideTooltip(tip); }
    alvo.addEventListener("pointerenter", onEnter);
    alvo.addEventListener("focus", onEnter);
    alvo.addEventListener("pointerleave", onLeave);
    alvo.addEventListener("blur", onLeave);
  });
}

// ---------------------------------------------------------------------------
// Barras horizontais DIVERGENTES (variação com sinal por categoria). Diferente
// de renderDivergingBars, que é vertical e serve para uma série temporal curta:
// aqui as categorias são muitas (uma por função de governo) e os rótulos são
// longos, então o eixo tem que ser o horizontal — nome à esquerda, barra saindo
// de um zero central para a direita (cresceu) ou para a esquerda (encolheu).
// Duas cores + zero neutro é a regra de paleta divergente (color-formula.md).
// ---------------------------------------------------------------------------
function renderBarsHorizontalDiverging(root, { data, labelKey, valueKey, valueFormat, valueFormatFull, posColor, negColor, posWord, negWord, ariaLabelPrefix }) {
  const rowH = 30;
  const M = { top: 22, right: 16, bottom: 8, left: 168 };
  const W = 760;
  const innerW = W - M.left - M.right;
  const H = M.top + M.bottom + data.length * rowH;
  const vs = data.map(d => d[valueKey]);
  const posMax = Math.max(0, ...vs);
  const negMax = Math.max(0, ...vs.map(v => -v));

  // O zero NÃO fica no centro. Centrá-lo desperdiçaria metade da largura sempre
  // que um dos lados for muito menor que o outro — que é o caso aqui: a maior
  // queda é 26× menor que a maior alta. A fração de largura dada ao lado
  // negativo acompanha o dado, com piso para caber o rótulo do valor.
  // O que NÃO muda é a escala: px por real é único para os dois lados, senão
  // uma queda pequena apareceria do mesmo tamanho de uma alta grande.
  const fracNeg = negMax > 0
    ? Math.min(0.5, Math.max(0.17, negMax / (posMax + negMax)))
    : 0.04;
  const negW = innerW * fracNeg;
  const posW = innerW - negW;
  const zeroX = M.left + negW;
  const unit = Math.min(
    negMax > 0 ? (negW * 0.80) / negMax : Infinity,
    posMax > 0 ? (posW * 0.86) / posMax : Infinity,
  );
  const xScale = (v) => v * unit;

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ariaLabelPrefix || "" }, wrap);

  // Só a linha do zero. Não há régua de valores porque cada barra já carrega o
  // número impresso ao lado — gridlines aqui seriam redundância competindo com
  // o dado (marks-and-anatomy.md: rótulo direto dispensa eixo).
  el("line", { x1: zeroX, x2: zeroX, y1: M.top - 6, y2: H - M.bottom, class: "viz-gridline", "stroke-width": 1.4 }, svg);
  const t0 = el("text", { x: zeroX, y: M.top - 11, "text-anchor": "middle", class: "viz-axis-text" }, svg);
  t0.textContent = "0";

  const tip = makeTooltip(wrap);

  data.forEach((d, i) => {
    const y = M.top + i * rowH;
    const barH = Math.min(18, rowH - 12);
    const barY = y + (rowH - barH) / 2;
    const v = d[valueKey];
    const w = Math.max(2, Math.abs(xScale(v)));
    const x = v >= 0 ? zeroX : zeroX - w;
    const color = v >= 0 ? posColor : negColor;
    const palavra = v >= 0 ? posWord : negWord;

    const label = el("text", { x: M.left - 12, y: y + rowH / 2 + 4, "text-anchor": "end", class: "viz-axis-text" }, svg);
    label.textContent = d[labelKey];

    const bar = el("rect", {
      class: "viz-bar", x, y: barY, width: w, height: barH, rx: 4,
      fill: color, tabindex: 0, role: "img",
      "aria-label": `${d[labelKey]}: ${palavra} ${valueFormatFull(Math.abs(v))}`,
    }, svg);

    // rótulo direto do valor, do lado de fora da barra
    const vx = v >= 0 ? x + w + 7 : x - 7;
    const valLabel = el("text", { x: vx, y: y + rowH / 2 + 4, "text-anchor": v >= 0 ? "start" : "end", class: "viz-axis-text" }, svg);
    valLabel.textContent = (v >= 0 ? "+" : "−") + valueFormat(Math.abs(v));

    function onEnter() {
      const svgRect = svg.getBoundingClientRect();
      const s = svgRect.width / W;
      showTooltip(tip, wrap, (x + w / 2) * s, barY * s, String(d[labelKey]),
        [{ label: palavra, value: valueFormatFull(Math.abs(v)), color }]
          .concat(d.detalhe ? [{ label: "Variação", value: d.detalhe, color }] : []));
    }
    bar.addEventListener("pointerenter", onEnter);
    bar.addEventListener("focus", onEnter);
    bar.addEventListener("pointerleave", () => hideTooltip(tip));
    bar.addEventListener("blur", () => hideTooltip(tip));
  });
}

// ---------------------------------------------------------------------------
// Barras 100% empilhadas (composição por período) — categorias ORDINAIS
// (baixo→alto nível de instrução), por isso 1 hue só em degradê, não cores
// categóricas distintas (ver color-formula.md: ordinal = 1 hue, L monótono).
// ---------------------------------------------------------------------------
function renderStackedBars(root, { rows, categories, labels, colors, valueFormat }) {
  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);

  legend(root, categories.map((c, i) => ({ label: labels[c], color: colors[i] })));

  const bars = document.createElement("div");
  bars.className = "viz-stackbars";
  wrap.appendChild(bars);
  const tip = makeTooltip(wrap);

  rows.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "viz-stackbar-row";
    const rowLabel = document.createElement("span");
    rowLabel.className = "row-label";
    rowLabel.textContent = row.label;
    rowEl.appendChild(rowLabel);
    const track = document.createElement("div");
    track.className = "viz-stackbar-track";
    categories.forEach((cat, i) => {
      const pct = row.values[cat];
      const seg = document.createElement("div");
      seg.className = "viz-stackbar-seg";
      seg.style.width = pct + "%";
      seg.style.background = colors[i];
      seg.tabIndex = 0;
      seg.setAttribute("role", "img");
      seg.setAttribute("aria-label", `${row.label} — ${labels[cat]}: ${valueFormat(pct)}`);
      if (pct >= 9) {
        const span = document.createElement("span");
        span.textContent = valueFormat(pct);
        seg.appendChild(span);
      }
      const onEnter = () => {
        const segRect = seg.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        showTooltip(tip, wrap, segRect.left - wrapRect.left + segRect.width / 2, segRect.top - wrapRect.top, row.label, [
          { label: labels[cat], value: valueFormat(pct), color: colors[i] },
        ]);
      };
      seg.addEventListener("pointerenter", onEnter);
      seg.addEventListener("focus", onEnter);
      seg.addEventListener("pointerleave", () => hideTooltip(tip));
      seg.addEventListener("blur", () => hideTooltip(tip));
      track.appendChild(seg);
    });
    rowEl.appendChild(track);
    bars.appendChild(rowEl);
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
// Coroplético: cada setor censitário desenhado com o POLÍGONO real do IBGE,
// preenchido por densidade (rampa sequencial). Projeção equirretangular com
// correção de cosseno da latitude — 1 município é área pequena demais pra
// justificar projeção cartográfica completa.
//
// A versão anterior desenhava um ponto no centroide de cada setor. Era errado:
// um setor rural de 23 km² virava a mesma bolinha que um setor urbano de
// 0,016 km², então 85% do território (a zona rural) aparecia como espaço vazio
// e o mapa não parecia a cidade. Área é a variável visual que o olho lê num
// mapa — ela tem que vir da geometria, não de um marcador de tamanho fixo.
// ---------------------------------------------------------------------------
function renderChoroplethMap(root, { boundary, features, valueKey, valueFormat, legendTitle, labelPoints, annotations }) {
  const W = 720, H = 640, M = 18;
  const lats = boundary.map(p => p[1]);
  const lons = boundary.map(p => p[0]);
  const latMin = Math.min(...lats), latMax = Math.max(...lats);
  const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
  const cosLat = Math.cos(((latMin + latMax) / 2) * Math.PI / 180);

  const spanX = (lonMax - lonMin) * cosLat;
  const spanY = latMax - latMin;
  const scale = Math.min((W - 2 * M) / spanX, (H - 2 * M - 34) / spanY);
  const offX = M + ((W - 2 * M) - spanX * scale) / 2;
  const offY = M + ((H - 2 * M - 34) - spanY * scale) / 2;

  const px = (lon) => offX + (lon - lonMin) * cosLat * scale;
  const py = (lat) => offY + (latMax - lat) * scale;
  const ringD = (ring) => "M" + ring.map(([lon, lat]) => `${px(lon).toFixed(1)},${py(lat).toFixed(1)}`).join("L") + "Z";

  const cs = getComputedStyle(root);
  const corAnot = cs.getPropertyValue("--v-series-3").trim() || "#eb6834";
  legend(root, [
    { label: "Limite do município (IBGE)", color: cs.getPropertyValue("--v-text-primary").trim() || "#10241d" },
    ...(annotations || []).map(a => ({ label: a.label, color: corAnot, dashed: true })),
    ...(labelPoints && labelPoints.length ? [{ label: "Bairro (OpenStreetMap)", color: cs.getPropertyValue("--v-text-secondary").trim() || "#52635d", dot: true }] : []),
  ]);

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap viz-map-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": legendTitle }, wrap);

  const ramp = readSeqRamp(root);
  const values = features.map(f => f[valueKey]).filter(v => v != null);
  const vMin = Math.min(...values), vMax = Math.max(...values);
  // Teto de cor no percentil 97: uns poucos setores urbanos de área minúscula
  // (1-2 quadras) têm densidade extrapolada muito acima do resto e, sem o teto,
  // esticam a rampa e achatam a cor de todos os outros. Eles continuam no mapa,
  // só saturam na cor mais escura em vez de ganharem uma faixa exclusiva.
  const sorted = values.slice().sort((a, b) => a - b);
  const quantil = (p) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.ceil(p * sorted.length) - 1))];
  const vCap = quantil(0.97);
  const clipped = vMax > vCap;
  const colorMax = clipped ? vCap : vMax;

  // ESCALA ADAPTATIVA. O teto no p97 resolve o caso de Itajubá (192 setores,
  // distribuição razoavelmente espalhada), mas não resolve o de uma capital:
  // em Florianópolis a mediana é 4,8 mil hab./km² contra um p97 de 35 mil, e
  // numa rampa linear metade dos setores cai nos primeiros 14% da cor — o mapa
  // sai todo do mesmo azul claro e não mostra padrão nenhum. Quando a mediana
  // não alcança 30% da rampa linear, a cor passa a seguir a POSIÇÃO do setor na
  // distribuição, não o valor absoluto. Aí a rampa inteira é usada e o padrão
  // intraurbano aparece. A legenda muda junto e diz qual das duas está no ar —
  // sem isso o leitor compararia magnitudes que a cor deixou de representar.
  const mediana = quantil(0.5);
  const tMedianaLinear = colorMax > vMin ? (mediana - vMin) / (colorMax - vMin) : 0.5;
  const porQuantil = values.length >= 50 && tMedianaLinear < 0.30;

  const posto = new Map();
  sorted.forEach((v, i) => { if (!posto.has(v)) posto.set(v, i); });
  const nMenos1 = Math.max(1, sorted.length - 1);
  const tDe = (v) => {
    if (v == null) return 0;
    if (porQuantil) return (posto.get(v) || 0) / nMenos1;
    return Math.max(0, Math.min(1, colorMax > vMin ? (v - vMin) / (colorMax - vMin) : 0.5));
  };

  const tip = makeTooltip(wrap);

  // Setores: polígono real, com 0,6px de traço na cor da superfície separando
  // vizinhos (o "gap de 2px entre preenchimentos" do skill, na escala do mapa).
  const gSetores = el("g", {}, svg);
  features.forEach(f => {
    const t = tDe(f[valueKey]);
    const color = seqColor(t, ramp);
    const d = f.aneis.map(ringD).join(" ");
    const isOutlier = !porQuantil && clipped && f[valueKey] > vCap;
    const area = f.area_km2 < 0.1 ? f.area_km2.toFixed(3) : f.area_km2.toFixed(2);
    const path = el("path", {
      d, fill: color, stroke: "var(--v-surface)", "stroke-width": 0.6, "fill-rule": "evenodd",
      tabindex: 0, role: "img", class: "viz-map-setor",
      "aria-label": `Setor ${f.setor}, ${f.situacao}: ${valueFormat(f[valueKey])}, ${f.populacao} habitantes em ${area} km²`,
    }, gSetores);
    const onEnter = (ev) => {
      const r = svg.getBoundingClientRect();
      const s = r.width / W;
      // âncora no ponteiro quando houver (polígonos são irregulares, o centro
      // do bounding box cai fora da forma com frequência)
      let ax, ay;
      if (ev && ev.clientX != null) { ax = ev.clientX - r.left; ay = ev.clientY - r.top; }
      else { const b = path.getBBox(); ax = (b.x + b.width / 2) * s; ay = (b.y + b.height / 2) * s; }
      showTooltip(tip, wrap, ax, ay, `Setor ${f.setor.slice(-6)} · ${f.situacao}`, [
        { label: legendTitle, value: valueFormat(f[valueKey]) + (isOutlier ? " (satura a escala)" : ""), color, dot: true },
        { label: "Área", value: area.replace(".", ",") + " km²", color: "transparent" },
        { label: "População", value: fmtInt.format(f.populacao) + " hab.", color: "transparent" },
        { label: "Domicílios", value: fmtInt.format(f.domicilios), color: "transparent" },
      ]);
    };
    path.addEventListener("pointerenter", onEnter);
    path.addEventListener("pointermove", onEnter);
    path.addEventListener("focus", onEnter);
    path.addEventListener("pointerleave", () => hideTooltip(tip));
    path.addEventListener("blur", () => hideTooltip(tip));
  });

  // Contorno do município por cima, sem preenchimento (só delimita).
  el("path", {
    d: ringD(boundary), fill: "none", stroke: "var(--v-text-primary)",
    "stroke-width": 1.6, "stroke-linejoin": "round", "pointer-events": "none",
  }, svg);

  // Anotações (ex.: perímetro de zoneamento): tracejado numa cor fora da rampa,
  // para ler como camada de referência e não como mais um valor de densidade.
  (annotations || []).forEach(a => {
    a.aneis.forEach((anel, i) => {
      el("path", {
        d: ringD(anel), fill: "none", stroke: corAnot, "stroke-width": 2,
        "stroke-dasharray": "7 4", "stroke-linejoin": "round", "pointer-events": "none",
      }, svg);
      // Rótulo do núcleo: sem ele, um anel pequeno e isolado no meio da zona
      // rural parece sujeira de processamento em vez de a vila que ele é.
      const meta = (a.info || [])[i];
      if (meta && meta.nome) {
        const x = px(meta.rotulo_lon), y = py(meta.rotulo_lat);
        const pequeno = meta.area_km2 < 5;
        const ty = pequeno ? y - 10 : y;
        const t = el("text", {
          x, y: ty, "text-anchor": "middle", "pointer-events": "none",
          class: "viz-map-anot-label", stroke: "var(--v-surface)", "stroke-width": 3,
          "paint-order": "stroke", fill: corAnot,
        }, svg);
        t.textContent = meta.nome;
        if (pequeno) {
          const sub = el("text", {
            x, y: ty + 11, "text-anchor": "middle", "pointer-events": "none",
            class: "viz-map-anot-sub", stroke: "var(--v-surface)", "stroke-width": 3,
            "paint-order": "stroke", fill: "var(--v-text-secondary)",
          }, svg);
          sub.textContent = `${meta.papel} · ${fmtInt.format(meta.populacao)} hab.`;
        }
      }
    });
  });

  // Camada de referência: bairros do OSM. Rótulo só no hover — ~40 nomes
  // concentrados no centro urbano colidem demais como texto fixo.
  if (labelPoints && labelPoints.length) {
    labelPoints.forEach(b => {
      const x = px(b.lon), y = py(b.lat);
      const mark = el("rect", {
        x: x - 2.1, y: y - 2.1, width: 4.2, height: 4.2, transform: `rotate(45 ${x} ${y})`,
        fill: "var(--v-surface)", stroke: "var(--v-text-primary)", "stroke-width": 1,
        tabindex: 0, role: "img", "aria-label": `Bairro ${b.nome}`, class: "viz-map-bairro-mark",
      }, svg);
      const onEnter = () => {
        const s = svg.getBoundingClientRect().width / W;
        showTooltip(tip, wrap, x * s, y * s, "Bairro (OpenStreetMap)", [{ label: b.nome, value: "", color: "var(--v-text-secondary)", dot: true }]);
      };
      mark.addEventListener("pointerenter", onEnter);
      mark.addEventListener("focus", onEnter);
      mark.addEventListener("pointerleave", () => hideTooltip(tip));
      mark.addEventListener("blur", () => hideTooltip(tip));
    });
  }

  // legenda de gradiente (rampa contínua, não degraus categóricos)
  const gradId = "heatgrad-" + Math.random().toString(36).slice(2, 8);
  const grad = el("linearGradient", { id: gradId, x1: "0", x2: "1", y1: "0", y2: "0" }, el("defs", {}, svg));
  for (let i = 0; i <= 10; i++) el("stop", { offset: `${i * 10}%`, "stop-color": seqColor(i / 10, ramp) }, grad);
  const legendY = H - 26;
  const LW = porQuantil ? 260 : 200;
  el("rect", { x: M, y: legendY, width: LW, height: 10, rx: 3, fill: `url(#${gradId})`, stroke: "var(--v-grid)", "stroke-width": 0.5 }, svg);
  const tLo = el("text", { x: M, y: legendY + 24, class: "viz-axis-text" }, svg);
  tLo.textContent = valueFormat(vMin);
  const tHi = el("text", { x: M + LW, y: legendY + 24, "text-anchor": "end", class: "viz-axis-text" }, svg);
  if (porQuantil) {
    // Na escala por quantil o MEIO da barra é a mediana, por construção —
    // rotular só as pontas esconderia justamente o que mudou.
    tHi.textContent = valueFormat(vMax);
    const tMid = el("text", { x: M + LW / 2, y: legendY + 24, "text-anchor": "middle", class: "viz-axis-text" }, svg);
    tMid.textContent = valueFormat(mediana);
    const cap = el("text", { x: M, y: legendY - 6, class: "viz-axis-text" }, svg);
    cap.textContent = "cor = posição na distribuição (metade dos setores de cada lado da mediana)";
  } else {
    tHi.textContent = valueFormat(colorMax) + (clipped ? " ou mais" : "");
  }
}

// ---------------------------------------------------------------------------
// Tabela alternativa (acessibilidade — sempre reflete os mesmos dados do gráfico)
// ---------------------------------------------------------------------------
function renderTable(root, { caption, columns, rows }) {
  const details = document.createElement("details");
  details.className = "viz-table-toggle";
  const summary = document.createElement("summary");
  // Com duas tabelas no mesmo cartão, dois "Ver como tabela" idênticos não
  // dizem qual é qual. Quando há legenda, ela entra no rótulo.
  summary.textContent = caption ? `Ver como tabela: ${caption.charAt(0).toLowerCase()}${caption.slice(1)}`
    : "Ver como tabela";
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
  // Mesmo motivo do IDU: tabela larga rola dentro do próprio contêiner. Aqui o
  // estouro só aparecia depois de abrir o "Ver como tabela", o que o tornava
  // fácil de não notar.
  const scroll = document.createElement("div");
  scroll.className = "viz-scroll-x";
  scroll.appendChild(table);
  details.appendChild(scroll);
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
    if (it.dashed) {
      sw.style.background = "transparent";
      sw.style.height = "0";
      sw.style.borderTop = `2px dashed ${it.color}`;
    } else {
      sw.style.background = it.color;
    }
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
  // Os dois rótulos são termos técnicos do Registro Civil e um deles engana:
  // "óbitos" aqui é mortalidade TOTAL, não infantil. Vale explicar na cara.
  note(root, `<strong>O que cada palavra quer dizer aqui.</strong> <em>Nascidos vivos</em> é o termo oficial do Registro
    Civil e não é sinônimo de "nascimentos": ele conta só os bebês que nasceram com vida. Os natimortos — que nascem sem
    vida — são registrados numa tabela separada do IBGE e não entram nesta linha. <em>Óbitos</em> são <strong>todas as
    mortes, de qualquer idade</strong>, e não mortalidade infantil. Em 2024 foram 964 nascidos vivos e 800 óbitos no total
    do município. A mortalidade infantil é outro indicador, bem menor, e está no retrato do IBGE Cidades: <strong>11,45
    óbitos por mil nascidos vivos</strong> (DATASUS/SIM).`);

  note(root, `Duas coisas que a série mostra. O <strong>pico de óbitos em 2021</strong> — 1.101, contra 800 a 900 nos anos
    vizinhos — coincide com o ano mais letal da pandemia de Covid-19 no Brasil. E os <strong>nascimentos caem de forma
    consistente desde 2015</strong> (1.284 em 2003 para 964 em 2024), acompanhando a queda da natalidade nacional. É a
    mesma tendência que aparece na Fase 1: a população de Itajubá parou de crescer.`);

  note(root, `Ressalva de método: são registros por <strong>local de ocorrência</strong>, não de residência. Como Itajubá
    concentra o hospital de referência da microrregião, parte desses nascimentos e óbitos é de moradores das cidades
    vizinhas que vieram se tratar aqui. O IBGE publica as tabelas por residência separadamente.`);
}

// ---------------------------------------------------------------------------
// Monta as estatísticas de educação dentro de #stats-educacao: Ideb/escolarização
// (pontos isolados, sem gráfico — ver choosing-a-form.md), alfabetização desde
// 2000 (linha) e nível de instrução 2010×2022 (barras 100% empilhadas).
// ---------------------------------------------------------------------------
function subhead(root, text) {
  const h = document.createElement("h4");
  h.className = "viz-subhead";
  h.textContent = text;
  root.appendChild(h);
}

function buildEducacaoStats(root, snapshot, educ) {
  const e = snapshot.indicadores.educacao;
  renderStats(root, [
    { value: e.ideb_anos_iniciais_fundamental_rede_publica.valor.toFixed(1).replace(".", ","), label: `Ideb — anos iniciais (rede pública) · ${e.ideb_anos_iniciais_fundamental_rede_publica.ano}`, note: "Escala 0–10" },
    { value: e.ideb_anos_finais_fundamental_rede_publica.valor.toFixed(1).replace(".", ","), label: `Ideb — anos finais (rede pública) · ${e.ideb_anos_finais_fundamental_rede_publica.ano}`, note: "Escala 0–10" },
    { value: e.taxa_escolarizacao_6_a_14_anos.valor.toFixed(2).replace(".", ",") + "%", label: `Taxa de escolarização, 6–14 anos · ${e.taxa_escolarizacao_6_a_14_anos.ano}` },
  ]);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "Ideb e taxa de escolarização: só o retrato mais recente — cada um tem o próprio ano-base. Série histórica do Ideb (bienal) e matrículas do Censo Escolar ficam para uma fase futura: exigem baixar e ler as planilhas oficiais do INEP, não têm API simples.";
  root.appendChild(note);

  // Alfabetização, 2000-2022
  subhead(root, "Alfabetização, 2000–2022");
  const alfaXValues = educ.alfabetizacao.serie.map(p => String(p.ano));
  const style = getComputedStyle(root);
  const cAlfa = style.getPropertyValue("--v-series-receita").trim() || "#08724e";
  renderLineChart(root, {
    series: [{ key: "alfa", label: "Taxa de alfabetização", color: cAlfa, points: educ.alfabetizacao.serie.map(p => ({ y: p.taxa })) }],
    xValues: alfaXValues, yLabel: "Taxa de alfabetização (%)", yMaxCap: 100,
    yFormat: (v) => v.toFixed(0) + "%", yFormatFull: (v) => v.toFixed(2).replace(".", ",") + "%",
  });
  renderTable(root, {
    caption: "Taxa de alfabetização de Itajubá/MG, 2000–2022",
    columns: ["Ano", "Taxa", "Base etária"],
    rows: educ.alfabetizacao.serie.map(p => [String(p.ano), p.taxa.toFixed(2).replace(".", ",") + "%", p.base_etaria]),
  });
  const alfaNote = document.createElement("p");
  alfaNote.className = "viz-note";
  alfaNote.textContent = educ.alfabetizacao.observacao;
  root.appendChild(alfaNote);

  // Nível de instrução, 2010 vs 2022
  subhead(root, "Nível de instrução, 2010 × 2022");
  const ord = [
    style.getPropertyValue("--v-ord-1").trim() || "#86b6ef",
    style.getPropertyValue("--v-ord-2").trim() || "#5598e7",
    style.getPropertyValue("--v-ord-3").trim() || "#2a78d6",
    style.getPropertyValue("--v-ord-4").trim() || "#1c5cab",
  ];
  const cats = educ.nivel_de_instrucao.categorias_ordem;
  renderStackedBars(root, {
    rows: [
      { label: "2010", values: educ.nivel_de_instrucao["2010"].percentual },
      { label: "2022", values: educ.nivel_de_instrucao["2022"].percentual },
    ],
    categories: cats,
    labels: educ.nivel_de_instrucao.rotulos,
    colors: ord,
    valueFormat: (v) => v.toFixed(1).replace(".", ",") + "%",
  });
  renderTable(root, {
    caption: "Nível de instrução de Itajubá/MG, 2010 e 2022 (% da população na base etária de cada ano)",
    columns: ["Categoria", "2010", "2022"],
    rows: cats.map(c => [educ.nivel_de_instrucao.rotulos[c], educ.nivel_de_instrucao["2010"].percentual[c].toFixed(1).replace(".", ",") + "%", educ.nivel_de_instrucao["2022"].percentual[c].toFixed(1).replace(".", ",") + "%"]),
  });
  const nivelNote = document.createElement("p");
  nivelNote.className = "viz-note";
  nivelNote.textContent = educ.nivel_de_instrucao.observacao;
  root.appendChild(nivelNote);
  const posNote = document.createElement("p");
  posNote.className = "viz-note";
  posNote.textContent = "Mestrado e doutorado: " + educ.pos_graduacao.observacao;
  root.appendChild(posNote);
}

// ---------------------------------------------------------------------------
// Monta o mapa de calor por setor censitário dentro de #map-territorio.
// ---------------------------------------------------------------------------
function buildTerritorioMap(root, contorno, setores, bairros, zonaUrbana, mancha) {
  // dentro_do_municipio: a coleta original no Overpass foi por bbox e trouxe
  // localidade de município vizinho junto (ver observacao em bairros_osm.json).
  const suburbLabels = bairros.localidades.filter(b => b.tipo === "suburb" && b.dentro_do_municipio !== false);
  const foraDoMunicipio = bairros.localidades.filter(b => b.dentro_do_municipio === false);
  renderChoroplethMap(root, {
    boundary: contorno.contorno_lon_lat,
    features: setores.setores,
    valueKey: "densidade_hab_km2",
    valueFormat: (v) => fmtInt.format(Math.round(v)) + " hab./km²",
    legendTitle: "Densidade populacional",
    labelPoints: suburbLabels,
    annotations: zonaUrbana ? [{ label: "Zona urbana no Censo 2022", aneis: zonaUrbana.aneis, info: zonaUrbana.aneis_info }] : [],
  });
  renderTable(root, {
    caption: "Setores censitários de Itajubá/MG — Censo 2022",
    columns: ["Setor", "Situação", "População", "Domicílios", "Área (km²)", "Densidade (hab./km²)"],
    rows: setores.setores
      .slice()
      .sort((a, b) => b.densidade_hab_km2 - a.densidade_hab_km2)
      .map(s => [s.setor, s.situacao, fmtInt.format(s.populacao), fmtInt.format(s.domicilios), s.area_km2.toFixed(3).replace(".", ","), fmtInt.format(Math.round(s.densidade_hab_km2))]),
  });
  const urb = setores.setores.filter(s => s.situacao === "Urbana");
  const rur = setores.setores.filter(s => s.situacao === "Rural");
  const somaArea = setores.setores.reduce((a, s) => a + s.area_km2, 0);
  const somaPop = setores.setores.reduce((a, s) => a + s.populacao, 0);
  const km2 = (v) => v.toFixed(0).replace(".", ",");
  renderStats(root, [
    { value: fmtInt.format(Math.round(urb.reduce((a, s) => a + s.populacao, 0) / urb.reduce((a, s) => a + s.area_km2, 0))), label: "Densidade na área urbana (hab./km²)", note: `${urb.length} setores · ${km2(urb.reduce((a, s) => a + s.area_km2, 0))} km² · ${fmtInt.format(urb.reduce((a, s) => a + s.populacao, 0))} hab.` },
    { value: fmtInt.format(Math.round(rur.reduce((a, s) => a + s.populacao, 0) / rur.reduce((a, s) => a + s.area_km2, 0))), label: "Densidade na área rural (hab./km²)", note: `${rur.length} setores · ${km2(rur.reduce((a, s) => a + s.area_km2, 0))} km² · ${fmtInt.format(rur.reduce((a, s) => a + s.populacao, 0))} hab.` },
  ]);

  const note1 = document.createElement("p");
  note1.className = "viz-note";
  note1.textContent = `Cada mancha é o polígono oficial de um setor censitário do IBGE, não uma aproximação: os ${setores.n_setores} setores somam ${fmtInt.format(somaPop)} habitantes (bate exatamente com o Censo 2022) e ${km2(somaArea)} km², que é a área territorial oficial do município — ou seja, cobrem 100% do território, sem sobra nem falta.`;
  root.appendChild(note1);
  const note2 = document.createElement("p");
  note2.className = "viz-note";
  note2.textContent = `A leitura principal do mapa é o contraste de tamanho: ${urb.length} setores urbanos espremidos em ${km2(urb.reduce((a, s) => a + s.area_km2, 0))} km² concentram ${Math.round(100 * urb.reduce((a, s) => a + s.populacao, 0) / somaPop)}% da população, enquanto ${rur.length} setores rurais ocupam ${Math.round(100 * rur.reduce((a, s) => a + s.area_km2, 0) / somaArea)}% do território com o restante. É por isso que a mancha escura fica toda num canto — não é erro de projeção, é a forma da ocupação de Itajubá.`;
  root.appendChild(note2);
  const note3 = document.createElement("p");
  note3.className = "viz-note";
  note3.textContent = `Os losangos são ${suburbLabels.length} bairros mapeados pela comunidade OpenStreetMap — passe o mouse para ver o nome. Eles são só referência: o IBGE não publica contorno de bairro para Itajubá (a coluna de bairro vem vazia nos 192 setores) e o site da Prefeitura, que teria essa base, está bloqueado. Por isso a cor segue o setor censitário, que é a menor unidade oficial disponível aqui.`;
  root.appendChild(note3);

  if (foraDoMunicipio.length) {
    const noteFix = document.createElement("p");
    noteFix.className = "viz-note";
    noteFix.textContent = `Correção: a coleta no OpenStreetMap foi feita por caixa delimitadora, não pelo contorno do município, e trouxe ${foraDoMunicipio.length} localidade de fora junto — ${foraDoMunicipio.map(b => `"${b.nome}", que é de ${b.municipio_osm}`).join("; ")}. Não é mais desenhada aqui, mas continua no arquivo salvo, marcada com dentro_do_municipio: false.`;
    root.appendChild(noteFix);
  }

  if (mancha) {
    const noteM = document.createElement("p");
    noteM.className = "viz-note";
    noteM.textContent = `"Urbano" tem três definições diferentes aqui, e é isso que confunde quem compara mapas: (1) a mancha efetivamente construída, mapeada por satélite, tem ${mancha.area_km2.toFixed(1)} km² em ${mancha.n_manchas} pedaços separados (IBGE, Áreas Urbanizadas 2019); (2) a zona urbana censitária tem ${zonaUrbana ? zonaUrbana.area_km2.toFixed(1) : "45"} km², ${zonaUrbana ? (zonaUrbana.area_km2 / mancha.area_km2).toFixed(1) : "2,3"}× maior, porque engloba setores inteiros incluindo o vazio entre os bairros; (3) o perímetro urbano da lei municipal é maior ainda, pois reserva área para crescimento futuro. O contorno interno que o Google Maps desenha acompanha a mancha construída — não o setor censitário nem o perímetro legal.`;
    root.appendChild(noteM);
  }

  if (zonaUrbana) {
    const note4 = document.createElement("p");
    note4.className = "viz-note";
    note4.textContent = `A linha tracejada é a zona urbana do Censo 2022 (${zonaUrbana.area_km2.toFixed(0)} km², ${Math.round(100 * zonaUrbana.area_km2 / somaArea)}% do município), unindo os ${zonaUrbana.n_setores_urbanos} setores que o IBGE classificou como urbanos. ${zonaUrbana.observacao_aneis || ""} O anel pequeno tem confirmação independente: a mancha construída do IBGE 2019, mapeada por satélite, registra 0,06 km² de área urbanizada exatamente ali. Como o IBGE deriva essa classificação do perímetro urbano fixado em lei e vigente na coleta, ela é a melhor aproximação que conseguimos do zoneamento em vigor em 2022. Mas é aproximação, e por um motivo estrutural: o setor censitário é indivisível — ou ele inteiro é urbano, ou inteiro é rural. Como o setor urbano típico de Itajubá tem uns 300 m de lado (mediana 0,087 km²), a borda só consegue seguir os recortes dos setores e "engorda" onde o perímetro legal corta pelo meio de um. Ou seja: ela nunca vai coincidir com o traçado do Google Maps nem com o do Anexo 2 da lei, que seguem ruas e divisas de lote. É um teto de resolução do método, não erro do dado.`;
    root.appendChild(note4);
  }
}

// O que aconteceu em cada ano do saldo orçamentário. Vive aqui, e não no JSON,
// porque é síntese editorial cruzando quatro arquivos (RREO, DCA I-C, I-D e
// I-E) — os arquivos de dados guardam só o que foi coletado. Valores marcados
// como "corrigidos" estão em R$ de 2025; os do gráfico são de cada ano.
// `fontes` só entra quando existe uma referência externa que sustenta a
// afirmação — os anos explicados apenas pelo próprio SICONFI não têm link, e é
// proposital: link decorativo é pior que link nenhum. Todas as URLs foram
// testadas e respondiam 200 em 03/08/2026.
const SALDO_NOTAS = {
  2015: {
    texto: `<strong>Recessão.</strong> O PIB do Brasil encolheu 3,5% — a pior queda da série histórica. Em Itajubá as transferências caíram R$ 11 mi e o ISS caiu 9% (corrigidos). A folha de pessoal não caiu junto, e o ano fechou no vermelho.`,
    fontes: [{ t: "IBGE — Contas Nacionais Trimestrais (SIDRA, tabela 1846)", u: "https://sidra.ibge.gov.br/tabela/1846" }],
  },
  2016: {
    texto: `<strong>A virada da saúde.</strong> Primeiro ano em que o município passa a pagar direto o atendimento hospitalar: essa rubrica salta de R$ 16 mi para R$ 63 mi e as transferências sobem R$ 55 mi (corrigidos). A despesa acompanhou quase tudo — sobrou pouco, mas sobrou. O ato que produziu essa mudança não foi localizado em fonte pública; ver a nota do gráfico 5.`,
  },
  2017: {
    texto: `<strong>A folha estourou.</strong> Receita parada e a despesa com pessoal saltando de R$ 130 mi para R$ 143 mi em um ano, +9,7% corrigido. Não foi obra: 2017 teve o <em>menor</em> investimento de doze anos, R$ 12,2 mi.`,
  },
  2018: {
    texto: `<strong>Ajuste.</strong> Depois do rombo, a folha parou de crescer e o investimento seguiu no chão (R$ 12,9 mi). A arrecadação própria reagiu — o IPTU subiu 40% corrigido em um ano.`,
  },
  2019: {
    texto: `<strong>Recuperação.</strong> ISS e IPTU em alta e transferências +R$ 15 mi (corrigidos). O investimento quase dobrou, para R$ 24,3 mi, e ainda coube dentro da receita.`,
  },
  2020: {
    texto: `<strong>Pandemia e empréstimo, ao mesmo tempo.</strong> As transferências pularam R$ 61 mi (+21% corrigido) com o auxílio federal da Lei Complementar 173/2020 — metade carimbada para saúde e assistência social. Entrou também R$ 30 mi de empréstimo, que bancou o maior pacote de obras até então. <strong>Sem o empréstimo, o ano teria fechado com déficit de cerca de R$ 10 mi.</strong>`,
    fontes: [
      { t: "SICONFI/Tesouro — comunicado sobre o auxílio financeiro da LC 173/2020", u: "https://siconfi.tesouro.gov.br/siconfi/pages/public/conteudo/conteudo.jsf?id=24303" },
      { t: "TCE-SP — o que a LC 173/2020 mudou para os municípios", u: "https://www.tce.sp.gov.br/6524-artigo-breves-consideracoes-sobre-lei-complementar-173-2020" },
    ],
  },
  2021: {
    texto: `<strong>Gestão nova pisa no freio.</strong> Primeiro ano de Christian Gonçalves, logo depois do pico de obras: o investimento despenca de R$ 55 mi para R$ 16 mi (corrigidos) enquanto as transferências continuam altas. O superávit é o freio, não a economia.`,
  },
  2022: {
    texto: `<strong>O novo FUNDEB chega à conta.</strong> A Educação sobe 36% corrigido de uma vez, puxada pelo piso nacional do magistério (+33,24%). As transferências até caíram R$ 15 mi, mas a arrecadação própria subiu R$ 10 mi e o investimento ficou baixo — deu para fechar no azul.`,
    fontes: [
      { t: "Câmara dos Deputados — reajuste do piso do magistério", u: "https://www.camara.leg.br/noticias/1274520-camara-aprova-novo-metodo-de-reajuste-do-piso-salarial-do-magisterio-publico-da-educacao-basica/" },
      { t: "CNTE — como se chegou aos 33,24% de 2022", u: "https://cnte.org.br/noticias/bolsonaro-quer-barrar-reajuste-de-33-no-piso-salarial-de-professores-fca1" },
    ],
  },
  2023: {
    texto: `<strong>O maior déficit da série.</strong> Receita estagnada, com as transferências caindo, e despesa subindo 10% corrigido: a Saúde consumiu R$ 17 mi a mais e o investimento, R$ 11 mi a mais. É o ano anterior à eleição.`,
  },
  2024: {
    texto: `<strong>Zero a zero — mas só no papel.</strong> Ano de eleição com o maior investimento de toda a série, R$ 71,9 mi corrigidos, bancado por R$ 42 mi de empréstimo novo. <strong>Sem essa operação de crédito, 2024 teria fechado com déficit de cerca de R$ 40 mi.</strong>`,
  },
  2025: {
    texto: `<strong>O maior superávit da série.</strong> Primeiro ano do novo mandato de Rodrigo Riera: o investimento cai 69% (de R$ 71,9 mi para R$ 22,1 mi) enquanto a receita sobe. Exatamente o mesmo padrão de 2021 — gestão que chega, freia. Em maio a Câmara aprovou, em primeiro turno, novo empréstimo de R$ 70 mi para obras.`,
    fontes: [
      { t: "Câmara Municipal de Itajubá — aprovação do empréstimo de R$ 70 milhões (PL 4856/2025)", u: "https://itajuba.cam.mg.gov.br/site/camara-municipal-de-itajuba-aprova-emprestimo-para-obras-de-infraestrutura-e-discute-demandas-da-populacao-em-sessao-ordinaria/" },
      { t: "O Tempo — perfil de Rodrigo Riera, eleito em 2024", u: "https://www.otempo.com.br/eleicoes/2024/candidatos/minas-gerais/itajuba/prefeito/rodrigo-riera-55" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Monta os gráficos de finanças dentro de #chart-financas e #chart-saldo.
// ---------------------------------------------------------------------------
function buildFinancasCharts(finRoot, saldoRoot, fin) {
    // Um gráfico só: entra pelo #chart-financas e o #chart-saldo deixou de
    // existir. Receita, despesa e saldo eram três leituras da mesma conta
    // espalhadas por dois cartões — o leitor tinha que guardar um de cabeça
    // para entender o outro.
    const root = finRoot || saldoRoot;
    if (!root) return;
    const st = getComputedStyle(root);
    const cReceita = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
    // A despesa sai do azul e vai para o laranja SÓ neste gráfico. O azul aqui
    // já significa "sobrou" (é a cor positiva da paleta divergente), e ter a
    // linha da despesa no mesmo azul faria a legenda mentir. Verde/laranja nas
    // linhas e azul/vermelho no saldo deixa os quatro papéis distinguíveis,
    // inclusive para daltônicos — que é o motivo de o par divergente do projeto
    // ser azul/vermelho e não verde/vermelho.
    const cDespesa = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
    const posColor = st.getPropertyValue("--v-pos").trim() || "#2a78d6";
    const negColor = st.getPropertyValue("--v-neg").trim() || "#e34948";

    {
      legend(root, [
        { label: "Receita realizada", color: cReceita },
        { label: "Despesa empenhada", color: cDespesa },
        { label: "Sobrou (receita acima da despesa)", color: posColor },
        { label: "Faltou", color: negColor },
      ]);

      renderReceitaDespesaSaldo(root, {
        serie: fin.serie, cReceita, cDespesa, posColor, negColor,
        // O tooltip recebe só o texto: link dentro dele não é clicável (o balão
        // tem pointer-events:none, senão fugiria do mouse). As fontes ficam no
        // bloco recolhido abaixo, onde dá para clicar.
        notas: Object.fromEntries(Object.entries(SALDO_NOTAS).map(([a, v]) => [a, v.texto])),
      });

      note(root, `<strong>Passe o mouse por um ano</strong> e ele mostra receita, despesa, quanto sobrou ou faltou e o que
        aconteceu naquele exercício. A faixa colorida no painel de cima <em>é</em> o saldo — a distância entre as duas
        linhas — e o painel de baixo repete a mesma coisa com a régua ampliada, porque em anos como 2016 e 2024 a sobra é
        fina demais para enxergar na escala do orçamento.`);

      note(root, `Saldo mede equilíbrio de caixa, não qualidade do gasto: dá para fechar no azul deixando de investir.
        Lendo a série inteira, <strong>o vermelho aparece quando um custo específico dispara com a receita parada; o azul,
        quando entra dinheiro extraordinário ou quando a prefeitura freia depois de um ciclo de obras</strong>. Repare que
        a receita cresce sem parar mesmo nos anos de déficit — o problema nunca foi falta de dinheiro entrando.`);

      noteToggle(root, "Ler a explicação de todos os anos, com as fontes",
        `<p class="viz-note-lead">Todos os valores em reais de cada ano, como no balanço. Onde o texto diz "corrigido", o
         valor está em R$ de 2025 — por isso é maior nos anos mais antigos. Os anos sem link são explicados pelo próprio
         dado do SICONFI, sem referência externa.</p>` +
        fin.serie.map(p => {
          const n = SALDO_NOTAS[p.ano] || {};
          const fontes = (n.fontes || []).map(f =>
            `<a href="${f.u}" target="_blank" rel="noopener noreferrer">${f.t} ↗</a>`).join(" · ");
          return `<p><strong>${p.ano}</strong> · ${p.saldo >= 0 ? "superávit" : "déficit"} de
            ${fmtMoneyFull(Math.abs(p.saldo))} — ${n.texto || ""}` +
            (fontes ? `<span class="viz-note-fontes">Fontes: ${fontes}</span>` : "") + `</p>`;
        }).join(""));

      renderTable(root, {
        caption: "Receita, despesa e saldo de Itajubá/MG, 2015–2025",
        columns: ["Ano", "Receita realizada", "Despesa empenhada", "Saldo"],
        rows: fin.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_realizada),
          fmtMoneyFull(p.despesa_empenhada), fmtMoneyFull(p.saldo)]),
      });
    }
}

// Nota abaixo de um gráfico. Aceita HTML porque várias notas precisam citar
// fonte com link — o texto vem do código, nunca do dado carregado.
function note(root, html) {
  const p = document.createElement("p");
  p.className = "viz-note";
  p.innerHTML = html;
  root.appendChild(p);
  return p;
}

// Nota recolhida: o mesmo conteúdo do tooltip fica disponível sem mouse — para
// leitura no celular, para quem usa teclado/leitor de tela e para quem quer ler
// tudo de uma vez. Fechada por padrão para não devolver o "textão" à página.
function noteToggle(root, resumo, html) {
  const det = document.createElement("details");
  det.className = "viz-table-toggle viz-note-toggle";
  const sum = document.createElement("summary");
  sum.textContent = resumo;
  det.appendChild(sum);
  const div = document.createElement("div");
  div.className = "viz-note-toggle-body";
  div.innerHTML = html;
  det.appendChild(div);
  root.appendChild(det);
}

const pct = (v, casas = 0) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(casas).replace(".", ",") + "%";
const milhoes = (v) => "R$ " + (v / 1e6).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "M";

// ---------------------------------------------------------------------------
// Fase 3 — "quanto subiu de verdade": despesa nominal × deflacionada pelo IPCA.
//
// Por que duas linhas e não uma: sozinha, a série nominal responde a pergunta
// errada. Ela sobe 194% entre 2015 e 2025, mas 69% disso é só a moeda perdendo
// valor. Sobrepor as duas deixa a distância entre elas ser a inflação — o leitor
// vê o desconto acontecendo em vez de ter que confiar num número solto.
// ---------------------------------------------------------------------------
function buildDespesaReal(root, desp) {
  const st = getComputedStyle(root);
  const cReal = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cNom = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const s = desp.serie;

  renderLineChart(root, {
    series: [
      { key: "real", label: "Corrigido pela inflação (em R$ de 2025)", color: cReal, points: s.map(p => ({ y: p.total_empenhado_r2025 })) },
      { key: "nom", label: "Em reais de cada ano (como aparece no balanço)", color: cNom, points: s.map(p => ({ y: p.total_empenhado })) },
    ],
    xValues: s.map(p => String(p.ano)),
    yLabel: "Despesa empenhada (R$)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v),
  });

  const a = s.find(p => p.ano === 2015);
  const b = s[s.length - 1];
  const nomPct = (b.total_empenhado / a.total_empenhado - 1) * 100;
  const realPct = (b.total_empenhado_r2025 / a.total_empenhado_r2025 - 1) * 100;
  const inflPct = (a.ipca_fator_para_2025 - 1) * 100;

  renderStats(root, [
    { value: pct(nomPct), label: "Aumento nominal do gasto, 2015→2025", note: `De ${milhoes(a.total_empenhado)} para ${milhoes(b.total_empenhado)}` },
    { value: pct(inflPct), label: "Inflação acumulada no período (IPCA)", note: `R$ 1 de 2015 = R$ ${a.ipca_fator_para_2025.toFixed(2).replace(".", ",")} hoje` },
    { value: pct(realPct), label: "Aumento REAL, já descontada a inflação", note: `De ${milhoes(a.total_empenhado_r2025)} para ${milhoes(b.total_empenhado_r2025)}, em R$ de 2025` },
    { value: "R$ " + fmtInt.format(Math.round(b.per_capita_r2025)), label: "Gasto por habitante em 2025, no ano todo", note: "Vale como foto do ano, não como tendência — ver ressalva" },
  ]);

  note(root, `A distância entre as linhas é a inflação: dos ${pct(nomPct)} nominais, ${pct(inflPct)} é só o real valendo
    menos. Sobra <strong>${pct(realPct)} de crescimento verdadeiro</strong>. O que explica esses ${pct(realPct)}, em ordem
    de tamanho:`);

  note(root, `<strong>1. Transferências de fora: +R$ 204 milhões reais</strong> (de R$ 218 mi para R$ 422 mi, +93%). É de
    longe o principal, e tem três eventos datados dentro dele. Em <strong>2016</strong> o município passou a receber e pagar
    diretamente o atendimento hospitalar, e só essa rubrica saltou de R$ 16 mi para R$ 63 mi num ano (detalhe no gráfico 5).
    Em <strong>2020</strong> veio o auxílio federal da pandemia (LC 173/2020). E a partir de <strong>2021</strong> o novo
    FUNDEB, criado pela Emenda Constitucional 108/2020, elevou a complementação da União de 10% para 23% do fundo até 2026 —
    o efeito aparece em 2022, quando o piso nacional do magistério subiu 33,24% e a despesa com Educação em Itajubá subiu
    36% real de uma vez.`);

  note(root, `<strong>2. Arrecadação própria: +R$ 50 milhões reais</strong> (de R$ 83 mi para R$ 133 mi, +60%), puxada quase
    só pelo <strong>ISS, o imposto sobre serviços, que dobrou</strong>: R$ 24,9 mi em 2015 para R$ 49,8 mi em 2025,
    corrigidos. IPTU e ITBI ficaram praticamente parados no mesmo período. Isso é a economia de serviços em torno da UNIFEI:
    a cidade concentra mais de 150 empresas de base tecnológica e está implantando o ParCTeC, terceiro parque científico e
    tecnológico de Minas Gerais, numa área de 289 hectares em parceria com a universidade.`);

  note(root, `<strong>3. A população não cresceu</strong> — 96 mil em 2015, 96,8 mil em 2025. Nada desse aumento foi
    absorvido por gente nova: virou gasto por habitante. <span style="opacity:.85">Duas notas de método: a série começa em
    2014 porque é onde a base do SICONFI começa para todos os municípios (São Paulo capital também volta vazia antes disso);
    e o valor por habitante vale como foto de um ano, não como tendência, porque as estimativas do IBGE anteriores ao Censo
    2022 estavam cerca de 5% infladas — o detalhe está no arquivo de dados.</span>`);

  renderTable(root, {
    caption: "Despesa empenhada de Itajubá/MG, nominal e corrigida pela inflação, 2014–2025",
    columns: ["Ano", "Nominal", "Em R$ de 2025", "População", "Por habitante (R$ de 2025)"],
    rows: s.map(p => [String(p.ano), fmtMoneyFull(p.total_empenhado), fmtMoneyFull(p.total_empenhado_r2025),
      p.populacao ? fmtInt.format(p.populacao) : "sem estimativa", p.per_capita_r2025 ? fmtMoneyFull(p.per_capita_r2025) : "—"]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — "a prefeitura cresceu junto com a cidade?".
//
// Índice 2014=100 nas duas séries, NÃO dois eixos. O PIB municipal é ~9x o
// orçamento: num eixo único a despesa vira uma reta no rodapé, e dois eixos com
// escalas independentes deixam sugerir qualquer conclusão só escolhendo onde
// cortar cada um (é o anti-padrão nº 1 do skill de dataviz). Índice comum
// responde exatamente a pergunta feita — quem subiu mais — sem essa liberdade.
// ---------------------------------------------------------------------------
function buildPibVsDespesa(root, desp) {
  const cmp = desp.comparacao_com_pib;
  if (!cmp) return;
  const st = getComputedStyle(root);
  const cDesp = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cPib = st.getPropertyValue("--v-series-3").trim() || "#eb6834";

  renderLineChart(root, {
    series: [
      { key: "desp", label: "Despesa da Prefeitura", color: cDesp, points: cmp.serie.map(p => ({ y: p.indice_despesa })) },
      { key: "pib", label: "PIB do município", color: cPib, points: cmp.serie.map(p => ({ y: p.indice_pib })) },
    ],
    xValues: cmp.serie.map(p => String(p.ano)),
    yLabel: `Índice ${cmp.base_indice} = 100 (ambos corrigidos pela inflação)`,
    yFormat: (v) => String(Math.round(v)),
    yFormatFull: (v) => v.toFixed(1).replace(".", ",") + " (base 100 em " + cmp.base_indice + ")",
  });

  const pri = cmp.serie[0], ult = cmp.serie[cmp.serie.length - 1];
  renderStats(root, [
    { value: Math.round(ult.indice_despesa) + " / 100", label: `Despesa da Prefeitura em ${ult.ano}`, note: `Cresceu ${pct(ult.indice_despesa - 100)} em termos reais desde ${cmp.base_indice}` },
    { value: Math.round(ult.indice_pib) + " / 100", label: `PIB do município em ${ult.ano}`, note: `Praticamente o mesmo de ${cmp.base_indice}, descontada a inflação` },
    { value: ult.despesa_sobre_pib_pct.toFixed(1).replace(".", ",") + "%", label: "Quanto a Prefeitura pesa na economia local", note: `Era ${pri.despesa_sobre_pib_pct.toFixed(1).replace(".", ",")}% em ${cmp.base_indice}` },
  ]);

  note(root, `A resposta é <strong>não — e o contrário do que se esperaria</strong>. Corrigido pela inflação,
    <strong>o PIB de Itajubá em ${ult.ano} está praticamente onde estava em ${cmp.base_indice}</strong> (índice ${ult.indice_pib.toString().replace(".", ",")}),
    enquanto a despesa da Prefeitura subiu ${pct(ult.indice_despesa - 100)}. A economia da cidade despencou na recessão de
    2015–2016 (chegou ao índice ${cmp.serie[2].indice_pib.toString().replace(".", ",")} em 2016, uma queda real de
    ${pct(cmp.serie[2].indice_pib - 100)}) e levou sete anos para voltar ao ponto de partida. O orçamento não acompanhou
    essa queda: seguiu subindo o tempo todo. Resultado: <strong>a Prefeitura saiu de
    ${pri.despesa_sobre_pib_pct.toFixed(1).replace(".", ",")}% para ${ult.despesa_sobre_pib_pct.toFixed(1).replace(".", ",")}% da economia local</strong> —
    quase o dobro de peso. Como o crescimento do orçamento veio sobretudo de transferências de fora (gráfico 7), o que
    aconteceu não foi a cidade ficando mais rica e sustentando uma prefeitura maior: foi a prefeitura crescendo por
    repasse enquanto a economia local ficava parada.`);

  note(root, `<strong>Duas ressalvas honestas.</strong> O IBGE não publica PIB municipal a preços constantes, então a
    correção usa o mesmo IPCA do resto da página — é o procedimento usual, mas o IPCA mede preços ao consumidor e não a
    estrutura de preços da produção, então o índice do PIB tem margem de erro maior que o da despesa. E a série do PIB
    municipal termina em ${ult.ano}, último ano publicado; por isso este gráfico para ali enquanto os outros vão até 2025.`);

  renderTable(root, {
    caption: `PIB municipal e despesa da Prefeitura, índice ${cmp.base_indice}=100, em R$ de 2025`,
    columns: ["Ano", "PIB (R$ de 2025)", "Despesa (R$ de 2025)", "Índice PIB", "Índice despesa", "Despesa / PIB"],
    rows: cmp.serie.map(p => [String(p.ano), fmtMoneyFull(p.pib_r2025), fmtMoneyFull(p.despesa_r2025),
      p.indice_pib.toString().replace(".", ","), p.indice_despesa.toString().replace(".", ","),
      p.despesa_sobre_pib_pct.toFixed(2).replace(".", ",") + "%"]),
  });
}

// NOTA: havia aqui um buildDespesaFuncoes — barras horizontais com a despesa
// por função só de 2025. Foi removido: os pequenos múltiplos mostram a mesma
// repartição E a trajetória de cada função, com percentual do orçamento e valor
// por habitante no hover. Dois gráficos para o mesmo recorte cansam o leitor
// sem acrescentar. O que era exclusivo do gráfico antigo — o motivo de Saúde e
// Educação dominarem, e o ranking completo do último ano — migrou para as notas
// e para o bloco recolhido de buildFuncoesNoTempo.

// ---------------------------------------------------------------------------
// PEQUENOS MÚLTIPLOS: uma mini-série por função, todas na MESMA régua vertical.
//
// A alternativa óbvia seria um gráfico só com seis linhas coloridas. Não dá:
// seriam seis matizes categóricos disputando espaço, e o skill de dataviz é
// explícito — a partir de umas poucas séries a saída é small multiples, não
// gerar mais cores. Aqui cada painel tem identidade no título, então basta um
// matiz. E como a escala é compartilhada, comparar painéis continua válido:
// a Saúde ocupa o quadro inteiro, a Cultura quase não sai do chão.
// ---------------------------------------------------------------------------
// rotuloValor: o que a primeira linha do balão chama o número. Nasceu fixo em
// "Empenhado" porque o único uso era despesa por função; a página de Roraima usa
// os mesmos painéis para população, daí o parâmetro — com o padrão antigo, para
// as quatro páginas já publicadas não mudarem.
// rotuloCabecalho: o que aparece no canto de cada painel. O padrão é o último
// valor da própria série; quando a série está em índice, o número que interessa
// no cabeçalho é outro (a grandeza absoluta), e é para isso que serve o gancho.
function renderSmallMultiples(root, { paineis, xValues, cor, valueFormat, valueFormatFull, colunas = 3, detalhe, rotuloValor = "Empenhado", rotuloCabecalho }) {
  const grade = document.createElement("div");
  grade.className = "viz-multiples";
  grade.style.setProperty("--viz-mult-cols", colunas);
  root.appendChild(grade);

  const yMax = niceMax(Math.max(...paineis.flatMap(p => p.valores)) * 1.08);
  const W = 240, H = 104, M = { top: 8, right: 8, bottom: 4, left: 8 };
  const innerW = W - M.left - M.right, innerH = H - M.top - M.bottom;
  const n = xValues.length;

  paineis.forEach(p => {
    const cel = document.createElement("div");
    cel.className = "viz-multiple";
    grade.appendChild(cel);

    const cab = document.createElement("div");
    cab.className = "viz-multiple-head";
    const nomeEl = document.createElement("span");
    nomeEl.className = "m-nome";
    nomeEl.textContent = p.nome;
    const valEl = document.createElement("span");
    valEl.className = "m-valor";
    valEl.textContent = rotuloCabecalho ? rotuloCabecalho(p) : valueFormat(p.valores[n - 1]);
    cab.appendChild(nomeEl); cab.appendChild(valEl);
    cel.appendChild(cab);

    const wrap = document.createElement("div");
    wrap.className = "viz-svg-wrap";
    cel.appendChild(wrap);
    const svg = el("svg", {
      class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img",
      "aria-label": `${p.nome}: de ${valueFormatFull(p.valores[0])} em ${xValues[0]} a ${valueFormatFull(p.valores[n - 1])} em ${xValues[n - 1]}`,
    }, wrap);

    const x = (i) => M.left + (innerW * i) / (n - 1);
    const y = (v) => M.top + innerH - (innerH * v) / yMax;

    el("line", { x1: M.left, x2: W - M.right, y1: y(0), y2: y(0), class: "viz-gridline" }, svg);
    const d = p.valores.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
    el("path", {
      d: `${d}L${x(n - 1).toFixed(1)},${y(0).toFixed(1)}L${x(0).toFixed(1)},${y(0).toFixed(1)}Z`,
      fill: cor, "fill-opacity": .16, stroke: "none", "pointer-events": "none",
    }, svg);
    el("path", { d, fill: "none", stroke: cor, "stroke-width": 2, "stroke-linejoin": "round", "pointer-events": "none" }, svg);

    const tip = makeTooltip(wrap);
    xValues.forEach((xv, i) => {
      const meia = innerW / (n - 1) / 2;
      const det = detalhe ? detalhe(p, i) : null;
      const linhas = [{ label: rotuloValor, value: valueFormatFull(p.valores[i]), color: cor }]
        .concat((det && det.linhas) || []);
      const nota = det && det.nota;
      const alvo = el("rect", {
        class: "viz-hit", x: Math.max(M.left, x(i) - meia), y: M.top,
        width: Math.min(innerW, meia * 2), height: innerH, fill: "transparent", tabindex: 0,
        role: "img",
        "aria-label": `${p.nome}, ${xv}: ` + linhas.map(l => `${l.label} ${l.value}`).join(", ") +
          (nota ? ". " + nota.replace(/<[^>]+>/g, "") : ""),
      }, svg);
      function onEnter() {
        const r = svg.getBoundingClientRect();
        // Painel estreito: o balão com texto não cabe ao lado dentro do cartão.
        // Ancorar no ponto e deixar o showTooltip virar para baixo/laterais.
        showTooltip(tip, wrap, x(i) * (r.width / W), y(p.valores[i]) * (r.height / H),
          `${p.nome} · ${xv}`, linhas, nota);
      }
      alvo.addEventListener("pointerenter", onEnter);
      alvo.addEventListener("focus", onEnter);
      alvo.addEventListener("pointerleave", () => hideTooltip(tip));
      alvo.addEventListener("blur", () => hideTooltip(tip));
    });

    const pe = document.createElement("div");
    pe.className = "viz-multiple-foot";
    const a = document.createElement("span"); a.textContent = xValues[0];
    const b = document.createElement("span"); b.textContent = xValues[n - 1];
    pe.appendChild(a); pe.appendChild(b);
    cel.appendChild(pe);
  });
}

// Notas por função e ano. Só os anos em que algo identificável aconteceu: nos
// demais o tooltip já traz percentual do orçamento, valor por habitante e
// variação sobre o ano anterior, que é informação suficiente. Encher os 72
// pares com frase genérica ensinaria o leitor a ignorar o balão.
const FUNCAO_NOTAS = {
  "Saúde|2016": `<strong>A virada.</strong> "Assistência Hospitalar e Ambulatorial" salta de R$ 16 mi para R$ 63 mi em um ano. <strong>Não é mais gente sendo atendida — é a prefeitura passando a pagar diretamente</strong> um atendimento que antes o Ministério repassava ao hospital. Mudou o pagador, não o paciente.`,
  "Saúde|2020": `<strong>Pandemia.</strong> A subfunção "Administração Geral" da Saúde, onde entra a compra emergencial, sai de R$ 5 mi para R$ 40 mi. O atendimento hospitalar segue no mesmo patamar.`,
  "Saúde|2021": `<strong>O pico da série:</strong> 48% de todo o orçamento municipal e R$ 2.093 por habitante. A "Administração Geral" da Saúde chega a R$ 66 mi — treze vezes o valor de 2019.`,
  "Saúde|2022": `<strong>A queda não é corte.</strong> É o fim do dinheiro emergencial: a "Administração Geral" despenca de R$ 66 mi para R$ 15 mi. O atendimento hospitalar, esse, continuou subindo.`,
  "Saúde|2025": `O atendimento hospitalar e ambulatorial chega a <strong>R$ 116,8 mi — a maior linha isolada do orçamento inteiro</strong>, sozinha maior que toda a Educação. Por habitante, a Saúde saiu de R$ 708 em 2014 para R$ 2.035, corrigido: quase o triplo, com a população parada.`,
  "Educação|2020": `Ano de escola fechada: a despesa cai em termos reais pela primeira vez desde 2018.`,
  "Educação|2022": `<strong>O degrau.</strong> O piso nacional do magistério sobe 33,24% e o novo FUNDEB (Emenda Constitucional 108/2020) eleva a complementação da União de 10% para 23% do fundo até 2026. A despesa sobe 36% real de uma vez — e fica nesse novo patamar.`,
  "Urbanismo|2020": `<strong>Primeiro pico:</strong> R$ 80 mi, quase o dobro de qualquer ano vizinho. É o ano em que entraram R$ 30 mi de empréstimo.`,
  "Urbanismo|2024": `<strong>Segundo pico:</strong> R$ 90 mi, no ano em que entraram R$ 42 mi de empréstimo. Só "Infraestrutura Urbana" consumiu R$ 58,6 mi.`,
  "Urbanismo|2025": `Volta ao patamar de sempre. <strong>Em doze anos o Urbanismo encolheu 3,3% em termos reais</strong> — gasta-se hoje menos com a cidade física do que em 2015.`,
  "Encargos Especiais|2025": `<strong>Quase dobra em um ano</strong>, de R$ 15,1 mi para R$ 28,3 mi. É quase tudo serviço da dívida: a conta dos empréstimos de 2020 e 2024 chegando.`,
  "Administração|2025": `Cresceu 31% em doze anos, contra 69% do orçamento inteiro — ou seja, <strong>perdeu peso relativo</strong>. A máquina administrativa não foi o que fez o orçamento crescer.`,
  "outras|2025": `Todo o resto do governo municipal somado — Assistência Social, Segurança, Cultura, Previdência, Saneamento, Transporte, Agricultura, Meio Ambiente e as demais. <strong>Juntas, ainda cabem dentro de um terço do que vai só para a Saúde.</strong>`,
};

// ---------------------------------------------------------------------------
// Fase 3 — a repartição do orçamento ao longo do tempo, função por função.
// ---------------------------------------------------------------------------
function buildFuncoesNoTempo(root, desp) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const serie = desp.serie;
  const ult = serie[serie.length - 1];

  // Escolhe as funções pelo tamanho no último ano; o resto vira um painel só,
  // para o leitor não achar que o orçamento acabou nas seis primeiras.
  const ranking = Object.entries(ult.funcoes).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  // Cinco funções + "outras" fecham 6 painéis, ou seja, duas fileiras cheias de
  // três. Com 7 sobrava um painel sozinho na terceira fileira.
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
    // Cada ano ganha três números que o gráfico sozinho não mostra: o peso no
    // orçamento, o valor POR HABITANTE — que é o que separa "cresceu porque a
    // cidade cresceu" de "cresceu de verdade" — e a variação sobre o ano
    // anterior. A nota editorial só aparece nos anos que têm história.
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
        const v = 100 * (painel.valores[i] / painel.valores[i - 1] - 1);
        linhas.push({
          label: `Ante ${serie[i - 1].ano}, já sem inflação`,
          value: pct(v, 1), color: cor, dot: true,
        });
      }
      return { linhas, nota: FUNCAO_NOTAS[`${painel.chave}|${ano.ano}`] };
    },
  });

  const saude = paineis.find(p => p.nome === "Saúde");
  const shareIni = 100 * saude.valores[0] / (serie[0].total_empenhado * serie[0].ipca_fator_para_2025);
  const shareFim = 100 * saude.valores[saude.valores.length - 1] / (ult.total_empenhado * ult.ipca_fator_para_2025);

  note(root, `<strong>Passe o mouse por qualquer ano de qualquer painel.</strong> Ele mostra quanto aquela função levou,
    quanto isso representou do orçamento, <strong>quanto deu por habitante</strong> e o quanto variou em relação ao ano
    anterior já sem inflação — e conta o que aconteceu, nos anos em que houve algo a contar.`);

  // Conteúdo que vivia num gráfico separado de barras (só 2025). O gráfico foi
  // removido por redundância: estes painéis mostram o mesmo e ainda no tempo.
  // O que não podia se perder era o motivo de Saúde e Educação dominarem — que
  // não é escolha do prefeito — e o ranking completo do último ano.
  const saude25 = ult.funcoes["Saúde"] || 0, educ25 = ult.funcoes["Educação"] || 0;
  note(root, `<strong>Saúde e Educação sozinhas levam ${(100 * (saude25 + educ25) / ult.total_empenhado).toFixed(0)}% de
    tudo que a prefeitura gasta</strong> — e isso não é escolha livre do prefeito. A Constituição obriga o município a
    aplicar no mínimo 15% da receita de impostos em saúde e 25% em educação, e boa parte do dinheiro chega carimbada,
    vinda do SUS e do FUNDEB já com destino definido. A função "Encargos Especiais" é quase toda serviço da dívida:
    juros e amortização de empréstimos.`);


  // Esta nota existe porque é a primeira pergunta que qualquer leitor faz ao
  // ver a Saúde triplicar, e a resposta ("mudou o pagador") não é intuitiva.
  const saudePcIni = saude.valores[0] / serie[0].populacao;
  const saudePcFim = saude.valores[saude.valores.length - 1] / ult.populacao;
  note(root, `<strong>A pergunta óbvia: a Saúde quase triplicou e a população não mudou. Como?</strong> A população de
    Itajubá era 95 mil em ${serie[0].ano} e é 97 mil hoje — e a Saúde saiu de
    <strong>R$ ${fmtInt.format(Math.round(saudePcIni))} para R$ ${fmtInt.format(Math.round(saudePcFim))} por habitante</strong>,
    já corrigido. Ou seja: não foi gente nova, foi mais dinheiro por pessoa. E a maior parte disso não é mais atendimento —
    <strong>é a prefeitura tendo virado a pagadora de um atendimento que já existia</strong>. Até 2015 o repasse do SUS ia
    do Ministério direto ao hospital e não passava pelo caixa municipal; a partir de 2016 passa, e a rubrica "Assistência
    Hospitalar e Ambulatorial" pula de R$ 16 mi para R$ 63 mi sem que um único leito tenha sido criado naquele ano. O
    orçamento cresceu porque mudou de tamanho o que ele <em>contabiliza</em>. Parte do aumento é real (a Atenção Básica
    subiu de R$ 46 mi para R$ 58 mi no período), mas a maior parte é essa troca de mãos.`);

  note(root, `Todos os painéis dividem a mesma régua vertical, então a altura de um vale contra a do outro — por isso a
    Saúde ocupa o quadro inteiro e as demais mal saem do chão. <strong>A Saúde saiu de ${shareIni.toFixed(0)}% do
    orçamento em ${serie[0].ano} para ${shareFim.toFixed(0)}% em ${ult.ano}</strong>. A <strong>Educação</strong> tem
    forma de degrau: plana até 2021, sobe de uma vez em 2022. E o <strong>Urbanismo</strong> é o único com forma de serra
    — dois picos isolados, 2020 e 2024, exatamente os anos de empréstimo (gráfico 6). Repare no que <em>não</em> muda:
    fora Saúde e Educação, quase nenhuma função cresceu de forma sustentada em doze anos. O orçamento de Itajubá não se
    expandiu em várias frentes — concentrou-se em uma.`);

  // Fica por último, depois da prosa: é consulta, não leitura. Substitui o
  // ranking que existia no gráfico de barras removido.
  const todas2025 = Object.entries(ult.funcoes).map(([f, v]) => ({ f, v })).sort((a, b) => b.v - a.v);
  noteToggle(root, `Ver as ${todas2025.length} funções de ${ult.ano}, da maior para a menor`,
    `<p class="viz-note-lead">Valores de ${ult.ano} em reais correntes. Os painéis acima agrupam as menores em
     "Outras".</p>` +
    todas2025.map(x => `<p><strong>${x.f}</strong> · ${fmtMoneyFull(x.v)} ·
      ${(100 * x.v / ult.total_empenhado).toFixed(1).replace(".", ",")}% do orçamento</p>`).join(""));

  renderTable(root, {
    caption: "Despesa por função ao longo do tempo, em R$ de 2025",
    columns: ["Ano"].concat(paineis.map(p => p.nome)),
    rows: serie.map((p, i) => [String(p.ano)].concat(paineis.map(pa => fmtMoneyFull(pa.valores[i])))),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — "onde o aumento foi parar": variação REAL por função, 2015→2025.
// Este é o gráfico que responde a pergunta que o saldo não respondia. O total
// cresceu R$ 212M em valores de 2025; aqui dá pra ver quem ficou com eles.
// ---------------------------------------------------------------------------
function buildDespesaVariacao(root, desp) {
  const st = getComputedStyle(root);
  const posColor = st.getPropertyValue("--v-pos").trim() || "#2a78d6";
  const negColor = st.getPropertyValue("--v-neg").trim() || "#e34948";

  // Corte em R$ 1M: abaixo disso a barra fica invisível e a linha só polui.
  const CORTE = 1e6;
  const comp = desp.comparacao_2015_2025_r2025.filter(c => Math.abs(c.variacao_real_reais) >= CORTE);
  const fora = desp.comparacao_2015_2025_r2025.length - comp.length;

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
    ariaLabelPrefix: "Variação real da despesa por função entre 2015 e 2025",
  });

  const saude = comp.find(c => c.funcao === "Saúde");
  const totalAlta = desp.serie[desp.serie.length - 1].total_empenhado_r2025
    - desp.serie.find(p => p.ano === 2015).total_empenhado_r2025;
  const urb = desp.comparacao_2015_2025_r2025.find(c => c.funcao === "Urbanismo");

  note(root, `Tudo em R$ de 2025, então o que aparece aqui já é aumento <em>além</em> da inflação.
    O orçamento cresceu ${milhoes(totalAlta)} em termos reais no período — e <strong>a Saúde sozinha ficou com
    ${milhoes(saude.variacao_real_reais)}, ou ${(100 * saude.variacao_real_reais / totalAlta).toFixed(0)}% de todo o aumento</strong>.
    No outro extremo, o Urbanismo (obras e serviços urbanos) <strong>encolheu ${pct(urb.variacao_real_pct, 1)}</strong>:
    gasta-se hoje menos com a cidade física do que se gastava em 2015, depois de corrigir pela inflação.
    ${fora > 0 ? `${fora} funções de valor pequeno ficaram fora do gráfico (variação menor que R$ 1 milhão); estão todas na tabela.` : ""}`);

  note(root, `<strong>O que explica o salto da Saúde.</strong> A virada está numa subfunção específica: "Assistência Hospitalar
    e Ambulatorial" saiu de R$ 16,1 milhões em 2015 para R$ 63,1 milhões já em 2016 — quase quatro vezes em um único ano — e
    chegou a R$ 116,8 milhões em 2025 (tudo em R$ de 2025). Hoje é a maior linha isolada do orçamento inteiro. No mesmo ano de
    2016 as transferências recebidas subiram na mesma proporção, o que indica mudança na forma como o atendimento hospitalar
    passou a ser pago: quando um município é habilitado em gestão plena do SUS, o teto financeiro de média e alta complexidade
    (MAC) passa a cair direto no Fundo Municipal de Saúde, e é a prefeitura que paga o hospital, em vez de o repasse ir do
    Ministério para o prestador. <strong>Não localizamos em fonte pública o ato específico que fez essa mudança em Itajubá</strong>
    — fica registrado como pergunta em aberto, não como conclusão. O que é verificável: houve ampliações posteriores do teto MAC
    do município, como as portarias de 2023 que habilitaram no Hospital de Clínicas de Itajubá um Centro de Atendimento de
    Urgência a pacientes com AVC (tipo II) e serviço de oftalmologia, ambas com recursos incorporados ao teto de Itajubá.`);

  renderTable(root, {
    caption: "Variação real da despesa por função, 2015→2025, em R$ de 2025",
    columns: ["Função", "2015 (R$ de 2025)", "2025", "Variação", "Variação %"],
    rows: desp.comparacao_2015_2025_r2025.map(c => [c.funcao, fmtMoneyFull(c.r2025_em_2015),
      fmtMoneyFull(c.r2025_em_2025), fmtMoneyFull(c.variacao_real_reais),
      c.variacao_real_pct == null ? "rubrica nova" : pct(c.variacao_real_pct, 1)]),
  });
}

// ---------------------------------------------------------------------------
// Fase 3 — "os picos de obra são empréstimo": investimento × operação de crédito.
// As duas séries estão na mesma unidade (R$ de 2025), então cabem no mesmo eixo.
// É justamente a coincidência entre elas que é o achado — separar em dois
// gráficos esconderia o que o leitor precisa ver.
// ---------------------------------------------------------------------------
function buildInvestimentoCredito(root, desp, rec) {
  const st = getComputedStyle(root);
  const cInv = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cCred = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const anos = desp.serie.map(p => p.ano);
  const credPorAno = {};
  rec.serie.forEach(p => { credPorAno[p.ano] = p.operacoes_credito * p.ipca_fator_para_2025; });

  renderLineChart(root, {
    series: [
      { key: "inv", label: "Investimento (obras e equipamentos)", color: cInv, points: desp.serie.map(p => ({ y: (p.natureza["Investimentos"] || 0) * p.ipca_fator_para_2025 })) },
      { key: "cred", label: "Empréstimos tomados no ano", color: cCred, points: anos.map(a => ({ y: credPorAno[a] || 0 })) },
    ],
    xValues: anos.map(String),
    yLabel: "Valores em R$ de 2025",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v),
  });

  const ult = desp.serie[desp.serie.length - 1];
  const pri = desp.serie[0];
  const encUlt = ult.funcoes["Encargos Especiais"] * ult.ipca_fator_para_2025;
  const encPri = pri.funcoes["Encargos Especiais"] * pri.ipca_fator_para_2025;

  renderStats(root, [
    { value: milhoes(40.7e6), label: "Empréstimos tomados em 2020", note: "Ano do primeiro pico de obras" },
    { value: milhoes(44.3e6), label: "Empréstimos tomados em 2024", note: "Ano do segundo pico de obras" },
    { value: milhoes(encUlt), label: "Custo da dívida em 2025 (juros + amortização)", note: `Era ${milhoes(encPri)} em 2014, em valores de hoje` },
    { value: (100 * encUlt / (ult.total_empenhado * ult.ipca_fator_para_2025)).toFixed(1).replace(".", ",") + "%", label: "Quanto a dívida come do orçamento", note: "Contra 1,7% em 2014" },
  ]);

  // Os números do texto saem do próprio dado, não são digitados: assim eles
  // não envelhecem quando a série ganhar mais um ano.
  const invPorAno = {};
  desp.serie.forEach(p => { invPorAno[p.ano] = (p.natureza["Investimentos"] || 0) * p.ipca_fator_para_2025; });
  const PICOS = [2020, 2024];
  const normais = Object.entries(invPorAno).filter(([a]) => !PICOS.includes(+a)).map(([, v]) => v);
  const inv2016 = invPorAno[2016];
  const ordenados = Object.values(invPorAno).slice().sort((a, b) => a - b);
  const mediana = (ordenados[5] + ordenados[6]) / 2;
  const posicao2016 = ordenados.filter(v => v < inv2016).length + 1;

  note(root, `As duas linhas sobem juntas, e isso não é coincidência: <strong>Itajubá só faz obra grande em ano que pega
    empréstimo</strong>. Em doze anos houve exatamente dois picos de investimento — 2020 e 2024 — e são exatamente os dois
    anos em que entrou dinheiro de operação de crédito (R$ 40,7 mi e R$ 44,3 mi, corrigidos). Nos outros dez anos o
    investimento fica entre ${milhoes(Math.min(...normais))} e ${milhoes(Math.max(...normais))}, e a subfunção
    "Infraestrutura Urbana" oscila em torno de R$ 10 a 15 milhões — contra R$ 50,9 mi em 2020 e R$ 58,6 mi em 2024.`);

  note(root, `<strong>Um alerta contra a leitura fácil de ciclo eleitoral.</strong> 2020 e 2024 são anos de eleição
    municipal, e é tentador ler os picos como obra de vitrine. Mas o dado não sustenta isso sozinho:
    <strong>2016 também foi ano de eleição e investiu apenas ${milhoes(inv2016)}</strong> — abaixo da mediana da série
    (${milhoes(mediana)}) e o ${posicao2016}º menor valor de doze anos. Ou seja, eleição por si só não produz obra aqui.
    O que se repete nos dois picos é o empréstimo. A conta que vem depois é visível: o custo da dívida saiu de
    ${milhoes(encPri)} ao ano em 2014 para ${milhoes(encUlt)} em 2025, em valores de hoje — mais de dez vezes — e agora consome
    ${(100 * encUlt / (ult.total_empenhado * ult.ipca_fator_para_2025)).toFixed(1).replace(".", ",")}% do orçamento.
    Em maio de 2025 a Câmara aprovou, em primeiro turno, o Projeto de Lei nº 4856/2025, que autoriza nova operação de
    crédito de R$ 70 milhões junto à Caixa Econômica Federal para obras de infraestrutura
    (<a href="https://itajuba.cam.mg.gov.br/site/camara-municipal-de-itajuba-aprova-emprestimo-para-obras-de-infraestrutura-e-discute-demandas-da-populacao-em-sessao-ordinaria/" target="_blank" rel="noopener noreferrer">Câmara Municipal de Itajubá ↗</a>).
    Se for contratada e executada, é o terceiro ciclo do mesmo padrão.`);
}

// ---------------------------------------------------------------------------
// Fase 3 — "de onde vem o dinheiro". Sem isso o leitor supõe que a prefeitura
// arrecada o que gasta, e quase nada aqui é assim.
// ---------------------------------------------------------------------------
function buildReceitaOrigem(root, rec) {
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
    { value: (100 * ult.arrecadacao_propria / ult.receita_bruta).toFixed(0) + "%", label: "É arrecadação própria do município", note: "IPTU, ISS, ITBI, taxas, COSIP e receita patrimonial" },
    { value: milhoes(ult.origens["Impostos e taxas próprios"] || 0), label: "Impostos e taxas cobrados na cidade", note: `Em ${ult.ano}, valores correntes` },
  ]);

  note(root, `Esta é a informação que muda a leitura de todo o resto: <strong>cerca de três quartos do orçamento de Itajubá
    não é dinheiro que a cidade arrecada — é repasse da União e do estado</strong>, e boa parte já chega carimbada para saúde,
    educação ou uma obra específica. A proporção é estável em toda a série (entre 69% e 79% desde 2014). Na prática, a margem
    real de escolha do governo municipal é bem menor que o valor total do orçamento sugere, e a receita da cidade sobe e desce
    conforme a arrecadação federal e estadual — algo sobre o que a prefeitura não tem controle nenhum.`);

  note(root, `Valores brutos, como o SICONFI publica: incluem a parcela retida na fonte para o FUNDEB, que depois volta
    redistribuída pelo estado. Por isso o total aqui é maior que a "receita realizada" do primeiro gráfico desta fase,
    que já vem líquida dessa dedução (${milhoes(ult.deducoes_fundeb)} em ${ult.ano}).
    <strong>Conferência:</strong> ${rec.teste_de_fechamento}`);

  renderTable(root, {
    caption: "Receita bruta por origem, 2014–2025",
    columns: ["Ano", "Receita bruta", "Arrecadação própria", "Transferências", "Empréstimos", "% de transferências"],
    rows: rec.serie.map(p => [String(p.ano), fmtMoneyFull(p.receita_bruta), fmtMoneyFull(p.arrecadacao_propria),
      fmtMoneyFull(p.transferencias), fmtMoneyFull(p.operacoes_credito), p.dependencia_transferencias_pct.toFixed(1).replace(".", ",") + "%"]),
  });
}

// ---------------------------------------------------------------------------
// Monta os gráficos de emprego formal (CEMPRE) dentro de #chart-emprego e
// #chart-empresas.
// ---------------------------------------------------------------------------
function buildEmpregoCharts(assalariadoRoot, empresasRoot, cempre) {
  const xValues = cempre.serie.map(p => String(p.ano));

  if (assalariadoRoot) {
    const cor = getComputedStyle(assalariadoRoot).getPropertyValue("--v-series-receita").trim() || "#08724e";
    renderLineChart(assalariadoRoot, {
      series: [{ key: "assalariado", label: "Pessoal ocupado assalariado", color: cor, points: cempre.serie.map(p => ({ y: p.pessoal_ocupado_assalariado })) }],
      xValues, yLabel: "Pessoas",
      yFormat: (v) => fmtMoneyCompact(v), yFormatFull: (v) => fmtInt.format(Math.round(v)) + " pessoas",
    });
    renderTable(assalariadoRoot, {
      caption: "Pessoal ocupado assalariado em Itajubá/MG, 2006–2021",
      columns: ["Ano", "Pessoal ocupado assalariado", "Salário médio mensal"],
      rows: cempre.serie.map(p => [String(p.ano), fmtInt.format(p.pessoal_ocupado_assalariado), "R$ " + p.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })]),
    });
    const ultimo = cempre.serie[cempre.serie.length - 1];
    const primeiro = cempre.serie[0];
    renderStats(assalariadoRoot, [
      { value: fmtInt.format(ultimo.pessoal_ocupado_assalariado), label: `Pessoal ocupado assalariado · ${ultimo.ano}` },
      { value: "R$ " + ultimo.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), label: `Salário médio mensal (nominal) · ${ultimo.ano}`, note: `Era R$ ${primeiro.salario_medio_mensal_reais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} em ${primeiro.ano} — sem ajuste pela inflação` },
    ]);
    const note = document.createElement("p");
    note.className = "viz-note";
    note.textContent = "Substitui RAIS/Novo CAGED nesta fase: aqueles são microdados que exigem baixar e processar arquivos em lote, sem API simples. O CEMPRE (Cadastro Central de Empresas) do IBGE cobre a mesma pergunta — emprego formal — pronto via SIDRA, mas é uma série encerrada em 2021 (o IBGE não atualizou depois disso).";
    assalariadoRoot.appendChild(note);
  }

  if (empresasRoot) {
    const cEmpresas = getComputedStyle(empresasRoot).getPropertyValue("--v-series-receita").trim() || "#08724e";
    const cUnidades = getComputedStyle(empresasRoot).getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
    renderLineChart(empresasRoot, {
      series: [
        { key: "empresas", label: "Empresas atuantes", color: cEmpresas, points: cempre.serie.map(p => ({ y: p.empresas_atuantes })) },
        { key: "unidades", label: "Unidades locais", color: cUnidades, points: cempre.serie.map(p => ({ y: p.unidades_locais })) },
      ],
      xValues, yLabel: "Unidades",
      yFormat: (v) => fmtInt.format(Math.round(v)), yFormatFull: (v) => fmtInt.format(Math.round(v)) + " unidades",
    });
    renderTable(empresasRoot, {
      caption: "Empresas e unidades locais atuantes em Itajubá/MG, 2006–2021",
      columns: ["Ano", "Empresas atuantes", "Unidades locais"],
      rows: cempre.serie.map(p => [String(p.ano), fmtInt.format(p.empresas_atuantes), fmtInt.format(p.unidades_locais)]),
    });
    const note = document.createElement("p");
    note.className = "viz-note";
    note.textContent = "Unidades locais ≥ empresas porque uma empresa pode ter mais de um endereço (filiais) contado separadamente. Os dois recuaram entre 2014 e 2018 — mesmo período em que o pessoal ocupado assalariado também caiu no gráfico acima.";
    empresasRoot.appendChild(note);
  }
}

// ---------------------------------------------------------------------------
// Monta o gráfico de PIB dentro de #chart-pib.
// ---------------------------------------------------------------------------
function buildEconomiaChart(root, pib) {
  const xValues = pib.pib_total.map(p => String(p.ano));
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";
  renderLineChart(root, {
    series: [{ key: "pib", label: "PIB total", color: cor, points: pib.pib_total.map(p => ({ y: p.valor_mil_reais * 1000 })) }],
    xValues, yLabel: "PIB a preços correntes (R$)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v), yFormatFull: (v) => fmtMoneyFull(v),
  });
  renderTable(root, {
    caption: "PIB total de Itajubá/MG a preços correntes, 2002–2023",
    columns: ["Ano", "PIB total"],
    rows: pib.pib_total.map(p => [String(p.ano), fmtMoneyFull(p.valor_mil_reais * 1000)]),
  });

  const c = pib.composicao_setorial_2021;
  const pctOfTotal = (v) => (v / c.pib_total * 100).toFixed(1).replace(".", ",") + "%";
  renderStats(root, [
    { value: pctOfTotal(c.servicos), label: "Serviços — % do PIB · 2021" },
    { value: pctOfTotal(c.industria), label: "Indústria — % do PIB · 2021" },
    { value: pctOfTotal(c.administracao_publica), label: "Administração pública — % do PIB · 2021" },
    { value: pctOfTotal(c.agropecuaria), label: "Agropecuária — % do PIB · 2021" },
  ]);
  const somaSetores = c.agropecuaria + c.industria + c.servicos + c.administracao_publica;
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = `Valores correntes de cada ano, sem ajuste pela inflação — não comparar a variação ano a ano como se fosse crescimento real. A composição por setor só existe até 2021 nesta tabela do IBGE (2022–2023 ainda não têm a quebra publicada); os 4 setores acima somam ${pctOfTotal(somaSetores)} do PIB — o restante (${pctOfTotal(c.impostos_liquidos)}) são impostos líquidos de subsídios sobre produtos.`;
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta os gráficos de compras públicas (PNCP) dentro de #chart-compras.
// ---------------------------------------------------------------------------
function buildComprasChart(root, pncp) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-receita").trim() || "#08724e";

  subhead(root, "Por categoria de objeto");
  renderBarsHorizontal(root, {
    data: pncp.por_categoria,
    labelKey: "categoria", valueKey: "quantidade",
    valueFormat: (v) => fmtInt.format(v), valueFormatFull: (v) => fmtInt.format(v) + " processos",
    color: cor, ariaLabelPrefix: "Processos de compra por categoria de objeto",
  });
  renderTable(root, {
    caption: "Processos de compra da Prefeitura de Itajubá por categoria, jan/2025–ago/2026",
    columns: ["Categoria", "Processos", "Valor estimado somado"],
    rows: pncp.por_categoria.map(c => [c.categoria, fmtInt.format(c.quantidade), fmtMoneyFull(c.valor_estimado)]),
  });

  subhead(root, "Ao longo do tempo");
  renderLineChart(root, {
    series: [{ key: "processos", label: "Processos publicados", color: cor, points: pncp.por_mes.map(p => ({ y: p.quantidade })) }],
    xValues: pncp.por_mes.map(p => p.mes_label), yLabel: "Processos por mês",
    yFormat: (v) => fmtInt.format(Math.round(v)), yFormatFull: (v) => fmtInt.format(Math.round(v)) + " processos",
  });
  renderTable(root, {
    caption: "Processos de compra da Prefeitura de Itajubá por mês, jan/2025–ago/2026",
    columns: ["Mês", "Processos", "Valor estimado somado"],
    rows: pncp.por_mes.map(p => [p.mes_label, fmtInt.format(p.quantidade), fmtMoneyFull(p.valor_estimado)]),
  });

  renderStats(root, [
    { value: fmtInt.format(pncp.total_processos), label: `Processos publicados · ${pncp.periodo_label}` },
    { value: "R$ " + fmtMoneyCompact(pncp.valor_total_estimado), label: "Valor total estimado somado", note: fmtMoneyFull(pncp.valor_total_estimado) },
  ]);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = pncp.observacao;
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta o gráfico de Portarias da Câmara dentro de #chart-legislativo.
// ---------------------------------------------------------------------------
function buildLegislativoChart(root, siscam) {
  const cor = getComputedStyle(root).getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  renderBarsHorizontal(root, {
    data: siscam.serie.map(p => ({ ano: p.completo ? String(p.ano) : `${p.ano} (até ago)`, quantidade: p.portarias_emitidas })),
    labelKey: "ano", valueKey: "quantidade",
    valueFormat: (v) => fmtInt.format(v), valueFormatFull: (v) => fmtInt.format(v) + " portarias",
    color: cor, ariaLabelPrefix: "Portarias emitidas pela Câmara Municipal, por ano",
  });
  renderTable(root, {
    caption: "Portarias emitidas pela Câmara Municipal de Itajubá, por ano",
    columns: ["Ano", "Portarias emitidas"],
    rows: siscam.serie.map(p => [p.completo ? String(p.ano) : `${p.ano} (até ${p.nota || "ago"})`, fmtInt.format(p.portarias_emitidas)]),
  });
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = siscam.observacao;
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta o painel síntese dentro de #painel-sintese — 1 número por fase, sem
// refazer os gráficos já mostrados acima.
// ---------------------------------------------------------------------------
function buildPainelSintese(root, docs) {
  const items = [];
  if (docs.pop) {
    const ultimo = docs.pop.serie.filter(p => p.populacao != null).slice(-1)[0];
    items.push({ value: fmtInt.format(ultimo.populacao), label: `População · ${ultimo.ano}` });
  }
  if (docs.ips) items.push({ value: docs.ips.indicadores.ips_geral.toFixed(2).replace(".", ","), label: "IPS Brasil · edição 2026" });
  if (docs.fin) {
    const ultimo = docs.fin.serie[docs.fin.serie.length - 1];
    items.push({ value: "R$ " + fmtMoneyCompact(ultimo.saldo), label: `Saldo orçamentário · ${ultimo.ano}`, note: ultimo.saldo >= 0 ? "Superávit" : "Déficit" });
  }
  if (docs.snapshot) {
    const s = docs.snapshot.indicadores.saude.mortalidade_infantil;
    items.push({ value: s.valor.toFixed(1).replace(".", ","), label: `Mortalidade infantil (por mil) · ${s.ano}` });
  }
  if (docs.educ) {
    const ultimo = docs.educ.alfabetizacao.serie[docs.educ.alfabetizacao.serie.length - 1];
    items.push({ value: ultimo.taxa.toFixed(1).replace(".", ",") + "%", label: `Alfabetização · ${ultimo.ano}` });
  }
  if (docs.setores) {
    const pop = docs.setores.setores.reduce((a, s) => a + s.populacao, 0);
    const area = docs.setores.setores.reduce((a, s) => a + s.area_km2, 0);
    items.push({ value: fmtInt.format(Math.round(pop / area)), label: "Densidade média (hab./km²)", note: "192 setores censitários, Censo 2022" });
  }
  if (docs.siscam) {
    const ultimo = docs.siscam.serie.filter(p => p.completo).slice(-1)[0];
    if (ultimo) items.push({ value: fmtInt.format(ultimo.portarias_emitidas), label: `Portarias da Câmara · ${ultimo.ano}` });
  }
  if (docs.pib) {
    const ultimo = docs.pib.pib_total[docs.pib.pib_total.length - 1];
    items.push({ value: "R$ " + fmtMoneyCompact(ultimo.valor_mil_reais * 1000), label: `PIB total · ${ultimo.ano}` });
  }
  if (docs.cempre) {
    const ultimo = docs.cempre.serie[docs.cempre.serie.length - 1];
    items.push({ value: fmtInt.format(ultimo.pessoal_ocupado_assalariado), label: `Pessoal ocupado assalariado · ${ultimo.ano}` });
  }
  if (docs.pncp) {
    items.push({ value: fmtInt.format(docs.pncp.total_processos), label: `Processos de compra · ${docs.pncp.periodo_label}` });
  }
  renderStats(root, items);
  const note = document.createElement("p");
  note.className = "viz-note";
  note.textContent = "Cada número vem da fase correspondente acima, com a mesma fonte e ressalvas — este painel só resume, não recalcula nada.";
  root.appendChild(note);
}

// ---------------------------------------------------------------------------
// Monta a seção do IDU-Br dentro de #idu-br: score, faixa de confiança e a
// matriz por domínio, com o motivo de cada nota.
// ---------------------------------------------------------------------------
function buildIduBrSection(root, idu) {
  const r = idu.resultado;
  renderStats(root, [
    { value: r.IDU_E.toFixed(1).replace(".", ","), label: "IDU-Br (ecossistema próprio)", note: `Faixa ${r.IDU_E_faixa[0].toFixed(1)}–${r.IDU_E_faixa[1].toFixed(1)} · escala 0–100` },
    { value: r.C_IDU.toFixed(0), label: "Confiança da avaliação (C-IDU)", note: r.C_IDU_faixa_qualitativa },
  ]);

  const explain = document.createElement("p");
  explain.className = "viz-note";
  explain.textContent = idu.observacao_geral;
  root.appendChild(explain);

  const table = document.createElement("table");
  table.className = "idu-table";
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Domínio</th><th>Melhor fonte encontrada</th><th>Nota (0–100)</th><th>Por quê</th></tr>";
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  idu.por_dominio.forEach(d => {
    const tr = document.createElement("tr");
    const tdDom = document.createElement("td"); tdDom.textContent = d.dominio; tr.appendChild(tdDom);
    const tdFonte = document.createElement("td"); tdFonte.textContent = d.camada; tr.appendChild(tdFonte);
    const tdNota = document.createElement("td"); tdNota.textContent = d.Q_0_100.toFixed(1).replace(".", ","); tr.appendChild(tdNota);
    const tdNote = document.createElement("td"); tdNote.textContent = d.nota; tr.appendChild(tdNote);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  // Tabela de 4 colunas com texto corrido não encolhe abaixo do seu min-content:
  // sem um contêiner que role, ela empurrava a PÁGINA na horizontal no celular.
  // Quem rola é a tabela, não o documento.
  const scroll = document.createElement("div");
  scroll.className = "viz-scroll-x";
  scroll.appendChild(table);
  root.appendChild(scroll);

  const note2 = document.createElement("p");
  note2.className = "viz-note";
  note2.textContent = `Avaliação de 1 pessoa só nesta sessão, sem segunda codificação independente — por isso C-IDU fica em "média", não "alta" (o componente de concordância independente zera). P-Piloto (adequação de porte para um primeiro piloto nacional) seria ${idu.resultado.P_Piloto.toFixed(1)}, mas não é usado aqui: Itajubá já é o piloto escolhido, essa nota serve para comparar candidatas, não para reavaliar quem já entrou.`;
  root.appendChild(note2);
}

// ---------------------------------------------------------------------------
// Fase 10 — segurança pública, pela SEJUSP-MG.
//
// A régua estadual entra no mesmo gráfico de propósito: um número de
// criminalidade sozinho não diz nada. "50 crimes violentos" é muito ou pouco?
// Só a comparação responde — e as duas séries estão na mesma unidade (taxa por
// 100 mil), então cabem no mesmo eixo sem truque de escala.
//
// O ano parcial fica FORA da linha. 2026 tem só metade dos meses e entraria
// como uma queda que não aconteceu; ele aparece no texto e na tabela, não no
// desenho.
// ---------------------------------------------------------------------------
function buildSegurancaChart(root, seg, desp) {
  const st = getComputedStyle(root);
  const cCidade = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cEstado = st.getPropertyValue("--v-series-3").trim() || "#eb6834";

  const cheios = seg.serie.filter(p => !p.ano_parcial);
  const reguaPorAno = Object.fromEntries(seg.regua_minas_gerais.map(p => [p.ano, p]));

  renderLineChart(root, {
    series: [
      { key: "cidade", label: "Itajubá", color: cCidade, points: cheios.map(p => ({ y: p.taxa_por_100mil })) },
      { key: "mg", label: "Minas Gerais (todos os 853 municípios)", color: cEstado, points: cheios.map(p => ({ y: (reguaPorAno[p.ano] || {}).taxa_por_100mil })) },
    ],
    xValues: cheios.map(p => String(p.ano)),
    yLabel: "Crimes violentos registrados por 100 mil habitantes",
    yFormat: (v) => fmtInt.format(Math.round(v)),
    yFormatFull: (v) => fmtInt.format(Math.round(v)) + " por 100 mil hab.",
  });

  const pico = cheios.slice().sort((a, b) => b.taxa_por_100mil - a.taxa_por_100mil)[0];
  const ult = cheios[cheios.length - 1];
  const mgUlt = reguaPorAno[ult.ano] || {};
  const parcial = seg.serie.find(p => p.ano_parcial);
  const totalHom = seg.serie.reduce((a, p) => a + p.vitimas_homicidio, 0);

  renderStats(root, [
    { value: fmtInt.format(ult.total_crimes_violentos), label: `Crimes violentos registrados · ${ult.ano}`, note: `Eram ${fmtInt.format(pico.total_crimes_violentos)} no pico, em ${pico.ano}` },
    { value: pct(100 * (ult.taxa_por_100mil / pico.taxa_por_100mil - 1)), label: `Variação da taxa, ${pico.ano}→${ult.ano}`, note: "Por 100 mil habitantes, já sem efeito de população" },
    { value: fmtInt.format(Math.round(ult.taxa_por_100mil)), label: `Taxa de Itajubá · ${ult.ano}`, note: `Minas Gerais no mesmo ano: ${fmtInt.format(Math.round(mgUlt.taxa_por_100mil))}` },
    { value: fmtInt.format(ult.vitimas_homicidio), label: `Vítimas de homicídio · ${ult.ano}`, note: `${totalHom} em toda a série, de 2012 a ${parcial ? parcial.ano : ult.ano}` },
  ]);

  note(root, `<strong>A criminalidade registrada em Itajubá caiu — e caiu mais do que a média do estado.</strong>
    A taxa saiu de ${fmtInt.format(Math.round(pico.taxa_por_100mil))} por 100 mil habitantes em ${pico.ano} para
    ${fmtInt.format(Math.round(ult.taxa_por_100mil))} em ${ult.ano}, uma queda de
    ${pct(100 * (ult.taxa_por_100mil / pico.taxa_por_100mil - 1))}. Minas Gerais também caiu no período, então parte
    disso é tendência estadual e não mérito local — mas <strong>Itajubá está sistematicamente abaixo da linha do
    estado</strong> em toda a série, e a distância aumentou.`);

  if (desp) {
    const s = desp.serie;
    const a0 = s[0], a1 = s[s.length - 1];
    const g0 = (a0.funcoes["Segurança Pública"] || 0) * a0.ipca_fator_para_2025;
    const g1 = (a1.funcoes["Segurança Pública"] || 0) * a1.ipca_fator_para_2025;
    note(root, `<strong>A tentação aqui é cruzar com o orçamento — e é justamente o que não dá para fazer.</strong>
      A função "Segurança Pública" da Prefeitura saiu de ${milhoes(g0)} em ${a0.ano} para ${milhoes(g1)} em
      ${a1.ano}, corrigido pela inflação: ${pct(100 * (g1 / g0 - 1))}. As duas curvas andam em sentidos opostos, o
      que é uma coincidência tentadora. Mas <strong>esse dinheiro não é polícia</strong>: Polícia Militar e Civil
      são do estado e não passam pelo orçamento municipal. O que a Prefeitura paga com essa rubrica é Guarda
      Municipal, trânsito e Defesa Civil. Quem registra as ocorrências do gráfico acima é a polícia estadual.
      Atribuir a queda ao gasto municipal seria inventar uma causa que o dado não sustenta.`);
  }

  subhead(root, "Que crimes são esses");
  const acum = {};
  seg.serie.forEach(p => Object.entries(p.por_natureza).forEach(([k, v]) => { acum[k] = (acum[k] || 0) + v; }));
  const dados = Object.entries(acum).map(([natureza, n]) => ({ natureza, n })).sort((a, b) => b.n - a.n);
  const total = dados.reduce((s, d) => s + d.n, 0);
  renderBarsHorizontal(root, {
    data: dados, labelKey: "natureza", valueKey: "n",
    valueFormat: (v) => fmtInt.format(v),
    valueFormatFull: (v) => `${fmtInt.format(v)} registros (${(100 * v / total).toFixed(1).replace(".", ",")}% do total)`,
    color: cCidade, ariaLabelPrefix: "Crimes violentos por natureza, 2012–2026",
  });

  const roubo = dados.filter(d => /roubo/i.test(d.natureza)).reduce((s, d) => s + d.n, 0);
  note(root, `Somando os quinze anos, <strong>roubo é ${(100 * roubo / total).toFixed(0)}% de tudo que entra na
    conta de "crime violento"</strong> em Itajubá. O agrupamento é da própria SEJUSP e mistura coisas de gravidade
    muito diferente — roubo consumado, homicídio tentado, estupro, extorsão —, por isso a abertura por natureza
    importa: uma queda no total é, sobretudo, uma queda em roubo.`);

  note(root, `<strong>Três ressalvas que valem para qualquer dado de criminalidade.</strong> Primeiro, isto são
    <em>registros</em> de ocorrência: dependem de a vítima ter notificado e de a polícia ter lavrado o boletim, o
    que mede criminalidade <em>registrada</em>, não criminalidade real — e a subnotificação varia por tipo de crime,
    sendo notoriamente alta em crimes sexuais. Segundo, a base chega ao município mas não abaixo dele: não há
    recorte por bairro, então este é o único domínio do piloto sem camada territorial. Terceiro,
    ${parcial ? `<strong>${parcial.ano} é ano parcial</strong> (vai até ${seg.ate_o_mes}, com ${fmtInt.format(parcial.total_crimes_violentos)} registros) e por isso ficou fora da linha do gráfico` : "a série termina no último ano fechado"} —
    comparar meio ano com anos inteiros produziria uma queda que não existe.`);

  renderTable(root, {
    caption: "Crimes violentos e vítimas de homicídio em Itajubá/MG, 2012–2026",
    columns: ["Ano", "Crimes violentos", "Por 100 mil hab.", "MG por 100 mil hab.", "Vítimas de homicídio"],
    rows: seg.serie.map(p => [
      p.ano_parcial ? `${p.ano} (até ${seg.ate_o_mes})` : String(p.ano),
      fmtInt.format(p.total_crimes_violentos),
      p.taxa_por_100mil == null ? "—" : fmtInt.format(Math.round(p.taxa_por_100mil)),
      fmtInt.format(Math.round((reguaPorAno[p.ano] || {}).taxa_por_100mil || 0)),
      fmtInt.format(p.vitimas_homicidio)]),
  });
}

// ---------------------------------------------------------------------------
// RANKING de 15 municípios, com uma ou duas séries por linha e, opcionalmente,
// linhas de referência verticais.
//
// As referências são o que torna o número legível. "Caracaraí tem 47.380 km²"
// não diz nada a quem não guarda áreas de cor; "Caracaraí passa da linha do
// estado do Rio de Janeiro" diz. O mesmo vale para a dependência de
// transferências: os 15 municípios de Roraima só ganham escala quando as quatro
// cidades já publicadas no piloto aparecem como marcas na mesma régua.
//
// Duas séries são o teto aqui, e por decisão: com três, barras finas lado a
// lado viram textura e o leitor deixa de comparar linha com linha.
// ---------------------------------------------------------------------------
function renderBarrasRanking(root, { data, labelKey, series, valueFormat, valueFormatFull, referencias, ariaLabel, notaKey }) {
  const dupla = series.length > 1;
  const rowH = dupla ? 40 : 30;
  const refs = referencias || [];
  // Duas alturas para os rótulos das referências. Com uma só, "Rio de Janeiro"
  // (43.750 km²) e "Espírito Santo" (46.074 km²) caem a 4 px um do outro e os
  // nomes se atropelam. A segunda fileira só é reservada quando alguma dupla de
  // fato colide — senão sobraria um vão vazio no topo de todo gráfico.
  const larguraRot = (s) => s.length * 5.6 + 10;
  const W = 760;
  const Mleft = 158, Mright = 78;
  const innerW = W - Mleft - Mright;
  const todos = data.flatMap(d => series.map(s => d[s.chave])).filter(v => v != null)
    .concat(refs.map(r => r.valor));
  const maxV = niceMax(Math.max(...todos) * 1.04);
  const x = (v) => (innerW * v) / maxV;

  // distribui as referências em uma ou duas fileiras, conforme colidam
  const refsOrd = refs.slice().sort((a, b) => a.valor - b.valor);
  let fimDaFileira = [-Infinity, -Infinity];
  refsOrd.forEach(r => {
    const meia = larguraRot(r.rotulo) / 2;
    const esq = x(r.valor) - meia;
    r.fileira = esq >= fimDaFileira[0] ? 0 : (esq >= fimDaFileira[1] ? 1 : 0);
    fimDaFileira[r.fileira] = x(r.valor) + meia;
  });
  const fileiras = refsOrd.some(r => r.fileira === 1) ? 2 : 1;
  const M = { top: refs.length ? 14 + fileiras * 13 : 8, right: Mright, bottom: 10, left: Mleft };
  const H = M.top + M.bottom + data.length * rowH;

  if (dupla) legend(root, series.map(s => ({ label: s.rotulo, color: s.cor })));

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": ariaLabel || "" }, wrap);
  const tip = makeTooltip(wrap);

  // referências primeiro, para ficarem atrás das barras
  refsOrd.forEach(r => {
    const px = M.left + x(r.valor);
    const topo = 4 + r.fileira * 13;
    el("line", {
      x1: px, x2: px, y1: topo + 8, y2: H - M.bottom, stroke: "var(--v-text-secondary)",
      "stroke-width": 1, "stroke-dasharray": "4 3", opacity: .55,
    }, svg);
    const t = el("text", {
      x: px, y: topo + 5, "text-anchor": "middle", class: "viz-ref-label",
    }, svg);
    t.textContent = r.rotulo;
  });

  data.forEach((d, i) => {
    const y0 = M.top + i * rowH;
    const rotulo = el("text", { x: M.left - 10, y: y0 + rowH / 2 + 4, "text-anchor": "end", class: "viz-axis-text" }, svg);
    rotulo.textContent = d[labelKey];

    const barH = dupla ? 12 : 17;
    const vao = dupla ? 3 : 0;
    const alturaTotal = series.length * barH + (series.length - 1) * vao;
    series.forEach((s, k) => {
      const v = d[s.chave];
      if (v == null) return;
      const by = y0 + (rowH - alturaTotal) / 2 + k * (barH + vao);
      const w = Math.max(2, x(v));
      const bar = el("rect", {
        class: "viz-bar", x: M.left, y: by, width: w, height: barH, rx: 4, fill: s.cor,
        tabindex: 0, role: "img",
        "aria-label": `${d[labelKey]}, ${s.rotulo}: ${valueFormatFull(v)}`,
      }, svg);
      // Cada barra traz o próprio número no fim. Rotular só a primeira série
      // deixava sem número exatamente a segunda metade da comparação — num
      // gráfico cujo assunto É o contraste entre os dois valores.
      const vl = el("text", {
        x: M.left + w + 8, y: by + barH / 2 + 4, class: "viz-axis-text",
      }, svg);
      vl.textContent = valueFormat(v);
      function onEnter() {
        const r = svg.getBoundingClientRect(), sc = r.width / W;
        showTooltip(tip, wrap, (M.left + w) * sc, by * sc, String(d[labelKey]),
          series.filter(ss => d[ss.chave] != null)
            .map(ss => ({ label: ss.rotulo, value: valueFormatFull(d[ss.chave]), color: ss.cor, dot: true })),
          notaKey ? d[notaKey] : null);
      }
      bar.addEventListener("pointerenter", onEnter);
      bar.addEventListener("focus", onEnter);
      bar.addEventListener("pointerleave", () => hideTooltip(tip));
      bar.addEventListener("blur", () => hideTooltip(tip));
    });
  });
}

// ---------------------------------------------------------------------------
// MAPA DE UM ESTADO INTEIRO, por município — o recorte fechado.
//
// Por que não dá para reusar renderChoroplethMap. Aquele desenha os setores
// censitários de UMA cidade: os campos que ele lê (setor, situacao, domicilios),
// o texto da legenda e o contorno único são de lá. Aqui a unidade é o município
// e há 15 deles, o que muda três coisas de fundo:
//
//   1) CABE RÓTULO. 400 setores não cabem; 15 municípios cabem, e um mapa que
//      diz o nome de cada área no próprio desenho não obriga o leitor a passar
//      o mouse em tudo para saber o que está vendo. O ponto do rótulo vem do
//      arquivo de malha, já calculado como o ponto interno mais distante da
//      borda — centroide cairia fora em município côncavo.
//   2) O MESMO MAPA SERVE A VÁRIOS INDICADORES. A geometria é cara de carregar
//      e idêntica; trocar só o valor que pinta custa nada e deixa comparar
//      população, dependência de transferências e composição do PIB no mesmo
//      território, sem rolar a página.
//   3) A COR AQUI NÃO É CATEGÓRICA. É rampa sequencial de um matiz só, porque
//      representa grandeza, não identidade. É por isso que 15 áreas não esbarram
//      no teto de 4 cores do comparador: lá a cor diz QUEM, aqui diz QUANTO.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// LINHA DO TEMPO NO MAPA — passos de Censo, com setas de origem.
//
// Este é o componente mais perigoso da página, e o comentário existe para dizer
// por quê: seta animada convence antes de o leitor pensar. Uma flecha grossa
// saindo do Maranhão e entrando em Boa Vista é aceita como fato em meio segundo,
// e ninguém vai atrás da fonte. Então as regras aqui são mais duras que as dos
// outros gráficos:
//
//   1) A ANIMAÇÃO SALTA ENTRE OBSERVAÇÕES, NÃO INTERPOLA. Origem de migrante só
//      é medida em Censo, de dez em dez anos. Movimento desenhado *entre* dois
//      Censos seria invenção com aparência de medição, então cada passo é uma
//      foto e a transição é só o desenho aparecendo — nunca gente andando pelo
//      mapa ao longo de anos que ninguém mediu.
//   2) A DIREÇÃO DA SETA É GEOGRÁFICA DE VERDADE. O ângulo sai do rumo entre o
//      centro da UF de origem e o do destino, projetado no mesmo sistema do
//      mapa. Quem veio do Maranhão entra pelo leste porque o Maranhão fica a
//      leste, não porque ficou bonito.
//   3) A ESPESSURA É A RAIZ DO NÚMERO, não o número. Largura proporcional ao
//      valor faria a maior seta ter 30 vezes a área da menor para 30 vezes a
//      gente — o olho lê área, e a leitura sairia exagerada.
//   4) O QUE NÃO TEM MATRIZ NÃO TEM SETA. A chegada venezuelana é o movimento
//      mais recente do estado e NÃO tem tabela de origem por município em 2022;
//      ela aparece como contagem de estrangeiros, sem flecha.
//
// Respeita prefers-reduced-motion: sem autoplay e sem transição para quem pediu
// menos movimento — os mesmos passos continuam navegáveis pelos botões.
// ---------------------------------------------------------------------------
function renderLinhaDoTempo(root, { malha, dados, passos }) {
  const W = 720, H = 560, M = 16;
  const menosMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const pts = (malha.contorno_estado.length ? malha.contorno_estado
    : malha.municipios.flatMap(m => m.aneis)).flat();
  const lats = pts.map(p => p[1]), lons = pts.map(p => p[0]);
  const latMin = Math.min(...lats), latMax = Math.max(...lats);
  const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
  const cosLat = Math.cos(((latMin + latMax) / 2) * Math.PI / 180);
  const spanX = (lonMax - lonMin) * cosLat, spanY = latMax - latMin;
  const escala = Math.min((W - 2 * M) / spanX, (H - 2 * M - 26) / spanY) * 0.82;
  const offX = M + ((W - 2 * M) - spanX * escala) / 2;
  const offY = M + ((H - 2 * M - 26) - spanY * escala) / 2;
  const px = (lon) => offX + (lon - lonMin) * cosLat * escala;
  const py = (lat) => offY + (latMax - lat) * escala;
  const ringD = (r) => "M" + r.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join("L") + "Z";

  const porCod = {};
  dados.municipios.forEach(m => { porCod[m.ibge] = m; });
  const centroEstado = [(px(lonMin) + px(lonMax)) / 2, (py(latMin) + py(latMax)) / 2];

  const cs = getComputedStyle(root);
  const ramp = readSeqRamp(root);
  const corSeta = cs.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const corIndigena = cs.getPropertyValue("--v-series-receita").trim() || "#08724e";

  // ---- controles -----------------------------------------------------------
  const barra = document.createElement("div");
  barra.className = "viz-tl-controles";
  const btn = (txt, rot, cls) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "viz-tl-btn" + (cls ? " " + cls : "");
    b.textContent = txt; b.setAttribute("aria-label", rot); b.title = rot;
    barra.appendChild(b); return b;
  };
  const bAnt = btn("◀", "Passo anterior");
  const bPlay = btn("▶", "Tocar a linha do tempo", "play");
  const bProx = btn("▶", "Próximo passo");
  bProx.classList.add("passo");
  const trilha = document.createElement("div");
  trilha.className = "viz-tl-trilha";
  trilha.setAttribute("role", "tablist");
  trilha.setAttribute("aria-label", "Passos da linha do tempo");
  barra.appendChild(trilha);
  root.appendChild(barra);

  const marcas = passos.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "viz-tl-marca";
    b.setAttribute("role", "tab");
    b.innerHTML = `<span class="viz-tl-ano">${p.ano}</span><span class="viz-tl-rot">${p.rotulo}</span>`;
    b.addEventListener("click", () => { parar(); ir(i); });
    trilha.appendChild(b);
    return b;
  });

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap viz-map-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" }, wrap);
  const defs = el("defs", {}, svg);
  const seta = el("marker", {
    id: "tl-ponta-" + Math.random().toString(36).slice(2, 7), viewBox: "0 0 10 10",
    refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse",
  }, defs);
  el("path", { d: "M0,0 L10,5 L0,10 z", fill: corSeta }, seta);
  const setaId = seta.getAttribute("id");

  const gMun = el("g", {}, svg);
  const gContorno = el("g", { "pointer-events": "none" }, svg);
  const gSetas = el("g", { "pointer-events": "none" }, svg);
  const gRot = el("g", { "pointer-events": "none" }, svg);
  const tip = makeTooltip(wrap);

  const formas = malha.municipios.map(m => {
    const path = el("path", {
      d: m.aneis.map(ringD).join(" "), stroke: "var(--v-surface)", "stroke-width": 0.8,
      "fill-rule": "evenodd", class: "viz-map-mun", tabindex: 0, role: "img",
    }, gMun);
    return { m, path, d: porCod[m.ibge] };
  });
  (malha.contorno_estado || []).forEach(r => el("path", {
    d: ringD(r), fill: "none", stroke: "var(--v-text-primary)", "stroke-width": 1.6,
    "stroke-linejoin": "round",
  }, gContorno));

  // ---- narração ------------------------------------------------------------
  const narra = document.createElement("div");
  narra.className = "viz-tl-narracao";
  narra.setAttribute("role", "status");
  narra.setAttribute("aria-live", "polite");
  root.appendChild(narra);

  // ---- estado --------------------------------------------------------------
  let atual = 0, tocando = false, timer = null, alvoSetas = null;

  // Espessura pela RAIZ do volume: o olho lê a área da faixa, e largura
  // proporcional ao número exageraria a diferença entre a maior e a menor.
  const largura = (v, vmax) => 1.2 + 7.5 * Math.sqrt(Math.max(0, v) / vmax);

  // Cada passo traz as PRÓPRIAS setas. Antes a função lia sempre a matriz de
  // 2010, que era a única existente; com 1991 e 2000 entrando — medidos só no
  // nível de estado —, quem sabe de onde vem cada conjunto é o passo.
  function fluxosDe(codDestino) {
    const passo = passos[atual];
    return passo.fluxos ? passo.fluxos(passo.permiteFoco ? codDestino : null) : [];
  }

  // Onde a seta encosta quando o destino é o estado inteiro: no ponto em que a
  // reta que vem da origem cruza a FRONTEIRA de Roraima, não num ponto qualquer
  // do interior. Fazendo a ponta parar no meio do estado, todas as setas
  // convergiam para as redondezas de Iracema e o mapa dizia, sem querer, que a
  // migração toda foi para lá.
  const contornoProj = (malha.contorno_estado || []).map(r => r.map(([lo, la]) => [px(lo), py(la)]));
  function pontoNaFronteira(cx, cy, dx, dy) {
    let melhor = null, melhorT = 0;
    contornoProj.forEach(anel => {
      for (let i = 0; i < anel.length - 1; i++) {
        const [x1, y1] = anel[i], [x2, y2] = anel[i + 1];
        const ex = x2 - x1, ey = y2 - y1;
        const den = dx * ey - dy * ex;
        if (Math.abs(den) < 1e-9) continue;
        const t = ((x1 - cx) * ey - (y1 - cy) * ex) / den;
        const u = ((x1 - cx) * dy - (y1 - cy) * dx) / den;
        if (t > 0 && u >= 0 && u <= 1 && t > melhorT) {
          melhorT = t; melhor = [cx + dx * t, cy + dy * t];
        }
      }
    });
    return melhor;
  }

  function desenharSetas(codDestino, animar) {
    gSetas.textContent = "";
    const passo = passos[atual];
    if (!passo.setas) return;
    const fs = fluxosDe(codDestino).slice(0, 8);
    if (!fs.length) return;
    const vmax = fs[0].pessoas;
    const alvoMun = codDestino
      ? (() => { const m = malha.municipios.find(x => x.ibge === codDestino); return [px(m.rotulo[0]), py(m.rotulo[1])]; })()
      : null;
    const usados = [];   // caixas dos rótulos já postos, para não se atropelarem
    // Camada própria para os rótulos, criada depois de todas as flechas: dentro
    // do mesmo grupo, a seta desenhada em seguida passava por cima do nome da
    // anterior e cortava a palavra ao meio.
    const gRotSeta = el("g", { "pointer-events": "none" }, gSetas);

    fs.forEach((f, i) => {
      // Ponto de partida: onde a reta que vem do centro da UF de origem cruza a
      // moldura. A origem real fica muito fora do quadro (São Paulo, Ceará),
      // então o que entra no desenho é o RUMO — que é geográfico e conferível —,
      // não uma posição inventada dentro de Roraima.
      const ox = px(f.origem_lon), oy = py(f.origem_lat);
      const refX = alvoMun ? alvoMun[0] : centroEstado[0];
      const refY = alvoMun ? alvoMun[1] : centroEstado[1];
      let dx = refX - ox, dy = refY - oy;
      const norma = Math.hypot(dx, dy) || 1;
      dx /= norma; dy /= norma;
      // Com o estado inteiro no alvo, a ponta encosta na fronteira; com um
      // município selecionado, ela vai até ele — aí o destino É específico.
      const destino = alvoMun || pontoNaFronteira(centroEstado[0], centroEstado[1], -dx, -dy)
        || centroEstado;
      const borda = 8;
      let t = Infinity;
      if (dx > 0) t = Math.min(t, (destino[0] - borda) / dx);
      if (dx < 0) t = Math.min(t, (destino[0] - (W - borda)) / dx);
      if (dy > 0) t = Math.min(t, (destino[1] - borda) / dy);
      if (dy < 0) t = Math.min(t, (destino[1] - (H - 34 - borda)) / dy);
      const comprimento = Math.max(40, Math.min(t, 210));
      const sx = destino[0] - dx * comprimento, sy = destino[1] - dy * comprimento;
      // curva leve, só para duas setas de rumo parecido não se sobreporem
      const mx = (sx + destino[0]) / 2 - dy * 14, my = (sy + destino[1]) / 2 + dx * 14;
      const d = `M${sx.toFixed(1)},${sy.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${destino[0].toFixed(1)},${destino[1].toFixed(1)}`;

      const g = el("g", {}, gSetas);
      const p = el("path", {
        d, fill: "none", stroke: corSeta, "stroke-width": largura(f.pessoas, vmax).toFixed(2),
        "stroke-linecap": "round", opacity: .82, "marker-end": `url(#${setaId})`,
        class: "viz-tl-seta",
      }, g);
      const comp = p.getTotalLength();
      if (animar && !menosMovimento) {
        p.style.strokeDasharray = comp;
        p.style.strokeDashoffset = comp;
        p.style.transition = `stroke-dashoffset .75s ease-out ${i * 0.11}s`;
        requestAnimationFrame(() => { p.style.strokeDashoffset = "0"; });
      }
      // O rótulo fica na cauda da seta. Quando duas caudas caem perto, o de
      // baixo desliza ao longo da própria seta até achar lugar — empurrar para
      // o lado o desgrudaria da flecha a que pertence.
      const texto = `${f.origem} · ${fmtInt.format(f.pessoas)}`;
      const larg = texto.length * 5.6, alt = 13;
      let lx = sx, ly = sy - 5, tentativa = 0;
      const bate = (x, y) => usados.some(u =>
        Math.abs(x - u.x) < (larg + u.larg) / 2 && Math.abs(y - u.y) < alt + 3);
      while (bate(lx, ly) && tentativa < 7) {
        tentativa++;
        lx += dx * 26; ly += dy * 26;   // desliza para dentro, sobre a seta
      }
      usados.push({ x: lx, y: ly, larg });
      const ancora = sx < W * 0.32 ? "start" : sx > W * 0.68 ? "end" : "middle";
      const rot = el("text", {
        x: lx, y: ly, "text-anchor": ancora,
        class: "viz-tl-seta-rot", stroke: "var(--v-surface)", "stroke-width": 3,
        "paint-order": "stroke", fill: "var(--v-text-primary)",
      }, gRotSeta);
      rot.textContent = texto;
      if (animar && !menosMovimento) {
        rot.style.opacity = 0;
        rot.style.transition = `opacity .4s ease-out ${i * 0.11 + 0.5}s`;
        requestAnimationFrame(() => { rot.style.opacity = 1; });
      }
    });
  }

  function pintar(animar) {
    const passo = passos[atual];
    marcas.forEach((b, i) => {
      b.classList.toggle("ativa", i === atual);
      b.setAttribute("aria-selected", String(i === atual));
    });
    const vals = formas.map(f => passo.valor(f.d)).filter(v => v != null);
    const vMin = Math.min(...vals), vMax = Math.max(...vals);
    const ord = vals.slice().sort((a, b) => a - b);
    const posto = new Map();
    ord.forEach((v, i) => { if (!posto.has(v)) posto.set(v, i); });
    const nm1 = Math.max(1, ord.length - 1);
    const mediana = ord[Math.floor((ord.length - 1) / 2)];
    const porPosicao = vMax > vMin && (mediana - vMin) / (vMax - vMin) < 0.3;
    const t = (v) => (v == null ? null
      : porPosicao ? posto.get(v) / nm1 : (vMax > vMin ? (v - vMin) / (vMax - vMin) : 0.5));

    formas.forEach(({ m, path, d }) => {
      const v = passo.valor(d);
      const existe = passo.existe(d);
      // Dois modos de pintura. Nos passos de CRIAÇÃO a pergunta é "quem já
      // existe", que é categórica: três estados (nasce agora / já existia /
      // ainda não) e nenhuma grandeza a comparar — uma rampa sequencial ali
      // faria o leitor procurar um "quanto" que não existe. Nos demais passos a
      // pergunta é de magnitude, e aí volta a rampa.
      const novo = passo.modo === "fundacao" && passo.nasceAgora && passo.nasceAgora(d);
      path.style.transition = (animar && !menosMovimento) ? "fill .5s ease, opacity .5s ease" : "";
      if (passo.modo === "fundacao") {
        path.setAttribute("fill", !existe ? "var(--v-neutral)"
          : novo ? corSeta : seqColor(0.28, ramp));
      } else
      path.setAttribute("fill", !existe ? "var(--v-neutral)" : v == null ? "var(--v-neutral)" : seqColor(t(v), ramp));
      path.style.opacity = existe ? 1 : 0.5;
      // Município que ainda não existia: traço tracejado VISÍVEL, não só uma cor
      // mais clara. O texto do passo chama essas áreas de tracejadas, e desenho
      // e legenda têm de dizer a mesma coisa.
      path.setAttribute("stroke", existe ? "var(--v-surface)" : "var(--v-text-secondary)");
      path.setAttribute("stroke-width", existe ? 0.8 : 1.1);
      path.setAttribute("stroke-dasharray", existe ? "" : "4 3");
      path.setAttribute("aria-label", `${m.nome} em ${passo.ano}: ` +
        (existe ? passo.descrever(d) : "o município ainda não existia"));
      const entrar = (ev) => {
        const r = svg.getBoundingClientRect(), s = r.width / W;
        const ax = ev && ev.clientX != null ? ev.clientX - r.left : px(m.rotulo[0]) * s;
        const ay = ev && ev.clientY != null ? ev.clientY - r.top : py(m.rotulo[1]) * s;
        const linhas = existe
          ? passo.linhas(d).map(l => ({ label: l[0], value: l[1], color: "transparent" }))
          : [{ label: "Situação em " + passo.ano, value: "ainda não existia", color: "transparent" }];
        showTooltip(tip, wrap, ax, ay, `${m.nome} · ${passo.ano}`, linhas,
          !passo.setas || !existe ? null
            : passo.permiteFoco ? "Clique para ver de onde vieram os moradores deste município."
            : "Neste ano a origem só foi publicada para o estado inteiro — não há como abrir por município.");
      };
      path.onpointerenter = path.onpointermove = entrar;
      path.onfocus = () => entrar(null);
      path.onpointerleave = path.onblur = () => hideTooltip(tip);
      path.onclick = () => {
        // Clicar só refina onde a fonte é por município. Nos passos em que a
        // origem só existe agregada por estado, o clique não faz nada — e o
        // balão avisa antes, em vez de deixar o leitor tentar e achar que quebrou.
        if (!passo.setas || !passo.permiteFoco || !existe) return;
        alvoSetas = (alvoSetas === m.ibge) ? null : m.ibge;
        desenharSetas(alvoSetas, true);
        escreverNarracao();
      };
    });

    // rótulos só dos municípios que existiam no passo
    gRot.textContent = "";
    formas.forEach(({ m, d }) => {
      if (!passo.existe(d)) return;
      const larguraProj = (() => {
        const xs = m.aneis.flat().map(p => px(p[0]));
        return Math.max(...xs) - Math.min(...xs);
      })();
      if (larguraProj < m.nome.length * 3.4) return;
      const novo = passo.modo === "fundacao" && passo.nasceAgora && passo.nasceAgora(d);
      const tv = passo.modo === "fundacao" ? (novo ? 0.75 : 0.28) : (t(passo.valor(d)) ?? 0);
      const fundo = passo.modo === "fundacao"
        ? (novo ? corSeta : seqColor(0.28, ramp)) : seqColor(tv, ramp);
      const tEl = el("text", {
        x: px(m.rotulo[0]), y: py(m.rotulo[1]) + 4, "text-anchor": "middle",
        class: "viz-map-mun-label", "stroke-width": 2.6, "paint-order": "stroke",
        stroke: fundo,
        fill: tv > 0.55 ? "var(--v-surface)" : "var(--v-text-primary)",
      }, gRot);
      tEl.textContent = m.nome;
    });

    desenharSetas(alvoSetas, animar);
    escreverNarracao();
    svg.setAttribute("aria-label", `Roraima em ${passo.ano}: ${passo.titulo}`);
  }

  function escreverNarracao() {
    const passo = passos[atual];
    const foco = alvoSetas ? dados.municipios.find(m => m.ibge === alvoSetas) : null;
    narra.innerHTML = `<p class="viz-tl-passo">Passo ${atual + 1} de ${passos.length} · <strong>${passo.ano}</strong></p>`
      + `<p class="viz-tl-titulo">${passo.titulo}</p>`
      + `<p class="viz-tl-texto">${passo.texto(foco)}</p>`;
  }

  function ir(i) {
    atual = (i + passos.length) % passos.length;
    if (!passos[atual].setas) alvoSetas = null;
    pintar(true);
  }

  function parar() {
    tocando = false;
    clearInterval(timer);
    bPlay.textContent = "▶";
    bPlay.setAttribute("aria-label", "Tocar a linha do tempo");
    bPlay.classList.remove("tocando");
  }

  function tocar() {
    tocando = true;
    bPlay.textContent = "❚❚";
    bPlay.setAttribute("aria-label", "Pausar");
    bPlay.classList.add("tocando");
    timer = setInterval(() => {
      if (atual === passos.length - 1) { parar(); return; }
      ir(atual + 1);
    }, 4200);
  }

  bPlay.addEventListener("click", () => (tocando ? parar() : (atual === passos.length - 1 ? (ir(0), tocar()) : tocar())));
  bAnt.addEventListener("click", () => { parar(); ir(atual - 1); });
  bProx.addEventListener("click", () => { parar(); ir(atual + 1); });
  // Teclado: setas andam na linha do tempo quando ela tem o foco.
  trilha.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { parar(); ir(atual + 1); marcas[atual].focus(); e.preventDefault(); }
    if (e.key === "ArrowLeft") { parar(); ir(atual - 1); marcas[atual].focus(); e.preventDefault(); }
  });

  pintar(false);
  return { ir, parar, tocar };
}

function renderMapaEstado(root, { municipios, contorno, indicadores, indicadorInicial }) {
  const W = 720, H = 620, M = 16, LEG = 40;
  const todos = contorno && contorno.length ? contorno : municipios.flatMap(m => m.aneis);
  const pts = todos.flat();
  const lats = pts.map(p => p[1]), lons = pts.map(p => p[0]);
  const latMin = Math.min(...lats), latMax = Math.max(...lats);
  const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
  const cosLat = Math.cos(((latMin + latMax) / 2) * Math.PI / 180);
  const spanX = (lonMax - lonMin) * cosLat, spanY = latMax - latMin;
  const scale = Math.min((W - 2 * M) / spanX, (H - 2 * M - LEG) / spanY);
  const offX = M + ((W - 2 * M) - spanX * scale) / 2;
  const offY = M + ((H - 2 * M - LEG) - spanY * scale) / 2;
  const px = (lon) => offX + (lon - lonMin) * cosLat * scale;
  const py = (lat) => offY + (latMax - lat) * scale;
  const ringD = (r) => "M" + r.map(([lo, la]) => `${px(lo).toFixed(1)},${py(la).toFixed(1)}`).join("L") + "Z";

  // --- trocador de indicador -------------------------------------------------
  const barra = document.createElement("div");
  barra.className = "viz-mapa-controles";
  const rot = document.createElement("label");
  rot.className = "viz-mapa-rotulo";
  rot.textContent = "Pintar o mapa por";
  const sel = document.createElement("select");
  sel.className = "viz-mapa-select";
  indicadores.forEach(ind => {
    const o = document.createElement("option");
    o.value = ind.chave; o.textContent = ind.titulo;
    sel.appendChild(o);
  });
  sel.value = indicadorInicial || indicadores[0].chave;
  const id = "mapa-ind-" + Math.random().toString(36).slice(2, 8);
  sel.id = id; rot.htmlFor = id;
  barra.appendChild(rot); barra.appendChild(sel);
  root.appendChild(barra);

  const wrap = document.createElement("div");
  wrap.className = "viz-svg-wrap viz-map-wrap";
  root.appendChild(wrap);
  const svg = el("svg", { class: "viz-svg", viewBox: `0 0 ${W} ${H}`, role: "img" }, wrap);
  const ramp = readSeqRamp(root);
  const tip = makeTooltip(wrap);

  const gArea = el("g", {}, svg);
  const gLinha = el("g", { "pointer-events": "none" }, svg);
  const gRot = el("g", { "pointer-events": "none" }, svg);
  const gLeg = el("g", { "pointer-events": "none" }, svg);

  const caminhos = municipios.map(m => {
    const d = m.aneis.map(ringD).join(" ");
    const path = el("path", {
      d, stroke: "var(--v-surface)", "stroke-width": 0.8, "fill-rule": "evenodd",
      tabindex: 0, role: "img", class: "viz-map-mun",
    }, gArea);
    return { m, path };
  });

  // contorno do estado por cima, sem preenchimento
  (contorno || []).forEach(r => el("path", {
    d: ringD(r), fill: "none", stroke: "var(--v-text-primary)",
    "stroke-width": 1.6, "stroke-linejoin": "round",
  }, gLinha));

  // rótulos: nome do município no ponto interno mais folgado.
  //
  // O que cabe é decidido pelo TAMANHO EM PIXELS do polígono depois de
  // projetado, não pela área em km². Um município grande e estreito (Normandia)
  // tem km² de sobra e largura de nada; um pequeno e redondo comporta o nome.
  // Onde não cabem as duas linhas, fica só o nome; onde não cabe nem o nome, o
  // balão e a tabela continuam respondendo.
  const rotulos = municipios.map(m => {
    const [lo, la] = m.rotulo;
    const x = px(lo), y = py(la);
    const xs = m.aneis.flat().map(p => px(p[0]));
    const ys = m.aneis.flat().map(p => py(p[1]));
    const cx0 = Math.min(...xs), cx1 = Math.max(...xs);
    const cy0 = Math.min(...ys), cy1 = Math.max(...ys);
    const larg = cx1 - cx0, alt = cy1 - cy0;
    const precisa = m.nome.length * 5.9;      // largura do nome a 11,5px
    // data-mun amarra as duas linhas ao mesmo município: o nome e o valor são
    // vizinhos por construção, e sem essa marca qualquer verificação de
    // sobreposição acusaria os dois como colisão.
    const t = el("text", { x, y, "text-anchor": "middle", class: "viz-map-mun-label",
      "data-mun": m.ibge, "stroke-width": 2.6, "paint-order": "stroke" }, gRot);
    t.textContent = m.nome;
    const v = el("text", { x, y: y + 11, "text-anchor": "middle", class: "viz-map-mun-valor",
      "data-mun": m.ibge, "stroke-width": 2.6, "paint-order": "stroke" }, gRot);
    return { m, t, v, x, y, caixaMun: { x0: cx0, x1: cx1, y0: cy0, y1: cy1 },
             cabeNome: larg >= precisa * 0.62 && alt >= 16,
             cabeValor: larg >= precisa * 0.72 && alt >= 30 };
  });

  const gradId = "mapaestado-" + Math.random().toString(36).slice(2, 8);
  const grad = el("linearGradient", { id: gradId, x1: "0", x2: "1", y1: "0", y2: "0" }, el("defs", {}, svg));
  for (let i = 0; i <= 10; i++) el("stop", { offset: `${i * 10}%`, "stop-color": seqColor(i / 10, ramp) }, grad);

  function pintar(chave) {
    const ind = indicadores.find(i => i.chave === chave) || indicadores[0];
    const vals = municipios.map(m => m.valores[ind.chave]).filter(v => v != null);
    const vMin = Math.min(...vals), vMax = Math.max(...vals);
    const ord = vals.slice().sort((a, b) => a - b);
    const mediana = ord[Math.floor((ord.length - 1) / 2)];

    // ESCALA ADAPTATIVA — e aqui ela não é refinamento, é a diferença entre um
    // mapa e uma mancha. Boa Vista tem 413 mil habitantes contra 33 mil do
    // segundo colocado: numa rampa linear os outros catorze municípios recebem
    // o mesmo azul claro e o mapa conta um fato só. Quando a mediana não alcança
    // 30% da rampa linear, a cor passa a seguir a POSIÇÃO do município na
    // distribuição. A legenda diz qual das duas está no ar — sem isso o leitor
    // compararia magnitudes que a cor deixou de representar.
    //
    // Não vale para todo indicador: a dependência de transferências vai de 76%
    // a 96% e é bem distribuída, então continua linear, que é mais informativo.
    const tMedLinear = vMax > vMin ? (mediana - vMin) / (vMax - vMin) : 0.5;
    const porPosicao = tMedLinear < 0.30;
    const posto = new Map();
    ord.forEach((v, i) => { if (!posto.has(v)) posto.set(v, i); });
    const nm1 = Math.max(1, ord.length - 1);
    const t = (v) => {
      if (v == null) return null;
      if (porPosicao) return posto.get(v) / nm1;
      return vMax > vMin ? (v - vMin) / (vMax - vMin) : 0.5;
    };
    // Texto claro sobre o fim escuro da rampa, escuro sobre o começo claro.
    const tinta = (tv) => (tv == null ? "var(--v-text-primary)"
      : tv > 0.55 ? "var(--v-surface)" : "var(--v-text-primary)");

    svg.setAttribute("aria-label", `Mapa de Roraima por município: ${ind.titulo}`);
    caminhos.forEach(({ m, path }) => {
      const v = m.valores[ind.chave];
      const tv = t(v);
      path.setAttribute("fill", v == null ? "var(--v-neutral)" : seqColor(tv, ramp));
      path.setAttribute("aria-label",
        `${m.nome}: ${v == null ? "sem dado" : ind.formatoLongo(v)}. ` +
        `${fmtInt.format(m.populacao)} habitantes em ${fmtInt.format(Math.round(m.area_km2))} km².`);
      path.onpointerenter = path.onpointermove = (ev) => {
        const r = svg.getBoundingClientRect(), s = r.width / W;
        const ax = ev && ev.clientX != null ? ev.clientX - r.left : px(m.rotulo[0]) * s;
        const ay = ev && ev.clientY != null ? ev.clientY - r.top : py(m.rotulo[1]) * s;
        showTooltip(tip, wrap, ax, ay, m.nome, [
          { label: ind.titulo, value: v == null ? "sem dado" : ind.formatoLongo(v),
            color: v == null ? "var(--v-neutral)" : seqColor(tv, ramp), dot: true },
          { label: "População (Censo 2022)", value: fmtInt.format(m.populacao) + " hab.", color: "transparent" },
          { label: "Área", value: fmtInt.format(Math.round(m.area_km2)) + " km²", color: "transparent" },
          { label: "Fatia do estado", value: m.pct_populacao.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "% da população · " +
              m.pct_area.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "% da área", color: "transparent" },
        ], ind.nota);
      };
      path.onfocus = () => path.onpointerenter(null);
      path.onpointerleave = path.onblur = () => hideTooltip(tip);
    });

    rotulos.forEach(({ m, t: tEl, v: vEl, cabeNome, cabeValor }) => {
      const val = m.valores[ind.chave];
      const tv = t(val);
      const cor = tinta(tv);
      // O HALO É A COR DO PRÓPRIO POLÍGONO, não a da superfície. Com halo fixo
      // branco, o rótulo de Boa Vista — texto branco sobre o azul mais escuro —
      // ficava branco por cima de branco e o nome sumia num borrão. Usando o
      // preenchimento da área, o halo separa a letra do desenho nos dois casos.
      const halo = val == null ? "var(--v-neutral)" : seqColor(tv, ramp);
      tEl.setAttribute("fill", cor); tEl.setAttribute("stroke", halo);
      vEl.setAttribute("fill", cor); vEl.setAttribute("stroke", halo);
      vEl.textContent = val == null ? "sem dado" : ind.formato(val);
      tEl.style.display = cabeNome ? "" : "none";
      vEl.style.display = cabeNome && cabeValor ? "" : "none";
      // Nome sem valor embaixo fica centrado verticalmente no lugar dos dois.
      tEl.setAttribute("dy", cabeValor ? "0" : "5");
    });

    // COLISÃO. Caber dentro do próprio polígono não garante não esbarrar no
    // vizinho: "Boa Vista / 413.486" cabia em Boa Vista e ainda assim passava
    // por cima de "Bonfim". A prioridade é o VALOR do indicador em cartaz —
    // quem está no topo do que o mapa está mostrando é quem mais precisa ser
    // nomeado, e isso muda junto com o seletor. Primeiro se tenta soltar a
    // linha do número; só se ainda colidir o rótulo inteiro sai.
    const ordemPrioridade = rotulos
      .filter(r => r.t.style.display !== "none")
      .sort((a, b) => (t(b.m.valores[ind.chave]) ?? -1) - (t(a.m.valores[ind.chave]) ?? -1));
    const aceitos = [];
    const bateEm = (bb) => aceitos.some(o =>
      bb.x < o.x + o.width && o.x < bb.x + bb.width && bb.y < o.y + o.height && o.y < bb.y + bb.height);
    const caixa = (r) => {
      const b = r.t.getBBox();
      if (r.v.style.display === "none") return b;
      const c = r.v.getBBox();
      return { x: Math.min(b.x, c.x), y: b.y,
               width: Math.max(b.x + b.width, c.x + c.width) - Math.min(b.x, c.x),
               height: c.y + c.height - b.y };
    };
    const mover = (r, dy) => {
      r.t.setAttribute("y", r.y + dy);
      r.v.setAttribute("y", r.y + dy + 11);
    };
    ordemPrioridade.forEach(r => {
      mover(r, 0);
      r.t.setAttribute("dy", r.v.style.display === "none" ? "5" : "0");
      let bb = caixa(r);
      // 1) largar a linha do número, que é o que engorda a caixa
      if (bateEm(bb) && r.v.style.display !== "none") {
        r.v.style.display = "none";
        r.t.setAttribute("dy", "5");
        bb = caixa(r);
      }
      // 2) deslizar na vertical, SEM sair da caixa do próprio município — um
      // rótulo que escorrega para dentro do vizinho é pior que rótulo nenhum,
      // porque atribui o nome errado à área errada.
      if (bateEm(bb)) {
        for (const dy of [14, -14, 26, -26, 38, -38]) {
          mover(r, dy);
          const alvo = caixa(r);
          const dentroDoMun = alvo.y >= r.caixaMun.y0 && alvo.y + alvo.height <= r.caixaMun.y1;
          if (dentroDoMun && !bateEm(alvo)) { bb = alvo; break; }
          bb = null;
        }
        if (!bb) mover(r, 0);
      }
      if (!bb || bateEm(bb)) { r.t.style.display = "none"; r.v.style.display = "none"; return; }
      aceitos.push(bb);
    });

    // legenda de gradiente
    gLeg.textContent = "";
    const LW = porPosicao ? 300 : 240, ly = H - 26;
    el("rect", { x: M, y: ly, width: LW, height: 10, rx: 3, fill: `url(#${gradId})`,
      stroke: "var(--v-grid)", "stroke-width": .5 }, gLeg);
    const lo = el("text", { x: M, y: ly + 23, class: "viz-axis-text" }, gLeg);
    lo.textContent = ind.formatoLongo(vMin);
    const hi = el("text", { x: M + LW, y: ly + 23, "text-anchor": "end", class: "viz-axis-text" }, gLeg);
    hi.textContent = ind.formatoLongo(vMax);
    const cap = el("text", { x: M, y: ly - 6, class: "viz-axis-text" }, gLeg);
    cap.textContent = ind.titulo + (ind.unidade ? ` (${ind.unidade})` : "");
    if (porPosicao) {
      // Na escala por posição o MEIO da barra é a mediana, por construção.
      // Rotular só as pontas esconderia justamente o que mudou.
      const mid = el("text", { x: M + LW / 2, y: ly + 23, "text-anchor": "middle", class: "viz-axis-text" }, gLeg);
      mid.textContent = ind.formatoLongo(mediana);
      const aviso = el("text", { x: M + LW + 12, y: ly + 9, class: "viz-axis-text" }, gLeg);
      aviso.textContent = "cor = posição no ranking, não o valor";
    }
  }

  sel.addEventListener("change", () => pintar(sel.value));
  pintar(sel.value);
  return { pintar, select: sel };
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

  const realRoot = document.querySelector("#chart-despesa-real");
  const pibDespRoot = document.querySelector("#chart-pib-despesa");
  const funcoesTempoRoot = document.querySelector("#chart-funcoes-tempo");
  const variacaoRoot = document.querySelector("#chart-despesa-variacao");
  const investRoot = document.querySelector("#chart-investimento");
  const origemRoot = document.querySelector("#chart-receita-origem");

  const financasDetails = (finRoot || saldoRoot) && (finRoot || saldoRoot).closest("details.phase");
  onFirstOpen(financasDetails, () => {
    fetch("../dados/itajuba/siconfi_receita_despesa_2015_2025.json").then(r => r.json())
      .then(fin => buildFinancasCharts(finRoot, saldoRoot, fin))
      .catch(() => showError(finRoot, saldoRoot));

    // Despesa por função/natureza e receita por origem vêm de outros dois
    // anexos do SICONFI (DCA I-E/I-D e I-C) e cobrem 2014–2025, um ano a mais
    // que o RREO acima — daí serem arquivos separados.
    Promise.all([
      fetch("../dados/itajuba/despesa_funcao_natureza_2014_2025.json").then(r => r.json()),
      fetch("../dados/itajuba/receita_origem_2014_2025.json").then(r => r.json()),
    ]).then(([desp, rec]) => {
      if (realRoot) buildDespesaReal(realRoot, desp);
      if (pibDespRoot) buildPibVsDespesa(pibDespRoot, desp);
      if (funcoesTempoRoot) buildFuncoesNoTempo(funcoesTempoRoot, desp);
      if (variacaoRoot) buildDespesaVariacao(variacaoRoot, desp);
      if (investRoot) buildInvestimentoCredito(investRoot, desp, rec);
      if (origemRoot) buildReceitaOrigem(origemRoot, rec);
    }).catch(() => showError(realRoot, pibDespRoot, funcoesTempoRoot, variacaoRoot, investRoot, origemRoot));
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
    Promise.all([
      fetch("../dados/itajuba/ibge_cidades_snapshot_2026.json").then(r => r.json()),
      fetch("../dados/itajuba/educacao_alfabetizacao_nivel_instrucao.json").then(r => r.json()),
    ]).then(([snapshot, educ]) => buildEducacaoStats(educRoot, snapshot, educ))
      .catch(() => showError(educRoot));
  });

  const mapRoot = document.querySelector("#map-territorio");
  onFirstOpen(mapRoot && mapRoot.closest("details.phase"), () => {
    Promise.all([
      fetch("../dados/itajuba/municipio_contorno.json").then(r => r.json()),
      fetch("../dados/itajuba/setores_poligonos_2022.json").then(r => r.json()),
      fetch("../dados/itajuba/bairros_osm.json").then(r => r.json()),
      fetch("../dados/itajuba/zona_urbana_censo2022.json").then(r => r.ok ? r.json() : null).catch(() => null),
      fetch("../dados/itajuba/mancha_urbana_2019.json").then(r => r.ok ? r.json() : null).catch(() => null),
    ]).then(([contorno, setores, bairros, zonaUrbana, mancha]) => buildTerritorioMap(mapRoot, contorno, setores, bairros, zonaUrbana, mancha))
      .catch(() => showError(mapRoot));
  });

  const comprasRoot = document.querySelector("#chart-compras");
  onFirstOpen(comprasRoot && comprasRoot.closest("details.phase"), () => {
    fetch("../dados/itajuba/pncp_serie_2025_2026.json").then(r => r.json())
      .then(pncp => buildComprasChart(comprasRoot, pncp))
      .catch(() => showError(comprasRoot));
  });
  const legislativoRoot = document.querySelector("#chart-legislativo");
  onFirstOpen(legislativoRoot && legislativoRoot.closest("details.phase"), () => {
    fetch("../dados/itajuba/siscam_portarias_2023_2026.json").then(r => r.json())
      .then(siscam => buildLegislativoChart(legislativoRoot, siscam))
      .catch(() => showError(legislativoRoot));
  });

  const assalariadoRoot = document.querySelector("#chart-emprego");
  const empresasRoot = document.querySelector("#chart-empresas");
  const empregoDetails = (assalariadoRoot || empresasRoot) && (assalariadoRoot || empresasRoot).closest("details.phase");
  onFirstOpen(empregoDetails, () => {
    fetch("../dados/itajuba/cempre_empresas_emprego_2006_2021.json").then(r => r.json())
      .then(cempre => buildEmpregoCharts(assalariadoRoot, empresasRoot, cempre))
      .catch(() => showError(assalariadoRoot, empresasRoot));
  });
  const pibRoot = document.querySelector("#chart-pib");
  onFirstOpen(pibRoot && pibRoot.closest("details.phase"), () => {
    fetch("../dados/itajuba/pib_municipal_2002_2023.json").then(r => r.json())
      .then(pib => buildEconomiaChart(pibRoot, pib))
      .catch(() => showError(pibRoot));
  });

  const segRoot = document.querySelector("#chart-seguranca");
  onFirstOpen(segRoot && segRoot.closest("details.phase"), () => {
    Promise.all([
      fetch("../dados/itajuba/seguranca_sejusp_2012_2026.json").then(r => r.json()),
      fetch("../dados/itajuba/despesa_funcao_natureza_2014_2025.json").then(r => r.ok ? r.json() : null).catch(() => null),
    ]).then(([seg, desp]) => buildSegurancaChart(segRoot, seg, desp))
      .catch(() => showError(segRoot));
  });

  const sinteseRoot = document.querySelector("#painel-sintese");
  const iduRoot = document.querySelector("#idu-br");
  const sinteseDetails = (sinteseRoot || iduRoot) && (sinteseRoot || iduRoot).closest("details.phase");
  onFirstOpen(sinteseDetails, () => {
    const j = (path) => fetch(path).then(r => r.ok ? r.json() : null).catch(() => null);
    if (sinteseRoot) {
      Promise.all([
        j("../dados/itajuba/populacao_2000_2025.json"),
        j("../dados/itajuba/ips_brasil_2026.json"),
        j("../dados/itajuba/siconfi_receita_despesa_2015_2025.json"),
        j("../dados/itajuba/ibge_cidades_snapshot_2026.json"),
        j("../dados/itajuba/educacao_alfabetizacao_nivel_instrucao.json"),
        j("../dados/itajuba/setores_censitarios_2022.json"),
        j("../dados/itajuba/siscam_portarias_2023_2026.json"),
        j("../dados/itajuba/pib_municipal_2002_2023.json"),
        j("../dados/itajuba/cempre_empresas_emprego_2006_2021.json"),
        j("../dados/itajuba/pncp_serie_2025_2026.json"),
      ]).then(([pop, ips, fin, snapshot, educ, setores, siscam, pib, cempre, pncp]) => {
        buildPainelSintese(sinteseRoot, { pop, ips, fin, snapshot, educ, setores, siscam, pib, cempre, pncp });
      }).catch(() => showError(sinteseRoot));
    }
    if (iduRoot) {
      j("../dados/itajuba/idu_br_2026.json").then(idu => {
        if (idu) buildIduBrSection(iduRoot, idu); else showError(iduRoot);
      });
    }
  });
}

// Só monta os gráficos de Itajubá na página de Itajubá. Sem essa guarda, a
// página de Serra da Saudade — que reusa os mesmos ids de contêiner
// (#chart-financas, #chart-receita-origem…) — mandava buscar
// ../dados/itajuba/*.json e desenhava os números de Itajubá dentro dela.
if (document.body.dataset.piloto === "itajuba") initItajubaCharts();
