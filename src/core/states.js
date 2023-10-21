import Phaser from "phaser";

export class BaseScene extends Phaser.Scene {
    constructor(name_state) {
        super({key: name_state});
        console.log(name_state, this);
    }

    create () {}
}
