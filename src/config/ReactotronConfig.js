import Reactotron, { overlay } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (__DEV__) {
    // 192.168.1.7
    // 192.168.56.1
    const tron = Reactotron.configure({ host: '192.168.1.3' })
        .useReactNative()
        .use(reactotronRedux(), overlay())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
