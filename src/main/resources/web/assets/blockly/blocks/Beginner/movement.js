/**
 * Defines all blocks in "Movement" category
 *
 * - Execute
 * - moveForward
 * - moveBackward
 * - turnRight
 * - turnLeft
 *
 */
//'use strict';


Blockly.Blocks['mvforward'] = {
    init: function () {
        this.jsonInit({
            "type": "mvforward",
            "message0": Blockly.Msg.MVFORWARD_TITLE,
            "args0":[{
                "type": "input_value",
                "name": "DIST",
                "check": "int"
            }],
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.MVFORWARD_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};
Blockly.Blocks['mvbackward'] = {
    init: function () {
        this.jsonInit({
            "type": "mvbackward",
            "message0": Blockly.Msg.MVBACKWARD_TITLE,
            "args0":[{
                "type": "input_value",
                "name": "DIST",
                "check": "int"
            }],
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.MVBACKWARD_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};

Blockly.Blocks['trright'] = {
    init: function () {
        this.jsonInit({
            "type": "trright",
            "message0": Blockly.Msg.TRRIGHT_TITLE,
            "args0":[{
                "type": "input_value",
                "name": "ANGLE",
                "check": "int"
            }],
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.TRRIGHT_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSIONA)
    }
};

Blockly.Blocks['trleft'] = {
    init: function () {
        this.jsonInit({
            "type": "trleft",
            "message0": Blockly.Msg.TRLEFT_TITLE,
            "args0":[{
                "type": "input_value",
                "name": "ANGLE",
                "check": "int"
            }],
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.TRLEFT_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};
