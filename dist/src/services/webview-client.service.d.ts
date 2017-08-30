export declare class WebviewClientService {
    private InitKey;
    private PollKey;
    private CancelKey;
    init(action: (params: string) => void): void;
    poll(): void;
    cancel(): string;
}
