import Phaser from "phaser";
import {scrmng} from "../scrmng";
import {Button} from "../controls";
import {Dialogs_Manager} from "../core/dialogs_manager";
import {unitmng} from "../game";

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
            unitmng.getHealth() ?  { name: 'Джон', text: 'Есть бинт: Ничего страшного, я тебе помогу'} : { name: 'Джон', text: 'Нету бинта: Придется потерпеть...'}
        ];

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

                me.roomContainer.add(me.btn_1 = new Button(me, 0, 100, 'button_menu', null, () => me.scene.start('toilet'), me));
                me.btn_1.addLabel(0, 0, 'Пойти в туалет', {fontSize: '18px'});

                me.roomContainer.add(me.btn_2 = new Button(me, 0, 200, 'button_menu', null, () => me.act_2(), me));
                me.btn_2.addLabel(0, 0, 'Пройти дальше по коридору', {fontSize: '18px'});
            }
        }, me);
    }

    act_2() {
        const dialogs_act_2 = [
            { image: '',               name: '...', text: 'Джон и Мередит проследовали в коридор и пошли дальше - они оказались в гостинной с прекрасным видом.', sound: null },
            { image: '',               name: '...', text: 'Осмотрев помещение они увидели два телефона - мобильный Мередит и винтажный стационарный.', sound: null },
            { image: '',               name: '...', text: 'Они ринулись к ним.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон поднял трубку и набрал номер полиции, но гудков не было - провода перерезаны.', sound: null },
            { image: 'person_john',    name: '...', text: 'Он обернулся на Мередит. Та подняла свой телефон - он вдребезги разбит.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Да, иронично. Кто бы мог подумать', sound: null },
            { image: '',               name: '...', text: 'Послышались шаги из коридора', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Да, его тут нет. Кончаем с девкой и уходим', sound: null },
            { image: '',               name: '...', text: 'Неизвестные зашли в гостевую спальню и увидели лишь пустой стул с развязанной веревкой.', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Сука! Найти её!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит испуганно посмотрела на Джона.', sound: null },
            { image: '',               name: '...', text: 'Шаги уже близко.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Говорит', sound: null },
        ];

        let me = this;

        me.btn_1.visible = false;
        me.btn_2.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_2.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            }
            else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');

                me.roomContainer.add(me.btn_3 = new Button(me, 0, 100, 'button_menu', null, () => me.act_2_runs(), me));
                me.btn_3.addLabel(0, 0, 'Беги', {fontSize: '18px'});

                me.roomContainer.add(me.btn_4 = new Button(me, 0, 200, 'button_menu', null, () => me.act_2_hide(), me));
                me.btn_4.addLabel(0, 0, 'Прячься', {fontSize: '18px'});
            }
        }, me);
    }

    act_2_runs() {
        let me = this;

        const dialogs_act_2_runs_base = [
            { image: 'person_john',    name: 'Джон', text: 'Беги', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон укрывается за одним из диванов, Мередит спешит на террасу.', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Я приведу помощь, обещаю', sound: null },
            { image: 'person_meredit', name: '...', text: 'Девушка подходит к огромной стеклянной двери и у нее не получается открыть ее.', sound: null },
            { image: 'person_meredit', name: '...', text: 'Следы крови остаются на стекле, девушка прячется на кухне', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Они уже тут!', sound: null },
            { image: '',               name: '...', text: 'Двое неизвестных входят в комнату', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Она точно не ушла далеко', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Нет... Не хватало упустить ее! А что если...\nЗа нами придут...\nЧто вообще горничная тут делала???', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Тише, спокойно. Я уверен, что...', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'В спальне чисто', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: '...', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Нам конец! Зачем я с вами пошел! Черт!', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Через главный вход точно не вышла, может... В ванной?', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Так проверь! Стоп... Что это...', sound: null },
            { image: 'person_enemy_1', name: '...', text: 'Неизвестный указывает на окно', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Она была здесь!', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'А может до сих пор здесь', sound: null },
            { image: '',               name: '...', text: 'Следы от крови ведут на кухню, видна нога Мередит\n', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Попалась!', sound: null },
            { image: '',               name: '...', text: 'Девушку хватают, двое неизвестных сильно сжимают ее руки', sound: null },
            { image: 'person_enemy_3', name: '...', text: 'Третий неизвестный хохочет, подходит к ней и поднимает ее лицо за подбородок', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ну мы и набегались из-за себя... Знаешь что бывает с плохими девочками?', sound: null },
            { image: '',               name: '...', text: 'Трое смеются', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит замечает в них что-то... Странное', sound: null },
            { image: 'person_meredit', name: '...', text: 'Смех... истерический?', sound: null },
            { image: 'person_meredit', name: '...', text: 'Чтобы проверить догадку она спрашивает зачем они сюда пришли.\nРаз уж ей точно не сбежать, то почему бы не узнать\nчто именно их привело в дом именитого писателя', sound: null },
            { image: 'person_meredit', name: '...', text: 'Ответа не последовало еще минуту, парни смеялись и смеялись', sound: null },
            { image: 'person_meredit', name: '...', text: 'Однако третий незнакомец посмотрел на нее, наконец\nМередит увидела главное - чертовски расширенные зрачки.\nБудто полнейшая темнота. У других тоже', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Малыш, все просто. Ты работаешь на говнюка. На полного...', sound: null },
            { image: 'person_enemy_3', name: '...', text: 'Он отходит и ногой пинает какую-то фигурку', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Ты поняла. Я ему хотел лично отомстить... Он вообще скоро?!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит закатывает глаза', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Я же уже говорила, что не знаю где он! Так почему ты здесь', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Меня уволили', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Иии?', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Он в этом виноват.\nМеня опозорил! Я же был журналистом...\nСука, я ведь просто его подколол на интервью, ему не понравилось...\nЯ не знаю кому он позвонил и что сделал, но в этот же вечер меня уволили!', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Уволили и ты решил расфигачить его дом? Из-за потерянной работы?', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Карьеры! Всей карьеры! Меня никуда не берут!', sound: null },
            { image: 'person_enemy_3', name: '...', text: 'Третий неизвестный начал крушить все вокруг', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит окатил пот, она понимала что ей уже ничего не сделать.\nОна посмотрела в сторону дивана, за которым был Джон и мысленно начала прощаться', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Я ведь изначально хотел просто поговорить...\nНо как оказался на пороге дома понял, что разрушенные жизни таких как я ничего не меняют.\nБогачи правят миром...\nЯ начал смотреть, наблюдать, узнавать...\nВедь если разрушена моя жизнь, то почему я не могу разрушить и его?\nИли вовсе забрать?!', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Дай угадаю.\nА ты, малышка, провинциальная дрянь, которая приехала в этот чертов город думая, что сможет подняться?\nСможет стать таким же толстосумом, как он? Нет, нет, нет.\nОдно слово такого как он и все, ты внизу', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Я бы может и отпустил тебя...\nНо ты такая же, как они все.\nДаже такая же, как я. Но ты...\nПропажу тебя не заметят.\nМерзкая серая масса', sound: null },
            { image: 'person_enemy_3', name: '...', text: 'Он обернулся и подошел к мередит', sound: null },
        ];

        me.btn_3.visible = false;
        me.btn_4.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_2_runs_base.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            }
            else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                me.act_3_runs();
            }
        }, me);
    }

    act_3_runs() {
        let me = this;

        const dialogs_act_2_runs_no_gun = [
            { image: 'person_john',    name: 'Джон', text: 'БЕГИ!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит вырывается и пытается выхватить оружие у ближайшего парня.', sound: null },
            { image: 'person_meredit', name: '...', text: 'Неудачно.', sound: null },
            { image: 'person_meredit', name: '...', text: 'Выстрел.', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит падает, она абсолютно неподвижна.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон застыл в шоке, он не может поверить своим глазам', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ее смерть на тебе. Мы потолкуем, при ятель', sound: null },
            { image: 'person_john',    name: '...', text: 'Последнее, что чувствует Джон, это удар по голове.', sound: null }
        ];

        const dialogs_act_2_runs_yes_gun = [
            { image: 'person_john',    name: '...', text: 'Джон понимает, что нужно действовать немедленно.', sound: null },
            { image: 'person_john',    name: '...', text: 'Он привстает из укрытия и стреляет в Третьего неизвестного,\nпока оставшиеся два неизвестных опешили и стоят как вскопаные\nМередит вырывается и бежит к выходу на терассу.\nДжон держит оставшихся на мушке', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Без глупостей, сюда пушки', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни их сбросили', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'И ко мне', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни их пинают, они скользят по полу к Джону', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Умницы', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Джон, она не поддается!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит пытается всеми силами открыть дверь', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Что?', sound: null },
            { image: '',               name: '...', text: 'Раздается выстрел', sound: null },
            { image: '',               name: '...', text: 'Парни хлопают глазами, Джон смотрит на Мередит.\nНа одежде начинают проявляться алые пятна, слышны щелчки пистолета.\nМагазин у подстреленного стрелка пустой', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'СЮДА ЕГО, ЖИВО!', sound: null },
            { image: '',               name: '...', text: 'Неизвестный отбрасывает пистолет', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'СУКА, СЕЛИ, ЖИВО!', sound: null },
            { image: '',               name: '...', text: 'Двое опешивших парней переглядываются и садится на пол рядом с лежащим товарищем.\nДжон забирает пушки и подбегает к Мередит.', sound: null },
        ];

        me.mng_dialogs.destroy();

        if (unitmng.getGun()) me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_2_runs_yes_gun.reverse()));
        else                  me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me,-400, 0, dialogs_act_2_runs_no_gun.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            }
            else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                if (unitmng.getGun()) {

                }
                else {
                    me.scene.start('bad_end_scene');
                }
            }
        }, me);


    }

    act_2_hide() {
        const dialogs_act_2_hide_base = [
            { image: 'person_john',    name: '...', text: 'Прячься', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон укрывается за одним из диванов, Мередит прячется за островком на кухне', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Они уже тут!', sound: null },
            { image: '',               name: '...', text: 'Двое неизвестных входят в комнату.', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Она точно не ушла далеко', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Нет... Не хватало упустить ее!', sound: null },
            { image: 'person_enemy_2', name: '...', text: 'А что если... За нами придут..', sound: null },
            { image: 'person_enemy_2', name: '...', text: 'Что вообще горничная тут делала???', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Тише, спокойно. Я уверен, что...', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'В спальне чисто', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: '...', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Нам конец! Зачем я с вами пошел! Черт!', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Через главный вход точно не вышла, может... В ванной?', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Так проверь!', sound: null },
            { image: '',               name: '...', text: 'Двое неизвестных остаются в комнате.', sound: null },
            { image: '',               name: '...', text: 'Один из них замечает чью-то макушку за диваном.', sound: null },
            { image: 'person_enemy_2', name: 'Другой неизвестный', text: 'Вставай, диванная голова', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон медленно встает.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Тише, без глупостей', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Офигеть сюрприз! Новогоднее чудо!', sound: null },
            { image: 'person_enemy_1', name: '...', text: 'Неизвестные будто забывают о девушке и одаривают всем своим вниманием Джона.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Сколько вы хотите?\nМы можем договориться.\nНикто ни о чем не узнает?', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Такие как ты вечно решают все деньгами...\nА как насчет жизней, что ты загубил?\nРазве они чего-то стоят?"', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон пытается держаться уверенно, но немного отступает назад.\nОн замечает, что в ребятах что-то не так... Их глаза.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Если я как-то тебе нагрубил...\nИзвини! Но парень, я действительно не знаю, что произошло', sound: null },
            { image: 'person_enemy_1', name: '...', text: 'У неизвестного сделалось очень злое лицо и он сорвался на истеричный смех', sound: null },
            { image: 'person_enemy_1', name: 'Неизвестный', text: 'Ахахахаха! Конечно же! Зачем запоминать лица! Серая, серая масса!', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Да что я тебе сделал?\nЕсли собрался со мной что-то делать,\nто хоть объясни что произошло!', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'Ты в этом виноват.\nМеня опозорил!\nЯ же был журналистом...\nСука, я ведь просто тебя подколол на интервью, тебе не понравилось...\nЯ не знаю кому ты позвонил и что сделал, но в этот же вечер меня уволили!', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Подожди-ка... Я ведь помню тебя, вроде. Все же решаемо!', sound: null },
            { image: 'person_enemy_3', name: 'Третий неизвестный', text: 'НЕТ! ТЫ ВО ВСЕМ ВИНОВАТ!', sound: null },
            { image: 'person_enemy_3', name: '...', text: 'Третий неизвестный начал крушить все вокруг.', sound: null },
        ];
        let me = this;

        me.btn_3.visible = false;
        me.btn_4.visible = false;

        me.mng_dialogs.destroy();
        me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me, -400, 0, dialogs_act_2_hide_base.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                me.act_3_hide()
            }
        }, me);
    }

    act_3_hide() {
        let me = this;

        const dialogs_act_2_hide_no_gun = [
            { image: 'person_meredit', name: 'Мередит', text: 'БЕГИ!', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон слегка опешил и пока парни были отвлечены на Мередит решает попытаться выхватить оружие у одного из неизвестных, что был ближе к нему', sound: null },
            { image: 'person_john',    name: '...', text: 'Выстрел.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон падает, он абсолютно неподвижен.', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'НЕЕЕЕЕЕЕЕТ!', sound: null },
            { image: 'person_enemy_1', name: '...', text: 'Заткнись', sound: null },
            { image: 'person_meredit', name: '...', text: 'Последнее, что чувствует Мередит, это удар по голове', sound: null },
        ];

        const dialogs_act_2_hide_yes_gun = [
            { image: 'person_meredit', name: '...', text: 'Мередит срывается с места и стреляет в неизвестного.', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Лежать!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Оставшиеся два неизвестных опешили и стоят как вкопанные\nМередит вырывается и направляется к террасе, держа их на мушке.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Без глупостей, сюда пушки', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни их бросили.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'И ко мне"', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни их пинают, они скользят по полу к Джону', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Умницы', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит пытается открыть дверь.', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Джон, она не поддается!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Девушка пытается всеми силами открыть дверь', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Что?', sound: null },
            { image: 'person_john',    name: '...', text: 'Раздается выстрел', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни хлопают глазами, Джон смотрит на Мередит.\nНа одежде девушки проступают алые пятна.\nСлышны щелчки пистолета, но магазин у подстреленного стрелка пустой.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'СЮДА ЕГО, ЖИВО!', sound: null },
            { image: 'person_john',    name: '...', text: 'Неизвестный со стоном отбрасывает пистолет.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'СУКА, СЕЛИ, ЖИВО!', sound: null },
            { image: 'person_john',    name: '...', text: 'Двое опешивших парней переглядываются и садятся на пол рядом с лежащим товарищем.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон забирает пушки и подбегает к Мередит.', sound: null },
        ];

        me.mng_dialogs.destroy();
        if (unitmng.getGun()) me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me, -400, 0, dialogs_act_2_hide_yes_gun.reverse()));
        else                  me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me, -400, 0, dialogs_act_2_hide_no_gun.reverse()));

        me.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true);
        me.input.keyboard.on('keydown-SPACE', () => {
            if (me.mng_dialogs.isNextDialog()) {
                me.mng_dialogs.nextDialog();
                me.mng_dialogs.hidePrevDialogs();
            } else {
                me.mng_dialogs.hideLastDialog();
                me.input.keyboard.off('keydown-SPACE');
                if (unitmng.getGun()) me.act_4_hide();
                else                  me.scene.start('bad_end_scene');
            }
        }, me);
    }

    act_4_hide() {
        let me = this;

        const dialogs_act_2_hide_yes_bandage = [
            { image: 'person_john',    name: '...', text: 'Джон достает бинт и начинает перевязывать рану, утягивая будто жгутом, чтобы остановить кровотечение.', sound: null },
            { image: 'person_john',    name: '...', text: 'Слышно шуршание сзади, Джон поднимает пистолет и делает предупредительный выстрел.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Только попробуйте!', sound: null },
            { image: 'person_john',    name: '...', text: 'Шуршание прекращается', sound: null },
            { image: 'person_john',    name: '...', text: 'Как ты?', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит смотрит на него.', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Все хорошо, все хорошо...', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Бежать сможешь?', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Что?', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон поднимается, помогает ей встать и открывает дверь на террасу.', sound: null },
            { image: 'person_john',    name: '...', text: 'Он смотрит на Мередит', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Все почти закончилось. Иди к соседям, попроси помощь', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит смотрит на него туманным взглядом', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'БЕГИ', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Мередит приходит в себя и убегает, Джон остается с парнями один на один Один из них что-то начинает шептать другим.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Я бы, сука, даже не думал на вашем месте', sound: null },
            { image: '',               name: '', text: 'Парни переглянулись и просто стали ждать правосудия.', sound: null },
            { image: '',               name: '', text: 'Соседи узнали Мередит, когда увидели ее на пороге.\nДевушка, трясясь, рассказала что происходит в доме.\nСоседи вызвали полицию.', sound: null },
            { image: '',               name: '', text: 'Не смотря на то, что новый год уже наступил и была праздничная ночь, полиция приехала быстро.\nРовно так же, как и скорая с журналистами.', sound: null },
            { image: '',               name: '', text: 'Джон передал неизвестных защитникам правопорядка и дал показания во дворе дома.\nТам же он заметил Мередит у скорой, делающей то же самое.\nРассказав главное он попросил дать ему передышку и направился к девушке.\nОна стояла вся взъерошенная, с потекшим макияжем', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Ну и ночка, да?', sound: null },
            { image: 'person_john',    name: '...', text: 'Мередит обрадовалась появлению Джона так,\nбудто сорвала джекпот.\nОна подошла и обняла своего спасителя', sound: null },
            { image: 'person_john',    name: '...', text: 'Он отстранился', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Прости, если бы не та выходка на интервью всего этого не было бы...\nЯ был пьян, дико пьян, и уволил этого парня полностью забыв о нем', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Курс реабилитации и походы в АА (анонимные алкоголики) и я, возможно, прощу тебя.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Справедливо. И раз на то пошло, то почему ты была здесь?', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'В Миннесоте снегопад, мне было не улететь.\nВстречать новый год одной не хотелось, да и тебя оставлять тоже...\nОй, кстати, подарок!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит ненадолго отошла и вернулась с коробкой,\nна которой была надпись "Лучшему боссу".\nВ коробке был новый телефон', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Я же знала что утопишь', sound: null },
            { image: 'person_meredit', name: '...', text: 'Они так и стояли вдвоем, пока парней не погрузили в полицейскую машину и не увезли.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'А знаешь... Я не дам этой истории пропасть', sound: null },
            { image: 'person_john',    name: '...', text: 'Спустя некоторое время', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Джон! Взгляни-ка!', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон подошел к своей девушке.\nНа экране ноутбука виднелось письмо с приглашением\nна премию для писателей с несколькими номинациями сразу.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Ох, теперь я не только богатый, но и признанный автор!\nКто бы мог подумать! Кстати, а кто хочет мороженого?', sound: null },
            { image: 'person_john',    name: 'Голос маленькой девочки', text: 'Я-я-я!', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Отлично, поехали!', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон успешно избавился от зависимости.\nНаписание нового романа полностью изменило его жизнь.\nПроисшествие очень сблизило их с Мередит и они начали встречаться.\nБывшая жена Джона, Лилиан, разрешила ему чаще видеться с дочерью и забирать ее к себе на выходные.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон так же оплатил лечение от наркотической зависимости для парней, и уговорил издательство дать журналисту еще один шанс после прохождения терапии.\nЗа причиненный ущерб они еще должны будут рассчитаться.', sound: null },
        ];

        const dialogs_act_2_hide_no_bandage = [
            { image: 'person_john',    name: 'Джон не может оказать Мередит помощь', text: 'Ее сильно ранили, она пока в ясном сознании, но практически обездвижена.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Держись, мы что-нибудь придумаем...Так, держать пушку сможешь?', sound: null },
            { image: 'person_meredit', name: 'Мередит', text: 'Да, я их задержу', sound: null },
            { image: 'person_meredit', name: '...', text: 'Джон дал Мередит пистолет и развернулся к напавшим', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Эй ты!', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон обратился к неизвестному', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'У меня для тебя кое-что есть и для твоих друзей тоже найдется\n Джон достал из полки в гостинной двое наручников', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Что ж, у ролевых игр есть свои... плюсы', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон обездвижил двоих, третий и так лежал на последнем издыхании.', sound: null },
            { image: 'person_john',    name: '...', text: 'Парни особо не сопротивлялись, препараты затуманили их головы.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон подбежал к Мередит.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Держи их на мушке. Я к соседям и обратно', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон взял пояс от халата и попытался наложить жгут,\nостановить кровотечение, но получалось плохо.', sound: null },
            { image: 'person_john',    name: 'Джон', text: 'Сейчас... Ладно! Я быстро!', sound: null },
            { image: 'person_meredit', name: '...', text: 'Мередит прошептала ему вслед.', sound: null },
            { image: 'person_meredit', name: '...', text: 'Все хорошо...', sound: null },
            { image: '',               name: '...', text: 'И вот они остались наедине.', sound: null },
            { image: 'person_john',    name: '...', text: 'Джон прибежал к соседям достаточно быстро и скорая с полицией не заставили себя ждать.', sound: null },
            { image: 'person_john',    name: '...', text: 'Но вернувшись в дом они обнаружили лишь двоих парней,\nодни сломанные пустые наручники и... уже остывающую Мередит.', sound: null },
            { image: '',               name: '...', text: 'Врачи не могли ей помочь, рана была смертельной.', sound: null },
            { image: '',               name: '...', text: 'Как оказалось, в спешке Джон дал ей тот пустой пистолет, который он забрал у стрелявшего в него парня.', sound: null },
            { image: '',               name: '...', text: 'Одни из наручников оказались хлипкими и парень, поддавшись панике, сбежал, нанося дополнительные повреждения девушке.', sound: null },
            { image: '',               name: '...', text: 'После всех событий Джон продал дом и анонимно отправил крупную сумму денег маме Мередит.', sound: null },
            { image: '',               name: '...', text: 'То, что произошло, повлияло на него не лучшим образом. Он начал окончательно спиваться, его бывшая жена запретила ему видеться с дочерью. Маленькая девочка боялась папы и противилась неприятному запаху от него.', sound: null },
            { image: '',               name: '...', text: 'Мама Мередит, приходя на могилу дочери, постоянно находит там свежие цветы.', sound: null },
            { image: '',               name: '...', text: 'Она не простила Джона, а Джон, вероятно, не сможет простить себя.', sound: null },
        ];

        me.mng_dialogs.destroy();
        if (unitmng.getHealth()) me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me, -400, 0, dialogs_act_2_hide_yes_bandage.reverse()));
        else                  me.roomContainer.add(me.mng_dialogs = new Dialogs_Manager(me, -400, 0, dialogs_act_2_hide_no_bandage.reverse()));

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
    }
}
