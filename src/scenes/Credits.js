class Credits extends Phaser.Scene {
    constructor(){
        super("creditsScene");
    }
    preload() {
        // load audio
        this.load.audio('MenuMusic', '././assets/RR_Menu.wav');
        this.load.image('bg', '././assets/Ramen_background.png');
        this.load.image('logo', '././assets/logo.png');

        //buttons
        this.load.image('audioOff', '././assets/audioOff.png');
        this.load.image('audioOn', '././assets/audioOn.png');
        this.load.image('replayButton', '././assets/replayButton.png');
        this.load.image('replayButtonHover', '././assets/replayButtonHover.png');
        this.load.image('menuButton', '././assets/menuButton.png');
        this.load.image('menuButtonHover', '././assets/menuButtonHover.png');

        
        this.load.image('square', '././assets/ingredientBox.png');

    }

    create(){
        this.bg = this.add.tileSprite(0, -60, 3000, 1600, 'bg').setScale(0.5,0.5).setOrigin(0, 0);
        //game.stage.backgroundColor = '#cabbaa';
        //menu display
        let menuConfig = {
            fontFamily: 'Nikumaru',
            fontStyle: 'bold',
            fontSize: '40px',
            color: '#000',
            align: 'right',
            padding: {
                right: 10,
                left: 10,
                top: 10,
                bottom: 10,
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
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;
        var square = this.add.image(centerX,centerY,'square').setOrigin(0.5).setScale(3);
        square.alpha = 0.75;
        this.audio = this.add.image(100,game.config.height-100, 'audioOff').setScale(0.25);

        //this.logo = this.add.image(centerX, centerY, 'logo').setOrigin(0.5,0.5).setScale(2,2);
        //this.logo.alpha = 0.5;
        this.add.text(centerX, centerY-200,"Lead Artist - Joann Long", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY-100,"Sound and Design - Ryan Timothy Marcus", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY,"Programmer & King - Saenz", menuConfig).setOrigin(0.5);

        // =============================== add buttons ===============================
        /*let buttonConfig = {
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
      }*/
      this.playTxt = 'playButton'
      if(game.hasPlayed){
          this.playTxt = 'replayButton'
      }

      this.playButton = this.add.image(centerX,centerY+190, this.playTxt).setScale(0.25).setOrigin(0.5,0.5);
      this.menuButton = this.add.image(centerX,centerY+280, 'menuButton').setScale(0.25).setOrigin(0.5,0.5);
      
      //=============================== set interactive ===========================================

      this.playButton.setInteractive();
      this.menuButton.setInteractive();
      this.audio.setInteractive();

      //================================ functionality =================================

      this.playButton.on('pointerdown', () => { 
        // easy mode
        this.scene.start("playScene");
        this.menuMusic.stop();
    });
    this.menuButton.on('pointerdown', () => { 
        // easy mode
        this.scene.start("menuScene");
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
            this.playButton.setTexture(this.playTxt+ 'Hover');
        });
        this.playButton.on('pointerout', () => { 
            this.playButton.setTexture(this.playTxt);
        });
        this.menuButton.on('pointerover', () => { 
            this.menuButton.setTexture('menuButtonHover');
        });
        this.menuButton.on('pointerout', () => { 
            this.menuButton.setTexture('menuButton');
        });
      

      //======================== more text =================================
        menuConfig.color = '#161515';
        menuConfig.backgroundColor = 'transparent';
        menuConfig.padding.bottom = 0;
        menuConfig.padding.top = 0;
        
        
    }
    
    update() {
        this.bg.tilePositionX += 3;
        game.score = 0;
        
    }
}