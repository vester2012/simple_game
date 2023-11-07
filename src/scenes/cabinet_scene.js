import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs_part_1 = [
    { name: '...', text: 'Войдя в кабинет Джон слышит голоса из соседней комнаты.', sound: null },
    { name: 'Неизвестный', text: 'Ты везде посмотрел? Где он?', sound: null },
    { name: 'Другой неизвестный', text: 'Да осталась всего пара комнат...', sound: null },
    { name: 'Неизвестный', text: 'В смысле всего пара?! Билл сказал что ты все обыскал!', sound: null },
    { name: 'Другой неизвестный', text: 'Тише-тише... Пупсик, он здесь, я точно знаю.', sound: null },
    { name: 'Другой неизвестный', text: 'Мы найдем его и ты сделаешь все, что пожелаешь.', sound: null },
    { name: 'Другой неизвестный', text: 'Лучше угомони девку, потом решим что с ней сделаем.', sound: null },
    { name: 'Другой неизвестный', text: 'Пара идей у меня точно есть', sound: null },
    { name: 'Девушка', text: '...', sound: 'snd_girl_voice' },
    { name: 'Девушка', text: 'Да что вам нужно?! Отпу...', sound: 'snd_girl_fight' },
    { name: '...', text: 'Вероятнее всего девушке завязали рот.', sound: null },
    { name: 'Джон', text: 'Странно, голос очень знаком. Надо срочно найти пистолет!', sound: null },
    { name: 'Джон', text: 'Джон проверяет ящик стола - пусто.', sound: null },
    { name: 'Джон', text: 'Сука, чертов пьяница! Где он?!', sound: null },
    { name: 'Джон', text: 'Неуклюже Джон отходит от стола и осматривает комнату.', sound: null },
    { name: '...', text: 'Вероятнее всего, пистолет в...', sound: null },
]

const dialogs_success = [
    { name: 'Джон', text: 'Нашел!"\n' +
            'Обрадовался Джон и чуть не обронил пушку.', sound: null },
    { name: 'Джон', text: 'Дебил. Если меня не прикончат сегодня, то я чертов счастливчик', sound: null },
]

const dialogs_part_2 = [
    { name: '...', text: 'Джон слышит приближающиеся голоса', sound: null },
    { name: 'Джон', text: 'Нужно сваливать', sound: null },
    { name: 'Джон', text: 'Джон подходит к выходу из кабинета, приоткрывает дверь и видит как кто-то приближается к входу в спальню.', sound: null },
    { name: 'Джон', text: 'Он не решается выйти', sound: null },
    { name: '...', text: 'Незнакомец расслабленно заходит в комнату, осматривает ее.', sound: 'snd_whistling_large' },
    { name: '...', text: 'Расхаживая как по своим хоромам незнакомец трогает разные вещи, поверхности. ', sound: null },
    { name: '...', text: 'На полке у кровати видит фотографию из медового месяца жены Джона', sound: 'snd_whistling_light' },
    { name: 'Джон', text: 'Я ему эти руки засуну...', sound: 'snd_nausea' },
    { name: 'Джон', text: '...ладно, попозже\nНезнакомец не услышал нас, он осматривал маленькую скульптуру, которой отломал ручку.', sound: null },
    { name: 'Незнакомец', text: 'Упс', sound: null },
    { name: 'Джон', text: 'Выживу - отсужу все вплоть до трусов', sound: null },
    { name: '...', text: 'Незнакомец подошел к кровати, потом подошел к столу. На компьютере открыта программа с данными новой книги.', sound: null },
    { name: 'Незнакомец', text: 'О, а это интересно\nНезнакомец сел в кресло, начал вчитываться в текст', sound: null },
    { name: 'Незнакомец', text: 'Мда, какая хрень', sound: null },
    { name: '...', text: 'Немного посидев незнакомец вновь перечитал что-то на экране, тяжело вздохнул и начал что-то печатать.', sound: null },
    { name: 'Джон', text: '"Какого хрена?! ЧТО ВООБЩЕ ПРОИСХОДИТ? Ко мне в дом вломились чтобы... что?"\n' + 'Джон понимает, что незнакомец отвлечен.', sound: null },
]

//Выскочить на незнакомца и постараться вырубить
const dialogs_part_3 = [
    { name: 'Незнакомец', text: 'О, а тут так...', sound: null },
    { name: '...', text: 'Джон выходит из кабинета, подкрадывается сзади и...', sound: null },
    { name: '...', text: '...случайно напарывается на пустую бутылку.', sound: null },
    { name: '...', text: 'Незнакомец оборачивается', sound: null },
    { name: 'Незнакомец', text: 'Что?', sound: null },
    { name: 'Джон', text: 'Убери руки от компа и убирайтесь с приятелем отсюда!', sound: null },
    { name: '...', text: 'Из-за спины раздается смешок, Джон оборачивается.', sound: null },
    { name: 'Другой незнакомец', text: 'С приятелем? Убираться? Нет-нет-нет. Джон, ты пойми...\nИногда нужно держать себя в руках. Ну, знаешь, не наговорить лишнего...', sound: null },
    { name: '...', text: 'Собеседник уверенно подходит к Джону, у незнакомца виден пистолет, Джон пятится\n' +
            '"... и тебе стоило поступить так же!"\n', sound: null },
    { name: '...', text: 'Последнее что слышит Джон перед тем, как его бьют по затылку', sound: null },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
    { name: '', text: '', sound: null, effect: 'fadeIn' },
    { name: '...', text: 'Джон с трудом открывает глаза. Он в своей гостинной на полу,\n любимый ковер залит его кровью. Тени двигаются, внимание трудно фокусировать.', sound: null },
    { name: '', text: '', sound: null, effect: 'blur' },
    { name: 'Джон', text: 'Ааа...', sound: null },
    { name: '...', text: 'С трудом поморгав Джон вновь открывает глаза и замечает привязанную к стулу девушку. ', sound: null },
    { name: '...', text: 'Она со стулом лежит на боку.', sound: null },
    { name: '...', text: 'Кровь, море ее крови.', sound: null },
    { name: '...', text: 'Слышен дикий смех, кто-то из нападавших снял биту со стены и расхреначил все, что было рядом.', sound: null },
    { name: 'Неизвестный', text: 'О, проснулся, солнышко?', sound: null },
    { name: 'Неизвестный', text: 'Замечая Джона говорит неизвестный, подходит ближе, улыбается и замахивается битой.', sound: null },
    { name: '...', text: 'Удар.', sound: 'snd_hit' },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
]

//Остаться в кабинете и ждать
const dialogs_part_4 = [
    { name: 'Незнакомец', text: 'О, а тут так...', sound: null },
    { name: '...', text: 'Незнакомец читает текст на экране и что-то печатает', sound: null },
    { name: '...', text: 'Джон в это время пытается прийти в себя.', sound: null },
    { name: '...', text: 'Его подташнивает то ли от адреналина, то ли от похмелья.', sound: null },
    { name: 'Незнакомец', text: 'Вот так бы я и закончил эту сцену. Да, будет круто', sound: null },
    { name: '...', text: 'Он гордо встает из-за стола и направляется к выходу, но решает проверить кабинет', sound: null },
    { name: 'Незнакомец', text: 'Таааак...', sound: null },
    { name: '...', text: 'Дверь открывается.', sound: null },
    { name: 'Джон', text: 'Упс... Ты же не мне мерещишься...?', sound: null },
    { name: 'Незнакомец', text: 'Парни, у меня тут новогоднее чудо!', sound: null },
    { name: 'Джон', text: 'Да, определенно нет. Может решим все иначе?', sound: null },
    { name: 'Незнакомец', text: 'Даааа, обязательно. Но у нас есть идея получше', sound: null },
    { name: '...', text: 'Джон пытается уговорить незнакомца отпустить его.', sound: null },
    { name: '...', text: 'Видя у собеседника пистолет напрягается.', sound: null },
    { name: 'Джон', text: 'Может обойдемся без этого?', sound: null },
    { name: 'Другой незнакомец', text: 'Как скажешь', sound: null },
    { name: '...', text: 'Удар', sound: 'snd_hit' },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
    { name: '', text: '', sound: null, effect: 'fadeIn' },
    { name: '...', text: 'Джон с трудом открывает глаза. Он в своей гостинной на полу,\n любимый ковер залит его кровью. Тени двигаются, внимание трудно фокусировать.', sound: null },
    { name: '...', text: 'Тени двигаются, внимание трудно фокусировать.', sound: null },
    { name: '', text: '', sound: null, effect: 'blur' },
    { name: 'Джон', text: 'Ааа...', sound: null },
    { name: '...', text: 'С трудом поморгав Джон вновь открывает глаза и замечает привязанную к стулу девушку. ', sound: null },
    { name: '...', text: 'Кровь, море ее крови.', sound: null },
    { name: '...', text: 'Слышен дикий смех, кто-то из нападавших снял биту со стены и расхреначил все, что было рядом.', sound: null },
    { name: 'Неизвестный', text: 'О, проснулся, солнышко?', sound: null },
    { name: 'Неизвестный', text: 'Замечая Джона говорит неизвестный, подходит ближе, улыбается и замахивается битой.', sound: null },
    { name: '...', text: 'Удар.', sound: 'snd_hit' },
    { name: '', text: '', sound: null, effect: 'fadeOut' },
]


export class CabinetScene extends Phaser.Scene {
    constructor() {
        super({key: 'writersroom'});
        console.log('state writersroom', this);
    }

    create () {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'writer_back').setScale(0.5));
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

                // Нижний ящик
                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => me.checkAttempt(me.btn_1, true), me));
                me.btn_1.addLabel(0, 0, 'Нижний ящик', {fontSize: '18px'});

                // В сейфе
                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => me.checkAttempt(me.btn_2, false), me));
                me.btn_2.addLabel(0, 0, 'В сейфе', {fontSize: '18px'});

                // В тайнике в книжном шкафу
                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => me.checkAttempt(me.btn_3, false), me));
                me.btn_3.addLabel(0, 0, 'В тайнике в книжном шкафу', {fontSize: '18px'});
            }

        }, me);
    }

    checkAttempt(button, ret) {
        let me = this;

        me.hideButtons();

        if (ret) {
            console.log('предмет найдет');

            me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_success.reverse()));

            me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
            me.input.keyboard.on('keydown-SPACE', () => {
                if (me.mng_dialogs.isNextDialog()) {
                    me.mng_dialogs.nextDialog();
                    me.mng_dialogs.hidePrevDialogs();
                } else {
                    me.mng_dialogs.hideLastDialog();
                    me.input.keyboard.off('keydown-SPACE');
                    console.log('идем в детскую');
                    me.scene.start('children');
                }
            }, me);

        } else {
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

                    // Проскочить в коридор
                    me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                        me.scene.start('corridor_1');
                    }, me));
                    me.btn_1.addLabel(0, 0, 'Проскочить в коридор', {fontSize: '18px'});

                    // Выскочить на незнакомца и постараться вырубить
                    me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                        me.hideButtons();

                        me.mng_dialogs.destroy();
                        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_part_3.reverse()));

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

                    }, me));
                    me.btn_2.addLabel(0, 0, 'Выскочить на незнакомца\nи постараться вырубить', {fontSize: '18px'});

                    // Остаться в кабинете и ждать
                    me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => {
                        me.hideButtons();

                        me.mng_dialogs.destroy();
                        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_part_4.reverse()));

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

                    }, me));
                    me.btn_3.addLabel(0, 0, 'Остаться в кабинете и ждать', {fontSize: '18px'});
                }

            }, me);
        }
    }

    hideButtons() {
        this.btn_1.setVisible(false);
        this.btn_2.setVisible(false);
        this.btn_3.setVisible(false);
    }
}
