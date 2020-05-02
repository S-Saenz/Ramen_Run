class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        game.level++;
        this.load.audio('PlayMusic', '././assets/RR_Play.wav');

        //load tilemaps
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('score', '././assets/stars.png');


        //animations
        this.load.atlas('birdSheet','././assets/birdSheet.png','././assets/birdSheet.json');

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
        this.load.image('chefDeliver', '././assets/chefDelivery.png');
        this.load.image('chefHigh', '././assets/chefHigh.png');
        this.load.image('chefMid', '././assets/chefMid.png');
        this.load.image('chefLow', '././assets/chefLow.png');
        
        this.load.image('customer', '././assets/customer.png');
        

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
        this.load.image('tutorial', '././assets/tutorial.png');
        this.load.image('ingredientFacade', '././assets/ingredientFacade.png');
        this.load.image('ingredientBox', '././assets/ingredientBox.png');
        this.load.image('wallet', '././assets/wallet.png');
        this.load.image('uiBowl', '././assets/uiBowl.png');
        this.load.image('uiBowlDone', '././assets/uiBowlDone.png');
        this.load.image('uiBowlFull', '././assets/uiBowlFull.png');

        
        //buttons
        this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('audioOn', '././assets/audioOn.png');


        // load spritesheet
        //this.load.spritesheet('death', './assets/death_anim.png', {frameWidth: 1, frameHeight: 1000, startFrame: 0, endFrame: 7});
    }

    create(){




        //texture atlas
        /*this.birdy = this.add.sprite(200,200,'birdSheet','bird1');

        this.anims.create({
            key:'flying',
            frames: [
                {frame: 'bird1'},
                {frame: 'bird2'}
            ],
            defaultTextureKey: 'birdSheet',    
            repeat: -1
        });

        this.birdy.anims.play('flying');*/

        // place background stuff
        this.bg = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        this.customer = this.add.image(925,237, 'customer').setScale(0.5, 0.5).setOrigin(0, 0.5);

        //cart stuff
        this.cartVechicle = this.add.image(-80,game.config.height-200, game.marketGoods.cosEq).setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.cartDmg = this.add.image(-80,game.config.height-200, 'noDmg').setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.cartDmg.setDepth(2);        
        
        // add ingredients
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

            //set up ingredient array
        this.ingredients = [this.ingredient1,this.ingredient2,this.ingredient3,this.ingredient4,this.ingredient5,this.ingredient6];
            //initialize ingredient type
        this.ingredients.forEach(element => {
            this.changeTexture(element);
        });

        //add obstacles acording to level
        this.human = new Human(this, game.config.width, game.config.height-140, 'human', 0, 30).setScale(0.48, 0.48).setOrigin(0,0.5);
        this.human.pos = 0;
        if(game.level>=2){
            this.bird = new Bird(this, game.config.width*2, game.config.height-400, 'bird', 0, 30).setScale(0.48, 0.48).setOrigin(0,0.5);
            this.bird.pos = 2;
            this.bird.dist = 2;
        }
        if(game.level>=4){
            this.bird2 = new Bird(this, game.config.width*3, game.config.height-400, 'bird', 0, 30).setScale(0.48, 0.48).setOrigin(0,0.5);
            this.bird2.pos = 2;
            this.bird.dist = 3;
        }

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
        
        //========================== ui display =========================
        let uiConfig = {
            fontFamily: 'Nikumaru',
            fontStyle: 'bold',
            fontSize: '35px',
            align: 'center',
            color: '#FFF',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
        }
        this.ingredientBox = this.add.image(game.config.width, 0, 'ingredientBox').setOrigin(1,0).setScale(0.4);
        //================== ui bowls ==================

        this.bowlPadding = 8.5;
        this.bowlWidth = 240*0.4;
        this.bowlHeight = 150*0.4;

        this.bowl1 = this.add.image(game.config.width-(this.bowlWidth*2 + this.bowlPadding), 16, 'uiBowl').setOrigin(1,0).setScale(0.4);
        this.bowl2 = this.add.image(game.config.width-(this.bowlWidth + this.bowlPadding), 16, 'uiBowl').setOrigin(1,0).setScale(0.4);
        this.bowl3 = this.add.image(game.config.width - this.bowlPadding, 16, 'uiBowl').setOrigin(1,0).setScale(0.4);

        this.bowlProg = this.bowl1.width/game.maxProg;

        this.bowlFull1 = this.add.tileSprite(game.config.width-(this.bowlWidth*3 + this.bowlPadding), 16, this.bowlProg , 150, 'uiBowlFull').setOrigin(0,0).setScale(0.4);
        this.bowlFull2 = this.add.tileSprite(game.config.width-(this.bowlWidth*2 + this.bowlPadding), 16, this.bowlProg, 150, 'uiBowlFull').setOrigin(0,0).setScale(0.4);
        this.bowlFull3 = this.add.tileSprite(game.config.width-(this.bowlWidth + this.bowlPadding), 16, this.bowlProg, 150, 'uiBowlFull').setOrigin(0,0).setScale(0.4);
        //set invisible
        this.bowlFull1.alpha = 0;
        this.bowlFull2.alpha = 0;
        this.bowlFull3.alpha = 0;

        this.instructionUI = this.add.text(game.config.width-130, 220, 'catch ' + game.maxProg + ' broth!' , uiConfig).setOrigin(0.5,0.5);
        this.ingredientUI = this.add.image(game.config.width-90, 70, game.settings.recipeBroth).setOrigin(1,0).setScale(0.75,0.75);
        this.wallet = this.add.image(0, 0, 'wallet').setOrigin(0).setScale(0.4);
        this.cashUI = this.add.text(130, 120, '¥'+ game.cash + '00', uiConfig).setOrigin(1,1);
        if(game.cash >= 10){
            this.cashUI.text = '¥'+ game.cash/10 + 'k';

        }else{
            this.cashUI.text = '¥'+ game.cash + '00';
        }
        this.chef = this.add.image((this.cartVechicle.width/3)+50,485,'chefMid').setScale(0.5, 0.5);
        this.calculatedCash = false;
        
        // game over flag
        this.gameOver = false;
        this.chefPos = 1;
        this.posAdd = 0;
        this.ingredientPhase = 0;
        this.naturalProg = true;

        this.timer = this.time.addEvent({
            delay: game.settings.timer,
            callback: this.phaseProgress,
            callbackScope: this,
            loop: true
        });
        this.phaseProgress();
/*
        this.timerConfig = {
            delay: game.settings.timer,
            callback: this.phaseProgress(),
            callbackScope: this,
            loop: true
        }
*/

        



        /*
         60-second play timer
        this.timer = this.time.delayedCall(game.settings.timer, () => {
            game.settings.brothChance = 0.1;
            game.settings.noodleChance = 0.8;
            game.settings.toppingChance = 0.1; 
        }, null, this);
        this.timer = this.time.delayedCall(game.settings.timer, () => {
            this.phaseProgress();
            console.log('timer has been set');
        }, null, this);
        
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
          volume: 0.5,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 1
        }

        this.playMusic.play(musicConfig);

        //====================== buttons ======================
        this.audio = this.add.image(100,game.config.height-100, 'audioOff').setScale(0.25,0.25);
        this.audio.setDepth(4);
        this.audio.setInteractive();
        
        this.audio.on('pointerdown', () => { 
            // easy mode
            console.log('click for audio');
            this.playMusic.setMute(!this.playMusic.mute);
            if(!this.playMusic.mute){
                game.settings.audio = false;
                this.audio.setTexture('audioOff');
            } else{
                game.settings.audio = true;
                this.audio.setTexture('audioOn');
            }

        });

        if(game.settings.audio){
            this.playMusic.setMute(false);
            this.audio.setTexture('audioOn');
        }




        
        //===================================================== TUTORIAL =====================================================
        this.startPlay = false;
        this.hitPlay = false;
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        this.bgFacade = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        this.ingredientFacade = this.add.image(game.config.width+920, 0, 'ingredientFacade').setOrigin(1,0).setScale(0.4);
        this.walletFacade = this.add.image(-920, 0, 'wallet').setOrigin(0).setScale(0.4);
        this.cartFacade = this.add.image(-1000,game.config.height-200, 'none').setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.tutorial = this.add.image(centerX,centerY,'tutorial').setOrigin(0.5).setScale(0.4);

        

        // ==================== add buttons ============
        this.playButton = this.add.image(game.config.width-150,centerY+250, 'playButton').setScale(0.25,0.25).setOrigin(0.5,0.5);
      
        //============== set interactive ==================

        this.playButton.setInteractive();

        //=========== functionality ============

        this.playButton.on('pointerdown', () => { 
            // easy mode
            this.hitPlay = true;
        });

        this.playButton.on('pointerover', () => { 
            this.playButton.setTexture('playButtonHover');
        });
        this.playButton.on('pointerout', () => { 
            this.playButton.setTexture('playButton');
        });
      
        //==========================================================================================================

        
    }

    start(){
        
    }

    update(){
        //===================================================== TUTORIAL =====================================================

        this.bgFacade.tilePositionX += 3;
        if(this.hitPlay){
            this.tutorial.y -= 10;
            this.walletFacade.x+=10;
            this.cartFacade.x +=10;
            this.ingredientFacade.x -= 10;
        }
        if(this.cartFacade.x >= -70){
            this.walletFacade.alpha = 0;
            this.ingredientFacade.alpha = 0;
            this.cartFacade.alpha = 0;
            this.bgFacade.alpha = 0;
            this.startPlay = true;
        }


        //==========================================================================================================


        if(this.startPlay){
            //background movements
            this.bg.tilePositionX += 7;
            this.customer.x -= 3.5;
    
            // check collisions and catches
            if(this.customer.x <= 0){
                this.customer.x = game.config.width-259;
            }
            this.ingredients.forEach(element => {
                this.checkCatch(element);
            });
            this.checkHit(this.human);
            if(game.level>=2){
                this.checkHit(this.bird);
            }
            if(game.level>=4){
                this.checkHit(this.bird2);
            }
            if(this.chef.texture.key == 'chefDeliver' && this.ingredientPhase == 4 ){
                this.checkDeliver();
            }

            //change ingredient when it respawns
            this.ingredients.forEach(element => {
                if(element.x == game.config.width){
                    this.changeTexture(element);
                }
            });
    
            //chef/player movement -- key input
            if(keyUP.isDown && this.chefPos == 2 && this.ingredientPhase == 4){
                this.posAdd = 3;
            } else if(keyUP.isDown && this.chefPos < 2){
                this.posAdd = 1;
            } else if(keyDOWN.isDown && this.chefPos > 0) {
                this.posAdd = -1;
            }
            if(keyUP.isUp && keyDOWN.isUp && this.posAdd<2){
                this.chefPos += this.posAdd;
                this.posAdd = 0;
            }
                //setting position and image for chef/player depending on where it is
            if(this.posAdd == 3){
                this.chef.y = 383;
                this.chef.x = 500;
                this.chef.setTexture('chefDeliver');
            }else if(this.chefPos == 0){
                this.chef.setTexture('chefLow');
                this.chef.y = 480;
                this.chef.x = 460;
                this.cartVechicle.setDepth(0);
                this.chef.setDepth(3);
            }else if(this.chefPos == 1){
                this.chef.setTexture('chefMid');
                this.chef.y = 440;
                this.chef.x = 488;
                this.cartVechicle.setDepth(1);
                this.chef.setDepth(0);
            } else {
                this.chef.y = 383;
                this.chef.x = 500;
                this.chef.setTexture('chefHigh');
                this.chef.setDepth(0);
            }
    
    
            this.ingredients.forEach(element => {
                element.update();
            });
            this.human.update();
            if(game.level>=2){this.bird.update();}
            if(game.level>=4){this.bird2.update();}

        }
        
    }

    phaseProgress(){
        console.log('phase progress');
        if(this.ingredientPhase == 0){
            this.startPhase0();
        } else if(this.ingredientPhase == 1){
            this.startPhase1();
        } else if(this.ingredientPhase == 2){
            this.startPhase2();
        } else if(this.ingredientPhase == 3){
            this.startPhase3();
        } else{
            this.startPhase0();
            this.ingredientPhase = 0;
        }
        console.log('going to phase:' + this.ingredientPhase);
        this.ingredientPhase++;
        console.log('natural progression: ' + this.naturalProg);
        if(this.timer != null && !this.naturalProg){
            console.log('The timer is not null: ' + this.timer);
            this.timer = this.timer.reset(this.timerConfig);
        }
        this.naturalProg = true;
    }

    startPhase0(){
        this.customer.alpha = 0;
        console.log('phase 0');
        //reset bowls 
        this.bowlFull1.alpha = 0;
        this.bowlFull1.width = this.bowlProg;
        this.bowlFull2.alpha = 0;
        this.bowlFull2.width = this.bowlProg;
        this.bowlFull3.alpha = 0;
        this.bowlFull3.width = this.bowlProg;

        this.calculatedCash = false;
        this.gotOrder = false;
        this.getNewOrder();
        this.ingredientUI.alpha = 1;
        this.ingredientUI.setTexture(game.settings.recipeBroth);
        console.log('set texture to new broth');
        this.instructionUI.text = 'catch ' + game.maxProg + ' broth!';
        game.settings.brothChance = 0.8;
        game.settings.noodleChance = 0.1;
        game.settings.toppingChance = 0.1;
    }

    startPhase1(){
        console.log('phase 1');
        game.settings.brothChance = 0.1;
        game.settings.noodleChance = 0.8;
        game.settings.toppingChance = 0.1;
    }

    startPhase2(){
        game.settings.brothChance = 0.1;
        game.settings.noodleChance = 0.1;
        game.settings.toppingChance = 0.8;

    }

    startPhase3(){
        this.customer.alpha = 1;
        this.ingredient1.alpha = 0;
        this.ingredient2.alpha = 0;
        this.ingredient3.alpha = 0;
        this.payment = this.calcCash();

        if(this.payment>0){
            this.popUpTxt(200,20, '¥'+this.payment+'00');
        }
        if(game.cash >= 10){
            this.cashUI.text = '¥'+ game.cash/10 + 'k';

        }else{
            this.cashUI.text = '¥'+ game.cash + '00';
        }
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

    checkDeliver(){
        console.log('customers x: ' + this.customer.x);
        if(this.customer.x <= 500){
            console.log('end phase');
            this.chef.setTexture('chefHigh');
            this.chefPos = 1;
            this.phaseProgress();
        }
    }


    checkHit(human){
        if (this.chefPos != human.pos && human.x <= this.catchZone){
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
            console.log('cart health: ' + game.cartHealth);
            //alter cart based on health
            if(game.cartHealth<=0){
                console.log('cart health: ' + game.cartHealth);
                //send to market of car is broken
                this.playMusic.stop();
                this.scene.start("marketScene");
            }else if(game.cartHealth < game.settings.maxHealth/3){
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

    checkCatch( obj) {
        // simple AABB checking
        if (this.chefPos == obj.pos && obj.x <= this.catchZone && obj.x >= this.catchZone-50 ) {
            if(obj.texture.key == game.settings.recipeBroth){
                if(game.brothProg < game.maxProg){
                    this.instructionUI.text = 'catch ' + (game.maxProg-game.brothProg) + ' more broth!';
                    if(obj.alpha !=0){
                        game.brothProg++;
                        if(this.bowlFull1.alpha == 0){
                            this.bowlFull1.alpha = 1;
                        }else{
                            this.bowlFull1.width += this.bowlProg;
                        }
                        obj.alpha = 0;
                    }
                } else {
                    if(this.ingredientPhase==1){
                        this.ingredientUI.setTexture(game.settings.recipeNoodle);
                        this.naturalProg = false;
                        console.log('forced progression');
                        this.phaseProgress();
                        this.instructionUI.text = 'catch noodles!';
                    }
                    if(obj.alpa != 0){
                        game.extras++;
                    }
                    obj.alpha = 0;
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
                        if(this.bowlFull2.alpha == 0){
                            this.bowlFull2.alpha = 1;
                        }else{
                            this.bowlFull2.width += this.bowlProg;
                        }
                        obj.alpha = 0;
                    }
                } else {
                    obj.alpha = 0;
                    if(this.ingredientPhase==2){
                        this.ingredientUI.setTexture(game.settings.recipeTopping);
                        this.instructionUI.text = 'catch ' + game.maxProg +'toppings!';
                        console.log('forced progression');
                        this.naturalProg = false;
                        this.phaseProgress();
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
                        if(this.bowlFull3.alpha == 0){
                            this.bowlFull3.alpha = 1;
                        }else{
                            this.bowlFull3.width += this.bowlProg;
                        }
                        obj.alpha = 0;
                    }
                } else {
                    obj.alpha = 0;
                    
                    if(this.ingredientPhase==3){
                        this.ingredientUI.alpha = 0;
                        this.naturalProg = false;
                        this.phaseProgress();
                        this.instructionUI.text = '^ keep moving up to deliver the ramen! ^';
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
        if(!this.gotOrder){
            game.brothProg = 0;
            game.noodleProg = 0;
            game.toppingProg = 0;
            game.settings.recipeBroth = Phaser.Math.RND.pick(game.broths);
            game.settings.recipeNoodle = Phaser.Math.RND.pick(game.noodles);
            game.settings.recipeTopping = Phaser.Math.RND.pick(game.toppings);
            this.gotOrder = true;
            console.log('Order Recieved: ' + game.settings.recipeBroth + ' with ' + game.settings.recipeNoodle + ' and ' + game.settings.recipeTopping);
        }
    }

    popUpImage(img,x,y){
        var popUpImag = new PopUp(this, x,y, img).setScale(0.5, 0.5).setOrigin(0, 0);
        
        this.timer1 = this.time.delayedCall(500, () => {
            popUpImag.destroy();
        }, null, this);
        /*
        var image = this.add.image(x, y, img).setOrigin(0, 0);
        this.timer = this.time.delayedCall(500, () => {
            image.destroy();
        }, null, this);
        */
    }

    popUpTxt(txt,x,y){
        var txt = this.add.text(x, y, txt).setOrigin(0, 0);
        this.timer2 = this.time.delayedCall(500, () => {
            txt.destroy();
        }, null, this);
    }

    calcCash(){
        if(!this.calculatedCash){
            var totalProg = game.brothProg + game.noodleProg + game.toppingProg;
            var payment = game.settings.ramenPrice;
            if(totalProg < game.maxProg){
                payment = 0;
            } else if(totalProg < game.maxProg*2){
                payment = game.settings.ramenPrice*0.5;
            } else if(game.extras>0){
                payment += game.settings.ramenPrice*2;
            }
            if(game.extras>3){
                payment += game.settings.ramenPrice*2;
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