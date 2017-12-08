goog.require('Blockly');
goog.provide('Blockly.blockly');

Blockly.blockly = {};

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Blockly.blockly.LANGUAGE_NAME = {
    'en': 'English',
    'nl': 'Nederlands'
};

Blockly.blockly.BASE_URL = "http://localhost:8080";

/**
 * List of RTL languages.
 */
Blockly.blockly.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.blockly.WorkspaceSvg}
 */
Blockly.workspace_ = null;


/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Blockly.blockly.getLang = function() {
    var lang = Blockly.blockly.getStringParamFromUrl('lang', '');
    if (Blockly.blockly.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};


/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Blockly.blockly.getStringParamFromUrl = function(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};



// Load Blockly's language strings.
//document.write('<script src="../lib/google-blockly-2fae551/msg/js/' + Blockly.blockly.LANG + '.js"></script>\n');

/**
 * Save the blocks and reload with a different language.
 */
Blockly.blockly.changeLanguage = function() {
    // Store the blocks for the duration of the reload.
    // This should be skipped for the index page, which has no blocks and does
    // not load Blockly.blockly.
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (typeof Blockly != 'undefined' && window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.workspace_);
        var text = Blockly.Xml.domToText(xml);
        window.sessionStorage.loadOnceBlocks = text;
    }

    var languageMenu = document.getElementById('languageMenu');
    var newLang = encodeURIComponent(
        languageMenu.options[languageMenu.selectedIndex].value);
    var search = window.location.search;
    if (search.length <= 1) {
        search = '?lang=' + newLang;
    } else if (search.match(/[?&]lang=[^&]*/)) {
        search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
    } else {
        search = search.replace(/\?/, '?lang=' + newLang + '&');
    }

    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname + search;
};

///**
// * Bind a function to a button's click event.
// * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
// * @param {!Element|string} el Button element or ID thereof.
// * @param {!Function} func Event handler to bind.
// */
//Blockly.blockly.bindClick = function(el, func) {
//    if (typeof el == 'string') {
//        el = document.getElementById(el);
//    }
//    el.addEventListener('click', func, true);
//    el.addEventListener('touchend', func, true);
//};

///**
// * Load the Prettify CSS and JavaScript.
// */
//Blockly.blockly.importPrettify = function() {
//    var script = document.createElement('script');
//    script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
//    document.head.appendChild(script);
//};

///**
// * Compute the absolute coordinates and dimensions of an HTML element.
// * @param {!Element} element Element to match.
// * @return {!Object} Contains height, width, x, and y properties.
// * @private
// */
//Blockly.blockly.getBBox_ = function(element) {
//    var height = element.offsetHeight;
//    var width = element.offsetWidth;
//    var x = 0;
//    var y = 0;
//    do {
//        x += element.offsetLeft;
//        y += element.offsetTop;
//        element = element.offsetParent;
//    } while (element);
//    return {
//        height: height,
//        width: width,
//        x: x,
//        y: y
//    };
//};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Blockly.blockly.LANG = Blockly.blockly.getLang();

/**
 * Initialize Blockly.blockly.  Called on page load.
 */
$('body').on('API', function () {
    Blockly.blockly.initLanguage();

    // The toolbox XML specifies each category name using Blockly's messaging
    // format (eg. `<category name="%{BKY_CATLOGIC}">`).
    // These message keys need to be defined in `Blockly.blockly.Msg` in order to
    // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
    // been defined for each language to import each category name message
    // into `Blockly.blockly.Msg`.
    // TODO: Clean up the message files so this is done explicitly instead of
    // through this for-loop.
    for (var messageKey in MSG) {
        if (messageKey.indexOf('cat') == 0) {
            Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
        }
    }


    // Construct the toolbox XML, replacing translated variable names.
    var toolboxText;

    if(Blockly.Java.getAPILevel() == "Beginner"){
        toolboxText = document.getElementById('toolbox-beginner').outerHTML;
    }else{
        toolboxText = document.getElementById('toolbox-intermediate').outerHTML;
    }
    toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
        function(m, p1, p2) {return p1 + MSG[p2];});

    var toolboxXml = Blockly.Xml.textToDom(toolboxText);

    console.log("Injecting Blockly..");
    Blockly.workspace_ = Blockly.inject('blocklyDiv',
        {grid:
        {spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true},
            media: 'lib/google-blockly-2fae551/media/',
            toolbox: toolboxXml,
            zoom:
            {controls: true,
                wheel: true}
        });

    // Add to reserved word list: Local variables in execution environment (runJS)
    // and the infinite loop detection function.
    Blockly.Java.addReservedWords('code,timeouts,checkTimeout');
    Blockly.Flyout.prototype.autoClose = false;

    // Lazy-load the syntax-highlighting.
    window.setTimeout(Blockly.blockly.importPrettify, 1);

    $('.blocklyTreeRoot').before("<img src='assets/images/Thales_logo.png'>");

    Blockly.workspace_.addChangeListener(inPlaceToolbox());
    $('body').trigger('INIT');
});

/**
 * Initialize the page language.
 */
Blockly.blockly.initLanguage = function() {
    // Set the HTML's language and direction.
    document.head.parentElement.setAttribute('lang', Blockly.blockly.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in Blockly.blockly.LANGUAGE_NAME) {
        languages.push([Blockly.blockly.LANGUAGE_NAME[lang], lang]);
    }
    var comp = function(a, b) {
        // Sort based on first argument ('English', 'Русский', '简体字', etc).
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
    };
    languages.sort(comp);
    // Populate the language selection menu.
    var languageMenu = document.getElementById('languageMenu');
    languageMenu.options.length = 0;
    for (var i = 0; i < languages.length; i++) {
        var tuple = languages[i];
        var lang = tuple[tuple.length - 1];
        var option = new Option(tuple[0], lang);
        if (lang == Blockly.blockly.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', Blockly.blockly.changeLanguage, true);

    // Inject language strings.
    document.title += ' ' + MSG['title'];


    var methodlabels = document.getElementsByClassName('methods');
    for (index = 0; index < methodlabels.length; ++index) {
        methodlabels[index].setAttribute('text', MSG['methods']);
    }

    initLanguage();
};

///**
// * Execute the user's Blockly.blockly.
// * Just a quick and dirty eval.  Catch infinite loops.
// */
//Blockly.blockly.runJS = function() {
//    Blockly.blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
//    var timeouts = 0;
//    var checkTimeout = function() {
//        if (timeouts++ > 1000000) {
//            throw MSG['timeout'];
//        }
//    };
//    var code = Blockly.Java.workspaceToCode(Blockly.workspace_);
//    Blockly.blockly.JavaScript.INFINITE_LOOP_TRAP = null;
//    try {
//        eval(code);
//    } catch (e) {
//        alert(MSG['badCode'].replace('%1', e));
//    }
//};

///**
// * Discard all blocks from the workspace.
// */
//Blockly.blockly.discard = function() {
//    var count = Blockly.workspace_.getAllBlocks().length;
//    if (count < 2 ||
//        window.confirm(Blockly.blockly.Msg.DELETE_ALL_BLOCKS.replace('%1', count))) {
//        Blockly.workspace_.clear();
//        if (window.location.hash) {
//            window.location.hash = '';
//        }
//    }
//};

// Load the Code demo's language strings.
document.write('<script src="assets/blockly/msg/js/' + Blockly.blockly.LANG + '.js"></script>\n');


// Load Blockly's language strings.
document.write('<script src="lib/google-blockly-2fae551/msg/js/' + Blockly.blockly.LANG + '.js"></script>\n');
//
//$('body').on('API', function () {
//    Blockly.blockly.init();
//});
//window.addEventListener('load', Code.init);


/**c
 *
 *
 */

$(document).ready(function () {
    console.log("Setting config info");

    var shipConfig = JSON.parse(localStorage.getItem('SHIPCONFIG'));

    if(shipConfig) {
        Blockly.Java.setAPILevel(shipConfig.API);
        Blockly.Java.setBaseClass(shipConfig.type);
        Blockly.Java.setShipName(shipConfig.name);
        Blockly.Java.setPackage(shipConfig.package);

        var components = shipConfig.componentConfig;
        components.forEach(function(component){
            //console.log(component);
            Blockly.Java.addSlot(component);
        });
        //Blockly.Java.addSlot("DoubleBarrelCannon");
        //Blockly.Java.addSlot("LongRangeRadar");

        $('body').trigger('READY');
    }else{
        window.location.replace('index.html?lang=' + getLang());
    }
});

$('body').on('API', function () {
    console.log('hiding slots');
    /** This removes slots from the toolbox
     $('#slot1').remove();
     Blockly.workspace_.updateToolbox(document.getElementById('toolbox'));
     */

    hideSlots();
});

function hideSlots() {
    //console.log(Blockly.Java.getSlots());
    for (var i = 4; i > Blockly.Java.getSlots().length; i--) {
        $('.slot' + i).remove();
    }

    if (Blockly.Java.getAPILevel() == "Beginner") {
        Blockly.workspace_.updateToolbox(document.getElementById('toolbox-beginner'));
    } else {
        Blockly.workspace_.updateToolbox(document.getElementById('toolbox-intermediate'));
    }
}


function reset() {
    if (confirm($('[data-tag="confirm-reset"]').text())) {
        loadSample();
    }
}

function getTodayDate() {
    var tdate = new Date();
    var dd = tdate.getDate(); //yields day
    var MM = tdate.getMonth(); //yields month
    var yyyy = tdate.getFullYear(); //yields year
    var currentDate= dd + "-" +( MM+1) + "-" + yyyy;

    return currentDate;
}

function removeUnusedVariables(){
    var variables = Blockly.workspace_.getAllVariables();
    variables.forEach(function (variable){
        //console.log(Blockly.workspace_.getVariableUses(variable).length );
        if(Blockly.workspace_.getVariableUses(variable.name).length == 0){
            console.log("Removing variable: " + variable.name);
            Blockly.workspace_.deleteVariable(variable.name);
        }
    })
}

function save(){
    if(validate()) {
        removeUnusedVariables();

        var xmlText = getShipXML();
        var shipXMLList = JSON.parse(localStorage.getItem("SHIPXML"));
        var date = getTodayDate();
        if (!shipXMLList) {
            shipXMLList = {'ship': []};
        }

        var count = 0;
        for (var i = 0; i < shipXMLList.ship.length; i++) {
            if (shipXMLList.ship[i].date.startsWith(date)) {
                count++;
            }
        }
        var ship = {};
        ship.date = getTodayDate() + "-" + count;
        ship.xml = xmlText;
        ship.API = Blockly.Java.getAPILevel();
        ship.name = Blockly.Java.getShipName();
        ship.baseClass = Blockly.Java.getBaseClass();
        ship.slots = Blockly.Java.getSlots();

        shipXMLList['ship'].push(ship);
        localStorage.setItem("SHIPXML", JSON.stringify(shipXMLList));
    }
}

function loadList(){
    console.log("Loading list");
    $('#shipLoadList').empty();
    var shipXMLList = JSON.parse(localStorage.getItem("SHIPXML"));
    var API = Blockly.Java.getAPILevel();

    if(shipXMLList) {
        var count = 0;
        for(var i = 0; i < shipXMLList.ship.length; i++){
            if(shipXMLList.ship[i].API == API) {
                var fn = 'loadShipXMLFromDate("' + shipXMLList.ship[i].date + '")';
                $('#shipLoadList').append('<li class="list-group-item"><a onclick=\'' + fn + '\'>' + shipXMLList.ship[i].date + '</a></li>');
                ++count;
            }
        }
        if(count > 0) {
            $('#shipLoadList').append("<li class='list-group-item'><a class='btn btn-danger' id='dropdown-delete' onclick='removeListItems()'>" + $('[data-tag="clear"]').text() + "</a></li>");
        }else{
            $('#shipLoadList').append('<li class="list-group-item">No items found</li>')
        }
    }else{
        shipXMLList = {'ship': []};
        $('#shipLoadList').append('<li class="list-group-item">No items found</li>')
    }
}
function loadShipXMLFromDate(name){
    var shipXMLList = JSON.parse(localStorage.getItem("SHIPXML"));
    for(var i = 0; i < shipXMLList.ship.length; i++){
        if(shipXMLList.ship[i].date == name){
            var ship = shipXMLList.ship[i];
            var shipConfig = {};

            shipConfig.API = ship.API;
            shipConfig.name = ship.name;
            shipConfig.package = ship.package;
            shipConfig.type = ship.baseClass;
            shipConfig.componentConfig = ship.slots;
            shipConfig.xml = ship.xml;

            localStorage.removeItem('SHIPCONFIG');
            localStorage.setItem('SHIPCONFIG', JSON.stringify(shipConfig));

            window.location.replace('workspace.html?lang=' + Blockly.language.getLang());
        }
    }

}

$(window).on('load', function(){
    loadAfterInject();
});

function loadAfterInject(){
    setTimeout(function(){
        if(!Blockly.getMainWorkspace()) {
            loadAfterInject();
        }else{
            console.log("Settings XML");
            var ship = JSON.parse(localStorage.getItem('SHIPCONFIG'));
            if(ship && ship.xml) {
                fromXml(ship.xml);

                removeUnusedVariables();
            }
        }
    },1000);
}



function removeListItems(){
    localStorage.removeItem("SHIPXML");
}
function loadSample() {
    Blockly.workspace_.clear();

    ////var xmlText = "<xml>" +
    ////    //"<block type='main' x='50' y='50'>" +
    ////    //"</block>" +
    ////    "<block type='oscanned' x='400' y='50'>" +
    ////    "</block>" +
    ////    "<block type='ohitrobot' x='750' y='50'>" +
    ////    "</block>" +
    ////    "<block type='ohitwall' x='1100' y='50'>" +
    ////    "</block>" +
    ////    "</xml>";
    //
    //if (0 < Blockly.getMainWorkspace().getAllBlocks().length) {
    //    if (confirm("Are you sure you wish to load the sample ship? " +
    //            "\nAll unsaved changes will be lost.")) {
    //        fromXml(xmlText);
    //        console.log("Sample Ship Loaded.");
    //    }
    //}
    //else {
    //    fromXml(xmlText);
    //    console.log("Sample Ship Loaded.");
    //}
}
function getShipXML(){
    //var xmlDom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    //var varDom = Blockly.Xml.variablesToDom(Blockly.getMainWorkspace());
    //var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    //var varText = Blockly.Xml.domToPrettyText(varDom);
    ////xmlText = xmlText.replace(/ id="\d+"/g, '');
    //
    //return "<ship><blocks>" + xmlText + "</blocks><variables>" + varText + "</variables></ship>";

    Blockly.workspace_.getAllVariables().forEach(function (variable){
        console.log(variable);
        console.log(Blockly.Java.getVariable(variable.name).type);
        variable.type = Blockly.Java.getVariable(variable.name).type;
    });


    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlText = xmlText.replace(/ id="\d+"/g, '');

    return xmlText;
}
function fromXml(input) {
    var xml = Blockly.Xml.textToDom(input);
    if(xml) {
        Blockly.getMainWorkspace().clear();
        //console.log(xml);
        Blockly.Xml.domToWorkspace(xml, Blockly.workspace_);
        removeUnusedVariables();
        $('#import-form-group').removeClass("has-error");
        $('#importHelpBlock').hide();
        $('#xmlImportModal').modal('hide')
    }
}

function toXml(){
    removeUnusedVariables();
    var xmlText = getShipXML();
    alertModal($('[data-tag="generateXMLTitle"]').text(), $('[data-tag="generateXMLDescription"]').text(),xmlText, "Copy");
}

function importXML(){
    var xml = $('#importXML').val();
    //alert(xml);
    if(xml){
        $('#import-form-group').addClass("has-error");
        $('#importHelpBlock').show();
        fromXml($('#importXML').val());
    }else{
        $('#import-form-group').addClass("has-error");
        $('#importHelpBlock').show();
    }
}

function hideModal(){
    $('#import-form-group').removeClass("has-error");
    $('#importHelpBlock').hide();
}

function alertModal(title, description, content, type){
    $('#alertLabel').html(title);
    $('#alertDescription').html(description);
    if(type == "Copy") {
        $('#alertContentCopyable').val(content);
        $('#alertContentCopyable').show();
        $('#alertContentList').hide();
    }else if(type == "List"){
        $('#alertContentList').empty();
        $('#alertContentList').show();
        $('#alertContentCopyable').hide();
        content.forEach(function(content){
            $('#alertContentList').append('<li class="list-group-item"><b data-tag="block">Block:</b>'+content.block+ '<br><b data-tag="reason">Reason: </b>' + content.reason + '</li>')
        })
    }
    $('#alertModal').modal();
}

function validate() {
    var blocks = Blockly.getMainWorkspace().getAllBlocks();
    var valid = true;
    var errors = [];
    for (var i = 0; i < blocks.length; i++) {
        var curData = blocks[i].data;
        var JSONData;

        if (curData && curData != '') {
            JSONData = JSON.parse(curData);

            if (JSONData.error.length != 0) {
                for (var j = 0; j < JSONData.error.length; j++) {
                    //errors.push("Block : [" + blocks[i] + "]\n Cause : " + JSONData.error[j] + "\n\n");
                    var error = {};
                    error.block = blocks[i];
                    error.reason = JSONData.error[j];
                    errors.push(error);
                    valid = false;
                }
            }
        }
    }
    if (valid && errors.length == 0) {
        return true;
    }else{
        alertModal($('[data-tag="generateErrorTitle"]').text(), $('[data-tag="generateErrorDescription"]').text(), errors, "List");
        return false;
    }
}

function generate(){
    if(validate()){
        removeUnusedVariables();
        var code = Blockly.Java.workspaceToCode(Blockly.getMainWorkspace(), null);
        //alertModal($('[data-tag="generateTitle"]').text(), $('[data-tag="generateDescription"]').text(),code, "Copy");
        $('#publish-code').text(code);
        $('#send-error').empty();
        $('#remote_modal').modal('show');
    };
}
function send() {

    var url = Blockly.blockly.BASE_URL + "/upload";
    var ip = $('#publish-ip').val();
    var port = $('#publish-port').val();
    var shipName = Blockly.Java.getShipName();
    var pkg = Blockly.Java.getPackage();

    var code = $('#publish-code').text();

    var json = {
        name: shipName,
        pkg: pkg,
        ip: ip,
        port: port,
        code: code
    };

    $('#loadingOverlay').show();

    $.ajax({
        type : "POST",
        url : url,
        contentType: "text/json;",
        data : JSON.stringify(json),
        statusCode: {

            200: function(data) {
                // Only if your server returns a 403 status code can it come in this block. :-)
                $('#loadingOverlay').hide();
                console.log(data);
                $('#remote_modal').modal('hide');
                alert("Ship has been send, awesome!")

            },
            500: function(data) {
                $('#loadingOverlay').hide();
                console.log(data);
                console.log(data.statusText);
                $('#send-error').text(data.statusText);
            }
        }
    });
}

//function publish(){
//    var shipName = Blockly.Java.getShipName();
//    var package = Blockly.Java.getPackage();
//    var ip = $('#publish-ip').val();
//    var port = $('#publish-port').val();
//    var url = Blockly.blockly.BASE_URL + "/publish";
//    var json = {
//        "name": shipName,
//        "ip": ip,
//        "port": port,
//        "package": package
//    };
//
//    console.log(ip + " : " + port);
//
//    if(validateIpAdress(ip)) {
//
//        $.ajax({
//            type: "POST",
//            contentType: "text/json;",
//            url: url,
//            data: JSON.stringify(json),
//            statusCode: {
//                200: function (data) {
//                    // Only if your server returns a 403 status code can it come in this block. :-)
//                    console.log(data);
//                },
//                500: function (data) {
//                    console.log(data);
//                }
//            }
//        });
//    }else{
//        //set error to ip and port
//    }
//}

function validateIpAdress() {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test($('#publish-ip').val())) {
        return (true)
    }
    alert("You have entered an invalid IP address!");
    return (false)
}
