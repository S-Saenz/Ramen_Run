class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorialScene");
    }
    preload() {
        // load audio
        this.load.audio('MenuMusic', '././assets/RR_Menu.wav');

        //images
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('tutorial', '././assets/tutorial.png');
        this.load.image('none', '././assets/cartFull.png');
        
        //buttons
        this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('audioOn', '././assets/audioOn.png');
        this.load.image('playButton', '././assets/playButton.png');
        this.load.image('playButtonHover', '././assets/playButtonHover.png');

    }

    create(){
        
    }
    
    update() {
        this.bg.tilePositionX += 3;
        if(this.hitPlay){
            this.tutorial.y += 10;
            this.cart.x +=10;
        }
        if(this.cart.x >= -100){
            this.scene.start("playScene");
        }
        
    }
}