import Phaser from "phaser";
import {scrmng} from "../../scrmng";
import {Button} from "../../controls";

export class Corridor3Scene extends Phaser.Scene {
    constructor() {
        super({key: 'corridor_3'});

        console.log('state corridor 3', this);
    }

    create () {
        let me = this;

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'corridor_back_3').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => {
            me.exitBtn.onDownResize(() => this.scene.start('debug'));
        }, me));
    }
}
