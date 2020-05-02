class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorialScene");
    }
    preload() {
        // load audio
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('tutorial', '././assets/tutorial.png');

    }

    create(){
        this.bg = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        this.tutorial = this.add.image(0,0,'tutorial').setOrigin(0);
        
    }
    
    update() {
        this.bg.tilePositionX += 3;
        game.score = 0;
        
    }
}