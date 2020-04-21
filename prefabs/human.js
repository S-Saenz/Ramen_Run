class Cart extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track firing status
        this.pos = 1;
        //this.sfxCart = scene.sound.add('sfx_cart'); // add Cart sfx
    }

    update(){
        //up & down movement
        if(!this.isFiring){
            if(keyUP.isDown && this.pos < 2){
                this.pos += 1;
            } else if(keyDOWN.isDown && this.pos > 0) {
                this.pos -= 1;
            }
        }
    }

}