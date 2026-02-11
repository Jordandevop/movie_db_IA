# 🎬 Moteur de Recommandation de Films

Un projet de moteur de recommandation intelligent développé avec HTML, CSS/SASS et JavaScript vanilla. Utilise l'API TMDB pour récupérer et afficher des films avec une logique de scoring personnalisable.

## 🚀 Démarrage Rapide

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Une clé API TMDB (gratuite) : https://developer.themoviedb.org/docs/getting-started

### Installation

1. **Clonez le dépôt**
   ```bash
   git clone <votre-repo-url>
   cd movie_db_Ia
   ```

2. **Lancez l'application**
   ```bash
   # Ouvrez simplement index.html dans votre navigateur
   # ou utilisez un serveur local
   python -m http.server 8000
   # Puis accédez à http://localhost:8000
   ```

3. **Configurez la clé API**
   - À la première utilisation, un formulaire vous demandera votre clé API TMDB
   - Cette clé sera stockée localement dans le navigateur

## 📁 Structure du Projet

```
movie_db_Ia/
├── index.html          # Page principale
├── css/
│   ├── style.scss      # Styles SASS (source)
│   └── style.css       # Styles compilés
├── js/
│   ├── config.js       # Configuration de l'API
│   ├── api.js          # Classe pour les appels TMDB
│   ├── router.js       # Routeur SPA simple
│   └── main.js         # Application principale
├── assets/             # Images et ressources
├── .env.example        # Variables d'environnement (exemple)
└── README.md           # Ce fichier
```

## 🎯 Fonctionnalités Phase 1

### ✅ Implémentées
- [x] Setup projet (HTML, CSS/SASS, JS)
- [x] Connexion à l'API TMDB
- [x] Gestion de la clé API (stockage local)
- [x] Récupération des films (endpoint populaire et découverte)
- [x] Recherche de films
- [x] Affichage en grille responsive
- [x] Navigation simple (routing de base)
- [x] Design moderne avec thème Netflix-like

### 🔄 En cours / À venir
- [ ] Logique de scoring avancée
- [ ] Filtres personnalisés (genre, année, note)
- [ ] Moteur de recommandation basé sur les préférences
- [ ] Sauvegarde des films favoris
- [ ] Intégration Gitflow complète

## 📚 API Endpoints Utilisés

| Endpoint | Description |
|----------|-------------|
| `/movie/popular` | Films populaires actuels |
| `/discover/movie` | Découverte avec filtres |
| `/search/movie` | Recherche par titre |
| `/movie/{id}` | Détails d'un film |
| `/genre/movie/list` | Liste des genres |

## 🛠 Stack Technologique

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: SASS
- **API**: TMDB API (REST)
- **Storage**: LocalStorage
- **Architecture**: SPA (Single Page Application)

## 💾 Git Workflow

```bash
# Branch main : version stable
# Branch develop : développement en cours
# Feature branches: feat/nom-feature

git branch -a          # Voir toutes les branches
git checkout develop   # Aller sur develop
git checkout -b feat/ma-feature  # Créer une feature
```

## 📖 Utilisation

### Page d'Accueil
- Accès rapide aux principales fonctionnalités
- Affichage des films populaires

### Recherche
- Entrez le titre d'un film
- Résultats en temps réel

### Films Populaires
- Affichage des films tendance du moment
- Ratings et années de sortie

### Découvrir
- Films découverts avec filtrage avancé
- Triés par popularité

## 🔑 Clé API

1. Accédez à https://developer.themoviedb.org/docs/getting-started
2. Inscrivez-vous (gratuit)
3. Générez une clé API
4. Collez-la dans le formulaire de l'application

⚠️ **Importante**: Ne commitez jamais votre clé API!

## 📱 Responsive Design

L'application est optimisée pour :
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

## 🚀 Déploiement

L'application peut être déployée sur :
- GitHub Pages
- Netlify
- Vercel
- Tout serveur web statique

```bash
# Exemple avec GitHub Pages
git push origin main
# Activez Pages dans les paramètres du repo
```

## 👥 Pair Programming

Ce projet est développé en binôme. Utilisez les practices suivantes :

1. **Code Review**: Révisez mutuellement les Pull Requests
2. **Pair Sessions**: Programmez ensemble sur des features complexes
3. **Communication**: Utilisez les issues et les PRs pour la discussion
4. **Testing**: Testez les nouvelles fonctionnalités ensemble

## 📝 Notes de Développement

- Les données sont récupérées en temps réel de TMDB
- Les images des posters proviennent de CDN TMDB
- La clé API est stockée en localStorage (sécurité locale uniquement)

## 🐛 Debug

Ouvrez la console du navigateur (F12) pour voir les logs et déboguer :

```javascript
// Vérifier si l'API est configurée
isApiKeyConfigured();

// Obtenir les films populaires
TMDB_API.getPopularMovies();

// Chercher un film
TMDB_API.searchMovies('Inception');
```

## 📄 Licence

Projet étudiant - Licence libre

## 📧 Support

Pour des questions ou des bugs, créez une issue sur le dépôt.

---

**Dernière mise à jour**: 11 février 2026
