import { Link } from 'react-router-dom';
import './styles.css';

function Error() {
  return (
    <div className='container'>
      <div className="not-found">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <Link to='/'>Voltar para a página inicial</Link>
      </div>
    </div>
  );
}

export default Error;
