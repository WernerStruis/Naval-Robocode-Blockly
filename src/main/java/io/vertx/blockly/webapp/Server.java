package io.vertx.blockly.webapp;

import NavalRobocode.RobocodeManager;
import io.vertx.blockly.webapp.Routes.BlocklyRoutes;
import io.vertx.blockly.webapp.Routes.RoboRoutes;
import io.vertx.blockly.webapp.vertx.RequestHandler;
import io.vertx.blockly.webapp.vertx.WebSocketHandler;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.blockly.webapp.vertx.Runner;

import java.awt.*;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;


/**
 * Created by do601 on 3/17/17.
 */
public class Server extends AbstractVerticle implements Runnable {

    private RobocodeManager manager;

    private RequestHandler rqHandler;
    private WebSocketHandler wsHandler;

    @Override
    public void start(Future<Void> fut) {
        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());
        router.route().handler(CorsHandler.create("*")
                .allowedMethod(HttpMethod.GET)
                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.OPTIONS)
                .allowedHeader("X-PINGARUNER")
                .allowedHeader("Content-Type"));

        router.route("/web/*").handler(StaticHandler.create("web"));

        //initialize robocode manager
        manager = new RobocodeManager();
        manager.start();

        //start server
        createServer(router, fut);

//        try {
//            openBrowser();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }



    public void openBrowser() throws IOException {
        String os = System.getProperty("os.name").toLowerCase();
        String url = "http://localhost:8080";

        System.out.println("Using OS: " + os);

        if (Desktop.isDesktopSupported()) {
            try {
                Desktop d = Desktop.getDesktop();
                d.browse(new URI(url));

            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
        }
    }

    public void createServer(Router router, Future<Void> fut) {
        HttpServer server = vertx.createHttpServer();

        wsHandler = new WebSocketHandler(server, manager);
        wsHandler.createWebSocketHandler();

        rqHandler = new RequestHandler(server, manager);
        rqHandler.createRequestHandler(config(), fut, router);
        rqHandler.setRoutes();
    }

    public static void main(String[] args) {
        Runner.runExample(Server.class);
    }

    public void run() {
        Runner.runExample(Server.class);
    }

}

