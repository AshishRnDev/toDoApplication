import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseView from '../../components/baseView.comp';
import LinearBackground from '../../components/linearBackground.comp';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Icon, Text} from '@rneui/themed';
import {GetUser} from '../../service';
import {
  ButtonColor,
  PrimaryFont,
  PrimaryMedium,
  TertiaryColor,
} from '../../theme';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  // fetching user credentials from firestore when component mounts
  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  //get user data
  const getData = async () => {
    try {
      let response = await GetUser();
      setUser(response);
    } catch (error) {
      console.warn('Error in getData:', error); // Log the specific error message.
    }
  };
  return (
    <BaseView>
      <LinearBackground>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainerStyle}>
          <Icon type="ant-design" name="left" color={'#fff'} />
        </TouchableOpacity>

        <Text style={styles.avatarText}>
          {user?.name ? user?.name[0] : 'N'}
        </Text>

        <Text style={styles.versionText}>{`Name: ${
          user?.name ? user?.name : 'N/A'
        }`}</Text>

        <Text style={styles.versionText}>{`Email: ${
          user?.email ? user?.email : 'N/A'
        }`}</Text>

        <Text style={styles.versionText}>{`Mobile: ${
          user?.mobile ? user?.mobile : 'N/A'
        }`}</Text>
      </LinearBackground>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  versionText: {
    fontFamily: PrimaryMedium,
    color: '#fff',
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 30,
    marginTop: 10,
  },
  avatarText: {
    width: 80,
    height: 80,
    backgroundColor: ButtonColor,
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 50,
    borderRadius: 40,
    fontFamily: PrimaryFont,
    color: '#fff',
    borderWidth: 2,
    borderColor: TertiaryColor,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
