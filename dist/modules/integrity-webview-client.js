import { Injectable } from '@angular/core';

class WebviewClientService {
    constructor() {
        this.InitKey = 'com.brickchain.integrity.init';
        this.PollKey = 'com.brickchain.integrity.poll';
        this.HandleKey = 'com.brickchain.integrity.handle';
        this.HandleResultKey = 'com.brickchain.integrity.handle.result';
        this.HandleErrorKey = 'com.brickchain.integrity.handle.error';
        this.CancelKey = 'com.brickchain.integrity.cancel';
        window[this.PollKey] = () => this.result;
        window[this.HandleKey] = () => this.handleDirective;
    }
    /**
     * @return {?}
     */
    init() {
        return new Promise((resolve, reject) => {
            ((window))[this.InitKey] = (data) => {
                try {
                    resolve(JSON.parse(data));
                }
                catch (error) {
                    reject(error);
                }
                return true;
            };
        });
    }
    /**
     * @param {?} result
     * @return {?}
     */
    close(result) {
        this.result = result;
    }
    /**
     * @return {?}
     */
    cancel() {
        this.result = this.CancelKey;
    }
    /**
     * @param {?} directive
     * @return {?}
     */
    handle(directive) {
        this.handleDirective = directive;
        return new Promise((resolve, reject) => {
            ((window))[this.HandleResultKey] = (json) => resolve(json ? JSON.parse(json) : json);
            ((window))[this.HandleErrorKey] = (json) => reject(json ? JSON.parse(json) : json);
        });
    }
}
WebviewClientService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
WebviewClientService.ctorParameters = () => [];

// tslint:disable:max-line-length
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
            const /** @type {?} */ script = event.data;
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
//export { WebviewClientObject } from './services/webview-client-object';

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
