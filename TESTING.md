# 🧪 Guide de Test et Validation

Ce document explique comment tester l'application et valider son fonctionnement.

## ✅ Tests Manuels Phase 1

### 1. Configuration Initiale

**Test**: Lancer l'application sans clé API

```
Expected:
- Écran de configuration s'affiche
- Formulaire avec champ "Clé API TMDB"
- Bouton "Configurer"
- Lien vers developer.themoviedb.org

Steps:
1. Ouvrir index.html dans le navigateur
2. Vérifier que le formulaire apparaît
3. Entrer une clé API valide
4. Cliquer "Configurer"
```

**Test**: Sauvegarder la clé API

```
Expected:
- Clé stockée localement
- Application navigable après configuration
- Même clé utilisée au rechargement

Steps:
1. Ouvrir DevTools (F12)
2. Aller à Storage -> LocalStorage
3. Vérifier présence de tmdb_api_key
4. Rafraîchir la page (F5)
5. Vérifier que la clé est toujours utilisée
```

### 2. Navigation et Routing

**Test**: Navigation entre pages

```
Expected:
- URL change avec #nompage
- Contenu s'actualise sans rechargement
- Boutons et liens data-route fonctionnent

Steps:
1. Cliquer sur "Films Populaires"
2. Vérifier URL devient #/popular
3. Cliquer sur "Recherche"
4. Vérifier URL devient #/search
5. Utiliser boutons "Retour" du navigateur
```

**Test**: Bouton retour navigateur

```
Expected:
- Bouton back fonctionne correctement
- Historique respecté

Steps:
1. Naviguer /home -> /popular -> /search
2. Cliquer retour (browser back)
3. Vérifier que vous retournez à /popular
4. Cliquer retour à nouveau
5. Vérifier que vous retournez à /home
```

### 3. Films Populaires

**Test**: Affichage des films

```
Expected:
- Liste de films affichée en grille
- Images s'affichent correctement
- Titres et notes visibles
- Grid responsive

Steps:
1. Aller à /popular
2. Vérifier que minimum 20 films sont affichés
3. Vérifier que chaque carte a:
   - Poster image
   - Titre
   - Note ⭐
   - Année
4. Redimensionner fenêtre pour tester responsive
```

### 4. Recherche de Films

**Test**: Fonction de recherche

```
Expected:
- Saisir titre fonctionne
- Résultats pertinents retournés
- Aucun résultat bien géré

Steps:
1. Aller à /search
2. Entrer "Inception"
3. Cliquer "Rechercher"
4. Vérifier résultats (min 1)
5. Entrer "zzzzzzzzzzzzz"
6. Vérifier message "Aucun film trouvé"
```

**Test**: Recherche avec Entrée

```
Expected:
- Appuyer sur Entrée déclenche recherche

Steps:
1. Entrer titre dans champ
2. Appuyer sur "Enter"
3. Vérifier que recherche s'exécute
```

### 5. Page Découverte

**Test**: Affichage découverte

```
Expected:
- Films découverts affichés
- Filtrés et triés par popularité

Steps:
1. Aller à /discover
2. Vérifier que minimum 20 films s'affichent
3. Vérifier que films populaires apparaissent
```

## 🧠 Tests de Logique

### Test API Configuration

```javascript
// Dans la console:

// ✅ Test 1: Vérifier configuration
isApiKeyConfigured()  // Doit retourner true

// ✅ Test 2: Vérifier clé stockée
API_CONFIG.apiKey   // Doit afficher votre clé

// ✅ Test 3: Appel API simple
await TMDB_API.getPopularMovies(1)
// Doit retourner objet avec "results" array
```

### Test Routing

```javascript
// Dans la console:

// ✅ Test 1: Vérifier routes enregistrées
console.log(Object.keys(router.routes))
// Doit afficher: ["/home", "/search", "/popular", "/discover", ...]

// ✅ Test 2: Navigation programmatique
router.navigate('/popular')
// Doit charger la page /popular

// ✅ Test 3: Historique
window.history.back()
// Doit retourner à la page précédente
```

## 📱 Tests Responsive

### Device Testing

```
Mobile (375px):
- Menu doit être lisible
- Boutons doivent être cliquables
- Images ne doivent pas déborder
- Texte doit être visible

Tablet (768px):
- Grille doit adapter (2-3 colonnes)
- Navigation lisible
- Espace utilisé efficacement

Desktop (1920px):
- Grille optimale (5-6 colonnes)
- Espacement bon
- Pas de texte trop long
```

### Checklist Responsive

```
☐ Mobile: 375x667
  ☐ Texte lisible (>14px)
  ☐ Boutons cliquables (>44px hauteur)
  ☐ Images responsive
  ☐ Pas de scroll horizontal

☐ Tablet: 768x1024
  ☐ Utilisation espace bien
  ☐ Grille 2-3 colonnes
  ☐ Navigation accessible

☐ Desktop: 1920x1080
  ☐ Grille 5-6 colonnes
  ☐ Espace blanc adéquat
  ☐ Contenu centré
```

## 🔍 Tests de Performance

### Chargement

```javascript
// Mesurer temps requête API
console.time('API call');
await TMDB_API.getPopularMovies(1);
console.timeEnd('API call');

// Doit être < 2 secondes généralement
```

### DevTools Network

```
1. F12 -> Network tab
2. Charger une page
3. Vérifier:
   ☐ Requêtes TMDB < 2s
   ☐ Images chargées progressivement
   ☐ Pas d'erreurs 4xx/5xx
   ☐ Pas de requêtes dupliquées
```

## ⚠️ Tests d'Erreur

### Clé API Invalide

```javascript
// Dans console:
setApiKey('cle_invalide')
await TMDB_API.getPopularMovies()

Expected:
- Erreur 401 Unauthorized
- Message clair à l'utilisateur
```

### Pas de Connexion

```
1. Ouvrir DevTools
2. Network -> Offline
3. Essayer charger une page
4. Attendre erreur réseau

Expected:
- Erreur capturée
- Message utilisateur clair
```

### Requête Vide Search

```
1. Aller à /search
2. Laisser champ vide
3. Cliquer "Rechercher"

Expected:
- Message d'erreur approprié
ou
- Rien ne se passe
```

## 📊 Checklist de Validation Phase 1

### Infrastructure
- [x] Structure dossiers correcte
- [x] Fichiers créés et organisés
- [x] .gitignore configuré
- [x] Repository poussé

### HTML/CSS
- [x] HTML valide et sémantique
- [x] CSS responsive (@media queries)
- [x] Thème cohérent (Netflix-like)
- [x] Images responsive

### JavaScript
- [x] config.js - Configuration API
- [x] api.js - Classe TMDB_API
- [x] router.js - Routing SPA
- [x] main.js - Routes et UI

### API TMDB
- [x] Endpoint populaire (/movie/popular)
- [x] Endpoint découverte (/discover/movie)
- [x] Endpoint recherche (/search/movie)
- [x] Gestion erreurs API
- [x] Clé API sécurisée

### UX/Navigation
- [x] 4 routes fonctionnelles
- [x] Navigation intuitive
- [x] Historique navigateur fonctionne
- [x] URLs sémantiques

### Documentation
- [x] README.md complet
- [x] CONFIG.md technique
- [x] GITFLOW.md workflow
- [x] Code commenté
- [x] TESTING.md (ce fichier)

## 🐛 Résolution de Problèmes

### Problème: "Clé API non configurée"

```
Solution:
1. Entrez votre clé dans le formulaire
2. Vérifiez que la clé est valide
3. Ouvrez DevTools -> Storage -> LocalStorage
4. Vérifiez la présence de tmdb_api_key
```

### Problème: Images ne s'affichent pas

```
Solution:
1. Vérifier console pour erreurs 404
2. Vérifier que poster_path est présent
3. Vérifier URL: https://image.tmdb.org/t/p/w500{path}
4. Vérifier connexion internet
```

### Problème: Recherche ne fonctionne pas

```
Solution:
1. Vérifier clé API valide
2. Vérifier qu'il y a du texte dans le champ
3. Vérifier console pour erreurs
4. Attendre (limit API peut être atteinte)
```

### Problème: Routes ne fonctionnent pas

```
Solution:
1. Vérifier que #/ est bien dans l'URL
2. Vérifier console pour msgs routeur
3. Vérifier que router.init() est appelé
4. Vérifier que router.register() pour la route existe
```

## 📈 Métriques de Succès Phase 1

```
✅ Application démarre sans erreurs
✅ Configuration API fonctionne
✅ Films affichés correctement (min 20)
✅ Recherche retourne résultats
✅ Navigation fonctionne (4+ routes)
✅ Design responsive fonctionnel
✅ Pas d'erreurs console
✅ Code documenté
✅ Repository push sans secrets
✅ Gitflow initialisé (main + develop)
```

## 🎯 Prochaines Étapes (Phase 2)

- [ ] Ajouter filters avancées
- [ ] Moteur de scoring
- [ ] Sauvegarde favoris
- [ ] Détails film (modal/page)
- [ ] Recommendations basées sur genre
- [ ] Tests Unitaires
- [ ] Persistence BDD

---

**Dernière mise à jour**: 11 février 2026
