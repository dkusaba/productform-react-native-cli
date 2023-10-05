import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import type {RootState} from '../../redux/store';
import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';
import Dashboard from '../../screens/Dashboard';
import Profile from '../../screens/Profile';
import Product from '../../screens/Product';

const Stack = createStackNavigator();

function RootNavigation(): JSX.Element {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Stack.Navigator
      initialRouteName={user.isLoggedIn ? 'Dashboard' : 'Login'}
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
