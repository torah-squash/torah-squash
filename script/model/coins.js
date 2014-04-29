var Coins = (function () {
    function Coins(num) {
        this.numCoins = num;
        this.type = 'coin';
    }
    Coins.prototype.add = function (num) {
        this.numCoins += num;
    };

    Coins.prototype.spend = function (num) {
        this.numCoins -= num;
    };

    Coins.prototype.getNum = function () {
        return this.numCoins;
    };

    Coins.prototype.getType = function () {
        return this.type;
    };
    return Coins;
})();
//# sourceMappingURL=coins.js.map
