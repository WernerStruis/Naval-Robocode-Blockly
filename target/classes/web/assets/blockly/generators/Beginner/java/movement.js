goog.provide('Blockly.Java.Movement');
goog.require('Blockly.Java');
goog.require('Blockly.Constants');


Blockly.Java['mvforward'] = function (block) {
    var distance = Blockly.Java.valueToCode(block, "DIST", Blockly.Java.ORDER_NONE);
    if(distance == ''){
        distance = Blockly.Constants.values.MOVEMENT_SPEED;
    }
    return "setAhead("+distance+");\n";
};

Blockly.Java['mvbackward'] = function (block) {
    var distance = Blockly.Java.valueToCode(block, "DIST", Blockly.Java.ORDER_NONE);
    if(distance == ''){
        distance = Blockly.Constants.values.MOVEMENT_SPEED;
    }
    return "setBack("+distance+");\n";
};

Blockly.Java['trright'] = function (block) {
    var angle = Blockly.Java.valueToCode(block, "ANGLE", Blockly.Java.ORDER_NONE);
    if(angle == ''){
        angle = Blockly.Constants.values.TURN_SPEED;
    }
    return "setTurnRightDegrees("+angle+");\n";
};

Blockly.Java['trleft'] = function (block) {
    var angle = Blockly.Java.valueToCode(block, "ANGLE", Blockly.Java.ORDER_NONE);
    if(angle == ''){
        angle = Blockly.Constants.values.TURN_SPEED;
    }
    return "setTurnLeftDegrees("+angle+");\n";
};



