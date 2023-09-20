import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import type {LoginScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';
import {userLogin} from '../api/user';
import {useDispatch} from 'react-redux';
import {logIn} from '../redux/reducers/User';

function Login(): JSX.Element {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  async function loginHandler() {
    const user = await userLogin(email, password);
    if (user) {
      dispatch(logIn(user));
      navigation.navigate('Home');
    } else {
      Alert.alert('Login failed', 'Invalid credentials. Please try again');
    }
  }

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
          onPress={loginHandler}
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
