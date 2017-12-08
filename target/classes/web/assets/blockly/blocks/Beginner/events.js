/**
 * Defines all main blocks,
 * these are always in the workspace, and not deletable/ in the toolbox
 *
 * - Main (run)
 *
 */
'use strict';

goog.provide('Blockly.Blocks.events');  // Deprecated

goog.require('Blockly.Blocks');
//goog.require('Blockly.Java.Validators');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.TEXTS_HUE
 * @readonly
 */
Blockly.Constants.Text.HUE = 160;
/**
 * Event definition
 */
Blockly.Blocks['oscanned'] = {
    init: function () {
        this.jsonInit({
            "type": "oscanned",
            "colour": Blockly.Msg.EVENT_HUE,
            "tooltip": Blockly.Msg.OSCANNED_TOOLTIP,

            "message0": Blockly.Msg.OSCANNED_TITLE,
            "message1": Blockly.Msg.MAIN_ACTION,
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INSTANCE);
    }
};
Blockly.Blocks['ohitrobot'] = {
    init: function () {
        this.jsonInit( {
            "type": "ohitrobot",
            "colour": Blockly.Msg.EVENT_HUE,
            "tooltip": Blockly.Msg.OHITROBOT_TOOLTIP,

            "message0": Blockly.Msg.OHITROBOT_TITLE,
            "message1": Blockly.Msg.MAIN_ACTION,
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INSTANCE);
    }
};
Blockly.Blocks['ohitwall'] = {
    init: function () {
        this.jsonInit({
            "type": "ohitwall",
            "colour": Blockly.Msg.EVENT_HUE,
            "tooltip": Blockly.Msg.OHITWALL_TOOLTIP,

            "message0": Blockly.Msg.OHITWALL_TITLE,
            "message1": Blockly.Msg.MAIN_ACTION,
            "args1": [{
                "type": "input_statement",
                "name": "DO"
            }]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_INSTANCE);
    }
};
//Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
//    // Block for run method
//    //{
//    //    "type": "oscanned",
//    //    "colour": Blockly.Msg.EVENT_HUE,
//    //    "tooltip": Blockly.Msg.OSCANNED_TOOLTIP,
//    //
//    //    "message0": Blockly.Msg.OSCANNED_TITLE,
//    //    "message1": Blockly.Msg.MAIN_ACTION,
//    //    "args1": [{
//    //        "type": "input_statement",
//    //        "name": "DO"
//    //    }]
//    //},
//    //{
//    //    "type": "ohitrobot",
//    //    "colour": Blockly.Msg.EVENT_HUE,
//    //    "tooltip": Blockly.Msg.OHITROBOT_TOOLTIP,
//    //
//    //    "message0": Blockly.Msg.OHITROBOT_TITLE,
//    //    "message1": Blockly.Msg.MAIN_ACTION,
//    //    "args1": [{
//    //        "type": "input_statement",
//    //        "name": "DO"
//    //    }]
//    //},
//    //{
//    //    "type": "ohitwall",
//    //    "colour": Blockly.Msg.EVENT_HUE,
//    //    "tooltip": Blockly.Msg.OHITWALL_TOOLTIP,
//    //
//    //    "message0": Blockly.Msg.OHITWALL_TITLE,
//    //    "message1": Blockly.Msg.MAIN_ACTION,
//    //    "args1": [{
//    //        "type": "input_statement",
//    //        "name": "DO"
//    //    }],
//    //}
//
//]);

/**
 * Event data
 */
Blockly.Blocks['gheading'] = {
    init: function () {
        this.jsonInit({
            "type": "gheading",
            "message0": Blockly.Msg.GHEADING_TITLE,
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GHEADING_TOOLTIP,
            "output": ["eventdata", "angle", "int"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);
    }
};

Blockly.Blocks['gbearing'] = {
    init: function () {
        this.jsonInit({
            "type": "gbearing",
            "message0": Blockly.Msg.GBEARING_TITLE,
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GBEARING_TOOLTIP,
            "output": ["eventdata", "angle", "int"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);
    }
};

Blockly.Blocks['gname'] = {
    init: function () {
        this.jsonInit({
            "type": "gname",
            "message0": Blockly.Msg.GNAME_TITLE,
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GNAME_TOOLTIP,
            "output": ["eventdata", 'eventname', "String"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);
    }
};

Blockly.Blocks['gvelocity'] = {
    init: function () {
        this.jsonInit({
            "type": "gvelocity",
            "message0": Blockly.Msg.GVELOCITY_TITLE,
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GVELOCITY_TITLE,
            "output": ["eventdata", "int"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);
    }
};

Blockly.Blocks['gdistance'] = {
    init: function () {
        this.jsonInit({
            "type": "gdistance",
            "message0": Blockly.Msg.GDISTANCE_TITLE,
            "colour": Blockly.Msg.MOVEMENT_HUE,
            "tooltip": Blockly.Msg.GDISTANCE_TOOLTIP,
            "output": ["eventdata", "int"]
        });
        this.setOnChange(Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);
    }
};