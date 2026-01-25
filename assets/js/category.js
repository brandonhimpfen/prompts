// category.js: render prompts in a category, mode filter, local search.
(function(){
  const cats = window.CATEGORIES || [];
  const prompts = window.PROMPTS || [];

  const params = new URLSearchParams(window.location.search);
  const catKey = params.get("cat") || "writing";
  const cat = cats.find(c => c.key === catKey) || cats[0];

  const catTitle = document.querySelector("#catTitle");
  const catDesc = document.querySelector("#catDesc");
  const crumbCat = document.querySelector("#crumbCat");
  const count = document.querySelector("#catCount");

  const cards = document.querySelector("#catCards");
  const localSearch = document.querySelector("#localSearch");

  const modeBtns = document.querySelectorAll(".filterBar .seg__btn");
  let mode = "all"; // all / beginner / power

  const list = prompts.filter(p => p.category === catKey);

  if(catTitle) catTitle.textContent = cat?.name || "Category";
  if(catDesc) catDesc.textContent = cat?.desc || "";
  if(crumbCat) crumbCat.textContent = cat?.name || "Category";
  if(count) count.textContent = `${list.length} prompts`;

  function matches(p, term){
    if(!term) return true;
    const hay = (p.title + " " + p.description + " " + (p.tags||[]).join(" ")).toLowerCase();
    return term.split(/\s+/).every(w => !w || hay.includes(w));
  }

  function render(){
    if(!cards) return;
    const term = (localSearch?.value || "").trim().toLowerCase();
    const filtered = list.filter(p => matches(p, term));
    cards.innerHTML = filtered.map(p => `
      <article class="card">
        <div class="card__title">${p.title}</div>
        <div class="card__sub">${p.description}</div>
        <div class="pills" style="margin-top:10px">
          ${(p.tags||[]).slice(0,3).map(t => `<span class="pill">${t}</span>`).join("")}
        </div>
        <div class="card__foot">
          <span class="pill">${p.difficulty || "Template"}</span>
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

      // For now: "Beginner/Power" doesn't remove prompts (since prompts have both),
      // but could be expanded later for prompts that are power-only.
      render();
    });
  });

  if(localSearch){
    localSearch.addEventListener("input", render);
  }

  render();
})();
