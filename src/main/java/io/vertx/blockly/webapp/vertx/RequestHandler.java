package io.vertx.blockly.webapp.vertx;


import NavalRobocode.RobocodeManager;
import io.vertx.blockly.webapp.Routes.BlocklyRoutes;
import io.vertx.blockly.webapp.Routes.RoboRoutes;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServer;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;

/**
 * @author Thales B.V. /Werner Struis
 */
public class RequestHandler {
    private HttpServer server;

    private Router router;
    private RobocodeManager manager;


    public RequestHandler(HttpServer server, RobocodeManager manager){
        this.server = server;
        this.manager = manager;
    }

    public void createRequestHandler(JsonObject config, Future<Void> fut, Router router){
        this.router = router;

        server.requestHandler(router::accept).listen(
                config.getInteger("http.port", 8080),
                result -> {
                    if (result.succeeded()) {
                        System.out.println("Server started!");
                        fut.complete();
                    } else {
                        fut.fail(result.cause());
                    }
                }
        );
    }

    public void setRoutes(){
        //main route, links to index.html
        router.route("/").handler(routingContext -> {
            HttpServerResponse response = routingContext.response();
            response
                    .putHeader("Location", "/web/index.html")
                    .setStatusCode(303)
                    .end();
            response.close();
        });

        //set the routes
        BlocklyRoutes blocklyRoutes = new BlocklyRoutes(router);
        RoboRoutes roboRoutes = new RoboRoutes(router, manager);

    }
}
