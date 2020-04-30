class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        game.level++;
        this.load.audio('PlayMusic', '././assets/RR_Play.mp3');

        //load tilemaps
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('score', '././assets/stars.png');

        //load sprites
        //========== cosmetics ==========
        this.load.image('none', '././assets/cartFull.png');
        this.load.image('wave', '././assets/cartFull_BlueWave.png');
        this.load.image('cyber', '././assets/cartFull_Cyber.png');
        this.load.image('goth', '././assets/cartFull_Goth.png');
        this.load.image('pride', '././assets/cartFull_Pride.png');
        this.load.image('ita', '././assets/cartFull_Pride.png');

        //Damage Sprites
        this.load.image('noDmg', '././assets/noDmg.png');
        this.load.image('lowDmg', '././assets/lowDmg.png');
        this.load.image('medDmg', '././assets/medDmg.png');
        this.load.image('highDmg', '././assets/highDmg.png');


        this.load.image('merchant', '././assets/merchant.png');
        this.load.image('cartMed', '././assets/cartMed.png');
        this.load.image('cartLow', '././assets/cartLow.png');
        this.load.image('cart', '././assets/cartFull.png');
        this.load.image('avatar', '././assets/hand.png');
        this.load.image('bird', '././assets/bird.png');
        this.load.image('human', '././assets/human.png');
        this.load.image('blood','././assets/blood.png');

        //the player images
        this.load.image('chefHigh', '././assets/chefHigh.png');
        this.load.image('chefMid', '././assets/chefMid.png');
        this.load.image('chefLow', '././assets/chefLow.png');
        

        this.load.image('topping1', '././assets/topping1.png');
        this.load.image('topping2', '././assets/topping2.png');
        this.load.image('topping3', '././assets/topping3.png');

        this.load.image('broth1', '././assets/broth1.png');
        this.load.image('broth2', '././assets/broth2.png');
        this.load.image('broth3', '././assets/broth3.png');

        this.load.image('noodle1', '././assets/noodle1.png');
        this.load.image('noodle2', '././assets/noodle2.png');
        this.load.image('noodle3', '././assets/noodle3.png');

        //load ui
        this.load.image('meter', '././assets/bar.png');
        this.load.image('meterCompleted', '././assets/barCompleted.png');

        
        //buttons
        this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('audioOn', '././assets/audioOn.png');


        // load spritesheet
        //this.load.spritesheet('death', './assets/death_anim.png', {frameWidth: 1, frameHeight: 1000, startFrame: 0, endFrame: 7});
    }

    create(){
        // place tile sprite
        this.bg = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        this.meter = this.add.tileSprite(game.config.width/8, 0, 20, 10, 'meter').setOrigin(0, 0);
        //this.score = this.add.image(0, 0, 'score').setOrigin(0, 0);
        this.cartVechicle = this.add.image(-80,game.config.height-200, game.marketGoods.cosEq).setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.cartDmg = this.add.image(-80,game.config.height-200, 'noDmg').setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.cartDmg.setDepth(3);        // add objs
        this.popUpImg = new PopUp(this, 100,100, 'meterCompleted').setScale(0.5, 0.5).setOrigin(0, 0);
        this.ingredient1 = new Ingredient(this, game.config.width * 1.2, game.config.height-400, 'ingredient1', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient1.pos = 2;
        this.ingredient2 = new Ingredient(this, game.config.width * 1.3, game.config.height-280, 'ingredient2', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient2.pos = 1;
        this.ingredient3 = new Ingredient(this, game.config.width * 1.6, game.config.height-150, 'ingredient3', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient3.pos = 0;
        //batch 2 of ingredients
        
        this.ingredient4 = new Ingredient(this, game.config.width * 1.8, game.config.height-400, 'ingredient1', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient4.pos = 2;
        this.ingredient5 = new Ingredient(this, game.config.width * 1.9, game.config.height-280, 'ingredient2', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient5.pos = 1;
        this.ingredient6 = new Ingredient(this, game.config.width * 1.95, game.config.height-150, 'ingredient3', 0, 30).setScale(0.5, 0.5).setOrigin(0,0);
        this.ingredient6.pos = 0;

        this.ingredients = [this.ingredient1,this.ingredient2,this.ingredient3,this.ingredient4,this.ingredient5,this.ingredient6];
        this.ingredients.forEach(element => {
            this.changeTexture(element);
        });
        //add human
        this.human = new Human(this, game.config.width, game.config.height-140, 'human', 0, 30).setScale(0.48, 0.48).setOrigin(0,0.5);
        this.human.pos = 0;
        if(game.level>=2){
            this.bird = new Bird(this, game.config.width*2, game.config.height-400, 'bird', 0, 30).setScale(0.48, 0.48).setOrigin(0,0.5);
            this.bird.pos = 2;
        }
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
        this.catchZone = 550;
        
        // ui display
        let uiConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '30px',
            backgroundColor: '#ae1f1f',
            align: 'center',
            color: '#cabbaa',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        this.cashUI = this.add.text(game.config.width-100, 54, 'cash: ¥'+ game.cash + '00', uiConfig).setOrigin(1,1);
        this.instructionUI = this.add.text(game.config.width/2, game.config.height/3, 'catch ' + game.maxProg + ' broth!' , uiConfig).setOrigin(0.5,0.5);
        this.ingredientUI = this.add.image(game.config.width/2, (game.config.height/3)-100, game.settings.recipeBroth).setOrigin(0.5,0.5);
        this.progUITxt = this.add.text(0, 0, 'Progress:', uiConfig);
        this.chef = this.add.image((this.cartVechicle.width/3)+50,485,'chefMid').setScale(0.5, 0.5);
        this.calculatedCash = false;
        
        // game over flag
        this.gameOver = false;
        // 60-second play clockv
        /*this.clock = this.time.delayedCall(game.settings.timer, () => {
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.8;
            game.settings.toppingChance = 0.1; 
        }, null, this);*/
        this.chefPos = 1;
        this.posAdd = 0;
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
        //====================== particle emmiter =========================
        this.particles = this.add.particles('blood');

        //========================= music =========================
        this.playMusic = this.sound.add('PlayMusic');

        var musicConfig = {
          mute: true,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 1
        }

        this.playMusic.play(musicConfig);

        //====================== buttons ======================
        this.audio = this.add.image(100,game.config.height-100, 'audioOff').setScale(0.25,0.25);
        
        this.audio.on('pointerdown', () => { 
            // easy mode
            game.settings.audio = !game.settings.audio;
            this.menuMusic.setMute(!this.menuMusic.mute);
            if(!this.menuMusic.mute){
                this.audio.setTexture('audioOff');
            } else{
                this.audio.setTexture('audioOn');
            }

        });

        
        if(game.settings.audio){
            this.playMusic.setMute(false);
            this.audio.setTexture('audioOn');
        }

        
    }

    start(){
        
    }

    update(){
        this.bg.tilePositionX += 7;
        // check collisions


        this.ingredients.forEach(element => {
            this.checkCatch(this.cart,element);
        });
        /*
        if(this.checkCatch(this.cart, this.ingredient1)) {
        }
        if(this.checkCatch(this.cart, this.ingredient2)) {
        }
        if(this.checkCatch(this.cart, this.ingredient3)) {
        }*/
        this.checkHit(this.cart,this.human);
        if(game.level>=2){
            console.log('bird pos : ' + this.bird.pos);
            this.checkHit(this.cart,this.bird);
        }
        this.ingredients.forEach(element => {
            if(element.x == game.config.width){
                this.changeTexture(element);
            }
        });
        /*
        if(this.ingredient1.x == game.config.width){
            this.changeTexture(this.ingredient1);
        }
        if(this.ingredient2.x == game.config.width){
            this.changeTexture(this.ingredient2);
        }
        if(this.ingredient3.x == game.config.width){
            this.changeTexture(this.ingredient3);
        }*/

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
            this.chef.setTexture('chefLow');
            this.chef.y = 480;
            this.chef.x = 460;
            this.cartVechicle.setDepth(0);
            this.chef.setDepth(1);
        }else if(this.chefPos == 1){
            this.chef.setTexture('chefMid');
            this.chef.y = 415;
            this.chef.x = 488;
            this.cartVechicle.setDepth(2);
        } else {
            this.chef.y = 383;
            this.chef.x = 500;
            this.chef.setTexture('chefHigh');
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
        this.ingredients.forEach(element => {
            element.update();
        });
        this.human.update();
        if(game.level>=2){this.bird.update();}
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
        this.calculatedCash = false;
        this.ingredientUI.alpha = 1;
        this.getNewOrder();
        this.ingredientUI.setTexture(game.settings.recipeBroth);
        console.log('set texture to new broth');
        this.instructionUI.text = 'catch ' + game.maxProg + ' broth!';
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
        this.payment = this.calcCash();
        if(this.payment>0){
            this.popUpTxt(200,20, '¥'+this.payment+'00');
        }
        this.cashUI.text = 'cash: ¥'+ game.cash + '00';
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
        var prob = Phaser.Math.Between(0,1);


        if(this.num <= game.settings.brothChance){
            ingredient.setTexture('broth'+Phaser.Math.Between(1,3));
            if(prob == 0){
                ingredient.setTexture(game.settings.recipeBroth);
            }
        } else if(this.num <= game.settings.brothChance + game.settings.noodleChance){
            ingredient.setTexture('noodle'+Phaser.Math.Between(1,3));
            if(prob == 0){
                ingredient.setTexture(game.settings.recipeNoodle);
            }
        } else if (this.num >= 1-game.settings.toppingChance){
            ingredient.setTexture('topping'+Phaser.Math.Between(1,3));
            if(prob == 0){
                ingredient.setTexture(game.settings.recipeTopping);
            }
        }
        
    }


    checkHit(cart,human){
        if (cart.pos != human.pos && human.x <= this.catchZone){
            this.popUpImage(300,100,'merchant');
            if(human.alpha !=0){
                //particle emmiter    
                var bloodyMess = this.particles.createEmitter({
                    x: this.catchZone,
                    y: human.y,
                    lifespan: 2000,
                    speed: { min: 700, max: 2000 },
                    angle: 330,
                    gravityY: 300,
                    rotate: { min: 0, max: 180 },
                    scale: { start: 0.4, end: 5 },
                    quantity: 4,

                });
                this.time.delayedCall(100, () => {
                    bloodyMess.stop();
                }, null, this);

                game.cartHealth--;
                this.cameras.main.shake(20,.005);
            }
            human.alpha = 0;
            //alter cart based on health
            if(game.cartHealth<=0){
                //send to market of car is broken
                this.scene.start("marketScene");
            }else if(game.cartHealth < 2){
                this.cartDmg.setTexture('highDmg');
            }else if(game.cartHealth < game.settings.maxHealth/2){
                this.cartDmg.setTexture('medDmg');
            }else if(game.cartHealth < game.settings.maxHealth){
                this.cartDmg.setTexture('lowDmg');
            } else if(this.cartDmg.texture.key != 'noDmg'){
                //restore to full if necesary
                this.cartDmg.setTexture('noDmg');
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
                    this.instructionUI.text = 'catch ' + (game.maxProg-game.brothProg) + ' more broth!';
                    if(obj.alpha !=0){
                        game.brothProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    obj.alpha = 0;
                    if(this.ingredientPhase>0){
                        this.ingredientUI.setTexture(game.settings.recipeNoodle);
                        this.clock.remove();
                        this.startPhase1();
                        this.instructionUI.text = 'catch noodles!';
                        this.popUpImg = new PopUp(this, 100,100, 'meterCompleted').setScale(0.5, 0.5).setOrigin(0, 0);
                        this.meter.width = 20;
                    }
                    if(obj.alpa != 0){
                        game.extras++;
                    }
                }
            }
            else if(obj.texture.key == game.settings.recipeNoodle && game.brothProg == game.maxProg){
                if(game.noodleProg < game.maxProg){
                    this.instructionUI.text = 'catch ' + (game.maxProg-game.noodleProg) + ' more noodles!';
                    if(game.maxProg-game.noodleProg == 1){
                        this.instructionUI.text = 'catch 1 more noodle!';
                    }
                    if(obj.alpha !=0){
                        game.noodleProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    obj.alpha = 0;
                    if(this.ingredientPhase>1){
                        this.ingredientUI.setTexture(game.settings.recipeTopping);
                        this.instructionUI.text = 'catch ' + game.maxProg +'toppings!';
                        this.clock.remove();
                        this.startPhase2();
                        
                        this.popUpImage('meterCompleted',100,100);
                        this.meter.width = 20;
                    }
                    if(obj.alpa != 0){
                        game.extras++;
                    }

                }
            }
            else if(obj.texture.key == game.settings.recipeTopping && game.brothProg == game.maxProg && game.noodleProg == game.maxProg){
                if(game.toppingProg < game.maxProg){
                    this.instructionUI.text = 'catch ' + (game.maxProg-game.toppingProg) + ' more toppings!';
                    if(game.maxProg-game.noodleProg == 1){
                        this.instructionUI.text = 'catch 1 more topping!';
                    }
                    if(obj.alpha !=0){
                        game.toppingProg++;
                        this.meter.width += 50;
                        obj.alpha = 0;
                    }
                } else {
                    obj.alpha = 0;
                    
                    if(this.ingredientPhase>2){
                        this.ingredientUI.alpha = 0;
                        this.clock.remove();
                        this.startPhase3();
                        this.instructionUI.text = 'wait for the ramen to be delivered';
                        this.popUpImage('meterCompleted',100,100);
                        this.meter.width = 20;
                    }
                    if(obj.alpa != 0){
                        game.extras++;
                    }
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
        var popUpImag = new PopUp(this, x,y, img).setScale(0.5, 0.5).setOrigin(0, 0);
        
        this.clock = this.time.delayedCall(500, () => {
            popUpImag.destroy();
        }, null, this);
        /*
        var image = this.add.image(x, y, img).setOrigin(0, 0);
        this.clock = this.time.delayedCall(500, () => {
            image.destroy();
        }, null, this);
        */
    }

    popUpTxt(txt,x,y){
        var txt = this.add.text(x, y, txt).setOrigin(0, 0);
        this.clock = this.time.delayedCall(500, () => {
            txt.destroy();
        }, null, this);
    }

    calcCash(){
        if(!this.calculatedCash){
            console.log('calculation cash: ' + game.cash);
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
            this.calculatedCash = true;
            return payment;
        }
        return 0;
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