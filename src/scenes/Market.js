class Market extends Phaser.Scene {
    constructor(){
        super("marketScene");
    }
    preload() {
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '60px',
            backgroundColor: '#ae1f1f',
            color: '#cabbaa',
            align: 'right',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, 60,"MARKET", menuConfig).setOrigin(0.5);

        // =============================== add buttons ===============================
        let buttonConfig = {
          fontFamily: 'Georgia',
          fontStyle: 'bold',
          fontSize: '30px',
          backgroundColor: '#ae1f1f',
          color: '#161515',
          align: 'center',
          padding: {
              right: 10,
              left: 10,
              top: 5,
              bottom: 5,
          },
          fixedWidth: 150
      }
      this.playButton = this.add.text(200, 250, 'PlayButton', buttonConfig);
      
      //=============================== set interactive ===========================================

      this.playButton.setInteractive();

      //================================ functionality =================================

      this.playButton.on('pointerdown', () => { 
          // easy mode
          this.scene.start("playScene");
      });

      this.playButton.on('pointerover', () => { 
          this.playButton.setStyle({ fill: '#fff2d8'});
      });
      this.playButton.on('pointerout', () => { 
          this.playButton.setStyle({ fill: '#161515'});
      });
      

        
        
        
    }
    
    update() {
        
    }
}
        