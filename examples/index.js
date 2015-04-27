/**
 * Created by Abaddon on 26.04.2015.
 */
var React = require('react'), WoolEvent = require('../src/index.js');

(function (d, w) {
    d.addEventListener('DOMContentLoaded', function () {
        var wool = new WoolEvent(), buttons = d.querySelectorAll('.action'),
            Store = {
                setItem: function () {
                    this.trigger('set');
                },
                getItem: function () {
                    this.trigger('get');
                },
                getAll: function () {
                    this.trigger('get:all');
                }
            };
        wool.mix(Store);

        var setHandler = function () {
            alert('You set new element!');
        };

        var getHandler = function () {
            alert('You get element from storage!');
        };

        var getAllHandler = function () {
            alert('You get all elements from storage!');
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

        console.log(Store);

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', clickHandler, false);
        }

    }, false);
}(document, window));