import Phaser from "phaser";
import back from "./assets/menu_back.jpeg";
import button from "./assets/green_button.png";

export class Loading extends Phaser.Scene {
    constructor() {
        super({key: 'loading'});
        console.log('state loading', this)
    }

    preload () {
        this.load.image('back', back);
        this.load.image('button', button);
    }

    create () {
        this.scene.start('menu');
    }
}
