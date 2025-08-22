import React from 'react';
import { TouchableOpacity, StyleSheet, type TextStyle } from 'react-native';
import Icon, { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';

interface IconButtonProps {
  readonly name: FontAwesome6SolidIconName;
  readonly size?: number;
  readonly iconColor?: TextStyle['color'];
  readonly disabled?: boolean;
  readonly color?: TextStyle['color'];
  readonly onPress: () => void;
}

export const IconButton = (props: IconButtonProps) => {
  const buttonStyle = props.disabled ? styles.disabledButton : {
    ...styles.button,
    backgroundColor: props.color ? props.color : styles.button.backgroundColor
  };

  return (
    <TouchableOpacity style={buttonStyle} disabled={props.disabled} onPress={props.onPress}>
      <Icon iconStyle={'solid'} name={props.name} size={props.size || 20} color={props.iconColor || 'white'} style={{  }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
