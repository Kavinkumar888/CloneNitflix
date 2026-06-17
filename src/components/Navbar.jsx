import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
    if (val && location.pathname !== '/') navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'TV Shows', path: '/tvshows' },
    { label: 'Movies', path: '/movies' },
    { label: 'My List', path: '/mylist' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-netflix-black shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex-shrink-0">
            <span className="text-netflix-red font-black text-2xl md:text-3xl tracking-tight select-none">STREAMFLIX</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-netflix-lightgray'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/80 border border-white/40 rounded px-3 py-1.5 gap-2">
                <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={handleSearch}
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                  className="bg-transparent text-white text-sm outline-none w-40 md:w-56 placeholder-netflix-gray"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); onSearch?.(''); setSearchOpen(false); }} className="text-white/60 hover:text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="text-white hover:text-netflix-lightgray transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Profile */}
          {user ? (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded bg-netflix-red flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <svg className={`w-3 h-3 text-white transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-12 w-48 bg-netflix-black border border-white/10 rounded shadow-xl py-2 animate-fade-in">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-white text-sm font-medium truncate">{user.name}</p>
                    <p className="text-netflix-gray text-xs truncate">{user.email}</p>
                  </div>
                  <Link to="/mylist" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-netflix-lightgray hover:text-white hover:bg-white/5 transition-colors text-sm">
                    My List
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-netflix-lightgray hover:text-white hover:bg-white/5 transition-colors text-sm">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-netflix-red hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-netflix-black border-t border-white/10 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 transition-colors ${location.pathname === link.path ? 'text-white' : 'text-netflix-lightgray'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
