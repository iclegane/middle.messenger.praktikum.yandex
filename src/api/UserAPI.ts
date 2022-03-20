import BaseAPI from "./BaseAPI";
import {User} from "../modules/Store/types";


export interface UserUpdateData {
    first_name?: string;
    second_name?: string;
    display_name?: string;
    login?: string;
    email?: string;
    phone?: string;
}

export interface UserUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export interface searchUserProps {
    login: string;
}

export default class UserAPI extends BaseAPI {

    constructor() {
        super('/user');
    }


    updateUser(data: UserUpdateData): Promise<unknown> {
        return this.http.put('/profile', {
            data: data,
        })
    }

    updateUserPassword(data: UserUpdatePassword): Promise<unknown> {
        return this.http.put('/password', {
            data: data,
        })
    }

    updateUserAvatar(data: FormData): Promise<unknown> {
        return this.http.put('/profile/avatar', {
            data: data,
            formData: true,
        })
    }

    search(data: searchUserProps): Promise<Array<User>> {
        return this.http.post('/search', {
            data: data,
        })
    }


    create = undefined;
    update = undefined;
    read = undefined;
    delete = undefined;
}