// tslint:disable:max-line-length
import { Injectable } from '@angular/core';

@Injectable()
export class WebviewClientService {

  private params: any;
  private InitKey: string = 'com.brickchain.integrity.init';
  private PollKey: string = 'com.brickchain.integrity.poll';
  private HandleKey: string = 'com.brickchain.integrity.handle';
  private HandleResultKey: string = 'com.brickchain.integrity.handle.result';
  private HandleErrorKey: string = 'com.brickchain.integrity.handle.error';
  private CancelKey: string = 'com.brickchain.integrity.cancel';
  private result: any;
  private handleDirective: any;

  public constructor() {
    (window as any)[this.PollKey] = () => this.result;
    (window as any)[this.HandleKey] = () => this.handleDirective;
    window.addEventListener('message', (event) => this.receiveMessage(event), false);
  }

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any)[this.InitKey] = (data: string) => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          console.error("Failed parsing data:", data);
          reject(error);
        }
        return true;
      };
    });
  }

  public close(result: any): void {
    this.result = result;
  }

  public cancel(): void {
    this.result = this.CancelKey;
  }

  public handle(directive: any): Promise<any> {
    this.handleDirective = directive;
    return new Promise((resolve, reject) => {
      (window as any)[this.HandleResultKey] = (json: any) => {
        delete this.handleDirective;
        try {
          resolve(json ? JSON.parse(json) : json);
        } catch(err) {
          reject(err);
        }
      };
      (window as any)[this.HandleErrorKey] = (json: any) => {
        delete this.handleDirective;
        try{
          reject(json ? JSON.parse(json) : json);
        } catch(err) {
          reject(err);
        }
      };
    });
  }

  private receiveMessage(event: any): void {
    if (event.data.op) {
      const script = event.data;
      switch (script.op) {
        case 'init':
          script.result = (window as any)[this.InitKey] ? (window as any)[this.InitKey](script.param) : null;
          break;
        case 'poll':
          script.result = (window as any)[this.PollKey] ? (window as any)[this.PollKey]() : null;
          break;
        case 'handle':
          script.result = (window as any)[this.HandleKey] ? (window as any)[this.HandleKey]() : null;
          break;
        case 'result':
          if (event.data.param) {
            script.result = (window as any)[this.HandleResultKey] ? (window as any)[this.HandleResultKey](script.param) : null;
          } else {
            script.result = (window as any)[this.HandleResultKey] ? (window as any)[this.HandleResultKey]() : null;
          }
          break;
        case 'error':
          script.result = (window as any)[this.HandleErrorKey] ? (window as any)[this.HandleErrorKey](script.param) : null;
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
