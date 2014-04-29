var Verse = (function () {
    function Verse(str) {
        this.str = str;
        this.split();
        this.initialFlags();
    }
    Verse.prototype.split = function () {
        this.words = [];
        var word = "";
        for (var i = 0; i < this.str.length; i++) {
            if (this.str[i] == ' ') {
                this.words.push(word);
            } else if (this.str[i] == '\n' || this.str[i] == '-') {
            } else {
                word.concat(this.str[i]);
            }
        }
    };

    Verse.prototype.initialFlags = function () {
        this.flags = [];
        for (var i = 0; i < this.str.length; i++) {
            if (this.str[i] == ' ' || this.str[i] == '\n' || this.str[i] == '-') {
                this.flags.push(true);
            } else {
                this.flags.push(false);
            }
        }
    };

    Verse.prototype.getStr = function () {
        return this.str;
    };
    Verse.prototype.getWords = function () {
        return this.words;
    };
    Verse.prototype.getFlags = function () {
        return this.flags;
    };
    Verse.prototype.getFlag = function (index) {
        return this.flags[index];
    };
    Verse.prototype.getWord = function (index) {
        return this.words[index];
    };
    Verse.prototype.getLetter = function (index) {
        return this.str[index];
    };
    Verse.prototype.setFlag = function (index, check) {
        this.flags[index] = check;
    };
    Verse.prototype.getShownVerse = function () {
        var show = this.str;
        for (var i = 0; i < show.length; i++) {
            if (this.getFlag(i) == false) {
                show[i] = '_';
            }
        }
        return show;
    };
    Verse.prototype.getPlainLetters = function () {
        var letters = [];
        for (var i = 0; i < this.str.length; i++) {
            if (this.str[i] != ' ' && this.str[i] != '-' && this.str[i] != '\n') {
                letters.push(this.str[i]);
            }
        }
        return letters;
    };
    return Verse;
})();
//# sourceMappingURL=Verse.js.map
