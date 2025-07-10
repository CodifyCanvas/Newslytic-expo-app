import { NewsArticle, NewsSection } from '@/types/NewsArticle';
import { useEffect, useState } from 'react';

type FetchMode = 'latest' | 'search' | 'article' | 'recommendation' | 'category-name' | 'category';

type Params = {
  mode?: FetchMode;
  id?: string;          // for article
  query?: string;       // for search or category
  pageSize?: number;    // for paginated requests
  page?: number;        // default 1
  thumbnail?: boolean;  // show thumbnail field
  bodyText?: boolean;   // show bodyText field
  trailText?: boolean;  // show trailText field
};

type GuardianNewsResult<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  totalResults: number;
};

export function useGuardianNews<T = NewsArticle[] | NewsSection[]>({
  mode = 'latest',
  id,
  query,
  pageSize = 5,
  page = 1,
  thumbnail,
  bodyText,
  trailText,
}: Params): GuardianNewsResult<T> {
  const [data, setData] = useState<T>([] as T);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0); 

  useEffect(() => {
    let isMounted = true;

    async function fetchNews() {
      setLoading(true);
      setError(null);

      try {
        // Build show-fields param only once
        const showFields = [thumbnail && 'thumbnail', bodyText && 'bodyText', trailText && 'trailText']
          .filter(Boolean)
          .join(',');

        // Base API url and key
        const baseUrl = process.env.EXPO_PUBLIC_GUARDIAN_NEWS_API_URL;
        const apiKey = process.env.EXPO_PUBLIC_GUARDIAN_NEWS_API_KEY;

        if (!baseUrl || !apiKey) {
          throw new Error('API URL or Key is missing in environment variables');
        }

        let url = '';

        // Build URL based on mode
        switch (mode) {
          case 'latest':
            url = `${baseUrl}/search?api-key=${apiKey}&order-by=newest&page-size=${pageSize}&page=${page}`;
            break;

          case 'search':
            if (!query) throw new Error('Search mode requires a query');
            url = `${baseUrl}/search?api-key=${apiKey}&q=${encodeURIComponent(query)}&order-by=newest&page-size=${pageSize}&page=${page}`;
            break;

          case 'article':
            if (!id) throw new Error('Article mode requires an id');
            url = `${baseUrl}/${id}?api-key=${apiKey}`;
            break;

          case 'recommendation':
            url = `${baseUrl}/search?api-key=${apiKey}&order-by=newest&page-size=${pageSize}&page=${page}`;
            break;

          case 'category-name':
            url = `${baseUrl}/sections?api-key=${apiKey}`;
            break;

          case 'category':
            if (!query) throw new Error('Category mode requires a query');
            url = `${baseUrl}/search?api-key=${apiKey}&section=${encodeURIComponent(query)}&page-size=${pageSize}&page=${page}`;
            break;

          default:
            throw new Error('Invalid mode or missing parameters');
        }

        if (showFields) {
          url += `&show-fields=${showFields}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        if (!isMounted) return;

        // Handle data update based on mode
        if (mode === 'article') {
          setData(json.response.content as T);
          setCurrentPage(1);
          setTotalPages(1);
          return;
        }

        if (mode === 'category-name') {
          setData(json.response.results as T);
          setCurrentPage(1);
          setTotalPages(1);
          return;
        }

        // Modes with paginated results
        const results = json.response.results ?? [];
        const newCurrentPage = json.response.currentPage ?? 1;
        const newTotalPages = json.response.pages ?? 1;
        const total = json.response.total ?? 0; 

        setTotalResults(total);                
        setCurrentPage(newCurrentPage);
        setTotalPages(newTotalPages);

        if (mode === 'latest' || mode === 'search' || mode === 'recommendation' || mode === 'category') {
          setData((prevData) => {
            const prevArray = Array.isArray(prevData) ? prevData : [];
            // Reset data if first page, else append for pagination
            return page === 1 ? results as T : ([...prevArray, ...results] as T);
          });
        } else {
          setData(results as T);
        }

      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [mode, id, query, page, pageSize, thumbnail, bodyText, trailText, totalResults]);

  return { data, loading, error, currentPage, totalPages, totalResults };
}
