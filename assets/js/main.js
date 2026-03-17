(function(){
  const prompts = window.PROMPTS || [];
  const searchInput = document.querySelector('#globalSearch');
  const searchForm = document.querySelector('#globalSearchForm');
  const clearBtn = document.querySelector('#clearGlobalSearch');
  const resultsBox = document.querySelector('#globalSearchResults');
  const preview = document.querySelector('#previewBox');
  const copyBtn = document.querySelector('#copyPreview');
  const openBtn = document.querySelector('#openPreviewPrompt');
  const toast = document.querySelector('#toast');
  const modeButtons = document.querySelectorAll('.seg-btn');
  const picks = document.querySelectorAll('.js-pick');

  let mode = 'beginner';
  let currentPrompt = prompts[0] || null;

  function scorePrompt(prompt, query){
    const q = (query || '').trim().toLowerCase();
    if(!q) return 1;
    const hay = [prompt.title, prompt.description, prompt.category, prompt.output_type, ...(prompt.tags || [])].join(' ').toLowerCase();
    return q.split(/\s+/).reduce((sum, part) => {
      if(!part) return sum;
      let s = 0;
      if(hay.includes(part)) s += 2;
      if(prompt.title.toLowerCase().includes(part)) s += 3;
      return sum + s;
    }, 0);
  }

  function topMatches(query){
    return [...prompts]
      .map(prompt => ({ prompt, score: scorePrompt(prompt, query) }))
      .filter(item => item.score > 0)
      .sort((a,b) => b.score - a.score || a.prompt.title.localeCompare(b.prompt.title))
      .slice(0, 6)
      .map(item => item.prompt);
  }

  function showResults(items){
    if(!resultsBox) return;
    if(!items.length || !searchInput || document.activeElement !== searchInput){
      resultsBox.classList.remove('is-visible');
      resultsBox.innerHTML = '';
      return;
    }
    resultsBox.innerHTML = items.map(item => `
      <a class="search-result-item" href="/p/${item.slug}/">
        <span>
          <strong>${item.title}</strong>
          <small>${item.description || ''}</small>
        </span>
        <span class="search-result-type">${item.output_type || 'Template'}</span>
      </a>
    `).join('');
    resultsBox.classList.add('is-visible');
  }

  function renderPreview(prompt){
    if(!preview || !prompt) return;
    currentPrompt = prompt;
    preview.textContent = mode === 'power' ? prompt.power : prompt.beginner;
    if(openBtn) openBtn.href = `/p/${prompt.slug}/`;
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

  if(searchInput){
    searchInput.addEventListener('input', () => {
      const value = searchInput.value.trim();
      if(clearBtn) clearBtn.style.display = value ? 'inline-flex' : 'none';
      const matches = topMatches(value);
      showResults(matches);
      if(preview && matches[0]) renderPreview(matches[0]);
    });

    searchInput.addEventListener('focus', () => showResults(topMatches(searchInput.value)));
    document.addEventListener('click', (event) => {
      if(!resultsBox || !searchForm) return;
      if(!searchForm.contains(event.target) && !resultsBox.contains(event.target)) {
        resultsBox.classList.remove('is-visible');
      }
    });
  }

  if(clearBtn && searchInput){
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      showResults([]);
      if(prompts[0]) renderPreview(prompts[0]);
      searchInput.focus();
    });
  }

  if(searchForm){
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const match = topMatches(searchInput?.value || '')[0];
      if(match) {
        window.location.href = `/p/${match.slug}/`;
      } else {
        window.location.href = '/categories/';
      }
    });
  }

  modeButtons.forEach(button => {
    button.addEventListener('click', () => {
      modeButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      mode = button.dataset.mode || 'beginner';
      if(currentPrompt) renderPreview(currentPrompt);
    });
  });

  picks.forEach(button => {
    button.addEventListener('click', () => {
      const match = prompts.find(prompt => prompt.key === button.dataset.prompt);
      if(match) renderPreview(match);
    });
  });

  if(copyBtn && preview){
    copyBtn.addEventListener('click', async () => {
      await copyText(preview.textContent);
      showToast();
    });
  }

  if(prompts[0] && preview) renderPreview(prompts[0]);
})();
