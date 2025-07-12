import { HapticTab } from '@/components/HapticTab';
import { router, Tabs } from 'expo-router';
import React from 'react';

import { Icons } from '@/constants';
import { Colors } from '@/constants/Colors';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TabIcon = ({ focused, icon, activeIcon, title }: any) => {
  if (focused) {
    return (
      <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#2b7fff', // example blue
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
  <Image
    source={activeIcon}
    style={{ width: 22, height: 22 }}
    resizeMode="contain"
  />
  <Text
    numberOfLines={1}   // prevents breaking into multiple lines
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
      <Image
        source={icon}
        style={{ width: 22, height: 22 }}
        resizeMode="contain"
      />
    </View>
  );
};

const TabBarBackgroundFunc = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#F8F8FF', // pure ghost white
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  />
);


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F8F8FF',
          elevation: 0,            // remove Android shadow
          shadowOpacity: 0,        // remove iOS shadow
          borderBottomWidth: 0,    // remove iOS border line
        },
        tabBarShowLabel: false,
        headerTintColor: 'black',
        headerTitleAlign: 'left',
        headerRight: () => (
          <TouchableOpacity className='p-3 bg-icon-light rounded-full mr-5' onPress={() => router.push('/search')}>
            <Image  source={Icons.search} style={{ width: 22, height: 22 }}></Image>
          </TouchableOpacity>
        ),
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackgroundFunc,
        tabBarStyle: {
          backgroundColor: '#F8F8FF', // solid ghost white
          borderTopColor: '#d4d4d4',  // subtle top border
          borderTopWidth: 1,
          height: 70,
          elevation: 0, 
          paddingTop: 5,             
          shadowColor: 'transparent',  
          shadowOpacity: 0, 
          paddingHorizontal: 12,         
          justifyContent: 'space-around',
          display: 'flex',
          overflow: 'visible',                 
          position: 'absolute',
          // marginHorizontal: 10,
          zIndex: 20,
        },
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: '#a1a1a1',
        
      }}
    >
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
      <Tabs.Screen
        name="category"
        options={{
          title: 'CATEGORY',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.category} activeIcon={Icons.activecategory} title="Category" />
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
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.search} activeIcon={Icons.activesearch} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'BOOKMARKS',
          tabBarActiveTintColor: '#2b7fff',
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'semibold' },
          headerTitleStyle: { fontSize: 25, fontWeight: 'bold' },
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Icons.bookmark} activeIcon={Icons.activebookmark} title="Bookmarks" />
          ),
        }}
      />
    </Tabs>
  );
}
