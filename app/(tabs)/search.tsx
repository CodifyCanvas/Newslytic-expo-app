import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import TileNewsCard from '@/components/MyComponents/HomeScreen/TileNewsCard';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { NewsArticle } from '@/types/NewsArticle';
import Feather from '@expo/vector-icons/Feather';

const Search = () => {
  // Local input state (controlled input field)
  const [inputValue, setInputValue] = useState('');

  // Search term sent to API (debounced version of input)
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [page, setPage] = useState(1);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);

  // 🔁 Debounce search input to avoid API overload
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setHasReachedEnd(false);
      setSearchQuery(inputValue);
    }, 400); // Debounce time

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // 🔍 Fetch news data based on current query & page
  const { data, loading, error, currentPage, totalPages, totalResults } =
    useGuardianNews<NewsArticle[]>({
      mode: searchQuery ? 'search' : 'latest',
      page,
      pageSize: 10,
      query: searchQuery,
      thumbnail: true,
    });

  // 🔑 Unique key for FlatList items
  const keyExtractor = useCallback(
    (item: NewsArticle, index: number) => `${item.id}-${index}`,
    []
  );

  // 📄 Render each news card
  const renderItem = useCallback(
    ({ item }: { item: NewsArticle }) => <TileNewsCard data={item} />,
    []
  );

  // 📥 Load more on scroll (infinite scroll)
  const handleLoadMore = useCallback(() => {
    if (!loading && currentPage < totalPages) {
      setPage((prev) => prev + 1); // Go to next page
    } else if (currentPage >= totalPages && !hasReachedEnd) {
      setHasReachedEnd(true); // Mark list as completed
    }
  }, [loading, currentPage, totalPages, hasReachedEnd]);

  // ⬇ Footer: loading indicator or "no more articles"
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

  // 🔄 Input text change handler
  const onChangeText = (text: string) => {
    setInputValue(text);
  };

  // ❌ Render error UI if API fails
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
    <View className="bg-light flex-1 py-4">
      <View className="px-5 pb-0 bg-transparent">

        <View className='flex flex-row items-center justify-between rounded-full bg-icon-light px-4 mb-4'>
          <TextInput
            placeholder='Search'
            value={inputValue}
            onChangeText={onChangeText}
            placeholderTextColor="#737373"
            className='text-neutral-700 text-xl flex-1 mr-2'
            style={{
              paddingVertical: 10, // vertical centering
            }}
          />

          {/* Feather Icon - positioned inline, vertically centered */}
          {inputValue !== '' && (
            <TouchableOpacity onPress={() => setInputValue('')}>
              <Feather name="x-circle" size={17} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>



      <View className="px-5 mb-2">
        {searchQuery !== '' && totalResults !== undefined && (
          <Text className="text-neutral-500 text-base">Total Results: {totalResults}</Text>
        )}
      </View>

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View className="h-5" />}
        ListFooterComponent={listFooter}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 130,
          flexGrow: 1,
        }}
        className="mb-10"
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={11} 
      />
    </View>
  );

};

export default Search;