/**
 * Created by user on 13/05/14.
 */

var images = [];
var moveImages = [];
var texts = [];
var moveTexts = [];
var timer = 0;
var DIS_UP = 0;
var firstTimeScore;
/**
 * Created by user on 13/05/14.
 */

function preloadScoreTableState() {
    game.load.image('back', 'images/score_table/back.png');
    game.load.image('winner_prize', 'images/score_table/winner_prize.png');
//    game.load.spritesheet('table1', 'images/score_table/table1.png');
    game.load.spritesheet('table', 'images/score_table/table.png', 256, 72, 4);
    images = [];
    moveImages = [];
    texts = [];
    moveTexts = [];
    firstTimeScore = false;
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
    preloadState: function() {
        game.load.image('back', 'images/score_table/back.png');
        game.load.image('winner_prize', 'images/score_table/winner_prize.png');
        game.load.spritesheet('table', 'images/score_table/table.png', 256, 72, 4);
        images = [];
        moveImages = [];
        texts = [];
        moveTexts = [];
        firstTimeScore = false;
    },

    /**
     *
     */
    create: function() {

        images.push(game.add.sprite(0,0, 'back'));
//        var backButton = game.add.sprite(0,0, 'backOn', 0);
//        backButton.scale.setTo(0.5, 0.5); // 50% of the source image size
//        enableClick(backButton, undoClickT);
//        images.push(backButton);
        bar.showButtons([bar.EXIT, bar.RETURN], [
            bar.EXIT_HANDLER, bar.RETURN_TO_MAP
        ]);

    },

    /**
     *
     */
    update: function() {
        if(firstTimeScore == false){
            activeFirst();
            firstTimeScore = true;
        }
        if(isDvir){
            if(timer < game.time.now){
                undoClickT();
            }
        }

    }
};

function activeFirst(){

    var user;
    $.get('/get-user/', function( data ) {
        user = data;
    });
    $.get('/group-score/', function( data ) {
        data.replace("'" ,"");
        var me;
        var x = data.split('), (');
        x[0]=x[0].substring(2);
        var x2=x[x.length-1].split( ')]' );
        var lastrow=x2[0].split(',')
        var table=[''];
        for (var i = 0; i < x.length; i++) {
            table[i]=x[i].split(',')
            var cleantable=table[i][0].split("'")
            table[i][0]=cleantable[1]
            for (var j = 0; j <  table[i].length; j++) {
                if (table[i][0]==user)
                    me=i;
            }

        }
        for (var i = 0; i < x.length; i++) {
            for (var j = 0; j < table[i].length; j++) {
                console.log(table[i][j]);
            }
        }

         table[x.length-1][2] = lastrow[2];
         var lastrow = x2[0].split(',')
         for (var i = 0; i < lastrow.length; i++) {
             console.log(lastrow[i]);
         }

        var userIndex = me, next = 0, startX, width;
        var startY = 45;
        var style = { font: "30pt Century", fill: "#ffffff", align: "left"};//, stroke: "White", strokeThickness: 2 };
        var styleP = { font: "32pt Century", fill: "Blue", align: "left", stroke: "White", strokeThickness: 2 };
        var array = ['ניקוד סה"כ', 'שלב', 'שם משתמש'];
//        var text = game.add.text(startX + width * 0 + 70, startY - 45 - DIS_UP, array[0], style);
//        moveTexts.push(text);
//        text = game.add.text(startX + width * 1 + 50, startY - 45 - DIS_UP, array[1], style);
//        moveTexts.push(text);
//        text = game.add.text(startX + width * 2 + 30, startY - 45 - DIS_UP, array[2], style);
//        moveTexts.push(text);
        for(var j = 0; j < 3; j++) {
            width = 256; /*300*/
            startX = (1054 - (3 * width)) / 2;
            var text = game.add.text(startX + width * j + 30, startY - 45 - DIS_UP, array[j], style);
            text.x = (width) / 2 + startX + width * j;
            text.anchor.setTo(0.5,0);
            moveTexts.push(text);
        }
        var tablelength=  x.length;
        console.log(table[me]);
        var indextotah = -1;
        if (table[me] != null) {
            indextotah=("!"+table[me][0]);
        }
        console.log('index totah: ' + indextotah);
        function tablebuild(i)
        {
            if (i == userIndex) {
                width = 256;
                startX = (1054 - (3 * width)) / 2;
                var p = game.add.sprite(startX - 65, startY - DIS_UP, 'winner_prize');
                p.place = game.add.text(startX - 53, startY+3 - DIS_UP, i+1, styleP);
                moveImages.push(p);
                moveTexts.push(p.place);
                array = [table[i][2],table[i][1],indextotah];
                for(var j = 0; j < 3; j++) {
                    moveImages.push(game.add.sprite(startX + width * j, startY-DIS_UP, 'table', 3));
                    var text = game.add.text(startX + width * j + width/2, startY + 12 - DIS_UP, array[j], style);
                      text.anchor.setTo(0.5,0);
                    moveTexts.push(text);
                }
                startY += 72 + 12;
            } else {
                width = 248;
                startX = (1054 - (3 * width)) / 2;
                var p = game.add.sprite(startX - 60, startY-DIS_UP, 'winner_prize');
                p.place = game.add.text(startX - 48, startY+3-DIS_UP, i+1, styleP);
                moveImages.push(p);
                moveTexts.push(p.place);


                array =[table[i][2],table[i][1],table[i][0]];
                for(var j = 0; j < 3; j++) {
                    moveImages.push(game.add.sprite(startX + width * j, startY-DIS_UP, 'table', 2));
                    var text = game.add.text(startX + width * j  + width/2, startY + 7-DIS_UP, array[j], style);
                    text.anchor.setTo(0.5,0);
                    moveTexts.push(text);
                }
                startY += 60 + 12;
            }

        }

        if (tablelength<7)
            for (var i = 0 ; i < tablelength; i ++)
                tablebuild(i);
        else
        {
            if (me<7)
            {
             for (var i = 0 ; i < 6; i ++)
                tablebuild(i);
            }
            else
            {
                for (var i = 0 ; i < 3; i ++) // shows the top-3 players
                    tabdlebuild(i)
                for (var i = 0 ; i < 4; i ++) // show two players above and one down
                {
                    var j=me-1;
                    tabdlebuild(j);
                    if (j<x.length-2)
                        j++;
                }
            }
        }
    });
    timer = game.time.now + 2000;
    moveImagesAndTexts();
}

function moveImagesAndTexts(){
    for(var i = 0 ; i < moveImages.length ; i++){
        game.add.tween(moveImages[i]).to({y: moveImages[i]+DIS_UP}, TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
    }
    for(var i = 0 ; i < moveTexts.length ; i++){
        game.add.tween(moveTexts[i]).to({y: moveTexts[i]+DIS_UP}, TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
    }
}

function undoClickT(){
    killEverythingToExitTopScore();
    game.state.start('chooseGameState', true, true);
}

function killEverythingToExitTopScore(){
    for(var i = 0 ; i < texts.length ; i++){
//        destroy(moveTexts[i]);
    }
    for(var i = 0 ; i < texts.length ; i++){
//        destroy(texts[i]);
    }
    for(var i = 0 ; i < images.length ; i++){
        kill(moveImages[i]);
    }
    for(var i = 0 ; i < images.length ; i++){
        kill(images[i]);
    }
}