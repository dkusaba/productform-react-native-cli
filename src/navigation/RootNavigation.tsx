import React from 'react';
import {Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import type {DashboardScreenNavigationProp} from '../types/navigation';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Product from '../screens/Product';
import ProfileIcon from '../components/ui/ProfileIcon';

const Stack = createStackNavigator();

function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => null,
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Stack.Screen
        name="Profile"
        options={{headerShown: true}}
        component={Profile}
      />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
