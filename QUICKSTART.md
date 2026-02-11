# ⚡ Quick Start - Démarrage Rapide

Bienvenue! Voici comment commencer **immédiatement** avec le projet.

## 🚀 5 Minutes de Setup

### Étape 1: Récupérer votre Clé API TMDB (2 min)

1. Allez à https://developer.themoviedb.org/docs/getting-started
2. Créez un compte (gratuit)
3. Ouvrez `Settings → API`
4. Copiez votre clé API v3 (Authentication)

### Étape 2: Lancer l'Application (1 min)

```bash
# Option A: Ouvrir directement
open index.html

# Option B: Avec serveur local
cd /Users/jordan/Projet_cloud_campus/movie_db_Ia
python3 -m http.server 8000
# Ouvrir http://localhost:8000
```

### Étape 3: Configurer la Clé (1 min)

1. L'application affiche un formulaire
2. Collez votre clé API
3. Cliquez "Configurer"
4. Voilà! ✨

### Étape 4: Explorer (1 min)

Cliquez sur les pages:
- 🏠 **Accueil** - Bienvenue
- 🔎 **Recherche** - Trouvez un film
- ⭐ **Populaires** - Films tendance
- 🎬 **Découvrir** - Exploration

## 📋 Fonctionnalités Disponibles Phase 1

```
✅ Récupération films TMDB
✅ Recherche par titre
✅ Films populaires
✅ Découverte filtrée
✅ Interface responsive
✅ Navigation SPA
✅ Design moderne
```

## 📂 Fichiers Importants

| Fichier | Rôle |
|---------|------|
| `index.html` | Point d'entrée |
| `js/api.js` | Appels TMDB |
| `js/config.js` | Configuration clé API |
| `js/router.js` | Navigation |
| `js/main.js` | Routes + UI |
| `css/style.css` | Styles |
| `README.md` | Guide complet |
| `CONFIG.md` | Référence technique |
| `TESTING.md` | Tests et validation |

## 🔧 Development

### Voir les logs

Ouvrez DevTools: `F12` ou `Cmd+Option+I`
Console onglet: Tous les logs y sont!

### Tester l'API

Dans la console:

```javascript
// ✅ Vérifier configuration
isApiKeyConfigured()

// ✅ Récupérer films populaires
await TMDB_API.getPopularMovies(1)

// ✅ Chercher film
await TMDB_API.searchMovies('Inception')
```

### Modifier les Styles

Éditez `css/style.scss` puis compilez:

```bash
ruby -r sass -e 'Sass.compile_file("css/style.scss", "css/style.css")'
# ou npm install -D sass && npm run sass:build
```

## 🐛 Problèmes?

| Erreur | Solution |
|--------|----------|
| "Clé API non configurée" | Entrez votre clé dans le formulaire |
| "Aucun film n'apparaît" | Vérifiez la clé API dans DevTools |
| Images manquantes | Vérifiez connexion internet |
| Navigation ne marche pas | Rechargez la page (F5) |

## 📚 Aide Complète

- 📖 **README.md** - Guide complet
- 🔧 **CONFIG.md** - Référence technique détaillée
- ✅ **TESTING.md** - Comment tester
- 🔄 **GITFLOW.md** - Workflow git

## 🤝 Travail en Pair Programming

Vous êtes en binôme? Voici comment:

```bash
# Driver: Créer une feature branch
git checkout -b feature/ma-feature develop

# Navigator & Driver: Travailler ensemble
# ... coding ...

# Faire un commit ensemble
git commit -m "feat: description

Co-authored-by: Partner <partner@example.com>"

# Pousser et faire une PR
git push origin feature/ma-feature
# Faire PR sur GitHub vers develop
```

## 🎯 Prochaines Étapes

Après Phase 1, vous pouvez:

1. **Ajouter des filtres** (genre, année, note)
2. **Créer un moteur de scoring** (recommandations personnalisées)
3. **Favoris** (sauvegarder films préférés)
4. **Détails films** (modal avec plus d'infos)
5. **Persistence** (BDD ou API backend)

## 🚀 Production

Pour déployer:

```bash
# GitHub Pages (gratuit)
git push origin main  # Version produite

# Netlify/Vercel (drag & drop)
Glisser le dossier sur netlify.com

# Serveur personnel
npm run build  # (optionnel pour bundling)
# Uploader le dossier sur votre serveur
```

## 💬 Questions?

1. Vérifiez **CONFIG.md** pour questions techniques
2. Vérifiez **TESTING.md** pour problèmes
3. Ouvrez DevTools (F12) pour déboguer

## ✨ Tricks Bonus

```javascript
// Dans console, voir toutes les routes
Object.keys(router.routes)

// Naviguer depuis console
router.navigate('/popular')

// Modifier la clé API
setApiKey('nouvelle_cle')

// Nettoyer le stockage local
localStorage.clear()
```

---

**Vous êtes prêt! Amusez-vous! 🎉**
