/**
 * @ngdoc overview
 * @name SmartObj
 *
 * @description
 * SmartObj is a custom object that lets you define default values
 * and value checkers.
 *
 */
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