import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'


import Example from './scenes/Example'
import PreloadScene from './scenes/PreloadScene'
import Level1Scene from './scenes/Level1Scene'
import Level2Scene from './scenes/Level2Scene'

import logoImg from './logo.png';

class App extends Component {
  state = {
    initialize: true,
    game: {
      width: 800,
      height: 600,
      type: Phaser.WEBGL,
      scene: [Example]
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
