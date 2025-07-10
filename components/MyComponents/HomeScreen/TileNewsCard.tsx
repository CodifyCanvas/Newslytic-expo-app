import { Images } from '@/constants';
import { NewsArticle } from '@/types/NewsArticle';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type TileNewsCardProps = {
  data: NewsArticle; // ✅ FIX: Accept a single NewsArticle, not an array
};

const TileNewsCard: React.FC<TileNewsCardProps> = ({ data }) => {
  const router = useRouter(); // ✅ FIX: Use useRouter from expo-router
  const { sectionName, webTitle, webPublicationDate, fields, id } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row w-[95%] mx-auto overflow-hidden bg-transparent items-center space-x-1"
      onPress={() => {
        router.push({
          pathname: '/article/[id]/page',
          params: { id },
        });
      }}
    >
      {/* Image Section */}
      <View className="h-24 w-24 rounded-lg overflow-hidden bg-gray-200 justify-center items-center">
        <Image
          source={
            fields?.thumbnail
              ? { uri: fields.thumbnail }
              : Images.placeholderImage
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      </View>


      {/* Text Section */}
      <View className="flex-1 flex gap-2 px-2 py-1 justify-between">
        <Text
          className="text-blue-500 text-sm font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {sectionName}
        </Text>

        <Text
          className="text-white text-lg font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {webTitle}
        </Text>

        <Text
          className="text-gray-300 text-sm font-medium"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formatDistanceToNow(new Date(webPublicationDate), { addSuffix: true })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TileNewsCard;
