/// <reference path="level.ts"/>
/// <reference path="points.ts"/>
var Page = (function () {
    function Page(level, points, stars) {
        this.level = level;
        this.points = points;
        this.stars = stars;
    }
    Page.prototype.getLevel = function () {
        return this.level;
    };

    Page.prototype.getPoints = function () {
        return this.points;
    };

    Page.prototype.getStars = function () {
        return this.stars;
    };

    Page.calculateStars = function (points) {
        return Math.floor(points / Page.STARS_DIVIDOR);
    };
    Page.STARS_DIVIDOR = 2000;
    return Page;
})();
//# sourceMappingURL=page.js.map
