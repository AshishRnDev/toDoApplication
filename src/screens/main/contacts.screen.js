import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import BaseView from '../../components/baseView.comp';
import {PrimaryMedium} from '../../theme';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import LinearBackground from '../../components/linearBackground.comp';

const ContactsScreen = () => {
  const navigation = useNavigation();
  return (
    <BaseView>
      <LinearBackground>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainerStyle}>
          <Icon type="ant-design" name="left" color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.versionText}>Name: Ashish Tanwar</Text>
        <Text style={styles.versionText}>Email: ashishrndev@gmail.com</Text>
        <Text style={styles.versionText}>Mobile: 8094000177</Text>
      </LinearBackground>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  versionText: {
    fontFamily: PrimaryMedium,
    color: '#fff',
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 30,
    marginTop: 10,
  },
  iconContainerStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
});

export default ContactsScreen;
