const browserLang = (
  navigator.language ||
  navigator.userLanguage ||
  "en"
).toLowerCase();
let lang = browserLang.startsWith("hu") ? "hu" : "en";
let history = [];
let currentNode = "start";
const steps = [
  "start",
  "political_check",
  "sourced",
  "personal_attack",
  "attack_check",
  "emotional_state",
  "anger_check",
  "constructive",
  "final_check",
];

function getProgress(nodeId) {
  const idx = steps.indexOf(nodeId);
  return idx === -1 ? 100 : Math.round((idx / (steps.length - 1)) * 100);
}

function setLang(l) {
  lang = l;
  document.getElementById("btn-en").classList.toggle("active", l === "en");
  document.getElementById("btn-hu").classList.toggle("active", l === "hu");
  const t = ui[l];
  document.getElementById("hdr-title").innerHTML = t.title;
  document.getElementById("hdr-sub").textContent = t.sub;
  document.getElementById("footer-text").textContent = t.footer;
  render(currentNode);
}

function render(nodeId) {
  currentNode = nodeId;
  const node = trees[lang][nodeId];
  const container = document.getElementById("card-container");
  const progressEl = document.getElementById("progress");
  const t = ui[lang];

  if (node.outcome) {
    progressEl.style.width = "100%";
    const stampText =
      node.type === "submit"
        ? t.stampSubmit
        : node.type === "pause"
          ? t.stampPause
          : t.stampCancel;
    container.innerHTML = `<div class="card outcome"><div class="stamp ${node.type}">${stampText}</div><div class="outcome-title">${node.title}</div><p class="outcome-body">${node.body}</p><button class="restart-btn" onclick="restart()">${t.restart}</button></div>`;
    return;
  }

  progressEl.style.width = getProgress(nodeId) + "%";
  const tripleClass =
    node.choices.length === 3
      ? "triple"
      : node.choices.length === 1
        ? "single"
        : "";
  const choiceButtons = node.choices
    .map(
      (c) =>
        `<button class="btn-${c.style}" onclick="go('${c.next}','${nodeId}')">${c.label}</button>`,
    )
    .join("");
  const backBtn =
    history.length > 0
      ? `<button class="back-link" onclick="goBack()">${t.back}</button>`
      : "";

  container.innerHTML = `<div class="card"><div class="step-label">${node.step}</div><div class="question">${node.question}</div><p class="hint">${node.hint}</p><div class="choices ${tripleClass}">${choiceButtons}</div>${backBtn}</div>`;
}

function go(nodeId, fromId) {
  history.push(fromId);
  render(nodeId);
}
function goBack() {
  const prev = history.pop();
  if (prev) render(prev);
}
function restart() {
  history = [];
  render("start");
}

setLang(lang);
