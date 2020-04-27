class Bird extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
    }

    update(){
        // move left and warp around
        if(this.x > -100){
            this.x -= game.settings.panSpeed+1;
        } else {
            this.x = game.config.width;
            this.alpha = 1;
        }
        
    }

}