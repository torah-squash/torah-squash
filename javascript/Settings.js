/**
 * Created by user on 23/05/14.
 */

var s1, s2; // sound icons
var on, off, onText = null, offText = null,
    on2, off2, onText2 = null, offText2 = null;
var musicOn = true, soundOn = true;

var smallLetters = { font: "bold 24pt Cooper Std", fill: "#000", align: "center" };

var START_Y = 200, START_X = 490;
var START_BUTTON_Y = START_Y + 5;
var START_TEXT_Y = START_Y + 20;
var START_BUTTON_TEXT_Y = START_Y + 27;

var music;

var settings = {
    /**
     *
     */
    preload: function() {
//        alert('here!!!');
        game.load.spritesheet('background', '../images/settings/back.png');
        game.load.image('background', '../images/settings/back.png');
        game.load.spritesheet('sound', '../images/settings/music2.png', 80, 80, 18);
        game.load.audio('will.i.am', ['../music/b.mp3']);
    },

    preloadState: function() {
        game.load.spritesheet('background', '../images/settings/back.png');
        game.load.image('background', '../images/settings/back.png');
        game.load.spritesheet('sound', '../images/settings/music.png', 80, 80, 18);
        game.load.audio('will.i.am', ['../music/a.mp3']);
    },

    /**
     *
     */
    create: function() {
        game.add.sprite(0, 0, 'background');
        var lineX = START_X;
        var style = { font: "bold 36pt Cooper Std", fill: "#000", align: "center" };

        var title = game.add.text(452, 70, 'הגדרות', style);
        title.x = (game.world.width - title.width) / 2 - 5;

        var style = { font: "bold 30pt Cooper Std", fill: "#000", align: "right" };

        var text1 = game.add.text( 630 + 51, START_TEXT_Y, 'מוזיקה', style); // MUSIC
        s1 = game.add.sprite(lineX, START_Y, 'sound', 9);
        on = game.add.button(258 + 80, START_BUTTON_Y, 'sound', setButton, game, 8 + 9, 6 + 9, 8 + 9);
        off = game.add.button(258, START_BUTTON_Y, 'sound', setButton, game, 7 + 9, 5 + 9, 7 + 9);

        var text2 = game.add.text(630, START_TEXT_Y + 88, 'צלילי רקע', style); // SOUND
        s2 = game.add.sprite(lineX, START_Y + 88, 'sound', 0);
        on2 = game.add.button(258 + 80, START_BUTTON_Y + 88, 'sound', setButton2, game, 8 + 9, 6 + 9, 8 + 9);
        off2 = game.add.button(258, START_BUTTON_Y + 88, 'sound', setButton2, game, 7 + 9, 5 + 9, 7 + 9);

        var temp = game.add.text(0, 0, 'ON', smallLetters);
        START_BUTTON_TEXT_Y = START_BUTTON_Y + (on.height - temp.height) / 2;
        temp.destroy();

        music = game.add.audio('will.i.am', 5, true);
        //music.play('', 0, 5, true);
        musicOn = true;

        if (musicOn) {
            setButton(on);
        } else {
            setButton(off);
        }
        if (soundOn) {
            setButton2(on2);
        } else {
            setButton2(off2);
        }
    },

    /**
     *
     */
    update: function() {

    }
};

function setButton2(object) {
    var lineX = START_X, lineY = START_Y  + 88;
    if (object == on2) {
        on2.setFrames(4 + 9, 4 + 9, 4 + 9);
        off2.setFrames(7 + 9, 5 + 9, 7 + 9);
        s2.kill();
        s2 = game.add.sprite(lineX, lineY, 'sound', 9);
    } else {
        on2.setFrames(8 + 9, 6 + 9, 8 + 9);
        off2.setFrames(3 + 9, 3 + 9, 3 + 9);
        s2.kill();
        s2 = game.add.sprite(lineX, lineY, 'sound', 11);
    }
}

function setButton(object) {
    var lineX = START_X, lineY = START_Y;
    if (object == on) {
        on.setFrames(4 + 9, 4 + 9, 4 + 9);
        off.setFrames(7 + 9, 5 + 9, 7 + 9);
        music.resume();
        s1.kill();
        s1 = game.add.sprite(lineX, lineY, 'sound', 9);
    } else {
        on.setFrames(8 + 9, 6 + 9, 8 + 9);
        off.setFrames(3 + 9, 3 + 9, 3 + 9);
        music.pause();
        s1.kill();
        s1 = game.add.sprite(lineX, lineY, 'sound', 11);
    }
}