!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.WoolEvent=t():e.WoolEvent=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){(function(e){"use strict";function t(){this.woolHandlers=this.woolHandlers||{},this.nextFnId=this.nextFnId||void 0}"undefined"!=typeof e&&"exports"in e&&(e.exports=t),t.prototype={woolHandlers:void 0,nextFnId:0,isFunction:function(e){return"function"==typeof e},bind:function(e,t){this.woolHandlers||(this.woolHandlers={});var n=(e||"").match(/\S+/g)||[""],o=n.length,i=this.woolHandlers;if(o){t.guid=t.guid||this.nextFnId++;for(var r=0;o>r;r++){var l,f=n[r],s=f.split(":"),d=s[0],a=s[1]||"def",u=i[d];u?(l=i[d][a],l||(i[d][a]=[]),i[d][a].push(t)):(i[d]={},i[d][a]=[],i[d][a].push(t))}}},unbind:function(e,t){for(var n=(e||"").match(/\S+/g)||[""],o=n.length,i=this.woolHandlers,r="function"==typeof t,l=0;o>l;l++){var f,s=n[l],d=s.split(":"),a=d[0],u=d[1]||"def",c=i[a];if(c)if(f=i[a][u],r){var p=t.guid;if(p){if(f)for(var h=f.length;h--;){var v=f[h],x=v.guid;x!==p||(i[a][u].splice(h,1),f.length||("def"===u?delete i[a]:delete i[a][u]))}}else"def"===u?delete i[a]:delete i[a][u]}else delete i[a]}},trigger:function(e){var t=(e||"").match(/\S+/g)||[""],n=t.length,o=this.woolHandlers;if(o)for(var i=0;n>i;i++){var r,l=t[i],f=l.split(":"),s=f[0],d=f[1]||"def",a=o[s];if(a){if(r=a[d],!r)return;for(var u=r.length,c=0;u>c;c++)r[c].call(this,Array.prototype.slice.call(arguments,1))}}}}}).call(t,n(2)(e))},function(e,t,n){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});