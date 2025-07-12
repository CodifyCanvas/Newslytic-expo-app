import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import TileNewsCard from '@/components/MyComponents/HomeScreen/TileNewsCard';
import { getAllBookmarks, type BookmarkArticle } from '@/lib/database';

const Bookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<BookmarkArticle[]>([]);

  const fetchBookmarks = async () => {
    try {
      const allBookmarks = await getAllBookmarks();
      setBookmarks(allBookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  // Refetch bookmarks on screen focus
  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  const filteredBookmarks = searchTerm
    ? bookmarks.filter(({ webTitle, sectionName }) => {
        const search = searchTerm.toLowerCase();
        return (
          sectionName.toLowerCase().includes(search) ||
          webTitle.toLowerCase().includes(search)
        );
      })
    : bookmarks;

  // Render search bar in FlatList header
  const renderHeader = () => (
    <View>
      <View className="flex-row items-center justify-between rounded-full bg-icon-light px-4 mb-4">
        <TextInput
          placeholder="Search Bookmarks"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor="#737373"
          className="text-neutral-700 text-xl flex-1 mr-2"
          style={{ paddingVertical: 10 }}
        />
        {searchTerm !== '' && (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <Feather name="x-circle" size={17} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      {filteredBookmarks.length > 0 && (
        <Text className="text-neutral-500 text-base mb-2">
          Total Results: {filteredBookmarks.length}
        </Text>
      )}
    </View>
  );

  // Render empty list component
  const renderEmpty = () => (
    <Text className="text-center text-base text-gray-400 pt-4">
      No bookmarks found
    </Text>
  );

  return (
    <FlatList
      className="flex-1 px-5 p-2 bg-light"
      data={filteredBookmarks}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      renderItem={({ item }) => (
        <View className="mb-4">
          <TileNewsCard data={item} />
        </View>
      )}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default Bookmarks;
