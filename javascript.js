let game = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    takenSquares: [],
    players: [],
    tie: 0,
    isActive: false,
    roundWinner: '',
    playerChoice: '',
    computerChoice: '',

};
const board = document.querySelector('.board');
const dialog = document.querySelector('.winner');
const winner = document.querySelector('#winner');
const score = document.querySelector('#score');
const dialogBtn = document.querySelector('#dialog');

dialogBtn.addEventListener('click', () => {
    resetBoard();
    playGame();
})
uiBoard = {


    renderBoard() {
        let buttonId = 1;
        for (row of game.board) {
            for (column of row) {
                const button = document.createElement('button');
                button.innerText = column;
                button.id = buttonId;
                board.appendChild(button);
                buttonId++;
            }
        }
    },

    playRound() {
        board.addEventListener('click', (event) => {
            game.playerChoice = event.target
            if (game.playerChoice.tagName == 'BUTTON' && game.playerChoice.className != 'taken' && game.isActive == true) {
                playerMove()
                if (game.takenSquares.length < 9) {
                    computerMove();
                }
                winnerCheck();
            }
        })
    },
    updateCell(cell) {
        const square = document.getElementById(cell);
        square.textContent = 'X'
    }
}

function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    this.score = 0
};

function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * (9) + 1);
    while (game.takenSquares.includes(computerChoice)) {
        computerChoice = Math.floor(Math.random() * (9) + 1);
    }
    game.takenSquares.push(computerChoice);
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

function rowCheck() {
    let isRow;
    for (row of game.board) {
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
            if (game.board[row][column] == 'O') {
                oMarkerNumber++;
            } else if (game.board[row][column] == 'X') {
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
        if (game.board[i][i] == 'O') {
            oMarkerNumber++;
        } else if (game.board[i][i] == 'X') {
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
        if (game.board[row][column] == 'O') {
            oMarkerNumber++;
        } else if (game.board[row][column] == 'X') {
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
    } else if (game.takenSquares.length > 8) {
        game.isActive = false;
        game.tie++
        dialog.setAttribute('open', '');
        winner.textContent = ('Looks like it\'s a tie!');
        score.textContent = (`Score: ${player.name}: ${player.score} | ${computer.name}: ${computer.score} | Tie: ${game.tie}`)
    }
}

function computerMove() {
    game.computerChoice = getComputerChoice();
    uiBoard.updateCell(game.computerChoice);
    const button = document.getElementById(game.computerChoice);
    button.className = 'taken';
    let cell = getPosition(game.computerChoice);
    game.board[cell[0]][cell[1]] = computer.marker;

}

function playerMove() {
    game.playerChoice.textContent = player.marker;
    game.playerChoice.className = 'taken';
    game.takenSquares.push(+game.playerChoice.id);
    let cell = getPosition(game.playerChoice.id);
    game.board[cell[0]][cell[1]] = 'O';
}

function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            game.board[i][j] = '';
        }
    }
    while (board.lastChild) {
        board.removeChild(board.lastChild)
    }
    game.takenSquares = [];
    game.roundWinner = '';
}

function playGame() {
    game.isActive = true;
    uiBoard.renderBoard();
    uiBoard.playRound();
}

player = new createPlayer('player', 'O');
game.players.push(player)
computer = new createPlayer('computer', 'X');
game.players.push(computer);

playGame();

