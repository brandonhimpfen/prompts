// Global search: if user presses Enter, route to builder with query
(function(){
  const input = document.querySelector("#globalSearch");
  const clear = document.querySelector("#clearGlobalSearch");
  if(!input) return;

  input.addEventListener("input", ()=>{
    clear.style.display = input.value ? "inline-grid" : "none";
  });
  clear.addEventListener("click", ()=>{
    input.value = "";
    clear.style.display = "none";
    input.focus();
  });

  input.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
      const q = encodeURIComponent(input.value.trim());
      if(q) window.location.href = (window.location.origin + window.location.pathname).replace(/\/$/, "") + "/builder/?q=" + q;
      else window.location.href = (window.location.origin + window.location.pathname).replace(/\/$/, "") + "/builder/";
    }
  });
})();