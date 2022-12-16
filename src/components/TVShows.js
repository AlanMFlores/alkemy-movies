import React from 'react'
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import emptyHeart from '../images/empty-heart.svg'
import { data } from 'autoprefixer';

const TVShows = ( props ) => {
  const MySwal = withReactContent(Swal);

  const [tvShow, setTvShow] = useState([])
  
  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/tv/popular?api_key=5891f0824a46470ad64bb3e67a7e8289&language=en-US&page=1%20Powered%20By%20Stoplight';

    axios.get(endPoint)
      .then(res => {
        const apiData = res.data;
        setTvShow(apiData.results)
      })
      .catch(error => {
        new MySwal({
            icon: 'error',
            text: 'Hubo un error, intente nuevamente más tarde'
          }
        )
      }) 
    
  }, [setTvShow])
  
  return (
    <>
      <div>
        <h1 className='mb-4 mt-8 text-2xl font-medium'>Series de TV Recomendadas</h1>
        <div className='grid grid-container gap-4 mb-8'>
          {
            tvShow.map(show => (
              <div className='relative flex flex-col card bg-slate-100 p-4 w-72' key={show.id}>
                <h3 className='text-md font-medium mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{show.name}</h3>
                <figure className='object-cover h-96 mb-4'>
                  <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className='mb-2 w-full h-full'/>
                </figure>
                <button onClick={props.addOrRemoveFromFavs} data-movie-id={show.id}>
                  <img src={emptyHeart} alt='empty heart' className='w-6 absolute top-16 right-8 drop-shadow-sm'/>
                </button>
                <p className='mb-4 h-16 text-ellipsis'>{show.overview.substring(0, 90)}...</p>
                <Link to={`/tvshow-details/${show.id}`} className='block bg-sky-400 hover:bg-sky-600 p-2 ease-in duration-300 text-white text-center justify-end'>Ver Detalles</Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TVShows