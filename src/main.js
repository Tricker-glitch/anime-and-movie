const fallbackTitles = [
  { name: 'RRR', type: 'indian', year: 2022, rating: 8.7, meta: 'Telugu epic action · Hindi/Tamil/Malayalam/Kannada dubs', vibe: 'Indian blockbuster', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Alia%20Bhatt%20at%20RRR%20promotions.jpg', credit: 'Wikimedia Commons' },
  { name: 'Dangal', type: 'indian', year: 2016, rating: 8.4, meta: 'Hindi sports drama · Family watch', vibe: 'Top rated', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Film%20set%20Dangal%20%282%29.jpg', credit: 'Sander.v.Ginkel / Wikimedia Commons' },
  { name: 'Baahubali: The Beginning', type: 'indian', year: 2015, rating: 8.1, meta: 'Telugu fantasy action · Pan-Indian saga', vibe: 'Epic', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Baahubali%20cast.jpg', credit: 'Bollywood Hungama / Wikimedia Commons' },
  { name: 'Mahanagar', type: 'indian', year: 1963, rating: 8.3, meta: 'Bengali drama · Satyajit Ray classic', vibe: 'Classic', image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Poster%20Mahanagar%20by%20Satyajit%20Ray.jpg', credit: 'Wikimedia Commons' },
  { name: 'Demon Slayer: Kimetsu no Yaiba', type: 'anime', year: 2019, rating: 8.6, meta: 'Anime action fantasy · Arc tracker', vibe: 'Anime hit', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80', credit: 'Unsplash' },
  { name: 'Your Name', type: 'anime', year: 2016, rating: 8.8, meta: 'Anime romance fantasy · Movie night', vibe: 'Fan favorite', image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80', credit: 'Unsplash' },
  { name: 'Spider-Man: Across the Spider-Verse', type: 'movie', year: 2023, rating: 8.6, meta: 'Animated superhero film · 2h 20m', vibe: 'Animated', image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80', credit: 'Unsplash' },
  { name: 'Inception', type: 'movie', year: 2010, rating: 8.8, meta: 'Sci-fi thriller · Mind-bending cinema', vibe: 'IMDb-style pick', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80', credit: 'Unsplash' },
];

let titles = fallbackTitles;
const grid = document.querySelector('#title-grid');
const chartList = document.querySelector('#chart-list');
const filterButtons = document.querySelectorAll('.filter-tabs button');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

function getActiveFilter() {
  return document.querySelector('.filter-tabs .active').dataset.filter;
}

function renderCards(filter = 'all', query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredTitles = titles.filter((title) => {
    const matchesFilter = filter === 'all' || title.type === filter;
    const matchesQuery = !normalizedQuery || `${title.name} ${title.meta}`.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = filteredTitles.map((title, index) => `
    <article class="title-card animated-card" style="--delay: ${index * 80}ms">
      <img class="card-image" src="${title.image}" alt="${title.name} artwork" loading="lazy" onerror="this.closest('.title-card').classList.add('image-missing'); this.remove();" />
      <div class="card-body">
        <div class="card-kicker"><span>${title.vibe}</span><span>${title.year}</span></div>
        <h3>${title.name}</h3>
        <p>${title.meta}</p>
        <small>Image: ${title.credit}</small>
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

async function loadTitles() {
  try {
    const response = await fetch('/api/titles');
    if (!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    titles = data.titles;
  } catch (error) {
    console.warn('Using built-in title fallback:', error.message);
  } finally {
    renderCards(getActiveFilter(), searchInput.value);
    renderCharts();
  }
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
  renderCards(getActiveFilter(), searchInput.value);
});

searchInput.addEventListener('input', () => renderCards(getActiveFilter(), searchInput.value));

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('open');
});

document.querySelector('#random-pick').addEventListener('click', () => {
  const pick = titles[Math.floor(Math.random() * titles.length)];
  document.querySelector('#pick-result').textContent = `Tonight's pick: ${pick.name} — ${pick.meta}.`;
});

loadTitles();
