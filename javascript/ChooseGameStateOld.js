/**
 * Created by user on 26/02/14.
 */
/*
 * things we need to do:
 * fix the undo button
 * put a label that tells wich path every torah is
 * fix a lot of bugs
 * let the papers follow the grira
 * put the double arrow to the next perek
 * when we come back to the torah from the game, we go to the next level, and unlock it
 * 
 */
var isSwitchedBefore = false;
var prevShiftPageLoc = 0;
var countLeftClick = 0;
var countRightClick = 0;
var prevLeftScrolLocation = 0;
var hideLeft = null, hideRight = null;
var downTime = 1, upTime = 1, runTime = 0.3, scrolTime = 1, scrolPageTime = 0.3,switchTime = 1; 
var isSomthingMoves = false, TIME_INTERVAL = 1000;
var bigTorah = null, leftTorah = null, rightTorah = null;
var bigTorahWidth = 164,bigTorahHeight=450;
var smallTorahWidth = 164,smallTorahHeight=450;
var pageHeight = 230, pageWidth = 82;
var state = 'first';
var torahFront = null, leftScrol = null, rightScrol = null;
var scrolOpen = false;
var leftPaper, rightPaper, widthPaper, numSpots, page = [], numPages = 20;
var step = 0;
var pageHeight = 210;
var nowOpenningScrol = false;
var nowClosingScrol = false;
var currLevel = 1;
var countScrolToLevel = 0;
var styleLevel = { font: "60px Arial", fill: "#000000", align: "center" };
var stylePoints = { font: "20px Arial", fill: "#0000ff", align: "center" };
var leftArrow = null, rightArrow = null;
var enabled = false;
var spaceBetwinPages = 3;
var done = false;
var shiftRightPage = currLevel;
var stopScrolLoc = 75;
var numPageAvailable = 9;
var constDisSmall;
var levelClicked = 1;
var background;
chooseGameState = {
	    preload: function () {
    game.load.image('background', 'images/back.png');
    game.load.image('torah', 'images/torah.png');
    game.load.image('leftScrol', 'images/left_scrol.png');
    game.load.image('rightScrol', 'images/right_scrol.png');
    game.load.image('torahFront', 'images/torah_front.png');
    game.load.image('page','images/page.png');
    game.load.image('leftArrow','images/left_arrow.png');
    game.load.image('rightArrow','images/right_arrow.png');
    game.load.image('backOn','images/back_on.png');
    game.load.image('backOff', 'images/back_Off.png');
    game.load.image('star3', 'images/3stars.png');
    game.load.image('star2', 'images/2stars.png');
    game.load.image('star1', 'images/1stars.png');
    game.load.image('star0', 'images/0stars.png');
    game.load.image('star-1','images/lock.png');
    game.load.image('lock','images/lock.png');
    game.load.image('unlock','images/unlock.png');
    isSwitchedBefore = false;
    prevShiftPageLoc = 0;
    countLeftClick = 0;
    countRightClick = 0;
    prevLeftScrolLocation = 0;
    hideLeft = null, hideRight = null;
    downTime = 1, upTime = 1, runTime = 0.3, scrolTime = 1, scrolPageTime = 0.3,switchTime = 1;
    isSomthingMoves = false, TIME_INTERVAL = 1000;
    bigTorah = null, leftTorah = null, rightTorah = null;
    bigTorahWidth = 164,bigTorahHeight=450;
    smallTorahWidth = 164,smallTorahHeight=450;
    pageHeight = 230, pageWidth = 82;
    state = 'first';
    torahFront = null, leftScrol = null, rightScrol = null;
    scrolOpen = false;
    leftPaper, rightPaper, widthPaper, numSpots, page = [], numPages = 20;
    step = 0;
    pageHeight = 210;
    nowOpenningScrol = false;
    nowClosingScrol = false;
    currLevel = 1;
    countScrolToLevel = 0;
    styleLevel = { font: "60px Arial", fill: "#000000", align: "center" };
    stylePoints = { font: "20px Arial", fill: "#0000ff", align: "center" };
    leftArrow = null, rightArrow = null;
    enabled = false;
    spaceBetwinPages = 3;
    done = false;
    shiftRightPage = currLevel;
    stopScrolLoc = 75;
    numPageAvailable = 9;
    constDisSmall;
    levelClicked = 1;
},

create: function() {
    currLevel = currentLevel;
    shiftRightPage = currLevel;
	constDisSmall = game.world.width/2 - stopScrolLoc;
	game.stage.backgroundColor = '#fff';
	background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	createPages();
	enableLevels(false);
	hideLeft = game.add.tileSprite(0, 0, game.world.width/2 - bigTorahWidth/4, game.world.height, 'background');
    hideRight = game.add.sprite(0, 0, 'background'); //game.add.tileSprite(game.world.width/2 + BIG_TORAH_WIDTH/4, 0, game.world.width, game.world.height, 'background');
    hideRight.cropEnabled = true;
    hideRight.crop.width = game.world.width/2 - bigTorahWidth/4;
    hideRight.crop.height = game.world.height;
    hideRight.crop.x = game.world.width/2 + bigTorahWidth/4;
    hideRight.x = game.world.width/2 + bigTorahWidth/4;
	setUndoButton(true);
	initialBigTorah(false);
	initialSmallTorahs();
	
}, 

update: function() {
//	followAfterPage();
	fixNumbers();
	followBackgroundAfterScrolers();
	switch(state){
	case 'first':
		first();
		break;
	case 'bigTorahClick':
		bigTorahClick();
		break;
	case 'leftTorahClick':
		leftTorahClick();
		break;
	case 'rightTorahClick':
		rightTorahClick();
		break;
	case 'rightArrowClick':
		rightArrowClick();
		break;
	case 'leftArrowClick':
		leftArrowClick();
		break;
	case 'doubleLeftArrowClick':
		doubleLeftArrowClick();
		break;
	case 'doubleRightArrowClick':
		doubleRightArrowClick();
		break;
	case 'undoClick':
		undoClick();
		break;
	}
}
};

function _____MAIN_____(){}
function first(){
	if(bringDown3Torahs() == false);
	else{
		state = 'null';
	}		
}
function bigTorahClick(){
	state = 'bigTorahClick';
	if(bringUp2AndFront() == false);
	else if(openTorah() == false);
	else{
		state = 'null';
	}
}
function leftTorahClick(){
	state = 'leftTorahClick';
	if(switchLeft() == false);
	else{
//		alert('switch right');
		state = 'null';		
	}
}
function rightTorahClick(){
	state = 'rightTorahClick';
	if(switchRight() == false);
	else{
//		alert('switch right');
		state = 'null';		
	}
}
function leftArrowClick(){
	countLeftClick++;
	state = 'leftArrowClick';
	scrolLeft();
	if(countLeftClick<=0){
		state = 'null';		
	}
}
function rightArrowClick(){
	countRightClick++;
	state = 'rightArrowClick';
	scrolRight();
	if(countRightClick<=0){
		state = 'null';		
	}
}
function doubleLeftArrowClick(){
	state = 'doubleLeftArrowClick';
	alert('switch to next season!');
	state = 'null';
}
function doubleRightArrowClick(){
	state = 'doubleRightArrowClick';
	alert('switch to back season!');
	state = 'null';
}
function undoClick(){
	if(state != 'undoClick'){
		if(isTorahOpen){
			undoState = 'closeTorah';
			state = 'undoClick';
		}
		else if(torahFront != null){
			undoState = 'bringDownFrontAnd2Torahs';
			state = 'undoClick';
		}
		else if(bigTorah != null){
			undoState = 'bring3TorahsUpAndExit';
			state = 'undoClick';
		}				
	}
	else{
		switch(undoState){
		case 'closeTorah':
			if(closeTorah() == false);
			else{
				undoState = 'bringDownFrontAnd2Torahs';
				state = 'undoClick';
			}
			break;
		case 'bringDownFrontAnd2Torahs':
			if(bringDown2AndFront() == false);
			else{
				state = 'null';
			}
			break;
		case 'bring3TorahsUpAndExit':
			if(bring3TorahsBack() == false);
			else{
				alert('go to prev page!');
				state = 'null';
			}
			break;
		}
	}
}

function _____BIG_FUNCTIONS_____(){}
function bring3TorahsBack(){
	enableLevels(false);
	cancleClick(bigTorah);
	cancleClick(leftTorah);
	cancleClick(rightTorah);
	if(is3TorahDone(false) == false){
		set3TorahsVelocityY(upTime,-bigTorah.body.height,-leftTorah.body.height);
		return false;
	}
	else{
		kill(bigTorah);
		kill(leftTorah);
		kill(rightTorah);
		return true;
	}	
}
function bringDown2AndFront(){
	if(done == false){
		done = true;
		fix2Scrolers();
		initialSmallTorahs();
		initialFront(false);
		var bigLocY = game.world.height/2 - bigTorahHeight/2;
		var smallLocY = game.world.height/2 - smallTorahHeight/2;
		set2TorahAndFrontVelocityY(downTime, bigLocY, smallLocY);
		return false;
	}
	else if(is2TorahsAndFrontDone(true) == false){
		return false;
	}
	else{
		initialBigTorah(true);
		enable3TorahClick();
		kill(leftScrol);
		kill(torahFront);
		kill(rightScrol);
		done = false;
		return true;
	}
}
function bringDown3Torahs(){
	if(is3TorahDone(true) == false){
		set3TorahsVelocityY(downTime,game.world.height/2-bigTorah.height/2,game.world.height/2-rightTorah.height/2);
		return false;
	}
	else{
		initialBigTorah(true);//fix the location of bigTorah
		enable3TorahClick();
		return true;
	}
}
function bringUp2AndFront(){
	if(torahFront == null){
//		alert(1);
		cancleClick(leftTorah);
		cancleClick(rightTorah);
	    leftScrol = game.add.sprite((game.world.width-bigTorahWidth)/2, game.world.height/2-bigTorahHeight/2, 'leftScrol', 0);
	    leftScrol.endAnimation = 0;
	    enableClick(leftScrol,leftArrowClick);
	    rightScrol = game.add.sprite((game.world.width)/2-1, game.world.height/2-bigTorahHeight/2, 'rightScrol', 0);
	    rightScrol.endAnimation = 0;
	    enableClick(rightScrol,rightArrowClick);
	    initialFront(true);
	    setPapers(true);
		kill(bigTorah);
		return false;
	}
	else if(is2TorahsAndFrontDone(false) == false) {
//		alert(2);
		set2TorahAndFrontVelocityY(upTime,-bigTorahHeight,-smallTorahHeight);
		setPapers(true);
		return false;
	}
	else{
//		alert(3);
		kill(torahFront);
		kill(leftTorah);
		kill(rightTorah);
		return true;
	}
}
function closeTorah(){
	if(isAnimationDone(leftScrol) == true && isTorahOpen()){
		putArrows(false);
		enableLevels(false);
		setSpeedX(leftScrol, game.world.width/2-leftScrol.body.width, scrolTime);
		setSpeedX(rightScrol, game.world.width/2, scrolTime);
		setPapers(false);
		return false;
	}
	else if(isTorahOpen()){
		return false;
	}
	else{
		fix2Scrolers();
	    return true;
	}
}
function openTorah(){
	enableLevels(true);
	if(isNowStopScrolers(true) == false){
		setSpeedX(leftScrol, stopScrolLoc, scrolTime);
		setSpeedX(rightScrol, game.world.width - stopScrolLoc - rightScrol.body.width, scrolTime);
		setPapers(false);
		return false;
	}
	else{
		setPapers(true);
		putArrows(true);
		enableLevels(true);
		return true;
	}
}
function scrolLeft(){
	if(countLeftClick >0){
		countLeftClick--;
		scrolPages(1);
	}
}
function scrolRight(){
	if(countRightClick >0){
		countRightClick--;
		scrolPages(-1);
	}
}
function cancleClickArrows(){
	cancleClick(rightScrol);
	cancleClick(leftScrol);
	cancleClick(rightArrow);
	cancleClick(leftArrow);
}
function enableClickArrows(){
    enableClick(rightScrol,rightArrowClick);
    enableClick(leftScrol,leftArrowClick);
    enableClick(rightArrow,rightArrowClick);
    enableClick(leftArrow,leftArrowClick);
}
function scrolPages(numSteps){
	cancleClickArrows();
	if(shiftRightPage + numSteps < numPages - numPageAvailable && shiftRightPage + numSteps > 0 && isMoving(page[shiftRightPage]) == false){
		rightPaper = rightScrol.body.x + (pageWidth+spaceBetwinPages);
		var distance = numSteps*(pageWidth+spaceBetwinPages);
		var time = Math.abs(runTime*Math.abs(numSteps));
		shiftRightPage+=numSteps;
		setPageVelocityX(distance,time);	
	}
	enableClickArrows();
}
function _____SET_FUNCTIONS_____(){}
function set2TorahAndFrontVelocityY(time,bigLocY,smallLocY){
	setSpeedY(torahFront,bigLocY,time);
	setSpeedY(leftTorah,smallLocY,time);
	setSpeedY(rightTorah,smallLocY,time);
//	torahFront.body.velocity.y = speed;
//	leftTorah.body.velocity.y = speed;
//	rightTorah.body.velocity.y = speed;
}
function set3TorahsVelocityY(time,bigLocY,smallLocY){
	setSpeedY(bigTorah,bigLocY,time);
	setSpeedY(leftTorah,smallLocY,time);
	setSpeedY(rightTorah,smallLocY,time);
//	bigTorah.body.velocity.y = speed;
//	leftTorah.body.velocity.y = speed;
//	rightTorah.body.velocity.y = speed;	
}
function setPageVelocityX(distance, time){
	for(var i = 0 ; i < numPages; i++){
		setSpeedX(page[i],distance + page[i].body.x, time);
		setSpeedX(page[i].stars,distance + page[i].stars.body.x, time);
		//TODO
//		setSpeedX(page[i].lock,distance + page[i].lock.body.x,time);	
//		console.log(page[i].lock.x);
		setSpeedX(page[i].number,distance + page[i].number.x, time);
		setSpeedX(page[i].pointsText,100/*distance + page[i].pointsText.x*/, time);
	}
}
function setPageX(index, x){
	if(page[index] != null){
		page[index].body.x = x;
		page[index].stars.body.x = x;
//		page[index].lock.body.x = x;
		page[index].number.x = x + pageWidth/2;
		page[index].number.anchor.setTo(0.5,0.5);
		page[index].pointsText.x = x + pageWidth/2;
		page[index].pointsText.anchor.setTo(0.5,0);		
	}
}
function setPapers(isWithPapersInWorld){
	leftPaper = leftScrol.body.x+leftScrol.body.width/4;
	rightPaper = rightScrol.body.x+18;
	widthPaper = rightPaper - leftPaper;
	numSpots = parseInt(widthPaper/(pageWidth+spaceBetwinPages));
//	if(isWithPapersInWorld){
	setPageX(shiftRightPage,rightPaper - (pageWidth+spaceBetwinPages)*(0));
	for(var i = 0 ; i < numPages ; i++){
		if(i != shiftRightPage){
			var location = page[shiftRightPage].body.x + (shiftRightPage - i)*(pageWidth+spaceBetwinPages);
			setPageX(i,location);			
		}
//		setPageX(i,(PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(shiftRightPage-1-i) - page[shiftRightPage].body.x);
	}		
//	}
//	else{
//		for(var i = 0 ; i <= numSpots ; i++){
//			setPageX(i+1,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(i+1));
//		}
//		for(var i = numSpots ; i < numPages ; i++){
//			setPageX(i+1,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(i) - 10000);
//		}	
//		setPageX(0,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(0) - 10000);
//	}
}
function setSpeedX(pic,dest,time){
	if(pic.endAnimation < game.time.now){
		game.add.tween(pic).to({x: dest}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		pic.endAnimation = time*TIME_INTERVAL + game.time.now;
		return true;
	}
	else{
		return false;
	}
}
function setSpeedY(pic,dest,time){
	if(pic.endAnimation < game.time.now){
		game.add.tween(pic).to({y: dest}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
		pic.endAnimation = time*TIME_INTERVAL + game.time.now;		
	}
}
function setStatistics(){
	leftPaper = leftScrol.body.x + leftScrol.body.width - (pageWidth+spaceBetwinPages);
	rightPaper = rightScrol.body.x+28 + (pageWidth+spaceBetwinPages);
	widthPaper = rightPaper - leftPaper;
	numSpots = parseInt(widthPaper/(pageWidth+spaceBetwinPages)); 
}
function setUndoButton(check){
	if(backOn == null){
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
	    enableClick(backOn, undoClick);
	    backOff.scale.setTo(0.5, 0.5); // 50% of the source image size     
	}
	else{
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
}



function _____QUESTIONS_____(){}
function is2TorahsAndFrontDone(toDown){
	if(torahFront == null){
		return false;
	}
	else{
		return torahFront.endAnimation < game.time.now && torahFront.endAnimation != 0;
		if(toDown){
			return (torahFront.body.y + bigTorahHeight/2 < game.world.height/2 -10);
		}
		else{
			return (torahFront.body.y < -bigTorahHeight + 20);
		}
	}
}
function is3TorahDone(toDown){
	if(bigTorah != null){
		return bigTorah.endAnimation < game.time.now && bigTorah.endAnimation != 0;
//		if(toDown){
//			return (bigTorah.body.y >= game.world.height/2-BIG_TORAH_HEIGHT/2);
//		}
//		else{
//			return (bigTorah.body.y <= -BIG_TORAH_HEIGHT);
//		}
	}
	return false;
}
function isAnimationDone(pic){
	if(pic != null){
		return pic.endAnimation < game.time.now && pic.endAnimation != 0;		
	}
	return true;
}
function isBigTorahIsInItsPlace(){
	return (bigTorah.body.x == (game.world.width-bigTorahWidth)/2);
}
function isDidntGotToBegineOfTorah(){
	return(shiftRightPage > 0);
}
function isItsTimeToBringFrontDowm(){
	if(rightScrol != null){
		return (rightScrol.body.x - (leftScrol.body.x + bigTorahWidth/2) < 200);		
	}
	else{
		return false;
	}
}
function isLevelIsNotOnItsPlace(){
	return (numPages - shiftRightPage-1 > numSpots && currLevel > shiftRightPage+1);
}
function isMoving(pic){
	if(pic != null){
		return pic.endAnmation > game.time.now;
	}
	return false;
}
function isNowStopScrolers(stopOpening){
	if(leftScrol != null){
		return leftScrol.endAnimation < game.time.now && leftScrol.endAnimation != 0;
//		if(stopOpening){
//			return leftScrol.body.x <= STOP_SCROL_LOC;
//		}
//		else{
//			return (leftScrol.body.x + torahFront.body.width/2 >= rightScrol.body.x);
//		}
	}
	return false;
}
function isPageDoneMoveOneStep(inRightSide){
	return page[1].endAnimation < game.time.now;
//	if(inRightSide){
//		return (rightPaper - page[shiftRightPage].body.x < page[0].body.width + 90);
//	}
//	else{
//		return (rightPaper - page[shiftRightPage].body.x < page[0].body.width + 90);
//	}
}
function isSmallGotToMiddle(smallTorah){
	return (smallTorah.body.x < game.world.width/2 + bigTorahWidth/2 + 1 && game.world.width/2 - bigTorahWidth/2 - 1 < smallTorah.body.x);
}
function isThereEnoughSpots(){
	return (numSpots < numPages - shiftRightPage);
}
function isTorahOpen(){
	if(leftScrol != null){
		return (leftScrol.body.x + torahFront.body.width/2 < rightScrol.body.x - 10);
	}
	return false;
}

function _____SMALL_FUNCTIONS_____(){}
function bringToTop(pic){
	if(pic != null){
		pic.bringToTop();
	}
}
function bringAllToTop(){
	bringToTop(rightScrol);
	bringToTop(leftScrol);
	bringToTop(backOn);
	bringToTop(backOff);
	bringToTop(rightArrow);
	bringToTop(leftArrow);
	bringToTop(torahFront);
	bringToTop(rightTorah);
	bringToTop(leftTorah);
	bringToTop(bigTorah);
}
function cancleClick(pic){
	if(pic != null){
		pic.inputEnabled = false;		
	}
}
function checkAnimations(){
	return (isAnimationDone(page[1]) &&
			isAnimationDone(bigTorah) &&
			isAnimationDone(leftTorah) &&
			isAnimationDone(leftScrol) &&
			isAnimationDone(torahFront));
}
function createPages(){
    var levelSplit = [];
    if(levels == "") {
        levels = "0";
    }
    levelSplit = ("0,0,"+levels).split(",");
    console.log(levelSplit.length);
    console.log(levelSplit);
    var i = 0;
    for (; i < numPages && i < levelSplit.length; i++) {
        var index = Math.min(parseInt(parseInt(levelSplit[i]) / 1000), 2) + 1;
        alert(index.toString());
        page[i] = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'page',0);
        page[i].endAnimation = 0;
        page[i].stars = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'star'+index,0);
        page[i].stars.endAnimation = 0;
        if (i==0) {
            kill(page[i].stars);
            page[i].stars = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'star0',0);
            page[i].stars.endAnimation = 0;
            continue;
        }
        page[i].level = i-1;
        page[i].number = game.add.text(page[i].body.x + pageWidth/2,page[i].body.y + pageHeight/2,""+page[i].level, styleLevel);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].points = parseInt(levelSplit[i]);//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
        console.log("lvl. score: " + levelSplit[i]);
        page[i].pointsText = game.add.text(page[i].body.x + pageWidth/2,page[i].body.y + 10,""+page[i].points, stylePoints);
        page[i].pointsText.anchor.setTo(0.5,0);
    }
    alert("i is " + i.toString());
    var once = false;
    for(; i < numPages ; i++){
        var index = (!once)?0:-1;//parseInt(Math.random()*4);
        once = true;
        page[i] = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'page',0);
        page[i].endAnimation = 0;
        page[i].stars = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'star'+index,0);
        page[i].stars.endAnimation = 0;
        if(i==0){
            kill(page[i].stars);
            page[i].stars = game.add.sprite(-200,game.world.height/2-pageHeight/2-15,'star0',0);
            page[i].stars.endAnimation = 0;
        }
        page[i].level = i-1;
        page[i].number = game.add.text(page[i].body.x + pageWidth/2,page[i].body.y + pageHeight/2,""+page[i].level, styleLevel);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].points = "";//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
        page[i].pointsText = game.add.text(page[i].body.x + pageWidth/2,page[i].body.y + 10,""+page[i].points, stylePoints);
        page[i].pointsText.anchor.setTo(0.5,0);
//		if(page[i].level > currLevel){
//			page[i].lock = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-15,'lock',0);
//		}
//		else{
//			page[i].lock = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-15,'unlock',0);
//		}
    }
}
function enable3TorahClick(){
	enableClick(bigTorah,bigTorahClick);
	enableClick(leftTorah,leftTorahClick);
	enableClick(rightTorah,rightTorahClick);
}
function enableClick(pic,func){
	if(pic != null){
		pic.inputEnabled = true;
		pic.events.onInputDown.add(func,this);		
	}
}
function enableLevels(check){
	if(check){
		for(var i = 1 ; i < numPages ; i++){
	        page[i].inputEnabled = true;
	        page[i].events.onInputDown.add(goTopage, this);
		}				
	}
	else{
		for(var i = 1 ; i < numPages ; i++){
	        page[i].inputEnabled = false;
		}					
	}
}
function fix2Scrolers(){
    leftScrol.body.x = (game.world.width-bigTorahWidth)/2;			
    rightScrol.body.x = game.world.width/2-1;
}
function fixNumbers(){
	for(var i = 0 ; i < numPages ; i++){
		if(page[i] != null){
			var x = page[i].body.x;
			page[i].number.x = x + pageWidth/2;
			page[i].number.anchor.setTo(0.5,0.5);
			page[i].pointsText.x = x + pageWidth/2;
			page[i].pointsText.anchor.setTo(0.5,0);
		}
	}
}
function followAfterPage(){
	if(prevShiftPageLoc != page[shiftRightPage].body.x){
		prevShiftPageLoc = page[shiftRightPage].body.x;
		var x = (pageWidth +spaceBetwinPages)*shiftRightPage;
		for(var i = 0 ; i < numPages ; i++,x-=(pageWidth +spaceBetwinPages)){
			if(i != shiftRightPage){
				setPageX(i,x);			
			}
		}
	}
}
function followBackgroundAfterScrolers(){
	if(leftScrol != null){
		if(prevLeftScrolLocation != leftScrol){
			kill(hideLeft);
//			kill(hideRight);
			if(rightScrol != null){
				hideLeft = game.add.tileSprite(0, 0, leftScrol.body.x + 40, game.world.height, 'background');
//				hideRight = game.add.sprite(0, 0, 'background');
//                hideRight.crop.width = w - 40;
                if (game.width - hideRight.x > 110) {
                    hideRight.x = rightScrol.x + 20;
                    hideRight.crop.x = rightScrol.x + 20;
                }
			}
		}
	}
	else{
		//hideLeft = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	}
	bringAllToTop();
}function goTopage (img) {
//	alert('go to level '+img.level);
	levelClicked = img.level;
    $.get( "../start-level/?level=" + img.level.toString(), function( data ) {
        // do nothing
        alert('start level ' + img.level);
    });
	game.state.start('shopState', true, true);
}
function initialBigTorah(inWrold){
	kill(bigTorah);
	kill(torahFront);
	if(inWrold){
		bigTorah = game.add.sprite((game.world.width-bigTorahWidth)/2,game.world.height/2-bigTorahHeight/2, 'torah', 0);
		bigTorah.endAnimation = 0;
	    enableClick(bigTorah, bigTorahClick);

	}
	else{
		bigTorah = game.add.sprite((game.world.width-bigTorahWidth)/2, -bigTorahHeight, 'torah', 0);		
		bigTorah.endAnimation = 0;
	}
}
function initialFront(inWorld){
	kill(torahFront);
	kill(bigTorah);
	if(inWorld){
	    torahFront = game.add.sprite((game.world.width-bigTorahWidth)/2, (game.world.height-bigTorahHeight)/2, 'torahFront', 0);
	    torahFront.endAnimation = 0;
	}
	else{
	    torahFront = game.add.sprite((game.world.width-bigTorahWidth)/2, (-bigTorahHeight), 'torahFront', 0);
	    torahFront.endAnimation = 0;
	}
}
function initialSmallTorahs(inWorld){
	kill(rightTorah);
	kill(leftTorah);
	if(inWorld){
	    rightTorah = game.add.sprite(game.world.width-smallTorahWidth-100, (game.world.height-smallTorahHeight)/2, 'torah', 0);	
//	    rightTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    rightTorah.endAnimation = 0;
	    enableClick(rightTorah, rightTorahClick);
	    leftTorah = game.add.sprite(100, (game.world.height-smallTorahHeight)/2, 'torah', 0);
//	    leftTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    leftTorah.endAnimation = 0;
	    enableClick(leftTorah, leftTorahClick);
	}
	else{
	    rightTorah = game.add.sprite(game.world.width-smallTorahWidth-100, (-smallTorahHeight-bigTorahHeight)/2, 'torah', 0);	
//	    rightTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    rightTorah.endAnimation = 0;
	    leftTorah = game.add.sprite(100, (-smallTorahHeight-bigTorahHeight)/2, 'torah', 0);
//	    leftTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    leftTorah.endAnimation = 0;		
	}
}
function kill(pic){
	if(pic != null){
		pic.kill();
		pic == null;		
	}
}

function putArrows(isToPut){
	kill(leftArrow);
	kill(rightArrow);
	if(isToPut){
		leftArrow = game.add.sprite(leftScrol.body.x+25,page[0].body.y+pageHeight/3, 'leftArrow', 0);	
		enableClick(leftArrow,leftArrowClick);
		leftArrow.endAnimation = 0;
		rightArrow = game.add.sprite(rightScrol.body.x+20,page[0].body.y+pageHeight/3, 'rightArrow', 0);
		enableClick(rightArrow,rightArrowClick);
		rightArrow.endAnimation = 0;
	}
}

function switchRight () {
	if(isAnimationDone(bigTorah) == false){
		setSpeedX(bigTorah, rightTorah.body.x, switchTime);
		setSpeedX(rightTorah, bigTorah.body.x, switchTime);
		return false;
	}
	else if(isMoving(rightTorah)){
		return false;
	}
	else{
		initialBigTorah(true);
		initialSmallTorahs(true);
		return true;
	}
//	alert("switch right!!!");
}
function switchLeft () {
	if(isAnimationDone(bigTorah) == false){
		setSpeedX(bigTorah, leftTorah.body.x, switchTime);
		setSpeedX(leftTorah, bigTorah.body.x, switchTime);
		return false;
	}
	else if(isMoving(leftTorah)){
		return false;
	}
	else{
		initialBigTorah(true);
		initialSmallTorahs(true);
		return true;
	}
}


function _____TRASH_____(){}
function scrolToPage(indexPage){
	rightPaper = rightScrol.body.x + (pageWidth+spaceBetwinPages);
	var distance = rightPaper + 10 - page[indexPage].body.x;
	var time = Math.abs(runTime*distance/(pageWidth+spaceBetwinPages));
	shiftRightPage = indexPage;
	setPageVelocityX(distance, time);
}
function setSizeOfRightTorah(){
	if(isMoving(rightTorah)){
		var distance = rightTorah.body.x - game.world.width/2 + smallTorahWidth/2;
		var diff = (distance - constDisSmall)/(constDisSmall*2)+0.5;
		rightTorah.scale.setTo(diff,diff);
		diff = 1.5 - diff;
		bigTorah.scale.setTo(diff,diff);
		rightTorah.body.y = (game.world.height - rightTorah.body.height)/2; 
		bigTorah.body.y = (game.world.height - bigTorah.body.height)/2; 		
	}
}
function setSizeOfLeftTorah(){
	if(isMoving(leftTorah)){
		var distance = game.world.width/2 - LeftTorah.body.x - smallTorahWidth/2; 
		var diff = (distance - constDisSmall)/(constDisSmall*2) + 0.5;
		LeftTorah.scale.setTo(diff,diff);
		diff = 1.5 - diff;
		bigTorah.scale.setTo(diff,diff);
		LeftTorah.body.y = (LeftTorah.body.height - game.world.height)/2; 
		bigTorah.body.y = (game.world.height - bigTorah.body.height)/2;
	}
}
