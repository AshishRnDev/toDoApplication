import React, {useState} from 'react';
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
import uuid from 'react-native-uuid';
import {showErrorToast} from '../../utils/ToastManager';
import {TaskValidation} from '../../Validation';
import {useNavigation} from '@react-navigation/native';
import {styles} from './taskStyle';

const CustomCheckedIcon = () => (
  <Icon name="check-box" type="material" color="#fff" size={24} />
);

const CustomUncheckedIcon = () => (
  <Icon name="check-box-outline-blank" type="material" color="#fff" size={24} />
);
export const TaskAddDialog = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

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

  // create a new task for the user
  const createTask = async () => {
    const UserId = auth().currentUser.uid;

    //generate a unique id for each task
    const taskId = uuid.v4();
    const data = {title, description};

    //task validation
    const errors = TaskValidation(data);
    if (!errors) {
      await firestore()
        .collection('users')
        .doc(UserId)
        .collection('tasks')
        .doc(taskId)
        .set({
          taskTitle: title?.trim(),
          taskDescription: description?.trim(),
          isImportant: checked,
          isCompleted: false,
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
        <Text style={styles.newTask}>New Task</Text>
        <Text style={styles.labelText}>Task Title</Text>
        <CustomInput
          placeholder="Add Task Name..."
          value={title}
          onChangeText={txt => setTitle(txt)}
        />
        <Text style={styles.labelText}>Description</Text>
        <CustomInput
          placeholder="Add Description..."
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
            title={'Create'}
            buttonStyle={styles.createButtonStyle}
            onPress={createTask}
          />
        </View>
      </View>
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: PrimaryColor,
//     zIndex: 1,
//     flex: 1,
//   },
//   newTask: {
//     color: '#fff',
//     fontSize: 24,
//     fontFamily: PrimarySemiBold,
//     textAlign: 'center',
//     paddingBottom: 15,
//     borderBottomWidth: 2,
//     borderColor: '#fff',
//     marginHorizontal: 25,
//     marginVertical: 20,
//   },
//   labelText: {
//     color: '#fff',
//     marginLeft: 13,
//     marginVertical: 4,
//     fontFamily: PrimaryFont,
//     fontSize: 17,
//   },
//   checkContainerStyle: {
//     backgroundColor: 'transparent',
//   },
//   btnContainerStyle: {
//     width: WINDOW_WIDTH / 2.3,
//   },
//   cancelButtonStyle: {
//     backgroundColor: PrimaryColor,
//     borderWidth: 1,
//     borderColor: TertiaryColor,
//   },
//   createButtonStyle: {
//     backgroundColor: TertiaryColor,
//     borderWidth: 1,
//     borderColor: TertiaryColor,
//   },
//   keycontainer: {
//     flex: 1,
//   },
//   btnContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 80,
//   },
// });
