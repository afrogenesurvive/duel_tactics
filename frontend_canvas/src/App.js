import React, { Component } from 'react';
import Easystar from 'easystarjs';
import Pathfinding from 'pathfinding';
import { AStarFinder } from "astar-typescript";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faRobot,
  faVideo,
  faSearchPlus,
  faExpandAlt,
  faUndo,
  faQuestionCircle,
  faBorderAll,
  faChessBoard,
} from '@fortawesome/free-solid-svg-icons';


import logo from './logo.svg';
import floorDirt from './assets/floorDirt.png'
import floorGrass from './assets/floorGrass.png'
import floorIce from './assets/floorIce.png'
import floorMud from './assets/floorMud.png'
import floorPond from './assets/floorPond.png'
import floorRiver from './assets/floorRiver.png'
import floorSand from './assets/floorSand.png'
import floorStone from './assets/floorStone.png'
import floorBramble from './assets/floorBramble.png'
import floorLava from './assets/floorLava.png'
import floorAttack from './assets/floorAttacked.png'
import floorVoid from './assets/floorVoid.png'
import floorVoid2 from './assets/floorVoid2.png'
import floorVoid3 from './assets/floorVoid3.png'
import wall from './assets/wall.png'
import wall2 from './assets/wall2.png'
import wall3 from './assets/wall3.png'


import attack1Indicate from './assets/indicators/attack1.png';
import attack2Indicate from './assets/indicators/attack2.png';
import attack3Indicate from './assets/indicators/attacky.png';
import attackUnarmedIndicate from './assets/items/unarmed.png';
import attackBluntIndicate from './assets/indicators/blunt.png';
import attackSuccessIndicate from './assets/indicators/attackSuccess.png';
import missedIndicate from './assets/indicators/miss.png';
import defendIndicate from './assets/indicators/defend.png';
import defendIndicate1 from './assets/indicators/defend3.png';
import defendIndicate2 from './assets/indicators/defend4.png';
import defendIndicate3 from './assets/indicators/defend5.png';
import defendIndicate4 from './assets/indicators/defend6.png';
import deflectIndicate from './assets/indicators/deflect.png';
import deflectIndicate2 from './assets/indicators/deflect2.png';
import deflectInjuredIndicate from './assets/indicators/deflectInjured2.png';
import deflectBluntIndicate from './assets/indicators/death2.png';
import pushbackIndicate from './assets/indicators/pushback.png';
import ghostIndicate from './assets/indicators/ghost.png';
import deathIndicate from './assets/indicators/death.png';
import preAttackIndicate from './assets/indicators/preAttack.png';


import preAttack2Indicate from './assets/indicators/preAttack2.png';
import preAction1Indicate from './assets/indicators/preAction1.png';
import preAction2Indicate from './assets/indicators/preAction2.png';
import attackBreakIndicate from './assets/indicators/attackBreak.png';
import defendBreakIndicate from './assets/indicators/defendBreak.png';
import boltDefendIndicate from './assets/indicators/boltDefend.png';
import dodgeIndicate from './assets/indicators/dodge.png';
import fallingIndicate from './assets/indicators/falling.png';
import completeMissionIndicate from './assets/indicators/complete.png';
import flankIndicate from './assets/indicators/flank.png';
import attackBluntIndicate2 from './assets/indicators/blunt2.png';
import enrouteIndicate from './assets/indicators/enroute.png';
import targetSwitchIndicate from './assets/indicators/targetSwitch.png';
import pathSwitchIndicate from './assets/indicators/pathSwitch.svg';
import retreatIndicate from './assets/indicators/retreat.png';
import defendSuccessIndicate from './assets/indicators/defendSuccess.png';
import aggressiveModeIndicate from './assets/indicators/angry.png';
import passiveModeIndicate from './assets/indicators/meditation.png';
import thinkingIndicate from './assets/indicators/mind.png';
import defendMissionIndicate from './assets/indicators/police.png';
import patrolMissionIndicate from './assets/indicators/location.png';
import pursueMissionIndicate from './assets/indicators/treasure-map.png';
import pursueMissionIndicate2 from './assets/indicators/missionPursue.png';
import retrieveMissionIndicate from './assets/indicators/treasure.png';
import drowningIndicate from './assets/indicators/drown.png';
import destroyedItemIndicate from './assets/indicators/destroyedItem.png';
import pickupBuffIndicate from './assets/indicators/pickupBuff.png';
import pickupDebuffIndicate from './assets/indicators/pickupDebuff.png';
import pickupWeaponIndicate from './assets/indicators/pickupWeapon.png';
import dropWeaponIndicate from './assets/indicators/dropWeapon.png';
import dropArmorIndicate from './assets/indicators/dropArmor.png';
import pickupArmorIndicate from './assets/indicators/pickupArmor.png';
import pickupAmmoIndicate from './assets/indicators/pickupAmmo.png';
import terrainSpeedupIndicate from './assets/indicators/terrainSpeedup.png';
import terrainSlowdownIndicate from './assets/indicators/terrainSlowdown.png';
import terrainInjuredIndicate from './assets/indicators/terrainInjured.png';
import outOfStaminaIndicate from './assets/indicators/outOfStamina.png';
import boltKilledIndicate from './assets/indicators/boltKilled.png';
import attackParriedIndicate from './assets/indicators/attackParried.png';
import inventoryFullIndicate from './assets/indicators/inventoryFull.png';
import outOfAmmoIndicate from './assets/indicators/outOfAmmo.png';


import mail1 from './assets/items/mail1.png';
import mail2 from './assets/items/mail2.png';
import mail3 from './assets/items/mail3.png';
import greaves1 from './assets/items/greaves1.png';
import greaves2 from './assets/items/greaves2.png';
import greaves3 from './assets/items/greaves3.png';
import helmet1 from './assets/items/helmet1.png';
import hpUp from './assets/items/hpUp.png';
import hpDown from './assets/items/hpDown.png';
import spdUp from './assets/items/spdUp.png';
import spdDown from './assets/items/spdDown.png';
import strUp from './assets/items/strUp.png';
import strDown from './assets/items/strDown.png';
import focusUp from './assets/items/focusUp.png';
import focusDown from './assets/items/focusDown.png';
import ammo from './assets/items/ammo.png';
import bow from './assets/items/bow.png';
import boltNorth from './assets/items/boltNorth.png';
import boltSouth from './assets/items/boltSouth.png';
import boltEast from './assets/items/boltEast.png';
import boltWest from './assets/items/boltWest.png';
import spear from './assets/items/spear.png';
import sword from './assets/items/sword.png';
import crossbow from './assets/items/crossbow.png';


import playerImgIdleSheet from './assets/sheet1.png';
import player2ImgIdleSheet from './assets/sheet2.png';
import playerComAImgIdleSheet from './assets/sheetComA.png';
import playerComBImgIdleSheet from './assets/sheetComB.png';
import playerImgMoveSheet from './assets/sheetMoving1.png';
import player2ImgMoveSheet from './assets/sheetMoving2.png';
import comAImgMoveSheet from './assets/sheetMovingComA.png';
import comBImgMoveSheet from './assets/sheetMovingComB.png';
import player1DefendSheet from './assets/sheetDefend1.png';
import player2DefendSheet from './assets/sheetDefend2.png';
import comADefendSheet from './assets/sheetDefendComA.png';
import comBDefendSheet from './assets/sheetDefendComB.png';
import player1AttackSheet from './assets/sheetAttack1.png';
import player2AttackSheet from './assets/sheetAttack2.png';
import comAAttackSheet from './assets/sheetAttackComA.png';
import comBAttackSheet from './assets/sheetAttackComB.png';


import './App.css';

import DebugBox from './debugBox'
import Settings from './settings'
import CellInfo from './cellInfo'
import Loading from './loading'
import AiStatus from './aiStatus'

import pointInPolygon from 'point-in-polygon';

class App extends Component {
  state = {
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
    containerInnerClass: 'containerInner',
    sceneY: {
      three: 400,
      six: 300,
      nine: 220,
      twelve: 150,
    },
    loading: true,
    stateUpdater: '',
    settingAiPlayers: 0,
  }

  constructor(props) {
    super(props);
    this.time = 0;

    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();

    // SETTINGS CANVASES
    this.canvasRef3 = React.createRef();
    this.canvasRef4 = React.createRef();

    this.debugBoxStyle = "debugDisplay closedDebug";
    this.debugBoxStyle2 = "debugDisplay2 closedDebug";

    // LEVEL DRAW SETUP
    this.tileColumnOffset = 100; // pixels
    this.tileRowOffset = 50; // pixels
    this.originX = 0; // offset from left
    this.originY = 0; // offset from top
    this.Xtiles = 10;
    this.Ytiles = 10;
    this.showCoordinates = true;
    this.selectedTileX = -1;
    this.selectedTileY = -1;

    this.canvasWidth = 1300;
    this.canvasHeight = 800;

    this.floorImageWidth = 103;
    this.floorImageHeight = 53;

    this.wallImageWidth = 103;
    this.wallImageHeight = 98;
    this.sceneY = 220;
    this.tileWidth = 50;
    this.gridWidth = 9;

    this.cellCenterOffsetX = 23;
    this.cellCenterOffsetY = 2;


    // GRIND INFO, LEVEL DATA & MAPPING
    this.init = false;
    // this.openVoid = true;
    this.openVoid = false;
    this.cellToVoid = {
      state: false,
      x: 0,
      y: 0,
      count: 0,
      limit: 35,
    };
    this.voidTimer = {
      count: 0,
      limit: 10000,
    }
    this.voidCustomCell = false;
    this.gridInfo = [];
    this.settingsGridInfo = [];
    this.gridInfo2D = [];
    this.gridInfo2 = [];
    this.gridInfo2D2 = [];
    this.levelData =
    [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.levelData12 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x','x010x','x011x','x012x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x','x110x','x111x','x112x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x','x210x','x211x','x212x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x','x310x','x311x','x312x'],
      row4: ['x40x','x41x','x42x','x43x','x44x','x45x','x46x','x47x','x48x','x49x','x410x','x411x','x412x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','y57x','x58x','x59x','x510x','x511x','x512x'],
      row6: ['x60x','x61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x','x610x','x611x','x612x'],
      row7: ['x70x','x71x','x72x','x73x','x74x','x75x','x76x','x77x','x78x','x79x','x710x','x711x','x712x'],
      row8: ['x80x','x81x','x82x','z83x','x84x','x85x','x86x','x87x','x88x','x89x','x810x','x811x','x812x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','y97x','x98x','x99x','x910x','x911x','x912x'],
      row10: ['x100x','x101x','x102x','x103x','x104x','x105x','x106x','x107x','x108x','x109x','x1010x','x1011x','x1012x'],
      row11: ['x110x','x111x','x112x','x113x','x114x','x115x','x116x','x117x','x118x','x119x','x1110x','x1111x','x1112x'],
      row12: ['x120x','x121x','z122x','x123x','x124x','x125x','x126x','x127x','x128x','x129x','z1210x','x1211x','x1212x'],
    };
    this.levelData9 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05g','x06g','x07h','x08f','x09d'],
      row1: ['x10a','x11a','x12a','x13a','x14x','x15x','z16x','x17x','x18f','x19d'],
      row2: ['x20x','x21a','x22a','x23a','x24x','x25x','x26x','x27x','x28d','x29d'],
      row3: ['x30a','x31j','x32b','x33j','x34j','x35b','x36j','x37j','x38j','x39d'],
      row4: ['x40j','x41j','x42b','x43b','x44b','x45b','x46j','x47j','x48j','x49d'],
      row5: ['x50j','x51j','x52b','x53j','x54j','x55b','x56j','x57j','x58j','x59d'],
      row6: ['z60x','x61x','x62x','x63i','x64x','x65x','x66x','x67x','x68f','x69f'],
      row7: ['x70x','x71x','y72x','x73i','x74x','x75x','x76x','x77x','x78f','x79f'],
      row8: ['x80x','x81x','x82k','x83x','x84x','x85x','x86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92k','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    };
    this.levelData6 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','y22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','x42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','x61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
    };
    this.levelData3 = {
      row0: ['x00x','x01x','x02x','x03x'],
      row1: ['x10x','x11x','x12x','x13x'],
      row2: ['x20x','x21x','x22x','y23x'],
      row3: ['z30x','x31x','x32x','x33x'],
    };
    this.terrainLevelDataRef = {
      a:{
        name: 'grass',
        type: 'grass',
        effect: '',
      },
      b:{
        name: 'stone',
        type: 'road',
        effect: '',
      },
      x:{
        name: 'dirt',
        type: 'road',
        effect: '',
      },
      d:{
        name: 'pond',
        type: 'shallow',
        effect: '',
      },
      e:{
        name: 'mud',
        type: 'sticky',
        effect: '',
      },
      f:{
        name: 'sand',
        type: 'sticky',
        effect: '',
      },
      g:{
        name: 'ice',
        type: 'slippery',
        effect: '',
      },
      h:{
        name: 'lava',
        type: 'hazard',
        effect: '',
      },
      i:{
        name: 'bramble',
        type: 'hazard',
        effect: '',
      },
      j:{
        name: 'river',
        type: 'deep',
        effect: '',
      },
      k:{
        name: 'void',
        type: 'void',
        effect: 'void',
      },
    }
    this.pathArray = [];


    // ITEMS
    this.itemList = [
      {
        name: 'moveSpeedUp',
        amount: 5,
        total: 5,
        type: 'item',
        effect: 'speedUp',
      },
      {
        name: 'moveSpeedDown',
        amount: 5,
        total: 5,
        type: 'item',
        effect: 'speedDown',
      },
      {
        name: 'hpUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'hpUp',
      },
      {
        name: 'hpDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'hpDown',
      },
      {
        name: 'focusUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'focusUp',
      },
      {
        name: 'focusDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'focusDown',
      },
      {
        name: 'strengthUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'strengthUp',
      },
      {
        name: 'strengthDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: 'strengthDown',
      },
      {
        name: 'spear1',
        amount: 3,
        total: 3,
        type: 'weapon',
        subType: 'spear',
        effect: '',
      },
      {
        name: 'sword2',
        amount: 2,
        total: 2,
        type: 'weapon',
        subType: 'sword',
        effect: '',
      },
      {
        name: 'crossbow1',
        amount: 2,
        total: 2,
        type: 'weapon',
        subType: 'crossbow',
        effect: 'ammo+5',
      },
      {
        name: 'crossbow2',
        amount: 2,
        total: 2,
        type: 'weapon',
        subType: 'crossbow',
        effect: 'ammo+0',
      },
      {
        name: 'helmet1',
        amount: 3,
        total: 3,
        type: 'armor',
        subType: 'helmet',
        effect: '+10',
      },
      {
        name: 'ninjaGi',
        amount: 2,
        total: 2,
        type: 'armor',
        subType: 'mail',
        effect: 'snghit-5',
      },
      {
        name: 'ghostMail',
        amount: 1,
        total: 1,
        type: 'armor',
        subType: 'mail',
        effect: 'snghit-10',
      },
      {
        name: 'speedGreaves',
        amount: 2,
        total: 2,
        type: 'armor',
        subType: 'greaves',
        effect: 'speedUp',
      },
      {
        name: 'ironPlate',
        amount: 2,
        total: 2,
        type: 'armor',
        subType: 'mail',
        effect: 'hpUp',
      },
      {
        name: 'ammo5',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'ammo10',
        amount: 2,
        total: 2,
        type: 'item',
        effect: '',
      },
    ];
    this.disableInitItems = true;
    this.initItemList = [
      {
        name: 'moveSpeedUp',
        type: 'item',
        effect: 'speedUp',
      },
      {
        name: 'moveSpeedDown',
        type: 'item',
        effect: 'speedDown',
      },
      {
        name: 'ammo5',
        type: 'item',
        effect: '',
      },
      // {
      //   name: 'ammo10',
      //   type: 'item',
      //   effect: '',
      // },
      {
        name: 'hpUp',
        type: 'item',
        effect: 'hpUp',
      },
      {
        name: 'hpDown',
        type: 'item',
        effect: 'hpDown',
      },
      {
        name: 'spear1',
        type: 'weapon',
        subType: 'spear',
        effect: '',
      },
      // {
      //   name: 'sword2',
      //   type: 'weapon',
      //   subType: 'sword',
      //   effect: '',
      // },
      {
        name: 'crossbow1',
        type: 'weapon',
        subType: 'crossbow',
        effect: 'ammo+10',
      },
      // {
      //   name: 'ghostMail',
      //   type: 'armor',
      //   subType: 'mail',
      //   effect: 'snghit-5',
      // },
      {
        name: 'speedGreaves',
        type: 'armor',
        subType: 'greaves',
        effect: 'speedUp',
      },
      {
        name: 'ironPlate',
        type: 'armor',
        subType: 'mail',
        effect: 'hpUp',
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
    ];
    this.customItemPlacement = {
      state: true,
      cells: [
        {x:0 ,y:0 },
        {x:1 ,y:0 },
        {x:2 ,y:0 },
        {x:3 ,y:0 },
        {x:0 ,y:3 },
        {x:1 ,y:3 },
        {x:2 ,y:3 },
        {x:4 ,y:3 },
        {x:4 ,y:4 },
      ]
    };


    // PLAYER
    this.playerNumber = 2;
    this.currentPlayer = 1;
    this.players = [
      {
        number: 1,
        startPosition: {
          cell: {
            number: {
              x: 1,
              y: 3,
            },
            center: {
              x: 0,
              y: 0,
            }
          }
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
            }
          }
        },
        nextPosition: {
          x: 0,
          y: 0,
        },
        target: {
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
          cell2: {
            number: {
              x: 0,
              y: 0,
            },
            center: {
              x: 0,
              y: 0,
            },
          },
          free: true,
          occupant: {
            type: '',
            player: '',
          },
          void: false
        },
        direction: 'south',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
        turnCheckerDirection: '',
        action: 'idle',
        moving: {
          state: false,
          step: 0,
          course: '',
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
          }
        },
        newMoveDelay: {
          state: false,
          count: 0,
          limit: 7,
        },
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        flanking: {
          checking: false,
          preFlankDirection: '',
          direction: '',
          state: false,
          step: 0,
          target1: {x:0 ,y:0},
          target2: {x:0 ,y:0},
        },
        drowning: false,
        attacking: {
          state: false,
          count: 0,
          limit: 20,
        },
        attackStrength: 0,
        bluntAttack: false,
        dodging: {
          countState: false,
          state: false,
          count: 0,
          limit: 20,
          peak: {
            start: 5,
            end: 10,
          }
        },
        dodgeDirection: '',
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
            type: '',
          }
        },
        pushBack: {
          state: false,
          prePushBackMoveSpeed: 0,
        },
        defending: {
          state: false,
          count: 0,
          limit: 4,
        },
        defendDecay: {
          state: false,
          count: 0,
          limit: 25,
        },
        falling: {
          state: false,
          count: 0,
          limit: 10,
        },
        dead: {
          state: false,
          count: 0,
          limit: 10
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
              }
            }
          }
        },
        respawn: false,
        points: 0,
        speed: {
          move: .1,
          range: [.05,.1,.125,.2]
        },
        terrainMoveSpeed: {
          state: false,
          speed: 0,
        },
        hp: 2,
        currentWeapon: {
          name: 'sword1',
          type: 'sword',
          effect: '',
        },
        currentArmor: {
          name: '',
          type: '',
          effect: '',
        },
        items: {
          weaponIndex: 0,
          armorIndex: 0,
          weapons: [
            {
              name: 'sword1',
              type: 'sword',
              effect: '',
            }
          ],
          armor: [
            {
              name: '',
              type: '',
              effect: '',
            }
          ],
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
          status: '',
          count: 0,
          limit: 15,
        },
        popups: [],
        itemDrop: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: '',
          }
        },
        itemPickup: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: '',
          }
        },
        discardGear:{
          state: false,
          count: 0,
          limit: 8,
        },
        idleAnim: {
          state: false,
          count: 0,
          limit: 5,
        },
        breakAnim: {
          attack: {
            state: false,
            count: 0,
            limit: 10
          },
          defend: {
            state: false,
            count: 0,
            limit: 10
          }
        },
        ai: {
          state: false,
          imgType: '',
          primaryMission: '',
          mission: '',
          prevMission: '',
          currentObjective: '',
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
            action: '',
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
            targetAction: '',
          },
          retrieving: {
            checkin: undefined,
            state: false,
            point: {x: undefined, y: undefined},
            targetItem: {
              name: '',
              type: '',
              subType: '',
              effect: ''
            },
            safe: true,
          },
          retreating: {
            checkin: undefined,
            state: false,
            point: {x: undefined, y: undefined},
            level: 0,
            safe: true,
          },
          organizing: {
            weaponPriorityIndex: 0,
            armorPriorityIndex: 0,
            dropped: {
              state: false,
              gear: {
                name: '',
                type: '',
                subType: '',
                effect: ''
              },
            },
          },
          mode: '',
          upgradeWeapon: false,
          upgradeArmor: false,
          pathfindingRanges: {
            spear: 3,
            crossbow: 5,
          }
        },
        stamina: {
          current: 20,
          max: 20,
        },
      },
      {
        number: 2,
        startPosition: {
          cell: {
            number: {
              x: 0,
              y: 2,
            },
            center: {
              x: 0,
              y: 0,
            }
          }
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
            }
          }
        },
        nextPosition: {
          x: 0,
          y: 0,
        },
        target: {
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
          cell2: {
            number: {
              x: 0,
              y: 0,
            },
            center: {
              x: 0,
              y: 0,
            },
          },
          free: true,
          occupant: {
            type: '',
            player: '',
          },
          void: false,

        },
        direction: 'west',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
        turnCheckerDirection: '',
        action: 'idle',
        moving: {
          state: false,
          step: 0,
          course: '',
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
          }
        },
        newMoveDelay: {
          state: false,
          count: 0,
          limit: 7,
        },
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        flanking: {
          checking: false,
          preFlankDirection: '',
          direction: '',
          state: false,
          step: 0,
          target1: {x:0 ,y:0},
          target2: {x:0 ,y:0},
        },
        drowning: false,
        attacking: {
          state: false,
          count: 0,
          limit: 20,
        },
        attackStrength: 0,
        bluntAttack: false,
        dodging: {
          countState: false,
          state: false,
          count: 0,
          limit: 20,
          peak: {
            start: 5,
            end: 10,
          }
        },
        dodgeDirection: '',
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
            type: '',
          }
        },
        pushBack: {
          state: false,
          prePushBackMoveSpeed: 0,
        },
        defending: {
          state: false,
          count: 0,
          limit: 4,
        },
        defendDecay: {
          state: false,
          count: 0,
          limit: 25,
        },
        defended: {
          state: false
        },
        falling: {
          state: false,
          count: 0,
          limit: 10,
        },
        dead: {
          state: false,
          count: 0,
          limit: 10
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
              }
            }
          }
        },
        respawn: false,
        points: 0,
        speed: {
          move: .1,
          range: [.05,.1,.125,.2]
        },
        terrainMoveSpeed: {
          state: false,
          speed: 0,
        },
        hp: 2,
        currentWeapon: {
          name: 'sword1',
          type: 'sword',
          effect: '',
        },
        currentArmor: {
          name: '',
          type: '',
          effect: '',
        },
        items: {
          weaponIndex: 0,
          armorIndex: 0,
          weapons: [{
            name: 'sword1',
            type: 'sword',
            effect: '',
          }],
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
          status: '',
          count: 0,
          limit: 15,
        },
        popups: [],
        itemDrop: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: '',
          }
        },
        itemPickup: {
          state: false,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: '',
          }
        },
        discardGear:{
          state: false,
          count: 0,
          limit: 8,
        },
        idleAnim: {
          state: false,
          count: 0,
          limit: 5,
        },
        breakAnim: {
          attack: {
            state: false,
            count: 0,
            limit: 10
          },
          defend: {
            state: false,
            count: 0,
            limit: 10
          }
        },
        ai: {
          state: false,
          imgType: '',
          primaryMission: '',
          mission: '',
          prevMission: '',
          currentObjective: '',
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
            action: '',
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
            targetAction: '',
          },
          retrieving: {
            checkin: undefined,
            state: false,
            point: {x: undefined, y: undefined},
            targetItem: {
              name: '',
              type: '',
              subType: '',
              effect: ''
            },
            safe: true,
          },
          retreating: {
            checkin: undefined,
            state: false,
            point: {x: undefined, y: undefined},
            level: 0,
            safe: true,
          },
          organizing: {
            weaponPriorityIndex: 0,
            armorPriorityIndex: 0,
            dropped: {
              state: false,
              gear: {
                name: '',
                type: '',
                subType: '',
                effect: ''
              },
            },
          },
          mode: '',
          upgradeWeapon: false,
          upgradeArmor: false,
          pathfindingRanges: {
            spear: 3,
            crossbow: 5,
          }
        },
        stamina: {
          current: 20,
          max: 20,
        },
      }
    ];


    // INPUT
    this.gamepad = false;
    this.keyPressed = [
      {
        north: false,
        south: false,
        east: false,
        west: false,
        northEast: false,
        northWest: false,
        southEast: false,
        southWest: false,
        attack: false,
        defend: false,
        strafe: false,
        cycleWeapon: false,
        cycleArmor: false,
        dodge: false,
        menu: false,
      },
      {
        north: false,
        south: false,
        east: false,
        west: false,
        northEast: false,
        northWest: false,
        southEast: false,
        southWest: false,
        attack: false,
        defend: false,
        strafe: false,
        cycleWeapon: false,
        cycleArmor: false,
        dodge: false,
        menu: false,
      },
    ]
    this.clicked = {
      number:{
        x:0,
        y:0
      },
      center:{
        x:0,
        y:0
      },
      drawCenter:{
        x:0,
        y:0
      },
      vertices: [
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
      ],
      side: 0,
      levelData: '',
      edge: {
        state: false,
        side: ''
      },
      terrain: {
        name: '',
        type: '',
        effect: ''
      },
      item: {
        name: '',
        type: '',
        subType: '',
        effect: '',
        initDrawn: false
      },
      void: {
        state: false
      },
    };
    this.turnCheckerDirection = '';


    // SETTINGS
    this.settingsGridWidth = 9;
    this.settingsCanvasHeight = 500;
    this.settingsCanvasWidth = 700;
    this.settingsSceneX = 250;
    this.settingsSceneY = 40;
    this.settingsClicked = {
      number:{
        x:0,
        y:0
      },
      center:{
        x:0,
        y:0
      },
      drawCenter:{
        x:0,
        y:0
      },
      vertices: [
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
        {
          x:0,
          y:0
        },
      ],
      side: 0,
      levelData: '',
      edge: {
        state: false,
        side: ''
      },
      terrain: {
        name: '',
        type: '',
        effect: ''
      },
      item: {
        name: '',
        type: '',
        subType: '',
        effect: '',
        initDrawn: false
      },
      void: {
        state: false
      },
    };
    this.settingsFormAiGridInfo = [] ;
    this.settingsFormAiStartPosList = [];
    this.updateSettingsFormAiDataData = {};
    this.settingsFormPlyrGridInfo = [];
    this.settingsFormPlyrStartPosList = [];
    this.showSettingsKeyPress = {
      state: false,
      count: 0,
      limit: 4,
    }
    this.showSettingsCanvasData = {
      state: true,
      field: 'human_start',
      plyrNo: 1,
      type: 'start',
    }
    this.showCellInfoBox = false;


    //LOOP & ANIMATION
    this.stepper = {
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
      interval: 1000/30,
      lastTime: 0,
      currentTime: (new Date()).getTime(),
      deltaTime: 0,

    };
    this.moveStepRef = [
      [.05,.1,.15,.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8,.85,.9,.95,1],
      [.1,.2,.3,.4,.5,.6,.7,.8,.9,1],
      [.125,.25,.375,.5,.625,.75,.875,1],
      [.2,.4,.6,.8,1],
    ]
    this.attackAnimRef = {
      limit: {
        unarmed: 18,
        sword: 22,
        spear: 25,
        crossbow: 25,
      },
      peak: {
        unarmed: 6,
        sword: 12,
        spear: 18,
        crossbow: 18,
      },
    };
    this.staminaCostRef = {
      attack: {
        blunt: 2,
        unarmed: 2,
        sword: 3,
        spear: 4,
        crossbow: 3,
      },
      deflected: 3,
      defend: 1.5,
      dodge: 4,
      flank: 5,
      jump: 6,
      pushBack: 7,
    }
    this.deflectedLengthRef = {
      outOfStamina: 50,
      attacked: 20,
      bluntAttacked: 25,
      defended: 10,
      attack: 15
    };
    this.projectiles = [];
    this.projectileSpeed = .1;
    this.boltDeflectAnim = {
      position: {
        x: 0,
        y: 0,
      },
      state: false,
      count: 0,
      limit: 10,
    };
    this.cellsUnderAttack = [];
    this.cellsToHighlight = [];
    this.gamepadPollCounter = {
      count1: 0,
      count2: 0,
      store1: [],
      store2: [],
    };
    this.charSpriteHeight = 100;
    this.charSpriteWidth = 100;
    this.playerColourRef = {
      player1: 'red',
      player2: 'blue',
      player3: 'green',
      player4: 'purple',
      player5: 'orange',
      player6: 'brown',
      player7: '',
      player8: '',
    };
    this.playerDrawWidth = 40;
    this.playerDrawHeight = 40;
    this.popupSize = 35;


    // AI
    this.aiInitSettings = {
      randomStart: false,
      startPosition: {
        number: {x: 1, y: 7}
      },
      primaryMission: 'defend',
      mission: undefined,
      mode: 'careful',
      partolArea: [
        {x: 8, y: 6},
        // {x: 7, y: 4}
      ],
      weapon: {
        name: 'spear1',
        type: 'spear',
        effect: '',
      },
      armor: {
        name: '',
        type: '',
        effect: '',
      },
    }
    this.addAiPlayerKeyPress = false;
    this.addAiCount = {
      state: false,
      count: 0,
      limit: 10,
    };
    this.aiPlayers = [];
    this.aiTarget =  1;
    this.resetAiTarget = {
      state: false,
      state2: false,
      player: 1,
      count: 0,
      limit: 25,
    };
    this.allPlayersDead = false;
    this.removeAi = undefined;
    this.easyStar = undefined;
    this.getPath = false;
    this.aiDeflectCheck = false;
    this.aiDeflectedCheck = [];


    // CAMERA
    this.toggleCameraMode = false;
    this.camera = {
      state: false,
      startCount: 0,
      startLimit: 4,
      mode: 'pan',
      fixed: false,
      target: {
        type: 'player',
        plyrNo: 1,
        cell: {
          x: undefined,
          y: undefined,
        }
      },
      focus: {
        x: undefined,
        y: undefined,
      },
      zoom: {
        x: 1,
        y: 1,
      },
      zoomDirection: 'in',
      pan: {
        x: -1,
        y: -1,
      },
      panDirection: 'east',
      limits: {
        zoom: {
          min: .5,
          max: 1.8,
        },
        pan: {
          x: {
            min: -400,
            max: 300,
          },
          y: {
            min: -400,
            max: 300,
          }
        },
      },
      instructionType: 'default',
      instructions: [],
    };
    this.cameraInstructionRef = {
      default: {},
      story: {},
      // FollowPlayer2, centerOnCell21 etc
    };

  }


  componentDidMount() {

    this.easyStar = new Easystar.js();

    if (window.innerWidth < 1100) {
      this.setState({
        containerInnerClass: "containerInnerSmall",
        sceneY: {
          three: 300,
          six: 200,
          nine: 120,
          twelve: 50,
        }
      })


      switch(this.gridWidth) {
        case 3 :
          this.sceneY = 300;
        break;
        case 6 :
          this.sceneY = 200;
        break;
        case 9 :
          this.sceneY = 120;
        break;
        case 12 :
          this.sceneY = 50;
        break;
      }

      this.canvasWidth = 1000;
      this.canvasHeight = 600;

    }


    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');


    this.setState({
      canvas: canvas,
      context: context,
      canvas2: canvas2,
      context2: context2,
    })

    this.refs.comBImgAttackSheet.onload = () => {
      this.addListeners(canvas, canvas2);

      this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);
      this.getCustomPlyrStartPosList(
        [
          {
            plyrNo: 1,
            selected: undefined,
            posArray: []
          },
          {
            plyrNo: 2,
            selected: undefined,
            posArray: []
          }
        ]
      );

      window.requestAnimationFrame(this.gameLoop);

    }

  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.stepper.currentTime);
  }


  pollGamepads = () => {


  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  // console.log('gamepads',gamepads);
  // let joyPadCount = gamepads.length;
  let connectedGamepads = 0;
  if (gamepads[0] !== null) {
    connectedGamepads = 1;
    if (gamepads[1] !== null) {
      connectedGamepads = 2
    }
  }

  if (this.gamepadPollCounter.count1 === 0) {
    this.gamepadPollCounter.count1 = 1;
  } else {
    this.gamepadPollCounter.count1 = 0;
  }
  if (this.gamepadPollCounter.count2 === 0) {
    this.gamepadPollCounter.count2 = 1;
  } else {
    this.gamepadPollCounter.count2 = 0;
  }

  let keyPressed = [
    {
      north: false,
      south: false,
      east: false,
      west: false,
      northEast: false,
      northWest: false,
      southEast: false,
      southWest: false,
      attack: false,
      defend: false,
      strafe: false,
      cycleWeapon: false,
      cycleArmor: false,
      dodge: false,
      menu: false,
    },
    {
      north: false,
      south: false,
      east: false,
      west: false,
      northEast: false,
      northWest: false,
      southEast: false,
      southWest: false,
      attack: false,
      defend: false,
      strafe: false,
      cycleWeapon: false,
      cycleArmor: false,
      dodge: false,
      menu: false,
    },
  ]
  let showSettingsKeyPressState = false;

  for (const plyr of this.players) {
    this.players[plyr.number-1].strafing.state = false;
  }


  for(let g = 0; g < gamepads.length; g++) {
    const gp = gamepads[g];

    if (!!gp) {

      // CHECK BUTTONS!!
      for (const btn of gp.buttons) {
        if (btn.pressed === true ) {

          if (connectedGamepads === 1) {

            // if (
            //   gp.buttons.indexOf(btn) === 0 ||
            //   gp.buttons.indexOf(btn) === 1 ||
            //   gp.buttons.indexOf(btn) === 2 ||
            //   gp.buttons.indexOf(btn) === 3 ||
            //   gp.buttons.indexOf(btn) === 4 ||
            //   gp.buttons.indexOf(btn) === 5 ||
            //   gp.buttons.indexOf(btn) === 6 ||
            //   gp.buttons.indexOf(btn) === 7 ||
            //   gp.buttons.indexOf(btn) === 8 ||
            //   gp.buttons.indexOf(btn) === 9
            // ) {
            //   console.log('1 player btn',gp.buttons.indexOf(btn));
            //   // console.log('gamepads', gp.id.substr(0,7));
            // }

            // DOWN BTN
            if (gp.buttons.indexOf(btn) === 0) {
              // console.log('1 player attack held',gp.buttons.indexOf(btn));
              keyPressed[0].attack = true;
              this.currentPlayer = 1;
            }
            // RIGHT BTN
            if (gp.buttons.indexOf(btn) === 1) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].defend = true;
              this.currentPlayer = 1;
            }
            // LEFT BTN
            if (gp.buttons.indexOf(btn) === 2) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].dodge = true;
              this.currentPlayer = 1;
            }
            // UP BTN
            if (gp.buttons.indexOf(btn) === 3) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].strafe = true;
              this.players[0].strafing.state = true;
              this.currentPlayer = 1;
            }

            // L BTN
            if (gp.buttons.indexOf(btn) === 4) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].cycleArmor = true;
              this.currentPlayer = 1;
            }
            // R BTN
            if (gp.buttons.indexOf(btn) === 5) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].cycleWeapon = true;
              this.currentPlayer = 1;
            }
            // MINUS BTN
            if (gp.buttons.indexOf(btn) === 9) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              if (this.players[0].dead.state === true) {
                this.respawn(this.players[0])
              }
            }

            // SHOULDER BTN
            if (gp.buttons.indexOf(btn) === 8) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));

            }

            // SHOULDER TRIGGER
            if (gp.buttons.indexOf(btn) === 6) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              showSettingsKeyPressState = true;
            }

          }

          if (connectedGamepads === 2) {

            if (
              gp.buttons.indexOf(btn) === 4 ||
              gp.buttons.indexOf(btn) === 6 ||
              gp.buttons.indexOf(btn) === 8 ||
              gp.buttons.indexOf(btn) === 12 ||
              gp.buttons.indexOf(btn) === 13 ||
              gp.buttons.indexOf(btn) === 14 ||
              gp.buttons.indexOf(btn) === 15 ||
              gp.buttons.indexOf(btn) === 18 ||
              gp.buttons.indexOf(btn) === 19
            ) {
              // console.log('2 players btn player 1',gp.buttons.indexOf(btn));
            }

            // DOWN BTN
            if (gp.buttons.indexOf(btn) === 14) {
              // console.log('1 player attack held',gp.buttons.indexOf(btn));
              keyPressed[0].defend = true;
              this.currentPlayer = 1;
            }
            // RIGHT BTN
            if (gp.buttons.indexOf(btn) === 13) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].attack = true;
              this.currentPlayer = 1;
            }
            // LEFT BTN
            if (gp.buttons.indexOf(btn) === 12) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].dodge = true;
              this.currentPlayer = 1;
            }
            // UP BTN
            if (gp.buttons.indexOf(btn) === 15) {
              keyPressed[0].strafe = true;
              this.players[0].strafing.state = true;
              this.currentPlayer = 1;
            }
            // R BTN
            if (gp.buttons.indexOf(btn) === 19) {
              keyPressed[0].cycleArmor = true;
              this.currentPlayer = 1;
            }
            // L BTN
            if (gp.buttons.indexOf(btn) === 18) {
              keyPressed[0].cycleWeapon = true;
              this.currentPlayer = 1;
            }
            // MINUS BTN
            if (gp.buttons.indexOf(btn) === 8) {
              if (this.players[0].dead.state === true) {
                this.respawn(this.players[0])
              }
            }

            // SHOULDER BTN
            if (gp.buttons.indexOf(btn) === 4) {

            }

            // SHOULDER TRIGGER
            if (gp.buttons.indexOf(btn) === 4) {
              showSettingsKeyPressState = true;
            }



            if (
              gp.buttons.indexOf(btn) === 0 ||
              gp.buttons.indexOf(btn) === 1 ||
              gp.buttons.indexOf(btn) === 2 ||
              gp.buttons.indexOf(btn) === 3 ||
              gp.buttons.indexOf(btn) === 5 ||
              gp.buttons.indexOf(btn) === 20 ||
              gp.buttons.indexOf(btn) === 21 ||
              gp.buttons.indexOf(btn) === 7 ||
              gp.buttons.indexOf(btn) === 9
            ) {
              // console.log('2 players btn player 2',gp.buttons.indexOf(btn));
            }

            // RIGHT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 21) {
              keyPressed[1].cycleArmor = true;
              this.currentPlayer = 2;
            }
            // LEFT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 20) {
              keyPressed[1].cycleWeapon = true;
              this.currentPlayer = 2;
            }


            if (gp.buttons.indexOf(btn) === 0 || gp.buttons.indexOf(btn) === 1) {
              if (this.gamepadPollCounter.store1.length < 2) {
                this.gamepadPollCounter.store1.push(gp.buttons.indexOf(btn));
              }
              if (this.gamepadPollCounter.store1.length >= 2) {
                // console.log('dbl capture',this.gamepadPollCounter.store1);
                if (this.gamepadPollCounter.store1[0] === 1 && this.gamepadPollCounter.store1[1] === 0) {
                  // console.log('DOWN BTN!');

                  keyPressed[1].defend = true;
                  this.currentPlayer = 2;
                }
                if (this.gamepadPollCounter.store1[0] === 0 && this.gamepadPollCounter.store1[1] === 1) {
                  // console.log('LEFT BTN!');
                  keyPressed[1].dodge = true;
                  this.currentPlayer = 2;
                }
                this.gamepadPollCounter.store1 = []
              }
            }

            if (gp.buttons.indexOf(btn) === 2 || gp.buttons.indexOf(btn) === 3) {
              if (this.gamepadPollCounter.store2.length < 2) {
                this.gamepadPollCounter.store2.push(gp.buttons.indexOf(btn));
              }
              if (this.gamepadPollCounter.store2.length >= 2) {
                // console.log('dbl capture2',this.gamepadPollCounter.store2);
                if (this.gamepadPollCounter.store2[0] === 2 && this.gamepadPollCounter.store2[1] === 3) {
                  // console.log('UP BTN!');
                  keyPressed[1].strafe = true;
                  this.players[1].strafing.state = true;
                  this.currentPlayer = 2;
                }
                if (this.gamepadPollCounter.store2[0] === 3 && this.gamepadPollCounter.store2[1] === 2) {
                  // console.log('RIGHT BTN!');

                  keyPressed[1].attack = true;
                  this.currentPlayer = 2;
                }
                this.gamepadPollCounter.store2 = []
              }
            }


            // if (gp.buttons.indexOf(btn) === 0 || gp.buttons.indexOf(btn) === 1) {
            //   if (this.gamepadPollCounter.store1.length < 2) {
            //     this.gamepadPollCounter.store1.push(gp.buttons.indexOf(btn));
            //   }
            //   if (this.gamepadPollCounter.store1.length >= 2) {
            //     // console.log('dbl capture',this.gamepadPollCounter.store1);
            //     if (this.gamepadPollCounter.store1[0] === 1 && this.gamepadPollCounter.store1[1] === 0) {
            //       // console.log('LEFT BTN!');
            //     }
            //     if (this.gamepadPollCounter.store1[0] === 0 && this.gamepadPollCounter.store1[1] === 1) {
            //       // console.log('DWN BTN!');
            //       keyPressed[1].attack = true;
            //       this.currentPlayer = 2;
            //     }
            //     this.gamepadPollCounter.store1 = []
            //   }
            // }
            //
            // if (gp.buttons.indexOf(btn) === 2 || gp.buttons.indexOf(btn) === 3) {
            //   if (this.gamepadPollCounter.store2.length < 2) {
            //     this.gamepadPollCounter.store2.push(gp.buttons.indexOf(btn));
            //   }
            //   if (this.gamepadPollCounter.store2.length >= 2) {
            //     // console.log('dbl capture2',this.gamepadPollCounter.store2);
            //     if (this.gamepadPollCounter.store2[0] === 2 && this.gamepadPollCounter.store2[1] === 3) {
            //       // console.log('RIGHT BTN!');
            //       keyPressed[1].defend = true;
            //       this.currentPlayer = 2;
            //     }
            //     if (this.gamepadPollCounter.store2[0] === 3 && this.gamepadPollCounter.store2[1] === 2) {
            //       // console.log('UP BTN!');
            //       keyPressed[1].strafe = true;
            //       this.players[1].strafing.state = true;
            //       this.currentPlayer = 2;
            //     }
            //     this.gamepadPollCounter.store2 = []
            //   }
            // }

            // PLUS BTN
            if (gp.buttons.indexOf(btn) === 9) {
              if (this.players[1].dead.state === true) {
                this.respawn(this.players[1])
              }
            }

            // SHOULDER BTN
            if (gp.buttons.indexOf(btn) === 5) {

            }

            // SHOULDER BTN
            if (gp.buttons.indexOf(btn) === 7) {
              showSettingsKeyPressState = true;
            }


          }
        }
      }

      // CHECK AXES!!
      if (connectedGamepads === 1) {


        if (gp.axes[0]!== 0 && gp.axes[1] !== 0) {

          if (gp.axes[0] < 0 && gp.axes[1] < 0) {
            // console.log('1',gp.axes[0],gp.axes[1]);
            // keyPressed[0].west = true;
            // this.turnCheckerDirection = 'west';
            // this.currentPlayer = 1;

            if (gp.axes[0] > -0.5 && gp.axes[1] < -0.5) {
              // console.log('up',gp.axes[0],gp.axes[1]);
              keyPressed[0].north = true;
              this.players[0].turnCheckerDirection = 'north';
              this.currentPlayer = 1;
            }
            if (gp.axes[1] > -0.5 && gp.axes[0] < -0.5) {
              // console.log('left',gp.axes[0],gp.axes[1]);
              keyPressed[0].west = true;
              this.players[0].turnCheckerDirection = 'west';
              this.currentPlayer = 1;
            }
            // else {
            //   // console.log('up left',gp.axes[0],gp.axes[1]);
            //   keyPressed[0].northWest = true;
            //   this.turnCheckerDirection = 'northWest';
            //   this.currentPlayer = 1;
            // }
          }
          if (gp.axes[0] > 0 && gp.axes[1] > 0) {
            // console.log('2',gp.axes[0],gp.axes[1]);
            // keyPressed[0].east = true;
            // this.turnCheckerDirection = 'east';
            // this.currentPlayer = 1;

            if (gp.axes[1] < 0.5 && gp.axes[0] > 0.5) {
              // console.log('right',gp.axes[0],gp.axes[1]);
              keyPressed[0].east = true;
              this.players[0].turnCheckerDirection = 'east';
              this.currentPlayer = 1;
            }
            if (gp.axes[0] < 0.5 && gp.axes[1] > 0.5) {
              // console.log('down',gp.axes[0],gp.axes[1]);
              keyPressed[0].south = true;
              this.players[0].turnCheckerDirection = 'south';
              this.currentPlayer = 1;
            }
            // else {
            //   // console.log('down right',gp.axes[0],gp.axes[1]);
            //   keyPressed[0].southEast = true;
            //   this.turnCheckerDirection = 'southEast';
            //   this.currentPlayer = 1;
            // }
          }
          if (gp.axes[0] < 0 && gp.axes[1] > 0) {
            // console.log('3',gp.axes[0],gp.axes[1]);
            // keyPressed[0].south = true;
            // this.turnCheckerDirection = 'south';
            // this.currentPlayer = 1;

            if (gp.axes[0] > -0.5 && gp.axes[1] > 0.5) {
              // console.log('down',gp.axes[0],gp.axes[1]);
              keyPressed[0].south = true;
              this.players[0].turnCheckerDirection = 'south';
              this.currentPlayer = 1;
            }
            if (gp.axes[1] < 0.5 && gp.axes[0] < -0.5) {
              // console.log('left',gp.axes[0],gp.axes[1]);
              keyPressed[0].west = true;
              this.players[0].turnCheckerDirection = 'west';
              this.currentPlayer = 1;
            }
            // else {
            //   // console.log('down left',gp.axes[0],gp.axes[1]);
            //   keyPressed[0].southWest = true;
            //   this.turnCheckerDirection = 'southWest';
            //   this.currentPlayer = 1;
            // }
          }
          if (gp.axes[0] > 0 && gp.axes[1] < 0) {
            // console.log('4',gp.axes[0],gp.axes[1]);
            // keyPressed[0].north = true;
            // this.turnCheckerDirection = 'north';
            // this.currentPlayer = 1;

            if (gp.axes[0] < 0.5 && gp.axes[1] < -0.5) {
              // console.log('up',gp.axes[0],gp.axes[1]);
              keyPressed[0].north = true;
              this.players[0].turnCheckerDirection = 'north';
              this.currentPlayer = 1;
            }
            if (gp.axes[1] > -0.5 && gp.axes[0] > 0.5) {
              // console.log('right',gp.axes[0],gp.axes[1]);
              keyPressed[0].east = true;
              this.players[0].turnCheckerDirection = 'east';
              this.currentPlayer = 1;
            }
            // else {
            //   // console.log('up right',gp.axes[0],gp.axes[1]);
            //   keyPressed[0].northEast = true;
            //   this.turnCheckerDirection = 'northEast';
            //   this.currentPlayer = 1;
            // }
          }
        }
      }

      if (connectedGamepads === 2) {

        if (gp.axes[0]!== 0 && gp.axes[1] !== 0) {
          // console.log('player 1 stick')
          if (gp.axes[0] < 0 && gp.axes[1] < 0) {
            // console.log('player 1 stick: 1',gp.axes[0],gp.axes[1]);
            // keyPressed[0].south = true;
            // this.turnCheckerDirection = 'south';
            // this.currentPlayer = 1;

            if (gp.axes[0] < -0.5 && gp.axes[1] > -0.5) {
              // console.log('down',gp.axes[0],gp.axes[1]);
              keyPressed[0].south = true;
              this.players[0].turnCheckerDirection = 'south';
              this.currentPlayer = 1;
            }
            if (gp.axes[0] > -0.5 && gp.axes[1] < -0.5) {
              // console.log('left',gp.axes[0],gp.axes[1]);
              keyPressed[0].west = true;
              this.players[0].turnCheckerDirection = 'west';
              this.currentPlayer = 1;
            }

          }
          if (gp.axes[0] > 0 && gp.axes[1] > 0) {
            // console.log('player 1 stick: 2',gp.axes[0],gp.axes[1]);
            // keyPressed[0].north = true;
            // this.turnCheckerDirection = 'north';
            // this.currentPlayer = 1;

            if (gp.axes[0] > 0.5 && gp.axes[1] < 0.5) {
              // console.log('up',gp.axes[0],gp.axes[1]);
              keyPressed[0].north = true;
              this.players[0].turnCheckerDirection = 'north';
              this.currentPlayer = 1;
            }
            if (gp.axes[0] < 0.5 && gp.axes[1] > 0.5) {
              // console.log('right',gp.axes[0],gp.axes[1]);
              keyPressed[0].east = true;
              this.players[0].turnCheckerDirection = 'east';
              this.currentPlayer = 1;
            }

          }
          if (gp.axes[0] < 0 && gp.axes[1] > 0) {
            // console.log('player 1 stick: 3',gp.axes[0],gp.axes[1]);
            // keyPressed[0].east = true;
            // this.turnCheckerDirection = 'east';
            // this.currentPlayer = 1;

            if (gp.axes[0] > -0.5 && gp.axes[1] > 0.5) {
              // console.log('right',gp.axes[0],gp.axes[1]);
              keyPressed[0].east = true;
              this.players[0].turnCheckerDirection = 'east';
              this.currentPlayer = 1;
            }
            if (gp.axes[0] < -0.5 && gp.axes[1] < 0.5) {
              // console.log('down',gp.axes[0],gp.axes[1]);
              keyPressed[0].south = true;
              this.players[0].turnCheckerDirection = 'south';
              this.currentPlayer = 1;
            }

          }
          if (gp.axes[0] > 0 && gp.axes[1] < 0) {
            // console.log('player 1 stick: 4',gp.axes[0],gp.axes[1]);
            // keyPressed[0].west = true;
            // this.turnCheckerDirection = 'west';
            // this.currentPlayer = 1;

            if (gp.axes[0] > 0.5 && gp.axes[1] > -0.5) {
              // console.log('up',gp.axes[0],gp.axes[1]);
              keyPressed[0].north = true;
              this.players[0].turnCheckerDirection = 'north';
              this.currentPlayer = 1;
            }
            if (gp.axes[0] < 0.5 && gp.axes[1] < -0.5) {
              // console.log('left',gp.axes[0],gp.axes[1]);
              keyPressed[0].west = true;
              this.players[0].turnCheckerDirection = 'west';
              this.currentPlayer = 1;
            }

          }
        }


        if (gp.axes[2]!== 0 && gp.axes[3] !== 0) {
          // console.log('right stick')
          if (gp.axes[2] < 0 && gp.axes[3] < 0) {
            // console.log('player 2 stick: 1',gp.axes[2],gp.axes[3]);
            // keyPressed[1].north = true;
            // this.turnCheckerDirection = 'north';
            // this.currentPlayer = 2;

            if (gp.axes[2] < -0.5 && gp.axes[3] > -0.5) {
              // console.log('up',gp.axes[2],gp.axes[3]);
              keyPressed[1].north = true;
              this.players[1].turnCheckerDirection = 'north';
              this.currentPlayer = 2;
            }
            if (gp.axes[2] > -0.5 && gp.axes[3] < -0.5) {
              // console.log('right',gp.axes[2],gp.axes[3]);
              keyPressed[1].east = true;
              this.players[1].turnCheckerDirection = 'east';
              this.currentPlayer = 2;
            }

          }
          if (gp.axes[2] > 0 && gp.axes[3] > 0) {
            // console.log('player 2 stick: 2',gp.axes[2],gp.axes[3]);
            // keyPressed[1].south = true;
            // this.turnCheckerDirection = 'south';
            // this.currentPlayer = 2;

            if (gp.axes[2] < 0.5 && gp.axes[3] > 0.5) {
              // console.log('left',gp.axes[2],gp.axes[3]);
              keyPressed[1].west = true;
              this.players[1].turnCheckerDirection = 'west';
              this.currentPlayer = 2;
            }
            if (gp.axes[2] > 0.5 && gp.axes[3] < 0.5) {
              // console.log('down',gp.axes[2],gp.axes[3]);
              keyPressed[1].south = true;
              this.players[1].turnCheckerDirection = 'south';
              this.currentPlayer = 2;
            }

          }
          if (gp.axes[2] < 0 && gp.axes[3] > 0) {
            // console.log('player 2 stick: 3',gp.axes[2],gp.axes[3]);
            // keyPressed[1].west = true;
            // this.turnCheckerDirection = 'west';
            // this.currentPlayer = 2;

            if (gp.axes[2] < -0.5 && gp.axes[3] < 0.5) {
              // console.log('up',gp.axes[2],gp.axes[3]);
              keyPressed[1].north = true;
              this.players[1].turnCheckerDirection = 'north';
              this.currentPlayer = 2;
            }
            if (gp.axes[2] > -0.5 && gp.axes[3] > 0.5) {
              // console.log('left',gp.axes[2],gp.axes[3]);
              keyPressed[1].west = true;
              this.players[1].turnCheckerDirection = 'west';
              this.currentPlayer = 2;
            }

          }
          if (gp.axes[2] > 0 && gp.axes[3] < 0) {
            // console.log('player 2 stick: 4',gp.axes[2],gp.axes[3]);
            // keyPressed[1].east = true;
            // this.turnCheckerDirection = 'east';
            // this.currentPlayer = 2;

            if (gp.axes[2] < 0.5 && gp.axes[3] < -0.5) {
              // console.log('right',gp.axes[2],gp.axes[3]);
              keyPressed[1].east = true;
              this.players[1].turnCheckerDirection = 'east';
              this.currentPlayer = 2;
            }
            if (gp.axes[2] > 0.5 && gp.axes[3] > -0.5) {
              // console.log('down',gp.axes[2],gp.axes[3]);
              keyPressed[1].south = true;
              this.players[1].turnCheckerDirection = 'south';
              this.currentPlayer = 2;
            }

          }
        }
      }
    }
  }


  this.keyPressed = keyPressed;
  this.showSettingsKeyPress.state = showSettingsKeyPressState;

  let player = this.players[this.currentPlayer-1];
  if (player.defending.state === true && player.defending.count === 0) {
    if (this.keyPressed[this.currentPlayer-1].defend === false) {
      // console.log('player',player.number,' stop defending1');
      player.defending.state = false;
    }
  }

  // if (player.turning.state === true && player.turning.toDirection === this.turnCheckerDirection) {
  //   console.log('player',player.number,' turn-ing');
  //   if (this.keyPressed[this.currentPlayer-1][this.turnCheckerDirection] == false) {
  //     console.log('player',player.number,' turn-stop');
  //     player.turning.state = false;
  //   }
  // }

}
  addListeners = (canvas,canvas2) => {
    // console.log('adding listeners');

    canvas2.addEventListener("click", e => {
      this.getCanvasClick(canvas2, e)
    });

    // canvas3.addEventListener("click", e => {
    //   this.getSettingsCanvasClick(canvas3, e)
    // });

    // if (this.showSettingsCanvasData.state === true) {
    //   canvas3.addEventListener("click", e => {
    //     this.getSettingsCanvasClick(canvas3, e)
    //   });
    // }


    document.addEventListener("keydown", e => {
      this.handleKeyPress(e, true)
    });
    document.addEventListener("keyup", e => {
      this.handleKeyPress(e, false)
    });

    canvas2.addEventListener("mousemove", e => {

      // this.getCanvasClick(canvas2, e)
    });


  }
  getCanvasClick = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()

    const x = (event.clientX - rect.left);
    const y = (event.clientY - rect.top);
    console.log("clicked the canvas", 'x: ',x,'y: ',y,'zoom',this.camera.zoom.x,'pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));

    let insideGrid = false;

    for(const cell of this.gridInfo) {
      let point = [x,y];
      let polygon = [];
      for (const vertex of cell.vertices) {
        let vertexPoint = [vertex.x+10,vertex.y+5];

        polygon.push(vertexPoint)
      }
      let pip = pointInPolygon(point, polygon)
      if (pip === true) {
        insideGrid = true;
        // console.log("clicked a cell",cell.number,"x: " + x + " y: " + y);
        this.clicked = cell;
        this.showCellInfoBox = true;
      }
    }
    if ( insideGrid === false ) {
      // console.log("clicked the canvas", 'x: ',x,'y: ',y);
      this.showCellInfoBox = false;
      this.clicked = {
        number:{
          x:0,
          y:0
        },
        center:{
          x:0,
          y:0
        },
        drawCenter:{
          x:0,
          y:0
        },
        vertices: [
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
        ],
        side: 0,
        levelData: '',
        edge: {
          state: false,
          side: ''
        },
        terrain: {
          name: '',
          type: '',
          effect: ''
        },
        item: {
          name: '',
          type: '',
          subType: '',
          effect: '',
          initDrawn: false
        },
        void: {
          state: false
        },
      }
    }

  }
  getSettingsCanvasClick = (canvas, event) => {
    // console.log('getSettingsCanvasClick');

    const rect = canvas.getBoundingClientRect()

    const x = (event.clientX - rect.left);
    const y = (event.clientY - rect.top);

    let insideGrid = false;

    for(const cell of this.settingsGridInfo) {
      let point = [x,y];
      let polygon = [];
      for (const vertex of cell.vertices) {
        let vertexPoint = [vertex.x+(10/2),vertex.y+(5/2)];

        polygon.push(vertexPoint)
      }
      let pip = pointInPolygon(point, polygon)
      if (pip === true) {
        insideGrid = true;
        // console.log("clicked a cell",cell.number,"x: " + x + " y: " + y);
        this.settingsClicked = cell;
      }
    }
    if ( insideGrid === false ) {
      // console.log("clicked the settings canvas", 'x: ',x,'y: ',y);

      this.settingsClicked = {
        number:{
          x:0,
          y:0
        },
        center:{
          x:0,
          y:0
        },
        drawCenter:{
          x:0,
          y:0
        },
        vertices: [
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
          {
            x:0,
            y:0
          },
        ],
        side: 0,
        levelData: '',
        edge: {
          state: false,
          side: ''
        },
        terrain: {
          name: '',
          type: '',
          effect: ''
        },
        item: {
          name: '',
          type: '',
          subType: '',
          effect: '',
          initDrawn: false
        },
        void: {
          state: false
        },
      }
    }


    if (this.showSettingsCanvasData.state === true) {

      let availibleCells = this.settingsFormPlyrStartPosList[this.settingsFormPlyrStartPosList.length-1].posArray;
      if (this.settingsFormPlyrStartPosList.length < 0) {
        availibleCells = this.settingsFormPlyrStartPosList[this.settingsFormPlyrStartPosList.length-1].posArray;
      }
      let validCell = false;
      for (const cell of availibleCells) {
        if (
          cell.x === this.settingsClicked.number.x &&
          cell.y === this.settingsClicked.number.y
        ) {
          validCell = true;
        }
      }


      if (validCell === true) {

        if (this.showSettingsCanvasData.field.split("_")[0] === 'human') {

          let plyrNo = this.showSettingsCanvasData.plyrNo;

          let newArray = this.settingsFormPlyrStartPosList.map(y => y = {
            plyrNo: y.plyrNo,
            selected: y.selected,
          });

          let plyrChange = newArray.find(x => x.plyrNo === plyrNo);
          plyrChange.selected = {x: this.settingsClicked.number.x ,y: this.settingsClicked.number.y };

          this.getCustomPlyrStartPosList(newArray);


          let newArray2 = this.settingsFormAiStartPosList.map(y => y = {
            plyrNo: y.plyrNo,
            mission: y.mission,
            selected: y.selected,
          });

          this.getCustomAiStartPosList(newArray2);

        }

        if (this.showSettingsCanvasData.field.split("_")[0] === 'ai') {

          let plyrNo = this.showSettingsCanvasData.plyrNo - this.settingsFormPlyrStartPosList.length;
          let type = this.showSettingsCanvasData.type;
          let value = this.settingsClicked.number;

          let newArray3 = this.settingsFormAiStartPosList.map(y => y = {
            plyrNo: y.plyrNo,
            mission: y.mission,
            selected: y.selected,
          });

          let plyrChange = newArray3.find(x => x.plyrNo === plyrNo);

          if (plyrChange.selected.length === 0) {
            plyrChange.selected.push({type:type,cell:{x:value.x,y:value.y}})
          }
          else {
            // console.log('plyrChange',plyrChange);
            let selectedElem = plyrChange.selected.find(j=>j.type === type)
            let indx = newArray3.findIndex(j=>j.plyrNo === plyrChange.plyrNo)
            if (selectedElem) {
              selectedElem.cell = {x:value.x,y:value.y};
            }
            else {
              plyrChange.selected.push({type:type,cell:{x:value.x,y:value.y}});
            }
          }

          this.getCustomAiStartPosList(newArray3)

        }

      }
      else {
        // console.log('cant choose that cell',this.settingsClicked.number);
      }

    }

    this.setState({
      stateUpdater: '..'
    })

  }
  handleKeyPress = (event, state) => {

    // console.log('handling key press', event.key, state);


    let direction;
    let keyInput = event.key

    switch(keyInput) {
      // case 'q' :
      //  this.keyPressed[0].northWest = state;
      //  // direction = 'northWest';
      //  this.turnCheckerDirection = 'northWest';
      //  this.currentPlayer = 1;
      // break;
      // case 'e' :
      //  this.keyPressed[0].northEast = state;
      //  // direction = 'northEast';
      //  this.turnCheckerDirection = 'northEast';
      //  this.currentPlayer = 1;
      // break;
      // case 'z' :
      //  this.keyPressed[0].southWest = state;
      //  // direction = 'southWest';
      //  this.turnCheckerDirection = 'southWest';
      //  this.currentPlayer = 1;
      // break;
      // case 'c' :
      //  this.keyPressed[0].southEast = state;
      //  // direction = 'southEast';
      //  this.turnCheckerDirection = 'southEast';
      //  this.currentPlayer = 1;
      // break;

      case 'w' :
       this.keyPressed[0].north = state;
       // direction = 'north';
       this.players[0].turnCheckerDirection = 'north';
       this.currentPlayer = 1;
      break;
      case 'a' :
       this.keyPressed[0].west = state;
       // direction = 'west';
       this.players[0].turnCheckerDirection = 'west';
       this.currentPlayer = 1;
      break;
      case 'd' :
       this.keyPressed[0].east = state;
       // direction = 'east';
       this.players[0].turnCheckerDirection = 'east';
       this.currentPlayer = 1;
      break;
      case 's' :
       this.keyPressed[0].south = state;
       // direction = 'south';
       this.players[0].turnCheckerDirection = 'south';
       this.currentPlayer = 1;
      break;
      case 'f' :
       this.keyPressed[0].attack = state;
       this.currentPlayer = 1;
      break;
      case 'v' :
       this.keyPressed[0].defend = state;
       this.currentPlayer = 1;
      break;
      case ' ' :
        if (
          state === false &&
          this.players[0].moving.state === true &&
          this.players[0].strafing.state === true
        ) {
          this.players[0].strafeReleaseHook = true
        }
        else {
          this.keyPressed[0].strafe = state;
          this.players[0].strafing.state = state;
          this.currentPlayer = 1;
        }
      break;
      case '1' :
        if (this.players[0].dead.state === true) {
          this.respawn(this.players[0])
        }
      break;
      case 'r' :
        this.restartGame();
        if (Object.keys(this.updateSettingsFormAiDataData).length !== 0) {
          this.loadAiSettings();
        }
      break;
      case '2' :
       this.keyPressed[0].cycleWeapon = state;
       this.currentPlayer = 1;
      break;
      case '3' :
       this.keyPressed[0].cycleArmor = state;
       this.currentPlayer = 1;
      break;
      case 'c' :
       this.keyPressed[0].dodge = state;
       this.currentPlayer = 1;
      break;


      // case 'p' :
      //  this.openVoid = !this.openVoid;
      // break;

      case '4' :
       // this.toggleCameraMode(state);
       this.toggleCameraMode = state ;
      break;
      case '5' :
       this.addAiPlayerKeyPress = state;
      break;
      case 'Enter' :
        this.showSettingsKeyPress.state = state;
      break;


      // case 'ArrowUp' :
      //   this.keyPressed[2].north = state;
      //   this.turnCheckerDirection = 'north';
      //   this.currentPlayer = 3;
      // break;
      // case 'ArrowDown' :
      //   this.keyPressed[2].south = state;
      //   this.turnCheckerDirection = 'south';
      //   this.currentPlayer = 3;
      // break;


      // case 'u' :
      //  this.keyPressed[1].northWest = state;
      //  // direction = 'northWest';
      //  this.turnCheckerDirection = 'northWest';
      //  this.currentPlayer = 2;
      // break;
      // case 'o' :
      //  this.keyPressed[1].northEast = state;
      //  // direction = 'northEast';
      //  this.turnCheckerDirection = 'northEast';
      //  this.currentPlayer = 2;
      // break;
      // case 'm' :
      //  this.keyPressed[1].southWest = state;
      //  // direction = 'southWest';
      //  this.turnCheckerDirection = 'southWest';
      //  this.currentPlayer = 2;
      // break;
      // case '.' :
      //  this.keyPressed[1].southEast = state;
      //  // direction = 'southEast';
      //  this.turnCheckerDirection = 'southEast';
      //  this.currentPlayer = 2;
      // break;

      case 'i' :
       this.keyPressed[1].north = state;
       // direction = 'north';
       this.players[1].turnCheckerDirection = 'north';
       this.currentPlayer = 2;
      break;

      case 'j' :
       this.keyPressed[1].west = state;
       // direction = 'west';
       this.players[1].turnCheckerDirection = 'west';
       this.currentPlayer = 2;
      break;
      case 'k' :
       this.keyPressed[1].south = state;
       // direction = 'south';
       this.players[1].turnCheckerDirection = 'south';
       this.currentPlayer = 2;
      break;
      case 'l' :
       this.keyPressed[1].east = state;
       // direction = 'east';
       this.players[1].turnCheckerDirection = 'east';
       this.currentPlayer = 2;
      break;
      case 'b' :
       this.keyPressed[1].attack = state;
       this.currentPlayer = 2;
      break;
      case 'n' :
       this.keyPressed[1].defend = state;
       this.currentPlayer = 2;
      break;
      case '/' :
        if (
          state === false &&
          this.players[1].moving.state === true &&
          this.players[1].strafing.state === true
        ) {
          this.players[1].strafeReleaseHook = true
        }
        else {
          this.keyPressed[1].strafe = state;
          this.players[1].strafing.state = state;
          this.currentPlayer = 2;
        }
      break;
      case '0' :
        if (this.players[1].dead.state === true) {
          this.respawn(this.players[1])
        }
      break;
      case '9' :
       this.keyPressed[1].cycleWeapon = state;
       this.currentPlayer = 2;
      break;
      case '8' :
       this.keyPressed[1].cycleArmor = state;
       this.currentPlayer = 2;
      break;
      case 'm' :
       this.keyPressed[1].dodge = state;
       this.currentPlayer = 2;
      break;
    }

    let player = this.players[this.currentPlayer-1];

    // if (player.turning.state === true && player.turning.toDirection === this.turnCheckerDirection) {
    //   // console.log('player',player.number,' turn-ing');
    //   if (this.keyPressed[this.currentPlayer-1][this.turnCheckerDirection] == false) {
    //     // console.log('player',player.number,' turn-stop');
    //     player.turning.state = false;
    //   }
    // }

    if (player.defending.state === true && player.defending.count === 0) {
      if (this.keyPressed[this.currentPlayer-1].defend === false) {
        // console.log('player',player.number,' stop defending1');
        player.defending.state = false;
      }
    }

    //
    // for (const player of this.players) {
    //   this.playerUpdate(player, this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);
    // }
    // this.time++
    // this.setState({
    //   stateUpdater: '..'
    // })

  }

  toggleCellInfoBox = () => {

    this.showCellInfoBox = !this.showCellInfoBox;

  }
  loadSettings = (event) => {
    event.preventDefault();

    let gridSize = event.target.gridSize.value;
    let playerNumber = event.target.humanPlayers.value;
    let aiPlayerNumber = event.target.aiCount.value;

    switch(gridSize) {
      case '3' :
        this.gridWidth = 3;
        this.sceneY = this.state.sceneY.three;
      break;
      case '6' :
        this.gridWidth = 6;
        this.sceneY = this.state.sceneY.six;
      break;
      case '9' :
        this.gridWidth = 9;
        this.sceneY = this.state.sceneY.nine;
      break;
      case '12' :
        this.gridWidth = 12;
        this.sceneY = this.state.sceneY.twelve;
      break;
    }

    let gamepad = false;
    if (event.target.input.value === 'Gamepad') {
      gamepad = true;
    }
    this.gamepad = gamepad;


    if (playerNumber < 2) {
      this.players.splice(1,1)
      this.playerNumber = 1;
    }


    for (const plyr of this.settingsFormPlyrStartPosList) {
      this.players[plyr.plyrNo-1].startPosition.cell.number = plyr.selected
    }

    if (this.updateSettingsFormAiDataData.startItems === true) {
      this.disableInitItems = false;
    } else {
      this.disableInitItems = true;
    }

    this.restartGame();

    this.placeItems({init: true, items: ''});

    if (aiPlayerNumber > 0) {

      this.loadAiSettings()

    } else {

      this.updateSettingsFormAiDataData = {
        // count: {
        //   count: '0'
        // }
      };
      this.settingsFormAiStartPosList = [];
      this.setState({
        showSettings: false,
      })
      this.showSettingsCanvasData.state = false;

    }

    // console.log('this.settingsFormPlyrStartPosList',this.settingsFormPlyrStartPosList);
    // console.log('this.updateSettingsFormAiData',this.updateSettingsFormAiDataData);
    // console.log('this.settingsFormAiStartPosList',this.settingsFormAiStartPosList);

  }
  loadAiSettings = () => {
    // console.log('this.settingsFormAiStartPosList.length',this.settingsFormAiStartPosList.length);

    // if (this.settingsFormAiStartPosList.length > 0) {


      let initArray = this.updateSettingsFormAiDataData.random.map(x=>x = {
        plyrNo: x.plyrNo,
        random: x.random,
        mode: null,
        weapon: null,
        mission: null,
        startPos: null,
        otherPositions: [],
      });


      for (const plyr of initArray) {

        for (const elem of this.updateSettingsFormAiDataData.mode) {
          if (elem.plyrNo === plyr.plyrNo) {

            if (elem.mode === 'random') {
              let whatMode = this.rnJesus(1,2);

              switch(whatMode) {
                case 1:
                  elem.mode = 'aggressive'
                break;
                case 2:
                  elem.mode = 'careful'
                break;
              }

            }

            plyr.mode = elem.mode;
          }
        }

        for (const elem2 of this.updateSettingsFormAiDataData.weapon) {
          if (elem2.plyrNo === plyr.plyrNo) {

            if (elem2.weapon === 'random') {
              let whatWeapon = this.rnJesus(1,3);

              switch(whatWeapon) {
                case 1:
                  elem2.weapon = 'sword'
                break;
                case 2:
                  elem2.weapon = 'spear'
                break;
                case 3:
                  elem2.weapon = 'crossbow'
                break;
              }

            }

            plyr.weapon = elem2.weapon;
          }
        }

        for (const elem3 of this.updateSettingsFormAiDataData.mission) {
          if (elem3.plyrNo === plyr.plyrNo) {
            plyr.mission = elem3.mission;
          }
        }

        for (const elem4 of this.settingsFormAiStartPosList) {
          if (elem4.plyrNo === plyr.plyrNo) {
            for (const cell of elem4.selected) {
              if (cell.type === 'start') {
                plyr.startPos = cell.cell;
              }
              else {
                plyr.otherPositions.push(cell.cell)
              }
            }
          }
        }

      }

      if (this.updateSettingsFormAiDataData.startItems === true) {
        this.disableInitItems = false;
      } else {
        this.disableInitItems = true;
      }

      // console.log('initArray',initArray);


      for (let i = 1; i < initArray.length+1; i++) {
        setTimeout(() => {
        // setTimeout(function timer() {

          let elem5 = initArray[i-1]

          // console.log('plyr',elem5.plyrNo,'this.addAiCount.state',this.addAiCount.state);

          if (elem5.random === 'random') {
            this.addAiRandomPlayer(elem5.random)
          }
          else {

            this.aiInitSettings = {
              randomStart: false,
              startPosition: {
                number: {
                  x: elem5.startPos.x,
                  y: elem5.startPos.y,
                }
              },
              primaryMission: elem5.mission,
              mission: undefined,
              mode: elem5.mode,
              partolArea: elem5.otherPositions,
              weapon: {
                name: elem5.weapon+'1',
                type: elem5.weapon,
                effect: '',
              },
              armor: {
                name: '',
                type: '',
                effect: '',
              },
            }

            this.addAiPlayer();
          }

        }, i * 1000);
      }


      // this.updateSettingsFormAiDataData = {};
      // this.settingsFormAiStartPosList = [];
      this.setState({
        showSettings: false,
      })


    // }

  }
  cancelSettings = () => {

    // this.updateSettingsFormAiDataData = {};
    this.settingsFormAiStartPosList = [];
    this.setState({
      showSettings: false,
    })
    this.showSettingsCanvasData.state = false;



  }
  openSettings = () => {
    this.setState({
      showSettings: true,
    })

    if (this.showSettingsCanvasData.state === true) {
      this.settingsFormGridWidthUpdate(this.settingsGridWidth)
    }

    this.settingsFormAiGridInfo = this.gridInfo;

    this.getCustomPlyrStartPosList(
      [
        {
          plyrNo: 1,
          selected: undefined,
          posArray: []
        },
        {
          plyrNo: 2,
          selected: undefined,
          posArray: []
        }
      ]
    )

  }
  expandDebugBox = (plyrNo) => {
    if (plyrNo === 1) {
      this.debugBoxStyle = "debugDisplay openDebug"
    }
    if (plyrNo === 2) {
      this.debugBoxStyle2 = "debugDisplay2 openDebug"
    }
  }
  minimizeDebugBox = (plyrNo) => {
    if (plyrNo === 1) {
      this.debugBoxStyle = "debugDisplay closedDebug"
    }
    if (plyrNo === 2) {
      this.debugBoxStyle2 = "debugDisplay2 closedDebug"
    }
  }

  getCustomPlyrStartPosList = (args) => {
    this.settingsFormPlyrGridInfo = this.gridInfo;

    this.playerNumber = args;

    let avoidCells = [];

    this.settingsFormPlyrStartPosList = [];

    for (const plyr of args) {

      let array1 = [];
      if (plyr.selected) {
        avoidCells.push(plyr.selected)
      }

      if (!plyr.selected) {

        let playerStartPos = this.players[plyr.plyrNo-1].currentPosition.cell.number;

        avoidCells.push({x:playerStartPos.x,y:playerStartPos.y})

      }


      if (this.updateSettingsFormAiDataData.count) {
        if (parseInt(this.updateSettingsFormAiDataData.count.count) > 0) {
          for (const plyr2 of this.settingsFormAiStartPosList) {
            for (const selected of plyr2.selected) {
              avoidCells.push(selected.cell)
            }
          }
        }
      }


      for (const elem of this.settingsFormPlyrGridInfo) {

        if (
          this.plyrStartPosCheckCell({x:elem.number.x,y:elem.number.y}) === true
          && !avoidCells.find(elem2 => elem2.x === elem.number.x && elem2.y === elem.number.y)
        ) {
          array1.push({x:elem.number.x,y:elem.number.y});
        }

      }


      if (!plyr.selected) {
        let playerStartPos = this.players[plyr.plyrNo-1].currentPosition.cell.number;

        plyr.selected = {x:playerStartPos.x,y:playerStartPos.y}

      }


      this.settingsFormPlyrStartPosList.push({
        plyrNo:plyr.plyrNo,
        posArray:array1,
        selected: plyr.selected,
      })

      this.setState({
        stateUpdater: '..'
      })

    }


    let lastAvailiblePosArray = this.settingsFormPlyrStartPosList[this.settingsFormPlyrStartPosList.length-1].posArray;
    let hasRandomCell = lastAvailiblePosArray.find(x=>x === 'random')
    if (!hasRandomCell) {
      lastAvailiblePosArray.push('random')
    }
    // console.log('lastAvailiblePosArray',lastAvailiblePosArray);

    for (const elem of this.settingsFormPlyrStartPosList) {
      // console.log('elem',elem);
      elem.posArray = lastAvailiblePosArray;
    }

    this.setState({
      stateUpdater: '..'
    })

    this.settingsFormGridWidthUpdate(this.settingsGridWidth)
    // console.log('this.settingsFormPlyrStartPosList',this.settingsFormPlyrStartPosList);

  }
  plyrStartPosCheckCell = (cell) => {

    let cellFree = true;
    let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y);
    if (
      cell2.levelData.charAt(0) ===  'z' ||
      cell2.levelData.charAt(0) ===  'y'
    ) {
      cellFree = false;
    }
    if (cell2.item.name !== '') {
      cellFree = false;
    }
    if (
      cell2.terrain.type === 'deep' ||
      cell2.terrain.type === 'hazard'
    ) {
      cellFree = false;
    }

    // PLAYERS 1&2 ALT RESPAWN POINTS!
    if (cell.x === this.gridWidth && cell.y === this.gridWidth) {
      cellFree = false;
    }
    if (cell.x === this.gridWidth && cell.y === 0) {
      cellFree = false;
    }

    return cellFree;

  }
  getCustomAiStartPosList = (args) => {
    // console.log('getCustomAiStartPosList',args);

    let avoidCells = [];

    if (args.length === 0) {

      this.settingsFormAiStartPosList = [];

      this.setState({
        stateUpdater: '..'
      })
    }
    else {
      avoidCells = [];
      this.settingsFormAiStartPosList = [];
      for (const plyr of args) {
        // switch(plyr.mission) {
        //   case 'pursue':
        //
        //   break;
        //   case 'patrol':
        //   break;
        //   case 'defend':
        //   break;
        // }

        let array1 = [];
        if (plyr.selected.length > 0) {
          for (const selected of plyr.selected) {
            avoidCells.push(selected.cell)
          }
        }

        if (this.settingsFormPlyrStartPosList[0]) {
          for (const plyr2 of this.settingsFormPlyrStartPosList) {
            avoidCells.push(plyr2.selected)
          }
        }

        for (const elem of this.settingsFormAiGridInfo) {

          if (
            this.checkCell({x:elem.number.x,y:elem.number.y}) === true
            && !avoidCells.find(elem2 => elem2.x === elem.number.x && elem2.y === elem.number.y)
          ) {
            array1.push({x:elem.number.x,y:elem.number.y});
          }

        }
        // console.log('this.settingsFormAiGridInfo',this.settingsFormAiGridInfo);
        // console.log('array1',array1);


        if (plyr.selected.length === 0) {
          let doubleCheckArray = array1;

          if (plyr.mission === 'patrol') {
            avoidCells.push({x:array1[0].x,y:array1[0].y})
            avoidCells.push({x:array1[1].x,y:array1[1].y})
            avoidCells.push({x:array1[2].x,y:array1[2].y})

            plyr.selected.push({type:'start',cell:{x:array1[0].x,y:array1[0].y}})
            plyr.selected.push({type:'patrol1',cell:{x:array1[1].x,y:array1[1].y}})
            plyr.selected.push({type:'patrol2',cell:{x:array1[2].x,y:array1[2].y}})

            doubleCheckArray = array1.filter(i=>i !== array1[0])
            doubleCheckArray = doubleCheckArray.filter(i=>i !== array1[1])
            doubleCheckArray = doubleCheckArray.filter(i=>i !== array1[2])
          }
          if (plyr.mission === 'defend') {
            avoidCells.push({x:array1[0].x,y:array1[0].y})
            avoidCells.push({x:array1[1].x,y:array1[1].y})

            plyr.selected.push({type:'start',cell:{x:array1[0].x,y:array1[0].y}})
            plyr.selected.push({type:'defend',cell:{x:array1[1].x,y:array1[1].y}})

            doubleCheckArray = array1.filter(i=>i !== array1[0])
            doubleCheckArray = doubleCheckArray.filter(i=>i !== array1[1])
          }
          if (plyr.mission === 'pursue') {
            avoidCells.push({x:array1[0].x,y:array1[0].y})

            plyr.selected.push({type:'start',cell:{x:array1[0].x,y:array1[0].y}})

            doubleCheckArray = array1.filter(i=>i !== array1[0])
          }

          array1 = doubleCheckArray;
        }


        this.settingsFormAiStartPosList.push({
          plyrNo:plyr.plyrNo,
          mission:plyr.mission,
          posArray:array1,
          selected: plyr.selected,
        })

        this.setState({
          stateUpdater: '..'
        })

      }

      let lastAvailiblePosArray = this.settingsFormAiStartPosList[this.settingsFormAiStartPosList.length-1].posArray;
      let hasRandomCell = lastAvailiblePosArray.find(x=>x === 'random')
      if (!hasRandomCell) {
        lastAvailiblePosArray.push('random')
      }

      for (const elem of this.settingsFormAiStartPosList) {
        // console.log('elem',elem);
        elem.posArray = lastAvailiblePosArray;
      }

      this.setState({
        stateUpdater: '..'
      })

    }
    // console.log('updateSettingsFormAiData',this.updateSettingsFormAiDataData);
    this.settingsFormGridWidthUpdate(this.settingsGridWidth)

  }
  settingsFormGridWidthUpdate = (args) => {
    // console.log('settingsFormGridWidthUpdate args',args);

    // this.showSettingsCanvasData = {
    //   state: true,
    //   field: 'human_start',
    //   plyrNo: 1,
    //   type: 'start',
    // }

    let prevGridWidth = this.gridWidth;
    let canvas = this.state.canvas;

    this.gridWidth = args;

    let gridInfo;
    this.startProcessLevelData(this.state.canvas);
    gridInfo = this.gridInfo;
    this.processLevelData(gridInfo);

    this.settingsFormAiGridInfo = this.gridInfo;

    this.settingsGridWidth = args;

    if (this.settingsGridWidth === 12) {
      this.settingsCanvasWidth = 700;
      this.settingsCanvasHeight = 400;
      this.settingsSceneX = 350;
      this.settingsSceneY = 50;
    }
    if (this.settingsGridWidth === 9) {
      this.settingsCanvasWidth = 500;
      this.settingsCanvasHeight = 300;
      this.settingsSceneX = 250;
      this.settingsSceneY = 40;
    }
    if (this.settingsGridWidth === 6) {
      this.settingsCanvasWidth = 400;
      this.settingsCanvasHeight = 250;
      this.settingsSceneX = 200;
      this.settingsSceneY = 50;
    }
    if (this.settingsGridWidth === 3) {
      this.settingsCanvasWidth = 300;
      this.settingsCanvasHeight = 150;
      this.settingsSceneX = 150;
      this.settingsSceneY = 40;
    }


    if (this.state.showSettings === true && this.showSettingsCanvasData.state === true) {

      let canvas3 = this.canvasRef3.current;
      let context3 = canvas3.getContext('2d');


      canvas3.addEventListener("click", e => {
        this.getSettingsCanvasClick(canvas3, e)
      });

      let canvas4;
      let context4;

      if (this.showSettingsCanvasData.field.split("_")[0] === 'ai') {
        canvas4 = this.canvasRef4.current;
        context4 = canvas4.getContext('2d');
        canvas4.addEventListener("click", e => {
          this.getSettingsCanvasClick(canvas4, e)
        });
      }



      setTimeout(()=>{
        this.redrawSettingsGrid(canvas3,context3,canvas4,context4);
      }, 30);
    }


    // this.redrawSettingsGrid(this.state.canvas3,this.state.context3);

    this.gridWidth = prevGridWidth;

    this.startProcessLevelData(this.state.canvas);
    gridInfo = this.gridInfo;
    this.processLevelData(gridInfo);

    // this.setState({
    //   stateUpdater: '..'
    // })

    // console.log('-----------xx----------');
    // console.log('this.settingsFormPlyrStartPosList',this.settingsFormPlyrStartPosList);
    // console.log('this.updateSettingsFormAiData',this.updateSettingsFormAiDataData);
    // console.log('this.settingsFormAiStartPosList',this.settingsFormAiStartPosList);

  }
  updateSettingsFormAiData = (args) => {

    this.updateSettingsFormAiDataData = {
      startItems: args.startItems,
      count: args.count,
      random: args.random,
      mode: args.mode,
      weapon: args.weapon,
      mission: args.mission,
    }
    this.setState({
      stateUpdater: '..'
    })
    // console.log('updateSettingsFormAiData',this.updateSettingsFormAiDataData);
    this.settingsFormGridWidthUpdate(this.settingsGridWidth)

  }
  redrawSettingsGrid = (canvas3,context3,canvas4,context4) => {
    // console.log('redrawSettingsGrid');


    let takenSpaces = [];
    for (const elem of this.settingsFormPlyrStartPosList) {

      takenSpaces.push({
        plyrNo: elem.plyrNo,
        type: 'start',
        pos: {
          x: elem.selected.x,
          y: elem.selected.y,
        },
      })
    }
    for (const elem2 of this.settingsFormAiStartPosList) {

      let humanPlyrCount = this.settingsFormPlyrStartPosList.length
      let plyrNo = humanPlyrCount+elem2.plyrNo;

      for (const elem3 of elem2.selected) {

        takenSpaces.push({
          plyrNo: plyrNo,
          type: elem3.type,
          pos: {
            x: elem3.cell.x,
            y: elem3.cell.y,
          },
        })

      }


    }

    let floorImageWidth = this.floorImageWidth;
    let floorImageHeight = this.floorImageHeight;
    let wallImageWidth = this.wallImageWidth;
    let wallImageHeight = this.wallImageHeight;
    let sceneX = this.settingsSceneX;
    let sceneY = this.settingsSceneY;
    let tileWidth = this.tileWidth;

    let wall = this.refs.wall;
    let wall2 = this.refs.wall2;
    let wall3 = this.refs.wall3;

    let floorImgs = {
      grass: this.refs.floorGrass,
      stone: this.refs.floorStone,
      dirt: this.refs.floorDirt,
      pond: this.refs.floorPond,
      mud: this.refs.floorMud,
      sand: this.refs.floorSand,
      ice: this.refs.floorIce,
      lava: this.refs.floorLava,
      bramble: this.refs.floorBramble,
      river: this.refs.floorRiver,
      void: this.refs.floorVoid,
      void2: this.refs.floorVoid2,
      void3: this.refs.floorVoid3,
    }

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    for (var x = 0; x < this.settingsGridWidth+1; x++) {
      for (var y = 0; y < this.settingsGridWidth+1; y++) {

        let p2 = new Point();
        p2.x = x * (tileWidth/2);
        p2.y = y * (tileWidth/2);

        let iso2 = this.cartesianToIsometric(p2);
        let offset2 = {x: (floorImageWidth/2)/2, y: (floorImageHeight/2)}

        // apply offset to center scene for a better view
        iso2.x += sceneX
        iso2.y += sceneY


        let center2 = {
          x: iso2.x - offset2.x/2+(this.cellCenterOffsetX/2),
          y: iso2.y - offset2.y/2-(this.cellCenterOffsetY/2),
        }


        let cell = this.settingsGridInfo.find(elem => elem.number.x === x && elem.number.y === y);
        let cellLevelData = this.settingsGridInfo.find(elem => elem.number.x === x && elem.number.y === y).levelData;


        let floor = floorImgs[cell.terrain.name]

        if (cell.void.state === true) {
          // drawFloor = false;
          floor = floorImgs.void3
        }

        if (x === 9 && y === 9) {
          floor = floorImgs.void2;
        }
        if (x === 9 && y === 0) {
          floor = floorImgs.void2;
        }

        context3.drawImage(floor, iso2.x - offset2.x, iso2.y - offset2.y, 50, 50);

        context3.fillStyle = 'black';
        context3.fillText(""+x+","+y+"",iso2.x - offset2.x/2 + 5,iso2.y - offset2.y/2 + 2)

        // context3.fillStyle = "black";
        // context3.fillRect(center2.x, center2.y,2.5,2.5);

        if (context4) {
          context4.drawImage(floor, iso2.x - offset2.x, iso2.y - offset2.y, 50, 50);
          context4.fillStyle = 'black';
          context4.fillText(""+x+","+y+"",iso2.x - offset2.x/2 + 5,iso2.y - offset2.y/2 + 2)
        }

        let vertices = [
          {x:center2.x, y:center2.y+this.tileWidth/4},
          {x:center2.x+this.tileWidth/2, y:center2.y},
          {x:center2.x, y:center2.y-this.tileWidth/4},
          {x:center2.x-this.tileWidth/2, y:center2.y},
        ];

        for (const vertex of vertices) {
          context3.fillStyle = "yellow";
          context3.fillRect(vertex.x-1.5, vertex.y-1.5,2.5,2.5);
          if (context4) {
            context4.fillStyle = "yellow";
            context4.fillRect(vertex.x-1.5, vertex.y-1.5,2.5,2.5);
          }
        }

        // TAKEN POSITIONS HIGHLIGHT!!
        let floorHighlight;
        for (const space of takenSpaces) {

          if (
            x === space.pos.x &&
            y === space.pos.y
          ) {
            switch(space.plyrNo) {
              case 1:
                floorHighlight = 'blue';
              break;
              case 2:
                floorHighlight = 'red';
              break;
              case 3:
                floorHighlight = 'green';
              break;
              case 4:
                floorHighlight = 'purple';
              break;
              case 5:
                floorHighlight = 'orange';
              break;
              case 6:
                floorHighlight = 'black';
              break;
            }
            context3.lineWidth = 5;
            context3.beginPath();
            if (context4) {
              context4.lineWidth = 5;
              context4.beginPath();
            }
            for (const vertex of vertices) {
              context3.strokeStyle = floorHighlight;
              context3.lineTo(vertex.x, vertex.y);
              if (context4) {
                context4.strokeStyle = floorHighlight;
                context4.lineTo(vertex.x, vertex.y);
              }
            }
            context3.closePath();
            context3.stroke();
            if (context4) {
              context4.closePath();
              context4.stroke();
            }
          }
        }


        let walledTiles = []
        if (walledTiles.includes(''+x+','+y+'')) {
          context3.drawImage(wall3, iso2.x - offset2.x, iso2.y - offset2.y, 50,50);
          if (context4) {
            context4.drawImage(wall3, iso2.x - offset2.x, iso2.y - offset2.y, 50,50);
          }
        }
        if(cellLevelData.charAt(0) === 'y') {
          let offset = {x: wallImageWidth/4, y: wallImageHeight/2}
          context3.drawImage(wall3, (iso2.x) - (offset.x), (iso2.y) - (offset.y), 50,50);
          if (context4) {
            context4.drawImage(wall3, (iso2.x) - (offset.x), (iso2.y) - (offset.y), 50,50);
          }
        }
        if(cellLevelData.charAt(0) === 'z') {
          let offset = {x: wallImageWidth/4, y: wallImageHeight/2}
          context3.drawImage(wall2, iso2.x - offset.x, iso2.y - offset.y, 50,50);
          if (context4) {
            context4.drawImage(wall2, iso2.x - offset.x, iso2.y - offset.y, 50,50);
          }

          let isoHeight = (wallImageHeight/2) - (floorImageHeight/2)
          offset.y += isoHeight
          context3.drawImage(wall2, iso2.x - offset.x, iso2.y - offset.y, 50,50);
          if (context4) {
            context4.drawImage(wall2, iso2.x - offset.x, iso2.y - offset.y, 50,50);
          }

        }

      }
    }

    this.setState({
      stateUpdater: '..'
    })

  }
  updateSettingsCanvasData = (args) => {
    // console.log('updateSettingsCanvasData',args);

    let el = document.getElementsByClassName('settingsOverlay')[0];
    let el2 = document.getElementsByClassName('settingsContainer')[0];
    // console.log('xx',el.scrollLeft, el.scrollTop);
    console.log('xx',el2.scrollLeft, el2.scrollTop);

    let humanPlyrCount = this.settingsFormPlyrStartPosList.length;
    let plyrNo = args.plyrNo;
    if (args.type.split("_")[0] === 'ai') {
      plyrNo = humanPlyrCount+args.plyrNo;
    }


    this.showSettingsCanvasData = {
      state: true,
      field: args.type,
      plyrNo: plyrNo,
      type: args.type.split("_")[1],
    }

    this.setState({
      stateUpdater: '..'
    })

    setTimeout(()=>{
      // this.redrawSettingsGrid(canvas3,context3,canvas4,context4);
      this.settingsFormGridWidthUpdate(this.settingsGridWidth)
    }, 30);
    // this.settingsFormGridWidthUpdate(this.settingsGridWidth)


    // this.setState({
    //   stateUpdater: '..'
    // })

  }


  gameLoop = () => {

    // SETTINGS KEYPRESS
    if (this.showSettingsKeyPress.state === true) {
      if (this.showSettingsKeyPress.count < this.showSettingsKeyPress.limit) {
        this.showSettingsKeyPress.count++;
      }
      if (this.showSettingsKeyPress.count >= this.showSettingsKeyPress.limit) {
        if (this.state.showSettings !== true) {
          this.setState({
            showSettings: true
          })
          if (this.showSettingsCanvasData.state === true) {
            this.settingsFormGridWidthUpdate(this.settingsGridWidth)
          }

          // this.redrawSettingsGrid();
        } else {

          // this.updateSettingsFormAiDataData = {};
          this.settingsFormAiStartPosList = [];
          this.setState({
            showSettings: false
          })
        }
        this.showSettingsKeyPress = {
          state: false,
          count: 0,
          limit: this.showSettingsKeyPress.limit,
        }
      }

    }

    if (this.state.showSettings !== true) {

      // let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
      this.stepper.currentTime = (new Date()).getTime();
      this.stepper.deltaTime = (this.stepper.currentTime-this.stepper.lastTime);

      if(this.stepper.deltaTime > this.stepper.interval) {

        this.time++
        // if (this.time === 200) {
        //   this.openVoid = true;
        // OR
        //   this.customCellToVoid({x:2,y:2})
        // }

        this.setState({
          stateUpdater: '..'
        })



        if (this.gamepad === true) {
          this.pollGamepads();
        }


        // REMOVE AI PLAYER!
        if (this.removeAi && this.addAiCount.state !== true) {

          let aiPlayer = this.players[this.removeAi-1]
          let newArray = this.players.filter(x=> x !== aiPlayer);
          this.players = [];
          this.players = newArray;
          this.removeAi = undefined;
        }


        for (const player of this.players) {

          this.playerUpdate(player, this.state.canvas, this.state.context, this.state.canvas2, this.state.context2, this.state.canvas3, this.state.context3);
        }


        this.stepper.lastTime = this.stepper.currentTime - (this.stepper.deltaTime % this.stepper.interval);
      }

    }

    requestAnimationFrame(this.gameLoop);

  }
  playerUpdate = (player, canvas, context, canvas2, context2, canvas3, context3) => {
    // console.log('updating player',player.number);

    let keyPressedDirection;
    if (player.ai.state === true && player.dead.state === true) {

    }
    else {
      for (const [key, value] of Object.entries(this.keyPressed[player.number-1])) {
        // console.log(`${key}: ${value} ....${player.number}`);

        if (
          key !== 'strafe' &&
          key !== 'attack' &&
          key !== 'defend' &&
          key !== 'dodge' &&
          value === true
        ) {
          // if (player.ai.state === true) {
          //   console.log('ai pressed',key,'plyr',player.number);
          // }
          // console.log('pressed1',key,'plyr',player.number);

          keyPressedDirection = key;
        }


      }
    }


    let nextPosition;


    if (player.dead.state === true) {

      if (player.dead.count > 0 && player.dead.count < player.dead.limit+1) {
        player.dead.count++
        // console.log('player',player.number,'dying',player.dead.count);
      }
      else if (player.dead.count >= player.dead.limit) {
        player.dead.count = 0;
      }
    }
    if (player.dead.state === true && player.dead.count === 0) {
      // console.log('done dying remove from board');
      player.nextPosition = {
        x: -30,
        y: -30,
      }
    }


    // OPEN VOID!!???
    if (this.openVoid === true) {

      if (this.cellToVoid.state !== true) {
        // console.log('set a new cell to void');

        let cell = {
          x: 0,
          y: 0
        }

        let voidChance = Math.round(1000/this.gridWidth)
        let openVoid = this.rnJesus(1,voidChance);

        if (openVoid === 1) {
          // console.log('boom');
          cell.x = this.rnJesus(0,this.gridWidth)
          cell.y = this.rnJesus(0,this.gridWidth)

          this.cellToVoid.state = true;
          this.cellToVoid.x = cell.x;
          this.cellToVoid.y = cell.y;
          this.cellToVoid.count = 1;
        }

      }
      else if (this.cellToVoid.state === true) {
        // console.log('already voiding a cell');
        if (this.cellToVoid.count < this.cellToVoid.limit) {
          this.cellToVoid.count++
          // console.log('cv',this.cellToVoid.count);
        }
        else if (this.cellToVoid.count >= this.cellToVoid.limit) {
          // console.log('summon void now',this.cellToVoid.x,this.cellToVoid.y);

          let cell = {
            x: this.cellToVoid.x,
            y: this.cellToVoid.y,
          }

          this.voidSummon(cell);

          this.cellToVoid = {
            state: false,
            x: 0,
            y: 0,
            count: 0,
            limit: this.cellToVoid.limit,
          }

          if (this.voidCustomCell === true) {
            // console.log('void custom cell switch off');
            this.openVoid = false
            this.voidCustomCell = false;
          }

        }

      }

    }
    // LIMIT CELL VOID EVENT!!
    if (this.voidTimer.count < this.voidTimer.limit) {
      this.voidTimer.count++
      // console.log('void count',this.voidTimer.count);
    }
    if (this.voidTimer.count >= this.voidTimer.limit) {
      this.openVoid = false;
      // console.log('void off');
    }


    // STAMINA!!
    if (player.stamina.current < player.stamina.max) {

      player.stamina.current = player.stamina.current + .05;
      player.stamina.current = +(Math.round((player.stamina.current) + "e+" + 3)  + "e-" + 3);
      if (player.stamina.current >= player.stamina.max) {
        player.stamina.current = player.stamina.max;
      }
      if (player.stamina.current === 1) {
        // console.log('out of stamina');
        player.flanking = {
          checking: false,
          preFlankDirection: '',
          direction: '',
          state: false,
          step: 0,
          target1: {x:0 ,y:0},
          target2: {x:0 ,y:0},
        }
        player.dodging = {
          countState: false,
          state: false,
          count: 0,
          limit: 20,
          peak: {
            start: 5,
            end: 10,
          }
        }
        if (player.success.deflected.state !== true) {
          this.players[player.number-1].success.deflected = {
            state: true,
            count: 1,
            limit: this.deflectedLengthRef.outOfStamina,
            predeflect: this.players[player.number-1].success.deflected.predeflect,
            type: 'outOfStamina',
          };


          if (this.aiDeflectedCheck.includes(this.players[player.number-1].number) !== true) {
            this.aiDeflectedCheck.push(this.players[player.number-1].number)
          }
        }

      }
      if (player.stamina.current <= 4) {
        if (player.ai.state === true) {
          console.log('ai player',player.number,' almost out of stamina. Retreat');
          player.ai.mission = 'retreat';

          if (!player.popups.find(x=>x.msg === 'missionRetreat')) {
            player.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'missionRetreat',
                img: '',

              }
            )
          }

        }
      }
    }


    // CHECK AND SET DEFLECTION!!
    if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit) {
      player.action = 'deflected';
      player.success.deflected.count++

      if (player.success.deflected.count === 2) {
        // console.log('count',player.success.deflected.count,'limit',player.success.deflected.limit,'type',player.success.deflected.type);

        if (player.success.deflected.type === 'blunt_attacked' || player.success.deflected.type === 'defended') {

          player.popups.push(
            {
              state: false,
              count: 0,
              limit: player.success.deflected.limit,
              type: '',
              position: '',
              msg: 'guardBroken',
              img: '',

            }
          )
        }
        if (player.success.deflected.type === 'attack') {
          player.popups.push(
            {
              state: false,
              count: 0,
              limit: player.success.deflected.limit,
              type: '',
              position: '',
              msg: 'attackParried',
              img: '',

            }
          )
        }
        if (player.success.deflected.type === 'attacked') {
          player.popups.push(
            {
              state: false,
              count: 0,
              limit: player.success.deflected.limit,
              type: '',
              position: '',
              msg: 'injured',
              img: '',

            }
          )
        }
        if (player.success.deflected.type === 'outOfStamina') {
          player.popups.push(
            {
              state: false,
              count: 0,
              limit: player.success.deflected.limit,
              type: '',
              position: '',
              msg: player.success.deflected.type,
              img: '',

            }
          )
        }

      }


      // if (player.ai.state === true) {
      //   player.ai.instructions = []
      //   player.ai.currentInstruction = 0
      //   if (player.ai.mission === 'engage') {
      //     player.ai.engaging.targetAction = ''
      //   }
      // }

    }
    else if (player.success.deflected.state === true && player.success.deflected.count >= player.success.deflected.limit) {
      // console.log('deflect end',player.success.deflected.type);
      // DEFLECT SPIN!
      let shouldSpin;
      if (player.success.deflected.type === "attack") {
        shouldSpin = this.rnJesus(1,3);
      }
      if (player.success.deflected.type === "defended") {
        shouldSpin = this.rnJesus(1,10);
      }
      let newDirection;
      if (shouldSpin === 1) {
        switch(player.direction) {
          case 'north':
            if (shouldSpin === 1) {
              newDirection = 'east';
            } else {
              newDirection = 'west';
            }
          break;
          case 'south':
            if (shouldSpin === 1) {
              newDirection = 'east';
            } else {
              newDirection = 'west';
            }
          break;
          case 'east':
            if (shouldSpin === 1) {
              newDirection = 'north';
            } else {
              newDirection = 'south';
            }
          break;
          case 'west':
            if (shouldSpin === 1) {
              newDirection = 'north';
            } else {
              newDirection = 'south';
            }
          break;
        }
        player.direction = newDirection;
      }

      player.action = 'idle';
      player.success.deflected = {
        state: false,
        count: 0,
        limit: player.success.deflected.limit,
        predeflect: player.success.deflected.predeflect,
        type: '',
      }

      let indx = this.aiDeflectedCheck.indexOf(player.number)
      // this.aiDeflectedCheck.splice(indx,1)
      let newArr = this.aiDeflectedCheck.filter(x=>x !== player.number)
      this.aiDeflectedCheck = newArr;
      console.log('this.aiDeflectedCheck',this.aiDeflectedCheck);


      // CANCEL AI ATTACK, DEFEND!!
      if (player.ai.state === true) {
        if (player.ai.state === true) {
          player.attacking = {
            state: false,
            count: 0,
            limit: 15,
          };
        }

        player.defending = {
          state: false,
          count: 0,
          limit: player.defending.limit,
        }

        player.ai.targetAqcuiredReset = true

      }


      if (player.dead.state !== true && player.falling.state !== true) {
        this.deflectDrop(player)
      }


    }


    // DEFLECTED PLAYER CAN'T DO ANYTHING!!
    if (player.success.deflected.state === false && player.dead.state !== true && this.camera.state !== true) {


      // AI STRAFE SWITCH ON!!
      if (player.ai.state === true && this.keyPressed[player.number-1]) {
        if (this.keyPressed[player.number-1].strafe === true) {
          this.players[player.number-1].strafing.state = true;
        }
      }


      // DON'T READ INPUTS. JUST MOVE!!
      if (player.moving.state === true) {

        // console.log('player',player.number,player.action);
        nextPosition = this.lineCrementer(player);
        // player.currentPosition.cell = player.target.cell;
        player.nextPosition = nextPosition;
        // console.log('nextPosition',nextPosition,player.direction);

        if (player.target.void === true) {
          if (player.falling.state === true) {
            // console.log('...');
          } else {
            player.action = 'moving';
            // console.log('stepping into the void',player.action,player.moving.step);
          }

        }

        if (player.jumping.state !== true) {

          if (
            nextPosition.x === player.target.cell.center.x &&
            nextPosition.y === player.target.cell.center.y ||
            nextPosition.x === player.target.cell.center.x+5 &&
            nextPosition.y === player.target.cell.center.y+5
          ) {
            // console.log('next position is destination a',player.number);

            player.newMoveDelay.state = true;


            if (player.target.void === false) {
              player.currentPosition.cell = player.target.cell;
              player.action = 'idle';
              player.moving = {
                state: false,
                step: 0,
                course: '',
                origin: {
                  number: {
                    x: player.target.cell.number.x,
                    y: player.target.cell.number.y
                  },
                  center: {
                    x: player.target.cell.center.x,
                    y: player.target.cell.center.y
                  },
                },
                destination: {
                  x: 0,
                  y: 0,
                }
              }
              if (player.strafing.state === true) {
                player.strafing.state = false;
              }


              this.checkDestination(player);
              if (player.drowning !== true && player.pushBack.state !== true) {
                this.getTarget(player);
              }



            }

            if (player.pushBack.state === true && player.target.void !== true) {


              // CANCEL AI ATTACK, DEFEND!!
              if (player.ai.state === true) {
                if (player.ai.state === true) {
                  player.attacking = {
                    state: false,
                    count: 0,
                    limit: 15,
                  };
                }

                player.defending = {
                  state: false,
                  count: 0,
                  limit: player.defending.limit,
                }

                player.ai.targetAqcuiredReset = true
              }


              player.pushBack.state = false;
              player.strafing = {
                state: false,
                direction: ''
              }
              player.moving.state = false;
              player.speed.move = player.pushBack.prePushMoveSpeed;
              this.getTarget(player);
            }


            // TARGET IS VOID, START FALLING!
            if (
              nextPosition.x === player.target.cell.center.x &&
              nextPosition.y === player.target.cell.center.y &&
              player.target.void === true
            ) {
              player.falling.state = true;
              player.action = 'falling';

              player.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'falling',
                  img: '',

                }
              )
            }

          }
        }

        if (player.jumping.state === true) {
          // console.log('mid jump');


          if (
            nextPosition.x === player.target.cell2.center.x &&
            nextPosition.y === player.target.cell2.center.y ||
            nextPosition.x === player.target.cell2.center.x+5 &&
            nextPosition.y === player.target.cell2.center.y+5
          ) {
            // console.log('at jump destination',player.target.cell2.number);
            // console.log('next position is destination a',player.number);
            player.newMoveDelay.state = true;


            let pushBack = false;
            let opp;

            for (const plyr of this.players) {
              if (
                // plyr.currentPosition.cell.number.x === player.currentPosition.cell.number.x &&
                // plyr.currentPosition.cell.number.y === player.currentPosition.cell.number.y
                // plyr.currentPosition.cell.number.x === player.target.cell2.number.x &&
                // plyr.currentPosition.cell.number.y === player.target.cell2.number.y
                plyr.target.cell.number.x === player.target.cell2.number.x &&
                plyr.target.cell.number.y === player.target.cell2.number.y &&
                plyr.moving.state === true
              ) {

                // console.log('jump destination occupied, fall into target 1',player.direction);

                pushBack = true;
                opp = plyr;
              }
            }

            if (player.target.void === false) {

              player.jumping.state = false;
              player.currentPosition.cell = player.target.cell2;
              player.strafing.state = false;
              player.action = 'idle';
              player.moving = {
                state: false,
                step: 0,
                course: '',
                origin: {
                  number: {
                    x: player.target.cell2.number.x,
                    y: player.target.cell2.number.y
                  },
                  center: {
                    x: player.target.cell2.center.x,
                    y: player.target.cell2.center.y
                  },
                },
                destination: {
                  x: 0,
                  y: 0,
                }
              }

              this.checkDestination(player);
              let trgt = this.getTarget(player);

              if (pushBack === true ) {

                let playerAPushDir;
                let playerBPushDir;
                switch(opp.direction) {
                  case 'north' :
                    playerAPushDir = 'south';
                  break;
                  case 'south' :
                    playerAPushDir = 'north';
                  break;
                  case 'east' :
                    playerAPushDir = 'west';
                  break;
                  case 'west' :
                    playerAPushDir = 'east';
                  break;
                }
                switch(player.direction) {
                  case 'north' :
                    playerBPushDir = 'south';
                  break;
                  case 'south' :
                    playerBPushDir = 'north';
                  break;
                  case 'east' :
                    playerBPushDir = 'west';
                  break;
                  case 'west' :
                    playerBPushDir = 'east';
                  break;
                }


                player.strafing = {
                  state: true,
                  direction: playerAPushDir
                }
                player.action = 'strafe moving';
                player.moving = {
                  state: true,
                  step: 0,
                  course: '',
                  origin: {
                    number: {
                      x: player.currentPosition.cell.number.x,
                      y: player.currentPosition.cell.number.y
                    },
                    center: {
                      x: player.currentPosition.cell.center,
                      y: player.currentPosition.cell.center
                    },
                  },
                  destination: player.target.cell2.center
                }
                player.target.void = true;
                let nextPosition = this.lineCrementer(player);
                player.nextPosition = nextPosition;



              }

            }

            let targetCell = this.gridInfo.find(elem => elem.number.x === player.target.cell2.number.x && elem.number.y === player.target.cell2.number.y)
            if (
              targetCell.void.state === true
            ) {
              player.falling.state = true;
              player.action = 'falling';

              player.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'falling',
                  img: '',

                }
              )
            }

          }

        }

      }


      // CAN READ INPUTS
      else if (player.moving.state === false) {


        // MOVEMENT OVERLAP PUSHBACK!!
        for (const plyr4 of this.players) {
          if (
            player.number !== plyr4.number &&
            player.currentPosition.cell.number.x === plyr4.currentPosition.cell.number.x &&
            player.currentPosition.cell.number.y === plyr4.currentPosition.cell.number.y
          ) {
            // console.log('buck up btwn plyrs',player.number,plyr4.number,"@",player.currentPosition.cell.number,plyr4.currentPosition.cell.number);


            let playerAPushDir2;
            let playerBPushDir2;
            switch(plyr4.direction) {
              case 'north' :
                playerAPushDir2 = 'south';
              break;
              case 'south' :
                playerAPushDir2 = 'north';
              break;
              case 'east' :
                playerAPushDir2 = 'west';
              break;
              case 'west' :
                playerAPushDir2 = 'east';
              break;
            }
            switch(player.direction) {
              case 'north' :
                playerBPushDir2 = 'south';
              break;
              case 'south' :
                playerBPushDir2 = 'north';
              break;
              case 'east' :
                playerBPushDir2 = 'west';
              break;
              case 'west' :
                playerBPushDir2 = 'east';
              break;
            }

            let canPush = this.pushBack(plyr4,playerAPushDir2)
            let canPush2 = this.pushBack(player,playerBPushDir2)

          }
        }


        // TURNER!!
        if (player.turning.state === true && player.turning.toDirection === this.players[player.number-1].turnCheckerDirection) {
          // console.log('player',player.number,' turn-ing');
          if (this.keyPressed[this.currentPlayer-1][this.players[player.number-1].turnCheckerDirection] === false) {
            // console.log('player',player.number,' turn-stop');
            player.turning.state = false;
          }
        }


        // CHECK CELL UNDER ATTACK!!
        for (const cell of this.cellsUnderAttack) {
          if (cell.count < cell.limit) {
            cell.count++
          }
          else if (cell.count >= cell.limit) {
            let index = this.cellsUnderAttack.indexOf(cell)
            this.cellsUnderAttack.splice(index,1)
          }

        }


        // // IDLE ANIM STEPPER!
        if (player.action === 'idle') {
          // player.idleAnim.state = true
          if (player.idleAnim.count < player.idleAnim.limit+1) {
            // console.log('player.idleAnim.count',player.idleAnim.count);
            player.idleAnim.count++

          }
          if (player.idleAnim.count >= player.idleAnim.limit+1) {
            player.idleAnim.count = 0;
            player.idleAnim.state = false;
          }
        }
        else if (player.action !== 'idle') {
          // player.idleAnim.state = false;
          player.idleAnim.count = 0;
        }


        // BREAK ANIM STEPPERS!
        if (player.breakAnim.attack.state === true) {
          if (player.breakAnim.attack.count > 0 && player.breakAnim.attack.count < player.breakAnim.attack.limit) {
            player.breakAnim.attack.count++
          }
          else if (player.breakAnim.attack.count >= player.breakAnim.attack.limit) {
            player.breakAnim.attack = {
              state: false,
              count: 0,
              limit: player.breakAnim.attack.limit
            }
          }
        }
        if (player.breakAnim.defend.state === true) {
          if (player.breakAnim.defend.count > 0 && player.breakAnim.defend.count < player.breakAnim.defend.limit) {
            player.breakAnim.defend.count++
          }
          else if (player.breakAnim.defend.count >= player.breakAnim.defend.limit) {
            player.breakAnim.defend = {
              state: false,
              count: 0,
              limit: player.breakAnim.defend.limit
            }
          }
        }


        // KEY PRESS RELEASE CHECKS!!
        if (player.turning.state === false && player.flanking.state !== true) {
          // console.log('turn complete');s
          player.direction = player.turning.toDirection;
          player.nextPosition = {
            x: player.currentPosition.cell.center.x,
            y: player.currentPosition.cell.center.y
          }
          player.moving = {
            state: false,
            step: 0,
            course: '',
            origin: {
              number: {
                x: player.currentPosition.cell.number.x,
                y: player.currentPosition.cell.number.y
              },
              center: {
                x: player.currentPosition.cell.center.x,
                y: player.currentPosition.cell.center.y
              },
            },
            destination: player.target.cell.center
          }
          player.turning.toDirection = '';
          player.turning.state = undefined;
          this.getTarget(player);
        }
        if (player.defending.state === false && player.defending.count === 0) {

          player.defending = {
            state: false,
            count: 0,
            limit: player.defending.limit
          }

          let defendPopup = player.popups.find(x=>x.msg.split("_")[0] === 'defending')
          if (defendPopup) {
            player.popups.splice(player.popups.findIndex(x=>x.msg === 'defending'),1)
          }
          if (player.falling.state !== true && player.moving.state !== true) {
            player.action = 'idle';
          }

        }
        if (this.keyPressed[player.number-1].defend === false && player.defending.state === true) {
          player.defending = {
            state: false,
            count: 0,
            limit: player.defending.limit
          }
          player.action = 'idle';
        }
        if (player.strafeReleaseHook === true ) {
          player.strafing.state = false;
          player.strafeReleaseHook = false;
        }


        // CHECK & UPDATE ACTIONS IN PROGRESS!!
        if (player.pushBack.state !== true && player.pushBack.prePushBackMoveSpeed !== 0) {

          player.speed.move = player.player.pushBack.prePushBackMoveSpeed;
          player.player.pushBack.prePushBackMoveSpeed = 0;
        }


        // ITEM PICKUP/DROP ANIM COUNTER!
        if (player.itemDrop.state === true) {
          if (player.itemDrop.count < player.itemDrop.limit) {
            player.itemDrop.count++
            // console.log('dropping item anim');
          }
          else if (player.itemDrop.count >= player.itemDrop.limit) {
            player.itemDrop = {
              state: false,
              count: 0,
              limit: 10,
              item: {
                name: '',
              },
              gear: {
                type: '',
              }
            }
          }
        }
        if (player.itemPickup.state === true) {
          if (player.itemPickup.count < player.itemPickup.limit) {
            player.itemPickup.count++
            // console.log('picking item anim');
          }
          else if (player.itemPickup.count >= player.itemPickup.limit) {
            player.itemPickup = {
              state: false,
              count: 0,
              limit: 10,
              item: {
                name: '',
              },
              gear: {
                type: '',
              }
            };
          }
        }


        // CELL BY CELL MOVEMENT DELAY COUNTER!
        if (player.newMoveDelay.state === true) {
          if (player.newMoveDelay.count < player.newMoveDelay.limit) {
            player.newMoveDelay.count++;
            // console.log('newMoveDelay.count',player.newMoveDelay.count);
          }
          if (player.newMoveDelay.count >= player.newMoveDelay.limit) {
            player.newMoveDelay = {
              state: false,
              count: 0,
              limit: player.newMoveDelay.limit,
            }
          }
        }


        // ATTACK/DEFEND/DEFLECT CHECK!!
        if (player.attacking.state === true) {
          let attackPeak = this.attackAnimRef.peak.sword;
          if (player.currentWeapon.type === 'sword') {
            this.players[player.number-1].attacking.limit = this.attackAnimRef.limit.sword;
          }
          if (player.currentWeapon.type === 'spear') {
            this.players[player.number-1].attacking.limit = this.attackAnimRef.limit.spear;
            attackPeak = this.attackAnimRef.peak.spear;
          }
          if (player.currentWeapon.type === 'crossbow') {
            this.players[player.number-1].attacking.limit = this.attackAnimRef.limit.crossbow;
            attackPeak = this.attackAnimRef.peak.crossbow;
          }
          if (player.currentWeapon.type === '') {
            this.players[player.number-1].attacking.limit = this.attackAnimRef.limit.unarmed;
            attackPeak = this.attackAnimRef.peak.unarmed;
          }
          if (player.attacking.count < player.attacking.limit) {
            // console.log('attack wind up',player.attacking.count,'player',player.number);
            player.action = 'attacking';
            player.attacking.count++;

            if (player.attacking.count === 2) {
              player.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 5,
                    type: '',
                    position: '',
                    msg: 'attackStart',
                    img: '',

                  }
                )
            }

          }


          // TIME TO ATTACK IS NOW!
          if (player.attacking.count === attackPeak) {
            console.log('attack peak',player.attacking.count,'plyr',player.number);



            if (player.currentWeapon.type === 'crossbow' && player.items.ammo > 0) {
              // console.log('firing crossbow');

              let plyrX = player;
              let origin = plyrX.currentPosition.cell;
              let currentPosition = plyrX.currentPosition.cell;
              let nextPosition = plyrX.currentPosition.cell.center;

              let projectileId = this.projectiles.length;
              let boltx = {
                id: '000'+projectileId+'',
                owner: plyrX.number,
                origin: origin,
                direction: plyrX.direction,
                moving: {
                  state: false,
                  step: 0,
                  course: '',
                  origin: {
                    number: currentPosition.number,
                    center: currentPosition.center,
                  },
                  destination: {
                    x: 0,
                    y: 0,
                  }
                },
                currentPosition: {
                  number: currentPosition.number,
                  center: currentPosition.center
                },
                nextPosition: {
                  x: nextPosition.x,
                  y: nextPosition.y,
                },
                target: {
                  path: [],
                  free: true,
                  occupant: {
                    type: '',
                    player: '',
                  },
                  void: false,
                },
                speed: this.projectileSpeed,
                kill: false,
              }
              this.projectiles.push(boltx)
              player.items.ammo--
              player.currentWeapon.effect = 'ammo+0';

              this.getBoltTarget(boltx)


              // STAMINA COST!!

              this.players[player.number-1].stamina.current = this.players[player.number-1].stamina.current - this.staminaCostRef.attack.crossbow;
              // console.log('start projectile',boltx.currentPosition.number, this.players[boltx.owner-1].currentPosition.cell.number,this.projectiles);

              // this.boltCrementer(bolt)
            }
            if (player.currentWeapon.type === 'crossbow' && player.items.ammo <= 0) {
              // console.log('no ammo!');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'out of ammo',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }
              player.currentWeapon.effect = 'ammo+0'

              if (!player.popups.find(x=>x.msg === 'outOfAmmo')) {
                player.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: 'outOfAmmo',
                    img: '',

                  }
                )
              }

            }
            else if (player.currentWeapon.type !== 'crossbow' ) {

              this.getTarget(player)

              // CELLS UNDER ATTACK!
              let cellUnderAttack1 = this.gridInfo.find(elem => elem.number.x === player.target.cell.number.x && elem.number.y === player.target.cell.number.y)
              let cellUnderAttack2;
              if (player.currentWeapon.type === 'spear') {
                cellUnderAttack2 = this.gridInfo.find(elem => elem.number.x === player.target.cell2.number.x && elem.number.y === player.target.cell2.number.y)
              }
              if (player.currentWeapon.type === 'spear') {
                // console.log('spear target',player.target);
                if (cellUnderAttack1 && cellUnderAttack1.terrain.type !== 'deep') {
                  this.cellsUnderAttack.push(
                    {
                      number: {
                        x: player.target.cell.number.x,
                        y: player.target.cell.number.y,
                      },
                      count: 1,
                      limit: 8,
                    },
                  )
                }
                if (cellUnderAttack2 && cellUnderAttack2.terrain.type !== 'deep') {
                  this.cellsUnderAttack.push(
                    {
                      number: {
                        x: player.target.cell2.number.x,
                        y: player.target.cell2.number.y,
                      },
                      count: 1,
                      limit: 8,
                    },
                  )

                }
              }
              else if (player.currentWeapon.type === 'sword' || player.currentWeapon.type === '') {
                // console.log('sword target',player.target);
                if (cellUnderAttack1 && cellUnderAttack1.terrain.type !== 'deep') {
                  this.cellsUnderAttack.push({
                    number: {
                      x: player.target.cell.number.x,
                      y: player.target.cell.number.y,
                    },
                    count: 1,
                    limit: 8,
                  })
                }
              }



              // ATTACK PROJECTILES!!
              for (const bolt of this.projectiles) {
                if (player.currentWeapon.type === 'spear') {
                  if (
                    cellUnderAttack2.number.x === bolt.currentPosition.number.x &&
                    cellUnderAttack2.number.y === bolt.currentPosition.number.y
                  ) {
                    bolt.kill = true;

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'boltKilled',
                        img: '',

                      }
                    )
                  }
                }
                if (player.currentWeapon.type === 'sword') {
                  if (
                    cellUnderAttack1.number.x === bolt.currentPosition.number.x &&
                    cellUnderAttack1.number.y === bolt.currentPosition.number.y
                  ) {
                    bolt.kill = true;

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'boltKilled',
                        img: '',

                      }
                    )
                  }
                }
              }


              if (player.target.occupant.type === 'player') {

                // ATTACK SUCCESS!!
                if (this.players.[player.target.occupant.player-1].defending.state === false || this.players.[player.target.occupant.player-1].direction === player.direction) {
                  console.log('attack success');

                  player.success.attackSuccess = {
                    state: true,
                    count: 1,
                    limit: player.success.attackSuccess.limit
                  }


                  // BACK ATTACK CHECK!
                  let backAttack = false;
                  if (this.players.[player.target.occupant.player-1].direction === player.direction) {
                    // console.log('back attack!!');
                    backAttack = true;
                  }


                  // CALCULATE ATTACKER DOUBLE HIT!
                  let doubleHitChance = player.crits.doubleHit;
                  let singleHitChance = player.crits.singleHit;
                  if (backAttack === true) {
                    if (doubleHitChance > 2) {
                      let diff = doubleHitChance - 2;
                      doubleHitChance = doubleHitChance - diff;
                    }
                  }


                  // ATTACK STRENGTH ARMOR MOD CHECK!
                  if (this.players.[player.target.occupant.player-1].currentArmor.name !== '') {
                    // console.log('opponent armour found');
                    switch(this.players.[player.target.occupant.player-1].currentArmor.effect) {
                      case 'dblhit-5' :
                        doubleHitChance = player.crits.doubleHit+5;
                      break;
                      case 'dblhit-10' :
                        doubleHitChance = player.crits.doubleHit+10;
                      break;
                      case 'dblhit-15' :
                        doubleHitChance = player.crits.doubleHit+15;
                      break;
                      // case 'dblhit-30' :
                      //   doubleHitChance = player.crits.doubleHit+30;
                      // break;
                      case 'snghit-5' :
                        singleHitChance = player.crits.singleHit+5;
                      break;
                      case 'snghit-10' :
                        singleHitChance = player.crits.singleHit+10;
                      break;
                    }
                  }

                  let doubleHit = this.rnJesus(1,doubleHitChance);
                  let singleHit = this.rnJesus(1,singleHitChance);

// -----------
                  // doubleHit = 2
                  // singleHit = 2
// ---------------

                  // UNARMED ATTACK!
                  if ( player.currentWeapon.type === '') {
                    console.log('unarmed attack');
                    doubleHit = 2;
                    if (singleHitChance === 1) {
                      let singleHit = this.rnJesus(1,2);
                    }

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit.unarmed-this.attackAnimRef.peak.unarmed),
                        type: '',
                        position: '',
                        msg: 'attackingUnarmed',
                        img: '',

                      }
                    )
                  }


                  // BLUNT ATTACK!!
                  if (player.bluntAttack === true) {
                    // console.log('blunt attack');
                    player.stamina.current = player.stamina.current - this.staminaCostRef.attack.blunt;

                    singleHit = 2;
                    doubleHit = 2;

                    this.players[player.number-1].statusDisplay = {
                      state: true,
                      status: 'blunt attack!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }


                    let weapon = player.currentWeapon.type;
                    if (weapon === '') {
                      weapon = 'unarmed';
                    }
                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'attackingBlunt',
                        img: '',

                      }
                    )
                  }
                  else {

                    // WEAPON STAMINA COST!!
                    let weapon = player.currentWeapon.type
                    if (weapon === '') {
                      weapon = 'unarmed'
                    }
                    this.players[player.number-1].stamina.current = this.players[player.number-1].stamina.current - this.staminaCostRef.attack[weapon];
                  }


                  // DODGED CHECK!
                  if (this.players[player.target.occupant.player-1].dodging.state === true) {

                    let canDodge = true;
                    if (backAttack === true && player.crits.dodge < 4) {
                      canDodge = false
                    }

                    if (canDodge === true) {

                      console.log('opponent has dodged you');
                      singleHit = 2;
                      doubleHit = 2;


                    }
                  }


                  // ATTACK LANDED!!
                  if (doubleHit === 1) {
                    console.log('double hit attack plyr ',player.number,'against plyr ',player.target.occupant.player);
                    this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 2;
                    player.attackStrength = 2;
                    this.attackedCancel(this.players[player.target.occupant.player-1])

                    if (!this.players[player.target.occupant.player-1].popups.find(x=>x.msg === 'alarmed')) {
                      this.players[player.target.occupant.player-1].popups.push(
                        {
                          state: false,
                          count: 0,
                          limit:25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    if (!player.popups.find(x=>x.msg === 'attacking2')) {
                      player.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: (this.attackAnimRef.limit[player.currentWeapon.type]-this.attackAnimRef.peak[player.currentWeapon.type]),
                          type: '',
                          position: '',
                          msg: 'attacking2',
                          img: '',

                        }
                      )
                    }


                  }
                  else if (singleHit === 1) {
                    console.log('single hit attack plyr ',player.number,'against plyr ',player.target.occupant.player);
                    this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 1;
                    player.attackStrength = 1;
                    this.attackedCancel(this.players[player.target.occupant.player-1])

                    let weapon = player.currentWeapon.type;
                    if (weapon === '') {
                      weapon = 'unarmed'
                    }

                    if (!this.players[player.target.occupant.player-1].popups.find(x=>x.msg === 'alarmed')) {
                      this.players[player.target.occupant.player-1].popups.push(
                        {
                          state: false,
                          count: 0,
                          limit:25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    if (!player.popups.find(x=>x.msg === 'attacking1')) {
                      player.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: (this.attackAnimRef.limit[player.currentWeapon.type]-this.attackAnimRef.peak[player.currentWeapon.type]),
                          type: '',
                          position: '',
                          msg: 'attacking1',
                          img: '',

                        }
                      )
                    }

                  }


                  // CHECK FOR MISS!
                  let missed = false;
                  if (doubleHit !== 1 && singleHit !== 1 && player.bluntAttack !== true) {
                    console.log('attacked but no damage');
                    missed = true;
                    this.players[player.number-1].statusDisplay = {
                      state: true,
                      status: 'attack missed!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }

                    let weapon = player.currentWeapon.type;
                    if (player.currentWeapon.name === '') {
                      weapon = 'unarmed';
                    }

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'missedAttack',
                        img: '',

                      }
                    )
                  }


                  // REDUCE MOVE SPEED!
                  if (this.players[player.target.occupant.player-1].hp === 1) {
                    this.players[player.target.occupant.player-1].speed.move = .05;
                  }


                  // KILL OPPONENT!
                  if (this.players[player.target.occupant.player-1].hp <= 0) {
                    this.killPlayer(this.players[player.target.occupant.player-1]);

                    let randomItemIndex = this.rnJesus(0,this.itemList.length-1)
                    this.placeItems({init: false, item: this.itemList[randomItemIndex].name})

                    player.points++;

                    if (player.ai.state === true && player.ai.mode === 'aggressive') {
                      console.log('check for evidence of retrieval here and resume retrieve if so',player.ai.retrieving,player.ai.mission);

                      if (player.ai.retrieving.checkin) {

                        player.ai.mission = 'retrieve';

                        if (!player.popups.find(x=>x.msg === 'missionRetrieve')) {
                          player.popups.push(
                            {
                              state: false,
                              count: 0,
                              limit: 25,
                              type: '',
                              position: '',
                              msg: 'missionRetrieve',
                              img: '',

                            }
                          )
                        }

                        let targetSafeData = this.scanTargetAreaThreat({
                          player: player.number,
                          point: {
                            x: player.ai.retrieving.point.x,
                            y: player.ai.retrieving.point.y,
                          },
                          range: 3,
                        })

                        player.ai.retrieving.safe = targetSafeData.isSafe;

                      }

                    }

                  }

                  // ATTACK -> DEFLECT OPPONENT!
                  else if (missed !== true && player.bluntAttack !== true) {
                    this.players[player.target.occupant.player-1].action = 'deflected';
                    this.players[player.target.occupant.player-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.deflectedLengthRef.attacked,
                      predeflect: this.players[player.target.occupant.player-1].success.deflected.predeflect,
                      type: 'attacked',
                    };


                    if (this.aiDeflectedCheck.includes(this.players[player.target.occupant.player-1].number) !== true) {
                      this.aiDeflectedCheck.push(this.players[player.target.occupant.player-1].number)
                    }


                  }

                  // BLUNT ATTACK -> DEFLECT -!
                  else if (player.bluntAttack === true) {
                    this.players[player.target.occupant.player-1].action = 'deflected';

                    this.players[player.target.occupant.player-1].stamina.current = this.players[player.target.occupant.player-1].stamina.current - 3;
                    this.players[player.target.occupant.player-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.deflectedLengthRef.bluntAttacked,
                      predeflect: this.players[player.target.occupant.player-1].success.deflected.predeflect,
                      type: 'blunt_attacked',
                    };

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'attackingBlunt',
                        img: '',

                      }
                    )

                    if (this.aiDeflectedCheck.includes(this.players[player.target.occupant.player-1].number) !== true) {
                      this.aiDeflectedCheck.push(this.players[player.target.occupant.player-1].number)
                    }

                  }

                }

                // ATTACK DEFENDED!!
                else {
                  console.log('attack defended by ',player.target.occupant.player,'against plyr ',player.number);

                  player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'attackDefended',
                      img: '',

                    }
                  )
                  // if (this.players.[player.target.occupant.player-1].direction === player.direction) {
                  //   console.log('defend the rear!!');
                  // }

                  this.moveSpeed = .1;


                  // DEFENDED STATUS DISPLAY!
                  this.players[player.target.occupant.player-1].success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players[player.target.occupant.player-1].success.defendSuccess.limit
                  }

                  this.players[player.target.occupant.player-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'defendSuccess',
                      img: '',

                    }
                  )


                  // UNARMED DAMAGE!
                  // if ( player.currentWeapon.type === '') {
                  //
                  //   let shouldDamageFist = this.rnJesus(1,3);
                  //   if (shouldDamageFist === 1) {
                  //     console.log('unarmed attack defended damaged fist');
                  //     if (player.hp > 1) {
                  //       player.hp = player.hp - 1;
                  //       player.speed.move = .05;
                  //     }
                  //   }
                  // }


                  // PUSHBACK OPPONENT!
                  // let shouldPushBackOpponent = 2;
                  let shouldPushBackOpponent = this.rnJesus(1,this.players[player.target.occupant.player-1].crits.pushBack*2);
                  // shouldPushBackOpponent = 1;
                  if (shouldPushBackOpponent === 1) {
                    // console.log('pushback opponent');
                    let canPushback = this.pushBack(this.players[player.target.occupant.player-1],player.direction);


                  }
                  else {


                    // OPPONENT GUARD BREAK ROLL!
                    // let deflectOpponent = this.rnJesus(1,1);
                    let deflectOpponent = this.rnJesus(1,this.players[player.target.occupant.player-1].crits.guardBreak);
                    if (player.bluntAttack === true) {
                      deflectOpponent = 1;
                    }
                    // deflectOpponent = 1

                    // DEFLECT OPPONENT!
                    if (deflectOpponent === 1) {
                      console.log('opponent guard break player',player.target.occupant.player);
                      this.players[player.target.occupant.player-1].breakAnim.defend = {
                        state: true,
                        count: 1,
                        limit: player.breakAnim.defend.limit,
                      };

                      this.players[player.target.occupant.player-1].defending = {
                        state: false,
                        count: 0,
                        limit: this.players[player.target.occupant.player-1].defending.limit,
                      }
                      this.players[player.target.occupant.player-1].attacking = {
                        state: false,
                        count: 0,
                        limit: this.players[player.target.occupant.player-1].attacking.limit,
                      }

                      this.players[player.target.occupant.player-1].success.deflected = {
                        state: true,
                        count: 1,
                        limit: this.deflectedLengthRef.defended,
                        predeflect: this.players[player.target.occupant.player-1].success.deflected.predeflect,
                        type: 'defended',
                      };
                      this.players[player.target.occupant.player-1].stamina.current = this.players[player.target.occupant.player-1].stamina.current - 3;


                      if (this.aiDeflectedCheck.includes(this.players[player.target.occupant.player-1].number) !== true) {
                        this.aiDeflectedCheck.push(this.players[player.target.occupant.player-1].number)
                      }


                    }

                  }

                  // ATTACKER PUSHBACK DEFLECT!!

                  let shouldDeflectAttacker;

                  // let shouldDeflectAttacker = this.rnJesus(1,2);

                  let shouldDeflectPushBack;

                  shouldDeflectAttacker = this.rnJesus(1,player.crits.pushBack);
                  shouldDeflectPushBack = this.rnJesus(1,player.crits.pushBack);


                  if (
                    this.players[player.target.occupant.player-1].defending.state === true &&
                    player.defendDecay.state !== true ||
                    player.defendDecay.state === true &&
                    player.defendDecay.count < 4
                  ) {
                    console.log('peak defend/parry');
                    shouldDeflectAttacker = this.rnJesus(1,1);
                    shouldDeflectPushBack = this.rnJesus(1,1);

                    player.statusDisplay = {
                      state: true,
                      status: 'Parry!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'attackParried',
                        img: '',

                      }
                    )
                  }
                  else {
                    // console.log('off peak defend');
                    shouldDeflectAttacker = this.rnJesus(1,player.crits.pushBack);
                    shouldDeflectPushBack = this.rnJesus(1,player.crits.pushBack);

                    player.statusDisplay = {
                      state: true,
                      status: 'Defend',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'attackDefended',
                        img: '',

                      }
                    )
                  }

                  shouldDeflectPushBack = 1;
                  shouldDeflectAttacker = 1;


                  if (shouldDeflectPushBack === 1) {
                    let pushBackDirection;
                    switch(player.direction) {
                      case 'north' :
                        pushBackDirection = 'south';
                      break;
                      case 'south' :
                        pushBackDirection = 'north';
                      break;
                      case 'east' :
                        pushBackDirection = 'west';
                      break;
                      case 'west' :
                        pushBackDirection = 'east';
                      break;
                      case 'northEast' :
                        pushBackDirection = 'southWest';
                      break;
                      case 'northWest' :
                        pushBackDirection = 'southEast';
                      break;
                      case 'southWest' :
                        pushBackDirection = 'northEast';
                      break;
                      case 'southEast' :
                        pushBackDirection = 'northWest';
                      break;
                    }

                    let canPushback = this.pushBack(player,pushBackDirection);

                    if (canPushback === true && shouldDeflectAttacker === 1) {
                      // console.log('predeflect --> pushback');
                      player.success.deflected.predeflect = true;
                    }
                    else if (canPushback === false && shouldDeflectAttacker === 1) {
                      // console.log('no pushback ---> just deflect');

                      player.defending = {
                        state: false,
                        count: 0,
                        limit: this.players[player.target.occupant.player-1].defending.limit,
                      }
                      player.attacking = {
                        state: false,
                        count: 0,
                        limit: this.players[player.target.occupant.player-1].attacking.limit,
                      }

                      player.success.deflected = {
                        state: true,
                        count: 1,
                        limit: this.deflectedLengthRef.attack,
                        predeflect: player.success.deflected.predeflect,
                        type: 'attack'
                      }


                      if (this.aiDeflectedCheck.includes(player.number) !== true) {
                        this.aiDeflectedCheck.push(player.number)
                      }

                    }


                    if (this.aiDeflectedCheck.includes(player.number) !== true) {
                      this.aiDeflectedCheck.push(player.number)
                    }

                  }

                  // ATTACKER NO PUSHBACK, JUST DEFLECT!
                  else if (shouldDeflectPushBack !== 1 && shouldDeflectAttacker === 1) {
                    console.log('no pushback ---> just deflect');

                    player.defending = {
                      state: false,
                      count: 0,
                      limit: this.players[player.target.occupant.player-1].defending.limit,
                    }
                    player.attacking = {
                      state: false,
                      count: 0,
                      limit: this.players[player.target.occupant.player-1].attacking.limit,
                    }

                    player.success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.deflectedLengthRef.attack,
                      predeflect: player.success.deflected.predeflect,
                      type: 'attack'
                    }
                    player.stamina.current = player.stamina.current - this.staminaCostRef.deflected;


                    if (this.aiDeflectedCheck.includes(player.number) !== true) {
                      this.aiDeflectedCheck.push(player.number)
                    }

                  }


                  // ATTACKER NO DEFLECT NO PUSHBACK!
                  else if (shouldDeflectPushBack !== 1 && shouldDeflectAttacker !== 1) {
                    // console.log('attacker not deflected or pushed back');
                  }

                }
              }

              // EMPTY TARGET STAMINA COST!
              else {

                let weapon = player.currentWeapon.type
                if (player.bluntAttack === true) {

                  player.stamina.current = player.stamina.current - this.staminaCostRef.attack.blunt;

                  if (weapon === '') {

                    weapon = 'unarmed';
                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'attackingBlunt',
                        img: '',

                      }
                    )
                  }
                  else {
                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'attackingBlunt',
                        img: '',

                      }
                    )
                  }

                } else {

                  if (weapon === '') {
                    weapon = 'unarmed';
                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'attackingUnarmed',
                        img: '',

                      }
                    )
                  } else {

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: (this.attackAnimRef.limit[weapon]-this.attackAnimRef.peak[weapon]),
                        type: '',
                        position: '',
                        msg: 'missedAttack',
                        img: '',

                      }
                    )
                  }
                  player.stamina.current = player.stamina.current - this.staminaCostRef.attack[weapon];


                }
                }


              // DESTROY ITEMS!
              if (player.target.occupant.type !== 'player') {
                if (player.currentWeapon.name !== '' || player.bluntAttack === true) {
                  let cell = this.gridInfo.find(elem => elem.number.x === player.target.cell.number.x && elem.number.y === player.target.cell.number.y )

                  if (cell && cell.item.name !== "") {
                    this.players[player.number-1].statusDisplay = {
                      state: true,
                      status: 'Destroyed '+cell.item.name+'!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }

                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'destroyedItem',
                        img: '',

                      }
                    )

                    cell.item = {
                      name: '',
                      type: '',
                      subType: '',
                      effect: '',
                      initDrawn: false
                    }
                  }
                }
              }
            }

          }


          // ATTACK COOLDOWN AND END!
          if (player.attacking.count > attackPeak && player.attacking.count < player.attacking.limit) {
            // console.log('attack cooldown',player.attacking.count);
          }
          if (player.attacking.count >= player.attacking.limit) {
            // console.log('attack end',player.attacking.count);

            player.attacking = {
              state: false,
              count: 0,
              limit: player.attacking.limit
            }
            player.attackStrength = 0;
            player.bluntAttack = false;
            player.action = 'idle';
            console.log('attack end');

          }

        }


        // DEFENSE DELAY!!
        // NON DECAYIN DEF
        // if (player.defending.count > 0 && player.defending.count < player.defending.limit+1) {
        //   player.defending.count++;
        //   player.action = 'defending';
        //   // console.log('defend winding up',player.defending.count++, 'player',player.number);
        // } else if (player.defending.count >= player.defending.limit+1 && player.defending.state === false) {
        //   // console.log('defend wind up limit cap','player',player.number);
        //
        //   player.defending = {
        //     state: true,
        //     count: 0,
        //     limit: player.defending.limit,
        //   }
        // }


        // DECAYING DEF
        if (player.defending.count > 0 && player.defending.count < player.defending.limit+1 && player.defendDecay.state !== true) {
          player.defending.count++;
          player.action = 'defending';
          // console.log('defend winding up',player.defending.count, 'player',player.number);
        } else if (player.defending.count >= player.defending.limit+1 && player.defending.state === false && player.defendDecay.state !== true) {
          console.log('defend peak player',player.number);

          if (player.stamina.current - 1.5 >= 0) {

            player.defending = {
              state: true,
              count: 0,
              limit: player.defending.limit,
            }
            player.stamina.current = player.stamina.current - this.staminaCostRef.defend;
            player.defendDecay = {
              state: true,
              count: 0,
              limit: player.defendDecay.limit,
            }

            player.popups.push(
              {
                state: false,
                count: 0,
                limit: player.defendDecay.limit,
                type: '',
                position: '',
                msg: 'defending_1',
                img: '',

              }
            )

          } else {
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 1,
              limit: player.statusDisplay.limit,
            }

            // player.popups.push(
            //   {
            //     state: false,
            //     count: 0,
            //     limit: 10,
            //     type: '',
            //     position: '',
            //     msg: 'outOfStamina',
            //     img: '',
            //
            //   }
            // )
          }

        }


        // DEFENSE DECAY!!
        if (player.defending.state === true && player.defending.count === 0) {
          if (player.defendDecay.state === true) {
            if (player.defendDecay.count < player.defendDecay.limit) {
              player.defendDecay.count++;

              if (player.popups.find(x=>x.msg.split("_")[0] === 'defending')) {

                if (player.defendDecay.count > 4 && player.defendDecay.count < 15) {
                  player.popups.find(x=>x.msg.split("_")[0] === 'defending').msg = 'defending_2'
                }
                if (player.defendDecay.count > 14 && player.defendDecay.count < 20) {
                  player.popups.find(x=>x.msg.split("_")[0] === 'defending').msg = 'defending_3'
                }
                if (player.defendDecay.count > 19 && player.defendDecay.count < player.defendDecay.limit) {
                  player.popups.find(x=>x.msg.split("_")[0] === 'defending').msg = 'defending_4'
                }

              }
              // console.log('defend decay1',player.defendDecay.count);
            }
            if (player.defendDecay.count === player.defendDecay.limit-5) {
              player.defending = {
                state: false,
                count: 0,
                limit: player.defending.limit,
              }
              player.action = 'idle';
            }

          }
        }
        if (player.defending.state !== true && player.defendDecay.state === true) {
          if (player.defendDecay.count < player.defendDecay.limit) {
            player.defendDecay.count++;

            // console.log('defend decay2',player.defendDecay.count);
            // console.log('defend decay3',player.defendDecay.limit);
          }
          if (player.defendDecay.count >= player.defendDecay.limit) {

            player.defendDecay = {
              state: false,
              count: 0,
              limit: player.defendDecay.limit,
            }
          }
        }


        // // DODGE STEPPER!
        if (player.dodging.countState === true) {

          let startMod = player.crits.dodge;
          let endMod = player.crits.dodge;

          if (player.stamina.current - 4 >= 0) {

            if (player.dodging.count === 1) {
              player.stamina.current = player.stamina.current - this.staminaCostRef.dodge;

              // player.popups.push(
              //   {
              //     state: false,
              //     count: 0,
              //     limit: 5,
              //     type: '',
              //     position: '',
              //     msg: 'dodgeStart',
              //     img: '',
              //
              //   }
              // )

            }
            if (player.dodging.count < player.dodging.limit) {
              player.dodging.count++
              player.action = 'dodging';
              // console.log('dodge count',player.dodging.count);
            }
            if (player.dodging.count === (player.dodging.peak.start - startMod)) {

              player.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: (player.dodging.peak.end + endMod)-(player.dodging.peak.start + startMod),
                  type: '',
                  position: '',
                  msg: 'dodgeSuccess',
                  img: '',

                }
              )

            }
            if (player.dodging.count > (player.dodging.peak.start - startMod) && player.dodging.count < (player.dodging.peak.end + endMod)) {
              player.dodging.state = true;

              // console.log('dodge peak',player.dodging.count);
            }
            if (player.dodging.count === player.dodging.peak.start) {
              let whichDirection = this.rnJesus(1,2);
              let dodgeDirection;
              switch(player.direction) {
                  case 'north':
                  if (whichDirection === 1) {
                    dodgeDirection = 'east';
                  } else {
                    dodgeDirection = 'west';
                  }
                  break;
                  case 'south':
                  if (whichDirection === 1) {
                    dodgeDirection = 'east';
                  } else {
                    dodgeDirection = 'west';
                  }
                  break;
                  case 'east':
                  if (whichDirection === 1) {
                    dodgeDirection = 'north';
                  } else {
                    dodgeDirection = 'south';
                  }
                  break;
                  case 'west':
                  if (whichDirection === 1) {
                    dodgeDirection = 'north';
                  } else {
                    dodgeDirection = 'south';
                  }
                  break;
              }
              player.dodgeDirection = dodgeDirection;
            }
            if (player.dodging.count < (player.dodging.peak.start - startMod) || player.dodging.count > (player.dodging.peak.end + endMod)) {
              player.dodging.state = false;
              player.dodgeDirection = '';
              // console.log('dodge peak off');
            }
            if (player.dodging.count >= player.dodging.limit) {
              player.action = 'idle';
              player.dodging = {
                countState: false,
                state: false,
                count: 0,
                limit: player.dodging.limit,
                peak: {
                  start: player.dodging.peak.start,
                  end: player.dodging.peak.end,
                }
              }
            }

          }
          else {

            player.dodging = {
              countState: false,
              state: false,
              count: 0,
              limit: player.dodging.limit,
              peak: {
                start: player.dodging.peak.start,
                end: player.dodging.peak.end,
              }
            }

            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 1,
              limit: player.statusDisplay.limit,
            }

            // player.popups.push(
            //   {
            //     state: false,
            //     count: 0,
            //     limit: 15,
            //     type: '',
            //     position: '',
            //     msg: 'outOfStamina',
            //     img: '',
            //
            //   }
            // )
          }

        }


        // COMPLETE PUSHBACK DEFLECT FLOW!
        if (player.pushBack.state === false && player.success.deflected.predeflect === true && player.moving.state === false) {
          // console.log('predefelct --> pushback ---> deflect');
          player.success.deflected = {
            state: true,
            count: 1,
            limit: this.deflectedLengthRef.attack,
            predeflect: false,
            type: player.success.deflected.type,
          }


          if (this.aiDeflectedCheck.includes(player.number) !== true) {
            this.aiDeflectedCheck.push(player.number)
          }


        }


        // DISCARD GEAR!!
        if (
          this.keyPressed[player.number-1].defend === true &&
          this.keyPressed[player.number-1].cycleWeapon === true &&
          player.discardGear.state !== true
        ) {

            this.discardGear(player,"weapon")
            player.discardGear.state = true;
        }
        if (
          this.keyPressed[player.number-1].defend === true &&
          this.keyPressed[player.number-1].cycleArmor === true &&
          player.discardGear.state !== true
        ) {

            this.discardGear(player,"armor")
            player.discardGear.state = true;
        }

        // DISCARD GEAR STEPPER!!
        if (player.discardGear.state === true) {
          if (player.discardGear.count < player.discardGear.limit) {
            player.discardGear.count++
          }
          else if (player.discardGear.count >= player.discardGear.limit) {
            player.discardGear = {
              state: false,
              count: 0,
              limit: player.discardGear.limit,
            }
          }
        }


        // WEAPON/ARMOR CYCLE CHECK!!
        if (this.keyPressed[player.number-1].cycleWeapon === true && player.cycleWeapon.state === false && player.defending.state !== true && this.keyPressed[player.number-1].defend === false) {
          if (player.cycleWeapon.count < player.cycleWeapon.limit) {
            player.cycleWeapon.count++
            // console.log('player.cycleWeapon.count',player.cycleWeapon.count);
          }
          if (player.cycleWeapon.count >= player.cycleWeapon.limit) {

            if (
              this.keyPressed[player.number-1].cycleWeapon === true &&
              player.items.weapons.length > 1
            ) {
              // console.log('cycling weapon',player.items);

              // let currentIndex = player.items.weapons.indexOf(player.currentWeapon);
              let currentIndex = player.items.weaponIndex;
              let newIndex;
              // console.log(player.items.weapons,player.currentWeapon,currentIndex,player.items.weapons[currentIndex]);
              if (currentIndex + 1 > player.items.weapons.length - 1) {
                newIndex = 0
              } else {
                newIndex = currentIndex+1;
              }
              player.items.weaponIndex = newIndex;
              player.currentWeapon = player.items.weapons[newIndex]

              player.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: player.items.weapons[newIndex].type,
                    img: '',

                  }
                )
              // console.log(player.items.weapons,player.currentWeapon,newIndex,player.items.weapons[newIndex]);

            }
            if (
              this.keyPressed[player.number-1].cycleWeapon === true &&
              player.items.weapons.length === 1
            ) {

              if (player.currentWeapon.type === 'crossbow' && player.items.ammo === 0) {
                player.currentWeapon = {
                  name: '',
                  type: '',
                  effect: ''
                }
                console.log('only have empty crossbow left, switching to unarmed');
              } else {


              player.currentWeapon = player.items.weapons[0];
              // console.log('nothing to cycle through');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'no weapons to cycle!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!player.popups.find(x=>x.msg === 'stop')) {
                player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'stop',
                      img: '',

                    }
                  )
              }

              }


            }

            player.cycleWeapon = {
              state: false,
              count: 0,
              limit: player.cycleWeapon.limit,
            }

            let myCell = this.gridInfo.find(cell => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y)
            if (myCell.item.name !== '') {
              // console.log('found an item. picking it up');
              this.checkDestination(player)
            }
          }

        }
        else if (this.keyPressed[player.number-1].cycleWeapon === true && player.cycleWeapon.state === true) {
          console.log('already cycling weapon');
        }
        if (this.keyPressed[player.number-1].cycleArmor === true && player.cycleArmor.state === false && player.defending.state !== true && this.keyPressed[player.number-1].defend === false) {
          if (player.cycleArmor.count < player.cycleArmor.limit) {
            player.cycleArmor.count++
            // console.log('player.cycleArmor.count',player.cycleArmor.count);
          }
          if (player.cycleArmor.count >= player.cycleArmor.limit) {

            if (
              this.keyPressed[player.number-1].cycleArmor === true &&
              player.items.armor.length > 0
            ) {
              // console.log('cycling armor');

              // let currentIndex = player.items.armor.indexOf(player.currentArmor);
              let currentIndex = player.items.armorIndex;
              let newIndex;
              if (currentIndex + 1 > player.items.armor.length - 1) {
                newIndex = 0
              } else {
                newIndex = currentIndex+1;
              }


              switch(player.currentArmor.effect) {
                case 'hpUp' :
                  if (player.hp > 1) {
                    // console.log('armor cycle debuff hp',player.hp);
                    player.hp = player.hp - 1;
                    // console.log('armor cycle debuff hp',player.hp);
                  }
                break;
                case 'speedUp' :
                  let currentSpd1 = player.speed.range.indexOf(player.speed.move);
                  if (player.speed.move > .05) {
                    // console.log('armor cycle debuff speed',player.speed.move);
                    player.speed.move = player.speed.range[currentSpd1-1];
                    // console.log('armor cycle debuff speed',player.speed.move);
                  }
                break;
              }

              switch(player.items.armor[newIndex].effect) {
                case 'hpUp' :
                  if (player.hp < 3) {
                    // console.log('armor cycle buff hp',player.hp);
                    player.hp = player.hp + 1
                    // console.log('armor cycle buff hp',player.hp);

                    player.statusDisplay = {
                      state: true,
                      status: 'hpUp',
                      count: 1,
                      limit: player.statusDisplay.limit,
                    }
                  }
                break;
                case 'speedUp' :
                  let currentSpd2 = player.speed.range.indexOf(player.speed.move)
                  if (player.speed.move < .2) {

                    // console.log('armor cycle buff speed',player.speed.move);
                    player.speed.move = player.speed.range[currentSpd2+1]
                    // console.log('armor cycle buff speed',player.speed.move);

                    player.statusDisplay = {
                      state: true,
                      status: 'speedUp',
                      count: 1,
                      limit: player.statusDisplay.limit,
                    }
                  }
                break;
              }

              player.items.armorIndex = newIndex;
              player.currentArmor = player.items.armor[newIndex]

              if (player.items.armor[newIndex].type !== '' && !player.popups.find(x=>x.msg === player.items.armor[newIndex].type)) {
                player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: player.items.armor[newIndex].type,
                      img: '',

                    }
                  )
              }
              if (player.items.armor[newIndex].type === '' && !player.popups.find(x=>x.msg === 'stop')) {
                player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'stop',
                      img: '',

                    }
                  )
              }


            }
            if (
              this.keyPressed[player.number-1].cycleArmor === true &&
              player.items.armor.length === 0
            ) {
              console.log('no armor to cycle through');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'no armor to cycle!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!player.popups.find(x=>x.msg === 'stop')) {
                player.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: 'stop',
                    img: '',

                  }
                )
              }

            }

            player.cycleArmor = {
              state: false,
              count: 0,
              limit: player.cycleArmor.limit,
            }

            let myCell = this.gridInfo.find(cell => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y)
            if (myCell.item.name !== '') {
              // console.log('found an item. picking it up');
              this.checkDestination(player)
            }
          }
        }
        else if (this.keyPressed[player.number-1].cycleArmor === true && player.cycleArmor.state === true) {
          console.log('already cycling armor');
        }


        // FLANKING!
        if (player.flanking.state === true) {

          this.players[player.number-1].dodging = {
            countState: false,
            state: false,
            count: 0,
            limit: player.dodging.limit,
            peak: {
              start: player.dodging.peak.start,
              end: player.dodging.peak.end,
            }
          }


          if (player.flanking.step === 2) {
            // console.log('flanking step 2',player.direction,'flank dir',player.flanking.direction);
            switch(player.flanking.direction) {
              case 'north' :
                player.direction = 'south';
                player.turning.toDirection = 'south';
              break;
              case 'south' :
                player.direction = 'north';
                player.turning.toDirection = 'north';
              break;
              case 'east' :
                player.direction = 'west';
                player.turning.toDirection = 'west';
              break;
              case 'west' :
                player.direction = 'east';
                player.turning.toDirection = 'east';
              break;
            }

            player.flanking = {
              checking: false,
              direction: '',
              preFlankDirection: '',
              state: false,
              step: 0,
              target1: {x:0 ,y:0},
              target2: {x:0 ,y:0},
            }
          }
          if (player.flanking.step === 1) {

            let target = this.getTarget(player);
            if (target.free === true) {
              player.flanking.step = 2;
              player.flanking.target2 = target.cell.number;
              // player.action = 'moving';
              player.action = 'flanking';
              player.moving = {
                state: true,
                step: 0,
                course: '',
                origin: {
                  number: {
                    x: player.currentPosition.cell.number.x,
                    y: player.currentPosition.cell.number.y
                  },
                  center: {
                    x: player.currentPosition.cell.center.x,
                    y: player.currentPosition.cell.center.y
                  },
                },
                destination: target.cell.center
              }
              nextPosition = this.lineCrementer(player);
              player.nextPosition = nextPosition;

              if (player.ai.state === true) {
                this.keyPressed[player.number-1].dodge = false
              }
            }
            else {
              // console.log('cancel flanking');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'flanking cancelled!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }
              player.flanking = {
                checking: false,
                direction: '',
                state: false,
                step: 0,
                target1: {x:0 ,y:0},
                target2: {x:0 ,y:0},
              }

              if (player.popups.find(x=>x.msg === 'flanking')) {
                player.popups.splice(player.popups.findIndex(y=>y.msg === 'flanking'),1)
              }
            }
          }
        }
        if (this.keyPressed[player.number-1].dodge === true ) {


          if (
          this.keyPressed[player.number-1].north === true ||
          this.keyPressed[player.number-1].south === true ||
          this.keyPressed[player.number-1].east === true ||
          this.keyPressed[player.number-1].west === true &&
          player.strafing.state !== true &&
          player.flanking.state !== true
        ) {


          this.players[player.number-1].dodging = {
            countState: false,
            state: false,
            count: 0,
            limit: player.dodging.limit,
            peak: {
              start: player.dodging.peak.start,
              end: player.dodging.peak.end,
            }
          }


          if (player.stamina.current - 4 >= 0) {

            if (player.dodging.countState === true || player.dodging.state === true) {

              this.players[player.number-1].stamina.current = player.stamina.current + 4;

            }

            if (keyPressedDirection !== player.direction) {

              let canFlank = false;
              switch(player.direction) {
                case 'north' :
                  if (keyPressedDirection === 'east' || keyPressedDirection === 'west') {
                    canFlank = true;
                  }
                break;
                case 'south' :
                  if (keyPressedDirection === 'east' || keyPressedDirection === 'west') {
                    canFlank = true;
                  }
                break;
                case 'west' :
                  if (keyPressedDirection === 'north' || keyPressedDirection === 'south') {
                    canFlank = true;
                  }
                break;
                case 'east' :
                  if (keyPressedDirection === 'north' || keyPressedDirection === 'south') {
                    canFlank = true;
                  }
                break;
              }

              if (canFlank === true) {

                // console.log('flanking step',keyPressedDirection,player.direction);
                this.players[player.number-1].flanking.checking = true;
                this.players[player.number-1].flanking.direction = keyPressedDirection;
                this.players[player.number-1].flanking.preFlankDirection = player.direction;

                let target = this.getTarget(player);
                if (target.free === true ) {

                  player.stamina.current = player.stamina.current - this.staminaCostRef.flank;


                  // this.players[player.number-1].dodging = {
                  //   countState: false,
                  //   state: false,
                  //   count: 0,
                  //   limit: player.dodging.limit,
                  //   peak: {
                  //     start: player.dodging.peak.start,
                  //     end: player.dodging.peak.end,
                  //   }
                  // }


                  this.players[player.number-1].flanking.checking = false;
                  this.players[player.number-1].flanking.state = true;
                  this.players[player.number-1].flanking.step =  1;
                  this.players[player.number-1].flanking.target1 = target.cell.number;
                  // console.log('this.players[player.number-1].flanking.target1',this.players[player.number-1].flanking.target1);
                  // player.action = 'moving';

                  player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'flanking',
                      img: '',
                    }
                  )

                  player.action = 'flanking';
                  player.moving = {
                    state: true,
                    step: 0,
                    course: '',
                    origin: {
                      number: {
                        x: player.currentPosition.cell.number.x,
                        y: player.currentPosition.cell.number.y
                      },
                      center: {
                        x: player.currentPosition.cell.center.x,
                        y: player.currentPosition.cell.center.y
                      },
                    },
                    destination: target.cell.center
                  }
                  nextPosition = this.lineCrementer(player);
                  player.nextPosition = nextPosition;
                } else {
                  // console.log('cancel flanking');
                }
              } else {
                // console.log('cant flank2');
              }

            } else {
              // console.log('cant flank2');
            }

          } else {
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 1,
              limit: player.statusDisplay.limit,
            }

            // player.popups.push(
            //   {
            //     state: false,
            //     count: 0,
            //     limit: 10,
            //     type: '',
            //     position: '',
            //     msg: 'outOfStamina',
            //     img: '',
            //   }
            // )
          }

        }

        }




          // CAN READ MOVE INPUTS!!
          if (
            player.attacking.state === false &&
            player.defending.state === false &&
            player.dodging.state === false &&
            player.dodging.countState === false
          ) {
            // CONFIRM MOVE KEYPRESS!!
            if (
              this.keyPressed[player.number-1].north === true ||
              this.keyPressed[player.number-1].south === true ||
              this.keyPressed[player.number-1].east === true ||
              this.keyPressed[player.number-1].west === true ||
              this.keyPressed[player.number-1].northEast === true ||
              this.keyPressed[player.number-1].northWest === true ||
              this.keyPressed[player.number-1].southEast === true ||
              this.keyPressed[player.number-1].southWest === true
            ) {

              if (player.newMoveDelay.state !== true) {

                // MOVE IF DIRECTION ALIGNS & NOT STRAFING!!
                if (keyPressedDirection === player.direction && player.strafing.state === false) {

                let target = this.getTarget(player)

                if (target.free === true && player.target.void === false) {

                  if (player.dead.state === true && player.dead.count === 0) {

                    player.nextPosition = {
                      x: -30,
                      y: -30,
                    }

                  } else if (player.turning.delayCount === 0) {
                    player.action = 'moving';
                    player.moving = {
                      state: true,
                      step: 0,
                      course: '',
                      origin: {
                        number: {
                          x: player.currentPosition.cell.number.x,
                          y: player.currentPosition.cell.number.y
                        },
                        center: {
                          x: player.currentPosition.cell.center,
                          y: player.currentPosition.cell.center
                        },
                      },
                      destination: target.cell.center
                    }
                    nextPosition = this.lineCrementer(player);
                    player.nextPosition = nextPosition;

                  }

                }

                if (target.free === false) {
                  // console.log('target is NOT free');
                }
                if (player.target.void === true) {
                  // console.log('target is VOID!!',target.cell.center.x,target.cell.center.y);

                  this.moveSpeed = player.speed.move;

                  player.moving = {
                    state: true,
                    step: 0,
                    course: '',
                    origin: {
                      number: player.currentPosition.cell.number,
                      center: player.currentPosition.cell.center,
                    },
                    destination: target.cell.center
                  }

                  nextPosition = this.lineCrementer(player);
                  player.nextPosition = nextPosition;
                }

              }

              }

              // CHANGE DIRECTION IF NOT STRAFING!!
              if (keyPressedDirection !== player.direction && player.strafing.state === false) {

                // console.log('change player direction to',keyPressedDirection);
                // console.log('player',player.number,player.direction,' turn-start',keyPressedDirection);
                player.turning.state = true;
                player.turning.toDirection = keyPressedDirection;

              }

              if (player.newMoveDelay.state !== true) {

                // MOVE WHILE STRAFING!!
                if (keyPressedDirection !== player.direction && player.strafing.state === true) {

                  player.strafing.direction = keyPressedDirection;
                  let target = this.getTarget(player);

                  if (target.free === true) {

                    this.moveSpeed = player.speed.move;

                    // console.log('start strafing');
                    player.action = 'strafe moving';
                    player.moving = {
                      state: true,
                      step: 0,
                      course: '',
                      origin: {
                        number: {
                          x: player.currentPosition.cell.number.x,
                          y: player.currentPosition.cell.number.y
                        },
                        center: {
                          x: player.currentPosition.cell.center.x,
                          y: player.currentPosition.cell.center.y
                        },
                      },
                      destination: target.cell.center
                    }
                    nextPosition = this.lineCrementer(player);
                    player.nextPosition = nextPosition;
                  }
                }

                // JUMPING!!
                if (keyPressedDirection === player.direction && player.strafing.state === true && player.jumping.checking !== true && player.jumping.state !== true) {

                  this.players[player.number-1].jumping.checking = true;
                  let target = this.getTarget(player);

                  let cell1 = this.gridInfo.find(elem => elem.number.x === target.cell.number.x && elem.number.y === target.cell.number.y)
                  let cell2 = this.gridInfo.find(elem => elem.number.x === target.cell2.number.x && elem.number.y === target.cell2.number.y)
                  // console.log('cell1',cell1);
                  // console.log('cell2',cell2);

                  let cellsWithinBounds = true;
                  if (!cell1 || !cell2) {
                    cellsWithinBounds = false;
                  } else {
                    if (cell1.number.x < 0 || cell1.number.x > this.gridWidth) {
                      cellsWithinBounds = false;
                    }
                    if (cell1.number.y < 0 || cell1.number.y > this.gridWidth) {
                      cellsWithinBounds = false;
                    }
                  }

                  if (player.stamina.current - 6 >= 0) {

                    if (cellsWithinBounds === true) {
                      if (
                        cell1.void.state === true ||
                        cell1.terrain.type === 'deep'
                      ) {
                        // console.log('a');
                        if (
                          cell2.levelData.charAt(0) !==  'z' ||
                          cell2.levelData.charAt(0) !==  'y'
                        ) {
                          // console.log('b');

                          let targetOccupied = false;
                          for (const plyr of this.players) {
                            if (
                              plyr.currentPosition.cell.number.x === player.target.cell2.number.x &&
                              plyr.currentPosition.cell.number.y === player.target.cell2.number.y
                            ) {
                              // console.log('c');
                              targetOccupied = true
                            }

                          }

                          if (targetOccupied !== true) {
                            if (
                              cell2.void.state !== true &&
                              cell2.terrain.type !== 'deep'
                            ) {
                              // console.log('can jump');
                              this.players[player.number-1].jumping.checking = false;
                              this.players[player.number-1].jumping.state = true;
                              player.action = 'jumping'
                              player.stamina.current = player.stamina.current - this.staminaCostRef.jump;

                              player.moving = {
                                state: true,
                                step: 0,
                                course: '',
                                origin: {
                                  number: player.currentPosition.cell.number,
                                  center: player.currentPosition.cell.center,
                                },
                                destination: target.cell2.center
                              }

                              nextPosition = this.lineCrementer(player);
                              // nextPosition = this.jumpCrementer(player);
                              player.nextPosition = nextPosition;
                            } else {
                              // console.log('can only jump over voids or deep water cell 2');
                              this.players[player.number-1].jumping.checking = false;
                            }
                          }
                          else {
                            // console.log('jump destination occupied');
                            this.players[player.number-1].jumping.checking = false;
                          }

                        } else {
                          // console.log('jump obstacle detected');
                          this.players[player.number-1].jumping.checking = false;
                        }
                      } else {
                        // console.log('can only jump over voids or deep water cell 2');
                        this.players[player.number-1].jumping.checking = false;
                      }
                    } else {
                      // console.log('cell out of bounds');
                      this.players[player.number-1].jumping.checking = false;
                    }

                  }
                  else {
                    console.log('out of stamina');
                    player.statusDisplay = {
                      state: true,
                      status: 'Out of Stamina',
                      count: 0,
                      limit: player.statusDisplay.limit,
                    }
                  }

                }

              }

            }
          }



        // CAN READ NON-MOVE INPUTS!!
        if (player.strafing.state === false) {

          if (this.keyPressed[player.number-1].attack === true || this.keyPressed[player.number-1].defend === true) {

            // ALREADY ATTACKING/DEFENDING!!
            if (player.attacking.state === true || player.defending.state === true) {

              if (this.keyPressed[player.number-1].attack === true) {
                // console.log('already attacking');
              }
              if (this.keyPressed[player.number-1].defend === true) {
                // console.log('already defending',player.number);
              }
            }


            // START ATTACK/DEFEND!!
            if (player.attacking.state === false && player.defending.state === false) {



              // if (this.keyPressed[player.number-1].attack === true ) {

              if (player.stamina.current - 3 >= 0) {

                if (this.keyPressed[player.number-1].attack === true && player.success.deflected.state !== true) {
                  // console.log('start attacking');
                  // console.log('pre attack');

                  // if (player.currentWeapon.name === '' || !player.currentWeapon.name) {
                  //   player.statusDisplay = {
                  //     state: true,
                  //     status: "No weapon. Can't attack",
                  //     count: 1,
                  //     limit: player.statusDisplay.limit,
                  //   }
                  // }
                  // else {
                  //   player.action = 'attacking';
                  //   player.attacking = {
                  //     state: true,
                  //     count: 1,
                  //     limit: player.attacking.limit,
                  //   }
                  // }

                  // BLUNT ATTACK!!
                  if (this.keyPressed[player.number-1].dodge === true) {
                    if (player.dodging.countState === true || player.dodging.state === true) {
                      player.dodging = {
                        countState: false,
                        state: false,
                        count: 0,
                        limit: 20,
                        peak: {
                          start: 5,
                          end: 10,
                        }
                      };
                    }
                    player.stamina.current = player.stamina.current + this.staminaCostRef.attack.blunt;
                    player.bluntAttack = true;
                  }

                  player.action = 'attacking';
                  player.attacking = {
                    state: true,
                    count: 1,
                    limit: player.attacking.limit,
                  }

                }



              }
              else {
                player.statusDisplay = {
                  state: true,
                  status: "Out of Stamina",
                  count: 1,
                  limit: player.statusDisplay.limit,
                }


                // player.popups.push(
                //   {
                //     state: false,
                //     count: 0,
                //     limit: 10,
                //     type: '',
                //     position: '',
                //     msg: 'outOfStamina',
                //     img: '',
                //
                //   }
                // )
              }

              if (this.keyPressed[player.number-1].defend === true) {
                // console.log('start defending',player.number);

                if (
                  !player.currentWeapon.name &&
                  !player.currentArmor.name
                ) {
                  player.statusDisplay = {
                    state: true,
                    status: "No weapon or armor. Can't defend",
                    count: 1,
                    limit: player.statusDisplay.limit,
                  }

                  if (!player.popups.find(x=>x.msg === 'stop')) {
                    player.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'stop',
                        img: '',

                      }
                    )
                  }




                } else {
                  if (player.defending.count === 0 && player.defendDecay.state !== true) {
                    player.defending = {
                      state: false,
                      count: 1,
                      limit: player.defending.limit,
                    }

                    player.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 5,
                          type: '',
                          position: '',
                          msg: 'preAction1',
                          img: '',

                        }
                      )
                  } else {
                    // console.log('cant start defend. might already be in progress');
                  }
                }

              }
            }
          }

          else if (this.keyPressed[player.number-1].dodge === true) {
            if (player.dodging.state !== true && player.dodging.countState !== true) {
              // console.log('start dodge');
              player.dodging.countState = true;
            } else {
              // console.log('already dodging');
            }
          }
        }
      }


      // DISPLAY ATTACK AND DEFENSE SUCCESS!
      if (player.success.attackSuccess.state === true) {
        if (player.success.attackSuccess.count < player.success.attackSuccess.limit) {
          player.success.attackSuccess.count++
        }
        else if (player.success.attackSuccess.count >= player.success.attackSuccess.limit) {
          player.success.attackSuccess = {
            state: false,
            count: 0,
            limit: player.success.attackSuccess.limit
          }
        }
      }
      if (player.success.defendSuccess.state === true) {
        if (player.success.defendSuccess.count < player.success.defendSuccess.limit) {
          player.success.defendSuccess.count++
        }
        else if (player.success.defendSuccess.count >= player.success.defendSuccess.limit) {
          player.success.defendSuccess = {
            state: false,
            count: 0,
            limit: player.success.defendSuccess.limit
          }
        }
      }

    } else {
      // console.log('sorry no key presses right now');
    }


    // STATUS DISPLAY STEPPER!!
    if (player.statusDisplay.state === true && player.statusDisplay.count < player.statusDisplay.limit) {
      // console.log('stepping status display');
      player.statusDisplay.count++
    }
    else if (player.statusDisplay.state === true && player.statusDisplay.count >= player.statusDisplay.limit) {
      // console.log('hide status display');
      player.statusDisplay = {
        state: false,
        status: '',
        count: 0,
        limit: player.statusDisplay.limit,
      }
    }


    // POPUPS
    if (player.popups.length > 0) {

      for (const popup of player.popups) {
        let indx = player.popups.findIndex(x=>x===popup);
        if (popup.state === true) {
          if (popup.limit > 0) {
            if (popup.state === true && popup.count < popup.limit) {
              popup.count++
            }
            if (popup.count >= popup.limit) {
              player.popups.splice(indx,1)
            }
          }
          if (popup.limit === 0) {
            // check if the player state it relates to is true, if not remove it
          }

        }


      }

      let currentPopupCount = player.popups.filter(x=>x.state === true).length;
      for (const popup2 of player.popups) {
        if (currentPopupCount < 8) {
          let indx = player.popups.findIndex(x=>x===popup2);
          if (popup2.state === false) {
            popup2.state = true;
            currentPopupCount++;
            // console.log('turn on new popup',popup2.msg);
          }
        } else {
          // console.log('currentPopup display full..',popup2.msg);
        }
      }

    }


    //CAMERA INPUT MODE SWITCH
    if (this.toggleCameraMode === false && this.camera.state === true) {
      this.camera.startCount = 0;
    }
    if (this.camera.state === false && this.toggleCameraMode === false && this.camera.startCount >= this.camera.startLimit  && this.camera.instructionType === 'default') {
      // console.log('welcome to camera mode');
      this.camera.startCount = 0;
      this.camera.state = true;
      this.camera.fixed = true;
    }
    if (this.toggleCameraMode === true) {

      let state = this.toggleCameraMode;
      if (this.camera.state === false && state === true && this.camera.startCount < this.camera.startLimit) {

        this.camera.startCount++;
      }
      if (this.camera.state === true && state === true && this.camera.startCount < this.camera.startLimit) {
        // console.log('leaving camera mode ...');
        this.camera.startCount++;
      }
      if (this.camera.state === true && state === true && this.camera.startCount >= this.camera.startLimit) {
        // console.log('thank you for using the camera');
        this.camera.startCount = 0;
        this.camera.state = false;
      }


    }


    //CAMERA INPUT MODE CONTROLS
    if (this.camera.state === true && this.camera.instructionType === 'default') {

      let setFocus = false;

      // IDLE ANIM STEPPER!
      if (player.action === 'idle') {
        // player.idleAnim.state = true
        if (player.idleAnim.count < player.idleAnim.limit+1) {
          // console.log('player.idleAnim.count',player.idleAnim.count);
          player.idleAnim.count++

        }
        if (player.idleAnim.count >= player.idleAnim.limit+1) {
          player.idleAnim.count = 0;
          player.idleAnim.state = false;
        }
      }
      else if (player.action !== 'idle') {
        // player.idleAnim.state = false;
        player.idleAnim.count = 0;
      }


      if (this.keyPressed[player.number-1].attack === true) {
        this.camera.mode = 'zoom';
      }
      if (this.keyPressed[player.number-1].defend === true) {
        this.camera.mode = 'pan';
      }


      if (this.camera.mode === 'zoom') {

        if (
          this.keyPressed[player.number-1].north === true &&
          this.keyPressed[player.number-1].south !== true &&
          this.camera.zoom.x < this.camera.limits.zoom.max) {
        // if (this.keyPressed[player.number-1].north === true) {
          this.camera.zoom.x += .02 ;
          this.camera.zoom.y += .02 ;
          this.camera.zoomDirection = 'in';
          setFocus = true;

          console.log('zooming in');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('zoom limit mix',this.camera.limits.zoom.min,'max',this.camera.limits.zoom.max);
        }
        if (this.keyPressed[player.number-1].north === true && this.camera.zoom.x >= this.camera.limits.zoom.max) {
          console.log('zoom in limit');
        }
        if (
          this.keyPressed[player.number-1].south === true &&
          this.keyPressed[player.number-1].north !== true &&
          this.camera.zoom.x > this.camera.limits.zoom.min) {
        // if (this.keyPressed[player.number-1].south === true) {
          this.camera.zoom.x -= .02 ;
          this.camera.zoom.y -= .02 ;
          this.camera.zoomDirection = 'out';
          setFocus = true;

          console.log('zooming out');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('zoom limit min',this.camera.limits.zoom.min,'max',this.camera.limits.zoom.max);
        }
        if (this.keyPressed[player.number-1].south === true && this.camera.zoom.x <= this.camera.limits.zoom.min) {
          console.log('zoom out limit');
        }

      }

      if (this.camera.mode === 'pan') {

        if (
          this.keyPressed[player.number-1].north === true &&
          this.keyPressed[player.number-1].south !== true &&
          this.keyPressed[player.number-1].east !== true &&
          this.keyPressed[player.number-1].west !== true &&
          this.camera.pan.y < this.camera.limits.pan.y.max
        ) {
          this.camera.pan.y += 10;
          this.camera.panDirection = 'north';
          setFocus = true;

          console.log('panning direction north');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('pan limit min x',this.camera.limits.pan.x.min,'y',this.camera.limits.pan.y.min,'max x',this.camera.limits.pan.x.max,'y',this.camera.limits.pan.y.max);

        }
        if (this.keyPressed[player.number-1].north === true && this.camera.pan.y >= this.camera.limits.pan.y.max) {
          console.log('pan limit north');
        }
        if (
          this.keyPressed[player.number-1].south === true &&
          this.keyPressed[player.number-1].north !== true &&
          this.keyPressed[player.number-1].west !== true &&
          this.keyPressed[player.number-1].east !== true &&
          this.camera.pan.y > this.camera.limits.pan.y.min
        ) {
          this.camera.pan.y -= 10;
          this.camera.panDirection = 'south';
          setFocus = true;

          console.log('panning direction south');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('pan limit min x',this.camera.limits.pan.x.min,'y',this.camera.limits.pan.y.min,'max x',this.camera.limits.pan.x.max,'y',this.camera.limits.pan.y.max);

        }
        if (this.keyPressed[player.number-1].south === true && this.camera.pan.y <= this.camera.limits.pan.y.min) {
          console.log('pan limit south');
        }
        if (
          this.keyPressed[player.number-1].east === true &&
          this.keyPressed[player.number-1].west !== true &&
          this.keyPressed[player.number-1].north !== true &&
          this.keyPressed[player.number-1].south !== true &&
          this.camera.pan.x > this.camera.limits.pan.x.min
        ) {
          this.camera.pan.x -= 10;
          this.camera.panDirection = 'east';
          setFocus = true;

          console.log('panning direction east');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('pan limit min x',this.camera.limits.pan.x.min,'y',this.camera.limits.pan.y.min,'max x',this.camera.limits.pan.x.max,'y',this.camera.limits.pan.y.max);
        }
        if (this.keyPressed[player.number-1].east === true && this.camera.pan.x <= this.camera.limits.pan.x.min) {
          console.log('pan limit east');
        }
        if (this.keyPressed[player.number-1].west === true && this.camera.pan.x < this.camera.limits.pan.x.max) {
          this.camera.pan.x += 10;
          this.camera.panDirection = 'west';
          setFocus = true;

          console.log('panning direction west');
          console.log('zoom',this.camera.zoom.x.toFixed(2));
          console.log('pan',this.camera.pan.x.toFixed(2),this.camera.pan.y.toFixed(2));
          console.log('pan limit min x',this.camera.limits.pan.x.min,'y',this.camera.limits.pan.y.min,'max x',this.camera.limits.pan.x.max,'y',this.camera.limits.pan.y.max);
        }
        if (
          this.keyPressed[player.number-1].west === true &&
          this.keyPressed[player.number-1].east !== true &&
          this.keyPressed[player.number-1].north !== true &&
          this.keyPressed[player.number-1].south !== true &&
          this.camera.pan.x >= this.camera.limits.pan.x.max) {
          console.log('pan limit south');
        }
      }


      //SET CAMERA FOCUS
      if (setFocus === true) {
        this.setCameraFocus('input',canvas, context, canvas2, context2);
      }


    }


    // AUTO CAMERA
    if (this.camera.state !== true && this.camera.fixed !== true) {

      if (this.camera.instructionType === 'default') {

        // if there are instructions, execute and step instruction.count, remove from array
        //
        // push to instructions set based on conditions
        //
        // If 1 player zoom when engaging based on ranged weapon or not
        //
        // if 2 players and they are in range, zoom if even are engaging
        //
        // if at engage zoom level but not engaged, zoom back out
        //
        // if board is under a certain size, zoom appropriately
        //
        // if board is over a certain size
        //   if 1 player and positions changes x amount of times within a this.time interval (use modulo), pan hard to follow
        //   if 2 players only follow if both positions change x amount of times within a this.time interval (use modulo) and they are in range (use targetArea scan func), pan soft to follow
        //   else, zoom and pan to get them both as centered and close zoomed as possible
        //
        // if 1 player and player respawns, pan to spawn location and zoom in then out
        //
        // when a new ai enters pan to it, then back player(s)
        //
        // use a cameraInstructionRef to adjust the camera values accordingly, and push to this.camera.instructions


      }
      if (this.camera.instructionType === 'story') {

        // if there are nstructions, execute and step instructions.count, remove from array
        //
        // use a cameraInstructionRef to adjust the camera values accordingly, and push to this.camera.instructions
        //
        // if this is the last instruction, set the instructionType back to default

      }

    }


    // MENU
    if (player.ai.state !== true && this.keyPressed[player.number-1].cycleWeapon === true && this.keyPressed[player.number-1].cycleArmor === true) {
      // toggle the menu here
    }


    // // CHECK PROJECTILES!!
    for (const bolt of this.projectiles) {
      if (bolt.kill === true) {
        let index = this.projectiles.findIndex(blt => blt.id === bolt.id);
        this.projectiles.splice(index, 1);
        // console.log('kill bolt',bolt.currentPosition.number, this.players[bolt.owner-1].currentPosition.cell.number,this.projectiles);
      }
      if (bolt.moving.state === true && bolt.kill !== true) {
        // console.log('traking projectile');

        let index = this.projectiles.findIndex(blt => blt.id === bolt.id);
        bolt.currentPosition.center = bolt.nextPosition;
        let boltNextPosition = this.boltCrementer(bolt);
        bolt.nextPosition = boltNextPosition;

        for (const cell of bolt.target.path) {
          let point = [bolt.currentPosition.center.x,bolt.currentPosition.center.y];
          let polygon = [];
          for (const vertex of cell.vertices) {
            let vertexPoint = [vertex.x-10,vertex.y-5];
            // let vertexPoint = [vertex.x,vertex.y];
            polygon.push(vertexPoint)
          }
          let pip = pointInPolygon(point, polygon)
          if (pip === true) {
            // console.log('gotcha',cell.number);
            bolt.currentPosition.number = cell.number;

            for (const plyr of this.players) {
              if (
                plyr.currentPosition.cell.number.x === cell.number.x &&
                plyr.currentPosition.cell.number.y === cell.number.y &&
                plyr.number !== bolt.owner
              ) {
                // console.log('bolt hit a player',plyr);
                this.cellsUnderAttack.push(
                  {
                    number: {
                      x: cell.number.x,
                      y: cell.number.y,
                    },
                    count: 1,
                    limit: 8,
                  },
                )

                if (
                  this.players.[plyr.number-1].defending.state === false ||
                  this.players.[plyr.number-1].direction === bolt.direction
                ) {
                  // console.log('attack success');

                  let backAttack = false;
                  if (this.players.[plyr.number-1].direction === bolt.direction) {
                    console.log('back attack');
                    backAttack = true;
                  }

                  this.players[bolt.owner-1].success.attackSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players[bolt.owner-1].success.attackSuccess.limit
                  }


                  // CALCULATE ATTACKER DOUBLE HIT!
                  let doubleHitChance = this.players[bolt.owner-1].crits.doubleHit;
                  let singleHitChance = this.players[bolt.owner-1].crits.singleHit;
                  if (backAttack === true) {
                    if (doubleHitChance > 2) {
                      let diff = doubleHitChance - 2;
                      doubleHitChance = doubleHitChance - diff;
                    }
                  }

                  if (this.players.[plyr.number-1].currentArmor.name !== '') {
                    // console.log('opponent armour found');
                    switch(this.players.[plyr.number-1].currentArmor.effect) {
                      case 'dblhit-5' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+5;
                      break;
                      case 'dblhit-10' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+10;
                      break;
                      case 'dblhit-15' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+15;
                      break;
                      // case 'dblhit-30' :
                      //   doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+30;
                      // break;
                      case 'snghit-5' :
                        singleHitChance = this.players[bolt.owner-1].crits.singleHit+5;
                      break;
                      case 'snghit-10' :
                        singleHitChance = this.players[bolt.owner-1].crits.singleHit+10;
                      break;
                    }
                  }

                  let doubleHit = this.rnJesus(1,doubleHitChance);
                  let singleHit = this.rnJesus(1,singleHitChance);

// -----------
                  // doubleHit = 2;
                  // singleHit = 2;
                  // ----------------

                  let miss;
                  if (doubleHit === 1) {
                    console.log('bolt double hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 2;
                    this.attackedCancel(this.players[plyr.number-1]);

                    if (!this.players[plyr.number-1].popups.find(x=>x.msg === 'alarmed')) {
                      this.players[plyr.number-1].popups.push(
                        {
                          state: false,
                          count: 0,
                          limit:25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                  }
                  else if (singleHit === 1) {
                    console.log('bolt single hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 1;
                    this.attackedCancel(this.players[plyr.number-1]);

                    if (!this.players[plyr.number-1].popups.find(x=>x.msg === 'alarmed')) {
                      this.players[plyr.number-1].popups.push(
                        {
                          state: false,
                          count: 0,
                          limit:25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                  }
                  else if (doubleHit !== 1 && singleHit !== 1) {
                    console.log('bolt attack but no damage');
                    miss = true;
                    this.players[bolt.owner-1].statusDisplay = {
                      state: true,
                      status: 'attack missed!',
                      count: 1,
                      limit: this.players[bolt.owner-1].statusDisplay.limit,
                    }
                  }

                  if (this.players.[plyr.number-1].hp === 1) {
                    this.players.[plyr.number-1].speed.move = .05;
                  }

                  if (this.players.[plyr.number-1].hp <= 0) {
                    this.killPlayer(this.players.[plyr.number-1]);

                    let randomItemIndex = this.rnJesus(0,this.itemList.length-1)
                    this.placeItems({init: false, item: this.itemList[randomItemIndex].name})

                    this.players[bolt.owner-1].points++;

                  }
                  else if (miss !== true) {
                    this.players.[plyr.number-1].action = 'deflected';

                    this.players[plyr.number-1].defending = {
                      state: false,
                      count: 0,
                      limit: this.players[plyr.number-1].defending.limit,
                    }
                    this.players[plyr.number-1].attacking = {
                      state: false,
                      count: 0,
                      limit: this.players[plyr.number-1].attacking.limit,
                    }

                    this.players.[plyr.number-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.deflectedLengthRef.attacked,
                      predeflect: this.players.[plyr.number-1].success.deflected.predeflect,
                      type: 'attacked',
                    };


                    if (this.aiDeflectedCheck.includes(this.players.[plyr.number-1].number) !== true) {
                      this.aiDeflectedCheck.push(this.players.[plyr.number-1].number)
                    }


                  }


                }
                // ATTACK DEFENDED!!
                else {
                  // console.log('bullet doged');
                  this.boltDeflectAnim = {
                    position: {
                      x: bolt.currentPosition.center.x,
                      y: bolt.currentPosition.center.y,
                    },
                    state: true,
                    count: 1,
                    limit: this.boltDeflectAnim.limit,
                  }

                  this.players.[plyr.number-1].success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players.[plyr.number-1].success.defendSuccess.limit
                  }

                  player.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'defendSuccess',
                      img: '',

                    }
                  )


                  // GUARD BREAK!
                  // let deflectOpponent = this.rnJesus(1,3);
                  let deflectOpponent = this.rnJesus(1,this.players[plyr.number-1].crits.guardBreak);
                  if (deflectOpponent === 1) {
                    this.players[plyr.number-1].breakAnim.defend = {
                      state: true,
                      count: 1,
                      limit: player.breakAnim.defend.limit,
                    };
                    this.players[plyr.number-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.deflectedLengthRef.defended,
                      predeflect: this.players[plyr.number-1].success.deflected.predeflect,
                      type: 'defended',
                    };


                    if (this.aiDeflectedCheck.includes(this.players[plyr.number-1].number) !== true) {
                      this.aiDeflectedCheck.push(this.players[plyr.number-1].number)
                    }


                  }
                }

                bolt.kill = true;

              }
            }

            for (const cell2 of this.gridInfo) {
              if (
                cell2.number.x === cell.number.x &&
                cell2.number.y === cell.number.y
              ) {
                if (
                  cell2.levelData.charAt(0) ===  'z' ||
                  cell2.levelData.charAt(0) ===  'y'
                ) {
                  // console.log('bolt hit an obstacle');
                  bolt.kill = true;
                }
              }
            }
          }
        }

        if (
          bolt.currentPosition.center.x < 0 ||
          bolt.currentPosition.center.y < 0 ||
          bolt.currentPosition.center.x > 1300 ||
          bolt.currentPosition.center.y > 800
        ) {
          bolt.kill = true;
        }
      }
    }
    if (this.boltDeflectAnim.state === true) {
      if (this.boltDeflectAnim.count < this.boltDeflectAnim.limit) {
        this.boltDeflectAnim.count++;
      }
      if (this.boltDeflectAnim.count >= this.boltDeflectAnim.limit) {
        this.boltDeflectAnim = {
          position: {
            x: 0,
            y: 0,
          },
          state: false,
          count: 0,
          limit: this.boltDeflectAnim.limit,
        }
      }
    }


    // ADD COM PLAYER!
    if (this.addAiPlayerKeyPress === true) {
      // this.addAiRandomPlayer('random')
      // this.addAiRandomPlayer('pursue')
      // this.addAiRandomPlayer('patrol')
      // this.addAiRandomPlayer('defend')
      this.addAiPlayer()
    }
    if (this.addAiCount.state === true) {
      if (this.addAiCount.count < this.addAiCount.limit) {
        this.addAiCount.count++
      }
      if (this.addAiCount.count >= this.addAiCount.limit) {
        this.addAiCount = {
          state: false,
          count: 0,
          limit: this.addAiCount.limit,
        }
      }
    }


    // SYNC W/ GLOBAL PLAYER DATA
    this.players[player.number-1] = player;


    // AI EVALUATE
    if (player.ai.state === true ) {
      this.aiEvaluate(player)
    }


    // DRAW EVERYTHING
    this.drawPlayerStep(player.number, canvas, context, canvas2, context2);


  }
  drawPlayerStep = (playerNumber, canvas, context, canvas2, context2) => {
    // console.log('drawing player step',playerNumber);

    let gridInfo = [];
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    // let floor = this.refs.floor2;
    let wall = this.refs.wall;
    let wall2 = this.refs.wall2;
    let wall3 = this.refs.wall3;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;


    let floorImageWidth = this.floorImageWidth;
    let floorImageHeight = this.floorImageHeight;
    let wallImageWidth = this.wallImageWidth;
    let wallImageHeight = this.wallImageHeight;
    let sceneX = (this.canvasWidth/2);
    let sceneY = this.sceneY;
    let tileWidth = this.tileWidth;


    gridInfo = this.gridInfo;

    let player = this.players[playerNumber-1]

    let indicatorImgs = {
      preAttack: this.refs.preAttackIndicate,
      preAttack2: this.refs.preAttack2Indicate,
      attack1: this.refs.attack1Indicate,
      attack2: this.refs.attack2Indicate,
      attack3: this.refs.attack3Indicate,
      attackUnarmed: this.refs.attackUnarmedIndicate,
      attackBlunt: this.refs.attackBluntIndicate,
      attackSuccess: this.refs.attackSuccessIndicate,
      defend: this.refs.defendIndicate,
      deflect: this.refs.deflectIndicate,
      deflectInjured: this.refs.deflectInjuredIndicate,
      deflectBlunt: this.refs.deflectBluntIndicate,
      pushback: this.refs.pushbackIndicate,
      ghost: this.refs.ghostIndicate,
      death: this.refs.deathIndicate,
      attackBreak: this.refs.attackBreakIndicate,
      defendBreak: this.refs.defendBreakIndicate,
      dodge: this.refs.dodgeIndicate,
    }

    // SPRITE SHEET ARRAY!!
    let playerImgs = [
      {
        idle: {
          unarmed: this.refs.playerImgIdleSheet,
          sword: this.refs.playerImgIdleSheet,
          spear: this.refs.playerImgIdleSheet,
          crossbow: this.refs.playerImgIdleSheet,
        },
        walking: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        jumping: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        dodging: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        flanking: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        strafing: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        attacking: {
          unarmed: this.refs.player1ImgAttackSheet,
          sword: this.refs.player1ImgAttackSheet,
          spear: this.refs.player1ImgAttackSheet,
          crossbow: this.refs.player1ImgAttackSheet,
        },
        defending: {
          unarmed: this.refs.player1ImgDefendSheet,
          sword: this.refs.player1ImgDefendSheet,
          spear: this.refs.player1ImgDefendSheet,
          crossbow: this.refs.player1ImgDefendSheet,
        },
        deflected: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        pushBack: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
        falling: {
          unarmed: this.refs.playerImgMoveSheet,
          sword: this.refs.playerImgMoveSheet,
          spear: this.refs.playerImgMoveSheet,
          crossbow: this.refs.playerImgMoveSheet,
        },
      },
      {
        idle: {
          unarmed: this.refs.player2ImgIdleSheet,
          sword: this.refs.player2ImgIdleSheet,
          spear: this.refs.player2ImgIdleSheet,
          crossbow: this.refs.player2ImgIdleSheet,
        },
        walking: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        jumping: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        dodging: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        flanking: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        strafing: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        attacking: {
          unarmed: this.refs.player2ImgAttackSheet,
          sword: this.refs.player2ImgAttackSheet,
          spear: this.refs.player2ImgAttackSheet,
          crossbow: this.refs.player2ImgAttackSheet,
        },
        defending: {
          unarmed: this.refs.player2ImgDefendSheet,
          sword: this.refs.player2ImgDefendSheet,
          spear: this.refs.player2ImgDefendSheet,
          crossbow: this.refs.player2ImgDefendSheet,
        },
        deflected: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        pushBack: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
        falling: {
          unarmed: this.refs.player2ImgMoveSheet,
          sword: this.refs.player2ImgMoveSheet,
          spear: this.refs.player2ImgMoveSheet,
          crossbow: this.refs.player2ImgMoveSheet,
        },
      },
      {
        idle: {
          unarmed: this.refs.playerComAImgIdleSheet,
          sword: this.refs.playerComAImgIdleSheet,
          spear: this.refs.playerComAImgIdleSheet,
          crossbow: this.refs.playerComAImgIdleSheet,
        },
        walking: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        jumping: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        dodging: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        flanking: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        strafing: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        attacking: {
          unarmed: this.refs.comAImgAttackSheet,
          sword: this.refs.comAImgAttackSheet,
          spear: this.refs.comAImgAttackSheet,
          crossbow: this.refs.comAImgAttackSheet,
        },
        defending: {
          unarmed: this.refs.comAImgDefendSheet,
          sword: this.refs.comAImgDefendSheet,
          spear: this.refs.comAImgDefendSheet,
          crossbow: this.refs.comAImgDefendSheet,
        },
        deflected: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        pushBack: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
        falling: {
          unarmed: this.refs.comAImgMoveSheet,
          sword: this.refs.comAImgMoveSheet,
          spear: this.refs.comAImgMoveSheet,
          crossbow: this.refs.comAImgMoveSheet,
        },
      },
      {
        idle: {
          unarmed: this.refs.playerComBImgIdleSheet,
          sword: this.refs.playerComBImgIdleSheet,
          spear: this.refs.playerComBImgIdleSheet,
          crossbow: this.refs.playerComBImgIdleSheet,
        },
        walking: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        jumping: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        dodging: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        flanking: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        strafing: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        attacking: {
          unarmed: this.refs.comBImgAttackSheet,
          sword: this.refs.comBImgAttackSheet,
          spear: this.refs.comBImgAttackSheet,
          crossbow: this.refs.comBImgAttackSheet,
        },
        defending: {
          unarmed: this.refs.comBImgDefendSheet,
          sword: this.refs.comBImgDefendSheet,
          spear: this.refs.comBImgDefendSheet,
          crossbow: this.refs.comBImgDefendSheet,
        },
        deflected: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        pushBack: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
        falling: {
          unarmed: this.refs.comBImgMoveSheet,
          sword: this.refs.comBImgMoveSheet,
          spear: this.refs.comBImgMoveSheet,
          crossbow: this.refs.comBImgMoveSheet,
        },
      },
    ]


    let itemImgs = {
      moveSpeedUp: this.refs.itemSpdUp,
      moveSpeedDown: this.refs.itemSpdDown,
      hpUp: this.refs.itemHpUp,
      hpDown: this.refs.itemHpDown,
      focusUp: this.refs.itemFocusUp,
      focusDown: this.refs.itemFocusDown,
      strengthUp: this.refs.itemStrUp,
      strengthDown: this.refs.itemStrDown,
      sword: this.refs.itemSword,
      spear: this.refs.itemSpear,
      crossbow: this.refs.itemBow,
      helmet: this.refs.itemHelmet1,
      ammo5: this.refs.itemAmmo,
      ammo10: this.refs.itemAmmo,
      mail: this.refs.itemMail1,
      greaves: this.refs.itemGreaves1,
    };

    let boltImgs = {
      north: this.refs.itemBoltNorth,
      south: this.refs.itemBoltSouth,
      east: this.refs.itemBoltEast,
      west: this.refs.itemBoltWest,
    }
    let floorImgs = {
      grass: this.refs.floorGrass,
      stone: this.refs.floorStone,
      dirt: this.refs.floorDirt,
      pond: this.refs.floorPond,
      mud: this.refs.floorMud,
      sand: this.refs.floorSand,
      ice: this.refs.floorIce,
      lava: this.refs.floorLava,
      bramble: this.refs.floorBramble,
      river: this.refs.floorRiver,
      void: this.refs.floorVoid,
      void2: this.refs.floorVoid2,
      void3: this.refs.floorVoid3,
    }

    let updatedPlayerImg;
    let newDirection;

    if (player.falling.state === true) {
      if (player.falling.count === player.falling.limit) {
        this.killPlayer(player)
      }
    }

    context.clearRect(0,0,this.canvasWidth,this.canvasHeight)
    context2.clearRect(0,0,this.canvasWidth,this.canvasHeight)

    context.translate(this.camera.pan.x,this.camera.pan.y);
    context2.translate(this.camera.pan.x,this.camera.pan.y);
    context.scale(this.camera.zoom.x,this.camera.zoom.y);
    context2.scale(this.camera.zoom.x,this.camera.zoom.y);


    for (var x = 0; x < this.gridWidth+1; x++) {
      for (var y = 0; y < this.gridWidth+1; y++) {

        let p = new Point();
        p.x = x * tileWidth;
        p.y = y * tileWidth;
        let iso = this.cartesianToIsometric(p);
        let offset = {x: floorImageWidth/2, y: floorImageHeight}
        iso.x += sceneX
        iso.y += sceneY
        let center = {
          x: iso.x - offset.x/2+23,
          y: iso.y - offset.y/2-2,
        }

        let floor;
        let drawFloor = true;
        let gridInfoCell = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y);
        floor = floorImgs[gridInfoCell.terrain.name]


        if (gridInfoCell.void.state === true) {
          // drawFloor = false;
          floor = floorImgs.void3
        }
        // VOID BLINKER!!
        if (
          this.cellToVoid.state === true &&
          this.cellToVoid.x === x &&
          this.cellToVoid.y === y
        ) {
          if(this.cellToVoid.count % 5 === 0) {
            floor = floorImgs.void3;
            // drawFloor = false;
          } else {
            floor = floorImgs.void2;
            // drawFloor = true;
          }
        }


        // DORWNING
        for (const plyrb of this.players) {
          if (plyrb.drowning === true) {
            if (
              plyrb.currentPosition.cell.number.x === x &&
              plyrb.currentPosition.cell.number.y === y
            ) {
              if(plyrb.falling.count % 2 === 0) {
                // drawFloor = false;
                floor = floorImgs.void3;
              } else {
                // floor = floorImgs.stone
                floor = floorImgs[gridInfoCell.terrain.name]
              }
            }
          }
        }


        // CELLS UNDER ATTACK!
        if (this.cellsUnderAttack.length > 0) {
          for (const cll of this.cellsUnderAttack) {
            if (
              cll.number.x === x &&
              cll.number.y === y
            ) {
              floor = this.refs.floorAttack;
            }
          }
        }
        // CELLS TO HIGHLIGHT
        if (this.cellsToHighlight.length > 0) {
          for (const cll2 of this.cellsToHighlight) {
            if (
              cll2.x === x &&
              cll2.y === y
            ) {
              floor = this.refs.floorVoid;
            }
          }
        }


        if (drawFloor === true) {
          context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);
        }


        // CELL COORD LABEL
        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12)
        context.fillStyle = "black";
        context.fillRect(center.x, center.y,5,5);

        // CELL VERTICES
        let vertices = [
          {x:center.x, y:center.y+tileWidth/2},
          {x:center.x+tileWidth, y:center.y},
          {x:center.x, y:center.y-tileWidth/2},
          {x:center.x-tileWidth, y:center.y},
        ];
        for (const vertex of vertices) {
          context.fillStyle = "yellow";
          context.fillRect(vertex.x-2.5, vertex.y-2.5,5,5);

        }


        // TARGET HIGHLIGHT!!
        let floorHighlight;
        for (const plyr3 of this.players) {
          if (
            x === plyr3.target.cell.number.x &&
            y === plyr3.target.cell.number.y
          ) {
            if (plyr3.ai.state !== true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
              switch(plyr3.number) {
                case 1:
                  floorHighlight = 'purple';
                break;
                case 2:
                  floorHighlight = 'red';
                break;
              }
            }
            if (plyr3.ai.state === true && plyr3.dead.state !== true && plyr3.falling.state !== true && plyr3.drowning !== true) {
              floorHighlight = 'brown';
            }
            if (plyr3.dead.state !== true) {
              context.lineWidth = 5;
              context.beginPath();
              for (const vertex of vertices) {
                context.strokeStyle = floorHighlight;
                context.lineTo(vertex.x, vertex.y);
              }
              context.closePath();
              context.stroke();
            }
          }
        }


        // IN GAME ITEM PLACEMENT!!
        if (gridInfoCell.item.name !== '' && gridInfoCell.void.state !== true) {

          let itemImg;
          let fillClr;
          if (gridInfoCell.item.type === 'item') {
            switch(gridInfoCell.item.name) {
              case 'moveSpeedUp' :
                fillClr = "purple";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'moveSpeedDown' :
                fillClr = "blue";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'hpUp' :
                fillClr = "yellow";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'hpDown' :
                fillClr = "brown";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'focusUp' :
                fillClr = "white";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'focusDown' :
                fillClr = "black";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'strengthUp' :
                fillClr = "green";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'strengthDown' :
                fillClr = "red";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'ammo5' :
                fillClr = "#283618";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
              case 'ammo10' :
                fillClr = "#283618";
                itemImg = itemImgs[gridInfoCell.item.name];
              break;
            }
          }
          else if (gridInfoCell.item.type === 'weapon') {
            switch(gridInfoCell.item.subType) {
              case 'sword' :
                fillClr = "orange";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
              case 'spear' :
                fillClr = "maroon";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
              case 'crossbow' :
                fillClr = "navy";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
            }
          }
          else if (gridInfoCell.item.type === 'armor') {
            switch(gridInfoCell.item.subType) {
              case 'helmet' :
                fillClr = "grey";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
              case 'mail' :
                fillClr = "olive";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
              case 'greaves' :
                fillClr = "#b5179e";
                itemImg = itemImgs[gridInfoCell.item.subType];
              break;
            }
          }

          context.drawImage(itemImg, center.x-15, center.y-15);

          // context.fillStyle = fillClr;
          // context.beginPath();
          // context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
          // context.fill();

        }


        function playerDrawLog (x,y,plyr) {
          console.log('** playerDrawLog **');
          console.log('-- player --',plyr.number);
          console.log('-- strafing --',plyr.strafing.state);
          console.log('-- turning --',plyr.turning.state);
          console.log('-- currently drawing --',x,y);
          console.log('-- current position --',plyr.currentPosition.cell.number.x,plyr.currentPosition.cell.number.y);
          console.log('-- moving state --',plyr.moving.state);
          console.log('-- moving step --',plyr.moving.step);
          console.log('-- target --',plyr.target.cell.number.x,plyr.target.cell.number.y);
          console.log('-- direction --',plyr.direction);
          console.log('-- origin --',plyr.moving.origin.number.x,plyr.moving.origin.number.y);
          console.log('-- action --',plyr.action);
        }


        // DRAWN PLAYERS!!
        for (const plyr of this.players) {

          let point = {
            x: plyr.nextPosition.x,
            y: plyr.nextPosition.y,
          };

          let weapon = plyr.currentWeapon.type;
          if (plyr.currentWeapon.type === '' || !plyr.currentWeapon.type) {
            weapon = 'unarmed'
          }


          let finalAnimIndex;


          if (plyr.attacking.state === true && plyr.success.deflected.state !== true) {
            plyr.action = 'attacking'
          }


          // FOR TESTING BY CALLING ONLY @ 1 CELL
          // if (
          //   plyr.currentPosition.cell.number.x === x &&
          //   plyr.currentPosition.cell.number.y === y
          // ) {
          //   switch(plyr.action) {
          //     case 'moving':
          //       let moveSpeed = plyr.speed.move;
          //       if (plyr.terrainMoveSpeed.state === true) {
          //         moveSpeed = plyr.terrainMoveSpeed.speed;
          //       }
          //       let rangeIndex = plyr.speed.range.indexOf(moveSpeed)
          //       let moveAnimIndex = this.moveStepRef[rangeIndex].indexOf(plyr.moving.step)
          //       finalAnimIndex = moveAnimIndex;
          //       // console.log('animation mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex,'move state',plyr.moving.state);
          //       if (plyr.target.void == true) {
          //         // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
          //       }
          //     break;
          //     case 'jumping':
          //       let rangeIndex4 = plyr.speed.range.indexOf(.1)
          //       let moveAnimIndex4 = this.moveStepRef[rangeIndex4].indexOf(plyr.moving.step)
          //       finalAnimIndex = moveAnimIndex4;
          //       // console.log('animation jump spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex,'move state',plyr.moving.state);
          //
          //     break;
          //     case 'strafe moving':
          //       if (player.pushBack.state === true ) {
          //         let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move)
          //         let moveAnimIndex3 = this.moveStepRef[rangeIndex3].indexOf(plyr.moving.step)
          //         finalAnimIndex = moveAnimIndex3;
          //         // console.log('anim testing pushback spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
          //       } else {
          //         let rangeIndex2 = plyr.speed.range.indexOf(plyr.speed.move)
          //         let moveAnimIndex2 = this.moveStepRef[rangeIndex2].indexOf(plyr.moving.step)
          //         finalAnimIndex = moveAnimIndex2;
          //         // console.log('anim testing strafe mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
          //       }
          //     break;
          //     case 'flanking':
          //       let rangeIndex6 = plyr.speed.range.indexOf(.2)
          //       let moveAnimIndex6 = this.moveStepRef[rangeIndex6].indexOf(plyr.moving.step)
          //       finalAnimIndex = moveAnimIndex6;
          //       // console.log('spd',plyr.speed.move,'flanking step',plyr.flanking.step,'step',plyr.moving.step,'moveAnimIndex6',moveAnimIndex6);
          //       // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
          //     break;
          //     case 'attacking':
          //       let animIndex = plyr.attacking.count -1;
          //       finalAnimIndex = animIndex;
          //       // console.log('anim testing atk',plyr.attacking.count,'plyr',plyr.number);
          //     break;
          //     case 'defending':
          //       if (plyr.defending.count > 0) {
          //         let animIndex2 = plyr.defending.count -1;
          //         finalAnimIndex = animIndex2;
          //         // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
          //       }
          //       if (plyr.defending.count === 0) {
          //         let animIndex2a = plyr.defending.limit;
          //         finalAnimIndex = animIndex2a;
          //         // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
          //       }
          //     break;
          //     case 'idle':
          //       if (plyr.number === 1) {
          //         // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
          //       }
          //       if (plyr.number === 2) {
          //         // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
          //       }
          //       let animIndex3 = plyr.idleAnim.count -1;
          //       finalAnimIndex = animIndex3;
          //     break;
          //     case 'falling':
          //       let animIndex4 = plyr.falling.count -1;
          //       finalAnimIndex = animIndex4;
          //       // console.log('anim testing fall',plyr.falling.count,'plyr',plyr.number);
          //     break;
          //     case 'deflected':
          //       let animIndex5 = plyr.success.deflected.count -1;
          //       finalAnimIndex = animIndex5;
          //       console.log('anim testing dflct',plyr.success.deflected.count,'limit',plyr.success.deflected.limit,'plyr',plyr.number,'index',finalAnimIndex,'moving',plyr.moving.state);
          //       // if (plyr.ai.state === true) {
          //       //   console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number,'index',finalAnimIndex,'moving',plyr.moving.state);
          //       // }
          //     break;
          //     case 'dodging':
          //       let animIndex7 = plyr.dodging.count -1;
          //       finalAnimIndex = animIndex7;
          //       // console.log('anim testing dodge',plyr.dodging.count,'plyr',plyr.number,'index',finalAnimIndex);
          //     break;
          //   }
          // }
          // FOR TESTING BY CALLING ONLY @ 1 CELL



          switch(plyr.action) {
            case 'moving':
              let moveSpeed = plyr.speed.move;
              if (plyr.terrainMoveSpeed.state === true) {
                moveSpeed = plyr.terrainMoveSpeed.speed;
              }
              let rangeIndex = plyr.speed.range.indexOf(moveSpeed)
              let moveAnimIndex = this.moveStepRef[rangeIndex].indexOf(plyr.moving.step)
              finalAnimIndex = moveAnimIndex;
              // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
              if (plyr.target.void == true) {
                // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
              }
            break;
            case 'jumping':
              let rangeIndex4 = plyr.speed.range.indexOf(.1)
              let moveAnimIndex4 = this.moveStepRef[rangeIndex4].indexOf(plyr.moving.step)
              finalAnimIndex = moveAnimIndex4;
              // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            break;
            case 'strafe moving':
              if (player.pushBack.state === true ) {
                let rangeIndex3 = plyr.speed.range.indexOf(plyr.speed.move)
                let moveAnimIndex3 = this.moveStepRef[rangeIndex3].indexOf(plyr.moving.step)
                finalAnimIndex = moveAnimIndex3;
                // console.log('anim testing pushback spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
              } else {
                let rangeIndex2 = plyr.speed.range.indexOf(plyr.speed.move)
                let moveAnimIndex2 = this.moveStepRef[rangeIndex2].indexOf(plyr.moving.step)
                finalAnimIndex = moveAnimIndex2;
                // console.log('anim testing strafe mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number);
              }
            break;
            case 'flanking':
              let rangeIndex6 = plyr.speed.range.indexOf(.2)
              let moveAnimIndex6 = this.moveStepRef[rangeIndex6].indexOf(plyr.moving.step)
              finalAnimIndex = moveAnimIndex6;
              // console.log('flanking step',plyr.flanking.step,'step',plyr.moving.step);
              // console.log('anim testing mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
            break;
            case 'attacking':
              let animIndex = plyr.attacking.count -1;
              finalAnimIndex = animIndex;
              // console.log('anim testing atk',plyr.attacking.count,'plyr',plyr.number);
            break;
            case 'defending':
              if (plyr.defending.count > 0) {
                let animIndex2 = plyr.defending.count -1;
                finalAnimIndex = animIndex2;
                // console.log('anim testing def wind up',plyr.defending.count,'plyr',plyr.number, animIndex2);
              }
              if (plyr.defending.count === 0) {
                let animIndex2a = plyr.defending.limit;
                finalAnimIndex = animIndex2a;
                // console.log('anim testing def held',plyr.defending.count,'plyr',plyr.number, animIndex2a);
              }
            break;
            case 'idle':
              if (plyr.number === 1) {
                // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
              }
              if (plyr.number === 2) {
                // console.log('anim testing idle',plyr.idleAnim.count,'plyr',plyr.number);
              }
              let animIndex3 = plyr.idleAnim.count -1;
              finalAnimIndex = animIndex3;
            break;
            case 'falling':
              let animIndex4 = plyr.falling.count -1;
              finalAnimIndex = animIndex4;
              // console.log('anim testing fall',plyr.falling.count,'plyr',plyr.number);
            break;
            case 'deflected':
              let animIndex5 = plyr.success.deflected.count -1;
              // let animIndex5;
              if (plyr.success.deflected.count > 10 && plyr.success.deflected.count < 21) {
                animIndex5 = (plyr.success.deflected.count-10);
              }
              if (plyr.success.deflected.count > 20 && plyr.success.deflected.count < 31) {
                animIndex5 = (plyr.success.deflected.count-20);
              }
              if (plyr.success.deflected.count > 30 && plyr.success.deflected.count < 41) {
                animIndex5 = (plyr.success.deflected.count-30);
              }
              if (plyr.success.deflected.count > 40 && plyr.success.deflected.count < 51) {
                animIndex5 = (plyr.success.deflected.count-40);
              }
              finalAnimIndex = animIndex5;
              // console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number);
            break;
            case 'dodging':
              let animIndex7 = plyr.dodging.count -1;
              finalAnimIndex = animIndex7;
              // console.log('anim testing dodge',plyr.dodging.count,'plyr',plyr.number);
            break;
          }



          // SPRITE SHEET CHAR AVATAR SWITCH!
          if (plyr.ai.state === false) {
            switch(plyr.action) {
              case 'idle':
                updatedPlayerImg = playerImgs[plyr.number-1].idle[weapon];
              break;
              case 'moving':
                updatedPlayerImg = playerImgs[plyr.number-1].walking[weapon];
              break;
              case 'jumping':
                updatedPlayerImg = playerImgs[plyr.number-1].jumping[weapon];
              break;
              case 'flanking':
                updatedPlayerImg = playerImgs[plyr.number-1].flanking[weapon];
              break;
              case 'strafe moving':
                if (player.pushBack.state === true) {
                  updatedPlayerImg = playerImgs[plyr.number-1].pushBack[weapon];
                } else {
                   updatedPlayerImg = playerImgs[plyr.number-1].strafing[weapon];
                }
              break;
              case 'falling':
                updatedPlayerImg = playerImgs[plyr.number-1].falling[weapon];
              break;
              case 'attacking':
                updatedPlayerImg = playerImgs[plyr.number-1].attacking[weapon];
              break;
              case 'defending':
                updatedPlayerImg = playerImgs[plyr.number-1].defending[weapon];
              break;
              case 'deflected' :
                updatedPlayerImg = playerImgs[plyr.number-1].deflected[weapon];
              break;
              case 'dodging' :
                updatedPlayerImg = playerImgs[plyr.number-1].dodging[weapon];
              break;
              case 'dead':
                updatedPlayerImg = playerImgs[plyr.number-1].idle[weapon];
              break;
            }
          }
          if (plyr.ai.state === true) {
            let plyrImgIndex;
            if (plyr.ai.imgType === "A") {
              plyrImgIndex = 2;
            }
            else if (plyr.ai.imgType === "B") {
              plyrImgIndex = 3;
            }

            switch(plyr.action) {
              case 'idle':
                updatedPlayerImg = playerImgs[plyrImgIndex].idle[weapon];
              break;
              case 'moving':
                updatedPlayerImg = playerImgs[plyrImgIndex].walking[weapon];
              break;
              case 'jumping':
                updatedPlayerImg = playerImgs[plyrImgIndex].jumping[weapon];
              break;
              case 'flanking':
                updatedPlayerImg = playerImgs[plyrImgIndex].flanking[weapon];
              break;
              case 'strafe moving':
              if (player.pushBack.state === true ) {
                updatedPlayerImg = playerImgs[plyrImgIndex].pushBack[weapon];
              } else {
                updatedPlayerImg = playerImgs[plyrImgIndex].strafing[weapon];
              }
              break;
              case 'falling':
                updatedPlayerImg = playerImgs[plyrImgIndex].falling[weapon];
              break;
              case 'attacking':
                updatedPlayerImg = playerImgs[plyrImgIndex].attacking[weapon];
              break;
              case 'defending':
                updatedPlayerImg = playerImgs[plyrImgIndex].defending[weapon];
              break;
              case 'deflected' :
                updatedPlayerImg = playerImgs[plyrImgIndex].deflected[weapon];
              break;
              case 'dodging' :
                updatedPlayerImg = playerImgs[plyrImgIndex].dodging[weapon];
              break;
              case 'dead':
                updatedPlayerImg = playerImgs[plyrImgIndex].idle[weapon];
              break;
            }
          }


          // SET SPRITE SHEET CLIP LOCATION!
          let dirs = ['north','south','east','west']
          let dirIndex = dirs.indexOf(plyr.direction);
          let sHeight = this.charSpriteHeight;
          let sWidth = this.charSpriteWidth;
          let sy = dirIndex * sHeight;
          let sx = (finalAnimIndex - 1)* sWidth;


          //PLAYER DEPTH SORTING!!
          if (plyr.target.void === false && plyr.moving.state === true && plyr.falling.state !== true) {
            let jumpYCalc = 10 - this.moveStepRef[1].indexOf(plyr.moving.step);
            // console.log('move',finalAnimIndex);
            // if (plyr.direction === 'north' || plyr.direction === 'northWest' || plyr.direction === 'west') {
            //   if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
            //     // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);
            //
            //     if (plyr.jumping.state === true) {
            //       context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);
            //     } else {
            //       context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
            //     }
            //
            //     // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);
            //
            //   }
            // }
            if (plyr.direction === 'north') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);

                if (plyr.jumping.state === true) {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);
                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                }

                // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);

              }
            }
            if (plyr.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);

                if (plyr.jumping.state === true) {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);
                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                }

                // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);

              }
            }
            // if (plyr.direction === 'east' || plyr.direction === 'south' || plyr.direction === 'southEast') {
            //   if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
            //     // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);
            //     console.log('here',x,y);
            //     if (plyr.jumping.state === true) {
            //       context2.translate(this.camera.pan.x,this.camera.pan.y);
            //       context2.scale(this.camera.zoom.x,this.camera.zoom.y);
            //       context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);
            //
            //     } else {
            //       context2.translate(this.camera.pan.x,this.camera.pan.y);
            //       context2.scale(this.camera.zoom.x,this.camera.zoom.y);
            //       context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
            //
            //     }
            //     // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);
            //     // playerDrawLog(x,y,plyr)
            //   }
            // }
            if (plyr.direction === 'east') {
              if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);
                // console.log('here',x,y);
                if (plyr.jumping.state === true) {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);

                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);

                }
                // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);
                // playerDrawLog(x,y,plyr)
              }
            }
            if (plyr.direction === 'south') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);
                // console.log('here',x,y);
                if (plyr.jumping.state === true) {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), this.playerDrawWidth, this.playerDrawHeight);

                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);

                }
                // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);
                // playerDrawLog(x,y,plyr)
              }
            }
            if (plyr.direction === 'northEast') {
              // east edge disappearing bug fix
              if (plyr.target.cell.number.x === this.gridWidth) {
                if (x === this.gridWidth && y === plyr.target.cell.number.y+1) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                  // playerDrawLog(x,y,plyr)
                }
              } else {
                if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                  // playerDrawLog(x,y)
                }
              }

            }
            if (plyr.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y,plyr)
              }
            }

            if (plyr.pushBack.state === true) {

              // context.drawImage(indicatorImgs.pushback, point.x-20, point.y-20, 35,35);
            }

          }
          else if (plyr.moving.state === false && plyr.ghost.state !== true && plyr.dodging.state !== true) {

            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
              // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);

              // console.log('updatedPlayerImg',finalAnimIndex,sx, sy, sWidth, sHeight,point);
              context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)

              if (plyr.attacking.state === true) {
                // console.log('ff atk',plyr.action ,finalAnimIndex,'plyr #', player.number);

                // if (plyr.attacking.count > 0 && plyr.attacking.count < 3) {
                //   // console.log('ff atk pre',plyr.action ,finalAnimIndex,'plyr #', player.number,'time',this.time);
                //   context.drawImage(indicatorImgs.preAttack, point.x-35, point.y-35, 35,35);
                // }

                let attackPeak = this.attackAnimRef.peak.sword;
                if (player.currentWeapon.type === 'spear') {
                  attackPeak = this.attackAnimRef.peak.spear;
                }
                if (player.currentWeapon.type === 'crossbow') {
                  attackPeak = this.attackAnimRef.peak.crossbow;
                }
                if (player.currentWeapon.type === '') {
                  attackPeak = this.attackAnimRef.peak.unarmed;
                }

                if (plyr.attacking.count === attackPeak) {
                  // console.log('ff atk peak',plyr.action ,finalAnimIndex,'plyr #', player.number,'time',this.time);
                }
                if (plyr.attacking.count > attackPeak && plyr.attacking.count < plyr.attacking.limit+1) {
                  if (plyr.attackStrength === 1) {

                    // context.fillStyle = fillClr2;
                    // context.beginPath();
                    // context.arc(pos.x-10, pos.y, 10, 0, 2 * Math.PI);
                    // context.fill();

                    // context.beginPath();
                    // context.rect(20, 20, 150, 100);
                    // context.stroke();

                    // context.drawImage(indicatorImgs.attack1, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.attackStrength === 2) {
                    // context.drawImage(indicatorImgs.attack2, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.bluntAttack === true) {
                    // context.drawImage(indicatorImgs.attackBlunt, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.currentWeapon.type === '') {
                    // context.drawImage(indicatorImgs.attackUnarmed, point.x-35, point.y-35, 35,35);
                  }

                  else if (plyr.currentWeapon.type !== '') {
                    // context.drawImage(indicatorImgs.attack3, point.x-35, point.y-35, 35,35);
                  }
                }

              }

              if (plyr.defending.state === true) {
                context.drawImage(indicatorImgs.defend, point.x-35, point.y-35, 35,35);
              }
              if (plyr.success.attackSuccess === true) {
                context.drawImage(indicatorImgs.attackSuccess, point.x-35, point.y-35, 35,35);
              }
              if (plyr.dodging.countState === true && plyr.dodging.count < 3) {
                // context.drawImage(indicatorImgs.preAttack2, point.x-45, point.y-35, 35,35);
              }

              if (plyr.defending.count > 0 && plyr.defending.count < plyr.defending.limit ) {
                // context2.drawImage(indicatorImgs.preAttack, point.x-35, point.y-35, 35,35);
              }
              // context.fillStyle = 'white';
              // context.beginPath();
              // context.rect(point.x-25, point.y-25, 50, 50);
              // context.stroke();
              // if (plyr.dodging.state === true) {
              //   context.drawImage(indicatorImgs.dodge, point.x-45, point.y-35, 35,35);
              // }

              // playerDrawLog(x,y,plyr)
            }
          }
          else if (plyr.target.void === true && plyr.moving.state === true && plyr.falling.state !== true) {

            // console.log('heading for thevoid @ draw step');
            // if (
            //   x === plyr.currentPosition.cell.number.x &&
            //   y === plyr.currentPosition.cell.number.y
            // ) {
            //   console.log('heading for thevoid @ draw step',plyr.target.cell.number);
            // }


            if (plyr.moving.origin.number.x === this.gridWidth && plyr.moving.origin.number.y !== 0 && plyr.moving.origin.number.y !== this.gridWidth) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y + 1) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            else {
              if (x === plyr.moving.origin.number.x + 1 && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
          }

          if (plyr.strafing.state === true && plyr.falling.state !== true && plyr.jumping.state !== true) {
            if (plyr.strafing.direction === 'north' || plyr.strafing.direction === 'northWest' || plyr.strafing.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y,plyr)
              }

            }
            if (plyr.strafing.direction === 'east') {
              if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
              // if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y)
              }

            }
            if (plyr.strafing.direction === 'south') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
              // if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y)
              }

            }
            if (plyr.strafing.direction === 'northEast') {
              if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y)
              }
            }
            if (plyr.strafing.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y)
              }
            }
          }
          if (plyr.flanking.state === true && plyr.falling.state !== true) {

            if (
              plyr.currentPosition.cell.number.x === x &&
              plyr.currentPosition.cell.number.y === y
            ){
              // console.log('flanking @ draw','finalAnimIndex',finalAnimIndex);
            }

            if (plyr.direction === 'east') {
              if (plyr.flanking.direction === 'north') {
                if (plyr.flanking.step === 1) {
                  if (
                    x === plyr.currentPosition.cell.number.x &&
                    y === plyr.currentPosition.cell.number.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    // x === plyr.flanking.target1.x &&
                    // y === plyr.flanking.target1.y
                    x === plyr.currentPosition.cell.number.x &&
                    y === plyr.currentPosition.cell.number.y+1
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
              }
            }
            if (plyr.direction === 'west') {
              if (plyr.flanking.direction === 'south') {
                if (plyr.flanking.step === 1) {
                  if (
                    // x === plyr.currentPosition.cell.number.x &&
                    // y === plyr.currentPosition.cell.number.y
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
              }
            }
            if (plyr.direction === 'north') {
              if (plyr.flanking.direction === 'east') {
                if (plyr.flanking.step === 1) {
                  if (
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
              }
            }
            if (plyr.direction === 'south') {
              if (plyr.flanking.direction === 'west') {
                if (plyr.flanking.step === 1) {
                  if (
                    x === plyr.currentPosition.cell.number.x &&
                    y === plyr.currentPosition.cell.number.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target2.x &&
                    y === plyr.flanking.target2.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight)
                  }
                }
              }
            }
          }
          if (plyr.falling.state === true) {


            if (
              x === plyr.target.cell.number.x &&
              y === plyr.target.cell.number.y
            ) {

              context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-35, this.playerDrawWidth, this.playerDrawHeight);
              // playerDrawLog(x,y,plyr)
            }

            if (
              plyr.target.cell.number.x < 0 ||
              plyr.target.cell.number.y < 0 ||
              plyr.target.cell.number.x > this.gridWidth ||
              plyr.target.cell.number.y > this.gridWidth
            ) {
              if (
                x === plyr.moving.origin.number.x &&
                y === plyr.moving.origin.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-35, this.playerDrawWidth, this.playerDrawHeight);
                // playerDrawLog(x,y,plyr)
              }
            }

          }

          if (plyr.success.deflected.state === true) {
            // console.log('updatedPlayerImg, sx, sy', sx, sy,'points',point.x-35, point.y-20,'dodge',plyr.dodging.state);

            if (plyr.direction === 'north') {
              if (
                x === plyr.moving.origin.number.x &&
                y === plyr.moving.origin.number.y+1
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-35, point.y-20, this.playerDrawWidth, this.playerDrawHeight)

                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt_attacked') {
                  // context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'east') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-35, point.y-30, this.playerDrawWidth,this.playerDrawHeight);

                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt_attacked') {
                  // context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'west') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-15, point.y-20, this.playerDrawWidth,this.playerDrawHeight);

                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt_attacked') {
                  // context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'south') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-15, point.y-30, this.playerDrawWidth,this.playerDrawHeight);

                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt_attacked') {
                  // context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }

            if (plyr.direction === 'southEast') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-20, point.y-30, this.playerDrawWidth,this.playerDrawHeight);
                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'southWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-10, point.y-20, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-20, this.playerDrawWidth,this.playerDrawHeight);
                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'northEast') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-30, point.y-20, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-30, point.y-20, this.playerDrawWidth,this.playerDrawHeight);
                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'northWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y+1
              ) {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-10, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-20, point.y-10, this.playerDrawWidth,this.playerDrawHeight);
                if (plyr.success.deflected.type === 'attack') {
                  // context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  // context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }


            if (plyr.breakAnim.attack.state === true) {
              // context.fillStyle = "black";
              // context.fillText("atk break!", point.x-30, point.y-30, 40,70);
              // context.drawImage(indicatorImgs.attackBreak, point.x-40, point.y-40, 35,35);
            }
            if (plyr.breakAnim.defend.state === true) {
              // context.fillStyle = "black";
              // context.fillText("guard break!", point.x-30, point.y-30, 40,70);
              // context.drawImage(indicatorImgs.defendBreak, point.x-40, point.y-40, 35,35);
            }
          }
          if (plyr.dodging.state === true && plyr.success.deflected.state !== true) {

            if (plyr.direction === 'north' || plyr.direction === 'south') {
              if (
                // x === plyr.moving.origin.number.x &&
                // y === plyr.moving.origin.number.y+1
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                if (plyr.dodgeDirection === 'east') {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-45, point.y-35, this.playerDrawWidth, this.playerDrawHeight)
                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-10, point.y-20, this.playerDrawWidth, this.playerDrawHeight)
                }
              }
            }
            if (plyr.direction === 'east' || plyr.direction === 'west') {
              let cll = this.gridInfo.find(elem => elem.number.x === plyr.currentPosition.cell.number.x && elem.number.y === plyr.currentPosition.cell.number.y)
              if (cll.edge.state === true && cll.edge.side === "south") {
                if (
                  x === plyr.currentPosition.cell.number.x &&
                  y === plyr.currentPosition.cell.number.y
                ) {
                  if (plyr.dodgeDirection === 'north') {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-35, this.playerDrawWidth,this.playerDrawHeight);
                  } else {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-40, point.y-15, this.playerDrawWidth,this.playerDrawHeight);
                  }
                }
              } else {
                if (
                  x === plyr.currentPosition.cell.number.x &&
                  y === plyr.currentPosition.cell.number.y+1
                ) {
                  if (plyr.dodgeDirection === 'north') {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-35, this.playerDrawWidth,this.playerDrawHeight);
                  } else {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-40, point.y-15, this.playerDrawWidth,this.playerDrawHeight);
                  }
                }
              }

            }
            // context.drawImage(indicatorImgs.dodge, point.x-45, point.y-35, 35,35);

          }
          // DEPTH SORTING!!


          if (plyr.respawn === true) {

            if (
              x === plyr.startPosition.cell.number.x &&
              y === plyr.startPosition.cell.number.y
            ) {
              // console.log('respawning... confirm dead player',plyr.dead.state,x,y);

                let respawnPoint = {
                  number: {
                    x: 0,
                    y: 0,
                  },
                  center: {
                    x: 0,
                    y: 0,
                  }
                }
                let altRespawnPoint = {
                  number: {
                    x: 0,
                    y: 0,
                  },
                  center: {
                    x: 0,
                    y: 0,
                  }
                }
                let altRespawnPoint2 = {
                  number: {
                    x: 0,
                    y: 0,
                  },
                  center: {
                    x: 0,
                    y: 0,
                  }
                }
                let respawnCellOccupied = false;

                // console.log('matching grid info with start position');
                let elem1 = this.gridInfo.find(gridCell => gridCell.number.x === this.gridWidth && gridCell.number.y === this.gridWidth);
                altRespawnPoint.number.x = elem1.number.x;
                altRespawnPoint.number.y = elem1.number.y;
                altRespawnPoint.center.x = elem1.center.x;
                altRespawnPoint.center.y = elem1.center.y;

                let elem2 = this.gridInfo.find(gridCell => gridCell.number.x === this.gridWidth && gridCell.number.y === 0);
                altRespawnPoint2.number.x = elem2.number.x;
                altRespawnPoint2.number.y = elem2.number.y;
                altRespawnPoint2.center.x = elem2.center.x;
                altRespawnPoint2.center.y = elem2.center.y;

                let elem3 = this.gridInfo.find(gridCell => gridCell.number.x === plyr.startPosition.cell.number.x && gridCell.number.y === plyr.startPosition.cell.number.y);
                for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
                  for (const cell of row) {
                    if (
                      cell.charAt(0) === 'y' ||
                      cell.charAt(0) ===  'z'
                    ) {
                      let obstaclePosition = {
                        x: Number(cell.charAt(1)),
                        y: row.indexOf(cell),
                      }
                      // console.log('found obstacle during map scan @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
                      if (
                        elem3.number.x === obstaclePosition.x &&
                        elem3.number.y === obstaclePosition.y
                      ) {
                        // console.log('an obstacle is in your way');
                        respawnCellOccupied = true;
                      }
                    }
                  }
                }
                if (elem3.void.state === true ) {
                  respawnCellOccupied = true;
                }
                for (const plyr2 of this.players) {
                  if (plyr2.number !== plyr.number) {
                    if (
                      elem3.number.x === plyr2.currentPosition.cell.number.x &&
                      elem3.number.y === plyr2.currentPosition.cell.number.y
                    ) {
                      respawnCellOccupied = true;
                    }
                  }
                }

                if (
                  respawnCellOccupied === false
                ) {

                  respawnPoint.number.x = elem3.number.x;
                  respawnPoint.number.y = elem3.number.y;
                  respawnPoint.center.x = elem3.center.x;
                  respawnPoint.center.y = elem3.center.y;
                }
                else if (respawnCellOccupied === true) {

                  if (plyr.number === 1) {
                    respawnPoint = altRespawnPoint;
                  }
                  if (plyr.number === 2) {
                    respawnPoint = altRespawnPoint2;
                  }

                }


                plyr.dead.state = false;
                plyr.currentPosition.cell = respawnPoint;
                plyr.nextPosition = respawnPoint.center;
                this.getTarget(plyr)
                plyr.moving = {
                  state: false,
                  step: 0,
                  course: '',
                  origin: {
                    number: {
                      x: respawnPoint.number.x,
                      y: respawnPoint.number.y
                    },
                    center: {
                      x: respawnPoint.center.x,
                      y: respawnPoint.center.y
                    },
                  },
                  destination: {
                    x: this.players[plyr.number-1].target.cell.center.x,
                    y: this.players[plyr.number-1].target.cell.center.y
                  }
                }

                plyr.direction = 'north';
                plyr.respawn = false;
                this.players[plyr.number-1] = plyr;

                // context.drawImage(updatedPlayerImg, respawnPoint.center.x-25, respawnPoint.center.y-50, 55,55);

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  respawnPoint.center.x-25, respawnPoint.center.y-50,this.playerDrawWidth, this.playerDrawHeight)
              }

            }

          if (plyr.dead.state === true && player.dead.count > 0 && plyr.dead.count < plyr.dead.limit) {

            if (
              x === plyr.ghost.position.cell.number.x &&
              y === plyr.ghost.position.cell.number.y
            ) {
              // console.log('player',plyr.number,'dying',player.dead.count);
              context.drawImage(indicatorImgs.death, plyr.ghost.position.cell.center.x-15, plyr.ghost.position.cell.center.y-15, 25,25);
            }
          }
          if (plyr.ghost.state === true && player.dead.count === 0) {
            if (x === plyr.ghost.position.cell.number.x && y === plyr.ghost.position.cell.number.y) {
              // console.log('player ',plyr.number,'ghost @',plyr.ghost.position.cell.number,plyr.ghost.position.cell.center);
              context.drawImage(indicatorImgs.ghost, plyr.ghost.position.cell.center.x-20, plyr.ghost.position.cell.center.y-20, 25,25);
            }
          }
          // if (plyr.itemDrop.state === true && plyr.dead.state !== true) {
          //   if (plyr.itemDrop.gear.type === '' && plyr.itemDrop.item.name === '') {
          //     // console.log('nothing to drop');
          //   }
          //   else {
          //     let itemImg2;
          //     let fillClr2;
          //     if (plyr.itemDrop.item.name === '' && plyr.itemDrop.gear.type !== '') {
          //       // console.log('drop a weapon or armor',plyr.itemDrop.gear.type);
          //       switch(plyr.itemDrop.gear.type) {
          //         case 'sword' :
          //           fillClr2 = "orange";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //         case 'spear' :
          //           fillClr2 = "maroon";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //         case 'crossbow' :
          //           fillClr2 = "navy";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //         case 'helmet' :
          //           fillClr2 = "grey";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //         case 'mail' :
          //           fillClr2 = "olive";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //         case 'greaves' :
          //           fillClr2 = "#b5179e";
          //           itemImg2 = itemImgs[plyr.itemDrop.gear.type];
          //         break;
          //       }
          //     }
          //     else if (plyr.itemDrop.gear.type === '' && plyr.itemDrop.item.name !== '') {
          //       // console.log('drop an item',plyr.itemDrop.item.name);
          //       switch(plyr.itemDrop.item.name) {
          //         case 'moveSpeedUp' :
          //           fillClr2 = "purple";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'moveSpeedDown' :
          //           fillClr2 = "blue";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'hpUp' :
          //           fillClr2 = "yellow";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'hpDown' :
          //           fillClr2 = "brown";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'focusUp' :
          //           fillClr2 = "white";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'focusDown' :
          //           fillClr2 = "black";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'strengthUp' :
          //           fillClr2 = "green";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'strengthDown' :
          //           fillClr2 = "red";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'ammo5' :
          //           fillClr2 = "#283618";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //         case 'ammo10' :
          //           fillClr2 = "#283618";
          //           itemImg2 = itemImgs[plyr.itemDrop.item.name];
          //         break;
          //       }
          //     }
          //
          //     if (plyr.itemDrop.count < 4) {
          //
          //       let pos = plyr.currentPosition.cell.center;
          //       // console.log('drawing item drop',itemImg2);
          //       // context.fillStyle = fillClr2;
          //       // context.beginPath();
          //       // context.arc(pos.x-10, pos.y, 10, 0, 2 * Math.PI);
          //       // context.fill();
          //
          //       // context.drawImage(itemImg2, pos.x-10, pos.y);
          //     }
          //     if (plyr.itemDrop.count > 3) {
          //
          //       let pos = plyr.currentPosition.cell.center;
          //       // console.log('drawing item drop',itemImg2,'pos',pos);
          //       // context.fillStyle = fillClr2;
          //       // context.beginPath();
          //       // context.arc(pos.x-10, pos.y+(plyr.itemDrop.count*2), 10, 0, 2 * Math.PI);
          //       // context.fill();
          //
          //       context.drawImage(itemImg2, pos.x-10, pos.y+(plyr.itemDrop.count*2));
          //     }
          //   }
          //
          // }
          // if (plyr.itemPickup.state === true) {
          //   let itemImg3;
          //   let fillClr3;
          //   if (plyr.itemPickup.item.name === '') {
          //     // console.log('Pickup a weapon or armor',plyr.itemPickup.gear.type);
          //     switch(plyr.itemPickup.gear.type) {
          //       case 'sword' :
          //         fillClr3 = "orange";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //       case 'spear' :
          //         fillClr3 = "maroon";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //       case 'crossbow' :
          //         fillClr3 = "navy";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //       case 'helmet' :
          //         fillClr3 = "grey";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //       case 'mail' :
          //         fillClr3 = "olive";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //       case 'greaves' :
          //         fillClr3 = "#b5179e";
          //         itemImg3 = itemImgs[plyr.itemPickup.gear.type];
          //       break;
          //     }
          //   }
          //   else if (plyr.itemPickup.gear.type === '') {
          //     // console.log('Pickup an item');
          //     switch(plyr.itemPickup.item.name) {
          //       case 'moveSpeedUp' :
          //         fillClr3 = "purple";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'moveSpeedDown' :
          //         fillClr3 = "blue";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'hpUp' :
          //         fillClr3 = "yellow";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'hpDown' :
          //         fillClr3 = "brown";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'focusUp' :
          //         fillClr3 = "white";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'focusDown' :
          //         fillClr3 = "black";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'strengthUp' :
          //         fillClr3 = "green";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'strengthDown' :
          //         fillClr3 = "red";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'ammo5' :
          //         fillClr3 = "#283618";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //       case 'ammo10' :
          //         fillClr3 = "#283618";
          //         itemImg3 = itemImgs[plyr.itemPickup.item.name];
          //       break;
          //     }
          //   }
          //   if (plyr.itemPickup.count < 4) {
          //
          //     let pos = plyr.currentPosition.cell.center;
          //     // console.log('drawing item pickup',itemImg3,gridInfoCell.item.subType,gridInfoCell.item.name);
          //     // context.fillStyle = fillClr3;
          //     // context.beginPath();
          //     // context.arc(pos.x-10, pos.y, 10, 0, 2 * Math.PI);
          //     // context.fill();
          //
          //     context.drawImage(itemImg3, pos.x-10, pos.y);
          //   }
          //   if (plyr.itemPickup.count > 3) {
          //
          //     let pos = plyr.currentPosition.cell.center;
          //     // console.log('drawing item pickup',itemImg3,gridInfoCell.item.subType,gridInfoCell.item.name);
          //     // context.fillStyle = fillClr3;
          //     // context.beginPath();
          //     // context.arc(pos.x-10, pos.y-(plyr.itemPickup.count*2), 10, 0, 2 * Math.PI);
          //     // context.fill();
          //
          //     context.drawImage(itemImg3, pos.x-10, pos.y-(plyr.itemPickup.count*2));
          //   }
          // }

          this.players[plyr.number-1] = plyr;




          // POPUPS

          if (x === this.gridWidth && y === this.gridWidth ) {
            // console.log(this.refs.pickupAmmo);

            let popupImageRef = {
              attackStart: this.refs.preAttackIndicate,
              preAction1: this.refs.preAction1Indicate,
              preAction2: this.refs.preAction2Indicate,
              attacking1: this.refs.attack1Indicate,
              attacking2: this.refs.attack2Indicate,
              missedAttack: this.refs.missedIndicate,
              attackingBlunt: this.refs.attackBluntIndicate2,
              attackingUnarmed: this.refs.attackUnarmedIndicate,
              attacked1: this.refs.attack1Indicate,
              attacked2: this.refs.attack2Indicate,
              attackDefended: this.refs.attackBreakIndicate,
              attackParried: this.refs.attackParriedIndicate,
              boltKilled: this.refs.boltKilledIndicate,
              attackCancelled: this.refs.attackBreakIndicate,
              injured: this.refs.deflectInjuredIndicate,
              defending_1: this.refs.defendIndicate1,
              defending_2: this.refs.defendIndicate2,
              defending_3: this.refs.defendIndicate3,
              defending_4: this.refs.defendIndicate4,
              defendSuccess: this.refs.defendSuccessIndicate,
              guardBroken: this.refs.defendBreakIndicate,
              deflected: this.refs.deflectBluntIndicate,
              dodgeStart: this.refs.preAction2Indicate,
              dodgeSuccess: this.refs.dodgeIndicate,
              flanking: this.refs.flankIndicate,
              pushedBack: this.refs.pushbackIndicate,
              falling: this.refs.fallingIndicate,
              outOfStamina: this.refs.outOfStaminaIndicate,
              outOfAmmo: this.refs.outOfAmmoIndicate,
              missionEngage: this.refs.deflectIndicate2,
              missionPursue: this.refs.pursueMissionIndicate2,
              missionRetrieve: this.refs.retrieveMissionIndicate,
              missionDefend: this.refs.defendMissionIndicate,
              missionPatrol: this.refs.patrolMissionIndicate,
              missionRetreat: this.refs.retreatIndicate,
              missionEnroute: this.refs.enrouteIndicate,
              missionComplete: this.refs.completeMissionIndicate,
              thinking: this.refs.thinkingIndicate,
              alarmed: this.refs.preAttack2Indicate,
              pathSwitch: this.refs.pathSwitchIndicate,
              targetSwitch: this.refs.targetSwitchIndicate,
              aggressiveMode: this.refs.aggressiveModeIndicate,
              passiveMode: this.refs.passiveModeIndicate,
              pickupWeapon: this.refs.pickupWeaponIndicate,
              pickupArmor: this.refs.pickupArmorIndicate,
              dropWeapon: this.refs.dropWeaponIndicate,
              dropArmor: this.refs.dropArmorIndicate,
              pickupBuff: this.refs.pickupBuffIndicate,
              pickupDebuff: this.refs.pickupDebuffIndicate,
              pickupAmmo: this.refs.pickupAmmoIndicate,
              inventoryFull: this.refs.inventoryFullIndicate,
              stop: this.refs.boltDefendIndicate,
              dropWeapon: this.refs.dropWeaponIndicate,
              dropArmor: this.refs.dropArmorIndicate,
              drowning: this.refs.drowningIndicate,
              terrainSlowdown: this.refs.terrainSlowdownIndicate,
              terrainSpeedup: this.refs.terrainSpeedupIndicate,
              terrainInjured: this.refs.terrainInjuredIndicate,
              destroyedItem: this.refs.destroyedItemIndicate,
              sword: this.refs.itemSword,
              spear: this.refs.itemSpear,
              crossbow: this.refs.itemCrossbow,
              longbow: this.refs.itemBow,
              helmet: this.refs.itemHelmet1,
              mail: this.refs.itemMail1,
              greaves: this.refs.itemGreaves1,
            };
            // context.beginPath();
            // context.lineWidth = "2"
            // context.rect(point.x-25, point.y-25, this.playerDrawWidth, this.playerDrawHeight);
            // context.strokeStyle = 'white';
            // context.stroke();

            let popupBorderColor = this.playerColourRef['player'+plyr.number+'']

            let drawBubble = (ctx,x,y,w,h,radius,px,py,color) => {

               var r = x + w;
               var b = y + h;
               if(py<y || py>y+h){
                var con1 = Math.min(Math.max(x+radius,px-10),r-radius-20);
                var con2 = Math.min(Math.max(x+radius+20,px+10),r-radius);
               }
               else{
                var con1 = Math.min(Math.max(y+radius,py-10),b-radius-20);
                var con2 = Math.min(Math.max(y+radius+20,py+10),b-radius);
               }
               var dir;
               if(py < y) dir = 2;
               if(py > y) dir = 3;
               if(px < x && py>=y && py<=b) dir = 0;
               if(px > x && py>=y && py<=b) dir = 1;
               if(px >= x && px <= r && py >= y && py <= b) dir = -1;
               ctx.clearRect(x,y,this.popupSize,this.popupSize);
               ctx.beginPath();
               ctx.strokeStyle=color;
               ctx.lineWidth="1";
               ctx.moveTo(x+radius,y);
               if(dir==2){
                ctx.lineTo(con1,y);
                ctx.lineTo(px,py);
                ctx.lineTo(con2,y);
                ctx.lineTo(r-radius,y);
               }
               else ctx.lineTo(r-radius,y);
               ctx.quadraticCurveTo(r,y,r,y+radius);
               if(dir==1){
                ctx.lineTo(r,con1);
                ctx.lineTo(px,py);
                ctx.lineTo(r,con2);
                ctx.lineTo(r,b-radius);
               }
               else ctx.lineTo(r,b-radius);
               ctx.quadraticCurveTo(r, b, r-radius, b);
               if(dir==3){
                ctx.lineTo(con2,b);
                ctx.lineTo(px,py);
                ctx.lineTo(con1,b);
                ctx.lineTo(x+radius,b);
               }
               else ctx.lineTo(x+radius,b);
               ctx.quadraticCurveTo(x, b, x, b-radius);
               if(dir==0){
                ctx.lineTo(x,con2);
                ctx.lineTo(px,py);
                ctx.lineTo(x,con1);
                ctx.lineTo(x,y+radius);
               }
               else ctx.lineTo(x,y+radius);
               ctx.quadraticCurveTo(x, y, x+radius, y);
               context.fillStyle = 'white';
               ctx.fill();
               ctx.stroke();
               // ctx.globalCompositeOperation = "source-over";
               ctx.closePath();
            }
            // let drawBubble2 = (ctx, x, y, width, height, radius) => {
            //   if (width < 2 * radius) radius = width / 2;
            //   if (height < 2 * radius) radius = height / 2;
            //   ctx.clearRect(x,y,this.popupSize,this.popupSize);
            //   ctx.beginPath();
            //   ctx.strokeStyle="black";
            //   ctx.lineWidth="2";
            //   ctx.moveTo(x + radius, y);
            //   ctx.arcTo(x + width, y, x + width, y + height, radius);
            //   ctx.arcTo(x + width, y + height, x, y + height, radius);
            //   ctx.arcTo(x, y + height, x, y, radius);
            //   ctx.arcTo(x, y, x + width, y, radius);
            //   // ctx.clip();
            //   ctx.fillStyle = 'white';
            //   ctx.fill();
            //   ctx.stroke();
            //   ctx.closePath();
            // }

            if (plyr.dead.state !== true && plyr.popups.length > 0) {
              for (const popup of plyr.popups) {
                if (popup.state === true) {
                  // console.log('drawing a popup');
                  let popupDrawCoords;
                  if (popup.position === '' || !popup.position) {
                    let currentPopups = player.popups.filter(x=>x.state === true);
                    let positions = ['north','east','south','west','northEast','northWest','southEast','southWest']

                    for (const popup2 of currentPopups) {
                      if (popup2.position && popup2.position !== '') {

                        let indx = positions.indexOf(popup2.position);
                        positions.splice(indx,1)
                      }

                    }

                    let dir = undefined;

                    for (const plyr2 of this.players) {
                      if (plyr2.ai.state !== true) {
                        let myPos = plyr.currentPosition.cell.number;
                        let invalidPos = this.players[plyr2.number-1].currentPosition.cell.number;

                        if (invalidPos.x === myPos.x && invalidPos.y === myPos.y-1) {
                          dir = 'north';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y-1) {
                          dir = 'northWest';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y) {
                          dir = 'west';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y+1) {
                          dir = 'southWest';
                        }
                        if (invalidPos.x === myPos.x && invalidPos.y === myPos.y+1) {
                          dir = 'south';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y+1) {
                          dir = 'southEast';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y) {
                          dir = 'east';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y-1) {
                          dir = 'northEast';
                        }

                        if (dir && positions.includes(dir) === true) {
                          positions.splice(positions.indexOf(dir),1);
                          // console.log('dont draw over player @',dir,'choose frome these position',positions);
                        }
                      }
                    }

                    if (!positions[0]) {
                      // console.log('no open positions for', popup.msg);
                      popup.state = false;
                      popup.count = 0;
                    } else {
                      popup.position = positions[0];
                    }


                    popup.img = popupImageRef[popup.msg]

                    popupDrawCoords = this.popupDrawCalc(popup,{x:point.x-25,y:point.y-25},plyr.number);
                    // drawBubble2(context,popupDrawCoords.origin.x,popupDrawCoords.origin.y,this.popupSize,this.popupSize,2)
                    drawBubble(context,popupDrawCoords.origin.x,popupDrawCoords.origin.y,this.popupSize,this.popupSize,5,popupDrawCoords.anchor.x,popupDrawCoords.anchor.y,popupBorderColor)
                    // context.fillStyle = 'black';
                    // context.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                    // console.log('popup.msg',popup.msg,popup.img);
                    context.drawImage(popup.img, popupDrawCoords.origin.x+5,popupDrawCoords.origin.y+5,26,26);
                  }
                  else {

                    let dir = undefined;

                    for (const plyr2 of this.players) {
                      if (plyr2.ai.state !== true) {
                        let myPos = plyr.currentPosition.cell.number;
                        let invalidPos = this.players[plyr2.number-1].currentPosition.cell.number;

                        if (invalidPos.x === myPos.x && invalidPos.y === myPos.y-1) {
                          dir = 'north';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y-1) {
                          dir = 'northWest';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y) {
                          dir = 'west';
                        }
                        if (invalidPos.x === myPos.x-1 && invalidPos.y === myPos.y+1) {
                          dir = 'southWest';
                        }
                        if (invalidPos.x === myPos.x && invalidPos.y === myPos.y+1) {
                          dir = 'south';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y+1) {
                          dir = 'southEast';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y) {
                          dir = 'east';
                        }
                        if (invalidPos.x === myPos.x+1 && invalidPos.y === myPos.y-1) {
                          dir = 'northEast';
                        }

                      }
                    }

                    if (popup.position === dir ) {
                      for (const pop of plyr.popups) {
                        pop.position = '';
                        pop.state = false;
                      }
                      // console.log('reconsidering...',popup.msg);
                    }
                    else {
                      popup.img = popupImageRef[popup.msg]
                      popupDrawCoords = this.popupDrawCalc(popup,{x:point.x-25,y:point.y-25},plyr.number);
                      // drawBubble2(context,popupDrawCoords.origin.x,popupDrawCoords.origin.y,this.popupSize,this.popupSize,2)
                      drawBubble(context,popupDrawCoords.origin.x,popupDrawCoords.origin.y,this.popupSize,this.popupSize,5,popupDrawCoords.anchor.x,popupDrawCoords.anchor.y,popupBorderColor)
                      // context.fillStyle = 'black';
                      // context.fillText(""+popup.type+"", popupDrawCoords.origin.x+10, popupDrawCoords.origin.y+5);
                      // console.log('popup.msg',popup.msg);
                    context.drawImage(popup.img, popupDrawCoords.origin.x+5,popupDrawCoords.origin.y+5,26,26);
                    }


                  }
                }
              }
            }

          }

        }


        // PROJECTILES
        for (const bolt of this.projectiles) {
          if (
            bolt.currentPosition.number.x === x &&
            bolt.currentPosition.number.y === y
          ) {
            let boltImg;
            switch(bolt.direction) {
              case 'north':
                boltImg = boltImgs[bolt.direction]
              break;
              case 'south':
                boltImg = boltImgs[bolt.direction]
              break;
              case 'east':
                boltImg = boltImgs[bolt.direction]
              break;
              case 'west':
                boltImg = boltImgs[bolt.direction]
              break;
            }
            // console.log('dd',boltImg,bolt.direction);

             // context2.fillStyle = "black";
             // context2.fillRect(bolt.currentPosition.center.x, bolt.currentPosition.center.y,10,5);

             context.drawImage(boltImg, bolt.currentPosition.center.x, bolt.currentPosition.center.y-15, 35,35);
          }
        }
        if (this.boltDeflectAnim.state === true) {
          let boltDeflectImg = this.refs.boltDefendIndicate;
          context.drawImage(boltDeflectImg, this.boltDeflectAnim.position.x+35, this.boltDeflectAnim.position.y-35, 35, 35);
        }


        // OBSTACLES
        let walledTiles = []
        if (walledTiles.includes(''+x+','+y+'')) {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(gridInfoCell.levelData.charAt(0) === 'y') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(gridInfoCell.levelData.charAt(0) === 'z') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

          let isoHeight = wallImageHeight - floorImageHeight
          offset.y += isoHeight
          context.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);
        }


        // CAMERA FOCUS POINT
        if (x === this.gridWidth && y === this.gridWidth ) {

          context.fillStyle = 'purple';
          context.beginPath();
          context.arc(this.camera.focus.x, this.camera.focus.y, 10, 0, 2 * Math.PI);
          context.fill();

        }

      }
    }


    this.players[player.number-1] = player;


    // if (player.ai.state === true ) {
    //   this.aiEvaluate(player)
    // }

  }


  getTarget = (player) => {
    // console.log('checking target',player.number,'dir',player.direction);

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let gridInfo = this.gridInfo;
    // let player = this.players[this.currentPlayer-1];
    let currentPosition = player.currentPosition.cell.number;
    let direction = player.direction;
    let voidDirection;
    let target = {
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
      cell2: {
        number: {
          x: 0,
          y: 0,
        },
        center: {
          x: 0,
          y: 0,
        },
      },
      free: false,
      occupant: {
        type: '',
        player: '',
      },
      void: false
    }


    if (player.strafing.state === true) {
      direction = player.strafing.direction;
    }


    // FLANKING!!
    if (player.flanking.checking === true ) {
      if (player.flanking.step === 0) {
        direction = player.flanking.direction;
      }
    }
    if (player.flanking.state === true) {
      if (player.flanking.step === 1) {
        direction = player.flanking.preFlankDirection;
      }
    }


    let targetCellNumber = {x: 0,y: 0};
    let targetCellCenter = {x: 0,y: 0};

    // VOID CHECK & SET!!
    if (currentPosition.x === 0 && currentPosition.y === 0) {
      if (
        direction === 'north' ||
        direction === 'northEast' ||
        direction === 'northWest'
      ) {
        target.void = true;
        voidDirection = 'north';
      }
    }
    if (currentPosition.x === 0 && currentPosition.y === this.gridWidth) {
      if (
        direction === 'south' ||
        direction === 'southEast'
      ) {
        target.void = true;
        voidDirection = 'south';
      }
    }
    if (currentPosition.x === this.gridWidth && currentPosition.y === this.gridWidth) {
      if (
        direction === 'south' ||
        direction === 'southWest' ||
        direction === 'southEast'
      ) {
        target.void = true;
        voidDirection = 'south';
      }
    }
    if (currentPosition.x === this.gridWidth && currentPosition.y === 0) {
      if (
        direction === 'east' ||
        direction === 'southEast'
      ) {
        target.void = true;
        voidDirection = 'east';
      }
    }
    if (currentPosition.x === 0) {
      if (
        direction === 'west' ||
        direction === 'northWest' ||
        direction === 'southWest'
      ) {
        target.void = true;
        voidDirection = 'west';
      }
    } else if (currentPosition.y === 0) {
      if (
        direction === 'north' ||
        direction === 'northWest' ||
        direction === 'northEast'
      ) {
        target.void = true;
        voidDirection = 'north';
      }
    } else if (currentPosition.x === this.gridWidth) {
      if (
        direction === 'east' ||
        direction === 'northEast' ||
        direction === 'southEast'
      ) {
        target.void = true;
        voidDirection = 'east';
      }
    } else if (currentPosition.y === this.gridWidth) {
      if (
        direction === 'south' ||
        direction === 'southEast' ||
        direction === 'southWest'
      ) {
        target.void = true;
        voidDirection = 'south';
      }
    }


    switch(direction) {
      case 'north' :
        targetCellNumber = {
          x: currentPosition.x,
          y: currentPosition.y-1
        }
      break;
      case 'northEast' :
        targetCellNumber = {
          x: currentPosition.x+1,
          y: currentPosition.y-1
        }
      break;
      case 'northWest' :
        targetCellNumber = {
          x: currentPosition.x-1,
          y: currentPosition.y-1
        }
      break;
      case 'east' :
        targetCellNumber = {
          x: currentPosition.x+1,
          y: currentPosition.y
        }
      break;
      case 'west' :
        targetCellNumber = {
          x: currentPosition.x-1,
          y: currentPosition.y
        }
      break;
      case 'south' :
        targetCellNumber = {
          x: currentPosition.x,
          y: currentPosition.y+1
        }
      break;
      case 'southEast' :
        targetCellNumber = {
          x: currentPosition.x+1,
          y: currentPosition.y+1
        }
      break;
      case 'southWest' :
        targetCellNumber = {
          x: currentPosition.x-1,
          y: currentPosition.y+1
        }
      break;
    }


    if (player.jumping.checking === true) {
      direction = player.direction;

      switch(direction) {
        case 'north' :
          target.cell2.number = {
            x: currentPosition.x,
            y: currentPosition.y-2
          }
        break;
        case 'northWest' :
          target.cell2.number = {
            x: currentPosition.x-1,
            y: currentPosition.y-2
          }
        break;
        case 'northEast' :
          target.cell2.number = {
            x: currentPosition.x+1,
            y: currentPosition.y-2
          }
        break;
        case 'south' :
          target.cell2.number = {
            x: currentPosition.x,
            y: currentPosition.y+2
          }
        break;
        case 'southWest' :
          target.cell2.number = {
            x: currentPosition.x-1,
            y: currentPosition.y+2
          }
        break;
        case 'southEast' :
          target.cell2.number = {
            x: currentPosition.x+1,
            y: currentPosition.y+2
          }
        break;
        case 'east' :
          target.cell2.number = {
            x: currentPosition.x+2,
            y: currentPosition.y
          }
        break;
        case 'west' :
          target.cell2.number = {
            x: currentPosition.x-2,
            y: currentPosition.y
          }
        break;
      }

      switch(direction) {
        case 'north' :
          targetCellNumber = {
            x: currentPosition.x,
            y: currentPosition.y-1,
          }
        break;
        case 'northWest' :
          targetCellNumber = {
            x: currentPosition.x-1,
            y: currentPosition.y-1,
          }
        break;
        case 'northEast' :
          targetCellNumber = {
            x: currentPosition.x+1,
            y: currentPosition.y-1,
          }
        break;
        case 'south' :
          targetCellNumber = {
            x: currentPosition.x,
            y: currentPosition.y+1,
          }
        break;
        case 'southWest' :
          targetCellNumber = {
            x: currentPosition.x-1,
            y: currentPosition.y+1,
          }
        break;
        case 'southEast' :
          targetCellNumber = {
            x: currentPosition.x+1,
            y: currentPosition.y+1,
          }
        break;
        case 'east' :
          targetCellNumber = {
            x: currentPosition.x+1,
            y: currentPosition.y,
          }
        break;
        case 'west' :
          targetCellNumber = {
            x: currentPosition.x-1,
            y: currentPosition.y,
          }
        break;
      }

    }


    if (player.currentWeapon.type === 'spear' && player.attacking.state === true && player.strafing.state !== true) {

      switch(direction) {
        case 'north' :
          targetCellNumber = {
            x: currentPosition.x,
            y: currentPosition.y-2
          }
        break;
        case 'northWest' :
          targetCellNumber = {
            x: currentPosition.x-1,
            y: currentPosition.y-2
          }
        break;
        case 'northEast' :
          targetCellNumber = {
            x: currentPosition.x+1,
            y: currentPosition.y-2
          }
        break;
        case 'south' :
          targetCellNumber = {
            x: currentPosition.x,
            y: currentPosition.y+2
          }
        break;
        case 'southWest' :
          targetCellNumber = {
            x: currentPosition.x-1,
            y: currentPosition.y+2
          }
        break;
        case 'southEast' :
          targetCellNumber = {
            x: currentPosition.x+1,
            y: currentPosition.y+2
          }
        break;
        case 'east' :
          targetCellNumber = {
            x: currentPosition.x+2,
            y: currentPosition.y
          }
        break;
        case 'west' :
          targetCellNumber = {
            x: currentPosition.x-2,
            y: currentPosition.y
          }
        break;
      }

      switch(direction) {
        case 'north' :
          target.cell2.number = {
            x: currentPosition.x,
            y: currentPosition.y-1,
          }
        break;
        case 'northWest' :
          target.cell2.number = {
            x: currentPosition.x-1,
            y: currentPosition.y-1,
          }
        break;
        case 'northEast' :
          target.cell2.number = {
            x: currentPosition.x+1,
            y: currentPosition.y-1,
          }
        break;
        case 'south' :
          target.cell2.number = {
            x: currentPosition.x,
            y: currentPosition.y+1,
          }
        break;
        case 'southWest' :
          target.cell2.number = {
            x: currentPosition.x-1,
            y: currentPosition.y+1,
          }
        break;
        case 'southEast' :
          target.cell2.number = {
            x: currentPosition.x+1,
            y: currentPosition.y+1,
          }
        break;
        case 'east' :
          target.cell2.number = {
            x: currentPosition.x+1,
            y: currentPosition.y,
          }
        break;
        case 'west' :
          target.cell2.number = {
            x: currentPosition.x-1,
            y: currentPosition.y,
          }
        break;
      }
      // console.log('target.cell2.number',target.cell2.number);

      if (targetCellNumber.x < 0 || targetCellNumber.x > this.gridWidth) {
        target.void = true;
      }
      if (targetCellNumber.y < 0 || targetCellNumber.y > this.gridWidth) {
        target.void = true;
      }

    }


    let midGridVoid = false;
    // FIND CENTER!!
    let cellSideLength;
    for (const cell of gridInfo) {
      cellSideLength = cell.side;
      let xMatch = cell.number.x === targetCellNumber.x;
      let yMatch = cell.number.y === targetCellNumber.y;
      if (
        xMatch === true && yMatch === true
      ) {
        targetCellCenter = cell.center;

        // MID GRID VOID CHECK!!
        if (cell.void.state === true && player.jumping.checking !== true) {
          target.void = true
          voidDirection = player.direction;
          midGridVoid = true
        }

      }

      if (player.currentWeapon.type === 'spear' && player.attacking.state === true) {

        if (
          cell.number.x === target.cell2.number.x &&
          cell.number.y === target.cell2.number.y
        ) {
          target.cell2.center = cell.center;
        }
      }

      if (player.jumping.checking === true) {
        if (
          cell.number.x === target.cell2.number.x &&
          cell.number.y === target.cell2.number.y
        ) {
          target.cell2.center = cell.center;
        }
      }



    }

    if (target.void === true) {
      let voidCenter = {
        x: 0,
        y: 0,
      }
      switch(voidDirection) {
        case 'north' :
          voidCenter = {
            x: player.currentPosition.cell.center.x+50,
            y: player.currentPosition.cell.center.y-30,
          }
        break;
        case 'south' :
        if (
          player.currentPosition.cell.number.x === 0 &&
          player.currentPosition.cell.number.y === 9
        ) {
          voidCenter = {
            x: player.currentPosition.cell.center.x-30,
            y: player.currentPosition.cell.center.y+15,
          }
        } else {
          voidCenter = {
            x: player.currentPosition.cell.center.x-50,
            y: player.currentPosition.cell.center.y+30,
          }
        }
        break;
        case 'west' :
        if (
          player.currentPosition.cell.number.x === 0 &&
          player.currentPosition.cell.number.y === 9
        ) {
          voidCenter = {
            x: player.currentPosition.cell.center.x-30,
            y: player.currentPosition.cell.center.y-15,
          }
        } else {
          voidCenter = {
            x: player.currentPosition.cell.center.x-50,
            y: player.currentPosition.cell.center.y-30,
          }
        }
        break;
        case 'east' :
          voidCenter = {
            x: player.currentPosition.cell.center.x+50,
            y: player.currentPosition.cell.center.y+30,
          }
        break;
      }
      if (midGridVoid === true) {
        voidCenter = targetCellCenter;
      }
      targetCellCenter = voidCenter;

      context.fillStyle = "#e63946";
      context.fillRect(voidCenter.x, voidCenter.y,5,5);
    }


    target.cell = {
      number: targetCellNumber,
      center: targetCellCenter
    };

    let obstacleObstructFound = false;
    let playerObstructFound = false;
    let spearCellObstacle = false;
    let spearCell2Obstacle = false;
    for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
      for (const cell of row) {
        if (
          cell.charAt(0) === 'y' ||
          cell.charAt(0) ===  'z'
        ) {

          let obstaclePosition = {
            x: Number(cell.charAt(1)),
            y: row.indexOf(cell),
          }
          // console.log('found obstacle during map scan @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
          if (
            targetCellNumber.x === obstaclePosition.x &&
            targetCellNumber.y === obstaclePosition.y
          ) {
            // console.log('an obstacle is in your way');

            target.free = false;
            target.occupant.type = 'obstacle';
            obstacleObstructFound = true;
          }
          if (player.currentWeapon.type === 'spear' && player.attacking.state === true && player.strafing.state !== true) {

            if (
              target.cell2.number.x === obstaclePosition.x &&
              target.cell2.number.y === obstaclePosition.y
            ) {
              spearCell2Obstacle = true;

              target.free = false;
              target.occupant.type = 'obstacle';
              obstacleObstructFound = true;
            }
          }
          // if (
          //   target.cell2.number.x === obstaclePosition.x &&
          //   target.cell2.number.y === obstaclePosition.y
          // ) {
          //   spearCell2Obstacle = true;
          // }
        }
      }
    }

    for (const plyr2 of this.players) {
      if (plyr2.number !== player.number) {
        if (
          targetCellNumber.x === plyr2.currentPosition.cell.number.x &&
          targetCellNumber.y === plyr2.currentPosition.cell.number.y
        ) {
          // console.log('opposing player is in your way');
          playerObstructFound = true;
          target.free = false;
          target.occupant = {
            type: 'player',
            player: plyr2.number
          };
        }
        if (player.currentWeapon.type === 'spear' && player.attacking.state === true) {
          if (
            target.cell2.number.x === plyr2.currentPosition.cell.number.x &&
            target.cell2.number.y === plyr2.currentPosition.cell.number.y
          ) {
            // console.log('opposing player is in your way',plyr2,target.cell2.number.x === plyr2.currentPosition.cell.number.x && target.cell2.number.y === plyr2.currentPosition.cell.number.y,plyr2.currentPosition.cell.number.x,plyr2.currentPosition.cell.number.y);
            target.free = false;
            playerObstructFound = true;
            target.occupant = {
              type: 'player',
              player: plyr2.number
            };
          }

          if (obstacleObstructFound === true) {
            target.free = false;
            target.occupant.type = 'obstacle';
          }
        }

      }
    }


    // DONT MOVE IF SOMEONE ELSE HAS ALREADY STARTED MOVING TO YOUR TARGET!
    // for (const plyr3 of this.players) {
    //   if (
    //     player.number !== plyr3.number &&
    //     plyr3.moving.state == true &&
    //     plyr3.target.cell.number.x === targetCellNumber.x &&
    //     plyr3.target.cell.number.y === targetCellNumber.y
    //   ) {
    //     // console.log('player',plyr3.number,'is already heading for the cell you player ',player.number,'are targeting @',plyr3.target.cell.number);
    //
    //     target.free = false;
    //     obstacleObstructFound = true;
    //     target.occupant = {
    //       type: 'player',
    //       player: plyr3.number
    //     };
    //   }
    // }


    // DIAGONALLY ALIGNED PLAYERS/OBSTACLES CAN'T MOVE!!
    let found = 0;
    switch(direction) {
      case 'northEast' :

      for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
        for (const cell of row) {
          if (
            cell.charAt(0) === 'y' ||
            cell.charAt(0) ===  'z'
          ) {

            let obstaclePosition = {
              x: Number(cell.charAt(1)),
              y: row.indexOf(cell),
            }
            // console.log('found obstacle during map scan 2 @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);

            if (
              player.moving.origin.number.x === obstaclePosition.x && player.moving.origin.number.y-1 === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
            if (
              player.moving.origin.number.x+1 === obstaclePosition.x && player.moving.origin.number.y === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
          }
        }
      }
      for (const plyr2 of this.players) {
        if (plyr2.number !== player.number) {

          if (
            player.moving.origin.number.x === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y-1 === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
          if (
            player.moving.origin.number.x+1 === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
        }
      }
      if (found === 2) {
        // console.log('found 2');
        target.free = false;
        obstacleObstructFound = true;
        found = 0;
      }
      break;
      case 'northWest' :
      for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
        for (const cell of row) {
          if (
            cell.charAt(0) === 'y' ||
            cell.charAt(0) ===  'z'
          ) {

            let obstaclePosition = {
              x: Number(cell.charAt(1)),
              y: row.indexOf(cell),
            }
            // console.log('found obstacle during map scan 2 @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
            if (
              player.moving.origin.number.x-1 === obstaclePosition.x && player.moving.origin.number.y === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1a',found);
            }
            if (
              (player.moving.origin.number.x === obstaclePosition.x && player.moving.origin.number.y-1 === obstaclePosition.y)
            ) {
              found = found + 1;
              // console.log('found 1b',found);
            }
          }
        }
      }
      for (const plyr2 of this.players) {
        if (plyr2.number !== player.number) {
          if (
            player.moving.origin.number.x-1 === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1c',found);
          }
          if (
            player.moving.origin.number.x === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y-1 === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1d',found);
          }
        }
      }
      if (found === 2) {
        // console.log('found 2');
        target.free = false;
        obstacleObstructFound = true;
        found = 0;
      }
      break;
      case 'southWest' :
      for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
        for (const cell of row) {
          if (
            cell.charAt(0) === 'y' ||
            cell.charAt(0) ===  'z'
          ) {

            let obstaclePosition = {
              x: Number(cell.charAt(1)),
              y: row.indexOf(cell),
            }
            // console.log('found obstacle during map scan 2 @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
            if (
              player.moving.origin.number.x === obstaclePosition.x && player.moving.origin.number.y+1 === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
            if (
              player.moving.origin.number.x-1 === obstaclePosition.x && player.moving.origin.number.y === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
          }
        }
      }
      for (const plyr2 of this.players) {
        if (plyr2.number !== player.number) {
          if (
            player.moving.origin.number.x === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y+1=== plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
          if (
            player.moving.origin.number.x-1 === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
        }
      }
      if (found === 2) {
        // console.log('found 2');
        target.free = false;
        obstacleObstructFound = true;
        found = 0;
      }
      break;
      case 'southEast' :
      for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
        for (const cell of row) {
          if (
            cell.charAt(0) === 'y' ||
            cell.charAt(0) ===  'z'
          ) {

            let obstaclePosition = {
              x: Number(cell.charAt(1)),
              y: row.indexOf(cell),
            }
            // console.log('found obstacle during map scan 2 @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
            if (
              player.moving.origin.number.x+1 === obstaclePosition.x && player.moving.origin.number.y === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
            if (
              player.moving.origin.number.x === obstaclePosition.x && player.moving.origin.number.y+1 === obstaclePosition.y
            ) {
              found = found + 1;
              // console.log('found 1',found);
            }
          }
        }
      }
      for (const plyr2 of this.players) {
        if (plyr2.number !== player.number) {
          if (
            player.moving.origin.number.x+1 === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
          if (
            player.moving.origin.number.x === plyr2.currentPosition.cell.number.x && player.moving.origin.number.y+1 === plyr2.currentPosition.cell.number.y
          ) {
            found = found + 1;
            // console.log('found 1',found);
          }
        }
      }
      if (found === 2) {
        // console.log('found 2');
        target.free = false;
        obstacleObstructFound = true;
        found = 0;
      }
      break;
    }


    if (obstacleObstructFound !== true && spearCellObstacle !== true && spearCell2Obstacle !== true && playerObstructFound !== true) {
      target.free = true;
      target.occupant = {
        type: '',
        player: ''
      }
    }

    player.target = target;
    this.players[player.number-1] = player;

    return target;

  }
  lineCrementer = (player) => {
    // console.log('line crementer',player.number,player.target);

    let currentPosition = player.currentPosition.cell.center;
    let target = player.target;
    let moveSpeed = player.speed.move;
    if (player.terrainMoveSpeed.state === true) {
      // console.log('terrain speed mod',player.terrainMoveSpeed.speed);
      moveSpeed = player.terrainMoveSpeed.speed;
    }
    if (player.jumping.state === true) {
      moveSpeed = .1;
    }
    if (player.stamina.current < 1) {
      moveSpeed = .05;
    }

    if (player.flanking.state === true) {
      // moveSpeed = .1
      moveSpeed = .2
      // if (moveSpeed === .05) {
      //   moveSpeed = .1
      // }
      // else if (moveSpeed === .1) {
      //   moveSpeed = .125
      // }
      // else if (moveSpeed === .125) {
      //   moveSpeed = .2
      // }
    }

    player.moving.step = +(Math.round((player.moving.step + moveSpeed) + "e+" + 3)  + "e-" + 3);
    // player.moving.step = player.moving.step + moveSpeed;
    // console.log('mover stepper',player.moving.step);
    let newPosition;



    // line: percent is 0-1
    let startPt = currentPosition;
    let endPt;
    if (player.jumping.state === true) {
      endPt = target.cell2.center;
    } else {
      endPt = target.cell.center;
    }


    let percent = player.moving.step;

    function getLineXYatPercent(startPt,endPt,percent) {
      let dx = endPt.x-startPt.x;
      let dy = endPt.y-startPt.y;
      let X = startPt.x + dx*percent;
      let Y = startPt.y + dy*percent;
      // newPosition = {x:X,y:Y}
      newPosition = {x:Math.round(X),y:Math.round(Y)}
    }
    getLineXYatPercent(startPt,endPt,percent);

    if (player.falling.state === true) {
      // console.log('increment fall',player.action);

      player.falling.count++;

      newPosition = {
        x: target.cell.center.x,
        y: target.cell.center.y+player.falling.count*5,
      }
      player.currentPosition.cell.center = newPosition;

    }

    player.nextPosition = newPosition

    this.players[player.number-1] = player;

    return newPosition;

  }
  aiBoltPathCheck = (aiPlayer) => {

    // let path = [];
    // let originCell = {
    //   x: aiPlayer.currentPosition.cell.number.x,
    //   y: aiPlayer.currentPosition.cell.number.y,
    // };
    // let nextCell = {
    //   number: {
    //     x: 0,
    //     y: 0,
    //   },
    //   center: {
    //     x: 0,
    //     y: 0,
    //   },
    //   vertices: [],
    // };
    //
    // while (
    //   nextCell.number.x >= 0 &&
    //   nextCell.number.y >= 0 &&
    //   nextCell.number.x <= this.gridWidth &&
    //   nextCell.number.y <= this.gridWidth
    // ) {
    //   // console.log(originCell.x,originCell.y);
    //   let cell = {
    //     number: {
    //       x: 0,
    //       y: 0,
    //     },
    //     center: {
    //       x: 0,
    //       y: 0,
    //     },
    //     vertices: [],
    //   }
    //
    //   switch(direction) {
    //     case 'north' :
    //       cell.number = {
    //         x: originCell.x,
    //         y: originCell.y-1,
    //       }
    //     break;
    //     case 'northEast' :
    //       cell.number = {
    //         x: originCell.x+1,
    //         y: originCell.y-1,
    //       }
    //     break;
    //     case 'northWest' :
    //       cell.number = {
    //         x: originCell.x-1,
    //         y: originCell.y-1,
    //       }
    //     break;
    //     case 'south' :
    //       cell.number = {
    //         x: originCell.x,
    //         y: originCell.y+1,
    //       }
    //     break;
    //     case 'southEast' :
    //       cell.number = {
    //         x: originCell.x+1,
    //         y: originCell.y+1,
    //       }
    //     break;
    //     case 'southWest' :
    //       cell.number = {
    //         x: originCell.x-1,
    //         y: originCell.y+1,
    //       }
    //     break;
    //     case 'west' :
    //       cell.number = {
    //         x: originCell.x-1,
    //         y: originCell.y,
    //       }
    //     break;
    //     case 'east' :
    //       cell.number = {
    //         x: originCell.x+1,
    //         y: originCell.y,
    //       }
    //     break;
    //   };
    //
    //   nextCell = cell;
    //   originCell = nextCell.number;
    //   path.push(cell);
    // }
    // if (path.length > 1) {
    //   path.splice(path.length-1,1)
    // }
    //
    // console.log('bolt path',path);
    // let clearToShoot = true;
    //
    // for (const cell of path) {
    //   let cellRef = this.gridInfo.find(x=>x.number.x === cell.number.x && x.number.y === cell.number.y)
    //   if (
    //     cellRef &&
    //     cellRef.levelData.charAt(0) ===  'z' ||
    //     cellRef.levelData.charAt(0) ===  'y'
    //   ) {
    //     clearToShoot = false;
    //   }
    //
    // }
    //
    // return clearToShoot;



    // console.log('aiPlayer.ai.targetPlayer',aiPlayer.ai.targetPlayer);
    let rangeElemCells2 = [];
    let rangeElem = aiPlayer.currentPosition.cell.number;
    let targetPos = aiPlayer.ai.targetPlayer.currentPosition;

    let dirToFire;
    let diff = 0;
    if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
     dirToFire = 'north';
     diff = rangeElem.y - targetPos.y;
     for (var i = 0; i < diff; i++) {
       rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y - i})
       // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
     }
    }
    if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
     dirToFire = 'west';
     diff = rangeElem.x - targetPos.x;
     for (var i = 0; i < diff; i++) {
       rangeElemCells2.push({x:rangeElem.x - i, y: rangeElem.y})
       // this.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
     }
    }
    if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
     dirToFire = 'south';
     diff = targetPos.y - rangeElem.y;
     for (var i = 0; i < diff; i++) {
       rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y + i})
       // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
     }
    }
    if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
     dirToFire = 'east';
     diff = targetPos.x - rangeElem.x;
     for (var i = 0; i < diff; i++) {
       rangeElemCells2.push({x:rangeElem.x + i, y: rangeElem.y})
       // this.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
     }
    }


    // IS SIGHT OBSTRUCTED?
    // let clearToShoot = true;
    let obstructions = [];
    for (const cellx of rangeElemCells2) {
      // console.log('cellx',cellx);
      let cellRef4 = this.gridInfo.find(elemb => elemb.number.x === cellx.x && elemb.number.y === cellx.y)
      if (
        cellRef4.levelData.charAt(0) ===  'z' ||
        cellRef4.levelData.charAt(0) ===  'y'
      ) {
        // clearToShoot = false;
        obstructions.push(cellx)
      }
      if (
        cellRef4.levelData.charAt(0) !==  'y' &&
        cellRef4.levelData.charAt(0) !==  'z'
      ) {
        // clearToShoot = true;
        // obstructions.push(cellx)
      }
    }

    // console.log('aiBoltPathCheck obstructions',obstructions);
    if (obstructions.length === 0) {
      return true;
    } else {
      return false;
      console.log('aiBoltPathCheck obstructions',obstructions);
    }

    // return clearToShoot

  }
  getBoltTarget = (bolt) => {
    // console.log('get bolt target');

    let index = this.projectiles.findIndex(blt => blt.id === bolt.id);

    let path = [];
    let originCell = {
      x: bolt.moving.origin.number.x,
      y: bolt.moving.origin.number.y,
    }

    let nextCell = {
      number: {
        x: 0,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      vertices: [],
    }
    while (
      nextCell.number.x >= 0 && nextCell.number.y >= 0 &&
      nextCell.number.x <= this.gridWidth && nextCell.number.y <= this.gridWidth
    ) {
      // console.log(originCell.x,originCell.y);
      let cell = {
        number: {
          x: 0,
          y: 0,
        },
        center: {
          x: 0,
          y: 0,
        },
        vertices: [],
      }

      switch(this.players[bolt.owner-1].direction) {
        case 'north' :
          cell.number = {
            x: originCell.x,
            y: originCell.y-1,
          }
        break;
        case 'northEast' :
          cell.number = {
            x: originCell.x+1,
            y: originCell.y-1,
          }
        break;
        case 'northWest' :
          cell.number = {
            x: originCell.x-1,
            y: originCell.y-1,
          }
        break;
        case 'south' :
          cell.number = {
            x: originCell.x,
            y: originCell.y+1,
          }
        break;
        case 'southEast' :
          cell.number = {
            x: originCell.x+1,
            y: originCell.y+1,
          }
        break;
        case 'southWest' :
          cell.number = {
            x: originCell.x-1,
            y: originCell.y+1,
          }
        break;
        case 'west' :
          cell.number = {
            x: originCell.x-1,
            y: originCell.y,
          }
        break;
        case 'east' :
          cell.number = {
            x: originCell.x+1,
            y: originCell.y,
          }
        break;
      }

      nextCell = cell;
      originCell = nextCell.number;
      bolt.target.path.push(cell);
    }
    if (bolt.target.path.length > 1) {
      bolt.target.path.splice(bolt.target.path.length-1,1)
    }

    // console.log('bolt path',bolt.target.path);

    for (const cell2 of bolt.target.path) {

      let cell = this.gridInfo.find(elem => elem.number.x === cell2.number.x && elem.number.y === cell2.number.y)

      if (cell) {
        cell2.center.x = cell.center.x;
        cell2.center.y = cell.center.y;
        cell2.vertices = cell.vertices;
      }

    }

    bolt.moving.state = true;

    this.projectiles[index] = bolt;

  }
  boltCrementer = (bolt) => {
    // console.log('boltCrementer');


    // let index = this.projectiles.findIndex(blt => blt.id === bolt.id);
    let distanceFactor = bolt.target.path.length;

    let moveSpeed = bolt.speed;
    // moveSpeed = bolt.speed/distanceFactor;
    // moveSpeed = bolt.speed/(distanceFactor/5);
    moveSpeed = bolt.speed/(distanceFactor/10);

    bolt.moving.step = bolt.moving.step + moveSpeed;
    let newPosition;

    // line: percent is 0-1
    let startPt = bolt.moving.origin.center;
    let endPt = bolt.target.path[bolt.target.path.length-1].center;
    let percent = bolt.moving.step;
    // console.log('percent',percent);
    //
    function getLineXYatPercent(startPt,endPt,percent) {
      let dx = endPt.x-startPt.x;
      let dy = endPt.y-startPt.y;
      let X = startPt.x + dx*percent;
      let Y = startPt.y + dy*percent;
      // newPosition = {
      //   x: X,
      //   y: Y
      // }
      newPosition = {
        x: Math.round(X),
        y: Math.round(Y)
      }
    }
    getLineXYatPercent(startPt,endPt,percent);

    // bolt.nextPosition = newPosition;

    // this.projectiles[index] = bolt;
    return newPosition;

  }
  arcBoltCrementer = () => {

  }
  checkDestination = (player,checkTerrain) => {
    // console.log('checking for item or enviro effect');

    this.players[player.number-1].terrainMoveSpeed.state = false;
    let pickUp = false;
    let cell = this.gridInfo.find(elem => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y);

    let gearAmount = 0;
    for (const weapon of player.items.weapons) {
      if (weapon.name && weapon.name !== '') {
        gearAmount++
      }
    }
    for (const armor of player.items.armor) {
      if (armor.name && armor.name !== '') {
        gearAmount++
      }
    }

    let haveSpace = false;
    if (gearAmount < player.inventorySize) {
      haveSpace = true;
    }
    // console.log('gearAmount', gearAmount, 'inventorySize',player.inventorySize);

    // if (haveSpace === true && ) {


      // let cell = this.gridInfo.find(elem => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y)
      if (cell.item.name !== '') {
        // console.log('picked up an item');
        if (cell.item.type === 'weapon') {

          if (haveSpace === true ) {

            if (player.currentWeapon.name === '' || !player.currentWeapon.name) {

              this.players[player.number-1].currentWeapon = {
                name: cell.item.name,
                type: cell.item.subType,
                effect: cell.item.effect,
              }
              this.players[player.number-1].items.weapons.push({
                name: cell.item.name,
                type: cell.item.subType,
                effect: cell.item.effect,
              })
              if (cell.item.subType === 'crossbow') {
                let ammo = parseInt(cell.item.effect.split('+')[1])
                // console.log('picked up a crossbow checking ammo',ammo);
                if (!this.players[player.number-1].popups.find(x=>x.msg === 'crossbow')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'crossbow',
                      img: '',

                    }
                  )
                }

                this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;
                // console.log('new ammo amt',this.players[player.number-1].items.ammo);
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupWeapon')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupWeapon',
                    img: '',

                  }
                )
              }

              pickUp = true;
            }
            else {
              if (player.items.weapons.map(weapon => weapon.name).includes(cell.item.name) !== true ) {
                this.players[player.number-1].items.weapons.push({
                  name: cell.item.name,
                  type: cell.item.subType,
                  effect: cell.item.effect,
                })
                if (cell.item.subType === 'crossbow') {
                  let ammo = parseInt(cell.item.effect.split('+')[1])
                  // console.log('picked up a crossbow checking ammo',ammo);
                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'crossbow')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit:25,
                        type: '',
                        position: '',
                        msg: 'crossbow',
                        img: '',

                      }
                    )
                  }
                  this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;
                  // console.log('new ammo amt',this.players[player.number-1].items.ammo);
                }
                pickUp = true;

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: 'weapon accquired',
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }
                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupWeapon')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupWeapon',
                      img: '',

                    }
                  )
                }

              }
              else {

                if (cell.item.subType === 'crossbow') {
                  let ammo = parseInt(cell.item.effect.split('+')[1]);
                  this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;
                  console.log('you already have a crossbow but take the ammo',ammo);
                  cell.item.effect = 'ammo+0';

                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupAmmo')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit:25,
                        type: '',
                        position: '',
                        msg: 'pickupAmmo',
                        img: '',

                      }
                    )
                  }
                }
                else {
                  console.log('you already have this weapon');
                  this.players[player.number-1].statusDisplay = {
                    state: true,
                    status: 'Already have this weapon!',
                    count: 1,
                    limit: this.players[player.number-1].statusDisplay.limit,
                  }

                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'stop')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit:25,
                        type: '',
                        position: '',
                        msg: 'stop',
                        img: '',

                      }
                    )
                  }
                }
              }
            }

          }
          else if (cell.item.name !== '') {
            console.log('Not enough space!!');

            this.players[player.number-1].statusDisplay = {
              state: true,
              status: 'Not enough space!!',
              count: 1,
              limit: this.players[player.number-1].statusDisplay.limit,
            }

            if (!this.players[player.number-1].popups.find(x=>x.msg === 'inventoryFull')) {
              this.players[player.number-1].popups.push(
                {
                  state: false,
                  count: 0,
                  limit:25,
                  type: '',
                  position: '',
                  msg: 'inventoryFull',
                  img: '',

                }
              )
            }

          }

        }
        if (cell.item.type === 'armor') {
          // console.log('picked up armor',player.currentArmor);

          if (haveSpace === true ) {

          if (player.currentArmor.name === '' || !player.currentArmor.name) {
            // console.log('gg',cell.item.effect);
            this.players[player.number-1].currentArmor = {
              name: cell.item.name,
              type: cell.item.subType,
              effect: cell.item.effect,
            }
            this.players[player.number-1].items.armor.push({
              name: cell.item.name,
              type: cell.item.subType,
              effect: cell.item.effect,
            })

            switch(cell.item.effect) {
              case 'hpUp' :
              // console.log('armor pickup buff');
                if (this.players[player.number-1].hp < 3) {
                  // console.log('armor pickup buff hp',this.players[player.number-1].hp);
                  this.players[player.number-1].hp = player.hp + 1
                  // console.log('armor pickup buff hp',this.players[player.number-1].hp);

                  this.players[player.number-1].statusDisplay = {
                    state: true,
                    status: 'hpUp',
                    count: 1,
                    limit: this.players[player.number-1].statusDisplay.limit,
                  }

                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit:25,
                        type: '',
                        position: '',
                        msg: 'pickupBuff',
                        img: '',

                      }
                    )
                  }

                }
              break;
              case 'speedUp' :
              // console.log('armor pickup buff');
                let currentSpd1 = this.players[player.number-1].speed.range.indexOf(this.players[player.number-1].speed.move)
                if (this.players[player.number-1].speed.move < .2) {

                  // console.log('armor pickup buff speed',this.players[player.number-1].speed.move);
                  this.players[player.number-1].speed.move = this.players[player.number-1].speed.range[currentSpd1+1]
                  // console.log('armor pickup buff speed',this.players[player.number-1].speed.move);

                  this.players[player.number-1].statusDisplay = {
                    state: true,
                    status: 'speedUp',
                    count: 1,
                    limit: this.players[player.number-1].statusDisplay.limit,
                  }

                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'pickupBuff',
                        img: '',

                      }
                    )
                  }

                }
              break;
            }

            pickUp = true;
          }
          else {
            if (player.items.armor.map(armor => armor.name).includes(cell.item.name) !== true ) {
              this.players[player.number-1].items.armor.push({
                name: cell.item.name,
                type: cell.item.subType,
                effect: cell.item.effect,
              })
              pickUp = true;

              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'armor accquired',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupArmor')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupArmor',
                    img: '',

                  }
                )
              }

            }
            else {
              console.log('you already have this armor');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'Already have this armor!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'stop')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'stop',
                    img: '',

                  }
                )
              }


            }
          }

          }
          else if (cell.item.name !== '') {
            console.log('Not enough space!!');

            this.players[player.number-1].statusDisplay = {
              state: true,
              status: 'Not enough space!!',
              count: 1,
              limit: this.players[player.number-1].statusDisplay.limit,
            }

            if (!this.players[player.number-1].popups.find(x=>x.msg === 'inventoryFull')) {
              this.players[player.number-1].popups.push(
                {
                  state: false,
                  count: 0,
                  limit:25,
                  type: '',
                  position: '',
                  msg: 'inventoryFull',
                  img: '',

                }
              )
            }

          }

        }
        else {
          // console.log('item',cell.item);
          let ammo;
          switch(cell.item.name) {
            case 'moveSpeedUp' :
              // console.log('moveSpeedUp');
              let currentSpd1 = this.players[player.number-1].speed.range.indexOf(this.players[player.number-1].speed.move)
              // console.log('dd',currentSpd1,this.players[player.number-1].speed.range[currentSpd1]);
              // console.log('dd2',currentSpd1,this.players[player.number-1].speed.range[currentSpd1+1]);
              if (this.players[player.number-1].speed.move < .2) {
                // console.log('added buff');
                this.players[player.number-1].speed.move = this.players[player.number-1].speed.range[currentSpd1+1]

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupBuff',
                      img: '',

                    }
                  )
                }

                pickUp = true;
              }
              else {
                console.log('player '+player.number+' you already have max movement speed');

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: 'Already Max Speed!!',
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'stop')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'stop',
                      img: '',

                    }
                  )
                }
              }
            break;
            case 'moveSpeedDown' :
              // console.log('moveSpeedDown');
              let currentSpd2 = this.players[player.number-1].speed.range.indexOf(this.players[player.number-1].speed.move)
              // console.log('ff',currentSpd2,this.players[player.number-1].speed.range[currentSpd2]);
              // console.log('ff2',currentSpd2,this.players[player.number-1].speed.range[currentSpd2-1]);
              if (this.players[player.number-1].speed.move > .05) {
                // console.log('added debuff');
                this.players[player.number-1].speed.move = this.players[player.number-1].speed.range[currentSpd2-1]

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupDebuff')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupDebuff',
                      img: '',

                    }
                  )
                }

                pickUp = true;
              }
            break;
            case 'hpUp' :
              // console.log('hpUp');
              if (this.players[player.number-1].hp === 1 && this.players[player.number-1].speed.move < .1) {
                this.players[player.number-1].speed.move = .1;
              }
              if (this.players[player.number-1].hp < 3) {
                  this.players[player.number-1].hp ++;

                  this.players[player.number-1].statusDisplay = {
                    state: true,
                    status: cell.item.name,
                    count: 1,
                    limit: this.players[player.number-1].statusDisplay.limit,
                  }

                  if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                    this.players[player.number-1].popups.push(
                      {
                        state: false,
                        count: 0,
                        limit:25,
                        type: '',
                        position: '',
                        msg: 'pickupBuff',
                        img: '',

                      }
                    )
                  }

                  pickUp = true;
              }
              else {
                console.log('player '+player.number+' you already have max hp');

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: 'Already Max HP!!',
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'stop')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'stop',
                      img: '',

                    }
                  )
                }
              }
            break;
            case 'hpDown' :
              // console.log('hpDown');
              if (player.hp > 1) {
                this.players[player.number-1].hp --;

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupDebuff')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupDebuff',
                      img: '',

                    }
                  )
                }
                if (!this.players[player.number-1].popups.find(x=>x.msg === 'alarmed')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'alarmed',
                      img: '',

                    }
                  )
                }
                pickUp = true;
              }
            break;
            case 'focusUp' :
              if (
                this.players[player.number-1].crits.doubleHit - 2 !== 0
              ) {
                this.players[player.number-1].crits.doubleHit = this.players[player.number-1].crits.doubleHit - 2;

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupBuff',
                      img: '',

                    }
                  )
                }

              }
              this.players[player.number-1].crits.guardBreak = this.players[player.number-1].crits.guardBreak + 1;

              pickUp = true;
            break;
            case 'focusDown' :
              this.players[player.number-1].crits.doubleHit = this.players[player.number-1].crits.doubleHit + 2;
              if (this.players[player.number-1].crits.guardBreak - 1 !== 0) {
                this.players[player.number-1].crits.guardBreak = this.players[player.number-1].crits.guardBreak - 1
              }

              this.players[player.number-1].statusDisplay = {
                state: true,
                status: cell.item.name,
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupDebuff')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupDebuff',
                    img: '',

                  }
                )
              }

              pickUp = true;
            break;
            case 'strengthUp' :
              this.players[player.number-1].crits.pushBack = this.players[player.number-1].crits.pushBack + 1;

              this.players[player.number-1].crits.guardBreak = this.players[player.number-1].crits.guardBreak + 1;

              this.players[player.number-1].statusDisplay = {
                state: true,
                status: cell.item.name,
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupBuff')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupBuff',
                    img: '',

                  }
                )
              }

              pickUp = true;
            break;
            case 'strengthDown' :
              if (
                this.players[player.number-1].crits.pushBack - 1 !== 0
              ) {
                this.players[player.number-1].crits.pushBack = this.players[player.number-1].crits.pushBack - 1;

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupDebuff')) {
                  this.players[player.number-1].popups.push(
                    {
                      state: false,
                      count: 0,
                      limit:25,
                      type: '',
                      position: '',
                      msg: 'pickupDebuff',
                      img: '',

                    }
                  )
                }

                pickUp = true;
              }
              if (this.players[player.number-1].crits.guardBreak - 1 !== 0) {
                this.players[player.number-1].crits.guardBreak = this.players[player.number-1].crits.guardBreak - 1

                this.players[player.number-1].statusDisplay = {
                  state: true,
                  status: cell.item.name,
                  count: 1,
                  limit: this.players[player.number-1].statusDisplay.limit,
                }

                pickUp = true;
              }
            break;
            case 'ammo5' :
              ammo = parseInt(cell.item.name.split('o')[1])
              this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;

              this.players[player.number-1].statusDisplay = {
                state: true,
                status: cell.item.name,
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupAmmo')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupAmmo',
                    img: '',

                  }
                )
              }

              pickUp = true;
            break;
            case 'ammo10' :
              ammo = parseInt(cell.item.name.split('o')[1])
              this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;

              this.players[player.number-1].statusDisplay = {
                state: true,
                status: cell.item.name,
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }

              if (!this.players[player.number-1].popups.find(x=>x.msg === 'pickupAmmo')) {
                this.players[player.number-1].popups.push(
                  {
                    state: false,
                    count: 0,
                    limit:25,
                    type: '',
                    position: '',
                    msg: 'pickupAmmo',
                    img: '',

                  }
                )
              }

              pickUp = true;
            break;
          }

        }
        if (pickUp === true) {
          // PICKUP ANIM!!
          // if (cell.item.type === 'item') {
          //   this.players[player.number-1].itemPickup = {
          //     state: true,
          //     count: 0,
          //     limit: 10,
          //     item: {
          //       name: cell.item.name,
          //     },
          //     gear: {
          //       type: '',
          //     }
          //   }
          // }
          // else if (cell.item.type === 'weapon' || cell.item.type === 'armor') {
          //   this.players[player.number-1].itemPickup = {
          //     state: true,
          //     count: 0,
          //     limit: 10,
          //     item: {
          //       name: '',
          //     },
          //     gear: {
          //       type: cell.item.subType,
          //     }
          //   }
          // }

          cell.item = {
            name: '',
            type: '',
            subType: '',
            initDrawn: false
          }
        }

      }

    // }
    // else if (cell.item.name !== '') {
    //   console.log('Not enough space!!');
    //
    //   this.players[player.number-1].statusDisplay = {
    //     state: true,
    //     status: 'Not enough space!!',
    //     count: 1,
    //     limit: this.players[player.number-1].statusDisplay.limit,
    //   }
    // }


    switch(cell.terrain.type) {
      case 'stone' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
      case 'grass' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
      case 'deep' :
        this.players[player.number-1].falling.state = true;
        this.players[player.number-1].action = 'falling';
        this.players[player.number-1].drowning = true;

        if (!this.players[player.number-1].popups.find(x=>x.msg === 'drowning')) {
          this.players[player.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit:25,
              type: '',
              position: '',
              msg: 'drowning',
              img: '',

            }
          )
        }

        // this.moveSpeed = plyr.speed.move;
        this.players[player.number-1].target = {
          cell: {
            number: {
              x: player.currentPosition.cell.number.x,
              y: player.currentPosition.cell.number.y,
            },
            center: {
              x: player.currentPosition.cell.center.x,
              y: player.currentPosition.cell.center.y,
            },
          },
          free: true,
          occupant: {
            type: '',
            player: '',
          },
          void: true
        }

        this.players[player.number-1].moving = {
          state: true,
          step: 0,
          course: '',
          origin: {
            number: player.currentPosition.cell.number,
            center: player.currentPosition.cell.center,
          },
          destination: {
            x: player.currentPosition.cell.center.x,
            y: player.currentPosition.cell.center.y,
          }
        }

        let nextPosition = this.lineCrementer(player);
        this.players[player.number-1].nextPosition = nextPosition;

        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
      case 'road' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
      break;
      case 'shallow' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
        this.players[player.number-1].terrainMoveSpeed.state = true;
        this.players[player.number-1].terrainMoveSpeed.speed = .1;
      break;
      case 'sticky' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
        this.players[player.number-1].terrainMoveSpeed.state = true;
        this.players[player.number-1].terrainMoveSpeed.speed = .05;

        if (!player.popups.find(x=>x.msg === 'terrainSlowdown')) {
          this.players[player.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'terrainSlowdown',
              img: '',

            }
          )
        }

      break;
      case 'slippery' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
        this.players[player.number-1].terrainMoveSpeed.state = true;
        this.players[player.number-1].terrainMoveSpeed.speed = .2;

        if (!player.popups.find(x=>x.msg === 'terrainSpeedup')) {
          this.players[player.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'terrainSpeedup',
              img: '',

            }
          )
        }

      break;
      case 'hazard' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
        let applyHazard;
        if (cell.terrain.name === 'lava') {
          applyHazard = this.rnJesus(1,2)
        }
        else {
          applyHazard = this.rnJesus(1,3)
        }
        if (applyHazard === 1) {
          this.players[player.number-1].hp = this.players[player.number-1].hp -1;

          if (!this.players[player.number-1].popups.find(x=>x.msg === 'alarmed')) {
            this.players[player.number-1].popups.push(
              {
                state: false,
                count: 0,
                limit:25,
                type: '',
                position: '',
                msg: 'alarmed',
                img: '',

              }
            )
          }

          if (this.players[player.number-1].hp <= 0) {
            this.killPlayer(this.players[player.number-1]);

            let randomItemIndex = this.rnJesus(0,this.itemList.length-1)
            this.placeItems({init: false, item: this.itemList[randomItemIndex].name})

          }
          else {
            this.players[player.number-1].action = 'deflected';
            this.players[player.number-1].success.deflected = {
              state: true,
              count: 1,
              limit: this.deflectedLengthRef.attacked,
              predeflect: this.players[player.number-1].success.deflected.predeflect,
              type: 'attacked',
            };

            if (!player.popups.find(x=>x.msg === 'terrainInjured')) {
              this.players[player.number-1].popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'terrainInjured',
                  img: '',

                }
              )
            }



            if (this.aiDeflectedCheck.includes(this.players[player.number-1].number) !== true) {
              this.aiDeflectedCheck.push(this.players[player.number-1].number)
            }


          }
        }
      break;
    }

  }
  popupDrawCalc = (popup,playerOrigin,plyrNo) => {

    let offset = (this.playerDrawWidth-this.popupSize)/2;
    let pointerLength = this.popupSize/3;
    let offset2 = pointerLength+offset;


    let playerCorners = [
      {x:playerOrigin.x,y:playerOrigin.y},
      {x:undefined,y:undefined},
      {x:undefined,y:undefined},
      {x:undefined,y:undefined},
    ];

    playerCorners[1] = {
      x: (playerCorners[0].x+this.playerDrawWidth),
      y: playerCorners[0].y
    }
    playerCorners[2] = {
      x: playerCorners[1].x,
      y: (playerCorners[1].y+this.playerDrawHeight)
    }
    playerCorners[3] = {
      x: playerCorners[0].x,
      y: (playerCorners[0].y+this.playerDrawHeight)
    }


    let popupCoords = {
      playerOrigin: playerCorners[0],
      origin: {x:undefined,y:undefined},
      pt2: {x:undefined,y:undefined},
      pt3: {x:undefined,y:undefined},
      pt4: {x:undefined,y:undefined},
      anchor: {x:undefined,y:undefined},
      midpoint: {x:undefined,y:undefined},
    }
    let midpoint;

    switch (popup.position) {
      case 'northWest':
        popupCoords.origin = {
          x: playerCorners[0].x+offset,
          y: playerCorners[0].y-(this.popupSize+offset2)
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt3.x+(popupCoords.pt4.x-popupCoords.pt3.x)*0.50,
          y: popupCoords.pt3.y+(popupCoords.pt4.y-popupCoords.pt3.y)*0.50,
        }
        popupCoords.anchor = {
          x: midpoint.x,
          y: midpoint.y+pointerLength,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'southEast':
        popupCoords.origin = {
          x: playerCorners[3].x+offset,
          y: playerCorners[3].y+offset2,
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.origin.x+(popupCoords.pt2.x-popupCoords.origin.x)*0.50,
          y: popupCoords.origin.y+(popupCoords.pt2.y-popupCoords.origin.y)*0.50,
        }
        popupCoords.anchor = {
          x: midpoint.x,
          y: midpoint.y-pointerLength,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'northEast':
        popupCoords.origin = {
          x: playerCorners[1].x+offset2,
          y: playerCorners[1].y+offset,
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.origin.x+(popupCoords.pt4.x-popupCoords.origin.x)*0.50,
          y: popupCoords.origin.y+(popupCoords.pt4.y-popupCoords.origin.y)*0.50,
        }
        popupCoords.anchor = {
          x: midpoint.x-pointerLength,
          y: midpoint.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'southWest':
        popupCoords.origin = {
          x: playerCorners[0].x-(offset2+this.popupSize),
          y: playerCorners[0].y+offset,
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt2.x+(popupCoords.pt3.x-popupCoords.pt2.x)*0.50,
          y: popupCoords.pt2.y+(popupCoords.pt3.y-popupCoords.pt2.y)*0.50,
        }
        popupCoords.anchor = {
          x: midpoint.x+pointerLength,
          y: midpoint.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'west':

        popupCoords.origin = {
          x: playerCorners[0].x-(offset2+this.popupSize),
          // y: playerCorners[0].y,
          y: playerCorners[0].y-(this.popupSize),
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt2.x+(popupCoords.pt3.x-popupCoords.pt2.x)*0.50,
          y: popupCoords.pt2.y+(popupCoords.pt3.y-popupCoords.pt2.y)*0.50,
        }
        popupCoords.anchor = {
          x: popupCoords.pt3.x+pointerLength,
          y: popupCoords.pt3.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'north':
        popupCoords.origin = {
          x: playerCorners[1].x+offset2,
          y: playerCorners[1].y-(this.popupSize),
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt2.x+(popupCoords.pt3.x-popupCoords.pt2.x)*0.50,
          y: popupCoords.pt2.y+(popupCoords.pt3.y-popupCoords.pt2.y)*0.50,
        }
        popupCoords.anchor = {
          x: popupCoords.pt4.x-pointerLength,
          y: popupCoords.pt4.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'south':
        popupCoords.origin = {
          x: playerCorners[3].x-(this.popupSize+offset2),
          y: playerCorners[3].y,
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt2.x+(popupCoords.pt3.x-popupCoords.pt2.x)*0.50,
          y: popupCoords.pt2.y+(popupCoords.pt3.y-popupCoords.pt2.y)*0.50,
        }
        popupCoords.anchor = {
          x: popupCoords.pt2.x+pointerLength,
          y: popupCoords.pt2.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
      case 'east':
        popupCoords.origin = {
          x: playerCorners[2].x+offset2,
          y: playerCorners[2].y,
        };
        popupCoords.pt2 = {
          x: popupCoords.origin.x+this.popupSize,
          y: popupCoords.origin.y,
        }
        popupCoords.pt3 = {
          x: popupCoords.pt2.x,
          y: popupCoords.pt2.y+this.popupSize,
        }
        popupCoords.pt4 = {
          x: popupCoords.origin.x,
          y: popupCoords.origin.y+this.popupSize,
        }
        midpoint = {
          x: popupCoords.pt2.x+(popupCoords.pt3.x-popupCoords.pt2.x)*0.50,
          y: popupCoords.pt2.y+(popupCoords.pt3.y-popupCoords.pt2.y)*0.50,
        }
        popupCoords.anchor = {
          x: popupCoords.origin.x-pointerLength,
          y: popupCoords.origin.y,
        }
        popupCoords.midpoint = {
          x: midpoint.x,
          y: midpoint.y,
        }
      break;
    }

    return popupCoords;

  }
  cartesianToIsometric = (cartPt) => {

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    var tempPt = new Point();
    tempPt.x = cartPt.x - cartPt.y;
    tempPt.y = (cartPt.x + cartPt.y) / 2;
    return (tempPt);

  }
  rnJesus = (min,max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  attackedCancel = (player) => {
    // console.log('player', player.number,' attacked. Cancel action!',player.action);

    switch(player.action) {
      case 'attacking':
        player.action = 'idle';
        player.attacking = {
          state: false,
          count: 0,
          limit: 15,
        };
        player.idleAnim = {
          state: false,
          count: 0,
          limit: 5,
        };
        player.breakAnim.attack = {
          state: true,
          count: 1,
          limit: player.breakAnim.attack.limit,
        };
        this.players[player.number-1].statusDisplay = {
          state: true,
          status: 'attack break!',
          count: 1,
          limit: this.players[player.number-1].statusDisplay.limit,
        }

        player.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'attackCancelled',
            img: '',

          }
        )
        break;
      case 'defending':
        player.action = 'idle';
        player.defending = {
          state: false,
          count: 0,
          limit: 5,
        };
        player.idleAnim = {
          state: false,
          count: 0,
          limit: 5,
        };
        player.breakAnim.defend = {
          state: true,
          count: 1,
          limit: player.breakAnim.defend.limit,
        };
        this.players[player.number-1].statusDisplay = {
          state: true,
          status: 'guard break!',
          count: 1,
          limit: this.players[player.number-1].statusDisplay.limit,
        };

        player.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'attackCancelled',
            img: '',

          }
        )
        break;
    }

    if (player.ai.state === true) {
      this.players[player.number-1].ai.currentInstruction = 0
      this.players[player.number-1].ai.instructions = []
    }

  }
  pushBack = (player,hitByPlayerDirection) => {
    // console.log('pushing back');

    player.pushBack.prePushMoveSpeed = player.speed.move;
    player.speed.move = .125;

    if (player.stamina.current - 7 < 0) {
      player.stamina.current = 0;
    } else {
      player.stamina.current = player.stamina.current - this.staminaCostRef.pushBack;
    }


    let pushBackDirection = hitByPlayerDirection;
    player.strafing = {
      state: true,
      direction: pushBackDirection
    }

    let target = this.getTarget(player)

    if (target.free === true && player.target.void === false) {

      player.action = 'strafe moving';
      player.moving = {
        state: true,
        step: 0,
        course: '',
        origin: {
          number: {
            x: player.currentPosition.cell.number.x,
            y: player.currentPosition.cell.number.y
          },
          center: {
            x: player.currentPosition.cell.center,
            y: player.currentPosition.cell.center
          },
        },
        destination: target.cell.center
      }
      let nextPosition = this.lineCrementer(player);
      player.nextPosition = nextPosition;

    }
    if (target.free === false) {
          console.log('target is NOT free');
    }
    if (player.target.void === true) {
      console.log('target is VOID!!',target.cell.center.x,target.cell.center.y);
      player.action = 'strafe moving';
      player.moving = {
        state: true,
        step: 0,
        course: '',
        origin: {
          number: player.currentPosition.cell.number,
          center: player.currentPosition.cell.center,
        },
        destination: target.cell.center
      }

      let nextPosition = this.lineCrementer(player);
      player.nextPosition = nextPosition;
    }

    this.players[player.number-1] = player;

    if (target.free === true) {
      player.pushBack.state = true;

      player.popups.push(
        {
          state: false,
          count: 0,
          limit: 25,
          type: '',
          position: '',
          msg: 'pushedBack',
          img: '',

        }
      )

      this.players[player.number-1] = player;
      return true
    } else {
      this.players[player.number-1] = player;
      return false
    }

  }
  respawn = (player) => {
    // console.log('respawning',player.number);
    this.players[player.number-1].respawn = true;
    this.players[player.number-1].action = 'idle';
    this.players[player.number-1].hp = 2;
    this.players[player.number-1].speed.move = .1;
    this.players[player.number-1].ghost.state = false;
    this.players[player.number-1].drowning = false;
    this.players[player.number-1].dodging = {
      countState: false,
      state: false,
      count: 0,
      limit: 20,
      peak: {
        start: 5,
        end: 10,
      }
    };
    this.players[player.number-1].crits = {
      singleHit: 1,
      doubleHit: 6,
      pushBack: 3,
      guardBreak: 3,
      dodge: 0,
    };
    this.players[player.number-1].items = {
      weaponIndex: 0,
      armorIndex: 0,
      weapons: [{
        name: 'sword1',
        type: 'sword',
        effect: '',
      }],
      armor: [],
      ammo: 0,
    };
    this.players[player.number-1].currentWeapon = {
      name: 'sword1',
      type: 'sword',
      effect: '',
    };
    this.players[player.number-1].currentArmor = {};
    this.players[player.number-1].strafing = {
      state: false,
      direction: '',
    };
    this.players[player.number-1].pushBack = {
      state: false,
      prePushBackMoveSpeed: 0,
    };
    this.players[player.number-1].flanking = {
      checking: false,
      direction: '',
      preFlankDirection: '',
      state: false,
      step: 0,
      target1: {x:0 ,y:0},
      target2: {x:0 ,y:0},
    }
    this.players[player.number-1].itemDrop = {
      state: false,
      count: 0,
      limit: 10,
      item: {
        name: '',
      },
      gear: {
        type: '',
      }
    };
    this.players[player.number-1].itemPickup = {
      state: false,
      count: 0,
      limit: 10,
      item: {
        name: '',
      },
      gear: {
        type: '',
      }
    };
    this.players[player.number-1].jumping = {
      checking: false,
      state: false,
    };
    this.players[player.number-1].stamina = {
      current: 20,
      max: 20,
    };
    this.players[player.number-1].popups = [];


  }
  killPlayer = (player) => {
    // console.log('killing player',player.number);

    player.ghost.state = true;
    player.ghost.position.cell = player.currentPosition.cell;

    player.action = 'idle';
    player.direction = 'north';
    player.falling = {
      state: false,
      count: 0,
      limit: 7,
    }
    player.flanking = {
      checking: false,
      direction: '',
      preFlankDirection: '',
      state: false,
      step: 0,
      target1: {x:0 ,y:0},
      target2: {x:0 ,y:0},
    }
    player.target = {
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
      cell2: {
        number: {
          x: 0,
          y: 0,
        },
        center: {
          x: 0,
          y: 0,
        },
      },
      free: true,
      occupant: {
        type: '',
        player: '',
      },
      void: false
    };
    player.moving = {
      state: false,
      step: 0,
      course: '',
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
      }
    };
    player.currentPosition = {
      cell: {
        number: {
          x: -30,
          y: -30,
        },
        center: {
          x: 0,
          y: 0,
        }
      }
    };
    player.dead = {
      state: true,
      count: 1,
      limit: player.dead.limit
    }
    player.strafing = {
      state: false,
      direction: '',
    };
    player.pushBack = {
      state: false,
      prePushBackMoveSpeed: 0,
    };
    player.itemDrop = {
      state: false,
      count: 0,
      limit: 10,
      item: {
        name: '',
      },
      gear: {
        type: '',
      }
    };
    player.itemPickup = {
      state: false,
      count: 0,
      limit: 10,
      item: {
        name: '',
      },
      gear: {
        type: '',
      }
    };
    player.jumping = {
      checking: false,
      state: false,
    };
    player.stamina = {
      current: 20,
      max: 20,
    };
    player.defendDecay = {
      state: false,
      count: 0,
      limit: 25,
    };
    player.dodging = {
      countState: false,
      state: false,
      count: 0,
      limit: 20,
      peak: {
        start: 5,
        end: 10,
      }
    };
    player.defending = {
      state: false,
      count: 0,
      limit: 4,
    };
    player.deflected = {
      state: false,
      count: 0,
      limit: 20,
      predeflect: false,
      type: '',
    };
    // player.hp = 2;
    player.points--;
    player.drowning = false;


    // RESET TARGETTING FOR AI TARGETTING ME!!

    if (player.ai.state !== true) {

      this.resetAiTarget.state = true;
      this.resetAiTarget.player = player.number;

    }


    this.players[player.number-1] = player;

    if (player.ai.state === true) {
      // console.log('ai player eliminated');
      this.removeAiPlayer(player.number)
    }


    for (const player2 of this.players) {
      if (player2.ai.state === true) {
        console.log('player death/item drop. Search for weapon upgrades');
        player2.ai.upgradeWeapon = true;
      }
    }

  }
  restartGame = () => {
    // console.log('resetting');

    this.setState({
      loading: true
    })

    this.time = 0;
    this.projectiles = [];
    for (const player of this.players) {
      player.ghost.state = false;
      player.speed.move = .1;
      player.hp = 2;
      player.drowning = false;
      player.action = 'idle';
      player.dodging = {
        countState: false,
        state: false,
        count: 0,
        limit: 20,
        peak: {
          start: 5,
          end: 10,
        }
      };
      player.crits = {
        singleHit: 1,
        doubleHit: 6,
        pushBack: 3,
        dodge: 0,
      };
      player.items = {
        weaponIndex: 0,
        armorIndex: 0,
        weapons: [{
          name: 'sword1',
          type: 'sword',
          effect: '',
        }],
        armor: [],
        ammo: 0,
      };
      player.currentWeapon = {
        name: 'sword1',
        type: 'sword',
        effect: '',
      };
      player.currentArmor = {};
      player.strafing = {
        state: false,
        direction: '',
      };
      player.pushBack = {
        state: false,
        prePushBackMoveSpeed: 0,
      };
      player.itemDrop = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: '',
        },
        gear: {
          type: '',
        }
      };
      player.itemPickup = {
        state: false,
        count: 0,
        limit: 10,
        item: {
          name: '',
        },
        gear: {
          type: '',
        }
      };
      player.jumping = {
        checking: false,
        state: false,
      };
      player.stamina = {
        current: 20,
        max: 20,
      };
      player.defendDecay = {
        state: false,
        count: 0,
        limit: 25,
      };
      player.dodging = {
        countState: false,
        state: false,
        count: 0,
        limit: 20,
        peak: {
          start: 5,
          end: 10,
        }
      };
      player.defending = {
        state: false,
        count: 0,
        limit: 4,
      };
      player.flanking = {
        checking: false,
        preFlankDirection: '',
        direction: '',
        state: false,
        step: 0,
        target1: {x:0 ,y:0},
        target2: {x:0 ,y:0},
      };
      player.popups = [];

      // player.currentArmor = {};

    }
    this.aiTarget = 1;

    let plyrz = this.players
    for (const plyr of plyrz) {
      if (plyr.ai.state === true ) {
        let indx = plyrz.indexOf(plyr)
        let toRemove1 = this.players[indx];
        this.players = this.players.filter(x=> x !== toRemove1);
      }
    }

    this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2, this.state.canvas3, this.state.context3);


  }


  checkCell = (cell) => {
    // console.log('check cell');

    let cellFree = true;
    let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y);
    if (
      cell2.levelData.charAt(0) ===  'z' ||
      cell2.levelData.charAt(0) ===  'y'
    ) {
      cellFree = false;
    }
    if (cell2.item.name !== '') {
      cellFree = false;
    }
    if (
      cell2.terrain.type === 'deep' ||
      cell2.terrain.type === 'hazard'
    ) {
      cellFree = false;
    }

    // PLAYERS 1&2 ALT RESPAWN POINTS!
    if (cell.x === this.gridWidth && cell.y === this.gridWidth) {
      cellFree = false;
    }
    if (cell.x === this.gridWidth && cell.y === 0) {
      cellFree = false;
    }


    for (const player of this.players) {
      if (this.init === true) {
        if (
          player.startPosition.cell.number.x === cell.x &&
          player.startPosition.cell.number.y === cell.y
        ) {
          cellFree = false;
        }
      } else {
        if (
          player.currentPosition.cell.number.x === cell.x &&
          player.currentPosition.cell.number.y === cell.y
        ) {
          cellFree = false;
        }
      }
    }

    return cellFree;
  }
  placeItems = (args) => {

    if (args.init === true && this.disableInitItems === false) {
      // console.log('placing items init');

      if (this.customItemPlacement.state === true) {
        if (this.initItemList.length > this.customItemPlacement.cells.length) {
          console.log('not enough cells assigned for custom placement please add more');
        } else  {
          for ( const item2 of this.initItemList) {
            let index = this.initItemList.indexOf(item2)
            let cell3 = this.customItemPlacement.cells[index];
            let cell4 = this.gridInfo.find(elem => elem.number.x === cell3.x && elem.number.y === cell3.y);
            cell4.item.name = item2.name;
            cell4.item.type = item2.type;
            cell4.item.subType = item2.subType;
            cell4.item.effect = item2.effect;
          }
          // this.customItemPlacement.state = false;
        }
      }

      else {
        for ( const item of this.initItemList) {

          // if (item.amount > item.total-1) {
            // console.log('enough items for distribution');
            let cell = {
              x: 0,
              y: 0
            }
            let checkCell = false;
            while (checkCell === false) {

              cell.x = this.rnJesus(0,this.gridWidth)
              cell.y = this.rnJesus(0,this.gridWidth)
              checkCell = this.checkCell(cell);
              // console.log(checkCell);
            }
            if (checkCell === true) {
              // console.log('cell free');
              let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y);
              cell2.item.name = item.name;
              cell2.item.type = item.type;
              cell2.item.subType = item.subType;
              cell2.item.effect = item.effect;

              // item.amount--
              // console.log('post item', item, cell2.item,cell2.number);

            }
          // }
          // else {
          //   console.log('item stock empty');
          // }
        }
      }

    } else if (args.init !== true) {
      // console.log('placing items mid-game: ',args.item);


      let item = args.item;

      for (const item2 of this.itemList) {
        if (item2.name === item) {
          if (item2.amount > 0) {

            let cell = {
              x: 0,
              y: 0
            }
            let checkCell = false;
            while (checkCell === false) {

              cell.x = this.rnJesus(0,this.gridWidth)
              cell.y = this.rnJesus(0,this.gridWidth)
              checkCell = this.checkCell(cell);
            }
            if (checkCell === true) {
              let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y);
              cell2.item.name = item2.name;
              cell2.item.type = item2.type;
              cell2.item.subType = item2.subType;
              cell2.item.effect = item2.effect;

              item2.amount--;
              // console.log('placed ingame item',item2.name,"@",cell2.number.x,cell2.number.y,'remaining',item2.amount);

              // for (const cell2 of this.gridInfo) {
              //   if (
              //     cell2.number.x === cell.x &&
              //     cell2.number.y === cell.y
              //   ) {
              //     cell2.item.name = item2.name;
              //     cell2.item.type = item2.type;
              //     cell2.item.subType = item2.subType;
              //     cell2.item.effect = item2.effect;
              //
              //     item2.amount--
              //     console.log('placed ingame item',cell2.number.x,cell2.number.y,item2.amount,this.itemList);
              //   }
              // }
            }
            // item2.amount--
          } else {
            console.log('item stock empty');
          }
        }
      }

    }

  }
  deflectDrop = (player) => {
    // console.log('deflected! drop gear?',player.number);
    // console.log('preDropItems', player.items);

    let item = {
      name: '',
      type: '',
      subType: '',
      effect: '',
      initDrawn: false
    };



    let dropWhat = this.rnJesus(1,2);
    dropWhat = 1
    let shouldDrop = false;

    // let dropChance = this.rnJesus(1,1*player.crits.pushBack);

    let dropChance = this.rnJesus(1,player.crits.pushBack+3);
    dropChance = this.rnJesus(1,1);
    if (
      dropChance === 1 &&
      player.falling.state !== true &&
      player.dead.state !== true
    ) {
      shouldDrop = true;

      if (dropWhat === 1) {

        if (player.items.weapons.length > 0) {
          let index = player.items.weapons.findIndex(weapon => weapon.name === player.currentWeapon.name);
          // console.log("dropping weapon player ",player.number,this.players[player.number-1].items.weapons[index].name);

          item.name = this.players[player.number-1].items.weapons[index].name;
          item.subType = this.players[player.number-1].items.weapons[index].type;
          item.type = "weapon";
          item.effect = this.players[player.number-1].items.weapons[index].effect;

          this.players[player.number-1].itemDrop = {
            state: true,
            count: 0,
            limit: 10,
            item: {
              name: '',
            },
            gear: {
              type: this.players[player.number-1].items.weapons[index].type,
            }
          }

          this.players[player.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'dropWeapon',
              img: '',

            }
          )

          this.players[player.number-1].items.weapons.splice(index,1);
          this.players[player.number-1].items.weaponIndex = 0;
          this.players[player.number-1].currentWeapon = {
            name: '',
            type: '',
            effect: '',
          }


          if (player.currentArmor === {} || !player.currentArmor || player.currentArmor.name === '') {

            this.players[player.number-1].defending = {
              state: false,
              count: 0,
              limit: this.players[player.number-1].defending.limit,
            }
            this.players[player.number-1].action = "idle";
          }


          this.players[player.number-1].statusDisplay = {
            state: true,
            status: item.name+'dropped',
            count: 1,
            limit: this.players[player.number-1].statusDisplay.limit,
          }

        }

      }
      else {

        if (player.items.armor.length > 0) {
          let index = player.items.armor.findIndex(armor => armor.name === player.currentArmor.name);
          // console.log("dropping armor player ",player.number,this.players[player.number-1].items.armor[index].name);
          item.name = this.players[player.number-1].items.armor[index].name;
          item.subType = this.players[player.number-1].items.armor[index].type;
          item.effect = this.players[player.number-1].items.armor[index].effect;
          item.type = "armor";


          this.players[player.number-1].itemDrop = {
            state: true,
            count: 0,
            limit: 10,
            item: {
              name: '',
            },
            gear: {
              type: this.players[player.number-1].items.armor[index].type,
            }
          }

          this.players[player.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'dropArmor',
              img: '',

            }
          )


          switch(item.effect) {
            case 'hpUp' :
              if (this.players[player.number-1].hp > 1) {
                console.log('armor drop debuff hp',this.players[player.number-1].hp);
                this.players[player.number-1].hp = this.players[player.number-1].hp - 1;
                console.log('armor drop debuff hp',this.players[player.number-1].hp);
              }
            break;
            case 'speedUp' :
              let currentSpd1 = this.players[player.number-1].speed.range.indexOf(this.players[player.number-1].speed.move);
              if (this.players[player.number-1].speed.move > .05) {
                console.log('armor drop debuff speed',this.players[player.number-1].speed.move);
                this.players[player.number-1].speed.move = this.players[player.number-1].speed.range[currentSpd1-1];
                console.log('armor drop debuff speed',this.players[player.number-1].speed.move);
              }
            break;
          }

          this.players[player.number-1].items.armor.splice(index,1);
          this.players[player.number-1].items.armorIndex = 0;
          this.players[player.number-1].currentArmor = {
            name: '',
            type: '',
            effect: '',
          }

          if (player.currentWeapon === {} || !player.currentWeapon || player.currentWeapon.name === '') {

            this.players[player.number-1].defending = {
              state: false,
              count: 0,
              limit: this.players[player.number-1].defending.limit,
            }
            this.players[player.number-1].action = "idle";
          }

          this.players[player.number-1].statusDisplay = {
            state: true,
            status: item.name+'dropped',
            count: 1,
            limit: this.players[player.number-1].statusDisplay.limit,
          }

        }
      }

      // console.log('postDropItems', player.items, player.currentPosition.cell.number.x,player.currentPosition.cell.number.y);

      let dropCellIndex = this.gridInfo.findIndex(cell => cell.number.x === player.currentPosition.cell.number.x && cell.number.y === player.currentPosition.cell.number.y);
      this.gridInfo[dropCellIndex].item = item;


      if (player.ai.state === true && item.name !== "" && player.ai.organizing.dropped.state !== true) {
        if (dropWhat === 1) {
          // console.log('ai dropping weapon');
          player.ai.organizing.dropped.state = true;
          player.ai.organizing.dropped.gear = {
            name: item.name,
            type: item.type,
            subType: item.subType,
            effect: item.effect
          };
        }
        else {
          // console.log('ai dropping armor');
          player.ai.organizing.dropped.state = true;
          player.ai.organizing.dropped.gear = {
            name: item.name,
            type: item.type,
            subType: item.subType,
            effect: item.effect
          };
        }

      }


    }
    else {
      // console.log('no gear drop',player.currentPosition.cell.number.x,player.currentPosition.cell.number.y);
    }

    //   if dropped gear remove buff/effect
    // console.log('this.players[player.number-1].itemDrop',this.players[player.number-1].itemDrop);

  }
  discardGear = (player,type) => {
    // console.log('dropping gear');

    let cellToDrop = this.gridInfo.find(elem => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y);


    let cellFree = false;
    if (cellToDrop.item.name === '') {
      cellFree = true;
    }

    if (cellFree === true) {
      if (type === 'weapon' && player.items.weapons.length > 0) {

        let index = player.items.weapons.findIndex(weapon => weapon.name === player.currentWeapon.name);

        let weapon = player.currentWeapon;

        cellToDrop.item = {
          name: weapon.name,
          type: 'weapon',
          subType: weapon.type,
          effect: weapon.effect,
          initDrawn: false
        }


        this.players[player.number-1].itemDrop = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: this.players[player.number-1].items.weapons[index].type,
          }
        }
        this.players[player.number-1].statusDisplay = {
          state: true,
          status: weapon.name+' discarded!',
          count: 1,
          limit: this.players[player.number-1].statusDisplay.limit,
        }

        this.players[player.number-1].popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'dropWeapon',
            img: '',

          }
        )

        this.players[player.number-1].items.weapons.splice(index,1);
        this.players[player.number-1].currentWeapon = {
          name: "",
          type: "",
          effect: "",
        }

        if (player.currentArmor === {} || !player.currentArmor || player.currentArmor.name === '') {

          this.players[player.number-1].defending = {
            state: false,
            count: 0,
            limit: this.players[player.number-1].defending.limit,
          }
          this.players[player.number-1].action = "idle";
        }


      }
      if (type === 'armor' && player.items.armor.length > 0) {

        let index2 = player.items.armor.findIndex(armor => armor.name === player.currentArmor.name);

        let armor = player.currentArmor;

        cellToDrop.item = {
          name: armor.name,
          type: 'armor',
          subType: armor.type,
          effect: armor.effect,
          initDrawn: false
        }

        this.players[player.number-1].itemDrop = {
          state: true,
          count: 0,
          limit: 10,
          item: {
            name: '',
          },
          gear: {
            type: this.players[player.number-1].items.armor[index2].type,
          }
        }
        this.players[player.number-1].statusDisplay = {
          state: true,
          status: armor.name+' discarded!',
          count: 1,
          limit: this.players[player.number-1].statusDisplay.limit,
        }

        this.players[player.number-1].popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'dropArmor',
            img: '',

          }
        )

        this.players[player.number-1].items.armor.splice(index2,1);
        this.players[player.number-1].currentArmor = {
          name: "",
          type: "",
          effect: "",
        }

        if (player.currentWeapon === {} || !player.currentWeapon || player.currentWeapon.name === '') {

          this.players[player.number-1].defending = {
            state: false,
            count: 0,
            limit: this.players[player.number-1].defending.limit,
          }
          this.players[player.number-1].action = "idle";
        }


      }
    } else {
      console.log('cell occupied. Cant drop gear');

      this.players[player.number-1].statusDisplay = {
        state: true,
        status: 'Cell occupied. Cant drop!',
        count: 1,
        limit: this.players[player.number-1].statusDisplay.limit,
      }

      if (!this.players[player.number-1].popups.find(x=>x.msg === 'stop')) {
        this.players[player.number-1].popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'stop',
            img: '',

          }
        )
      }

    }

  }
  scanTargetAreaThreat = (args) => {
    // console.log('scanning area for threats');

    let point = args.point;
    let range = args.range;
    let playerPositions = [];
    let isSafe = true;
    let threats = []
     for (const player of this.players) {
       if (player.ai.state !== true && player.number !== args.player) {
         playerPositions.push({
           player: player.number,
           position: player.currentPosition.cell.number,
         })
       }
     }
     for (const playerPos of playerPositions) {

       let xDiff;
       let yDiff;
       let largerx = Math.max(point.x, playerPos.position.x);
       // console.log('playerPos.position.x',playerPos.position.x,'point.x',point.x,'largerx',largerx);
       if (largerx === point.x) {
         xDiff = point.x - playerPos.position.x;
       } else {
         xDiff = playerPos.position.x - point.x;
       }
       let largery = Math.max(point.y, playerPos.position.y);
       // console.log('playerPos.position.y',playerPos.position.y,'point.y',point.y,'largery',largery);
       if (largery === point.y) {
         yDiff = point.y - playerPos.position.y;
       } else {
         yDiff = playerPos.position.y - point.y;
       }
       let diffSum = xDiff + yDiff;
       // console.log('vv',playerPos.player,diffSum);

       if (diffSum <= range) {
         threats.push({
           player: playerPos.player,
           position: playerPos.position,
           distValue: diffSum,
           distIndex: undefined,
         })
       }

     }

     if (threats.length > 0) {
       isSafe = false;
     }

     threats.sort((a, b) => (a.distValue > b.distValue) ? 1 : -1);
     for (const threat of threats) {
       let threatIndex = threats.findIndex(x => x.player === threat.player)
       threat.distIndex = threatIndex;
     }
     // console.log('threats',threats);

     return {
       isSafe: isSafe,
       threats: threats
     }

  }


  customCellToVoid = (cell) => {
    console.log('void specific cell');

    this.cellToVoid.state = true;
    this.cellToVoid.x = cell.x;
    this.cellToVoid.y = cell.y;
    this.cellToVoid.count = 1;

    this.openVoid = true;
    this.voidCustomCell = true;

  }
  voidSummon = (cell) => {
    // console.log('opening void');

      let foundPlayer;
      let player;
      let cl = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y)

      if (
        cl.number.x === this.gridWidth &&
        cl.number.y === 0
      ) {
        // console.log('dont void this');
      }
      if (
        cl.number.x === this.gridWidth &&
        cl.number.y === this.gridWidth
      ) {
        // console.log('dont void this');
      } else {
        cl.item = {
          name: '',
          type: '',
          subType: '',
          effect: '',
          initDrawn: false
        };
        cl.void.state = true;
        // console.log('voiding',cl.number.x,cl.number.y);

        if (
          cl.levelData.charAt(0) === 'y'
        ) {
          let x = cl.levelData.slice(1,3)
          cl.levelData = "x"+x+"";
        }
        if (
          cl.levelData.charAt(0) === 'z'
        ) {
          let x = cl.levelData.slice(1,3)
          cl.levelData = "x"+x+"";
        }
      }


      for (const plyr of this.players) {
        if (
          plyr.currentPosition.cell.number.x === cell.x &&
          plyr.currentPosition.cell.number.y === cell.y
        ) {
          foundPlayer = true;
          this.players[plyr.number-1].falling.state = true;
          this.players[plyr.number-1].action = 'falling';

          this.players[plyr.number-1].popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'falling',
              img: '',

            }
          )

          this.moveSpeed = plyr.speed.move;
          this.players[plyr.number-1].target = {
            cell: {
              number: {
                x: plyr.currentPosition.cell.number.x,
                y: plyr.currentPosition.cell.number.y,
              },
              center: {
                x: plyr.currentPosition.cell.center.x,
                y: plyr.currentPosition.cell.center.y,
              },
            },
            free: true,
            occupant: {
              type: '',
              player: '',
            },
            void: true
          }

          this.players[plyr.number-1].moving = {
            state: true,
            step: 0,
            course: '',
            origin: {
              number: plyr.currentPosition.cell.number,
              center: plyr.currentPosition.cell.center,
            },
            destination: {
              x: plyr.currentPosition.cell.center.x,
              y: plyr.currentPosition.cell.center.y,
            }
          }

          let nextPosition = this.lineCrementer(plyr);
          this.players[plyr.number-1].nextPosition = nextPosition;

        }
      }

    this.updatePathArray();

    this.easyStar.avoidAdditionalPoint(cell.x, cell.y);

    for (const plyr2 of this.players) {
      if (plyr2.ai.state === true) {
        plyr2.ai.targetAcquired = false;
      }
    }

  }


  updatePathArray = () => {
    // console.log('updating pathArray');

    let pathArray = []

    for (const [key, value] of Object.entries(this.['levelData'+this.gridWidth])) {
      let row = [];
      for (const elem3 of value) {
        // let terrainInfo2 = elem3.length-1;
        // let cell = this.gridInfo.find(elem2 => elem2.levelData === elem3)
        //
        // if (cell) {
        //   let playerCell = false;
        //   for (const plyr of this.players) {
        //     if (
        //       plyr.currentPosition.cell.number.x === cell.number.x &&
        //       plyr.currentPosition.cell.number.y === cell.number.y
        //     ) {
        //       playerCell = true;
        //     }
        //   }
        //   if (playerCell === true) {
        //     row.push(0)
        //     // row.push(1)
        //   } else {
        //     if (
        //       elem3.charAt(terrainInfo2) === 'j' ||
        //       elem3.charAt(terrainInfo2) === 'h' ||
        //       elem3.charAt(terrainInfo2) === 'i' ||
        //       elem3.charAt(0) !== 'x' ||
        //       cell.void.state === true
        //     ) {
        //       row.push(1)
        //     } else {
        //       row.push(0)
        //     }
        //     // row.push(0)
        //   }
        // }

        row.push(0)
      }
      pathArray.push(row)
    }
    this.pathArray = pathArray;

  }
  startProcessLevelData = (canvas) => {

    let gridInfo = [];
    let settingsGridInfo = [];

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    let floorImageWidth = this.floorImageWidth;
    let floorImageHeight = this.floorImageHeight;
    let wallImageWidth = this.wallImageWidth;
    let wallImageHeight = this.wallImageHeight;
    let sceneX = this.canvasWidth/2;
    let sceneY = this.sceneY;
    let tileWidth = this.tileWidth;

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }


    for (var x = 0; x < this.gridWidth+1; x++) {
      for (var y = 0; y < this.gridWidth+1; y++) {

        let p = new Point();
        p.x = x * tileWidth;
        p.y = y * tileWidth;


        let iso = this.cartesianToIsometric(p);
        let offset = {x: floorImageWidth/2, y: floorImageHeight}

        // apply offset to center scene for a better view
        iso.x += sceneX
        iso.y += sceneY

        let center = {
          x: Math.round(iso.x - offset.x/2+this.cellCenterOffsetX),
          y: Math.round(iso.y - offset.y/2-this.cellCenterOffsetY),
        }

        gridInfo.push({
          number:{x:x,y:y},
          center:{x:center.x,y:center.y},
          drawCenter:{x:center.x,y:center.y},
          vertices: [
            {x:center.x, y:center.y+this.tileWidth/2},
            {x:center.x+this.tileWidth, y:center.y},
            {x:center.x, y:center.y-this.tileWidth/2},
            {x:center.x-this.tileWidth, y:center.y},
          ],
          side: Math.sqrt((this.tileWidth/2)^2+(this.tileWidth)^2),
          levelData: '',
          edge: {
            state: false,
            side: ''
          },
          terrain: {
            name: '',
            type: '',
            effect: ''
          },
          item: {
            name: '',
            type: '',
            subType: '',
            effect: '',
            initDrawn: false
          },
          void: {
            state: false
          },
        })

      }
    }

    for (var x = 0; x < this.settingsGridWidth+1; x++) {
      for (var y = 0; y < this.settingsGridWidth+1; y++) {

        let p2 = new Point();
        p2.x = x * tileWidth/2;
        p2.y = y * tileWidth/2;

        let iso2 = this.cartesianToIsometric(p2);
        let offset2 = {x: (floorImageWidth/2)/2, y: (floorImageHeight/2)}

        // apply offset to center scene for a better view

        iso2.x += this.settingsSceneX;
        iso2.y += this.settingsSceneY;

        let center2 = {
          x: Math.round(iso2.x - offset2.x/2+(this.cellCenterOffsetX/2)),
          y: Math.round(iso2.y - offset2.y/2-(this.cellCenterOffsetY/2)),
        }


        settingsGridInfo.push({
          number:{x:x,y:y},
          center:{x:center2.x,y:center2.y},
          drawCenter:{x:center2.x,y:center2.y},
          vertices: [
            {x:center2.x, y:center2.y+this.tileWidth/4},
            {x:center2.x+this.tileWidth/2, y:center2.y},
            {x:center2.x, y:center2.y-this.tileWidth/4},
            {x:center2.x-this.tileWidth/2, y:center2.y},
          ],
          side: Math.sqrt(((this.tileWidth/2)/2)^2+((this.tileWidth/2))^2),
          levelData: '',
          edge: {
            state: false,
            side: ''
          },
          terrain: {
            name: '',
            type: '',
            effect: ''
          },
          item: {
            name: '',
            type: '',
            subType: '',
            effect: '',
            initDrawn: false
          },
          void: {
            state: false
          },
        })

      }
    }

    this.settingsGridInfo = settingsGridInfo;
    this.gridInfo = gridInfo;

  }
  processLevelData = (allCells) => {
    // console.log('processing level data','grid width',this.gridWidth);

    for(const elem of allCells) {

      // APPLY LEVEL DATA TO GRID INFO CELLS!
      let levelData2Row = 'row'+elem.number.x;
      let elemLevelData = this.['levelData'+this.gridWidth][levelData2Row][elem.number.y];
      elem.levelData = elemLevelData;

      let terrainInfo = elem.levelData.length-1;
      elem.terrain = this.terrainLevelDataRef[elem.levelData.charAt(terrainInfo)]
      if (elem.terrain.name === 'void') {
        elem.void.state = true
      }

      // console.log('oo2',elem.levelData,elem.number,elem.terrain);

      // SET EDGES!
      if (elem.number.x === 0) {
        elem.edge = {
          state: true,
          side: 'west'
        }
      }
      if (elem.number.x === this.gridWidth) {
        elem.edge = {
          state: true,
          side: 'east'
        }
      }
      if (elem.number.y === this.gridWidth) {
        elem.edge = {
          state: true,
          side: 'south'
        }
      }
      if (elem.number.y === 0) {
        elem.edge = {
          state: true,
          side: 'north'
        }
      }

    }


    for(const elem2 of this.settingsGridInfo) {

      // SET LEVEL DATA!
      let levelData2Row = 'row'+elem2.number.x;
      let elemLevelData = this.['levelData'+this.settingsGridWidth][levelData2Row][elem2.number.y];
      elem2.levelData = elemLevelData;

      let terrainInfo = elem2.levelData.length-1;
      elem2.terrain = this.terrainLevelDataRef[elem2.levelData.charAt(terrainInfo)]
      if (elem2.terrain.name === 'void') {
        elem2.void.state = true
      }

      // console.log('oo2',elem.levelData,elem.number,elem.terrain);

      // SET EDGES!
      if (elem2.number.x === 0) {
        elem2.edge = {
          state: true,
          side: 'west'
        }
      }
      if (elem2.number.x === this.settingsGridWidth) {
        elem2.edge = {
          state: true,
          side: 'east'
        }
      }
      if (elem2.number.y === this.settingsGridWidth) {
        elem2.edge = {
          state: true,
          side: 'south'
        }
      }
      if (elem2.number.y === 0) {
        elem2.edge = {
          state: true,
          side: 'north'
        }
      }

    }

    // gridInfo to 2D array
    let gridInfo2d = [];
    for (let i = 0; i <= this.gridWidth; i++) {
    // for (let i = 9; i >= 0; i--) {
      let newArray = [];
      for (var j = 0; j < allCells.length; j++) {
        if (allCells[j]['number'].x === i) {
          newArray.push(allCells[j])
        }
      }
      gridInfo2d.push(newArray)
    }


    this.gridInfo2D = gridInfo2d;
    // console.log('gridInfo2d',this.gridInfo2D);
    this.gridInfo = allCells;

    // this.settingsFormAiGridInfo = this.gridInfo;
    // console.log('post parse gridInfo',this.gridInfo);

    this.updatePathArray()


  }

  drawGridInit = (canvas, context, canvas2, context2) => {
    // console.log('drawing initial');

    context.clearRect(0,0,this.canvasWidth,this.canvasHeight)
    context2.clearRect(0,0,this.canvasWidth,this.canvasHeight)

    let gridInfo = [];
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    for (const plyr of this.players) {
      if (plyr.currentWeapon.type === 'crossbow') {
        let ammo = parseInt(plyr.currentWeapon.effect.split('+')[1])
        plyr.items.ammo = plyr.items.ammo + ammo;
      }
    }

    let floor;
    let wall = this.refs.wall;
    let wall2 = this.refs.wall2;
    let wall3 = this.refs.wall3;

    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    let floorImageWidth = this.floorImageWidth;
    let floorImageHeight = this.floorImageHeight;
    let wallImageWidth = this.wallImageWidth;
    let wallImageHeight = this.wallImageHeight;
    let sceneX = this.canvasWidth/2;
    let sceneY = this.sceneY;
    let tileWidth = this.tileWidth;

    this.startProcessLevelData(canvas);
    gridInfo = this.gridInfo;

    this.processLevelData(gridInfo);

    if (this.camera.fixed !== true) {

      // PRESET ZOOM & PAN
      // if (window.innerWidth < 1100) {
      //   console.log('here');
      //   switch(this.gridWidth) {
      //     case 3 :
      //       this.camera.pan.x = -9;
      //       this.camera.pan.y = -10;
      //     break;
      //     case 6 :
      //       this.camera.pan.x = -9;
      //       this.camera.pan.y = 10;
      //     break;
      //     case 9 :
      //       this.camera.pan.x = 1;
      //       this.camera.pan.y = 10;
      //     break;
      //     case 12 :
      //       this.camera.pan.x = -9;
      //       this.camera.pan.y = 120;
      //     break;
      //   }
      // } else {
      //   console.log('there');
      //   switch(this.gridWidth) {
      //     case 3 :
      //       this.camera.pan.x = 1;
      //       this.camera.pan.y = -50;
      //     break;
      //     case 6 :
      //       this.camera.pan.x = 1;
      //       this.camera.pan.y = -20;
      //     break;
      //     case 9 :
      //       this.camera.pan.x = 11;
      //       this.camera.pan.y = 10;
      //     break;
      //     case 12 :
      //       this.camera.pan.x = 70;
      //       this.camera.pan.y = 20;
      //     break;
      //   }
      // }

      this.setCameraFocus('init', canvas, context, canvas2, context2);
    }


    if (this.showSettingsCanvasData.state === true) {
      this.settingsFormGridWidthUpdate(this.settingsGridWidth)
    }

    let itemImgs = {
      moveSpeedUp: this.refs.itemSpdUp,
      moveSpeedDown: this.refs.itemSpdDown,
      hpUp: this.refs.itemHpUp,
      hpDown: this.refs.itemHpDown,
      focusUp: this.refs.itemFocusUp,
      focusDown: this.refs.itemFocusDown,
      strengthUp: this.refs.itemStrUp,
      strengthDown: this.refs.itemStrDown,
      sword: this.refs.itemSword,
      spear: this.refs.itemSpear,
      crossbow: this.refs.itemBow,
      helmet: this.refs.itemHelmet1,
      ammo5: this.refs.itemAmmo,
      ammo10: this.refs.itemAmmo,
      mail: this.refs.itemMail1,
      greaves: this.refs.itemGreaves1,
    };
    let floorImgs = {
      grass: this.refs.floorGrass,
      stone: this.refs.floorStone,
      dirt: this.refs.floorDirt,
      pond: this.refs.floorPond,
      mud: this.refs.floorMud,
      sand: this.refs.floorSand,
      ice: this.refs.floorIce,
      lava: this.refs.floorLava,
      bramble: this.refs.floorBramble,
      river: this.refs.floorRiver,
      void: this.refs.floorVoid,
      void2: this.refs.floorVoid2,
      void3: this.refs.floorVoid3,
    }

    this.placeItems({init: true, items: ''});

    for (var x = 0; x < this.gridWidth+1; x++) {
      for (var y = 0; y < this.gridWidth+1; y++) {
        let p = new Point();
        p.x = x * tileWidth;
        p.y = y * tileWidth;

        let iso = this.cartesianToIsometric(p);
        let offset = {x: floorImageWidth/2, y: floorImageHeight}

        // apply offset to center scene for a better view
        iso.x += sceneX
        iso.y += sceneY


        let center = {
          x: iso.x - offset.x/2+this.cellCenterOffsetX,
          y: iso.y - offset.y/2-this.cellCenterOffsetY,
        }


        let cell = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y);
        let cellLevelData = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y).levelData;


        floor = floorImgs[cell.terrain.name]

        if (cell.void.state === true) {
          // drawFloor = false;
          floor = floorImgs.void3
        }


        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y, 100, 100);

        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12);

        context.fillStyle = "black";
        context.fillRect(center.x, center.y,5,5);


        // INITIAL ITEM DISTRIBUTION!!
        let cell2 = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y);
        if (cell2.item.name !== '') {
          // console.log('found cell with item');
          if (cell2.item.initDrawn === false) {
            // console.log('found cell with item undrawn');
            let itemImg;
            let fillClr;
            if (cell2.item.type === 'item') {
              switch(cell2.item.name) {
                case 'moveSpeedUp' :
                  fillClr = "purple";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'moveSpeedDown' :
                  fillClr = "blue";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'hpUp' :
                  fillClr = "yellow";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'hpDown' :
                  fillClr = "brown";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'focusUp' :
                  fillClr = "white";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'focusDown' :
                  fillClr = "black";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'strengthUp' :
                  fillClr = "green";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'strengthDown' :
                  fillClr = "red";
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'ammo5' :
                  fillClr = '#283618';
                  itemImg = itemImgs[cell2.item.name];
                break;
                case 'ammo10' :
                  fillClr = '#283618';
                  itemImg = itemImgs[cell2.item.name];
                break;
              }
            }
            else if (cell2.item.type === 'weapon') {
              switch(cell2.item.subType) {
                case 'sword' :
                  fillClr = "orange";
                  itemImg = itemImgs[cell2.item.subType];
                break;
                case 'spear' :
                  fillClr = "maroon";
                  itemImg = itemImgs[cell2.item.subType];
                break;
                case 'crossbow' :
                  fillClr = "navy";
                  itemImg = itemImgs[cell2.item.subType];
                break;
              }
            }
            else if (cell2.item.type === 'armor') {
              switch(cell2.item.subType) {
                case 'helmet' :
                  fillClr = "grey";
                  itemImg = itemImgs[cell2.item.subType];
                break;
                case 'mail' :
                  fillClr = "olive";
                  itemImg = itemImgs[cell2.item.subType];
                break;
                case 'greaves' :
                  fillClr = "#b5179e";
                  itemImg = itemImgs[cell2.item.subType];
                break;
              }
            }


            // context.fillStyle = fillClr;
            // context.beginPath();
            // context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
            // context.fill();

            context.drawImage(itemImg ,center.x-15, center.y-15, 30,30);
          }
        }


        let vertices = [
          {x:center.x, y:center.y+tileWidth/2},
          {x:center.x+tileWidth, y:center.y},
          {x:center.x, y:center.y-tileWidth/2},
          {x:center.x-tileWidth, y:center.y},
        ];
        for (const vertex of vertices) {
          context.fillStyle = "yellow";
          context.fillRect(vertex.x-2.5, vertex.y-2.5,5,5);
        }


        let playerImgs = [
          this.refs.playerImgIdleSheet,
          this.refs.player2ImgIdleSheet,
          this.refs.playerComAImgIdleSheet,
          this.refs.playerComBImgIdleSheet,
        ]

        for (const player of this.players) {

          if (
            x === player.startPosition.cell.number.x &&
            y === player.startPosition.cell.number.y
          ) {

            let playerImg;

            if (player.ai.state === true) {
              let playerImgIndex;
              if (player.ai.imgType === "A") {
                playerImgIndex = 2;
              }
              else if (player.ai.imgType === "B") {
                playerImgIndex = 3;
              }

              playerImg = playerImgs[playerImgIndex];
            } else {
              playerImg = playerImgs[player.number-1];
            }


            let dirs = ['north','south','east','west']
            let dirIndex = dirs.indexOf(player.direction);
            let sHeight = this.charSpriteHeight;
            let sWidth = this.charSpriteWidth;
            let sy = dirIndex * sHeight;
            let sx = 0 * sWidth;


            // player.speed.move = .1;
            player.dead.state = false;
            player.dead.count = 0;

            let point = {
              x: 0,
              y: 0,
            };


            let cell = this.gridInfo.find(elem => elem.number.x === player.startPosition.cell.number.x && elem.number.y === player.startPosition.cell.number.y)
            point.x = cell.center.x;
            point.y = cell.center.y;

            player.currentPosition.cell = {
              number: {
                x: player.startPosition.cell.number.x,
                y: player.startPosition.cell.number.y
              },
              center : {
                x: point.x,
                y: point.y
              }
            }
            player.moving = {
              state: false,
              step: 0,
              course: '',
              origin: {
                number: {
                  x: player.startPosition.cell.number.x,
                  y: player.startPosition.cell.number.y,
                },
                center: {
                  x: point.x,
                  y: point.y,
                },
              },
              destination: {
                x: 0,
                y: 0,
              }
            }
            player.nextPosition = {
              x: point.x,
              y: point.y
            }

            this.players[player.number-1] = player;

            this.getTarget(player);

            context.drawImage(playerImg, sx, sy, sWidth, sHeight, point.x-30, point.y-30, this.playerDrawWidth, this.playerDrawHeight);

          }

        }

        let walledTiles = []
        if (walledTiles.includes(''+x+','+y+'')) {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(cellLevelData.charAt(0) === 'y') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);

        }
        if(cellLevelData.charAt(0) === 'z') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

          let isoHeight = wallImageHeight - floorImageHeight
          offset.y += isoHeight
          context.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

        }

        this.init = false;
        this.setState({
          loading: false,
        })

      }
    }

  }


  addAiPlayer = () => {

    let newPlayerNumber = this.players.length+1;

    let imgTypeRoll = this.rnJesus(1,2);
    let imgType;
    if (imgTypeRoll === 1) {
      imgType = "A";
    } else {
      imgType = "B";
    }

    if (this.addAiCount.state !== true) {

      if (this.aiInitSettings.randomStart === true) {
        // console.log('random ai mission is',this.aiInitSettings.primaryMission);
      }

      this.addAiCount.state = true;

      let cell = {x: 0, y: 0}
      let cell1 = {x: 0, y: 0}
      let cell3 = {x: 0, y: 0}

      let checkCell = false;
      if (this.aiInitSettings.randomStart === true && this.aiInitSettings.primaryMission === 'pursue') {
        while (checkCell === false) {
          cell.x = this.rnJesus(0,this.gridWidth)
          cell.y = this.rnJesus(0,this.gridWidth)
          checkCell = this.checkCell(cell);
        }
      }
      if (this.aiInitSettings.randomStart === true && this.aiInitSettings.primaryMission === 'patrol') {

        let checkPatrolCell1 = false;
        let checkPatrolCell2 = false;
        let inBounds = false;

        while (checkPatrolCell1 === false) {
          cell1.x = this.rnJesus(0,this.gridWidth)
          cell1.y = this.rnJesus(0,this.gridWidth)
          checkPatrolCell1 = this.checkCell(cell1);
        }

        while (checkPatrolCell2 === false && checkPatrolCell1 === true) {

          // console.log('cell1 chosen',cell1);
          let range = 4;
          let directions = ['north','east','south','west'];
          let whatDir1 = this.rnJesus(1,4)
          let chooseDirection = directions[whatDir1-1];

          switch(chooseDirection) {
            case 'north':
              cell3 = {
                x: cell1.x,
                y: cell1.y-range,
              }
            break;
            case 'south':
              cell3 = cell1.y+range;
              cell3 = {
                x: cell1.x,
                y: cell1.y+range,
              }
            break;
            case 'west':
              cell3 = {
                x: cell1.x-range,
                y: cell1.y,
              }
            break;
            case 'east':
              cell3 = {
                x: cell1.x+range,
                y: cell1.y,
              }
            break;
          }
          // console.log('proposed cell 2',cell3);
          if (
            cell3.x < 0 || cell3.x > this.gridWidth ||
            cell3.y < 0 || cell3.y > this.gridWidth
          ) {
            // console.log('2nd cell is out of bounds');
          } else {
            cell3.x = this.rnJesus(0,this.gridWidth)
            cell3.y = this.rnJesus(0,this.gridWidth)
            checkPatrolCell2 = this.checkCell(cell3);
          }

        }

        if (checkPatrolCell1 === true && checkPatrolCell2 === true) {
          // console.log('patrol cells 1 & 2 chosen',cell1,cell3);
          this.aiInitSettings.partolArea[0] = cell1;
          this.aiInitSettings.partolArea[1] = cell3;
          inBounds = true;
        }
        if (inBounds === true) {
          while (checkCell === false ) {
            cell.x = this.rnJesus(0,this.gridWidth)
            cell.y = this.rnJesus(0,this.gridWidth)
            checkCell = this.checkCell(cell);
            if (cell === cell1 || cell === cell3) {
              checkCell = false
            }
          }
        }
        if (checkCell === true) {
          console.log('random patrol points chosen: start',cell,'patrol points',cell1,cell3);
        }


      }
      if (this.aiInitSettings.randomStart === true && this.aiInitSettings.primaryMission === 'defend') {
        let checkCell2 = false;
        let cell4 = {x:0,y:0}
        while (checkCell2 === false) {
          cell4.x = this.rnJesus(0,this.gridWidth)
          cell4.y = this.rnJesus(0,this.gridWidth)
          checkCell2 = this.checkCell(cell4);
        }
        if (checkCell2 === true) {
          this.aiInitSettings.partolArea[0] = cell4;
        }

        while (checkCell === false && checkCell2 === true) {
          cell.x = this.rnJesus(0,this.gridWidth)
          cell.y = this.rnJesus(0,this.gridWidth)
          checkCell = this.checkCell(cell);
        }
        if (checkCell === true) {
          console.log('random defend points chosen: start',cell,'defend point',cell4);
        }

      }

      if (this.aiInitSettings.randomStart !== true) {
        checkCell = true ;
        cell.x = this.aiInitSettings.startPosition.number.x;
        cell.y = this.aiInitSettings.startPosition.number.y;
      }


      if (checkCell === true) {


        let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y)
        let newPlayer = {
          number: newPlayerNumber,
          startPosition: {
            cell: {
              number: {
                x: cell.x,
                y: cell.y,
              },
              center: {
                x: cell2.center.x,
                y: cell2.center.y,
              }
            }
          },
          currentPosition: {
            cell: {
              number: {
                x: cell.x,
                y: cell.y,
              },
              center: {
                x: cell2.center.x,
                y: cell2.center.y,
              }
            }
          },
          nextPosition: {
            x: cell2.center.x,
            y: cell2.center.y,
          },
          target: {
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
            cell2: {
              number: {
                x: 0,
                y: 0,
              },
              center: {
                x: 0,
                y: 0,
              },
            },
            free: true,
            occupant: {
              type: '',
              player: '',
            },
            void: false
          },
          direction: 'north',
          turning: {
            state: undefined,
            toDirection: '',
            delayCount: 0,
            limit: 2.1,
          },
          turnCheckerDirection: '',
          action: 'idle',
          moving: {
            state: false,
            step: 0,
            course: '',
            origin: {
              number: {
                x: cell.x,
                y: cell.y,
              },
              center: {
                x: cell2.center.x,
                y: cell2.center.y,
              }
            },
            destination: {
              x: 0,
              y: 0,
            }
          },
          newMoveDelay: {
            state: false,
            count: 0,
            limit: 7,
          },
          strafing: {
            state: false,
            direction: '',
          },
          strafeReleaseHook: false,
          flanking: {
            checking: false,
            preFlankDirection: '',
            direction: '',
            state: false,
            step: 0,
            target1: {x:0 ,y:0},
            target2: {x:0 ,y:0},
          },
          drowning: false,
          attacking: {
            state: false,
            count: 0,
            limit: 20,
          },
          attackStrength: 0,
          bluntAttack: false,
          dodging: {
            countState: false,
            state: false,
            count: 0,
            limit: 20,
            peak: {
              start: 5,
              end: 10,
            }
          },
          dodgeDirection: '',
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
              type: '',
            }
          },
          pushBack: {
            state: false,
            prePushBackMoveSpeed: 0,
          },
          defending: {
            state: false,
            count: 0,
            limit: 4,
          },
          defendDecay: {
            state: false,
            count: 0,
            limit: 20,
          },
          defended: {
            state: false
          },
          falling: {
            state: false,
            count: 0,
            limit: 10,
          },
          dead: {
            state: false,
            count: 0,
            limit: 10
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
                }
              }
            }
          },
          respawn: false,
          points: 0,
          speed: {
            move: .1,
            range: [.05,.1,.125,.2]
          },
          terrainMoveSpeed: {
            state: false,
            speed: 0,
          },
          hp: 2,
          currentWeapon: {
            name: this.aiInitSettings.weapon.name,
            type: this.aiInitSettings.weapon.type,
            effect: this.aiInitSettings.weapon.effect,
          },
          currentArmor: {
            name: this.aiInitSettings.armor.name,
            type: this.aiInitSettings.armor.type,
            effect: this.aiInitSettings.armor.effect,
          },
          items: {
            weaponIndex: 0,
            armorIndex: 0,
            weapons: [{
              name: this.aiInitSettings.weapon.name,
              type: this.aiInitSettings.weapon.type,
              effect: this.aiInitSettings.weapon.effect,
            }],
            armor: [{
              name: this.aiInitSettings.armor.name,
              type: this.aiInitSettings.armor.type,
              effect: this.aiInitSettings.armor.effect,
            }],
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
            status: '',
            count: 0,
            limit: 15,
          },
          popups: [],
          itemDrop: {
            state: false,
            count: 0,
            limit: 10,
            item: {
              name: '',
            },
            gear: {
              type: '',
            }
          },
          itemPickup: {
            state: false,
            count: 0,
            limit: 10,
            item: {
              name: '',
            },
            gear: {
              type: '',
            }
          },
          discardGear:{
            state: false,
            count: 0,
            limit: 8,
          },
          idleAnim: {
            state: false,
            count: 0,
            limit: 5,
          },
          breakAnim: {
            attack: {
              state: false,
              count: 0,
              limit: 10
            },
            defend: {
              state: false,
              count: 0,
              limit: 10
            }
          },
          ai: {
            state: true,
            imgType: imgType,
            mission: '',
            primaryMission: '',
            prevMission: '',
            currentObjective: '',
            currentInstruction: 0,
            resetInstructions: false,
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
              action: '',
            },
            instructions: [
            ],
            engaging: {
              state: false,
              targetAction: '',
            },
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
            retrieving: {
              checkin: undefined,
              state: false,
              point: {x: undefined, y: undefined},
              targetItem: {
                name: '',
                type: '',
                subType: '',
                effect: '',
              },
              safe: false,
            },
            retreating: {
              checkin: undefined,
              state: false,
              point: {x: undefined, y: undefined},
              level: 0,
              safe: false,
            },
            organizing: {
              weaponPriorityIndex: 0,
              armorPriorityIndex: 0,
              dropped: {
                state: false,
                gear: {
                  name: '',
                  type: '',
                  subType: '',
                  effect: ''
                },
              },
            },
            mode: this.aiInitSettings.mode,
            upgradeWeapon: false,
            upgradeArmor: false,
            pathfindingRanges: {
              spear: 3,
              crossbow: 5,
            }
          },
          stamina: {
            current: 20,
            max: 20,
          },
        }



        this.players.push(newPlayer);
        this.keyPressed.push(
          {
            north: false,
            south: false,
            east: false,
            west: false,
            northEast: false,
            northWest: false,
            southEast: false,
            southWest: false,
            attack: false,
            defend: false,
            strafe: false,
            cycleWeapon: false,
            cycleArmor: false,
            dodge: false,
          }
        )
        this.aiPlayers.push(newPlayerNumber)
        this.getTarget(this.players[newPlayerNumber-1])
        this.updatePathArray();
        this.players[newPlayerNumber-1].ai.primaryMission = this.aiInitSettings.primaryMission;
        if (!this.aiInitSettings.mission) {
          this.players[newPlayerNumber-1].ai.mission = this.aiInitSettings.primaryMission;
        }

        else if (this.aiInitSettings.mission) {
          this.players[newPlayerNumber-1].ai.mission = this.aiInitSettings.mission;
        }

        if (this.aiInitSettings.primaryMission === 'patrol') {
          this.players[newPlayerNumber-1].ai.patrolling = {
            checkin: undefined,
            state: true,
            area: [
              {
                x: this.aiInitSettings.partolArea[0].x,
                y: this.aiInitSettings.partolArea[0].y,
              },
              {
                x: this.aiInitSettings.partolArea[1].x,
                y: this.aiInitSettings.partolArea[1].y,
              }
            ],
            loopControl: false,
          }
        }
        if (this.aiInitSettings.primaryMission === 'defend') {
          this.players[newPlayerNumber-1].ai.defending = {
            checkin: undefined,
            state: true,
            area: [
              {
                x: this.aiInitSettings.partolArea[0].x,
                y: this.aiInitSettings.partolArea[0].y,
              },
            ]
          }
        }
        if (this.aiInitSettings.weapon.type === 'crossbow') {
          this.players[newPlayerNumber-1].currentWeapon.effect = 'ammo+5';
          this.players[newPlayerNumber-1].items.ammo = 5;
        }


      }

    }
    else if (this.addAiCount.state === true) {
      // console.log('already adding an ai player');
    }

  }
  addAiRandomPlayer = (mission) => {

    let newMisson = mission;
    let weapon = {
      name: 'sword1',
      type: 'sword'
    };

    if (mission === 'random') {
      let whatMission = this.rnJesus(1,10)
      if (whatMission % 2 === 0 || whatMission % 7 === 0) {
        newMisson = 'pursue'
      }
      if (whatMission % 3 === 0) {
        newMisson = 'patrol'
      }
      if (whatMission % 5 === 0) {
        newMisson = 'defend'
      }

    }


    let whatWeapon = this.rnJesus(1,10)
    if (whatWeapon % 2 === 0 || whatWeapon % 3 === 0) {
      weapon = {
        name: 'sword1',
        type: 'sword'
      }
    }
    if (whatWeapon % 5 === 0) {
      weapon = {
        name: 'spear1',
        type: 'spear'
      }
    }
    if (whatWeapon % 7 === 0) {
      weapon = {
        name: 'crossbow1',
        type: 'crossbow'
      }
    }



    this.aiInitSettings = {
      randomStart: true,
      startPosition: {
        number: {x: undefined, y: undefined}
      },
      primaryMission: newMisson,
      mission: undefined,
      mode: 'careful',
      partolArea: [
        {x: undefined, y: undefined},
        {x: undefined, y: undefined},
      ],
      weapon: {
        name: weapon.name,
        type: weapon.type,
        effect: '',
      },
      armor: {
        name: '',
        type: '',
        effect: '',
      },
    }
    this.addAiPlayer();
  }
  removeAiPlayer = (playerNumber) => {
    console.log('removing ai player',playerNumber);


    let index1 = this.players.indexOf(this.players[playerNumber-1])
    let index2 = this.aiPlayers.indexOf(playerNumber);

    // SHIFT AI PLAYER NUMBERS!
    for (let elem of this.players) {
      let indx = this.players.indexOf(elem);
      if (indx > index1) {
        elem.number = elem.number - 1;
      }
    }
    for (let elem2 of this.aiPlayers) {
      let indx2 = this.aiPlayers.indexOf(elem2);
      if (indx2 > index2) {
        elem2 = elem2 - 1;
      }
    }

    this.aiPlayers.splice(index2,1);

    let keyPressedToRemove = this.keyPressed[playerNumber-1];
    this.keyPressed = this.keyPressed.filter(y=> y !== keyPressedToRemove);


    this.removeAi = playerNumber;

    this.addAiCount.state = true;


    // REMOVE DEAD AI FINAL POSITION
    // let indx3;
    // for (const item of this.additionalAvoidArray) {
    //   if (item.player === playerNumber) {
    //     indx3 = this.additionalAvoidArray.indexOf(item)
    //   }
    // }
    // this.additionalAvoidArray.splice(indx3,1)

  }
  toggleAiDisplay = () => {
    let newState = !this.state.showAiStatus;
    this.setState({
      showAiStatus: newState,
    })
  }
  safeDistanceRetreat = (plyr,cell) => {

    let isSafeDistance = false;
    let safeRetreatDistance = 2;
    if (
      cell.x <= plyr.currentPosition.cell.number.x + safeRetreatDistance ||
      cell.x >= plyr.currentPosition.cell.number.x - safeRetreatDistance ||
      cell.y <= plyr.currentPosition.cell.number.y + safeRetreatDistance ||
      cell.y >= plyr.currentPosition.cell.number.y - safeRetreatDistance
    ) {
      isSafeDistance = false;
    } else {
      isSafeDistance = true;
    }
    return isSafeDistance;
  }
  aiResetRanges = (plyr) => {
    this.players[plyr.number-1].ai.pathfindingRanges = {
      spear: 3,
      crossbow: 5,
    }
    this.players[plyr.number-1].ai.safeRange = true;
  }
  aiEvaluate = (plyr) => {
    // console.log('aiEvaluate',plyr.ai.upgradeWeapon);
    // console.log('aiEvaluate',plyr.ai.organizing.dropped.state);


    if (this.resetAiTarget.state === true) {
      console.log('someone died. reset ai targets');
      if (!plyr.popups.find(x=>x.msg === 'thinking')) {
        plyr.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'thinking',
            img: '',

          }
        )
      }
      for (const plyr of this.players) {

        if (plyr.ai.state === true && plyr.ai.targetSet === true && plyr.ai.targetPlayer.number === this.resetAiTarget.player) {

          this.aiResetRanges(plyr)

          if (plyr.attacking.state === true) {
            plyr.attacking.state = false;
            plyr.action = 'idle';
            // this.attackedCancel(plyr)
            plyr.ai.targetSet = false;
            plyr.ai.targetAcquired = false;
            plyr.ai.mission = plyr.ai.primaryMission;
            plyr.ai.currentInstruction = 0;
            plyr.ai.pathArray = [];
            plyr.ai.instructions = [];

            // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
            //   plyr.popups.push(
            //     {
            //       state: false,
            //       count: 0,
            //       limit: 25,
            //       type: '',
            //       position: '',
            //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
            //       img: '',
            //
            //     }
            //   )
            // }

          }


          plyr.ai.targetSet = false;
          plyr.ai.targetPlayer = {
            number: undefined,
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
            action: '',
          };

          if (plyr.ai.mission === 'pursue') {
            plyr.ai.targetSet = false;
            plyr.ai.targetAcquired = false;
            plyr.ai.mission = plyr.ai.primaryMission;
            plyr.ai.currentInstruction = 0;
            plyr.ai.pathArray = [];
            plyr.ai.instructions = [];

            // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
            //   plyr.popups.push(
            //     {
            //       state: false,
            //       count: 0,
            //       limit: 25,
            //       type: '',
            //       position: '',
            //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
            //       img: '',
            //
            //     }
            //   )
            // }
          }

        }
      }


      if (this.playerNumber > 1) {

        if (this.resetAiTarget.player === 1) {
          if (this.players[1].dead.state !== true && this.players[1].falling.state !== true && this.players[1].respawn !== true) {
            this.aiTarget = 2;
            this.resetAiTarget.player = 0;
          } else {
            this.allPlayersDead = true;
          }
        }

        if (this.resetAiTarget.player === 2) {
          if (this.players[0].dead.state !== true && this.players[0].falling.state !== true && this.players[0].respawn !== true) {
            this.aiTarget = 1;
            this.resetAiTarget.player = 0;
          } else {
            this.allPlayersDead = true;
          }
        }

      }
      // this.resetAiTarget.state2 = true;
      this.resetAiTarget.state = false;

    }

    if (this.allPlayersDead === true) {
      for (const plyr2 of this.players) {
        if (plyr2.dead.state !== true && plyr2.respawn !== true && plyr2.ai.state !== true) {
          this.aiTarget = plyr2.number;
          this.allPlayersDead = false;
          this.resetAiTarget.player = 0;

          if (!plyr2.popups.find(x=>x.msg === 'thinking')) {
            plyr2.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'thinking',
                img: '',

              }
            )
          }
        }
      }
    }


    // ITEM LOGIC
    let fieldItemScan = []
    for (const cell of this.gridInfo) {
      if (cell.item.name !== '') {
        fieldItemScan.push({
          name: cell.item.name,
          type: cell.item.type,
          subType: cell.item.subType,
          effect: cell.item.effect,
          location: {x: cell.number.x, y: cell.number.y}
        })
      }
    }


    let nerfItemPositions = [];
    for (const item of fieldItemScan) {

      switch(item.name) {
        case 'moveSpeedDown':
          nerfItemPositions.push(item)
        break;
        case 'hpDown':
          nerfItemPositions.push(item)
        break;
        case 'focusDown':
          nerfItemPositions.push(item)
        break;
        case 'strengthDown':
          nerfItemPositions.push(item)
        break;
      }

    };

    // console.log('fieldItemScan',fieldItemScan);
    // console.log('nerfItemPositions',nerfItemPositions);

    let weaponUpgradePriority = [];
    let armorUpgradePriority = [];


    if (plyr.ai.upgradeWeapon === true && plyr.ai.mission !== 'retreat' && plyr.ai.mission !== 'retrieve') {
      console.log('upgrade weapon');

      let weaponPriorityIndex = plyr.ai.organizing.weaponPriorityIndex;
      let havePriorityWeapon = true;
      weaponUpgradePriority = ['crossbow','spear','sword'];
      let inMyInventory = plyr.items.weapons.find(elem => elem.type === weaponUpgradePriority[weaponPriorityIndex]);

      console.log('priority weapon',weaponUpgradePriority[weaponPriorityIndex],'index',weaponPriorityIndex);



      if (plyr.currentWeapon.type === weaponUpgradePriority[weaponPriorityIndex]) {
        console.log('priority weapon is my current');

        if (plyr.currentWeapon.type === 'crossbow' && plyr.items.ammo === 0 && plyr.items.weapons.length < 2) {

          console.log('priority weapon is crossbow but out of ammo!');
          if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
            plyr.ai.upgradeWeapon = false;
            console.log('priority index max w/ nothing to retrieve');
          }
          else {
            console.log('check next priority weapon');
            plyr.ai.organizing.weaponPriorityIndex++;
          }
        } else {
          havePriorityWeapon = true;
          plyr.ai.upgradeWeapon = false
        }


      } else {
        havePriorityWeapon = false;
      }

      if (inMyInventory && plyr.currentWeapon.type !== weaponUpgradePriority[weaponPriorityIndex]) {
        console.log('priority weapon is in my inventory. Switching to it',plyr.currentWeapon,plyr.items.ammo,plyr.items.weapons);

        if (plyr.currentWeapon.type === 'crossbow' && plyr.items.ammo === 0 && plyr.items.weapons.length === 1) {

          console.log('priority weapon is crossbow but out of ammo!');
          if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
            plyr.ai.upgradeWeapon = false;
            console.log('priority index max w/ nothing to retrieve');
          }
          else {
            console.log('check next priority weapon');
            plyr.ai.organizing.weaponPriorityIndex++;
          }
        } else {
          havePriorityWeapon = true;
          plyr.ai.upgradeWeapon = false;

          plyr.currentWeapon.name = inMyInventory.name;
          plyr.currentWeapon.type = inMyInventory.type;
          plyr.currentWeapon.effect = inMyInventory.effect;
        }
        // plyr.currentWeapon.name = inMyInventory.name;
        // plyr.currentWeapon.type = inMyInventory.type;
        // plyr.currentWeapon.effect = inMyInventory.effect;

        // havePriorityWeapon = true;
        // plyr.ai.upgradeWeapon = false
      } else if (plyr.currentWeapon.type !== weaponUpgradePriority[weaponPriorityIndex]) {
        havePriorityWeapon = false;
      }

      if (havePriorityWeapon === false) {
        console.log('dont have priority weapon');

        let inTheField = fieldItemScan.find(elem => elem.subType === weaponUpgradePriority[weaponPriorityIndex])
        // console.log('inTheField',inTheField);
        if (inTheField) {
          console.log('priority weapon is in the field');

          if (inTheField.subType === 'crossbow') {
            console.log('priority is a crossbow',inTheField.effect.split('+')[1]);


            if (inTheField.effect.split('+')[1] !== 0 && inTheField.effect.split('+')[1] !== '0') {


              let targetSafeData = this.scanTargetAreaThreat({
                player: plyr.number,
                point: {
                  x: inTheField.location.x,
                  y: inTheField.location.y,
                },
                range: 3,
              })

              if (targetSafeData.isSafe === true) {
                console.log('priority weapon target is safe. Retrieve');

                plyr.ai.mission = 'retrieve';
                plyr.ai.retrieving.point = {
                  x: inTheField.location.x,
                  y: inTheField.location.y,
                }
                plyr.ai.retrieving.targetItem = {
                  name: inTheField.name,
                  type: inTheField.type,
                  subType: inTheField.subType,
                  effect: inTheField.effect,
                };
                plyr.ai.retrieving.safe = true;
                plyr.ai.upgradeWeapon = false;

                if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
                  plyr.popups.push(
                    {
                      state: false,
                      count: 0,
                      limit: 25,
                      type: '',
                      position: '',
                      msg: 'missionRetrieve',
                      img: '',

                    }
                  )
                }
              }
              else {
                console.log('priority weapon target is unsafe.');

                if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
                  // plyr.ai.upgradeWeapon = false;
                  console.log('priority index max w/ nothing to retrieve');
                }
                else {
                  console.log('check next priority weapon');
                  plyr.ai.organizing.weaponPriorityIndex++;
                }

              }

            }
            else if (inTheField.effect.split('+')[1] === 0 || inTheField.effect.split('+')[1] === '0') {
              console.log('bow in the field but has no ammo');
              if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
                // plyr.ai.upgradeWeapon = false;
                console.log('priority index max w/ nothing to retrieve');
              }
              else {
                console.log('check next priority weapon');
                plyr.ai.organizing.weaponPriorityIndex++;
              }
            }

          } else {
            console.log('priority is not a crossbow');

            let targetSafeData2 = this.scanTargetAreaThreat({
              player: plyr.number,
              point: {
                x: inTheField.location.x,
                y: inTheField.location.y,
              },
              range: 3,
            })

            if (targetSafeData2.isSafe === true) {

              plyr.ai.mission = 'retrieve';
              plyr.ai.retrieving.point = {
                x: inTheField.location.x,
                y: inTheField.location.y,
              }
              plyr.ai.retrieving.targetItem = {
                name: inTheField.name,
                type: inTheField.type,
                subType: inTheField.subType,
                effect: inTheField.effect,
              };
              plyr.ai.retrieving.safe = true;
              plyr.ai.upgradeWeapon = false;

              if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
                plyr.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: 'missionRetrieve',
                    img: '',

                  }
                )
              }

            }
            else {
              console.log('priority weapon is not in the field');

              if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
                // plyr.ai.upgradeWeapon = false;
                console.log('priority index max w/ nothing to retrieve');
              }
              else {
                console.log('choose next priority weapon');
                plyr.ai.organizing.weaponPriorityIndex++;
              }

            }

          }

        } else {
          console.log('priority weapon is not in the field, nor current nor inventory');
          if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
            // plyr.ai.upgradeWeapon = false;
            console.log('priority index max w/ nothing to retrieve');
          }
          else {
            console.log('check next priority weapon');
            plyr.ai.organizing.weaponPriorityIndex++;
          }

        }

      }

    }
    if (plyr.ai.upgradeArmor === true && plyr.ai.upgradeWeapon !== true && plyr.ai.mission !== 'retreat' && plyr.ai.mission !== 'retrieve') {
      console.log('upgrade armor');

      let armorInTheField;
      if (plyr.hp === 1) {

        armorInTheField = fieldItemScan.find(gear => gear.effect === 'hpUp')[0]
        if (armorInTheField) {


          let targetSafeData2 = this.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: armorInTheField.location.x,
              y: armorInTheField.location.y,
            },
            range: 3,
          })

          if (targetSafeData2.isSafe === true) {

            plyr.ai.mission = 'retrieve';
            plyr.ai.retrieving.point = {
              x: armorInTheField.location.x,
              y: armorInTheField.location.y,
            }
            plyr.ai.retrieving.targetItem = {
              name: armorInTheField.name,
              type: armorInTheField.type,
              subType: armorInTheField.subType,
              effect: armorInTheField.effect,
            };
            plyr.ai.retrieving.safe = true;
            plyr.ai.upgradeArmor = false;

            if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
              plyr.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'missionRetrieve',
                  img: '',

                }
              )
            }
          }

          console.log('found hpup gear in the field. retrieve! @',plyr.ai.retrieving.point);

        }
        else {
          console.log('no hp up gear found in the field',fieldItemScan.find(gear => gear.effect === 'hpUp'));
        }
      }

      if (plyr.speed.move < .1) {

        armorInTheField = fieldItemScan.find(gear => gear.effect === 'speedUp')[0]

        if (armorInTheField) {


          let targetSafeData2 = this.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: armorInTheField.location.x,
              y: armorInTheField.location.y,
            },
            range: 3,
          })

          if (targetSafeData2.isSafe === true) {

            plyr.ai.mission = 'retrieve';
            plyr.ai.retrieving.point = {
              x: armorInTheField.location.x,
              y: armorInTheField.location.y,
            }
            plyr.ai.retrieving.targetItem = {
              name: armorInTheField.name,
              type: armorInTheField.type,
              subType: armorInTheField.subType,
              effect: armorInTheField.effect,
            };
            plyr.ai.retrieving.safe = true;
            plyr.ai.upgradeArmor = false;

            if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
              plyr.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'missionRetrieve',
                  img: '',

                }
              )
            }
          }

          console.log('found speedUp gear in the field. retrieve! @',plyr.ai.retrieving.point);

        }
        else {
          console.log('no spped up gear found in the field',fieldItemScan.find(gear => gear.effect === 'speedUp'));
        }

      }

    }


    // RELOAD BOW AMMO
    if (plyr.currentWeapon.type === 'crossbow' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
      // if no ammo search field scan, for ammo or bow w/ ammo & retrieve
      if (plyr.items.ammo === 0) {
        console.log('my crossbow out of ammo');
        let inTheField = fieldItemScan.find(elem => elem.type === 'crossbow' || elem.name.substr(0,4) === 'ammo')
        if (inTheField) {
          if (inTheField.effect.split('+')[1] !== 0 && inTheField.effect.split('+')[1] !== '0') {

            let targetSafeData2 = this.scanTargetAreaThreat({
              player: plyr.number,
              point: {
                x: inTheField.location.x,
                y: inTheField.location.y,
              },
              range: 3,
            })

            if (targetSafeData2.isSafe === true) {

              plyr.ai.mission = 'retrieve';
              plyr.ai.retrieving.point = {
                x: inTheField.location.x,
                y: inTheField.location.y,
              }
              plyr.ai.retrieving.targetItem = {
                name: inTheField.name,
                type: inTheField.type,
                subType: inTheField.subType,
                effect: inTheField.effect,
              };
              plyr.ai.retrieving.safe = true;
              plyr.ai.upgradeWeapon = false;

              if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
                plyr.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: 'missionRetrieve',
                    img: '',

                  }
                )
              }

            }
            else {
              console.log('unsafe to retrieve. Choose from inventory');

              if (plyr.items.weapons.length > 1) {
                console.log('fallback to other weapon1',plyr.items.weapons);
                plyr.currentWeapon = {
                  name: plyr.items.weapons[1].name,
                  type: plyr.items.weapons[1].type,
                  effect: plyr.items.weapons[1].effect,
                }

                plyr.ai.targetAcquired = false;
              } else {
                console.log('nothing else in inventory. find other in the field1');
                plyr.ai.upgradeWeapon = true
              }

            }

          } else {
            console.log('bow in the field but no ammo');

            if (plyr.items.weapons.length > 1) {
              console.log('fallback to other weapon2',plyr.items.weapons);
              plyr.currentWeapon = {
                name: plyr.items.weapons[1].name,
                type: plyr.items.weapons[1].type,
                effect: plyr.items.weapons[1].effect,
              }

              plyr.ai.targetAcquired = false;
            } else {
              console.log('nothing else in inventory. find other in the field2');
              plyr.ai.upgradeWeapon = true
            }

          }
        } else {
          console.log('no bow or ammo in the field');

          if (plyr.items.weapons.length > 1) {
            console.log('fallback to other weapon3',plyr.items.weapons);
            plyr.currentWeapon = {
              name: plyr.items.weapons[0].name,
              type: plyr.items.weapons[0].type,
              effect: plyr.items.weapons[0].effect,
            }

            plyr.ai.targetAcquired = false;
          } else {
            console.log('nothing else in inventory. find other in the field3');
            plyr.ai.upgradeWeapon = true;

            if (plyr.ai.organizing.weaponPriorityIndex === weaponUpgradePriority.length - 1) {
              console.log('no ammo for bow or alternative weapons to upgrade to. Switch to unarmed');
              plyr.currentWeapon = {
                name: '',
                type: '',
                effect: ''
              }
            }


          }

        }
      }

    }


    // INJURED OR SLOW!
    if (plyr.hp === 1 && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retrieve') {
      console.log('injured. check for heal item');

        let itemToRetrieve = undefined;
        for (const item2 of fieldItemScan) {
          if (item2.effect === 'hpUp') {
            itemToRetrieve = item2
          }
        }

        if (itemToRetrieve) {

          let targetSafeData2 = this.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: itemToRetrieve.location.x,
              y: itemToRetrieve.location.y,
            },
            range: 3,
          })


          if (targetSafeData2.isSafe === true) {

            plyr.ai.mission = 'retrieve';
            plyr.ai.retrieving.point = {
              x: itemToRetrieve.location.x,
              y: itemToRetrieve.location.y,
            }
            plyr.ai.retrieving.targetItem = {
              name: itemToRetrieve.name,
              type: itemToRetrieve.type,
              subType: itemToRetrieve.subType,
              effect: itemToRetrieve.effect,
            };
            plyr.ai.retrieving.safe = true;

            if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
              plyr.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'missionRetrieve',
                  img: '',

                }
              )
            }

            console.log('found hpup item in the field. retrieve @ ',itemToRetrieve.location);

          } else {

            console.log('no heal item/gear found.');

          }

        }

    }

    if (plyr.speed.move < .1 && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retrieve') {
      console.log('slow. check for speed up item');


        let itemToRetrieve = undefined;
        for (const item3 of fieldItemScan) {
          if (item3.effect === 'speedUp') {
            itemToRetrieve = item3;
          }
        }

        if (itemToRetrieve) {
          console.log('found speed up item in the field. retrieve');

          let targetSafeData2 = this.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: itemToRetrieve.location.x,
              y: itemToRetrieve.location.y,
            },
            range: 3,
          })

          if (targetSafeData2.isSafe === true) {

            plyr.ai.mission = 'retrieve';
            plyr.ai.retrieving.point = {
              x: itemToRetrieve.location.x,
              y: itemToRetrieve.location.y,
            }
            plyr.ai.retrieving.targetItem = {
              name: itemToRetrieve.name,
              type: itemToRetrieve.type,
              subType: itemToRetrieve.subType,
              effect: itemToRetrieve.effect,
            };
            plyr.ai.retrieving.safe = true;
            plyr.ai.upgradeWeapon = false;

            if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
              plyr.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'missionRetrieve',
                  img: '',

                }
              )
            }

          } else {
            console.log('no speedup item/gear found. Check for armor');
            plyr.ai.upgradeArmor = true;
          }

        }

    }


    // RETRIEVE DROPPED GEAR!
    if (plyr.ai.organizing.dropped.state === true) {
      console.log('ai retrieve dropped gear flow');

      for (const cell of this.gridInfo) {
        if (cell.item.name !== '') {
          fieldItemScan.push({
            name: cell.item.name,
            type: cell.item.type,
            subType: cell.item.subType,
            effect: cell.item.effect,
            location: {x: cell.number.x, y: cell.number.y}
          })
        }
      }


      let droppedGear = fieldItemScan.find(elem => elem.name === plyr.ai.organizing.dropped.gear.name)
      // console.log('droppedGear',droppedGear);

      if (plyr.ai.mission !== 'engage') {
        console.log('gear dropped out of battle');

        if (
          droppedGear.location.x === plyr.currentPosition.cell.number.x &&
          droppedGear.location.y === plyr.currentPosition.cell.number.y
        ) {

          plyr.ai.instructions.push({
            keyword: 'pickup',
            count: 0,
            limit: 1,
          })

          this.players[plyr.number-1].ai.organizing.dropped.state = false;

          console.log('standing over dropped gear',plyr.ai.organizing.dropped.state);

        }
        else {
          console.log('retrieve dropped gear');

          plyr.ai.mission = 'retrieve';
          plyr.ai.retrieving.point = {
            x: droppedGear.location.x,
            y: droppedGear.location.y,
          }
          plyr.ai.retrieving.targetItem = {
            name: droppedGear.name,
            type: droppedGear.type,
            subType: droppedGear.subType,
            effect: droppedGear.effect,
          };
          plyr.ai.retrieving.safe = true;

          // let targetSafeData2 = this.scanTargetAreaThreat({
          //   player: plyr.number,
          //   point: {
          //     x: droppedGear.location.x,
          //     y: droppedGear.location.y,
          //   },
          //   range: 3,
          // })
          //
          // if (targetSafeData2.isSafe === true) {
          //
          //   plyr.ai.mission = 'retrieve';
          //   plyr.ai.retrieving.point = {
          //     x: droppedGear.location.x,
          //     y: droppedGear.location.y,
          //   }
          //   plyr.ai.retrieving.targetItem = {
          //     name: droppedGear.name,
          //     type: droppedGear.type,
          //     subType: droppedGear.subType,
          //     effect: droppedGear.effect,
          //   };
          //   plyr.ai.retrieving.safe = true;
          //
          // }
          // else {
          //   console.log('unsafe to retrieve. check inventory');
          //
          //   if (plyr.items.weapons.length > 1) {
          //     console.log('fallback to other weapon');
          //     plyr.currentWeapon = {
          //       name: plyr.items.weapons[1].name,
          //       type: plyr.items.weapons[1].type,
          //       effect: plyr.items.weapons[1].effect,
          //     }
          //
          //     plyr.ai.organizing.dropped.state = false;
          //   } else {
          //     console.log('nothing else in inventory. find other in the field');
          //     plyr.ai.upgradeWeapon = true;
          //   }
          // }

          if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
            plyr.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'missionRetrieve',
                img: '',

              }
            )
          }

        }

      }
      else {
        console.log('dropped gear in battle');

        if (
          droppedGear.location.x === plyr.currentPosition.cell.number.x &&
          droppedGear.location.y === plyr.currentPosition.cell.number.y
        ) {

          plyr.ai.instructions.push({
            keyword: 'pickup',
            count: 0,
            limit: 1,
          })

          this.players[plyr.number-1].ai.organizing.dropped.state = false;

          console.log('standing over dropped gear',plyr.ai.organizing.dropped.state);

        }
        else {

          if (plyr.items.weapons.length > 1) {
            console.log('switch to something else from inventory');
            plyr.currentWeapon = {
              name: plyr.items.weapons[0].name,
              type: plyr.items.weapons[0].type,
              effect: plyr.items.weapons[0].effect,
            }
          } else {
            console.log('retrieve dropped gear');

            plyr.ai.mission = 'retrieve';
            plyr.ai.retrieving.point = {
              x: droppedGear.location.x,
              y: droppedGear.location.y,
            }
            plyr.ai.retrieving.targetItem = {
              name: droppedGear.name,
              type: droppedGear.type,
              subType: droppedGear.subType,
              effect: droppedGear.effect,
            };
            plyr.ai.retrieving.safe = true;

            // let targetSafeData2 = this.scanTargetAreaThreat({
            //   player: plyr.number,
            //   point: {
            //     x: droppedGear.location.x,
            //     y: droppedGear.location.y,
            //   },
            //   range: 3,
            // })
            //
            // if (targetSafeData2.isSafe === true) {
            //
            //   plyr.ai.mission = 'retrieve';
            //   plyr.ai.retrieving.point = {
            //     x: droppedGear.location.x,
            //     y: droppedGear.location.y,
            //   }
            //   plyr.ai.retrieving.targetItem = {
            //     name: droppedGear.name,
            //     type: droppedGear.type,
            //     subType: droppedGear.subType,
            //     effect: droppedGear.effect,
            //   };
            //   plyr.ai.retrieving.safe = true;
            //
            // }
            // else {
            //   console.log('unsafe to retrieve. check inventory');
            //
            //   if (plyr.items.weapons.length > 1) {
            //     console.log('fallback to other weapon');
            //     plyr.currentWeapon = {
            //       name: plyr.items.weapons[1].name,
            //       type: plyr.items.weapons[1].type,
            //       effect: plyr.items.weapons[1].effect,
            //     }
            //
            //     plyr.ai.organizing.dropped.state = false;
            //   } else {
            //     console.log('nothing else in inventory. find other in the field');
            //     plyr.ai.upgradeWeapon = true
            //   }
            //
            // }

            if (!plyr.popups.find(x=>x.msg === 'missionRetrieve')) {
              plyr.popups.push(
                {
                  state: false,
                  count: 0,
                  limit: 25,
                  type: '',
                  position: '',
                  msg: 'missionRetrieve',
                  img: '',

                }
              )
            }

          }

        }

      }

      // plyr.ai.organizing.dropped.state = true

    }


    // PATHFIND ERROR/ PREVENT SUICIDE!
    if (plyr.ai.resetInstructions === true ) {
      console.log('pathfinding reset');
      if (!plyr.popups.find(x=>x.msg === 'thinking')) {
        plyr.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'thinking',
            img: '',

          }
        )
      }
      if (!plyr.popups.find(x=>x.msg === 'pathSwitch')) {
        plyr.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'pathSwitch',
            img: '',

          }
        )
      }
      // console.log('reset instructions','set',plyr.ai.targetSet,'acquired',plyr.ai.targetAcquired,'mission',plyr.ai.mission);
      plyr.ai.currentInstruction = 0;
      plyr.ai.instructions = [];
      plyr.ai.targetAcquired = false;
      plyr.ai.resetInstructions = false;

      if (plyr.ai.mission === 'retreat') {
        console.log('retreat pathfinding reset');
        plyr.ai.retreating.checkin = undefined
        plyr.ai.retreating.state = false
      }
      if (plyr.ai.mission === 'retrieve') {
        console.log('retrieve pathfinding reset');
        plyr.ai.retrieving.checkin = undefined
        plyr.ai.retrieving.state = false
      }
      if (plyr.ai.mission === 'patrol') {

        plyr.ai.patrolling.checkin = undefined
        plyr.ai.patrolling.state = false
      }
    }


    // SET TARGET!!
    // determine who is closer to me
    if (plyr.ai.targetSet !== true) {

      let targetAlive = false;
      let targetPlayer;

      targetPlayer = this.players[this.aiTarget-1];
      if (targetPlayer.dead.state !== true && targetPlayer.falling.state !== true && targetPlayer.respawn !== true) {
        targetAlive = true;
      } else {
        targetAlive = false;
      }


      if (targetAlive === true) {
        plyr.ai.targetPlayer = {
          number: targetPlayer.number,
          currentPosition: {
            x: targetPlayer.currentPosition.cell.number.x,
            y: targetPlayer.currentPosition.cell.number.y,
          },
          target: {
            number1: {
              x: targetPlayer.target.cell.number.x,
              y: targetPlayer.target.cell.number.y,
            },
            number2: {
              x: targetPlayer.target.cell2.number.x,
              y: targetPlayer.target.cell2.number.y,
            },
          },
          action: targetPlayer.action,
        };
        plyr.ai.targetSet = true
        // console.log('player',plyr.number,'setting target...player',targetPlayer.number,'my mission',plyr.ai.mission);
        // this.getTarget(plyr)
      }
      else {
        // console.log('no targets availible');
      }

    }


    // TARGET AQUISITION & RANGE FINDING!!
    let targetInRange = false;



    if (plyr.ai.targetSet === true) {
      for (const plyr2 of this.players) {
        if (plyr2.ai.state !== true) {

          if (plyr.currentWeapon.type === 'crossbow') {

            let range = plyr.ai.pathfindingRanges.crossbow+2;

            if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
              if (
                plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y + range &&
                plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y ||
                plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y - range &&
                plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y
              ) {

                let clearToShoot = this.aiBoltPathCheck(plyr)
                if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  plyr.ai.currentInstruction = 0;
                }
                if (clearToShoot !== true) {
                  console.log('in-range detection: crossbow target obstructed');
                }
                else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  plyr.ai.currentInstruction = 0;
                  // console.log('alternative target in range. Switching');

                  if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                    plyr.popups.push(
                      {
                        state: false,
                        count: 0,
                        limit: 25,
                        type: '',
                        position: '',
                        msg: 'alarmed',
                        img: '',

                      }
                    )
                  }

                  plyr.ai.targetPlayer = {
                    number: plyr2.number,
                    currentPosition: {
                      x: plyr2.currentPosition.cell.number.x,
                      y: plyr2.currentPosition.cell.number.y,
                    },
                    target: {
                      number1: {
                        x: plyr2.target.cell.number.x,
                        y: plyr2.target.cell.number.y,
                      },
                      number2: {
                        x: plyr2.target.cell2.number.x,
                        y: plyr2.target.cell2.number.y,
                      },
                    },
                    action: plyr2.action,
                  };
                }

              }
            }

            if (plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y) {
              if (
                 plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x + range &&
                 plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x ||
                 plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x - range &&
                 plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x
              ) {

                let clearToShoot = this.aiBoltPathCheck(plyr)
                if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  targetInRange = true;
                  // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  plyr.ai.currentInstruction = 0;
                }
                if (clearToShoot !== true) {
                  console.log('in-range detection: crossbow target obstructed');
                }
                else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    plyr.ai.currentInstruction = 0;
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }

              }

          }

          if (plyr.currentWeapon.type === 'spear') {
            let range = plyr.ai.pathfindingRanges.spear;
            // if (this.aiCarefulRange === true) {
            //   // console.log('careful range finding');
            //   range = 3;
            // }

            if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
              if (plyr.ai.safeRange === true) {
                if (
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 1) ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 1) ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 2) ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 2)
                ) {
                  let clearToShoot = this.aiBoltPathCheck(plyr)
                  if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  if (clearToShoot !== true) {
                    console.log('in-range detection: spear target obstructed');
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }
              else {
                if (
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range ||
                  plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range
                ) {
                  let clearToShoot = this.aiBoltPathCheck(plyr)
                  if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  if (clearToShoot !== true) {
                    console.log('in-range detection: spear target obstructed');
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }

            }

            if (plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y) {
              if (plyr.ai.safeRange === true) {
                if (
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2) ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2)
                ) {
                  let clearToShoot = this.aiBoltPathCheck(plyr)
                  if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  if (clearToShoot !== true) {
                    console.log('in-range detection: spear target obstructed');
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }
              else {
                if (
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + 1 ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - 1 ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + 2 ||
                  plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - 2
                  // plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                  // plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range
                ) {
                  let clearToShoot = this.aiBoltPathCheck(plyr)
                  if (clearToShoot === true && plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                  // if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  if (clearToShoot !== true) {
                    console.log('in-range detection: spear target obstructed');
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }

            }

          }

          if (plyr.currentWeapon.type === 'sword' || plyr.currentWeapon.type === '') {
            let range2 = 1;
            if (plyr.ai.safeRange === true) {
              // console.log('careful range finding');
              range2 = 2;
            }

            if (plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x) {

              if (plyr.ai.safeRange === true) {
                if (
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y + range2 ||
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y - range2 ||
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y + (range2 - 1) ||
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y - (range2 - 1)
                ) {
                  if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }
              else {
                if (
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y + range2 ||
                  plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y - range2
                ) {
                  if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }
            }

            if (plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y) {
              if (plyr.ai.safeRange === true) {
                if (
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x + range2 ||
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x - range2 ||
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x + (range2 - 1) ||
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x - (range2 - 1)
                ) {
                  if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              } else {
                if (
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x + range2 ||
                  plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x - range2
                ) {
                  if (plyr.ai.targetPlayer.number === plyr2.number && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    targetInRange = true;
                    // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                  }
                  else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage' && plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
                    // console.log('alternative target in range. Switching');

                    if (!plyr.popups.find(x=>x.msg === 'alarmed')) {
                      plyr.popups.push(
                        {
                          state: false,
                          count: 0,
                          limit: 25,
                          type: '',
                          position: '',
                          msg: 'alarmed',
                          img: '',

                        }
                      )
                    }

                    plyr.ai.targetPlayer = {
                      number: plyr2.number,
                      currentPosition: {
                        x: plyr2.currentPosition.cell.number.x,
                        y: plyr2.currentPosition.cell.number.y,
                      },
                      target: {
                        number1: {
                          x: plyr2.target.cell.number.x,
                          y: plyr2.target.cell.number.y,
                        },
                        number2: {
                          x: plyr2.target.cell2.number.x,
                          y: plyr2.target.cell2.number.y,
                        },
                      },
                      action: plyr2.action,
                    };
                  }
                }
              }
            }
          }

        }
      }
    }

    if (targetInRange === true) {
      // console.log('target in range. switch to engage',plyr.ai.targetSet);
      if (plyr.ai.mission === 'patrol') {
        plyr.ai.patrolling.checkin = undefined;
      }

      if (plyr.ai.mission === 'defend') {
        plyr.ai.defending.checkin = undefined;
      }

      plyr.ai.prevMission = plyr.ai.mission;
      if (plyr.ai.mission !== 'retrieve' && plyr.ai.mission !== 'retreat') {
        // console.log('player',plyr.number,'target in range. Engage!');

        plyr.ai.mission = 'engage';

        if (!plyr.popups.find(x=>x.msg === 'missionEngage')) {
          plyr.popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'missionEngage',
              img: '',

            }
          )
        }


      }

      if (plyr.ai.mission === 'retrieve' || plyr.ai.mission === 'retreat') {
        // console.log('xxx');
      }

      // plyr.ai.engaging.state = true;
    }

    if (plyr.ai.mission === 'engage' && targetInRange !== true) {
      // console.log('target out of range. reverting to primary mission',plyr.ai.primaryMission);

      plyr.ai.mission = plyr.ai.primaryMission;

      if (!plyr.popups.find(x=>x.msg === 'thinking')) {
        plyr.popups.push(
          {
            state: false,
            count: 0,
            limit: 25,
            type: '',
            position: '',
            msg: 'thinking',
            img: '',

          }
        )
      }

      // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
      //   plyr.popups.push(
      //     {
      //       state: false,
      //       count: 0,
      //       limit: 25,
      //       type: '',
      //       position: '',
      //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
      //       img: '',
      //
      //     }
      //   )
      // }

      this.aiResetRanges(plyr)
      if (plyr.ai.primaryMission === 'defend') {
        // console.log('defend',plyr.ai.defending.checkin);
        plyr.ai.patrolling.checkin = undefined;
        plyr.ai.defending.state = true;
      }

      if (plyr.ai.primaryMission === 'patrol') {
        // console.log('patrol',plyr.ai.patrolling.checkin);
        plyr.ai.defending.checkin = undefined;
        plyr.ai.patrolling.state = true;
      }
      // plyr.ai.engaging.state = false;

    }


    if (plyr.ai.targetAqcuiredReset === true) {
      plyr.ai.targetAcquired = false;
      plyr.ai.targetAqcuiredReset = false;
    }

    // if (plyr.ai.mission === 'retrieve' && plyr.ai.retrieving.state !== true) {
    if (plyr.ai.mission === 'retrieve') {
      // console.log('retrieve @  ai evaluate', plyr.ai.retrieving);


       let targetSafeData = this.scanTargetAreaThreat({
         player: plyr.number,
         point: {
           x: plyr.ai.retrieving.point.x,
           y: plyr.ai.retrieving.point.y,
         },
         range: 3,
       })

       plyr.ai.retrieving.safe = targetSafeData.isSafe;


       if (targetSafeData.isSafe !== true) {
         // console.log('target area is under threat');
         if (plyr.ai.mode === 'aggressive') {
           // console.log('threats',targetSafeData.threats);
           plyr.ai.mission = 'pursue';

           if (!plyr.popups.find(x=>x.msg === 'missionPursue')) {
             plyr.popups.push(
               {
                 state: false,
                 count: 0,
                 limit: 25,
                 type: '',
                 position: '',
                 msg: 'missionPursue',
                 img: '',

               }
             )
           }
           if (!plyr.popups.find(x=>x.msg === 'aggressiveMode')) {
             plyr.popups.push(
               {
                 state: false,
                 count: 0,
                 limit: 25,
                 type: '',
                 position: '',
                 msg: 'aggressiveMode',
                 img: '',

               }
             )
           }

           for (const threat of targetSafeData.threats) {
             console.log('threat',threat);
             if (threat.distVal === 0) {

               console.log('threats',targetSafeData.threats);

               plyr.ai.targetSet = true;
               plyr.ai.targetAquired = false;
               let threat2 = this.players[threat.player-1];
               plyr.ai.targetPlayer = {
                 number: 1,
                 currentPosition: {
                   x: threat2.currentPosition.cell.number.x,
                   y: threat2.currentPosition.cell.number.y,
                 },
                 target: {
                   number1: {
                     x: threat2.target.cell.x,
                     y: threat2.target.cell.y,
                   },
                   number2: {
                     x: threat2.target.cell2.x,
                     y: threat2.target.cell2.y,
                   },
                 },
                 action: threat.action,
               };
             }

           }

         }
         if (plyr.ai.mode === 'careful' && plyr.ai.retrieving.checkin === 'enroute') {
           console.log('was enroute, now retreating');

           if (!plyr.popups.find(x=>x.msg === 'passiveMode')) {
             plyr.popups.push(
               {
                 state: false,
                 count: 0,
                 limit: 25,
                 type: '',
                 position: '',
                 msg: 'passiveMode',
                 img: '',

               }
             )
           }

          plyr.ai.mission = 'retreat';

          if (!plyr.popups.find(x=>x.msg === 'missionRetreat')) {
            plyr.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'missionRetreat',
                img: '',

              }
            )
          }
         }

       }
       else {
         // console.log('target area clear. proceed w/ retrieval');
         plyr.ai.retrieving.safe = true;
       }

       if (plyr.ai.retrieving.checkin === 'complete') {

         plyr.ai.mission = plyr.ai.primaryMission;
         this.aiResetRanges(plyr)

         if (!plyr.popups.find(x=>x.msg === 'missionComplete')) {
           plyr.popups.push(
             {
               state: false,
               count: 0,
               limit: 25,
               type: '',
               position: '',
               msg: 'missionComplete',
               img: '',

             }
           )
         }

         // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
         //   plyr.popups.push(
         //     {
         //       state: false,
         //       count: 0,
         //       limit: 25,
         //       type: '',
         //       position: '',
         //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
         //       img: '',
         //
         //     }
         //   )
         // }

         plyr.ai.retrieving.checkin = undefined;
         plyr.ai.retrieving.safe = false;
         plyr.ai.targetAcquired = false;
         // console.log('retrieval complete. revert mission',plyr.ai.mission,plyr.ai.targetSet,plyr.ai.targetPlayer.currentPosition,plyr.ai.targetAcquired,plyr.ai.targetPlayer);

         let itemRetrieved;

         if (plyr.ai.retrieving.targetItem.type !== 'item') {
           if (plyr.ai.retrieving.targetItem.type === 'weapon') {
             if (plyr.currentWeapon.name === plyr.ai.retrieving.targetItem.name) {
               itemRetrieved = true
             }
             for (const item of plyr.items.weapons) {
               if (item.name === plyr.ai.retrieving.targetItem.name) {
                 itemRetrieved = true
                 plyr.currentWeapon =  {
                   name: plyr.ai.retrieving.targetItem.name,
                   type: plyr.ai.retrieving.targetItem.subType,
                   effect: plyr.ai.retrieving.targetItem.effect,
                 }
               }
             }
           }
           if (plyr.ai.retrieving.targetItem.type === 'armor') {
             if (plyr.currentArmor.name === plyr.ai.retrieving.targetItem.name) {
               itemRetrieved = true
             }
             for (const item of plyr.items.armor) {
               if (item.name === plyr.ai.retrieving.targetItem.name) {
                 itemRetrieved = true
                 plyr.currentArmor =  {
                   name: plyr.ai.retrieving.targetItem.name,
                   type: plyr.ai.retrieving.targetItem.subType,
                   effect: plyr.ai.retrieving.targetItem.effect,
                 }
               }
             }
           }
         }

         if (itemRetrieved === true) {
           plyr.ai.retrieving = {
             checkin: undefined,
             state: false,
             point: {x: undefined, y: undefined},
             targetItem: {
               name: '',
               type: '',
               subType: '',
               effect: '',
             },
             safe: false,
           };
         }

         if (plyr.ai.organizing.dropped.state === true) {
           plyr.ai.organizing.dropped.state = false;
         }
       }

       if (plyr.ai.retrieving.checkin === 'abort') {
         plyr.ai.retrieving = {
           checkin: undefined,
           state: false,
           point: {x: undefined, y: undefined},
           targetItem: {
             name: '',
             type: '',
             subType: '',
             effect: '',
           },
           safe: false,
         };
       }

    }

    if (plyr.ai.mission === 'retreat') {
      // console.log('retreating @ ai evaluate');

      if (!plyr.ai.retreating.checkin) {


        let isSafeDistance = false;

        let cell = {x: 0,y: 0}
        let checkCell = false;
        let safeTarget = false;
        while (
          checkCell === false &&
          safeTarget !== true &&
          isSafeDistance !== true
        ) {
          cell.x = this.rnJesus(0,this.gridWidth)
          cell.y = this.rnJesus(0,this.gridWidth)
          checkCell = this.checkCell(cell);
          safeTarget = this.scanTargetAreaThreat({
            player: plyr.number,
            point: {
              x: cell.x,
              y: cell.y,
            },
            range: 3,
          }).isSafe;
          isSafeDistance = this.safeDistanceRetreat(plyr,cell)
        }

        if (
          checkCell === true &&
          safeTarget === true &&
          isSafeDistance !== true
        ) {
          plyr.ai.retreating.point = cell;
          plyr.ai.retreating.safe = safeTarget;
          console.log('found a free, safe retreat location',cell);
        }

      }

      if (plyr.ai.retreating.checkin && plyr.ai.retreating.state !== true) {


        let targetSafeData = this.scanTargetAreaThreat({
          player: plyr.number,
          point: {
            x: plyr.ai.retreating.point.x,
            y: plyr.ai.retreating.point.y,
          },
          range: 3,
        })

        plyr.ai.retrieving.safe = targetSafeData.isSafe;


        if (targetSafeData.isSafe !== true) {
          console.log('retreat target area is under threat. Find another target');
          plyr.ai.retreating.checkin = undefined;
          plyr.ai.retreating.safe = false;
        }

        if (plyr.ai.retreating.checkin === 'complete') {
          plyr.ai.retreating.checkin = undefined;
          plyr.ai.retreating.safe = false;
          plyr.ai.mission = plyr.ai.primaryMission;
          this.aiResetRanges(plyr)

          if (!plyr.popups.find(x=>x.msg === 'missionComplete')) {
            plyr.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'missionComplete',
                img: '',

              }
            )
          }

          // if (!plyr.popups.find(x=>x.msg === 'mission'+plyr.ai.mission 1st char upper+'')) {
          //   plyr.popups.push(
          //     {
          //       state: false,
          //       count: 0,
          //       limit: 25,
          //       type: '',
          //       position: '',
          //       msg: 'mission'+plyr.ai.mission 1st char upper+'',
          //       img: '',
          //
          //     }
          //   )
          // }

          plyr.ai.targetSet = false
          plyr.ai.targetAcquired = false
        }

      }


      // plyr.ai.retreating.level pick a spot further away depending on levelData


    }


    // AI CAN'T ACT IF FLANKING OR MOVING!

    if (
      plyr.flanking.state !== true &&
      plyr.flanking.step !== 1 &&
      plyr.flanking.step !== 2 &&
      plyr.moving.state !== true &&
      // plyr.attacking.state !== true &&
      plyr.defending.state !== true &&
      plyr.success.deflected.state !== true &&
      plyr.action !== 'deflected' &&
      plyr.pushBack.state !== true &&
      plyr.dead.state !== true &&
      plyr.falling.state !== true
    ) {
      this.aiDecide(plyr)
    }


  }
  aiDecide = (aiPlayer) => {
    // console.log('aiDecide',aiPlayer.number);


    let getPath = false;

    let targetPlayer = this.players[aiPlayer.ai.targetPlayer.number-1];
    let prevTargetPos = aiPlayer.ai.targetPlayer.currentPosition;
    let currentTargetPos;
    if (aiPlayer.ai.targetSet === true) {
      currentTargetPos = targetPlayer.currentPosition.cell.number;
    }


    // CHECK FOR PURSUIT TARGET POSITION CHANGE!!
    if (aiPlayer.ai.mission === 'pursue' && aiPlayer.ai.targetSet === true) {
      // console.log('pursuing');

      if (prevTargetPos.x !== currentTargetPos.x || prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
        // console.log('pursuit target location changed! Updating path for player',aiPlayer.number);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        }
        getPath = true;
        aiPlayer.ai.targetAcquired = true;
        aiPlayer.ai.currentInstruction = 0;
      }
      if (aiPlayer.ai.targetSet === true && aiPlayer.ai.targetAcquired !== true) {
        getPath = true;
        aiPlayer.ai.targetAcquired = true;
      }
      else if (getPath !== true) {
        // console.log('target position unchanged! Skipping path update!');
        getPath = false;
      }

    }

    let patrolDest;
    if (aiPlayer.ai.mission === 'patrol') {
      // console.log('patrolling',aiPlayer.ai.patrolling.checkin);
      if (targetPlayer) {
        if (prevTargetPos.x !== currentTargetPos.x || prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
          // console.log('patrolling but target location changed! Dont update path. Just track target',aiPlayer.number);

          aiPlayer.ai.targetPlayer.currentPosition = {
            x: targetPlayer.currentPosition.cell.number.x,
            y: targetPlayer.currentPosition.cell.number.y,
          }
        }
      }


      if (!aiPlayer.ai.patrolling.checkin) {
        // if (aiPlayer.ai.instructions.length > 0) {
        //   console.log('bloody hell');
        //   aiPlayer.ai.instructions = []
        // }
        // console.log('start out to patrol location @',aiPlayer.ai.patrolling.area[0],aiPlayer.ai.instructions,aiPlayer.ai.currentInstruction,aiPlayer.ai.patrolling.area[0]);


        aiPlayer.ai.patrolling.checkin = 'enroute';

        if (!aiPlayer.popups.find(x=>x.msg === 'missionEnroute')) {
          aiPlayer.popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'missionEnroute',
              img: '',

            }
          )
        }

        patrolDest = aiPlayer.ai.patrolling.area[0]
        getPath = true;
      }
      if (aiPlayer.ai.patrolling.checkin === 'enroute') {

        if (aiPlayer.attacking.state === true) {
          aiPlayer.attacking.state = false;
        }

        if (
          aiPlayer.ai.patrolling.area[0].x === aiPlayer.currentPosition.cell.number.x &&
          aiPlayer.ai.patrolling.area[0].y === aiPlayer.currentPosition.cell.number.y
        ) {
          aiPlayer.ai.patrolling.checkin = 'arrived';
          // console.log('arrived @ patrol point');
        } else {
          // console.log('en route to patrol. do nothing',aiPlayer.ai.patrolling.area[0]);
        }
      }
      if (aiPlayer.ai.patrolling.checkin === 'arrived') {
        aiPlayer.ai.patrolling.checkin = 'checkedIn'
        aiPlayer.ai.currentInstruction = 0;
        aiPlayer.ai.instructions = [];
        patrolDest = aiPlayer.ai.patrolling.area[1]
        getPath = true;
        // console.log('checked in to patrol point. moving to 2nd point @ ',patrolDest);
      }


      if (aiPlayer.ai.patrolling.checkin === 'checkedIn' && aiPlayer.ai.patrolling.loopControl === false) {
        // console.log('currently patrolling');
        let currentPatrolPoint = aiPlayer.ai.patrolling.area.findIndex(elem => elem.x === aiPlayer.currentPosition.cell.number.x && elem.y === aiPlayer.currentPosition.cell.number.y)
        // console.log('currentPatrolPoint 1',currentPatrolPoint, aiPlayer.currentPosition.cell.number);
        if (currentPatrolPoint === 0) {
          patrolDest = aiPlayer.ai.patrolling.area[1];
          getPath = true;
          aiPlayer.ai.patrolling.loopControl = true;
        }
        if (currentPatrolPoint === 1) {
          patrolDest = aiPlayer.ai.patrolling.area[0];
          getPath = true;
          aiPlayer.ai.patrolling.loopControl = true;
        }

      }

    }

    if (aiPlayer.ai.mission === 'engage' && aiPlayer.attacking.state !== true) {
      // console.log('engaging');


      // CHECK FOR TARGET LOCATION CHNAGE!
      if (prevTargetPos.x !== currentTargetPos.x || prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
        // console.log('engage target location changed! Updating path for player',aiPlayer.number,targetPlayer.dead.state);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        }
        if (aiPlayer.ai.primaryMission === 'pursue') {
          aiPlayer.ai.mission = 'pursue';
          this.aiResetRanges(aiPlayer)

          if (!aiPlayer.popups.find(x=>x.msg === 'missionPursue')) {
            aiPlayer.popups.push(
              {
                state: false,
                count: 0,
                limit: 25,
                type: '',
                position: '',
                msg: 'missionPursue',
                img: '',

              }
            )
          }
        }

        aiPlayer.ai.targetAcquired = false;
      }


      let oppositeDir;
      let engageTargetAction;
      // FACE TARGET!
      if (targetPlayer.currentPosition.cell.number.x === aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y > aiPlayer.currentPosition.cell.number.y) {
        if (aiPlayer.direction !== 'south') {

          aiPlayer.direction = 'south';
          // oppositeDir = 'north';
        }
        oppositeDir = 'north';
      }
      if (targetPlayer.currentPosition.cell.number.x === aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y < aiPlayer.currentPosition.cell.number.y) {
        if (aiPlayer.direction !== 'north') {

          aiPlayer.direction = 'north';
          // oppositeDir = 'south';
        }
        oppositeDir = 'south';
      }
      if (targetPlayer.currentPosition.cell.number.x < aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y === aiPlayer.currentPosition.cell.number.y) {
        if (aiPlayer.direction !== 'west') {

          aiPlayer.direction = 'west';
          // oppositeDir = 'east';
        }
        oppositeDir = 'east';
      }
      if (targetPlayer.currentPosition.cell.number.x > aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y === aiPlayer.currentPosition.cell.number.y) {
        if (aiPlayer.direction !== 'east') {

          aiPlayer.direction = 'east';
          // oppositeDir = 'west';
        }
        oppositeDir = 'west';
      }


      this.getTarget(aiPlayer);
      // if (aiPlayer.ai.engaging.state === true) {
      // if (aiPlayer.ai.engaging.state !== true) {

        if (aiPlayer.currentWeapon.type === 'crossbow' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true) {
          let instructions3 = [];
          // ENGAGED TARGET IS OPEN TO ATTACK!
          if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');

            if (
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 2 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 2 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 2 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 2 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 1 ||
              aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 1 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 1 ||
              aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 1
            ) {
              console.log('plyr',aiPlayer.number,' engaging w/ crossbow but too close for comfort');
              aiPlayer.ai.retreating.state = false;
              aiPlayer.ai.retreating.checkin = undefined;
              aiPlayer.ai.mission = 'retreat';
              aiPlayer.ai.retreating.safe = false;

              if (!aiPlayer.popups.find(x=>x.msg === 'missionRetreat')) {
                aiPlayer.popups.push(
                  {
                    state: false,
                    count: 0,
                    limit: 25,
                    type: '',
                    position: '',
                    msg: 'missionRetreat',
                    img: '',

                  }
                )
              }
              // aiPlayer.ai.currentInstruction = 0;
            }
            else if (aiPlayer.items.ammo > 0) {


              instructions3.push(
                {
                  keyword: 'attack',
                  count: 0,
                  limit: 1,
                },
              )


            }
            if (aiPlayer.items.ammo === 0) {
              console.log('no ammo!!!');
            }

            engageTargetAction = 'open'
          }
          if (targetPlayer.defending.state === true || targetPlayer.defendDecay.count > targetPlayer.defendDecay.limit - 10) {


          }


          let deflecting = false;
          if (this.aiDeflectedCheck.includes(aiPlayer.number) === true) {
            deflecting = true;
          }
          if (deflecting === true) {
            aiPlayer.ai.instructions = [];
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.targetAction = ''
          }


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
            // console.log('target status has changed. switch up the approach');

            aiPlayer.ai.instructions = instructions3;
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.state = true;
            aiPlayer.ai.engaging.targetAction = engageTargetAction;
          }


        }
        if (aiPlayer.currentWeapon.type === 'spear' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true ) {
          let instructions2 = [];


          // ENGAGED TARGET IS OPEN TO ATTAVK!
          if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending')
            if (aiPlayer.ai.safeRange === true) {
              if (oppositeDir) {

                if (aiPlayer.target.free !== true) {
                  // console.log('target is too close! back it up');
                  instructions2.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                if (
                  aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
                  aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
                  aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
                  aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3
                ) {
                  instructions2.push(
                    {
                      keyword: 'move_'+aiPlayer.direction,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions2.push(
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'strafe_'+oppositeDir,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 15,
                  },
                )
              }

            }
            else {
              instructions2.push(
                {
                  keyword: 'attack',
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'short_wait',
                  count: 0,
                  limit: 1,
                },
              )
            }
            engageTargetAction = 'open';
          }


          // ENGAGED TARGET IS DEFENDING!
          if (targetPlayer.defendDecay.count > targetPlayer.defendDecay.limit - 10) {
            console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is defending',targetPlayer.defendDecay.count);
            if (aiPlayer.ai.safeRange === true) {
              if (oppositeDir) {

                if (aiPlayer.target.free !== true) {
                  // console.log('target is too close! back it up');
                  instructions2.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                if (
                  aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x - 3 ||
                  aiPlayer.currentPosition.cell.number.x === targetPlayer.currentPosition.cell.number.x + 3 ||
                  aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y - 3 ||
                  aiPlayer.currentPosition.cell.number.y === targetPlayer.currentPosition.cell.number.y + 3
                ) {
                  instructions2.push(
                    {
                      keyword: 'move_'+aiPlayer.direction,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions2.push(
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'strafe_'+oppositeDir,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 15,
                  },
                )
              }

            }
            else {
              instructions2.push(
                {
                  keyword: 'attack',
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'short_wait',
                  count: 0,
                  limit: 1,
                },
              )
            }
            engageTargetAction = 'defend';
          }


          // ENGAGED TARGET IS ATTACKING!
          if (targetPlayer.attacking.count > 0) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);

            // ATTACK IS PEAKING!
            if (targetPlayer.attacking.count < this.attackAnimRef.peak.spear && targetPlayer.attacking.count >= this.attackAnimRef.peak.spear - 4) {
              console.log('almost peak attack');
              let whatDo3 = this.rnJesus(1,2);

              // DEFEND!
              if (whatDo3 === 1) {
                console.log('ai defend');
                instructions2.push(
                  {
                    keyword: 'long_defend',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // DODGE!
              else {
                console.log('ai dodge');
                instructions2.push(
                  {
                    keyword: 'dodge',
                    count: 0,
                    limit: 1,
                  },
                )
              }

            }


            // ATTACK IS EARLY!
            if (targetPlayer.attacking.count <= 8) {
              console.log('early attack');
              let whatDo4 = this.rnJesus(1,4);
              // whatDo2 = 4

              // DEFEND!
              if (whatDo4 === 1) {
                console.log(' ai defend');
                instructions2.push(
                  {
                    keyword: 'long_defend',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // FLANK!
              if (whatDo4 === 2) {

                let flankDir3;
                let aiPosCell3 = this.gridInfo.find(elem => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y)

                switch(aiPlayer.direction) {
                  case 'north':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'east') {
                      flankDir3 = 'west';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'west') {
                      flankDir3 = 'east';
                    }
                    else {
                      flankDir3 = 'west';
                    }
                  break;
                  case 'south':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'east') {
                      flankDir3 = 'west';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'west') {
                      flankDir3 = 'east';
                    }
                    else {
                      flankDir3 = 'west';
                    }
                  break;
                  case 'east':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'north') {
                      flankDir3 = 'south';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'south') {
                      flankDir3 = 'north';
                    }
                    else {
                      flankDir3 = 'south';
                    }
                  break;
                  case 'west':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'north') {
                      flankDir3 = 'south';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'south') {
                      flankDir3 = 'north';
                    }
                    else {
                      flankDir3 = 'south';
                    }
                  break;
                }
                console.log('ai flank',flankDir3);

                instructions2.push(
                  {
                    keyword: 'flank_'+flankDir3,
                    count: 0,
                    limit: 5,
                  },
                )
              }

              // DODGE!
              if ( whatDo4 === 3) {
                console.log('ai dodge');
                instructions2.push(
                  {
                    keyword: 'dodge',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // STRAFE EVADE!
              if ( whatDo4 === 4) {
                console.log('ai strafe evade');
                let evadeDirection2;
                let cellsToConsider2 = [
                  {x: aiPlayer.currentPosition.cell.number.x+1 ,y: aiPlayer.currentPosition.cell.number.y},
                  {x: aiPlayer.currentPosition.cell.number.x-1 ,y: aiPlayer.currentPosition.cell.number.y},
                  {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y+1},
                  {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y-1},
                ]
                for (const cell2 of cellsToConsider2) {
                  let freeCell2 = true
                  let cellRef2 = this.gridInfo.find(elem=> elem.number.x === cell2.x && elem.number.y === cell2.y);
                  if (cellRef2) {
                    let terrainInfo4 = cellRef2.levelData.length-1;
                    if (
                      cellRef2.levelData.charAt(terrainInfo4) === 'j' ||
                      cellRef2.levelData.charAt(terrainInfo4) === 'h' ||
                      cellRef2.levelData.charAt(terrainInfo4) === 'i' ||
                      cellRef2.levelData.charAt(0) !== 'x' ||
                      cellRef2.void.state === true
                    ) {
                      freeCell2 = false;
                    }
                    for (const plyr6 of this.players) {
                      if (plyr6.currentPosition.cell.number.x === cellRef2.number.x && plyr6.currentPosition.cell.number.y === cellRef2.number.y) {
                        freeCell2 = false;
                      }
                    }
                  }
                  else {
                    freeCell2 = false
                  }
                  if (freeCell2 === true) {
                    if (cell2.x === aiPlayer.currentPosition.cell.number.x+1 && cell2.y === aiPlayer.currentPosition.cell.number.y) {
                      evadeDirection2 = 'east'
                    }
                    if (cell2.x === aiPlayer.currentPosition.cell.number.x-1 && cell2.y === aiPlayer.currentPosition.cell.number.y) {
                      evadeDirection2 = 'west'
                    }
                    if (cell2.x === aiPlayer.currentPosition.cell.number.x && cell2.y === aiPlayer.currentPosition.cell.number.y+1) {
                      evadeDirection2 = 'south'
                    }
                    if (cell2.x === aiPlayer.currentPosition.cell.number.x && cell2.y === aiPlayer.currentPosition.cell.number.y-1) {
                      evadeDirection2 = 'north'
                    }
                  }
                }

                instructions2.push(
                  {
                    keyword: 'strafe_'+evadeDirection2,
                    count: 0,
                    limit: 1,
                  },
                )
                aiPlayer.ai.targetAcquired = false;
              }

            }

            engageTargetAction = 'attack'
          }

          for (const inst of aiPlayer.ai.instructions) {
            if (inst.keyword === 'attack') {
              // console.log('ai '+aiPlayer.number+' decides to attack w/ spear');
            }
          }


          let deflecting = false;
          if (this.aiDeflectedCheck.includes(aiPlayer.number) === true) {
            deflecting = true;
          }
          if (deflecting === true) {
            aiPlayer.ai.instructions = [];
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.targetAction = ''
          }


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
            // console.log('target status has changed. switch up the approach');

            aiPlayer.ai.instructions = instructions2;
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.state = true;
            aiPlayer.ai.engaging.targetAction = engageTargetAction;

          }

          // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);

        }
        if (aiPlayer.currentWeapon.type === 'sword' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true ) {
          // console.log('ai decide sword engagement');

            let instructions1 = [];


            // ENGAGED TARGET IS OPEN TO ATTACK!
            if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
              // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
              if (aiPlayer.ai.safeRange === true) {
                if (oppositeDir) {
                  // console.log('safe sword range attack flow');

                  if (aiPlayer.target.free !== true) {
                    // console.log('target is too close! back it up');
                    instructions1.push(
                      {
                        keyword: 'strafe_'+oppositeDir,
                        count: 0,
                        limit: 1,
                      },
                    )
                  }
                  instructions1.push(
                    {
                      keyword: 'move_'+aiPlayer.direction,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'attack',
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'short_wait',
                      count: 0,
                      limit: 15,
                    },
                  )
                }
              }
              else {
                instructions1.push(
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 1,
                  },
                )
              }
              engageTargetAction = 'open';
            }


            // ENGAGED TARGET DEFENDING!
            if (targetPlayer.defending.state === true || targetPlayer.defendDecay.count > targetPlayer.defendDecay.limit - 10) {
              // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is defending',targetPlayer.defendDecay.count);

              if (aiPlayer.ai.safeRange === true) {
                if (oppositeDir) {
                  // console.log('safe range attack flow');

                  if (aiPlayer.target.free !== true) {
                    // console.log('target is too close! back it up');
                    instructions1.push(
                      {
                        keyword: 'strafe_'+oppositeDir,
                        count: 0,
                        limit: 1,
                      },
                    )
                  }
                  instructions1.push(
                    {
                      keyword: 'move_'+aiPlayer.direction,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'attack',
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                    {
                      keyword: 'short_wait',
                      count: 0,
                      limit: 15,
                    },
                  )
                }
              }
              else {
                instructions1.push(
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 1,
                  },
                )
              }
              engageTargetAction = 'defend';
            }


            // ENGAGED TARGET ATTACKING!
            if (targetPlayer.attacking.count > 0) {
               // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);


              // ATTACK IS PEAKING!
              if (targetPlayer.attacking.count < this.attackAnimRef.peak.sword && targetPlayer.attacking.count >= this.attackAnimRef.peak.sword - 4) {
                console.log('almost peak attack');
                let whatDo = this.rnJesus(1,2);
                whatDo = 1

                // DEFEND!
                if (whatDo === 1) {
                  console.log('ai defend');
                  instructions1.push(
                    {
                      keyword: 'long_defend',
                      count: 0,
                      limit: 1,
                    },
                  )
                }

                // DODGE!
                else {
                  console.log('ai dodge');
                  instructions1.push(
                    {
                      keyword: 'dodge',
                      count: 0,
                      limit: 1,
                    },
                  )
                }

              }


              // ATTACK IS EARLY!
              if (targetPlayer.attacking.count <= 6) {
                console.log('early attack');
                let whatDo2 = this.rnJesus(1,4);
                whatDo2 = 1

                // DEFEND!
                if (whatDo2 === 1) {
                  console.log(' ai defend');
                  instructions1.push(
                    {
                      keyword: 'long_defend',
                      count: 0,
                      limit: 1,
                    },
                  )
                }

                // FLANK!
                if (whatDo2 === 2) {

                  let flankDir2;
                  let aiPosCell2 = this.gridInfo.find(elem => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y)

                  switch(aiPlayer.direction) {
                    case 'north':
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'east') {
                        flankDir2 = 'west';
                      }
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'west') {
                        flankDir2 = 'east';
                      }
                      else {
                        flankDir2 = 'west';
                      }
                    break;
                    case 'south':
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'east') {
                        flankDir2 = 'west';
                      }
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'west') {
                        flankDir2 = 'east';
                      }
                      else {
                        flankDir2 = 'west';
                      }
                    break;
                    case 'east':
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'north') {
                        flankDir2 = 'south';
                      }
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'south') {
                        flankDir2 = 'north';
                      }
                      else {
                        flankDir2 = 'south';
                      }
                    break;
                    case 'west':
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'north') {
                        flankDir2 = 'south';
                      }
                      if (aiPosCell2.edge.state === true && aiPosCell2.edge.side === 'south') {
                        flankDir2 = 'north';
                      }
                      else {
                        flankDir2 = 'south';
                      }
                    break;
                  }
                  console.log('ai flank',flankDir2);

                  instructions1.push(
                    {
                      keyword: 'flank_'+flankDir2,
                      count: 0,
                      limit: 5,
                    },
                  )
                }

                // DODGE!
                if ( whatDo2 === 3) {
                  console.log('ai dodge');
                  instructions1.push(
                    {
                      keyword: 'dodge',
                      count: 0,
                      limit: 1,
                    },
                  )
                }

                // STRAFE EVADE!
                if ( whatDo2 === 4) {
                  console.log('ai strafe evade');
                  let evadeDirection;
                  let cellsToConsider = [
                    {x: aiPlayer.currentPosition.cell.number.x+1 ,y: aiPlayer.currentPosition.cell.number.y},
                    {x: aiPlayer.currentPosition.cell.number.x-1 ,y: aiPlayer.currentPosition.cell.number.y},
                    {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y+1},
                    {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y-1},
                  ]
                  for (const cell of cellsToConsider) {
                    let freeCell = true
                    let cellRef = this.gridInfo.find(elem=> elem.number.x === cell.x && elem.number.y === cell.y);
                    if (cellRef) {
                      let terrainInfo3 = cellRef.levelData.length-1;
                      if (
                        cellRef.levelData.charAt(terrainInfo3) === 'j' ||
                        cellRef.levelData.charAt(terrainInfo3) === 'h' ||
                        cellRef.levelData.charAt(terrainInfo3) === 'i' ||
                        cellRef.levelData.charAt(0) !== 'x' ||
                        cellRef.void.state === true
                      ) {
                        freeCell = false;
                      }
                      for (const plyr5 of this.players) {
                        if (plyr5.currentPosition.cell.number.x === cellRef.number.x && plyr5.currentPosition.cell.number.y === cellRef.number.y) {
                          freeCell = false;
                        }
                      }
                    }
                    else {
                      freeCell = false
                    }
                    if (freeCell === true) {
                      if (cell.x === aiPlayer.currentPosition.cell.number.x+1 && cell.y === aiPlayer.currentPosition.cell.number.y) {
                        evadeDirection = 'east'
                      }
                      if (cell.x === aiPlayer.currentPosition.cell.number.x-1 && cell.y === aiPlayer.currentPosition.cell.number.y) {
                        evadeDirection = 'west'
                      }
                      if (cell.x === aiPlayer.currentPosition.cell.number.x && cell.y === aiPlayer.currentPosition.cell.number.y+1) {
                        evadeDirection = 'south'
                      }
                      if (cell.x === aiPlayer.currentPosition.cell.number.x && cell.y === aiPlayer.currentPosition.cell.number.y-1) {
                        evadeDirection = 'north'
                      }
                    }
                  }

                  instructions1.push(
                    {
                      keyword: 'strafe_'+evadeDirection,
                      count: 0,
                      limit: 1,
                    },
                  )
                  aiPlayer.ai.targetAcquired = false;
                }

              }


              engageTargetAction = 'attack';
            }



            let deflecting = false;
            if (this.aiDeflectedCheck.includes(aiPlayer.number) === true) {
              deflecting = true;
            }
            if (deflecting === true) {
              aiPlayer.ai.instructions = [];
              aiPlayer.ai.currentInstruction = 0;
              aiPlayer.ai.engaging.targetAction = ''
            }


            if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true ) {
            // if (aiPlayer.ai.engaging.targetAction !== engageTargetAction ) {

              // console.log('target status has changed. switch up the approach');

              aiPlayer.ai.instructions = instructions1;
              aiPlayer.ai.currentInstruction = 0;
              aiPlayer.ai.engaging.state = true;
              aiPlayer.ai.engaging.targetAction = engageTargetAction;

            }

            // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);
        }
        if (aiPlayer.currentWeapon.type === '' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true && aiPlayer.ai.organizing.dropped.state !== true) {
          // console.log('unarmed engagement');

          let instructions4 = [];


          // ENGAGED TARGET IS OPEN TO ATTACK!
          if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
            if (aiPlayer.ai.safeRange === true) {
              if (oppositeDir) {
                // console.log('safe sword range attack flow');

                if (aiPlayer.target.free !== true) {
                  // console.log('target is too close! back it up');
                  instructions4.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions4.push(
                  {
                    keyword: 'move_'+aiPlayer.direction,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'strafe_'+oppositeDir,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 15,
                  },
                )
              }
            }
            else {
              instructions4.push(
                {
                  keyword: 'attack',
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'short_wait',
                  count: 0,
                  limit: 1,
                },
              )
            }

            engageTargetAction = 'open';
          }


          // ENGAGED TARGET DEFENDING!
          if (targetPlayer.defending.state === true || targetPlayer.defendDecay.count > targetPlayer.defendDecay.limit - 10) {
            console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is defending',targetPlayer.defendDecay.count);

            if (aiPlayer.ai.safeRange === true) {
              if (oppositeDir) {
                // console.log('safe range attack flow');

                if (aiPlayer.target.free !== true) {
                  // console.log('target is too close! back it up');
                  instructions4.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions4.push(
                  {
                    keyword: 'move_'+aiPlayer.direction,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'attack',
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'strafe_'+oppositeDir,
                    count: 0,
                    limit: 1,
                  },
                  {
                    keyword: 'short_wait',
                    count: 0,
                    limit: 15,
                  },
                )
              }
            }
            else {
              instructions4.push(
                {
                  keyword: 'attack',
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'short_wait',
                  count: 0,
                  limit: 1,
                },
              )
            }

            engageTargetAction = 'defend';
          }


          // ENGAGED TARGET ATTACKING!
          if (targetPlayer.attacking.count > 0) {
             // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,' is attacking',targetPlayer.attacking.count);


            // ATTACK IS PEAKING!
            if (targetPlayer.attacking.count < this.attackAnimRef.peak.sword && targetPlayer.attacking.count >= this.attackAnimRef.peak.sword - 4) {
              console.log('almost peak attack');
              let whatDo5 = this.rnJesus(1,2);

              // DEFEND!
              if (whatDo5 === 1) {
                console.log('ai defend');
                instructions4.push(
                  {
                    keyword: 'long_defend',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // DODGE!
              else {
                console.log('ai dodge');
                instructions4.push(
                  {
                    keyword: 'dodge',
                    count: 0,
                    limit: 1,
                  },
                )
              }

            }


            // ATTACK IS EARLY!
            if (targetPlayer.attacking.count <= 6) {
              console.log('early attack');
              let whatDo6 = this.rnJesus(1,4);
              // whatDo2 = 4

              // DEFEND!
              if (whatDo6 === 1) {
                console.log(' ai defend');
                instructions4.push(
                  {
                    keyword: 'long_defend',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // FLANK!
              if (whatDo6 === 2) {

                let flankDir3;
                let aiPosCell3 = this.gridInfo.find(elem => elem.number.x === aiPlayer.currentPosition.cell.number.x && elem.number.y === aiPlayer.currentPosition.cell.number.y)

                switch(aiPlayer.direction) {
                  case 'north':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'east') {
                      flankDir3 = 'west';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'west') {
                      flankDir3 = 'east';
                    }
                    else {
                      flankDir3 = 'west';
                    }
                  break;
                  case 'south':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'east') {
                      flankDir3 = 'west';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'west') {
                      flankDir3 = 'east';
                    }
                    else {
                      flankDir3 = 'west';
                    }
                  break;
                  case 'east':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'north') {
                      flankDir3 = 'south';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'south') {
                      flankDir3 = 'north';
                    }
                    else {
                      flankDir3 = 'south';
                    }
                  break;
                  case 'west':
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'north') {
                      flankDir3 = 'south';
                    }
                    if (aiPosCell3.edge.state === true && aiPosCell3.edge.side === 'south') {
                      flankDir3 = 'north';
                    }
                    else {
                      flankDir3 = 'south';
                    }
                  break;
                }
                console.log('ai flank',flankDir3);

                instructions4.push(
                  {
                    keyword: 'flank_'+flankDir3,
                    count: 0,
                    limit: 5,
                  },
                )
              }

              // DODGE!
              if ( whatDo6 === 3) {
                console.log('ai dodge');
                instructions4.push(
                  {
                    keyword: 'dodge',
                    count: 0,
                    limit: 1,
                  },
                )
              }

              // STRAFE EVADE!
              if ( whatDo6 === 4) {
                console.log('ai strafe evade');
                let evadeDirection3;
                let cellsToConsider3 = [
                  {x: aiPlayer.currentPosition.cell.number.x+1 ,y: aiPlayer.currentPosition.cell.number.y},
                  {x: aiPlayer.currentPosition.cell.number.x-1 ,y: aiPlayer.currentPosition.cell.number.y},
                  {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y+1},
                  {x: aiPlayer.currentPosition.cell.number.x ,y: aiPlayer.currentPosition.cell.number.y-1},
                ]
                for (const cell3 of cellsToConsider3) {
                  let freeCell3 = true
                  let cellRef3 = this.gridInfo.find(elem=> elem.number.x === cell3.x && elem.number.y === cell3.y);
                  if (cellRef3) {
                    let terrainInfo5 = cellRef3.levelData.length-1;
                    if (
                      cellRef3.levelData.charAt(terrainInfo5) === 'j' ||
                      cellRef3.levelData.charAt(terrainInfo5) === 'h' ||
                      cellRef3.levelData.charAt(terrainInfo5) === 'i' ||
                      cellRef3.levelData.charAt(0) !== 'x' ||
                      cellRef3.void.state === true
                    ) {
                      freeCell3 = false;
                    }
                    for (const plyr7 of this.players) {
                      if (plyr7.currentPosition.cell.number.x === cellRef3.number.x && plyr7.currentPosition.cell.number.y === cellRef3.number.y) {
                        freeCell3 = false;
                      }
                    }
                  }
                  else {
                    freeCell3 = false
                  }
                  if (freeCell3 === true) {
                    if (cell3.x === aiPlayer.currentPosition.cell.number.x+1 && cell3.y === aiPlayer.currentPosition.cell.number.y) {
                      evadeDirection3 = 'east'
                    }
                    if (cell3.x === aiPlayer.currentPosition.cell.number.x-1 && cell3.y === aiPlayer.currentPosition.cell.number.y) {
                      evadeDirection3 = 'west'
                    }
                    if (cell3.x === aiPlayer.currentPosition.cell.number.x && cell3.y === aiPlayer.currentPosition.cell.number.y+1) {
                      evadeDirection3 = 'south'
                    }
                    if (cell3.x === aiPlayer.currentPosition.cell.number.x && cell3.y === aiPlayer.currentPosition.cell.number.y-1) {
                      evadeDirection3 = 'north'
                    }
                  }
                }

                instructions4.push(
                  {
                    keyword: 'strafe_'+evadeDirection3,
                    count: 0,
                    limit: 1,
                  },
                )
                aiPlayer.ai.targetAcquired = false;
              }

            }

            engageTargetAction = 'attack';
          }


          let deflecting = false;
          if (this.aiDeflectedCheck.includes(aiPlayer.number) === true) {
            deflecting = true;
          }
          if (deflecting === true) {
            aiPlayer.ai.instructions = [];
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.targetAction = ''
          }


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
            // console.log('target status has changed. switch up the approach');

            aiPlayer.ai.instructions = instructions4;
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.state = true;
            aiPlayer.ai.engaging.targetAction = engageTargetAction;
          }

          // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);

        }


      // }


    }

    let defendDest;
    if (aiPlayer.ai.mission === 'defend') {
      // console.log('defending',aiPlayer.ai.defending);


      if (prevTargetPos.x !== currentTargetPos.x || prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
        // console.log('defending but target location changed! Dont update path. Just track target',aiPlayer.number);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        }
      }

      // SET OUT TO DEFEND POINT
      if (!aiPlayer.ai.defending.checkin) {
        // console.log('start out to defend location',aiPlayer.ai.defending.area[0]);
        aiPlayer.ai.defending.checkin = 'enroute';

        if (!aiPlayer.popups.find(x=>x.msg === 'missionEnroute')) {
          aiPlayer.popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'missionEnroute',
              img: '',

            }
          )
        }

        let cellsToConsider2 = [
          {x: aiPlayer.ai.defending.area[0].x+1 ,y: aiPlayer.ai.defending.area[0].y},
          {x: aiPlayer.ai.defending.area[0].x-1 ,y: aiPlayer.ai.defending.area[0].y},
          {x: aiPlayer.ai.defending.area[0].x ,y: aiPlayer.ai.defending.area[0].y+1},
          {x: aiPlayer.ai.defending.area[0].x ,y: aiPlayer.ai.defending.area[0].y-1},
        ]
        let freeCell2 = true
        let freeCellNo;
        let freeCells = [];
        for (const cell2 of cellsToConsider2) {
          // console.log('cell2a',cell2);
          freeCell2 = true
          let cellRef2 = this.gridInfo.find(elem=> elem.number.x === cell2.x && elem.number.y === cell2.y);
          if (cellRef2) {

            let terrainInfo4 = cellRef2.levelData.length-1;
            if (
              cellRef2.levelData.charAt(terrainInfo4) === 'j' ||
              cellRef2.levelData.charAt(terrainInfo4) === 'h' ||
              cellRef2.levelData.charAt(terrainInfo4) === 'i' ||
              cellRef2.levelData.charAt(0) !== 'x' ||
              cellRef2.void.state === true
            ) {
              freeCell2 = false;
            }
            for (const plyr6 of this.players) {
              if (plyr6.currentPosition.cell.number.x === cellRef2.number.x && plyr6.currentPosition.cell.number.y === cellRef2.number.y) {
                freeCell2 = false;
              }
            }
          }
          else {
            freeCell2 = false
          }
          if (freeCell2 === true) {
            freeCells.push(cell2)
            // console.log('freeCellNo',cell2);
          }
        }
        let whatCell = this.rnJesus(1,freeCells.length)


        defendDest = freeCells[whatCell-1]
        // console.log('defendDest',defendDest);
        if (aiPlayer.ai.defending.area.length > 1) {
          aiPlayer.ai.defending.area[1] = defendDest
        }
        if (aiPlayer.ai.defending.area.length === 1) {
          aiPlayer.ai.defending.area.push(defendDest)
        }

        getPath = true;

      }

      // EN ROUTE TO DEFEND POINT
      if (aiPlayer.ai.defending.checkin === 'enroute') {

        if (aiPlayer.attacking.state === true) {
          aiPlayer.attacking.state = false;
        }

        if (
          aiPlayer.ai.defending.area[1].x === aiPlayer.currentPosition.cell.number.x &&
          aiPlayer.ai.defending.area[1].y === aiPlayer.currentPosition.cell.number.y
        ) {
          aiPlayer.ai.defending.checkin = 'checkedIn';
          aiPlayer.ai.instructions = []
          aiPlayer.ai.currentInstruction = 0;
          // console.log('arrived @ defend point',aiPlayer.ai.instructions);
        } else {
          // console.log('en route to defend post. do nothing',aiPlayer.ai.defending.area[0]);
        }
      }

      // ARRIVED AT DEFEND POINT
      if (aiPlayer.ai.defending.checkin === 'checkedIn' && aiPlayer.ai.instructions.length === 0) {
        // console.log('defend post checkedIn');
        let instructions = [];
        switch(aiPlayer.direction) {
          case 'north':
            instructions = [
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_east',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_south',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_west',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_north',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
            ]
          break;
          case 'east':
            instructions = [
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_south',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_west',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_north',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_east',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
            ]
          break;
          case 'south':
            instructions = [
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_west',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_north',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_east',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_south',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
            ]
          break;
          case 'west':
            instructions = [
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_north',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_east',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_south',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'long_wait',count: 0,limit: 25,},
              {keyword: 'move_west',count: 0,limit: 1,},
              {keyword: 'long_wait',count: 0,limit: 25,},
            ]
          break;
        }
        aiPlayer.ai.instructions = instructions;
        aiPlayer.ai.currentInstruction = 0;
        // console.log('aiPlayer.ai.instructions',aiPlayer.ai.instructions);

      }


    }

    if (aiPlayer.ai.mission === 'retrieve') {

      // SET OUT
      if (aiPlayer.ai.retrieving.state !== true && aiPlayer.ai.retrieving.safe === true) {
        console.log('retrive mission start: target item ',aiPlayer.ai.retrieving.targetItem.name);
        aiPlayer.ai.retrieving.state = true;
        aiPlayer.ai.retrieving.checkin = 'enroute';
        getPath = true;

        if (!aiPlayer.popups.find(x=>x.msg === 'missionEnroute')) {
          aiPlayer.popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'missionEnroute',
              img: '',

            }
          )
        }
      }

      // EN ROUTE
      if (aiPlayer.ai.retrieving.state === true) {

        if (aiPlayer.ai.retrieving.checkin === 'enroute') {
          // console.log('en route to retrieve point',aiPlayer.ai.retrieving.point);

          let targetCell = this.gridInfo.find(elem => elem.number.x === aiPlayer.ai.retrieving.point.x && elem.number.y === aiPlayer.ai.retrieving.point.y);
          if (targetCell.item.name === '' || aiPlayer.ai.retrieving.targetItem.name !== targetCell.item.name) {
            console.log('item to retrieve is no longer there. abort');
            aiPlayer.ai.retrieving.checkin = 'abort';
          }

          if (
            aiPlayer.currentPosition.cell.number.x === aiPlayer.ai.retrieving.point.x &&
            aiPlayer.currentPosition.cell.number.y === aiPlayer.ai.retrieving.point.y
          ) {
            console.log('arrived at retrieval location');
            aiPlayer.ai.retrieving.checkin = 'complete';
            aiPlayer.ai.retrieving.state = false;
          }
        }

      }

    }

    if (aiPlayer.ai.mission === 'retreat') {

      // SET OUT
      if (aiPlayer.ai.retreating.state !== true && aiPlayer.ai.retreating.safe === true) {
        // console.log('start retreating to',aiPlayer.ai.retreating.point);
        aiPlayer.ai.retreating.state = true;
        aiPlayer.ai.retreating.checkin = 'enroute';
        getPath = true;

        if (!aiPlayer.popups.find(x=>x.msg === 'missionEnroute')) {
          aiPlayer.popups.push(
            {
              state: false,
              count: 0,
              limit: 25,
              type: '',
              position: '',
              msg: 'missionEnroute',
              img: '',

            }
          )
        }
      }

      // EN ROUTE
      if (aiPlayer.ai.retreating.state === true) {

        if (aiPlayer.ai.retreating.checkin === 'enroute') {
          // console.log('enroute to retreat point @',aiPlayer.ai.retreating.point,'instructions',aiPlayer.ai.instructions,aiPlayer.ai.currentInstruction);
          if (
            aiPlayer.currentPosition.cell.number.x === aiPlayer.ai.retreating.point.x &&
            aiPlayer.currentPosition.cell.number.y === aiPlayer.ai.retreating.point.y
          ) {
            console.log('arrived at retreat location');
            aiPlayer.ai.instructions.push({keyword: 'long_wait',count: 0,limit: 25,},)
            aiPlayer.ai.retreating.checkin = 'resting';

          }

        }

        if (aiPlayer.ai.retreating.checkin === 'resting') {
          if (aiPlayer.stamina.current >= aiPlayer.stamina.max) {
            console.log('plyr is well rested. retreat complete');
            aiPlayer.ai.retreating.checkin = 'complete';
            aiPlayer.ai.retreating.state = false;
          }

        }
      }

    }

    // if player cycling and path set not true add cycle gear to plyr instructions

    let cancelPath = false

    // SET PATH !!
    let pathSet = [];

    if (targetPlayer) {
      if (getPath === true && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
        // console.log('pathfinding...');
        this.updatePathArray();
        this.easyStar = new Easystar.js();

        let aiPos;
        let targetPos;

        if (aiPlayer.ai.mission === 'pursue') {
          aiPos = aiPlayer.currentPosition.cell.number;
          targetPos = this.players[aiPlayer.ai.targetPlayer.number-1].currentPosition.cell.number;
          console.log('pursuit target ',targetPos);

          if (aiPlayer.ai.safeRange === true) {


            let candidateTargets = [
              {x: 0, y: 0},
              {x: 0, y: 0},
              {x: 0, y: 0},
              {x: 0, y: 0},
            ]

            if (aiPlayer.currentWeapon.type === "crossbow") {
               // candidateTargets = [
               //   {x: targetPos.x-6, y: targetPos.y},
               //   {x: targetPos.x+6, y: targetPos.y},
               //   {x: targetPos.x, y: targetPos.y+6},
               //   {x: targetPos.x, y: targetPos.y-6},
               // ]
               let range = aiPlayer.ai.pathfindingRanges.crossbow
               candidateTargets = [
                 {x: targetPos.x-range, y: targetPos.y},
                 {x: targetPos.x+range, y: targetPos.y},
                 {x: targetPos.x, y: targetPos.y+range},
                 {x: targetPos.x, y: targetPos.y-range},
               ]

               // console.log('candidateTargets',candidateTargets);

               let freeSpaces = [];

               for (const rangeElem of candidateTargets)  {
                 let indx = candidateTargets.findIndex(rng => rng.x === rangeElem.x && rng.y === rangeElem.y)

                 let pursuitTargetRef = this.gridInfo.find(elem => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y)

                 if (!pursuitTargetRef) {
                  // console.log('range element is  out of bounds',rangeElem,'indx',indx);
                 } else {

                   let rangeElemCells2 = [];

                   // DON'T fire from obstructed position
                   // this.cellsToHighlight.push(rangeElem)


                   let dirToFire;
                   let diff = 0;
                   if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
                    dirToFire = 'north';
                    diff = rangeElem.y - targetPos.y;
                    for (var i = 0; i < diff; i++) {
                      rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y - i})
                      // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
                    }
                   }
                   if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
                    dirToFire = 'west';
                    diff = rangeElem.x - targetPos.x;
                    for (var i = 0; i < diff; i++) {
                      rangeElemCells2.push({x:rangeElem.x - i, y: rangeElem.y})
                      // this.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
                    }
                   }
                   if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
                    dirToFire = 'south';
                    diff = targetPos.y - rangeElem.y;
                    for (var i = 0; i < diff; i++) {
                      rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y + i})
                      // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
                    }
                   }
                   if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
                    dirToFire = 'east';
                    diff = targetPos.x - rangeElem.x;
                    for (var i = 0; i < diff; i++) {
                      rangeElemCells2.push({x:rangeElem.x + i, y: rangeElem.y})
                      // this.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
                    }
                   }
                   else {
                     // console.log('exception! rangeElem,targetPos',rangeElem,targetPos);
                   }


                   // let rangeElemCells = [];
                   // switch(indx) {
                   //   case 0:
                   //     rangeElemCells = [
                   //       // {x:rangeElem - 5, y: rangeElem.y },
                   //       {x:rangeElem.x - 4, y: rangeElem.y },
                   //       {x:rangeElem.x - 3, y: rangeElem.y },
                   //       {x:rangeElem.x - 2, y: rangeElem.y },
                   //       {x:rangeElem.x - 1, y: rangeElem.y },
                   //     ]
                   //   break;
                   //   case 1:
                   //     rangeElemCells = [
                   //       // {x:rangeElem + 5, y: rangeElem.y },
                   //       {x:rangeElem.x + 4, y: rangeElem.y },
                   //       {x:rangeElem.x + 3, y: rangeElem.y },
                   //       {x:rangeElem.x + 2, y: rangeElem.y },
                   //       {x:rangeElem.x + 1, y: rangeElem.y },
                   //     ]
                   //   break;
                   //   case 2:
                   //     rangeElemCells = [
                   //       // {x:rangeElem, y: rangeElem.y + 5},
                   //       {x:rangeElem.x, y: rangeElem.y + 4},
                   //       {x:rangeElem.x, y: rangeElem.y + 3},
                   //       {x:rangeElem.x, y: rangeElem.y + 2},
                   //       {x:rangeElem.x, y: rangeElem.y + 1},
                   //     ]
                   //   break;
                   //   case 3:
                   //     rangeElemCells = [
                   //       // {x:rangeElem, y: rangeElem.y - 5},
                   //       {x:rangeElem.x, y: rangeElem.y - 4},
                   //       {x:rangeElem.x, y: rangeElem.y - 3},
                   //       {x:rangeElem.x, y: rangeElem.y - 2},
                   //       {x:rangeElem.x, y: rangeElem.y - 1},
                   //     ]
                   //   break;
                   //   // case 4:
                   //   //   rangeElemCells = [
                   //   //     {x:rangeElem, y: rangeElem.y - 5},
                   //   //     {x:rangeElem, y: rangeElem.y - 4},
                   //   //     {x:rangeElem, y: rangeElem.y - 3},
                   //   //     {x:rangeElem, y: rangeElem.y - 2},
                   //   //     {x:rangeElem, y: rangeElem.y - 1},
                   //   //   ]
                   //   // break;
                   // }

                   // IS FIRE POSITION FREE?
                   let rngElCellFree = true;
                   let cellRef3 = this.gridInfo.find(elema => elema.number.x === rangeElem.x && elema.number.y === rangeElem.y)
                   if (cellRef3) {
                     if (
                       cellRef3.levelData.charAt(0) ===  'z' ||
                       cellRef3.levelData.charAt(0) ===  'y' ||
                       cellRef3.terrain.type ===  'deep' ||
                       cellRef3.terrain.type ===  'hazard'
                     ) {
                       rngElCellFree = false;
                     } else {

                     }
                   } else if (!cellRef3) {
                     rngElCellFree = false;
                   }


                   let clearToShoot = false;
                   // IS SIGHT OBSTRUCTED?
                   if (rngElCellFree === true) {


                     let obstructions = [];
                     for (const cellx of rangeElemCells2) {

                       let cellRef4 = this.gridInfo.find(elemb => elemb.number.x === cellx.x && elemb.number.y === cellx.y)

                       if (
                         cellRef4.levelData.charAt(0) ===  'y' ||
                         cellRef4.levelData.charAt(0) ===  'z'
                       ) {
                         // clearToShoot = false;
                         obstructions.push(cellx)
                       }
                       if (
                         cellRef4.levelData.charAt(0) !==  'y' &&
                         cellRef4.levelData.charAt(0) !==  'z'
                       ) {
                         // clearToShoot = true;
                         // obstructions.push(cellx)
                       }
                     }

                     // if (clearToShoot === true) {
                     if (obstructions.length === 0) {

                       freeSpaces.push(rangeElem)
                       // this.cellsToHighlight = rangeElemCells2;
                       // console.log('rangeElemCells2',rangeElemCells2);
                       // console.log('found path to safe bow range',targetPos);
                     } else {
                       // console.log('target obstructed @',obstructions);
                     }
                   } else {
                     console.log('your safe path is blocked');
                   }

                 }
               }

               if (freeSpaces[0]) {
                 // console.log('freeSpaces',freeSpaces);
                 targetPos = freeSpaces[0];
                 // console.log('found path to safe bow range',targetPos);
               } else {
                 console.log('No free or unobstructed firing positions at this distance for crossbow');
                 if (aiPlayer.ai.pathfindingRanges.crossbow > 1) {
                   aiPlayer.ai.pathfindingRanges.crossbow--
                 }
                 aiPlayer.ai.safeRange = false;
                 aiPlayer.ai.targetAcquired = false;


                 let fieldItemScan = []
                 for (const cell of this.gridInfo) {
                   if (cell.item.name !== '') {
                     fieldItemScan.push({
                       name: cell.item.name,
                       type: cell.item.type,
                       subType: cell.item.subType,
                       effect: cell.item.effect,
                       location: {x: cell.number.x, y: cell.number.y}
                     })
                   }
                 }
                 if (
                   fieldItemScan.find(x=>x.type === 'spear') ||
                   fieldItemScan.find(x=>x.type === 'sword')
                 ) {
                   aiPlayer.ai.upgradeWeapon = true;
                   aiPlayer.ai.organizing.weaponPriorityIndex = 1;
                 } else {
                   aiPlayer.currentWeapon = {
                     name: '',
                     type: '',
                     effect: ''
                   }
                   console.log('no crossbow fire position or other gear in the field. switching to unarmed');
                 }

               }

            }

            if (aiPlayer.currentWeapon.type === "spear") {

              let range = aiPlayer.ai.pathfindingRanges.spear
              candidateTargets = [
                {x: targetPos.x-range, y: targetPos.y},
                {x: targetPos.x+range, y: targetPos.y},
                {x: targetPos.x, y: targetPos.y+range},
                {x: targetPos.x, y: targetPos.y-range},
              ]

              // for (const rangeElem of candidateTargets)  {
              //   let indx = candidateTargets.findIndex(rng => rng.x === rangeElem.x && rng.y === rangeElem.y)
              //
              //   let pursuitTargetRef = this.gridInfo.find(elem => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y)
              //
              //   if (!pursuitTargetRef) {
              //    // console.log('range element is out of bounds');
              //   } else {
              //
              //
              //     let rangeElemCells;
              //
              //     switch(indx) {
              //       case 0:
              //         rangeElemCells = [
              //           {x:rangeElem - 2, y: rangeElem.y },
              //           {x:rangeElem - 1, y: rangeElem.y },
              //         ]
              //       break;
              //       case 1:
              //         rangeElemCells = [
              //           {x:rangeElem + 2, y: rangeElem.y },
              //           {x:rangeElem + 1, y: rangeElem.y },
              //         ]
              //       break;
              //       case 2:
              //         rangeElemCells = [
              //           {x:rangeElem, y: rangeElem.y + 2},
              //           {x:rangeElem, y: rangeElem.y + 1},
              //         ]
              //       break;
              //       case 3:
              //         rangeElemCells = [
              //           {x:rangeElem, y: rangeElem.y - 2},
              //           {x:rangeElem, y: rangeElem.y - 1},
              //         ]
              //       break;
              //     }
              //
              //     let rngElCellFree = true;
              //     for (const rngElCell of rangeElemCells) {
              //
              //       for (const plyr of this.players) {
              //         if (plyr.currentPosition.cell.number.x === rngElCell.x && plyr.currentPosition.cell.number.y === rngElCell.y) {
              //           rngElCellFree = false;
              //         }
              //         let cellRef3 = this.gridInfo.find(elema => elema.number.x === rngElCell.x && elema.number.y === rngElCell.y)
              //         if (cellRef3) {
              //           if (
              //             cellRef3.levelData.charAt(0) ===  'z' ||
              //             cellRef3.levelData.charAt(0) ===  'y' ||
              //             cellRef3.terrain.type ===  'deep' ||
              //             cellRef3.terrain.type ===  'hazard'
              //           ) {
              //             rngElCellFree = false;
              //           }
              //         }
              //
              //       }
              //     }
              //     if (rngElCellFree === true) {
              //       targetPos = rangeElem;
              //       // console.log('found path to safe spear range');
              //     } else {
              //       console.log('your safe path is blocked');
              //     }
              //   }
              // }

              let freeSpaces = [];

              for (const rangeElem of candidateTargets)  {
                // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y})
                let indx = candidateTargets.findIndex(rng => rng.x === rangeElem.x && rng.y === rangeElem.y)

                let pursuitTargetRef = this.gridInfo.find(elem => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y)

                if (!pursuitTargetRef) {
                 // console.log('range element is  out of bounds',rangeElem,'indx',indx);
                } else {

                  let rangeElemCells2 = [];


                  let dirToFire;
                  let diff = 0;
                  if (rangeElem.x === targetPos.x && rangeElem.y > targetPos.y) {
                   dirToFire = 'north';
                   diff = rangeElem.y - targetPos.y;
                   for (var i = 0; i < diff; i++) {
                     rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y - i})
                     // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y - i})
                   }
                  }
                  if (rangeElem.x > targetPos.x && rangeElem.y === targetPos.y) {
                   dirToFire = 'west';
                   diff = rangeElem.x - targetPos.x;
                   for (var i = 0; i < diff; i++) {
                     rangeElemCells2.push({x:rangeElem.x - i, y: rangeElem.y})
                     // this.cellsToHighlight.push({x:rangeElem.x - i, y: rangeElem.y})
                   }
                  }
                  if (rangeElem.x === targetPos.x && rangeElem.y < targetPos.y) {
                   dirToFire = 'south';
                   diff = targetPos.y - rangeElem.y;
                   for (var i = 0; i < diff; i++) {
                     rangeElemCells2.push({x:rangeElem.x, y: rangeElem.y + i})
                     // this.cellsToHighlight.push({x:rangeElem.x, y: rangeElem.y + i})
                   }
                  }
                  if (rangeElem.x < targetPos.x && rangeElem.y === targetPos.y) {
                   dirToFire = 'east';
                   diff = targetPos.x - rangeElem.x;
                   for (var i = 0; i < diff; i++) {
                     rangeElemCells2.push({x:rangeElem.x + i, y: rangeElem.y})
                     // this.cellsToHighlight.push({x:rangeElem.x + i, y: rangeElem.y})
                   }
                  }
                  else {
                    // console.log('exception! rangeElem,targetPos',rangeElem,targetPos);
                  }

                  // IS attack POSITION FREE?
                  let rngElCellFree = true;
                  let cellRef3 = this.gridInfo.find(elema => elema.number.x === rangeElem.x && elema.number.y === rangeElem.y)
                  if (cellRef3) {
                    if (
                      cellRef3.levelData.charAt(0) ===  'z' ||
                      cellRef3.levelData.charAt(0) ===  'y' ||
                      cellRef3.terrain.type ===  'deep' ||
                      cellRef3.terrain.type ===  'hazard'
                    ) {
                      rngElCellFree = false;
                    } else {

                    }
                  } else if (!cellRef3) {
                    rngElCellFree = false;
                  }


                  let clearToShoot = false;
                  // IS SIGHT OBSTRUCTED?
                  if (rngElCellFree === true) {


                    let obstructions = [];
                    for (const cellx of rangeElemCells2) {

                      let cellRef4 = this.gridInfo.find(elemb => elemb.number.x === cellx.x && elemb.number.y === cellx.y)

                      if (
                        cellRef4.levelData.charAt(0) ===  'y' ||
                        cellRef4.levelData.charAt(0) ===  'z'
                      ) {
                        // clearToShoot = false;
                        obstructions.push(cellx)
                      }
                      if (
                        cellRef4.levelData.charAt(0) !==  'y' &&
                        cellRef4.levelData.charAt(0) !==  'z'
                      ) {
                        // clearToShoot = true;
                        // obstructions.push(cellx)
                      }
                    }

                    // if (clearToShoot === true) {
                    if (obstructions.length === 0) {

                      freeSpaces.push(rangeElem)
                      // this.cellsToHighlight = rangeElemCells2;
                      // console.log('rangeElemCells2',rangeElemCells2);
                      // console.log('found path to safe bow range',targetPos);
                    } else {
                      console.log('target obstructed @',obstructions);
                    }
                  } else {
                    console.log('your safe path is blocked');
                  }

                }
              }

              if (freeSpaces[0]) {
                // console.log('freeSpaces',freeSpaces);
                targetPos = freeSpaces[0];
                // console.log('found path to safe spear range',targetPos);
              } else {
                console.log('No free or unobstructed firing positions at this distance for spear');
                if (aiPlayer.ai.pathfindingRanges.spear > 1) {
                  aiPlayer.ai.pathfindingRanges.spear--
                }
                aiPlayer.ai.safeRange = false;
                aiPlayer.ai.targetAcquired = false;
              }

            }
            if (aiPlayer.currentWeapon.type === "sword" || aiPlayer.currentWeapon.name === "") {
              candidateTargets = [
                {x: targetPos.x-2, y: targetPos.y},
                {x: targetPos.x+2, y: targetPos.y},
                {x: targetPos.x, y: targetPos.y+2},
                {x: targetPos.x, y: targetPos.y-2},
              ]

              for (const rangeElem of candidateTargets)  {
                let indx = candidateTargets.findIndex(rng => rng.x === rangeElem.x && rng.y === rangeElem.y)

                let pursuitTargetRef = this.gridInfo.find(elem => elem.number.x === rangeElem.x && elem.number.y === rangeElem.y)

                if (!pursuitTargetRef) {
                 // console.log('range element is out of bounds');
                } else {
                  let rangeElemCells;

                  switch(indx) {
                    case 0:
                      rangeElemCells = [
                        {x:rangeElem - 1, y: rangeElem.y },
                      ]
                    break;
                    case 1:
                      rangeElemCells = [
                        {x:rangeElem + 1, y: rangeElem.y },
                      ]
                    break;
                    case 2:
                      rangeElemCells = [
                        {x:rangeElem, y: rangeElem.y + 1},
                      ]
                    break;
                    case 3:
                      rangeElemCells = [
                        {x:rangeElem, y: rangeElem.y - 1},
                      ]
                    break;
                  }

                  let rngElCellFree = true;
                  for (const rngElCell of rangeElemCells) {

                    for (const plyr of this.players) {
                      if (plyr.currentPosition.cell.number.x === rngElCell.x && plyr.currentPosition.cell.number.y === rngElCell.y) {
                        rngElCellFree = false;
                      }
                      let cellRef3 = this.gridInfo.find(elema => elema.number.x === rngElCell.x && elema.number.y === rngElCell.y)
                      if (cellRef3) {
                        if (
                          cellRef3.levelData.charAt(0) ===  'z' ||
                          cellRef3.levelData.charAt(0) ===  'y' ||
                          cellRef3.terrain.type ===  'deep' ||
                          cellRef3.terrain.type ===  'hazard'
                        ) {
                          rngElCellFree = false;
                        }
                      }

                    }
                  }
                  if (rngElCellFree === true) {
                    targetPos = rangeElem;
                    // console.log('found path to safe sword range',targetPos);
                  } else {
                    console.log('your safe path is blocked');
                  }
                }
              }

            }

          }

          // this.pathArray[targetPos.x][targetPos.y] = 0;
          // this.pathArray[aiPos.x][aiPos.y] = 0;
        }
        if (aiPlayer.ai.mission === 'patrol') {

          aiPos = aiPlayer.currentPosition.cell.number;
          targetPos = patrolDest;

          // this.pathArray[targetPos.x][targetPos.y] = 0;
        }
        if (aiPlayer.ai.mission === 'engage') {

        }
        if (aiPlayer.ai.mission === 'defend') {

          aiPos = aiPlayer.currentPosition.cell.number;
          targetPos = defendDest;

          // console.log('targetPos',targetPos);
          // this.pathArray[targetPos.x][targetPos.y] = 0;
        }
        if (aiPlayer.ai.mission === 'retreat') {
          // console.log('get retreat path',aiPlayer.ai.retreating.point);
          aiPos = aiPlayer.currentPosition.cell.number;
          targetPos = {
            x: aiPlayer.ai.retreating.point.x,
            y: aiPlayer.ai.retreating.point.y,
          }
        }
        if (aiPlayer.ai.mission === 'retrieve') {
          // console.log('get retrive path',aiPlayer.ai.retrieving.point);
          aiPos = aiPlayer.currentPosition.cell.number;
          targetPos = {
            x: aiPlayer.ai.retrieving.point.x,
            y: aiPlayer.ai.retrieving.point.y,
          }
        }


        this.easyStar.setGrid(this.pathArray);
        this.easyStar.setAcceptableTiles([0]);


        // PLAYER CELLS TO AVOID
        for (const plyr of this.players) {
          // console.log('building pathfind obstacles checking plyr',plyr.number);
          if (plyr.dead.state !== true && plyr.falling.state !== true && plyr.respawn !== true && plyr.number !== aiPlayer.number && plyr.number !== targetPlayer.number) {
            // console.log('avoid plyr',plyr.number,'@',plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
            this.easyStar.avoidAdditionalPoint(plyr.currentPosition.cell.number.x, plyr.currentPosition.cell.number.y);
          }
        }

        if (aiPlayer.ai.mission === 'retreat' || aiPlayer.ai.mission === 'retrive') {

          for (const plyr of this.players) {
            if (plyr.ai.state !== true) {
              console.log(aiPlayer.ai.mission,' careful pathfinding. enemy is plyr #',plyr.number);
              let rng;
              let span;

              if (plyr.currentWeapon.type === "sword" || plyr.currentWeapon.name === "") {
                rng = 1;
              }
              else {
                rng = 2;
              }
              span = (rng*2)+1;
              let cornerCell = undefined;
              let whichCorner;

              while (!cornerCell) {

                let whichCorner2 = this.rnJesus(1,4)

                switch(whichCorner2) {
                  case 1:
                    cornerCell = this.gridInfo.find(elem=> elem.number.x === plyr.currentPosition.cell.number.x+rng && elem.number.y === plyr.currentPosition.cell.number.y+rng)
                    whichCorner = 'southEast';
                  break;
                  case 2:
                    cornerCell = this.gridInfo.find(elem=> elem.number.x === plyr.currentPosition.cell.number.x-rng && elem.number.y === plyr.currentPosition.cell.number.y-rng)
                    whichCorner = 'northWest';
                  break;
                  case 3:
                    cornerCell = this.gridInfo.find(elem=> elem.number.x === plyr.currentPosition.cell.number.x-rng && elem.number.y === plyr.currentPosition.cell.number.y+rng)
                    whichCorner = 'southWest';
                  break;
                  case 4:
                    cornerCell = this.gridInfo.find(elem=> elem.number.x === plyr.currentPosition.cell.number.x+rng && elem.number.y === plyr.currentPosition.cell.number.y-rng)
                    whichCorner = 'northEast';
                  break;
                }

              }


              if (cornerCell) {
                // console.log('cornerCell',cornerCell.number);

                for (var i = 0; i < span; i++) {

                  let startCell;
                  switch(whichCorner) {
                    case 'southEast':
                      startCell = {
                        x: cornerCell.number.x-i,
                        y: cornerCell.number.y
                      }
                    break;
                    case 'northEast':
                      startCell = {
                        x: cornerCell.number.x-i,
                        y: cornerCell.number.y
                      }
                    break;
                    case 'southWest':
                      startCell = {
                        x: cornerCell.number.x+i,
                        y: cornerCell.number.y
                      }
                    break;
                    case 'northWest':
                      startCell = {
                        x: cornerCell.number.x+i,
                        y: cornerCell.number.y
                      }
                    break;
                  }
                  // console.log('startCell',startCell,i);

                  for (var j = 0; j < span; j++) {
                    let cell;

                    switch(whichCorner) {
                      case 'southEast':
                        cell = {
                          x: startCell.x,
                          y: startCell.y-j,
                        }
                      break;
                      case 'northEast':
                        cell = {
                          x: startCell.x,
                          y: startCell.y+j,
                        }
                      break;
                      case 'southWest':
                        cell = {
                          x: startCell.x,
                          y: startCell.y-j,
                        }
                      break;
                      case 'northWest':
                        cell = {
                          x: startCell.x,
                          y: startCell.y+j,
                        }
                      break;
                    }
                    // console.log('cell',cell,j);


                    if (
                      cell.x <= this.gridWidth && cell.x >= 0 &&
                      cell.y <= this.gridWidth && cell.y >= 0
                    ) {
                      // console.log(aiPlayer.ai.mission,'avoid cell ',cell);
                      this.easyStar.avoidAdditionalPoint(cell.x, cell.y);
                    }

                  }
                }

              }

            }
          }



         // AVOID DEBUFFS!!
         if (aiPlayer.ai.mission === 'retrive') {


           let fieldItemScan = []
           for (const cell of this.gridInfo) {
             if (cell.item.name !== '') {
               fieldItemScan.push({
                 name: cell.item.name,
                 type: cell.item.type,
                 subType: cell.item.subType,
                 effect: cell.item.effect,
                 location: {x: cell.number.x, y: cell.number.y}
               })
             }
           }


           let nerfItemPositions = [];
           for (const item of fieldItemScan) {

             switch(item.name) {
               case 'moveSpeedDown':
                 nerfItemPositions.push(item)
               break;
               case 'hpDown':
                 nerfItemPositions.push(item)
               break;
               case 'focusDown':
                 nerfItemPositions.push(item)
               break;
               case 'strengthDown':
                 nerfItemPositions.push(item)
               break;
             }

           };

           for (const nerf of nerfItemPositions) {

             this.easyStar.avoidAdditionalPoint(nerf.location.x, nerf.location.y);

           }

         }

        }



        // TERRAIN & OBSTACLE CELLS TO AVOID
        for (const cell2 of this.gridInfo) {
          let terrainInfo3 = cell2.levelData.length-1;
          if (
            cell2.levelData.charAt(terrainInfo3) === 'j' ||
            cell2.levelData.charAt(terrainInfo3) === 'h' ||
            cell2.levelData.charAt(terrainInfo3) === 'i' ||
            cell2.levelData.charAt(0) !== 'x' ||
            cell2.void.state === true
          ) {
            this.easyStar.avoidAdditionalPoint(cell2.number.x, cell2.number.y);
          }
        }


        // FIND PATH!
        this.players[aiPlayer.number-1].ai.easyStarPath = this.easyStar.findPath(aiPos.x, aiPos.y, targetPos.x, targetPos.y, function( path ) {
          if (path === null) {
            cancelPath = true;
            console.log("Path was not found...for player",aiPlayer.number);
          } else {
            pathSet = path;
          }
        });

        this.easyStar.setIterationsPerCalculation(4000)
        this.easyStar.calculate();
        setTimeout(()=>{
          // console.log('plyr',aiPlayer.number,'pathSet',pathSet,this.players[aiPlayer.number-1].ai.easyStarPath);

          if (cancelPath === true) {
            console.log('cancel path');
            this.easyStar = new Easystar.js();
            this.players[aiPlayer.number-1].ai.targetAcquired = false;
          }
          this.aiParsePath(pathSet,aiPlayer.number);
        }, 50);

      }
    }


    this.players[aiPlayer.number-1] = aiPlayer;


    this.aiAct(aiPlayer);

  }
  aiParsePath = (path,aiPlayer) => {
    // console.log('parsing path',path);


    let instructions = [];
    let init = true;
    let initDirection = this.players[aiPlayer-1].direction;
    let direction;

    if (this.players[aiPlayer-1].ai.mission !== 'patrol' && this.players[aiPlayer-1].ai.mission !== 'defend') {
      if (this.players[aiPlayer-1].ai.safeRange !== true) {
        path.pop();
      }

      // if (path.length > 1) {
      //   path.pop();
      // }
    }
    if (this.players[aiPlayer-1].ai.mission === 'patrol') {
      // if (path.length > 2) {
      //   path.pop();
      // }
    }
    // if (path.length > 1) {
    //   path.pop();
    // }
    // path.pop();

    for (const [key, value] of Object.entries(path)) {

        let currentCell = path[key-1];
        let nextCell = path[key];
        // console.log(key-1,'currentCell',currentCell,'nextCell',nextCell);
        if (currentCell) {

          let oldDirection = direction;
          let newDirection;
          if (init === true) {
            oldDirection = initDirection;
            init = false;
          }

          if (
            nextCell.x === currentCell.x &&
            nextCell.y === currentCell.y-1
          ) {
            newDirection = 'north'
          }
          if (
            nextCell.x === currentCell.x &&
            nextCell.y === currentCell.y+1
          ) {
            newDirection = 'south'
          }
          if (
            nextCell.x === currentCell.x-1 &&
            nextCell.y === currentCell.y
          ) {
            newDirection = 'west'
          }
          if (
            nextCell.x === currentCell.x+1 &&
            nextCell.y === currentCell.y
          ) {
            newDirection = 'east'
          }

          if (oldDirection === newDirection) {

            if (this.players[aiPlayer-1].ai.mission === 'patrol' && this.players[aiPlayer-1].ai.patrolling.checkin !== 'enroute') {
              instructions.push(
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'long_wait',
                  count: 0,
                  limit: 25,
                }
              )
            } else {
              instructions.push(
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                }
              )
            }
          }
          if (oldDirection !== newDirection) {
            if (this.players[aiPlayer-1].ai.mission === 'patrol' && this.players[aiPlayer-1].ai.patrolling.checkin !== 'enroute') {
              instructions.push(
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'long_wait',
                  count: 0,
                  limit: 25,
                },
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'long_wait',
                  count: 0,
                  limit: 25,
                },
              )
            }
            else {
              instructions.push(
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                },
                {
                  keyword: 'move_'+newDirection,
                  count: 0,
                  limit: 1,
                }
              )
            }
          }

          direction = newDirection;

        }

    }
    // instructions.shift();
    // instructions.pop();

    // console.log('this.pathArray',this.pathArray);
    // console.log('path',path,'player',aiPlayer);
    // console.log('instructions',instructions);

    // console.log('player',aiPlayer,this.players[aiPlayer-1].ai.currentInstruction,'mission',this.players[aiPlayer-1].ai.mission,'instructions',instructions);
    // if (this.players[aiPlayer-1].ai.mission === 'retreat') {
    //   console.log('retreat instructions',instructions,'player',aiPlayer,this.players[aiPlayer-1].ai.currentInstruction,'path',path);
    // }
    // if (this.players[aiPlayer-1].ai.mission === 'retrieve') {
    //   console.log('retrieve instructions',instructions,'player',aiPlayer,this.players[aiPlayer-1].ai.currentInstruction,'path',path);
    // }


    this.players[aiPlayer-1].ai.pathArray = path;
    this.players[aiPlayer-1].ai.instructions = instructions;
    this.players[aiPlayer-1].ai.currentInstruction = 0;

  }
  aiAct = (plyr) => {


    let currentInstruction = plyr.ai.instructions[plyr.ai.currentInstruction];

    if (currentInstruction) {
      let targetCell = this.gridInfo.find(elem => elem.number.x === plyr.target.cell.number.x && elem.number.y === plyr.target.cell.number.y)
      let playerCell = this.gridInfo.find(elem => elem.number.x === plyr.currentPosition.cell.number.x && elem.number.y === plyr.currentPosition.cell.number.y)

      let pathIndx = plyr.ai.pathArray.findIndex(elem => elem.x === plyr.currentPosition.cell.number.x && elem.y === plyr.currentPosition.cell.number.y);
      let currentPathStep = plyr.ai.pathArray[pathIndx]
      let nextPathStep = plyr.ai.pathArray[pathIndx+1]
      let nextPathStepCell = undefined;
      if (nextPathStep) {
        nextPathStepCell = this.gridInfo.find(elem => elem.number.x === nextPathStep.x && elem.number.y === nextPathStep.y)
      }

      // console.log('total instructions',plyr.ai.instructions.length,'currentInstruction',plyr.ai.currentInstruction,plyr.moving.state, !plyr.turning.state,'keyword',currentInstruction.keyword,'limit',currentInstruction.limit,'instructions',plyr.ai.instructions,'deflected',plyr.success.deflected.state);
      // console.log('ai act',plyr.ai.currentInstruction,currentInstruction,'mission',plyr.ai.mission,'instructions',plyr.ai.instructions);

      this.keyPressed[plyr.number-1] = {
        north: false,
        south: false,
        east: false,
        west: false,
        northEast: false,
        northWest: false,
        southEast: false,
        southWest: false,
        attack: false,
        defend: false,
        strafe: false,
        cycleWeapon: false,
        cycleArmor: false,
        dodge: false,
        menu: false,
      };

      switch(currentInstruction.keyword) {

        case 'short_wait':
        // console.log('ai act -- short_wait');
          currentInstruction.limit = 15;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'long_wait':
        // console.log('ai act -- long_wait');
          currentInstruction.limit = 25;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'move_north':
        // console.log('ai act -- move_north');
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {

            let inDanger = false;
            if (plyr.direction === 'north') {
              if (!targetCell) {
                // console.log('heading off the edge');
                inDanger = true;
              } else {
                if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                  // console.log('heading for mid-grid danger');
                  inDanger = true;
                }
              }
            }

            if (inDanger === false) {
              // console.log('safe');
              // currentInstruction.limit = 1;
              this.keyPressed[plyr.number-1].north = true;
              this.players[plyr.number-1].turnCheckerDirection = 'north';
              // plyr.ai.currentInstruction++;
              if (currentInstruction.limit === 1) {

                plyr.ai.currentInstruction++;
              } else {
                if (currentInstruction.count < currentInstruction.limit) {
                  currentInstruction.count++;
                } else if (currentInstruction.count >= currentInstruction.limit) {
                  plyr.ai.currentInstruction++;
                }
              }

            } else {
              // console.log('danger');
              plyr.ai.currentInstruction++;
              plyr.ai.resetInstructions = true;
            }
            // console.log('inDanger',inDanger);

          }
        break;
        case 'move_south':
        // console.log('ai act -- move_south');

          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {

            let inDanger = false;
            if (plyr.direction === 'south') {
              if (!targetCell) {
                // console.log('heading off the edge');
                inDanger = true;
              } else {
                if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                  // console.log('heading for mid-grid danger');
                  inDanger = true;
                }
              }
            }

            if (inDanger === false) {

              // currentInstruction.limit = 1;
              this.keyPressed[plyr.number-1].south = true;
              this.players[plyr.number-1].turnCheckerDirection = 'south';
              // plyr.ai.currentInstruction++;
              if (currentInstruction.limit === 1) {

                plyr.ai.currentInstruction++;
              } else {
                if (currentInstruction.count < currentInstruction.limit) {
                  currentInstruction.count++;
                } else if (currentInstruction.count >= currentInstruction.limit) {
                  plyr.ai.currentInstruction++;
                }
              }

            } else {
              // console.log('danger');
              plyr.ai.currentInstruction++;
              plyr.ai.resetInstructions = true;
            }

          }
        break;
        case 'move_east':
        // console.log('ai act -- move_east');
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {

            let inDanger = false;
            if (plyr.direction === 'east') {
              if (!targetCell) {
                // console.log('heading off the edge');
                inDanger = true;
              } else {
                if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                  // console.log('heading for mid-grid danger');
                  inDanger = true;
                }
              }
            }

            if (inDanger === false) {
              // currentInstruction.limit = 1;
              this.keyPressed[plyr.number-1].east = true;
              this.players[plyr.number-1].turnCheckerDirection = 'east';
              // plyr.ai.currentInstruction++;
              if (currentInstruction.limit === 1) {

                plyr.ai.currentInstruction++;
              } else {
                if (currentInstruction.count < currentInstruction.limit) {
                  currentInstruction.count++;
                } else if (currentInstruction.count >= currentInstruction.limit) {
                  plyr.ai.currentInstruction++;
                }
              }

            } else {
              // console.log('danger');
              plyr.ai.currentInstruction++;
              plyr.ai.resetInstructions = true;
            }

          }
        break;
        case 'move_west':
        // console.log('ai act -- move_west');
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {

            let inDanger = false;
            if (plyr.direction === 'west') {
              if (!targetCell) {
                // console.log('heading off the edge');
                inDanger = true;
              } else {
                if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                  // console.log('heading for mid-grid danger');
                  inDanger = true;
                }
              }
            }

            if (inDanger === false) {

              // currentInstruction.limit = 1;
              this.keyPressed[plyr.number-1].west = true;
              this.players[plyr.number-1].turnCheckerDirection = 'west';
              // plyr.ai.currentInstruction++;
              if (currentInstruction.limit === 1) {

                plyr.ai.currentInstruction++;
              } else {
                if (currentInstruction.count < currentInstruction.limit) {
                  currentInstruction.count++;
                } else if (currentInstruction.count >= currentInstruction.limit) {
                  plyr.ai.currentInstruction++;
                }
              }

            } else {
              // console.log('danger');
              plyr.ai.currentInstruction++;
              plyr.ai.resetInstructions = true;
            }

          }
        break;
        case 'strafe_south':

        // console.log('ai act -- strafe_south');
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {
          let inDanger = false;
          // if (plyr.direction === 'south') {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                // console.log('heading for mid-grid danger');
                inDanger = true;
              }
            }
          // }

          if (inDanger === false) {

            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].strafe = true;
            this.keyPressed[plyr.number-1].south = true;

            // this.players[plyr.number-1].turnCheckerDirection = 'south';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }

          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }

        }
        break;
        case 'strafe_north':
        // console.log('ai act -- strafe_north');
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {
          let inDanger = false;
          // if (plyr.direction === 'north') {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                // console.log('heading for mid-grid danger');
                inDanger = true;
              }
            }
          // }

          if (inDanger === false) {

            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].strafe = true;
            this.keyPressed[plyr.number-1].north = true;

            // this.players[plyr.number-1].turnCheckerDirection = 'north';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }

          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }

        }
        break;
        case 'strafe_east':
        // console.log('ai act -- strafe_east');
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {
          let inDanger = false;
          // if (plyr.direction === 'east') {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                // console.log('heading for mid-grid danger');
                inDanger = true;
              }
            }
          // }

          if (inDanger === false) {

            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].strafe = true;
            this.keyPressed[plyr.number-1].east = true;

            // this.players[plyr.number-1].turnCheckerDirection = 'east';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }

          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }

        }
        break;
        case 'strafe_west':
        // console.log('ai act -- strafe_west');
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true && plyr.action === 'idle') {
          let inDanger = false;
          // if (plyr.direction === 'west') {
            if (!targetCell) {
              // console.log('heading off the edge');
              inDanger = true;
            } else {
              if (targetCell.void.state === true || targetCell.terrain.type === 'deep' || targetCell.terrain.type === 'hazard') {
                // console.log('heading for mid-grid danger');
                inDanger = true;
              }
            }
          // }

          if (inDanger === false) {

            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].strafe = true;
            this.keyPressed[plyr.number-1].west = true;

            // this.players[plyr.number-1].turnCheckerDirection = 'west';
            // plyr.ai.currentInstruction++;
            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }

          } else {
            // console.log('danger');
            plyr.ai.currentInstruction++;
            plyr.ai.resetInstructions = true;
          }

        }
        break;
        case 'flank_north':
        // console.log('ai act -- flank_north');
          if (plyr.flanking.state !== true && plyr.action !== 'flanking') {
            // console.log('flanking north @ ai act');
            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].dodge = true;
            this.keyPressed[plyr.number-1].north = true;
            if (currentInstruction.count < currentInstruction.limit) {
              currentInstruction.count++;
            } else if (currentInstruction.count >= currentInstruction.limit) {
              plyr.ai.currentInstruction++;
            }
          }
        break;
        case 'flank_south':
        // console.log('ai act -- flank_south');
          if (plyr.flanking.state !== true && plyr.action !== 'flanking') {
            // console.log('flanking south @ ai act');
            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].dodge = true;
            this.keyPressed[plyr.number-1].south = true;
            if (currentInstruction.count < currentInstruction.limit) {
              currentInstruction.count++;
            } else if (currentInstruction.count >= currentInstruction.limit) {
              plyr.ai.currentInstruction++;
            }
          }
        break;
        case 'flank_east':
        // console.log('ai act -- flank_east');
          if (plyr.flanking.state !== true && plyr.action !== 'flanking') {
            // console.log('flanking east @ ai act');
            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].dodge = true;
            this.keyPressed[plyr.number-1].east = true;
            if (currentInstruction.count < currentInstruction.limit) {
              currentInstruction.count++;
            } else if (currentInstruction.count >= currentInstruction.limit) {
              plyr.ai.currentInstruction++;
            }
          }
        break;
        case 'flank_west':
        // console.log('ai act -- flank_west');
          if (plyr.flanking.state !== true && plyr.action !== 'flanking') {
            // console.log('flanking west @ ai act');
            // currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].dodge = true;
            this.keyPressed[plyr.number-1].west = true;
            if (currentInstruction.count < currentInstruction.limit) {
              currentInstruction.count++;
            } else if (currentInstruction.count >= currentInstruction.limit) {
              plyr.ai.currentInstruction++;
            }
          }
        break;
        case 'attack':
        // console.log('ai act -- attack');
        if (plyr.attacking.state !== true && plyr.moving.state !== true) {
          // console.log('plyr',plyr.number,'all',plyr.ai.instructions.length,'current',plyr.ai.instructions.indexOf(currentInstruction),currentInstruction.keyword,'pos',plyr.currentPosition.cell.number.x,plyr.currentPosition.cell.number.y,'dir',plyr.direction);
            currentInstruction.limit = 1;
            this.keyPressed[plyr.number-1].attack = true;

            if (currentInstruction.limit === 1) {
              plyr.ai.currentInstruction++;
            } else {
              if (currentInstruction.count < currentInstruction.limit) {
                currentInstruction.count++;
              } else if (currentInstruction.count >= currentInstruction.limit) {
                plyr.ai.currentInstruction++;
              }
            }

        }
        break;
        case 'long_defend':
        // console.log('ai act -- long defend');
          currentInstruction.limit = 25;
          this.keyPressed[plyr.number-1].defend = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'short_defend':
        // console.log('ai act -- short defend');
          currentInstruction.limit = 15;
          this.keyPressed[plyr.number-1].defend = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'dodge':
        // console.log('ai act -- dodge');
          currentInstruction.limit = 1;
          this.keyPressed[plyr.number-1].dodge = true;
          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'pickup':
        console.log('ai act -- pickup',currentInstruction.limit);
          // currentInstruction.limit = 10;
          // this.keyPressed[plyr.number-1].defend = true;
          this.keyPressed[plyr.number-1].cycleWeapon = true;

          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;
        case 'drop_weapon':
        console.log('ai act -- drop_weapon');
          // currentInstruction.limit = 10;
          this.keyPressed[plyr.number-1].defend = true;
          if (currentInstruction.count > 3) {
            this.keyPressed[plyr.number-1].cycleWeapon = true;
          }

          if (currentInstruction.count < currentInstruction.limit) {
            currentInstruction.count++;
          } else if (currentInstruction.count >= currentInstruction.limit) {
            plyr.ai.currentInstruction++;
          }
        break;

      }


      if (plyr.ai.currentInstruction === plyr.ai.instructions.length) {
        // console.log('NO MORE INSTRUCTIONS!!');
        if (plyr.ai.engaging.state === true) {
          plyr.ai.engaging.state = false;
          plyr.ai.engaging.targetAction = '';
        }
      }
      if (plyr.ai.mission === 'engage' && plyr.currentWeapon.type === 'crossbow') {
        if (plyr.ai.currentInstruction === plyr.ai.instructions.length-1) {
          if (plyr.ai.engaging.state === true) {
            plyr.ai.engaging.state = false;
            plyr.ai.engaging.targetAction = ''
          }
        }
      }

      let index = plyr.ai.instructions.indexOf(currentInstruction);
      if (index >= plyr.ai.instructions.length-1 && plyr.ai.mission === "patrol" && plyr.ai.patrolling.checkin === 'checkedIn') {
        // console.log('patrol instructions complete');
        plyr.ai.instructions = [];
        this.players[plyr.number-1].ai.patrolling.loopControl = false;
      }
      if (index >= plyr.ai.instructions.length-1 && plyr.ai.mission === "defend" && plyr.ai.defending.checkin === 'checkedIn') {
        // console.log('defend instructions complete');
        plyr.ai.instructions = [];
      }

    } else {
      this.keyPressed[plyr.number-1] = {
        north: false,
        south: false,
        east: false,
        west: false,
        northEast: false,
        northWest: false,
        southEast: false,
        southWest: false,
        attack: false,
        defend: false,
        strafe: false,
        cycleWeapon: false,
        cycleArmor: false,
        dodge: false,
        menu: false,
      }
    }

  }

  toggleCameraModeUI = (mode) => {

    this.camera.mode = mode;
  }
  closeCamera = () => {
    this.camera.state = false;
  }
  resetCamera = () => {

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');


    this.camera = {
      state: true,
      startCount: 0,
      startLimit: 4,
      mode: 'pan',
      fixed: false,
      target: {
        type: 'player',
        plyrNo: 1,
        cell: {
          x: undefined,
          y: undefined,
        }
      },
      focus: {
        x: undefined,
        y: undefined,
      },
      zoom: {
        x: 1,
        y: 1,
      },
      zoomDirection: 'in',
      pan: {
        x: 1,
        y: 1,
      },
      panDirection: 'east',
      limits: {
        zoom: {
          min: .5,
          max: 1.8,
        },
        pan: {
          x: {
            min: -400,
            max: 300,
          },
          y: {
            min: -400,
            max: 300,
          }
        },
      },
      instructionType: 'default',
      instructions: [],
    };

    // PRESET ZOOM & PAN
    // if (window.innerWidth < 1100) {
    //
    //   switch(this.gridWidth) {
    //     case 3 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = -50;
    //     break;
    //     case 6 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = -20;
    //     break;
    //     case 9 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = -90;
    //     break;
    //     case 12 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = 30;
    //     break;
    //   }
    // } else {
    //
    //   switch(this.gridWidth) {
    //     case 3 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = -50;
    //     break;
    //     case 6 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = -20;
    //     break;
    //     case 9 :
    //       this.camera.pan.x = 1;
    //       this.camera.pan.y = 10;
    //     break;
    //     case 12 :
    //       this.camera.pan.x = 70;
    //       this.camera.pan.y = 20;
    //     break;
    //   }
    // }

    this.setCameraFocus('reset', canvas, context, canvas2, context2);

  }
  setCameraFocus = (focusType, canvas, context, canvas2, context2) => {
    // console.log('setting camera focus');

    if (focusType === 'init' || focusType === 'reset') {

      if (this.camera.mode === 'pan') {
        this.camera.focus.x = (canvas.width/2)-(this.camera.pan.x)
        this.camera.focus.y = (canvas.height/2)-(this.camera.pan.y)
      }

      if (this.camera.mode === 'zoom') {
        this.camera.focus.x = (canvas.width/2)-(this.camera.pan.x)
        this.camera.focus.y = (canvas.height/2)-(this.camera.pan.y)
      }

    }

    if (focusType === 'input') {

      class Point {
          constructor(x, y) {
              this.x = x;
              this.y = y;
          }
      }

      if (this.camera.mode === 'pan') {

        switch (this.camera.panDirection) {
          case 'north':
            this.camera.focus.y -= 10;
          break;
          case 'south':
            this.camera.focus.y += 10;
          break;
          case 'east':
            this.camera.focus.x += 10;
          break;
          case 'west':
            this.camera.focus.x -= 10;
          break;
          default:

        }

      }

      if (this.camera.mode === 'zoom') {

        if (this.camera.zoomDirection === 'out') {
          // console.log('!!',this.camera.pan,this.camera.zoom.x);
          let p3 = new Point();
          p3.x = this.camera.focus.x += 2*(this.camera.zoom.x*1);
          p3.y = this.camera.focus.y += 1*(this.camera.zoom.y*1);

          let isoy = this.cartesianToIsometric(p3);
          console.log('isoy',isoy);

          // isoy += 2*(this.camera.zoom.x*10);
          // isoy += 1*(this.camera.zoom.y*10);

          this.camera.focus.x += 2*(10)
          this.camera.focus.y += 1*(10)
        }
        if (this.camera.zoomDirection === 'in') {
          // console.log('!!',this.camera.pan,this.camera.zoom.x);
          let p2 = new Point();
          p2.x = this.camera.focus.x -= 2*(this.camera.zoom.x*1);
          p2.y = this.camera.focus.y -= 1*(this.camera.zoom.y*1);

          let isox = this.cartesianToIsometric(p2);
          console.log('isox',isox);

          // isox -= 2*(this.camera.zoom.x*10);
          // isox -= 1*(this.camera.zoom.y*10);

          this.camera.focus.x -= 2*(10)
          this.camera.focus.y -= 1*(10)

        }

      }

    }

    console.log('camera focus set',this.camera.focus);

  }


  render() {
    return (
      <React.Fragment>

        {this.state.loading === true && (
          <Loading />
        )}

        <div className="containerTop">
          <div className="timer">
            <p className="timerText">
            {this.time}
            </p>
          </div>

          <div className={this.state.containerInnerClass}>

            <canvas
              width={this.canvasWidth}
              height={this.canvasHeight}
              ref={this.canvasRef}
              className="canvas"
            />
            <canvas
              width={this.canvasWidth}
              height={this.canvasHeight}
              ref={this.canvasRef2}
              className="canvas2"
            />

            <div className={this.debugBoxStyle}>
              <DebugBox
                player={this.players[0]}
                expand={this.expandDebugBox}
                minimize={this.minimizeDebugBox}
              />
            </div>

            {this.players.length > 1 &&(
              <div className={this.debugBoxStyle2}>
                <DebugBox
                  player={this.players[1]}
                  expand={this.expandDebugBox}
                  minimize={this.minimizeDebugBox}
                />
              </div>
            )}

            <div className="settingsSwitch">
              <a href="javascript:" className="setSwitchLink" onClick={this.openSettings}>
                <FontAwesomeIcon icon={faCogs} size="sm" className="setSwitchIcon"/>
              </a>
              {this.aiPlayers[0] &&(
              // {this.updateSettingsFormAiDataData.random &&(
                <a href="javascript:" className="setSwitchLink cameraModeHighlighted" onClick={this.toggleAiDisplay}>
                  <FontAwesomeIcon icon={faRobot} size="sm" className="setSwitchIcon"/>
                </a>
              )}
              {!this.aiPlayers[0] &&(
              // {!this.updateSettingsFormAiDataData.random &&(
                <a href="javascript:" className="setSwitchLink" onClick={this.toggleAiDisplay}>
                  <FontAwesomeIcon icon={faRobot} size="sm" className="setSwitchIcon"/>
                </a>
              )}

            </div>

            {this.camera.state === true && (
              <div className="cameraBox">
                <a href="javascript:"  onClick={this.closeCamera}>
                  <FontAwesomeIcon icon={faVideo} size="sm" className="cameraUIIcon"/>
                </a>
                {this.camera.mode === 'zoom' && (
                  <div className="cameraBoxMode">
                  <a href="javascript:" className="cameraModeHighlighted" onClick={this.toggleCameraModeUI.bind(this, 'zoom')}>
                    <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>
                  </a>
                  <a href="javascript:" className="" onClick={this.toggleCameraModeUI.bind(this, 'pan')}>
                    <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>
                  </a>
                  </div>
                )}
                {this.camera.mode === 'pan' && (
                  <div className="cameraBoxMode">
                  <a href="javascript:" onClick={this.toggleCameraModeUI.bind(this, 'zoom')}>
                    <FontAwesomeIcon icon={faSearchPlus} size="sm" className="cameraUIIcon"/>
                  </a>
                  <a href="javascript:" className=" cameraModeHighlighted" onClick={this.toggleCameraModeUI.bind(this, 'pan')}>
                    <FontAwesomeIcon icon={faExpandAlt} size="sm" className="cameraUIIcon"/>
                  </a>
                  </div>
                )}
                <a href="javascript:"  onClick={this.resetCamera}>
                  <FontAwesomeIcon icon={faUndo} size="sm" className="cameraUIIcon"/>
                </a>

              </div>
            )}


            {this.showCellInfoBox !== true && (
              <div className="cellInfoSwitch">
                  <FontAwesomeIcon icon={faChessBoard} size="sm" className="setSwitchIcon"/>
              </div>
            )}
            {this.showCellInfoBox === true && (
              <CellInfo
                cell={this.clicked}
                close={this.toggleCellInfoBox}
              />
            )}


            {this.state.showAiStatus === true && (
              <AiStatus
                players={this.players}
                aiPlayers={this.aiPlayers}
                onAiAdd={this.addAiRandomPlayer}
              />
            )}

          </div>

          {this.state.showSettings === true && (
            <Settings
              gridWidth={this.gridWidth}
              onConfirm={this.loadSettings}
              onCancel={this.cancelSettings}
              getCustomAiStartPosList={this.getCustomAiStartPosList}
              aiStartPosList={this.settingsFormAiStartPosList}
              aiSettingsFormHandler={this.aiSettingsFormHandler}
              updateSettingsFormAiDataData={this.updateSettingsFormAiDataData}
              updateSettingsFormAiData={this.updateSettingsFormAiData}
              rnJesus={this.rnJesus}
              settingsFormGridWidthUpdate={this.settingsFormGridWidthUpdate}
              plyrStartPosList={this.settingsFormPlyrStartPosList}
              getCustomPlyrStartPosList={this.getCustomPlyrStartPosList}
              gamepad={this.gamepad}
              canvasRef={this.canvasRef3}
              canvasRef2={this.canvasRef4}
              canvasHeight={this.settingsCanvasHeight}
              canvasWidth={this.settingsCanvasWidth}
              gridInfo={this.settingsGridInfo}
              clickedCell={this.settingsClicked}
              showCanvasData={this.showSettingsCanvasData}
              updateSettingsCanvasData={this.updateSettingsCanvasData}
              disableInitItems={this.disableInitItems}
            />
          )}


          <img src={floorGrass} className='hidden' ref="floorGrass" alt="logo" id="floor1"/>
          <img src={floorDirt} className='hidden' ref="floorDirt" alt="logo" id="floor2"/>
          <img src={floorIce} className='hidden' ref="floorIce" alt="logo" id="floor2"/>
          <img src={floorStone} className='hidden' ref="floorStone" alt="logo" id="floor2"/>
          <img src={floorSand} className='hidden' ref="floorSand" alt="logo" id="floor2"/>
          <img src={floorMud} className='hidden' ref="floorMud" alt="logo" id="floor2"/>
          <img src={floorPond} className='hidden' ref="floorPond" alt="logo" id="floor2"/>
          <img src={floorRiver} className='hidden' ref="floorRiver" alt="logo" id="floor2"/>
          <img src={floorBramble} className='hidden' ref="floorBramble" alt="logo" id="floor2"/>
          <img src={floorLava} className='hidden' ref="floorLava" alt="logo" id="floor2"/>
          <img src={floorAttack} className='hidden' ref="floorAttack" alt="logo" id="floor3"/>
          <img src={floorVoid} className='hidden' ref="floorVoid" alt="logo" id="floor4"/>
          <img src={floorVoid2} className='hidden' ref="floorVoid2" alt="logo" id="floor4"/>
          <img src={floorVoid3} className='hidden' ref="floorVoid3" alt="logo" id="floor4"/>
          <img src={wall} className='hidden' ref="wall" id="wall" alt="logo" />
          <img src={wall2} className='hidden' ref="wall2" id="wall2" alt="logo" />
          <img src={wall3} className='hidden' ref="wall3" id="wall3" alt="logo" />


          <img src={attack1Indicate} className='hidden playerImgs' ref="attack1Indicate" id="attack1Indicate" alt="logo" />
          <img src={attack2Indicate} className='hidden playerImgs' ref="attack2Indicate" id="attack2Indicate" alt="logo" />
          <img src={attack3Indicate} className='hidden playerImgs' ref="attack3Indicate" id="attack3Indicate" alt="logo" />
          <img src={attackUnarmedIndicate} className='hidden playerImgs' ref="attackUnarmedIndicate" id="attackUnarmedIndicate" alt="logo" />
          <img src={attackBluntIndicate} className='hidden playerImgs' ref="attackBluntIndicate" id="attackBluntIndicate" alt="logo" />
          <img src={attackSuccessIndicate} className='hidden playerImgs' ref="attackSuccessIndicate" id="attackSuccessIndicate" alt="logo" />
          <img src={defendIndicate} className='hidden playerImgs' ref="defendIndicate" id="defendIndicate" alt="logo" />
          <img src={defendIndicate1} className='hidden playerImgs' ref="defendIndicate1" id="defendIndicate1" alt="logo" />
          <img src={defendIndicate2} className='hidden playerImgs' ref="defendIndicate2" id="defendIndicate2" alt="logo" />
          <img src={defendIndicate3} className='hidden playerImgs' ref="defendIndicate3" id="defendIndicate3" alt="logo" />
          <img src={defendIndicate4} className='hidden playerImgs' ref="defendIndicate4" id="defendIndicate4" alt="logo" />
          <img src={deflectIndicate} className='hidden playerImgs' ref="deflectIndicate" id="deflectIndicate" alt="logo" />
          <img src={deflectIndicate2} className='hidden playerImgs' ref="deflectIndicate2" id="deflectIndicate2" alt="logo" />
          <img src={deflectInjuredIndicate} className='hidden playerImgs' ref="deflectInjuredIndicate" id="deflectInjuredIndicate" alt="logo" />
          <img src={deflectBluntIndicate} className='hidden playerImgs' ref="deflectBluntIndicate" id="deflectBluntIndicate" alt="logo" />
          <img src={pushbackIndicate} className='hidden playerImgs' ref="pushbackIndicate" id="pushbackIndicate" alt="logo" />
          <img src={ghostIndicate} className='hidden playerImgs' ref="ghostIndicate" id="ghostIndicate" alt="logo" />
          <img src={deathIndicate} className='hidden playerImgs' ref="deathIndicate" id="deathIndicate" alt="logo" />
          <img src={preAttackIndicate} className='hidden playerImgs' ref="preAttackIndicate" id="preAttackIndicate" alt="logo" />
          <img src={preAttack2Indicate} className='hidden playerImgs' ref="preAttack2Indicate" id="preAttack2Indicate" alt="logo" />
          <img src={attackBreakIndicate} className='hidden playerImgs' ref="attackBreakIndicate" id="attackBreakIndicate" alt="logo" />
          <img src={defendBreakIndicate} className='hidden playerImgs' ref="defendBreakIndicate" id="defendBreakIndicate" alt="logo" />
          <img src={defendSuccessIndicate} className='hidden playerImgs' ref="defendSuccessIndicate" id="defendBreakIndicate" alt="logo" />
          <img src={boltDefendIndicate} className='hidden playerImgs' ref="boltDefendIndicate" id="boltDefendIndicate" alt="logo" />
          <img src={dodgeIndicate} className='hidden playerImgs' ref="dodgeIndicate" id="dodgeIndicate" alt="logo" />
          <img src={preAction1Indicate} className="hidden playerImgs" ref="preAction1Indicate" id="preAction1Indicate" alt="logo"/>
          <img src={preAction2Indicate} className="hidden playerImgs" ref="preAction2Indicate" id="preAction2Indicate" alt="logo"/>
          <img src={fallingIndicate} className="hidden playerImgs" ref="fallingIndicate" id="fallingIndicate" alt="logo"/>
          <img src={completeMissionIndicate} className="hidden playerImgs" ref="completeMissionIndicate" id="completeMissionIndicate" alt="logo"/>
          <img src={flankIndicate} className="hidden playerImgs" ref="flankIndicate" id="flankIndicate" alt="logo"/>
          <img src={attackBluntIndicate2} className="hidden playerImgs" ref="attackBluntIndicate2" id="attackBluntIndicate2" alt="logo"/>
          <img src={enrouteIndicate} className="hidden playerImgs" ref="enrouteIndicate" id="enrouteIndicate" alt="logo"/>
          <img src={targetSwitchIndicate} className="hidden playerImgs" ref="targetSwitchIndicate" id="targetSwitchIndicate" alt="logo"/>
          <img src={pathSwitchIndicate} className="hidden playerImgs" ref="pathSwitchIndicate" id="pathSwitchIndicate" alt="logo"/>
          <img src={retreatIndicate} className="hidden playerImgs" ref="retreatIndicate" id="retreatIndicate" alt="logo"/>
          <img src={defendSuccessIndicate} className="hidden playerImgs" ref="defendSuccessIndicate" id="defendSuccessIndicate" alt="logo"/>


          <img src={preAttack2Indicate} className="hidden playerImgs" ref="preAttack2Indicate" id="preAttack2Indicate" alt="..." />
          <img src={preAction1Indicate} className="hidden playerImgs" ref="preAction1Indicate" id="preAction1Indicate" alt="..." />
          <img src={preAction2Indicate} className="hidden playerImgs" ref="preAction2Indicate" id="preAction2Indicate" alt="..." />
          <img src={attackBreakIndicate} className="hidden playerImgs" ref="attackBreakIndicate" id="attackBreakIndicate" alt="..." />
          <img src={missedIndicate} className="hidden playerImgs" ref="missedIndicate" id="missedIndicate" alt="..." />
          <img src={defendBreakIndicate} className="hidden playerImgs" ref="defendBreakIndicate" id="defendBreakIndicate" alt="..." />
          <img src={boltDefendIndicate} className="hidden playerImgs" ref="boltDefendIndicate" id="boltDefendIndicate" alt="..." />
          <img src={dodgeIndicate} className="hidden playerImgs" ref="dodgeIndicate" id="dodgeIndicate" alt="..." />
          <img src={fallingIndicate} className="hidden playerImgs" ref="fallingIndicate" id="fallingIndicate" alt="..." />
          <img src={completeMissionIndicate} className="hidden playerImgs" ref="completeMissionIndicate" id="completeMissionIndicate" alt="..." />
          <img src={flankIndicate} className="hidden playerImgs" ref="flankIndicate" id="flankIndicate" alt="..." />
          <img src={attackBluntIndicate2} className="hidden playerImgs" ref="attackBluntIndicate2" id="attackBluntIndicate2" alt="..." />
          <img src={enrouteIndicate} className="hidden playerImgs" ref="enrouteIndicate" id="enrouteIndicate" alt="..." />
          <img src={targetSwitchIndicate} className="hidden playerImgs" ref="targetSwitchIndicate" id="targetSwitchIndicate" alt="..." />
          <img src={pathSwitchIndicate} className="hidden playerImgs" ref="pathSwitchIndicate" id="pathSwitchIndicate" alt="..." />
          <img src={retreatIndicate} className="hidden playerImgs" ref="retreatIndicate" id="retreatIndicate" alt="..." />
          <img src={defendSuccessIndicate} className="hidden playerImgs" ref="defendSuccessIndicate" id="defendSuccessIndicate" alt="..." />
          <img src={aggressiveModeIndicate} className="hidden playerImgs" ref="aggressiveModeIndicate" id="aggressiveModeIndicate" alt="..." />
          <img src={passiveModeIndicate} className="hidden playerImgs" ref="passiveModeIndicate" id="passiveModeIndicate" alt="..." />
          <img src={thinkingIndicate} className="hidden playerImgs" ref="thinkingIndicate" id="thinkingIndicate" alt="..." />
          <img src={defendMissionIndicate} className="hidden playerImgs" ref="defendMissionIndicate" id="defendMissionIndicate" alt="..." />
          <img src={patrolMissionIndicate} className="hidden playerImgs" ref="patrolMissionIndicate" id="patrolMissionIndicate" alt="..." />
          <img src={pursueMissionIndicate} className="hidden playerImgs" ref="pursueMissionIndicate" id="pursueMissionIndicate" alt="..." />
          <img src={pursueMissionIndicate2} className="hidden playerImgs" ref="pursueMissionIndicate2" id="pursueMissionIndicate2" alt="..." />
          <img src={retrieveMissionIndicate} className="hidden playerImgs" ref="retrieveMissionIndicate" id="retrieveMissionIndicate" alt="..." />
          <img src={drowningIndicate} className="hidden playerImgs" ref="drowningIndicate" id="drowningIndicate" alt="..." />
          <img src={destroyedItemIndicate} className="hidden playerImgs" ref="destroyedItemIndicate" id="destroyedItemIndicate" alt="..." />
          <img src={pickupBuffIndicate} className="hidden playerImgs" ref="pickupBuffIndicate" id="pickupBuffIndicate" alt="..." />
          <img src={pickupDebuffIndicate} className="hidden playerImgs" ref="pickupDebuffIndicate" id="pickupDebuffIndicate" alt="..." />
          <img src={pickupWeaponIndicate} className="hidden playerImgs" ref="pickupWeaponIndicate" id="pickupWeaponIndicate" alt="..." />
          <img src={dropWeaponIndicate} className="hidden playerImgs" ref="dropWeaponIndicate" id="dropWeaponIndicate" alt="..." />
          <img src={dropArmorIndicate} className="hidden playerImgs" ref="dropArmorIndicate" id="dropArmorIndicate" alt="..." />
          <img src={pickupArmorIndicate} className="hidden playerImgs" ref="pickupArmorIndicate" id="pickupArmorIndicate" alt="..." />
          <img src={pickupAmmoIndicate} className="hidden playerImgs" ref="pickupAmmoIndicate" id="pickupAmmoIndicate" alt="..." />
          <img src={terrainSpeedupIndicate} className="hidden playerImgs" ref="terrainSpeedupIndicate" id="terrainSpeedupIndicate" alt="..." />
          <img src={terrainSlowdownIndicate} className="hidden playerImgs" ref="terrainSlowdownIndicate" id="terrainSlowdownIndicate" alt="..." />
          <img src={terrainInjuredIndicate} className="hidden playerImgs" ref="terrainInjuredIndicate" id="terrainInjuredIndicate" alt="..." />
          <img src={outOfStaminaIndicate} className="hidden playerImgs" ref="outOfStaminaIndicate" id="outOfStaminaIndicate" alt="..." />
          <img src={boltKilledIndicate} className="hidden playerImgs" ref="boltKilledIndicate" id="boltKilledIndicate" alt="..." />
          <img src={attackParriedIndicate} className="hidden playerImgs" ref="attackParriedIndicate" id="attackParriedIndicate" alt="..." />
          <img src={inventoryFullIndicate} className="hidden playerImgs" ref="inventoryFullIndicate" id="inventoryFullIndicate" alt="..." />
          <img src={outOfAmmoIndicate} className="hidden playerImgs" ref="outOfAmmoIndicate" id="outOfAmmoIndicate" alt="..." />


          <img src={sword} className='hidden playerImgs' ref="itemSword" id="itemSword" alt="logo" />
          <img src={spear} className='hidden playerImgs' ref="itemSpear" id="itemSpear" alt="logo" />
          <img src={bow} className='hidden playerImgs' ref="itemBow" id="itemBow" alt="logo" />
          <img src={crossbow} className='hidden playerImgs' ref="itemCrossbow" id="itemCrossbow" alt="logo" />
          <img src={boltNorth} className='hidden playerImgs' ref="itemBoltNorth" id="itemBoltNorth" alt="logo" />
          <img src={boltSouth} className='hidden playerImgs' ref="itemBoltSouth" id="itemBoltSouth" alt="logo" />
          <img src={boltEast} className='hidden playerImgs' ref="itemBoltEast" id="itemBoltEast" alt="logo" />
          <img src={boltWest} className='hidden playerImgs' ref="itemBoltWest" id="itemBoltWest" alt="logo" />
          <img src={ammo} className='hidden playerImgs' ref="itemAmmo" id="itemAmmo" alt="logo" />
          <img src={mail1} className='hidden playerImgs' ref="itemMail1" id="itemMail1" alt="logo" />
          <img src={mail2} className='hidden playerImgs' ref="itemMail2" id="itemMail2" alt="logo" />
          <img src={mail3} className='hidden playerImgs' ref="itemMail3" id="itemMail3" alt="logo" />
          <img src={greaves1} className='hidden playerImgs' ref="itemGreaves1" id="itemGreaves1" alt="logo" />
          <img src={greaves2} className='hidden playerImgs' ref="itemGreaves2" id="itemGreaves2" alt="logo" />
          <img src={greaves3} className='hidden playerImgs' ref="itemGreaves3" id="itemGreaves3" alt="logo" />
          <img src={helmet1} className='hidden playerImgs' ref="itemHelmet1" id="itemHelmet1" alt="logo" />
          <img src={hpUp} className='hidden playerImgs' ref="itemHpUp" id="itemHpUp" alt="logo" />
          <img src={hpDown} className='hidden playerImgs' ref="itemHpDown" id="itemHpDown" alt="logo" />
          <img src={spdUp} className='hidden playerImgs' ref="itemSpdUp" id="itemSpdUp" alt="logo" />
          <img src={spdDown} className='hidden playerImgs' ref="itemSpdDown" id="itemSpdDown" alt="logo" />
          <img src={strUp} className='hidden playerImgs' ref="itemStrUp" id="itemStrUp" alt="logo" />
          <img src={strDown} className='hidden playerImgs' ref="itemStrDown" id="itemStrDown" alt="logo" />
          <img src={focusUp} className='hidden playerImgs' ref="itemFocusUp" id="itemFocusUp" alt="logo" />
          <img src={focusDown} className='hidden playerImgs' ref="itemFocusDown" id="itemFocusDown" alt="logo" />


          <img src={playerImgIdleSheet} className='hidden playerImgs' ref="playerImgIdleSheet" id="playerImgIdleSheet" alt="logo" />
          <img src={player2ImgIdleSheet} className='hidden playerImgs' ref="player2ImgIdleSheet" id="player2ImgIdleSheet" alt="logo" />
          <img src={playerComAImgIdleSheet} className='hidden playerImgs' ref="playerComAImgIdleSheet" id="playerComAImgIdleSheet" alt="logo" />
          <img src={playerComBImgIdleSheet} className='hidden playerImgs' ref="playerComBImgIdleSheet" id="playerComBImgIdleSheet" alt="logo" />


          <img src={playerImgMoveSheet} className='hidden playerImgs' ref="playerImgMoveSheet" id="playerImgMoveSheet" alt="logo" />
          <img src={player2ImgMoveSheet} className='hidden playerImgs' ref="player2ImgMoveSheet" id="player2ImgMoveSheet" alt="logo" />
          <img src={comAImgMoveSheet} className='hidden playerImgs' ref="comAImgMoveSheet" id="comAImgMoveSheet" alt="logo" />
          <img src={comBImgMoveSheet} className='hidden playerImgs' ref="comBImgMoveSheet" id="comBImgMoveSheet" alt="logo" />


          <img src={player1DefendSheet} className='hidden playerImgs' ref="player1ImgDefendSheet" id="player1ImgDefendSheet" alt="logo" />
          <img src={player2DefendSheet} className='hidden playerImgs' ref="player2ImgDefendSheet" id="player2ImgDefendSheet" alt="logo" />
          <img src={comADefendSheet} className='hidden playerImgs' ref="comAImgDefendSheet" id="comAImgDefendSheet" alt="logo" />
          <img src={comBDefendSheet} className='hidden playerImgs' ref="comBImgDefendSheet" id="comBImgDefendSheet" alt="logo" />

          <img src={player1AttackSheet} className='hidden playerImgs' ref="player1ImgAttackSheet" id="player1ImgAttackSheet" alt="logo" />
          <img src={player2AttackSheet} className='hidden playerImgs' ref="player2ImgAttackSheet" id="player2ImgAttackSheet" alt="logo" />
          <img src={comAAttackSheet} className='hidden playerImgs' ref="comAImgAttackSheet" id="comAImgAttackSheet" alt="logo" />
          <img src={comBAttackSheet} className='hidden playerImgs' ref="comBImgAttackSheet" id="comBImgAttackSheet" alt="logo" />


        </div>
      </React.Fragment>
    )
  }
}

export default App;
