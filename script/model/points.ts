/// <reference path="set.ts"/>


class Points{
    public static COLOR_POINTS : number = 10;
    public static LETTER_POINTS : number = 20;
    public static WORD_POINTS : number = 40;
    public static LETTER_IN_VERSE_POINTS : number = 30;
    public static BONUSES : number[] = [0,0,0,10,20,30,40,50,60,70,80,90,100];

    private num : number;

    constructor(){
        this.num = 0;
    }

    public add(num : number) : void {
        this.num += num;
    }

    public restart() : void {
        this.num = 0;
    }

    public get() : number {
        return this.num;
    }
    public addPointsFromType(type : string) : void {
        switch(type){
            case CellSet.COLOR_TYPE:
                this.add(Points.COLOR_POINTS);
            case CellSet.LETTER_TYPE:
                this.add(Points.LETTER_POINTS);
            case CellSet.WORD_TYPE:
                this.add(Points.WORD_POINTS);
        }
    }

    public addPointsFromLength(length : number) : void {
        this.add(Points.BONUSES[length]);
    }

    public addPointsFromLetterInVerse() : void {
        this.add(Points.LETTER_IN_VERSE_POINTS);
    }
}