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
// Razão sem unidade, com vírgula decimal. Interpolar o número cru do JSON
// escrevia "0.56" numa página que escreve "4,0%" duas linhas acima.
const rrRazao = (v) => (v == null ? "—"
  : v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
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
// ---------------------------------------------------------------------------
// O CONTEXTO DE CADA DATA, E AS PERGUNTAS CRUÉIS.
//
// Um mapa que só mostra QUANDO e DE ONDE deixa o leitor com a pergunta que
// interessa sem resposta: POR QUÊ. Este bloco monta, para cada passo, três
// coisas que precisam ficar separadas porque têm força de prova diferente:
//
//   NÚMERO MEDIDO   — sai de tabela do IBGE, com a URL guardada no arquivo.
//   CITAÇÃO         — texto de terceiro publicado em endereço do IBGE. Vai
//                     entre aspas e atribuído; não vira afirmação minha.
//   RESSALVA        — o que o número NÃO prova. Fica dentro da resposta, não
//                     num rodapé, porque quem lê a resposta precisa ler isso.
//
// O que não couber em nenhuma das três não entra. É por isso que a data de
// 1988 aparece aqui como contexto declarado e não como medida: o que este
// projeto mediu foi o EFEITO dela — a lei que cria município deixa de ser
// federal e passa a ser estadual entre 1982 e 1994.
// ---------------------------------------------------------------------------
function rrContexto(ctx, hist, mig) {
  const H = {};
  ((hist && hist.municipios) || []).forEach(m => { H[m.nome] = m; });
  // Uma frase do texto do IBGE, recortada por trecho procurado. Devolve null se
  // a frase não estiver lá — assim uma mudança na fonte apaga a citação em vez
  // de deixar aspas em volta de coisa nenhuma.
  //
  // O corte de frase NÃO pode ser "ponto seguido de espaço": o texto é feito de
  // citações de leis e quebraria em "Decreto-lei Federal n." / "° 5.812". Só
  // vale ponto que venha depois de letra ou dígito E antes de maiúscula — foi o
  // mesmo defeito que truncou as datas de fundação quando elas foram coletadas.
  const FRASE = /(?<=[a-zà-úA-ZÀ-Ú0-9)\]])\.\s+(?=[A-ZÀ-Ú])/;
  const recorte = (txt, agulha, nome, campo) => {
    if (!txt) return null;
    const f = txt.replace(/\s+/g, " ").split(FRASE)
      .find(s => s.toLowerCase().includes(agulha.toLowerCase()));
    if (!f) return null;
    const limpa = f.trim().replace(/\.$/, "") + ".";
    // Escapado aqui, no ponto de entrada, e não em cada um dos dez lugares que
    // pedem uma citação: este é o único texto da página que o projeto NÃO
    // escreveu — é prosa livre de terceiro (a autoria declarada no arquivo é da
    // Confederação Nacional de Municípios), e ela vai direto para innerHTML no
    // <blockquote> da linha do tempo. Escapar na origem faz com que qualquer
    // citação nova nasça segura, sem depender de alguém lembrar.
    return { texto: escapeHtml(limpa), de: `IBGE — ${campo} de ${escapeHtml(nome)}` };
  };
  const cita = (nome, agulha) => recorte((H[nome] || {}).historico, agulha, nome, "verbete");
  const citaF = (nome, agulha) => recorte((H[nome] || {}).formacao, agulha, nome, "formação administrativa");
  const mun = (ano) => ((ctx && ctx.municipios_do_brasil_por_censo) || {})[String(ano)];
  const nat = (ano) => ((ctx && ctx.naturalidade_por_censo) || {})[String(ano)];
  const natPct = (ano, uf) => {
    const b = nat(ano);
    if (!b) return null;
    const r = b.por_uf_de_nascimento.find(x => x.uf === uf);
    return r ? r.pct : null;
  };
  const linhas2010 = ((ctx && ctx.nasceu_la_x_veio_de_la_2010) || {}).linhas || [];
  const par = (uf) => linhas2010.find(x => x.uf === uf) || {};
  const adm = (ctx && ctx.administracao_publica_no_vab) || null;
  const pais = (ano) => ((ctx && ctx.paises_de_origem) || {})[String(ano)];
  const paisTop = (ano, n) => {
    const p = pais(ano);
    if (!p) return [];
    return p.paises.filter(x => x.pais !== "Brasil").slice(0, n);
  };
  const numMun = (ano) => {
    const m = mun(ano);
    return m ? { valor: rrInt(m.brasil), rotulo: `municípios no Brasil (Censo ${ano})` } : null;
  };
  const numNasc = (ano) => {
    const p = natPct(ano, "Roraima");
    return p == null ? null : { valor: rrPct(p, 1), rotulo: `dos moradores nasceram em Roraima` };
  };
  return { cita, citaF, mun, nat, natPct, linhas2010, par, adm, pais, paisTop, numMun, numNasc };
}

// O contexto dos passos de CRIAÇÃO. A régua para entrar aqui é a mesma do resto:
// ou o fato está no registro de criação do próprio município, ou está numa
// tabela do IBGE, ou está entre aspas com autoria. O ano manda no conteúdo, mas
// o fallback existe para que um município criado amanhã não deixe o passo vazio.
function rrContextoFundacao(ano, novos, leis, C, ultimo) {
  if (ano < 1900) {
    return {
      numeros: [{ valor: "0", rotulo: "estados chamados Roraima, em 1890" }],
      texto: `Em 1890 <strong>Roraima não existia</strong> — nem como estado, nem como território. O que
        havia era o alto Rio Branco, no <strong>Amazonas</strong>, e é por isso que a norma que cria a
        primeira vila é um <strong>decreto estadual amazonense</strong>. Boa Vista nasce como sede de
        fazenda de gado, e é a única coisa parecida com uma cidade em toda a região.`,
      citacao: C.cita("Boa Vista", "fazenda"),
    };
  }
  if (ano < 1970) {
    return {
      numeros: [{ valor: "1943", rotulo: "criação do Território Federal do Rio Branco" },
                { valor: "1962", rotulo: "o território passa a se chamar Roraima" }],
      texto: `Entre a primeira cidade e a segunda passaram-se <strong>65 anos</strong>, e no meio deles o
        território mudou de dono: deixou de ser Amazonas e virou <strong>território federal</strong>,
        administrado direto por Brasília, com Boa Vista promovida a capital pelo mesmo decreto. A partir
        daí quem cria município aqui é o <strong>Congresso</strong> — e é por isso que Caracaraí nasce por
        lei federal. Também é a época em que o governo passa a <strong>trazer gente de fora de propósito</strong>,
        em colônias agrícolas.`,
      citacao: C.citaF("Boa Vista", "Rio Branco") || C.cita("Mucajaí", "nordestinos"),
    };
  }
  if (ano < 1990) {
    return {
      numeros: [C.numMun(1991), { valor: String(novos.length), rotulo: "criados de uma vez, pela mesma lei" }],
      texto: `Os anos 70 e 80 são os da <strong>abertura de estradas e da colonização dirigida</strong> na
        Amazônia: o INCRA instala sede na beira da BR-174 e distribui terra, e povoados aparecem ao longo
        do traçado. Os municípios de ${ano} são o reconhecimento administrativo do que já tinha acontecido
        no chão — ${novos.length} de uma vez, todos pela <strong>mesma lei federal</strong>, porque Roraima
        ainda era território e a assinatura era de Brasília. O povoado citado abaixo é desta mesma leva,
        mas <strong>só viraria município treze anos depois</strong>: o chão anda na frente do cartório.`,
      citacao: C.cita("Rorainópolis", "Incra") || C.cita("São João da Baliza", "BR"),
    };
  }
  // 1994 e 1995 são os dois anos de lei estadual, e recebiam o mesmo bloco — o
  // que é enfeite repetido, não contexto. O que os separa de verdade: 1994 é a
  // ESTREIA do legislativo próprio, e 1995 é o ano em que o mapa FECHA e nunca
  // mais se mexe. Cada um tem seu número.
  const m91 = C.mun(1991), m00 = C.mun(2000), m10 = C.mun(2010), m22 = C.mun(2022);
  if (!ultimo) {
    return {
      numeros: [{ valor: leis.map(l => (l.match(/\d+/) || [""])[0]).join(" e "), rotulo: "número das primeiras leis estaduais a criar município" },
                m91 ? { valor: rrInt(m91.brasil), rotulo: "municípios no Brasil em 1991" } : null],
      texto: `Primeira vez que Roraima desenha o próprio mapa. Repare no <strong>número</strong> das leis:
        ${leis.join(" e ")} — uma assembleia que ainda não tinha passado da centésima lei já estava criando
        município. Antes disso, cada cidade nova aqui dependia de uma lei do <strong>Congresso Nacional</strong>;
        a partir daqui, de uma votação em Boa Vista.`,
      citacao: C.cita("Iracema", "primeiro morador"),
    };
  }
  // O ano em que o mapa fecha: dá para medir que ele nunca mais mudou, porque os
  // Censos seguintes continuam publicando os mesmos 15 municípios.
  const paradoDesde = [m00, m10, m22].filter(Boolean).every(x => x.roraima === 15);
  const depois = m00 && m22 ? m22.brasil - m00.brasil : null;
  return {
    numeros: [m91 && m00 ? { valor: "+" + rrInt(m00.brasil - m91.brasil), rotulo: "municípios criados no Brasil nos anos 90" } : null,
              depois != null ? { valor: "+" + rrInt(depois), rotulo: "e em todos os 22 anos seguintes" } : null,
              { valor: "15", rotulo: "municípios em Roraima, desde então" }],
    texto: `O mapa fecha aqui — e fecha para sempre. ${m91 && m00 ? `O Brasil inteiro criou
      <strong>${rrInt(m00.brasil - m91.brasil)} municípios</strong> entre os Censos de 1991 e 2000, indo de
      ${rrInt(m91.brasil)} para ${rrInt(m00.brasil)}: quase um quarto a mais em nove anos.` : ""}
      ${depois != null ? `Nos vinte e dois anos seguintes o país criou <strong>${rrInt(depois)}</strong>.` : ""}
      A onda que encheu o mapa de Roraima <strong>não era de Roraima</strong>, era do Brasil — e ela parou
      de repente, no país e aqui. ${paradoDesde ? "Os Censos de 2000, 2010 e 2022 continuam publicando os mesmos quinze." : ""}`,
    citacao: C.cita("Pacaraima", "exército"),
  };
}

function rrPerguntaFundacao(ano, novos, leis, C, ultimo) {
  if (ano < 1900) {
    return {
      pergunta: "Se o estado é de 1988, o que era isso aqui em 1890?",
      resposta: `Era o <strong>Amazonas</strong>. A vila de Boa Vista do Rio Branco foi criada pelo
        <strong>${escapeHtml((novos[0] || {}).criacao_lei || "decreto estadual")}</strong>, com território desmembrado da
        vila de Moura, e o registro do IBGE ainda anota que ela “figura entre os municípios amazonenses”
        numa lei estadual de 1892. Roraima é <strong>mais nova que sua capital em quase um século</strong>.`,
      ressalva: `a data de criação vem de um texto publicado em endereço do IBGE mas de autoria declarada de
        terceiro. Ela foi conferida contra os Censos — nenhum município aparece numa contagem anterior à sua
        própria criação —, mas isso testa a coerência, não a exatidão do dia.`,
    };
  }
  if (ano < 1970) {
    return {
      pergunta: "Por que um estado que faz fronteira com a Venezuela é cheio de maranhense?",
      resposta: `Porque <strong>foram trazidos</strong>. A ocupação de Roraima não foi espontânea: o governo do
        território montou colônias agrícolas e assentou famílias nordestinas, e o INCRA depois distribuiu
        terra na beira da estrada. O resultado está no nome dos lugares — <strong>São Luiz do Anauá</strong>
        se chama assim, diz o verbete do IBGE, em homenagem à capital do Maranhão “devido ao grande número
        de maranhenses no local”. Em 1991, <strong>${rrPct(C.natPct(1991, "Maranhão"), 1)} de todos os
        moradores de Roraima tinham nascido no Maranhão</strong>.`,
      ressalva: `os textos de origem dos povoados são citação de terceiro publicada pelo IBGE, não apuração do
        IBGE. O número de nascidos no Maranhão, esse sim, é do Censo (tabela 617).`,
    };
  }
  if (ano < 1990) {
    return {
      pergunta: `${novos.length} municípios no mesmo dia, pela mesma lei. Quem decidiu isso?`,
      resposta: `<strong>Brasília.</strong> Repare no nome da norma: <strong>${leis[0]}</strong>. Território
        federal não tem assembleia legislativa — quem redesenha o mapa é o Congresso Nacional, por lei
        federal, e por isso ${novos.length} municípios podem nascer de uma tacada só num único diploma.
        Doze anos depois a mesma operação será feita por <strong>lei estadual</strong>, e a troca do tipo de
        norma é o registro mais limpo que existe, nestes dados, da passagem de território a estado.`,
      ressalva: `este projeto mediu o tipo da lei, que está no registro de criação de cada município. A
        Constituição de 1988 aparece aqui como contexto declarado — a data dela não foi apurada por este
        projeto.`,
    };
  }
  const m91 = C.mun(1991), m00 = C.mun(2000), m22 = C.mun(2022);
  if (!ultimo) {
    // O defeito de autoria está no próprio dado e é detectável: num ano em que
    // todas as leis são estaduais, uma federal destoa. Detectar em vez de
    // escrever à mão significa que ele some sozinho se a fonte for corrigida.
    return {
      pergunta: "Uma assembleia recém-instalada e a lei n.º 82 já cria município. Por quê?",
      resposta: `Porque era o que <strong>faltava fazer</strong>. Roraima virou estado com o mapa que o
        território federal deixou: oito municípios para uma área maior que a do Rio Grande do Sul, com
        distritos e vilas que já tinham gente, escola e comércio, mas nenhuma prefeitura. As leis
        ${leis.join(" e ")} são a assembleia começando pelo mais óbvio — e nos dois anos seguintes ela
        completaria o serviço.`,
      ressalva: `criar município não cria população. O que muda com a lei é <em>onde a estatística é
        contada</em>: a mesma gente passa a aparecer num município novo em vez de no antigo. Nos passos de
        Censo, o mapa muda de cor por causa disso também, não só por migração.`,
    };
  }
  const federalNoAnoEstadual = novos.filter(m => /federal/i.test(m.criacao_lei || ""));
  return {
    pergunta: `${rrInt(novos.length)} num ano só, e depois nunca mais. Por que parou?`,
    resposta: `Porque a onda era nacional, e a onda passou. ${m91 && m00 ? `Entre os Censos de 1991 e 2000 o
      Brasil saltou de ${rrInt(m91.brasil)} para <strong>${rrInt(m00.brasil)} municípios</strong> —
      ${rrInt(m00.brasil - m91.brasil)} criações em nove anos.` : ""} ${m00 && m22 ? `Nos
      <strong>vinte e dois anos seguintes</strong>, o país criou ${rrInt(m22.brasil - m00.brasil)}.` : ""}
      Roraima fechou em <strong>15</strong> e ficou. Os números das leis estaduais guardam a pressa daqueles
      dois anos: <strong>82, 83, 96, 97, 99 e 100</strong> — uma assembleia nova preenchendo o mapa que
      herdou, e depois parando.`,
    ressalva: `a contagem de municípios do Brasil é uma <em>medição</em>: cada Censo publica resultado para os
      municípios que existiam na data, então contar as localidades da resposta é contar os municípios. Ela
      mostra que a criação parou, mas <strong>não diz por quê</strong> — a mudança de regra que travou o
      processo no país não foi apurada por este projeto.${federalNoAnoEstadual.length
        ? ` Some-se a isso um defeito da fonte: neste ano todas as leis são estaduais, menos a de
          <strong>${federalNoAnoEstadual.map(m => escapeHtml(m.nome)).join(", ")}</strong>, registrada como
          “${escapeHtml(federalNoAnoEstadual[0].criacao_lei)}” — numeração que cai no meio da sequência estadual do
          mesmo ano. A página mostra como a fonte traz, e aponta a incoerência.` : ""}`,
  };
}

// Um passo de "de onde vieram" medido só no nível de ESTADO. Serve para 1991 e
// 2000, anos em que o IBGE publicou a origem sem abrir por município — a seta
// aponta para o estado e o clique não refina, porque não há o que refinar.
function rrPassoOrigemEstadual(ano, org, mig, existiaEm, C) {
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
      pergunta do Censo ${ano} sobre ${escapeHtml(bloco.pergunta.split(",")[0])}.
      ${["Maranhão", "Pará", "Amazonas"].map(n => `<strong>${n}</strong> ${rrPct(parte(n), 1)}`).join(", ")}.
      ${interno ? `Outros ${rrInt(interno)} tinham se mudado dentro do próprio estado.` : ""}
      <br><br><strong>Aqui a seta é do estado, não do município.</strong> Em ${ano} o IBGE publicou a
      origem apenas agregada para Roraima inteira — clicar num município não abre nada, porque não existe
      o dado aberto. Só em 2010 a origem passa a ser publicada município a município.`,
    contexto: () => (ano === 1991 ? {
      numeros: [C.numMun(1991), { valor: String((C.mun(1991) || {}).roraima || "—"), rotulo: "municípios em Roraima" },
                C.numNasc(1991)],
      texto: `O Censo de 1991 pega Roraima <strong>recém-saída da condição de território federal</strong> e
        ainda com ${(C.mun(1991) || {}).roraima || "poucos"} municípios: os sete restantes só seriam criados
        em 1994 e 1995. É o retrato de um estado que já tinha gente, mas ainda não tinha mapa administrativo —
        e onde <strong>${rrPct(100 - (C.natPct(1991, "Roraima") || 0), 1)} dos moradores tinham nascido fora</strong>.`,
      citacao: C.cita("São Luiz do Anauá", "Maranhão"),
    } : {
      numeros: [C.numMun(2000), { valor: String((C.mun(2000) || {}).roraima || "—"), rotulo: "municípios em Roraima" },
                C.numNasc(2000)],
      texto: `Entre os dois Censos o <strong>Brasil inteiro</strong> criou
        ${rrInt(((C.mun(2000) || {}).brasil || 0) - ((C.mun(1991) || {}).brasil || 0))} municípios novos —
        de ${rrInt((C.mun(1991) || {}).brasil)} para ${rrInt((C.mun(2000) || {}).brasil)}. Roraima quase
        dobrou de ${(C.mun(1991) || {}).roraima} para ${(C.mun(2000) || {}).roraima}. A multiplicação que a
        linha do tempo mostra <strong>não é uma esquisitice local</strong>: é a onda nacional de criação de
        municípios dos anos 90, vista de perto num estado pequeno o bastante para caber inteiro na tela.`,
      citacao: C.cita("Rorainópolis", "Incra"),
    }),
    pergunta: () => (ano === 1991 ? {
      pergunta: "Se Roraima virou estado em 1988, por que em 1991 ainda tinha só oito municípios?",
      resposta: `Porque criar município passou a depender de uma <strong>assembleia que ainda não existia</strong>.
        Repare no tipo da norma: os seis municípios de 1982 nasceram pela <strong>Lei Federal n.º 7.009</strong> —
        território federal, quem decidia era Brasília. Os de 1994 e 1995 nascem por <strong>Lei Estadual</strong>,
        numerada 82, 83, 96, 97, 99, 100. Entre uma coisa e outra, Roraima ganhou legislativo próprio, e a
        primeira coisa que ele fez foi preencher o mapa.`,
      ressalva: `a troca de lei federal por lei estadual é o que <em>este projeto mediu</em>, porque está no
        registro de criação de cada município. A data em que a Constituição de 1988 transformou o território
        em estado é contexto declarado aqui, não medida deste projeto — o que se mede é o efeito dela.`,
    } : {
      pergunta: "Em 2000, menos da metade dos moradores tinha nascido em Roraima. Isso é normal?",
      resposta: `É o ponto mais baixo da série, e ele tem fundo: <strong>${rrPct(C.natPct(2000, "Roraima"), 1)}</strong>
        dos moradores tinham nascido no estado em 2000, contra ${rrPct(C.natPct(1991, "Roraima"), 1)} em 1991 e
        ${rrPct(C.natPct(2022, "Roraima"), 1)} em 2022. O estado se encheu de gente de fora mais rápido do que
        conseguia nascer gente dentro — e depois a conta se inverteu, porque quem chegou teve filhos aqui.`,
      ressalva: `nascer em Roraima não é o mesmo que a família ser daqui. A criança nascida em Boa Vista de pais
        maranhenses entra nos ${rrPct(C.natPct(2022, "Roraima"), 1)} de 2022 — a subida mede nascimento, não origem.`,
    }),
  };
}

function rrLinhaDoTempo(root, malha, mig, fund, org, ctx, hist) {
  const C = rrContexto(ctx, hist, mig);
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
    // `leis` só é consumida por template de HTML (aqui, no contexto e na
    // pergunta), então escapa na construção. O tooltip mostra a lei por outro
    // caminho — `f.criacao_lei` em `linhas`, que vai para textContent e por
    // isso continua cru. Extrair o número com /\d+/ segue funcionando: escape
    // não mexe em dígito.
    const leis = [...new Set(novos.map(m => m.criacao_lei).filter(Boolean))].map(escapeHtml);
    const datas = [...new Set(novos.map(m => m.criacao_data))];
    const nomes = novos.map(m => escapeHtml(m.nome));
    return {
      ano, rotulo: novos.length === 1 ? nomes[0] : `+${novos.length} municípios`,
      setas: false, modo: "fundacao",
      titulo: novos.length === 1
        ? `${nomes[0]} é criado — o estado passa a ter ${acumulado}`
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
        return `<strong>${escapeHtml(dataBR(datas[0]))}${datas.length > 1 ? " e " + escapeHtml(dataBR(datas[1])) : ""}</strong> —
          ${novos.length === 1 ? `nasce <strong>${nomes[0]}</strong>` : `nascem <strong>${nomes.join(", ")}</strong>`},
          ${leis.length === 1 ? `pela ${leis[0]}` : `pelas ${leis.join(" e ")}`}.
          Em laranja no mapa, quem nasce neste passo; em azul, quem já existia; em cinza tracejado, o
          território que ainda não tinha sede própria. O estado fecha o passo com
          <strong>${acumulado} de 15</strong> municípios.
          ${novos[0].criacao_frase_original ? `<br><br><span style="opacity:.85">Frase original da fonte:
            “${escapeHtml(novos[0].criacao_frase_original)}”</span>` : ""}
          ${alerta.length ? `<br><br><strong>Ressalva:</strong> ${escapeHtml(alerta[0].data_destoa_da_serie)}` : ""}`;
      },
      contexto: () => rrContextoFundacao(ano, novos, leis, C, ano === anos[anos.length - 1]),
      pergunta: () => rrPerguntaFundacao(ano, novos, leis, C, ano === anos[anos.length - 1]),
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
  const internoRR = somaOrigem.get("Roraima") || 0;
  const chegaram2010 = totalDeFora - internoRR;
  const SUDESTE = ["São Paulo", "Rio de Janeiro"];
  const sudeste2010 = SUDESTE.reduce((s, n) => s + (somaOrigem.get(n) || 0), 0);
  const natSudeste = SUDESTE.reduce((s, n) => s + (C.natPct(2010, n) || 0), 0);

  // Onde o estrangeiro mais PESA na população — não onde há mais deles em
  // número. É o que mostra a porta de entrada em vez do destino final, e é de
  // onde sai o rumo da seta do exterior no passo de 2022.
  const porPeso = mig.municipios
    .filter(m => m.estrangeiros_2022 && m.populacao_por_censo["2022"])
    .map(m => ({ ...m, peso: 100 * m.estrangeiros_2022 / m.populacao_por_censo["2022"] }))
    .sort((a, b) => b.peso - a.peso);
  const exterior2010 = mig.municipios.reduce((s, m) => s + (m.exterior_2010 || 0), 0);

  // ---- 2022: a matriz de origem que eu tinha dado como inexistente ----------
  // A base de comparação entre 2010 e 2022 é "quem veio de FORA DO ESTADO", nos
  // dois anos — mudança de município dentro de Roraima fica fora das duas
  // contas. Sem fixar a mesma base, 2022 daria 50% ou 64% conforme a escolha, e
  // a diferença entre os dois números não teria nada a ver com migração.
  const c22 = (ctx && ctx.origem_2022_por_municipio) || null;
  const cent = mig.centroides_uf || {};
  const chegadas22 = new Map();
  let totalChegadas22 = 0, exterior22 = 0;
  if (c22) {
    c22.fluxos.forEach(f => {
      if (f.origem === "Roraima") return;
      chegadas22.set(f.destino_ibge, (chegadas22.get(f.destino_ibge) || 0) + f.pessoas);
      totalChegadas22 += f.pessoas;
      if (f.origem === "Exterior") exterior22 += f.pessoas;
    });
  }

  // O "Exterior" é a única origem do projeto sem coordenada: o Censo publica a
  // categoria sem país nesta tabela. Em vez de inventar um ponto na Venezuela,
  // o rumo sai do município onde os estrangeiros mais pesam na população — que é
  // o de fronteira — projetado para fora do estado. É posição de PORTA, não de
  // origem, e o texto do passo diz isso com todas as letras.
  const ptsUF = ((malha.contorno_estado && malha.contorno_estado.length)
    ? malha.contorno_estado : malha.municipios.flatMap(m => m.aneis)).flat();
  const cLon = (Math.min(...ptsUF.map(p => p[0])) + Math.max(...ptsUF.map(p => p[0]))) / 2;
  const cLat = (Math.min(...ptsUF.map(p => p[1])) + Math.max(...ptsUF.map(p => p[1]))) / 2;
  const geoPorta = porPeso.length ? malha.municipios.find(m => m.ibge === porPeso[0].ibge) : null;
  const pontoExterior = geoPorta
    ? [cLon + 2.6 * (geoPorta.rotulo[0] - cLon), cLat + 2.6 * (geoPorta.rotulo[1] - cLat)]
    : null;

  function fluxos2022(codDestino) {
    if (!c22) return [];
    const comPonto = (f) => {
      if (f.origem === "Exterior") {
        return pontoExterior ? { ...f, origem_lon: pontoExterior[0], origem_lat: pontoExterior[1] } : null;
      }
      const c = cent[f.origem_uf];
      return c ? { ...f, origem_lon: c[0], origem_lat: c[1] } : null;
    };
    const fs = c22.fluxos.filter(f => (codDestino ? f.destino_ibge === codDestino : true));
    if (codDestino) {
      return fs.map(f => (f.origem === "Roraima" ? { ...f, origem: "Outro município de RR" } : f))
        .map(comPonto).filter(Boolean).sort((a, b) => b.pessoas - a.pessoas);
    }
    const soma = new Map();
    fs.filter(f => f.origem !== "Roraima").forEach(f => {
      const a = soma.get(f.origem) || { ...f, pessoas: 0, destino: "Roraima", destino_ibge: null };
      a.pessoas += f.pessoas;
      soma.set(f.origem, a);
    });
    return [...soma.values()].map(comPonto).filter(Boolean).sort((a, b) => b.pessoas - a.pessoas);
  }

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
        .map(a => rrPassoOrigemEstadual(a, org, mig, existiaEm, C))
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
          return `<strong>${escapeHtml(foco.nome)}</strong>: ${rrInt(foco.vindos_de_fora_2010)} moradores tinham vindo
            de fora nos dez anos anteriores a 2010. As maiores origens foram
            ${fs.map(f => `${escapeHtml(f.origem)} (${rrInt(f.pessoas)})`).join(", ")}.
            Clique de novo no município para voltar ao estado inteiro.`;
        }
        const deFora = topOrigens.filter(([n]) => n !== "Roraima");
        const interno = somaOrigem.get("Roraima") || 0;
        return `<strong>${rrInt(totalDeFora - interno)} moradores</strong> de Roraima em 2010 tinham vivido
          em outra unidade da federação nos dez anos anteriores. As três maiores origens são
          ${deFora.slice(0, 3).map(([n, v]) => `<strong>${escapeHtml(n)}</strong> (${rrInt(v)})`).join(", ")} —
          duas do Norte e uma do Nordeste. Outros ${rrInt(interno)} tinham se mudado <em>entre municípios
          do próprio estado</em>: esses não viram seta aqui, porque uma flecha de Roraima para Roraima não
          diz nada num mapa do estado. Cada seta encosta na <strong>fronteira</strong>, e não num ponto do
          interior, porque o destino deste passo é o estado inteiro — não um município.
          O rumo é o real entre o centro da unidade de origem e Roraima; a espessura é a raiz do número de
          pessoas. <strong>Clique num município</strong> para ver as origens só dele.`;
      },
      contexto: () => ({
        numeros: [
          { valor: rrPct(100 * sudeste2010 / chegaram2010, 1), rotulo: "de quem chegou veio de SP ou RJ" },
          { valor: rrPct(natSudeste, 1), rotulo: "dos moradores nasceram em SP ou RJ" },
          C.adm ? { valor: rrPct(C.adm.pct_roraima, 1), rotulo: `da economia é administração pública — ${C.adm.posicao_de_roraima}ª de ${C.adm.de_quantas_ufs} UFs` } : null,
        ],
        texto: `Em 2010 Roraima é um <strong>estado de vinte e poucos anos</strong> com um aparelho público
          desproporcional ao seu tamanho: ${C.adm ? `<strong>${rrPct(C.adm.pct_roraima, 1)} de tudo o que a
          economia do estado produz é administração, defesa, educação e saúde públicas</strong> — a
          ${C.adm.posicao_de_roraima}ª maior proporção entre as ${C.adm.de_quantas_ufs} unidades da
          federação.` : ""} Um estado novo precisa de servidor, professor, juiz, médico e polícia ao mesmo
          tempo, e quem tem diploma para isso pode estar em qualquer lugar do país. Junte a isso um programa
          federal que distribuía terra na beira da estrada e o resultado é um mapa de origens
          <strong>mais espalhado do que a geografia explicaria</strong>.`,
        citacao: C.cita("Rorainópolis", "atraindo"),
      }),
      pergunta: () => {
        const sp = C.par("São Paulo"), rj = C.par("Rio de Janeiro");
        const ma = C.par("Maranhão"), ce = C.par("Ceará");
        return {
          pergunta: "Por que diabos tem gente do Rio e de São Paulo em Roraima?",
          resposta: `Primeiro, <strong>são poucos</strong>: ${rrInt(sudeste2010)} pessoas, ou
            ${rrPct(100 * sudeste2010 / chegaram2010, 1)} de quem chegou na década — e
            ${rrPct(natSudeste, 1)} de quem morava aqui. A seta existe, mas é fina.<br><br>
            Segundo, e aí fica interessante: <strong>é um vínculo novo</strong>. Dá para medir isso
            comparando duas perguntas do Censo — quantos <em>nasceram</em> naquele estado e quantos
            <em>vieram</em> de lá na década. No Rio a conta é ${rrInt(rj.vieram_de_la)} chegadas para
            ${rrInt(rj.nasceram_la)} nascidos (razão <strong>${rrRazao(rj.razao_fluxo_sobre_estoque)}</strong>);
            em São Paulo, ${rrInt(sp.vieram_de_la)} para ${rrInt(sp.nasceram_la)}
            (<strong>${rrRazao(sp.razao_fluxo_sobre_estoque)}</strong>). No Maranhão é
            ${rrRazao(ma.razao_fluxo_sobre_estoque)} e no Ceará, ${rrRazao(ce.razao_fluxo_sobre_estoque)}.<br><br>
            Traduzindo: a comunidade nordestina em Roraima foi <strong>formada há décadas</strong> — há muito
            mais gente nascida lá do que gente chegando de lá. A ligação com o Sudeste é do
            <strong>tamanho do fluxo recente</strong>, que é o retrato de uma coisa que acabou de começar.
            E o que uma pessoa vai fazer num estado novo? ${C.adm ? `O estado tem
            <strong>${rrPct(C.adm.pct_roraima, 1)} da economia em administração pública</strong>, terceiro do
            país.` : ""}`,
          ressalva: `nada aqui prova que essas pessoas vieram para o serviço público — o Censo, nestas
            tabelas, não cruza ocupação com origem. E “veio de São Paulo” <strong>não quer dizer “nasceu em
            São Paulo”</strong>: parte dessas setas é gente do Norte e do Nordeste que morou no Sudeste e
            depois subiu. As duas perguntas medem coisas diferentes, e a razão entre elas indica idade do
            vínculo, não trajetória de indivíduo.`,
        };
      },
    },
    ...(c22 ? [{
      ano: 2022, rotulo: "de onde vieram", setas: true, permiteFoco: true,
      fluxos: (codDestino) => fluxos2022(codDestino),
      titulo: "2022: quase dois terços de quem chegou não vieram do Brasil",
      existe: (d) => existiaEm(d, 2022),
      valor: (d) => (chegadas22.get(d.ibge) || 0),
      descrever: (d) => `${rrInt(chegadas22.get(d.ibge) || 0)} moradores estavam aqui havia menos de 10 anos`,
      linhas: (d) => {
        const ext = (c22.fluxos.find(f => f.destino_ibge === d.ibge && f.origem === "Exterior") || {}).pessoas || 0;
        const t = chegadas22.get(d.ibge) || 0;
        return [
          ["População (Censo 2022)", rrInt(pop(d, 2022)) + " hab."],
          ["Moram aqui há menos de 10 anos", rrInt(t) + " pessoas"],
          ["Desses, vindos do exterior", rrInt(ext) + (t ? ` (${rrPct(100 * ext / t, 0)})` : "")],
        ];
      },
      texto: (foco) => {
        if (foco) {
          const fs = fluxos2022(foco.ibge).slice(0, 3);
          return `<strong>${escapeHtml(foco.nome)}</strong>: ${rrInt(chegadas22.get(foco.ibge) || 0)} moradores estavam
            no município havia menos de dez anos em 2022. As maiores origens foram
            ${fs.map(f => `${escapeHtml(f.origem)} (${rrInt(f.pessoas)})`).join(", ")}.
            Clique de novo no município para voltar ao estado inteiro.`;
        }
        const p = C.pais(2022);
        const top = p ? p.paises.filter(x => x.pais !== "Brasil")[0] : null;
        return `Este passo <strong>não existia</strong> até agora, e a culpa é minha: eu tinha concluído que
          o Censo 2022 não publicava origem por município. Publica — e o que ela mostra é o maior movimento
          migratório da história recente do estado. Dos ${rrInt(totalChegadas22)} moradores que tinham vindo
          de fora do estado nos dez anos anteriores, <strong>${rrInt(exterior22)} vieram de fora do
          Brasil</strong>: ${rrPct(100 * exterior22 / totalChegadas22, 1)} deles.<br><br>
          Em 2010, na mesma conta, o exterior era ${rrPct(100 * exterior2010 / chegaram2010, 1)} —
          ${rrInt(exterior2010)} pessoas — e a maior origem estrangeira nem era a Venezuela.
          ${top ? `Numa medida vizinha do mesmo Censo, <strong>${rrPct(top.pct, 1)} de quem não morava no
          Brasil cinco anos antes estava na ${escapeHtml(top.pais)}</strong>.` : ""}<br><br>
          <strong>A seta do exterior é a única do projeto que não parte de um ponto medido.</strong> O Censo
          publica “Exterior”, sem coordenada. Ela entra pelo rumo de <strong>${escapeHtml(porPeso[0].nome)}</strong>, o
          município onde os estrangeiros mais pesam na população (${rrPct(porPeso[0].peso, 0)} dela) e onde
          fica a fronteira — é posição de <em>porta de entrada</em>, não de origem apurada. O comprimento
          dela não significa distância.`;
      },
      contexto: () => {
        const p = C.pais(2022), p10 = C.pais(2010);
        const top = p ? p.paises.filter(x => x.pais !== "Brasil")[0] : null;
        const top10 = p10 ? p10.paises.filter(x => x.pais !== "Brasil")[0] : null;
        return {
          numeros: [
            { valor: rrPct(100 * exterior22 / totalChegadas22, 1), rotulo: "de quem veio de fora do estado veio de fora do país" },
            top ? { valor: rrPct(top.pct, 1), rotulo: `de quem morava fora estava na ${escapeHtml(top.pais)}` } : null,
            { valor: rrPct(100 * exterior22 / totalEm(2022), 1), rotulo: "da população do estado" },
          ],
          texto: `Entre um Censo e outro, a maior origem estrangeira de Roraima
            ${top10 && top ? `deixou de ser a <strong>${escapeHtml(top10.pais)}</strong> e passou a ser a
            <strong>${escapeHtml(top.pais)}</strong>` : "mudou"} — e não trocou de lugar por pouco:
            ${top10 ? `em 2010 eram ${rrInt(top10.pessoas)} pessoas` : ""}
            ${top ? `e em 2022 são <strong>${rrInt(top.pessoas)}</strong>` : ""}. Um estado de
            ${rrInt(totalEm(2022))} habitantes recebeu, pela fronteira terrestre, um contingente equivalente a
            <strong>${rrPct(100 * exterior22 / totalEm(2022), 1)} da sua própria população</strong>. É a
            razão pela qual Roraima virou assunto nacional na última década.`,
          citacao: C.cita(porPeso[0].nome, "fronteira"),
        };
      },
      pergunta: () => {
        const p = C.pais(2022), p10 = C.pais(2010);
        const top = p ? p.paises.filter(x => x.pais !== "Brasil")[0] : null;
        const top10 = p10 ? p10.paises.filter(x => x.pais !== "Brasil")[0] : null;
        return {
          pergunta: `Em 2010 o exterior era ${rrPct(100 * exterior2010 / chegaram2010, 1)} das chegadas. Como virou quase dois terços?`,
          resposta: `Porque o vizinho entrou em colapso, e vizinho de Roraima se alcança
            <strong>a pé</strong>. ${top10 ? `Em 2010 a maior origem estrangeira era a
            <strong>${escapeHtml(top10.pais)}</strong>, com ${rrInt(top10.pessoas)} pessoas` : ""}${top ? `; em 2022 são
            <strong>${rrInt(top.pessoas)} vindos da ${escapeHtml(top.pais)}</strong>, ${rrPct(top.pct, 1)} de todos os que
            moravam fora do Brasil cinco anos antes` : ""}. Não é uma migração que chega de avião e se
            distribui pelo país: ela <strong>atravessa uma linha no chão</strong> e a primeira coisa que
            encontra é ${escapeHtml(porPeso[0].nome)}, onde hoje ${rrPct(porPeso[0].peso, 0)} da população é estrangeira.`,
          ressalva: `as duas medidas têm <strong>janelas diferentes</strong> — “menos de 10 anos no município”
            e “não morava no Brasil 5 anos antes” — e por isso os totais não se somam nem se dividem um pelo
            outro. Além disso, elas medem <em>onde a pessoa morava</em>, não a nacionalidade dela: parte de
            quem vem da Venezuela é brasileiro voltando. E o Censo é de 2022; quem chegou ou foi embora
            depois não está aqui.`,
        };
      },
    }] : []),
    {
      ano: 2022, rotulo: "quem já estava", setas: false,
      titulo: "E quem já estava aqui antes de qualquer seta",
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
        const bv = mig.municipios.find(m => m.nome === "Boa Vista");
        return `A cor do mapa agora é a <strong>proporção de população indígena</strong>, e ela muda a
          leitura de tudo o que veio antes: em ${ind.length} municípios os indígenas são maioria —
          ${ind.slice(0, 3).map(m => `${escapeHtml(m.nome)} ${rrPct(m.indigena_pct_2022, 0)}`).join(", ")}. Essas
          populações <strong>não chegaram por nenhuma das setas</strong>: elas já estavam aqui quando as
          fronteiras foram desenhadas por cima delas. Nenhum passo desta linha do tempo mostra a chegada
          delas, porque nenhuma fonte deste projeto a registra — o Censo começa a contar depois.<br><br>
          Em 2022 o estado tinha <strong>${rrInt(est)} estrangeiros residentes</strong> —
          ${rrPct(100 * est / totalEm(2022), 1)} da população.
          ${rrInt(bv.estrangeiros_2022)} moram em Boa Vista, mas o município onde eles mais pesam é
          <strong>${escapeHtml(porPeso[0].nome)}: ${rrPct(porPeso[0].peso, 0)} da população</strong> — é ali que fica a
          fronteira com a Venezuela.`;
      },
      contexto: () => ({
        numeros: [
          C.numNasc(2022),
          { valor: rrPct(C.natPct(1991, "Roraima") || 0, 1), rotulo: "era o número em 1991" },
          { valor: rrPct(C.natPct(2000, "Roraima") || 0, 1), rotulo: "e em 2000, o fundo do poço" },
        ],
        texto: `Depois de toda essa chegada, o desfecho é o oposto do que as setas sugerem:
          <strong>Roraima virou um estado de gente nascida em Roraima</strong>. A proporção caiu de
          ${rrPct(C.natPct(1991, "Roraima"), 1)} em 1991 para ${rrPct(C.natPct(2000, "Roraima"), 1)} em 2000
          — o auge da ocupação — e depois subiu para <strong>${rrPct(C.natPct(2022, "Roraima"), 1)}</strong>.
          Quem chegou fez filhos aqui, e os filhos são a maioria. As setas mostram o movimento; este número
          mostra o que ele virou.`,
        citacao: null,
      }),
      pergunta: () => ({
        pergunta: "Dá para saber, olhando o mapa, quem é indígena e quem veio de fora?",
        resposta: `Em parte, e essa é a parte honesta da resposta. O Censo pergunta cor ou raça, e o mapa
          deste passo mostra o resultado município a município: nos ${mig.municipios.filter(m => m.indigena_pct_2022 >= 50).length}
          em que os indígenas são maioria, <strong>as setas dos passos anteriores mal encostam</strong> — são
          os municípios de fronteira e de serra, não os da estrada. O contraste entre este mapa e o de 2010
          é a coisa mais informativa da linha do tempo inteira: <strong>a migração desenhou um estado por
          cima de outro que já existia</strong>, sem apagá-lo.`,
        ressalva: `cor ou raça é <strong>autodeclaração</strong>, não ascendência: a subida da população
          indígena entre 2010 e 2022 mistura crescimento demográfico com mudança de quem se declara
          indígena, e o Censo não separa as duas. E o mapa não diz quem “é português” ou “descendente de”:
          as únicas categorias que o Censo oferece são <em>branca, preta, amarela, parda e indígena</em>, e
          nenhuma delas informa de onde veio a família.`,
      }),
    },
  ];

  renderLinhaDoTempo(root, { malha, dados: mig, passos });

  const naoExiste = mig.o_que_nao_existe || [];
  const alertas = (fund && fund.sinalizacoes_automaticas) || [];
  noteToggle(root, "O que esta linha do tempo não mostra, e o que veio de fonte de terceiro",
    `<p class="viz-note-lead">As datas de criação vêm de um endereço do IBGE, mas não são apuração do
      IBGE: cada registro declara <strong>“${escapeHtml((fund && fund.municipios[0].fonte_declarada_no_registro) || "fonte de terceiro")}”</strong>
      como origem do texto. Por isso cada data foi <strong>cruzada com os Censos</strong>, que são de outra
      fonte: um município criado depois de 1991 não pode aparecer na contagem de 1991.
      ${fund && !fund.resumo.conflitos_com_censo.length
        ? "Nas quinze, nenhuma data conflita com o Censo." : ""}
      A frase original de onde cada data saiu aparece no passo correspondente.</p>`
    + (alertas.length ? alertas.map(a =>
        `<p><strong>${escapeHtml(a.municipio)} — divergência na própria fonte:</strong> ${escapeHtml(a.alerta)}</p>`).join("") : "")
    + (fund && fund.resumo.instalacao_incoerente.length
        ? `<p><strong>${fund.resumo.instalacao_incoerente.map(escapeHtml).join(", ")} — outra divergência da fonte:</strong>
           o texto traz uma data de instalação anterior à de criação. Por isso a data de instalação só é
           mostrada quando é coerente com a de criação.</p>` : "")
    + naoExiste.map(x => `<p><strong>${escapeHtml(x.assunto)}</strong> (${escapeHtml(x.situacao)}): ${escapeHtml(x.detalhe)}</p>`).join("")
    + `<p><strong>Duas correções desta versão, porque errar calado é pior que errar.</strong>
       (1) Esta linha do tempo dizia que <em>o Censo 2022 não publicou a origem por município</em>. Publica,
       na tabela 10158 — e o passo de 2022, que estava sem setas, era justamente o do maior movimento
       migratório da história recente do estado. (2) O campo <code>exterior_2010</code> tinha sido gravado com
       o mesmo valor do total de chegadas nos quinze municípios, de modo que a dica do passo de 2010 afirmava
       que <em>todos</em> os que chegaram vieram de outro país. O valor certo — ${rrInt(exterior2010)} pessoas
       no estado — foi recalculado da própria matriz de fluxos e reconferido contra ela.</p>`
    + `<p><strong>O que é medida e o que é contexto.</strong> Nos blocos “o que estava acontecendo” e nas
       perguntas, todo número tem tabela do IBGE atrás e URL guardada no arquivo de dados. Os trechos entre
       aspas são <em>citação de terceiro publicada em endereço do IBGE</em>, com a autoria indicada embaixo —
       valem como o que a fonte diz, não como apuração deste projeto. E há um fato que entra declaradamente
       como contexto e não como medida: a transformação do Território Federal de Roraima em estado. O que foi
       medido aqui é o efeito dela — a lei que cria município deixa de ser federal e passa a ser estadual
       entre 1982 e 1994.</p>`
    + `<p class="viz-note-fontes">Fontes: ${Object.values(mig.fontes).map(escapeHtml).join(" · ")}${fund ? " · " + escapeHtml(fund.fonte) : ""}${ctx ? " · " + Object.values(ctx.fontes).map(escapeHtml).join(" · ") : ""}${hist ? " · " + escapeHtml(hist.fonte.split(" — ")[0]) : ""}</p>`);

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
    e a primeira, ${escapeHtml(df.uf)}, é um caso à parte, porque tem um município só (${rrPct(df.concentracao_pct, 0)} por
    definição). Entre os estados com mais de um município, <strong>Roraima é o mais concentrado do país</strong>,
    à frente do ${escapeHtml(ap.uf)} (${rrPct(ap.concentracao_pct, 1)} em ${escapeHtml(ap.maior_municipio.split(" - ")[0])}).`);
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
  note(root, `<strong>As linhas tracejadas são estados inteiros.</strong> ${escapeHtml(cara.municipio)} tem
    ${rrKm2(cara.area_km2)} — mais que ${cara.ufs_menores.length} unidades da federação, entre elas o
    estado do ${escapeHtml(cara.maior_uf_superada)} (${rrKm2(cara.area_maior_uf_superada_km2)}) —, e dentro dessa
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
    — ${maioria.map(d => `${escapeHtml(d.nome)} (${rrPct(d.indigena_pct_2022, 1)})`).join(", ")}.
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
    comparar <em>quanto cada um cresceu</em>: ${escapeHtml(cresceu.nome)} multiplicou por
    ${rrNum(cresceu.valores[cresceu.valores.length - 1] / 100, 1)} desde ${base}, e ${escapeHtml(menos.nome)},
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
    O menos dependente é ${escapeHtml(menor.nome)}, a capital, com ${rrPct(menor.dependencia, 1)}${capital ?
      ` — mais que o dobro de ${escapeHtml(capital.nome)}, que é capital também e aparece na régua com ${rrPct(capital.dependencia, 0)}` : ""}.
    No outro extremo, ${escapeHtml(maior.nome)} chega a ${rrPct(maior.dependencia, 1)}${serra ?
      `: <strong>mais dependente que ${escapeHtml(serra.nome)}</strong>, o menor município do Brasil, que este projeto já
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
    ${escapeHtml(dados[0].nome)} tem a maior receita por habitante do estado (${rrReais(dados[0].receita_per_capita)}),
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
  note(root, `<strong>Em ${escapeHtml(alto.nome)}, ${rrPct(alto.adm_publica_pct, 1)} de tudo que a economia do município
    produz é administração, defesa, educação e saúde públicas.</strong> Em ${acima} dos quinze essa fatia
    passa da metade. O menor peso do estado é o de ${escapeHtml(baixo.nome)}, com ${rrPct(baixo.adm_publica_pct, 1)}, e a
    capital, ${escapeHtml(capital.nome)}, aparece em ${rrPct(capital.adm_publica_pct, 1)} — dois em cada cinco reais,
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
    município-ano não têm declaração no SICONFI: ${naoDeclarados.map(escapeHtml).join(", ")}. Eles somem dos gráficos como
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
                 j("fundacao_municipios.json"), j("origens_por_censo.json"),
                 j("contexto_das_datas.json"), j("historico_municipios.json")])
      .then(([malha, mig, fund, org, ctx, hist]) =>
        desenha(rrLinhaDoTempo, tlRoot, malha, mig, fund, org, ctx, hist))
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
