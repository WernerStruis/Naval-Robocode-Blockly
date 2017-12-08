/**
 * Defines all main blocks,
 * these are always in the workspace, and not deletable/ in the toolbox
 *
 * - Main (run)
 *
 */
'use strict';

goog.provide('Blockly.Blocks.Logic');  // Deprecated

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
Blockly.Blocks['compare'] = {
    init: function () {
        this.jsonInit({
            "type": "compare",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "A"
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["=", "EQ"],
                        ["\u2260", "NEQ"],
                        ["<", "LT"],
                        ["\u2264", "LTE"],
                        [">", "GT"],
                        ["\u2265", "GTE"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B"
                }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "colour": "%{BKY_LOGIC_HUE}",
            "helpUrl": "%{BKY_LOGIC_COMPARE_HELPURL}"
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
Blockly.Blocks['operation'] = {
    init: function(){
        this.jsonInit(  {
            "type": "operation",
            "message0": "%1 %2 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "A",
                    "check": "Boolean"
                },
                {
                    "type": "field_dropdown",
                    "name": "OP",
                    "options": [
                        ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
                        ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "B",
                    "check": "Boolean"
                }
            ],
            "inputsInline": true,
            "output": "Boolean",
            "colour": "%{BKY_LOGIC_HUE}",
            "helpUrl": "%{BKY_LOGIC_OPERATION_HELPURL}"
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);
    }
};
