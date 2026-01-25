// Home page: global search clear button, preview panel, mode toggle, copy.
(function(){
  const prompts = window.PROMPTS || [];
  const globalSearch = document.querySelector("#globalSearch");
  const clear = document.querySelector("#clearGlobalSearch");
  const preview = document.querySelector("#previewBox");
  const copy = document.querySelector("#copyPreview");
  const toast = document.querySelector("#toast");
  const modeBtns = document.querySelectorAll(".seg__btn");
  const picks = document.querySelectorAll(".js-pick");

  let mode = "beginner";
  let currentKey = prompts[0]?.key || null;

  function getPrompt(key){
    return prompts.find(p => p.key === key) || prompts[0];
  }

  function render(key){
    const p = getPrompt(key);
    currentKey = p.key;
    preview.textContent = mode === "power" ? p.power : p.beginner;
  }

  function showToast(){
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1100);
  }

  function score(p, term){
    const hay = (p.title + " " + p.description + " " + p.tags.join(" ")).toLowerCase();
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

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      modeBtns.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mode = btn.dataset.mode;
      render(currentKey);
    });
  });

  picks.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      render(btn.dataset.prompt);
    });
  });

  if(globalSearch){
    globalSearch.addEventListener("input", ()=>{
      const v = globalSearch.value;
      clear.style.display = v ? "inline-grid" : "none";
      render(bestMatch(v).key);
    });
  }

  if(clear && globalSearch){
    clear.addEventListener("click", ()=>{
      globalSearch.value = "";
      clear.style.display = "none";
      render(prompts[0]?.key);
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

  render(currentKey);
})();
