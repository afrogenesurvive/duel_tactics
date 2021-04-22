import Phaser from 'phaser'

import assetGreenTile from '../assets/green_tile.png';
import assetRedTile from '../assets/red_tile.png';
import assetHeroTile from '../assets/hero_tile.png';
import assetBallShadow from '../assets/ball_shadow.png';
import assetFloor from '../assets/floor.png';
import assetWall from '../assets/block.png';
import assetPickup from '../assets/pickup.png';
import assetDoor from '../assets/door.png';
import assetHero from '../assets/hero_8_4_41_62.png';
import assetHeroJson from '../assets/hero_8_4_41_62.json';

export default class PreloadScene extends Phaser.Scene {
    preload() {
        let that = this;

        this.load.on("complete", () => {
            that.scene.start("level-1-scene")
        });

        this.load.image('greenTile', '../assets/green_tile.png');
        this.load.image('redTile', '../assets/red_tile.png');
        this.load.image('heroTile', '../assets/hero_tile.png');
        this.load.image('heroShadow', '../assets/ball_shadow.png');
        this.load.image('floor', '../assets/floor.png');
        this.load.image('wall', '../assets/block.png');
        this.load.image('pickup', '../assets/pickup.png');
        this.load.image('door', '../assets/door.png');
        this.load.atlas('hero', '../assets/hero_8_4_41_62.png', '../assets/hero_8_4_41_62.json');

        // this.load.image('greenTile', assetGreenTile);
        // this.load.image('redTile', assetRedTile);
        // this.load.image('heroTile', assetHeroTile);
        // this.load.image('heroShadow', assetBallShadow);
        // this.load.image('floor', assetFloor);
        // this.load.image('wall', assetWall);
        // this.load.image('pickup', assetPickup);
        // this.load.image('door', assetDoor);
        // this.load.atlas('hero', assetHero, assetHeroJson);
    }
}
