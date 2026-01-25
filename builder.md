---
layout: default
title: "Prompt Builder"
description: "Generate finished prompts using Beginner or Power User mode."
permalink: /builder/
---

<main class="builder">
  <div class="container builder__inner">
    <aside class="sidebar">
      <div class="sidebar__head">
        <h1>Prompt Builder</h1>
        <p class="muted">Pick a template, add your details, copy the finished prompt.</p>
      </div>

      <div class="controls">
        <div class="control">
          <label>Category</label>
          <select id="catSelect">
            <option value="all">All</option>
            {% for cat in site.data.categories %}
              <option value="{{ cat.slug }}">{{ cat.title }}</option>
            {% endfor %}
          </select>
        </div>

        <div class="control">
          <label>Template</label>
          <select id="promptSelect"></select>
          <div id="promptHint" class="hint muted"></div>
        </div>

        <div class="control">
          <label>Mode</label>
          <div class="seg seg--full" role="tablist" aria-label="Mode">
            <button class="seg__btn is-active" data-mode="beginner" role="tab">Beginner</button>
            <button class="seg__btn" data-mode="power" role="tab">Power User</button>
          </div>
        </div>

        <div class="control">
          <label>Your details</label>
          <textarea id="userInput" placeholder="Paste the email, notes, situation, or content here…"></textarea>
          <div class="hint muted">Tip: include audience + constraints + what you want back.</div>
        </div>

        <div class="control control--actions">
          <button id="insertExample" class="btn btn--ghost">Insert example</button>
          <button id="copyBuiltPrompt" class="btn btn--primary">Copy prompt</button>
        </div>

        <div id="builderToast" class="toast" role="status" aria-live="polite">Copied</div>
      </div>
    </aside>

    <section class="work">
      <div class="work__head">
        <div>
          <div class="work__title">Generated prompt</div>
          <div class="muted" id="activeModeNote">Beginner format</div>
        </div>
        <div class="work__actions">
          <button id="randomPick" class="btn btn--ghost btn--sm">Random</button>
          <a class="btn btn--ghost btn--sm" href="{{ '/' | relative_url }}">Home</a>
        </div>
      </div>

      <pre id="builtPrompt" class="code code--big"></pre>
    </section>
  </div>
</main>

<script>
window.PROMPTS = {{ site.data.prompts | jsonify }};
</script>
<script src="{{ '/assets/js/builder-page.js' | relative_url }}"></script>
