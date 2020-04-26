class PopUp extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track movement
        this.yMoved = 0;
        //this.sfxCart = scene.sound.add('sfx_cart'); // add Cart sfx
    }

    update(){
        //up & down movement
        if(this.yMoved < 200){
            this.y += 100;
            this.yMoved++;
            console.log(this.y);
        } else{
            this.destroy();
        }
    }

}