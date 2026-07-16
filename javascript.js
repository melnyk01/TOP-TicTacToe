let gameBoard = {
    board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]
};

let players = {};
let game = {};

function createPlayer(name, marker) {
    this.name = name;
    this.marker = marker;
    this.sayHi = () => console.log(`Hi, my name is ${this.name}`);
};

const alex = new createPlayer('alex', 'O');
const john = new createPlayer('john', 'x');
john.sayHi()
alex.sayHi()

function playRound() {
    for (row of gameBoard.board) {
        console.log(row);
    }
    const humanChoice = +prompt('Please make a move by entering the number of square on a board');
    let humanChoiceRow = Math.floor(humanChoice / 3);
    let humanChoiceColumn = (humanChoice % 3) - 1;
    if (humanChoice % 3 == 0) {
        humanChoiceRow = (humanChoice / 3) - 1;
        humanChoiceColumn = 2;
    }

    const computerChoice = +'9';
    let computerChoiceRow = Math.floor(computerChoice / 3);
    let computerChoiceColumn = (computerChoice % 3) - 1;
    if (computerChoice % 3 == 0) {
        computerChoiceRow = (computerChoice / 3) - 1;
        computerChoiceColumn = 2;
    }

    gameBoard.board[humanChoiceRow][humanChoiceColumn] = 'O';
    gameBoard.board[computerChoiceRow][computerChoiceColumn] = 'X';
    for (row of gameBoard.board) {
        console.log(row);
    }
}

playRound();