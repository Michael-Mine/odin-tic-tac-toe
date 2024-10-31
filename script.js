// gameboard as an array inside of a Gameboard object
const gameBoard = {
    board: [ "A1", "B1", "C1", 
            "A2", "B2", "C2", 
            "A3", "B3", "C3" ]
} 

const winningBoards = {
    1: ["A1", "B1", "C1" ],
    2: ["A2", "B2", "C2" ],
    3: ["A3", "B3", "C3" ],

    4: ["A1", "A2", "A3" ],
    5: ["B1", "B2", "B3" ],
    6: ["C1", "C2", "C1" ],

    7: ["A1", "B2", "C3" ],
    8: ["A3", "B2", "C1" ],
}

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

function playerChoice() {
    return prompt("Player 1 turn");
}

function isSquareTakenPlayerOne(square) {
    return playerOne.chosenSquares.includes(square)
}

function isSquareTakenPlayerTwo(square) {
    return playerTwo.chosenSquares.includes(square)
}

function gameController() {

    // a player will choose a square - by typing in console first
    let turn = playerChoice();

    // if square is available (check both players array), add to player array
    if (!(isSquareTakenPlayerOne(turn) || isSqaureTakenPlayerOne(turn))) {
        playerOne.chosenSquares.push(turn);
        console.log(playerOne.chosenSquares);
    }
    // if player array matches win, end game as win

    // if no more board, end game as tie
    // if not next player turn until end game
} 

//gameController();

// Pseudocode 


