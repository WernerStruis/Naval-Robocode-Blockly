package NavalRobocode;

import net.sf.robocode.BlocklyCallbacks.BlocklyCallBacks;
import net.sf.robocode.core.Main;
import net.sf.robocode.io.FileUtil;
import net.sf.robocode.repository.IRobotSpecItem;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dp038 on 12/5/17.
 */
public class NavalRobocode implements BlocklyCallBacks{
    private Main main;
    private Thread robocodeThread;

    public NavalRobocode(boolean visible){
        String[] args;

        if(visible) {
            args = new String[0];
        }else{
            args = new String[1];
            args[0] = "-nodisplay";
        }
        main = new Main(args, this);

        //set classpath
        String cp = new File("").getAbsolutePath();
        main.setClassPath(cp);

        //initialize thread
        robocodeThread = new Thread(main);

    }

    public void start(){
        robocodeThread.setDaemon(true);
        robocodeThread.start();
    }

    public void setVisisble(boolean visible){
        main.showRobocode(visible);
    }


    public List<String> getRobotList(){
        List<IRobotSpecItem> robots = main.getRobotList();
        List<String> robotStrings = new ArrayList<>();

        for(IRobotSpecItem item : robots){
            robotStrings.add(item.getFullClassName());
        }

        return robotStrings;
    }

    public static File getRobotsDir(){
        return FileUtil.getRobotsDir();
    }


//    @Override
//    public void run() {
//        start();
//    }

    @Override
    public void exit() {
        System.out.println("EXIT");
        Thread.currentThread().interrupt();
    }
}
