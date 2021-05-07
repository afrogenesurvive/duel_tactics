import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCogs
} from '@fortawesome/free-solid-svg-icons';

import logo from './logo.svg';
import tile from './assets/floor0.png'
import floor2 from './assets/floor2.png'
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
          free: true,
          occupant: {
            type: '',
            player: '',
          },
          void: false
        },
        direction: 'west',
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
          limit: 10,
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
          state: false
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
        currentWeapon: {},
        currentArmor: {},
        items: {
          weapons: [],
          armor: [],
        },
        crits: {
          doubleHit: 6,
          pushBack: 3,
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
          limit: 10,
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
          state: false
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
        currentWeapon: {},
        currentArmor: {},
        items: {
          weapons: [],
          armor: [],
        },
        crits: {
          doubleHit: 6,
          pushBack: 3,
        },
      }
    ],
    showSettings: true,
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.canvasRef3 = React.createRef();

    this.tileColumnOffset = 100; // pixels
    this.tileRowOffset = 50; // pixels
    this.originX = 0; // offset from left
    this.originY = 0; // offset from top
    this.Xtiles = 10;
    this.Ytiles = 10;
    this.showCoordinates = true;
    this.selectedTileX = -1;
    this.selectedTileY = -1;

    this.canvasWidth = 1100;
    this.canvasHeight = 600;
    this.floorImageWidth = 103;
    this.floorImageHeight = 53;
    this.wallImageWidth = 103;
    this.wallImageHeight = 98;
    this.sceneX = 1100/2;
    this.sceneY = 120;
    this.tileWidth = 50;
    this.gridWidth = 9;

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
    this.levelData9 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','y33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','x42x','x43x','y44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','y61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
      row7: ['x70x','y71x','x72x','x73x','x74x','x75x','x76x','y77x','x78x','x79x'],
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
        type: 'item'
      },
      {
        name: 'moveSpeedDown',
        amount: 5,
        type: 'item'
      },
      {
        name: 'hp+1',
        amount: 4,
        type: 'item'
      },
      {
        name: 'hp-1',
        amount: 4,
        type: 'item'
      },
      // {
      //   name: 'spear',
      //   amount: 3,
      //   type: 'weapon'
      // },
      // {
      //   name: 'sword',
      //   amount: 2,
      //   type: 'weapon'
      // },
      // {
      //   name: 'crossbow',
      //   amount: 2,
      //   type: 'weapon'
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
          limit: 10,
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
          state: false
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
          move: .125,
          range: [.05,.1,.125,.2]
        },
        hp: 2,
        currentWeapon: {},
        currentArmor: {},
        items: {
          weapons: [],
          armor: [],
        },
        crits: {
          doubleHit: 6,
          pushBack: 3,
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
          limit: 10,
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
          state: false
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
        currentWeapon: {},
        currentArmor: {},
        items: {
          weapons: [],
          armor: [],
        },
        crits: {
          doubleHit: 6,
          pushBack: 3,
        },
      }
    ]
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
  }

  // implement a prePlayer update function
  //   check which player is inputting or both
  //     if one
  //       pass which player to playerupdate and drawplayerstep
  //     if both call 2 functions, one player 1, and one 2 player 2, choose which gets called 1st at random


  componentDidMount() {

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

    this.refs.plyr1IdleNorthEast.onload = () => {
      this.addListeners();
      // this.loadSettings();

      this.drawGridInit(canvas, context);

      window.requestAnimationFrame(this.gameLoop);

    }

  }


  componentWillUnmount() {

  }


  addListeners = () => {
    // console.log('adding listeners');

    const canvas = this.canvasRef.current;
    const canvas2 = this.canvasRef2.current;
    const canvas3 = this.canvasRef3.current;

    // canvas.addEventListener("click", e => {
    //   console.log('canvas click',e);
    //   // this.drawBall();
    // });

    canvas2.addEventListener("click", e => {
      this.getCanvasClick(canvas3, e)
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
        let vertexPoint = [vertex.x,vertex.y];
        polygon.push(vertexPoint)
      }
      let pip = pointInPolygon(point, polygon)
      // console.log('point',point,'cell',cell.number,'polygon',polygon,'pip',pip);
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

    // let canvas = this.canvasRef.current;
    // let context = canvas.getContext('2d');
    // for (const player of this.players) {
    //   this.playerUpdate(player, canvas, context);
    // }

  }

  loadSettings = (event) => {

    let gridSize = event.target.gridSize.value;
    switch(gridSize) {
      case '4 x 4' :
        this.gridWidth = 3;
        this.sceneY = 300;
      break;
      case '7 x 7' :
        this.gridWidth = 6;
        this.sceneY = 200;
      break;
      case '10 x 10' :
        this.gridWidth = 9;
        this.sceneY = 120;
      break;
    }

    this.restartGame();

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

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    this.stepper.currentTime = (new Date()).getTime();
    this.stepper.deltaTime = (this.stepper.currentTime-this.stepper.lastTime);

    if(this.stepper.deltaTime > this.stepper.interval) {
      // console.log('update loop step...dt',this.stepper.deltaTime,'interval',this.stepper.interval);

      // this.aiAct();
      for (const player of this.players) {
        this.playerUpdate(player, canvas, context);
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



    // TURNER!!
    if (player.turning.state === true && player.turning.toDirection === this.turnCheckerDirection) {
      // console.log('player',player.number,' turn-ing');
      if (this.keyPressed[this.currentPlayer-1][this.turnCheckerDirection] == false) {
        // console.log('player',player.number,' turn-stop');
        player.turning.state = false;
      }
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

        if (player.speed.move !== .1) {
          // console.log('abnormal move speed');
          if (
            nextPosition.x === player.target.cell.center.x &&
            nextPosition.y === player.target.cell.center.y ||
            nextPosition.x === player.target.cell.center.x+5 &&
            nextPosition.y === player.target.cell.center.y+5
          ) {
            // console.log('next position is destination');
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

            } else if (
              nextPosition.x === player.target.cell.center.x &&
              nextPosition.y === player.target.cell.center.y &&
              player.target.void === true
            ) {
              player.falling.state = true;
              player.action = 'falling';
            }

            if (player.pushBack.state === true) {
              player.pushBack.state = false;
              player.strafing = {
                state: false,
                direction: ''
              }
            }
          }
        }
        else {
          // console.log('normal move speed');
          if (
            nextPosition.x === player.target.cell.center.x &&
            nextPosition.y === player.target.cell.center.y
          ) {
            // console.log('next position is destination');
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

            } else if (
              nextPosition.x === player.target.cell.center.x &&
              nextPosition.y === player.target.cell.center.y &&
              player.target.void === true
            ) {
              player.falling.state = true;
              player.action = 'falling';
            }

            if (player.pushBack.state === true) {
              player.pushBack.state = false;
              player.strafing = {
                state: false,
                direction: ''
              }
            }
          }
        }

      }

      // CAN READ INPUTS
      else if (player.moving.state === false) {

        // DEBUFF CHECKS!!
        if (player.hp === 1 && player.speed.move > .05) {

          player.speed.move = .05;
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
            player.attacking.count++;
          }
          if (player.attacking.count >= player.attacking.limit) {

            this.getTarget(player)
            if (player.target.occupant.type === 'player') {

              // ATTACK SUCCESS!!
              if (this.players.[player.target.occupant.player-1].defending.state === false) {
                // console.log('attack success');
                player.success.attackSuccess = {
                  state: true,
                  count: 1,
                  limit: player.success.attackSuccess.limit
                }

                let doubleHit = this.rnJesus(1,player.crits.doubleHit);
                if (doubleHit === 1) {
                  this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 2;
                }
                else if (doubleHit !== 1) {
                  this.players[player.target.occupant.player-1].hp = this.players[player.target.occupant.player-1].hp - 1;
                }

                if (this.players[player.target.occupant.player-1].hp <= 0) {
                  this.killPlayer(this.players[player.target.occupant.player-1]);
                } else {
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

                // player.success.deflected = {
                //   state: true,
                //   count: 1,
                //   limit: player.success.deflected.limit,
                //   predeflect: player.success.deflected.predeflect,
                // }

              }
            }

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
          console.log('defend winding up',player.defending.count++, 'player',player.number);
        } else if (player.defending.count >= player.defending.limit && player.defending.state === false) {
          console.log('defend wind up limit cap','player',player.number);
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
                player.action = 'attacking';
                player.attacking = {
                  state: true,
                  count: 1,
                  limit: player.attacking.limit,
                }
              }
              if (this.keyPressed[player.number-1].defend === true) {
                // console.log('start defending',player.number);

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

    // SYNC W/ GLOBAL PLAYER DATA
    this.players[player.number-1] = player;
    let players = this.state.players;
    players[player.number-1] = player;
    this.setState({
      players: players
    })

    this.drawPlayerStep(player.number, canvas, context);

  }

  drawPlayerStep = (playerNumber, canvas, context) => {
    // console.log('drawing player step',playerNumber);

    let gridInfo = [];
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
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
    let itemImgs = [];
    let terrainImgs = [];

    let updatedPlayerImg;
    let newDirection;

    if (player.falling.state === true) {
      if (player.falling.count === player.falling.limit) {
        this.killPlayer(player)
      }

    }

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

        let cellLevelData;
        let allCells = gridInfo;
        for (const elem of allCells) {
          if (elem.number.x === x && elem.number.y === y) {
            cellLevelData = elem.levelData;
          }
        }

        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

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
        // check gridinfo cell matched w/ current xy for item and draw if item not blank

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
                  // newDirection === 'east' ||
                  plyr.direction === 'west' ||
                  // newDirection === 'west' ||
                  plyr.direction === 'north' ||
                  // newDirection === 'north' ||
                  plyr.direction === 'south'
                  // newDirection === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
              }
            }
            if (plyr.direction === 'east' || plyr.direction === 'south' || plyr.direction === 'southEast') {
              if (x === plyr.target.cell.number.x && y === plyr.target.cell.number.y) {
                if (
                  plyr.direction === 'east' ||
                  // newDirection === 'east' ||
                  plyr.direction === 'west' ||
                  // newDirection === 'west' ||
                  plyr.direction === 'north' ||
                  // newDirection === 'north' ||
                  plyr.direction === 'south'
                  // newDirection === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                    // newDirection === 'east' ||
                    plyr.direction === 'west' ||
                    // newDirection === 'west' ||
                    plyr.direction === 'north' ||
                    // newDirection === 'north' ||
                    plyr.direction === 'south'
                    // newDirection === 'south'
                  ) {
                    // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                    context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  } else {
                    // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                    context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                  }
                  // playerDrawLog(x,y,plyr)
                }
              } else {
                if (x === plyr.moving.origin.number.x+1 && y === plyr.moving.origin.number.y) {
                  if (
                    plyr.direction === 'east' ||
                    // newDirection === 'east' ||
                    plyr.direction === 'west' ||
                    // newDirection === 'west' ||
                    plyr.direction === 'north' ||
                    // newDirection === 'north' ||
                    plyr.direction === 'south'
                    // newDirection === 'south'
                  ) {
                    // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                    context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                  } else {
                    // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                    context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                  }
                  // playerDrawLog(x,y)
                }
              }

            }
            if (plyr.direction === 'southWest') {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y+1) {
                if (
                  plyr.direction === 'east' ||
                  // newDirection === 'east' ||
                  plyr.direction === 'west' ||
                  // newDirection === 'west' ||
                  plyr.direction === 'north' ||
                  // newDirection === 'north' ||
                  plyr.direction === 'south'
                  // newDirection === 'south'
                ) {
                  // context.drawImage(updatedPlayerImg, point.x-25, point.y-35, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
                }
                // playerDrawLog(x,y,plyr)
              }
            }

            if (plyr.pushBack.state === true) {
              // context.fillStyle = "purple";
              // context.beginPath();
              // context.arc(point.x-20, point.y-20, 10, 0, 2 * Math.PI);
              // context.fill();
              context.drawImage(indicatorImgs.pushback, point.x-20, point.y-20, 35,35);
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
                context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
              } else {
                // context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 55,55);
                context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
              }

              if (plyr.attacking.state === true) {

                if (plyr.attacking.count > 0 && plyr.attacking.count < 3) {
                  context.drawImage(indicatorImgs.preAttack, point.x-25, point.y-25, 25,25);
                }

                if (plyr.attacking.count > plyr.attacking.limit-4 && plyr.attacking.count < plyr.attacking.limit+1) {
                  context.drawImage(indicatorImgs.attack, point.x-20, point.y-20, 25,25);
                }

              }
              if (plyr.defending.state === true) {
                context.drawImage(indicatorImgs.defend, point.x-20, point.y-20, 25,25);
              }
              if (plyr.success.attackSuccess === true) {
                context.drawImage(indicatorImgs.attackSuccess, point.x-20, point.y-20, 25,25);
              }

              // playerDrawLog(x,y,plyr)
            }
          }
          else if (plyr.target.void === true && plyr.moving.state === true) {

            if (plyr.moving.origin.number.x === this.gridWidth && plyr.moving.origin.number.y !== 0 && plyr.moving.origin.number.y !== this.gridWidth) {
              if (x === plyr.moving.origin.number.x && y === plyr.moving.origin.number.y + 1) {
                if (
                  plyr.direction === 'east' ||
                  plyr.direction === 'west' ||
                  plyr.direction === 'north' ||
                  plyr.direction === 'south'
                ) {
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                  context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
                } else {
                  context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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
                context.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
              } else {
                context.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
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

              let respawnCellOccupied = false;

              // console.log('matching grid info with start position');
              for (const elem of allCells) {
                if (
                  elem.number.x === this.gridWidth &&
                  elem.number.y === this.gridWidth
                ){
                  altRespawnPoint.number.x = elem.number.x;
                  altRespawnPoint.number.y = elem.number.y;
                  altRespawnPoint.center.x = elem.center.x;
                  altRespawnPoint.center.y = elem.center.y;
                }

                if (
                  elem.number.x === plyr.startPosition.cell.number.x &&
                  elem.number.y === plyr.startPosition.cell.number.y
                )
                {
                  // console.log('found your start position');
                  // console.log('checking for obstacles');
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
                          elem.number.x === obstaclePosition.x &&
                          elem.number.y === obstaclePosition.y
                        ) {
                          // console.log('an obstacle is in your way');
                          respawnCellOccupied = true;
                        }
                      }
                    }
                  }

                  // console.log('checking for other player');
                  for (const plyr2 of this.players) {
                    if (plyr2.number !== plyr.number) {
                      if (
                        elem.number.x === plyr2.currentPosition.cell.number.x &&
                        elem.number.y === plyr2.currentPosition.cell.number.y
                      ) {
                        respawnCellOccupied = true;
                      }
                    }
                  }

                  if (
                    respawnCellOccupied === false
                  ) {
                    // console.log('starting point cell is free. You may respawn there');
                    respawnPoint.number.x = elem.number.x;
                    respawnPoint.number.y = elem.number.y;
                    respawnPoint.center.x = elem.center.x;
                    respawnPoint.center.y = elem.center.y;
                  } else if (respawnCellOccupied === true) {
                    // console.log('original spawn point occupied! spawning at cell 9,9');
                    respawnPoint = altRespawnPoint;
                  }

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

                context.drawImage(updatedPlayerImg, respawnPoint.center.x-25, respawnPoint.center.y-50, 50,50);
              }

            }
          if (plyr.success.deflected.state === true) {

            if (plyr.direction === 'north') {
              if (
                x === plyr.moving.origin.number.x &&
                y === plyr.moving.origin.number.y+1
              ) {
                context.drawImage(updatedPlayerImg, point.x-35, point.y-20, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'northEast') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-30, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'northWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y+1
              ) {
                context.drawImage(updatedPlayerImg, point.x-20, point.y-10, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'east') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-35, point.y-30, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'west') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-15, point.y-20, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'south') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-15, point.y-30, 55,55);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'southEast') {
              if (
                x === plyr.currentPosition.cell.number.x &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-20, point.y-30, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }
            if (plyr.direction === 'southWest') {
              if (
                x === plyr.currentPosition.cell.number.x+1 &&
                y === plyr.currentPosition.cell.number.y
              ) {
                context.drawImage(updatedPlayerImg, point.x-10, point.y-20, 40,40);
                if (plyr.success.deflected.type === 'attack') {
                  context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
                }
                else if (plyr.success.deflected.type === 'attacked') {
                  context.drawImage(indicatorImgs.deflectInjured, point.x-25, point.y-25, 25,25);
                }
              }
            }

            // context.drawImage(indicatorImgs.deflect, point.x-25, point.y-25, 25,25);
            // context.fillStyle = "#f3722c";
            // context.fillRect(point.x-20, point.y-20,15,15);
          }
          if (plyr.dead.state === true && player.dead.count > 0 && plyr.dead.count < plyr.dead.limit) {

            if (
              x === plyr.ghost.position.cell.number.x &&
              y === plyr.ghost.position.cell.number.y
            ) {
              // console.log('moments of death');
              context.drawImage(indicatorImgs.death, plyr.ghost.position.cell.center.x-15, plyr.ghost.position.cell.center.y-15, 25,25);

            }
          }
          if (plyr.ghost.state === true && player.dead.count === 0) {
            if (
              x === plyr.ghost.position.cell.number.x &&
              y === plyr.ghost.position.cell.number.y
            ) {
              // console.log('your ghost lingers till your return');
              context.drawImage(indicatorImgs.ghost, plyr.ghost.position.cell.center.x-20, plyr.ghost.position.cell.center.y-20, 25,25);
            }
          }

          this.players[plyr.number-1] = plyr;

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
      targetCellCenter = voidCenter;

      context.fillStyle = "#e63946";
      context.fillRect(voidCenter.x, voidCenter.y,5,5);
    }

    target.cell = {
      number: targetCellNumber,
      center: targetCellCenter
    };

    let obstacleObstructFound = false;
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


    if (obstacleObstructFound !== true ) {
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
  checkDestination = (player) => {
    // console.log('checking for item or enviro effect');


    // check for items
    //
    //   check gridinfo for player current pos
    //     if cell item not blank
    //       if item type not weapon or gear
    //         update player stats based on buff/debuff
    //         reset cell item data
    //       if weapon or armor push item name and type to player item subarray
    //
    //
    // check for terrain
    //   based on terrain effect/buff/debuff update player props


      // crit buff/debuffs
      //   pushBack buff = crit +
      //   pushBack debuff = crit -
      //   doubleHit buff = crit -
      //   doubleHit debuff = crit +

  }
  lineCrementer = (player) => {
    // console.log('line crementer',player.number);

    let currentPosition = player.currentPosition.cell.center;
    let target = player.target;
    let moveSpeed = player.speed.move;
    console.log('moveSpeed',moveSpeed);

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
      newPosition = {x:X,y:Y}
    }
    getLineXYatPercent(startPt,endPt,percent);

    if (player.falling.state === true) {
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

    // this.players[player.number-1] = player;

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

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

    for (const player of this.players) {
      player.ghost.state = false;
      player.speed.move = .1;
      player.hp = 2;
    }
    console.log(this.players);

    this.drawGridInit(canvas, context, canvas2, context2);

  }

  checkCell = () => {

    let cellFree;

    // for grid of gridinfo
    //   if grid.levelData.charAt(0) !==  'z' || charAt(0) !==  'y'
    //   and for player in this.players
    //     grid.x and grid.y !== player.current

    return cellFree
  }
  placeItems = (args) => {

    if (args.init === true) {
      console.log('placing items init');

      // for each item of this.items
      //   if item.count > item count-1
      //     let cell = {
      //       x: 0,
      //       y: 0
      //     }
      //     checkCell(cell)
      //     while checkCell == false
      //     cell.x = this.rnJesus(0,this.gridWidth)
      //     cell.y = this.rnJesus(0,this.gridWidth)
      //     else
      //       loop grid info for cell and set that cells item
      //       this.item item count - 1

    } else if (args.init !== true) {
      console.log('placing items mid-game');

      // item = args.item
      // search this.items for name match and check that count > 0
      //
      // let cell = {
      //   x: 0,
      //   y: 0
      // }
      // checkCell(cell)
      // while checkCell == false
      // cell.x = this.rnJesus(0,this.gridWidth)
      // cell.y = this.rnJesus(0,this.gridWidth)
      // else
      //   loop grid info for cell and set that cells item
      //   this.item item count - 1

    }
  }
  deflectDrop = () => {
    console.log('deflected! drop grea?');

    // run rnjesus to determine drop
    // if drop true
    //   drop 1 gear or weapon that's not a sword
    //
    //   if dropped weapon switch current weapon to sword
    //   if dropped gear remove buff/effect

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
            x: iso.x - offset.x/2+23,
            y: iso.y - offset.y/2-2,
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

      // for (const [key, row] of Object.entries(this.['levelData'+this.gridWidth])) {
      //   for (const cell of row) {
      //     if (
      //       cell.charAt(0) === 'y' ||
      //       cell.charAt(0) ===  'z'
      //     ) {
      //
      //       let obstaclePosition = {
      //         x: Number(cell.charAt(1)),
      //         y: row.indexOf(cell),
      //       }
      //       if (
      //         targetCellNumber.x === elem.number.x &&
      //         targetCellNumber.y === elem.number.y
      //       ) {
      //         elem.
      //       }
      //     }
      //   }
      // }

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

  drawGridInit = (canvas, context) => {
    console.log('drawing initial');

    let gridInfo = [];
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
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

        let cellLevelData;
        let allCells = gridInfo;
        for (const elem of allCells) {
          if (elem.number.x === x && elem.number.y === y) {
            // console.log('level data for this cell',elem.levelData);
            cellLevelData = elem.levelData;

          }
        }

        context.drawImage(floor, iso.x - offset.x, iso.y - offset.y);

        context.fillStyle = 'black';
        context.fillText(""+x+","+y+"",iso.x - offset.x/2 + 18,iso.y - offset.y/2 + 12)

        context.fillStyle = "green";
        context.fillRect(center.x, center.y,5,5);


        // INITIAL ITEM DISTRIBUTION!!
        // if gridInfo cell number == x,y and item initDrawn not true
        //   draw item img and set cell item drawn to true

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
          this.refs.plyr1IdleNorth,
          // this.refs.playerImgIdleNorth,
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

            for (const cell of gridInfo) {
              if (
                cell.number.x === player.startPosition.cell.number.x &&
                cell.number.y === player.startPosition.cell.number.y
              ) {
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

                // console.log('** playerDrawLog Init **');
                // console.log('-- player --',player.number);
                // console.log('-- strafing --',player.strafing.state);
                // console.log('-- turning --',player.turning.state);
                // console.log('-- currently drawing --',x,y);
                // console.log('-- current position --',player.currentPosition.cell.number.x,player.currentPosition.cell.number.y);
                // console.log('-- moving state --',player.moving.state);
                // console.log('-- moving step --',player.moving.step);
                // console.log('-- target --',player.target.cell.number.x,player.target.cell.number.y);
                // console.log('-- direction --',player.direction);
                // console.log('-- origin --',player.moving.origin.number.x,player.moving.origin.number.y);

                context.drawImage(playerImg, point.x-30, point.y-30, 60,60);

              }
            }
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
          <div className="containerInner">
            <canvas
              width="1100"
              height="600"
              ref={this.canvasRef}
              className="canvas"
            />
            <canvas
              width="1100"
              height="600"
              ref={this.canvasRef2}
              className="canvas2"
            />
            <canvas
              width="1100"
              height="600"
              ref={this.canvasRef3}
              className="canvas3"
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




          <img src={tile} className='hidden' ref="tile" alt="logo" />
          <img src={floor2} className='hidden' ref="floor2" alt="logo" />
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
