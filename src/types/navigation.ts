import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackNavigatorParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Profile: undefined;
  Product: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Login'
>;

export type SignUpScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'SignUp'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Home'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Profile'
>;

export type ProductScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Product'
>;
