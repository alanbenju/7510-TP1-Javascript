var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Fact = require('../src/Fact');
var Rule = require('../src/Rule');
var MyElement = require('../src/MyElement');

describe("Facts and Rules prototypes", function () {

    var fact = null
    var rule = null

    beforeEach(function () {
        fact = new Fact('varon(juan)')
        el = new MyElement('varon(juan)')
        rule = new Rule('hijo(X, Y) :- varon(X), padre(Y, X)')
    });

    describe('Check if prototype is correct', function () {

        it('fact proto is MyElement', function () {
            assert(MyElement.prototype.isPrototypeOf(fact));
        });

        it('rule proto is MyElement', function () {
            assert(MyElement.prototype.isPrototypeOf(rule));
        });

        it('fact instance is MyElement', function () {
            assert(fact instanceof MyElement);
        });

        it('rule instance is MyElement', function () {
            assert(rule instanceof MyElement);
        });

        it('fact constructor still Fact', function () {
            assert(fact.constructor == Fact);
        });

        it('rule constructor still Rule', function () {
            assert(rule.constructor == Rule);
        });

        

    });


});


