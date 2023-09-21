import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackNavigatorParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
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

export type DashboardScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Dashboard'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Profile'
>;

export type ProductScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Product'
>;
