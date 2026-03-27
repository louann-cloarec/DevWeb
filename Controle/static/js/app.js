/* Permet de nous logout, passer de la page app.html vers auth.html en appellant l'api sur logout */

const btnLogout = document.getElementById('logout');

  btnLogout.addEventListener('click', (event) =>{
        event.preventDefault(); // permet que le formulaire ne se refresh pas quand je clique sur afficher
        event.stopPropagation(); // permet de ne rien faire avant que les données ne soient envoyées au serveur

        fetch("/api/logout",
            {method: "GET",
            headers : {"Content-Type": "application/json"}})
            .then(response=>response.json())
            .then(data=>{
            
            // traitement des données reçues
            console.log("Données reçues : ", data);
            window.location.reload();
            }).catch(error=>{
                
            //traitement en cas d'erreur
            console.log("L'erreur est : ", error);
            })
    })