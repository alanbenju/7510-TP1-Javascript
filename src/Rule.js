var MyElement = require('./MyElement');

function Rule(val) {
    MyElement.call(this, val)
    var params, facts;
    if (val != undefined) {
        val = val.split(' ').join('');
        params = val.split(':-')[0].split('(')[1].slice(0, -1).split(',')
        facts = val.split(':-')[1]
    }
    this.getParams = function () {
        return params // EJ: [ 'X', 'Y' ] o [ 'pepe', 'juan' ]

    }
    this.getFacts = function () {
        return facts // EJ: [varon(X),padre(Y,X)]
    }
}

Rule.prototype = Object.create(MyElement.prototype);
Rule.prototype.constructor = Rule;

module.exports = Rule;