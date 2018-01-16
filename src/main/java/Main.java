import io.vertx.blockly.webapp.Server;

/**
 * @author Thales B.V. /Werner Struis
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
