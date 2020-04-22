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
    panSpeed: 3,
    brothChance: .8,
    noodleChance: .1,
    toppingChance: .1,
    recipeBroth: 'broth1',
    recipeNoodle: 'noodle1',
    recipeTopping: 'topping1'
}
let keyUP, keyDOWN;