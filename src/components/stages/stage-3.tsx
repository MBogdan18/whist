import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../state/app.provider.tsx';
import { BaseScreenProps } from '../../models/base-screen-props.ts';
import { useConfirmOnLeave } from '../../hooks/use-confirm-leave.tsx';
import { PlayerScore } from '../../state/state.ts';

export const Stage3 = (props: BaseScreenProps) => {
  useConfirmOnLeave();

  const { navigation } = props;

  const { state, setState } = useContext(AppContext);

  const numberOfPlayers = state.numberOfPlayers;

  const [playerIndex, setPlayerIndex] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('');

  const isAddDisabled = useMemo(() => {
    return currentPlayerName === '' || playerNames.indexOf(currentPlayerName) !== -1;
  }, [playerNames, currentPlayerName]);

  const handleAddPlayer = () => {
    setPlayerNames((prevPlayerNames) => ([...prevPlayerNames, currentPlayerName]));
    setPlayerIndex((prevIndex) => prevIndex + 1);
    setCurrentPlayerName('');
  };

  const handleBack = () => {
    navigation.navigate('Stage2');
  };

  const handleConfirm = () => {
    if (!state.numberOfPlayers) {
      return;
    }

    const staticCardGroup = [7, 6, 5, 4, 3, 2];
    const reverseStaticCardGroup = [...[...staticCardGroup].reverse()];

    const dynamicCardGroup = Array.from(new Array(state.numberOfPlayers));

    const groupOfEights = dynamicCardGroup.map(() => 8);
    const groupOfOnes = dynamicCardGroup.map(() => 1);

    const finalGrouping = [...groupOfEights, ...staticCardGroup, ...groupOfOnes, ...reverseStaticCardGroup, ...groupOfEights];

    const initialPlayerScores: PlayerScore[] = finalGrouping.map((entry, index) => ({
      cardsNumber: entry,
      scores: dynamicCardGroup.map((_, index2) => ({
        playerName: playerNames[index2],
        key: `${index}-${index2}-key`,
        bid: null,
        result: null,
        score: 0,
      }))
    }));

    setState((prevState) => ({
      ...prevState,
      playerNames: playerNames,
      playerScores: initialPlayerScores,
      cardRounds: finalGrouping
    }));

    navigation.navigate('Stage4');
  };

  const isConfirmDisabled = useMemo(() => {
    return playerNames.length !== numberOfPlayers;
  }, [playerNames, numberOfPlayers]);

  if (!numberOfPlayers) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.playerNameContainer}>
        <Text>Enter the name of player {playerIndex + 1}</Text>
        <TextInput style={styles.playerNameInput} value={currentPlayerName} onChangeText={setCurrentPlayerName} />
        <View style={styles.button}>
          <Button title="Add" disabled={isAddDisabled} onPress={() => handleAddPlayer()} />
        </View>
        {playerNames.map((playerName) => (
          <View key={playerName}>
            <Text>{playerName}</Text>
          </View>
        ))}
      </View>

      <View style={styles.controlButtonsContainer}>
        <View style={styles.button}>
          <Button title="Back" onPress={handleBack} />
        </View>
        <View style={styles.button}>
          <Button disabled={isConfirmDisabled} title="Next" onPress={handleConfirm} />
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
  },
  playerNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17.5%',
    width: '100%'
  },
  playerNameInput: {
    height: 40,
    width: '25%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  controlButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: '7.5%'
  },
  button: {
    width: 128,
  },
});
