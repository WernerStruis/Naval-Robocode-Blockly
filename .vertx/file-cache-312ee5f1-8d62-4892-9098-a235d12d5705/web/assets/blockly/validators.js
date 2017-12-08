goog.provide('Blockly.Java.Validators');
goog.provide('Blockly.Constants.Validators');
'use strict';

//goog.require('Blockly.Java.Arrays');

Blockly.Constants.Validators.ONLY_INLINE_EXTENSION = function () {
    checkIfInline(this);
};
Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE = function () {
    checkIfInline(this);
    checkIfEvent(this);
};
Blockly.Constants.Validators.NOT_EMPTY = function () {
    checkIfNotEmpty(this);
};
Blockly.Constants.Validators.ONLY_INSTANCE = function () {
    checkIfOnlyInstance(this, 0);
};
Blockly.Constants.Validators.VARIABLE_TYPE_SET = function () {
    checkIfInline(this);
    updateVariableType(this);
    setVariableColor(this);
    setInputCkeck(this);
};
Blockly.Constants.Validators.VARIABLE_TYPE_GET = function () {
    //updateVariableType(this);
    checkIfInline(this);
    setVariableColor(this);
    setVariableOutput(this);
};
Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE = function () {
    checkIfInline(this);
    checkRightSlotActionType(this);
};

function updateVariableType(block) {
    if (!block.isInFlyout) {

        var variable = block.getFieldValue('VAR');
        var value = block.getInputTargetBlock('VALUE');
        var vartype = Blockly.Java.getVariable(variable);

        if (value) {
            Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.UNITIALIZED_VARIABLE);
            block.setWarningText(Blockly.Constants.Arrays.getNextError(block));

            if(!vartype){
                Blockly.Java.addVariable(variable, null);
                vartype = Blockly.Java.getVariable(variable);
            }
            if (vartype.type == null) {
                if(goog.array.contains(['String', 'int', 'boolean'], value.type)){
                    Blockly.Java.setVariableType(variable, value.type);
                }else{
                    console.log("Trying to set Illegal variable type: " + value.type + " - " + value);
                    if(value.type == "typed_variables_get" && Blockly.Java.getVariable(value).type != null){
                        Blockly.Java.setVariableType(variable, Blockly.Java.getVariable(value).type);
                    }else if(value.type == "arithmetic"){
                        Blockly.Java.setVariableType(variable, 'int');
                    }else{
                        block.getInputTargetBlock('VALUE').unplug();
                    }
                }
            } else {
                checkVariableType(block, vartype, value);
            }
        }else if(!vartype || !vartype.type){
            Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.UNITIALIZED_VARIABLE);
            block.setWarningText(Blockly.Msg.UNITIALIZED_VARIABLE);
        }
    }
}
function setInputCkeck(block){
    var variable = block.getFieldValue('VAR');
    var vartype = Blockly.Java.getVariable(variable);
    block.getInput('VALUE').setCheck(vartype.type);
}
function setVariableColor(block) {
    //if (!block.isInFlyout) {

        var variable = block.getFieldValue('VAR');
        var vartype = Blockly.Java.getVariable(variable);
        var hue;
        if (vartype) {
            switch (vartype.type) {
                case "String":
                    hue = Blockly.Msg.STRING_HUE;
                    break;
                case "int":
                    hue = Blockly.Msg.NUMBER_HUE;
                    break;
                case "boolean":
                    hue = Blockly.Msg.BOOLEAN_HUE;
                    break;
                default:
                    hue = Blockly.Msg.VARIABLE_HUE;
                    break;
            }
            block.setColour(hue);
        }else{
            block.setColour(Blockly.Msg.VARIABLE_HUE);
        }
    //}
}

function setVariableOutput (block){
    var variable = block.getFieldValue('VAR');
    var vartype = Blockly.Java.getVariable(variable);
    var hue;
    if (vartype && vartype.type) {
        block.setDisabled(false);
        block.setOutput(vartype.type);
    }else{
        block.setOutput(false);
        block.setDisabled(true);
    }
}

function checkVariableType(block, myType, input) {
    block.setTooltip(Blockly.Msg.VARIABLE_TOOLTIP_TYPE + myType.type);
    if (input.type == myType.type) {
        Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.INVALID_VARIABLE_TYPE);
        block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
    } else {
        if(input.type == "typed_variables_get" && Blockly.Java.getVariable(input).type != null){
            if(myType.type == Blockly.Java.getVariable(input).type){
                Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.INVALID_VARIABLE_TYPE);
                block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
            }
        }else if(input.type == "arithmetic"){
            if(myType.type == "int"){
                Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.INVALID_VARIABLE_TYPE);
                block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
            }
        }else{
            Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.INVALID_VARIABLE_TYPE);
            block.setWarningText(Blockly.Msg.INVALID_VARIABLE_TYPE + "Expected: " + myType.type + " - Actual: " + input.type);
        }

    }
}


function checkIfInline(block) {
    if (block.getParent() == null) {
        //block.data = Blockly.Msg.ONLY_TOPLEVEL_MSG;
        Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.ONLY_TOPLEVEL_MSG);
        block.setWarningText(Blockly.Msg.ONLY_TOPLEVEL_MSG);
    } else {
        Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.ONLY_TOPLEVEL_MSG);
        block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
    }

}

function checkIfOnlyInstance(block, i) {
    var duplicate = false;

    if (block.isInFlyout) {
        console.log("b");
        //var topBlocks = Blockly.getMainWorkspace().getTopBlocks();
        Blockly.getMainWorkspace().getTopBlocks().forEach(function (entry) {
            if (entry.type == block.type) {
                duplicate = true;
            }
        });
        block.setDisabled(duplicate);
    }
}

function checkIfNotEmpty(block) {
    if (block.inputList.length < block.getChildren().length) {
        block.setWarningText(Blockly.Msg.NOT_EMPTY_MSG);
        block.data = Blockly.Msg.NOT_EMPTY_MSG;
    } else {
        block.setWarningText(null);

        if (block.data != null) {
            block.data = null;
        }
    }
}

/**
 *
 * @param block The component action block
 */
function checkRightSlotActionType(block) {
    if (!block.isInFlyout && block.getParent() != null) {
        var slotType = block.type;
        var index = slotType.charAt(slotType.length - 1);
        var slotComponentType = Blockly.Java.getSlots()[index - 1];
        var actionType = block.getParent().type;
        var allowedComponentTypes = getAllowedComponentTypes(actionType);

        //console.log("[SLOT: " + slotType + " TYPE: " + slotComponentType + "] [ACTIONTYPE: " + actionType + "]");
        if (!goog.array.contains(allowedComponentTypes, slotComponentType)) {
            Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.INVALID_SLOT_TYPE);
            block.setWarningText(Blockly.Msg.INVALID_SLOT_TYPE);
        } else {
            Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.INVALID_SLOT_TYPE);
            block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
        }
    }
}


function getAllowedComponentTypes(type) {
    switch (type) {
        case "launch":
            return Blockly.Constants.values.SLOTACTION_MAP.launch;
        case "fire":
            return Blockly.Constants.values.SLOTACTION_MAP.fire;
        case "mine":
            return Blockly.Constants.values.SLOTACTION_MAP.mine;
        case "atrright":
            return Blockly.Constants.values.SLOTACTION_MAP.atrright;
        case "atrleft":
            return Blockly.Constants.values.SLOTACTION_MAP.atrleft;
        case "atto":
            return Blockly.Constants.values.SLOTACTION_MAP.atto;
        case "atblindspot":
            return Blockly.Constants.values.SLOTACTION_MAP.atblindspot;
        case "atgunheat":
            return Blockly.Constants.values.SLOTACTION_MAP.atgunheat;
        case "atheading":
            return Blockly.Constants.values.SLOTACTION_MAP.atheading;
        case "atturnremaining":
            return Blockly.Constants.values.SLOTACTION_MAP.atturnremaining;
        default :
            alert("NO MAP FOUND FOR TYPE " + type);
            break;
    }
}


function checkIfEvent(block) {
    var inEvent = true;
    var rightEvent = true;
    var allowedMethods = [];
    if (block.getRootBlock() != null) {
        switch (block.getRootBlock().type) {
            case "ohitrobot":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.ohitrobot;
                break;
            case "ohitwall":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.ohitwall;
                break;
            case "oscanned":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.oscanned;
                break;
            case "ohitbybullet":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.ohitbybullet;
                break;
            case "ohitbymissile":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.ohitbymissile;
                break;
            case "oscannedmissile":
                allowedMethods = Blockly.Constants.values.EVENT_MAP.oscannedmissile;
                break;
            default :
                inEvent = false;
                allowedMethods = null;
                break;
        }

        if (allowedMethods) {
            if (!goog.array.contains(allowedMethods, block.type)) {
                rightEvent = false;
            }
        } else {
            inEvent = false;
        }
    }

    if (!inEvent) {
        Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.ONLY_EVENT_MSG);
        block.setWarningText(Blockly.Msg.ONLY_EVENT_MSG);
    } else {
        Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.ONLY_EVENT_MSG);
        block.setWarningText(Blockly.Constants.Arrays.getNextError(block));

        if (!rightEvent) {
            Blockly.Constants.Arrays.appendErrorToData(block, Blockly.Msg.INVALID_EVENT_METHOD);
            block.setWarningText(Blockly.Msg.INVALID_EVENT_METHOD);
        } else {
            Blockly.Constants.Arrays.removeErrorFromData(block, Blockly.Msg.INVALID_EVENT_METHOD);
            block.setWarningText(Blockly.Constants.Arrays.getNextError(block));
        }
    }
}


Blockly.Extensions.register('not_empty',
    Blockly.Constants.Validators.NOT_EMPTY);

Blockly.Extensions.register('only_instance',
    Blockly.Constants.Validators.ONLY_INSTANCE);

Blockly.Extensions.register('only_inline',
    Blockly.Constants.Validators.ONLY_INLINE_EXTENSION);

Blockly.Extensions.register('event_and_inline',
    Blockly.Constants.Validators.ONLY_EVENT_AND_INLINE);

Blockly.Extensions.register('inline_and_right_slot_type',
    Blockly.Constants.Validators.INLINE_AND_RIGHT_SLOT_TYPE);

Blockly.Extensions.register('update_variable_type',
    Blockly.Constants.Validators.VARIABLE_TYPE_SET);