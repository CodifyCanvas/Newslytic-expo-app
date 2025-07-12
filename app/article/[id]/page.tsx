// app/article/[id]/page.tsx
import BookmarkButton from '@/components/MyComponents/BookmarkButton';
import { ArticleSkeleton } from '@/components/MyComponents/Skeletons';
import { Icons, Images } from '@/constants';
import { useGuardianNews } from '@/hooks/useGuardianNews';
import { stripHtml } from '@/lib/utils';
import { NewsArticle } from '@/types/NewsArticle';
import { formatDistanceToNow } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const options = {
  headerShown: false,
};

const ArticlePage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data: article, loading, error } = useGuardianNews<NewsArticle>({
    mode: 'article',
    id,
    thumbnail: true,
    bodyText: true,
    trailText: true,
  });

  const publishedDate = useMemo(() => {
    if (!article?.webPublicationDate) return 'Unknown date';
    return formatDistanceToNow(new Date(article.webPublicationDate), { addSuffix: true });
  }, [article?.webPublicationDate]);

  const handleExternalLink = React.useCallback(() => {
  if (article?.webUrl) {
    Linking.openURL(article.webUrl);
  }
}, [article?.webUrl]);

  const HeaderImage = useMemo(() => {
  if (!article) return null;

  return (
      <View className="relative h-[60vh] w-full z-10">
        <Image
          source={
            article?.fields?.thumbnail
              ? { uri: article.fields.thumbnail }
              : Images.placeholderImage
          }
          style={{ width: '100%', height: '100%' }}
          className="absolute w-full h-full"
          resizeMode="cover"
        />

        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <View className='bottom-14 absolute px-4 z-20 py-0'>
            <Text
              className="text-white text-md mb-2 font-medium bg-blue-500 rounded-full shadow-black/30 shadow px-3 py-1"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ alignSelf: 'flex-start' }}
            >
              {article.sectionName}
            </Text>
            <Text className="text-white w-[90vw] mt-1 text-3xl font-bold mb-4 scroll-m-20 tracking-tight first:mt-0" numberOfLines={3} ellipsizeMode="tail">
              {article?.webTitle || 'No Title Available'}
            </Text>
            <Text className="text-gray-300 -mt-2 text-md font-medium">
  {publishedDate}
</Text>
          </View>
        </LinearGradient>
      </View>
  );
}, [article, publishedDate]);


  const ArticleBody = useMemo(() => {
    if (!article) return null;

    return (
      <View className="bg-white rounded-t-3xl px-4 pt-6 pb-10 -mt-10 z-20">
        {article.fields?.trailText && (
          <Text className="text-black text-2xl font-semibold tracking-tight">
            {stripHtml(article.fields.trailText)}
          </Text>
        )}
        {article.fields?.bodyText && (
          <Text className="text-black text-lg leading-7 mt-6 text-justify">
            {stripHtml(article.fields.bodyText)}
          </Text>
        )}
        {article.fields?.thumbnail && (
          <View className="relative w-full h-64 mt-5 rounded-lg shadow-md overflow-hidden">
            <Image
              source={{ uri: article.fields.thumbnail }}
              className="absolute w-full h-full"
              resizeMode="contain"
            />
          </View>
        )}
        <Text className="text-black text-lg leading-7 mt-6">
          Want to read more?{' '}
          <Pressable onPress={handleExternalLink}>
            <Text className="text-blue-600 underline">Tap here to view the full article online.</Text>
          </Pressable>
        </Text>
      </View>
    );
  }, [article, handleExternalLink]);

  if (!id) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Please provide a valid article ID.</Text>
      </View>
    );
  }

  if (loading) return <ArticleSkeleton />;

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-black px-4">
        <Text className="text-red-500 text-center">{error.message || 'Error fetching article'}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black relative">
      {/* Header Icons */}
      <View className="absolute mt-5 px-5 w-full flex flex-row justify-between top-4 z-30">
        <TouchableOpacity
          className="bg-white/20 backdrop-blur-md isolate p-3 rounded-full"
          onPress={router.back}
        >
          {/* <Ionicons name="chevron-back-outline" size={20} color="white" /> */}
          <Image source={Icons.activeBack} style={{height:20, width: 20}} />
        </TouchableOpacity>

        <BookmarkButton article={article} />
        
      </View>

      {HeaderImage}
      {ArticleBody}
    </ScrollView>
  );
};

export default ArticlePage;
