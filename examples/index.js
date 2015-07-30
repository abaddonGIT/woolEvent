/**
 * Created by Abaddon on 26.04.2015.
 */
var WoolEvent = require('../src/index.js'), merge = require('object-assign');

(function (d, w) {
    d.addEventListener('DOMContentLoaded', function () {
        var buttons = d.querySelectorAll('.action'),
            Store = {
                setItem: function () {
                    this.trigger('set');
                },
                getItem: function () {
                    this.trigger('get');
                },
                getAll: function () {
                    this.trigger('get:all', 'test');
                }
            }, Store2 = {};

        merge(Store, WoolEvent.prototype);
        merge(Store2, WoolEvent.prototype);

        var setHandler = function () {
            alert('You set new element!');
        };

        var getHandler = function () {
            alert('You get element from storage!');
        };

        var getAllHandler = function (test) {
            alert(test);
        };

        var clickHandler = function (e) {
            var action = this.getAttribute('data-type');
            switch (action) {
                case 'set':
                    Store.setItem();
                    break;
                case 'get':
                    Store.getItem();
                    break;
                case 'get-all':
                    Store.getAll();
                    break;
            }
            e.preventDefault();
        };

        Store.bind('set', setHandler);
        Store.bind('get', getHandler);
        Store.bind('get:all', getAllHandler);

        Store.unbind('fdgdf');

        console.log(Store);
        console.log(Store2);

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', clickHandler, false);
        }

    }, false);
}(document, window));