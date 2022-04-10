import AuthAPI, { SignInDate, SignUpDate } from '../api/AuthAPI';
import store from '../modules/Store/Store';
import Router from '../modules/Router/Router';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signUp(data: SignUpDate) {
    try {
      await this.api.signUp(data);

      const router = new Router('#app');
      router.go('/messenger');
    } catch (e: any) {
      store.set('error', {
        message: e.reason,
      });

      throw new Error(e.reason);
    }
  }

  async signIn(data: SignInDate) {
    try {
      await this.api.signIn(data);
      await this.getUser();

      const router = new Router('#app');
      router.go('/messenger');
    } catch (e: any) {
      store.set('error', {
        message: e.reason,
      });

      throw new Error(e.reason);
    }
  }

  async logOut() {
    try {
      await this.api.logOut();

      const router = new Router('#app');
      router.go('/signIn');
    } catch (e: any) {
      store.set('error', {
        message: e.reason,
      });

      throw new Error(e.reason);
    }
  }

  async getUser() {
    try {
      const user = await this.api.getUser();

      store.set('user', user);
    } catch (e: any) {
      throw new Error(e.reason);
    }
  }
}

export default new AuthController();
