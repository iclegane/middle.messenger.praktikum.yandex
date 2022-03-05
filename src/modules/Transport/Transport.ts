import {METHODS_Transport, ITransportMethodsOptions} from './types'
import {queryStringify} from "../../utils/queryStringify";

export class Transport {

    get<T, U = unknown>(url: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
        return this.request<T, U>(url, METHODS_Transport.GET, options);
    }

    post<T, U = unknown>(url: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
        return this.request<T, U>(url, METHODS_Transport.POST, options);
    }

    put<T, U = unknown>(url: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
        return this.request<T, U>(url, METHODS_Transport.PUT, options);
    }

    delete<T, U = unknown>(url: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
        return this.request<T, U>(url, METHODS_Transport.DELETE, options);
    }

    private request<T, U>(url: string, method: METHODS_Transport, options: ITransportMethodsOptions<T>, timeout: number = 3500): Promise<U> {

        const {
            data,
            headers = {},
        } = options;

        const isGet = method === METHODS_Transport.GET;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                const {response} = xhr

                resolve(response)
            };

            xhr.onabort = reject
            xhr.onerror = reject
            xhr.ontimeout = reject

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data))
            }
        });
    }

}