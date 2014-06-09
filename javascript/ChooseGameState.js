/**
 * Created by user on 26/02/14.
 */
/*
 * things we need to do:
 * fix the undo button
 * when we come back to the torah from the game, we go to the next level, and unlock it
 * 
 */
var heartText = null;
var heart = null;
var numLifes = 10;
var setedPagesAfterAnimation = false;
var didCreatePages = false;
var globalEndAnimation = 0;
var contactsLabel;
var CONTACTS_TEXT ="torah2014squash@gmail.com :" +  "להערות ויצירת קשר";
var sumStarsLabel;
var sumStars;
var chapterIndex;
var chapterLabel;
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
var leftPaper, rightPaper, widthPaper, numSpots = 9, page = [], numPages = allPsukim[0].length+1;//numPages need to be: numPasukimg+2 (for empty Pages)
var step = 0;
var nowOpenningScrol = false;
var nowClosingScrol = false;
//var currLevel = 1;
var countScrolToLevel = 0;
var STYLE_LEVEL = { font: "50px Arial", fill: "#000000", align: "center" };
var STYLE_POINTS = { font: "20px Arial", fill: "#0000ff", align: "center" };
var CHAPTER_STYLE = { font: "40px Arial", fill: "#00ffff", align: "center" };
var CONTACTS_STYLE = { font: "15px Arial", fill: "#000000", align: "center" };
var leftArrow = null, rightArrow = null;
var doubleLeftArrow = null, doubleRightArrow = null;
var enabled = false;
var SPACE_BETWEEN_PAGES = 3;
var done = false;
var shiftRightPage = 2;
var STOP_SCROL_LOC = 75;
var numPageAvailable = 9;
var DISTANCE_SMALL;
var levelClicked = 1;
var background;

function initVariablesMapState() {
    heartText = null;
    heart = null;
    didCreatePages = false;
    numSpots = 9;
    globalEndAnimation = 0;
    contactsLabel = null;
    sumStarsLabel = null;
    sumStars = -1;
    chapterIndex = 1;
    chapterLabel = null;
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
    numPages = psukim[0].length + 1;
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
//    if(currLevel + numPageAvailable >= numPages){
//        shiftRightPage = numPages - numPageAvailable - 1;
//    }
//    else{
//        shiftRightPage = currLevel;
//    }
    levelClicked = 1;
}

map = {
    preload: function () {
        initVariablesMapState();
    },

    preloadState: function() {
        game.load.image('background', 'images/back.png');
        game.load.image('rightBackgroundCut', 'images/right_hide.png');
        game.load.image('torah', 'images/torah.png');
        game.load.image('leftScrol', 'images/left_scrol.png');
        game.load.image('rightScrol', 'images/right_scrol.png');
        game.load.image('torahFront', 'images/torah_front.png');
        game.load.image('page','images/page.png');
        game.load.image('leftArrow','images/left_arrow.png');
        game.load.image('rightArrow','images/right_arrow.png');
        game.load.image('doubleLeftArrow','images/double_left_arrow.png');
        game.load.image('doubleRightArrow','images/double_right_arrow.png');
        game.load.image('backOn','images/back_on.png');
        game.load.image('backOff', 'images/back_off.png');
        game.load.image('star3', 'images/3stars.png');
        game.load.image('star2', 'images/2stars.png');
        game.load.image('star1', 'images/1stars.png');
        game.load.image('star0', 'images/0stars.png');
        game.load.image('star-1','images/lock.png');
        game.load.image('lock','images/lock.png');
        game.load.image('unlock','images/unlock.png');
    },

    create: function() {
//        currLevel = currentLevel;
//        if(currLevel + numPageAvailable >= numPages) {
//            shiftRightPage = numPages - numPageAvailable;
//        }
//        else {
//            shiftRightPage = currLevel;
//        }

        game.stage.backgroundColor = '#fff';
        background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
        hideLeft = game.add.tileSprite(0, 0, game.world.width/2 - BIG_TORAH_WIDTH/4, game.world.height, 'background');
        initialBigTorah(false);

        bar.showButtons([bar.EXIT, bar.SETTINGS], //, bar.PRIZE, bar.PLUS],
            [bar.EXIT_HANDLER, bar.SETTINGS_HANDLER]); //, function() {}, function() {}]);

//        initialSmallTorahs(false,false);
    },

    update: function() {
        if(globalEndAnimation > game.time.now){
            setedPagesAfterAnimation = false;
        }
        else if(state == 'torahOpen' && setedPagesAfterAnimation == false){
            enableLevels(true);
            setedPagesAfterAnimation = true;
        }
//        fixNumbers();
//        followBackgroundAfterScrolers();
        switch(state){
        case 'first':
            first();
            break;
        case 'bigTorahClick':
            bigTorahClick();
            break;
//        case 'leftTorahClick':
//            leftTorahClick();
//            break;
//        case 'rightTorahClick':
//            rightTorahClick();
//            break;
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
	if(bringDown3Torahs() == false);
	else{
		state = 'bigTorahClick';
	}
}
function bigTorahClick(){
	state = 'bigTorahClick';
    if(innerState == 'closeTorah'){innerState = 'bringUp2';}
	else if(innerState == 'bringUp2' && bringUp2AndFront() == false);
    else if(innerState == 'bringUp2'){innerState = 'openTorah';}
	else if(innerState == 'openTorah' && openTorah() == false);
	else{
        innerState = 'closeTorah';
		state = 'torahOpen';
	}
}
//function leftTorahClick(){
//	state = 'leftTorahClick';
//	if(switchLeft() == false);
//	else{
//		state = '3TorahClose';
//	}
//}
//function rightTorahClick(){
//	state = 'rightTorahClick';
//	if(switchRight() == false);
//	else{
//		state = '3TorahClose';
//	}
//}
function leftArrowClick(){
    enableLevels(true);
    scrolPages(1);
    putRightArrow();
}
function putRightArrow(){
	kill(rightArrow);
    rightArrow = game.add.sprite(rightScrol.body.x+20,page[1].body.y+PAGE_HEIGHT/3, 'rightArrow', 0);
    enableClick(rightArrow,rightArrowClick);
    rightArrow.endAnimation = 0;
}
function putLeftArrow(){
    kill(leftArrow);
    leftArrow = game.add.sprite(leftScrol.body.x+25,page[1].body.y+PAGE_HEIGHT/3, 'leftArrow', 0);
    enableClick(leftArrow,leftArrowClick);
    leftArrow.endAnimation = 0;
}
function rightArrowClick(){
    enableLevels(true);
    scrolPages(-1);
    putLeftArrow();
}
function doubleLeftArrowClick(){
        state = 'doubleLeftArrowClick';
        if(innerState == 'closeTorah' && closeTorah() == false);
        else if(innerState == 'closeTorah'){innerState = 'bringDownFront'; chapterIndex++;}
        else if(innerState == 'bringDownFront' && bringDownOnlyFront() == false);
        else if(innerState == 'bringDownFront'){innerState = 'switchPerek';}
        else if(innerState == 'switchPerek' && switchTorahToLeftPerek() == false);
        else if(innerState == 'switchPerek'){innerState = 'bringUpCover';}
        else if(innerState == 'bringUpCover' && bringUpOnlyFront() == false);
        else if(innerState == 'bringUpCover'){innerState = 'openTorah';}
        else if(innerState == 'openTorah' && openTorah() == false);
        else{
            innerState = 'closeTorah';
            state = 'torahOpen';
        }
}
function doubleRightArrowClick(){
	state = 'doubleRightArrowClick';
    if(innerState == 'closeTorah' && closeTorah() == false);
    else if(innerState == 'closeTorah'){innerState = 'bringDownFront'; chapterIndex--;console.log(11);}
    else if(innerState == 'bringDownFront' && bringDownOnlyFront() == false);
    else if(innerState == 'bringDownFront'){innerState = 'switchPerek';console.log(12);}
    else if(innerState == 'switchPerek' && switchTorahToRightPerek() == false);
    else if(innerState == 'switchPerek'){innerState = 'bringUpCover';console.log(13);}
    else if(innerState == 'bringUpCover' && bringUpOnlyFront() == false);
    else if(innerState == 'bringUpCover'){innerState = 'openTorah';console.log(14);}
    else if(innerState == 'openTorah' && openTorah() == false);
    else{console.log(15);
        innerState = 'closeTorah';
	    state = 'torahOpen';
    }
}
function undoClickC(){
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
            }
            break;
        case '3TorahClose':
            if(bring3TorahsBack() == false);
            else{
                alert('go back to prev page');
                deleteAllImg();
                state = 'exit';
            }
            break;
    }
}

function _____BIG_FUNCTIONS_____(){}
function bring3TorahsBack(){
	enableLevels(false);
	cancleClick(bigTorah);
//	cancleClick(leftTorah);
//	cancleClick(rightTorah);
	if(is3TorahDone(false) == false){
		set3TorahsVelocityY(UP_TIME,-bigTorah.body.height,-bigTorah.body.height);
		return false;
	}
	else{
		kill(bigTorah);
//		kill(leftTorah);
//		kill(rightTorah);
		return true;
	}
}
function bringDown2AndFront(){
	if(done == false){
		done = true;
		fix2Scrolers(false);
		initialFront(false);
//		initialSmallTorahs(false,false);
		var smallLocY = game.world.height/2 - SMALL_TORAH_HEIGHT/2;
        setSpeedY(torahFront,smallLocY,DOWN_TIME);
//       	setSpeedY(leftTorah,smallLocY,DOWN_TIME);
//	    setSpeedY(rightTorah,smallLocY,DOWN_TIME);

		return false;
	}
	else if(torahFront.endAnimation > game.time.now){//{is2TorahsAndFrontDone(true) == false){
		return false;
	}
	else{
		initialBigTorah(true);
		enable3TorahClick();
		kill(leftScrol);
		kill(torahFront);
		kill(rightScrol);
        killPages();
		done = false;
		return true;
	}
}
function bringDown3Torahs(){
	if(is3TorahDone(true) == false){
		set3TorahsVelocityY(DOWN_TIME,game.world.height/2-bigTorah.height/2,game.world.height/2-bigTorah.height/2);
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
        fix2Scrolers(false);
	    initialFront(true);
        createPages(chapterIndex);
	    setPapers(true);
        followBackgroundAfterScrolers();
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
//		cancleClick(leftTorah);
//		cancleClick(rightTorah);
        fix2Scrolers(false);
	    initialFront(true);
        createPages();
        setPapers(true);
        followBackgroundAfterScrolers();
		kill(bigTorah);
		return false;
	}
	else if(is2TorahsAndFrontDone(false) == false) {
		set2TorahAndFrontVelocityY(UP_TIME,-BIG_TORAH_HEIGHT,-SMALL_TORAH_HEIGHT);
		return false;
	}
	else{
		kill(torahFront);
//		kill(leftTorah);
//		kill(rightTorah);
        isDidBringUp = false;
		return true;
	}
}
function closeTorah(){
	if(didCloseTorah == false){//isAnimationDone(leftScrol) == true && isTorahOpen()){
        didCloseTorah = true;
        fixShiftRight();
        putArrows(false);
		enableLevels(false);
		setSpeedX(leftScrol, game.world.width/2-leftScrol.body.width, SCROL_TIME);
		setSpeedX(rightScrol, game.world.width/2, SCROL_TIME);
		setPapers(false);
        followBackgroundAfterScrolers();
		return false;
	}
	else if(isTorahOpen()){
        setPapers(true);
        followBackgroundAfterScrolers();
		return false;
	}
	else{
		fix2Scrolers(false);
        didCloseTorah = false;
        kill(torahFront);
        destroy(chapterLabel);
        destroy(sumStarsLabel);
        followBackgroundAfterScrolers();
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
        putChapterLabel();
        putSumStars();
        leftScrol.bringToTop();
        rightScrol.bringToTop();
        followBackgroundAfterScrolers();
		return false;
	}
    else if(leftScrol.endAnimation > game.time.now){
		setPapers(true);
        followBackgroundAfterScrolers();
        return false;
    }
	else{
        fix2Scrolers(true);
		setPapers(true);
		putArrows(true);
		enableLevels(true);
        followBackgroundAfterScrolers();
        didOpen = false;
		return true;
	}
}
function putChapterLabel(){
    chapterLabel = game.add.text(GAME_WIDTH/2,100,"פרק "+chapterIndex,CHAPTER_STYLE);
    chapterLabel.anchor.setTo(0.5,0);
}
function putSumStars(){
    sumStarsLabel = game.add.text(game.world.width/2,150 + PAGE_HEIGHT,"סה"+"\""+"כ כוכבים: "+ sumStars,CHAPTER_STYLE);
    sumStarsLabel.anchor.setTo(0.5,0);
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
        isDidSwitchPerek = false;
        initialBigTorah(true);
        kill(nextTorah);
        return true;
    }
}
function switchTorahToRightPerek(){
    if(isDidSwitchPerek == false){
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
        isDidSwitchPerek = false;
        initialBigTorah(true);
        kill(nextTorah);
        return true;
    }
}
function bringDownOnlyFront(){
    if(isDidBringDownFront == false){
        isDidBringDownFront = true;
        fix2Scrolers(false);
        initialFront(false);
        setSpeedY(torahFront,leftScrol.body.y,DOWN_TIME);
        return false;
    }
    else if(torahFront.endAnimation > game.time.now){
        return false;
    }
    else{
        initialBigTorah(true);
        kill(leftScrol);
        leftScrol = null;
        kill(rightScrol);
        kill(torahFront);
        killPages();
        followBackgroundAfterScrolers();
        isDidBringDownFront = false;
        return true;
    }
}
function fixShiftRight(){
    var gess = parseInt((page[1].body.x - rightScrol.body.x)/(PAGE_WIDTH+SPACE_BETWEEN_PAGES) + 2);
//    if(gess > numPages - numSpots - 10){
//        gess = numPages - numSpots - 10;
//    }
    shiftRightPage = gess + 1;
}
function scrolPages(numSteps){
    var distance = numSteps*(PAGE_WIDTH+SPACE_BETWEEN_PAGES);
    var time = Math.abs(RUN_TIME*Math.abs(numSteps));
    if(page[numPages-1].body.x + distance < leftScrol.body.x + PAGE_WIDTH/2 && page[1].body.x + distance > rightScrol.body.x - PAGE_WIDTH*1.5){
        setPageVelocityX(distance,time);
    }
    else if(page[numPages-1].body.x + distance >= leftScrol.body.x + PAGE_WIDTH/2){
        kill(leftArrow);
    }
    else if(page[1].body.x + distance <= rightScrol.body.x - PAGE_WIDTH*1.5){
        kill(rightArrow);
    }
}
function _____SET_FUNCTIONS_____(){}
function set2TorahAndFrontVelocityY(time,bigLocY,smallLocY){
	setSpeedY(torahFront,bigLocY,time);
//	setSpeedY(leftTorah,smallLocY,time);
//	setSpeedY(rightTorah,smallLocY,time);
}
function set3TorahsVelocityY(time,bigLocY,smallLocY){
	setSpeedY(bigTorah,bigLocY,time);
//	setSpeedY(leftTorah,smallLocY,time);
//	setSpeedY(rightTorah,smallLocY,time);
}
function setPageVelocityX(distance,time){
    if(globalEndAnimation < game.time.now){
        for(var i = 1 ; i < numPages; i++){
            setSpeedX(page[i],distance + page[i].body.x,time);
            setSpeedX(page[i].stars,distance + page[i].stars.body.x,time);
            game.add.tween(page[i].number).to({x: distance + page[i].number.x}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
            game.add.tween(page[i].pointsText).to({x: distance + page[i].number.x}, time*TIME_INTERVAL, Phaser.Easing.Quadratic.OutIn, true, 0, 0, false);
        }
    }
}
function setPageX(index,x){
	if(page[index] != null){
        if(index != 0){
            page[index].body.x = x;
            page[index].stars.body.x = x;
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
//        numSpots = parseInt(widthPaper/(PAGE_WIDTH+SPACE_BETWEEN_PAGES));
        setPageX(shiftRightPage,rightPaper - (PAGE_WIDTH+SPACE_BETWEEN_PAGES)*(1));
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
            }
            setPageX(1,-PAGE_WIDTH);
        }
        else{
            for(var i = 1 ; i < numPages ; i++){
                if(i < shiftRightPage - 1 && (rightScrol.body.x < game.width - STOP_SCROL_LOC - PAGE_WIDTH*2 || rightScrol.endAnimation > game.time.now)){
                    setPageX(i,-PAGE_WIDTH);
                }
                else {
                    var location = page[shiftRightPage].body.x + (shiftRightPage - i)*(PAGE_WIDTH+SPACE_BETWEEN_PAGES);
                    setPageX(i,location);
                }
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
        if(globalEndAnimation < pic.endAnimation){
            globalEndAnimation = pic.endAnimation;
        }
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
        if(globalEndAnimation < pic.endAnimation){
            globalEndAnimation = pic.endAnimation;
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
	}
	return false;
}
function isAnimationDone(pic){
	if(pic != null){
		return pic.endAnimation < game.time.now && pic.endAnimation != 0;
	}
	return true;
}
function isMoving(pic){
	if(pic != null){
		return pic.endAnmation > game.time.now;
	}
	return false;
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
	bringToTop(rightArrow);
	bringToTop(leftArrow);
	bringToTop(doubleRightArrow);
	bringToTop(doubleLeftArrow);
//	bringToTop(rightTorah);
//	bringToTop(leftTorah);
	bringToTop(bigTorah);
    bringToTop(nextTorah);
	bringToTop(torahFront);
    destroy(contactsLabel);
    contactsLabel = game.add.text(0,game.world.height,CONTACTS_TEXT,CONTACTS_STYLE);
    contactsLabel.anchor.setTo(0,1);
}
function cancleClick(pic){
	if(pic != null){
		pic.inputEnabled = false;
	}
}
function killPage(i){
    if(page != null && page[i] != null){
        kill(page[i].stars);
        destroy(page[i].number);//failes here
        destroy(page[i].pointsText);
        kill(page[i]);
    }
}
function getNumPsukimUntilChapter(chapter){
    if(chapter == 1){
        return 0;
    }
    else{
        return numPsukimInPrakim[chapter-2];
    }
}
function setMatchChapter(totalNumPsukim){
    console.log(getNumPsukimUntilChapter(chapterIndex + 1)+","+chapterIndex+","+totalNumPsukim+",,,111");
    while(numPsukimInPrakim[chapterIndex-1] <= totalNumPsukim){
        chapterIndex++;
    }
}
function createPages(){
    var levelSplit = [];
    if(levels != "") {
        levelSplit = (levels).split(",");
    }
    console.log("there are "+levelSplit.length+" levels");
    if(didCreatePages == false){
        setMatchChapter(levelSplit.length);
        didCreatePages = true;
    }
    console.log(chapterIndex);
    numPages = allPsukim[chapterIndex-1].length + 2;
    sumStars = 0;
    var i = 1;
    var j = getNumPsukimUntilChapter(chapterIndex);
    console.log(levelSplit.length+","+j+","+numPages+","+numSpots);
    if(levelSplit.length - j < 2){
        shiftRightPage = 2;
    }
    else if(levelSplit.length - j > numPages - numSpots){
        shiftRightPage = numPages - numSpots;
    }
    else{
        shiftRightPage = levelSplit.length - j;
    }

    for (; i < numPages && j < levelSplit.length; i++ , j++) {
        var index = Math.min(parseInt(parseInt(levelSplit[j]) / 5000), 2) + 1;
        page[i] = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'page',0);
        page[i].endAnimation = 0;
        page[i].stars = game.add.sprite(-200,game.world.height/2-PAGE_HEIGHT/2-3,'star'+index,0);
        sumStars+=index;
        page[i].stars.endAnimation = 0;
        if(index == -1){
            page[i].isLocked = false;
            sumStars-=index;
        }
        else{
            page[i].isLocked = false;
        }
        page[i].level = i;
        page[i].number = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + PAGE_HEIGHT/2,""+page[i].level, STYLE_LEVEL);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].endAnimation = 0;
        page[i].points = parseInt(levelSplit[j]);//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
//        console.log("lvl." + (i - 1).toString() + " score: " + levelSplit[i]);
        page[i].pointsText = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + 20,""+page[i].points, STYLE_POINTS);
        page[i].pointsText.anchor.setTo(0.5,0);
        page[i].endAnimation = 0;
    }
    var once = false;
    for(; i < numPages ; i++ , j++){
        var index = (j==levelSplit.length)?0:-1;//parseInt(Math.random()*4);
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
        page[i].level = i;
        page[i].number = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + PAGE_HEIGHT/2,""+page[i].level, STYLE_LEVEL);
        page[i].number.anchor.setTo(0.5,0.5);
        page[i].points = "";//(i < levels.length)?levels[i]:"";//parseInt(Math.random()*10000000);
        page[i].pointsText = game.add.text(page[i].body.x + PAGE_WIDTH/2,page[i].body.y + 20,""+page[i].points, STYLE_POINTS);
        page[i].pointsText.anchor.setTo(0.5,0);
    }
}
function enable3TorahClick(){
	enableClick(bigTorah,bigTorahClick);
//	enableClick(leftTorah,leftTorahClick);
//	enableClick(rightTorah,rightTorahClick);
}
function enableClick(pic,func){
	if(pic != null){
		pic.inputEnabled = true;
		pic.events.onInputDown.add(func,this);
        pic.events.onDown.add(func,this);
        pic.events.isDown.add(func,this);
	}
}
function isPageInRange(i){
    return (leftScrol.body.x + PAGE_WIDTH/2 < page[i].body.x && page[i].body.x < rightScrol.body.x - PAGE_WIDTH/2)
}
function enableLevels(check){
	if(check){
        var lastUnlocked = 0;
		for(var i = 1 ; i < numPages - 1 ; i++){
            if(page[i].isLocked == false && isPageInRange(i)){
                page[i].inputEnabled = true;
	            page[i].events.onInputDown.add(goTopage, this);
            }
            else{
                page[i].inputEnabled = false;
            }
		}
	}
	else{
		for(var i = 1 ; i < numPages ; i++){
	        page[i].inputEnabled = false;
		}
	}
}
function fix2Scrolers(isOpen){
    kill(rightScrol);
    kill(leftScrol);
    if(isOpen == false){
        leftScrol = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2, game.world.height/2-BIG_TORAH_HEIGHT/2, 'leftScrol', 0);
        leftScrol.endAnimation = 0;
        rightScrol = game.add.sprite((game.world.width)/2-1, game.world.height/2-BIG_TORAH_HEIGHT/2, 'rightScrol', 0);
        rightScrol.endAnimation = 0;
    }
    else{
        leftScrol = game.add.sprite(STOP_SCROL_LOC, game.world.height/2-BIG_TORAH_HEIGHT/2, 'leftScrol', 0);
        leftScrol.endAnimation = 0;
        rightScrol = game.add.sprite(game.world.width - STOP_SCROL_LOC - rightScrol.body.width, game.world.height/2-BIG_TORAH_HEIGHT/2, 'rightScrol', 0);
        rightScrol.endAnimation = 0;
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
var levelCounter;
function goTopage (img) {
	levelClicked = img.level;
    levelCounter = levelClicked + getNumPsukimUntilChapter(chapterIndex);
    // i dont know why i need to add 2 to the counter, somehow its the server foult
    $.get( "../start-level/?level=" + levelCounter+1, function( data ) {
    });
    console.log("sended to the server the level: "+levelCounter);
    deleteAllImg();
	game.state.start('shopState', true, true);
}
function deleteAllImg(){
    kill(hideLeft);
    kill(bigTorah);
//    kill(leftTorah);
//    kill(rightTorah);
    kill(torahFront);
    kill(leftScrol);
    kill(rightScrol);
    kill(leftArrow);
    kill(rightArrow);
    kill(doubleLeftArrow);
    kill(doubleRightArrow);
    killPages();
    kill(background);
    kill(backOn);
    kill(backOff);
}
function killPages(){
    for(var i = 1 ; i < numPages ; i++){
        killPage(i);
    }
}
function initialBigTorah(inWrold){
	kill(bigTorah);
	kill(torahFront);
	if(inWrold){
		bigTorah = game.add.sprite((game.world.width-BIG_TORAH_WIDTH)/2,game.world.height/2-BIG_TORAH_HEIGHT/2, 'torah', 0);
		bigTorah.endAnimation = 0;
	    enableClick(bigTorah, bigTorahClick);
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
//function initialSmallTorahs(inWorld,enable){
//	kill(rightTorah);
//	kill(leftTorah);
//	if(inWorld){
//	    rightTorah = game.add.sprite(game.world.width-SMALL_TORAH_WIDTH-100, (game.world.height-SMALL_TORAH_HEIGHT)/2, 'torah', 0);
//	    rightTorah.endAnimation = 0;
//	    leftTorah = game.add.sprite(100, (game.world.height-SMALL_TORAH_HEIGHT)/2, 'torah', 0);
//	    leftTorah.endAnimation = 0;
//	}
//	else{
//	    rightTorah = game.add.sprite(game.world.width-SMALL_TORAH_WIDTH-100, (-SMALL_TORAH_HEIGHT-BIG_TORAH_HEIGHT)/2, 'torah', 0);
//	    rightTorah.endAnimation = 0;
//	    leftTorah = game.add.sprite(100, (-SMALL_TORAH_HEIGHT-BIG_TORAH_HEIGHT)/2, 'torah', 0);
//	    leftTorah.endAnimation = 0;
//	}
//    if(enable){
//	    enableClick(rightTorah, rightTorahClick);
//	    enableClick(leftTorah, leftTorahClick);
//    }
//}
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
	kill(doubleLeftArrow);
	kill(doubleRightArrow);
	if(isToPut){
		leftArrow = game.add.sprite(leftScrol.body.x+25,page[1].body.y+PAGE_HEIGHT/3, 'leftArrow', 0);
		enableClick(leftArrow,leftArrowClick);
		leftArrow.endAnimation = 0;
		rightArrow = game.add.sprite(rightScrol.body.x+20,page[1].body.y+PAGE_HEIGHT/3, 'rightArrow', 0);
		enableClick(rightArrow,rightArrowClick);
		rightArrow.endAnimation = 0;
        if(chapterIndex < allPsukim.length){
            doubleLeftArrow = game.add.sprite(leftScrol.body.x+25-60,page[1].body.y+PAGE_HEIGHT/3, 'doubleLeftArrow', 0);
            enableClick(doubleLeftArrow,doubleLeftArrowClick);
            doubleLeftArrow.endAnimation = 0;
        }
        if(chapterIndex > 1){
            doubleRightArrow = game.add.sprite(rightScrol.body.x+20+60,page[1].body.y+PAGE_HEIGHT/3, 'doubleRightArrow', 0);
            enableClick(doubleRightArrow,doubleRightArrowClick);
            doubleRightArrow.endAnimation = 0;
        }
	}
}
function initialLifes(){
    heart = game.add.tween(100,10,'heart');
    heartText = game.add.text(100 + heart.body.width/2,10 + heart.body.height/2,numLifes,CONTACTS_STYLE);
    heartText.anchor.setTo(0.5,0.5)

}

//function switchRight () {
//	if(isAnimationDone(bigTorah) == false){
//        cancleClick(bigTorah);
//        cancleClick(rightTorah);
//        cancleClick(leftTorah);
//		setSpeedX(bigTorah, rightTorah.body.x, SWITCH_TIME);
//		setSpeedX(rightTorah, bigTorah.body.x, SWITCH_TIME);
//		return false;
//	}
//	else if(isMoving(rightTorah)){
//		return false;
//	}
//	else{
//		initialBigTorah(true);
//		initialSmallTorahs(true,true);
//		return true;
//	}
//}
//function switchLeft () {
//	if(isAnimationDone(bigTorah) == false){
//        cancleClick(bigTorah);
//        cancleClick(rightTorah);
//        cancleClick(leftTorah);
//		setSpeedX(bigTorah, leftTorah.body.x, SWITCH_TIME);
//		setSpeedX(leftTorah, bigTorah.body.x, SWITCH_TIME);
//		return false;
//	}
//	else if(isMoving(leftTorah)){
//		return false;
//	}
//	else{
//		initialBigTorah(true);
//		initialSmallTorahs(true,true);
//		return true;
//	}
//}

