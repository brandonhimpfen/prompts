// Home page (v2): global search, preview panel, mode toggle, copy + render featured cards.
(function(){
  const prompts = window.PROMPTS || [];
  const globalSearch = document.querySelector("#globalSearch");
  const clear = document.querySelector("#clearGlobalSearch");
  const preview = document.querySelector("#previewBox");
  const copy = document.querySelector("#copyPreview");
  const toast = document.querySelector("#toast");
  const modeBtns = document.querySelectorAll(".seg__btn");
  const picks = document.querySelectorAll(".js-pick");
  const featured = document.querySelector("#featuredCards");

  let mode = "beginner";
  let currentKey = prompts[0]?.key || null;

  function getPrompt(key){
    return prompts.find(p => p.key === key) || prompts[0];
  }

  function renderPreview(key){
    const p = getPrompt(key);
    currentKey = p.key;
    if(preview) preview.textContent = mode === "power" ? p.power : p.beginner;
  }

  function showToast(){
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1100);
  }

  function score(p, term){
    const hay = (p.title + " " + p.description + " " + (p.tags||[]).join(" ")).toLowerCase();
    let s = 0;
    for(const w of term.split(/\s+/)){
      if(!w) continue;
      if(hay.includes(w)) s += 2;
      if(p.title.toLowerCase().includes(w)) s += 2;
    }
    return s;
  }

  function bestMatch(term){
    term = (term||"").trim().toLowerCase();
    if(!term) return prompts[0];
    let best = prompts[0], bestScore = -1;
    for(const p of prompts){
      const sc = score(p, term);
      if(sc > bestScore){ bestScore = sc; best = p; }
    }
    return best;
  }

  // featured cards
  if(featured){
    const top = prompts.slice(0, 6);
    featured.innerHTML = top.map(p => `
      <article class="card">
        <div class="card__title">${p.title}</div>
        <div class="card__sub">${p.description}</div>
        <div class="card__foot">
          <span class="pill">${(p.tags && p.tags[0]) ? p.tags[0] : "Prompt"}</span>
          <a class="link" href="./prompt.html?id=${p.key}">Open →</a>
        </div>
      </article>
    `).join("");
  }

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      modeBtns.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mode = btn.dataset.mode;
      renderPreview(currentKey);
    });
  });

  picks.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      renderPreview(btn.dataset.prompt);
    });
  });

  if(globalSearch){
    globalSearch.addEventListener("input", ()=>{
      const v = globalSearch.value;
      clear.style.display = v ? "inline-grid" : "none";
      renderPreview(bestMatch(v).key);
    });
  }

  if(clear && globalSearch){
    clear.addEventListener("click", ()=>{
      globalSearch.value = "";
      clear.style.display = "none";
      renderPreview(prompts[0]?.key);
      globalSearch.focus();
    });
  }

  if(copy){
    copy.addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(preview.textContent);
        showToast();
      }catch(e){
        const ta = document.createElement("textarea");
        ta.value = preview.textContent;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        showToast();
      }
    });
  }

  renderPreview(currentKey);
})();
