export class Dialogs_Manager extends Phaser.GameObjects.Container {
    constructor(scene, x, y, dialogs) {
        super(scene, x, y);

        this.scene = scene;
        this.dialogs = dialogs;
        this.dialogsArr = [];
        this.prevDialog = null;
        this.createDialogs();
        this.nextDialog();
    }

    createDialogs() {
        this.dialogs.forEach((dialog) => {
            let tmp = this.createDialog(dialog);
            this.add(tmp);
            this.dialogsArr.push(tmp);
        })
    }

    createDialog(dialog) {
        let group = this.scene.add.container();

        group.setAlpha(0);

        group.add(group.name = this.scene.add.text(0, 0, dialog.name, {fontSize: '30px', fontStyle: 'bold', color: '#c50d0d'}));
        group.add(group.text = this.scene.add.text(0, group.name.height, dialog.text, {fontSize: '20px', color: '#ffffff'}));
        group.effect = dialog.effect;
        group.image = dialog.image;

        return group
    }

    nextDialog() {
        let me = this;

        me.prevDialog = me.currDialog;
        me.currDialog = me.dialogsArr.pop();
        if (me.currDialog) {
            me.scene.tweens.add({ targets: me.currDialog, alpha: 1, duration: 300 });

            if (!me.image) me.add(me.image = me.scene.add.image(700, 300, me.currDialog.image));
            else           me.image.setTexture(me.currDialog.image);

            me.scene.tweens.add({ targets: me.image, alpha: 1, duration: 300 });

            if (me.currDialog.effect) me.cameraEffect()
        }
    }

    cameraEffect() {
        let me = this, camera = this.scene.cameras.main;
        if (me.currDialog.effect === 'fadeIn')  camera.fadeIn(500, 255, 255, 255);
        if (me.currDialog.effect === 'fadeOut') camera.fadeOut(500, 0, 0, 0);
    }

    hidePrevDialogs() {
        if (this.prevDialog) {
            this.scene.tweens.add({ targets: this.prevDialog, alpha: 0, y: - 100, duration: 500 });
        }
    }

    isNextDialog() {
        return this.dialogsArr.length > 0;
    }

    hideLastDialog() {
        if (this.currDialog) {
            this.scene.tweens.add({ targets: this.currDialog, alpha: 0, y: - 50, duration: 300 });
            this.scene.tweens.add({ targets: this.image, alpha: 0, duration: 300 });
        }
    }
}
