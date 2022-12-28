import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

import trash from '../../Assets/icons/trash.png';

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const movieList = localStorage.getItem('@primefilms');

    setMovies(JSON.parse(movieList) || []);
  }, []);

  function deleteMovie(movieId) {
    let movieFilter = movies.filter((movie) => movie.id !== movieId);

    setMovies(movieFilter);
    localStorage.setItem('@primefilms', JSON.stringify(movieFilter));
    toast.success('Filme excluído com sucesso!');
  }

  return (
    <div className='container'>
      <div className='area-favorites'>
        <div className="favorites">
          <h1 className='title-favorites'>Favoritos</h1>
          {
            movies.length === 0 && <span>Você não possui nenhum filme salvo :(</span>
          }
          <ul className='list-favorites'>
            {
              movies.map(movie => {
                return (
                  <li key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-favorites-info">
                      <h2>{movie.title}</h2>
                      <p>{movie.overview}</p>
                    </div>
                    <div className='area-favorites-btn'>
                      <Link to={`/movie/${movie.id}`} className='favorites-btn'>Ver detalhes</Link>
                      <button onClick={() => deleteMovie(movie.id)} className='favorites-btn'>
                        <img src={trash} alt='Delete' />
                        Excluir
                      </button>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
