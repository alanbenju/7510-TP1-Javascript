var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');
var Fact = require('../src/Fact');
var Rule = require('../src/Rule');



describe("Facts and Rules", function () {

    var fact = null
    var rule = null

    beforeEach(function () {
        fact = new Fact('varon(juan)')
        rule = new Rule('hijo(X, Y) :- varon(X), padre(Y, X)')
    });

    describe('Facts and Rules names, params and facts', function () {

        it('varon(juan) should be varon', function () {
            assert(fact.getName()=='varon');
        });

        it('hijo(X, Y) params should be [X, Y]', function () {
            assert(rule.getParams().toString() === [ "X", "Y" ].toString());
        });

        it('hijo(X, Y) facts should be varon(X),padre(Y,X)', function () {
            assert(rule.getFacts() === 'varon(X),padre(Y,X)');
        });

    });


});


