/**
 * Created by user on 26/02/14.
 */

var ANIMATION_TIME = 500, DELAY_TIME = 500;
var endAnimation, endDelay;
var circle = null, percentText = null;
var isLoadingFinished =false;

var BootState = {
    preload: function() {
    }, create: function() {
    }, update: function() {
    	//game.state.start('shopState', true, true);
    	//game.state.start('board', true, true);
    	//game.state.start('chooseGameState', true, true);
        game.state.start('loadingState', true, true);
    }
};

var logo_torah_title = null, logo_squash_title = null, torah_icon = null;
var isAnimation;

var loadingState = {
    preload : function() {
        //game.load.image('ccccccccccccc', 'photoshoped/circle3.png');
        game.load.image('t1', 'photoshoped/torah4.png');
        game.load.image('t2', 'photoshoped/torah_infront.png');
        game.load.image('backgroundL', 'photoshoped/back.png');
        game.load.image('torahL', 'photoshoped/torah4.png');
        game.load.image('torah_logo', 'photoshoped/torah_logo4.png');
        game.load.image('squash_logo', 'photoshoped/squash_logo.png');
        game.load.image('torah_icon', 'photoshoped/torah_icon.png');
        //game.load.image('torah222', 'http://placebear.com/1000/1000');
//choosegameState images:
            game.load.image('background', 'images/back.png');
            game.load.image('rightBackgroundCut', 'images/right_hide.png');
    game.load.image('torah', 'images/torah.png');
    game.load.image('leftScrol', 'images/left_scrol.png');
    game.load.image('rightScrol', 'images/right_scrol.png');
    game.load.image('torahFront', 'images/torah_front.png');
    game.load.image('page','images/page.png');
    game.load.image('leftArrow','images/left_arrow.png');
    game.load.image('rightArrow','images/right_arrow.png');
    game.load.image('doubleLeftArrow','images/left_arrow.png');
    game.load.image('doubleRightArrow','images/right_arrow.png');
    game.load.image('backOn','images/back_on.png');
    game.load.image('backOff', 'images/back_off.png');
    game.load.image('star3', 'images/3stars.png');
    game.load.image('star2', 'images/2stars.png');
    game.load.image('star1', 'images/1stars.png');
    game.load.image('star0', 'images/0stars.png');
    game.load.image('star-1','images/lock.png');
    game.load.image('lock','images/lock.png');
    game.load.image('unlock','images/unlock.png');
    //gameboardState images:
        //	game.load.image('background', 'images/back.png');
	game.load.image('backOn', 'images/back_on.png');
	game.load.image('backOff', 'images/back_Off.png');
//    game.load.image('winner', 'images/compliments/winner.png');
//    game.load.image('sorry', 'images/compliments/sorry.png');
	game.load.image('cell','images/empty-cell.png');//cell.png');
	game.load.image('selectedCell','images/selected_cell.png');
    game.load.image('winner','images/well_done.png');
    game.load.image('looser','images/failed.png');

	game.load.image('kad','images/toys/kad.png');
	game.load.image('shofar','images/toys/shofar.png');
	game.load.image('menora','images/toys/menora.png');
	game.load.image('ozenhaman','images/toys/ozen_haman.png');
	game.load.image('donut','images/toys/donut.png');
	game.load.image('matza','images/toys/matza.png');
	game.load.image('rimon','images/toys/rimon.png');
	game.load.image('sevivon','images/toys/sevivon.png');

        game.stage.backgroundColor = '#3a3a3a';
        var filesLoaded = game.load.totalLoadedFiles(), filesNumber = filesLoaded + game.load.totalQueuedFiles();
        var presents = Math.round(filesLoaded * 100 / filesNumber);
        var style = { font: "30pt Century", fill: "#ffffff", align: "center"};
        percentText = game.add.text(game.world.centerX - 60 / 2.0, 470/*500*/, presents + "%", style);
        game.load.setPreloadFunction(this.updateProgress);
    }, create: function() {
        logo_torah_title = game.add.sprite(game.world.centerX - 100, 80, 'torah_logo');
        logo_torah_title.visible = false;
        logo_squash_title = game.add.sprite(game.world.centerX - 100, 120, 'squash_logo');
        logo_squash_title.visible = false;
        endDelay = game.time.now + DELAY_TIME;
        endAnimation = game.time.now + DELAY_TIME + ANIMATION_TIME;
        drawCircle(100);
        torah_icon = game.add.sprite(game.world.centerX - 56 / 2, 50, 'torah_icon');
        torah_icon.visible = false;
        isAnimation = false;
    }, updateProgress: function(progress) {
        // do some math:
        var presents = progress;
        var proportion = 1.2 * presents / 100.0 + 0.3; // time + 1
        // update game screen:
        drawCircle(progress);
        percentText.content = presents.toString() + "%";
        percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0;
    }, update: function() {
        logo_torah_title.body.velocity.x = 0;
        if (game.time.now <= endDelay) {
            // do nothing
        } else if(!isAnimation) {
            torah_icon.opacity = 0;
            game.add.tween(logo_torah_title).to({ x:  game.world.centerX - 330}, ANIMATION_TIME, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            game.add.tween(logo_squash_title).to({ x:  game.world.centerX + 150}, ANIMATION_TIME, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            //game.add.tween(torah_icon).to({ opacity:  1}, ANIMATION_TIME, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            isAnimation = true;
        } else if (game.time.now <= endAnimation) {
            logo_torah_title.visible = true;
            logo_squash_title.visible = true;
            torah_icon.visible = true;
            //logo_torah_title.body.velocity.x = -500 + (ANIMATION_TIME - (endAnimation - game.time.now)) / ANIMATION_TIME * 470;

        } else {
            //torah_icon.visible = true;
            percentText.content = "touch to play";
            percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0 + 20;
            game.input.onDown.add(nextState, this);
        }
    }
};

function drawCircle(progress) {
    graphics = game.add.graphics(0, 0);
    graphics.clear();
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(game.world.centerX, 120, progress);
}

function nextState() {
    killLoadingState();
    // redirect to next state
    //game.state.start('chooseGameState', true, true);
    game.state.start('intoductionState', true, true);
}
function killLoadingState(){
    destroy(percentText);
    kill(torah_icon);
    kill(logo_torah_title);
    kill(logo_squash_title);
}

/*

// Old update function:

if( game.time.now <= endLoading ) { // while loading the images
    // do some math:
    var proportion = 0.6 * (LOADING_DURATION - (endLoading - game.time.now)) / LOADING_DURATION + 0.3; // time + 1
    var presents = Math.min(Math.round(proportion * 100 / 0.85), 100);
    var proportion = 0.6 * presents / 100.0 + 0.3; // time + 1
    // update game screen:
    circle.scale.setTo(proportion, proportion); // resize the proportion of the circle image
    circle.body.x = game.world.centerX - circle.body.width / 2.0;
    percentText.content = presents.toString() + "%";// + " " + Loader.get;
    percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0;
    if (presents == 100) {
        endAnimation = game.time.now + ANIMATION_TIME;
    }
}
else if ( game.time.now <= endAnimation ) {

} else {
    percentText.content = "touch to play";
    percentText.x = game.world.centerX - percentText.content.length * 20 / 2.0 + 20;
    game.input.onDown.add(nextState, this);
}


 */
var psukim = [
"וידבר א-לוהים את כל הדברים האלה לאמור",
"אנוכי ה' א-לוהיך אשר הוצאתיך מארץ מצריים מבית עבדים\n לא יהיה לך א-לוהים אחרים על פניי",
"לא תעשה לך פסל וכל תמונה אשר בשמיים ממעל ואשר בארץ\n מתחת ואשר במים מתחת לארץ",
"לא תשתחווה להם ולא תועבדם כי אנוכי ה' א-לוהיך אל קנא\n פוקד עוון אבות על בנים על שילשים ועל ריבעים לשונאיי",
"ועושה חסד לאלפים לאוהביי ולשומרי מצוותיי",
"לא תישא את שם ה' א-לוהיך לשוא כי לא ינקה ה' את אשר\n יישא את שמו לשוא",
"זכור את יום השבת לקדשו",
"ששת ימים תעבוד ועשית כל מלאכתך",
"ויום השביעי שבת לה' א-לוהיך לא תעשה כל מלאכה אתה ובנך\n ובתך עבדך ואמתך ובהמתך וגרך אשר בשעריך",
"כי ששת ימים עשה ה' את השמיים ואת הארץ את הים ואת כל\n אשר בם וינח ביום השביעי על כן בירך ה' את יום השבת ויקדשהו",
"כבד את אביך ואת אימך למען יאריכון ימיך על האדמה אשר\n ה' א-לוהיך נותן לך",
"לא תרצח לא תנאף לא תגנוב לא תענה בריעך עד שקר",
"לא תחמוד בית ריעך לא תחמוד אשת ריעך ועבדו ואמתו ושורו\n וחמורו וכול אשר לריעך",
"בראשית ברא א-לוהים את השמיים ואת הארץ",
"והארץ הייתה תוהו ובוהו וחושך על פני תהום ורוח א-לוהים\n מרחפת על פני המים",
"ויאמר א-לוהים יהי אור ויהי אור",
"וירא א-לוהים את האור כי טוב ויבדל א-לוהים בין האור\n ובין החושך",
"ויקרא א-לוהים לאור יום ולחושך קרא לילה ויהי ערב ויהי\n בוקר יום אחד",
"ויאמר א-לוהים יהי רקיע בתוך המים ויהי מבדיל בין מים\n למים",
"ויעש א-לוהים את הרקיע ויבדל בין המים אשר מתחת לרקיע\n ובין המים אשר מעל לרקיע ויהי כן",
"ויקרא א-לוהים לרקיע שמיים ויהי ערב ויהי בוקר יום שני",
"ויאמר א-לוהים ייקוו המים מתחת השמיים אל מקום אחד ותיראה\n היבשה ויהי כן",
"ויקרא א-לוהים ליבשה ארץ ולמקוה המים קרא ימים וירא א-לוהים\n כי טוב",
"ויאמר א-לוהים תדשא הארץ דשא עשב מזריע זרע עץ פרי עושה\n פרי למינו אשר זרעו בו על הארץ ויהי כן",
"ותוצא הארץ דשא עשב מזריע זרע למינהו ועץ עושה פרי אשר\n זרעו בו למינהו וירא א-לוהים כי טוב",
"ויהי ערב ויהי בוקר יום שלישי",
"ויאמר א-לוהים יהי מאורות ברקיע השמיים להבדיל בין היום\n ובין הלילה והיו לאותות ולמועדים ולימים ושנים",
"והיו למאורות ברקיע השמיים להאיר על הארץ ויהי כן",
"ויעש א-לוהים את שני המאורות הגדולים את המאור הגדול\n לממשלת היום ואת המאור הקטון לממשלת הלילה ואת הכוכבים",
"וייתן אותם א-לוהים ברקיע השמיים להאיר על הארץ",
"ולמשול ביום ובלילה ולהבדיל בין האור ובין החושך וירא\n א-לוהים כי טוב",
"ויהי ערב ויהי בוקר יום רביעי",
"ויאמר א-לוהים ישרצו המים שרץ נפש חיה ועוף יעופף על\n הארץ על פני רקיע השמיים",
"ויברא א-לוהים את התנינים הגדולים ואת כל נפש החיה הרומשת\n אשר שרצו המים למיניהם ואת כל עוף כנף למינהו וירא א-לוהים\n כי טוב",
"ויברך אותם א-לוהים לאמור פרו ורבו ומלאו את המים בימים\n והעוף יירב בארץ",
"ויהי ערב ויהי בוקר יום חמישי",
"ויאמר א-לוהים תוצא הארץ נפש חיה למינה בהמה ורמש וחיתו\n ארץ למינה ויהי כן",
"ויעש א-לוהים את חית הארץ למינה ואת הבהמה למינה ואת\n כל רמש האדמה למינהו וירא א-לוהים כי טוב",
"ויאמר א-לוהים נעשה אדם בצלמנו כדמותנו וירדו בדגת הים\n ובעוף השמיים ובבהמה ובכל הארץ ובכל הרמש הרומש על הארץ",
"ויברא א-לוהים את האדם בצלמו בצלם א-לוהים ברא אותו זכר\n ונקבה ברא אותם",
"ויברך אותם א-לוהים ויאמר להם א-לוהים פרו ורבו ומלאו\n את הארץ וכבשוה ורדו בדגת הים ובעוף השמיים ובכל חיה הרומשת\n על הארץ",
"ויאמר א-לוהים הנה נתתי לכם את כל עשב זורע זרע אשר על\n פני כל הארץ ואת כל העץ אשר בו פרי עץ זורע זרע לכם יהיה\n לאוכלה",
"ולכל חית הארץ ולכל עוף השמיים ולכול רומש על הארץ אשר\n בו נפש חיה את כל ירק עשב לאוכלה ויהי כן",
"וירא א-לוהים את כל אשר עשה והנה טוב מאוד ויהי ערב ויהי\n בוקר יום השישי",
"ויכולו השמיים והארץ וכל צבאם",
"ויכל א-לוהים ביום השביעי מלאכתו אשר עשה וישבות ביום\n השביעי מכל מלאכתו אשר עשה",
"ויברך א-לוהים את יום השביעי ויקדש אותו כי בו שבת מכל\n מלאכתו אשר ברא א-לוהים לעשות"
];
