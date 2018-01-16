package io.vertx.blockly.webapp.vertx;

import NavalRobocode.RobocodeManager;
import io.vertx.blockly.webapp.Blockly.SnapShotTransferer;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.HttpServer;

/**
 * @author Thales B.V. /Werner Struis
 */
public class WebSocketHandler {
    private HttpServer server;
    private RobocodeManager manager;
    Thread snapShotThread;


    public WebSocketHandler(HttpServer server, RobocodeManager manager){
        this.server = server;
        this.manager = manager;
    }

    public void createWebSocketHandler(){
        server.websocketHandler(ws -> {
            if (ws.path().equals("/ws")){
                ws.handler(new Handler<Buffer>() {
                    @Override
                    public void handle(Buffer data) {
                        String action = data.toString();
                        switch (action){
                            case "READY":
                                manager.createTransferer(ws);
                                break;
                            case "STOP":
                                System.out.println("CLOSING WEBSOCKET");
                                snapShotThread.interrupt();
                                break;
                            case "NEXT":
                                try {
                                    Thread.sleep(50);
                                } catch (InterruptedException e) {
                                    e.printStackTrace();
                                }

                                manager.sendNextTurn();
                        }
                    }
                });
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                ws.writeTextMessage("START");
            }else{
                ws.reject();
            }
        });
    }
}
