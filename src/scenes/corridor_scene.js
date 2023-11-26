import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

/// коридор

const dialogs = [
    { image: 'person_john', name: '...', text: 'Джон уверенно подходит к выходу из спальни и аккуратно приоткрывает дверь.\nВидны тени, гуляющие по дому.', sound: null },
]

const dialogs_next_corridor = [
    { image: 'person_john', name: '...', text: 'Джон аккуратно вышел из спальни и попали в коридор.', sound: null },
    { image: 'person_john', name: '...', text: 'Голоса неизвестных стали ближе.', sound: null },
    { image: 'person_john', name: '...', text: 'Нужно срочно что-то делать!', sound: null },
]

const dialogs_hide_corridor = [
    { image: 'person_john',    name: '...', text: 'Джон неуклюже забежал за статую и отставший от группы неизвестный его заметил:', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Погодите-ка... Ребят, тут что-то есть', sound: null },
    { image: 'person_enemy_1', name: '...', text: 'На его зов неспеша приходят остальные.', sound: null },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Если это очередной трофей "за лучший экранизированный роман", то я посажу тебя на него', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Нет, тебе точно понравится! Ку-ку, малыш, испугался?', sound: null },
    { image: 'person_john',    name: '...', text: 'Писатель медленно выходит из-за статуи, его слепит свет фонарика.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Наверное... А вы кто?', sound: null },
    { image: 'person_enemy_3', name: 'Неизвестные', text: 'Сейчас, говнюк, узнаешь!"', sound: null },
];

export class CorridorScene extends Phaser.Scene {
    constructor() {
        super();

        console.log('state corridor', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'corridor_back_2').setScale(0.5));
        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.act1();
    }

    act1() {
        let me = this;
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
                    me.scene.start('start_scene');
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

                    me.act2();

                }, me));
                me.btn_3.addLabel(0, 0, 'Пройти дальше по коридору', {fontSize: '18px'});
            }
        }, me);
    }

    act2() {
        let me = this;

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

                    me.act3();

                }, me));
                me.btn_5.addLabel(0, 0, 'Постараться пройти дальше\nи спрятаться за углом/скульптурой', {fontSize: '18px'});
            }
        });
    }

    act3() {
        let me = this;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_hide_corridor.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.scene.start('bad_end_scene');
            }
        });
    }
}

