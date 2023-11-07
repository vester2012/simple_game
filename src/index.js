import Phaser from 'phaser';

import ScreenManager from "./scrmng"
import UnitManager from "./game";
import {LoadingScene} from "./scenes/loading";
import {DebugScene} from "./scenes/debug";
import {CommonRoomScene} from "./scenes/common_room_scene";
import {BathroomScene} from "./scenes/bathroom_scene"
import {ToiletRoomScene} from "./scenes/toilet_room_scene";
import {WardrobeScene} from "./scenes/wardrobe_scene";
import {ChildrenScene} from "./scenes/children_scene";
import {CabinetScene} from "./scenes/cabinet_scene";
import {TechnicalroomScene} from "./scenes/technicalroom_scene";
import {GuestBedroomScene} from "./scenes/guest_bedroom_scene";

let scrmng= new ScreenManager();
let unitmng= new UnitManager();

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser',
    width: 1000,
    height: 1000,
    scene: [
        LoadingScene,
        DebugScene,
        CommonRoomScene,
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
