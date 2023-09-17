/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import AuthStackNavigator from './authStack.navigator';
import auth from '@react-native-firebase/auth';
import Loader from '../components/loader.comp';
import MyDrawer from './drawer.navigation';

const Stack = createNativeStackNavigator();

const RootStackNavigator = () => {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) {
      setInitializing(false);
    }
  }

  //mounting the auth listener from firebase auth
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; //unmounts the listener prevents memory leaks
  }, []);

  if (initializing) {
    return <Loader loading={initializing} />;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      {!user ? (
        <Stack.Screen name={ROUTES.AUTHSTACK} component={AuthStackNavigator} />
      ) : (
        <Stack.Screen name={'Drawer'} component={MyDrawer} />
      )}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
