    const formConnexion = document.getElementById('Connexion');
    const formInscription = document.getElementById('Inscription');
    const btnSinscription = document.getElementById('sinscrire');
    const btnRetour = document.getElementById('retourConnexion');
   

    // Clic sur "S'inscrire" affiche le formulaire d'inscription
    btnSinscription.addEventListener('click', () => {
        formConnexion.style.display  = 'none';
        btnSinscription.style.display = 'none';
        formInscription.style.display = 'flex';
        btnRetour.style.display       = 'flex';
    });

    // Clic sur "Déjà inscrit ?" revient au formulaire de connexion
    btnRetour.addEventListener('click', () => {
        formInscription.style.display = 'none';
        btnRetour.style.display       = 'none';
        formConnexion.style.display   = 'flex';
        btnSinscription.style.display  = 'flex';
    });


    // Qd je submit mon form connexion je recupere les infos
    formConnexion.addEventListener('submit', (event) =>{
        event.preventDefault(); // permet que le formulaire ne se refresh pas quand je clique sur afficher
        event.stopPropagation(); // permet de ne rien faire avant que les données ne soient envoyées au serveur

        // permet de recuperer les infos entrées ds mon formulaire 
        dataFormCon = Object.fromEntries(new FormData (formConnexion))

        console.log(dataFormCon)
    
        fetch("/api/login",
            {method: "POST",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify({ login : dataFormCon.login, password : dataFormCon.password}) })
            .then(response=>response.json())
            .then(data=>{
        
            
            //traitement en cas d'erreur
            console.log("Données reçues : ", data);
            window.location.href = "/"
            }).catch(error=>{
                
            console.log("L'erreur est : ", error);
            })
})

      // Qd je submit mon form inscrition je recupere les infos
    formInscription.addEventListener('submit', (event) =>{
        event.preventDefault(); // permet que le formulaire ne se refresh pas quand je clique sur afficher
        event.stopPropagation(); // permet de ne rien faire avant que les données ne soient envoyées au serveur

        // permet de recuperer les infos entrées ds mon formulaire 
        dataFormIns = Object.fromEntries(new FormData (formInscription))

        console.log(dataFormIns)

        fetch("/api/register",
            {method: "POST",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify({ login : dataFormIns.login, password : dataFormIns.password}) })
            .then(response=>response.json())
            .then(data=>{
           
            //traitement en cas d'erreur
            console.log("Données reçues : ", data);
            if (data.ok){
                window.location.href = "/";
            }

            }).catch(error=>{
            //traitement en cas d'erreur
            console.log("L'erreur est : ", error);
            })

    })