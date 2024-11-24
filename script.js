// gameboard as an array inside of a Gameboard object

const gameBoard = (function () {
    const printBoard = {
    board: [ "A1", "B1", "C1", 
            "A2", "B2", "C2", 
            "A3", "B3", "C3" ]}
    console.log(printBoard);
    
    const winningBoards = {
    1: ["A1", "B1", "C1" ],
    2: ["A2", "B2", "C2" ],
    3: ["A3", "B3", "C3" ],

    4: ["A1", "A2", "A3" ],
    5: ["B1", "B2", "B3" ],
    6: ["C1", "C2", "C1" ],

    7: ["A1", "B2", "C3" ],
    8: ["A3", "B2", "C1" ]}
    
    
    return printBoard, winningBoards
})(); 

console.log(gameBoard.printBoard)

function createPlayer(name, mark) {
    let turn = "";
    if (mark == "X") {
        turn = "yes"
    } else {
        turn = "no"
    }
    const chosenSquares = [];
    return { name, mark, turn, chosenSquares }
}

const playerOne = createPlayer("Mike", "X");
const playerTwo = createPlayer("Monika", "O")

// an object to control the flow of the game itself.

const gameController = (function () {

    // a player will choose a square - by typing in console first

    function playerChoice() {
    return prompt("Player 1 turn");
    }

    let choice = playerChoice();

    // if square is available (check both players array), add to player array & change board

    function isSquareTakenPlayerOne(square) {
    return playerOne.chosenSquares.includes(square)
    }

    function isSquareTakenPlayerTwo(square) {
    return playerTwo.chosenSquares.includes(square)
    }

    if (!(isSquareTakenPlayerOne(choice) || isSquareTakenPlayerOne(choice))) {
        playerOne.chosenSquares.push(choice);
        console.log(playerOne.chosenSquares);

    }


    // if player array matches win, end game as win

    // if no more board, end game as tie
    // if not next player turn until end game
})()
