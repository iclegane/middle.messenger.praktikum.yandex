import UserAPI, {UserUpdateData} from "../api/UserAPI";
import store from "../modules/Store/Store";
import {ChangePasswordForm} from "../blocks/ProfilePage/profilePage";
import authController from "./AuthController";
import {Router} from "../modules/Router/Router";


class AuthController {

    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }


    async updateUser(data: UserUpdateData) {
        try {
            const user = await this.api.updateUser(data);

            store.set('currentUser', user);

            return user;
        } catch (e: any) {
            throw new Error(e);
        }
    }

    async updatePassword(data: ChangePasswordForm) {
        if (data.newPassword !== data.repeatNewPassword) {
            alert('New password must be same a repeat password');
            throw new Error('New password must be same a repeat password')
        }

        await this.api.updateUserPassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        });

        try {
            await authController.logOut();

            alert('Авторизуйтесь с новым паролем')

            const router = new Router('#app');
            router.go('/signIn');
        } catch(e) {
            alert(e)
        }
    }

    async updateAvatar(data: File) {

        const form = new FormData();
        form.append('avatar', data)

        try {
            const user = await this.api.updateUserAvatar(form)
            store.set('currentUser', user);

            return user;
        } catch(e: any) {
            alert(e.reason);
            throw new Error(e);
        }
    }
}

export default new AuthController();