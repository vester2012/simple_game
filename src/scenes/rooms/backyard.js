import Phaser from "phaser";

export class BackyardScene extends Phaser.Scene {
    constructor() {
        super({key: 'backyard'});

        console.log('state backyard', this);
    }

    create () {

    }
}
