'use strict'

const BOARD_SIZE = 14

const SKY = ''
const GROUND = '-'
const HERO = '🚀'
const LASER = '🔺'
const SUPER = '🔴'
const ALIEN = '👾'
const CANDY = '🍭'

const WIN_SOUND = new Audio('sound/win.wav')
const GAME_OVER_SOUND = new Audio('sound/game-over.wav')

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN}
var gBoard
var gGame = {
    isOn: false,
    aliensCount: 0,
    score: 0,
}
var gIntervalCandy


// Called when game loads
function onInit() {
    console.log('Good Luck!')

    gGame.isOn = true
    gGame.aliensCount = 0
    gGame.score = 0
    updateScore(0)

    gBoard = createBoard()
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)

    gIntervalCandy = setInterval(createCandy, 10000)

    document.querySelector('.start-game').classList.remove('hide')
    document.querySelector('.start-btn').classList.add('hide')
    document.querySelector('.restart-div').classList.add('hide')
    document.querySelector('.game-over').classList.add('hide')
}


// Create and returns the board with aliens on top
function createBoard() {
    var board = []

    for (var i = 0; i < BOARD_SIZE; i++) {
      board.push([])

      for (var j = 0; j < BOARD_SIZE; j++) {
        board[i][j] = createCell()

        if (i === BOARD_SIZE - 1) board[i][j].type = GROUND 

      }
    }

    return board
}


// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>'

      for (var j = 0; j < board[0].length; j++) {
        var cell = board[i][j]
        var className = `cell cell-${i}-${j}`

        cell.type === SKY ? className += ' sky' : className += ' ground'

        strHTML += `<td class="${className}" data-i="${i}" data-j="${j}" >`

        if(cell.gameObject === HERO) strHTML += HERO
        if(cell.gameObject === ALIEN) strHTML += ALIEN
        if(cell.gameObject === LASER) strHTML += LASER
        if(cell.gameObject === SUPER) strHTML += SUPER
        if(cell.gameObject === CANDY) strHTML += CANDY 
        
        strHTML += '</td>'
      }

      strHTML += '</tr>\n'
    }

    strHTML += '</tbody></table>'

    var elGameBoard = document.querySelector('.board')
    elGameBoard.innerHTML = strHTML
}


// Returns a new cell object
function createCell(gameObject = null) {
  return {type: SKY,
          gameObject: gameObject,
    } 
}


// position such as: {i: 2, j: 7}
function updateCell(pos, gameObject = null) {
  gBoard[pos.i][pos.j].gameObject = gameObject

  var elCell = getElCell(pos)
  elCell.innerHTML = gameObject || ''
}


function checkWin() { 

  for (var i = 0; i < gBoard.length; i++) {

    for (var j = 0; j < gBoard[0].length; j++) {
    
        if (gBoard[i][j].gameObject === ALIEN){
          gGame.aliensCount++
        }
      }
    }

  if (gGame.aliensCount !== 0) {
    gGame.aliensCount = 0
    return
  }

  console.log('You Won!')

  WIN_SOUND.play()
  document.querySelector('.restart-div').classList.remove('hide')
  document.querySelector('.win').classList.remove('hide')
  
  restartGame()
}


function gameOver() {
  console.log('Game Over!')

  GAME_OVER_SOUND.play()
  document.querySelector('.restart-div').classList.remove('hide')
  document.querySelector('.game-over').classList.remove('hide')

  restartGame()
}


function restartGame(){

  gGame.isOn = false
  clearInterval(gIntervalAliens)
  clearInterval(gIntervalLaser)
  clearInterval(gIntervalCandy)
}


function createCandy(){
  var emptyCells = getEmptyCells()
  var pos = emptyCells[getRandomIntInt(0, BOARD_SIZE-1)]

  updateCell({ i: pos.i, j: pos.j }, CANDY)

  setTimeout(function() {
      updateCell({ i: pos.i, j: pos.j }, '')
  }, 5000)
}