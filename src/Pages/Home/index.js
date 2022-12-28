import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/api';
import './styles.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilms() {
      const response = await api.get(process.env.REACT_APP_URL_API, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'pt-BR',
          sort_by: 'popularity.desc',
          page: 1
        }
      });

      setMovies(response.data.results);
      setLoading(false);
    }

    loadFilms();
  }, []);

  if (loading) {
    return (
      <div className='container'>
        <div className="loading">
          <div className='c-loader'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='movies-list'>
        {
          movies.map((movie) => {
            return (
              <article key={movie.id}>
                <div className='movies-img'>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className='movies-info'>
                  <div className="infos">
                    <h2><strong>{movie.title}</strong></h2>
                    <span>{movie.overview}</span>
                  </div>
                  <Link to={`/movie/${movie.id}`}>Detalhes</Link>
                </div>
              </article>
            );
          })
        }
      </div>
    </div>
  );
}

export default Home;
