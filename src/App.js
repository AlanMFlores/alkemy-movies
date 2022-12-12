import './App.css';
import Login from './components/Login';
import Trending from './components/Trending';
import Movies from './components/Movies';
import Header from './components/Header';
import MovieDetails from './components/MovieDetails';
import TVDetails from './components/TVDetails';
import Results from './components/Results';
import Releases from './components/Releases';
import Footer from './components/Footer';
import {Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import heart from '../src/images/heart.svg';
import Favorites from './components/Favorites';
import TVShows from './components/TVShows';

function App() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
      const favsInLocal = localStorage.getItem('favs');
      if(favsInLocal !== null) {
          const favsArray = JSON.parse(favsInLocal);
          setFavorites(favsArray);
      }
  }, [])

  const favMovies = localStorage.getItem('favs');

  let tempMoviesInFavs;

  favMovies === null ? tempMoviesInFavs = [] : tempMoviesInFavs = JSON.parse(favMovies);

  const addOrRemoveFromFavs = e => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h3').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(movie => {
      return movie.id === movieData.id
    })

    if(!movieIsInArray) {
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs);
    } else { 
      let moviesLeft = tempMoviesInFavs.filter(movie => {
        return movie.id !== movieData.id;
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      setFavorites(moviesLeft)
    }

  }

  return (
      <div className='flex flex-col items-center'>
        <Header favorites={favorites}/>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Trending addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
          <Route path='/movies' element={<Movies addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites}/>} />
          <Route path='/tv' element={<TVShows addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
          <Route path='/movie-details/:movieId' element={<MovieDetails/>} />
          <Route path='/tvshow-details/:tvId' element={<TVDetails/>} />
          <Route path='/results/:resultQuery' element={<Results/>} />
          <Route path='/favorites' element={<Favorites favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
          <Route path='/releases' element={<Releases addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
