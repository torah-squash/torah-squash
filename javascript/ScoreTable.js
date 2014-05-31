/**
 * Created by user on 13/05/14.
 */

function preloadScoreTableState() {
    game.load.image('back', 'images/score_table/back.png');
    game.load.image('winner_prize', 'images/score_table/winner_prize.png');
    game.load.spritesheet('table', 'images/score_table/table.png', 256, 72, 4);
}

var scoreTableState = {
    /**
     *
     */
    preload: function() {
        preloadScoreTableState();
    },

    /**
     *
     */
    create: function() {
        game.add.sprite(0,0, 'back');
        var userIndex = 2, next = 0, startX, width;
        var startY = 45;
        var style = { font: "30pt Century", fill: "#ffffff", align: "left"};
        var array = ['ניקוד סה"כ', 'שלב', 'שם משתמש'];
        for(var j = 0; j < 3; j++) {
            width = 248;
            startX = (1054 - (3 * width)) / 2;
            var text = game.add.text(startX + width * j + 30, startY - 45, array[j], style);
        }
        for (var i = 0 ; i < 5; i ++) {
            if (i == userIndex) {
                width = 256;
                startX = (1054 - (3 * width)) / 2;
                game.add.sprite(startX - 65, startY, 'winner_prize');
                array = ['אני', '4993', '337'];
                for(var j = 0; j < 3; j++) {
                    game.add.sprite(startX + width * j, startY, 'table', 3);
                    var text = game.add.text(startX + width * j + 30, startY + 12, array[j], style);
                }
                startY += 72 + 12;
            } else {
                width = 248;
                startX = (1054 - (3 * width)) / 2;
                game.add.sprite(startX - 60, startY, 'winner_prize');
                array = ['bob', (5000 - i).toString(), (600 - 100 * i).toString()];
                for(var j = 0; j < 3; j++) {
                    game.add.sprite(startX + width * j, startY, 'table', 2);
                    var text = game.add.text(startX + width * j + 30, startY + 7, array[j], style);
                }
                startY += 60 + 12;
            }
        }
    },

    /**
     *
     */
    update: function() {

    }
};