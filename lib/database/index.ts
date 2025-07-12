import { type BookmarkArticle } from '@/types/NewsArticle';
import { Platform } from 'react-native';

// Dynamically choose native or web DB implementation
const mod = Platform.OS === 'web' ? require('./web') : require('./native');

export const initDB = mod.initDB;
export const addBookmark = mod.addBookmark;
export const getAllBookmarks = mod.getAllBookmarks;
export const isBookmarked = mod.isBookmarked;
export const removeBookmark = mod.removeBookmark;
export const deleteDatabase = mod.deleteDatabase;

export type { BookmarkArticle };

