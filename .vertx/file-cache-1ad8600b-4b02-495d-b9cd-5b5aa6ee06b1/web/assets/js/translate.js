function Translate() {
    //initialization
    this.init = function (attribute, lng) {
        this.attribute = attribute;
        this.lng = getLang();
    };

    //translate
    this.process = function () {
        _self = this;
        var xrhFile = new XMLHttpRequest();
        //load content data
        console.log(this.lng);
        xrhFile.open("GET", "assets/blockly/msg/json/" + this.lng + ".json", true);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    var LngObject = JSON.parse(xrhFile.responseText);
                    //console.log(LngObject["name1"]);
                    var allDom = document.getElementsByTagName("*");
                    //console.log(allDom);
                    for (var i = 0; i < allDom.length; i++) {
                        var elem = allDom[i];
                        //console.log(elem);
                        var key = elem.getAttribute(_self.attribute);

                        if (key != null) {
                            //console.log(key);
                            if (LngObject[key]) {
                                elem.innerHTML = LngObject[key];
                            } else {
                                console.log("No translation found for key: " + key);
                            }
                        }
                    }

                }
            }
        };
        xrhFile.send();
    }
}

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
this.LANGUAGE_NAME = {
    'en': 'English',
    'nl': 'Nederlands'
};


/**
 * Save the blocks and reload with a different language.
 */
function changeLanguage() {
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


/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
function getStringParamFromUrl(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
function getLang() {
    var lang = getStringParamFromUrl('lang', '');
    if (this.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};

function initLanguage() {
    document.head.parentElement.setAttribute('lang', this.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in this.LANGUAGE_NAME) {
        languages.push([this.LANGUAGE_NAME[lang], lang]);
    }
    var comp = function (a, b) {
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
        if (lang == this.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', changeLanguage, true);

    var translate = new Translate();
    var attributeName = 'data-tag';
    translate.init(attributeName, this.LANG);
    translate.process();

    console.log("Translate");
    Translate();

    //// Inject language strings.
    //document.title += ' ' + MSG['title'];
    //document.getElementById('llgenerate').textContent = MSG['llgenerate'];
    //document.getElementById('llsample').textContent = MSG['llsample'];
    //document.getElementById('llsave').textContent = MSG['llsave'];
    //document.getElementById('llload').textContent = MSG['llload'];
    //document.getElementById('llxml').textContent = MSG['llxml'];
    //document.getElementById('btn-xml').textContent = MSG['llexport'];
    //document.getElementById('llimport').textContent = MSG['llimport'];
    //document.getElementById('dropdown-delete').textContent = MSG['llreset'];
    //
    //document.getElementById('mainloop').text = MSG['llmainloop'];
}

/**
 * User's language (e.g. "en").
 * @type {string}
 */
this.LANG = this.getLang();

