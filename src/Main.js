/*===================================================== RAMEN RUN ================================================================
DETAILED CREDITS:
--------Ryan Timothy Marcus--------

title: sound and design lead
contributions:
-Storyboard
-designed mechanics
-theme research
-Music
-SFX
-refined the game idea

-------------Joann Long------------

title: art lead
contributions: 
-ui assets
-chef/player and damage assets
-background art
-ita and goth cart cosmetics
-cosmetic finalizations
-obstacle assets
-merchant asset
-tutorial
-had the game idea


---------------Saenz---------------

title: sole programmer
contributions: 
-the programming
-background concept art
-cart cosmetics(cyber,wave,pride)
-ui concept and design
-


date completed: 3 May 2020
creative tilt justification


===================================================================================================================================*/
let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    backgroundColor: '#cabbaa',
    scene: [ Menu, Play , Market , Credits ]
}
let game = new Phaser.Game(config);
// define game settings
game.hasPlayed = false;
game.level = 0;
game.cash = 3;
game.score = 0;
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
    repairPrice: 2,
    ramenPrice: 5,
    audio: false,
    maxHealth: 4,
    timer: 10000, 
    panSpeed: 8,
    brothChance: .8,
    noodleChance: .1,
    toppingChance: .1,
    recipeBroth: 'broth1',
    recipeNoodle: 'noodle1',
    recipeTopping: 'topping1'
}
game.cartHealth = game.settings.maxHealth;

game.marketGoods = {
    //cosmetics HAVE to be ordered by price, 0 being cheapest and 4 being most expensive!!!
    cosmetics: ['goth','pride','wave','cyber','ita'],
    cosPrices:[10,20,30,40,50],
    cosEq: 'none',
    power: ['power1','power2','power3','power4'],
    powPrices:[10,20,30,40,50],
    powAq: 0,
    violent: ['violent1','violent2','violent3','violent4'],
    violentPrices:[10,20,30,40,50],
    violAq: 0
}
let keyUP, keyDOWN;