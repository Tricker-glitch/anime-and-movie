const { readFileSync, existsSync } = require('node:fs');

const requiredFiles = ['index.html', 'src/styles.css', 'src/main.js', 'app.py', 'assets/posters/rrr.svg', 'assets/posters/dangal.svg'];
const missingFiles = requiredFiles.filter((file) => !existsSync(file));

if (missingFiles.length) {
  console.error(`Missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('src/styles.css', 'utf8');
const js = readFileSync('src/main.js', 'utf8');
const py = readFileSync('app.py', 'utf8');

const checks = [
  ['HTML includes app title', html.includes('OtakuReel')],
  ['HTML loads stylesheet', html.includes('./src/styles.css')],
  ['HTML loads JavaScript module', html.includes('./src/main.js')],
  ['HTML has search form hook', html.includes('id="search-form"')],
  ['HTML has title grid hook', html.includes('id="title-grid"')],
  ['HTML has visible search button text', html.includes('Search titles')],
  ['HTML has results status hook', html.includes('id="results-status"')],
  ['HTML has chart list hook', html.includes('id="chart-list"')],
  ['CSS defines responsive styles', css.includes('@media (max-width: 850px)')],
  ['CSS styles title cards', css.includes('.title-card')],
  ['JavaScript renders title cards', js.includes('renderCards')],
  ['JavaScript renders charts', js.includes('renderCharts')],
  ['JavaScript supports random picks', js.includes('#random-pick')],
  ['JavaScript loads backend API', js.includes('/api/titles')],
  ['JavaScript updates result count', js.includes('resultsStatus.textContent')],
  ['Python serves title API', py.includes('/api/titles')],
  ['Python includes Indian movie catalog', py.includes('Baahubali') && py.includes('Dangal')],
  ['Catalog uses local poster assets', py.includes('./assets/posters/rrr.svg') && js.includes('./assets/posters/your-name.svg')],
];

const failures = checks.filter(([, passed]) => !passed);

checks.forEach(([label, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
});

if (failures.length) {
  console.error(`Validation failed: ${failures.map(([label]) => label).join(', ')}`);
  process.exit(1);
}
