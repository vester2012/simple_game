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
        me.debugContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('menu_scene'), me));

        me.buttons = [];

        me.debugContainer.add(me.corridor1Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('common_scene'), me));
        me.corridor1Btn.addLabel(0, 0, 'common room');
        me.buttons.push(me.corridor1Btn);

        me.debugContainer.add(me.corridor2Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('corridor_scene'), me));
        me.corridor2Btn.addLabel(0, 0, 'corridor');
        me.buttons.push(me.corridor2Btn);

        me.debugContainer.add(me.corridor3Btn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('technicalroom'), me));
        me.corridor3Btn.addLabel(0, 0, 'technical room');
        me.buttons.push(me.corridor3Btn);

        me.debugContainer.add(me.bedroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('start_scene'), me));
        me.bedroomBtn.addLabel(0, 0, 'bedroom');
        me.buttons.push(me.bedroomBtn);

        me.debugContainer.add(me.bathroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('bathroom'), me));
        me.bathroomBtn.addLabel(0, 0, 'bathroom');
        me.buttons.push(me.bathroomBtn);

        me.debugContainer.add(me.livingroomBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('guest_bedroom'), me));
        me.livingroomBtn.addLabel(0, 0, 'guest bedroom');
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

        me.debugContainer.add(me.writerBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('writersroom'), me));
        me.writerBtn.addLabel(0, 0, 'writers room');
        me.buttons.push(me.writerBtn);

        me.debugContainer.add(me.writerBtn = new Button(me, 0, 0, 'button_menu', null, () => me.scene.start('bad_end_scene'), me));
        me.writerBtn.addLabel(0, 0, 'bad end scene');
        me.buttons.push(me.writerBtn);

        me.buttons.forEach((button, id) => {
            button.image.scaleX = 0.6;
            if (id < 5) {
                button.x = -300;
                button.y = id * 80;
            } else {
                button.x = 0;
                button.y = (id - 5) * 80;

                if (id > 9) {
                    button.x = 300;
                    button.y = (id - 10) * 80;
                }
            }
        });
    }
}
