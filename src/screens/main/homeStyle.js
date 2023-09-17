const {StyleSheet} = require('react-native');
const {
  PrimaryBold,
  ButtonColor,
  TertiaryColor,
  PrimaryMedium,
} = require('../../theme');

export const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1,
  },
  appNameText: {
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
    fontSize: 24,
    fontFamily: PrimaryBold,
    color: '#fff',
  },
  textIconContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  linearStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(13,13,13,0.3)',
    paddingHorizontal: 25,
    zIndex: 0,
  },
  btnContainerStyle: {
    marginBottom: 30,
    marginTop: 30,
    zIndex: 0,
  },
  cardContainer: {
    marginBottom: 100,
    padding: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: PrimaryBold,
    textAlign: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: PrimaryMedium,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: '#fefefe',
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: TertiaryColor,
  },
  buttonText: {
    fontSize: 15,
    color: ButtonColor,
    fontFamily: PrimaryBold,
  },
  selectedButtonText: {
    color: 'white',
  },
});
