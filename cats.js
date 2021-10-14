let apiCats = 'https://api.thecatapi.com/v1/images/search?limit=15&mime_types=gif';
const catShow = () =>{
    fetch(apiCats, {
        method: 'GET',
        headers: {
            'x-api-key': '70fad18d-d535-417c-89c1-2b8b74371193'
        }
    })
     .then(res => res.json())
     .then(cats => {
        returnCont.classList.remove('spinner');
         for (let c of cats){
             catsPicsCtn.innerHTML += `
             <div class="cats-pics__item">
                <img src="${c.url}" class="cats-pics__img" /> 
             </div>`
         }
        })
        .then(() =>{
            const catsPicsItems= document.querySelectorAll('.cats-pics__item')
            const catsPicsItemsImg = document.querySelectorAll('.cats-pics__item img')
            for (let i = 0; i < catsPicsItems.length; i++){
                catsPicsItems[i].addEventListener('click', () =>{
                    catsDiv.classList.add('display');
                    document.querySelector('#img').value = catsPicsItemsImg[i].src
                    data.imageUrl = catsPicsItemsImg[i].src
                })
            }
        })
}

const showCatsBtn = document.querySelector('.show-cats');
const closeCatsBtn = document.querySelector('.close-cats')
const moreCatsBtn = document.querySelector('.randoms-cats')
const catsDiv = document.querySelector('.images')
const catsPicsCtn = document.querySelector('.cats-pics__container')
console.log(catsPicsCtn)

//  affichage de la div contenant les chats
 showCatsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    catsDiv.classList.remove('display');
    returnCont.classList.add('spinner');
    catShow();
 })

// affichage d'autre chats
moreCatsBtn.addEventListener('click', () => {
    catsPicsCtn.innerHTML = ''
    catShow();
})

 // fermeture de la div contenant les chats
 closeCatsBtn.addEventListener('click', () =>{
     catsDiv.classList.add('display');
 })

 // écoute du clic sur un chat
