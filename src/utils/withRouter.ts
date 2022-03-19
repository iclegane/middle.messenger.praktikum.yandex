import Block from "./Block";
import { Router } from "../modules/Router/Router";

export function withRouter(Component: typeof Block) {
    return class WithRouter extends Component {

        public static componentName = Component.name;

        constructor(props: any) {
            super({...props, router: new Router('#app')});
        }

    }
}