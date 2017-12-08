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
            "message0": "%1",
            "args0": [{
                "type": "field_number",
                "name": "NUM",
                "value": 0
            }],
            "output": "int",
            "colour": "%{BKY_MATH_HUE}",
            "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
            "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
            "extensions": ["parent_tooltip_when_inline"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
Blockly.Blocks['String'] = {
    init: function(){
        this.jsonInit(  {
            "type": "String",
            "message0": "%1",
            "args0": [{
                "type": "field_input",
                "name": "TEXT",
                "text": ""
            }],
            "output": "String",
            "colour": "%{BKY_TEXTS_HUE}",
            "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
            "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
            "extensions": [
                "text_quotes",
                "parent_tooltip_when_inline"
            ]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
