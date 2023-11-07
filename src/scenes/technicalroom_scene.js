import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";

export class TechnicalroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'technicalroom'});

        console.log('state technicalroom', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'technical_back').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));
    }
}
