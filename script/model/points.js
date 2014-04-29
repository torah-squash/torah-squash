/// <reference path="set.ts"/>
var Points = (function () {
    function Points() {
        this.num = 0;
    }
    Points.prototype.add = function (num) {
        this.num += num;
    };

    Points.prototype.restart = function () {
        this.num = 0;
    };

    Points.prototype.get = function () {
        return this.num;
    };
    Points.prototype.addPointsFromType = function (type) {
        switch (type) {
            case CellSet.COLOR_TYPE:
                this.add(Points.COLOR_POINTS);
            case CellSet.LETTER_TYPE:
                this.add(Points.LETTER_POINTS);
            case CellSet.WORD_TYPE:
                this.add(Points.WORD_POINTS);
        }
    };

    Points.prototype.addPointsFromLength = function (length) {
        this.add(Points.BONUSES[length]);
    };

    Points.prototype.addPointsFromLetterInVerse = function () {
        this.add(Points.LETTER_IN_VERSE_POINTS);
    };
    Points.COLOR_POINTS = 10;
    Points.LETTER_POINTS = 20;
    Points.WORD_POINTS = 40;
    Points.LETTER_IN_VERSE_POINTS = 30;
    Points.BONUSES = [0, 0, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return Points;
})();
//# sourceMappingURL=points.js.map
