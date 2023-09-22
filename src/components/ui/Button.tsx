import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../util/scaling';
import {Colors} from '../../constants/colors';

type ButtonProps = PropsWithChildren<{
  title: string;
  isDisabled?: boolean;
  secondary?: boolean;
  onPress: () => void;
}>;

function Button({
  title,
  isDisabled = true,
  secondary = false,
  onPress,
}: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        style.button,
        secondary && style.button2,
        isDisabled && style.disabled,
      ]}
      onPress={() => onPress()}>
      <Text style={[style.title, secondary && style.title2]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;

const style = StyleSheet.create({
  button: {
    marginTop: verticalScale(12),
    backgroundColor: Colors.bluePrimary,
    height: verticalScale(40),
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
  },
  button2: {
    backgroundColor: Colors.gray700,
    borderRadius: horizontalScale(5),
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: scaleFontSize(16),
    fontWeight: '500',
    lineHeight: scaleFontSize(19),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  title2: {
    color: Colors.grayPrimary,
  },
});
