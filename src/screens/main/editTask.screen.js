/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {CheckBox, Icon, Text} from '@rneui/themed';
import {TouchableOpacity, View} from 'react-native';
import {PrimaryMedium} from '../../theme';
import CustomInput from '../../components/customInput.comp';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import CustomButton from '../../components/customButton.comp';
import {ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showErrorToast} from '../../utils/ToastManager';
import {TaskValidation} from '../../Validation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {styles} from './taskStyle';

const CustomCheckedIcon = () => (
  <Icon name="check-box" type="material" color="#fff" size={24} />
);

const CustomUncheckedIcon = () => (
  <Icon name="check-box-outline-blank" type="material" color="#fff" size={24} />
);
export const EditTaskDialog = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  // fetching data from navigation routes
  const routes = useRoute();
  const {item} = routes?.params;

  //when component mounts fill the previous task credentials
  useEffect(() => {
    setTitle(item?.taskTitle);
    setDescription(item?.taskDescription);
    setChecked(item?.isImportant);
  }, []);

  //toggle function for checkbox to tick and untick
  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  //handles the cancel action of user
  const cancel = () => {
    setChecked(false);
    setTitle('');
    setDescription('');
    setChecked(false);
    setDate(null);
    navigation.goBack();
  };

  // updating a task using the taskId from routes
  const editTask = async () => {
    const UserId = auth().currentUser.uid;
    const taskId = item?.taskId;
    const data = {title, description};
    const errors = TaskValidation(data);
    if (!errors) {
      await firestore()
        .collection('users')
        .doc(UserId)
        .collection('tasks')
        .doc(taskId)
        .update({
          taskTitle: title?.trim(),
          taskDescription: description?.trim(),
          isImportant: checked,
          dateAndTime: date ? dayjs(date).format('DD/MM/YY hh:mm a') : '',
          taskId: taskId,
          createdAt: firestore.FieldValue.serverTimestamp(),
        })
        .catch(error => {
          console.warn('Error', error);
          showErrorToast('Please Enter Data');
        })
        .then(cancel());
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollStyle}>
      <View style={styles.container}>
        <Text style={styles.newTask}>Edit Task</Text>
        <Text style={styles.labelText}>Task Title</Text>
        <CustomInput
          placeholder="Edit Task Name..."
          value={title}
          onChangeText={txt => setTitle(txt)}
        />
        <Text style={styles.labelText}>Description</Text>
        <CustomInput
          placeholder="Edit Description..."
          value={description}
          onChangeText={txt => setDescription(txt)}
          multiline
          numberOfLines={4}
        />

        <CheckBox
          title="Important"
          checked={checked}
          onPress={toggleCheckbox}
          containerStyle={styles.checkContainerStyle}
          checkedIcon={<CustomCheckedIcon />}
          uncheckedIcon={<CustomUncheckedIcon />}
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

        <Text style={styles.labelText}>Date and Time</Text>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <CustomInput
            disabled
            value={
              date ? dayjs(date).format('DD/MM/YY hh:mm a') : 'dd/mm/yy hh:mm a'
            }
          />
        </TouchableOpacity>

        <DatePicker
          modal
          open={open}
          date={dayjs().toDate()}
          onConfirm={res => {
            setOpen(false);
            setDate(res);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={dayjs().toDate()}
          title={'Select a deadline for the task'}
        />

        <View style={styles.btnContainer}>
          <CustomButton
            containerStyle={styles.btnContainerStyle}
            buttonStyle={styles.cancelButtonStyle}
            title={'Cancel'}
            onPress={cancel}
          />
          <CustomButton
            containerStyle={styles.btnContainerStyle}
            title={'Update'}
            buttonStyle={styles.createButtonStyle}
            onPress={editTask}
          />
        </View>
      </View>
    </ScrollView>
  );
};
