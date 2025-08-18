import React, { useContext } from 'react';
import { AppContext } from '../../state/app.provider.tsx';
import { CustomTable } from '../shared/table.tsx';
import { Button, Dimensions, StyleSheet, View } from 'react-native';
import { BaseScreenProps } from '../../models/base-screen-props.ts';

export const Stage4 = (props: BaseScreenProps) => {
  const { navigation } = props;

  const { state } = useContext(AppContext);

  const height = Dimensions.get('window').height;

  const renderButtons = () => {
    if (state.currentRoundData.roundNumber > 2) {
      return <Button onPress={() => navigation.navigate('Stage7')} title={'Placements'} />;
    } else {
      if (state.currentRoundData.roundStep === 'bidding') {
        return <Button onPress={() => navigation.navigate('Stage5')} title={'Bid'} />;
      } else if (state.currentRoundData.roundStep === 'results') {
        return <Button onPress={() => navigation.navigate('Stage6')} title={'Results'} />;
      }
    }
  };

  return (
    <View style={{ ...styles.container, height: height - 32 }}>
      <CustomTable numberOfPlayers={state.numberOfPlayers}
                   playerNames={state.playerNames}
                   playerScores={state.playerScores}
                   currentRound={state.currentRoundData}
      />

      <View style={styles.buttonsContainer}>
        {renderButtons()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    gap: 16
  },
});
