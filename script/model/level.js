var Level = (function () {
    function Level(numLevel, book, perek, pasuk) {
        this.numLevel = numLevel;
        this.book = book;
        this.perek = perek;
        this.pasuk = pasuk;
    }
    Level.prototype.getBook = function () {
        return this.book;
    };

    Level.prototype.getPerek = function () {
        return this.perek;
    };

    Level.prototype.getPasuk = function () {
        return this.pasuk;
    };

    Level.prototype.getNumLevel = function () {
        return this.numLevel;
    };
    Level.BERESHIT = 1;
    Level.SHMOT = 2;
    Level.VAIKRA = 3;
    Level.BAMIDBAR = 4;
    Level.DVARIM = 5;
    return Level;
})();
//# sourceMappingURL=level.js.map
