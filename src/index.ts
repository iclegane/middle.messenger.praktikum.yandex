import {Router} from "./modules/Router/Router";

import components from "./components/**/index.ts"
import LoginPage from "./blocks/LoginPage";
import RegistrationPage from "./blocks/RegistrationPage";
import ProfilePage from "./blocks/ProfilePage";
import ChatPage from "./blocks/ChatPage";

import AuthController from "./controllers/AuthController";
import {registerComponent} from "./utils/registerComponent";


document.addEventListener('DOMContentLoaded', async () => {

    Object.values(components).forEach((component) => registerComponent(component.default))

    const router = new Router('#app');

    router
        .use("/signIn", LoginPage)
        .use("/registration", RegistrationPage)
        .use("/settings", ProfilePage)
        .use("/messenger", ChatPage)

        try {
            await AuthController.getUser();

            router.go('/messenger');
        } catch(e) {

            router.go('/signIn');
        }

    router.start();
})



