/// <reference path="points.ts"/>
//
//interface Cell {
//    getColor();
//    setColor(color : string);
//    getLetter();
//    setLetter(letter : string);
//    getType();
//    setType(type : string);
//}
var Cell = (function () {
    function Cell(letter, color, i, j) {
        this.color = color;
        this.letter = letter;
        this.i = i;
        this.j = j;
        this.points = new Points();
        this.isMissingInVerse = false;
    }
    Cell.prototype.getColor = function () {
        return this.color;
    };

    Cell.prototype.setColor = function (color) {
        this.color = color;
    };

    Cell.prototype.getLetter = function () {
        return this.letter;
    };

    Cell.prototype.setLetter = function (letter) {
        this.letter = letter;
    };

    Cell.prototype.getI = function () {
        return this.i;
    };

    Cell.prototype.setI = function (i) {
        this.i = i;
    };

    Cell.prototype.getJ = function () {
        return this.j;
    };

    Cell.prototype.setJ = function (j) {
        this.j = j;
    };

    Cell.prototype.setIsMissingInVerse = function (bool) {
        this.isMissingInVerse = bool;
    };

    Cell.prototype.getIsMissingInVerse = function () {
        return this.isMissingInVerse;
    };

    Cell.prototype.getPoints = function () {
        return this.points;
    };

    Cell.getRandomCell = function (colorArray, letterArray, i, j) {
        var colorIndex = Math.floor(Math.random() * colorArray.length);
        var letterIndex = Math.floor(Math.random() * letterArray.length);
        var cell = new Cell(letterArray[letterIndex], colorArray[colorIndex], i, j);
        return cell;
    };

    Cell.prototype.setToNull = function () {
        this.letter = Cell.NULL_LETTER;
        this.color = Cell.NULL_COLOR;
    };

    Cell.getNullCell = function (i, j) {
        var cell = new Cell("", "", i, j);
        return cell;
    };

    Cell.prototype.addPoints = function (num) {
        this.points.add(num);
    };

    Cell.prototype.restartPoints = function () {
        this.points.restart();
    };

    Cell.prototype.addPointsFromType = function (type) {
        this.points.addPointsFromType(type);
    };

    Cell.prototype.addPointsFromLength = function (length) {
        this.points.addPointsFromLength(length);
    };

    Cell.prototype.addPointsFromLetterInVerse = function () {
        this.points.addPointsFromLetterInVerse();
    };

    Cell.prototype.getType = function () {
        return this.type;
    };

    Cell.prototype.setType = function (type) {
        this.type = type;
    };

    Cell.prototype.isNull = function () {
        return (this.letter == Cell.NULL_LETTER);
    };
    Cell.NULL_COLOR = "";
    Cell.NULL_LETTER = "";
    return Cell;
})();
//# sourceMappingURL=cell.js.map
