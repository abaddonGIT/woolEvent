/**
 * Created by abaddon on 29.01.2015.
 */
"use strict";
function WoolEvent() {
    this.woolHandlers = this.woolHandlers || {};
    this.nextFnId = this.nextFnId || undefined;
};

if (typeof module !== "undefined" && ('exports' in module)) {
    module.exports = WoolEvent;
}

WoolEvent.prototype = {
    woolHandlers: undefined,
    nextFnId: 0,
    isFunction: function (obj) {
        return typeof obj === 'function';
    },
    bind: function (type, fn) {//register events

        if (!this.woolHandlers) this.woolHandlers = {};

        var types = (type || "").match(/\S+/g) || [], ln = types.length, handlers = this.woolHandlers;

        if (!ln) return false;

        if (!this.isFunction(fn)) return false;

        fn.guid = fn.guid || this.nextFnId++;
        for (var i = 0; i < ln; i++) {
            var currEvent = types[i], envArr = currEvent.split(':'), name = envArr[0], space = envArr[1] || 'def', tp = handlers[name], tpSp;

            if (tp) {
                tpSp = handlers[name][space];
                if (!tpSp) {
                    handlers[name][space] = [];
                }
                handlers[name][space].push(fn);
            } else {
                handlers[name] = {};
                handlers[name][space] = [];
                handlers[name][space].push(fn);
            }
        }
        return true;
    },
    unbind: function (type, fn) {//unregister events
        var types = (type || "").match(/\S+/g) || [], ln = types.length, handlers = this.woolHandlers, isFn = typeof fn === 'function';

        if (!ln || !handlers) return false;

        for (var i = 0; i < ln; i++) {
            var currEvent = types[i], envArr = currEvent.split(':'), name = envArr[0], space = envArr[1] || 'def', tp = handlers[name], tpSp;
            if (!tp) continue;
            tpSp = handlers[name][space];
            if (!isFn) delete handlers[name];//del event if handler undefined

            if (isFn) {
                var guid = fn.guid;
                if (guid) {
                    if (tpSp) {
                        var tpSpLn = tpSp.length;
                        while (tpSpLn--) {
                            var currFn = tpSp[tpSpLn], currGuid = currFn.guid;
                            if (currGuid === guid) {
                                handlers[name][space].splice(tpSpLn, 1);
                                if (!tpSp.length) {
                                    if (space === 'def') {
                                        delete handlers[name];
                                    } else {
                                        delete handlers[name][space];
                                    }
                                }
                                continue;
                            }
                        }
                    }
                } else {
                    if (space === 'def') {
                        delete handlers[name];
                    } else {
                        delete handlers[name][space];
                    }
                }
            }
        }
        return true;
    },
    trigger: function (type) {//call event handlers
        var types = (type || "").match(/\S+/g) || [], ln = types.length, handlers = this.woolHandlers;

        if (!handlers || !ln) return false;

        for (var i = 0; i < ln; i++) {
            var currEvent = types[i], envArr = currEvent.split(':'), name = envArr[0], space = envArr[1] || 'def', tp = handlers[name], tpSp;
            if (!tp) continue;

            tpSp = tp[space];
            if (!tpSp) return;
            var tpSpLn = tpSp.length;
            for (var j = 0; j < tpSpLn; j++) {
                tpSp[j].call(this, Array.prototype.slice.call(arguments, 1));
            }
        }

        return true;
    }
};