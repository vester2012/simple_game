import * as phaser from "phaser";

class UnitManager {

    constructor() {
        unitmng = this;

        this.isGun = false;
        this.isHealth = false;
    }

    setInstance(scene) {
        this.scene = scene;
        console.log(scene)
    }

    setGun() {
        this.isGun = true;
    }

    setHealth() {
        this.isHealth = true;
    }

    getGun() {
        return this.isGun;
    }

    getHealth() {
        return this.isHealth;
    }
}

var unitmng = null;
export default UnitManager;
export { unitmng };
