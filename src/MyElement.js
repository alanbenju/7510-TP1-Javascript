var MyElement = function (val) {
    var name
    if (val != undefined){
        val = val.split(' ').join('');
        name = val.split('(')[0]
    }
    this.getName = function () {
        return name
    }
    this.getValue = function () {
        return val;
    }
}

module.exports = MyElement;