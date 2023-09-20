import Phaser from "phaser";
import {Button} from "./controls";

export class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'menu'});

        console.log('state menu', this)
    }

    create () {
        this.menuContainer = this.add.container();
        this.menuContainer.add(this.add.image(1280 / 2, 720 / 2, 'back'));

        this.menuContainer.add(this.startBtn = new Button(this, 610, 150, 'button', null, 0.5, 0.5, () => {
            console.log('click')
        }, this));

        this.startBtn.addLabel(0, 0, 'Start Game'); //achievements


        this.menuContainer.add(this.settingsBtn = new Button(this, 610, 250, 'button', null, 0.5, 0.5, () => {
            console.log('click')
        }, this));

        this.settingsBtn.addLabel(0, 0, 'Settings');


        this.menuContainer.add(this.AchievementsBtn = new Button(this, 610, 350, 'button', null, 0.5, 0.5, () => {
            console.log('click')
        }, this));

        this.AchievementsBtn.addLabel(0, 0, 'Achievements');


        this.menuContainer.add(this.aboutBtn = new Button(this, 610, 450, 'button', null, 0.5, 0.5, () => {
            console.log('click')
        }, this));

        this.aboutBtn.addLabel(0, 0, 'About');
    }
}
