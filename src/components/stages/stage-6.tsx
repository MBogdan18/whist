import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../state/app.provider.tsx';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BaseScreenProps } from '../../models/base-screen-props.ts';

export const Stage6 = (props: BaseScreenProps) => {
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

      navigation.navigate('Stage4');
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
      <Text>{playerNames[currentPlayerIndex]}</Text>

      <View style={styles.optionsContainer}>
        {possibleOptions.map((option) => (
          <View key={option.toString()} style={styles.optionButton}>
            <Button key={option}
                    disabled={isOptionDisabled(option)}
                    color={selectedOption === option ? 'lightgreen' : undefined}
                    title={option.toString()}
                    onPress={() => setSelectedOption(option)}
            />
          </View>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <Button disabled={selectedOption === null} title={'Next'} onPress={handleNext} />
      </View>
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
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  optionButton: {
    width: 40,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
