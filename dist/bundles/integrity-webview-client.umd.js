(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.integrityWebviewClient = global.ng.integrityWebviewClient || {}),global.ng.core));
}(this, (function (exports,_angular_core) { 'use strict';

var WebviewClientService = (function () {
    function WebviewClientService() {
        var _this = this;
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.HandleKey = 'com.brickchain.integrity.handle';
        this.HandleResultKey = 'com.brickchain.integrity.handle.result';
        this.HandleErrorKey = 'com.brickchain.integrity.handle.error';
        this.CancelKey = 'com.brickchain.integrity.cancel';
        window[this.PollKey] = function () { return _this.result; };
        window[this.HandleKey] = function () { return _this.handleDirective; };
    }
    /**
     * @return {?}
     */
    WebviewClientService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ((window))[_this.InitKey] = function (data) {
                try {
                    resolve(JSON.parse(data));
                }
                catch (error) {
                    reject(error);
                }
                return true;
            };
        });
    };
    /**
     * @param {?} result
     * @return {?}
     */
    WebviewClientService.prototype.close = function (result) {
        this.result = result;
    };
    /**
     * @return {?}
     */
    WebviewClientService.prototype.cancel = function () {
        this.result = this.CancelKey;
    };
    /**
     * @param {?} directive
     * @return {?}
     */
    WebviewClientService.prototype.handle = function (directive) {
        var _this = this;
        this.handleDirective = directive;
        return new Promise(function (resolve, reject) {
            ((window))[_this.HandleResultKey] = function (json) { return resolve(json ? JSON.parse(json) : json); };
            ((window))[_this.HandleErrorKey] = function (json) { return reject(json ? JSON.parse(json) : json); };
        });
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
// tslint:disable:max-line-length
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
