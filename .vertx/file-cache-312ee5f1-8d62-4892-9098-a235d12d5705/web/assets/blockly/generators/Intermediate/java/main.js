goog.provide('Blockly.Java.Main');
goog.require('Blockly.Java');

Blockly.Java['main'] = function (block) {
    var init = Blockly.Java.statementToCode(block, 'INIT');
    var branch = Blockly.Java.statementToCode(block, 'DO');

    return "public void run(){\n" +
            Blockly.Java.prefixLines("super.run();\n", Blockly.Java.INDENT) +
            //Blockly.Java.prefixLines(init, Blockly.Java.INDENT) +
            init +
            Blockly.Java.prefixLines("\nwhile(true){\n", Blockly.Java.INDENT) +
            Blockly.Java.prefixLines(branch, Blockly.Java.INDENT) +
            Blockly.Java.prefixLines("}\n", Blockly.Java.INDENT) +
            "}\n";
};

Blockly.Java['exec'] = function (block) {
    var code = "execute();\n";
    return code;
};

