class Level{
    public static BERESHIT : number = 1;
    public static SHMOT : number = 2;
    public static VAIKRA : number = 3;
    public static BAMIDBAR : number = 4;
    public static DVARIM : number = 5;

    private numLevel : number;
    private book : number;
    private perek : number;
    private pasuk : number;

    constructor(numLevel : number, book : number, perek : number, pasuk : number){
    this.numLevel = numLevel;
    this.book = book;
    this.perek = perek;
    this.pasuk = pasuk;
    }

    public getBook() : number {
        return this.book;
    }

    public getPerek() : number {
        return this.perek;
    }

    public getPasuk() : number {
        return this.pasuk;
    }

    public getNumLevel() : number {
        return this.numLevel;
    }

}