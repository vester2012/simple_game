import Phaser from "phaser";
import button_menu from "../assets/but_menu.png";
import button_exit from "../assets/but_exit.png";
import menu_back from "../assets/menu_back.jpg";

import back_corridor_1 from "../assets/rooms/corridor/corridor_back_1.jpg";
import back_corridor_2 from "../assets/rooms/corridor/corridor_back_2.jpg";
import back_corridor_3 from "../assets/rooms/corridor/corridor_back_3.jpg";

import back_bedroom from "../assets/rooms/bedroom_back.jpg";
import back_bathroom from "../assets/rooms/bathroom_back.jpg";
import back_livingroom from "../assets/rooms/livingroom_back.jpg"

let Game;

export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({key: 'loading'});

        Game = this;

        console.log('state loading', this);
    }

    preload () {
        this.load.image('menu_back', menu_back);
        this.load.image('button_menu', button_menu);
        this.load.image('button_exit', button_exit);

        this.load.image('corridor_back_1', back_corridor_1);
        this.load.image('corridor_back_2', back_corridor_2);
        this.load.image('corridor_back_3', back_corridor_3);

        this.load.image('bedroom_back', back_bedroom);
        this.load.image('bathroom_back', back_bathroom);
        this.load.image('livingroon_back', back_livingroom);

        this.load.audio('snd_click', '../../src/assets/sounds/click.ogg');
        this.load.audio('snd_menu_loop', '../../src/assets/sounds/menu_loop.mp3');
    }

    create () {
        this.scene.start('menu');
        this.sound.add('snd_click');
        this.sound.add('snd_menu_loop');
    }
}

export { Game }
