import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';

import type {LoginScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';
import {userLogin} from '../api/user';
import {logIn} from '../redux/reducers/User';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(8, 'The password must be more than 8 characters')
    .required('Please enter your password'),
});

function Login(): JSX.Element {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  const formRef = useRef<any>();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.validateForm();
    }
  }, []);

  async function loginHandler(email: string, password: string) {
    const user = await userLogin(email, password);
    if (user) {
      dispatch(logIn(user));
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login failed', 'Invalid credentials. Please try again');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          innerRef={formRef}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={values => {
            loginHandler(values.email, values.password);
          }}>
          {({
            values,
            touched,
            errors,
            setFieldTouched,
            handleChange,
            handleSubmit,
            isValid,
          }) => (
            <>
              <Header type={1} center={true}>
                LOGIN
              </Header>
              <Input
                value={values.email}
                keyboardType={'email-address'}
                label={'Email'}
                placeholder={'Enter your email'}
                onBlur={() => setFieldTouched('email')}
                onChangeText={handleChange('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Input
                value={values.password}
                label={'Password'}
                placeholder={'******'}
                secureTextEntry={true}
                onBlur={() => setFieldTouched('password')}
                onChangeText={handleChange('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <Button
                isDisabled={!isValid}
                title={'LOGIN'}
                onPress={handleSubmit}
              />
              <Pressable
                style={styles.register}
                onPress={() => navigation.navigate('SignUp')}>
                <Header color={Colors.bluePrimary} type={3} center={true}>
                  Don't have an account? Sign Up.
                </Header>
              </Pressable>
            </>
          )}
        </Formik>
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
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
});
