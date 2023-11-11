import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      genres
      title
      small_cover_image
    }
  }
`;
export default function Movie() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  if (loading) {
    return <h1>Fetching Movie...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <>
      <img src={data.movie.small_cover_image} />
      <ul>
        <li>{data.movie.id}</li>
        <li>{data.movie.title}</li>
        <li>
          {data.movie.genres?.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </li>
      </ul>
    </>
  );
}
