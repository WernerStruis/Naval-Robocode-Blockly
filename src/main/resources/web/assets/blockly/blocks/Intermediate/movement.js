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

/**
 * Methods
 */
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

/**
 * Getters
 */
Blockly.Blocks['gdistanceremaining'] = {
    init: function () {
        this.jsonInit({
            "type": "gdistanceremaining",
            "message0": Blockly.Msg.GDISTANCEREMAINING_TITLE,
            "output": "int",
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GDISTANCEREMAINING_TOOLTIP
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};
Blockly.Blocks['gbodyturnremaining'] = {
    init: function () {
        this.jsonInit({
            "type": "gbodyturnremaining",
            "message0": Blockly.Msg.GBODYTURNREMAINING_TITILE,
            "output": "int",
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GBODYHEADING_TOOLTIP
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};
Blockly.Blocks['gbodyheading'] = {
    init: function () {
        this.jsonInit({
            "type": "gbodyheading",
            "message0": Blockly.Msg.GBODYHEADING_TITLE,
            "output": "int",
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GBODYHEADING_TOOLTIP
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};