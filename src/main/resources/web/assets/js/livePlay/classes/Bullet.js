class Bullet {

    constructor(bullet, canvass, width, height, debug) {
        this.id = bullet.id;
        this.canvas = canvass;
        this.bullet = bullet;
        this.width = width;
        this.height = height;

        this.g = new createjs.Shape();
        this.g.name = "BULLET";
        this.g.graphics.beginFill("white").drawCircle(bullet.x, bullet.y, (Math.max((2 * Math.sqrt(2.5 * bullet.power)), 2)));

        this.canvas.addChild(this.g);

    }

    update(bullet){
        if(isDead(bullet)){
            this.g.name = "DEAD_BULLET";
            //this.g.visible = false;
        }else {
            this.g.x += bullet.x - this.bullet.x;
            this.g.y += bullet.y - this.bullet.y;
            this.bullet = bullet;
        }
    }

    toString() {
        return `[ID: ${this.id}][X: ${this.bullet.x}][Y: ${this.bullet.y}][STATE: ${this.bullet.state}]`;
    }
}

function isDead(bullet){
    return bullet.state != "MOVING";
}
