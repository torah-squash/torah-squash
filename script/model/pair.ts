/// <reference path="cell.ts"/>

class Pair{
    private cell1 : Cell;
    private cell2 : Cell;

    constructor(cell1 : Cell, cell2 : Cell){
        this.cell1 = cell1;
        this.cell2 = cell2;
    }

    public get1() : Cell {
        return this.cell1;
    }
    public get2() : Cell {
        return this.cell2;
    }
    public set1(cell : Cell) : void {
        this.cell1 = cell;
    }
    public set2(cell : Cell) : void {
        this.cell2 = cell;
    }
}