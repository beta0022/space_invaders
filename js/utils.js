'use strict'

// Returns a new cell object. e.g.: {type: SKY, gameObject: ALIEN}
function createCell(gameObject = null) {
    return {type: SKY,
            gameObject: gameObject,
    }
}


function getElCell(pos) {
    return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`)
}


function updateScore(diff) {
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('.score span').innerText = gGame.score
}


function superCount(diff) {
    // Model
    gSuperCount -= diff
    // DOM
    document.querySelector('.super-count span').innerText = gSuperCount
}


function getRandomIntInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function getEmptyCells(){
	var emptyCells = []
    var i = 0

    for (var j = 0; j < gBoard[i].length; j++) {
			
        if((gBoard[i][j] != ALIEN) && (gBoard[i][j] != LASER)) emptyCells.push({ i, j })
    }

    return emptyCells
}