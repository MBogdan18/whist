import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/state/app.provider.tsx';
import { HomeScreen } from './src/components/screens/home-screen.tsx';
import { SettingsScreen } from './src/components/screens/settings-screen.tsx';
import { HistoryScreen } from './src/components/screens/history-screen.tsx';
import { PlayerAmountScreen } from './src/components/screens/whist/player-amount-screen.tsx';
import { PlayerNamesScreen } from './src/components/screens/whist/player-names-screen.tsx';
import { PlayerScoresScreen } from './src/components/screens/whist/player-scores-screen.tsx';
import { PlayerBiddingScreen } from './src/components/screens/whist/player-bidding-screen.tsx';
import { PlayerBiddingResultsScreen } from './src/components/screens/whist/player-bidding-results-screen.tsx';
import { PlayerRankingScreen } from './src/components/screens/whist/player-ranking-screen.tsx';
import { ScreensEnum } from './src/shared/enums/screens.enum.ts';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator initialRouteName={ScreensEnum.HOME_SCREEN} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={ScreensEnum.HOME_SCREEN} component={HomeScreen} />
          <Stack.Screen name={ScreensEnum.SETTINGS_SCREEN} component={SettingsScreen} />
          <Stack.Screen name={ScreensEnum.HISTORY_SCREEN} component={HistoryScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_AMOUNT_SCREEN} component={PlayerAmountScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_NAMES_SCREEN} component={PlayerNamesScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_SCORES_SCREEN} component={PlayerScoresScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_BIDDING_SCREEN} component={PlayerBiddingScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_BIDDING_RESULTS_SCREEN} component={PlayerBiddingResultsScreen} />
          <Stack.Screen name={ScreensEnum.PLAYER_RANKING_SCREEN} component={PlayerRankingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
