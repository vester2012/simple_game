import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs = [
    { name: '...', text: 'Джон заходит в гардероб', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Нужно осмотреть помещение', sound: null },
    { image: 'person_john', name: '...', text: 'Джон ничего не находит и выходит из комнаты', sound: null },
]

export class WardrobeScene extends Phaser.Scene {
    constructor() {
        super({key: 'wardrobe'});

        console.log('state wardrobe', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'wardrobe_back').setScale(0.5));
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

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                    me.scene.start('corridor_2');
                }, me));
                me.btn_1.addLabel(0, 0, 'В коридор', {fontSize: '18px'});

                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                    me.scene.start('bathroom');
                }, me));
                me.btn_2.addLabel(0, 0, 'В ванную', {fontSize: '18px'});

                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => {
                    me.scene.start('writersroom');
                }, me));
                me.btn_3.addLabel(0, 0, 'В Кабинет', {fontSize: '18px'});
            }

        }, me);
    }
}
