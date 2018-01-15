/**
 * Defines all blocks in "Slots" category
 *
 * - Slot1
 *
 */
//'use strict';
goog.provide('Blockly.Constants.Slots');


Blockly.Blocks['slot1'] = {
    init: function () {
        this.jsonInit({
            "type": "slot1",
            "message0": Blockly.Msg.SLOT1_TITLE,
            "colour": Blockly.Msg.SLOT_HUE,
            "tooltip": Blockly.Msg.SLOT1_TOOLTIP,
            "output": "slot"
        });
        this.setOnChange(Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE)
    }
};

Blockly.Blocks['slot2'] = {
    init: function () {
        this.jsonInit({
            "type": "slot2",
            "message0": Blockly.Msg.SLOT2_TITLE,
            "colour": Blockly.Msg.SLOT_HUE,
            "tooltip": Blockly.Msg.SLOT2_TOOLTIP,
            "output": "slot"
        });
        this.setOnChange(Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE)
    }
};

Blockly.Blocks['slot3'] = {
    init: function () {
        this.jsonInit({
            "type": "slot3",
            "message0": Blockly.Msg.SLOT3_TITLE,
            "colour": Blockly.Msg.SLOT_HUE,
            "tooltip": Blockly.Msg.SLOT3_TOOLTIP,
            "output": "slot"

        });
        this.setOnChange(Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE)
    }
};

Blockly.Blocks['slot4'] = {
    init: function () {
        this.jsonInit({
            "type": "slot4",
            "message0": Blockly.Msg.SLOT4_TITLE,
            "colour": Blockly.Msg.SLOT_HUE,
            "tooltip": Blockly.Msg.SLOT4_TOOLTIP,
            "output": "slot"
        });
        this.setOnChange(Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE)
    }
};

Blockly.Blocks['atrright'] = {
    init: function () {
        this.jsonInit({
            "type": "atrright",
            "message0": Blockly.Msg.ATRRIGHT_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            },{
                "type": "field_dropdown",
                "name": "OPT_ANGLE",
                "options": [
                    ["20", "20"],
                    ["30", "30"],
                    ["Custom", "ANGLE"]
                ]
            }],
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.ATRRIGHT_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "mutator": "opt_angle"
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);

    }
};
Blockly.Blocks['atrleft'] = {
    init: function () {
        this.jsonInit({
            "type": "atrleft",
            "message0": Blockly.Msg.ATRLEFT_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            },{
                "type": "field_dropdown",
                "name": "OPT_ANGLE",
                "options": [
                    ["20", "20"],
                    ["30", "30"],
                    ["Custom", "ANGLE"]
                ]
            }],
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.ATRLEFT_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true,
            "mutator": "opt_angle"
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};

Blockly.Blocks['atto'] = {
    init: function () {
        this.jsonInit({
            "type": "atto",
            "message0": Blockly.Msg.ATTO_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            }, {
                "type": "input_value",
                "name": "TO",
                "check": "eventname"
            }],
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.ATTO_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null,
            "inputsInline": true

        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};

Blockly.Blocks['fire'] = {
    init: function () {
        this.jsonInit({
            "type": "fire",
            "message0": Blockly.Msg.FIRE_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            }],
            "inputsInline": true,
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.FIRE_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};

Blockly.Blocks['launch'] = {
    init: function () {
        this.jsonInit({
            "type": "launch",
            "message0": Blockly.Msg.LAUNCH_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            }, {
                "type": "field_number",
                "name": "POWER",
                "value": 1
            }],
            "inputsInline": true,
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.LAUNCH_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};

Blockly.Blocks['mine'] = {
    init: function () {
        this.jsonInit({
            "type": "mine",
            "message0": Blockly.Msg.MINE_TITLE,
            "args0": [{
                "type": "input_value",
                "name": "SLOT",
                "check": "slot"
            }, {
                "type": "field_number",
                "name": "POWER",
                "value": 1
            }],
            "inputsInline": true,
            "colour": Blockly.Msg.SLOTACTION_HUE,
            "tooltip": Blockly.Msg.MINE_TOOLTIP,
            "previousStatement": null,
            "nextStatement": null
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};