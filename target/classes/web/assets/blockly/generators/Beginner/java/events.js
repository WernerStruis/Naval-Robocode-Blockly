goog.provide('Blockly.Java.events');
goog.require('Blockly.Java');

/**
 * Event definition
 */
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

/**
 * Event data
 */
Blockly.Java['gheading'] = function (block) {
    return ["event.getHeadingDegrees()", Blockly.Java.ORDER_NONE];
};
Blockly.Java['gbearing'] = function (block) {
    return ["event.getBearingDegrees()", Blockly.Java.ORDER_NONE];
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