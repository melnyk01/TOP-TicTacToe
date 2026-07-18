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

    createPlayer(name, marker) {
        const player = {
            name: name,
            marker: marker,
            score: 0,
        }
        this.players.push(player);
        return player
    },
};

uiBoard = {
    board: document.querySelector('.board'),
    dialog: document.querySelector('.winner'),
    winner: document.querySelector('#winner'),
    score: document.querySelector('#score'),
    dialogBtn: document.querySelector('#dialog'),
    resetBtn: document.querySelector('#reset'),

    renderBoard() {
        let buttonId = 1;
        for (row of game.board) {
            for (column of row) {
                const button = document.createElement('button');
                button.innerText = column;
                button.id = buttonId;
                this.board.appendChild(button);
                buttonId++;
            }
        }
    },
    playRound() {
        this.board.addEventListener('click', (event) => {
            game.playerChoice = event.target
            if (game.playerChoice.tagName == 'BUTTON' && game.playerChoice.className != 'taken' && game.isActive == true) {
                playerMove();
                winnerCheck();
                if (game.takenSquares.length < 9 && game.isActive) {
                    computerMove();
                    winnerCheck();
                }

            }
        })
        this.dialogBtn.addEventListener('click', () => {
            resetBoard();
            playGame();
        })
        this.resetBtn.addEventListener('click', () => {
            resetBoard();
            game.tie = 0;
            player.score = 0;
            computer.score = 0;
            playGame();
        })
    },
    updateCell(cell) {
        const square = document.getElementById(cell);
        square.textContent = computer.marker;
    },

    displayRoundResult(state) {
        this.dialog.setAttribute('open', '');
        this.score.textContent = (`Score: ${player.name}: ${player.score} | ${computer.name}: ${computer.score} | Tie: ${game.tie}`)
        switch (state) {
            case 'winner':
                this.winner.textContent = (`${game.roundWinner} won!`);
                break;
            case 'tie':
                this.winner.textContent = ('Looks like it\'s a tie!');
                break;
        }
    },

    resetBoard() {
        while (this.board.lastChild) {
            this.board.removeChild(this.board.lastChild)
        }
    }
}

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
    for (const row of game.board) {
        let oMarkerNumber = 0;
        let xMarkerNumber = 0;
        for (const column of row) {
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
        let oMarkerNumber = 0;
        let xMarkerNumber = 0;
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
    let column = 0;
    for (let row = 2; row >= 0; row--) {

        if (game.board[row][column] == 'O') {
            oMarkerNumber++;
        } else if (game.board[row][column] == 'X') {
            xMarkerNumber++;
        }
        column++
    }
    if (oMarkerNumber == 3) {
        isDiagonal = true;
        game.roundWinner = player.name;
    } else if (xMarkerNumber == 3) {
        isDiagonal = true;
        game.roundWinner = computer.name;
    }
    return isDiagonal

}

function winnerCheck() {
    if (rowCheck() || columnCheck() || diagonalCheck()) {
        game.isActive = false;
        if (game.roundWinner == player.name) {
            player.score++;
        } else if (game.roundWinner == computer.name) computer.score++
        uiBoard.displayRoundResult('winner');
    } else if (game.takenSquares.length > 8) {
        game.isActive = false;
        game.tie++
        uiBoard.displayRoundResult('tie');
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
    uiBoard.resetBoard();
    game.takenSquares = [];
    game.roundWinner = '';

}

function playGame() {

    game.isActive = true;
    uiBoard.renderBoard();
    uiBoard.playRound();
}

player = game.createPlayer('player', 'O');
computer = game.createPlayer('computer', 'X');
playGame();

