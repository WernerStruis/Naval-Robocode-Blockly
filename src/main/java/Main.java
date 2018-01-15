import io.vertx.blockly.webapp.Server;

/**
 * Created by dp038 on 12/8/17.
 */
public class Main {
    private Server server;

    private Thread serverThread;

    public Main(){
        server = new Server();
        serverThread = new Thread(server);
    }
    public void run(){
        serverThread.start();
    }

    public static void main(String[]args){
        new Main().run();
    }
}
