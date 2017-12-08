goog.provide('Blockly.Java.Mutators');
goog.provide('Blockly.Constants.Mutators');


Blockly.Constants.Mutators.OPT_ANGLE = function() {
    this.getField('OPT_ANGLE').setValidator(function(option) {
        var checked = (option == "ANGLE");
        this.sourceBlock_.updateShape_(checked);
    });
};

Blockly.Constants.Mutators.OPT_ANGLE_MIXIN = {
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var divisorInput = (this.getFieldValue('OPT_ANGLE') == 'ANGLE');
        container.setAttribute('input', divisorInput);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var divisorInput = (xmlElement.getAttribute('input') == 'true');
        this.updateShape_(divisorInput);
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function(divisorInput) {
        // Add or remove a Value Input.
        var inputExists = this.getInput('ANGLE');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('ANGLE')
                    .setCheck(['angle', 'int']);
            }
        } else if (inputExists) {
            this.removeInput('ANGLE');
        }
    }
};

Blockly.Extensions.registerMutator('opt_angle',
    Blockly.Constants.Mutators.OPT_ANGLE_MIXIN,
    Blockly.Constants.Mutators.OPT_ANGLE);