class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('MenuMusic', '././assets/RR_Menu.wav');

    }

    create(){
        this.menuMusic = this.sound.add('RR_Menu');

        var musicConfig = {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: false,
          delay: 0
        }

        this.menuMusic.play(musicConfig);
        //game.stage.backgroundColor = '#cabbaa';
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

        this.add.text(centerX, 60,"RAMEN RUN", menuConfig).setOrigin(0.5);

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
      

      //======================== more text =================================
        menuConfig.color = '#161515';
        menuConfig.backgroundColor = 'transparent';
        menuConfig.padding.bottom = 0;
        menuConfig.padding.top = 0;
        
        
    }
    
    update() {
        game.score = 0;
        
    }
}