export declare class WebviewClientService {
    private InitKey;
    private PollKey;
    private HandleKey;
    private HandleResultKey;
    private HandleErrorKey;
    private CancelKey;
    private result;
    private handleDirective;
    constructor(action: (params: string) => void);
    close(result: any): void;
    cancel(): void;
    handle(directive: any): Promise<any>;
}
