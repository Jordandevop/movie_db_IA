/**
 * Configuration de l'API TMDB
 * IMPORTANT: Ajouter votre clé API TMDB dans .env
 */

const API_CONFIG = {
  baseURL: 'https://api.themoviedb.org/3',
  apiKey: localStorage.getItem('tmdb_api_key') || '', // À récupérer de .env ou du formulaire
  language: 'fr-FR',
  region: 'FR',
};

// Fonction pour définir la clé API (à appeler au démarrage)
function setApiKey(key) {
  API_CONFIG.apiKey = key;
  localStorage.setItem('tmdb_api_key', key);
}

// Fonction pour vérifier si la clé API est configurée
function isApiKeyConfigured() {
  return API_CONFIG.apiKey && API_CONFIG.apiKey.trim().length > 0;
}
