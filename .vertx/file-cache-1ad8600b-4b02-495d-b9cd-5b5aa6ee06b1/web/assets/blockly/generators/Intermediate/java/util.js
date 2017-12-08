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
Blockly.Java['boolean'] = function(block) {
    // Boolean values true and false.
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    return [code, Blockly.Java.ORDER_NONE];
};

Blockly.Java['arithmetic'] = function(block){
    // Basic arithmetic operators, and power.
    var OPERATORS = {
        'ADD': [' + ', Blockly.Java.ORDER_ADDITIVE],
        'MINUS': [' - ', Blockly.Java.ORDER_ADDITIVE],
        'MULTIPLY': [' * ', Blockly.Java.ORDER_MULTIPLICATIVE],
        'DIVIDE': [' / ', Blockly.Java.ORDER_MULTIPLICATIVE],
        'POWER': [' ** ', Blockly.Java.ORDER_EXPONENTIATION]
    };
    var operator = OPERATORS[block.getFieldValue('OP')][0];
    var argument0 = Blockly.Java.valueToCode(block, 'A', Blockly.Java.ORDER_NONE) || '0';
    var argument1 = Blockly.Java.valueToCode(block, 'B', Blockly.Java.ORDER_NONE) || '0';
    var code = '';
    if (operator === ' ** ') {
        Blockly.Java.addImport('java.lang.Math');
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
    } else {
        code = argument0 + operator + argument1;
    }
    return [code, Blockly.Java.ORDER_NONE];
    // In case of 'DIVIDE', division between integers returns different results
    // in Java 2 and 3. However, is not an issue since Blockly does not
    // guarantee identical results in all languages.  To do otherwise would
    // require every operator to be wrapped in a function call.  This would kill
    // legibility of the generated code.
};