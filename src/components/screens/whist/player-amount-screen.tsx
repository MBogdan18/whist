import { StyleSheet, Text, View } from 'react-native';
import { useConfirmOnLeave } from '../../../hooks/use-confirm-leave.tsx';
import { useContext, useEffect, useState } from 'react';
import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { AppContext } from '../../../state/app.provider.tsx';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';
import { ControlButtons } from '../../shared/control-buttons.tsx';
import { IconButton } from '../../shared/icon-button.tsx';
import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';

export const PlayerAmountScreen = (props: BaseScreenProps) => {
  useConfirmOnLeave();

  const [numberOfPlayers, setNumberOfPlayers] = useState<number | null>(null);

  const { state, setState } = useContext(AppContext);

  useEffect(() => {
    setNumberOfPlayers(state.numberOfPlayers);
  }, [state.numberOfPlayers]);

  const { navigation } = props;

  const allowedNumberOfPlayers = [2, 3, 4, 5, 6];

  const handleConfirm = () => {
    setState((prevState) => ({
      ...prevState,
      numberOfPlayers: numberOfPlayers
    }));

    navigation.navigate(ScreensEnum.PLAYER_NAMES_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberOfPlayersContainer}>
        <Text style={styles.title}>Number of Players</Text>
        <View style={styles.numberOfPlayersButtonsContainer}>
          {allowedNumberOfPlayers.map((players) => (
            <IconButton key={players.toString()}
                        color={numberOfPlayers === players ? 'lightgreen' : undefined}
                        name={players.toString() as FontAwesome6SolidIconName}
                        onPress={() => setNumberOfPlayers(players)} />
          ))}
        </View>
      </View>
      <ControlButtons forwardDisabled={!numberOfPlayers}
                      handleForward={handleConfirm}
                      navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  numberOfPlayersContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17.5%',
    gap: 16,
  },
  numberOfPlayersButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 64,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 18
  }
});
