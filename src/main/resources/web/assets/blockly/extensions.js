goog.provide('Blockly.Java.extensions');
goog.provide('Blockly.Constants.extensions');
Blockly.Extensions.register("op_tooltip", Blockly.Extensions.buildTooltipForDropdown("OP", Blockly.Msg.TOOLTIPS_BY_OP));

Blockly.Extensions.buildTooltipForDropdown = function(dropdownName, lookupTable) {
    // List of block types already validated, to minimize duplicate warnings.
    var blockTypesChecked = [];

    // Check the tooltip string messages for invalid references.
    // Wait for load, in case Blockly.Msg is not yet populated.
    // runAfterPageLoad() does not run in a Node.js environment due to lack of
    // document object, in which case skip the validation.
    if (document) { // Relies on document.readyState
        Blockly.utils.runAfterPageLoad(function() {
            for (var key in lookupTable) {
                // Will print warnings is reference is missing.
                Blockly.utils.checkMessageReferences(lookupTable[key]);
            }
        });
    }

    /**
     * The actual extension.
     * @this {Blockly.Block}
     */
    var extensionFn = function() {
        if (this.type && blockTypesChecked.indexOf(this.type) === -1) {
            Blockly.Extensions.checkDropdownOptionsInTable_(
                this, dropdownName, lookupTable);
            blockTypesChecked.push(this.type);
        }

        this.setTooltip(function() {
            var value = this.getFieldValue(dropdownName);
            var tooltip = lookupTable[value];
            if (tooltip == null) {
                if (blockTypesChecked.indexOf(this.type) === -1) {
                    // Warn for missing values on generated tooltips
                    var warning = 'No tooltip mapping for value ' + value +
                        ' of field ' + dropdownName;
                    if (this.type != null) {
                        warning += (' of block type ' + this.type);
                    }
                    console.warn(warning + '.');
                }
            } else {
                tooltip = Blockly.utils.replaceMessageReferences(tooltip);
            }
            return tooltip;
        }.bind(this));
    };
    return extensionFn;
};