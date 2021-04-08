import React, { Component } from 'react';
import logo from './logo.svg';
import tile from './assets/floor0.png'
import floor2 from './assets/floor2.png'
import wall2 from './assets/wall2.png'
import './App.css';

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
      row4: ['x40x','x41x','y42x','x43x','x44x','x45x','x46x','x47x','x48x','z49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','z61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
      row7: ['x70x','x71x','x72x','x73x','x74x','x75x','x76x','x77x','x78x','x79x'],
      row8: ['x80x','x81x','x82x','x83x','x84x','x85x','y86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    }

  }

  componentDidMount() {

    this.addListeners();

    // this.draw();
    // this.draw2();
    this.draw3();

  }


  componentWillUnmount() {

  }

  draw = () => {
    console.log('draw grid');

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    const tile = this.refs.tile;
    let gridWidth = 64;
    let gridHeight = 32;
    let spriteWidth = gridWidth;
    let spriteHeight = tile.height/tile.width*gridWidth;
    let csWidth = 650;
    let csHeight = 400;
    let ox = csWidth/2-spriteWidth/2;
    let oy = spriteHeight;

    function renderImage (x, y) {
       context.drawImage(tile, ox + (x - y) * spriteWidth/2, oy + (y + x) * gridHeight/2-(spriteHeight-gridHeight),spriteWidth,spriteHeight)
    }
    function draw () {
      for(var x = 0; x < 10; x++) {
      for(var y = 0; y < 10; y++) {
          renderImage(x,y)
      }}
    }

    draw();

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

  addListeners = () => {
    console.log('adding listeners');

    const canvas = this.canvasRef.current;
    const canvas2 = this.canvasRef2.current;
    const canvas3 = this.canvasRef3.current;
    const context = canvas.getContext('2d');
    const context2 = canvas2.getContext('2d');

    canvas.addEventListener("click", e => {
      console.log('canvas click',e);
      // this.drawBall();
    });

    canvas2.addEventListener("click", e => {
      // console.log('canvas click',e);
      this.getCanvasClick(canvas2, e)
    });
    canvas3.addEventListener("click", e => {
      // console.log('canvas click',e);
      this.getCanvasClick(canvas3, e)
    });


    canvas2.addEventListener("mousemove", e => {
      // console.log('canvas mousemove',e);
      let pageX;
      let pageY;
      let tileX;
      let tileY;
      pageX = e.pageX - this.tileColumnOffset / 2 - this.originX;
      pageY = e.pageY - this.tileRowOffset / 2 - this.originY;
      tileX = Math.round(e.pageX / this.tileColumnOffset - e.pageY / this.tileRowOffset);
      tileY = Math.round(e.pageX / this.tileColumnOffset + e.pageY / this.tileRowOffset);

      this.selectedTileX = tileX;
      this.selectedTileY = tileY;
      // console.log("mousemove selectedTile",tileX,tileY);
      // this.draw2();
      // this.drawSelected(tileX,tileY);
      this.getCanvasClick(canvas2, e)
    });

    canvas2.addEventListener("mouseout", e => {
      console.log('canvas 2 mouseout');
      context2.clearRect(0, 0, canvas.width, canvas.height);
    })

  }
  getCanvasClick = (canvas, event) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)

    // if
    // this.tileColumnOffset = 100;
    // this.tileRowOffset = 50;
    // check if any center point in the grid info array is within point x and point y +/- 5.5 or 7

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
            vertices:
            {
              a:center.y-(tileRowOffset/2),
              c:center.y+(tileRowOffset/2),
              b:center.x+(tileColumnOffset/2),
              d:center.x-(tileColumnOffset/2),
            },
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

      // // parse grindInfo
      // let center = {
      //   x: offX + tileColumnOffset/2 -1,
      //   y: offY + tileRowOffset/2 -1,
      // }
      // gridInfo.push({
      //   number:{x:Xi,y:Yi},
      //   center:{x:center.x,y:center.y},
      //   vertices:
      //   {
      //     a:center.y-(tileRowOffset/2),
      //     c:center.y+(tileRowOffset/2),
      //     b:center.x+(tileColumnOffset/2),
      //     d:center.x-(tileColumnOffset/2),
      //   },
      //   side: Math.sqrt((tileRowOffset/2)^2+(tileColumnOffset/2)^2),
      //   levelData: '',
      // })

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
      console.log('bing');
      this.gridInfo2D = gridInfo2d;
      // console.log('gridInfo2d',this.gridInfo2D);

      this.gridInfo = allCells;
      // console.log('post parse gridInfo',this.gridInfo);
    } else if (number === 2) {
      console.log('bong');
      this.gridInfo2D2 = gridInfo2d;
      // console.log('gridInfo2d',this.gridInfo2D);

      this.gridInfo2 = allCells;
      // console.log('post parse gridInfo2',this.gridInfo2);
    }


  }

  drawPlayers = () => {

    // context.clearRect(0, 0, canvas.width, canvas.height);

  }

  drawSelected = (argx,argy) => {
    console.log("drawing grid selected");

    const canvas2 = this.canvasRef2.current;
    const context2 = canvas2.getContext('2d');


  }

  // function isIntersecting(p1, p2, p3, p4) {
  //   function CCW(p1, p2, p3) {
  //       return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
  //   }
  //   return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
  // }

  draw3 = () => {
    console.log('drawing grid 3');

    // let Xtiles = this.Xtiles;
    // let Ytiles = this.Ytiles;
    let gridInfo2 = [];

    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    let canvas3 = this.canvasRef3.current;
    let context = canvas3.getContext('2d');
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas3.width = 1100;
    canvas3.height = 600;

    // get images
    let floor = this.refs.floor2;
    let wall = this.refs.wall2;

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
    let sceneX = canvas3.width/2;
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

          let iso = cartesianToIsometric(p);

          let offset = {x: floorImageWidth/2, y: floorImageHeight}

          // console.log('offsets',offset.x,offset.y);
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
            vertices:
            {
              a:center.y-(25),
              c:center.y+(25),
              b:center.x+(50),
              d:center.x-(50),
            },
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
      console.log('gridInfo2 @ draw tiles',gridInfo2);

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

                console.log('offsets',offset.x,offset.y);
                // apply offset to center scene for a better view
                iso.x += sceneX
                iso.y += sceneY


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
                context.fillRect(iso.x - offset.x/2+23, iso.y - offset.y/2-2,2,2);
                // ctx.fillText(""+x+","+y+"",iso.x - offset.x,iso.y - offset.y)

                let walledTiles = ['0,0','9,0','0,9']
                if (walledTiles.includes(''+x+','+y+'')) {
                  offset = {x: wallImageWidth/2, y: wallImageHeight}
                  context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);
                }

                if(cellLevelData.charAt(0) === 'y') {
                  console.log('beep');
                  offset = {x: wallImageWidth/2, y: wallImageHeight}
                  context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);

                }
                if(cellLevelData.charAt(0) === 'z') {
                  offset = {x: wallImageWidth/2, y: wallImageHeight}
                  context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);

                  let isoHeight = wallImageHeight - floorImageHeight
                  offset.y += isoHeight
                  context.drawImage(wall, iso.x - offset.x, iso.y - offset.y);

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
          <img src={wall2} className='hidden' ref="wall2" alt="logo" />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
