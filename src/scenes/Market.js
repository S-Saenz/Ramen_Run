class Market extends Phaser.Scene {
    constructor(){
        super("marketScene");
    }
    preload() {
        this.load.image('marketOverhang', '././assets/marketOverhang.png');
        this.load.image('merchant', '././assets/merchant.png');

        this.load.image('itaButton', '././assets/ita.png');
        this.load.image('itaHover', '././assets/itaHover.png');
        this.load.image('ita2', '././assets/ita2.png');
        
        this.load.image('waveButton', '././assets/wave.png');
        this.load.image('waveHover', '././assets/waveHover.png');
        this.load.image('wave2', '././assets/wave2.png');
        
        this.load.image('prideButton', '././assets/pride.png');
        this.load.image('prideHover', '././assets/prideHover.png');
        this.load.image('pride2', '././assets/pride2.png');
        
        this.load.image('cyberButton', '././assets/cyber.png');
        this.load.image('cyberHover', '././assets/cyberHover.png');
        this.load.image('cyber2', '././assets/cyber2.png');
        
        this.load.image('gothButton', '././assets/goth.png');
        this.load.image('gothHover', '././assets/gothHover.png');
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

        this.cashUI = this.add.text(70, 70, '¥'+ game.cash + '00', menuConfig).setOrigin(0);
        if(game.cash >= 10){
            this.cashUI.text = '¥'+ game.cash/10 + 'k';

        }else{
            this.cashUI.text = '¥'+ game.cash + '00';
        }

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
        this.add.image(centerX,centerY+30, 'merchant').setScale(0.75);
        this.add.image(centerX, 0, 'marketOverhang').setScale(0.5).setOrigin(0.5,0);
        this.playButton = this.add.text(game.config.width, 0, 'Continue', buttonConfig).setOrigin(1,0);
        //================ cosmetic buttons ================
        this.cosArr = game.marketGoods.cosmetics;
        this.randCosArr = this.chooseThreeDiff();
        var buttonX = 400;
        var cosPad = 20;
        this.cos1Button = this.add.image(buttonX, centerY+200,(this.randCosArr[0]+'Button')).setScale(0.5);
        this.cos2Button = this.add.image(cosPad*2+buttonX+(this.cos1Button.width*0.5), centerY+200,(this.randCosArr[1]+'Button')).setScale(0.5);
        console.log(this.randCosArr);
        this.cos3Button = this.add.image(cosPad*3+buttonX+(this.cos1Button.width), centerY+200,(this.randCosArr[2]+'Button')).setScale(0.5);
        this.cosButtons = [this.cos1Button,this.cos2Button,this.cos3Button];
       



        //=============================== set interactive ===========================================

        this.playButton.setInteractive();
        this.cos1Button.setInteractive();
        this.cos2Button.setInteractive();
        this.cos3Button.setInteractive();

        //================================ functionality =================================

        this.playButton.on('pointerdown', () => { 
            // easy mode
            this.scene.start("playScene");
        });

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[0])]){
            this.cos1Button.on('pointerdown', () => {
                this.onClick(this.cos1Button,0)
            });
        }

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[1])]){
            this.cos2Button.on('pointerdown', () => {
                this.onClick(this.cos2Button,1)
            });
        }

        if(game.cash >=game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[2])]){
            this.cos3Button.on('pointerdown', () => {
                this.onClick(this.cos3Button,2)

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
            if(this.cos1Button.input.enabled){
                this.cos1Button.setTexture(this.randCosArr[0]+'Hover');
            }
        });
        this.cos1Button.on('pointerout', () => { 
            if(this.cos1Button.input.enabled){
                this.cos1Button.setTexture(this.randCosArr[0]+'Button');
            }
        });


        this.cos2Button.on('pointerover', () => { 
            if(this.cos2Button.input.enabled){
                this.cos2Button.setTexture(this.randCosArr[1]+'Hover');
            }
        });
        this.cos2Button.on('pointerout', () => { 
            if(this.cos2Button.input.enabled){
                this.cos2Button.setTexture(this.randCosArr[1]+'Button');
            }
        });


        this.cos3Button.on('pointerover', () => { 
            if(this.cos3Button.input.enabled){
                this.cos3Button.setTexture(this.randCosArr[2]+'Hover');
            }
        });
        this.cos3Button.on('pointerout', () => { 
            if(this.cos3Button.input.enabled){
                this.cos3Button.setTexture(this.randCosArr[2]+'Button');
            }
        });


 
            
        
    }
    
    update() {
        this.cashUI.text = '¥'+ game.cash + '00';
        if(game.cash >= 10){
            this.cashUI.text = '¥'+ game.cash/10 + 'k';

        }else{
            this.cashUI.text = '¥'+ game.cash + '00';
        }
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
                var cosName = this.randCosArr[num];
                if(!element.input.enabled){
                    game.cash +=game.marketGoods.cosPrices[this.cosArr.indexOf(game.marketGoods.cosEq)];
                    console.log(game.marketGoods.cosPrices[this.cosArr.indexOf(game.marketGoods.cosEq)] + game.marketGoods.cosEq);
                }
                element.input.enabled = true;
                element.setInteractive();
                element.setTexture(cosName+'Button');
                
                num++;
        });
        game.marketGoods.cosEq = 'none';
    }

    onClick(button, num){
        this.resetAllCos();
        button.setTexture(this.randCosArr[num]+'2');
        game.marketGoods.cosEq =this.randCosArr[num];
        game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[num])];
        button.disableInteractive();
        button.input.enabled = false;
    }
}
        