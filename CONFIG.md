# 🔧 Guide Technique - Configuration et Développement

Ce document couvre la configuration technique, la structure du code et les procédures de développement.

## 🗂 Architecture du Projet

### Hiérarchie des fichiers

```
index.html                    # Point d'entrée HTML principal
│
├── js/                       # JavaScript
│   ├── config.js            # Configuration API (gestion clé)
│   ├── api.js               # Classe TMDB_API (appels HTTP)
│   ├── router.js            # Routeur SPA (navigation)
│   └── main.js              # Application principale (routes)
│
├── css/                      # Styles
│   ├── style.scss           # Source SASS
│   └── style.css            # CSS compilé
│
├── assets/                   # Ressources
│   └── (images, icons...)
│
├── package.json             # Métadonnées projet
├── .env.example             # Template variables env
├── .gitignore               # Fichiers ignorés par git
├── README.md                # Guide utilisateur
├── GITFLOW.md               # Workflow git
└── CONFIG.md                # Ce fichier
```

## 🔑 Configuration de l'API TMDB

### 1. Obtenir une Clé API

1. Accédez à https://www.themoviedb.org/settings/api
2. Créez un compte (gratuit)
3. Demandez une clé API (développeur)
4. Attendez l'approbation (généralement instantané)
5. Copiez votre clé depuis le tableau de bord

### 2. Configurer l'Application

2 méthodes:

#### Méthode A: Formulaire au démarrage (Recommandée)
```
1. Lancez l'application
2. Un formulaire vous demande la clé API
3. Entrez votre clé
4. Elle est stockée localement dans localStorage
```

#### Méthode B: Variable d'environnement
```bash
1. Créez un fichier .env:
   TMDB_API_KEY=votre_cle_ici

2. Utilisez cette clé au démarrage
   setApiKey(process.env.TMDB_API_KEY)
```

### 3. Vérification

Dans la console du navigateur (F12):

```javascript
// Vérifier si la clé est configurée
isApiKeyConfigured()  // true ou false

// Voir la clé (masquée partiellement)
API_CONFIG.apiKey

// Tester un appel API
await TMDB_API.getPopularMovies(1)
```

## 📋 Classe TMDB_API - Référence Complète

### Méthodes Statiques

#### `getPopularMovies(page = 1)`
```javascript
// Récupère les films populaires du moment
const movies = await TMDB_API.getPopularMovies(1);
// Retourne: { results: [...], total_pages: X, page: 1 }
```

#### `discoverMovies(filters = {}, page = 1)`
```javascript
// Découverte avec filtres
const movies = await TMDB_API.discoverMovies({
  sort_by: 'popularity.desc',
  primary_release_year: 2024,
  vote_average_gte: 7
}, 1);
```

**Filtres disponibles:**
- `sort_by`: popularity.desc, vote_average.desc, release_date.desc
- `primary_release_year`: YYYY
- `vote_average_gte`: 0-10
- `vote_average_lte`: 0-10
- `with_genres`: genre_ids (comma separated)
- `language`: langue (fr, en, es, etc)

#### `searchMovies(query, page = 1)`
```javascript
// Recherche par titre
const results = await TMDB_API.searchMovies('Inception', 1);
// Retourne: { results: [...], total_results: X, page: 1 }
```

#### `getMovieDetails(movieId)`
```javascript
// Détails complets d'un film
const details = await TMDB_API.getMovieDetails(550);
// Retourne: { id, title, overview, budget, revenue, ... }
```

#### `getGenres()`
```javascript
// Liste tous les genres disponibles
const genres = await TMDB_API.getGenres();
// Retourne: { genres: [{ id, name }, ...] }
```

### Propriétés de Réponse

```javascript
{
  results: [
    {
      id: 550,                          // ID unique TMDB
      title: "Fight Club",              // Titre du film
      poster_path: "/xxx.jpg",          // Chemin image
      backdrop_path: "/xxx.jpg",        // Image de fond
      overview: "An insomniac...",      // Résumé
      release_date: "1999-10-15",       // Date sortie
      vote_average: 8.8,                // Note moyenne (0-10)
      vote_count: 25000,                // Nombre de votes
      popularity: 85.3,                 // Indice popularité
      genre_ids: [18, 28],              // IDs genres
      original_language: "en"           // Langue originale
    },
    ...
  ],
  page: 1,
  total_pages: 500,
  total_results: 10000
}
```

## 🚗 Classe Router - Référence

### Enregistrer une Route

```javascript
router.register('/home', async (params) => {
  // Code exécuté quand l'utilisateur visite /home
  console.log('Accueil');
});
```

### Naviguer Vers une Route

```javascript
// Méthode 1: appelDirectement
router.navigate('/search');

// Méthode 2: Lien HTML
<a data-route="/search">Rechercher</a>

// Méthode 3: Avec paramètres
router.navigate('/details', { movieId: 550 });
```

### Paramètres de Route

```javascript
router.register('/details', async (params) => {
  const movieId = params.movieId;
  const movie = await TMDB_API.getMovieDetails(movieId);
  console.log(movie);
});
```

## 🎨 Système de Design - Variables CSS/SASS

### Couleurs

```scss
$primary-color: #e50914;      // Rouge Netflix
$secondary-color: #221f1f;    // Noir foncé
$light-color: #f5f5f1;        // Blanc cassé
$dark-color: #141414;         // Noir pure
$border-color: #404040;       // Gris bordue
```

### Utilisation dans Components

```scss
// Bouton primaire
.btn-primary {
  background-color: $primary-color;
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

### Breakpoints Responsive

```scss
// Mobile: < 480px
// Tablet: 480px - 768px
// Desktop: > 768px

@media (max-width: 768px) {
  // Tablet et mobile
}

@media (max-width: 480px) {
  // Mobile uniquement
}
```

## 🔄 Gestion de l'État et du Stockage

### LocalStorage

```javascript
// Configurer API key
localStorage.setItem('tmdb_api_key', 'votre_cle');

// Récupérer
const key = localStorage.getItem('tmdb_api_key');

// Nettoyer
localStorage.removeItem('tmdb_api_key');
localStorage.clear(); // Tout nettoyer
```

### SessionStorage (Données temporaires)

```javascript
// Stockage pour la session du navigateur
sessionStorage.setItem('currentMovie', JSON.stringify(movie));
const current = JSON.parse(sessionStorage.getItem('currentMovie'));
```

## 🧪 Debugging et Développement

### Console Browser (F12)

```javascript
// Vérifier configuration
console.log(API_CONFIG);

// Tester appels API
TMDB_API.getPopularMovies()
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Voir routes enregistrées
console.log(router.routes);

// Naviguer en dev
router.navigate('/popular');
```

### Ereurs Courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Clé API TMDB non configurée" | API key manquante | Entrer la clé dans le formulaire |
| "Erreur API: 401 Unauthorized" | Clé invalide ou expirée | Vérifier/renouveler la clé |
| "Erreur API: 404 Not Found" | Endpoint inexistant | Vérifier l'URL et paramètres |
| "Erreur API: 429 Too Many Requests" | Dépassement limite requêtes | Attendre ou réduire les appels |

### Limits API TMDB (Gratuit)

- Requêtes par seconde: ~4
- Requêtes par jour: Pas de limite stricte
- Données: Résident dans les 1-2 derniers jours généralement

## 📲 Testing Responsive

### Chrome DevTools
1. F12 -> Toggle Device Toolbar (Ctrl+Shift+M)
2. Sélectionner device (iPhone, iPad, etc)

### Dimensions Testées
- Mobile: 375x667  (iPhone)
- Tablet: 768x1024   (iPad)
- Desktop: 1920x1080 (Écran large)

## 🚀 Performance

### Optimisations Appliquées

1. **Images Progressives**
   - Utilise le réseau CDN TMDB
   - Images compressées automatiquement

2. **Lazy Loading** (À implémente)
   ```javascript
   // Images avec lazy loading
   <img loading="lazy" src="..." />
   ```

3. **Debounce Recherche** (À implémente)
   ```javascript
   function debounce(func, delay) {
     let timeout;
     return (...args) => {
       clearTimeout(timeout);
       timeout = setTimeout(() => func(...args), delay);
     };
   }
   ```

## 📚 Ressources Utiles

### Documentation Officielle
- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Outils
- [TMDB API Explorer](https://www.themoviedb.org/settings/api)
- [Postman](https://www.postman.com/) - Tester les API
- [VS Code Extensions](https://code.visualstudio.com/docs/editor/extension-marketplace)

### Articles Recommandés
- [REST API Best Practices](https://restfulapi.net/)
- [SASS Documentation](https://sass-lang.com/documentation)
- [CSS Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 🔐 Sécurité

### ⚠️ Points Importants

1. **Ne JAMAIS** commiter la clé API dans le code
2. **N'utiliser** that localStorage que pour développement local
3. **Tester** avec des clés différentes en production
4. **Monitorer** l'utilisation de l'API
5. **Valider** toutes les données utilisateur

### Best Practices

```javascript
// ❌ Mauvais
const apiKey = "abc123def456";  // Hardcodé

// ✅ Bon
const apiKey = localStorage.getItem('tmdb_api_key');

// ✅ Meilleur (production)
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
```

## 📝 Checklist Développeur

Avant de committer:

- [ ] Code teste et fonctionne
- [ ] Pas de console.log inutiles
- [ ] Variables bien nommées
- [ ] Fonctions documentées (JSDoc)
- [ ] Pas d'erreurs console
- [ ] Format CSS cohérent
- [ ] Réponse mobile validée
- [ ] Pas de secrets commitens

---

**Dernière mise à jour**: 11 février 2026
