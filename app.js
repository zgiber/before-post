// The decision tree per language lives in `trees[lang]` (see content.js).
// `history` records the user's path: history[i] is the node we were at when
// we chose to go to history[i+1] (or currentNode for the last entry).
//
// This file owns state and DOM rendering; it does not own any user-visible
// strings.

let lang = (navigator.language || "en").toLowerCase().startsWith("hu") ? "hu" : "en";
let history = [];
let currentNode = "start";

// --- progress ---

// Min steps to an outcome from any node, per language. Computed once per
// language with BFS. Outcome nodes map to 0.
const minToOutcome = {};

// BFS over the decision tree, treating each non-outcome node as expanding
// to its choices' `next` targets. Outcomes are sinks (0).
function computeMinStepsToOutcome(tree) {
  const dist = {};
  const queue = [];
  for (const [id, node] of Object.entries(tree)) {
    if (node.outcome) {
      dist[id] = 0;
      queue.push(id);
    }
  }
  while (queue.length) {
    const id = queue.shift();
    // Walk edges in reverse: from any node whose choice points here, push
    // dist[id]+1.
    for (const [candId, cand] of Object.entries(tree)) {
      if (dist[candId] !== undefined) continue;
      if (!cand.choices) continue;
      if (cand.choices.some((c) => c.next === id) && dist[id] !== undefined) {
        dist[candId] = dist[id] + 1;
        queue.push(candId);
      }
    }
  }
  return dist;
}

// stepsDone / (stepsDone + min steps from current node to an outcome).
// 0% at start, 100% at any outcome. Monotonic in stepsDone; can plateau
// or briefly tick down if a branch you picked has a longer min-path than
// the one you left.
function getProgress() {
  if (history.length === 0) return 0;
  const node = trees[lang][currentNode];
  if (node && node.outcome) return 100;
  const minFromHere = minToOutcome[lang][currentNode] ?? 0;
  const total = history.length + minFromHere;
  if (total === 0) return 0;
  return Math.round((history.length / total) * 100);
}

// --- DOM construction (no innerHTML, no string interpolation) ---

function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function renderTitle(container) {
  const t = ui[lang].title;
  container.appendChild(document.createTextNode(t.before));
  if (t.accent) {
    const em = document.createElement("em");
    em.textContent = t.accent;
    container.appendChild(em);
  }
  if (t.after) container.appendChild(document.createTextNode(t.after));
}

function renderQuestionCard(container, node) {
  const t = ui[lang];
  const card = el("div", { class: "card" });
  card.appendChild(el("div", { class: "question", text: node.question }));
  card.appendChild(el("p", { class: "hint", text: node.hint }));

  const choices = el("div", {
    class: "choices" + (node.choices.length === 3 ? " triple" : ""),
  });
  for (const c of node.choices) {
    choices.appendChild(
      el("button", {
        class: "btn-" + c.style,
        text: c.label,
        attrs: { "data-action": "go", "data-next": c.next },
      })
    );
  }
  card.appendChild(choices);

  if (history.length > 0) {
    card.appendChild(
      el("button", {
        class: "back-link",
        text: t.back,
        attrs: { "data-action": "back" },
      })
    );
  }
  container.appendChild(card);
}

function renderOutcomeCard(container, node) {
  const t = ui[lang];
  const stampText =
    node.type === "submit" ? t.stampSubmit :
    node.type === "pause" ? t.stampPause :
    t.stampCancel;

  container.appendChild(
    el("div", { class: "card outcome" }, [
      el("div", { class: "stamp " + node.type, text: stampText }),
      el("div", { class: "outcome-title", text: node.title }),
      el("p", { class: "outcome-body", text: node.body }),
      el("button", {
        class: "restart-btn",
        text: t.restart,
        attrs: { "data-action": "restart" },
      }),
    ])
  );
}

function render() {
  const node = trees[lang][currentNode];
  if (!node) {
    console.error("Missing node:", currentNode);
    return;
  }
  const container = document.getElementById("card-container");
  container.replaceChildren();
  if (node.outcome) renderOutcomeCard(container, node);
  else renderQuestionCard(container, node);
  document.getElementById("progress").style.width = getProgress() + "%";
}

function setLang(l) {
  if (!minToOutcome[l]) minToOutcome[l] = computeMinStepsToOutcome(trees[l]);
  lang = l;
  document.getElementById("btn-en").classList.toggle("active", l === "en");
  document.getElementById("btn-hu").classList.toggle("active", l === "hu");
  const t = ui[l];
  const titleEl = document.getElementById("hdr-title");
  titleEl.replaceChildren();
  renderTitle(titleEl);
  document.getElementById("hdr-sub").textContent = t.sub;
  document.getElementById("footer-text").textContent = t.footer;
  // Language change invalidates history (graph shape is per-language).
  history = [];
  currentNode = "start";
  render();
}

function go(nodeId) {
  history.push(currentNode);
  currentNode = nodeId;
  render();
}

function goBack() {
  const prev = history.pop();
  if (prev) {
    currentNode = prev;
    render();
  }
}

function restart() {
  history = [];
  currentNode = "start";
  render();
}

// Delegated handler — no inline onclick, no re-binding on re-render.
function onCardClick(e) {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const action = btn.dataset.action;
  if (action === "go") go(btn.dataset.next);
  else if (action === "back") goBack();
  else if (action === "restart") restart();
}

// --- init ---

setLang(lang);
document.getElementById("card-container").addEventListener("click", onCardClick);
document.getElementById("btn-en").addEventListener("click", () => setLang("en"));
document.getElementById("btn-hu").addEventListener("click", () => setLang("hu"));
