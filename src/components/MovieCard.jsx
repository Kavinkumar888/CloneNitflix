import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MovieCard({ movie, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const { isInMyList, addToMyList, removeFromMyList, addToHistory, user } = useAuth();

  const inList = isInMyList(movie.id);

  const handlePlay = (e) => {
    e.stopPropagation();
    addToHistory(movie);
    navigate(`/movie/${movie.id}`);
  };

  const handleListToggle = (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    if (inList) removeFromMyList(movie.id);
    else addToMyList(movie);
  };

  const ratingColor = movie.rating >= 8 ? 'text-green-400' : movie.rating >= 7 ? 'text-yellow-400' : 'text-netflix-lightgray';

  return (
    <div
      className="relative flex-shrink-0 w-36 sm:w-44 md:w-48 cursor-pointer group"
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* Poster */}
      <div className="relative rounded-md overflow-hidden aspect-[2/3] bg-gray-800">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%]" />
        )}
        <img
          src={movie.image}
          alt={movie.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300`} />

        {/* Top badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-netflix-red text-white text-xs font-bold px-1.5 py-0.5 rounded">
            {movie.rating}
          </span>
        </div>

        {/* Quick action on hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-2 flex gap-1.5 transition-all duration-200 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={handlePlay}
            className="flex-1 bg-white hover:bg-white/90 text-black text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            Play
          </button>
          <button
            onClick={handleListToggle}
            className="w-8 h-8 bg-black/60 hover:bg-black/80 border border-white/40 rounded flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            {inList ? (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Info below card */}
      <div className={`mt-2 transition-all duration-200 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-white text-xs font-semibold truncate">{movie.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-xs font-medium ${ratingColor}`}>{movie.rating}★</span>
          <span className="text-netflix-gray text-xs">{movie.year}</span>
          <span className="text-netflix-gray text-xs">•</span>
          <span className="text-netflix-gray text-xs truncate">{movie.genre}</span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44 md:w-48">
      <div className="rounded-md overflow-hidden aspect-[2/3] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer bg-[length:200%_100%]" />
      <div className="mt-2 h-3 w-3/4 bg-gray-700 rounded animate-pulse" />
      <div className="mt-1 h-3 w-1/2 bg-gray-800 rounded animate-pulse" />
    </div>
  );
}
