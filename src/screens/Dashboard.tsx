import React, {useEffect} from 'react';
import {Pressable, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import type {DashboardScreenNavigationProp} from '../types/navigation';
import type {RootState} from '../redux/store';

import {resetToInitialState} from '../redux/reducers/User';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';

function Dashboard(): JSX.Element {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const products = useSelector((state: RootState) => state.product);

  async function logoutHandler() {
    const clearCredentials = await Keychain.resetGenericPassword();
    if (clearCredentials) {
      dispatch(resetToInitialState);
      navigation.replace('Login');
    }
  }

  useEffect(() => {
    console.log(products);
  });

  return (
    <SafeAreaView>
      <Header type={1}>DASHBOARD</Header>
      <Pressable onPress={logoutHandler}>
        <Header type={1}>Log Out</Header>
      </Pressable>
      <Button
        secondary={true}
        title={'Register a product'}
        isDisabled={false}
        onPress={() => {
          navigation.navigate('Product');
        }}
      />
      <Button
        secondary={true}
        title={'Enter company profile'}
        isDisabled={false}
        onPress={() => {
          navigation.navigate('Profile', {user: user});
        }}
      />
      <Button
        secondary={true}
        title={'Register a product'}
        isDisabled={false}
        onPress={() => {
          navigation.navigate('Product', {product: null});
        }}
      />
      {products.items.length &&
        products.items.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              console.log(item.id);
              navigation.navigate('Product', {
                product: item,
              });
            }}>
            <Text>{item.name_en}</Text>
          </TouchableOpacity>
        ))}
    </SafeAreaView>
  );
}

export default Dashboard;
