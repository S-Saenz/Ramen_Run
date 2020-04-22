class Ingredient extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame) {
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        this.pos = 0;
        //track firing status
    }
    update(){
        //move ship left
        // warp around
        if(this.x >= -10){
            this.x -= game.settings.panSpeed;
        }
    }

    reset(){
        this.x = game.config.width;
        console.log('reset');
    }    
}