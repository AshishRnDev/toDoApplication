import {StyleSheet} from 'react-native';
import {
  PrimaryFont,
  PrimaryLight,
  PrimaryMedium,
  TertiaryColor,
} from '../theme';

export const styles = StyleSheet.create({
  rightButtonStyle: {
    minHeight: '100%',
    maxWidth: '100%',
    backgroundColor: 'white',
  },
  checkContainerStyle: {
    backgroundColor: 'transparent',
  },
  buttonContainerStyle: {
    borderRadius: 20,
  },
  leftButtonStyle: {
    minHeight: '100%',
    maxWidth: '100%',
    backgroundColor: 'white',
  },
  height: {
    height: 20,
  },

  swipeContainerStyle: {
    borderRadius: 20,
    padding: 0,
    backgroundColor: TertiaryColor,
    justifyContent: 'flex-start',
  },
  taskContainer: {
    flex: 1,
  },
  taskTitleContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  avatarContainerStyle: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    position: 'absolute',
    right: 20,
    top: 20,
  },

  taskStyle: {
    fontFamily: PrimaryMedium,
    fontSize: 16,
    color: '#fff',
    flex: 1,
    // width: '80%',
  },
  editStyle: {
    fontFamily: PrimaryMedium,
    fontSize: 14,
    color: '#fff',
  },
  taskDescriptionStyle: {
    fontFamily: PrimaryLight,
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  border: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginTop: 15,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  altText: {
    fontFamily: PrimaryLight,
    fontSize: 14,
    color: '#fff',
  },
  timeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: PrimaryFont,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: PrimaryLight,
    marginLeft: 10,
  },
});
