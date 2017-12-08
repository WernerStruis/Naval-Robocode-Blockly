goog.provide('Blockly.Java.Logic');
goog.require('Blockly.Java');


Blockly.Java['controls_if'] = function(block) {
    // If/elseif/else condition.
    var n = 0;
    var code = '', branchCode, conditionCode;
    do {
        conditionCode = Blockly.Java.valueToCode(block, 'IF' + n,
                Blockly.Java.ORDER_NONE) || 'false';
        branchCode = Blockly.Java.statementToCode(block, 'DO' + n);
        code += (n > 0 ? ' else ' : '') +
            'if (' + conditionCode + ') {\n' + branchCode + '}';

        ++n;
    } while (block.getInput('IF' + n));

    if (block.getInput('ELSE')) {
        branchCode = Blockly.Java.statementToCode(block, 'ELSE');
        code += ' else {\n' + branchCode + '}';
    }
    return code + '\n';
};
Blockly.Java['controls_whileUntil'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.Java.valueToCode(block, 'BOOL', Blockly.Java.ORDER_NONE) || 'false';
    var branch = Blockly.Java.statementToCode(block, 'DO');
    branch = Blockly.Java.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};
Blockly.Java['controls_for'] = function(block) {
    // For loop.
    var variable0 = Blockly.Java.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var argument0 = Blockly.Java.valueToCode(block, 'FROM',
            Blockly.Java.ORDER_NONE) || '0';
    var argument1 = Blockly.Java.valueToCode(block, 'TO',
            Blockly.Java.ORDER_NONE) || '0';
    var increment = Blockly.Java.valueToCode(block, 'BY',
            Blockly.Java.ORDER_NONE) || '1';
    var branch = Blockly.Java.statementToCode(block, 'DO');
    branch = Blockly.Java.addLoopTrap(branch, block.id);
    var code;
    if (Blockly.isNumber(argument0) && Blockly.isNumber(argument1) &&
        Blockly.isNumber(increment)) {
        // All arguments are simple numbers.
        var up = parseFloat(argument0) <= parseFloat(argument1);
        code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
            variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
            variable0;
        var step = Math.abs(parseFloat(increment));
        if (step == 1) {
            code += up ? '++' : '--';
        } else {
            code += (up ? ' += ' : ' -= ') + step;
        }
        code += ') {\n' + branch + '}\n';
    } else {
        code = '';
        // Cache non-trivial values to variables to prevent repeated look-ups.
        var startVar = argument0;
        if (!argument0.match(/^\w+$/) && !Blockly.isNumber(argument0)) {
            startVar = Blockly.Java.variableDB_.getDistinctName(
                variable0 + '_start', Blockly.Variables.NAME_TYPE);
            code += 'var ' + startVar + ' = ' + argument0 + ';\n';
        }
        var endVar = argument1;
        if (!argument1.match(/^\w+$/) && !Blockly.isNumber(argument1)) {
            var endVar = Blockly.Java.variableDB_.getDistinctName(
                variable0 + '_end', Blockly.Variables.NAME_TYPE);
            code += 'var ' + endVar + ' = ' + argument1 + ';\n';
        }
        // Determine loop direction at start, in case one of the bounds
        // changes during loop execution.
        var incVar = Blockly.Java.variableDB_.getDistinctName(
            variable0 + '_inc', Blockly.Variables.NAME_TYPE);
        code += 'var ' + incVar + ' = ';
        if (Blockly.isNumber(increment)) {
            code += Math.abs(increment) + ';\n';
        } else {
            code += 'Math.abs(' + increment + ');\n';
        }
        code += 'if (' + startVar + ' > ' + endVar + ') {\n';
        code += Blockly.Java.INDENT + incVar + ' = -' + incVar + ';\n';
        code += '}\n';
        code += 'for (' + variable0 + ' = ' + startVar + '; ' +
            incVar + ' >= 0 ? ' +
            variable0 + ' <= ' + endVar + ' : ' +
            variable0 + ' >= ' + endVar + '; ' +
            variable0 + ' += ' + incVar + ') {\n' +
            branch + '}\n';
    }
    return code;
};





Blockly.Java['compare'] = function(block) {
    // Comparison operator.
    var OPERATORS = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'LTE': '<=',
        'GT': '>',
        'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var order = Blockly.Java.ORDER_NONE;
    var argument0 = Blockly.Java.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.Java.valueToCode(block, 'B', order) || '0';
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};

Blockly.Java['operation'] = function(block) {
    // Operations 'and', 'or'.
    var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
    var order = Blockly.Java.ORDER_NONE;
    var argument0 = Blockly.Java.valueToCode(block, 'A', order);
    var argument1 = Blockly.Java.valueToCode(block, 'B', order);
    if (!argument0 && !argument1) {
        // If there are no arguments, then the return value is false.
        argument0 = 'false';
        argument1 = 'false';
    } else {
        // Single missing arguments have no effect on the return value.
        var defaultArgument = (operator == '&&') ? 'true' : 'false';
        if (!argument0) {
            argument0 = defaultArgument;
        }
        if (!argument1) {
            argument1 = defaultArgument;
        }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return [code, order];
};
