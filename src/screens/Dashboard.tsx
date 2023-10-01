import React, {useEffect} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import type {DashboardScreenNavigationProp} from '../types/navigation';
import type {RootState} from '../redux/store';

import {horizontalScale, verticalScale, scaleFontSize} from '../util/scaling';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors} from '../constants/colors';

function Dashboard(): JSX.Element {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.product);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileIcon}>
            <FontAwesomeIcon icon={faUser} size={16} />
          </View>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Header type={1}>Welcome!</Header>
          {!products.items.length &&
          (user.data.customer_id === '' ||
            user.data.co_name_jp === '' ||
            user.data.co_name_kana_jp === '' ||
            user.data.co_name_en === '' ||
            user.data.co_logo_path === '' ||
            user.data.co_prefecture === '' ||
            user.data.co_city_en === '' ||
            user.data.co_url === '' ||
            user.data.co_intro_jp === '' ||
            user.data.co_intro_en === '') ? (
            <>
              <Text style={styles.status}>
                You must enter company information before registering a product.
              </Text>
              <Button
                title={'Enter company information'}
                isDisabled={false}
                fullWidth={false}
                onPress={() => {
                  navigation.navigate('Profile');
                }}
              />
            </>
          ) : null}
          {!products.items.length &&
          user.data.customer_id !== '' &&
          user.data.co_name_jp !== '' &&
          user.data.co_name_kana_jp !== '' &&
          user.data.co_name_en !== '' &&
          user.data.co_logo_path !== '' &&
          user.data.co_prefecture !== '' &&
          user.data.co_city_en !== '' &&
          user.data.co_url !== '' &&
          user.data.co_intro_jp !== '' &&
          user.data.co_intro_en !== '' ? (
            <>
              <Text style={styles.status}>
                You currently do not have any product registered.
              </Text>
              <Button
                title={'Register a product'}
                isDisabled={false}
                fullWidth={false}
                onPress={() => {
                  navigation.navigate('Product', {product: null});
                }}
              />
            </>
          ) : null}
          {products.items.length && products.items.length < 5 ? (
            <>
              <Text style={styles.status}>
                You currently have {products.items.length} product
                {products.items.length === 1 ? '' : 's'} registered. You can
                register up to 5 items.
              </Text>
              <Button
                title={'Register a product'}
                isDisabled={false}
                fullWidth={false}
                onPress={() => {
                  navigation.navigate('Product', {product: null});
                }}
              />
            </>
          ) : null}
          {products.items.length === 5 ? (
            <Text style={styles.status}>
              You currently have {products.items.length} products registered.
              You've reached the maximum amount of registered products.
            </Text>
          ) : null}
          {products.items.length ? (
            <View style={styles.regProductContainer}>
              <Header type={2}>REGISTERED PRODUCTS</Header>
            </View>
          ) : null}
          {products.items.length
            ? products.items.map(item => (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.product}
                    onPress={() => {
                      navigation.navigate('Product', {
                        product: item,
                      });
                    }}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{
                          uri: `http://127.0.0.1:8000/images/products/${item.image_path_1}`,
                        }}
                      />
                    </View>
                    <View style={styles.nameContainer}>
                      <Text numberOfLines={1} style={styles.name}>
                        {item.name_en}
                      </Text>
                    </View>
                    <View style={styles.iconContainer}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size={20}
                        color={Colors.grayPrimary}
                      />
                      <Text style={styles.iconText}>EDIT</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  profileIcon: {
    width: horizontalScale(20),
    height: horizontalScale(20),
    marginRight: horizontalScale(14),
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
    borderRadius: horizontalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  status: {
    marginTop: verticalScale(15),
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    color: Colors.grayPrimary,
  },
  regProductContainer: {
    marginTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: Colors.gray600,
  },
  product: {
    marginTop: verticalScale(10),
    padding: horizontalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray700,
    borderRadius: horizontalScale(5),
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: horizontalScale(50),
    height: horizontalScale(50),
    marginRight: horizontalScale(10),
    borderRadius: horizontalScale(5),
  },
  nameContainer: {
    flex: 3,
  },
  name: {
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(14),
  },
  iconContainer: {
    flex: 1,
    marginLeft: 'auto',
    alignItems: 'center',
  },
  iconText: {
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    fontWeight: '500',
  },
});
