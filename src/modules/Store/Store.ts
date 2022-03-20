import EventBus from "../../utils/EventBus";
import set from  '../../utils/set'
import {StoreData, StoreEvents} from "./types";
import Block from "../../utils/Block";
import {isEqual} from "../../utils/isEqual";
import {deepCopy} from "../../utils/deepCopy";



class Store extends EventBus {
    private state: StoreData = {};

    public getState() {
        return this.state;
    }

    public set(path: keyof StoreData, value: unknown) {
        set(this.state, path, value)

        this.emit(StoreEvents.Updated)
    }
}

const store = new Store();


export const withStore = (mapStateToProps: (state: StoreData) => Record<string, unknown>) => (Component: typeof Block) =>  {

    let state: Record<string, unknown>;

    return class extends Component {
        constructor(props: any) {
            state = mapStateToProps(store.getState());
            super({...props, ...state});

            store.on(StoreEvents.Updated, () => {

                const newState = deepCopy(mapStateToProps(store.getState()));

                if (!isEqual(state, newState)) {
                    this.setProps({
                        ...newState
                    })
                }
            })
        }
    }
}

export default store;