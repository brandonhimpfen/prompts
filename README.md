# prompts — Jekyll site (LinkedIn Learning-style UI)

A Jekyll version of **prompts by Brandon Himpfen**, using the same clean, restrained UI.

## Run locally
```bash
bundle install
bundle exec jekyll serve
```

## Structure
- `_prompts/` — prompt template pages
- `_categories/` — category pages
- `_data/prompts.yml` — prompt data (used to generate JS + lists)
- `builder/` — dedicated prompt builder page (reads the generated `assets/js/prompts-data.js`)

## Add a prompt
1. Add an entry to `_data/prompts.yml`
2. Add a file to `_prompts/` with matching `key` in front matter (or copy an existing one)
