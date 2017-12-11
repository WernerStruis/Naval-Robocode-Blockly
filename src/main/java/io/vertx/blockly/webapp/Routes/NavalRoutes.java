package io.vertx.blockly.webapp.Routes;

import NavalRobocode.NavalRobocode;
import io.vertx.blockly.webapp.Compiler.ShipCompiler;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import net.sf.robocode.core.Main;

import java.util.List;

/**
 * Created by dp038 on 12/11/17.
 */
public class NavalRoutes {

    private Router router;
    private NavalRobocode robocode;


    public NavalRoutes(Router router) {
        this.router = router;
//        this.robocode = new NavalRobocode();
        routeRobocode();
        getRobotsList();
    }

    public void startRobocode(boolean visible) {
        robocode = new NavalRobocode(visible);
        robocode.start();
    }

    public void endRobocode() {
        //TODO end robocode

        robocode.exit();
    }

    public void compileAndTransfer() {
        //main route, links to index.html
        router.route("/robocode/transfer").handler(routingContext -> {
            JsonObject json = routingContext.getBodyAsJson();
            HttpServerResponse response = routingContext.response();

            //get code out of body
            System.out.println(json.toString());
            String code = json.getString("code");

            //compile ship
            ShipCompiler c = new ShipCompiler(code, NavalRobocode.getRobotsDir().getPath());
            int status = c.compile();
            System.out.println("Compilation status: " + status);

            if (status == 0) {
                response.setStatusCode(200)
                        .end();
            } else {
                response.setStatusCode(500)
                        .end();
            }

            response.close();
        });
    }

    public void routeRobocode() {
        //main route, links to index.html
        router.route("/robocode/start").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();

            //start robocode
            if (robocode == null) {
                startRobocode(false);
            } else {
                robocode.setVisisble(true);
            }

            response.setStatusCode(200)
                    .end();
            response.close();
        });
    }

    public void getRobotsList() {

        //main route, links to index.html
        router.route("/robocode/robots").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();

            System.out.println("Retrieving robots");
            if (robocode == null) {
                startRobocode(false);
            }

            List<String> robots = robocode.getRobotList();

            if (robots.size() >= 0) {
//                response.write(new JsonArray(robots.toString()).toString());
                response.setStatusCode(200).end(robots.toString());
            } else {
                response.setStatusCode(500).end();
            }

            response.close();
        });
    }
}
