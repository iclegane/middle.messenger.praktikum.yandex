import { RegistrationPage } from './RegistrationPage';
import { withStore } from '../../modules/Store/Store';

const withData = withStore((state) => ({ ...state }));
export default withData(RegistrationPage);
