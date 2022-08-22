import {Easing} from 'react-native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {NavigationContainer} from '@react-navigation/native';

// Components
import Home from '../screens/home';
import Details from '../screens/details';

// Types
import {NavigationList} from './types';

const {Navigator, Screen} = createSharedElementStackNavigator<NavigationList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                easing: Easing.inOut(Easing.ease),
                duration: 400,
              },
            },
            close: {
              animation: 'timing',
              config: {
                easing: Easing.inOut(Easing.ease),
                duration: 400,
              },
            },
          },
          cardStyleInterpolator: ({current: {progress}}: any) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        }}>
        <Screen name="Home" component={Home} />
        <Screen name="Details" component={Details} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
