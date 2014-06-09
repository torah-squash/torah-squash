/**
 * Created by user on 26/02/14.
 */

var numPsukimInPrakim = null;
var ANIMATION_TIME = 500, DELAY_TIME = 500;
var endAnimation, endDelay;
var circle = null, percentText = null;
var isLoadingFinished = false;

var bootState = {
    preload: function() {
    }, create: function() {
    }, update: function() {
    	game.state.start('loadingState', true, true);
    }
};

var logo_torah_title = null, logo_squash_title = null, torah_icon = null;
var isAnimation, allDone = false;

var loadingState = {
    preload : function() {
        try {
            game.load.image('introduction', 'images/introduction.png');
            game.load.image('t1', 'photoshoped/torah4.png');
            game.load.image('t2', 'photoshoped/torah_infront.png');
            game.load.image('backgroundL', 'photoshoped/back.png');
            game.load.image('torahL', 'photoshoped/torah4.png');
            game.load.image('torah_logo', 'images/crush_logo.png');//'photoshoped/torah_logo4.png');
            game.load.image('squash_logo', 'images/torah_logo.png');//'photoshoped/squash_logo.png');
            game.load.image('torah_icon', 'photoshoped/torah_icon.png');

            //choosegameState images:
            map.preloadState();

            // settingsState images:
            settings.preloadState();

            //gameboardState images:
            board.preloadState();

        } catch (err) {
            popups.setMessage(popups.INTERNET_PROBLEM);
            popups.setOptions(['נסה שוב'],
                    [function() {
                        location.refresh();
                    }]
            );
            popups.show();
            return;
        }



        game.stage.backgroundColor = '#3a3a3a';
        var filesLoaded = game.load.totalLoadedFiles(), filesNumber = filesLoaded + game.load.totalQueuedFiles();
        var presents = Math.round(filesLoaded * 100 / filesNumber);
        var style = { font: "30pt Century", fill: "#ffffff", align: "center"};
        percentText = game.add.text(game.world.centerX - 60 / 2.0, 470/*500*/, presents + "%", style);
        game.load.setPreloadFunction(this.updateProgress);
    }, create: function() {
//        game.add.sprite(game.world.centerX - 604/2,game.world.height - 320,'introduction');
        logo_torah_title = game.add.sprite(game.world.centerX - 100, 80, 'torah_logo');
        logo_torah_title.visible = false;
        logo_squash_title = game.add.sprite(game.world.centerX - 100, 50, 'squash_logo');
        logo_squash_title.visible = false;
        endDelay = game.time.now + DELAY_TIME;
        endAnimation = game.time.now + DELAY_TIME + ANIMATION_TIME;
        drawCircle(100);
        torah_icon = game.add.sprite(game.world.centerX - 56 / 2, 50, 'torah_icon');
        torah_icon.visible = false;
        isAnimation = false;
        loadNumPsukimInPrakim();
    }, updateProgress: function(progress) {
        // do some math:
        var presents = progress;
        var proportion = 1.2 * presents / 100.0 + 0.3;
        // update game screen:
        drawCircle(progress);
        percentText.content = presents.toString() + "%";
        percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0;
    }, update: function() {
        logo_torah_title.body.velocity.x = 0;
        if (game.time.now <= endDelay) {
            // do nothing
        } else if(!isAnimation) {
            torah_icon.opacity = 0;
            game.add.tween(logo_torah_title).to({ x:  game.world.centerX - 340}, ANIMATION_TIME, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            game.add.tween(logo_squash_title).to({ x:  game.world.centerX + 120}, ANIMATION_TIME, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            isAnimation = true;
        } else if (game.time.now <= endAnimation) {
            logo_torah_title.visible = true;
            logo_squash_title.visible = true;
            torah_icon.visible = true;
        } else if (!allDone) {
            percentText.content = "גע במסך כדי להתחיל לשחק";
            percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0 + 20;
            game.input.onDown.add(nextState, this);
            bar.showButtons([bar.EXIT, bar.SETTINGS], //, bar.PRIZE, bar.PLUS],
                [bar.EXIT_HANDLER, bar.SETTINGS_HANDLER]); //, function() {}, function() {}]);

            musicOn = true;
            soundOn = true;

            allDone = true;
//            audio.music = game.add.audio('will.i.am', 10, true);
//            audio.music.play('', 0, 1, true);
        }
    }
};

function drawCircle(progress) {
    graphics = game.add.graphics(0, 0);
    graphics.clear();
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(game.world.centerX, 120, progress);
}

function nextState() {
    killLoadingState();
    // redirect to next state
    game.state.start('chooseGameState', true, true);
}

function killLoadingState(){
    destroy(percentText);
    kill(torah_icon);
    kill(logo_torah_title);
    kill(logo_squash_title);

}

function loadNumPsukimInPrakim(){
    if(numPsukimInPrakim == null){
        numPsukimInPrakim = [];
        numPsukimInPrakim.push(allPsukim[0].length);
        for(var i = 1 ; i < allPsukim.length ; i++){
            numPsukimInPrakim.push(numPsukimInPrakim[i-1] + allPsukim[i].length);
        }
    }
}
