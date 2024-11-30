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

        gameController.switchPlayerTurn();
    } 

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    }
    
    return { getBoard, changeToken, printBoard }
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

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    // a player will choose a square - by typing in console first
    const playRound = (choice) => {
        console.log(`${getActivePlayer().name} chooses ${choice}`);

        gameBoard.changeToken(choice, getActivePlayer().token);

        printNewRound();
    }

    printNewRound();

    return { switchPlayerTurn, getActivePlayer, playRound }
    
    // if player array matches win, end game as win

      // const winningBoards = {
    // 1: ["A1", "B1", "C1" ],
    // 2: ["A2", "B2", "C2" ],
    // 3: ["A3", "B3", "C3" ],

    // 4: ["A1", "A2", "A3" ],
    // 5: ["B1", "B2", "B3" ],
    // 6: ["C1", "C2", "C1" ],

    // 7: ["A1", "B2", "C3" ],
    // 8: ["A3", "B2", "C1" ]}

    // if no more board, end game as tie
    // if not next player turn until end game
})() 

gameController.playRound("00") 
gameController.playRound("01")
gameController.playRound("01")  

