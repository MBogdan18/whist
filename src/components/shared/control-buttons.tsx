import { IconButton } from './icon-button.tsx';
import { StyleSheet, View } from 'react-native';
import { BaseScreenProps } from '../../models/base-screen-props.ts';

interface ControlButtonsProps extends BaseScreenProps {
  readonly forwardDisabled?: boolean;
  readonly handleForward: () => void;
}

export const ControlButtons = (props: ControlButtonsProps) => {
  const handleBack = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    }
  };

  return (
    <View style={styles.controlButtonsContainer}>
      <IconButton name={'angle-left'} onPress={handleBack} />
      <IconButton name={'angle-right'} disabled={props.forwardDisabled} onPress={props.handleForward} />
    </View>
  );
};

const styles = StyleSheet.create({
  controlButtonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginBottom: '7.5%',
  },
});
