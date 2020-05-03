class Market extends Phaser.Scene {
    constructor(){
        super("marketScene");
    }
    preload() {
        
        this.load.audio('MarketMusic', '././assets/RR_Menu.wav');

        this.load.image('marketBG', '././assets/marketBG.png');
        this.load.image('speechBubble', '././assets/speechBubble.png');
        this.load.image('merchant', '././assets/merchant.png');

        this.load.image('yenContainer', '././assets/wallet.png');

        this.load.image('continue', '././assets/continue.png');
        this.load.image('continueHover', '././assets/continueHover.png');

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
        this.mindChanges = 0;
        this.bg = this.add.tileSprite(0, 0, 1500, 700, 'marketBG').setOrigin(0, 0);
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        if( (game.level % 3) == 0){
            if(game.settings.health >= 3){
                game.settings.maxHealth--;
            }
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
            fontSize: '30px',
            color: '#4C2E2F',
            align: 'center',
            padding: {
                right: 10,
                left: 10,
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
            wordWrap: { width: 400, useAdvancedWrap: true }
        }
        this.add.image(centerX-120, centerY-50, 'speechBubble').setScale(1).setOrigin(0.5);
        this.merchantLines = ['Goth, huh?  You got black makeup to go with that?',
            'Pride, huh?  Gotta love that colorful aesthetic!',
            'Wave, huh?  A classic design!',
            'Cyber, huh?  The neon’s gonna cost ya!',
            'Ita, huh?  God why do I even have this...',
            'Jeez, someone did a number on your car!  I could fix it for you, buuuut… pay up first.',
            'Yo, I knew you were gonna come in today!  How much money are you givin’ me this time?',
            'C’mon kid I ain’t got all day, make up your mind!'];
        this.merchantLine = this.add.text(centerX-125, centerY-90, this.merchantLines[5], menuConfig).setOrigin(0.5);
        if(game.level>=3){
            this.merchantLine.text = this.merchantLines[6];
        }
        /*merchant lines:
        Annoyance
        C’mon kid I ain’t got all day, make up your mind!

        Poor shaming
        You can’t afford it?  Don’t bother me unless you actually have money to give me.

        Ita, huh?  God why do I even have this...

        Goth, huh?  You got black makeup to go with that?

        Pride, huh?  Gotta love that colorful aesthetic!

        Wave, huh?  A classic design!

        Cyber, huh?  The neon’s gonna cost ya!
        
        Yo, I knew you were gonna come in today!  How much money are you givin’ me this time?

        Jeez, someone did a number on your car!  I could fix it for you, buuuut… pay up first.

        How’d you want your car lookin’ today? I think that expensive one looks really good on you!

        (name of cosmetic), huh? Aight, hand over the cash!

        Come back soon!
        */
        this.lineTimer = this.time.delayedCall(4000, () => {
            if(this.merchantLine.text == this.merchantLines[5] || this.merchantLines[6]){
                this.merchantLine.text = 'How’d you want your car lookin’ today? I think that expensive one looks really good on you!';
            }
        }, null, this);

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
        
        this.marketMusic = this.sound.add('MarketMusic');

        this.musicConfig = {
          mute: false,
          volume: 1,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 1
        }

        this.marketMusic.play(this.musicConfig);

        //show menu text

        this.add.image(0, 0, 'yenContainer').setOrigin(0).setScale(0.25);
        this.cashUI = this.add.text(20, 40, '¥'+ game.cash + '00', menuConfig).setOrigin(0);
        if(game.cash >= 10){
            this.cashUI.text = '¥'+ game.cash/10 + 'k';

        }else{
            this.cashUI.text = '¥'+ game.cash + '00';
        }

        // =============================== add buttons ===============================
        this.add.image(centerX+400,centerY+30, 'merchant').setScale(0.75);
        this.playButton = this.add.image(game.config.width, 0, 'continue').setOrigin(1,0).setScale(0.4);
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
            this.marketMusic.stop();
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
            this.playButton.setTexture('continueHover');
        });
        this.playButton.on('pointerout', () => { 
            this.playButton.setTexture('continue');
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
        if(game.settings.audio){
            this.marketMusic.setMute(false);
            this.musicConfig.mute = false;
        } else{
            this.marketMusic.setMute(true);
            this.musicConfig.mute = true;
        }
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
        this.mindChanges++;
        this.merchantLine.text = this.merchantLines[this.cosArr.indexOf(this.randCosArr[num])];
        if(this.mindChanges > 3){
            this.merchantLine.text = this.merchantLines[7];
        }
        this.resetAllCos();
        button.setTexture(this.randCosArr[num]+'2');
        game.marketGoods.cosEq =this.randCosArr[num];
        game.cash -=game.marketGoods.cosPrices[this.cosArr.indexOf(this.randCosArr[num])];
        button.disableInteractive();
        button.input.enabled = false;
    }
}
        