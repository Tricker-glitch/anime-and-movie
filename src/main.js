const titles = [
  { name: 'Starlight Ronin', type: 'anime', year: 2026, rating: 9.2, meta: 'Action fantasy · Ep. 8 airing', vibe: 'Hot' },
  { name: 'Neon Harbor', type: 'movie', year: 2025, rating: 8.8, meta: 'Sci-fi mystery · 2h 14m', vibe: 'Critic pick' },
  { name: 'Moonlit Bento Club', type: 'anime', year: 2026, rating: 8.6, meta: 'Slice of life · Dub available', vibe: 'Cozy' },
  { name: 'The Last Projectionist', type: 'movie', year: 2024, rating: 8.5, meta: 'Drama · Festival winner', vibe: 'Award buzz' },
  { name: 'Mecha Hearts', type: 'series', year: 2026, rating: 8.4, meta: 'Animated series · Weekly', vibe: 'New' },
  { name: 'Kaiju Summer', type: 'movie', year: 2025, rating: 8.2, meta: 'Action comedy · Family night', vibe: 'Fun' },
];

const grid = document.querySelector('#title-grid');
const chartList = document.querySelector('#chart-list');
const filterButtons = document.querySelectorAll('.filter-tabs button');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

function renderCards(filter = 'all', query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTitles = titles.filter((title) => {
    const matchesFilter = filter === 'all' || title.type === filter;
    const matchesQuery = !normalizedQuery || `${title.name} ${title.meta}`.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = filteredTitles.map((title) => `
    <article class="title-card">
      <div class="card-poster ${title.type}">
        <span>${title.type}</span>
      </div>
      <div class="card-body">
        <div class="card-kicker"><span>${title.vibe}</span><span>${title.year}</span></div>
        <h3>${title.name}</h3>
        <p>${title.meta}</p>
        <div class="card-footer"><strong>★ ${title.rating}</strong><button aria-label="Add ${title.name} to watchlist">+ Watchlist</button></div>
      </div>
    </article>
  `).join('') || '<p class="empty-state">No titles found. Try another search.</p>';
}

function renderCharts() {
  chartList.innerHTML = [...titles]
    .sort((a, b) => b.rating - a.rating)
    .map((title) => `<li><span>${title.name}</span><strong>${title.rating}</strong><em>${title.type}</em></li>`)
    .join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderCards(button.dataset.filter, searchInput.value);
  });
});

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const activeFilter = document.querySelector('.filter-tabs .active').dataset.filter;
  renderCards(activeFilter, searchInput.value);
});

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('open');
});

document.querySelector('#random-pick').addEventListener('click', () => {
  const pick = titles[Math.floor(Math.random() * titles.length)];
  document.querySelector('#pick-result').textContent = `Tonight's pick: ${pick.name} — ${pick.meta}.`;
});

renderCards();
renderCharts();
