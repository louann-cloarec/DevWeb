# 📄 CheatSheet HTML - Modèles et Blocs Réutilisables

Cette documentation rassemble les structures, blocs et éléments HTML les plus pertinents trouvés dans vos différents projets (affichages statiques, formulaires, Jinja2 avec Flask, etc.). Ils ont été rendus **neutres** pour être facilement copiés et adaptés dans n'importe quel autre projet.

---

## 🏗️ Structure de Base d'un Document HTML

La structure canonique de tout fichier HTML moderne. Elle inclut les métadonnées de base et l'import de fichiers externes (CSS, JS).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- Définit l'encodage des caractères (indispensable pour les accents) -->
    <meta charset="utf-8" />
    
    <!-- Rend la page responsive sur les appareils mobiles -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <!-- Titre de l'onglet du navigateur -->
    <title>Titre de la Page</title>
    
    <!-- Importation d'une feuille de style CSS externe -->
    <link rel="stylesheet" href="./style.css" />
    
    <!-- Importation d'un script JS externe. 
         L'attribut 'defer' permet de charger le script sans bloquer le rendu visuel de la page HTML. -->
    <script src="./script.js" defer></script>
</head>
<body>
    <!-- Le contenu de la page ira ici -->
</body>
</html>
```

> [!TIP]
> **Jinja2 (Flask)** : Si vous utilisez Python avec Flask, vous pouvez importer dynamiquement les fichiers statiques de cette manière :
> ```html
> <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}" />
> <script src="{{ url_for('static', filename='js/script.js') }}" defer></script>
> ```

---

## 🧭 Balises Sémantiques Essentielles

L'utilisation de balises sémantiques améliore le SEO (référencement) et l'accessibilité de votre site. Voici le modèle de découpage classique :

```html
<body>
    <!-- En-tête : contient généralement le logo, le titre principal et le menu -->
    <header>
        <img class="logo" src="./logo.jpg" alt="Logo du site">
        <h1>Titre Principal du Site</h1>
        
        <!-- Menu de navigation principal -->
        <nav>
            <a href="/index">Accueil</a>
            <a href="/contact">Contact</a>
            <!-- Lien externe -->
            <a href="https://google.com" target="_blank">Lien Externe</a> 
        </nav>
    </header>

    <!-- Contenu principal de la page -->
    <main>
        <!-- Une section autonome de contenu (article de blog, bloc de texte, etc.) -->
        <article>
            <h2>Titre de la Section</h2>
            <p>Un paragraphe de texte décrivant le contenu de l'article.</p>
        </article>

        <!-- Contenu secondaire ou lié indirectement au contenu principal (ex: sidebar) -->
        <aside>
            <p>Informations complémentaires</p>
        </aside>
    </main>

    <!-- Pied de page -->
    <footer>
        <p>Copyright &#169; 2024 - Tous droits réservés</p>
    </footer>
</body>
```

---

## 📝 Formulaires et Champs de Saisie

Modèle neutre de formulaire contenant divers types d'entrées (texte, nombre, menus déroulants, boutons radio). Idéal pour les tableaux de bord ou de l'authentification.

```html
<!-- Formulaire basique. 
     Note: Si vous ne mettez ni 'action' ni 'method', la soumission du formulaire rechargera la page ou devra être gérée par JS via l'ID. -->
<form id="monFormulaire">
    
    <!-- Regrouper un label et son champ d'entrée permet de styliser plus facilement -->
    <div class="champ-groupe">
        <label for="identifiant">Identifiant :</label>
        <input type="text" id="identifiant" name="identifiant" required />
    </div>

    <!-- Champ de mot de passe (les caractères sont masqués) -->
    <div class="champ-groupe">
        <label for="motDePasse">Mot de Passe :</label>
        <input type="password" id="motDePasse" name="motDePasse" required />
    </div>

    <!-- Champ numérique -->
    <div class="champ-groupe">
        <label for="age">Âge :</label>
        <input type="number" id="age" name="age" />
    </div>

    <!-- Menu déroulant (Select) -->
    <div class="champ-groupe">
        <label for="categorie">Catégorie :</label>
        <select id="categorie" name="categorie">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
    </div>

    <!-- Boutons Radio (choix unique parmi plusieurs) -->
    <!-- Important : L'attribut 'name' doit être identique pour lier tous ces boutons radio -->
    <div class="champ-groupe radio-groupe">
        <label>Trier par :</label>
        <input type="radio" id="triDate" name="critereTri" value="date" />
        <label for="triDate">Date</label>

        <input type="radio" id="triNom" name="critereTri" value="nom" />
        <label for="triNom">Nom</label>
    </div>

    <!-- Bouton de soumission -->
    <button type="submit">Valider</button>
</form>
```

> [!CAUTION]
> N'oubliez pas les attributs `for` dans les balises `<label>` et `id` dans les `<input>`. Ils doivent toujours être identiques (`for="mon-id"` correspond à `id="mon-id"`) pour que cliquer sur le texte du label mette en surbrillance l'input.

---

## 📊 Tableaux de Données

Modèle de tableau basique pour lister des informations structurées de manière claire.

```html
<table>
    <!-- L'en-tête du tableau -->
    <thead>
        <tr>
            <!-- 'scope="col"' aide les lecteurs d'écran (bonne pratique d'accessibilité) -->
            <th scope="col">Nom d'Élément</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Valeur</th>
        </tr>
    </thead>

    <!-- Le corps du tableau, souvent rempli par JS ou par une boucle Jinja2 -->
    <tbody id="corps-tableau">
        <tr>
            <td>Élément A</td>
            <td>Catégorie 1</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Élément B</td>
            <td>Catégorie 2</td>
            <td>250</td>
        </tr>
    </tbody>
</table>
```

---

## 🔧 Éléments Dynamiques et Visuels Utiles

Voici quelques éléments pratiques pour construire des interfaces interactives (masquer/afficher du contenu, barres de progression).

### 1. Masquage simple (display: none)
Idéal pour cacher un encart qui sera affiché ultérieurement via JavaScript.

```html
<div id="encart-secret" style="display: none;">
    <h2>Titre Caché</h2>
    <p>Ce bloc ne sera visible que si JavaScript change le style en 'display: block'.</p>
</div>
```

### 2. Barre de progression native HTML
Pour indiquer le chargement d'un élément (ou d'une probabilité).

```html
<label for="barre-chargement">Progression :</label>
<!-- La valeur maximale est 100, la valeur actuelle est 70 -->
<progress id="barre-chargement" max="100" value="70">70%</progress>
```

---

## 🐍 Bonus : Fragments Jinja2 (Python/Flask)

Si vous développez avec Flask et utilisez les templates HTML (Jinja2), voici les blocs les plus réutilisables trouvés dans vos modèles :

**Afficher une variable Python :**
```html
<h1>Bienvenue, {{ user.username }}</h1>
<p>Il vous reste : {{ user.quota_max - user.quota_used }} unités.</p>
```

**Faire une boucle sur une liste Python :**
```html
<select id="genre" name="genre">
    <!-- Remplit le menu déroulant à partir d'une liste Python 'listGenres' passée au render_template -->
    {% for item in listGenres %} 
        <option value="{{ item }}">{{ item }}</option>
    {% endfor %}
</select>
```
