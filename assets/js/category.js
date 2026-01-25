(function(){
  const prompts = window.PROMPTS || [];

  const cats = {
    writing: { title: "Writing & Communication", desc: "Rewrite, summarize, reply, clarify." , featured:["rewrite_pro","shorten","firm_reply"]},
    career:  { title: "Work & Career", desc: "Resume, cover letters, meetings.", featured:[]},
    study:   { title: "Learning & Studying", desc: "Flashcards, quizzes, plans.", featured:["summarize_quiz"]},
    life:    { title: "Life Admin & Decisions", desc: "Checklists, choices, routines.", featured:["decision"]},
    travel:  { title: "Travel & Planning", desc: "Itineraries, packing, budgets.", featured:["itinerary"]},
    food:    { title: "Food & Fitness", desc: "Meals, habits, routines.", featured:[]},
    tech:    { title: "Tech Help", desc: "Troubleshooting, guides, SOPs.", featured:[]},
    creator: { title: "Creator / Content", desc: "Outlines, posts, planning.", featured:[]}
  };

  const params = new URLSearchParams(window.location.search);
  const catKey = params.get("cat") || "writing";
  const cat = cats[catKey] || cats.writing;

  const crumbs = document.querySelector("#crumbs");
  const title = document.querySelector("#catTitle");
  const desc = document.querySelector("#catDesc");
  const featuredEl = document.querySelector("#featuredCards");
  const allEl = document.querySelector("#allCards");
  const sort = document.querySelector("#sortSelect");
  const tagChips = document.querySelector("#tagChips");
  const search = document.querySelector("#categorySearch");
  const clear = document.querySelector("#clearCategorySearch");
  const openBuilderLink = document.querySelector("#openBuilderLink");

  openBuilderLink.href = `./builder.html?cat=${encodeURIComponent(catKey)}`;

  crumbs.innerHTML = `<a href="./index.html">Home</a> <span class="sep">/</span> <a href="./categories.html">Categories</a> <span class="sep">/</span> ${cat.title}`;
  title.textContent = cat.title;
  desc.textContent = cat.desc;
  document.title = `${cat.title} — prompts by Brandon Himpfen`;

  let activeTag = "all";

  function inCategory(){
    return prompts.filter(p => p.category === catKey);
  }

  function tagsForCat(list){
    const s = new Set();
    list.forEach(p => (p.tags||[]).forEach(t => s.add(t)));
    return ["all", ...Array.from(s).sort((a,b)=>a.localeCompare(b))];
  }

  function card(p){
    const tags = (p.tags||[]).slice(0,3).map(t => `<span class="pill">${t}</span>`).join(" ");
    return `
      <article class="card">
        <div class="card__top">
          <div class="card__title">${p.title}</div>
          <div class="card__sub">${p.description||""}</div>
        </div>
        <div class="card__foot">
          <span class="pill">${p.output_type || "Template"}</span>
          <a class="link" href="./prompt.html?id=${encodeURIComponent(p.key)}">Open →</a>
        </div>
      </article>
    `;
  }

  function applyFilters(list){
    const term = (search?.value || "").trim().toLowerCase();
    let out = list;

    if(activeTag !== "all"){
      out = out.filter(p => (p.tags||[]).includes(activeTag));
    }

    if(term){
      out = out.filter(p => (p.title + " " + (p.description||"") + " " + (p.tags||[]).join(" ")).toLowerCase().includes(term));
    }

    if(sort.value === "title"){
      out = [...out].sort((a,b)=>a.title.localeCompare(b.title));
    }else{
      // recommended: featured first, then rest
      const featuredSet = new Set(cat.featured || []);
      out = [...out].sort((a,b)=>{
        const af = featuredSet.has(a.key) ? 0 : 1;
        const bf = featuredSet.has(b.key) ? 0 : 1;
        if(af !== bf) return af - bf;
        return a.title.localeCompare(b.title);
      });
    }
    return out;
  }

  function render(){
    const list = inCategory();
    const tags = tagsForCat(list);

    // chips
    tagChips.innerHTML = tags.map(t => {
      const active = t === activeTag ? "is-active" : "";
      const label = t === "all" ? "All" : t;
      return `<button class="chip ${active}" data-tag="${t}">${label}</button>`;
    }).join("");

    // featured
    const featured = list.filter(p => (cat.featured||[]).includes(p.key));
    featuredEl.innerHTML = featured.length ? featured.map(card).join("") : `<div class="muted">No featured templates yet for this category.</div>`;

    // all
    const all = applyFilters(list);
    allEl.innerHTML = all.length ? all.map(card).join("") : `<div class="muted">No templates match your filters.</div>`;

    // search clear
    const term = (search?.value||"").trim();
    clear.style.display = term ? "inline-grid" : "none";
  }

  tagChips.addEventListener("click", (e)=>{
    const btn = e.target.closest(".chip");
    if(!btn) return;
    activeTag = btn.dataset.tag || "all";
    render();
  });

  sort.addEventListener("change", render);
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

  render();
})();