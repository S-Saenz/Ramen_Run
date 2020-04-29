class PopUp extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track movement
        //this.sfxCart = scene.sound.add('sfx_cart'); // add Cart sfx
    }

    update(){
        //up movement
        this.y-=3;
    }

}