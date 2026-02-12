/**
 * Normalise une valeur entre 0 et 1
 */
function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

/**
 * Calcule un score personnalisé pour chaque film
 */
export function computeMovieScores(movies) {
  const popularities = movies.map(m => m.popularity);
  const votes = movies.map(m => m.vote_count);

  const minPop = Math.min(...popularities);
  const maxPop = Math.max(...popularities);

  const minVotes = Math.min(...votes);
  const maxVotes = Math.max(...votes);

  const currentYear = new Date().getFullYear();

  return movies.map(movie => {
    const normalizedRating = movie.vote_average / 10;

    const normalizedPopularity = normalize(movie.popularity, minPop, maxPop);

    const normalizedVotes = normalize(
      Math.log10(movie.vote_count + 1),
      Math.log10(minVotes + 1),
      Math.log10(maxVotes + 1)
    );

    const releaseYear = movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : currentYear;

    const age = currentYear - releaseYear;
    const recencyScore = Math.max(0, 1 - age / 20);

    const score =
      normalizedRating * 0.4 +
      normalizedPopularity * 0.25 +
      normalizedVotes * 0.2 +
      recencyScore * 0.15;

    return { ...movie, score };
  });
}