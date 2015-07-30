/**
 * Created by Abaddon on 30.07.2015.
 */
jest.dontMock('../src/index');

describe('index', function () {
    var WoolEvent = require('../src/index');
    //Init
    it('Default value for variables woolHandlers and nextFnId must be undefined', function () {
        var wool = new WoolEvent();
        expect(wool.nextFnId).toBeUndefined();
        expect(wool.woolHandlers).toBeDefined();
    });
    //Test isFunction
    it('returns false for all except the function', function () {
        var test = [{}, [], null, undefined, 'test', 3], ln = test.length;
        while (ln--) {
            var type = test[ln];
            expect(WoolEvent.prototype.isFunction(type)).toBe(false);
        }
    });
    it('return true for function object', function () {
        var test = function () {
        };
        expect(WoolEvent.prototype.isFunction(test)).toBe(true);
    });
    //Bind function
    it('Must return false if bind only event name', function () {
        var wool = new WoolEvent();
        expect(wool.bind("test")).toBe(false);
    });

    it('Must return false if bind function called without arguments or only handler function', function () {
        var wool = new WoolEvent();
        expect(wool.bind()).toBe(false);
        expect(wool.bind("", function () {
        })).toBe(false);
    });

    it('Bind event', function () {
        var wool = new WoolEvent(), hand = [function () {
        }, function () {
        }];
        expect(wool.bind('start', hand[0])).toBe(true);
        //Check event
        expect(wool.woolHandlers['start']).toBeDefined();
        //Check default namespace
        expect(wool.woolHandlers['start']['def']).toBeDefined();
        wool.bind('start', hand[1]);
        var handlers = wool.woolHandlers['start']['def'], ln = handlers.length;
        while (ln--) {
            var fn = handlers[ln];
            expect(fn).toEqual(hand[ln]);
        }
    });

    it('Bind several event', function () {
        var wool = new WoolEvent(), test = function () {
        };
        expect(wool.bind('start end', test)).toBe(true);
        expect(wool.woolHandlers['start']['def']).toBeDefined();
        expect(wool.woolHandlers['end']['def']).toBeDefined();
        expect(wool.woolHandlers['start']['def'][0]).toEqual(test);
        expect(wool.woolHandlers['end']['def'][0]).toEqual(test);
    });

    it('Bind event with namespace', function () {
        var wool = new WoolEvent(), test = function () {
        };
        expect(wool.bind('start:first end end:first', test)).toBeTruthy();
        expect(wool.woolHandlers['start']['def']).toBeUndefined();
        expect(wool.woolHandlers['end']['def']).toBeDefined();
        expect(wool.woolHandlers['end']['first']).toBeDefined();
        expect(wool.woolHandlers['start']['first']).toBeDefined();
        wool.bind('start', test);
        expect(wool.woolHandlers['start']['def']).toBeDefined();
    });
    //Unbind
    it('Unbind function', function () {
        var wool = new WoolEvent(), test = function () {
        };
        //Try unbint non-existent events
        expect(wool.unbind()).toBeFalsy();
        expect(wool.unbind('start')).toBeTruthy();
        expect(wool.unbind('start:first')).toBeTruthy();
        expect(wool.unbind('start', test)).toBeTruthy();

        wool.bind('load ready success success:may', test);
        //Call unbind without handler
        wool.unbind('load');
        expect(wool.woolHandlers['load']).toBeUndefined();
        //Call unbind with handler
        wool.unbind('ready', test);
        expect(wool.woolHandlers['ready']).toBeUndefined();
        //Delite from namespace
        wool.unbind('success:may', test);
        expect(wool.woolHandlers['success']).toBeTruthy();
        expect(wool.woolHandlers['success']['may']).toBeUndefined();
        //Delite def handler
        wool.unbind('success', test);
        expect(wool.woolHandlers['success']).toBeUndefined();
        expect(wool.woolHandlers).toEqual({});
    });
    //Trigger
    it('Trigger function', function () {
        var wool = new WoolEvent(), test = function (e) {
            return 1;
        }, test2 = function () {
            return 2;
        };
        //Try trigget non-existent events
        expect(wool.trigger('success')).toBeTruthy();
        wool.bind('load load:first ready', test);
        wool.bind('ready load:first', test2);
        //Try trigget non-existent events
        expect(wool.trigger('success')).toBeTruthy();
        expect(wool.trigger('load')).toBeTruthy();
        expect(wool.trigger('ready')).toBeTruthy();
        expect(wool.trigger('load;first')).toBeTruthy();
    });
});