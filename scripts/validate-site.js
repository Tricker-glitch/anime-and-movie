const { readFileSync, existsSync } = require('node:fs');

const requiredFiles = ['index.html', 'src/styles.css', 'src/main.js'];
const missingFiles = requiredFiles.filter((file) => !existsSync(file));

if (missingFiles.length) {
  console.error(`Missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

const html = readFileSync('index.html', 'utf8');
const css = readFileSync('src/styles.css', 'utf8');
const js = readFileSync('src/main.js', 'utf8');

const checks = [
  ['HTML includes app title', html.includes('OtakuReel')],
  ['HTML loads stylesheet', html.includes('./src/styles.css')],
  ['HTML loads JavaScript module', html.includes('./src/main.js')],
  ['CSS defines responsive styles', css.includes('@media (max-width: 850px)')],
  ['JavaScript renders title cards', js.includes('renderCards')],
  ['JavaScript renders charts', js.includes('renderCharts')],
];

const failures = checks.filter(([, passed]) => !passed);

checks.forEach(([label, passed]) => {
  console.log(`${passed ? '✓' : '✗'} ${label}`);
});

if (failures.length) {
  process.exit(1);
}
