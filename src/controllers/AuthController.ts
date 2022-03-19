import AuthAPI, {SignInDate, SignUpDate} from "../api/AuthAPI";
import store from "../modules/Store/Store";
import {Router} from "../modules/Router/Router";

class AuthController {

    private api: AuthAPI;

    constructor() {
        this.api = new AuthAPI();
    }

    async signUp(data: SignUpDate) {
        await this.api.signUp(data);
    }

    async signIn(data: SignInDate) {
        await this.api.signIn(data);

        await this.getUser();

        const router = new Router('#app');
        router.go('/settings');
    }

    async logOut() {
        await this.api.logOut();
    }

    async getUser() {
        const user = await this.api.getUser();

        store.set('user', user)
    }
}

export default new AuthController();