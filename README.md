# Les Petits Plats

## Comment allez-vous procéder ?

Cette mission suit un scénario de projet professionnel.  
Vous pouvez suivre les étapes pour vous aider à réaliser vos livrables.

Avant de démarrer, nous vous conseillons de :

- lire toute la mission et ses documents liés ;
- prendre des notes sur ce que vous avez compris ;
- consulter les étapes pour vous guider ;
- préparer une liste de questions pour votre première session de mentorat.

## Prêt à mener la mission ?

Vous êtes Développeur Front-End freelance pour l’entreprise **Les petits plats**.

![](https://user.oc-static.com/upload/2025/06/04/17490321831118_Screenshot%202025-06-04%20at%2012.16.14.png)

Après avoir publié plusieurs livres de recettes de cuisine, l'entreprise souhaite avoir un site internet contenant, pour
commencer, ses 50 recettes les plus populaires

Elle souhaite que le site soit simple : une page d’accueil sur laquelle il est possible de chercher une recette et y
accéder. Sandra, la cheffe de projet, vous envoie un message :

<table><colgroup><col></colgroup><tbody><tr><td><p dir="ltr"><strong>De</strong> : Sandra</p><p dir="ltr"><strong>A</strong> : Vous</p><p dir="ltr"><strong>Objet</strong> : Lancement du site Les Petits Plats</p></td></tr><tr><td><p dir="ltr">Bonjour !&nbsp;</p><p dir="ltr">&nbsp;</p><p dir="ltr">Ravie de t’avoir dans l’équipe pour cette nouvelle étape du projet !</p><p dir="ltr">&nbsp;</p><p dir="ltr">Ce projet est pour nous une première étape vers la digitalisation.<br>Nous voulons que le site internet permette de voir la liste des recettes, de chercher une recette spécifique selon différents critères, et d’afficher la recette voulue, comme le montre <a class="custom-link" href="https://www.figma.com/design/08aVw3Mso2dPnFNkhSxQbW/Les-petits-plats---Maquette-2.0?t=vVNgvUEKe6IBoFN0-0">la maquette Figma</a>.&nbsp;</p><p dir="ltr"><br>Nous n’avons pas de base de données à proprement parler mais je te mets en pièces jointes :&nbsp;</p><ul><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation">un fichier JavaScript contenant un tableau JSON de 50 recettes (celles que nous voulons afficher sur le site).&nbsp;</p></li><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation">Les 50 images pour les recettes ;</p></li><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation">La description du cas d’utilisation de recherche.</p></li></ul><p>&nbsp;</p><p dir="ltr" role="presentation">Merci et bon travail !</p><p dir="ltr">Sandra</p></td></tr><tr><td><p dir="ltr"><strong>Pièces jointes </strong>:&nbsp;</p><ul><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation"><a class="custom-link" href="https://github.com/OpenClassrooms-Student-Center/P4-JS-mission-petits-plats">Le fichier contenant les recettes</a></p></li><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation"><a class="custom-link" href="https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/JS/P7/JSON+recipes.zip">Les images des recettes</a></p></li><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation"><a class="custom-link" href="https://course.oc-static.com/projects/516_JS/P7/Cas+d%E2%80%99utilisation+%2303+_+Filtrer+les+recettes+dans+l%E2%80%99interface+utilisateur+-+Front-end+P6+(Algorithms)+.pdf">La description du cas d’utilisation de recherche</a></p></li><li dir="ltr" aria-level="1"><p dir="ltr" role="presentation"><a class="custom-link" href="https://www.figma.com/design/08aVw3Mso2dPnFNkhSxQbW/Les-petits-plats---Maquette-2.0?t=vVNgvUEKe6IBoFN0-0">La maquette de la page sur Figma</a></p></li></ul></td></tr></tbody></table>

Cette mission est entièrement guidée.  
Vous pouvez suivre les étapes ci-dessous.

---

## Étapes

### Étape 1 Initialisez le projet

Initialisez votre application à l’aide de `npx create-next-app@latest` .

Copiez les données ainsi que les images dans le projet.

### **Résultat attendu**

- Vous pouvez lancer l’application Next.JS

### **Recommandations**

- Lors de l’installation de l’application Next, assurez vous bien de ne pas sélectionner Typescript si vous n’êtes pas
  familier avec cette technologie.

### **Ressources**

- La documentation de Next.Js
  indiquant [le processus d’installation](https://nextjs.org/docs/app/getting-started/installation) .

### Étape 2 - Intégrez le design de la page d’accueil

Commencez par analyser les maquettes et voyez comment découper les différents composants (bannière, barre de recherche,
sélecteurs de tags et cartes de recette). Puis, intégrez les différents composants dans la page.

### **Résultat attendu**

- La page d'accueil avec la structure principale

### **Recommandations**

- Créez le composant de la carte de recette durant cette étape avec des données statiques, vous n’aurez ainsi plus qu’à
  intégrer les données depuis le json.

### **Ressources**

- La [documentation de React relative au découpage de l’UI en composants](https://react.dev/learn/describing-the-ui)

### Étape 3 - Afficher les recettes

Maintenant que le design de votre page d’accueil est intégré, vous pouvez récupérer les recettes.

Comme vous avez un fichier json, vous pouvez simplement l’importer dans votre page puis faire une boucle sur les
recettes afin d’appliquer à la carte recette les éléments dont vous avez besoin.

### **Résultat attendu**

- La page d’accueil doit afficher toutes les recettes

### **Points de vigilance**

- En créant votre boucle assurez vous qu’il n’y ai pas de warning dans la console

### **Ressources**

- Le [rendu des listes](https://react.dev/learn/rendering-lists) dans la documentation de React

### Étape 4 - Créer la page de recette

Maintenant que la mise en page de notre page d’accueil est finalisée, il est temps de passer à la page de recette.

Commencez par créer une route qui vous permettra de récupérer les recettes.  
Puis, dans le fichier page.jsx, récupérez la recette transmise grâce aux params, et intégrez la page en vous basant sur
le design de la maquette.

Une fois de plus, pensez à bien analyser les composants.

### **Résultat attendu**

- La route dédiée à l’affichage dynamique des recettes est disponible

- Lorsque l’on rentre une route comme `http://127.0.0.1:3000/recette/poisson-cru-a-la-tahitienne` nous avons la bonne
  page de recette affichée

### **Recommandations**

- Créez un dossier recette avant le dossier de route dynamique. Cela vous permet de savoir à quoi correspondent les
  pages via l'URL.

### **Points de vigilance**

- N’oubliez pas de gérer les cas d’erreur, en particulier si la personne rentre l’url manuellement dans le navigateur.

### **Ressources**

-

La [documentation de Next.JS sur la navigation entre les pages](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)

### Étape 5 - Gérer l’erreur 404

Avant de passer à la fonction de recherche, il faut s'assurer que l’utilisateur soit redirigé vers une page d’erreur si
la recette entrée dans l’url n’existe pas. Pour cela, créez un composant `not-found.jsx`.

Dans la page.jsx, ajoutez une condition notFound () de next/navigation si aucun restaurant ne correspond au slug indiqué
dans l’url.

### **Résultat attendu**

- Lorsque l’on rentre un slug qui n’existe pas dans l’url, comme par exemple `recette/ma-recette`, alors la page 404 est
  renvoyée.

### **Recommandations**

- Choisissez bien où placer votre composant not-found.jsx. En fonction de l’endroit où il est placé, il pourra être
  affiché à différents endroits de l’application. Si vous voulez des 404 personnalisées pour les différents niveaux vous
  pouvez en mettre une à la racine de `app` et une autre dans chaque sous dossier.

### **Ressources**

La [documentation sur la fonction notFound de next/navigation](https://nextjs.org/docs/app/api-reference/functions/not-found)

### Étape 6 - Mettre en place de la recherche par tag

Pour implémenter la recherche, commencez par la recherche par tag. Pour cela, il vous faut :

- Récupérer les tags des différentes recettes

- Vérifier que chaque tag n’est présent qu’une fois dans les listes,

- puis afficher les tags dans leur liste respective. Vous utiliserez un state dans le composant tag pour faire
  fonctionner la recherche, mais il vous faudra aussi renvoyer à la page le tag sélectionné.

### **Résultat attendu**

- Dans le champ de tag, il est possible de chercher en fonction d’une valeur entrée dans le champ de recherche

- Une fois le tag sélectionné, il apparaît dans la liste des tags sélectionnés et disparaît de la liste des tags
  disponible.

- La liste des recettes est actualisée en fonction du tag sélectionné.

- Les listes des différents tags disponibles est actualisée en fonction des recettes disponibles.

### **Recommandations**

- Commencez par rendre les tags cliquables. Assurez-vous que la sélection du tag mette bien à jour les recettes

- Mettez en place la recherche à l’intérieur des tags en gérant le state des tags et en passant un setState de la page
  de recettes ou en utilisant un Context.

### **Allez plus loin**

- En optionnel, vous pouvez faire en sorte que les critères de recherche sélectionnés persistent en les passant à l’url.

### **Points de vigilance**

- Pensez à supprimer les tags sélectionnés de la liste de tags disponibles.
- Actualisez les filtres en fonction des recettes disponibles.

### **Ressources**

- [La documentation de React sur la gestion du state](https://react.dev/learn/managing-state)

### Étape 7 - Mettre en place la recherche principale

Maintenant que vous avez réalisé les premières étapes de la recherche, il est temps de mettre en pratique ce que vous
avez appris dans la recherche principale. Pour cela, il faudra analyser les entrées utilisateurs dans plusieurs champs
comme les ingrédients, la description etc, afin de vous assurer d’avoir une recherche qui répond aux critères demandés.

### **Résultat attendu**

- La fonctionnalité de recherche principale fonctionne selon les critères établis.

### **Recommandations**

- Bien noter les critères de réussite de la recherche, identifier tous les champs dans lesquels vous ferez votre
  recherche.
- La recherche ne doit commencer qu'à partir de 3 caractères minimum

### **Points de vigilance**

- Prendre en compte les cas particuliers : écriture de majuscules dans la recherche, oubli des accents sur les mots,
  etc.
- Attention aux performances de votre fonctionnalité, afin de vous assurer que le code n’est pas exécuté trop
  régulièrement vous pouvez utiliser une fonction de “debounce”.

### **Ressources**

- [Découvrez les algorithmes de tri](https://interstices.info/les-algorithmes-de-tri/)
- [Tutoriel Debounce & Throttle](https://grafikart.fr/tutoriels/debounce-throttle-642)