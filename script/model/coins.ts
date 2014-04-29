class Coins{
    private numCoins : number;
    private type : string;

    constructor(num : number){
        this.numCoins = num;
        this.type = 'coin';
    }

    public add(num : number) : void {
        this.numCoins += num;
    }

    public spend(num : number) : void {
        this.numCoins -= num;
    }

    public getNum() : number {
        return this.numCoins;
    }

    public getType() : string {
        return this.type;
    }
}