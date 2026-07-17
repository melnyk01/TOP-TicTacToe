let gameBoard = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    takenSquares: [],
};
const board = document.querySelector('.board');


dom = {
    renderBoard() {

        let buttonId = 1;
        for (row of gameBoard.board) {
            for (column of row) {
                const button = document.createElement('button');
                button.innerText = column;
                button.id = buttonId;
                board.appendChild(button);
                buttonId++;
            }

        }
        board.addEventListener('click', (event) => {
            game.playerChoice = event.target
            if (game.playerChoice.tagName == 'BUTTON' && game.playerChoice.className != 'taken' && game.isActive == true) {
                game.playerChoice.textContent = 'O';
                game.playerChoice.className = 'taken';
                gameBoard.takenSquares.push(+game.playerChoice.id);
                computerMove();
                let cell = getPosition(game.playerChoice.id);
                console.log(cell);
                gameBoard.board[cell[0]][cell[1]] = 'O';
                console.log(game.computerChoice);
                cell = getPosition(game.computerChoice);
                console.log(cell);
                gameBoard.board[cell[0]][cell[1]] = 'X';
                winnerCheck();

            }
        })

    },

    updateCell(cell) {
        const square = document.getElementById(cell);
        square.textContent = 'X'
    }
}

let game = {
    tie: 0,
    isActive: false,
    roundWinner: '',
    playerChoice: '',
    computerChoice: '',
};
let players = [];


function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0
};

player = new createPlayer('player', 'O');
players.push(player)
computer = new createPlayer('computer', 'X');
players.push(computer);


function getComputerChoice() {
    game.computerChoice = Math.floor(Math.random() * (9) + 1);
    while (gameBoard.takenSquares.includes(game.computerChoice)) {
        game.computerChoice = Math.floor(Math.random() * (9) + 1);
    }
    gameBoard.takenSquares.push(game.computerChoice);
    const button = document.getElementById(game.computerChoice);
    button.className = 'taken';
    return game.computerChoice;

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
        if (oMarkerNumber == 3) {
            isRow = true;
            game.roundWinner = player.name;
        } else if (xMarkerNumber == 3) {
            isRow = true;
            game.roundWinner = computer.name;
        }
    }
    return isRow
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
        if (oMarkerNumber == 3) {
            isColumn = true;
            game.roundWinner = player.name;
        } else if (xMarkerNumber == 3) {
            isColumn = true;
            game.roundWinner = computer.name;
        }

    }
    return isColumn
}
function diagonalCheck() {
    let isDiagonal;
    let oMarkerNumber = 0;
    let xMarkerNumber = 0;
    for (let i = 0; i < 3; i++) {
        if (gameBoard.board[i][i] == 'O') {
            oMarkerNumber++;
        } else if (gameBoard.board[i][i] == 'X') {
            xMarkerNumber++;
        }
        if (oMarkerNumber == 3) {
            isDiagonal = true;
            game.roundWinner = player.name;
        } else if (xMarkerNumber == 3) {
            isDiagonal = true;
            game.roundWinner = computer.name;
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
        if (oMarkerNumber == 3) {
            isDiagonal = true;
            game.roundWinner = player.name;
        } else if (xMarkerNumber == 3) {
            isDiagonal = true;
            game.roundWinner = computer.name;
        }
        column++
    }
    return isDiagonal

}

function displayRoundResult() {
    if (game.roundWinner == player.name) {
        player.score++;
    } else if (game.roundWinner == computer.name) {
        computer.score++
    }
    dialog.setAttribute('open', '');
    winner.textContent = (`${game.roundWinner} won!`);
    score.textContent = (`Score: ${player.name}: ${player.score} | ${computer.name}: ${computer.score} | Tie: ${game.tie}`);
}

function winnerCheck() {
    if (rowCheck() || columnCheck() || diagonalCheck()) {
        game.isActive = false;
        displayRoundResult();
    } else if (gameBoard.takenSquares.length > 8) {
        game.isActive = false;
        game.tie++
        dialog.setAttribute('open', '');
        winner.textContent = ('Looks like it\'s a tie!');
        score.textContent = (`Score: ${player.name}: ${player.score} | ${computer.name}: ${computer.score} | Tie: ${game.tie}`)
    }
}

function computerMove() {
    if (gameBoard.takenSquares.length < 9) {
        game.computerChoice = getComputerChoice();
        dom.updateCell(game.computerChoice);
    }
}

function clearBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard.board[i][j] = '';
        }
    }
    while (board.lastChild) {
        board.removeChild(board.lastChild)
    }
    gameBoard.takenSquares = [];
}

const dialog = document.querySelector('.winner');
const winner = document.querySelector('#winner');
const score = document.querySelector('#score');
const dialogBtn = document.querySelector('#dialog');
dialogBtn.addEventListener('click', () => {
    clearBoard();
    playRound();
})

function playRound() {
    dom.renderBoard();
    game.roundWinner = '';
    game.isActive = true;
}

function playGame() {
    playRound();
}
playGame();

