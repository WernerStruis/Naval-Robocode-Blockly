package io.vertx.blockly.webapp.Routes;

import NavalRobocode.RobocodeManager;
import io.vertx.blockly.webapp.Blockly.ShipCompiler;
import io.vertx.blockly.webapp.Blockly.TransferThread;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

import java.io.File;
import java.util.ArrayList;

/**
 * @author Thales B.V. /Werner Struis
 */
public class RoboRoutes {

    private Router router;
    private RobocodeManager manager;

    public RoboRoutes(Router router, RobocodeManager manager) {
        this.router = router;
        this.manager = manager;

        route();
        upload();
    }

    private void upload() {
        router.route("/robocode/upload").handler(routingContext -> {
            manager.setFullScreen();
            JsonObject json = routingContext.getBodyAsJson();
            HttpServerResponse response = routingContext.response();

            System.out.println(json.toString());
            String code = json.getString("code");

            ShipCompiler c = new ShipCompiler(code, "robots/");
            int status = c.compile();
            System.out.println("Compilation status: " + status);

            if (status == 0) {
                response.setStatusCode(200)
                        .end();
                response.close();
            } else {
                response.setStatusCode(500)
                        .end();
                response.close();
            }
        });
    }


    private String[] stringToArray(String arrayString){
        arrayString = arrayString.substring(1, arrayString.length() - 1);
        String[] robots = arrayString.split(",");


        for(int i = 0; i < robots.length; i++){
            String bot = robots[i];
            robots[i] = (bot.substring(1, bot.length() - 1) + "*");
        }

        return robots;
    }
    private void route() {

        router.route("/robocode/start").handler(routingContext -> {

//            manager.setFullScreen();
            System.out.println(routingContext.toString());

            JsonObject json = routingContext.getBodyAsJson();
            HttpServerResponse response = routingContext.response();

            System.out.println("--------------");

            System.out.println(json.getString("opponents"));
            String[] opponents = stringToArray(json.getString("opponents"));
            String opponentString = "";

            //build the opponentString
            for (int i = 0; i < opponents.length; i++) {
                opponentString += opponents[i];

                //add ',' if not the last
                if (i != opponents.length - 1) {
                    opponentString += ",";
                }
            }

            System.out.println(opponentString);
            //run a battle with the opponents
            manager.runBattle(opponentString);

            response.setStatusCode(200)
                    .end();
            response.close();
        });

        router.route("/robocode/stop").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();

            //stop current game (if there is any)
            manager.stopBattle();

            response.setStatusCode(200)
                    .end();
            response.close();
        });


        //main route, links to index.html
        router.route("/robocode/show").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();

//            manager.show();

            response.setStatusCode(200)
                    .end();
            response.close();
        });

        //main route, links to index.html
        router.route("/robocode/robots").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            String robots = manager.getRobotList().toString();
            System.out.println(robots);
            response.setStatusCode(200)
                    .end(robots);
            response.close();
        });

        //main route, links to index.html
        router.route("/robocode").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response
                    .putHeader("Location", "/web/playground.html")
                    .setStatusCode(303)
                    .end();
            response.close();
        });
    }
}
