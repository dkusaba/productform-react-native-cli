import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';

import type {ProfileScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, scaleFontSize, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';

function Profile(): JSX.Element {
  const ProfileSchema = Yup.object().shape({
    customer_id: Yup.string().required('Please enter your customer ID'),
    co_name: Yup.string().required('Please enter your company name'),
    co_name_jp: Yup.string().required(
      'Please enter your company name (Japanese)',
    ),
    co_name_jp_kana: Yup.string().required(
      'Please enter your company name (Japanese Kana)',
    ),
    address: Yup.string().required('Please enter your company address'),
    state: Yup.string().required(
      'Please enter the name of state your company is in',
    ),
    co_intro: Yup.string().required('Please enter company introduction'),
    co_intro_jp: Yup.string().required(
      'Please enter company introduction (Japanese)',
    ),
    fname: Yup.string().required('Please enter your first name'),
    lname: Yup.string().required('Please enter your last name'),
    fname_jp: Yup.string().required('Please enter your first name (Japanese)'),
    lname_jp: Yup.string().required('Please enter your last name (Japanese)'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    phone: Yup.string()
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

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [selectImage, setSelectImage] = useState('');

  async function imageHandler() {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    console.log(result);
    if (result && result.assets) {
      setSelectImage(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Pressable onPress={() => navigation.goBack()}>
            <Header type={3}>Back</Header>
          </Pressable>
          <Formik
            initialValues={{
              customer_id: '',
              co_name: '',
              co_name_jp: '',
              co_name_jp_kana: '',
              address: '',
              state: '',
              homepage_url: '',
              co_intro: '',
              co_intro_jp: '',
              fname: '',
              lname: '',
              fname_jp: '',
              lname_jp: '',
              email: '',
              phone: '',
            }}
            validationSchema={ProfileSchema}
            onSubmit={async values => {
              Toast.show({
                type: 'success',
                text1: 'You have successfully signed up!',
                text2: 'Now logging you in...',
                visibilityTime: 3000,
                position: 'bottom',
              });
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
                <View style={styles.companyProfileContainer}>
                  <Header type={1}>Company Profile</Header>
                  <Text style={styles.instructions}>
                    Fields labeled (Japanese) are not forced. You may enter
                    English instead.
                  </Text>
                  <Input
                    label={'Customer ID'}
                    onBlur={() => setFieldTouched('customer_id')}
                    onChangeText={handleChange('customer_id')}
                  />
                  {touched.customer_id && errors.customer_id && (
                    <Text style={styles.errorText}>{errors.customer_id}</Text>
                  )}
                  <Input
                    label={'Company Name'}
                    onBlur={() => setFieldTouched('co_name')}
                    onChangeText={handleChange('co_name')}
                  />
                  {touched.co_name && errors.co_name && (
                    <Text style={styles.errorText}>{errors.co_name}</Text>
                  )}
                  <Input
                    label={'Company Name (Japanese)'}
                    onBlur={() => setFieldTouched('co_name_jp')}
                    onChangeText={handleChange('co_name_jp')}
                  />
                  {touched.co_name_jp && errors.co_name_jp && (
                    <Text style={styles.errorText}>{errors.co_name_jp}</Text>
                  )}
                  <Text style={styles.label}>Company Logo</Text>
                  <TouchableOpacity
                    style={styles.browse}
                    onPress={imageHandler}>
                    <Text style={styles.browseText}>Browse Image</Text>
                  </TouchableOpacity>
                  {selectImage && (
                    <Image style={styles.image} source={{uri: selectImage}} />
                  )}
                  <Input
                    label={'Company Name (Japanese - Kana)'}
                    onBlur={() => setFieldTouched('co_name_jp_kana')}
                    onChangeText={handleChange('co_name_jp_kana')}
                  />
                  {touched.co_name_jp_kana && errors.co_name_jp_kana && (
                    <Text style={styles.errorText}>
                      {errors.co_name_jp_kana}
                    </Text>
                  )}
                  <Input
                    label={'Address'}
                    onBlur={() => setFieldTouched('address')}
                    onChangeText={handleChange('address')}
                  />
                  {touched.address && errors.address && (
                    <Text style={styles.errorText}>{errors.address}</Text>
                  )}
                  <Input
                    label={'State'}
                    onBlur={() => setFieldTouched('state')}
                    onChangeText={handleChange('state')}
                  />
                  {touched.state && errors.state && (
                    <Text style={styles.errorText}>{errors.state}</Text>
                  )}
                  <Input
                    label={'Home Page URL'}
                    onBlur={() => setFieldTouched('homepage_url')}
                    onChangeText={handleChange('homepage_url')}
                  />
                  <Input
                    label={'Company Introduction'}
                    multiline={true}
                    onBlur={() => setFieldTouched('co_intro')}
                    onChangeText={handleChange('co_intro')}
                  />
                  {touched.co_intro && errors.co_intro && (
                    <Text style={styles.errorText}>{errors.co_intro}</Text>
                  )}
                  <Input
                    label={'Company Introduction (Japanese)'}
                    multiline={true}
                    onBlur={() => setFieldTouched('co_intro_jp')}
                    onChangeText={handleChange('co_intro_jp')}
                  />
                  {touched.co_intro_jp && errors.co_intro_jp && (
                    <Text style={styles.errorText}>{errors.co_intro_jp}</Text>
                  )}
                </View>
                <View style={styles.userProfileContainer}>
                  <Header type={1}>User Profile</Header>
                  <Text style={styles.instructions}>
                    Fields labeled (Japanese) are not forced. You may enter
                    English instead.
                  </Text>
                  <Input
                    label={'First Name'}
                    onBlur={() => setFieldTouched('fname')}
                    onChangeText={handleChange('fname')}
                  />
                  {touched.fname && errors.fname && (
                    <Text style={styles.errorText}>{errors.fname}</Text>
                  )}
                  <Input
                    label={'Last Name'}
                    onBlur={() => setFieldTouched('lname')}
                    onChangeText={handleChange('lname')}
                  />
                  {touched.lname && errors.lname && (
                    <Text style={styles.errorText}>{errors.lname}</Text>
                  )}
                  <Input
                    label={'First Name (Japanese)'}
                    onBlur={() => setFieldTouched('fname_jp')}
                    onChangeText={handleChange('fname_jp')}
                  />
                  {touched.fname_jp && errors.fname_jp && (
                    <Text style={styles.errorText}>{errors.fname_jp}</Text>
                  )}
                  <Input
                    label={'Last Name (Japanese)'}
                    onBlur={() => setFieldTouched('lname_jp')}
                    onChangeText={handleChange('lname_jp')}
                  />
                  {touched.lname_jp && errors.lname_jp && (
                    <Text style={styles.errorText}>{errors.lname_jp}</Text>
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
                    onBlur={() => setFieldTouched('phone')}
                    onChangeText={handleChange('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  companyProfileContainer: {
    marginTop: verticalScale(15),
  },
  userProfileContainer: {
    marginTop: verticalScale(15),
  },
  instructions: {
    marginVertical: verticalScale(20),
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    color: Colors.grayPrimary,
  },
  label: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(5),
    fontFamily: 'Monteserrat',
    fontWeight: '600',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    textTransform: 'uppercase',
    color: Colors.grayPrimary,
  },
  browse: {
    width: horizontalScale(150),
    padding: horizontalScale(10),
    backgroundColor: Colors.gray600,
    color: Colors.grayPrimary,
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
  },
  browseText: {
    color: Colors.grayPrimary,
    fontSize: scaleFontSize(14),
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  image: {
    marginTop: verticalScale(12),
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
});
