import * as React from 'react';
import {Provider} from 'react-redux';
import './config/ReactotronConfig';
import Routes from './routes';
import store from './store';
import {setNavigator} from './services/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <Routes ref={setNavigator} />
    </Provider>
  );
};

export default App;
