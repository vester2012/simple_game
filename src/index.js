import Phaser from 'phaser';
import {Loading} from "./loading";
import {Menu} from "./menu";

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser',
    width: 1280,
    height: 720,
    scene: [Loading, Menu]
};

const game = new Phaser.Game(config);
