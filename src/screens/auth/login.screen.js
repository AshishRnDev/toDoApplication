/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import BaseView from '../../components/baseView.comp';
import Loader from '../../components/loader.comp';
import {SignInUser} from '../../service';
import {showErrorToast, showSuccessToast} from '../../utils/ToastManager';
import {LoginValidation} from '../../Validation';
import LinearBackground from '../../components/linearBackground.comp';
import CustomInput from '../../components/customInput.comp';
import CustomButton from '../../components/customButton.comp';
import {styles} from './Style';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const Login = async () => {
    let data = {email, password};

    //validation for login
    let errors = LoginValidation(data);

    //checks if the value of errors is true or not
    if (!errors) {
      setLoading(true);
      //if errors === false SignInUser, firbase auth function executes
      try {
        await SignInUser(email, password);
        setLoading(false);
        showSuccessToast('👋 Welcome Again');
      } catch (error) {
        setLoading(false);
        showErrorToast('👋' + error.message);
        console.warn('Error', error);
      }
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
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.timingText}>Create your timing!</Text>
          <View style={styles.inputButtonContainer}>
            <Text style={styles.labelText}>Email</Text>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={txt => setEmail(txt)}
              keyboardType={'email-address'}
            />
            <Text style={styles.labelText}>Password</Text>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={txt => setPassword(txt)}
              password
            />
            <CustomButton title={'TAKE ME IN'} onPress={Login} />
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.REGISTER)}
              style={styles.touchable}>
              <Text style={styles.dontText}>Don’t have an account?</Text>
              <Text style={styles.regText}> Register me</Text>
            </TouchableOpacity>
          </View>
        </LinearBackground>
      </BaseView>
    </ScrollView>
  );
};

export default LoginScreen;
