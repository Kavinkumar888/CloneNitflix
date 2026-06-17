import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieDetails from './pages/MovieDetails';
import MyList from './pages/MyList';
import TVShows from './pages/TVShows';
import Movies from './pages/Movies';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-netflix-black flex items-center justify-center"><div className="text-netflix-red font-black text-2xl animate-pulse">STREAMFLIX</div></div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : children;
}

function NavbarWrapper({ onSearch }) {
  const location = useLocation();
  const hideNav = ['/login', '/signup'].includes(location.pathname);
  if (hideNav) return null;
  return <Navbar onSearch={onSearch} />;
}

function AppRoutes() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-netflix-black min-h-screen">
      <NavbarWrapper onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

