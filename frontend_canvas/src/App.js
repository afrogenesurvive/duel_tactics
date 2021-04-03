import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {

  }


  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {

    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 1;
    let dy = -1;


    function drawBall() {


      context.beginPath();
      context.arc(x, y, 10, 0, Math.PI*2);
      context.fillStyle = "#0095DD";
      context.fill();
      context.closePath();
    }
    // drawBall()

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        x += dx;
        y += dy;
    }
    setInterval(draw, 10);
    // for (let i = 0; i < 1000; i++) {
    //   draw()
    // }


  }


  componentWillUnmount() {

  }


  render() {
    return (
      <React.Fragment>
        <div className="containerTop">
          <div className="containerInner">
            <canvas
                width="800"
                height="600"
                ref={this.canvasRef}
                className={this.state.canvasClass}
              />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
