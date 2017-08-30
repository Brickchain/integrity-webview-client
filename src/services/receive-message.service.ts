// tslint:disable:max-line-length
import { Injectable } from '@angular/core';

@Injectable()
export class ReceiveMessageService {

  private InitKey: string = 'com.brickchain.integrity.init';
  private PollKey: string = 'com.brickchain.integrity.poll';
  private HandleKey: string = 'com.brickchain.integrity.handle';
  private HandleResultKey: string = 'com.brickchain.integrity.handle.result';
  private HandleErrorKey: string = 'com.brickchain.integrity.handle.error';

  public receiveMessage(event: any): void {
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
