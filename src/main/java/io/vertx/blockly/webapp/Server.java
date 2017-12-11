package io.vertx.blockly.webapp;


import io.vertx.blockly.webapp.Routes.NavalRoutes;
import io.vertx.blockly.webapp.Routes.Routes;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;

import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.blockly.webapp.vertx.Runner;

import java.awt.*;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;


/**
 * Created by do601 on 3/17/17.
 */
public class Server extends AbstractVerticle implements Runnable{

    public static void main(String[] args) {
        Runner.runExample(Server.class);
    }

    public void run(){
        Runner.runExample(Server.class);
    }

    @Override
    public void start(Future<Void> fut) {
        System.out.println("server started");


        Router router = Router.router(vertx);
        router.route().handler(BodyHandler.create());


//        router.route().handler(CorsHandler.create("*")
//                .allowedMethod(HttpMethod.POST)
//                .allowedMethod(HttpMethod.GET)
//                .allowedMethod(HttpMethod.OPTIONS)
//                .allowedHeader("Content-Type"));

        router.route("/web/*").handler(StaticHandler.create("web"));

        Routes r = new Routes(router);
        NavalRoutes nr = new NavalRoutes(router);

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
        vertx.createHttpServer().requestHandler(router::accept).listen(
                config().getInteger("http.port", 8080),
                result -> {
                    if (result.succeeded()) {
                        fut.complete();
                    } else {
                        fut.fail(result.cause());
                    }
                }
        );
    }


}

