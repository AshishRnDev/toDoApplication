/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import auth from '@react-native-firebase/auth';
import BaseView from '../../components/baseView.comp';
import LinearBackground from '../../components/linearBackground.comp';
import CustomButton from '../../components/customButton.comp';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import TaskItem from '../../components/taskItem.comp';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../navigation/routes';
import {Icon, Text} from '@rneui/themed';
import Loader from '../../components/loader.comp';
import {styles} from './homeStyle';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedButton, setSelectedButton] = useState(1);

  //storing buttons info for top-toggle bar
  const buttons = [
    {id: 1, label: 'All'},
    {id: 2, label: 'Important'},
    {id: 3, label: 'Completed'},
  ];

  //updating the state value when user press toggle buttons
  const handleButtonPress = buttonId => {
    setSelectedButton(buttonId);
  };

  //get task updated when user navigate between screens
  useFocusEffect(
    useCallback(() => {
      getTaskData();
    }, [refresh]),
  );

  //fetching task credentials from firestore
  const getTaskData = async () => {
    const userId = auth().currentUser.uid;
    const tempData = [];
    setLoading(true);
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        if (res?.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setTaskData(tempData);
        setLoading(false);
      })
      .catch(error => {
        console.warn(error.message);
        setLoading(false);
      });
  };

  //fetching tasks which are marked as important
  const importantData = taskData?.filter(
    item => item?.isImportant === true && item?.isCompleted === false,
  );

  //fetching tasks which are marked as completed
  const completedData = taskData?.filter(item => item?.isCompleted === true);

  //providing data corresponding to toggle bar
  const cardData =
    selectedButton === 1
      ? taskData
      : selectedButton === 2
      ? importantData
      : selectedButton === 3
      ? completedData
      : null;

  return (
    <BaseView>
      <Loader loading={loading} />
      <LinearBackground>
        <View style={styles.textIconContainer}>
          <Icon
            onPress={() => navigation.openDrawer()}
            type="material-icons"
            name={'notes'}
            size={30}
            color={'#fff'}
            containerStyle={styles.iconContainer}
          />
          <Text style={styles.appNameText}>Task Bin</Text>
        </View>
        <View style={styles.buttonGroup}>
          {buttons.map(button => (
            <TouchableOpacity
              key={button.id}
              style={[
                styles.button,
                selectedButton === button.id && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(button.id)}>
              <Text
                style={[
                  styles.buttonText,
                  selectedButton === button.id && styles.selectedButtonText,
                ]}>
                {button.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardContainer}>
            {taskData?.length === 0 && !loading ? (
              <>
                <Text style={styles.emptyTitle}>You don't have any tasks.</Text>
                <Text style={styles.emptyText}>
                  Tap the button below to start adding new tasks.
                </Text>
              </>
            ) : null}
            {cardData?.map(item => {
              return (
                <TaskItem
                  onDelete={() => setRefresh(!refresh)}
                  key={item?.taskId}
                  item={item}
                />
              );
            })}
          </View>
        </ScrollView>
        <LinearGradient
          colors={[
            'rgba(87, 192, 245, 0.7)',
            'rgba(43, 137, 230, 0.3)',
            'rgba(23, 90, 189, 0.2)',
          ]}
          style={styles.linearStyle}>
          <CustomButton
            iconRight
            containerStyle={styles.btnContainerStyle}
            title={'Add New Task'}
            onPress={() => navigation.navigate(ROUTES.ADDTASK)}
            icon={() => (
              <Icon
                name="pluscircleo"
                type="antdesign"
                size={22}
                color={'#fff'}
                style={styles.buttonIcon}
              />
            )}
          />
        </LinearGradient>
      </LinearBackground>
    </BaseView>
  );
};

export default HomeScreen;
