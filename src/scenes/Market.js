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
            fontSize: '40px',
            backgroundColor: '#ae1f1f',
            color: '#cabbaa',
            align: 'center',
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

        this.add.text(centerX, 0,"MARKET", menuConfig).setOrigin(0.5);

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
          fixedWidth: 200
      }
      
      this.playButton = this.add.text(550, 0, 'PlayButton', buttonConfig);
      //cosmetic buttons
      var buttonX = 50;
      var cosPad =20;
      this.cos1Button = this.add.text(buttonX, centerY, 'cosmetic 1', buttonConfig);
      this.cos2Button = this.add.text(cosPad+buttonX+(buttonConfig.fixedWidth), centerY, 'cosmetic 2', buttonConfig);
      this.cos3Button = this.add.text(cosPad*2+buttonX+(buttonConfig.fixedWidth*2), centerY, 'cosmetic 3', buttonConfig);
      //power up buttons
      buttonConfig.fixedWidth = 600;
      this.powerButton = this.add.text(80, centerY+60, 'power', buttonConfig);
      this.violentButton = this.add.text(80, centerY+110, 'violence', buttonConfig);



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
        game.cartHealth = game.settings.maxHealth;
        game.brothProg = 0;
        game.noodleProg = 0;
        game.toppingProg = 0;
        game.settings.recipeBroth = Phaser.Math.RND.pick(game.broths);
        game.settings.recipeNoodle = Phaser.Math.RND.pick(game.noodles);
        game.settings.recipeTopping = Phaser.Math.RND.pick(game.toppings);
        
    }
}
        