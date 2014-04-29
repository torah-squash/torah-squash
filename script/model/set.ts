/// <reference path="cell.ts"/>

class CellSet{
    public static LETTER_TYPE : string = 'letter';
    public static COLOR_TYPE : string = 'color';
    public static WORD_TYPE : string = 'word';

    private cells : Cell[];
    private type : string;

    constructor(type : string, cell : Cell){
        if(cell == null){
            this.cells = [];
        }
        else{
            this.cells = [cell];
        }
        this.type = type;
    }

    public addCell(cell : Cell) : void {
        this.cells.push(cell);
    }

    public getCell(index : number) : Cell {
        return this.cells[index];
    }

    public getLength() : number{
        return this.cells.length;
    }

    public getType() : string{
        return this.type;
    }

    public setType(type : string) : void {
        this.type = type;
    }
}