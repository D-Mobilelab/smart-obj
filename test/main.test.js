var SmartObj = require('../src/main');

describe('SmartObj -', function () {

	it('basic set and get work', function(){
        var obj = new SmartObj();

        obj.set('test', 1);

		expect(obj.get('test')).toEqual(1);
	});

    it('default get works', function(){
        var obj = new SmartObj();

        expect(obj.get('test')).toBeUndefined();
    });

    it('custom default getter works', function(){
        var obj = new SmartObj(function(key){
            return key + '1';
        });

        expect(obj.get('test')).toEqual('test1');
    });

    it('custom value checker works', function(){
        var obj = new SmartObj(undefined, function(value){
            if (value % 2 == 0){
                return true;
            } else {
                throw 'Illegal value';
            }
        });

        obj.set('test1', 2);

        expect(obj.get('test1')).toEqual(2);

        try {
            obj.set('test2', 3);
        } catch (err){
            expect(err).toEqual('Illegal value');
        }
    });

    it('detects illegal value checkers', function(){
        try {
            var obj = new SmartObj(undefined, 2);
        } catch (err){
            expect(err).toEqual('SmartObj :: valueChecker must be a function, got number');
        }
    });

    it('takes constants as default values', function(){
        var obj = new SmartObj(42);

        expect(obj.get('test')).toEqual(42);
    });

    it('basic conversion to POJO', function(){
        var obj = new SmartObj();

        obj.set('test1', 1);
        obj.set('test2', 2);

        expect(obj.asPOJO()).toEqual({test1: 1, test2: 2});
    });

    it('conversion to POJO of nested SmartObjs', function(){
        var returnSmartObj = function(){
            return new SmartObj(returnSmartObj);
        }

        var obj = new SmartObj(returnSmartObj);

        obj.get(1).get(2).get(3).set(4, 5);

        expect(obj.asPOJO()).toEqual({
            1: { 
                2: {
                    3: {
                        4: 5
                    },
                },
            }
        });
    });
});