package NavalRobocode;

import io.vertx.blockly.webapp.Blockly.ShipCompiler;
import org.junit.Test;

import java.io.File;
import java.net.URISyntaxException;

import static org.junit.Assert.*;

public class CompilerTest {
    String goodFile = "/testPackage/testShip.java";
    String badFile = "/testPackage/testShipBad.java";

    private ShipCompiler compiler;

    public CompilerTest(){
        compiler = new ShipCompiler(null, "/robots/");
    }

    @Test
    public void testCompileGood(){
        try {
            int status = compiler.compileJavaFile(new File(CompilerTest.class.getResource(goodFile).toURI()));
            System.out.println("Good file compilation status: " + status);

            assertTrue("Compilation status not as expected.", status == 0);
        } catch (URISyntaxException e) {
            e.printStackTrace();
            System.err.println("Error opening file.");
        }
    }

    @Test
    public void testCompileWithError(){
        try {
            int status = compiler.compileJavaFile(new File(CompilerTest.class.getResource(badFile).toURI()));
            System.out.println("Bad file compilation status: " + status);
            assertTrue("Compilation status not as expected.", status == 1);

        } catch (URISyntaxException e) {
            e.printStackTrace();
            System.err.println("Error opening file.");
        }
    }

}
