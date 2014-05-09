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
var jokerActivated = null;
var SHOW_PASUK_LOC_X = 850;
var showPasukImg;
var showPasukImgClicked;
var toShowFullPasuk;
var startedShowPasuk;
var endShowPasukTime;
var SHOW_PASUK_TIME = 2;
var startedResizePoints;
var endShowPointsTime;
var SHOW_POINTS_TIME = 0.3;
var endTurnTime;
var TURN_TIME = 0.3;
var clickedHint;
var hintImg;
var initializedSteps;
var lettersArrayIndex;
var pasukArrayIndex;
var pasukArray;
var END_WIDTH = 615;
var END_HEIGHT = 225;
var endTimeInterval;
var endLabel = null;
var firstTimeAngle = true;
var isStartedTurn = false;
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
var style = { font: "30pt Arial", fill: "Blue", stroke: "White", strokeThickness: 2 };
var PASUK_STYLE = { font: "22pt Courier", fill: "#000000", stroke: "#004444", strokeThickness: 2 ,align: "center"};
var STEPS_STYLE = { font: "28pt Arial", fill: "Red", stroke: "Blue", strokeThickness: 1 };
var LEVEL_STYLE = { font: "28pt Arial", fill: "Yellow", stroke: "Blue", strokeThickness: 1 };
var SCORE_STYLE = { font: "28pt Arial", fill: "Purple", stroke: "Blue", strokeThickness: 1 };
var NUM_ROWS = 7, NUM_COLUMNS = 12;
var CELL_SIZE = 50;
var countAngle = 0;
var levelClicked = 1;
var board = [];
var isCalledSwapping = false;
var steps = 30, ANGLE_CONST = 20;
var sets = null;
var startedFill = false;
var cellsToMove = null;
var stepsLabel = null;
var COLORS_ARRAY = ['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','Orange'];//,'Black'];
var LETTERS_ARRAY = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
var CONST_LETTERS_ARRAY = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
var lettersArray = LETTERS_ARRAY;
//var LETTERS_ARRAY = ['l','o','v','e','q','a','z','w','s','x','e','d','c','r','f','v','t','g','b','y','h','n','u','j','m','i','k','o','l','p'];
var pasuk = "בראשית ברא א-לוהים את השמיים ואת הארץ";
var pasukLabel = null;
var flags = null, NUM_CHARS_IN_LINE = 45;
var isBringingUp= false;
var CELL_SPACE = 3;
var BOARD_WIDTH = NUM_COLUMNS*(CELL_SIZE+CELL_SPACE)-CELL_SPACE;
var BRING_UP_TIME = 0.4;
var BOARD_HEIGHT = NUM_ROWS*(CELL_SIZE+CELL_SPACE)-CELL_SPACE;
var cellState = 'turnAngle', stateI = 'first';
var prevCellClick = null;
var isAllCancle = false;
var SWAP_TIME = 0.4,FALL_TIME = 0.14,RESIZE_POINTS_TIME = 40,WAIT_POINTS_TIME = 0;
var cellClicked = null;
var doneKilling = true;
var saveTime = 0;
var toysGroup = null, toysArray = null;
var dragEnabled = false;
var hideBackground = null;
var BOARD_LOCATION_X = (CELL_SIZE+CELL_SPACE)*4,BOARD_LOCATION_Y = (CELL_SIZE+CELL_SPACE)*2;
var HINT_LOC_X = 20;
var HINT_LOC_Y = 470;
var pasukMatrix = null;
var once = false;
var RESIZE_POINTS_STYLES = [
{ font: "40px Arial", fill: 'Purple', stroke: "#ffffff", strokeThickness: 1,  align: "center"},
{ font: "39px Arial", fill: 'Purple', stroke: "#eeeeee", strokeThickness: 1,  align: "center"},
{ font: "38px Arial", fill: 'Purple', stroke: "#dddddd", strokeThickness: 1,  align: "center"},
{ font: "37px Arial", fill: 'Purple', stroke: "#cccccc", strokeThickness: 1,  align: "center"},
{ font: "36px Arial", fill: 'Purple', stroke: "#bbbbbb", strokeThickness: 1,  align: "center"},
{ font: "35px Arial", fill: 'Purple', stroke: "#aaaaaa", strokeThickness: 1,  align: "center"},
{ font: "34px Arial", fill: 'Purple', stroke: "#999999", strokeThickness: 1,  align: "center"},
{ font: "32px Arial", fill: 'Purple', stroke: "#888888", strokeThickness: 1,  align: "center"},
{ font: "30px Arial", fill: 'Purple', stroke: "#777777", strokeThickness: 1,  align: "center"},
{ font: "28px Arial", fill: 'Purple', stroke: "#666666", strokeThickness: 1,  align: "center"},
{ font: "25px Arial", fill: 'Purple', stroke: "#555555", strokeThickness: 1,  align: "center"},
{ font: "22px Arial", fill: 'Purple', stroke: "#444444", strokeThickness: 1,  align: "center"},
{ font: "19px Arial", fill: 'Purple', stroke: "#333333", strokeThickness: 1,  align: "center"},
{ font: "16px Arial", fill: 'Purple', stroke: "#222222", strokeThickness: 1,  align: "center"},
{ font: "12px Arial", fill: 'Purple', stroke: "#111111", strokeThickness: 1,  align: "center"},
{ font: "8px Arial", fill: 'Purple', stroke: "#000000", strokeThickness: 1,  align: "center"}
              ];

var shopState = {
		preload: function() {

            showPasukImg = null;
            showPasukImgClicked = null;
            toShowFullPasuk = false;
            startedShowPasuk = false;
            endShowPasukTime = 0;
            startedResizePoints = false;
            clickedHint = null;
    endShowPointsTime = 0;
            pasukArray = [];
    lettersArrayIndex = 0;
    pasukArrayIndex = 0;
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
     endLabel = null;
     endTurnTime = 0;
     isStartedTurn = false;
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
    CONST_LETTERS_ARRAY = mixArray(CONST_LETTERS_ARRAY);
    gameBackground = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    hideBackground = game.add.sprite(0, 0, 'background'); //tileSprite(0, 0, game.world.width, (game.world.height - BOARD_HEIGHT)/2 - CELL_SPACE, 'background');
    hideBackground.cropEnabled = true;
    hideBackground.crop.width = game.world.width - 200;
    hideBackground.crop.height = (game.world.height - BOARD_HEIGHT)/2 - CELL_SPACE;
    hideBackground.crop.x = 200;
    hideBackground.x = 200;
	pasuk = allPsukim[chapterIndex-1][(levelClicked-1)];
	steps = parseInt(3*Math.sqrt(pasuk.length) - levelClicked/2 - chapterIndex);
    if(steps < pasuk.length/3.5){
        steps = parseInt(pasuk.length/4 + 5);
    }
//	steps = parseInt(3.5*Math.sqrt(pasuk.length) - levelClicked/2);
//    if(steps < pasuk.length/3.5){
//        steps = parseInt(pasuk.length/3.5);
//    }
    initializedSteps = steps;
	cutPasuk(10);
	levelLable = game.add.text(20,240,":שלב \n"+levelClicked,LEVEL_STYLE);
//	setUndoButton(true);
	scoreLable = game.add.text(20,90,":ניקוד \n"+score, SCORE_STYLE);
//	scoreLable.anchor.setTo(0.5,0.5);
	createCells();
    removeSetsInBeginning();
	initialFlags();
//    addLettersToArray('array twice');
    addLettersToArray('pasuk twice');
    putPasukLettersToArray();
//	createToys();
    hintImg = game.add.sprite(HINT_LOC_X,HINT_LOC_Y,'hint');
    enableClick(hintImg,activeHint);
    showPasukImg = game.add.sprite(SHOW_PASUK_LOC_X,HINT_LOC_Y,'showPasuk');
    enableClick(showPasukImg,showPasukClick);
	setBeckgoundToTop();
}, 

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
    case 'showPasukClick':
        showPasukClick();
            break;
    case 'winner':
        cancleAll();
        displayWinnerMessage();
        break;
    case 'looser':
        cancleAll();
        displaySorryMessage();
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
    killPair();
	stateI = 'cellClick';
	if(prevCellClick == null){
		prevCellClick = cell;
		stateI = 'null';
		cellState = 'checkSwap';
		killPair();
		putSelectedCell(prevCellClick);
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
                prevCellClick = cell;
                stateI = 'null';
                cellState = 'checkSwap';
                killPair();
                putSelectedCell(prevCellClick);
                enableAll();
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
            checkPair();
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
}
var didCheckPasuk = false;
function showPasukClick(){
    if(score >= 1000 && didCheckPasuk == false){
        stateI = 'showPasukClick';
        didCheckPasuk = true;
        return false;
    }
    else if(didCheckPasuk == false){
        return true;
    }
    if(startedShowPasuk == false){
        cancleAll();
        startedShowPasuk = true;
        toShowFullPasuk = true;
        endShowPasukTime = game.time.now + SHOW_PASUK_TIME*TIME_INTERVAL;
        showPasukImgClicked = game.add.sprite(SHOW_PASUK_LOC_X,HINT_LOC_Y,'showPasukClicked');
        score -= 1000;
        updateScoreLable();
        setBeckgoundToTop();
        return false;
    }
    else if(endShowPasukTime > game.time.now){
        //nothing
        return false;
    }
    else {
        toShowFullPasuk = false;
        kill(showPasukImgClicked);
        enableAll();
        setBeckgoundToTop();
        startedShowPasuk = false;
        didCheckPasuk = false;
        stateI = 'null';
    }
}
function activeHint(){
    if(pair == null && score >= 100){
        clickedHint = game.add.sprite(HINT_LOC_X,HINT_LOC_Y,'hintClicked');
        score -= 100;
        updateScoreLable();
        pair = getPair();
        if(pair != null){
            putSelectedCell(pair[0]);
            putSelectedCell(pair[1]);
        }
        else{
            alert("there is no more moves! :(")
            //TODO:!!!
        }
    }
}
function checkPair(){
    var pair = getPair();
    if(pair == null){
        alert('there is no more moves :(')
    }
}
function fillUp(){
	if(cellsToMove == null && startedFill == false){
		startedFill = true;
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
        fixBoard();
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
	if(setAngleOfSets1(sets) == false);
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
		else{
            setGameIfGameOver();
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
                fixCellBodyLocation(board[i][j]);
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
function getJokerSets(vectors,getAll){
    if(jokerActivated == null){
        return [];
    }
    var sets = [];
    if(isJoker(jokerActivated[0]) == true){
        if(isJoker(jokerActivated[1]) == true){
            for(var i = 0 ; i < NUM_ROWS ; i++){
                for(var j = 0 ; j < NUM_COLUMNS ; j++){
                    sets.push([[board[i][j],'?']]);
                }
            }
        }
        else{//the cell2 is not joker
            var character = jokerActivated[1].char;
            for(var i = 0 ; i < NUM_ROWS ; i++){
                for(var j = 0 ; j < NUM_COLUMNS ; j++){
                    if(board[i][j].char == character){
                        sets.push([[board[i][j],'?']]);
                    }
                }
            }
            sets.push([[jokerActivated[0],'?']]);
        }
    }
    else{//the cell1 is not joker
        var character = jokerActivated[0].char;
        for(var i = 0 ; i < NUM_ROWS ; i++){
            for(var j = 0 ; j < NUM_COLUMNS ; j++){
                if(board[i][j].char == character){
                    sets.push([[board[i][j],'?']]);
                }
            }
        }
        sets.push([[jokerActivated[1],'?']]);
    }
    return sets;
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

function getRandomCell(i,j,letter,color){
	var x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
	var y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
	var cell = game.add.sprite(x,y,'cell',0);
	cell.i1 = i;
	cell.j1 = j;
	cell.endAnimation = 0;
	cell.x1 = x;
	cell.y1 = y;
    if(letter == null){
        var randomLetter = parseInt(Math.random()*LETTERS_ARRAY.length);
        if(initializedSteps - steps >= levelClicked/2 && pasukArrayIndex < pasukArray.length){
            cell.char = pasukArray[pasukArrayIndex];
            pasukArrayIndex++;
        }
        else if(steps % 3 == 0){
            cell.char = CONST_LETTERS_ARRAY[lettersArrayIndex];
            lettersArrayIndex++;
            if(lettersArrayIndex == CONST_LETTERS_ARRAY.length){
                CONST_LETTERS_ARRAY = mixArray(CONST_LETTERS_ARRAY);
                lettersArrayIndex = 0;
            }
        }
        else{
            cell.char = LETTERS_ARRAY[randomLetter];
        }
    }
    else{
        cell.char = letter;
    }
    var styleC = null;
    if(color == null){
        var randomColor = parseInt(Math.random()*COLORS_ARRAY.length);
        cell.color = randomColor;
	    styleC = { font: "70px Miriam Fixed", fill: COLORS_ARRAY[randomColor], stroke: "White", strokeThickness: 3, align: "center"};
    }
    else{
        cell.color = -1;
        styleC = { font: "70px Miriam Fixed", fill: color, stroke: "White", strokeThickness: 3, align: "center"};
    }
	cell.letter = game.add.text(x+CELL_SIZE/2,y+CELL_SIZE/2,cell.char, styleC);
	cell.letter.anchor.setTo(0.5,0.5);
	cell.indexStyle = 0;
    cell.points = 0;
	return cell;
}
function putPasukLettersToArray(){
    pasukArray = [];
    for(var i = 0 ; i < pasuk.length ; i++){
        if(pasuk[i] != ' ' && pasuk[i] != '-' && pasuk[i] != '\n' && pasuk[i] != '\''){
            pasukArray.push(getLowerCase(pasuk[i]));
        }
    }
    //TODO: need to merge it
    var x, y,temp;
    var len = pasukArray.length;
//    pasukArray.merge(0,len);
    for(var i = 0 ; i < len ; i++){
        x = parseInt(Math.random()*len);
        y = parseInt(Math.random()*len);
//        alert(x+","+y);
        temp = pasukArray[x];
        pasukArray[x] = pasukArray[y];
        pasukArray[y] = temp;
    }
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
    if(getAll == false && sets.length > 0){
        return sets;
    }
    sets = putSetsTogether(sets,getJokerSets(vectors,getAll));
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
    var cell;
//    if(isStartedTurn == false){
        if(sets.length == 0){
            return true;
        }
//        isStartedTurn = true;
//        for(var i = 0 ; i < sets.length ; i++){
//            for(var j = 0 ; j < sets[i].length ; j++){
//                cell = sets[i][j][0];
//                board[cell.i1][cell.j1].endAnimation = game.time.now + TURN_TIME;
//            }
//        }
//    }
//    else{
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                cell = sets[i][j][0];
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
//    }
}
function setAngleOfSets1(sets){
    var cell;
    var angle;
    if(isStartedTurn == false){
        if(sets.length == 0){
            return true;
        }
        isStartedTurn = true;
        endTurnTime = game.time.now + TURN_TIME*TIME_INTERVAL;
        return false;
    }
    else if(endTurnTime > game.time.now){
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                cell = sets[i][j][0];
                angle = (endTurnTime - game.time.now)*360/(TURN_TIME*TIME_INTERVAL);
    //            alert(sets[i][j][0]);//+','+sets[i][j][1]);
                board[cell.i1][cell.j1].letter.angle = angle;
            }
        }
        return false;
    }
    else{
        for(var i = 0 ; i < NUM_ROWS ; i++){
            for(var j = 0 ; j < NUM_COLUMNS ; j++){
                board[i][j].letter.angle = 0;
            }
        }
        isStartedTurn = false;
        return true;
    }
}
function getPasukText(){
	var pasukText = "";
    if(toShowFullPasuk == true){
        return pasuk;
    }
    else{
        for(var i = 0 ; i < pasuk.length ; i++){
            if(flags[i] == true){
                pasukText += pasuk[i];
            }
            else{
                pasukText += '_';
            }
        }
    }
    return pasukText;
}
function setBeckgoundToTop(){
	hideBackground.bringToTop();
    destroy(pasukLabel);
	pasukLabel = game.add.text(game.world.width/2,5,getPasukText(),PASUK_STYLE);
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

function winAndExit(){
        score += steps*1000;

}

function setGameIfGameOver(){
	if(isPasukFull() && toShowFullPasuk == false){
        stateI = 'winner';
	}
	else if(steps <=0){
        stateI = 'looser';
	}
    else{
        cancleState();
    }
	return true;
}
function displayWinnerMessage() {
    if(endLabel == null){
        score += steps*1000;
        updateScoreLable();
        $.get( "../submit-level/?score=" + score.toString(), function( data ) {
            console.log('Your score is: ' + score + " to ../submit-level/?score=" + score);
        });
        var levelSplit = [];
        if(levels != "") {
            levelSplit = levels.split(",");
        }

        if(levelSplit.length == levelClicked - 1){
            if (levels != "") {
                levels = levels + "," + score.toString();
            } else {
                levels = score.toString();
            }
        }
        else{
            if(levelSplit.length == 0){
                levels = score.toString();
            }
            if(levelSplit[levelClicked - 1] < score){
                levelSplit[levelClicked - 1] = score.toString();
                levels = levelSplit[0].toString();
                for(var i = 1 ; i < levelSplit.length ; i++){
                    levels = levels + "," + levelSplit[i];
                }
            }
        }
        console.log("levels:" + levels);
        currentLevel = levels.split(',').length;
        console.log("levels have been updated: " + levels);
        var endTime = 2;
        endLabel = game.add.sprite((GAME_WIDTH-END_WIDTH)/2,-END_HEIGHT,'winner');
        game.add.tween(endLabel).to({y: (GAME_HEIGHT-END_HEIGHT)/2}, endTime*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
        endLabel.endAnimation = game.time.now + endTime*TIME_INTERVAL;
    }
    else if(endLabel.endAnimation > game.time.now){

    }
    else{
        killEverythingToExitState();
        game.state.start('chooseGameState', true, true);
    }
}
function displaySorryMessage() {
    if(endLabel == null){
        $.get( "../leave-level/", function( data ) {
            // do nothing
        });
        var endTime = 2;
        endLabel = game.add.sprite((GAME_WIDTH-END_WIDTH)/2,-END_HEIGHT,'looser');
        game.add.tween(endLabel).to({y: (GAME_HEIGHT-END_HEIGHT)/2}, endTime*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
        endLabel.endAnimation = game.time.now + endTime*TIME_INTERVAL;
    }
    else if(endLabel.endAnimation > game.time.now){

    }
    else{
        killEverythingToExitState();
        game.state.start('chooseGameState', true, true);
    }
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
    var x,y;
	for(var i = 0 ; i < NUM_ROWS ; i++){
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
            x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
            y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
            board[i][j].letter.x = x + CELL_SIZE/2;
			board[i][j].letter.y = y + CELL_SIZE/2;
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
		var destPic = (i+numEmptyRowsUnder)*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y - 10;//cells[i].body.y + numEmptyRowsUnder*(CELL_SPACE+CELL_SIZE);
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
function isJoker(cell){
    return (cell.char == '?');
}
function isCanSwap(cell1,cell2){
	if(isNextToEachOther(cell1,cell2) == false){
		return false;
	}
    if(isJoker(cell1) || isJoker(cell2)){
        jokerActivated = [cell1,cell2];
        return true;
    }
    else{
        fakeSwap(cell1,cell2);
        if(isThereSets()){
            fakeSwap(cell1,cell2);
            return true;
        }
        fakeSwap(cell1,cell2);
        return false;
    }
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
        jokerActivated = null;
		return true;
	}
	
}
function cancleAll(){
	if(isAllEnabled){
		isAllEnabled = false;
        cancleClick(hintImg);
        cancleClick(showPasukImg)
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
function dragAndSwap(i1,j1,i2,j2){
	if(isIndexesInBoard(i2,j2) && isIndexesInBoard(i1,j1)){
		prevCellClick = board[i1][j1];
		cellClick(board[i2][j2]);
	}	
}function enableAll(){
	if(isAllEnabled == false){	
		isAllEnabled = true;
        enableClick(hintImg,activeHint);
        enableClick(showPasukImg,showPasukClick);
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j]!=null){
                    fixCellBodyLocation(board[i][j]);
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
    var i = cell.i1;
    var j = cell.j1;
    var x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
    var y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
    board[i][j].x1 = x;
    board[i][j].body.x = x;
    board[i][j].y1 = y;
    board[i][j].body.y = y;
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
        if(sets[i].length >= 5){
            var cell = sets[i][2][0];
            sets[i][2] = null;
            killCell(cell);
            board[cell.i1][cell.j1] = getRandomCell(cell.i1,cell.j1,'?','Black');
        }
        for(var j = 0 ; j < sets[i].length ; j++){

        }
    }
	for(var i = 0 ; i < sets.length ; i++){
		for(var j = 0 ; j < sets[i].length ; j++){
            if(sets[i][j] != null){
                var cell = sets[i][j][0];
                addPointToCell(board[cell.i1][cell.j1],getMatchPoints(sets[i][j],sets[i].length),true);
            }
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
        case '?':
            return POINTS*10;
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
    kill(clickedHint);
    pair = null;
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
function putSelectedCell(cell){
	if(cell.selectedImg != null){
		kill(cell.selectedImg);
	}
	cell.selectedImg = game.add.sprite(cell.x1,cell.y1 - 2,'selectedCell',0);
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
function playPoints(){
    var indexStyle;
    if(startedResizePoints == false){
        startedResizePoints = true;
        endShowPointsTime = game.time.now + SHOW_POINTS_TIME*TIME_INTERVAL;
        return false;
    }
    else if(endShowPointsTime > game.time.now){
        indexStyle = parseInt(((endShowPointsTime - game.time.now)/(SHOW_POINTS_TIME*TIME_INTERVAL))*RESIZE_POINTS_STYLES.length);
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(isItsPoints(board[i][j])){
					board[i][j].indexStyle = indexStyle;
					board[i][j].letter.setStyle(RESIZE_POINTS_STYLES[indexStyle]);
				}
			}
		}
		return false;
    }
    else{
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j] != null){
					if(isItsPoints(board[i][j])){
						killCell(board[i][j]);
					}
				}
			}
		}
        startedResizePoints = false;
		return true;
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
    kill(endLabel);
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
function getMissingLetters(){
    var randomIndexLetter = parseInt(Math.random()*CONST_LETTERS_ARRAY.length);
    var i = randomIndexLetter;
    for(; i < CONST_LETTERS_ARRAY ; i++){
        if(isLetterInBoard(CONST_LETTERS_ARRAY[i]) == false){
            return CONST_LETTERS_ARRAY[i];
        }
    }
    for(i = 0 ; i < randomIndexLetter ; i++){
        if(isLetterInBoard(CONST_LETTERS_ARRAY[i]) == false){
            return CONST_LETTERS_ARRAY[i];
        }
    }
    return null;
}
function isLetterInBoard(letter){
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            if(letter == board[i][j].char){
                return true;
            }
        }
    }
    return false;
}
function mixArray(array){
    var x, y,temp;
    for(var i = 0 ; i < array.length ; i++){
        x = parseInt(Math.random()*array.length);
        y = parseInt(Math.random()*array.length);
        temp = array[x];
        array[x] = array[y];
        array[y] = temp;
    }
    return array;
}