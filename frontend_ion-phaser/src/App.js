import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'


import Example from './scenes/Example'
import Example2 from './scenes/Example2'
import PreloadScene from './scenes/PreloadScene'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'

import logoImg from './logo.png';

class App extends Component {
  state = {
    initialize: true,
    game: {
      type: Phaser.WEBGL,
      width: 800,
      height: 600,
      backgroundColor: '#ababab',
      parent: 'phaser-example',
      scene: [ Example ]

      // type: Phaser.AUTO,
    	// width: 600,
    	// height: 400,
    	// scene: [PreloadScene, Level1Scene, Level2Scene]

      // type: Phaser.AUTO,
      // width: 800,
      // height: 600,
      // parent: 'phaser-example',
      // pixelArt: true,
      // backgroundColor: '#1a1a2d',
      // scene: [Example2]

      // type: Phaser.AUTO,
      // width: 800,
      // height: 600,
      // backgroundColor: '#1a1a2d',
      // scene: {
      //   preload: function () {
      //     console.log('preload')
      //     this.load.image('logo', logoImg);
      //   },
      //   create: function () {
      //     console.log('create')
      //     const logo = this.add.image(400, 150, 'logo');
      //
      //     this.tweens.add({
      //         targets: logo,
      //         y: 450,
      //         duration: 2000,
      //         ease: "Power2",
      //         yoyo: true,
      //         loop: -1
      //     });
      //   },
      //   update: function () {
      //
      //   }
      // }
    }


  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }


  render() {
    const { initialize, game } = this.state
    return (
      <React.Fragment>
        <div className="containerTop">
          <div className="containerInner">
            <IonPhaser className="ionPhaserComponent" game={game} initialize={initialize} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
