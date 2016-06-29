# smart-obj

SmartObj is a custom object that lets you define default values and value checkers.

# Default getters

var obj = new SmartObj(function(key){
    var myDefaultValues = {
        bananas: 3,
        apples: 2
    };
    
    if (myDefaultValues[key] == undefined) return 0;
    return myDefaultValues[key];
});

obj.get('unknownKey'); // returns 1
obj.get('apples'); // returns 2
obj.get('bananas'); // return 3

# Constants as default getters

var obj = new SmartObj(42);

obj.get('answer'); // return 42

# Value checkers

var obj = new SmartObj(undefined, function(value){
    if (value < 0) 
        throw 'Illegal value';
    else 
        return true;
});

obj.set('test1', 1);
obj.get('test1'); // returns 1

obj.set('test2', -1); // throws 'Illegal value'

# asPOJO

var obj = new SmartObj(0);

obj.get(1);
obj.get(2);

obj.asPOJO(); // returns {1: 0, 2: 0}

# Nested default objects

var returnNestedSmartObj = function(){  
    return new SmartObj(returnSmartObj);
}

var obj = new SmartObj(return returnNestedSmartObj);

obj.get(1).get(2).set(3, 4);

obj.asPOJO(); // return {1: 2: {3: 4}}