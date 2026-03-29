import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ListingFeed from './components/ListingFeed';
import AuthModal from './components/AuthModal';
import PostListingModal from './components/PostListingModal';
import { fetchListings } from './services/api';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAuth, setShowAuth] = useState(false);
  const [showPost, setShowPost] = useState(false);

  const loadListings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchListings();
      setListings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadListings();
  }, [loadListings]);

  const handlePostListing = () => {
    if (!user) {
      setShowAuth(true);
    } else {
      setShowPost(true);
    }
  };

  const filtered = activeCategory === 'All'
    ? listings
    : listings.filter((l) => l.category === activeCategory);

  return (
    <>
      <Navbar
        onSignIn={() => setShowAuth(true)}
        onPostListing={handlePostListing}
      />

      <main className="main-content">
        <Hero />

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <hr className="divider" />

        <div className="feed-stats">
          {!loading && !error && (
            <p className="results-count">
              {filtered.length} listing{filtered.length !== 1 ? 's' : ''} found
              {activeCategory !== 'All' ? ` in ${activeCategory.replace('_', ' ')}` : ''}
            </p>
          )}
        </div>

        <ListingFeed listings={filtered} loading={loading} error={error} onRefresh={loadListings} />
      </main>

      <footer className="site-footer">
        <p>Made with ❤️ · CampusTrade {new Date().getFullYear()}</p>
      </footer>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {showPost && (
        <PostListingModal
          onClose={() => setShowPost(false)}
          onSuccess={loadListings}
        />
      )}
    </>
  );
}
