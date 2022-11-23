'use strict'

const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const ALIEN_SPEED = 500

// var aliensArr = []
var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = true


function createAliens(board) {
    gGame.aliensCount = ALIENS_ROW_COUNT*ALIENS_ROW_LENGTH

    gIsAlienFreeze = false

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
        
            if (i < ALIENS_ROW_COUNT && j < ALIENS_ROW_LENGTH){
                board[i][j].gameObject = ALIEN
                // aliensArr.push(board[i][j])
            }
        }
    }

    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1

    console.log('gAliensTopRowIdx:',gAliensTopRowIdx)
    console.log('gAliensBottomRowIdx:',gAliensBottomRowIdx)

    gIntervalAliens = setInterval(function() {
        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}


function handleAlienHit(pos) {

}


function shiftBoardRight(board, fromI, toI) {

    if (gIsAlienFreeze) return

    for (var i = fromI; i <= toI; i++) {

        for (var j = board.length - 1; j >= 0; j--) {


            if (board[i][j].gameObject === ALIEN) {

                if (j === board.length - 1) {
                    console.log('rightcorner')

                    clearInterval(gIntervalAliens)
                    gAliensTopRowIdx++
                    gAliensBottomRowIdx++

                    console.log('gAliensTopRowIdx:',gAliensTopRowIdx)
                    console.log('gAliensBottomRowIdx:',gAliensBottomRowIdx)

                    shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)

                    // gIntervalAliens = setInterval(function() {
                    //     shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                    // }, ALIEN_SPEED)

                    return
                }

                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1}, ALIEN)
            } 
        }
    }
}


function shiftBoardLeft(board, fromI, toI) {

    for (var i = fromI; i <= toI; i++) {

        for (var j = 0; j <= board.length - 1; j++) {

            if (board[i][j].gameObject = ALIEN) {

                if (j === 0) {
                    console.log('leftcorner')
                    
                    clearInterval(gIntervalAliens)

                    gAliensTopRowIdx = gAliensTopRowIdx + 1
                    gAliensBottomRowIdx = gAliensBottomRowIdx + 1
                    shiftBoardDown(board, gAliensTopRowIdx, gAliensBottomRowIdx)

                    gIntervalAliens = setInterval(function() {
                        shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED)

                    return
                }

                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j - 1}, ALIEN)
            } 
        }
    }
}


function shiftBoardDown(board, fromI, toI) {

    for (var i = fromI; i <= toI; i++) {

        for (var j = board.length -1; j >= 0; j--) {

            // if (toI === board.length - 1) {
            //     console.log('Game Over')
            //     gGame.isOn = false
            // }

            if (board[i][j].gameObject = ALIEN){

                console.log('down')

                updateCell({ i: i, j: j }, '')
                updateCell({ i: fromI + 1, j: j}, ALIEN)
            }
        }
    }

}

// runs the interval for moving aliens side to side and down
// it re-renders the board every time

// when the aliens are reaching the hero row - interval stops function moveAliens() {}