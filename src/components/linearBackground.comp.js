import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryColor, SecondaryColor, TertiaryColor} from '../theme';

const LinearBackground = ({children, style}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      colors={[PrimaryColor, SecondaryColor, TertiaryColor]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LinearBackground;
