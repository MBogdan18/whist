import { BaseScreenProps } from '../../models/base-screen-props.ts';
import { StyleSheet, Text, View } from 'react-native';
import { useContext, useMemo } from 'react';
import { AppContext } from '../../state/app.provider.tsx';

export const Stage7 = (_: BaseScreenProps) => {
  const { state } = useContext(AppContext);

  const playerRanking = useMemo(() => {
    const scores = state.playerScores.map((playerScores) => playerScores.scores);

    const flattenedScores = scores.flat();

    const ranking: Record<string, number> = flattenedScores.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.playerName]: prev[curr.playerName] !== undefined ? curr.score !== null ? prev[curr.playerName] + curr.score : prev[curr.playerName] : curr.score,
      };
    }, {} as Record<string, number>);

    return Object.entries(ranking).sort((a, b) => b[1] - a[1]);
  }, [state.playerScores]);

  return (
    <View style={styles.container}>
      {playerRanking.map(([name, score]) => (
        <Text key={name}>
          {name}: {score}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
