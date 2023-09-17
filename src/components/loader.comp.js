import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {ButtonColor} from '../theme';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const Loader = ({loading}) => {
  return loading ? (
    <ActivityIndicator
      size="large"
      color={ButtonColor}
      style={styles.container}
    />
  ) : null;
};

export default Loader;
const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    position: 'absolute',
    // backgroundColor: '#fff' + 90,
    backgroundColor: 'transparent',

    zIndex: 1,
  },
});
