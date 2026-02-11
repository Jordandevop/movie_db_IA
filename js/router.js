/**
 * Gestion simple du routing (Single Page Application)
 */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.eventBus = new EventTarget();
    this._setupEventListeners();
  }

  /**
   * Enregistre une route
   * @param {string} path - Chemin de la route (ex: '/home', '/search')
   * @param {Function} handler - Fonction à exécuter quand la route est activée
   */
  register(path, handler) {
    this.routes[path] = handler;
  }

  /**
   * Navigation vers une route
   * @param {string} path - Chemin à naviguer
   * @param {Object} params - Paramètres à passer à la route
   */
  async navigate(path, params = {}) {
    if (!this.routes[path]) {
      console.warn(`Route non trouvée: ${path}`);
      path = '/not-found';
    }

    this.currentRoute = path;
    
    // Met à jour l'URL
    window.history.pushState({ path, params }, '', `#${path}`);
    
    // Exécute le handler de la route
    try {
      await this.routes[path](params);
      console.log(`Navigation vers ${path}`);
    } catch (error) {
      console.error(`Erreur lors de la navigation vers ${path}:`, error);
      this.navigate('/error', { error: error.message });
    }
  }

  /**
   * Configure les listeners pour la navigation au clic et popstate
   * @private
   */
  _setupEventListeners() {
    // Gère les clics sur les liens avec data-route
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('data-route');
        this.navigate(path);
      }
    });

    // Gère le bouton "retour" du navigateur
    window.addEventListener('popstate', (e) => {
      const path = e.state?.path || '/home';
      this.navigate(path, e.state?.params);
    });
  }

  /**
   * Initialise le router en fonction de l'URL actuelle
   */
  init() {
    const hash = window.location.hash.substring(1) || '/home';
    this.navigate(hash);
  }
}

// Instance globale du router
const router = new Router();
