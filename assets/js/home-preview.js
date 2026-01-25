// Homepage preview: uses Jekyll-generated JSON in window.PROMPTS from builder page? We'll embed a small sample in template.
(function(){
  // On homepage, we don't have window.PROMPTS. We'll use DOM picks and set preview placeholder.
  const preview = document.querySelector("#previewBox");
  const toast = document.querySelector("#toast");
  const copy = document.querySelector("#copyPreview");
  const modeBtns = document.querySelectorAll(".seg__btn");
  if(!preview) return;

  let mode = "beginner";
  const beginner = "Rewrite this to sound professional, clear, and confident.\nKeep the meaning the same.\n\nText:\n[paste here]";
  const power = "<task>Rewrite the text for a professional context.</task>\n<context>Audience: coworkers or clients.</context>\n<constraints>\n- Keep original meaning\n- Make it concise\n- Remove emotional language\n- Avoid clichés\n</constraints>\n<output_format>\n1) Revised version\n2) 3 variants (short / neutral / warm)\n</output_format>\n<input>[paste here]</input>";

  function render(){
    preview.textContent = mode === "power" ? power : beginner;
  }

  function showToast(){
    toast.style.display = "block";
    setTimeout(()=> toast.style.display = "none", 1100);
  }

  modeBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      modeBtns.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      mode = btn.dataset.mode;
      render();
    });
  });

  copy.addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(preview.textContent);
      showToast();
    }catch(e){
      const ta = document.createElement("textarea");
      ta.value = preview.textContent;
      document.body.appendChild(ta);
      ta.select(); document.execCommand("copy");
      document.body.removeChild(ta);
      showToast();
    }
  });

  render();
})();