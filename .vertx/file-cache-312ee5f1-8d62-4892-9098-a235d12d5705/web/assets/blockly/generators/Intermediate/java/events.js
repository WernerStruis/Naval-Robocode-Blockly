goog.provide('Blockly.Java.events');
goog.require('Blockly.Java');

/**
 * Event definition
 */
Blockly.Java['oscanned'] = function (block) {
    Blockly.Java.addImport("robocode.ScannedShipEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onScannedShip(ScannedShipEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
Blockly.Java['ohitrobot'] = function (block) {
    Blockly.Java.addImport("robocode.HitRobotEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onHitRobot(HitRobotEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
Blockly.Java['ohitwall'] = function (block) {
    Blockly.Java.addImport("robocode.HitWallEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onHitWall(HitWallEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
Blockly.Java['ohitbybullet'] = function (block) {
    Blockly.Java.addImport("robocode.HitByBulletEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onHitByBullet(HitByBulletEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
Blockly.Java['ohitbymissile'] = function (block) {
    Blockly.Java.addImport("robocode.HitByMissileEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onHitByMissile(HitByMissileEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
Blockly.Java['oscannedmissile'] = function (block) {
    Blockly.Java.addImport("robocode.ScannedMissileEvent");
    var statements = Blockly.Java.statementToCode(block, 'DO');
    return Blockly.Java.scrub_(block, "@Override\npublic void onScannedMissile(ScannedMissileEvent event){\n" +
        Blockly.Java.prefixLines(statements, Blockly.Java.INDENT) +
        "}\n");
};
/**
 * Event data
 */
Blockly.Java['gheading'] = function (block) {
    return ["event.getHeadingRadians()", Blockly.Java.ORDER_NONE];
};
Blockly.Java['gbearing'] = function (block) {
    if(block.getParent().type == 'atrleft' || block.getParent().type == 'atrright'){
        var slot = block.getParent().getInputTargetBlock('SLOT').type;
        var code = slot + "().getBearingDegrees(event)";
        return [code, Blockly.Java.ORDER_NONE];
    }else {
        return ["event.getBearingDegrees()", Blockly.Java.ORDER_NONE];
    }
};
Blockly.Java['gname'] = function (block) {
    return ["event.getName()", Blockly.Java.ORDER_NONE];
};
Blockly.Java['gvelocity'] = function (block) {
    return ["event.getVelocity()", Blockly.Java.ORDER_NONE];
};
Blockly.Java['gdistance'] = function (block) {
    return ["event.getDistance()", Blockly.Java.ORDER_NONE];
};