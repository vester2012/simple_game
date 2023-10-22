import Phaser from 'phaser';
import {LoadingScene} from "./scenes/loading";
import {MenuScene} from "./scenes/menu";
import {DebugScene} from "./scenes/debug";

import {Corridor1Scene} from "./scenes/rooms/corridor_1_room";
import {Corridor2Scene} from "./scenes/rooms/corridor_2_room";
import {Corridor3Scene} from "./scenes/rooms/corridor_3_room";

import {BedroomScene} from "./scenes/rooms/bed_room";
import {BathRoomScene} from "./scenes/rooms/bath_room"
import {LivingRoomScene} from "./scenes/rooms/living_room";
import {ToiletRoomScene} from "./scenes/rooms/toilet_room";

import ScreenManager from "./scrmng"
import {WardrobeScene} from "./scenes/rooms/wardrobe_room";
import {ChildrenScene} from "./scenes/rooms/children_room";
import {WriterRoomScene} from "./scenes/rooms/writer_office_room";

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
        LivingRoomScene,
        ToiletRoomScene,
        WardrobeScene,
        ChildrenScene,
        WriterRoomScene
    ]
};

const game = new Phaser.Game(config);
