var MSG = {
    //menu items
    llgenerate: "Genereer schip",
    llsample: "Voorbeeld laden",
    llsave: "Opslaan",
    llload: "Laden",
    llxml: "XML",
    llexport: "Export als XML",
    llimport: "Import uit XML",
    llreset: "Resetten",

    //Categories
    catmain: "Main",
    catmovement: "Beweging",
    catslots: "Componenten",
    catevents: "Situaties",
    catlogic: "Logica",
    catutillities: "Handigheden",
    catvariables: "Variabelen",


    //event categories
    catscannedship: "Schip gezien",
    catscannedmissile: "Raket gezien",
    cathitrobot: "Schip geraakt",
    cathitwall: "Muur geraakt",
    cathitbybullet: "Geraakt door kogel",
    cathitbymissile: "Geraakt door raket",

    //labels
    execute: "Uitvoeren",
    methods: "Methoden",
    getters: "Gegevens",
    event: "Situatie",
    eventdata: "Gegevens",
    logicblocks: "Blokken",
    logicutilities: "Handigheden",
    strings: "text",
    math: "cijfers",
    special: "speciaal"

};
Blockly.MSG = MSG;

/** HUE*/
/// Hue value for all main blocks
Blockly.Msg.MAIN_HUE = '100';

/// Hue value for all movement blocks.
Blockly.Msg.MOVEMENT_HUE = '210';

/// Hue value for all slot blocks.
Blockly.Msg.SLOT_HUE = '120';
/// Hue value for all slot action blocks.
Blockly.Msg.SLOTACTION_HUE = '230';

/// Hue value for all event blocks.
Blockly.Msg.EVENT_HUE = '160';
/// Hue value for all event data blocks.
Blockly.Msg.EVENTDATA_HUE = '260';

/// Hue value for all utility blocks.
Blockly.Msg.UTIL_HUE = '50';

/// Hue value for all variable blocks
Blockly.Msg.VARIABLE_HUE = '290';

Blockly.Msg.STRING_HUE = '100';
Blockly.Msg.NUMBER_HUE = '200';
Blockly.Msg.BOOLEAN_HUE = '250';
/**
 * Error messages
 */
Blockly.Msg.ONLY_TOPLEVEL_MSG = "This block can only be placed in a Top-Level block";
Blockly.Msg.NOT_EMPTY_MSG = "This block can not have empty spaces";
Blockly.Msg.ONLY_EVENT_MSG = "This block can only be placed in a Event block";
Blockly.Msg.INVALID_EVENT_METHOD = "This block can not be placed in this event";
Blockly.Msg.INVALID_SLOT_TYPE = "This block can not use this slot type";

/**
 ShipCommand messages
 */
Blockly.Msg.MAIN_TITLE = "Basis blok";
Blockly.Msg.MAIN_INIT = "Start %1";
Blockly.Msg.MAIN_ACTION = "Herhaal %1";
Blockly.Msg.MAIN_TOOLTIP = "";

/**
 ShipCommand messages
 */
Blockly.Msg.EXEC_TITLE = "Uitvoeren";
Blockly.Msg.EXEC_TOOLTIP = "";

Blockly.Msg.MVFORWARD_TITLE = "Ga vooruit %1";
Blockly.Msg.MVFORWARD_TOOLTIP = "";

Blockly.Msg.MVBACKWARD_TITLE = "Ga achteruit %1";
Blockly.Msg.MVBACKWARD_TOOLTIP = "";

Blockly.Msg.TRRIGHT_TITLE = "draai rechts %1";
Blockly.Msg.TRRIGHT_TOOLTIP = "";

Blockly.Msg.TRLEFT_TITLE = "draai links %1";
Blockly.Msg.TRLEFT_TOOLTIP = "";

Blockly.Msg.GDISTANCEREMAINING_TITLE = "Afstand te gaan";
Blockly.Msg.GDISTANCEREMAINING_TOOLTIP = "";

Blockly.Msg.GBODYTURNREMAINING_TITILE = "Draai te gaan";
Blockly.Msg.GBODYTURNREMAINING_TOOLTIP = "";

Blockly.Msg.GBODYHEADING_TITLE = "Richting schip";
Blockly.Msg.GBODYHEADING_TOOLTIP = "";

/**
 Slot messages
 */
Blockly.Msg.SLOT1_TITLE = "Slot 1";
Blockly.Msg.SLOT1_TOOLTIP = "";

Blockly.Msg.SLOT2_TITLE = "Slot 2";
Blockly.Msg.SLOT2_TOOLTIP = "";

Blockly.Msg.SLOT3_TITLE = "Slot 3";
Blockly.Msg.SLOT3_TOOLTIP = "";

Blockly.Msg.SLOT4_TITLE = "Slot 4";
Blockly.Msg.SLOT4_TOOLTIP = "";

/**
 Slot action messages
 */
Blockly.Msg.ATRRIGHT_TITLE = "Draai %1 rechts met hoek: %2";
Blockly.Msg.ATRRIGHT_TOOLTIP = "";

Blockly.Msg.ATTO_TITLE = "Draai %1 naar %2";
Blockly.Msg.ATTO_TOOLTIP = "";

Blockly.Msg.ATRLEFT_TITLE = "Draai %1 links met hoek: %2";
Blockly.Msg.ATRLEFT_TOOLTIP = "";

Blockly.Msg.FIRE_TITLE = "Vuur  %1 met kracht %2";
Blockly.Msg.FIRE_TOOLTIP="";

Blockly.Msg.LAUNCH_TITLE = "Lanceer %1 met kracht %2";
Blockly.Msg.LAUNCH_TOOLTIP = "";

Blockly.Msg.MINE_TITLE = "Plaats mijn uit slot %1 met kracht %2";
Blockly.Msg.MINE_TOOLTIP = "";

Blockly.Msg.ATBLINDSPOT_TITLE = "zit %1 in een dode hoek";
Blockly.Msg.ATBLINDSPOT_TOOLTIP = "";

Blockly.Msg.ATGUNHEAT_TITLE = "Cooldown van %1";
Blockly.Msg.ATGUNHEAT_TOOLTIP = "";

Blockly.Msg.ATHEADING_TITLE = "Richting van %1";
Blockly.Msg.ATHEADING_TOOLTIP = "";

Blockly.Msg.ATTURNREMAINING_TITLE = "Draai te gaan %1";
Blockly.Msg.ATTURNREMAINING_TOOLTIP = "";

/**
 Event messages
 */
Blockly.Msg.OSCANNED_TITLE = "Wanneer ik een schip zie";
Blockly.Msg.OSCANNED_TOOLTIP = "";

Blockly.Msg.OSCANNEDMISSILE_TITLE = "Wanneer ik een raket zie";
Blockly.Msg.OSCANNEDMISSILE_TOOLTIP = "";

Blockly.Msg.OHITROBOT_TITLE = "Wanneer ik een schip raak";
Blockly.Msg.OHITROBOT_TOOLTIP = "";

Blockly.Msg.OHITWALL_TITLE = "Wanneer ik een muur raak";
Blockly.Msg.OHITWALL_TOOLTIP = "";

Blockly.Msg.OHITBYBULLET_TITLE = "Wanneer een kogel mij raakt";
Blockly.Msg.OHITBYBULLET_TOOLTIP = "";

Blockly.Msg.OHITBYMISSILE_TITLE = "Wanneer een raket mij raakt";
Blockly.Msg.OHITBYMISSILE_TOOLTIP = "";



/**
 Event data messages
 */
Blockly.Msg.GHEADING_TITLE = "Krijg Richting";
Blockly.Msg.GHEADING_TOOLTIP = "";

Blockly.Msg.GBEARING_TITLE = "Krijg Hoek";
Blockly.Msg.GBEARING_TOOLTIP = "";

Blockly.Msg.GNAME_TITLE = "Krijg Naam";
Blockly.Msg.GNAME_TOOLTIP = "";

Blockly.Msg.GVELOCITY_TITLE = "Krijg snelheid";
Blockly.Msg.GVELOCITY_TOOLTIP = "";

Blockly.Msg.GDISTANCE_TITLE = "Krijg afstand";
Blockly.Msg.GDISTANCE_TOOLTIP = "";


/**
 Utility data messages
 */
Blockly.Msg.UTIL_ANGLE_TITLE = "Hoek %1";
Blockly.Msg.UTIL_ANGLE_TOOLTIP = "";

Blockly.Msg.UTIL_STRING_TITLE = "%1";
Blockly.Msg.UTIL_STRING_TOOLTIP = "";

Blockly.Msg.UTIL_BOOLEAN_TITLE = "%1";
Blockly.Msg.UTIL_BOOLEAN_TOOLTIP  = "";

Blockly.Msg.UTIL_INT_TITLE = "%1";
Blockly.Msg.UTIL_INT_TOOLTIP = "";

/**
 Variable messages
 */
Blockly.Msg.UNITIALIZED_VARIABLE = "Deze variable is nog niet geinitialiseerd";
Blockly.Msg.INVALID_VARIABLE_TYPE = "Ongelijke variabele typen: ";
Blockly.Msg.VARIABLE_TOOLTIP_TYPE = "Variabele typen zijn niet gelijk";


/**
 * Math operator tooltips
 */
Blockly.Msg.TOOLTIPS_BY_OP = {
    ADD: "Verkrijg de som van de 2 nummers",
    MINUS: "Verkrijg het verschil tussen de 2 nummers",
    MULTIPLY: "Verkrijg het product van de 2 nummers",
    DIVIDE: "Verkrijg de quotient van de 2 nummers",
    POWER: "Verkrijg het eerste nummer, opgelift tegen de kracht van het tweede nummer"
};
//Blockly.Msg.CREATE_VARIABLE_TITLE = "Initialize %1 with type %2";
//Blockly.Msg.CREATE_VARIABLE_TOOLTIP = "";
//
//Blockly.Msg.SET_VARIABLE_TITLE = "Set %1 with value %2";
//Blockly.Msg.SET_VARIABLE_TOOLTIP = "";