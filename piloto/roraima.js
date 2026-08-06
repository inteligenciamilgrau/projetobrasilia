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
// A LINHA DO TEMPO. Quatro fotos de Censo, não um filme.
//
// O texto de cada passo é montado do próprio dado — inclusive as contas de
// "quantos" e "quem" —, para que ele não possa discordar do mapa que está ao
// lado. As frases que soariam bem e não têm número por trás ficaram de fora.
// ---------------------------------------------------------------------------
// Um passo de "de onde vieram" medido só no nível de ESTADO. Serve para 1991 e
// 2000, anos em que o IBGE publicou a origem sem abrir por município — a seta
// aponta para o estado e o clique não refina, porque não há o que refinar.
function rrPassoOrigemEstadual(ano, org, mig, existiaEm) {
  const bloco = org.anos[String(ano)];
  const deFora = bloco.fluxos.filter(f => f.origem !== "Roraima" && f.origem_lon != null);
  const totalFora = deFora.reduce((s, f) => s + f.pessoas, 0);
  const interno = (bloco.fluxos.find(f => f.origem === "Roraima") || {}).pessoas || 0;
  const parte = (nome) => {
    const f = deFora.find(x => x.origem === nome);
    return f ? 100 * f.pessoas / totalFora : 0;
  };
  return {
    ano, rotulo: "de onde vieram", setas: true, permiteFoco: false,
    fluxos: () => deFora.slice().sort((a, b) => b.pessoas - a.pessoas),
    titulo: `De onde vieram os moradores de ${ano} — medido só para o estado`,
    existe: (d) => existiaEm(d, ano === 1991 ? 1991 : 2000),
    valor: (d) => d.populacao_por_censo[String(ano === 1991 ? 1991 : 2000)],
    descrever: (d) => `${rrInt(d.populacao_por_censo[String(ano)])} habitantes`,
    linhas: (d) => [["População (Censo " + ano + ")", rrInt(d.populacao_por_censo[String(ano)]) + " hab."]],
    texto: () => `<strong>${rrInt(totalFora)} moradores</strong> tinham vindo de fora do estado, pela
      pergunta do Censo ${ano} sobre ${bloco.pergunta.split(",")[0]}.
      ${["Maranhão", "Pará", "Amazonas"].map(n => `<strong>${n}</strong> ${rrPct(parte(n), 1)}`).join(", ")}.
      ${interno ? `Outros ${rrInt(interno)} tinham se mudado dentro do próprio estado.` : ""}
      <br><br><strong>Aqui a seta é do estado, não do município.</strong> Em ${ano} o IBGE publicou a
      origem apenas agregada para Roraima inteira — clicar num município não abre nada, porque não existe
      o dado aberto. Só em 2010 a origem passa a ser publicada município a município.`,
  };
}

function rrLinhaDoTempo(root, malha, mig, fund, org) {
  const por = {};
  mig.municipios.forEach(m => { por[m.ibge] = m; });
  const fu = {};
  (fund ? fund.municipios : []).forEach(m => { fu[m.ibge] = m; });
  const anoDe = (d) => (fu[d.ibge] || {}).criacao_ano;
  const dataBR = (s) => {
    if (!s) return "—";
    const [dd, mm, aa] = s.split("-");
    return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${aa}`;
  };

  // Os passos de criação vêm do próprio arquivo: municípios agrupados pelo ANO
  // em que nasceram, na ordem. Se um dia um município for criado ou uma data
  // for corrigida na fonte, o passo aparece sozinho — não há lista escrita aqui.
  const anos = [...new Set((fund ? fund.municipios : [])
    .map(m => m.criacao_ano).filter(Boolean))].sort((a, b) => a - b);
  const nascidosEm = (ano) => fund.municipios.filter(m => m.criacao_ano === ano);
  const jaExistiaEm = (d, ano) => anoDe(d) != null && anoDe(d) <= ano;

  const passosFundacao = anos.map((ano, i) => {
    const novos = nascidosEm(ano);
    const acumulado = fund.municipios.filter(m => m.criacao_ano <= ano).length;
    const leis = [...new Set(novos.map(m => m.criacao_lei).filter(Boolean))];
    const datas = [...new Set(novos.map(m => m.criacao_data))];
    return {
      ano, rotulo: novos.length === 1 ? novos[0].nome : `+${novos.length} municípios`,
      setas: false, modo: "fundacao",
      titulo: novos.length === 1
        ? `${novos[0].nome} é criado — o estado passa a ter ${acumulado}`
        : `${novos.length} municípios criados de uma vez — o estado passa a ter ${acumulado}`,
      existe: (d) => jaExistiaEm(d, ano),
      nasceAgora: (d) => anoDe(d) === ano,
      valor: () => null,
      descrever: (d) => (anoDe(d) === ano
        ? `criado em ${dataBR((fu[d.ibge] || {}).criacao_data)}`
        : `já existia desde ${anoDe(d)}`),
      linhas: (d) => {
        const f = fu[d.ibge] || {};
        const l = [["Criado em", dataBR(f.criacao_data)], ["Por", f.criacao_lei || "—"]];
        if (f.instalacao_data && f.instalacao_coerente_com_criacao) l.push(["Instalado em", dataBR(f.instalacao_data)]);
        if (f.gentilico) l.push(["Gentílico", f.gentilico]);
        if (f.data_destoa_da_serie) l.push(["Atenção", "a data desta lei destoa das vizinhas — ver nota"]);
        return l;
      },
      texto: () => {
        const alerta = novos.filter(m => m.data_destoa_da_serie);
        return `<strong>${dataBR(datas[0])}${datas.length > 1 ? " e " + dataBR(datas[1]) : ""}</strong> —
          ${novos.length === 1 ? `nasce <strong>${novos[0].nome}</strong>` : `nascem <strong>${novos.map(m => m.nome).join(", ")}</strong>`},
          ${leis.length === 1 ? `pela ${leis[0]}` : `pelas ${leis.join(" e ")}`}.
          Em laranja no mapa, quem nasce neste passo; em azul, quem já existia; em cinza tracejado, o
          território que ainda não tinha sede própria. O estado fecha o passo com
          <strong>${acumulado} de 15</strong> municípios.
          ${novos[0].criacao_frase_original ? `<br><br><span style="opacity:.85">Frase original da fonte:
            “${novos[0].criacao_frase_original}”</span>` : ""}
          ${alerta.length ? `<br><br><strong>Ressalva:</strong> ${alerta[0].data_destoa_da_serie}` : ""}`;
      },
    };
  });
  const pop = (d, ano) => d.populacao_por_censo[String(ano)];
  const existiaEm = (d, ano) => pop(d, ano) != null;
  const totalEm = (ano) => mig.municipios.reduce((s, m) => s + (pop(m, ano) || 0), 0);
  const nMunEm = (ano) => mig.municipios.filter(m => existiaEm(m, ano)).length;
  const maior = (ano) => mig.municipios.filter(m => existiaEm(m, ano))
    .sort((a, b) => pop(b, ano) - pop(a, ano))[0];

  // as maiores origens do estado inteiro, calculadas do arquivo
  const somaOrigem = new Map();
  mig.fluxos_2010.forEach(f => {
    if (f.origem_lon == null) return;
    somaOrigem.set(f.origem, (somaOrigem.get(f.origem) || 0) + f.pessoas);
  });
  const topOrigens = [...somaOrigem.entries()].sort((a, b) => b[1] - a[1]);
  const totalDeFora = mig.municipios.reduce((s, m) => s + (m.vindos_de_fora_2010 || 0), 0);
  const novos = mig.municipios.filter(m => m.primeiro_censo === 2000);

  // Os passos de criação entram na frente, um por ano de fundação; depois vêm
  // os dois passos de Censo que dependem de matriz de dados. Os antigos passos
  // "1991" e "2000" saíram: eles mostravam o RESULTADO do desmembramento (8 e
  // depois 15 municípios) sem dizer quando nem por qual lei cada um nasceu —
  // que é justamente o que os passos de fundação agora respondem, e com data.
  // Criação e chegada, intercalados na ordem do calendário: o leitor vê seis
  // municípios nascerem em 1982, quem já tinha chegado em 1991, mais sete
  // municípios em 94-95, quem tinha chegado em 2000, e só então o detalhe de
  // 2010. Os passos de origem entram pela data, não no fim.
  const passosOrigem = org
    ? [1991, 2000].filter(a => org.anos[String(a)])
        .map(a => rrPassoOrigemEstadual(a, org, mig, existiaEm))
    : [];
  const passos = [
    ...[...passosFundacao, ...passosOrigem].sort((a, b) => a.ano - b.ano),
    {
      ano: 2010, rotulo: "por município", setas: true, permiteFoco: true,
      fluxos: (codDestino) => {
        const fs = mig.fluxos_2010.filter(f => f.origem_lon != null
          && (codDestino ? f.destino_ibge === codDestino : true));
        if (codDestino) {
          // Com um município no alvo, "Roraima" como origem é informação
          // legítima: quem veio de OUTRO município do mesmo estado.
          return fs.map(f => (f.origem === "Roraima" ? { ...f, origem: "Outro município de RR" } : f))
            .sort((a, b) => b.pessoas - a.pessoas);
        }
        // Com o estado no alvo, uma seta de Roraima para Roraima não diz nada.
        const soma = new Map();
        fs.filter(f => f.origem !== "Roraima").forEach(f => {
          const a = soma.get(f.origem) || { ...f, pessoas: 0, destino: "Roraima", destino_ibge: null };
          a.pessoas += f.pessoas;
          soma.set(f.origem, a);
        });
        return [...soma.values()].sort((a, b) => b.pessoas - a.pessoas);
      },
      titulo: "As setas: de onde veio quem morava aqui em 2010",
      existe: (d) => existiaEm(d, 2010),
      valor: (d) => d.vindos_de_fora_2010,
      descrever: (d) => `${rrInt(d.vindos_de_fora_2010)} moradores tinham morado fora do estado nos 10 anos anteriores`,
      linhas: (d) => [
        ["População (Censo 2010)", rrInt(pop(d, 2010)) + " hab."],
        ["Vieram de fora do estado", rrInt(d.vindos_de_fora_2010) + " pessoas"],
        ["Desses, do exterior", rrInt(d.exterior_2010 || 0) + " pessoas"],
      ],
      texto: (foco) => {
        if (foco) {
          const fs = mig.fluxos_2010.filter(f => f.destino_ibge === foco.ibge && f.origem_lon != null)
            .sort((a, b) => b.pessoas - a.pessoas).slice(0, 3);
          return `<strong>${foco.nome}</strong>: ${rrInt(foco.vindos_de_fora_2010)} moradores tinham vindo
            de fora nos dez anos anteriores a 2010. As maiores origens foram
            ${fs.map(f => `${f.origem} (${rrInt(f.pessoas)})`).join(", ")}.
            Clique de novo no município para voltar ao estado inteiro.`;
        }
        const deFora = topOrigens.filter(([n]) => n !== "Roraima");
        const interno = somaOrigem.get("Roraima") || 0;
        return `<strong>${rrInt(totalDeFora - interno)} moradores</strong> de Roraima em 2010 tinham vivido
          em outra unidade da federação nos dez anos anteriores. As três maiores origens são
          ${deFora.slice(0, 3).map(([n, v]) => `<strong>${n}</strong> (${rrInt(v)})`).join(", ")} —
          duas do Norte e uma do Nordeste. Outros ${rrInt(interno)} tinham se mudado <em>entre municípios
          do próprio estado</em>: esses não viram seta aqui, porque uma flecha de Roraima para Roraima não
          diz nada num mapa do estado. Cada seta encosta na <strong>fronteira</strong>, e não num ponto do
          interior, porque o destino deste passo é o estado inteiro — não um município.
          O rumo é o real entre o centro da unidade de origem e Roraima; a espessura é a raiz do número de
          pessoas. <strong>Clique num município</strong> para ver as origens só dele.`;
      },
    },
    {
      ano: 2022, rotulo: "quem está aqui", setas: false,
      titulo: "Quem mora em Roraima hoje",
      existe: (d) => existiaEm(d, 2022),
      valor: (d) => d.indigena_pct_2022,
      descrever: (d) => `${rrPct(d.indigena_pct_2022, 1)} da população se declarou indígena`,
      linhas: (d) => [
        ["População (Censo 2022)", rrInt(pop(d, 2022)) + " hab."],
        ["Indígenas", rrPct(d.indigena_pct_2022, 1) + " (era " + rrPct(d.indigena_pct_2010, 1) + " em 2010)"],
        ["Estrangeiros residentes", d.estrangeiros_2022 ? rrInt(d.estrangeiros_2022) : "menos de 1"],
      ],
      texto: () => {
        const ind = mig.municipios.filter(m => m.indigena_pct_2022 >= 50)
          .sort((a, b) => b.indigena_pct_2022 - a.indigena_pct_2022);
        const est = mig.municipios.reduce((s, m) => s + (m.estrangeiros_2022 || 0), 0);
        // Onde o estrangeiro pesa mais na população — não onde há mais deles em
        // número. É o que mostra a porta de entrada em vez do destino final.
        const porPeso = mig.municipios
          .filter(m => m.estrangeiros_2022 && m.populacao_por_censo["2022"])
          .map(m => ({ ...m, peso: 100 * m.estrangeiros_2022 / m.populacao_por_censo["2022"] }))
          .sort((a, b) => b.peso - a.peso);
        const bv = mig.municipios.find(m => m.nome === "Boa Vista");
        return `A cor do mapa agora é a <strong>proporção de população indígena</strong>, e ela muda a
          leitura de tudo o que veio antes: em ${ind.length} municípios os indígenas são maioria —
          ${ind.slice(0, 3).map(m => `${m.nome} ${rrPct(m.indigena_pct_2022, 0)}`).join(", ")}. Essas
          populações <strong>não chegaram por nenhuma das setas</strong>: elas já estavam aqui quando as
          fronteiras foram desenhadas por cima delas.<br><br>
          Em 2022 o estado tinha <strong>${rrInt(est)} estrangeiros residentes</strong> —
          ${rrPct(100 * est / totalEm(2022), 1)} da população.
          ${rrInt(bv.estrangeiros_2022)} moram em Boa Vista, mas o município onde eles mais pesam é
          <strong>${porPeso[0].nome}: ${rrPct(porPeso[0].peso, 0)} da população</strong> — é ali que fica a
          fronteira com a Venezuela. Eles aparecem como número e não como seta porque
          <strong>o Censo 2022 não publicou a origem por município</strong>: a última matriz de origem que
          existe é a de 2010, e desenhar uma flecha da Venezuela seria suposição com aparência de dado.`;
      },
    },
  ];

  renderLinhaDoTempo(root, { malha, dados: mig, passos });

  const naoExiste = mig.o_que_nao_existe || [];
  const alertas = (fund && fund.sinalizacoes_automaticas) || [];
  noteToggle(root, "O que esta linha do tempo não mostra, e o que veio de fonte de terceiro",
    `<p class="viz-note-lead">As datas de criação vêm de um endereço do IBGE, mas não são apuração do
      IBGE: cada registro declara <strong>“${(fund && fund.municipios[0].fonte_declarada_no_registro) || "fonte de terceiro"}”</strong>
      como origem do texto. Por isso cada data foi <strong>cruzada com os Censos</strong>, que são de outra
      fonte: um município criado depois de 1991 não pode aparecer na contagem de 1991.
      ${fund && !fund.resumo.conflitos_com_censo.length
        ? "Nas quinze, nenhuma data conflita com o Censo." : ""}
      A frase original de onde cada data saiu aparece no passo correspondente.</p>`
    + (alertas.length ? alertas.map(a =>
        `<p><strong>${a.municipio} — divergência na própria fonte:</strong> ${a.alerta}</p>`).join("") : "")
    + (fund && fund.resumo.instalacao_incoerente.length
        ? `<p><strong>${fund.resumo.instalacao_incoerente.join(", ")} — outra divergência da fonte:</strong>
           o texto traz uma data de instalação anterior à de criação. Por isso a data de instalação só é
           mostrada quando é coerente com a de criação.</p>` : "")
    + naoExiste.map(x => `<p><strong>${x.assunto}</strong> (${x.situacao}): ${x.detalhe}</p>`).join("")
    + `<p class="viz-note-fontes">Fontes: ${Object.values(mig.fontes).join(" · ")}${fund ? " · " + fund.fonte : ""}</p>`);

  renderTable(root, {
    caption: "Criação dos 15 municípios de Roraima",
    columns: ["Município", "Criado em", "Por", "No Censo de 1991?"],
    rows: (fund ? fund.municipios : []).slice()
      .sort((a, b) => (a.criacao_data || "").split("-").reverse().join("")
        .localeCompare((b.criacao_data || "").split("-").reverse().join("")))
      .map(m => [m.nome, dataBR(m.criacao_data), m.criacao_lei || "—",
                 m.presente_censo_1991 ? "sim" : "não"]),
  });

  // A tabela junta os três Censos porque é aí que está o achado: a repartição
  // entre as origens muda. Em percentual, e não em pessoas, porque os totais dos
  // três anos NÃO são comparáveis — 1991 pergunta sobre o município anterior e
  // 2000/2010 sobre a unidade da federação anterior.
  if (org) {
    const pctDe = (ano) => {
      const fs = ano === 2010
        ? [...somaOrigem.entries()].filter(([n]) => n !== "Roraima").map(([origem, pessoas]) => ({ origem, pessoas }))
        : org.anos[String(ano)].fluxos.filter(f => f.origem !== "Roraima" && f.origem_lon != null);
      const t = fs.reduce((s, f) => s + f.pessoas, 0);
      return Object.fromEntries(fs.map(f => [f.origem, 100 * f.pessoas / t]));
    };
    const p91 = pctDe(1991), p00 = pctDe(2000), p10 = pctDe(2010);
    const nomes = [...new Set([...Object.keys(p91), ...Object.keys(p00), ...Object.keys(p10)])]
      .sort((a, b) => (p10[b] || 0) - (p10[a] || 0));
    renderTable(root, {
      caption: "Repartição das origens de quem veio de fora, nos Censos de 1991, 2000 e 2010",
      columns: ["Origem", "1991", "2000", "2010"],
      rows: nomes.map(n => [n, p91[n] ? rrPct(p91[n], 1) : "—",
                            p00[n] ? rrPct(p00[n], 1) : "—", p10[n] ? rrPct(p10[n], 1) : "—"]),
    });
    note(root, `<strong>A tabela acima está em percentual de propósito.</strong> Os totais dos três
      Censos não formam uma série: em 1991 a pergunta é sobre o <em>município</em> anterior e em 2000 e
      2010 sobre a <em>unidade da federação</em> anterior — quem se mudou de Boa Vista para Caracaraí
      conta num e não conta no outro. O que dá para comparar é a repartição, e ela mudou:
      <strong>${rrPct(p91["Maranhão"], 0)} → ${rrPct(p00["Maranhão"], 0)} → ${rrPct(p10["Maranhão"], 0)}
      vindos do Maranhão</strong>, contra
      <strong>${rrPct(p91["Amazonas"], 0)} → ${rrPct(p00["Amazonas"], 0)} → ${rrPct(p10["Amazonas"], 0)}
      do Amazonas</strong>. Roraima deixou de ser povoada de longe, pelo Nordeste, e passou a ser
      alimentada pelos vizinhos amazônicos.`);
  }

  renderTable(root, {
    caption: "Maiores origens dos moradores de Roraima que vieram de fora, Censo 2010",
    columns: ["Origem", "Pessoas", "% de quem veio de fora"],
    rows: topOrigens.map(([n, v]) => [n, rrInt(v), rrPct(100 * v / totalDeFora, 1)]),
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

  const tlRoot = q("#linha-do-tempo");
  onFirstOpen(fase(tlRoot), () => {
    Promise.all([j("malha_municipios.json"), j("migracao_linha_do_tempo.json"),
                 j("fundacao_municipios.json"), j("origens_por_censo.json")])
      .then(([malha, mig, fund, org]) => desenha(rrLinhaDoTempo, tlRoot, malha, mig, fund, org))
      .catch(() => showError(tlRoot));
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
