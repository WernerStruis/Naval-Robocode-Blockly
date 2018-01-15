package io.vertx.blockly.webapp.Routes;

import NavalRobocode.RobocodeManager;
import io.vertx.blockly.webapp.Blockly.ShipCompiler;
import io.vertx.blockly.webapp.Blockly.TransferThread;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

import java.io.File;

public class BlocklyRoutes {

    private Router router;

    public BlocklyRoutes(Router router){
        this.router = router;

        route();
    }

    private void route(){
        //route for publishing ship
        router.route("/upload").handler(routingContext -> {
            JsonObject json = routingContext.getBodyAsJson();
            HttpServerResponse response = routingContext.response();

            System.out.println(json.toString());
            String ip = json.getString("ip");
            String port = json.getString("port");
            String shipName = json.getString("name");
            String shipPackage = json.getString("pkg");
            String code = json.getString("code");


            ShipCompiler c = new ShipCompiler(code, "files/");
            int status = c.compile();
            System.out.println("Compilation status: " + status);


            switch (status) {
                case 0:
                    System.out.println("Compilation succesful");
                    System.out.println("-----------------");

                    File classFile = c.getClassFile();

                    TransferThread t = new TransferThread(ip, Integer.parseInt(port), shipName + ".class", classFile, shipPackage, response);
                    Thread tr = new Thread(t);
                    tr.start();

                    break;
                default:
                    System.out.printf("Unknown compilation error [status: %d]", status);
                    System.out.println("-----------------");
                    response.putHeader("content-type", "application/json")
                            .setStatusCode(500)
                            .end(String.format("{'status': %d, 'compilestatus': %d}", 500, status));
                    response.close();
                    break;
            }
        });


        //main route, links to index.html
        router.route("/").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response
                    .putHeader("Location", "/web/index.html")
                    .setStatusCode(303)
                    .end();
            response.close();
        });
    }
}
