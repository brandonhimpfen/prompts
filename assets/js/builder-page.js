// Builder (v2): category filter, template select, mode toggle, insert user details, copy.
(function(){
  const prompts = window.PROMPTS || [];

  const catSelect = document.querySelector("#catSelect");
  const promptSelect = document.querySelector("#promptSelect");
  const hint = document.querySelector("#promptHint");
  const topSearch = document.querySelector("#builderSearchTop");
  const clearTop = document.querySelector("#clearBuilderSearchTop");

  const modeBtns = document.querySelectorAll(".seg__btn");
  const activeModeNote = document.querySelector("#activeModeNote");

  const userInput = document.querySelector("#userInput");
  const built = document.querySelector("#builtPrompt");

  const insertExample = document.querySelector("#insertExample");
  const copy = document.querySelector("#copyBuiltPrompt");
  const randomPick = document.querySelector("#randomPick");
  const toast = document.querySelector("#builderToast");

  let mode = "beginner";
  let activeKey = prompts[0]?.key || null;

  function showToast(){
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1100);
  }

  function getPrompt(key){
    return prompts.find(p => p.key === key) || prompts[0];
  }

  function filterList(){
    const cat = catSelect.value || "all";
    const term = (topSearch?.value || "").trim().toLowerCase();

    return prompts.filter(p=>{
      if(cat !== "all" && p.category !== cat) return false;
      if(!term) return true;
      const hay = (p.title + " " + p.description + " " + (p.tags||[]).join(" ")).toLowerCase();
      return term.split(/\s+/).every(w => !w || hay.includes(w));
    });
  }

  function applyTemplate(tpl, inputText){
    const safe = (inputText||"").trim();
    if(tpl.includes("[paste here]")) return tpl.replace("[paste here]", safe || "[paste here]");
    if(tpl.includes("[paste]")) return tpl.replace("[paste]", safe || "[paste]");
    return tpl + "\n\n<input>\n" + (safe || "[paste here]") + "\n</input>";
  }

  function renderBuilt(){
    if(!activeKey) return;
    const p = getPrompt(activeKey);
    const tpl = mode === "power" ? p.power : p.beginner;
    built.textContent = applyTemplate(tpl, userInput.value);
    hint.textContent = p.description;
    activeModeNote.textContent = mode === "power" ? "Power User format" : "Beginner format";
  }

  function renderOptions(){
    const list = filterList();
    promptSelect.innerHTML = "";
    list.forEach(p=>{
      const opt = document.createElement("option");
      opt.value = p.key;
      opt.textContent = p.title;
      promptSelect.appendChild(opt);
    });
    if(list.length){
      activeKey = list[0].key;
      promptSelect.value = activeKey;
      renderBuilt();
    }else{
      activeKey = null;
      built.textContent = "No prompts match your filters.";
      hint.textContent = "";
    }
  }

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      modeBtns.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mode = btn.dataset.mode;
      renderBuilt();
    });
  });

  catSelect.addEventListener("change", renderOptions);
  promptSelect.addEventListener("change", ()=>{ activeKey = promptSelect.value; renderBuilt(); });
  userInput.addEventListener("input", renderBuilt);

  if(topSearch){
    topSearch.addEventListener("input", ()=>{
      const v = topSearch.value;
      clearTop.style.display = v ? "inline-grid" : "none";
      renderOptions();
    });
  }
  if(clearTop && topSearch){
    clearTop.addEventListener("click", ()=>{
      topSearch.value = "";
      clearTop.style.display = "none";
      renderOptions();
      topSearch.focus();
    });
  }

  insertExample.addEventListener("click", ()=>{
    userInput.value = "Audience: coworker\nTone: calm, professional\nGoal: set expectations and offer next steps\n\nOriginal message:\n[paste here]";
    renderBuilt();
  });

  copy.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(built.textContent);
      showToast();
    }catch(e){
      const ta = document.createElement("textarea");
      ta.value = built.textContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast();
    }
  });

  randomPick.addEventListener("click", ()=>{
    const list = filterList();
    if(!list.length) return;
    const pick = list[Math.floor(Math.random()*list.length)];
    activeKey = pick.key;
    promptSelect.value = activeKey;
    renderBuilt();
  });

  // Query params: ?cat=writing&prompt=rewrite_pro
  const params = new URLSearchParams(window.location.search);
  const qpCat = params.get("cat");
  const qpPrompt = params.get("prompt");

  if(qpCat) catSelect.value = qpCat;

  renderOptions();

  if(qpPrompt){
    const exists = prompts.find(p => p.key === qpPrompt);
    if(exists){
      activeKey = qpPrompt;
      promptSelect.value = activeKey;
      renderBuilt();
    }
  }
})();


// Support ?q=search term (pre-filter options)
(function(){
  try{
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if(q){
      const topSearch = document.querySelector("#builderSearchTop");
      if(topSearch){
        topSearch.value = q;
        const ev = new Event("input");
        topSearch.dispatchEvent(ev);
      }
    }
  }catch(e){}
})();
