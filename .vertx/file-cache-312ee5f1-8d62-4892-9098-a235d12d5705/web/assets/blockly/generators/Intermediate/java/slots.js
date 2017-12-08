goog.provide('Blockly.Java.SlotGenerators');
goog.require('Blockly.Java');
goog.require('Blockly.Constants');

/**
 * Slot getters
 */
Blockly.Java['slot1'] = function (block) {
    Blockly.Java.getErrorMessages(block);
    return ["slot1()", Blockly.Java.ORDER_NONE];
};

Blockly.Java['slot2'] = function (block) {
    return ["slot2()", Blockly.Java.ORDER_NONE];
};

Blockly.Java['slot3'] = function (block) {
    return ["slot3()", Blockly.Java.ORDER_NONE];
};

Blockly.Java['slot4'] = function (block) {
    return ["slot4()", Blockly.Java.ORDER_NONE];
};


/**
 * Slot actions
 */
Blockly.Java['atrright'] = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var angle = block.getFieldValue("OPT_ANGLE");

    if(angle == 'ANGLE'){
        angle = Blockly.Java.valueToCode(block, "ANGLE", Blockly.Java.ORDER_NONE);
    }

    if(angle == ''){
        angle = Blockly.Constants.values.COMPONENT_TURN_SPEED;
    }

    var code = slot + '.setTurnRightDegrees('+angle+');\n';
    //code += 'while('+slot+'.getTurnRemainingRadians() != 0){\n  execute();\n}\n';
    return code;
};
Blockly.Java['atto'] = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var code = slot + '.setTurnRightRadians('+slot + '.getBearingRadians(event)'+');\n';
    //code += 'while('+slot+'.getTurnRemainingRadians() != 0){\n  execute();\n}\n';

    //this block is not used.
    //var component = Blockly.Java.valueToCode(block, "TO", Blockly.Java.ORDER_NONE);

    return code;
};
Blockly.Java['atrleft'] = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var angle = block.getFieldValue("OPT_ANGLE");

    if(angle == 'ANGLE'){
        angle = Blockly.Java.valueToCode(block, "ANGLE", Blockly.Java.ORDER_NONE);
    }

    if(angle == ''){
        angle = Blockly.Constants.values.COMPONENT_TURN_SPEED;
    }

    var code = slot + '.setTurnLeftDegrees('+angle+');\n';
    //code += 'while('+slot+'.getTurnRemainingRadians() != 0){\n  execute();\n}\n';
    return code;
};
Blockly.Java['fire'] = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var power = Blockly.Java.valueToCode(block, "POWER", Blockly.Java.ORDER_NONE);

    if(power == ''){
        power = Blockly.Constants.values.FIRE_POWER;
    }

    return slot + '.fire('+power+');\n';
};
Blockly.Java['launch'] = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var power = Blockly.Java.valueToCode(block, "POWER", Blockly.Java.ORDER_NONE);

    if(power == ''){
        power = Blockly.Constants.values.LAUNCH_POWER;
    }

    return slot + '.launch('+power+');\n';
};
Blockly.Java['mine']  = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    var power = Blockly.Java.valueToCode(block, "POWER", Blockly.Java.ORDER_NONE);

    if(power == ''){
        power = Blockly.Constants.values.MINE_POWER;
    }

    return slot + '.placeMine('+power+');\n';
};

/**
 * Slot getters
 */
Blockly.Java['atblindspot']  = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    return [slot + '.getAtBlindSpot()', Blockly.Java.ORDER_NONE];
};
Blockly.Java['atgunheat']  = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    return [slot + '.getGunHeat()', Blockly.Java.ORDER_NONE];
};
Blockly.Java['atheading']  = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    return [slot + '.getHeadingDegrees()', Blockly.Java.ORDER_NONE];
};
Blockly.Java['atturnremaining']  = function (block){
    var slot = Blockly.Java.valueToCode(block, "SLOT", Blockly.Java.ORDER_NONE);
    return [slot + '.getTurnRemainingDegrees()', Blockly.Java.ORDER_NONE];
};