'use strict'

const LASER_SPEED = 80
const SUPER_LASER_SPEED = 40

const LASER_SOUND = new Audio('sound/laser.wav')
const SUPER_LASER_SOUND = new Audio('sound/super-laser.wav')

var gHero = {
    pos: {i:12, j: 6},
    isShoot: false,
}

var gBlowUpNegs
var gSuperMode
var gSuperCount = 0
var gIntervalLaser


// creates the hero and place it on board
function createHero(board) {
    board[gHero.pos.i][gHero.pos.j].gameObject = HERO

    gHero.isShoot = false
    gBlowUpNegs = false
    gSuperMode = false
    superCount((-3))
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

        case 'n':
            gBlowUpNegs = true
            break

        case 'x':
            if (gSuperCount === 0) return
            superCount(1)
            gSuperMode = true
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

    if (gSuperMode) {

        SUPER_LASER_SOUND.play()

        gIntervalLaser = setInterval(function() {
            superModeLaser(nextLocation)
        }, SUPER_LASER_SPEED)

    } else {

        LASER_SOUND.play()

        gIntervalLaser = setInterval(function() {
            blinkLaser(nextLocation)
        }, LASER_SPEED)
    }
}


// renders a LASER at specific cell for short time and removes it
function blinkLaser(nextLocation) {
    gHero.isShoot = true

    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        return
    }

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })

    if (nextCell.innerText === ALIEN) {

        if (gBlowUpNegs) {
            blowUpNegs(nextLocation)
            gBlowUpNegs = false
            return
        }

        updateScore(10)
        gGame.aliensCount--
        
        updateCell(nextLocation, '')
        nextLocation.i--
        updateCell(nextLocation, LASER)
        
        nextCell.innerText = ''
        clearInterval(gIntervalLaser)
        gHero.isShoot = false

        checkWin()
        return
    }

    if (nextCell.innerText === CANDY) {
        updateScore(50)
        
        gIsAlienFreeze = true
        setTimeout(() => gIsAlienFreeze = false, 5000)
        
        updateCell(nextLocation, '')
        nextLocation.i--
        updateCell(nextLocation, LASER)
        
        nextCell.innerText = ''
        clearInterval(gIntervalLaser)
        gHero.isShoot = false

        return
    }

    // moving from current location
    updateCell(nextLocation, '')
    nextLocation.i--
    // moving to new location
    updateCell(nextLocation, LASER)
}


function superModeLaser(nextLocation){
    gHero.isShoot = true

    if (nextLocation.i === 0) {
        updateCell(nextLocation, '')
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        gSuperMode = false
        return
    }

    var nextCell = getElCell({ i: nextLocation.i - 1, j: nextLocation.j })

    if (nextCell.innerText === ALIEN) {
        updateScore(10)
        gGame.aliensCount--

        updateCell(nextLocation, '')
        nextLocation.i--
        updateCell(nextLocation, SUPER)

        nextCell.innerText = ''
        clearInterval(gIntervalLaser)
        gHero.isShoot = false
        gSuperMode = false

        checkWin()
        return
    }

    // moving from current location
    updateCell(nextLocation, '')
    nextLocation.i--
    // moving to new location
    updateCell(nextLocation, SUPER)
    gSuperMode = false
}


function blowUpNegs(pos) {
    var negsCount = 0

    var cellI = pos.i
    var cellJ = pos.j

    for (var i = cellI - 1; i <= cellI + 1; i++) {

        if (i < 0 || i >= gBoard.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (j < 0 || j >= gBoard[0].length) continue
            
            if (i === cellI && j === cellJ) continue
            
            if (gBoard[i][j].gameObject === ALIEN) {
                negsCount++
                updateCell({ i, j }, '')

                gGame.aliensCount = gGame.aliensCount - negsCount
                updateScore((negsCount * 10))

                checkWin()

                return
            }
        }
    }
}