import {View, StyleSheet} from 'react-native';
import React from 'react';

const BaseView = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default BaseView;
