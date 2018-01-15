var MSG = {
    //menu items
    llgenerate: "Generate",
    llsample: "Load sample",
    llsave: "Save",
    llload: "Load",
    llxml: "XML",
    llexport: "Export as XML",
    llimport: "Import from XML",
    llreset: "Reset",



    //Categories
    catmain: "Main",
    catmovement: "Movement",
    catslots: "Slots",
    catevents: "Events",
    catlogic: "Logic",
    catutillities: "utillities",
    catvariables: "Variables",


    //event categories
    catscannedship: "Scanned ship",
    catscannedmissile: "Scanned missile",
    cathitrobot: "Hit robot",
    cathitwall: "Hit wall",
    cathitbybullet: "Hit by bullet",
    cathitbymissile: "Hit by missile",


    //labels
    execute: "Execute",
    methods: "Methods",
    getters: "Getters",
    event: "Event",
    eventdata: "Event data",
    logicblocks: "Blocks",
    logicutilities: "Utilities",
    strings: "Text",
    math: "Math",
    special: "Special"

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
Blockly.Msg.MAIN_TITLE = "Main block";
Blockly.Msg.MAIN_INIT = "Initial %1";
Blockly.Msg.MAIN_ACTION = "Loop %1";
Blockly.Msg.MAIN_TOOLTIP = "";

/**
 ShipCommand messages
 */
Blockly.Msg.EXEC_TITLE = "Execute";
Blockly.Msg.EXEC_TOOLTIP = "";

Blockly.Msg.MVFORWARD_TITLE = "Move Forward %1";
Blockly.Msg.MVFORWARD_TOOLTIP = "";

Blockly.Msg.MVBACKWARD_TITLE = "Move Backward %1";
Blockly.Msg.MVBACKWARD_TOOLTIP = "";

Blockly.Msg.TRRIGHT_TITLE = "Turn Right %1";
Blockly.Msg.TRRIGHT_TOOLTIP = "";

Blockly.Msg.TRLEFT_TITLE = "Turn Left %1";
Blockly.Msg.TRLEFT_TOOLTIP = "";

Blockly.Msg.GDISTANCEREMAINING_TITLE = "Get distance remaining";
Blockly.Msg.GDISTANCEREMAINING_TOOLTIP = "";

Blockly.Msg.GBODYTURNREMAINING_TITILE = "Get body turn remaining";
Blockly.Msg.GBODYTURNREMAINING_TOOLTIP = "";

Blockly.Msg.GBODYHEADING_TITLE = "Get body heading";
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
Blockly.Msg.ATRRIGHT_TITLE = "Turn %1 Right with Angle: %2";
Blockly.Msg.ATRRIGHT_TOOLTIP = "";

Blockly.Msg.ATTO_TITLE = "Turn %1 To %2";
Blockly.Msg.ATTO_TOOLTIP = "";

Blockly.Msg.ATRLEFT_TITLE = "Turn %1 Left with Angle: %2";
Blockly.Msg.ATRLEFT_TOOLTIP = "";

Blockly.Msg.FIRE_TITLE = "Fire  %1";
Blockly.Msg.FIRE_TOOLTIP="";

Blockly.Msg.LAUNCH_TITLE = "Launch %1 with power %2";
Blockly.Msg.LAUNCH_TOOLTIP = "";

Blockly.Msg.MINE_TITLE = "Place mine from Slot %1 with power %2";
Blockly.Msg.MINE_TOOLTIP = "";

Blockly.Msg.ATBLINDSPOT_TITLE = "Is %1 at blindspot";
Blockly.Msg.ATBLINDSPOT_TOOLTIP = "";

Blockly.Msg.ATGUNHEAT_TITLE = "Get gun heat of %1";
Blockly.Msg.ATGUNHEAT_TOOLTIP = "";

Blockly.Msg.ATHEADING_TITLE = "Get heading of %1";
Blockly.Msg.ATHEADING_TOOLTIP = "";

Blockly.Msg.ATTURNREMAINING_TITLE = "Get turn remaining of %1";
Blockly.Msg.ATTURNREMAINING_TOOLTIP = "";

/**
 Event messages
 */
Blockly.Msg.OSCANNED_TITLE = "When I see ship";
Blockly.Msg.OSCANNED_TOOLTIP = "";

Blockly.Msg.OSCANNEDMISSILE_TITLE = "When I see a missile";
Blockly.Msg.OSCANNEDMISSILE_TOOLTIP = "";

Blockly.Msg.OHITROBOT_TITLE = "When I hit a ship";
Blockly.Msg.OHITROBOT_TOOLTIP = "";

Blockly.Msg.OHITWALL_TITLE = "When I hit a wall";
Blockly.Msg.OHITWALL_TOOLTIP = "";

Blockly.Msg.OHITBYBULLET_TITLE = "When a bullet hits me";
Blockly.Msg.OHITBYBULLET_TOOLTIP = "";

Blockly.Msg.OHITBYMISSILE_TITLE = "When a missile hits me";
Blockly.Msg.OHITBYMISSILE_TOOLTIP = "";



/**
 Event data messages
 */
Blockly.Msg.GHEADING_TITLE = "Get Heading";
Blockly.Msg.GHEADING_TOOLTIP = "";

Blockly.Msg.GBEARING_TITLE = "Get Bearing";
Blockly.Msg.GBEARING_TOOLTIP = "";

Blockly.Msg.GNAME_TITLE = "Get Name";
Blockly.Msg.GNAME_TOOLTIP = "";

Blockly.Msg.GVELOCITY_TITLE = "Get Velocity";
Blockly.Msg.GVELOCITY_TOOLTIP = "";

Blockly.Msg.GDISTANCE_TITLE = "Get Distance";
Blockly.Msg.GDISTANCE_TOOLTIP = "";


/**
 Utility data messages
 */
Blockly.Msg.UTIL_ANGLE_TITLE = "Angle %1";
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
Blockly.Msg.UNITIALIZED_VARIABLE = "This variable is not initialized yet";
Blockly.Msg.INVALID_VARIABLE_TYPE = "Incompatible variable types: ";
Blockly.Msg.VARIABLE_TOOLTIP_TYPE = "Variable types are not the same ";


/**
 * Math operator tooltips
 */
Blockly.Msg.TOOLTIPS_BY_OP = {
    ADD: "Returns the sum of the two numbers",
    MINUS: "Returns the difference of the two numbers",
    MULTIPLY: "Returns the product of the two numbers",
    DIVIDE: "Returns the quotient of the two numbers",
    POWER: "Returns the first number raised to the power of the second number"
};
//Blockly.Msg.CREATE_VARIABLE_TITLE = "Initialize %1 with type %2";
//Blockly.Msg.CREATE_VARIABLE_TOOLTIP = "";
//
//Blockly.Msg.SET_VARIABLE_TITLE = "Set %1 with value %2";
//Blockly.Msg.SET_VARIABLE_TOOLTIP = "";