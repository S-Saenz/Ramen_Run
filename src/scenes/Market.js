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
        
        this.playButton = this.add.text(550, 0, 'Continue', buttonConfig);
        //================ cosmetic buttons ================

        var randCosArr = this.chooseThreeDiff();
        var buttonX = 50;
        var cosPad =20;
        this.cos1Button = this.add.text(buttonX, centerY, randCosArr[0], buttonConfig);
        this.cos2Button = this.add.text(cosPad+buttonX+(buttonConfig.fixedWidth), centerY, randCosArr[1], buttonConfig);
        this.cos3Button = this.add.text(cosPad*2+buttonX+(buttonConfig.fixedWidth*2), centerY, randCosArr[2], buttonConfig);
        //power up buttons
        buttonConfig.fixedWidth = 600;
        this.powerButton = this.add.text(80, centerY+60, 'power', buttonConfig);
        this.violentButton = this.add.text(80, centerY+110, 'violence', buttonConfig);



        //=============================== set interactive ===========================================

        this.playButton.setInteractive();
        this.cos1Button.setInteractive();
        this.cos2Button.setInteractive();
        this.cos3Button.setInteractive();
        this.powerButton.setInteractive();
        this.violentButton.setInteractive();

        //================================ functionality =================================

        this.playButton.on('pointerdown', () => { 
            // easy mode
            this.scene.start("playScene");
        });

        this.cos1Button.on('pointerdown', () => {
            this.buttonFade(this.cos1Button);
            game.marketGoods.cosEq = randCosArr[0];
        });

        this.cos2Button.on('pointerdown', () => {
            this.buttonFade(this.cos2Button);
            game.marketGoods.cosEq = randCosArr[1];

        });

        this.cos3Button.on('pointerdown', () => {
            this.buttonFade(this.cos3Button);
            game.marketGoods.cosEq += randCosArr[2];

        });


        this.powerButton.on('pointerdown', () => {
            this.buttonFade(this.powerButton);
            game.marketGoods.powAq++;
            game.cash -= game.marketGoods.powAq;
        });


        this.violentButton.on('pointerdown', () => {
            this.buttonFade(this.violentButton);

        });


      //================================ on hover ================================
        this.playButton.on('pointerover', () => { 
            this.playButton.setStyle({ fill: '#fff2d8'});
        });
        this.playButton.on('pointerout', () => { 
            this.playButton.setStyle({ fill: '#161515'});
        });

            //======================= cosmetic buttons =====================

        this.cos1Button.on('pointerover', () => { 
            this.cos1Button.setStyle({ fill: '#fff2d8'});
        });
        this.cos1Button.on('pointerout', () => { 
            this.cos1Button.setStyle({ fill: '#161515'});
        });


        this.cos2Button.on('pointerover', () => { 
            this.cos2Button.setStyle({ fill: '#fff2d8'});
        });
        this.cos2Button.on('pointerout', () => { 
            this.cos2Button.setStyle({ fill: '#161515'});
        });


        this.cos3Button.on('pointerover', () => { 
            this.cos3Button.setStyle({ fill: '#fff2d8'});
        });
        this.cos3Button.on('pointerout', () => { 
            this.cos3Button.setStyle({ fill: '#161515'});
        });



            // ======================= power and violent buttons =======================


        this.powerButton.on('pointerover', () => { 
            this.powerButton.setStyle({ fill: '#fff2d8'});
        });

        this.powerButton.on('pointerout', () => { 
            this.powerButton.setStyle({ fill: '#161515'});
        });

        this.violentButton.on('pointerover', () => { 
            this.violentButton.setStyle({ fill: '#fff2d8'});
        });
        this.violentButton.on('pointerout', () => { 
            this.violentButton.setStyle({ fill: '#161515'});
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
    

    chooseThreeDiff(){
        var arrCopy = Array.from(game.marketGoods.cosmetics);
        if(game.marketGoods.cosEq != 'none'){
            Phaser.Utils.Array.Remove(arrCopy,game.marketGoods.cosEq);
        }
        var opt1 = Phaser.Utils.Array.RemoveAt(arrCopy,Phaser.Math.Between(0,arrCopy.length-1));
        var opt2 = Phaser.Utils.Array.RemoveAt(arrCopy,Phaser.Math.Between(0,arrCopy.length-1));
        var opt3 = Phaser.Utils.Array.RemoveAt(arrCopy,Phaser.Math.Between(0,arrCopy.length-1));
        var retArr = [opt1,opt2,opt3];
        return retArr;
    }

    resetAllCos(){
        if(!this.cos1Button.input.enabled){
            game.marketGoods.cosmetics.findIndex(this.cos1Button.text);
        }
    }

    buttonFade(button){
        button.disableInteractive();
        button.setStyle({backgroundColor: '#FACADE', fill: '#FF4421'});
    }
}
        