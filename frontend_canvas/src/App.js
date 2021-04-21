import React, { Component } from 'react';
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

import './App.css';

import pointInPolygon from 'point-in-polygon';

class App extends Component {
  state = {
    gridInfo: [],

  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();
    this.canvasRef3 = React.createRef();

    this.tileColumnOffset = 100; // pixels
    this.tileRowOffset = 50; // pixels
    // this.tileColumnOffset = 128; // pixels
    // this.tileRowOffset = 64; // pixels
    this.originX = 0; // offset from left
    this.originY = 0; // offset from top
    this.Xtiles = 10;
    this.Ytiles = 10;
    this.showCoordinates = true;
    this.selectedTileX = -1;
    this.selectedTileY = -1;
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
    this.levelData2 = {
      row0: ['x00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','x09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','y25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','z42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','y53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','x61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
      row7: ['x70x','x71x','x72x','x73x','x74x','x75x','x76x','x77x','x78x','x79x'],
      row8: ['x80x','x81x','x82x','x83x','x84x','x85x','y86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    };
    this.player1 = {
      number: 1,
      startPosition: {
        cell: {
          number: {
            x: 3,
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
      attacking: {
        state: false,
        count: 0,
        limit: 5,
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
      }
    };
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
    this.keyPressed = {
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
    };
    this.clicked = {
      cell: {
        number: {
          x: 0,
          y: 0,
        }
      }
    }


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

    this.refs.playerImgIdleWest.onload = () => {
      this.addListeners();

      this.drawGridInit(canvas, context, canvas2, context2);

      this.drawPlayerInit(canvas2, context2);
      window.requestAnimationFrame(this.gameLoop);
    }

  }


  componentWillUnmount() {

  }

  addListeners = () => {
    console.log('adding listeners');

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

    console.log('handling key press', event.key, state);

    let keyInput = event.key
    switch(keyInput) {
      case 'q' :
       this.keyPressed.northWest = state;
      break;
      case 'w' :
       this.keyPressed.north = state;
      break;
      case 'e' :
       this.keyPressed.northEast = state
      break;
      case 'a' :
       this.keyPressed.west = state
      break;
      case 'd' :
       this.keyPressed.east = state
      break;
      case 's' :
       this.keyPressed.south = state
      break;
      case 'z' :
       this.keyPressed.southWest = state
      break;
      case 'c' :
       this.keyPressed.southEast = state
      break;
      case 'Shift' :
       this.keyPressed.strafe = state
       this.player1.strafing.state = state
      break;
    }

    this.playerUpdate()

  }

  gameLoop = () => {

    let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();

    // ------ Looper Stepper #1 -------
    this.stepper.now = ts;
    this.stepper.dt = this.stepper.dt + Math.min(1, (this.stepper.now - this.stepper.last) / 100);

    while(this.stepper.dt > this.stepper.step) {
      this.stepper.dt = this.dt - this.stepper.step;
      // this.playerUpdate();
    }
    // this.drawPlayerStep(this.dt);
    this.stepper.last = this.stepper.now;
    // -----------


    // ------ Looper Stepper #2 -------
    this.stepper.secondsPassed = (ts - this.stepper.oldTimeStamp) / 1000;
    this.stepper.oldTimeStamp = ts;
    this.stepper.secondsPassed = Math.min(this.stepper.secondsPassed, 0.1);
    this.stepper.frameCount++;

    // this.playerUpdate(this.stepper.secondsPassed, this.stepper.step);
    // this.drawPlayerStep();
    // -----------


    // ------ Looper Stepper #3 -------
    this.stepper.currentTime = (new Date()).getTime();
    this.stepper.deltaTime = (this.stepper.currentTime-this.stepper.lastTime);

    if(this.stepper.deltaTime > this.stepper.interval) {
        // console.log('update loop step...dt',this.stepper.deltaTime,'interval',this.stepper.interval);

        // this.playerUpdate();
        this.stepper.lastTime = this.stepper.currentTime - (this.stepper.deltaTime % this.stepper.interval);
    }
    // this.drawPlayerStep();
    // -----------

    requestAnimationFrame(this.gameLoop);
  }


  playerUpdate = () => {
    console.log('updating player');

    let keyPressedDirection;

      for (const [key, value] of Object.entries(this.keyPressed)) {
        // console.log(`${key}: ${value} ....`);
        if (
          key !== 'strafe' &&
          key !== 'attack' &&
          key !== 'defend' &&
          value === true
        ) {
          console.log('pressed',key);
          keyPressedDirection = key;
        }
      }

      let player = this.player1;
      let nextPosition;

      if (player.moving.state === true) {
        console.log('player is moving');
        nextPosition = this.lineCrementer(player);

        player.currentPosition.cell = player.target.cell;
        player.nextPosition = nextPosition;

        if (
          nextPosition.x === player.target.cell.center.x &&
          nextPosition.y === player.target.cell.center.y
        ) {
          console.log('next position is destination');

          if (player.target.void === false) {
            player.action = 'idle';
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
            }


          } else if (
            nextPosition.x === player.target.cell.center.x &&
            nextPosition.y === player.target.cell.center.y &&
            player.target.void === true) {
            console.log(' at the void center. You can fall now!!');

            // player.falling.state = true;
            // next position is current position
          }

        }

      } else if (player.moving.state === false) {
        console.log('player is NOT moving');
        if (
          this.keyPressed.north === true ||
          this.keyPressed.south === true ||
          this.keyPressed.east === true ||
          this.keyPressed.west === true ||
          this.keyPressed.northEast === true ||
          this.keyPressed.northWest === true ||
          this.keyPressed.southEast === true ||
          this.keyPressed.southWest === true
        ) {
          console.log('move key pressed');
          if (
            keyPressedDirection === player.direction &&
            player.strafing.state === false
          ) {
            let target = this.getTarget()
            // console.log('non strafe can move target acquired',target);

            if (
              target.free === true &&
              player.target.void === false
            ) {
              console.log('target is free');

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

            if (target.free === false) {
              console.log('target is NOT free');
            }

            if (player.target.void === true) {
              console.log('target is VOID!!','#x',target.cell.number.x,'#y',target.cell.number.y);

              // player.moving = {
              //   state: true,
              //   step: 0,
              //   course: '',
              //   origin: {
              //     number: player.currentPosition.cell.number,
              //     center: player.currentPosition.cell.center,
              //   },
              //   destination: target.cell.center
              // }

              nextPosition = this.lineCrementer(player);
              // player.nextPosition = nextPosition;
              // console.log('next position',nextPosition);

            }

          } else if (
            keyPressedDirection !== player.direction &&
            player.strafing.state === false
          ) {
            player.direction = keyPressedDirection;
            console.log('change player direction to',keyPressedDirection);
            player.nextPosition = {
              x: player.currentPosition.cell.center.x,
              y: player.currentPosition.cell.center.y
            }

          } else if (
            keyPressedDirection !== player.direction &&
            player.strafing.state === true
          ) {

            player.strafing.direction = keyPressedDirection;
            let target = this.getTarget();

            if (target.free === true) {

              nextPosition = this.lineCrementer(player);
              player.nextPosition = nextPosition;

            }
          }

        } else if (
          this.keyPressed.attack === true ||
          this.keyPressed.defend === true
        ) {
          console.log('non-move key pressed');
          if (
            player.action === 'attacking' ||
            player.action === 'defending'
          ) {

            if (this.keyPressed.attack === true) {
              if (player.attacking.count < player.attacking.limit) {
                player.attacking.count++;
              }
              if (player.attacking.count >= player.attacking.limit) {
                player.attacking = {
                  state: false,
                  count: 0,
                  limit: player.attacking.limit
                }
              }
            }

            if (this.keyPressed.defend === true) {
              if (player.defending.count < player.defending.limit) {
                player.defending.count++;
              }
              if (player.defending.count >= player.defending.limit) {
                player.defending = {
                  state: false,
                  count: 0,
                  limit: player.defending.limit
                }
              }
            }
          }
          if (
            player.action !== 'attacking' ||
            player.action !== 'defending'
          ) {
            if (this.keyPressed.attack === true) {
              player.action = 'attacking';
              player.attacking = {
                state: true,
                count: 1,
                limit: player.attacking.limit,
              }
            }
            if (this.keyPressed.defend === true) {
              player.action = 'defending';
              player.defending = {
                state: true,
                count: 1,
                limit: player.defending.limit,
              }
            }
          }


        }

      }

    this.player1 = player;

    this.drawPlayerStep();

  }

  drawPlayerStep = () => {
    console.log('drawing player step');

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

    let player = this.player1;

    let playerImgs = {
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
    };

    let point = {
      x: player.nextPosition.x,
      y: player.nextPosition.y,
    };

    let updatedPlayerImg;
    let newDirection;


    switch(player.action) {
      case 'idle':
        switch(player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.idle.north;
            newDirection = 'north';
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.idle.northWest;
            newDirection = 'northWest';
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.idle.northEast;
            newDirection = 'northEast';
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.idle.east;
            newDirection = 'east';
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.idle.west;
            newDirection = 'west';
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.idle.south;
            newDirection = 'south';
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.idle.southWest;
            newDirection = 'southWest';
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.idle.southEast;
            newDirection = 'southEast';
          break;
        }
      break;
      case 'walking':
        switch(player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.walking.north;
            newDirection = 'north';
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.walking.northWest;
            newDirection = 'northWest';
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.walking.northEast;
            newDirection = 'northEast';
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.walking.east;
            newDirection = 'east';
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.walking.west;
            newDirection = 'west';
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.walking.south;
            newDirection = 'south';
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.walking.southWest;
            newDirection = 'southWest';
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.walking.southEast;
            newDirection = 'southEast';
          break;
        }
      break;
      case 'attacking':
        switch(player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.attacking.north;
            newDirection = 'north';
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.attacking.northWest;
            newDirection = 'northWest';
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.attacking.northEast;
            newDirection = 'northEast';
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.attacking.east;
            newDirection = 'east';
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.attacking.west;
            newDirection = 'west';
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.attacking.south;
            newDirection = 'south';
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.attacking.southWest;
            newDirection = 'southWest';
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.attacking.southEast;
            newDirection = 'southEast';
          break;
        }
      break;
      case 'defending':
        switch(player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.defending.north;
            newDirection = 'north';
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.defending.northWest;
            newDirection = 'northWest';
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.defending.northEast;
            newDirection = 'northEast';
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.defending.east;
            newDirection = 'east';
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.defending.west;
            newDirection = 'west';
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.defending.south;
            newDirection = 'south';
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.defending.southWest;
            newDirection = 'southWest';
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.defending.southEast;
            newDirection = 'southEast';
          break;
        }
      break;
    }

    if (
      player.falling.state === true
    ) {
      console.log('currently falling off the edge');

      // when count == limit reset  falling state and counter and current position, target, moving, action

    }

    if (
      player.action !== 'attacking' ||
      player.action !== 'defending'
    ) {

      context2.clearRect(0, 0, canvas2.width, canvas2.height);

      // call draw whole grid with new points and img here

      if (
        newDirection === 'east' ||
        newDirection === 'west' ||
        newDirection === 'north' ||
        newDirection === 'south'
      ) {
        context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 55,55);
      } else {
        context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
      }

    }

    this.player1 = player;

  }

  lineCrementer = () => {
    console.log('line crementer');

    let player = this.player1;
    let currentPosition = player.currentPosition.cell.center;
    let target = player.target;
    let increment = 2;

    player.moving.step = player.moving.step + .1;
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

    let newX = currentPosition.x+increment;
    // line equation for y
    let y = (((player.moving.origin.center.y-player.target.cell.center.y)/(player.moving.origin.center.x-player.target.cell.center.x))*(newX-player.moving.origin.center.x))+player.moving.origin.center.y
    // newPosition = {x:newX, y: y}

    if (
      player.falling.state === true
    ) {
      console.log('currently falling off the edge');

      // increment counter & change nextPosition point coords based on count
        // move down y axis

    }

    console.log('line crementer target',player.target.cell.center.x,player.target.cell.center.y,'%',player.moving.step);
    console.log('line crementer oldPos',currentPosition.x,currentPosition.y);
    console.log('line crementer newPos',newPosition.x,newPosition.y);

    player.nextPosition = newPosition
    this.player1 = player;

    return newPosition;

  }
  getTarget = () => {
    console.log('checking target');

    let canvas2 = this.canvasRef.current;
    let context2 = canvas2.getContext('2d');

    let gridInfo = this.gridInfo;
    let player = this.player1;
    let currentPosition = player.currentPosition.cell.number;
    let direction = player.direction;
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
      console.log('acquire strafe target');
      direction = this.player.strafing.direction;
    }

    let targetCellNumber = {x: 0,y: 0};
    let targetCellCenter = {x: 0,y: 0};

    if (
      currentPosition.x === 0 &&
      direction === 'west'
    ) {
      target.void = true;

    } else if (
      currentPosition.y === 0 &&
      direction === 'north'
    ) {
      target.void = true;

    } else if (
      currentPosition.x === 9 &&
      direction === 'east'
    ) {
      target.void = true;

    } else if (
      currentPosition.y === 9 &&
      direction === 'south'
    ) {
      target.void = true;

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

    for (const cell of gridInfo) {
      let xMatch = cell.number.x === targetCellNumber.x;
      let yMatch = cell.number.y === targetCellNumber.y;
      if (
        xMatch === true && yMatch === true
      ) {
        targetCellCenter = cell.center;
        // console.log('found target details');
      }
    }

    // find center of void cell
    if (target.void === true) {

      let x = target.cell.number.x;
      let y = target.cell.number.y;
      let canvasWidth = 1100;
      let canvasHeight = 600;
      let floorImageWidth = 103;
      let floorImageHeight = 53;
      let sceneX = canvasWidth/2;
      let sceneY = 140;
      let tileWidth = 50;

      class Point {
          constructor(x, y) {
              this.x = x;
              this.y = y;
          }
      }

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
      console.log('void cell center calculation','x',center.x,'y',center.y);

      context2.fillStyle = "#0095DD";
      context2.fillRect(center.x, center.y,5,5);

    }

    target.cell = {
      number: targetCellNumber,
      center: targetCellCenter
    };

    let obstacleObstructFound = false;
    for (const [key, row] of Object.entries(this.levelData2)) {
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
            console.log('an obstacle is in your way');
            target.free = false;
            target.occupant.type = 'obstacle';
            obstacleObstructFound = true;
          }
        }
      }

    }
    if (obstacleObstructFound !== true ) {
      target.free = true;
      target.occupant = {
        type: '',
        player: ''
      }
    }

      // check other player current position for match
      // if match free = false
      // occupant = {
      //   type: 'player/obstacle',
        // player: player1/player2
      // }

    player.target = target;
    this.player1 = player;
    return target;

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

  startProcessLevelData = (canvas) => {

    let gridInfo = [];

    let canvasWidth = 1100;
    let canvasHeight = 600;

    // isometric sprites sizes
    let floorImageWidth = 103;
    let floorImageHeight = 53;
    let wallImageWidth = 103;
    let wallImageHeight = 98;
    // some offsets to center the scene
    let sceneX = canvasWidth/2;
    let sceneY = 140;
    let tileWidth = 50;

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {

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
            {x:center.x, y:center.y+25},
            {x:center.x+50, y:center.y},
            {x:center.x, y:center.y-25},
            {x:center.x-50, y:center.y},
          ],
          side: Math.sqrt((25)^2+(50)^2),
          levelData: '',
          edge: {
            state: false,
            side: ''
          }
        })
      }
    }
    this.gridInfo = gridInfo;

  }
  processLevelData = (allCells) => {
    console.log('processing level data');

    // compare & combine w/ levelData2
    for(const elem of allCells) {
      let levelData2Row = 'row'+elem.number.x;
      let elemLevelData = this.levelData2[levelData2Row][elem.number.y];
      elem.levelData = elemLevelData;
    }

    // gridInfo to 2D array
    let gridInfo2d = [];
    for (let i = 0; i <= 9; i++) {
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
    console.log('drawing initial grid');

    canvas.width = 1100;
    canvas.height = 600;

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

    // isometric sprites sizes
    let floorImageWidth = 103;
    let floorImageHeight = 53;
    let wallImageWidth = 103;
    let wallImageHeight = 98;

    // some offsets to center the scene
    let sceneX = canvas.width/2;
    let sceneY = 140;
    let tileWidth = 50;

    this.startProcessLevelData(canvas);

    gridInfo = this.gridInfo;

    this.processLevelData(gridInfo)


    for (var x = 0; x < 10; x++) {
        for (var y = 0; y < 10; y++) {
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

            context.fillStyle = "#0095DD";
            context.fillRect(center.x, center.y,5,5);

            let vertices = [
              {x:center.x, y:center.y+25},
              {x:center.x+50, y:center.y},
              {x:center.x, y:center.y-25},
              {x:center.x-50, y:center.y},
            ];

            for (const vertex of vertices) {
              context.fillStyle = "black";
              context.fillRect(vertex.x-2.5, vertex.y-2.5,5,5);
            }

            // Draw player
            // if (
            //   x === this.player1.startPosition.cell.number.x &&
            //   y === this.player1.startPosition.cell.number.y
            // ) {
            //   // console.log('this is the player cell',x,y);
            //   this.drawPlayerInit(canvas2, context2)
            // }


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

    // draw scene elements like our sprites, images, etc.

    // this.drawPlayerInit(gridInfo2);

  }
  drawPlayerInit = (canvas, context) => {

    console.log('drawing initial player');

    let gridInfo = this.gridInfo;
    let player = this.player1;

    let playerImg = this.refs.playerImgIdleNorth;

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

      }

    }

    this.player1.currentPosition.cell = {
      number: {
        x: player.startPosition.cell.number.x ,
        y: player.startPosition.cell.number.y
      },
      center : {
        x: point.x,
        y: point.y
      }
    }
    this.player1.nextPosition = {
      x: point.x,
      y: point.y
    }

    // context2.translate(point.x,point.y);
    // context2.rotate(120);
    context.drawImage(playerImg, point.x-30, point.y-30, 60,60);
    // context2.rotate(-120);
    // context2.translate(-point.x, -point.y);
    // context.save()

    // window.requestAnimationFrame(this.gameLoop);

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
          </div>

          <img src={tile} className='hidden' ref="tile" alt="logo" />
          <img src={floor2} className='hidden' ref="floor2" alt="logo" />
          <img src={wall} className='hidden' ref="wall" alt="logo" />
          <img src={wall2} className='hidden' ref="wall2" alt="logo" />
          <img src={wall3} className='hidden' ref="wall3" alt="logo" />

          <img src={playerImgIdleNorth} className='hidden playerImgs2' ref="playerImgIdleNorth" alt="logo" />
          <img src={playerImgIdleNorthWest} className='hidden playerImgs' ref="playerImgIdleNorthWest" alt="logo" />
          <img src={playerImgIdleNorthEast} className='hidden playerImgs' ref="playerImgIdleNorthEast" alt="logo" />
          <img src={playerImgIdleSouth} className='hidden playerImgs2' ref="playerImgIdleSouth" alt="logo" />
          <img src={playerImgIdleSouthWest} className='hidden playerImgs' ref="playerImgIdleSouthWest" alt="logo" />
          <img src={playerImgIdleSouthEast} className='hidden playerImgs' ref="playerImgIdleSouthEast" alt="logo" />
          <img src={playerImgIdleEast} className='hidden playerImgs2' ref="playerImgIdleEast" alt="logo" />
          <img src={playerImgIdleWest} className='hidden playerImgs2' ref="playerImgIdleWest" alt="logo" />

        </div>
      </React.Fragment>
    )
  }
}

export default App;
