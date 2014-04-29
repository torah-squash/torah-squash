class Toy{
    private name : string;
    private cost : number;
    private explanation : string;
    constructor(name : string, cost : number, explanation : string){
        this.name = name;
        this.cost = cost;
        this.explanation = explanation;
    }

    public getCost() : number {
        return this.cost;
    }

    public setCost(cost : number) : void {
        this.cost = cost;
    }

    public getName() : string {
        return this.name;
    }
}