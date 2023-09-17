import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainApp from './navigation';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <MainApp />
      <Toast />
    </NavigationContainer>
  );
};

export default App;
