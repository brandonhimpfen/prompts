---
layout: default
title: "Home"
description: "Reusable prompt templates for everyday work, learning, and planning."
---

<section class="hero">
  <div class="container hero__inner">
    <div class="hero__copy">
      <div class="eyebrow">Prompt templates • Beginner + Power User</div>
      <h1>Reusable prompts for real-world work.</h1>
      <p class="lead">
        A clean library of templates you can copy, adapt, and reuse across AI chatbots.
        Built for clarity, predictable outputs, and everyday usefulness.
      </p>

      <div class="actions">
        <a class="btn btn--primary" href="{{ '/builder/' | relative_url }}">Open Prompt Builder</a>
        <a class="btn btn--ghost" href="#featured">Browse Featured</a>
      </div>

      <div class="metaRow">
        <div class="meta">
          <div class="meta__k">Modes</div>
          <div class="meta__v">Beginner + Power User</div>
        </div>
        <div class="meta">
          <div class="meta__k">Use case</div>
          <div class="meta__v">Writing, planning, learning</div>
        </div>
        <div class="meta">
          <div class="meta__k">Copy</div>
          <div class="meta__v">One click</div>
        </div>
      </div>
    </div>

    <div class="hero__panel">
      <div class="panel">
        <div class="panel__head">
          <div>
            <div class="panel__title">Quick preview</div>
            <div class="panel__sub">Search on the left, copy on the right.</div>
          </div>
          <div class="seg" role="tablist" aria-label="Mode">
            <button class="seg__btn is-active" data-mode="beginner" role="tab">Beginner</button>
            <button class="seg__btn" data-mode="power" role="tab">Power User</button>
          </div>
        </div>

        <div class="panel__body">
          <div class="list">
            <div class="list__label">Top picks</div>
            {% assign picks = site.prompts | where: "category", "writing" %}
            {% for pr in picks limit:6 %}
              <a class="row" href="{{ pr.url | relative_url }}">
                <span class="row__title">{{ pr.title }}</span>
                <span class="row__tag">{{ pr.category }}</span>
              </a>
            {% endfor %}
          </div>

          <div class="preview">
            <div class="preview__label">Preview</div>
            <pre id="previewBox" class="code"></pre>

            <div class="preview__actions">
              <button id="copyPreview" class="btn btn--primary btn--sm">Copy</button>
              <a class="btn btn--ghost btn--sm" href="{{ '/builder/' | relative_url }}">Open builder</a>
            </div>
            <div id="toast" class="toast" role="status" aria-live="polite">Copied</div>
          </div>
        </div>
      </div>

      <div class="note">
        <div class="note__title">Why it works</div>
        <p>
          Templates focus on context, constraints, and output format so the chatbot produces consistent results.
          Power User mode adds structure for longer or more complex tasks.
        </p>
      </div>
    </div>
  </div>
</section>

<section id="categories" class="section">
  <div class="container section__head">
    <h2>Browse by category</h2>
    <p>Pick a category and explore templates.</p>
  </div>

  <div class="container cats">
    {% for cat in site.categories %}
    {% endfor %}
    {% for cat in site.data.categories %}
      <a class="cat" href="{{ '/c/' | append: cat.slug | append: '/' | relative_url }}">
        <div class="cat__title">{{ cat.title }}</div>
        <div class="cat__desc">{{ cat.desc }}</div>
      </a>
    {% endfor %}
  </div>
</section>

<section id="featured" class="section section--alt">
  <div class="container section__head">
    <h2>Featured prompts</h2>
    <p>Start with these and expand from there.</p>
  </div>

  <div class="container cards">
    {% for pr in site.prompts limit:6 %}
      <article class="card">
        <div class="card__top">
          <div class="card__title">{{ pr.title }}</div>
          <div class="card__sub">{{ pr.description }}</div>
        </div>
        <div class="card__foot">
          <span class="pill">{{ pr.output_type }}</span>
          <a class="link" href="{{ pr.url | relative_url }}">Open →</a>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<script src="{{ '/assets/js/home-preview.js' | relative_url }}"></script>
