import React from 'react';
import {Pressable, SafeAreaView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SignUpScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';

function SignUp(): JSX.Element {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.goBack()}>
        <Header type={3}>Back</Header>
      </Pressable>
      <Text>Sign Up</Text>
    </SafeAreaView>
  );
}

export default SignUp;
