/*************************************************************************/
// Constants:

var colors = ["#FF6600","#006600","#0000FF","#990099","#FF0000","#33FF00","#330000"];
var hebrew = ['�', '�', '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�'];
var pasuk = "������ ��� �-����� �� ������ ��� ����";
var psukim = [
" ������ ��� �-����� �� ������ ��� ����",
" ����� ����� ���� ����� ����� �� ��� ���� ���� �-����� ����� �� ��� ����",
" ����� �-����� ��� ��� ���� ���",
" ���� �-����� �� ���� �� ��� ����� �-����� ��� ���� ���� �����",
" ����� �-����� ���� ��� ������ ��� ���� ���� ��� ���� ���� ��� ��� ",
" ����� �-����� ��� ���� ���� ���� ���� ����� ��� ��� ����",
" ���� �-����� �� ����� ����� ��� ���� ��� ���� ����� ���� ���� ��� ��� ����� ���� ��",
" ����� �-����� ����� ����� ���� ��� ���� ���� ��� ��� ",
" ����� �-����� ����� ���� ���� ������ �� ���� ��� ������ ����� ���� ��",
" ����� �-����� ����� ��� ������ ���� ��� ���� ���� �-����� �� ���",
" ����� �-����� ���� ���� ��� ��� ����� ��� �� ��� ���� ��� ����� ��� ���� �� �� ���� ���� ��",
" ����� ���� ��� ��� ����� ��� ������ ��� ���� ��� ��� ���� �� ������ ���� �-����� �� ���",
" ���� ��� ���� ���� ��� ����� ",
" ����� �-����� ��� ������ ����� ������ ������ ��� ���� ���� ����� ���� ������ �������� ������ �����",
" ���� ������� ����� ������ ����� �� ���� ���� ��",
" ���� �-����� �� ��� ������� ������� �� ����� ����� ������ ���� ��� ����� ����� ������ ����� ��� �������",
" ����� ���� �-����� ����� ������ ����� �� ����",
" ������ ���� ������ ������� ��� ���� ���� ����� ���� �-����� �� ���",
" ���� ��� ���� ���� ��� ����� ",
" ����� �-����� ����� ���� ��� ��� ��� ���� ����� �� ���� �� ��� ���� ������",
" ����� �-����� �� ������� ������� ��� �� ��� ���� ������ ��� ���� ���� ������� ��� �� ��� ��� ������ ���� �-����� �� ���",
" ����� ���� �-����� ����� ��� ���� ����� �� ���� ����� ����� ���� ����",
" ���� ��� ���� ���� ��� ����� ",
" ����� �-����� ���� ���� ��� ��� ����� ���� ���� ����� ��� ����� ���� ��",
" ���� �-����� �� ��� ���� ����� ��� ����� ����� ��� �� ��� ����� ������ ���� �-����� �� ���",
" ����� �-����� ���� ��� ������ ������� ����� ���� ��� ����� ������ ������ ���� ���� ���� ���� ����� �� ����",
" ����� �-����� �� ���� ����� ���� �-����� ��� ���� ��� ����� ��� ����",
" ����� ���� �-����� ����� ��� �-����� ��� ���� ����� �� ���� ������ ���� ���� ��� ����� ������ ���� ��� ������ �� ����",
" ����� �-����� ��� ���� ��� �� �� ��� ���� ��� ��� �� ��� �� ���� ��� �� ��� ��� �� ��� �� ���� ��� ��� ���� ������",
" ���� ��� ���� ���� ��� ������ ����� ���� �� ���� ��� �� ��� ��� �� �� ��� ��� ������ ���� ��",
" ���� �-����� �� �� ��� ��� ���� ��� ���� ���� ��� ���� ���� ��� ����� ",
" ������ ������ ����� ��� ����",
" ���� �-����� ���� ������ ������ ��� ��� ������ ���� ������ ��� ������ ��� ���",
" ����� �-����� �� ��� ������ ����� ���� �� �� ��� ��� ������ ��� ��� �-����� ����� ",
" ��� ������ ������ ����� ������� ���� ���� �-��� �-����� ��� ������",
" ���� ��� ���� ��� ���� ���� ��� ��� ���� ��� ���� �� �� ����� �-��� �-����� �� ���� ���� ��� ����� �� �����",
" ��� ���� �� ���� ����� �� �� ��� �����",
" ����� �-��� �-����� �� ���� ��� �� ����� ����� ����� ���� ���� ���� ���� ���� ���",
" ����� �-��� �-����� �� ���� ���� ���� �� �� ���� ��� ���",
" ����� �-��� �-����� �� ����� �� �� ���� ����� ���� ����� ��� ����� ���� ��� ��� ���� ��� ���",
" ���� ���� ���� ������ �� ��� ���� ����� ���� ������ �����",
" �� ���� ����� ��� ����� �� �� ��� ������� ��� �� ����",
" ���� ���� ���� ��� �� ������ ���� �����",
" ��� ���� ���� ����� ��� ����� �� �� ��� ���",
" ��� ���� ������ ����� ��� ����� ���� ���� ����� ������ ��� ���",
" ����� �-��� �-����� �� ���� ������� ��� ��� ������ �������",
" ���� �-��� �-����� �� ���� ����� ���� �� ��� ���� ����",
" ���� ���� ��� ��� �� ���� ���� �� ���� ����� ���� ��� ����",
" ����� �-��� �-����� �� ��� ���� ���� ���� ���� �� ��� �����",
" ����� �-��� �-����� �� ����� �� ��� ���� ��� �� ��� ������ ���� �� ���� ����� �� ���� �� ���� ��� ���� �� ���� ��� ��� ��� ���",
" ����� ���� ���� ��� ����� ����� ������ ����� ��� ���� ����� �� ��� ��� �����",
" ���� �-��� �-����� ����� �� ���� ����� ����� ��� �������� ������ ��� �����",
" ����� �-��� �-����� �� ���� ��� ��� �� ���� ����� ������� �� ����",
" ����� ���� ��� ���� ��� ������ ���� ����� ���� ����� ���� �� ���� ����� ���",
" �� �� ����� ��� �� ���� ��� ���� ���� ����� ���� ���� ���",
" ����� ����� ������ ���� ����� ��� �������",
" ����� ��� ���� ���� ��� ���� ��� ��� �-��� �-����� ����� �� ����� �� �� ��� �-����� �� ����� ���� �� ���",
" ����� ����� �� ���� ���� �� ��� ����",
" ����� ��� ��� ���� ��� ��� �-����� �� ����� ���� ��� ����� �� �� ������",
" ����� ���� �� ����� �� ��� ������",
" �� ���� �-����� �� ���� ������ ���� ������ ������ ������ ��-����� ����� ��� ���",
" ���� ����� �� ��� ��� ����� ��� ����� ��� ������� ����� ��� ������ ����� ������ ����� ����� �� ����� ���� �����",
" �������� ���� ����� ������ �� ������� �� ������ ��� ���� ����� ��� ������",
" ������ �� ��� �-��� �-����� ����� ��� ���� ���� ������ ���� ����� ���� �-��� �-����� ���� �� ���",
" ����� �-��� �-����� �� ���� ����� �� ����",
" ����� �� ���� ����� ��� ����� �� ����� ����� ������",
" ����� �� ���� �� �� ����� ��� ��� ��� ��� �������� ����� ���� ���� ����",
" ����� ���� ����� ��� ��� ����� ��� ���� �� �� ��� �����",
" ����� �-��� �-����� ����� �� ��� ���� ����� ����� ���� ������ �����",
" ����� �-��� �-����� �� ���� �� ���� ��� ���� ��� ��� ����� ����� ��� ���� �� ����� ��� ���� ���� �� ��� ����",
" ����� ���� ���� ���� ����� ���� ���� ���� ���� ��� ����� ��� ���� ������ ��� ",
" �� ����� ��� ���� ���� ������� ������ ���� ���� ���� ��� ���� ������ ���� ����� �� ",
" ����� ��� �� ���� ���� ���� ����� �� ��� ��� �������� ����� �� ���� ���� ����� ����� ������ ������� ������ ��� ��� ����",
" ���� ����� ����� �� ����� �� ��� ����",
" ����� ���� ���� ��� �� ���� �� ����� �� ���� ����� �� ��� ��� ��� ��� ����",
" ����� ���� �� ���� ���� �� ��� ����� �� �� ��",
" ���� �-��� �-����� ���� ������ ������ ��� ������� ",
" ����� �-��� �-����� �� ���� ��� ���� ���� ���� ��� ��� ���� �� ���� ��� ���� �� ��� ����� ���� ��� �����",
" ������� �-��� �-����� ��� ��� ����� �� ����� ��� ���� ���",
" ����� �� ���� ����� ���� ��� ��� �� ������� ��� ��� ���� ������� ����� �� ��� �� ����� ",
" ����� ��� �� ���� ���� ���� ���� �� ��� ����� ����� ��� �� ",
" ����� ���� �� ���� �� ��� ���� ��� ���� ��� ���� ��� ���� ����",
" ���� ��� ���� ���� ��� ���� ����� ���� ��-���",
" ���� ���� �� ��� ������� ���� �������� ����� �-��� �� ��� ��� �����",
" ��� ��� ��� ����� �� ��� ����� ���� ���� ������ ����",
" ����� �-��� �� ��� ��� ��� �� ���� ���� ����",
" ���� �� ����� ��� ��� �� ����� ���� ���� ���� ����� ������ ���� ����� ��",
" ����� ��� �� ��� ���� ���� ������ ���� ���� ��� �� ��� ���� �������",
" ����� �-��� �� ��� �� ��� ���� ����� �� ����� ����� ��� �����",
" ����� �� ���� ��� ��� ���� ������ ���� �� �����",
" ���� ���� ��� �� ����� ��� ���� �� ��� ���� �� ��� ���� ����"
];

var flags = [];
//var gameOver = false;
var level = 0;
pasuk = psukim[level];
initialFlags();
$("#level").html("Your level is: " + (level + 1) + "/" + psukim.length);
$("#answer").html("Your pasuk is: " + pasuk);
/*************************************************************************/

function initialSteps(){
	counterMoves.content = Math.round(pasuk.length/2);
}

function setLettersArray(){
	hebrew = ['�', '�', '�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�','�'];
	hebrew = hebrew.concat(hebrew);
	for(var i = 0 ; i < pasuk.length ; i++){
		if(pasuk[i] != ' ' && pasuk[i] != '-'){
			hebrew.push(lowerCase(pasuk[i]));
		}
	}
}

function nextLevel(){
	level++;
	level = level % psukim.length;
	pasuk = psukim[level];
	//if you want to make the game easier, give the easy letters by using this function
	setLettersArray();
	create();
	initialFlags();
	initialSteps();
	$("#level").html("Your level is: " + (level + 1) + "/" + psukim.length);
	$("#answer").html("Your pasuk is: " + pasuk);
}

function prevLevel(){
	level = (level - 1 + psukim.length) % psukim.length;
	pasuk = psukim[level];
	create();
	initialFlags();
	initialSteps();
	$("#level").html("Your level is: " + (level + 1) + "/" + psukim.length);
	$("#answer").html("Your pasuk is: " + pasuk);
}

function gotoLevel(lvl) {
	level = (lvl - 1 + psukim.length) % psukim.length;
	pasuk = psukim[level];
	create();
	initialFlags();
	initialSteps();
	$("#level").html("Your level is: " + (level + 1) + "/" + psukim.length);
	$("#answer").html("Your pasuk is: " + pasuk);
}

function getPasuk(){
	str = "";
	for(var i = 0 ; i < pasuk.length ; i++){
		if(flags[i]){
			str += pasuk[i];
		}
		else{
			str += "_";
		}
	}
	return str;
}

function updateLetter(letter){
	for(var i = 0 ; i < pasuk.length ; i++){
		if(checkSameLetter(pasuk[i],letter) && !flags[i]){
			flags[i] = true;
			break;
		}
	}
}

function lowerCase(letter){
	if(letter == '�')
		return '�';
	else if(letter == '�')
		return '�';
	else if(letter == '�')
		return '�';
	else if(letter == '�')
		return '�';
	else if(letter == '�')
		return '�';
	return letter;

}

function checkSameLetter(letter1,letter2){
	if(letter1 == letter2)
		return true;
	else if(letter1 == '�' && letter2 == '�')
		return true;
	else if(letter1 == '�' && letter2 == '�')
		return true;
	else if(letter1 == '�' && letter2 == '�')
		return true;
	else if(letter1 == '�' && letter2 == '�')
		return true;
	else if(letter1 == '�' && letter2 == '�')
		return true;
	return false;
}

function checkEndGame(){
	if(checkFlags()){
		alert("good job!!!");
		state = 1;
		nextLevel();
	}
	if(parseInt(counterMoves.content) == 0){
		alert("game over, try again");
		state = 1;
		level--;
		nextLevel();
	}
}

function initialFlags(){
	flags = [];
	for(var i = 0; i < pasuk.length ; i++){
		if(pasuk[i] == '-' || pasuk[i] == ' ')
			flags[i] = true;
		else
			flags[i] = false;
	}
}

function checkFlags(){
	for(var i = 0 ; i < flags.length ; i++){
		if(!flags[i]){
			return false;
		}
	}
	return true;
}

// Cell Object:

var CELL_IMG_WIDTH = 36, CELL_IMG_HEIGHT = 36;
var BOARD_X = 240, BOARD_Y = 250;

var cells = [], sellectedCell;
var background, txtScore, counterScore,counterMoves, txtLifes, title, text;
var NUMBER_ROWS = 6, NUMBER_COL = 8;

var POINTS_X = 8;
var LETTER_X = 5/*8*/, LETTER_Y = -3/*6*/;

function initSellectedCell() {
	sellectedCell = game.add.sprite(0, 0, 'selected_cell');
	sellectedCell.visible = false;
}

var id = 0;

Cell = function(i, j, game, letter, color, down) {
	var x = BOARD_X + j * (CELL_IMG_WIDTH + 4);
    var y = BOARD_Y + i * (CELL_IMG_HEIGHT + 4);

    this.game = game;
    this.alive = true;

    this.id = ++id;

	this.cell = game.add.sprite(x, y, 'cell');
	this.cell.inputEnabled = true;
	this.cell.events.onInputDown.add(swap, this.cell);

	this.cell.body.setSize(CELL_IMG_WIDTH + 4, CELL_IMG_HEIGHT + 4, -2, -2);

	this.color = color;
	this.letter =
		game.add.text(
			x + LETTER_X, y + LETTER_Y, letter,
			{ 	font: "45px Miriam Fixed",
				fill: this.color,
				fontweight: "bold",
				align: "center"
			}
		);
	
    /*this.cell.name = index.toString();
    this.cell.body.immovable = true;
    this.cell.body.collideWorldBounds = false;
    this.cell.body.bounce.setTo(1, 1);*/
};

Cell.prototype.isSwapLegal = function(cell) {
	var posCell1 = getCellIndex(this);
	var posCell2 = getCellIndex(cell);
	var thisI = posCell1[0], thisJ = posCell1[1];
	var cellI = posCell2[0], cellJ = posCell2[1];
	var isClose = (thisI == cellI && Math.abs(thisJ - cellJ) == 1)
				|| (Math.abs(thisI - cellI) == 1 && thisJ == cellJ);
	if(isClose) {
		console.log("swapping both cells");
	}
	else {
		console.log("cannot swap both cells");
	}
	return isClose;
}

Cell.prototype.swap = function(cell) {
	// swaps both cells
	var temp;
	
	temp = this.x;
	this.x = cell.x;
	cell.x = temp;

	temp = this.y;
	this.y = cell.y;
	cell.y = temp;
};

Cell.prototype.isClicked = function(x, y) {
	return y > this.cell.y && y < (this.cell.y + CELL_IMG_HEIGHT) && x > this.cell.x
			&& x < (this.cell.x + CELL_IMG_WIDTH);
};

Cell.prototype.select = function(selected) {
	var x = this.cell.x;
	var y = this.cell.y;
	if(selected == true) {
		sellectedCell.x = x;
		sellectedCell.y = y;
		sellectedCell.visible = true;
	} else {
		sellectedCell.x = 0;
		sellectedCell.y = 0;
		sellectedCell.visible = false;
	}
};

Cell.prototype.kill = function() {
	this.alive = false;
	this.cell.kill();
	if(isNaN(parseInt(this.letter.content))) { // means there was text before
		this.letter.content = 0;
		this.letter.y += 13;
		this.letter.x -= 2;
	}
	this.letter.content = parseInt(this.letter.content) + 200;
	this.letter.font = {
		font: "15px Miriam Fixed",
		color: this.color,
		fontweight: "bold",
		align: "center"
	};
	counterScore.content = parseInt(counterScore.content) + 200;
};

Object.defineProperty(Cell.prototype, 'x', {
    get: function() {
        return this.cell.x;
    },
    set: function(value) {
        this.cell.x = value;
        this.letter.x = value + LETTER_X;
    }
});

Object.defineProperty(Cell.prototype, 'y', {
    get: function() {
        return this.cell.y;
    },
    set: function(value) {
        this.cell.y = value;
        this.letter.y = value + LETTER_Y;
    }
});

function createRandomCell(i, j) {
	var p = nextInt(0, hebrew.length-1);
	var k = nextInt(0, 4);
	var letter = hebrew[p];
	var color = colors[k];
	var down;
	var cell = new Cell(i, j, game, letter, color);
	return cell;
}

function getEmptyCell(i,j){
	var cell = new Cell(i,j,game,'',colors[0]);
	cell.alive = false;
	return cell;
}


/*************************************************************************/
// Initialize Game:

var game = new Phaser.Game(
	800, 600,
	Phaser.AUTO, 'torah-squash'
	, {
		preload: preload,
		create: create,
		update: update,
		render: render
	}
);

function preload() {
	game.load.image('background', 'images/background5.gif');
	//game.load.image('title', 'images/title.png');
	game.load.image('cell', 'images/cell.png');
	game.load.image('selected_cell', 'images/selected_cell.png');
	game.load.image('life', 'images/life.png');
	for(var i = 1 ; i <= 33; i++) {
		game.load.image(i.toString(), 'backgroundV1/background'+i+'.jpg');
	}
}

function create() {
	// game background
	background = game.add.sprite(0, 0, 'background');
	game.add.sprite(0, 0, (level % 33 + 1).toString());
	
	initSellectedCell();
	
	// add new sprites
	cells = new Array();
	for (var i = 0; i < NUMBER_ROWS; i++) {
		cells.push(new Array());
		for (var j = 0; j < NUMBER_COL; j++) {
			var cell = createRandomCell(i, j);
			cells[i].push(cell);
		}
	}
	
	// The score
	var styleMono = { fontSize: '34px Miriam Fixed', fill: '#fff' };
    var style = { fontSize: '34px', fill: '#fff' };
    game.add.text(40, 20, "score:", styleMono);
	counterScore = game.add.text(150, 20, "0", style);
	game.add.text(25, 50, "moves:", styleMono);
	counterMoves = game.add.text(150, 50, "10",style);
	initialSteps();

	//  Lives
    lives = game.add.group();
    txtLifes = game.add.text(
    	game.world.width - 105, 10, 'Life : ',
    	{ fontSize: '34px', fill: '#fff' }
	);
	
	for (var i = 0; i < 3; i++) 
    {
        var ship = lives.create(game.world.width - 90 + (36 * i), 60, 'life');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 0;
        ship.alpha = 0.5;
    }
	
	$("#pasuk").html(getPasuk());
}

var isAnimation = false;
var animationTime = null;
var state = 1;
var moveList = [];

function update() {
	//console.log(1);
	if(!isAnimation) {
		switch(state) {
			case 1:
				removeSets();
				state = 2;
				break;
			case 2:
				fillUp2();
				state = 3;
				break;
			case 3:
				enableAll(true);
				state = 1;
				break;
			default:
				state = 1;
				break;
		}
		$("#pasuk").html(getPasuk());
	}
}

function removeSets() {
	// remove all sets
	var sets = getSets();
	if(sets.length >= 1) {
		isAnimation = true;
		setTimeout(function() {
			sets.forEach(function (set) {
				set.forEach(function (elem) {
					updateLetter(elem.letter.content);
					elem.kill(); // prints POINTS of remove
				});
			});
			setTimeout(function() {isAnimation = false}, 200);
		}, 300);		
	}
	else{
			checkEndGame();
			enableAll(true);
	}
}

function fillUp2(){
	moveList = [];
	for(var i = NUMBER_ROWS - 1 ; i > 0 ; i--){
		for(var j = 0 ; j < NUMBER_COL ; j++){
			if(!cells[i][j].alive){
				if(cells[i-1][j].alive){
					cells[i][j].letter.content = '';
					cells[i][j] = cells[i-1][j];
					moveList.push(cells[i][j]);
					cells[i-1][j] = getEmptyCell(i-1,j);
					cells[i-1][j].cell.kill();
				}
			}
		}
	}
	var i = 0;
	for(var j = 0 ; j < NUMBER_COL ; j++){
		if(!cells[i][j].alive){
			var cell = createRandomCell(i-1, j);
			cells[i][j].letter.content = '';
			cells[i][j] = cell;
			moveList.push(cell);
		}
	}
	moveAnimation2();
}

function moveAnimation2(){
	if(moveList.length > 0){
		isAnimation = true;
		//here we go over all cells and moves them from src in one step to target
		var distance = 40
		var anim = [];
		var speed = 300;
		//add targets to the target list
		for(var i = 0 ; i < moveList.length ; i++){
			target = [moveList[i].x,moveList[i].y+40];
			//take cell[i]
			var cell = moveList[i];
			// pay attention that i move the cell to their targets
			anim[i] = game.add.tween(cell).to({ x: target[0], y: target[1] }, speed, Phaser.Easing.Quadratic.InOut, true, 0, 1, true);
		}
		setTimeout(
				function() {
					anim.forEach(
						function(a) {
							a.stop();
						}
					);
					fillUp2();
					//done..
				}, speed
			);
	}
	else{
		isAnimation = false;
	}
}

function enableAll(check){
	for(var i = 0 ; i < cells.length ; i++){
		for(var j = 0 ; j < cells[i].length ; j++){
			cells[i][j].cell.inputEnabled = check;
		}
	}
}


function test() {
	cells[0][0].cell.body.acceleration.y = 200;
	cells[0][0].cell.body.collideWorldBounds = true;
	//TODO: put all cells with gravity and make them to be setCollisionRange
	//and put them a gravity
	//and bounce.y
	//and put another rectangle with no gravity, but with setCollisionRange
}


/*************************************************************************/

function findSetsInArray(array) {
	var lastColor = null, currentColorSet = [];
	var lastLetter = null, currentLetterSet = [];

	var sets = [];

	for(var i = 0 ; i < array.length; i++) {
		// check color
		if (array[i].alive && array[i].color == lastColor) {
			currentColorSet.push(array[i]);
		}
		else {
			lastColor = (array[i].alive)? array[i].color : null;
			if (currentColorSet.length >= 3) {
				sets.push(currentColorSet);
			}
			currentColorSet = (array[i].alive)? [array[i]] : [];
		}
		// check letter
		if (array[i].alive && array[i].letter.content == lastLetter) {
			currentLetterSet.push(array[i]);
		}
		else {
			lastLetter = (array[i].alive)? array[i].letter.content : null;
			if (currentLetterSet.length >= 3) {
				sets.push(currentLetterSet);
			}
			currentLetterSet = (array[i].alive)? [array[i]] : [];
		}
	}
	if (currentColorSet.length >= 3) {
		sets.push(currentColorSet);
	}
	if (currentLetterSet.length >= 3) {
		sets.push(currentLetterSet);
	}


	return sets;
}

function getSets() {
	var sets = [];
	for(var i = 0; i < NUMBER_ROWS; i++) {
		sets.push.apply(sets, findSetsInArray(cells[i]));
	}
	var swappedCells = swapRowsAndColumns(cells);
	for(var i = 0; i < NUMBER_COL; i++) {
		sets.push.apply(sets, findSetsInArray(swappedCells[i]));
	}
	return sets;
}

function render() {
}

function swapRowsAndColumns(matrix) {
	var swappedMatrix = new Array();
	for(var i = 0; i < matrix[0].length; i++) {
		swappedMatrix[i] = new Array();
		for(var j = 0; j < matrix.length; j++) {
			swappedMatrix[i][j] = matrix[j][i];
		}
	}
	return swappedMatrix;
}

/*************************************************************************/

var selected = [];

function getCellByPosition(pos) {
	var cell = null;
	var x = pos['x'];
	var y = pos['y'];
	for(var i = 0; i < NUMBER_ROWS; i++) {
		for(var j = 0; j < NUMBER_COL; j++) {
			if(cells[i][j] != null && cells[i][j].isClicked(x, y)) {
				cell = cells[i][j];
				break;
			}
		}
	}
	return cell;
}

function getCellIndex(cell) {
	for(var i = 0; i < NUMBER_ROWS; i++) {
		for(var j = 0; j < NUMBER_COL; j++) {
			if(cells[i][j] == cell) {
				return [i, j];
			}
		}
	}
	return [null, null];
}

function swap(cellBackgroundImg, pos) {
	// pay attention:
	// cellBackgroundImg <- we don't use it at all
	var cell = getCellByPosition(pos);
	console.log("clicked at: " + cell + " at index: " + getCellIndex(cell)[0] + " "  + getCellIndex(cell)[1]);
	if(isAnimation) {
		console.log("animation still go on - cannot swap");
		return;
	}
	if(cell) {
		selected.push(cell);
		cell.select(true);
		if(selected.length == 2) {
			if(selected[0].isSwapLegal(selected[1])) {
				// swap elements in cells array
				swapTwoCells(selected[0], selected[1]);
			}
			selected.forEach(function(c) {
				c.select(false);
			});
			selected = [];
		}
	}
}

function swapTwoCells(cell1, cell2, uncheck) {
	// swap elements in cells array
	var p = getCellIndex(cell1);
	var p2 = getCellIndex(cell2);
	var temp = cells[p[0]][p[1]];
	var temp2 = cells[p2[0]][p2[1]];
	cells[p[0]][p[1]] = temp2;
	cells[p2[0]][p2[1]] = temp;
	if(!uncheck) {
		// swap cells
		var sets = getSets();
		if (sets.length >= 1) { // means the swap is ok
			counterMoves.content = parseInt(counterMoves.content) - 1;
			enableAll(false);
			isAnimation = true;
			var anim = [];
			var speed = 500;
			anim[0] = game.add.tween(cell1).to({ x: cell2.x, y: cell2.y }, speed, Phaser.Easing.Quadratic.InOut, true, 0, 1, true);
			anim[1] = game.add.tween(cell2).to({ x: cell1.x, y: cell1.y }, speed, Phaser.Easing.Quadratic.InOut, true, 0, 1, true);
			setTimeout(
				function() {
					anim.forEach(
						function(a) {
							a.stop();
						}
					);
					isAnimation = false;
				}, speed
			);
			
		}
		else { // if there isn't any set ilegal swap
			console.log("iligal swap");
			cells[p[0]][p[1]] = temp;
			cells[p2[0]][p2[1]] = temp2;
		}
	}
	else {
		cell1.swap(cell2);
	}
}

/*************************************************************************/
// More:

function nextInt(min, max) {
	// returns random number between min and max (including them)
	return Math.floor(Math.random() * (max - min + 1) + min);
}

/*************************************************************************/
