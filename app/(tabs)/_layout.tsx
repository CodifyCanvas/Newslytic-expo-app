import { HapticTab } from '@/components/HapticTab';
import { Icons } from '@/constants';
import { Colors } from '@/constants/Colors';
import { cn } from '@/lib/utils';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';


const platform = Platform.OS

// Component to render tab icon with label when focused
const TabIcon = ({ focused, icon, activeIcon, title }: any) => {
  if (focused) {
    return (
      <View
        className={cn(
          'flex flex-row w-full flex-1 bg-blue-500 min-h-12 mt-4 justify-center items-center rounded-full overflow-hidden',
          title === 'Bookmarks' ? 'min-w-[122px] mr-5' : 'min-w-[115px]',
          title === 'Home' && 'ml-4',
          (title === 'Category' || title === 'Bookmarks') ? 'gap-1' : 'gap-2'
        )}
      >
        <Image source={activeIcon} resizeMode="contain" className='size-5' />
        <Text
          className={cn(
            'text-white font-semibold shrink-0',
            platform === 'ios' ? 'text-[15px]' : 'text-xs'
          )}
        >
          {title}
        </Text>
      </View>
    );
  }

  // Default tab icon when not focused
  return (
    <View
      className='mt-4 justify-center items-center flex p-2'
    >
      <Image source={icon} className='size-5' resizeMode="contain" />
    </View>
  );
};

// Background view for the tab bar (absolute fill)
const TabBarBackground = () => (
  <View className="flex-1 bg-light absolute w-full h-full" />
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
            className="p-3 rounded-full mr-5 bg-icon-light"
            onPress={() => router.push('/search')}
          >
            <Image
              source={Icons.search}
              className="size-6"
              resizeMode="contain"
            />
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
          tabBarItemStyle: {
            width: 'auto',
          },
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
