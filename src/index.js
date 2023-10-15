import Phaser from 'phaser';
import {LoadingScene} from "./scenes/loading";
import {MenuScene} from "./scenes/menu";
import {DebugScene} from "./scenes/debug";

import {Corridor1Scene} from "./scenes/rooms/corridor_1";
import {Corridor2Scene} from "./scenes/rooms/corridor_2";
import {Corridor3Scene} from "./scenes/rooms/corridor_3";

import {BedroomScene} from "./scenes/rooms/bedroom";
import {BathRoomScene} from "./scenes/rooms/bathroom"
import {LivingRoomScene} from "./scenes/rooms/livingRoom";


import ScreenManager from "./scrmng"

let scrmng= new ScreenManager();

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser',
    width: 1000,
    height: 1000,
    scene: [
        LoadingScene,
        MenuScene,
        DebugScene,
        Corridor1Scene,
        Corridor2Scene,
        Corridor3Scene,
        BedroomScene,
        BathRoomScene,
        LivingRoomScene
    ]
};

const game = new Phaser.Game(config);
