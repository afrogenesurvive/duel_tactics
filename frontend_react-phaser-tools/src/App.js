import React, { Component } from 'react';
import Phaser from 'phaser';
import { GameComponent } from 'phaser-react-tools';
import { IonPhaser } from '@ion-phaser/react';

import logoImg from './logo.png';
import logo from './logo.svg';
import './App.css';


class App extends Component {


  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <div className="containerTop">
          <GameComponent
            config={{
              backgroundColor: '000000',
              height: 600,
              width: 800,
              scene: {
                preload: function () {
                  console.log('preload')
                  this.load.image('logo', logoImg);
                },
                create: function () {
                  console.log('create')
                  const logo = this.add.image(400, 150, 'logo');

                  this.tweens.add({
                      targets: logo,
                      y: 450,
                      duration: 2000,
                      ease: "Power2",
                      yoyo: true,
                      loop: -1
                  });
                },
                update: function () {

                }
              }
            }}
          >
            {/* YOUR GAME UI GOES HERE */}
          </GameComponent>
        </div>
      </React.Fragment>
    )}
}

export default App;
