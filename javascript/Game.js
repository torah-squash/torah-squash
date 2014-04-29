/**
 * Created by user on 25/02/14.
 */
var GAME_WIDTH = 1054, GAME_HEIGHT = 540; //560;

// creates the game
game = new Phaser.Game(
    GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'myGame'
);

// sets game possible states
game.state.add('bootState', BootState, true); // set default state
game.state.add('loadingState', loadingState);
game.state.add('intoductionState', introductionState);
game.state.add('shopState', shopState);
game.state.add('chooseGameState', chooseGameState);

