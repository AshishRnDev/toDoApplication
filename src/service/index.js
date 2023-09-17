import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// function to create a new user
export const CreateUser = async data => {
  try {
    await auth().createUserWithEmailAndPassword(data.email, data.password);
    await SaveUser(data);
    return 'Success';
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('This email address is invalid!');
    } else {
      throw new Error('An error occurred while creating the user.');
    }
  }
};

// function to signed in the current user
export const SignInUser = async (email, password) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    return res;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('This email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('This email address is invalid!');
    } else {
      throw new Error('An error occurred while signing in.');
    }
  }
};

// function to fetch the user Data
export const GetUser = async () => {
  try {
    const UserId = auth().currentUser.uid;
    const snapshot = await firestore()
      .collection('users')
      .doc(UserId)
      .collection('userData')
      .doc('profileData')
      .get();
    return snapshot.data();
  } catch (error) {
    throw error;
  }
};

//function to save the user data while register the user
export const SaveUser = async data => {
  try {
    const UserId = auth().currentUser.uid;
    await firestore()
      .collection('users')
      .doc(UserId)
      .collection('userData')
      .doc('profileData')
      .set({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password: data.password,
        uid: UserId,
      });
    return 'Data set.';
  } catch (error) {
    throw error;
  }
};
