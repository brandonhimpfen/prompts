(function(){
  const prompts = window.PROMPTS || [];
  const cats = [
    { key: "writing", title: "Writing & Communication", desc: "Rewrite, summarize, reply, clarify." },
    { key: "career", title: "Work & Career", desc: "Resume, cover letters, meetings." },
    { key: "study", title: "Learning & Studying", desc: "Flashcards, quizzes, plans." },
    { key: "life", title: "Life Admin & Decisions", desc: "Checklists, choices, routines." },
    { key: "travel", title: "Travel & Planning", desc: "Itineraries, packing, budgets." },
    { key: "food", title: "Food & Fitness", desc: "Meals, habits, routines." },
    { key: "tech", title: "Tech Help", desc: "Troubleshooting, guides, SOPs." },
    { key: "creator", title: "Creator / Content", desc: "Outlines, posts, planning." }
  ];

  const grid = document.querySelector("#categoriesGrid");
  const search = document.querySelector("#categoriesSearch");
  const clear = document.querySelector("#clearCategoriesSearch");
  const stats = document.querySelector("#categoryStats");

  function countFor(catKey){
    return prompts.filter(p => p.category === catKey).length;
  }

  function renderStats(){
    const total = prompts.length;
    const catCount = cats.length;
    const tagCount = new Set(prompts.flatMap(p => p.tags || [])).size;
    stats.innerHTML = `
      <div class="stat"><div class="stat__k">Categories</div><div class="stat__v">${catCount}</div></div>
      <div class="stat"><div class="stat__k">Templates</div><div class="stat__v">${total}</div></div>
      <div class="stat"><div class="stat__k">Tags</div><div class="stat__v">${tagCount}</div></div>
    `;
  }

  function matches(cat, term){
    if(!term) return true;
    const t = term.toLowerCase();
    const promptHits = prompts.some(p => p.category === cat.key && (p.title + " " + (p.description||"") + " " + (p.tags||[]).join(" ")).toLowerCase().includes(t));
    const catHits = (cat.title + " " + cat.desc).toLowerCase().includes(t);
    return catHits || promptHits;
  }

  function render(){
    const term = (search?.value || "").trim();
    clear.style.display = term ? "inline-grid" : "none";

    const items = cats.filter(c => matches(c, term));
    grid.innerHTML = items.map(c => {
      const n = countFor(c.key);
      return `
        <a class="cat" href="./category.html?cat=${encodeURIComponent(c.key)}">
          <div class="cat__title">${c.title}</div>
          <div class="cat__desc">${c.desc}</div>
          <div class="hint muted" style="margin-top:10px">${n} template${n===1?"":"s"}</div>
        </a>
      `;
    }).join("");
  }

  if(search){
    search.addEventListener("input", render);
  }
  if(clear && search){
    clear.addEventListener("click", ()=>{
      search.value = "";
      clear.style.display = "none";
      render();
      search.focus();
    });
  }

  renderStats();
  render();
})();