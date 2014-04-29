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

class Cell{
    private static NULL_COLOR : string = "";
    private static NULL_LETTER : string = "";
    private type : string;
    private color : string;
    private letter : string;
    private i : number;
    private j : number;
    private points : Points;
    private isMissingInVerse : boolean;

    public constructor(letter : string, color : string, i : number, j : number){
        this.color = color;
        this.letter = letter;
        this.i = i;
        this.j = j;
        this.points = new Points();
        this.isMissingInVerse = false;
    }

    public getColor() : string {
        return this.color;
    }

    public setColor(color : string) : void {
        this.color = color;
    }

    public getLetter() : string {
        return this.letter;
    }

    public setLetter(letter : string) : void {
        this.letter = letter;
    }

    public getI() : number {
        return this.i;
    }

    public setI(i : number) : void {
        this.i = i;
    }

    public getJ() : number {
        return this.j;
    }

    public setJ(j : number) : void {
        this.j = j;
    }

    public setIsMissingInVerse(bool : boolean) : void {
        this.isMissingInVerse = bool;
    }

    public getIsMissingInVerse() : boolean {
        return this.isMissingInVerse;
    }

    public getPoints() : Points {
        return this.points;
    }

    public static getRandomCell(colorArray : string[], letterArray : string[],i,j) : Cell{
        var colorIndex = Math.floor(Math.random()*colorArray.length);
        var letterIndex = Math.floor(Math.random()*letterArray.length);
        var cell = new Cell(letterArray[letterIndex],colorArray[colorIndex],i,j);
        return cell;
    }

    public setToNull() : void {
        this.letter = Cell.NULL_LETTER;
        this.color = Cell.NULL_COLOR;
    }

    public static getNullCell(i,j) : Cell{
        var cell = new Cell("","",i,j);
        return cell;
    }

    public addPoints(num : number) : void {
        this.points.add(num);
    }

    public restartPoints() : void {
        this.points.restart();
    }

    public addPointsFromType(type : string) : void {
        this.points.addPointsFromType(type);
    }

    public addPointsFromLength(length : number) : void {
        this.points.addPointsFromLength(length);
    }

    public addPointsFromLetterInVerse() : void {
        this.points.addPointsFromLetterInVerse();
    }

    private getType() : string {
        return this.type;
    }

    private setType(type : string) : void {
        this.type = type;
    }

    public isNull() : boolean {
        return (this.letter == Cell.NULL_LETTER);
    }

}