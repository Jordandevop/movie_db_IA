/**
 * Gestion des appels à l'API TMDB
 */

class TMDB_API {
  /**
   * Récupère les films populaires
   * @param {number} page - Numéro de la page (défaut: 1)
   * @returns {Promise<Object>} Réponse de l'API avec films populaires
   */
  static async getPopularMovies(page = 1) {
    return this._fetchMovies('/movie/popular', { page, language: 'fr-FR' });
  }

  /**
   * Découpe des films (Discover)
   * @param {Object} filters - Filtres à appliquer (genre_ids, vote_average, etc.)
   * @param {number} page - Numéro de la page (défaut: 1)
   * @returns {Promise<Object>} Réponse de l'API avec films découverts
   */
  static async discoverMovies(filters = {}, page = 1) {
    const params = {
      page,
      language: 'fr-FR',
      ...filters,
    };
    return this._fetchMovies('/discover/movie', params);
  }

  /**
   * Recherche de films par titre
   * @param {string} query - Titre du film à chercher
   * @param {number} page - Numéro de la page (défaut: 1)
   * @returns {Promise<Object>} Résultats de la recherche
   */
  static async searchMovies(query, page = 1) {
    if (!query || query.trim().length === 0) {
      throw new Error('La requête de recherche ne peut pas être vide');
    }
    return this._fetchMovies('/search/movie', { query, page, language: 'fr-FR' });
  }

  /**
   * Récupère les détails d'un film spécifique
   * @param {number} movieId - ID du film
   * @returns {Promise<Object>} Détails du film
   */
  static async getMovieDetails(movieId) {
    if (!movieId) {
      throw new Error('L\'ID du film est requis');
    }
    return this._fetchMovies(`/movie/${movieId}`, { language: 'fr-FR' });
  }

  /**
   * Récupère les films similaires à un film donné
   * @param {number} movieId - ID du film
   * @param {number} page - Numéro de la page (défaut: 1)
   * @returns {Promise<Object>} Liste des films similaires
   */
  static async getSimilarMovies(movieId, page = 1) {
    if (!movieId) {
      throw new Error('L\'ID du film est requis');
    }
    return this._fetchMovies(`/movie/${movieId}/similar`, { page, language: 'fr-FR' });
  }

  /**
   * Récupère les genres disponibles
   * @returns {Promise<Object>} Liste des genres
   */
  static async getGenres() {
    return this._fetchMovies('/genre/movie/list', { language: 'fr-FR' });
  }

  /**
   * Fonction interne pour effectuer les appels API
   * @param {string} endpoint - Endpoint TMDB
   * @param {Object} params - Paramètres de la requête
   * @returns {Promise<Object>} Réponse parsée en JSON
   * @private
   */
  static async _fetchMovies(endpoint, params = {}) {
    if (!isApiKeyConfigured()) {
      throw new Error('Clé API TMDB non configurée');
    }

    const queryParams = new URLSearchParams({
      api_key: API_CONFIG.apiKey,
      ...params,
    });

    const url = `${API_CONFIG.baseURL}${endpoint}?${queryParams.toString()}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur API TMDB: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      throw error;
    }
  }
}

// Exporte la classe pour utilisation
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TMDB_API;
}
