class Cart extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track firing status
        this.pos = 1;
        this.posAdd = 0;
        //this.sfxCart = scene.sound.add('sfx_cart'); // add Cart sfx
    }

    update(){
        //up & down movement
        if(!this.isFiring){
            if(keyUP.isDown && this.pos < 2){
                this.posAdd = 1;
            } else if(keyDOWN.isDown && this.pos > 0) {
                this.posAdd = -1;
            }
            if(keyUP.isUp && keyDOWN.isUp){
                this.y -= this.posAdd*50;
                console.log();
                this.pos += this.posAdd;
                this.posAdd = 0;
            }
        }
    }

}