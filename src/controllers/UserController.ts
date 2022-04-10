import UserAPI, { UserUpdateData } from '../api/UserAPI';
import store from '../modules/Store/Store';
import { ChangePasswordForm } from '../blocks/ProfilePage/profilePage';
import authController from './AuthController';
import Router from '../modules/Router/Router';
import { User } from '../modules/Store/types';

class AuthController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateUser(data: UserUpdateData) {
    try {
      const user = await this.api.updateUser(data);

      store.set('user', user);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async updatePassword(data: ChangePasswordForm) {
    if (data.newPassword !== data.repeatNewPassword) {
      alert('New password must be same a repeat password');

      throw new Error('New password must be same a repeat password');
    }

    try {
      await this.api.updateUserPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      await authController.logOut();

      alert('Авторизуйтесь с новым паролем');

      const router = new Router('#app');
      router.go('/signIn');
    } catch (e: any) {
      alert('updatePassword error');

      throw new Error('updatePassword error');
    }
  }

  async updateAvatar(data: File) {
    const form = new FormData();
    form.append('avatar', data);

    try {
      const user = await this.api.updateUserAvatar(form);

      store.set('user', user);
    } catch (e: any) {
      console.log('tut');
      throw new Error(e);
    }
  }

  async search(login: string): Promise<Array<User>> {
    try {
      const users = await this.api.search({
        login,
      });

      return users.filter((el) => el.login === login);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new AuthController();
