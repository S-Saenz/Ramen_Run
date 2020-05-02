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
        this.hitPlay = false;
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        this.bg = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        this.cart = this.add.image(-1000,game.config.height-200, 'none').setScale(0.5, 0.5).setOrigin(0, 0.5);
        this.tutorial = this.add.image(centerX,centerY,'tutorial').setOrigin(0.5).setScale(0.4);
        
        this.audio = this.add.image(100,game.config.height-100, 'audioOff').setScale(0.25,0.25);
        let menuConfig = {
            fontFamily: 'Georgia',
            fontStyle: 'bold',
            fontSize: '60px',
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
        
        
        this.menuMusic = this.sound.add('MenuMusic');

        var musicConfig = {
          mute: true,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 1
        }

        this.menuMusic.play(musicConfig);
        //show menu text
        //game.stage.backgroundColor = '#cabbaa';
        //menu display
        this.audio = this.add.image(100,game.config.height-100, 'audioOff').setScale(0.25,0.25);
        //this.add.text(centerX, 60,"RAMEN RUN", menuConfig).setOrigin(0.5);

        // =============================== add buttons ===============================

      this.playButton = this.add.image(game.config.width-150,centerY+250, 'playButton').setScale(0.25,0.25).setOrigin(0.5,0.5);
      
      //=============================== set interactive ===========================================

      this.playButton.setInteractive();
      this.audio.setInteractive();

      //================================ functionality =================================

      this.playButton.on('pointerdown', () => { 
          // easy mode
          this.hitPlay = true;
          this.menuMusic.stop();
      });
      this.audio.on('pointerdown', () => { 
          // easy mode
          this.menuMusic.setMute(!this.menuMusic.mute);
          if(!this.menuMusic.mute){
            game.settings.audio = false;
              this.audio.setTexture('audioOff');
          } else{
            game.settings.audio = true;
            this.audio.setTexture('audioOn');
          }
          console.log('game audio: '+ game.settings.audio);

      });

      this.playButton.on('pointerover', () => { 
          this.playButton.setTexture('playButtonHover');
      });
      this.playButton.on('pointerout', () => { 
          this.playButton.setTexture('playButton');
      });
      
        
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