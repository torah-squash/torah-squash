/// <reference path="cell.ts"/>
var Pair = (function () {
    function Pair(cell1, cell2) {
        this.cell1 = cell1;
        this.cell2 = cell2;
    }
    Pair.prototype.get1 = function () {
        return this.cell1;
    };
    Pair.prototype.get2 = function () {
        return this.cell2;
    };
    Pair.prototype.set1 = function (cell) {
        this.cell1 = cell;
    };
    Pair.prototype.set2 = function (cell) {
        this.cell2 = cell;
    };
    return Pair;
})();
//# sourceMappingURL=pair.js.map
