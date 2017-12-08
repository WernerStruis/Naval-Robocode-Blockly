package io.vertx.blockly.webapp;


import NavalRobocode.NavalRobocode;
import com.fasterxml.jackson.databind.util.JSONPObject;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.Future;
import io.vertx.core.http.HttpServerResponse;

import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import jdk.nashorn.internal.parser.JSONParser;
import net.sf.robocode.core.RobocodeMain;
import vertx.Runner;

import java.awt.*;
import java.awt.List;
import java.io.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;


/**
 * Created by do601 on 3/17/17.
 */
public class BlocklyServer extends AbstractVerticle {

    public static void main(String[] args) {
        Runner.runExample(BlocklyServer.class);
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


        //set the routes
        initPageRoutes(router);
        initAPIRoutes(router);
        initRoboRoute(router);

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

    public void initAPIRoutes(Router router) {
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

                    TransferThread t = new TransferThread(ip, Integer.parseInt(port), shipName+".class", classFile, shipPackage, response);
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

//        router.route("/publish").handler(routingContext -> {
//            JsonObject json = routingContext.getBodyAsJson();
//            HttpServerResponse response = routingContext.response();
//
//            System.out.println(json.toString());
//            String ip = json.getString("ip");
//            String port = json.getString("port");
//            String shipName = json.getString("name");
//            String shipPackage = json.getString("package");
//
//
//
//
//            System.out.printf("%s : %s [%s]", ip, port, shipName);
//
//            TransferThread t = new TransferThread(ip, shipName+".class", classFile, shipPackage, response);
//            Thread tr = new Thread(t);
//            tr.start();
//        });
    }

    public void initPageRoutes(Router router) {

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

    public void initRoboRoute(Router router){
        //main route, links to index.html
        router.route("/robocode/start").handler(routingContext -> {
            JsonObject json = routingContext.getBodyAsJson();
            HttpServerResponse response = routingContext.response();

            //get code out of body
            System.out.println(json.toString());
            String code = json.getString("code");

            //compile ship
            ShipCompiler c = new ShipCompiler(code, NavalRobocode.getRobotsDir().getPath());
            int status = c.compile();
            System.out.println("Compilation status: " + status);

            //start robocode
            Thread robocodeThread = new Thread(new NavalRobocode());
            robocodeThread.start();

            if (status == 0) {
                response.setStatusCode(200)
                        .end();
            }else{
                response.setStatusCode(500)
                        .end();
            }

            response.close();
        });
    }

    private void test(){
        System.out.println(BlocklyServer.class.getResource("/web/lib/NavalRobocode/robocode.jar").getPath());
        System.out.println(new File(".").getAbsoluteFile().getPath());
    }

}

