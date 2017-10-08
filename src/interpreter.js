var Interpreter = function () {

    /*attributes*/
    var rules = {}
    var facts = {}
    var all = {}
    var badDB = false

    /* models */
    var MyElement = function (val) {

        var name
        if (val != undefined) name = val.split('(')[0];

        this.getName = function () {
            return name
        }
        this.getValue = function () {
            return val;
        }
    }
    function Fact(val) {
        MyElement.call(this, val)
    }
    function Rule(val) {
        MyElement.call(this, val)
        var params,facts;
        if (val!=undefined) {
            params = val.split(':-')[0].split('(')[1].slice(0, -1).split(',')
            facts = val.split(':-')[1]
        }
        this.getParams = function () {
            return params
        }
        this.getFacts = function () {
            return facts
        }
    }
    Fact.prototype = Object.create(MyElement.prototype); // See note below
    Fact.prototype.constructor = Fact;
    Rule.prototype = Object.create(MyElement.prototype); // See note below
    Rule.prototype.constructor = Rule;

    /* functions */

    function putInDic(dic, element) {
        if (!dic[element.getName()]) dic[element.getName()] = [element]
        else dic[element.getName()].push(element)
    }

    this.parseDB = function (params) {
        params.forEach(function (element) {
            var el = element.slice(0, -1).split(' ').join('');
            var size = el.split(':-').length
            var newElement;
            if (size == 2) {
                newElement = new Rule(el)
                putInDic(rules, newElement)
            }
            else if (size == 1) {
                newElement = new Fact(el)
                putInDic(facts, newElement)
            }
            else {
                this.badDB = true
            }
        }, this);
        this.all = {
            rules: {
                dic: rules,
                func: checkRule
            },
            facts: {
                dic: facts,
                func: checkFact
            }
        }
    }

    function checkFact(allDic, query) {
        var dic = allDic['facts']['dic']
        var flag = false
        var newQuery = new Fact(query.replace(' ', ''))
        var optionsList = dic[newQuery.getName()]
        optionsList.forEach(function (element) {
            if (element.getValue() == newQuery.getValue()) {
                flag = true
            }
        }, this);
        return flag
    }

    function checkRule(allDic, query) {
        var newQuery = new Rule(query.replace(' ', ''))
        var rule = allDic['rules']['dic'][newQuery.getName()][0]
        var params = rule.getParams()
        var queryParams = newQuery.getParams()
        var facts = rule.getFacts()
        for (let i = 0; i < params.length; i++) {
            facts = facts.split(params[i]).join(queryParams[i])
        }
        facts = facts.split('),').join(')-').split('-')
        var len = facts.length
        for (let i = 0; i < len; i++) {
            if (!checkFact(allDic, facts[i])) return false
        }
        return true
    }

    function getQueryType(allDic, query) {
        var queryName = query.split('(')
        if ((queryName.length != 2) && (queryName.length != 1)) return null
        for (var key in allDic) {
            for (var key2 in allDic[key]['dic']) {
                if (queryName[0] == key2) return key
            }
        }
        return null
    }

    this.checkQuery = function (params) {
        if (badDB) return null
        var query = params.split(' ').join('');
        var type = getQueryType(this.all, query)
        if (!type) return null
        var dicType = this.all[type] //rules or facts dic
        return dicType['func'](this.all, query)
    }

}

module.exports = Interpreter;