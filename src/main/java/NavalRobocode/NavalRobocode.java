package NavalRobocode;

import net.sf.robocode.core.Main;
import net.sf.robocode.io.FileUtil;

import java.io.File;

/**
 * Created by dp038 on 12/5/17.
 */
public class NavalRobocode implements Runnable{

    public NavalRobocode(){
//        System.getProperties().setProperty("robocode.class.path", System.getProperties().getProperty("robocode.class.path") + "!/net/sf/robocode");
//        System.getProperties().setProperty("robocode.class.path", NavalRobocode.class.getResource("robocode.jar").getPath());
//        System.getProperties().setProperty("robocode.class.path", "TEST");

    }
    public void startRobocode(){
        String[] args = new String[0];
        Main m = new Main();
        String cp = new File("").getAbsolutePath();
        System.out.println(cp);
        m.setClassPath(cp);
        m.run(args);
    }

    public static File getRobotsDir(){
        return FileUtil.getRobotsDir();
    }


    @Override
    public void run() {
        startRobocode();
    }
}
