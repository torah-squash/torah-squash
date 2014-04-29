/// <reference path="cell.ts"/>
/// <reference path="pair.ts"/>
/// <reference path="set.ts"/>
/// <reference path="Verse.ts"/>
/// <reference path="points.ts"/>

interface IBoard{

//    constructor(numRows : number, numColumns : number, letterArray : string[], colorArray : string[], verse : string);
    swap(i1 : number ,j1 : number ,i2 : number ,j2 : number) : void ;
    getSets() : CellSet[] ;
    restartPointsInCells() : void ;
    putPointsToCells(sets : CellSet[]) : Points ;
    isThereSet() : boolean ;
    removeCells(cells : Cell[]) : void ;
    addLetterStatisticsToArray(type : number) : void ;
    removeSetsInTheBeginning() : void ;
    countNullCellsInColumnInRange(column : number, top : number, bottom : number) : number ;
    getNewTopCells() : Cell[] ;
    getCellsToMove() : Cell[] ;
    getCellsDestinations(srcCells : Cell[]) : Cell[] ;
    getPossiblePairs() : Pair[] ;
    removeSets(sets : CellSet[]) : void ;
}

class Board implements IBoard {
    private static MIN_SET_LENGTH = 3;
    private static ARRAY_VERSE_ONCE = 1;
    private static ARRAY_VERSE_TWICE = 2;
    private static ARRAY_VERSE_THRICE = 3;
    private static ARRAY_IOH_TWICE = 4;
    private static ARRAY_IOH_THRICE = 5;
    private static ARRAY_LETTERS_TWICE = 6;
    private static IOH : string[] = ['ו','ה','י'];

    private cells : Cell[][];
    private numRows : number;
    private numColumns : number;
    private letterArray : string[];
    private colorArray : string[];
    private verse : Verse;

    constructor(numRows : number, numColumns : number, letterArray : string[], colorArray : string[], verse : string) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.letterArray = letterArray;
        this.colorArray = colorArray;
        this.verse = new Verse(verse);

        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numColumns; j++) {
                this.cells[i][j] = Cell.getRandomCell(this.letterArray,this.colorArray,i,j);
            }
        }
    }

    public get(i : number , j : number) : Cell {
        return this.cells[i][j];
    }

    public swap(i1 : number ,j1 : number ,i2 : number ,j2 : number) : void {
        if(i1 >= 0 && j1 >=0 && i2 >= 0 && j2 >=0 && i1 < this.numRows && j1 < this.numColumns && i2 < this.numRows && j2 < this.numColumns)
        var tempCell : Cell = this.cells[i1][j1];
        this.cells[i1][j1] = this.cells[i2][j2];
        this.cells[i2][j2] = tempCell;
    }

    private getVectors() : Cell[][] {
        var vectors : Cell[][] = [];
        var vector : Cell[];
        vectors.concat(this.cells);
        for(var j = 0 ; j < this.numColumns ; j++){
            vector = [];
            for(var i = 0 ; i < this.numRows ; i++){
                vector.push(this.cells[i][j]);
            }
            vectors.push(vector);
        }
        return vectors;
    }

    public getSets() : CellSet[] {
        var sets : CellSet[] = [];
        var colorSets : CellSet[] = this.getColorSets();
        var letterSets : CellSet[] = this.getLetterSets();
        var wordSets : CellSet[] = this.getWordSets();
        sets.concat(colorSets,letterSets,wordSets);
        return sets;
    }

    private getColorSets() : CellSet[] {
        var vectors : Cell[][] = this.getVectors();
        var sets : CellSet[] = [];
        var set : CellSet;
        for(var i = 0 ; i < vectors.length ; i++){
            set = new CellSet(CellSet.COLOR_TYPE,vectors[i][0]);
            for(var j = 1 ; j < vectors[i].length ; j++){
                if(vectors[i][j].getColor() == set[0].getColor()){
                    set.addCell(vectors[i][j]);
                }
                else{
                    if(Board.isSetBigEnough(set)){
                        sets.push(set);
                    }
                    set = new CellSet(CellSet.COLOR_TYPE,vectors[i][j]);
                }
            }
            if(Board.isSetBigEnough(set)){
                sets.push(set);
            }
        }
        return sets;
    }

    private getLetterSets() : CellSet[] {
        var vectors = this.getVectors();
        var sets : CellSet[] = [];
        var set : CellSet;
        for(var i = 0 ; i < vectors.length ; i++){
            set = new CellSet(CellSet.LETTER_TYPE,vectors[i][0]);
            for(var j = 1 ; j < vectors[i].length ; j++){
                if(vectors[i][j].getLetter() == set[0].getLetter()){
                    set.addCell(vectors[i][j]);
                }
                else{
                    if(Board.isSetBigEnough(set)){
                        sets.push(set);
                    }
                    set = new CellSet(CellSet.LETTER_TYPE,vectors[i][j]);
                }
            }
            if(Board.isSetBigEnough(set)){
                sets.push(set);
            }
        }
        return sets;
    }

    private getWordSets() : CellSet[] {
        var vectors = this.getVectors();
        var sets : CellSet[] = [];
        var set : CellSet;
        var word : string;
        for(var p = 0 ; p < this.verse.getWords.length ; p++){
            word = this.verse.getWord(p);
            for(var i = 0 ; i < vectors.length ; i++){
                set = new CellSet(CellSet.WORD_TYPE,null);
                for(var j = 0 ; j < vectors[i].length ; j++){
                    if(vectors[i][j].getLetter() == word[set.getLength()]){
                        set.addCell(vectors[i][j]);
                    }
                    else{
                        if(set.getLength() == word.length){
                            sets.push(set);
                        }
                        set = new CellSet(CellSet.WORD_TYPE, vectors[i][j]);
                    }
                }
                if(set.getLength() == word.length){
                    sets.push(set);
                }
            }
        }
        return sets;
    }

    public restartPointsInCells() : void {
        for(var i = 0 ; i < this.numRows ; i++){
            for(var j = 0 ; j < this.numColumns ; j++){
                this.cells[i][j].restartPoints();
            }
        }
    }

    public putPointsToCells(sets : CellSet[]) : Points {
        var total : Points = new Points();
        var set : CellSet;
        var cell : Cell;
        var i1 : number;
        var j1 : number;

        this.restartPointsInCells();
        for(var s = 0 ; s < sets.length ; s++){
            set = sets[s];
            for(var i = 0 ; i < set.getLength() ; i++){
                cell = set.getCell(i);
                i1 = cell.getI();
                j1 = cell.getJ();
                this.cells[i1][j1].restartPoints();
                this.cells[i1][j1].addPointsFromLength(set.getLength());
                this.cells[i1][j1].addPointsFromType(set.getType());
                if(this.cells[i1][j1].getIsMissingInVerse()){
                    this.cells[i1][j1].addPointsFromLetterInVerse();
                }
                total.add(this.cells[i1][j1].getPoints().get());
            }
        }
        return total;
    }

    public isThereSet() : boolean {
        return (this.isThereColorSet() || this.isThereLetterSet() || this.isThereWordSet());
    }

    private isThereColorSet() : boolean {
        var vectors = this.getVectors();
        var set : CellSet;
        for(var i = 0 ; i < vectors.length ; i++){
            set = new CellSet(CellSet.COLOR_TYPE,vectors[i][0]);
            for(var j = 1 ; j < vectors[i].length ; j++){
                if(vectors[i][j].getColor() == set[0].getColor()){
                    set.addCell(vectors[i][j]);
                }
                else{
                    if(Board.isSetBigEnough(set)){
                        return true;
                    }
                    set = new CellSet(CellSet.COLOR_TYPE,vectors[i][j]);
                }
            }
            if(Board.isSetBigEnough(set)){
                return true;
            }
        }
        return false;
    }

    private isThereLetterSet() : boolean {
        var vectors = this.getVectors();
        var set : CellSet;
        for(var i = 0 ; i < vectors.length ; i++){
            set = new CellSet(CellSet.LETTER_TYPE,vectors[i][0]);
            for(var j = 1 ; j < vectors[i].length ; j++){
                if(vectors[i][j].getLetter() == set[0].getLetter()){
                    set.addCell(vectors[i][j]);
                }
                else{
                    if(Board.isSetBigEnough(set)){
                        return true;
                    }
                    set = new CellSet(CellSet.LETTER_TYPE,vectors[i][j]);
                }
            }
            if(Board.isSetBigEnough(set)){
                return true;
            }
        }
        return false;
    }

    private isThereWordSet() : boolean {
        var vectors = this.getVectors();
        var set : CellSet;
        var word : string;
        for(var p = 0 ; p < this.verse.getWords.length ; p++){
            word = this.verse.getWord(p);
            for(var i = 0 ; i < vectors.length ; i++){
                set = new CellSet(CellSet.WORD_TYPE,null);
                for(var j = 0 ; j < vectors[i].length ; j++){
                    if(vectors[i][j].getLetter() == word[set.getLength()]){
                        set.addCell(vectors[i][j]);
                    }
                    else{
                        if(set.getLength() == word.length){
                            return true;
                        }
                        set = new CellSet(CellSet.WORD_TYPE,vectors[i][j]);
                    }
                }
                if(set.getLength() == word.length){
                    return true;
                }
            }
        }
        return false;
    }

    public removeCells(cells : Cell[]) : void {
        var i1 : number;
        var j1 : number;
        for(var i = 0 ; i < cells.length ; i++){
            i1 = cells[i].getI();
            j1 = cells[i].getJ();
            this.cells[i1][j1].setToNull();
        }
    }

    private static isSetBigEnough(set : CellSet) : boolean {
        return set.getLength() >= Board.MIN_SET_LENGTH;
    }

    private addCell(cell : Cell, i : number, j : number) : void {
        cell.setI(i);
        cell.setJ(j);
        this.cells[i][j] = cell;
    }

    public addLetterStatisticsToArray(type : number) : void {
        switch(type){
            case Board.ARRAY_VERSE_ONCE:
                this.letterArray.concat(this.verse.getPlainLetters());
                break;
            case Board.ARRAY_VERSE_TWICE:
                this.letterArray.concat(this.verse.getPlainLetters());
                this.letterArray.concat(this.verse.getPlainLetters());
                break;
            case Board.ARRAY_VERSE_THRICE:
                this.letterArray.concat(this.verse.getPlainLetters());
                this.letterArray.concat(this.verse.getPlainLetters());
                this.letterArray.concat(this.verse.getPlainLetters());
                break;
            case Board.ARRAY_IOH_TWICE:
                this.letterArray.concat(Board.IOH);
                break;
            case Board.ARRAY_IOH_THRICE:
                this.letterArray.concat(Board.IOH);
                this.letterArray.concat(Board.IOH);
                break;
            case Board.ARRAY_LETTERS_TWICE:
                this.letterArray.concat(this.letterArray);
                break;
       }
    }

    public removeSetsInTheBeginning() : void {
        var sets : CellSet[];
        var set : CellSet;
        var i1 : number;
        var j1 : number;
        for(var t = 0 ; t < 15 && this.isThereSet() ; t++){
            sets = this.getSets();
            for(var i = 0 ; i < sets.length ; i++){
                set = sets[i];
                for(var j = 0 ; j < set.getLength() ; j++){
                    i1 = set.getCell(j).getI();
                    j1 = set.getCell(j).getJ();
                    this.cells[i1][j1] = Cell.getRandomCell(this.colorArray,this.letterArray,i1, j1);
                }
            }
        }
    }

    public getNewTopCells() : Cell[] {
        var newCells : Cell[] = [];
        var numEmpty : number;

        for(var j = 0 ; j < this.numColumns ; j++){
            numEmpty = this.countNullCellsInColumnInRange(j,0,this.numRows);
            for(var i = -numEmpty ; i < 0 ; i++){
                newCells.push(Cell.getRandomCell(this.colorArray,this.letterArray,i,j));
            }
        }
        return newCells;
    }

    public getCellsToMove() : Cell[] {
        var cellsToMove : Cell[] = [];
        var notNull : boolean = true;
        var i : number = 0;
        for(var j = 0 ; j < this.numColumns ; j++){
            for(i = this.numRows - 1 ; i >= 0 && notNull; i--){
                notNull = (this.cells[i][j].isNull() == false);
            }
            for(; i >= 0 ; i--){
                if(this.cells[i][j].isNull()){
                    cellsToMove.push(this.cells[i][j]);
                }
            }
        }
        cellsToMove.concat(this.getNewTopCells());
        return cellsToMove;
    }

    public countNullCellsInColumnInRange(column : number, top : number, bottom : number) : number {
        var count : number = 0;
        for(var i = top ; i < bottom ; i++){
            if(this.cells[i][column].isNull()){
                count++;
            }
        }
        return count;
    }

    public getCellsDestinations(srcCells : Cell[]) : Cell[] {
        var destCells : Cell[] = [];
        var numEmptyInColumn : number;
        var cell : Cell;
        for(var c = 0 ; c < srcCells.length ; c++){
            cell = srcCells[c];
            if(cell.getI() >= 0){
                numEmptyInColumn = this.countNullCellsInColumnInRange(cell.getJ(),cell.getI()+1,this.numRows);
            }
            else{//the cell is new, above the board
                numEmptyInColumn = this.countNullCellsInColumnInRange(cell.getJ(),0,this.numRows);
            }
            destCells.push(Cell.getNullCell(cell.getI()+numEmptyInColumn,cell.getJ()));
        }
        return destCells;
    }

    public getPossiblePairs() : Pair[] {
        var pairs : Pair[] = [];
        for(var i = 0 ; i < this.numRows - 1 ; i++){
            for(var j = 0 ; j < this.numColumns - 1 ; j++){
                //horizonal first
                this.swap(i,j,i,j+1);
                if(this.isThereSet()){
                    pairs.push(new Pair(this.cells[i][j],this.cells[i][j+1]));
                }
                this.swap(i,j,i,j+1);
                //now in vertical
                this.swap(i,j,i+1,j);
                if(this.isThereSet()){
                    pairs.push(new Pair(this.cells[i][j],this.cells[i+1][j]));
                }
                this.swap(i,j,i+1,j);
            }
        }
        return pairs;
    }

    public removeSets(sets : CellSet[]) : void {
        var set : CellSet;
        var i1 : number;
        var j1 : number;
        for(var s = 0 ; s < sets.length ; s++){
            set = sets[s];
            for(var i = 0 ; i < set.getLength() ; i++){
                i1 = set.getCell(i).getI();
                j1 = set.getCell(i).getJ();
                this.cells[i1][j1].setToNull();
            }
        }
    }
}