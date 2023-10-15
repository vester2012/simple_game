import Phaser from "phaser";

export class LivingScene extends Phaser.Scene {
    constructor() {
        super({key: 'living'});

        console.log('state living', this);
    }

    create () {

    }
}
