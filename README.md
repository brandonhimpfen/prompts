# prompts — Jekyll

[![Support Open Work](https://img.shields.io/badge/Support-Open%20Work-0A0A0A?style=flat&logo=github)](https://github.com/brandonhimpfen/support) 
[![GitHub Sponsor](https://srv-cdn.himpfen.io/badges/github/github-flat.svg)](https://github.com/sponsors/brandonhimpfen) 
[![Buy Me a Coffee](https://srv-cdn.himpfen.io/badges/buymeacoffee/buymeacoffee-flat.svg)](https://buymeacoffee.com/brandonhimpfen) 
[![Ko-Fi](https://srv-cdn.himpfen.io/badges/kofi/kofi-flat.svg)](https://ko-fi.com/brandonhimpfen) 
[![PayPal](https://srv-cdn.himpfen.io/badges/paypal/paypal-flat.svg)](https://paypal.me/brandonhimpfen)

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
