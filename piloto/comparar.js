// ===========================================================================
// Comparador de cidades do piloto — versão inicial: só a Fase 3 (Finanças).
//
// Duas regras de projeto que valem para tudo o que for acrescentado aqui:
//
// 1. NENHUMA CIDADE ESTÁ ESCRITA NESTE ARQUIVO. A lista vem de
//    ../dados/cidades.json, que também diz onde ficam os arquivos de cada uma.
//    Acrescentar a terceira cidade é editar aquele manifesto, não este código.
//
// 2. NADA DE VALOR ABSOLUTO. Comparar "R$ 500 milhões" com "R$ 27 milhões" só
//    informa qual cidade é maior, o que já se sabe. Toda métrica aqui é por
//    habitante, percentual ou índice — é o que permite pôr uma cidade de 96 mil
//    e uma de 833 habitantes no mesmo eixo sem mentir.
//
// A cor é CATEGÓRICA e identifica a cidade (nos pilotos individuais verde é
// receita e azul é despesa; aqui a cor muda de significado, e por isso receita
// e despesa ficam em gráficos separados em vez de dividirem um eixo).
// ===========================================================================

const CMP = {
  manifesto: null,
  cache: {},
  raiz: "../dados/",
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

CMP.cor = function (cidade) {
  const escuro = matchMedia("(prefers-color-scheme: dark)").matches
    && document.documentElement.dataset.theme !== "light"
    || document.documentElement.dataset.theme === "dark";
  const paleta = escuro ? CMP.manifesto.paleta.escura : CMP.manifesto.paleta.clara;
  return paleta[cidade.cor_indice % paleta.length];
};

const rotuloCidade = (c) => `${c.nome}/${c.uf}`;

// --- helpers de série -------------------------------------------------------

// Une os anos das duas cidades e devolve um ponto por ano para cada uma, com
// null onde a cidade não tem dado. O renderizador quebra a linha no null, então
// a série de quem começa depois simplesmente começa depois — sem inventar ponto.
function alinhar(a, b, extrair) {
  const ma = new Map(extrair(a).map(p => [p.ano, p.valor]));
  const mb = new Map(extrair(b).map(p => [p.ano, p.valor]));
  const anos = [...new Set([...ma.keys(), ...mb.keys()])].sort((x, y) => x - y);
  return {
    anos,
    a: anos.map(an => (ma.has(an) && ma.get(an) != null ? ma.get(an) : null)),
    b: anos.map(an => (mb.has(an) && mb.get(an) != null ? mb.get(an) : null)),
  };
}

function graficoDuplo(root, { cidades, dados, extrair, yLabel, yFormat, yFormatFull, yMaxCap, legenda, missingLabel }) {
  const [A, B] = cidades;
  const al = alinhar(dados[0], dados[1], extrair);
  if (!al.anos.length) return null;
  renderLineChart(root, {
    series: [
      { key: A.slug, label: legenda ? legenda(A) : rotuloCidade(A), color: CMP.cor(A), points: al.a.map(y => ({ y })) },
      { key: B.slug, label: legenda ? legenda(B) : rotuloCidade(B), color: CMP.cor(B), points: al.b.map(y => ({ y })) },
    ],
    xValues: al.anos.map(String),
    yLabel, yFormat, yFormatFull, yMaxCap,
    // Curto de propósito: este texto é desenhado DENTRO do gráfico, na altura
    // dos rótulos do eixo, e uma frase inteira colide com os anos vizinhos.
    // A explicação do buraco vai na nota abaixo do gráfico, não aqui.
    missingLabel: missingLabel || "Sem dado",
  });
  return al;
}

function tabelaDupla(root, { cidades, al, caption, fmt }) {
  renderTable(root, {
    caption,
    columns: ["Ano", rotuloCidade(cidades[0]), rotuloCidade(cidades[1]), "Diferença"],
    rows: al.anos.map((ano, i) => {
      const x = al.a[i], y = al.b[i];
      return [String(ano), x == null ? "—" : fmt(x), y == null ? "—" : fmt(y),
        (x == null || y == null) ? "—" : fmt(x - y)];
    }),
  });
}

// --- barras pareadas --------------------------------------------------------
// Duas barras por linha, uma por cidade, na mesma régua. Preferi isto a barras
// empilhadas porque a pergunta aqui é "quanto cada cidade destina a esta
// função", e empilhar somaria coisas que não se somam.
function barrasPareadas(root, { cidades, linhas, valueFormat, valueFormatFull }) {
  legend(root, cidades.map(c => ({ label: rotuloCidade(c), color: CMP.cor(c) })));
  // Se houver valor negativo, o trilho vira divergente com o zero no meio.
  const vals = linhas.flatMap(l => [l.a, l.b]).filter(v => v != null);
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
      const v = i === 0 ? l.a : l.b;
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

// --- Fase 1 — demografia ----------------------------------------------------
//
// População absoluta não entra em nenhum gráfico daqui: 96 mil contra 1,6 mil
// contra 856 não cabem no mesmo eixo, e forçar isso deixaria as duas cidades
// pequenas coladas no zero. O que se compara é a TRAJETÓRIA (índice de base
// comum) e a QUEBRA do Censo (em percentual).
function blocoDemografia(raiz, cidades, docs) {
  const [A, B] = cidades;
  const [popA, popB] = docs;
  const perc = (v) => v.toFixed(1).replace(".", ",") + "%";
  const pp = (v) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(1).replace(".", ",") + "%";

  const censos = (d) => Object.fromEntries(d.serie.filter(p => p.fonte === "censo").map(p => [p.ano, p.populacao]));
  const cA = censos(popA), cB = censos(popB);
  const ultA = popA.serie.filter(p => p.populacao != null).slice(-1)[0];
  const ultB = popB.serie.filter(p => p.populacao != null).slice(-1)[0];

  // base do índice: o primeiro ano com dado nas duas cidades
  const anosA = new Set(popA.serie.filter(p => p.populacao != null).map(p => p.ano));
  const base = popB.serie.filter(p => p.populacao != null).map(p => p.ano).find(a => anosA.has(a));

  // ---------- trajetória em índice ----------
  const g1 = secao(raiz, "1. A trajetória da população, na mesma régua",
    `População de cada ano dividida pela do ano-base (${base} = 100). É a única forma de pôr cidades de portes ` +
    `muito diferentes no mesmo eixo — em valor absoluto, a maior achataria as outras contra o zero.`);
  const baseA = popA.serie.find(p => p.ano === base).populacao;
  const baseB = popB.serie.find(p => p.ano === base).populacao;
  const indices = [[popA, baseA], [popB, baseB]].flatMap(([d, b]) =>
    d.serie.filter(p => p.populacao != null).map(p => 100 * p.populacao / b));
  // Teto da régua colado no dado. Sem isso, um máximo de 115 faz o niceMax
  // arredondar para 200 e metade do gráfico fica vazia — e o achatamento
  // esconde justamente a separação entre as duas trajetórias. Múltiplo de 20
  // porque o eixo é dividido em 4 partes: 120 dá marcas em 0/30/60/90/120, e
  // 125 daria 0/31/63/94/125.
  const topo = Math.max(20, Math.ceil(Math.max(...indices) / 20) * 20);

  const al1 = graficoDuplo(g1, {
    cidades, dados: [popA, popB],
    extrair: (d) => {
      const b = d === popA ? baseA : baseB;
      return d.serie.map(p => ({ ano: p.ano, valor: p.populacao == null ? null : 100 * p.populacao / b }));
    },
    yLabel: `Índice ${base} = 100`,
    yFormat: (v) => String(Math.round(v)),
    yFormatFull: (v) => v.toFixed(1).replace(".", ",") + ` (base 100 em ${base})`,
    yMaxCap: topo,
  });

  const idxA = 100 * ultA.populacao / baseA, idxB = 100 * ultB.populacao / baseB;
  renderStats(g1, [
    { value: Math.round(idxA) + " / 100", label: `${rotuloCidade(A)} em ${ultA.ano}`, note: `${pp(idxA - 100)} desde ${base}` },
    { value: Math.round(idxB) + " / 100", label: `${rotuloCidade(B)} em ${ultB.ano}`, note: `${pp(idxB - 100)} desde ${base}` },
    { value: fmtInt.format(ultA.populacao) + " · " + fmtInt.format(ultB.populacao), label: `Habitantes em ${ultA.ano}`, note: "Os números absolutos, para referência — não é o que o gráfico compara" },
  ]);

  note(g1, `<strong>O índice responde "para onde cada cidade foi", não "qual é maior".</strong> Cada linha começa em
    100 no ano-base e mostra a variação relativa dali em diante, então uma cidade de mil habitantes e uma de cem mil
    cabem lado a lado sem que a diferença de porte engula a comparação. Os números absolutos ficam nos cartões
    acima e na tabela abaixo, para quem precisar deles.`);

  if (al1) tabelaDupla(g1, {
    cidades, al: al1, caption: `População em índice, ${base} = 100`,
    fmt: (v) => v.toFixed(1).replace(".", ","),
  });

  // ---------- variação entre Censos ----------
  const anosCenso = [2000, 2010, 2022].filter(a => cA[a] != null && cB[a] != null);
  if (anosCenso.length >= 2) {
    const g2 = secao(raiz, "2. O que mudou de um Censo para o outro",
      "Variação percentual entre contagens completas — não entre estimativas. É a medida mais firme que existe de " +
      "crescimento ou perda de população, porque cada ponto é um recenseamento, não uma projeção.");
    const pares = [];
    for (let i = 0; i + 1 < anosCenso.length; i++) {
      const de = anosCenso[i], para = anosCenso[i + 1];
      pares.push({ rotulo: `${de} → ${para}`, a: 100 * (cA[para] / cA[de] - 1), b: 100 * (cB[para] / cB[de] - 1) });
    }
    const pri = anosCenso[0], ultC = anosCenso[anosCenso.length - 1];
    pares.push({
      rotulo: `${pri} → ${ultC} (total)`,
      a: 100 * (cA[ultC] / cA[pri] - 1), b: 100 * (cB[ultC] / cB[pri] - 1),
    });

    barrasPareadas(g2, {
      cidades, linhas: pares,
      valueFormat: (v) => pp(v),
      valueFormatFull: (v) => pp(v) + " entre os dois Censos",
    });

    const totA = 100 * (cA[ultC] / cA[pri] - 1), totB = 100 * (cB[ultC] / cB[pri] - 1);
    const mesmaDirecao = (totA >= 0) === (totB >= 0);
    note(g2, mesmaDirecao
      ? `Entre ${pri} e ${ultC} as duas cidades foram para o mesmo lado: ${rotuloCidade(A)} ${pp(totA)} e
         ${rotuloCidade(B)} ${pp(totB)}. A diferença está no ritmo, não no sentido.`
      : `<strong>As duas foram para lados opostos.</strong> Entre ${pri} e ${ultC}, ${rotuloCidade(A)} variou
         ${pp(totA)} e ${rotuloCidade(B)} variou ${pp(totB)}. A barra cresce para a direita quando a população
         subiu e para a esquerda quando caiu; a linha vertical é o zero.`);

    renderTable(g2, {
      caption: "População nos Censos e variação entre eles",
      columns: ["Censo", rotuloCidade(A), rotuloCidade(B)],
      rows: anosCenso.map(a => [String(a), fmtInt.format(cA[a]), fmtInt.format(cB[a])])
        .concat(pares.map(p => [p.rotulo, pp(p.a), pp(p.b)])),
    });
  }

  // ---------- a quebra do Censo 2022 ----------
  const quebra = (d, c) => {
    if (!c[2022]) return null;
    const antes = d.serie.filter(p => p.ano < 2022 && p.populacao != null && p.fonte === "estimativa").slice(-1)[0];
    if (!antes) return null;
    return { ano: antes.ano, estimativa: antes.populacao, censo: c[2022], dif: 100 * (c[2022] / antes.populacao - 1) };
  };
  const qA = quebra(popA, cA), qB = quebra(popB, cB);
  if (qA && qB) {
    const g3 = secao(raiz, "3. O tamanho do erro da estimativa",
      "Nos anos entre Censos o IBGE publica uma estimativa, que é projeção e não contagem. O Censo 2022 mostrou " +
      "de quanto era o desvio acumulado — e o sinal do desvio não é o mesmo em toda cidade.");
    renderStats(g3, [
      { value: pp(qA.dif), label: `Correção do Censo 2022 · ${rotuloCidade(A)}`, note: `Estimativa de ${qA.ano}: ${fmtInt.format(qA.estimativa)} · Censo: ${fmtInt.format(qA.censo)}` },
      { value: pp(qB.dif), label: `Correção do Censo 2022 · ${rotuloCidade(B)}`, note: `Estimativa de ${qB.ano}: ${fmtInt.format(qB.estimativa)} · Censo: ${fmtInt.format(qB.censo)}` },
    ]);

    const sinais = (qA.dif >= 0) === (qB.dif >= 0);
    note(g3, sinais
      ? `Nas duas cidades a estimativa errou para o mesmo lado — ${qA.dif >= 0 ? "abaixo" : "acima"} da contagem
         real —, com desvios de ${pp(qA.dif)} e ${pp(qB.dif)}.`
      : `<strong>A estimativa errou para lados opostos nas duas cidades.</strong> Em ${rotuloCidade(A)} ela vinha
         ${qA.dif < 0 ? "acima" : "abaixo"} do que o Censo depois contou (${pp(qA.dif)} de correção); em
         ${rotuloCidade(B)}, ${qB.dif < 0 ? "acima" : "abaixo"} (${pp(qB.dif)}). Isso importa para tudo o que se
         divide por população: <strong>um valor "por habitante" calculado com a estimativa de 2021 carrega esse
         erro embutido</strong>, e em direções contrárias dependendo da cidade.`);

    note(g3, `<strong>Por que a estimativa erra mais em cidade pequena.</strong> Ela é uma projeção construída a
      partir do Censo anterior e de tendências regionais, não uma contagem. Quanto menor o município, menos massa o
      método tem para trabalhar e mais uma variação de poucas dezenas de pessoas pesa em termos percentuais. É por
      isso que os anos de Censo aparecem com marcador maior nos gráficos das páginas individuais — eles valem mais
      que os anos intermediários.`);

    note(g3, `Uma nota de cobertura, e ela vale para as três cidades do piloto: <strong>o IBGE não publica
      estimativa municipal para 2007 nem para 2023</strong>. Nos gráficos acima esses dois anos aparecem como
      buraco, não como valor interpolado.`);
  }

  rodapeFontes(raiz, cidades, "populacao_2000_2025.json", "as mesmas que alimentam a Fase 1 de cada piloto");
}

// --- os blocos da Fase 3 ----------------------------------------------------

function blocoFase3(raiz, cidades, docs) {
  const [A, B] = cidades;
  const [rdA, dfA, roA] = docs[0], [rdB, dfB, roB] = docs[1];
  const ultA = dfA.serie[dfA.serie.length - 1], ultB = dfB.serie[dfB.serie.length - 1];
  const recA = roA.serie[roA.serie.length - 1], recB = roB.serie[roB.serie.length - 1];

  const brl = (v) => "R$ " + fmtInt.format(Math.round(v));
  const perc = (v) => v.toFixed(1).replace(".", ",") + "%";

  // ---------- painel de contraste ----------
  const painel = secao(raiz, "O contraste em quatro números",
    `Todos do último ano fechado de cada cidade. Os valores por habitante estão em reais de 2025.`);
  const razaoPop = ultA.populacao / ultB.populacao;
  renderStats(painel, [
    {
      value: (razaoPop >= 1 ? razaoPop : 1 / razaoPop).toFixed(razaoPop >= 10 ? 0 : 1).replace(".", ",") + "×",
      label: "Diferença de população",
      note: `${fmtInt.format(ultA.populacao)} contra ${fmtInt.format(ultB.populacao)} habitantes`,
    },
    {
      value: brl(ultA.per_capita_r2025) + " · " + brl(ultB.per_capita_r2025),
      label: "Despesa por habitante",
      note: `${rotuloCidade(A)} · ${rotuloCidade(B)}`,
    },
    {
      value: perc(recA.dependencia_transferencias_pct) + " · " + perc(recB.dependencia_transferencias_pct),
      label: "Da receita vem de transferência",
      note: "Quanto menor, maior a autonomia fiscal",
    },
    {
      value: pibPct(dfA) + " · " + pibPct(dfB),
      label: "Despesa da Prefeitura sobre o PIB",
      note: "Peso do setor público na economia local",
    },
  ]);
  note(painel, `<strong>A primeira coisa que uma comparação honesta precisa dizer é o que ela NÃO faz.</strong>
    Nenhum gráfico desta página mostra reais absolutos. Entre duas cidades de portes tão diferentes, o valor total
    do orçamento só responde "qual é a maior", e isso o número de habitantes já respondia. O que muda de cidade
    para cidade — e o que dá para comparar — é <strong>quanto cabe a cada habitante, que fatia do bolo vai para
    cada área e o quanto da receita é própria</strong>.`);

  // ---------- despesa por habitante ----------
  const g1 = secao(raiz, "1. Quanto a Prefeitura gasta por habitante",
    "Despesa empenhada dividida pela população de cada ano, corrigida pelo IPCA para reais de 2025.");
  const al1 = graficoDuplo(g1, {
    cidades, dados: [dfA, dfB],
    extrair: (d) => d.serie.map(p => ({ ano: p.ano, valor: p.per_capita_r2025 })),
    yLabel: "Despesa por habitante (R$ de 2025)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v) + " por habitante",
  });
  const maior = ultA.per_capita_r2025 >= ultB.per_capita_r2025 ? [A, ultA, B, ultB] : [B, ultB, A, ultA];
  note(g1, `Em ${maior[1].ano}, <strong>${rotuloCidade(maior[0])} gasta ${brl(maior[1].per_capita_r2025)} por
    habitante e ${rotuloCidade(maior[2])} gasta ${brl(maior[3].per_capita_r2025)}</strong> — uma diferença de
    ${(maior[1].per_capita_r2025 / maior[3].per_capita_r2025).toFixed(1).replace(".", ",")} vezes. Isso não
    significa que uma gaste bem e a outra mal: <strong>uma prefeitura tem um custo mínimo de existir</strong>
    (prefeito, secretarias, contador, Câmara, uma escola, um posto de saúde) que quase não diminui com o tamanho da
    cidade. Dividido por pouca gente, esse custo fixo vira um valor por habitante muito alto — e é por isso que
    cidades pequenas quase sempre aparecem no topo deste indicador.`);
  note(g1, `<strong>O buraco de 2023 é do IBGE, não da coleta.</strong> Todo valor "por habitante" precisa de uma
    população para dividir, e o IBGE não publicou estimativa municipal para 2023 — em nenhuma das duas cidades.
    O ano fica marcado como sem dado em vez de receber um número interpolado. <span style="opacity:.85">Vale
    lembrar também que a população dos anos entre Censos é estimativa, e o Censo 2022 mostrou que ela errava
    para lados opostos nas duas cidades: para cima em Itajubá, para baixo em Serra da Saudade.</span>`);
  if (al1) tabelaDupla(g1, { cidades, al: al1, caption: "Despesa por habitante, em R$ de 2025", fmt: brl });

  // ---------- receita por habitante ----------
  const g2 = secao(raiz, "2. E quanto ela arrecada por habitante",
    "Receita bruta dividida pela população de cada ano, também em reais de 2025. Separada da despesa de propósito: são grandezas diferentes e dividir um eixo entre elas esconderia as duas.");
  const al2 = graficoDuplo(g2, {
    cidades, dados: [roA, roB],
    extrair: (d) => d.serie.map(p => ({
      ano: p.ano,
      valor: p.populacao ? p.receita_bruta * p.ipca_fator_para_2025 / p.populacao : null,
    })),
    yLabel: "Receita bruta por habitante (R$ de 2025)",
    yFormat: (v) => "R$ " + fmtMoneyCompact(v),
    yFormatFull: (v) => fmtMoneyFull(v) + " por habitante",
  });
  if (al2) tabelaDupla(g2, { cidades, al: al2, caption: "Receita bruta por habitante, em R$ de 2025", fmt: brl });

  // ---------- dependência de transferências ----------
  const g3 = secao(raiz, "3. Quanto do dinheiro vem de fora",
    "Parcela da receita bruta que é transferência da União e do estado — FPM, cota-parte do ICMS, SUS, FUNDEB. O resto é o que a cidade arrecada sozinha.");
  const al3 = graficoDuplo(g3, {
    cidades, dados: [roA, roB],
    extrair: (d) => d.serie.map(p => ({ ano: p.ano, valor: p.dependencia_transferencias_pct })),
    yLabel: "% da receita vinda de transferências",
    yFormat: (v) => Math.round(v) + "%",
    yFormatFull: (v) => perc(v) + " da receita",
    yMaxCap: 100,
  });
  note(g3, `<strong>Este é o indicador que mais separa as duas cidades, e o mais importante da comparação.</strong>
    Quanto mais alta a linha, menor a margem de escolha do governo municipal: dinheiro de transferência costuma chegar
    carimbado para saúde, educação ou uma obra específica, e sobe e desce conforme a arrecadação federal — sobre a
    qual a prefeitura não tem controle nenhum. Uma cidade com dependência alta pode ter orçamento grande e mesmo
    assim decidir muito pouco sobre ele.`);
  if (al3) tabelaDupla(g3, { cidades, al: al3, caption: "Dependência de transferências, em % da receita bruta", fmt: perc });

  // ---------- saldo ----------
  const g4 = secao(raiz, "4. O ano fechou no azul ou no vermelho",
    "Saldo do exercício como percentual da receita — não em reais, para que o resultado de cidades de portes diferentes caiba na mesma régua.");
  const al4 = graficoDuplo(g4, {
    cidades, dados: [rdA, rdB],
    extrair: (d) => d.serie.map(p => ({
      ano: p.ano,
      valor: p.receita_realizada ? 100 * p.saldo / p.receita_realizada : null,
    })),
    yLabel: "Saldo como % da receita realizada",
    yFormat: (v) => Math.round(v) + "%",
    yFormatFull: (v) => (v >= 0 ? "superávit de " : "déficit de ") + perc(Math.abs(v)) + " da receita",
  });
  const defA = rdA.serie.filter(p => p.saldo < 0).length, defB = rdB.serie.filter(p => p.saldo < 0).length;
  note(g4, `${rotuloCidade(A)} fechou no vermelho em <strong>${defA} de ${rdA.serie.length} anos</strong>;
    ${rotuloCidade(B)}, em <strong>${defB} de ${rdB.serie.length}</strong>. Vale a mesma ressalva das páginas
    individuais: <strong>saldo mede equilíbrio de caixa, não qualidade do gasto</strong> — dá para fechar no azul
    deixando de investir, e um déficit pontual pode ser exatamente o ano da obra.`);
  if (al4) tabelaDupla(g4, { cidades, al: al4, caption: "Saldo do exercício, em % da receita realizada", fmt: perc });

  // ---------- composição por função ----------
  const anoF = Math.min(ultA.ano, ultB.ano);
  const fa = dfA.serie.find(p => p.ano === anoF) || ultA;
  const fb = dfB.serie.find(p => p.ano === anoF) || ultB;
  const g5 = secao(raiz, `5. Para onde vai o dinheiro, em ${anoF}`,
    "Percentual do orçamento por função de governo. Percentual e não reais: é a única forma de perguntar 'que prioridade cada cidade dá a esta área' sem que o tamanho do orçamento responda pela pergunta.");

  const share = (p, f) => 100 * (p.funcoes[f] || 0) / p.total_empenhado;
  const todas = [...new Set([...Object.keys(fa.funcoes), ...Object.keys(fb.funcoes)])];
  const ordenadas = todas
    .map(f => ({ f, peso: Math.max(share(fa, f), share(fb, f)) }))
    .sort((x, y) => y.peso - x.peso);
  const TOPO = ordenadas.slice(0, 8).map(o => o.f);
  const resto = ordenadas.slice(8).map(o => o.f);
  const linhas = TOPO.map(f => ({ rotulo: f, a: share(fa, f), b: share(fb, f) }));
  if (resto.length) {
    linhas.push({
      rotulo: `Outras ${resto.length} funções`,
      a: resto.reduce((s, f) => s + share(fa, f), 0),
      b: resto.reduce((s, f) => s + share(fb, f), 0),
    });
  }
  barrasPareadas(g5, {
    cidades, linhas,
    valueFormat: (v) => v.toFixed(1).replace(".", ",") + "%",
    valueFormatFull: (v) => perc(v) + " do orçamento",
  });
  const saudeA = share(fa, "Saúde"), saudeB = share(fb, "Saúde");
  const educA = share(fa, "Educação"), educB = share(fb, "Educação");
  note(g5, `<strong>Saúde e Educação somam ${(saudeA + educA).toFixed(0)}% do orçamento em ${rotuloCidade(A)} e
    ${(saudeB + educB).toFixed(0)}% em ${rotuloCidade(B)}</strong>, e essa semelhança não é coincidência: a
    Constituição obriga todo município a aplicar no mínimo 15% da receita de impostos em saúde e 25% em educação, e
    boa parte do dinheiro chega carimbada via SUS e FUNDEB. <strong>A diferença entre duas cidades aparece no que
    sobra depois disso</strong> — é ali que a escolha local realmente acontece.`);
  renderTable(g5, {
    caption: `Despesa por função em ${anoF}, em % do orçamento`,
    columns: ["Função", rotuloCidade(A), rotuloCidade(B), "Diferença (p.p.)"],
    rows: linhas.map(l => [l.rotulo, perc(l.a), perc(l.b),
      ((l.a - l.b) >= 0 ? "+" : "−") + Math.abs(l.a - l.b).toFixed(1).replace(".", ",")]),
  });

  // ---------- despesa sobre o PIB ----------
  if (dfA.comparacao_com_pib && dfB.comparacao_com_pib) {
    const g6 = secao(raiz, "6. O peso da Prefeitura na economia local",
      "Despesa da Prefeitura como percentual do PIB do município. Mostra o tamanho do setor público diante de tudo o que a cidade produz.");
    const al6 = graficoDuplo(g6, {
      cidades, dados: [dfA, dfB],
      extrair: (d) => d.comparacao_com_pib.serie.map(p => ({ ano: p.ano, valor: p.despesa_sobre_pib_pct })),
      yLabel: "Despesa da Prefeitura / PIB do município (%)",
      yFormat: (v) => Math.round(v) + "%",
      yFormatFull: (v) => perc(v) + " do PIB municipal",
    });
    note(g6, `As duas medidas não são da mesma natureza — o PIB mede valor adicionado e o orçamento mede dinheiro
      que passa pelo caixa, boa parte vindo de fora do município — e é por isso que a razão pode passar de 100%.
      Ela não diz que a prefeitura "produz" aquilo; diz o tamanho relativo de uma coisa diante da outra. Há ainda
      uma circularidade a declarar: a rubrica "administração pública" faz parte do próprio PIB, então as duas
      séries não são independentes.`);
    if (al6) tabelaDupla(g6, { cidades, al: al6, caption: "Despesa da Prefeitura sobre o PIB municipal, em %", fmt: perc });
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

function preencherSeletores(selA, selB, a, b) {
  [[selA, a], [selB, b]].forEach(([sel, atual]) => {
    sel.innerHTML = "";
    CMP.manifesto.cidades.forEach(c => {
      const o = document.createElement("option");
      o.value = c.slug;
      o.textContent = rotuloCidade(c);
      if (c.slug === atual) o.selected = true;
      sel.appendChild(o);
    });
  });
}

function pintarSeletores(A, B) {
  document.getElementById("chip-a").style.setProperty("--cmp-cor", CMP.cor(A));
  document.getElementById("chip-b").style.setProperty("--cmp-cor", CMP.cor(B));
  const rA = document.getElementById("resumo-a"), rB = document.getElementById("resumo-b");
  [[rA, A], [rB, B]].forEach(([el_, c]) => {
    el_.style.setProperty("--cmp-cor", CMP.cor(c));
    el_.innerHTML = `<strong>${rotuloCidade(c)}</strong><p>${c.resumo}</p>
      <p><a href="${c.pagina}">Ver o piloto completo →</a></p>`;
  });
}

function comparar(slugA, slugB) {
  const A = acharCidade(slugA), B = acharCidade(slugB);
  const alvo = document.getElementById("resultado");
  alvo.innerHTML = "";
  pintarSeletores(A, B);

  const url = new URL(location.href);
  url.searchParams.set("a", A.slug);
  url.searchParams.set("b", B.slug);
  history.replaceState(null, "", url);

  if (A.slug === B.slug) {
    alvo.innerHTML = `<div class="cmp-vazio"><strong>Escolha duas cidades diferentes.</strong>
      <p>Comparar uma cidade com ela mesma não produz nenhuma informação nova — para ver os dados de
      ${rotuloCidade(A)} sozinha, a página do piloto dela é mais completa que esta.</p>
      <p><a href="${A.pagina}">Abrir o piloto de ${rotuloCidade(A)} →</a></p></div>`;
    return;
  }

  // Cada fase declara o que precisa carregar e quem a monta. Acrescentar uma
  // fase nova é acrescentar uma entrada aqui e no manifesto — o resto da página
  // não muda.
  const FASES = {
    demografia: {
      chamada: "Duas trajetórias de população, na mesma régua.",
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
    return Promise.all([carregarFase(cfg, A), carregarFase(cfg, B)]).then(docs => {
      const sec = cabecalhoFase(alvo, Object.assign({}, fase, { chamada: cfg.chamada }));
      cfg.montar(sec, [A, B], docs.length === 2 && cfg.arquivos.length === 1
        ? [docs[0][0], docs[1][0]] : docs);
    });
  }), Promise.resolve()).catch(err => {
    const aviso = document.createElement("div");
    aviso.className = "cmp-vazio";
    aviso.innerHTML = `<strong>Não foi possível carregar os dados desta comparação.</strong>
      <p>Abra a página por um servidor HTTP e tente de novo. Detalhe técnico: ${String(err.message || err)}</p>`;
    alvo.appendChild(aviso);
  });
}

function iniciar() {
  fetch("../dados/cidades.json").then(r => r.json()).then(m => {
    CMP.manifesto = m;
    const selA = document.getElementById("cidade-a"), selB = document.getElementById("cidade-b");
    const p = new URLSearchParams(location.search);
    const padrao = m.cidades.map(c => c.slug);
    let a = acharCidade(p.get("a")) ? p.get("a") : padrao[0];
    let b = acharCidade(p.get("b")) ? p.get("b") : (padrao[1] || padrao[0]);

    preencherSeletores(selA, selB, a, b);
    const rodar = () => comparar(selA.value, selB.value);
    selA.addEventListener("change", rodar);
    selB.addEventListener("change", rodar);
    document.getElementById("trocar").addEventListener("click", () => {
      const t = selA.value; selA.value = selB.value; selB.value = t; rodar();
    });
    // Trocar de tema repinta as séries: a cor identifica a cidade nos dois modos.
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", rodar);
    rodar();
  }).catch(() => {
    document.getElementById("resultado").innerHTML =
      `<div class="cmp-vazio"><strong>Não foi possível carregar a lista de cidades.</strong>
       <p>O arquivo <code>dados/cidades.json</code> não respondeu. Abra a página por um servidor HTTP.</p></div>`;
  });
}

iniciar();
