import Phaser from 'phaser'


import assetHeroTile from '../assets/hero_tile.png?dl=0';
import assetHero from '../assets/hero_8_4_41_62.png?dl=0';
import assetHeroJson from '../assets/hero_8_4_41_62.json?dl=0';

export default class PreloadScene extends Phaser.Scene {
    preload() {
        let that = this;

        this.load.on("complete", () => {
            that.scene.start("level-1-scene")
        });

        this.load.image('heroTile', assetHeroTile);
        this.load.atlas('hero', assetHero, assetHeroJson);
    }
}
