import { BookmarkArticle } from '@/types/NewsArticle';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// Initialize SQLite database and ensure table exists
export async function initDB(): Promise<void> {
  try {
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
  } catch (error) {
    console.error('DB Init Error:', error);
    throw error;
  }
}

// Add or update a bookmark
export async function addBookmark(article: BookmarkArticle): Promise<void> {
  try {
    if (!db) throw new Error('DB not initialized');

    await db.runAsync(
      `INSERT OR REPLACE INTO bookmarks (id, webTitle, sectionName, webPublicationDate, webUrl, thumbnail) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        article.id,
        article.webTitle,
        article.sectionName,
        article.webPublicationDate,
        article.webUrl ?? '',
        article?.fields?.thumbnail ?? '',
      ]
    );
  } catch (error) {
    console.error('Add Bookmark Error:', error);
    throw error;
  }
}

// Get all bookmarks and reshape into expected structure
export async function getAllBookmarks(): Promise<BookmarkArticle[]> {
  try {
    if (!db) throw new Error('DB not initialized');

    const rows = await db.getAllAsync('SELECT * FROM bookmarks ORDER BY createdAt DESC');

    return rows.map((row: any) => ({
      id: row.id,
      webTitle: row.webTitle,
      sectionName: row.sectionName,
      webPublicationDate: row.webPublicationDate,
      webUrl: row.webUrl,
      fields: {
        thumbnail: row.thumbnail || undefined,
      },
    }));
  } catch (error) {
    console.error('Get All Bookmarks Error:', error);
    throw error;
  }
}

// Check if an article is bookmarked
export async function isBookmarked(articleId: string): Promise<boolean> {
  try {
    if (!db) throw new Error('DB not initialized');

    const row = await db.getFirstAsync(
      'SELECT 1 FROM bookmarks WHERE id = ? LIMIT 1',
      [articleId]
    );

    return !!row;
  } catch (error) {
    console.error('Checking Bookmark Error: ', error);
    throw error;
  }
}

// Remove a bookmark by ID
export async function removeBookmark(articleId: string): Promise<void> {
  try {
    if (!db) throw new Error('DB not initialized');

    await db.runAsync('DELETE FROM bookmarks WHERE id = ?', [articleId]);
  } catch (error) {
    console.error('Remove Bookmark Error:', error);
    throw error;
  }
}

// Delete the database file
export const deleteDatabase = async (): Promise<void> => {
  try {
    const dbPath = `${FileSystem.documentDirectory}SQLite/bookmarks.db`;
    const fileInfo = await FileSystem.getInfoAsync(dbPath);

    if (fileInfo.exists) {
      await FileSystem.deleteAsync(dbPath);
      console.log('Database deleted');
    } else {
      console.log('Database file not found');
    }
  } catch (error) {
    console.error('Delete Database Error:', error);
    throw error;
  }
};
