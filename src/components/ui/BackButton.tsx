import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import {horizontalScale, verticalScale} from '../../util/scaling';
import Header from './Header';

type BackButtonProps = PropsWithChildren<{
  onPress: () => void;
}>;

function BackButton({onPress}: BackButtonProps): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={20} />
        <Header type={4}>BACK</Header>
      </View>
    </TouchableOpacity>
  );
}

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    width: horizontalScale(40),
    marginBottom: verticalScale(10),
    alignItems: 'center',
  },
});
