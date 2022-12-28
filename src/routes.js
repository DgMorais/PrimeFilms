import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'; // importa o BrowserRouter, Route, Routes e Switch do react-router-dom
import { ToastContainer } from 'react-toastify'; // importa o toastify
import 'react-toastify/dist/ReactToastify.css'; // importa o css do toastify

import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import Movie from './Pages/Movie';
import Error from './Pages/Error';
import Favorites from './Pages/Favorites';

function RoutesApp() {
    return (
        <BrowserRouter>
          <ToastContainer autoClos={3000}/>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='movie/:id' element={<Movie />} />
            <Route path='/favorites' element={<Favorites />} />

            <Route path='*' element={<Error />} />
          </Routes>
          <Footer />
        </BrowserRouter>
    )
}

export default RoutesApp;
