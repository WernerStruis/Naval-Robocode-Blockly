package io.vertx.blockly.webapp.Blockly;

import NavalRobocode.RobocodeManager;
import io.vertx.core.http.ServerWebSocket;
import net.sf.robocode.io.Logger;
import net.sf.robocode.serialization.IXmlSerializable;
import net.sf.robocode.serialization.SerializableOptions;
import net.sf.robocode.serialization.XmlWriter;
import robocode.control.snapshot.ITurnSnapshot;

import java.io.IOException;
import java.io.StringWriter;

import org.json.JSONObject;
import org.json.XML;

/**
 * @author Thales B.V. /Werner Struis
 */
public class SnapShotTransferer {

    private ServerWebSocket ws;
    private RobocodeManager manager;

    public SnapShotTransferer(ServerWebSocket ws, RobocodeManager manager){
        this.ws = ws;
        this.manager = manager;
    }

    public void sendSnapShot(ITurnSnapshot snapshot){
        if(snapshot != null) {
            ws.writeTextMessage(toJSONString(snapshot));
        }
//        }else{
//            ws.writeTextMessage("STOP");
//        }
    }
    public void sendNullSnapshot(){
        ws.writeTextMessage("NULL");
    }

    public void closeWebSocket(){
        System.out.println("CLOSING WEBSOCKET");
        ws.close();
    }


    private String toJSONString(ITurnSnapshot lastSnapShot) {
        if(lastSnapShot != null) {
            final StringWriter writer = new StringWriter();
            final XmlWriter xmlWriter = new XmlWriter(writer, true);

            try {
                ((IXmlSerializable) lastSnapShot).writeXml(xmlWriter, new SerializableOptions(false));
                writer.close();
            } catch (IOException e) {
                Logger.logError(e);
            }
            String xmlString = writer.toString();
            JSONObject xmlJSONObj = XML.toJSONObject(xmlString);
            return xmlJSONObj.toString();
        }else{
            return null;
        }
    }
}
