import { Injectable } from '@angular/core';
var WebviewClientService = (function () {
    /**
     * @param {?} action
     */
    function WebviewClientService(action) {
        var _this = this;
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.HandleKey = 'com.brickchain.integrity.handle';
        this.HandleResultKey = 'com.brickchain.integrity.handle.result';
        this.HandleErrorKey = 'com.brickchain.integrity.handle.error';
        this.CancelKey = 'com.brickchain.integrity.cancel';
        window[this.InitKey] = function (params) {
            action(params);
        };
        window[this.PollKey] = function () { return _this.result; };
        window[this.HandleKey] = function () { return _this.handleDirective; };
    }
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
    { type: Injectable },
];
/**
 * @nocollapse
 */
WebviewClientService.ctorParameters = function () { return [
    null,
]; };
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
    { type: Injectable },
];
/**
 * @nocollapse
 */
ReceiveMessageService.ctorParameters = function () { return []; };
// Public classes.
/**
 * Angular library starter.
 * Build an Angular library compatible with AoT compilation & Tree shaking.
 * Written by Roberto Simonetti.
 * MIT license.
 * https://github.com/robisim74/angular-library-starter
 */
/**
 * Entry point for all public APIs of the package.
 */
/**
 * Generated bundle index. Do not edit.
 */
export { WebviewClientService, ReceiveMessageService };
//# sourceMappingURL=integrity-webview-client.es5.js.map
