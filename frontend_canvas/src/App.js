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
      row0: ['y00x','x01x','x02x','x03x','x04x','x05x','x06x','x07x','x08x','y09x'],
      row1: ['x10x','x11x','x12x','x13x','x14x','x15x','x16x','x17x','x18x','x19x'],
      row2: ['x20x','x21x','x22x','x23x','x24x','x25x','x26x','x27x','x28x','x29x'],
      row3: ['x30x','x31x','x32x','x33x','x34x','x35x','x36x','x37x','x38x','x39x'],
      row4: ['x40x','x41x','z42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','y53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','z61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
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
      // this.drawPlayerInit(canvas2, context2);
      this.drawGridInit(canvas, context);
      // window.requestAnimationFrame(this.gameLoop(canvas, canvas2, context, context2));
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
    // console.log('clicked',x,y,);

    for(const cell of this.gridInfo2) {
      let point = [x,y];
      let polygon = [];
      for (const vertex of cell.vertices) {
        let vertexPoint = [vertex.x,vertex.y];
        polygon.push(vertexPoint)
      }
      let pip = pointInPolygon(point, polygon)
      // console.log('point',point,'cell',cell.number,'polygon',polygon,'pip',pip);
      if (pip === true) {
        console.log("clicked a cell",cell.number,"x: " + x + " y: " + y);
      }
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
      // this.playerUpdate(this.stepper.step);
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

  drawBall = () => {
    console.log("Drawinig ball");

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 2;
    let dy = -2;

    function drawBall() {
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI*2);
        context.fillStyle = "#0095DD";
        context.fill();
        context.closePath();
    }

    function draw() {
        // context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        x += dx;
        y += dy;
    }

    setInterval(draw, 10);

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
        if (nextPosition === player.target.center) {
          console.log('next position is destination');

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
        }
        player.nextPosition = nextPosition;

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

            if (target.free === true) {
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

    const canvas2 = this.canvasRef2.current;
    const context2 = canvas2.getContext('2d');

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

    // console.log('updatedPlayerImg',updatedPlayerImg);
    // console.log('current pos',player.currentPosition.cell.center.x,player.currentPosition.cell.center.y);
    // console.log('next pos',player.nextPosition.x,player.nextPosition.y);

    context2.clearRect(0, 0, canvas2.width, canvas2.height);

    if (
      newDirection === 'east' ||
      newDirection === 'west' ||
      newDirection === 'north' ||
      newDirection === 'south'
    ) {
      context2.drawImage(updatedPlayerImg, point.x-25, point.y-25, 50,50);
    } else {
      context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);
    }

    player.moving.state = false;
    this.player1 = player;

  }


  lineCrementer = () => {
    console.log('line crementer');

    let player = this.player1;
    let currentPosition = player.currentPosition.cell.center;
    let target = player.target;
    let increment = 5;

    player.moving.stepPercent = player.moving.stepPercent + 1;
    let newPosition;

    // line: percent is 0-1
    // function getLineXYatPercent(startPt,endPt,player.moving.stepPercent) {
    //   let dx = endPt.x-startPt.x;
    //   let dy = endPt.y-startPt.y;
    //   let X = startPt.x + dx*percent;
    //   let Y = startPt.y + dy*percent;
    //
    //   newPosition = {x:X,y:Y}
    // }

    let newX = currentPosition.x+increment;

    // line equation for y
    let y = (((player.moving.origin.center.y-player.target.cell.center.y)/(player.moving.origin.center.x-player.target.cell.center.x))*(newX-player.moving.origin.center.x))+player.moving.origin.center.y
    newPosition = {x:newX, y: y}

    console.log('line crementer oldPos',currentPosition.x,currentPosition.y);
    console.log('line crementer newPos',newPosition.x,newPosition.y);

    player.nextPosition = newPosition
    this.player1 = player;

    return newPosition;

  }

  getTarget = () => {
    console.log('checking target');

    let gridInfo = this.gridInfo2;
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
      free: true,
      occupant: {
        type: '',
        player: '',
      },
    }

    if (player.strafing.state === true) {
      console.log('acquire strafe target');
      direction = this.player.strafing.direction;
    }

    let targetCellNumber = {x: 0,y: 0}
    let targetCellCenter = {x: 0,y: 0}
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
      // console.log('cellnumber',cell.number,'target cell number',targetCellNumber);
      let xMatch = cell.number.x === targetCellNumber.x;
      let yMatch = cell.number.y === targetCellNumber.y;
      if (
        xMatch === true && yMatch === true
      ) {
        targetCellCenter = cell.center;
        console.log('found target details');
      }
    }
    target.cell = {
      number: targetCellNumber,
      center: targetCellCenter
    };

    for (const [key, row] of Object.entries(this.levelData2)) {
      for (const cell of row) {
        if (
          cell.charAt(0) === 'y' ||
          cell.charAt(0) ===  'z'
        ) {

          let obstaclePosition = {
            x: Number(key.charAt(3)),
            y: row.indexOf(cell),
          }
          // console.log('found obstacle during map scan @',obstaclePosition.x,obstaclePosition.y,'targetNumber',targetCellNumber.x,targetCellNumber.y);
          if (targetCellNumber === obstaclePosition) {
            console.log('an obstacle is in your way');
            target.free = false;
            target.occupant.type = 'obstacle';
          }
        }

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

  draw2 = () => {
    console.log("drawing grid 2");

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    const width = 1100;
    const height = 600;
    // context.clearRect(0, 0, canvas.width, canvas.height);

    this.originX = width / 2 - this.Xtiles * this.tileColumnOffset / 2;
    this.originY = height / 2;

    let Xtiles = this.Xtiles;
    let Ytiles = this.Ytiles;
    let tileColumnOffset = this.tileColumnOffset;
    let originX = this.originX;
    let tileRowOffset = this.tileRowOffset;
    let originY = this.originY;
    let selectedTileX = this.selectedTileX;
    let selectedTileY = this.selectedTileY;
    let showCoordinates = this.showCoordinates;
    let gridInfo = [];


    function startProcessLevelData () {
      for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < Ytiles; Yi++) {
          // drawTile(Xi, Yi);

          let offX = Xi * tileColumnOffset / 2 + Yi * tileColumnOffset / 2 + originX;
          let offY = Yi * tileRowOffset / 2 - Xi * tileRowOffset / 2 + originY;

          // parse grindInfo
          let center = {
            x: offX + tileColumnOffset/2 -1,
            y: offY + tileRowOffset/2 -1,
          }
          gridInfo.push({
            number:{x:Xi,y:Yi},
            center:{x:center.x,y:center.y},
            vertices: [
              {x:center.x, y:center.y+(tileRowOffset/2)},
              {x:center.x+(tileColumnOffset/2), y:center.y},
              {x:center.x, y:center.y-(tileRowOffset/2)},
              {x:center.x-(tileColumnOffset/2), y:center.y},
            ],
            // {
            //   a:{x:center.x, y:center.y+(tileRowOffset/2)},
            //   b:{x:center.x+(tileColumnOffset/2), y:center.y},
            //   c:{x:center.x, y:center.y+(tileRowOffset/2)},
            //   d:{x:center.x-(tileColumnOffset/2), y:center.y},
            // },
            side: Math.sqrt((tileRowOffset/2)^2+(tileColumnOffset/2)^2),
            levelData: '',
          })
        }
      }
    }
    startProcessLevelData();
    this.processLevelData(gridInfo,1)
    gridInfo = this.gridInfo;



    function redrawTiles () {
      console.log('intial grid draw');
      for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < Ytiles; Yi++) {
          drawTile(Xi, Yi);
        }
      }
    }

    function drawTile (Xi, Yi) {
      // console.log('cell/tile # ', Xi, Yi);

      let offX = Xi * tileColumnOffset / 2 + Yi * tileColumnOffset / 2 + originX;
      let offY = Yi * tileRowOffset / 2 - Xi * tileRowOffset / 2 + originY;

      //check tile levelData
      let cellLevelData;
      let allCells = gridInfo;
      for (const elem of allCells) {
        if (elem.number.x === Xi && elem.number.y === Yi) {
          console.log('level data for this cell',elem.levelData);
          cellLevelData = elem.levelData;
        }
      }

      // Draw tile interior
      // if( Xi === selectedTileX && Yi === selectedTileY) {
      //   context.fillStyle = 'yellow';
      // }
      // if(cellLevelData !== '') {
      //   context.fillStyle = 'yellow';
      // }
      if(cellLevelData.charAt(0) === 'y') {
        context.fillStyle = 'yellow';
      }
      else {
        context.fillStyle = 'white';
      }
      context.moveTo(offX, offY + tileRowOffset / 2);
      context.lineTo(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2);
      context.lineTo(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset);
      context.lineTo(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2);
      context.stroke();
      context.fill();
      context.closePath();

      // Draw tile outline
      var color = '#000000';
      drawLine(offX, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY, color);
      drawLine(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2, color);
      drawLine(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset, color);
      drawLine(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2, color);

      if(showCoordinates) {
        context.fillStyle = 'black';

        let center = {
          x: offX + tileColumnOffset/2 -1,
          y: offY + tileRowOffset/2 -1,
        }

        // cell number
        // context.fillText(Xi + ", " + Yi, offX + tileColumnOffset/2 - 9, offY + tileRowOffset/2 + 3);
        context.fillText(Xi + ", " + Yi, offX + tileColumnOffset/2 - 9, offY + tileRowOffset/2 + 12);

        // draw centre marker dots
        context.fillStyle = "#0095DD";
        context.fillRect(center.x, center.y,2,2);
      }
    }

    function drawLine (x1, y1, x2, y2, color) {
      color = typeof color !== 'undefined' ? color : 'white';
      context.strokeStyle = color;
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }

    redrawTiles();
    // this.gridInfo = gridInfo;
    console.log('this.gridInfo',this.gridInfo);
    console.log('this.gridInfo2D',this.gridInfo2D);
    // this.processLevelData(gridInfo)

  }

  drawPlayerInit = (gridInfo) => {
  // drawPlayerInit = (canvas, context) => {
    console.log('drawing initial player');

    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

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
      center : point
    }

    // context2.translate(point.x,point.y);
    // context2.rotate(120);
    context2.drawImage(playerImg, point.x-25, point.y-25, 50,50);
    // context2.rotate(-120);
    // context2.translate(-point.x, -point.y);
    // context.save()

    window.requestAnimationFrame(this.gameLoop);

  }

  processLevelData = (allCells,number) => {
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

    if (number === 1) {
      this.gridInfo2D = gridInfo2d;
      // console.log('gridInfo2d',this.gridInfo2D);

      this.gridInfo = allCells;
      // console.log('post parse gridInfo',this.gridInfo);
    } else if (number === 2) {
      this.gridInfo2D2 = gridInfo2d;
      // console.log('gridInfo2d',this.gridInfo2D);

      this.gridInfo2 = allCells;
      // console.log('post parse gridInfo2',this.gridInfo2);
    }


  }

  drawGridInit = (canvas, context) => {
    console.log('drawing initial grid');

    // let canvas = this.canvasRef.current;
    // let context = canvas.getContext('2d');

    canvas.width = 1100;
    canvas.height = 600;

    let gridInfo2 = [];

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

    // this is the calculation for the most common isometric angle (30 degrees)
    // because it's easy to calculate
    function cartesianToIsometric(cartPt) {
        var tempPt = new Point();
        tempPt.x = cartPt.x - cartPt.y;
        tempPt.y = (cartPt.x + cartPt.y) / 2;
        return (tempPt);
    }

    // isometric sprites sizes
    let floorImageWidth = 103;
    let floorImageHeight = 53;
    let wallImageWidth = 103;
    let wallImageHeight = 98;

    // some offsets to center the scene
    let sceneX = canvas.width/2;
    let sceneY = 140;
    let tileWidth = 50;

    function startProcessLevelData () {

      for (var x = 0; x < 10; x++) {
          for (var y = 0; y < 10; y++) {

            let p = new Point();
            p.x = x * tileWidth;
            p.y = y * tileWidth;
            // p.x = x * tileWidth;
            // p.y = y * tileWidth;
            let iso = cartesianToIsometric(p);

            let offset = {x: floorImageWidth/2, y: floorImageHeight}

            // apply offset to center scene for a better view
            iso.x += sceneX
            iso.y += sceneY

            let center = {
              x: iso.x - offset.x/2+23,
              y: iso.y - offset.y/2-2,
            }

          gridInfo2.push({
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
          })
        }
      }

    }
    startProcessLevelData();
    this.processLevelData(gridInfo2,2)
    gridInfo2 = this.gridInfo2;

    // draw scene elements like our sprites, images, etc.
    function drawScene(time) {

        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
                let p = new Point();
                p.x = x * tileWidth;
                p.y = y * tileWidth;

                let iso = cartesianToIsometric(p);
                let offset = {x: floorImageWidth/2, y: floorImageHeight}

                // apply offset to center scene for a better view
                iso.x += sceneX
                iso.y += sceneY

                let center = {
                  x: iso.x - offset.x/2+23,
                  y: iso.y - offset.y/2-2,
                }

                let cellLevelData;
                let allCells = gridInfo2;
                for (const elem of allCells) {
                  if (elem.number.x === x && elem.number.y === y) {
                    // console.log('level data for this cell',elem.levelData);
                    cellLevelData = elem.levelData;
                  }
                }

                // apply offset to place each isometric image from its bottom center.
                // the default pivot point (top left) won't do good if our image has height like the wall image here

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

                // context.fillRect(iso.x - offset.x/2+23, iso.y - offset.y/2-2,5,5);
                // ctx.fillText(""+x+","+y+"",iso.x - offset.x,iso.y - offset.y)

                let walledTiles = ['0,0','9,0','0,9']
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

    drawScene();

    this.drawPlayerInit(gridInfo2);

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
