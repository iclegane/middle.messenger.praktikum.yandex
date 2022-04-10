// import ClearPage from "./blocks/ClearPage";
import LoginPage from './blocks/LoginPage';
import RegistrationPage from './blocks/RegistrationPage';
import ProfilePage from './blocks/ProfilePage';
import ChatPage from './blocks/ChatPage';

import Router from './modules/Router/Router';
import AuthController from './controllers/AuthController';

import { importAll } from './utils/importAll';
import { registerComponent } from './utils/registerComponent';

import './style/main.scss';

const Components = importAll(require.context('Components', true, /index.ts$/));

document.addEventListener('DOMContentLoaded', async () => {
  Object.values(Components).forEach((component) => registerComponent(component.default));

  const router = new Router('#app');

  router
    .use('/signIn', LoginPage)
    .use('/registration', RegistrationPage)
    .use('/settings', ProfilePage)
    .use('/messenger', ChatPage);

  try {
    await AuthController.getUser();

    router.go('/messenger');
  } catch (e) {
    router.go('/signIn');
  }

  router.start();
});
