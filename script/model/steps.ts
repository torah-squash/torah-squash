/// <reference path="Verse.ts"/>
/// <reference path="level.ts"/>


class Steps{
    private num : number;

    constructor(num : number){
        this.num = num;
    }

    public step() : void {
        this.num--;
    }

    public get() : number {
        return this.num;
    }

    public static getCalculatedSteps(level : Level, pasuk : Verse, numColors : number, letterStatistic : number) : Steps {
        var numSteps : number = 0;



        return new Steps(numSteps);
    }

}