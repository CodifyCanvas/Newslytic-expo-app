import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export interface BookmarkArticle {
  id: string;
  webTitle: string;
  sectionName: string;
  webPublicationDate: string;
  thumbnail?: string;
}

export async function initDB(): Promise<void> {
  if (!db) {
    db = await SQLite.openDatabaseAsync('bookmarks.db');
  }

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id TEXT PRIMARY KEY NOT NULL,
      webTitle TEXT,
      sectionName TEXT,
      webPublicationDate TEXT,
      thumbnail TEXT
    );
  `);
}

export async function addBookmark(article: BookmarkArticle): Promise<void> {
  if (!db) throw new Error('DB not initialized');
  await db.runAsync(
    `INSERT OR REPLACE INTO bookmarks (id, webTitle, sectionName, webPublicationDate, thumbnail) VALUES (?, ?, ?, ?, ?)`,
    [article.id, article.webTitle, article.sectionName, article.webPublicationDate, article.thumbnail ?? '']
  );
}

export async function getAllBookmarks(): Promise<BookmarkArticle[]> {
  if (!db) throw new Error('DB not initialized');
  return await db.getAllAsync('SELECT * FROM bookmarks') as BookmarkArticle[];
}

export async function isBookmarked(articleId: string): Promise<boolean> {
  if (!db) throw new Error('DB not initialized');
  const row = await db.getFirstAsync('SELECT 1 FROM bookmarks WHERE id = ? LIMIT 1', [articleId]);
  return !!row;
}

export async function removeBookmark(articleId: string): Promise<void> {
  if (!db) throw new Error('DB not initialized');
  await db.runAsync('DELETE FROM bookmarks WHERE id = ?', [articleId]);
}
