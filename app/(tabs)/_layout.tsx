import { HapticTab } from '@/components/HapticTab';
import { Icons } from '@/constants';
import { Colors } from '@/constants/Colors';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

// Component to render tab icon with label when focused
const TabIcon = ({ focused, icon, activeIcon, title }: any) => {
  if (focused) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#2b7fff',  // Active tab blue background
          borderRadius: 25,
          minWidth: title === 'Bookmarks' ? 110 : 80,
          minHeight: 40,
          marginTop: 10,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginRight: title === 'Bookmarks' ? 20 : 0,
          gap: 6,
        }}
      >
        <Image source={activeIcon} style={{ width: 22, height: 22 }} resizeMode="contain" />
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '600',
            lineHeight: 16,
            textAlignVertical: 'center',
            includeFontPadding: false,
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  // Default tab icon when not focused
  return (
    <View
      style={{
        marginTop: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
      }}
    >
      <Image source={icon} style={{ width: 22, height: 22 }} resizeMode="contain" />
    </View>
  );
};

// Background view for the tab bar (absolute fill)
const TabBarBackground = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#F8F8FF',  // Ghost white background
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  />
);

// Main tab layout component defining screens and tab bar appearance
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F8F8FF',
          elevation: 0,       // Remove Android shadow
          shadowOpacity: 0,   // Remove iOS shadow
          borderBottomWidth: 0, // Remove iOS border line
        },
        tabBarShowLabel: false, // Use custom label in TabIcon component
        headerTintColor: 'black',
        headerTitleAlign: 'left',
        headerRight: () => (
          <TouchableOpacity
            className="p-3 bg-icon-light rounded-full mr-5"
            onPress={() => router.push('/search')}
          >
            <Image source={Icons.search} style={{ width: 22, height: 22 }} />
          </TouchableOpacity>
        ),
        tabBarButton: HapticTab, // Custom haptic feedback button wrapper
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: '#F8F8FF',
          borderTopColor: '#d4d4d4',
          borderTopWidth: 1,
          height: 60,
          elevation: 0,
          paddingTop: 5,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          paddingHorizontal: 12,
          justifyContent: 'space-around',
          position: 'absolute',
          zIndex: 20,
          overflow: 'visible',
        },
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: '#a1a1a1',
      }}
    >
      {/* Home tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarActiveTintColor: '#2b7fff',
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.home} activeIcon={Icons.activeHome} title="Home" />
          ),
        }}
      />
      {/* Category tab */}
      <Tabs.Screen
        name="category"
        options={{
          title: 'CATEGORY',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Icons.category}
              activeIcon={Icons.activecategory}
              title="Category"
            />
          ),
        }}
      />
      {/* Search tab */}
      <Tabs.Screen
        name="search"
        options={{
          title: 'SEARCH',
          headerRight: () => null, // Hide search icon on search screen header
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Icons.search}
              activeIcon={Icons.activesearch}
              title="Search"
            />
          ),
        }}
      />
      {/* Bookmarks tab */}
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'BOOKMARKS',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={Icons.bookmark}
              activeIcon={Icons.activebookmark}
              title="Bookmarks"
            />
          ),
        }}
      />
    </Tabs>
  );
}
