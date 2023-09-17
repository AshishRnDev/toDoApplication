/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import BaseView from '../../components/baseView.comp';
import Loader from '../../components/loader.comp';
import {CreateUser} from '../../service';
import {showErrorToast, showSuccessToast} from '../../utils/ToastManager';
import {SignupValidation} from '../../Validation';
import CustomInput from '../../components/customInput.comp';
import CustomButton from '../../components/customButton.comp';
import {useNavigation} from '@react-navigation/native';
import LinearBackground from '../../components/linearBackground.comp';
import {ROUTES} from '../../navigation/routes';
import {styles} from './Style';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const SignUp = () => {
    let data = {name, email, mobile, password, confirmPassword};

    //validation for login
    let errors = SignupValidation(data);

    //checks if the value of errors is true or not
    if (!errors) {
      setLoading(true);
      //if errors === false CreateUser, firbase auth function executes
      CreateUser(data)
        .then(res => {
          setLoading(false);
          showSuccessToast('User created successfully.');
          console.warn(res);
        })
        .catch(error => {
          showErrorToast(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}>
      <BaseView>
        <Loader loading={loading} />
        <LinearBackground>
          <Text style={[styles.welcomeText, {fontSize: 32, marginTop: 40}]}>
            Task Bin
          </Text>
          <Text style={styles.welcomeText}>Let’s make an account!</Text>
          <Text style={styles.timingText}>Create your timing!</Text>
          <View style={styles.inputButtonContainer}>
            <Text style={styles.labelText}>Name</Text>
            <CustomInput
              placeholder="Enter your name"
              value={name}
              onChangeText={txt => setName(txt)}
            />
            <Text style={styles.labelText}>Email</Text>
            <CustomInput
              placeholder="Enter your email"
              keyboardType="email-address"
              value={email}
              onChangeText={txt => setEmail(txt)}
            />
            <Text style={styles.labelText}>Mobile</Text>
            <CustomInput
              placeholder="Enter your mobile number"
              keyboardType="numeric"
              value={mobile}
              maxLength={10}
              onChangeText={txt => setMobile(txt)}
            />
            <Text style={styles.labelText}>Password</Text>
            <CustomInput
              password
              placeholder="Enter your password"
              value={password}
              onChangeText={txt => setPassword(txt)}
            />
            <Text style={styles.labelText}>Confirm Password</Text>
            <CustomInput
              password
              placeholder="Re-Enter your password"
              value={confirmPassword}
              onChangeText={txt => setConfirmPassword(txt)}
            />
            <CustomButton title={'REGISTER'} onPress={SignUp} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.LOGIN)}
              style={styles.touchable}>
              <Text style={styles.dontText}>Already a member?</Text>
              <Text style={styles.regText}> Log In</Text>
            </TouchableOpacity>
          </View>
        </LinearBackground>
      </BaseView>
    </ScrollView>
  );
};
export default RegisterScreen;
