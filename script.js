const gameBoard = (function () {

    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const changeToken = (choice, player) => {
        const row = Number(choice.charAt(0));
        const column = Number(choice.charAt(1));

        if (board[row][column].getValue() !== 0) {
            console.log("Square is not available, please choose again!");
            return 
        } 

        board[row][column].addToken(player);
    } 
    // only for console game before adding UI
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }

    const checkWin = (token) => {
        console.log(token)  
        if (
        token === board[0][0].getValue() && token === board[0][1].getValue() && token === board[0][2].getValue() ||
        token === board[1][0].getValue() && token === board[1][1].getValue() && token === board[1][2].getValue() ||
        token === board[2][0].getValue() && token === board[2][1].getValue() && token === board[2][2].getValue() ||

        token === board[0][0].getValue() && token === board[1][0].getValue() && token === board[2][0].getValue() ||
        token === board[0][1].getValue() && token === board[1][1].getValue() && token === board[2][1].getValue() ||
        token === board[0][2].getValue() && token === board[1][2].getValue() && token === board[2][2].getValue() ||

        token === board[0][0].getValue() && token === board[1][1].getValue() && token === board[2][2].getValue() ||
        token === board[2][0].getValue() && token === board[1][1].getValue() && token === board[0][2].getValue()) { 
            console.log("WIN");     
        } else {
            checkDraw();
        }
    }

    const checkDraw = () => {
        if (board.every((row) => row.every((cell) => cell.getValue() !== 0))) { 
            console.log("DRAW");  
        } else {
            gameController.switchPlayerTurn();
            gameController.printNewRound();
        }
    }

    return { getBoard, changeToken, printBoard, checkWin, checkDraw }
})();  

function Cell() {
    let value = 0;

    const addToken = (player) => {value = player}

    const getValue = () => value;

    return { addToken, getValue }
} 
 
function createPlayer(name, token) {
    
    return { name, token }
}

// token 1 will be X and go first (explain on UI)
const playerOne = createPlayer("Mike", 1);
const playerTwo = createPlayer("Monika", 2)

const gameController = (function () {

    const players = [playerOne, playerTwo];
    
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // for UI version
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    // a player will choose a square - by typing in console first
    const playRound = (choice) => {
        console.log(`${getActivePlayer().name} chooses ${choice}`);

        gameBoard.changeToken(choice, getActivePlayer().token);

        gameBoard.checkWin(activePlayer.token); 
    }

    printNewRound();

    return { switchPlayerTurn, getActivePlayer, playRound, printNewRound }
    
})() 

const screenController = (function () {
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = gameBoard.getBoard();
        const activePlayer = gameController.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement("button");
                
                cellButton.classList.add("cell");
                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    
    updateScreen();
})()

// gameController.playRound("10") 
// gameController.playRound("20") 
// gameController.playRound("21")
// gameController.playRound("11") 
// gameController.playRound("00") 
// gameController.playRound("01") 
// gameController.playRound("02")
// gameController.playRound("12")
// gameController.playRound("22")     

    // 00, 01, 02
    // 10, 11, 12
    // 20, 21, 22

    // 00, 10, 20
    // 01, 11, 21
    // 02, 12, 22

    // 00, 11, 22
    // 02, 11, 02