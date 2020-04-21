class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        //this.load.audio('stag_fly', '././assets/stag_fly.mp3');

        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('score', '././assets/stars.png');
        // load spritesheet
        //this.load.spritesheet('death', './assets/death_anim.png', {frameWidth: 1, frameHeight: 1000, startFrame: 0, endFrame: 7});
    }

    create(){
        // place tile sprite
        this.bg = this.add.tileSprite(0, 0, 555, 360, 'bg').setOrigin(0, 0);
        this.score = this.add.tileSprite(0, 0, 50, 50, 'score').setOrigin(0, 0);
        //add cart
        this.cart = new Cart(this, game.config.width-20,game.config.height-20, 'cart')/*.setScale(0.5, 0.5).setOrigin(0, 0)*/;
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // add objs

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
        
    }

    start(){
        
    }
    update(){
        this.bg.tilePositionX += 1;
        // check collisions
        /*
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.p1Rocket.visible = false;
            this.shipExplode(this.ship02);   
        }
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
        
    }

    /*makeRandomObj(){

    }


    checkCatch(cart, obj) {
        // simple AABB checking
        if (cart.pos == obj.pos) {
                return true;
        } else {
            return false;
        }
    }
*/
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