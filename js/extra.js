'use strict'

const title = document.querySelector('.title')
const strTitle = title.textContent
const splitTitle = strTitle.split("")

title.textContent = ""

for (var i = 0; i < splitTitle.length; i++){
    title.innerHTML += "<span>" + splitTitle[i] + "</span>"
}

var char = 0
var timer = setInterval(animateTitle, 50)

function animateTitle(){
    const titleSpan = title.querySelectorAll('h1 span')[char]
    titleSpan.classList.add('fade')
    char++

    if (char === splitTitle.length){
        clearInterval(timer)
        return
    }
}