import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function MyList() {
  const { myList, user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-6">🔐</div>
        <h1 className="text-white text-2xl font-bold mb-3">Sign in to view your list</h1>
        <p className="text-netflix-gray mb-6">Create a personal list of your favorite titles.</p>
        <button onClick={() => navigate('/login')} className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black pt-24">
      <div className="px-6 md:px-12">
        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-black mb-2">My List</h1>
          <p className="text-netflix-gray">
            {myList.length === 0 ? 'Your list is empty' : `${myList.length} title${myList.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>

        {myList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-netflix-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold mb-3">Nothing here yet</h2>
            <p className="text-netflix-gray mb-6 max-w-sm">Add movies and shows to your list by clicking the + button on any title.</p>
            <button onClick={() => navigate('/')} className="bg-white hover:bg-white/90 text-black font-bold px-6 py-2.5 rounded-md transition-colors">
              Browse Titles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 pb-8">
            {myList.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
