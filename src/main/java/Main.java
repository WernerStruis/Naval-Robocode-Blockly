import NavalRobocode.NavalRobocode;
import io.vertx.blockly.webapp.Server;

/**
 * Created by dp038 on 12/8/17.
 */
public class Main {
    private Server server;
    private NavalRobocode game;

    private Thread serverThread;
//    private Thread gameThread;

    public Main(){
        server = new Server();
        game = new NavalRobocode(false);

        serverThread = new Thread(server);
//        gameThread = new Thread(game);

    }
    public void run(){
        serverThread.start();
//        gameThread.start();
    }

    public static void main(String[]args){
        new Main().run();
    }
}
