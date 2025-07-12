
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // ✅ Add this
import './global.css';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  
//   useEffect(() => {
//     initDB(); // Initialize the database when the app starts
// }, []);

  if (!loaded) return null;


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="article/[id]/page" options={{ headerShown: false }} />
          <Stack.Screen name="category/[category]/page" options={{ headerShown: true, headerBackTitle: 'back', headerTitleStyle: { fontSize: 25  , fontWeight: 'bold' }, headerStyle: { backgroundColor: '#F8F8FF',} }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" backgroundColor='#000' />
      </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
