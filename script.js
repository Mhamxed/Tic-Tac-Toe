//create the board
const gameBoard = (() => {
    let board = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]

    function availableSquares(board, xPlayer, oPlayer){
        let squares = []
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board[i].length; j++){
                if (board[i][j] !== xPlayer.marker && board[i][j] !== oPlayer.marker){
                    squares.push(board[i][j])
                }
            }
        }
        return squares
    }
    return {board, availableSquares}

})();

function Player(marker){
    this.marker = marker
}

const gameController = (() => {

    function placeMove(player, board, square){
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

    function checkWinner(board){
        board = gameBoard.board
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

    return {placeMove, checkWinner}
})();

const compareFunc = (a, b) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);

//display and run the game using DOM
const displayGame = (() => {
    const display = document.querySelector(".display")
    const squares = document.querySelectorAll(".square")
    const resetBtn = document.querySelector(".reset")

    function game(board){
        const X = 'X';
        const O = 'O';
        let xPlayer = new Player(X)
        let oPlayer = new Player(O)
        let currPlayer = xPlayer
        let isOver = false
        display.textContent = `${currPlayer.marker} Player's Turn`
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (isOver == false && square.textContent !== xPlayer.marker &&  square.textContent !== oPlayer.marker){
                    const i = [].indexOf.call(squares, square);
                    square.textContent = `${currPlayer.marker}`
                    console.log(board)
                    gameController.placeMove(currPlayer, board, i)
                    if (gameController.checkWinner(board) === currPlayer.marker){
                        display.textContent = `${currPlayer.marker} Player Wins`
                        isOver = true
                    } else if (compareFunc(gameBoard.availableSquares(board, xPlayer, oPlayer), [])){
                        display.textContent = "Draw"
                        isOver = true
                    } else {
                        if (currPlayer == xPlayer){
                            currPlayer = oPlayer
                        } else {
                            currPlayer = xPlayer
                        }
                        display.textContent = `${currPlayer.marker} Player's Turn`
                    }
                }
                else {
                    return
                }
            })
        })
        resetBtn.addEventListener('click', () => {
            currPlayer = xPlayer
            squares.forEach(square => {
                square.textContent = ""
            })
            isOver = false
            gameBoard.board = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8]
            ]
            board = gameBoard.board
            console.log(board)
            display.textContent = `${currPlayer.marker} Player's Turn`
        })
    }
    return {game}

})();

displayGame.game(gameBoard.board)