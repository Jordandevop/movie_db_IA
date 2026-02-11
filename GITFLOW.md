# 🔄 Git Workflow - Gitflow

Ce projet utilise le **Gitflow Workflow** pour une meilleure organisation du développement en binôme.

## 📊 Structure des Branches

```
main (production - version stable)
  ↑
  └─── develop (intégration - branche de dev principale)
         ├─── feature/feature-name
         ├─── feature/autre-feature
         └─── bugfix/bug-name
```

## 🌳 Branches Principales

### `main`
- **Branche de production**
- Contient uniquement les versions stables et testées
- Chaque commit = une release
- ⚠️ Ne jamais commit directement ici

### `develop`
- **Branche de développement**
- État courant du développement
- Base pour les branches de feature
- Toujours testée et fonctionnelle

## 🚀 Branching Strategy

### Créer une nouvelle Feature

```bash
# 1. Assurez-vous d'être à jour
git checkout develop
git pull origin develop

# 2. Créez une branche feature
git checkout -b feature/nom-descriptif-feature

# 3. Travaillez sur votre feature
# ... coding ...

# 4. Commitment régulier
git add .
git commit -m "feat: description claire de la feature"

# 5. Push de la branche
git push -u origin feature/nom-descriptif-feature

# 6. Créez une Pull Request (PR) sur GitHub
# - Title: feat: description
# - Description: détails, contexte, tests
# - Target: develop
```

### Merger une Feature

```bash
# Code review et discussion
# ✅ Une fois approuvée:

git checkout develop
git pull origin develop
git merge --no-ff feature/nom-feature
git push origin develop

# Supprimer la branche
git branch -d feature/nom-feature
git push origin --delete feature/nom-feature
```

### Créer une Release

```bash
# 1. Depuis develop
git checkout -b release/v1.0.0 develop

# 2. Ajustements de release (version, changelog)
echo "1.0.0" > VERSION

# 3. Commit
git commit -am "chore: release v1.0.0"

# 4. Merge dans main
git checkout main
git merge --no-ff release/v1.0.0 -m "Release v1.0.0"
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags

# 5. Merge back dans develop
git checkout develop
git merge --no-ff release/v1.0.0
git push origin develop

# 6. Supprimer la branche
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

### Hotfix (urgence production)

```bash
# 1. Depuis main
git checkout -b hotfix/nom-fix main

# 2. Correction rapide
# ... coding ...

# 3. Commit
git commit -am "fix: description du fix courte"

# 4. Merge dans main
git checkout main
git merge --no-ff hotfix/nom-fix
git tag -a vX.X.X -m "Hotfix"
git push origin main --tags

# 5. Merge back dans develop
git checkout develop
git merge --no-ff hotfix/nom-fix
git push origin develop

# 6. Nettoyage
git branch -d hotfix/nom-fix
git push origin --delete hotfix/nom-fix
```

## 📝 Convention de Commits

Utilisez le format conventionnel:

```
<type>(<scope>): <sujet>

<corps>

<footer>
```

### Types:
- **feat**: nouvelle fonctionnalité
- **fix**: correction de bug
- **docs**: documentation
- **style**: formatting, missing semicolons
- **refactor**: restructuration de code
- **perf**: amélioration de performance
- **test**: ajout/modification tests
- **chore**: tâches de build, dépendances

### Exemples:

```bash
git commit -m "feat(search): ajout filtre par genre"
git commit -m "fix(api): handle erreur API timeout"
git commit -m "docs: mise à jour README"
git commit -m "refactor(router): simplifier navigation"
```

## ☑️ Checklist Pull Request

Avant de créer une PR:

- [ ] Code est testé et fonctionne
- [ ] Pas de console.error ou console.log inutiles
- [ ] Code suit la convention de style du projet
- [ ] Commits sont significatifs et commentés
- [ ] PR description explique bien les changements
- [ ] Tests passent (si applicable)
- [ ] Pas de secrets ou informations sensibles

## 🤝 Pair Programming Workflow

Quand vous faites du pair programming:

```bash
# Navigator crée et push la branche
git checkout -b feature/pair-feature develop
git push -u origin feature/pair-feature

# Driver et Navigator travaillent ensemble
# Commits signés par les deux:
git commit --author="Driver <driver@example.com>" \
           --message="message avec co-authorship"
```

Ou utiliser GitHub Co-authors:

```
feat: description

Co-authored-by: Driver <driver@example.com>
Co-authored-by: Navigator <navigator@example.com>
```

## 📋 Status et Vérification

```bash
# Voir toutes les branches
git branch -a

# Voir les branches supprimées localement mais présentes remote
git fetch origin --prune

# Voir l'historique
git log --oneline --graph --all --decorate

# Voir les branches non mergées
git branch --no-merged develop
```

## 🚫 Ce qu'il NE FAUT PAS faire

❌ **Ne pas:**
- Merger directement dans `main` (sauf hotfix)
- Commit directement sur `develop` (utiliser des PRs)
- Rebaser sur `main` (utiliser `--no-ff`)
- Modifier l'historique des branches partagées (`git push -f`)
- Commit de secrets/clés API

✅ **À la place:**
- Utilisez les PRs pour code review
- Testez avant de merger
- Utilisez les tags pour les versions
- Discutez des changements significatifs

## 📚 Ressources

- [Git Workflow Visualization](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## 👥 Contact

Pour des questions sur la workflow, contactez les contributeurs du projet.

---

**Version**: 1.0  
**Dernière mise à jour**: 11 février 2026
