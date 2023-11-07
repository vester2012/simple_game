import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs_part_1 = [
    { name: '...', text: 'Зайдя в ванную Джон тихо прикрыл за собой дверь и подошел к зеркалу.', sound: null },
    { name: 'Джон', text: 'До чего я докатился... но все еще хорош', sound: null },
    { name: '...', text: 'Писатель быстро осматривает себя, проверяет дыхание', sound: null },
    { name: 'Джон', text: 'Фу, сука, будто кошка сдохла!', sound: null },
    { name: '...', text: 'Медленно поворачивает кран, слегка умывает себя водой. Вроде становится легче…', sound: null },
    { name: 'Неизвестный', text: 'Зацени!!!', sound: 'snd_play_music' },
    { name: 'Неизвестный', text: 'Упс', sound: null },
    { name: 'Джон', text: 'КОНЧЕНЫЕ, ЭТО БЫЛА СИСТЕМА ЗА 10 ШТУК, НАДЕЮСЬ У ВАС ЕСТЬ БАБКИ, Я ОТСУЖУ ВСЁ!!!', sound: null },
    { name: '...', text: 'Джон зло осматривает комнату.', sound: null },
]

const dialogs_part_2 = [
    { name: '...', text: 'Джон слышит голоса из соседней комнаты.', sound: null },
    { name: 'Джон', text: 'Они близко, надо уходить.', sound: null },
    { name: 'Неизвестный', text: 'Ты везде посмотрел? Где он?', sound: null },
    { name: 'Другой неизвестный', text: 'Да осталась всего пара комнат...', sound: null },
    { name: 'Неизвестный', text: 'В смысле всего пара?! Билл сказал что ты все обыскал!', sound: null },
    { name: 'Другой неизвестный', text: 'Тише-тише... Пупсик, он здесь, я точно знаю. Мы найдем его и ты сделаешь все, что пожелаешь. \nЛучше угомони девку, потом решим что с ней сделаем. Пара идей у меня точно есть', sound: null },
    { name: '...', text: 'Слышны всхлипы и женский голос.', sound: 'snd_girl_voice' },
    { name: 'Девушка', text: 'Да что вам нужно?! Отпу...', sound: 'snd_girl_voice' },
    { name: '...', text: 'Слышны звуки борьбы. Вероятнее всего девушке завязали рот.', sound: 'snd_girl_voice' },
    { name: 'Джон', text: 'Странно, голос очень знаком. Нужно двинуться дальше. Может я смогу ей помочь...', sound: null },
    { name: '...', text: 'Джон подходит к двери, проходит через кабинет, и быстро пробирается в коридор.', sound: null },
]

const dialogs_attempt = [
    { name: 'Джон', text: 'Ничего...', sound: null },
]

export class BathroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'bathroom'});

        this.userAttermpts = 0;

        console.log('state bathroom', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'bathroom_back').setScale(0.5));

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

                // Заглянуть за шкафчик с раковиной
                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => me.checkAttempt(me.btn_1, false), me));
                me.btn_1.addLabel(0, 0, 'Заглянуть за шкафчик с раковиной', {fontSize: '18px'});

                // Заглянуть за зеркало
                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => me.checkAttempt(me.btn_2, true), me));
                me.btn_2.addLabel(0, 0, 'Заглянуть за зекало', {fontSize: '18px'});

                // Проверить ящик у ванны
                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => me.checkAttempt(me.btn_3, false), me));
                me.btn_3.addLabel(0, 0, 'Проверить ящик у ванны', {fontSize: '18px'});
            }

        }, me);
    }

    checkAttempt(button, ret) {
        let me = this;

        button.setVisible(false);

        if (me.userAttermpts === 0) {
            console.log('поптыка 1');

            if (ret) {
                console.log('предмет найдет');
                console.log('идем в кабинет')
                me.scene.start('writersroom');
            } else {
                console.log('предмет не найден');

                me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_attempt.reverse()));

                me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
                me.input.keyboard.on('keydown-SPACE', () => {
                    if (me.mng_dialogs.isNextDialog()) {
                        me.mng_dialogs.nextDialog();
                        me.mng_dialogs.hidePrevDialogs();
                    } else {
                        me.mng_dialogs.hideLastDialog();
                        me.input.keyboard.off('keydown-SPACE');
                        console.log('идем в коридор');
                        me.scene.start('corridor_1');
                    }
                }, me);
            }

        } else if (me.userAttermpts === 1) {
            console.log('поптыка 2');

            if (ret) {
                console.log('предмет найдет');
            } else {
                console.log('предмет не найден');

                me.mng_dialogs.destroy();
                me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_part_2.reverse()));

                me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
                me.input.keyboard.on('keydown-SPACE', () => {
                    if (me.mng_dialogs.isNextDialog()) {
                        me.mng_dialogs.nextDialog();
                        me.mng_dialogs.hidePrevDialogs();
                    } else {
                        me.mng_dialogs.hideLastDialog();
                        me.input.keyboard.off('keydown-SPACE');
                        console.log('идем в коридор');
                        me.scene.start('corridor_1');
                    }
                }, me);
            }

            me.btn_1.setVisible(false);
            me.btn_2.setVisible(false);
            me.btn_3.setVisible(false);
        }

        me.userAttermpts++;
    }
}
