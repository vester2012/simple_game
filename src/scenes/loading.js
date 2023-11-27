import Phaser from "phaser";
import button_menu from "../assets/but_menu.png";
import button_exit from "../assets/but_exit.png";
import menu_back from "../assets/menu_back.jpg";

import back_common from "../assets/rooms/corridor/common_back.jpg";
import back_corridor_2 from "../assets/rooms/corridor/corridor_back_2.jpg";

import back_guest_bedroom from "../assets/rooms/guest_bedroom_back.jpg"
import back_bedroom from "../assets/rooms/bedroom_back.jpg";
import back_bathroom from "../assets/rooms/bathroom_back.jpg";
import back_toilet from "../assets/rooms/toilet_back.jpg";
import back_wardrobe from "../assets/rooms/wardrobe_back.jpg";
import back_children from "../assets/rooms/childrens_back.jpg";
import back_writer from "../assets/rooms/writer_office_back.jpg";
import back_technical from "../assets/rooms/technicalroom_back.jpg";
import back_bad_end from "../assets/rooms/bad_ending_back.jpg";

import person_meredit from "../assets/persons/meredit.png";
import person_john from "../assets/persons/john.png";
import person_enemy_1 from "../assets/persons/enemy_1.png";
import person_enemy_2 from "../assets/persons/enemy_2.png";
import person_enemy_3 from "../assets/persons/enemy_3.png";


import {MenuScene} from "./menu";
import {StartScene} from "./start_scene";
import {CorridorScene} from "./corridor_scene";

let Game;

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: 'loading'});

        Game = this;

        console.log('state loading', this);
    }

    preload() {
        this.load.image('menu_back',          menu_back);
        this.load.image('button_menu',        button_menu);
        this.load.image('button_exit',        button_exit);
        this.load.image('common_back',        back_common);
        this.load.image('corridor_back_2',    back_corridor_2);
        this.load.image('guest_bedroom_back', back_guest_bedroom);
        this.load.image('bedroom_back',       back_bedroom);
        this.load.image('bathroom_back',      back_bathroom);
        this.load.image('toilet_back',        back_toilet);
        this.load.image('wardrobe_back',      back_wardrobe);
        this.load.image('children_back',      back_children);
        this.load.image('writer_back',        back_writer);
        this.load.image('technical_back',     back_technical);
        this.load.image('bad_end_back',       back_bad_end);

        this.load.image('person_meredit',     person_meredit);
        this.load.image('person_john',        person_john);
        this.load.image('person_enemy_1',     person_enemy_1);
        this.load.image('person_enemy_2',     person_enemy_2);
        this.load.image('person_enemy_3',     person_enemy_3);

        this.load.audio('snd_click', '../../src/assets/sounds/click.ogg');
        this.load.audio('snd_menu_loop', '../../src/assets/sounds/menu_loop.mp3');
    }

    create() {
        this.sound.add('snd_click');
        this.sound.add('snd_menu_loop');

        this.scene.add('menu_scene',     MenuScene,     true);
        this.scene.add('start_scene',    StartScene,    false);
        this.scene.add('corridor_scene', CorridorScene, false);
    }
}

export { Game }
