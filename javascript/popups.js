/**
 * Created by user on 12/05/14.
 */


function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

var popups = new function() {
	this.INTERNET_PROBLEM = ["בעית חיבור לאינטרנט", "קיימת בעית חיבור לאינטרנט אנא נסה שוב בעוד מספר דקות."];
	this.NOT_ENUGHT_POINTS_FOR_HINT = ["חסרות נקודות", "אתה צריך 100 נקודות כדי לקבל רמז"];
	this.NOT_ENUGHT_POINTS_FOR_SHOW_VERSE = ["חסרות נקודות", "אתה צריך 2000 נקודות כדי להציג פסוק"];
	this.BEFORE_EXIT_LEVEL_QUESTION = ["עזיבת שלב", "האם אתה בטוח שברצונך לעזוב את השלב?"];
	this.BEFORE_EXIT_APP_QUESTION = ["להתנתק מהמשחק", "האם אתה בטוח שברצונך להתנתק מהמשחק?"];
    this.NOT_ENUGHT_LIFES = ["נגמר החיים","תצטרך להמתין למחר כדי לחדש את החיים שלך"];

	this.CLOSE_HENDLER = function() {
    	window.location = window.location.pathname + '#';
    };

	this.handlers = {};

    this.setMessage = function(message) {
    	assert(message != null && message.length == 2,
    			"ilegal parameters for popups setMessage function");
        $('#popup_title').html(message[0]);
        $('#popup_message').html(message[1]);
    };

    this.setOptions = function(options, handlers) {
		assert((options != null && options.length >= 1
				&& options.length == handlers.length),
				"ilegal parameters for popups setOptions function");
    	var i;
		this.handlers = handlers;
		for (i = 0; i < Math.max(options.length, 2); i++) {
			if (i < options.length) {
				$('#popup_' + i.toString()).html(options[i]);
				$('#popup_' + i.toString()).unbind('click').click(this.handlers[i]);
			} else {
				$('#popup_' + i.toString()).html('');
				$('#popup_' + i.toString()).unbind('click').click(function() {}); // do nothing
			}
		}
    };

    this.show = function() {
    	window.location = window.location.pathname + '#popup';
    };
};