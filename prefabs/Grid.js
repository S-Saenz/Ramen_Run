class Grid extends Phaser.Group {
    constructor(cols) {
        super(game);
        this.cols = cols;
    }
    arrange() {
        //current row count
        var row = 0;
        //current column count
        var col = 0;
        //use the group's built in for each to loop through all the children
        this.forEach(function(item) {
            //set the position based on the row, the column and the height of the item
            item.y = row * item.height;
            item.x = col * item.width;
            //advance the column count
            col++;
            //if the column count is equal to the number of columns set
            if (col == this.cols) {
                //go to the next row
                row++;
                //reset the column to 0
                col = 0;
            }
        }.bind(this));
        //use bind(this) to keep the 'this' keyword
        //to mean the class
    }
    fitStage(per = 100) {
        this.width = game.width * (per / 100);
        this.scale.y = this.scale.x;
    }
    center() {
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height / 2 - this.height / 2;
    }
}