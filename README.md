# prompts — Jekyll

This is a Jekyll version that builds to the same UI/functionality as the static site.

## Local run
```bash
bundle install
bundle exec jekyll serve
```

Then open: http://127.0.0.1:4000

## Notes
- `/assets/js/prompts-data.js` is generated from `_data/prompts.yml` at build time.
- The Builder markup matches the working static version, so `builder.js` loads correctly.
