// prompt.js: render template page with mode toggle and examples.
(function(){
  const cats = window.CATEGORIES || [];
  const prompts = window.PROMPTS || [];

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || prompts[0]?.key;

  const p = prompts.find(x => x.key === id) || prompts[0];
  const cat = cats.find(c => c.key === p.category);

  const promptTitle = document.querySelector("#promptTitle");
  const promptDesc = document.querySelector("#promptDesc");
  const crumbPrompt = document.querySelector("#crumbPrompt");
  const crumbCatLink = document.querySelector("#crumbCatLink");
  const openCatBtn = document.querySelector("#openCatBtn");
  const openBuilderBtn = document.querySelector("#openBuilderBtn");

  const pills = document.querySelector("#promptPills");
  const promptCode = document.querySelector("#promptCode");

  const promptCat = document.querySelector("#promptCat");
  const promptDifficulty = document.querySelector("#promptDifficulty");
  const promptOutput = document.querySelector("#promptOutput");

  const exInput = document.querySelector("#exInput");
  const exOutput = document.querySelector("#exOutput");

  const modeBtns = document.querySelectorAll(".template .seg__btn");

  const copyPromptBtn = document.querySelector("#copyPromptBtn");
  const copyLinkBtn = document.querySelector("#copyLinkBtn");
  const toast = document.querySelector("#promptToast");

  const search = document.querySelector("#promptSearch");
  const clear = document.querySelector("#clearPromptSearch");

  let mode = "beginner";

  function showToast(txt){
    toast.textContent = txt || "Copied";
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1200);
  }

  function render(){
    if(promptTitle) promptTitle.textContent = p.title;
    if(promptDesc) promptDesc.textContent = p.description;
    if(crumbPrompt) crumbPrompt.textContent = p.title;

    const catName = cat ? cat.name : "Category";
    if(crumbCatLink){
      crumbCatLink.textContent = catName;
      crumbCatLink.href = `./category.html?cat=${p.category}`;
    }
    if(openCatBtn) openCatBtn.href = `./category.html?cat=${p.category}`;
    if(openBuilderBtn) openBuilderBtn.href = `./builder.html?prompt=${p.key}&cat=${p.category}`;

    if(promptCat) promptCat.textContent = catName;
    if(promptDifficulty) promptDifficulty.textContent = p.difficulty || "—";
    if(promptOutput) promptOutput.textContent = p.output || "—";

    if(pills){
      const list = []
        .concat([catName])
        .concat(p.tags || [])
        .slice(0, 6);
      pills.innerHTML = list.map(x => `<span class="pill">${x}</span>`).join("");
    }

    promptCode.textContent = mode === "power" ? p.power : p.beginner;

    if(exInput) exInput.textContent = p.examples?.input || "—";
    if(exOutput) exOutput.textContent = p.examples?.output || "—";
  }

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      modeBtns.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mode = btn.dataset.mode;
      render();
    });
  });

  if(copyPromptBtn){
    copyPromptBtn.addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(promptCode.textContent);
        showToast("Template copied");
      }catch(e){
        showToast("Copy failed");
      }
    });
  }

  if(copyLinkBtn){
    copyLinkBtn.addEventListener("click", async ()=>{
      try{
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied");
      }catch(e){
        showToast("Copy failed");
      }
    });
  }

  function bestMatch(term){
    term = (term||"").trim().toLowerCase();
    if(!term) return null;
    let best = null, bestScore = -1;
    for(const pp of prompts){
      const hay = (pp.title + " " + pp.description + " " + (pp.tags||[]).join(" ")).toLowerCase();
      let score = 0;
      term.split(/\s+/).forEach(w => { if(w && hay.includes(w)) score += 2; });
      if(score > bestScore){ bestScore = score; best = pp; }
    }
    return bestScore > 0 ? best : null;
  }

  if(search){
    search.addEventListener("input", ()=>{
      const v = search.value;
      clear.style.display = v ? "inline-grid" : "none";
    });
    search.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        const bp = bestMatch(search.value);
        if(bp) window.location.href = `./prompt.html?id=${bp.key}`;
      }
    });
  }

  if(clear && search){
    clear.addEventListener("click", ()=>{
      search.value = "";
      clear.style.display = "none";
      search.focus();
    });
  }

  render();
})();
