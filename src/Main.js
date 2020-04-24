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
game.cartHealth;
game.broths = ['broth1','broth2','broth3'];
game.noodles = ['noodle1','noodle2','noodle3'];
game.toppings = ['topping1','topping2','topping3'];

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
    maxHealth: 1,
    timer: 10000, 
    panSpeed: 4,
    brothChance: .8,
    noodleChance: .1,
    toppingChance: .1,
    recipeBroth: 'broth1',
    recipeNoodle: 'noodle1',
    recipeTopping: 'topping1'
}
game.cartHealth = game.settings.maxHealth;

game.marketGoods = {
    cosmetics: ['cos1','cos2','cos3','cos4','cos5'],
    cosAq: [],
    power: ['power1','power2','power3','power4'],
    powAq: 0,
    violent: ['violent1','violent2','violent3','violent4'],
    violAq: 0
}
let keyUP, keyDOWN;