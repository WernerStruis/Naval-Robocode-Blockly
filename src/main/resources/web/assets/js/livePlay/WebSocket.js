//var snapshots = null;
var socket;
var open = false;
function closeWebSocket() {
    if (socket) {
        send("CLOSE");
        open = false;
        socket.close();
    }
}
function createWebSocket() {
    open = true;
    if (window.WebSocket) {
        socket = new WebSocket("ws://localhost:8080/ws");

        socket.onmessage = function (event) {
            if (event.data === "START" || event.data === "NULL") {
                console.log("waiting for next ss");
                setTimeout(getNextTurn(), 1000);
            } else if(event.data === "STOP"){
                closeWebSocket();
            }else{
                if(open) {
                    handleSnapShot(JSON.parse(event.data));
                }else{
                    console.log("Incoming (ignore)");
                }
            }
        };

        socket.onopen = function (event) {
            initSnapShotHandler(getNextTurn);
            socket.send("READY");
        };

        socket.onclose = function (event) {
            console.log("CLOSING WEBSOCKET");
            resetHandler();
        };

    } else {
        alert("Your browser does not support Websockets. (Use Chrome)");
    }
}

function getNextTurn() {
    setTimeout(() => {
        send("NEXT")
    }, 100);
}

function send(message) {
    if (!window.WebSocket) {
        return;
    }
    if (socket.readyState == WebSocket.OPEN) {
        socket.send(message);
    }
}
