import React from 'react';
import type {PropsWithChildren} from 'react';
import {KeyboardType, StyleSheet, Text, TextInput, View} from 'react-native';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../util/scaling';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type InputProps = PropsWithChildren<{
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  value?: string;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText: (val: string) => void;
}>;

function Input({
  label,
  placeholder = '',
  value,
  keyboardType = 'default',
  secureTextEntry = false,
  onFocus,
  onBlur,
  onChangeText,
}: InputProps): JSX.Element {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
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
  input: {
    backgroundColor: Colors.gray900,
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(8),
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.5)',
    color: Colors.grayPrimary,
    borderRadius: horizontalScale(10),
  },
});
