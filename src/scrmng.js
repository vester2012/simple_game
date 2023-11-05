import * as phaser from "phaser";

class ScreenManager {

    constructor() {
        scrmng = this;

        window.addEventListener('resize', function () {
            console.log("resize screen");
        } , false);
    }

    setInstance(scene) {
        this.scene = scene;
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

    cameraFadeOut() {

    }

    cameraFadeIn() {
        this.scene.cameras.main.fade(0, 0, 0, 0, true);
        this.scene.cameras.main.fadeIn(1000);
    }

}

var scrmng = null;
export default ScreenManager;
export { scrmng };
