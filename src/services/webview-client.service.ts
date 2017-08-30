import { Injectable } from '@angular/core';

@Injectable()
export class WebviewClientService {

    private InitKey: string = 'com.brickchain.integrity.init';
    private PollKey: string = 'com.brickchain.integrity.poll';
    private CancelKey: string = 'com.brickchain.integrity.cancel';

    public init(action: (params: string) => void): void {
        
        (<any>window)[this.InitKey] = (params: string) => {
            action(params);
        };

        this.poll();

    }

    public poll(): void {
        
        (<any>window)[this.PollKey] = () => {
            console.log('hello');
        };
    }

    public cancel(): string {
        return this.CancelKey;
    }

}
