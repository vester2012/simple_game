import Phaser from 'phaser';
import {LoadingScene} from "./scenes/loading";
import {MenuScene} from "./scenes/menu";
import {DebugScene} from "./scenes/debug";

import {CommonRoomScene} from "./scenes/rooms/common_room_scene";
import {CorridorScene} from "./scenes/rooms/corridor_scene";
import {Corridor3Scene} from "./scenes/rooms/corridor_3_room";

import {StartScene} from "./scenes/start_scene";
import {BathroomScene} from "./scenes/bathroom_scene"
import {LivingRoomScene} from "./scenes/rooms/living_room";
import {ToiletRoomScene} from "./scenes/toilet_room_scene";

import ScreenManager from "./scrmng"
import {WardrobeScene} from "./scenes/rooms/wardrobe_room";
import {ChildrenScene} from "./scenes/rooms/children_room";
import {CabinetScene} from "./scenes/cabinet_scene";
import {TechnicalroomScene} from "./scenes/technicalroom_scene";
import {GuestBedroomScene} from "./scenes/guest_bedroom_scene";

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
        CommonRoomScene,
        CorridorScene,
        Corridor3Scene,
        StartScene,
        BathroomScene,
        GuestBedroomScene,
        ToiletRoomScene,
        WardrobeScene,
        ChildrenScene,
        CabinetScene,
        TechnicalroomScene
    ]
};

const game = new Phaser.Game(config);
