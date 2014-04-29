/**
 * Created by user on 03/03/14.
 */
/*
 * things we need to do:
 * bring the selected letters to the pasuk
 * put the pasuks array
 * fix the hebrew
 * set the POINTS, lifes, steps, pasuk, shop toys, etc nicly
 * show the pair depends in timer
 * set that we can ligror the letter, and the toy to the board
 *  
 * 
 */
var firstTimeAngle = true;
var endTimeInterval;
var angleTimeInterval;
var gameBackground = null;
var winnerPic = null;
var levelLable = null;
var sets = null;
var THRESHOLD = 10;
var globalEndAnimation = 0;
var POINTS = 20,score = 0,scoreLable = null;
var isAllEnabled = false;
var pair = null;
var backOn = null,backOff = null;
var style = { font: "30pt Courier", fill: "Blue", stroke: "White", strokeThickness: 2 };
var PASUK_STYLE = { font: "22pt Courier", fill: "#000000", stroke: "#004444", strokeThickness: 2 ,align: "center"};
var STEPS_STYLE = { font: "28pt Courier", fill: "Red", stroke: "Blue", strokeThickness: 1 };
var LEVEL_STYLE = { font: "28pt Courier", fill: "Yellow", stroke: "Blue", strokeThickness: 1 };
var SCORE_STYLE = { font: "28pt Courier", fill: "Purple", stroke: "Blue", strokeThickness: 1 };

var NUM_ROWS = 7, NUM_COLUMNS = 12;
var CELL_SIZE = 50;
var countAngle = 0;
var levelClicked = 1;
var board = [];
var isCalledSwapping = false;
var steps = 30, ANGLE_CONST = 9;
var sets = null;
var startedFill = false;
var cellsToMove = null;
var stepsLabel = null;
var COLORS_ARRAY = ['Red','Blue','Orange','Yellow','Purple','Pink'];//,'Black'];
var LETTERS_ARRAY = ['א','ב','ג','ד','ה','ה','ו','ו','ז','ח','ט','י','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
var lettersArray = LETTERS_ARRAY;
//var LETTERS_ARRAY = ['l','o','v','e','q','a','z','w','s','x','e','d','c','r','f','v','t','g','b','y','h','n','u','j','m','i','k','o','l','p'];
var pasuk = "בראשית ברא א-לוהים את השמיים ואת הארץ";
var pasukLabel = null;
var flags = null, NUM_CHARS_IN_LINE = 45;
var isBringingUp= false;
var CELL_SPACE = 3;
var BOARD_WIDTH = NUM_COLUMNS*(CELL_SIZE+CELL_SPACE)-CELL_SPACE;
var BRING_UP_TIME = 0.6;
var BOARD_HEIGHT = NUM_ROWS*(CELL_SIZE+CELL_SPACE)-CELL_SPACE;
var cellState = 'turnAngle', stateI = 'first';
var prevCellClick = null;
var isAllCancle = false;
var SWAP_TIME = 0.4,FALL_TIME = 0.17,RESIZE_POINTS_TIME = 40,WAIT_POINTS_TIME = 0;
var cellClicked = null;
var doneKilling = true;
var saveTime = 0;
var toysGroup = null, toysArray = null;
var dragEnabled = false;
var hideBackground = null;
var BOARD_LOCATION_X = (CELL_SIZE+CELL_SPACE)*4,BOARD_LOCATION_Y = (CELL_SIZE+CELL_SPACE)*2;
var pasukMatrix = null;
var once = false;
var RESIZE_POINTS_STYLES = [
{ font: "12px Miriam Fixed", fill: 'Purple', stroke: "#ffffff", strokeThickness: 1,  align: "center"},
{ font: "16px Miriam Fixed", fill: 'Purple', stroke: "#ffffff", strokeThickness: 1,  align: "center"},
{ font: "20px Miriam Fixed", fill: 'Purple', stroke: "#ffffff", strokeThickness: 1,  align: "center"},
{ font: "22px Miriam Fixed", fill: 'Purple', stroke: "#ffffff", strokeThickness: 1,  align: "center"},
{ font: "25px Miriam Fixed", fill: 'Purple', stroke: "Pink", strokeThickness: 1,  align: "center"},
{ font: "31px Miriam Fixed", fill: 'Purple', stroke: "Pink", strokeThickness: 1,  align: "center"},
{ font: "34px Miriam Fixed", fill: 'Purple', stroke: "Pink", strokeThickness: 1,  align: "center"},
{ font: "36px Miriam Fixed", fill: 'Purple', stroke: "Red", strokeThickness: 1,  align: "center"},
{ font: "38px Miriam Fixed", fill: 'Purple', stroke: "Red", strokeThickness: 1,  align: "center"},
{ font: "39px Miriam Fixed", fill: 'Purple', stroke: "Yellow", strokeThickness: 1,  align: "center"},
{ font: "40px Miriam Fixed", fill: 'Purple', stroke: "Yellow", strokeThickness: 1,  align: "center"}
              ];

var shopState = {
		preload: function() {
    endTimeInterval = 0;
    angleTimeInterval = 20;
     sets = null;
            firstTimeAngle = true;
    winnerPic = null;
    globalEndAnimation = 0;
     score = 0,scoreLable = null;
     isAllEnabled = false;
     pair = null;
     backOn = null,backOff = null;
     countAngle = 0;
     board = [];
     isCalledSwapping = false;
     steps = 10;
     sets = null;
     startedFill = false;
     cellsToMove = null;
     stepsLabel = null;
     pasuk = "בראשית ברא א-לוהים את השמיים ואת הארץ";
     pasukLabel = null;
     flags = null;
     isBringingUp= false;
     cellState = 'turnAngle', stateI = 'first';
     prevCellClick = null;
     isAllCancle = false;
     cellClicked = null;
     doneKilling = true;
     saveTime = 0;
     toysGroup = null, toysArray = null;
 dragEnabled = false;
 hideBackground = null;
 pasukMatrix = null;
            levelLable = null;
            gameBackground = null;
}, 

create: function() {
    gameBackground = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    hideBackground = game.add.sprite(0, 0, 'background'); //tileSprite(0, 0, game.world.width, (game.world.height - BOARD_HEIGHT)/2 - CELL_SPACE, 'background');
    hideBackground.cropEnabled = true;
    hideBackground.crop.width = game.world.width - 200;
    hideBackground.crop.height = (game.world.height - BOARD_HEIGHT)/2 - CELL_SPACE;
    hideBackground.crop.x = 200;
    hideBackground.x = 200;
	pasuk = psukim[(levelClicked-1)];
	steps = parseInt(pasuk.length/3 - levelClicked/2) * 2;
    if(steps < pasuk.length/4){
        steps = parseInt(pasuk.length/4);
    }
	cutPasuk(10);
	levelLable = game.add.text(20,240,":שלב \n"+levelClicked,LEVEL_STYLE);
//	setUndoButton(true);
	scoreLable = game.add.text(20,90,":ניקוד \n"+score, SCORE_STYLE);
//	scoreLable.anchor.setTo(0.5,0.5);
	createCells();
    removeSetsInBeginning();
	initialFlags();
//    addLettersToArray('array twice');
    addLettersToArray('pasuk once');
//	createToys();
	setBeckgoundToTop();
}, 

update: function() {
    for(var i = 0; i < 5; i++) {
        if (!once) {
            once = true;
            this.updateV();
        }
    }
},

updateV: function() {
    console.log('1');
	switch(stateI){
	case 'first':
		firstTime();
		break;
	case 'cellClick':
		cellClick(cellClicked);
		break;
	case 'undoClick':
		break;
	case 'shopClick':
		break;
	case 'audioClick':
		break;
	}
    once = false;
//    setTimeout(updateV, 1000 / 30);
}
    /*
    update: function() {
    console.log('1');
	switch(stateI){
	case 'first':
		firstTime();
		break;
	case 'cellClick':
		cellClick(cellClicked);
		break;
	case 'undoClick':
		break;
	case 'shopClick':
		break;
	case 'audioClick':
		break;
	}
    once = false;
}

     */
};

function ____MAIN____(){}
function cellClick(cell){
	cellClicked = cell;		
	stateI = 'cellClick';
	if(prevCellClick == null){
		prevCellClick = cell;
		stateI = 'null';
		cellState = 'checkSwap';
		killPair();
		putSelectedCell(cell);
	}
	else{
		removeSelectedCell(prevCellClick);
		cancleAll();
		switch(cellState){
		case 'checkSwap':
			if(isCanSwap(prevCellClick,cell) == true){
				steps--;
				setBeckgoundToTop();
				cellState = 'swap';
			}
			else{
				cancleState();
			}
			break;
		case 'swap':
			if(swap(prevCellClick,cell) == false);
			else{
				cellState = 'turnAngle';
			}
			break;
		case 'turnAngle':
			switchCaseOfTurnAngle();
			break;
		case 'bringLettersUp':
			switchCaseOfBringLettersUp();
			break;
		case 'removeSets':
			switchCaseOfRemoveSets();
			break;
		case 'playPoints':
			switchCaseOfPlayPoints();
			break;
		case 'fillUp':
			switchCaseOfFillUp();
			break;
		default:
			cancleState();				
		}
	}		
}
function firstTime(){
	cancleAll();
	switch(cellState){
	case 'turnAngle':
		switchCaseOfTurnAngle();
		break;
	case 'bringLettersUp':
		switchCaseOfBringLettersUp();
		break;
	case 'removeSets':
		switchCaseOfRemoveSets();
		break;
	case 'playPoints':
		switchCaseOfPlayPoints();
		break;
	case 'fillUp':
		switchCaseOfFillUp();
		break;
	default:
		cancleState();				
	}	
}
function ____BIG_FUNCTIONS____(){}
function cancleState(){
	prevCellClick = null;
	cellState = 'null';
	stateI = 'null';
	enableAll();
//	pair = getPair();
	if(pair != null){
		putSelectedCell(pair[0]);
		putSelectedCell(pair[1]);		
	}
	else{
		//TODO:!!!
	}
}
function fillUp(){
	if(cellsToMove == null && startedFill == false){
		startedFill = true;
        fixBoard();
		cellsToMove = getCellsToMove();
		setSpeedToFallingCells(cellsToMove);
		return false;
	}
	else if(isStillFalling() == true && startedFill == true){
		return false;
	}
	else{
		cellsToMove = null;
		startedFill = false;
		return true;
	}
}
function swap(cell1,cell2){
	cancleAll();
	if(isCalledSwapping == false){
		isCalledSwapping = true;
		saveTime = game.time.now;
		switchIJ(cell1,cell2);
		if(isVerticalY(cell1,cell2)){
			setSpeedCellY(cell1,cell2.y1,cell2.letter.y,SWAP_TIME);
			setSpeedCellY(cell2,cell1.y1,cell1.letter.y,SWAP_TIME);
		}
		else{
			setSpeedCellX(cell1,cell2,SWAP_TIME);
			setSpeedCellX(cell2,cell1,SWAP_TIME);
		}
		return false;
	}
	else if(saveTime + TIME_INTERVAL*SWAP_TIME > game.time.now){
		return false;
	}
	else{
		isCalledSwapping = false;
		return true;
	}
}
function switchCaseOfTurnAngle(){
	if(sets == null){
		sets = getSets(getVectors(), true);
	}
	if(setAngleOfSets(sets) == false);
	else{
		cellState = 'bringLettersUp';
	}
}
function switchCaseOfBringLettersUp(){
	if(bringLettersUp() == false);
	else{
		cellState = 'removeSets';
	}
}
function switchCaseOfRemoveSets(){
	if(removeSets() == false);
	else{
		if(isThereEmptyCells() == true){
			cellState = 'playPoints';
		}
		else if(setGameIfGameOver() == false);
		else{
			cancleState();
		}
	}	
}
function switchCaseOfPlayPoints(){
	if(playPoints() == false);
	else{
		cellState = 'fillUp';
	}	
}
function switchCaseOfFillUp(){
	if(fillUp() == false);
	else{
        fixBoard();
		cellState = 'turnAngle';
	}	
}

function fixBoard(){
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            if(board[i][j] != null){
                var x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
                var y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
                board[i][j].x1 = x;
                board[i][j].body.x = x;
                board[i][j].y1 = y;
                board[i][j].body.y = y;
            }
        }
    }
}
function ____GET_FUNCTIONS____(){}
function getCellsToMove(){
	var cells = [];
	for(var j = 0 ; j < NUM_COLUMNS ; j++){
		var i = getFirstEmptyCellInRowIndex(j);
		if(i >=0){
			for(;i >= 0 ; i--){
				if(board[i][j] != null){
					cells.push(board[i][j]);					
				}
			}
			var count = countEmptyInRangeColumn(j,0,NUM_ROWS);
			for(var k = -1 ; k >= -count ; k--){
				cells.push(getRandomCell(k, j));
			}			
		}
	}
	setBeckgoundToTop();
	return cells;
}
function getColorSets(vectors,getAll){
	var sets = [];
	var set = [];
	for(var i = 0 ; i < vectors.length ; i++){
		set = [[vectors[i][0],'color']];
		for(var j = 1 ; j < vectors[i].length ; j++){
			if(set[0][0].color == vectors[i][j].color){
				set.push([vectors[i][j],'color']);
			}
			else{
				if(isSetBigEnough(set)){
 					sets.push(set);
					if(getAll == false){
						return sets;
					}
				}
				set = [[vectors[i][j],'color']];
			}
		}
		if(isSetBigEnough(set)){
			sets.push(set);
 			if(getAll == false){
				return sets;
			}
		}
	}
	return sets;
}
function getFirstEmptyCellInRowIndex(j){
	for(var i = NUM_ROWS-1 ; i >=0 ; i--){
		if(board[i][j] == null){
			return i;
		}
	}
	return -1;
}
function getLetterSets(vectors,getAll){
	var sets = [];
	var set = [];
	for(var i = 0 ; i < vectors.length ; i++){
		set = [[vectors[i][0],'letter']];
		for(var j = 1 ; j < vectors[i].length ; j++){
			if(set[0][0].char == vectors[i][j].char){
				set.push([vectors[i][j],'letter']);
			}
			else{
				if(isSetBigEnough(set)){
					sets.push(set);
					if(getAll == false){
						return sets;
					}
				}
				set = [[vectors[i][j],'letter']];
			}
		}
		if(isSetBigEnough(set)){
			sets.push(set);
			if(getAll == false){
				return sets;
			}
		}
	}
	return sets;

}
function getPair(){
	for(var i = NUM_ROWS-1 ; i > 0 ; i--){
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
//			console.log(i+","+j);
			fakeSwap(board[i][j],board[i-1][j]);
			if(isThereSets()){
				fakeSwap(board[i][j],board[i-1][j]);
				return [board[i][j],board[i-1][j]];
			}
			fakeSwap(board[i][j],board[i-1][j]);
			if(j < NUM_COLUMNS - 1){
				fakeSwap(board[i][j],board[i][j+1]);
				if(isThereSets()){
					fakeSwap(board[i][j],board[i][j+1]);
					return [board[i][j],board[i][j+1]];
				}
				fakeSwap(board[i][j],board[i][j+1]);
			}
		}
	}
	return null;
}
function getPointsStyleFromBoard(){
	for(var i = 0 ; i < NUM_ROWS ; i++){
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
			if(isItsPoints(board[i][j]) == true){
				return board[i][j].indexStyle;
			}
		}
	}
	return -1;
}

function getRandomCell(i,j){
	var x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
	var y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
	var cell = game.add.sprite(x,y,'cell',0);
	cell.i1 = i;
	cell.j1 = j;
	cell.endAnimation = 0;
	cell.x1 = x;
	cell.y1 = y;
	var randomLetter = parseInt(Math.random()*LETTERS_ARRAY.length);
	var randomColor = parseInt(Math.random()*COLORS_ARRAY.length);
	cell.color = randomColor;
	cell.char = LETTERS_ARRAY[randomLetter];
	var styleC = { font: "70px Miriam Fixed", fill: COLORS_ARRAY[randomColor], stroke: "White", strokeThickness: 3, align: "center"};
	cell.letter = game.add.text(x+CELL_SIZE/2,y+CELL_SIZE/2,cell.char, styleC);
	cell.letter.anchor.setTo(0.5,0.5);
	cell.indexStyle = 0;
    cell.points = 0;
	return cell;
}
function getSets(vectors,getAll){
	var sets = getColorSets(vectors,getAll);
	if(getAll == false && sets.length > 0){
		return sets;
	}
	sets = putSetsTogether(sets, getLetterSets(vectors,getAll));
	if(getAll == false && sets.length > 0){
		return sets;
	}
	sets = putSetsTogether(sets, getWordSets(vectors,getAll));
	return sets;
}
function getTranspose(){
	var transpose = board[0].map(function(col, i) { 
		  return board.map(function(row) { 
		    return row[i];
		  });
		});
	return transpose;
}
function getVectors(){
	var vectors = [];
	copyArray(vectors,board);
	copyArray(vectors,getTranspose());
	return vectors;
}

function getPasukSplited(){
	wordsArray = [];
	word = "";
	for(var i = 0 ; i < pasuk.length ; i++){
		if(pasuk[i] == ' '){
			wordsArray.push(word);
			word = "";
		}
		else if(pasuk[i] != '-' && pasuk[i] != '\n' && pasuk[i] != '\''){
			word += pasuk[i];
		}
	}
	if(word.length > 0){
		wordsArray.push(word);
	}
	return wordsArray;
}
function getWordSets(vectors,getAll){//TODO!!!
	var sets = [];
	var set = [];
	var words = getPasukSplited();
	var word = null;
	for(var p = 0 ; p < words.length ; p++){
		word = words[p];
        if(word.length > 1){
            for(var i = 0 ; i < NUM_ROWS ; i++){
                set = [];
                for(var j = NUM_COLUMNS-1 ; j >=0 ; j--){
                    if(isSameLetter(word[set.length],board[i][j].char)){
                        set.push([board[i][j],'word']);
                        if(set.length == word.length){//that means that the set has the whole word
                            sets.push(set);
    //						j = j - set.length;
                            if(getAll == false){
                                return sets;
                            }
                            set = [];
                        }
                    }
                    else{
    //					j = j - set.length;
                        set = [];
                    }
                }
            }
            for(var j = 0 ; j < NUM_COLUMNS ; j++){
                set = [];
                for(var i = 0 ; i < NUM_ROWS ; i++){
                    if(isSameLetter(word[set.length],board[i][j].char)){
                        set.push([board[i][j],'word']);
                        if(set.length == word.length){//that means that the set has the whole word
                            sets.push(set);
    //						i = i - set.length;
                            if(getAll == false){
                                return sets;
                            }
                            set = [];
                        }
                    }
                    else{
    //					i = i - set.length;
                        set = [];
                    }
                }
            }
        }
	}
	return sets;
}

function ____SET_FUNCTIONS____(){}
function setAngleOfSets(sets){
    var timesTurn = 1;
//    if(firstTimeAngle == true){
//        firstTimeAngle = false;
//        endTimeInterval = game.time.now;
//    }
//    if(endTimeInterval <= game.time.now){
//        timesTurn = (game.time.now - endTimeInterval)/angleTimeInterval + 1;
//        endTimeInterval += angleTimeInterval;
//    }
//    else{
//        return false;
//    }
	var isDone = true;
	if(sets.length == 0){
		return true;
	}
	for(var i = 0 ; i < sets.length ; i++){
		for(var j = 0 ; j < sets[i].length ; j++){
//            alert(sets[i][j][0]);//+','+sets[i][j][1]);
            // TODO
            /*************************************************/
			board[sets[i][j][0].i1][sets[i][j][0].j1].letter.angle -= ANGLE_CONST*timesTurn;
			if(board[sets[i][j][0].i1][sets[i][j][0].j1].letter.angle > -360){
				isDone = false;
			}
            /*************************************************/
		}
	}
	if(isDone){
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				board[i][j].letter.angle = 0;
                firstTimeAngle = true;
			}
		}
	}
	return isDone;
}
function setBeckgoundToTop(){
	hideBackground.bringToTop();
	if(pasukLabel != null){
		pasukLabel.destroy();
	}
	var pasukText = "";
	for(var i = 0 ; i < pasuk.length ; i++){
		if(flags[i] == true){
			pasukText += pasuk[i];
		}
		else{
			pasukText += '_';
		}
	}
	pasukLabel = game.add.text(game.world.width/2,5,pasukText,PASUK_STYLE);
	pasukLabel.anchor.setTo(0.5,0);
	if(stepsLabel != null){
		stepsLabel.destroy();
	}
	stepsLabel = game.add.text(20,165,":נותרו \n"+steps,STEPS_STYLE);
//	stepsLabel.anchor.setTo(0.5,0.5);
//	backOn.bringToTop();
//	backOff.bringToTop();
//    toysGroup.bringToTop();
//    bringToTopToys();
}
function setGameIfGameOver(){
	if(isPasukFull()){
//		game.state.start('chooseGameState', true, true);
        score += steps*1000;
		//alert('you Win!!!');
        displayWinnerMessage();
	}
	else if(steps <=0){
//		game.state.start('chooseGameState', true, true);
		//alert('you Lost');
        displaySorryMessage();
	}
	return true;
}
function displayWinnerMessage() {
    $.get( "../submit-level/?score=" + score.toString(), function( data ) {
        console.log('Your score is: ' + score + " to ../submit-level/?score=" + score);
    });
    if (levels != "") {
        levels = levels + "," + score.toString();
    } else {
        levels = score.toString();
    }
    currentLevel = levels.split(',').length;
    console.log("levels have been updated: " + levels);
    winnerPic = game.add.sprite(450, 190, 'winner');
    killEverythingToExitState();
    game.state.start('chooseGameState', true, true);
}
function displaySorryMessage() {
    $.get( "../leave-level/", function( data ) {
        // do nothing
    });
    game.add.sprite(470, 190, 'sorry');
    killEverythingToExitState();
    game.state.start('chooseGameState', true, true);
}

function setIJ(cell,i,j){
	cell.i1 = i;
	cell.j1 = j;
	board[i][j] = cell;
}
function setIJInBoard(cell,i,j){
	board[i][j] = cell;
}
function setIJOnly(cell,i,j){
	cell.i1 = i;
	cell.j1 = j;
}
function setLettersBackToTheirCells(){
	for(var i = 0 ; i < NUM_ROWS ; i++){
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
			board[i][j].letter.x = board[i][j].body.x + CELL_SIZE/2;
			board[i][j].letter.y = board[i][j].body.y + CELL_SIZE/2;
			board[i][j].letter.anchor.setTo(0.5,0.5);

		}
	}
}
function setSpeedLetterY(cell,destSpot,time){
	killCell(board[cell.i1][cell.j1]);
	board[cell.i1][cell.j1] = clone(cell);
	game.add.tween(board[cell.i1][cell.j1].letter).to({y: destSpot}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
	board[cell.i1][cell.j1].endAnimation = time*TIME_INTERVAL + game.time.now;
	globalEndAnimation = time*TIME_INTERVAL + game.time.now;
}
function setSpeedCellX(cell,destCell,time){
	if(cell.endAnimation < game.time.now){
		game.add.tween(cell).to({x: destCell.x1}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		game.add.tween(cell.letter).to({x: destCell.letter.x}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		cell.endAnimation = time*TIME_INTERVAL + game.time.now;
		return true;
	}
	else{
		return false;
	}
}
function setSpeedCell(cell,destCell,time){
	if(cell.endAnimation < game.time.now){
		game.add.tween(cell).to({x: destCell.x1,y:destCell.y1}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		game.add.tween(cell.letter).to({x: destCell.letter.x,y: destCell.letter.y}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		cell.endAnimation = time*TIME_INTERVAL + game.time.now;
		return true;
	}
	else{
		return false;
	}
}
function setSpeedCellY(cell,destPicY,destLetterY,time){
	if(cell.endAnimation < game.time.now){
		game.add.tween(cell).to({y: destPicY}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		game.add.tween(cell.letter).to({y: destLetterY}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		cell.endAnimation = time*TIME_INTERVAL + game.time.now;	
	}
}
function setSpeedToFallingCells(cells){
	for(var i = 0 ; i < cells.length ; i++){
		var numEmptyRowsUnder = countEmptyInRangeColumn(cells[i].j1, cells[i].i1+1, NUM_ROWS);
		var time = numEmptyRowsUnder*FALL_TIME;
		var destPic = cells[i].body.y + numEmptyRowsUnder*(CELL_SPACE+CELL_SIZE);
		var destLetter = cells[i].letter.y + numEmptyRowsUnder*(CELL_SPACE+CELL_SIZE);
		setIJOnly(cells[i],cells[i].i1+numEmptyRowsUnder,cells[i].j1);
		setSpeedCellY(cells[i], destPic,destLetter, time);
	}
	for(var i = 0 ; i < cells.length ; i++){
		setIJInBoard(cells[i],cells[i].i1,cells[i].j1);
	}
}
function setUndoButton(check){
	if(backOn != null){
		if(check){
			backOn.body.x = 0;
			backOn.body.y = 0;
			backOff.body.x = game.world.width;
			backOff.body.y = game.world.height;
		}
		else{
			backOn.body.x = game.world.width;
			backOn.body.y = game.world.height;
			backOff.body.x = 0;
			backOff.body.y = 0;
		}
	}
	else{
		if(check){
		    backOn = game.add.sprite(0,0, 'backOn', 0);
		    backOn.endAnimation = 0;
		    backOff = game.add.sprite(game.world.width,game.world.height, 'backOff', 0);
		    backOff.endAnimation = 0;
		}
		else{
		    backOn = game.add.sprite(game.world.width,game.world.height, 'backOn', 0);
		    backOn.endAnimation = 0;
		    backOff = game.add.sprite(0,0, 'backOff', 0);
		    backOff.endAnimation = 0;
		}
	    backOn.scale.setTo(0.5, 0.5); // 50% of the source image size
	    backOff.scale.setTo(0.5, 0.5); // 50% of the source image size
	}
    enableClick(backOn, undoClickC);
}

function ____IS_FUNCTIONS____(){}
function isCanSwap(cell1,cell2){
	if(isNextToEachOther(cell1,cell2) == false){
		return false;
	}
	fakeSwap(cell1,cell2);
	if(isThereSets()){
		fakeSwap(cell1,cell2);
		return true;
	}
	fakeSwap(cell1,cell2);
	return false;	
}
function isGotToDestination(cell1,cell2){
	return (cell1.x1 == board[cell2.i1][cell2.j1].x1 && cell1.y1 == board[cell2.i1][cell2.j1].y1);
}
function isIndexesInBoard(i,j){
	return (i >= 0 && j >= 0 && i < NUM_ROWS && j < NUM_COLUMNS);
}function isInItsPlace(cell){
	return(cell.body.x == cell.x1 && cell.body.y == cell.y1);
}
function isItsPoints(cell){
	if(cell != null){
		return 	('0' <= cell.char[0] && cell.char[0] <= '9');
	}
	return false;
}
function isMoving(cell){
	if(cell != null){
		return (cell.endAnimation > game.time.now);		
	}
	return false;
}
function isNextToEachOther(cell1,cell2){
	var disI = Math.abs(cell1.i1-cell2.i1);
	var disJ = Math.abs(cell1.j1-cell2.j1);
	return (disI+disJ == 1);
}
function isPasukFull(){
	for(var i = 0 ; i < flags.length ; i++){
		if(flags[i] == false){
			return false;
		}
	}
	return true;
}
function isSameLetter(letter1,letter2){
	if(letter1 == letter2)
		return true;
	else if(letter1 == 'ם' && letter2 == 'מ')
		return true;
	else if(letter1 == 'ץ' && letter2 == 'צ')
		return true;
	else if(letter1 == 'ף' && letter2 == 'פ')
		return true;
	else if(letter1 == 'ן' && letter2 == 'נ')
		return true;
	else if(letter1 == 'ך' && letter2 == 'כ')
		return true;
	return false;
}
function getLowerCase(letter){
    switch(letter){
        case 'ץ':
            return 'צ';
        case 'ם':
            return 'מ';
        case 'ן':
            return 'נ';
        case 'ך':
            return 'כ';
        case 'ף':
            return 'פ';
        default :
            return letter;
    }
}
function isSetBigEnough(set){
	return set.length >=3;
}
function isStillFalling(){
	if(cellsToMove != null){
		if(cellsToMove.length >0){
			for(var i = 0 ; i < cellsToMove.length ; i++){
				if(cellsToMove[i].endAnimation > game.time.now){
					return true;
				}
			}
		}
	}
	return false;
}
function isThereEmptyCells(){
	for(var i = 0 ; i < board.length ; i++){
		for(var j = 0 ; j < board[i].length ; j++){
			if(board[i][j] == null || isItsPoints(board[i][j]) == true){
				return true;
			}
		}
	}
	return false;
}
function isThereSets(){
	var sets = getSets(getVectors(),false);
	return (sets.length > 0);
}
function isVerticalY(cell1, cell2){
	return (cell1.j1 == cell2.j1);
}

function ____SMALL_FUNCTIONS____(){}
function createMatrix(){
	pasukArray = cutPasukToLines(pasuk,NUM_CHARS_IN_LINE);
	
	
}

function putLineOfPasukLetters(line,middleX,middleY){
	
}
function cutPasukToLines(pasuk,numCharsInLine){
	var pasukArray = [];
	var beginIndex = 0;
	var endIndex = numCharsInLine;
	while(endIndex < pasuk.length){
		if(pasuk[endIndex] != ' '){
			endIndex--;
		}
		else{
			pasukArray.push(pasuk.substring(beginIndex,endIndex));
			beginIndex = endIndex + 1;
			endIndex+=numCharsInLine;
		}
	}
	if(beginIndex < pasuk.length){
		pasukArray.push(pasuk.substring(beginIndex,pasuk.length));
	}
	return pasukArray;
}
function activateKad(){alert('kad activated');}
function activateShofar(){alert('shofar activated');}
function activateMenora(){alert('menorag activated');}
function activateOzenhaman(){alert('ozenhaman activated');}
function activateDonut(){alert('dounat activated');}
function activateMatza(){alert('matza activated');}
function activateRimon(){alert('rimon activated');}
function activateSevivon(){alert('sevivon activated');}

function addLetterToPasuk(cell){
	if(cell.endAnimation < game.time.now){
		for(var i = 0 ; i < pasuk.length ; i++){
			if(isSameLetter(pasuk[i],cell.char)){
				if(flags[i] == false){
					setSpeedLetterY(cell, pasukLabel.y+30, BRING_UP_TIME);
					flags[i] = true;
					return true;
				}
			}
		}
	}
    return false;
}
function addPointToCell(cell,points,toUpdateText){
    board[cell.i1][cell.j1].points += points;
    if(toUpdateText){
        if(isItsPoints(cell)){
            board[cell.i1][cell.j1].char =""+board[cell.i1][cell.j1].points;//(parseInt(board[cell.i1][cell.j1].char)+points);
        }
        else{
            board[cell.i1][cell.j1].letter.setStyle(RESIZE_POINTS_STYLES[0]);
            board[cell.i1][cell.j1].char = ""+cell.points;
        }
        board[cell.i1][cell.j1].letter.setText(board[cell.i1][cell.j1].char);
    }
	score+=points;
	updateScoreLable();
}
function bringLettersUp(){
	if(globalEndAnimation < game.time.now && isBringingUp == false){
		isBringingUp = true;
		for(var i = 0 ; i < sets.length ; i++){
			for(var j = 0 ; j < sets[i].length ; j++){
				var cell = sets[i][j][0];
				if(addLetterToPasuk(cell)){
                    addPointToCell(cell,POINTS,false);
                }
			}
		}
		return false;
	}
	else if(globalEndAnimation > game.time.now){
		return false;
	}
	else{
		isBringingUp = false;
		setBeckgoundToTop();
		setLettersBackToTheirCells();
		return true;
	}
	
}
function cancleAll(){
	if(isAllEnabled){
		isAllEnabled = false;
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j]!=null){
					cancleClick(board[i][j]);
//					cancleDrag(board[i][j]);
				}
			}
		}
	}
}
function cancleDrag(cell){
	//TODO - need to find how to cancle drag
    cell.inputEnabled = false;
//	board[cell.i1][cell.j1].events.onInputUp.add(nothing);
}
function cancleClick(pic){
	if(pic != null){
		pic.inputEnabled = false;
	}
}
function cellDrag(cell){//after draging, the letters stays and not going back, if the swap is ilegal, put it back to its place
    if(cell.inputEnabled == true){
        if(Math.abs(cell.body.x - cell.x1) < THRESHOLD && Math.abs(cell.body.y - cell.y1) < THRESHOLD){
            fixCellBodyLocation(cell);
            cellClick(cell);
        }
        else if(Math.abs(cell.body.x - cell.x1) > Math.abs(cell.body.y - cell.y1)){ // the distance of x is greater
            if(cell.body.x - cell.x1 > 0){//that means the cell moved right
                fixCellBodyLocation(cell);
    			dragAndSwap(cell.i1,cell.j1,cell.i1,cell.j1+1);
            }
            else{//the cell moved left
                fixCellBodyLocation(cell);
                dragAndSwap(cell.i1,cell.j1,cell.i1,cell.j1-1);
            }
        }
        else{//the distance of y is greater
            if(cell.body.y - cell.y1 > 0){//the cell draged to down
                fixCellBodyLocation(cell);
                dragAndSwap(cell.i1,cell.j1,cell.i1+1,cell.j1);
            }
            else{//to up
                fixCellBodyLocation(cell);
                dragAndSwap(cell.i1,cell.j1,cell.i1-1,cell.j1);
            }
        }
    }
//    alert(cell.body.x+","+cell.x1+","+cell.body.y+","+cell.y1);
	console.log(cell.body.x+","+cell.x1+","+cell.body.y+","+cell.y1);


	if(Math.abs(cell.body.x - cell.x1) < THRESHOLD){//was in same line, now check if up or down
		if(cell.body.y > cell.y1){//the cell moved down (dest > src)
			fixCellBodyLocation(cell);
			dragAndSwap(cell.i1,cell.j1,cell.i1-1,cell.j1);
			return;
		}
		else if(cell.body.y < cell.y1){//moved up (dest < src)
			fixCellBodyLocation(cell);
			dragAndSwap(cell.i1,cell.j1,cell.i1+1,cell.j1);
			return;
		}
	}
	else if(Math.abs(cell.body.y == cell.y1) < THRESHOLD){
		if(cell.body.x > cell.x1){//the cell moved right (dest > src)
			fixCellBodyLocation(cell);
			dragAndSwap(cell.i1,cell.j1,cell.i1,cell.j1+1);
			return;
		}
		else if(cell.body.x < cell.x1){//moved left (dest < src)
			fixCellBodyLocation(cell);
			dragAndSwap(cell.i1,cell.j1,cell.i1,cell.j1-1);
			return;
		}
	}
	fixCellBodyLocation(cell);
}
function clone(cell){
	var x = cell.j1*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
	var y = cell.i1*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
	var newCell = game.add.sprite(x,y,'cell',0);
	newCell.i1 = cell.i1;
	newCell.j1 = cell.j1;
	newCell.endAnimation = 0;
	newCell.x1 = x;
	newCell.y1 = y;
	newCell.color = cell.color;
	newCell.char = cell.char;
	var styleC = { font: "70px Miriam Fixed", fill: COLORS_ARRAY[newCell.color], stroke: "White", strokeThickness: 3, align: "center"};
	newCell.letter = game.add.text(x+CELL_SIZE/2,y+CELL_SIZE/2,newCell.char, styleC);
	newCell.letter.anchor.setTo(0.5,0.5);
	newCell.indexStyle = 0;
    newCell.points = cell.points;
	return newCell;

}
function copyArray(dest,src){
	for(var i = 0 ; i < src.length ; i++){
		dest.push(src[i]);
	}
}
function countEmptyInRangeColumn(j,begin,last){
	var count = 0;
	if(begin < 0){
		begin = 0;
	}
	for(var i = begin ; i < last ; i++){
		if(board[i][j] == null){
			count++;
		}
	}
	return count;
}
function createCells(){
	for(var i = 0 ; i < NUM_ROWS ; i++){
		board[i] = [];
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
			board[i][j] = getRandomCell(i,j);
		}
	}
}

function removeSetsInBeginning(){
    var countTimes = 5;
    while(isThereSets() == true && countTimes > 0){
        countTimes--;
        var sets = getSets(getVectors(),true);
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                var cell = sets[i][j][0];
                killCell(cell);
                board[cell.i1][cell.j1] = getRandomCell(cell.i1,cell.j1);
            }
        }
    }
}

function createToys(){
	toysArray = [];
	toysGroup = game.add.group();
	var x = game.world.width - 120;
	var jumps = CELL_SIZE+CELL_SPACE;
	var y = jumps*2;
	toysArray[0] = toysGroup.create(x,y,'kad');
	toysArray[0].func = activateKad;
	y += jumps;
	toysArray[1] = toysGroup.create(x,y,'shofar',0);
	toysArray[1].func = activateShofar;
	y += jumps;
	toysArray[2] = toysGroup.create(x,y,'menora',0);
	toysArray[2].func = activateMenora;
	y += jumps;
	toysArray[3] = toysGroup.create(x,y,'ozenhaman',0);
	toysArray[3].func = activateOzenhaman;
	y += jumps;
	toysArray[4] = toysGroup.create(x,y,'donut',0);
	toysArray[4].func = activateDonut;
	y += jumps;
	toysArray[5] = toysGroup.create(x,y,'matza',0);
	toysArray[5].func = activateMatza;
	y += jumps;
	toysArray[6] = toysGroup.create(x,y,'rimon',0);
	toysArray[6].func = activateRimon;
	y += jumps;
	toysArray[7] = toysGroup.create(x,y,'sevivon',0);
	toysArray[7].func = activateSevivon;
	y += jumps;
	for(var i = 0 ; i < toysArray.length ; i++){
        toysArray[i].scale.setTo(0.3,0.3);
        toysArray[i].input.enableDrag();
		toysArray[i].input.enableSnap(CELL_SIZE+CELL_SPACE,CELL_SIZE+CELL_SPACE, false, true);

//		toysGroup.add(toysArray[i]);
	}
	enableToys();
}
function bringToTopToys(){
    for(var i = 0 ; i < toysArray.length ; i++){
        toysArray[i].bringToTop();
    }
}

function cutPasuk(numChars){
	index = numChars;
	while(index < pasuk.length){
		if(pasuk[index] != ' '){
			index--;
		}
		else{
			pasuk[index] = '\n';
			index += numChars;
		}
	}
	
}
function destroy(text){
	if(text != null){
		text.destroy();
	}
}
function dragAndSwap(i1,j1,i2,j2){
	if(isIndexesInBoard(i2,j2) && isIndexesInBoard(i1,j1)){
		prevCellClick = board[i1][j1];
		cellClick(board[i2][j2]);
	}	
}function enableAll(){
	if(isAllEnabled == false){	
		isAllEnabled = true;
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j]!=null){
					enableClick(board[i][j],cellClick);
//					enableDrag(board[i][j],cellDrag);
				}
			}
		}
	}
}
function enableClick(pic,func){
	if(pic != null){
		pic.inputEnabled = true;
		pic.events.onInputDown.add(func,this);
//        pic.events.onInputUp.add(func,this);
        //pic.event.ontap;
//        pic.events.onDown.add(func,this);
//        pic.events.isDown.add(func,this);//eventTouchMove,eventTouchEnd
	}
}
function enableDrag(cell,func){
	if(cell != null){
		board[cell.i1][cell.j1].input.start(0,true);
		board[cell.i1][cell.j1].input.enableDrag();
		board[cell.i1][cell.j1].input.enableSnap(CELL_SIZE+CELL_SPACE,CELL_SIZE+CELL_SPACE, false, true);
		board[cell.i1][cell.j1].events.onInputUp.add(func);
	}
}
function enableToys(){
	for(var i = 0 ; i < toysArray.length ; i++){
		enableClick(toysArray[i],toysArray[i].func);
	}
}
function fakeSwap(cell1,cell2){
	var temp = board[cell1.i1][cell1.j1];
	board[cell1.i1][cell1.j1] = board[cell2.i1][cell2.j1];
	board[cell2.i1][cell2.j1] = temp;
}
function fixCellBodyLocation(cell){
	console.log("try fix:"+board[cell.i1][cell.j1].body.x+","+cell.x1+","+board[cell.i1][cell.j1].body.y+","+cell.y1);
//	board[cell.i1][cell.j1].body.x = cell.x1;
//	board[cell.i1][cell.j1].body.y = cell.y1;
    setSpeedCell(board[cell.i1][cell.j1],cell,0.01);
	console.log("fixed:"+board[cell.i1][cell.j1].body.x+","+cell.x1+","+board[cell.i1][cell.j1].body.y+","+cell.y1);
}
function initialFlags(){
	flags = [true];
	j = 0;
	for(var i = 1 ; i < pasuk.length-1 ; i++){
		if(pasuk[i] == ' ' || pasuk[i] == '-' || pasuk[i] == '\''){
				flags.push(true);
		}
        else if(pasuk[i] == '\n'){
            flags.pop();
            flags.push(true);
            flags.push(true);
            flags.push(true);
            flags.push(true);
            i+=2;
        }
		else{
			flags.push(false);
		}
	}
	flags.push(true);
}
function kill(pic){
	if(pic != null){
		pic.kill();
		pic == null;		
	}
}
function killCell(cell){
	if(cell != null){
		var i = cell.i1;
		var j = cell.j1;
		destroy(board[i][j].letter);
		kill(board[i][j]);
		board[i][j] = null;
	}
}
function killCellsWithPoints(){
	for(var i = 0 ; i < sets.length ; i++){
		for(var j = 0 ; j < sets[i].length ; j++){
			var cell = sets[i][j][0];
            var letterMissing = false;
			if(isItsPoints(board[cell.i1][cell.j1]) == false){
//				letterMissing = addLetterToPasuk(cell.char);
			}
            addPointToCell(board[cell.i1][cell.j1],getMatchPoints(sets[i][j],sets[i].length),true);
		}
	}
}
function getMatchPoints(argSet,setLength,inPasuk){
    var sumPoints = 0;
    var bonus = 1;
    if(inPasuk){bonus = 2;}
    switch(argSet[1]){
        case 'color':
            return POINTS*(setLength-2)*bonus;
        case 'letter':
            return POINTS*(setLength)*bonus;
        case 'word':
            return POINTS*(setLength+1)*bonus;
        default:
            return POINTS;
    }
}
function isTheSetIsInPasuk(set){
    var isInPasuk = false;
    var words = getPasukSplited();
    for(var i = 0 ; i < words.length && isInPasuk == false ; i++){
        var isInPasuk = true;
        if(set.length == words[i].length){
            for(var j = 0 ; j < set.length && isInPasuk ; j++){
               if(set[j][0].char != words[i][j]){
                   isInPasuk = false;
               }
            }
        }
    }
//    alert(isInPasuk == true);
    return false;//isInPasuk;
}
function killPair(){
	if(pair != null){
		kill(pair[0].selectedImg);
		kill(pair[1].selectedImg);		
	}
}
function lowerCase(letter){
	if(letter == 'ץ')
		return 'צ';
	else if(letter == 'ם')
		return 'מ';
	else if(letter == 'ף')
		return 'פ';
	else if(letter == 'ן')
		return 'נ';
	else if(letter == 'ך')
		return 'כ';
	return letter;

}

function nothing(){}
function playPoints(){
	if(WAIT_POINTS_TIME < game.time.now){
		WAIT_POINTS_TIME = game.time.now + RESIZE_POINTS_TIME;
		var isDead = true;
					if(resizePoints() == false){
						isDead = false;
					}
		return isDead;
	}
	else{
		return false;
	}
}
function putSelectedCell(cell){
	if(cell.selectedImg != null){
		kill(cell.selectedImg);
	}
	cell.selectedImg = game.add.sprite(cell.x1,cell.y1,'selectedCell',0);
}
function putSetsTogether(sets1,sets2){
	for(var i = 0 ; i < sets2.length ; i++){
		sets1.push(sets2[i]);
	}
	return sets1;
}
function switchIJ(cell1,cell2){
	var i = cell1.i1;
	var j = cell1.j1;
	setIJ(cell1,cell2.i1,cell2.j1);
	setIJ(cell2,i,j);
}
function turnKillCellToPoints(cell){
	addPointToCell(board[cell.i1][cell.j1],cell.pointsText.getText());
}
function updateScoreLable(){
	scoreLable.setText(":ניקוד\n"+score);
}
function removeSelectedCell(cell){
	kill(cell.selectedImg);
}
function removeSets(){
	if(sets == null){
		return true;
	}
	if(sets.length > 0){
		if(killCellsWithPoints() == false){
			return false;
		}
		else{
			sets = null;
			return true;
		}
	}
	else{
		sets = null;
		return true;
	}
}
function resizePoints(){
	var nextIndexStyle = getPointsStyleFromBoard() + 1;
	if(nextIndexStyle == 0){
		return true;
	}
	if(nextIndexStyle >= RESIZE_POINTS_STYLES.length){
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j] != null){
					if(isItsPoints(board[i][j])){
						killCell(board[i][j]);						
					}
				}
			}
		}
		return true;
	}
	else{
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(isItsPoints(board[i][j])){
					board[i][j].indexStyle = nextIndexStyle;
					board[i][j].letter.setStyle(RESIZE_POINTS_STYLES[nextIndexStyle]);
				}
			}
		}
		return false;		
	}
}

function killBoard(){
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            killCell(board[i][j]);
        }
    }
}

function killEverythingToExitState(){
//     kill(backOn);
//    kill(backOff);
    killBoard();
    destroy(stepsLabel);
    destroy(pasukLabel);
    destroy(scoreLable);
    destroy(levelLable);
    kill(hideBackground);
    kill(winnerPic);
    kill(gameBackground);
//     toysGroup = null, toysArray = null;
    kill(hideBackground);
// pasukMatrix = null;
}
function addLettersToArray(type){
    switch(type){
        case 'pasuk once':
            for(var i = 0 ; i < pasuk.length ; i++){
                if(isLetter(pasuk[i])){
                    lettersArray.push(getLowerCase(pasuk[i]));
                }
            }
            break;
        case 'pasuk twice':
            for(var i = 0 ; i < pasuk.length ; i++){
                if(isLetter(pasuk[i])){
                    lettersArray.push(getLowerCase(pasuk[i]));
                    lettersArray.push(getLowerCase(pasuk[i]));
                }
            }
            break;
        case '3 verbs':
            lettersArray.push('ו');
            lettersArray.push('ה');
            lettersArray.push('י');
            break;
        case 'array twice':
            for(var i = 0 ; i < lettersArray.length ; i++){
                lettersArray.push(lettersArray[i]);
            }
    }
}
function isLetter(letter){
    return (letter != ' ' && letter != '-' && letter != '\n' && letter != '\'');
}
