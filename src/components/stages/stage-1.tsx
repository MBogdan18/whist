import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { BaseScreenProps } from '../../models/base-screen-props.ts';
import { AppContext } from '../../state/app.provider.tsx';
import { defaultState } from '../../state/state.ts';

export const Stage1 = (props: BaseScreenProps) => {
  const { navigation } = props;

  const { setState } = useContext(AppContext);

  const handlePlay = () => {
    setState(defaultState);

    navigation.navigate('Stage2');
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Settings" onPress={() => navigation.navigate('')} />
      </View>
      <View style={styles.button}>
        <Button title="Play" onPress={handlePlay} />
      </View>
      <View style={styles.button}>
        <Button title="History" onPress={() => navigation.navigate("Stage7")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: '7.5%'
  },
  button: {
    width: 100
  },
});
