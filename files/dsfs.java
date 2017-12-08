package dsf;

import robocode.CruiserShip;
import robocode.naval.Components.CannonComponents.DoubleBarrelCannon;

public class dsfs extends CruiserShip<DoubleBarrelCannon, DoubleBarrelCannon>{

    
  
  @Override
  public DoubleBarrelCannon setSlot1(){
    return new DoubleBarrelCannon();
  }
  
  @Override
  public DoubleBarrelCannon setSlot2(){
    return new DoubleBarrelCannon();
  }
  
  
  
}