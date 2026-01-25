// categories.js: render categories grid + stats + basic search routing.
(function(){
  const cats = window.CATEGORIES || [];
  const prompts = window.PROMPTS || [];

  const grid = document.querySelector("#catGrid");
  const statsPrompts = document.querySelector("#statsPrompts");
  const statsCats = document.querySelector("#statsCats");

  const search = document.querySelector("#catSearch");
  const clear = document.querySelector("#clearCatSearch");

  if(statsPrompts) statsPrompts.textContent = `${prompts.length} prompts`;
  if(statsCats) statsCats.textContent = `${cats.length} categories`;

  function render(list){
    if(!grid) return;
    grid.innerHTML = list.map(c => {
      const count = prompts.filter(p => p.category === c.key).length;
      return `
        <a class="card" href="./category.html?cat=${c.key}">
          <div class="card__title">${c.name}</div>
          <div class="card__sub">${c.desc}</div>
          <div class="card__foot">
            <span class="pill">${count} prompts</span>
            <span class="link">Browse →</span>
          </div>
        </a>
      `;
    }).join("");
  }

  function bestPrompt(term){
    term = (term||"").trim().toLowerCase();
    if(!term) return null;
    let best = null, bestScore = -1;
    for(const p of prompts){
      const hay = (p.title + " " + p.description + " " + (p.tags||[]).join(" ")).toLowerCase();
      let score = 0;
      term.split(/\s+/).forEach(w => { if(w && hay.includes(w)) score += 2; });
      if(score > bestScore){ bestScore = score; best = p; }
    }
    return bestScore > 0 ? best : null;
  }

  render(cats);

  if(search){
    search.addEventListener("input", ()=>{
      const v = search.value;
      clear.style.display = v ? "inline-grid" : "none";
      const bp = bestPrompt(v);
      if(bp){
        // show a subtle hint by reordering categories with prompt's category first
        const first = cats.find(c => c.key === bp.category);
        const rest = cats.filter(c => c.key !== bp.category);
        render(first ? [first, ...rest] : cats);
      }else{
        render(cats);
      }
    });

    search.addEventListener("keydown", (e)=>{
      if(e.key === "Enter"){
        const bp = bestPrompt(search.value);
        if(bp) window.location.href = `./prompt.html?id=${bp.key}`;
      }
    });
  }

  if(clear && search){
    clear.addEventListener("click", ()=>{
      search.value = "";
      clear.style.display = "none";
      render(cats);
      search.focus();
    });
  }
})();
