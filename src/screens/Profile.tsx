import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOut, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import type {ProfileScreenNavigationProp} from '../types/navigation';
import type {RootState} from '../redux/store';
import {BASE_URL} from '../constants/config';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, scaleFontSize, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';
import {Colors} from '../constants/colors';
import {userEdit} from '../api/user';
import {persistor} from '../redux/store';
import {
  resetToInitialUserState,
  updateProfile,
} from '../redux/reducers/userSlice';
import {resetToInitialProductState} from '../redux/reducers/productSlice';

function Profile(): JSX.Element {
  const ProfileSchema = Yup.object().shape({
    customer_id: Yup.string().required('Please enter your customer ID'),
    co_name_en: Yup.string().required('Please enter your company name'),
    co_name_jp: Yup.string().required(
      'Please enter your company name (Japanese)',
    ),
    co_name_kana_jp: Yup.string().required(
      'Please enter your company name (Japanese Kana)',
    ),
    co_city_en: Yup.string().required('Please enter your company address'),
    co_prefecture: Yup.string().required(
      'Please enter the name of state your company is in',
    ),
    co_intro_en: Yup.string().required('Please enter company introduction'),
    co_intro_jp: Yup.string().required(
      'Please enter company introduction (Japanese)',
    ),
    strategies_and_goals: Yup.string().required(
      "Please enter your company's strategies and goals",
    ),
    first_name_en: Yup.string().required('Please enter your first name'),
    last_name_en: Yup.string().required('Please enter your last name'),
    first_name_jp: Yup.string().required(
      'Please enter your first name (Japanese)',
    ),
    last_name_jp: Yup.string().required(
      'Please enter your last name (Japanese)',
    ),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, 'Must only be in numbers only')
      .required('Pleae enter your phone number'),
  });

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [imageFormData, setImageFormData] = useState({});

  async function imageHandler() {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result) {
      setSelectImage(result.assets[0].uri);
      const uri =
        Platform.OS === 'android'
          ? result.assets[0].uri
          : result.assets[0].uri.replace('file://', '');
      setImageFormData({
        uri: uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
    }
  }

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.dbLink}>
            <FontAwesomeIcon icon={faChevronLeft} size={16} />
            <Text style={styles.dbLinkText}>Dashboard</Text>
          </View>
        </Pressable>
      ),
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Pressable
          onPress={async () => {
            dispatch(resetToInitialUserState);
            dispatch(resetToInitialProductState);
            persistor.purge();
            navigation.navigate('Login');
          }}>
          <View style={styles.logOut}>
            <FontAwesomeIcon icon={faSignOut} size={16} />
            <Text style={styles.logOutText}>Log Out</Text>
          </View>
        </Pressable>
      ),
    });
  });

  return (
    <View>
      {isLoading && <LoadingOverlay />}

      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                customer_id: user.data.customer_id,
                co_name_jp: user.data.co_name_jp,
                co_name_kana_jp: user.data.co_name_kana_jp,
                co_name_en: user.data.co_name_en,
                co_logo_path: user.data.co_logo_path,
                co_prefecture: user.data.co_prefecture,
                co_city_en: user.data.co_city_en,
                co_url: user.data.co_url,
                co_intro_jp: user.data.co_intro_jp,
                co_intro_en: user.data.co_intro_en,
                strategies_and_goals: user.data.strategies_and_goals,
                first_name_en: user.data.first_name_en,
                last_name_en: user.data.last_name_en,
                first_name_jp: user.data.first_name_jp,
                last_name_jp: user.data.last_name_jp,
                email: user.data.email,
                phone_number: user.data.phone_number,
              }}
              validationSchema={ProfileSchema}
              onSubmit={async values => {
                setIsLoading(true);
                if (values.co_logo_path === '' || imageFormData === '') {
                  Toast.show({
                    type: 'error',
                    text1: 'Please select your company logo',
                    visibilityTime: 3000,
                    position: 'bottom',
                  });
                  return;
                }

                let formData = new FormData();
                if (Object.keys(imageFormData).length > 0) {
                  formData.append('image', imageFormData);
                } else {
                  formData.append('co_logo_path', values.co_logo_path);
                }
                formData.append('customer_id', values.customer_id);
                formData.append('co_name_jp', values.co_name_jp);
                formData.append('co_name_kana_jp', values.co_name_kana_jp);
                formData.append('co_name_en', values.co_name_en);
                formData.append('co_prefecture_jp', 'Not Japan');
                formData.append('co_prefecture', values.co_prefecture);
                formData.append('co_city_en', values.co_city_en);
                if (values.co_url === '') {
                  formData.append('co_url_choice', '無');
                } else {
                  formData.append('co_url_choice', '有');
                }
                formData.append('co_url', values.co_url);
                formData.append('co_intro_jp', values.co_intro_jp);
                formData.append('co_intro_en', values.co_intro_en);
                formData.append(
                  'strategies_and_goals',
                  values.strategies_and_goals,
                );
                formData.append('first_name_en', values.first_name_en);
                formData.append('last_name_en', values.last_name_en);
                formData.append('first_name_jp', values.first_name_jp);
                formData.append('last_name_jp', values.last_name_jp);
                formData.append('email', values.email);
                formData.append('phone_number', values.phone_number);

                let response: any = await userEdit(formData, user.token);
                if (response && response.status === 200) {
                  dispatch(updateProfile(response.data));
                  setIsLoading(false);
                }
                Toast.show({
                  type: 'success',
                  text1: 'Profile updated successfully',
                  visibilityTime: 3000,
                  position: 'bottom',
                });
                setTimeout(() => {
                  navigation.navigate('Dashboard');
                }, 500);
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
                  <View style={styles.companyProfileContainer}>
                    <Header type={1}>Company Profile</Header>
                    <Text style={styles.instructions}>
                      Fields labeled (Japanese) are not forced. You may enter
                      English instead.
                    </Text>
                    <Input
                      value={values.customer_id}
                      label={'Customer ID'}
                      onBlur={() => setFieldTouched('customer_id')}
                      onChangeText={handleChange('customer_id')}
                    />
                    {touched.customer_id && errors.customer_id && (
                      <Text style={styles.errorText}>{errors.customer_id}</Text>
                    )}
                    <Input
                      value={values.co_name_en}
                      label={'Company Name'}
                      onBlur={() => setFieldTouched('co_name_en')}
                      onChangeText={handleChange('co_name_en')}
                    />
                    {touched.co_name_en && errors.co_name_en && (
                      <Text style={styles.errorText}>{errors.co_name_en}</Text>
                    )}
                    <Input
                      value={values.co_name_jp}
                      label={'Company Name (Japanese)'}
                      onBlur={() => setFieldTouched('co_name_jp')}
                      onChangeText={handleChange('co_name_jp')}
                    />
                    {touched.co_name_jp && errors.co_name_jp && (
                      <Text style={styles.errorText}>{errors.co_name_jp}</Text>
                    )}
                    <Input
                      value={values.co_name_kana_jp}
                      label={'Company Name (Japanese - Kana)'}
                      onBlur={() => setFieldTouched('co_name_kana_jp')}
                      onChangeText={handleChange('co_name_kana_jp')}
                    />
                    {touched.co_name_kana_jp && errors.co_name_kana_jp && (
                      <Text style={styles.errorText}>
                        {errors.co_name_kana_jp}
                      </Text>
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
                    {values.co_logo_path && !selectImage ? (
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${BASE_URL}/images/company-logo/${values.co_logo_path}`,
                        }}
                      />
                    ) : null}
                    <Input
                      value={values.co_city_en}
                      label={'Address'}
                      onBlur={() => setFieldTouched('co_city_en')}
                      onChangeText={handleChange('co_city_en')}
                    />
                    {touched.co_city_en && errors.co_city_en && (
                      <Text style={styles.errorText}>{errors.co_city_en}</Text>
                    )}
                    <Input
                      value={values.co_prefecture}
                      label={'State'}
                      onBlur={() => setFieldTouched('co_prefecture')}
                      onChangeText={handleChange('co_prefecture')}
                    />
                    {touched.co_prefecture && errors.co_prefecture && (
                      <Text style={styles.errorText}>
                        {errors.co_prefecture}
                      </Text>
                    )}
                    <Input
                      value={values.co_url}
                      label={'Home Page URL'}
                      onBlur={() => setFieldTouched('co_url')}
                      onChangeText={handleChange('co_url')}
                    />
                    <Input
                      value={values.co_intro_en}
                      label={'Company Introduction'}
                      multiline={true}
                      onBlur={() => setFieldTouched('co_intro_en')}
                      onChangeText={handleChange('co_intro_en')}
                    />
                    {touched.co_intro_en && errors.co_intro_en && (
                      <Text style={styles.errorText}>{errors.co_intro_en}</Text>
                    )}
                    <Input
                      value={values.co_intro_jp}
                      label={'Company Introduction (Japanese)'}
                      multiline={true}
                      onBlur={() => setFieldTouched('co_intro_jp')}
                      onChangeText={handleChange('co_intro_jp')}
                    />
                    {touched.co_intro_jp && errors.co_intro_jp && (
                      <Text style={styles.errorText}>{errors.co_intro_jp}</Text>
                    )}
                    <Input
                      value={values.strategies_and_goals}
                      label={'Company strategies and goals'}
                      multiline={true}
                      onBlur={() => setFieldTouched('strategies_and_goals')}
                      onChangeText={handleChange('strategies_and_goals')}
                    />
                    {touched.strategies_and_goals &&
                      errors.strategies_and_goals && (
                        <Text style={styles.errorText}>
                          {errors.strategies_and_goals}
                        </Text>
                      )}
                  </View>
                  <View style={styles.userProfileContainer}>
                    <Header type={1}>User Profile</Header>
                    <Input
                      value={values.first_name_en}
                      label={'First Name'}
                      onBlur={() => setFieldTouched('first_name_en')}
                      onChangeText={handleChange('first_name_en')}
                    />
                    {touched.first_name_en && errors.first_name_en && (
                      <Text style={styles.errorText}>
                        {errors.first_name_en}
                      </Text>
                    )}
                    <Input
                      value={values.last_name_en}
                      label={'Last Name'}
                      onBlur={() => setFieldTouched('last_name_en')}
                      onChangeText={handleChange('last_name_en')}
                    />
                    {touched.last_name_en && errors.last_name_en && (
                      <Text style={styles.errorText}>
                        {errors.last_name_en}
                      </Text>
                    )}
                    <Input
                      value={values.first_name_jp}
                      label={'First Name (Japanese)'}
                      onBlur={() => setFieldTouched('first_name_jp')}
                      onChangeText={handleChange('first_name_jp')}
                    />
                    {touched.first_name_jp && errors.first_name_jp && (
                      <Text style={styles.errorText}>
                        {errors.first_name_jp}
                      </Text>
                    )}
                    <Input
                      value={values.last_name_jp}
                      label={'Last Name (Japanese)'}
                      onBlur={() => setFieldTouched('last_name_jp')}
                      onChangeText={handleChange('last_name_jp')}
                    />
                    {touched.last_name_jp && errors.last_name_jp && (
                      <Text style={styles.errorText}>
                        {errors.last_name_jp}
                      </Text>
                    )}
                    <View style={styles.disabled}>
                      <Input
                        value={values.email}
                        keyboardType={'email-address'}
                        label={'Email'}
                        editable={false}
                        onBlur={() => setFieldTouched('email')}
                        onChangeText={handleChange('email')}
                      />
                    </View>
                    <Input
                      value={values.phone_number}
                      keyboardType={'number-pad'}
                      label={'Phone Number'}
                      onBlur={() => setFieldTouched('phone_number')}
                      onChangeText={handleChange('phone_number')}
                    />
                    {touched.phone_number && errors.phone_number && (
                      <Text style={styles.errorText}>
                        {errors.phone_number}
                      </Text>
                    )}
                  </View>
                  <Button
                    isDisabled={!isValid}
                    title={'UPDATE'}
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
        <Toast />
      </SafeAreaView>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  dbLink: {
    marginLeft: horizontalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dbLinkText: {
    fontSize: scaleFontSize(14),
    marginLeft: horizontalScale(5),
  },
  logOut: {
    marginRight: horizontalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutText: {
    fontSize: scaleFontSize(14),
    marginLeft: horizontalScale(5),
  },
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginBottom: verticalScale(24),
  },
  companyProfileContainer: {
    marginTop: verticalScale(15),
  },
  userProfileContainer: {
    marginTop: verticalScale(15),
  },
  instructions: {
    marginVertical: verticalScale(14),
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
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
});
