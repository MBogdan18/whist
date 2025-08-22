import { StyleSheet, Text, View } from 'react-native';

export const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>UNDER CONSTRUCTION</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    transform: [{ rotate: '-45deg' }],
    fontSize: 26,
    color: 'lightgrey'
  },
});
