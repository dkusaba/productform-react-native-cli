import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
import {logIn} from '../redux/reducers/userSlice';
import {productGet} from '../api/product';
import {setInitialProducts} from '../redux/reducers/productSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';

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

  const [isLoading, setIsLoading] = useState(false);

  async function loginHandler(email: string, password: string) {
    setIsLoading(true);
    const user = await userLogin(email, password);
    if (user) {
      dispatch(logIn(user));
      const products = await productGet(user.token);
      if (products) {
        console.log('initial products', products);
        dispatch(setInitialProducts(products));
        setIsLoading(false);
      }
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Login failed', 'Invalid credentials. Please try again');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formRef?.current) {
        formRef.current.setErrors({});
        formRef.current.setTouched({email: false, password: false});
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {isLoading && <LoadingOverlay />}
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <Formik
            innerRef={formRef}
            validateOnMount={true}
            initialValues={{
              email: '',
              password: '',
            }}
            initialErrors={{}}
            validationSchema={LoginSchema}
            onSubmit={(values, {resetForm}) => {
              loginHandler(values.email, values.password);
              resetForm();
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
                  title={'Login'}
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
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  container: {
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
