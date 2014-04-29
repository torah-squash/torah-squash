/**
 * Created by user on 26/02/14.
 */

var game;
var levels = null;
var currentLevel = 1;

$.get( "../level-status/?path=torah", function( data ) {
    levels = data;
    console.log( "Load was performed from ../level-status/?path=torah" );
    console.log( "resived the following data: '" + levels + "'");
    currentLevel = levels.split(",").length;
});