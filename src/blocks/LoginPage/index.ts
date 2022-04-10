import { LoginPage } from './LoginPage';
import { withStore } from '../../modules/Store/Store';

const withData = withStore((state) => ({ ...state }));
export default withData(LoginPage);
