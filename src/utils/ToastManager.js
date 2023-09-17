import Toast from 'react-native-toast-message';

export default function showToast(message, desc, type, duration = 2700) {
  Toast.show({
    type: type,
    visibilityTime: duration,
    position: 'top',
    text1: message,
    autoHide: true,
    text2: desc,
  });
}
export function showErrorToast(message, desc, position) {
  showToast(message, desc, 'error', position);
}
export function showSuccessToast(message, desc, position) {
  showToast(message, desc, 'success', position);
}
export function showInfoToast(message, desc, position) {
  showToast(message, desc, 'error', position);
}
