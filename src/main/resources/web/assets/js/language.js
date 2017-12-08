goog.require('Blockly');
goog.provide('Blockly.language');

/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Blockly.language.LANGUAGE_NAME = {
    'en': 'English',
    'nl': 'Nederlands'
};


/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if paramater not found.
 * @return {string} The parameter value or the default value if not found.
 */
Blockly.language.getStringParamFromUrl = function(name, defaultValue) {
    var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Blockly.language.getLang = function() {
    var lang = Blockly.language.getStringParamFromUrl('lang', '');
    if (Blockly.language.LANGUAGE_NAME[lang] === undefined) {
        // Default to English.
        lang = 'en';
    }
    return lang;
};




/**
 * Save the blocks and reload with a different language.
 */
Blockly.language.changeLanguage = function() {
    // Store the blocks for the duration of the reload.
    // This should be skipped for the index page, which has no blocks and does
    // not load Blockly.language.
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
 * Initialize the page language.
 */
Blockly.language.initLanguage = function() {
    // Set the HTML's language and direction.
    //var rtl = Blockly.language.isRtl();
    //document.dir = rtl ? 'rtl' : 'ltr';
    console.log(Blockly.language.LANG);
    document.head.parentElement.setAttribute('lang', Blockly.language.LANG);

    // Sort languages alphabetically.
    var languages = [];
    for (var lang in Blockly.language.LANGUAGE_NAME) {
        languages.push([Blockly.language.LANGUAGE_NAME[lang], lang]);
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
        if (lang == Blockly.language.LANG) {
            option.selected = true;
        }
        languageMenu.options.add(option);
    }
    languageMenu.addEventListener('change', Blockly.language.changeLanguage, true);

    //if(Blockly.blockly.MSG) {
        // Inject language strings.
        document.title += ' ' + MSG['title'];
        document.getElementById('llgenerate').textContent = MSG['llgenerate'];
        document.getElementById('llsample').textContent = MSG['llsample'];
        document.getElementById('llsave').textContent = MSG['llsave'];
        document.getElementById('llload').textContent = MSG['llload'];
        document.getElementById('llxml').textContent = MSG['llxml'];
        document.getElementById('btn-xml').textContent = MSG['llexport'];
        document.getElementById('llimport').textContent = MSG['llimport'];
        document.getElementById('dropdown-delete').textContent = MSG['llreset'];

        document.getElementById('mainloop').text = MSG['llmainloop'];
    //}
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Blockly.language.LANG = Blockly.language.getLang();

