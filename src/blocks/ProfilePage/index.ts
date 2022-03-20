import {ProfilePage} from "./profilePage";
import { withStore } from "../../modules/Store/Store";

const withUser = withStore((state) => ({...state}))

export default withUser(ProfilePage);
export * from './types'