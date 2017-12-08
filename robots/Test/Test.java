package Test;

import robocode.CruiserShip;
import robocode.naval.Components.CannonComponents.DoubleBarrelCannon;
import robocode.naval.Components.CannonComponents.SingleBarrelCannon;

public class Test extends CruiserShip<DoubleBarrelCannon, SingleBarrelCannon>{

    
  
  @Override
  public DoubleBarrelCannon setSlot1(){
    return new DoubleBarrelCannon();
  }
  
  @Override
  public SingleBarrelCannon setSlot2(){
    return new SingleBarrelCannon();
  }
  
  
  
}