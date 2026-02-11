/**
 * Application principale - Moteur de recommandation de films
 */

// Élément contenant les pages
const appContainer = document.getElementById('app');
const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');

/**
 * Initialise l'application
 */
async function initializeApp() {
  console.log('🚀 Initialisation de l\'application...');

  // Vérifie si la clé API est configurée
  if (!isApiKeyConfigured()) {
    showApiKeySetup();
    return;
  }

  setupRoutes();
  router.init();
}

/**
 * Affiche le formulaire de configuration de la clé API
 */
function showApiKeySetup() {
  appContainer.innerHTML = `
    <div class="container api-setup">
      <h1>🎬 Moteur de Recommandation de Films</h1>
      <p>Bienvenue! Veuillez configurer votre clé API TMDB pour commencer.</p>
      <div class="form-group">
        <label for="apiKeyInput">Clé API TMDB:</label>
        <input 
          type="password" 
          id="apiKeyInput" 
          placeholder="Entrez votre clé API"
          required
        >
        <small>
          Obtenez une clé gratuitement sur 
          <a href="https://developer.themoviedb.org/docs/getting-started" target="_blank">
            developer.themoviedb.org
          </a>
        </small>
      </div>
      <button id="apiKeySubmit">Configurer</button>
    </div>
  `;

  document.getElementById('apiKeySubmit').addEventListener('click', handleApiKeySubmit);
}

/**
 * Gère la soumission de la clé API
 */
async function handleApiKeySubmit() {
  const apiKey = document.getElementById('apiKeyInput').value.trim();

  if (!apiKey) {
    alert('Veuillez entrer une clé API valide');
    return;
  }

  setApiKey(apiKey);
  console.log('✅ Clé API configurée avec succès');

  setupRoutes();
  router.navigate('/home');
}

/**
 * Définit toutes les routes de l'application
 */
function setupRoutes() {
  // Page d'accueil
  router.register('/home', async () => {
    appContainer.innerHTML = `
      <nav class="navbar">
        <h1>🎬 MovieDB Recommandation</h1>
        <ul class="nav-links">
          <li><a href="#/home" data-route="/home">Accueil</a></li>
          <li><a href="#/search" data-route="/search">Recherche</a></li>
          <li><a href="#/popular" data-route="/popular">Populaires</a></li>
          <li><a href="#/discover" data-route="/discover">Découvrir</a></li>
        </ul>
      </nav>
      <div class="container">
        <section class="hero">
          <h2>Bienvenue sur MovieDB</h2>
          <p>Découvrez votre prochain film préféré avec nos recommandations personnalisées</p>
        </section>
        <section class="quick-access">
          <h3>Commencez ici</h3>
          <div class="button-group">
            <button data-route="/popular" class="btn btn-primary">Films Populaires</button>
            <button data-route="/search" class="btn btn-secondary">Rechercher un Film</button>
            <button data-route="/discover" class="btn btn-secondary">Découvrir</button>
          </div>
        </section>
      </div>
    `;
  });

  // Page de recherche
  router.register('/search', async () => {
    appContainer.innerHTML = `
      <nav class="navbar">
        <h1>🎬 MovieDB Recommandation</h1>
        <ul class="nav-links">
          <li><a href="#/home" data-route="/home">Accueil</a></li>
          <li><a href="#/search" data-route="/search">Recherche</a></li>
          <li><a href="#/popular" data-route="/popular">Populaires</a></li>
          <li><a href="#/discover" data-route="/discover">Découvrir</a></li>
        </ul>
      </nav>
      <div class="container">
        <h2>Rechercher un Film</h2>
        <div class="search-form">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Titre du film..."
            class="search-input"
          >
          <button id="searchBtn" class="btn btn-primary">Rechercher</button>
        </div>
        <div id="searchResults"></div>
      </div>
    `;

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', async () => {
      const query = searchInput.value;
      if (query.trim()) {
        displaySearchResults(query);
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  });

  // Page filme populaires
  router.register('/popular', async () => {
    appContainer.innerHTML = `
      <nav class="navbar">
        <h1>🎬 MovieDB Recommandation</h1>
        <ul class="nav-links">
          <li><a href="#/home" data-route="/home">Accueil</a></li>
          <li><a href="#/search" data-route="/search">Recherche</a></li>
          <li><a href="#/popular" data-route="/popular">Populaires</a></li>
          <li><a href="#/discover" data-route="/discover">Découvrir</a></li>
        </ul>
      </nav>
      <div class="container">
        <h2>Films Populaires</h2>
        <div id="movieList" class="loading">Chargement...</div>
      </div>
    `;

    displayPopularMovies();
  });

  // Page découvrir
  router.register('/discover', async () => {
    appContainer.innerHTML = `
      <nav class="navbar">
        <h1>🎬 MovieDB Recommandation</h1>
        <ul class="nav-links">
          <li><a href="#/home" data-route="/home">Accueil</a></li>
          <li><a href="#/search" data-route="/search">Recherche</a></li>
          <li><a href="#/popular" data-route="/popular">Populaires</a></li>
          <li><a href="#/discover" data-route="/discover">Découvrir</a></li>
        </ul>
      </nav>
      <div class="container">
        <h2>Découvrir des Films</h2>
        <div id="discoverContent">Chargement...</div>
      </div>
    `;

    displayDiscoverPage();
  });

  // Page 404
  router.register('/not-found', async () => {
    appContainer.innerHTML = `
      <div class="container">
        <h2>Page non trouvée</h2>
        <p>La page que vous recherchez n'existe pas.</p>
        <button data-route="/home" class="btn btn-primary">Retour à l'accueil</button>
      </div>
    `;
  });
}

/* ===================== 🧠 MOTEUR DE SCORING ===================== */

function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

function computeMovieScores(movies) {
  const popularities = movies.map(m => m.popularity);
  const votes = movies.map(m => m.vote_count);

  const minPop = Math.min(...popularities);
  const maxPop = Math.max(...popularities);
  const minVotes = Math.min(...votes);
  const maxVotes = Math.max(...votes);

  const currentYear = new Date().getFullYear();

  return movies.map(movie => {
    const normalizedRating = movie.vote_average / 10;
    const normalizedPopularity = normalize(movie.popularity, minPop, maxPop);
    const normalizedVotes = normalize(
      Math.log10(movie.vote_count + 1),
      Math.log10(minVotes + 1),
      Math.log10(maxVotes + 1)
    );

    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : currentYear;

    const age = currentYear - releaseYear;
    const recencyScore = Math.max(0, 1 - age / 20);

    const score =
      normalizedRating * 0.4 +
      normalizedPopularity * 0.25 +
      normalizedVotes * 0.2 +
      recencyScore * 0.15;

    return { ...movie, score };
  });
}
/**
 * Affiche les films populaires
 */
async function displayPopularMovies() {
  try {
    const results = await TMDB_API.getPopularMovies(1);

    currentMovies = computeMovieScores(results.results); // PAS trié
    isSortedByScore = false;

    const movieListContainer = document.getElementById('movieList');
    movieListContainer.innerHTML = `
      <div class="movie-nav">
        <button id="sortScoreBtn" class="btn btn-secondary">
          ⭐ Trier par score
        </button>
      </div>
      <div id="movieGridContainer">
        ${generateMovieGrid(currentMovies)}
      </div>
    `;

    document.getElementById('sortScoreBtn').addEventListener('click', () => {
      toggleSort();
      document.getElementById('movieGridContainer').innerHTML = generateMovieGrid(currentMovies);
      document.getElementById('sortScoreBtn').textContent = isSortedByScore ? '↺ Ordre original' : '⭐ Trier par score';
    });

  } catch (error) {
    document.getElementById('movieList').innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
  }
}

function toggleSort() {
  if (!isSortedByScore) {
    currentMovies.sort((a, b) => b.score - a.score);
    isSortedByScore = true;
  } else {
    currentMovies.sort((a, b) => b.popularity - a.popularity);
    isSortedByScore = false;
  }
}

/**
 * Affiche les résultats de recherche
 */
async function displaySearchResults(query) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = 'Chargement...';

  try {
    const results = await TMDB_API.searchMovies(query, 1);
    if (results.results.length === 0) {
      resultsDiv.innerHTML = '<p>Aucun film trouvé.</p>';
      return;
    }
    resultsDiv.innerHTML = generateMovieGrid(results.results);
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
  }
}

/**
 * Affiche la page découvrir
 */
async function displayDiscoverPage() {
  try {
    const results = await TMDB_API.discoverMovies({ sort_by: 'popularity.desc' }, 1);
    const moviesHTML = generateMovieGrid(results.results);
    document.getElementById('discoverContent').innerHTML = moviesHTML;
  } catch (error) {
    document.getElementById('discoverContent').innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
  }
}

/**
 * Génère la grille de films en HTML
 */
function generateMovieGrid(movies) {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  
  return `
    <div class="movie-grid">
      ${movies
        .map(
          (movie) => `
        <div class="movie-card">
          <img 
            src="${movie.poster_path ? imageBaseUrl + movie.poster_path : '/assets/placeholder.jpg'}" 
            alt="${movie.title}"
            class="movie-poster"
          >
          <h3>${movie.title}</h3>
          <p class="rating">⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</p>
          <p class="release-date">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

// Lance l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', initializeApp);
