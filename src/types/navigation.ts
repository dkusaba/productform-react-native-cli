import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackNavigatorParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'Login'
>;

export type SignUpScreenNavigationProp = StackNavigationProp<
  AppStackNavigatorParamList,
  'SignUp'
>;
