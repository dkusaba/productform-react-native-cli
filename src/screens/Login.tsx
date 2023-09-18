import React, {useState} from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {LoginScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';

function Login(): JSX.Element {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header type={1} center={true}>
          LOGIN
        </Header>
        <Input
          keyboardType={'email-address'}
          label={'Email'}
          placeholder={'Enter your email'}
          onChangeText={(value: string) => setEmail(value)}
        />
        <Input
          label={'Password'}
          placeholder={'******'}
          secureTextEntry={true}
          onChangeText={(value: string) => setPassword(value)}
        />
        <Button
          isDisabled={email.length < 5 || password.length < 8}
          title={'Login'}
          onPress={() => {}}
        />
        <Pressable
          style={styles.register}
          onPress={() => navigation.navigate('SignUp')}>
          <Header color={Colors.bluePrimary} type={3} center={true}>
            Don't have an account? Sign Up.
          </Header>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  register: {
    marginTop: verticalScale(12),
  },
});
