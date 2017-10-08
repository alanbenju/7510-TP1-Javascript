var MyElement = require('./MyElement');

function Fact(val) {
    MyElement.call(this, val)
}

Fact.prototype = Object.create(MyElement.prototype);
Fact.prototype.constructor = Fact;

module.exports = Fact;