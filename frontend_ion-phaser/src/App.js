import React, { Component } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

import logoImg from './logo.png';

class App extends Component {
  state = {
    initialize: true,
    game: {
      width: 800,
      height: 600,
      type: Phaser.AUTO,
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
