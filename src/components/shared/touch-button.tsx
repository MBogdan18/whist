import React from 'react';
import { Button, ButtonProps } from 'react-native';

export interface TouchButtonProps extends ButtonProps {}

export const TouchButton = (props: TouchButtonProps) => {
  return (
    <Button onPress={() => console.log('touched 2')} {...props} />
  );
};
