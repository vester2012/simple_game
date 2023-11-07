import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs_act_1 = [
    { name: '...', text: 'Джон вошел в гостевую спальню аккуратно закрыв дверь', sound: null },
    { name: '...', text: 'Звук шагов незнакомца пронесся мимо комнаты.', sound: null },
    { name: 'Джон', text: 'Фух, пронесло', sound: null },
    { name: '...', text: 'Джон повернутся и увидел Мередит.', sound: null },
    { name: '...', text: 'Девушка сидела привязанная к стулу с заткнутым ртом, красным и заплаканным лицом.', sound: null },
    { name: '...', text: 'Джон подошел к ней и аккуратно снял повязку.', sound: null },
    { name: 'Джон', text: 'Я тоже в шоке', sound: null },
    { name: 'Мередит', text: 'Что это за ребята? Вы вновь проиграли в покер? Проспорили? Унизили кого?!', sound: null },
    { name: 'Джон', text: 'Нет, я их не знаю. Сам не понимаю что к чему', sound: null },
    { name: 'Мередит', text: 'Пробовали вызвать на помощь? Мой телефон он забрал, когда пытался набрать вам', sound: null },
    { name: 'Джон', text: 'Да, практически... На дне бассейна', sound: null },
    { name: 'Мередит', text: 'СНОВА?!', sound: null },
    { name: 'Джон', text: 'Тише-тише. Да, снова. Надо выбираться отсюда, они где-то в конце коридора. \nМожно попробовать пройти через гостиную на улицу... Ты знаешь сколько их вообще?', sound: null },
    { name: 'Мередит', text: 'Трое. Вооружены. Видно вы им чем-то сильно насолили, есть предположения?', sound: null },
    { name: 'Джон', text: 'Нет, не помню. Стоп, а ты вообще что тут делаешь, почему не улетела домой на праздники?', sound: null },
    { name: 'Мередит', text: 'Обо всем потом, рейс отложили.', sound: null },
    { name: 'Мередит', text: 'Я слышала они что-то говорили про месть. Возможно одна из ваших выходок привела их сюда', sound: null },
    { name: '...', text: 'Джон распутал Мередит, они вдвоем приблизились к двери и услышали грохот.', sound: 'snd_crash_glass' },
    { name: 'Неизвестный', text: 'Красивая ваза... Была. Аххаха', sound: null },
    { name: 'Джон', text: 'Ну, мстить они точно уже начали. Выберемся - выставлю им счет. Ты не ранена?', sound: null },
    { name: 'Джон', text: 'Мередит закатывает одежду, виднеется рана от удара.', sound: null },
    { name: 'Мередит', text: 'Рука...', sound: null },
];

const dialogs_act_2 = [
    { name: '...', text: 'Джон и Мередит проследовали в коридор и пошли дальше - они оказались в гостинной с прекрасным видом.', sound: null },
    { name: '...', text: 'Осмотрев помещение они увидели два телефона - мобильный Мередит и винтажный стационарный.', sound: null },
    { name: '...', text: 'Они ринулись к ним.', sound: null },
    { name: '...', text: 'Джон поднял трубку и набрал номер полиции, но гудков не было - провода перерезаны.', sound: null },
    { name: '...', text: 'Он обернулся на Мередит. Та подняла свой телефон - он вдребезги разбит.', sound: null },
    { name: 'Джон', text: 'Да, иронично. Кто бы мог подумать', sound: null },
    { name: '...', text: 'Послышались шаги из коридора', sound: null },
    { name: 'Неизвестный', text: 'Да, его тут нет. Кончаем с девкой и уходим', sound: null },
    { name: '...', text: 'Неизвестные зашли в гостевую спальню и увидели лишь пустой стул с развязанной веревкой.', sound: null },
    { name: 'Неизвестный', text: 'Сука! Найти её!', sound: null },
    { name: '...', text: 'Мередит испуганно посмотрела на Джона.', sound: null },
    { name: '...', text: 'Шаги уже близко.', sound: null },
    { name: 'Джон', text: 'Говорит', sound: null },
];



export class GuestBedroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'guest_bedroom'});

        console.log('state guest bedroom', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'guest_bedroom_back').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.act_1();
    }

    act_1() {
        let me = this;

        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            }
            else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                    me.scene.start('toilet', {test: 1})
                }, me));
                me.btn_1.addLabel(0, 0, 'Пойти в туалет', {fontSize: '18px'});

                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                    me.act_2()
                }, me));
                me.btn_2.addLabel(0, 0, 'Пройти дальше по коридору', {fontSize: '18px'});
            }
        }, me);
    }

    act_2() {
        let me = this;

        me.btn_1.visible = false;
        me.btn_2.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            }
            else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                me.roomContainer.add(me.btn_3 = new Button(me, 0, 100, 'button_menu', null, () => {

                }, me));
                me.btn_3.addLabel(0, 0, 'Беги', {fontSize: '18px'});

                me.roomContainer.add(me.btn_4 = new Button(me, 0, 200, 'button_menu', null, () => {

                }, me));
                me.btn_4.addLabel(0, 0, 'Прячься', {fontSize: '18px'});
            }
        }, me);
    }
}
