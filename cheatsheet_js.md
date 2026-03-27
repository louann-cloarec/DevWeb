# 💛 CheatSheet JavaScript - Blocs et Snippets Réutilisables

Cette documentation consolide les morceaux de code JavaScript les plus pertinents trouvés dans vos différents exercices. Modifiés pour être totalement **neutres et réutilisables**, ces extraits gèrent la manipulation du DOM, la validation de formulaires, et la communication avec un serveur (API).

---

## 🎯 1. Sélection d'éléments dans le DOM

Avant de manipuler quoi que ce soit, il faut pouvoir cibler vos balises HTML.

```javascript
// Cibler un élément précis via son ID (le plus rapide et le plus courant)
const monBouton = document.getElementById('idDuBouton');
const monFormulaire = document.getElementById('idDuFormulaire');

// Cibler un élément via un sélecteur CSS (parfait pour cibler une classe ou la 1ère balise form)
const premierFormulaire = document.querySelector('form');
const zoneResultat = document.querySelector('.Resultat'); // Classe CSS
```

> [!TIP]
> Il est de bonne pratique de faire vos sélections au tout début de votre script (ou tout en haut de votre fonction) pour éviter de parcourir la page à chaque fois.

---

## 🖱️ 2. Écouter des Événements

Le JS fonctionne énormément de manière événementielle (clic, soumission, chargement).

### Attendre que la page HTML soit complètement chargée
C'est indispensable si votre script est dans le `<head>` sans l'attribut `defer`, ou si vous manipulez beaucoup le DOM dès le départ.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Tout le code écrit ici s'exécutera uniquement quand le HTML aura fini de charger.
    console.log("La page est prête !");
});
```

### Écouter un clic simple
Pour afficher/masquer des éléments ou créer des redirections.

```javascript
monBouton.addEventListener('click', (event) => {
    // Optionnel : empêcher le comportement par défaut si c'est un lien <a> ou un bouton de formulaire
    event.preventDefault(); 
    
    // Exemple d'action : cacher ce bouton
    monBouton.style.display = 'none';
    
    // Redirection forcée vers une autre page (pratique pour un bouton "Déconnexion" ou "Accueil")
    // window.location.href = "/uneAutrePage";
    
    // Pour recharger la page actuelle :
    // window.location.reload();
});
```

---

## 📝 3. Gestion des Formulaires (La "Cheat Form")

C'est LE pattern que vous utilisez partout pour intercepter un formulaire, annuler son rechargement, et extraire toutes ses données proprement sans cibler chaque input un par un.

```javascript
monFormulaire.addEventListener('submit', (event) => {
    // 1. OBLIGATOIRE : Empêche la page de se recharger par défaut au submit
    event.preventDefault(); 
    
    // 2. OBLIGATOIRE : Bloque la propagation de l'événement vers d'autres balises (sécurité)
    event.stopPropagation(); 
    
    // 3. MAGIQUE : Crée un objet JavaScript contenant TOUTES les valeurs saisies.
    // Les clés de l'objet seront égales aux attributs 'name' des <input>.
    const dataFormulaire = Object.fromEntries(new FormData(monFormulaire));

    console.log("Données du formulaire : ", dataFormulaire);
    // Exemple d'utilisation : dataFormulaire.login, dataFormulaire.password...
});
```

---

## 📡 4. Récupérer ou Envoyer des Données au Serveur (API / Fetch)

Ces blocs vous serviront à appeler votre backend Flask.

### Méthode 1 : Requête POST via Fetch (Soumission de formulaire)
Idéal pour envoyer un login, un mot de passe ou créer une ressource.

```javascript
fetch("/api/maRoutePost", {
    method: "POST",
    headers: {
        "Content-Type": "application/json" // On prévient le serveur qu'on lui envoie du JSON
    },
    // On convertit notre objet JS (généré via FormData) en chaîne JSON
    body: JSON.stringify({ 
        identifiant: dataFormulaire.login, 
        motDePasse: dataFormulaire.password
    }) 
})
.then(response => response.json()) // On convertit la réponse réseau en objet JSON
.then(data => {
    // Traitement si tout s'est bien passé
    console.log("Retour du serveur : ", data);
    
    if (data.success) {
        window.location.href = "/dashboard"; // Redirection de succès
    }
})
.catch(error => {
    // Traitement si une erreur survient (réseau coupé, serveur crashé...)
    console.error("L'erreur est : ", error);
});
```

### Méthode 2 : Requête GET (Avec URLSearchParams)
Utile pour envoyer les critères d'une recherche depuis un formulaire vers une URL (ex: `/api/search?genre=rock&artist=ACDC`).

```javascript
const formData = new FormData(monFormulaire);
const params = new URLSearchParams();

// Assemble automatiquement les saisies en "clé=valeur&clé2=valeur2"
for (let [key, value] of formData.entries()) {
    params.append(key, value);
}

// L'URL finale ressemblera à "/api/search?genre=xxx&artiste=yyy"
fetch(`/api/search?${params.toString()}`, { method: "GET" })
.then(response => response.json())
.then(data => {
    console.log("Résultats reçus : ", data);
})
.catch(error => console.error("Erreur : ", error));
```

### Méthode 3 : Version Moderne (Async / Await)
Exactement la même chose que le bloc précédent (`.then().catch()`), mais écrit de manière beaucoup plus lisible. C'est l'approche utilisée dans votre l'exercice Diabète.

```javascript
async function interrogerApicEtAfficher() {
    try {
        // Le code attend ("await") que fetch revienne avec une réponse avant de continuer
        const response = await fetch("/api/maRouteGet");
        const data = await response.json();

        console.log("Résultat : ", data);
    } catch (error) {
        // Capture automatiquement les erreurs sans avoir besoin du .catch()
        console.error('Erreur lors de l\'appel à l\'API:', error);
    }
}
```

---

## 🎨 5. Injection de HTML et Modification du Style Vues

### Cacher / Afficher un élément
Souvent utilisé pour faire disparaître un formulaire et faire apparaître une section résultat.

```javascript
// Pour masquer un bloc (l'équivalent CSS de display: none)
document.getElementById('zoneForm').style.display = 'none';

// Pour afficher un bloc
document.getElementById('zoneResultat').style.display = 'block'; 
// Ou 'flex' si c'est un conteneur flexbox
```

### Injecter du HTML dynamique (Boucles de Liste/Tableaux)
Pratique pour afficher les résultats d'un Fetch.

```javascript
const zoneAffichage = document.getElementById("maListe");
const donneesRecues = [ {nom: "Test 1"}, {nom: "Test 2"} ]; // Exemple fictif

// On commence par vider le conteneur pour éviter les doublons au 2nd clic
zoneAffichage.innerHTML = "";

donneesRecues.forEach(element => {
    // Le += permet d'ajouter à la suite. Attention à bien refermer vos balises HTML dans la chaine.
    zoneAffichage.innerHTML += `
        <div class="carte">
            <h4>${element.nom}</h4>
        </div>
    `;
});
```

> [!WARNING]
> Utiliser "`innerHTML`" peut poser des problèmes de sécurité s'il affiche des données textuelles entrées brutalement par un utilisateur (faille XSS). Mais dans un projet étudiant contrôlé, c'est parfaitement utilisable et très rapide à mettre en place. Pour changer un simple texte de manière plus sécurisée, favorisez l'usage de "`element.innerText = 'Nouveau texte'`".
