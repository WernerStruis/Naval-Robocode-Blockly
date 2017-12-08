package io.vertx.blockly.webapp;

import NavalRobocode.NavalRobocode;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;

/**
 * Created by dp038 on 11/29/17.
 */
public class ShipCompiler {
    private String fileDirectory = "files/";
    private final String javaExtension = ".java";

    private String javaString;
    private String fileName;
    private String packageName;

    public ShipCompiler(String javaString, String fileDirectory) {
        this.javaString = javaString;
        this.fileDirectory = fileDirectory;
    }

    public int compile(){
        File f = makeJavaFile(javaString);
        int status =  compileJavaFile(f);
        return status;
    }

    public File getClassFile(){
        return new File(fileDirectory + fileName + ".class");
    }

    private int compileJavaFile(File javaFile) {
        int result = 1;
        System.out.println("Compiling....");
        Runtime runtime = Runtime.getRuntime();

        String jarPath = System.getProperty("user.home") + File.separator + "naval-robocode" + File.separator + "libs" + File.separator + "robocode.jar ";

        String javaCommand = "javac -cp " + jarPath + javaFile.getAbsolutePath();
        System.out.println("jarPath: " + jarPath + "Command: " + javaCommand);

        try {
            Process p = runtime.exec(javaCommand);
            p.waitFor();
            result = p.exitValue();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }


    private File makeJavaFile(String javaCode) {
        BufferedWriter out = null;

        fileName = getFileName(javaCode);
        packageName = getPackageName(javaCode);

        System.out.println("-----------------");
        System.out.println("Filename: " + fileName);
        System.out.println("Package : " + packageName);

        createDir(fileDirectory + "/" + packageName);

        File f = new File(fileDirectory + "/" + packageName + "/" + fileName + ".java");
        try {
            out = new BufferedWriter(new FileWriter(f));
            out.write(javaCode);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

       return f;
    }

    private void createDir(String dirPath){

        File theDir = new File(dirPath);

// if the directory does not exist, create it
        if (!theDir.exists()) {
            System.out.println("creating directory: " + theDir.getName());
            boolean result = false;

            try{
                theDir.mkdir();
                result = true;
            }
            catch(SecurityException se){
                //handle it
            }
            if(result) {
                System.out.println("DIR created");
            }
        }else{
            System.out.println("Dir already exists");
        }
    }

    private String getFileName(String code) {
        int indexOfPublicClass = code.indexOf("public class");
        int indexOfExtends = code.indexOf("extends");
        return code.substring(indexOfPublicClass + 13, indexOfExtends - 1);
    }

    private String getPackageName(String code) {
        return code.split("\n")[0].substring(8).replace(";", "").trim();
    }

}
