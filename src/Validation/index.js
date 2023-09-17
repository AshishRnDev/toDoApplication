import {showErrorToast} from '../utils/ToastManager';

//email Regex
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//password regex minimum six characters
var passwordRegex = /^.{6,}$/;

// a number should not start with 0 and has minimum 10 digits and only contain digits from 0-9
var phoneNumberRegex = /^[1-9]\d{9}$/;

export const LoginValidation = data => {
  if (!data?.email || !data?.password) {
    showErrorToast('👋 Please enter correct data!');
    return true;
  }
};

export const SignupValidation = data => {
  if (!data.name || !data.name.trim()) {
    showErrorToast('👋 Please enter your name!');
    return true;
  } else if (!data.email || !emailRegex.test(data.email)) {
    showErrorToast('👋 Please enter a valid email adderss!');
    return true;
  } else if (!data.mobile || !phoneNumberRegex.test(data.mobile)) {
    showErrorToast('👋 Please enter a valid mobile number!');
    return true;
  } else if (!data.password.trim() || !passwordRegex.test(data.password)) {
    showErrorToast('👋 Minimum 6 digit password is required!');
    return true;
  } else if (data.password !== data.confirmPassword) {
    showErrorToast('👋 Password not matching!');
    return true;
  }
};

export const TaskValidation = data => {
  if (!data.title || !data.title.trim()) {
    showErrorToast('👋 Please enter a task!');
    return true;
  } else if (!data.description || !data.description.trim()) {
    showErrorToast('👋 Please enter a description!');
    return true;
  }
};
