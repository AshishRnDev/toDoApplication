/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import BaseView from '../../components/baseView.comp';
import {Image} from '@rneui/themed';
import {StyleSheet} from 'react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ROUTES.ROOTSTACK);
    }, 2000);
  }, []);
  return (
    <BaseView style={styles.container}>
      <Image
        source={require('../../images/toDoLogo.png')}
        style={styles.image}
      />
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 180,
  },
});

export default SplashScreen;
