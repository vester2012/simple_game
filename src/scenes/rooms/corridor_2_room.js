import Phaser from "phaser";
import {scrmng} from "../../scrmng";
import {Button} from "../../controls";
import {Dialogs_Manager} from "../../core/dialogs_manager";

/// коридор

const dialogs = [
    { name: '...', text: 'Джон уверенно подходит к выходу из спальни и аккуратно приоткрывает дверь.\nВидны тени, гуляющие по дому.', sound: null },
]

const dialogs_next_corridor = [
    { name: '...', text: 'Джон аккуратно вышел из спальни и попали в коридор.', sound: null },
    { name: '...', text: 'Голоса неизвестных стали ближе.', sound: null },
    { name: '...', text: 'Нужно срочно что-то делать!', sound: null },
]

const dialogs_hide_corridor = [
    { name: '...', text: 'Джон неуклюже забежал за статую и отставший от группы неизвестный его заметил:', sound: null },
    { name: 'Неизвестный', text: 'Погодите-ка... Ребят, тут что-то есть', sound: null },
    { name: '...', text: 'На его зов неспеша приходят остальные.', sound: null },
    { name: 'Другой неизвестный', text: 'Если это очередной трофей "за лучший экранизированный роман", то я посажу тебя на него', sound: null },
    { name: 'Неизвестный', text: 'Нет, тебе точно понравится! Ку-ку, малыш, испугался?', sound: null },
    { name: '...', text: 'Писатель медленно выходит из-за статуи, его слепит свет фонарика.', sound: null },
    { name: 'Джон', text: 'Наверное... А вы кто?', sound: null },
    { name: 'Неизвестные', text: 'Сейчас, говнюк, узнаешь!"', sound: null },
    { name: '...', text: 'Джон оглушен. Его тело нашли утром.', sound: null },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
];

export class Corridor2Scene extends Phaser.Scene {
    constructor() {
        super({key: 'corridor_2'});

        console.log('state corridor 2', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'corridor_back_2').setScale(0.5));
        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                // Обратно в спалню

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                    me.scene.start('bedroom');
                }, me));
                me.btn_1.addLabel(0, 0, 'Обратно в спальню', {fontSize: '18px'});

                // В гардероб
                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                    me.scene.start('wardrobe');
                }, me));
                me.btn_2.addLabel(0, 0, 'В гардероб', {fontSize: '18px'});

                // Пройти дальше по коридору
                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => {

                    me.btn_1.visible = false;
                    me.btn_2.visible = false;
                    me.btn_3.visible = false;

                    me.mng_dialogs.destroy();
                    me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_next_corridor.reverse()));

                    me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
                    me.input.keyboard.on('keydown-SPACE', () => {
                        if (me.mng_dialogs.isNextDialog()) {
                            me.mng_dialogs.nextDialog();
                            me.mng_dialogs.hidePrevDialogs();
                        } else {

                            me.roomContainer.add(me.btn_4 = new Button(me, 0, 100, 'button_menu', null, () => {
                                me.scene.start('children');
                            }, me));
                            me.btn_4.addLabel(0, 0, 'Зайти в детскую', {fontSize: '18px'});

                            me.roomContainer.add(me.btn_5 = new Button(me, 0, 200, 'button_menu', null, () => {

                                me.btn_4.visible = false;
                                me.btn_5.visible = false;

                                me.mng_dialogs.destroy();
                                me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_hide_corridor.reverse()));

                                me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
                                me.input.keyboard.on('keydown-SPACE', () => {
                                    if (me.mng_dialogs.isNextDialog()) {
                                        me.mng_dialogs.nextDialog();
                                        me.mng_dialogs.hidePrevDialogs();
                                    }
                                });
                            }, me));
                            me.btn_5.addLabel(0, 0, 'Постараться пройти дальше\nи спрятаться за углом/скульптурой', {fontSize: '18px'});
                        }
                    });

                }, me));
                me.btn_3.addLabel(0, 0, 'Пройти дальше по коридору', {fontSize: '18px'});

            }
        }, me);
    }
}
