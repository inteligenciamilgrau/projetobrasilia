const slug = document.body.dataset.city || location.pathname.split("/").pop().replace(/\.html$/i, "");
const root = "../";
const formatter = new Intl.NumberFormat("pt-BR");
const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const safeUrl = value => { try { const url = new URL(value, location.href); return ["http:","https:"].includes(url.protocol) ? url.href : "#"; } catch (error) { return "#"; } };
const safeSlug = value => /^[a-z0-9-]+$/.test(String(value)) ? String(value) : "";
const triageReading = {
  now: "Há sinal suficiente para gastar a próxima rodada de auditoria, mas a promoção ainda depende de abrir recursos reais.",
  reserve: "Há uma pista útil, porém ela ainda não supera as candidatas prioritárias da mesma faixa.",
  gap: "permanece no pré-filtro, mas não apresentou diferencial de dados na primeira varredura."
};

fetch(`${root}perfis_cidades_pequenas.json`).then(response => {
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}).then(data => {
  const profile = data.profiles.find(item => item.slug === slug);
  if (!profile) throw new Error("Perfil inexistente");
  const peers = data.profiles.filter(item => item.band === profile.band && item.current).sort((a,b) => a.metric_rank - b.metric_rank);
  const otherBand = profile.band === "micro" ? "≈ 100 mil" : "≈ 10 mil";
  const meta = document.querySelector('meta[name="description"]');

  document.title = `${profile.city} — cidades pequenas — Projeto Brasil iA`;
  if (meta) meta.content = `Evidências, limites e próximos testes de ${profile.city} no ranking de ${profile.band_label} do Projeto Brasil iA.`;
  document.querySelector("#band-label").textContent = `Dossiê municipal · ${profile.band_label}`;
  document.querySelector("#city-name").textContent = profile.city;
  document.querySelector("#city-summary").textContent = profile.summary;
  document.querySelector("#triage-role").textContent = profile.triage_label;
  const triageBadge = document.querySelector("#triage-role-copy");
  triageBadge.textContent = profile.triage_label;
  triageBadge.classList.add(profile.triage);
  document.querySelector("#confidence").textContent = `Confiança da triagem: ${profile.confidence}.`;
  document.querySelector("#idhm-rank").textContent = `#${profile.metric_rank}`;
  document.querySelector("#idhm-rank").closest(".stat").querySelector("span").textContent = `posição no pré-filtro por ${profile.metric_name}`;
  document.querySelector("#audit-rank").textContent = `#${profile.audit_rank}`;
  document.querySelector("#population").textContent = formatter.format(profile.population);
  document.querySelector("#idhm").textContent = profile.metric_value_label;
  document.querySelector("#idhm").closest(".stat").querySelector("span").textContent = `${profile.metric_name} · apenas pré-filtro`;
  document.querySelector("#ibge-code").textContent = profile.ibge_code;
  document.querySelector("#recommended-scope").textContent = profile.recommended_scope;
  document.querySelector("#triage-reading").textContent = profile.triage === "gap" ? `A cidade ${triageReading.gap}` : triageReading[profile.triage];
  const sourceSummary = document.querySelector("#source-count").closest("p");
  sourceSummary.textContent = `${profile.sources.length} ${profile.sources.length === 1 ? "evidência municipal catalogada" : "evidências municipais catalogadas"} nesta página.`;
  document.querySelector("#strengths").innerHTML = profile.strengths.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#risks").innerHTML = profile.risks.map(item => `<li>${escapeHtml(item)}</li>`).join("");
  document.querySelector("#next").innerHTML = profile.next.map(item => `<li>${escapeHtml(item)}</li>`).join("");

  document.querySelector("#sources").innerHTML = profile.sources.map(item => `<article class="source"><div><div class="tags"><span class="tag domain">Evidência municipal</span><span class="tag">${escapeHtml(item.access)}</span></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.note)}</p></div><dl class="meta"><div><dt>Produtor</dt><dd>${escapeHtml(item.producer)}</dd></div><div><dt>Acesso</dt><dd>${escapeHtml(item.access)}</dd></div></dl><dl class="meta"><div><dt>Território</dt><dd>${escapeHtml(item.territory)}</dd></div><div><dt>Verificação</dt><dd>triagem de 02/08/2026</dd></div></dl><div><span class="status ${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><br><a class="open" href="${escapeHtml(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer">Abrir evidência ↗</a></div></article>`).join("");

  document.querySelector("#peer-nav").innerHTML = peers.map(item => `<a href="${escapeHtml(safeSlug(item.slug))}.html"${item.slug === slug ? ' aria-current="page"' : ""}>${escapeHtml(item.city.replace(/\/.*/,""))}</a>`).join("");
  document.querySelector("#other-band").textContent = `Voltar ao ranking e ver a faixa de ${otherBand}`;

  const archivedNote = document.querySelector("#archived-note");
  if (archivedNote) {
    if (!profile.current) {
      archivedNote.hidden = false;
      archivedNote.querySelector("span").textContent = `Esta cidade não está mais no Top 10 atual (métrica hoje: IPS Brasil 2026). Ela liderou o pré-filtro por ${profile.metric_name} numa rodada anterior, arquivada em docs/CIDADES_PEQUENAS.md.`;
    } else if (profile.previous_metric) {
      archivedNote.hidden = false;
      archivedNote.classList.add("also-idhm");
      archivedNote.querySelector("span").textContent = `Também era Top 10 por ${profile.previous_metric.name} (posição #${profile.previous_metric.rank}, valor ${profile.previous_metric.value_label}) na rodada anterior deste pré-filtro.`;
    }
  }
}).catch(() => {
  document.querySelector("#city-summary").textContent = "Não foi possível carregar este dossiê. Abra a página por um servidor HTTP ou consulte o JSON do projeto.";
  document.querySelector("#sources").innerHTML = '<div class="empty">Dados indisponíveis nesta visualização. <a href="../perfis_cidades_pequenas.json">Abrir perfis em JSON</a>.</div>';
});
