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

        return group
    }

    nextDialog() {
        this.prevDialog = this.currDialog;
        this.currDialog = this.dialogsArr.pop();
        if (this.currDialog) {
            this.scene.tweens.add({ targets: this.currDialog, alpha: 1, duration: 300 });
            if (this.currDialog.effect) {
                if (this.currDialog.effect === 'fadeIn') {
                    this.scene.cameras.main.fadeIn(500, 255, 255, 255);
                }
                if (this.currDialog.effect === 'fadeOut') {
                    this.scene.cameras.main.fadeOut(500, 0, 0, 0);
                }
            }

        }
    }

    hidePrevDialogs() {
        if (this.prevDialog) this.scene.tweens.add({ targets: this.prevDialog, alpha: 0, y: - 100, duration: 500 });
    }

    isNextDialog() {
        return this.dialogsArr.length > 0;
    }

    hideLastDialog() {
        if (this.currDialog) this.scene.tweens.add({ targets: this.currDialog, alpha: 0, y: - 50, duration: 300 });
    }
}
