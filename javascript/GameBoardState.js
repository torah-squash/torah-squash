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
var isDvir = false;
var timerPair = null;
var timer = 0;
var perekLabel = null;
var srcPasukLocation = 0;
var isThereAnyPair = true;
var SELECTED_ANGLE = 5;
var pasukSplited = null;
var doneOnThisStep = 0;
var missingLetter;
var jokerActivated = null;
var SHOW_PASUK_LOC_X = 880;
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
var levelLabel = null;
var sets = null;
var THRESHOLD = 10;
var globalEndAnimation = 0;
var POINTS = 20,score = 0,scoreLabel = null;
var isAllEnabled = false;
var pair = null;
var backOn = null,backOff = null;
var style = { font: "30pt Arial", fill: "Blue", stroke: "White", strokeThickness: 2 };
var PASUK_STYLE = { font: "22pt Courier", fill: "#000000", stroke: "#004444", strokeThickness: 2 ,align: "center", textAlign: "RTL"};
var STEPS_STYLE = { font: "28pt Arial", fill: "Red", stroke: "Blue", strokeThickness: 1 };
var LEVEL_STYLE = { font: "28pt Arial", fill: "Yellow", stroke: "Blue", strokeThickness: 1 };
var PEREK_STYLE = { font: "28pt Arial", fill: "Blue", stroke: "Blue", strokeThickness: 1 };
var SCORE_STYLE = { font: "28pt Arial", fill: "Purple", stroke: "Blue", strokeThickness: 1 };
var NUM_ROWS = 7, NUM_COLUMNS = 12;
var CELL_SIZE = 50;
var countAngle = 0;
var levelClicked = 1;
var board = [];
var isCalledSwapping = false;
var steps = 30, ANGLE_CONST = 20;
var startedFill = false;
var cellsToMove = null;
var stepsLabel = null;
var COLORS_ARRAY = ['#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','Orange'];//,'Black'];
var LETTERS_ARRAY = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
var CONST_LETTERS_ARRAY = "דבירגילאור";
var mixedLettersArray = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
var lettersArray = LETTERS_ARRAY;
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
var SWAP_TIME = 0.4,FALL_TIME = 0.12,RESIZE_POINTS_TIME = 40,WAIT_POINTS_TIME = 0;
var cellClicked = null;
var doneKilling = true;
var saveTime = 0;
var toysGroup = null, toysArray = null;
var dragEnabled = false;
var hideBackground = null;
var BOARD_LOCATION_X = (CELL_SIZE+CELL_SPACE)*4,BOARD_LOCATION_Y = (CELL_SIZE+CELL_SPACE)*2 + 10;
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

function initVariablesBoardState() {
    timer = 0;
    timerPair = null;
    perekLabel = null;
    srcPasukLocation = 0;
    isThereAnyPair = true;
    pasukSplited = null;
    helpIndex = 0;
    doneOnThisStep = 0;
    missingLetter = null;
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
    score = 0,scoreLabel = null;
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
    levelLabel = null;
    gameBackground = null;
}

function getCellByPosition(pos) {
    console.log('here');
    for (var i = 0 ; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (pos.x >= board[i][j].letter.x && pos.x <= board[i][j].letter.width
                && pos.y >= board[i][j].letter.y && pos.y <= board[i][j].letter.height) {
                alert('click on letter: ' + board[i][j].char);
                return cell;
            }
            // TODO check if inside
        }
    }
    return null;
}

var board = {
    preload: function() {
        initVariablesBoardState();
    },

    preloadState: function() {
        game.load.image('backOn', 'images/back_on.png');
        game.load.image('backOff', 'images/back_Off.png');

        game.load.image('cell','images/empty-cell.png');
        game.load.image('selectedCell','images/selected_cell2.png');
        game.load.image('winner','images/well_done.png');
        game.load.image('looser','images/failed.png');
        game.load.image('hint','images/hint.png');
        game.load.image('hintClicked','images/hint_clicked.png');
        game.load.image('showPasuk','images/show_pasuk.png');
        game.load.image('showPasukClicked','images/show_pasuk_clicked.png');
        game.load.image('!','images/shofar.png');
        game.load.image('#','images/rimon.png');
        game.load.image('?','images/sevivon.png');
    },

    create: function() {
        mixedLettersArray = mixArray(mixedLettersArray);
        gameBackground = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        hideBackground = game.add.sprite(0, 0, 'background');
        hideBackground.cropEnabled = true;
        hideBackground.crop.width = game.world.width - 200;
        hideBackground.crop.height = (game.world.height - BOARD_HEIGHT)/2 - CELL_SPACE;
        hideBackground.crop.x = 200;
        hideBackground.x = 200;
        pasuk = allPsukim[chapterIndex-1][(levelClicked-1)];
        var countChars = pasuk.length - countExtraSpace(pasuk);
        steps = parseInt(2.7*Math.sqrt(countChars) - levelClicked/2 - chapterIndex);
        if(steps < countChars/4){
            steps = parseInt(countChars/4 + 5);
        }
        splitPasuk();
        initializedSteps = steps;
        cutPasuk(10);
        var pasukstr = "'"+"פסוק "+getHebrewIndexString(levelClicked);
        perekLabel = game.add.text(20,240,getHebrewChapterString(chapterIndex) + "\n" + pasukstr,LEVEL_STYLE);
        scoreLabel = game.add.text(20,90,":ניקוד \n"+score, SCORE_STYLE);
        createCells();
        removeSetsInBeginning();
        moveTheBoardToTopOfGame();
        initialFlags();
        addLettersToArray('pasuk twice');
        putPasukLettersToArray();
        hintImg = game.add.sprite(HINT_LOC_X,HINT_LOC_Y, 'hint');
        enableClick(hintImg,activeHint);
        showPasukImg = game.add.sprite(SHOW_PASUK_LOC_X, HINT_LOC_Y, 'showPasuk');
        enableClick(showPasukImg,showPasukClick);
        setUndoButton(true);
        setBeckgoundToTop();
        bar.showButtons([bar.EXIT, bar.RETURN], [
            bar.EXIT_FROM_LEVEL, bar.RETURN_FROM_LEVEL_TO_MAP]);
    },

    update: function() {
        if(globalEndAnimation < game.time.now){// || stateI == 'winner'){
            turnSelected();
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
            case 'null':
                if(isDvir == true){
                    enableClick(hintImg,activeHint);
                    timerPair = getPerfectPair();
                    prevCellClick = timerPair[0];
                    cellState = 'checkSwap';
                    cellClick(timerPair[1]);
                }
            }
            once = false;
        }
    }
};

var failSwapAudio = new Audio('../music/swapfailed.mp3');

function ____MAIN____(){}
function cellClick(cell){
    help(cell);
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
//				setBeckgoundToTop();
				cellState = 'swap';
			}
			else{
                //
                if (isNextToEachOther(prevCellClick,cell)) {
                    failSwapAudio.currentTime=0;
                    failSwapAudio.play();
                }
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
    if (didCheckPasuk == false && score < MIN_SHOW_PASUK_POINTS) {
        cancleAll();
        popups.setMessage(popups.NOT_ENUGHT_POINTS_FOR_SHOW_VERSE);
        popups.setOptions(['אוקי'], [function() {
            enableAll();
            popups.CLOSE_HENDLER();
        }]);
        popups.show();
        return false;
    }
    else if(score >= MIN_SHOW_PASUK_POINTS && didCheckPasuk == false){
        stateI = 'showPasukClick';
        didCheckPasuk = true;
        return false;
    }

    if(startedShowPasuk == false && stateI == 'showPasukClick'){
        cancleAll();
        startedShowPasuk = true;
        toShowFullPasuk = true;
        globalEndAnimation = game.time.now + SHOW_PASUK_TIME*TIME_INTERVAL;
        showPasukImgClicked = game.add.sprite(SHOW_PASUK_LOC_X,HINT_LOC_Y,'showPasukClicked');
        score -= MIN_SHOW_PASUK_POINTS;
        updateScoreLable();
        setBeckgoundToTop();
        srcPasukLocation = pasukLabel.y;
        game.add.tween(pasukLabel).to({y: BOARD_LOCATION_Y/2}, SHOW_PASUK_TIME*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
        return false;
    }
    else if(srcPasukLocation > 0){
        game.add.tween(pasukLabel).to({y: srcPasukLocation}, SHOW_PASUK_TIME*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
        globalEndAnimation = game.time.now + SHOW_PASUK_TIME*TIME_INTERVAL;
        srcPasukLocation = 0;
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

//function showPasukClick(){
//    if (didCheckPasuk == false && score < 1000) {
//        cancleAll();
//        popups.setMessage(popups.NOT_ENUGHT_POINTS_FOR_SHOW_VERSE);
//        popups.setOptions(['אוקי'], [function() {
//            enableAll();
//            popups.CLOSE_HENDLER();
//        }]);
//        popups.show();
//        return false;
//    }
//    else if(score >= 1000 && didCheckPasuk == false){
//        stateI = 'showPasukClick';
//        didCheckPasuk = true;
//        return false;
//    }
//    if(startedShowPasuk == false && stateI == 'showPasukClick'){
//        cancleAll();
//        startedShowPasuk = true;
//        toShowFullPasuk = true;
//        endShowPasukTime = game.time.now + SHOW_PASUK_TIME*TIME_INTERVAL;
//        globalEndAnimation = endShowPasukTime;
//        showPasukImgClicked = game.add.sprite(SHOW_PASUK_LOC_X,HINT_LOC_Y,'showPasukClicked');
//        score -= 1000;
//        updateScoreLable();
//        setBeckgoundToTop();
//        return false;
//    }
//    else {
//        toShowFullPasuk = false;
//        kill(showPasukImgClicked);
//        enableAll();
//        setBeckgoundToTop();
//        startedShowPasuk = false;
//        didCheckPasuk = false;
//        stateI = 'null';
//    }
//}


function activeHint(){
    isDvir = false;
    if (pair == null && score < 100) {
        cancleAll();
        popups.setMessage(popups.NOT_ENUGHT_POINTS_FOR_HINT);
        popups.setOptions(['אוקי'], [function() {
            enableAll();
            popups.CLOSE_HENDLER();
        }]);
        popups.show();
        return false;
    } else if(pair == null && score >= 100) {
        clickedHint = game.add.sprite(HINT_LOC_X,HINT_LOC_Y,'hintClicked');
        score -= 100;
        updateScoreLable();
        pair = getPair();
        if(pair != null){
            putSelectedCell(pair[0]);
            putSelectedCell(pair[1]);
        } else{
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
	else{
		cellsToMove = null;
		startedFill = false;
		return true;
	}
}
var swapAudio = new Audio('../music/swap.mp3');
function swap(cell1, cell2){
	cancleAll();
//    swapAudio.play();
	if(isCalledSwapping == false){
		isCalledSwapping = true;
		saveTime = game.time.now;
        swapAudio.currentTime=0;
        swapAudio.play();
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
	else{
		switchIJ(cell1,cell2);
        switchXY(cell1,cell2);
		isCalledSwapping = false;
		return true;
	}
}
function switchXY(cell1,cell2){
    var x = board[cell1.i1][cell1.j1].x1;
    var y = board[cell1.i1][cell1.j1].y1;
    board[cell1.i1][cell1.j1].x1 = board[cell2.i1][cell2.j1].x1;
    board[cell1.i1][cell1.j1].y1 = board[cell2.i1][cell2.j1].y1;
    board[cell2.i1][cell2.j1].x1 = x;
    board[cell2.i1][cell2.j1].y1 = y;
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
	else {
		cellState = 'removeSets';
        if(isDvir) {
            enableClick(hintImg,activeHint);
        }
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
        if(getPair() == null){
            //theres no more moves!!!
            isThereAnyPair = false;
        }
		cellState = 'turnAngle';
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
				cells.push(getCell(k, j,'cell',true,null));
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
    if(isJoker(jokerActivated[0]) == true && isJoker(jokerActivated[1]) == true){
        for(var i = 0 ; i < NUM_ROWS ; i++){
            for(var j = 0 ; j < NUM_COLUMNS ; j++){
                sets.push([[board[i][j],'?']]);
            }
        }
    }
    else{
        var cell,joker;

        if(isJoker(jokerActivated[0]) == true){
            cell = jokerActivated[1];
            joker = jokerActivated[0];
        }
        else{
            cell = jokerActivated[0];
            joker = jokerActivated[1];
        }
        if(joker.picName == '!'){
            for(var i = 0 ; i < NUM_ROWS ; i++){
                sets.push([[board[i][joker.j1],'!']]);
            }
        }
        else if(joker.picName == '?'){
            for(var i = 0 ; i < NUM_ROWS ; i++){
                for(var j = 0 ; j < NUM_COLUMNS ; j++){
                    if(board[i][j].char == cell.char){
                        sets.push([[board[i][j],'?']]);
                    }
                }
            }
            sets.push([[joker,'?']]);
        }
        else if(joker.picName == '#'){
            var i = joker.i1;
            var j = joker.j1;
            for(var x = joker.i1 - 1; x <= joker.i1 + 1 ; x++){
                for(var y = joker.j1 - 1 ; y <= joker.j1 + 1 ; y++){
                    if(x >= 0 && y >= 0 && x < NUM_ROWS && y < NUM_COLUMNS){
                        sets.push([[board[x][y],'#']]);
                    }
                }
            }
        }
    }
    return sets;
}

function getColorSets(vectors,getAll){
	var sets = [];
	var set = [];
	for(var i = 0 ; i < vectors.length ; i++){
		set = [[vectors[i][0],'color']];
		for(var j = 1 ; j < vectors[i].length ; j++){
			if(set[0][0].color == vectors[i][j].color && isJoker(set[0][0]) == false){
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
			if(set[0][0].char == vectors[i][j].char && isJoker(set[0][0]) == false){
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
    return board.slice(0).concat(getTranspose());
}

function splitPasuk(){
    pasukSplited = [];
    var word = "";
    for(var i = 0 ; i < pasuk.length ; i++){
        if(pasuk[i] == ' '){
            pasukSplited.push(word);
            word = "";
        }
        else if(pasuk[i] != '-' && pasuk[i] != '\n' && pasuk[i] != '\''){
            word += pasuk[i];
        }
    }
    if(word.length > 0){
        pasukSplited.push(word);
    }
}
function getWordSets(vectors,getAll){//TODO!!!
	var sets = [];
	var set = [];
	var words = pasukSplited;
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
function setAngleOfSets1(sets){
    var cell;
    var angle;
    var ci,cj;
    if(isStartedTurn == false){
        if(sets.length == 0){
            return true;
        }
        isStartedTurn = true;
        endTurnTime = game.time.now + TURN_TIME*TIME_INTERVAL;
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                if(isJoker(sets[i][j][0])){
                    sets[i][j][0].body.x += CELL_SIZE/2;
                    sets[i][j][0].body.y += CELL_SIZE/2;
                    sets[i][j][0].anchor.setTo(0.5,0.5);
                }
            }
        }
        return false;
    }
    else if(endTurnTime > game.time.now){
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                cell = sets[i][j][0];
                ci = cell.i1;
                cj = cell.j1;
                angle = (endTurnTime - game.time.now)*360/(TURN_TIME*TIME_INTERVAL);
    //            alert(sets[i][j][0]);//+','+sets[i][j][1]);
                board[ci][cj].letter.angle = angle;
                board[ci][cj].angle = angle;
            }
        }
        return false;
    }
    else{
        for(var i = 0 ; i < NUM_ROWS ; i++){
            for(var j = 0 ; j < NUM_COLUMNS ; j++){
                board[i][j].letter.angle = 0;
                board[i][j].angle = 0;
            }
        }
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                if(isJoker(sets[i][j][0])){
                    sets[i][j][0].anchor.setTo(0,0);
                    sets[i][j][0].body.x -= CELL_SIZE/2;
                    sets[i][j][0].body.y -= CELL_SIZE/2;
                }
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
//	backOn.bringToTop();
//	backOff.bringToTop();
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
        var endTime = 2;
    if(endLabel == null){
        killJokersAndGetPoints();
        score += steps*1000;
        updateScoreLable();
        $.get( "../submit-level/?score=" + score.toString(), function( data ) {
            console.log('Your score is: ' + score + " to ../submit-level/?score=" + score);
        });
        var levelSplit = [];
        if(levels != "") {
            levelSplit = levels.split(",");
        }
        console.log(levelSplit.length +"."+levelCounter);
        if(levelSplit.length + 1 == levelCounter){
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
            if(levelSplit[levelCounter - 1] < score){
                levelSplit[levelCounter - 1] = score.toString();
                levels = levelSplit[0].toString();
                for(var i = 1 ; i < levelSplit.length ; i++){
                    levels = levels + "," + levelSplit[i];
                }
            }
        }
        console.log("levels:" + levels);
//        currentLevel = levels.split(',').length;
        console.log("levels have been updated: " + levels);
//        endLabel = game.add.sprite((GAME_WIDTH-END_WIDTH+END_WIDTH)/2,(GAME_HEIGHT-END_HEIGHT+END_HEIGHT)/2,'winner');
        explodeBoard(endTime);
        endLabel = game.add.sprite((GAME_WIDTH-END_WIDTH+END_WIDTH)/2,-END_HEIGHT,'winner');
        endLabel.anchor.setTo(0.5,0.5);
//        endLabel.scale.setTo(0.6);
        game.add.tween(endLabel).to({y: (GAME_HEIGHT-END_HEIGHT)/2}, endTime*TIME_INTERVAL, Phaser.Easing.Quadratic.in, true, 5, 0, false);
        endLabel.endAnimation = game.time.now + endTime*TIME_INTERVAL;
        if(globalEndAnimation < endLabel.endAnimation){
            globalEndAnimation = endLabel.endAnimation;
        }
    }
//    else if(globalEndAnimation > game.time.now){
//        turnAndResizeLabel(endLabel,(globalEndAnimation-game.time.now)/(endTime*TIME_INTERVAL));
//    }
    else{
        killEverythingToExitState();
        game.state.start('scoreTableState', true, true);
    }
}
function turnAndResizeLabel(pic,fraction){
    pic.angle = fraction*3*360;
    //    pic.scale.setTo(2);
}

function displaySorryMessage() {
    if(endLabel == null){
        $.get( "../leave-level/", function( data ) {
            // do nothing
        });
        var endTime = 2;
        endLabel = game.add.sprite((GAME_WIDTH-END_WIDTH)/2,-END_HEIGHT,'looser');
        game.add.tween(endLabel).to({y: (GAME_HEIGHT-END_HEIGHT)/2}, endTime*TIME_INTERVAL, Phaser.Easing.Quadratic.In, true, 5, 0, false);
        fallBoard(endTime);
        endLabel.endAnimation = game.time.now + endTime*TIME_INTERVAL;
        if(globalEndAnimation < endLabel.endAnimation){
            globalEndAnimation = endLabel.endAnimation;
        }
    }
    else{
        numLifes--;
        killEverythingToExitState();
        game.state.start('scoreTableState', true, true);
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
	board[cell.i1][cell.j1] = getCell(cell.i1,cell.j1,cell.picName,false,cell);
	game.add.tween(board[cell.i1][cell.j1].letter).to({y: destSpot}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
    var timing = time*TIME_INTERVAL + game.time.now;
	board[cell.i1][cell.j1].endAnimation = timing;
    if(globalEndAnimation < timing){
	    globalEndAnimation = timing;
    }
}
function setSpeedCellX(cell,destCell,time){
	if(cell.endAnimation < game.time.now){
		game.add.tween(cell).to({x: destCell.x1}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		game.add.tween(cell.letter).to({x: destCell.letter.x}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		cell.endAnimation = time*TIME_INTERVAL + game.time.now;
        if(globalEndAnimation < cell.endAnimation){
            globalEndAnimation = cell.endAnimation;
        }
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
        if(globalEndAnimation < cell.endAnimation){
            globalEndAnimation = cell.endAnimation;
        }
	}
}
function setSpeedToFallingCells(cells){
	for(var i = 0 ; i < cells.length ; i++){
		var numEmptyRowsUnder = countEmptyInRangeColumn(cells[i].j1, cells[i].i1+1, NUM_ROWS);
		var time = numEmptyRowsUnder*FALL_TIME;
		cells[i].y1 = (numEmptyRowsUnder + cells[i].i1)*(CELL_SPACE + CELL_SIZE) + BOARD_LOCATION_Y;//cells[i].body.y + numEmptyRowsUnder*(CELL_SPACE+CELL_SIZE);
		var destLetter = cells[i].letter.y + numEmptyRowsUnder*(CELL_SPACE+CELL_SIZE);
		setIJOnly(cells[i],cells[i].i1+numEmptyRowsUnder,cells[i].j1);
		setSpeedCellY(cells[i], cells[i].y1,destLetter, time);
    }
	for(var i = 0 ; i < cells.length ; i++){
		setIJInBoard(cells[i],cells[i].i1,cells[i].j1);
	}
}
function setUndoButton(check){
//	if(backOn != null){
//		if(check){
//			backOn.body.x = 0;
//			backOn.body.y = 0;
//			backOff.body.x = game.world.width;
//			backOff.body.y = game.world.height;
//		}
//		else{
//			backOn.body.x = game.world.width;
//			backOn.body.y = game.world.height;
//			backOff.body.x = 0;
//			backOff.body.y = 0;
//		}
//	}
//	else{
//		if(check){
//		    backOn = game.add.sprite(0,0, 'backOn', 0);
//		    backOn.endAnimation = 0;
//		    backOff = game.add.sprite(game.world.width,game.world.height, 'backOff', 0);
//		    backOff.endAnimation = 0;
//		}
//		else{
//		    backOn = game.add.sprite(game.world.width,game.world.height, 'backOn', 0);
//		    backOn.endAnimation = 0;
//		    backOff = game.add.sprite(0,0, 'backOff', 0);
//		    backOff.endAnimation = 0;
//		}
//	    backOn.scale.setTo(0.5, 0.5); // 50% of the source image size
//	    backOff.scale.setTo(0.5, 0.5); // 50% of the source image size
//	}
//    enableClick(backOn, undoClickC);
}
function undoClickC() {
    cancleAll();
    popups.setMessage(popups.BEFORE_EXIT_LEVEL_QUESTION);
    popups.setOptions(['לא', 'כן'],
            [function() { popups.CLOSE_HENDLER(); enableAll(); }, function() {
                $.get( "../leave-level/", function( data ) {
                    // do nothing
                });
                numLifes--;
                killEverythingToExitState();
                game.state.start('scoreTableState', true, true);
                popups.CLOSE_HENDLER();
            }]
    );
    popups.show();
}
function ____IS_FUNCTIONS____(){}
function isJoker(cell){
    return (cell.picName == '?' || cell.picName == '!' || cell.picName == '#');
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
function isItsPoints(cell){
	if(cell != null){
		return 	('0' <= cell.char[0] && cell.char[0] <= '9');
	}
	return false;
}
function isNextToEachOther(cell1,cell2){
	var disI = Math.abs(cell1.i1-cell2.i1);
	var disJ = Math.abs(cell1.j1-cell2.j1);
	return (disI+disJ == 1);
}
function isPasukFull(){
    var flag = true;
	for(var i = 0 ; i < flags.length ; i++){
        flag = flag&&flags[i];
	}
	return flag;
}
function isSameLetter(letter1,letter2){
	if(letter1 == letter2)
		return true;
	else if(letter1 == 'ם' && letter2 == 'מ')
		return true;
	else if(letter1 == 'ן' && letter2 == 'נ')
		return true;
	else if(letter1 == 'ץ' && letter2 == 'צ')
		return true;
	else if(letter1 == 'ף' && letter2 == 'פ')
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
function addLetterToPasuk(cell){
    for(var i = 0 ; i < pasuk.length ; i++){
        if(isSameLetter(pasuk[i],cell.char)){
            if(flags[i] == false){
                setSpeedLetterY(cell, pasukLabel.y+30, BRING_UP_TIME);
                flags[i] = true;
                return true;
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
            var i = cell.i1;
            var j = cell.j1;
            if(isJoker(cell)){
                var newCell = getCell(cell.i1,cell.j1,'cell',false,cell);
                killCell(cell);
                board[i][j] = newCell;
            }
            board[i][j].letter.setStyle(RESIZE_POINTS_STYLES[0]);
            board[i][j].char = ""+cell.points;
        }
        board[cell.i1][cell.j1].letter.setText(board[cell.i1][cell.j1].char);
    }
	score+=points;
	updateScoreLable();
}
function bringLettersUp(){
	if(isBringingUp == false){
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
function cancleClick(pic){
	if(pic != null){
		pic.inputEnabled = false;
	}
}
function getRandomLetter(){
    var char = '';
        if(steps != doneOnThisStep && missingLetter == null){
            missingLetter = getMissingLetter();
            doneOnThisStep = steps;
        }
        if(doneOnThisStep != steps && missingLetter != null){
            char = missingLetter;
            missingLetter = null;
        }
        else if(initializedSteps - steps >= levelClicked/2 && pasukArrayIndex < pasukArray.length){
            char = pasukArray[pasukArrayIndex];
            pasukArrayIndex++;
        }
        else{
            var randomIndex = parseInt(Math.random()*LETTERS_ARRAY.length);
            char = LETTERS_ARRAY[randomIndex];
        }
    return char;
}
function getPlainCell(i,j,picName){
    var x = j*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_X;
	var y = i*(CELL_SIZE+CELL_SPACE)+BOARD_LOCATION_Y;
	var newCell = game.add.sprite(x,y,picName);
    newCell.picName = picName;
	newCell.i1 = i;
	newCell.j1 = j;
	newCell.endAnimation = 0;
	newCell.x1 = x;
	newCell.y1 = y;
	newCell.indexStyle = 0;
    newCell.points = 0;
    return newCell;
}
function getCell(i,j,picName,isRandom,cell){
    var newCell = getPlainCell(i,j,picName);
    if(isRandom == false && cell != null){
        newCell.color = cell.color;
        newCell.char = cell.char;
    }
    else if(isRandom == false){//cell == null
        newCell.color = -1;
        newCell.char = '';
    }
    else{
        newCell.color = parseInt(Math.random()*COLORS_ARRAY.length);
        newCell.char = getRandomLetter();
    }
    var styleC = getCellStyle(newCell.color);
    newCell.letter = game.add.text(newCell.x1+CELL_SIZE/2,newCell.y1+CELL_SIZE/2,newCell.char, styleC);
	newCell.letter.anchor.setTo(0.5,0.5);
    if(cell != null){
        newCell.points = cell.points;
    }
	return newCell;
}
function getCellStyle(colorIndex){
    if(colorIndex != -1){
        return { font: "70px Miriam Fixed", fill: COLORS_ARRAY[colorIndex], stroke: "White", strokeThickness: 3, align: "center"};
    }
    else{
        return { font: "70px Miriam Fixed", fill: 'Black', stroke: "White", strokeThickness: 3, align: "center"};
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
			board[i][j] = getCell(i,j,'cell',true,null)
		}
	}
//    killCell(board[0][0]);
//    killCell(board[0][1]);
//    killCell(board[0][2]);
//    board[0][0] = getCell(0,0,'?',false);
//    board[0][1] = getCell(0,1,'?',false);
//    board[0][2] = getCell(0,2,'?',false);
//       killCell(board[1][4]);
//        killCell(board[2][3]);
//        killCell(board[3][6]);
//        board[1][4] = getCell(1,4,'?',false);
//        board[2][3] = getCell(2,3,'!',false);
//        board[3][6] = getCell(3,6,'?',false);
//        killCell(board[4][0]);
//        killCell(board[3][1]);
//        killCell(board[2][2]);
//        board[4][0] = getCell(4,0,'#',false);
//        board[3][1] = getCell(3,1,'#',false);
//        board[2][2] = getCell(2,2,'!',false);


}

function moveTheBoardToTopOfGame(){
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            board[i][j].body.y -= game.world.height;
            board[i][j].letter.y -= game.world.height;
            setSpeedCellY(board[i][j],board[i][j].body.y + game.world.height,board[i][j].letter.y + game.world.height,2 - (i+3)*0.03 - (j+2)*0.1);
        }
    }
}


function removeSetsInBeginning(){
    var countTimes = 6;
    sets = getSets(getVectors(),true);
    if(sets.length == 0){
        if(getPair() == null){
            makeAllToBeInSet();
        }
    }
    while(sets.length > 0 && countTimes > 0){
        countTimes--;
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                var cell = sets[i][j][0];
                killCell(cell);
                board[cell.i1][cell.j1] = getCell(cell.i1,cell.j1,'cell',true,null);
            }
        }
        sets = getSets(getVectors(),true);
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
function enableAll(){
	if(isAllEnabled == false){	
		isAllEnabled = true;
        enableClick(hintImg,activeHint);
        enableClick(showPasukImg,showPasukClick);
		for(var i = 0 ; i < NUM_ROWS ; i++){
			for(var j = 0 ; j < NUM_COLUMNS ; j++){
				if(board[i][j]!=null){
					enableClick(board[i][j],cellClick);
				}
			}
		}
	}
}
var mouse;
function enableClick(pic,func){
	if(pic != null){
		pic.inputEnabled = true;
        pic.events.onInputUp.add(func, this);

//        pic.input.start(0, true);
//        pic.input.enableDrag();
//        pic.input.allowHorizontalDrag = false;

//        pic.events.
        // TODO add input up
//        pic.events.onInputUp.add(func,this);
        //pic.event.ontap;
//        pic.events.onDown.add(func,this);
//        pic.events.isDown.add(func,this);//eventTouchMove,eventTouchEnd
	}
}
function fakeSwap(cell1,cell2){
	var temp = board[cell1.i1][cell1.j1];
	board[cell1.i1][cell1.j1] = board[cell2.i1][cell2.j1];
	board[cell2.i1][cell2.j1] = temp;
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
            var x = cell.i1;
            var y = cell.j1;
            killCell(cell);
            sets[i][2] = null;
            board[x][y] = getCell(x,y,'!',false);
        }
        if(sets[i][0][1] == 'letter' && sets[i].length >= 4){
            var cell = sets[i][0][0];
            var x = cell.i1;
            var y = cell.j1;
            killCell(cell);
            sets[i][0] = null;
            board[x][y] = getCell(x,y,'?',false);
        }
        else if(sets[i][0][1] == 'word' && sets[i].length >= 3){
            var cell = sets[i][0][0];
            var x = cell.i1;
            var y = cell.j1;
            killCell(cell);
            sets[i][0] = null;
            board[x][y] = getCell(x,y,'#',false);
        }
    }
    //its doubled in porpuse, to save calculations!
    if(jokerActivated == null){
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                if(sets[i][j] != null){
                    var cell = sets[i][j][0];
                    if(isJoker(board[cell.i1][cell.j1])==false){
                        addPointToCell(board[cell.i1][cell.j1],getMatchPoints(sets[i][j],sets[i].length),true);
                    }
                }
            }
        }
    }
    else{//the joker is activated, if the cell is joker and its activated, kill it.
        for(var i = 0 ; i < sets.length ; i++){
            for(var j = 0 ; j < sets[i].length ; j++){
                if(sets[i][j] != null){
                    var cell = sets[i][j][0];
//                    if(isJoker(board[cell.i1][cell.j1])==false || isItHisLocationAndJoker(jokerActivated[0],i,j) || isItHisLocationAndJoker(jokerActivated[1],i,j)){
                        addPointToCell(board[cell.i1][cell.j1],getMatchPoints(sets[i][j],sets[i].length),true);
//                    }
                }
            }
        }
    }
    jokerActivated = null;
}
function isItHisLocationAndJoker(cell,i,j){
    return (cell.i1 == i && cell.j1 == j);
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
        case '!':
            return POINTS*10;
        case '#':
            return POINTS*10;
        case '_':
            return POINTS*5;
        default:
            return POINTS;
    }
}
function getMissingLetter(){
    mixedLettersArray = mixArray(mixedLettersArray);
    if(board != null){
        var isFound = false;
        for(var i = 0 ; i < mixedLettersArray.length ; i++){
            isFound = false;
            for(var j = 0 ; j < NUM_ROWS && !isFound; j++){
                if(board[j] != null){
                    for(var k = 0 ; k < NUM_COLUMNS && !isFound; k++){
                        if(board[j][k] != null){
                            if(board[j][k].char != null){
                                if(board[j][k].char == mixedLettersArray[i]){
                                    isFound = true;
                                }
                            }
                        }
                    }
                }
            }
            if(isFound == false){
                return mixedLettersArray[i];
            }
        }
    }
    return null;
}
function killPair(){
	if(pair != null){
		kill(pair[0].selectedImg);
		kill(pair[1].selectedImg);		
	}
    kill(clickedHint);
    pair = null;
}
function putSelectedCell(cell){
	if(cell.selectedImg != null){
		kill(cell.selectedImg);
	}
	cell.selectedImg = game.add.sprite(cell.x1 + CELL_SIZE/2,cell.y1 - 2 + CELL_SIZE/2,'selectedCell',0);
    cell.selectedImg.anchor.setTo(0.5,0.5)
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
function updateScoreLable(){
	scoreLabel.setText(":ניקוד\n"+score);
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
//    kill(backOn);
//    kill(backOff);
    kill(endLabel);
    killBoard();
//    destroy(stepsLabel);
//    destroy(pasukLabel);
//    destroy(scoreLabel);
//    destroy(levelLabel);
//    destroy(perekLabel);
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
var helpIndex = 0;
function help(cell){
    if(CONST_LETTERS_ARRAY[helpIndex] == cell.char){
        helpIndex++;
    }
    else if(helpIndex > 0 && CONST_LETTERS_ARRAY[helpIndex] != cell.char && CONST_LETTERS_ARRAY[helpIndex - 1] != cell.char){
        helpIndex = 0;
    }
    if(helpIndex == CONST_LETTERS_ARRAY.length){
        isDvir = true;
        helpIndex = 0;
//        kill(cellClicked.selectedImg);
//        killCell(board[1][4]);
//        killCell(board[2][3]);
//        killCell(board[3][6]);
//        board[1][4] = getCell(1,4,'?',false);
//        board[2][3] = getCell(2,3,'!',false);
//        board[3][6] = getCell(3,6,'?',false);
//        killCell(board[4][0]);
//        killCell(board[3][1]);
//        killCell(board[2][2]);
//        board[4][0] = getCell(4,0,'#',false);
//        board[3][1] = getCell(3,1,'#',false);
//        board[2][2] = getCell(2,2,'!',false);

    }
}
function killJokersAndGetPoints(){
    var sumPoints = 0;
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            if(isJoker(board[i][j]) == true){
                addPointToCell(board[i][j],500,true);
                sumPoints+=500;
            }
        }
    }
}

function countExtraSpace(str){
    var count = 0;
    for(var i = 0 ; i < str.length ; i++){
        if(str[i] == ' ' || str[i] == '\'' || str[i] == '-' || str[i] == '\n'){
            count++;
        }
    }
    return count;
}

function turnSelected(){
    if(prevCellClick != null){
        if(prevCellClick.selectedImg != null){
            prevCellClick.selectedImg.angle += SELECTED_ANGLE;
            if(prevCellClick.selectedImg.angle > 360){
                prevCellClick.selectedImg.angle -= 360;
            }
        }
    }
    if(pair != null){
        pair[0].selectedImg.angle += SELECTED_ANGLE;
        pair[1].selectedImg.angle += SELECTED_ANGLE;
        if(pair[0].selectedImg.angle > 360){
            pair[0].selectedImg.angle -= 360;
            pair[1].selectedImg.angle -= 360;
        }
    }
}

function getRandomLocOut(){
    var x,y;
    var rand = Math.random();
    if(rand >= 0.5){
        rand = Math.random();
        y = rand*game.world.height;
        rand = Math.random();
        if(rand >= 0.5){
            x = game.world.width + CELL_SIZE;
        }
        else{
            x = -CELL_SIZE;
        }
    }
    else{//rand <=0.5
        rand = Math.random();
        x = rand*game.world.width;
        rand = Math.random();
        if(rand >= 0.5){
            y = game.world.height + CELL_SIZE;
        }
        else{
            y = -CELL_SIZE;
        }
    }
    return [x,y];
}

function explodeBoard(time){
    kill(hideBackground);
    var arr,cell;
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
            arr = getRandomLocOut();
//            cell = getCell(i,j,board[i][j].picName,false,board[i][j]);
//            killCell(board[i][j]);
//            board[i][j] = cell;
//	        setSpeedCell(cell,arr[0],arr[1],time);
            game.add.tween(board[i][j].letter).to({x: arr[0], y: arr[1]}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
            //setSpeedCell(board[i][j],arr[0],arr[1],time);
        }
    }
    if(globalEndAnimation < game.time.now + time){
        globalEndAnimation = game.time.now + time;
    }
}

function setSpeedCell(cell,destPicX,destPicY,time){
	if(cell.endAnimation < game.time.now){
		game.add.tween(cell).to({x: destPicX, y: destPicY}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		game.add.tween(cell.letter).to({x: destPicX, y: destPicY}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
	}
}

function fallBoard(time){
    var arr,cell;
    for(var i = 0 ; i < NUM_ROWS ; i++){
        for(var j = 0 ; j < NUM_COLUMNS ; j++){
//            cell = getCell(i,j,board[i][j].picName,false,board[i][j]);
//            killCell(board[i][j]);
//            board[i][j] = cell;
	        setSpeedCellY(board[i][j],game.world.height+CELL_SIZE,game.world.height+CELL_SIZE*1.5,time);
        }
    }
    if(globalEndAnimation < game.time.now + time){
        globalEndAnimation = game.time.now + time;
    }
}

function getPerfectPair(){
    var pairs = [];
    var sets;
    var missings = getMissingLettersInPasuk();
    //every cell in pairs will contain: cell1,cell2,sets,numLettersCovered
	for(var i = NUM_ROWS-1 ; i > 0 ; i--){
		for(var j = 0 ; j < NUM_COLUMNS ; j++){
			fakeSwap(board[i][j],board[i-1][j]);
            sets = getSets(getVectors(),true);
            if(sets.length > 0){
                fakeSwap(board[i][j],board[i-1][j]);
                if(isContainsJoker(sets)){
                    return [board[i][j],board[i-1][j]];
                }
                pairs.push([board[i][j],board[i-1][j],countMissingLettersInSet(sets,missings.slice(0))]);
            }
            else{
                fakeSwap(board[i][j],board[i-1][j]);
            }
            if(isJoker(board[i][j])){
                return [board[i][j],board[i-1][j]];
            }
            if(j < NUM_COLUMNS - 1){
                fakeSwap(board[i][j],board[i][j+1]);
                sets = getSets(getVectors(),true);
                if(sets.length > 0){
                    fakeSwap(board[i][j],board[i][j+1]);
                if(isContainsJoker(sets)){
                    return [board[i][j],board[i][j+1]];
                }
                    pairs.push([board[i][j],board[i][j+1],countMissingLettersInSet(sets,missings.slice(0))]);
                }
                else{
                    fakeSwap(board[i][j],board[i][j+1]);
                }
			}
		}
	}
    var maxCount = 0;
    var pair = null;
    for(var i = 0 ; i < pairs.length ; i++){
        if(maxCount < pairs[i][2]){
            maxCount = pairs[i][2];
            pair = [pairs[i][0],pairs[i][1]];
        }
    }
    if(pair == null){
        return getPair();
    }
	return pair;
}

function getMissingLettersInPasuk(){
    var arr = [];
    for(var i = 0 ; i < pasuk.length ; i++){
        if(flags[i] == false){
            arr.push(getLowerCase(pasuk[i]));
        }
    }
    return arr;
}

function countMissingLettersInSet(sets,missings){
    var count = missings.length;
    var set;
    for(var i = 0 ; i < sets.length ; i++){
        set = sets[i];
        for(var j = 0 ; j < set.length ; j++){
            missings = removeLetterIfMiss(set[j][0].char,missings);
        }
    }
    return count - missings.length;
}

function removeLetterIfMiss(letter,missings){
    for(var i = 0 ; i < missings.length ; i++){
        if(missings[i] == letter){
            var arr = [];
            var j = 0;
            for(;j < i ; j++){
                arr.push(missings[j]);
            }
            j++;
            for(;j < missings.length ; j++){
                arr.push(missings[j]);
            }
            return arr;
        }
    }
    return missings;
}

function isContainsJoker(sets){
    for(var i = 0 ; i < sets.length ; i++){
        if(sets[i].length >= 5 || (sets[i][0][1] == 'letter' && sets[i].length >= 4) || (sets[i][0][1] == 'word' && sets[i].length >= 3)){
            return true;
        }
    }
    return false;
}