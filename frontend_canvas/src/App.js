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


  }

  componentDidMount() {

    this.draw();

  }


  componentWillUnmount() {

  }

  draw = () => {

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
