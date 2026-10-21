import { useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/tmdb';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        setMovies(await getPopularMovies());
      } catch (requestError) {
        setError(requestError.message);
      }
    }

    loadPopularMovies();
  }, []);

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>Popular Movies</h2>
        <p>Discover and save your favorite films</p>
      </div>
      {error ? (
        <div className="empty-state">
          <p>{error}</p>
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </main>
  );
};

export default Home;