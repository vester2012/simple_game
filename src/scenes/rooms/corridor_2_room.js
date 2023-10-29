import Phaser from "phaser";
import {scrmng} from "../../scrmng";
import {Button} from "../../controls";
import {Dialogs_Manager} from "../../core/dialogs_manager";

/// коридор

const dialogs = [
    { name: '...', text: 'Джон уверенно подходит к выходу из спальни и аккуратно приоткрывает дверь.\nВидны тени, гуляющие по дому.', sound: null },
]

export class Corridor2Scene extends Phaser.Scene {
    constructor() {
        super({key: 'corridor_2'});

        console.log('state corridor 2', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'corridor_back_2').setScale(0.5));
        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                // Обратно в спалню

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                    me.scene.start('bedroom');
                }, me));
                me.btn_1.addLabel(0, 0, 'Обратно в спальню', {fontSize: '18px'});

                // В гардероб
                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                    me.scene.start('wardrobe');
                }, me));
                me.btn_2.addLabel(0, 0, 'В гардероб', {fontSize: '18px'});

                // Пройти дальше по коридору
                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => {

                }, me));
                me.btn_3.addLabel(0, 0, 'Пройти дальше по коридору', {fontSize: '18px'});

            }
        }, me);
    }
}
