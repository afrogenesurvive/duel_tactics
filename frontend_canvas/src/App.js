import React, { Component } from 'react';
import Easystar from 'easystarjs';
import Pathfinding from 'pathfinding';
import { AStarFinder } from "astar-typescript";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs,
  faRobot,
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
import wall from './assets/wall.png'
import wall2 from './assets/wall2.png'
import wall3 from './assets/wall3.png'

import attack1Indicate from './assets/indicators/attack1.png';
import attack2Indicate from './assets/indicators/attack2.png';
import attack3Indicate from './assets/indicators/attacky.png';
import attackUnarmedIndicate from './assets/items/unarmed.png';
import attackBluntIndicate from './assets/indicators/blunt.png';
import attackSuccessIndicate from './assets/indicators/attackSuccess.png';
import defendIndicate from './assets/indicators/defend.png';
import deflectIndicate from './assets/indicators/deflect.png';
import deflectInjuredIndicate from './assets/indicators/deflectInjured2.png';
import deflectBluntIndicate from './assets/indicators/death2.png';
import pushbackIndicate from './assets/indicators/pushback.png';
import ghostIndicate from './assets/indicators/ghost.png';
import deathIndicate from './assets/indicators/death.png';
import preAttackIndicate from './assets/indicators/preAttack.png';
import preAttack2Indicate from './assets/indicators/preAttack2.png';
import attackBreakIndicate from './assets/indicators/attackBreak.png';
import defendBreakIndicate from './assets/indicators/defendBreak.png';
import boltDefendIndicate from './assets/indicators/boltDefend.png';
import dodgeIndicate from './assets/indicators/dodge.png';

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
    this.sceneX = 1100/2;
    this.sceneY = 220;
    this.tileWidth = 50;
    this.gridWidth = 9;
    this.cellCenterOffsetX = 23;
    this.cellCenterOffsetY = 2

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

    this.gamepad = false;

    this.gridInfo = [];
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
      row1: ['x10a','x11a','x12a','x13a','x14x','x15x','x16x','x17x','x18f','x19d'],
      row2: ['x20x','x21a','x22a','x23a','x24x','x25x','x26x','x27x','x28d','x29d'],
      row3: ['x30a','x31a','x32b','x33j','x34j','x35b','x36j','x37j','x38j','x39d'],
      row4: ['x40j','x41j','x42b','x43b','x44b','x45b','x46j','x47j','x48j','x49d'],
      row5: ['x50j','x51j','x52b','x53j','x54j','x55b','x56j','x57j','x58j','x59d'],
      row6: ['x60x','x61x','x62x','x63i','x64x','x65x','x66x','x67x','x68f','x69f'],
      row7: ['x70x','x71x','x72x','x73i','x74x','x75x','x76x','x77x','x78f','x79f'],
      row8: ['x80x','x81x','x82x','x83x','x84x','x85x','x86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    };
    this.levelData6 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','x42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','y61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
    };
    this.levelData3 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
    };
    this.pathArray = [];

    this.itemList = [
      {
        name: 'moveSpeedUp',
        amount: 5,
        total: 5,
        type: 'item',
        effect: '',
      },
      {
        name: 'moveSpeedDown',
        amount: 5,
        total: 5,
        type: 'item',
        effect: '',
      },
      {
        name: 'hpUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'hpDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'focusUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'focusDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'strengthUp',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
      },
      {
        name: 'strengthDown',
        amount: 4,
        total: 4,
        type: 'item',
        effect: '',
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
    ];
    this.initItemList = [
      // {
      //   name: 'moveSpeedUp',
      //   type: 'item',
      //   effect: '',
      // },
      // {
      //   name: 'moveSpeedDown',
      //   type: 'item',
      //   effect: '',
      // },
      // {
      //   name: 'ammo5',
      //   type: 'item',
      //   effect: '',
      // },
      // {
      //   name: 'ammo10',
      //   type: 'item',
      //   effect: '',
      // },
      // {
      //   name: 'hpUp',
      //   type: 'item',
      //   effect: '',
      // },
      // {
      //   name: 'hpDown',
      //   type: 'item',
      //   effect: '',
      // },
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
      // {
      //   name: 'ironPlate',
      //   type: 'armor',
      //   subType: 'mail',
      //   effect: 'hpUp',
      // },
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
        {x:3 ,y:3 },
      ]
    }
    this.playerNumber = 2;
    this.currentPlayer = 1;
    this.players = [
      {
        number: 1,
        startPosition: {
          cell: {
            number: {
              x: 1,
              y: 6,
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
          limit: 5,
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
              y: 1,
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
          limit: 5,
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
        },
        stamina: {
          current: 20,
          max: 20,
        },
      }
    ];
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
      },
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
    this.deflectedLengthRef = {
      outOfStamina: 50,
      attacked: 25,
      bluntAttacked: 20,
      defended: 10,
      attack: 15
    };
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
    this.gamepadPollCounter = {
      count1: 0,
      count2: 0,
      store1: [],
      store2: [],
    };
    this.charSpriteHeight = 100;
    this.charSpriteWidth = 100;
    this.aiInitSettings = {
      randomStart: false,
      startPosition: {
        number: {x: 8, y: 2}
      },
      primaryMission: 'patrol',
      partolArea: [
        {x: 7, y: 7},
        {x: 7, y:  4}
      ]
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
    this.aiCarefulRange = true;
    this.aiDeflectCheck = false;
    this.aiDeflectedCheck = [];

    this.showSettingsKeyPress = {
      state: false,
      count: 0,
      limit: 3,
    }

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
      context2: context2
    })

    this.refs.comBImgAttackSheet.onload = () => {
      this.addListeners(canvas, canvas2);

      this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);

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
      }
    }
    if ( insideGrid === false ) {
      console.log("clicked the canvas", 'x: ',x,'y: ',y);

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

  }

  loadSettings = (event) => {

    let gridSize = event.target.gridSize.value;
    let playerNumber = event.target.humanPlayers.value;
    let aiPlayerNumber = event.target.aiPlayers.value;

    switch(gridSize) {
      case '4 x 4' :
        this.gridWidth = 3;
        this.sceneY = this.state.sceneY.three;
      break;
      case '7 x 7' :
        this.gridWidth = 6;
        this.sceneY = this.state.sceneY.six;
      break;
      case '10 x 10' :
        this.gridWidth = 9;
        this.sceneY = this.state.sceneY.nine;
      break;
      case '13 x 13' :
        this.gridWidth = 12;
        this.sceneY = this.state.sceneY.twelve;
      break;
    }

    let gamepad = false;
    if (event.target.input.value === 'Gamepad') {
      gamepad = true;
    }
    this.gamepad = gamepad;

    this.restartGame();

    // window.requestAnimationFrame(this.gameLoop);

    this.setState({
      showSettings: false,
    })

    if (playerNumber < 2) {
      this.players.splice(1,1)
      this.playerNumber = 1;
    }

    if (aiPlayerNumber > 0) {
      for (var i = 0; i < aiPlayerNumber; i++) {
        this.addAiRandomPlayer()

      }
    }


  }
  cancelSettings = () => {
    this.setState({
      showSettings: false
    })
  }
  openSettings = () => {
    this.setState({
      showSettings: true,
    })
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
        } else {
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


        // if (this.aiPlayers.length > 0) {
        //
        //   this.aiEvaluate()
        // }

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

          this.playerUpdate(player, this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);
        }


        this.stepper.lastTime = this.stepper.currentTime - (this.stepper.deltaTime % this.stepper.interval);
      }

    }

    requestAnimationFrame(this.gameLoop);

  }

  playerUpdate = (player, canvas, context, canvas2, context2) => {
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
          // console.log('pressed1',key,'plyr',player.number);

          keyPressedDirection = key;
        }
      }
    }



    // AI STRAFE SWITCH ON!!
    if (player.ai.state === true && this.keyPressed[player.number-1]) {
      if (this.keyPressed[player.number-1].strafe === true) {
        this.players[player.number-1].strafing.state = true;
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
    }


    // CHECK AND SET DEFLECTION!!
    if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit) {
      player.action = 'deflected';
      player.success.deflected.count++


      // if (player.ai.state === true) {
      //   player.ai.instructions = []
      //   player.ai.currentInstruction = 0
      //   if (player.ai.mission === 'engage') {
      //     player.ai.engaging.targetAction = ''
      //   }
      // }

    } else if (player.success.deflected.state === true && player.success.deflected.count >= player.success.deflected.limit) {

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
      this.aiDeflectedCheck.splice(indx,1)
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

      this.deflectDrop(player)

    }


    // DEFLECTED PLAYER CAN'T DO ANYTHING!!
    if (player.success.deflected.state === false && player.dead.state !== true) {


      // DON'T READ INPUTS. JUST MOVE!!
      if (player.moving.state === true) {

        // console.log('player',player.number,player.action);
        nextPosition = this.lineCrementer(player);
        // player.currentPosition.cell = player.target.cell;
        player.nextPosition = nextPosition;

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
                // console.log('xx');
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


        // CELL BY CELL MOVEMENT DELAY!
        if (player.newMoveDelay.state === true) {
          if (player.newMoveDelay.count < player.newMoveDelay.limit) {
            player.newMoveDelay.count++;
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
                  }
                }
                if (player.currentWeapon.type === 'sword') {
                  if (
                    cellUnderAttack1.number.x === bolt.currentPosition.number.x &&
                    cellUnderAttack1.number.y === bolt.currentPosition.number.y
                  ) {
                    bolt.kill = true;
                  }
                }
              }


              if (player.target.occupant.type === 'player') {

                // ATTACK SUCCESS!!
                if (this.players.[player.target.occupant.player-1].defending.state === false || this.players.[player.target.occupant.player-1].direction === player.direction) {
                  // console.log('attack success');

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


                  // UNARMED ATTACK!
                  if ( player.currentWeapon.type === '') {
                    console.log('unarmed attack');
                    doubleHit = 2;
                    if (singleHitChance === 1) {
                      let singleHit = this.rnJesus(1,2);
                    }
                  }


                  // BLUNT ATTACK!!
                  if (player.bluntAttack === true) {
                    // console.log('blunt attack');
                    player.stamina.current = player.stamina.current - 2;

                    singleHit = 2;
                    doubleHit = 2;

                    this.players[player.number-1].statusDisplay = {
                      state: true,
                      status: 'blunt attack!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }
                  }
                  else {
                    this.players[player.number-1].stamina.current = this.players[player.number-1].stamina.current - 3;
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
                  }
                  else if (singleHit === 1) {
                    console.log('single hit attack plyr ',player.number,'against plyr ',player.target.occupant.player);
                    this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 1;
                    player.attackStrength = 1;
                    this.attackedCancel(this.players[player.target.occupant.player-1])
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
                      type: 'blunt attacked',
                    };


                    if (this.aiDeflectedCheck.includes(this.players[player.target.occupant.player-1].number) !== true) {
                      this.aiDeflectedCheck.push(this.players[player.target.occupant.player-1].number)
                    }


                  }

                }

                // ATTACK DEFENDED!!
                else {
                  console.log('attack defended by ',player.target.occupant.player,'against plyr ',player.number);

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
                    // console.log('peak defend/parry');
                    shouldDeflectAttacker = this.rnJesus(1,1);
                    shouldDeflectPushBack = this.rnJesus(1,1);

                    player.statusDisplay = {
                      state: true,
                      status: 'Parry!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }
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
                    player.stamina.current = player.stamina.current - 3;


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
                if (player.bluntAttack === true) {
                  player.stamina.current = player.stamina.current - 2;
                } else {
                  player.stamina.current = player.stamina.current - 3;
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
            player.stamina.current = player.stamina.current - 1.5;
            player.defendDecay = {
              state: true,
              count: 0,
              limit: player.defendDecay.limit,
            }

          } else {
            player.statusDisplay = {
              state: true,
              status: "Out of Stamina",
              count: 1,
              limit: player.statusDisplay.limit,
            }
          }

        }

        // DEFENSE DECAY!!
        if (player.defending.state === true && player.defending.count === 0) {
          if (player.defendDecay.state === true) {
            if (player.defendDecay.count < player.defendDecay.limit) {
              player.defendDecay.count++;
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
              player.stamina.current = player.stamina.current - 2;
            }
            if (player.dodging.count < player.dodging.limit) {
              player.dodging.count++
              player.action = 'dodging';
              // console.log('dodge count',player.dodging.count);
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
              // console.log(player.items.weapons,player.currentWeapon,newIndex,player.items.weapons[newIndex]);

            }
            if (
              this.keyPressed[player.number-1].cycleWeapon === true &&
              player.items.weapons.length === 1
            ) {
              player.currentWepon = player.items.weapons[0];
              // console.log('nothing to cycle through');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'no weapons to cycle!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
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

            }
            if (
              this.keyPressed[player.number-1].cycleArmor === true &&
              player.items.armor.length === 0
            ) {
              // console.log('nothing to cycle through');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'no armor to cycle!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
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

                  player.stamina.current = player.stamina.current - 5;


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
          }

        }

        }


        if (player.newMoveDelay.state !== true) {
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

              // CHANGE DIRECTION IF NOT STRAFING!!
              else if (keyPressedDirection !== player.direction && player.strafing.state === false) {

                // console.log('change player direction to',keyPressedDirection);
                // console.log('player',player.number,player.direction,' turn-start',keyPressedDirection);
                player.turning.state = true;
                player.turning.toDirection = keyPressedDirection;

              }

              // MOVE WHILE STRAFING!!
              else if (keyPressedDirection !== player.direction && player.strafing.state === true) {

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
              else if (keyPressedDirection === player.direction && player.strafing.state === true && player.jumping.checking !== true && player.jumping.state !== true) {

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
                            player.stamina.current = player.stamina.current - 6;

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

        // // CAN READ MOVE INPUTS!!
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

            // MOVE IF DIRECTION ALIGNS & NOT STRAFING!!
            if (keyPressedDirection === player.direction && player.strafing.state === false) {

              let target = this.getTarget(player)

              if (target.free === true && player.target.void === false) {

                if (player.dead.state === true && player.dead.count === 0) {

                  player.nextPosition = {x: -30,y: -30}

                }
                else if (player.turning.delayCount === 0) {

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

            // CHANGE DIRECTION IF NOT STRAFING!!
            else if (keyPressedDirection !== player.direction && player.strafing.state === false) {

              // console.log('change player direction to',keyPressedDirection);
              // console.log('player',player.number,player.direction,' turn-start',keyPressedDirection);
              player.turning.state = true;
              player.turning.toDirection = keyPressedDirection;

            }

            // MOVE WHILE STRAFING!!
            else if (keyPressedDirection !== player.direction && player.strafing.state === true) {

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
            else if (keyPressedDirection === player.direction && player.strafing.state === true && player.jumping.checking !== true && player.jumping.state !== true) {

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
                          player.stamina.current = player.stamina.current - 6;

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
                    player.bluntAttack = true;
                  }

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
                } else {
                  if (player.defending.count === 0) {
                    player.defending = {
                      state: false,
                      count: 1,
                      limit: player.defending.limit,
                    }
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
                  let miss;
                  if (doubleHit === 1) {
                    console.log('double hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 2;
                    this.attackedCancel(this.players[plyr.number-1]);
                  }
                  else if (singleHit === 1) {
                    console.log('single hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 1;
                    this.attackedCancel(this.players[plyr.number-1]);
                  }
                  else if (doubleHit !== 1 && singleHit !== 1) {
                    console.log('attacked but no damage');
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

    if (player.ai.state === true ) {
      this.aiEvaluate(player)
    }

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
    let sceneX = this.canvasWidth/2;
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

    for (var x = 0; x < this.gridWidth+1; x++) {
      for (var y = 0; y < this.gridWidth+1; y++) {

        let floor;

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

        let drawFloor = true;


        let gridInfoCell = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y);

        if (gridInfoCell.void.state === true) {
          drawFloor = false;
        }


        floor = floorImgs[gridInfoCell.terrain.name]


        // VOID BLINKER!!
        if (
          this.cellToVoid.state === true &&
          this.cellToVoid.x === x &&
          this.cellToVoid.y === y
        ) {
          if(this.cellToVoid.count % 5 === 0) {
            drawFloor = false;
          } else {
            floor = this.refs.floorVoid;
            drawFloor = true;
          }
        }

        for (const plyrb of this.players) {
          if (plyrb.drowning === true) {
            if (
              plyrb.currentPosition.cell.number.x === x &&
              plyrb.currentPosition.cell.number.y === y
            ) {
              if(plyrb.falling.count % 3 === 0) {
                drawFloor = false;
              } else {
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


        if (drawFloor === true) {
          context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);
        }


        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12)

        context.fillStyle = "black";
        context.fillRect(center.x, center.y,5,5);

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


          if (plyr.attacking.state === true) {
            plyr.action = 'attacking'
          }



          // FOR TESTING BY CALLING ONLY @ 1 CELL
          if (
            plyr.currentPosition.cell.number.x === x &&
            plyr.currentPosition.cell.number.y === y
          ) {
            switch(plyr.action) {
              case 'moving':
                let moveSpeed = plyr.speed.move;
                if (plyr.terrainMoveSpeed.state === true) {
                  moveSpeed = plyr.terrainMoveSpeed.speed;
                }
                let rangeIndex = plyr.speed.range.indexOf(moveSpeed)
                let moveAnimIndex = this.moveStepRef[rangeIndex].indexOf(plyr.moving.step)
                finalAnimIndex = moveAnimIndex;
                // console.log('animation mv spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex,'move state',plyr.moving.state);
                if (plyr.target.void == true) {
                  // console.log('anim testing mv void spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex);
                }
              break;
              case 'jumping':
                let rangeIndex4 = plyr.speed.range.indexOf(.1)
                let moveAnimIndex4 = this.moveStepRef[rangeIndex4].indexOf(plyr.moving.step)
                finalAnimIndex = moveAnimIndex4;
                // console.log('animation jump spd',plyr.speed.move,'step',plyr.moving.step,'plyr',plyr.number,'index',finalAnimIndex,'move state',plyr.moving.state);

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
                // console.log('spd',plyr.speed.move,'flanking step',plyr.flanking.step,'step',plyr.moving.step,'moveAnimIndex6',moveAnimIndex6);
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
                finalAnimIndex = animIndex5;
                // console.log('anim testing dflct',plyr.success.deflected.count,'plyr',plyr.number,'index',finalAnimIndex,'moving',plyr.moving.state);
              break;
              case 'dodging':
                let animIndex7 = plyr.dodging.count -1;
                finalAnimIndex = animIndex7;
                // console.log('anim testing dodge',plyr.dodging.count,'plyr',plyr.number);
              break;
            }
          }
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




          // DEPTH SORTING!!
          if (plyr.target.void === false && plyr.moving.state === true && plyr.falling.state !== true) {
            let jumpYCalc = 10 - this.moveStepRef[1].indexOf(plyr.moving.step);
            // console.log('move',finalAnimIndex);
            if (plyr.direction === 'north' || plyr.direction === 'northWest' || plyr.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);

                if (plyr.jumping.state === true) {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), 40, 40);
                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
                }
                // console.log('moving @ drawstep ...finalAnimIndex',finalAnimIndex,plyr.action,'terrainMoveSpeed state',plyr.terrainMoveSpeed.state,'animation mv spd terrain',plyr.terrainMoveSpeed.speed,'animation mv spd',plyr.speed.move,'step',plyr.moving.step);

              }
            }
            if (plyr.direction === 'east' || plyr.direction === 'south' || plyr.direction === 'southEast') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // console.log('ff',plyr.action ,finalAnimIndex,'plyr #', player.number);

                if (plyr.jumping.state === true) {

                  context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25-(jumpYCalc*3), 40, 40);
                } else {
                  context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
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
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 55, 55);
                  // playerDrawLog(x,y,plyr)
                }
              } else {
                if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 55, 55);
                  // playerDrawLog(x,y)
                }
              }

            }
            if (plyr.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 55, 55);
                // playerDrawLog(x,y,plyr)
              }
            }

            if (plyr.pushBack.state === true) {

              context.drawImage(indicatorImgs.pushback, point.x-20, point.y-20, 35,35);
            }

          }
          else if (plyr.moving.state === false && plyr.ghost.state !== true && plyr.dodging.state !== true) {

            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {
              // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);

              // console.log('updatedPlayerImg',finalAnimIndex,sx, sy, sWidth, sHeight,point);
              context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)

              if (plyr.attacking.state === true) {
                // console.log('ff atk',plyr.action ,finalAnimIndex,'plyr #', player.number);

                if (plyr.attacking.count > 0 && plyr.attacking.count < 3) {
                  // console.log('ff atk pre',plyr.action ,finalAnimIndex,'plyr #', player.number,'time',this.time);
                  context.drawImage(indicatorImgs.preAttack, point.x-35, point.y-35, 35,35);
                }

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
                    context.drawImage(indicatorImgs.attack1, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.attackStrength === 2) {
                    context.drawImage(indicatorImgs.attack2, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.bluntAttack === true) {
                    context.drawImage(indicatorImgs.attackBlunt, point.x-35, point.y-35, 35,35);
                  }
                  if (plyr.currentWeapon.type === '') {
                    context.drawImage(indicatorImgs.attackUnarmed, point.x-35, point.y-35, 35,35);
                  }

                  else if (plyr.currentWeapon.type !== '') {
                    context.drawImage(indicatorImgs.attack3, point.x-35, point.y-35, 35,35);
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
                context.drawImage(indicatorImgs.preAttack2, point.x-45, point.y-35, 35,35);
              }

              if (plyr.defending.count > 0 && plyr.defending.count < plyr.defending.limit ) {
                context2.drawImage(indicatorImgs.preAttack, point.x-35, point.y-35, 35,35);
              }
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

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
            else {
              if (x === plyr.moving.origin.number.x + 1 && y === plyr.moving.origin.number.y) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                // context.fillStyle = "black";
                // context.fillRect(point.x, point.y,5,5);
              }
            }
          }

          if (plyr.strafing.state === true && plyr.falling.state !== true && plyr.jumping.state !== true) {
            if (plyr.strafing.direction === 'north' || plyr.strafing.direction === 'northWest' || plyr.strafing.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
                // playerDrawLog(x,y,plyr)
              }
            }
            if (plyr.strafing.direction === 'east' || plyr.strafing.direction === 'south' || plyr.strafing.direction === 'southEast') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
              // if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context2.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
                // playerDrawLog(x,y)
              }
            }
            if (plyr.strafing.direction === 'northEast') {
              if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
                // playerDrawLog(x,y)
              }
            }
            if (plyr.strafing.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40);
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
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    // x === plyr.flanking.target1.x &&
                    // y === plyr.flanking.target1.y
                    x === plyr.currentPosition.cell.number.x &&
                    y === plyr.currentPosition.cell.number.y+1
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
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
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
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
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target1.x &&
                    y === plyr.flanking.target1.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
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
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
                  }
                }
                if (plyr.flanking.step === 2) {
                  if (
                    x === plyr.flanking.target2.x &&
                    y === plyr.flanking.target2.y
                  ) {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-25, 40, 40)
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

              context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-35, 40, 40);
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

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-25, point.y-35, 40, 40);
                // playerDrawLog(x,y,plyr)
              }
            }

          }
          if (plyr.success.deflected.state === true) {

            if (plyr.direction === 'north') {
              if (
                x === plyr.moving.origin.number.x &&
                y === plyr.moving.origin.number.y+1
              ) {
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-35, point.y-20, 40, 40)

                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt attacked') {
                  context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'east') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-35, point.y-30, 40,40);

                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt attacked') {
                  context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'west') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-15, point.y-20, 40,40);

                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt attacked') {
                  context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'south') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-15, point.y-30, 40,40);

                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'blunt attacked') {
                  context.drawImage(indicatorImgs.deflectBlunt, point.x-35, point.y-35, 35,35);
                }
              }
            }

            if (plyr.direction === 'southEast') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-20, point.y-30, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'southWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-10, point.y-20, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'northEast') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                // context.drawImage(updatedPlayerImg, point.x-30, point.y-20, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-30, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }
            if (plyr.direction === 'northWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y+1
              ) {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-10, 40,40);
                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-20, point.y-10, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-35, point.y-35, 35,35);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-35, point.y-35, 35,35);
                }
              }
            }


            if (plyr.breakAnim.attack.state === true) {
              // context.fillStyle = "black";
              // context.fillText("atk break!", point.x-30, point.y-30, 40,70);
              context.drawImage(indicatorImgs.attackBreak, point.x-40, point.y-40, 35,35);
            }
            if (plyr.breakAnim.defend.state === true) {
              // context.fillStyle = "black";
              // context.fillText("guard break!", point.x-30, point.y-30, 40,70);
              context.drawImage(indicatorImgs.defendBreak, point.x-40, point.y-40, 35,35);
            }
          }
          if (plyr.dodging.state === true) {

            if (plyr.direction === 'north' || plyr.direction === 'south') {
              if (
                // x === plyr.moving.origin.number.x &&
                // y === plyr.moving.origin.number.y+1
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                if (plyr.dodgeDirection === 'east') {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-45, point.y-35, 40, 40)
                } else {
                  context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  point.x-10, point.y-20, 40, 40)
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
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-35, 40,40);
                  } else {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-40, point.y-15, 40,40);
                  }
                }
              } else {
                if (
                  x === plyr.currentPosition.cell.number.x &&
                  y === plyr.currentPosition.cell.number.y+1
                ) {
                  if (plyr.dodgeDirection === 'north') {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-10, point.y-35, 40,40);
                  } else {
                    context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight, point.x-40, point.y-15, 40,40);
                  }
                }
              }

            }
            context.drawImage(indicatorImgs.dodge, point.x-45, point.y-35, 35,35);

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

                context.drawImage(updatedPlayerImg, sx, sy, sWidth, sHeight,  respawnPoint.center.x-25, respawnPoint.center.y-50,55, 55)
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
          if (plyr.itemDrop.state === true && plyr.dead.state !== true) {
            let itemImg2;
            let fillClr2;
            if (plyr.itemDrop.item.name === '' && plyr.itemDrop.gear.type !== '') {
              // console.log('drop a weapon or armor',plyr.itemDrop.gear.type);
              switch(plyr.itemDrop.gear.type) {
                case 'sword' :
                  fillClr2 = "orange";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
                case 'spear' :
                  fillClr2 = "maroon";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
                case 'crossbow' :
                  fillClr2 = "navy";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
                case 'helmet' :
                  fillClr2 = "grey";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
                case 'mail' :
                  fillClr2 = "olive";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
                case 'greaves' :
                  fillClr2 = "#b5179e";
                  itemImg2 = itemImgs[plyr.itemDrop.gear.type];
                break;
              }
            }
            else if (plyr.itemDrop.gear.type === '' && plyr.itemDrop.item.name !== '') {
              // console.log('drop an item',plyr.itemDrop.item.name);
              switch(plyr.itemDrop.item.name) {
                case 'moveSpeedUp' :
                  fillClr2 = "purple";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'moveSpeedDown' :
                  fillClr2 = "blue";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'hpUp' :
                  fillClr2 = "yellow";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'hpDown' :
                  fillClr2 = "brown";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'focusUp' :
                  fillClr2 = "white";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'focusDown' :
                  fillClr2 = "black";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'strengthUp' :
                  fillClr2 = "green";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'strengthDown' :
                  fillClr2 = "red";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'ammo5' :
                  fillClr2 = "#283618";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
                case 'ammo10' :
                  fillClr2 = "#283618";
                  itemImg2 = itemImgs[plyr.itemDrop.item.name];
                break;
              }
            }
            if (plyr.itemDrop.count < 4) {

              let pos = plyr.currentPosition.cell.center;
              // console.log('drawing item drop',itemImg2);
              // context.fillStyle = fillClr2;
              // context.beginPath();
              // context.arc(pos.x-10, pos.y, 10, 0, 2 * Math.PI);
              // context.fill();

              // context.drawImage(itemImg2, pos.x-10, pos.y);
            }
            if (plyr.itemDrop.count > 3) {

              let pos = plyr.currentPosition.cell.center;
              // console.log('drawing item drop',itemImg2);
              // context.fillStyle = fillClr2;
              // context.beginPath();
              // context.arc(pos.x-10, pos.y+(plyr.itemDrop.count*2), 10, 0, 2 * Math.PI);
              // context.fill();

              context.drawImage(itemImg2, pos.x-10, pos.y+(plyr.itemDrop.count*2));
            }
          }
          if (plyr.itemPickup.state === true) {
            let itemImg3;
            let fillClr3;
            if (plyr.itemPickup.item.name === '') {
              // console.log('Pickup a weapon or armor',plyr.itemPickup.gear.type);
              switch(plyr.itemPickup.gear.type) {
                case 'sword' :
                  fillClr3 = "orange";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
                case 'spear' :
                  fillClr3 = "maroon";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
                case 'crossbow' :
                  fillClr3 = "navy";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
                case 'helmet' :
                  fillClr3 = "grey";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
                case 'mail' :
                  fillClr3 = "olive";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
                case 'greaves' :
                  fillClr3 = "#b5179e";
                  itemImg3 = itemImgs[plyr.itemPickup.gear.type];
                break;
              }
            }
            else if (plyr.itemPickup.gear.type === '') {
              // console.log('Pickup an item');
              switch(plyr.itemPickup.item.name) {
                case 'moveSpeedUp' :
                  fillClr3 = "purple";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'moveSpeedDown' :
                  fillClr3 = "blue";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'hpUp' :
                  fillClr3 = "yellow";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'hpDown' :
                  fillClr3 = "brown";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'focusUp' :
                  fillClr3 = "white";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'focusDown' :
                  fillClr3 = "black";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'strengthUp' :
                  fillClr3 = "green";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'strengthDown' :
                  fillClr3 = "red";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'ammo5' :
                  fillClr3 = "#283618";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
                case 'ammo10' :
                  fillClr3 = "#283618";
                  itemImg3 = itemImgs[plyr.itemPickup.item.name];
                break;
              }
            }
            if (plyr.itemPickup.count < 4) {

              let pos = plyr.currentPosition.cell.center;
              // console.log('drawing item pickup',itemImg3,gridInfoCell.item.subType,gridInfoCell.item.name);
              // context.fillStyle = fillClr3;
              // context.beginPath();
              // context.arc(pos.x-10, pos.y, 10, 0, 2 * Math.PI);
              // context.fill();

              context.drawImage(itemImg3, pos.x-10, pos.y);
            }
            if (plyr.itemPickup.count > 3) {

              let pos = plyr.currentPosition.cell.center;
              // console.log('drawing item pickup',itemImg3,gridInfoCell.item.subType,gridInfoCell.item.name);
              // context.fillStyle = fillClr3;
              // context.beginPath();
              // context.arc(pos.x-10, pos.y-(plyr.itemPickup.count*2), 10, 0, 2 * Math.PI);
              // context.fill();

              context.drawImage(itemImg3, pos.x-10, pos.y-(plyr.itemPickup.count*2));
            }
          }

          this.players[plyr.number-1] = plyr;

        }


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
      }
    }

    this.players[player.number-1] = player;

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
          if (
            target.cell2.number.x === obstaclePosition.x &&
            target.cell2.number.y === obstaclePosition.y
          ) {
            spearCell2Obstacle = true;
          }
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
          target.free = false;
          obstacleObstructFound = true;
          target.occupant = {
            type: 'player',
            player: plyr2.number
          };
        }
        if (
          target.cell2.number.x === plyr2.currentPosition.cell.number.x &&
          target.cell2.number.y === plyr2.currentPosition.cell.number.y
        ) {
          // console.log('opposing player is in your way');
          target.free = false;
          obstacleObstructFound = true;
          target.occupant = {
            type: 'player',
            player: plyr2.number
          };
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


    if (obstacleObstructFound !== true && spearCell2Obstacle !== true) {
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
          // console.log('weapon',cell.item);
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
                this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;
                // console.log('new ammo amt',this.players[player.number-1].items.ammo);
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
              }
              else {

                if (cell.item.subType === 'crossbow') {
                  let ammo = parseInt(cell.item.effect.split('+')[1]);
                  this.players[player.number-1].items.ammo = this.players[player.number-1].items.ammo + ammo;
                  console.log('you already have a crossbow but take the ammo',ammo);
                  cell.item.effect = 'ammo+0';
                }
                else {
                  console.log('you already have this weapon');
                  this.players[player.number-1].statusDisplay = {
                    state: true,
                    status: 'Already have this weapon!',
                    count: 1,
                    limit: this.players[player.number-1].statusDisplay.limit,
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
            }
            else {
              console.log('you already have this armor');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'Already have this armor!',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
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

              pickUp = true;
            break;
          }

        }
        if (pickUp === true) {
          // PICKUP ANIM!!
          if (cell.item.type === 'item') {
            this.players[player.number-1].itemPickup = {
              state: true,
              count: 0,
              limit: 10,
              item: {
                name: cell.item.name,
              },
              gear: {
                type: '',
              }
            }
          }
          else if (cell.item.type === 'weapon' || cell.item.type === 'armor') {
            this.players[player.number-1].itemPickup = {
              state: true,
              count: 0,
              limit: 10,
              item: {
                name: '',
              },
              gear: {
                type: cell.item.subType,
              }
            }
          }

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
      break;
      case 'slippery' :
        // console.log('player',player.number,' stepped in',cell.terrain.name,'type',cell.terrain.type);
        this.players[player.number-1].terrainMoveSpeed.state = true;
        this.players[player.number-1].terrainMoveSpeed.speed = .2;
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


            if (this.aiDeflectedCheck.includes(this.players[player.number-1].number) !== true) {
              this.aiDeflectedCheck.push(this.players[player.number-1].number)
            }


          }
        }
      break;
    }

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
      player.stamina.current = player.stamina.current - 7;
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
    this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);

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
    if (cell2.terrain.type === 'deep') {
      cellFree = false;
    }

    // PLAYERS 1&2 ALT RESPAWN POINTS!
    if (cell.x === 9 && cell.y === 9) {
      cellFree = false;
    }
    if (cell.x === 9 && cell.y === 0) {
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

    if (args.init === true) {
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
    // console.log('deflected! drop gear?');
    // console.log('preDropItems', player.items);

    let item = {
      name: '',
      type: '',
      subType: '',
      effect: '',
      initDrawn: false
    };

    // let dropWhat = 1
    let dropWhat = this.rnJesus(1,2);
    let shouldDrop = false;
    // let dropChance = this.rnJesus(1,1);
    // let dropChance = this.rnJesus(1,1*player.crits.pushBack);
    let dropChance = this.rnJesus(1,player.crits.pushBack+3);
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
          side: Math.sqrt((25)^2+(50)^2),
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

    this.gridInfo = gridInfo;

  }
  processLevelData = (allCells) => {
    // console.log('processing level data');

    // compare & combine w/ levelData2

    for(const elem of allCells) {

      // SET LEVEL DTAT!
      let levelData2Row = 'row'+elem.number.x;
      let elemLevelData = this.['levelData'+this.gridWidth][levelData2Row][elem.number.y];
      elem.levelData = elemLevelData;

      let terrainInfo = elem.levelData.length-1;
      switch(elem.levelData.charAt(terrainInfo)) {
        case 'a' :
          elem.terrain = {
            name: 'grass',
            type: 'grass',
            effect: '',
          }
        break;
        case 'b' :
          elem.terrain = {
            name: 'stone',
            type: 'road',
            effect: '',
          }
        break;
        case 'x' :
          elem.terrain = {
            name: 'dirt',
            type: 'road',
            effect: '',
          }
        break;
        case 'd' :
          elem.terrain = {
            name: 'pond',
            type: 'shallow',
            effect: '',
          }
        break;
        case 'e' :
          elem.terrain = {
            name: 'mud',
            type: 'sticky',
            effect: '',
          }
        break;
        case 'f' :
          elem.terrain = {
            name: 'sand',
            type: 'sticky',
            effect: '',
          }
        break;
        case 'g' :
          elem.terrain = {
            name: 'ice',
            type: 'slippery',
            effect: '',
          }
        break;
        case 'h' :
          elem.terrain = {
            name: 'lava',
            type: 'hazard',
            effect: '',
          }
        break;
        case 'i' :
          elem.terrain = {
            name: 'bramble',
            type: 'hazard',
            effect: '',
          }
        break;
        case 'j' :
          elem.terrain = {
            name: 'river',
            type: 'deep',
            effect: '',
          }
        break;
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

    this.processLevelData(gridInfo)

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


        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y, 100, 100);

        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12)

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

            context.drawImage(playerImg, sx, sy, sWidth, sHeight, point.x-30, point.y-30, 40, 40);

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
        console.log('random ai mission is',this.aiInitSettings.primaryMission);
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

        // if (this.aiInitSettings.primaryMission === 'defend' && this.aiInitSettings.randomStart === true) {
        //   this.aiInitSettings.partolArea[0] = cell;
        // }
        // if (this.aiInitSettings.primaryMission === 'patrol' && this.aiInitSettings.randomStart === true) {
        //   console.log('random patrol points chosen: start',cell,'patrol points',cell1,cell3);
        // }


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
            limit: 5,
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
            ammo: 10,
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
        this.players[newPlayerNumber-1].ai.mission = this.aiInitSettings.primaryMission;
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
      }

    }
    else if (this.addAiCount.state === true) {
      // console.log('already adding an ai player');
    }

  }
  addAiRandomPlayer = (mission) => {

    let newMisson = mission;
    if (mission === 'random') {
      let whatMission = this.rnJesus(1,10)
      if (whatMission % 2 === 0) {
        newMisson = 'pursue'
      }
      if (whatMission % 3 === 0) {
        newMisson = 'patrol'
      }
      if (whatMission % 5 === 0) {
        newMisson = 'defend'
      }

    }


    this.aiInitSettings = {
      randomStart: true,
      startPosition: {
        number: {x: undefined, y: undefined}
      },
      primaryMission: newMisson,
      partolArea: [
        {x: undefined, y: undefined},
        {x: undefined, y: undefined},
      ]
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

  aiEvaluate = (plyr) => {
    // console.log('aiEvaluate');


    if (this.resetAiTarget.state === true) {
      // console.log('someone died. reset ai targets');

      for (const plyr of this.players) {
        if (plyr.ai.state === true && plyr.ai.targetSet === true && plyr.ai.targetPlayer.number === this.resetAiTarget.player) {

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
        }
      }
    }


    // for (const plyr of this.players) {
      // if (plyr.ai.state === true && plyr.dead.state !== true && plyr.falling.state !== true) {


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


        if (plyr.ai.resetInstructions === true ) {
          // console.log('reset instructions','set',plyr.ai.targetSet,'acquired',plyr.ai.targetAcquired,'mission',plyr.ai.mission);
          plyr.ai.currentInstruction = 0;
          plyr.ai.instructions = [];
          plyr.ai.targetAcquired = false;
          plyr.ai.resetInstructions = false;
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

                if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
                  if (
                    plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y + 7 &&
                    plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y ||
                    plyr2.currentPosition.cell.number.y > plyr.currentPosition.cell.number.y - 7 &&
                    plyr2.currentPosition.cell.number.y < plyr.currentPosition.cell.number.y
                  ) {
                    if (plyr.ai.targetPlayer.number === plyr2.number) {
                      targetInRange = true;
                      // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      plyr.ai.currentInstruction = 0;
                    }
                    else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                      plyr.ai.currentInstruction = 0;
                      // console.log('alternative target in range. Switching');
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
                     plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x + 7 &&
                     plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x ||
                     plyr2.currentPosition.cell.number.x > plyr.currentPosition.cell.number.x - 7 &&
                     plyr2.currentPosition.cell.number.x < plyr.currentPosition.cell.number.x
                  ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in bow range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                        plyr.ai.currentInstruction = 0;
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        plyr.ai.currentInstruction = 0;
                        // console.log('alternative target in range. Switching');
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
                let range = 2;
                if (this.aiCarefulRange === true) {
                  // console.log('careful range finding');
                  range = 3;
                }

                if (plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x) {
                  if (this.aiCarefulRange === true) {
                    if (
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + range ||
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - range ||
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 1) ||
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 1) ||
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y + (range - 2) ||
                      plyr.currentPosition.cell.number.y === plyr2.currentPosition.cell.number.y - (range - 2)
                    ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                  if (this.aiCarefulRange === true) {
                    if (
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + (range - 1) ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2) ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - (range - 2)
                    ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x + range ||
                      plyr.currentPosition.cell.number.x === plyr2.currentPosition.cell.number.x - range
                    ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in spear range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                if (this.aiCarefulRange === true) {
                  // console.log('careful range finding');
                  range2 = 2;
                }

                if (plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x) {

                  if (this.aiCarefulRange === true) {
                    if (
                      plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y + range2 ||
                      plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y - range2 ||
                      plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y + (range2 - 1) ||
                      plyr.currentPosition.cell.number.y ===  plyr2.currentPosition.cell.number.y - (range2 - 1)
                    ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                  if (this.aiCarefulRange === true) {
                    if (
                      plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x + range2 ||
                      plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x - range2 ||
                      plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x + (range2 - 1) ||
                      plyr.currentPosition.cell.number.x ===  plyr2.currentPosition.cell.number.x - (range2 - 1)
                    ) {
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
                      if (plyr.ai.targetPlayer.number === plyr2.number) {
                        targetInRange = true;
                        // console.log('target in sword range for player',plyr.number,'@',plyr.currentPosition.cell.number);
                      }
                      else if (plyr.ai.mission !== 'pursue' && plyr.ai.mission !== 'engage') {
                        // console.log('alternative target in range. Switching');
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
          plyr.ai.mission = 'engage';
          // plyr.ai.engaging.state = true;
        }

        if (plyr.ai.mission === 'engage' && targetInRange !== true) {
          // console.log('target out of range. reverting to primary mission',plyr.ai.primaryMission);

          plyr.ai.mission = plyr.ai.primaryMission;
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


        // if (plyr.ai.mission !== 'patrol' || plyr.ai.mission !== 'defend') {
        //   plyr.ai.patrolling.state = false;
        //   plyr.ai.defending.state = false;
        // }

        if (plyr.ai.targetAqcuiredReset === true) {
          plyr.ai.targetAcquired = false;
          plyr.ai.targetAqcuiredReset = false;
        }


        // AI CAN'T ACT IF FLANKING OR MOVING!


        if (
          plyr.flanking.state !== true &&
          plyr.flanking.step !== 1 &&
          plyr.flanking.step !== 2 &&
          plyr.moving.state !== true &&
          plyr.attacking.state !== true &&
          plyr.defending.state !== true &&
          plyr.success.deflected.state !== true &&
          plyr.action !== 'deflected' &&
          plyr.pushBack.state !== true
        ) {
          this.aiDecide(plyr)
        }


      // }
    // }

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
    if (aiPlayer.ai.mission === 'engage') {
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

      // if (targetPlayer.currentPosition.cell.number.x < aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y > aiPlayer.currentPosition.cell.number.y) {
      //   console.log('edge case 1');
      // }
      // if (targetPlayer.currentPosition.cell.number.x < aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y < aiPlayer.currentPosition.cell.number.y) {
      //   console.log('edge case 2');
      // }
      // if (targetPlayer.currentPosition.cell.number.x > aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y > aiPlayer.currentPosition.cell.number.y) {
      //   console.log('edge case 3');
      // }
      // if (targetPlayer.currentPosition.cell.number.x > aiPlayer.currentPosition.cell.number.x && targetPlayer.currentPosition.cell.number.y < aiPlayer.currentPosition.cell.number.y) {
      //   console.log('edge case 4');
      // }


      this.getTarget(aiPlayer);
      // if (aiPlayer.ai.engaging.state === true) {
      // if (aiPlayer.ai.engaging.state !== true) {

        if (aiPlayer.currentWeapon.type === 'crossbow' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true ) {
          let instructions3 = [];
          // ENGAGED TARGET IS OPEN TO ATTACK!
          if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');

            instructions3.push(
              {
                keyword: 'attack',
                count: 0,
                limit: 1,
              },
            )
            engageTargetAction = 'open'
          }
          if (targetPlayer.defending.state === true || targetPlayer.defendDecay.count > targetPlayer.defendDecay.limit - 10) {


          }


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction) {
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
            if (this.aiCarefulRange === true) {
              if (oppositeDir) {

                if (aiPlayer.target.free !== true) {
                  instructions2.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions2.push(
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
            if (this.aiCarefulRange === true) {
              if (oppositeDir) {

                if (aiPlayer.target.free !== true) {
                  instructions2.push(
                    {
                      keyword: 'strafe_'+oppositeDir,
                      count: 0,
                      limit: 1,
                    },
                  )
                }
                instructions2.push(
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


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction) {
            // console.log('target status has changed. switch up the approach');

            aiPlayer.ai.instructions = instructions2;
            aiPlayer.ai.currentInstruction = 0;
            aiPlayer.ai.engaging.state = true;
            aiPlayer.ai.engaging.targetAction = engageTargetAction;
          }

          // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);

        }
        if (aiPlayer.currentWeapon.type === 'sword' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true ) {

            let instructions1 = [];


            // ENGAGED TARGET IS OPEN TO ATTACK!
            if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
              // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
              if (this.aiCarefulRange === true) {
                if (oppositeDir) {
                  // console.log('safe sword range attack flow');

                  if (aiPlayer.target.free !== true) {
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

              if (this.aiCarefulRange === true) {
                if (oppositeDir) {
                  // console.log('safe range attack flow');

                  if (aiPlayer.target.free !== true) {
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
                // whatDo = 1

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
                // whatDo2 = 3

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


            if (aiPlayer.ai.engaging.targetAction !== engageTargetAction && deflecting !== true) {
            // if (aiPlayer.ai.engaging.targetAction !== engageTargetAction ) {

              // console.log('target status has changed. switch up the approach');

              aiPlayer.ai.instructions = instructions1;
              aiPlayer.ai.currentInstruction = 0;
              aiPlayer.ai.engaging.state = true;
              aiPlayer.ai.engaging.targetAction = engageTargetAction;
            }

            // console.log('aiPlayer.instructions',aiPlayer.ai.instructions);
        }

        if (aiPlayer.currentWeapon.type === '' && aiPlayer.action === 'idle' && aiPlayer.success.deflected.state !== true) {
          // console.log('unarmed engagement');

          let instructions4 = [];


          // ENGAGED TARGET IS OPEN TO ATTACK!
          if (targetPlayer.defending.state !== true && targetPlayer.attacking.state !== true && targetPlayer.defendDecay.state !== true && targetPlayer.dodging.state !== true) {
            // console.log('ai #',aiPlayer.number,'target  ',targetPlayer.number,'is neither attacking nor defending');
            if (this.aiCarefulRange === true) {
              if (oppositeDir) {
                // console.log('safe sword range attack flow');

                if (aiPlayer.target.free !== true) {
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

            if (this.aiCarefulRange === true) {
              if (oppositeDir) {
                // console.log('safe range attack flow');

                if (aiPlayer.target.free !== true) {
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


          if (aiPlayer.ai.engaging.targetAction !== engageTargetAction) {
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
      // console.log('defending');

      if (prevTargetPos.x !== currentTargetPos.x || prevTargetPos.y !== currentTargetPos.y && targetPlayer.dead.state !== true && targetPlayer.falling.state !== true) {
        // console.log('defending but target location changed! Dont update path. Just track target',aiPlayer.number);

        aiPlayer.ai.targetPlayer.currentPosition = {
          x: targetPlayer.currentPosition.cell.number.x,
          y: targetPlayer.currentPosition.cell.number.y,
        }
      }

      if (!aiPlayer.ai.defending.checkin) {
        // console.log('start out to defend location',aiPlayer.ai.defending.area[0]);
        aiPlayer.ai.defending.checkin = 'enroute';

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


          if (this.aiCarefulRange === true) {

            let candidateTargets = [
              {x: 0, y: 0},
              {x: 0, y: 0},
              {x: 0, y: 0},
              {x: 0, y: 0},
            ]

            if (aiPlayer.currentWeapon.type === "crossbow") {
               candidateTargets = [
                 {x: targetPos.x-5, y: targetPos.y},
                 {x: targetPos.x+5, y: targetPos.y},
                 {x: targetPos.x, y: targetPos.y+5},
                 {x: targetPos.x, y: targetPos.y-5},
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
                         {x:rangeElem - 4, y: rangeElem.y },
                         {x:rangeElem - 3, y: rangeElem.y },
                         {x:rangeElem - 2, y: rangeElem.y },
                         {x:rangeElem - 1, y: rangeElem.y },
                       ]
                     break;
                     case 1:
                       rangeElemCells = [
                         {x:rangeElem + 4, y: rangeElem.y },
                         {x:rangeElem + 3, y: rangeElem.y },
                         {x:rangeElem + 2, y: rangeElem.y },
                         {x:rangeElem + 1, y: rangeElem.y },
                       ]
                     break;
                     case 2:
                       rangeElemCells = [
                         {x:rangeElem, y: rangeElem.y + 4},
                         {x:rangeElem, y: rangeElem.y + 3},
                         {x:rangeElem, y: rangeElem.y + 2},
                         {x:rangeElem, y: rangeElem.y + 1},
                       ]
                     break;
                     case 3:
                       rangeElemCells = [
                         {x:rangeElem, y: rangeElem.y - 4},
                         {x:rangeElem, y: rangeElem.y - 3},
                         {x:rangeElem, y: rangeElem.y - 2},
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
                           cellRef3.levelData.charAt(0) ===  'y'
                         ) {
                           rngElCellFree = false;
                         }
                       }

                     }
                   }
                   if (rngElCellFree === true) {
                     targetPos = rangeElem;
                     // console.log('found path to safe bow range');
                   } else {
                     console.log('your safe path is blocked');
                   }
                 }
               }

            }
            if (aiPlayer.currentWeapon.type === "spear") {
              candidateTargets = [
                {x: targetPos.x-3, y: targetPos.y},
                {x: targetPos.x+3, y: targetPos.y},
                {x: targetPos.x, y: targetPos.y+3},
                {x: targetPos.x, y: targetPos.y-3},
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
                        {x:rangeElem - 2, y: rangeElem.y },
                        {x:rangeElem - 1, y: rangeElem.y },
                      ]
                    break;
                    case 1:
                      rangeElemCells = [
                        {x:rangeElem + 2, y: rangeElem.y },
                        {x:rangeElem + 1, y: rangeElem.y },
                      ]
                    break;
                    case 2:
                      rangeElemCells = [
                        {x:rangeElem, y: rangeElem.y + 2},
                        {x:rangeElem, y: rangeElem.y + 1},
                      ]
                    break;
                    case 3:
                      rangeElemCells = [
                        {x:rangeElem, y: rangeElem.y - 2},
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
                          cellRef3.levelData.charAt(0) ===  'y'
                        ) {
                          rngElCellFree = false;
                        }
                      }

                    }
                  }
                  if (rngElCellFree === true) {
                    targetPos = rangeElem;
                    // console.log('found path to safe spear range');
                  } else {
                    console.log('your safe path is blocked');
                  }
                }
              }

            }
            if (aiPlayer.currentWeapon.type === "sword") {
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
                          cellRef3.levelData.charAt(0) ===  'y'
                        ) {
                          rngElCellFree = false;
                        }
                      }

                    }
                  }
                  if (rngElCellFree === true) {
                    targetPos = rangeElem;
                    // console.log('found path to safe sword range');
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
      if (this.aiCarefulRange !== true) {
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
    // console.log('instructions',instructions,'player',aiPlayer,this.players[aiPlayer-1].ai.currentInstruction);


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
      }
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
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {

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

          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {

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
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {

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
          if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {

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
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {
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
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {
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
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {
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
        if (plyr.moving.state !== true && !plyr.turning.state && plyr.success.deflected.state !== true) {
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
            if (currentInstruction.count < currentInstruction.limit) {
              currentInstruction.count++;
            } else if (currentInstruction.count >= currentInstruction.limit) {
              plyr.ai.currentInstruction++;
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
      }
    }

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

            <div className="debugDisplay">
              <DebugBox
                player={this.players[0]}
              />
            </div>
            {this.players.length > 1 &&(
              <div className="debugDisplay2">
                <DebugBox
                  player={this.players[1]}
                />
              </div>
            )}


            <div className="settingsSwitch">
              <a href="javascript:" className="setSwitchLink" onClick={this.openSettings}>
                <FontAwesomeIcon icon={faCogs} size="sm" className="setSwitchIcon"/>
              </a>
              <a href="javascript:" className="setSwitchLink" onClick={this.toggleAiDisplay}>
                <FontAwesomeIcon icon={faRobot} size="sm" className="setSwitchIcon"/>
              </a>
            </div>

            <CellInfo
              cell={this.clicked}
            />

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
          <img src={wall} className='hidden' ref="wall" alt="logo" />
          <img src={wall2} className='hidden' ref="wall2" alt="logo" />
          <img src={wall3} className='hidden' ref="wall3" alt="logo" />

          <img src={attack1Indicate} className='hidden playerImgs' ref="attack1Indicate" alt="logo" />
          <img src={attack2Indicate} className='hidden playerImgs' ref="attack2Indicate" alt="logo" />
          <img src={attack3Indicate} className='hidden playerImgs' ref="attack3Indicate" alt="logo" />
          <img src={attackUnarmedIndicate} className='hidden playerImgs' ref="attackUnarmedIndicate" alt="logo" />
          <img src={attackBluntIndicate} className='hidden playerImgs' ref="attackBluntIndicate" alt="logo" />
          <img src={attackSuccessIndicate} className='hidden playerImgs' ref="attackSuccessIndicate" alt="logo" />
          <img src={defendIndicate} className='hidden playerImgs' ref="defendIndicate" alt="logo" />
          <img src={deflectIndicate} className='hidden playerImgs' ref="deflectIndicate" alt="logo" />
          <img src={deflectInjuredIndicate} className='hidden playerImgs' ref="deflectInjuredIndicate" alt="logo" />
          <img src={deflectBluntIndicate} className='hidden playerImgs' ref="deflectBluntIndicate" alt="logo" />
          <img src={pushbackIndicate} className='hidden playerImgs' ref="pushbackIndicate" alt="logo" />
          <img src={ghostIndicate} className='hidden playerImgs' ref="ghostIndicate" alt="logo" />
          <img src={deathIndicate} className='hidden playerImgs' ref="deathIndicate" alt="logo" />
          <img src={preAttackIndicate} className='hidden playerImgs' ref="preAttackIndicate" alt="logo" />
          <img src={preAttack2Indicate} className='hidden playerImgs' ref="preAttack2Indicate" alt="logo" />
          <img src={attackBreakIndicate} className='hidden playerImgs' ref="attackBreakIndicate" alt="logo" />
          <img src={defendBreakIndicate} className='hidden playerImgs' ref="defendBreakIndicate" alt="logo" />
          <img src={boltDefendIndicate} className='hidden playerImgs' ref="boltDefendIndicate" alt="logo" />
          <img src={dodgeIndicate} className='hidden playerImgs' ref="dodgeIndicate" alt="logo" />


          <img src={sword} className='hidden playerImgs' ref="itemSword" alt="logo" />
          <img src={spear} className='hidden playerImgs' ref="itemSpear" alt="logo" />
          <img src={bow} className='hidden playerImgs' ref="itemBow" alt="logo" />
          <img src={boltNorth} className='hidden playerImgs' ref="itemBoltNorth" alt="logo" />
          <img src={boltSouth} className='hidden playerImgs' ref="itemBoltSouth" alt="logo" />
          <img src={boltEast} className='hidden playerImgs' ref="itemBoltEast" alt="logo" />
          <img src={boltWest} className='hidden playerImgs' ref="itemBoltWest" alt="logo" />
          <img src={ammo} className='hidden playerImgs' ref="itemAmmo" alt="logo" />
          <img src={mail1} className='hidden playerImgs' ref="itemMail1" alt="logo" />
          <img src={mail2} className='hidden playerImgs' ref="itemMail2" alt="logo" />
          <img src={mail3} className='hidden playerImgs' ref="itemMail3" alt="logo" />
          <img src={greaves1} className='hidden playerImgs' ref="itemGreaves1" alt="logo" />
          <img src={greaves2} className='hidden playerImgs' ref="itemGreaves2" alt="logo" />
          <img src={greaves3} className='hidden playerImgs' ref="itemGreaves3" alt="logo" />
          <img src={helmet1} className='hidden playerImgs' ref="itemHelmet1" alt="logo" />
          <img src={hpUp} className='hidden playerImgs' ref="itemHpUp" alt="logo" />
          <img src={hpDown} className='hidden playerImgs' ref="itemHpDown" alt="logo" />
          <img src={spdUp} className='hidden playerImgs' ref="itemSpdUp" alt="logo" />
          <img src={spdDown} className='hidden playerImgs' ref="itemSpdDown" alt="logo" />
          <img src={strUp} className='hidden playerImgs' ref="itemStrUp" alt="logo" />
          <img src={strDown} className='hidden playerImgs' ref="itemStrDown" alt="logo" />
          <img src={focusUp} className='hidden playerImgs' ref="itemFocusUp" alt="logo" />
          <img src={focusDown} className='hidden playerImgs' ref="itemFocusDown" alt="logo" />


          <img src={playerImgIdleSheet} className='hidden playerImgs' ref="playerImgIdleSheet" alt="logo" />
          <img src={player2ImgIdleSheet} className='hidden playerImgs' ref="player2ImgIdleSheet" alt="logo" />
          <img src={playerComAImgIdleSheet} className='hidden playerImgs' ref="playerComAImgIdleSheet" alt="logo" />
          <img src={playerComBImgIdleSheet} className='hidden playerImgs' ref="playerComBImgIdleSheet" alt="logo" />

          <img src={playerImgMoveSheet} className='hidden playerImgs' ref="playerImgMoveSheet" alt="logo" />
          <img src={player2ImgMoveSheet} className='hidden playerImgs' ref="player2ImgMoveSheet" alt="logo" />
          <img src={comAImgMoveSheet} className='hidden playerImgs' ref="comAImgMoveSheet" alt="logo" />
          <img src={comBImgMoveSheet} className='hidden playerImgs' ref="comBImgMoveSheet" alt="logo" />

          <img src={player1DefendSheet} className='hidden playerImgs' ref="player1ImgDefendSheet" alt="logo" />
          <img src={player2DefendSheet} className='hidden playerImgs' ref="player2ImgDefendSheet" alt="logo" />
          <img src={comADefendSheet} className='hidden playerImgs' ref="comAImgDefendSheet" alt="logo" />
          <img src={comBDefendSheet} className='hidden playerImgs' ref="comBImgDefendSheet" alt="logo" />

          <img src={player1AttackSheet} className='hidden playerImgs' ref="player1ImgAttackSheet" alt="logo" />
          <img src={player2AttackSheet} className='hidden playerImgs' ref="player2ImgAttackSheet" alt="logo" />
          <img src={comAAttackSheet} className='hidden playerImgs' ref="comAImgAttackSheet" alt="logo" />
          <img src={comBAttackSheet} className='hidden playerImgs' ref="comBImgAttackSheet" alt="logo" />


        </div>
      </React.Fragment>
    )
  }
}

export default App;
