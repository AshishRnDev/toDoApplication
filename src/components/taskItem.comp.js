/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Avatar, CheckBox, Icon, ListItem} from '@rneui/themed';
import {Button as BaseButton} from '@rneui/base';
import {styles} from './TaskItemStyle';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import {showSuccessToast} from '../utils/ToastManager';
import {PrimaryMedium} from '../theme';

const TaskItem = ({item, onDelete}) => {
  const navigation = useNavigation();
  //extracting date from firsetore dataAndTime
  const date = item?.dateAndTime
    ? item?.dateAndTime?.toString().substring(0, 8)
    : null;

  //extracting time from firsetore dateAndTime
  const time = item?.dateAndTime
    ? item?.dateAndTime?.toString().substring(8)
    : null;

  //extracting userid from currrent user in auth
  const UserId = auth().currentUser.uid;

  //extracting taskId from firestore taskId
  const taskId = item?.taskId;

  //function to delete the task
  const deleteItem = async () => {
    await firestore()
      .collection('users')
      .doc(UserId)
      .collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => {
        showSuccessToast('Task  deleted successfully!');
        onDelete();
      })
      .catch(error => {
        console.error('Error deleting document: ', error);
      });
  };

  //function to mark a task as completed
  const markAsCompleted = async () => {
    await firestore()
      .collection('users')
      .doc(UserId)
      .collection('tasks')
      .doc(taskId)
      .update({
        isCompleted: true,
      })
      .then(() => {
        showSuccessToast('Task marked as completed');
        onDelete();
      })
      .catch(error => {
        console.error('Error completing Task: ', error);
      });
  };

  //state for storing checkbox value either ticked or unticked
  const [checked, setChecked] = useState(false);

  //toggle function for checkbox to tick and untick
  const toggleCheckbox = () => {
    setChecked(true);
    markAsCompleted();
  };

  const checkedIcon = () => (
    <Icon name="check-box" type="material" color="#fff" size={24} />
  );

  const unCheckedIcon = () => (
    <Icon
      name="check-box-outline-blank"
      type="material"
      color="#fff"
      size={24}
    />
  );

  return (
    <>
      <View style={styles.height} />
      <ListItem.Swipeable
        leftContent={
          item?.isCompleted === false
            ? () => (
                <BaseButton
                  onPress={() => {
                    navigation.navigate(ROUTES.EDITTASK, {item});
                  }}
                  icon={{
                    name: 'edit',
                    color: '#fdb93c',
                    type: 'feather',
                    reverse: true,
                    reverseColor: '#fff',
                  }}
                  buttonStyle={styles.leftButtonStyle}
                  containerStyle={styles.buttonContainerStyle}
                />
              )
            : null
        }
        rightContent={() => (
          <BaseButton
            icon={{
              name: 'delete',
              color: '#ff4500',
              reverse: true,
              reverseColor: '#fff',
            }}
            onPress={deleteItem}
            buttonStyle={styles.rightButtonStyle}
            containerStyle={styles.buttonContainerStyle}
          />
        )}
        containerStyle={styles.swipeContainerStyle}>
        <View style={styles.taskContainer}>
          <View style={styles.taskTitleContainer}>
            <Text style={styles.taskStyle}>{item?.taskTitle ?? 'N/A'}</Text>

            {item?.isCompleted === true ? (
              <Text style={[styles.editStyle, {color: '#97E549'}]}>
                Completed
              </Text>
            ) : (
              <Text
                onPress={() => {
                  navigation.navigate(ROUTES.EDITTASK, {item});
                }}
                style={styles.editStyle}>
                Edit
              </Text>
            )}
          </View>
          <Text style={styles.taskDescriptionStyle}>
            {item?.taskDescription ?? 'N/A'}
          </Text>
          <Text style={styles.border} />
          <View
            style={[
              styles.timeContainer,
              {paddingBottom: item?.isCompleted && 20},
            ]}>
            {item?.dateAndTime === '' ? (
              <Text style={styles.altText}>
                There is no deadline for this task.
              </Text>
            ) : (
              <>
                <Text style={styles.timeText}>{time}</Text>
                <Text style={styles.dateText}>{date}</Text>
              </>
            )}
            {item?.isImportant ? (
              <Avatar
                containerStyle={styles.avatarContainerStyle}
                size={20}
                source={require('../images/Star.png')}
              />
            ) : null}
          </View>

          {!item?.isCompleted && (
            <CheckBox
              title="Is task completed?"
              checked={checked}
              onPress={toggleCheckbox}
              containerStyle={styles.checkContainerStyle}
              checkedIcon={checkedIcon()}
              uncheckedIcon={unCheckedIcon()}
              titleProps={{
                style: {
                  color: '#fff',
                  fontSize: 18,
                  fontFamily: PrimaryMedium,
                  marginRight: 10,
                },
              }}
              iconRight
            />
          )}
        </View>
      </ListItem.Swipeable>
    </>
  );
};

export default TaskItem;
