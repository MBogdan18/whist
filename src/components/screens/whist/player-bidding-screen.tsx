import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { StyleSheet, Text, View } from 'react-native';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../../state/app.provider.tsx';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';
import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';
import { IconButton } from '../../shared/icon-button.tsx';
import { ControlButtons } from '../../shared/control-buttons.tsx';

export const PlayerBiddingScreen = (props: BaseScreenProps) => {
  const { navigation } = props;

  const { state, setState } = useContext(AppContext);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const possibleOptions = useMemo(() => {
    const possibilities = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const currentRoundCards = state.cardRounds[state.currentRoundData.roundNumber];

    return possibilities.filter((value) => value <= currentRoundCards);
  }, [state.cardRounds, state.currentRoundData]);

  const playerNames = useMemo(() => {
    return [
      ...state.playerNames.slice(state.startingPlayerIndex),
      ...state.playerNames.slice(0, state.startingPlayerIndex)
    ];
  }, [state.playerNames, state.startingPlayerIndex]);

  const handleNext = () => {
    const currentPlayers = state.numberOfPlayers;

    if (!currentPlayers) {
      return;
    }

    setState((prevState) => {
      const newPlayerScores = state.playerScores.map((score, roundIndex) => {
        if (roundIndex === prevState.currentRoundData.roundNumber) {
          const newScores = score.scores.map((scores) => {
            if (scores.playerName === playerNames[currentPlayerIndex]) {
              return {
                ...scores,
                bid: selectedOption
              };
            }

            return scores;
          });

          return {
            ...score,
            scores: newScores
          };
        }

        return score;
      })

      return {
        ...prevState,
        playerScores: newPlayerScores
      };
    });

    setSelectedOption(null);

    if (currentPlayerIndex === currentPlayers - 1) {
      setCurrentPlayerIndex(0);

      setState((prevState) => ({
        ...prevState,
        currentRoundData: {
          ...prevState.currentRoundData,
          roundStep: 'results'
        }
      }));

      navigation.navigate(ScreensEnum.PLAYER_SCORES_SCREEN);
    } else {
      setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isOptionDisabled = (option: number) => {
    const currentPlayers = state.numberOfPlayers;

    if (!currentPlayers) {
      return false;
    }

    if (currentPlayerIndex !== currentPlayers - 1) {
      return false;
    }

    const bids = state.playerScores[state.currentRoundData.roundNumber].scores.filter((scores) => scores.bid !== null).map((scores) => scores.bid as number);

    const summedUpBids = bids.reduce((prev, curr) => prev + curr, 0);

    const currentRoundCards = state.cardRounds[state.currentRoundData.roundNumber];

    return currentRoundCards - summedUpBids === option;
  };

  return (
    <View style={styles.container}>
      <View style={styles.biddingContainer}>
        <Text style={styles.title}>{playerNames[currentPlayerIndex]}</Text>
        <View style={styles.optionsContainer}>
          {possibleOptions.map((option) => (
            <IconButton key={option.toString()}
                        disabled={isOptionDisabled(option)}
                        color={selectedOption === option ? 'lightgreen' : undefined}
                        name={option.toString() as FontAwesome6SolidIconName}
                        onPress={() => setSelectedOption(option)} />
          ))}
        </View>
      </View>

      <ControlButtons navigation={props.navigation}
                      forwardDisabled={selectedOption === null}
                      handleForward={handleNext} />
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
    gap: 16,
  },
  biddingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17.5%',
    gap: 16,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  title: {
    fontFamily: 'monospace',
    fontSize: 18
  }
});
