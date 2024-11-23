//create the board
let board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]

function Player(marker){
    this.marker = marker
}


function availableSquares(board){
    let squares = []
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] !== 'X' && board[i][j] !== 'O'){
                squares.push(board[i][j])
            }
        }
    }
    return squares
}

function displayBoard(board){
    for (let i = 0; i < board.length; i++)
    console.log(board[i])
}

function checkWinner(board){
    //check rows
    let winner = ''
    for (let i=0; i<board.length; i++){
        if (board[i][0] === board[i][1] && board[i][0] === board[i][2]){
            winner = board[i][0]
        }
    }
    //check columns
    for (let i = 0; i<board.length; i++){
        if (board[0][i] === board[1][i] && board[0][i] === board[2][i]){
            winner = board[0][i]
        }
    }
    //check the diagonals
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        winner = board[0][0]
    } else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]){
        winner = board[0][2]
    }
    return winner
}

function getMove(board){
    let valid_square = false
    let squares = availableSquares(board)
    let square;
    while (!valid_square){
        square = Math.floor(prompt("Type in your square"))
        if (isNaN(square)){
            console.log("Invalid input! Try again")
        } else if (!squares.includes(square)){
            console.log("Invalid Square! Try again")
        } else {
            valid_square = true
        }
    }
    return square
}

function placeMove(player, board){
    let square = getMove(board)
    if (square <= 2){
        const i = board[0].indexOf(square)
        board[0][i] = player.marker
    } else if (square > 2 && square <= 5){
        const i = board[1].indexOf(square)
        board[1][i] = player.marker
    } else if (square > 5){
        const i = board[2].indexOf(square)
        board[2][i] = player.marker
    }
}

function gameController() {
    let humanPlayer = new Player('X')
    let botPlayer = new Player('O')
    let isOver = false
    while (isOver == false){
        console.log("X's turn")
        placeMove(humanPlayer, board)
        displayBoard(board)
        if (checkWinner(board) === 'X'){
            console.log("X Player wins")
            isOver = true
            break
        } else if (compareFunc(availableSquares(board), [])){
            console.log("It's a Draw")
            isOver = true
            break
        }

        console.log("O's turn")
        placeMove(botPlayer, board)
        displayBoard(board)
        if (checkWinner(board) === 'X'){
            console.log("X Player wins")
            isOver = true
            break
        } else if (compareFunc(availableSquares(board), [])){
            console.log("It's a Draw")
            isOver = true
            break
        }
    }
}

const compareFunc = (a, b) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);