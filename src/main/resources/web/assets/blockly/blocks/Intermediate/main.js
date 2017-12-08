/**
 * Defines all main blocks,
 * these are always in the workspace, and not deletable/ in the toolbox
 *
 * - Main (run)
 *
 */
//'use strict';

goog.provide('Blockly.Blocks.main');  // Deprecated
goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.TEXTS_HUE
 * @readonly
 */
Blockly.Constants.Text.HUE = 160;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    //// Block for run method
    //{
    //    "type": "main",
    //    "colour": Blockly.Msg.MAIN_HUE,
    //    "tooltip": Blockly.Msg.MAIN_TOOLTIP,
    //
    //    "message0": Blockly.Msg.MAIN_TITLE,
    //    "message1": Blockly.Msg.MAIN_ACTION,
    //    "args1": [{
    //        "type": "input_statement",
    //        "name": "DO"
    //    }]
    //}

]);

Blockly.Blocks['main'] = {
    init: function(){
        this.jsonInit(  {
            "type": "main",
            "colour": Blockly.Msg.MAIN_HUE,
            "tooltip": Blockly.Msg.MAIN_TOOLTIP,

            "message0": Blockly.Msg.MAIN_TITLE,
            "message1": Blockly.Msg.MAIN_INIT,
            "args1": [{
                "type": "input_statement",
                "name": "INIT"
            }],
            "message2": Blockly.Msg.MAIN_ACTION,
            "args2": [{
                "type": "input_statement",
                "name": "DO"
            }]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INSTANCE);
    }
};

Blockly.Blocks['exec'] = {
    init: function(){
        this.jsonInit( {
            "type": "exec",
            "message0": Blockly.Msg.EXEC_TITLE,
            "colour": Blockly.Msg.MAIN_HUE,
            "tooltip": Blockly.Msg.EXEC_TOOLTIP,
            "previousStatement": true,
            "nextStatement": true
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INLINE_EXTENSION)
    }
};


