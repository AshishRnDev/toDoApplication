import React, {memo, useState} from 'react';
import {Input} from '@rneui/themed';
import {
  ButtonColor,
  PrimaryColor,
  PrimaryFont,
  TextSecondaryColor,
} from '../theme';

const CustomInput = props => {
  const [focused, setFocused] = useState(false);
  const [showPasswordText, togglePasswordText] = useState(false);

  const onFocus = () => {
    setFocused(true);
    props?.onFocus();
  };

  const onBlur = () => {
    setFocused(false);
    props?.onBlur();
  };

  const inputContainerStyle = {
    ...props?.inputContainerStyle,
    ...{
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 10,
    },
    ...(focused ? {borderColor: ButtonColor} : {borderColor: 'transparent'}),
  };

  const labelStyle = {
    ...props?.labelStyle,
    ...(focused ? {color: PrimaryColor} : {}),
  };
  const inputStyle = {
    ...props?.inputStyle,
    ...{
      color: '#000',
      fontFamily: PrimaryFont,
      fontSize: 14,
      paddingLeft: 5,
    },
  };

  const leftIcon = {
    ...props?.leftIcon,
    ...(focused ? {color: PrimaryColor} : {}),
  };

  let rightIcon = {
    ...props?.rightIcon,
    ...(focused ? {color: ButtonColor} : {color: TextSecondaryColor}),
  };

  if (props?.password) {
    let passwordToggler = {
      type: 'ionicon',
      name: showPasswordText ? 'eye' : 'eye-off',
      onPress: () => togglePasswordText(!showPasswordText),
      containerStyle: {marginRight: 10},
      underlayColor: 'transparent',
    };

    rightIcon = {
      ...rightIcon,
      ...passwordToggler,
    };
  }

  return (
    <Input
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      inputStyle={inputStyle}
      inputContainerStyle={inputContainerStyle}
      labelStyle={labelStyle}
      password={showPasswordText ? false : true}
      secureTextEntry={
        props?.password ? (showPasswordText ? false : true) : false
      }
    />
  );
};

CustomInput.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
  password: false,
};

export default memo(CustomInput);
