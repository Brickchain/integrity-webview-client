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
  }

  public init(): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any)[this.InitKey] = (data: string) => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
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
      (window as any)[this.HandleResultKey] = (json: any) => resolve(json ? JSON.parse(json) : json);
      (window as any)[this.HandleErrorKey] = (json: any) => reject(json ? JSON.parse(json) : json);
    });
  }

}
