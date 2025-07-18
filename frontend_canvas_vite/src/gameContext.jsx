import React, { createContext, useState, useEffect } from "react";

import { checkCell as checkCellUtil} from "./utils/checkCell";
import { rnJesus as rnJesusUtil } from "./utils/rnJesus";
import { cartesianToIsometric as cartesianToIsometricUtil } from "./utils/catersianToIsometric";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [state, setState] = useState({
    state: {
        showSettings: true,
        showAiStatus: false,
        canvas: undefined,
        context: undefined,
        canvas2: undefined,
        context2: undefined,
        canvas3: undefined,
        context3: undefined,
        canvas4: undefined,
        context4: undefined,
        containerInnerClass: "containerInner",
        sceneY: {
            three: 400,
            six: 300,
            nine: 220,
            twelve: 150,
        },
        loading: true,
        stateUpdater: "",
        settingAiPlayers: 0,
    },

    global_function_component_triggers: {
        drawGridInit: {
            main: 0,
            prop1: 0,
            prop2: 0,
            next: 0,
        },
        setBackgroundImage: {
            main: 0,
            image: "",
            next: 0,
        },
        startProcessLevelData: {
            main: 0,
            next: 0,
        },
        processLevelData: {
            main: 0,
            next: 0,
        },
        setZoomPan: {
            main: 0,
            next: 0,
        },
        findFocusCell: {
            main: 0,
            next: 0,
        },
        placeItems: {
            main: 0,
            next: 0,
        },
        updatePathArray: {
            main: 0,
            next: 0,
        },
        checkCell: {
            main: 0,
            next: 0,
        },
        findFocusCell: {
            main: 0,
            inputType: "",
            inputSubType: "",
            focus: {
                x: undefined,
                y: undefined,
            },
            speed: "",
            next: 0,
        },
        getTarget: {
            main: 0,
            next: 0,
        },
        obstacleBarrierTrapInitSet: {
            main: 0,
            next: 0,
        },
        placeItems: {
            main: 0,
            next: 0,
        },
        rnJesus: {
            main: 0,
            next: 0,
        },
        settingsFormGridWidthUpdate: {
            main: 0,
            next: 0,
        },
        setZoomPan: {
            main: 0,
            next: 0,
        },
    },
    


    time: 0,

    debugBoxStyle: "debugDisplay closedDebug",
    debugBoxStyle2: "debugDisplay2 closedDebug",

    // LEVEL DRAW SETUP
    tileColumnOffset: 100, // pixels
    tileRowOffset: 50, // pixels
    originX: 0, // offset from left
    originY: 0, // offset from top
    Xtiles: 10,
    Ytiles: 10,
    showCoordinates: true,
    selectedTileX: -1,
    selectedTileY: -1,

    canvasWidth: 1300,
    canvasHeight: 790,

    // canvasWidth: 1000,
    // canvasHeight: 600,

    floorImageWidth: 103,
    floorImageHeight: 53,

    wallImageWidth: 103,
    wallImageHeight: 98,
    sceneY: 220,
    tileWidth: 50,
    gridWidth: 9,

    cellCenterOffsetX: 23,
    cellCenterOffsetY: 2,

    // '**_*_0.0_a_0**'
    // barrierType(a,b,c)BarrierPosition(n,s,e,w)_obstacle_x.y_terrain_elevationNumber(0,1,2)ElevationType(a,b,c)ElevationPosition(n,s,e,w)

    // GRIND INFO, LEVEL DATA & MAPPING
    init: false,
    // openVoid: true,
    openVoid: false,
    cellToVoid: {
        state: false,
        x: 0,
        y: 0,
        count: 0,
        limit: 35,
    },
    voidTimer: {
        count: 0,
        limit: 10000,
    },
    voidCustomCell: false,
    gridInfo: [],
    settingsGridInfo: [],
    gridInfo2D: [],
    gridInfo2: [],
    gridInfo2D2: [],
    levelData: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    levelData12: {
        row0: [
            "**_*_0.0_a_0a*",
            "**_*_0.1_a_0a*",
            "**_*_0.2_a_0a*",
            "**_*_0.3_a_0a*",
            "**_*_0.4_a_0a*",
            "**_*_0.5_a_0a*",
            "**_*_0.6_a_0a*",
            "**_*_0.7_a_0a*",
            "**_*_0.8_a_0a*",
            "**_*_0.9_a_0a*",
            "**_*_0.10_a_0a*",
            "**_*_0.11_a_0a*",
            "**_*_0.12_a_0a*",
        ],
        row1: [
            "**_*_1.0_a_0a*",
            "**_*_1.1_a_0a*",
            "**_*_1.2_a_0a*",
            "**_*_1.3_a_0a*",
            "**_*_1.4_a_0a*",
            "**_*_1.5_a_0a*",
            "**_*_1.6_a_0a*",
            "**_*_1.7_a_0a*",
            "**_*_1.8_a_0a*",
            "**_*_1.9_a_0a*",
            "**_*_1.10_a_0a*",
            "**_*_1.11_a_0a*",
            "**_*_1.12_a_0a*",
        ],
        row2: [
            "**_*_2.0_a_0a*",
            "**_*_2.1_a_0a*",
            "**_b_2.2_a_0a*",
            "**_*_2.3_a_0a*",
            "**_*_2.4_a_0a*",
            "**_*_2.5_a_0a*",
            "**_*_2.6_a_0a*",
            "**_*_2.7_a_0a*",
            "**_*_2.8_a_0a*",
            "**_*_2.9_a_0a*",
            "**_*_2.10_a_0a*",
            "**_*_2.11_a_0a*",
            "**_*_2.12_a_0a*",
        ],
        row3: [
            "**_c_3.0_a_0a*",
            "**_*_3.1_a_0a*",
            "**_c_3.2_a_0a*",
            "**_*_3.3_a_0a*",
            "**_*_3.4_a_0a*",
            "**_*_3.5_a_0a*",
            "**_h_3.6_a_0a*",
            "**_*_3.7_a_0a*",
            "**_*_3.8_a_0a*",
            "**_*_3.9_a_0a*",
            "**_*_3.10_a_0a*",
            "**_*_3.11_a_0a*",
            "**_*_3.12_a_0a*",
        ],
        row4: [
            "**_*_4.0_a_0a*",
            "**_*_4.1_a_0a*",
            "**_*_4.2_a_0a*",
            "**_*_4.3_a_0a*",
            "**_*_4.4_a_0a*",
            "**_*_4.5_a_0a*",
            "**_h_4.6_a_0a*",
            "**_*_4.7_a_0a*",
            "**_*_4.8_a_0a*",
            "**_*_4.9_a_0a*",
            "**_*_4.10_a_0a*",
            "**_*_4.11_a_0a*",
            "**_*_4.12_a_0a*",
        ],
        row5: [
            "**_*_5.0_a_0a*",
            "**_*_5.1_a_0a*",
            "**_*_5.2_a_0a*",
            "**_*_5.3_a_0a*",
            "**_*_5.4_a_0a*",
            "**_*_5.5_a_0a*",
            "**_*_5.6_a_0a*",
            "**_*_5.7_a_0a*",
            "**_*_5.8_a_0a*",
            "**_*_5.9_a_0a*",
            "**_*_5.10_a_0a*",
            "**_*_5.11_a_0a*",
            "**_*_5.12_a_0a*",
        ],
        row6: [
            "**_*_6.0_a_0a*",
            "**_*_6.1_a_0a*",
            "**_*_6.2_a_0a*",
            "**_*_6.3_a_0a*",
            "**_*_6.4_a_0a*",
            "**_*_6.5_a_0a*",
            "**_*_6.6_a_0a*",
            "**_*_6.7_a_0a*",
            "**_*_6.8_a_0a*",
            "**_*_6.9_a_0a*",
            "**_*_6.10_a_0a*",
            "**_*_6.11_a_0a*",
            "**_*_6.12_a_0a*",
        ],
        row7: [
            "**_*_7.0_a_0a*",
            "**_*_7.1_a_0a*",
            "**_*_7.2_a_0a*",
            "**_*_7.3_a_0a*",
            "**_*_7.4_a_0a*",
            "**_*_7.5_a_0a*",
            "**_*_7.6_a_0a*",
            "**_*_7.7_a_0a*",
            "**_*_7.8_a_0a*",
            "**_*_7.9_a_0a*",
            "**_*_7.10_a_0a*",
            "**_*_7.11_a_0a*",
            "**_*_7.12_a_0a*",
        ],
        row8: [
            "**_*_8.0_a_0a*",
            "**_*_8.1_a_0a*",
            "**_*_8.2_a_0a*",
            "**_*_8.3_a_0a*",
            "**_*_8.4_a_0a*",
            "**_*_8.5_a_0a*",
            "**_*_8.6_a_0a*",
            "**_*_8.7_a_0a*",
            "**_*_8.8_a_0a*",
            "**_*_8.9_a_0a*",
            "**_*_8.10_a_0a*",
            "**_*_8.11_a_0a*",
            "**_*_8.12_a_0a*",
        ],
        row9: [
            "**_*_9.0_a_0a*",
            "**_*_9.1_a_0a*",
            "**_*_9.2_a_0a*",
            "**_*_9.3_a_0a*",
            "**_*_9.4_a_0a*",
            "**_*_9.5_a_0a*",
            "**_*_9.6_a_0a*",
            "**_*_9.7_a_0a*",
            "**_*_9.8_a_0a*",
            "**_*_9.9_a_0a*",
            "**_*_9.10_a_0a*",
            "**_*_9.11_a_0a*",
            "**_*_9.12_a_0a*",
        ],
        row10: [
            "**_*_10.0_a_0a*",
            "**_*_10.1_a_0a*",
            "**_*_10.2_a_0a*",
            "**_*_10.3_a_0a*",
            "**_*_10.4_a_0a*",
            "**_*_10.5_a_0a*",
            "**_*_10.6_a_0a*",
            "**_*_10.7_a_0a*",
            "**_*_10.8_a_0a*",
            "**_*_10.9_a_0a*",
            "**_*_10.10_a_0a*",
            "**_*_10.11_a_0a*",
            "**_*_10.12_a_0a*",
        ],
        row11: [
            "**_*_11.0_a_0a*",
            "**_*_11.1_a_0a*",
            "**_*_11.2_a_0a*",
            "**_*_11.3_a_0a*",
            "**_*_11.4_a_0a*",
            "**_*_11.5_a_0a*",
            "**_*_11.6_a_0a*",
            "**_*_11.7_a_0a*",
            "**_*_11.8_a_0a*",
            "**_*_11.9_a_0a*",
            "**_*_11.10_a_0a*",
            "**_*_11.11_a_0a*",
            "**_*_11.12_a_0a*",
        ],
        row12: [
            "**_*_12.0_a_0a*",
            "**_*_12.1_a_0a*",
            "**_*_12.2_a_0a*",
            "**_*_12.3_a_0a*",
            "**_*_12.4_a_0a*",
            "**_*_12.5_a_0a*",
            "**_*_12.6_a_0a*",
            "**_*_12.7_a_0a*",
            "**_*_12.8_a_0a*",
            "**_*_12.9_a_0a*",
            "**_*_12.10_a_0a*",
            "**_*_12.11_a_0a*",
            "**_*_12.12_a_0a*",
        ],
    },
    levelData9: {
        row0: [
            "**_*_0.0_a_0a*",
            "**_*_0.1_a_0a*",
            "**_*_0.2_a_0a*",
            "cw_*_0.3_a_0a*",
            "**_*_0.4_a_0a*",
            "**_*_0.5_a_0a*",
            "**_*_0.6_a_0a*",
            "**_*_0.7_a_0a*",
            "**_*_0.8_h_0a*",
            "**_*_0.9_h_0a*",
        ],
        row1: [
            "**_*_1.0_a_0a*",
            "**_*_1.1_a_0a*",
            "**_*_1.2_a_0a*",
            "**_*_1.3_a_0a*",
            "**_*_1.4_a_0a*",
            "**_*_1.5_a_0a*",
            "**_*_1.6_a_0a*",
            "**_*_1.7_a_0a*",
            "**_*_1.8_a_0a*",
            "**_*_1.9_a_0a*",
        ],
        row2: [
            "**_*_2.0_a_0a*",
            "**_*_2.1_a_0a*",
            "**_*_2.2_a_0a*",
            "**_*_2.3_a_0a*",
            "**_*_2.4_a_0a*",
            "**_*_2.5_a_0a*",
            "**_*_2.6_a_0a*",
            "**_*_2.7_a_0a*",
            "**_*_2.8_a_0a*",
            "**_*_2.9_a_0a*",
        ],
        row3: [
            "**_*_3.0_a_0a*",
            "**_*_3.1_a_0a*",
            "**_*_3.2_a_0a*",
            "**_*_3.3_a_0a*",
            "**_*_3.4_a_0a*",
            "**_*_3.5_a_0a*",
            "**_*_3.6_a_0a*",
            "**_*_3.7_a_0a*",
            "**_*_3.8_a_0a*",
            "**_*_3.9_a_0a*",
        ],
        row4: [
            "**_*_4.0_a_0a*",
            "**_*_4.1_a_0a*",
            "**_*_4.2_f_0a*",
            "**_*_4.3_f_0a*",
            "**_h_4.4_a_0a*",
            "**_h_4.5_a_0a*",
            "**_*_4.6_j_0a*",
            "**_*_4.7_a_0a*",
            "**_*_4.8_a_0a*",
            "**_*_4.9_a_0a*",
        ],
        row5: [
            "**_*_5.0_a_0a*",
            "**_*_5.1_a_0a*",
            "**_*_5.2_a_0a*",
            "**_*_5.3_a_0a*",
            "**_*_5.4_a_0a*",
            "**_*_5.5_a_0a*",
            "**_*_5.6_a_0a*",
            "**_*_5.7_a_0a*",
            "**_*_5.8_a_0a*",
            "**_*_5.9_a_0a*",
        ],
        row6: [
            "**_*_6.0_b_0a*",
            "**_*_6.1_j_0a*",
            "**_*_6.2_j_0a*",
            "**_*_6.3_j_0a*",
            "**_*_6.4_j_0a*",
            "**_*_6.5_j_0a*",
            "**_*_6.6_j_0a*",
            "**_*_6.7_j_0a*",
            "**_*_6.8_j_0a*",
            "**_*_6.9_j_0a*",
        ],
        row7: [
            "**_*_7.0_j_0a*",
            "**_*_7.1_j_0a*",
            "**_*_7.2_a_0a*",
            "**_*_7.3_a_0a*",
            "**_*_7.4_a_0a*",
            "**_*_7.5_a_0a*",
            "**_*_7.6_a_0a*",
            "**_*_7.7_a_0a*",
            "**_*_7.8_a_0a*",
            "**_*_7.9_d_0a*",
        ],
        row8: [
            "**_*_8.0_a_0a*",
            "**_*_8.1_a_0a*",
            "**_*_8.2_a_0a*",
            "**_*_8.3_a_0a*",
            "**_*_8.4_a_0a*",
            "**_*_8.5_a_0a*",
            "**_*_8.6_a_0a*",
            "**_*_8.7_a_0a*",
            "**_*_8.8_a_0a*",
            "**_*_8.9_d_0a*",
        ],
        row9: [
            "**_*_9.0_a_0a*",
            "**_*_9.1_a_0a*",
            "**_*_9.2_a_0a*",
            "**_*_9.3_a_0a*",
            "**_*_9.4_a_0a*",
            "**_*_9.5_a_0a*",
            "**_*_9.6_a_0a*",
            "**_*_9.7_a_0a*",
            "**_*_9.8_a_0a*",
            "**_*_9.9_a_0a*",
        ],
    },
    levelData6: {
        row0: [
            "**_a_0.0_a_0a*",
            "**_*_0.1_a_0a*",
            "**_*_0.2_a_0a*",
            "**_*_0.3_a_0a*",
            "**_*_0.4_a_0a*",
            "**_*_0.5_a_0a*",
            "**_*_0.6_a_0a*",
        ],
        row1: [
            "**_*_1.0_a_0a*",
            "**_*_1.1_a_0a*",
            "**_*_1.2_a_0a*",
            "**_*_1.3_a_0a*",
            "**_*_1.4_a_0a*",
            "**_*_1.5_a_0a*",
            "**_*_1.6_a_0a*",
        ],
        row2: [
            "**_h_2.0_a_0a*",
            "**_*_2.1_j_0a*",
            "**_*_2.2_j_0a*",
            "**_*_2.3_j_0a*",
            "**_*_2.4_j_0a*",
            "**_*_2.5_j_0a*",
            "**_*_2.6_a_0a*",
        ],
        row3: [
            "**_h_3.0_a_0a*",
            "**_*_3.1_j_0a*",
            "**_*_3.2_b_0a*",
            "**_*_3.3_j_0a*",
            "**_*_3.4_b_0a*",
            "**_*_3.5_j_0a*",
            "**_*_3.6_a_0a*",
        ],
        row4: [
            "**_*_4.0_a_0a*",
            "**_*_4.1_j_0a*",
            "**_*_4.2_j_0a*",
            "**_*_4.3_j_0a*",
            "**_*_4.4_j_0a*",
            "**_*_4.5_j_0a*",
            "**_*_4.6_a_0a*",
        ],
        row5: [
            "**_*_5.0_a_0a*",
            "**_*_5.1_a_0a*",
            "**_*_5.2_a_0a*",
            "**_*_5.3_a_0a*",
            "**_*_5.4_a_0a*",
            "**_*_5.5_a_0a*",
            "**_*_5.6_a_0a*",
        ],
        row6: [
            "**_*_6.0_a_0a*",
            "**_*_6.1_a_0a*",
            "**_*_6.2_a_0a*",
            "**_*_6.3_a_0a*",
            "**_*_6.4_a_0a*",
            "**_*_6.5_a_0a*",
            "**_*_6.6_a_0a*",
        ],
    },
    levelData3: {
        row0: ["**_a_0.0_a_0a*", "**_*_0.1_a_0a*", "**_*_0.2_a_0a*", "**_*_0.3_a_0a*"],
        row1: ["**_*_1.0_a_0a*", "**_*_1.1_a_0a*", "**_*_1.2_a_0a*", "**_*_1.3_a_0a*"],
        row2: ["**_*_2.0_a_0a*", "**_*_2.1_a_0a*", "**_b_2.2_a_0a*", "**_*_2.3_a_0a*"],
        row3: ["**_h_3.0_a_0a*", "**_*_3.1_a_0a*", "**_h_3.2_a_0a*", "**_*_3.3_a_0a*"],
    },
    terrainLevelDataRef: {
        a: {
            name: "grass",
            type: "grass",
            effect: "",
        },
        b: {
            name: "stone",
            type: "road",
            effect: "",
        },
        c: {
            name: "dirt",
            type: "road",
            effect: "",
        },
        d: {
            name: "pond",
            type: "shallow",
            effect: "",
        },
        e: {
            name: "mud",
            type: "sticky",
            effect: "",
        },
        f: {
            name: "sand",
            type: "sticky",
            effect: "",
        },
        g: {
            name: "ice",
            type: "slippery",
            effect: "",
        },
        h: {
            name: "lava",
            type: "hazard",
            effect: "",
        },
        i: {
            name: "bramble",
            type: "hazard",
            effect: "",
        },
        j: {
            name: "river",
            type: "deep",
            effect: "",
        },
        k: {
            name: "void",
            type: "void",
            effect: "void",
        },
    },
    terrainMoveSpeedRef: {
        shallow: 0.1,
        sticky: 0.05,
        slippery: 0.2,
    },

    // OBSTACLES HAVE MAX 5 ITEMS
    obstacleLevelDataRef: {
        a: {
        id: 0,
        trap: {
            state: false,
            persistent: false,
            remaining: 5,
            direction: "",
            target: {},
            timer: {
                enabled: false,
                state: false,
                count: 0,
                limit: 5,
            },
            trigger: {
                
            },
            action: "attack",
            acting: {
                state: false,
                count: 0,
                peak: 0,
                limit: 0,
                direction: "",
                directionType: "",
            },
            itemNameRef: "sword1",
            item: {},
            ammo: 0,
        },
        state: true,
        name: "chest1",
        type: "chest",
        hp: 5,
        destructible: {
            state: true,
            weapons: ["sword1", "spear1"],
            leaveRubble: false,
        },
        locked: {
            state: false,
            key: "",
        },
        weight: 1,
        height: 0.5,
        items: [],
        effects: [],
        moving: {
            state: false,
            step: 0,
            origin: {
                number: {
                    x: undefined,
                    y: undefined,
                },
                center: {
                    x: undefined,
                    y: undefined,
                },
            },
            destination: {
                number: {
                    x: undefined,
                    y: undefined,
                },
                center: {
                    x: undefined,
                    y: undefined,
                },
            },
            currentPosition: {
                x: undefined,
                y: undefined,
            },
            nextPosition: {
                x: undefined,
                y: undefined,
            },
            moveSpeed: 0,
            pushable: true,
            pushed: false,
            pusher: undefined,
            falling: {
                state: false,
                count: 0,
                limit: 25,
            },
        },
        },
        b: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 5,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "sword1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "table1",
            type: "table",
            hp: 1,
            destructible: {
                state: true,
                weapons: ["sword1", "bolt", "spear1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 0.5,
            items: [
                {
                    name: "sword1",
                    type: "weapon",
                    subType: "sword",
                    effect: "",
                },
            ],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        c: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 5,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                trigger: {
                    
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "closet1",
            type: "barrel",
            hp: 2,
            destructible: {
                state: false,
                weapons: ["sword1", "bolt", "spear1"],
                leaveRubble: true,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 0.5,
            height: 1,
            items: [
                {
                    name: "hpUp",
                    type: "item",
                    subType: "",
                    effect: "hpUp",
                },
                {
                    name: "sword1",
                    type: "weapon",
                    subType: "sword",
                    effect: "",
                },
            ],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        d: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "chair1",
            type: "chair",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 0.5,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        e: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "shelf1",
            type: "shelf",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 1,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        f: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "counter1",
            type: "counter",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 0.5,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        g: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "smallBox1",
            type: "smallBox",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 0.5,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        h: {
            id: 0,
            trap: {
                state: false,
                persistent: true,
                remaining: 5,
                direction: "",
                target: {},
                timer: {
                    enabled: true,
                    state: false,
                    count: 0,
                    limit: 65,
                },
                    trigger: {
                    type: "any",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "largeBox1",
            type: "largeBox",
            hp: 2,
            destructible: {
                state: false,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 1,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
        i: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                    trigger: {
                    type: "player",
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "closet2",
            type: "barrel",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1", "bolt", "spear1"],
                leaveRubble: true,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 1,
            items: [
                {
                    name: "hpUp",
                    type: "item",
                    subType: "",
                    effect: "hpUp",
                },
                {
                    name: "sword1",
                    type: "weapon",
                    subType: "sword",
                    effect: "",
                },
                {
                    name: "spear1",
                    type: "weapon",
                    subType: "spear",
                    effect: "",
                },
                {
                    name: "crossbow1",
                    type: "weapon",
                    subType: "crossbow",
                    effect: "ammo+5",
                },
                {
                    name: "ironPlate",
                    type: "armor",
                    subType: "mail",
                    effect: "hpUp",
                },
                {
                    name: "ammo10",
                    type: "item",
                    subType: "",
                    effect: "",
                },
            ],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
            },
        },
    },
    barrierLevelDataRef: {
        a: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                trigger: {
                    
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "wall1",
            type: "wall",
            hp: 2,
            destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            position: "",
            height: 1,
        },
        b: {
            id: 0,
            trap: {
                state: false,
                persistent: false,
                remaining: 0,
                direction: "",
                target: {},
                timer: {
                    enabled: false,
                    state: false,
                    count: 0,
                    limit: 5,
                },
                trigger: {
                    
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "crossbow1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "door1",
            type: "door",
            hp: 3,
            destructible: {
                state: true,
                weapons: ["sword1"],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            position: "",
            height: 1,
        },
        c: {
            id: 0,
            trap: {
                state: false,
                persistent: true,
                remaining: 5,
                direction: "",
                target: {},
                timer: {
                    enabled: true,
                    state: false,
                    count: 0,
                    limit: 65,
                },
                trigger: {
                    
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "sword1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "balcony1",
            type: "balcony",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1", "spear1", "bolt"],
                leaveRubble: true,
            },
            locked: {
                state: false,
                key: "",
            },
            position: "",
            height: 1,
        },
        d: {
            id: 0,
            trap: {
                state: false,
                persistent: true,
                remaining: 5,
                direction: "",
                target: {},
                timer: {
                    enabled: true,
                    state: false,
                    count: 0,
                    limit: 65,
                },
                trigger: {
                    
                },
                action: "attack",
                acting: {
                    state: false,
                    count: 0,
                    peak: 0,
                    limit: 0,
                    direction: "",
                    directionType: "",
                },
                itemNameRef: "sword1",
                item: {},
                ammo: 0,
            },
            state: true,
            name: "balconyX",
            type: "balcony",
            hp: 2,
            destructible: {
                state: true,
                weapons: ["sword1", "spear1", "bolt"],
                leaveRubble: true,
            },
            locked: {
                state: false,
                key: "",
            },
            position: "",
            height: 1,
        },
    },
    customTrapSetNewCustomTestData: [
        {
            persistent: false,
            remaining: 5,
            timerEnabled: true,
            timerLimit: 70,
            triggerType: "any",
            itemNameRef: "spear2",
            type: "obstacle",
            location: {
                x: 2,
                y: 3,
            },
        },
        {
            persistent: false,
            remaining: 15,
            timerEnabled: false,
            timerLimit: 0,
            triggerType: "any",
            itemNameRef: "crossbow1",
            type: "obstacle",
            location: {
                x: 3,
                y: 6,
            },
        },
    ],
    elevationTypeLevelDataRef: {
        a: "floor",
        b: "step",
        c: "ramp",
    },
    pathArray: [],

    // ITEMS
    itemList: [
        {
            name: "moveSpeedUp",
            amount: 5,
            total: 5,
            type: "item",
            effect: "speedUp",
        },
        {
            name: "moveSpeedDown",
            amount: 5,
            total: 5,
            type: "item",
            effect: "speedDown",
        },
        {
            name: "hpUp",
            amount: 4,
            total: 4,
            type: "item",
            effect: "hpUp",
        },
        {
            name: "hpDown",
            amount: 4,
            total: 4,
            type: "item",
            effect: "hpDown",
        },
        {
            name: "focusUp",
            amount: 4,
            total: 4,
            type: "item",
            effect: "focusUp",
        },
        {
            name: "focusDown",
            amount: 4,
            total: 4,
            type: "item",
            effect: "focusDown",
        },
        {
            name: "strengthUp",
            amount: 4,
            total: 4,
            type: "item",
            effect: "strengthUp",
        },
        {
            name: "strengthDown",
            amount: 4,
            total: 4,
            type: "item",
            effect: "strengthDown",
        },
        {
            name: "spear1",
            amount: 3,
            total: 3,
            type: "weapon",
            subType: "spear",
            effect: "",
        },
        {
            name: "spear2",
            amount: 3,
            total: 3,
            type: "weapon",
            subType: "spear",
            effect: "",
        },
        {
            name: "sword1",
            amount: 2,
            total: 2,
            type: "weapon",
            subType: "sword",
            effect: "",
        },
        {
            name: "sword2",
            amount: 2,
            total: 2,
            type: "weapon",
            subType: "sword",
            effect: "",
        },
        {
            name: "crossbow1",
            amount: 2,
            total: 2,
            type: "weapon",
            subType: "crossbow",
            effect: "ammo+5",
        },
        {
            name: "crossbow2",
            amount: 2,
            total: 2,
            type: "weapon",
            subType: "crossbow",
            effect: "ammo+7",
        },
        {
            name: "helmet1",
            amount: 3,
            total: 3,
            type: "armor",
            subType: "helmet",
            effect: "+10",
        },
        {
            name: "ironPlate",
            amount: 2,
            total: 2,
            type: "armor",
            subType: "mail",
            effect: "hpUp",
        },
        {
            name: "ninjaGi",
            amount: 2,
            total: 2,
            type: "armor",
            subType: "mail",
            effect: "snghit-5",
        },
        {
            name: "ghostMail",
            amount: 1,
            total: 1,
            type: "armor",
            subType: "mail",
            effect: "snghit-10",
        },
        {
            name: "speedGreaves",
            amount: 2,
            total: 2,
            type: "armor",
            subType: "greaves",
            effect: "speedUp",
        },
        {
            name: "ammo5",
            amount: 4,
            total: 4,
            type: "item",
            effect: "",
        },
        {
            name: "ammo10",
            amount: 2,
            total: 2,
            type: "item",
            effect: "",
        },
    ],
    disableInitItems: true,
    initItemList: [
        // {
        //   name: 'moveSpeedUp',
        //   type: 'item',
        //   effect: 'speedUp',
        // },
        // {
        //   name: 'moveSpeedDown',
        //   type: 'item',
        //   effect: 'speedDown',
        // },

        {
            name: "ammo5",
            type: "item",
            effect: "",
        },
        // {
        //   name: 'ammo10',
        //   type: 'item',
        //   effect: '',
        // },
        {
            name: "hpUp",
            type: "item",
            effect: "hpUp",
        },
        // {
        //   name: 'hpDown',
        //   type: 'item',
        //   effect: 'hpDown',
        // },
        {
            name: "spear1",
            type: "weapon",
            subType: "spear",
            effect: "",
        },
        // {
        //   name: 'sword2',
        //   type: 'weapon',
        //   subType: 'sword',
        //   effect: '',
        // },
        {
            name: "crossbow1",
            type: "weapon",
            subType: "crossbow",
            effect: "ammo+10",
        },
        // {
        //   name: 'ghostMail',
        //   type: 'armor',
        //   subType: 'mail',
        //   effect: 'snghit-5',
        // },
        {
            name: "speedGreaves",
            type: "armor",
            subType: "greaves",
            effect: "speedUp",
        },
        {
            name: "ironPlate",
            type: "armor",
            subType: "mail",
            effect: "hpUp",
        },
        // {
        //   name: 'helmet1',
        //   type: 'armor',
        //   subType: 'helmet',
        //   effect: '+10',
        // },
        // {
        //   name: 'helmet2',
        //   type: 'armor',
        //   subType: 'helmet',
        //   effect: '',
        // },
        {
            name: "strengthUp",
            type: "item",
            effect: "strengthUp",
        },
        {
            name: "strengthUp",
            type: "item",
            effect: "strengthUp",
        },
        // {
        //   name: 'hpUp',
        //   type: 'item',
        //   effect: 'hpUp',
        // },
        {
            name: "strengthUp",
            type: "item",
            effect: "strengthUp",
        },
        {
            name: "strengthUp",
            type: "item",
            effect: "strengthUp",
        },
    ],
    customItemPlacement: {
        state: true,
        cells: [
            { x: 0, y: 9 },
            { x: 0, y: 8 },
            { x: 0, y: 7 },
            { x: 0, y: 6 },
            { x: 1, y: 9 },
            { x: 1, y: 8 },
            { x: 1, y: 7 },
            { x: 1, y: 6 },
            { x: 2, y: 9 },
            { x: 2, y: 8 },
            { x: 2, y: 7 },
            { x: 2, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
            { x: 6, y: 6 },
        ],
    },

    // PLAYER
    playerNumber: 2,
    currentPlayer: 1,
    players: [
        {
            number: 1,
            startPosition: {
                cell: {
                    number: {
                        x: 0,
                        y: 6,
                    },
                    center: {
                        x: 0,
                        y: 0,
                    },
                },
            },
            currentPosition: {
                cell: {
                    number: {
                        x: 0,
                        y: 0,
                    },
                    center: {
                        x: 0,
                        y: 0,
                    },
                },
            },
            nextPosition: {
                x: 0,
                y: 0,
            },
            target: {
                cell1: {
                    number: {
                        x: 0,
                        y: 0,
                    },
                    center: {
                        x: 0,
                        y: 0,
                    },
                    free: true,
                    occupant: {
                        type: "",
                        player: "",
                    },
                    void: false,
                },
                cell2: {
                    number: {
                        x: 0,
                        y: 0,
                    },
                    center: {
                        x: 0,
                        y: 0,
                    },
                    free: true,
                    occupant: {
                        type: "",
                        player: "",
                    },
                    void: false,
                },
                myCellBlock: false,
            },
            direction: "east",
            turning: {
                state: false,
                toDirection: "",
                delayCount: 0,
                limit: 5.1,
            },
            turnCheckerDirection: "",
            action: "idle",
            moving: {
                state: false,
                step: 0,
                course: "",
                origin: {
                    number: {
                        x: 0,
                        y: 0,
                    },
                    center: {
                        x: 0,
                        y: 0,
                    },
                },
                destination: {
                    x: 0,
                    y: 0,
                },
            },
            newMoveDelay: {
                state: false,
                count: 0,
                limit: 15,
            },
            strafing: {
                state: false,
                direction: "",
            },
            strafeReleaseHook: false,
            moveCancel: {
                state: false,
                oldDirection: "",
                newDirection: "",
                returningTo: {},
                returningFrom: {},
            },
            flanking: {
                checking: false,
                preFlankDirection: "",
                direction: "",
                state: false,
                step: 0,
                target1: { x: 0, y: 0 },
                target2: { x: 0, y: 0 },
            },
            drowning: false,
            attacking: {
                state: false,
                count: 0,
                limit: 20,
                strength: 0,
                direction: "",
                directionType: "", //thrust or slash
                animRef: {},
                peak: false,
                charge: 0,
                chargePeak: false,
                peakCount: 0,
                blunt: false,
                clashing: {
                    state: false,
                    count: 0,
                    limit: 10,
                },
            },
            defending: {
                state: false,
                count: 0,
                limit: 4,
                animRef: {},
                peak: false,
                peakCount: 0,
                decay: {
                    state: false,
                    count: 0,
                    limit: 25,
                },
                direction: "",
                directionType: "", //thrust or slash
            },
            dodging: {
                countState: false,
                state: false,
                count: 0,
                limit: 20,
                peak: {
                    start: 8,
                    end: 12,
                },
                direction: "",
            },
            jumping: {
                checking: false,
                state: false,
            },
            success: {
                attackSuccess: {
                    state: false,
                    count: 0,
                    limit: 10,
                },
                defendSuccess: {
                    state: false,
                    count: 0,
                    limit: 10,
                },
                deflected: {
                    state: false,
                    count: 0,
                    limit: 20,
                    predeflect: false,
                    type: "",
                },
            },
            pushBack: {
                state: false,
                prePushBackMoveSpeed: 0,
            },
            halfPushBack: {
                state: false,
                direction: "",
                type: "",
                countUp: {
                    state: true,
                    count: 0,
                    limit: 0,
                },
                countDown: {
                    state: false,
                    count: 0,
                    limit: 0,
                },
                coords: {
                    x: undefined,
                    y: undefined,
                },
            },
            falling: {
                state: false,
                count: 0,
                limit: 10,
            },
            dead: {
                state: false,
                count: 0,
                limit: 10,
            },
            ghost: {
                state: false,
                position: {
                    cell: {
                        number: {
                            x: 0,
                            y: 0,
                        },
                        center: {
                            x: 0,
                            y: 0,
                        },
                    },
                },
            },
            respawn: false,
            points: 0,
            speed: {
                move: 0.1,
                range: [0.05, 0.1, 0.125, 0.2],
            },
            terrainMoveSpeed: {
                state: false,
                speed: 0,
            },
            hp: 2,
            currentWeapon: {
                name: "sword1",
                type: "sword",
                effect: "",
            },
            currentArmor: {
                name: "",
                type: "",
                effect: "",
            },
            items: {
                weaponIndex: 0,
                armorIndex: 0,
                weapons: [
                    {
                        name: "sword1",
                        type: "sword",
                        effect: "",
                    },
                ],
                armor: [],
                ammo: 20,
            },
            inventorySize: 4,
            cycleWeapon: {
                state: false,
                count: 0,
                limit: 3,
            },
            cycleArmor: {
                state: false,
                count: 0,
                limit: 3,
            },
            crits: {
                singleHit: 1,
                doubleHit: 6,
                pushBack: 4,
                guardBreak: 3,
                dodge: 0,
            },
            statusDisplay: {
                state: false,
                status: "",
                count: 0,
                limit: 15,
            },
            popups: [
                {
                    state: true,
                    count: 0,
                    limit: 0,
                    type: "",
                    position: "northWest",
                    msg: "",
                    img: "",
                },
            ],
            itemDrop: {
                state: false,
                count: 0,
                limit: 10,
                item: {
                    name: "",
                },
                gear: {
                    type: "",
                },
            },
            itemPickup: {
                state: false,
                count: 0,
                limit: 10,
                item: {
                    name: "",
                },
                gear: {
                    type: "",
                },
            },
            discardGear: {
                state: false,
                count: 0,
                limit: 8,
            },
            idleAnim: {
                state: false,
                count: 0,
                limit: 6,
            },
            actionDirectionAnimationArray: [],
            ai: {
                state: false,
                imgType: "",
                primaryMission: "",
                mission: "",
                prevMission: "",
                currentObjective: "",
                targetSet: false,
                targetAcquired: false,
                safeRange: true,
                pathArray: [],
                targetPlayer: {
                    number: 1,
                    currentPosition: {
                        x: undefined,
                        y: undefined,
                    },
                    target: {
                        number1: {
                            x: undefined,
                            y: undefined,
                        },
                        number2: {
                            x: undefined,
                            y: undefined,
                        },
                    },
                    action: "",
                },
                instructions: [],
                currentInstruction: 0,
                resetInstructions: false,
                patrolling: {
                    checkin: undefined,
                    state: false,
                    area: [],
                    loopControl: false,
                },
                defending: {
                    checkin: undefined,
                    state: false,
                    area: [],
                },
                persuing: {
                    state: false,
                },
                engaging: {
                    state: true,
                    targetAction: "",
                },
                retrieving: {
                    checkin: undefined,
                    state: false,
                    point: { x: undefined, y: undefined },
                    targetItem: {
                        name: "",
                        type: "",
                        subType: "",
                        effect: "",
                    },
                    safe: true,
                },
                retreating: {
                    checkin: undefined,
                    state: false,
                    point: { x: undefined, y: undefined },
                    level: 0,
                    safe: true,
                },
                organizing: {
                    weaponPriorityIndex: 0,
                    armorPriorityIndex: 0,
                    dropped: {
                        state: false,
                        gear: {
                        name: "",
                        type: "",
                        subType: "",
                        effect: "",
                        },
                    },
                },
                mode: "",
                upgradeWeapon: false,
                upgradeArmor: false,
                pathfindingRanges: {
                    spear: 3,
                    crossbow: 5,
                },
            },
            stamina: {
                current: 20,
                max: 20,
            },
            newPushPullDelay: {
                state: false,
                count: 0,
                limit: 10,
            },
            prePush: {
                state: false,
                count: 0,
                limit: 15,
                targetCell: undefined,
                direction: "",
                pusher: undefined,
            },
            pushing: {
                state: false,
                targetCell: undefined,
                moveSpeed: 0,
            },
            prePull: {
                state: false,
                count: 0,
                limit: 15,
                targetCell: undefined,
                direction: "",
                puller: undefined,
            },
            pulling: {
                state: false,
                targetCell: undefined,
                moveSpeed: 0,
            },
            postPull: {
                state: false,
                count: 0,
                limit: 10,
            },
            pushed: {
                state: false,
                pusher: 0,
                moveSpeed: 0,
            },
            pulled: {
                state: false,
                puller: 0,
                moveSpeed: 0,
            },
            elasticCounter: {
                preState: false,
                state: false,
                direction: "",
                type: "",
                subType: "",
                countUp: {
                    state: false,
                    count: 0,
                    limit: 6,
                },
                countDown: {
                    state: false,
                    count: 0,
                    limit: 6,
                },
                coords: {
                    x: undefined,
                    y: undefined,
                },
                pause: {
                    preState: false,
                    state: false,
                    type: "",
                    count: 0,
                    limit: 6,
                },
            },
            team: "Red",
            input: "Keyboard",
        },
        {
        number: 2,
        startPosition: {
            cell: {
                number: {
                    x: 2,
                    y: 6,
                },
                center: {
                    x: 0,
                    y: 0,
                },
            },
        },
        currentPosition: {
            cell: {
                number: {
                    x: 0,
                    y: 0,
                },
                center: {
                    x: 0,
                    y: 0,
                },
            },
        },
        nextPosition: {
            x: 0,
            y: 0,
        },
        target: {
            cell1: {
                number: {
                    x: 0,
                    y: 0,
                },
                center: {
                    x: 0,
                    y: 0,
                },
                free: true,
                occupant: {
                    type: "",
                    player: "",
                },
                void: false,
            },
            cell2: {
                number: {
                    x: 0,
                    y: 0,
                },
                center: {
                    x: 0,
                    y: 0,
                },
                free: true,
                occupant: {
                    type: "",
                    player: "",
                },
                void: false,
            },
            myCellBlock: false,
        },
        direction: "west",
        turning: {
            state: false,
            toDirection: "",
            delayCount: 0,
            limit: 5.1,
        },
        turnCheckerDirection: "",
        action: "idle",
        moving: {
            state: false,
            step: 0,
            course: "",
            origin: {
                number: {
                    x: 0,
                    y: 0,
                },
                center: {
                    x: 0,
                    y: 0,
                },
            },
            destination: {
                x: 0,
                y: 0,
            },
        },
        newMoveDelay: {
            state: false,
            count: 0,
            limit: 15,
        },
        strafing: {
            state: false,
            direction: "",
        },
        strafeReleaseHook: false,
        moveCancel: {
            state: false,
            oldDirection: "",
            newDirection: "",
            returningTo: {},
            returningFrom: {},
        },
        flanking: {
            checking: false,
            preFlankDirection: "",
            direction: "",
            state: false,
            step: 0,
            target1: { x: 0, y: 0 },
            target2: { x: 0, y: 0 },
        },
        attacking: {
            state: false,
            count: 0,
            limit: 20,
            strength: 0,
            direction: "",
            directionType: "", //thrust or slash
            animRef: {},
            peak: false,
            peakCount: 0,
            charge: 0,
            chargePeak: false,
            blunt: false,
            clashing: {
                state: false,
                count: 0,
                limit: 10,
            },
        },
        defending: {
            state: false,
            count: 0,
            limit: 4,
            animRef: {},
            peak: false,
            peakCount: 0,
            decay: {
                state: false,
                count: 0,
                limit: 25,
                },
                direction: "",
                directionType: "", //thrust or slash
        },
        drowning: false,
        dodging: {
            countState: false,
            state: false,
            count: 0,
            limit: 20,
            peak: {
                start: 8,
                end: 12,
            },
            direction: "",
        },
        jumping: {
            checking: false,
            state: false,
        },
        success: {
            attackSuccess: {
                state: false,
                count: 0,
                limit: 10,
            },
            defendSuccess: {
                state: false,
                count: 0,
                limit: 10,
            },
            deflected: {
                state: false,
                count: 0,
                limit: 20,
                predeflect: false,
                type: "",
            },
        },
        pushBack: {
            state: false,
            prePushBackMoveSpeed: 0,
        },
        halfPushBack: {
            state: false,
            direction: "",
            type: "",
            countUp: {
                state: true,
                count: 0,
                limit: 0,
            },
            countDown: {
                state: false,
                count: 0,
                limit: 0,
            },
            coords: {
                x: undefined,
                y: undefined,
            },
        },
        falling: {
            state: false,
            count: 0,
            limit: 10,
        },
        dead: {
            state: false,
            count: 0,
            limit: 10,
        },
        ghost: {
            state: false,
            position: {
                cell: {
                    number: {
                    x: 0,
                    y: 0,
                    },
                    center: {
                    x: 0,
                    y: 0,
                    },
                },
            },
        },
        respawn: false,
        points: 0,
        speed: {
            move: 0.1,
            range: [0.05, 0.1, 0.125, 0.2],
        },
        terrainMoveSpeed: {
            state: false,
            speed: 0,
        },
        hp: 2,
        currentWeapon: {
            name: "sword1",
            type: "sword",
            effect: "",
        },
        currentArmor: {
            name: "",
            type: "",
            effect: "",
        },
        items: {
            weaponIndex: 0,
            armorIndex: 0,
            weapons: [
                {
                    name: "sword1",
                    type: "sword",
                    effect: "",
                },
            ],
            armor: [],
            ammo: 0,
        },
        inventorySize: 4,
        cycleWeapon: {
            state: false,
            count: 0,
            limit: 3,
        },
        cycleArmor: {
            state: false,
            count: 0,
            limit: 3,
        },
        crits: {
            singleHit: 1,
            doubleHit: 6,
            pushBack: 4,
            guardBreak: 3,
            dodge: 0,
        },
        statusDisplay: {
            state: false,
            status: "",
            count: 0,
            limit: 15,
        },
        popups: [
            {
                state: true,
                count: 0,
                limit: 0,
                type: "",
                position: "northWest",
                msg: "",
                img: "",
            },
        ],
        itemDrop: {
            state: false,
            count: 0,
            limit: 10,
            item: {
                
            },
            gear: {
                
            },
        },
        itemPickup: {
            state: false,
            count: 0,
            limit: 10,
            item: {
                
            },
            gear: {
                
            },
        },
        discardGear: {
            state: false,
            count: 0,
            limit: 8,
        },
        idleAnim: {
            state: false,
            count: 0,
            limit: 6,
        },
        actionDirectionAnimationArray: [],
        ai: {
            state: false,
            imgType: "",
            primaryMission: "",
            mission: "",
            prevMission: "",
            currentObjective: "",
            targetSet: false,
            targetAcquired: false,
            safeRange: true,
            pathArray: [],
            targetPlayer: {
            number: 1,
            currentPosition: {
                x: undefined,
                y: undefined,
            },
            target: {
                number1: {
                    x: undefined,
                    y: undefined,
                },
                number2: {
                    x: undefined,
                    y: undefined,
                },
            },
            action: "",
            },
            instructions: [],
            currentInstruction: 0,
            resetInstructions: false,
            patrolling: {
                checkin: undefined,
                state: false,
                area: [],
                loopControl: false,
            },
            defending: {
                checkin: undefined,
                state: false,
                area: [],
            },
            persuing: {
                state: false,
            },
            engaging: {
                state: true,
                targetAction: "",
            },
            retrieving: {
                checkin: undefined,
                state: false,
                point: { x: undefined, y: undefined },
                targetItem: {
                    name: "",
                    type: "",
                    subType: "",
                    effect: "",
                },
                safe: true,
            },
            retreating: {
                checkin: undefined,
                state: false,
                point: { x: undefined, y: undefined },
                level: 0,
                safe: true,
            },
            organizing: {
                weaponPriorityIndex: 0,
                armorPriorityIndex: 0,
                dropped: {
                    state: false,
                    gear: {
                    name: "",
                    type: "",
                    subType: "",
                    effect: "",
                    },
                },
            },
            mode: "",
            upgradeWeapon: false,
            upgradeArmor: false,
            pathfindingRanges: {
                spear: 3,
                crossbow: 5,
            },
        },
        stamina: {
            current: 20,
            max: 20,
        },
        newPushPullDelay: {
            state: false,
            count: 0,
            limit: 10,
        },
        prePush: {
            state: false,
            count: 0,
            limit: 15,
            targetCell: undefined,
            direction: "",
            pusher: undefined,
        },
        pushing: {
            state: false,
            targetCell: undefined,
            moveSpeed: 0,
        },
        prePull: {
            state: false,
            count: 0,
            limit: 15,
            targetCell: undefined,
            direction: "",
            puller: undefined,
        },
        pulling: {
            state: false,
            targetCell: undefined,
            moveSpeed: 0,
        },
        postPull: {
            state: false,
            count: 0,
            limit: 10,
        },
        pushed: {
            state: false,
            pusher: 0,
            moveSpeed: 0,
        },
        pulled: {
            state: false,
            puller: 0,
            moveSpeed: 0,
        },
        elasticCounter: {
            preState: false,
            state: false,
            direction: "",
            type: "",
            subType: "",
            countUp: {
                state: false,
                count: 0,
                limit: 6,
            },
            countDown: {
                state: false,
                count: 0,
                limit: 6,
            },
            coords: {
                x: undefined,
                y: undefined,
            },
            pause: {
                preState: false,
                state: false,
                type: "",
                count: 0,
                limit: 6,
            },
        },
        team: "Blue",
        input: "Keyboard",
        },
    ],

    // INPUT
    gamepad: false,
    keyPressed: [
        {
            north: false,
            south: false,
            east: false,
            west: false,
            attack: false,
            defend: false,
            strafe: false,
            dodge: false,
            pull: false,
            kick: false,
            cycleWeapon: false,
            cycleArmor: false,
            discardWeapon: false,
            discardArmor: false,
            uiMenu: false,
            playerMenu: false,
            rotateRight: false,
            rotateLeft: false,
        },
        {
            north: false,
            south: false,
            east: false,
            west: false,
            attack: false,
            defend: false,
            strafe: false,
            dodge: false,
            pull: false,
            kick: false,
            cycleWeapon: false,
            cycleArmor: false,
            discardWeapon: false,
            discardArmor: false,
            uiMenu: false,
            playerMenu: false,
            rotateRight: false,
            rotateLeft: false,
        },
    ],
    clicked: {
        cell: {
        number: {
            x: 0,
            y: 0,
        },
        center: {
            x: 0,
            y: 0,
        },
        drawCenter: {
            x: 0,
            y: 0,
        },
        vertices: [
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
        ],
        side: 0,
        levelData: "",
        edge: {
            state: false,
            side: "",
        },
        terrain: {
            name: "",
            type: "",
            effect: "",
        },
        item: {
            name: "",
            type: "",
            subType: "",
            effect: "",
            initDrawn: false,
        },
        void: {
            state: false,
        },
        obstacle: {
            id: 0,
            trap: {},
            state: false,
            name: "",
            type: "",
            hp: 2,
            destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            weight: 1,
            height: 0.5,
            items: [],
            effects: [],
            moving: {
                state: false,
                step: 0,
                origin: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                destination: {
                    number: {
                        x: undefined,
                        y: undefined,
                    },
                    center: {
                        x: undefined,
                        y: undefined,
                    },
                },
                currentPosition: {
                    x: undefined,
                    y: undefined,
                },
                nextPosition: {
                    x: undefined,
                    y: undefined,
                },
                moveSpeed: 0,
                pushable: true,
                pushed: false,
                pusher: undefined,
                falling: {
                    state: false,
                    count: 0,
                    limit: 10,
                },
            },
        },
        barrier: {
            id: 0,
            trap: {},
            state: false,
            name: "",
            type: "",
            hp: 2,
            destructible: {
                state: false,
                weapons: [],
                leaveRubble: false,
            },
            locked: {
                state: false,
                key: "",
            },
            position: "",
            height: 1,
        },
        elevation: {
            number: 0,
            type: "",
            position: "",
        },
        rubble: false,
        },
        player: undefined,
    },
    turnCheckerDirection: "",

    // SETTINGS
    settingsGridWidth: 9,
    settingsCanvasHeight: 500,
    settingsCanvasWidth: 700,
    settingsSceneX: 250,
    settingsSceneY: 40,
    settingsClicked: {
        number: {
            x: 0,
            y: 0,
        },
        center: {
            x: 0,
            y: 0,
        },
        drawCenter: {
            x: 0,
            y: 0,
        },
        vertices: [
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
            {
                x: 0,
                y: 0,
            },
        ],
        side: 0,
        levelData: "",
        edge: {
            state: false,
            side: "",
        },
        terrain: {
            name: "",
            type: "",
            effect: "",
        },
        item: {
            name: "",
            type: "",
            subType: "",
            effect: "",
            initDrawn: false,
        },
        void: {
            
        },
        obstacle: {
        id: 0,
        trap: {},
        state: false,
        name: "",
        type: "",
        hp: 2,
        destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
        },
        locked: {
            state: false,
            key: "",
        },
        weight: 1,
        height: 0.5,
        items: [],
        effects: [],
        moving: {
            state: false,
            step: 0,
            origin: {
            number: {
                x: undefined,
                y: undefined,
            },
            center: {
                x: undefined,
                y: undefined,
            },
            },
            destination: {
            number: {
                x: undefined,
                y: undefined,
            },
            center: {
                x: undefined,
                y: undefined,
            },
            },
            currentPosition: {
                x: undefined,
                y: undefined,
            },
            nextPosition: {
                x: undefined,
                y: undefined,
            },
            moveSpeed: 0,
            pushable: true,
            pushed: false,
            pusher: undefined,
            falling: {
                state: false,
                count: 0,
                limit: 10,
            },
        },
        },
        barrier: {
        id: 0,
        trap: {},
        state: false,
        name: "",
        type: "",
        hp: 2,
        destructible: {
            state: false,
            weapons: [],
            leaveRubble: false,
        },
        locked: {
            state: false,
            key: "",
        },
        position: "",
        height: 1,
        },
        elevation: {
            number: 0,
            type: "",
            position: "",
        },
        rubble: false,
    },
    settingsFormAiGridInfo: [],
    settingsFormAiStartPosList: [],
    updateSettingsFormAiDataData: {},
    settingsFormPlyrGridInfo: [],
    settingsFormPlyrStartPosList: [],
    settingsFormPlayerData: {},
    showSettingsKeyPress: {
        state: false,
        count: 0,
        limit: 4,
    },
    showSettingsCanvasData: {
        state: true,
        field: "human_start",
        plyrNo: 1,
        type: "start",
    },
    gamepadConfig: [],
    connectedGamepadsInit: false,

    // CELL INFO
    showCellInfoBox: false,
    mouseOverCell: {
        state: false,
        cell: undefined,
        count: 0,
        threshold: 40,
    },
    mousedOverCellCoords: {
        x: undefined,
        y: undefined,
    },
    mouseMoving: false,
    mouseOverCellSwitchOff: {
        state: false,
        count: 0,
        limit: 100,
    },
    cellInfoMouseOver: false,
    cursorCoords: {},

    //LOOP & ANIMATION
    stepper: {
        now: 0,
        dt: 0,
        last: 0,
        step: 1 / 60,
        fps: 0,

        secondsPassed: 0,
        oldTimeStamp: 0,
        movingSpeed: 30,
        frameCount: 0,

        fps2: 30,
        interval: 1000 / 30,
        lastTime: 0,
        currentTime: new Date().getTime(),
        deltaTime: 0,
    },
    moveStepRef: [
        [
            0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75,
            0.8, 0.85, 0.9, 0.95, 1,
        ],
        [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
        [0.2, 0.4, 0.6, 0.8, 1],
    ],
    actionAnimFrameTypeCountRef: {
        attacking: {
            typeCount: 7,
            sheetLength: 70,
        },
        defending: {
            typeCount: 5,
            sheetLength: 50,
        },
    },
    attackAnimRef: {
        limit: {
        unarmed: {
            thrust: {
                normal: 30,
                charged: 40,
            },
            slash: {
                normal: 35,
                charged: 45,
            },
        },
        sword: {
            thrust: {
                normal: 40,
                charged: 50,
            },
            slash: {
                normal: 45,
                charged: 55,
            },
        },
        spear: {
            thrust: {
                normal: 50,
                charged: 60,
            },
            slash: {
                normal: 55,
                charged: 65,
            },
        },
        crossbow: {
            thrust: {
                normal: 40,
                charged: 50,
            },
            slash: {
                normal: 50,
                charged: 60,
            },
        },
        },
        peak: {
        unarmed: {
            thrust: {
                normal: 15,
                charged: 25,
            },
            slash: {
                normal: 20,
                charged: 30,
            },
        },
        sword: {
            thrust: {
                normal: 25,
                charged: 35,
            },
            slash: {
                normal: 30,
                charged: 40,
            },
        },
        spear: {
            thrust: {
                normal: 35,
                charged: 45,
            },
            slash: {
                normal: 40,
                charged: 50,
            },
        },
        crossbow: {
            thrust: {
                normal: 35,
                charged: 45,
            },
            slash: {
                normal: 35,
                charged: 45,
            },
        },
        },
    },
    obstacleBarrierTrapAttackAnimRef: {
        limit: {
            sword: 25,
            spear: 30,
            crossbow: 30,
        },
        peak: {
            sword: 15,
            spear: 20,
            crossbow: 20,
        },
    },
    defendAnimRef: {
        limit: {
            unarmed: {
                thrust: 20,
                slash: 20,
            },
            sword: {
                thrust: 30,
                slash: 30,
            },
            spear: {
                thrust: 40,
                slash: 40,
            },
            crossbow: {
                thrust: 30,
                slash: 30,
            },
        },
        peak: {
            unarmed: {
                thrust: 11,
                slash: 11,
                // 7
            },
            sword: {
                thrust: 15,
                slash: 15,
                // 12
            },
            spear: {
                thrust: 20,
                slash: 20,
                // 17
            },
            crossbow: {
                thrust: 17,
                slash: 17,
            },
        },
    },
    staminaCostRef: {
        attack: {
        unarmed: {
            blunt: {
                pre: 1,
                peak: 2,
            },
            normal: {
                pre: 1,
                peak: 2,
            },
        },
        sword: {
            blunt: {
                pre: 2,
                peak: 3,
            },
            normal: {
                pre: 2,
                peak: 3,
            },
        },
        spear: {
            blunt: {
                pre: 2,
                peak: 4,
            },
            normal: {
                pre: 2,
                peak: 4,
            },
        },
        crossbow: {
            blunt: {
                pre: 1,
                peak: 3,
            },
            normal: {
                pre: 1,
                peak: 3,
            },
        },
        },
        deflected: {
            outOfStamina: 0,
            attacked: 3,
            bluntAttacked: 2,
            defended: 3,
            parried: 5,
            knockedOut: 0,
        },
        defend: {
            pre: 1.5,
            peak: 2,
        },
        dodge: {
            pre: 2,
            peak: 4,
        },
        flank: 5,
        jump: 6,
        pushBack: 7,
        push: 3,
        pull: 4,
        move: 0.1,
        strafe: 0.5,
        turn: 0.5,
    },
    deflectedLengthRef: {
        outOfStamina: 50,
        attacked: 18,
        bluntAttacked: 23,
        defended: 10,
        parried: 25,
        knockedOut: 65,
    },
    baseDodgeCountRef: {
        limit: 20,
        peak: {
            start: 8,
            end: 12,
        },
    },
    simultaneousAttackAllowance: 2,
    defendPeakAllowance: 2,
    projectiles: [],
    projectileSpeed: 0.1,
    cellsUnderAttack: [],
    cellsUnderPreAttack: [],
    cellsToHighlight: [],
    cellsToHighlight2: [],
    gamepadPollCounter: {
        count1: 0,
        count2: 0,
        store1: [],
        store2: [],
    },
    charSpriteHeight: 100,
    charSpriteWidth: 60,
    playerColourRef: {
        player1: "red",
        player2: "blue",
        player3: "green",
        player4: "purple",
        player5: "orange",
        player6: "brown",
        player7: "",
        player8: "",
    },
    playerDrawWidth: 45,
    playerDrawHeight: 45,
    playerDrawWidth2: 55,
    playerDrawHeight2: 85,
    popupSize: 45,
    popupImgSize: 25,
    movingObstacles: [],
    halfPushBackObstacles: [],
    obstacleBarrierActionAnimationArray: [],

    obstacleBarrierToDestroy: [],
    obstacleItemsToDrop: [],
    obstaclesOutOfBoundsFall: [],
    cellPopups: [],
    popupImageRef: {},
    indicatorImgs: {},
    playerImgs: [],
    itemImgs: {},
    boltImgs: {},
    floorImgs: {},
    obstacleImgs: {},
    barrierImgs: {},
    cellColorRef: [],
    popupProgressBorderSvgPath: "",
    popupProgressImgGradColor1: "rgb(255,0,0)",
    popupProgressImgGradColor2: "rgb(255,255,0)",

    currentPlayerDrawCell: null,
    halfPushBackChaining: true,
    halfPushBackChainingMoveAll: true,

    showPlayerOutlines: false,
    showGridIsoGuide: false,
    showDirectionalActionAnimation: true,
    hideAllPopups: false,
    hideDirectionalActionPopus: true,
    directionalAnimShape: "ringSection",

    backgroundImageRef: {},

    // CAMERA
    toggleCameraMode: false,
    camera: {
        state: false,
        startCount: 0,
        startLimit: 4,
        mode: "pan",
        fixed: false,
        target: {
            type: "player",
            plyrNo: 1,
            cell: {
                x: undefined,
                y: undefined,
            },
        },
        focus: {
            x: undefined,
            y: undefined,
        },
        focusCell: {
            x: 4,
            y: 4,
        },
        cellToPanOrigin: {
            x: 4,
            y: 4,
        },
        zoom: {
            x: 1,
            y: 1,
        },
        zoomDirection: "in",
        pan: {
            x: 1,
            y: 1,
        },
        panDirection: "east",
        adjustedPan: {
            x: -1,
            y: -1,
        },
        zoomFocusPan: {
            x: -1,
            y: -1,
        },
        limits: {
            zoom: {
                min: 0.5,
                max: 2.5,
            },
            pan: {
                x: {
                min: -400,
                max: 400,
                },
                y: {
                min: -200,
                max: 200,
                },
            },
            state: {
                count: 0,
                limit: 10,
                zoom: false,
                pan: false,
            },
        },
        instructionType: "default",
        currentPreInstruction: 0,
        preInstructions: [],
        currentInstruction: 0,
        instructions: [],
        customView: {
            state: false,
            zoom: 0,
            pan: {
                x: 0,
                y: 0,
            },
            keyPressCount: {
                start: 0,
                limit: 4,
            },
        },
    },
    cameraInstructionRef: {
        default: {},
        story: {},
        // FollowPlayer2, centerOnCell21 etc
    },
    resetCameraSwitch: false,
    setInitZoom: {
        state: false,
        windowWidth: 0,
        gridWidth: 0,
        count: 0,
        limit: 0,
    },
    engagedZoomThreshold: {
        melee: 0.5,
        ranged: 0.1,
    },
    settingAutoCamera: false,
    settingAutoCameraFollowBolt: false,
    highlightZoomPanFocusCell: true,
    zoomThresh: -0.05,
    // zoomThresh: -0.15,
    autoCamPanWaitingForPath: false,

    // AI
    aiInitSettings: {
        randomStart: false,
        startPosition: {
            
        },
        primaryMission: "defend",
        mission: undefined,
        mode: "careful",
        partolArea: [
            { x: 8, y: 6 },
            // {x: 7, y: 4}
        ],
        weapons: [],
        armor: [],
        team: "",
    },
    addAiPlayerKeyPress: false,
    addAiCount: {
        state: false,
        count: 0,
        limit: 10,
    },
    aiPlayers: [],
    aiTarget: 1,
    resetAiTarget: {
        state: false,
        state2: false,
        player: 1,
        count: 0,
        limit: 25,
    },
    allPlayersDead: false,
    removeAi: undefined,
    easyStar: undefined,
    getPath: false,
    aiDeflectCheck: false,
    aiDeflectedCheck: [],

    bloodSacrificeEvent: {
        state: false,
        count: 0,
        limit: 100,
        restore: false,
    },
    bloodSacrificeVoidedCells: [],

    testDraw: [],
    testData: "",
    testCount: {
        state: false,
        count: 0,
        limit: 0,
    },
  });

  useEffect(() => {
    console.log("GameContext state changed:", state);
  }, [state]);

  function updateNestedState(obj, path, value) {
    if (path.length === 1) {
        return { ...obj, [path[0]]: value };
    }
    const [head, ...rest] = path;
    return {
        ...obj,
        [head]: updateNestedState(obj[head] || {}, rest, value),
    };
  }

    function checkCell(cell, include) {
        return checkCellUtil(state, cell, include);
    }

    function cartesianToIsometric(x, y) {
        return cartesianToIsometricUtil(state, x, y);
    }

    function rnJesus(min, max) {
        return rnJesusUtil(min, max);
    }



  return (
    // <GameContext.Provider value={{ state, setState }}>
    <GameContext.Provider
      value={{
        context: state,
        setState,
        updateNestedState,
        cartesianToIsometric,
        checkCell,
        rnJesus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};