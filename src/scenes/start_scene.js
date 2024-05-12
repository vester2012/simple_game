import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs = [
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'АХАХАХАХХАХА', sound: 'testsnd' },
    { image: 'person_john',    name: 'Джон', text: 'Ах, можно потише, голова раскалывается', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'О, ты это видел? Просто чума', sound: 'snd_crash_glass' },
    { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Ой', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Да забей, этот хмырь себе новый купит. О, а это зацени!', sound: 'snd_slap' },
    { image: 'person_enemy_3', name: 'Неизвестные', text: 'Ахахахаа!', sound: 'snd_laughter' },
    { image: 'person_enemy_2', name: '...', text: 'Писатель нехотя открыл глаза. \n' + 'Голова трещит от похмелья,\nно этот шум явно не глюки от выпитого пойла.\n' + 'Жарко, очень жарко. \n' + 'Рука потянулась к пульту от кондиционера.\n', sound: null },
    { image: 'person_john', name: 'Джон', text: '"Что за...? Почему нет света?\n' + 'С трудом встав с кровати Джон проверяет карманы.\n' + 'Халат слегка влажный, телефона нигде нет. \n' + 'Пьянчужка вспоминает о том, как упал в бассейн.\n', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Мда, я не удивлен... Дорого мне обходятся мои заплывы', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестные', text: 'Джооон, где же ты?', sound: null },
    { image: 'person_enemy_2', name: 'Неизвестные', text: 'Да, приятель, где ты? Ой, а что это?', sound: 'snd_hit' },
    { image: 'person_enemy_3', name: 'Неизвестные', text: 'Одной хреновиной меньше, ахахах!\n' + 'Ой, а там мы еще не были!\nМожет найдем какую из незаслуженных наград маестро!', sound: 'snd_hit_door' },
    { image: 'person_john', name: '...', text: 'Джон слегка приходит в себя.\n' + 'Звук не особо дальний, скорее всего они в соседней комнате.\n' + 'Взглянув в дверную щель он видит,\nчто дверь в детскую распахнута.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Сукины дети, вы у меня поплатитесь"\n' + 'Теряя равновесие сказал писатель, но смог устоять.\n' + 'Ладно, кое что для вас у меня точно найдется.\nГде я припрятал чертов пистолет??! Надо бы его найти…', sound: null },
]

const nextScenes = [
    { name: 'Ванная', nameScene: 'bathroom'},
    { name: 'Кабинет', nameScene: 'writersroom'},
    { name: 'Коридор', nameScene: 'corridor_scene'},
    { name: 'Гардероб', nameScene: 'wardrobe'}
]

export class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'start_scene'});

        console.log('state start scene', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'bedroom_back').setScale(0.5));
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
                nextScenes.forEach((state, id) => {
                    let tmp;
                    me.roomContainer.add(tmp = new Button(me, 0, 100 * id, 'button_menu', null, () => {
                        me.cameras.main.fadeOut(1000);
                        me.time.delayedCall(1000, () => me.scene.start(state.nameScene));

                    }, me));
                    tmp.addLabel(0, 0, state.name);
                    tmp.setScale(0).setAlpha(0);
                    me.tweens.add({ targets: tmp, alpha: 1, scale: 1, duration: 300, delay: id * 50 });
                })
            }
        }, me);
    }
}
