import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors} from '../../constants/colors';
import {scaleFontSize} from '../../util/scaling';

type HeaderProps = PropsWithChildren<{
  type: number;
  color?: string;
  numberOfLines?: number;
  center?: boolean;
}>;

function Header({
  children,
  type,
  color = Colors.grayPrimary,
  numberOfLines,
  center = false,
}: HeaderProps): JSX.Element {
  const styleToApply = () => {
    switch (type) {
      case 1:
        return styles.title1;
      case 2:
        return styles.title2;
      case 3:
        return styles.title3;
      default:
        return styles.title1;
    }
  };
  const centerText = center ? 'center' : 'left';
  const numLines = numberOfLines ? numberOfLines : 0;

  return (
    <View>
      <Text
        style={[styleToApply(), {color: color, textAlign: centerText}]}
        numberOfLines={numLines}>
        {children}
      </Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  title1: {
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(24),
    lineHeight: scaleFontSize(29),
    fontWeight: '500',
  },
  title2: {
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(22),
    fontWeight: '500',
  },
  title3: {
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontWeight: '500',
  },
});
