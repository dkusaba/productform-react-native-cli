import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

const isSmall: boolean = width <= 375 && !DeviceInfo.hasNotch();

function guidelineBaseWidth(): number {
  if (isSmall) {
    return 330;
  }
  return 350;
}

function guidelineBaseHeight(): number {
  if (isSmall) {
    return 550;
  } else if (width > 410) {
    return 620;
  }
  return 680;
}

function guidelineBaseFonts(): number {
  if (width > 410) {
    return 430;
  }
  return 400;
}

const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth()) * size;

const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight()) * size;

const scaleFontSize = (size: number): number =>
  Math.round((size * width) / guidelineBaseFonts());

export {horizontalScale, verticalScale, scaleFontSize};
