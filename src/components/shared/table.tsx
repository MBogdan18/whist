import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMemo } from 'react';
import { PlayerScore, RoundData } from '../../state/state.ts';
import React from 'react';

export interface CustomTableProps {
  readonly numberOfPlayers: number | null;
  readonly playerNames: string[];
  readonly playerScores: PlayerScore[];
  readonly currentRound: RoundData;
}

export const CustomTable = (props: CustomTableProps) => {
  const { numberOfPlayers, playerNames, playerScores, currentRound } = props;

  const screenWidth = Dimensions.get('window').width;

  const col1Width = 30;

  const remainingWidth = useMemo(() => {
    if (!numberOfPlayers) {
      return 0;
    }

    return (screenWidth - col1Width - 32) / numberOfPlayers;
  }, [screenWidth, col1Width, numberOfPlayers]);

  return (
    <View style={styles.container}>
      {/*Header*/}
      <View style={styles.headerContainer}>
        <View style={{...styles.headerCell, width: col1Width }} />
        {playerNames.map((name, index) => (
          <View key={name} style={{ ...styles.headerCell, width: remainingWidth, borderRightWidth: index === playerNames.length - 1 ? 0 : 1 }}>
            <Text style={styles.cell}>{name}</Text>
          </View>
        ))}
      </View>

      {/*Body*/}
      <ScrollView>
        <View style={styles.bodyContainer}>
            {playerScores.map((score, rowIndex) => {
              return (
                <View key={`${score}-${rowIndex}`} style={{...styles.bodyRow, borderBottomWidth: rowIndex === playerScores.length - 1 ? 0 : 1, backgroundColor: rowIndex === currentRound.roundNumber ? 'lightgrey' : 'white'}}>
                  <View style={{ ...styles.bodyCell, width: col1Width }}>
                    <Text style={styles.cell}>{score.cardsNumber}</Text>
                  </View>
                  {score.scores.map((individualScore, playerIndex) => {
                    const cumulativeScore = playerScores
                      .slice(0, rowIndex + 1) // all rounds up to current
                      .reduce((sum, round) => {
                        const s = round.scores[playerIndex]?.score ?? 0;
                        return sum + s;
                      }, 0);

                    return (
                      <React.Fragment key={`${individualScore.key}`}>
                        <View style={{ ...styles.bodyCell, width: col1Width, backgroundColor: individualScore.result === null ? 'white' : individualScore.bid === individualScore.result ? 'lightgreen' : 'red' }}>
                          <Text style={{...styles.cell}}>
                            {individualScore.bid !== null ? individualScore.bid : ''}
                          </Text>
                        </View>
                        <View style={{ ...styles.bodyCell, width: remainingWidth - 30, borderRightWidth: playerIndex === score.scores.length - 1 ? 0 : 1 }}>
                          <Text style={styles.cell}>{currentRound.roundNumber > rowIndex ? cumulativeScore : ''}</Text>
                        </View>
                      </React.Fragment>
                    );
                  })}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 30
  },
  headerCell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  bodyRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: 30,
  },
  bodyCell: {
    borderRightWidth: 1,
    justifyContent: 'center'
  },
  cell: {
    textAlign: 'center'
  },
});
