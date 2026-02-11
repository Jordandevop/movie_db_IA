/**
 * Application principale - Moteur de recommandation de films
 */

// Élément contenant les pages
const appContainer = document.getElementById('app');
const apiKeyForm = document.getElementById('apiKeyForm');
const apiKeyInput = document.getElementById('apiKeyInput');

// Cache des genres pour éviter des appels API répétés
let genresCache = null;

/**
 * Charge et met en cache la liste des genres TMDB
 */
async function loadGenres() {
  if (genresCache) return genresCache;
  const data = await TMDB_API.getGenres();
  genresCache = data.genres;
  return genresCache;
}

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

  // Page découvrir avec filtrage multi-critères
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

        <div class="discover-filters">
          <div class="filter-group">
            <label for="filterGenre">Genre</label>
            <select id="filterGenre">
              <option value="">Tous les genres</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="filterYear">Année minimum</label>
            <input type="number" id="filterYear"
                   placeholder="ex: 2020"
                   min="1900" max="2026" step="1">
          </div>

          <div class="filter-group">
            <label for="filterRating">Note minimum</label>
            <select id="filterRating">
              <option value="">Toutes les notes</option>
              <option value="5">5+</option>
              <option value="6">6+</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="9">9+</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="filterLanguage">Langue originale</label>
            <select id="filterLanguage">
              <option value="">Toutes les langues</option>
              <option value="fr">Français</option>
              <option value="en">Anglais</option>
              <option value="es">Espagnol</option>
              <option value="de">Allemand</option>
              <option value="it">Italien</option>
              <option value="ja">Japonais</option>
              <option value="ko">Coréen</option>
              <option value="zh">Chinois</option>
              <option value="hi">Hindi</option>
              <option value="pt">Portugais</option>
            </select>
          </div>

          <div class="filter-actions">
            <button id="applyFilters" class="btn btn-primary">Appliquer</button>
            <button id="resetFilters" class="btn btn-secondary">Réinitialiser</button>
          </div>
        </div>

        <div id="activeFilters"></div>
        <div id="discoverContent" class="loading">Chargement...</div>
      </div>
    `;

    // Charger les genres dans le select
    try {
      const genres = await loadGenres();
      const genreSelect = document.getElementById('filterGenre');
      genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Erreur chargement genres:', error);
    }

    // Événements filtres
    document.getElementById('applyFilters').addEventListener('click', () => {
      applyDiscoverFilters();
    });

    document.getElementById('resetFilters').addEventListener('click', () => {
      document.getElementById('filterGenre').value = '';
      document.getElementById('filterYear').value = '';
      document.getElementById('filterRating').value = '';
      document.getElementById('filterLanguage').value = '';
      document.getElementById('activeFilters').innerHTML = '';
      applyDiscoverFilters();
    });

    // Chargement initial sans filtres
    applyDiscoverFilters();
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

/**
 * Affiche les films populaires
 */
async function displayPopularMovies() {
  try {
    const results = await TMDB_API.getPopularMovies(1);
    const moviesHTML = generateMovieGrid(results.results);
    document.getElementById('movieList').innerHTML = moviesHTML;
  } catch (error) {
    document.getElementById('movieList').innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
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
 * Collecte les filtres, appelle l'API discover, et affiche les résultats
 */
async function applyDiscoverFilters() {
  const resultsDiv = document.getElementById('discoverContent');
  resultsDiv.innerHTML = '<div class="loading">Chargement...</div>';

  // Collecter les valeurs des filtres
  const genreValue = document.getElementById('filterGenre').value;
  const yearValue = document.getElementById('filterYear').value;
  const ratingValue = document.getElementById('filterRating').value;
  const languageValue = document.getElementById('filterLanguage').value;

  // Construire l'objet filtres (uniquement les clés non-vides)
  const filters = {
    sort_by: 'popularity.desc',
  };

  if (genreValue) {
    filters.with_genres = genreValue;
  }
  if (yearValue) {
    filters['primary_release_date.gte'] = `${yearValue}-01-01`;
  }
  if (ratingValue) {
    filters['vote_average.gte'] = ratingValue;
  }
  if (languageValue) {
    filters.with_original_language = languageValue;
  }

  // Afficher les filtres actifs
  displayActiveFilters(genreValue, yearValue, ratingValue, languageValue);

  // Appeler l'API et afficher les résultats
  try {
    const results = await TMDB_API.discoverMovies(filters, 1);

    if (results.results.length === 0) {
      resultsDiv.innerHTML = `
        <div class="no-results">
          <p>Aucun film ne correspond à vos critères.</p>
          <p>Essayez de modifier ou réinitialiser vos filtres.</p>
        </div>
      `;
      return;
    }

    resultsDiv.innerHTML = `
      <p class="results-count">${results.total_results} film(s) trouvé(s)</p>
      ${generateMovieGrid(results.results)}
    `;
  } catch (error) {
    resultsDiv.innerHTML = `<p class="error">Erreur: ${error.message}</p>`;
  }
}

/**
 * Affiche les filtres actifs sous forme de tags visuels
 */
function displayActiveFilters(genreValue, yearValue, ratingValue, languageValue) {
  const container = document.getElementById('activeFilters');
  const tags = [];

  if (genreValue) {
    const genreSelect = document.getElementById('filterGenre');
    const genreName = genreSelect.options[genreSelect.selectedIndex].text;
    tags.push(`Genre: ${genreName}`);
  }
  if (yearValue) {
    tags.push(`Depuis: ${yearValue}`);
  }
  if (ratingValue) {
    tags.push(`Note: ${ratingValue}+`);
  }
  if (languageValue) {
    const langSelect = document.getElementById('filterLanguage');
    const langName = langSelect.options[langSelect.selectedIndex].text;
    tags.push(`Langue: ${langName}`);
  }

  if (tags.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <div class="active-filters-list">
      ${tags.map(tag => `<span class="filter-tag">${tag}</span>`).join('')}
    </div>
  `;
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
