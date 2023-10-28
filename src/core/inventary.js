export class Inventary extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

        this.scene = scene;

        this.setScale(0)
            .setAlpha(0)
            .setVisible(false)
            .setActive(false);
    }

    open() {
        this.setVisible(true).setActive(true);
        this.scene.tweens.add({ targets: this, alpha: 1, scale: 1, duration: 500 });
    }

    close() {
        this.scene.tweens.add({ targets: this, alpha: 0, scale: 0, duration: 500, onComplete: function () { this.setVisible(false).setActive(false); }});
    }

    addItem(obj) {

    }

    useItem(obj) {

    }

    removeItem(obj) {

    }
}
