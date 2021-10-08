let apiGet = ''
let apiPost = ''

/// détermination si l'api est locale ou distante
if (window.origin === 'http://127.0.0.1:5500'){
    apiGet = 'http://localhost:3000/api/';
    apiPost = 'http://localhost:3000/api/post'
}else{
    apiGet = 'https://texte-envoi-retour.herokuapp.com/api/';
    apiPost = 'https://texte-envoi-retour.herokuapp.com/api/post' 
    }

/// fetch vers l'api

fetch(apiGet)
.then(res => res.json())
.then(dataApi => {
    for (let d of dataApi){
        console.log(d)
        document.querySelector('.return').innerHTML += `
        <div class="return__item">
            <span><b>Nom:</b> ${d.name}</span>
            <span><b>Description:</b> ${d.comment}</span>
        </div>`
    }
}) 

/// sélections des inputs
const formInputs = document.querySelectorAll('.entry');

/// objet qui sera rempli par les inputs
let data = {
    name: '',
    comment: ''
}

/// boucle à travers les entrées
for (let entry of formInputs){
    // écoute de la saisie
    entry.addEventListener('input', () =>{
        if (entry.id === 'name'){
            data.name = entry.value; 
        }else{
            data.comment = entry.value; 
        }
    })
}



// fonction pour l'envoi des données
const postData = () =>{
    console.log(JSON.stringify(data))
    fetch(apiPost, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log(res)
        if (!res.ok){
            console.log('erreur')
        }else{
            console.log('envoi effectué')
            window.location.reload()
            return res.json()
        }
        
    })
    .then(datas => console.log(datas));
}

// écoute du clic  sur le bouton envoyer
const sendBtn = document.querySelector('.btn');
sendBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        postData();
    })