import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../../state/app.provider.tsx';
import { StyleSheet, Text, View } from 'react-native';
import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';
import { FontAwesome6SolidIconName } from '@react-native-vector-icons/fontawesome6';
import { IconButton } from '../../shared/icon-button.tsx';
import { ControlButtons } from '../../shared/control-buttons.tsx';

export const PlayerBiddingResultsScreen = (props: BaseScreenProps) => {
  const { navigation } = props;

  const { state, setState } = useContext(AppContext);

  const playerNames = useMemo(() => {
    return [
      ...state.playerNames.slice(state.startingPlayerIndex),
      ...state.playerNames.slice(0, state.startingPlayerIndex)
    ];
  }, [state.playerNames, state.startingPlayerIndex]);

  const initialSelectedOption = useMemo(() => {
    const scores = state.playerScores[state.currentRoundData.roundNumber].scores;

    const playerScore = scores.find((score) => score.playerName === playerNames[0]);

    return playerScore ? playerScore.bid : null;
  }, [playerNames, state.currentRoundData.roundNumber, state.playerScores]);

  const [selectedOption, setSelectedOption] = useState<number | null>(initialSelectedOption);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const possibleOptions = useMemo(() => {
    const possibilities = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const currentRoundCards = state.cardRounds[state.currentRoundData.roundNumber];

    return possibilities.filter((value) => value <= currentRoundCards);
  }, [state.cardRounds, state.currentRoundData]);



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
              const baseScore = 5;

              let roundScore;

              if (selectedOption === scores.bid) {
                roundScore = baseScore + scores.bid!;
              } else {
                roundScore = 0 - Math.abs(selectedOption! - scores.bid!);
              }

              return {
                ...scores,
                result: selectedOption,
                score: roundScore
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



    if (currentPlayerIndex === currentPlayers - 1) {
      setCurrentPlayerIndex(0);
      setSelectedOption(null);

      setState((prevState) => ({
        ...prevState,
        startingPlayerIndex: prevState.startingPlayerIndex + 1 <= prevState.playerNames.length ? prevState.startingPlayerIndex + 1 : 0,
        currentRoundData: {
          ...prevState.currentRoundData,
          roundNumber: prevState.currentRoundData.roundNumber + 1,
          roundStep: 'bidding'
        }
      }));

      navigation.navigate(ScreensEnum.PLAYER_SCORES_SCREEN);
    } else {
      const scores = state.playerScores[state.currentRoundData.roundNumber].scores;

      const playerScore = scores.find((score) => score.playerName === playerNames[currentPlayerIndex + 1]);

      setSelectedOption(playerScore ? playerScore.bid : null);
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

    const results = state.playerScores[state.currentRoundData.roundNumber].scores.filter((scores) => scores.result !== null).map((scores) => scores.result as number);

    const summedUpResults = results.reduce((prev, curr) => prev + curr, 0);

    const currentRoundCards = state.cardRounds[state.currentRoundData.roundNumber];

    return currentRoundCards - summedUpResults !== option;
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
    justifyContent: 'center',
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
