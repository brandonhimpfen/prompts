(function(){
  const pagePrompt = window.PAGE_PROMPT || null;
  const templateBox = document.querySelector('#templateBox');
  const modeButtons = document.querySelectorAll('.seg-btn');
  const copyButton = document.querySelector('#copyTemplate');
  const toast = document.querySelector('#promptToast');

  if(!pagePrompt || !templateBox || !modeButtons.length) return;

  function setMode(next){
    modeButtons.forEach(button => button.classList.toggle('is-active', button.dataset.mode === next));
    templateBox.textContent = next === 'power' ? pagePrompt.power : pagePrompt.beginner;
  }

  async function copyText(text){
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
  }

  function showToast(){
    if(!toast) return;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1100);
  }

  modeButtons.forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.mode || 'beginner'));
  });

  copyButton?.addEventListener('click', async () => {
    await copyText(templateBox.textContent);
    showToast();
  });

  setMode('beginner');
})();
