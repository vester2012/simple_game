import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";
import {unitmng} from "../game";

const dialogs_part_1 = [
    { image: 'person_john',    name: '...', text: 'Зайдя в ванную Джон тихо прикрыл за собой дверь\nи подошел к зеркалу.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'До чего я докатился... но все еще хорош', sound: null },
    { image: 'person_john',    name: '...', text: 'Писатель быстро осматривает себя, проверяет дыхание', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Фу, сука, будто кошка сдохла!', sound: null },
    { image: 'person_john',    name: '...', text: 'Медленно поворачивает кран, слегка умывает себя водой.\nВроде становится легче…', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Зацени!!!', sound: 'snd_play_music' },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Упс', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'КОНЧЕНЫЕ, ЭТО БЫЛА СИСТЕМА ЗА 10 ШТУК,\nНАДЕЮСЬ У ВАС ЕСТЬ БАБКИ, Я ОТСУЖУ ВСЁ!!!', sound: null },
    { image: 'person_john',    name: '...', text: 'Джон зло осматривает комнату.', sound: null },
]

const dialogs_part_2 = [
    { image: 'person_john',    name: '...', text: 'Джон слышит голоса из соседней комнаты.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Они близко, надо уходить.', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ты везде посмотрел? Где он?', sound: null },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Да осталась всего пара комнат...', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'В смысле всего пара?!\nБилл сказал что ты все обыскал!', sound: null },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Тише-тише... Пупсик, он здесь, я точно знаю.\nМы найдем его и ты сделаешь все, что пожелаешь. \nЛучше угомони девку, потом решим что с ней сделаем.\nПара идей у меня точно есть', sound: null },
    { image: 'person_meredit', name: '...', text: 'Слышны всхлипы и женский голос.', sound: 'snd_girl_voice' },
    { image: 'person_meredit', name: 'Девушка', text: 'Да что вам нужно?! Отпу...', sound: 'snd_girl_voice' },
    { image: 'person_meredit', name: '...', text: 'Слышны звуки борьбы.\nВероятнее всего девушке завязали рот.', sound: 'snd_girl_voice' },
    { image: 'person_john',    name: 'Джон', text: 'Странно, голос очень знаком.\nНужно двинуться дальше. Может я смогу ей помочь...', sound: null },
    { image: 'person_john',    name: '...', text: 'Джон подходит к двери, проходит через кабинет,\nи быстро пробирается в коридор.', sound: null },
]

const dialogs_attempt = [
    { image: 'person_john', name: 'Джон', text: 'Ничего...', sound: null },
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
                console.log('идем в кабинет');

                unitmng.setHealth();

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
                        me.scene.start('corridor_scene');
                    }
                }, me);
            }

        } else if (me.userAttermpts === 1) {
            console.log('поптыка 2');

            if (ret) {
                unitmng.setHealth();
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
                        me.scene.start('corridor_scene');
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
