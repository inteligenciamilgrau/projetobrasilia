const slug = document.body.dataset.city;
const root = "../";
const formatter = new Intl.NumberFormat("pt-BR");
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const safeUrl = value => { try { const url=new URL(value,location.href); return ["http:","https:"].includes(url.protocol) ? url.href : "#"; } catch(error) { return "#"; } };
const safeSlug = value => /^[a-z0-9-]+$/.test(String(value)) ? String(value) : "";
const cityPages = {"Recife/PE":"recife","São Paulo/SP":"sao-paulo","Fortaleza/CE":"fortaleza","Rio de Janeiro/RJ":"rio-de-janeiro","Porto Alegre/RS":"porto-alegre","Curitiba/PR":"curitiba","Belo Horizonte/MG":"belo-horizonte","Brasília/DF":"brasilia","Jundiaí/SP":"jundiai","Belém/PA":"belem"};
const isAutomatable = access => /API|Geosserviço|WFS|JSON|GTFS|DataStore/i.test(access);
const isDownloadable = access => /CSV|XLS|XLSX|GeoJSON|GTFS|arquivo/i.test(access);
const isLocalLayer = layer => /municipal|distrital/i.test(layer);
const statusLabel = { confirmado: "confirmado", parcial: "parcial", lacuna: "lacuna" };
const statusPlural = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;

Promise.all([
  fetch(`${root}perfis_cidades.json`).then(response => response.json()),
  fetch(`${root}inventario_top10.json`).then(response => response.json())
]).then(([profilesData, inventory]) => {
  const profile = profilesData.profiles.find(item => item.slug === slug);
  if (!profile) throw new Error("Perfil inexistente");
  const city = inventory.cities.find(item => item.city === profile.city);
  const sources = inventory.sources.filter(item => item.city === profile.city);
  const confirmed = sources.filter(item => item.status === "confirmado").length;
  const partial = sources.filter(item => item.status === "parcial").length;
  const gaps = sources.filter(item => item.status === "lacuna").length;
  const machine = sources.filter(item => isAutomatable(item.access)).length;
  const downloadable = sources.filter(item => isDownloadable(item.access)).length;
  const local = sources.filter(item => isLocalLayer(item.layer)).length;
  const layers = new Set(sources.map(item => item.layer)).size;
  const domains = [...new Set(sources.map(item => item.domain))].sort((a,b) => a.localeCompare(b,"pt-BR"));
  const accessModes = [...new Set(sources.map(item => item.access))].sort((a,b) => a.localeCompare(b,"pt-BR"));

  document.title = `${profile.city} — Projeto Brasil iA`;
  document.querySelector("#city-name").textContent = profile.city;
  document.querySelector("#city-summary").textContent = profile.summary;
  document.querySelector("#city-role").textContent = profile.role;
  document.querySelector("#city-declared").textContent = city.declared;
  document.querySelector("#population").textContent = formatter.format(city.population);
  document.querySelector("#quality-rank").textContent = `#${profile.quality_rank}`;
  document.querySelector("#p-pilot").textContent = String(profile.p_pilot).replace(".", ",");
  document.querySelector("#source-count").textContent = sources.length;
  document.querySelector("#confirmed-count").textContent = confirmed;
  document.querySelector("#machine-count").textContent = machine;
  document.querySelector("#layer-count").textContent = layers;
  document.querySelector("#source-count").closest("p").textContent = `${statusPlural(sources.length,"evidência catalogada","evidências catalogadas")} em ${statusPlural(layers,"camada institucional","camadas institucionais")}.`;
  document.querySelector("#strengths").innerHTML = profile.strengths.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#risks").innerHTML = profile.risks.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#next").innerHTML = profile.next.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  const rule = document.querySelector(".rule");
  rule.insertAdjacentHTML("afterend", `
    <section class="city-brief" aria-labelledby="brief-title">
      <article class="scope-card">
        <p class="kicker">Recorte recomendado</p>
        <h2 id="brief-title">Por onde começar nesta cidade.</h2>
        <p class="scope-copy">${escapeHtml(profile.recommended_scope)}</p>
        <dl class="brief-meta">
          <div><dt>Unidade territorial útil</dt><dd>${escapeHtml(profile.territorial_unit)}</dd></div>
          <div><dt>Limite de escopo</dt><dd>${escapeHtml(profile.scope_limit)}</dd></div>
        </dl>
      </article>
      <aside class="evidence-card" aria-label="Diagnóstico da amostra catalogada">
        <p class="kicker">Evidência disponível</p>
        <h2>Amostra auditada.</h2>
        <div class="evidence-numbers">
          <div><strong>${sources.length}</strong><span>fontes</span></div>
          <div><strong>${confirmed}</strong><span>confirmadas</span></div>
          <div><strong>${partial}</strong><span>parciais</span></div>
          <div><strong>${gaps}</strong><span>lacunas</span></div>
        </div>
        <p><strong>${statusPlural(local,"fonte local ou distrital","fontes locais ou distritais")}</strong> e ${statusPlural(machine,"acesso automatizável","acessos automatizáveis")} na amostra.</p>
        <p class="confidence-note"><strong>C-IDU ainda não calculado.</strong> Estas contagens medem a amostra catalogada, não a confiança estatística nem o acervo total da cidade.</p>
      </aside>
    </section>`);

  const triageSection = document.querySelector(".triage").closest("section");
  triageSection.insertAdjacentHTML("afterend", `
    <section aria-labelledby="deliverables-title">
      <div class="section-heading"><div><p class="kicker">Uso prático</p><h2 id="deliverables-title">O primeiro produto que faz sentido.</h2></div><p>Hipóteses de entrega para validar utilidade antes de ampliar a coleta.</p></div>
      <div class="deliverables">${profile.starter_deliverables.map((item,index) => `<article><span>0${index + 1}</span><p>${escapeHtml(item)}</p></article>`).join("")}</div>
    </section>`);

  const domainCounts = domains.map(domain => {
    const entries = sources.filter(item => item.domain === domain);
    const states = new Set(entries.map(item => item.status));
    const status = states.has("lacuna") ? "lacuna" : states.has("parcial") ? "parcial" : "confirmado";
    return {
      domain,
      entries,
      count: entries.length,
      status,
      access: [...new Set(entries.map(item => item.access))].join(" · "),
      granularity: [...new Set(entries.map(item => item.granularity))].join(" · "),
      layers: [...new Set(entries.map(item => item.layer))].join(" · ")
    };
  });
  const maxCount = Math.max(...domainCounts.map(item => item.count), 1);
  document.querySelector("#domains").innerHTML = domainCounts.map(item => `<article class="domain-card"><div><strong>${escapeHtml(item.domain)}</strong><span class="status ${escapeHtml(item.status)}">${escapeHtml(statusLabel[item.status])}</span></div><span>${item.count} ${item.count === 1 ? "evidência catalogada" : "evidências catalogadas"}</span><div class="bar" aria-hidden="true"><i style="width:${Math.round(item.count/maxCount*100)}%"></i></div></article>`).join("");

  const domainsSection = document.querySelector("#domains").closest("section");
  domainsSection.insertAdjacentHTML("beforeend", `
    <div class="coverage-wrap">
      <table class="coverage-table">
        <caption>Diagnóstico por área na amostra. “Confirmado” significa que a fonte foi localizada e aberta; não que todo o seu conteúdo já foi ingerido.</caption>
        <thead><tr><th>Área</th><th>Situação</th><th>Acesso encontrado</th><th>Recorte disponível</th><th>Origem</th></tr></thead>
        <tbody>${domainCounts.map(item => `<tr><td><strong>${escapeHtml(item.domain)}</strong></td><td><span class="status ${escapeHtml(item.status)}">${escapeHtml(statusLabel[item.status])}</span></td><td>${escapeHtml(item.access)}</td><td>${escapeHtml(item.granularity)}</td><td>${escapeHtml(item.layers)}</td></tr>`).join("")}</tbody>
      </table>
    </div>
    <div class="technical-strip" aria-label="Resumo dos formatos e origens">
      <div><span>Formas de acesso encontradas</span><p>${accessModes.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join(" ")}</p></div>
      <div><span>Leitura da amostra</span><p>${statusPlural(downloadable,"fonte com arquivo estruturado declarado","fontes com arquivo estruturado declarado")}; ${statusPlural(layers,"camada institucional","camadas institucionais")}.</p></div>
    </div>`);

  document.querySelector("#sources").innerHTML = sources.map((item,index) => `<article class="source" id="fonte-${index + 1}"><div><div class="tags"><span class="tag domain">${escapeHtml(item.domain)}</span><span class="tag">${escapeHtml(item.layer)}</span></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note)}</p></div><dl class="meta"><div><dt>Produtor</dt><dd>${escapeHtml(item.producer)}</dd></div><div><dt>Acesso</dt><dd>${escapeHtml(item.access)}</dd></div></dl><dl class="meta"><div><dt>Território</dt><dd>${escapeHtml(item.granularity)}</dd></div><div><dt>Frescor</dt><dd>${escapeHtml(item.freshness)}</dd></div></dl><div><span class="status ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><br><a class="open" href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a></div></article>`).join("");

  document.querySelector("#city-nav").innerHTML = profilesData.profiles.map(item => `<a href="${escapeHtml(safeSlug(item.slug))}.html"${item.slug === slug ? ' aria-current="page"' : ""}>${escapeHtml(item.city.replace(/\/.*/,""))}</a>`).join("");
}).catch(() => {
  document.querySelector("#city-summary").textContent = "Não foi possível carregar os dados desta cidade. Abra a página por um servidor HTTP ou consulte os arquivos JSON do projeto.";
  document.querySelector("#sources").innerHTML = '<div class="empty">Dados indisponíveis nesta visualização. <a href="../inventario_top10.json">Abrir inventário JSON</a>.</div>';
});
