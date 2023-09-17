const {StyleSheet} = require('react-native');
const {
  PrimaryColor,
  PrimarySemiBold,
  PrimaryFont,
  TertiaryColor,
} = require('../../theme');
const {WINDOW_WIDTH} = require('../../components/loader.comp');

export const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: PrimaryColor,
    zIndex: 1,
    flex: 1,
  },
  newTask: {
    color: '#fff',
    fontSize: 24,
    fontFamily: PrimarySemiBold,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: '#fff',
    marginHorizontal: 25,
    marginVertical: 20,
  },
  labelText: {
    color: '#fff',
    marginLeft: 13,
    marginVertical: 4,
    fontFamily: PrimaryFont,
    fontSize: 17,
  },
  checkContainerStyle: {
    backgroundColor: 'transparent',
  },
  btnContainerStyle: {
    width: WINDOW_WIDTH / 2.3,
  },
  cancelButtonStyle: {
    backgroundColor: PrimaryColor,
    borderWidth: 1,
    borderColor: TertiaryColor,
  },
  createButtonStyle: {
    backgroundColor: TertiaryColor,
    borderWidth: 1,
    borderColor: TertiaryColor,
  },
  keycontainer: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
});
