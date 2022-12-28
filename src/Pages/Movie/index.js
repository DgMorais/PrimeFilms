import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../../Services/api';
import { toast } from 'react-toastify';

import './styles.css';
import arrow_left from '../../Assets/icons/left-arrow.png';

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api.get(process.env.REACT_APP_MOVIE_URL + id, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'pt-BR'
        }
      })
      .then(response => {
        console.log(response.data);
        setMovie(response.data);
        setLoading(false);
      })
      .catch(error => {
        navigate('/', { replace: true });
        return;
      });
    }

    loadMovie();

    return () => {
      setMovie([]);
    }
  }, [navigate, id]);

  if (loading) {
    return (
      <div className='container'>
        <div className="loading">
          <div className='c-loader'></div>
        </div>
      </div>
    );
  }

  function saveMovie() {
    const movieList = localStorage.getItem('@primefilms');

    let moviesSaved = JSON.parse(movieList) || [];

    const hasMovie = moviesSaved.some((movieSaved) => movieSaved.id === movie.id);

    if (hasMovie) {
      toast.warning('Você já salvou esse filme!');
      return;
    }

    moviesSaved.push(movie);
    localStorage.setItem('@primefilms', JSON.stringify(moviesSaved));
    toast.success('Filme salvo com sucesso!');
  }

  return (
    <div className='container'>
      <Link to='/' className='back-link'>
        <img src={arrow_left} alt='Voltar' className='back-link' /> Voltar para página inicial
      </Link>
      <div className='movie'>
        <div className='img-movie'>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
        <div className='movie-info'>
          <div className="some-infos">
            <div className="basic-info">
              <h2><strong>{movie.title}</strong></h2>
              <span><strong>Sinopse</strong></span>
              <span>{movie.overview}</span>
            </div>
            <div className='area-buttons'>
              <a href={`https://youtube.com/results?search_query=${movie.title}+trailer`} target='blank' rel='external'>Trailer</a>
              <button onClick={saveMovie}>Salvar</button>
            </div>
          </div>
          <div className="other-infos">
            <strong>Avaliação:</strong> <span>{movie.vote_average.toFixed(1)} / 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
