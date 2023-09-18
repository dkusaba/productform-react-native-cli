import React from 'react';
import type {PropsWithChildren} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {
  horizontalScale,
  verticalScale,
  scaleFontSize,
} from '../../util/scaling';
import {Colors} from '../../constants/colors';

type ButtonProps = PropsWithChildren<{
  title: string;
  isDisabled?: boolean;
  onPress: () => void;
}>;

function Button({
  title,
  isDisabled = false,
  onPress,
}: ButtonProps): JSX.Element {
  return (
    <Pressable
      disabled={isDisabled}
      style={[style.button, isDisabled && style.disabled]}
      onPress={() => onPress()}>
      <Text style={style.title}>{title}</Text>
    </Pressable>
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
});
