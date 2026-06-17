import { useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getMoviesOnly } from '../data/movies';

export default function Movies() {
  const movies = useMemo(() => getMoviesOnly(), []);

  return (
    <div className="min-h-screen bg-netflix-black pt-24">
      <div className="px-6 md:px-12">
        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-black mb-2">Movies</h1>
          <p className="text-netflix-gray">{movies.length} films available</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 pb-8">
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
