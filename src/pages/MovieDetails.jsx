import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getMovieById, getSimilarMovies } from '../data/movies';
import { useAuth } from '../context/AuthContext';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInMyList, addToMyList, removeFromMyList, addToHistory } = useAuth();
  const [loaded, setLoaded] = useState(false);

  const movie = getMovieById(id);
  const similar = movie ? getSimilarMovies(movie) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6">🎬</div>
        <h1 className="text-white text-2xl font-bold mb-3">Movie not found</h1>
        <p className="text-netflix-gray mb-6">This title may no longer be available.</p>
        <button onClick={() => navigate('/')} className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors">
          Back to Home
        </button>
      </div>
    );
  }

  const inList = isInMyList(movie.id);

  const handlePlay = () => {
    addToHistory(movie);
    // simulate play
  };

  const ratingColor = movie.rating >= 8 ? 'text-green-400' : movie.rating >= 7 ? 'text-yellow-400' : 'text-netflix-lightgray';

  return (
    <div className="min-h-screen bg-netflix-black">
      {/* Hero */}
      <div className="relative h-[50vw] min-h-[320px] max-h-[640px] w-full">
        <img
          src={movie.backdrop}
          alt={movie.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-black/40" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-6 md:left-12 flex items-center gap-2 text-white hover:text-netflix-lightgray transition-colors bg-black/40 hover:bg-black/60 rounded-full px-4 py-2 backdrop-blur-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Details */}
      <div className="px-6 md:px-12 -mt-48 relative z-10 animate-slide-up">
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl">
          {/* Poster */}
          <div className="flex-shrink-0">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-40 md:w-56 rounded-lg shadow-2xl shadow-black/60 border border-white/10"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-4">
            {/* Genre */}
            <span className="text-netflix-red text-xs font-bold uppercase tracking-widest">{movie.genre}</span>

            <h1 className="text-white text-4xl md:text-5xl font-black mt-2 mb-4 leading-tight">{movie.title}</h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`font-bold text-lg ${ratingColor}`}>★ {movie.rating}</span>
              <span className="text-netflix-lightgray">{movie.year}</span>
              <span className="border border-netflix-gray/50 text-netflix-lightgray text-xs px-2 py-0.5 rounded">{movie.duration}</span>
              <span className="bg-white/10 text-netflix-lightgray text-xs px-2 py-0.5 rounded">{movie.category === 'tvshows' ? 'TV Series' : 'Movie'}</span>
              <span className="text-green-400 text-sm font-semibold">{Math.round(movie.rating * 10)}% Match</span>
            </div>

            <p className="text-netflix-lightgray text-base leading-relaxed mb-8 max-w-xl">
              {movie.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handlePlay}
                className="flex items-center gap-2 bg-white hover:bg-white/90 text-black font-bold px-8 py-3 rounded-md transition-all duration-200 text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Play
              </button>

              <button
                onClick={() => inList ? removeFromMyList(movie.id) : addToMyList(movie)}
                className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-md transition-all duration-200 text-sm border ${inList ? 'bg-white/10 border-white/30 text-white hover:bg-red-900/30 hover:border-red-500/50 hover:text-red-400' : 'bg-white/10 border-white/30 text-white hover:bg-white/20'}`}
              >
                {inList ? (
                  <>
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                    In My List
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
                    Add to My List
                  </>
                )}
              </button>

              <button className="w-11 h-11 rounded-full border border-white/40 hover:border-white flex items-center justify-center text-white transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-netflix-gray">Genre: </span>
                <span className="text-white">{movie.genre}</span>
              </div>
              <div>
                <span className="text-netflix-gray">Year: </span>
                <span className="text-white">{movie.year}</span>
              </div>
              <div>
                <span className="text-netflix-gray">Rating: </span>
                <span className="text-white">{movie.rating} / 10</span>
              </div>
              <div>
                <span className="text-netflix-gray">Duration: </span>
                <span className="text-white">{movie.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-white text-2xl font-bold mb-6">More Like This</h2>
            <div className="flex gap-3 flex-wrap">
              {similar.map((m, i) => (
                <MovieCard key={m.id} movie={m} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
