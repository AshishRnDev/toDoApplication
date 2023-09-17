import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import SplashScreen from '../screens/auth/splash.screen';
import RootStackNavigator from './rootStack.navigator';

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'fade', headerShown: false}}>
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.ROOTSTACK} component={RootStackNavigator} />
    </Stack.Navigator>
  );
};

export default MainApp;
