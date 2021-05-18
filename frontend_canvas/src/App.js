import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs
} from '@fortawesome/free-solid-svg-icons';

import logo from './logo.svg';
import floor1 from './assets/floor1.png'
import floor2 from './assets/floor2.png'
import floor3 from './assets/floor3.png'
import floorVoid from './assets/floorVoid.png'
import wall from './assets/wall.png'
import wall2 from './assets/wall2.png'
import wall3 from './assets/wall3.png'

import playerImgIdleNorth from './assets/player/idle/playerImgNorth.png'
import playerImgIdleNorthWest from './assets/player/idle/playerImgNorthWest.png'
import playerImgIdleNorthEast from './assets/player/idle/playerImgNorthEast.png'
import playerImgIdleWest from './assets/player/idle/playerImgWest.png'
import playerImgIdleEast from './assets/player/idle/playerImgEast.png'
import playerImgIdleSouth from './assets/player/idle/playerImgSouth.png'
import playerImgIdleSouthWest from './assets/player/idle/playerImgSouthWest.png'
import playerImgIdleSouthEast from './assets/player/idle/playerImgSouthEast.png'

import player2ImgIdleNorth from './assets/player/idle/player2ImgNorth.png'
import player2ImgIdleNorthWest from './assets/player/idle/player2ImgNorthWest.png'
import player2ImgIdleNorthEast from './assets/player/idle/player2ImgNorthEast.png'
import player2ImgIdleWest from './assets/player/idle/player2ImgWest.png'
import player2ImgIdleEast from './assets/player/idle/player2ImgEast.png'
import player2ImgIdleSouth from './assets/player/idle/player2ImgSouth.png'
import player2ImgIdleSouthWest from './assets/player/idle/player2ImgSouthWest.png'
import player2ImgIdleSouthEast from './assets/player/idle/player2ImgSouthEast.png'

import attackInidcate from './assets/indicators/attack.png';
import attackSuccessInidcate from './assets/indicators/attackSuccess.png';
import defendInidcate from './assets/indicators/defend.png';
import deflectInidcate from './assets/indicators/deflect.png';
import deflectInjuredInidcate from './assets/indicators/deflectInjured2.png';
import pushbackInidcate from './assets/indicators/pushback.png';
import ghostInidcate from './assets/indicators/ghost.png';
import deathInidcate from './assets/indicators/death.png';
import preAttackInidcate from './assets/indicators/preAttack.png';

import plyr1IdleNorth from './assets/player/idle2/idleNorth1.png';
import plyr1IdleSouth from './assets/player/idle2/idleSouth1.png';
import plyr1IdleEast from './assets/player/idle2/idleEast1.png';
import plyr1IdleWest from './assets/player/idle2/idleWest1.png';
import plyr1IdleNorthEast from './assets/player/idle2/idleNorthEast1.png';
import plyr1IdleNorthWest from './assets/player/idle2/idleNorthWest1.png';
import plyr1IdleSouthWest from './assets/player/idle2/idleSouthWest1.png';
import plyr1IdleSouthEast from './assets/player/idle2/idleSouthEast1.png';

import plyr1AttackNorth from './assets/player/attack/attackNorth1.png';
import plyr1AttackSouth from './assets/player/attack/attackSouth1.png';
import plyr1AttackEast from './assets/player/attack/attackEast1.png';
import plyr1AttackWest from './assets/player/attack/attackWest1.png';
import plyr1AttackNorthEast from './assets/player/attack/attackNorthEast1.png';
import plyr1AttackNorthWest from './assets/player/attack/attackNorthWest1.png';
import plyr1AttackSouthWest from './assets/player/attack/attackSouthWest1.png';
import plyr1AttackSouthEast from './assets/player/attack/attackSouthEast1.png';


import './App.css';

import DebugBox from './debugBox'
import Settings from './settings'

import pointInPolygon from 'point-in-polygon';

class App extends Component {
  state = {
    players: [
      {
        number: 1,
        startPosition: {
          cell: {
            number: {
              x: 1,
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
          void: false
        },
        direction: 'east',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
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
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        attacking: {
          state: false,
          count: 0,
          limit: 15,
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
            limit: 15,
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
          limit: 5,
        },
        falling: {
          state: false,
          count: 0,
          limit: 5,
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
          armor: [],
          ammo: 0,
        },
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
          pushBack: 3,
        },
        statusDisplay: {
          state: false,
          status: '',
          count: 0,
          limit: 15,
        },
      },
      {
        number: 2,
        startPosition: {
          cell: {
            number: {
              x: 1,
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
          void: false
        },
        direction: 'east',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
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
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        attacking: {
          state: false,
          count: 0,
          limit: 15,
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
            limit: 15,
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
          limit: 5,
        },
        falling: {
          state: false,
          count: 0,
          limit: 5,
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
          armor: [],
          ammo: 0,
        },
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
          pushBack: 3,
        },
        statusDisplay: {
          state: false,
          status: '',
          count: 0,
          limit: 15,
        },
      }
    ],
    showSettings: true,
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
    }
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

    // this.canvasWidth = 1100;
    // this.canvasHeight = 600;
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


    this.gamepad = false;

    this.gridInfo = [];
    this.gridInfo2D = [];
    this.gridInfo2 = [];
    this.gridInfo2D2 = [];
    this.levelData =
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
    this.levelData12 = {
      row0: ['x00x','y01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x','x010x','x011x','x012x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x','x110x','x111x','x112x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x','x210x','x211x','x212x'],
      row3: ['x30x','x31x','x32x','y33x','x34x','x35x','x36x','x37x','x38x','x39x','x310x','x311x','x312x'],
      row4: ['x40x','x41x','x42x','x43x','y44x','x45x','x46x','x47x','x48x','z49x','x410x','x411x','x412x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x','x510x','x511x','x512x'],
      row6: ['x60x','y61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x','x610x','x611x','x612x'],
      row7: ['x70x','y71x','x72x','x73x','x74x','x75x','x76x','y77x','x78x','x79x','x710x','x711x','x712x'],
      row8: ['x80x','x81x','x82x','x83x','y84x','x85x','y86x','x87x','x88x','x89x','x810x','x811x','x812x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x','x910x','x911x','x912x'],
      row10: ['x100x','x101x','x102x','x103x','x104x','x105x','x106x','x107x','x108x','x109x','x1010x','x1011x','x1012x'],
      row11: ['x110x','x111x','x112x','x113x','x114x','x115x','x116x','x117x','x118x','x119x','x1110x','x1111x','x1112x'],
      row12: ['x120x','x121x','x122x','x123x','x124x','x125x','x126x','x127x','x128x','x129x','x1210x','x1211x','x1212x'],
    };
    this.levelData9 = {
      row0: ['x00x','y01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','x42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','x61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
      row7: ['x70x','x71x','x72x','x73x','x74x','x75x','x76x','y77x','x78x','x79x'],
      row8: ['x80x','x81x','x82x','x83x','y84x','x85x','y86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    };
    this.levelData6 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','y33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','x42x','x43x','y44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','y61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
    };
    this.levelData3 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
    };
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
        effect: 'hit-10',
      },
      {
        name: 'chainMail',
        amount: 3,
        total: 3,
        type: 'armor',
        subType: 'mail',
        effect: 'hpUp',
      },
      {
        name: 'ninjaMail',
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
      {
        name: 'moveSpeedUp',
        type: 'item',
        effect: '',
      },
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
      // {
      //   name: 'spear1',
      //   type: 'weapon',
      //   subType: 'spear',
      //   effect: '',
      // },
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
    this.currentPlayer = 1;
    this.players = [
      {
        number: 1,
        startPosition: {
          cell: {
            number: {
              x: 1,
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
          void: false
        },
        direction: 'east',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
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
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        attacking: {
          state: false,
          count: 0,
          limit: 15,
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
            limit: 15,
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
          limit: 5,
        },
        falling: {
          state: false,
          count: 0,
          limit: 5,
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
          armor: [],
          ammo: 0,
        },
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
          pushBack: 3,
        },
        statusDisplay: {
          state: false,
          status: '',
          count: 0,
          limit: 15,
        },
      },
      {
        number: 2,
        startPosition: {
          cell: {
            number: {
              x: 8,
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
        direction: 'north',
        turning: {
          state: undefined,
          toDirection: '',
          delayCount: 0,
          limit: 2.1,
        },
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
        strafing: {
          state: false,
          direction: '',
        },
        strafeReleaseHook: false,
        attacking: {
          state: false,
          count: 0,
          limit: 15,
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
            limit: 15,
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
          limit: 5,
        },
        defended: {
          state: false
        },
        falling: {
          state: false,
          count: 0,
          limit: 5,
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
          pushBack: 3,
        },
        statusDisplay: {
          state: false,
          status: '',
          count: 0,
          limit: 15,
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
      },
    ]
    this.clicked = {
      cell: {
        number: {
          x: 0,
          y: 0,
        }
      }
    }
    this.turnCheckerDirection = '';
    this.projectiles = [];
    this.projectileSpeed = .1;
    this.cellsUnderAttack = [];

  }



  componentDidMount() {


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


    this.refs.plyr1IdleNorthEast.onload = () => {
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

  // let joyPadCount = gamepads.length;
  let connectedGamepads = 0;
  if (gamepads[0] !== null) {
    connectedGamepads = 1;
    if (gamepads[1] !== null) {
      connectedGamepads = 2
    }
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
    },
  ]


  for(let g = 0; g < gamepads.length; g++) {
    const gp = gamepads[g];

    if (!!gp) {

      // CHECK BUTTONS!!
      for (const btn of gp.buttons) {
        if (btn.pressed === true ) {

          if (connectedGamepads === 1) {

            if (
              gp.buttons.indexOf(btn) === 0 ||
              gp.buttons.indexOf(btn) === 1 ||
              gp.buttons.indexOf(btn) === 2 ||
              gp.buttons.indexOf(btn) === 3 ||
              gp.buttons.indexOf(btn) === 4 ||
              gp.buttons.indexOf(btn) === 5 ||
              gp.buttons.indexOf(btn) === 6 ||
              gp.buttons.indexOf(btn) === 7 ||
              gp.buttons.indexOf(btn) === 8 ||
              gp.buttons.indexOf(btn) === 9
            ) {
              console.log('1 player btn',gp.buttons.indexOf(btn));
              console.log('gamepads', gp.id.substr(0,7));
            }

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

              this.currentPlayer = 1;
            }
            // UP BTN
            if (gp.buttons.indexOf(btn) === 3) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].strafe = true;
              this.players[0].strafing.state = true;
              this.currentPlayer = 1;
            }

            // LEFT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 4) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));

              this.currentPlayer = 1;
            }
            // RIGHT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 5) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));

              this.currentPlayer = 1;
            }
            // MINUS BTN
            if (gp.buttons.indexOf(btn) === 9) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              if (this.players[0].dead.state === true) {
                this.respawn(this.players[0])
              }
            }

          }

          if (connectedGamepads === 2) {

            // if (
            //   gp.buttons.indexOf(btn) === 4 ||
            //   gp.buttons.indexOf(btn) === 6 ||
            //   gp.buttons.indexOf(btn) === 8 ||
            //   gp.buttons.indexOf(btn) === 12 ||
            //   gp.buttons.indexOf(btn) === 13 ||
            //   gp.buttons.indexOf(btn) === 14 ||
            //   gp.buttons.indexOf(btn) === 15 ||
            //   gp.buttons.indexOf(btn) === 18 ||
            //   gp.buttons.indexOf(btn) === 19
            // ) {
            //   console.log('2 players btn player 1',gp.buttons.indexOf(btn));
            // }

            // DOWN BTN
            if (gp.buttons.indexOf(btn) === 14) {
              // console.log('1 player attack held',gp.buttons.indexOf(btn));
              keyPressed[0].attack = true;
              this.currentPlayer = 1;
            }
            // RIGHT BTN
            if (gp.buttons.indexOf(btn) === 13) {
              // console.log('1 player defend held',gp.buttons.indexOf(btn));
              keyPressed[0].defend = true;
              this.currentPlayer = 1;
            }
            // UP BTN
            if (gp.buttons.indexOf(btn) === 15) {
              keyPressed[0].strafe = true;
              this.players[0].strafing.state = true;
              this.currentPlayer = 1;
            }
            // RIGHT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 19) {
              if (this.players[0].dead.state === true) {
                this.respawn(this.players[0])
              }
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
              console.log('2 players btn player 2',gp.buttons.indexOf(btn));
            }

            // RIGHT SHLDR BTN
            if (gp.buttons.indexOf(btn) === 21) {
              if (this.players[1].dead.state === true) {
                this.respawn(this.players[1])
              }
            }


          }
        }
      }

      // CHECK AXES!!
      if (connectedGamepads === 1) {

        if (gp.axes[0]!== 0 && gp.axes[1] !== 0) {

          if (gp.axes[0] < 0 && gp.axes[1] < 0) {
            // console.log('1',gp.axes[0],gp.axes[1]);
            // this.keyPressed[0].west = true;
            keyPressed[0].west = true;
            this.turnCheckerDirection = 'west';
            this.currentPlayer = 1;


          }
          if (gp.axes[0] > 0 && gp.axes[1] > 0) {
            // console.log('2',gp.axes[0],gp.axes[1]);
            // this.keyPressed[0].east = true;
            keyPressed[0].east = true;
            this.turnCheckerDirection = 'east';
            this.currentPlayer = 1;


          }
          if (gp.axes[0] < 0 && gp.axes[1] > 0) {
            // console.log('3',gp.axes[0],gp.axes[1]);
            // this.keyPressed[0].south = true;
            keyPressed[0].south = true;
            this.turnCheckerDirection = 'south';
            this.currentPlayer = 1;


          }
          if (gp.axes[0] > 0 && gp.axes[1] < 0) {
            // console.log('4',gp.axes[0],gp.axes[1]);
            // this.keyPressed[0].north = true;
            keyPressed[0].north = true;
            this.turnCheckerDirection = 'north';
            this.currentPlayer = 1;


          }

        }

      }

      if (connectedGamepads === 2) {

        if (gp.axes[0]!== 0 && gp.axes[1] !== 0) {
          // console.log('player 1 stick')
          if (gp.axes[0] < 0 && gp.axes[1] < 0) {
            // console.log('player 1 stick: 1',gp.axes[0],gp.axes[1]);
            keyPressed[0].south = true;
            this.turnCheckerDirection = 'south';
            this.currentPlayer = 1;
          }
          if (gp.axes[0] > 0 && gp.axes[1] > 0) {
            // console.log('player 1 stick: 2',gp.axes[0],gp.axes[1]);
            keyPressed[0].north = true;
            this.turnCheckerDirection = 'north';
            this.currentPlayer = 1;
          }
          if (gp.axes[0] < 0 && gp.axes[1] > 0) {
            // console.log('player 1 stick: 3',gp.axes[0],gp.axes[1]);
            keyPressed[0].east = true;
            this.turnCheckerDirection = 'east';
            this.currentPlayer = 1;
          }
          if (gp.axes[0] > 0 && gp.axes[1] < 0) {
            // console.log('player 1 stick: 4',gp.axes[0],gp.axes[1]);
            keyPressed[0].west = true;
            this.turnCheckerDirection = 'west';
            this.currentPlayer = 1;
          }
        }

        if (gp.axes[2]!== 0 && gp.axes[3] !== 0) {
          // console.log('right stick')
          if (gp.axes[2] < 0 && gp.axes[3] < 0) {
            // console.log('player 2 stick: 1',gp.axes[2],gp.axes[3]);
            keyPressed[1].north = true;
            this.turnCheckerDirection = 'north';
            this.currentPlayer = 2;
          }
          if (gp.axes[2] > 0 && gp.axes[3] > 0) {
            // console.log('player 2 stick: 2',gp.axes[2],gp.axes[3]);
            keyPressed[1].south = true;
            this.turnCheckerDirection = 'south';
            this.currentPlayer = 2;
          }
          if (gp.axes[2] < 0 && gp.axes[3] > 0) {
            // console.log('player 2 stick: 3',gp.axes[2],gp.axes[3]);
            keyPressed[1].west = true;
            this.turnCheckerDirection = 'west';
            this.currentPlayer = 2;
          }
          if (gp.axes[2] > 0 && gp.axes[3] < 0) {
            // console.log('player 2 stick: 4',gp.axes[2],gp.axes[3]);
            keyPressed[1].east = true;
            this.turnCheckerDirection = 'east';
            this.currentPlayer = 2;
          }
        }
      }
    }
  }



  if (
    keyPressed[0].strafe === false &&
    this.players[0].moving.state === true &&
    this.players[0].strafing.state === true
  ) {
    this.players[0].strafeReleaseHook = true
  }
  else {
    this.keyPressed[0].strafe = true;
    this.players[0].strafing.state = true;
    this.currentPlayer = 1;
  }

  // if (
  //   state === false &&
  //   this.players[1].moving.state === true &&
  //   this.players[1].strafing.state === true
  // ) {
  //   this.players[1].strafeReleaseHook = true
  // }
  // else {
  //   this.keyPressed[1].strafe = state;
  //   this.players[1].strafing.state = state;
  //   this.currentPlayer = 2;
  // }

  this.keyPressed = keyPressed;


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

    // const canvas = this.canvasRef.current;
    // const canvas2 = this.canvasRef2.current;

    // canvas.addEventListener("click", e => {
    //   console.log('canvas click',e);
    //   // this.drawBall();
    // });

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
    // 222 is distance from canvas edge to left or right window border

    const x = (event.clientX - rect.left) - 222;
    const y = (event.clientY - rect.top) - 158;
    let insideGrid = false;
    // console.log('clicked',x,y,);

    for(const cell of this.gridInfo) {
      let point = [x,y];
      let polygon = [];
      for (const vertex of cell.vertices) {
        let vertexPoint = [vertex.x-10,vertex.y-5];
        // let vertexPoint = [vertex.x,vertex.y];
        polygon.push(vertexPoint)
      }
      let pip = pointInPolygon(point, polygon)
      if (pip === true) {
        insideGrid = true;
        console.log("clicked a cell",cell.number,"x: " + x + " y: " + y);
      }
    }
    if ( insideGrid === false ) {
      console.log("clicked the canvas", 'x: ',x,'y: ',y);
    }

  }
  handleKeyPress = (event, state) => {

    // console.log('handling key press', event.key, state);

    let direction;
    let keyInput = event.key

    switch(keyInput) {
      case 'q' :
       this.keyPressed[0].northWest = state;
       // direction = 'northWest';
       this.turnCheckerDirection = 'northWest';
       this.currentPlayer = 1;
      break;
      case 'w' :
       this.keyPressed[0].north = state;
       // direction = 'north';
       this.turnCheckerDirection = 'north';
       this.currentPlayer = 1;
      break;
      case 'e' :
       this.keyPressed[0].northEast = state;
       // direction = 'northEast';
       this.turnCheckerDirection = 'northEast';
       this.currentPlayer = 1;
      break;
      case 'a' :
       this.keyPressed[0].west = state;
       // direction = 'west';
       this.turnCheckerDirection = 'west';
       this.currentPlayer = 1;
      break;
      case 'd' :
       this.keyPressed[0].east = state;
       // direction = 'east';
       this.turnCheckerDirection = 'east';
       this.currentPlayer = 1;
      break;
      case 's' :
       this.keyPressed[0].south = state;
       // direction = 'south';
       this.turnCheckerDirection = 'south';
       this.currentPlayer = 1;
      break;
      case 'z' :
       this.keyPressed[0].southWest = state;
       // direction = 'southWest';
       this.turnCheckerDirection = 'southWest';
       this.currentPlayer = 1;
      break;
      case 'c' :
       this.keyPressed[0].southEast = state;
       // direction = 'southEast';
       this.turnCheckerDirection = 'southEast';
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
          state == false &&
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


      // case 'p' :
      //  this.openVoid = !this.openVoid;
      // break;


      case 'u' :
       this.keyPressed[1].northWest = state;
       // direction = 'northWest';
       this.turnCheckerDirection = 'northWest';
       this.currentPlayer = 2;
      break;
      case 'i' :
       this.keyPressed[1].north = state;
       // direction = 'north';
       this.turnCheckerDirection = 'north';
       this.currentPlayer = 2;
      break;
      case 'o' :
       this.keyPressed[1].northEast = state;
       // direction = 'northEast';
       this.turnCheckerDirection = 'northEast';
       this.currentPlayer = 2;
      break;
      case 'j' :
       this.keyPressed[1].west = state;
       // direction = 'west';
       this.turnCheckerDirection = 'west';
       this.currentPlayer = 2;
      break;
      case 'k' :
       this.keyPressed[1].south = state;
       // direction = 'south';
       this.turnCheckerDirection = 'south';
       this.currentPlayer = 2;
      break;
      case 'l' :
       this.keyPressed[1].east = state;
       // direction = 'east';
       this.turnCheckerDirection = 'east';
       this.currentPlayer = 2;
      break;
      case 'm' :
       this.keyPressed[1].southWest = state;
       // direction = 'southWest';
       this.turnCheckerDirection = 'southWest';
       this.currentPlayer = 2;
      break;
      case '.' :
       this.keyPressed[1].southEast = state;
       // direction = 'southEast';
       this.turnCheckerDirection = 'southEast';
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

    // for (const player of this.players) {
    //   this.playerUpdate(player, this.state.canvas, this.state.context);
    // }

  }

  loadSettings = (event) => {

    let gridSize = event.target.gridSize.value;
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
      showSettings: false
    })

  }
  cancelSettings = () => {
    this.setState({
      showSettings: false
    })
  }
  openSettings = () => {
    this.setState({
      showSettings: true
    })
  }

  gameLoop = () => {


    let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    this.stepper.currentTime = (new Date()).getTime();
    this.stepper.deltaTime = (this.stepper.currentTime-this.stepper.lastTime);

    if(this.stepper.deltaTime > this.stepper.interval) {
      // console.log('update loop step...dt',this.stepper.deltaTime,'interval',this.stepper.interval);
      this.time++

      // this.aiAct();
      if (this.gamepad === true) {
        this.pollGamepads();
      }
      for (const player of this.players) {

        // this.pollGamepads()
        this.playerUpdate(player, this.canvas, this.state.context);

      }

      this.stepper.lastTime = this.stepper.currentTime - (this.stepper.deltaTime % this.stepper.interval);
    }
    requestAnimationFrame(this.gameLoop);
  }

  playerUpdate = (player, canvas, context) => {
    // console.log('updating player',player.number);

    let keyPressedDirection;
    for (const [key, value] of Object.entries(this.keyPressed[player.number-1])) {
      // console.log(`${key}: ${value} ....${player.number}`);


      // if (this.keyPressed[player.number-1].north === true && this.keyPressed[player.number-1].west === true) {
      //   console.log('double diagonal press');
      //   this.keyPressed[player.number-1].northWest = true;
      //   this.turnCheckerDirection = 'northWest';
      // }
      // else if (player.turning.state === true && player.turning.toDirection === 'northWest') {
      //   if (this.keyPressed[player.number-1].north === false || this.keyPressed[player.number-1].west === false) {
      //     console.log('double diagonal release');
      //     this.keyPressed[player.number-1].northWest = false;
      //     // this.turnCheckerDirection = 'northWest';
      //   }
      // }


      if (
        key !== 'strafe' &&
        key !== 'attack' &&
        key !== 'defend' &&
        value === true
      ) {
        // console.log('pressed',key);
        keyPressedDirection = key;
      }

    }



    let nextPosition;


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

        }

      }

    }
    if (this.voidTimer.count < this.voidTimer.limit) {
      this.voidTimer.count++
      // console.log('void count',this.voidTimer.count);
    }
    if (this.voidTimer.count >= this.voidTimer.limit) {
      this.openVoid = false;
      // console.log('void off');
    }


    // CHECK AND SET DEFLECTION!!
    if (player.success.deflected.state === true && player.success.deflected.count < player.success.deflected.limit) {
      player.success.deflected.count++
    } else if (player.success.deflected.state === true && player.success.deflected.count >= player.success.deflected.limit) {
      player.success.deflected = {
        state: false,
        count: 0,
        limit: player.success.deflected.limit,
        predeflect: player.success.deflected.predeflect,
        type: '',
      }

      this.deflectDrop(player)
    }


    // DEFLECTED PLAYER CAN'T DO ANYTHING!!
    if (player.success.deflected.state === false) {


      // DON'T READ INPUTS. JUST MOVE!!
      if (player.moving.state === true) {

        // console.log('player',player.number,' moving');
        nextPosition = this.lineCrementer(player);
        // player.currentPosition.cell = player.target.cell;
        player.nextPosition = nextPosition;

        // if (player.speed.move !== .1 && player.pushBack.state !== true) {
          // console.log('abnormal move speed');
          if (
            nextPosition.x === player.target.cell.center.x &&
            nextPosition.y === player.target.cell.center.y ||
            nextPosition.x === player.target.cell.center.x+5 &&
            nextPosition.y === player.target.cell.center.y+5
          ) {
            // console.log('next position is destination a',player.number);
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

              this.checkDestination(player);

            }

            if (player.pushBack.state === true && player.target.void !== true) {
              player.pushBack.state = false;
              player.strafing = {
                state: false,
                direction: ''
              }
              player.moving.state = false;
            }

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


      // CAN READ INPUTS
      else if (player.moving.state === false) {


        // TURNER!!
        if (player.turning.state === true && player.turning.toDirection === this.turnCheckerDirection) {
          // console.log('player',player.number,' turn-ing');
          if (this.keyPressed[this.currentPlayer-1][this.turnCheckerDirection] === false) {
            // console.log('player',player.number,' turn-stop');
            player.turning.state = false;
          }
        }


        // DEBUFF CHECKS!!
        // if (player.hp === 1 && player.speed.move > .05) {
        //
        //   player.speed.move = .05;
        // }


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


        // KEY PRESS RELEASE CHECKS!!
        if (player.turning.state === false) {
          // console.log('turn complete');
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
          player.action = 'idle';
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

        if (player.dead.state === true) {

          if (player.dead.count > 0 && player.dead.count < player.dead.limit+1) {
            player.dead.count++
            // console.log('player dying',player.dead.count);
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


        // ATTACK/DEFEND/DEFLECT CHECK!!
        if (player.attacking.state === true) {
          if (player.attacking.count < player.attacking.limit) {
            // console.log('attack wind up');
            player.attacking.count++;
          }
          if (player.attacking.count === 8) {
            // console.log('attack peak & cooldown');

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
              console.log('no ammo!');
              this.players[player.number-1].statusDisplay = {
                state: true,
                status: 'out of ammo',
                count: 1,
                limit: this.players[player.number-1].statusDisplay.limit,
              }
              player.currentWeapon.effect = 'ammo+0'

            }
            else if (player.currentWeapon.type !== 'crossbow') {

              this.getTarget(player)

              // CELLS UNDER ATTACK!
              if (player.currentWeapon.type === 'spear') {
                // console.log('spear target',player.target);
                this.cellsUnderAttack.push(
                  {
                    number: {
                      x: player.target.cell.number.x,
                      y: player.target.cell.number.y,
                    },
                    count: 1,
                    limit: 8,
                  },
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
              else if (player.currentWeapon.type === 'sword') {
                // console.log('sword target',player.target);
                this.cellsUnderAttack.push({
                  number: {
                    x: player.target.cell.number.x,
                    y: player.target.cell.number.y,
                  },
                  count: 1,
                  limit: 8,
                })
              }


              if (player.target.occupant.type === 'player') {

                // ATTACK SUCCESS!!
                if (this.players.[player.target.occupant.player-1].defending.state === false) {
                  // console.log('attack success');
                  player.success.attackSuccess = {
                    state: true,
                    count: 1,
                    limit: player.success.attackSuccess.limit
                  }


                  // CALCULATE ATTACKER DOUBLE HIT!
                  let doubleHitChance = player.crits.doubleHit;
                  let singleHitChance = player.crits.singleHit;

                  if (this.players.[player.target.occupant.player-1].currentArmor.name !== '') {
                    // console.log('opponent armour found');
                    switch(this.players.[player.target.occupant.player-1].currentArmor.effect) {
                      case 'dblhit-10' :
                        doubleHitChance = player.crits.doubleHit+10;
                      break;
                      case 'dblhit-20' :
                        doubleHitChance = player.crits.doubleHit+20;
                      break;
                      case 'dblhit-30' :
                        doubleHitChance = player.crits.doubleHit+30;
                      break;
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
                  if (doubleHit === 1) {
                    console.log('double hit attack');
                    this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 2;
                  }
                  else if (singleHit === 1) {
                    console.log('single hit attack');
                    this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 1;
                  }
                  else if (doubleHit !== 1 && singleHit !== 1) {
                    console.log('attacked but no damage');

                    this.players[player.number-1].statusDisplay = {
                      state: true,
                      status: 'attack missed!',
                      count: 1,
                      limit: this.players[player.number-1].statusDisplay.limit,
                    }
                  }

                  if (this.players[player.target.occupant.player-1].hp === 1) {
                    this.players[player.target.occupant.player-1].speed.move = .05;
                  }

                  // KILL OR DEFLECT OPPONENT!
                  if (this.players[player.target.occupant.player-1].hp <= 0) {
                    this.killPlayer(this.players[player.target.occupant.player-1]);

                    let randomItemIndex = this.rnJesus(0,this.itemList.length-1)
                    this.placeItems({init: false, item: this.itemList[randomItemIndex].name})


                  }
                  else {
                    this.players[player.target.occupant.player-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.players[player.target.occupant.player-1].success.deflected.limit,
                      predeflect: this.players[player.target.occupant.player-1].success.deflected.predeflect,
                      type: 'attacked',
                    };
                  }

                  player.points++;

                }
                // ATTACK DEFENDED!!
                else {
                  // console.log('attackdefended');

                  this.moveSpeed = .1;

                  this.players[player.target.occupant.player-1].success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players[player.target.occupant.player-1].success.defendSuccess.limit
                  }

                  let shouldPushBack = this.rnJesus(1,this.players[player.target.occupant.player-1].crits.pushBack);
                  // console.log('pushBack',shouldPushBack===1);
                  if (shouldPushBack === 1) {
                    let canPushback = this.pushBack(this.players[player.target.occupant.player-1],player.direction);
                  }
                  else {
                    // let deflectOpponent = this.rnJesus(1,1);
                    let deflectOpponent = this.rnJesus(1,this.players[player.target.occupant.player-1].crits.pushBack);
                    if (deflectOpponent === 1) {
                      this.players[player.target.occupant.player-1].success.deflected = {
                        state: true,
                        count: 1,
                        limit: this.players[player.target.occupant.player-1].success.deflected.limit,
                        predeflect: this.players[player.target.occupant.player-1].success.deflected.predeflect,
                        type: 'defended',
                      };
                    }
                  }

                  // PUSHBACK DEFLECT!!
                  let shouldDeflectPushBack = this.rnJesus(1,player.crits.pushBack);
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
                    if (canPushback === true) {
                      // console.log('predeflect --> pushback');
                      player.success.deflected.predeflect = true;
                    }
                    else if (canPushback === false) {
                      // console.log('no pushback ---> just deflect');
                      player.success.deflected = {
                        state: true,
                        count: 1,
                        limit: player.success.deflected.limit,
                        predeflect: player.success.deflected.predeflect,
                        type: 'attack'
                      }
                    }
                  }
                  else if (shouldDeflectPushBack !== 1) {
                    // console.log('no pushback ---> just deflect');
                    player.success.deflected = {
                      state: true,
                      count: 1,
                      limit: player.success.deflected.limit,
                      predeflect: player.success.deflected.predeflect,
                      type: 'attack'
                    }
                  }

                }
              }

            }

          }
          if (player.attacking.count >= player.attacking.limit) {
            // console.log('attack end');

            player.attacking = {
              state: false,
              count: 0,
              limit: player.attacking.limit
            }
            player.action = 'idle';
          }
        }

        // DEFENSE DELAY!!
        if (player.defending.count > 0 && player.defending.count < player.defending.limit+1) {
          player.defending.count++;
          // console.log('defend winding up',player.defending.count++, 'player',player.number);
        } else if (player.defending.count >= player.defending.limit && player.defending.state === false) {
          // console.log('defend wind up limit cap','player',player.number);
          player.action = 'defending';
          player.defending = {
            state: true,
            count: 0,
            limit: player.defending.limit,
          }
        }

        // COMPLETE PUSHBACK DEFLECT FLOW!
        if (player.pushBack.state === false && player.success.deflected.predeflect === true && player.moving.state === false) {
          // console.log('predefelct --> pushback ---> deflect');
          player.success.deflected = {
            state: true,
            count: 1,
            limit: player.success.deflected.limit,
            predeflect: false,
            type: player.success.deflected.type,
          }
        }


        // WEAPON/ARMOR CYCLE CHECK!!

        if (this.keyPressed[player.number-1].cycleWeapon === true && player.cycleWeapon.state === false) {
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
              console.log('nothing to cycle through');
            }

            player.cycleWeapon = {
              state: false,
              count: 0,
              limit: player.cycleWeapon.limit,
            }
          }

        }
        else if (this.keyPressed[player.number-1].cycleWeapon === true && player.cycleWeapon.state === true) {
          console.log('already cycling weapon');
        }

        if (this.keyPressed[player.number-1].cycleArmor === true && player.cycleArmor.state === false) {
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
                    console.log('kk',player.speed.move,'kk',currentSpd1,currentSpd1-1);
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
                    console.log('kk',player.speed.move,'kk',currentSpd2,currentSpd2+1);

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
              console.log('nothing to cycle through');
            }

            player.cycleArmor = {
              state: false,
              count: 0,
              limit: player.cycleArmor.limit,
            }

          }
        }
        else if (this.keyPressed[player.number-1].cycleArmor === true && player.cycleArmor.state === true) {
          console.log('already cycling armor');
        }



        // CAN READ MOVE INPUTS!!
        if (player.attacking.state === false && player.defending.state === false) {
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
              if (this.keyPressed[player.number-1].attack === true && player.success.deflected.state !== true) {
                // console.log('start attacking');
                // console.log('pre attack');

                if (player.currentWeapon.name === '') {
                  player.statusDisplay = {
                    state: true,
                    status: "No weapon. Can't attack",
                    count: 1,
                    limit: player.statusDisplay.limit,
                  }
                } else {
                  player.action = 'attacking';
                  player.attacking = {
                    state: true,
                    count: 1,
                    limit: player.attacking.limit,
                  }
                }

              }
              if (this.keyPressed[player.number-1].defend === true) {
                // console.log('start defending',player.number);

                if (
                  player.currentWeapon.name === '' &&
                  player.currentArmor.name === ''
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

                if (this.players.[plyr.number-1].defending.state === false) {
                  // console.log('attack success');
                  this.players[bolt.owner-1].success.attackSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players[bolt.owner-1].success.attackSuccess.limit
                  }


                  // CALCULATE ATTACKER DOUBLE HIT!
                  let doubleHitChance = this.players[bolt.owner-1].crits.doubleHit;
                  let singleHitChance = this.players[bolt.owner-1].crits.singleHit;

                  if (this.players.[plyr.number-1].currentArmor.name !== '') {
                    // console.log('opponent armour found');
                    switch(this.players.[plyr.number-1].currentArmor.effect) {
                      case 'dblhit-10' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+10;
                      break;
                      case 'dblhit-20' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+20;
                      break;
                      case 'dblhit-30' :
                        doubleHitChance = this.players[bolt.owner-1].crits.doubleHit+30;
                      break;
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
                  if (doubleHit === 1) {
                    console.log('double hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 2;
                  }
                  else if (singleHit === 1) {
                    console.log('single hit attack');
                    this.players[plyr.number-1].hp = this.players[plyr.number-1].hp - 1;
                  }
                  else if (doubleHit !== 1 && singleHit !== 1) {
                    console.log('attacked but no damage');

                    this.players[bolt.owner-1].statusDisplay = {
                      state: true,
                      status: 'attack missed!',
                      count: 1,
                      limit: this.players[bolt.owner-1].statusDisplay.limit,
                    }
                  }

                  if (this.players.[plyr.number-1].hp <= 0) {
                    this.killPlayer(this.players.[plyr.number-1]);

                    let randomItemIndex = this.rnJesus(0,this.itemList.length-1)
                    this.placeItems({init: false, item: this.itemList[randomItemIndex].name})

                  }
                  else {
                    this.players.[plyr.number-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.players.[plyr.number-1].success.deflected.limit,
                      predeflect: this.players.[plyr.number-1].success.deflected.predeflect,
                      type: 'attacked',
                    };
                  }

                  this.players[bolt.owner-1].points++;

                }
                // ATTACK DEFENDED!!
                else {
                  // console.log('bullet doged');

                  this.players.[plyr.number-1].success.defendSuccess = {
                    state: true,
                    count: 1,
                    limit: this.players.[plyr.number-1].success.defendSuccess.limit
                  }

                  // let deflectOpponent = this.rnJesus(1,3);
                  let deflectOpponent = this.rnJesus(1,this.players[plyr.number-1].crits.pushBack);
                  if (deflectOpponent === 1) {
                    this.players[plyr.number-1].success.deflected = {
                      state: true,
                      count: 1,
                      limit: this.players[plyr.number-1].success.deflected.limit,
                      predeflect: this.players[plyr.number-1].success.deflected.predeflect,
                      type: 'defended',
                    };
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


    // SYNC W/ GLOBAL PLAYER DATA
    this.players[player.number-1] = player;
    let players = this.state.players;
    players[player.number-1] = player;
    this.setState({
      players: players
    })

    this.drawPlayerStep(player.number, canvas, context);

  }

  drawPlayerStep = (playerNumber) => {
    // console.log('drawing player step',playerNumber);

    let canvas = this.state.canvas;
    let context = this.state.context;
    let canvas2 = this.state.canvas2;
    let context2 = this.state.context2;

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
      attack: this.refs.attackIndicate,
      attackSuccess: this.refs.attackSuccessIndicate,
      defend: this.refs.defendIndicate,
      deflect: this.refs.deflectIndicate,
      deflectInjured: this.refs.deflectInjuredIndicate,
      pushback: this.refs.pushbackIndicate,
      ghost: this.refs.ghostIndicate,
      death: this.refs.deathIndicate,
    }
    let playerImgs = [
      {
        // idle: {
        //   north: this.refs.plyr1IdleNorth,
        //   northWest: this.refs.plyr1IdleNorthWest,
        //   northEast: this.refs.plyr1IdleNorthEast,
        //   south: this.refs.plyr1IdleSouth,
        //   southWest: this.refs.plyr1IdleSouthWest,
        //   southEast: this.refs.plyr1IdleSouthEast,
        //   east: this.refs.plyr1IdleEast,
        //   west: this.refs.plyr1IdleWest,
        // },
        idle: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        // walking: {
        //   north: this.refs.plyr1IdleNorth,
        //   northWest: this.refs.plyr1IdleNorthWest,
        //   northEast: this.refs.plyr1IdleNorthEast,
        //   south: this.refs.plyr1IdleSouth,
        //   southWest: this.refs.plyr1IdleSouthWest,
        //   southEast: this.refs.plyr1IdleSouthEast,
        //   east: this.refs.plyr1IdleEast,
        //   west: this.refs.plyr1IdleWest,
        // },
        walking: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        strafing: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        // attacking: {
        //   north: this.refs.plyr1AttackNorth,
        //   northWest: this.refs.plyr1AttackNorthWest,
        //   northEast: this.refs.plyr1AttackNorthEast,
        //   south: this.refs.plyr1AttackSouth,
        //   southWest: this.refs.plyr1AttackSouthWest,
        //   southEast: this.refs.plyr1AttackSouthEast,
        //   east: this.refs.plyr1AttackEast,
        //   west: this.refs.plyr1AttackWest,
        // },
        attacking: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        defending: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        deflected: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
        falling: {
          north: this.refs.playerImgIdleNorth,
          northWest: this.refs.playerImgIdleNorthWest,
          northEast: this.refs.playerImgIdleNorthEast,
          south: this.refs.playerImgIdleSouth,
          southWest: this.refs.playerImgIdleSouthWest,
          southEast: this.refs.playerImgIdleSouthEast,
          east: this.refs.playerImgIdleEast,
          west: this.refs.playerImgIdleWest,
        },
      },
      {
        idle: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        walking: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        strafing: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        attacking: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        defending: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        deflected: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
        falling: {
          north: this.refs.player2ImgIdleNorth,
          northWest: this.refs.player2ImgIdleNorthWest,
          northEast: this.refs.player2ImgIdleNorthEast,
          south: this.refs.player2ImgIdleSouth,
          southWest: this.refs.player2ImgIdleSouthWest,
          southEast: this.refs.player2ImgIdleSouthEast,
          east: this.refs.player2ImgIdleEast,
          west: this.refs.player2ImgIdleWest,
        },
      }
    ]
    let itemImgs = {
      moveSpeedUp: this.refs.preAttackIndicate,
      moveSpeedDown: this.refs.preAttackIndicate,
      hpUp: this.refs.preAttackIndicate,
      hpDown: this.refs.preAttackIndicate,
      focusUp: this.refs.preAttackIndicate,
      focusDown: this.refs.preAttackIndicate,
      strengthDown: this.refs.preAttackIndicate,
      sword: this.refs.preAttackIndicate,
      spear: this.refs.preAttackIndicate,
      crossbow: this.refs.preAttackIndicate,
      helmet: this.refs.preAttackIndicate,
      ammo5: this.refs.preAttackIndicate,
      ammo10: this.refs.preAttackIndicate,
      mail: this.refs.preAttackIndicate,
      greaves: this.refs.preAttackIndicate,
    };
    let terrainImgs = [];

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

        let floor = this.refs.floor2;

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


        let gridInfoCell = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y);
        if (gridInfoCell.void.state === true) {
          drawFloor = false;
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

        context.fillStyle = "green";
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

          context.fillStyle = fillClr;
          context.beginPath();
          context.arc(center.x, center.y, 10, 0, 2 * Math.PI);
          context.fill();

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

        for (const plyr of this.players) {

          let point = {
            x: plyr.nextPosition.x,
            y: plyr.nextPosition.y,
          };
          switch(plyr.action) {

            case 'idle':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].idle.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'moving':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].walking.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'strafe moving':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].strafing.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'falling':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].falling.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'attacking':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].attacking.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'defending':
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].defending.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'deflected' :
              switch(plyr.direction) {
                case 'north' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.north;
                  newDirection = 'north';
                break;
                case 'northWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.northWest;
                  newDirection = 'northWest';
                break;
                case 'northEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.northEast;
                  newDirection = 'northEast';
                break;
                case 'east' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.east;
                  newDirection = 'east';
                break;
                case 'west' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.west;
                  newDirection = 'west';
                break;
                case 'south' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.south;
                  newDirection = 'south';
                break;
                case 'southWest' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.southWest;
                  newDirection = 'southWest';
                break;
                case 'southEast' :
                  updatedPlayerImg = playerImgs[plyr.number-1].deflected.southEast;
                  newDirection = 'southEast';
                break;
              }
            break;
            case 'dead':
              updatedPlayerImg = playerImgs[plyr.number-1].idle.north;
            break;
          }

          if (plyr.target.void === false && plyr.moving.state === true) {
            if (plyr.direction === 'north' || plyr.direction === 'northWest' || plyr.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.direction === 'east' || plyr.direction === 'south' || plyr.direction === 'southEast') {
              if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y,plyr)
              }
            }
            if (plyr.direction === 'northEast') {
              // east edge disappearing bug fix
              if (plyr.target.cell.number.x === this.gridWidth) {
                if (x === this.gridWidth && y === plyr.target.cell.number.y+1) {
                  if (
                    plyr.direction === 'east' ||
                    plyr.direction === 'west' ||
                    plyr.direction === 'north' ||
                    plyr.direction === 'south'
                  ) {
                    // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                    context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  } else {
                    // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                    context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                  }
                  // playerDrawLog(x,y,plyr)
                }
              } else {
                if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                  if (
                    plyr.direction === 'east' ||
                    plyr.direction === 'west' ||
                    plyr.direction === 'north' ||
                    plyr.direction === 'south'
                  ) {
                    // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                    context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  } else {
                    // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                    context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                  }
                  // playerDrawLog(x,y)
                }
              }

            }
            if (plyr.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y,plyr)
              }
            }

            if (plyr.pushBack.state === true) {

              context2.drawImage(indicatorImgs.pushback, point.x-20, point.y-20, 35,35);
            }

          }
          else if (plyr.moving.state === false) {
            if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y && plyr.success.deflected.state === false) {

              if (
                plyr.direction === 'east' ||
                plyr.direction === 'west' ||
                plyr.direction === 'north' ||
                plyr.direction === 'south'
              ) {
                // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
              } else {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
              }

              if (plyr.attacking.state === true) {

                if (plyr.attacking.count > 0 && plyr.attacking.count < 3) {
                  context2.drawImage(indicatorImgs.preAttack, point.x-25, point.y-25, 25,25);
                }

                if (plyr.attacking.count > 8 && plyr.attacking.count < plyr.attacking.limit+1) {
                // if (plyr.attacking.count > plyr.attacking.limit-4 && plyr.attacking.count < plyr.attacking.limit+1) {
                  context2.drawImage(indicatorImgs.attack, point.x-20, point.y-20, 25,25);
                }

              }
              if (plyr.defending.state === true) {
                context2.drawImage(indicatorImgs.defend, point.x-20, point.y-20, 25,25);
              }
              if (plyr.success.attackSuccess === true) {
                context2.drawImage(indicatorImgs.attackSuccess, point.x-20, point.y-20, 25,25);
              }

              // playerDrawLog(x,y,plyr)
            }
          }
          else if (plyr.target.void === true && plyr.moving.state === true) {
            // console.log('heading for thevoid @ draw step');
            if (plyr.moving.origin.number.x === this.gridWidth && plyr.moving.origin.number.y !== 0 && plyr.moving.origin.number.y !== this.gridWidth) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y + 1) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.moving.origin.number.x === this.gridWidthd && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === this.gridWidthd) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.moving.origin.number.x === 0 && plyr.moving.origin.number.y === 0) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            else {
              if (x === plyr.moving.origin.number.x + 1 && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
          }

          if (plyr.strafing.state === true) {
            if (plyr.strafing.direction === 'north' || plyr.strafing.direction === 'northWest' || plyr.strafing.direction === 'west') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y,plyr)
              }
            }
            if (plyr.strafing.direction === 'east' || plyr.strafing.direction === 'south' || plyr.strafing.direction === 'southEast') {
              if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y)
              }
            }
            if (plyr.strafing.direction === 'northEast') {
              if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y)
              }
            }
            if (plyr.strafing.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y)
              }
            }
          }
          if (plyr.falling.state === true) {
            if (x === 0 && y === 0) {
              if (
                plyr.direction === 'east' ||
                plyr.direction === 'west' ||
                plyr.direction === 'north' ||
                plyr.direction === 'south'
              ) {
                context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
              } else {
                context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
              }
              // playerDrawLog(x,y,plyr)
            }
          }
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


                let plyrImgs = [
                  this.refs.playerImgIdleNorth,
                  this.refs.player2ImgIdleNorth
                ]
                updatedPlayerImg = plyrImgs[player.number-1];

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

                context2.drawImage(updatedPlayerImg, respawnPoint.center.x-25, respawnPoint.center.y-50, 50,50);
              }

            }
          if (plyr.success.deflected.state === true) {

            if (plyr.direction === 'north') {
              if (
                x === plyr.moving.origin.number.x &&
                y === plyr.moving.origin.number.y+1
              ) {
                context2.drawImage(updatedPlayerImg, point.x-35, point.y-20, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'northEast') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-30, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'northWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y+1
              ) {
                context2.drawImage(updatedPlayerImg, point.x-20, point.y-10, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'east') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-35, point.y-30, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'west') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-15, point.y-20, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'south') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-15, point.y-30, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'southEast') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-20, point.y-30, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'southWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context2.drawImage(updatedPlayerImg, point.x-10, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context2.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context2.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
          }
          if (plyr.dead.state === true && player.dead.count > 0 && plyr.dead.count < plyr.dead.limit) {

            if (
              x === plyr.ghost.position.cell.number.x &&
              y === plyr.ghost.position.cell.number.y
            ) {
              context2.drawImage(indicatorImgs.death, plyr.ghost.position.cell.center.x-15, plyr.ghost.position.cell.center.y-15, 25,25);
            }
          }
          if (plyr.ghost.state === true && player.dead.count === 0) {
            if (
              x === plyr.ghost.position.cell.number.x &&
              y === plyr.ghost.position.cell.number.y
            ) {
              context.drawImage(indicatorImgs.ghost, plyr.ghost.position.cell.center.x-20, plyr.ghost.position.cell.center.y-20, 25,25);
            }
          }

          this.players[plyr.number-1] = plyr;

        }

        for (const bolt of this.projectiles) {
          if (
            bolt.currentPosition.number.x === x &&
            bolt.currentPosition.number.y === y
          ) {

             context2.fillStyle = "black";
             context2.fillRect(bolt.currentPosition.center.x, bolt.currentPosition.center.y,10,5);

          }
        }

        let walledTiles = []
        if (walledTiles.includes(''+x+','+y+'')) {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(gridInfoCell.levelData.charAt(0) === 'y') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context2.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(gridInfoCell.levelData.charAt(0) === 'z') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context2.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

          let isoHeight = wallImageHeight - floorImageHeight
          offset.y += isoHeight
          context2.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);
        }
      }
    }

    this.players[player.number-1] = player;
    let players = this.state.players;
    players[player.number-1] = player;
    this.setState({
      players: players
    })

  }

  getTarget = (player) => {
    // console.log('checking target',player.number);

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
        if (cell.void.state === true ) {
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
    let players = this.state.players;
    players[player.number-1] = player;
    this.setState({
      players: players
    })

    return target;

  }
  lineCrementer = (player) => {
    // console.log('line crementer',player.number);

    let currentPosition = player.currentPosition.cell.center;
    let target = player.target;
    let moveSpeed = player.speed.move;

    player.moving.step = player.moving.step + moveSpeed;
    // console.log('mover stepper',player.moving.step);
    let newPosition;

    // line: percent is 0-1
    let startPt = currentPosition;
    let endPt = target.cell.center;
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
      // console.log('increment fall');
      player.falling.count++;

      newPosition = {
        x: target.cell.center.x,
        y: target.cell.center.y+player.falling.count*5,
      }
      player.currentPosition.cell.center = newPosition;

    }

    player.nextPosition = newPosition

    this.players[player.number-1] = player;
    let players = this.state.players;
    players[player.number-1] = player;
    this.setState({
      players: players
    })

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

      cell2.center.x = cell.center.x;
      cell2.center.y = cell.center.y;
      cell2.vertices = cell.vertices;
    }

    bolt.moving.state = true;

    this.projectiles[index] = bolt;

  }
  boltCrementer = (bolt) => {
    // console.log('boltCrementer');


    // let index = this.projectiles.findIndex(blt => blt.id === bolt.id);
    let distanceFactor = bolt.target.path.length;

    let moveSpeed = bolt.speed;
    moveSpeed = bolt.speed/distanceFactor;
    // moveSpeed = bolt.speed/(distanceFactor/10);

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
  checkDestination = (player) => {
    // console.log('checking for item or enviro effect');

    let pickUp = false;

    let cell = this.gridInfo.find(elem => elem.number.x === player.currentPosition.cell.number.x && elem.number.y === player.currentPosition.cell.number.y)
    if (cell.item.name !== '') {
      // console.log('picked up an item');
      if (cell.item.type === 'weapon') {
        // console.log('weapon',cell.item);

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
            }
          }
        }
      }
      if (cell.item.type === 'armor') {
        // console.log('picked up armor',player.currentArmor);
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
                console.log('kk',this.players[player.number-1].speed.move,'kk',currentSpd1,currentSpd1+1);

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

              pickUp = true;
            }
          break;
          case 'focusDown' :
            this.players[player.number-1].crits.doubleHit = this.players[player.number-1].crits.doubleHit + 2;

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
        cell.item = {
          name: '',
          type: '',
          subType: '',
          initDrawn: false
        }
      }

    }

    // check for terrain
    //   based on terrain effect/buff/debuff update player props


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

  pushBack = (player,hitByPlayerDirection) => {
    // console.log('pushing back');

    player.pushBack.prePushMoveSpeed = player.speed.move;
    player.speed.move = .1;

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
          // console.log('target is NOT free');
    }
    if (player.target.void === true) {
      // console.log('target is VOID!!',target.cell.center.x,target.cell.center.y);
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
    this.players[player.number-1].hp = 2;
    this.players[player.number-1].speed.move = .1;
    this.players[player.number-1].ghost.state = false;
    this.players[player.number-1].crits = {
      doubleHit: 6,
      pushBack: 3,
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
    this.players[player.number-1].crits = {
      singleHit: 1,
      doubleHit: 6,
      pushBack: 3,
    };

  }
  killPlayer = (player) => {
    console.log('killing player',player.number);

    player.ghost.state = true;
    player.ghost.position.cell = player.currentPosition.cell;

    player.action = 'idle';
    player.direction = 'north';
    player.falling = {
      state: false,
      count: 0,
      limit: 7,
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
      limit: 5
    }
    // player.hp = 2;
    player.points--;

    // this.getTarget(player)

    this.players[player.number-1] = player;

  }

  restartGame = () => {
    console.log('resetting');

    this.projectiles = [];
    for (const player of this.players) {
      player.ghost.state = false;
      player.speed.move = .1;
      player.hp = 2;
      player.crits = {
        doubleHit: 6,
        pushBack: 3,
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
      player.crits = {
        singleHit: 1,
        doubleHit: 6,
        pushBack: 3,
      }
      // player.currentArmor = {};

    }

    this.drawGridInit(this.state.canvas, this.state.context, this.state.canvas2, this.state.context2);

  }

  checkCell = (cell) => {
    // console.log('check cell');

    let cellFree = true;
    let cell2 = this.gridInfo.find(elem => elem.number.x === cell.x && elem.number.y === cell.y);
    if (
      cell2.levelData.charAt(0) ===  'z' &&
      cell2.levelData.charAt(0) ===  'y'
    ) {
      cellFree = false;
    }
    if (cell2.item.name !== '') {
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
      console.log('placing items init');


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
            console.log('post item', item, cell2.item,cell2.number);

          }
        // }
        // else {
        //   console.log('item stock empty');
        // }
      }

    } else if (args.init !== true) {
      console.log('placing items mid-game: ',args.item);


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

              item2.amount--
              console.log('placed ingame item',cell2.number.x,cell2.number.y,item2.amount,this.itemList);

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
    let dropWhat = this.rnJesus(1,2);
    let shouldDrop = false;
    let dropChance = this.rnJesus(1,1*player.crits.pushBack);
    if (
      dropChance === 1 &&
      player.falling.state !== true
    ) {
      shouldDrop = true;

      if (dropWhat === 1) {
        console.log("dropping weapon player ",player.number);
        let index = player.items.weapons.findIndex(weapon => weapon.name === player.currentWeapon.name);
        // player.items.weapons.indexOf(player.items.weapons.find(weapon=> {weapon.name === player.currentWeapon.name}))

        item.name = this.players[player.number-1].items.weapons[index].name;
        item.subType = this.players[player.number-1].items.weapons[index].type;
        item.type = "weapon";
        item.effect = this.players[player.number-1].items.weapons[index].effect;
        this.players[player.number-1].items.weapons.splice(index,1);
        this.players[player.number-1].items.weaponIndex = 0;
        this.players[player.number-1].currentWeapon = {
          name: '',
          type: '',
          effect: '',
        }

        this.players[player.number-1].statusDisplay = {
          state: true,
          status: item.name+'dropped',
          count: 1,
          limit: this.players[player.number-1].statusDisplay.limit,
        }
      }
      else {
        console.log("dropping armor player ",player.number);
        if (player.items.armor.length > 0) {
          let index = player.items.armor.findIndex(armor => armor.name === player.currentArmor.name);
          // let index = player.items.armor.indexOf(player.items.armors.find(armor=> {armor.name === player.currentArmor.name}))
          item.name = this.players[player.number-1].items.armor[index].name;
          item.subType = this.players[player.number-1].items.armor[index].type;
          item.effect = this.players[player.number-1].items.armor[index].effect;
          item.type = "armor";

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
                console.log('kk',this.players[player.number-1].speed.move,'kk',currentSpd1,currentSpd1-1);
                console.log('armor drop debuff speed',this.players[player.number-1].speed.move);
                this.players[player.number-1].speed.move = this.players[player.number-1].speed.range[currentSpd1-1];
                console.log('armor drop debuff speed',this.players[player.number-1].speed.move);
              }

              // let currentSpd1 = player.speed.range.indexOf(player.speed.move);
              // if (player.speed.move > .05) {
              //   console.log('kk',player.speed.move,'kk',currentSpd1,currentSpd1-1);
              //   console.log('armor cycle debuff speed',player.speed.move);
              //   player.speed.move = player.speed.range[currentSpd1-1];
              //   console.log('armor cycle debuff speed',player.speed.move);
              // }
            break;
          }


          this.players[player.number-1].items.armor.splice(index,1);
          this.players[player.number-1].items.armorIndex = 0;
          this.players[player.number-1].currentArmor = {
            name: '',
            type: '',
            effect: '',
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
          //
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

    // }
    // this.openVoid = false;
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
            x: Math.round(iso.x - offset.x/2+23),
            y: Math.round(iso.y - offset.y/2-2),
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

  }

  drawGridInit = (canvas, context, canvas2, context2) => {
    console.log('drawing initial');

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

    let floor = this.refs.floor2;
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
      moveSpeedUp: this.refs.preAttackIndicate,
      moveSpeedDown: this.refs.preAttackIndicate,
      hpUp: this.refs.preAttackIndicate,
      hpDown: this.refs.preAttackIndicate,
      focusUp: this.refs.preAttackIndicate,
      focusDown: this.refs.preAttackIndicate,
      strengthDown: this.refs.preAttackIndicate,
      sword: this.refs.preAttackIndicate,
      spear: this.refs.preAttackIndicate,
      crossbow: this.refs.preAttackIndicate,
      helmet: this.refs.preAttackIndicate,
      ammo5: this.refs.preAttackIndicate,
      ammo10: this.refs.preAttackIndicate,
      mail: this.refs.preAttackIndicate,
      greaves: this.refs.preAttackIndicate,
    };

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
          x: iso.x - offset.x/2+23,
          y: iso.y - offset.y/2-2,
        }

        let cellLevelData = this.gridInfo.find(elem => elem.number.x === x && elem.number.y === y).levelData;

        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12)

        context.fillStyle = "green";
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


            context.fillStyle = fillClr;
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI);
            context.fill();

            // context.drawImage(itemImg ,center.x-10, center.y-15, 30,30);
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
          this.refs.playerImgIdleNorth,
          this.refs.player2ImgIdleNorth
        ]

        for (const player of this.players) {

          if (
            x === player.startPosition.cell.number.x &&
            y === player.startPosition.cell.number.y
          ) {

            let playerImg = playerImgs[player.number-1];

            player.speed.move = .1;
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
            let players = this.state.players;
            players[player.number-1] = player;
            this.setState({
              players: players
            })

            this.getTarget(player);
            context2.drawImage(playerImg, point.x-30, point.y-30, 60,60);

          }

        }

        let walledTiles = []
        if (walledTiles.includes(''+x+','+y+'')) {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context2.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);
        }
        if(cellLevelData.charAt(0) === 'y') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context2.drawImage(wall3, iso.x - offset.x, iso.y - offset.y);

        }
        if(cellLevelData.charAt(0) === 'z') {
          offset = {x: wallImageWidth/2, y: wallImageHeight}
          context2.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

          let isoHeight = wallImageHeight - floorImageHeight
          offset.y += isoHeight
          context2.drawImage(wall2, iso.x - offset.x, iso.y - offset.y);

        }

        this.init = false;

      }
    }
  }

  aiAct = () => {


    // step1: turn and move in all directions

    // step2: move w/pathfinding to a tile surrounding player1 and target them

  // if ai setting is attack player,
  //   make an action checklist
  //     locate player, move to closest location, target and attack, defend when detect pre attacks
  //     on each game step when one ation is complete the currently acting is false
  //       if not running an ai action check action list
  //         run the next one in the action list and set currentl acting true
  //           if running an ai action check sub action list
  //             run the last incomplete subaction
  //               subaction is composed of keypresses and release/sub action completion conditions
  //               if running a sub action, check conditions for each game step
  //             when all subactions incomplete, action incomplete
  //               set currently acting false
  //
  //
  //             example sub action
  //               ai strafe:
  //                 set keypress of strafe and disired move direction
  //                   release consdition is moving false. when moving is false changed strafe keypress false

  }


  render() {
    return (
      <React.Fragment>


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
                player={this.state.players[0]}
              />
            </div>
            <div className="debugDisplay2">
              <DebugBox
                player={this.state.players[1]}
              />
            </div>

            <div className="settingsSwitch">
              <a href="javascript:" className="setSwitchLink" onClick={this.openSettings}>
                <FontAwesomeIcon icon={faCogs} size="sm" className="setSwitchIcon"/>
              </a>
            </div>
          </div>

          {this.state.showSettings === true && (
            <Settings
              gridWidth={this.gridWidth}
              onConfirm={this.loadSettings}
              onCancel={this.cancelSettings}
            />
          )}




          <img src={floor1} className='hidden' ref="floor1" alt="logo" id="floor1"/>
          <img src={floor2} className='hidden' ref="floor2" alt="logo" id="floor2"/>
          <img src={floor3} className='hidden' ref="floorAttack" alt="logo" id="floor3"/>
          <img src={floorVoid} className='hidden' ref="floorVoid" alt="logo" id="floor4"/>
          <img src={wall} className='hidden' ref="wall" alt="logo" />
          <img src={wall2} className='hidden' ref="wall2" alt="logo" />
          <img src={wall3} className='hidden' ref="wall3" alt="logo" />

          <img src={playerImgIdleNorth} className='hidden playerImgs' ref="playerImgIdleNorth" alt="logo" />
          <img src={playerImgIdleNorthWest} className='hidden playerImgs' ref="playerImgIdleNorthWest" alt="logo" />
          <img src={playerImgIdleNorthEast} className='hidden playerImgs' ref="playerImgIdleNorthEast" alt="logo" />
          <img src={playerImgIdleSouth} className='hidden playerImgs' ref="playerImgIdleSouth" alt="logo" />
          <img src={playerImgIdleSouthWest} className='hidden playerImgs' ref="playerImgIdleSouthWest" alt="logo" />
          <img src={playerImgIdleSouthEast} className='hidden playerImgs' ref="playerImgIdleSouthEast" alt="logo" />
          <img src={playerImgIdleEast} className='hidden playerImgs' ref="playerImgIdleEast" alt="logo" />
          <img src={playerImgIdleWest} className='hidden playerImgs' ref="playerImgIdleWest" alt="logo" />

          <img src={attackInidcate} className='hidden playerImgs' ref="attackIndicate" alt="logo" />
          <img src={attackSuccessInidcate} className='hidden playerImgs' ref="attackSuccessIndicate" alt="logo" />
          <img src={defendInidcate} className='hidden playerImgs' ref="defendIndicate" alt="logo" />
          <img src={deflectInidcate} className='hidden playerImgs' ref="deflectIndicate" alt="logo" />
          <img src={deflectInjuredInidcate} className='hidden playerImgs' ref="deflectInjuredIndicate" alt="logo" />
          <img src={pushbackInidcate} className='hidden playerImgs' ref="pushbackIndicate" alt="logo" />
          <img src={ghostInidcate} className='hidden playerImgs' ref="ghostIndicate" alt="logo" />
          <img src={deathInidcate} className='hidden playerImgs' ref="deathIndicate" alt="logo" />
          <img src={preAttackInidcate} className='hidden playerImgs' ref="preAttackIndicate" alt="logo" />

          <img src={player2ImgIdleNorth} className='hidden playerImgs' ref="player2ImgIdleNorth" alt="logo" />
          <img src={player2ImgIdleNorthWest} className='hidden playerImgs' ref="player2ImgIdleNorthWest" alt="logo" />
          <img src={player2ImgIdleNorthEast} className='hidden playerImgs' ref="player2ImgIdleNorthEast" alt="logo" />
          <img src={player2ImgIdleSouth} className='hidden playerImgs' ref="player2ImgIdleSouth" alt="logo" />
          <img src={player2ImgIdleSouthWest} className='hidden playerImgs' ref="player2ImgIdleSouthWest" alt="logo" />
          <img src={player2ImgIdleSouthEast} className='hidden playerImgs' ref="player2ImgIdleSouthEast" alt="logo" />
          <img src={player2ImgIdleEast} className='hidden playerImgs' ref="player2ImgIdleEast" alt="logo" />
          <img src={player2ImgIdleWest} className='hidden playerImgs' ref="player2ImgIdleWest" alt="logo" />

          <img src={plyr1AttackWest} className='hidden playerImgs' ref="plyr1AttackWest" alt="logo" />
          <img src={plyr1AttackEast} className='hidden playerImgs' ref="plyr1AttackEast" alt="logo" />
          <img src={plyr1AttackNorth} className='hidden playerImgs' ref="plyr1AttackNorth" alt="logo" />
          <img src={plyr1AttackSouth} className='hidden playerImgs' ref="plyr1AttackSouth" alt="logo" />
          <img src={plyr1AttackSouthEast} className='hidden playerImgs' ref="plyr1AttackSouthEast" alt="logo" />
          <img src={plyr1AttackSouthWest} className='hidden playerImgs' ref="plyr1AttackSouthWest" alt="logo" />
          <img src={plyr1AttackNorthWest} className='hidden playerImgs' ref="plyr1AttackNorthWest" alt="logo" />
          <img src={plyr1AttackNorthEast} className='hidden playerImgs' ref="plyr1AttackNorthEast" alt="logo" />

          <img src={plyr1IdleWest} className='hidden playerImgs' ref="plyr1IdleWest" alt="logo" />
          <img src={plyr1IdleEast} className='hidden playerImgs' ref="plyr1IdleEast" alt="logo" />
          <img src={plyr1IdleNorth} className='hidden playerImgs' ref="plyr1IdleNorth" alt="logo" />
          <img src={plyr1IdleSouth} className='hidden playerImgs' ref="plyr1IdleSouth" alt="logo" />
          <img src={plyr1IdleSouthEast} className='hidden playerImgs' ref="plyr1IdleSouthEast" alt="logo" />
          <img src={plyr1IdleSouthWest} className='hidden playerImgs' ref="plyr1IdleSouthWest" alt="logo" />
          <img src={plyr1IdleNorthWest} className='hidden playerImgs' ref="plyr1IdleNorthWest" alt="logo" />
          <img src={plyr1IdleNorthEast} className='hidden playerImgs' ref="plyr1IdleNorthEast" alt="logo" />


        </div>
      </React.Fragment>
    )
  }
}

export default App;
