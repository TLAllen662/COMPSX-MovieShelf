import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getFavoriteMovies } from '../utils/favorites';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    function loadFavoriteMovies() {
      try {
        setFavoriteMovies(getFavoriteMovies());
        setError('');
      } catch (storageError) {
        setError(storageError.message);
      }
    }

    loadFavoriteMovies();
    window.addEventListener('favoriteschange', loadFavoriteMovies);

    return () => {
      window.removeEventListener('favoriteschange', loadFavoriteMovies);
    };
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {error ? (
        <div className="empty-state">
          <p>{error}</p>
        </div>
      ) : favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  );
};

export default Favorites;