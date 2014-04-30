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
var didOpen = false;
var didCloseTorah = false;
var backOn = null, backOff = null;
var isDidBringUp = false;
var isDidSwitchPerek = false;
var isDidBringDownFront = false;
var innerState = 'closeTorah';
var didStartSwitchPerek = false;
var SWITCH_PEREK_TIME = 1;
var isSwitchedBefore = false;
var prevShiftPageLoc = 0;
var countLeftClick = 0;
var countRightClick = 0;
var prevLeftScrolLocation = 0;
var hideLeft = null, hideRight = null;
var DOWN_TIME = 1, UP_TIME = 1, RUN_TIME = 0.3, SCROL_TIME = 1, SCROL_PAGE_TIME = 0.3,SWITCH_TIME = 1;
var isSomthingMoves = false, TIME_INTERVAL = 1000;
var bigTorah = null, leftTorah = null, rightTorah = null,nextTorah = null;
var BIG_TORAH_WIDTH = 164;
var BIG_TORAH_HEIGHT=450;
var SMALL_TORAH_WIDTH = 164,SMALL_TORAH_HEIGHT=450;
var PAGE_HEIGHT = 230, PAGE_WIDTH = 82;
var state = 'first';
var torahFront = null, leftScrol = null, rightScrol = null;
var scrolOpen = false;
var leftPaper, rightPaper, widthPaper, numSpots, page = [], numPages = psukim.length+2;//numPages need to be: numPasukimg+2 (for empty Pages)
var step = 0;
var nowOpenningScrol = false;
var nowClosingScrol = false;
var currLevel = 1;
var countScrolToLevel = 0;
var STYLE_LEVEL = { font: "60px Arial", fill: "#000000", align: "center" };
var STYLE_POINTS = { font: "20px Arial", fill: "#0000ff", align: "center" };
var leftArrow = null, rightArrow = null;
var doubleLeftArrow = null, doubleRightArrow = null;
var enabled = false;
var SPACE_BETWEEN_PAGES = 3;
var done = false;
var shiftRightPage = currLevel;
var STOP_SCROL_LOC = 75;
var numPageAvailable = 9;
var DISTANCE_SMALL;
var levelClicked = 1;
var background;

chooseGameState = {
    preload: function () {
        DISTANCE_SMALL = game.world.width/2 - STOP_SCROL_LOC;
        backOn = null;
        backOff = null;
        isDidBringUp = false;
        isDidSwitchPerek = false;
        isDidBringDownFront = false;
        innerState = 'closeTorah';
        didStartSwitchPerek = false;
        isSwitchedBefore = false;
        prevShiftPageLoc = 0;
        countLeftClick = 0;
        countRightClick = 0;
        prevLeftScrolLocation = 0;
        hideLeft = null;
        hideRight = null;
        isSomthingMoves = false;
        bigTorah = null;
        leftTorah = null;
        didOpen = false;
        rightTorah = null;
        didCloseTorah = false;
        nextTorah = null;
        state = 'first';
        torahFront = null;
        leftScrol = null;
        rightScrol = null;
        scrolOpen = false;
        page = [];
        numPages = psukim.length + 2;
        step = 0;
        nowOpenningScrol = false;
        nowClosingScrol = false;
        countScrolToLevel = 0;
        leftArrow = null;
        rightArrow = null;
        doubleLeftArrow = null;
        doubleRightArrow = null;
        enabled = false;
        done = false;
        numPageAvailable = 9;
        if(currLevel + numPageAvailable >= numPages){
            shiftRightPage = numPages - numPageAvailable - 1;
        }
        else{
            shiftRightPage = currLevel;
        }
        levelClicked = 1;
},

create: function() {
    currLevel = currentLevel;
    if(currLevel + numPageAvailable >= numPages){
        shiftRightPage = numPages - numPageAvailable;
    }
    else{
        shiftRightPage = currLevel;
    }
//    alert(shiftRightPage);
	game.stage.backgroundColor = '#fff';
	background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	createPages();
	enableLevels(false);
	hideLeft = game.add.tileSprite(0, 0, game.world.width/2 - BIG_TORAH_WIDTH/4, game.world.height, 'background');
//    hideRight = game.add.sprite(0, 0, 'background'); //game.add.tileSprite(game.world.width/2 + BIG_TORAH_WIDTH/4, 0, game.world.width, game.world.height, 'background');
//    hideRight.cropEnabled = true;
//    hideRight.crop.width = game.world.width/2 - BIG_TORAH_WIDTH/4;
//    hideRight.crop.height = game.world.height;
//    hideRight.crop.x = game.world.width/2 + BIG_TORAH_WIDTH/4;
//    hideRight.x = game.world.width/2 + BIG_TORAH_WIDTH/4;
//	setUndoButtonC(false);
	initialBigTorah(false);
	initialSmallTorahs(false,false);
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
	case 'undoClickC':
		undoClickC();
		break;
	}
}
};

function _____MAIN_____(){}
function first(){
//    setUndoButtonC(false);
	if(bringDown3Torahs() == false);
	else{
//        setUndoButtonC(true);
		state = '3TorahClose';
	}		
}
function bigTorahClick(){
//    alert(state);
	state = 'bigTorahClick';
//    setUndoButtonC(false);
    if(innerState == 'closeTorah'){innerState = 'bringUp2';}
	else if(innerState == 'bringUp2' && bringUp2AndFront() == false);
    else if(innerState == 'bringUp2'){innerState = 'openTorah';}
	else if(innerState == 'openTorah' && openTorah() == false);
	else{
        innerState = 'closeTorah';
//        setUndoButtonC(true);
		state = 'torahOpen';
	}
}
function leftTorahClick(){
	state = 'leftTorahClick';
//    setUndoButtonC(false);
	if(switchLeft() == false);
	else{
//        setUndoButtonC(true);
		state = '3TorahClose';
	}
}
function rightTorahClick(){
	state = 'rightTorahClick';
//    setUndoButtonC(false);
	if(switchRight() == false);
	else{
//        setUndoButtonC(true);
		state = '3TorahClose';
	}
}
function leftArrowClick(){
	countLeftClick++;
	state = 'leftArrowClick';
//    setUndoButtonC(false);
	scrolLeft();
	if(countLeftClick<=0){
//        setUndoButtonC(true);
		state = 'torahOpen';
	}
}
function rightArrowClick(){
	countRightClick++;
	state = 'rightArrowClick';
//    setUndoButtonC(false);
	scrolRight();
	if(countRightClick<=0){
//        setUndoButtonC(true);
		state = 'torahOpen';
	}
}
function doubleLeftArrowClick(){
	state = 'doubleLeftArrowClick';
//    setUndoButtonC(false);
    if(innerState == 'closeTorah' && closeTorah() == false);
    else if(innerState == 'closeTorah'){innerState = 'bringDownFront';}
    else if(innerState == 'bringDownFront' && bringDownOnlyFront() == false);
    else if(innerState == 'bringDownFront'){innerState = 'switchPerek';}
    else if(innerState == 'switchPerek' && switchTorahToLeftPerek() == false);
    else if(innerState == 'switchPerek'){innerState = 'bringUpCover';}
    else if(innerState == 'bringUpCover' && bringUpOnlyFront() == false);
    else if(innerState == 'bringUpCover'){innerState = 'openTorah';}
    else if(innerState == 'openTorah' && openTorah() == false);
    else{
        innerState = 'closeTorah';
//        setUndoButtonC(true);
	    state = 'torahOpen';
    }
//	console.log('switch to next season!');
}
function doubleRightArrowClick(){
	state = 'doubleRightArrowClick';
//    setUndoButtonC(false);
    if(innerState == 'closeTorah' && closeTorah() == false);
    else if(innerState == 'closeTorah'){innerState = 'bringDownFront';}
    else if(innerState == 'bringDownFront' && bringDownOnlyFront() == false);
    else if(innerState == 'bringDownFront'){innerState = 'switchPerek';}
    else if(innerState == 'switchPerek' && switchTorahToRightPerek() == false);
    else if(innerState == 'switchPerek'){innerState = 'bringUpCover';}
    else if(innerState == 'bringUpCover' && bringUpOnlyFront() == false);
    else if(innerState == 'bringUpCover'){innerState = 'openTorah';}
    else if(innerState == 'openTorah' && openTorah() == false);
    else{
        innerState = 'closeTorah';
//        setUndoButtonC(true);
	    state = 'torahOpen';
    }
//	console.log('switch to next season!');
}
function undoClickC(){
//    setUndoButtonC(false);
    if(state != 'undoClickC'){
        undoState = state;
        state = 'undoClickC';
    }
    switch(undoState){
        case 'torahOpen':
            if(innerState == 'closeTorah' && closeTorah() == false);
            else if(innerState == 'closeTorah'){innerState = 'bringDown2';}
            else if(innerState == 'bringDown2' && bringDown2AndFront() == false);
            else{
                innerState = 'closeTorah';
                state = '3TorahClose';
//                setUndoButtonC(true);
            }
            break;
        case '3TorahClose':
            if(bring3TorahsBack() == false);
            else{
                alert('go back to prev page');
                deleteAllImg();
//                setUndoButtonC(true);
                state = 'exit';
            }
            break;
    }
}

function _____BIG_FUNCTIONS_____(){}
function bring3TorahsBack(){
	enableLevels(false);
	cancleClick(bigTorah);
	cancleClick(leftTorah);
	cancleClick(rightTorah);
	if(is3TorahDone(false) == false){
		set3TorahsVelocityY(UP_TIME,-bigTorah.body.height,-leftTorah.body.height);
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
		initialFront(false);
        //kill(torahFront);
        //torahFront = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, -BIG_TORAH_HEIGHT, 'torahFront', 0);
	    //torahFront.endAnimation = 0;
		initialSmallTorahs(false,false);
//		var bigLocY = game.world.height/2 - BIG_TORAH_HEIGHT/2;
		var smallLocY = game.world.height/2 - SMALL_TORAH_HEIGHT/2;
//        alert(game.world.height/2 - BIG_TORAH_HEIGHT/2+","+(torahFront == null));
        setSpeedY(torahFront,smallLocY,DOWN_TIME);
       	setSpeedY(leftTorah,smallLocY,DOWN_TIME);
	    setSpeedY(rightTorah,smallLocY,DOWN_TIME);

//		set2TorahAndFrontVelocityY(DOWN_TIME*10, bigLocY, smallLocY);
		return false;
	}
	else if(torahFront.endAnimation > game.time.now){//{is2TorahsAndFrontDone(true) == false){
 //       alert(torahFront.body.x+","+torahFront.body.y);
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
		set3TorahsVelocityY(DOWN_TIME,game.world.height/2-bigTorah.height/2,game.world.height/2-rightTorah.height/2);
		return false;
	}
	else{
		initialBigTorah(true);//fix the location of bigTorah
		enable3TorahClick();
		return true;
	}
}
function bringUpOnlyFront(){
	if(isDidBringUp == false){
        isDidBringUp = true;
        fix2Scrolers();
	    initialFront(true);
	    setPapers(true);
        setSpeedY(torahFront,-BIG_TORAH_HEIGHT,UP_TIME);
		return false;
	}
	else if(torahFront.endAnimation > game.time.now) {
		return false;
	}
	else{
 		kill(torahFront);
        isDidBringUp = false;
		return true;
	}

}
function bringUp2AndFront(){
	if(isDidBringUp == false){
        isDidBringUp = true;
		cancleClick(leftTorah);
		cancleClick(rightTorah);
        fix2Scrolers();
	    initialFront(true);
		kill(bigTorah);
		return false;
	}
	else if(is2TorahsAndFrontDone(false) == false) {
//		alert(2);
		set2TorahAndFrontVelocityY(UP_TIME,-BIG_TORAH_HEIGHT,-SMALL_TORAH_HEIGHT);
		return false;
	}
	else{
//		alert(3);
		kill(torahFront);
		kill(leftTorah);
		kill(rightTorah);
        isDidBringUp = false;
		return true;
	}
}
function closeTorah(){
	if(didCloseTorah == false){//isAnimationDone(leftScrol) == true && isTorahOpen()){
        didCloseTorah = true;
		putArrows(false);
		enableLevels(false);
		setSpeedX(leftScrol, game.world.width/2-leftScrol.body.width, SCROL_TIME);
		setSpeedX(rightScrol, game.world.width/2, SCROL_TIME);
		setPapers(false);
		return false;
	}
	else if(isTorahOpen()){
		return false;
	}
	else{
//        alert('done close');
		fix2Scrolers();
        didCloseTorah = false;
        kill(torahFront);
	    return true;
	}
}
function openTorah(){
	enableLevels(true);
	if(didOpen == false){//isNowStopScrolers(true) == false){
		setSpeedX(leftScrol, STOP_SCROL_LOC, SCROL_TIME);
		setSpeedX(rightScrol, game.world.width - STOP_SCROL_LOC - rightScrol.body.width, SCROL_TIME);
		setPapers(true);
        didOpen = true;
		return false;
	}
    else if(leftScrol.endAnimation > game.time.now){
		setPapers(true);
        return false;
    }
	else{
//        alert('done open torah');
		setPapers(true);
		putArrows(true);
		enableLevels(true);
        didOpen = false;
		return true;
	}
}
function switchTorahToLeftPerek(){
    if(isDidSwitchPerek == false){
        initialNextTorah(true);
        isDidSwitchPerek = true;
        setSpeedX(nextTorah,game.world.width/2-BIG_TORAH_WIDTH/2,SWITCH_PEREK_TIME);
        setSpeedX(bigTorah,game.world.width,SWITCH_PEREK_TIME);
        return false;
    }
    else if(bigTorah.endAnimation > game.time.now){
        return false;
    }
    else{
 //       alert(nextTorah.body.x);
        isDidSwitchPerek = false;
        initialBigTorah(true);
        kill(nextTorah);
        return true;
    }
}
function switchTorahToRightPerek(){
    if(isDidSwitchPerek == false){
        setPapers(false);
        initialNextTorah(false);
        isDidSwitchPerek = true;
        setSpeedX(nextTorah,game.world.width/2-BIG_TORAH_WIDTH/2,SWITCH_PEREK_TIME);
        setSpeedX(bigTorah,-BIG_TORAH_WIDTH,SWITCH_PEREK_TIME);
        return false;
    }
    else if(bigTorah.endAnimation > game.time.now){
        return false;
    }
    else{
 //       alert(nextTorah.body.x);
        isDidSwitchPerek = false;
        initialBigTorah(true);
        kill(nextTorah);
        return true;
    }
}
function bringDownOnlyFront(){
    if(isDidBringDownFront == false){
//        alert('start');
        isDidBringDownFront = true;
        initialFront(false);
        fix2Scrolers();
        setSpeedY(torahFront,leftScrol.body.y,DOWN_TIME);
        return false;
    }
    else if(torahFront.endAnimation > game.time.now){
        return false;
    }
    else{
     //   alert('done');
        initialBigTorah(true);
        kill(leftScrol);
        kill(rightScrol);
        kill(torahFront);
        isDidBringDownFront = false;
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
//	cancleClick(doubleRightArrow);
//	cancleClick(doubleLeftArrow);
}
function enableClickArrows(){
    enableClick(rightScrol,rightArrowClick);
    enableClick(leftScrol,leftArrowClick);
    enableClick(rightArrow,rightArrowClick);
    enableClick(leftArrow,leftArrowClick);
//    enableClick(doubleRightArrow,doubleRightArrowClick);
//    enableClick(doubleLeftArrow,doubleLeftArrowClick);
}
function scrolPages(numSteps){
	cancleClickArrows();
	if(shiftRightPage + numSteps < numPages - numPageAvailable + 1 && shiftRightPage + numSteps > 1 && isMoving(page[shiftRightPage]) == false){
		rightPaper = rightScrol.body.x + (PAGE_WIDTH+SPACE_BETWEEN_PAGES);
		var distance = numSteps*(PAGE_WIDTH+SPACE_BETWEEN_PAGES);
		var time = Math.abs(RUN_TIME*Math.abs(numSteps));
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
function setPageVelocityX(distance,time){
	for(var i = 2 ; i < numPages; i++){
		setSpeedX(page[i],distance + page[i].body.x,time);
		setSpeedX(page[i].stars,distance + page[i].stars.body.x,time);
		//TODO
//		setSpeedX(page[i].lock,distance + page[i].lock.body.x,time);
		setSpeedX(page[i].number,distance + page[i].number.x,time);
		setSpeedX(page[i].pointsText,120/*distance + page[i].pointsText.x*/,time);
	}
}
function setPageX(index,x){
	if(page[index] != null){
        if(index != 0){
            page[index].body.x = x;
            page[index].stars.body.x = x;
    //		page[index].lock.body.x = x;
            page[index].number.x = x + PAGE_WIDTH/2;
            page[index].number.anchor.setTo(0.5,0.5);
            page[index].pointsText.x = x + PAGE_WIDTH/2;
            page[index].pointsText.anchor.setTo(0.5,0.5);
        }
	}
}
function setPapers(isWithPapersInWorld){
	if(isWithPapersInWorld){
        leftPaper = leftScrol.body.x+leftScrol.body.width/4;
        rightPaper = rightScrol.body.x - PAGE_WIDTH+20;
        widthPaper = rightPaper - leftPaper;
        numSpots = parseInt(widthPaper/(PAGE_WIDTH+SPACE_BETWEEN_PAGES));
        setPageX(shiftRightPage,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(0));
        if(shiftRightPage == 1){
            setPageX(shiftRightPage,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(-1));
            for(var i = 1 ; i < numPages ; i++){
                if(i < shiftRightPage && (rightScrol.body.x < game.width - STOP_SCROL_LOC - PAGE_WIDTH*2 || rightScrol.endAnimation > game.time.now)){
                    setPageX(i,-PAGE_WIDTH);
                }
                else {
                    var location = page[shiftRightPage].body.x + (shiftRightPage - i)*(PAGE_WIDTH+SPACE_BETWEEN_PAGES);
                    setPageX(i,location);
                }
        //		setPageX(i,(PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(shiftRightPage-1-i) - page[shiftRightPage].body.x);
            }
            setPageX(1,-PAGE_WIDTH);
        }
        else{
            for(var i = 0 ; i < numPages ; i++){
                if(i < shiftRightPage && (rightScrol.body.x < game.width - STOP_SCROL_LOC - PAGE_WIDTH*2 || rightScrol.endAnimation > game.time.now)){
                    setPageX(i,-PAGE_WIDTH);
                }
                else {
                    var location = page[shiftRightPage].body.x + (shiftRightPage - i)*(PAGE_WIDTH+SPACE_BETWEEN_PAGES);
                    setPageX(i,location);
                }
        //		setPageX(i,(PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(shiftRightPage-1-i) - page[shiftRightPage].body.x);
            }
        }
	}
	else{
        for(var i = 0 ; i < numPages ; i++){
            setPageX(i,-PAGE_WIDTH);
        }
	}
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
	leftPaper = leftScrol.body.x + leftScrol.body.width - (PAGE_WIDTH+SPACE_BETWEEN_PAGES);
	rightPaper = rightScrol.body.x+28 + (PAGE_WIDTH+SPACE_BETWEEN_PAGES);
	widthPaper = rightPaper - leftPaper;
	numSpots = parseInt(widthPaper/(PAGE_WIDTH+SPACE_BETWEEN_PAGES));
}
function setUndoButtonC(check){
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



function _____QUESTIONS_____(){}
function is2TorahsAndFrontDone(toDown){
	if(torahFront == null){
		return false;
	}
	else{
		return torahFront.endAnimation < game.time.now && torahFront.endAnimation != 0;
		if(toDown){
			return (torahFront.body.y + BIG_TORAH_HEIGHT/2 < game.world.height/2 -10);
		}
		else{
			return (torahFront.body.y < -BIG_TORAH_HEIGHT + 20);
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
	return (bigTorah.body.x == (game.world.width-BIG_TORAH_WIDTH)/2);
}
function isDidntGotToBegineOfTorah(){
	return(shiftRightPage > 0);
}
function isItsTimeToBringFrontDowm(){
	if(rightScrol != null){
		return (rightScrol.body.x - (leftScrol.body.x + BIG_TORAH_WIDTH/2) < 200);
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
	return (smallTorah.body.x < game.world.width/2 + BIG_TORAH_WIDTH/2 + 1 && game.world.width/2 - BIG_TORAH_WIDTH/2 - 1 < smallTorah.body.x);
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
//	bringToTop(backOn);
//	bringToTop(backOff);
	bringToTop(rightScrol);
	bringToTop(leftScrol);
	bringToTop(rightArrow);
	bringToTop(leftArrow);
//	bringToTop(doubleRightArrow);
//	bringToTop(doubleLeftArrow);
	bringToTop(rightTorah);
	bringToTop(leftTorah);
	bringToTop(bigTorah);
    bringToTop(nextTorah);
	bringToTop(torahFront);
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
function killPage(i){
    if(page != null && page[i] != null){
    kill(page[i].stars);
    destroy(page[i].number);
    destroy(page[i].pointsText);
    kill(page[i]);

    }
}
function createPages(){
    var levelSplit = ("0,0").split(",");
    if(levels != "") {
        levelSplit = ("0,0,"+levels).split(",");
    }
    var i = 0;
    for (; i < numPages && i < levelSplit.length; i++) {
        var index = Math.min(parseInt(parseInt(levelSplit[i]) / 3000), 2) + 1;
        page[i] = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'page',0);
        page[i].endAnimation = 0;
        page[i].stars = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'star'+index,0);
        page[i].stars.endAnimation = 0;
        if(index == -1){
            page[i].isLocked = false;
        }
        else{
            page[i].isLocked = false;
        }
        if (i==0) {
            kill(page[i].stars);
            page[i].stars = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'star0',0);
            page[i].stars.endAnimation = 0;
        }
        page[i].level = i-1;
        page[i].number = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + PAGE_HEIGHT/2,""+page[i].level, STYLE_LEVEL);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].points = parseInt(levelSplit[i]);//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
        console.log("lvl." + (i - 1).toString() + " score: " + levelSplit[i]);
        page[i].pointsText = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + 20,""+page[i].points, STYLE_POINTS);
        page[i].pointsText.anchor.setTo(0.5,0);
    }
    var once = false;
    for(; i < numPages ; i++){
        var index = (!once)?0:-1;//parseInt(Math.random()*4);
        once = true;
        page[i] = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'page',0);
        page[i].endAnimation = 0;
        if(index == -1){
            page[i].isLocked = true;
        }
        else{
            page[i].isLocked = false;
        }
        page[i].stars = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'star'+index,0);
        page[i].stars.endAnimation = 0;
        if(i==0){
            kill(page[i].stars);
            page[i].stars = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'star0',0);
            page[i].stars.endAnimation = 0;
        }
        page[i].level = i-1;
        page[i].number = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + PAGE_HEIGHT/2,""+page[i].level, STYLE_LEVEL);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].points = "";//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
        page[i].pointsText = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + 20,""+page[i].points, STYLE_POINTS);
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
        pic.events.onDown.add(func,this);
        pic.events.isDown.add(func,this);
	}
}
function enableLevels(check){
	if(check){
        var lastUnlocked = 0;
		for(var i = 1 ; i < numPages ; i++){
            if(page[i].isLocked == false){
                lastUnlocked = i;
//    	        page[i].inputEnabled = true;
//	            page[i].events.onInputDown.add(goTopage, this);
            }
		}
        var i = lastUnlocked;
        page[i].inputEnabled = true;
	    page[i].events.onInputDown.add(goTopage, this);
	}
	else{
		for(var i = 1 ; i < numPages ; i++){
	        page[i].inputEnabled = false;
		}					
	}
}
function fix2Scrolers(){
    kill(rightScrol);
    kill(leftScrol);
    leftScrol = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, game.world.height/2-BIG_TORAH_HEIGHT/2, 'leftScrol', 0);
    leftScrol.endAnimation = 0;
//	    enableClick(leftScrol,leftArrowClick);
    rightScrol = game.add.sprite((game.world.width)/2-1, game.world.height/2-BIG_TORAH_HEIGHT/2, 'rightScrol', 0);
    rightScrol.endAnimation = 0;
    setPapers(true);
}
function fixNumbers(){
	for(var i = 0 ; i < numPages ; i++){
		if(page[i] != null){
			var x = page[i].body.x;
			page[i].number.x = x + PAGE_WIDTH/2;
			page[i].number.anchor.setTo(0.5,0.5);
			page[i].pointsText.x = x + PAGE_WIDTH/2;
			page[i].pointsText.anchor.setTo(0.5,0.5);
		}
	}
}
function followAfterPage(){
	if(prevShiftPageLoc != page[shiftRightPage].body.x){
		prevShiftPageLoc = page[shiftRightPage].body.x;
		var x = (PAGE_WIDTH +SPACE_BETWEEN_PAGES)*shiftRightPage;
		for(var i = 0 ; i < numPages ; i++,x-=(PAGE_WIDTH +SPACE_BETWEEN_PAGES)){
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
			kill(hideRight);
            hideRight = game.add.sprite(game.width - STOP_SCROL_LOC - PAGE_WIDTH/2, 0, 'rightBackgroundCut');
			if(rightScrol != null){
				hideLeft = game.add.tileSprite(0, 0, leftScrol.body.x + 40, game.world.height, 'background');
			}
		}
	}
	else{
        kill(hideLeft);
        kill(hideRight);
		hideLeft = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	}
	bringAllToTop();
}
function goTopage (img) {
//	alert('go to level '+img.level);
	levelClicked = img.level;
    $.get( "../start-level/?level=" + img.level.toString(), function( data ) {
        // do nothing
        console.log('start level ' + img.level + " from ../start-level/?level=" + img.level);
    });
    deleteAllImg();
	game.state.start('shopState', true, true);
}
function deleteAllImg(){
    kill(hideLeft);
//    kill(hideRight);
    kill(bigTorah);
    kill(leftTorah);
    kill(rightTorah);
    kill(torahFront);
    kill(leftScrol);
    kill(rightScrol);
    kill(leftArrow);
    kill(rightArrow);
//    kill(doubleLeftArrow);
//    kill(doubleRightArrow);
    for(var i = 0 ; i < page.length ; i++){
        killPage(page[i]);
    }
    kill(background);
    kill(backOn);
    kill(backOff);
}
function initialBigTorah(inWrold){
	kill(bigTorah);
	kill(torahFront);
	if(inWrold){
		bigTorah = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2,game.world.height/2-BIG_TORAH_HEIGHT/2, 'torah', 0);
		bigTorah.endAnimation = 0;
	    enableClick(bigTorah, bigTorahClick);
        setPapers(false);
	}
	else{
		bigTorah = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, -BIG_TORAH_HEIGHT, 'torah', 0);
		bigTorah.endAnimation = 0;
	}
}
function initialNextTorah(isLeft){
    kill(nextTorah);
    if(isLeft){
        nextTorah = game.add.sprite(-BIG_TORAH_WIDTH,game.world.height/2-BIG_TORAH_HEIGHT/2,'torah',0);
        nextTorah.endAnimation = 0;
    }
    else{
        nextTorah = game.add.sprite(game.world.width,game.world.height/2-BIG_TORAH_HEIGHT/2,'torah',0);
        nextTorah.endAnimation = 0;
    }
}
function initialFront(inWorld){
	kill(torahFront);
	kill(bigTorah);
	if(inWorld){
	    torahFront = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, (game.world.height-BIG_TORAH_HEIGHT)/2, 'torahFront', 0);
	    torahFront.endAnimation = 0;
	}
	else{
	    torahFront = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, (-BIG_TORAH_HEIGHT), 'torahFront', 0);
	    torahFront.endAnimation = 0;
	}
}
function initialSmallTorahs(inWorld,enable){
	kill(rightTorah);
	kill(leftTorah);
	if(inWorld){
	    rightTorah = game.add.sprite(game.world.width-SMALL_TORAH_WIDTH-100, (game.world.height-SMALL_TORAH_HEIGHT)/2, 'torah', 0);
//	    rightTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    rightTorah.endAnimation = 0;
	    leftTorah = game.add.sprite(100, (game.world.height-SMALL_TORAH_HEIGHT)/2, 'torah', 0);
//	    leftTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    leftTorah.endAnimation = 0;
	}
	else{
	    rightTorah = game.add.sprite(game.world.width-SMALL_TORAH_WIDTH-100, (-SMALL_TORAH_HEIGHT-BIG_TORAH_HEIGHT)/2, 'torah', 0);
//	    rightTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    rightTorah.endAnimation = 0;
	    leftTorah = game.add.sprite(100, (-SMALL_TORAH_HEIGHT-BIG_TORAH_HEIGHT)/2, 'torah', 0);
//	    leftTorah.scale.setTo(0.5, 0.5); // 50% of the source image size
	    leftTorah.endAnimation = 0;		
	}
    if(enable){
	    enableClick(rightTorah, rightTorahClick);
	    enableClick(leftTorah, leftTorahClick);
    }
}
function kill(pic){
	if(pic != null){
		pic.kill();
		pic == null;		
	}
    pic = null;
}

function putArrows(isToPut){
	kill(leftArrow);
	kill(rightArrow);
//	kill(doubleLeftArrow);
//	kill(doubleRightArrow);
	if(isToPut){
		leftArrow = game.add.sprite(leftScrol.body.x+20,page[0].body.y+PAGE_HEIGHT/3, 'leftArrow', 0);
		enableClick(leftArrow,leftArrowClick);
		leftArrow.endAnimation = 0;
		rightArrow = game.add.sprite(rightScrol.body.x+25,page[0].body.y+PAGE_HEIGHT/3, 'rightArrow', 0);
		enableClick(rightArrow,rightArrowClick);
		rightArrow.endAnimation = 0;
//		doubleLeftArrow = game.add.sprite(leftScrol.body.x+25-60,page[0].body.y+PAGE_HEIGHT/3, 'doubleLeftArrow', 0);
//		enableClick(doubleLeftArrow,doubleLeftArrowClick);
//		doubleLeftArrow.endAnimation = 0;
//		doubleRightArrow = game.add.sprite(rightScrol.body.x+20+60,page[0].body.y+PAGE_HEIGHT/3, 'doubleRightArrow', 0);
//		enableClick(doubleRightArrow,doubleRightArrowClick);
//		doubleRightArrow.endAnimation = 0;
	}
}

function switchRight () {
	if(isAnimationDone(bigTorah) == false){
        cancleClick(bigTorah);
		setSpeedX(bigTorah, rightTorah.body.x, SWITCH_TIME);
		setSpeedX(rightTorah, bigTorah.body.x, SWITCH_TIME);
		return false;
	}
	else if(isMoving(rightTorah)){
		return false;
	}
	else{
		initialBigTorah(true);
		initialSmallTorahs(true,true);
		return true;
	}
}
function switchLeft () {
	if(isAnimationDone(bigTorah) == false){
        cancleClick(bigTorah);
		setSpeedX(bigTorah, leftTorah.body.x, SWITCH_TIME);
		setSpeedX(leftTorah, bigTorah.body.x, SWITCH_TIME);
		return false;
	}
	else if(isMoving(leftTorah)){
		return false;
	}
	else{
		initialBigTorah(true);
		initialSmallTorahs(true,true);
		return true;
	}
}


function _____TRASH_____(){}
function scrolToPage(indexPage){
	rightPaper = rightScrol.body.x + (PAGE_WIDTH+SPACE_BETWEEN_PAGES);
	var distance = rightPaper + 10 - page[indexPage].body.x;
	var time = Math.abs(RUN_TIME*distance/(PAGE_WIDTH+SPACE_BETWEEN_PAGES));
	shiftRightPage = indexPage;
	setPageVelocityX(distance, time);
}
function setSizeOfRightTorah(){
	if(isMoving(rightTorah)){
		var distance = rightTorah.body.x - game.world.width/2 + SMALL_TORAH_WIDTH/2;
		var diff = (distance - DISTANCE_SMALL)/(DISTANCE_SMALL*2)+0.5;
		rightTorah.scale.setTo(diff,diff);
		diff = 1.5 - diff;
		bigTorah.scale.setTo(diff,diff);
		rightTorah.body.y = (game.world.height - rightTorah.body.height)/2; 
		bigTorah.body.y = (game.world.height - bigTorah.body.height)/2; 		
	}
}
function setSizeOfLeftTorah(){
	if(isMoving(leftTorah)){
		var distance = game.world.width/2 - LeftTorah.body.x - SMALL_TORAH_WIDTH/2;
		var diff = (distance - DISTANCE_SMALL)/(DISTANCE_SMALL*2) + 0.5;
		LeftTorah.scale.setTo(diff,diff);
		diff = 1.5 - diff;
		bigTorah.scale.setTo(diff,diff);
		LeftTorah.body.y = (LeftTorah.body.height - game.world.height)/2; 
		bigTorah.body.y = (game.world.height - bigTorah.body.height)/2;
	}
}
