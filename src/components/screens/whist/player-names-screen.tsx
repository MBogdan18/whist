import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../../state/app.provider.tsx';
import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { useConfirmOnLeave } from '../../../hooks/use-confirm-leave.tsx';
import { PlayerScore } from '../../../state/state.ts';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';
import { IconButton } from '../../shared/icon-button.tsx';
import { ControlButtons } from '../../shared/control-buttons.tsx';

export const PlayerNamesScreen = (props: BaseScreenProps) => {
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

    navigation.navigate(ScreensEnum.PLAYER_SCORES_SCREEN);
  };

  const haveAllNamesBeenEntered = useMemo(() => {
    return playerNames.length === numberOfPlayers;
  }, [playerNames, numberOfPlayers]);

  if (!numberOfPlayers) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.playerNameContainer}>
        {!haveAllNamesBeenEntered && (
          <View style={styles.playerNameSubContainer}>
            <Text style={styles.title}>Enter the name of player {playerIndex + 1}</Text>
            <View style={styles.playerNameInputContainer}>
              <TextInput style={styles.playerNameInput} value={currentPlayerName} onChangeText={setCurrentPlayerName} />
              <IconButton name={'plus'} disabled={isAddDisabled} onPress={() => handleAddPlayer()} />
            </View>
          </View>
        )}
        <View style={styles.playerNameButtonsContainer}>
          {playerNames.map((playerName) => (
            <View style={styles.playerNameButton} key={playerName}>
              <Button color={'lightgreen'} title={playerName} />
            </View>
          ))}
        </View>
      </View>

      <ControlButtons forwardDisabled={!haveAllNamesBeenEntered}
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
  },
  playerNameContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17%',
    width: '100%'
  },
  playerNameSubContainer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  playerNameInputContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playerNameInput: {
    height: 50,
    width: '25%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: 'monospace',
    fontSize: 18
  },
  playerNameButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8
  },
  playerNameButton: {
    minWidth: 100,
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 18
  }
});
