package testPackage;

import robocode.CorvetteShip;
import robocode.naval.Components.CannonComponents.SingleBarrelCannon;
import robocode.naval.Components.RadarComponents.LongRangeRadar;
import robocode.naval.Components.CannonComponents.DoubleBarrelCannon;
import robocode.ScannedShipEvent;

public class testShip extends CorvetteShip<SingleBarrelCannon, LongRangeRadar, DoubleBarrelCannon>{

  public void run(){
    super.run();
  
    while(true){
      setAhead(200);
      setTurnRightDegrees(10);
      execute();
    }
  }
  
  @Override
  public void onScanShip(ScannedShipEvent event){
      setBack();
      setTurnLeftDegrees(10);
      execute();
  }
  
  
  @Override
  public SingleBarrelCannon setSlot1(){
    return new SingleBarrelCannon();
  }
  
  @Override
  public LongRangeRadar setSlot2(){
    return new LongRangeRadar();
  }
  
  @Override
  public DoubleBarrelCannon setSlot3(){
    return new DoubleBarrelCannon();
  }
  
  
  
}