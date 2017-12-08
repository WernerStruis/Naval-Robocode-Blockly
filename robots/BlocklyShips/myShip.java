package BlocklyShips;

import robocode.CruiserShip;
import robocode.naval.Components.RadarComponents.LongRangeRadar;
import robocode.naval.Components.CannonComponents.DoubleBarrelCannon;

public class myShip extends CruiserShip<LongRangeRadar, DoubleBarrelCannon>{

    
  
  @Override
  public LongRangeRadar setSlot1(){
    return new LongRangeRadar();
  }
  
  @Override
  public DoubleBarrelCannon setSlot2(){
    return new DoubleBarrelCannon();
  }
  
  
  
}