import '../src/Pages/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { TvShow } from './Pages/TvShow/TvShow';
import Detials from './Pages/Detials/Detials';
import Movies from './Pages/Movies/Movies';
import Search from './Pages/Search/Search';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tvshow' element={<TvShow />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/:mediaType/:id' element={<Detials />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
