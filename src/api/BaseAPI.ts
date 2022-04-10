import { Transport } from '../modules/Transport';

export default class BaseAPI {
  protected http: Transport;

  protected constructor(endpoint: string) {
    this.http = new Transport(endpoint);
  }
}
