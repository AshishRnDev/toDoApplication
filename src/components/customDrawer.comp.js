import React from 'react';
import {View, Text, TouchableOpacity, Share, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import BaseView from './baseView.comp';
import LinearBackground from './linearBackground.comp';
import {Image} from '@rneui/themed';
import {PrimaryBold, PrimaryMedium, TertiaryColor} from '../theme';
import {showSuccessToast} from '../utils/ToastManager';

const CustomDrawer = props => {
  //function to share your app info via socilMedia or others
  const onShare = async () => {
    try {
      await Share.share({
        message: 'www.linkedin.com/in/ashish-tanwar-a04240279',
      });
    } catch (error) {
      console.warn(error.message);
    }
  };
  //function to handle signout action
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        showSuccessToast('Logout Succesfully!');
      })
      .catch(error => console.warn(error.message));
  };

  return (
    <BaseView>
      <DrawerContentScrollView {...props}>
        <View>
          <LinearBackground style={styles.linearContainer}>
            <View style={styles.avatarContainer}>
              <View>
                <Image
                  source={require('../images/user.png')}
                  size={80}
                  style={styles.avatar}
                />
                <Text style={styles.nameText}>Hello, TaskMaster</Text>
              </View>
            </View>
          </LinearBackground>
        </View>
        <View style={styles.drawerItemContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.shareLogoutContainer}>
        <TouchableOpacity onPress={onShare}>
          <View style={styles.iconContainer}>
            <Ionicons
              color={TertiaryColor}
              name="share-social-outline"
              size={22}
            />
            <Text style={styles.shareText}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutTouch}>
          <View style={styles.signoutContainer}>
            <Ionicons color={'red'} name="exit-outline" size={22} />
            <Text style={styles.signoutText}>SignOut</Text>
          </View>
        </TouchableOpacity>
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  linearContainer: {
    padding: 15,
    marginTop: -5,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
  },
  nameText: {
    fontSize: 20,
    fontFamily: PrimaryMedium,
    color: '#fff',
    alignSelf: 'center',
  },
  editContainerStyle: {
    marginLeft: 30,
  },
  drawerItemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  shareLogoutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f5f5',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareText: {
    fontSize: 15,
    marginHorizontal: 8,
    color: TertiaryColor,
    fontFamily: PrimaryBold,
  },
  logoutTouch: {
    marginTop: 10,
  },
  signoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signoutText: {
    fontSize: 15,
    marginHorizontal: 8,
    color: 'red',
    fontFamily: PrimaryBold,
  },
});

export default CustomDrawer;
