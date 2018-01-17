class Ship {

    constructor(snapshot, canvas, width, height, debug) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.debug = debug;

        this.type = snapshot.type;
        this.bodyColor = snapshot.bodyColor;
        this.bodyHeading = snapshot.bodyHeading;
        this.energy = snapshot.energy;
        this.velocity = snapshot.velocity;
        this.name = snapshot.name;
        this.sName = snapshot.sName;

        this.x = snapshot.x;
        this.y = snapshot.y;

        this.image = this.canvas.addChild(new createjs.Bitmap(`../../web/assets/images/NavalRobocode/Ships/${this.type}.png`));
        this.nameText = this.canvas.addChild(new createjs.Text(this.sName, "20px Arial", "#000000"));

        this.draw();

        this.components = new Map();
        this.snapshotComponents = snapshot.components;

        this.checkComponents();
    }

    update(snapshot) {
        if(this.isDead(snapshot)){
            this.image.visible = false;
            this.nameText.visible = false;

            this.components.forEach((component) => {
                component.hide();
            })
        }else {
            if(this.image.visible === false){
                this.image.visible = true;
                this.nameText.visible = true;

                this.components.forEach((component) => {
                    component.show();
                })            }
            this.bodyHeading = snapshot.bodyHeading;
            this.energy = snapshot.energy;
            this.velocity = snapshot.velocity;
            this.snapshotComponents = snapshot.components;
            this.x = snapshot.x;
            this.y = snapshot.y;

            this.draw();

            this.checkComponents();
        }
    }

    isDead(ship){
        if(ship) {
            return ship.state === "DEAD";
        }else{
            return true;
        }
    }

    draw() {
        //draw ship image
        var angle = (toDegrees(this.bodyHeading));
        this.image.set({regX: 20, regY: 61, x: this.x, y: this.y, rotation: angle});

        //draw ship name
        this.nameText.set({regX: (this.nameText.getBounds().width / 2), regY: -70, x: this.x + 20, y: this.y + 61});
    }

    checkComponent(key, value) {
        if(this.components.has(key)) {
            this.components.get(key).update(value, this.x, this.y, this.bodyHeading);
        } else {
            this.components.set(key, new Component(value, this.x, this.y, this.bodyHeading, this.canvas));
        }
    }

    checkComponents() {
        if(this.snapshotComponents.cannoncomponent) {
            var a = (this.snapshotComponents.cannoncomponent.length) ? this.snapshotComponents.cannoncomponent : [this.snapshotComponents.cannoncomponent];
            for(var i1 = 0; i1 < a.length; i1++) {
                this.checkComponent(a[i1].slotindex, a[i1]);
            }
        }

        if(this.snapshotComponents.minecomponent) {
            var b = (this.snapshotComponents.minecomponent.length) ? this.snapshotComponents.minecomponent : [this.snapshotComponents.minecomponent];
            for(var i2 = 0; i2 < b.length; i2++) {
                this.checkComponent(b[i2].slotindex, b[i2]);
            }
        }

        if(this.snapshotComponents.radarcomponent) {
            var c = (this.snapshotComponents.radarcomponent.length) ? this.snapshotComponents.radarcomponent : [this.snapshotComponents.radarcomponent];
            for(var i3 = 0; i3 < c.length; i3++) {
                this.checkComponent(c[i3].slotindex, c[i3]);
            }
        }

        if(this.snapshotComponents.missilecomponent) {
            var d = (this.snapshotComponents.missilecomponent.length) ? this.snapshotComponents.missilecomponent : [this.snapshotComponents.missilecomponent];
            for(var i4 = 0; i4 < d.length; i4++) {
                this.checkComponent(d[i4].slotindex, d[i4]);
            }
        }
    }


    toString() {
        return `[HEADING: ${this.bodyHeading}][ENERGY: ${this.energy}][VELOCITY: ${this.velocity}][NAME: ${this.sName}][X: ${this.x}][Y: ${this.y}]`;
    }
}

function toDegrees(radians){
    return (radians * 57.2957795);
}