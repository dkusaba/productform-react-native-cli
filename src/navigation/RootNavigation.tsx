import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Dashboard from '../screens/Dashboard';
import Profile from '../screens/Profile';
import Product from '../screens/Product';

const Stack = createStackNavigator();

function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
