import React, { useContext } from 'react';
import { AppContext } from '../../../state/app.provider.tsx';
import { CustomTable } from '../../shared/table.tsx';
import { Dimensions, StyleSheet, View } from 'react-native';
import { BaseScreenProps } from '../../../models/base-screen-props.ts';
import { ScreensEnum } from '../../../shared/enums/screens.enum.ts';
import { IconButton } from '../../shared/icon-button.tsx';

export const PlayerScoresScreen = (props: BaseScreenProps) => {
  const { navigation } = props;

  const { state } = useContext(AppContext);

  const height = Dimensions.get('window').height;

  const renderButtons = () => {
    if (state.currentRoundData.roundNumber > 2) {
      return <IconButton name={'medal'} onPress={() => navigation.navigate(ScreensEnum.PLAYER_RANKING_SCREEN)} />;
    } else {
      if (state.currentRoundData.roundStep === 'bidding') {
        return <IconButton name={'gavel'} onPress={() => navigation.navigate(ScreensEnum.PLAYER_BIDDING_SCREEN)} />;
      } else if (state.currentRoundData.roundStep === 'results') {
        return <IconButton name={'equals'} onPress={() => navigation.navigate(ScreensEnum.PLAYER_BIDDING_RESULTS_SCREEN)} />;
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
