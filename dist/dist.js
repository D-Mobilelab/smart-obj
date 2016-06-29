(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmartObj = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var SmartObj = function(defaultSetter, valueChecker){

    // if defaultSetter is a constant, define a function that returns it
    if (typeof defaultSetter !== 'function'){
        var defaultConstant = defaultSetter;
        defaultSetter = function(){
            return defaultConstant;
        }
    }

    // if no valueChecker is specified, accept any value
    if (typeof valueChecker === 'undefined'){
        valueChecker = function acceptAny(value){
            return true;
        }
    } else if (typeof defaultSetter !== 'function'){
        throw 'SmartObj :: valueChecker must be a function, got ' + typeof defaultSetter;
    }

    var obj = {};

    this.get = function(key){
        if (typeof obj[key] === 'undefined'){
            obj[key] = defaultSetter(key);
        }

        return obj[key];
    }

    this.set = function(key, value){
        var checkResult = valueChecker(value);
        if (!!checkResult){
            obj[key] = value;
        }
    }

    this.asPOJO = function(){
        var toReturn = {};
        for (var key in obj){
            if (obj[key] instanceof SmartObj){
                toReturn[key] = obj[key].asPOJO();   
            } else {
                toReturn[key] = obj[key];
            }
        }

        return toReturn;
    }

}

module.exports = SmartObj;
},{}]},{},[1])(1)
});