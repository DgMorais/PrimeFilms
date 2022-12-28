import { Link } from 'react-router-dom';
import './styles.css';
import favorites_icon from '../../Assets/icons/favorites.png';

function Header() {
  return (
    <header>
      <div className="header-top">
        <Link className='text-logo' to='/'>Prime Films</Link>
        <div className='search'>
          <form action={<Link to='' />} method='POST'>
            <input type="text" placeholder='Pesquisar...' />
            <button type='submit'>Pesquisar</button>
          </form>
        </div>
        <div className='user-area'>
          <Link to='/favorites' id='favorites'>
            <img src={favorites_icon} alt='Favoritos' />
            Favoritos
          </Link>
        </div>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/categories'>Categorias</Link></li>
          <li><Link to='/infos'>Informações</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
