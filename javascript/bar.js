/**
 * Created by user on 05/06/14.
 */

var bar = new function() {
    this.EXIT = '#logout';
    this.SETTINGS = '#tools';
    this.RETURN = '#return';
    this.PRIZE = '#prize';
    this.PLUS = '#plus';

    this.EXIT_HANDLER = function() {
        popups.setMessage(popups.BEFORE_EXIT_APP_QUESTION);
        popups.setOptions(['לא', 'כן'],
                [function() { popups.CLOSE_HENDLER(); }, function() {
                    window.location = window.location.pathname.replace('/play/', '/logout/');
                    popups.CLOSE_HENDLER();
                }]
        );
        popups.show();
    };

    this.SETTINGS_HANDLER = function() {
        game.state.start('settings', false, false);
    };

    this.RETURN_TO_MAP = function() {
        game.state.start('chooseGameState', false, false);
        $('#audio').css('visibility', 'hidden');
    };

    this.allButtons = [this.EXIT, this.SETTINGS, this.RETURN,
            this.PRIZE, this.PLUS];

    this.handlers = [];

    this.showButtons = function(buttons, handlers) {
        assert(buttons instanceof Array && handlers instanceof Array
                && buttons.length == handlers.length,
                "ilegal or missing parameters for bar showButtons function");
        // hide all buttons
        for (var i = 0; i < this.allButtons.length; i++) {
            if (buttons.indexOf(this.allButtons[i]) == -1) {
                $(this.allButtons[i]).fadeOut(0);
            }
            $(this.allButtons[i]).unbind('click'); // remove all click events
        }
        this.handlers = handlers.slice(0);
        for (var i = 0; i < buttons.length; i++) {
            $(buttons[i]).css('visibility', 'visible');
            $(buttons[i]).fadeIn(500);
            $(buttons[i]).unbind('click').click(this.handlers[i]);
        }
    };

//    this.removeButtons = function(buttons) {
//        assert(buttons instanceof Array,
//                "ilegal parameters for bar removeButtons function");
//        for (var i = 0; i < buttons.length; i++) {
//            $(buttons[i]).css('visibility', 'hidden');
//            $(buttons[i]).click(function() {}); // do nothing
//        }
//    };
};