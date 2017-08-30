import { Injectable } from '@angular/core';

@Injectable()
export class WebviewClientService {

    private InitKey: string = 'com.brickchain.integrity.init';
    private PollKey: string = 'com.brickchain.integrity.poll';

    private HandleKey: string = 'com.brickchain.integrity.handle';
    private HandleResultKey: string = 'com.brickchain.integrity.handle.result';
    private HandleErrorKey: string = 'com.brickchain.integrity.handle.error';
    
    private CancelKey: string = 'com.brickchain.integrity.cancel';

    private result: any;
    private handleDirective: any;
    
    public constructor(action: (params: string) => void) {
        
        (<any>window)[this.InitKey] = (params: string) => {
            action(params);
        };

        (<any>window)[this.PollKey] = () => this.result;
        (<any>window)[this.HandleKey] = () => this.handleDirective;
        
    }

    public close(result:any): void {
        this.result = result;
    }

    public cancel(): void {
        this.result = this.CancelKey;
    }

    public handle(directive:any) :Promise<any> {
        this.handleDirective=directive;
        return new Promise((resolve,reject) => {
            (<any>window)[this.HandleResultKey] = (json:any) => resolve(json ? JSON.parse(json) : json);
            (<any>window)[this.HandleErrorKey] = (json:any) => reject(json ? JSON.parse(json):json);
        });
    }

}
