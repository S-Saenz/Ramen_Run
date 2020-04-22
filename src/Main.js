let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 384,
    backgroundColor: '#cabbaa',
    scene: [ Menu, Play , Market ]
}
let game = new Phaser.Game(config);
// define game settings
game.cash;
game.score;
game.settings = { 
    panSpeed = 3
}
let keyUP, keyDOWN;