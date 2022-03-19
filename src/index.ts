import {Router} from "./modules/Router/Router";

import LoginPage from "./blocks/LoginPage";
import RegistrationPage from "./blocks/RegistrationPage";
import ProfilePage from "./blocks/ProfilePage";
import ChatPage from "./blocks/ChatPage";

import AuthController from "./controllers/AuthController";
import {ClearPage} from "./blocks/ClearPage";


document.addEventListener('DOMContentLoaded', async () => {

    const router = new Router('#app');

    router
        .use("/signIn", LoginPage)
        .use("/registration", RegistrationPage)
        .use("/settings", ProfilePage)
        .use("/messenger", ChatPage)
        .use("/test", ClearPage)

    try {
        await AuthController.getUser();

        router.go('/messenger');
    } catch(e) {

        router.go('/signIn');
    }

    router.start();
})



