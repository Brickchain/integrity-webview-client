import { Injectable } from '@angular/core';

class WebviewClientService {
    constructor() {
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.CancelKey = 'com.brickchain.integrity.cancel';
    }
    /**
     * @param {?} action
     * @return {?}
     */
    init(action) {
        ((window))[this.InitKey] = (params) => {
            action(params);
        };
        this.poll();
    }
    /**
     * @return {?}
     */
    poll() {
        ((window))[this.PollKey] = () => {
            console.log('hello');
        };
    }
    /**
     * @return {?}
     */
    cancel() {
        return this.CancelKey;
    }
}
WebviewClientService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WebviewClientService.ctorParameters = () => [];

class ReceiveMessageService {
    constructor() {
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
    receiveMessage(event) {
        if (event.data.op) {
            let /** @type {?} */ script = event.data;
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
    }
}
ReceiveMessageService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ReceiveMessageService.ctorParameters = () => [];

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
//# sourceMappingURL=integrity-webview-client.js.map
