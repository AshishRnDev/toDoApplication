import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import BaseView from '../../components/baseView.comp';
import {PrimaryFont} from '../../theme';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import LinearBackground from '../../components/linearBackground.comp';

const InformationScreen = () => {
  const navigation = useNavigation();
  return (
    <BaseView>
      <LinearBackground>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainerStyle}>
          <Icon type="ant-design" name="left" color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.versionText}>
          Welcome to TaskBin, your ultimate task management solution! With
          TaskBin, you can effortlessly organize your daily life and stay on top
          of your to-do list. Create tasks, set due dates, and prioritize them
          to ensure you never miss an important deadline again. Customize your
          experience with themes and sorting options to suit your preferences.
          Our app is designed with your privacy and security in mind, so your
          data is always safe. If you ever need assistance or have suggestions,
          our support team is here to help. Thank you for choosing TaskBin to
          simplify your tasks and boost your productivity. Let's get started on
          your journey to better task management!
        </Text>
      </LinearBackground>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  versionText: {
    fontFamily: PrimaryFont,
    color: '#fff',
    fontSize: 18,
    padding: 20,
  },
  iconContainerStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default InformationScreen;
