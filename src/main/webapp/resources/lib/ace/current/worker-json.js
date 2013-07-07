"no use strict";(function(e){if(typeof e.window!="undefined"&&e.document)return;e.console={log:function(){var e=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:e})},error:function(){var e=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:e})}},e.window=e,e.ace=e,e.normalizeModule=function(e,t){if(t.indexOf("!")!==-1){var n=t.split("!");return normalizeModule(e,n[0])+"!"+normalizeModule(e,n[1])}if(t.charAt(0)=="."){var r=e.split("/").slice(0,-1).join("/");t=r+"/"+t;while(t.indexOf(".")!==-1&&i!=t){var i=t;t=t.replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return t},e.require=function(e,t){t||(t=e,e=null);if(!t.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments");t=normalizeModule(e,t);var n=require.modules[t];if(n)return n.initialized||(n.initialized=!0,n.exports=n.factory().exports),n.exports;var r=t.split("/");r[0]=require.tlns[r[0]]||r[0];var i=r.join("/")+".js";return require.id=t,importScripts(i),require(e,t)},require.modules={},require.tlns={},e.define=function(e,t,n){arguments.length==2?(n=t,typeof e!="string"&&(t=e,e=require.id)):arguments.length==1&&(n=e,e=require.id);if(e.indexOf("text!")===0)return;var r=function(t,n){return require(e,t,n)};require.modules[e]={factory:function(){var e={exports:{}},t=n(r,e.exports,e);return t&&(e.exports=t),e}}},e.initBaseUrls=function(e){require.tlns=e},e.initSender=function(){var e=require("ace/lib/event_emitter").EventEmitter,t=require("ace/lib/oop"),n=function(){};return function(){t.implement(this,e),this.callback=function(e,t){postMessage({type:"call",id:t,data:e})},this.emit=function(e,t){postMessage({type:"event",name:e,data:t})}}.call(n.prototype),new n},e.main=null,e.sender=null,e.onmessage=function(e){var t=e.data;if(t.command){if(!main[t.command])throw new Error("Unknown command:"+t.command);main[t.command].apply(main,t.args)}else if(t.init){initBaseUrls(t.tlns),require("ace/lib/es5-shim"),sender=initSender();var n=require(t.module)[t.classname];main=new n(sender)}else t.event&&sender&&sender._emit(t.event,t.data)}})(this),ace.define("ace/lib/event_emitter",["require","exports","module"],function(e,t,n){var r={},i=function(){this.propagationStopped=!0},s=function(){this.defaultPrevented=!0};r._emit=r._dispatchEvent=function(e,t){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var n=this._eventRegistry[e]||[],r=this._defaultHandlers[e];if(!n.length&&!r)return;if(typeof t!="object"||!t)t={};t.type||(t.type=e),t.stopPropagation||(t.stopPropagation=i),t.preventDefault||(t.preventDefault=s);for(var o=0;o<n.length;o++){n[o](t,this);if(t.propagationStopped)break}if(r&&!t.defaultPrevented)return r(t,this)},r._signal=function(e,t){var n=(this._eventRegistry||{})[e];if(!n)return;for(var r=0;r<n.length;r++)n[r](t,this)},r.once=function(e,t){var n=this;t&&this.addEventListener(e,function r(){n.removeEventListener(e,r),t.apply(null,arguments)})},r.setDefaultHandler=function(e,t){var n=this._defaultHandlers;n||(n=this._defaultHandlers={_disabled_:{}});if(n[e]){var r=n[e],i=n._disabled_[e];i||(n._disabled_[e]=i=[]),i.push(r);var s=i.indexOf(t);s!=-1&&i.splice(s,1)}n[e]=t},r.removeDefaultHandler=function(e,t){var n=this._defaultHandlers;if(!n)return;var r=n._disabled_[e];if(n[e]==t){var i=n[e];r&&this.setDefaultHandler(e,r.pop())}else if(r){var s=r.indexOf(t);s!=-1&&r.splice(s,1)}},r.on=r.addEventListener=function(e,t,n){this._eventRegistry=this._eventRegistry||{};var r=this._eventRegistry[e];return r||(r=this._eventRegistry[e]=[]),r.indexOf(t)==-1&&r[n?"unshift":"push"](t),t},r.off=r.removeListener=r.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];if(!n)return;var r=n.indexOf(t);r!==-1&&n.splice(r,1)},r.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=r}),ace.define("ace/lib/oop",["require","exports","module"],function(e,t,n){t.inherits=function(){var e=function(){};return function(t,n){e.prototype=n.prototype,t.super_=n.prototype,t.prototype=new e,t.prototype.constructor=t}}(),t.mixin=function(e,t){for(var n in t)e[n]=t[n];return e},t.implement=function(e,n){t.mixin(e,n)}}),ace.define("ace/lib/es5-shim",["require","exports","module"],function(e,t,n){function r(){}function i(e){try{return Object.defineProperty(e,"sentinel",{}),"sentinel"in e}catch(t){}}function s(e){return e=+e,e!==e?e=0:e!==0&&e!==1/0&&e!==-1/0&&(e=(e>0||-1)*Math.floor(Math.abs(e))),e}function o(e){var t=typeof e;return e===null||t==="undefined"||t==="boolean"||t==="number"||t==="string"}function u(e){var t,n,r;if(o(e))return e;n=e.valueOf;if(typeof n=="function"){t=n.call(e);if(o(t))return t}r=e.toString;if(typeof r=="function"){t=r.call(e);if(o(t))return t}throw new TypeError}Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if(typeof t!="function")throw new TypeError("Function.prototype.bind called on incompatible "+t);var n=c.call(arguments,1),i=function(){if(this instanceof i){var r=t.apply(this,n.concat(c.call(arguments)));return Object(r)===r?r:this}return t.apply(e,n.concat(c.call(arguments)))};return t.prototype&&(r.prototype=t.prototype,i.prototype=new r,r.prototype=null),i});var a=Function.prototype.call,f=Array.prototype,l=Object.prototype,c=f.slice,h=a.bind(l.toString),p=a.bind(l.hasOwnProperty),d,v,m,g,y;if(y=p(l,"__defineGetter__"))d=a.bind(l.__defineGetter__),v=a.bind(l.__defineSetter__),m=a.bind(l.__lookupGetter__),g=a.bind(l.__lookupSetter__);if([1,2].splice(0).length!=2)if(!function(){function e(e){var t=new Array(e+2);return t[0]=t[1]=0,t}var t=[],n;t.splice.apply(t,e(20)),t.splice.apply(t,e(26)),n=t.length,t.splice(5,0,"XXX"),n+1==t.length;if(n+1==t.length)return!0}())Array.prototype.splice=function(e,t){var n=this.length;e>0?e>n&&(e=n):e==void 0?e=0:e<0&&(e=Math.max(n+e,0)),e+t<n||(t=n-e);var r=this.slice(e,e+t),i=c.call(arguments,2),s=i.length;if(e===n)s&&this.push.apply(this,i);else{var o=Math.min(t,n-e),u=e+o,a=u+s-o,f=n-u,l=n-o;if(a<u)for(var h=0;h<f;++h)this[a+h]=this[u+h];else if(a>u)for(h=f;h--;)this[a+h]=this[u+h];if(s&&e===l)this.length=l,this.push.apply(this,i);else{this.length=l+s;for(h=0;h<s;++h)this[e+h]=i[h]}}return r};else{var b=Array.prototype.splice;Array.prototype.splice=function(e,t){return arguments.length?b.apply(this,[e===void 0?0:e,t===void 0?this.length-e:t].concat(c.call(arguments,2))):[]}}Array.isArray||(Array.isArray=function(e){return h(e)=="[object Array]"});var w=Object("a"),E=w[0]!="a"||!(0 in w);Array.prototype.forEach||(Array.prototype.forEach=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=arguments[1],i=-1,s=n.length>>>0;if(h(e)!="[object Function]")throw new TypeError;while(++i<s)i in n&&e.call(r,n[i],i,t)}),Array.prototype.map||(Array.prototype.map=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0,i=Array(r),s=arguments[1];if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");for(var o=0;o<r;o++)o in n&&(i[o]=e.call(s,n[o],o,t));return i}),Array.prototype.filter||(Array.prototype.filter=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0,i=[],s,o=arguments[1];if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");for(var u=0;u<r;u++)u in n&&(s=n[u],e.call(o,s,u,t)&&i.push(s));return i}),Array.prototype.every||(Array.prototype.every=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0,i=arguments[1];if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");for(var s=0;s<r;s++)if(s in n&&!e.call(i,n[s],s,t))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0,i=arguments[1];if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");for(var s=0;s<r;s++)if(s in n&&e.call(i,n[s],s,t))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0;if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");if(!r&&arguments.length==1)throw new TypeError("reduce of empty array with no initial value");var i=0,s;if(arguments.length>=2)s=arguments[1];else do{if(i in n){s=n[i++];break}if(++i>=r)throw new TypeError("reduce of empty array with no initial value")}while(!0);for(;i<r;i++)i in n&&(s=e.call(void 0,s,n[i],i,t));return s}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(e){var t=F(this),n=E&&h(this)=="[object String]"?this.split(""):t,r=n.length>>>0;if(h(e)!="[object Function]")throw new TypeError(e+" is not a function");if(!r&&arguments.length==1)throw new TypeError("reduceRight of empty array with no initial value");var i,s=r-1;if(arguments.length>=2)i=arguments[1];else do{if(s in n){i=n[s--];break}if(--s<0)throw new TypeError("reduceRight of empty array with no initial value")}while(!0);do s in this&&(i=e.call(void 0,i,n[s],s,t));while(s--);return i});if(!Array.prototype.indexOf||[0,1].indexOf(1,2)!=-1)Array.prototype.indexOf=function(e){var t=E&&h(this)=="[object String]"?this.split(""):F(this),n=t.length>>>0;if(!n)return-1;var r=0;arguments.length>1&&(r=s(arguments[1])),r=r>=0?r:Math.max(0,n+r);for(;r<n;r++)if(r in t&&t[r]===e)return r;return-1};if(!Array.prototype.lastIndexOf||[0,1].lastIndexOf(0,-3)!=-1)Array.prototype.lastIndexOf=function(e){var t=E&&h(this)=="[object String]"?this.split(""):F(this),n=t.length>>>0;if(!n)return-1;var r=n-1;arguments.length>1&&(r=Math.min(r,s(arguments[1]))),r=r>=0?r:n-Math.abs(r);for(;r>=0;r--)if(r in t&&e===t[r])return r;return-1};Object.getPrototypeOf||(Object.getPrototypeOf=function(e){return e.__proto__||(e.constructor?e.constructor.prototype:l)});if(!Object.getOwnPropertyDescriptor){var S="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function(e,t){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError(S+e);if(!p(e,t))return;var n,r,i;n={enumerable:!0,configurable:!0};if(y){var s=e.__proto__;e.__proto__=l;var r=m(e,t),i=g(e,t);e.__proto__=s;if(r||i)return r&&(n.get=r),i&&(n.set=i),n}return n.value=e[t],n}}Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){return Object.keys(e)});if(!Object.create){var x;Object.prototype.__proto__===null?x=function(){return{__proto__:null}}:x=function(){var e={};for(var t in e)e[t]=null;return e.constructor=e.hasOwnProperty=e.propertyIsEnumerable=e.isPrototypeOf=e.toLocaleString=e.toString=e.valueOf=e.__proto__=null,e},Object.create=function(e,t){var n;if(e===null)n=x();else{if(typeof e!="object")throw new TypeError("typeof prototype["+typeof e+"] != 'object'");var r=function(){};r.prototype=e,n=new r,n.__proto__=e}return t!==void 0&&Object.defineProperties(n,t),n}}if(Object.defineProperty){var T=i({}),N=typeof document=="undefined"||i(document.createElement("div"));if(!T||!N)var C=Object.defineProperty}if(!Object.defineProperty||C){var k="Property description must be an object: ",L="Object.defineProperty called on non-object: ",A="getters & setters can not be defined on this javascript engine";Object.defineProperty=function(e,t,n){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError(L+e);if(typeof n!="object"&&typeof n!="function"||n===null)throw new TypeError(k+n);if(C)try{return C.call(Object,e,t,n)}catch(r){}if(p(n,"value"))if(y&&(m(e,t)||g(e,t))){var i=e.__proto__;e.__proto__=l,delete e[t],e[t]=n.value,e.__proto__=i}else e[t]=n.value;else{if(!y)throw new TypeError(A);p(n,"get")&&d(e,t,n.get),p(n,"set")&&v(e,t,n.set)}return e}}Object.defineProperties||(Object.defineProperties=function(e,t){for(var n in t)p(t,n)&&Object.defineProperty(e,n,t[n]);return e}),Object.seal||(Object.seal=function(e){return e}),Object.freeze||(Object.freeze=function(e){return e});try{Object.freeze(function(){})}catch(O){Object.freeze=function(e){return function(t){return typeof t=="function"?t:e(t)}}(Object.freeze)}Object.preventExtensions||(Object.preventExtensions=function(e){return e}),Object.isSealed||(Object.isSealed=function(e){return!1}),Object.isFrozen||(Object.isFrozen=function(e){return!1}),Object.isExtensible||(Object.isExtensible=function(e){if(Object(e)===e)throw new TypeError;var t="";while(p(e,t))t+="?";e[t]=!0;var n=p(e,t);return delete e[t],n});if(!Object.keys){var M=!0,_=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],D=_.length;for(var P in{toString:null})M=!1;Object.keys=function I(e){if(typeof e!="object"&&typeof e!="function"||e===null)throw new TypeError("Object.keys called on a non-object");var I=[];for(var t in e)p(e,t)&&I.push(t);if(M)for(var n=0,r=D;n<r;n++){var i=_[n];p(e,i)&&I.push(i)}return I}}Date.now||(Date.now=function(){return(new Date).getTime()});var H="	\n\f\r   ᠎             　\u2028\u2029﻿";if(!String.prototype.trim||H.trim()){H="["+H+"]";var B=new RegExp("^"+H+H+"*"),j=new RegExp(H+H+"*$");String.prototype.trim=function(){return String(this).replace(B,"").replace(j,"")}}var F=function(e){if(e==null)throw new TypeError("can't convert "+e+" to object");return Object(e)}}),ace.define("ace/mode/json_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/json/json_parse"],function(e,t,n){var r=e("../lib/oop"),i=e("../worker/mirror").Mirror,s=e("./json/json_parse"),o=t.JsonWorker=function(e){i.call(this,e),this.setTimeout(200)};r.inherits(o,i),function(){this.onUpdate=function(){var e=this.doc.getValue();try{var t=s(e)}catch(n){var r=this.doc.indexToPosition(n.at-1);this.sender.emit("error",{row:r.row,column:r.column,text:n.message,type:"error"});return}this.sender.emit("ok")}}.call(o.prototype)}),ace.define("ace/worker/mirror",["require","exports","module","ace/document","ace/lib/lang"],function(e,t,n){var r=e("../document").Document,i=e("../lib/lang"),s=t.Mirror=function(e){this.sender=e;var t=this.doc=new r(""),n=this.deferredUpdate=i.delayedCall(this.onUpdate.bind(this)),s=this;e.on("change",function(e){t.applyDeltas(e.data),n.schedule(s.$timeout)})};(function(){this.$timeout=500,this.setTimeout=function(e){this.$timeout=e},this.setValue=function(e){this.doc.setValue(e),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(e){this.sender.callback(this.doc.getValue(),e)},this.onUpdate=function(){}}).call(s.prototype)}),ace.define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(e,t,n){var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=e("./range").Range,o=e("./anchor").Anchor,u=function(e){this.$lines=[],e.length==0?this.$lines=[""]:Array.isArray(e)?this._insertLines(0,e):this.insert({row:0,column:0},e)};(function(){r.implement(this,i),this.setValue=function(e){var t=this.getLength();this.remove(new s(0,0,t,this.getLine(t-1).length)),this.insert({row:0,column:0},e)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(e,t){return new o(this,e,t)},"aaa".split(/a/).length==0?this.$split=function(e){return e.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(e){return e.split(/\r\n|\r|\n/)},this.$detectNewLine=function(e){var t=e.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=t?t[1]:"\n"},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine}},this.$autoNewLine="\n",this.$newLineMode="auto",this.setNewLineMode=function(e){if(this.$newLineMode===e)return;this.$newLineMode=e},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(e){return e=="\r\n"||e=="\r"||e=="\n"},this.getLine=function(e){return this.$lines[e]||""},this.getLines=function(e,t){return this.$lines.slice(e,t+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(e){if(e.start.row==e.end.row)return this.$lines[e.start.row].substring(e.start.column,e.end.column);var t=this.getLines(e.start.row,e.end.row);t[0]=(t[0]||"").substring(e.start.column);var n=t.length-1;return e.end.row-e.start.row==n&&(t[n]=t[n].substring(0,e.end.column)),t.join(this.getNewLineCharacter())},this.$clipPosition=function(e){var t=this.getLength();return e.row>=t?(e.row=Math.max(0,t-1),e.column=this.getLine(t-1).length):e.row<0&&(e.row=0),e},this.insert=function(e,t){if(!t||t.length===0)return e;e=this.$clipPosition(e),this.getLength()<=1&&this.$detectNewLine(t);var n=this.$split(t),r=n.splice(0,1)[0],i=n.length==0?null:n.splice(n.length-1,1)[0];return e=this.insertInLine(e,r),i!==null&&(e=this.insertNewLine(e),e=this._insertLines(e.row,n),e=this.insertInLine(e,i||"")),e},this.insertLines=function(e,t){return e>=this.getLength()?this.insert({row:e,column:0},"\n"+t.join("\n")):this._insertLines(Math.max(e,0),t)},this._insertLines=function(e,t){if(t.length==0)return{row:e,column:0};if(t.length>65535){var n=this._insertLines(e,t.slice(65535));t=t.slice(0,65535)}var r=[e,0];r.push.apply(r,t),this.$lines.splice.apply(this.$lines,r);var i=new s(e,0,e+t.length,0),o={action:"insertLines",range:i,lines:t};return this._emit("change",{data:o}),n||i.end},this.insertNewLine=function(e){e=this.$clipPosition(e);var t=this.$lines[e.row]||"";this.$lines[e.row]=t.substring(0,e.column),this.$lines.splice(e.row+1,0,t.substring(e.column,t.length));var n={row:e.row+1,column:0},r={action:"insertText",range:s.fromPoints(e,n),text:this.getNewLineCharacter()};return this._emit("change",{data:r}),n},this.insertInLine=function(e,t){if(t.length==0)return e;var n=this.$lines[e.row]||"";this.$lines[e.row]=n.substring(0,e.column)+t+n.substring(e.column);var r={row:e.row,column:e.column+t.length},i={action:"insertText",range:s.fromPoints(e,r),text:t};return this._emit("change",{data:i}),r},this.remove=function(e){e.start=this.$clipPosition(e.start),e.end=this.$clipPosition(e.end);if(e.isEmpty())return e.start;var t=e.start.row,n=e.end.row;if(e.isMultiLine()){var r=e.start.column==0?t:t+1,i=n-1;e.end.column>0&&this.removeInLine(n,0,e.end.column),i>=r&&this._removeLines(r,i),r!=t&&(this.removeInLine(t,e.start.column,this.getLine(t).length),this.removeNewLine(e.start.row))}else this.removeInLine(t,e.start.column,e.end.column);return e.start},this.removeInLine=function(e,t,n){if(t==n)return;var r=new s(e,t,e,n),i=this.getLine(e),o=i.substring(t,n),u=i.substring(0,t)+i.substring(n,i.length);this.$lines.splice(e,1,u);var a={action:"removeText",range:r,text:o};return this._emit("change",{data:a}),r.start},this.removeLines=function(e,t){return e<0||t>=this.getLength()?this.remove(new s(e,0,t+1,0)):this._removeLines(e,t)},this._removeLines=function(e,t){var n=new s(e,0,t+1,0),r=this.$lines.splice(e,t-e+1),i={action:"removeLines",range:n,nl:this.getNewLineCharacter(),lines:r};return this._emit("change",{data:i}),r},this.removeNewLine=function(e){var t=this.getLine(e),n=this.getLine(e+1),r=new s(e,t.length,e+1,0),i=t+n;this.$lines.splice(e,2,i);var o={action:"removeText",range:r,text:this.getNewLineCharacter()};this._emit("change",{data:o})},this.replace=function(e,t){if(t.length==0&&e.isEmpty())return e.start;if(t==this.getTextRange(e))return e.end;this.remove(e);if(t)var n=this.insert(e.start,t);else n=e.start;return n},this.applyDeltas=function(e){for(var t=0;t<e.length;t++){var n=e[t],r=s.fromPoints(n.range.start,n.range.end);n.action=="insertLines"?this.insertLines(r.start.row,n.lines):n.action=="insertText"?this.insert(r.start,n.text):n.action=="removeLines"?this._removeLines(r.start.row,r.end.row-1):n.action=="removeText"&&this.remove(r)}},this.revertDeltas=function(e){for(var t=e.length-1;t>=0;t--){var n=e[t],r=s.fromPoints(n.range.start,n.range.end);n.action=="insertLines"?this._removeLines(r.start.row,r.end.row-1):n.action=="insertText"?this.remove(r):n.action=="removeLines"?this._insertLines(r.start.row,n.lines):n.action=="removeText"&&this.insert(r.start,n.text)}},this.indexToPosition=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length;for(var i=t||0,s=n.length;i<s;i++){e-=n[i].length+r;if(e<0)return{row:i,column:e+n[i].length+r}}return{row:s-1,column:n[s-1].length}},this.positionToIndex=function(e,t){var n=this.$lines||this.getAllLines(),r=this.getNewLineCharacter().length,i=0,s=Math.min(e.row,n.length);for(var o=t||0;o<s;++o)i+=n[o].length+r;return i+e.column}}).call(u.prototype),t.Document=u}),ace.define("ace/range",["require","exports","module"],function(e,t,n){var r=function(e,t){return e.row-t.row||e.column-t.column},i=function(e,t,n,r){this.start={row:e,column:t},this.end={row:n,column:r}};(function(){this.isEqual=function(e){return this.start.row===e.start.row&&this.end.row===e.end.row&&this.start.column===e.start.column&&this.end.column===e.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(e,t){return this.compare(e,t)==0},this.compareRange=function(e){var t,n=e.end,r=e.start;return t=this.compare(n.row,n.column),t==1?(t=this.compare(r.row,r.column),t==1?2:t==0?1:0):t==-1?-2:(t=this.compare(r.row,r.column),t==-1?-1:t==1?42:0)},this.comparePoint=function(e){return this.compare(e.row,e.column)},this.containsRange=function(e){return this.comparePoint(e.start)==0&&this.comparePoint(e.end)==0},this.intersects=function(e){var t=this.compareRange(e);return t==-1||t==0||t==1},this.isEnd=function(e,t){return this.end.row==e&&this.end.column==t},this.isStart=function(e,t){return this.start.row==e&&this.start.column==t},this.setStart=function(e,t){typeof e=="object"?(this.start.column=e.column,this.start.row=e.row):(this.start.row=e,this.start.column=t)},this.setEnd=function(e,t){typeof e=="object"?(this.end.column=e.column,this.end.row=e.row):(this.end.row=e,this.end.column=t)},this.inside=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)||this.isStart(e,t)?!1:!0:!1},this.insideStart=function(e,t){return this.compare(e,t)==0?this.isEnd(e,t)?!1:!0:!1},this.insideEnd=function(e,t){return this.compare(e,t)==0?this.isStart(e,t)?!1:!0:!1},this.compare=function(e,t){return!this.isMultiLine()&&e===this.start.row?t<this.start.column?-1:t>this.end.column?1:0:e<this.start.row?-1:e>this.end.row?1:this.start.row===e?t>=this.start.column?0:-1:this.end.row===e?t<=this.end.column?0:1:0},this.compareStart=function(e,t){return this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.compareEnd=function(e,t){return this.end.row==e&&this.end.column==t?1:this.compare(e,t)},this.compareInside=function(e,t){return this.end.row==e&&this.end.column==t?1:this.start.row==e&&this.start.column==t?-1:this.compare(e,t)},this.clipRows=function(e,t){if(this.end.row>t)var n={row:t+1,column:0};else if(this.end.row<e)var n={row:e,column:0};if(this.start.row>t)var r={row:t+1,column:0};else if(this.start.row<e)var r={row:e,column:0};return i.fromPoints(r||this.start,n||this.end)},this.extend=function(e,t){var n=this.compare(e,t);if(n==0)return this;if(n==-1)var r={row:e,column:t};else var s={row:e,column:t};return i.fromPoints(r||this.start,s||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return i.fromPoints(this.start,this.end)},this.collapseRows=function(){return this.end.column==0?new i(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new i(this.start.row,0,this.end.row,0)},this.toScreenRange=function(e){var t=e.documentToScreenPosition(this.start),n=e.documentToScreenPosition(this.end);return new i(t.row,t.column,n.row,n.column)},this.moveBy=function(e,t){this.start.row+=e,this.start.column+=t,this.end.row+=e,this.end.column+=t}}).call(i.prototype),i.fromPoints=function(e,t){return new i(e.row,e.column,t.row,t.column)},i.comparePoints=r,i.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},t.Range=i}),ace.define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(e,t,n){var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=t.Anchor=function(e,t,n){this.document=e,typeof n=="undefined"?this.setPosition(t.row,t.column):this.setPosition(t,n),this.$onChange=this.onChange.bind(this),e.on("change",this.$onChange)};(function(){r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.onChange=function(e){var t=e.data,n=t.range;if(n.start.row==n.end.row&&n.start.row!=this.row)return;if(n.start.row>this.row)return;if(n.start.row==this.row&&n.start.column>this.column)return;var r=this.row,i=this.column,s=n.start,o=n.end;t.action==="insertText"?s.row===r&&s.column<=i?s.row===o.row?i+=o.column-s.column:(i-=s.column,r+=o.row-s.row):s.row!==o.row&&s.row<r&&(r+=o.row-s.row):t.action==="insertLines"?s.row<=r&&(r+=o.row-s.row):t.action==="removeText"?s.row===r&&s.column<i?o.column>=i?i=s.column:i=Math.max(0,i-(o.column-s.column)):s.row!==o.row&&s.row<r?(o.row===r&&(i=Math.max(0,i-o.column)+s.column),r-=o.row-s.row):o.row===r&&(r-=o.row-s.row,i=Math.max(0,i-o.column)+s.column):t.action=="removeLines"&&s.row<=r&&(o.row<=r?r-=o.row-s.row:(r=s.row,i=0)),this.setPosition(r,i,!0)},this.setPosition=function(e,t,n){var r;n?r={row:e,column:t}:r=this.$clipPositionToDocument(e,t);if(this.row==r.row&&this.column==r.column)return;var i={row:this.row,column:this.column};this.row=r.row,this.column=r.column,this._emit("change",{old:i,value:r})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.$clipPositionToDocument=function(e,t){var n={};return e>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):e<0?(n.row=0,n.column=0):(n.row=e,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,t))),t<0&&(n.column=0),n}}).call(s.prototype)}),ace.define("ace/lib/lang",["require","exports","module"],function(e,t,n){t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){var n="";while(t>0){t&1&&(n+=e);if(t>>=1)e+=e}return n};var r=/^\s\s*/,i=/\s\s*$/;t.stringTrimLeft=function(e){return e.replace(r,"")},t.stringTrimRight=function(e){return e.replace(i,"")},t.copyObject=function(e){var t={};for(var n in e)t[n]=e[n];return t},t.copyArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)e[n]&&typeof e[n]=="object"?t[n]=this.copyObject(e[n]):t[n]=e[n];return t},t.deepCopy=function(e){if(typeof e!="object")return e;var t=e.constructor();for(var n in e)typeof e[n]=="object"?t[n]=this.deepCopy(e[n]):t[n]=e[n];return t},t.arrayToMap=function(e){var t={};for(var n=0;n<e.length;n++)t[e[n]]=1;return t},t.createMap=function(e){var t=Object.create(null);for(var n in e)t[n]=e[n];return t},t.arrayRemove=function(e,t){for(var n=0;n<=e.length;n++)t===e[n]&&e.splice(n,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.escapeHTML=function(e){return e.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},t.getMatchOffsets=function(e,t){var n=[];return e.replace(t,function(e){n.push({offset:arguments[arguments.length-2],length:e.length})}),n},t.deferredCall=function(e){var t=null,n=function(){t=null,e()},r=function(e){return r.cancel(),t=setTimeout(n,e||0),r};return r.schedule=r,r.call=function(){return this.cancel(),e(),r},r.cancel=function(){return clearTimeout(t),t=null,r},r},t.delayedCall=function(e,t){var n=null,r=function(){n=null,e()},i=function(e){n&&clearTimeout(n),n=setTimeout(r,e||t)};return i.delay=i,i.schedule=function(e){n==null&&(n=setTimeout(r,e||0))},i.call=function(){this.cancel(),e()},i.cancel=function(){n&&clearTimeout(n),n=null},i.isPending=function(){return n},i}}),ace.define("ace/mode/json/json_parse",["require","exports","module"],function(e,t,n){var r,i,s={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},o,u=function(e){throw{name:"SyntaxError",message:e,at:r,text:o}},a=function(e){return e&&e!==i&&u("Expected '"+e+"' instead of '"+i+"'"),i=o.charAt(r),r+=1,i},f=function(){var e,t="";i==="-"&&(t="-",a("-"));while(i>="0"&&i<="9")t+=i,a();if(i==="."){t+=".";while(a()&&i>="0"&&i<="9")t+=i}if(i==="e"||i==="E"){t+=i,a();if(i==="-"||i==="+")t+=i,a();while(i>="0"&&i<="9")t+=i,a()}e=+t;if(!isNaN(e))return e;u("Bad number")},l=function(){var e,t,n="",r;if(i==='"')while(a()){if(i==='"')return a(),n;if(i==="\\"){a();if(i==="u"){r=0;for(t=0;t<4;t+=1){e=parseInt(a(),16);if(!isFinite(e))break;r=r*16+e}n+=String.fromCharCode(r)}else{if(typeof s[i]!="string")break;n+=s[i]}}else n+=i}u("Bad string")},c=function(){while(i&&i<=" ")a()},h=function(){switch(i){case"t":return a("t"),a("r"),a("u"),a("e"),!0;case"f":return a("f"),a("a"),a("l"),a("s"),a("e"),!1;case"n":return a("n"),a("u"),a("l"),a("l"),null}u("Unexpected '"+i+"'")},p,d=function(){var e=[];if(i==="["){a("["),c();if(i==="]")return a("]"),e;while(i){e.push(p()),c();if(i==="]")return a("]"),e;a(","),c()}}u("Bad array")},v=function(){var e,t={};if(i==="{"){a("{"),c();if(i==="}")return a("}"),t;while(i){e=l(),c(),a(":"),Object.hasOwnProperty.call(t,e)&&u('Duplicate key "'+e+'"'),t[e]=p(),c();if(i==="}")return a("}"),t;a(","),c()}}u("Bad object")};return p=function(){c();switch(i){case"{":return v();case"[":return d();case'"':return l();case"-":return f();default:return i>="0"&&i<="9"?f():h()}},function(e,t){var n;return o=e,r=0,i=" ",n=p(),c(),i&&u("Syntax error"),typeof t=="function"?function s(e,n){var r,i,o=e[n];if(o&&typeof o=="object")for(r in o)Object.hasOwnProperty.call(o,r)&&(i=s(o,r),i!==undefined?o[r]=i:delete o[r]);return t.call(e,n,o)}({"":n},""):n}})