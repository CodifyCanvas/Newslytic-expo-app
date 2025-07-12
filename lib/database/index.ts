import { Platform } from 'react-native';

let mod: typeof import('./native') | typeof import('./web');

if (Platform.OS === 'web') {
  mod = require('./web');
} else {
  mod = require('./native');
}

export const initDB = mod.initDB;
export const addBookmark = mod.addBookmark;
export const getAllBookmarks = mod.getAllBookmarks;
export const isBookmarked = mod.isBookmarked;
export const removeBookmark = mod.removeBookmark;

export type BookmarkArticle = import('./native').BookmarkArticle;
