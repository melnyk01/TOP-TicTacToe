let gameBoard = {
    board =[
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
    sayHi = () => console.log(`Hi, my name is ${this.name}`);
};

const alex = new createPlayer('alex', 'O');
