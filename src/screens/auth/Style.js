import {StyleSheet} from 'react-native';
import {
  PrimaryBold,
  PrimaryFont,
  PrimaryMedium,
  TextSecondaryColor,
} from '../../theme';

export const styles = StyleSheet.create({
  scrollStyle: {
    flexGrow: 1,
  },
  welcomeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: PrimaryBold,
    marginTop: 20,
  },
  timingText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: PrimaryFont,
    marginTop: 10,
  },
  inputButtonContainer: {
    marginTop: 70,
    paddingHorizontal: 10,
  },
  labelText: {
    color: '#fff',
    marginLeft: 13,
    marginVertical: 3,
    fontFamily: PrimaryFont,
    fontSize: 17,
  },
  touchable: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50,
  },
  dontText: {
    color: '#fff',
    fontFamily: PrimaryFont,
    fontSize: 16,
  },
  regText: {
    color: TextSecondaryColor,
    fontSize: 16,
    fontFamily: PrimaryMedium,
  },
});
