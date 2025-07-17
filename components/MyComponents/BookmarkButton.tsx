import { Icons } from '@/constants';
import { addBookmark, isBookmarked, removeBookmark } from '@/lib/database/native';
import { NewsArticle } from '@/types/NewsArticle';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import ErrorAlert from './error-alert';

const BookmarkButton = ({ article }: { article: NewsArticle }) => {
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkBookmark = async () => {
      try {
        const bookmarked = await isBookmarked(article.id);
        setIsBookmarkedState(bookmarked);
      } catch (e) {
        console.error('Failed to check bookmark:', e);
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmark();
  }, [article.id]);

  const toggleBookmark = async () => {
    try {
      setLoading(true);

      if (isBookmarkedState) {
        await removeBookmark(article.id);
        setIsBookmarkedState(false);
      } else {
        await addBookmark(article);
        setIsBookmarkedState(true);
      }
    } catch (e) {
      console.error('Bookmark toggle failed:', e);
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorAlert error={error} />}
      
      <TouchableOpacity
        onPress={toggleBookmark}
        className="p-3 bg-white/20 backdrop-blur-md isolate rounded-full"
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : isBookmarkedState ? (
          <Image source={Icons.activebookmark} style={{ height: 20, width: 20 }} />
        ) : (
          <Ionicons name="bookmark-outline" size={20} color="white" />
        )}
      </TouchableOpacity>
    </>
  );
};

export default BookmarkButton;
