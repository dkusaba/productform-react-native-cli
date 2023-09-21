import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import type {HomeScreenNavigationProp} from '../types/navigation';
import {resetToInitialState} from '../redux/reducers/User';
import Header from '../components/ui/Header';

function Home(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
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
      <Text>Home</Text>
      <Pressable onPress={logoutHandler}>
        <Header type={1}>Log Out</Header>
      </Pressable>
    </SafeAreaView>
  );
}

export default Home;
