class SnapShot {

    constructor(snapshot, canvas, width, height, debug) {
        this.attributeManager = new AttributeManager(snapshot);

        this.turnSnapshot = snapshot;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.debug = debug;

        this.ships = [];
        this.bullets = new Map();

        if (this.turnSnapshot) {
            if (this.turnSnapshot.turn.robots.ship && this.turnSnapshot.turn.robots.ship.length > 1) {
                this.ships = this.turnSnapshot.turn.robots.ship.map(function (ship) {
                    return new Ship(ship, canvas, width, height, debug);
                });
            }

            if (this.turnSnapshot.turn.bullets.bullet) {
                if (this.turnSnapshot.turn.bullets.bullet.length > 1) {
                    this.turnSnapshot.turn.bullets.bullet.forEach(bullet => {
                        this.bullets.set(bullet.id, new Bullet(bullet, this.canvas, this.width, this.height, this.debug));
                    });
                } else {
                    var bullet = this.turnSnapshot.turn.bullets.bullet;
                    this.bullets.set(bullet.id, new Bullet(bullet, this.canvas, this.width, this.height, this.debug));
                }
            }
        }

        this.canvas.update();
    }

    reset() {
        this.ships = [];
        for (var i = 0; i < this.bullets.length; i++) {
            this.canvas.removeChild(this.bullets[i]);
        }
        this.bullets = new Map();
    }

    update(snapshot) {
        if(snapshot.turn.turn <= 10){
            for (var i = 0; i < this.bullets.length; i++) {
                this.canvas.removeChild(this.bullets[i]);
            }
            this.bullets = new Map();
        }

        this.turnSnapshot = snapshot;
        if (this.attributeManager) {
            this.attributeManager.update(snapshot);
        }

        var newShips = this.turnSnapshot.turn.robots.ship;

        var newBullets;
        /**
         *  if (this.turnSnapshot.turn.bullets.bullet) {
                if(this.turnSnapshot.turn.bullets.bullet.length > 1) {
                    this.turnSnapshot.turn.bullets.bullet.forEach(bullet => {
                        this.bullets.set(bullet.id, bullet);
                    });
                }else{
                    var bullet = this.turnSnapshot.turn.bullets.bullet;
                    this.bullets.set(bullet.id, bullet);
                }
            }
         */
        if (this.turnSnapshot.turn.bullets) {
            newBullets = (this.turnSnapshot.turn.bullets.bullet.length > 1) ? this.turnSnapshot.turn.bullets.bullet : [this.turnSnapshot.turn.bullets.bullet];

            for (var i = 0; i < newBullets.length; i++) {
                //if bullets contain, update
                if (this.bullets.has(newBullets[i].id)) {
                    var bullet = this.bullets.get(newBullets[i].id);
                    bullet.update(newBullets[i]);
                    //else is new, add
                } else {
                    this.bullets.set(newBullets[i].id, new Bullet(newBullets[i], this.canvas, this.width, this.height, this.debug));
                }
            }

            var bullets = this.canvas.children.filter(child => {
                return child.name === "DEAD_BULLET";
            });

            //console.log(this.canvas.children);

            for (var i = 0; i < bullets.length; i++) {
                this.canvas.removeChild(bullets[i]);
            }

        }

        if (newShips) {
            for (var i = 0; i < this.ships.length; i++) {
                this.ships[i].update(newShips[i]);
            }
        }

        //console.log("----UPDATE-----");
        this.canvas.update();
    }
}



