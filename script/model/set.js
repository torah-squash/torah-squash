/// <reference path="cell.ts"/>
var CellSet = (function () {
    function CellSet(type, cell) {
        if (cell == null) {
            this.cells = [];
        } else {
            this.cells = [cell];
        }
        this.type = type;
    }
    CellSet.prototype.addCell = function (cell) {
        this.cells.push(cell);
    };

    CellSet.prototype.getCell = function (index) {
        return this.cells[index];
    };

    CellSet.prototype.getLength = function () {
        return this.cells.length;
    };

    CellSet.prototype.getType = function () {
        return this.type;
    };

    CellSet.prototype.setType = function (type) {
        this.type = type;
    };
    CellSet.LETTER_TYPE = 'letter';
    CellSet.COLOR_TYPE = 'color';
    CellSet.WORD_TYPE = 'word';
    return CellSet;
})();
//# sourceMappingURL=set.js.map
