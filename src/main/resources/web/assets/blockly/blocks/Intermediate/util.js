/**
 * Defines all main blocks,
 * these are always in the workspace, and not deletable/ in the toolbox
 *
 * - Main (run)
 *
 */
'use strict';

goog.provide('Blockly.Blocks.util');  // Deprecated

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.TEXTS_HUE
 * @readonly
 */
/**
 * Utilities definition
 */
Blockly.Blocks['angle'] = {
    init: function () {
        this.jsonInit({
                "type": "angle",
                "message0": Blockly.Msg.UTIL_ANGLE_TITLE,
                "tooltip": Blockly.Msg.UTIL_ANGLE_TOOLTIP,
                "colour": Blockly.Msg.UTIL_HUE,
                "args0": [
                    {
                        "type": "field_angle",
                        "name": "ANGLE",
                        "angle": "0"
                    }
                ],
                "output": ["angle", "int"]
            }
        );
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
Blockly.Blocks['int'] = {
    init: function(){
        this.jsonInit( {
            "type": "int",
            "message0": Blockly.Msg.UTIL_INT_TITLE,
            "args0": [{
                "type": "field_number",
                "name": "NUM",
                "value": 0
            }],
            "output": "int",
            "colour":  Blockly.Msg.NUMBER_HUE,
            "tooltip": Blockly.Msg.UTIL_INT_TOOLTIP,
            "extensions": ["parent_tooltip_when_inline"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
Blockly.Blocks['boolean'] = {
    init: function(){
        this.jsonInit( {
            "type": "boolean",
            "message0": Blockly.Msg.UTIL_BOOLEAN_TITLE,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "BOOL",
                    "options": [
                        ["true", "TRUE"],
                        ["false", "FALSE"]
                    ]
                }
            ],
            "output": "boolean",
            "colour": Blockly.Msg.BOOLEAN_HUE,
            "tooltip": Blockly.Msg.UTIL_BOOLEAN_TOOLTIP
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};

Blockly.Blocks['String'] = {
    init: function(){
        this.jsonInit(  {
            "type": "String",
            "message0": Blockly.Msg.UTIL_STRING_TITLE,
            "args0": [{
                "type": "field_input",
                "name": "TEXT",
                "text": ""
            }],
            "output": "String",
            "colour": Blockly.Msg.STRING_HUE,
            "tooltip":Blockly.Msg.UTIL_STRING_TOOLTIP,
            "extensions": [
                "text_quotes",
                "parent_tooltip_when_inline"
            ]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};

Blockly.Blocks['arithmetic'] = {
    init: function(){
        this.jsonInit({
            "type": "arithmetic",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "A",
                    "check": ["int",true]
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["+", "ADD"],
                        ["-", "MINUS"],
                        ["*", "MULTIPLY"],
                        ["÷", "DIVIDE"],
                        ["^", "POWER"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B",
                    "check": ["int",true]
                }
            ],
            "inputsInline": true,
            "output": "int",
            "colour": Blockly.Msg.UTIL_HUE
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
