class Market extends Phaser.Scene {
    constructor(){
        super("marketScene");
    }
    preload() {

        this.load.image('ita', '././assets/ita.png');
        this.load.image('ita2', '././assets/ita2.png');
        
        this.load.image('wave', '././assets/wave.png');
        this.load.image('wave2', '././assets/wave2.png');
        
        this.load.image('pride', '././assets/pride.png');
        this.load.image('pride2', '././assets/pride2.png');
        
        this.load.image('cyber', '././assets/cyber.png');
        this.load.image('cyber2', '././assets/cyber2.png');
        
        this.load.image('goth', '././assets/goth.png');
        this.load.image('goth2', '././assets/goth2.png');

    }

    create(){
        if( (game.level % 3) == 0){
            game.settings.maxHealth--;
            game.maxProg++;
        }
        console.log('max cart health: ' + game.settings.maxHealth);
        if(game.cash < game.settings.repairPrice){
            this.scene.start("creditsScene");
        }else{
            game.cash -= game.settings.repairPrice;
        }
        //menu display
        let menuConfig = {
            fontFamily: 'Nikumaru',
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

        this.add.text(centerX, 0,"MARKET", menuConfig).setOrigin(0.5,0);
        this.cashUI = this.add.text(0, 0, 'cash: $'+ game.cash + '.00', menuConfig);

        // =============================== add buttons ===============================
        let buttonConfig = {
          fontFamily: 'Nikumaru',
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
        this.cosArr = game.marketGoods.cosmetics;
        this.randCosArr = this.chooseThreeDiff();
        var buttonX = 400;
        var cosPad = 20;
        this.cos1Button = this.add.text(buttonX, centerY,this.randCosArr[0], buttonConfig);
        this.add.text(buttonX, centerY+5,' price: ' + game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[0])],buttonConfig);
        this.cos2Button = this.add.image(100,100,this.randCosArr[1]);
        console.log(this.randCosArr[1]);
        this.cos3Button = this.add.text(cosPad*2+buttonX+(buttonConfig.fixedWidth*2), centerY,this.randCosArr[2], buttonConfig);
        this.cosButtons = [this.cos1Button,this.cos2Button,this.cos3Button];
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

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos1Button.text)]){
            this.cos1Button.on('pointerdown', () => {
                this.resetAllCos();
                this.buttonFade(this.cos1Button);
                game.marketGoods.cosEq =this.randCosArr[0];
                game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos1Button.text)];
            });
        }

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos2Button.text)]){
            this.cos2Button.on('pointerdown', () => {
                this.resetAllCos();
                this.buttonFade(this.cos2Button);
                game.marketGoods.cosEq =this.randCosArr[1];
                game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos2Button.text)];

            });
        }

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos3Button.text)]){
            this.cos3Button.on('pointerdown', () => {
                this.resetAllCos();
                this.buttonFade(this.cos3Button);
                game.marketGoods.cosEq =this.randCosArr[2];
                game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(this.cos3Button.text)];

            });
        }

        if(game.cash >= game.marketGoods.powPrices[game.marketGoods.powAq]){
            this.powerButton.on('pointerdown', () => {
                this.buttonFade(this.powerButton);
                game.marketGoods.powAq++;
                game.cash -= game.marketGoods.powPrices[game.marketGoods.powAq];
            });
        }

        if(game.cash >= game.marketGoods.violentPrices[game.marketGoods.violAq]){
            this.violentButton.on('pointerdown', () => {
                this.buttonFade(this.violentButton);
                game.marketGoods.violAq++;
                game.cash -= game.marketGoods.violentPrices[game.marketGoods.violAq];

            });
        }

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
        this.cashUI.text = ('cash: $'+ game.cash + '.00');
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
        var num = 0 ;
        this.cosButtons.forEach(element => {
            if(!element.input.enabled){
                game.cash +=game.marketGoods.cosPrices[this.cosArr.indexOf(game.marketGoods.cosEq)];
                element.input.enabled = true;
                element.setInteractive;
                element.setStyle({ backgroundColor: '#ae1f1f'});
                game.marketGoods.cosEq = 'none';
                
                if(game.cash >=this.cosArr.indexOf(this.randCosArr[num])){
                    element.on('pointerdown', () => {
                        this.resetAllCos();
                        this.buttonFade(element);
                        game.marketGoods.cosEq = element.text;
                        game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(element.text)];
                        num++;
                    });
                }
                element.on('pointerover', () => { 
                    element.setStyle({ fill: '#fff2d8'});
                });
                element.on('pointerout', () => { 
                    element.setStyle({ fill: '#161515'});
                });
            }
        });
    }

    buttonFade(button){
        button.disableInteractive();
        button.setStyle({fill: '#FF4421'});
        button.setStyle({backgroundColor: '#FACADE'});
    }
}
        