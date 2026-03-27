# 🎨 CheatSheet CSS - Styles et Mise en Page Réutilisables

Cette documentation regroupe les structures CSS les plus fiables trouvées dans vos différents exercices. Elles ont été nettoyées et rendues **neutres** pour vous permettre de construire l'architecture de n'importe quel nouveau projet rapidement (via Flexbox).

---

## 🧹 1. Reset Global et Variables

Le code obligatoire à mettre tout en haut de chaque fichier CSS pour éviter les comportements étranges entre les différents navigateurs HTML.

```css

* {
    /* Le box-sizing permet d'inclure les bordures et paddings dans la largeur (width) 
       d'un élément, évitant ainsi qu'il ne déborde inopinément. C'EST VITAL ! */
    box-sizing: border-box;
}

html {
    /* Typographie par défaut, sans empattement (plus lisible sur écran) */
    font-family: 'Trebuchet MS', Geneva, sans-serif;
    color: var(--couleur-texte);
}
```

---

## 🏗️ 2. L'Architecture Parfaite avec Flexbox (Sticky Footer)

C'est LA structure que vous avez parfaitement implémentée dans vos exercices : un `header` en haut, un `footer` bloqué tout en bas, et un `main` qui prend tout l'espace restant.

```css
body {
    display: flex;
    flex-direction: column;
    margin: 0;                /* Retire les marges blanches autour du site */
    padding: 0;
    min-height: 100vh;        /* Le corps prend au minimum TOUTE l'hauteur de l'écran */
    width: 100vw;             /* Le corps prend TOUTE la largeur de l'écran */
    background-color: #fff;
}

/* --- EN-TÊTE --- */
header {
    flex-grow: 0;             /* Ne grandit pas */
    height: 70px;
    background-color: #fff;
    color: #fff;
    display: flex;
    flex-direction: row;      /* Les éléments sont côte à côte */
    align-items: center;      /* Centrage vertical */
    padding: 0 20px;
}

header h1 {
    flex-grow: 1;             /* Le titre prend le maximum de place pour pousser les éléments à droite */
}

/* --- CONTENU PRINCIPAL --- */
main {
    flex-grow: 1;             /* MAGIQUE : Pousse le footer vers le bas en prenant tout l'espace libre ! */
    display: flex;
    flex-direction: row;      /* Pour avoir une sidebar locale (aside) et un contenu (article) */
}

/* --- PIED DE PAGE --- */
footer {
    flex-grow: 0;
    background-color: pink;
    color: black;
    text-align: center;
    padding: 15px;
}
```

---

## 🧭 3. Barre de Navigation (Menu)

Styliser des liens proprement à l'intérieur d'une balise `<nav>`.

```css
nav {
    display: flex;
    align-items: stretch; /* Les liens vont prendre toute la hauteur du conteneur */
}

nav a {
    text-decoration: none;         /* Enlève le soulignement moche par défaut des liens */
    color: var(--blanc);
    border-left: 1px solid #ccc;   /* Séparation entre les liens */
    padding: 10px 15px;
    
    display: flex;                 /* Pour bien centrer le texte du lien à l'intérieur */
    align-items: center;
    justify-content: center;
    transition: 0.3s;              /* Animation douce au survol */
}

nav a:hover {
    background-color: rgba(255, 255, 255, 0.1); /* S'illumine légèrement au survol */
    border-bottom: 3px solid var(--couleur-secondaire);
}
```

---

## 📝 4. Jolis Formulaires

Mise en page d'un formulaire simple mais élégant (inspiré de `Exercice 4` et `Authentification`).

```css
/* Le conteneur du formulaire */
form {
    display: flex;
    flex-direction: column;
    background-color: var(--blanc);
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 10px; /* Coins arrondis */
    margin: 20px auto;   /* Centrage horizontal */
    width: 100%;
    max-width: 500px;    /* Limite la largeur sur les grands écrans */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Légère ombre propre */
}

/* Le regroupement Label + Input */
.champ-groupe {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
}

/* Styliser les étiquettes */
.champ-groupe label {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    color: var(--couleur-primaire);
}

/* Styliser les zones de texte et menus déroulants */
input[type="text"],
input[type="password"],
input[type="number"],
select {
    font-size: 16px;
    height: 40px;
    padding: 5px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;       /* Enlève la bordure noire moche au clic */
}

input:focus, 
select:focus {
    border-color: var(--couleur-secondaire); /* Change de couleur quand on clique dedans */
}

/* Styliser les Boutons */
button {
    background-color: var(--couleur-secondaire);
    color: var(--blanc);
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    cursor: pointer;     /* Curseur en "main" */
    margin-top: 10px;
    text-align: center;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #2980b9; /* Légèrement plus foncé au survol */
}
```

---

## 📊 5. Tableaux de Données de Qualité

Mettez fin aux tableaux des années 90, avec un style très "Data Dashboard" que vous aviez dans l'exercice 4 !

```css
table {
    border-collapse: collapse; /* Enlève les doubles bordures natives */
    width: 100%;
    margin: 20px 0;
    font-size: 0.9rem;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05); /* Petite ombre */
}

/* En-tête du tableau */
thead {
    background-color: var(--couleur-primaire);
    color: var(--blanc);
}

th, td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
    text-align: left;
}

/* Effet très visuel : une ligne sur deux a une couleur de fond différente */
tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

/* Légère surbrillance de la ligne quand on passe la souris dessus */
tbody tr:hover {
    background-color: #eaf5ff;
}
```

---

## 🔧 6. Blocs utilitaires

Pratique pour vos cartes et affichages de grid.

```css
/* Une "card" de produit ou de donnée */
.carte {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    background-color: var(--blanc);
    width: 250px;
    margin: 10px;
}

/* Conteneur pour afficher les cartes en grille fluide (Flexbox wrap) */
.grille-cartes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;              /* Passe à la ligne si on manque de place */
    justify-content: space-around; /* Espace uniformément les cartes */
}
```
