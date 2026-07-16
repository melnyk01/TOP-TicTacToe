let gameBoard = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ],
    takenSquares: [],
};

let players = {};
let game = {
    alexScore: 0,
    johnScore: 0,
    tie: 0,
};


function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
};

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
const alex = new createPlayer('alex', 'O');
const john = new createPlayer('john', 'x');


function playGame() {

    function playRound() {
        let roundFlag = true;
        while (roundFlag) {
            let oMarkerNumber = 0;
            let xMarkerNumber = 0;


            if (roundFlag) {
                humanChoice = getHumanChoice();
                computerChoice = getComputerChoice();

                gameBoard.board[humanChoice[0]][humanChoice[1]] = 'O';
                gameBoard.board[computerChoice[0]][computerChoice[1]] = 'X';


            }
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
                console.log(row);
                if (oMarkerNumber == 3 || xMarkerNumber == 3) {
                    roundFlag = false;
                }

            }

        }

    }

    playRound();

}


playGame();