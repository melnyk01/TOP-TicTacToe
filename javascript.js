let gameBoard = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    takenSquares: [],
};

let players = [];
let game = {
    tie: 0,
    isActive: false,
};


function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0
};

player = new createPlayer('player', 'O');
players.push(player)
computer = new createPlayer('computer', 'X');
players.push(computer);
console.log({ game, players });

function getHumanChoice() {
    let humanChoice = +prompt('Please make a move by entering the number of square on a board');
    while (gameBoard.takenSquares.includes(humanChoice)) {
        humanChoice = +prompt('This square is already taken, please choose another one');
    }
    gameBoard.takenSquares.push(humanChoice);
    humanChoice = getPosition(humanChoice);
    return humanChoice;
}
function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * (9) + 1);
    while (gameBoard.takenSquares.includes(computerChoice)) {
        computerChoice = Math.floor(Math.random() * (9) + 1);
    }

    gameBoard.takenSquares.push(computerChoice);
    computerChoice = getPosition(computerChoice);
    return computerChoice;

}
function getPosition(square) {
    let row = Math.floor(square / 3);
    let column = (square % 3) - 1;
    if (square % 3 == 0) {
        row = (square / 3) - 1;
        column = 2;
    }
    return [row, column]
}

function printBoard() {
    for (row of gameBoard.board) console.log(row);
}

function columnCheck() {
    let isColumn;
    for (let column = 0; column < 3; column++) {
        oMarkerNumber = 0;
        xMarkerNumber = 0;
        for (let row = 0; row < 3; row++) {
            if (gameBoard.board[row][column] == 'O') {
                oMarkerNumber++;
            } else if (gameBoard.board[row][column] == 'X') {
                xMarkerNumber++;
            }
        }
        if (oMarkerNumber == 3 || xMarkerNumber == 3) {
            isColumn = true;
        }

    }
    return isColumn
}

function rowCheck() {
    let isRow;
    for (row of gameBoard.board) {
        oMarkerNumber = 0;
        xMarkerNumber = 0;
        for (column of row) {
            if (column == 'O') {
                oMarkerNumber++;
            } else if (column == 'X') {
                xMarkerNumber++;
            }

        }
        if (oMarkerNumber == 3 || xMarkerNumber == 3) {
            isRow = true;
        }

    }
    return isRow
}

function diagonalCheck() {
    let isDiagonal;
    let oMarkerNumber = 0;
    let xMarkerNumber = 0;
    for (let i = 0; i < 3; i++) {
        console.log(i);
        if (gameBoard.board[i][i] == 'O') {
            oMarkerNumber++;
        } else if (gameBoard.board[i][i] == 'X') {
            xMarkerNumber++;
        }
        if (oMarkerNumber == 3 || xMarkerNumber == 3) {
            isDiagonal = true;
        }
    }
    oMarkerNumber = 0;
    xMarkerNumber = 0;
    for (let row = 2; row = 0; row--) {
        let column = 0;
        if (gameBoard.board[row][column] == 'O') {
            oMarkerNumber++;
        } else if (gameBoard.board[row][column] == 'X') {
            xMarkerNumber++;
        }
        if (oMarkerNumber == 3 || xMarkerNumber == 3) {
            isDiagonal = true;
        }
        column++
    }
    return isDiagonal

}

function playRound() {
    game.isActive = true;
    while (game.isActive) {

        humanChoice = getHumanChoice();
        if (gameBoard.takenSquares.length < 9) {
            computerChoice = getComputerChoice();
        }
        gameBoard.board[humanChoice[0]][humanChoice[1]] = 'O';
        gameBoard.board[computerChoice[0]][computerChoice[1]] = 'X';
        printBoard();
        if (rowCheck() || columnCheck() || diagonalCheck()) {
            game.isActive = false;
        }

        if (gameBoard.takenSquares.length > 8) {
            game.isActive = false;
        }
    }
}

function playGame() {

    playRound();
}
playGame();