import { useState, useEffect, useMemo } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { movies, getTrending, getTopRated, getTVShows, getMoviesOnly, genres } from '../data/movies';

export default function Home({ searchQuery }) {
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = movies;
    if (searchQuery) {
      list = list.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.genre.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedGenre !== 'All') {
      list = list.filter(m => m.genre === selectedGenre);
    }
    return list;
  }, [searchQuery, selectedGenre]);

  const trending = useMemo(() => getTrending(), []);
  const topRated = useMemo(() => getTopRated(), []);
  const tvShows = useMemo(() => getTVShows(), []);
  const moviesOnly = useMemo(() => getMoviesOnly(), []);

  const isSearching = searchQuery && searchQuery.length > 0;
  const isFiltering = selectedGenre !== 'All';

  return (
    <div className="min-h-screen bg-netflix-black">
      {!isSearching && <Banner movies={trending} />}

      <div className={`${isSearching ? 'pt-24' : '-mt-24 relative z-10'}`}>
        {/* Genre filter */}
        <div className="px-6 md:px-12 mb-6 flex items-center gap-2 overflow-x-auto scrollbar-hide pt-4" style={{ scrollbarWidth: 'none' }}>
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedGenre === g ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}
            >
              {g}
            </button>
          ))}
        </div>

        {isSearching || isFiltering ? (
          <div className="px-6 md:px-12">
            <h2 className="text-white text-xl font-bold mb-4">
              {isSearching ? `Results for "${searchQuery}"` : `${selectedGenre} Titles`}
              <span className="text-netflix-gray text-base font-normal ml-2">({filtered.length} titles)</span>
            </h2>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-16 h-16 text-netflix-gray mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-white text-lg font-semibold mb-2">No results found</p>
                <p className="text-netflix-gray">Try a different search term or genre.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
                {filtered.map((movie, i) => (
                  <MovieCard key={movie.id} movie={movie} index={i} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <MovieRow title="🔥 Trending Now" movies={trending} loading={loading} />
            <MovieRow title="⭐ Top Rated" movies={topRated} loading={loading} />
            <MovieRow title="📺 TV Shows" movies={tvShows} loading={loading} />
            <MovieRow title="🎬 Movies" movies={moviesOnly} loading={loading} />
            <MovieRow title="All Titles" movies={movies} loading={loading} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
