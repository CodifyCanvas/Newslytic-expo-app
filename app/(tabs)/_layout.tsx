import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, Tabs } from 'expo-router';
import React from 'react';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#020618' },
        headerTintColor: 'white',
        headerRight: () => (
          <FontAwesome
            name="search"
            size={17}
            onPress={() => router.push('/search')}
            color="white"
            className="mr-5"
          />
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#020618',
          bottom: 10,
          borderColor: 'rgba(43, 127, 255, 0.3)',
          borderWidth: 1,
          left: 10,
          right: 10,
          height: 55,
          borderRadius: 10,
          elevation: 5,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 15  , fontWeight: 'semibold' },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={26} color={color} className="text-center" />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'CATEGORY',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 15  , fontWeight: 'semibold' },
          tabBarIcon: ({ color }) => (
            <Entypo name="grid" size={26} color={color} className="text-center" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'SEARCH',
          headerRight: () => null, // 👈 Removes the search icon from the header
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 15  , fontWeight: 'semibold' },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={20} color={color} className="text-center" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'BOOKMARKS',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 15  , fontWeight: 'semibold' },
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" size={18} color={color} className="text-center" />
          ),
        }}
      />
    </Tabs>
  );
}
