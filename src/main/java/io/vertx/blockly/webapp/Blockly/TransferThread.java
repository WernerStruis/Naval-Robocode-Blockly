package io.vertx.blockly.webapp.Blockly;

import io.vertx.core.http.HttpServerResponse;

import java.io.*;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;

/**
 * Created by dp038 on 10/12/17.
 */
public class TransferThread implements Runnable {
    private Socket socket = null;
    private OutputStream os = null;
    private File fileToSend = null;
    private String fileName = null;

    private String ipString = null;
    private int port;
    private SocketAddress socketaddr;

    private String pkg = null;
    private HttpServerResponse response = null;

    public TransferThread(String ipString, int port, String fileName, File fileToSend, String pkg, HttpServerResponse response) {
        this.ipString = ipString;
        this.port = port;
        this.fileName = fileName;
        this.fileToSend = fileToSend;
        this.pkg = pkg;
        this.response = response;
    }

    private void initSocket(){
        System.out.printf("Initializing socket on ip: %s & port: %d\n", ipString, port);
        try {
            socketaddr = new InetSocketAddress(ipString, port);
            socket = new Socket();
            socket.connect(socketaddr, 1000);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Connection refused, ending transfer...");
            response.setStatusCode(500).setStatusMessage("Connection Refused");
//            response.end();
//            response.CLOSE();
        }
    }

    public void run(){
        System.out.println(fileToSend.getPath());
        initSocket();
        try{
            os = new BufferedOutputStream(socket.getOutputStream());

            System.out.println("Sending file...");
            System.out.println(fileToSend.getPath());

            try(DataOutputStream d = new DataOutputStream(os)){
                d.writeUTF(pkg);
                d.writeUTF(fileName);
                Files.copy(fileToSend.toPath(), d);
            }

            System.out.println("Sending done.");

            response.setStatusCode(200).setStatusMessage("Success");


        } catch (NoSuchFileException e){
            e.printStackTrace();
            response.setStatusCode(404).setStatusMessage("File Not Found");

        } catch (IOException e) {
            e.printStackTrace();
            response.setStatusCode(500).setStatusMessage("Connection Refused");
        }  finally {
            try{
                if (os != null) os.close();
                if (socket!=null) socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            response.end();
            response.close();
        }

    }
}
