import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseScreenProps } from '../../models/base-screen-props.ts';
import { AppContext } from '../../state/app.provider.tsx';
import { defaultState } from '../../state/state.ts';
import { ScreensEnum } from '../../shared/enums/screens.enum.ts';
import { IconButton } from '../shared/icon-button.tsx';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import packageJson from '../../../package.json';

export const HomeScreen = (props: BaseScreenProps) => {
  useEffect(() => {
    hideNavigationBar();
  }, []);

  const { navigation } = props;

  const { setState } = useContext(AppContext);

  const handlePlay = () => {
    setState(defaultState);

    navigation.navigate(ScreensEnum.PLAYER_AMOUNT_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <IconButton name={'gear'} onPress={() => navigation.navigate(ScreensEnum.SETTINGS_SCREEN)} />
        <IconButton name={'play'} onPress={handlePlay} />
        <IconButton name={'scroll'} onPress={() => navigation.navigate(ScreensEnum.HISTORY_SCREEN)} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>v{packageJson.version}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '2.5%'
  },
  textContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: '2.5%',
    marginRight: '2.5%',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'lightgrey'
  },
});
