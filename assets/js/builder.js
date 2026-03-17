(function(){
  const prompts = window.PROMPTS || [];
  const catSelect = document.querySelector('#catSelect');
  const promptSelect = document.querySelector('#promptSelect');
  const promptHint = document.querySelector('#promptHint');
  const userInput = document.querySelector('#userInput');
  const builtPrompt = document.querySelector('#builtPrompt');
  const modeButtons = document.querySelectorAll('.seg-btn');
  const activeModeNote = document.querySelector('#activeModeNote');
  const insertExample = document.querySelector('#insertExample');
  const copyButton = document.querySelector('#copyBuiltPrompt');
  const randomButton = document.querySelector('#randomPick');
  const toast = document.querySelector('#builderToast');

  let mode = 'beginner';
  let activeKey = prompts[0]?.key || null;

  const categoryAliases = { career: 'work' };

  function normalizeCategory(value){
    return categoryAliases[value] || value;
  }

  function filterPrompts(){
    const selected = normalizeCategory(catSelect?.value || 'all');
    return prompts.filter(prompt => selected === 'all' || normalizeCategory(prompt.category) === selected);
  }

  function getPrompt(key){
    return prompts.find(prompt => prompt.key === key) || null;
  }

  function applyTemplate(template, details){
    const value = (details || '').trim();
    if(template.includes('[paste here]')) return template.replace('[paste here]', value || '[paste here]');
    if(template.includes('[paste]')) return template.replace('[paste]', value || '[paste]');
    return `${template}\n\n<input>\n${value || '[paste here]'}\n</input>`;
  }

  function showToast(){
    if(!toast) return;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 1100);
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

  function renderBuilt(){
    const prompt = getPrompt(activeKey);
    if(!prompt || !builtPrompt) return;
    const template = mode === 'power' ? prompt.power : prompt.beginner;
    builtPrompt.textContent = applyTemplate(template, userInput?.value || '');
    if(promptHint) promptHint.textContent = prompt.description || '';
    if(activeModeNote) activeModeNote.textContent = mode === 'power' ? 'Power User format' : 'Beginner format';
  }

  function renderOptions(){
    const list = filterPrompts();
    if(!promptSelect) return;
    promptSelect.innerHTML = list.map(prompt => `<option value="${prompt.key}">${prompt.title}</option>`).join('');
    if(list.length){
      activeKey = list.some(prompt => prompt.key === activeKey) ? activeKey : list[0].key;
      promptSelect.value = activeKey;
      renderBuilt();
    } else {
      activeKey = null;
      builtPrompt.textContent = 'No prompts match this category.';
      if(promptHint) promptHint.textContent = '';
    }
  }

  modeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modeButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      mode = button.dataset.mode || 'beginner';
      renderBuilt();
    });
  });

  catSelect?.addEventListener('change', renderOptions);
  promptSelect?.addEventListener('change', () => {
    activeKey = promptSelect.value;
    renderBuilt();
  });
  userInput?.addEventListener('input', renderBuilt);

  insertExample?.addEventListener('click', () => {
    userInput.value = 'Audience: coworker\nGoal: clear update and next steps\nTone: calm, professional, direct\nConstraints: concise and practical\n\nSource material:\n[paste here]';
    renderBuilt();
  });

  copyButton?.addEventListener('click', async () => {
    await copyText(builtPrompt.textContent);
    showToast();
  });

  randomButton?.addEventListener('click', () => {
    const list = filterPrompts();
    if(!list.length) return;
    const item = list[Math.floor(Math.random() * list.length)];
    activeKey = item.key;
    promptSelect.value = activeKey;
    renderBuilt();
  });

  const params = new URLSearchParams(window.location.search);
  const requestedCategory = normalizeCategory(params.get('cat') || '');
  const requestedPrompt = params.get('prompt');

  if(requestedCategory && catSelect){
    catSelect.value = requestedCategory;
  }

  renderOptions();

  if(requestedPrompt){
    const exists = prompts.find(prompt => prompt.key === requestedPrompt);
    if(exists && promptSelect){
      activeKey = requestedPrompt;
      promptSelect.value = requestedPrompt;
      renderBuilt();
    }
  }
})();
