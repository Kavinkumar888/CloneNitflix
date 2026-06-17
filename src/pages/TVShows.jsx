import { useMemo } from 'react';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getTVShows } from '../data/movies';

export default function TVShows() {
  const shows = useMemo(() => getTVShows(), []);

  return (
    <div className="min-h-screen bg-netflix-black pt-24">
      <div className="px-6 md:px-12">
        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-black mb-2">TV Shows</h1>
          <p className="text-netflix-gray">{shows.length} series available</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 pb-8">
          {shows.map((show, i) => (
            <MovieCard key={show.id} movie={show} index={i} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
