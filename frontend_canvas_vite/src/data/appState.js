import React from "react";
import { levelDataPresets } from "./levelDataPresets";
import { playerDataArray } from "./playerDataArray";
import { itemDataArray } from "./itemDataArray";
import { obstacleBarrierDataRefs } from "./obstacleBarrierDataRefs";
import { assetRefs } from "./assetRefs";

export const initialState = {
  showSettings: true,
  showAiStatus: false,
  showDebugMenu: false,
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
};

export function applyConstructorDefaults(app) {
  app.time = 0;
  app.canvasRef = React.createRef();
  app.canvasRef2 = React.createRef();

  // SETTINGS CANVASES
  app.canvasRef3 = React.createRef();
  app.canvasRef4 = React.createRef();

  app.cellInfoBoxRef = React.createRef();

  app.debugBoxStyle = "debugDisplay closedDebug";
  app.debugBoxStyle2 = "debugDisplay2 closedDebug";

  // LEVEL DRAW SETUP
  app.tileColumnOffset = 100; // pixels
  app.tileRowOffset = 50; // pixels
  app.originX = 0; // offset from left
  app.originY = 0; // offset from top
  app.Xtiles = 10;
  app.Ytiles = 10;
  app.showCoordinates = true;
  app.selectedTileX = -1;
  app.selectedTileY = -1;

  app.canvasWidth = 1300;
  app.canvasHeight = 790;

  // app.canvasWidth = 1000;
  // app.canvasHeight = 600;

  app.floorImageWidth = 103;
  app.floorImageHeight = 53;

  app.wallImageWidth = 103;
  app.wallImageHeight = 98;
  app.sceneY = 220;
  app.tileWidth = 50;
  app.gridWidth = 9;

  app.cellCenterOffsetX = 23;
  app.cellCenterOffsetY = 2;

  // '**_*_0.0_a_0**'
  // barrierType(a,b,c)BarrierPosition(n,s,e,w)_obstacle_x.y_terrain_elevationNumber(0,1,2)ElevationType(a,b,c)ElevationPosition(n,s,e,w)

  // GRIND INFO, LEVEL DATA & MAPPING
  app.init = false;
  // app.openVoid = true;
  app.openVoid = false;
  app.cellToVoid = {
    state: false,
    x: 0,
    y: 0,
    count: 0,
    limit: 35,
  };
  app.voidTimer = {
    count: 0,
    limit: 10000,
  };
  app.voidCustomCell = false;
  app.gridInfo = [];
  app.settingsGridInfo = [];
  app.gridInfo2D = [];
  app.gridInfo2 = [];
  app.gridInfo2D2 = [];
  app.levelData = [
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
  ];
  Object.assign(app, levelDataPresets);
  app.terrainLevelDataRef = {
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
  };
  app.terrainMoveSpeedRef = {
    shallow: 0.1,
    sticky: 0.05,
    slippery: 0.2,
  };

  // OBSTACLES HAVE MAX 5 ITEMS
  Object.assign(app, obstacleBarrierDataRefs);
  app.customTrapSetNewCustomTestData = [
    {
      persistent: true,
      remaining: 5,
      timerEnabled: true,
      timerLimit: 65,
      triggerType: "any",
      itemNameRef: "sword1",
      type: "barrier",
      direction: "west",
      location: {
        x: 3,
        y: 4,
      },
    },
    {
      persistent: true,
      remaining: 15,
      timerEnabled: true,
      timerLimit: 30,
      triggerType: "any",
      itemNameRef: "spear1",
      type: "obstacle",
      direction: "west",
      location: {
        x: 4,
        y: 1,
      },
      // target: {
      //   x: 0,
      //   y: 1,
      // },
    },
  ];
  app.elevationTypeLevelDataRef = {
    a: "floor",
    b: "step",
    c: "ramp",
  };

  app.pathArray = [];

  // ITEMS
  app.itemList = itemDataArray;
  app.disableInitItems = true;
  app.initItemList = [
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
  ];
  app.customItemPlacement = {
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
  };

  // PLAYER
  app.playerNumber = 2;
  app.currentPlayer = 1;
  app.players = playerDataArray;

  // INPUT
  app.gamepad = false;
  app.keyPressed = [
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
  ];
  app.clicked = {
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
  };
  app.turnCheckerDirection = "";

  // SETTINGS
  app.settingsGridWidth = 9;
  app.settingsCanvasHeight = 500;
  app.settingsCanvasWidth = 700;
  app.settingsSceneX = 250;
  app.settingsSceneY = 40;
  app.settingsClicked = {
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
  };
  app.settingsFormAiGridInfo = [];
  app.settingsFormAiStartPosList = [];
  app.updateSettingsFormAiDataData = {};
  app.settingsFormPlyrGridInfo = [];
  app.settingsFormPlyrStartPosList = [];
  app.settingsFormPlayerData = {};
  app.showSettingsKeyPress = {
    state: false,
    count: 0,
    limit: 4,
  };
  app.showSettingsCanvasData = {
    state: true,
    field: "human_start",
    plyrNo: 1,
    type: "start",
  };
  app.gamepadConfig = [];
  app.connectedGamepadsInit = false;

  app.loggingSettings = {
    showTime: true,
    showOrigin: false,
    player: {
      movement: false,
      movement_count: false,
      turning: false,
      jumping: false,
      attacking: {
        melee: false,
        projectile: false,
        charge: false,
        feint: false,
        count: false,
      },
      defending: {
        peak: false,
        off_peak: false,
        count: false,
      },
      dodging: false,
      flanking: false,
      pushing: false,
      pulling: false,
      itemUse: false,
      pushBack: false,
      deflection: false,
      stamina: false,
    },
    ai: {
      spawn: true,
      mission: false,
      pathing: false,
      target: false,
      evaluate: false,
      decide: false,
      act: false,
    },
    camera: {
      mode: false,
      zoom: false,
      pan: false,
      auto: false,
      reset: false,
    },
    obstacle: {
      moving: false,
      falling: false,
      pushBack: false,
      trapTriggers: false,
      attacking: false,
      attacked: false,
    },
    barrier: {
      trapTriggers: false,
      attacking: false,
      attacked: false,
    },
    trap: {
      trigger: false,
      timer: false,
      action: false,
    },
    grid: {
      init: false,
      process: false,
    },
    items: {
      spawn: false,
      pickup: false,
      discard: false,
      use: false,
      switch: false,
      attacked: false,
    },
  };

  // CELL INFO
  app.showCellInfoBox = false;
  app.mouseOverCell = {
    state: false,
    cell: undefined,
    count: 0,
    threshold: 40,
  };
  app.mousedOverCellCoords = {
    x: undefined,
    y: undefined,
  };
  app.mouseMoving = false;
  app.mouseOverCellSwitchOff = {
    state: false,
    count: 0,
    limit: 100,
  };
  app.cellInfoMouseOver = false;
  app.cursorCoords = {};

  //LOOP & ANIMATION
  app.stepper = {
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
  };
  app.moveStepRef = [
    [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
    [0.2, 0.4, 0.6, 0.8, 1],
  ];
  app.actionAnimFrameTypeCountRef = {
    attacking: {
      typeCount: 7,
      sheetLength: 70,
    },
    defending: {
      typeCount: 5,
      sheetLength: 50,
    },
  };
  app.attackAnimRef = {
    limit: {
      unarmed: {
        thrust: 30,
        slash: 35,
      },
      sword: {
        thrust: 40,
        slash: 45,
      },
      spear: {
        thrust: 50,
        slash: 55,
      },
      crossbow: {
        thrust: 40,
        slash: 50,
      },
    },
    peak: {
      unarmed: {
        thrust: 15,
        slash: 20,
      },
      sword: {
        thrust: 25,
        slash: 30,
      },
      spear: {
        thrust: 35,
        slash: 40,
      },
      crossbow: {
        thrust: 35,
        slash: 35,
      },
    },
    baseClashingLimit: 10,
    baseMaxCharge: 15,
    effectivenessAllowances: {
      min: 3,
      max: 10,
    },
  };
  app.obstacleBarrierTrapAttackAnimRef = {
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
  };
  app.defendAnimRef = {
    limit: {
      unarmed: {
        thrust: 40,
        slash: 40,
      },
      sword: {
        thrust: 45,
        slash: 45,
      },
      spear: {
        thrust: 50,
        slash: 50,
      },
      crossbow: {
        thrust: 47,
        slash: 47,
      },
    },
    peak: {
      unarmed: {
        thrust: 10,
        slash: 10,
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
  };
  app.staminaCostRef = {
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
  };
  app.deflectedLengthRef = {
    outOfStamina: 50,
    attacked: 18,
    bluntAttacked: 23,
    defended: 10,
    parried: 25,
    knockedOut: 65,
  };
  app.baseDodgeCountRef = {
    limit: 20,
    peak: {
      start: 8,
      end: 12,
    },
  };
  app.simultaneousAttackAllowance = 2;
  app.defendPeakAllowance = 2;
  app.projectiles = [];
  app.projectileSpeed = 0.1;
  app.cellsUnderAttack = [];
  app.cellsUnderPreAttack = [];
  app.cellsToHighlight = [];
  app.cellsToHighlight2 = [];
  app.gamepadPollCounter = {
    count1: 0,
    count2: 0,
    store1: [],
    store2: [],
  };
  app.charSpriteHeight = 100;
  app.charSpriteWidth = 60;
  app.playerColourRef = {
    player1: "red",
    player2: "blue",
    player3: "green",
    player4: "purple",
    player5: "orange",
    player6: "brown",
    player7: "",
    player8: "",
  };
  app.playerDrawWidth = 45;
  app.playerDrawHeight = 45;
  app.playerDrawWidth2 = 55;
  app.playerDrawHeight2 = 85;
  app.popupSize = 45;
  app.popupImgSize = 25;
  app.movingObstacles = [];
  app.halfPushBackObstacles = [];
  app.obstacleBarrierActionAnimationArray = [];

  app.obstacleBarrierToDestroy = [];
  app.obstacleItemsToDrop = [];
  app.obstaclesOutOfBoundsFall = [];
  app.cellPopups = [];
  app.popupImageRef = {};
  app.indicatorImgs = {};
  app.playerImgs = [];
  app.itemImgs = {};
  app.boltImgs = {};
  app.floorImgs = {};
  app.obstacleImgs = {};
  app.barrierImgs = {};
  app.cellColorRef = [];
  app.popupProgressBorderSvgPath = "";
  app.popupProgressImgGradColor1 = "rgb(255,0,0)";
  app.popupProgressImgGradColor2 = "rgb(255,255,0)";

  app.currentPlayerDrawCell;
  app.halfPushBackChaining = true;
  app.halfPushBackChainingMoveAll = true;

  app.showPlayerOutlines = false;
  app.showGridIsoGuide = false;
  app.showDirectionalActionAnimation = true;
  app.hideAllPopups = false;
  app.hideDirectionalActionPopus = true;
  app.directionalAnimShape = "ringSection";

  app.backgroundImageRef = {};

  // CAMERA
  app.toggleCameraMode = false;
  app.camera = {
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
  };
  app.cameraInstructionRef = {
    default: {},
    story: {},
    // FollowPlayer2, centerOnCell21 etc
  };
  app.resetCameraSwitch = false;
  app.setInitZoom = {
    state: false,
    windowWidth: 0,
    gridWidth: 0,
    count: 0,
    limit: 0,
  };
  app.engagedZoomThreshold = {
    melee: 0.5,
    ranged: 0.1,
  };
  app.settingAutoCamera = false;
  app.settingAutoCameraFollowBolt = false;
  app.highlightZoomPanFocusCell = true;
  app.zoomThresh = -0.05;
  // app.zoomThresh = -0.15;
  app.autoCamPanWaitingForPath = false;

  // AI
  app.aiInitSettings = {
    randomStart: true,
    startPosition: {
      number: { x: 1, y: 7 },
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
  };
  app.addAiPlayerKeyPress = false;
  app.addAiCount = {
    state: false,
    count: 0,
    limit: 10,
  };
  app.aiPlayers = [];
  app.aiTarget = 1;
  app.resetAiTarget = {
    state: false,
    state2: false,
    player: 1,
    count: 0,
    limit: 25,
  };
  app.allPlayersDead = false;
  app.removeAi = undefined;
  app.easyStar = undefined;
  app.getPath = false;
  app.aiDeflectCheck = false;
  app.aiDeflectedCheck = [];

  app.bloodSacrificeEvent = {
    state: false,
    count: 0,
    limit: 100,
    restore: false,
  };
  app.bloodSacrificeVoidedCells = [];

  app.testDraw = [];
  app.testData = "";
  app.testCount = {
    state: false,
    count: 0,
    limit: 0,
  };

  Object.assign(app, assetRefs);
}
