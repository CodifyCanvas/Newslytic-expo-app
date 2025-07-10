import { CategoryPageSkeleton } from '@/components/MyComponents/Skeletons';
import { Input } from '@/components/ui/reactnativereusables/ui/input';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { NewsSection } from '@/types/NewsArticle';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Category() {
  const [value, setValue] = React.useState('');
  const router = useRouter();

  const { data = [], loading, error } = useGuardianNews<NewsSection[]>({ mode: 'category-name' });

  if (loading) {
    return (
      <CategoryPageSkeleton count={10} />
    );
  }

  if (error) {
      return (
        <View className="flex-1 justify-center items-center radial-center-gradient-bg-dark px-4">
          <Text className="text-red-500 text-center">{error.message || 'Error fetching article'}</Text>
        </View>
      );
  }

  const onChangeText = (text: string) => {
    setValue(text);
  };

  // ✅ Filter logic
  const filteredData = value.trim()
    ? data.filter(category =>
      category.webTitle.toLowerCase().includes(value.toLowerCase())
    )
    : data;

  return (
    <ScrollView className='px-5 py-2 radial-center-gradient-bg-dark mb-20'>
      <View>
        <Input
          placeholder='Search Category...'
          value={value}
          onChangeText={onChangeText}
          aria-labelledby='inputLabel'
          aria-errormessage='inputError'
          className='text-white bg-gray-800 rounded-lg border-none outline-none focus:border-b focus:border-blue-500 focus:ring-0 p-2 mb-4'
        />
      </View>
      
      <Text className='text-gray-300 text-sm mb-2'>Total Results: {filteredData.length}</Text>

      <View className='flex flex-row flex-wrap gap-2'>
        {filteredData.map((category, index) => (
          <View key={index} className='flex mt-2 flex-row items-center gap-2 flex-wrap'>
            {/* <Text className='text-gray-300 uppercase mt-1 text-sm'>{category.webTitle}</Text> */}
              <TouchableOpacity
                  className="justify-center items-center border flex flex-row border-blue-500 w-fit rounded-full py-1 px-3"
                  onPress={() => {
                    router.push({
                      pathname: '/category/[category]/page',
                      params: { category: category.id },
                    });
                  }}
                >
                  <Text className="text-blue-500 text-lg">• {category.webTitle}</Text>
                </TouchableOpacity>
            {/* </View> */}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
