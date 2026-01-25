(function(){
  // Supports two modes:
  // 1) Per-page mode: window.PAGE_PROMPT = { beginner, power }
  // 2) Query mode (legacy): ?prompt=<key> loads from window.PROMPTS

  const pagePrompt = window.PAGE_PROMPT || null;
  const prompts = window.PROMPTS || [];
  const params = new URLSearchParams(window.location.search);
  const key = params.get("prompt");

  let beginner = pagePrompt?.beginner || "";
  let power = pagePrompt?.power || "";

  if (!pagePrompt && key && prompts.length) {
    const p = prompts.find(x => x.key === key || x.slug === key);
    if (p) { beginner = p.beginner || ""; power = p.power || ""; }
  }

  const templateBox = document.querySelector("#templateBox");
  const modeBtns = document.querySelectorAll(".seg__btn");
  const copyBtn = document.querySelector("#copyTemplate");
  const toast = document.querySelector("#promptToast");

  if (!templateBox || !modeBtns.length) return;

  function setMode(next){
    modeBtns.forEach(b => b.classList.toggle("is-active", b.dataset.mode === next));
    templateBox.textContent = next === "power" ? power : beginner;
  }

  async function copyText(txt){
    try { await navigator.clipboard.writeText(txt); }
    catch(e){
      const ta = document.createElement("textarea");
      ta.value = txt; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); document.body.removeChild(ta);
    }
  }
  function showToast(){
    if (!toast) return;
    toast.style.display="block";
    setTimeout(()=>toast.style.display="none", 1100);
  }

  modeBtns.forEach(btn => btn.addEventListener("click", ()=> setMode(btn.dataset.mode)));
  if (copyBtn) {
    copyBtn.addEventListener("click", async ()=>{
      await copyText(templateBox.textContent);
      showToast();
    });
  }

  document.querySelectorAll(".js-copy-variant").forEach(btn=>{
    btn.addEventListener("click", async ()=>{
      await copyText(btn.getAttribute("data-text") || "");
      showToast();
    });
  });

  setMode("beginner");
})();