class Component {

    constructor(snapshot, shipX, shipY, shipHeading, canvas) {
        snapshot.y = snapshot.y - (snapshot.slotindex * 20);
        this.canvas = canvas;
        this.angle = shipHeading + snapshot.angle;

        this.shipX = shipX;
        this.shipY = shipY;
        this.shipHeading = shipHeading;
        this.type = snapshot.type;

        this.snapshot = snapshot;

        this.b = this.canvas.addChild(new createjs.Bitmap("../../web/assets/images/NavalRobocode/components/" + this.type + ".png"));
        this.regX = this.shipX + (this.b.image.naturalWidth / 2);
        this.regY = this.shipY + (this.b.image.naturalHeight / 2);

        var deltaX = (this.snapshot.y / Math.sin(90)) * Math.sin(this.shipHeading);
        this.newX = this.shipX - deltaX;
        this.newY = this.shipY + (this.snapshot.y * Math.sin(this.shipHeading + Math.PI / 2));

        //console.log(this.snapshot);
        //console.log(`
        //    SHIPANGLE: ${shipHeading} [${toDegrees(shipHeading)}]
        //    COMPONENT: ${this.angle}  [${toDegrees(this.angle)}]
        //    COMBINED : ${this.shipHeading + this.angle} [${toDegrees(this.shipHeading + this.angle)}]
        //    COMBINED : ${this.shipHeading + this.angle} [${toDegrees(this.shipHeading - this.angle)}] (INV)
        //`);

        if (this.type === "LONG_RANGE" || this.type === "SHORT_RANGE") {
            var radius = (this.type === "LONG_RANGE") ? 1200 : 600;
            var angle = this.angle;
            var fillColor = "rgba(255, 255, 255, 0.5)";
            var strokeColor = "red";
            var strokeStyle = 3;
            var startAngle = 0.1 * Math.PI;
            var endAngle = 0.2 * Math.PI;

            var myX = this.newX;
            var myY = this.newY;

            this.arc = new createjs.Shape();
            this.arc.graphics
                .beginFill(fillColor)
                .setStrokeStyle(strokeStyle)
                .beginStroke(strokeColor);

            this.arc.graphics.arc(myX, myY, radius, startAngle, endAngle, false);
            this.arc.graphics.lineTo(myX, myY);
            this.arc.graphics.closePath();

            this.arc.set({regX: myX, regY: myY, x: myX, y: myY});
            this.canvas.addChild(this.arc);
        }

        this.draw();
    }

    show(){
        this.b.visible = true;
        if(this.arc){
            this.arc.visible = true;
        }
    }

    hide(){
        this.b.visible = false;
        if(this.arc){
            this.arc.visible = false;
        }
    }

    update(snapshot, shipX, shipY, shipHeading) {
        snapshot.y = snapshot.y - (snapshot.slotindex * 20);

        //console.log("UPDATE");
        this.snapshot = snapshot;
        this.shipX = shipX;
        this.shipY = shipY;
        this.shipHeading = shipHeading;

        this.regX = this.shipX + (this.b.image.naturalWidth / 2);
        this.regY = this.shipY + (this.b.image.naturalHeight / 2);

        this.angle = shipHeading + snapshot.angle;

        this.regX = (this.b.image.naturalWidth / 2);
        this.regY = (this.b.image.naturalHeight / 2);


        var deltaX = (this.snapshot.y / Math.sin(90)) * Math.sin(this.shipHeading);
        this.newX = this.shipX - deltaX;
        this.newY = this.shipY + (this.snapshot.y * Math.sin(this.shipHeading + Math.PI / 2));

        if (this.arc) {
            this.arc.set({x: this.newX, y: this.newY});
            this.arc.rotation = toDegrees((this.angle - (0.2 * Math.PI)));
        }


        this.draw();
    }

    draw() {
        this.b.set({regX: this.regX, regY: this.regY, x: this.newX, y: this.newY, rotation: toDegrees(this.angle)});
    }

}


function toDegrees(radians) {
    return (radians * 57.2957795);
}

function toRadians(degrees) {
    return (degrees / 57.2957795);
}