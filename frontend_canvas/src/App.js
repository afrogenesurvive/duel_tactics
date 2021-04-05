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

    this.tileColumnOffset = 64; // pixels
    this.tileRowOffset = 32; // pixels
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
    const context = canvas.getContext('2d');

    canvas.addEventListener("click", e => {
      console.log('canvas click',e);
      this.drawBall();
    });

    // canvas.addEventListener("mousemove", e => {
    //   console.log('canvas mousemove',e);
    //   e.pageX = e.pageX - this.tileColumnOffset / 2 - this.originX;
    //   e.pageY = e.pageY - this.tileRowOffset / 2 - this.originY;
    //   this.tileX = Math.round(e.pageX / this.tileColumnOffset - e.pageY / this.tileRowOffset);
    //   this.tileY = Math.round(e.pageX / this.tileColumnOffset + e.pageY / this.tileRowOffset);
    // });

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

    const width = 650;
    const height = 400;

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
      let offX = Xi * tileColumnOffset / 2 + Yi * tileColumnOffset / 2 + originX;
      let offY = Yi * tileRowOffset / 2 - Xi * tileRowOffset / 2 + originY;

      // Draw tile interior
      if( Xi == selectedTileX && Yi == selectedTileY)
        context.fillStyle = 'yellow';
      else
        context.fillStyle = 'green';
      context.moveTo(offX, offY + tileRowOffset / 2);
      context.lineTo(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2);
      context.lineTo(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset);
      context.lineTo(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2);
      context.stroke();
      context.fill();
      context.closePath();

      // Draw tile outline
      var color = '#999';
      drawLine(offX, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY, color);
      drawLine(offX + tileColumnOffset / 2, offY, offX + tileColumnOffset, offY + tileRowOffset / 2, color);
      drawLine(offX + tileColumnOffset, offY + tileRowOffset / 2, offX + tileColumnOffset / 2, offY + tileRowOffset, color);
      drawLine(offX + tileColumnOffset / 2, offY + tileRowOffset, offX, offY + tileRowOffset / 2, color);

      if(showCoordinates) {
        context.fillStyle = 'orange';
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




  render() {
    return (
      <React.Fragment>
        <div className="containerTop">
          <div className="containerInner">
            <canvas
                width="650"
                height="400"
                ref={this.canvasRef}
                className="canvas"
              />

            <img src={tile} className='hidden' ref="tile" alt="logo" />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
