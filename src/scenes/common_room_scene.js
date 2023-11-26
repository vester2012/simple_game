import Phaser from "phaser";
import {Button} from "../controls";
import {scrmng} from "../scrmng";
import {Dialogs_Manager} from "../core/dialogs_manager";

const dialogs_act_1 = [
    { image: 'person_john',    name: '...', text: 'Успешно выбравшись в коридор Джон ощутил себя чуть свободнее.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Кто эти люди? Что им от него нужно? Сколько их тут вообще?', sound: null },
    { image: 'person_meredit', name: 'Девушка', text: 'Я сказала вам - я не знаю где он!', sound: null },
    { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Да-да, персонал не в курсе планов хозяина... Ты меня за дурака держишь?!', sound: null },
    { image: 'person_john',    name: '...', text: 'Джон прислушался.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Стоп... Мередит?! Что она здесь делает?!', sound: null },
    { image: 'person_meredit', name: 'Мередит', text: 'Повторюсь: я не знаю! Действительно не знаю!\nМожет свалил в бар, может поехал к кому на вечеринку... Новый год же!', sound: null },
    { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Может позвоним ему? Где твой телефончик?', sound: null },
    { image: 'person_enemy_3', name: '...', text: 'Неизвестный подошел к девушке и начал ее обыскивать', sound: null },
    { image: 'person_meredit', name: 'Мередит', text: 'Пожалуйста, не надо!', sound: null },
    { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Поуказывай мне', sound: null },
    { image: '',               name: '...', text: '...', sound: 'snd_beeps' },
    { image: '',               name: '...', text: '...', sound: 'snd_subscriber unavailable' },
    { image: 'person_enemy_3', name: '...', text: 'Мужчина вновь подходит к девушке и хочет заткнуть ей рот тряпкой,\nно Мередит кусает его.', sound: null },
    { image: 'person_enemy_3', name: '...', text: 'Мужчина отскакивает.', sound: null },
    { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Сука!', sound: null },
    { image: 'person_enemy_3', name: '...', text: 'Он отряхает руку и дает Мередит сильную пощечину,\nзатыкает ей рот и уходит, усмехаясь над ней.', sound: null },
    { image: 'person_enemy_3', name: 'Тртий неизвестный', text: 'Знаешь... А ведь свидетелей не оставляют.\nЯ хотел по хорошему, но ты не оставляешь мне выбора.\nДумаю, что парни оценят мою идею...', sound: null },
    { image: 'person_john',    name: '...', text: 'Голос начал приближаться и Джон спрятался за стену.', sound: null },
    { image: 'person_john',    name: '...', text: 'Голос отдалился.', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Они не заметили.', sound: null },
    { image: 'person_john',    name: '...', text: 'Нужно решить, куда отправиться дальше', sound: null },
];

const dialogs_act_1_technical = [
    { image: 'person_john', name: '...', text: 'Успешно выбравшись в коридор Джон ощутил себя чуть свободнее.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Может выйдет включить свет?', sound: null },
    { image: 'person_john', name: '...', text: 'Подойдя он видит, что ручка сорвана.', sound: null },
    { image: 'person_john', name: '...', text: 'Пытается ее открыть силой - не поддается.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Была не была', sound: null },
    { image: 'person_john', name: '...', text: 'Сильный удар создает много шума, слышны шаги сзади.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'О нет..', sound: null },
];

const dialogs_act_1_exit = [
    { image: 'person_john', name: '...', text: 'Главный вход заблокирован, дверь не поддается.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'Предсказуемо', sound: null },
    { image: 'person_john', name: '...', text: 'Один из незнакомцев вышел из спальни что-то насвистывая, шаги прекратились прямо позади писателя.', sound: null },
    { image: 'person_john', name: 'Джон', text: 'О нет..', sound: null },
];

const dialogs_act_1_next = [
    { image: 'person_john',    name: '...', text: 'Джон пошел дальше и услышал шаги в гостинной', sound: null },
    { image: 'person_john',    name: '...', text: 'Неизвестный осмотрел помещение, взглянул в окно', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ладно, у него вкус есть, вид что надо', sound: null },
    { image: '',               name: '...', text: 'Наступает тишина. Не слышно ничего. Джон отчетливо начинает слышать свое сердцебиение', sound: null },
    { image: 'person_john',    name: 'Джон', text: 'Думай, сука, думай', sound: null },
    { image: 'person_enemy_1', name: 'Неизвестный', text: 'Что делать с девкой... Надо поговорить с парнями', sound: null },
    { image: 'person_enemy_1', name: '...', text: 'Что делать с девкой... Надо поговорить с парнями', sound: null },
    { image: 'person_enemy_1', name: '...', text: 'Неизвестный неспеша направился к спальне.', sound: null },
    { image: 'person_john',    name: '...', text: 'Куда дальше, срочно!.', sound: null }
];

/// общий коридор
export class CommonRoomScene extends Phaser.Scene {
    constructor() {
        super({key: 'common_scene'});

        console.log('state common room', this);
    }

    create() {
        let me = this;

        me.cameras.main.fade(0, 0, 0, 0, true);
        me.cameras.main.fadeIn(1000);

        me.roomContainer = me.add.container(scrmng.getCenterX(), scrmng.getCenterY());
        me.roomContainer.add(me.back = me.add.image(0, 0, 'common_back').setScale(0.5));

        me.roomContainer.add(me.exitBtn = new Button(me, 450, -450, 'button_exit', null, () => me.scene.start('debug'), me));

        me.act1();
    }

    act1() {
        let me = this;

        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => {
                    me.act1_next();
                }, me));
                me.btn_1.addLabel(0, 0, 'Пройти дальше по корридору', {fontSize: '18px'});

                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => {
                    me.act1_technicalroom();
                }, me));
                me.btn_2.addLabel(0, 0, 'Пройти чуть дальше и зайти\nв техническое помещение', {fontSize: '18px'});

                me.roomContainer.add(me.btn_3 = new Button(me, 0, 300, 'button_menu', null, () => {
                    me.act1_exit();
                }, me));
                me.btn_3.addLabel(0, 0, 'Пройти к лавному входу', {fontSize: '18px'});
            }
        }, me);
    }

    act1_technicalroom() {
        let me = this;

        me.btn_1.visible = false;
        me.btn_2.visible = false;
        me.btn_3.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1_technical.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                me.scene.start('bad_end_scene');
            }
        }, me);
    }

    act1_exit() {
        let me = this;

        me.btn_1.visible = false;
        me.btn_2.visible = false;
        me.btn_3.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1_exit.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                me.scene.start('bad_end_scene');
            }
        }, me);
    }

    act1_next() {
        let me = this;

        me.btn_1.visible = false;
        me.btn_2.visible = false;
        me.btn_3.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_1_next.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                me.act2();
            }
        }, me);
    }

    act2() {
        let me = this;

        me.roomContainer.add(me.btn_4 = new Button(me, 0, 100, 'button_menu', null, () => {
            me.scene.start('toilet');
        }, me));
        me.btn_4.addLabel(0, 0, 'Зайти в туалет', {fontSize: '18px'});

        me.roomContainer.add(me.btn_5 = new Button(me, 0, 200, 'button_menu', null, () => {
            me.scene.launch('guest_bedroom');
        }, me));
        me.btn_5.addLabel(0, 0, 'Зайти в гостевую спальню', {fontSize: '18px'});

    }
}
