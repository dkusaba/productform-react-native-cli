import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SignUpScreenNavigationProp} from '../types/navigation';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {horizontalScale, verticalScale} from '../util/scaling';
import Button from '../components/ui/Button';

function SignUp(): JSX.Element {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [fnameJP, setFnameJP] = useState('');
  const [lnameJP, setLnameJP] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()}>
          <Header type={3}>Back</Header>
        </Pressable>
        <Header type={1} center={true}>
          SIGN UP
        </Header>
        <Input
          label={'First Name'}
          onChangeText={(value: string) => setFname(value)}
        />
        <Input
          label={'Last Name'}
          onChangeText={(value: string) => setLname(value)}
        />
        <Input
          label={'First Name (Japanese)'}
          onChangeText={(value: string) => setFnameJP(value)}
        />
        <Input
          label={'Last Name (Japanese)'}
          onChangeText={(value: string) => setLnameJP(value)}
        />
        <Input
          keyboardType={'email-address'}
          label={'Email'}
          onChangeText={(value: string) => setEmail(value)}
        />
        <Input
          keyboardType={'number-pad'}
          label={'Phone Number'}
          onChangeText={(value: string) => setPhone(value)}
        />
        <Input
          label={'Password'}
          secureTextEntry={true}
          onChangeText={(value: string) => setPassword(value)}
        />
        <Input
          label={'Confirm Password'}
          secureTextEntry={true}
          onChangeText={(value: string) => setConfirmPassword(value)}
        />
        <Button
          isDisabled={email.length < 5 || password.length < 8}
          title={'Sign Up'}
          onPress={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
});
