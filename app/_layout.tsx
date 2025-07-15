
import { initDB } from '@/lib/database';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './global.css';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const pathname = usePathname();

  const isArticlePage = pathname.startsWith('/article/');

  // Initialize SQLite DB on app start
  useEffect(() => {
    initDB();
  }, []);

  if (!loaded) return null;


  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isArticlePage ? 'black' : '#F8F8FF',
        }}
      >
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="article/[id]/page" options={{ headerShown: false }} />
          <Stack.Screen name="category/[category]/page" options={{ headerShown: true, headerBackTitle: 'back', headerTitleStyle: { fontSize: 20  , fontWeight: 'bold' }, headerStyle: { backgroundColor: '#F8F8FF',} }} />
          <Stack.Screen name="+not-found" />
        </Stack>
              <StatusBar style="dark" backgroundColor='#F8F8FF'  translucent={false}/>
        
      </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
