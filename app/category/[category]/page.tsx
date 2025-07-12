import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';

import TileNewsCard from '@/components/MyComponents/HomeScreen/TileNewsCard';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { NewsArticle } from '@/types/NewsArticle';

const ViewCategory = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
  } = useGuardianNews<NewsArticle[]>({
    mode: 'category',
    query: category,
    page,
    pageSize: 10,
    thumbnail: true,
    trailText: true,
  });

  // Memoized keyExtractor and renderItem
  const keyExtractor = useCallback((item: NewsArticle, index: number) => `${item.id}-${index}`, []);

  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <TileNewsCard data={item} />,
    []
  );

  // Handle infinite scroll
  const handleLoadMore = useCallback(() => {
    if (!loading && currentPage < totalPages) {
      setPage((prev) => prev + 1);
    } else if (currentPage >= totalPages && !hasReachedEnd) {
      setHasReachedEnd(true);
    }
  }, [loading, currentPage, totalPages, hasReachedEnd]);

  // Footer logic
  const listFooter = useMemo(() => {
    if (loading) {
      return (
        <View className="py-4">
          <ActivityIndicator color="#2a9df4" />
        </View>
      );
    }
    if (hasReachedEnd) {
      return (
        <Text className="text-center text-base text-gray-400 pt-4">
          No more articles
        </Text>
      );
    }
    return null;
  }, [loading, hasReachedEnd]);

  // Set header title
  useLayoutEffect(() => {
  if (category) {
    navigation.setOptions({
      title: category.toString().toUpperCase(),
      headerBackTitleVisible: false, // still hides the left back label text
      headerTitleStyle: { fontSize: 15  , fontWeight: 'semibold' },
    });
  }
}, [category, navigation]);

  // Early return checks AFTER all hooks
  if (!category) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white text-xl">No category selected</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-light px-4">
        <Text className="text-red-500 text-center">
          {error.message || 'Error fetching article'}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 min-h-screen bg-light">
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View className="h-6" />}
        ListFooterComponent={listFooter}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 12,
          paddingBottom: 130,
          flexGrow: 1,
        }}
      />
    </View>
  );
};

export default ViewCategory;
