/// <reference path="cell.ts"/>
/// <reference path="pair.ts"/>
/// <reference path="set.ts"/>
/// <reference path="Verse.ts"/>
/// <reference path="points.ts"/>

var Board = (function () {
    function Board(numRows, numColumns, letterArray, colorArray, verse) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.letterArray = letterArray;
        this.colorArray = colorArray;
        this.verse = new Verse(verse);

        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numColumns; j++) {
                this.cells[i][j] = Cell.getRandomCell(this.letterArray, this.colorArray, i, j);
            }
        }
    }
    Board.prototype.swap = function (i1, j1, i2, j2) {
        if (i1 >= 0 && j1 >= 0 && i2 >= 0 && j2 >= 0 && i1 < this.numRows && j1 < this.numColumns && i2 < this.numRows && j2 < this.numColumns)
            var tempCell = this.cells[i1][j1];
        this.cells[i1][j1] = this.cells[i2][j2];
        this.cells[i2][j2] = tempCell;
    };

    Board.prototype.getVectors = function () {
        var vectors = [];
        var vector;
        vectors.concat(this.cells);
        for (var j = 0; j < this.numColumns; j++) {
            vector = [];
            for (var i = 0; i < this.numRows; i++) {
                vector.push(this.cells[i][j]);
            }
            vectors.push(vector);
        }
        return vectors;
    };

    Board.prototype.getSets = function () {
        var sets = [];
        var colorSets = this.getColorSets();
        var letterSets = this.getLetterSets();
        var wordSets = this.getWordSets();
        sets.concat(colorSets, letterSets, wordSets);
        return sets;
    };

    Board.prototype.getColorSets = function () {
        var vectors = this.getVectors();
        var sets = [];
        var set;
        for (var i = 0; i < vectors.length; i++) {
            set = new CellSet(CellSet.COLOR_TYPE, vectors[i][0]);
            for (var j = 1; j < vectors[i].length; j++) {
                if (vectors[i][j].getColor() == set[0].getColor()) {
                    set.addCell(vectors[i][j]);
                } else {
                    if (Board.isSetBigEnough(set)) {
                        sets.push(set);
                    }
                    set = new CellSet(CellSet.COLOR_TYPE, vectors[i][j]);
                }
            }
            if (Board.isSetBigEnough(set)) {
                sets.push(set);
            }
        }
        return sets;
    };

    Board.prototype.getLetterSets = function () {
        var vectors = this.getVectors();
        var sets = [];
        var set;
        for (var i = 0; i < vectors.length; i++) {
            set = new CellSet(CellSet.LETTER_TYPE, vectors[i][0]);
            for (var j = 1; j < vectors[i].length; j++) {
                if (vectors[i][j].getLetter() == set[0].getLetter()) {
                    set.addCell(vectors[i][j]);
                } else {
                    if (Board.isSetBigEnough(set)) {
                        sets.push(set);
                    }
                    set = new CellSet(CellSet.LETTER_TYPE, vectors[i][j]);
                }
            }
            if (Board.isSetBigEnough(set)) {
                sets.push(set);
            }
        }
        return sets;
    };

    Board.prototype.getWordSets = function () {
        var vectors = this.getVectors();
        var sets = [];
        var set;
        var word;
        for (var p = 0; p < this.verse.getWords.length; p++) {
            word = this.verse.getWord(p);
            for (var i = 0; i < vectors.length; i++) {
                set = new CellSet(CellSet.WORD_TYPE, null);
                for (var j = 0; j < vectors[i].length; j++) {
                    if (vectors[i][j].getLetter() == word[set.getLength()]) {
                        set.addCell(vectors[i][j]);
                    } else {
                        if (set.getLength() == word.length) {
                            sets.push(set);
                        }
                        set = new CellSet(CellSet.WORD_TYPE, vectors[i][j]);
                    }
                }
                if (set.getLength() == word.length) {
                    sets.push(set);
                }
            }
        }
        return sets;
    };

    Board.prototype.restartPointsInCells = function () {
        for (var i = 0; i < this.numRows; i++) {
            for (var j = 0; j < this.numColumns; j++) {
                this.cells[i][j].restartPoints();
            }
        }
    };

    Board.prototype.putPointsToCells = function (sets) {
        var total = new Points();
        var set;
        var cell;
        var i1;
        var j1;

        this.restartPointsInCells();
        for (var s = 0; s < sets.length; s++) {
            set = sets[s];
            for (var i = 0; i < set.getLength(); i++) {
                cell = set.getCell(i);
                i1 = cell.getI();
                j1 = cell.getJ();
                this.cells[i1][j1].restartPoints();
                this.cells[i1][j1].addPointsFromLength(set.getLength());
                this.cells[i1][j1].addPointsFromType(set.getType());
                if (this.cells[i1][j1].getIsMissingInVerse()) {
                    this.cells[i1][j1].addPointsFromLetterInVerse();
                }
                total.add(this.cells[i1][j1].getPoints().get());
            }
        }
        return total;
    };

    Board.prototype.isThereSet = function () {
        return (this.isThereColorSet() || this.isThereLetterSet() || this.isThereWordSet());
    };

    Board.prototype.isThereColorSet = function () {
        var vectors = this.getVectors();
        var set;
        for (var i = 0; i < vectors.length; i++) {
            set = new CellSet(CellSet.COLOR_TYPE, vectors[i][0]);
            for (var j = 1; j < vectors[i].length; j++) {
                if (vectors[i][j].getColor() == set[0].getColor()) {
                    set.addCell(vectors[i][j]);
                } else {
                    if (Board.isSetBigEnough(set)) {
                        return true;
                    }
                    set = new CellSet(CellSet.COLOR_TYPE, vectors[i][j]);
                }
            }
            if (Board.isSetBigEnough(set)) {
                return true;
            }
        }
        return false;
    };

    Board.prototype.isThereLetterSet = function () {
        var vectors = this.getVectors();
        var set;
        for (var i = 0; i < vectors.length; i++) {
            set = new CellSet(CellSet.LETTER_TYPE, vectors[i][0]);
            for (var j = 1; j < vectors[i].length; j++) {
                if (vectors[i][j].getLetter() == set[0].getLetter()) {
                    set.addCell(vectors[i][j]);
                } else {
                    if (Board.isSetBigEnough(set)) {
                        return true;
                    }
                    set = new CellSet(CellSet.LETTER_TYPE, vectors[i][j]);
                }
            }
            if (Board.isSetBigEnough(set)) {
                return true;
            }
        }
        return false;
    };

    Board.prototype.isThereWordSet = function () {
        var vectors = this.getVectors();
        var set;
        var word;
        for (var p = 0; p < this.verse.getWords.length; p++) {
            word = this.verse.getWord(p);
            for (var i = 0; i < vectors.length; i++) {
                set = new CellSet(CellSet.WORD_TYPE, null);
                for (var j = 0; j < vectors[i].length; j++) {
                    if (vectors[i][j].getLetter() == word[set.getLength()]) {
                        set.addCell(vectors[i][j]);
                    } else {
                        if (set.getLength() == word.length) {
                            return true;
                        }
                        set = new CellSet(CellSet.WORD_TYPE, vectors[i][j]);
                    }
                }
                if (set.getLength() == word.length) {
                    return true;
                }
            }
        }
        return false;
    };

    Board.prototype.removeCells = function (cells) {
        var i1;
        var j1;
        for (var i = 0; i < cells.length; i++) {
            i1 = cells[i].getI();
            j1 = cells[i].getJ();
            this.cells[i1][j1].setToNull();
        }
    };

    Board.isSetBigEnough = function (set) {
        return set.getLength() >= Board.MIN_SET_LENGTH;
    };

    Board.prototype.addCell = function (cell, i, j) {
        cell.setI(i);
        cell.setJ(j);
        this.cells[i][j] = cell;
    };

    Board.prototype.addLetterStatisticsToArray = function (type) {
        switch (type) {
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
    };

    Board.prototype.removeSetsInTheBeginning = function () {
        var sets;
        var set;
        var i1;
        var j1;
        for (var t = 0; t < 15 && this.isThereSet(); t++) {
            sets = this.getSets();
            for (var i = 0; i < sets.length; i++) {
                set = sets[i];
                for (var j = 0; j < set.getLength(); j++) {
                    i1 = set.getCell(j).getI();
                    j1 = set.getCell(j).getJ();
                    this.cells[i1][j1] = Cell.getRandomCell(this.colorArray, this.letterArray, i1, j1);
                }
            }
        }
    };

    Board.prototype.getNewTopCells = function () {
        var newCells = [];
        var numEmpty;

        for (var j = 0; j < this.numColumns; j++) {
            numEmpty = this.countNullCellsInColumnInRange(j, 0, this.numRows);
            for (var i = -numEmpty; i < 0; i++) {
                newCells.push(Cell.getRandomCell(this.colorArray, this.letterArray, i, j));
            }
        }
        return newCells;
    };

    Board.prototype.getCellsToMove = function () {
        var cellsToMove = [];
        var notNull = true;
        var i = 0;
        for (var j = 0; j < this.numColumns; j++) {
            for (i = this.numRows - 1; i >= 0 && notNull; i--) {
                notNull = (this.cells[i][j].isNull() == false);
            }
            for (; i >= 0; i--) {
                if (this.cells[i][j].isNull()) {
                    cellsToMove.push(this.cells[i][j]);
                }
            }
        }
        cellsToMove.concat(this.getNewTopCells());
        return cellsToMove;
    };

    Board.prototype.countNullCellsInColumnInRange = function (column, top, bottom) {
        var count = 0;
        for (var i = top; i < bottom; i++) {
            if (this.cells[i][column].isNull()) {
                count++;
            }
        }
        return count;
    };

    Board.prototype.getCellsDestinations = function (srcCells) {
        var destCells = [];
        var numEmptyInColumn;
        var cell;
        for (var c = 0; c < srcCells.length; c++) {
            cell = srcCells[c];
            if (cell.getI() >= 0) {
                numEmptyInColumn = this.countNullCellsInColumnInRange(cell.getJ(), cell.getI() + 1, this.numRows);
            } else {
                numEmptyInColumn = this.countNullCellsInColumnInRange(cell.getJ(), 0, this.numRows);
            }
            destCells.push(Cell.getNullCell(cell.getI() + numEmptyInColumn, cell.getJ()));
        }
        return destCells;
    };

    Board.prototype.getPossiblePairs = function () {
        var pairs = [];
        for (var i = 0; i < this.numRows - 1; i++) {
            for (var j = 0; j < this.numColumns - 1; j++) {
                //horizonal first
                this.swap(i, j, i, j + 1);
                if (this.isThereSet()) {
                    pairs.push(new Pair(this.cells[i][j], this.cells[i][j + 1]));
                }
                this.swap(i, j, i, j + 1);

                //now in vertical
                this.swap(i, j, i + 1, j);
                if (this.isThereSet()) {
                    pairs.push(new Pair(this.cells[i][j], this.cells[i + 1][j]));
                }
                this.swap(i, j, i + 1, j);
            }
        }
        return pairs;
    };

    Board.prototype.removeSets = function (sets) {
        var set;
        var i1;
        var j1;
        for (var s = 0; s < sets.length; s++) {
            set = sets[s];
            for (var i = 0; i < set.getLength(); i++) {
                i1 = set.getCell(i).getI();
                j1 = set.getCell(i).getJ();
                this.cells[i1][j1].setToNull();
            }
        }
    };
    Board.MIN_SET_LENGTH = 3;
    Board.ARRAY_VERSE_ONCE = 1;
    Board.ARRAY_VERSE_TWICE = 2;
    Board.ARRAY_VERSE_THRICE = 3;
    Board.ARRAY_IOH_TWICE = 4;
    Board.ARRAY_IOH_THRICE = 5;
    Board.ARRAY_LETTERS_TWICE = 6;
    Board.IOH = ['ו', 'ה', 'י'];
    return Board;
})();
//# sourceMappingURL=board.js.map
