/**
 * Created by user on 26/02/14.
 */
board = {
	    preload: function () {
    game.load.image('background', 'images/back.png');
//    game.load.image('backOn','images/back_on.png');
//    game.load.image('backOff','images/back_Off.png');
},

create: function() {
	game.stage.backgroundColor = '#fff';
	game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
//	setUndoButton(true);
}, 

update: function() {
}
};
