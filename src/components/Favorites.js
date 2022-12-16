import React from 'react'
import emptyHeart from '../images/empty-heart.svg'
import { Link } from 'react-router-dom';

const Favorites = ( {favorites, addOrRemoveFromFavs}) => {

  return (
    <div className='flex flex-col'>
        <h1 className='mb-4 mt-8 text-2xl font-medium'>Favoritos ({favorites.length})</h1>
        <div className='grid grid-container gap-4 mb-8'>
          {
            favorites.map(movie => (
              <div className='relative flex flex-col card bg-slate-100 p-4 w-72' key={movie.id}>
                <h3 className='text-md font-medium mb-2 text-ellipsis overflow-hidden whitespace-nowrap'>{movie.title}
                </h3>
                <figure className='object-cover h-96 mb-4'>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.imgURL}`} alt={movie.title} className=' w-full h-full'/>
                </figure>
                <button onClick={addOrRemoveFromFavs} data-movie-id={movie.id}>
                  <img src={emptyHeart} alt='empty heart' className='w-6 absolute top-16 right-8 drop-shadow-sm'/>
                </button>
                <p className='mb-4 h-16 text-ellipsis'>{movie.overview.substring(0, 90)}...</p>
                <Link to={`/movie-details/${movie.id}`} className='block bg-sky-400 hover:bg-sky-600 p-2 ease-in duration-300 text-white text-center justify-end'>Ver Detalles</Link>
              </div>
            ))
          }

        </div>
    </div>
  )
}

export default Favorites