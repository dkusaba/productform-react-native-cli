import React, {useState} from 'react';
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
  secureTextEntry?: boolean;
  onChangeText: (val: string) => void;
}>;

function Input({
  label,
  placeholder = '',
  keyboardType = 'default',
  secureTextEntry = false,
  onChangeText,
}: InputProps): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={val => {
          setValue(val);
          onChangeText(val);
        }}
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
