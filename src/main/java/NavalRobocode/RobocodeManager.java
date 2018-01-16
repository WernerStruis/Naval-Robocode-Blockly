package NavalRobocode;

import io.vertx.blockly.webapp.Blockly.SnapShotTransferer;
import io.vertx.core.http.ServerWebSocket;
import net.sf.robocode.BlocklyCallbacks.BlocklyCallBacks;
import net.sf.robocode.core.ExternalManager;
import net.sf.robocode.io.FileUtil;
import net.sf.robocode.ui.IWindowManager;
import robocode.control.snapshot.ITurnSnapshot;

import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.SynchronousQueue;

/**
 * @author Thales B.V. /Werner Struis
 */
public class RobocodeManager implements BlocklyCallBacks {

    private ExternalManager manager;
    private JFrame robocodeFrame;

    private SnapShotTransferer snapShotTransferer;

    private ITurnSnapshot lastSnapShot = null;

    private Queue<ITurnSnapshot> snapshots = new ConcurrentLinkedQueue<>();

    Thread battleThread;

    public RobocodeManager() {
        String[] args = new String[0];
        manager = new ExternalManager(args, this);
    }

    public void addDevelPath(){
        manager.addDevPath(FileUtil.getCwd().getPath() + "/robots");
        Collection<String> paths = manager.getDevPaths();
        System.out.println("------------------");
        Iterator<String> i = paths.iterator();
        while(i.hasNext()){
            System.out.println("DEV PATH: " + i.next());
        }
        System.out.println("------------------");



//        System.out.println("PATH: " + FileUtil.getCwd().getPath());
    }

    public void show() {
        robocodeFrame.setVisible(true);
        setFullScreen();
    }

    public IWindowManager getWindowManager() {
        return manager.getWindowManager();
    }

    public SnapShotTransferer createTransferer(ServerWebSocket ws) {
        if(snapShotTransferer != null){
            snapShotTransferer.closeWebSocket();
            snapshots = new ConcurrentLinkedQueue<>();
            snapShotTransferer = null;
        }
        snapShotTransferer = new SnapShotTransferer(ws, this);

        return snapShotTransferer;
    }

    public void sendNextTurn() {
        try {
            Thread.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        ITurnSnapshot ss = snapshots.poll();

        if(ss != null && snapShotTransferer != null){
            snapShotTransferer.sendSnapShot(ss);
        }else if(lastSnapShot != null && lastSnapShot.getRound() == 9){
            stopBattle();
        }else{
            if(snapShotTransferer != null) {
                snapShotTransferer.sendNullSnapshot();
            }
        }
    }

    @Override
    public void onBattleEnded() {
        if (snapShotTransferer != null) {
            snapShotTransferer.closeWebSocket();
            snapShotTransferer = null;
        }
    }



    @Override
    public void onIncomingSnapshot(ITurnSnapshot snapshot) {
        if(snapshot.getRound() == 9 && lastSnapShot.getTurn() != 150 && snapshot.getTurn() == 151){
            if (snapShotTransferer != null) {
                snapShotTransferer.closeWebSocket();
                snapShotTransferer = null;
            }
        }else{
            if(snapshots != null) {
                lastSnapShot = snapshot;
                snapshots.add(snapshot);
            }
        }
    }

    public void start() {
        try {
            manager.start();
            robocodeFrame = getWindowManager().getRobocodeFrame();
            addDevelPath();
        }catch (NullPointerException e){
            e.printStackTrace();
            start();
        }
    }

    public void setFullScreen() {
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        double width = screenSize.getWidth();
        double height = screenSize.getHeight();
        if (width > 0 && height > 0) {
            robocodeFrame.setBounds(0, 0, (int) width, (int) height);
        } else {
            robocodeFrame.setBounds(0, 0, 200, 200);

        }
    }

    public void stopBattle(){
        System.out.println("Stopping battle");
        if(battleThread != null && battleThread.isAlive()){
            battleThread.interrupt();
        }
        if (snapShotTransferer != null) {
            snapShotTransferer.closeWebSocket();
            snapShotTransferer = null;
        }

        lastSnapShot = null;
        snapshots = null;
    }

    public void runBattle(String selected) {
        snapshots = new ConcurrentLinkedQueue<>();
//        selected = selected.substring(1, selected.length() - 1);
        BattleThread bt = new BattleThread(manager, selected);
        battleThread = new Thread(bt);
        battleThread.start();
    }

    public List<String> getRobotList() {
        return manager.getRobotList();
    }

    @Override
    public void exit() {
        System.out.println("Closing robocode frame");
        robocodeFrame.setVisible(false);
    }

    private class BattleThread implements Runnable {
        private ExternalManager manager;
        private String selected;

        public BattleThread(ExternalManager manager, String selected) {
            this.manager = manager;
            this.selected = selected;
        }

        @Override
        public void run() {
            manager.runBattle(selected);
        }

        @Override
        protected void finalize() throws Throwable {
            super.finalize();
            manager.endBattle();
        }
    }
}
