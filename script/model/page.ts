/// <reference path="level.ts"/>
/// <reference path="points.ts"/>

class Page{
    private static STARS_DIVIDOR = 2000;

    private level : Level;
    private points : Points;
    private stars : number;

    constructor(level : Level, points : Points, stars : number){
        this.level = level;
        this.points = points;
        this.stars = stars;
    }

    public getLevel() : Level {
        return this.level;
    }

    public getPoints() : Points {
        return this.points;
    }

    public getStars() : number {
        return this.stars;
    }

    public static calculateStars(points : number) : number {
        return Math.floor(points/Page.STARS_DIVIDOR);
    }
}