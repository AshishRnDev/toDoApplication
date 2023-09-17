/* eslint-disable react/no-unstable-nested-components */
import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {PrimaryColor, PrimarySemiBold} from '../theme';
import CustomDrawer from '../components/customDrawer.comp';
import MainStackNavigator from './mainStack.navigator';
import {ROUTES} from './routes';
import InformationScreen from '../screens/main/information.screen';
import ProfileScreen from '../screens/main/Profile.screen';
import SettingScreen from '../screens/main/settimgs.screen';
import {Icon} from '@rneui/themed';
import ContactsScreen from '../screens/main/contacts.screen';

const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: PrimaryColor,
        drawerInactiveBackgroundColor: 'rgba(87, 192, 245, 0.7)',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          fontFamily: PrimarySemiBold,
          fontSize: 16,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type="ionicon"
              name={'home-outline'}
              color={color}
              size={22}
            />
          ),
          drawerLabel: 'Home',
        }}
        name={ROUTES.MAINSTACK}
        component={MainStackNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type="ionicon"
              name={'person-outline'}
              color={color}
              size={22}
            />
          ),
          drawerLabel: 'Profile',
        }}
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type="ant-design"
              name={'infocirlceo'}
              color={color}
              size={22}
            />
          ),
          drawerLabel: 'Information',
        }}
        name={ROUTES.INFORMATION}
        component={InformationScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type="ionicon"
              name={'call-outline'}
              color={color}
              size={22}
            />
          ),
        }}
        name="Contacts"
        component={ContactsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type="ionicon"
              name={'settings-outline'}
              color={color}
              size={22}
            />
          ),
          drawerLabel: 'Settings',
        }}
        name={ROUTES.SETTING}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};
export default MyDrawer;
