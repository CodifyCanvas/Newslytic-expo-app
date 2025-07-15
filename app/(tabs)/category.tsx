import { CategoryPageSkeleton } from '@/components/MyComponents/Skeletons';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { NewsSection } from '@/types/NewsArticle';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Category() {
  const [value, setValue] = React.useState(''); // Search input state
  const router = useRouter();

  // Fetch news categories using custom hook
  const { data = [], loading, error } = useGuardianNews<NewsSection[]>({ mode: 'category-name' });

  // Show skeleton while loading
  if (loading) return <CategoryPageSkeleton count={10} />;

  // Show error message if fetching fails
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-light px-4">
        <Text className="text-red-500 text-center">{error.message || 'Error fetching article'}</Text>
      </View>
    );
  }

  // Update search input value
  const onChangeText = (text: string) => setValue(text);

  // Filter categories based on search input (case-insensitive)
  const filteredData = value.trim()
    ? data.filter(category =>
      category.webTitle.toLowerCase().includes(value.toLowerCase())
    )
    : data;

  return (
    <View style={{ flex: 1 }} className="bg-light pt-4">
      <View className='px-5'>
        {/* Search bar */}
        <View className="flex flex-row items-center justify-between rounded-full bg-icon-light px-4 mb-4">
          <TextInput
            placeholder="Search Category"
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor="#737373"
            className="text-neutral-700 text-xl flex-1 mr-2"
            style={{ paddingVertical: 10 }} // Vertical centering
          />
          {/* Clear input button */}
          {value !== '' && (
            <TouchableOpacity onPress={() => setValue('')}>
              <Feather name="x-circle" size={17} color="gray" />
            </TouchableOpacity>
          )}
        </View>

        {/* Display number of results */}
        <Text className="text-neutral-500 text-base mb-2">Total Results: {filteredData.length}</Text>

      </View>


      <ScrollView className="px-5 py-4 mb-10">
        {/* Categories list */}
        <View className="flex flex-row flex-wrap gap-2">
          {filteredData.map((category, index) => (
            <View key={index} className="flex flex-row flex-wrap items-center gap-2 mt-2">
              <TouchableOpacity
                className="justify-center items-center flex-row bg-tag-light rounded-full py-1 px-3"
                style={{ backgroundColor: '#2b7fff' }}
                onPress={() => {
                  // Navigate to category page with category ID param
                  router.push({
                    pathname: '/category/[category]/page',
                    params: { category: category.id },
                  });
                }}
              >
                <Text className="text-white text-lg text-center">{category.webTitle}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View className='h-[60] w-full' />
      </ScrollView>
    </View>
  );
}
