import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { StyleSheet, Text, View } from 'react-native';
import { useContext, useMemo } from 'react';
import { AppContext } from '../../../state/app.provider.tsx';
import { useConfirmOnLeave } from '../../../hooks/use-confirm-leave.tsx';
import { IconButton } from '../../shared/icon-button.tsx';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';

export const PlayerRankingScreen = (props: BaseScreenProps) => {
  useConfirmOnLeave();

  const { navigation } = props;

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
      <View style={styles.playersContainer}>
        {playerRanking.map(([name, score]) => (
          <Text key={name}>
            {name}: {score}
          </Text>
        ))}
      </View>

      <View style={styles.controlButtonsContainer}>
        <IconButton name={'house'} onPress={() => navigation.navigate(ScreensEnum.HOME_SCREEN)} />
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
    alignItems: 'center'
  },
  playersContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17.5%'
  },
  controlButtonsContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginBottom: '7.5%'
  },
});
