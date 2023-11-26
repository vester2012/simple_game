import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs_part_1 = [
    { name: '...', text: 'Утром тела Мередит и Джона нашла вторая горничная, пришедшая на работу.\nНад ними сильно поиздевались', sound: null },
    { name: '...', text: 'Дом сильно поврежден.', sound: null },
    { name: '...', text: 'Нападавшие арестованы.', sound: null },
    { name: '...', text: 'Они долго отрицали свою вину.\nВ их анализах нашли множественные следы запрещенных веществ.', sound: null },
    { name: '...', text: 'Тела Мередит и Джона были сильно изуродованы, над ними надругались.\nОдин лишь Бог знает что они пережили и были ли на момент издевательств еще в сознании.', sound: null },
    { name: '...', text: 'Двое ребят оказались соучастниками, один - зачинщиком.\nМесяц назад он брал у Джона интервью,\nгде Джон отпустил нелестные комментарии в сторону этого интервьюера,\nв последствии которого и вовсе уволили.\nПоиски работы не дали никакого толка, карьера была разрушена.\nОставалась только месть.', sound: null },
    { name: '...', text: 'Бывшая жена Джона распродала все имущество покойного\nи переехала с дочкой в другую страну.', sound: null },
    { name: '...', text: 'Мама Мередит узнала о смерти дочери лишь из новостей.\nПосле судебного разбирательства она навсегда ушла в себя.', sound: null },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
]

export class BadEndScene extends Phaser.Scene {
    constructor() {
        super({key: 'bad_end_scene'});
        console.log('state writersroom', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'bad_end_back').setScale(0.5));
        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_part_1.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
            }
        }, me);
    }
}
