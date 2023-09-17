import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import HomeScreen from '../screens/main/home.screen';
import {TaskAddDialog} from '../screens/main/AddTask.screen';
import {EditTaskDialog} from '../screens/main/editTask.screen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.ADDTASK} component={TaskAddDialog} />
      <Stack.Screen name={ROUTES.EDITTASK} component={EditTaskDialog} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
