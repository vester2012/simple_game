import Phaser from "phaser";
import {Button} from "../controls";
import {scrmng} from "../scrmng";
import {Inventary} from "../core/inventary";
import {unitmng} from "../game";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super();

        console.log('state menu', this);

        scrmng.setInstance(this);
        unitmng.setInstance(this);

        this.bindedOrientationChange = this.onOrientationChange.bind(this);
        window.addEventListener("orientationchange", this.bindedOrientationChange);
    }

    onOrientationChange() {
        let isPortrait = scrmng.isPortrait();

        console.log(this.cameras.main);
        console.log(window);
        console.log(isPortrait);
    }

    create() {
        let me = this;

        me.sound.play('snd_menu_loop');

        me.menuContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.menuContainer.add(me.back = me.add.image(0, 0, 'menu_back').setScale(0.5));

        //me.menuContainer.add(me.inventary = new Inventary(me, 0, 0));

        me.buttons = [];

        me.menuContainer.add(me.startBtn = new Button(me, 100, 0, 'button_menu', null, () => me.gameTransition(), me));
        me.startBtn.addLabel(0, 0, 'Start Game');
        me.buttons.push(me.startBtn);

        me.menuContainer.add(me.settingsBtn = new Button(me, 100, 70 + 20, 'button_menu', null, () => me.scene.start('debug'), me));
        me.settingsBtn.addLabel(0, 0, 'Settings');
        me.buttons.push(me.settingsBtn);

        me.menuContainer.add(me.achievementsBtn = new Button(me, 100, 140 + 40, 'button_menu', null, () => {}, me));
        me.achievementsBtn.addLabel(0, 0, 'Achievements');
        me.buttons.push(me.achievementsBtn);

        me.menuContainer.add(me.aboutBtn = new Button(me, 100, 210 + 60, 'button_menu', null, () => {}, me));
        me.aboutBtn.addLabel(0, 0, 'About');
        me.buttons.push(me.aboutBtn);

        /*me.menuContainer.add(me.inventaryBtn = new Button(me, 100, -200, 'button_menu', null, () => {
            me.inventary.open();
        }, me));
        me.inventaryBtn.addLabel(0, 0, 'Inventary');*/
    }

    gameTransition() {
        let me = this, camera = me.cameras.main;

        // hideButtons
        me.buttons.forEach((button) => {
            me.tweens.add({targets: button, scale: 0, alpha: 0, duration: 100, onComplete: () => button.setVisible(false) });
        });

        camera.pan(scrmng.getCenterX() - 80, scrmng.getCenterY() + 80, 1000);
        camera.zoomTo(10, 1000);
        camera.fadeOut(1000, 0, 0, 0);

        me.time.delayedCall(1100, () => me.scene.start('start_scene'));
    }
}
