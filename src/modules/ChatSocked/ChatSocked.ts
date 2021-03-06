import { EventBus } from '../EventBus';
import store from '../Store/Store';

enum EVENTS {
    pong= 'pong',
    ping= 'ping',
    getOld = 'get old',
    message = 'message',
}

export class ChatSocket {
  api: string = 'wss://ya-praktikum.tech/ws/chats';

  socket: WebSocket | null | undefined;

  timeout: ReturnType<typeof setTimeout> | null = null;

  timeoutMs: number = 3000;

  eventBus: EventBus;

  static EVENTS = EVENTS;

  constructor() {
    this.eventBus = new EventBus();
    this.eventBus.on(ChatSocket.EVENTS.pong, this._ping.bind(this));
  }

  addEvents(key: string, callback: any) {
    this.eventBus.on(key, callback);
  }

  removeEvents(key: string, callback: any) {
    this.eventBus.off(key, callback);
  }

  async init() {
    return new Promise((resolve, reject) => {
      try {
        const idChat = store.getState().currentChat?.id;
        const idUser = store.getState().user?.id;
        const token = store.getState().token?.value;

        if (idChat && idUser && token) {
          this.socket = new WebSocket(`${this.api}/${idUser}/${idChat}/${token}`);
          this.socket.addEventListener('open', () => {
            this._ping();
            resolve(this.socket);
          });

          this._listener();
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  private _ping() {
    if (this.socket) {
      this.timeout = setTimeout(() => {
        this._send({
          type: ChatSocket.EVENTS.ping,
        });
      }, this.timeoutMs);
    }
  }

  private _send(data: any) {
    try {
      if (this.socket?.readyState === 1) {
        this.socket.send(JSON.stringify(data));
      } else {
        this._ping();
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }

  private _listener() {
    if (this.socket) {
      this.socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        const { type } = data;
        if (Object.values(ChatSocket.EVENTS).includes(type)) {
          this.eventBus.emit(type, data);
        } else if (Array.isArray(data)) {
          this.eventBus.emit(ChatSocket.EVENTS.getOld, data);
        }
      });
    }
  }

  sendMessage(message: string) {
    this._send({
      content: message,
      type: ChatSocket.EVENTS.message,
    });
  }

  getOld() {
    this._send({
      content: '0',
      type: ChatSocket.EVENTS.getOld,
    });
  }
}
