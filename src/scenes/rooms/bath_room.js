import Phaser from "phaser";
import {scrmng} from "../../scrmng";
import {Button} from "../../controls";

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
    { name: '...', text: 'Джон слышит голоса из соседней комнаты', sound: null },
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

const nextScenes = [
    { name: 'Кабинет', nameScene: 'writersroom'},
    { name: 'Коридор', nameScene: 'corridor_1'},
]

export class BathRoomScene extends Phaser.Scene {
    constructor() {
        super({key: 'bathroom'});
        console.log('state bathroom', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'bathroom_back').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => this.scene.start('debug'), me));


    }
}
