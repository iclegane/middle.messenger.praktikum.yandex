export enum METHODS_Transport {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export interface ITransportMethodsOptions<T> {
    data?: T
    headers?: Record<string, string> | never,
    formData?: boolean,
}