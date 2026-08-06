# OtakuReel

OtakuReel is a polished anime and movie discovery website concept. It combines IMDb-style ratings and charts with anime-season features like simulcast schedules, dubbed/subbed badges, episode status, and a universal watchlist.

## Features

- Responsive landing page for anime, movies, and animated series discovery.
- Searchable and filterable trending title cards.
- Top-rated chart generated from the same title data.
- Seasonal anime schedule section.
- Movie night recommendation panel.
- Random watchlist picker interaction.
- Dependency-free local development so the site works in restricted or offline environments.

## Getting Started

No package download is required because the app is plain HTML, CSS, and JavaScript. Run the local server from the repository root:

```bash
npm run start
```

Then open <http://localhost:4173> in your browser.

## Validation

Run the built-in checks before committing changes:

```bash
npm run build
node --check src/main.js
```

## Troubleshooting

- If `npm install` reports a registry or proxy error, you can skip it. This project has no third-party dependencies.
- If the page is blank, make sure you serve the repository root instead of opening a copied file path, because `index.html` loads assets from `src/`.
- If validation fails, read the failing line from `scripts/validate-site.js`; it checks that the expected HTML, CSS, and JavaScript hooks are present.
