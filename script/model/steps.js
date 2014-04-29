/// <reference path="Verse.ts"/>
/// <reference path="level.ts"/>
var Steps = (function () {
    function Steps(num) {
        this.num = num;
    }
    Steps.prototype.step = function () {
        this.num--;
    };

    Steps.prototype.get = function () {
        return this.num;
    };

    Steps.getCalculatedSteps = function (level, pasuk, numColors, letterStatistic) {
        var numSteps = 0;

        return new Steps(numSteps);
    };
    return Steps;
})();
//# sourceMappingURL=steps.js.map
