import { type BookmarkArticle } from '@/types/NewsArticle';

const warn = (method: string) =>
  console.warn(`Web platform does not support SQLite: ${method}()`);

export async function initDB(): Promise<void> {
  warn('initDB');
}

export async function addBookmark(): Promise<void> {
  warn('addBookmark');
}

export async function getAllBookmarks(): Promise<BookmarkArticle[]> {
  warn('getAllBookmarks');
  return [];
}

export async function isBookmarked(): Promise<boolean> {
  warn('isBookmarked');
  return false;
}

export async function removeBookmark(): Promise<void> {
  warn('removeBookmark');
}

export async function deleteDatabase(): Promise<void> {
  warn('deleteDatabase');
}
