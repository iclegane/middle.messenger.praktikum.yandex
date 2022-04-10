import BaseAPI from './BaseAPI';
import { User } from '../modules/Store/types';

export interface SignUpDate {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}
export interface SignInDate {
    'login': string;
    'password': string;
}

export type ResponseSignInSuccess = {
    login: string;
    password: string;
}
export type ResponseSignInError = {
    reason: string;
}

export type ResponseSignUpSuccess = {
    id: number;
}
export type ResponseSignUpError= {
    reason: string;
}

export type ResponseGetUserError= {
    reason: string;
}

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signUp(data: SignUpDate): Promise<ResponseSignUpSuccess | ResponseSignUpError> {
    return this.http.post('/signup', {
      data,
    });
  }

  signIn(data: SignInDate): Promise<ResponseSignInSuccess | ResponseSignInError> {
    return this.http.post('/signIn', {
      data,
    });
  }

  logOut(): Promise<string | Error> {
    return this.http.post('/logout');
  }

  getUser(): Promise<User | ResponseGetUserError> {
    return this.http.get('/user');
  }
}
