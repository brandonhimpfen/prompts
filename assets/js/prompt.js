(function(){
  const prompts = window.PROMPTS || [];
  const cats = {
    writing: "Writing & Communication",
    career: "Work & Career",
    study: "Learning & Studying",
    life: "Life Admin & Decisions",
    travel: "Travel & Planning",
    food: "Food & Fitness",
    tech: "Tech Help",
    creator: "Creator / Content"
  };

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || prompts[0]?.key;

  const p = prompts.find(x => x.key === id) || prompts[0];

  const crumbs = document.querySelector("#promptCrumbs");
  const title = document.querySelector("#promptTitle");
  const sub = document.querySelector("#promptSub");
  const chips = document.querySelector("#metaChips");
  const templateBox = document.querySelector("#templateBox");
  const modeBtns = document.querySelectorAll(".seg__btn");
  const copyBtn = document.querySelector("#copyTemplate");
  const toast = document.querySelector("#promptToast");
  const openInBuilder = document.querySelector("#openInBuilder");

  const whatFor = document.querySelector("#whatFor");
  const worksBest = document.querySelector("#worksBest");
  const mistakes = document.querySelector("#mistakes");

  const exInput = document.querySelector("#exInput");
  const exOutput = document.querySelector("#exOutput");
  const variantsEl = document.querySelector("#variants");

  const searchTop = document.querySelector("#promptSearchTop");
  const clearTop = document.querySelector("#clearPromptSearchTop");

  let mode = "beginner";

  function showToast(){
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1100);
  }

  function setMode(next){
    mode = next;
    modeBtns.forEach(b => b.classList.toggle("is-active", b.dataset.mode === mode));
    templateBox.textContent = mode === "power" ? p.power : p.beginner;
  }

  function render(){
    const catName = cats[p.category] || "Category";
    crumbs.innerHTML = `<a href="./index.html">Home</a> <span class="sep">/</span> <a href="./categories.html">Categories</a> <span class="sep">/</span> <a href="./category.html?cat=${encodeURIComponent(p.category)}">${catName}</a> <span class="sep">/</span> ${p.title}`;
    title.textContent = p.title;
    sub.textContent = p.description || "";
    document.title = `${p.title} — prompts by Brandon Himpfen`;

    const meta = [
      catName,
      p.output_type || "Template",
      p.difficulty || "Beginner + Power",
      ...(p.tags||[]).slice(0,3)
    ];
    chips.innerHTML = meta.map(m => `<span class="metaChip">${m}</span>`).join("");

    setMode("beginner");
    openInBuilder.href = `./builder.html?prompt=${encodeURIComponent(p.key)}`;

    // Lightweight guidance (generic, can be per-prompt later)
    whatFor.textContent = `Use this when you need “${p.output_type || "a clearer result"}” quickly without rewriting from scratch.`;
    worksBest.textContent = "Audience, goal, constraints, and the exact output format you want back.";
    mistakes.textContent = "Vague instructions, missing context, or not specifying the format of the answer.";

    // Examples (simple placeholders based on category)
    const inputExample = {
      writing: "Original:
Hey, just checking in again about the thing. Let me know.

Goal: professional and clear.",
      study: "Text:
[Paste your notes]

Goal: summary + quiz to test understanding.",
      life: "Option A: …
Option B: …

Constraints: budget, time, tradeoffs.",
      travel: "Destination: Lisbon
Days: 4
Style: slow
Interests: food, walking, museums",
      default: "Context:
[Paste details]

Goal:
[What you want back]"
    }[p.category] || inputExample?.default;

    exInput.textContent = inputExample;
    exOutput.textContent = "Example output appears here.
(You can replace this with real examples later.)";

    // Variants (simple)
    const variants = [
      { title: "Short version", text: (p.beginner || "").replace(/\s+/g, " ").slice(0, 220) + "…" },
      { title: "Warmer tone", text: (p.beginner || "") + "\n\nTone: warm, human, and respectful." },
      { title: "More direct", text: (p.beginner || "") + "\n\nTone: direct and concise. Avoid hedging." }
    ];
    variantsEl.innerHTML = variants.map((v, i)=>`
      <div class="variant">
        <div class="variant__top">
          <div class="variant__title">${v.title}</div>
          <button class="btn btn--ghost btn--sm js-copy-variant" data-i="${i}">Copy</button>
        </div>
        <pre class="code">${escapeHtml(v.text)}</pre>
      </div>
    `).join("");

    variantsEl.addEventListener("click", async (e)=>{
      const btn = e.target.closest(".js-copy-variant");
      if(!btn) return;
      const i = parseInt(btn.dataset.i, 10);
      const txt = variants[i]?.text || "";
      await copyText(txt);
      showToast();
    }, { once: true });
  }

  function escapeHtml(str){
    return (str||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  }

  async function copyText(txt){
    try{
      await navigator.clipboard.writeText(txt);
    }catch(e){
      const ta = document.createElement("textarea");
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=> setMode(btn.dataset.mode));
  });

  copyBtn.addEventListener("click", async ()=>{
    await copyText(templateBox.textContent);
    showToast();
  });

  // Top search: jump to best match prompt page
  function bestMatch(term){
    term = (term||"").trim().toLowerCase();
    if(!term) return prompts[0];
    let best = prompts[0], bestScore = -1;
    for(const pr of prompts){
      const hay = (pr.title + " " + (pr.description||"") + " " + (pr.tags||[]).join(" ")).toLowerCase();
      let s = 0;
      for(const w of term.split(/\s+/)){
        if(!w) continue;
        if(hay.includes(w)) s += 2;
        if(pr.title.toLowerCase().includes(w)) s += 2;
      }
      if(s > bestScore){ bestScore = s; best = pr; }
    }
    return best;
  }

  if(searchTop){
    searchTop.addEventListener("input", ()=>{
      const v = searchTop.value;
      clearTop.style.display = v ? "inline-grid" : "none";
    });
    searchTop.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        const m = bestMatch(searchTop.value);
        window.location.href = `./prompt.html?id=${encodeURIComponent(m.key)}`;
      }
    });
  }
  if(clearTop && searchTop){
    clearTop.addEventListener("click", ()=>{
      searchTop.value = "";
      clearTop.style.display = "none";
      searchTop.focus();
    });
  }

  render();
})();