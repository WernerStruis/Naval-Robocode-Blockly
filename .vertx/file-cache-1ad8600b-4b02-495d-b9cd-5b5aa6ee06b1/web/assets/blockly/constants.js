goog.provide('Blockly.Constants.values');

Blockly.Constants.values.MOVEMENT_SPEED = 200;
Blockly.Constants.values.TURN_SPEED = 10;

Blockly.Constants.values.COMPONENT_TURN_SPEED = 10;
Blockly.Constants.values.FIRE_POWER = 2;
Blockly.Constants.values.LAUNCH_POWER = 2;
Blockly.Constants.values.MINE_POWER = 2;

Blockly.Constants.values.FIRE = {
    'type': 'fire',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATRRIGHT = {
    'type': 'atrright',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATRLEFT = {
    'type': 'atrleft',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATTO = {
    'type': 'atto',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    },
        {
            'name': 'TO',
            'value': {
                'shadow': true,
                'type': 'gname'
            }
        }]
};

Blockly.Constants.values.MINE = {
    'type': 'mine',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.LAUNCH = {
    'type': 'launch',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};

Blockly.Constants.values.ATBLINDSPOT = {
    'type': 'atblindspot',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATGUNHEAT = {
    'type': 'atgunheat',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATHEADING = {
    'type': 'atheading',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};
Blockly.Constants.values.ATTURNREMAINING = {
    'type': 'atturnremaining',
    'value': [{
        'name': 'SLOT',
        'value': {
            'shadow': true,
            'type': null
        }
    }]
};

/**
 * Beginner method set
 */
Blockly.Constants.values.BEGINNER_CANNON_METHODS = {
    "Methods": [
        Blockly.Constants.values.FIRE,
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT,
        Blockly.Constants.values.ATTO
    ]

};
Blockly.Constants.values.BEGINNER_RADAR_METHODS = {
    "Methods": [
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT,
        Blockly.Constants.values.ATTO
    ]
    
};
Blockly.Constants.values.BEGINNER_MINE_METHODS = {
    "Methods": [
        Blockly.Constants.values.MINE
    ]
    
};
Blockly.Constants.values.BEGINNER_MISSILE_METHODS = {
    "Methods": [
        Blockly.Constants.values.LAUNCH,
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT,
        Blockly.Constants.values.ATTO
    ]
};

/**
 * Intermediate method set
 */
Blockly.Constants.values.INTERMEDIATE_CANNON_METHODS = {
    "Methods": [
        Blockly.Constants.values.FIRE,
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT
    ],
    "Values": [
        Blockly.Constants.values.ATBLINDSPOT,
        Blockly.Constants.values.ATGUNHEAT,
        Blockly.Constants.values.ATHEADING,
        Blockly.Constants.values.ATTURNREMAINING
    ]
};
Blockly.Constants.values.INTERMEDIATE_RADAR_METHODS = {
    "Methods": [
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT
    ],
    "Values": [
        Blockly.Constants.values.ATHEADING,
        Blockly.Constants.values.ATTURNREMAINING
    ]

};
Blockly.Constants.values.INTERMEDIATE_MINE_METHODS = {
    "Methods": [
        Blockly.Constants.values.MINE
    ],
    "Values": []

};
Blockly.Constants.values.INTERMEDIATE_MISSILE_METHODS = {
    "Methods": [
        Blockly.Constants.values.LAUNCH,
        Blockly.Constants.values.ATRRIGHT,
        Blockly.Constants.values.ATRLEFT
    ],
    "Values": [
        Blockly.Constants.values.ATHEADING,
        Blockly.Constants.values.ATTURNREMAINING
    ]
};


Blockly.Constants.values.METHOD_END = "</shadow></value></block>";
/**
 Validator values
 */
Blockly.Constants.values.EVENT_MAP = {
    'oscanned': ['gheading', 'gbearing', 'gname', 'gvelocity', 'gdistance'],
    'ohitrobot': ['gbearing', 'gname'],
    'ohitwall': ['gbearing'],
    'ohitbybullet': ['gheading', 'gbearing', 'gname', 'gvelocity', 'gdistance'],
    'ohitbymissile': ['gheading', 'gbearing', 'gname', 'gvelocity', 'gdistance'],
    'oscannedmissile': ['gheading', 'gbearing', 'gname', 'gvelocity', 'gdistance']
};

//Slot types for slot action
Blockly.Constants.values.SLOTACTION_MAP = {
    'atrright': ['DoubleBarrelCannon', 'SingleBarrelCannon', 'ShortRangeRadar', 'LongRangeRadar', 'MissileComponent'],
    'atrleft': ['DoubleBarrelCannon', 'SingleBarrelCannon', 'ShortRangeRadar', 'LongRangeRadar', 'MissileComponent'],
    'atto': ['DoubleBarrelCannon', 'SingleBarrelCannon', 'ShortRangeRadar', 'LongRangeRadar', 'MissileComponent'],
    'launch': ['MissileComponent'],
    'fire': ['DoubleBarrelCannon', 'SingleBarrelCannon'],
    'mine': ['MineComponent'],
    'atblindspot': ['DoubleBarrelCannon', 'SingleBarrelCannon'],
    'atgunheat': ['DoubleBarrelCannon', 'SingleBarrelCannon'],
    'atheading': ['DoubleBarrelCannon', 'SingleBarrelCannon', 'ShortRangeRadar', 'LongRangeRadar', 'MissileComponent'],
    'atturnremaining': ['DoubleBarrelCannon', 'SingleBarrelCannon', 'ShortRangeRadar', 'LongRangeRadar', 'MissileComponent']
};


/**
 Variable types
 */
Blockly.Constants.values.INT = 'int';
Blockly.Constants.values.BOOLEAN = 'boolean';
Blockly.Constants.values.STRING = 'String';
Blockly.Constants.values.VARIABLE_TYPES = ['int', 'boolean', 'String'];