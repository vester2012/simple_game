import Phaser from "phaser";
import {Button} from "../../controls";
import {scrmng} from "../../scrmng";

export class Corridor1Scene extends Phaser.Scene {
    constructor() {
        super({key: 'corridor_1'});

        console.log('state corridor 1', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'corridor_back_1').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));
    }
}
