import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { Stage1 } from './src/components/stages/stage-1.tsx';
import { Stage2 } from './src/components/stages/stage-2.tsx';
import { Stage3 } from './src/components/stages/stage-3.tsx';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/state/app.provider.tsx';
import { Stage4 } from './src/components/stages/stage-4.tsx';
import { Stage5 } from './src/components/stages/stage-5.tsx';
import { Stage6 } from './src/components/stages/stage-6.tsx';
import { Stage7 } from './src/components/stages/stage-7.tsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator initialRouteName="Stage1" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Stage1" component={Stage1} />
          <Stack.Screen name="Stage2" component={Stage2} />
          <Stack.Screen name="Stage3" component={Stage3} />
          <Stack.Screen name="Stage4" component={Stage4} />
          <Stack.Screen name="Stage5" component={Stage5} />
          <Stack.Screen name="Stage6" component={Stage6} />
          <Stack.Screen name="Stage7" component={Stage7} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
