import { METHODS_Transport, ITransportMethodsOptions } from './types';
import { queryStringify } from '../../utils/queryStringify';

export class Transport {
  static API_URL: string = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${Transport.API_URL}${endpoint}`;
  }

  get<T, U = unknown>(path: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
    return this.request<T, U>(this.endpoint + path, METHODS_Transport.GET, options);
  }

  post<T, U = unknown>(path: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
    return this.request<T, U>(this.endpoint + path, METHODS_Transport.POST, options);
  }

  put<T, U = unknown>(path: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
    return this.request<T, U>(this.endpoint + path, METHODS_Transport.PUT, options);
  }

  delete<T, U = unknown>(path: string, options: ITransportMethodsOptions<T> = {}): Promise<U> {
    return this.request<T, U>(this.endpoint + path, METHODS_Transport.DELETE, options);
  }

  private request<T, U>(url: string, method: METHODS_Transport, options: ITransportMethodsOptions<T>, timeout: number = 3500): Promise<U> {
    const {
      data,
      formData = false,
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

      if (!formData) {
        if (!Object.keys(headers).length) {
          xhr.setRequestHeader('Content-type', 'application/json');
        }

        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = () => {
        const { response, status } = xhr;

        if (status < 400) {
          resolve(response);
        } else {
          reject(response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else if (formData) {
        xhr.send(data as unknown as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
