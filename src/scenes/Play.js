class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //this.load.audio('stag_fly', '././assets/stag_fly.mp3');

        //load tilemaps
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('score', '././assets/stars.png');

        //load sprites
        this.load.image('cartFull', '././assets/cartFull.png');
        this.load.image('cartMed', '././assets/cartMed.png');
        this.load.image('cartLow', '././assets/cartLow.png');
        this.load.image('cart', '././assets/cartFull.png');
        this.load.image('avatar', '././assets/hand.png');
        this.load.image('human', '././assets/human.png');
        this.load.image('chefHigh', '././assets/chefHigh.png');
        this.load.image('chefMid', '././assets/chefMid.png');
        this.load.image('ChefLow', '././assets/chefLow.png');
        

        this.load.image('topping1', '././assets/topping1.png');
        this.load.image('topping2', '././assets/topping2.png');
        this.load.image('topping3', '././assets/topping3.png');

        this.load.image('broth1', '././assets/broth1.png');
        this.load.image('broth2', '././assets/broth2.png');
        this.load.image('broth3', '././assets/broth3.png');

        this.load.image('noodle1', '././assets/noodle1.png');
        this.load.image('noodle2', '././assets/noodle2.png');
        this.load.image('noodle3', '././assets/noodle3.png');

        this.load.image('ingredient1', '././assets/broth1.png');
        this.load.image('ingredient2', '././assets/broth1.png');
        this.load.image('ingredient3', '././assets/broth1.png');

        //load ui
        this.load.image('meter', '././assets/bar.png');
        this.load.image('meterCompleted', '././assets/barCompleted.png');


        // load spritesheet
        //this.load.spritesheet('death', './assets/death_anim.png', {frameWidth: 1, frameHeight: 1000, startFrame: 0, endFrame: 7});
    }

    create(){
        // place tile sprite
        this.bg = this.add.tileSprite(0, 0, 555, 360, 'bg').setOrigin(0, 0);
        this.meter = this.add.tileSprite(160, 0, 20, 5, 'meter').setOrigin(0, 0);
        //this.score = this.add.image(0, 0, 'score').setOrigin(0, 0);
        this.cartVechicle = this.add.tileSprite(-80,game.config.height-200, 1600, 950, 'cart').setScale(0.5, 0.5).setOrigin(0, 0.5);
        // add objs
        this.chef = this.add.image(0,0,'chefMid');
        this.popUpImg = new PopUp(this, 100,100, 'meterCompleted').setScale(0.5, 0.5).setOrigin(0, 0);
        this.ingredient1 = new Ingredient(this, game.config.width + 192, game.config.height-200, 'ingredient1', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient1.pos = 2;
        this.ingredient2 = new Ingredient(this, game.config.width + 300, game.config.height-150, 'ingredient2', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient2.pos = 1;
        this.ingredient3 = new Ingredient(this, game.config.width, game.config.height-100, 'ingredient3', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient3.pos = 0;
        //add human
        this.human = new Human(this, game.config.width, game.config.height-150, 'human', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        //add cart
        this.cart = new Cart(this, 150,game.config.height-150, 'avatar').setScale(0.5, 0.5).setOrigin(0, 0);
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        /*this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });*/
        //used to determine when ingredients and humans are caught
        this.catchZone = 150;
        
        // ui display
        let uiConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '30px',
            backgroundColor: '#ae1f1f',
            color: '#cabbaa',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        this.cashUI = this.add.text(550, 54, 'cash: $'+ game.cash + '.00', uiConfig);
        this.instructionUI = this.add.text(100, 70, 'catch broth!', uiConfig);
        this.ingredientUI = this.add.image(200, 10, game.settings.recipeBroth).setScale(0.5, 0.5).setOrigin(0, 0);
        this.progUITxt = this.add.text(0, 0, 'Progress:', uiConfig);
        
        // game over flag
        this.gameOver = false;
        // 60-second play clockv
        /*this.clock = this.time.delayedCall(game.settings.timer, () => {
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.8;
            game.settings.toppingChance = 0.1; 
        }, null, this);*/
        this.chefPos = 0;
        this.ingredientPhase = 0;
        this.changeIngredientChances();
        /*this.timer = this.time.addEvent({
            delay: game.settings.timer,
            callback: this.changeIngredientChances,
            callbackScope: this,
            loop: true
        });
        
        this.timer = this.time.addEvent({
            delay: 3000,
            callback: this.ingredient1.reset,
            callbackScope: this.ingredient2,
            loop: true
        });
        this.timer = this.time.addEvent({
            delay: 3000,
            callback: this.ingredient1.reset,
            callbackScope: this.ingredient3,
            loop: true
        });*/
        
    }

    start(){
        
    }

    update(){
        this.bg.tilePositionX += 1;
        // check collisions

        
        if(this.checkCatch(this.cart, this.ingredient1)) {
        }
        if(this.checkCatch(this.cart, this.ingredient2)) {
        }
        if(this.checkCatch(this.cart, this.ingredient3)) {
        }
        this.checkHit(this.cart,this.human);
        if(this.ingredient1.x == game.config.width){
            this.changeTexture(this.ingredient1);
        }
        if(this.ingredient2.x == game.config.width){
            this.changeTexture(this.ingredient2);
        }
        if(this.ingredient3.x == game.config.width){
            this.changeTexture(this.ingredient3);
        }

        //stuff for the chef
        
        if(keyUP.isDown && this.chefPos < 2){
            this.posAdd = 1;
        } else if(keyDOWN.isDown && this.chefPos > 0) {
            this.posAdd = -1;
        }
        if(keyUP.isUp && keyDOWN.isUp){
            this.chefPos += this.posAdd;
            this.posAdd = 0;
        }

        if(this.chefPos == 0){
            this.chef.changeTexture('chefLow');
        }else if(this.chefPos == 1){
            this.chef.changeTexture('chefMid');
        } else {
            this.chef.changeTexture('chefLow');
        }




        /*
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.p1Rocket.visible = false;
            this.shipExplode(this.ship01);
        }
        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x2)
            this.ship02.update();
        } */
        this.cart.update();
        this.ingredient1.update();
        this.ingredient2.update();
        this.ingredient3.update();
        this.human.update();
        this.popUpImg.update();
        
    }

    changeIngredientChances(){
        if(this.ingredientPhase == 0){
            this.startPhase0();
        } else if(this.ingredientPhase == 1){
            this.startPhase1();
        } else if(this.ingredientPhase == 2){
            this.startPhase2();
        } else{

            this.ingredientPhase = 0;
        }

    }

    startPhase0(){
        this.getNewOrder();
        this.ingredientUI.setTexture(game.settings.recipeBroth);
        this.instructionUI.text = 'catch broth!';
        this.meter.width = 20;
        game.settings.brothChance = 0.8;
        game.settings.noodleChance = 0.1;
        game.settings.toppingChance = 0.1;
        this.ingredientPhase++;
        this.clock = this.time.delayedCall(game.settings.timer, () => {
            this.startPhase1();
        }, null, this);
    }

    startPhase1(){
        game.settings.brothChance = 0.1;
        game.settings.noodleChance = 0.8;
        game.settings.toppingChance = 0.1;
        this.ingredientPhase++;
        this.clock = this.time.delayedCall(game.settings.timer, () => {
            this.startPhase2();
        }, null, this);
    }

    startPhase2(){
        game.settings.brothChance = 0.1;
        game.settings.noodleChance = 0.1;
        game.settings.toppingChance = 0.8;
        this.ingredientPhase++;
        this.clock = this.time.delayedCall(game.settings.timer, () => {
            this.startPhase3();
        }, null, this);

    }

    startPhase3(){
        this.ingredient1.alpha = 0;
        this.ingredient2.alpha = 0;
        this.ingredient3.alpha = 0;
        this.popUpTxt(200,20, '$'+this.calcCash()+'.00');
        this.cashUI.text = 'cash: $'+ game.cash + '.00';
        this.clock = this.time.delayedCall(game.settings.timer/3, () => {
            this.startPhase0();
        }, null, this);
    }


    spawnIngredient(){
        console.log('spawn');

    }


    changeTexture(ingredient){
        //generate random real number from 0 to 1
        this.num = (Phaser.Math.Between(0,10))/10;


        if(this.num <= game.settings.brothChance){
            ingredient.setTexture('broth'+Phaser.Math.Between(1,3));
        } else if(this.num <= game.settings.brothChance + game.settings.noodleChance){
            ingredient.setTexture('noodle'+Phaser.Math.Between(1,3));
        } else if (this.num >= 1-game.settings.toppingChance){
            ingredient.setTexture('topping'+Phaser.Math.Between(1,3));
        }
        
    }


    checkHit(cart,human){
        if (cart.pos != 1 && human.x <= this.catchZone){
            if(human.alpha !=0){
                game.cartHealth--;
                this.cameras.main.shake(20,0.005);
            }
            human.alpha = 0;
            //alter cart based on health
            if(game.cartHealth<=0){
                //send to market of car is broken
                this.scene.start("marketScene");
            }else if(game.cartHealth < game.settings.maxHealth/2){
                this.cartVechicle.setTexture('cartLow');
            }else if(game.cartHealth < game.settings.maxHealth){
                this.cartVechicle.setTexture('cartMed');
            } else if(this.cartVechicle.texture.key != 'cartFull'){
                //restore to full if necesary
                this.cartVechicle.setTexture('cartFull');
            }
        } else if(human.x <= this.catchZone){
            human.alpha = 0;
        }
    }

    checkCatch(cart, obj) {
        // simple AABB checking
        if (cart.pos == obj.pos && obj.x <= this.catchZone && obj.x >= this.catchZone-50 ) {
            if(obj.texture.key == game.settings.recipeBroth){
                if(game.brothProg < game.maxProg){
                    if(obj.alpha !=0){
                        game.brothProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    this.ingredientUI.setTexture(game.settings.recipeNoodle);
                    this.clock.remove();
                    this.startPhase1();
                    this.instructionUI.text = 'catch noodles!';
                    this.popUpImg = new PopUp(this, 100,100, 'meterCompleted').setScale(0.5, 0.5).setOrigin(0, 0);
                    this.meter.width = 20;
                    game.extras++;
                }
            }
            else if(obj.texture.key == game.settings.recipeNoodle && game.brothProg == game.maxProg){
                if(game.noodleProg < game.maxProg){
                    if(obj.alpha !=0){
                        game.noodleProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    this.ingredientUI.setTexture(game.settings.recipeTopping);
                    this.instructionUI.text = 'catch toppings!';
                    this.clock.remove();
                    this.startPhase2();
                    
                    this.popUpImage('meterCompleted',100,100);
                    this.meter.width = 20;
                    game.extras++;

                }
            }
            else if(obj.texture.key == game.settings.recipeTopping && game.brothProg == game.maxProg && game.noodleProg == game.maxProg){
                if(game.toppingProg < game.maxProg){
                    if(obj.alpha !=0){
                        game.toppingProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    this.ingredientUI.alpha = 0;
                    this.clock.remove();
                    this.startPhase3();
                    this.instructionUI.text = 'deliver the ramen!';
                    this.popUpImage('meterCompleted',100,100);
                    this.meter.width = 20;
                    game.extras++;
                }

            }else{
                game.mistakes++;
            }
            return true;
        } else {
            return false;
        }
    }

    getNewOrder(){
        game.brothProg = 0;
        game.noodleProg = 0;
        game.toppingProg = 0;
        game.settings.recipeBroth = Phaser.Math.RND.pick(game.broths);
        game.settings.recipeNoodle = Phaser.Math.RND.pick(game.noodles);
        game.settings.recipeTopping = Phaser.Math.RND.pick(game.toppings);
        console.log('Order Recieved: ' + game.settings.recipeBroth + ' with ' + game.settings.recipeNoodle + ' and ' + game.settings.recipeTopping);
    }

    popUpImage(img,x,y){
        var image = this.add.image(x, y, img).setOrigin(0, 0);
        this.clock = this.time.delayedCall(500, () => {
            image.destroy();
        }, null, this);
    }

    popUpTxt(txt,x,y){
        var txt = this.add.text(x, y, txt).setOrigin(0, 0);
        this.clock = this.time.delayedCall(500, () => {
            txt.destroy();
        }, null, this);
    }

    calcCash(){
        var totalProg = game.brothProg + game.noodleProg + game.toppingProg;
        var payment = 5;
        if(totalProg < 3){
            payment = 0;
        } else if(totalProg < 5){
            payment = 2;
        } else if(game.extras>0){
            payment++;
        }
        if(game.extras>3){
            payment + 2;
        }
        game.cash += payment;
        return payment;
    }
    /*
    onDestroyed(obj) {
        obj.alpha = 0;                         // temporarily hide obj
        //================================= add animation =================================
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play animation
        boom.on('animationcomplete', () => {  
            this.p1Rocket.visible = true;  // callback after animation completes
            obj.reset();                       // reset obj position
            obj.alpha = 1;                     // make obj visible again
            boom.destroy();                     // remove animation sprite
        });
        // ================================= play sound =================================
        this.sound.play('sfx_explosion');       
    }*/
}