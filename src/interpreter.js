var Fact = require('./Fact');
var Rule = require('./Rule');

var Interpreter = function () {

    /*private attributes*/
    var rules = {}
    var facts = {}
    var all = {}
    var badDB = false

    /* functions */
    function putInDic(dic, element) {
        if (!dic[element.getName()]) dic[element.getName()] = [element]
        else dic[element.getName()].push(element)
    }

    this.parseDB = function (params) {
        params.forEach(function (element) {
            var el = element.slice(0, -1)
            var size = el.split(':-').length
            if (size == 2) putInDic(rules, new Rule(el))
            else if (size == 1) putInDic(facts, new Fact(el))
            else this.badDB = true
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
        var found = false
        var newQuery = new Fact(query)
        var optionsList = dic[newQuery.getName()]
        for (var element of optionsList){
            if (element.getValue() == newQuery.getValue()) {
                found = true
                break
            }
        }
        return found
    }

    function checkRule(allDic, query) {
        var newQuery = new Rule(query)
        var rule = allDic['rules']['dic'][newQuery.getName()][0]
        var params = rule.getParams()
        var queryParams = newQuery.getParams()
        var facts = rule.getFacts()
        for (let i = 0; i < params.length; i++) {
            facts = facts.split(params[i]).join(queryParams[i])
        }
        facts = facts.split('),').join(')-').split('-') //varon(pepe),padre(juan,pepe)  -->  [ 'varon(pepe)', 'padre(juan,pepe)' ]
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
        var type = getQueryType(this.all, params)
        if (!type) return null
        var dicType = this.all[type] //rules or facts dic
        return dicType['func'](this.all, params)
    }

}

module.exports = Interpreter;

/*
var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = new Interpreter();
        interpreter.parseDB(db);
        console.log(interpreter.checkQuery('hijo(pepe, juan)')==true)
        */