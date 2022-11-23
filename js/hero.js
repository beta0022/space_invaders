'use strict'

const LASER_SPEED = 80

const LASER_SOUND = new Audio('sound/laser.wav')

var gHero = {
    pos: {i:12, j: 6},
    isShoot: false,
}

var gIntervalLaser


// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO
    gHero.isShoot = false
}


// Handle game keys
function onKeyDown(event) {

    const nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }

    switch (event.key) {
        case 'ArrowRight':
            nextLocation.j++
            moveHero(nextLocation)
            break

        case 'ArrowLeft':
            nextLocation.j--
            moveHero(nextLocation)
            break

        case ' ':
            nextLocation.i--
            shoot(nextLocation)
            break
    }
}


// Move the hero right (1) or left (-1)
function moveHero(nextLocation) {

    if (!gGame.isOn) return

    if (nextLocation.j < 0 || nextLocation.j > gBoard.length - 1) return

    // moving from current location
    updateCell(gHero.pos, '')

    // moving to new location
    updateCell(nextLocation, HERO)

    gHero.pos = nextLocation
}


// Sets an interval for shutting (blinking) the laser up towards aliens
function shoot(nextLocation) {

    if (!gGame.isOn || gHero.isShoot) return

    LASER_SOUND.play()
    
    updateCell(nextLocation, LASER)
    gIntervalLaser = setInterval(function() {
        blinkLaser(nextLocation)
    }, LASER_SPEED)
}


// renders a LASER at specific cell for short time and removes it
function blinkLaser(nextLocation) {
    gHero.isShoot = true

    if (nextLocation.i === 0) {
        clearInterval(gIntervalLaser)
        updateCell(nextLocation, '')
        gHero.isShoot = false
    }

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })

    if (nextCell.innerText === ALIEN) {
        updateScore(10)
        gGame.aliensCount--
        clearInterval(gIntervalLaser)

        updateCell(nextLocation, '')
        updateCell({ i: nextLocation.i - 1, j: nextLocation.j }, '')

        nextCell.innerText = ''
        gHero.isShoot = false

        checkWin()
        return
    }


    // moving from current location
    updateCell(nextLocation, '')
    nextLocation.i--
    // moving to new location
    updateCell(nextLocation, LASER)
}