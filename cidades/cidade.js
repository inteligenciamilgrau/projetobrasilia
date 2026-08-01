const slug = document.body.dataset.city;
const root = "../";
const formatter = new Intl.NumberFormat("pt-BR");
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const cityPages = {"Recife/PE":"recife","São Paulo/SP":"sao-paulo","Fortaleza/CE":"fortaleza","Rio de Janeiro/RJ":"rio-de-janeiro","Porto Alegre/RS":"porto-alegre","Curitiba/PR":"curitiba","Belo Horizonte/MG":"belo-horizonte","Brasília/DF":"brasilia","Jundiaí/SP":"jundiai","Belém/PA":"belem"};

Promise.all([
  fetch(`${root}perfis_cidades.json`).then(response => response.json()),
  fetch(`${root}inventario_top10.json`).then(response => response.json())
]).then(([profilesData, inventory]) => {
  const profile = profilesData.profiles.find(item => item.slug === slug);
  if (!profile) throw new Error("Perfil inexistente");
  const city = inventory.cities.find(item => item.city === profile.city);
  const sources = inventory.sources.filter(item => item.city === profile.city);
  const confirmed = sources.filter(item => item.status === "confirmado").length;
  const machine = sources.filter(item => /API|Geosserviço/i.test(item.access)).length;
  const layers = new Set(sources.map(item => item.layer)).size;
  const domains = [...new Set(sources.map(item => item.domain))].sort((a,b) => a.localeCompare(b,"pt-BR"));

  document.title = `${profile.city} — Projeto iA Brasil`;
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
  document.querySelector("#strengths").innerHTML = profile.strengths.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#risks").innerHTML = profile.risks.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#next").innerHTML = profile.next.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  const domainCounts = domains.map(domain => ({ domain, count: sources.filter(item => item.domain === domain).length }));
  const maxCount = Math.max(...domainCounts.map(item => item.count), 1);
  document.querySelector("#domains").innerHTML = domainCounts.map(item => `<article class="domain-card"><strong>${escapeHtml(item.domain)}</strong><span>${item.count} ${item.count === 1 ? "evidência catalogada" : "evidências catalogadas"}</span><div class="bar" aria-hidden="true"><i style="width:${Math.round(item.count/maxCount*100)}%"></i></div></article>`).join("");

  document.querySelector("#sources").innerHTML = sources.map(item => `<article class="source"><div><div class="tags"><span class="tag domain">${escapeHtml(item.domain)}</span><span class="tag">${escapeHtml(item.layer)}</span></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note)}</p></div><dl class="meta"><div><dt>Produtor</dt><dd>${escapeHtml(item.producer)}</dd></div><div><dt>Acesso</dt><dd>${escapeHtml(item.access)}</dd></div></dl><dl class="meta"><div><dt>Território</dt><dd>${escapeHtml(item.granularity)}</dd></div><div><dt>Frescor</dt><dd>${escapeHtml(item.freshness)}</dd></div></dl><div><span class="status ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><br><a class="open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Abrir fonte ↗</a></div></article>`).join("");

  document.querySelector("#city-nav").innerHTML = profilesData.profiles.map(item => `<a href="${item.slug}.html"${item.slug === slug ? ' aria-current="page"' : ""}>${escapeHtml(item.city.replace(/\/.*/,""))}</a>`).join("");
}).catch(() => {
  document.querySelector("#city-summary").textContent = "Não foi possível carregar os dados desta cidade. Abra a página por um servidor HTTP ou consulte os arquivos JSON do projeto.";
  document.querySelector("#sources").innerHTML = '<div class="empty">Dados indisponíveis nesta visualização. <a href="../inventario_top10.json">Abrir inventário JSON</a>.</div>';
});
