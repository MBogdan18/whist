import { Button, StyleSheet, Text, View } from 'react-native';
import { useConfirmOnLeave } from '../../hooks/use-confirm-leave.tsx';
import { useContext, useEffect, useState } from 'react';
import { BaseScreenProps } from '../../models/base-screen-props.ts';
import { AppContext } from '../../state/app.provider.tsx';

export const Stage2 = (props: BaseScreenProps) => {
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

    navigation.navigate('Stage3');
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberOfPlayersContainer}>
        <Text>Number of Players</Text>
        <View style={styles.numberOfPlayersButtonsContainer}>
          {allowedNumberOfPlayers.map((players) => (
            <View key={players.toString()} style={styles.numberOfPlayersButton}>
              <Button color={numberOfPlayers === players ? 'lightgreen' : undefined}
                      title={players.toString()}
                      onPress={() => setNumberOfPlayers(players)} />
            </View>
          ))}
        </View>
      </View>
      <View style={styles.controlButtonsContainer}>
        <View style={styles.controlButton}>
          <Button title="Back" onPress={() => navigation.navigate('Stage1')} />
        </View>
        <View style={styles.controlButton}>
          <Button disabled={!numberOfPlayers} title="Next" onPress={handleConfirm} />
        </View>
      </View>
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
    // backgroundColor: 'red',
  },
  numberOfPlayersContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17.5%',
    gap: 16,
    // backgroundColor: 'blue',
  },
  numberOfPlayersButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 64,
  },
  numberOfPlayersButton: {
    width: 40,
  },
  controlButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: '7.5%',
    // backgroundColor: 'green',
  },
  controlButton: {
    width: 128,
  },
});
