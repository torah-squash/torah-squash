var Toy = (function () {
    function Toy(name, cost, explanation) {
        this.name = name;
        this.cost = cost;
        this.explanation = explanation;
    }
    Toy.prototype.getCost = function () {
        return this.cost;
    };

    Toy.prototype.setCost = function (cost) {
        this.cost = cost;
    };

    Toy.prototype.getName = function () {
        return this.name;
    };
    return Toy;
})();
//# sourceMappingURL=toy.js.map
