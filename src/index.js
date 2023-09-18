import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene
{
    constructor () {
        super();
    }

    preload () {
        this.load.image('logo', logoImg);
    }

    create ()
    {
        const logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser',
    width: 1280,
    height: 800,
    scene: MyGame
};

const game = new Phaser.Game(config);
