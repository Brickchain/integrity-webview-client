import { Injectable } from '@angular/core';
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
    { type: Injectable },
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
