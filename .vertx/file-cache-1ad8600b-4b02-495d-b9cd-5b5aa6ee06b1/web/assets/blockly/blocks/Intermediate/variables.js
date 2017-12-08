/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.

 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.typedVariables');  // Deprecated.
goog.provide('Blockly.Constants.typedVariables');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.VARIABLES_HUE.
 * @readonly
 */
Blockly.Constants.Variables.HUE = 330;
/** @deprecated Use Blockly.Constants.Variables.HUE */
Blockly.Blocks.variables.HUE = Blockly.Constants.Variables.HUE;
Blockly.Blocks['typed_variables_get'] = {
    init: function () {
        this.jsonInit({
            "type": "typed_variables_get",
            "message0": "%1",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
                }
            ],
            "output": true,
            "colour":  Blockly.Msg.VARIABLE_HUE,
            "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
            "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
            "extensions": ["contextMenu_variableSetterGetter"]
        });
        this.setOnChange(Blockly.Constants.Validators.VARIABLE_TYPE_GET)
    }
};
Blockly.Blocks['typed_variables_set'] = {
    init: function () {
        this.jsonInit({
            "type": "typed_variables_set",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
                {
                    "type": "field_variable",
                    "name": "VAR",
                    //"variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
                },
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": ['int', 'String', 'boolean', 'arithmetic']
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Blockly.Msg.VARIABLE_HUE,
            "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
            "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
            "extensions": ["contextMenu_variableSetterGetter"]
        });
        this.setOnChange(Blockly.Constants.Validators.VARIABLE_TYPE_SET)
    }
};
