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
        this.load.image('cart', '././assets/cartFull.png');
        this.load.image('ingredient1', '././assets/broth1.png');
        this.load.image('ingredient2', '././assets/broth1.png');
        this.load.image('ingredient3', '././assets/broth1.png');

        // load spritesheet
        //this.load.spritesheet('death', './assets/death_anim.png', {frameWidth: 1, frameHeight: 1000, startFrame: 0, endFrame: 7});
    }

    create(){
        // place tile sprite
        this.bg = this.add.tileSprite(0, 0, 555, 360, 'bg').setOrigin(0, 0);
        this.score = this.add.tileSprite(0, 0, 50, 50, 'score').setOrigin(0, 0);
        // add objs
        this.ingredient1 = new Ingredient(this, game.config.width + 192, 20, 'ingredient1', 0, 30).setOrigin(0,0);
        this.ingredient1.pos = 2;
        this.ingredient2 = new Ingredient(this, game.config.width + 192, 100, 'ingredient1', 0, 30).setOrigin(0,0);
        this.ingredient2.pos = 1;
        this.ingredient3 = new Ingredient(this, game.config.width + 192, 200, 'ingredient1', 0, 30).setOrigin(0,0);
        //add cart
        this.cart = new Cart(this, -10,game.config.height-200, 'cart').setScale(0.5, 0.5).setOrigin(0, 0);
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
        // 60-second play clock
        this.clock = this.time.delayedCall(10000, () => {
            console.log('change to noodles'); 
        }, null, this);

        this.timer = this.time.addEvent({
            delay: 3000,
            callback: this.ingredient1.reset,
            loop: true
        });
        
    }

    start(){
        
    }

    update(){
        this.bg.tilePositionX += 1;
        // check collisions
        
        if(this.checkCatch(this.cart, this.ingredient1)) {
            console.log("got it");  
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
        
    }

    spawnIngredient(){
        console.log('spawn');

    }


    checkCatch(cart, obj) {
        // simple AABB checking
        if (cart.pos == obj.pos && obj.x <= cart.width && obj.x >= cart.width-20 ) {
                return true;
        } else {
            return false;
        }
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