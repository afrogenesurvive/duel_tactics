import Phaser from 'phaser'
import MainScene from './main'

export default class Level1Scene extends MainScene {
    constructor() {
        super('level-1-scene')

        this.levelData =
            [[1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1]];
        this.heroMapTile = new Phaser.Geom.Point(3,3);
    }
}
