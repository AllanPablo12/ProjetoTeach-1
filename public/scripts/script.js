function navegarViaAjax(url, seletor, push = true) {
    if (!url || !seletor) return
    const elemento = document.querySelector(seletor)
    fetch(url)
        .then(resp => resp.text())
        .then(html => {
            elemento.innerHTML = html
            //console.log(elemento.innerHTML = html)
            if (push) {
                history.pushState({ seletor }, "Pagina Ajax", url)
            }
        })
}

function removeSelected(){
    document.querySelectorAll('li > a').forEach(
    link => link.classList.remove('selected')) 

}


/*
function selectedIndex(event){
    event.preventDefault()        
    
    document.querySelectorAll('#study-container a').forEach(link=>{
    const url = link.attributes[0].value
    const newUrl = url.split('#')[1]
    console.log(newUrl)

    const seletorDestino = '#container'

    removeSelected()
    document.querySelector('#whoweare').classList.add('selected')          
    navegarViaAjax(newUrl, seletorDestino)
        
   
})
}*/

/*function ajaxText(event){
    event.preventDefault()
    const text = document.querySelector('#text')
    const url = text.attributes[0].value
    const newUrl = url.split('#')[1]

    document.querySelector('#container2').innerHTML = ''
    removeSelected()
    const seletorDestino = '#container'
    navegarViaAjax(newUrl,seletorDestino)
    
}

function ajaxNav(){
    document.querySelectorAll('li > a').forEach(link => {
    const url = link.attributes[0].value
    const newUrl = url.split('#')[1]
    console.log(newUrl)

    const seletorDestino = '#container'
    link.onclick = e => {
        e.preventDefault()

        document.querySelectorAll('li > a').forEach(
         link => link.classList.remove('selected')) 
         
         e.target.classList.add('selected')

        if(newUrl == "search-page"){
            const novoDestino = '#container2'
            document.querySelector(seletorDestino).innerHTML = ''
            navegarViaAjax(newUrl,novoDestino)

        }else{
            document.querySelector('#container2').innerHTML = ''
             
             navegarViaAjax(newUrl, seletorDestino)
        }
        
        
    }
})
}*/

/*function ajaxProfile(event){
    event.preventDefault()
    const text = document.querySelector('.profile-name')
    const url = text.attributes[0].value
    console.log(url)
    const newUrl = url.split('#')[1]
    const seletorDestino = '#container2'

    document.querySelector(seletorDestino).innerHTML = ''
    removeSelected()
    navegarViaAjax(newUrl,seletorDestino)
}

function ajaxClasses(event){
    event.preventDefault()
    const text = document.querySelector('#button-page')
    const url = text.attributes[0].value
    console.log(url)
    const newUrl = url.split('#')[1]
    const seletorDestino = '#container2'

    document.querySelector('#container').innerHTML = ''
    removeSelected()
    navegarViaAjax(newUrl,seletorDestino)
}*/


function openNav() {
    document.getElementById("mySidenav").style.width = "40%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function profileBio() {
    let bio = document.querySelector('.bio-container')
    let contact = document.querySelector('.contact-container')
    contact.style.display = 'none'
    bio.style.display = 'flex'
}

function profileContact() {
    let bio = document.querySelector('.bio-container')
    let contact = document.querySelector('.contact-container')
    bio.style.display = 'none'
    contact.style.display = 'flex'
}




