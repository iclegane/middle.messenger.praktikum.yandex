// export {ChatPage as default} from './chatPage'
import { ChatPage } from './chatPage';
import { withStore } from '../../modules/Store/Store';

const withData = withStore((state) => ({ ...state }));
export default withData(ChatPage);

export * from './types';
