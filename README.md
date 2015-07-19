# woolEvent
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![GitHub issues][git-issues]][git-issues-url]
[![GitHub stars][git-stars-image]][git-stars-url]
Small event emitter supporting the namespaces for any js object.
- pure js
- Any js object not browser doms
- Support event namespace

## How to install ##

    npm install woolevent
    
## How to use ##

    var WoolEvent = require('woolevent'),
        merge = require('object-assign');

    var Store = {
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
    merge(Store, WoolEvent.prototype);

    var setHandler = function () {
            console.log('You set new element!');
        },
        getHandler = function () {
            console.log('You get element from storage!');
        },
        getAllHandler = function () {
            console.log('You get all elements from storage!');
        }

    Store.bind('set', setHandler);
    Store.bind('get', getHandler);
    Store.bind('get:all', getAllHandler);
    
    Store.setItem();
    Store.getItem();
    Store.getAll();
    
## Methods ##
- **bind** - registration handlers for event:

        Store.bind('change click', funtion () {
            console.log('I start when object emit change or click event');
        });
        Store.bind('change:first', function () {
            console.log('I start when object emit change:first event but not change event');
        });

- **unbind** - unregistration handlers for event:

        Store.unbind('set', setHandler);
        Store.unbind('get', getHandler);
        Store.unbind('get:all', getAllHandler);
        //If handler function undefined when be unregistration all event tree
        Store.unbind('set');
        Store.unbind('get');
        //Сan also be
        Store.unbind('set get');
        
- **trigger** - emit need event:

        Store.trigger('set');
        Store.trigger('get');
        //Or
        Store.trigger('set get');
        
- **nextFnId** - contains unic mark of next handler for object;
- **woolHandlers** - contains handlers tree for object

MIT, see [LICENSE][license-url] for details.

[npm-image]: https://img.shields.io/npm/v/woolEvent.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/woolevent
[downloads-image]: http://img.shields.io/npm/dm/woolEvent.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/woolEvent
[license-image]: http://img.shields.io/npm/l/woolEvent.svg?style=flat-square
[license-url]: LICENSE
[git-issues]: https://img.shields.io/github/issues/abaddonGIT/woolEvent.svg
[git-issues-url]: https://github.com/abaddonGIT/woolEvent/issues
[git-stars-image]: https://img.shields.io/github/stars/abaddonGIT/woolEvent.svg
[git-stars-url]: https://github.com/abaddonGIT/woolEvent/stargazers