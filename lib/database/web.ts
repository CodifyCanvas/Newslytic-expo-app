export interface BookmarkArticle {
  id: string;
  webTitle: string;
  sectionName: string;
  webPublicationDate: string;
  thumbnail?: string;
}

export async function initDB(): Promise<void> {
  console.warn('Web platform does not support SQLite.');
}

export async function addBookmark(): Promise<void> {
  console.warn('Web platform does not support SQLite.');
}

export async function getAllBookmarks(): Promise<BookmarkArticle[]> {
  console.warn('Web platform does not support SQLite.');
  return [];
}

export async function isBookmarked(): Promise<boolean> {
  console.warn('Web platform does not support SQLite.');
  return false;
}

export async function removeBookmark(): Promise<void> {
  console.warn('Web platform does not support SQLite.');
}
