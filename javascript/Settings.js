/**
 * Created by user on 23/05/14.
 */

var s1, s2; // sound icons
var on, off, onText = null, offText = null,
    on2, off2, onText2 = null, offText2 = null;
var musicOn, soundOn;

var smallLetters = { font: "bold 24pt Cooper Std", fill: "#000", align: "center" };

var START_Y = 200, START_X = 490;
var START_BUTTON_Y = START_Y + 5;
var START_TEXT_Y = START_Y + 20;
var START_BUTTON_TEXT_Y = START_Y + 27;

var settings = {
    /**
     *
     */
    preload: function() {
    },

    /**
     *
     */
    preloadState: function() {
        game.load.image('settings_background', '../images/back.png');
        game.load.spritesheet('sound', 'images/settings/music.png', 80, 80,
                /*max_frames*/9, /*margin*/0, /*spacing*/0);
        game.load.audio('will.i.am', ['../music/c.mp3']);
    },

    /**
     *
     */
    create: function() {
        game.add.sprite(0, 0, 'settings_background');
        var lineX = START_X;
        var style = { font: "bold 36pt Cooper Std", fill: "#000", align: "center" };

        var title = game.add.text(452, 70, 'הגדרות', style);
        title.x = (game.world.width - title.width) / 2 - 5;

        var style = { font: "bold 30pt Cooper Std", fill: "#000", align: "right" };

        var text1 = game.add.text( 630 + 51, START_TEXT_Y, 'מוזיקה', style); // MUSIC
//        s1 = game.add.sprite(lineX, START_Y, 'sound', 0);
//        on = game.add.button(258 + 80, START_BUTTON_Y, 'sound', setButton, game, OVER_ON, OUT_ON, OVER_ON);
//        off = game.add.button(258, START_BUTTON_Y, 'sound', setButton, game, OVER_OFF, OUT_OFF, OVER_OFF);

        var text2 = game.add.text(630, START_TEXT_Y + 88, 'צלילי רקע', style); // SOUND
//        s2 = game.add.sprite(lineX, START_Y + 88, 'sound', 0);
//        on2 = game.add.button(258 + 80, START_BUTTON_Y + 88, 'sound', setButton2, game, OVER_ON, OUT_ON, OVER_ON);
//        off2 = game.add.button(258, START_BUTTON_Y + 88, 'sound', setButton2, game, OVER_OFF, OUT_OFF, OVER_OFF);

//        var temp = game.add.text(0, 0, 'ON', smallLetters);
//        START_BUTTON_TEXT_Y = START_BUTTON_Y + (on.height - temp.height) / 2;
//        temp.destroy();

//        if (musicOn) {
//            setButton(on);
//        } else {
//            setButton(off);
//        }
//        if (soundOn) {
//            setButton2(on2);
//        } else {
//            setButton2(off2);
//        }

        $('#audio').css('visibility', 'visible');

        bar.showButtons([bar.EXIT, bar.RETURN],
            [function() {bar.EXIT_HANDLER}, bar.RETURN_TO_MAP]);
    },

    /**
     *
     */
    update: function() {

    }
};

var CHOSED_ON = 4, OVER_ON = 8, OUT_ON = 6;
var CHOSED_OFF = 3, OVER_OFF = 7, OUT_OFF = 5;
function setButton2(object) {
    var lineX = START_X, lineY = START_Y  + 88;
    if (object == on2) {
        on2.setFrames(CHOSED_ON, CHOSED_ON, CHOSED_ON);
        off2.setFrames(OVER_OFF, OUT_OFF, OVER_OFF);
        alert('do nothing');
        s2.kill();
        s2 = game.add.sprite(lineX, lineY, 'sound', 0);
    } else {
        on2.setFrames(OVER_ON, OUT_ON, OVER_ON);
        off2.setFrames(CHOSED_OFF, CHOSED_OFF, CHOSED_OFF);
        alert('do nothing');
        s2.kill();
        s2 = game.add.sprite(lineX, lineY, 'sound', 2);
    }
}

function setButton(object) {
//    var lineX = START_X, lineY = START_Y;
//    if (object == on) {
//        on.setFrames(CHOSED_ON, CHOSED_ON, CHOSED_ON);
//        off.setFrames(OVER_OFF, OUT_OFF, OVER_OFF);
////        audio.music.resume();
//        s1.kill();
//        s1 = game.add.sprite(lineX, lineY, 'sound', 0);
//    } else {
//        on.setFrames(OVER_ON, OUT_ON, OVER_ON);
//        off.setFrames(CHOSED_OFF, CHOSED_OFF, CHOSED_OFF);
//        audio.music.pause();
//        s1.kill();
//        s1 = game.add.sprite(lineX, lineY, 'sound', 2);
//    }
}