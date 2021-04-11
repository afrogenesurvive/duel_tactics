import React, { Component } from 'react';
import logo from './logo.svg';
import tile from './assets/floor0.png'
import floor2 from './assets/floor2.png'
import wall from './assets/wall.png'
import wall2 from './assets/wall2.png'
import wall3 from './assets/wall3.png'

import playerImgIdleNorth from './assets/player/playerImg.png'
import playerImgIdleNorthWest from './assets/player/playerImg.png'
import playerImgIdleNorthEast from './assets/player/playerImg.png'
import playerImgIdleWest from './assets/player/playerImg.png'
import playerImgIdleEast from './assets/player/playerImg.png'
import playerImgIdleSouth from './assets/player/playerImg.png'
import playerImgIdleSouthWest from './assets/player/playerImg.png'
import playerImgIdleSouthEast from './assets/player/playerImg.png'

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
            x: 4,
            y: 5,
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
          }
        }
      },
      direction: 'north',
      action: 'idle',
      moving: {
        state: false,
        step: 0,
        course: '',
        origin: {
          x: 0,
          y: 0,
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
      },
      defending: {
        state: false,
        count: 0,
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

    // this.stepper.last = this.timestamp();
    // this.stepper.now = this.timestamp();
    // // this.stepper.dt = this.stepper.dt + (this.stepper.now - this.stepper.last);
    // this.stepper.dt = this.stepper.dt + Math.min(1, (this.stepper.now - this.stepper.last) / 1000);
    // console.log('last',this.stepper.last,'now:',this.stepper.now, 'dt',this.stepper.dt);

    this.addListeners();
    this.drawGridInit();

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

    console.log('handling key press', event, state);

    // keyInput = event value
    // switch(keyInput) {
    //   case northInputKey :
    //    this.keyPressd.north = state
    //   break;
    // }

  }


  timestamp = () => {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  gameLoop = () => {
    let ts = window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    // console.log('timeStamp',ts);
    this.stepper.secondsPassed = (ts - this.stepper.oldTimeStamp) / 1000;
    this.stepper.oldTimeStamp = ts;
    this.stepper.secondsPassed = Math.min(this.stepper.secondsPassed, 0.1);


    this.stepper.now = ts;
    this.stepper.dt = this.stepper.dt + Math.min(1, (this.stepper.now - this.stepper.last) / 100);

    while(this.stepper.dt > this.stepper.step) {
      this.stepper.dt = this.dt - this.stepper.step;
      // this.playerUpdate(this.stepper.step);
    }
    // console.log('timeStamp',ts,'seconds',this.stepper.secondsPassed,'step',this.stepper.step,'dt',this.stepper.dt);
    this.playerUpdate(this.stepper.secondsPassed, this.stepper.step);


    // this.drawPlayerStep(this.dt);
    this.stepper.last = this.stepper.now;

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



  playerUpdate = (seconds,step) => {
    // console.log('updating player');

    // let direction;
    // check set this.keyPressed
      // check for all true keyPressed object keys using
      // Object.keys(obj).forEach(function(key,index) {
      //   // key: the name of the object key
      //   // index: the ordinal position of the key within the object
      // });
      // OR
      // for (const [key, value] of Object.entries(object1)) {
      //   console.log(`${key}: ${value}`);
      // }

    // if player.moving === true
      // check course function
      // calculate this.player.nextPosition by plugging current position, into this.lineMoveincrementer(player, currentPosition, target, origin)

      // if this.player.nextPosition.center = traget.center,
        // this.player.moving = false, action = idle, moving.stepPrercent = 0

    // if not moving
      // check if key pressed is a move key
        // if is a move key

            // if key pressed === this.player.direction & strafe == false
              // find target w/ cell -> direction
                // check if target is free
                // (check grindinfo against target cell no x,y for walled cells, check other player current position against targets)
                  // if target grid is free
                    // can move
                    // destination = target.center
                    // start a course (set a function) based destination and current position
                      // the greater the number of incremental steps the smoother and slower the movement????
                    // moving.state = true
                    // action = moving
                    // player.moving.origin = current position

                    // player next position = this.lineMoveincrementer(player, currentPosition, target)

                // if target is not free
                  // do nothing
            //
            // if key pressed !== this.player.direction and strafe == false
            //   player direction = direction
            //
            // key pressed !== this.player.direction and strafe ==  true
            // set strafeDirection = keypressed
              // find strafe target
                      // if free
                      // callLineCrmenter
            //        if not free do nothing



        // if no move key pressed

          // check if attack or defend key pressed
            // if currently attacking or defending
            //   check attack or defend count
            //     if action count is less than action limit
            //       action count ++
            //
            //     if aciton count == limit
            //       action = false & count = 0
            //
            // if not currently attacking or defending
              // attacking/defending = true
              // action = attack or defend

              //   count = 1

          // player next position = player currentPosition




  }

  drawPlayerStep = () => {
    // console.log('drawing player step');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

    let player = this.player1;

    let playerImgs = {
      idle: {
        north: this.refs.playerImgIdleNorth,
        northWest: this.refs.playerImgIdleNorth,
        northEast: this.refs.playerImgIdleEast,
        south: this.refs.playerImgIdleSouth,
        southWest: this.refs.playerImgIdleSouthWest,
        southEast: this.refs.playerImgIdleSouthEast,
        east: this.refs.playerImgIdleEast,
        west: this.refs.playerImgIdleWest,
      },
      walking: {
        north: this.refs.playerImgIdleNorth,
        northWest: this.refs.playerImgIdleNorth,
        northEast: this.refs.playerImgIdleEast,
        south: this.refs.playerImgIdleSouth,
        southWest: this.refs.playerImgIdleSouthWest,
        southEast: this.refs.playerImgIdleSouthEast,
        east: this.refs.playerImgIdleEast,
        west: this.refs.playerImgIdleWest,
      },
      attacking: {
        north: this.refs.playerImgIdleNorth,
        northWest: this.refs.playerImgIdleNorth,
        northEast: this.refs.playerImgIdleEast,
        south: this.refs.playerImgIdleSouth,
        southWest: this.refs.playerImgIdleSouthWest,
        southEast: this.refs.playerImgIdleSouthEast,
        east: this.refs.playerImgIdleEast,
        west: this.refs.playerImgIdleWest,
      },
      defending: {
        north: this.refs.playerImgIdleNorth,
        northWest: this.refs.playerImgIdleNorth,
        northEast: this.refs.playerImgIdleEast,
        south: this.refs.playerImgIdleSouth,
        southWest: this.refs.playerImgIdleSouthWest,
        southEast: this.refs.playerImgIdleSouthEast,
        east: this.refs.playerImgIdleEast,
        west: this.refs.playerImgIdleWest,
      },

    };
    // let playerImgs = {
    //   idle: {
    //     north: this.refs.playerImgIdleNorth,
    //     northWest: this.refs.playerImgIdleNorth,
    //     northEast: this.refs.playerImgIdleEast,
    //     south: this.refs.playerImgIdleSouth,
    //     southWest: this.refs.playerImgIdleSouthWest,
    //     southEast: this.refs.playerImgIdleSouthEast,
    //     east: this.refs.playerImgIdleEast,
    //     west: this.refs.playerImgIdleWest,
    //   },
    //   walking: {
    //     north: this.refs.playerImgWalkNorth,
    //     northWest: this.refs.playerImgWalkNorth,
    //     northEast: this.refs.playerImgWalkEast,
    //     south: this.refs.playerImgWalkSouth,
    //     southWest: this.refs.playerImgWalkSouthWest,
    //     southEast: this.refs.playerImgWalkSouthEast,
    //     east: this.refs.playerImgWalkEast,
    //     west: this.refs.playerImgWalkWest,
    //   },
    //   attacking: {
    //     north: this.refs.playerImgAttackNorth,
    //     northWest: this.refs.playerImgAttackNorth,
    //     northEast: this.refs.playerImgAttackEast,
    //     south: this.refs.playerImgAttackSouth,
    //     southWest: this.refs.playerImgAttackSouthWest,
    //     southEast: this.refs.playerImgAttackSouthEast,
    //     east: this.refs.playerImgAttackEast,
    //     west: this.refs.playerImgAttackWest,
    //   },
    //   defending: {
    //     north: this.refs.playerImgDefendNorth,
    //     northWest: this.refs.playerImgDefendNorth,
    //     northEast: this.refs.playerImgDefendEast,
    //     south: this.refs.playerImgDefendSouth,
    //     southWest: this.refs.playerImgDefendSouthWest,
    //     southEast: this.refs.playerImgDefendSouthEast,
    //     east: this.refs.playerImgDefendEast,
    //     west: this.refs.playerImgDefendWest,
    //   },
    //
    // };

    let point = {
      x: player.nextPosition.x,
      y: player.nextPosition.y,
    };

    let updatedPlayerImg;

    switch(this.player.action) {
      case 'idle':
        switch(this.player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.idle.north;
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.idle.northWest;
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.idle.northEast;
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.idle.east;
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.idle.west;
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.idle.south;
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.idle.southWest;
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.idle.southEast;
          break;
        }
      break;
      case 'walking':
        switch(this.player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.walking.north;
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.walking.northWest;
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.walking.northEast;
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.walking.east;
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.walking.west;
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.walking.south;
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.walking.southWest;
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.walking.southEast;
          break;
        }
      break;
      case 'attacking':
        switch(this.player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.attacking.north;
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.attacking.northWest;
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.attacking.northEast;
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.attacking.east;
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.attacking.west;
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.attacking.south;
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.attacking.southWest;
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.attacking.southEast;
          break;
        }
      break;
      case 'defending':
        switch(this.player.direction) {
          case 'north' :
            updatedPlayerImg = playerImgs.defending.north;
          break;
          case 'northWest' :
            updatedPlayerImg = playerImgs.defending.northWest;
          break;
          case 'northEast' :
            updatedPlayerImg = playerImgs.defending.northEast;
          break;
          case 'east' :
            updatedPlayerImg = playerImgs.defending.east;
          break;
          case 'west' :
            updatedPlayerImg = playerImgs.defending.west;
          break;
          case 'south' :
            updatedPlayerImg = playerImgs.defending.south;
          break;
          case 'southWest' :
            updatedPlayerImg = playerImgs.defending.southWest;
          break;
          case 'southEast' :
            updatedPlayerImg = playerImgs.defending.southEast;
          break;
        }
      break;
    }

    context2.clearRect(0, 0, canvas2.width, canvas2.height);
    context2.drawImage(updatedPlayerImg, point.x-20, point.y-20, 40,40);

  }


  lineCrementer = (player, currentPosition, target, origin) => {


    // player.moving.stepPercent + 1
    // let newPosition

    // line: percent is 0-1
    // function getLineXYatPercent(startPt,endPt,player.moving.stepPercent) {
    //   let dx = endPt.x-startPt.x;
    //   let dy = endPt.y-startPt.y;
    //   let X = startPt.x + dx*percent;
    //   let Y = startPt.y + dy*percent;
    //
    //   newPosition = {x:X,y:Y}
    // }


    // let newX = x+increment
    //
    // line equation for y
    // y = (((origin.y-player.target.center.y)/(origin.x-player.target.center.x))*(newx-origin.x))+origin.y
    //
    // newPosition = {x:newX, y: y}
    //
    // this.player.nextPosition =




  }

  getTarget = () => {

    // currentPosition.cell.number, direction

    // if straing == true direction = strafedirection
    //
    // let targetCellNumber = {x: 0,y: 0}
    // switch(direction) {
    //   case 'north' :
    //     targetCellNumber = {
    //       x: currrenPosition.x,
    //       y: currrenPosition.y-1
    //     }
    //   break;
    //   case 'north' :
    //     targetCellNumber = {
    //       x: currrenPosition.x,
    //       y: currrenPosition.y-1
    //     }
    //   break;
    // }

    // loop grindinfo for to match number and find center
    // check level data for obstacles for  any macthes with target cell targetCellNumber
      // check other player current position for match

      // if match free = false
      // occupant = {
      //   type: 'player/obstacle',
        // player: player1/player2
      // }

    // return {
    //   cell: {
    //     number: {
    //       x: 0,
    //       y: 0,
    //     },
    //     center: {
    //       x: 0,
    //       y: 0,
    //     },
    //     free: targetFree,
          // occupant
    //   }
    // }

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
    console.log('drawing initial player');

    let canvas2 = this.canvasRef2.current;
    let context2 = canvas2.getContext('2d');

    let player = this.player1;

    let playerImg = this.refs.playerImgIdleNorth;

    let point = {
      x: 0,
      y: 0,
    };

    for (const cell of gridInfo) {
      // console.log('xxxx',cell.number.x,cell.number.y,'center',cell.center.x,cell.center.y);
      if (
        cell.number.x === player.startPosition.cell.number.x &&
        cell.number.y === player.startPosition.cell.number.y
      ) {
        // console.log('bing',player.startPosition.cell.center.x,player.startPosition.cell.center.y);
        // console.log('bing',cell.number.y,player.startPosition.cell.number.y);
        point.x = cell.center.x;
        point.y = cell.center.y;
      }

    }
    // console.log(point.x,point.y);

    this.player1.currentPosition.cell.number = {
      x: player.startPosition.cell.number.x ,
      y: player.startPosition.cell.number.y
    }

    // context2.translate(point.x,point.y);
    // context2.rotate(120);
    context2.drawImage(playerImg, point.x-20, point.y-20, 40,40);
    // context2.rotate(-120);
    // context2.translate(-point.x, -point.y);
    // context2.save()

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

  drawGridInit = () => {
    console.log('drawing initial grid');

    // let Xtiles = this.Xtiles;
    // let Ytiles = this.Ytiles;
    let gridInfo2 = [];

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let canvas = this.canvasRef.current;
    let context = canvas.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = 1100;
    canvas.height = 600;

    // get images
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
    let sceneY = 150;
    // Normally this should be the width of each square tile in top-down looking scene
    // But, I couldn't figure out how the author reaches this value :(
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
        // console.log('gridInfo2 @ draw scene',gridInfo2);

        // for (var x = 9; x >= 0; x--) {
        //     for (var y = 9; y >= 0; y--) {
        for (var x = 0; x < 10; x++) {
            for (var y = 0; y < 10; y++) {
        // for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        //   for(var Yi = 0; Yi < Ytiles; Yi++) {
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

                // place some walls on every three
                // if(y % 3 == 0 && x % 3 == 0){
                //     offset = {x: wallImageWidth/2, y: wallImageHeight}
                //     context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);
                //
                //     // put some more on second level floor
                //     // if(y % 6 == 0 && x % 6 == 0){
                //     //     let isoHeight = wallImageHeight - floorImageHeight
                //     //     offset.y += isoHeight
                //     //     context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);
                //     // }
                //
                // }

            }
        }
    }

    drawScene();
    this.drawPlayerInit(gridInfo2);
    // this.gridInfo2 = gridInfo2;
    // console.log('gridInfo2',this.gridInfo2);

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
          <img src={playerImgIdleNorth} className='hidden' ref="playerImgIdleNorth" alt="logo" />
          <img src={playerImgIdleNorthWest} className='hidden' ref="playerImgIdleNorthWest" alt="logo" />
          <img src={playerImgIdleNorthEast} className='hidden' ref="playerImgIdleNorthEast" alt="logo" />
          <img src={playerImgIdleSouth} className='hidden' ref="playerImgIdleSouth" alt="logo" />
          <img src={playerImgIdleSouthWest} className='hidden' ref="playerImgIdleSouthWest" alt="logo" />
          <img src={playerImgIdleSouthEast} className='hidden' ref="playerImgIdleSouthEast" alt="logo" />
          <img src={playerImgIdleEast} className='hidden' ref="playerImgIdleSouthEast" alt="logo" />
          <img src={playerImgIdleWest} className='hidden' ref="playerImgIdleSouthEast" alt="logo" />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
