import Feather from '@expo/vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import TileNewsCard from '@/components/MyComponents/HomeScreen/TileNewsCard';
import { getAllBookmarks, type BookmarkArticle } from '@/lib/database';

const Bookmarks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarks, setBookmarks] = useState<BookmarkArticle[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookmarks = async () => {
    try {
      const data = await getAllBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchBookmarks();
    } finally {
      setRefreshing(false);
    }
  };

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

  const renderEmpty = () => (
    <Text className="text-center text-base text-gray-400 pt-4">
      No bookmarks found.
    </Text>
  );

  const renderFooter = () =>
    filteredBookmarks.length > 0 ? (
      <Text className="text-center text-base text-gray-500 pt-4 italic">
        You've reached the end of your bookmarks.
      </Text>
    ) : null;

  return (
    <View style={{ flex: 1 }} className="bg-light py-4">
      <View className="px-5">
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
      </View>

      {filteredBookmarks.length > 0 && (
        <View className="px-5 mb-2">
          <Text className="text-neutral-500 text-base">
            Total Results: {filteredBookmarks.length}
          </Text>
        </View>
      )}

      <FlatList
        data={filteredBookmarks}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <TileNewsCard data={item} />}
        ItemSeparatorComponent={() => <View className="h-5" />}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 130,
          flexGrow: 1,
        }}
      />
    </View>
  );
};

export default Bookmarks;
