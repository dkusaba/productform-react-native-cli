import React from 'react';
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
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

import type {SignUpScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, scaleFontSize, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';
import {userLogin, userSignUp} from '../api/user';
import {logIn} from '../redux/reducers/User';

const SignUpSchema = Yup.object().shape({
  first_name_en: Yup.string().required('Please enter your first name'),
  last_name_en: Yup.string().required('Please enter your last name'),
  first_name_jp: Yup.string().required(
    'Please enter your first name (Japanese)',
  ),
  last_name_jp: Yup.string().required('Please enter your last name (Japanese)'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email address'),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, 'Must only be in numbers only')
    .required('Pleae enter your phone number'),
  password: Yup.string()
    .min(8, 'Password must be more than 8 characters')
    .required('Please enter your password'),
  confirm_password: Yup.string()
    .min(8, 'Confirm Password must be more than 8 characters long')
    .oneOf([Yup.ref('password')], 'Your Passwords do not match')
    .required('Confirm password is required'),
});

function SignUp(): JSX.Element {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Header type={3}>Back</Header>
          </Pressable>
          <Formik
            initialValues={{
              first_name_en: '',
              last_name_en: '',
              first_name_jp: '',
              last_name_jp: '',
              email: '',
              phone_number: '',
              password: '',
              confirm_password: '',
            }}
            validationSchema={SignUpSchema}
            onSubmit={async values => {
              Toast.show({
                type: 'success',
                text1: 'You have successfully signed up!',
                text2: 'Now logging you in...',
                visibilityTime: 3000,
                position: 'bottom',
              });
              const response = await userSignUp(
                values.first_name_en,
                values.last_name_en,
                values.first_name_jp,
                values.last_name_jp,
                values.email,
                values.phone_number,
                values.password,
              );

              if (response && response.status === 200) {
                const user = await userLogin(values.email, values.password);
                if (user) {
                  dispatch(logIn(user));
                  navigation.replace('Dashboard');
                }
              } else {
                Alert.alert('Something went wrong');
              }
            }}>
            {({
              touched,
              errors,
              setFieldTouched,
              handleChange,
              handleSubmit,
              isValid,
            }) => (
              <>
                <Header type={1} center={true}>
                  SIGN UP
                </Header>
                <Text style={styles.instructions}>
                  Fields labeled (Japanese) are not forced. You may enter
                  English instead.
                </Text>
                <Input
                  label={'First Name'}
                  onBlur={() => setFieldTouched('first_name_en')}
                  onChangeText={handleChange('first_name_en')}
                />
                {touched.first_name_en && errors.first_name_en && (
                  <Text style={styles.errorText}>{errors.first_name_en}</Text>
                )}
                <Input
                  label={'Last Name'}
                  onBlur={() => setFieldTouched('last_name_en')}
                  onChangeText={handleChange('last_name_en')}
                />
                {touched.last_name_en && errors.last_name_en && (
                  <Text style={styles.errorText}>{errors.last_name_en}</Text>
                )}
                <Input
                  label={'First Name (Japanese)'}
                  onBlur={() => setFieldTouched('first_name_jp')}
                  onChangeText={handleChange('first_name_jp')}
                />
                {touched.first_name_jp && errors.first_name_jp && (
                  <Text style={styles.errorText}>{errors.first_name_jp}</Text>
                )}
                <Input
                  label={'Last Name (Japanese)'}
                  onBlur={() => setFieldTouched('last_name_jp')}
                  onChangeText={handleChange('last_name_jp')}
                />
                {touched.last_name_jp && errors.last_name_jp && (
                  <Text style={styles.errorText}>{errors.last_name_jp}</Text>
                )}
                <Input
                  keyboardType={'email-address'}
                  label={'Email'}
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <Input
                  keyboardType={'number-pad'}
                  label={'Phone Number'}
                  onBlur={() => setFieldTouched('phone_number')}
                  onChangeText={handleChange('phone_number')}
                />
                {touched.phone_number && errors.phone_number && (
                  <Text style={styles.errorText}>{errors.phone_number}</Text>
                )}
                <Input
                  label={'Password'}
                  secureTextEntry={true}
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <Input
                  label={'Confirm Password'}
                  secureTextEntry={true}
                  onBlur={() => setFieldTouched('confirm_password')}
                  onChangeText={handleChange('confirm_password')}
                />
                {touched.confirm_password && errors.confirm_password && (
                  <Text style={styles.errorText}>
                    {errors.confirm_password}
                  </Text>
                )}
                <Button
                  isDisabled={!isValid}
                  title={'Sign Up'}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  instructions: {
    marginVertical: verticalScale(20),
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    color: Colors.grayPrimary,
  },
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
});
