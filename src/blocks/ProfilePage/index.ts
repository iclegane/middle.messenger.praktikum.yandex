import {ProfilePage} from "./profilePage";
import { withStore } from "../../modules/Store/Store";

const withUser = withStore((state) => ({...state.currentUser}))
export default withUser(ProfilePage);
export * from './types'