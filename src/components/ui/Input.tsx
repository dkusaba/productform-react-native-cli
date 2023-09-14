import React, {useState} from 'react';
import {KeyboardType, StyleSheet, Text, TextInput, View} from 'react-native';
import {scaleFontSize, verticalScale} from '../assets/styles/scaling';

interface InputProps {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardType;
  secureTextEntry: boolean;
  onChangeText: (val: string) => void;
}

function Input(props: InputProps): JSX.Element {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onChangeText={val => {
          setValue(val);
          props.onChangeText(val);
        }}
      />
    </View>
  );
}

export default Input;

Input.defaultProps = {
  placeholder: null,
  keyboardType: 'default',
  secureTextEntry: false,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    color: '#36455A',
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 167, 167, 0.5)',
  },
});
