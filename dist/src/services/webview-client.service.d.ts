export declare class WebviewClientService {
    private params;
    private InitKey;
    private PollKey;
    private HandleKey;
    private HandleResultKey;
    private HandleErrorKey;
    private CancelKey;
    private result;
    private handleDirective;
    constructor();
    init(): Promise<any>;
    close(result: any): void;
    cancel(): void;
    handle(directive: any): Promise<any>;
}
