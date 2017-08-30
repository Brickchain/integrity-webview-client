import { Injectable } from '@angular/core';

@Injectable()
export class ReceiveMessageService {

  private InitKey: string = 'com.brickchain.integrity.init';
  private PollKey: string = 'com.brickchain.integrity.poll';
  private HandleKey: string = 'com.brickchain.integrity.handle';
  private HandleResultKey: string = 'com.brickchain.integrity.handle.result';
  private HandleErrorKey: string = 'com.brickchain.integrity.handle.error';

  public receiveMessage(event: any): void {
    if (/*isDefined(event.data.op)*/event.data.op) {
      let script = event.data;
      switch (script.op) {
        case 'init':
          script.result = (<any>window)[this.InitKey] ? (<any>window)[this.InitKey](script.param) : null;
          break;
        case 'poll':
          script.result = (<any>window)[this.PollKey] ? (<any>window)[this.PollKey]() : null;
          break;
        case 'handle':
          script.result = (<any>window)[this.HandleKey] ? (<any>window)[this.HandleKey]() : null;
          break;
        case 'result':
          if (/*isDefined(event.data.param)*/event.data.param) {
            script.result = (<any>window)[this.HandleResultKey] ? (<any>window)[this.HandleResultKey](script.param) : null;
          } else {
            script.result = (<any>window)[this.HandleResultKey] ? (<any>window)[this.HandleResultKey]() : null;
          }
          break;
        case 'error':
          script.result = (<any>window)[this.HandleErrorKey] ? (<any>window)[this.HandleErrorKey](script.param) : null;
          break;
        case 'title':
          script.result = document.title;
          break;
        default:
          script.error = 'unsupported operation'
      }
      event.source.postMessage(script, event.origin);
    }
  }

}