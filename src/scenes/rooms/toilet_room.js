import Phaser from "phaser";
import {scrmng} from "../../scrmng";
import {Button} from "../../controls";

export class ToiletRoomScene extends Phaser.Scene {
    constructor() {
        super({key: 'toilet'});

        console.log('state toilet', this);
    }

    create () {
        let me = this;

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'toilet_back').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => {
            me.exitBtn.onDownResize(() => this.scene.start('debug'));
        }, me));
    }
}