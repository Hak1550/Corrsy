import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { setNavigationRef } from './RootNavigation';
import Splash from '../screens/Authentication/Splash';
import Lesson from '../screens/Authentication/Home/Lessons';
import Widgets from '../screens/Authentication/Home/Widgets';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={setNavigationRef}  >
      <Stack.Navigator screenOptions={{ headerShown: false, }} >
      <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Lesson" component={Lesson} />
        <Stack.Screen name="Widgets" component={Widgets} />
        <Stack.Screen name="Home" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
