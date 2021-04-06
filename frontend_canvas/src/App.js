import React, { Component } from 'react';
import logo from './logo.svg';
import tile from './assets/floor0.png'
import './App.css';

class App extends Component {
  state = {



  }


  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasRef2 = React.createRef();

    this.tileColumnOffset = 64; // pixels
    this.tileRowOffset = 32; // pixels
    // this.tileColumnOffset = 100; // pixels
    // this.tileRowOffset = 50; // pixels
    this.originX = 0; // offset from left
    this.originY = 0; // offset from top
    this.Xtiles = 10;
    this.Ytiles = 10;
    this.showCoordinates = true;
    this.selectedTileX = -1;
    this.selectedTileY = -1;
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

    canvas2.addEventListener("mousemove", e => {
      console.log('canvas mousemove',e);
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
      console.log("mousemove selectedTile",tileX,tileY);
      // this.draw2();
      // this.drawSelected(tileX,tileY);
    });

    canvas2.addEventListener("mouseout", e => {
      console.log('canvas 2 mouseout');
      context2.clearRect(0, 0, canvas.width, canvas.height);
    })

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

  draw2 = () => {
    console.log("drawing grid 2");

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');

    const width = 1000;
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

    function redrawTiles () {
      for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < Ytiles; Yi++) {
          drawTile(Xi, Yi);
        }
      }
    }

    function drawTile (Xi, Yi) {
      console.log('intial grid draw... tile', Xi, Yi);
      let offX = Xi * tileColumnOffset / 2 + Yi * tileColumnOffset / 2 + originX;
      let offY = Yi * tileRowOffset / 2 - Xi * tileRowOffset / 2 + originY;

      // Draw tile interior
      if( Xi === selectedTileX && Yi === selectedTileY)
        context.fillStyle = 'yellow';
      else
        context.fillStyle = 'white';
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
        context.fillText(Xi + ", " + Yi, offX + tileColumnOffset/2 - 9, offY + tileRowOffset/2 + 3);
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

  }

  drawSelected = (argx,argy) => {
    console.log("drawing grid selected");

    const canvas2 = this.canvasRef2.current;
    const context2 = canvas2.getContext('2d');

    const width = 1000;
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


    let offX = selectedTileX * tileColumnOffset / 2 + selectedTileY * tileColumnOffset / 2 + originX;
    let offY = selectedTileY * tileRowOffset / 2 - selectedTileX * tileRowOffset / 2 + originY;

    context2.fillStyle = 'yellow';
    context2.moveTo(offX, offY + tileRowOffset / 2);
    context2.lineTo(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2);
    context2.lineTo(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset);
    context2.lineTo(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2);
    context2.stroke();
    context2.fill();
    context2.closePath();


    // let color = 'purple';
    // drawLine(offX, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY, color);
    // drawLine(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2, color);
    // drawLine(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset, color);
    // drawLine(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2, color);


    function redrawTiles () {
      for(var Xi = (Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < Ytiles; Yi++) {
          drawTile(Xi, Yi);
        }
      }
    }

    function drawTile (Xi, Yi) {
      console.log('drawing individual tile',Xi,Yi);
      console.log('selected',argx,argy);
      // let offX = selectedTileX * tileColumnOffset / 2 + selectedTileY * tileColumnOffset / 2 + originX;
      // let offY = selectedTileY * tileRowOffset / 2 - selectedTileX * tileRowOffset / 2 + originY;

      let offX = Xi * tileColumnOffset / 2 + Yi * tileColumnOffset / 2 + originX;
      let offY = Yi * tileRowOffset / 2 - Xi * tileRowOffset / 2 + originY;

      // // Draw tile interior
      // if( Xi == selectedTileX && Yi == selectedTileY){
      //   context2.fillStyle = 'yellow';
      //   console.log('ding ding ding');
      // } else {
      //   context2.fillStyle = 'white';
      // }
      // context2.moveTo(offX, offY + tileRowOffset / 2);
      // context2.lineTo(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2);
      // context2.lineTo(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset);
      // context2.lineTo(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2);
      // context2.stroke();
      // context2.fill();
      // context2.closePath();

      // if (Xi == selectedTileX && Yi == selectedTileY) {
      //   // let offX = selectedTileX * tileColumnOffset / 2 + selectedTileY * tileColumnOffset / 2 + originX;
      //   // let offY = selectedTileY * tileRowOffset / 2 - selectedTileX * tileRowOffset / 2 + originY;
      //
      //   context2.fillStyle = 'yellow';
      //   context2.moveTo(offX, offY + tileRowOffset / 2);
      //   context2.lineTo(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2);
      //   context2.lineTo(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset);
      //   context2.lineTo(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2);
      //   context2.stroke();
      //   context2.fill();
      //   context2.closePath();
      // }

      // Draw tile outline
      var color = 'purple';
      drawLine(offX, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY, color);
      drawLine(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2, color);
      drawLine(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset, color);
      drawLine(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2, color);

    }

    function drawLine (x1, y1, x2, y2, color) {
      color = typeof color !== 'undefined' ? color : 'white';
      context2.strokeStyle = color;
      context2.beginPath();
      context2.lineWidth = 1;
      context2.moveTo(x1, y1);
      context2.lineTo(x2, y2);
      context2.stroke();
    }

    // redrawTiles();

  }



  render() {
    return (
      <React.Fragment>
        <div className="containerTop">
          <div className="containerInner">
            <canvas
              width="1000"
              height="600"
              ref={this.canvasRef}
              className="canvas"
            />
            <canvas
              width="1000"
              height="600"
              ref={this.canvasRef2}
              className="canvas2"
            />
          </div>
          <img src={tile} className='hidden' ref="tile" alt="logo" />
        </div>
      </React.Fragment>
    )
  }
}

export default App;
