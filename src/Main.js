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
//set up progress meters for each ingredient
game.brothProg = 0;
game.noodleProg = 0;
game.toppingProg = 0;
//amount the meters are out of, so if maxProg = 3 then you only need to collect three of each ingredient
game.maxProg = 3;
//mistakes variable might be useful for determining star rating and/or cash
game.mistakes = 0;
game.extras = 0;

game.settings = { 
    panSpeed: 4,
    brothChance: .8,
    noodleChance: .1,
    toppingChance: .1,
    recipeBroth: 'broth1',
    recipeNoodle: 'noodle1',
    recipeTopping: 'topping1'
}
let keyUP, keyDOWN;