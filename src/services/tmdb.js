const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;

export async function getPopularMovies() {
  if (!apiKey || !baseUrl) {
    throw new Error('TMDB API configuration is missing.');
  }

  const response = await fetch(
    `${baseUrl}/movie/popular?api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(`Unable to load popular movies (${response.status}).`);
  }

  const data = await response.json();
  return data.results;
}
