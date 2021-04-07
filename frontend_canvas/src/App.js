import React, { Component } from 'react';
import logo from './logo.svg';
import tile from './assets/floor0.png'
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
      row4: ['x40x','x41x','x42x','x43x','x44x','x45x','x46x','x47x','x48x','x49x'],
      row5: ['x50x','x51x','x52x','x53x','x54x','x55x','x56x','x57x','x58x','x59x'],
      row6: ['x60x','x61x','x62x','x63x','x64x','x65x','x66x','x67x','x68x','x69x'],
      row7: ['x70x','x71x','x72x','x73x','x74x','x75x','x76x','x77x','x78x','x79x'],
      row8: ['x80x','x81x','x82x','x83x','x84x','x85x','x86x','x87x','x88x','x89x'],
      row9: ['x90x','x91x','x92x','x93x','x94x','x95x','x96x','x97x','x98x','x99x'],
    }

  }

  componentDidMount() {

    this.addListeners();

    // this.draw();
    this.draw2();

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
      console.log('intial grid draw');
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
    this.processLevelData(gridInfo)
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
        </div>
      </React.Fragment>
    )
  }
}

export default App;
