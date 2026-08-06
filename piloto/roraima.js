// ===========================================================================
// Roraima — o primeiro ESTADO INTEIRO do projeto.
//
// O que muda em relação às quatro páginas de cidade. Lá a unidade é um
// município escolhido, e a pergunta é "o que dá para saber sobre este lugar?".
// Aqui o recorte é fechado: todos os 15 municípios de uma unidade da federação,
// sem seleção, sem cidade deixada de fora por ser difícil. Isso troca a
// pergunta por outra — "o que aparece quando NINGUÉM fica de fora?" — e cobra
// um preço que as páginas de cidade não pagam: a soma das partes tem de bater
// com o todo publicado pelo IBGE. Os três testes de fechamento (população, área
// e PIB) estão no fim da página, e todos os três batem.
//
// A segunda diferença é de cor. O comparador tem teto de quatro cidades porque
// lá a cor é CATEGÓRICA: ela diz qual cidade é qual, e cada tom precisa se
// distinguir de todos os outros inclusive sob daltonismo. Aqui não há teto de
// 15 porque a cor do mapa é SEQUENCIAL: um matiz só, do claro ao escuro, e ela
// diz QUANTO, não QUEM. Quem é cada município, diz o rótulo escrito no mapa.
//
// Nenhum número mora neste arquivo. Tudo vem de ../dados/roraima/.
// ===========================================================================

const RR = { dir: "../dados/roraima/", cache: {} };

RR.get = function (nome) {
  if (!this.cache[nome]) {
    this.cache[nome] = fetch(this.dir + nome).then(r => {
      if (!r.ok) throw new Error(nome + ": HTTP " + r.status);
      return r.json();
    });
  }
  return this.cache[nome];
};

// Anos de referência. São TRÊS e diferentes, porque as fontes terminam em
// pontos diferentes, e forçar um ano só significaria ou jogar fora o dado mais
// recente ou inventar o que falta. Cada gráfico diz na cara qual está usando.
const RR_ANO_FIN = 2024;    // último ano com DCA declarado pelos 15
const RR_ANO_PIB = 2022;    // último com PIB publicado E população de Censo
const RR_ANO_VAB = 2021;    // último com abertura setorial do valor adicionado

const rrNum = (v, d = 1) => (v == null ? "—" : v.toFixed(d).replace(".", ","));
const rrPct = (v, d = 1) => rrNum(v, d) + "%";
const rrInt = (v) => (v == null ? "—" : Math.round(v).toLocaleString("pt-BR"));
const rrReais = (v) => (v == null ? "—" : "R$ " + Math.round(v).toLocaleString("pt-BR"));
const rrKm2 = (v) => rrInt(v) + " km²";

// ---------------------------------------------------------------------------
// Índice de todos os indicadores por município, montado uma vez e reusado pelo
// mapa, pelos rankings e pela tabela. Sem isso cada gráfico refaria o cruzamento
// entre quatro arquivos e uma correção num deles teria de ser feita em todos.
// ---------------------------------------------------------------------------
function rrIndice(perfil, fin, pib) {
  const finPor = {}, pibPor = {};
  fin.municipios.forEach(m => { finPor[m.ibge] = m; });
  pib.municipios.forEach(m => { pibPor[m.ibge] = m; });

  return perfil.municipios.map(p => {
    const f = (finPor[p.ibge].serie || []).find(s => s.ano === RR_ANO_FIN && s.declarado) || {};
    const sp = pibPor[p.ibge].serie || [];
    const pPib = sp.find(s => s.ano === RR_ANO_PIB) || {};
    const pVab = sp.find(s => s.ano === RR_ANO_VAB) || {};
    const adm = (pVab.vab_setores_pct || {})["Administração pública"];
    return {
      ibge: p.ibge,
      nome: p.nome,
      mesorregiao: p.mesorregiao,
      populacao: p.populacao_2022,
      area_km2: p.area_km2,
      densidade: p.densidade_hab_km2,
      crescimento: p.taxa_crescimento_2010_2022_aa_pct,
      pct_populacao: p.pct_da_populacao_do_estado,
      pct_area: p.pct_da_area_do_estado,
      indigena_pct_2022: p.cor_ou_raca["Indígena"].pct_2022,
      indigena_pct_2010: p.cor_ou_raca["Indígena"].pct_2010,
      indigena_2022: p.cor_ou_raca["Indígena"]["2022"],
      receita_per_capita: f.receita_per_capita_r2025 ?? null,
      despesa_per_capita: f.despesa_per_capita_r2025 ?? null,
      dependencia: f.dependencia_transferencias_pct ?? null,
      fpm_per_capita: f.fpm_per_capita_r2025 ?? null,
      pessoal_pct: f.pessoal_sobre_despesa_pct ?? null,
      investimento_pct: f.investimento_sobre_despesa_pct ?? null,
      pib_per_capita: pPib.pib_per_capita ?? null,
      adm_publica_pct: adm ?? null,
    };
  });
}

// ---------------------------------------------------------------------------
// O MAPA. É o pedido central desta página: o estado inteiro, de uma vez.
// ---------------------------------------------------------------------------
function rrMapa(root, malha, indice) {
  const porCod = {};
  indice.forEach(d => { porCod[d.ibge] = d; });

  const municipios = malha.municipios.map(m => {
    const d = porCod[m.ibge];
    return {
      ibge: m.ibge, nome: m.nome, aneis: m.aneis, rotulo: m.rotulo,
      populacao: d.populacao, area_km2: d.area_km2,
      pct_populacao: d.pct_populacao, pct_area: d.pct_area,
      valores: {
        populacao: d.populacao,
        densidade: d.densidade,
        crescimento: d.crescimento,
        indigena: d.indigena_pct_2022,
        receita: d.receita_per_capita,
        dependencia: d.dependencia,
        pib: d.pib_per_capita,
        adm: d.adm_publica_pct,
        investimento: d.investimento_pct,
      },
    };
  });

  const indicadores = [
    { chave: "populacao", titulo: "População (Censo 2022)", unidade: "habitantes",
      formato: rrInt, formatoLongo: (v) => rrInt(v) + " hab.",
      nota: "Boa Vista sozinha tem mais gente que os outros catorze municípios somados — e ainda sobra." },
    { chave: "densidade", titulo: "Densidade demográfica", unidade: "hab./km²",
      formato: (v) => rrNum(v, 2), formatoLongo: (v) => rrNum(v, 2) + " hab./km²",
      nota: "O mapa da densidade é quase o negativo do mapa da área: os maiores municípios são os mais vazios." },
    { chave: "crescimento", titulo: "Crescimento anual 2010–2022", unidade: "% ao ano",
      formato: (v) => rrPct(v, 1), formatoLongo: (v) => rrPct(v, 2) + " ao ano",
      nota: "Taxa geométrica entre os dois Censos. Pacaraima, na fronteira com a Venezuela, é a que mais cresce." },
    { chave: "indigena", titulo: "População indígena", unidade: "% do município",
      formato: (v) => rrPct(v, 0), formatoLongo: (v) => rrPct(v, 1) + " da população",
      nota: "Autodeclaração de cor ou raça no Censo 2022. Em seis dos quinze municípios os indígenas passam de 40% da população." },
    { chave: "receita", titulo: `Receita por habitante (${RR_ANO_FIN})`, unidade: "R$ de 2025",
      formato: rrReais, formatoLongo: (v) => rrReais(v) + " por habitante",
      nota: "Receita líquida realizada da prefeitura, corrigida pelo IPCA para reais de 2025 e dividida pela população estimada do ano." },
    { chave: "dependencia", titulo: `Dependência de transferências (${RR_ANO_FIN})`, unidade: "% da receita",
      formato: (v) => rrPct(v, 0), formatoLongo: (v) => rrPct(v, 1) + " da receita bruta",
      nota: "Quanto da receita vem de transferências da União e do estado, em vez de arrecadação própria. Nos 15 municípios de Roraima, nenhum fica abaixo de 75%." },
    { chave: "pib", titulo: `PIB por habitante (${RR_ANO_PIB})`, unidade: "R$ correntes",
      formato: rrReais, formatoLongo: (v) => rrReais(v) + " por habitante",
      nota: "Valores correntes de 2022, como o IBGE publica — não há PIB municipal a preços constantes." },
    { chave: "adm", titulo: `Administração pública no PIB (${RR_ANO_VAB})`, unidade: "% do valor adicionado",
      formato: (v) => rrPct(v, 0), formatoLongo: (v) => rrPct(v, 1) + " do valor adicionado",
      nota: "Inclui administração, defesa, educação e saúde públicas e seguridade social, dos três níveis de governo. É a medida de quanto da economia local É o setor público." },
    { chave: "investimento", titulo: `Investimento na despesa (${RR_ANO_FIN})`, unidade: "% do empenhado",
      formato: (v) => rrPct(v, 0), formatoLongo: (v) => rrPct(v, 1) + " da despesa empenhada",
      nota: "Investimentos sobre o Total Geral da Despesa do Anexo I-D. Percentual alto num orçamento pequeno costuma ser uma obra só." },
  ];

  renderMapaEstado(root, {
    municipios, contorno: malha.contorno_estado, indicadores, indicadorInicial: "populacao",
  });

  note(root, `<strong>Todos os 15 municípios, sem seleção.</strong> Troque o indicador no seletor acima — a
    geometria é a mesma, muda o que a cor representa. Os municípios menores no mapa não trazem o
    nome escrito para não sobrepor o vizinho; o balão os identifica. Malha do IBGE
    (${malha.fonte.includes("intermediária") ? "qualidade intermediária" : "IBGE"}), com a área de cada polígono
    conferida contra a área oficial — a maior divergência ficou em 0,5%.`);

  renderTable(root, {
    caption: "Indicadores por município",
    columns: ["Município", "População 2022", "Área (km²)", "Densidade", "Indígena", `Receita/hab. ${RR_ANO_FIN}`, "Dependência", `PIB/hab. ${RR_ANO_PIB}`],
    rows: indice.slice().sort((a, b) => b.populacao - a.populacao).map(d => [
      d.nome, rrInt(d.populacao), rrInt(d.area_km2), rrNum(d.densidade, 2),
      rrPct(d.indigena_pct_2022, 1), rrReais(d.receita_per_capita),
      rrPct(d.dependencia, 1), rrReais(d.pib_per_capita),
    ]),
  });
}

// ---------------------------------------------------------------------------
// A concentração. Duas fatias do mesmo estado, uma ao lado da outra.
// ---------------------------------------------------------------------------
function rrConcentracao(root, indice, contexto) {
  const st = getComputedStyle(root);
  const cPop = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const cArea = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const dados = indice.slice().sort((a, b) => b.pct_populacao - a.pct_populacao);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [
      { chave: "pct_populacao", rotulo: "% da população do estado", cor: cPop },
      { chave: "pct_area", rotulo: "% da área do estado", cor: cArea },
    ],
    valueFormat: (v) => rrPct(v, 1), valueFormatFull: (v) => rrPct(v, 2) + " do estado",
    ariaLabel: "Fatia de cada município na população e na área de Roraima",
  });

  const bv = dados[0];
  const rk = contexto.concentracao_por_uf;
  const df = rk[0];
  const ap = rk.find(r => r.uf.startsWith("Amapá"));
  note(root, `<strong>Boa Vista tem ${rrPct(bv.pct_populacao, 1)} da população em ${rrPct(bv.pct_area, 1)} do território.</strong>
    Nenhum outro município do estado passa de ${rrPct(dados[1].pct_populacao, 1)}. Entre as 27 unidades da federação,
    Roraima é a <strong>${contexto.roraima.posicao_concentracao_no_maior_municipio}ª mais concentrada</strong> —
    e a primeira, ${df.uf}, é um caso à parte, porque tem um município só (${rrPct(df.concentracao_pct, 0)} por
    definição). Entre os estados com mais de um município, <strong>Roraima é o mais concentrado do país</strong>,
    à frente do ${ap.uf} (${rrPct(ap.concentracao_pct, 1)} em ${ap.maior_municipio.split(" - ")[0]}).`);
}

// ---------------------------------------------------------------------------
// Território: a régua aqui não é outro município, é um estado inteiro.
// ---------------------------------------------------------------------------
function rrTerritorio(root, indice, contexto) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const dados = indice.slice().sort((a, b) => b.area_km2 - a.area_km2);

  // As UFs que servem de marca são as que algum município de RR ultrapassa em
  // área. Tanto a lista quanto as áreas vêm do arquivo de contexto, que as leu
  // do IBGE — nenhum número de referência escrito aqui dentro.
  const areasUF = contexto.area_das_ufs_km2;
  const refs = contexto.municipios_de_rr_maiores_que_ufs
    .flatMap(c => c.ufs_menores)
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter(u => areasUF[u] != null)
    .map(u => ({ rotulo: u, valor: areasUF[u] }))
    .sort((a, b) => a.valor - b.valor);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [{ chave: "area_km2", rotulo: "Área", cor }],
    valueFormat: rrKm2, valueFormatFull: (v) => rrKm2(v),
    referencias: refs,
    ariaLabel: "Área de cada município de Roraima, com estados inteiros como referência",
  });

  const cara = contexto.municipios_de_rr_maiores_que_ufs[0];
  note(root, `<strong>As linhas tracejadas são estados inteiros.</strong> ${cara.municipio} tem
    ${rrKm2(cara.area_km2)} — mais que ${cara.ufs_menores.length} unidades da federação, entre elas o
    estado do ${cara.maior_uf_superada} (${rrKm2(cara.area_maior_uf_superada_km2)}) —, e dentro dessa
    área moram ${rrInt(dados.find(d => d.nome === cara.municipio).populacao)} pessoas.
    <strong>Doze dos quinze municípios são maiores que o Distrito Federal.</strong> Roraima é a
    ${contexto.roraima.posicao_em_area}ª UF em área e a última em população.`);
}

// ---------------------------------------------------------------------------
// Povos indígenas. O Censo 2022 mudou a leitura de Roraima — e a comparação com
// 2010 é a parte que o número isolado esconde.
// ---------------------------------------------------------------------------
function rrIndigenas(root, indice) {
  const st = getComputedStyle(root);
  const c22 = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const c10 = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const dados = indice.slice().sort((a, b) => b.indigena_pct_2022 - a.indigena_pct_2022);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [
      { chave: "indigena_pct_2022", rotulo: "Censo 2022", cor: c22 },
      { chave: "indigena_pct_2010", rotulo: "Censo 2010", cor: c10 },
    ],
    // Uma casa decimal, e não zero: São Luiz do Anauá tem 0,4% de população
    // indígena e, arredondado para inteiro, apareceria como "0%" — que se lê
    // como "nenhum" e não é o que o Censo diz.
    valueFormat: (v) => rrPct(v, 1), valueFormatFull: (v) => rrPct(v, 1) + " da população",
    ariaLabel: "Percentual de população indígena por município, Censos 2010 e 2022",
  });

  const maioria = dados.filter(d => d.indigena_pct_2022 >= 50);
  const subiu = dados.filter(d => d.indigena_pct_2010 != null && d.indigena_pct_2022 > d.indigena_pct_2010).length;
  note(root, `<strong>Em ${maioria.length} dos quinze municípios os indígenas são maioria da população</strong>
    — ${maioria.map(d => `${d.nome} (${rrPct(d.indigena_pct_2022, 1)})`).join(", ")}.
    A barra de 2010 está aí porque o dado isolado de 2022 esconde o movimento: em ${subiu} municípios a
    proporção subiu entre os dois Censos. Parte disso é demografia e parte é <strong>autodeclaração</strong> —
    a pergunta do Censo é sobre como a pessoa se identifica, e o IBGE ampliou em 2022 a coleta em
    terras indígenas. É uma medida de identidade declarada, não um recenseamento de território.`);
}

// ---------------------------------------------------------------------------
// A trajetória de cada um, no mesmo eixo.
//
// Duas decisões, e a segunda só apareceu depois de olhar o gráfico pronto.
//
// 1) QUINZE PAINÉIS, não quinze linhas num gráfico só. Quinze séries sobrepostas
//    seriam quinze cores categóricas, e a paleta validada do projeto tem quatro.
//    Pequenos múltiplos resolvem sem trocar rigor por conveniência.
//
// 2) ÍNDICE DE BASE COMUM, não a população absoluta. Com o valor absoluto e a
//    escala compartilhada — que é obrigatória, senão a comparação entre painéis
//    é falsa —, Boa Vista ocupa o painel inteiro e os outros CATORZE viram uma
//    reta rente ao chão. O gráfico ficava honesto e inútil: repetia "Boa Vista é
//    grande", que o mapa já disse, e escondia que Pacaraima dobrou de tamanho no
//    período. Em índice, a escala compartilhada passa a comparar o que aqui
//    importa — quanto cada município cresceu —, e a grandeza absoluta continua
//    no cabeçalho de cada painel e no balão.
// ---------------------------------------------------------------------------
function rrPopulacaoTempo(root, pop) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const anos = pop.municipios[0].serie.map(p => p.ano);
  const base = anos[0];

  const paineis = pop.municipios
    .map(m => {
      const p0 = m.serie[0].populacao;
      return {
        nome: m.nome,
        valores: m.serie.map(p => Math.round(1000 * p.populacao / p0) / 10),
        serie: m.serie,
      };
    })
    .sort((a, b) => b.valores[b.valores.length - 1] - a.valores[a.valores.length - 1]);

  const ult = (p) => p.serie[p.serie.length - 1];
  renderSmallMultiples(root, {
    paineis, xValues: anos, cor, colunas: 3, rotuloValor: `Índice (${base} = 100)`,
    valueFormat: (v) => rrNum(v, 0),
    valueFormatFull: (v) => rrNum(v, 1) + ` (${base} = 100)`,
    rotuloCabecalho: (p) => rrInt(ult(p).populacao) + " hab.",
    detalhe: (p, i) => {
      const ponto = p.serie[i];
      const linhas = [
        { label: "População", value: rrInt(ponto.populacao) + " hab.", color: "transparent" },
        { label: "Origem do número", value: ponto.fonte === "censo" ? "Censo (contagem)" : "Estimativa", color: "transparent" },
      ];
      if (i > 0) {
        const dif = ponto.populacao - p.serie[i - 1].populacao;
        linhas.push({ label: "Sobre o ano anterior", value: (dif >= 0 ? "+" : "−") + rrInt(Math.abs(dif)) + " hab.", color: "transparent" });
      }
      const nota = ponto.fonte === "censo" && ponto.ano === 2022
        ? "Ano de Censo: aqui o número é contagem, não projeção. O degrau entre 2021 e 2022 é o erro que a estimativa acumulou desde 2010 aparecendo de uma vez."
        : null;
      return { linhas, nota };
    },
  });

  const cresceu = paineis[0], menos = paineis[paineis.length - 1];
  // A maior revisão para baixo da série inteira, calculada e não digitada.
  const bv = paineis.find(p => p.nome === "Boa Vista");
  const bvQueda = Math.min(...bv.serie.map((p, i) => (i ? p.populacao - bv.serie[i - 1].populacao : 0)));
  note(root, `<strong>Os painéis estão em índice, com ${base} = 100, e dividem a mesma escala vertical.</strong>
    Em população absoluta este gráfico não funcionava: Boa Vista tem
    ${rrInt(ult(paineis.find(p => p.nome === "Boa Vista")).populacao)} habitantes e o segundo colocado não chega a
    ${rrInt(ult(paineis.filter(p => p.nome !== "Boa Vista").sort((a, b) => ult(b).populacao - ult(a).populacao)[0]).populacao)},
    então catorze painéis viravam uma linha reta no chão — honesto e inútil. Em índice, a mesma escala passa a
    comparar <em>quanto cada um cresceu</em>: ${cresceu.nome} multiplicou por
    ${rrNum(cresceu.valores[cresceu.valores.length - 1] / 100, 1)} desde ${base}, e ${menos.nome},
    o que menos cresceu, por ${rrNum(menos.valores[menos.valores.length - 1] / 100, 1)}.
    <strong>Os quinze terminam a série acima de onde começaram</strong> — o menor índice do estado é
    ${rrNum(menos.valores[menos.valores.length - 1], 0)}.<br><br>
    As quedas dentro da série quase nunca são gente indo embora: são <strong>revisões da estimativa</strong>.
    A maior delas é a de Boa Vista em 2022, quando a contagem do Censo veio
    ${rrInt(Math.abs(bvQueda))} habitantes <em>abaixo</em> da estimativa do ano anterior — o erro acumulado
    desde 2010 aparecendo de uma vez. Os anos de 2007 e 2023 faltam em todas as séries: o IBGE não
    publicou estimativa municipal nesses dois anos.`);
}

// ---------------------------------------------------------------------------
// Finanças. O achado da página, e o único lugar em que o estado inteiro
// conversa com as quatro cidades já publicadas no piloto.
// ---------------------------------------------------------------------------
function rrDependencia(root, indice, pilotos) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const dados = indice.filter(d => d.dependencia != null).sort((a, b) => b.dependencia - a.dependencia);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [{ chave: "dependencia", rotulo: "Dependência de transferências", cor }],
    valueFormat: (v) => rrPct(v, 1), valueFormatFull: (v) => rrPct(v, 1) + " da receita bruta",
    // As quatro cidades do piloto como régua. São os únicos números do projeto
    // calculados exatamente do mesmo jeito, no mesmo ano, da mesma fonte — e
    // vêm dos arquivos publicados delas, não digitados aqui: se a coleta de
    // qualquer uma for refeita, a régua desta página acompanha.
    referencias: pilotos.map(p => ({ rotulo: `${p.nome} ${rrPct(p.dependencia, 0)}`, valor: p.dependencia })),
    ariaLabel: "Dependência de transferências por município de Roraima, com as quatro cidades do piloto como referência",
  });

  const menor = dados[dados.length - 1];
  const maior = dados[0];
  const capital = pilotos.find(p => p.slug === "florianopolis");
  const serra = pilotos.find(p => p.slug === "serra-da-saudade");
  note(root, `<strong>Nenhum dos quinze fica abaixo de ${rrPct(menor.dependencia, 0)}.</strong>
    O menos dependente é ${menor.nome}, a capital, com ${rrPct(menor.dependencia, 1)}${capital ?
      ` — mais que o dobro de ${capital.nome}, que é capital também e aparece na régua com ${rrPct(capital.dependencia, 0)}` : ""}.
    No outro extremo, ${maior.nome} chega a ${rrPct(maior.dependencia, 1)}${serra ?
      `: <strong>mais dependente que ${serra.nome}</strong>, o menor município do Brasil, que este projeto já
      publicou como caso-limite do federalismo` : ""}.
    O caso-limite, aqui, é o estado inteiro. Dados do DCA de ${RR_ANO_FIN}, último exercício em que os
    quinze declararam.`);
}

function rrReceitaDespesa(root, indice) {
  const st = getComputedStyle(root);
  const cR = st.getPropertyValue("--v-series-receita").trim() || "#08724e";
  const cD = st.getPropertyValue("--v-series-despesa").trim() || "#2a78d6";
  const dados = indice.filter(d => d.receita_per_capita != null)
    .sort((a, b) => b.receita_per_capita - a.receita_per_capita);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [
      { chave: "receita_per_capita", rotulo: "Receita por habitante", cor: cR },
      { chave: "despesa_per_capita", rotulo: "Despesa por habitante", cor: cD },
    ],
    valueFormat: rrReais, valueFormatFull: (v) => rrReais(v) + " por habitante",
    ariaLabel: "Receita e despesa por habitante em cada município de Roraima",
  });

  const gastaMais = dados.filter(d => d.despesa_per_capita > d.receita_per_capita);
  note(root, `Em <strong>${gastaMais.length} dos ${dados.length} municípios a despesa empenhada de ${RR_ANO_FIN}
    passou a receita do ano</strong>. Empenho não é pagamento — parte vira restos a pagar do exercício
    seguinte —, mas a distância entre as duas barras é o que sobra ou falta antes disso.
    Valores corrigidos pelo IPCA para reais de 2025 e divididos pela população estimada.
    ${dados[0].nome} tem a maior receita por habitante do estado (${rrReais(dados[0].receita_per_capita)}),
    ${(dados[0].populacao / 1000).toFixed(0)} mil habitantes e ${rrPct(dados[0].dependencia, 0)} de dependência.`);
}

// ---------------------------------------------------------------------------
// A economia. Onde o setor público não financia a economia: ele É a economia.
// ---------------------------------------------------------------------------
function rrEconomia(root, indice) {
  const st = getComputedStyle(root);
  const cor = st.getPropertyValue("--v-series-3").trim() || "#eb6834";
  const dados = indice.filter(d => d.adm_publica_pct != null)
    .sort((a, b) => b.adm_publica_pct - a.adm_publica_pct);

  renderBarrasRanking(root, {
    data: dados, labelKey: "nome",
    series: [{ chave: "adm_publica_pct", rotulo: "Administração pública no valor adicionado", cor }],
    valueFormat: (v) => rrPct(v, 0), valueFormatFull: (v) => rrPct(v, 1) + " do valor adicionado",
    ariaLabel: "Peso da administração pública no valor adicionado de cada município",
  });

  const alto = dados[0], baixo = dados[dados.length - 1];
  const capital = dados.find(d => d.nome === "Boa Vista");
  const acima = dados.filter(d => d.adm_publica_pct >= 50).length;
  note(root, `<strong>Em ${alto.nome}, ${rrPct(alto.adm_publica_pct, 1)} de tudo que a economia do município
    produz é administração, defesa, educação e saúde públicas.</strong> Em ${acima} dos quinze essa fatia
    passa da metade. O menor peso do estado é o de ${baixo.nome}, com ${rrPct(baixo.adm_publica_pct, 1)}, e a
    capital, ${capital.nome}, aparece em ${rrPct(capital.adm_publica_pct, 1)} — dois em cada cinco reais,
    o que já seria alto em qualquer outro lugar.
    A conta inclui os três níveis de governo, não só a prefeitura: onde há escola estadual, posto federal
    e pouca atividade privada, é isto que aparece. Dado de ${RR_ANO_VAB}, último ano em que o IBGE abriu
    o valor adicionado por atividade; o PIB total já vai até 2023, a abertura setorial não.`);
}

// ---------------------------------------------------------------------------
// O fechamento. A parte que justifica ter feito o estado inteiro em vez de
// quinze páginas de município.
// ---------------------------------------------------------------------------
function rrFechamento(root, perfil, pib, fin) {
  const fp = perfil.fechamento;
  const fpib = pib.fechamento;
  const naoDeclarados = fin.anos_nao_declarados || [];

  renderStats(root, [
    { value: rrInt(fp.populacao_soma_municipios), label: "Soma da população dos 15",
      note: `IBGE publica para o estado: ${rrInt(fp.populacao_uf_publicada)} — diferença de ${fp.populacao_diferenca}` },
    { value: rrKm2(fp.area_soma_municipios_km2), label: "Soma da área dos 15",
      note: `IBGE publica para o estado: ${rrKm2(fp.area_uf_publicada_km2)} — diferença de ${rrNum(fp.area_diferenca_km2, 2)} km²` },
    // Em bilhões, não em milhões: "R$ 25.125 mi" são vinte e cinco bilhões, mas
    // leem-se como vinte e cinco milhões.
    { value: "R$ " + rrNum(fpib.pib_soma_municipios_mil_reais / 1e6, 1) + " bi", label: `Soma do PIB dos 15 (${fpib.ano})`,
      note: `IBGE publica para o estado: R$ ${rrNum(fpib.pib_uf_publicado_mil_reais / 1e6, 1)} bi — diferença de R$ ${Math.abs(fpib.diferenca_mil_reais)} mil, arredondamento da própria publicação` },
    { value: String(naoDeclarados.length), label: "Município-anos sem DCA",
      note: "De 180 possíveis (15 municípios × 12 anos). Todos entre 2014 e 2016, mais Iracema em 2025." },
  ]);

  note(root, `<strong>Os três testes fecham.</strong> Somar as partes e conferir contra o todo é o que separa
    "quinze municípios" de "um estado": num recorte escolhido a dedo não há como saber o que ficou de fora,
    e num recorte fechado há. A população bate na unidade, a área na segunda casa decimal e o PIB difere em
    R$ 1 mil sobre R$ 25 bilhões — arredondamento da própria publicação.
    ${naoDeclarados.length ? `<br><br><strong>O que não fecha, e por quê.</strong> ${naoDeclarados.length} pares
    município-ano não têm declaração no SICONFI: ${naoDeclarados.join(", ")}. Eles somem dos gráficos como
    ausência, não como zero — um município que não declarou não é um município que gastou R$ 0. A partir de
    2017 a série fica completa, e é por isso que os rankings usam ${RR_ANO_FIN}.` : ""}`);
}

// ---------------------------------------------------------------------------
// As cidades ESCOLHIDAS do projeto, lidas do mesmo manifesto que alimenta o
// comparador (dados/cidades.json). Servem de régua na Fase 4.
//
// O filtro por `recorte` não é detalhe. Quando os 15 municípios de Roraima
// entraram no manifesto como cidades comuns, o manifesto passou a ter 19 — e
// sem filtro esta função traria os quinze de volta como linhas de referência
// do gráfico que já os desenha como barras. Seria régua circular, medindo
// Roraima contra Roraima, e dezenove tracejados sobre quinze barras.
// A régua útil é a das cidades que vieram de fora do recorte.
//
// Se uma cidade nova for escolhida, ela aparece aqui sozinha; se o SICONFI de
// alguma for recoletado, a régua acompanha. Cidade sem o ano de referência
// apenas não vira marca — não derruba o gráfico.
// ---------------------------------------------------------------------------
function pilotosDoProjeto() {
  return fetch("../dados/cidades.json")
    .then(r => (r.ok ? r.json() : Promise.reject(new Error("cidades.json"))))
    .then(man => Promise.all(man.cidades.filter(c => !c.recorte).map(c =>
      fetch(`../dados/${c.pasta}/${c.arquivos.receita_origem}`)
        .then(r => (r.ok ? r.json() : null))
        .then(d => {
          const p = d && (d.serie || []).find(s => s.ano === RR_ANO_FIN);
          return p && p.dependencia_transferencias_pct != null
            ? { slug: c.slug, nome: c.nome, dependencia: p.dependencia_transferencias_pct }
            : null;
        })
        .catch(() => null))))
    .then(l => l.filter(Boolean).sort((a, b) => a.dependencia - b.dependencia))
    .catch(() => []);
}

// ---------------------------------------------------------------------------
// Montagem
// ---------------------------------------------------------------------------
function initRoraimaCharts() {
  const q = (s) => document.querySelector(s);
  const j = (n) => RR.get(n);
  const fase = (el) => el && el.closest("details.phase");

  // Cada gráfico cai sozinho. Com um try/catch único em volta de todos, uma
  // exceção num deixava os outros em branco sem dizer qual quebrou.
  const desenha = (fn, alvo, ...args) => {
    if (!alvo) return;
    try { fn(alvo, ...args); } catch (e) { console.error((alvo.id || "?") + ":", e); showError(alvo); }
  };

  const base = () => Promise.all([
    j("municipios_perfil.json"), j("financas_2014_2025.json"), j("pib_municipal_2002_2023.json"),
  ]);

  const mapaRoot = q("#mapa-roraima");
  onFirstOpen(fase(mapaRoot), () => {
    Promise.all([j("malha_municipios.json"), base()])
      .then(([malha, [perfil, fin, pib]]) => desenha(rrMapa, mapaRoot, malha, rrIndice(perfil, fin, pib)))
      .catch(() => showError(mapaRoot));
  });

  const concRoot = q("#chart-concentracao");
  const terrRoot = q("#chart-territorio");
  onFirstOpen(fase(concRoot || terrRoot), () => {
    Promise.all([base(), j("contexto_nacional.json")])
      .then(([[perfil, fin, pib], ctx]) => {
        const ind = rrIndice(perfil, fin, pib);
        desenha(rrConcentracao, concRoot, ind, ctx);
        desenha(rrTerritorio, terrRoot, ind, ctx);
      }).catch(() => showError(concRoot, terrRoot));
  });

  const indRoot = q("#chart-indigenas");
  const tempoRoot = q("#chart-populacao-tempo");
  onFirstOpen(fase(indRoot || tempoRoot), () => {
    base().then(([perfil, fin, pib]) => desenha(rrIndigenas, indRoot, rrIndice(perfil, fin, pib)))
      .catch(() => showError(indRoot));
    j("populacao_2000_2025.json").then(pop => desenha(rrPopulacaoTempo, tempoRoot, pop))
      .catch(() => showError(tempoRoot));
  });

  const depRoot = q("#chart-dependencia");
  const rdRoot = q("#chart-receita-despesa");
  onFirstOpen(fase(depRoot || rdRoot), () => {
    Promise.all([base(), pilotosDoProjeto()])
      .then(([[perfil, fin, pib], pilotos]) => {
        const ind = rrIndice(perfil, fin, pib);
        desenha(rrDependencia, depRoot, ind, pilotos);
        desenha(rrReceitaDespesa, rdRoot, ind);
      }).catch(() => showError(depRoot, rdRoot));
  });

  const ecoRoot = q("#chart-economia");
  onFirstOpen(fase(ecoRoot), () => {
    base().then(([perfil, fin, pib]) => desenha(rrEconomia, ecoRoot, rrIndice(perfil, fin, pib)))
      .catch(() => showError(ecoRoot));
  });

  const fechRoot = q("#stats-fechamento");
  onFirstOpen(fase(fechRoot), () => {
    base().then(([perfil, fin, pib]) => desenha(rrFechamento, fechRoot, perfil, pib, fin))
      .catch(() => showError(fechRoot));
  });
}

// Mesma guarda das páginas de cidade: os ids de contêiner se repetem entre as
// páginas do piloto, e sem ela abrir outra página dispararia fetch em
// ../dados/roraima/.
if (document.body.dataset.piloto === "roraima") initRoraimaCharts();
