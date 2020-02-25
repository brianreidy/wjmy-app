import React from 'react';
import {useScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Fitbit from './src/ui/Fitbit';
import Home from './src/ui/Home';

// eslint-disable-next-line react-hooks/rules-of-hooks
useScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Fitbit" component={Fitbit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
