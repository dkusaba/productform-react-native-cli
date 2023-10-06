import React from 'react';
import {StyleSheet, View} from 'react-native';

import type {Product} from '../../redux/reducers/productSlice';
import {verticalScale} from '../../util/scaling';
import {Colors} from '../../constants/colors';
import Header from '../ui/Header';
import ProductItem from './ProductItem';

type ProductsListProps = {
  data: Product[];
};

function ProductsList({data}: ProductsListProps) {
  return (
    <>
      <View style={styles.productListContainer}>
        <Header type={2}>REGISTERED PRODUCTS</Header>
      </View>
      <View>
        {data.map(item => (
          <ProductItem item={item} key={item.id} />
        ))}
      </View>
    </>
  );
}

export default ProductsList;

const styles = StyleSheet.create({
  productListContainer: {
    marginTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: Colors.gray600,
  },
});
