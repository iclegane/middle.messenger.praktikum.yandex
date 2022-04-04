import BaseAPI from "./BaseAPI";
import {User} from "../modules/Store/types";

export interface SignUpDate {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignInDate {
    "login": string;
    "password": string;
}

export default class AuthAPI extends BaseAPI {

    constructor() {
        super('/auth');
    }

    signUp(data: SignUpDate): Promise<unknown> {
        return this.http.post('/signup', {
            data: data,
        })
    }

    signIn(data: SignInDate): Promise<unknown> {
        return this.http.post('/signIn', {
            data: data
        })
    }

    logOut(): Promise<unknown> {
        return this.http.post('/logout')
    }

    getUser(): Promise<User>{
        return this.http.get('/user')
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}