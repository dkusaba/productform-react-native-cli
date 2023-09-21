import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import type {DashboardScreenNavigationProp} from '../types/navigation';
import {resetToInitialState} from '../redux/reducers/User';
import Header from '../components/ui/Header';

function Dashboard(): JSX.Element {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const dispatch = useDispatch();

  async function logoutHandler() {
    const clearCredentials = await Keychain.resetGenericPassword();
    if (clearCredentials) {
      dispatch(resetToInitialState);
      navigation.replace('Login');
    }
  }

  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <Pressable onPress={logoutHandler}>
        <Header type={1}>Log Out</Header>
      </Pressable>
    </SafeAreaView>
  );
}

export default Dashboard;
