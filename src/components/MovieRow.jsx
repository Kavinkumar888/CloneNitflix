import { useRef, useState } from 'react';
import MovieCard, { SkeletonCard } from './MovieCard';

export default function MovieRow({ title, movies, loading = false }) {
  const rowRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (!loading && (!movies || movies.length === 0)) return null;

  return (
    <div className="mb-8 md:mb-10 group/row">
      <h2 className="text-white font-bold text-lg md:text-xl px-6 md:px-12 mb-3 tracking-wide">{title}</h2>

      <div className="relative px-6 md:px-12">
        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-r from-netflix-black/90 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
          >
            <div className="bg-black/70 hover:bg-black rounded-full p-2 border border-white/20 hover:border-white/40 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}

        {/* Cards */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : movies.map((movie, i) => <MovieCard key={movie.id} movie={movie} index={i} />)
          }
        </div>

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center bg-gradient-to-l from-netflix-black/90 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
          >
            <div className="bg-black/70 hover:bg-black rounded-full p-2 border border-white/20 hover:border-white/40 transition-all">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
