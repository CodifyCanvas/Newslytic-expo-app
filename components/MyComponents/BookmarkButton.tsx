import { Icons } from '@/constants'
import { addBookmark, isBookmarked, removeBookmark } from '@/lib/database/native'
import { NewsArticle } from '@/types/NewsArticle'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'

const BookmarkButton = ({ article }: { article: NewsArticle }) => {
    const [isBookmarkedState, setIsBookmarkedState] = useState(false);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    async function checkBookmark() {
      try {
        const bookmarked = await isBookmarked(article.id)
        setIsBookmarkedState(bookmarked)
      } catch (e) {
        console.error('Failed to check bookmark:', e)
      } finally {
        setLoading(false)
      }
    }

    checkBookmark()
  }, [article.id])

  const toggleBookmark = async () => {
    try {
      if (isBookmarkedState) {
        await removeBookmark(article.id)
        setIsBookmarkedState(false)
      } else {
        await addBookmark(article)
        setIsBookmarkedState(true)
      }
    } catch (e) {
      console.error('Bookmark toggle failed:', e)
    }
  }

  if (loading) {
    // optionally show nothing or a spinner while loading bookmark state
    return null
  }


return (
    <TouchableOpacity
      onPress={toggleBookmark}
      className="p-3 bg-white/20 backdrop-blur-md isolate rounded-full"
    >
      {isBookmarkedState
        ? <Image source={Icons.activebookmark} style={{ height: 20, width: 20 }} />
        : <Ionicons name="bookmark-outline" size={20} color="white" />}
    </TouchableOpacity>
  )
}

export default BookmarkButton