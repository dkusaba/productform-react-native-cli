import {StackNavigationProp} from '@react-navigation/stack';
import type {UserState} from '../redux/reducers/User';
import type {Product} from '../redux/reducers/Product';

export type AppStackNavigatorParamList = {
  Login: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Profile: {user: UserState};
  Product: {product: Product | null};
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
