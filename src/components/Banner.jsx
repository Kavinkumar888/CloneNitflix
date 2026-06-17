import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Banner({ movies }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { isInMyList, addToMyList, removeFromMyList, addToHistory } = useAuth();

  const featured = movies?.slice(0, 5) || [];
  const movie = featured[current];

  useEffect(() => {
    if (!featured.length) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % featured.length);
      setLoaded(false);
    }, 7000);
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!movie) return null;

  const inList = isInMyList(movie.id);

  const handlePlay = () => {
    addToHistory(movie);
    navigate(`/movie/${movie.id}`);
  };

  const handleListToggle = () => {
    if (inList) removeFromMyList(movie.id);
    else addToMyList(movie);
  };

  return (
    <div className="relative h-[56vw] min-h-[380px] max-h-[720px] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          key={movie.id}
          src={movie.backdrop}
          alt={movie.title}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-16 pb-16 md:pb-24">
        {/* Genre badge */}
        <div className="mb-3">
          <span className="text-xs font-semibold tracking-widest text-netflix-red uppercase">{movie.genre}</span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 max-w-2xl leading-tight animate-slide-up">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 mb-4 text-sm text-netflix-lightgray">
          <span className="text-green-400 font-bold">{Math.round(movie.rating * 10)}% Match</span>
          <span>{movie.year}</span>
          <span className="border border-netflix-gray px-1.5 py-0.5 text-xs rounded">{movie.rating}</span>
          <span>{movie.duration}</span>
        </div>

        <p className="text-netflix-lightgray text-sm md:text-base max-w-md md:max-w-lg mb-6 leading-relaxed line-clamp-3">
          {movie.description}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-white hover:bg-white/80 text-black font-bold px-6 py-2.5 rounded-md transition-all duration-200 text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2.5 rounded-md transition-all duration-200 backdrop-blur-sm text-sm md:text-base"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </button>
          <button
            onClick={handleListToggle}
            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/60 hover:border-white bg-black/30 text-white transition-all duration-200"
            title={inList ? 'Remove from My List' : 'Add to My List'}
          >
            {inList ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center gap-2 mt-6">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setLoaded(false); }}
              className={`transition-all duration-300 rounded-full ${i === current ? 'w-6 h-1.5 bg-netflix-red' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>

      {/* Right side preview strip */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 z-10">
        {featured.map((m, i) => (
          <button
            key={m.id}
            onClick={() => { setCurrent(i); setLoaded(false); }}
            className={`w-20 h-12 rounded overflow-hidden border-2 transition-all ${i === current ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-75'}`}
          >
            <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
