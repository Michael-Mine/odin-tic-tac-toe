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
        token === board[0][2].getValue() && token === board[1][1].getValue() && token === board[0][2].getValue()) { 
            console.log("WIN");    
        } 
    }
    
    return { getBoard, changeToken, printBoard, checkWin }
})();  

function Cell() {
    let value = 0;

    const addToken = (player) => {value = player}

    const getValue = () => value;

    return { addToken, getValue }
} 
 
function createPlayer(name, token) {
    
    const chosenCells = [];
    return { name, token, chosenCells }
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

        gameBoard.checkWin(activePlayer.token) 

        //check board for draw

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { switchPlayerTurn, getActivePlayer, playRound }
    
})() 

gameController.playRound("10") 
gameController.playRound("20") 
gameController.playRound("11")
gameController.playRound("21") 
gameController.playRound("12") 

    // 00, 01, 02
    // 10, 11, 12
    // 20, 21, 22

    // 00, 10, 20
    // 01, 11, 21
    // 02, 12, 22

    // 00, 11, 22
    // 02, 11, 02