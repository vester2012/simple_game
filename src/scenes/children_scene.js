import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs = [
    { image: 'person_john',    name: '...', text: 'Пробегая в детскую Джон слышит женские всхлипы и неразборчивые слова.', sound: 'girl_voice' },
    { image: 'person_john',    name: 'Джон', text: 'Что за черт?', sound: 'null' },
    { image: 'person_meredit', name: 'Девушка', text: 'ОТПУ-', sound: '...mumbling' },
    { image: '',               name: '...', text: 'Вероятнее всего ей завязали рот.', sound: null },
    { image: 'person_john',    name: '...', text: 'Джон с легкостью попадает в детскую, аккуратно прикрывая за собой дверь.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Кем бы она не была, ей возможно нужна будет помощь.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Может она ранена? А что важнее...\nМожет у нее есть телефон и мы сможем позвать на помощь?', sound: null },
    { image: 'person_john',    name: '...', text: 'Не слыша голосов неизвестных Джон немного расслабляется и переводит дух.\n Немного задерживается взглядом на фотографиях дочки.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Нет, милая, не сегодня. Папа еще сводит тебя в Диснейленд, вот увидишь. Я обещаю.', sound: null },
    { image: '',               name: '...', text: 'Дверь в соседнюю комнату открылась.', sound: 'snd_door_creaking' },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ооо, чуваки, спальня! Тут смотрели?', sound: null },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Неа... Черт, может он реально свалил? Праздник как ни как', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Неа, я уверен, пас его целую неделю.\nЭтот алкаш максимум до бассейна уходил, так что где-то ныкается. Ставлю 20-ку', sound: null },
    { image: '',               name: '...', text: 'Несколько неизвестных прошли в спальню, начали осматривать комнату.', sound: null },
    { image: 'person_enemy_2', name: '...', text: 'Один неизвестный обратил внимание на висящую картину,\nдругой заметил открытый текстовый редактор на компьютере и начал читать содержимое.', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Да, мне бы его скромность. В своей же спальне свой портрет. Наверное утром просыпается и любуется', sound: null },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Да, противно как-то. Взгляни сюда', sound: null },
    { image: 'person_enemy_1', name: '...', text: 'Неизвестный подходит к товарищу и начинает читать.\n', sound: null },
    { image: 'person_enemy_3', name: '...', text: 'Самое время двигаться дальше!', sound: null },
    { image: 'person_john',    name: '...', text: 'Пока кто бы они ни были отвлечены, Джон выходит в коридор.', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Какая хрень. Он еще и богач.\nУ людей точно что-то с головой, если они читают эту муть', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Критики тут вы, а богат я', sound: null },
    { image: 'person_john',    name: '...', text: 'Пробормотал писатель.', sound: null },
]

export class ChildrenScene extends Phaser.Scene {
    constructor() {
        super({key: 'children'});

        console.log('state children', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'children_back').setScale(0.5));
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
                me.scene.start('common_scene');
            }
        }, me);
    }
}
