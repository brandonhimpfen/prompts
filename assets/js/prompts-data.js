---
---
/* Generated from _data/prompts.yml */
window.PROMPTS = [
{% for p in site.data.prompts %}
  {
    key: {{ p.key | jsonify }},
    category: {{ p.category | jsonify }},
    title: {{ p.title | jsonify }},
    description: {{ p.description | jsonify }},
    slug: {{ p.slug | jsonify }},
    difficulty: {{ p.difficulty | jsonify }},
    output_type: {{ p.output_type | jsonify }},
    tags: {{ p.tags | jsonify }},
    beginner: {{ p.beginner | jsonify }},
    power: {{ p.power | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
