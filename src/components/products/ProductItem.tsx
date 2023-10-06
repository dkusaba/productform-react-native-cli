import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {useNavigation} from '@react-navigation/native';

import type {DashboardScreenNavigationProp} from '../../types/navigation';
import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../util/scaling';
import {BASE_URL} from '../../constants/config';
import {Colors} from '../../constants/colors';
import {Product} from '../../redux/reducers/productSlice';

type ProductProps = {
  item: Product;
};

function ProductItem({item}: ProductProps): JSX.Element {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  function productPressHandler() {
    navigation.navigate('Product', {
      product: item,
    });
  }

  return (
    <TouchableOpacity style={styles.product} onPress={productPressHandler}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: `${BASE_URL}/images/products/${item.image_path_1}`,
          }}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {item.name_en}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={faEdit} size={20} color={Colors.grayPrimary} />
        <Text style={styles.iconText}>EDIT</Text>
      </View>
    </TouchableOpacity>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    marginTop: verticalScale(5),
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
