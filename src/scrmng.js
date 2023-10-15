import * as phaser from "phaser";

class ScreenManager {

    constructor() {
        scrmng = this;

        window.addEventListener('resize', function () {
            console.log("resize screen");
        } , false);
    }

    setInstance(scene) {
        console.log(scene)
    }

    getCenterX() {
        return 1000 / 2;
    }

    getCenterY() {
        return 1000 / 2;
    }

    getWidth() {
        return 1000;
    }

    getHeight() {
        return 1000;
    }

    isPortrait() {
        return Phaser.DOM.GetScreenOrientation() === 'portrait-primary' || Phaser.DOM.GetScreenOrientation() ==='portrait - secondary';
    }

}

var scrmng = null;
export default ScreenManager;
export { scrmng };
