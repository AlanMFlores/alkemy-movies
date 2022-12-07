import React from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import emptyHeart from '../images/empty-heart.svg'

const Trending = ( props ) => {
    let token = sessionStorage.getItem('token');

    const MySwal = withReactContent(Swal);

    const [trendingMovieList, setTrendingMovieList] = useState([])
    const [trendingTVList, setTrendingTVList] = useState([])
    
    useEffect(() => {
      const endPointMovie = 'https://api.themoviedb.org/3/trending/movie/day?api_key=5891f0824a46470ad64bb3e67a7e8289';

      axios.get(endPointMovie)
        .then(res => {
          const apiData = res.data;
          setTrendingMovieList(apiData.results)
        })
        .catch(error => {
          new MySwal({
              icon: 'error',
              text: 'Hubo un error, intente nuevamente más tarde'
            }
          )
        }) 
    }, [setTrendingMovieList])

    useEffect(() => {
      const endPointTV = 'https://api.themoviedb.org/3/trending/tv/day?api_key=5891f0824a46470ad64bb3e67a7e8289';

      axios.get(endPointTV)
        .then(res => {
            const apiData = res.data;
            setTrendingTVList(apiData.results)
        })
        .catch(error => {
            new MySwal({
                icon: 'error',
                text: 'Hubo un error, intente nuevamente más tarde'
              }
            )
          }) 
    }, [setTrendingTVList])

  return (
    <>
    {
      !token && <Navigate replace to='/'/>
    }
    <div>
      <h1 className='mb-4 mt-8 text-2xl font-medium'>Películas Destacadas</h1>
      <div className='grid grid-container gap-4 mb-8'>
        {
          trendingMovieList.map(trending => (
            <div className='relative flex flex-col card bg-slate-100 p-4 w-72' key={trending.id}>
              <h3 className='text-md font-medium mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{trending.title}</h3>
              <figure className='object-cover h-96 mb-4'>
                <img src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`} alt={trending.title} className='mb-2 w-full h-full'/>
              </figure>
              <button onClick={props.addOrRemoveFromFavs} data-movie-id={trending.id}>
                <img src={emptyHeart} alt='empty heart' className='w-6 absolute top-16 right-8 drop-shadow-sm'/>
              </button>
              <p className='mb-4 h-16 text-ellipsis'>{trending.overview.substring(0, 90)}...</p>
              <Link to={`/movie-details/${trending.id}`} className='block bg-sky-400 hover:bg-sky-600 p-2 ease-in duration-300 text-white text-center justify-end'>Ver Detalles</Link>
            </div>
          ))
        }
      </div>
    </div>
    <div>
      <h1 className='mb-4 mt-8 text-2xl font-medium'>Series de TV Destacadas</h1>
      <div className='grid grid-container gap-4 mb-8'>
        {
          trendingTVList.map(trending => (
            <div className='relative flex flex-col card bg-slate-100 p-4 w-72' key={trending.id}>
              <h3 className='text-md font-medium mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{trending.name}</h3>
              <figure className='object-cover h-96 mb-4'>
                <img src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`} alt={trending.name} className='mb-2 w-full h-full'/>
              </figure>
              <button onClick={props.addOrRemoveFromFavs} data-movie-id={trending.id}>
                <img src={emptyHeart} alt='empty heart' className='w-6 absolute top-16 right-8 drop-shadow-sm'/>
              </button>
              <p className='mb-4 h-16 text-ellipsis'>{trending.overview.substring(0, 90)}...</p>
              <Link to={`/tvshow-details/${trending.id}`} className='block bg-sky-400 hover:bg-sky-600 p-2 ease-in duration-300 text-white text-center justify-end'>Ver Detalles</Link>
            </div>
          ))
        }
      </div>
    </div>
  </>
  )
}

export default Trending