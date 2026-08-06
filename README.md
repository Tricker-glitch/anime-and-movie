# OtakuReel

OtakuReel is a polished anime and movie discovery website concept. It combines IMDb-style ratings and charts with anime-season features like simulcast schedules, dubbed/subbed badges, episode status, and a universal watchlist.

## Features

- Responsive landing page for anime, movies, and animated series discovery.
- Searchable and filterable trending title cards.
- Top-rated chart generated from the same title data.
- Seasonal anime schedule section.
- Movie night recommendation panel.
- Embedded YouTube spotlight video section.
- Random watchlist picker interaction.
- Python backend at `/api/titles` serving anime, global movie, and Indian movie data.
- Visible local SVG image cards for every anime, global movie, and Indian movie entry, so artwork works without network access.
- Dependency-free local development so the site works in restricted or offline environments.

## Getting Started

No package download is required because the app uses plain HTML, CSS, JavaScript, and the Python standard library. Run the local server from the repository root:

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
- If API data does not load, run `npm run start` or `python3 app.py` so `/api/titles` is available. The browser still has fallback title data for static previews.
- If the page is blank, make sure you serve the repository root instead of opening a copied file path, because `index.html` loads assets from `src/`.
- If validation fails, read the failing line from `scripts/validate-site.js`; it checks that the expected HTML, CSS, and JavaScript hooks are present.
