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
    for (let d = 0; d < dataApi.length; d++){
        console.log(dataApi[d].editedDate)
        returnCont.innerHTML += `
        <div class="return__item--container opacity" id="${dataApi[d]._id}">
            <span class="name"><b>Nom:</b> ${dataApi[d].name}</span>
            <span class="desc"><b>Message:</b> ${dataApi[d].comment}</span>
            <img src=${dataApi[d].imageUrl} />
            <div class="date">
                <b class="initialDate">${dataApi[d].date}</b>
                <span class="editedDate">${dataApi[d].editedDate}</span>
            </div>
            <button class="del-btn"></button>
            <button class="edit-btn"></button>
        </div>`
        if(dataApi[d].imageUrl === ''){
            document.querySelectorAll('img')[d].classList.add('display')
        }
        if(dataApi[d].editedDate === undefined){
            document.querySelectorAll('.editedDate')[d].classList.add('display')
        }
    }
    
    
    /// requête delete
    const delBtn = document.querySelectorAll('.del-btn')
    const container = document.querySelectorAll('.return__item--container');
    const editBtn = document.querySelectorAll('.edit-btn');
    
    // fonction avec fetch pour delete
    const deleteFromdB = (value) =>{
        fetch(apiGet + value,{
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }
    
    
    for (let i = 0; i < container.length; i++){
        
        // écoute du clic sur le bouton delete
        delBtn[i].addEventListener('click', () =>{
            let idValue = container[i].id;
            console.log(idValue)
            deleteFromdB(idValue)
            document.querySelectorAll('.return__item--container')[i].classList.add('display');
        })
        
        
    }
    
    
    let today = new Date();
    let date = `${today.getDate()}/${today.getMonth()+ 1}/${today.getFullYear()}`
    let hour = `${today.getHours()}:${today.getMinutes()}`
    
    let dateShow = `${date} - ${hour}`
    
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
        date: '',
        editedDate:''
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
    
    
    
    
    
    
    
    /// EDITER UN MESSAGE
    
    // fonction avec fetch pour edit
    const editData = (value) =>{
        console.log(JSON.stringify(data))
        fetch(`${apiGet}${value}`, {
        method: 'PUT',
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


/// écoute du clic sur le bouton edit
let edit = false;
let dateLoc = document.querySelectorAll('.initialDate');
let initialDate = ""
let editId = '';
for (let i = 0; i < editBtn.length; i++){
    
    editBtn[i].addEventListener('click', () => {
        edit = true;
        container[i].classList.add('edit-clr');
        document.querySelector('#name').classList.add('display')
        document.querySelector('#img').classList.add('display')
        document.querySelector('.send-btn').innerText = 'Editer'
        document.querySelector('#comment').focus()
        editId = container[i].id;
        console.log(dateLoc)
        initialDate = dateLoc[i].innerText;
        console.log(initialDate)
        console.log(editId)
        
    })
}



// écoute du clic  sur le bouton envoyer
const sendBtn = document.querySelector('.send-btn');
sendBtn.addEventListener('click', (e) =>{
    
    if (!edit){
        e.preventDefault();
        data.date = dateShow
        console.log(data)
        postData();
        
    }else{
        e.preventDefault();
        console.log("id choisie " + editId)
        console.log(initialDate)
        data.date = initialDate;
        data.editedDate = `Edit: ${dateShow}`
        console.log(data)
        
        editData(editId)
    }
}) 


})