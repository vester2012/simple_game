import Phaser from 'phaser';
export class Button extends Phaser.GameObjects.Container {
    constructor(scene, x, y, atlas, frame, cb, cbContext) {
        super(scene);

        this.scene = scene;
        this.setPosition(x, y);
        this.add(this.image = scene.add.image(0, 0, atlas, frame));
        this.image.setOrigin(0.5);
        this.image.setInteractive();
        this.setAction(cb, cbContext);
        this.setAlpha(0.9);

        this.image.on('pointerover', () => { this.tween = this.scene.tweens.add({targets: this, scale: 1.1, alpha: 1, duration: 100}); });
        this.image.on('pointerout', () => { this.tween = this.scene.tweens.add({targets: this, scale: 1, alpha: 0.9, duration: 100}); });
    }

    setAction(cb, cbContext) {
        this.image.on('pointerdown', cb, cbContext);
    }

    onDownResize(cb) {
        this.scene.sound.play('snd_click');
        this.scene.tweens.add({ targets: this, scale: 0.9, duration: 150, yoyo: true, onComplete: cb });
    }

    addLabel(x, y, str, style) {
        this.add(this.text = this.scene.add.text(x, y, str, style));
        this.text.setOrigin(0.5);
    }
}
