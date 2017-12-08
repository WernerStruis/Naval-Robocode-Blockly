goog.require('Blockly');

$('body').on('API', function () {
    console.log("Dynamic toolbox loading");
    if (Blockly.workspace_) {

        Blockly.workspace_.registerToolboxCategoryCallback(
            'SLOT1', function (workspace) {
                return getXmlList(1);
            }
        );

        Blockly.workspace_.registerToolboxCategoryCallback(
            'SLOT2', function (workspace) {
                return getXmlList(2);
            }
        );

        Blockly.workspace_.registerToolboxCategoryCallback(
            'SLOT3', function (workspace) {
                return getXmlList(3);
            }
        );

        Blockly.workspace_.registerToolboxCategoryCallback(
            'SLOT4', function (workspace) {
                return getXmlList(4);
            }
        );

    } else {
        console.log("No workspace");
    }
});


/**
 * Get the list of blocks for this slot
 * @param slotIndex the slotindex
 * @returns {Array} list of blocks
 */
function getXmlList(slotIndex) {
    var slotMethods = Blockly.Java.getSlotMethods(slotIndex);
    var slotType = Blockly.Java.getSlots()[slotIndex - 1];
    var xmlList = [];

    //add the slot block to the list
    //xmlList.push(getLabel("Slot"));
    xmlList.push(getLabel("Type: " + slotType));
    xmlList.push(getSlot(slotIndex, slotType));

    if (slotMethods.Methods && slotMethods.Methods.length > 0) {
        //add all slot methods to the list
        xmlList.push(getLabel(Blockly.MSG['methods']));
        for (var i = 0; i < slotMethods.Methods.length; i++) {
            xmlList.push(getSeperator(10));
            xmlList.push(getSlotMethod(slotMethods.Methods[i], slotIndex));
        }
    }

    if (slotMethods.Values && slotMethods.Values.length > 0) {
        //add all value blocks to the list
        xmlList.push(getLabel(Blockly.MSG['getters']));
        for (var i = 0; i < slotMethods.Values.length; i++) {
            xmlList.push(getSeperator(10));
            xmlList.push(getSlotMethod(slotMethods.Values[i], slotIndex));
        }
    }


    //return the list of blocks
    return xmlList;
}

/**
 * Creates a seperator block with given gap
 * @param gap gap of this seperator
 * @returns {Node} seperator
 */
function getSeperator(gap) {
    var blockText = '<xml><sep gap="' + gap + '"></sep></xml>';
    return Blockly.Xml.textToDom(blockText).firstChild;
}

/**
 * Creates a label block with given text
 * @param text label text
 * @returns {Node} label
 */
function getLabel(text) {
    var blockText = '<xml><label text="' + text + '" web-class="eventLabel"></label></xml>';
    return Blockly.Xml.textToDom(blockText).firstChild;
}


function getSlotMethod(method, slotIndex) {
    //var slotText = "slot" + (s + 1);
    var blockType = method.type;
    var values = method.value;

    var blockText = '<xml><block type="' + blockType + '">';

    if (values) {
        for (var i = 0; i < values.length; i++) {
            blockText += '<value name="' + values[i].name + '">';

            var subType;

            if (values[i].value.shadow == true) {
                subType = "shadow";
            } else {
                subType = "block";
            }

            var type;
            if (values[i].value.type == null) {
                type = "slot" + (slotIndex);
            } else {
                type = values[i].value.type;
            }
            blockText += '<' + subType + ' type="' + type + '"></' + subType + '>';
            blockText += '</value>';
        }
    }

    blockText += '</block></xml>';


    //var blockText = '<xml>' + method + '</xml>';
    //var blockEnd = Blockly.Constants.values.METHOD_END;
    //
    //var blockText = '<xml>' + method + blockEnd + '</xml>';
    //console.log("BLOCK ADDED: " + blockText);
    var block = Blockly.Xml.textToDom(blockText).firstChild;

    return block;
}

function getSlot(i, slotType) {
    var slot = "slot" + (i);

    var blockText = '<xml><block type="' + slot + '"><data>{"data":"' + slotType + '"}</data></block></xml>';
    var block = Blockly.Xml.textToDom(blockText).firstChild;

    return block;
}