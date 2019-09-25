import {zoomIn} from 'react-navigation-transitions';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './pages/Home';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
    },
    {
      defaultNavigationOptions: {
        header: null,
      },
      initialRouteName: 'Home',
      transitionConfig: () => zoomIn(),
    },
  ),
);

export default Routes;
