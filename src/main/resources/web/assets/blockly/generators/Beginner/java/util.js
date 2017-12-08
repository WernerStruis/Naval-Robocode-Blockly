/**
 * Defines all main blocks,
 * these are always in the workspace, and not deletable/ in the toolbox
 *
 * - Main (run)
 *
 */
'use strict';

goog.provide('Blockly.Java.util');  // Deprecated

goog.require('Blockly.Java');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.TEXTS_HUE
 * @readonly
 */
/**
 * Utilities definition
 */
Blockly.Java['angle'] = function (block) {
    return [block.getFieldValue("ANGLE"), Blockly.Java.ORDER_NONE];
};
Blockly.Java['int'] = function (block) {
    return [block.getFieldValue("NUM"), Blockly.Java.ORDER_NONE];
};
Blockly.Java['String'] = function(block) {
    // Text value.
    var code = Blockly.Java.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.Java.ORDER_NONE];
};