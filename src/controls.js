import Phaser from 'phaser';
export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, atlas, frame, originX, originY, cb, cbContext) {
        super(scene);

        this.scene = scene;
        this.setPosition(x, y);
        this.add(this.image = scene.add.image(0, 0, atlas, frame));
        this.image.setOrigin(originX, originY);
        this.image.setInteractive();
        this.setAction(cb, cbContext);

        this.image.on('pointerover', () => { this.tween = this.scene.tweens.add({targets: this, scale: 1.1, duration: 100}); });
        this.image.on('pointerout', () => { this.tween = this.scene.tweens.add({targets: this, scale: 1, duration: 100}); });
    }

    setAction(cb, cbContext) {
        this.image.on('pointerdown', cb, cbContext);
    }

    addLabel(x, y, str, style) {
        this.add(this.text = this.scene.add.text(x, y, str, style));
        this.text.setOrigin(0.5);
    }
}
