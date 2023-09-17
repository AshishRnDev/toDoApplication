import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import BaseView from '../../components/baseView.comp';
import {PrimaryFont} from '../../theme';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import LinearBackground from '../../components/linearBackground.comp';

const SettingScreen = () => {
  const navigation = useNavigation();
  return (
    <BaseView>
      <LinearBackground>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainerStyle}>
          <Icon type="ant-design" name="left" color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.versionText}>Version: 0.0.1</Text>
      </LinearBackground>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  versionText: {
    fontFamily: PrimaryFont,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  iconContainerStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default SettingScreen;
