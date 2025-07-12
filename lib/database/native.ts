import { BookmarkArticle } from '@/types/NewsArticle';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// Initialize SQLite database and ensure table exists
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
      webUrl TEXT,
      thumbnail TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);
}

// Add or update a bookmark
export async function addBookmark(article: BookmarkArticle): Promise<void> {
  if (!db) throw new Error('DB not initialized');
  await db.runAsync(
    `INSERT OR REPLACE INTO bookmarks (id, webTitle, sectionName, webPublicationDate, webUrl, thumbnail) VALUES (?, ?, ?, ?, ?, ?)`,
    [article.id, article.webTitle, article.sectionName, article.webPublicationDate, article.webUrl ?? '', article?.fields?.thumbnail ?? '']
  );
} 

// Get all bookmarks and reshape into expected structure
export async function getAllBookmarks(): Promise<BookmarkArticle[]> {
  if (!db) throw new Error('DB not initialized');

  const rows = await db.getAllAsync('SELECT * FROM bookmarks ORDER BY createdAt DESC');

  // Transform flat DB structure into expected nested structure
  const transformed = rows.map((row: any) => ({
    id: row.id,
    webTitle: row.webTitle,
    sectionName: row.sectionName,
    webPublicationDate: row.webPublicationDate,
    webUrl: row.webUrl,
    fields: {
      thumbnail: row.thumbnail || undefined,
    },
  }));

  return transformed;
}

// Check if an article is bookmarked
export async function isBookmarked(articleId: string): Promise<boolean> {
  if (!db) throw new Error('DB not initialized');
  const row = await db.getFirstAsync('SELECT 1 FROM bookmarks WHERE id = ? LIMIT 1', [articleId]);
  return !!row;
}

// Remove a bookmark by ID
export async function removeBookmark(articleId: string): Promise<void> {
  if (!db) throw new Error('DB not initialized');
  await db.runAsync('DELETE FROM bookmarks WHERE id = ?', [articleId]);
}

// Delete the database file
export const deleteDatabase = async () => {
  const dbPath = `${FileSystem.documentDirectory}SQLite/bookmarks.db`;

  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(dbPath);
    console.log('Database deleted');
  } else {
    console.log('Database file not found');
  }
};
