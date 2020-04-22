class Broth extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        //track firing status
    }
    update(){
        //move ship left
        this.x -= game.settings.panSpeed;
        // warp around
        if(this.x <= 0-this.width){
            this.destroy();
        }
    }

    reset(){
        this.x = game.config.width;
    }    
}