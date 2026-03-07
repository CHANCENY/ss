/**
 * API Data Service
 * Connects to backend API endpoints for movies, TV shows, playlists, and episodes
 * Design: Cinematic Elegance - Content-first, premium streaming experience
 */

export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseYear: number;
  genres: string[];
  duration: number; // minutes
  featured?: boolean;
  trending?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  episodeNumber: number;
  seasonNumber: number;
  duration: number; // minutes
  releaseDate: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export interface TVShow {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  releaseYear: number;
  genres: string[];
  seasons: number;
  episodes: Episode[];
  featured?: boolean;
  trending?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  itemCount: number;
  items: PlaylistItem[];
}

export interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
  type: 'movie' | 'episode' | 'clip';
}

// API base URL - adjust this to match your backend URL
const API_BASE_URL = '';

// API helper function
const apiCall = async (endpoint: string, params?: Record<string, string>) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }
  
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// Featured Movies - Default to sync version with real mock data
export const featuredMovies = (): Movie[] => [
  {
    id: 'movie-1',
    title: 'Cosmic Odyssey',
    description: 'A breathtaking journey through cosmos as humanity discovers its place among stars. Stunning visuals and an epic narrative that will captivate audiences worldwide.',
    posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
    rating: 8.9,
    releaseYear: 2024,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    duration: 148,
    featured: true,
    trending: true,
  },
  {
    id: 'movie-2',
    title: 'Neon Nights',
    description: 'A stylish cyberpunk thriller set in a neon-soaked metropolis where technology and humanity collide in unexpected ways.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    rating: 8.5,
    releaseYear: 2024,
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    duration: 132,
    featured: true,
  },
  {
    id: 'movie-3',
    title: 'Echoes of Tomorrow',
    description: 'A mysterious drama about a woman who discovers she can see glimpses of possible futures and must decide which timeline to save.',
    posterUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    rating: 8.2,
    releaseYear: 2023,
    genres: ['Drama', 'Sci-Fi', 'Mystery'],
    duration: 125,
  },
];

// Async version for API calls
export const featuredMoviesAsync = async (): Promise<Movie[]> => {
  return apiCall('/api/movies/featured');
};

// Trending Movies - Default to sync version with real mock data
export const trendingMovies = (): Movie[] => [
  {
    id: 'movie-4',
    title: 'Quantum Realm',
    description: 'An action-packed adventure into subatomic world where heroes must save reality itself.',
    posterUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop',
    rating: 8.7,
    releaseYear: 2024,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    duration: 145,
    trending: true,
  },
  {
    id: 'movie-5',
    title: 'Silent Echoes',
    description: 'A gripping psychological thriller that explores the boundaries between reality and perception.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    rating: 8.4,
    releaseYear: 2024,
    genres: ['Thriller', 'Drama', 'Mystery'],
    duration: 118,
    trending: true,
  },
  {
    id: 'movie-6',
    title: 'Crimson Skies',
    description: 'An epic war drama set during a pivotal moment in history, featuring stunning cinematography and powerful performances.',
    posterUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop',
    rating: 8.6,
    releaseYear: 2023,
    genres: ['Drama', 'War', 'History'],
    duration: 162,
    trending: true,
  },
];

// Async version for API calls
export const trendingMoviesAsync = async (): Promise<Movie[]> => {
  return apiCall('/api/movies/trending');
};

// Popular TV Shows - Default to sync version with real mock data (FIXES YOUR ERROR)
export const popularTVShows = (): TVShow[] => [
  {
    id: 'show-1',
    title: 'Stellar Chronicles',
    description: 'An expansive sci-fi series following multiple storylines across different planets and dimensions.',
    posterUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    rating: 8.8,
    releaseYear: 2022,
    genres: ['Sci-Fi', 'Drama', 'Adventure'],
    seasons: 3,
    episodes: [
      {
        id: 'ep-1-1',
        title: 'The Beginning',
        description: 'The first contact with an alien civilization changes everything.',
        episodeNumber: 1,
        seasonNumber: 1,
        duration: 52,
        releaseDate: '2022-01-15',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video1.m3u8',
      },
      {
        id: 'ep-1-2',
        title: 'First Contact',
        description: 'Humanity must decide how to respond to the alien presence.',
        episodeNumber: 2,
        seasonNumber: 1,
        duration: 54,
        releaseDate: '2022-01-22',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video2.m3u8',
      },
    ],
    featured: true,
    trending: true,
  },
  {
    id: 'show-2',
    title: 'Urban Legends',
    description: 'A thrilling mystery series where each episode explores a different urban legend that turns out to be real.',
    posterUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    rating: 8.3,
    releaseYear: 2023,
    genres: ['Mystery', 'Thriller', 'Drama'],
    seasons: 2,
    episodes: [
      {
        id: 'ep-2-1',
        title: 'The Vanishing',
        description: 'A woman investigates the disappearance of her sister linked to an urban legend.',
        episodeNumber: 1,
        seasonNumber: 1,
        duration: 48,
        releaseDate: '2023-03-10',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video3.m3u8',
      },
    ],
    trending: true,
  },
  {
    id: 'show-3',
    title: 'The Last Frontier',
    description: 'An adventure series following explorers as they discover uncharted territories and ancient civilizations.',
    posterUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1920&h=1080&fit=crop',
    rating: 8.1,
    releaseYear: 2024,
    genres: ['Adventure', 'Drama', 'History'],
    seasons: 1,
    episodes: [
      {
        id: 'ep-3-1',
        title: 'Into the Unknown',
        description: 'The expedition begins their journey into uncharted territory.',
        episodeNumber: 1,
        seasonNumber: 1,
        duration: 56,
        releaseDate: '2024-02-01',
        thumbnailUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video4.m3u8',
      },
    ],
  },
];

// Async version for API calls
export const popularTVShowsAsync = async (): Promise<TVShow[]> => {
  return apiCall('/api/shows/popular');
};

// Playlists - Default to sync version with real mock data
export const playlists = (): Playlist[] => [
  {
    id: 'playlist-1',
    title: 'Sci-Fi Masterpieces',
    description: 'The best science fiction films and series that push the boundaries of imagination.',
    coverUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=400&fit=crop',
    itemCount: 12,
    items: [
      {
        id: 'item-1',
        title: 'Cosmic Odyssey',
        description: 'A breathtaking journey through the cosmos.',
        duration: 148,
        thumbnailUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video1.m3u8',
        type: 'movie',
      },
      {
        id: 'item-2',
        title: 'Quantum Realm',
        description: 'An action-packed adventure into the subatomic world.',
        duration: 145,
        thumbnailUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video2.m3u8',
        type: 'movie',
      },
    ],
  },
  {
    id: 'playlist-2',
    title: 'Thriller Collection',
    description: 'Heart-pounding thrillers that will keep you on the edge of your seat.',
    coverUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop',
    itemCount: 8,
    items: [
      {
        id: 'item-3',
        title: 'Silent Echoes',
        description: 'A gripping psychological thriller.',
        duration: 118,
        thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video3.m3u8',
        type: 'movie',
      },
    ],
  },
  {
    id: 'playlist-3',
    title: 'Movie Parts: The Chronicles',
    description: 'A multi-part epic film series released as individual chapters.',
    coverUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
    itemCount: 5,
    items: [
      {
        id: 'item-4',
        title: 'Part 1: The Beginning',
        description: 'The first chapter of an epic saga.',
        duration: 162,
        thumbnailUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video4.m3u8',
        type: 'movie',
      },
      {
        id: 'item-5',
        title: 'Part 2: The Reckoning',
        description: 'The story continues with new challenges.',
        duration: 158,
        thumbnailUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=320&h=180&fit=crop',
        videoUrl: 'https://example.com/video5.m3u8',
        type: 'movie',
      },
    ],
  },
];

// Async version for API calls
export const playlistsAsync = async (): Promise<Playlist[]> => {
  return apiCall('/api/playlists');
};

// Recently Added - Default to sync version with real mock data
export const recentlyAdded = (): Movie[] => [
  {
    id: 'movie-7',
    title: 'Midnight Pulse',
    description: 'A neo-noir thriller about a detective uncovering secrets in a sprawling metropolis.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    rating: 8.0,
    releaseYear: 2024,
    genres: ['Thriller', 'Crime', 'Drama'],
    duration: 128,
  },
  {
    id: 'movie-8',
    title: 'Forgotten Memories',
    description: 'A poignant drama about reconnecting with the past and finding redemption.',
    posterUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
    rating: 7.9,
    releaseYear: 2024,
    genres: ['Drama', 'Romance', 'Family'],
    duration: 115,
  },
];

// Async version for API calls
export const recentlyAddedAsync = async (): Promise<Movie[]> => {
  return apiCall('/api/movies/recent');
};

// Recommended - Default to sync version with real mock data
export const recommended = (): Movie[] => [
  {
    id: 'movie-9',
    title: 'Stellar Horizons',
    description: 'An inspiring documentary about the future of space exploration and human achievement.',
    posterUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1920&h=1080&fit=crop',
    rating: 8.3,
    releaseYear: 2024,
    genres: ['Documentary', 'Science', 'Adventure'],
    duration: 95,
  },
  {
    id: 'movie-10',
    title: 'The Architect',
    description: 'A suspenseful thriller about a brilliant architect whose designs hide dangerous secrets.',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
    rating: 8.1,
    releaseYear: 2023,
    genres: ['Thriller', 'Drama', 'Mystery'],
    duration: 122,
  },
];

// Async version for API calls
export const recommendedAsync = async (): Promise<Movie[]> => {
  return apiCall('/api/movies/recommended');
};

// All Movies - Default to sync version with real mock data
export const allMovies = (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  search?: string;
}): { movies: Movie[]; pagination?: any } => {
  const allMoviesData = [
    ...featuredMovies(),
    ...trendingMovies(),
    ...recentlyAdded(),
    ...recommended(),
    {
      id: 'movie-11',
      title: 'Aurora Rising',
      description: 'A visually stunning adventure about a group of misfits who must save their world.',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
      backdropUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop',
      rating: 8.2,
      releaseYear: 2024,
      genres: ['Adventure', 'Fantasy', 'Action'],
      duration: 138,
    },
    {
      id: 'movie-12',
      title: 'Void Walkers',
      description: 'A mind-bending sci-fi epic about travelers between dimensions.',
      posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
      backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop',
      rating: 8.4,
      releaseYear: 2024,
      genres: ['Sci-Fi', 'Adventure', 'Mystery'],
      duration: 151,
    },
  ];

  // Apply filters if provided
  let filteredMovies = allMoviesData;
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filteredMovies = filteredMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchLower) || 
      movie.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (params?.genre) {
    filteredMovies = filteredMovies.filter(movie => 
      movie.genres.some(genre => genre.toLowerCase() === params.genre.toLowerCase())
    );
  }

  return { 
    movies: params?.limit ? filteredMovies.slice(0, params.limit) : filteredMovies,
    pagination: { current_page: params?.page || 1, total: filteredMovies.length }
  };
};

// Async version for API calls
export const allMoviesAsync = async (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  search?: string;
}): Promise<{ movies: Movie[]; pagination?: any }> => {
  return apiCall('/api/movies', params);
};

// All TV Shows - Default to sync version with real mock data
export const allTVShows = (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  search?: string;
}): { shows: TVShow[]; pagination?: any } => {
  const allTVShowsData = [
    ...popularTVShows(),
    {
      id: 'show-4',
      title: 'Code Red',
      description: 'A high-octane action series following an elite tactical team.',
      posterUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop',
      backdropUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1920&h=1080&fit=crop',
      rating: 8.0,
      releaseYear: 2023,
      genres: ['Action', 'Drama', 'Thriller'],
      seasons: 2,
      episodes: [
        {
          id: 'ep-4-1',
          title: 'Pilot',
          description: 'The team is assembled for their first mission.',
          episodeNumber: 1,
          seasonNumber: 1,
          duration: 50,
          releaseDate: '2023-05-15',
          thumbnailUrl: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=320&h=180&fit=crop',
          videoUrl: 'https://example.com/video5.m3u8',
        },
      ],
    },
  ];

  // Apply filters if provided
  let filteredShows = allTVShowsData;
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filteredShows = filteredShows.filter(show => 
      show.title.toLowerCase().includes(searchLower) || 
      show.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (params?.genre) {
    filteredShows = filteredShows.filter(show => 
      show.genres.some(genre => genre.toLowerCase() === params.genre.toLowerCase())
    );
  }

  return { 
    shows: params?.limit ? filteredShows.slice(0, params.limit) : filteredShows,
    pagination: { current_page: params?.page || 1, total: filteredShows.length }
  };
};

// Async version for API calls
export const allTVShowsAsync = async (params?: {
  page?: number;
  limit?: number;
  genre?: string;
  search?: string;
}): Promise<{ shows: TVShow[]; pagination?: any }> => {
  return apiCall('/api/shows', params);
};

// Genres - Default to sync version with real data
export const genres = (): string[] => {
  return ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Thriller', 'War'];
};

// Async version for API calls
export const genresAsync = async (): Promise<string[]> => {
  return apiCall('/api/genres');
};

// Search - Default to sync version with real data filtering
export const searchContent = (query: string): {
  movies: Movie[];
  shows: TVShow[];
  playlists: Playlist[];
} => {
  if (!query) {
    return { movies: [], shows: [], playlists: [] };
  }

  const searchLower = query.toLowerCase();
  const allMoviesData = [...featuredMovies(), ...trendingMovies(), ...recentlyAdded(), ...recommended()];
  const allShowsData = [...popularTVShows()];
  const allPlaylistsData = [...playlists()];

  const movieResults = allMoviesData.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchLower) ||
      movie.description.toLowerCase().includes(searchLower)
  );
  
  const showResults = allShowsData.filter(
    (show) =>
      show.title.toLowerCase().includes(searchLower) ||
      show.description.toLowerCase().includes(searchLower)
  );
  
  const playlistResults = allPlaylistsData.filter(
    (playlist) =>
      playlist.title.toLowerCase().includes(searchLower) ||
      playlist.description.toLowerCase().includes(searchLower)
  );
  
  return { movies: movieResults, shows: showResults, playlists: playlistResults };
};

// Async version for API calls
export const searchContentAsync = async (query: string): Promise<{
  movies: Movie[];
  shows: TVShow[];
  playlists: Playlist[];
}> => {
  return apiCall('/api/search', { q: query });
};

// Helper functions - Default to sync versions with real data
export const getMovieById = (id: string): Movie | undefined => {
  const allMoviesData = [...featuredMovies(), ...trendingMovies(), ...recentlyAdded(), ...recommended()];
  return allMoviesData.find((movie) => movie.id === id);
};

// Async version for API calls
export const getMovieByIdAsync = async (id: string): Promise<Movie | undefined> => {
  try {
    // Extract numeric ID from "movie-{id}" format
    const numericId = id.replace('movie-', '');
    const movies = await allMoviesAsync({ search: numericId });
    return movies.movies.find((movie) => movie.id === id);
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    return undefined;
  }
};

export const getTVShowById = (id: string): TVShow | undefined => {
  const allShowsData = [...popularTVShows()];
  return allShowsData.find((show) => show.id === id);
};

// Async version for API calls
export const getTVShowByIdAsync = async (id: string): Promise<TVShow | undefined> => {
  try {
    // Extract numeric ID from "show-{id}" format
    const numericId = id.replace('show-', '');
    const shows = await allTVShowsAsync({ search: numericId });
    return shows.shows.find((show) => show.id === id);
  } catch (error) {
    console.error('Error fetching TV show by ID:', error);
    return undefined;
  }
};

export const getPlaylistById = (id: string): Playlist | undefined => {
  const allPlaylistsData = [...playlists()];
  return allPlaylistsData.find((playlist) => playlist.id === id);
};

// Async version for API calls
export const getPlaylistByIdAsync = async (id: string): Promise<Playlist | undefined> => {
  try {
    // Extract numeric ID from "playlist-{id}" format
    const numericId = id.replace('playlist-', '');
    const playlistsData = await playlistsAsync();
    return playlistsData.find((playlist) => playlist.id === id);
  } catch (error) {
    console.error('Error fetching playlist by ID:', error);
    return undefined;
  }
};

// Additional API utility functions for pagination
export const getMoviesByPage = async (page: number = 1, limit: number = 20): Promise<Movie[]> => {
  const result = await allMovies({ page, limit });
  return result.movies;
};

export const getShowsByPage = async (page: number = 1, limit: number = 20): Promise<TVShow[]> => {
  const result = await allTVShows({ page, limit });
  return result.shows;
};

export const getMoviesByGenre = async (genre: string, page: number = 1, limit: number = 20): Promise<Movie[]> => {
  const result = await allMovies({ genre, page, limit });
  return result.movies;
};

export const getShowsByGenre = async (genre: string, page: number = 1, limit: number = 20): Promise<TVShow[]> => {
  const result = await allTVShows({ genre, page, limit });
  return result.shows;
};

// Error handling wrapper
export const safeApiCall = async <T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API call failed, using fallback:', error);
    return fallback;
  }
};

// Export types for external use
export type { Movie, TVShow, Episode, Playlist, PlaylistItem };
