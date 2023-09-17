import React from 'react';
import {Button} from '@rneui/themed';
import {ButtonColor, PrimaryBold, TextSecondaryColor} from '../theme';
import {StyleSheet} from 'react-native';

const CustomButton = ({
  title,
  containerStyle,
  buttonStyle,
  titleStyle,
  disabledStyle,
  onPress,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      title={title}
      containerStyle={[styles.containerStyle, containerStyle]}
      buttonStyle={[styles.buttonStyle, buttonStyle]}
      titleStyle={[styles.titleStyle, titleStyle]}
      diasabledStyle={[styles.diasabledStyle, disabledStyle]}
      raised={true}
      size="lg"
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: ButtonColor,
  },
  buttonStyle: {
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: ButtonColor,
  },
  titleStyle: {
    fontFamily: PrimaryBold,
    fontSize: 16,
  },
  disabledStyle: {
    backgroundColor: TextSecondaryColor,
  },
});

export default CustomButton;
