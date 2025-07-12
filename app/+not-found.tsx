import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, }}>
          <Stack.Screen
            options={{
              title: 'Page Not Found',
              headerBackVisible: false,
              headerTitleAlign: 'left',
              headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
              headerStyle: {
                backgroundColor: '#F8F8FF',
              },
            }}
          />
          <StatusBar style="dark" />
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.title}>😕 Oops! Page Not Found</Text>
              <Text style={styles.message}>
                Sorry, the page you're looking for doesn't exist or has been moved.
              </Text>

              <Link href="/" style={styles.link}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Return Home</Text>
                </View>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
  },
  content: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  link: {
    alignSelf: 'center', // centers link wrapper horizontally
  },
  button: {
    backgroundColor: '#3478f6',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
