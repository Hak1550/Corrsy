import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Authentication/Home';

const Stack = createStackNavigator();


const HomeRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={Home}
      />
    </Stack.Navigator>
  );
};




export {
  HomeRoutes,
};
