import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

export default function Movies() {
  const client = useApolloClient();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, [client]);
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}
