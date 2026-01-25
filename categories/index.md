---
layout: default
title: "Categories"
description: "Browse the prompt library by category."
permalink: /categories/
---

<section class="pageHead">
  <div class="container">
    <div class="breadcrumbs"><a href="{{ '/' | relative_url }}">Home</a> <span class="sep">/</span> Categories</div>
    <h1>Browse by category</h1>
    <p class="muted">Structured, reusable templates for everyday work, learning, and planning.</p>

    <div class="statsRow">
      <div class="stat">
        <div class="stat__k">Categories</div>
        <div class="stat__v">{{ site.data.categories | size }}</div>
      </div>
      <div class="stat">
        <div class="stat__k">Templates</div>
        <div class="stat__v">{{ site.prompts | size }}</div>
      </div>
      <div class="stat">
        <div class="stat__k">Tags</div>
        <div class="stat__v">
          {% assign alltags = "" | split: "" %}
          {% for pr in site.prompts %}
            {% for t in pr.tags %}
              {% unless alltags contains t %}
                {% assign alltags = alltags | push: t %}
              {% endunless %}
            {% endfor %}
          {% endfor %}
          {{ alltags | size }}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container cats cats--lg">
    {% for cat in site.data.categories %}
      <a class="cat" href="{{ '/c/' | append: cat.slug | append: '/' | relative_url }}">
        <div class="cat__title">{{ cat.title }}</div>
        <div class="cat__desc">{{ cat.desc }}</div>
        <div class="hint muted" style="margin-top:10px">
          {% assign n = site.prompts | where: "category", cat.slug | size %}
          {{ n }} template{% if n != 1 %}s{% endif %}
        </div>
      </a>
    {% endfor %}
  </div>
</section>
