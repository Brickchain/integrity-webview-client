(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.integrityWebviewClient = global.ng.integrityWebviewClient || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

var WebviewClientService = (function () {
    function WebviewClientService() {
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.CancelKey = 'com.brickchain.integrity.cancel';
    }
    /**
     * @param {?} action
     * @return {?}
     */
    WebviewClientService.prototype.init = function (action) {
        ((window))[this.InitKey] = function (params) {
            action(params);
        };
        this.poll();
    };
    /**
     * @return {?}
     */
    WebviewClientService.prototype.poll = function () {
        ((window))[this.PollKey] = function () {
            console.log('hello');
        };
    };
    /**
     * @return {?}
     */
    WebviewClientService.prototype.cancel = function () {
        return this.CancelKey;
    };
    return WebviewClientService;
}());
WebviewClientService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
WebviewClientService.ctorParameters = function () { return []; };
var ReceiveMessageService = (function () {
    function ReceiveMessageService() {
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.HandleKey = 'com.brickchain.integrity.handle';
        this.HandleResultKey = 'com.brickchain.integrity.handle.result';
        this.HandleErrorKey = 'com.brickchain.integrity.handle.error';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    ReceiveMessageService.prototype.receiveMessage = function (event) {
        if (event.data.op) {
            var /** @type {?} */ script = event.data;
            switch (script.op) {
                case 'init':
                    script.result = ((window))[this.InitKey] ? ((window))[this.InitKey](script.param) : null;
                    break;
                case 'poll':
                    script.result = ((window))[this.PollKey] ? ((window))[this.PollKey]() : null;
                    break;
                case 'handle':
                    script.result = ((window))[this.HandleKey] ? ((window))[this.HandleKey]() : null;
                    break;
                case 'result':
                    if (event.data.param) {
                        script.result = ((window))[this.HandleResultKey] ? ((window))[this.HandleResultKey](script.param) : null;
                    }
                    else {
                        script.result = ((window))[this.HandleResultKey] ? ((window))[this.HandleResultKey]() : null;
                    }
                    break;
                case 'error':
                    script.result = ((window))[this.HandleErrorKey] ? ((window))[this.HandleErrorKey](script.param) : null;
                    break;
                case 'title':
                    script.result = document.title;
                    break;
                default:
                    script.error = 'unsupported operation';
            }
            event.source.postMessage(script, event.origin);
        }
    };
    return ReceiveMessageService;
}());
ReceiveMessageService.decorators = [
    { type: _angular_core.Injectable },
];
/**
 * @nocollapse
 */
ReceiveMessageService.ctorParameters = function () { return []; };

exports.WebviewClientService = WebviewClientService;
exports.ReceiveMessageService = ReceiveMessageService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=integrity-webview-client.umd.js.map
