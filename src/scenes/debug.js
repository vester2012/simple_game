import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";

export class DebugScene extends Phaser.Scene {
    constructor() {
        super({key: 'debug'});

        console.log('state debug', this);
    }

    create () {
        let me = this;

        me.debugContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());

        me.debugContainer.add(me.back = me.add.image(0, 0, 'menu_back').setScale(0.5));
        me.debugContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('menu'), me));

        me.buttons = [];

        me.debugContainer.add(me.corridor1Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('corridor_1'), me));
        me.corridor1Btn.addLabel(0, 0, 'corridor 1');
        me.buttons.push(me.corridor1Btn);

        me.debugContainer.add(me.corridor2Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('corridor_2'), me));
        me.corridor2Btn.addLabel(0, 0, 'corridor 2');
        me.buttons.push(me.corridor2Btn);

        me.debugContainer.add(me.corridor3Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('corridor_3'), me));
        me.corridor3Btn.addLabel(0, 0, 'corridor 3');
        me.buttons.push(me.corridor3Btn);

        me.debugContainer.add(me.bedroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('bedroom'), me));
        me.bedroomBtn.addLabel(0, 0, 'bedroom');
        me.buttons.push(me.bedroomBtn);

        me.debugContainer.add(me.bathroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('bathroom'), me));
        me.bathroomBtn.addLabel(0, 0, 'bathroom');
        me.buttons.push(me.bathroomBtn);

        me.debugContainer.add(me.livingroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('livingroom'), me));
        me.livingroomBtn.addLabel(0, 0, 'living room');
        me.buttons.push(me.livingroomBtn);

        me.debugContainer.add(me.toiletBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('toilet'), me));
        me.toiletBtn.addLabel(0, 0, 'toilet room');
        me.buttons.push(me.toiletBtn);

        me.debugContainer.add(me.wardrobeBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('wardrobe'), me));
        me.wardrobeBtn.addLabel(0, 0, 'wardrobe room');
        me.buttons.push(me.wardrobeBtn);

        me.debugContainer.add(me.clildrenBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('children'), me));
        me.clildrenBtn.addLabel(0, 0, 'children room');
        me.buttons.push(me.clildrenBtn);

        me.debugContainer.add(me.terraceBtn = new Button(me, 0, 0, 'button_menu', null, () => {}, me));
        me.terraceBtn.addLabel(0, 0, 'terrace');
        me.buttons.push(me.terraceBtn);

        me.buttons.forEach((button, id) => {
            if (id < 5) {
                button.x = -300;
                button.y = id * 80;
            } else {
                button.x = 100;
                button.y = (id - 5) * 80;
            }
        });
    }
}
