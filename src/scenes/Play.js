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
        this.meter = this.add.tileSprite(0, 0, 20, 5, 'meter').setOrigin(0, 0);
        this.score = this.add.tileSprite(0, 0, 50, 50, 'score').setOrigin(0, 0);
        this.cartVechicle = this.add.tileSprite(-10,game.config.height-200, 600, 330, 'cart').setScale(0.5, 0.5).setOrigin(0, 0);
        // add objs
        this.ingredient1 = new Ingredient(this, game.config.width + 192, game.config.height-200, 'ingredient1', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient1.pos = 2;
        this.ingredient2 = new Ingredient(this, game.config.width + 300, game.config.height-150, 'ingredient2', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient2.pos = 1;
        this.ingredient3 = new Ingredient(this, game.config.width, game.config.height-100, 'ingredient3', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient3.pos = 0;
        //add human
        this.human = new Human(this, game.config.width, game.config.height-150, 'human', 0, 30).setScale(0.25, 0.25).setOrigin(0,0);
        //add cart
        this.cart = new Cart(this, 150,game.config.height-200, 'avatar').setScale(0.5, 0.5).setOrigin(0, 0);
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        // animation config
        /*this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('death', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });*/
        // score & cash
        this.score = 0;
        this.cash = 0;
        
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
        this.cash = this.add.text(550, 54, "cash:" + this.cash , uiConfig);
        
        // game over flag
        this.gameOver = false;
        // 60-second play clockv
        /*this.clock = this.time.delayedCall(game.settings.timer, () => {
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.8;
            game.settings.toppingChance = 0.1; 
        }, null, this);*/
        
        this.ingredientPhase = 0;

        this.timer = this.time.addEvent({
            delay: game.settings.timer,
            callback: this.changeIngredientChances,
            callbackScope: this,
            loop: true
        });
        /*
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
        
    }

    changeIngredientChances(){
        if(this.ingredientPhase == 0){
            this.getNewOrder();
            game.settings.brothChance = 0.8;
            game.settings.noodleChance = 0.1;
            game.settings.toppingChance = 0.1;
            this.ingredientPhase++;
        } else if(this.ingredientPhase == 1){
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.8;
            game.settings.toppingChance = 0.1;
            this.ingredientPhase++;
        } else if(this.ingredientPhase == 2){
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.1;
            game.settings.toppingChance = 0.8;
            this.ingredientPhase++;
        } else{
            this.ingredient1.alpha = 0;
            this.ingredient2.alpha = 0;
            this.ingredient3.alpha = 0;
            this.ingredientPhase = 0;
        }

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
        if (cart.pos != 1 && human.x <= this.cartVechicle.width){
            if(human.alpha !=0){
                game.cartHealth--;
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
        } else{
            human.alpha = 0;
        }
    }

    checkCatch(cart, obj) {
        // simple AABB checking
        if (cart.pos == obj.pos && obj.x <= cart.width && obj.x >= cart.width-20 ) {
            if(obj.texture.key == game.settings.recipeBroth){
                if(game.brothProg < game.maxProg){
                    if(obj.alpha !=0){
                        game.brothProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    this.meterCompleted = this.add.sprite(100, 0, 555, 360, 'meterCompleted').setOrigin(0, 0);
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
                    this.meterCompleted = this.add.sprite(100, 0, 555, 360, 'meterCompleted').setOrigin(0, 0);
                    this.meter.width = 20;

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
                    this.meterCompleted = this.add.sprite(100, 0, 555, 360, 'meterCompleted').setOrigin(0, 0);
                    this.meter.width = 20;
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