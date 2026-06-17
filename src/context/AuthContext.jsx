import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('streamflix_user');
    const storedList = localStorage.getItem('streamflix_mylist');
    const storedHistory = localStorage.getItem('streamflix_history');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedList) setMyList(JSON.parse(storedList));
    if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
    setLoading(false);
  }, []);

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('streamflix_users') || '[]');
    const exists = users.find(u => u.email === email);
    if (exists) return { success: false, error: 'Email already registered.' };
    const newUser = { id: Date.now(), name, email, password, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}` };
    users.push(newUser);
    localStorage.setItem('streamflix_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('streamflix_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('streamflix_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('streamflix_user', JSON.stringify(safeUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamflix_user');
  };

  const addToMyList = (movie) => {
    const updated = [...myList, movie];
    setMyList(updated);
    localStorage.setItem('streamflix_mylist', JSON.stringify(updated));
  };

  const removeFromMyList = (movieId) => {
    const updated = myList.filter(m => m.id !== movieId);
    setMyList(updated);
    localStorage.setItem('streamflix_mylist', JSON.stringify(updated));
  };

  const isInMyList = (movieId) => myList.some(m => m.id === movieId);

  const addToHistory = (movie) => {
    const filtered = watchHistory.filter(m => m.id !== movie.id);
    const updated = [movie, ...filtered].slice(0, 10);
    setWatchHistory(updated);
    localStorage.setItem('streamflix_history', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, myList, watchHistory, loading, signup, login, logout, addToMyList, removeFromMyList, isInMyList, addToHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
