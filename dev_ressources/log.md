# Journal de développement — Les Petits Plats

Ce fichier consigne, étape par étape, les actions menées pour réaliser le projet décrit
dans le `README.md`. Chaque entrée suit la même structure :

- Analyse de la demande
- Analyse de l'état du code source actuel
- Actions menées
- Tests effectués
- Problèmes rencontrés

---

## Étape 1 — Initialisation du projet

### Analyse de la demande

Initialiser l'application avec `npx create-next-app@latest`, puis copier dans le projet
les données (les 50 recettes au format JSON) ainsi que les 50 images de recettes.
Résultat attendu : l'application Next.js démarre.

Le README recommande de ne pas sélectionner TypeScript en cas de non-familiarité avec la
technologie. Le projet ayant déjà été initialisé en TypeScript lors d'une exécution
précédente, ce choix est conservé : il apporte un typage fort sur les recettes, ce qui
sécurisera le moteur de recherche des étapes 6 et 7.

### Analyse de l'état du code source actuel

Une première exécution de la mission avait déjà été lancée mais s'était interrompue.
L'état trouvé au démarrage était le suivant :

- Commit `516bd64` : application Next.js 16.3.0 initialisée (App Router, TypeScript,
  Tailwind CSS v4, ESLint 9, Turbopack). `npm run build` fonctionne.
- Déplacements **indexés mais non commités** (`git status` : `R`) :
  - `assets/recipes.json` → `data/recipes.json`
  - `assets/images/RecetteNN.jpg` → `public/images/recipes/RecetteNN.jpg` (50 fichiers)
  - ajout de `public/images/hero.jpg` (visuel de la bannière)
- Modification non indexée de `.gitignore` : exception `!/dev_ressources/log.md` pour que
  le présent journal soit versionné alors que le reste de `dev_ressources/` est ignoré.
- Aucun fichier de journal (`dev_ressources/log.md`) n'existait.
- Aucun composant métier : `app/page.tsx` était encore la page de démarrage
  `create-next-app`.

Conclusion : l'étape 1 était réalisée sur le fond mais pas finalisée côté versionnement.
Le travail reprend donc à la clôture de l'étape 1, puis se poursuit à l'étape 2.

### Actions menées

1. Vérification de la structure des données `data/recipes.json` : 50 recettes, 50 `slug`
   uniques, 50 images distinctes. Champs disponibles : `id`, `image`, `name`, `slug`,
   `servings`, `ingredients[]` (`ingredient`, `quantity?`, `unit?`), `time`,
   `description`, `appliance`, `ustensils[]`.
   Point relevé : `quantity` peut être un nombre **ou** une chaîne selon les recettes, et
   peut être absent — le typage devra en tenir compte.
2. Vérification de la présence des 50 images dans `public/images/recipes/` ainsi que du
   visuel de bannière `public/images/hero.jpg`.
3. Lecture des ressources fournies dans `dev_ressources/` : maquettes Figma
   (`Home.png`, `Home-1.png`, `Home search active.png` = page recette,
   `Home search active-1.png` = page 404, `Components.png`), export `figma.css`
   (couleurs et typographies) et fiche « Cas d'utilisation #03 » (règles de gestion du
   moteur de recherche).
4. Création du présent fichier `dev_ressources/log.md`.
5. Finalisation du commit de l'étape 1 (déplacement des données/images + `.gitignore`).

### Éléments de design extraits des maquettes

- Couleurs : jaune `#FFD15B`, noir `#1B1B1B`, gris `#7A7A7A`, fond de page `#EDEDED`.
- Typographies : `Anton` (titres, compteur de recettes) et `Manrope` (textes).
- Bannière : image plein cadre assombrie par un calque noir à 30 %.
- Carte recette : fond blanc, rayon 21 px, image 380 × 253, badge de temps jaune arrondi.

### Tests effectués

- `npm run build` : compilation réussie (Next.js 16.3.0, Turbopack), aucune erreur
  TypeScript, routes `/` et `/_not-found` générées en statique.
- Contrôle du nombre de recettes et de l'unicité des slugs via un script PowerShell
  ponctuel (50 / 50).

### Problèmes rencontrés

- L'exécution précédente s'étant arrêtée sur une limite de quota, il a fallu reconstituer
  son état exact à partir de `git status` et `git log`. Aucun code métier n'ayant été
  produit, aucun travail n'a été perdu ni dupliqué.
- Le fichier `dev_ressources/` étant globalement ignoré par Git, l'exception
  `!/dev_ressources/log.md` déjà présente dans `.gitignore` a été conservée telle quelle.

---

## Étape 2 — Intégration du design de la page d'accueil

### Analyse de la demande

Analyser les maquettes, découper l'interface en composants (bannière, barre de recherche,
sélecteurs de tags, cartes de recette) puis intégrer ces composants dans la page
d'accueil. La carte de recette doit être créée dès cette étape avec des **données
statiques**, afin de n'avoir plus qu'à y brancher le JSON à l'étape 3.

### Analyse de l'état du code source actuel

`app/page.tsx`, `app/layout.tsx` et `app/globals.css` étaient encore ceux générés par
`create-next-app` (logo Next.js, liens vers Vercel, thème clair/sombre par défaut).
Aucun composant, aucun type, aucune police du projet n'existait.

### Découpage retenu

| Composant                   | Rôle                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `SiteHeader`                | Logo, positionné en absolu au-dessus de la bannière           |
| `SiteFooter`                | Bandeau noir de copyright                                     |
| `Hero`                      | Bannière : image, voile noir 30 %, titre ; accepte un enfant   |
| `MainSearchBar`             | Barre de recherche principale                                  |
| `FilterDropdown`            | Sélecteur de recherche avancée (état fermé)                    |
| `RecipeCard`                | Carte de recette (image, badge temps, description, ingrédients)|
| `SearchIcon`                | Icône loupe réutilisée par la barre et les sélecteurs          |

`Hero` reçoit la barre de recherche via `children` : la bannière reste ainsi un Server
Component alors que la barre deviendra un Client Component à l'étape 7.

### Actions menées

1. `app/globals.css` : définition des tokens de design Tailwind v4 (`@theme`) issus de
   `figma.css` — couleurs `brand-yellow`, `brand-black`, `brand-grey`,
   `brand-background`, polices `--font-display` / `--font-sans`, ombre `shadow-card`.
2. `app/layout.tsx` : chargement des polices Google **Anton** (titres) et **Manrope**
   (textes) via `next/font/google`, passage de `lang="fr"`, métadonnées du site,
   structure `SiteHeader` / `main` / `SiteFooter` en colonne pleine hauteur.
3. Création de `lib/types.ts` (types `Recipe` et `RecipeIngredient`) et de
   `lib/format.ts` (`formatQuantity`).
4. Création des composants listés ci-dessus dans `components/`.
5. `app/page.tsx` : assemblage bannière + barre de filtres + compteur de recettes +
   grille de cartes, alimenté par une recette statique.
6. Suppression des cinq SVG de démarrage (`next.svg`, `vercel.svg`, `file.svg`,
   `globe.svg`, `window.svg`) devenus orphelins après la réécriture de `app/page.tsx`.

### Choix d'implémentation

- **Quantités** : la maquette colle l'unité au nombre pour les unités courtes
  (`400ml`, `25cl`) mais l'espace pour les unités longues (`1 cuillère à soupe`).
  `formatQuantity` reproduit ce comportement et affiche `-` quand la recette ne fournit
  aucune quantité, comme sur la maquette.
- **Hauteur des cartes** : la maquette fige les cartes à 731 px avec un
  `overflow-y: scroll`. Ce choix produit une barre de défilement interne peu agréable ;
  les cartes s'adaptent donc à leur contenu et la description est tronquée à quatre
  lignes (`line-clamp-4`), ce qui donne un rendu visuellement identique sans scroll.
- **Grille** : gouttière horizontale de 48 px et verticale de 66 px, mesurées sur les
  positions absolues des cartes dans `figma.css` (`left: 102 / 530 / 958`,
  `top: 843 / 1640`).

### Tests effectués

- `npm run build` : compilation réussie, aucune erreur TypeScript.
- `npx eslint .` : aucun avertissement.
- `npm run dev` puis capture de la page en Chrome headless (1440 × 2600) et comparaison
  visuelle avec `dev_ressources/figma/Home.png` : bannière, titre jaune, barre de
  recherche, trois sélecteurs, compteur et carte conformes.
- Deux écarts détectés lors de cette comparaison et corrigés : gouttière de grille
  (62 px → 48 px) et largeur maximale du titre (954 px → 890 px, soit les 61,8 % de la
  maquette) pour retrouver la même césure.

### Problèmes rencontrés

- La maquette `Home search active.png` ne correspond pas à son nom : il s'agit de la page
  de détail d'une recette, et `Home search active-1.png` est la page 404. Ces deux
  fichiers serviront respectivement aux étapes 4 et 5.
- La bannière étant commune aux trois pages, `SiteHeader` a été placé en
  `position: absolute` dans le layout racine plutôt que dans chaque page, pour éviter de
  dupliquer le logo.

---

## Étape 3 — Affichage des recettes

### Analyse de la demande

Importer le fichier JSON dans la page et boucler sur les recettes pour alimenter la carte
créée à l'étape 2. Résultat attendu : les 50 recettes s'affichent. Point de vigilance :
aucun avertissement dans la console (typiquement l'avertissement React sur les `key`).

### Analyse de l'état du code source actuel

`app/page.tsx` affichait une unique recette codée en dur. `RecipeCard` était déjà typé
avec `Recipe`, il ne restait donc qu'à fournir la vraie source de données.

### Actions menées

1. Création de `lib/recipes.ts`, point d'accès unique aux données : import de
   `data/recipes.json` (activé par `resolveJsonModule`), typage en `Recipe[]` et deux
   fonctions `getAllRecipes()` / `getRecipeBySlug()`. `getRecipeBySlug` est déjà présente
   ici car elle sera consommée par la page de recette à l'étape 4.
2. `app/page.tsx` : suppression de la recette statique, appel à `getAllRecipes()`, boucle
   `map()` sur les recettes avec `key={recipe.id}`, et compteur dynamique accordé en
   nombre (`1 recette` / `50 recettes`).

### Prévention des avertissements de console

- Clé de la liste de recettes : `recipe.id`, unique par construction (vérifié : 50 `id`
  distincts).
- Clé des ingrédients dans la carte : `ingredient.ingredient`. Vérification préalable
  effectuée sur le jeu de données — aucune recette ne répète deux fois le même nom
  d'ingrédient, ni le même ustensile.

### Tests effectués

- `npx tsc --noEmit` : aucune erreur (le `as Recipe[]` est accepté, `quantity` étant typé
  `number | string | undefined`).
- `npx eslint .` : aucun avertissement.
- Requête HTTP sur `http://localhost:3000/` : 50 balises `<article>` présentes dans le
  HTML rendu côté serveur et compteur affichant « 50 recettes ».
- Capture Chrome headless comparée à `Home.png` : grille de trois colonnes, badges de
  temps, ingrédients sur deux colonnes conformes.
- Journal du serveur de développement inspecté (`Warning`, `Error`, `key`) : aucune
  occurrence, le rendu serveur ne produit donc aucun avertissement React.

### Problèmes rencontrés

Aucun. Seule remarque : la maquette prévoit six emplacements d'ingrédients par carte
(le sixième étant masqué quand il n'existe pas), alors que le composant affiche
l'intégralité des ingrédients de la recette — comportement volontairement conservé
puisqu'il évite de masquer de l'information.

---

## Étape 4 — Page de recette

### Analyse de la demande

Créer une route dynamique permettant d'afficher une recette, récupérer la recette via les
`params` et intégrer la page d'après la maquette. Résultat attendu : l'URL
`/recette/poisson-cru-a-la-tahitienne` affiche la bonne page. Recommandation : créer un
dossier `recette` avant le dossier de route dynamique. Point de vigilance : gérer les cas
d'erreur lorsque l'URL est saisie manuellement.

### Analyse de l'état du code source actuel

Le projet ne comportait qu'une seule route (`/`). `getRecipeBySlug()` avait déjà été
créée à l'étape 3 mais n'était consommée nulle part. Les cartes de recette n'étaient pas
cliquables. La bannière était codée directement dans `Hero`, or la page de recette en a
besoin dans une version réduite en hauteur.

Point important sur la maquette : le fichier nommé `Home search active.png` est en
réalité la maquette de la page de détail d'une recette. C'est donc elle qui a servi de
référence.

### Actions menées

1. Extraction d'un composant `components/Banner.tsx` (image, voile sombre, contenu
   optionnel), et réécriture de `Hero` pour s'appuyer dessus. La page de recette utilise
   le même composant avec `h-[120px]`, conformément à la maquette.
2. Création de la route `app/recette/[slug]/page.tsx` :
   - `const { slug } = await props.params` — dans Next.js 16 les `params` sont une
     promesse, ils doivent être attendus ;
   - typage par le helper global `PageProps<"/recette/[slug]">` généré par Next.js ;
   - `generateStaticParams()` : les 50 recettes sont prérendues à la compilation ;
   - `generateMetadata()` : le titre de l'onglet reprend le nom de la recette ;
   - mise en page deux colonnes (visuel carré à gauche, contenu à droite) avec les
     sections Temps de préparation / Ingrédients / Ustensiles nécessaires / Appareils
     nécessaires / Recette, dans l'ordre de la maquette.
3. `RecipeCard` : la carte entière est désormais enveloppée dans un `<Link>` vers
   `/recette/{slug}`, avec un anneau de focus visible au clavier.
4. Gestion du cas d'erreur : appel à `notFound()` de `next/navigation` lorsque le slug ne
   correspond à aucune recette. La page 404 personnalisée est traitée à l'étape 5.

### Tests effectués

- `npx tsc --noEmit` et `npx eslint .` : aucune erreur.
- `GET /recette/poulet-coco-reunionnais` → **200**.
- `GET /recette/ma-recette` (slug inexistant) → **404**.
- Capture Chrome headless comparée à `Home search active.png` : bandeau court avec logo,
  visuel carré, titre, badge jaune de temps, ingrédients sur trois colonnes, ustensiles,
  appareil et description — rendu conforme.

### Problèmes rencontrés

- Le nom trompeur de la maquette (`Home search active.png` pour la page recette) a
  nécessité d'ouvrir chaque PNG pour identifier son contenu réel.
- La maquette affiche une quantité sous chaque ustensile (« Couteau / 1 »), information
  absente du JSON : seul le libellé de l'ustensile est donc affiché.
- La maquette présente la recette sous forme de liste d'étapes numérotées, alors que le
  JSON ne fournit qu'un unique champ `description` en texte continu. La description est
  donc rendue telle quelle, complétée par le nombre de personnes (`servings`), donnée
  disponible et utile qui n'apparaissait nulle part ailleurs.

---

## Étape 5 — Gestion de l'erreur 404

### Analyse de la demande

Rediriger l'utilisateur vers une page d'erreur lorsque la recette saisie dans l'URL
n'existe pas, en créant un composant `not-found`. Résultat attendu : `recette/ma-recette`
renvoie la page 404. Recommandation : le placement du composant détermine sa portée ; il
est possible d'en placer un à la racine de `app` et un dans chaque sous-dossier.

### Analyse de l'état du code source actuel

L'appel à `notFound()` avait déjà été ajouté à l'étape 4 dans
`app/recette/[slug]/page.tsx` — la route renvoyait donc bien un statut 404, mais avec la
page d'erreur générique de Next.js, sans rapport avec la charte du site. Aucun fichier
`not-found` n'existait. La maquette correspondante est `Home search active-1.png`.

### Actions menées

1. Création de `components/NotFoundScreen.tsx` : bannière pleine hauteur réutilisant
   `Banner` avec un voile plus sombre (`bg-black/70`, conforme à la maquette), le code
   « 404 :( » en jaune et un message paramétrable.
2. Création de deux composants `not-found`, comme le suggère la recommandation :
   - `app/not-found.tsx` (racine) — « La page que vous demandez est introuvable. » ;
   - `app/recette/not-found.tsx` — « La recette que vous demandez est introuvable. »,
     message plus précis pour les slugs de recette invalides.
3. `app/layout.tsx` : passage de `<main>` en `flex flex-1 flex-col` afin que la bannière
   404 puisse occuper toute la hauteur restante entre l'en-tête et le pied de page.

### Tests effectués

- `GET /recette/ma-recette` → **404**, page « La recette que vous demandez est
  introuvable. ».
- `GET /une-page-inexistante` → **404**, page « La page que vous demandez est
  introuvable. ».
- `GET /recette/poulet-coco-reunionnais` → toujours **200**.
- Capture Chrome headless comparée à `Home search active-1.png` : mise en page conforme.
- `npx eslint .` : aucun avertissement.
- `npm run build` : 54 pages générées, dont les 50 recettes en SSG.

### Problèmes rencontrés

- La première capture de la page 404 est sortie sans l'image de fond, uniquement avec le
  voile sombre. Fausse alerte : en mode développement l'optimiseur d'images de Next.js
  génère le fichier à la première requête, et le budget de temps virtuel du navigateur
  headless (8 s) expirait avant. Avec 25 s, l'image s'affiche correctement. Le rendu réel
  n'était donc pas en cause.

---

## Étape 6 — Recherche par tags

### Analyse de la demande

Récupérer les tags des recettes, garantir leur unicité, les afficher dans leur liste
respective et rendre la sélection fonctionnelle. Résultats attendus : recherche à
l'intérieur de chaque champ de tag, tag sélectionné affiché dans la liste des tags
sélectionnés et retiré de la liste des tags disponibles, liste des recettes actualisée,
listes de tags actualisées en fonction des recettes disponibles.

La fiche « Cas d'utilisation #03 » précise en outre :
- règle 5 : les champs ne proposent que les éléments restant dans les recettes affichées ;
- règle 6 : les résultats sont une **intersection** (« coco » ET « chocolat ») ;
- règle 8 : aucune librairie pour le moteur de recherche.

### Analyse de l'état du code source actuel

`FilterDropdown` n'était qu'un bouton décoratif, sans état ni options. Aucune logique de
recherche n'existait. `app/page.tsx` était un Server Component qui affichait directement
la totalité des recettes ; la recherche a besoin d'un état client partagé entre la barre
de recherche (dans la bannière) et la grille de résultats.

### Actions menées

1. **`lib/search.ts`** — moteur de recherche, écrit sans aucune dépendance :
   - `normalize()` : passage en minuscules et suppression des accents via
     `normalize("NFD")` puis retrait du bloc de diacritiques combinantes, pour que
     « Crème de Coco » et « creme de coco » soient équivalents ;
   - `indexRecipes()` : chaque recette est normalisée **une seule fois** en un index
     `{ recipe, tags: { ingredients, appliances, ustensils } }`, afin que le filtrage
     n'ait rien à recalculer à chaque frappe ;
   - `filterRecipes()` : conserve les recettes portant **tous** les tags sélectionnés,
     ce qui implémente l'intersection de la règle 6 ;
   - `collectOptions()` : construit la liste d'un sélecteur à partir des recettes
     **actuellement affichées** (règle 5), dédoublonne par valeur normalisée, retire les
     tags déjà sélectionnés (point de vigilance) et trie avec `localeCompare(…, "fr")`.
2. **`components/RecipeExplorer.tsx`** (Client Component) — chef d'orchestre : détient
   l'état `selectedTags`, mémoïse l'index, calcule les résultats et les options, puis
   rend la bannière, les sélecteurs, les tags sélectionnés, le compteur et la grille.
3. **`components/FilterDropdown.tsx`** — sélecteur devenu interactif : ouverture /
   fermeture, champ de recherche interne filtrant les options (scénario nominal, point 6),
   tags sélectionnés épinglés en jaune en haut de la liste avec une croix, fermeture au
   clic extérieur et à la touche `Échap`.
4. **`components/SelectedTag.tsx`** — pastille jaune affichée sous les sélecteurs.
5. **`app/page.tsx`** — réduit à la lecture des données et au rendu de `RecipeExplorer`.

### Choix d'implémentation

- **Identité des tags** : la valeur normalisée sert de clé et de critère de comparaison,
  tandis qu'un libellé unifié (minuscules + initiale capitalisée) est affiché. Le jeu de
  données mélange en effet les casses (`couteau` / `Couteau`, `Lait de coco` /
  `Lait de Coco`) ; sans cela, le même tag apparaîtrait plusieurs fois dans la liste.
- **Persistance dans l'URL** : proposée en option (« Allez plus loin ») dans le README,
  elle n'a pas été implémentée afin de ne pas ajouter de fonctionnalité non demandée.

### Tests effectués

Un scénario Playwright (exécuté hors du dépôt, dans le dossier temporaire de travail)
pilote un vrai navigateur sur `http://localhost:3000/`. Tous les points sont au vert :

| Vérification                                                              | Résultat            |
| ------------------------------------------------------------------------- | ------------------- |
| 50 recettes et compteur « 50 recettes » au chargement                      | OK                  |
| Liste « Ingrédients » alimentée                                            | 121 options         |
| Saisie de « coco » dans le champ                                           | Crème de coco, Lait de coco |
| Sélection de « Lait de coco » → filtrage des recettes                      | 3 recettes          |
| Compteur synchronisé avec les résultats                                    | OK                  |
| Tag sélectionné retiré de la liste des disponibles (épinglé une seule fois) | OK                  |
| Fermeture du panneau avec `Échap`                                          | OK                  |
| Pastille jaune du tag sélectionné affichée                                 | OK                  |
| Liste « Appareils » restreinte aux recettes restantes                      | Blender, Cocotte, Saladier |
| Intersection de deux tags                                                  | 1 recette           |
| Retrait d'un tag → élargissement des résultats                             | OK                  |
| Erreurs dans la console du navigateur                                      | aucune              |

Captures comparées aux maquettes `Components.png` (sélecteur ouvert avec « coco ») et
`Home-1.png` (pastille jaune sous les sélecteurs) : rendu conforme.
`npx tsc --noEmit` et `npx eslint .` : aucune erreur.

### Problèmes rencontrés

- Aucune librairie n'étant autorisée pour le moteur de recherche (règle 8), tout est
  écrit en JavaScript natif ; Playwright n'est utilisé que pour **tester**, en dehors du
  dépôt, et n'est donc pas une dépendance du projet.
- Le motif regex `\p{Diacritic}` échoue à la compilation avec la cible `ES2017` du
  `tsconfig.json`. Le bloc de diacritiques combinantes est donc écrit explicitement.
- Premier jet des boutons de suppression : le libellé « Retirer le filtre » était un
  `<span class="sr-only">` juxtaposé, ce qui allongeait le nom accessible du bouton. Il a
  été remplacé par un `aria-label` explicite.

---

## Étape 7 — Recherche principale

### Analyse de la demande

Analyser l'entrée utilisateur dans plusieurs champs (titre, ingrédients, description).
Recommandations : noter les critères de réussite, identifier tous les champs concernés, ne
lancer la recherche qu'à partir de 3 caractères. Points de vigilance : gérer les
majuscules et les accents oubliés, et limiter la fréquence d'exécution avec un
« debounce ».

Critères retenus, issus de la fiche « Cas d'utilisation #03 » :

1. la recherche porte sur **le titre, la liste des ingrédients et la description** ;
2. elle se déclenche à partir de **3 caractères** et s'actualise à chaque caractère ;
3. elle est insensible à la casse et aux accents ;
4. les champs de recherche avancée se recalculent sur les recettes restantes ;
5. sans résultat, l'interface affiche « Aucune recette ne contient "XXX" vous pouvez
   chercher « tarte aux pommes », « poisson », etc. » (scénario alternatif A1) ;
6. recherche principale et tags se combinent.

### Analyse de l'état du code source actuel

`MainSearchBar` était encore un champ non contrôlé et purement décoratif. `filterRecipes`
ne traitait que les tags, et `RecipeExplorer` ne détenait pas d'état de saisie. Toute
l'infrastructure (index normalisé, mémoïsation, calcul des options à partir des résultats)
mise en place à l'étape 6 était en revanche directement réutilisable.

### Actions menées

1. **`lib/search.ts`** :
   - ajout de `MIN_QUERY_LENGTH = 3` ;
   - ajout d'un champ `haystack` à l'index : titre, ingrédients et description normalisés
     et concaténés une seule fois, séparés par ` | ` pour qu'une correspondance ne puisse
     pas chevaucher deux champs ;
   - `filterRecipes()` accepte désormais une `query` : en dessous de 3 caractères elle est
     ignorée, au-delà elle est normalisée puis recherchée dans le `haystack`. Les tags
     continuent de s'appliquer, la recherche textuelle et les tags se cumulent donc.
2. **`lib/useDebouncedValue.ts`** : hook générique qui ne renvoie la valeur qu'après
   200 ms de stabilité.
3. **`components/MainSearchBar.tsx`** : champ contrôlé (`value` / `onChange`) avec un
   bouton d'effacement affiché dès que la saisie n'est pas vide, comme sur `Components.png`.
4. **`components/RecipeExplorer.tsx`** : état `query`, valeur débouncée passée au moteur,
   et bloc de résultat vide affichant le message du scénario A1 avec le terme recherché
   (ou un message générique si aucun résultat ne provient d'une recherche textuelle).

### Choix d'implémentation

- **Algorithme** : recherche de sous-chaîne sur une chaîne pré-normalisée par recette.
  Le coût par frappe est donc 50 `String.includes` sur des chaînes déjà en minuscules et
  sans accents : la normalisation, qui est la partie coûteuse, n'est faite qu'une fois au
  chargement. Cela répond à la règle 4 (« afficher les premiers résultats le plus
  rapidement possible ») sans recourir à une structure de données plus complexe, qui
  serait démesurée pour 50 recettes.
- **Délai de debounce** : 200 ms. Assez long pour absorber une frappe rapide, assez court
  pour que la liste paraisse réagir immédiatement.
- **Valeur affichée / valeur filtrée** : le champ reste piloté par `query` (aucune latence
  de saisie visible), seul le filtrage utilise `debouncedQuery`.

### Tests effectués

Scénario Playwright dédié, exécuté sur `http://localhost:3000/`. Tous les points au vert :

| Vérification                                                        | Résultat                             |
| ------------------------------------------------------------------- | ------------------------------------ |
| 50 recettes au chargement                                            | OK                                   |
| 2 caractères (« co ») ne filtrent pas                                | 50 recettes                          |
| 3 caractères (« coc ») déclenchent la recherche                      | 6 recettes                           |
| Recherche dans le **titre** (« Tarte aux pommes »)                   | Tarte aux pommes                     |
| Recherche dans les **ingrédients** (« macaronis », absent des titres et des descriptions) | Salade de pâtes |
| Recherche dans la **description** (« blender »)                      | 4 recettes                           |
| Insensibilité casse + accents (« CRÈME » vs « creme »)               | 16 = 16                              |
| Aucun résultat (« zzzzz ») → message A1 citant le terme              | message conforme                     |
| Bouton d'effacement                                                  | retour à 50 recettes                 |
| Sélecteurs recalculés après recherche (« chocolat »)                 | 8 recettes → Casserole, Four, Moule à charlotte, Poêle à crêpe |
| Combinaison recherche principale + tag                               | 2 recettes                           |
| Debounce (8 frappes à 40 ms d'intervalle)                            | 1 seule mise à jour de la grille     |
| Erreurs dans la console du navigateur                                | aucune                               |

Autres contrôles : `npx tsc --noEmit`, `npx eslint .` et `npm run build` (54 pages
générées) passent sans erreur ni avertissement.

### Problèmes rencontrés

- Premier test « recherche dans les ingrédients » en échec avec le terme « poireau » :
  faux négatif du test, pas du code — la recette « Soupe de poireaux » contient le mot
  dans son titre, la correspondance pouvait donc venir du titre. Le terme a été remplacé
  par « macaronis », vérifié absent de tous les titres et de toutes les descriptions du
  jeu de données, ce qui prouve que la correspondance vient bien des ingrédients.

---

## Bilan

Les sept étapes du projet sont réalisées et commitées séparément. L'application couvre :

- la page d'accueil conforme aux maquettes, avec les 50 recettes ;
- la page de détail d'une recette sur `/recette/{slug}`, prégénérée pour les 50 recettes ;
- deux pages 404 personnalisées ;
- la recherche par tags (ingrédients, appareils, ustensiles) en intersection ;
- la recherche principale sur titre, ingrédients et description, à partir de 3 caractères,
  insensible à la casse et aux accents, avec debounce ;
- l'actualisation croisée : les sélecteurs ne proposent que les valeurs restantes, et
  recherche principale et tags se combinent.

Point volontairement non traité à ce stade : la persistance des critères de recherche dans
l'URL, présentée comme optionnelle (« Allez plus loin ») dans le README. Elle est traitée
à l'étape 9.

---

## Étape 8 — Passage de TypeScript à JavaScript

### Analyse de la demande

Demande explicite : convertir le projet en JavaScript. Le README recommandait en effet de
ne pas sélectionner TypeScript lors de l'initialisation ; le projet avait été initialisé en
TypeScript lors de l'exécution précédente, ce choix est donc annulé.

### Analyse de l'état du code source actuel

23 fichiers TypeScript : 5 routes `.tsx`, 11 composants `.tsx`, 5 modules `lib/*.ts`,
`next.config.ts` et `next-env.d.ts`, plus `tsconfig.json`. La configuration ESLint
chargeait `eslint-config-next/typescript`, et `package.json` déclarait `typescript` et les
trois paquets `@types/*`.

Le typage n'était utilisé que pour la documentation interne (aucun générique complexe),
la conversion est donc mécanique : suppression des annotations, des `type`/`typedef` et
des assertions `as`.

### Actions menées

1. Renommage de tous les fichiers : `.tsx` → `.jsx`, `.ts` → `.js`, suppression des
   annotations de type, des types importés et des assertions.
2. `lib/types.ts` supprimé. Le contrat de données n'est pas perdu pour autant : les
   formes `Recipe` et `RecipeIngredient` sont décrites en **JSDoc** dans
   `lib/recipes.js`, et les autres modules y font référence avec
   `import("@/lib/recipes").Recipe`. L'éditeur conserve ainsi l'autocomplétion et la
   vérification, sans compilateur TypeScript.
3. Les helpers de types de Next.js (`LayoutProps<"/">`, `PageProps<"/recette/[slug]">`,
   `Metadata`) sont remplacés par de la simple déstructuration de props.
4. `tsconfig.json` → `jsconfig.json`, qui conserve l'alias de chemin `@/*`.
5. `next.config.ts` → `next.config.mjs` (typage conservé via le commentaire JSDoc
   `@type {import('next').NextConfig}`).
6. `eslint.config.mjs` : retrait de `eslint-config-next/typescript` et de l'ignore
   `next-env.d.ts`.
7. `package.json` : désinstallation de `typescript`, `@types/node`, `@types/react`,
   `@types/react-dom`. Il ne reste que Next, React, Tailwind et ESLint.
8. `.gitignore` : suppression de la section TypeScript (`*.tsbuildinfo`, `next-env.d.ts`).
9. Suppression de `next-env.d.ts` et du cache `.next`.

### Tests effectués

- `npx eslint .` : aucun avertissement.
- `npm run build` : 54 pages générées, **aucun `tsconfig.json` régénéré** — la preuve que
  plus aucun fichier TypeScript ne subsiste dans le projet.
- Les deux scénarios Playwright des étapes 6 et 7 rejoués tels quels sur la version
  JavaScript : **27 contrôles sur 27 au vert**, aucune régression fonctionnelle.

### Problèmes rencontrés

- Première tentative de suppression en échec silencieux sur
  `app/recette/[slug]/page.tsx` : sous PowerShell, `Remove-Item` interprète `[slug]` comme
  une classe de caractères générique, le chemin ne correspondait donc à aucun fichier. Le
  build suivant a détecté le `.tsx` resté en place, régénéré un `tsconfig.json` et échoué
  sur des modules introuvables (les `.ts` voisins ayant, eux, bien été supprimés). Corrigé
  en utilisant `Remove-Item -LiteralPath`, puis en supprimant le `tsconfig.json` et le
  `next-env.d.ts` recréés automatiquement.
