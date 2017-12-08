goog.require('Blockly');

var blockPath = "assets/blockly/blocks/";
var generatorPath = "assets/blockly/generators/";

$('body').on('READY', function () {
    loadScripts();
});

/**
 * Beginner
 */
//beginner block definitions
var beginnerBlocks = [
    "main.js",
    "movement.js",
    "slots.js",
    "events.js",
    "util.js",
    "logic.js"
];
//beginner block generators
var beginnerGenerators = [
    "main.js",
    "movement.js",
    "slots.js",
    "events.js",
    "util.js",
    "logic.js"
];

/**
 * Intermediate
 */
//intermediate block definitions
var intermediateBlocks = [
    "main.js",
    "movement.js",
    "slots.js",
    "events.js",
    "util.js",
    "variables.js",
    "logic.js"
];
//intermediate block generators
var intermediateGenerators = [
    "main.js",
    "movement.js",
    "slots.js",
    "events.js",
    "util.js",
    "logic.js",
    "variables.js"
];

function loadScripts(){
    console.log('Loading scripts for API level: ' + Blockly.Java.getAPILevel());
    var API = Blockly.Java.getAPILevel();
    var definitions = (API == "Beginner")? beginnerBlocks : intermediateBlocks;
    var generators =  (API == "Beginner")? beginnerGenerators : intermediateGenerators;

    //load definitions
    for(var i = 0; i < definitions.length; i++){
        var script = document.createElement('script');
        script.src = blockPath + API + "/" + definitions[i];
        //console.log(script.src);
        document.head.appendChild(script);
    }

    //load generators
    for(var i = 0; i < generators.length; i++){
        var script = document.createElement('script');
        script.src = generatorPath + API + "/java/" + generators[i];
        //console.log(script.src);
        document.head.appendChild(script);
    }

    console.log("--> [TRIGGER: API]");
    $('body').trigger('API');
}

