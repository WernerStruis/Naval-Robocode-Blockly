var canvasContainer;
var canvas;
var width;
var height;
var debug = true;
var TPS = 1;

var currentSnapshot = null;

function handleSnapShot(snapshot){
    if (currentSnapshot == null || currentSnapshot.turnSnapshot == null) {
        currentSnapshot = new SnapShot(snapshot, canvas, width, height, debug);
    } else {
        currentSnapshot.update(snapshot);
    }
}

function resetHandler(){
    console.log("Resetting");
    if(canvas){
        canvas.removeAllChildren();
        canvas.update();
        currentSnapshot.reset();
    }
}

function initSnapShotHandler(_cb) {
    console.log("Initializing");

    canvas = new createjs.Stage("robocanvas");
    canvas.addEventListener("tickend", _cb);

    width = canvas.canvas.width;
    height = canvas.canvas.height;

    console.log(`Canvas size: [W: ${this.width}][H: ${this.height}]`);
    console.log("-------------");
    currentSnapshot = new SnapShot(null, canvas, width, height, debug);

}
