//create the board
let board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]

function humanPlayer(){
    this.marker = 'X'
}

function botPlayer(){
    this.marker = 'O'
}

function gameFlow(X_turn, O_turn){
    this.X_turn = X_turn
    this.O_turn = O_turn
}

function getMove(){
    let valid_square = false
    let val = null
    let square = null
    let availableSquares = availableSquares()
    while (!valid_square){
        square = prompt("Type in your square")
        if (!isNaN(square)){
            console.log("Invalid input! Try again")
        } else if (!availableSquares.includes(square)){
            console.log("Invalid Square! Try again")
        }
    }
    val = square
    return square
}

function displayBoard(board){
    for (let i = 0; i < board.length; i++)
    console.log(board[i])
}

function availableSquares(){
    let availableSquares = []
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board.length; j++){
            if (board[i][j] !== 'X' || board[i][j] !== 'O'){
                availableSquares.push(board[i][j])
            }
        }
    }
}

function checkWinner(){

}

function playGame() {
}