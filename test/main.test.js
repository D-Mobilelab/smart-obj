var SmartObj = require('../src/main');

describe('SmartObj -', function () {

	it('basic set works', function(){
        var obj = new SmartObj();

        obj.set('test', 1);

		expect(obj.get('test')).toEqual(1);
	});

})