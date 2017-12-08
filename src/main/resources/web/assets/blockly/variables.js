goog.require('Blockly');

$('body').on('INIT', function () {
    console.log("Initializing variables");
    if (Blockly.workspace_) {
        Blockly.workspace_.registerToolboxCategoryCallback(
            'TYPED_VARIABLES', function (workspace) {
                return getVariables(Blockly.workspace_);
            }
        );
    } else {
        console.log("No workspace");
    }

    //console.log("--> [TRIGGER: XML]");
    //$('body').trigger('XML');
});


/**
 * Construct the elements (blocks and button) required by the flyout for the
 * variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML elements.
 */
function getVariables(workspace) {
    var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', Blockly.Msg.NEW_VARIABLE);
    button.setAttribute('callbackKey', 'CREATE_TYPED_VARIABLE');

    workspace.registerButtonCallback('CREATE_TYPED_VARIABLE', function (button) {
        Blockly.Variables.createVariable(button.getTargetWorkspace(), function (text) {
            console.log("VARIABLE ADDED: " + text);
            Blockly.Java.addVariable(text, null);
        });
    });

    xmlList.push(button);

    var blockList = flyoutCategoryBlocks();
    xmlList = xmlList.concat(blockList);
    return xmlList;
};
/**
 * Creates a label block with given text
 * @param text label text
 * @returns {Node} label
 */
function getLabel(text) {
    var blockText = '<xml><label text="' + text + '" web-class="eventLabel"></label></xml>';
    return Blockly.Xml.textToDom(blockText).firstChild;
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
 * Construct the blocks required by the flyout for the variable category.
 * @param {!Blockly.Workspace} workspace The workspace contianing variables.
 * @return {!Array.<!Element>} Array of XML block elements.
 */
function flyoutCategoryBlocks() {
    var variableModelList = Blockly.getMainWorkspace().getAllVariables();
    variableModelList.sort(Blockly.VariableModel.compareByName);

    var xmlList = [];
    if (variableModelList.length > 0) {
        xmlList.push(getLabel("Setters"));
        for (var i = 0, variable; variable = variableModelList[i]; i++) {

            if (Blockly.Blocks['typed_variables_set']) {
                xmlList.push(getSeperator(10));
                var blockText = '<xml>' +
                    '<block type="typed_variables_set">' +
                    Blockly.Variables.generateVariableFieldXml_(variable) +
                    '</block>' +
                    '</xml>';
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                xmlList.push(block);

            }
        }
        xmlList.push(getLabel("Getters"));
        for (var i = 0, variable; variable = variableModelList[i]; i++) {

            if (Blockly.Blocks['typed_variables_get']) {
                xmlList.push(getSeperator(10));
                var blockText = '<xml>' +
                    '<block type="typed_variables_get">' +
                    Blockly.Variables.generateVariableFieldXml_(variable) +
                    '</block>' +
                    '</xml>';
                var block = Blockly.Xml.textToDom(blockText).firstChild;
                xmlList.push(block);
            }
        }
    }
    return xmlList;
};