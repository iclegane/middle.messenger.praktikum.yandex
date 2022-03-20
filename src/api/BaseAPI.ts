import Transport from "../modules/Transport";

export default abstract class BaseAPI {

    protected http: Transport;

    protected constructor(endpoint: string) {
        this.http = new Transport(endpoint);
    }

    public abstract create?(data: unknown): Promise<unknown>;

    public abstract read?(identifier: string): Promise<unknown>;

    public abstract update?(identifier: string, data: unknown): Promise<unknown>;

    public abstract delete?(identifier: string): Promise<unknown>;
}