// ===========================================================================
// Comparador de cidades do piloto — Fases 1 (Demografia) e 3 (Finanças).
//
// Três regras de projeto que valem para tudo o que for acrescentado aqui:
//
// 1. NENHUMA CIDADE ESTÁ ESCRITA NESTE ARQUIVO. A lista vem de
//    ../dados/cidades.json, que também diz onde ficam os arquivos de cada uma.
//    Acrescentar uma cidade é editar aquele manifesto, não este código.
//
// 2. NADA DE VALOR ABSOLUTO. Comparar "R$ 4 bilhões" com "R$ 27 milhões" só
//    informa qual cidade é maior, o que já se sabe. Toda métrica aqui é por
//    habitante, percentual ou índice — é o que permite pôr uma cidade de 537 mil
//    e uma de 856 habitantes no mesmo eixo sem mentir.
//
// 3. O NÚMERO DE CIDADES É VARIÁVEL. A primeira versão desta página era escrita
//    para um par fixo A/B: `const [A, B] = cidades`, séries `al.a`/`al.b`, coluna
//    "Diferença" na tabela e frases com "as duas cidades" escritas à mão. Passar
//    de 2 para 3 exigiria reescrever cada bloco, e de 3 para 4 de novo. Agora
//    tudo trabalha sobre uma LISTA: os gráficos recebem N séries, as tabelas
//    ganham uma coluna por cidade e o texto concorda em número sozinho. O teto
//    é o tamanho da paleta categórica validada — hoje 4 tons.
//
// A cor é CATEGÓRICA e identifica a cidade (nos pilotos individuais verde é
// receita e azul é despesa; aqui a cor muda de significado, e por isso receita
// e despesa ficam em gráficos separados em vez de dividirem um eixo).
// ===========================================================================

const CMP = {
  manifesto: null,
  cache: {},
  raiz: "../dados/",
  slugs: [],
};

CMP.carregar = function (pasta, arquivo) {
  const caminho = CMP.raiz + pasta + "/" + arquivo;
  if (!this.cache[caminho]) {
    this.cache[caminho] = fetch(caminho).then(r => {
      if (!r.ok) throw new Error(caminho + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[caminho];
};

CMP.escuro = () =>
  (matchMedia("(prefers-color-scheme: dark)").matches
    && document.documentElement.dataset.theme !== "light")
  || document.documentElement.dataset.theme === "dark";

CMP.paleta = () => (CMP.escuro() ? CMP.manifesto.paleta.escura : CMP.manifesto.paleta.clara);

// COR POR ORDEM DE ESCOLHA, não por índice fixo da cidade.
//
// Enquanto o manifesto tinha 4 cidades, cada uma podia ter um tom fixo e a
// regra "a cor segue a entidade, não o posto" valia inteira: nenhuma cidade
// trocava de cor quando outra entrava ou saía. Com os 15 municípios de Roraima
// o manifesto passou a 19 cidades e 4 tons validados, e aquela regra virou
// impossível de cumprir — a fórmula antiga era `cor_indice % 4`, então escolher
// Itajubá (0) junto com o 5º município da lista (4) devolvia A MESMA COR para
// as duas, e o gráfico ficava ilegível.
//
// Entre "cor estável entre comparações" e "cores distintas DENTRO da comparação
// em cartaz", a segunda é a que decide se o gráfico pode ser lido. É ela que
// fica. A identidade continua explícita em dois lugares que acompanham a
// escolha: o quadradinho ao lado de cada seletor e a legenda de cada gráfico.
CMP.cor = function (cidade) {
  const p = CMP.paleta();
  const i = CMP.slugs.indexOf(cidade.slug);
  return p[(i < 0 ? 0 : i) % p.length];
};

// Teto de cidades simultâneas: o número de tons categóricos validados. Não é
// um limite de gosto — acima dele a paleta deixaria de passar na separação sob
// daltonismo, e duas cidades ficariam com cores que não se distinguem.
CMP.maxCidades = () => Math.max(2, CMP.paleta().length);

const rotuloCidade = (c) => `${c.nome}/${c.uf}`;

// --- concordância de número: o texto acompanha quantas cidades estão no ar ----
const listar = (itens) => itens.length <= 1
  ? (itens[0] || "")
  : itens.slice(0, -1).join(", ") + " e " + itens[itens.length - 1];
const nomes = (cidades) => listar(cidades.map(rotuloCidade));
const asCidades = (n) => (n === 2 ? "as duas cidades" : `as ${n} cidades`);
const asDelas = (n) => (n === 2 ? "das duas" : `das ${n}`);

const perc1 = (v) => v.toFixed(1).replace(".", ",") + "%";
const ppSin = (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1).replace(".", ",") + "%";
const brl = (v) => "R$ " + fmtInt.format(Math.round(v));

// --- helpers de série -------------------------------------------------------

// Une os anos de TODAS as cidades e devolve um ponto por ano para cada uma, com
// null onde a cidade não tem dado. O renderizador quebra a linha no null, então
// a série de quem começa depois simplesmente começa depois — sem inventar ponto.
function alinhar(docs, extrair) {
  const mapas = docs.map(d => new Map(extrair(d).map(p => [p.ano, p.valor])));
  const anos = [...new Set(mapas.flatMap(m => [...m.keys()]))].sort((x, y) => x - y);
  return {
    anos,
    series: mapas.map(m => anos.map(an => (m.has(an) && m.get(an) != null ? m.get(an) : null))),
  };
}

function graficoMultiplo(root, { cidades, dados, extrair, yLabel, yFormat, yFormatFull, yMaxCap, legenda, missingLabel }) {
  const al = alinhar(dados, extrair);
  if (!al.anos.length) return null;
  renderLineChart(root, {
    series: cidades.map((c, i) => ({
      key: c.slug,
      label: legenda ? legenda(c) : rotuloCidade(c),
      color: CMP.cor(c),
      points: al.series[i].map(y => ({ y })),
    })),
    xValues: al.anos.map(String),
    yLabel, yFormat, yFormatFull, yMaxCap,
    // Curto de propósito: este texto é desenhado DENTRO do gráfico, na altura
    // dos rótulos do eixo, e uma frase inteira colide com os anos vizinhos.
    // A explicação do buraco vai na nota abaixo do gráfico, não aqui.
    missingLabel: missingLabel || "Sem dado",
  });
  return al;
}

function tabelaComparativa(root, { cidades, al, caption, fmt }) {
  // A coluna "Diferença" só existe com DUAS cidades: com três ou mais, "a
  // diferença" não tem referente único e a coluna induziria a comparar sempre
  // com a primeira, que não tem nada de especial.
  const par = cidades.length === 2;
  renderTable(root, {
    caption,
    columns: ["Ano", ...cidades.map(rotuloCidade), ...(par ? ["Diferença"] : [])],
    rows: al.anos.map((ano, i) => {
      const vs = al.series.map(s => s[i]);
      const base = [String(ano), ...vs.map(v => (v == null ? "—" : fmt(v)))];
      if (par) base.push(vs[0] == null || vs[1] == null ? "—" : fmt(vs[0] - vs[1]));
      return base;
    }),
  });
}

// --- barras comparadas ------------------------------------------------------
// Uma barra por cidade em cada linha, todas na mesma régua. Preferi isto a
// barras empilhadas porque a pergunta aqui é "quanto cada cidade destina a esta
// função", e empilhar somaria coisas que não se somam.
function barrasComparadas(root, { cidades, linhas, valueFormat, valueFormatFull }) {
  legend(root, cidades.map(c => ({ label: rotuloCidade(c), color: CMP.cor(c) })));
  // Se houver valor negativo, o trilho vira divergente com o zero no meio.
  const vals = linhas.flatMap(l => l.valores).filter(v => v != null);
  const divergente = vals.some(v => v < 0);
  const max = Math.max(...vals.map(Math.abs), 0) || 1;
  const caixa = document.createElement("div");
  caixa.className = "cmp-bars";
  root.appendChild(caixa);

  linhas.forEach(l => {
    const row = document.createElement("div");
    row.className = "cmp-bar-row";
    const rot = document.createElement("div");
    rot.className = "cmp-bar-rot";
    rot.textContent = l.rotulo;
    row.appendChild(rot);

    const par = document.createElement("div");
    par.className = "cmp-bar-par";
    cidades.forEach((c, i) => {
      const v = l.valores[i];
      const linha = document.createElement("div");
      linha.className = "cmp-bar-linha";
      const trilho = document.createElement("div");
      trilho.className = "cmp-bar-trilho" + (divergente ? " div" : "");
      const fill = document.createElement("div");
      fill.className = "cmp-bar-fill" + (divergente ? ((v || 0) < 0 ? " neg" : " pos") : "");
      const frac = Math.abs(v || 0) / max * (divergente ? 50 : 100);
      fill.style.width = frac.toFixed(2) + "%";
      fill.style.background = CMP.cor(c);
      trilho.appendChild(fill);
      if (divergente) {
        const zero = document.createElement("span");
        zero.className = "cmp-bar-zero";
        trilho.appendChild(zero);
      }
      const val = document.createElement("span");
      val.className = "cmp-bar-val";
      val.textContent = v == null ? "—" : valueFormat(v);
      linha.appendChild(trilho);
      linha.appendChild(val);
      linha.setAttribute("role", "img");
      linha.setAttribute("aria-label",
        `${l.rotulo}, ${rotuloCidade(c)}: ${v == null ? "sem dado" : valueFormatFull(v)}`);
      par.appendChild(linha);
    });
    row.appendChild(par);
    caixa.appendChild(row);
  });
}

// Um cartão por cidade, na cor dela. Substitui o antigo "valor A · valor B"
// concatenado numa string, que virava ilegível já na terceira cidade.
function statsPorCidade(root, cidades, montar) {
  renderStats(root, cidades.map((c, i) => Object.assign(
    { label: rotuloCidade(c) }, montar(c, i))));
}

// --- Fase 1 — demografia ----------------------------------------------------
//
// População absoluta não entra em nenhum gráfico daqui: 537 mil contra 1,6 mil
// contra 856 não cabem no mesmo eixo, e forçar isso deixaria as cidades
// pequenas coladas no zero. O que se compara é a TRAJETÓRIA (índice de base
// comum) e a QUEBRA do Censo (em percentual).
function blocoDemografia(raiz, cidades, docs) {
  const n = cidades.length;
  const pops = docs;
  const censos = (d) => Object.fromEntries(
    d.serie.filter(p => p.fonte === "censo").map(p => [p.ano, p.populacao]));
  const cen = pops.map(censos);
  const ult = pops.map(d => d.serie.filter(p => p.populacao != null).slice(-1)[0]);

  // Base do índice: o primeiro ano com dado em TODAS as cidades escolhidas —
  // com duas era uma interseção de dois conjuntos; agora de N.
  const conjuntos = pops.map(d => new Set(d.serie.filter(p => p.populacao != null).map(p => p.ano)));
  const base = [...conjuntos[0]].sort((a, b) => a - b).find(a => conjuntos.every(s => s.has(a)));
  if (base == null) {
    note(raiz, "As cidades escolhidas não têm nenhum ano de população em comum — sem ano-base não há índice.");
    return;
  }

  // ---------- trajetória em índice ----------
  const g1 = secao(raiz, "1. A trajetória da população, na mesma régua",
    `População de cada ano dividida pela do ano-base (${base} = 100). É a única forma de pôr cidades de portes ` +
    `muito diferentes no mesmo eixo — em valor absoluto, a maior achataria as outras contra o zero.`);
  const bases = pops.map(d => d.serie.find(p => p.ano === base).populacao);
  const indices = pops.flatMap((d, i) =>
    d.serie.filter(p => p.populacao != null).map(p => 100 * p.populacao / bases[i]));
  // Teto da régua colado no dado. Sem isso, um máximo de 115 faz o niceMax
  // arredondar para 200 e metade do gráfico fica vazia — e o achatamento
  // esconde justamente a separação entre as trajetórias. Múltiplo de 20
  // porque o eixo é dividido em 4 partes: 120 dá marcas em 0/30/60/90/120, e
  // 125 daria 0/31/63/94/125.
  const topo = Math.max(20, Math.ceil(Math.max(...indices) / 20) * 20);

  const al1 = graficoMultiplo(g1, {
    cidades, dados: pops,
    extrair: (d) => {
      const b = bases[pops.indexOf(d)];
      return d.serie.map(p => ({ ano: p.ano, valor: p.populacao == null ? null : 100 * p.populacao / b }));
    },
    yLabel: `Índice ${base} = 100`,
    yFormat: (v) => String(Math.round(v)),
    yFormatFull: (v) => v.toFixed(1).replace(".", ",") + ` (base 100 em ${base})`,
    yMaxCap: topo,
  });

  const idx = ult.map((u, i) => 100 * u.populacao / bases[i]);
  statsPorCidade(g1, cidades, (c, i) => ({
    value: Math.round(idx[i]) + " / 100",
    label: `${rotuloCidade(c)} em ${ult[i].ano}`,
    note: `${ppSin(idx[i] - 100)} desde ${base} · ${fmtInt.format(ult[i].populacao)} hab.`,
  }));

  note(g1, `<strong>O índice responde "para onde cada cidade foi", não "qual é maior".</strong> Cada linha começa em
    100 no ano-base e mostra a variação relativa dali em diante, então uma cidade de mil habitantes e uma de meio
    milhão cabem lado a lado sem que a diferença de porte engula a comparação. Os números absolutos ficam nos
    cartões acima e na tabela abaixo, para quem precisar deles.`);

  if (al1) tabelaComparativa(g1, {
    cidades, al: al1, caption: `População em índice, ${base} = 100`,
    fmt: (v) => v.toFixed(1).replace(".", ","),
  });

  // ---------- variação entre Censos ----------
  const anosCenso = [2000, 2010, 2022].filter(a => cen.every(c => c[a] != null));
  if (anosCenso.length >= 2) {
    const g2 = secao(raiz, "2. O que mudou de um Censo para o outro",
      "Variação percentual entre contagens completas — não entre estimativas. É a medida mais firme que existe de " +
      "crescimento ou perda de população, porque cada ponto é um recenseamento, não uma projeção.");
    const pares = [];
    for (let i = 0; i + 1 < anosCenso.length; i++) {
      const de = anosCenso[i], para = anosCenso[i + 1];
      pares.push({
        rotulo: `${de} → ${para}`,
        valores: cen.map(c => 100 * (c[para] / c[de] - 1)),
      });
    }
    const pri = anosCenso[0], ultC = anosCenso[anosCenso.length - 1];
    pares.push({
      rotulo: `${pri} → ${ultC} (total)`,
      valores: cen.map(c => 100 * (c[ultC] / c[pri] - 1)),
    });

    barrasComparadas(g2, {
      cidades, linhas: pares,
      valueFormat: (v) => ppSin(v),
      valueFormatFull: (v) => ppSin(v) + " entre os dois Censos",
    });

    const tot = cen.map(c => 100 * (c[ultC] / c[pri] - 1));
    const sobem = cidades.filter((_, i) => tot[i] >= 0);
    const descem = cidades.filter((_, i) => tot[i] < 0);
    const detalhe = cidades.map((c, i) => `${rotuloCidade(c)} ${ppSin(tot[i])}`).join(", ");
    note(g2, (sobem.length === 0 || descem.length === 0)
      ? `Entre ${pri} e ${ultC} ${asCidades(n)} foram para o mesmo lado: ${detalhe}. A diferença está no ritmo,
         não no sentido.`
      : `<strong>Estas cidades foram para lados opostos.</strong> Entre ${pri} e ${ultC},
         ${nomes(sobem)} ${sobem.length === 1 ? "ganhou" : "ganharam"} população e
         ${nomes(descem)} ${descem.length === 1 ? "perdeu" : "perderam"} — ${detalhe}. A barra cresce para a
         direita quando a população subiu e para a esquerda quando caiu; a linha vertical é o zero.`);

    renderTable(g2, {
      caption: "População nos Censos e variação entre eles",
      columns: ["Censo", ...cidades.map(rotuloCidade)],
      rows: anosCenso.map(a => [String(a), ...cen.map(c => fmtInt.format(c[a]))])
        .concat(pares.map(p => [p.rotulo, ...p.valores.map(ppSin)])),
    });
  }

  // ---------- a quebra do Censo 2022 ----------
  const quebra = (d, c) => {
    if (!c[2022]) return null;
    const antes = d.serie.filter(p => p.ano < 2022 && p.populacao != null && p.fonte === "estimativa").slice(-1)[0];
    if (!antes) return null;
    return { ano: antes.ano, estimativa: antes.populacao, censo: c[2022], dif: 100 * (c[2022] / antes.populacao - 1) };
  };
  const qs = pops.map((d, i) => quebra(d, cen[i]));
  if (qs.every(Boolean)) {
    const g3 = secao(raiz, "3. O tamanho do erro da estimativa",
      "Nos anos entre Censos o IBGE publica uma estimativa, que é projeção e não contagem. O Censo 2022 mostrou " +
      "de quanto era o desvio acumulado — e o sinal do desvio não é o mesmo em toda cidade.");
    statsPorCidade(g3, cidades, (c, i) => ({
      value: ppSin(qs[i].dif),
      label: `Correção do Censo 2022 · ${rotuloCidade(c)}`,
      note: `Estimativa de ${qs[i].ano}: ${fmtInt.format(qs[i].estimativa)} · Censo: ${fmtInt.format(qs[i].censo)}`,
    }));

    const acima = cidades.filter((_, i) => qs[i].dif < 0);   // estimativa vinha ACIMA do Censo
    const abaixo = cidades.filter((_, i) => qs[i].dif >= 0);
    note(g3, (acima.length === 0 || abaixo.length === 0)
      ? `Em ${asCidades(n)} a estimativa errou para o mesmo lado — ${abaixo.length ? "abaixo" : "acima"} da contagem
         real —, com desvios de ${cidades.map((c, i) => ppSin(qs[i].dif)).join(", ")}.`
      : `<strong>A estimativa errou para lados opostos.</strong> Em ${nomes(acima)} ela vinha <em>acima</em> do que
         o Censo depois contou; em ${nomes(abaixo)}, <em>abaixo</em>. Isso importa para tudo o que se divide por
         população: <strong>um valor "por habitante" calculado com a estimativa de 2021 carrega esse erro
         embutido</strong>, e em direções contrárias dependendo da cidade.`);

    note(g3, `<strong>Por que a estimativa erra mais em cidade pequena.</strong> Ela é uma projeção construída a
      partir do Censo anterior e de tendências regionais, não uma contagem. Quanto menor o município, menos massa o
      método tem para trabalhar e mais uma variação de poucas dezenas de pessoas pesa em termos percentuais. É por
      isso que os anos de Censo aparecem com marcador maior nos gráficos das páginas individuais — eles valem mais
      que os anos intermediários.`);

    note(g3, `Uma nota de cobertura, e ela vale para todas as cidades do piloto: <strong>o IBGE não publica
      estimativa municipal para 2007 nem para 2023</strong>. Nos gráficos acima esses dois anos aparecem como
      buraco, não como valor interpolado.`);
  }

  rodapeFontes(raiz, cidades, "populacao_2000_2025.json", "as mesmas que alimentam a Fase 1 de cada piloto");
}

// --- os blocos da Fase 3 ----------------------------------------------------

function blocoFase3(raiz, cidades, docs) {
  const n = cidades.length;
  const rd = docs.map(d => d[0]);   // receita/despesa/saldo
  const df = docs.map(d => d[1]);   // despesa por função e natureza
  const ro = docs.map(d => d[2]);   // receita por origem
  const ultD = df.map(d => d.serie[d.serie.length - 1]);
  const ultR = ro.map(d => d.serie[d.serie.length - 1]);

  // ---------- painel de contraste ----------
  const painel = secao(raiz, "O contraste, cidade a cidade",
    "Todos do último ano fechado de cada cidade. Os valores por habitante estão em reais de 2025.");
  statsPorCidade(painel, cidades, (c, i) => ({
    value: brl(ultD[i].per_capita_r2025),
    label: `Despesa por habitante · ${rotuloCidade(c)}`,
    note: `${perc1(ultR[i].dependencia_transferencias_pct)} de transferências · ${pibPct(df[i])} do PIB · `
      + `${fmtInt.format(ultD[i].populacao)} hab.`,
  }));

  const pops = ultD.map(u => u.populacao);
  const maiorPop = Math.max(...pops), menorPop = Math.min(...pops);
  const razao = maiorPop / menorPop;
  note(painel, `<strong>A primeira coisa que uma comparação honesta precisa dizer é o que ela NÃO faz.</strong>
    Nenhum gráfico desta página mostra reais absolutos. Entre cidades cujos portes variam
    ${razao.toFixed(razao >= 10 ? 0 : 1).replace(".", ",")} vezes — de ${fmtInt.format(menorPop)} a
    ${fmtInt.format(maiorPop)} habitantes —, o valor total do orçamento só responde "qual é a maior", e isso o
    número de habitantes já respondia. O que muda de cidade para cidade — e o que dá para comparar — é
    <strong>quanto cabe a cada habitante, que fatia do bolo vai para cada área e o quanto da receita é
    própria</strong>.`);

  // ---------- despesa por habitante ----------
  const g1 = secao(raiz, "1. Quanto a Prefeitura gasta por habitante",
    "Despesa empenhada dividida pela população de cada ano, corrigida pelo IPCA para reais de 2025.");
  const al1 = graficoMultiplo(g1, {
    cidades, dados: df,
    extrair: (d) => d.serie.map(p => ({ ano: p.ano, valor: p.per_capita_r2025 })),
    yLabel: "Despesa por habitante (R$ de 2025)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v) + " por habitante",
  });
  const ordDesp = cidades.map((c, i) => ({ c, v: ultD[i].per_capita_r2025, ano: ultD[i].ano }))
    .sort((x, y) => y.v - x.v);
  const topo1 = ordDesp[0], fundo1 = ordDesp[ordDesp.length - 1];
  note(g1, `Em ${topo1.ano}, <strong>${rotuloCidade(topo1.c)} gasta ${brl(topo1.v)} por habitante e
    ${rotuloCidade(fundo1.c)} gasta ${brl(fundo1.v)}</strong> — uma diferença de
    ${(topo1.v / fundo1.v).toFixed(1).replace(".", ",")} vezes. Isso não significa que uma gaste bem e a outra mal:
    <strong>uma prefeitura tem um custo mínimo de existir</strong> (prefeito, secretarias, contador, Câmara, uma
    escola, um posto de saúde) que quase não diminui com o tamanho da cidade. Dividido por pouca gente, esse custo
    fixo vira um valor por habitante muito alto — e é por isso que cidades pequenas quase sempre aparecem no topo
    deste indicador.`);
  note(g1, `<strong>O buraco de 2023 é do IBGE, não da coleta.</strong> Todo valor "por habitante" precisa de uma
    população para dividir, e o IBGE não publicou estimativa municipal para 2023 — em nenhuma ${asDelas(n)}
    cidades. O ano fica marcado como sem dado em vez de receber um número interpolado.`);
  if (al1) tabelaComparativa(g1, { cidades, al: al1, caption: "Despesa por habitante, em R$ de 2025", fmt: brl });

  // ---------- receita por habitante ----------
  const g2 = secao(raiz, "2. E quanto ela arrecada por habitante",
    "Receita bruta dividida pela população de cada ano, também em reais de 2025. Separada da despesa de propósito: são grandezas diferentes e dividir um eixo entre elas esconderia as duas.");
  const al2 = graficoMultiplo(g2, {
    cidades, dados: ro,
    extrair: (d) => d.serie.map(p => ({
      ano: p.ano,
      valor: p.populacao ? p.receita_bruta * p.ipca_fator_para_2025 / p.populacao : null,
    })),
    yLabel: "Receita bruta por habitante (R$ de 2025)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v) + " por habitante",
  });
  if (al2) tabelaComparativa(g2, { cidades, al: al2, caption: "Receita bruta por habitante, em R$ de 2025", fmt: brl });

  // ---------- dependência de transferências ----------
  const g3 = secao(raiz, "3. Quanto do dinheiro vem de fora",
    "Parcela da receita bruta que é transferência da União e do estado — FPM, cota-parte do ICMS, SUS, FUNDEB. O resto é o que a cidade arrecada sozinha.");
  const al3 = graficoMultiplo(g3, {
    cidades, dados: ro,
    extrair: (d) => d.serie.map(p => ({ ano: p.ano, valor: p.dependencia_transferencias_pct })),
    yLabel: "% da receita vinda de transferências",
    yFormat: (v) => Math.round(v) + "%",
    yFormatFull: (v) => perc1(v) + " da receita",
    yMaxCap: 100,
  });
  const ordDep = cidades.map((c, i) => ({ c, v: ultR[i].dependencia_transferencias_pct }))
    .sort((x, y) => y.v - x.v);
  note(g3, `<strong>Este é o indicador que mais separa as cidades, e o mais importante da comparação.</strong>
    No último ano fechado vai de <strong>${perc1(ordDep[0].v)} em ${rotuloCidade(ordDep[0].c)}</strong> a
    <strong>${perc1(ordDep[ordDep.length - 1].v)} em ${rotuloCidade(ordDep[ordDep.length - 1].c)}</strong>.
    Quanto mais alta a linha, menor a margem de escolha do governo municipal: dinheiro de transferência costuma
    chegar carimbado para saúde, educação ou uma obra específica, e sobe e desce conforme a arrecadação federal —
    sobre a qual a prefeitura não tem controle nenhum. Uma cidade com dependência alta pode ter orçamento grande e
    mesmo assim decidir muito pouco sobre ele.`);
  if (al3) tabelaComparativa(g3, { cidades, al: al3, caption: "Dependência de transferências, em % da receita bruta", fmt: perc1 });

  // ---------- saldo ----------
  const g4 = secao(raiz, "4. O ano fechou no azul ou no vermelho",
    "Saldo do exercício como percentual da receita — não em reais, para que o resultado de cidades de portes diferentes caiba na mesma régua.");
  const al4 = graficoMultiplo(g4, {
    cidades, dados: rd,
    extrair: (d) => d.serie.map(p => ({
      ano: p.ano,
      valor: p.receita_realizada ? 100 * p.saldo / p.receita_realizada : null,
    })),
    yLabel: "Saldo como % da receita realizada",
    yFormat: (v) => Math.round(v) + "%",
    yFormatFull: (v) => (v >= 0 ? "superávit de " : "déficit de ") + perc1(Math.abs(v)) + " da receita",
  });
  const deficits = rd.map(d => ({ n: d.serie.filter(p => p.saldo < 0).length, total: d.serie.length }));
  note(g4, `${cidades.map((c, i) => `${rotuloCidade(c)} fechou no vermelho em <strong>${deficits[i].n} de
    ${deficits[i].total} anos</strong>`).join("; ")}. Vale a mesma ressalva das páginas individuais:
    <strong>saldo mede equilíbrio de caixa, não qualidade do gasto</strong> — dá para fechar no azul deixando de
    investir, e um déficit pontual pode ser exatamente o ano da obra.`);
  if (al4) tabelaComparativa(g4, { cidades, al: al4, caption: "Saldo do exercício, em % da receita realizada", fmt: perc1 });

  // ---------- composição por função ----------
  // O ano tem de existir em TODAS: pego o menor "último ano" e uso a linha
  // daquele ano em cada cidade, para não comparar 2025 de uma com 2023 de outra.
  const anoF = Math.min(...ultD.map(u => u.ano));
  const linhasAno = df.map((d, i) => d.serie.find(p => p.ano === anoF) || ultD[i]);
  const g5 = secao(raiz, `5. Para onde vai o dinheiro, em ${anoF}`,
    "Percentual do orçamento por função de governo. Percentual e não reais: é a única forma de perguntar 'que prioridade cada cidade dá a esta área' sem que o tamanho do orçamento responda pela pergunta.");

  const share = (p, f) => 100 * (p.funcoes[f] || 0) / p.total_empenhado;
  const todas = [...new Set(linhasAno.flatMap(p => Object.keys(p.funcoes)))];
  const ordenadas = todas
    .map(f => ({ f, peso: Math.max(...linhasAno.map(p => share(p, f))) }))
    .sort((x, y) => y.peso - x.peso);
  const TOPO = ordenadas.slice(0, 8).map(o => o.f);
  const resto = ordenadas.slice(8).map(o => o.f);
  const linhas = TOPO.map(f => ({ rotulo: f, valores: linhasAno.map(p => share(p, f)) }));
  if (resto.length) {
    linhas.push({
      rotulo: `Outras ${resto.length} funções`,
      valores: linhasAno.map(p => resto.reduce((s, f) => s + share(p, f), 0)),
    });
  }
  barrasComparadas(g5, {
    cidades, linhas,
    valueFormat: (v) => v.toFixed(1).replace(".", ",") + "%",
    valueFormatFull: (v) => perc1(v) + " do orçamento",
  });
  const somaSE = linhasAno.map(p => share(p, "Saúde") + share(p, "Educação"));
  note(g5, `<strong>Saúde e Educação somam ${cidades.map((c, i) =>
    `${somaSE[i].toFixed(0)}% em ${rotuloCidade(c)}`).join(", ")}</strong>, e essa semelhança não é coincidência: a
    Constituição obriga todo município a aplicar no mínimo 15% da receita de impostos em saúde e 25% em educação, e
    boa parte do dinheiro chega carimbada via SUS e FUNDEB. <strong>A diferença entre as cidades aparece no que
    sobra depois disso</strong> — é ali que a escolha local realmente acontece.`);
  renderTable(g5, {
    caption: `Despesa por função em ${anoF}, em % do orçamento`,
    columns: ["Função", ...cidades.map(rotuloCidade)],
    rows: linhas.map(l => [l.rotulo, ...l.valores.map(perc1)]),
  });

  // ---------- despesa sobre o PIB ----------
  if (df.every(d => d.comparacao_com_pib)) {
    const g6 = secao(raiz, "6. O peso da Prefeitura na economia local",
      "Despesa da Prefeitura como percentual do PIB do município. Mostra o tamanho do setor público diante de tudo o que a cidade produz.");
    const al6 = graficoMultiplo(g6, {
      cidades, dados: df,
      extrair: (d) => d.comparacao_com_pib.serie.map(p => ({ ano: p.ano, valor: p.despesa_sobre_pib_pct })),
      yLabel: "Despesa da Prefeitura / PIB do município (%)",
      yFormat: (v) => Math.round(v) + "%",
      yFormatFull: (v) => perc1(v) + " do PIB municipal",
    });
    note(g6, `As duas medidas não são da mesma natureza — o PIB mede valor adicionado e o orçamento mede dinheiro
      que passa pelo caixa, boa parte vindo de fora do município — e é por isso que a razão pode passar de 100%.
      Ela não diz que a prefeitura "produz" aquilo; diz o tamanho relativo de uma coisa diante da outra. Há ainda
      uma circularidade a declarar: a rubrica "administração pública" faz parte do próprio PIB, então as duas
      séries não são independentes.`);
    if (al6) tabelaComparativa(g6, { cidades, al: al6, caption: "Despesa da Prefeitura sobre o PIB municipal, em %", fmt: perc1 });
  }

  rodapeFontes(raiz, cidades, null, "os mesmos que alimentam a Fase 3 de cada piloto");
}

// Rodapé de fontes, igual em toda fase.
function rodapeFontes(raiz, cidades, arquivo, oQueSao) {
  const rodape = document.createElement("p");
  rodape.className = "muted-note";
  rodape.innerHTML = `Fontes, cidade a cidade: ` + cidades.map(c =>
    `<a href="${c.pagina}">${rotuloCidade(c)}</a> (<a href="../dados/${c.pasta}/${arquivo || ""}" target="_blank" rel="noopener noreferrer">${arquivo ? arquivo : "pasta de dados"}</a>)`
  ).join(" · ") + `. Os números saem de arquivos que já estavam publicados — ${oQueSao}. Esta página não recalcula
    nada por conta própria: ela normaliza e põe lado a lado.`;
  raiz.appendChild(rodape);
}

// Cabeçalho de uma fase dentro do resultado.
function cabecalhoFase(raiz, fase) {
  const sec = document.createElement("section");
  sec.setAttribute("aria-label", `Fase ${fase.numero} — ${fase.titulo}`);
  const head = document.createElement("div");
  head.className = "section-head";
  const esq = document.createElement("div");
  const kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = `Fase ${fase.numero} · ${fase.titulo}`;
  const h2 = document.createElement("h2");
  h2.textContent = fase.chamada;
  esq.appendChild(kicker); esq.appendChild(h2);
  const p = document.createElement("p");
  p.textContent = fase.descricao;
  head.appendChild(esq); head.appendChild(p);
  sec.appendChild(head);
  raiz.appendChild(sec);
  return sec;
}

function pibPct(df) {
  const c = df.comparacao_com_pib;
  if (!c || !c.serie.length) return "—";
  const u = c.serie[c.serie.length - 1];
  return u.despesa_sobre_pib_pct.toFixed(0) + "%";
}

// Cria um cartão de gráfico no padrão das páginas de piloto.
function secao(raiz, titulo, subtitulo) {
  const div = document.createElement("div");
  div.className = "viz-root";
  const head = document.createElement("div");
  head.className = "viz-head";
  const inner = document.createElement("div");
  const h = document.createElement("h3");
  h.textContent = titulo;
  inner.appendChild(h);
  if (subtitulo) {
    const p = document.createElement("p");
    p.textContent = subtitulo;
    inner.appendChild(p);
  }
  head.appendChild(inner);
  div.appendChild(head);
  raiz.appendChild(div);
  return div;
}

// --- montagem da página -----------------------------------------------------

function acharCidade(slug) {
  return CMP.manifesto.cidades.find(c => c.slug === slug);
}

const SEM = "";   // valor da opção "— nenhuma —"

// Desenha os seletores a partir do estado. Mostra sempre um slot a mais que o
// número de cidades escolhidas (até o teto da paleta): quem quer duas vê três
// campos, sendo o último vazio; quem quer quatro vê quatro. Evita a alternativa
// de deixar quatro seletores sempre visíveis, que polui a escolha mais comum.
function desenharSeletores() {
  const caixa = document.getElementById("cmp-slots");
  caixa.innerHTML = "";
  const total = Math.min(CMP.slugs.length + 1, CMP.maxCidades());
  for (let i = 0; i < total; i++) {
    const slug = CMP.slugs[i] || SEM;
    const c = slug ? acharCidade(slug) : null;
    const campo = document.createElement("div");
    campo.className = "cmp-campo";

    const lab = document.createElement("label");
    lab.setAttribute("for", "cidade-" + i);
    const chip = document.createElement("span");
    chip.className = "cmp-chip";
    chip.setAttribute("aria-hidden", "true");
    // O quadradinho fica cinza no slot vazio: cor é identidade de cidade, e
    // slot sem cidade não tem identidade a mostrar.
    chip.style.setProperty("--cmp-cor", c ? CMP.cor(c) : "var(--line, #dfe5e2)");
    lab.appendChild(chip);
    lab.appendChild(document.createTextNode(" " + (i < 2 ? `Cidade ${i + 1}` : `Cidade ${i + 1} (opcional)`)));

    const sel = document.createElement("select");
    sel.id = "cidade-" + i;
    sel.setAttribute("aria-label", `Cidade ${i + 1} da comparação`);
    // Os dois primeiros slots são obrigatórios: comparar exige pelo menos dois.
    if (i >= 2) {
      const o = document.createElement("option");
      o.value = SEM;
      o.textContent = "— nenhuma —";
      if (!slug) o.selected = true;
      sel.appendChild(o);
    }
    CMP.manifesto.cidades.forEach(cid => {
      const o = document.createElement("option");
      o.value = cid.slug;
      o.textContent = rotuloCidade(cid);
      // Uma cidade já escolhida em outro slot não reaparece na lista: comparar
      // uma cidade com ela mesma não produz informação, e bloquear na origem é
      // melhor que avisar depois do erro.
      if (CMP.slugs.includes(cid.slug) && cid.slug !== slug) return;
      if (cid.slug === slug) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () => {
      const novos = CMP.slugs.slice();
      if (sel.value === SEM) novos.splice(i, 1);
      else novos[i] = sel.value;
      // Compacta: remove vazios e repetidos, mantendo a ordem de escolha.
      CMP.slugs = [...new Set(novos.filter(Boolean))].slice(0, CMP.maxCidades());
      rodar();
    });

    campo.appendChild(lab);
    campo.appendChild(sel);
    caixa.appendChild(campo);
  }
}

function desenharResumos(cidades) {
  const caixa = document.getElementById("cmp-resumos");
  caixa.innerHTML = "";
  cidades.forEach(c => {
    const d = document.createElement("div");
    d.className = "cmp-resumo";
    d.style.setProperty("--cmp-cor", CMP.cor(c));
    d.innerHTML = `<strong>${rotuloCidade(c)}</strong><p>${c.resumo}</p>
      <p><a href="${c.pagina}">Ver o piloto completo →</a></p>`;
    caixa.appendChild(d);
  });
}

function comparar(cidades) {
  const alvo = document.getElementById("resultado");
  alvo.innerHTML = "";
  desenharResumos(cidades);

  const url = new URL(location.href);
  url.searchParams.delete("a");
  url.searchParams.delete("b");
  url.searchParams.set("cidades", cidades.map(c => c.slug).join(","));
  history.replaceState(null, "", url);

  if (cidades.length < 2) {
    alvo.innerHTML = `<div class="cmp-vazio"><strong>Escolha pelo menos duas cidades.</strong>
      <p>Para ver os dados de uma cidade sozinha, a página do piloto dela é mais completa que esta.</p></div>`;
    return;
  }

  // Cada fase declara o que precisa carregar e quem a monta. Acrescentar uma
  // fase nova é acrescentar uma entrada aqui e no manifesto — o resto da página
  // não muda.
  const FASES = {
    demografia: {
      chamada: cidades.length === 2
        ? "Duas trajetórias de população, na mesma régua."
        : `${cidades.length} trajetórias de população, na mesma régua.`,
      arquivos: ["populacao"],
      montar: blocoDemografia,
    },
    financas: {
      chamada: "O que dá para comparar entre cidades de portes diferentes.",
      arquivos: ["receita_despesa", "despesa_funcao", "receita_origem"],
      montar: blocoFase3,
    },
  };

  const declaradas = (CMP.manifesto.fases_comparaveis || []).filter(f => f.disponivel && FASES[f.id]);
  if (!declaradas.length) {
    alvo.innerHTML = `<div class="cmp-vazio">Nenhuma fase comparável declarada em <code>dados/cidades.json</code>.</div>`;
    return;
  }

  const carregarFase = (cfg, c) => Promise.all(cfg.arquivos.map(k => CMP.carregar(c.pasta, c.arquivos[k])));

  // Em série, para que as fases apareçam sempre na mesma ordem.
  declaradas.reduce((fila, fase) => fila.then(() => {
    const cfg = FASES[fase.id];
    return Promise.all(cidades.map(c => carregarFase(cfg, c))).then(docs => {
      const sec = cabecalhoFase(alvo, Object.assign({}, fase, { chamada: cfg.chamada }));
      // Fase de arquivo único recebe o documento direto; de vários, a lista.
      cfg.montar(sec, cidades, cfg.arquivos.length === 1 ? docs.map(d => d[0]) : docs);
    });
  }), Promise.resolve()).catch(err => {
    const aviso = document.createElement("div");
    aviso.className = "cmp-vazio";
    aviso.innerHTML = `<strong>Não foi possível carregar os dados desta comparação.</strong>
      <p>Abra a página por um servidor HTTP e tente de novo. Detalhe técnico: ${String(err.message || err)}</p>`;
    alvo.appendChild(aviso);
  });
}

function rodar() {
  desenharSeletores();
  comparar(CMP.slugs.map(acharCidade).filter(Boolean));
}

// O parágrafo de inventário se conta sozinho. Escrito à mão ele já ficou errado
// uma vez: dizia "quatro cidades" e "onze combinações" depois que o manifesto
// passou a ter dezenove. Número que descreve o manifesto sai do manifesto.
function escreverInventario() {
  const alvo = document.getElementById("cmp-inventario");
  if (!alvo) return;
  const cs = CMP.manifesto.cidades;
  const teto = CMP.maxCidades();
  const comb = (n, k) => {
    let r = 1;
    for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);
    return Math.round(r);
  };
  let total = 0;
  for (let k = 2; k <= Math.min(teto, cs.length); k++) total += comb(cs.length, k);

  const porRecorte = new Map();
  cs.forEach(c => {
    const k = c.recorte || "escolhidas";
    porRecorte.set(k, (porRecorte.get(k) || 0) + 1);
  });
  const rec = CMP.manifesto.recortes || [];
  const grupos = [...porRecorte.entries()].map(([k, n]) => {
    const meta = rec.find(r => r.id === k);
    return meta ? `${n} de ${meta.titulo.split("—")[0].trim()}` : `${n} escolhida${n > 1 ? "s" : ""} uma a uma`;
  });

  const ufs = [...new Set(cs.map(c => c.uf))].sort();
  alvo.innerHTML = `O piloto tem <strong>${cs.length} cidades</strong> no manifesto —
    ${listar(grupos)} —, em ${ufs.length} unidades da federação (${ufs.join(", ")}). Escolhendo de 2 a ${teto}
    por vez, isso dá <strong>${total.toLocaleString("pt-BR")} combinações</strong> possíveis.
    A lista dos seletores acima <em>não está escrita no código</em>: vem de <code>dados/cidades.json</code>.
    Os 15 municípios de Roraima foram acrescentados só àquele arquivo e apareceram aqui sozinhos, sem
    nenhuma alteração nesta página — do mesmo jeito que Barra Bonita e Florianópolis antes deles.`;
}

function iniciar() {
  fetch("../dados/cidades.json").then(r => r.json()).then(m => {
    CMP.manifesto = m;
    const p = new URLSearchParams(location.search);
    const padrao = m.cidades.map(c => c.slug);

    // Aceita o formato novo (?cidades=a,b,c) e o antigo (?a=&b=), para que
    // links compartilhados da versão de duas cidades continuem abrindo.
    let pedidas = (p.get("cidades") || "").split(",").filter(Boolean);
    if (!pedidas.length) pedidas = [p.get("a"), p.get("b")].filter(Boolean);
    pedidas = [...new Set(pedidas.filter(acharCidade))].slice(0, Math.max(2, (m.paleta.clara || []).length));
    while (pedidas.length < 2 && padrao.length >= 2) {
      const proximo = padrao.find(s => !pedidas.includes(s));
      if (!proximo) break;
      pedidas.push(proximo);
    }
    CMP.slugs = pedidas;

    // Trocar de tema repinta as séries: a cor identifica a cidade nos dois modos.
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", rodar);
    escreverInventario();
    rodar();
  }).catch(() => {
    document.getElementById("resultado").innerHTML =
      `<div class="cmp-vazio"><strong>Não foi possível carregar a lista de cidades.</strong>
       <p>O arquivo <code>dados/cidades.json</code> não respondeu. Abra a página por um servidor HTTP.</p></div>`;
  });
}

iniciar();
