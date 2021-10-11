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

const returnCont = document.querySelector('.return'); 
/// fetch vers l'api
fetch(apiGet)
.then(res => res.json())
.then(dataApi => {
    returnCont.classList.remove('spinner');
    for (let d of dataApi){
        if (d.imageUrl === ''){
            returnCont.innerHTML += `
                <div class="return__item--container opacity">
                        <span class="name"><b>Nom:</b> ${d.name}</span>
                        <span class="desc"><b>Description:</b> ${d.comment}</span>
                        <span class="date"><b>Date:</b> ${d.date}</span>
                        <span class="id">${d._id}</span>
                        <button class="del-btn"></button>
                </div>`
        }else{
          document.querySelector('.return').innerHTML += `
            <div class="return__item--container opacity">
                    <span date="name"><b>Nom:</b> ${d.name}</span>
                    <span class="desc"><b>Description:</b> ${d.comment}</span>
                    <img src=${d.imageUrl} />
                    <span class="date"><b>Date:</b> ${d.date}</span>
                    <span class="id">${d._id}</span>
                    <button class="del-btn"></button>
            </div>`  
        }
        
    }
    /// requête delete
}).then(() => {
let ids = document.querySelectorAll('.id');
const delBtn = document.querySelectorAll('.del-btn')

for (let i = 0; i < ids.length; i++){
    delBtn[i].addEventListener('click', () =>{
        console.log(delBtn[i])
        console.log(ids[i].innerText)
        let idValue = ids[i].innerText;
        console.log(idValue)
        deleteFromdB(idValue)
        document.querySelectorAll('.return__item--container')[i].classList.add('display');
    })
}

const deleteFromdB = (value) =>{
    fetch(apiGet + value,{
        method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
}
})

let today = new Date();
let date = `${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}`
let hour = `${today.getHours()}:${today.getMinutes()}`

let dateShow = `Le ${date} à ${hour}`

// setInterval(() =>{
//     window.location.reload()
// },1000)


/// sélections des inputs
const formInputs = document.querySelectorAll('.entry');

/// objet qui sera rempli par les inputs
let data = {
    name: '',
    comment: '',
    imageUrl: '',
    date: ''
}

/// boucle à travers les entrées
for (let entry of formInputs){
    // écoute de la saisie
    entry.addEventListener('input', () =>{
        if (entry.id === 'name'){
            data.name = entry.value; 
        }else if (entry.id === 'comment'){
            data.comment = entry.value; 
        }else{
            data.imageUrl = entry.value;
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
const sendBtn = document.querySelector('.send-btn');
sendBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        data.date = dateShow
        console.log(data)
        postData();
    })




