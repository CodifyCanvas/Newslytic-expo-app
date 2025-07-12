import BreakingNewsCard from '@/components/MyComponents/HomeScreen/BreakingNewsCard';
import TileNewsCard from '@/components/MyComponents/HomeScreen/TileNewsCard';
import { BreakingNewsSkeleton } from '@/components/MyComponents/Skeletons';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { NewsArticle } from '@/types/NewsArticle';
import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function HomeScreen() {
  const [page, setPage] = useState(2);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // Breaking News (static, one-time fetch)
  const {
    data: breakingNews,
    loading: breakingLoading,
    error: breakingError,
  } = useGuardianNews<NewsArticle[]>({ mode: 'latest', pageSize: 5, thumbnail: true });

  // Recommendations (paginated)
  const {
    data: recommendationData,
    loading: recommendationLoading,
    error: recommendationError,
    currentPage,
    totalPages,
  } = useGuardianNews<NewsArticle[]>({
    mode: 'recommendation',
    page,
    pageSize: 10,
    thumbnail: true,
  });

  // FlatList expects a valid array
  const articles = recommendationData ?? [];

  const handleLoadMore = useCallback(() => {
    if (!recommendationLoading && currentPage < totalPages) {
      setPage((prev) => prev + 1);
    } else if (currentPage >= totalPages && !hasReachedEnd) {
      setHasReachedEnd(true);
    }
  }, [recommendationLoading, currentPage, totalPages, hasReachedEnd]);

  const keyExtractor = useCallback(
    (item: NewsArticle, index: number) => `${item.id}-${index}`,
    []
  );

  const listFooter = useMemo(() => {
    if (recommendationLoading && page > 1) {
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
  }, [recommendationLoading, hasReachedEnd, page]);

  const renderHeader = () => (
    <>
      <Text className="text-neutral-800 text-2xl font-semibold">Breaking News</Text>

      {breakingLoading ? (
        <BreakingNewsSkeleton />
      ) : breakingError ? (
        <Text className="text-red-400 text-sm font-bold">
          Error: {breakingError.message}
        </Text>
      ) : (
        <BreakingNewsCard data={breakingNews} />
      )}

      <Text className="text-neutral-800 text-2xl font-semibold mt-2 mb-2">Recommendation</Text>

      {recommendationError && (
        <Text className="text-red-400 text-sm font-bold">
          Error: {recommendationError.message}
        </Text>
      )}
    </>
  );

  return (
    <View className="flex-1 min-h-screen bg-light">
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => <TileNewsCard data={item} />}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={listFooter}
        ItemSeparatorComponent={() => <View className="h-6" />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 12,
          paddingBottom: 130,
          flexGrow: 1,
        }}
      />
    </View>
  );
}
