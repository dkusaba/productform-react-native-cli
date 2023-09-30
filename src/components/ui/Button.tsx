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
  fullWidth?: boolean;
  isDisabled?: boolean;
  secondary?: boolean;
  onPress: () => void;
}>;

function Button({
  title,
  isDisabled = true,
  fullWidth = true,
  secondary = false,
  onPress,
}: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[
        style.button,
        secondary && style.button2,
        !fullWidth && style.textWidth,
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
    padding: horizontalScale(10),
    backgroundColor: Colors.bluePrimary,
    height: verticalScale(40),
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
  },
  button2: {
    backgroundColor: '#ffffff',
    borderRadius: horizontalScale(10),
    borderWidth: 3,
    borderColor: Colors.bluePrimary,
  },
  textWidth: {
    alignSelf: 'flex-start',
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
    textTransform: 'uppercase',
  },
  title2: {
    color: Colors.grayPrimary,
  },
});
