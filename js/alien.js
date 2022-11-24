'use strict'

const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
const ALIEN_SPEED = 500

var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsRightCorner
var gIsAlienFreeze = false

function createAliens(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[0].length; j++) {
        
            if (i < ALIENS_ROW_COUNT && j < ALIENS_ROW_LENGTH){
                board[i][j].gameObject = ALIEN
            }
        }
    }

    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = ALIENS_ROW_COUNT - 1
    gIsRightCorner = false
    gIsAlienFreeze = false

    gIntervalAliens = setInterval(function() {
        shiftBoardRight(board, gAliensTopRowIdx, gAliensBottomRowIdx)
    }, ALIEN_SPEED)
}


function shiftBoardRight(board, fromI, toI) {

    if (gIsAlienFreeze) return

    for (var i = fromI; i <= toI; i++) {

        for (var j = board.length - 1; j >= 0; j--) {

            if (board[i][j].gameObject === ALIEN) {

                if (j === board.length - 1) {
                    gIsRightCorner = true

                    clearInterval(gIntervalAliens)

                    gIntervalAliens = setInterval(function() {
                        shiftBoardDown(board, gAliensTopRowIdx, gAliensBottomRowIdx)
                    }, ALIEN_SPEED)

                    return
                }
            
                updateCell({ i: i, j: j }, '')
                updateCell({ i: i, j: j + 1}, ALIEN)

            } 
        }
    }
}


function shiftBoardLeft(board, fromI, toI) {

    if (gIsAlienFreeze) return

    for (var i = fromI; i <= toI; i++) {

        for (var j = 0; j <= board.length - 1; j++) {
 
            if (board[i][j].gameObject === ALIEN) {

                if (j === 0) {
                    gIsRightCorner = false
                    
                    clearInterval(gIntervalAliens)

                    gIntervalAliens = setInterval(function() {
                        shiftBoardDown(board, gAliensTopRowIdx, gAliensBottomRowIdx)
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

    if (gIsAlienFreeze) return

    for (var i = toI; i >= fromI; i--) {

        for (var j = 0; j <= board.length-1 ; j++) {

            if (board[i + 1][j].gameObject === HERO) {
                gameOver()
                return
            }

            if (board[i][j].gameObject === ALIEN){

                updateCell({ i: i, j: j }, '')
                updateCell({ i: i + 1, j: j }, ALIEN)
                
                clearInterval(gIntervalAliens)
            }
        }
    }

    gAliensTopRowIdx++
    gAliensBottomRowIdx++

    if (gIsRightCorner) {
        gIntervalAliens = setInterval(function() {
            shiftBoardLeft(board, gAliensTopRowIdx, gAliensBottomRowIdx)
        }, ALIEN_SPEED)
        
    } else {
        gIntervalAliens = setInterval(function() {
            shiftBoardRight(board, gAliensTopRowIdx, gAliensBottomRowIdx)
        }, ALIEN_SPEED)
    }
}
