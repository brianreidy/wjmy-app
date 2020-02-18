import React from 'react';
import {useScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/ui/Home/Home';
import HeartRate from './src/ui/HeartRate';

// eslint-disable-next-line react-hooks/rules-of-hooks
useScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HeartRate" component={HeartRate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
